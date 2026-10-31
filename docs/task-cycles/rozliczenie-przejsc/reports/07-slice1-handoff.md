# Handoff — executor of Slice 1 — A manual run of a solved map neither pays nor takes, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`, head `0363149`. Process pin `.the-way` at `a8dfe8a`. Pinned quality
  tools stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/rozliczenie-przejsc/reports/07-slice1-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. Each
  check you report carries its command and exit code. Commands of the plan's *Checks* in the form
  `npm test -- <file>` run that one file.
- Before writing any script read `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.
- Code is written in English; texts the game shows stay in Polish, word for word from the task.

## Git

Commit on the task branch, in the worktree, by explicit paths (never `git add -A`, `.` or
`commit -a`). Messages in English in the form of the repository's commits, for instance
`feat: :sparkles: …`, `test: :white_check_mark: …`, `fix: :bug: …`. Do not push. Check that the
commits' address is `mariusznn@gmail.com` (`git log -1 --format='%h %ae'`). `.runs/` is ignored and
stays out of commits. Leave the worktree clean.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/browser/sim/saved-game.ts` as the trust boundary
  of `simulation`. A forged or malformed value in a document from outside must refuse it whole.
- Irreversible operation: **yes**. Raising `SAVED_GAME_VERSION` makes the game discard every older
  saved game state in full at load (D-206) once the merge deploys `main` (D-11). The cycle only
  prepares the raised number and performs nothing on the server; the human performs it by merging.

## Your slice, the plan's section word for word (`.runs/task-cycles/rozliczenie-przejsc/plan.md`)

### Slice 1 — A manual run of a solved map neither pays nor takes

- **Goal:** `GameMapRun` holds `solvedMapRun`, bound in `startRun` from `solvedMaps` and carried unchanged to the run's end, the saved document and back. A marked run takes its equipment through `takeFromNowhere` of `trip.ts` and leaves the chest as it is. `tripLoot` gives a marked run an empty list, so it deposits nothing and `deposited` is `[]`. A completion of a marked run pays no practice and keeps `run.practice`; the solved maps grow as today; a death on a marked run pays nothing. `SAVED_GAME_VERSION` is 2, the load reads `solvedMapRun` and `deposited` as spec decision 9 gives, `solvedMaps` read before the run, and every document this slice's game saves loads back.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/trip.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/trip.test.mjs` · `tests/sim/skills.test.mjs` ·
  `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/rozliczenie-przejsc/task.md:18-22` To do, items 1–5 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:31-31` To do, item 14 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:38-38` To do, item 21 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:43-62` Questions to settle, W1, Q1, Q2 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:73-78` Questions to settle, Q4 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:135-153` Context, the table of loop ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:24-45` Constraints ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:49-82` Decisions, 1 and 2 ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:229-269` Decisions, 9 and 10 ·
  rows solved-map-manual-run, D-189, Row 1, Row 2, D-179, trip-transfer and trip-run-end of the
  plan's Foundation entries, as written ·
  `foundations/decisions.md:57-107` D-04 · `foundations/decisions.md:1084-1103` D-55 ·
  `foundations/decisions.md:2166-2201` D-122 · `foundations/decisions.md:3201-3215` D-179 ·
  `foundations/decisions.md:3255-3267` D-183 · `foundations/decisions.md:3281-3332` D-185–D-188 ·
  `foundations/decisions.md:3333-3358` D-189, D-190 · `foundations/decisions.md:3359-3373` D-191 ·
  `foundations/decisions.md:3404-3418` D-194 · `foundations/decisions.md:3494-3508` D-200 ·
  `foundations/decisions.md:3615-3640` D-206 · `foundations/decisions.md:3828-3890` D-212, D-213 ·
  `foundations/invariants.md:165-175` map-run-repeatability ·
  `foundations/invariants.md:214-235` simulation-isolation, simulation-inputs ·
  `foundations/invariants.md:309-318` restart-seed ·
  `foundations/invariants.md:518-537` character-team, minute-span-split ·
  `foundations/invariants.md:958-977` trip-transfer, trip-run-end ·
  `foundations/invariants.md:1028-1037` save-version ·
  `foundations/part_map.md:28-59` simulation ·
  `foundations/glossary.md:65-72` map run restart ·
  `foundations/glossary.md:131-149` manual map run, completion, solved map ·
  `foundations/glossary.md:181-186` practice ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/character.ts` · `src/browser/view/trip-lines.ts` · `tests/view/trip.test.mjs` ·
  `tests/sim/completion.test.mjs:191-226` a map solved stays solved ·
  loop at commit cdc7c0d, outside this repository (C:/Storage/repos/loop, read with git show):
  src/sim/chest.test.ts:316-419 and src/sim/skills.test.ts:454-480
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts` reads a new key and narrows `deposited` · cannot be undone — `SAVED_GAME_VERSION` becomes 2, so the merge's deployment of `main` discards every older saved game state whole (D-206, D-11); the cycle only prepares the number and performs nothing on the server
- **Checks:** Start from failing cases in `tests/sim/trip.test.mjs` under `// invariant: solved-map-manual-run`, for To do 1–5 and 14, each citing its loop test. Expected values that change, each naming its requirement as `guidelines/testing.md`, *Changing an existing test*, asks: `tests/sim/trip.test.mjs:109` (To do 3, 5); `:333` (To do 5); `:361` (To do 3, 5: its restart now follows a completion, so the case keeps its marker `trip-run-end` and still shows the leftovers fund no later run that takes from the chest); `tests/sim/skills.test.mjs:537` (To do 2: its run holds no mark, so it still pays, and its name changes). In `tests/sim/saved-game.test.mjs`: the document of version 1 stays and is refused as `version`; the current document becomes version 2 with `solvedMapRun` false, its map run being on `forestDeep`; the cases that use 2 as another version (`:496`, `:603`, `:611`–`:618`) take another number; the completion at `:555` and the crafted completions at `:914`–`:945` add their map to `solvedMaps`, so each stays refused or admitted for the reason its name gives; each row of decision 9 this slice brings joins `CRAFTED` under `// invariant: save-version`. Then: `npm run typecheck` · `npm test -- tests/sim/trip.test.mjs` · `npm test -- tests/sim/skills.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/completion.test.mjs` · `npm test -- tests/view/trip.test.mjs` · `npm run build` · `npm test -- tests/invariants/test_restart_seed.py` · `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/invariants/test_map_run_repeatability.py` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Foundation entries: `solved-map-manual-run` · D-189 · Row 1 · Row 2 · D-179 · `trip-transfer` · `trip-run-end`

