import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const fresh=path.join(root,'release','assistant-package','win-unpacked','Repair Thread.exe');
const executable=existsSync(fresh)?fresh:path.join(root,'release','win-unpacked','Repair Thread.exe');
if(!existsSync(executable))throw Error('Build the desktop application with pnpm dist:win first.');
try{process.loadEnvFile(path.join(root,'.env.local'))}catch{}
const child=spawn(executable,[],{env:process.env,detached:true,stdio:'ignore'});
child.on('error',()=>{console.error('Could not launch Repair Thread.');process.exitCode=1});
child.unref();

