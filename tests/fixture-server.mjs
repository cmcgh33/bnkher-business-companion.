// Test-only injected provider. Never used by npm start or deployed server code.
import {createApp} from '../server/index.js';
const fetcher=async()=>({ok:true,json:async()=>({status:'completed',output:[{type:'function_call',name:'route_question',arguments:JSON.stringify({action:'purchase',amount_dollars:'8000'})}]})});
createApp({key:'test-only-not-real',accessToken:'test-access-code-not-a-real-secret',fetcher}).listen(3017,'127.0.0.1');
