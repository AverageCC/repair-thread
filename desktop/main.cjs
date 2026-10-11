const {app,BrowserWindow,session,shell,dialog}=require('electron');
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const PORT=47831,origin=`http://127.0.0.1:${PORT}`;
let server,win;
app.setName('Repair Thread');
if(!app.requestSingleInstanceLock()){app.quit()}else{
app.on('second-instance',()=>{if(win){if(win.isMinimized())win.restore();win.focus()}});
app.whenReady().then(async()=>{
  const root=path.join(app.getAppPath(),'dist');
  const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.wasm':'application/wasm','.gz':'application/gzip','.md':'text/plain','.json':'application/json'};
  server=http.createServer((req,res)=>{
    if(req.headers.host!==`127.0.0.1:${PORT}`||!['GET','HEAD'].includes(req.method)){res.writeHead(403);return res.end()}
    let pathname;try{pathname=decodeURIComponent(new URL(req.url,origin).pathname)}catch{res.writeHead(400);return res.end()}
    const target=path.resolve(root,'.'+(pathname==='/'||pathname==='/app'?'/index.html':pathname));
    if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
    fs.stat(target,(err,stat)=>{if(err||!stat.isFile()){res.writeHead(404);return res.end('Not found')}
      res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Content-Length':stat.size,'X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; worker-src 'self' blob:; connect-src 'self'; media-src 'self' blob:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"});
      if(req.method==='HEAD')return res.end();fs.createReadStream(target).pipe(res);
    });
  });
  try{await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(PORT,'127.0.0.1',resolve)})}catch(e){dialog.showErrorBox('Repair Thread could not start',`The local workspace port ${PORT} is unavailable. Close another Repair Thread instance or the app using that port, then retry.\n${e.message}`);app.quit();return}
  session.defaultSession.setPermissionCheckHandler((wc,permission,requestOrigin,details)=>permission==='media'&&requestOrigin===origin&&details.mediaType==='video');
  session.defaultSession.setPermissionRequestHandler(async(wc,permission,callback,details)=>{
    if(permission!=='media'||new URL(details.requestingUrl||'about:blank').origin!==origin||!details.mediaTypes?.length||details.mediaTypes.some(x=>x!=='video'))return callback(false);
    const {response}=await dialog.showMessageBox(win,{type:'question',title:'Use your camera?',message:'Allow Repair Thread to use your camera for label capture?',detail:'A live preview will appear. Only the still image you capture is analyzed locally. No audio is requested.',buttons:['Allow camera','Not now'],defaultId:0,cancelId:1});callback(response===0);
  });
  win=new BrowserWindow({width:1320,height:900,minWidth:390,minHeight:600,title:'Repair Thread',icon:path.join(__dirname,'icon.ico'),webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true,webSecurity:true}});
  win.removeMenu();
  win.webContents.setWindowOpenHandler(({url})=>{if(/^https:\/\//i.test(url))shell.openExternal(url);return {action:'deny'}});
  win.webContents.on('will-navigate',(event,url)=>{if(new URL(url).origin!==origin){event.preventDefault();if(/^https:\/\//i.test(url))shell.openExternal(url)}});
  await win.loadURL(origin+'/app?capture=1');
});
app.on('window-all-closed',()=>app.quit());
app.on('before-quit',()=>server?.close());
}
