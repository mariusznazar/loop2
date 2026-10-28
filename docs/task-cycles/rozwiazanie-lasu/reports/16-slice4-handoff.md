# Handoff — executor of slice 4, task `rozwiazanie-lasu`

## Delegation

The person who requested this cycle (the product's owner) has delegated every intermediate choice of
the cycle to its orchestrator. Send your questions to the orchestrator, never to the human; the
orchestrator's answers are not the human's approval.

## Where and how

- Worktree: `C:\Storage\repos\loop2-wt\rozwiazanie-lasu` — work from its root. Branch
  `task/rozwiazanie-lasu`. The-way is pinned at `3aee7d9` (moved by the branch's first commit
  `c0c51a0`).
- Method: `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant: **a slice, or the retry
  of a slice** — read `slice.md` beside it when that row sends you there.
- Stage: the executor of slice 4 of the plan `.runs/task-cycles/rozwiazanie-lasu/plan.md`.
  Boundary: this slice. Make no other slice, and do not run the product's full gate (`npm test`
  without a file) — the orchestrator runs it.
- Commit on the branch by explicit paths (`git add <file>…`, never `-A` or `.`), messages in English
  in the repo's form (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`), and
  leave the worktree clean.
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/16-slice4-report.md`
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md`; reviewed spec:
  `.runs/task-cycles/rozwiazanie-lasu/spec.md`; plan: `.runs/task-cycles/rozwiazanie-lasu/plan.md`.

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## Your slice — the plan's section, word for word

### Slice 4 — an edit that changes the program zeroes the streak

- **Goal:** `setProgram` compares the checked program with the program the state holds; where they
  differ — deep inequality of the groups in order with their identities, names and conditions, the
  rules of each in order with their identities, conditions and actions, and the identity counters
  — and the state holds a map run not ended in death, the run's streak becomes 0, paused or not.
  „↑” on the first rule and any edit that hands back the same program leave the streak; swapping
  two rules of the same content zeroes it; a map run ended in death keeps its streak; the rule the
  game writes at the first chill (D-123) does not go through `setProgram` and does not zero it.
  The trip plan does not exist yet, and the switch to another program is task 12's. A new
  invariant test `tests/invariants/test_streak_program_change.py`, marked
  `invariant: streak-program-change` as the other invariant tests are, drives the built simulation
  through its public functions like `test_action_in_progress.py`, and covers each kind of edit of
  row 6 that changes the program (add, delete, reorder a rule, change its condition or action,
  change a group) during a map run and in a pause, with a control that an identical edit leaves the
  streak, so the check can fail.
- **Change:** `src/browser/sim/game.ts` · `tests/invariants/test_streak_program_change.py` ·
  `foundations/part_map.md` (orchestrator's addition after the *Foundation entries* stage: the part
  `simulation`'s *Files* gains `tests/invariants/test_streak_program_change.py` in the same commit
  as the test, through the project skill `the-way-update-part-map`, since `foundation_check.py`
  refuses a pattern that matches no tracked file)
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:19-19` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:51-53` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:83-84` Context ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:91-91` Context ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:157-159` Decisions in play ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-169` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:175-175` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:188-188` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:233-243` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:355-369` Left to the maker ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:401-420` D-20 ·
  `foundations/invariants.md:187-196` action-in-progress · `foundations/decisions.md:1560-1577` D-90 ·
  `foundations/decisions.md:1619-1648` D-93 · `foundations/decisions.md:2118-2139` D-123 ·
  Foundation entries row 6 (an edit that changes the program zeroes the streak) · Foundation
  entries row streak-program-change · Foundation entries row of the part simulation ·
  `foundations/invariants.md:224-232` simulation-inputs · `foundations/decisions.md:1482-1493` D-84 ·
  `foundations/glossary.md:25-30` program · `foundations/glossary.md:53-63` program rule, rule group ·
  Foundation entries row streak · `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/testing.md` · `src/browser/sim/types.ts` · `src/browser/sim/run.ts:304-403` ·
  `tests/invariants/test_action_in_progress.py` · `tests/invariants/program_fixture.py` ·
  `tests/invariants/loop2_invariant_support.py:1-229`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from the failing `tests/invariants/test_streak_program_change.py`; then
  `npm test -- tests/invariants/test_streak_program_change.py` ·
  `npm test -- tests/sim/program-counts.test.mjs` · `npm test -- tests/sim/flow.test.mjs` ·
  `npm test -- tests/sim/streak.test.mjs` · `npm test -- tests/sim/purity.test.mjs` ·
  `npm test -- tests/invariants/test_action_in_progress.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 3 · Foundation entries row 6 · `streak-program-change` · part `simulation`

