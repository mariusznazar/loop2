# Handoff — the executor of a slice of the task rana-i-opatrunek, Slice 3

You make one slice of a planned change in a task cycle of the-way, as an agent of the type `the-way-stage`.

## Delegation and boundary

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator. You never ask the human; a question goes back to the orchestrator in your report (status `questions`, as `make-change` section 6 gives), each with the answer you recommend. What the orchestrator answers is never the human's approval.

- You make: **slice 3** (`make-change` variant „a slice, or the retry of a slice”). Read `.the-way/task-cycle/change/SKILL.md` whole and, because you make a slice, `.the-way/task-cycle/change/slice.md` whole; read `ui_check.md` and `walkthrough.md` beside the `SKILL.md` only where its sections 3 and 6 send you to them for what your slice changes.
- Worktree and working directory: `the worktree's root` (branch `task/rana-i-opatrunek`). The pinned the-way is the worktree's `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. Work only on this branch, one agent at a time on it.
- The base of this slice: `be60238e3c93685d529fdb0e66c70077c06542b8` (`git rev-parse HEAD` shows it when you start). Your range is from it to your head.
- Your directory for working copies: `.runs/executor-3/` (relative to the worktree).
- Your report: `.runs/task-cycles/rana-i-opatrunek/reports/executor-3-report.md` (that file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, so its name begins with the role; where your tool refuses the write, return the report whole as your answer). The cycle record `cycle.md` and the other files of the record directory — other agents' handoffs, reports, findings, the plan — are not yours to read.
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

## Your section of the plan (word for word)

### Slice 3 — „Mocniejszy zwój” in the healing and „Szybkie gojenie” in the health that comes back

- **Goal:** The two new kinds of branch effect act. One function of `src/browser/sim/skills.ts`
  gives the health one piece of a healing item gives back to a character: the item's `healing` of
  the data plus the bought `healing` bonus (5 per rank of „Mocniejszy zwój”); „Opatrz” in
  `landUse` of `src/browser/sim/run.ts` gives back that health, never above full health (D-145,
  Settlements row 7), and Slice 4 uses the same function for Ucisk. `bodyMinute` of
  `src/browser/sim/body.ts` takes the health regained in a minute that is neither chilled nor
  starving as an argument whose default is the data's 0.05, and `minuteBeforePick` of
  `src/browser/sim/run.ts` passes the data's number plus the bought `healthRegain` bonus (0.05 per
  rank of „Szybkie gojenie”), the sum kept at the body's decimal places (D-387, Settlements row 8).
  A character with no rank of either branch heals and regains exactly as before (To do, item 6): the
  tests that expect 25 health from a bandage and 0.05 a minute stay unchanged and pass. New cases in
  `tests/sim/body.test.mjs` and `tests/sim/craft-and-tend.test.mjs`, written first, hold the health
  with each rank of the two branches, the cap at full health and the minutes of combat, in which the
  body stands still (D-60).
