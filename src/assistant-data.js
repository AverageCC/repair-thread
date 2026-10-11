// Shared, deterministic facts. No images, raw OCR, resident notes or contact fields.
const text = (v, max=160) => typeof v==='string'?v.slice(0,max):'';
const fields=(o,keys)=>Object.fromEntries(keys.map(k=>[k,text(o?.[k])]));
export function assistantSnapshot(db) {
  const units=(db.units||[]).map(u=>fields(u,['id','property','label']));
  const assets=(db.assets||[]).map(a=>({...fields(a,['id','unitId','category','brand','model','serial']),retired:a.retired===true}));
  const cases=(db.cases||[]).map(c=>{
    const dates=[c.createdAt,...(Array.isArray(c.events)?c.events:[]).map(e=>e?.at)].filter(d=>typeof d==='string'&&Number.isFinite(Date.parse(d)));
    const lastActivity=dates.sort((a,b)=>Date.parse(b)-Date.parse(a))[0]||'';
    const p=Array.isArray(c.proposals)?c.proposals.at(-1):null;
    return {...fields(c,['id','assetId','title','status','priority','createdAt']),lastActivity,
      proposal:p?{kind:text(p.kind),version:Number(p.version)||0,total:Number.isFinite(p.total)?p.total:null}:null};
  });
  return {units,assets,cases};
}
export function attentionItems(db,now=Date.now()) {
  const items=[];
  for(const c of db.cases||[]) {
    if(c.status==='Closed')continue;
    const a=db.assets.find(a=>a.id===c.assetId),u=db.units.find(u=>u.id===a?.unitId);
    const label=[u?.property,u?.label,c.title].filter(Boolean).join(' / ');
    const add=(reason,rank)=>items.push({kind:'thread',id:c.id,label,reason,rank});
    if(c.priority==='Urgent')add('Marked urgent — review the request.',0);
    if(c.status==='Awaiting approval')add('A proposal is awaiting a decision.',1);
    if(['Changes requested','Rejected'].includes(c.status))add('Review the decision before revising the proposal.',2);
    const latest=Math.max(...[c.createdAt,c.lastActivity,...(c.events||[]).map(e=>e.at)].map(Date.parse).filter(Number.isFinite));
    if(Number.isFinite(latest)&&now-latest>=7*86400000)add('No recorded activity for '+Math.floor((now-latest)/86400000)+' days. Check for an update.',3);
  }
  for(const a of db.assets||[]) {
    if(a.retired)continue;
    const missing=['brand','model','serial'].filter(k=>!String(a[k]||'').trim());
    if(missing.length){const u=db.units.find(u=>u.id===a.unitId);items.push({kind:'asset',id:a.id,label:[u?.property,u?.label,a.category].filter(Boolean).join(' / '),reason:'Missing '+missing.join(', ')+'. Review the equipment label.',rank:4});}
  }
  return items.sort((a,b)=>a.rank-b.rank||a.label.localeCompare(b.label));
}
export function referenceLabel(db,ref) {
  const a=ref.kind==='asset'?db.assets.find(a=>a.id===ref.id):null;
  const c=ref.kind==='thread'?db.cases.find(c=>c.id===ref.id):null;
  const asset=a||db.assets.find(a=>a.id===c?.assetId);
  const u=db.units.find(u=>u.id===asset?.unitId);
  return a||c?[u?.property,u?.label,a?.category||c?.title].filter(Boolean).join(' / '):null;
}
