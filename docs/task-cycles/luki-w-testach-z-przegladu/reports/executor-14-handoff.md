# Handoff — executor of slice 14: the account server's default address under a fully configured start

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `4377e4f36d26b1a8a2b4ee1790bc7a2a92a757f2`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Citations: where you add or change an `// invariant: <id>` or `// decision: D-NN "..."` comment, run `python -B .the-way/elements/common/foundation_check.py` before you commit and put its command and exit code in the report; a quotation after `decision:` must be a passage that begins a sentence of the decision's text, word for word (an earlier slice failed that check, unnoticed until the orchestrator ran it). Where the check reports an error that your change did not cause, name it and the file and line.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-14-report.md`. Your directory for working copies: `.runs/executor-14/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 14 — the account server's default address under a fully configured start

- **Goal:** `tests/invariants/test_account_server_default_address.py` holds a second case, citing
  `account-server-default-address`, that starts the built server with every account setting valid —
  database path, session secret file, public origin, proxy mode, mail settings and the SMTP password
  file, all in a temporary directory — and neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT`, and
  expects what the first case expects: the readiness line on `127.0.0.1:3000`, or an exit with a
  non-zero code naming that address in use (To do 9, the clause "fully configured valid startup");
  seen failing once with the server's default address changed for a moment and restored byte for
  byte.
- **Change:** `tests/invariants/test_account_server_default_address.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:41-41` To do 9 ·
  `foundations/invariants.md:508-517` account-server-default-address · `foundations/invariants.md:758-767`
  account-startup-configuration · `foundations/decisions.md:2689-2714` D-111 ·
  `foundations/decisions.md:1042-1056` D-49 · `tests/startup.test.mjs:42-108` the settings of a start ·
  `tests/startup.test.mjs:459-498` a full valid set of settings · `tests/invariants/loop2_invariant_support.py:1-300`
  the copy, the processes and the server · `tests/invariants/test_account_server_occupied_address.py` ·
  `foundations/part_map.md:66-88` account-server · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — a smoke case beside an existing one, shown red against a break restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/invariants/test_account_server_default_address.py` ·
  `git status --short -- src` shows nothing
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:41-41 — To do 9

9. Nowy przypadek startu serwera kont w pełni skonfigurowanego, bez zmiennych nasłuchu, z powołaniem na `account-server-default-address` (klauzula „fully configured valid startup”; F-13).


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/invariants.md:508-517` account-server-default-address -> current: `foundations/invariants.md:508-516` account-server-default-address
- plan: `foundations/invariants.md:758-767` account-startup-configuration -> current: `foundations/invariants.md:758-766` account-startup-configuration
- plan: `foundations/decisions.md:2689-2714` D-111 -> current: `foundations/decisions.md:2704-2728` D-111
- plan: `foundations/decisions.md:1042-1056` D-49 -> current: `foundations/decisions.md:1057-1070` D-49
- `tests/startup.test.mjs:42-108` the settings of a start
- `tests/startup.test.mjs:459-498` a full valid set of settings
- `tests/invariants/loop2_invariant_support.py:1-300` the copy, the processes and the server
- `tests/invariants/test_account_server_occupied_address.py`
- plan: `foundations/part_map.md:66-88` account-server -> current: `foundations/part_map.md:66-88` account-server
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
