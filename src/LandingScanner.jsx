import React,{useEffect,useRef,useState} from 'react';
import CameraCapture from './CameraCapture';
import {parseLabel} from './domain';

export default function LandingScanner(){
  const [photo,setPhoto]=useState(''),[result,setResult]=useState(null),[raw,setRaw]=useState(''),[busy,setBusy]=useState(false),[progress,setProgress]=useState(''),[error,setError]=useState('');
  const run=useRef(0),workerRef=useRef(null),locked=useRef(false);
  useEffect(()=>()=>{run.current++;workerRef.current?.terminate()},[]);
  async function analyze(src){
    if(locked.current)return;locked.current=true;const id=++run.current;
    setPhoto(src);setResult(null);setRaw('');setError('');setBusy(true);setProgress('Loading local OCR…');
    let worker,timer,cancelled=false;
    try{
      const operation=async()=>{
        const {createWorker}=await import('tesseract.js');
        worker=await createWorker('eng',1,{workerPath:'/ocr/worker.min.js',corePath:'/ocr',langPath:'/ocr',logger:m=>{if(id===run.current&&!cancelled)setProgress(`${m.status} ${Math.round((m.progress||0)*100)}%`)}});
        if(cancelled||id!==run.current){await worker.terminate();return}
        workerRef.current=worker;
        const {data}=await worker.recognize(src);
        if(cancelled||id!==run.current)return;
        setRaw(data.text);setResult(parseLabel(data.text));
        if(!data.text.trim())setError('No readable text found. Move closer, reduce glare and capture again.');
      };
      await Promise.race([operation(),new Promise((_,reject)=>{timer=setTimeout(()=>{cancelled=true;reject(Error('Analysis timed out. Try a smaller, clearer photo.'))},90000)})]);
    }catch(e){if(id===run.current)setError('Could not read this label. '+e.message)}
    finally{cancelled=true;clearTimeout(timer);await worker?.terminate();if(id===run.current){workerRef.current=null;locked.current=false;setBusy(false);setProgress('')}}
  }
  async function upload(file){
    if(!file||busy)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){setError('Choose a JPG, PNG or WebP image under 10 MB.');return}
    const reader=new FileReader();reader.onload=()=>analyze(reader.result);reader.onerror=()=>setError('Could not open this image. Please try another photo.');reader.readAsDataURL(file);
  }
  function sample(){const canvas=document.createElement('canvas');canvas.width=1100;canvas.height=420;const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,1100,420);ctx.fillStyle='#111';ctx.font='42px Arial';['SYNTHETIC TEST LABEL','Model: WDF520PADM9','Serial: 84261753'].forEach((line,i)=>ctx.fillText(line,50,95+i*105));analyze(canvas.toDataURL())}
  return <section id="camera-demo" className="landing-scanner" aria-labelledby="scanner-heading"><p className="eyebrow">TRY IT RIGHT HERE</p><h2 id="scanner-heading">A label photo. The details below.</h2><p>Capture the equipment’s model and serial label. We’ll read the image in your browser and show the extracted information here.</p><CameraCapture disabled={busy} onCapture={analyze}/><div className="scanner-alternatives"><label className="field"><span>Or upload a label photo</span><input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={e=>{upload(e.target.files?.[0]);e.target.value=''}}/></label><button type="button" disabled={busy} onClick={sample}>Try a sample label</button></div><div className="scanner-results" aria-live="polite" aria-busy={busy}><div>{photo?<img className="scanner-photo" src={photo} alt="Captured label being analyzed"/>:<div className="scanner-placeholder">Your captured label will appear here.</div>}</div><div><p className="eyebrow">CAPTURED INFORMATION</p><h3>{busy?'Reading your label…':result?'Here’s what we found.':'Ready for your first scan.'}</h3>{busy&&<p role="status">{progress}</p>}<dl><dt>Model number</dt><dd>{busy?'Reading…':result?.model|| (result?'Not detected — try a clearer photo':'Waiting for a capture')}</dd><dt>Serial number</dt><dd>{busy?'Reading…':result?.serial|| (result?'Not detected — try a clearer photo':'Waiting for a capture')}</dd></dl>{result&&<p className="subtle">OCR can misread characters. Compare these details with the original label before using them. This demo does not save an equipment record.</p>}{error&&<p className="form-error" role="alert">{error}</p>}{photo&&!busy&&<button type="button" onClick={()=>analyze(photo)}>Retry this image</button>}{raw&&<details><summary>View extracted text</summary><pre>{raw}</pre></details>}</div></div></section>
}
