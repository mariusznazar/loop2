# Handoff — Slice 1 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 1; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `cd8ff84` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-1.md`. If the harness refuses
  that write, return the whole report as text in your final message instead.
- Do not run the whole gate (`npm test` with no argument); your checks are the slice's *Checks*.
  The tools of `tests/quality` are installed in `.runs/quality-venv`.

## Answers of step 4 (binding)

- Trust boundary: yes for the cycle — `assets/sprites/**` of the part `browser-view` (Slice 1 adds
  the PNG of the forest frame there; its review checks, as D-273 gives, that the file holds pixels
  alone and that the build copies from `assets/sprites/` only PNG files, only into what
  `npm run build` writes). A slice whose *Risk* is none touches no trust boundary; if yours comes to
  touch one, or `src/browser/sim/saved-game.ts`, say so in your report.
- Irreversible operation: no. Open design choice: none. Reserved choice: none.
- Answers the orchestrator gave (cycle record, questions table): the saved game state keeps its
  shape and `SAVED_GAME_VERSION` stays 3; „Dodaj regułę z tym” is disabled where the copy holds no
  rule group; the committed scene size is 672 × 304 (scale constant 2) until the human picks, the
  other size reached only locally; new rows of `guidelines/coding-browser-module.md` take the status
  `copy`.

## Environment

Windows 11; shells: Git Bash and PowerShell. Python's console output uses the ANSI code page: write
Polish text a script produces to a UTF-8 file rather than printing it, use forward slashes in paths
inside Python literals, and keep line endings when a script rewrites an existing file
(`newline=''`). Commit messages in English in the repository's style (`feat: :sparkles: …`,
`test: :white_check_mark: …`, `refactor: :recycle: …`, `docs: :memo: …`), files added by path —
never `git add -A`, `git add .` or `git commit -a`.

## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or
`blocked`), your commits, a one-line check result naming what failed or did not run, and the
report's path (or that the report is in your message). The report holds every check you ran with
its command and exit code, your own-work check, your questions and concerns, each reach beyond this
handoff, and **Searches not found or unclear** — each thing looked for and not found or unclear, or
`none`.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 1 — The picture of the forest frame

- **Goal:** `assets/sprites/forest-scene.png` is a PNG of 336 × 152 px: the still frame of a forest in snow, in full light, with no text, no figure, creature, fire or prop on it, not darkened. Compose it once, outside the product's code, from the old Loop's cut sprites of the pack Pixel Crawler in C:\Storage\repos\loop\public\sprites\ (`ground.png`, `pine_tall.png`, `pine_tall2.png`, `pine_low.png`, `pine_low2.png`, `tree_snow.png`, `sap_snow.png`), laid out as the array `DECOR` of C:\Storage\repos\loop\src\components\probe\Scene.tsx (around line 28) lays them out on the ground as that scene draws its ground, the bare tree and sapling of `DECOR` taken in their snow variants. Compose it with a one-off Python script using Pillow 12.3.0 (installed on this machine) kept in `.runs/task-cycles/ekran-przejscia/scene/`, which git ignores; no script, image library or dependency enters the repository. The file holds pixels alone (D-271): no chunk but `IHDR`, `PLTE` and `tRNS` where the pixels need them, `IDAT` and `IEND` — no text, time, gamma, colour-profile or physical-size chunk. The build copies it unchanged, as it copies every PNG file directly in `assets/sprites/`; the build is not changed. In `README.md`, where the sentence of `npm run build` names `assets/sprites/login-backdrop.png` as composed from pictures of Pixel Crawler by Anokolisa whose terms ask for no credit, name this picture the same way beside it. The report names the recipe: each source file, its place and its order in the frame, the variants taken, the script's path and the command that ran it, and the chunks the file holds.
- **Change:** `assets/sprites/forest-scene.png` · `README.md`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:40-42` To do · `.runs/task-cycles/ekran-przejscia/task.md:66-71` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:131-136` Context ·
  `foundations/decisions.md:5610-5636` D-271 · `foundations/decisions.md:5637-5661` D-272 · `foundations/decisions.md:5662-5692` D-273 · `foundations/decisions.md:1446-1458` D-76 · `foundations/invariants.md:1199-1208` sprite-file-content · `foundations/part_map.md:3-29` browser-view · `foundations/part_map.md:84-117` build-tools ·
  Foundation entries E12, E13, E14 ·
  `guidelines/styleguide-browser-view.md` ·
  `scripts/static-files.mjs`
