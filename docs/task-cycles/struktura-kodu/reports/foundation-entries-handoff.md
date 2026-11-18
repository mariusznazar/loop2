# Handoff — the agent of the plan's *Foundation entries*

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; no answer of the orchestrator is that person's approval. You never ask the human: a question goes back to the orchestrator in your report, with the status `blocked` or `questions` as your method gives it.

## Where

- Worktree (your working directory, the root you work from): `<worktree root>`, branch `task/struktura-kodu`, base `a3d913dac87160f56b194ce863c60145a551765a`. You are the only agent writing in the worktree now.
- Process pin: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: the foundation step for the plan's *Foundation entries* — write the three entries below, nothing else, and return before any slice. Read whole `.the-way/task-cycle/skill/foundation_step.md`, and whole the `SKILL.md` of the element of each entry as it gives (`.the-way/elements/decisions/skill/SKILL.md` for the decisions, `.the-way/elements/invariants/skill/SKILL.md` for the invariant; the project entry points `.claude/skills/the-way-record-decision/SKILL.md` and `.claude/skills/the-way-record-invariant/SKILL.md` name them). You have no skill tool: a skill named by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file. Your own method for commits and the report is `.the-way/task-cycle/change/SKILL.md` (`make-change`) — read it whole; it has no row for your stage, so this handoff names the stage: "the foundation step of the plan's *Foundation entries*".
- Frozen task: `.runs/task-cycles/struktura-kodu/task-frozen.md` (read whole). Plan: `.runs/task-cycles/struktura-kodu/plan.md` (read the *Foundation entries* block and the *Choices* table; the slices are for other agents).
- Answers of the cycle's step 4: no trust boundary, no irreversible operation, no open design choice, no reserved choice; planned route.
- Directory for working copies: `.runs/foundation-entries/`. Report: `.runs/task-cycles/struktura-kodu/reports/foundation-entries-report.md`.
- Product rules you follow: read `AGENTS.md`; foundation entries are written only through the project skills (the entry points above). Commit explicitly by path (`git add <file> <file>`, never `-A`, `.` or `-a`); commit messages in English in the style of the repository's log (`docs: :card_file_box: ...`); after the first commit check `git log -1 --format='%h %ae'` shows the private address. Run no test and never the full gate. You run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (see the plan's block below).

## The cycle's choices that bind your entries

- Q1 (orchestrator, binds): the rule, thresholds and exceptions are as the task settles (`accountRoutes` in `src/server/account-routes.ts` and `src/browser/sim/saved-game.ts`, no others). The cycle writes no other exception and splits neither `startApp`, `createProgramsEntry` nor `src/browser/kitchen-sink/kitchen-sink.tsx`. The invariant is *Violated* `yes`; its sentence names no function or file over a threshold (they go stale): the set that keeps it violated stands at the marking of its test, which Slice 1 writes (Q3). The task's wording "while `createGameView` and `startApp` stand above the limit" is carried out with the set found at the base, not with `createGameView`, whose split has been merged: do not write `createGameView` as a violator anywhere.
- Q4 (orchestrator): row 1's "w całym kodzie objętym lintowaniem (aplikacja, skrypty, testy)" means every file the linter of D-29 lints (application, scripts, tests, the scripts of deployment and the three agent-workflow directories D-29 names, and the two root configuration files); the file rule covers the same files outside `tests/`. Say the scope in words in the decision. No file added by that reading is over a threshold, so no exception follows.
- The run of the rule is a separate run of the product's ESLint beside D-29 (its *Relations* must say so, so that review does not take the second configuration for a break of D-29; D-29 itself is not changed; the task's *Decisions in play* gives D-29's sentence). The configuration will stand in `tests/quality/` (build-tools already holds it; no part-map change).
- Where the invariant's *Part* names the parts holding the code the run reads and the part holding its configuration, choose by the part map (`foundations/part_map.md`) and the invariants template.

