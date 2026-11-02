# Handoff — one author of the task `lokalny-start`

## Delegation and boundary

The person who requested this cycle delegated intermediate choices to the cycle's orchestrator; no answer you get from it is that person's approval. Send your questions to the orchestrator by returning the status `questions`, never to a human. Return at your boundary: code and foundation entries made and committed, report written. Do not start a review, do not open a request and do not run the product's gate: the full `npm test` is the orchestrator's (WAY-160). Your focused checks are yours.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\lokalny-start`, branch `task/lokalny-start`, base `54b2b7831cfb08c8e2d3eda8bfaf87b9a4205470`.
- Work from the worktree's root in every command, by its absolute path. Your session starts in `C:\Storage\repos\loop2`, the main checkout: change nothing there. Dependencies and `.runs/quality-venv` are installed in the worktree.
- The worktree is on a shell where Git Bash (`/c/Storage/...`) and PowerShell both exist, on Windows.
- Change nothing outside this repository. Reading outside it is allowed.
- Commit by naming paths; never `git add -A`, `git add .` or `git commit -a`. Messages in English, in the repository's existing style.
- Nothing is pushed by you.

## Method

Read `C:\Storage\repos\loop2-wt\lokalny-start\.the-way\task-cycle\change\SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is "the whole change as the one author". You make the foundation step with your code: its method is `C:\Storage\repos\loop2-wt\lokalny-start\.the-way\task-cycle\skill\foundation_step.md`, read whole. Skills the task names with the prefix `the-way-` are the project skills in the worktree's `.claude/skills/`, each pointing at its file in `.the-way`; read them from the worktree, never a personal skill of a like name.

## Task

The frozen task is `C:\Storage\repos\loop2-wt\lokalny-start\.runs\task-cycles\lokalny-start\task.md`, accepted 2026-11-01. Read it whole: it holds To do 1–8, the acceptance criteria, Q1–Q10, the questions carried to the cycle, the projected entries and the four rows of *Settlements to record*. Its code anchors name 48544f0; the base differs from that commit only in the pin of `.the-way` and two entry-point files of `the-way-settle-technology`, so the anchors hold.

No spec and no plan were written: the orchestrator found no open design choice and no reserved choice at the start. Each question under *Questions carried to cycle* is yours to answer as a choice of how to make what is settled; name each choice and its rejected way in your report. The one exception stands in the task itself: Playwright MCP's way of taking the local certificate must need no human action and no change of the definition's entry; where no such way exists, return `questions`.

Where you meet a choice the task and the foundation do not settle that would set a foundation entry or be costly to turn back, or a language, framework, library, store of data, way of logging in or place to run they do not settle, return as your method gives, with no code for it.

## Answers of the start

- Trust boundary: yes. The new file of the command takes connections from the browser and holds the certificate's key, and it becomes a trust boundary of the part map. The change also starts `src/server/**` in `loopback-proxy` mode without changing it.
- Irreversible operation: no. The start removes only the command's own throwaway database under the ignored `.runs/`. No setting, argument or environment value may point that removal at another file: a review checks it.

## What to read

Foundation entries in `foundations/decisions.md`, each whole, from its heading to the next one:

- the task's: D-05, D-12, D-33, D-49, D-73, D-75, D-76, D-88, D-101, D-104, D-108, D-110, D-111, D-212, D-234;
- of the parts you touch: D-13, D-29, D-30, D-31, D-32, D-45, D-77, D-81, D-83, D-84, D-85, D-87, D-89.

Invariants in `foundations/invariants.md`, each whole: `loop2-one-serving-process`, `loop2-api-error-route`, `application-build-output`, `application-package-layout`, `application-build-layout`, `application-build-kitchen-sink`, `browser-view-framework`, `account-server-express-http`, `account-server-typecheck`, `account-server-default-address`, `account-startup-configuration`, `account-request-transport`, `preview-server-access`, `introduced-npm-vulnerabilities`, `node-test-selection`, `focused-test-execution`, `eslint-source-rules`, `ruff-source-rules`, `shellcheck-source-rules`, `prettier-source-format`.

