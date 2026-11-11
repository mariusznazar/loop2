# Handoff — the one author (make-change, "the whole change as the one author")

Delegation: the person who requested this cycle (the product's owner) has delegated every
intermediate choice to the orchestrator of `implement-task`. Your questions go to the orchestrator,
not to the human. Nothing here is the human's approval.

## Where you work

- Worktree (work only here, from its root; use absolute paths and `cd` into it in every shell call):
  `the root of the task's worktree`
- Branch `task/odtwarzanie-bazy-z-kopii`, base `f672c7b1d7e71c7f8077b2bb5f16fd9b37196998`. Dependencies are installed (`npm ci` done). `.the-way` is initialised at the pinned commit `e3825a82386a61930a86f8517fc0c5f422fc2833`.
- Commit by explicit paths (`git add <path> <path>`), never `git add -A`/`.`/`commit -a`. Commit messages in English, in the form of the repository's log (`type: :emoji: text`, e.g. `docs: :memo: …`). Do not push. Do not touch the checkout at `the main checkout of the repository`.
- Write no scripts that rewrite files with Python/Bash heredocs without first reading `the author's rule on writing scripts` (line endings, console encoding, backslashes in Python literals).

## Method

Read whole `.the-way/.claude/skills/the-way-make-change/SKILL.md` (use the project skill `the-way-make-change` if you can invoke it; its method is that file) and follow it as **"the whole change as the one author"**. Read a file it names, or that sits beside it, only when the step or variant that names it comes. The foundation step is yours with the code: read `.the-way/task-cycle/skill/foundation_step.md` whole (and the skill of each element when you write an entry of it: `the-way-record-decision`, `the-way-record-environment-fact`). Write every foundation entry only through those skills.

Your report path: `docs/task-cycles/odtwarzanie-bazy-z-kopii/reports/author-report.md` (full report there, as your method gives it, including **Unread material**, **Searches not found or unclear** and the own-work check). Return only status, commits, a one-line check result and that path, plus questions/concerns.

## The task

Frozen task (read it whole; it is the binding text): `docs/task-cycles/odtwarzanie-bazy-z-kopii/task.md`.

Read it with these notes of the orchestrator:

1. Line numbers in *To do* are from `main` `72287c2`; search the place by its text. The file is `.claude/skills/loop2-deploy/references/backup_and_restore.md`; its twin `.agents/skills/loop2-deploy/` must stay byte for byte equal (`tests/agent_workflow/test_loop2_deploy_skill.py` checks it). If `SKILL.md` of the skill also says something the new instruction contradicts (e.g. the list of what an agent may read, the "never tried" status, links), correct it too, in both copies.
2. Items 1–14 are edits of the instruction; item 15 is **not yet doable**: the restore on the server is the task's human action ("in the cycle") and the cycle never performs it. Do not invent a date or a result. Leave the sentence `The procedure has never been tried.` in place and say in your report that item 15 and the acceptance criterion's "places where Mariusz got stuck" wait for the human's trial and will come in a correction after the request. Do not write a placeholder that looks like a result.
3. Item 6 carries the one question the task hands to the cycle: how step 1 of the restore reads which backup is the newest, when D-230 says nothing reads the destination's list of files. The ways the task names: fetch the weekday files under their fixed names with their times kept, or read it from the backup log. Choose the smallest reversible reading that fulfils the task, make the command exact (the fetch must check the host key against `/etc/loop2/strych-known-hosts`, as `deploy/loop2-backup` does when it reaches Strych), name your choice and the way not chosen in your report, so that the orchestrator can enter it in the questions table.
4. Item 14 asks for one command that returns only a number: the count of lines setting `KnownHostsCommand` or `VerifyHostKeyDNS` in root's SSH configuration and in the system-wide one, including files pulled in by `Include`, not depending on letter case, skipping comment lines. Test the command you write as far as you can on this computer with fake files (note which tool you ran it with and that the server's own tools may differ); item 16 (the environment fact) is read from that command, so the fact must state what the command counts and the expected `0`. You do not read the server yourself (D-12; you run no `mikrus` tool). The value the fact states (what the command returns on the server) is a value from a source you do not have: return it as a `questions` status with the final command text and exact wording, and the orchestrator will take the reading with the command through the `mikrus` MCP server (a read that counts and changes nothing) and resume you with the result, which you cite as the fact's source (WAY-80). Write the instruction first, commit it, and return `questions` at that point; do not write item 16 or D-238's *Based on* before the reading arrives.
5. Settlement rows 1 and 2 of *Settlements to record* are accepted; write them whole as decisions (WAY-134) through `the-way-record-decision`, with the search of the whole foundation that `way_of_working.md` step 2 gives. Item 16 is an environment fact; D-238's *Based on* then points at it (through `the-way-record-environment-fact` and `the-way-record-decision`).
6. Items 11 and 12 mention `src/browser/view/app.ts`, `src/browser/sim/saved-game.ts`, `scripts/restore-trial.mjs`; read what is there before writing about the saved-game version and the restore trial. Items 2 and 3 mention `deploy/loop2-backup` behaviour; check against that script. Every command, path, mode, exit code, name and number you put into the instruction is taken from the repository's code or from the foundation, never from memory; a value you cannot ground goes to the orchestrator as a question.
7. Out of scope: the task's *Out of scope* (loop2#046-93 gets no sentence) and anything not in *To do*. Do not change `deploy/**`, product code or tests unless a To do item needs it; if one does, return `questions` first.

