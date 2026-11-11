PASS 0611dfa42e681d1b264e1352fdc6a0d9defcbcfb

# Review of the fix of the Minor findings — koszty-i-stan-ogniska

Range `99b9ce97d467e232ba2feb9b4e14cca73b6dd7d9..0611dfa42e681d1b264e1352fdc6a0d9defcbcfb` (`5f0793f`, `a00f10a`, `0611dfa`). `git rev-parse HEAD` in the worktree is the head given. Bounded by `reports/review_whole_findings.md` (M1 to M4, all Minor, none blocking) and the author's `reports/fix_minor_report.md`. No new Critical or Important finding; no remaining finding blocks.

## Each finding

**M1 — fixed.** `src/browser/view/credits.ts`: a second constant `COLOUR_CHANGED = "zmienione (zmieniony kolor)"` is the `changes` of `"wood-pile"` alone; `CHANGES` ("zmienione (bez tła, jasny kolor)") stays for the sixteen icons copied from the source repository. The two comments that were untrue (the file header and the `CHANGES` comment) now say the icons come from game-icons.net, from its source repository and `wood-pile.svg` from its page, and that `CHANGES` is the change made to the files copied from the repository. Truth of the new sentence: in the first review I downloaded the page's white-on-transparent file and found the committed file identical to it except `fill`; so "only its colour was changed" is what the page's file and the committed one differ by, and the licence (CC BY 3.0, section 4(b)) asks only that the credit identify that the file was changed, which it does. The sentence names no colour value, so `browser-view-token-values` is not touched. Tests: `tests/view/icons.test.mjs` now has `CHANGES_OF = { "wood-pile": "zmienione (zmieniony kolor)" }` and asserts each credit's `changes` equals its icon's own statement, each footer line and each line of the credits section carries it, and the footer line of the extinguished campfire as a written-out literal; the literal and the table are written by hand, not read from `credits.ts`, so a return of `wood-pile` to the shared sentence fails the first assertion. `test_icon_credits.py` still finds a statement of change in each credit (stem „zmienion” in `CHANGE_WORDS`) and passes. A small matter of wording, not a finding: "zmieniony kolor" reads a little stiff in Polish; the statement is true and clear.

**M2 — fixed.** `foundations/decisions.md`, D-362: *Relations* is now `derives from D-288 · derives from D-63 · derives from D-293`; the diff touches that one line. The relation is written in the dependant, as the template says, so D-293 is not edited. `foundation_check.py` gives 0 errors.

**M3 — left unchanged by the author, with evidence; not in this fix's scope.** The author's evidence holds: the wording is the task's answer 2 and D-362's binding sentence, and the four equal columns come from `columnsOf` in `rule-panel.tsx` and the grid rule in `styles.css`. I marked M3 in my review as a cost of the task's own answer, with no change demanded; I keep that. The orchestrator carries it to the request.

**M4 — fixed.** `NATURE_ENERGY_NAME` (`one`, `few`, `many`) is exported from `src/browser/sim/data/actions.ts` and imported by `program-editor.ts`; the local constant `NATURE_ENERGY` is gone and the price still reads „(10 energii natury)” (pick and panel tests pass). The data file is a simulation data file, so the view reads it by import as it reads `ACTIONS` already; `simulation-isolation` is untouched (a constant). The other two places that write the name ( `sim/program.ts` „brak energii natury: …”, a genitive after „brak” as D-310 words it, and `view/body-row.ts` „Energia natury 100”, a nominative label) are other grammatical uses, not the counted form, as the author says; folding them into the list would tie different cases to it, so leaving them is right. New test: `countedName(1, …)`, `(2, …)` and `(10, …)` with `NATURE_ENERGY_NAME` give „energia natury”, „energie natury”, „energii natury”, with the three strings written out in the test.

## Inspection of the fix diff for what it broke

- Three commits, six files: `foundations/decisions.md` (one line), `src/browser/sim/data/actions.ts`, `src/browser/view/credits.ts`, `src/browser/view/program-editor.ts`, `tests/view/icons.test.mjs`, `tests/view/program-editor.test.mjs`. Nothing else.
- **Trust boundary:** `git diff 99b9ce9 --stat -- assets` is empty; `assets/icons/wood-pile.svg` and the other icons are untouched. The credit text is still a statement that the page's file and the licence allow (see M1). `icon-file-content` passes.
- The credits section and the footer read `credit.changes` per icon and needed no code change; `icons.test.mjs` runs both and passes (33 tests).
- Minor note, not a finding to fix: `NATURE_ENERGY_NAME` stands between the `ActionDef` type and `ActionId` in `actions.ts`, apart from `natureEnergy` fields it is described as sitting beside; only the doc comment says "beside". Position without effect.
- `index` and branch of the reviewed worktree untouched.

## Declined to judge

- M3 (the line breaks of the price in the four-column pick): the human's at the request; outside this fix.
- Whether the Polish phrase „zmieniony kolor” is the best wording: taste.

## Checks run

All in a scratch worktree of `0611dfa` outside the reviewed worktree (`.the-way` copied, `node_modules` linked, both removed with the worktree; reviewed worktree: `git status --short` empty before and after, HEAD unchanged).

| Check | Command | Exit |
|---|---|---|
| head | `git rev-parse HEAD` | 0, `0611dfa42e681d1b264e1352fdc6a0d9defcbcfb` |
| icons test (builds first) | `npm test -- tests/view/icons.test.mjs` | 0 (33 pass) |
| focused tests | `node --test tests/view/program-editor.test.mjs tests/view/rule-editor.test.mjs tests/sim/data.test.mjs tests/view/footer.test.mjs` | 0 (168 pass) |
| invariants | `npm test -- tests/invariants/test_icon_credits.py` | 0 |
| | `npm test -- tests/invariants/test_icon_file_content.py` | 0 |
| | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| | `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| foundation | `py -3 -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| format | `npx prettier --check` on the five changed code and test files | 0 |
| lint | `npx eslint` on the same five files | 0 |
| boundary | `git diff 99b9ce9 --stat -- assets` | empty |

Not run: `npm test` (the cycle's gate, by the handoff); `loop2-container-icons` (the fix does not touch `assets/` or the `Dockerfile`; it passed on the previous head); the mutation tool (the fix changes no simulation logic, only a data constant); a screenshot (no screen changed visibly).

## Unread material

- The fix handoff `review_fix_handoff.md`, `fix.md` of the review skill and the author's fix report: read whole. `review_whole_findings.md`: read the first 40 lines (all four findings, whole text).
- Not reread: the decisions, guidelines and invariants of the whole-change review; the fix touches only what the findings name, and I relied on my earlier reading of them (decision and guideline counts as in `review_whole_report.md`, unchanged by this fix).
- `body-row.ts` and `sim/program.ts`: only the lines that write „energii natury” seen by search, not read whole.

## Searches not found or unclear

- Not found: a test or a source file other than `icons.test.mjs` and `credits.ts` that holds the sentence "jasny kolor" (grep of `src` and `tests`); none, so no other place needs the new sentence.
- Not found: any consumer of the old local `NATURE_ENERGY` constant outside `program-editor.ts` (it was not exported).
- Unclear: none.
