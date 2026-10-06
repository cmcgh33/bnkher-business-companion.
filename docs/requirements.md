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
Real customer onboarding, account aggregation, bureau access, model API calls, transaction execution, underwriting, lender matching, tax classification, user accounts, stored chat history, experts and community messaging.

The first release is one fictional owner's journey. It demonstrates requirements-to-implementation traceability without implying production financial capabilities.
