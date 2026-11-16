# Report — the fix of the correction's Minor findings (m1, m2)

**Status:** done

**Range:** starts at `4f6947425b2f1af1c29de6b4181e731fbba69914`; three commits, worktree clean after them.

## Commits

| Commit | Answers | Files (added/removed lines) |
|---|---|---|
| `de69f1f5` test: :white_check_mark: the case of a choice in a select list sends its change through the harness's fire in place of a hand-made event (D-264) | m1 | `tests/view/shared-controls.test.mjs` (+10 / -3) |
| `bac81eb1` docs: :card_file_box: the rationale of D-264 says what is built by hand outside React is the header, the main block, the hosts of the roots and the panel of a card taken down, not what the page alone builds (D-264) | m2, the entry | `foundations/decisions.md` (+2 / -2) |
| `c246b627` docs: :memo: the Good line of the rule on a new screen says the page and the factories of its roots build the places roots mount in, and createFailureCard builds the panel of a card taken down (D-265, D-407) | m2, the guideline | `guidelines/coding-browser-module.md` (+1 / -1) |

## Findings

**m1 — fixed.** In the case "a choice in a select list reaches the screen's handler and a controlled list keeps the value the screen holds", `select.dispatchEvent(new window.Event("change", { bubbles: true }))` became `fire(select, "change")`, still inside the same `inAct`, still after `select.value = "beta"`. `fire` is imported from `./page-document.mjs` (the import line grew to a multi-line form, as Prettier writes it); the `window` destructuring of that case, now unused, is dropped. `pressEnter` is left as it is, as the handoff says (`fire` builds a plain `Event`, with no `key`). The case still protects the same behaviour: `fire` sends a bubbling, cancelable `Event` of the target's window, as the hand-made line did, plus `cancelable`.

- Shown to fail: with `onChange={onChange}` removed from `src/browser/view/controls/react-select-list.tsx`, the changed case fails with `expected ["beta"], got []`; a second case of the same file ("a select list holds its positions ...") fails there too, on React's development warning about a `value` with no `onChange`, which the harness turns into a failure. The line was put back with an edit; `git status` after showed only the test file changed, and `git diff --stat` showed no change in the `.tsx`.

**m2 — fixed, in the entry and the guideline; no code changed.**
- D-264 *Rationale* (`foundations/decisions.md:1251-1253`): "walk what the page builds by hand, the header, the main block and the panel of a card taken down" became "walk what is built by hand outside React, the header, the main block, the hosts of the roots and the panel of a card taken down". This is the wording the earlier review of the return step suggested; it names no file, as the decisions template asks of a *Rationale*. Only that clause changed; the binding sentences, *Verification*, *Rejected* and the rest of the *Rationale* are untouched. A rationale is no binding sentence, so no line `decision:` quotation of any test is affected.
- *Good* line of "Nowy ekran i moduły w DOM" (`guidelines/coding-browser-module.md:194`): now "strona i fabryki jej korzeni budują przez API DOM tylko miejsca, w których montują się korzenie, a panel w miejscu zdjętej karty buduje `createFailureCard`." The body of the rule (lines 197-203) and the example "Gra na stronie i odpowiedzi serwera" already said this and were left alone. The *Good* line of the rule "Wspólna kontrolka w jednej postaci" (line 168) mentions the panel without saying who builds it, so it is true and untouched.
- A search of `foundations/` and `guidelines/` for "page builds", "strona buduje" and "panel of a card taken down" found no other place that says the page builds the panel (two more hits in `decisions.md`, at lines 3949 and 4335, speak of the page building a game, not the panel).

## Checks (command, exit code)

All from the worktree root.

