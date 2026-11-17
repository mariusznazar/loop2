# Handoff — executor of slice 3: account-server citations: registration, password login, playing before confirmation

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `c90b3211289a5ef32493329c64dc7afe19d76139`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-3-report.md`. Your directory for working copies: `.runs/executor-3/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 3 — account-server citations: registration, password login, playing before confirmation

- **Goal:** in `tests/http.test.mjs`, the cases that check that anyone creates a player account and
  plays without the operator's approval, that an account signs in with its address and password, and
  that a player plays after registering before confirming the address carry
  `// invariant: player-self-registration`, `// invariant: player-password-login` and
  `// invariant: email-verification-nonblocking` at the case, each on the case that checks the whole
  sentence (for example „registration stores an Argon2id hash of the exact password and signs this
  browser in at once”, „a known address with a wrong password and an unknown address fail login
  identically” and „registration answers 201 with its message's outcome in every case and the player
  stays signed in”; the executor finds the right ones by name); each newly citing case is seen
  failing once against `src/server/` broken for a moment and restored byte for byte. The two cases of
  `tests/transport.test.mjs` that already cite `player-express-session-sqlite-store` are seen failing
  once with the project's Store replaced for a moment by the library's default store, and restored;
  that file is not changed. Where no case checks one of the three sentences whole, the slice adds no
  case and returns `questions` naming the sentence and the nearest case.
- **Change:** `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:43-43` To do 11 ·
  `foundations/invariants.md:608-637` player-self-registration, player-password-login,
  email-verification-nonblocking · `foundations/invariants.md:678-687`
  player-express-session-sqlite-store · `foundations/decisions.md:2857-2871` D-96 ·
  `foundations/decisions.md:3146-3161` D-152 · `foundations/decisions.md:2806-2835` D-202 ·
  `foundations/decisions.md:2601-2613` D-107 · `foundations/environment_facts.md:354-359`
  express-session-store-contract · `tests/transport.test.mjs:773-907` the two cases citing the store ·
  `foundations/part_map.md:66-88` account-server · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — four sentences each need the case that checks them whole and a break of the
  server shown red and restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/http.test.mjs` · `npm.cmd test -- tests/transport.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` passes, and the run
  without the switch reports only the invariants Slice 4 cites
- **Depends on:** Foundation entries (the four *Method* rows)

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:43-43 — To do 11

11. F-14 — metoda `test` i znaczniki w testach, które je sprawdzają, dla `player-express-session-sqlite-store`, `player-self-registration`, `player-password-login`, `email-verification-nonblocking`, `account-save-durable-storage` (znacznik z `tests/deploy/test_account_storage.py`, przypadek `test_replaced_container_keeps_accounts_and_sessions`, przepięty z `account-schema-lifecycle`) i `loop2-shared-public-origin` (powołanie w testach `account-client-requests`).


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/invariants.md:608-637` player-self-registration, player-password-login,   email-verification-nonblocking -> current: `foundations/invariants.md:608-616` player-self-registration; `foundations/invariants.md:618-626` player-password-login; `foundations/invariants.md:628-636` email-verification-nonblocking
- plan: `foundations/invariants.md:678-687` player-express-session-sqlite-store -> current: `foundations/invariants.md:678-686` player-express-session-sqlite-store
- plan: `foundations/decisions.md:2857-2871` D-96 -> current: `foundations/decisions.md:2872-2885` D-96
- plan: `foundations/decisions.md:3146-3161` D-152 -> current: `foundations/decisions.md:3161-3175` D-152
- plan: `foundations/decisions.md:2806-2835` D-202 -> current: `foundations/decisions.md:2821-2849` D-202
- plan: `foundations/decisions.md:2601-2613` D-107 -> current: `foundations/decisions.md:2616-2627` D-107
- plan: `foundations/environment_facts.md:354-359` express-session-store-contract -> current: `foundations/environment_facts.md:354-358` express-session-store-contract
- `tests/transport.test.mjs:773-907` the two cases citing the store
- plan: `foundations/part_map.md:66-88` account-server -> current: `foundations/part_map.md:66-88` account-server
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
