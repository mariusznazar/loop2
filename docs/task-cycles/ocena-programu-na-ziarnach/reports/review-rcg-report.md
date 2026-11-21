PASS c43c8ad7

# Review `rcg` — task `ocena-programu-na-ziarnach`, correction 1, slices 2, 4, 6, 7, 8, 10, 11, 12

- Range `4d813606..c43c8ad7`; `git rev-parse HEAD` in the cycle's worktree is `c43c8ad70af0535af81a7b215ee811819124a144`, the head given. Judged: `bc386205` (slice 2), `614c7559` (4), `d0cf581b` (6), `7ba9d74e` (7), `387cd8ca` (8), `57ed451a` (10), `969d4c60` (11), `c43c8ad7` (12). The other commits of the range (slices 1, 3, 5, 9 and the fix `7b1779fd`) were read as the context these stand on, not judged.
- Method: `.the-way/task-cycle/review/SKILL.md` and, for a correction, `.the-way/task-cycle/review/fix.md`, both read whole.
- Trust boundary (handoff, step 4): `src/browser/sim/saved-game.ts` itself is not changed in the eight commits; the range touches its boundary through its direct refusal cases in `tests/sim/saved-game.test.mjs` (slices 2 and 10). Checked there: the moment of the game refused missing, `null`, fractional, as text, `NaN`, infinite, beyond and below the safe integers, and admitted at 0, below 0, the lowest and highest safe integer and far ahead; a program's content revision refused missing, below 0, fractional, as text, `null`, `NaN`, infinite and beyond the safe integers, and refused where it is put into the content, the copy of a map run or an earning loop's program; a `judgings` key refused as shape empty and filled (and, in `tests/sim/judging-record.test.mjs`, as `null`, a list, a number and a `__proto__` key). The browser's storage, a second place of crafted input that slice 8 reaches, was probed through the page (`tests/view/judging-cache-page.test.mjs`: a window refusing its storage, a storage refusing every call, one refusing writes) and passes; the cache module itself is slice 5's, reviewed apart.
- Irreversible operation: none. The change prepares no deletion of anything a player keeps; the cache's removals at opening touch only values of the cache's own key prefix for the signed-in account (slice 5's code, called by slice 8 as D-441 gives).

## Findings

### Critical

none

### Important

none

### Minor

**M1 — `src/browser/view/maps-entry.ts:26`: the entry's `judgingCache` option stays optional.**
What: the plan's Slice 8 says the option "becomes required" once the game view gives the cache; it stays `readonly judgingCache?: JudgingCache`, and `maps-entry.ts:49` and `:128` read it through `?.`. The executor kept it optional because a slice-6 case of `tests/view/maps-screen.test.mjs` ("an entry given no cache shows the result of a judging, remembers nothing and shows no mark") builds the entry with none.
Why it matters: a later caller of `createMapsEntry` that forgets the cache compiles and runs, and the player silently gets no badge, no count and nothing remembered; the type would have caught it. Today the one production caller, `src/browser/view/game-view.ts:276`, always passes it, so nothing a player sees is wrong now. Neither the task nor the spec requires the option to be required (only the plan's wording does), so this is polish.
Evidence: `maps-entry.ts:22-26`; `game-view.ts:230-236, 276`; executor report slice 8, "Mismatches between the plan and the code", 1.

**M2 — `src/browser/view/maps-screen.tsx:506-530`: the linked half of the sentence of D-287 is a second copy of the text, cut off by length.**
What: `RUN_LINK_TEXT = "Wróć do niego i je zakończ, żeby wysłać postać."` repeats the end of `runWaitingSentence` (`src/browser/view/team-lines.ts:20-22`), and `RunWaitingNote` takes the first part as `sentence.slice(0, sentence.length - RUN_LINK_TEXT.length)` without checking that the sentence ends with that text.
Why it matters: one sentence of the product now stands in two files. Where its wording changes in `team-lines.ts` alone, the paragraph is cut at the wrong place and the link carries the old words. The new case of `tests/view/maps-screen.test.mjs` (the paragraph's `textContent` against the sentence, the link's text against the literal) would turn red, so the drift would not reach a player unnoticed; the cost is maintenance. A function in `team-lines.ts` giving the two parts (not in the slice's *Change*, as the executor says) would keep one source.
Evidence: `maps-screen.tsx:506` and `:521`; `team-lines.ts:21`; executor report slice 11, "Choices", second item.

**M3 — `balance/campaign.mjs:181`: the content revision 0 of a new program written by hand, and nothing tests it.**
What: the campaign builds its saved programs by hand and now gives each `contentRevision: 0`, the number the game's own functions give a new program (D-442). `guidelines/coding-balance-instrument.md`, rule "Liczba gry", asks the instrument not to keep its own copy of a number a game function gives. No case of `tests/balance/` reads the revision; the executor verified the fix (no `NaN` at the first content write) by reading `withProgramContent`.
Why it matters: low. No measurement reads the revision and the campaign never loads a saved game, so a later change of D-442's starting number would leave the instrument's states merely unlike the game's, with no result changed. The hand-built list is the campaign's existing way of making its account (it predates the change), and the field is needed so that the first-chill write does not give `NaN`. Recorded so the whole-change review sees it.
Evidence: `balance/campaign.mjs:169-191`; executor report slice 12, "Own-work check", last sentence.

## The human's remarks (correction 1), as far as this range realizes them

- **Remark 1 (judgings leave the saved game and become a browser cache): made for the range's part.** The document of version 9 holds no judging, holds the content revision and the moment, and a `judgings` key is refused as shape (slices 2, 10). The record and the mark compare the content revision and the generation at reading, so a change of rules, groups or trip plan (A→B→A included), a death that takes practice and ranks (manual run, earning loop, catch-up) and a deletion erase in effect, and a rename, a covered death, a death with no practice and a bought rank do not (slice 4; probes below). The screen reads the mark from the cache at each draw, the judging is remembered inside the act before the one draw and not after a halt, and a judging saves nothing (slices 6, 7). Every page path that makes a new game gives the clock's moment, the key names the account's id and the game's moment, and a game after „Zacznij od zera”, after a discarded save or after a refused save shows none of the earlier marks (slice 8). The instrument makes its games at a fixed moment (slice 12). The fallback of the remark (shortened judgings in the save) was rightly not made: no entry forbids the cache (spec Decision 1, D-441).
- **Remark 3 (the sentence leads back to the open manual map run): made.** The executor checked the base `c36e2739` first and found no link in the row (only the menu bar's „Wróć do przejścia”), so the change was due. „Wróć do niego i je zakończ, żeby wysłać postać.” is a link to `#/postac/{n}/przejscie` of the map run's character in every row, in `text-secondary`, gone with the run; D-287 and the styleguide's rule "The screen Mapy" say so (`guidelines/styleguide-browser-view.md:689-692`).
- Remark 2 is let through by the human; remark 4 is slice 3's (`aaef0873`, reviewed as `rc13`), outside this range; remark 5 asks for nothing to be made.

## What was checked against what

- **Task, *To do* 6 and question 15 (variant b):** the generation comparison in `markOfRecord` (`src/browser/sim/judging-record.ts:96-115`) is an exact equality, so a judging made before a death with `progressLost` never stands after it on any map, and the tests cover the manual map run, the earning loop and the catch-up (`tests/sim/judging-record.test.mjs:395-429`), and the deaths that must not erase (`:431-476`). Stock note and badge as D-440 gives (`:478-517`). „{n} z 12” and the badge only in „Kto idzie” (the screen Mapy alone reads `markOfRecord`).
- **D-441:** key by account id (never the email — the page passes `owner.id`, `src/browser/view/app.ts:200`), game by `state.madeAtMs` (`game-view.ts:230-236`); refused-save removal from `afterConflict` (`app.ts:190, 205`); the one reach of `window.localStorage` is `game-view.ts:233` through the guarded `lastingStorageOf` (a search of `src/` for `localStorage|sessionStorage|indexedDB` finds nothing else); D-323: nothing remembered after a halt (`maps-entry.ts:128`, `tests/view/uncaught-failure.test.mjs` storage-unchanged assertion, `tests/view/maps-screen.test.mjs` halted case).
- **D-04, D-386:** `newGame(Date.now())` at `app.ts:93`, `app.ts:313`, `page-game-acts.ts:187`; a loaded game keeps its moment (load path untouched); the instrument passes `GAME_MADE_AT_MS = 0` (`balance/engine.mjs:38`, imported by `balance/campaign.mjs:60`), which reads no clock (`balance-instrument-repeatability` passes). The constant shared through the engine follows "Jedno miejsce wspólnej rzeczy" (the campaign already imports the engine, no cycle).
- **D-287, D-281:** link target is the run's character, not the row's (`maps-screen.tsx:496-498`); the D-287 *violates* "its link leading to the screen Postać of the character of its row" is guarded by a case and by my probe.
- **D-409, D-170, D-243, Decision 9:** the judging runs inside `store.act` with no `take`, so the store saves only what the catch-up makes; the account-screen cases now expect one save, the start's, at „Puść mimo to” (`tests/view/account-screen.test.mjs`, the `ACTS` row and the card case). Each changed expectation names its reason (spec Decision 9, remark 1), as `guidelines/testing.md`, "Changing an existing test", asks; the removed `afterwards` step had one user, whose subject (a second save held behind a judging's save) no longer exists, and the rule of one save in flight stays covered by `tests/view/game-saver.test.mjs` (named by the executor; not re-run by me).
- **D-206, `guidelines/coding-saved-game.md`, "Wersja podnoszona razem z kształtem":** version stays 9, the document is rewritten with the comment over it saying no saved game of version 9 exists anywhere (`tests/sim/saved-game.test.mjs:84-86`); the version-8 document is still refused as version.
- **Styleguide (read whole):** the link keeps `text-secondary` (`src/browser/maps-screen.css:182-184`, the screen's own stylesheet per "A stylesheet of its own"), the UA underline as the name links have, focus by the one `:focus-visible` rule; no role, value or token is new; the mark's roles are unchanged (`maps-screen.test.mjs` role case). No screenshot file is among the commits.
- **Guidelines of code:** `guidelines/coding.md`, `coding-browser-module.md`, `coding-simulation-module.md`, `coding-saved-game.md`, `coding-balance-instrument.md`, `src/browser/AGENTS.md`: no rule broken beyond M3; no colour or length outside tokens (`test_browser_view_token_values.py` passes); the simulation functions build new values and touch no storage (`simulation-inputs`, `simulation-isolation` pass).
- **Reserved choices:** none taken; `localStorage` is settled by the human's remark and D-441.
- **Code that passes a test without meeting the requirement:** none found — no branch or value in the changed product code made for a test's input.
- **Executors' own-work checks and walks:** each names the weakest point of its slice (the moment on every page path; the halt guard and the order inside the act; the link's target; the record's revision and generation) and its mutation would catch it; my probes repeat that on paths the executors did not mutate. Slice 6 left the browser walk unchecked with a reason (no cache in the page until slice 8); slices 8 and 11 walked the running game and say what they left unchecked (refused save, „Zacznij od zera”, a second account and a refused storage in a real browser for slice 8; a death-ended run and a narrow window for slice 11), each with a reason.
- **Invariant tests changed:** none.

## Declined to judge

- The sentence of D-287 also stands while the manual map run goes on unpaused (`maps-screen.tsx:494`, `run === null ? null : …`), where D-287 names a run that waits in a pause or has ended: the condition predates this range and the change only turned part of the sentence into a link.
- `guidelines/styleguide-browser-view.md` fails `prettier --check`: it fails at the base too (executor slice 11), and D-32 does not put `.md` files under Prettier.
- The code of slices 1, 3, 5 and 9 and the fix `7b1779fd`: reviewed apart (`rc11`, `rc11f`, `rc13`, `rc15`, `rc19`), read here only as context.

## Checks run

All in a detached worktree of `c43c8ad7` at `.runs/review-rcg/wt` after `npm ci` (exit 0). Full list with exit codes: `reports/review-rcg-focused-tests.txt`.

- `npm test -- <file>`, exit 0 each: `tests/sim/saved-game.test.mjs` (45/45), `tests/sim/judging-record.test.mjs` (10/10), `tests/sim/judging.test.mjs` (15/15), `tests/sim/death.test.mjs` (33/33), `tests/view/maps-screen.test.mjs` (50/50), `tests/view/judging-lines.test.mjs` (12/12), `tests/view/uncaught-failure.test.mjs` (19/19), `tests/view/account-screen.test.mjs` (132/132), `tests/view/judging-cache-page.test.mjs` (6/6), `tests/view/judging-cache.test.mjs` (79/79), `tests/view/previous-save.test.mjs` (46/46), `tests/view/chronicle-game.test.mjs` (4/4), `tests/view/end-question.test.mjs` (17/17), `tests/view/end-window-game.test.mjs` (27/27), `tests/view/team-lines.test.mjs` (19/19), `tests/balance/engine.test.mjs` (8/8), `tests/balance/campaign.test.mjs` (16/16), `tests/balance/agreement.test.mjs` (6/6); Python, exit 0 each: `tests/invariants/test_simulation_inputs.py`, `test_simulation_isolation.py`, `test_content_identifiers.py`, `test_cross_part_imports.py`, `test_browser_view_token_values.py`, `test_balance_instrument_repeatability.py`.
- `python -B .the-way/elements/common/foundation_check.py` (the cycle worktree's pinned script, run with the review worktree as its root) — exit 0, "0 errors": no stale quotation of any changed test file. Output: `reports/review-rcg-foundation-check.txt`.
- Mutation probes of my own (`reports/review-rcg-mutate.py`, output `reports/review-rcg-mutate-out.txt`; each file restored byte for byte, worktree clean after): a refused load in `startFrom` making `newGame()` — `judging-cache-page` exit 1 (1 fail); the reset of D-402 making `newGame()` — exit 1 (1 fail); the cache opened under another account id in `game-view.ts` — exit 1 (5 fails); the run link to the row's character — `maps-screen` exit 1 (1 fail); `markOfRecord` with `<` instead of `!==` for the generation — `judging-record` exit 1 (1 fail); the same for the content revision — exit 1 (2 fails); the screen reading each record once instead of at each draw — `maps-screen` exit 1 (4 fails); control after restoring — exit 0. Every mutation is caught.
- StrykerJS (`guidelines/testing.md`, "Mutation testing"): `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/judging-record.ts,src/browser/sim/judging.ts:93-115"` — exit 0, 73 killed, 2 survived, 0 without coverage. Both survivors are the text of the plain `Error` of `recordOfJudging` for a missing character and a missing program (`judging-record.ts:62`, `:67`): behaviour not worth fixing, since the guidelines forbid pinning a refusal's text and the cases assert the error's class. Summary: `reports/review-rcg-stryker-summary.txt`.
- Not run: `npm test` with no file argument and `python -B .the-way/instruction-files/check_instructions.py` — the full gate is the cycle's own run before the request, as the handoff gives; `tests/view/game-saver.test.mjs`, named by slice 7 as the remaining cover of one save in flight, was not run by me.

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md`, named by the method for a correction.
- `foundations/decisions.md`: D-04 (its first three paragraphs, lines 59-85, for the view's sources and the moment), D-437 (lines 901-915) and `guidelines/coding-balance-instrument.md` (whole), for slice 12's constant; D-281 (lines 4594-4606) for the link's address.
- `src/browser/view/app.ts:75-322`, `src/browser/view/team-lines.ts:1-40`, `src/browser/view/screen-address.ts:141-162`, `src/browser/maps-screen.css` (the link and name rules), `balance/campaign.mjs:160-200`, `scripts/test.py` (test discovery globs), `.the-way/elements/common/foundation_check.py:1100-1115` (to confirm the root it checks is the working directory).
- `a note in the author's private notes`, before writing the probe script.

## Working copies

- `.runs/review-rcg/wt`, a detached worktree of `c43c8ad7` with `node_modules`: removed with `git worktree remove --force` and `git worktree prune`.
- `.runs/review-rcg/` (the worktree's parent: test logs, the probe script and its output, the Stryker log, the foundation-check output): removed by its full path. What the report needs stays in `reports/` as `review-rcg-focused-tests.txt`, `review-rcg-foundation-check.txt`, `review-rcg-mutate.py`, `review-rcg-mutate-out.txt`, `review-rcg-stryker-summary.txt`. No remainder.

## Unread material

- Foundation entries named by the plan's sections read in part: D-04 (first three paragraphs, not its *Verification* list or *Rationale*), D-281 (binding paragraphs only); D-442, D-386, D-165, D-206, D-213, D-369, D-190, D-218, D-409, D-323, D-207, D-243, D-209, D-402 and D-439 not opened as entries — their quotations in the changed tests pass the foundation check, and the behaviour they bind was judged through D-440, D-441 and D-287 (read whole) and the spec (read whole). The invariants `save-version`, `simulation-inputs`, `simulation-isolation`, `balance-instrument-repeatability` and the glossary entries `judging` and `generation number` were not read as text; their tests ran and pass. `foundations/part_map.md` ranges not read.
- `tests/view/account-screen.test.mjs` (about 360 KB) read only at the diffs of slices 7 and 8; `tests/sim/saved-game.test.mjs` read at the range's diff and the sweep case, not whole; `tests/view/maps-screen.test.mjs` read at the diffs of slices 6 and 11.
- `reports/walk-report.md:65` (side observation 2) not opened; remark 3 was judged from `reports/correction-1-remarks.md` (read whole) and D-287.

## Searches not found or unclear

- `.the-way` in the review worktree is an uninitialized submodule, so the foundation check ran from the cycle worktree's pinned copy with the review worktree as its working directory; confirmed from `foundation_check.py:1108` that the root checked is the working directory.
- none else.
