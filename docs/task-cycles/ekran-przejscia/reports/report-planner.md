# Report — planner of the task cycle `ekran-przejscia`

(Saved by the orchestrator from the planner's returned text: the harness refused the planner's own
write of this file with "subagents should return findings as text".)

- **Status:** done with concerns
- **Plan:** `.runs/task-cycles/ekran-przejscia/plan.md` — 12 slices and 18 foundation entries (E1–E18)
- **Size report:** `.runs/task-cycles/ekran-przejscia/plan-size.md`
- **Check result:** `slice_size.py` exit 0, every slice fits. The gate and `foundation_check.py` did not run (they are the orchestrator's). The pin-gate result on 44317eb had not arrived, so the plan assumes it broke nothing.
- Method: `.the-way/task-cycle/plan/SKILL.md` at pin 61c72fb. `git -C .the-way rev-parse HEAD` matches the gitlink.
- No code, test or foundation entry written; no commit. `git status --short` is clean.

## Checks run
| Command | Exit | Result |
|---|---|---|
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | both 61c72fb |
| `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/ekran-przejscia/plan.md` (to scratchpad) | 0 | 12 slices fit |
| same, `> .runs/task-cycles/ekran-przejscia/plan-size.md`, after the last edit | 0 | 12 fit; Slice 9 is the largest at ~194k of 250k tokens |
| `git status --short` | 0 | clean |

## Open design choice / reserved choice
None. The four carried questions are settled inside the plan and listed under *Choices*.

## Choice to review first: carried question 4
Plan: the band has to name the group the game wrote its rule into. Slice 2 gets that from what the saved game already holds:
- `state.discovery` holds what the first chill reveals exactly when the game wrote „Zawsze → Eksploruj”. Only the chill reveals those actions (`sim/data/actions.ts:54`, `:63`) and that condition (`conditions.ts:57`).
- The group is then the copy's first rule group (`understanding.ts:429-458`).

So the save's shape does not change, `SAVED_GAME_VERSION` stays 3, `saved-game.ts` is untouched and test-server saves survive.

What this gives up: if the player renames or moves that group during the pause, the band shows the group's current name. With every group deleted, the sentence disappears.

The other way: a new field in the game state, version 3→4. The band always names the original group, but one slice must change `saved-game.ts` and gets its own review of crafted input; every test-server save is refused once.

Recommendation: keep the plan. Task 10 must record written rules anyway and can raise the version then.

## Questions (with proposed answers; the plan does not wait for them)
1. Status of the new rows in `guidelines/coding-browser-module.md`. Task item 9 adds the rows but sets no status. The template (`.the-way/product-guidelines/coding/template.md`, „Writing the files”) says a status the task does not settle is a question. Proposed answer: `copy` — every React module except the exemplar already has `copy`, and so do the pure modules `account-rules.ts` and `screen-address.ts`.
2. Committed scene size until Mariusz picks. The plan commits 672 × 304, because the definition says „Scena większa”. The pull request shows both sizes, and either choice later costs one constant.

## Concerns
- Slice 9 is heavy: ~194k tokens to read, ~94k of it `tests/view/account-screen.test.mjs`; its *Model* is `strongest`. If it comes back too large: the stylesheet layout, the real-browser checks and the screenshots move into a following slice.
- Slices 7–9: the terrain invariant's check reads the React drawing, which the screen only shows from Slice 9 on. Every check still passes.
- Slices 9–11: the old DOM builders sit in their modules unused. No check fails meanwhile.
- Screenshots and real-browser checks are in Slice 9. A slice with no commit would fail the mechanical check, so they cannot have their own slice. Slices 10–12 are told to change no stylesheet and nothing on screen.

## Guidelines missing or uncertain
- `coding-browser-module.md` has no example of a React screen hosting a second React root (the program panel and its rule-panel portal).
- `testing.md` does not say whether the Python invariant check may keep a stand-in document once the drawing is React. Slice 7 may use `react-dom/server` static markup, or jsdom under the memory-limit rule.
- The template's rule on statuses (question 1).
- The handoff's styleguide *Program editor* passage on where the rule panel stands says only „Edytor programu stoi na ekranie Programy i na ekranie przejścia (D-288)” and the panel's look. No guideline passage found that this change makes untrue; Slice 12 checks again after the code exists.

## Order vs the styleguide's example
Follows the example: the picture asset first, then parts, screen and states. Departs in one step: the change adds no token value, so no "values in their source" step. Each UI slice reports a missing value instead of choosing one (`src/browser/AGENTS.md`). Simulation and pure functions come before the components that use them; removals and guidelines come last.

## What I read
- Whole: the handoff, `plan/SKILL.md`, `task.md`, `cycle.md`, `src/browser/AGENTS.md`.
- Guidelines, whole: `coding.md`, `coding-browser-module.md`, `coding-simulation-module.md`, `coding-saved-game.md`, `testing.md`, `styleguide-browser-view.md`.
- Decisions, whole: D-03, 19, 21, 43, 44, 46, 62, 70, 76, 87, 88, 122, 123, 125, 129–133, 147, 185, 186, 188, 201, 215, 216, 250, 254, 264, 265, 269, 271–273, 276, 279–283, 289, 302, 304, 306, 308.
- Invariants, whole: browser-view-framework, application-build-output, application-package-layout, application-build-layout, player-map-run-pace, terrain-drawing-numbers, map-run-layout, browser-view-token-values, application-build-kitchen-sink, streak-program-change, saved-program-edit, copy-save, save-version, sprite-file-content, rule-state-from-pick.
- Part map: browser-view, simulation, build-tools, agent-workflow. Glossary headings only; no new term needed.
- Code whole: `game-view.ts`, `run-screen.ts`, `status-row.ts`, `terrain-panel.ts`. Parts of: `program-panel.tsx`, `rule-panel.tsx`, `rule-list.tsx`, `program-editor.ts`, `tile-list.ts`, `body-row.ts`, `combat-line.ts`, `trip-lines.ts`, `headquarters.ts`, `react-button.tsx`, `sim/game.ts`, `sim/understanding.ts`, `sim/types.ts`, `styles.css`, `static-files.mjs`, `README.md`.
- Tests: case headings of the view tests and `discovery.test.mjs`; the docstring of `test_terrain_drawing_numbers.py`; cases 4012 and 4058 of `account-screen.test.mjs`; the population control of `test_browser_view_token_values.py`.
- Old Loop: `Scene.tsx:1-60` and the sprites folder listing.
- The-way: `slice_size.py`, `skill/SKILL.md:255-300`, `skill/foundation_step.md`, `product-guidelines/reading.md`, `coding/SKILL.md:1-60`, `coding/template.md:210-315`.

## Reaches beyond the handoff
| What | Where | Why |
|---|---|---|
| D-124, whole | `decisions.md:2272-2296` | „Dodaj regułę z tym” acts like „+ reguła”; Slices 3, 4, 8 |
| D-288, whole | `decisions.md:6072-6107` | where the rule panel stands; Slices 3, 4, 9 |
| D-04, D-18, D-35, D-36, D-39, D-41, D-118, D-166, D-206, D-267, D-268, D-284 | `decisions.md` | Headings and first sentences only; named by range in slice *Read* lists because the guidelines or the slice's work cite them |
| Invariants simulation-isolation, simulation-inputs, content-identifiers, browser-view-focus-outline, document-test-memory-limit | `invariants.md` | Located, not read whole; named for the slice checks that run them |
| The-way task-cycle and product-guidelines files | `.the-way/` | who writes the entries (one agent before Slice 1) and how Slice 12 works with no human |
| `.claude/skills/loop2-play/SKILL.md` | repo | Slice 9's real-browser step |
| Old Loop `Scene.tsx` and sprites | `C:\Storage\repos\loop\` | Slice 1's recipe |

## Searches not found or unclear
- Styleguide passage on where the rule panel stands (the handoff's example): not found.
- Wording of the tile line under the drawing: unsettled. The plan uses the table row's label and stock; a hovered tile that is not yet revealed shows its label alone.
- „Dodaj regułę z tym” when the copy has no rule group: unsettled. The plan disables the button.
- Old scene's props or fire in the still frame: unsettled. The plan takes the forest alone.
- Another way for „Eksploruj” to enter the Understanding besides the chill: none found.
- `loop2-container-sprites`: absent from `invariants.md`, as expected (task 20 writes it).
- Task *Context* line numbers (cited at 20d804b), re-read in this worktree. Still hold: `static-files.mjs:32-46`, `.dockerignore:9`, `Dockerfile:10`, `maps.ts:66` and `:84`, `status-row.ts:51` and `:176-178`, `types.ts:413-417`. Moved: columns `game-view.ts:94-104` and `:255-266` → `run-screen.ts:48-82`; `styles.css:106-117` → `:194-246`; status-row buttons `:171-197` → `:179-201`; `terrain-panel.ts:32-42` → `:32-55`. The plan's *Read* ranges are taken at 44317eb.