`foundations/part_map.md` whole; `foundations/glossary.md`, the terms you use; the-way's glossary at `.the-way/foundations/glossary.md`, the terms you use.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/testing.md`, and `guidelines/styleguide-browser-view.md` because `tests/invariants/test_browser_view_framework.py` belongs to the part `browser-view`. No kind of `guidelines/coding.md`'s index matches a launching script: `guidelines/coding.md` says the patterns of entry points stay deferred, so the nearest existing files are comparison, not a rule.

Sources outside the repository, read as the task cites them: `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\rozpoznanie_mvp2\technologia_obsluga_gry_przez_agenta.md` and `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\rozpoznanie_mvp2\technologia_dane_do_sprawdzania.md`; for the projected entries, `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp2_loop2.md`, the entries the task quotes.

Where you create or change a skill, read `C:\Storage\The Brain\The Brain\Notes\Areas\(A) Claude code\konwencje_skilli_i_commandow.md` first, and take the shape of the repository's own skill `loop2-deploy`, which stands in `.claude/skills/` and `.agents/skills/` and has a test of its copies in `tests/agent_workflow/test_loop2_deploy_skill.py`.

Before writing any script, one-off ones included, read `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.

## Facts the orchestrator already holds

Read these as starting points, each to confirm before you rely on it; none is a requirement.

- `archive/10x-m3l4` holds the trial code the task names. In Git Bash read it with `MSYS_NO_PATHCONV=1 git show archive/10x-m3l4:tests/e2e/support/local-https.mjs`; without that prefix Git Bash breaks the argument and git answers as if the file were missing. Its comments and flow match today's server except for the settings: it supplies four, `src/server/configuration.ts` wants nine. Do not copy its account seeding or its `.env` reading: the task has the agent make the account through the form.
- `which openssl` in Git Bash gives `/mingw64/bin/openssl`; the archive looks for it on `PATH` and then beside Git for Windows.
- The agent guard `C:\Users\Mariusz\.claude\scripts\pretooluse-guard.sh` refuses a Bash or PowerShell command whose text holds `.pem`, `.p12` or `.pfx`, so neither you nor a fresh agent may type such a name. It reads only the command text, so a script file of the repository run by name never meets it; the guard's own message asks that a file an agent makes for itself be named without those extensions.
- Docstrings of seven tests say README.md gives `npm start`, `npm run build` and the places `src/browser` and `src/server`, so README keeps saying those things truthfully (To do 3).
- `npm start` and `tests/invariants/test_loop2_one_serving_process.py` must stay as they are: the new command stands beside them (task, Context).
- `playwright-cli --version` here gives 0.1.22 with a notice that 0.1.23 exists; `playwright-cli` is global on this computer.
- An idea nobody has run for Playwright MCP, one more to weigh under the task's condition: a navigation in a browser MCP already has open, after `browser_run_code_unsafe` sends the Chrome DevTools Protocol method `Security.setIgnoreCertificateErrors` through `page.context().newCDPSession(page)`, or clicking through Chrome's warning page as a person does. The Playwright MCP tools are deferred in your session: load them with ToolSearch, `select:mcp__plugin_playwright_playwright__browser_navigate` and so on.

## Own-work check

The orchestrator dispatches a separate fresh agent for the first acceptance criterion after you return, with nothing but the repository to go by. Your own-work check is your own run of that same path: the command, account by the form, into the game, send the character, the minute grows, reload, the same run back paused, „Wznów”, then frames from the stream, in a real browser. Keep the evidence in your report: no permanent Playwright test stays in the repository (task, Acceptance criteria; D-75, D-88), and nothing of that check is committed. Remove what the check left behind, and stop every process you started; on Windows a process left running keeps its port and its files.

## Report

Write your full report to `C:\Storage\repos\loop2-wt\lokalny-start\.runs\task-cycles\lokalny-start\reports\author.md`, with no secret in it. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path. Each check your report says you ran carries its command and exit code.
