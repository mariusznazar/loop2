# Handoff — the executor of a slice of the task rana-i-opatrunek, Slice 1

You make one slice of a planned change in a task cycle of the-way, as an agent of the type `the-way-stage`.

## Delegation and boundary

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator. You never ask the human; a question goes back to the orchestrator in your report (status `questions`, as `make-change` section 6 gives), each with the answer you recommend. What the orchestrator answers is never the human's approval.

- You make: **slice 1** (`make-change` variant „a slice, or the retry of a slice”). Read `.the-way/task-cycle/change/SKILL.md` whole and, because you make a slice, `.the-way/task-cycle/change/slice.md` whole; read `ui_check.md` and `walkthrough.md` beside the `SKILL.md` only where its sections 3 and 6 send you to them for what your slice changes.
- Worktree and working directory: `the worktree's root` (branch `task/rana-i-opatrunek`). The pinned the-way is the worktree's `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. Work only on this branch, one agent at a time on it.
- The base of this slice: `6d07bf2045680fae3abb72169b395ec7121f6249` (`git rev-parse HEAD` shows it when you start). Your range is from it to your head.
- Your directory for working copies: `.runs/executor-1/` (relative to the worktree).
- Your report: `.runs/task-cycles/rana-i-opatrunek/reports/executor-1-report.md` (that file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it, so its name begins with the role; where your tool refuses the write, return the report whole as your answer). The cycle record `cycle.md` and the other files of the record directory — other agents' handoffs, reports, findings, the plan — are not yours to read.
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

### Slice 1 — Pairs of verb and target in the data of the skills

- **Goal:** A character skill names in its data the pairs of verb and target it grows (D-193,
  D-120), not a list of verbs: `SkillDef` in `src/browser/sim/data/skills.ts` replaces the field
  `actions` with a field `grownBy`, a list of pairs, each an action and, for an action that takes an
  item as its target, optionally that item; a pair with no item covers every target of its verb.
  The eight skills grow exactly the pairs they grow today, each a verb with no item. Every reader of
  the field reads the pairs: `practiced` in `src/browser/sim/skills.ts` takes the action's item
  where it has one (its callers in `src/browser/sim/run.ts` pass it; the calls of
  `src/browser/sim/combat.ts` pass kinds with no item and stay as they are); in
  `src/browser/sim/understanding.ts` the repertoire (`repertoireOf`, `actionInRepertoire`) keeps an
  action whose pair a skill among the predispositions grows or no skill grows, an item action being
  judged by its pair, and the kind staying in `repertoire.actions` where at least one of its pairs
  is open; the cases of item actions in `actionInRepertoire` and `undiscoveredPart` read whether a
  kind takes an item from `takesItem` of `src/browser/sim/action-targets.ts` instead of listing the
  kinds; a tree enters the Understanding with the first pair it grows whose verb and target the
  Understanding holds after the minute, at least one of them new in it (`newlyRevealed`, D-195).
  Behaviour does not change: only the test of `tests/sim/data.test.mjs` that reads the field („the
  character skills grow the listed pairs of verb and target, and the walks stand in none”) is
  rewritten for the new field, with the same pairs and the same free actions.
- **Change:** `src/browser/sim/data/skills.ts` · `src/browser/sim/skills.ts` ·
  `src/browser/sim/understanding.ts` · `src/browser/sim/run.ts` · `tests/sim/data.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/action-targets.ts` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/data/items.ts` · `src/browser/sim/combat.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:29-29` To do, item 1 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:214-214` Settlements to record, row 5 ·
  `foundations/decisions.md:7654-7678` D-120 · `foundations/decisions.md:7279-7299` D-191 ·
  `foundations/decisions.md:7319-7339` D-193 · `foundations/decisions.md:7359-7376` D-195 ·
  `foundations/decisions.md:8374-8392` D-443 · `foundations/decisions.md:8283-8302` D-126 ·
  `foundations/decisions.md:854-872` D-425 · `foundations/invariants.md:226-235` simulation-inputs ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:1428-1437` function-and-file-size ·
  `foundations/glossary.md:5-11` character skill · `foundations/glossary.md:111-135` predisposition,
  archetype, Understanding, repertoire · `foundations/glossary.md:186-191` practice ·
  `foundations/part_map.md:34-66` simulation
- **Model:** same — a change of the readers of the repertoire and of the Understanding across three
  modules, with the behaviour kept (the orchestrator's change of the plan's `cheaper`, at the plan's
  review)
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/sim/data.test.mjs` ·
  `npm test -- tests/sim/repertoire.test.mjs` · `npm test -- tests/sim/skills.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/craft-and-tend.test.mjs` ·
  `npm test -- tests/sim/rule-signs.test.mjs` · `npm test -- tests/sim/rules.test.mjs` ·
  `npm test -- tests/quality/test_function_and_file_size.py` — every one of them passing with no
  expectation changed but the shape test named in the Goal
