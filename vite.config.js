import {defineConfig,loadEnv} from 'vite';
import {nodeAssistant} from './server/node-handler.mjs';
export default defineConfig(({mode})=>{
  const env=loadEnv(mode,process.cwd(),'');
  // Server-only values. Never use VITE_ for secrets or define them in the client.
  for(const key of ['OPENAI_API_KEY','OPENAI_MODEL'])if(env[key])process.env[key]=env[key];
  const middleware=server=>{server.middlewares.use('/api/assistant',(req,res)=>{
    if(!/^127\.0\.0\.1:\d+$|^localhost:\d+$/.test(req.headers.host||'')){res.writeHead(403);res.end();return;}
    nodeAssistant(req,res);
  });};
  return {plugins:[{name:'repair-thread-assistant',configureServer:middleware,configurePreviewServer:middleware}]};
});
