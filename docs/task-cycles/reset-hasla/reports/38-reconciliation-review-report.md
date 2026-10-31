PASS 08ca3eb9ecb5990243b8e7fc649aca81f4398381

# Review of the reconciliation with the target branch, task `reset-hasla`

Range `fdfbc62..08ca3eb`: the renumbering `d2e1c3b` and the merge `08ca3eb` (parents `d2e1c3b`,
`4ed8fcd`). `git rev-parse HEAD` in the worktree was `08ca3eb9ecb5990243b8e7fc649aca81f4398381` at the
start and at the end. Pin `.the-way` at `a8dfe8a` in the gitlink of both parents and in the checkout.
The earlier cycle's reviews were not repeated: I judged what the merge changed.

## Findings

**Critical:** none. **Important:** none. Blocking findings: 0.

### Minor

**M1. A claim of the author's report is not so; no effect on the code.**
Place: `.runs/task-cycles/reset-hasla/reports/37-reconciliation-report.md`, step 3, the bullet on
`tests/view/account-screen.test.mjs`.
The report says this task's tests build their saved game states through `saveOf`. They build none:
the task's tests stand at `tests/view/account-screen.test.mjs:718`-`957` and `:1433`-`1712`, and no
`saveOf` stands in them; the two that reach a game answer `loadSavedGame` with `NO_SAVE`
(`:1624`, `:1660`). So the merged tests never run the page's reset branch against a saved game state,
of version 2 or of another version. That gap is what the report's sentence hides. The behaviour itself
is right: my scratch tests (Checks, 4) ran both cases and passed, and the two paths they join are
each proved by a test of their own. Worth a line in the record, no change of code; a permanent test
would be broader coverage only.

### Out of scope

**O1. The open request's description still names D-214 to D-219 in this task's old meaning.**
Place: the description of pull request #45, its lines 16, 41, 58 to 63 and 147, read with
`gh pr list --head task/reset-hasla`. It is no file of the range, so it counts as out of scope
whatever its effect, and nothing in the reviewed commits can correct it. For example line 58 reads
„**D-214** (rows 3, 13, 15) — Każdy poprawnie zapisany adres dostaje tę samą odpowiedź…”, while
D-214 in the merged tree is „When is a map run a manual run of a solved map?”. Line 41 cites D-215 for
the accepted cost of exhausting the hourly limit, and D-215 now is a line of the map-run screen. Line
147 proposes a line in D-215.
The human who follows these numbers from the request reads main's entries. Rewrite those nine lines
with the map D-214→D-222 to D-219→D-227 when the request is next updated; the head of #45 still stands
at `fdfbc62`, so this falls in that same step.

**O2. The cycle's record will carry the old numbers into the archive.**
Place: `.runs/task-cycles/reset-hasla/cycle.md:182`, `:183`, `:187`, `:196`, `:323`, `:328`, `:420`,
`:424`, `:462` and the reports the author counts, 43 files. Step 12 of `implement-task` copies this
directory to `docs/task-cycles/reset-hasla/`, where those numbers stand beside a foundation in which
they mean main's entries. They are history and need no rewriting; `cycle.md:142` already says the
renumbering happened. One line in the archived record with the map closes it for a later reader. The
author reported this under *Searches*, and I confirm it.

## Declined to judge

- The correctness of task 14's own code and entries (the load's rule for `solvedMapRun`, the settling
  of a death, the headquarters' lines): reviewed in that task's cycle. I judged only where they meet
  this task.
- The earlier cycle's reviews of the reset's routes, forms and messages: the handoff says they need
  not be repeated, and the routes did not change.
- H1 after the merge: `cycle.md:142` records H1 on `fdfbc62` as withdrawn, which is the orchestrator's
  to settle. No deployment or delivery was checked here.
- The word „generation column” in D-112 *Rejected* beside main's glossary term `generation number`:
  the term's entry is about a count at a character and D-112 names a rejected counter of an account,
  so a reader does not take one for the other. Left as the author left it.

## What the review established

**Renumbering.** Applying the map to every tracked file of `fdfbc62` by bytes gives `d2e1c3b` exactly:
307 files, 14 changed, 43 occurrences, 0 mismatches. A looser search for the bare numbers 214 to 219
found only those same mentions and three game-minute values in `tests/sim/saved-game.test.mjs`
(`:576`, `:860`, `:874`), which are no decision numbers.

