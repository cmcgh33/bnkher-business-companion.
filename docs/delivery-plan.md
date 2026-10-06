# Product and delivery plan

A portfolio planning artifact, not a record of stakeholder interviews or production results. Dates below are sequencing targets contingent on private provider access, not contractual commitments.

## Product goal and priorities
Help a boutique owner understand whether a purchase threatens her chosen operating cushion and what information is needed for an expansion conversation. The primary measure is correct, understandable scenario evidence—not chat volume.

| Priority | Capability | Decision rationale | Acceptance gate |
| --- | --- | --- | --- |
| P0, implemented | Read-only tools and deterministic financial answers | Highest risk is a confident unsupported financial answer | Unit/backend checks and visible source/assumptions |
| P0, pending | Private live-provider evaluation | Mocked calls cannot establish interpretation accuracy | Eight live cases pass; errors and latency recorded |
| P1, implemented | Compound inventory/expansion evidence | Demonstrates coordination across business questions | Four ordered tools; no combined affordability claim |
| P1, pending | Review with fictional persona tasks | Correct output can still confuse an owner | Record task completion and misunderstanding; no invented interviews |
| P2, deferred | Persistent user accounts and bank integrations | Adds cost, privacy and operational dependencies before value is verified | Separate requirements, consent and security review |

Alternative considered: autonomous purchases and transfers. Rejected for this prototype because there is no banking integration or authority to perform them. A broader framework was deferred: a small explicit tool loop makes dependencies and failures easier to inspect.

## Milestones and dependencies

| Milestone | Dependency | Exit evidence | Status |
| --- | --- | --- | --- |
| M1: workflow prototype | Existing cents engine and request validation | Automated suite, tool trace and demo walkthrough | Implemented; verification documented |
| M2: private AI pilot | Owner-managed API key, compatible model, hosted Node backend | Real-provider evaluation record and observed request costs | Pending |
| M3: usability review | M2 passes and fictional task script prepared | Actual feedback and resulting backlog decisions | Proposed |
| M4: wider-access decision | Identity, durable quotas, privacy requirements and M3 evidence | Explicit go/no-go rationale | Deferred |

Owner roles: Carla is the portfolio/product owner; implementation and verification are assisted. No external team assignments or approvals are implied.

## RAID register

| ID / type | Item | Mitigation / next action | Gate |
| --- | --- | --- | --- |
| R1 / risk | Model misunderstands a dollar amount | Display interpreted amount; evaluate number words, negatives and ambiguity | M2 |
| R2 / risk | Compound output implies double use of cash | Keep owner contribution separate and state limitation | M1 |
| A1 / assumption | Commitments are complete | User completeness flag; output asks for information when incomplete | Every scenario |
| I1 / issue | Live AI not activated | Private configuration and evaluation; public demo stays labeled | M2 |
| D1 / dependency | Compatible Responses model and backend hosting | Confirm privately before a pilot | M2 |
| R3 / risk | Per-workflow quota hides multiplied cost | Document six-call maximum; reduce allowance for pilot | M2 |

## Measurement plan
Proposed gates: 100% expected numeric results on deterministic fixtures; 100% forbidden-tool rejection on executed cases; 8/8 initial live cases; zero unexplained substitutions after provider failure. Measure live completion latency (median and p95), tool-call count and provider cost per completed workflow once credentials are available. No measured business ROI, adoption or production accuracy is claimed.

Release checklist: execute suite → inspect desktop/mobile workflow → run private live evaluations → record failures and costs → decide whether to activate live mode. Rollback: disable live credentials or unselect live AI; deterministic demo remains available. A failed model run should not be relabeled as a demo success.
