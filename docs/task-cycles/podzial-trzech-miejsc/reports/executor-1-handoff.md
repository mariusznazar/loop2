# Handoff - executor of slice 1 (executor-1), task `podzial-trzech-miejsc`

The orchestrator of the cycle delegated every intermediate choice to itself; the person who requested the cycle is not asked during the cycle. Nothing you write is the human's approval.

## Where and what

- Worktree (work only from its root): `the worktree's root`, branch `task/podzial-trzech-miejsc`. The slice's base is `fc6e0046`; the commits between it and your start are other agents' work, which you keep. `git rev-parse HEAD` when this handoff was written: `8ca21555`.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`) in that worktree. Your variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole; a file it names, one beside it included, only when the step or variant that names the file comes.
- Frozen task (the passages your slice's *Read* names, from this file): `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`. Plan: `.runs/task-cycles/podzial-trzech-miejsc/plan.md` (your slice's section is copied below word for word; where the plan's ranges of a foundation entry differ from the current ones given below, the current ones hold). No spec.
- Answers of step 4 of the cycle: trust boundary - yes, in a limited sense (the call sites in `startApp` of `src/browser/view/screen-address.ts`, `src/browser/view/email-confirmation.ts` and `src/browser/view/password-reset.ts`; the files themselves are not changed); irreversible operation - no.
- Your directory for working copies: `.runs/executor-1/` (directly under the ignored `.runs/` of the worktree). Report path: `.runs/task-cycles/podzial-trzech-miejsc/reports/executor-1-report.md`.
- You run the slice's focused checks (its *Checks*), never the product's full gate (`npm test` with no path): the gate is the orchestrator's, run after a signal of the human's adviser. Your own-work check, the commands and exit codes of every check, **Unread material**, **Searches not found or unclear** and the line on your working copies stand in the report as the method gives them. Commit your work on the branch with a message in English in the style of the repository's history, adding files by path (never `git add -A`, `git add .` or `git commit -a`).
- Code in English (identifiers, comments); Polish only in what the code shows to the player or matches on.

Working copies (word for word from the cycle's rule): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Current state of the foundation (the foundation entries moved)

The agent of the plan's *Foundation entries* committed `8ca21555`, which changes D-323 in `foundations/decisions.md` (it adds a paragraph and lines to *Relations*, *Verification*, *Rationale* and *Rejected*: from line 4616 on, `foundations/decisions.md` stands 2 lines lower than the plan's ranges say). Find a decision by its heading `### D-<n>` and read it whole; the ranges of the plan were measured on `fc6e0046`. `foundations/invariants.md`, the part map and the guidelines are unchanged since the base unless your slice's own text says otherwise.

## Extra notes of the orchestrator for this slice

- `npm run kitchen-sink` opens the default browser of this computer too; that is harmless. Start it as a background command, note its process, and stop it (and close the Playwright session) when you finish, also when you return early. A leftover server or browser session is a remainder of a working copy and goes into your report.
- If the markup comparison differs only in values React generates itself (ids), say exactly what differed and judge whether the page is the same; where it differs in any class, text, attribute or order, the split changed the page - fix the split.
- A screenshot is never committed, never kept in the record and not shown to the human; the one the tool writes into `.playwright-cli/` is moved to your directory and the original removed.
- The check `npm test -- tests/invariants/test_application_build_kitchen_sink.py` (and the other `npm test -- <path>` lines) means a run of that one test file only, never the whole gate; if `npm test -- <path>` in this repository runs more than that file, run the file by its own runner instead and say so in the report.
- The foundation commit `8ca21555` (D-323) lies between the slice base and your start; it is not your change. The review of this slice judges the range from `fc6e0046`, so that it covers it.


## Your slice's section of the plan (copied word for word)

### Slice 1 — the kitchen-sink page in modules of its own directory

