# Report — the return step, task `rozwiazanie-lasu`

**Status:** done with concerns

## Commits and files

- `de899fa` docs: :memo: record the part of the map-solving decision the forest-solving task makes
  true (on `5cb8d0b`)
- `foundations/decisions.md` +27 −2 · `foundations/invariants.md` +1 −1

## What I compared with the code (`82bbb1c..5cb8d0b`)

Entries the change wrote or changed, each read against the code:

| Entry | Code read | Matches |
|---|---|---|
| D-21, D-129, D-130 | `BALANCE.paces` [1,2,4,8,16]; `setPace` sets the pace alone, the pause untouched; `newGame` `pace: 1`; `startRun`/`end` spread the state and leave `pace`; pace buttons built with `createButton` + `setButtonSelected` (`aria-pressed`, class `selected`) beside the pause button | yes |
| `player-map-run-pace` | `passRealTime`: carry + realMs × pace; carry dropped at death, completion or discovery; `paused: !completed` on a discovery minute that completes | yes |
| D-71, `minute-span-split` | `minuteBeforePick`: streak after the body step, also in the death branch; `advanceMinutes`: discovery, then completion check in place of `pickActivity`, `break` | yes |
| D-131, `streak-program-change` | `setProgram`: streak 0 when `sameData(state.program, checked)` is false and the run has not ended, paused or not | yes |
| D-132, D-62 | `statusText` completion branch from `completionText`; class `positive`; pause and pace buttons hidden when `mapRunEnded` | yes |
| D-133 | status row „… · Passa {streak}/{solving.streak}” with „ (pauza)” last; headquarters `solvingSentence` from data in each character row | yes |
| D-134 | `solvedMaps` added at the completion minute, kept by `end`/`restart`/`send`; `map-label solved` in `--positive` | yes |
| D-135 | no longest streak held or shown | yes |
| D-122 | `discovery` kept and `paused: false` at a completion; cleared by `restart`/`end` | yes |
| D-93 | nothing clears `ruleCounts` at a completion; no pick in that minute | yes |
| glossary `map run restart`, `completion`, `solved map`, `streak`, `manual map run` | `restart` accepts a run ended in death or completion; `MapRun.streak`, `completion`; `GameState.solvedMaps` | yes |

Entries the task names under *Decisions in play* (D-04, D-18, D-20, D-22, D-24, D-39, D-44, D-53,
D-55, D-60, D-61, D-73, D-75, D-80, D-82, D-84, D-88, D-90, D-118, D-123, `map-run-repeatability`,
`restart-seed`, `action-in-progress`, `simulation-isolation`, `simulation-inputs`,
`content-identifiers`, glossary `map run`, `game minute`, `program`, `rule group`): no mismatch. The
first chill's rule written by the game (D-123) does not zero the streak in code, but that minute
loses health (D-60), so the streak is already 0 and `streak-program-change` holds.

Part map, touched parts `simulation`, `browser-view`, `build-tools`: the new tests and
`stryker.config.json` are claimed; `test_streak_program_change.py` stands in `simulation` (`9dd8306`).
No change needed.

The invariant tests cite the current wordings in their docstrings
(`tests/invariants/test_player_map_run_pace.py:1-7`, `test_minute_span_split.py:1-4`,
`test_streak_program_change.py:1-2`), which settles concern 6 of report 12.

Environment facts: the change rests on no source outside the product. None written.
Glossary: no word used against its entry, and no new word in a meaning other than the usual one.

## What no longer matched, and its correction

**A projected entry the code makes true that the foundation step missed.** The plan
(`plan.md:32-34`), the foundation step and the whole review read the task's "zapisuje zadanie 8" and
"zapisuje zadanie 18" as meaning this task writes none of these two projected decisions. Pinned
WAY-126 (`.the-way/foundations/decisions.md:2876`) says the first task whose code makes a projected
entry true writes the part its code makes true, and the task the plan assigns writes the rest. The
task says the same (`task.md:157`: „Zadanie urzeczywistnia część wpisu i zapisuje tę część
(WAY-126); resztę dopisują zadania wskazane przy wpisie”) and names the parts (`task.md:160-161`).
Task 7 is the first task that makes them true. `return_step.md` gives this step that correction:

1. **D-136 — How is a map solved?** (new): the part of "(new) — How is a map solved, and what
   opens the next one?" that `task.md:160` names — the condition stands in the map's data as a
   streak; the streak counts minutes with no loss of health to cold or hunger; such a minute zeroes
   it; a change of the program rules or rule groups zeroes it on every map. Left for task 8:
   attacks beaten, the map that opens a map, wounds in combat; for task 12: the switch to another
   program; for task 13: the trip plan. Wording taken from the approved entry, *Rationale* and
   *Rejected* without the parts not made true; *Verification* names `streak-program-change`, as
   the approved entry does.