- **Model:** cheaper
- **Risk:** trust boundary — `assets/sprites/**` of the part `browser-view`: its review checks, as D-273 gives, that the file holds pixels alone and that the build copies from `assets/sprites/` only PNG files and only into what `npm run build` writes
- **Checks:** a one-off Python reading of the chunk types and the size of `assets/sprites/forest-scene.png`, kept beside the script in the record directory, its output in the report; `npm run build`, then a byte comparison of `assets/sprites/forest-scene.png` with `dist/public/sprites/forest-scene.png`; `git check-ignore -v .runs/task-cycles/ekran-przejscia/scene/` showing the script's directory ignored
- **Depends on:** Foundation entries E12, E13, E14

## What you read

The ranges below are current at cd8ff84; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-271 — `foundations/decisions.md:5618-5644`
- D-272 — `foundations/decisions.md:5645-5671`
- D-273 — `foundations/decisions.md:5672-5702`
- D-76 — `foundations/decisions.md:1448-1460`
- sprite-file-content — `foundations/invariants.md:1199-1208`
- part `browser-view` — `foundations/part_map.md:3-29`
- part `build-tools` — `foundations/part_map.md:84-117`

### Entries written by the cycle's foundation step

- E12 — D-314 — new, „What does the background of the scene show?”, read it whole — `foundations/decisions.md:6719-6737`
- E13 — D-315 — new, „Where does the darkness of the scene stand?”, read it whole — `foundations/decisions.md:6738-6756`
- E14 — D-272 (part rewritten: „as the scene”) — read it whole — `foundations/decisions.md:5645-5671`

### Files (whole unless a range is given)

- `guidelines/styleguide-browser-view.md`
- `scripts/static-files.mjs`

### Passages of the frozen task, word for word (`.runs/task-cycles/ekran-przejscia/task.md`)

#### task.md:40-42 — To do

6. Na górze obszaru świata stoi nieruchomy kadr lasu w śniegu, w pełnym świetle (pytanie 2).
   - Kadr jest obrazem PNG z paczki Pixel Crawler, leży bezpośrednio w `assets/sprites/` i nie stoi na nim żaden tekst.
   - Prośba o scalenie pokazuje kadr na prawdziwym ekranie, z edytorem z zadania 5 w obszarze programu, w obu rozmiarach, 336 × 152 i 672 × 304; po uwadze Mariusza poprawka zostawia jeden z nich (pytanie 1).

#### task.md:66-71 — Questions to settle

- Pytanie 2. Co pokazuje nieruchomy kadr lasu: las w śniegu czy zielony, i czy jest w pełnym świetle?
  - Answer: Las w śniegu, z gotowych obrazków starego Loop; słaby punkt przyjęty z tą drogą: szron z zadania 18 gorzej widać na bieli, a śnieg stoi też przy 25 °C. Kadr jest w pełnym świetle, bo noc to warstwa nad kadrem, którą dokłada zadanie 18; do zadania 18 scena nie ma nocy.
  - Not chosen:
    - las zielony — inny las niż na logowaniu i wycinanie z arkuszy
    - kadr ciemny w pliku, droga pokazana na wypadek skreślenia cytatów o świetle — zadanie 18 wymienia plik
  - Source: pora roku: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, wiersz T29. Światło: cytaty nieskreślone przez Mariusza 2026-11-03, pakiet, punkt A6: plan_mvp2_loop2.md (sha256 36c4721a), cel zadania 18: „Noc w scenie jaśnieje razem z passą, utrata passy ściemnia las, rozwiązanie mapy daje pełny świt”; tamże, *Open questions*: „Jaki kolor ma warstwa nocy i świtu? Wartość wybiera Mariusz.”; definicja_mvp2_loop2.md (odcisk 9641f804), D-132, wiersz 691: „the scene showing a full dawn”.

#### task.md:131-136 — Context

- Scena 672 × 304 to ten sam obraz 336 × 152 w skali 2:1 (`rozpoznanie_mvp2\rozpoznanie_frajda.md:201`, `:251`), więc oba rozmiary pokazuje jeden plik.
- Scena starego Loop ma 336 × 152 i skaluje się całymi krotnościami (`C:\Storage\repos\loop\src\components\probe\Scene.tsx:18-22`).
- Wycięte obrazki starego Loop leżą w `C:\Storage\repos\loop\public\sprites\`, między innymi `ground.png`, `pine_tall.png`, `tree_snow.png` i `sap_snow.png`, a ich ułożenie w `Scene.tsx:28`.
- Pliki paczki i sposób ich cięcia opisuje *Context* dokumentu `logowanie_na_tle_gry_loop2.md`.
- Budowanie kopiuje tylko pliki PNG leżące bezpośrednio w `assets/sprites/` (`scripts/static-files.mjs:32-46`), a do obrazu serwera wchodzą przez `.dockerignore:9` i `Dockerfile:10`.
- Paczka Pixel Crawler nie wymaga wzmianki, więc zadanie nie dopisuje jej do wzmianek, o ile kadr pochodzi tylko z tej paczki.
