PASS c246b6274c0025f82bd970c88fd70df721e5b0df

# Review of the fix of the correction's Minor findings (m1, m2)

- Range: `4f6947425b2f1af1c29de6b4181e731fbba69914..c246b6274c0025f82bd970c88fd70df721e5b0df`, three commits (`de69f1f5`, `bac81eb1`, `c246b627`). `git rev-parse HEAD` = `c246b6274c0025f82bd970c88fd70df721e5b0df`, the head given; `git status --short` empty.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. The findings file (`reports/findings-correction-1.md`) bounds the review; its two findings are Minor, so only a new Critical or Important finding in the fix diff would fail it (WAY-162).
- Result: m1 fixed, m2 fixed. No new finding of any grade.

## The findings, one by one

**m1 — fixed.** `tests/view/shared-controls.test.mjs:904-907` now sends the change through the harness: `fire(select, "change")` inside the same `inAct`, after `select.value = "beta"`, with `fire` imported from `./page-document.mjs` (`:7-14`); the `window` that only the hand-made event used is gone from the case's parameters (`:892`). This is what D-264's binding sentence asks ("sends an event through its `fire` … which the test file puts in `act` where React must answer"). `fire` (`tests/view/page-document.mjs:125-131`) sends a bubbling, cancelable `Event` of the target's window, which React's `onChange` of a `<select>` hears as the old line's event did. The case still asks both things the select list's behaviour needs: the handler gets `"beta"` (`:908`) and the controlled list shows the screen's `"alfa"` (`:909-913`). It can fail: a handler not wired, or an event React does not hear, leaves `seen` empty; the fix agent showed that with `onChange` taken out of `react-select-list.tsx` (`expected ["beta"], got []`). I did not repeat that mutation (it needs a file changed; see Checks); the reasoning above and the test's run at the head stand for it. `pressEnter` (`:936-946`) is left as the finding said.

**m2 — fixed.**
- D-264 *Rationale* (`foundations/decisions.md:1251-1253`) now reads "walk what is built by hand outside React, the header, the main block, the hosts of the roots and the panel of a card taken down". That is what the code does: `app.ts` builds `<header>` and `<main>` (`app.ts:253`, `:264`), each root's factory builds its host (`waiting-screen.tsx:92`, `page-sentences.tsx:85`, `header-rows.tsx:35`, `:74`, `menu-bar.tsx:335`), and `createFailureCard` in `src/browser/view/account-card.tsx:674-683` (called at `:700`) builds the panel. The diff touches only those two lines of the *Rationale*; the binding sentences, *Scope*, *Based on*, *Relations*, *Verification* and *Rejected* of D-264 are unchanged, so no `decision:` quotation of a test is affected. The fix chose this wording over the findings file's "what the page and its card build by hand"; it is the more complete one (it names the hosts too) and names no file, as a rationale should. Accepted.
- The *Good* line of „Nowy ekran i moduły w DOM” (`guidelines/coding-browser-module.md:194`) now says "strona i fabryki jej korzeni budują przez API DOM tylko miejsca, w których montują się korzenie, a panel w miejscu zdjętej karty buduje `createFailureCard`", which matches the code above and the rule's body under it (`:197-203`). A *Good* line naming a function the body of the same rule names is no departure a reader would read wrongly; nothing to raise.

## New findings in the fix diff

None. Nothing outside the three places above changed: `git diff --stat` of the range shows `foundations/decisions.md` (2+/2-), `guidelines/coding-browser-module.md` (1+/1-) and `tests/view/shared-controls.test.mjs` (10+/3-, the import reflowed by Prettier and the one event line).

## Declined to judge

None.

## Checks run (from the root of the reviewed worktree)

| Check | Command | Exit | Result |
|---|---|---|---|
| shared controls | `npm test -- tests/view/shared-controls.test.mjs` | 0 | 49 tests, 49 pass |
| types | `npm run typecheck` | 0 | |
| lint | `npx eslint tests/view/shared-controls.test.mjs` | 0 | no report |
| format | `npx prettier --check tests/view/shared-controls.test.mjs guidelines/coding-browser-module.md` | 0 | "All matched files use Prettier code style!" |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 138 warn, 7 info`, the same counts as at `46e57217` in the review of the whole change |
| range | `git log`, `git diff`, `git diff --stat` of the range; `git status --short` | 0 | as above; worktree clean |

Not run: the whole `npm test` (the orchestrator's alone); my own mutation of `react-select-list.tsx` (it would change a product file; a worktree of the head with its own `node_modules` and build for one line was not worth it, given the fix agent's run and the reasoning under m1).

## Reaches beyond the dispatch

- `src/browser/view/app.ts`, `account-card.tsx`, `waiting-screen.tsx`, `page-sentences.tsx`, `header-rows.tsx`, `menu-bar.tsx`: the lines that build the header, main, hosts and panel, read in the review of the correction and cited for m2.
- `tests/view/page-document.mjs:125-131`: what `fire` sends, for m1.

## Working copies

- `.runs/review-correction-1-fix/` held only the logs of the checks above. Removed before returning; nothing of it is needed beside this report.
- `dist/` (the product's build output, ignored by git) stays as the product's tools leave it.

## Unread material

- `reports/correction-1-fix-report.md` and `reports/findings-correction-1.md`: read whole.
- D-264: the changed lines read in the diff and in context at the head; the entry was read whole in the review of the correction, and the range changes nothing else in it.
- `guidelines/coding-browser-module.md`: the changed line and the rule around it (`:190-209`) read at the head; the file was read whole in the review of the correction.
- `tests/view/shared-controls.test.mjs`: the import and the changed case (`:1-22`, `:886-915`) read; the rest unchanged by the range.
- none else.

## Searches not found or unclear

- none.
