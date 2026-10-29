# Spec designer report

Status: done

Spec: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/spec.md`

## Dispatch and read scope

Worktree: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`; task: `.runs/task-cycles/walka-w-glebi-lasu/task.md`; intended spec: `.runs/task-cycles/walka-w-glebi-lasu/spec.md`.

Read the frozen task whole, project write-spec skill and pinned spec skill and design variant, selected foundation entries whole, product glossary whole and selected process glossary entries; all six selected guidelines and `src/browser/AGENTS.md`. Read the approved definition's scope, inputs and the projected map, solving, combat and randomness entries, plus the plan's row 8 and projected-entry assignments.

Code read: `sim/types.ts`, `random.ts`, `layout.ts`, `run.ts`, `program.ts`, `game.ts`, `understanding.ts`; data maps/actions/conditions/revelations/skills/items/archetypes/balance; view status-row/headquarters/game-view. Repertoire and discovery currently live in `understanding.ts` and `status-row.ts`, rather than files of those names.

Beyond the dispatch's named code: `src/browser/sim/body.ts` to independently check the cooling statement and establish exactly what the combat branch must skip; `src/browser/view/game-view.ts` to ground placement of the new line; `src/browser/view/program-editor.ts` through its resource-list helpers to check its dependency on `sendMaps`; `tests/sim/acceptance.test.mjs` through the reference-program definition and acceptance checks to select an existing, reproducible survival program for the requested measurement; `src/browser/sim/data/campfire.ts` to understand that program's requirements. No other foundation entry was needed, no predecessor engine/UI was read, no external service used.

## Questions — batch 1

The task fixes combat numbers and rules but leaves two boundary meanings implicit. These questions go to the orchestrator, not the human.

1. Does the 180-minute grace include minute 180? Recommend protecting game minutes 1 through 180, making 181 the first eligible draw; after combat ends in E, protect E+1 through E+180 and first draw at E+181. Alternative: the first draw when the elapsed difference reaches 180, at 180 / E+180. Both can be read as "after 180 minutes"; the recommended whole-minute reading makes a period of 180 protected minutes explicit. A wrong choice shifts attack timing and every pinned seed's encounter schedule by one minute. No source explicitly states the inclusive boundary.
2. Does repeated character dodge accumulate while the creature keeps dodging? Recommend one pending reduction of 5, refreshed rather than added by another dodge, consumed by the next damaging enemy strike and cleared when the encounter ends; a creature dodge neither consumes nor grants protection. Alternative: each dodge adds another 5 to a bank of protection. The singular "the next strike" and absence of a stacking rule support one pending reduction; accumulation adds a new resource and can change survival. Damage is clamped at zero. The usual wolf reaches its retreat condition and keeps yielding, so this question is mostly a rule boundary for the data-driven combat evaluator.

Answers: the orchestrator accepted both recommended interpretations in `reports/03-design-answers.md`: inclusive grace through minute 180 / E+180, first eligible minute 181 / E+181; one refreshed dodge reduction, consumed by the next damaging strike, clamped damage and cleared protection at encounter end. These are autonomous interpretations, not human approval of new balance. The spec marks that provenance and requires direct boundary checks. The answers opened no further question. The remaining proposed resolutions were accepted subject to independent spec review.

## Proposed resolutions of the six dispatched choices

- Creature rules share the condition/action pair type used inside `ProgramRule`, without player IDs, groups, repertoire or counters. Combat condition evaluation receives an explicit actor/opponent viewpoint: own health means the acting side's current health; enemy health means the other side's. Health thresholds compare health points, not a percentage of maximum health. A player turn chooses after the wolf action and its damage; a dead actor gets no action. One ordered rule selection mechanism serves player group traversal and creature pair traversal, with context-specific feasibility.
- Keep current encounter and latest encounter record in the map run, separate from ordinary timed activity. An active encounter carries creature ID, attack minute and resolution minute. The run carries its attack generator and grace origin, plus beaten-attack count. Resolution produces an ordered structured transcript, never formatted text in the simulation. No round state persists between game minutes because all rounds resolve atomically in the final minute. Discard interrupted activity and movement destination so it can never land later.
- Expand the meaning of `program-rule-pick` to the character's turn in every combat round and the ordinary free-minute pick. Expand `free game minute` to the final combat minute when the run continues; the first four combat minutes and minute of attack are not ordinary free picks. Combat actions use the same rules and counters, while zero-duration combat actions never enter the timed-action scheduler.
- In every ordinary minute, process body/streak, death, world, ending action and its discoveries, then completion, then eligible attack, then ordinary pick if free. Eligibility is checked every surviving ordinary minute, including during an unfinished action: restricting it to `stepped.picks` would make the first attack depend on the program. During combat increment streak and advance world while body stands; on the final minute resolve rounds, apply combat death or beaten count and grace, check completion and only then start the next ordinary action. Final-minute status still says combat, unless death/completion takes priority, even though the next timed action has already begun for future minutes.
- Add an attack revelation carrying creature ID. Actions/conditions/creatures declare that event in their own data; Understanding gains discovered creature IDs, shared by the player. Merge discoveries of the ending action and the attack into one minute's discovery line and one pause. First attack adds no program rule.
- Place discovery line directly below status, then combat line, then existing body/terrain. Resume removes discovery only. Keep latest combat line on frozen death/completion screen (Q19 explicitly needs it there); restart/end/new send remove it with the old run. It is one wrapped text paragraph in the existing `text` role, not a new chronicle or interactive surface.

