# Handoff — the reviewer of Slice 4 of the task rana-i-opatrunek

You review one slice of a planned change in a task cycle of the-way, with `review-change`, as an agent of the type `the-way-stage` that did not make it. You are read-only on the reviewed worktree.

## What you review and how

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; the slice is not the whole change, so `whole_change.md` and `fix.md` are not yours.
- Range: base `0b18ce2a85538217f3723a0428e7d631bc09d217` (the end of Slice 3) to head `16e9e93e` (full sha: run `git rev-parse HEAD`; it must show the head `16e9e93e…` — on a mismatch ask as a question). Compute the diff yourself: `git diff 0b18ce2a..16e9e93e` and `git log 0b18ce2a..16e9e93e`. Two commits: `72840676` (the test written first) and `16e9e93e` (the code).
- Worktree: `the worktree's root` (branch `task/rana-i-opatrunek`). Never change it, its index or its branch. Run checks that need changed files in a worktree of the head commit in `.runs/review-4/` (relative to the worktree; `.the-way` populated by `git submodule update --init -- .the-way`, `node_modules` a junction to the main checkout's `the `node_modules` of the main checkout`), and remove it before you return.
- Report: `.runs/task-cycles/rana-i-opatrunek/reports/review-4-report.md`, first line `PASS <head sha>` or `FAIL <head sha>` and nothing else (the report file is the input of the cycle's scripts; its name begins with the role). The executor's report, to verify as claims and not as evidence: `.runs/task-cycles/rana-i-opatrunek/reports/executor-4-report.md`. The cycle record `cycle.md` and the other files of the record directory are not yours.
- **Risk of this slice: trust boundary — `src/browser/sim/saved-game.ts`** (the part map names it a trust boundary of the part `simulation`). Check crafted input at it: a combat record of a saved game holding a turn of Ucisk with damage other than 0, with a refill mark where none is allowed, with an item that heals nothing, Ucisk as an ordinary activity of a map run, Ucisk in a map run of a character who lacks the branch; the reader must refuse such a document whole or read it as the game itself would produce it. `SAVED_GAME_VERSION` stays 11 in this slice and rises in Slice 6 (not yours to judge as a miss).
- The frozen task: `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (sha256 `55c86eaf63df7156`); you open only the passages copied below. You judge the slice against those passages, not the plan alone.
- The two answers of step 4: trust boundary yes, no irreversible operation.

## What the orchestrator tells you (so you do not count it against the slice)

- The plan's Goal for this slice announces that it leaves failing `tests/sim/data.test.mjs` and `tests/sim/craft-and-tend.test.mjs` (Slice 5), `tests/view/program-editor.test.mjs` (Slice 9), `tests/view/rule-editor.test.mjs`, `tests/view/icons.test.mjs` and `tests/view/gear-editor.test.mjs` (Slice 10).
- Known and given an owner already, not a finding of this slice: `tests/sim/action-targets.test.mjs` (3 tests) and `tests/sim/team.test.mjs` (1 test) fail since Slice 2 added the tree to the data (the executor measured them on its base, which already held Slices 1–3); eleven `decision:` quotation lines in `tests/sim/body.test.mjs`, `tests/sim/craft-and-tend.test.mjs` and `tests/sim/tending.test.mjs` that `foundation_check.py` lists. The orchestrator gives all of them to Slice 5 by an edit of the plan. If you find that a test of those files fails for a reason that is the code's fault and not the test's stale expectation, that is a finding.
- Mismatches of the mechanical check, passed to you: the executor also changed `tests/invariants/test_program_closed_lists.py` (an invariant's test, in the slice's *Checks* but not in its *Change*), `tests/sim/gear-wear.test.mjs` and `tests/sim/tending.test.mjs`; judge them (a changed invariant test is named in your report).
- The foundation decisions D-144, D-150, D-145, D-380, D-363, D-290, D-379 and D-120 were changed by the foundation step before Slice 1; the slice's code must agree with them as they stand.
- Accepted limitation (Slice 1): `actionInRepertoire` does not judge an item action by its pair; not a finding of this slice.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice's section of the plan (word for word) — what the executor was given

### Slice 4 — Ucisk, an action of combat, in the simulation

- **Goal:** The action `pressure`, „Ucisk”, exists and acts. In `src/browser/sim/data/actions.ts` it
  stands after `dodge` and before `equip`, in the group `foodAndCombat` (D-290, Settlements row 9),
  with the icon `bandage-roll` and its title as „Opatrz” has them (row 10), `minutes: null`, item
  targets from the property `healing` (D-443), revealed with the tree `tending`
  (`treeDiscovered`, as `patrol` is with its tree, D-195), the `status` words that question 2 of
  the planner's report settles (the orchestrator gives them in the handoff), and a combat effect of
  a new form that says it heals by its target and takes its piece from the place `pocket`. `src/browser/sim/types.ts`
  gains the action `{ kind: "pressure"; item: ItemId }` among `Action` and `pressure` among
  `CombatVerbKind`. `BRANCHES` gains `pressure`, „Ucisk”, of `tending`, effect `action` on
  `pressure`, cost 3, no preview, description „Opatrzenie w trakcie starcia, za turę zamiast za
  dziesięć minut.”; the pair of `pressure` with no item, which covers „Ucisk — Opatrunek” and every
  other target with healing (Choices), joins the pairs of `tending` (row 5, D-150). `src/browser/sim/programs.ts` takes it on the closed list with an item among its targets.
  In `src/browser/sim/program.ts`: its price is one piece of its target (D-363); outside combat it
  is refused „tylko w walce” (D-309); in a combat turn it is refused „zdrowie pełne” at the health
  of that turn — the health the combat judge is given, not the body's health at the attack — and
  then „brakuje 1 × {rzecz}” where no pocket holds its item and the backpack holds none (D-380); the
  piece rule of an action of combat that uses an item reads the place the action's data name: the
  main hand for „Uderz — patyk” as today (D-456), for Ucisk the first pocket holding the item, or,
  where none does, a piece taken from the backpack into the first empty pocket in the same turn
  (D-457). In `resolveCombat` of `src/browser/sim/combat.ts`, Ucisk uses up that piece, gives back
  the health of Slice 3's function, never above full health (D-144, rows 1 to 3), records the turn
  with its refill mark, no damage and the health after it, and adds one practice to `tending`
  (D-193). Without the bought branch the action is passed over (D-126, D-120) and the rule reads
  „gałąź niewykupiona” (D-289). `src/browser/sim/saved-game.ts` reads a turn of Ucisk in a combat
  record — among `COMBAT_VERBS`, its refill mark allowed, its damage 0 — and refuses Ucisk as an
  ordinary activity, as it refuses every action of combat; `SAVED_GAME_VERSION` stays 11 here and
  rises in Slice 6. A new `tests/sim/pressure.test.mjs`, written first, holds each of these. This
  slice leaves failing the tests that list the actions of the data, of the group „Żywność i walka”
  or of the minute in which the tree enters: `tests/sim/data.test.mjs`,
  `tests/sim/craft-and-tend.test.mjs` and `tests/sim/discovery.test.mjs`, made to pass by Slice 5;
  `tests/view/program-editor.test.mjs`, made to pass by Slice 9; `tests/view/rule-editor.test.mjs`,
  `tests/view/icons.test.mjs` and `tests/view/gear-editor.test.mjs`, made to pass by Slice 10.
- **Change:** `src/browser/sim/data/actions.ts` · `src/browser/sim/data/skills.ts` ·
  `src/browser/sim/types.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/program.ts` ·
  `src/browser/sim/combat.ts` · `src/browser/sim/saved-game.ts` · `tests/sim/pressure.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-saved-game.md` ·
  `guidelines/testing.md` · `src/browser/sim/data/gear.ts` · `src/browser/sim/data/items.ts` ·
  `src/browser/sim/action-targets.ts` · `src/browser/sim/skills.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:31-31` To do, item 3 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:46-50` Questions to settle, Q1 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:63-67` Questions to settle, Q5 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:75-81` Questions to settle, Q7 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:204-223` Settlements to record ·
  `foundations/decisions.md:7007-7035` D-144 · `foundations/decisions.md:7124-7138` D-150 ·
  `foundations/decisions.md:7036-7055` D-145 · `foundations/decisions.md:6898-6941` D-140 ·
  `foundations/decisions.md:7056-7073` D-146 · `foundations/decisions.md:8355-8373` D-380 ·
  `foundations/decisions.md:10309-10323` D-363 · `foundations/decisions.md:10206-10245` D-309 ·
  `foundations/decisions.md:9916-9967` D-289 · `foundations/decisions.md:9968-9996` D-290 ·
  `foundations/decisions.md:8283-8302` D-126 · `foundations/decisions.md:7654-7678` D-120 ·
  `foundations/decisions.md:7319-7339` D-193 · `foundations/decisions.md:7359-7376` D-195 ·
  `foundations/decisions.md:7401-7416` D-197 · `foundations/decisions.md:8374-8392` D-443 ·
  `foundations/decisions.md:12772-12786` D-456 · `foundations/decisions.md:12787-12799` D-457 ·
  `foundations/decisions.md:3918-3970` D-206 · `foundations/invariants.md:364-374`
  program-closed-lists · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/invariants.md:248-263` program-rule-pick ·
  `foundations/glossary.md:174-179` combat turn · `foundations/glossary.md:338-342` gear ·
  `foundations/part_map.md:34-66` simulation
- **Model:** strongest — the action needs design: a new form of combat effect, a piece rule that reads
  the place the data name, and a reader at the trust boundary, all at once (the orchestrator's change
  of the plan's `same`, at the plan's review)
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/pressure.test.mjs` (written first, failing on the base of the
  slice) · `npm test -- tests/sim/combat.test.mjs` · `npm test -- tests/sim/encounters.test.mjs` ·
  `npm test -- tests/sim/gear-combat.test.mjs` · `npm test -- tests/sim/gear-combat-wear.test.mjs` ·
  `npm test -- tests/sim/rule-signs.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/sim/previous-programs.test.mjs` ·
  `npm test -- tests/invariants/test_program_closed_lists.py` ·
  `npm test -- tests/invariants/test_icon_credits.py` · `npm test -- tests/sim/rules.test.mjs` ·
  `npm test -- tests/quality/test_function_and_file_size.py` · `npm run typecheck`
- **Depends on:** Slice 3 · D-144 · D-150 · D-380 · D-363 · D-290 · Row 5 · Row 10

## Current ranges of the foundation entries your section's *Read* names

The foundation step changed `foundations/decisions.md` before your base, so the lines moved. The ranges below hold; the entry is the range from its heading to the next heading. Invariants, the glossary and the part map stand as the plan gives them.

- D-144: `foundations/decisions.md:7012-7048` (the plan's base range 7007-7035)
- D-150: `foundations/decisions.md:7143-7163` (the plan's base range 7124-7138)
- D-145: `foundations/decisions.md:7049-7074` (the plan's base range 7036-7055)
- D-140: `foundations/decisions.md:6903-6946` (the plan's base range 6898-6941)
- D-146: `foundations/decisions.md:7075-7092` (the plan's base range 7056-7073)
- D-380: `foundations/decisions.md:8392-8410` (the plan's base range 8355-8373)
- D-363: `foundations/decisions.md:10346-10362` (the plan's base range 10309-10323)
- D-309: `foundations/decisions.md:10243-10282` (the plan's base range 10206-10245)
- D-289: `foundations/decisions.md:9953-10004` (the plan's base range 9916-9967)
- D-290: `foundations/decisions.md:10005-10033` (the plan's base range 9968-9996)
- D-126: `foundations/decisions.md:8320-8339` (the plan's base range 8283-8302)
- D-120: `foundations/decisions.md:7691-7715` (the plan's base range 7654-7678)
- D-193: `foundations/decisions.md:7344-7364` (the plan's base range 7319-7339)
- D-195: `foundations/decisions.md:7384-7401` (the plan's base range 7359-7376)
- D-197: `foundations/decisions.md:7426-7441` (the plan's base range 7401-7416)
- D-443: `foundations/decisions.md:8411-8429` (the plan's base range 8374-8392)
- D-456: `foundations/decisions.md:12811-12825` (the plan's base range 12772-12786)
- D-457: `foundations/decisions.md:12826-12838` (the plan's base range 12787-12799)
- D-206: `foundations/decisions.md:3918-3970` (the plan's base range 3918-3970)

## Passages of the task your section's *Read* names (word for word)

#### `task_frozen.md:31-31` — To do, item 3

3. Kupiona gałąź Ucisk otwiera czynność walki „Ucisk — {rzecz}”, tak jak gałąź „Obchód” otwiera „Obchód — {zasób}” (pytanie Q1); jej cele to przedmioty, którym dane gry dają leczenie — dziś sam opatrunek. W turze walki zużywa jedną sztukę z kieszeni pasa — miejsca „pod ręką” wyposażenia postaci, które wnosi zadanie 8 — a pusta kieszeń uzupełnia się z plecaka tak, jak zadanie 8 uzupełnia miejsca pod ręką; „Opatrz” poza walką dalej bierze opatrunek z plecaka (pytanie Q5). Dane opatrunku mówią, że pasuje do kieszeni pasa, jeśli nie mówi tego już zadanie 8. Ucisk przywraca tyle zdrowia, co „Opatrz” tym samym przedmiotem — dziś 25, więcej o kupione stopnie „Mocniejszego zwoju” — nigdy ponad pełne zdrowie; przy pełnym zdrowiu się nie wykonuje (pytanie Q7, część 1). „Opatrz” dalej nie działa w walce (D-140, D-145). Gracz widzi przy Ucisku to, co reguły gry dają każdej czynności: czas „tura” (D-293); w komórce wyboru czynności bez ceny, a przy celu i przy wybranej czynności cenę, np. „Ucisk — Opatrunek (1 opatrunek)” (D-363); powody odmowy „zdrowie pełne” przed „brakuje {ile} × {rzecz}”, ten drugi wtedy, gdy opatrunku nie ma ani w kieszeni, ani w plecaku, z którego kieszeń się uzupełnia (D-380); poza walką regułę bursztynową z powodem „tylko w walce” (D-309); bez kupionej gałęzi powód „gałąź niewykupiona” (D-289). Ucisk ma tę samą ikonę co „Opatrz”, `bandage-roll` (pytanie Q7, część 2), i stoi w wyborze czynności w grupie „Żywność i walka”, za „Odskocz” (pytanie Q7, ustawienie domyślne).

#### `task_frozen.md:46-50` — Questions to settle, Q1

- Q1. Jak działa gałąź Ucisk — „opatrzenie w trakcie starcia, za turę zamiast za dziesięć minut” (koncepcja gry, §4)?
  - Answer: a) Ucisk to nowa czynność walki, „Ucisk — Opatrunek”, którą otwiera kupiona gałąź — tak jak gałąź „Obchód” otwiera czynność „Obchód”. W turze walki zużywa jeden opatrunek i przywraca zdrowie. Gracz pisze ją jako regułę walki z własnym progiem, np. „Zdrowie poniżej 10 → Ucisk — Opatrunek”, obok „Uderz — patyk”. Reguła walki D-140 (w walce tylko czynności walki, a one tylko w walce) i reguła opatrywania D-145 („Opatrz” leczy w 10 minut i nie działa w walce) zostają bez zmian, a decyzje, które wyliczają czynności po nazwie — D-144, D-150, D-290, D-363 i D-380 — dostają nową. Słaby punkt pokazany przy tej drodze: „gracz pisze dwie reguły na ten sam opatrunek, a koncepcja mówi o „opatrzeniu”, co da się czytać jako tę samą czynność co „Opatrz”, czyli jak w b”.
  - Not chosen:
    - b) Gałąź pozwala zwykłemu „Opatrz” zadziałać w walce w jedną turę — zmienia D-140 i D-145; gracz nie ustawi innego progu zdrowia w walce i poza nią, bo to jedna reguła; znaki reguły w edytorze („trwa walka” w czasie napaści, „tylko w walce” poza nią — D-309) potrzebują wyjątku dla reguły, która raz jest zwykła, a raz walki; cofnięcie później średnie, jak w a.
  - Source: Mariusz, 2026-11-25, odpowiedź na piątą partię pytań, w której pytanie 1 było tym pytaniem z polecaną drogą a: „tutaj nie mam objekcji chyba, może być wszystko zgodnie z rekomendacjami” (rozmowa doprecyzowania `.runs/project-refinement/rana-i-opatrunek.md` w repozytorium loop2, tura 17; brzmienie pytania z tury 15).

#### `task_frozen.md:63-67` — Questions to settle, Q5

- Q5. Skąd Ucisk bierze opatrunek — z plecaka, jak „Opatrz”, czy z miejsca „Pod ręką” wyposażenia postaci, które dodaje zadanie 8?
  - Answer: b) „Ucisk bierze opatrunek z kieszeni („pod ręką”), a pusta kieszeń uzupełnia się z plecaka. „Opatrz” poza walką dalej bierze z plecaka.” Koszt pokazany przy tej drodze: zmiana planu — zadanie 6 czeka na zadanie 8 (wiersz 6 planu ma w *Depends on* zadanie 8 od 2026-11-25). Zysk: kieszenie wyposażenia od razu mają sens, a opatrunki wchodzą na Las — matecznik, choć jego pułap wejścia to 0, bo pułapy wejścia nie dotyczą wyposażenia (dokument zadania 8, pytanie 6; czy Matecznik ma wpuszczać wyposażenie, rozstrzyga zadanie 14). Słaby punkt: zadanie 6 nie zacznie się, dopóki zadanie 8 nie zostanie scalone.
  - Not chosen:
    - a) Z plecaka, jak „Opatrz” — kieszenie wyposażenia stoją puste, dopóki inne zadanie nie wniesie pasującego przedmiotu, a opatrunek nie wejdzie na Matecznik, dopóki zadanie 14 nie ustawi jego pułapu wejścia. Tę drogę Mariusz wybrał wcześniej, w piątej partii pytań, gdy droga b miała koszt „jedna sztuka na miejsce i bez przekładania w trakcie przejścia” — jeden Ucisk na przejście; późniejsze odpowiedzi Mariusza w zadaniu 8 (kilka kieszeni pasa, samoczynne uzupełnianie miejsc pod ręką z plecaka, wyposażenie poza pułapem wejścia) ten koszt zdjęły, więc pytanie wróciło.
  - Source: Mariusz, 2026-11-25, „wszystko jak rekomendujesz” — odpowiedź na pytanie ponowione przez prowadzącego projekt z polecaną drogą b, po uwadze K12 krytyki rundy (`.runs/project-refinement/critique-round-turn19.md` w repozytorium loop2); rozmowa doprecyzowania `.runs/project-refinement/rana-i-opatrunek.md`, tury 20 i 21. Wcześniejsza odpowiedź a (tura 17: „tutaj nie mam objekcji chyba, może być wszystko zgodnie z rekomendacjami”) przestała obowiązywać.

#### `task_frozen.md:75-81` — Questions to settle, Q7

- Q7. Ile leczy jeden Ucisk, jaką ma ikonę i czy zostaje ustawienie domyślne jego miejsca w wyborze czynności — w grupie „Żywność i walka”, za „Odskocz” (przy drodze a pytania Q1)?
  - Answer: Część 1 — a) Tyle co „Opatrz” tym samym opatrunkiem — dziś 25 zdrowia, przy drodze a pytania Q2 więcej o stopnie „Mocniejszego zwoju”; Ucisk to to samo opatrzenie, tylko w jedną turę zamiast w 10 minut. Słaby punkt pokazany przy tej drodze: 25 zdrowia w jednej turze to tyle, ile wilk zabiera w trzech–czterech ugryzieniach, więc postać z zapasem opatrunków przetrwa prawie każdą walkę z wilkiem. Część 2 — ta sama ikona co „Opatrz” (rolka bandaża, `bandage-roll`): ustawienie domyślne pokazane do weta, bez weta. Miejsce w wyborze czynności — w grupie „Żywność i walka”, za „Odskocz”, czyli na końcu czynności walki; zmienia D-290: ustawienie domyślne pokazane do weta, bez weta. Bez wyboru, bo wynika z reguł, które gra ma dla każdej czynności, a przy drodze a pytania Q5: czas „tura”, cena przy celu „(1 opatrunek)”, powody odmowy „zdrowie pełne” przed „brakuje 1 × opatrunek”, leczenie nigdy ponad pełne zdrowie.
  - Not chosen:
    - Część 1, b) Mniej niż „Opatrz”, na przykład połowę — nowa liczba w danych opatrunku, leczenie w walce; połowy nie daje żadne źródło; cofnięcie tanie.
    - Część 2, b) Nowa ikona z game-icons.net, z wpisem w „Autorzy grafiki” (D-27) — jeden plik ikony i jeden wpis, ikonę trzeba wybrać; cofnięcie tanie.
    - Miejsce: zaraz za „Opatrz” — oba opatrzenia obok siebie, ale Ucisk rozdziela wtedy „Opatrz” i czynności walki; cofnięcie tanie.
  - Source: Mariusz, 2026-11-25, odpowiedź na piątą partię pytań, w której pytanie 5 było częścią 1 tego pytania z polecaną drogą a, a ustawienie domyślne 7 ikoną i miejscem: „tutaj nie mam objekcji chyba, może być wszystko zgodnie z rekomendacjami” (rozmowa doprecyzowania `.runs/project-refinement/rana-i-opatrunek.md`, tura 17; brzmienie z tury 15).

#### `task_frozen.md:204-223` — Settlements to record

## Settlements to record

Candidates: 11 shown, 10 accepted — 2026-11-25

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Kupiona gałąź Ucisk otwiera osobną czynność walki „Ucisk — {rzecz}”, którą gracz pisze jako regułę walki z własnym progiem zdrowia; „Opatrz” dalej nie działa w walce. | sentence of D-144 | Pytanie Q1 (Not chosen: b) — wybór Mariusza | czy gałąź pozwala zwykłemu „Opatrz” działać w walce w jedną turę, zmieniając D-140 i D-145, czy dodaje nową czynność |
| 2 | Ucisk zużywa opatrunek z kieszeni pasa („pod ręką”), a pusta kieszeń uzupełnia się z plecaka; „Opatrz” poza walką dalej bierze opatrunek z plecaka. | sentence of D-144 | Pytanie Q5 (Not chosen: a) — wybór Mariusza | czy Ucisk bierze opatrunek z plecaka, jak „Opatrz”, czy z wyposażenia, i czy „Opatrz” też sięga do kieszeni |
| 3 | Ucisk w jednej turze walki przywraca tyle zdrowia, co „Opatrz” tym samym opatrunkiem, razem z kupionymi stopniami „Mocniejszego zwoju”, nigdy ponad pełne. | sentence of D-144 | Pytanie Q7, część 1 (Not chosen: b) — wybór Mariusza | ile leczy Ucisk — na przykład połowę leczenia „Opatrz”, z nową liczbą w danych opatrunku |
| 4 | „Ucisk — {rzecz}” rozwija drzewo „Opatrywanie małych ran”, które stoi wśród predyspozycji Maga żywiołów. | sentence of D-150 | Pytanie Q6, część 1 (Not chosen: b, c) — wybór Mariusza | czy czynność walki Ucisku rozwija drzewo leczenia, czy inną umiejętność, albo żadną |
| 5 | Jedno drzewo „Opatrywanie małych ran” rozwijają „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” i „Ucisk — Opatrunek”. | data or code: dane umiejętności w `src/browser/sim/data/skills.ts` i predyspozycje maga w `src/browser/sim/data/archetypes.ts`, z testem, który je trzyma | Pytanie Q6, część 1 (Not chosen: b, c) — wybór Mariusza | czy wytwarzanie opatrunku jest osobną umiejętnością, czy nie daje wprawy wcale |
| 6 | Dziewiąta umiejętność, „Opatrywanie małych ran”, daje poziom i punkt przy 10, 28, 60 i 110 wprawy, a jej gałęzie to „Mocniejszy zwój” (+5 zdrowia z opatrunku na stopień, ceny 1 · 1 · 2), „Wprawna dłoń” (−2 minuty „Opatrz” na stopień, ceny 1 · 1 · 2), „Szybkie gojenie” (+0,05 zdrowia na minutę samoistnego powrotu na stopień, ceny 2 · 3) i „Ucisk” (cena 3). | sentence of D-379 | Pytanie Q2 (Not chosen: b, c) — wybór Mariusza; nazwa: pytanie Q6, część 2 (Not chosen: inna nazwa) — ustawienie domyślne bez weta | ile gałęzi ma drzewo, jakie są progi i ceny i jak się ono nazywa |
| 7 | Opatrunek przywraca tyle zdrowia, ile podają jego dane, więcej o kupione stopnie „Mocniejszego zwoju”. | sentence of D-145 | Pytanie Q2 (Not chosen: b, c) — wybór Mariusza | czy zdanie D-145 „gives back that healing” zostaje dosłowne, a stopnie gałęzi liczy się gdzie indziej |
| 8 | 0,05 zdrowia na minutę samoistnego powrotu to liczba postaci bez kupionych stopni „Szybkiego gojenia”; każdy stopień dokłada 0,05. | sentence of D-387 | Pytanie Q2 (Not chosen: b, c) — wybór Mariusza | czy „Szybkie gojenie” zmienia liczbę ciała z D-387, czy jest liczbą obok niej, i gdzie stoi wynik |
| 9 | Ucisk stoi w wyborze czynności w grupie „Żywność i walka”, za „Odskocz”. | sentence of D-290 | Pytanie Q7, miejsce w wyborze czynności (Not chosen: zaraz za „Opatrz”) — ustawienie domyślne bez weta | czy Ucisk stoi przy „Opatrz”, czy na końcu czynności walki |
| 10 | Ucisk ma tę samą ikonę co „Opatrz” — rolkę bandaża, `bandage-roll`. | data or code: dane czynności w `src/browser/sim/data/actions.ts` | Pytanie Q7, część 2 (Not chosen: b) — ustawienie domyślne bez weta | czy Ucisk dostaje nową ikonę z game-icons.net z wpisem w „Autorzy grafiki” (D-27) |

Odrzucone, z powodem:

- 11. Po zmianie jedno sprawdzenie przyrządem na watasze i na Lesie — głębiej, z programem wzorcowym, który się opatruje, tabela bez opatrunku, z opatrunkiem i z Uciskiem w opisie prośby, bez progu i bez strojenia — kończy się z zadaniem; trzyma go punkt 5 *To do*, a program wzorcowy staje tam, gdzie D-427 każe stać programom wzorcowym.

## What the executor read, and what you read

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