The foundation entries were written in commit `0363149`, so the ranges of the plan's *Read* have
moved: the current ones stand under *Current ranges* below and they hold. Rows of the plan's
*Foundation entries* name these entries: D-189, D-190, D-179, D-04, D-03, `trip-transfer` and
`trip-run-end` changed; Row 1 is D-214, Row 2 D-194, Row 3 D-215, Row 4 D-216, Row 5 D-217, Row 6
D-218, Row 7 D-219, Row 8 D-220, Row 9 `resurrection-renewal`, Row 10 `death-settled-once`, Row 11
`resurrection`, Row 12 `generation number`.

## Current ranges

| Entry | Range now |
|---|---|
| `D-185` | `foundations/decisions.md:3292-3304` |
| `D-186` | `foundations/decisions.md:3305-3317` |
| `D-187` | `foundations/decisions.md:3318-3330` |
| `D-188` | `foundations/decisions.md:3331-3343` |
| `D-189` | `foundations/decisions.md:3344-3358` |
| `D-179` | `foundations/decisions.md:3212-3226` |
| `D-04` | `foundations/decisions.md:57-118` |
| `D-55` | `foundations/decisions.md:1095-1114` |
| `D-122` | `foundations/decisions.md:2177-2212` |
| `D-183` | `foundations/decisions.md:3266-3278` |
| `D-190` | `foundations/decisions.md:3359-3373` |
| `D-191` | `foundations/decisions.md:3374-3388` |
| `D-194` | `foundations/decisions.md:3419-3433` |
| `D-200` | `foundations/decisions.md:3509-3523` |
| `D-206` | `foundations/decisions.md:3630-3655` |
| `D-212` | `foundations/decisions.md:3843-3880` |
| `D-213` | `foundations/decisions.md:3881-3906` |
| `solved-map-manual-run` | `foundations/invariants.md:1038-1047` |
| `D-214` | `foundations/decisions.md:3907-3924` |
| `trip-transfer` | `foundations/invariants.md:958-967` |
| `trip-run-end` | `foundations/invariants.md:968-977` |
| `map-run-repeatability` | `foundations/invariants.md:165-175` |
| `simulation-isolation` | `foundations/invariants.md:214-225` |
| `simulation-inputs` | `foundations/invariants.md:226-235` |
| `restart-seed` | `foundations/invariants.md:309-318` |
| `character-team` | `foundations/invariants.md:518-527` |
| `minute-span-split` | `foundations/invariants.md:528-537` |
| `save-version` | `foundations/invariants.md:1028-1037` |
| `map run restart` | `foundations/glossary.md:65-72` |
| `manual map run` | `foundations/glossary.md:131-136` |
| `completion` | `foundations/glossary.md:137-142` |
| `solved map` | `foundations/glossary.md:143-149` |
| `practice` | `foundations/glossary.md:181-186` |
| `simulation` | `foundations/part_map.md:28-59` |

