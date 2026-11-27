# Handoff — the executor of a slice of the task rana-i-opatrunek, Slice 2

You make one slice of a planned change in a task cycle of the-way, as an agent of the type `the-way-stage`.

## Delegation and boundary

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator. You never ask the human; a question goes back to the orchestrator in your report (status `questions`, as `make-change` section 6 gives), each with the answer you recommend. What the orchestrator answers is never the human's approval.

- You make: **slice 2** (`make-change` variant „a slice, or the retry of a slice”). Read `.the-way/task-cycle/change/SKILL.md` whole and, because you make a slice, `.the-way/task-cycle/change/slice.md` whole; read `ui_check.md` and `walkthrough.md` beside the `SKILL.md` only where its sections 3 and 6 send you to them for what your slice changes.
- Worktree and working directory: `the worktree's root` (branch `task/rana-i-opatrunek`). The pinned the-way is the worktree's `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. Work only on this branch, one agent at a time on it.
- The base of this slice: `c669038548dae018918da296bcf94f1101f52a0c` (`git rev-parse HEAD` shows it when you start). Your range is from it to your head.
- Your directory for working copies: `.runs/executor-2/` (relative to the worktree).
- Your report: `.runs/task-cycles/rana-i-opatrunek/reports/executor-2-report.md` (that file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, so its name begins with the role; where your tool refuses the write, return the report whole as your answer). The cycle record `cycle.md` and the other files of the record directory — other agents' handoffs, reports, findings, the plan — are not yours to read.
- The frozen task: `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (sha256 `55c86eaf63df7156`); you open only the passages copied below. The plan is not yours to open: your section is copied below.
- Answers of the cycle's start: the change touches a trust boundary (the part map names `src/browser/sim/saved-game.ts`); this slice's *Risk* is stated in its section. Where it names the boundary, a reviewer of its own checks crafted input there.

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

## Notes of the orchestrator

- The tests of this slice are run one file at a time as the *Checks* name them (`npm test -- <file>`; a Python test through the command the testing guidelines give). Where a command of the *Checks* does not run as written, find the way in `guidelines/testing.md`, run it, and report the command you actually ran. **Never run the product's whole suite** (`npm test` with no file): its run is the cycle's own, after the start signal of the day's advisor, and CI's.
- `node_modules` in the worktree is a junction to the main checkout's; leave it. The first run of a Python test may make the environment `.runs/quality-venv` (needs network access to the Python Package Index); that is a file the product's tools make, no working copy of yours.
- Commit by path (`git add <file>…`; never `git add -A`, `git add .` or `git commit -a`), run the checks after `git add` of every file you create, and commit in English as the repository's earlier commits are worded (a type, an emoji, a sentence, the decisions in brackets). Do not push. Write code, identifiers and comments in English; what the game shows the player stays in Polish.
- Make this slice only. Where the plan and the code disagree in a structural way, stop and report (`slice.md`).
- Slice 1 is made (commit `c669038`). One divergence from its Goal, decided by the orchestrator as an accepted limitation: `actionInRepertoire` does not judge an item action by its pair, because the repertoire is the Understanding (`export type Repertoire = Understanding` in `understanding.ts`) and holds no predispositions; `repertoireOf` does judge the pairs and drops a kind from `repertoire.actions` when all of its pairs are closed. With one archetype and the bandage as the only target of `craft` and `tend` this gives the required result: a character whose archetype lacks `tending` has `craft` and `tend` closed. Your repertoire test (a character without the predisposition) goes through `repertoireOf`, as the existing tests of the file do; do not change `understanding.ts` (it is not in your *Change*); if the data cannot be made to pass the plan's test through `repertoireOf`, report a structural mismatch.
- Q3 (the orchestrator's answer, an autonomous choice recorded in the cycle; the task gives no units): the `preview` of the three numerical branches — „Mocniejszy zwój”: base 25, step 5, unit „zdrowia”; „Wprawna dłoń”: base 10, step −2, unit „min”, minimum 1; „Szybkie gojenie”: base 0.05, step 0.05, unit „zdrowia na minutę” (the existing previews hard-code the data's base, as „Mocniejszy cios” does with 6; follow their shape).

## Your section of the plan (word for word)

### Slice 2 — The tree „Opatrywanie małych ran” and its three numerical branches

- **Goal:** `SKILLS` of `src/browser/sim/data/skills.ts` gains, last, after „Unik przed ciosem”, the
  skill `tending`, „Opatrywanie małych ran”, growing the pairs „Wytwórz — Opatrunek” and „Opatrz —
  Opatrunek” (the verbs `craft` and `tend` with the item `bandage`), its levels and points at 10, 28,
  60 and 110 practice; „Ucisk — Opatrunek” joins its pairs in Slice 4. `BranchEffect` gains two
  kinds that carry an amount and no actions, `healing` (health one piece of a healing item gives
  back) and `healthRegain` (health that comes back by itself in a game minute). `BRANCHES` gains
  `strongerRoll` „Mocniejszy zwój” (`healing`, 5 per rank, costs 1 · 1 · 2, description „Opatrunek
  leczy więcej.”), `deftHand` „Wprawna dłoń” (the existing kind `duration` on `tend`, 2 minutes per
  rank, costs 1 · 1 · 2, „Opatrujesz szybciej.”) and `quickHealing` „Szybkie gojenie”
  (`healthRegain`, 0.05 per rank, costs 2 · 3, „Rany schodzą same szybciej — cecha, działa
  zawsze.”), each with the numerical `preview` whose base, step, unit and minimum question 3 of the
  planner's report settles (the orchestrator gives them in the handoff). The predispositions of
  `elementalMage` in `src/browser/sim/data/archetypes.ts` gain `tending`, last. So „Wytwórz —
  Opatrunek” and „Opatrz — Opatrunek” ending in effect add one practice to the tree (D-193), the tree
  enters the Understanding in the minute „Wytwórz” enters it with the bandage (D-195), and the
  bought „Wprawna dłoń” shortens „Opatrz” (D-374 holding). The kinds `healing` and `healthRegain`
  act in nothing until Slice 3. The tests that hold today that neither verb adds practice
  (`tests/sim/craft-and-tend.test.mjs`) and that „Wytwórz” and „Opatrz” with an item stay open with
  no predisposition (`tests/sim/repertoire.test.mjs`, D-120) change to the new rule; the count and
  table of skills of `tests/sim/data.test.mjs` and the table of D-379 of `tests/sim/skills.test.mjs`
  gain the tree; a new `tests/sim/tending.test.mjs` holds the tree's pairs and predisposition
  (Settlements row 5), its practice from each pair, its entry into the Understanding with
  „Wytwórz”, the repertoire without the predisposition and the shortened „Opatrz”.
- **Change:** `src/browser/sim/data/skills.ts` · `src/browser/sim/data/archetypes.ts` ·
  `tests/sim/data.test.mjs` · `tests/sim/skills.test.mjs` · `tests/sim/repertoire.test.mjs` ·
  `tests/sim/craft-and-tend.test.mjs` · `tests/sim/tending.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/testing.md` ·
  `src/browser/sim/skills.ts` · `src/browser/sim/understanding.ts` · `src/browser/sim/data/items.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:29-30` To do, items 1 and 2 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:51-56` Questions to settle, Q2 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:68-74` Questions to settle, Q6 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:214-215` Settlements to record, rows 5 and 6 ·
  `foundations/decisions.md:7549-7575` D-379 · `foundations/decisions.md:7654-7678` D-120 ·
  `foundations/decisions.md:7279-7299` D-191 · `foundations/decisions.md:7300-7318` D-192 ·
  `foundations/decisions.md:7319-7339` D-193 · `foundations/decisions.md:7359-7376` D-195 ·
  `foundations/decisions.md:7505-7517` D-374 · `foundations/decisions.md:7036-7055` D-145 ·
  `foundations/invariants.md:968-977` action-duration-minimum ·
  `foundations/glossary.md:5-11` character skill · `foundations/glossary.md:111-135` predisposition,
  archetype, Understanding, repertoire · `foundations/glossary.md:186-197` practice, trait ·
  `foundations/part_map.md:34-66` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/tending.test.mjs` (written first, failing on the base of the
  slice) · `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/skills.test.mjs` ·
  `npm test -- tests/sim/repertoire.test.mjs` · `npm test -- tests/sim/craft-and-tend.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm run typecheck` ·
  `python -B .the-way/elements/common/foundation_check.py`, which reports no quotation of the files
  this slice changes
- **Depends on:** Slice 1 · Row 5 · D-379 · D-120

## Current ranges of the foundation entries your section's *Read* names

The foundation step changed `foundations/decisions.md` before your base, so the lines moved. The ranges below hold; the entry is the range from its heading to the next heading. Invariants, the glossary and the part map stand as the plan gives them.

- D-379: `foundations/decisions.md:7577-7612` (the plan's base range 7549-7575)
- D-120: `foundations/decisions.md:7691-7715` (the plan's base range 7654-7678)
- D-191: `foundations/decisions.md:7304-7324` (the plan's base range 7279-7299)
- D-192: `foundations/decisions.md:7325-7343` (the plan's base range 7300-7318)
- D-193: `foundations/decisions.md:7344-7364` (the plan's base range 7319-7339)
- D-195: `foundations/decisions.md:7384-7401` (the plan's base range 7359-7376)
- D-374: `foundations/decisions.md:7533-7545` (the plan's base range 7505-7517)
- D-145: `foundations/decisions.md:7049-7074` (the plan's base range 7036-7055)

## Passages of the task your section's *Read* names (word for word)

#### `task_frozen.md:29-30` — To do, items 1 and 2

1. Gra ma dziewiąte drzewo umiejętności, „Opatrywanie małych ran”, które rozwijają „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” i „Ucisk — Opatrunek” (pytanie Q6), z progami wprawy 10 · 28 · 60 · 110 i z gałęziami (pytanie Q2): „Mocniejszy zwój” — opatrunek leczy o 5 zdrowia więcej na stopień, ceny 1 · 1 · 2; „Wprawna dłoń” — „Opatrz” trwa o 2 minuty krócej na stopień, ceny 1 · 1 · 2; „Szybkie gojenie” — zdrowie samo wraca szybciej o 0,05 na minutę gry na stopień, ceny 2 · 3; „Ucisk” — gałąź, która nie jest liczbą, cena 3. Liczby są ze starej gry; zadanie ich nie stroi. Drzewo rozwijają te trzy pary czynności i celu, nie same czynności: „Wytwórz” z innym celem, na przykład z tłukiem z zadania 9, tego drzewa nie rozwija (D-193: „An action ending in effect adds one practice to the character skill its pair of verb and target grows”); dane umiejętności wyliczają dziś przy drzewie same czynności (`src/browser/sim/data/skills.ts`, pole `actions` typu `SkillDef`), a „Wytwórz” i „Opatrz” to czynności z celem przedmiotu. Ustawienie domyślne do weta, nie wybór Mariusza: nowe drzewo stoi na końcu listy drzew — w danych umiejętności, w predyspozycjach maga i na ekranie Postać — za „Unik przed ciosem”.
2. Drzewo stoi wśród predyspozycji Maga żywiołów (`src/browser/sim/data/archetypes.ts`, `predispositions`), więc mag dalej może wytwarzać opatrunek i opatrywać: czynność, którą rozwija umiejętność spoza predyspozycji archetypu, jest dla postaci zamknięta (D-120).

#### `task_frozen.md:51-56` — Questions to settle, Q2

- Q2. Jakie gałęzie i liczby ma drzewo leczenia opatrunkiem oprócz Ucisku?
  - Answer: a) Jak w starym Loopie, plus Ucisk: progi wprawy 10 · 28 · 60 · 110 (cztery punkty); „Mocniejszy zwój” — opatrunek leczy o 5 więcej na stopień, ceny 1 · 1 · 2; „Wprawna dłoń” — opatrywanie krótsze o 2 minuty na stopień, ceny 1 · 1 · 2; „Szybkie gojenie” — zdrowie samo wraca szybciej o 0,05 na minutę na stopień, ceny 2 · 3; Ucisk — cena 3, jak inne gałęzie, które nie są liczbą („Obchód”, „Czysty płomień”, „Zwiad”). Liczby ze starej gry; według zasady o mapach nikt ich teraz nie stroi. Koszt pokazany przy tej drodze: dwa nowe rodzaje skutku gałęzi w kodzie gry i testach (leczenie z opatrunku i samoistny powrót zdrowia), dopisanie drzewa do D-379 i zmiana D-145 (opatrunek leczy więcej o kupione stopnie „Mocniejszego zwoju”) i D-387 (0,05 zdrowia na minutę to liczba postaci bez stopni „Szybkiego gojenia”). Słaby punkt: „najwięcej pracy w tym zadaniu, a „Szybkie gojenie” leczy też bez opatrunku, więc wyćwiczone drzewo ułatwia watahę także graczowi, który opatrunków nie wnosi”.
  - Not chosen:
    - b) Ucisk i „Wprawna dłoń”, progi i ceny jak w a na tyle, na ile trzeba — mniej kodu, bo poza Uciskiem żadnego nowego rodzaju skutku, ale po kupieniu obu nie ma już czego kupować; cofnięcie tanie.
    - c) Sam Ucisk, z progami do jego ceny — najmniej pracy, ale dalsze opatrywanie nic w drzewie nie daje; cofnięcie tanie.
  - Source: Mariusz, 2026-11-25, odpowiedź na piątą partię pytań, w której pytanie 2 było tym pytaniem z polecaną drogą a: „tutaj nie mam objekcji chyba, może być wszystko zgodnie z rekomendacjami” (rozmowa doprecyzowania `.runs/project-refinement/rana-i-opatrunek.md`, tura 17; brzmienie z tury 15, drogi b i c z dopisanymi przez prowadzącego progami i ceną Ucisku). Liczby starej gry: `the repository of the earlier game, loop`, gałąź `feat/archetypes`, `src/sim/data/skills.ts`, umiejętność `tending`.

#### `task_frozen.md:68-74` — Questions to settle, Q6

- Q6. Które czynności rozwijają drzewo leczenia opatrunkiem i jak się ono nazywa?
  - Answer: Część 1 — a) „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” i Ucisk — jedno drzewo, jak w starym Loopie i w liście umiejętności koncepcji gry: „opatrywanie małych ran (razem z wytwarzaniem opatrunku)”; nowe drzewo trafia do predyspozycji Maga żywiołów. Słaby punkt pokazany przy tej drodze: koncepcja mówi też „Granicę umiejętności wyznacza para czynność × cel”, a „Wytwórz — Opatrunek” i „Opatrz — Opatrunek” to dwie różne pary. Część 2 — nazwa „Opatrywanie małych ran”, jak w starym Loopie i w koncepcji: ustawienie domyślne pokazane do weta, bez weta.
  - Not chosen:
    - Część 1, b) Wytwarzanie opatrunku jako osobna umiejętność — drugie nowe drzewo, w którym nie ma czego kupić, dopóki ktoś nie wymyśli mu gałęzi; cofnięcie tanie.
    - Część 1, c) Tylko „Opatrz — Opatrunek” i Ucisk — drzewo rośnie mniej więcej o połowę wolniej, bo wytworzenie nic nie daje; cofnięcie tanie.
    - Część 2, inna nazwa, którą poda Mariusz — koszt żaden (droga b z brzmienia pytania przed zamianą części 2 na ustawienie domyślne).
  - Source: Mariusz, 2026-11-25, odpowiedź na piątą partię pytań, w której pytanie 4 było częścią 1 tego pytania z polecaną drogą a, a ustawienie domyślne 6 jego częścią 2: „tutaj nie mam objekcji chyba, może być wszystko zgodnie z rekomendacjami” (rozmowa doprecyzowania `.runs/project-refinement/rana-i-opatrunek.md`, tura 17; brzmienie z tury 15).

#### `task_frozen.md:214-215` — Settlements to record, rows 5 and 6

| 5 | Jedno drzewo „Opatrywanie małych ran” rozwijają „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” i „Ucisk — Opatrunek”. | data or code: dane umiejętności w `src/browser/sim/data/skills.ts` i predyspozycje maga w `src/browser/sim/data/archetypes.ts`, z testem, który je trzyma | Pytanie Q6, część 1 (Not chosen: b, c) — wybór Mariusza | czy wytwarzanie opatrunku jest osobną umiejętnością, czy nie daje wprawy wcale |
| 6 | Dziewiąta umiejętność, „Opatrywanie małych ran”, daje poziom i punkt przy 10, 28, 60 i 110 wprawy, a jej gałęzie to „Mocniejszy zwój” (+5 zdrowia z opatrunku na stopień, ceny 1 · 1 · 2), „Wprawna dłoń” (−2 minuty „Opatrz” na stopień, ceny 1 · 1 · 2), „Szybkie gojenie” (+0,05 zdrowia na minutę samoistnego powrotu na stopień, ceny 2 · 3) i „Ucisk” (cena 3). | sentence of D-379 | Pytanie Q2 (Not chosen: b, c) — wybór Mariusza; nazwa: pytanie Q6, część 2 (Not chosen: inna nazwa) — ustawienie domyślne bez weta | ile gałęzi ma drzewo, jakie są progi i ceny i jak się ono nazywa |

## What to read, besides those

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
