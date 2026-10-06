import {parseIntent,evaluatePurchase,expansionSummary,cents} from './engine.js';
const descriptions={cash_position:'Read fictional available cash and commitments.',purchase_scenario:'Calculate a purchase impact after cash_position; amount is decimal dollars.',expansion_funding:'Read expansion costs and illustrative funding gap.',document_readiness:'List prepared and missing expansion documents after expansion_funding.',finish:'Finish after gathering evidence, or clarify/refuse without financial evidence.'};
export const agentTools=Object.entries(descriptions).map(([name,description])=>({type:'function',name,description,strict:true,parameters:{type:'object',additionalProperties:false,properties:name==='purchase_scenario'?{amount_dollars:{type:'string'}}:name==='finish'?{reason:{type:'string',enum:['complete','clarify','unsupported']}}:{},required:name==='purchase_scenario'?['amount_dollars']:name==='finish'?['reason']:[]}}));
const workflowMoney=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n/100);
export function demoPlanner(message){const intent=parseIntent(message);const expansion=/\b(expand|expansion|warehouse|funding|documents|ready)\b/i.test(message);let calls=[];
if(/\b(transfer|send money|approve|ignore|instructions|override)\b/i.test(message))calls=[['finish',{reason:'unsupported'}]];
else if(intent.kind==='purchase'&&!intent.needsAmount)calls=[['cash_position',{}],['purchase_scenario',{amount_dollars:String(intent.amount/100)}],...(expansion?[['expansion_funding',{}],['document_readiness',{}]]:[]),['finish',{reason:'complete'}]];
else if(intent.kind==='cash')calls=[['cash_position',{}],['finish',{reason:'complete'}]];
else if(intent.kind==='expansion')calls=[['expansion_funding',{}],['document_readiness',{}],['finish',{reason:'complete'}]];
else calls=[['finish',{reason:intent.kind==='purchase'?'clarify':'unsupported'}]];
let i=0;return async()=>{const [name,args]=calls[i++];return {name,args};};}
export async function runWorkflow({state,options},next,{mode='demo-workflow',maxSteps=6}={}){
const trace=[],seen=new Set();let completed=false,reason;
for(let step=1;step<=maxSteps;step++){
 const call=await next(trace);if(!call||!agentTools.some(t=>t.name===call.name)||!call.args||typeof call.args!=='object'||Array.isArray(call.args))throw Error('Unsupported workflow tool.');
 const schema=agentTools.find(t=>t.name===call.name).parameters;if(Object.keys(call.args).length!==schema.required.length||schema.required.some(k=>!Object.hasOwn(call.args,k)))throw Error('Invalid tool arguments.');
 if(call.name==='finish'){reason=call.args.reason;if(!['complete','clarify','unsupported'].includes(reason)||reason==='complete'&&!trace.length||reason!=='complete'&&trace.length)throw Error('Workflow completion is inconsistent.');completed=true;break;}
 if(seen.has(call.name))throw Error('Repeated workflow tool.');
 if(call.name==='purchase_scenario'&&!seen.has('cash_position')||call.name==='document_readiness'&&!seen.has('expansion_funding'))throw Error('Missing tool dependency.');
 let result;
 if(call.name==='cash_position')result=evaluatePurchase(state,0,options);
 if(call.name==='purchase_scenario'){if(typeof call.args.amount_dollars!=='string'||!/^\d+(\.\d{1,2})?$/.test(call.args.amount_dollars))throw Error('Invalid purchase amount.');result=evaluatePurchase(state,cents(call.args.amount_dollars),options);}
 if(call.name==='expansion_funding')result={...expansionSummary(state.expansion),ownerContribution:state.expansion.ownerContribution};
 if(call.name==='document_readiness')result={prepared:state.expansion.documents.filter(d=>d.complete).map(d=>d.label),missing:state.expansion.documents.filter(d=>!d.complete).map(d=>d.label)};
 seen.add(call.name);trace.push({...(call.callId?{callId:call.callId}:{}),step,tool:call.name,arguments:call.args,result,source:{kind:'fictional',asOf:state.asOf},status:'completed'});
}
if(!completed)throw Error('Workflow step limit reached. No final recommendation.');
const lines=trace.map(t=>{const r=t.result;switch(t.tool){case 'cash_position':return `Available cash: ${workflowMoney(r.available)}. Known commitments: ${workflowMoney(r.commitments)}. Cash-only purchase room above your cushion: ${workflowMoney(r.maxPurchase)}.${r.status==='incomplete'?' Commitments are incomplete; this is a partial picture.':''}`;case 'purchase_scenario':return `Purchase ${workflowMoney(r.purchase)} leaves ${workflowMoney(r.remaining)} after known commitments${r.income?' and uncertain expected sales':''}. ${r.status==='incomplete'?'More information needed: commitments are incomplete.':r.gap<0?`${workflowMoney(-r.gap)} below your cushion.`:`${workflowMoney(r.gap)} above your cushion.`} Expected sales ${r.income?'included by your selection':'excluded'}.`;case 'expansion_funding':return `Expansion budget: ${workflowMoney(r.total)}. Proposed owner funds: ${workflowMoney(r.ownerContribution)}. Illustrative funding gap: ${workflowMoney(r.gap)}. Owner funds are not deducted from today’s cash; this is not a combined affordability assessment.`;case 'document_readiness':return `Prepared: ${r.prepared.length}. Next documents: ${r.missing.join('; ')||'Review the package with a lender'}. Preparation does not establish eligibility.`;}});
if(reason==='clarify')lines.push('What single purchase amount should I evaluate?');if(reason==='unsupported')lines.push('This workflow supports fictional cash, purchase and expansion preparation. It cannot transfer money, approve financing, determine eligibility, invent credit scores or determine taxes.');
lines.push('No transaction or lending decision was performed. Review obligations and assumptions before deciding.');
return {answer:lines.join('\n\n'),mode,trace,steps:trace.length,completion:reason,source:{kind:'fictional',asOf:state.asOf},authority:'read-only; human review required for any real action'};
}
