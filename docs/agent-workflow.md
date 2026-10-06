# Read-only agent workflow — 6 October 2026

## What changed
The v0.3 workflow coordinates tools rather than merely classifying one question. The public static demo uses a deterministic planner. The private backend lets a model choose the next tool, returns that tool's calculated result to the model, and repeats until completion. Final financial wording comes from application code, not generated prose. Live provider accuracy is pending; injected responses verify the loop, not the real model.

Try Ask BNKHER → select **Use multistep workflow** → **Inventory + expansion workflow**. Select live AI as well only on the configured private Node backend.

## Tool contracts
All amounts in results use integer cents. Inputs cannot replace the account balance. The fictional snapshot remains the authoritative source.

| Tool | Arguments | Dependency | Result |
| --- | --- | --- | --- |
| cash_position | none | none | Available cash, commitments, cushion, cash-only room |
| purchase_scenario | amount_dollars: decimal string, 0–1 billion USD | cash_position | Remaining funds, cushion gap, assumptions and completeness |
| expansion_funding | none | none | Project budget, proposed owner funds, illustrative funding gap |
| document_readiness | none | expansion_funding | Prepared and missing document labels |
| finish | reason: complete, clarify, unsupported | Complete requires evidence | Ends the loop without executing an action |

## Execution controls
- One tool per provider response, at most six responses including finish; no repeated evidence tool.
- Unknown tools, additional fields, missing dependencies, invalid amounts and inconsistent completion fail closed.
- Each tool records its order, arguments, result and fictional source date; provider call IDs connect outputs to the next model request. Traces are returned, not persisted as a compliance ledger.
- No write tool exists. Transfers and financing approval are outside the capability set. The prototype cannot approve a real action even if a model requests it.
- Private `/api/agent` uses the same access token, same-origin check, concurrency limit and shared request allowance as `/api/chat`.
- The allowance counts workflows, not individual model requests. One workflow can incur up to six model requests; 60 workflow requests can therefore incur up to 360 provider requests per process boot. Each provider response has an 800-token output limit and 10-second timeout. Restarting clears this development allowance.
- UI access code is distinct from the API key. Provider failures produce an error with no silently substituted demo answer.

## Financial boundaries
Inventory impact and expansion funding are independent scenarios. Proposed owner funds are neither verified available nor subtracted from cash. No combined affordability conclusion is made. Expected sales are uncertain and used only if selected in the dashboard. An incomplete commitments list remains explicitly incomplete.

## Evaluation and release gates
`npm test`: 29 automated checks pass, including seven workflow/backend checks with injected provider responses. Real-model accuracy, prompt robustness, latency and costs have not been measured.

`npm run eval:agent:live` runs eight billed scenarios using a privately supplied API key. It checks exact tool sequences, completion type and the $7,700 default purchase result. Acceptance target: 8/8, then repeat with alternative wording and incomplete settings before expanding access. A small passing sample is a release gate, not a production reliability estimate.

Remaining: confirm the selected model exists for the account, execute real-provider evaluations, record observed latency/cost, and add persistent identity and budgets before multiuser operation. There is no live AI claim on the public Pages demo.

[OpenAI function-calling guide](https://developers.openai.com/api/docs/guides/function-calling) supplies the Responses call/output protocol; application code owns execution and validation.
