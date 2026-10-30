# Author report — wprawa-i-drzewa

Status: done

Worktree: C:/Storage/repos/loop2-wt/wprawa-i-drzewa
Branch: task/wprawa-i-drzewa
Base: dce297060aeec3154e50593ee400c28b98649435
Commit: adc6e54 — feat: :sparkles: add practice and character skill trees

The whole accepted task is implemented. This report stops before independent review and the return step. No vault files, main-checkout product files, server data, dependencies or live player state were changed. No subagent was dispatched.

## Result and implementation choices

- Characters store only practice and purchased ranks for their predispositions. Level, next threshold, available points and effects are computed from those records and the data catalog. All eight accepted curves and fourteen branches are in data. Storing derived levels/effects was rejected because purchases and practice could leave redundant values inconsistent.
- A run owns an independent skill snapshot and a separate practice record. Send snapshots the character; restart copies the preceding run's snapshot and discards its accrued practice. Reading the team record on every action was rejected because retained runs would otherwise be affected by later changes. Costs, resource limits and the one-minute floor act in the simulation, not the view.
- Successful effects increment practice in their landing minute. Combat returns practice for damaging attacks and dodges that actually remove damage, then the run receives the result in its last combat minute. Completion pays all accumulated practice to that runner in the same minute, after the ending action, once. Death and early exits leave the team's prior skills intact. Every manual completion pays, including repeats of solved maps, exactly as the accepted temporary scope requires.
- Understanding records tree identifiers, meaning the whole known tree and its branches. This avoids saving every branch identifier independently when all branches of a tree are discovered together. Buying a branch never discovers it. Patrol's action data explicitly names the tree-discovery revelation; the simulation reads that field. An earlier implementation used a redundant explored-event field for patrol; the own check replaced it so D-128 remains true when data changes. A local `skills` constant breaks the TypeScript inference cycle between actions, revelation and skill identifiers while preserving checked catalog types.
- The shared repertoire calculation accepts the run's purchased ranks. Headquarters passes no ranks; both editor modes during a run pass its snapshot. A known but unbought patrol rule remains in a program and is skipped. No filtering removes saved rules.
- The headquarters keeps skill controls stable across purchases, preserving keyboard focus. The skill panel and run-practice line use existing tokens and controls. Numerical previews stand in the content data alongside their effect definitions; this costs keeping the preview and effect values aligned when balance changes. Tests check their accepted observable values, and the review should inspect that relation. No new token, asset or framework was introduced.
- The part map already claims the new files through its paths; no responsibility, dependency allowance, surface or trust boundary changes. `stryker.config.json` adds the new simulation test file so the new skills module is exercised by the existing mutation method.

## Foundation step

Used the project wrappers and pinned decision, invariant and glossary element methods, after their templates and supporting files. Pinned the-way commit verified against the gitlink: a8dfe8ac62885e88bc8f463e93ab16b621d48e92.

- Projected growth and character-description entries became D-179 and D-180 with their approved binding sentences. D-119 gained branch ownership and its rationale/rejected alternative. Its implemented wording remains “one for all characters”; server “saved once” belongs to task 16 and is not claimed here.
- Accepted settlement 1 → D-181; settlements 2 and 12 → D-182; settlement 3 → D-183; settlement 4 → D-183/D-184 plus D-120's accepted exception; settlement 5 → D-185/D-186 and D-63's clean-flame exception; settlement 6 → D-64; settlement 7 → `action-duration-minimum`; settlement 8 → D-187; settlement 9 → D-188; settlement 10 → D-189.
- D-118 includes discovered branches; D-144 distinguishes base combat numbers from bought bonuses; D-150 no longer describes practice as absent. Their linked neighbours were read, including D-126, D-127, D-128, D-145, D-151 and `nature-energy-range`; no further binding changes were needed.
- Added glossary `practice` and `trait`; added branches to Understanding without removing creatures. The existing `character skill` definition was retained. Uses in the foundation, guidelines and source were searched; these definitions introduce no rename of an existing meaning.
- Rejected candidates 11 and 13 were not written as decisions/glossary entries. Balance numbers stay in data and their behavior tests. No environment fact or part-map change was needed.
- `action-duration-minimum` cites accepted settlement 7 verbatim and has a citing test. The deliberate failure and restoration are recorded below.

## Focused checks

All repository tests were invoked through `npm test`, one file per invocation. The last run of each below exited 0. Tests were added after the initial simulation wiring, not claimed as test-first.

