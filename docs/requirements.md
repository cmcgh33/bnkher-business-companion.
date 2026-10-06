# Requirements and acceptance criteria

## Problem and intended outcome
An existing business owner needs a coherent view of cash commitments and expansion costs before a purchase or a lender conversation. The prototype translates that need into explainable scenarios and a preparation workflow. No measured customer or business outcome is asserted.

| ID | Owner story | Acceptance criteria | Verification |
|---|---|---|---|
| R01 | See my current cash and near-term commitments | Show the dated fictional balance; include commitments from the snapshot date through day 29; exclude day 30 and later | Engine date-window test; dashboard check |
| R02 | Choose the reserve I want to protect | Accept nonnegative dollars to cent precision; compare remaining cash with the chosen threshold; equality maintains the cushion | Parsing and cushion-boundary tests |
| R03 | Understand an inventory purchase | Show available cash, proposed purchase, commitments, remaining cash and difference from the cushion | $8,000 engine and UI checks |
| R04 | Explore possible income separately | Exclude expected sales by default; selected scenario labels income uncertain; preserve cash-only room as a separate number | Optional-income engine and UI checks |
| R05 | Know when information is missing | Incomplete commitments cannot produce a confident maintained-cushion result | Incomplete-data engine and UI checks |
| R06 | Plan a warehouse expansion | Itemize costs, separate owner funds, floor the funding gap at zero, and show an illustrative fixed-rate payment with exclusions | Budget and payment tests; UI editing check |
| R07 | Prepare my documents | Allow checklist changes; show documents prepared out of total; never label completion approval or eligibility | Checklist UI check and documented boundary |
| R08 | Ask a plain-language question | Route supported demo requests; request a clear amount for ambiguous purchases; decline unsupported requests without inventing information | Intent tests and unsupported-question UI check |
| R09 | Review my business credit and bookkeeping information | Display unconnected credit explicitly; suggest invoice/receipt review without assigning a score, deduction or savings | Insights UI check and manual copy review |
| R10 | Use the experience on my phone | Reflow at 390px without horizontal overflow; keep the assistant usable and closable | Mobile browser check |

## Data dictionary
All currency is USD. Financial amounts are integer cents in the engine; input and presentation use dollars.

| Entity | Important fields | Meaning |
|---|---|---|
| Cash snapshot | asOf, business, owner, available, cushion, expectedIncome | Dated example and owner-set threshold; expected income is a scenario input |
| Commitment | id, label, date, cents | Future payment or planned reserve; not already deducted from snapshot |
| Posted activity | date, name, category, cents | Illustrative historical activity already reflected in available cash |
| Expansion plan | inventory, equipment, improvements, moving, cashCushion, ownerContribution | Project budget; proposed owner funds do not execute an account withdrawal |
| Preparation item | id, label, complete | User-marked document availability; not a lending criterion |
| Purchase result | status, purchase, commitments, income, remaining, gap, maxPurchase, scenario, assumptions | Derived scenario with explicit completeness and income selection |

## Excluded from the first release
Real customer onboarding, account aggregation, bureau access, unrestricted model conversation, transaction execution, underwriting, lender matching, tax classification, user accounts, stored chat history, experts and community messaging.

The first release is one fictional owner's journey. It demonstrates requirements-to-implementation traceability without implying production financial capabilities.

## Version 0.2 extension
R11: interpret natural-language questions through a private server-side model connection, while using server-authoritative data and the existing calculation engine. Acceptance: validate a supported action and amount; require an application access code; disclose live mode and data transmission; fail explicitly on malformed/failed provider output; preserve demo mode. Injected-provider tests passed. Real-model interpretation evaluation and hosted activation remain pending.

## Version 0.3 extension
R12: coordinate a purchase and expansion question with read-only evidence tools. Acceptance: cash precedes purchase, funding precedes document readiness, four tools appear for the compound default example, and original data cannot be replaced by model arguments. The $8,000 purchase leaves $7,700; the independent expansion funding gap is $62,000. Seven workflow/backend automated checks pass with injected provider calls; live evaluation and updated browser verification are pending.

R13: stop unsafe or invalid workflows explicitly. Acceptance: unknown tools, added fields, invalid dependencies, repeated tools, invalid amounts and step-limit exhaustion produce no final recommendation. No write tool exists. A completed trace includes source date and evidence; financial wording is application-authored. See [agent contracts](agent-workflow.md).
