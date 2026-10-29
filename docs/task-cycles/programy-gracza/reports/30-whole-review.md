PASS 03915185a551b00b3a08d0fdabb311ded347db7e

# Whole-change review — programy-gracza

- Range: `4bfb9623e9310220e335377df7fbb4c9ad413406..03915185a551b00b3a08d0fdabb311ded347db7e` (16 commits, 43 files). `git rev-parse HEAD` equals the head given; pin `3aee7d9…` equal in gitlink and checkout.
- Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`. Every slice and the plan's *Foundation entries* (F1–F24, commit `7ed5cc0`) judged here, since none had a review of its own.
- Two questions at start: trust boundary — no (no file of the range is a trust boundary on the part map); irreversible operation — no.
- Counts: blocking 0 · Minor 4 · out of scope 0 (Declined to judge: 4 lines).

## What I read

- Frozen `task.md` whole, `spec.md` whole, `plan.md` whole, `reports/03-design-answers.md`, the slice reports 13, 16, 18, 20, 22, 23 (first part), 25, 27 and the foundation report 11. I did not read `cycle.md`.
- The definition `definicja_mvp_loop2.md` (sha256 prefix `3e9c2cc9146b`, the same as the task cites), "(new) — Who owns a program?", lines 1000–1040, and the plan of the project `plan_mvp_loop2.md` rows 12, 13, 16 and 18.
- My own selection of the foundation. Parts touched: `simulation` and `browser-view`. The product's guideline files and the foundation also sit in the range. I read the whole diff of `foundations/` (D-44, D-93, D-123, D-131, D-136, D-152–D-162, `streak-program-change`, `saved-program-edit`, `copy-save`, the glossary entry `copy`, two part-map lines) and the decisions the task's *Decisions in play* names.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`.

## Findings

### Critical

none

### Important

none

### Minor

1. **The warning line about a changed program stands beside save buttons that are switched off** — `src/browser/view/program-panel.ts:421-427`. What the player sees: during a map run the player edits the program the copy came from, and the copy itself has no edits. The panel then shows „Program {nazwa} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.”, while „Zapisz w programie” is inactive. So the line announces a save the player cannot make now (screenshot `reports/26-slice-07-05-lacks-no-unsaved.png`). This follows from Q-D1 (measuring the copy against its base) and the spec's decision 7. It agrees with To do 8 and 9 as the spec reads them, and it loses nothing: the copy holds nothing of its own to save. The cost is that the player may be confused. From the spec / Slice 7; not blocking. Worth showing the human at the merge as a consequence of the autonomous choice Q-D1.
2. **`setProgram` outside a map run edits a program the caller does not name** — `src/browser/sim/game.ts:190-209` (choice C9). Without a map run, the exported `setProgram` replaces the content of `teamProgram`: the program a character with no pick would be sent with. Only tests call it that way. The view calls it only inside a map run (`src/browser/view/game-view.ts:66-69`). A later caller outside a map run would silently edit a program it did not choose. The docstring states this. From Slice 1 / plan *Choices*; not blocking.
3. **New files given the status `copy` in the guidelines' tables "Files of this kind" without an audit** — `guidelines/coding-simulation-module.md:19` and `guidelines/coding-browser-module.md:22` (choice C13). The pinned template says a file added after the audit takes no row until the guidelines are refreshed or extended (`.the-way/product-guidelines/coding/template.md:166-168`, WAY-200). The status `copy` tells later agents to copy `programs.ts` and `program-panel.ts`, and nobody compared them against the exemplars. An earlier task did the same (`53b30d0`, `headquarters.ts`). From Slices 1 and 6; not blocking.
4. **The completion branch of the switch has no case of its own** — `tests/sim/copy-actions.test.mjs:357` and `tests/view/program-panel.test.mjs:785` test the refusal and the missing switch button after a death only. A completion goes through the same `mapRunEnded` (`src/browser/sim/run.ts:331-333`). My probe below shows the switch is refused after a completion. Broader coverage would be nice; from Slice 5 and Slice 7.

## Against the task

- To do 1–12: each is met by the commits.
  - The list and the new game's „Program”: `programs.ts:271-283`, `game.ts:156-174`.
  - The panel's list: `program-panel.ts:76-84`.
  - „Nowy program”, „Zmień nazwę”, „Usuń”, and the last program kept: `programs.ts:380-453`, `program-panel.ts:321-345`.
  - Names: `programs.ts:338-360`, with messages in `warning` through `setError`.
  - The row's list and its default: `headquarters.ts:185-196`, `programs.ts:299-319`.
  - The copy, and „Restart” carrying it on: `game.ts:272-316`.
  - Edits going into the copy and the streak and beaten attacks reset: `programs.ts:516-531`.
  - The heading, the two lines, the three buttons and save-as-new: `program-panel.ts:410-430`, `programs.ts:571-645`.
  - Editing saved programs during a map run: `programs.ts:461-478`.
  - The screens after an end and the counts after „Zakończ”: `game.ts:330-345`, `program-panel.ts:93-111`.
  - The first-chill rule: `game.ts:449-474`.
  - The switch: `programs.ts:655-686`, `program-panel.ts:370-376`.
