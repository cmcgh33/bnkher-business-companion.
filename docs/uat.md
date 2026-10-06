# Verification and UAT record

Validation date: October 6, 2026. Automated local evidence: Node 24 and headless Playwright Chromium. These are prototype checks, not production certification.

| Scenario | Expected result | Evidence |
|---|---|---|
| Default $8,000 purchase | $7,700 remaining, $2,300 below the $10,000 cushion | Engine and UI: passed |
| $5,700 purchase | Exactly $10,000 remains; cushion maintained | Engine: passed |
| $5,700.01 purchase | One cent below cushion | Engine: passed |
| Include expected sales | $19,700 remains for default purchase; selected scenario distinct from cash-only | Engine and UI: passed |
| Incomplete commitments | Ask for completion instead of a confident spending status | Engine and UI: passed |
| Date boundaries | Include day 0; exclude day 30 and November 15 invoice | Engine: passed |
| Invalid inputs | Reject non-finite/negative money and fractional-cent inputs | Engine: passed |
| Ambiguous assistant amounts | Ask for a single clear amount; reject precision loss | Engine: passed |
| Unsupported question | Explain demo scope without invented answer | UI: passed |
| Expansion budget edit | Inventory $40,000 changes funding gap to $67,000 | UI: passed |
| Preparation update | Marking debt schedule complete changes count from 3/6 to 4/6 | UI: passed |
| Illustrative financing | $62,000 at 10% over 60 months gives $1,317.32/month | Engine and UI: passed |
| Reset | Restore default inputs and fictional snapshot | UI: passed |
| Desktop/mobile layout | No horizontal page overflow at 1440px and 390px | UI: passed |
| Offline review build | Dashboard and assistant work from generated local HTML file | Playwright file-URI check: passed |

Run commands and environment prerequisites are in the README. Test source is in `tests/`. Screenshots in `design/` show the checked interface, not real financial accounts.

Not verified: browser speech on physical devices; screen-reader and WCAG compliance; live bank/credit integrations; authentication and permissions; persistent storage; model safety under open-ended requests; real lender requirements; security and production load.

## Version 0.2 AI integration
22 combined engine/backend tests passed. The added suite covers strict model request formatting, authoritative cash values, user-selected scenario flags, invalid settings, malformed model responses, missing amounts, provider errors, credit/tax boundaries, private access codes, forbidden web paths, origin checks and request quotas. Provider responses are injected fixtures, not real OpenAI calls.

`python3 tests/ai_browser_check.py` passed the live-mode UI path with an injected provider, including missing/wrong application code, a grounded purchase result and switching back to demo. Eight optional billed provider evaluation cases are in `tests/live-eval.mjs`; they have not been executed.