- **Change:** `src/browser/sim/skills.ts` · `src/browser/sim/body.ts` · `src/browser/sim/run.ts` ·
  `tests/sim/body.test.mjs` · `tests/sim/craft-and-tend.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/testing.md` · `src/browser/sim/data/skills.ts` · `src/browser/sim/data/balance.ts` ·
  `src/browser/sim/data/items.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:29-29` To do, item 1 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:38-38` To do, item 6 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:216-217` Settlements to record, rows 7 and 8 ·
  `foundations/decisions.md:7036-7055` D-145 · `foundations/decisions.md:6645-6663` D-387 ·
  `foundations/decisions.md:6369-6384` D-60 · `foundations/decisions.md:7549-7575` D-379 ·
  `foundations/decisions.md:7300-7318` D-192 · `foundations/invariants.md:226-235` simulation-inputs ·
  `foundations/invariants.md:1428-1437` function-and-file-size ·
  `foundations/glossary.md:192-197` trait · `foundations/part_map.md:34-66` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/body.test.mjs` · `npm test -- tests/sim/craft-and-tend.test.mjs`
  (their new cases written first, failing on the base of the slice) ·
  `npm test -- tests/sim/combat.test.mjs` · `npm test -- tests/sim/encounters.test.mjs` ·
  `npm test -- tests/sim/catch-up.test.mjs` · `npm test -- tests/view/body-row.test.mjs` ·
  `npm test -- tests/balance/agreement.test.mjs` ·
  `npm test -- tests/quality/test_function_and_file_size.py` · `npm run typecheck`
- **Depends on:** Slice 2 · D-145 · D-387 · D-144 (row 3)

## Current ranges of the foundation entries your section's *Read* names

The foundation step changed `foundations/decisions.md` before your base, so the lines moved. The ranges below hold; the entry is the range from its heading to the next heading. Invariants, the glossary and the part map stand as the plan gives them.

- D-145: `foundations/decisions.md:7049-7074` (the plan's base range 7036-7055)
- D-387: `foundations/decisions.md:6645-6668` (the plan's base range 6645-6663)
- D-60: `foundations/decisions.md:6369-6384` (the plan's base range 6369-6384)
- D-379: `foundations/decisions.md:7577-7612` (the plan's base range 7549-7575)
- D-192: `foundations/decisions.md:7325-7343` (the plan's base range 7300-7318)

## Passages of the task your section's *Read* names (word for word)

#### `task_frozen.md:29-29` — To do, item 1

1. Gra ma dziewiąte drzewo umiejętności, „Opatrywanie małych ran”, które rozwijają „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” i „Ucisk — Opatrunek” (pytanie Q6), z progami wprawy 10 · 28 · 60 · 110 i z gałęziami (pytanie Q2): „Mocniejszy zwój” — opatrunek leczy o 5 zdrowia więcej na stopień, ceny 1 · 1 · 2; „Wprawna dłoń” — „Opatrz” trwa o 2 minuty krócej na stopień, ceny 1 · 1 · 2; „Szybkie gojenie” — zdrowie samo wraca szybciej o 0,05 na minutę gry na stopień, ceny 2 · 3; „Ucisk” — gałąź, która nie jest liczbą, cena 3. Liczby są ze starej gry; zadanie ich nie stroi. Drzewo rozwijają te trzy pary czynności i celu, nie same czynności: „Wytwórz” z innym celem, na przykład z tłukiem z zadania 9, tego drzewa nie rozwija (D-193: „An action ending in effect adds one practice to the character skill its pair of verb and target grows”); dane umiejętności wyliczają dziś przy drzewie same czynności (`src/browser/sim/data/skills.ts`, pole `actions` typu `SkillDef`), a „Wytwórz” i „Opatrz” to czynności z celem przedmiotu. Ustawienie domyślne do weta, nie wybór Mariusza: nowe drzewo stoi na końcu listy drzew — w danych umiejętności, w predyspozycjach maga i na ekranie Postać — za „Unik przed ciosem”.

#### `task_frozen.md:38-38` — To do, item 6

6. Mapę z watahą dalej da się rozwiązać tym, co dały mapy przed nią, bez czekania na pętlę (D-438); zadanie nie robi z opatrunku warunku wejścia ani rozwiązania. Przejście programu, który nie wytwarza opatrunku, nie opatruje się i nie uciska, kończy się po zmianie tak samo jak przed nią, bo postać nowej gry nie ma stopni nowego drzewa — wynik watahy bez opatrunku, sprawdzony przy jej wejściu w zadaniu 3, przez to zadanie nie spada.

#### `task_frozen.md:216-217` — Settlements to record, rows 7 and 8

| 7 | Opatrunek przywraca tyle zdrowia, ile podają jego dane, więcej o kupione stopnie „Mocniejszego zwoju”. | sentence of D-145 | Pytanie Q2 (Not chosen: b, c) — wybór Mariusza | czy zdanie D-145 „gives back that healing” zostaje dosłowne, a stopnie gałęzi liczy się gdzie indziej |
| 8 | 0,05 zdrowia na minutę samoistnego powrotu to liczba postaci bez kupionych stopni „Szybkiego gojenia”; każdy stopień dokłada 0,05. | sentence of D-387 | Pytanie Q2 (Not chosen: b, c) — wybór Mariusza | czy „Szybkie gojenie” zmienia liczbę ciała z D-387, czy jest liczbą obok niej, i gdzie stoi wynik |

## What to read, besides those

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
