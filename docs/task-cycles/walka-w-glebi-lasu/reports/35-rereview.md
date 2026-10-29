PASS ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88

# Independent re-review of the fix

Range: `99b2a271675fc32a8c136f563bad70c300444e1a..ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88`. Worktree: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`. Same independent reviewer as report 31; no part of this fix authored by the reviewer. Pinned method `3aee7d958835cc19b95519f4d21b37538b78e3e1` matches the gitlink.

**R1, R2 and R3 are fixed. No remaining or new Critical/Important finding. One new Minor finding; no out-of-scope findings.** The two changed suites pass independently, and the three concrete mutants behind R1/R2 are now killed. Product source, foundation, guidelines and mutation configuration have no change in this fix.

## Original findings

### R1 — Fixed

[combat.test.mjs:185](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/combat.test.mjs#L185) and [combat.test.mjs:223](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/combat.test.mjs#L223) independently exercise a false first group and a false first rule, with positive controls that select the earlier action when its threshold holds. The expected first action and its effect are literal consequences of the documented health/damage values: after the wolf's bite health is 93; threshold 50 is false and 94 true; opponent health 24 makes threshold 10 false and 25 true. The choices produce distinguishable kick/dodge effects, not only different internal rule IDs.

Independent Stryker re-review mutants **101** and **104**, which replace the group and rule rejection branches with `false`, are both **Killed** by `tests/sim/combat.test.mjs`. These correspond to original review mutants 199 and 203. Positive controls also kill the opposite branch faults. The author did not contest the finding; its original severity and scope are retained, and its defect is now fixed. The citation-format issue below is separate from this successful behavior protection.

### R2 — Fixed

[encounters.test.mjs:372](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/encounters.test.mjs#L372) obtains the wolf through the actual discovery operation and asserts the permanent list immediately. It resolves that encounter and derives the next attack from the resulting knowledge, asserting an attack without another discovery or pause. The same knowledge survives actual restart/end calls.

Only time at the next cooldown boundary and a real hit-producing generator state are prepared for the second attack; the knowledge under test is never restored by the fixture. This keeps the test focused on persistence rather than survival strategy. Independent Stryker mutant **105**, replacing the permanent creature merge with `[]`, is **Killed** by `tests/sim/encounters.test.mjs`; it corresponds to original review mutant 403. The author did not contest the finding; fixed.

### R3 — Fixed

The new comparison helper at [encounters.test.mjs:566](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/encounters.test.mjs#L566), five scenarios beginning at [encounters.test.mjs:582](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/encounters.test.mjs#L582), and replay at [encounters.test.mjs:704](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/encounters.test.mjs#L704) deliver the previously absent maintained tests.

The splitting cases cover discovery after crossing protected minute 180, known attack and M+5, combat death, completion before turns, and completion at M+5. They compare whole state and ordered cumulative events at each actual chunk boundary against single-minute records. They use both `advanceMinutes` and `passRealTime`, whole-second real inputs, and multiple chunk shapes. Independent controls require an actual attack, the expected terminal/discovery result and minute, and the independently calculated exchange counts. No clock, counter or state field is normalized away. Calls extending beyond terminal minutes are compared too. Stopping the discovery driver is correct because `advanceMinutes` deliberately advances while paused; the invariant stops at discovery rather than silently resuming it.

Replay starts from an actual public send with ordinary body/backpack and uses 250 identical real-time inputs. It asserts an attack, combat exchanges and combat death at attack minute + 5, then restarts the resulting game and compares the complete new initial state and subsequent trace. It neither patches the seed/stream nor compares two separately prepared encounters. Send/restart lifecycle events are outside the advancement traces; no advancement event is filtered. Keeping these cases in the existing JS suite is a valid smaller alternative to changing every Python file listed in the plan; both suites already participate in normal and Stryker selection.

The retained author red logs substantiate the controls: reversing only batch event order fails all five new split cases; retaining the old generator at restart fails only the new replay case, with an explicit `attackRandom` difference. These are author executions inspected by the reviewer, not claimed as independently repeated manual faults. Independently rerun green suites and the mutation run of minute advancement/restart support the assessment. The author did not contest R3; fixed.

## New Minor finding

### M1 — Use the recognized invariant citation form

- Scope: in scope, nonblocking; introduced in fix commit `ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88`.
- Anchors: [combat.test.mjs:182](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/combat.test.mjs#L182), also line 220; [encounters.test.mjs:560](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/encounters.test.mjs#L560), also line 700.
- Thread: new review note, not a remaining blocker.

**Do wklejenia:** Komentarze `Invariant program-rule-pick:` i `Invariants map-run-repeatability and restart-seed:` nie są rozpoznawane jako odwołania do niezmienników przez kontrolę fundamentu. Dodaj przy testach osobne linie `// invariant: program-rule-pick`, `// invariant: minute-span-split`, `// invariant: map-run-repeatability` i `// invariant: restart-seed`, zachowując obecne objaśnienia.