**Every mention.** All 16 lines of the merge naming D-214 to D-221 stand on `4ed8fcd`, all in
`foundations/`; all 39 lines naming D-222 to D-227 stand on `d2e1c3b`; no line names both. At the base
no file named these numbers, so each means its side's entry. Headings run D-213 to D-227 without a gap
or a duplicate.

**Foundation joined, nothing dropped or reworded.** I parsed each entry of `decisions.md` and
`invariants.md` at the base, `d2e1c3b`, `4ed8fcd` and the merge. No entry changed on both sides, and
every merged entry equals its side's text (decisions 227 = 213 + 8 + 6, invariants 106 = 100 + 3 + 3,
the withdrawn table and the preamble equal). The sides changed disjoint sets of existing entries:
main D-03, D-04, D-179, D-189, D-190, D-194, D-212, `trip-run-end`, `trip-transfer`; this task D-44,
D-96, D-98, D-100, D-102, D-105, D-109, D-112, D-138, D-152 to D-155, D-158, D-160, D-211 and seven
invariants. `glossary.md` is main's alone, `environment_facts.md` this task's alone. No conflict
marker stands in the tree, and both joined files stay LF. `git show --remerge-diff` shows the merge
differs from git's own result in those two files only.

**Meaning across the two sides.** D-96's „of a shape the game does not admit” covers main's D-221: a
load of an unsettled death goes through `refuse()`, which the load reports as `shape`. D-225 and D-96
keep the game unbuilt behind the form, and main's clock starts only in `createGameView`. D-211's kept
state goes through `keep()`, which flushes the clock first, so what it keeps holds a settled death as
D-221 requires. D-210 compares one number, so version 2 changes nothing on the server.

**Trust boundary.** Over the range `src/server/` changes in five comment lines of
`account-routes.ts` and `account-mail.ts`, each only a number; no code line. The routes read as at
`fdfbc62`.

**Irreversible operation.** None. `src/server/database.ts` has an empty diff over the range, and against
the base no changed line adds a table, a column, an index or a version.

**The two files changed on both sides.** `styles.css` holds both sides' rules, its diff against each
parent being exactly the other's addition; no selector is shared. The merged test file holds 52 tests =
51 + 36 − 35, so none was lost.

**Tests against the merge.** Each mutation in Checks, 5 failed the tests it should, so the tests of
the reset branch and of the version do protect those behaviours on this tree.

**Interfaces.** On the built merge in a browser, the reset link shows the form with no API request and
no game; the refused link clears the fragment and shows the sentence in `warning` above the forms or
above the game. The kitchen-sink page shows the ten form samples, the answer's sentence in the colour
of `text-secondary`, and matches the cycle's earlier picture
`.runs/task-cycles/reset-hasla/reports/33-kitchen-sink-forms.png` in everything but the wrapping of the
row. The author took no screenshot at this stage and adds nothing to a screen, so nothing is owed.

**The author's own-work check** names the likeliest miss, a mention meaning the wrong side's entry, and
its line comparison would catch it; my byte-exact pass confirms it.

The rest of the report's numbers held: 24 and 31 files, +2352 −158 and +3964 −267, 16 commits ahead of
`origin/task/reset-hasla`, 0 behind `origin/main`, the four `save-version` titles in
`tests/sim/saved-game.test.mjs`, and no guideline citing the test main renamed.

## Checks

Run in a separate detached worktree of `08ca3eb` under the scratchpad, with its own `npm ci` (exit 0)
and a copy of `.the-way` at the pin; removed afterwards. The reviewed worktree stayed clean, with
`git status --short` empty before my report.

