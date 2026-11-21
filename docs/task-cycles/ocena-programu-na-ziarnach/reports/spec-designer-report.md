# Spec designer report — correction 1, task `ocena-programu-na-ziarnach` (revision 1)

**Status:** done

- Spec: `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md` (revised once; the reviewed text stands as `spec-reviewed.md` beside it, not edited).
- Review answered: `reports/spec-review-report.md` (FAIL, Finding 1), read whole.
- Method: `.the-way/task-cycle/spec/SKILL.md` and `design.md` (read whole), as the designer; `.the-way/project-level/technology/reserved_choices.md` read whole, since the design needs a store of data.
- Worktree head `4e4a104b`; `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, equal to the gitlink.

## What the revision changed

- **Finding 1 answered as the orchestrator directed (the reviewer's way a).** The content fingerprint is gone; each saved program carries a **content revision**, 0 for every new program (new game, „Nowy program”, copy saved as new, previous-save pull), raised by one in `withProgramSaved` — the one function every content write passes through (`editProgram`, `saveCopyIntoProgram`, `setProgram`, the first-chill rule of D-123) — where `sameData` finds the groups or the trip plan different, never at a rename. The cached judging stores the revision and is stale when it differs, A→B→A included, on every device (spec, Decision 2). No hash function remains (Goal 6, Decision 2).
- **Where the field stands**: on `SavedProgram`, not on `Program`, so the map run's copy and the earning loop carry none; written by the save, read by the strict load as a safe integer from 0 with the item's keys exactly `id`, `name`, `program` and the revision; the previous-save reader takes four keys from version 9 and three before it, reads neither `id` nor the revision, and the pull makes programs of revision 0 (Decision 6, S1). The version stays 9 (raised, not deployed), the test's document rewritten under the exception of `guidelines/coding-saved-game.md:110-113` (Goal 1, Decision 10).
- **The first run's code**: the hooks of slice 7 at the four content writes become the raise in `withProgramSaved`; the deletion and the two death settlements need nothing (Decision 6, „Goes away”).
- **New, found while revising**: a counter can repeat where a change whose save never reached the server is lost. The case of a refused save (D-209) is closed: the game view opens the cache with its existing `afterConflict`, and the cache then removes this game's entries in this browser (Decisions 2, 6 V1, 7; a check in Decision 10; a sentence in the new decision, and possibly D-209). The case of a page closed while a change's save failed stays, named with its narrow conditions and its rejected cure (the revision as a real moment, a clock argument on four functions) in Decision 2.
- **The reviewer's planning note** is in Constraints, Decision 3, Decision 6 and *Left to the maker*: `balance/engine.mjs:94` and `balance/campaign.mjs:169` pass a fixed moment, never the clock.
- **The reviewer's two other notes**: Goal 1 now names the moment and the revision; Decision 3 names the refusal as shape among the paths through `startFrom`.
- **Kept as the review confirmed**: the moment the game was made, the key, the stored form (the fingerprint field replaced by the revision, read as a safe integer from 0), failures, tabs, where the code lives, Decision 1.
- **Foundation entries updated**: the new decision (revision, the refused-save case), a decision on the content revision (placement left to the foundation step, apart from D-209's revision of a save), D-440 keeping „erases”, D-386 (moment and revision), D-165, D-401 if needed, D-206 (and D-402, D-209 to be judged), the invariant `previous-save-programs-reader` (it names the exact keys, so it changes), the new invariant, the part map, `guidelines/testing.md`.

## Questions sent and their answers

- Round 1: none sent. The review's Finding 1 put the fingerprint's A→B→A behaviour to the orchestrator, which answered: take the reviewer's way a, a content revision per saved program (message of the coordinator, recorded in the spec's heading). No question opened by that answer; the lost-save limit of a counter is settled in the spec with its narrowing and named as a residual.

## Ways weighed and why the rejected ones lost

- Validity: content revision + generation, at reading (chosen, per the orchestrator) · fingerprint of the content (A→B→A shows an erased judging, against *To do* 6 and remark 1) · view-side erasing on each state change (second path, still needs the check at reading).
- Place of the revision: on `SavedProgram` (chosen) · inside `Program` (would travel into copies and earning loops and be compared as content by the copy's checks) · a separate record of revisions in the game state (another record to keep in step at deletion, the first run's problem again).
- Start and raise: 0 for new programs, +1 in `withProgramSaved` on a difference by `sameData` (chosen; key-order independent) · a game-wide counter (same repeat at a lost save, more state) · the real moment of the change (never repeats; a clock argument on four functions and their tests) — rejected for the residual case.
- Game identity: the moment the game was made, in the game state (chosen) · a random token (same cost, a text to check) · account-only key with clearing at new games made in this browser (fails for a reset loaded from another device).
- Shape: one entry per triple (chosen) · one entry per game · both.
- Storage: `localStorage` (named by the remark) · `sessionStorage` (dies with the tab) · IndexedDB (asynchronous, no gain).
- Logout: keep the account's entries (chosen) · clear at logout (badges vanish at each logout on the player's own device).
- Refused save: remove this game's entries in this browser (chosen; cost: badges gone there until judged again) · nothing (a repeated revision could show a judging of content the server never got).
- The fallback of remark 1: not designed, since no entry forbids the cache.

## Does any entry forbid the cache? — No

Unchanged from the first version, and confirmed by the review (point 3): D-07 says where the save lies and who computes; D-211 forbids the *unsaved game state* in lasting storage and a cached judging is no game state; D-117 binds API clients; D-294 binds folding; D-04 is extended, not broken; the invariants hold. Quoted in the spec, Decision 1. No entry stopped the cache.

## Reserved choice

`localStorage` adds nothing the product runs, pays for or backs up, and the human's remark 1 names it; not reserved.

## The four checks

1. Placeholders, `TBD`, empty sections: none.
2. Contradictions: the A→B→A departure is gone; Goal 3, Decision 2's table, the checks of Decision 10 and the D-440 entry all say „erases”, A→B→A included. The moment the game was made sits within D-04's *complies* („a game state storing the moment of an event”) and D-04 is changed to name it. Goal 1 now lists both new fields. The residual of a counter at a lost save is named, not hidden, and does not contradict the task: the task's erasures happen at every save the game makes; the residual needs a save that never happened.
3. Several independent changes: one change (cache, revision, moment, removal of the first run's storage in the game state); remarks 3 and 4 are planning's, named under non-goals.
4. Two readings, fixed: the comparison that raises the revision (`sameData` over groups and trip plan, counters left out); the key sets of the previous-save reader by version; what the cache removes at opening, with and without a refused save; the moment in the balance instrument (a fixed number).

## Reaches beyond the handoff

- First version: D-294, D-386, D-402, D-203, D-51 (binding text), D-243 (*Rejected* part), D-329 by grep; `foundations/part_map.md` lines 1–32 and 60–64; `foundations/glossary.md` headings and the entry `judging`; `guidelines/testing.md` lines 157–182.
- This revision: `foundations/invariants.md` `previous-save-programs-reader` (lines 1378–1386, whole); `guidelines/coding-saved-game.md` headings and lines 100–120 („Wersja podnoszona razem z kształtem”); `tests/sim/previous-programs.test.mjs:265` by grep.
- Code read to design, first version: `src/browser/sim/types.ts:270-546`, `src/browser/sim/game.ts:384-414` and `:630-689`, `src/browser/sim/judging-record.ts:1-80`, `src/browser/sim/judging.ts:90-115`, `src/browser/view/maps-entry.ts:1-140`, `src/browser/view/maps-screen.tsx:340-380`, `src/browser/view/state-store.ts` whole, `src/browser/view/app.ts:60-390`, `src/browser/account-api.ts:1-40`, `src/server/database.ts` grep, `tests/view/page-document.mjs:1-80`, `tests/view/uncaught-failure.test.mjs:470-492`. This revision: `src/browser/sim/programs.ts:305-512` and `:730-776` and its function list, `src/browser/sim/game.ts:420-445` and `:880-895`, `src/browser/sim/previous-programs.ts:1-130`, `src/browser/sim/saved-game.ts:480-500`, `git show c36e2739:src/browser/sim/programs.ts` by grep for `withProgramContent`.
- `git log` of the range and the bodies of `bae893e2` and `3218a620`, for the reason of the code rebuilt.

## Unread material

- `reports/slice-06-executor-report.md`: not read; `reports/slice-06-measure-output.txt` read whole.
- `reports/slice-04-executor-report.md`, `reports/slice-07-executor-report.md`, `reports/review-whole-report.md`, `reports/spec-review-report.md`: read whole.
- `task-frozen.md`: read whole (two pages). `correction-1-remarks.md`: read whole.
- D-206: binding text, *Verification* and the first lines of *Rationale*; D-209: binding text and the end of the entry (its *Rationale* and *Rejected*), not the middle; D-04: binding text, *Verification* and the *Rationale* to line 130, not its end nor *Rejected*; D-218: binding text, *Verification* and the first line of *Rationale*; D-401: not read (named as possibly changed; the foundation step reads it). D-07, D-117, D-165, D-211, D-386, D-402, D-439, D-440, D-294: whole.
- Invariants read whole: `simulation-isolation`, `simulation-inputs`, `expired-session-unsaved-progress`, `save-version`, `player-save-isolation`, `previous-save-programs-reader`. Not read: `simulation-randomness`, `balance-instrument-repeatability` (its sentence quoted from the task document), the invariants of the account server.
- Guidelines: `guidelines/coding-saved-game.md` headings and lines 100–120 only; `guidelines/coding-browser-module.md` headings only; `guidelines/coding-simulation-module.md`, `coding-balance-instrument.md`, `styleguide-browser-view.md` not opened (the maker reads them before changing those files).
- `balance/engine.mjs:94` and `balance/campaign.mjs:169`: not opened; taken from the review.

## Searches not found or unclear

- No identity of a game in the game state and nothing the page knows that changes at a reset; hence Decision 3.
- Not verified: whether jsdom gives each window of `tests/view/page-document.mjs` its own `localStorage`; the cache takes its storage as an argument, so tests can give a stand-in either way.
- Not verified: that the screen Mapy redraws at each reading of the clock (assumed from `onReading`); it bears only on how soon a tab sees another tab's judging (Decision 7).
- Not checked: whether `SEED_KINDS` in `saved-game.ts` has a reader besides the judgings.
- Not checked: whether `sameData` and the load build objects whose key sets differ for one content (an optional key present as `undefined` in one and absent in the other); where they do, the revision would rise at a save that changes nothing, which erases a judging on the safe side. The check of Decision 10 („an edit that changes none of the three … unchanged”) would show it.
- Unclear, left to the foundation step: whether the content revision is a sentence of D-165, of the new decision or an entry of its own; whether D-401, D-402 and D-209 need sentences; whether the moment or the revision needs a glossary entry.

## Working copies

None made; `.runs/spec-designer/` was not created.