## Passages of the task and the spec, copied word for word

### task.md:18-22 — To do, items 1–5

1. Pierwsze domknięcie mapy płaci: przejście ręczne zaczęte na mapie jeszcze nierozwiązanej, które ją domknie, daje postaci, która je wykonała, wprawę zebraną w tym przejściu (D-194), a do skrzynki trafia to, co wymienia migawka listy wynoszenia (D-179, D-189); płaci raz na mapę dla gracza, którakolwiek postać ją domknie.
2. Ręczne przejście mapy rozwiązanej nie płaci niczym: jego domknięcie nie dodaje wprawy żadnej umiejętności postaci i nie odkłada niczego do skrzynki, a zebrana wprawa zostaje przy przejściu (pytanie W1; test loop `src/sim/skills.test.ts:454`–`468`).
3. O tym, czy przejście jest ręcznym przejściem mapy rozwiązanej, rozstrzyga stan mapy w chwili startu przejścia, także gdy tym startem jest „Restart” po domknięciu, które mapę rozwiązało (pytanie Q2).
4. Rozstrzygnięcie ze startu przejście niesie do swojego końca, także na ekranie po końcu i po wczytaniu zapisu (pytanie W1; test loop `src/sim/chest.test.ts:358`–`367`; D-212).
5. Ręczne przejście mapy rozwiązanej nie bierze niczego ze skrzynki: wyposażenie z listy „Zabierz” kopii dostaje znikąd, przycięte tylko udźwigiem postaci i pułapem wnoszenia mapy, od góry listy.

### task.md:31-31 — To do, item 14

14. Każda śmierć, także przy gotowym wskrzeszeniu i także w ręcznym przejściu mapy rozwiązanej, kończy przejście, zabiera to, co postać niosła, i nie płaci niczym z przejścia (D-61, D-190, D-194; pytania Q1 i Q3).

### task.md:38-38 — To do, item 21

21. Zmiana kształtu stanu gry podnosi `SAVED_GAME_VERSION` (`src/browser/sim/saved-game.ts:69`, dziś 1; `guidelines/coding-saved-game.md`, „Wersja podnoszona razem z kształtem”).

### task.md:43-62 — Questions to settle, W1, Q1, Q2

- W1. Czy testy loop wiążą to zadanie tak jak liczby z jego danych?
  - Answer: Tak: dla zadań gry 14 i 18 testy loop rozstrzygają to, co pokrywają, a odejście od nich jest nazwaną decyzją. W tym zadaniu wchodzą w ten sposób wiersze tabeli zachowań w *Context*, między innymi: zużyte wskrzeszenie wraca 8 godzin po śmierci, a śmierć bez gotowego wskrzeszenia nie przesuwa tej chwili. Przyjęty koszt: wchodzą też zachowania, których nikt świadomie nie wybierał.
  - Not chosen:
    - B — testy są tylko materiałem — około dziesięciu punktów dostaje własne pytanie, a definicja traktuje znaczące odejście od loop jako obalenie celu.
  - Source: człowiek — Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet rundy zadań 14, 17, 18 i 21, pozycja W1, droga A), zapisane w planie `plan_mvp_loop2.md` (sha256 7eb77bdd1418), dziennik zmian, linia 300. Definicja, linia 72, daje testy jako wejście.
