# Product decisions

## The owner and her goal
Maya runs the fictional Maison & Maple furniture boutique. Her goal is to lease a warehouse, increase inventory and improve fulfillment. The first journey focuses on a concrete expansion plan. A property purchase is a future journey, not a hidden assumption in this scenario.

## Cash calculation
All financial inputs use integer cents. The commitment window begins on the snapshot date and ends 30 calendar days later, exclusive: October 6 through November 4, 2026. The later November 15 supplier invoice is intentionally excluded.

Available cash is assumed net of holds. Posted activity is already included. Commitments are future obligations and a planned tax reserve, not additional historical expenses. Expected sales are separate, excluded by default, and included only in an explicitly selected scenario.

`remaining = available − purchase − known commitments + selected expected income`

`difference from cushion = remaining − owner-selected cushion`

The cash-only room above the cushion before a purchase is $5,700. This is an arithmetic scenario under disclosed assumptions, not permission to spend. Incomplete commitments always produce an incomplete status. An amount exactly at the cushion maintains it; one cent below does not.

## Expansion calculation
| Item | Fictional amount |
|---|---:|
| Inventory | $35,000 |
| Equipment | $12,000 |
| Space improvements | $15,000 |
| Moving and setup | $5,000 |
| Expansion cash cushion | $10,000 |
| Total | $77,000 |
| Proposed owner contribution | $15,000 |
| Illustrative funding gap | $62,000 |

Owner funds are a planning input, not a transfer from today’s account. They may require saving or another source. BNKHER does not imply the $15,000 can be withdrawn while preserving today’s cushion. The project cushion is a budget line, separate from the current account threshold.

At an illustrative 10% annual rate over 60 months, amortizing $62,000 gives $1,317.32 per month. This excludes fees and other costs. It is not a loan offer, an affordability assessment, or a lender’s actual pricing.

## Boundaries
- Document completion measures preparation, not creditworthiness, eligibility or approval.
- No bureau score appears without a real identified provider, model and report date.
- Transaction review prompts do not confirm deductible expenses or tax savings.
- The assistant cannot execute purchases or transfers and does not claim unsupported knowledge.
- Expert conversations and a community remain future features.
- No employer data, internal bank rules or customer financial records are included.

## Acceptance evidence
The financial suite verifies the date window, exact-cent cushion boundary, default income exclusion, incomplete obligations, invalid amounts, expansion budget and payment calculations, and intent parsing. The UI check exercises the default/optional-income/incomplete scenarios, unsupported assistant prompts, editing budgets and documents, resetting state, and overflow at 1440px and 390px widths. Screenshots are saved in `design/`.

Not validated: speech recognition/audio output on real devices, WCAG conformance, real banking feeds, identity/security controls, underwriting accuracy, production availability or business outcomes. No usage, revenue or savings claims are made.
