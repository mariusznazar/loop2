# Handoff — the executor of a slice of the task rana-i-opatrunek, Slice 5

You make one slice of a planned change in a task cycle of the-way, as an agent of the type `the-way-stage`.

## Delegation and boundary

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator. You never ask the human; a question goes back to the orchestrator in your report (status `questions`, as `make-change` section 6 gives), each with the answer you recommend. What the orchestrator answers is never the human's approval.

- You make: **slice 5** (`make-change` variant „a slice, or the retry of a slice”). Read `.the-way/task-cycle/change/SKILL.md` whole and, because you make a slice, `.the-way/task-cycle/change/slice.md` whole; read `ui_check.md` and `walkthrough.md` beside the `SKILL.md` only where its sections 3 and 6 send you to them for what your slice changes.
- Worktree and working directory: `the worktree's root` (branch `task/rana-i-opatrunek`). The pinned the-way is the worktree's `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. Work only on this branch, one agent at a time on it.
- The base of this slice: `7bee096f03aaff62280b63b32d5280c8ecd13efd` (`git rev-parse HEAD` shows it when you start). Your range is from it to your head.
- Your directory for working copies: `.runs/executor-5/` (relative to the worktree).
- Your report: `.runs/task-cycles/rana-i-opatrunek/reports/executor-5-report.md` (that file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, so its name begins with the role; where your tool refuses the write, return the report whole as your answer). The cycle record `cycle.md` and the other files of the record directory — other agents' handoffs, reports, findings, the plan — are not yours to read.
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
- Slice 4 is made and reviewed (commits `72840676`, `16e9e93e`, fix `7bee096f`; the review passed). The tests that it left failing, as the plan announces, are yours: `tests/sim/data.test.mjs` (3 tests, the lists of the actions of the data), `tests/sim/craft-and-tend.test.mjs` (2 tests: expectations made stale because „Ucisk” enters the Understanding with the tree — D-195 — at the first moss and at the first bandage, whose fixture has no tree in the Understanding). Your *Goal* adds, by the orchestrator's edit of the plan: `tests/sim/action-targets.test.mjs` (3 tests) and `tests/sim/team.test.mjs` (1 test), which fail since Slice 2 put the tree into the data, and the eleven stale `decision:` quotation lines that `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` lists in `tests/sim/body.test.mjs`, `tests/sim/craft-and-tend.test.mjs` and `tests/sim/tending.test.mjs` (run it first to see them). Change only what the data change makes stale; keep each changed expectation's source in the foundation; on a quotation line change nothing but the quotation. At the end `foundation_check.py --skip-test-citations` must exit 0.
- Measure each failing test of your list on your slice's base only if it is one the *Goal* does not name.

## Your section of the plan (word for word)

### Slice 5 — The tests of the data and of discovery agree with Ucisk

