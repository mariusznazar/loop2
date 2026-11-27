**Status:** done

# Fix 1 — the five Minor findings of the review of the whole change (task `przejscia-miedzy-ekranami`)

Worktree `the worktree's root`, branch `task/przejscia-miedzy-ekranami`, range `328562ac..caf7a814`. Nothing pushed.

## Commits

| Commit | What |
|---|---|
| `1370d75a` | docs: D-196's binding sentence (finding 1) with the five `decision:` quotations that held its old words; the styleguide rule „The screen Postać” (finding 2) |
| `caf7a814` | refactor: comment naming D-396 on the `(hover: none)` block (finding 3); `mapRunEnded` points to `purchaseOpen` (finding 4); content comparison in the test (finding 5) |

## Files changed (added / removed lines, 328562ac..HEAD)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 1 | 1 |
| `guidelines/styleguide-browser-view.md` | 2 | 4 |
| `src/browser/run-screen.css` | 2 | 2 |
| `src/browser/sim/run.ts` | 5 | 1 |
| `tests/sim/rule-signs.test.mjs` | 1 | 1 |
| `tests/sim/skills.test.mjs` | 2 | 2 |
| `tests/view/program-editor.test.mjs` | 2 | 2 |
| `tests/view/program-panel.test.mjs` | 1 | 1 |

## Each finding

1. **D-196's binding sentence — fixed.** „…use the repertoire of the map run's character, including its bought branches” now reads „…use the repertoire of the map run's character, including the branches it had bought at the start of that map run”. That is the code's reading (`programOf(…, run.character.skills)`) and the reading of the *Rationale* this change wrote. The entry's other sentences, *Verification*, *Rationale* and *Rejected* are unchanged. The edit follows `elements/decisions/skill/SKILL.md` as in the foundation step. It is marked `the cycle's`, since no row of *Settlements to record* carries it; it clarifies the meaning and does not change it.
   - Meaning (EN): during a map run, a waiting or ended one included, the editors offer the actions of the branches the run's character had bought when that map run started.
   - Znaczenie (PL): w czasie przejścia, także czekającego albo zakończonego, edytory dają czynności gałęzi, które postać przejścia miała kupione na jego starcie.
   - Five `decision:` quotations ended at the old words „including its bought branches”: `tests/sim/rule-signs.test.mjs:626`, `tests/sim/skills.test.mjs:713`, `tests/view/program-editor.test.mjs:1191` and `:1679`, `tests/view/program-panel.test.mjs:1819`. Each was changed to end at the new words. Those tests hold a repertoire bought before the map run's start, so the new words stay true of what they hold. No assertion changed.
   - `foundation_check.py` → 0.
2. **Styleguide rule „The screen Postać” — fixed.** The quoted UI sentence is replaced by „zdanie D-287 o tym, od kiedy kupiony stopień działa (D-200)”. The sentence about the other character stays. The older quotation under „Wyposażenie”, which the reviewer cites as precedent, is outside this finding and left as it is.
3. **`src/browser/run-screen.css` — fixed.** The `@media (width < 1280px) and (hover: none)` block of `.run-header-back` has a comment of its own naming D-396. The duplicate hover sentence was taken out of the comment of the block above it.
4. **Second copy of the end test — fixed by a comment in `mapRunEnded`** (`src/browser/sim/run.ts`). The comment says that `purchaseOpen` in skills.ts writes the same test out, because run.ts imports skills.ts, and that a new kind of end goes into both.
   - Rejected: moving the end test to a new module that both files import. That means a new file, its place under the part map's rules, and a change of imports in run.ts — larger than the finding asks (`fix.md`: as small as the finding asks). The cost is the same as before: two copies, which the two comments now tie together.
   - No import cycle appears, and no file was added.
5. **`tests/sim/skills.test.mjs` — fixed.** `assert.equal(bought.run, waiting.run, …)` became `assert.deepEqual`. The test now compares the map run by content. It still fails if a purchase wrote the rank into `run.character.skills`, since `deepEqual` compares the run's skills too.

## Checks (command → exit code)

- `python -B .the-way/elements/common/foundation_check.py` → 0 (0 errors)
- `python -B .the-way/instruction-files/check_instructions.py` → 0 (0 error, 0 warn)
- `npx prettier --check` on the changed `.ts`/`.mjs`/`.css` → 0
- `npx eslint` on the changed `.ts`/`.mjs` → 0
- `npm test -- tests/sim/skills.test.mjs` → 0 (21/21)
- `npm test -- tests/sim/rule-signs.test.mjs` → 0 (40/40)
- `npm test -- tests/view/program-editor.test.mjs` → 0 (63/63)
- `npm test -- tests/view/program-panel.test.mjs` → 0 (60/60)
- `npm test -- tests/view/run-header.test.mjs` → 0 (24/24)
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` → 0 (3)
- `npm test -- tests/invariants/test_browser_view_token_values.py` → 0 (4)

Not run:
- the full `npm test` — the gate is the orchestrator's or CI's;
- StrykerJS — the reviewer's tool.

No test needed to fail first: the fix adds no behaviour, and finding 5 makes an existing assertion compare by content.

## Own-work check

The fix most likely to break something is finding 1: a reworded binding sentence leaves a quotation that no longer stands in it. Check: `foundation_check.py` reports every `decision:` quotation outside the binding sentences. It showed 0 errors after the five quotations were updated, and a search for „including its bought branches” finds no file left.

Walk: the fix alters no behaviour a player sees. It changes comments, the words of a decision and a guideline, and one assertion; the one CSS change is a comment. So there is no walk and no screenshot.

## Reaches beyond the dispatch

- `src/browser/sim/run.ts`, `mapRunEnded` — named by the finding. The guideline of the kind, `guidelines/coding-simulation-module.md`, was read in the first stage.
- The four test files that quote D-196, found by a search for `decision: D-196`.

## Working copies

`.runs/author-fix-1/` held the check outputs and the commit message files. It is removed. No browser and no local start was opened, and no process is left running.

## Unread material

none

## Searches not found or unclear

none