## Additional grounded choices

- Random entrance is one draw from the layout stream after resource placement and fallback placements, selecting from all tiles in row-major order; fixed entrance consumes no draw. Keep existing stream constants and Las layout unchanged.
- Map solving keeps its existing per-kind requirements object, extended to streak and beaten attacks individually or together. Missing requirements are not checked; supplied ones are conjunctive. A map's optional opener is checked by simulation `send` and read by the headquarters through one shared eligibility calculation, preventing the UI and simulation from disagreeing.
- Keep creature-specific names, status wording, action/result phrasing, health and bite numbers in creature data; player action amounts/requirements in content data. No wolf branch in the engine.
- The requested 20-seed measurement uses seeds 1–20 and a finite 5000-minute horizon, stopping earlier on death or completion. The program prepends an unconditional strike/kick combat group to the unchanged 17-rule survival program of `tests/sim/acceptance.test.mjs` at base commit `7a633a7ab44868427c9c824948b99d4400a631ca`. The maker reports the full program, preparation and each seed's result, with no tuning or minimum pass rate. This is a measurement design choice, not a new gameplay requirement.

## Alternatives and costs

The spec records alternatives beside each decision. Shared condition/action pairs with an actor viewpoint were chosen over a second creature language or a complete player program copied onto creatures. A separate active encounter and bounded structured latest transcript were chosen over a timed player rule or UI replay. Independent eligible-minute attack draws were chosen over draws at activity boundaries or a shared randomness stream. Final-minute rounds precede completion and the next ordinary pick; delaying the next pick adds time the task did not authorize. One pending dodge was chosen over a protection bank. Discovery adds a creature category to Understanding rather than a wolf-specific flag or an inventory item. The discovery line retains its position, the combat line persists on frozen terminal screens, and map eligibility is shared between simulation and view. Costs and consequences of a wrong choice are given in spec sections 1–7, including stream schedule changes, actor-perspective mistakes, transcript state, and the additional minute branch.

## Source discrepancies

- The task's dependency-7 status and citations of earlier code are stale: D-129–D-136 and merged implementation already supply completion, pace and streak resets. The handoff instructs use of current code; this does not alter requirements.
- The illustrative Q7 statement "around 33 minutes" is approximate: current body data gives `(37 - 7) * 0.002 = 0.06` degrees lost per minute, 35.02 at minute 33 and 34.96 at minute 34. First cold-health loss from the starting body with no warmth is minute 34. This does not change accepted map numbers.

## Checks and limits

- `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way`: exit 0, both `3aee7d958835cc19b95519f4d21b37538b78e3e1`.
- Read commands: successful except exploratory reads of nonexistent `sim/repertoire.ts`, `view/discovery-line.ts` and `.the-way/glossary.md` (exit 1); resolved through `rg --files` and actual modules / `.the-way/foundations/glossary.md`, not treated as missing behavior.
- Product tests, foundation gate, mutation tests and browser checks: not run in designer stage; no product/foundation edits made.
- Final `git status --short` and `git diff --stat`: each exit 0, empty output; only ignored designer artifacts were written.
- A first exploratory `rg` call with literal PowerShell path `tests/sim/*.mjs` failed with invalid path syntax; the repeated directory search `rg -n 'reference|campfireLeftBelow|temperatureBelow' tests/sim -g '*.mjs'` exited 0 and found the existing acceptance program. No absence claim was based on the failed search.
- `Get-Content -Raw -Encoding UTF8 .runs/task-cycles/walka-w-glebi-lasu/spec.md` read the written spec back completely. A combined check ended with `rg -n 'TBD|TODO|placeholder|\\{\\.\\.\\.\\}' .../spec.md`, exit 1 meaning no matches; manual reading additionally checked empty sections and ambiguous requirements.

## Four final design checks

1. Placeholders and empty sections: none. Every prescribed section is populated; the only work left to the maker is implementation detail and execution of the named checks.
2. Contradictions: re-read against the frozen task, source choices and current foundation. Explicitly addressed the task's M+5 combat status versus the ordinary activity already selected in that minute, Q19's transcript retained after completion, the fact attacks must be considered during an ongoing activity, and the revised foundation meanings required for frozen needs and combat rule selection. No unreported contradiction remains. The terminal combat-death branch preserves the streak because combat wounds do not reset it.
3. Scope: one integrated change. Map opening, attack timing, combat program, discoveries and presentation all implement the single accepted deeper-map task. No separate generic encounter system, new test framework, asset work or balance tuning was introduced.
4. Ambiguous requirements: fixed actor-relative health in points, condition behavior with no opponent, immediate death before an answering action, grace boundary, nonstacking dodge, latest-transcript lifetime, ordering of both discovery sources in one minute, the M+5 normal pick and display priority, fixed layout entrance draw order, and a reproducible finite measurement. No unanswered design question remains.

No gate result, browser result, measurement result or mutation result is claimed by this report. Those steps remain unchecked in this designer stage, as instructed; the orchestrator runs its own baseline gate separately.