- **Goal:** The tests of the simulation that list the actions of the data, the group „Żywność i
  walka” of the pick (D-290: „Zjedz — jagoda”, „Opatrz”, „Uderz — patyk”, „Kopnij”, „Odskocz”,
  „Ucisk”, „Załóż”), the free actions, the revealing event of each action (Ucisk with the tree
  `tending`, D-195), D-144 and D-150 hold the data as Slice 4 left it, and the tests of the minute
  in which the tree enters the Understanding name Ucisk among what that minute reveals. Only
  expectations that Slice 4's data change, each with its source in the foundation, change;
  `tests/sim/data.test.mjs`, `tests/sim/craft-and-tend.test.mjs` and `tests/sim/discovery.test.mjs`
  pass again. The slice also repairs, by the orchestrator's edit of the plan at the end of Slice 4
  (the earlier slices' checks did not reach them): `tests/sim/action-targets.test.mjs` (three tests
  fail since Slice 2 put the tree into the data: the two that hold that „Wytwórz” and „Opatrz” with
  the bandage lie in the repertoire, and the one that says neither verb is grown by a character
  skill, whose expectations follow the task's item 1 and D-120 as they now stand) and
  `tests/sim/team.test.mjs` (one test, the created character's record, which holds the data of the
  mage); and the `decision:` quotation lines that `python -B
  .the-way/elements/common/foundation_check.py --skip-test-citations` lists in
  `tests/sim/body.test.mjs`, `tests/sim/craft-and-tend.test.mjs` and `tests/sim/tending.test.mjs`
  (eleven at the end of Slice 4, written by Slices 2 to 4 against the wording the decisions had
  before the foundation step): each is changed to the opening of the binding sentence that now says
  the same, and no assertion beside it changes. Only expectations that the change of the data makes
  stale change; each keeps its source in the foundation.
- **Change:** `tests/sim/data.test.mjs` · `tests/sim/craft-and-tend.test.mjs` ·
  `tests/sim/discovery.test.mjs` · `tests/sim/action-targets.test.mjs` · `tests/sim/team.test.mjs` ·
  `tests/sim/body.test.mjs` · `tests/sim/tending.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/data/skills.ts` · `tests/sim/action-targets.test.mjs:340-420` · `tests/sim/team.test.mjs:60-140` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:29-30` To do, items 1 and 2 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:31-31` To do, item 3 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:210-219` Settlements to record, rows 1 to 10 ·
  `foundations/decisions.md:9968-9996` D-290 · `foundations/decisions.md:7007-7035` D-144 ·
  `foundations/decisions.md:7124-7138` D-150 · `foundations/decisions.md:7359-7376` D-195 ·
  `foundations/decisions.md:6985-7006` D-143 · `foundations/decisions.md:7549-7575` D-379 ·
  `foundations/decisions.md:7654-7678` D-120 · `foundations/part_map.md:34-66` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/craft-and-tend.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/action-targets.test.mjs` ·
  `npm test -- tests/sim/team.test.mjs` · `npm test -- tests/sim/body.test.mjs` ·
  `npm test -- tests/sim/tending.test.mjs` · `npm test -- tests/sim/skills.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`, which exits 0
  (no quotation of any test stale)
- **Depends on:** Slice 4

## Current ranges of the foundation entries your section's *Read* names

The foundation step changed `foundations/decisions.md` before your base, so the lines moved. The ranges below hold; the entry is the range from its heading to the next heading. Invariants, the glossary and the part map stand as the plan gives them.

- D-290: `foundations/decisions.md:10005-10033` (the plan's base range 9968-9996)
- D-144: `foundations/decisions.md:7012-7048` (the plan's base range 7007-7035)
- D-150: `foundations/decisions.md:7143-7163` (the plan's base range 7124-7138)
- D-195: `foundations/decisions.md:7384-7401` (the plan's base range 7359-7376)
- D-143: `foundations/decisions.md:6990-7011` (the plan's base range 6985-7006)
- D-379: `foundations/decisions.md:7577-7612` (the plan's base range 7549-7575)
- D-120: `foundations/decisions.md:7691-7715` (the plan's base range 7654-7678)

## Passages of the task your section's *Read* names (word for word)

#### `task_frozen.md:29-30` — To do, items 1 and 2

1. Gra ma dziewiąte drzewo umiejętności, „Opatrywanie małych ran”, które rozwijają „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” i „Ucisk — Opatrunek” (pytanie Q6), z progami wprawy 10 · 28 · 60 · 110 i z gałęziami (pytanie Q2): „Mocniejszy zwój” — opatrunek leczy o 5 zdrowia więcej na stopień, ceny 1 · 1 · 2; „Wprawna dłoń” — „Opatrz” trwa o 2 minuty krócej na stopień, ceny 1 · 1 · 2; „Szybkie gojenie” — zdrowie samo wraca szybciej o 0,05 na minutę gry na stopień, ceny 2 · 3; „Ucisk” — gałąź, która nie jest liczbą, cena 3. Liczby są ze starej gry; zadanie ich nie stroi. Drzewo rozwijają te trzy pary czynności i celu, nie same czynności: „Wytwórz” z innym celem, na przykład z tłukiem z zadania 9, tego drzewa nie rozwija (D-193: „An action ending in effect adds one practice to the character skill its pair of verb and target grows”); dane umiejętności wyliczają dziś przy drzewie same czynności (`src/browser/sim/data/skills.ts`, pole `actions` typu `SkillDef`), a „Wytwórz” i „Opatrz” to czynności z celem przedmiotu. Ustawienie domyślne do weta, nie wybór Mariusza: nowe drzewo stoi na końcu listy drzew — w danych umiejętności, w predyspozycjach maga i na ekranie Postać — za „Unik przed ciosem”.
2. Drzewo stoi wśród predyspozycji Maga żywiołów (`src/browser/sim/data/archetypes.ts`, `predispositions`), więc mag dalej może wytwarzać opatrunek i opatrywać: czynność, którą rozwija umiejętność spoza predyspozycji archetypu, jest dla postaci zamknięta (D-120).

#### `task_frozen.md:31-31` — To do, item 3

3. Kupiona gałąź Ucisk otwiera czynność walki „Ucisk — {rzecz}”, tak jak gałąź „Obchód” otwiera „Obchód — {zasób}” (pytanie Q1); jej cele to przedmioty, którym dane gry dają leczenie — dziś sam opatrunek. W turze walki zużywa jedną sztukę z kieszeni pasa — miejsca „pod ręką” wyposażenia postaci, które wnosi zadanie 8 — a pusta kieszeń uzupełnia się z plecaka tak, jak zadanie 8 uzupełnia miejsca pod ręką; „Opatrz” poza walką dalej bierze opatrunek z plecaka (pytanie Q5). Dane opatrunku mówią, że pasuje do kieszeni pasa, jeśli nie mówi tego już zadanie 8. Ucisk przywraca tyle zdrowia, co „Opatrz” tym samym przedmiotem — dziś 25, więcej o kupione stopnie „Mocniejszego zwoju” — nigdy ponad pełne zdrowie; przy pełnym zdrowiu się nie wykonuje (pytanie Q7, część 1). „Opatrz” dalej nie działa w walce (D-140, D-145). Gracz widzi przy Ucisku to, co reguły gry dają każdej czynności: czas „tura” (D-293); w komórce wyboru czynności bez ceny, a przy celu i przy wybranej czynności cenę, np. „Ucisk — Opatrunek (1 opatrunek)” (D-363); powody odmowy „zdrowie pełne” przed „brakuje {ile} × {rzecz}”, ten drugi wtedy, gdy opatrunku nie ma ani w kieszeni, ani w plecaku, z którego kieszeń się uzupełnia (D-380); poza walką regułę bursztynową z powodem „tylko w walce” (D-309); bez kupionej gałęzi powód „gałąź niewykupiona” (D-289). Ucisk ma tę samą ikonę co „Opatrz”, `bandage-roll` (pytanie Q7, część 2), i stoi w wyborze czynności w grupie „Żywność i walka”, za „Odskocz” (pytanie Q7, ustawienie domyślne).

#### `task_frozen.md:210-219` — Settlements to record, rows 1 to 10

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

## What to read, besides those

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