## Current ranges of the foundation entries your *Read* names

The plan's line ranges of `foundations/` are stale: the plan's *Foundation entries* were written in
commit `82bbb1c` (and later slices may have moved lines). The ranges below hold now; where they
differ from the plan's, these hold. "Foundation entries row N" of the plan maps to: row 1 D-21,
row 2 D-129, row 3 D-130, row 4 `player-map-run-pace`, row 5 D-71, row 6 D-131, row 7 D-132 and
D-62, row 8 `map run restart`, row 9 D-133, row 10 D-134, row 11 D-135, row 12 D-122, row 13
`minute-span-split`, row 14 D-93; and the rows `completion`, `solved map`, `streak`,
`manual map run` (glossary) and `streak-program-change` (invariant). Read each entry whole.

- D-04: `foundations/decisions.md:57-92`
- D-20: `foundations/decisions.md:401-420`
- D-90: `foundations/decisions.md:1576-1593`
- D-93: `foundations/decisions.md:1635-1669`
- D-123: `foundations/decisions.md:2151-2172`
- D-84: `foundations/decisions.md:1498-1509`
- action-in-progress: `foundations/invariants.md:187-196`
- simulation-inputs: `foundations/invariants.md:226-234`
- streak-program-change: `foundations/invariants.md:828-844`
- program: `foundations/glossary.md:25-30`
- program rule: `foundations/glossary.md:53-57`
- rule group: `foundations/glossary.md:59-63`
- streak: `foundations/glossary.md:150-155`
- D-131: `foundations/decisions.md:2342-2367`
- part simulation: `foundations/part_map.md:28-55`

The ranges of `task.md` and `spec.md` in your *Read* hold as written; those passages are copied
below. Code and test files in your *Read* are named by path; read them as they stand now.

**Orchestrator's note on `foundations/part_map.md`.** The plan's *Change* for this slice was
amended after the *Foundation entries* stage: that stage could not add
`tests/invariants/test_streak_program_change.py` to the *Files* of the part `simulation`, because
`python -B .the-way/elements/common/foundation_check.py` refuses a pattern that matches no file git
tracks. Add that line in the same commit as the test, through the project skill
`the-way-update-part-map` (its entry point `.claude/skills/the-way-update-part-map/SKILL.md`, which
points into `.the-way`), and run `foundation_check.py` after that commit (it must exit 0). The
invariant `streak-program-change` already stands in `foundations/invariants.md` with `Method: test`
and names this test file as its check.

## Passages of the task and the spec your *Read* names, word for word

#### `task.md:19-19`

> 4. Przejście liczy passę: po kroku ciała minuty gry, w której postać nie traci zdrowia z zimna ani z głodu, passa rośnie o jeden, a minuta z taką utratą ją zeruje. Passę zeruje na każdej mapie każda zmiana reguł programu albo grup reguł wykonywanych w przejściu, po której program różni się od programu sprzed niej — dodanie, usunięcie i przestawienie reguły, zmiana jej warunku albo akcji, zmiana grupy — także w trakcie pauzy; czynność edytora, po której program jest taki sam jak przed nią, na przykład „↑” przy pierwszej regule, zostawia passę. Zerowanie passy nie przerywa trwającej akcji postaci (D-20). Każde przejście — po wysłaniu i po „Restart” — zaczyna z passą zero.

#### `task.md:51-53`