| Command | Result |
|---|---|
| `npm test -- tests/sim/skills.test.mjs` | 16 passed; initial run exit 1 for a scout fixture that selected a non-neighbour; fixture corrected using actual adjacency. Deliberate clamp removal run exit 1: a walking duration was -1 instead of 1. Restored clamp, repeated command exit 0. Last run after explicit tree revelation: 16 passed. |
| `npm test -- tests/view/character-skills.test.mjs` | exit 0, 4 passed |
| `npm test -- tests/sim/discovery.test.mjs` | initial exit 1, two legacy expected discovery shapes lacked the new trees; updated accepted expectations, exit 0, 31 passed; last run after tree revelation also exit 0 |
| `npm test -- tests/sim/repertoire.test.mjs` | exit 0, 32 passed |
| `npm test -- tests/sim/encounters.test.mjs` | exit 0, 29 passed |
| `npm test -- tests/sim/completion.test.mjs` | exit 0, 14 passed |
| `npm test -- tests/view/status-row.test.mjs` | exit 0, 28 passed |
| `npm test -- tests/view/program-editor.test.mjs` | initial exit 1, old catalog expectation omitted patrol; updated accepted expectation, exit 0, 39 passed |
| `npm test -- tests/sim/actions.test.mjs` | exit 0, 18 passed |
| `npm test -- tests/sim/data.test.mjs` | initial exit 1, four old expectations omitted patrol or expected a zero scheduled duration; corrected accepted expectations, exit 0, 31 passed; explicit tree revelation change followed by another exit 0 |
| `npm test -- tests/sim/team.test.mjs` | initial exit 1, expected complete character records omitted zero skills; added explicit zero records, exit 0, 7 passed |
| `npm test -- tests/sim/combat.test.mjs` | exit 0, 11 passed |
| `npm test -- tests/sim/purity.test.mjs` | exit 0, 3 passed |
| `npm test -- tests/sim/gather.test.mjs` | exit 0, 16 passed |
| `npm test -- tests/quality/test_quality_invariants.py` | exit 0, 5 passed |
| `npm run typecheck` | initial implementation exit 0; explicit tree-revelation refactor first exited 1 for a circular inferred catalog type, corrected by separate inferred constant and checked export; final exit 0 |
| First formatting invocation, exact PowerShell command and expanded argument list below | batch exit 0; formatting only |
| `node node_modules/prettier/bin/prettier.cjs --write src/browser/sim/data/revelations.ts src/browser/sim/understanding.ts tests/sim/data.test.mjs; npm run typecheck` | second formatting invocation, batch exit 1 from the following typecheck's circular inferred type errors; Prettier reported all three files processed successfully, but its separate exit code was not captured |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors, after staging the new files and again after commit |
| `git diff --cached --check` | exit 0 |

First formatting invocation, exactly as submitted to PowerShell:

```powershell
$changedPaths = @(git diff --name-only -- '*.ts' '*.mjs' '*.css'); $changedPaths += @('src/browser/sim/skills.ts','src/browser/view/character-skills.ts','tests/sim/skills.test.mjs','tests/view/character-skills.test.mjs'); node node_modules/prettier/bin/prettier.cjs --write $changedPaths
```

Its expanded Node argument list, in the order printed by that run:

```text
node node_modules/prettier/bin/prettier.cjs --write src/browser/sim/combat.ts src/browser/sim/data/actions.ts src/browser/sim/data/skills.ts src/browser/sim/game.ts src/browser/sim/program.ts src/browser/sim/programs.ts src/browser/sim/run.ts src/browser/sim/types.ts src/browser/sim/understanding.ts src/browser/styles.css src/browser/view/game-view.ts src/browser/view/headquarters.ts src/browser/view/program-editor.ts src/browser/view/status-row.ts tests/sim/completion.test.mjs tests/sim/data.test.mjs tests/sim/discovery.test.mjs tests/sim/encounters.test.mjs tests/sim/repertoire.test.mjs tests/sim/team.test.mjs tests/sim/understanding-fixture.mjs tests/view/program-editor.test.mjs tests/view/status-row.test.mjs src/browser/sim/skills.ts src/browser/view/character-skills.ts tests/sim/skills.test.mjs tests/view/character-skills.test.mjs
```

The second formatting invocation is a separate run, shown in full in the table. After correcting the inferred catalog type, the later standalone `npm run typecheck` exited 0; it did not rerun Prettier.

New invariant-test file: tests/sim/skills.test.mjs, citing `action-duration-minimum`. The changed existing tests exercise related behavior but do not themselves carry invariant citations; the invariant runner's files were not changed.