- Q1. Co obejmuje „nic nie daje i nic nie kosztuje” w ręcznym przejściu mapy rozwiązanej: czy śmierć w takim przejściu kosztuje jak każda inna i czy odkrycia dalej wchodzą do Zrozumienia?
  - Answer: Śmierć w ręcznym przejściu mapy rozwiązanej kosztuje jak każda inna, a odkrycia wchodzą w nim do Zrozumienia jak w każdym przejściu, które uruchamia gracz. W zatwierdzonych wpisach „nie płaci” znaczy: ani wprawą, ani łupem, a „nic nie bierze” dotyczy skrzynki.
    - Śmierć. Definicja, „(new) — What does a character's death take?”: “A character's death takes what it carried and pays nothing of its map run; when the character has no resurrection ready, it also takes all its practice and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged. The programs, the chest, the Understanding and the solved maps survive every death.” *Verification*, violates: “a manual map run on which death takes nothing”. *Rationale*: “The stake holds on every map run — in the earning loop as on a manual try at a hard map — so a night can be lost.” *Rejected*: “a stake in the earning loop only — everything risky would be done by hand and the stake would vanish where it matters most”.
    - Odkrycia. D-122: “When something is discovered in a map run the player starts, the map run stops in the same pause as after „Pauza””. D-119: “what any character discovers enters it for every character”. D-118: “every other action, item, condition, creature and branch enters the Understanding only when discovered in play, each by the need, action, item or encounter that reveals it.” Pojęcie `manual map run`: “A manual map run is a map run that the player starts outside an earning loop.”
    - Co obejmuje „nic”. Definicja, „(new) — What pays, and what takes from the chest?”: “A manual map run that first solves its map pays practice and loot once per map for the player, whichever character completes it. A manual run of a solved map pays nothing.”; “A manual map run of a map already solved takes nothing from the chest”; *Rationale*: “What does not pay takes nothing from the chest either, or tuning a program would eat the chest at every try”. `solved-map-manual-run/1`: “A manual map run of a map already solved when the map run starts leaves the chest as it was and adds no practice to any character skill.”
    - Rozjazd pokazany człowiekowi: definicja, In scope, linia 44, mówi „nic nie kosztuje”, co czytane dosłownie sięga szerzej niż cytaty wyżej; cytaty zostały, a to zdanie czyta się przez nie.
    - Cel planu, wiersz 14, po zmianach z 2026-10-30 nie mówi już „nic nie kosztuje” i zgadza się z tą odpowiedzią (plan, dziennik zmian, linie 302–303).
    - Skutek przyjęty przez człowieka: w MVP nie ma przemiatania, które w koncepcji jest miejscem, gdzie „przegrywa się za darmo”, więc jedyna próba programu przed pętlą może kosztować postać całą wprawę, jeśli wskrzeszenie nie jest gotowe.
  - Source: cytat zostawiony przez człowieka — Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet, pozycja C1). Definicja `definicja_mvp_loop2.md` (sha256 fda97782458d, Status approved 2026-10-29), linie 44, 1454–1455, 1459–1460, 1480–1481, 1505–1508, 1519, 1525–1526, 1530–1531, 2180–2181. Fundament przy `95de83b`: D-118 `foundations/decisions.md:2060`–`2062`; D-119 `:2084`–`2085`; D-122 `:2168`; `manual map run` `foundations/glossary.md:133`. Plan (sha256 7eb77bdd1418), wiersz 14, linia 23, i dziennik zmian, linie 302–303.
