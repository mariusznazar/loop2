done with concerns

# Report 06 — plan

- Planner: fresh agent (claude-opus-5-5), dispatched by `reports/06-plan-handoff.md`
- Method: `.the-way/task-cycle/plan/SKILL.md` at the pin `f0b2130` (gitlink and
  `git -C .the-way rev-parse HEAD` both `f0b21309a837273a1540f9a704c2dfde6083ec00`)
- Plan: `.runs/task-cycles/styleguide-loop2/plan.md` — nine slices, made one after another
- Size report: `.runs/task-cycles/styleguide-loop2/plan-size.md`
- No code, no test, no foundation entry written; no commit; worktree clean (`git status --short`
  empty; `.runs/` is ignored)

## Read

Whole: the handoff; the plan skill; `.the-way/task-cycle/slice_size.py`; the frozen task; the
spec with Decision 8a; `cycle.md`; `reports/02-spec-review.md`, `reports/05-spec-review-revision.md`;
`AGENTS.md`, `CLAUDE.md`; `.the-way/product-guidelines/reading.md`;
`.the-way/product-guidelines/styleguide/template.md`; `foundations/part_map.md`,
`foundations/invariants.md`; decisions D-03, D-04, D-05, D-06, D-18, D-19, D-27–D-33, D-36, D-37;
`guidelines/coding.md`, `guidelines/coding-browser-module.md` (by `reading.md`: *Applies to* names
browser-view and the other touched parts; the browser-module row matches the controls and the
three screens). "Reading the foundation" and the task-cycle's foundation and execution steps
(`.the-way/elements/common/way_of_working.md`, `.the-way/task-cycle/skill/SKILL.md` §§ 8–11).
`.the-way/instruction-files/SKILL.md`, section 4 of its `principles.md`, the entry point
`.the-way/.claude/skills/the-way-maintain-instruction-files/SKILL.md`.
Code, as far as needed to name each slice's files: `src/browser/index.html`, `main.ts`, every module
of `src/browser/view/`, `scripts/build.mjs`, `package.json`, both `tsconfig.*.json`,
`eslint.config.mjs`, `Dockerfile`, `.dockerignore`, `.gitattributes`, `.gitignore`, `README.md`
(headings and the build and icon lines); the heads of `tests/view/*.test.mjs`,
`tests/invariants/test_application_build_output.py`, `test_application_package_layout.py`,
`test_terrain_drawing_numbers.py`, `loop2_invariant_support.py`; greps for the icon colour and the
change text, for readers of `tsconfig`, `.dockerignore`, `.gitattributes`; the docstrings of
`foundation_check.py`, `.the-way/gate/run_tests.py`, `check_instructions.py`.
Not read, as the handoff forbids: branches `10x/*`, `styleguide-browser-view`, and the directories
`C:\Storage\repos\loop2-10x`, `C:\Storage\repos\loop-10x`, `C:\Storage\repos\loop2-styleguide`.

## Open design choice

None found. Every entry the change needs is a row of *Settlements to record*, the QA-4 fact or a
part-map line that follows from a file the change adds. One part-map line goes beyond what the
spec names: `src/browser/AGENTS.md` under `agent-workflow`, which follows from where the
instruction-files skill puts a rule for a part of the code (choice C9); it leaves no way open that
the task or the skill does not settle.

## The plan

| Slice | Goal | Files changed |
|---|---|---|
| 1 | styleguide of browser-view; `guidelines/coding.md` follows D-28 | 2 |
| 2 | Geist fonts in `assets/fonts/`, copied at build and into the image | 6 (3–5 font files counted as one) |
| 3 | `src/browser/tokens.css` with sources; tests of rows 13, 14 | 3 |
| 4 | `src/browser/styles.css` on the tokens, terrain per Q10, focus; tests of rows 11, 12 | 5 |
| 5 | light icons, credit text, icon test, README | 7 |
| 6 | four control modules in `src/browser/view/controls/`, three screens on them | 8 |
| 7 | kitchen-sink sources, `tsconfig.kitchen-sink.json`, browser `exclude`, build-output test | 6 |
| 8 | `npm run kitchen-sink`, shared copying module, test of row 15, README | 6 |
| 9 | `AGENTS.md` pointer, `src/browser/AGENTS.md` rule | 2 |

Size: `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/styleguide-loop2/plan.md` —
first run exit 1 (Slice 4 `unchecked`: a parenthetical named `src/browser/tokens.css`, which Slice
3 creates, in *Read*); the path moved to *Depends on*; second run exit 0, every slice `fits`
(largest read: Slice 4, about 101 000 estimated tokens; most files: Slice 6, 8). The last report
is `plan-size.md`.

Two limits of the measurement:

- Slice 2 names `assets/fonts/` as one created path, since the release's file names are known only
  when the maker fetches it (spec Decision 3); its real count is 3 to 5 font and licence files plus
  five others, at most 10, within the limit. Once Slice 2 is made, a rerun of the script on this
  plan reports that path as naming no file.
- *Read* cannot name a file an earlier slice creates (the script leaves such a slice unchecked);
  those files — `tokens.css`, `styles.css`, the controls, the kitchen-sink sources — are small and
  are read by the later slices through *Depends on*.

## Order of the slices and the styleguide's example