## Answers of the orchestrator at start

- Does the change touch a trust boundary: no (parts `agent-workflow`, `product-foundation`; `deploy/**` is read only). Still: a command in a recovery procedure for keys, SSH host-key checking and file modes is checked by every review against `deploy/loop2-backup` and `scripts/restore-trial.mjs`.
- Irreversible operation: yes — the restore of the database on the server. The change only prepares it: the instruction is text; nothing in your change runs it, and you run nothing on the server. Do not run any `mikrus` MCP tool.
- Open design choice: none (see note 3). Reserved choice: none. Route: one author, no plan. Your class: `same` as the orchestrator's.

## What to read (by the orchestrator's selection; whole files)

Parts touched: `agent-workflow` (the skill files `.claude/skills/loop2-deploy/**`, `.agents/skills/loop2-deploy/**`, `tests/agent_workflow/**`) and `product-foundation` (`foundations/**`). Read the two parts' entries of `foundations/part_map.md`.

- Guidelines, whole: `guidelines/coding.md` (its kind index decides whether a `coding-<kind>.md` applies; the change writes no product code unless note 7 triggers) and `guidelines/testing.md` (the twin test and the foundation check must keep passing; you may not need to change a test).
- Decisions of the task's *Decisions in play*, each whole by the range from its heading to the next: D-12, D-13, D-15, D-96, D-137, D-209, D-228, D-230, D-231, D-232, D-233, D-234, D-238. Plus, by the selection of way_of_working.md "Reading the foundation" for your parts, the decisions whose *Scope* names `agent-workflow` or `product-foundation` that bear on the loop2-deploy skill and the foundation entries you write (e.g. D-28, D-30, D-31 only if you write code; D-254/D-359 are about Playwright and need not be read). The invariants of those parts and the glossary terms the instruction uses (read the glossary whole, it is short).
- The passages of the task: all of it.
- Sources in the repository: `.claude/skills/loop2-deploy/SKILL.md`, all of `.claude/skills/loop2-deploy/references/backup_and_restore.md`, `.claude/skills/loop2-deploy/references/setup_and_secrets.md` where the instruction links to it, `deploy/loop2-backup`, `scripts/restore-trial.mjs`, `src/browser/view/app.ts:40-95`, `src/browser/sim/saved-game.ts` around the version constant, `src/server/account-policy.ts:20-30`, and the mentioned decisions' *Based on* facts in `foundations/environment_facts.md`.

## Checks you run

Your own focused checks: `python -B tests/agent_workflow/test_loop2_deploy_skill.py` or via `npm test -- <path>` as `scripts/test.py` gives for one file, and `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after each foundation entry. You do not run the whole gate; the orchestrator does (step 10). Report each check with its command and exit code. The baseline of the gate on the base is being measured by the orchestrator and will be handed to you if it contains a failing check.

## Boundary

Make the change and the foundation entries, commit them in as many commits as are natural (instruction edits; foundation entries), stop at your report. Do not start review, the request or the return step.
