# Architecture and integration roadmap

## Implemented
A static HTML/CSS/ES-module frontend uses `web/engine.js` for deterministic integer-cent calculations. `web/app.js` renders state, routes demo assistant questions and exposes optional browser speech APIs. The demo state is in memory and disappears on reset/reload. The application does not make banking or model API calls. Recognition may call the browser provider when the user chooses voice input.

Files are served by a local Python HTTP server; there are no runtime npm dependencies. Node’s built-in test runner tests the calculation engine. Python Playwright checks the UI.

## Next integration milestone: a grounded assistant
Keep the calculation engine authoritative. A future model may interpret a request and explain verified tool results; it must not invent balances, credit scores or eligibility decisions. Validate structured amounts, require clarification for ambiguous requests, and return source dates and completeness flags alongside every scenario. Store credentials server-side, never in the static frontend.

Proposed tool contracts (not implemented):
- `get_cash_snapshot`: available integer cents, currency, source identifier, update date and holds status.
- `list_commitments`: dated obligations and user-confirmed completeness.
- `evaluate_purchase`: validated purchase, cash threshold, selected income scenario and calculation output.
- `get_expansion_plan`: itemized costs, owner funds and preparation checklist.

Before a real account connection: select the integration provider, model consent and revocation, implement authentication and authorization, define data retention, secure backend access and audit model/tool activity. Do not move real financial records into this frontend prototype.

Community, experts, business credit and property financing each need a separate product and data design. They are not working integrations in this release.