- **Depends on:** D-120

## Current ranges of the foundation entries your section's *Read* names

The foundation step changed `foundations/decisions.md` before your base, so the lines moved. The ranges below hold; the entry is the range from its heading to the next heading. Invariants, the glossary and the part map stand as the plan gives them.

- D-120: `foundations/decisions.md:7691-7715` (the plan's base range 7654-7678)
- D-191: `foundations/decisions.md:7304-7324` (the plan's base range 7279-7299)
- D-193: `foundations/decisions.md:7344-7364` (the plan's base range 7319-7339)
- D-195: `foundations/decisions.md:7384-7401` (the plan's base range 7359-7376)
- D-443: `foundations/decisions.md:8411-8429` (the plan's base range 8374-8392)
- D-126: `foundations/decisions.md:8320-8339` (the plan's base range 8283-8302)
- D-425: `foundations/decisions.md:854-872` (the plan's base range 854-872)

## Passages of the task your section's *Read* names (word for word)

#### `task_frozen.md:29-29` — To do, item 1

1. Gra ma dziewiąte drzewo umiejętności, „Opatrywanie małych ran”, które rozwijają „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” i „Ucisk — Opatrunek” (pytanie Q6), z progami wprawy 10 · 28 · 60 · 110 i z gałęziami (pytanie Q2): „Mocniejszy zwój” — opatrunek leczy o 5 zdrowia więcej na stopień, ceny 1 · 1 · 2; „Wprawna dłoń” — „Opatrz” trwa o 2 minuty krócej na stopień, ceny 1 · 1 · 2; „Szybkie gojenie” — zdrowie samo wraca szybciej o 0,05 na minutę gry na stopień, ceny 2 · 3; „Ucisk” — gałąź, która nie jest liczbą, cena 3. Liczby są ze starej gry; zadanie ich nie stroi. Drzewo rozwijają te trzy pary czynności i celu, nie same czynności: „Wytwórz” z innym celem, na przykład z tłukiem z zadania 9, tego drzewa nie rozwija (D-193: „An action ending in effect adds one practice to the character skill its pair of verb and target grows”); dane umiejętności wyliczają dziś przy drzewie same czynności (`src/browser/sim/data/skills.ts`, pole `actions` typu `SkillDef`), a „Wytwórz” i „Opatrz” to czynności z celem przedmiotu. Ustawienie domyślne do weta, nie wybór Mariusza: nowe drzewo stoi na końcu listy drzew — w danych umiejętności, w predyspozycjach maga i na ekranie Postać — za „Unik przed ciosem”.

#### `task_frozen.md:214-214` — Settlements to record, row 5

| 5 | Jedno drzewo „Opatrywanie małych ran” rozwijają „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” i „Ucisk — Opatrunek”. | data or code: dane umiejętności w `src/browser/sim/data/skills.ts` i predyspozycje maga w `src/browser/sim/data/archetypes.ts`, z testem, który je trzyma | Pytanie Q6, część 1 (Not chosen: b, c) — wybór Mariusza | czy wytwarzanie opatrunku jest osobną umiejętnością, czy nie daje wprawy wcale |

## What to read, besides those

The guideline files and the code and test files your section's *Read* names, each whole (a file given with a range of lines: that range), before you change them; reach for more only as `make-change` section 1 says, and name each reach in your report.
