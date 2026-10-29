# Fix of whole-review findings R1–R3

Status: **done**. All three blocking findings are addressed with maintained regression tests. No gameplay defect was exposed and no product behavior changed. This is the one authorized fix; the independent re-review and full gate remain with the cycle.

Worktree: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`.
Branch: `task/walka-w-glebi-lasu`.
Base/reviewed HEAD: `99b2a271675fc32a8c136f563bad70c300444e1a`.
Head/commit: `ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88` — `test: :test_tube: protect combat conditions and replay`.
Task base: `7a633a7ab44868427c9c824948b99d4400a631ca`.
Process pin: `3aee7d958835cc19b95519f4d21b37538b78e3e1`; gitlink and submodule HEAD matched.

| Changed path | Added | Removed |
|---|---:|---:|
| `tests/sim/combat.test.mjs` | 65 | 0 |
| `tests/sim/encounters.test.mjs` | 201 | 2 |

No existing assertion was removed or weakened. The two removed lines are the extraction of the existing public-send setup into `sent`, also used by `prepared`. All tracked source files used for temporary faults were restored byte-for-byte by `finally` before final checks. The committed source directory has no diff from the fix base, and the working tree is clean.

## Findings addressed

### R1 — False group and rule conditions

Two new cases carry the `program-rule-pick` annotation. The group case compares health 93 after the opening bite against thresholds 50 and 94: the false first group yields to a later kick, while the true first group selects its dodge. The rule case independently compares the wolf's 24 health against thresholds 10 and 25 within one group, again distinguishing a later kick from the earlier dodge. Assertions inspect both the action and its effect on wolf health, rather than only an implementation index. The expected numbers follow D-23 and D-144, with source locations in comments.

The exact two reviewer faults were tried separately: replacing the group-condition rejection with `if (false) continue`, then replacing the rule-condition rejection likewise. Each run failed only its new matching test, with `dodge` instead of `kick`. Both sources were restored; the final suite passes 11/11.

### R2 — Permanent creature knowledge

The new lifecycle starts with unknown wolf knowledge, obtains the first attack through `advanceMinutes`, and asserts `understanding.creatures` contains wolf. It resumes and resolves that encounter, then derives a second attack from the resulting state. Only the next eligible minute and an actual hit-producing random state are explicitly prepared; permanent knowledge is never replaced or restored by the fixture. The second attack must emit `attacked`, emit no `discovered`, leave time running and retain the wolf. The same resulting knowledge then survives actual `restart` and `end` calls.

Replacing the permanent creature merge with `[]`, exactly as review mutant 403 did, fails the new lifecycle at the permanent-knowledge assertion. It also fails the first-discovery split control. Restored implementation passes.

### R3 — Splitting and replay through combat

Five named variants carry `minute-span-split` coverage in the existing encounter suite: first wolf discovery, known attack through M+5, combat death, completion before turns, and completion after turns at M+5. Each creates a real attack rather than an already resolved combat result. The discovery variant begins at minute 179, so it crosses the protected minute 180 before the attack and discovery at 181. Independent controls require the actual attack, expected stopping minute/outcome, discovery/terminal event, and the hand-calculated exchange count (8 kicks, 15 unanswered bites, or no turns).

Each variant records single-minute reference states and cumulative events. Calls in chunks `[10]`, `[2,3,5]` and `[1,4,1,4]`, through both `advanceMinutes` and `passRealTime`, compare the **whole** state and ordered event prefix at every chunk boundary to the reference at the same game minute, as well as the final result. The chunks include the M+5 boundary and calls extending past terminal minutes. `advanceMinutes` advances even when paused by API contract, so its driver stops at a discovered event; it does not silently resume past the invariant's discovery boundary.

No state field is normalized or omitted. Real-time chunks are whole seconds, so `realMsCarry` is compared directly. No counters, clock fields or generator states are adjusted to make equality pass.

The separate `map-run-repeatability`/`restart-seed` case uses an actual public send from minute zero, normal body and empty backpack, on the existing send input `realMs=1000`. It advances 250 identical 1000-ms inputs, requires an attack and combat exchanges ending in combat death at M+5, restarts the resulting game, compares the entire new initial state with the original, then replays those same 250 inputs and compares every state and ordered event prefix. It does not patch the seed or attack stream. Lifecycle start events are outside these time-advancement traces: `restart` intentionally emits an extra `mapRunEnded`; no advancement event is filtered or normalized.

The batch-order fault reverses returned events only for `advanceMinutes` spans above one minute. All five new split cases fail their ordered-event comparisons. A separate restart fault keeps the previous run's `attackRandom` instead of resetting it from the seed. Only the new replay case fails (at its initial-state comparison); the older restart test still passes, demonstrating the additional protection. Both faults were restored.

## Checks and evidence

All test commands use the repository's focused `npm test -- <one file>` route. Every Node run builds the real application first. Logs below are in this report's directory.

| Exact command / configuration | Exit | Result / retained evidence |
|---|---:|---|
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 each | Matching process pin. |
| `npm test -- tests/sim/combat.test.mjs`, initial new tests on unchanged implementation | 0 | 11/11. |
| `npm test -- tests/sim/encounters.test.mjs`, initial new tests on unchanged implementation | 0 | 27/27. |
| `npm test -- tests/sim/combat.test.mjs`, group rejection temporarily bypassed | 1 | 10 pass, new group test fails; `33-r1-group-red.log`. |
| `npm test -- tests/sim/combat.test.mjs`, rule rejection temporarily bypassed | 1 | 10 pass, new rule test fails; `33-r1-rule-red.log`. |
| `npm test -- tests/sim/encounters.test.mjs`, permanent creature merge temporarily empty | 1 | 25 pass, lifecycle and discovery split fail; `33-r2-red.log`. |
| `npm test -- tests/sim/encounters.test.mjs`, returned batch events temporarily reversed | 1 | 19 pass, 8 fail including all five new split cases; `33-r3-split-red.log`. |
| `npm test -- tests/sim/encounters.test.mjs`, restart temporarily retains old attack generator | 1 | 26 pass, new replay fails; `33-r3-restart-red.log`. |
| `npm test -- tests/sim/combat.test.mjs`, restored implementation | 0 | 11/11; `33-combat-green.log`. |
| `npm test -- tests/sim/encounters.test.mjs`, restored implementation | 0 | 27/27; `33-encounters-green.log`. Includes discovery scenario starting at minute 179. |
| `node node_modules/prettier/bin/prettier.cjs --write --no-config --no-editorconfig --ignore-path .gitignore tests/sim/combat.test.mjs tests/sim/encounters.test.mjs` | 0 | Formatted the two changed suites. |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location .runs/task-cycles/walka-w-glebi-lasu/reports/33-eslint-suppressions.json tests/sim/combat.test.mjs tests/sim/encounters.test.mjs`, before empty file creation | 1 | Tool setup failure: specified suppression file did not exist; no lint success claimed. First bundled attempt also reported this and was repeated separately to retain its exit. |
| Same ESLint command, with explicit empty `{}` suppression file | 0 | No lint findings. No rule suppression was added. |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/sim/combat.test.mjs tests/sim/encounters.test.mjs` | 0 | Passed before commit, including final source-location comments. |
| `git diff --check`; `git diff --cached --check`; `git show --format= --check HEAD` | 0 each | No whitespace errors. |
| `git diff --exit-code -- src/browser/sim/program.ts src/browser/sim/understanding.ts src/browser/sim/game.ts` | 0 | Temporary faults fully restored. |
| `git diff --exit-code 99b2a271675fc32a8c136f563bad70c300444e1a..HEAD -- src/browser/sim` | 0 | Commit makes no gameplay source change. |
| `git status --short` after commit | 0 | Empty. |

An exploratory `node --input-type=module -e ...` command failed before executing because Windows argument handling removed string quotes (exit 1). The same explicit-input exploration passed via a here-string on Node stdin (exit 0). It established that the existing `realMs=1000` fixture reaches an attack and combat death without preparations; the maintained test does not freeze its observed attack minute as a balance requirement. It asserts the repeatability relation and M+5 relationship instead. No product test bypassed `npm test`.

Not run: full `npm test`, standalone foundation gate, Stryker campaign, browser checks and unchanged Python invariant suites. The first two belong to the orchestrator, Stryker assessment to the independent reviewer, and this fix changes only existing JS tests. The final source-location comments were added after the green runs; they alter no test or implementation behavior. No result is claimed for the unrelated Windows serving-process check or skipped Docker checks, and neither was repaired.

## Own-work check, reading and choices

The weakest point was a replay test that only compared a prepared attack boundary, inadvertently resetting the very generator it meant to test. The check uses the ordinary public send and actual restart, with no fixture patch to either run, and compares minute-zero plus all 250 advancement results. The retained-old-generator fault fails only the new case; restored code passes the full trace. This supplies evidence beyond seed equality or the old comparison of two restarts.

The orchestrator clarified the read scope during this fix: all selected foundation decisions and invariants remain required because both tests belong to simulation, but unrelated Python support/fixtures and unrelated plan implementation files need not be read whole. Initial oversized reads truncated some output; unread decision entries were then extracted whole into bounded ignored `33-read-1.txt` through `33-read-6.txt` and all six read. Previously read whole entries were excluded. Selected invariant entries, the simulation part entry, relevant glossary meanings, whole frozen task, relevant spec sections, findings/review, coding/testing/simulation guidelines, changed suites and actual source dependencies were read. No unresolved meaning remains.

Reaches beyond the initial selection: `src/browser/sim/random.ts` and `src/browser/sim/data/balance.ts`, to inspect actual seeded streams, real-time conversion and ordinary health behavior before choosing the replay setup; relevant glossary entries, to distinguish whole-game restart from an artificial attack fixture. No extra product file was changed. The baseline acceptance program and ignored measurement source were inspected while considering a longer survival setup, but that alternative was not needed and no measurement was rerun.

- Chose the two existing selected JS suites rather than adding a new file or extending Python drivers. They exercise the real mechanisms in memory and are already in the normal and Stryker test selection; the cost is more cases in the encounter suite. No second simulation engine or oracle was introduced.
- Chose literal false/true threshold cases with distinguishable action effects rather than rule-index-only checks. This protects the program meaning while tolerating internal selection refactors; if a future task changes the numeric combat rules, the documented arithmetic must be updated with that requirement.
- Chose actual discovered knowledge for the next-attack lifecycle, with an explicit fast-forward of only the cooldown boundary and hit draw. A full survival journey would add strategy and balance dependencies to this narrow persistence check; the cost is that this case does not prove 180 minutes of survival, which is not its purpose.
- Chose exact relational whole-state comparisons for splitting/replay, as the invariants require, rather than frozen full-state literals. Whole-second real inputs avoid excluding `realMsCarry`; fractional-real-time coverage remains in the existing time/split suites. No value was rewritten to force equality.
- Chose to preserve existing gameplay and all prior assertions because the required new distinctions already pass. Changing source behavior would introduce an unsupported change instead of closing the three evidence gaps.

Changed invariant protection: `program-rule-pick`, `minute-span-split`, `map-run-repeatability`, `restart-seed`, now explicitly annotated in these maintained JS tests. No foundation text changed. No subagent, new stage, merge, push or PR was started by this executor.