**Dlaczego to zgłaszam:** Same testy wykonują właściwe sprawdzenia i są wybrane przez runner, dlatego nie blokuje to poprawki. Format komentarza ma jednak również odbiorcę maszynowego: `CITATION` w [foundation_check.py:83](https://github.com/mariusznazar/the-way/blob/3aee7d958835cc19b95519f4d21b37538b78e3e1/elements/common/foundation_check.py#L83) rozpoznaje dokładną, pisaną małą literą formę `invariant: <identifier>`. Taki sam zapis jest podstawą odczytywania powiązania testu z fundamentem w metodzie pracy. Obecne cztery komentarze nazywają reguły dla człowieka, lecz omijają walidację tych odwołań; późniejsza literówka lub wycofanie identyfikatora nie zostanie tam zauważone. Poprawny wzór występuje np. przy sprawdzeniach w `tests/invariants/test_minute_span_split.py`. Wyszukanie dokładnej formy w obu zmienionych plikach dało brak trafień (exit 1), a kontrola pozytywna w tym Pythonowym teście znalazła dziewięć cytowań. Nie ma potrzeby zmieniać działania ani zakresu testów.

## Out-of-scope findings

None.

## Declined to judge

None. The re-review is bounded by R1–R3 and the fix diff; it does not reopen unaffected gameplay, UI, balance or source decisions.

## Independent checks and evidence

| Command/check | Exit / result |
|---|---|
| `git rev-parse HEAD` | 0; exact assigned `ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88`, rechecked at completion. |
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 each; matching `3aee7d958835cc19b95519f4d21b37538b78e3e1`. |
| `git diff 99b2a271675fc32a8c136f563bad70c300444e1a..ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88 -- tests/sim/combat.test.mjs tests/sim/encounters.test.mjs`; `git log --oneline` of that exact range | 0; one commit, combat +65, encounters +201/-2. Existing assertions are preserved; the two removed lines belong to extraction of unchanged public-send setup. |
| `npm test -- tests/sim/combat.test.mjs` | 0; **11 passed**. Retained [35-combat.log](../reports/35-combat.log). |
| `npm test -- tests/sim/encounters.test.mjs` | 0; **27 passed**. Retained [35-encounters.log](../reports/35-encounters.log). |
| Stryker command below | 0; **103 mutants: 95 Killed, 1 Timeout, 7 Survived, 0 NoCoverage, 0 errors**. Configured 24 simulation test files passed its initial run. |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/sim/combat.test.mjs tests/sim/encounters.test.mjs` | 0; both match formatting. The flags match the repository's actual quality invariant, not a bypass of required configuration. |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location .runs/task-cycles/walka-w-glebi-lasu/reports/33-eslint-suppressions.json tests/sim/combat.test.mjs tests/sim/encounters.test.mjs` | 0. Inspected the suppression file: exactly `{}`, no suppressed rules; matches the quality invariant's empty-suppression approach. |
| `git diff --exit-code 99b2a271675fc32a8c136f563bad70c300444e1a..HEAD -- src guidelines foundations stryker.config.json` | 0, no diff; no behavior/foundation/configuration change. |
| `git diff --check 99b2a271675fc32a8c136f563bad70c300444e1a..HEAD` | 0. |
| `rg -n '^\s*// invariant:' tests/sim/combat.test.mjs tests/sim/encounters.test.mjs` | 1, no recognized citations; the positive-control search of Python invariant comments exited 0. Evidence for M1, not a failed product test. |
| `git status --porcelain=v1` | 0, empty; reviewer changed no tracked file. |

```powershell
node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate 'src/browser/sim/program.ts:270-272,src/browser/sim/understanding.ts:297-297,src/browser/sim/game.ts:502-516,src/browser/sim/game.ts:602-700'
```

Retained mutation evidence: [35-mutation.log](../reports/35-mutation.log) and [35-mutation.json](../reports/35-mutation.json). The review intentionally targets the prior real survivors and the state/time paths the new tests protect; the whole-change mutation campaign is retained in report 31. No mutation-score threshold is used.

### All surviving mutants classified

IDs refer to the new `35-mutation.json`, not the earlier campaign.

| ID / location | Classification |
|---|---|
| 1 — game:503 | Not worthwhile to freeze: empties the operation name used only in `requireRun`'s invalid-input diagnostic. It does not change rejection or any legal restart. |
| 21 — game:609 | Not worthwhile to freeze: empties the invalid minute argument error message; the same invalid inputs still throw `RangeError`. These tests do not promise exact diagnostic wording. |
| 12 — game:604 | Equivalent: removing the separate `typeof minutes` rejection leaves `Number.isInteger(minutes)`, which is false for every non-number input. |
| 28 — game:612 | Equivalent for the state/event contract: without the special zero-minute early return, the loop executes zero times and returns the same values and no events. No identity guarantee is required. |
| 33 — game:620 | Equivalent: the initial `completed` value is overwritten by the actual run's completion after the first iteration on every positive valid span; zero/ended calls have already returned. |
| 48 — game:646 | Equivalent on current legal final-phase events, same as original mutant 132: `every` instead of `some` only adds harmless rediscovery computation for empty final events; actual attack still triggers the merge. |
| 50 — game:646 | Equivalent on current data, same as original mutant 134: discovery recomputation after other final-phase events finds no new revelation cause. |

Mutant **37** changes the loop's increment to `minute -= 1`. It is **Timeout**, specifically Stryker's hit-limit stop (`921302/921300`); it is detected as pathological looping, not a survivor, assertion pass or product test timeout. No NoCoverage mutant remains in this targeted run. Mutants 101/104/105 explicitly kill all three earlier real survivors; no new real coverage gap was found in this run.

## Own-work check, reading, reaches and limits

The weakest claim was that the new replay/splitting tests might compare prepared or normalized state and therefore appear to protect the same generator/body/events they reset. I read the complete fix diff with its helper callers and checked this directly: only the explicit boundary fixtures are prepared before a split; all compared output fields remain intact; replay uses a real initial send and actual restart; knowledge persists through one connected lifecycle. Literal controls prevent two noncombat traces from passing merely because they agree. The author's targeted red logs were read and the relevant surviving faults were rerun independently through Stryker. This is sufficient for R1–R3 without rewriting tests during review.

Read the fix dispatch and its read-scope clarification, all original blocking findings, fix report, pinned review/fix method, and the complete new diff. The task/spec/plan, selected foundation and relevant guideline files were already read in the same review session and are unchanged; their requirement meanings remain those used for report 31. Changed invariant protection is in the two JS suites: `program-rule-pick`, `minute-span-split`, `map-run-repeatability`, `restart-seed`; M1 concerns their citation form only.

Selective reaches beyond the fix handoff were the quality invariant's exact formatter/linter invocation, `foundation_check.py`'s citation recognizer, the invariant template's citation rule, and the existing Python citation examples. They resolve the command-flag question and the new comment-form note. No new product area or source requirement was introduced.

Full `npm test`, standalone foundation check, Docker checks, browser session and seed measurement were **not rerun**. The dispatch reserves the full gate for the orchestrator, and this fix changes only two maintained test suites. Earlier browser focus/invocation/target evidence limitations, 0/20 measurement outcome, and the earlier Windows serving-process setup failure remain as recorded in report 31; this PASS does not convert any unchecked item into a pass. The reviewer made no product edit, commit, implementation fix, PR or merge.
