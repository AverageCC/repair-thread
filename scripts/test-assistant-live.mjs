// Explicit opt-in smoke test: synthetic data only. Never prints credentials.
import {handleAssistant} from '../server/assistant.mjs';
try{process.loadEnvFile('.env.local')}catch{}
const req=new Request('http://127.0.0.1:5173/api/assistant',{method:'POST',headers:{origin:'http://127.0.0.1:5173','Content-Type':'application/json'},body:JSON.stringify({consent:true,question:'Which equipment record needs attention? Cite it.',workspace:{units:[{id:'u',property:'Synthetic Test Court',label:'304B'}],assets:[{id:'a',unitId:'u',category:'Dishwasher',brand:'Demo',model:'ABC12345',serial:''}],cases:[]}})});
const response=await handleAssistant(req,{local:true});const result=await response.json();
console.log(JSON.stringify({status:response.status,...result},null,2));if(!response.ok)process.exitCode=1;