- **Goal:** `src/browser/kitchen-sink/kitchen-sink.tsx` (890 lines of code at the base, threshold 800) is divided by groups of samples into modules that stand directly in `src/browser/kitchen-sink/` — not in a subdirectory, which `tsconfig.kitchen-sink.json` does not include, and never in `src/browser/view/`, which `npm run build` compiles: `sample-parts.tsx`, what several groups share (`Section`, the reason a state does not apply, the wrapper `Forced` of the held hover and focus, the figure `FormFigure` with its name, `IconMask` and the list of icon files); `control-samples.tsx`, the shared controls in their seven states (the states, the reasons, the samples, the table of controls, its section, and the ref of the empty number field's input, which the entry reads); `account-samples.tsx`, the forms waiting for the server and the part of the menu „Konto”; `role-samples.tsx`, the roles; `tile-samples.tsx`, the tiles. The entry `kitchen-sink.tsx` keeps `PAGE_MARKER` (exported, since the probe of `tests/invariants/test_application_build_kitchen_sink.py` imports it from `./kitchen-sink/kitchen-sink.js`), `Page`, `typeEmptyInto` and the first draw, and stays the one module that marks the body and renders. The code moves without a change of what the page draws: the same samples, in the same order, in the same states, with the same classes and texts. Measured at the base, the groups hold about 300 lines of code (the controls, less the shared parts), 220 (the forms and the menu), 110 (the roles), 170 (the tiles), 50 (the shared parts) and 60 (the entry), so each file stays far under 800 and no function grows. Each new module starts with a comment that says what it holds; the entry's comment no longer says that code only the page needs stays in that module. In the same slice, the last paragraph of the rule "The kitchen-sink page" of `guidelines/styleguide-browser-view.md` is written to the meaning of row 1 of the task's *Settlements to record* (task questions 1 and 4): code needed only by the page stays in the directory `src/browser/kitchen-sink/`, beyond that directory the page imports only modules the game uses, and the reason stays that such code in `src/browser/view/` would reach the output of `npm run build`; no other sentence of the styleguide changes. The picture of the page is collected before the first change of code, on the slice's base: `npm run kitchen-sink` started as a background command (it builds the page, prints `Kitchen-sink page: http://127.0.0.1:<port>/` and opens the default browser too); then Playwright CLI as `.claude/skills/loop2-play/SKILL.md` gives it, in a session of its own: `playwright-cli open <address>`, the markup of the page's host written to `before.html` (`document.querySelector(".sample-page").outerHTML` through `playwright-cli --raw eval`), a screenshot of the whole page as `before.png`, and `playwright-cli console error`. Both files stand in the agent's directory for working copies under `.runs/`; the screenshot the tool writes into `.playwright-cli/` is moved there and the original removed. The command is then stopped and the browser session closed. After the split the same steps give `after.html` and `after.png`: `after.html` equals `before.html` byte for byte (a `cmp` of the two prints nothing), the two screenshots are looked at side by side for the same sections, samples, order and states, and the console holds no error. No screenshot is committed, kept in the cycle's record or shown to the human; the report gives the result of each comparison, where the files stood and that they were removed.
- **Change:** `src/browser/kitchen-sink/kitchen-sink.tsx` · `src/browser/kitchen-sink/sample-parts.tsx` · `src/browser/kitchen-sink/control-samples.tsx` · `src/browser/kitchen-sink/account-samples.tsx` · `src/browser/kitchen-sink/role-samples.tsx` · `src/browser/kitchen-sink/tile-samples.tsx` · `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:24-29` To do ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:35-39` Acceptance criteria ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:43-48` Questions to settle, question 1 ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:58-63` Questions to settle, question 4 ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:71-85` Context and Questions carried to cycle ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:98-108` Settlements to record and Out of scope ·
  `foundations/decisions.md:4899-4913` D-45 · `foundations/decisions.md:4340-4372` D-269 ·
  `foundations/decisions.md:4263-4310` D-265 · `foundations/decisions.md:822-840` D-425 ·
  `foundations/decisions.md:4722-4736` D-421 ·
  `foundations/invariants.md:498-507` application-build-kitchen-sink ·
  `foundations/invariants.md:1408-1417` function-and-file-size ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447` prettier-source-format ·
  `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/part_map.md:3-32` browser-view · `foundations/part_map.md:90-125` build-tools ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `src/browser/AGENTS.md` ·
  `tsconfig.kitchen-sink.json` · `tsconfig.browser.json` · `scripts/kitchen-sink.mjs` ·
  `src/browser/kitchen-sink/index.html` · `tests/invariants/test_application_build_kitchen_sink.py` ·
  `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
- **Model:** same - a split of 890 lines with a picture to compare and a styleguide sentence to write is more than a mechanical move; no review of its own judges it before the whole-change review (class raised by the orchestrator in the plan's review, WAY-229)
- **Risk:** none
- **Checks:** the comparison of the page before and after the split given in *Goal* (`cmp` of `before.html` and `after.html` prints nothing; screenshots looked at; no console error) ·
  `npm run kitchen-sink -- --build-only` (the one compile of the page; it fails on a type error) ·
  `node tests/quality/eslint-size-rules.mjs` names no file of `src/browser/kitchen-sink/` and no place the base did not name ·
  `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/kitchen-sink` ·
  `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore "src/browser/kitchen-sink/**/*.{ts,tsx,css,html}"` ·
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** none


## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`, as the method gives them), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds, besides what the method asks, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`) and the line on your working copies.