The styleguide's example "Plan of a user-interface change" is environment and library first, then
the values in their source, then one screen, then its states. Slices 2–8 follow it: fonts
(environment), token file (values with sources), every style and the terrain and icons (the
screen), the shared controls and the kitchen-sink page (its states). The departure is Slice 1: the
styleguide itself comes first, so each later slice's agent finds it by `reading.md` (*Applies to*
`browser-view`) before it restyles. The instruction-file pointer and rule come last, once the
invariant they cite has its test (Slice 4) and every path they name exists (choice C1).

## Guidelines found missing or uncertain

- `browser-view` has no styleguide: the task writes it (Slice 1) and does not wait for it (WAY-215,
  `reading.md`, "Distinguish the gaps").
- `guidelines/coding.md`, "Odłożone rodzaje i formatowanie", restates D-28's deferrals without CSS;
  row 10 changes D-28, so the sentence follows in Slice 1 (choice C10). Without it the general
  coding guidelines contradict D-28 after the merge.
- `guidelines/coding-browser-module.md`, *Files of this kind*: the four new control modules take no
  row, since a file added after the audit takes none until the guidelines are refreshed
  (`.the-way/product-guidelines/coding/template.md`, WAY-200). Its *When to read* ("modułu widoku w
  `src/browser/view/`") reaches `src/browser/view/controls/`. Not a gap; named for the reviewers.
- The exemplar `status-row.ts` (D-36) changes in Slice 6 to make its buttons through the shared
  controls. D-36's examples — controls made once, updated in place keeping focus, actions passed
  to the app — must still hold in it; the reviewer of Slice 6 compares it with D-36.
- The kitchen-sink's entry module, HTML and stylesheet are kinds D-28 defers (entry points, HTML,
  and CSS after row 10): no guideline file is missing for them.

## Concerns the next dispatch depends on

### Q-P1 — foundation_check is red from the foundation entries until Slice 9

The plan method lists "a part-map change for a file the change adds" under *Foundation entries*,
written before slice 1. `foundation_check.py` reports "a path pattern of a part's *Files* or *Trust
boundary* that matches no file git tracks" (its docstring, line 47). So after the commit of the
foundation entries it exits 1 with twelve such errors, falling slice by slice to none after Slice 9;
`npm test`, which ends with that check, exits non-zero through Slices 1–8. The plan's table of
pending patterns names which errors may stand after each slice, and every slice's *Checks* runs the
check expecting exactly those; any other error fails the slice. Proposed answer: keep the method's
order (choice C2), and tell each slice's reviewer to compare foundation_check's output with that
table. The alternative — each part-map line written by the slice that adds its file — keeps the
check at 0 throughout but moves foundation entries out of the foundation step. The full `npm test`
runs only in Slice 9 and in the gate of step 10.

### Q-P2 — `the-way-maintain-instruction-files` is no project skill of loop2

The task (To do 10) and the handoff send To do 10 through `the-way-maintain-instruction-files`.
loop2's `.claude/skills/` and `.agents/skills/` hold no such skill; the only entry point is
`.the-way/.claude/skills/the-way-maintain-instruction-files/SKILL.md`, which serves sessions on
the-way itself and, in a product, says to use "the product's own project skill" — absent here.
`.the-way/instruction-files/SKILL.md`, check 2, says that in a product pinning the-way its pinned
copy is the one to follow. Proposed answer: Slice 9's agent follows
`.the-way/instruction-files/SKILL.md` of the pin directly (mode *place*), never the personal
`maintain-instruction-files` skill, and its step 5 ("write only after approval") is met by the
accepted task's To do 10 and the orchestrator, not by asking the human. Whether loop2 should
install the skill is outside this task.

### Q-P3 — test file names depend on the invariant identifiers

The part map must name the five invariant test files before they exist. The plan proposes names
(choice C3); the foundation-step agent writes the identifiers. If it picks identifiers whose
`test_<id>.py` differs, it should use those names in the part-map lines, and the orchestrator tells
Slices 3, 4 and 8 the names actually written.

### Q-P4 — the foundation-step handoff

- Row 12's invariant rests on the fact of row 18; row 13's on rows 16, 17 and the QA-4 fact
  (as `02-spec-review.md` asked).
- Row 10 changes D-28 in place; the writer of that change should find `guidelines/coding.md`'s
  restatement, which Slice 1 brings in line.
- The part-map lines include `src/browser/AGENTS.md` under `agent-workflow` (choice C9), which the
  spec does not name.

### Carried, still unchecked

- Fonts and icons in the container: the Docker tests (`tests/deploy`, `test_loop2_container_icons.py`)
  stay unchecked where no Docker daemon answers (Slices 2, 5).
- The look of the restyled screens, the terrain per Q10 and the controls' states are seen only in a
  browser (D-19: the repository declares none); Slices 4, 6 and 7 leave them to review and to the
  kitchen-sink page. The controls get no test of their own elements (choice C11).
- The release of github.com/vercel/geist-font is the newest at the time Slice 2 fetches it; its tag,
  commit and file hashes go into Slice 2's report for the `Source:` comments of Slice 3 and for the
  trust-boundary review.

## Check result

`python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/styleguide-loop2/plan.md` — exit 1,
then exit 0 after the fix (every slice fits). Probe, read-only: `python -B
.the-way/instruction-files/check_instructions.py .` — exit 0, 0 errors, 14 warnings on the base
(the base for Slice 9's check). No test or product check run.
