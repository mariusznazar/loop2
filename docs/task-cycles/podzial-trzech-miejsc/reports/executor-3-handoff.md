# Handoff - executor of slice 3 (executor-3), task `podzial-trzech-miejsc`

The orchestrator of the cycle delegated every intermediate choice to itself; the person who requested the cycle is not asked during the cycle. Nothing you write is the human's approval.

## Where and what

- Worktree (work only from its root): `the worktree's root`, branch `task/podzial-trzech-miejsc`. The slice's base is `7a16a73c`; the commits between it and your start are other agents' work, which you keep. `git rev-parse HEAD` when this handoff was written: `7a16a73c`.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`) in that worktree. Your variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole; a file it names, one beside it included, only when the step or variant that names the file comes.
- Frozen task (the passages your slice's *Read* names, from this file): `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`. Plan: `.runs/task-cycles/podzial-trzech-miejsc/plan.md` (your slice's section is copied below word for word; where the plan's ranges of a foundation entry differ from the current ones given below, the current ones hold). No spec.
- Answers of step 4 of the cycle: trust boundary - yes, in a limited sense (the call sites in `startApp` of `src/browser/view/screen-address.ts`, `src/browser/view/email-confirmation.ts` and `src/browser/view/password-reset.ts`; the files themselves are not changed); irreversible operation - no.
- Your directory for working copies: `.runs/executor-3/` (directly under the ignored `.runs/` of the worktree). Report path: `.runs/task-cycles/podzial-trzech-miejsc/reports/executor-3-report.md`.
- You run the slice's focused checks (its *Checks*), never the product's full gate (`npm test` with no path): the gate is the orchestrator's, run after a signal of the human's adviser. Your own-work check, the commands and exit codes of every check, **Unread material**, **Searches not found or unclear** and the line on your working copies stand in the report as the method gives them. Commit your work on the branch with a message in English in the style of the repository's history, adding files by path (never `git add -A`, `git add .` or `git commit -a`).
- Code in English (identifiers, comments); Polish only in what the code shows to the player or matches on.

Working copies (word for word from the cycle's rule): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Current state of the foundation (the foundation entries moved)

The agent of the plan's *Foundation entries* committed `8ca21555`, which changes D-323 in `foundations/decisions.md` (it adds a paragraph and lines to *Relations*, *Verification*, *Rationale* and *Rejected*: from line 4616 on, `foundations/decisions.md` stands 2 lines lower than the plan's ranges say). Find a decision by its heading `### D-<n>` and read it whole; the ranges of the plan were measured on `fc6e0046`. `foundations/invariants.md`, the part map and the guidelines are unchanged since the base unless your slice's own text says otherwise.

## Extra notes of the orchestrator for this slice

- This slice carries a risk mark (the call sites of the trust boundary), so a reviewer judges it on its own; the reviewer is told to check that `screenAddress`, `readResetToken`, `readConfirmationToken` and `confirmFromAddress` still receive the same input and lead to the same results, and that crafted input (an address, a confirmation message, a reset token) is handled by the same code as before. Say in your report, for each of those calls, where it stood before and where it stands now, and with what arguments.
- Slice 2 (commit `7a16a73c`, your starting point) moved the drawing of the start page into `src/browser/view/page-places.ts` with three deviations from its plan section, which are the current code: the factory `createPagePlaces` also takes `root` (since `draw` appends the card to it); it takes the first waiting state as an option, so `CHECKING_SESSION` stays in `app.ts`; and it does not expose the waiting screen's `focusRetry`, since only `draw` calls it. `startApp` stands at 371 lines of code. The plan's ranges and names of slice 3 refer to that plan; the current code holds.
- Slice 2's executor did not read these, so you read them whole, as your *Read* names them: D-280 and D-286, and the invariants of your *Read* (`page-address-fragment`, `expired-session-unsaved-progress`, `uncaught-failure-game-state`, `cross-part-imports`, `function-and-file-size`) and the part-map entry of `browser-view`, and `guidelines/styleguide-browser-view.md` where it bears on what you move (it says nothing about the sizes; read the rules on the menu bar and the login card if you move their drawing).
- Run the view tests of your *Checks* once on the unchanged tree before you move code, to know which passed.
- The mark and the comment of `test_no_function_and_no_file_is_over_a_threshold` stay; `createProgramsEntry` is the next slice's.
- D-323 now says (commit `8ca21555`) that after an error no code handled the end-of-run window still opens and stays; the code that does it is slice 6's, not yours; `app.ts` keeps its handling of the error exactly as it is.


## Your slice's section of the plan (copied word for word)

### Slice 3 — the rest of startApp under the threshold

