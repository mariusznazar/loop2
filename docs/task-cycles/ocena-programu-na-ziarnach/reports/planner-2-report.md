# Planner report — correction 1, task `ocena-programu-na-ziarnach`

**Status:** done with concerns.

- Plan: `.runs/task-cycles/ocena-programu-na-ziarnach/plan.md` (12 slices; it replaces the first run's, kept as `plan-first-run.md`).
- Size report: `.runs/task-cycles/ocena-programu-na-ziarnach/plan-size.md` — 11 slices fit; Slice 7 (`tests/view/account-screen.test.mjs` alone) is reported too large, about 223 000 estimated tokens, and cannot be split (see Concern 1).
- Trial output kept beside this report: `.runs/task-cycles/ocena-programu-na-ziarnach/reports/planner-2-trial-output.txt`.
- No code, test or foundation entry written; no gate run.

## What the plan does

Order: Slice 1 the content revision and the game's moment in the simulation and its load → Slice 2 the
saved game's test document for them → Slice 3 the previous-save reader (with remark 4) → Slice 4 the
record, the mark and an act that changes nothing → Slice 5 the cache module (trust boundary, part map,
guideline row) → Slice 6 the screen Mapy reads and writes the cache → Slice 7 the account screen's page
tests follow a judging that saves nothing → Slice 8 the page (moment on each new-game path, account id,
the game view opening the cache) → Slice 9 the first run's judgings leave the game state, the
simulation and the save → Slice 10 the saved game's test document without them → Slice 11 remark 3 →
Slice 12 the balance instrument's fixed moment.

Two test files turn red only between adjacent slices, each said in the slice's *Goal*:
`tests/sim/saved-game.test.mjs` between Slices 1 and 2 and between 9 and 10;
`tests/view/account-screen.test.mjs` between Slices 6 and 7.

Every slice is `same` (with its reason) except Slices 11 and 12 (`cheaper`). Risk `trust boundary`:
Slices 1 and 9 (`src/browser/sim/saved-game.ts`), 3 (`src/browser/sim/previous-programs.ts`), 5 (the new
`src/browser/view/judging-cache.ts`).

## The trial that set the *Change* lists

To name which existing tests the two new fields break, I made a trial in a detached worktree of
`4e4a104b`: a content revision on each saved program (0 where made, +1 in `withProgramContent` when
`sameData` finds the groups or the trip plan different), `newGame(madeAtMs = 0)` storing the moment, and
the strict load reading both. Result (`reports/planner-2-trial-output.txt`): of 936 simulation cases,
27 failed — 20 in `tests/sim/saved-game.test.mjs` (its document) and 7 in `copy-actions.test.mjs:213`,
`copy.test.mjs:62`, `:241`, `program-list.test.mjs:89`, `:264`, `:510`, `:527`; all 1 565 view and
balance cases passed. This is why Slice 1 names those three files and why `newGame` keeps a default
(237 calls in 73 test files would otherwise change). The size rule of D-425 reports nothing over a
threshold at `4e4a104b` (`node tests/quality/eslint-size-rules.mjs`: „0 functions and files over a
threshold in 335 files”), so no moving slice is needed.

## Concerns

1. **Slice 7 is too large and cannot be split.** `tests/view/account-screen.test.mjs` is 361 222
   characters (about 144 000 estimated tokens) on its own; the guidelines its agent must read whole
   (`coding.md`, `testing.md`, and `styleguide-browser-view.md` because `tests/view/**` belongs to
   `browser-view` and the root `AGENTS.md` asks for the styleguide before any file of that part) bring
   it to about 223 000. The file must change: spec Decision 9 makes a judging save nothing, and its
   cases expect a save of the judging and import `judgeAndRemember`. No slice can change part of one
   file. The first run accepted the same for its Slice 12. The slice tells its agent to reach the
   cases by search. The page cases spec Decision 10 lists for this file I moved to a new file in
   Slice 8 (Choices, row 6), so that Slice 7 only follows Decision 9.
2. **Remark 3 may already be met — the orchestrator decides whether Slice 11 and Foundation entries
   row 13 stand.** I checked the base `c36e2739`: in the row of „Kto idzie” no link stood — the
   sentence was a plain paragraph (`git show c36e2739:src/browser/view/maps-screen.tsx`, the paragraph
   `maps-who-run-note` with `runWaitingSentence(run.mapId)`). But the menu bar held a link back on the
   same screen at the same time: D-280 („outside the screen of a manual map run that goes on, or that
   has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta
   {m}”, which leads to the screen of that map run”), made by `returnToRunEntry` in
   `src/browser/view/screen-address.ts` and drawn in `src/browser/view/menu-bar.tsx` (lines 328–330 at
   the base). The walk reached the map run by typing the address, so it missed that link. See
   Question 1.
3. **A foundation entry beyond the spec (WAY-135 considered).** Remark 3 needs D-287 changed (row 13:
   at the run's own character the sentence is a link to the screen of that run). The spec did not
   design remark 3, and the handoff gave it to planning. I judged it no open design choice, since the
   human's remark settles what is to be true and only the part linked and the rows remain, both
   choices of how to make it (Choices, row 11). If the orchestrator reads it otherwise, Slice 11 and
   row 13 wait for a spec.
4. **A dead field for three slices.** `GameState.judgings` stays, written by nothing, from Slice 6 to
   Slice 9, and the real page shows no mark and remembers nothing between Slices 6 and 8, because the
   maps entry's cache option is optional until the game view gives it (Choices, rows 3 and 5). The
   whole change does not have this gap.
5. **Names the spec left to the maker are named in the plan:** `src/browser/view/judging-cache.ts`,
   `tests/view/judging-cache.test.mjs`, `tests/view/judging-cache-page.test.mjs`,
   `tests/sim/content-revision.test.mjs` (Choices, row 2), because *Change* has to list each file.

## Questions with proposed answers

1. **Does the menu bar's „Wróć do przejścia” count as „odnośnik już był” in remark 3?**
   Proposed: no — keep Slice 11 and row 13, and the request also says that the menu bar's link
   existed before and the walk missed it. Reasons: the remark asks for the sentence („zdanie … staje
   się odnośnikiem”), and in the row there was none. If we drop it: no code and no D-287 change, and
   the request says that the way back was the menu bar's link. That costs nothing now, but the row
   keeps saying „Wróć do niego” with no way back right there. If we keep it: one cheap slice and one
   added sentence of D-287, and the way back appears twice on one screen.
2. **Should the link appear only in the row of the run's own character, as the handoff scopes it,
   or in every row?** D-287 puts the sentence under every character's buttons. Proposed: as the
   handoff says (the remark comes from item 3 of the request, „at a character whose own manual map
   run is open”). Linking every row would mean changing Slice 11's case and one word of row 13.
3. **Do you accept Slice 7 above the size limit (Concern 1)?** Proposed: yes, as in the first run.
   Splitting it is not possible, and leaving it out would leave `tests/view/account-screen.test.mjs`
   red.

## Order and the styleguide's example

The styleguide's „Plan of a user-interface change” (environment and library, then values in their
source, then one screen, then its states) does not apply: the correction adds no library, token,
value or screen state. Only one screen changes (the mark's source in Slice 6, a link in Slice 11),
and the order follows the dependencies: simulation → cache → screen → page → removal.

## Guidelines found missing or uncertain

- `tests/view/**` belongs to `browser-view`, so the root `AGENTS.md` makes every slice that changes a
  view test read the 98 000-character styleguide whole. Together with `testing.md` (80 000), that is
  about 90 000 estimated tokens before a slice reads any code. It makes Slices 6 and 11 tight and
  Slice 7 too large. It is uncertain whether that instruction is meant for test files of the part.
- `guidelines/testing.md`, „Trust boundaries”, names refusal cases by their titles, and a title that
  carries a version number goes stale at each raise (remark 4 is one case of it). The guideline has no
  rule against such titles. Slice 3 fixes the one instance only.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-280 and D-287 (at the base and the head), D-281's address code
  (`src/browser/view/screen-address.ts`), `src/browser/view/menu-bar.tsx` at `c36e2739`: to check
  remark 3 at the base.
- D-399, D-400, D-401, D-402, D-386, D-425, D-439, D-440 read whole: the quoted passages that must
  change (D-401, D-440) or stay (D-386), and the size rule.
- `.the-way/product-guidelines/testing/SKILL.md` and `template.md` lines 45–90 and 180–195: who writes
  `guidelines/testing.md` in a cycle and what its trust-boundary rule holds.
- `.the-way/product-guidelines/styleguide/` (sizes only) and `guidelines/styleguide-browser-view.md`
  in part (see Unread material).
- `tests/quality/eslint-size-rules.mjs` run on the head, and `tests/quality/test_mutation_test_selection.py`
  read: the size rule and the list of `stryker.config.json`.
- The test files that quote the changed decisions (grep of `decision: D-…`): to name, under
  *Foundation entries*, which quoted passages can stay and which slice follows those that change.

## Working copies

- `.runs/planner-2/wt`, a detached
  worktree of `4e4a104b` for the trial: removed with `git worktree remove --force` and
  `git worktree prune` (`git worktree list` names no `planner-2`).
- `.runs/planner-2/` (the trial's
  edit script, a script that listed foundation ranges, test outputs): removed by its full path; what
  the report needs stands in `reports/planner-2-trial-output.txt`. `git status` of the worktree is
  clean.

## Unread material

- `guidelines/styleguide-browser-view.md`: read in part — headings, „Roles”, „The screen Mapy”,
  „Examples”. Its other rules were not read; Slices 3, 5–8 and 11 name it whole for their agents.
- `guidelines/testing.md`: read whole except the table rows at lines 178–191, which I saw only as
  their first 80 characters.
- `guidelines/coding-balance-instrument.md`: not read. The handoff did not name it, but Slice 12 does
  (spec Decision 6 names it).
- `.runs/task-cycles/ocena-programu-na-ziarnach/spec-reviewed.md`, `reports/spec-review-report.md`,
  `reports/spec-review-2-report.md`: not read. I worked from `spec.md`, whose Decisions 11 settles
  both reviews.
- `reports/slice-04-executor-report.md`, `slice-06-…`, `slice-07-…`: not read. I read the code they
  describe and the commits `bae893e2` and `3218a620` (`git show --stat`).
- `reports/review-whole-report.md`: read only through a search for its out-of-scope findings (lines
  7, 32, 44–91).
- Foundation entries named by the spec that I did not open whole: D-04 (lines 59–75 only), D-07,
  D-117, D-123, D-165, D-206, D-209, D-211, D-213, D-218; the invariants `simulation-isolation`,
  `simulation-inputs`, `expired-session-unsaved-progress`, `player-save-isolation`. The slices name
  each of them by range for their agents.
- `.the-way/elements/part-map/skill/SKILL.md`: not read; Slice 5 names it.

## Searches not found or unclear

- Whether the menu bar's link at the base answers remark 3: unclear (Question 1).
- No glossary entry for the revision of a save or for the game state: none found. The foundation step
  judges the two entries the spec asks it to consider (row 12).
- `tests/view/previous-save.test.mjs`: its documents are version 7 by default. Only its D-401
  quotation at line 485 holds the sentence on the keys; no other case was found that needs the
  revision.
