import {Readable} from 'node:stream';
import {handleAssistant} from './assistant.mjs';
export async function nodeAssistant(req,res) {
  try {
    const url='http://'+req.headers.host+req.url;
    const init={method:req.method,headers:req.headers};
    if(!['GET','HEAD'].includes(req.method)){init.body=Readable.toWeb(req);init.duplex='half';}
    const response=await handleAssistant(new Request(url,init),{local:true});
    res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
  }catch{res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Assistant unavailable. Please retry.'}));}
}
