# Architecture and integration roadmap

## Version 0.3
The frontend remains static HTML/CSS/ES modules. `web/engine.js` owns deterministic integer-cent calculations. `web/app.js` manages page-session state, the rule-based demo assistant and an optional live-AI client. The Node HTTP backend serves the same web files and three API routes; there are no runtime npm dependencies.

`server/assistant.js` validates scenario settings, requests a strict `route_question` function call from OpenAI, checks the returned action/amount, and calculates from the server-owned fictional snapshot. Its answer templates preserve financial boundaries. The model interprets language; it does not set balances, create credit scores or write authoritative financial calculations.

`server/index.js` holds credentials in environment variables, checks a private application access code, rejects cross-origin browser requests, limits requests and serves only approved web asset types. It does not serve environment files or server source. Errors return bounded public messages without provider details.

`web/workflow.js` owns read-only tool execution and evidence formatting. `server/agent.js` runs a bounded model-selected tool loop with function outputs replayed to the provider. The static demo uses a fixed planner. [Contracts, limits and pending evaluation](agent-workflow.md).

## API contract
| Route | Access | Response |
|---|---|---|
| GET /api/health | Public, no credentials disclosed | liveAI availability, access-code requirement, configured model identifier and fictional-data label |
| POST /api/agent | Private application code in x-bnkher-access | Application-authored answer, ordered tool trace, completion type, mode and source date |
| POST /api/chat | Private application code in x-bnkher-access | server-authored answer, optional calculation evidence, validated interpretation, mode and source date |

POST accepts `message` (1–500 characters), optional bounded `history` (up to six user/assistant messages), and `settings` (cushion integer cents, explicit income/completeness flags, validated expansion budget/checklist). Unknown account values never replace the authoritative snapshot. Statuses include 400 invalid input, 401 incorrect access, 403 invalid origin, 413 oversized body, 429 quota/concurrency limit, 502 provider failure and 503 unconfigured service.

## Hosting and privacy
GitHub Pages runs the demo. The live-AI version requires a Node host serving frontend/API on one origin. The API key is never a frontend setting. Live mode is explicitly selected and discloses transmission of questions/history. Provider requests set `store:false`; this is not a promise of zero data retention. See [AI design and limits](ai-assistant.md) and [activation instructions](hosting.md).

## Remaining roadmap
Real banking/credit integrations, identity-based authentication, durable data and quota storage, grounding against source documents, an expanded answer policy, operational monitoring, accessibility assessment, expert/community access and property financing each require their own design. No real financial data or transaction execution is included.