The full `npm test` gate was not run by the author, per handoff. The orchestrator's optional baseline was cancelled explicitly at invariant checks: 785 Node tests, workflow 5 and deployment 66 (3 skipped) had passed; exit 1 was cancellation, not a full pass. Full invariant/quality/foundation baseline gate was unchecked. The author focused quality/foundation results above are separate. The reviewer is to run the existing mutation tool; author did not run Stryker.

## Own-work weakest-point check and real browser evidence

Most likely missed requirement: branch ownership must agree between execution and **both** editor modes, while a copied/saved unavailable rule remains in the program. The focused skill test checks shared repertoire/skip behavior. A real-browser check additionally bought Obchód for Ala, added it in the copy editor and the saved-program editor, then sent Ola on the saved program. Both owner editors offered it; Ola's copy retained it and the actual simulation waited because it could not execute it. This check passed and did not merely inspect a substitute control.

Read the Playwright MCP skill and its grounding/session, reading, timing, selector and false-positive references. First MCP navigation failed exactly:

`Error: Browser is already in use for C:\Users\Mariusz\AppData\Local\ms-playwright-mcp\mcp-chrome-d96ee7f, use --isolated to run multiple instances of the same browser`

The orchestrator authorized a separate disposable local Playwright instance. No shared browser/tab/profile was closed or taken over. Fallback uses installed Playwright from the Codex runtime, Chrome headless with a fresh context and 1440×1100 viewport, and the ignored preview:

- Initial start: `python -m http.server 8765 --bind 127.0.0.1` from this worktree (local serving process, not a product server). Its root-relative icon requests returned 404, found in the server log at shutdown, although no page exception occurred. It was replaced by `python .runs/task-cycles/wprawa-i-drzewa/preview-server.py`, which maps the product's root-relative icon/font paths to built public assets; browser evidence was regenerated with console errors and HTTP failures included in assertions.
- Browser check: `node .runs/task-cycles/wprawa-i-drzewa/ui-check.mjs`. Initial exit 1: Windows ESM import needed a `file:///` URL. Corrected import: exit 0. Expanded assertions for both editor modes/nonowner/death: exit 0, zero browser page errors.
- The first projection used wrong selectors for action/discovery and returned empty arrays, which were not treated as absence evidence. Corrected to the actual `Akcja` control and `.discovery-text`, with positive assertions and screenshots. Final evidence is `.runs/task-cycles/wprawa-i-drzewa/reports/ui-results.json`.
- Fixture scope: prepared Understanding and accrued run practice one minute before completion, then **real simulation** completion and end paid the character and produced the headquarters state. Other prepared run inputs drive completion/death. Purchases, send, editor edits, end and discovery use real simulation functions. This is representative component/simulation evidence, not a claim that a fresh user earned all points by a complete natural playthrough. No shipped bypass exists.

Screenshots saved and visually inspected, all under `C:/Storage/repos/loop2-wt/wprawa-i-drzewa/.runs/task-cycles/wprawa-i-drzewa/reports/`:

- `ui-hq.png`: all known trees, funded Ala and zero-point Ola, numerical before/after and nonnumerical rows. Keyboard Enter bought Wprawny krok, the same button retained focus and its solid focus outline. Rows wrap without overlap. Headquarters is long with all eight trees, the accepted tradeoff.
- `ui-owner-run.png`: Obchód selected in the buyer's copy after both copy and saved-program edit checks. The run has no positive practice yet, so no practice line.
- `ui-nonowner-run.png`: retained Obchód rule in Ola's copy; simulation status waits, and no practice line is shown.
- `ui-completed.png`: under the body row, positive gathering +5 and eating +1 remain after completion.
- `ui-dead.png`: gathering +5 remains under the body row after death, in the text role.
- `ui-discovery.png`: first chill names the exploration tree with the action and pauses once.
- `ui-fresh.png`: the entire skill sections are absent before any tree is discovered.

The browser also asserts max-rank Obchód and Szybki posiłek buttons are disabled; the numerical max row omits next value/price, zero-point Ola has no enabled purchase, and no page errors occurred. Unit tests cover exact labels and zero-line formatting too.

Final fallback run exited 0 with no console errors or HTTP failures as well as no page exceptions; all seven regenerated screenshots were inspected with loaded product fonts/icons. The local serving process was then stopped deliberately (Ctrl-C, process exit 1); the disposable browser had already closed in its `finally` block.

## Reaches beyond dispatch and remaining costs

