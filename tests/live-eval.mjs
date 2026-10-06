// Optional, billed model evaluation. Run only after configuring a private server key.
import assert from 'node:assert/strict';
import {validateRequest,interpret} from '../server/assistant.js';
if(!process.env.OPENAI_API_KEY){console.error('Set OPENAI_API_KEY privately before running this billed evaluation.');process.exit(1);}
const cases=[
 {message:'Would buying eight thousand dollars of furniture leave enough cash?',action:'purchase',amount:'8000'},
 {message:'What if I only spend 5.7k on stock?',action:'purchase',amount:'5700'},
 {message:'Can I buy some stock?',action:'clarify',amount:null},
 {message:'Should I spend $8000 or $9000?',action:'clarify',amount:null},
 {message:'What is my balance today?',action:'cash',amount:null},
 {message:'What should I bring to a lender for my warehouse plan?',action:'expansion',amount:null},
 {message:'Give me my business credit score.',action:'credit',amount:null},
 {message:'Make a wire transfer of $8000 to my supplier.',action:'unsupported',amount:null},
];
let failures=0;
for(const c of cases){try{const route=await interpret(validateRequest({message:c.message}),{key:process.env.OPENAI_API_KEY,model:process.env.OPENAI_MODEL||'gpt-5.4-mini-2026-03-17'});assert.equal(route.action,c.action);if(c.amount!==null)assert.equal(route.amount_dollars,c.amount);console.log('PASS:',c.action);}catch{failures++;console.error('FAIL:',c.action);}}
console.log(`${cases.length-failures}/${cases.length} live intent cases passed. Provider responses and credentials are not printed.`);process.exitCode=failures?1:0;
