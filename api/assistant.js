import {handleAssistant} from '../server/assistant.mjs';
export function GET(request){return handleAssistant(request);}
export function POST(request){return handleAssistant(request);}