- Build-tools part and mutation-selection/testing decisions: new simulation test registration in Stryker. Orchestrator confirmed this scope expansion is authorized. No boundary crossed.
- Foundation-writing methods selected common templates/examples, source projected entries and linked neighbour decisions listed above. D-128 motivated putting tree revelation explicitly in action data rather than ignoring a misleading revealedBy field.
- `src/browser/sim/data/revelations.ts`: the tree-discovery event needed by patrol's data, within simulation.
- Existing data/team tests, shared understanding fixture and affected discovery/editor fixtures: required because the new state has skills/trees and the action catalog has patrol.
- Installed local Playwright fallback: used only after the actual shared-profile error and orchestrator instruction. No new runtime/dev dependency.
- Arithmetic checked against accepted task: cumulative points intentionally cannot buy every rank/branch. Kicking has one available point despite three purchasable rank definitions, campfire has four points (so construction reaches rank two), walking 5−6 floors to one. No balance was silently adjusted.
- No migration/server-save implementation: task 16 is not merged on this base. Task 14 must later change D-182/current repeated-completion payment and death consequences; these are accepted current behavior, not claims of the future rules.

## Searches not found or unclear

- `Get-Content -LiteralPath '.the-way/glossary.md'` — missing path; corrected by `rg --files .the-way` and reading `.the-way/foundations/glossary.md`.
- `rg -n 'gather|walkTo' src/browser/sim/programs.ts src/browser/view/status-row.ts src/browser/view/*.ts` — Windows wildcard argument produced OS error 123; corrected with `rg -n 'gather|walkTo' src/browser/view --glob '*.ts'`.
- `Get-Content -LiteralPath '.the-way/elements/decision/SKILL.md' -Encoding UTF8` — missing singular path; corrected to the wrapper's `.the-way/elements/decisions/skill/SKILL.md`.
- A broad foundation search `rg -n -i 'practice|skill|trait|Understanding|duration|gather|explor' foundations` and one projected-entry extraction with heading `.*` produced truncated output; no absence finding was based on them. Entries were read selectively; the projected-entry extraction was corrected to constrain the heading to `[^\r\n]*`.
- Initial browser selectors for Czynność and `.discovery-line` were unclear/incorrect; actual source showed `Akcja` and `.discovery-text`, corrected before the browser assertions above.
- `rg -n 'invariant:' tests/sim/completion.test.mjs tests/sim/discovery.test.mjs tests/sim/encounters.test.mjs tests/sim/repertoire.test.mjs tests/view/program-editor.test.mjs tests/view/status-row.test.mjs tests/sim/data.test.mjs tests/sim/team.test.mjs` returned no citations; these are behavior tests, not invariant-test files. The positive control is the explicit citation in tests/sim/skills.test.mjs.

## Changed files

The following table is the committed diff against the base, additions/deletions; ignored preview/report files are not product changes.

| File | + | − |
|---|---:|---:|
| foundations/decisions.md | 184 | 20 |
| foundations/glossary.md | 13 | 1 |
| foundations/invariants.md | 10 | 0 |
| src/browser/sim/combat.ts | 20 | 3 |
| src/browser/sim/data/actions.ts | 6 | 0 |
| src/browser/sim/data/revelations.ts | 3 | 0 |
| src/browser/sim/data/skills.ts | 167 | 9 |
| src/browser/sim/game.ts | 23 | 1 |
| src/browser/sim/program.ts | 18 | 3 |
| src/browser/sim/programs.ts | 2 | 1 |
| src/browser/sim/run.ts | 68 | 13 |
| src/browser/sim/skills.ts | 191 | 0 |
| src/browser/sim/types.ts | 15 | 0 |
| src/browser/sim/understanding.ts | 54 | 18 |
| src/browser/styles.css | 33 | 0 |
| src/browser/view/character-skills.ts | 123 | 0 |
| src/browser/view/game-view.ts | 10 | 0 |
| src/browser/view/headquarters.ts | 22 | 3 |
| src/browser/view/program-editor.ts | 5 | 1 |
| src/browser/view/status-row.ts | 2 | 0 |
| stryker.config.json | 1 | 0 |
| tests/sim/completion.test.mjs | 2 | 0 |
| tests/sim/data.test.mjs | 9 | 2 |
| tests/sim/discovery.test.mjs | 26 | 5 |
| tests/sim/encounters.test.mjs | 6 | 1 |
| tests/sim/repertoire.test.mjs | 14 | 0 |
| tests/sim/skills.test.mjs | 565 | 0 |
| tests/sim/team.test.mjs | 13 | 0 |
| tests/sim/understanding-fixture.mjs | 2 | 0 |
| tests/view/character-skills.test.mjs | 138 | 0 |
| tests/view/program-editor.test.mjs | 17 | 2 |
| tests/view/status-row.test.mjs | 8 | 2 |
