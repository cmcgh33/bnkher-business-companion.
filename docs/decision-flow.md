# A purchase, explained

```mermaid
flowchart TD
  A["Owner asks about a purchase"] --> B{"Clear single amount?"}
  B -->|No| C["Ask for the amount"]
  B -->|Yes| D["Read dated cash and commitments"]
  D --> E{"Commitments complete?"}
  E -->|No| F["Explain missing information"]
  E -->|Yes| G["Calculate remaining cash"]
  G --> H{"Cushion maintained?"}
  H -->|Yes| I["Show remaining cash and assumptions"]
  H -->|No| J["Show shortfall and cash-only room"]
  I --> K["Owner reviews the scenario"]
  J --> K
  classDef start fill:#e9e1ff,stroke:#8060c6,color:#49346d
  classDef decision fill:#fff0e6,stroke:#e9a782,color:#704635
  classDef result fill:#e6eaff,stroke:#7589d2,color:#344673
  class A,D,G start
  class B,E,H decision
  class C,F,I,J,K result
```

Expected income is excluded unless the owner explicitly selects that scenario. A scenario never authorizes a transaction. In the prototype, routing is rule-based; this flow describes the intended reasoning boundary for a future grounded AI assistant as well.
