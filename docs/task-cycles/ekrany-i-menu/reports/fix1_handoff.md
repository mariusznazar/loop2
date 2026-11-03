# Handoff — the fix of the review's blocking findings, task `ekrany-i-menu`

You fix the two blocking findings of the review of the whole change. The person who requested this cycle
(Mariusz, the product's owner) has delegated every intermediate choice to the orchestrator; you ask no human
anything. A question goes back in your report with the status `questions` or `blocked`.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`. Branch
  `task/ekrany-i-menu`; the head you start from is `eeb145f26f6702dd8e9cd2370269d95aa6effc6a`, the head the
  review judged. Task base `20d804b04ba564b578551c687cde78baadf78878`. Process pin `.the-way` at
  `f45ca40724251a46965aed69f733d0a35c430048`.
- Your class of model: the strongest available (the findings span slice 8, which is `strongest`, slice 10 and
  the foundation entries).
- Report path: `docs/task-cycles/ekrany-i-menu/reports/fix1.md`.

## Your stage

- You make: **the fix of a review's findings** (the row of the `make-change` table). Read
  `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/fix.md`.
- The findings file (read it whole): `docs/task-cycles/ekrany-i-menu/reports/fix1_findings.md` — B1 and B2, in
  the reviewer's words. The full review is `reports/review_whole.md`; read only what your findings need, and fix
  **only B1 and B2**. The review's Minor and out-of-scope findings are not yours to fix, and you must not fix
  them "on the way" (for example the Polish wording of the README, the statuses in
  `guidelines/coding-browser-module.md`, the comments of the boundaries): leave them untouched.
- A finding you hold wrong you may contest with evidence in your report instead of fixing it; say which and
  why. The reviewer's recommended fixes are recommendations: you may fix another way if it is smaller or more
  correct, and say so.
- You change foundation entries only through the project skill of the element: for the wording of D-173 use
  `the-way-record-decision` (read it, with what it names, before you edit `foundations/decisions.md`). Do not
  change the binding sentence of D-173 (the reviewer names that route a question for the human); B1 is fixed by
  making the code meet it, and by correcting the *Verification* example that the foundation step rewrote.
- Guidelines to read whole before you change code or a test: `guidelines/coding.md`,
  `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`,
  `src/browser/AGENTS.md`.
- Foundation entries to read whole: D-173, D-93, D-166, D-167, D-170, D-244, D-265, D-280, D-281 (and the entries
  they link to as far as you need them); the invariants `saved-program-edit` and `copy-save` of
  `foundations/invariants.md`.
- Code the findings name: `src/browser/view/game-view.ts`, `src/browser/view/run-screen.ts`,
  `src/browser/view/program-panel.ts`, `tests/view/account-screen.test.mjs`,
  `tests/view/program-panel.test.mjs`. In the state, `countsProgram` names the program a map run's counts stand
  beside; `end` sets it (see `src/browser/sim/game.ts`), and deleting a program clears it (`sim/programs.ts`).
- Trust boundary: no (the router already resolves crafted fragments; do not weaken it). Irreversible
  operation: no.

## What each finding needs, besides the reviewer's text

- **B1.** After „Zakończ” the game opens Postać; the bar's „Programy” opens `#/programy` with no number. D-173:
  "after „Zakończ” the program panel shows the program the copy belongs to". The sim keeps that memory in
  `state.countsProgram`. Make `#/programy` show `state.countsProgram` where it names a program still on the
  list, else the first program (task question 15: Programy always shows a saved program; the address `#/programy/{n}`
  still shows program n). Hold a case in `tests/view/account-screen.test.mjs` that fails first: a map run whose
  copy came from a program that is not the first, ended, „Zakończ”, then `#/programy` shows that program;
  and one where that program was deleted (falls back to the first). Correct the *Verification* example of D-173
  that the foundation step rewrote ("„Program” standing in the panel as it was saved" placed on Postać) so that
  it says the panel of Programy. Check in the real browser, as `.claude/skills/loop2-play/SKILL.md` gives (the
  route Slice 8's author used: `npm run local`, Playwright CLI, an account through the login card, `npm run
  local:stop`, `playwright-cli close`, delete `.playwright-cli/`): after „Zakończ” of a map run started with the
  second program, the bar's „Programy” shows that program; report what you read. Where the walk cannot be made,
  say why and mark it unchecked.
- **B2.** The program panel of Przejście must be fed the map run the screen was given. Make the screen of a map
  run own the panel's update with the same `{ ...state, run }` it gives the column, and the game view stop
  updating that panel directly. Hold a case that fails first: the screen is given a state whose `run` differs
  from the parameter and the panel shows the parameter's copy.

## Rules of the fix

- Run the affected checks again and report each as command and exit code: `npm run typecheck`;
  `npm test -- tests/view/account-screen.test.mjs`; `npm test -- tests/view/program-panel.test.mjs`;
  `npm test -- tests/view/program-list.test.mjs`; `npm test -- tests/invariants/test_saved_program_edit.py`;
  `npm test -- tests/invariants/test_copy_save.py`; `npm test -- tests/quality/test_quality_invariants.py`;
  `python -B .the-way/elements/common/foundation_check.py`. Do **not** run `npm test` without a file argument.
- Commit on the task branch in English, in the style of the repository's recent commits; `git add <paths>`
  explicitly (never `git add -A`, `git add .`, `git commit -a`); messages with several lines through
  `git commit -F <file>` placed outside the repository. One commit per finding. Do not push. Leave no uncommitted
  tracked change.

## Your report

For each finding: fixed (how, the check that shows it, the commit) or contested (evidence); the real-browser
check; every check as command and exit code; reaches beyond this handoff; **Searches not found or unclear**
(or `none`). Return only: status (`done`, `done with concerns`, `questions`, `blocked`), your commits, a one-line
check result naming what failed or did not run, and the report path.
