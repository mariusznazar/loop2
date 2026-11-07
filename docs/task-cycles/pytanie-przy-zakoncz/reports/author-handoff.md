# Handoff — the one author, "the whole change as the one author"

You make the whole change of the task "Pytanie „Zapisać, odrzucić, wrócić?” przy „Zakończ”" with the
project skill `the-way-make-change`, in the variant **the whole change as the one author**.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator and, through
it, to you for how to make what the task settles. Never label a choice of yours as the human's
approval. You ask no human anything: a question goes into your report with status `questions`.

## Where you work

- Worktree root (work from here; `.the-way` is this worktree's): `C:\Storage\repos\loop2-wt\pytanie-przy-zakoncz`
- Branch `task/pytanie-przy-zakoncz`. Base for this change: `06c69ad` (the commit that moved the-way's
  pin to `52889bc`; it holds nothing of the task). Commit on this branch only.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step
  or variant that names it comes.
- Foundation step: `.the-way/task-cycle/skill/foundation_step.md` — read it whole. You write the
  foundation entries the task carries with your code, through the project skills
  `the-way-record-decision` (D-173, D-44), and any other entry the foundation step gives, each skill
  read as it says. The return step is a separate dispatch; do not take it.
- The frozen task, whole: `.runs/task-cycles/pytanie-przy-zakoncz/task.md` (original:
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\pytanie_przy_zakoncz_loop2.md`,
  accepted 2026-11-07). Its *To do*, *Questions to settle* and *Settlements to record* (rows 1–8)
  bind. There is no spec and no plan: no open design choice stands.
- Report: write your full report to
  `C:\Storage\repos\loop2-wt\pytanie-przy-zakoncz\.runs\task-cycles\pytanie-przy-zakoncz\reports\author-report.md`.
  It holds your status, commits, each check with its command and exit code, the own-work check of
  the method, the reaches beyond this handoff, and **Searches not found or unclear** (each thing
  looked for and not found or unclear, or `none`).
- Do not run the product's gate (`npm test`) — the orchestrator runs it. Run focused checks only:
  `python -B scripts/test.py <one test file>` runs exactly one Node or Python test file.

## Answers of step 4 (binding)

- Trust boundary: no. Do not touch `src/browser/sim/saved-game.ts`; the question lives only in the
  page's memory (task To do 6). If your change must reach it, return with `questions`.
- Irreversible operation: no.
- Open design choice: none. Where the question's state lives in the code (simulation or view), how
  the paused-before-the-question state is remembered, and the file split are choices of how to make
  what the task settles: make them, name each in your report, and keep them within the guidelines.
- Route: one author without a plan; you also fix and take no further dispatch except a resume for
  the fix.
- Checks the pin move carried: none (the gate passed on `06c69ad`, exit 0).
- A source changed since the task was accepted: the task cites the foundation at `5694146`; `main`
  is `73751e8`. The decision **D-323** is new (after an error no code of the game handled the game
  `halt()`s: `halted` in `src/browser/view/game-view.ts` makes `store.apply` ignore results and
  the clock stops) — read it whole, and make sure the question never changes state after a halt.
  The line numbers the task cites in `game-view.ts` have moved (`end` is near line 351).

## Foundation entries to read, each whole (the entry runs to the next heading)

Decisions of the task's *Decisions in play*: D-173, D-44, D-164, D-168, D-171, D-172, D-53, D-62,
D-132, D-283, D-21, D-122, D-311, D-212, D-303; invariant `copy-save`.
Decisions the work reaches in the same parts, selected by "Reading the foundation": D-129, D-130,
D-174, D-250, D-275, D-280, D-281, D-284, D-287, D-308, D-312, D-313, D-322, D-323.
Glossary: the terms the work uses (the product's glossary `foundations/glossary.md`, and the-way's
at `.the-way/foundations/glossary.md` for terms the product's does not hold).
The part map (`foundations/part_map.md`): parts `browser-view`, `simulation`, `product-foundation`,
`agent-workflow` are touched.

## Guidelines to read, each whole

- `AGENTS.md` (product rules), `src/browser/AGENTS.md`
- `guidelines/coding.md` (general), `guidelines/coding-browser-module.md`,
  `guidelines/coding-simulation-module.md` (only if you change a module in `src/browser/sim/`)
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md` — the change touches the user interface: read the
  styleguide's example of the order of work and follow it (WAY-213). To check states in a real
  browser read `.claude/skills/loop2-play/SKILL.md`; record the affected components and states, the
  method, the observed result and the evidence (screenshot paths under
  `.runs/task-cycles/pytanie-przy-zakoncz/reports/`), or say which check could not run and why.
  The styleguide line the task asks for (To do 8) is yours to write.

## Rules for commits and code

- Code, identifiers, docstrings and comments in English; what the game shows the player stays as
  the task gives it (Polish). Commit messages in English, in the form of the repository's history
  (`git log`), body after the type. Add files to a commit by path (`git add <path> …`), never
  `git add -A`, `git add .` or `git commit -a`. The commit address is set by the repository's
  config; check `git log --format='%h %ae' -1` after your first commit.
- Do not push. Do not edit anything outside this worktree. Do not edit
  `C:\Storage\The Brain\The Brain\` (the vault); the backlog is the orchestrator's.
- Test first where it fits. The tests that today check "Zakończ" without the question stand in
  `tests/view/account-screen.test.mjs` (the task lists cases near lines 2396, 2629, 3518, 3810,
  4271, 4313); update them to the new behaviour and add tests for each To do item and each
  settlement row. Name the break each test catches.
- A decision the cycle writes (D-173, D-44) is written by `the-way-record-decision`, with the
  *Verification* and *Origin* it asks for; take every value from its source. Settlement rows of the
  task are the cycle's to write; name in your report the row each entry writes.
- If you meet an open design choice that the task, the foundation and these answers do not settle,
  return `returned` with no code (see the method), not a guess.

Return to the orchestrator: your status, your commits, a one-line check result naming what failed or
did not run, and the report's path.
