# Whole-change review handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`. Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`, gitlink and checkout equal; the task moves no pin.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. You are the reviewer of the whole change, an agent that made none of it. Your method: read `.the-way/task-cycle/review/SKILL.md` whole (entry point `.claude/skills/the-way-review-change/SKILL.md`); read a file it names only when the step naming it comes. Read-only: no edit of product code, tests, foundation or guidelines. You select your own foundation entries and guidelines by the parts of the change, as your method and "Reading the foundation" in `.the-way/elements/common/way_of_working.md` give. Do not run the gate (`npm test` with no arguments) — the orchestrator runs it after your review; focused checks, probes and mutation runs your method calls for are yours. Questions go to the orchestrator in your report (first line `questions`), never to the human. Do not read `cycle.md`.

Report at `.runs/task-cycles/programy-gracza/reports/30-whole-review.md`. Its first line is `PASS <sha>` or `FAIL <sha>` (the head you reviewed). Return that first line, a one-line check result naming what failed or did not run, and the report path. For each blocking finding name the slice it comes from (by the ranges below), or that it comes from none — a gap of the plan, or the plan's *Foundation entries*.

Two questions at start: trust boundary — no (no file the part map names as a trust boundary is in the range); irreversible operation — no.

## The range

Task base `4bfb9623e9310220e335377df7fbb4c9ad413406` to head `0391518` (`git rev-parse HEAD` at dispatch). 43 files, +4600 −527.

| Part of the range | Commits | Own review | Agent's report |
|---|---|---|---|
| Plan's *Foundation entries* (F1–F24) | `4bfb962..7ed5cc0` | none — you judge it with Slice 1 | `reports/11-foundation-report.md` |
| Slice 1 — the copy and the programs in the game state | `7ed5cc0..9624537` | none | `reports/13-slice-01-report.md` |
| Slice 2 — JavaScript tests migrated | `9624537..c5f4058` | none | `reports/16-slice-02-report.md` |
| Slice 3 — invariant checks migrated | `c5f4058..a303ad5` | none | `reports/18-slice-03-report.md` |
| Slice 4 — operations on the program list; `saved-program-edit` check; part-map line | `a303ad5..bf7e827` | none | `reports/20-slice-04-report.md` |
| Slice 5 — saves, discard, switch; `copy-save` check; `streak-program-change` switch case; part-map line | `bf7e827..4321b2c` | none | `reports/22-slice-05-report.md` |
| Slice 6 — the program panel | `4321b2c..004c085` | none | `reports/23-slice-06-report.md` |
| Slice 7 — the copy's controls, switch button, styleguide list, pending-text fix | `004c085..5e5a844` | none | `reports/25-slice-07-report.md` |
| Slice 8 — the headquarters row's program list | `5e5a844..0391518` | none | `reports/27-slice-08-report.md` |

No slice had a review of its own (no slice carries a risk mark), so there are no Minor or out-of-scope findings of slice reviews to pass on. You judge every slice and the foundation entries.

## Inputs (all paths under `.runs/task-cycles/programy-gracza/`)

- Frozen task `task.md`, read whole (accepted 2026-10-28).
- Reviewed spec `spec.md` (FAIL → revision 1 → PASS: `reports/05-spec-review.md`, `reports/07-spec-rereview.md`).
- Plan `plan.md` and `plan-size.md`; the planner's report `reports/09-plan-report.md`.
- The orchestrator's answers and rulings, autonomous choices, not human approval — judge them against the task and the foundation: `reports/03-design-answers.md` (Q-D1–Q-D5), `reports/06-spec-revision-handoff.md` (the suggested name is the field's value), and these, given here in full:
  - C9–C12: the plan's *Choices* (`plan.md`, heading „Choices”): `setProgram` outside a map run edits the program a character with no pick and no program used last would be sent with; `send`'s program number optional; the copy record a field of the game state's map run; counts stay in `ruleCounts` with an owner record.
  - C13: new modules added to the guideline tables „Files of this kind” as `copy` rows.
  - C14: Slice 4 left an import cycle `programs.ts` ↔ `game.ts`; Slice 5's first commit `99763ab` moved `checkProgram`, `reconcileCounts`, `sameData` into `programs.ts`.
  - C15: Slice 6 observed that uncommitted editor text lands in the newly shown program when the panel switches without moving focus; Slice 7 blurs the active element inside the editor in `show()` before switching.
- The approved definition `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` (approved 2026-10-28, fingerprint 7e33760d), § Projected foundation changes, „(new) — Who owns a program?” and „(new) — How is a map solved, and what opens the next one?”, for source fidelity of D-152 and the D-136 addition. Plan of the project `plan_mvp_loop2.md` row 12 beside it; rows 13, 16, 18 only to judge that no later task's work was done.

## What the orchestrator's mechanical checks passed on, for your judgment (not as findings)

- Slice 1 changed `stryker.config.json` (+1 line), beyond its planned *Change*: `tests/quality/test_mutation_test_selection.py` requires each `tests/sim/*.test.mjs` listed. Slices 4 and 5 were given that file in their *Change*.
- Slice 3's executor: `test_program_rule_pick.py` cannot tell the copy from the list's program at send, since both are equal then (report 18, line 30).
- Slice 5 placed the copy's operations (saves, discard, switch, measures) in `programs.ts`, where the spec's *Units* put run-touching operations in `game.ts`.
- The foundation agent's concerns (report 11): rows 10 and 12 split over two entries each; D-123 and D-131 headings widened in place; rows 3, 6, 10 worded „the program the copy belongs to” rather than „taken from”; the new invariants read `Method: test` before their tests existed (written in slices 4, 5).
- States left unchecked in the browser, each named in its slice report: the screen after a completion (slices 6, 7); a non-zero count kept after „Zakończ” on screen (slice 1); the streak going from above zero to zero at a switch on screen (slice 7); „Program 2” as the suggested name on screen (slice 7, unit-covered); „two maps open” on a headquarters row (slice 8); real keyboard focus after an edit (slice 1). Screenshots `reports/14-*`, `24-*`, `26-*`, `28-*`. The spacing of the switch button was fixed in `5e5a844` after some slice-7 screenshots were taken.
- Known baseline failure on the task's base: `tests/invariants/test_loop2_one_serving_process.py` setup (`Get-NetTCPConnection` finds no listener on this machine).

Quality tools: put `export PATH="$PWD/.runs/quality-venv/Scripts:$PATH"` first for `tests/quality/...` and Stryker runs (Git Bash). A dev server, if you run one, on a free port with `LOOP2_LISTEN_PORT`, the account request intercepted as the slice reports describe, stopped by its PID afterwards; leave `C:/Storage/repos/loop2` clean.

Report each check you run with its command and exit code; name what you did not run.