- Q2. Co rozstrzyga, że przejście jest ręcznym przejściem mapy rozwiązanej — stan mapy w chwili startu czy domknięcia — i co robi „Restart” po domknięciu, które tę mapę rozwiązało?
  - Answer: Rozstrzyga stan mapy w chwili startu przejścia. „Restart” po domknięciu, które rozwiązało mapę, jest już ręcznym przejściem mapy rozwiązanej: nie bierze ze skrzynki, wyposażenie dostaje znikąd i nie płaci niczym.
    - `solved-map-manual-run/1`: “A manual map run of a map already solved when the map run starts leaves the chest as it was and adds no practice to any character skill.”
    - Definicja, „(new) — What pays, and what takes from the chest?”: “A manual map run that first solves its map pays practice and loot once per map for the player, whichever character completes it. A manual run of a solved map pays nothing.”; “A manual map run of a map already solved takes nothing from the chest: it takes its equipment from nowhere, cut only by the character's carrying capacity and the map's cap”. Pojęcie `map run restart`: “A map run restart is a map run of the same character on the same game map, which the player starts in place of the map run in progress or of a map run ended in the character's death or in a completion that still stands on the screen.” Pojęcie `solved map`: “A solved map is a map on which a map run of any of the player's characters has had a completion, whether or not an earning-loop program survives every seed.”
    - Krok agenta, nie cytat: żaden cytat nie wymienia „Restart” po domknięciu; restart jest przejściem, które uruchamia gracz, a mapa jest wtedy już rozwiązana. Ten sam krok, że start restartu jest startem przejścia, człowiek zostawił przy pytaniu Q5 zadania 13.
  - Source: cytat z krokiem agenta zostawiony przez człowieka — Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet, pozycja C2). Definicja (sha256 fda97782458d), linie 1454–1455, 1459–1461, 2180–2181. Fundament przy `95de83b`: `map run restart` `foundations/glossary.md:67`–`69`, `manual map run` `:133`, `solved map` `:145`–`146`. Precedens kroku: zadanie 13, zamrożona kopia, commit 1b09f80c, `docs/task-cycles/plan-wyprawy/task.md:55`–`57`.

### task.md:73-78 — Questions to settle, Q4

- Q4. Czy przyjmujesz stan między scaleniami zadań 14 i 18, w którym wprawę i łup daje wyłącznie pierwsze domknięcie każdej mapy?
  - Answer: Tak, droga A — kolejność z planu: scalamy to zadanie, potem zadanie 18. Przyjęty koszt: po scaleniu tego zadania powtarzanie Lasu przestaje podnosić postać, cała drużyna ma najwyżej dwie wypłaty wprawy i dwie łupu, nowa postać nie ma skąd wziąć wprawy, a nikt nie mierzył, czy Las — głębiej da się przejść z jedną wypłatą. Przez cały cykl zadania 18 gra prawie nie daje wprawy, co dotyczy tylko właściciela, a jego zapis na serwerze przepada przy obu wdrożeniach, bo oba zmieniają kształt stanu gry (D-206). To przyjęcie odwraca *Rejected* D-194 (“only the first solution paying practice here — before earning loops this would leave at most two payments”) i koszt odrzucony w zadaniu 10, pytanie Q1, dla wcześniejszego odcinka. Pozycja D1 tego odwrócenia nie nazwała; człowiek zobaczył je przy wierszu 2 i ten wiersz przyjął.
  - Not chosen:
    - B — to zadanie zostawia wypłatę wprawy za powtórkę do zadania 18 — zmiana celu zadania i planu, niezmiennik `solved-map-manual-run` złamany przez ten czas w części o wprawie, dwukrotna zmiana tej samej decyzji w fundamencie.
    - C — oba zadania wchodzą jednym pushem — gotowe zadanie 14 czeka na zadanie 18, a dłuższa gałąź to więcej konfliktów.
  - Source: człowiek — Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet, pozycja D1). Pytanie kanoniczne dla zadań 14 i 18 (w rozmowie zadania 18 Q15). Materiał: D-194 `foundations/decisions.md:3404`; plan, wiersz 18, Depends on „14, 16”; zadanie 10, zamrożona kopia, commit 81336e9e, `docs/task-cycles/wprawa-i-drzewa/task.md:54`.

### task.md:135-153 — Context, the table of loop

- Liczby i zachowania z danych i testów loop (`C:\Storage\repos\loop`, commit `cdc7c0d`), które wiążą to zadanie (pytania Q10 i W1):