- The two remaining warning lines and the save and discard buttons follow the spec as written.
- *Settlements to record* rows 1–16 are all written:
  - row 1: D-154; row 2: D-155; row 3: D-156; row 4: D-157; row 5: D-158; row 6: D-159;
  - rows 7 and 16: D-44 and the styleguide's list;
  - row 8: D-160;
  - row 9: `saved-program-edit`;
  - row 10: D-161 and D-93;
  - row 11: D-123;
  - row 12: D-93 and D-131;
  - row 13: glossary `copy`;
  - row 14: D-162;
  - row 15: `copy-save`.
  - Further entries: D-153 is new, D-136 and `streak-program-change` gain the switch, and D-131 covers the copy.
- Source fidelity:
  - D-152 is the definition's entry, lines 1000–1013, with only the earning-loop parts and the earning-loop example of compliance removed, as the task assigns them to task 18. Its *Rationale* and *Rejected* are the approved text.
  - The D-136 addition is word for word the definition's clause.
  - The texts of the lines and buttons match Q5, Q12, Q14 and Q16.
  - The foundation agent wrote the rationales of D-154–D-162 (report 11, choice 10). The template allows an author's rationale for a decision that is not recovered from code (`.the-way/elements/decisions/template.md:53-56`), so this is no finding.
- Readings I judged and accepted:
  - "the program the copy belongs to" in place of "taken from" (D-161, D-93). This follows row 6: after a save as a new program, the copy belongs to the new program.
  - The discard returns the copy to its base rather than to the program's current content (Q-D1). The definition lets a saved change reach a map run only at an entry or a switch.
  - The fallback order of the row's default (Q-D4).
- Nothing of tasks 13, 16 or 18 was built: there is no trip plan, no storage and no earning loop in the code diff.

## Against the foundation

- D-04: the panel and the headquarters draw from the game state. They change it only through simulation functions, each called after `clock.flush()`. The shown program is view state.
- D-20 and `action-in-progress`: a switch leaves `run.current` running; a case covers it, and the invariant check passes.
- D-44: the destructive buttons are made with `createButton(..., { kind: "destructive" })`, and the styleguide's list was updated.
- D-93: the counts follow the copy and are rebuilt at a switch, at „Restart” and at „Zakończ”.
- D-123: the first-chill rule goes into the copy, its base and the copy's program. My probe confirms this also for a switched copy.
- D-153: every record that points at a program names it by number.
- `simulation-inputs` and `simulation-isolation` pass.
- Invariant tests:
  - changed: `tests/invariants/test_streak_program_change.py` (new switch case, other rules and same rules, running and paused), `test_program_closed_lists.py`, `test_program_rule_pick.py`, `test_program_world_reference.py`, `test_simulation_inputs.py`, and the helper `tests/invariants/program_fixture.py`;
  - new: `tests/invariants/test_saved_program_edit.py` and `tests/invariants/test_copy_save.py`. Both have controls that can fail, and their executors saw each fail once.
  - None was weakened. The slice-3 note is right: `test_program_rule_pick.py` cannot tell the copy from the list's program, because the two are equal at a send. That is not a weakening, and `tests/sim/copy.test.mjs:76` proves that the map run carries out the copy.

## Each slice and its own-work check

- **Foundation entries (`7ed5cc0`)** — complete. The rows split over two entries each (10 and 12) carry every clause. Widening the headings of D-123 and D-131 in place keeps each to one question. `Method: test` was set before the tests existed; it is met at the head.
- **Slice 1** — The `stryker.config.json` line is required by `tests/quality/test_mutation_test_selection.py`; it is not scope creep. The own-work check (the copy reduced to the repertoire) fits a new path into `programOf`, and its case catches the mutation the report names.
- **Slice 2** — It migrates `state.program` reads to the copy or to program 1. Each assertion keeps its strength, and the reason is named in a comment.
- **Slice 3** — The new control `pushCopyRule` was seen failing.
- **Slice 4** — The own-work check (F9) covers seven kinds of edit × two programs × running and paused, and it was seen failing.
- **Slice 5** — `99763ab` removes the import cycle, C14. Putting the copy's operations in `programs.ts` is within the spec's *Left to the maker* (module placement). The own-work check (the first chill is no change) passed first time on code written in Slice 1. Stryker below shows that the measures it relies on are killed.
- **Slice 6** — The panel is built once and updated in place. The C15 fix sits in `show()`, and its case was seen failing.
- **Slice 7** — The states were shown in the browser. The spacing fix in `5e5a844` came after some screenshots, but it affects only margins.
- **Slice 8** — The pick is kept in the game state. The rows are rebuilt on a key of program numbers and names. The browser check covered the pick, the send, a switched character's row and a deleted default. "Two maps open" was left unchecked, as reported; one list per row holds by construction (`headquarters.ts:185-196`, outside the loop over maps).

