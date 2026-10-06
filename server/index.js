import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {timingSafeEqual} from 'node:crypto';
import {respond,PublicError} from './assistant.js';
import {respondAgent} from './agent.js';
const root=fileURLToPath(new URL('../web/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png'};
function equal(a,b){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y);}
export function createApp({key=process.env.OPENAI_API_KEY,accessToken=process.env.AI_ACCESS_TOKEN,model=process.env.OPENAI_MODEL||'gpt-5.4-mini-2026-03-17',maxCalls=Number(process.env.AI_MAX_CALLS_PER_BOOT||60),fetcher=fetch}={}){let calls=0,active=0;const hits=new Map();const configured=Boolean(key&&accessToken&&accessToken.length>=24);if(!Number.isInteger(maxCalls)||maxCalls<1||maxCalls>1000)throw Error('AI_MAX_CALLS_PER_BOOT must be an integer from 1 to 1000.');
return http.createServer(async(req,res)=>{res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Cache-Control','no-store');res.setHeader('Content-Security-Policy',"default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'");const json=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(data));};
let url;try{url=new URL(req.url,'http://localhost');}catch{return json(400,{error:'Invalid URL.'});}
if(url.pathname==='/api/health'&&req.method==='GET')return json(200,{liveAI:configured,requiresAccessCode:true,model:configured?model:null,data:'fictional'});
if(['/api/chat','/api/agent'].includes(url.pathname)){
 if(req.method!=='POST')return json(405,{error:'Use POST.'});
 if(!configured)return json(503,{error:'Live AI is not configured. The demo assistant is still available.'});
 if(!equal(String(req.headers['x-bnkher-access']||''),accessToken))return json(401,{error:'Enter the private AI access code, or use the demo assistant.'});
 const origin=req.headers.origin;const host=req.headers.host;let parsedOrigin=null;try{parsedOrigin=origin?new URL(origin):null;}catch{return json(403,{error:'Invalid request origin.'});}if(parsedOrigin&&(!['https:','http:'].includes(parsedOrigin.protocol)||parsedOrigin.host!==host))return json(403,{error:'Use the assistant on its own hosted site.'});
 if(!String(req.headers['content-type']||'').startsWith('application/json'))return json(415,{error:'Use JSON.'});
 if(calls>=maxCalls)return json(429,{error:'The demo AI request allowance is exhausted. Use the demo assistant.'});
 const now=Date.now(),ip=req.socket.remoteAddress||'unknown';for(const [id,h] of hits)if(now-h.start>60000)hits.delete(id);const bucket=hits.get(ip)||{start:now,count:0};if(bucket.count>=5||active>=2)return json(429,{error:'Please wait before sending another AI question.'});bucket.count++;hits.set(ip,bucket);
 const chunks=[];let bytes=0;try{for await(const chunk of req){bytes+=chunk.length;if(bytes>16000)throw new PublicError(413,'The request is too large.');chunks.push(chunk);}let parsed;try{parsed=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new PublicError(400,'The request is not valid JSON.');}calls++;active++;try{const result=await (url.pathname==='/api/agent'?respondAgent:respond)(parsed,{key,model,fetcher});return json(200,result);}finally{active--;}}catch(e){return json(e instanceof PublicError?e.status:500,{error:e instanceof PublicError?e.message:'The assistant could not complete that request.'});}
 }
 if(url.pathname.startsWith('/api/'))return json(404,{error:'Unknown endpoint.'});
 if(!['GET','HEAD'].includes(req.method))return json(405,{error:'Use GET.'});
 try{const pathname=decodeURIComponent(url.pathname);const relative=pathname==='/'?'index.html':pathname.replace(/^\/+/,''),file=path.resolve(root,relative);if(!file.startsWith(root)||!types[path.extname(file)])return json(404,{error:'Page not found.'});const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]});res.end(req.method==='HEAD'?undefined:data);}catch{return json(404,{error:'Page not found.'});}
});}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||3000);createApp().listen(port,'0.0.0.0',()=>console.log('BNKHER server listening on port '+port+' (fictional data only).'));}