2. **D-131** *Relations*: `none` → `derives from D-136`. Binding sentences unchanged.
3. **`streak-program-change`** *Derives from*: `D-131` → `D-131 · D-136` (the projected invariant
   derived from the projected decision). Sentence, method and test unchanged.
4. **"(new) — How fast does the earning loop go?"**, the part "a manual map run may be
   fast-forwarded": D-21 already states it ("A map run the player starts passes at one game minute
   per real second times the pace the player picks of 1×, … 16×"). The part is tied to D-21 by its
   *Origin*, not written a second time. The request names both under *What this request settles*.

## Entries written or changed, with their meaning in Polish

| Entry | Change | Meaning (pl) |
|---|---|---|
| D-136 | new decision, a part of a projected one | Warunek rozwiązania mapy stoi w jej danych jako passa, którą przejście ma osiągnąć; passa liczy kolejne minuty gry, w których postać nie traci zdrowia z zimna ani z głodu: minuta z taką utratą ją zeruje, a każda zmiana reguł programu albo grup reguł wykonywanych w przejściu zeruje ją na każdej mapie. |
| D-131 | *Relations* only | D-131 wywodzi się odtąd z D-136; znaczenie decyzji się nie zmienia. |
| `streak-program-change` | *Derives from* only | Niezmiennik wywodzi się odtąd z D-131 i D-136; jego zdanie i test się nie zmieniają. |
| D-21 | *Origin* only | Część wpisu projektowanego „How fast does the earning loop go?” — ręczne przejście wolno przewijać — niesie już D-21, więc wpis wiąże się z D-21, a resztę wpisu zapisze zadanie 18. |

The rows of *Settlements to record* (1–14), the projected terms `completion`, `solved map`,
`streak`, `manual map run` and the projected `streak-program-change` were all written by `82bbb1c`;
none missing.

## Checks

| Command | Exit | What it showed |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` before the commit | 0 | `0 errors` |
| same, after commit `de899fa` | 0 | `0 errors` |
| `git diff -U0 foundations \| grep '^+' \| grep -i -w -E 'only\|never\|always\|without\|alone'` (rule of wording, task question 10) | 1 | no hit |

No test was run: no correction changes an invariant's sentence or any code, so no test is touched.
The full gate was not run, as the handoff says.

## Own-work check

Requirement most likely missed: that D-136 says no more than the code makes true. Check: each
binding clause against the code — the condition in data (`maps.ts` `solving: { streak: 480 }`,
`meetsSolving`), minutes with no loss of health (`bodyMinute` `lostHealth`, `streakAfter`), zero
on a change of the program (`setProgram`). Nothing about attacks, opening maps, combat, switching
programs or the trip plan entered the entry.

## Choices made

- **Heading "How is a map solved?"**, not the projected "…, and what opens the next one?": the
  binding sentences answer one question. Cost if wrong: task 8 widens the heading when it adds the
  opener; a search for "How is a map solved" finds the entry either way.
- **D-21 tied by *Origin*, no separate partial decision.** Rejected: a decision headed "How fast
  does the earning loop go?" holding only the sentence on manual runs — it would answer a question
  about earning loops with a sentence about manual runs, and state D-21's rule twice. Cost if wrong:
  one new short entry. Note for task 18: D-21 speaks of "a map run the player starts"; once earning
  loops exist, task 18 has to decide how D-21 relates to them.
- **D-136 *Scope* `simulation`**, *Relations* `none` as approved; D-71 left without a relation to
  D-136.

## Reaches beyond the handoff

- `definicja_mvp_loop2.md` in the vault, lines 1298–1400 — the two projected decisions whole, to
  write the part as the readiness gate approved it.
- `.the-way/foundations/decisions.md` WAY-126 and `.the-way/project-level/plan/template.md:118-130`,
  `.the-way/project-level/task/template.md:120-130` — who writes a part of a projected entry.
- `plan.md:28-34`, `reports/10-planner-report.md:36-45` — why the plan left the two entries out.
- D-24 and D-18 whole — whether the solving condition needs a sentence in D-24; it does not, since
  D-136 carries it and D-24 lists no closed set of map data.

## Concerns

1. **This correction goes against the plan** (`plan.md:32-34`) and what the planner, the
   foundation step and the whole review accepted. Its grounds are pinned WAY-126 and `task.md:157`.
   The orchestrator should carry D-136 and the D-21 tie under *What this request settles* and
   *Projected entries written whole or in part*, with the Polish sentences above.
2. Review findings M-1 to M-4 stay open as the handoff gives; this step required none of them.