> - 9. Która zmiana programu zeruje passę — także czynność edytora, po której program jest taki sam jak przed nią?
>   - Answer: Cytat, który człowiek zostawił: “every change of the program rules or rule groups the map run carries out sets it to zero, on every map, while a change of the trip plan alone leaves it.” Do tego droga A — passę zeruje każda zmiana, po której program różni się od programu sprzed niej: dodanie, usunięcie, przestawienie reguły, zmiana jej warunku albo akcji, zmiana grupy, także w trakcie pauzy; czynność, która niczego nie zmienia, passy nie zeruje. Słaby punkt nazwany w pytaniu: gracz, który kliknie „↑” na górze listy, nie straci passy, choć „dotknął” programu.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A); cytat: definicja (odcisk 7692b28a, sha256 8dad9717784d), wpis „(new) — How is a map solved, and what opens the next one?”, i niezmiennik projektowany `streak-program-change/1`, wtedy: “A change of the program rules or rule groups of the copy a map run carries out sets the streak of that map run to zero, on every map.” (obecne brzmienie, z przełączeniem — pod *Decisions in play*). W definicji zatwierdzonej ponownie 2026-10-28 (odcisk 7e33760d) zdanie wpisu brzmi “every change of the program rules or rule groups the map run carries out, and every switch of the character to another program, sets it to zero, on every map, while a change of the trip plan alone leaves it.” — przełączenie postaci na inny program, które zeruje passę także przy tych samych regułach, wnosi zadanie 12; ta odpowiedź mówi o edycji programu i się nie zmienia (wiersz 6 *Settlements to record*). Materiał: test loop `src/sim/policy.test.ts:105` (`cdc7c0d`) — w loop zeruje ją też samo przesunięcie, „to nadal interwencja gracza”.

#### `task.md:83-84`

> - Zadania 9 plomyk i 12 programy-gracza zależą według planu od tego zadania (plan, wiersze 9 Depends on „4, 6, 7, 8” i 12 „5, 7, 8, 11”; dziennik zmian 2026-10-25, 2026-10-26 i 2026-10-28): zadanie 12 kieruje edycję programu w trakcie przejścia do kopii, którą przejście wykonuje, i przenosi na nią zerowanie passy wniesione tutaj, a przełączenie postaci na inny program w trakcie ręcznego przejścia, które też wnosi, zeruje passę, także przy tych samych regułach; zadanie 9 dopisuje energię natury do kolejności minuty gry, którą to zadanie zmienia.
> - Od zadania 6 gra zatrzymuje czas w chwili odkrycia tą samą pauzą co „Pauza” (D-122) i przy pierwszym wychłodzeniu wpisuje do pierwszej grupy programu regułę „Zawsze → Eksploruj” (D-123; odpowiedzi człowieka na pytania 2 i 3 zadania 6, 2026-10-25); w minucie pierwszego wychłodzenia postać traci zdrowie z zimna (D-60), więc passa jest w niej zerem niezależnie od tego wpisu.

#### `task.md:91-91`

> - Testy loop (`src/sim/policy.test.ts`, commit `cdc7c0d`): zmiana warunku reguły zeruje passę (`:100`), a samo przesunięcie reguły też — „to nadal interwencja gracza” (`:105`); rozwiązane mapy stoją w stanie gry jako lista (`src/sim/tick.test.ts:41`).

#### `task.md:157-159`

> Zadanie urzeczywistnia część wpisu i zapisuje tę część (WAY-126); resztę dopisują zadania wskazane przy wpisie:
>
> - Niezmiennik `streak-program-change/1`: “A change of the program rules or rule groups of the copy a map run carries out, and every switch of the character to another program during the map run, sets the streak of that map run to zero, on every map.” (urzeczywistniają zadania 7 i 12, zapisuje zadanie 7; plan, Projected entries „streak-program-change/1 | 7, 12 | 7”, dziennik zmian 2026-10-28). Kod zadania czyni prawdziwą i zadanie zapisuje część o zmianie reguł programu albo grup reguł wykonywanych w przejściu, która zeruje passę tego przejścia na każdej mapie; dziś przejście wykonuje jedyny program gry, nie kopię, więc kod tego zadania zeruje passę przy zmianie tego programu, a kopię i zerowanie passy na niej wnosi zadanie 12, które zależy od tego zadania. Nie czyni prawdziwą części o przełączeniu postaci na inny program — tę część wraz z jej sprawdzeniem dopisuje zadanie 12, pierwsze, którego kod ją urzeczywistnia.

