# Handoff — the one author

Stage: make the whole change as the one author (`make-change`, variant "the whole change as the one author").

## Delegation

You are the one author of a task cycle run by an orchestrator for Mariusz. The person who requested the cycle delegated intermediate choices to the orchestrator; nothing you are told here is that person's approval. You ask no human anything: questions go back to the orchestrator in your report.

## Where you work

- Worktree (work from its root, do not `cd` elsewhere): `C:\Storage\repos\loop2\.runs\worktrees\body-parser-i-qs`
- Branch: `task/body-parser-i-qs`, base commit `5694146af4b65fbe506c43eb3638c87fd0ad4783`
- `npm ci` and the quality venv `.runs/quality-venv` are already set up in this worktree.
- Pinned the-way: `.the-way` at `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`.

## Method

Read whole: `.the-way/task-cycle/change/SKILL.md`. Read another file it names only when the step or variant that names it comes. Do not run the product's gate (`npm test`) — the orchestrator runs it; run only focused checks of your own.

## The task

Frozen task, read whole: `C:\Storage\repos\loop2\.runs\worktrees\body-parser-i-qs\.runs\task-cycles\body-parser-i-qs\task.md` (original: `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\podniesienie_body_parser_i_qs_loop2.md`). Its one item, word for word:

> 1. `package-lock.json` trzyma `body-parser` w wersji 2.4.0 lub wyższej i każdą kopię `qs`, z której korzystają `express` i `body-parser`, w wersji 6.16.1 lub wyższej; `package.json` się nie zmienia, Express zostaje 5.2.1.

Acceptance criterion, word for word:

> - `npm audit --omit=dev` na gałęzi zadania nie zgłasza żadnego ostrzeżenia.

No spec, no plan (no open design choice; one author).

## Answers of step 4 (the cycle's start)

- Trust boundary: **yes**. `package-lock.json` is a trust boundary of the part `build-tools` (`foundations/part_map.md`). The change must not alter any `resolved` URL away from `https://registry.npmjs.org/`, must not add a package, an install script or a non-registry source, and each `integrity` must be the one npm wrote for the version it sits under.
- Irreversible operation: **no**. You do not push, merge or deploy. Commit on the task branch only.
- Open design choice: none. Reserved choice: none.

## Constraints from the orchestrator (recorded as cycle choices)

- Produce the lockfile with the pinned local npm 12.2.1 from this worktree's `node_modules` (not another npm), so the file's format does not churn. `package.json` does not change.
- Keep the diff to the lockfile entries of `body-parser`, `qs` and whatever the two newly require. If the diff touches other packages, say which and why in the report.
- The machine's `~/.npmrc` has `min-release-age=6`; the task records that it blocks none of the needed versions. If it blocks one, say so rather than overriding it silently (README gives `--min-release-age=0` for a deliberate one-off; use it only if needed and name it).
- This is the only file you change. Commit it by path (`git add package-lock.json`, never `git add -A`/`.`), with an English message in the style of the repository's log (`type: :emoji: summary`); use `git commit -F <file>` if the message needs quotes. Check the commit's author address with `git log --format='%h %ae' -1` — it must be `mariusznn@gmail.com` or the repo's noreply address as the earlier commits.

## Read (selected by the orchestrator)

- Guidelines, whole: `guidelines/coding.md` (AGENTS.md demands it before any product change; its section *Dependency audit* is the one that applies).
- Foundation entries by identifier: decisions D-33, D-79, D-02, D-104 in `foundations/decisions.md`; invariants `introduced-npm-vulnerabilities`, `dependency-audit-refusal`, `application-package-layout`, `account-mutation-request-guards` in `foundations/invariants.md`; the part `build-tools` in `foundations/part_map.md`. Read each entry whole (from its heading to the next heading).
- The task changes no test and no UI, so `guidelines/testing.md` and the styleguide are not selected; if you reach beyond (a test you must change), name the reach in the report.

## Checks to run yourself (focused)

1. `npm audit --omit=dev` from the worktree root — must report no warning (exit 0). Give the command and exit code.
2. `npm ls body-parser qs` — list every copy; `body-parser` >= 2.4.0, every `qs` >= 6.16.1.
3. `git diff --stat 5694146..HEAD` — only `package-lock.json`; `git diff` shows no `resolved` outside `https://registry.npmjs.org/`.
4. `node -e "JSON.parse(require('fs').readFileSync('package-lock.json','utf8'))"` and `npm ci --dry-run` (or equivalent) show the lockfile is coherent with `package.json`.
5. The weakest point of the requirement: that `package-lock.json` really fixes **every** copy of `qs` (nested `node_modules/**/qs` entries too) and that the audit passes for the whole tree it checks — name this check and what it showed in the report.

## Report

Write the full report, as the method gives it, to `C:\Storage\repos\loop2\.runs\worktrees\body-parser-i-qs\.runs\task-cycles\body-parser-i-qs\reports\author-report.md`. Return its status, commits, a one-line check result naming what failed or did not run, and the report path. The report holds your questions and concerns, each reach beyond this handoff, and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
