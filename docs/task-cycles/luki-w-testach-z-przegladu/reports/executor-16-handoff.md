# Handoff — executor of slice 16: the six tests of the server's scripts run with Git's bash

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `8ac7ca4e2134bd3720eb2fb38a4b8bef45f9147f`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Citations: where you add or change an `// invariant: <id>` or `// decision: D-NN "..."` comment, run `python -B .the-way/elements/common/foundation_check.py` before you commit and put its command and exit code in the report; a quotation after `decision:` must be a passage that begins a sentence of the decision's text, word for word (an earlier slice failed that check, unnoticed until the orchestrator ran it). Where the check reports an error that your change did not cause, name it and the file and line.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-16-report.md`. Your directory for working copies: `.runs/executor-16/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 16 — the six tests of the server's scripts run with Git's bash

- **Goal:** each of the six files that check `loop2-deploy-trigger-input`, `loop2-deploy-keeps-running`,
  `loop2-deploy-log-dump`, `account-save-backup-encrypted`, `account-save-backup-failure-notice` and
  `failure-watcher-message` runs on this computer with the bash of Git for Windows
  (`the Git for Windows installation\bin\bash.exe`, the one `deploy_script_support.git_bash` finds) and passes, no
  case skipped for want of bash (To do 13). The report gives, for each file, the command, its exit
  code, the number of tests run and skipped and the result, for the orchestrator to copy into the
  cycle record. A failure is diagnosed and repaired in the test or its support file; where its cause
  lies in a script under `deploy/`, the slice changes no file of `deploy/` and returns `blocked`,
  naming the cause and the repair, so that the repair gets a slice and a review of its own.
- **Change:** `tests/invariants/test_loop2_deploy_trigger_input.py` ·
  `tests/invariants/test_loop2_deploy_keeps_running.py` · `tests/deploy/test_loop2_deploy_dump.py` ·
  `tests/invariants/test_account_save_backup_encrypted.py` ·
  `tests/invariants/test_account_save_backup_failure_notice.py` · `tests/deploy/test_loop2_watch_message.py` ·
  `tests/deploy/deploy_script_support.py` · `tests/deploy/backup_script_support.py` ·
  `tests/deploy/watch_script_support.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:45-45` To do 13 ·
  `foundations/invariants.md:125-144` loop2-deploy-trigger-input, loop2-deploy-keeps-running ·
  `foundations/invariants.md:1248-1267` loop2-deploy-log-dump, failure-watcher-message ·
  `foundations/invariants.md:1118-1137` account-save-backup-encrypted, account-save-backup-failure-notice ·
  `foundations/decisions.md:2378-2404` D-235 · `foundations/environment_facts.md:9-14`
  openssh-authorized-keys-options · `foundations/environment_facts.md:492-503` mikrus-pusher-mail,
  age-file-encryption · `deploy/loop2-deploy` · `deploy/loop2-backup` · `deploy/loop2-watch` ·
  `foundations/part_map.md:153-188` deployment · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — six runs to read and record, and a failure on Windows to diagnose where one
  comes.
- **Risk:** none
- **Checks:** `npm.cmd test -- <file>` for each of the six files, each with its exit code and counts
  in the report · `git status --short -- deploy` shows nothing
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:45-45 — To do 13

13. Sześć testów skryptów serwera wymagających basha z Gita (`loop2-deploy-trigger-input`, `loop2-deploy-keeps-running`, `loop2-deploy-log-dump`, `account-save-backup-encrypted`, `account-save-backup-failure-notice`, `failure-watcher-message`) uruchomione z bashem; wynik w zapisie cyklu, porażka naprawiona.


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/invariants.md:125-144` loop2-deploy-trigger-input, loop2-deploy-keeps-running -> current: `foundations/invariants.md:125-133` loop2-deploy-trigger-input; `foundations/invariants.md:135-143` loop2-deploy-keeps-running
- plan: `foundations/invariants.md:1248-1267` loop2-deploy-log-dump, failure-watcher-message -> current: `foundations/invariants.md:1238-1246` loop2-deploy-log-dump; `foundations/invariants.md:1248-1256` failure-watcher-message
- plan: `foundations/invariants.md:1118-1137` account-save-backup-encrypted, account-save-backup-failure-notice -> current: `foundations/invariants.md:1108-1116` account-save-backup-encrypted; `foundations/invariants.md:1118-1126` account-save-backup-failure-notice
- plan: `foundations/decisions.md:2378-2404` D-235 -> current: `foundations/decisions.md:2393-2418` D-235
- plan: `foundations/environment_facts.md:9-14` openssh-authorized-keys-options -> current: `foundations/environment_facts.md:9-13` openssh-authorized-keys-options
- plan: `foundations/environment_facts.md:492-503` mikrus-pusher-mail,   age-file-encryption -> current: `foundations/environment_facts.md:492-496` mikrus-pusher-mail; `foundations/environment_facts.md:498-502` age-file-encryption
- `deploy/loop2-deploy`
- `deploy/loop2-backup`
- `deploy/loop2-watch`
- plan: `foundations/part_map.md:153-188` deployment -> current: `foundations/part_map.md:153-188` deployment
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