#### `task.md:166-169`

> Candidates: 14 shown, 14 accepted — 2026-10-28
>
> | # | Settlement | Kind | Source | What the cycle would otherwise guess |
> |---|---|---|---|---|

#### `task.md:175-175`

> | 6 | Spośród edycji programu passę zeruje edycja, po której program różni się od programu sprzed niej — dodanie, usunięcie i przestawienie reguły, zmiana jej warunku albo akcji, zmiana grupy — także w trakcie pauzy; czynność edytora, po której program jest taki sam jak przed nią, zostawia passę. | decision | pytanie 9, cytat i droga A (Mariusz, 2026-10-25); brzmienie „Spośród edycji programu passę zeruje edycja, …” przyjęte ponownie po pokazaniu obok dawnego „Passę zeruje zmiana, po której …” (Mariusz, 2026-10-28, „tak”) | czy „↑” przy pierwszej regule albo inna czynność bez skutku zeruje passę |

#### `task.md:188-188`

> - Wiersz 6 mówi o edycji programu: przełączenie postaci na inny program w trakcie ręcznego przejścia, które wnosi zadanie 12, zeruje passę także wtedy, gdy nowy program ma te same reguły (`streak-program-change/1` w definicji zatwierdzonej ponownie 2026-10-28). Słowa „Spośród edycji programu” i „edycja” w miejscu „zmiana” zawężają wiersz do tego, o co pytało pytanie 9 — odświeżenie dokumentu 2026-10-28 po uwadze krytyki planu; znaczenie przyjętego wiersza dla edycji się nie zmienia.

#### `spec.md:233-243`

> - **Zeroing on an edit.** `setProgram` compares the checked program with the program the state
>   holds; where they differ and the state holds a map run that has not ended, the run's streak
>   becomes 0, paused or not. "Differ" is deep inequality of the two programs as the game state holds
>   them — the groups in order with their identities, names and conditions, the rules of each in order
>   with their identities, conditions and actions, and the identity counters. So „↑” on the first rule
>   and any editor act that hands back the same program leave the streak; swapping two rules of the
>   same content zeroes it, since the rules are two rules, told apart by identity and by their counts
>   in the editor. A map run that has ended keeps the streak it ended with, since its screen stands on
>   the state of its last minute (D-62). The rule the game writes at the first chill (D-123) does not
>   go through `setProgram` and does not zero the streak; in that minute the character is chilled, so
>   the streak is 0 anyway.

#### `spec.md:355-369`

> - The tests, per `guidelines/testing.md`: the new cases and the changed ones of
>   `tests/invariants/test_player_map_run_pace.py` (a pace other than 1×; a change of pace between
>   passes, with the carry as decision 2 sets it; a discovery inside one real second at 16×; a
>   completion that stops the map run unpaused with the carry dropped) and of
>   `tests/invariants/test_minute_span_split.py` (a completion inside a span, reached by splits of
>   several minutes, as 16× gives on a 200 ms tick), each with its docstring reading the new wording;
>   simulation cases on explicit state — for example a map run whose streak stands at 479 — for the
>   streak's growth and reset, a streak of 0 in the game minute of death, the zeroing by a differing edit and not by an identical one, the rest
>   of the minute of completion taking effect, the solved map surviving a later death, „Restart”
>   after a completion keeping the seed, and the counts kept after a completion; view cases for the
>   status text with the streak and after a completion, the pause label and the pace buttons after an
>   end, and the headquarters' texts. Existing tests whose scenario reaches 480 minutes without a loss
>   — the ALIVE scenario of `test_minute_span_split.py` and `tests/sim/acceptance.test.mjs` may — now
>   end in a completion; a changed expectation there names the task as its cause, per *Changing an
>   existing test*.

## Report

Write your full report to the report path as the method gives it, with each check's command and
exit code, and return only your status, your commits, a one-line check result naming what failed
or did not run, and the report path.
