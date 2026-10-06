# BNKHER
**Your ambition. A clearer path.**

[Try the live BNKHER demo](https://cmcgh33.github.io/bnkher-business-companion./web/) · Fictional data, with a rule-based demo assistant.

A business banking companion prototype for an owner planning her next chapter. BNKHER helps a fictional furniture boutique understand its cash position, evaluate an inventory purchase, and prepare for a leased-warehouse expansion.

![BNKHER dashboard](design/desktop.png)

## Experience
- **My business:** available cash, a user-chosen cushion, 30-day commitments, and an explainable purchase scenario.
- **My next chapter:** editable expansion budget, owner contribution, funding gap, an illustrative payment, and a document checklist.
- **Business insights:** receipt review prompts and an explicit “not connected” business credit state.
- **Ask BNKHER:** typed demo questions, optional browser speech input, and optional spoken replies.

## Quick preview
Run `python3 build_preview.py`, then double-click the generated **BNKHER-Preview.html** to open the self-contained review copy in your browser. It includes the full interface and demo calculations. Voice features depend on your browser and may need a secure hosted page.

## Run locally
Requires Python 3 for the web server. No API key, account or build step is required.

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory web
```
Open **http://127.0.0.1:8000**. Keep the terminal running. Opening `index.html` directly will not load the JavaScript modules reliably.

## Try this journey
1. Start with the default $8,000 purchase: $24,500 − $8,000 − $8,800 = **$7,700 remaining**, which is **$2,300 below** the $10,000 cushion.
2. Include expected sales to inspect a separate scenario. These sales are uncertain and excluded by default.
3. Mark commitments incomplete: the result asks for more information.
4. Open **Ask BNKHER** and ask “Can I buy $8,000 in inventory?”
5. Open **My next chapter**, adjust the project budget and mark documents prepared.
6. Use **Reset demo** to restore the example. Input changes remain only in the page session.

## Validation
```bash
node --test tests/*.test.mjs
```
The browser integration check requires Python Playwright and its Chromium browser:
```bash
python3 tests/browser_check.py
```
The checked version passed 11 financial/intent tests and a desktop/mobile integration check covering purchase scenarios, incomplete data, unsupported questions, checklist changes, budget changes and reset.

## Scope and status
This is a working frontend prototype with a deterministic calculation engine and a **rule-based demo assistant**, not a connected AI service. All balances, transactions, names, dates and project costs are fictional. There is no banking integration, authentication, persistent data storage, underwriting, money movement, actual credit report, lender connection or tax determination.

Voice is browser-dependent. Microphone access begins only after the user selects Voice input. Speech recognition may be processed by the browser provider; it is not verified across browsers. Typed questions always remain available.

The product name is **BNKHER**. The lavender, blue, violet and peach palette follows the owner’s supplied branding reference. The flame PNG is a reference-derived image edit for prototype use; confirm it against the original master artwork before production. No registered-trademark status is asserted.

[Requirements and acceptance criteria](docs/requirements.md) · [Verification and UAT](docs/uat.md) · [Product decisions](docs/product.md) · [Architecture and integration roadmap](docs/architecture.md) · [Decision flow](docs/decision-flow.md)
