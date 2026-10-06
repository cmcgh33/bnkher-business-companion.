import test from 'node:test';import assert from 'node:assert/strict';import {snapshot,cents,upcoming,evaluatePurchase,expansionSummary,loanPayment,parseIntent} from '../web/engine.js';
test('30-day commitments exclude later items and include window start',()=>{assert.equal(upcoming(snapshot).length,5);const state={...snapshot,commitments:[{date:'2026-10-06',cents:100},{date:'2026-11-04',cents:100},{date:'2026-11-05',cents:100},{date:'2026-10-05',cents:100}]};assert.equal(upcoming(state).length,2);});
test('$8000 purchase preserves explicit deficit calculation',()=>{const r=evaluatePurchase(snapshot,800000);assert.equal(r.commitments,880000);assert.equal(r.remaining,770000);assert.equal(r.gap,-230000);assert.equal(r.status,'below');assert.equal(r.maxPurchase,570000);});
test('exact cushion is acceptable; one cent below flags',()=>{assert.equal(evaluatePurchase(snapshot,570000).status,'above');assert.equal(evaluatePurchase(snapshot,570001).status,'below');});
test('expected income is excluded by default and separately modeled',()=>{assert.equal(evaluatePurchase(snapshot,800000).income,0);const r=evaluatePurchase(snapshot,800000,{includeIncome:true});assert.equal(r.income,1200000);assert.equal(r.remaining,1970000);assert.equal(r.scenario,'expected-income');assert.equal(r.maxPurchase,570000);});
test('missing commitments cannot yield a confident spending status',()=>assert.equal(evaluatePurchase(snapshot,100,{commitmentsComplete:false}).status,'incomplete'));
test('money parsing rejects fractional cents and non-finite values',()=>{assert.equal(cents('$8,000.05'),800005);for(const v of['-1','NaN','Infinity','1.001','',true,'1000000001'])assert.throws(()=>cents(v));});
test('negative forecast amounts rejected',()=>assert.throws(()=>evaluatePurchase(snapshot,-1)));
test('expansion cost and funding gap are not a loan offer',()=>{const r=expansionSummary(snapshot.expansion);assert.equal(r.total,7700000);assert.equal(r.gap,6200000);assert.equal(r.complete,3);});
test('payment handles zero-rate and amortizing scenarios',()=>{assert.equal(loanPayment(120000,0,12),10000);assert.equal(loanPayment(6200000,10,60),131732);assert.throws(()=>loanPayment(100,5,0));});
test('assistant routes supported requests and asks for missing amount',()=>{assert.deepEqual(parseIntent('Can I buy $8,000 in inventory?'),{kind:'purchase',amount:800000});assert.deepEqual(parseIntent('Can I spend 8k?'),{kind:'purchase',amount:800000});assert.equal(parseIntent('Can I buy inventory?').needsAmount,true);assert.equal(parseIntent('What is my credit score?').kind,'credit');assert.equal(parseIntent('Who won the game?').kind,'unsupported');});
test('assistant rejects precision loss and ambiguous or negative purchases',()=>{
 assert.equal(parseIntent('buy $8.999').kind,'invalid');
 assert.equal(parseIntent('buy -8000').needsAmount,true);
 assert.equal(parseIntent('buy $8000 or $9000').needsAmount,true);
 assert.equal(parseIntent('buy 8.5k').amount,850000);
});
