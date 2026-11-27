# Handoff — the executor of a slice of the task rana-i-opatrunek, Slice 11

You make one slice of a planned change in a task cycle of the-way, as an agent of the type `the-way-stage`.

## Delegation and boundary

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator. You never ask the human; a question goes back to the orchestrator in your report (status `questions`, as `make-change` section 6 gives), each with the answer you recommend. What the orchestrator answers is never the human's approval.

- You make: **slice 11** (`make-change` variant „a slice, or the retry of a slice”). Read `.the-way/task-cycle/change/SKILL.md` whole and, because you make a slice, `.the-way/task-cycle/change/slice.md` whole; read `ui_check.md` and `walkthrough.md` beside the `SKILL.md` only where its sections 3 and 6 send you to them for what your slice changes.
- Worktree and working directory: `the worktree's root` (branch `task/rana-i-opatrunek`). The pinned the-way is the worktree's `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. Work only on this branch, one agent at a time on it.
- The base of this slice: `878fc9e987d763813f7ceef467e2348f8a9c4528` (`git rev-parse HEAD` shows it when you start). Your range is from it to your head.
- Your directory for working copies: `.runs/executor-11/` (relative to the worktree).
- Your report: `.runs/task-cycles/rana-i-opatrunek/reports/executor-11-report.md` (that file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, so its name begins with the role; where your tool refuses the write, return the report whole as your answer). The cycle record `cycle.md` and the other files of the record directory — other agents' handoffs, reports, findings, the plan — are not yours to read.
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
- The main checkout of the repository holds someone else's uncommitted edit of the `.claude` copy of the balance skill (it documents `--gear`); it is not in this worktree and is not yours: change the two committed copies only where the plan says (the count of the reference programs), keeping them byte for byte alike.
- Report, for the orchestrator's measurement at the end of the cycle: the identifier (label) of the new program, its take list (the chest its „Zabierz” list asks for) and the exact commands you ran, so that the orchestrator can run `sweep` with `--chest`, `--ranks pressure=1` and `--gear pocket1=bandage`.

## Your section of the plan (word for word)

### Slice 11 — The reference program that brings bandages and tends with them

- **Goal:** `tests/sim/reference-programs.mjs` ends with a new reference program, after
  `forestSettledVariantExample`, last in `REFERENCE_PROGRAMS`, so that the labels of the older
  programs do not move (D-427, D-428): it takes bandages from the chest with its take list, standing
  before what gives way to them within the cap of 15 pieces spent in the order of the list
  (`src/browser/sim/trip.ts`, „One shared budget, spent in list order”), tends itself with them
  outside combat with „Opatrz” and holds in its group of combat a rule of Ucisk before the strike;
  its comment says that it depends on the branch Ucisk. The program is written once, with sensible
  thresholds of health, from the groups of the best program of the map with the wolf pack (P10,
  `forestDeepBest`); a rule is changed only where the trace of a run shows that it plainly does not
  work, and no threshold is chosen for the result (To do, item 5). Short helpers for „Opatrz” and
  Ucisk join the notation of the file. `tests/balance/agreement.test.mjs` gains a case of that
  program on `forestPack` with Ucisk bought and a bandage in a pocket, which ends alike through the
  game and through the instrument (instrument-game-agreement). Both copies of the balance skill,
  `.claude/skills/loop2-balance/SKILL.md` and `.agents/skills/loop2-balance/SKILL.md`, byte for byte
  alike, give the new number of reference programs where they give 23.
- **Change:** `tests/sim/reference-programs.mjs` · `tests/balance/agreement.test.mjs` ·
  `.claude/skills/loop2-balance/SKILL.md` · `.agents/skills/loop2-balance/SKILL.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/sim/trip.ts` ·
  `src/browser/sim/data/maps.ts:140-161` forestPack ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:33-39` To do, items 5 to 7 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:88-94` Questions to settle, Q10 ·
  `foundations/decisions.md:12508-12522` D-427 · `foundations/decisions.md:12523-12539` D-428 ·
  `foundations/decisions.md:12540-12554` D-429 · `foundations/decisions.md:6176-6194` D-438 ·
  `foundations/decisions.md:7007-7035` D-144 · `foundations/decisions.md:7036-7055` D-145 ·
  `foundations/decisions.md:8866-8886` D-187 · `foundations/invariants.md:1438-1447`
  instrument-game-agreement · `foundations/glossary.md:302-307` wall ·
  `foundations/part_map.md:34-66` simulation · `foundations/part_map.md:128-159` balance-tools,
  agent-workflow