| # | Check | Result |
|---|---|---|
| 1 | Script: map applied to `fdfbc62` by bytes against `d2e1c3b`; entries at four commits; every mention by side | exit 0, 0 mismatches, 0 entries differing |
| 2 | `node scripts/build.mjs`; `node scripts/kitchen-sink.mjs --build-only` | exit 0, exit 0 |
| 3 | `node --test tests/view/*.test.mjs tests/sim/saved-game.test.mjs tests/sim/death.test.mjs tests/transport.test.mjs tests/account-storage.test.mjs tests/account-api.test.mjs` | exit 0, 409 tests, 409 pass |
| 3a | `node --test tests/http.test.mjs tests/account-mail.test.mjs` | exit 0, 75 tests, 75 pass |
| 3b | `python -B .the-way/elements/common/foundation_check.py` in the separate worktree | exit 0, 0 errors |
| 4 | Scratch tests appended to a copy of the account test, not kept: a 401 right after a death, with the same account coming back to the ended screen and the settled death sent; a death falling in `keep()`'s own flush at the 401; a refused link for a signed-in player whose save is of version 1, both sentences with the link's first and the new game saved at once; „Anuluj” onto a saved death | `node --test --test-name-pattern=SCRATCH`, exit 0, 4 pass |
| 5 | Mutations of the built page, tests rerun each time: the reset branch falling through to the session check (9 fail); a session check beside the form (9 fail); `SAVED_GAME_VERSION` 3 (15 fail); the clock leaving a death unsettled (3 fail, two of them the scratch tests of row 4, which shows those tests can fail) | each exit 1 as intended |
| 6 | Browser, Playwright, built page on 127.0.0.1 with a stubbed API. `#reset-password=abc`: form, two labels, „Ustaw hasło” and „Anuluj”, no „Wyloguj”, no game, API log empty after 1.5 s; after sending, the log held `POST /api/password-reset` and `GET /api/account` (which also proves the empty log could fill), address without fragment, sentence first in `main` in the colour of `warning`, two forms below. With a signed-in stub: `POST /api/password-reset`, `GET /api/account`, `GET /api/saved-game`, the sentence directly above the game, no page error | as described; console errors only the favicon and the stub's own 400 and 401 |
| 7 | Browser, kitchen-sink page on 127.0.0.1: all five sections, ten form samples and three header samples, `.form-note` computed colour equal to `--text-secondary`, no page error, picture compared by eye with the cycle's earlier one | as described |

**Not run:** the full gate, `npm test` with no argument: the handoff keeps it to the orchestrator, and
it is running on this head. `tests/sim/` apart from `saved-game` and `death`, and the Python tests of
`tests/invariants` and `tests/quality`, therefore rest on that run. The real server with SQLite and
Argon2 was exercised only through `tests/http.test.mjs`, not by the browser, whose API was a stub, so
the browser rows say nothing about a real session ending. No changed invariant test: the range changes
two comments in `tests/http.test.mjs` and the numbers in test comments, no assertion on the task's
side.

**Side effects outside the reviewed worktree:** `git worktree prune` ran with the removal of my
worktree, in the repository's shared records; it removes only records of directories already gone, and
every other worktree still lists. The browser tool's console log landed in
`C:\Storage\repos\loop2\.playwright-mcp`, which git ignores there.

## Reaches beyond the dispatch

- `.runs/task-cycles/reset-hasla/reports/37-reconciliation-handoff.md`: what the author was asked, to
  compare with the report.
- `.the-way/task-cycle/skill/SKILL.md`, step 12 and the passages on the target branch: what the cycle
  does with the record and the request, for O1 and O2.
- `foundations/decisions.md` D-97, D-98, D-205, D-207 (first lines), D-212, D-213: read beside the
  named entries while checking the save path; the changed words of D-03, D-04, D-179, D-189, D-190,
  D-194 and D-212 by word diff, for meaning across the sides.
- `foundations/glossary.md`, the entry `generation number`: the author's remark on D-112.
- `foundations/invariants.md`, `solved-map-manual-run`, `resurrection-renewal`, `death-settled-once`,
  `password-reset-verified-email`: read with the named ones, since they stand in the joined region.
- `src/browser/view/game-view.ts`, `game-saver.ts`, `password-reset.ts`, `kitchen-sink/kitchen-sink.ts`,
  `scripts/build.mjs`, `scripts/kitchen-sink.mjs`, `scripts/test.py`: the reach of the merge.
- `guidelines/testing.md` lines 145 to 213: the numbers and titles step 3 of the report names.
- Pull request #45's description, by `gh`, read only: mentions outside the tree, for O1.
- `.runs/task-cycles/reset-hasla/cycle.md`, its lines naming D-214 to D-227: for O2 and H1.

## Searches not found or unclear

- `scripts/build.mjs --check` covers `tsconfig.browser.json` and `tsconfig.server.json` only, so the
  author's `npm run typecheck` does not compile the kitchen-sink page; its own build does, which I ran.
- A first search for the schema's version in `src/server/database.ts` by guessed names found nothing;
  `user_version` and the empty diff settled it, so that first empty answer says nothing about the file.
- Which request lines the orchestrator will rewrite, and when: not stated in the handoff, so O1 names
  all nine.