## Declined to judge

- The earning loop's copies — task 18.
- What leaves the map after a switch (the trip plan) — task 13.
- Programs after a page reload — task 16.
- A saved program holding a resource of another map, which would make the copy's edits throw inside a map run. This already happens today at a send. Today both maps hold the same four resources, so it cannot occur.

## Checks run

| Command (from the worktree root) | Exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs tests/*.test.mjs` (every Node test file, on that build) | 0 — 711 pass, 0 fail |
| `npm test -- tests/invariants/test_saved_program_edit.py` | 0 (4 tests) |
| `npm test -- tests/invariants/test_copy_save.py` | 0 (5) |
| `npm test -- tests/invariants/test_streak_program_change.py` | 0 (5) |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 0 |
| `npm test -- tests/invariants/test_program_rule_pick.py` | 0 |
| `npm test -- tests/invariants/test_program_world_reference.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/invariants/test_restart_seed.py` | 0 |
| `npm test -- tests/invariants/test_action_in_progress.py` | 0 |
| `npm test -- tests/invariants/test_map_run_repeatability.py` | 0 |
| `npm test -- tests/invariants/test_minute_span_split.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` (quality venv first on PATH) | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 — `0 errors` |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/programs.ts:230-686,src/browser/sim/game.ts:95-345,src/browser/sim/game.ts:430-515"` | 0 — 485 mutants, 435 killed, 1 timeout, 48 survived, 1 without coverage; score 89.90 |
| Scratch probe `…/scratchpad/probe/probe.mjs` on `dist/` | 0 |

What the scratch probe showed:

- `switchProgram` on a map run with `completion` set throws „the map run has ended”.
- After a switch to program 2, the first chill at minute 84 writes the rule into the copy and program 2 only. Program 1 stays with 0 rules, and neither measure turns true.
- After „Zakończ”, the counts stand beside program 2 (`countsProgram` 2), and the row of the switched character shows program 2.

How I classified the Stryker survivors:

- **Messages and events, not worth fixing.** Changed refusal messages and `events: ["Stryker was here"]` in operations that emit no event. No requirement fixes the message text or forbids an event.
- **Equivalent mutants.**
  - `programById`'s null and undefined guards (`programs.ts:290`): `find` gives `undefined` either way.
  - `if (!chosen)` and `if (!sent)` turned to `false` (`game.ts:270`, `:276`): the next line throws on `undefined`, so the send is still refused and changes nothing.
  - `typeof text` (`programs.ts:343`): the input is typed as a string, and the view passes one.
  - `reconcileCounts` with `counts === null` (`programs.ts:239`): no caller passes null counts together with an unchanged rule.
  - `sameData` key-count and array checks (`programs.ts:262`, `:266`): the code was moved, not changed, and checked programs have one shape.
- **Outside the change.** `game.ts:108-110`, `:194-277` (createCharacter and send's map checks), `:437` and `:479` lie in the ranges I gave, but this change did not touch them.
- No real gap found.

Not run:

- the gate `npm test` with no arguments — the orchestrator's, as the handoff says;
- `tests/invariants/test_loop2_one_serving_process.py` — a known baseline failure on this machine;
- a browser session of my own. I judged the slices' screenshots instead (viewed `26-slice-07-03`, `26-slice-07-05`, `28-slice-08-07`).

## Reaches beyond the dispatch

- `.the-way/product-guidelines/reading.md` and `.the-way/elements/common/way_of_working.md` § "Reading the foundation" — named by the method, for my own selection.
- `.the-way/elements/decisions/template.md:48-62` and `:195-206` — to judge whether an author's rationale may stand in D-154–D-162.
- `.the-way/product-guidelines/coding/template.md:155-170` and `.the-way/foundations/decisions.md` WAY-200 — for Minor 3. `git show 53b30d0` — for the earlier precedent.
- `src/browser/sim/run.ts:331-333` (`mapRunEnded`), `src/browser/sim/understanding.ts:314-339` (`withFirstChillRule`), `src/browser/sim/data/maps.ts` (resources) and `scripts/test.py` — to judge the first chill, the completion branch, the resource check and how the focused commands run.
