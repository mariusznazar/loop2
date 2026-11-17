# Executor report - slice 10 (Decisions of the screen of a map run and the end-of-run window)

**Status:** done with concerns (see "Concerns" below: two sentences of the same entries were left as the task's To do lists them, and the D-311 *Verification* still holds the old header order).

**Commit:** `1ea338eae37019348cda8becb34310dc45821833` on `task/poprawki-brzmienia-fundamentu` (base `4cd6fe841ded04004b53aa99098d3c0274076276`).

**Files changed** (10 files, 29 insertions, 29 deletions):
- `foundations/decisions.md` (+7 / -7)
- `tests/view/end-question.test.mjs`, `tests/view/end-window-game.test.mjs`, `tests/view/end-window-lines.test.mjs`, `tests/view/end-window.test.mjs`, `tests/view/run-header.test.mjs`, `tests/view/run-screen-state.test.mjs`, `tests/view/run-screen.test.mjs`, `tests/view/trip.test.mjs`, `tests/view/world-area.test.mjs` - only the `// decision:` quotation lines changed (22 lines in all).

## Items of the slice

- **D-46 (binding sentence):** made. "sets the chronicle and the clock of the map run in Geist Mono" -> "sets the chronicle, its entries in the end-of-run window included, and the clock of the map run in Geist Mono". Quotations in `run-header.test.mjs:438` and `:632` follow it.
- **D-185 (binding sentence):** made. "„Do skrzynki: {item} {count}, …”" -> "„Do skrzynki: {item} {count}, ….”". Quotations in `end-window-game`, `end-window-lines`, `end-window`, `trip` follow it (6 lines).
- **D-311 (binding sentence):** made, in two edits.
  - Header order: "„Pauza” or „Wznów”, the pace, „Restart”, the warning of a cut trip plan and „Zakończ”, and after the end of the map run „Koniec przejścia”, which opens the end-of-run window" -> "„Pauza” or „Wznów”, the pace, and after the end of the map run „Koniec przejścia”, which opens the end-of-run window, „Restart”, the warning of a cut trip plan and „Zakończ”". This matches `src/browser/view/run-header.tsx:4-5` and D-371.
  - "that window (D-368) stands over this screen, its header included" -> "that window (D-368) stands in place of this screen, its header included (D-370)".
  - Quotations of D-311 "After a character's death ... stands over this screen" changed to "stands in place of this screen" in 8 files (end-question, end-window-game x6, end-window, run-header, run-screen-state x2, run-screen x2, trip, world-area: 14 lines in all, counting the test file list above).
- **D-363 (Rationale):** made. "… never worse (D-311);" -> "… never worse;".
- **D-368 (Rationale, Accepted with it):** made. Removed "the keyboard, Escape and the return to the window are to build; ".
- **D-370, D-371:** no change in the task's To do; the entries stay as they are. The D-371 quotation "„Koniec przejścia” stands in the header before „Restart”" still matches the new D-311 sentence and stays.

## Own-work check

Requirement that the slice most likely misses: a quotation of a binding sentence that does not match the reworded sentence after whitespace normalisation (the check would be the foundation check, plus a text search of every changed quotation). Check: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` first reported 22 "the quotation stands in no binding sentence" errors after the entry edits. After the test quotations were changed with sed restricted to `decision: D-311`, `decision: D-185` and `decision: D-46` lines, the same check reported 0 errors. The diff of `tests/` was reviewed: only the quotation text changed, no other line.

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` - after the entry edits and again after the test edits: **0 errors** (the last run reported 22 quotation errors before the test edits; the run after them reported 0 errors).
- `python -B .the-way/elements/common/foundation_check.py` (full, at slice end): **exit 0, `0 errors`**. It lists 6 `listed:` lines, reported here as required (none is an error):
  - `foundations/invariants.md:5` `account-server-runtime` reads `test`, sentence changed by this change, no citing file changed (`tests/invariants/test_account_server_runtime.py`).
  - `foundations/invariants.md:354` `terrain-drawing-numbers` (`tests/invariants/test_terrain_drawing_numbers.py`).
  - `foundations/invariants.md:668` `player-opaque-session-cookie` (`tests/transport.test.mjs`).
  - `foundations/invariants.md:978` `trip-plan-progress` (`tests/sim/trip.test.mjs`).
  - `foundations/invariants.md:1158` `loop-run-knowledge` (`tests/sim/catch-up.test.mjs`, `tests/sim/loop.test.mjs`).
  - `foundations/invariants.md:1288` `sprite-credits` (`tests/view/icons.test.mjs`).
  These are not in this slice's *Change*; they are reported for the orchestrator, which should check whether another slice carries them.
- `npx prettier --check` on the nine test files - **exit 0**, "All matched files use Prettier code style!".
- `npm test -- <file>` for each of the nine test files (run with `npm test -- tests/view/<name>.test.mjs`): all **passed**, counts from the logs:
  - end-question 17/17, end-window-game 27/27, end-window-lines 11/11, end-window 14/14, run-header 24/24, run-screen-state 18/18, run-screen 21/21, trip 9/9, world-area 23/23 (pass / tests, fail 0 each).
  - Caveat: I ran the nine in one background batch with a shell loop that echoed the exit code per file; I did not record each exit code separately, so the per-file exit codes are not in my logs. The batch as a whole exited 0, and every log reports `fail 0`.
- Full product gate (`npm test` without a file): **not run**, as the handoff says.
- Tests written first / invariant tests seen failing: not applicable; the slice changes text and comments only, no code or invariant test.

## Reaches beyond the handoff

- Read the full `guidelines/testing.md`, `guidelines/coding.md` and `guidelines/styleguide-browser-view.md` (the last in three chunks), as the handoff's *Read* says, even though the change touches only foundation text and test comments.
- Read `src/browser/view/run-header.tsx:1-20` and `src/browser/view/trip-lines.ts:80-88`, and grepped `src/browser/view/end-window.tsx` and `run-entry.ts` for "Koniec przejścia", to confirm the header order (the code puts "Koniec przejścia" before "Restart"). The task named these lines, so the reads are verification only.
- Grepped `git grep -n 'decision: D-<n> "'` for D-46, D-185, D-311, D-363, D-368, D-370, D-371 (the handoff's rule-4 search). No quotation line stood outside the nine change files, so rule 4's stop condition did not apply.

## Choices made

- The D-311 header sentence: "Koniec przejścia" moved to after "the pace" and before "Restart", in the form "and after the end of the map run „Koniec przejścia”, which opens the end-of-run window, „Restart”, …". The task said "„Koniec przejścia” przed „Restart”", and I read the sentence so that it stays a single list. Way rejected: a separate sentence for the end label. Cost if wrong: a reader might read the window label as a third button; low.
- Quotation edits were made with `sed` restricted to the matching `// decision:` lines and to the exact old span, not by reading each test file. The changed lines were checked with `git diff -U0`.
- D-185 *Verification* and the D-311 *Verification* were not changed (see Concerns).

## Concerns

1. **D-311 *Verification*** still says "the header holding ... „Pauza” or „Wznów”, the paces, „Restart”, the warning of a cut trip plan after it and „Zakończ”, and after the end „Koniec przejścia”" (old order), and "the window over the screen after a death and a completion". The task's To do does not list *Verification*, so I did not change it. The orchestrator should decide whether a later slice or a fix covers it.
2. **D-185 *Verification*** still reads "„Do skrzynki: {item} {count}, …”" (the old ellipsis). Same reason: not in the task's list. The test quotations already follow the binding sentence.
3. **D-311 *Rationale*** still says "that window stands over this screen" in the sentence about the window covering the header, which the binding sentence no longer says; not listed by the task, left as is.
4. The six `listed:` lines above (other invariants whose sentences the foundation check says this change alters, not in this slice).
5. Derived entries (rule 2 of the slice, step 4.4 of the decisions skill): D-370 and D-371 name D-311 under *Relations*, and D-368 is named by D-370 and D-371, so the reworded binding sentence of D-311 has derived decisions. None needed a change in the task's To do, so none was made. The orchestrator should confirm.

## Unread material

- Not read whole: `foundations/decisions.md` (only the ranges named in the handoff and the D-46, D-185, D-311, D-363, D-368, D-370, D-371 entries, plus line-level edits); `foundations/invariants.md` (not opened; the `listed:` lines came from the foundation check).
- Not read whole: `.the-way/elements/decisions/examples.md` names WAY-03 as the example of the form; I did not open that entry in the-way's `foundations/` (the element's *Read* list in the handoff does not require it).
- `.the-way/elements/decisions/skill/projected.md`, `.the-way/elements/common/projected_mode.md` (not needed: not in projected mode).
- `task.md` read in part: the lines printed were the To do list (26), the D-46 to D-368 items (139-179) and the Out of scope section (192-196), not the whole file.
- `plan.md` not opened; the handoff's copied rules were used.

## Searches not found or unclear

- The task's *Read* line `task.md:139-139` etc. points at line numbers from an older commit; I found each wording by its quotation, as rule 1 says. All found.
- D-185's Verification has the old ellipsis but the task lists only the binding sentence (line 3638); I read this as the task's intent and left the Verification alone. Unclear whether the task expects both.
- D-311's *Verification* header order (see Concern 1): the task's list does not mention it.

## Working copies

- `.runs/executor-10/` (test logs, foundation-check log) - removed after the report facts were recorded. No worktree or clone was created by this slice.

## Questions for the orchestrator

- Should the D-311 *Verification* and the D-185 *Verification* (both still show the old wording) be changed in this slice, or left for a later one? I did not change them; the task's To do lists only the binding sentences.

## Follow-up after the orchestrator's answer

**Commit:** `64f2061e19692e3d5bfd8a143d4f2ebf417b14d5` (second commit on `task/poprawki-brzmienia-fundamentu`; `foundations/decisions.md` only, 3 insertions, 3 deletions).

Changes:
1. D-311 *Verification*: the header order now reads "„Pauza” or „Wznów”, the paces, and after the end „Koniec przejścia”, which opens the window, „Restart”, the warning of a cut trip plan after it and „Zakończ”", and "the window in place of the screen after a death and a completion" replaces "the window over the screen". The other words of the Verification are unchanged.
2. D-311 *Rationale*: not changed. The exact phrase "stands over this screen" is not in the Rationale. Its only line about a window over the screen is the sentence "The end of the map run stands in a window over the screen, so no place of the screen moves for it" (in the Rationale, about the reason for a window); it does not speak of the header, so the orchestrator's condition did not apply. Left as is; the orchestrator may decide.
3. D-185 *Verification*: "„Do skrzynki: {item} {count}, …”" -> "„Do skrzynki: {item} {count}, ….”".
D-368, D-370 and D-371 were not touched.

Checks (command and exit code):
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` - exit 0, `0 errors`.
- `python -B .the-way/elements/common/foundation_check.py` - exit 0, `0 errors`; 6 `listed:` lines, the same six as in the first report.
- Focused tests: none run. No test file changed in this follow-up, so none was touched; the test quotations already match the binding sentences, which the follow-up did not change.
- Prettier: not run (no test file touched).

Working copies: none made in this follow-up; the two foundation-check logs were written to `.runs/` and removed after reading.