| Co | Wartość w loop | Gdzie |
|---|---|---|
| czas odnowienia wskrzeszenia | 480 minut realnych | `src/sim/data/balance.ts:125` |
| numer pokolenia nowej postaci | 1 | `src/sim/roster.test.ts:18`, `src/sim/sim.test.ts:2003` |
| wskrzeszenie nowej postaci | gotowe (`readyAtMs: 0`) | `src/sim/sim.test.ts:2002` |
| chwila gotowości po zużyciu | chwila śmierci + czas odnowienia | `src/sim/death.test.ts:42` |
| śmierć bez gotowego wskrzeszenia | chwila gotowości bez zmiany, numer pokolenia + 1, umiejętności od zera | `src/sim/death.test.ts:48`–`59` |
| chwila równa gotowości | liczy się jako gotowe | `src/sim/death.test.ts:77`–`81` |
| drugie rozliczenie tej samej śmierci | nic nie zmienia | `src/sim/death.test.ts:83`–`87` |
| co przeżywa wyzerowanie | skrzynka, rozwiązane mapy, Zrozumienie, programy, tożsamość postaci | `src/sim/death.test.ts:61`–`75` |
| archetyp przy wyzerowaniu | zostaje | `src/sim/death.test.ts:98`–`111` |
| czynność z wykupionej gałęzi po wyzerowaniu | zostaje w Zrozumieniu, wypada z repertuaru | `src/sim/death.test.ts:113`–`127` |
| wyposażenie ręcznego przejścia mapy rozwiązanej | wchodzi także to, czego nie ma w skrzynce; udźwig dalej przycina; skrzynka nietknięta | `src/sim/chest.test.ts:316`–`338` |
| przejście na mapie rozwiązanej | to, czy nie płaci, zapada na starcie | `src/sim/chest.test.ts:358`–`367`, `src/sim/skills.test.ts:470`–`480` |
| powtórne ręczne domknięcie | nie odkłada nic, wprawa nie wchodzi do umiejętności, a zostaje przy przejściu | `src/sim/chest.test.ts:407`–`419`, `src/sim/skills.test.ts:454`–`468` |

- Testy loop niosą też napisy „Wskrzeszenie zużyte” (`src/sim/death.test.ts:45`), które zostaje na początku tekstu z pytania Q7, i „postać nr 2” (`:58`), od którego pytanie Q8 odchodzi jako od nazwanej decyzji.

### spec.md:24-45 — Constraints

## Constraints

- The human's answers in *Questions to settle* are closed. W1 binds the tests of loop named in
  *Context*; the departure from „postać nr 2” is named in Q8.
- D-04: real time enters the simulation as an argument; `simulation-isolation` holds, and
  `src/browser/view/clock.ts` stays the one place that reads a clock.
- `minute-span-split`: the states and events of a span stay independent of how it is split, and the
  check of that invariant stays as it is.
- D-207: the 30-second check and the hidden page send a state that changed since the last save, and
  a tab that has just loaded sends nothing until the player acts. The saver finds a change by the
  identity of the state, so the passing of real time at the headquarters may not make a new state.
- D-212, `coding-saved-game.md`: no real time enters the load, and nothing settles at the load.
- D-200, test `tests/sim/skills.test.mjs:284`: a restart keeps the skills of the run it replaces.
  Test `tests/sim/trip.test.mjs:95` pins the same for the practice of a run after its completion.
- D-55: one manual map run at a time, so a map becomes solved through the run on the screen alone.
- Trust boundary: `src/browser/sim/saved-game.ts`. Each new value is read strictly, and a forged or
  malformed one refuses the document whole, as `shape`. Every code review of the cycle checks
  crafted input there.
- Irreversible: raising `SAVED_GAME_VERSION` discards every older saved game state once the merge
  deploys `main` (D-206, D-11; accepted in Q4 and *Context*). The cycle prepares the number and
  performs nothing on the server.
- `foundations/` is written through the project skills, in the foundation step.

### spec.md:49-82 — Decisions, 1 and 2

### 1. The run carries a mark set at its start (third open question)

`GameMapRun` gains `solvedMapRun: boolean`, bound in `startRun` from
`state.solvedMaps.includes(mapId)`, and carried unchanged to the run's end, the saved document and
back. `restart` goes through `startRun`, so a restart after the completion that solved the map
takes the mark (To do 3, Q2). Every run today is manual; task 18 sets the mark false for a run of an
earning loop (loop: `src/sim/chest.test.ts`, „przejście pętli pobiera ze skrzynki”).

Rejected: reading `solvedMaps` at the completion — the list already holds the map on the screen
after the completion that solved it, and the rule turns on the state at the start (Q2); a further
`payout` value as loop has — nothing here reads it. Cost if wrong: a rename of a key together with
the raised version, before the merge.

### 2. One rule for what a run takes and pays

- `src/browser/sim/trip.ts` gains `takeFromNowhere(plan, capacity, map)`: a backpack of the take
  list clipped from the top by the smaller of the character's carrying capacity and the map's entry
  cap, the list's own counts standing in for the stock. `startRun` calls it on a marked run and
  leaves the chest as it is; an unmarked run calls `takeTrip` as today (To do 5).
