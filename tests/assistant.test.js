import {test} from 'node:test';
import assert from 'node:assert/strict';
import {attentionItems,assistantSnapshot} from '../src/assistant-data.js';
import {handleAssistant} from '../server/assistant.mjs';
const now=Date.parse('2026-10-11T12:00:00Z');
const db={units:[{id:'u',property:'Test Court',label:'304B',note:'PRIVATE'}],assets:[{id:'a',unitId:'u',category:'Dishwasher',brand:'Test',model:'ABC12345',serial:'',photo:'PRIVATE',raw:'PRIVATE'}],cases:[{id:'c',assetId:'a',title:'Not draining',status:'Awaiting approval',priority:'Normal',createdAt:'2026-10-01T12:00:00Z',description:'PRIVATE',events:[{at:'2026-10-04T12:00:00Z',text:'PRIVATE'}],proposals:[{kind:'Repair',version:1,total:200,scope:'PRIVATE'}]}]};
const env={OPENAI_API_KEY:'test-only',ASSISTANT_ACCESS_CODE:'a'.repeat(32)};
const request=(body={},headers={},origin='http://127.0.0.1:5173')=>new Request(origin+'/api/assistant',{method:'POST',headers:{origin,'Content-Type':'application/json',...headers},body:JSON.stringify({question:'What needs attention?',consent:true,workspace:assistantSnapshot(db),...body})});
test('attention uses latest activity, exact seven-day threshold, excludes closed and retired records',()=>{
 const flags=attentionItems(db,now);assert.equal(flags.length,3);assert.match(flags[1].reason,/7 days/);
 assert.equal(attentionItems(db,now-1).length,2);
 const changed=structuredClone(db);changed.cases[0].events.push({at:'2026-10-11T00:00:00Z'});assert.equal(attentionItems(changed,now).length,2);
 changed.cases[0].status='Closed';changed.assets[0].retired=true;assert.equal(attentionItems(changed,now).length,0);
});
test('snapshot excludes photos, raw OCR, request descriptions, event notes and unit notes',()=>{const s=assistantSnapshot(db);assert.ok(!JSON.stringify(s).includes('PRIVATE'));assert.equal(s.cases[0].lastActivity,'2026-10-04T12:00:00Z');assert.equal(s.cases[0].proposal.total,200)});
test('endpoint requires consent and rejects cross-origin local requests before provider call',async()=>{
 assert.equal((await handleAssistant(request({consent:false}),{local:true,env})).status,400);
 const r=new Request('http://127.0.0.1:5173/api/assistant',{method:'POST',headers:{origin:'https://other.test'}});
 assert.equal((await handleAssistant(r,{local:true,env})).status,403);
});
test('hosted AI fails closed without configuration or valid access code',async()=>{
 assert.equal((await handleAssistant(request(),{env:{OPENAI_API_KEY:'test'}})).status,503);
 assert.equal((await handleAssistant(request(),{env})).status,401);
});
test('answer filters fabricated references and sends only whitelisted context',async()=>{
 let sent;
 const response=await handleAssistant(request(),{env,local:true,now,fetchImpl:async(url,options)=>{sent=JSON.parse(options.body);return Response.json({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({answer:'Review the pending proposal.',draft:'',references:[{kind:'thread',id:'c'},{kind:'asset',id:'not-real'}]})}]}]})}});
 const result=await response.json();assert.equal(response.status,200);assert.equal(result.references.length,1);assert.match(result.references[0].label,/304B/);assert.equal(sent.store,false);assert.ok(!sent.input.includes('PRIVATE'));assert.match(sent.input,/7 days/);
});
test('provider quota errors and oversized workspaces return useful errors',async()=>{
 const response=await handleAssistant(request(),{local:true,env,now,fetchImpl:async()=>Response.json({error:{code:'credit_balance_exhausted',type:'insufficient_quota'}},{status:429})});assert.equal(response.status,502);assert.match((await response.json()).error,/credit is exhausted/);
 assert.equal((await handleAssistant(request({workspace:{units:Array(151).fill({}),assets:[],cases:[]}}),{local:true,env})).status,400);
});