- **Model:** same — the program is written once by judgment and read in a trace, not tuned
- **Risk:** none
- **Checks:** `npm test -- tests/balance/agreement.test.mjs` (its new case written first, failing on
  the base of the slice) · `npm test -- tests/balance/cli.test.mjs` ·
  `npm test -- tests/balance/check-map.test.mjs` · `npm test -- tests/balance/progression.test.mjs` ·
  `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` ·
  `npm run --silent balance -- programs` (the new program is the last label) ·
  `npm run --silent balance -- trace --map forestPack --program <its identifier> --chest <its take list> --ranks pressure=1 --gear pocket1=bandage --seeds 1`
  (each rule of bandages acts where its condition holds) ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 6 · Slice 7 · Slice 8 · Slice 9 · Slice 10

## Current ranges of the foundation entries your section's *Read* names

The foundation step changed `foundations/decisions.md` before your base, so the lines moved. The ranges below hold; the entry is the range from its heading to the next heading. Invariants, the glossary and the part map stand as the plan gives them.

- D-427: `foundations/decisions.md:12547-12561` (the plan's base range 12508-12522)
- D-428: `foundations/decisions.md:12562-12578` (the plan's base range 12523-12539)
- D-429: `foundations/decisions.md:12579-12593` (the plan's base range 12540-12554)
- D-438: `foundations/decisions.md:6176-6194` (the plan's base range 6176-6194)
- D-144: `foundations/decisions.md:7012-7048` (the plan's base range 7007-7035)
- D-145: `foundations/decisions.md:7049-7074` (the plan's base range 7036-7055)
- D-187: `foundations/decisions.md:8903-8923` (the plan's base range 8866-8886)

## Passages of the task your section's *Read* names (word for word)

#### `task_frozen.md:33-39` — To do, items 5 to 7

5. Mapa z watahą, którą wnosi zadanie 3, staje się ścianą, która pyta o opatrunek: opatrunek poprawia na niej wynik, a jego brak nie zamyka ani wejścia, ani rozwiązania (cel zadania w planie; wpis „(new) — How may a map differ from the map that opens it?”: „A wall never refuses to be entered or solved for the lack of the thing it asks for.”). Po zmianie zadanie robi jedno sprawdzenie przyrządem balansu na mapie z watahą i na Lesie — głębiej, wszystkimi programami wzorcowymi, wśród nich nowym, który wnosi opatrunki ze skrzynki i się nimi opatruje (pytanie Q10):
   - Nowy program wzorcowy bierze opatrunki ze skrzynki listą „Zabierz”, opatruje się nimi poza walką i ma w grupie walki regułę z Uciskiem przed ciosem. Stoi na końcu listy programów wzorcowych w `tests/sim/reference-programs.mjs` (D-427), żeby etykiety `P1`, `P2`… starszych programów się nie przesunęły (D-428), a jego komentarz mówi, że zależy od gałęzi Ucisk. Lista „Zabierz” mieści opatrunki w pułapie plecaka, 15 sztuk wydawanych po kolei listy (`src/browser/sim/trip.ts`, komentarz „One shared budget, spent in list order”), więc opatrunki stoją na niej przed tym, co im ustępuje miejsca. Program pisze się raz, z rozsądnymi progami zdrowia; poprawia się w nim tylko regułę, która w śladzie przejścia (tryb `trace`) wyraźnie nie działa, a progów nie dobiera się pod wynik.
   - Kolejność — czy wataha jest dalej trudniejsza od Lasu — głębiej — mierzy miara z wpisu „(new) — How may a map differ from the map that opens it?” (definicja, odcisk 23150d4e): „measured with one character on both maps — the one the balance instrument's mode `progression` builds for the map that opens it, from what the maps before that one gave — the best reference program solves a smaller share of its map runs than of those of the map that opens it”. Obie mapy mierzy więc jedna postać, ta, którą tryb `progression` buduje dla Lasu — głębiej, na danych gry z gałęzi zmiany, a każda mapa liczy się swoim najlepszym programem wzorcowym, nowy program też. Przed scaleniem zadania 4, które dokłada tę miarę do trybu `progression`, mierzy się ją skryptem `.runs/k9-measure/same-character.mjs` repozytorium loop2 (roboczym, nieśledzonym przez git); skrypt czyta zbudowaną grę ze ścieżek względnych od swojego katalogu, więc cykl kopiuje go do `.runs/k9-measure/` swojego drzewa roboczego, buduje tam grę (`node scripts/build.mjs`) i odczytuje sekcję mapy otwieranej przez Las — głębiej, w której „verdict: harder” znaczy, że wataha wychodzi trudniejsza (`.runs/k9-measure/d448-handoff.md`, sekcja 8). Po scaleniu zadania 4 mierzy się ją trybem `progression`.
   - Opis prośby o scalenie pokazuje tabelę wyników bez treści programów (D-428), dla watahy i dla Lasu — głębiej, z trzema wierszami: najlepszy program bez opatrunku i nowy program z opatrunkami, oba postacią o umiejętnościach nowej postaci, oraz nowy program postacią, której jedyną zmianą jest kupiony Ucisk (w przyrządzie stopień gałęzi ustawia flaga `--ranks`, której tryb `progression` nie ma). Każdy wiersz mierzy program ze skrzynką, której żąda jego lista „Zabierz”, a wiersz z Uciskiem — z opatrunkiem także w kieszeni pasa, tak jak przyrząd daje postaci wyposażenie po zadaniu 8. Wiersze nazywają opatrunek i Ucisk, bo taką tabelę wybrał Mariusz (pytanie Q10) — to wyjątek od zdania skilla przyrządu „Name no branch, no skill and no rank to the person” (`.claude/skills/loop2-balance/SKILL.md`, punkt o tabeli trybu `check-map`).
   - Sprawdzenie nie ma progu: cykl nie zmienia po nim żadnych liczb gry, a gdy wataha przestanie być trudniejsza od Lasu — głębiej, mówi to w opisie prośby.
6. Mapę z watahą dalej da się rozwiązać tym, co dały mapy przed nią, bez czekania na pętlę (D-438); zadanie nie robi z opatrunku warunku wejścia ani rozwiązania. Przejście programu, który nie wytwarza opatrunku, nie opatruje się i nie uciska, kończy się po zmianie tak samo jak przed nią, bo postać nowej gry nie ma stopni nowego drzewa — wynik watahy bez opatrunku, sprawdzony przy jej wejściu w zadaniu 3, przez to zadanie nie spada.
7. Zadanie nie zmienia liczb mapy z watahą: to, jak często mapa przechodzi z opatrunkiem i bez niego, nie jest wymaganiem gry (wpis „(new) — Which numbers of a map are requirements of the game?”), a sprawdzenie z punktu 5 jest bez strojenia (pytanie Q10). Dane mapy nie dostają też żadnego znacznika ściany. Mech na watasze zostaje taki, jak wniesie go zadanie 3, którego cykl o nim decyduje (pytanie „Mech na mapie z watahą”). Liczb wilka zadanie nie zmienia — trzyma je D-144, a ten sam wilk walczy na Lesie — głębiej.

#### `task_frozen.md:88-94` — Questions to settle, Q10

- Q10. Czy i jak zadanie pokazuje przyrządem balansu, że opatrunek poprawia wynik na watasze i że wataha po jego zmianach dalej jest trudniejsza od Lasu — głębiej?
  - Answer: Jedno sprawdzenie przyrządem balansu po zmianie, na mapie z watahą i na Lesie — głębiej, z nowym programem wzorcowym, który wnosi opatrunki ze skrzynki i się opatruje; w opisie prośby o scalenie tabela wyników: bez opatrunku, z opatrunkiem i z Uciskiem; bez progu i bez strojenia; gdy wataha przestanie być trudniejsza od Lasu — głębiej, cykl pokazuje to w opisie prośby, zamiast zmieniać liczby. Ustawienie domyślne pokazane do weta w brzmieniu prowadzącego projekt, ułożonym po krytyce pytania, bez weta.
  - Not chosen (drogi wcześniejszego brzmienia pytania, z tury 15 rozmowy, zastąpione tym ustawieniem po krytyce; zapis partii nie podaje, którą z nich pokazano jako inną drogę):
    - a) w brzmieniu z tury 15 — z warunkami, że program z opatrunkami rozwiązuje watahę częściej niż najlepszy program bez nich, a najlepszy program rzadziej niż Las — głębiej, i ze strojeniem liczb watahy, gdy kolejność się odwróci: krytyka wskazała, że warunek „częściej z opatrunkiem” robi z udziału przejść z rzeczą i bez niej wymaganie, którego definicja nie stawia, i że a nie mówi, co się dzieje, gdy sprawdzenie nie wyjdzie.
    - b) Tylko porównanie z opatrunkiem i bez, bez kolejności — jeśli program z opatrunkami podniesie wynik watahy ponad wynik Lasu — głębiej, nikt tego nie zauważy; cofnięcie tanie.
    - c) Bez przyrządu, same testy gry — programu wzorcowego z opatrunkiem nie ma do zadania 14, a to, że opatrunek poprawia wynik na watasze, zostaje założeniem; cofnięcie tanie.
  - Source: Mariusz, 2026-11-25, odpowiedź na piątą partię pytań, w której ustawienie domyślne 8 było tym pytaniem: „tutaj nie mam objekcji chyba, może być wszystko zgodnie z rekomendacjami” (rozmowa doprecyzowania `.runs/project-refinement/rana-i-opatrunek.md`, tura 17); krytyka: `.runs/project-refinement/critique-round-turn15.md` w repozytorium loop2: „Q10 (:869-873): way a's condition „częściej z opatrunkiem” turns the with/without share into a requirement (definicja:281 says it is none); what happens on failure not said; a default candidate.”

## What to read, besides those

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