- `tripLoot` reads the mark and gives an empty list on a marked run. It already drives both the
  preview and the deposit, so `advanceMinutes` deposits nothing and sets `deposited` to `[]`, and
  `tripTexts` needs no change: the preview and the deposit line of To do 7 (D-185, D-186) follow
  from it.
- `advanceMinutes` calls `paidPractice` on a completion of an unmarked run. A marked run keeps
  `run.practice` as it stands (To do 2). The list of solved maps grows as today.
- The entry cap and `tripWarning` stay as they are, since `tripEntryCut` ignores stock (D-188).
- Discoveries on a marked run enter the Understanding and pause the run as on any other (Q1).

Settling once: a completion is settled in the game minute it happens; `advanceMinutes` returns an
ended run unchanged and the load does not call it.

Rejected: a branch in `tripTexts` and a second one in `advanceMinutes` — two places would hold one
rule; a `takeTrip` called with an unlimited chest — it would return a changed chest to be dropped.


### spec.md:229-269 — Decisions, 9 and 10

### 9. The saved document

`SAVED_GAME_VERSION` becomes 2; the document of version 1 stays in `tests/sim/saved-game.test.mjs`
and is refused as `version` (To do 21, `coding-saved-game.md`). `savedGame` needs no change.

The load reads, strictly, in `saved-game.ts`:

| Key | Admits |
|---|---|
| `Character.generation` | an identity, from 1 up |
| `Character.resurrectionReadyAtMs` | a safe integer of any sign (decision 7); no check against any clock |
| `solvedMapRun` | a boolean; a run with no completion has it equal to whether `solvedMaps` holds the map; a run with a completion requires the map in `solvedMaps` |
| `deposited` | as today, and `[]` at a completion of a marked run |
| `deathSettlement` | null exactly when the run has no death; a closed list of kinds, each with exactly its keys; a `generation` from 2 up to the current generation of the run's character |

`solvedMaps` is read before the run. `Records` gains what these checks need. No key is filled in.
The equality of the `solvedMapRun` row rests on D-55; task 18 may relax it for runs of an earning
loop. A forged far-future moment is admitted: it costs its own player alone (D-07).

### 10. Tests

| What | Where | Marker and source |
|---|---|---|
| rows 9, 10; To do 10–17; `Restart` after wiping | new `tests/sim/death.test.mjs`, listed in `stryker.config.json` | `// invariant: resurrection-renewal`, `// invariant: death-settled-once`; loop `death.test.ts`. Row 10's load case: `loadSavedGame(savedGame(state))` on a settled death, then `settleDeath` at a later moment, change nothing |
| To do 1–5, 14 | `tests/sim/trip.test.mjs` | `// invariant: solved-map-manual-run`, `trip-transfer`, `trip-run-end`; loop `chest.test.ts`, `skills.test.ts`, with its lines |
| To do 9 | `tests/sim/data.test.mjs` | the number 480, citing loop |
| the load | `tests/sim/saved-game.test.mjs` | the document of version 2 fills each branch; each row of decision 9 joins the table of crafted documents under `// invariant: save-version` |
| To do 6, 7, 18 | `tests/view/trip.test.mjs` | a pure-function table of the screens of decision 8, a loaded one included |
| To do 19, 20, Q12 | `tests/view/headquarters.test.mjs` | Q12's three examples, the moment of readiness, a clock set back, the label at 1 and 2 |
| one reading; settled state to the store; hook after a flush | `tests/view/clock.test.mjs` | mocked `Date` |
| death saved settled | `tests/view/account-screen.test.mjs:1546` | an added assertion |

Tests whose expectations change, each by requirement, among them: `tests/sim/skills.test.mjs:537`
(To do 2; its run holds no mark, so that case still pays, and its name stops being true),
`tests/sim/trip.test.mjs:109` (To do 3, 5: that restart stops taking from the chest),
`tests/sim/trip.test.mjs:333` (To do 5: its run starts on a solved map and takes from the chest),
`tests/sim/trip.test.mjs:361` (To do 3, 5: its restart follows a completion),
`tests/sim/team.test.mjs:53` (To do 8), and the helpers that save a death made by
`advanceMinutes`, such as `tests/view/account-screen.test.mjs:1179`, which call `settleDeath` before
saving. `tests/invariants/test_minute_span_split.py` stays as it is.

