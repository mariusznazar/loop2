# Contract for every agent of this cycle (read before starting)

You work in a the-way task cycle (task `mag-w-lesie`) in the worktree `C:\Storage\repos\loop2-mag-w-lesie`, branch `task/mag-w-lesie`. The orchestrator dispatched you. The user delegated every intermediate choice to the orchestrator: never ask a human and never seek human approval — send questions back to the orchestrator in your final message (status NEEDS_CONTEXT or BLOCKED for an implementer).

## Binding sources (in this order of authority)
1. Frozen task (Polish): `.runs/task-cycles/mag-w-lesie/task.md` — the task binds where it and the spec differ.
2. Spec: `.runs/task-cycles/mag-w-lesie/spec.md` — binds where it settles more than the task.
3. The foundation on this branch: `foundations/decisions.md` (D-04/3 simulation of pure functions, view changes state only through simulation functions; D-08 content in data; D-09 terrain drawing is a picture, hover the only interaction; D-10 a running action is never interrupted; D-11 pace 1 game minute per real second with pause; D-12–D-16 randomness, acting by program, map make-up, movement, pointing at things), `foundations/invariants.md`, `foundations/glossary.md`.
4. The cycle record's answers: `.runs/task-cycles/mag-w-lesie/cycle.md`, section "Questions and autonomous choices".
Never read the whole plan; your brief is your requirements.

## Hard rules
- **Invariant checks are read-only.** Never edit `tests/invariants/test_map_run_repeatability.py`, `test_simulation_randomness.py`, `test_action_in_progress.py`, `test_player_map_run_pace.py` or any other file under `tests/invariants/`. If one fails because of your code, fix your code; if you believe the check is wrong, stop and report it.
- **Expected interim states (not your regressions):** until Slice 5 is done, the four checks above fail (no built simulation); until the part map is updated (after Slice 6), `foundations/part_map.md`'s guard and the invariants guard (Part `simulation`) report errors; the decisions guard reports `<request link>` placeholders until the request exists. Every other check must pass. The existing invariant test `test_loop2_api_error_route` can fail when another process holds port 3000; rerun that file alone before concluding.
- Simulation code (`src/browser/sim/**`) follows spec rules S1 and S2 (§ 3): imports only within `sim/`, no DOM/Node/timers/system time, randomness only through `random.ts`; no map/resource/archetype id or name as a literal outside `sim/data/`.
- Code identifiers and comments in English; text shown to the player in Polish, exactly as the spec quotes it.
- Behaviour changes go test-first: invoke the Superpowers skill `superpowers:test-driven-development` (6.4.1) with the Skill tool and follow it. Use no other skill. If a step seems to need another skill or tool, say so instead.
- Commit only your slice's files, by explicit paths (`git add <path> <path>`; never `git add -A`, `git add .`, `git commit -a`). English conventional commit messages (`feat(sim): …`, `test(view): …`). Never push, never amend another agent's commit, never touch other branches or worktrees.
- Write only the files your brief's *Change* names (plus your report file). Nothing outside the worktree, except reading what the brief allows.
- Prohibited reading (binding, from the user): git branches `10x/*`, tags `archive/10x-*`, the directory `C:\Storage\repos\loop2-10x`, notes in `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Przejście 10xDEVS`. Of `C:\Storage\repos\loop` you may read only `src/sim/data/*.ts` and `src/sim/*.test.ts`, and only when your brief names them.
- Commands from the worktree root: `npm run typecheck`, `npm test` (builds first; report the test count), `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`.
