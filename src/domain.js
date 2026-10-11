export const uid = () => crypto.randomUUID();
export const stamp = () => new Date().toISOString();
export const money = n => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(n);
export function parseLabel(text) {
  const read = re => text.match(re)?.[1]?.trim() || '';
  return {brand:read(/(?:manufacturer|brand)\s*[:#]?\s*([^\n]+)/i),model:read(/model(?:\s*(?:no\.?|number))?\s*[:#]?\s*([\w./-]+)/i),serial:read(/serial(?:\s*(?:no\.?|number))?\s*[:#]?\s*([\w./-]+)/i)};
}
export const total = p => ['parts','labor','tax','delivery','disposal'].reduce((n,k)=>n+Number(p[k]||0),0);
export function validateProposal(p) {
  if(!p.scope?.trim() || !p.vendor?.trim()) throw Error('Add a scope of work and vendor.');
  if(!['Repair','Replace'].includes(p.kind)) throw Error('Choose repair or replacement.');
  for(const k of ['parts','labor','tax','delivery','disposal']) if(!Number.isFinite(Number(p[k]))||Number(p[k])<0) throw Error('Costs must be valid nonnegative amounts.');
  if(p.url && !/^https?:\/\//i.test(p.url)) throw Error('Supplier links must start with https:// or http://.');
}
export function addProposal(c,p,actor) {
  if(c.status==='Closed') throw Error('Closed threads cannot be edited.');
  validateProposal(p);
  const version={...p,id:uid(),version:c.proposals.length+1,createdAt:stamp(),actor,total:total(p)};
  return {...c,status:'Awaiting approval',proposals:[...c.proposals,version],events:[...c.events,{at:stamp(),text:`Proposal v${version.version} submitted by ${actor}.`}]};
}
export function decide(c,decision,role,note='') {
  if(role!=='Approver') throw Error('Switch to the Approver demo role to record a decision.');
  if(c.status!=='Awaiting approval') throw Error('This proposal is no longer awaiting approval.');
  if(!['Approved','Changes requested','Rejected'].includes(decision)) throw Error('Invalid decision.');
  return {...c,status:decision,decisions:[...c.decisions,{proposalId:c.proposals.at(-1).id,decision,note,actor:role,at:stamp()}],events:[...c.events,{at:stamp(),text:`${decision} by ${role}${note ? ': '+note : '.'}`}]};
}
export function replaceAsset(db,caseId,asset) {
  const c=db.cases.find(c=>c.id===caseId); const old=db.assets.find(a=>a.id===c?.assetId);
  if(!old||c.status!=='Approved'||c.proposals.at(-1)?.kind!=='Replace') throw Error('An approved replacement proposal is required.');
  if(old.retired) throw Error('This equipment has already been replaced.');
  const now=stamp();const next={...asset,id:uid(),unitId:old.unitId,category:old.category,createdAt:now,replaces:old.id,retired:false};
  return {...db,assets:[...db.assets.map(a=>a.id===old.id?{...a,retired:true,replacedBy:next.id}:a),next],cases:db.cases.map(x=>x.id===c.id?{...c,status:'Closed',replacementId:next.id,events:[...c.events,{at:now,text:'Replacement confirmed. Previous equipment history retained.'}]}:x)};
}
export function csvCell(v) {let s=String(v??'');if(/^[=+@\-\t\r]/.test(s)) s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export function inventoryCsv(db) {
  const rows=[['Asset ID','Property','Unit','Category','Brand','Model','Serial','Review status','Lifecycle','Created at']];
  for(const a of db.assets){const u=db.units.find(u=>u.id===a.unitId);rows.push([a.id,u?.property,u?.label,a.category,a.brand,a.model,a.serial,a.review,a.retired?'Retired':'Active',a.createdAt]);}
  return rows.map(r=>r.map(csvCell).join(',')).join('\r\n');
}
export function seed() {
 const at='2026-10-09T16:00:00.000Z';
 const assets=[['a1','u1','Dishwasher','Whirlpool','WDF520PADM9','DEMO-304B-DW'],['a2','u1','Range','GE','JBS60DKWW','DEMO-304B-RG'],['a3','u1','Refrigerator','Frigidaire','FFTR1835VS',''],['a4','u2','Dishwasher','Bosch','SHE3AR76UC','DEMO-101A-DW'],['a5','u3','Washer','LG','WM3400CW','DEMO-202-WA']].map(([id,unitId,category,brand,model,serial])=>({id,unitId,category,brand,model,serial,review:serial?'Confirmed':'Incomplete',createdAt:at,retired:false}));
 const proposal={id:'p1',version:1,kind:'Replace',vendor:'Demo Appliance Supply',scope:'Replace the dishwasher. Include delivery, installation and removal of the previous equipment.',parts:479,labor:95,tax:38.32,delivery:35,disposal:25,total:672.32,url:'',createdAt:at,actor:'Coordinator'};
 return {version:1,units:[{id:'u1',property:'Maple Court',label:'304B',note:'Building B · Third floor'},{id:'u2',property:'Maple Court',label:'101A',note:'Building A · Ground floor'},{id:'u3',property:'Cedar House',label:'202',note:'Second floor'}],assets,cases:[{id:'c1',assetId:'a1',location:'Maple Court / 304B',title:'Dishwasher not draining',description:'Standing water remains after the cycle. Resident reports the issue began yesterday.',priority:'Normal',status:'Awaiting approval',createdAt:at,proposals:[proposal],decisions:[],events:[{at,text:'Request reported by Resident (demo).'},{at,text:'Equipment record attached.'},{at,text:'Replacement proposal v1 submitted.'}]},{id:'c2',assetId:'a5',location:'Cedar House / 202',title:'Washer shakes during spin',description:'Check leveling and installation before planning repair.',priority:'Normal',status:'Open',createdAt:at,proposals:[],decisions:[],events:[{at,text:'Request reported by Coordinator (demo).'}]}]};
}
