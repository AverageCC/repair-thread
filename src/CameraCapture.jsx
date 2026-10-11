import React,{useEffect,useRef,useState} from 'react';
import {Camera,X,RefreshCw} from 'lucide-react';

export default function CameraCapture({onCapture,disabled}) {
  const video=useRef(null),stream=useRef(null),generation=useRef(0);
  const [active,setActive]=useState(false),[starting,setStarting]=useState(false),[error,setError]=useState(''),[devices,setDevices]=useState([]),[device,setDevice]=useState('');
  function stop(){generation.current++;stream.current?.getTracks().forEach(t=>t.stop());stream.current=null;setActive(false);setStarting(false)}
  useEffect(()=>()=>{generation.current++;stream.current?.getTracks().forEach(t=>t.stop())},[]);
  async function start(id=''){
    stop();const request=++generation.current;setStarting(true);setError('');
    try{
      if(!navigator.mediaDevices?.getUserMedia)throw Error('Camera access requires HTTPS or localhost. You can still upload a label photo.');
      const next=await navigator.mediaDevices.getUserMedia({audio:false,video:id?{deviceId:{exact:id},width:{ideal:1920},height:{ideal:1080}}:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}});
      if(request!==generation.current){next.getTracks().forEach(t=>t.stop());return}
      stream.current=next;setActive(true);setStarting(false);
      setDevices((await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='videoinput'));
      setDevice(next.getVideoTracks()[0].getSettings().deviceId||'');
    }catch(e){if(request!==generation.current)return;setStarting(false);setError(({NotAllowedError:'Camera permission was denied. Allow camera access in your browser or Windows privacy settings, then retry.',NotFoundError:'No camera was found. Connect a camera or upload a label photo.',NotReadableError:'The camera is busy or unavailable. Close other camera apps and retry.',OverconstrainedError:'This camera is no longer available. Choose another camera.'})[e.name]||e.message)}
  }
  useEffect(()=>{if(active&&video.current){video.current.srcObject=stream.current;video.current.play().catch(()=>setError('Could not start the preview. Close the camera and try again.'))}},[active,device]);
  function capture(){const v=video.current;if(!v?.videoWidth){setError('Wait for the preview before capturing.');return}const canvas=document.createElement('canvas');canvas.width=v.videoWidth;canvas.height=v.videoHeight;canvas.getContext('2d').drawImage(v,0,0);const photo=canvas.toDataURL('image/jpeg',.94);stop();onCapture(photo)}
  return <section className="camera-capture"><div className="button-row"><button type="button" className="primary" disabled={disabled||starting} onClick={()=>active?capture():start()}><Camera size={18}/>{starting?'Opening camera…':active?'Capture label & analyze':'Use live camera'}</button>{(active||starting)&&<button type="button" onClick={stop}><X size={18}/>Close camera</button>}</div><p className="subtle">Point the camera at the model / serial label. Capture a still image to analyze locally. No video or audio is uploaded.</p>{active&&<><div className="camera-preview"><video ref={video} muted playsInline autoPlay aria-label="Live camera preview"/><div className="camera-guide" aria-hidden="true"/></div>{devices.length>1&&<label className="field"><span>Camera</span><select value={device} onChange={e=>start(e.target.value)}>{devices.map((d,i)=><option key={d.deviceId} value={d.deviceId}>{d.label||`Camera ${i+1}`}</option>)}</select></label>}<p className="subtle">Keep the label inside the guide. Avoid glare and hold steady.</p></>}{error&&<p role="alert" className="form-error">{error}</p>}</section>
}