## The plan's *Foundation entries* (copied word for word from `plan.md`)

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| The rule of the size of a function and a file: a function holds at most 200 lines of code in all the code the linter reaches (application, scripts, tests), a file at most 800 in the application's code and the scripts (tests outside the file rule), counted without comments and blank lines, the lines of nested functions counted in the function that holds them; exceptions the function `accountRoutes` (`src/server/account-routes.ts`) and the file `src/browser/sim/saved-game.ts`, each with its reason; the rule runs as a separate run of the product's ESLint beside D-29, and its *Relations* say how it stands beside D-29, so that review does not take the second configuration for a break of D-29 (the task's *Decisions in play*) | decision (new) | Settlements row 1 · To do 1 | Slice 1 sets the thresholds, the scope and the two exceptions in the run's configuration and names the decision in `guidelines/coding.md`; Slices 2–6 bring their function under its threshold |
| No function and no file the rule of size reaches is over the thresholds of row 1's decision, other than its exceptions; *Method* `test`, *Violated* `yes` (WAY-51), *Part* the parts holding the code the run reads and the part holding its configuration | invariant (new) | Settlements row 2 · To do 2–3 · cycle choice Q1 | Slice 1 writes its test, which cites it and is marked as an expected failure; check: the main case of `tests/quality/test_function_and_file_size.py` |
| loop2 keeps no tool for unused code in its gate; the run of knip of 2026-11-13 was a one-time review and found one dead function | decision (new) | Settlements row 3 | none of the slices |

The agent of these entries writes the three rows before any slice, through
`.claude/skills/the-way-record-decision/SKILL.md` for rows 1 and 3 and
`.claude/skills/the-way-record-invariant/SKILL.md` for row 2, as
`.the-way/task-cycle/skill/foundation_step.md` gives, each in the meaning of its row and in its own
wording. Row 2's sentence names no function or file over a threshold: the set that keeps it
violated stands at the test's marking (Slice 1, cycle choice Q1). Since its test is written by
Slice 1, this agent runs `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`;
the run without the switch reports row 2's invariant as cited by no test until Slice 1 is made, and
that report is no failure of this agent. No row changes the part map: the configuration of the
rule's run stands in `tests/quality/`, which build-tools already holds (To do 6, Choices).

## The rows of *Settlements to record* of the task (copied word for word from the frozen task)

## Settlements to record

Candidates: 3 shown, 3 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Funkcja ma najwyżej 200 linii kodu w całym kodzie objętym lintowaniem (aplikacja, skrypty, testy), a plik najwyżej 800 linii kodu w kodzie aplikacji i skryptach, liczone bez komentarzy i pustych linii, z wyjątkami `accountRoutes` (jedna funkcja rejestrująca trasy serwera) i `src/browser/sim/saved-game.ts` (granica zaufania w jednym pliku); reguła działa osobnym przebiegiem ESLint obok D-29. | decision | pytania „Jaki limit długości funkcji…”, „Jaki limit długości pliku…”, „Co z funkcjami ponad limitem…” (wybory człowieka, warianty niewybrane tam) | progi, zasięg kodu, miara (linie czy rozgałęzienia) i które funkcje są wyjątkami |
| 2 | Żadna funkcja i żaden plik objęte regułą rozmiaru nie przekraczają progów decyzji poza jej wyjątkami; niezmiennik oznaczony jako naruszony, dopóki `createGameView` i `startApp` stoją ponad progiem. | invariant | To do 2–3; pytanie „Co z funkcjami ponad limitem…” (wybór człowieka) | czy reguła ma test i czy wchodzi oznaczona jako naruszona, czy czeka |
| 3 | loop2 nie trzyma narzędzia nieużywanego kodu w bramce; przebieg knip z 13.11.2026 był jednorazowym przeglądem i znalazł jedną martwą funkcję. | decision | pytanie „Czy knip zostaje w bramce?” (wybór człowieka, warianty niewybrane tam) | czy dodać knip do bramki przy okazji tego albo następnego zadania |

The task's *Decisions in play* (word for word):

## Decisions in play

- D-29 — Which rules check TypeScript and JavaScript? „Every application, script and test TypeScript and JavaScript file of browser-view, simulation, account-server and build-tools passes local pinned ESLint 10.12.0 run with `--max-warnings 0` on `eslint.config.mjs`, which applies @eslint/js 10.0.1 `recommended` and, for TypeScript, typescript-eslint 8.71.2 flat `recommendedTypeChecked` unchanged, […] review, in place of a check of the effective configuration, keeps its rules to those sets and its file patterns to that scope. Changing the rule set takes a human-accepted change of this decision.” — zadanie go nie zmienia: reguła rozmiaru odpowiada na inne pytanie (jak duża może być funkcja i plik), działa poza `eslint.config.mjs` i jego zestawem; nowa decyzja mówi o tym w swoich *Relations*, żeby przegląd nie wziął drugiej konfiguracji za złamanie D-29.
- D-267 — What keeps the rules of hooks and of effects in the browser view's code? „No tool guards the rules of hooks and of effects: `guidelines/coding-browser-module.md` holds them, review keeps them, and they are that a Hook is called only at the top level of a function component or of a custom Hook, before any early return and never inside a loop, a condition, a nested function or a `try`/`catch`/`finally` block; that every reactive value an Effect's code uses is declared as a dependency; that an Effect connecting to a system outside React returns a cleanup function that disconnects from it; and that an Effect serves to synchronize with such a system, never to transform data for rendering or to handle a user event. […]” — wiąże podziały komponentów Reacta z To do 4, bez zmiany.

## What you return

Per `foundation_step.md`: for each entry one sentence of its meaning in English and one in Polish (the task document's language), marked `row <n>`; the identifiers you gave (decision numbers and the invariant's identifier, which Slice 1 will cite as `# invariant: <identifier>`); the commit(s); your own-work check; a report with **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), your reaches beyond this handoff, and the working copies' line (copies under `.runs/foundation-entries/`, removed before you return; `none` if you made none). Return: status, commits, one-line check result naming what failed or did not run, the report's path.

Working copies (word for word from the cycle): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