| Check | Command | Exit |
|---|---|---|
| Before m1 | `npm test -- tests/view/shared-controls.test.mjs` | 0 (49 tests, 49 pass) |
| After m1 | `npm test -- tests/view/shared-controls.test.mjs` | 0 (49 tests, 49 pass) |
| Handler broken once | `npm test -- tests/view/shared-controls.test.mjs` with `onChange` removed from `react-select-list.tsx` | 1 (49 tests, 47 pass, 2 fail, the changed case among them) |
| After restoring the handler | `npm test -- tests/view/shared-controls.test.mjs` | 0 (49 tests, 49 pass) |
| Prettier | `npx prettier --check tests/view/shared-controls.test.mjs` | 0 |
| ESLint | `npx eslint tests/view/shared-controls.test.mjs` | 0 |
| Foundation check, after the m2 edits | `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (0 errors, 138 warnings; I did not compare the warning count with the base) |

Not run: `npm run typecheck` (the change touches one test file in `.mjs`, which the typecheck does not read as far as I know; I did not run it to confirm) and the whole `npm test` (the orchestrator's alone, as the handoff says). Prettier was not run on the two Markdown files; the repository's Prettier check scope is TS/JS files, as `guidelines/coding.md` rule "Formatter" says.

## Own-work check (`make-change`, section 3)

- Requirement most likely not met: that the changed case still fails when the handler does not receive the event, since `fire` differs from the hand-made event (it adds `cancelable`, and takes the window from the target). Check: broke the handler and ran the file; the case failed with `expected ["beta"], got []`, then passed after restoring it (rows above).
- For m2, the requirement is that the two lines say what the code does. Check: read `createFailureCard` in `src/browser/view/account-card.tsx` (named by the findings at `:674-683`, called at `:700`) and the guideline's own body (`:197-203`) against the new wording; the check of the foundation passed.

## Choices

- m2, D-264: used the clause "what is built by hand outside React, the header, the main block, the hosts of the roots and the panel of a card taken down" (the earlier review's suggestion) rather than "what the page and its card build by hand" (the suggestion in the findings file). Reason: the handoff asks for what the code does (page: `<header>` and `<main>`; factories: hosts; `createFailureCard`: the panel), and the first wording lists all four without naming a file or a function, which a *Rationale* must not do; the second leaves out the hosts. Cost if wrong: one rationale clause is reworded; no binding sentence depends on it.
- The entry was edited by the rules of `elements/decisions/template.md` ("Changing a decision": edit in place) and `skill/SKILL.md`; there was no question for the human, no new entry, no new number and no neighbour to move (step 4.4: nothing derives from a rationale). I did not run the full interactive skill (show the entry, ask), since the reader of a rationale change has no meaning to approve beyond what the findings file and the human's remark 3 already bind.

## Reaches beyond the handoff

- `guidelines/testing.md` read whole (the handoff names it through `AGENTS.md`, not by path in the dispatch list) and `guidelines/coding.md` whole, as `AGENTS.md` requires before a change of tests. `.the-way/task-cycle/change/fix.md` (named by `change/SKILL.md`), `elements/decisions/skill/read.md`, `decide_entry.md`, `elements/decisions/template.md`, `elements/common/rules.md` and `elements/common/way_of_working.md` were read for the entry. `the author's rules for a commit` read before committing.
- A search of `foundations/` and `guidelines/` for other statements that the page builds the panel (above).
- No decision index run: the work changed only a rationale clause of a decision I was given by number, and read D-264 whole; D-265 and D-407, named by the guideline rule, were not opened as entries beyond what the rule cites.

## Unread material

- `guidelines/styleguide-browser-view.md` (the handoff: "the test is in it" — the part `browser-view` — I did not open it; the change is one event call in an existing test and a Markdown line, with no appearance involved). 
- `src/browser/AGENTS.md`: not read; I changed nothing under `src/browser/` (a temporary break of `react-select-list.tsx` was restored before any commit).
- `elements/decisions/examples.md`, `elements/common/missing_element_file.md`, `elements/common/critique/SKILL.md`, `elements/common/projected_mode.md`, `elements/decisions/skill/projected.md`: not read; not reached by an edit-in-place of a rationale outside projected mode.
- `reports/review-correction-1-report.md` and `reports/correction-1-remarks.md`: not read; the findings file carries the findings in the reviewer's words and the handoff states the binding remark.
- `account-card.tsx:674-700` itself: not read; the claim that `createFailureCard` builds the panel rests on the findings file and on the guideline's body at `:197-203`, which names it.
- `.the-way/product-guidelines/coding/SKILL.md`, `template.md`, `coding/template.md`: read whole.

## Searches not found or unclear

- None not found. Unclear: the handoff says to keep "the guideline file as the coding guideline's template shapes it"; the template says a rule lists no state and repeats no decision, and a *Good* line naming `createFailureCard` is a code name, not a state of the product; the body of the same rule already names it, so I followed the findings file. If a reviewer holds that a *Good* line should name no function, the line can say "a panel built outside React" in its place.

## Working copies

- Directory `.runs/correction-1-fix/` in the worktree held only the logs of the focused runs (`before.log`, `after.log`, `broken.log`, `restored.log`, `foundation.log`, `instr.log`); the numbers they held are in this report. It was removed before return. No worktree, clone or screenshot was made.
