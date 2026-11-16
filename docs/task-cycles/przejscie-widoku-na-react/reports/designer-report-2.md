# Designer report 2 — revision after the FAIL

**Status:** done

- Spec revised: `docs/task-cycles/przejscie-widoku-na-react/spec.md` (the text reviewed stays as `spec-reviewed.md`, identical to the first `spec.md` — checked with `diff -q` before editing).
- Review read whole: `docs/task-cycles/przejscie-widoku-na-react/reports/spec-reviewer-report.md`.
- Method: `.the-way/task-cycle/spec/SKILL.md` and `design.md`, designer's variant, revision.

No finding held wrong; each was checked against the code or the guidelines before the spec changed.

## What changed per finding

### F1 — structural assertions of `tests/view/account-screen.test.mjs`

Checked: `:3386` (`line.classList.contains("form-warning")` on the element `save-line`), `:3391`–`:3395` (header children `[false, true]`), `:1325`–`:1327` (`notice.parentElement` taken as `<main>`, index 0, holding the game), `:3340`–`:3350` (`main.children` destructured as confirmation, refusal, game). All four break under Decisions 1 and 2, as the reviewer says. I also searched the start-page tests (`account-screen`, `uncaught-failure`, `previous-save`, `owner-panel`) for `parentElement`, `.children`, `childrenOf(header|main|root)` and `firstElementChild`: no other assertion breaks; `:1712` (a notice first among its parent's children) keeps passing in the host of the sentences, and `uncaught-failure.test.mjs:680`–`:686` (bar first in the header) keeps passing.

Changed:
- Decision 7 gains the bullet "Four assertions of `tests/view/account-screen.test.mjs` that read the page's element structure", with the ground (To do 2, settlement row 3 / question 2 a, Decision 1's always-present hidden host) and, for each, what the rewritten assertion still protects (the sentence of the line of saving in `form-warning`; the bar first and the line of saving under it among the header's shown children, outside the menu; the notice first among `<main>`'s shown sentences and before the game; confirmation, refused-load sentence and game in document order). It names `:1712` as unchanged.
- Decision 3's "Cost if wrong" no longer claims no existing case changes: the page's state changes none; the four structural assertions change with the roots.

### F2 — Decision 6 against the styleguide's rule "The kitchen-sink page"

Checked: `guidelines/styleguide-browser-view.md:416`–`:419` says code only the page needs stays in its entry module, since in `src/browser/view/` it would reach `npm run build`. The prop of the first Decision 6 broke that. The probe `tests/invariants/test_application_build_kitchen_sink.py:43`–`:48` imports `PAGE_MARKER` from `./kitchen-sink/kitchen-sink.js`.

Ways weighed (the orchestrator left the choice to me):
- **Keep the prop and revise the rule** through `the-way-maintain-styleguide`: explicit and robust, but no settlement of the task asks for a rule change, the shared control grows for a page no player sees, and the prop's code reaches what players load.
- **Stay within the rule** (chosen): the page's entry module, right after the root's first synchronous draw and outside React (not an Effect, D-267), types an empty text into the sample through the field's existing `inputRef`, the way D-264's harness types (native value setter, bubbling `input` event). The field holds an empty draft, as when a player clears it. Cost if wrong: a later React that notices typed values differently makes the sample show its number; no test catches it, the developer opening the page sees it, the fix stays in the page module.

Changed:
- Decision 6 rewritten to the chosen way, with the prop now among the rejected ways and the rule as its reason.
- Constraints gain the rule's paragraph and the `PAGE_MARKER` constraint.
- Goal 1: the shared controls are untouched for the page's sake (To do 5 and 6 still change them on their own grounds); Goal 5 drops "except the one prop of Decision 6".
- Decision 7 drops the case for the prop.
- Decision 8: the rule's last paragraph stays as it stands.
- *Left to the maker*: the split of `kitchen-sink.tsx` is no longer open — the page stays one entry module holding all page-only code and exporting `PAGE_MARKER`; the prop's name is gone from the list.

### F3 — marks of the foundation entries

Changed: *Foundation entries* opens with what the two marks mean, and each entry carries one:
- D-265: settlement row 2, question 3 b (and 1 a for the comparison test going).
- D-269: settlement row 1, question 1 a; the weighing of its *Based on* marked as the cycle's precision.
- D-407: settlement row 3, question 2 a, for the separate roots; the three roots of the rows and the way the row of the failure is drawn and shown (Decision 1) written apart, as the cycle's precision answering the carried question.
- D-03: follows settlement row 3 and To do 2; the wording is the cycle's precision.
- D-323: the cycle's precision carrying To do 4 (loop2#62-5), which is no settlement row.
- D-44, D-275, D-276: follow settlement row 2 (question 3 b); the wording is the cycle's precision.
- D-381: the cycle's precision, following To do 2.

### F4 — focus after a repeated refusal

Checked: `src/browser/view/app.ts:318`–`:323` (`askingFailed`) focuses „Spróbuj ponownie” at every refusal, and `loadFailed` goes through it. Changed: Decision 3's state refused now says focus moves to the button at every entry into it, a refusal after retrying included, since the disabled button lost focus while waiting.

### F5 — the state stopped and the shown `session-check`

Checked: `tests/view/uncaught-failure.test.mjs:769` asserts `shown(byClass(root, "session-check")[0])` inside `assertWaitingWithSentence`, which Decision 7 keeps. Changed: the state stopped draws the element `session-check` empty, with no text and no button (Decision 3), and the waiting screen's unit in Decision 2 says that element stands in every state. The check stays unchanged.

## Not changed

- The reviewer's note that the screen-reader hypothesis of Decision 1 reads better as a risk accepted than as something a browser check or a reviewer can confirm: a note that does not fail the spec, so left as it stands.
- Noticed while revising, outside the findings and left as instructed: Goal 5 refers to "(Decision 5)" for the new test file, where Decision 7 is meant. The maker should read it as Decision 7.

## The four checks, again

1. No placeholder or empty section.
2. Contradictions: Goal 1's "untouched" reworded so it does not contradict To do 5 and 6, which change `src/browser/view/controls/`; Decision 6 now agrees with the styleguide's rule; Decision 3 and Decision 7 agree on which assertions change. The one wrong cross-reference noted above remains.
3. Scope: as in the first report.
4. Two-way readings settled: focus at a repeated refusal (F4); what stopped draws (F5); whether the page module may split (F2: it may not).

## Working copies

None made; `.runs/designer/` was not created.

**Unread material:**

- `tests/view/account-screen.test.mjs` — read again only at lines 214–224, 450–470, 544–556, 1268–1276, 1310–1332, 1690–1716, 2075–2095, 3280–3287, 3330–3400 and 5232–5260, and searched for structural reads; the rest unread.
- `tests/view/uncaught-failure.test.mjs`, `previous-save.test.mjs`, `owner-panel.test.mjs` — searched for structural reads only in this revision.
- Everything the first report lists as unread or read in part stays so.

**Searches not found or unclear:**

- A test asserting focus on „Spróbuj ponownie” after a repeated refusal: none found, as the reviewer reports; the spec's sentence, not a test, now holds it.
- Whether typing through the native value setter outside `act` on the kitchen-sink page draws the empty draft at once in the browser: reasoned from `ReactNumberField`'s `onChange` and D-264's harness, not run.
