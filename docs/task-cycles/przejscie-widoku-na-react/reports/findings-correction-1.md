# Findings of the correction's review to fix — Minor findings within the task

Source: `reports/review-correction-1-report.md` (`PASS 4f6947425b2f1af1c29de6b4181e731fbba69914`), copied from it in the reviewer's words. The review passed; no finding blocks. The human's remark of this correction (`reports/correction-1-remarks.md`, item 3) binds: anything the fresh reading finds that the change contradicts is fixed in this same correction, code or entry, whichever the foundation requires, so both Minor findings below are fixed.

### Minor (both within the task)

**m1 — The new test of the shared controls sends a `change` event by hand, not through the harness's `fire` (D-264).**
Place: `tests/view/shared-controls.test.mjs:897-900`:
```js
await inAct(() => {
  select.value = "beta";
  select.dispatchEvent(new window.Event("change", { bubbles: true }));
});
```
D-264's binding sentence: "A test file of such a screen clicks a control through the harness's `press`, … and sends an event through its `fire`, which sends the event as a browser does and which the test file puts in `act` where React must answer, and keeps no copy of either." The file is new in this range (slice 11, `e8b68dda`); it carried the line over from the deleted `tests/view/react-controls.test.mjs`. It is no defined copy of `fire` (the *violates* example), so the case still protects its behaviour and passes; it is Minor. Fix in the code, not in the entry: `fire(select, "change")` inside the same `inAct`, with `fire` imported from `./page-document.mjs`. `pressEnter` at `:936-946` dispatches a `KeyboardEvent` by hand too, but `fire` (`tests/view/page-document.mjs:125-131`) builds a plain `Event`, which carries no `key`, so the harness offers no way for it; that is the repository's pattern in seven other files and no finding here.

**m2 — D-264's rationale and the *Good* line of the guideline rule „Nowy ekran i moduły w DOM” still say the page builds the panel of a card taken down; `createFailureCard` in `account-card.tsx` builds it.**
Places:
- `foundations/decisions.md:1251-1253` (D-264 *Rationale*, rewritten in this range by `937e4b0a`): "the cases that walk the page also walk what the page builds by hand, the header, the main block and the panel of a card taken down".
- `guidelines/coding-browser-module.md:194` (*Good*): "strona buduje przez API DOM tylko miejsca, w których montują się korzenie, i panel w miejscu zdjętej karty".
- The code: `src/browser/view/account-card.tsx:674-683` builds the panel, called at `:700`; `app.ts` builds only `<header>` and `<main>` (`app.ts:253`, `:264`), and each host is built by its factory.

The rule's body under the *Good* line (`coding-browser-module.md:197-202`) was corrected by `f89dbd09` (finding m4 of the review of the whole change) and now names `createFailureCard`; the *Good* line above it and D-264's rationale were not. D-264 names no file, so "the page" read as the whole start page is true, and what the rationale argues (the imitation must carry what is built by hand) holds; the *Good* line, though, sits directly above a body that defines „Strona” as `app.ts`, so a reader can look for the panel there. Graded Minor, as m4 was: no rule changes and no behaviour depends on it. Fix in the entry and the guideline, not in the code: "what the page and its card build by hand" in D-264 (through `the-way-record-decision`), and "strona i fabryki jej korzeni budują … , a panel w miejscu zdjętej karty `createFailureCard`" in the *Good* line.