- **Goal:** `startApp` in `src/browser/view/app.ts` holds at most 200 lines of code, aiming at about 150 or fewer, with no change of behaviour. The nested functions that remain in it after Slice 2 leave it as functions at module level that receive what they share with the page as a parameter — the places of `src/browser/view/page-places.ts`, one record of the page's memory that outlives a change of kind (the values that stand today as `let` in `startApp`: the notice that waits, the registration's message, whether the game replaces one that lost a conflict, the entry of the next game, the state kept after 401, the number of the last request, the failure, and the card's focus after a refused link or „Anuluj”), the client and the address — rather than nesting in another factory, whose one function would again count all their lines (D-425). The acts on a standing game — the logout (`logOut`, `setLogout`), the reset of the game (`resetGame`), the holding of the saver's outcomes (`whenNotBusy`) and the game's place (`onPlace`) — go to a new module `src/browser/view/page-game-acts.ts`. The session check, the load, the card and the building of a game (`checkSession`, `loadGame`, `enter`, `showGame`, `showForms`, `expire`, `reloadAfterConflict`, `placeCard`, `focusCard`, `waitForServer`, `askingFailed`, `loadFailed`, `leaveGame`, `takeNotice`) stay in `app.ts` at module level beside `startFrom`, so that the console line of a load that failed keeps its place `view/app.startFrom` true. `startApp` keeps the making of the places and of the memory, the last-resort handling (`onUncaught`, `reportLine`, `installLastResort`), the entry from the address — `start` and `showReset`, which read the reset token and the confirmation token of the address — and the first draw. There is no import cycle: what a function of `page-game-acts.ts` calls back in `app.ts` it receives through its parameter. Every call of a file of the trust boundary of `browser-view` keeps its arguments and what its result leads to: `screenAddress` in the game's place, which moves; `readResetToken`, `readConfirmationToken` and `confirmFromAddress` in the entry from the address, which stays; `browserAddress` as the default address of `startApp`. The places of the log lines, `view/app.startFrom` and `view/account-card.createAccountCard`, stay as they are; one transition at a time and the ignoring of a late answer through the number of the last request work as before. Measured at the base, the acts on a standing game hold about 105 lines of code, so `page-game-acts.ts` holds about 130 with its parameters and `app.ts` about 360. The descriptions of `guidelines/coding-browser-module.md` that name `startApp` or `app.ts` and what this slice moves — in the example "Gra na stronie i odpowiedzi serwera", that the values which outlive a change between kinds „stoją w `startApp` osobno”, and the sentences on „Wyloguj” and on `installLastResort` — say where the code stands after the slice (To do 7); no other sentence changes, and the table "Files of this kind" gets no row. At the end `node tests/quality/eslint-size-rules.mjs` names no function or file of `app.ts`, `page-places.ts` or `page-game-acts.ts`; the mark and the comment of `test_no_function_and_no_file_is_over_a_threshold` stay, since `createProgramsEntry` still stands over the threshold.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/page-game-acts.ts` · `src/browser/view/page-places.ts` · `guidelines/coding-browser-module.md`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:24-39` To do and Acceptance criteria ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:71-85` Context and Questions carried to cycle ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:106-108` Out of scope ·
  `foundations/decisions.md:822-840` D-425 · `foundations/decisions.md:4645-4661` D-407 ·
  `foundations/decisions.md:4263-4310` D-265 ·
  `foundations/decisions.md:4613-4629` D-323, as row 3 of *Foundation entries* changed it ·
  `foundations/decisions.md:3139-3189` D-262 · `foundations/decisions.md:3215-3227` D-381 ·
  `foundations/decisions.md:2966-2980` D-96 · `foundations/decisions.md:2981-3008` D-97 ·
  `foundations/decisions.md:3953-3999` D-209 · `foundations/decisions.md:4035-4076` D-211 ·
  `foundations/decisions.md:656-700` D-213 · `foundations/decisions.md:3556-3595` D-225 ·
  `foundations/decisions.md:4201-4217` D-402 · `foundations/decisions.md:4472-4517` D-281 ·
  `foundations/decisions.md:4592-4612` D-286 · `foundations/decisions.md:2148-2162` D-356 ·
  `foundations/decisions.md:1962-2012` D-253 ·
  `foundations/invariants.md:1388-1397` page-address-fragment ·
  `foundations/invariants.md:1218-1227` uncaught-failure-game-state ·
  `foundations/invariants.md:998-1007` expired-session-unsaved-progress ·
  `foundations/invariants.md:1408-1417` function-and-file-size ·
  `foundations/invariants.md:1228-1237` cross-part-imports ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447` prettier-source-format ·
  `foundations/part_map.md:3-32` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/last-resort.ts` · `src/browser/view/email-confirmation.ts` ·
  `src/browser/view/password-reset.ts` · `src/browser/view/game-view.ts:95-172` ·
  `src/browser/view/account-card.tsx:56-109` ·
  every other invariant of `foundations/invariants.md` whose *Part* names `browser-view` and which the moved code reaches (WAY-62), in particular those about the confirmation of an email address, the reset of a password and the address of the page - search by *Part* and by those words (added by the orchestrator in the plan's review)
- **Model:** strongest — dividing one closure over shared mutable memory between module-level functions and a new module, with no change of behaviour, is design work.
- **Risk:** trust boundary — the call sites in `startApp` of `src/browser/view/screen-address.ts`, `src/browser/view/email-confirmation.ts` and `src/browser/view/password-reset.ts` move or are rewired
- **Checks:** `npm run typecheck` ·
  `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/app.ts src/browser/view/page-places.ts src/browser/view/page-game-acts.ts` ·
  `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/app.ts src/browser/view/page-places.ts src/browser/view/page-game-acts.ts` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/login-card-focus.test.mjs` ·
  `npm test -- tests/view/owner-panel.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/menu-bar.test.mjs` ·
  `npm test -- tests/view/screen-address.test.mjs` · `npm test -- tests/view/email-confirmation.test.mjs` ·
  `npm test -- tests/view/password-reset.test.mjs` ·
  `node tests/quality/eslint-size-rules.mjs` names nothing of `app.ts`, `page-places.ts` or `page-game-acts.ts` and no place the base did not name ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 2


## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`, as the method gives them), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds, besides what the method asks, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`) and the line on your working copies.
