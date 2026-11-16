FAIL 6c528d80bde0510622265c5d5993049fb84b990c

# Review of the whole change — task `hook-wersji-the-way`

Range: base `3b48f89f8a3f7a3f306e7a72a68d7e0dff3942fa` to head `6c528d80` (one commit, one author, no plan, no spec). `git rev-parse HEAD` in the worktree is `6c528d80bde0510622265c5d5993049fb84b990c`, the head given. Slices: none (one author); every finding below comes from that one commit.

Counts: blocking 1 (Important, within the task); Minor 7 (all within the task); out of scope 1 (Minor). Critical: none.

## Coverage of the task

| Item | Met | Evidence |
|---|---|---|
| To do 1 — `.claude/settings.json` with a `SessionStart` hook | yes | `.claude/settings.json:3-14`, exec form `node` + `${CLAUDE_PROJECT_DIR}/.claude/hooks/the-way-pin-check.mjs`; matches the docs' exec form (`args` present → spawned with no shell, placeholder substituted into each element). |
| To do 2 — compares the commits; on mismatch or no init warns with both values and `git submodule update --init -- .the-way`; silent on agreement | yes, except where the check itself fails (Important finding 1) | `the-way-pin-check.mjs:33-47,49-73,75-82`; tests at `test_the_way_pin_hook.py` (7 cases, passing). |
| To do 3 — agent (context) and human (screen) | yes, for sessions started in the root | `additionalContext` + `systemMessage`; fact `claude-code-session-start-hook-output` (passages verified, below). |
| To do 4 — blocks nothing | yes | every path ends with exit code 0, no `continue`/`decision` field; docs: SessionStart has "No blocking or decision control". |
| To do 5 — Windows, Linux, macOS | yes by design; Windows run by me, Linux by CI, macOS by reasoning | no shell, `node`/`git` by name, `path.join`/`resolve`. |
| To do 6 — one sentence in `AGENTS.md` outside the the-way block | yes | `AGENTS.md:19`, before `<!-- the-way:begin -->`. |
| Settlement row 1 → D-414 | yes, with Minor findings 2, 3, 5 | `foundations/decisions.md:10957-10970`. Every element of the row is in the binding sentence (warns agent and human; mismatch or not initialized; three systems; blocks nothing; no Codex). Additions: "started in the repository root" (forced by the measured behaviour, stated honestly in *Rationale* as the product's own measurement whose record is not open, as the environment-facts template asks — WAY-90), "prints nothing where they agree" and "both commits and the repair command" (To do 2), "a Node.js script" (the cycle's Q1). *Rejected* holds exactly the *Not chosen* of questions 1, 2, 3 and 5. |

Subdirectory sessions: D-414's binding sentence and the `AGENTS.md` sentence both say "started in the repository root", and the *Rationale* says the narrower reach was measured once, on Windows with Claude Code 2.1.325, and is accepted. That is honest. To do 1 and 3 stay met as the task intends: the task's own scenario (a session in loop2 after a branch change or a pull) is a session started in the root or in a worktree's root, and a worktree's root has its own tracked `.claude/settings.json`, so the hook runs there with the worktree as its root. I did not re-measure the subdirectory behaviour (see checks).

## Findings

### Important

**I-1 — A failure of the check is shown as agreement: the hook falls silent, which is its "the commits agree" answer** (within the task; blocking)

- Place: `.claude/hooks/the-way-pin-check.mjs:18-29` (`git()` turns every failure into `null`), `:33-37` and `:78` (a `null` pin returns with no output), `:84-88` (a catch-all that swallows every exception of the script, with no output).
- What is wrong: the hook has one output channel for "all is well" — silence. Any failure of `git ls-files` inside a real repository (an unreadable or damaged index, a `safe.directory` refusal, the 15 s timeout, `GIT_DIR` pointing elsewhere) is conflated with "the repository pins nothing" and ends in silence; any exception of the script itself (a future bug) ends in silence too. The agent and the human then see exactly what they see when `.the-way` is at the pinned commit, which is the false negative this hook exists to remove.
- Evidence: a fixture under my working directory — a repository pinning a real submodule, `.the-way` checked out one commit back. With a healthy index the hook printed the warning (exit 0). With `.git/index` damaged (`git ls-files --stage -- .the-way` → `fatal: .git/index: index file smaller than expected`) the same mismatch gave **no output and exit 0**.
- Why it matters: `guidelines/coding.md` § Hiding a failure (applies to agent-workflow) forbids turning a failure into an "all is fine" answer; a degraded mode is allowed only where the task settles it as a product decision. The task does not settle it; D-414's *Verification* (written by this change, `decisions.md:10964`) settles silence only "where git is missing or the repository pins nothing", not where git fails inside a repository or where the hook itself fails. Section 3 of the method lists swallowed errors as Important. A reasonable user reads silence as agreement.
- What would fix it (the fixer's choice): keep exit code 0 on every path, but tell apart "no repository / no gitlink / no git" (silent, as D-414 gives) from "a repository whose `git` command failed" and from an exception of the script, and for the last two print a short `systemMessage` and `additionalContext` saying the check of `.the-way` could not run and why, with the repair command. If silence on an unreadable repository is kept on purpose, D-414 has to say so and the human has to accept it.

### Minor (all within the task)

**M-1 — The script's header and one test's name say a session started in a subdirectory is checked, which D-414's *Rationale* says does not happen.**
`.claude/hooks/the-way-pin-check.mjs:5-6` — "so a session started in a subdirectory still checks the same repository"; `tests/agent_workflow/test_the_way_pin_hook.py:151` — `test_a_session_started_in_a_subdirectory_checks_the_same_repository`. The author measured that Claude Code does not run the root hook for a session started in a subdirectory. Taking the root from the script's place is still right: it protects a hook run whose working directory is not the root. But the wording leads a reader to think subdirectory sessions are covered. Reword both to "a hook run from a working directory other than the root".

**M-2 — D-414's *Rationale* says something about the agent instructions that they do not say.**
`foundations/decisions.md:10969` — "the decision to stop work stays with the human, as the agent instructions give it". `AGENTS.md` says "If initialization fails or the commits differ, stop" with no condition. The human's choice comes from question 2 of the task ("o przerwaniu pracy decyduje człowiek") and question 5, not from the agent instructions. That is a source-fidelity slip. A reader could take it to mean the instructions let work go on after a mismatch. Attribute it to the owner's choice, for example: "the human decides what follows a mismatch, while the rule of the agent instructions to stop stays".

**M-3 — D-414's *Rationale* says "PowerShell runs on Windows alone".**
`foundations/decisions.md:10969`. That is not true of PowerShell 7, which runs on Linux and macOS but is not installed there by default. The phrase comes from the task's carried question, so it is the task's wording, but in a foundation entry it states a false fact. Say "PowerShell is not installed on Linux and macOS by default".

**M-4 — The fact's passages do not show the field names its sentence rests on.**
`foundations/environment_facts.md:866-868`. The sentence ties `systemMessage` and `additionalContext` to their effects. The quoted passages ("Warning message shown to the user." · "A SessionStart hook can add context for Claude, …" · "Claude Code wraps the string in a system reminder …") do not name either field. A reader comparing the passages with the source has to find the table row and the sentence before them. The page holds passages that name the field in the same run of text: "The `additionalContext` field passes a string from your hook into Claude's context window." (§ Add context for Claude), and the SessionStart table cell for `additionalContext`, "String added to Claude's context at the start of the conversation, before the first prompt. …". The content agrees with the source: I verified all three quoted passages word for word in the live page and in the archived capture `20261113161817`. So the finding is Minor (WAY-364).

**M-5 — D-414 rests on a behaviour of Claude Code that no fact holds.**
`foundations/decisions.md:10959,10962`. The sentence "started by the same command on Windows, Linux and macOS" rests on Claude Code's exec form: with `args`, `command` is resolved on `PATH` and spawned with no shell, and `${CLAUDE_PROJECT_DIR}` is substituted into each element. If that stopped being true, the decision's portability claim would be called into question. The environment-facts template asks for a fact for such a citation ("the behaviour of a tool the process uses"). The author judged it an implementation detail. The docs passage exists (§ Exec form and shell form, "**Exec form** runs when `args` is present. Claude Code resolves `command` as an executable on `PATH` and spawns it directly with `args` as the argument vector. There is no shell, …").

**M-6 — The test's temporary folder leaks when the class set-up fails.**
`tests/agent_workflow/test_the_way_pin_hook.py:73-88`. `setUpClass` creates the folder with `tempfile.mkdtemp()` and then runs six git commands. If any of them raises, unittest does not call `tearDownClass`, and the folder with its repositories stays in the system temporary directory. D-84 asks a test to clean up its files "even after failure". Use `cls.addClassCleanup(shutil.rmtree, cls.base, onexc=…)` right after `mkdtemp`.

**M-7 — "the owner" in D-414 means the person, while the glossary's `owner` is an account role.**
`foundations/decisions.md:10970` — "the owner prefers a warning", "the owner turns it on in the settings of the repository". The glossary entry `owner` is "an account whose role is `owner`". Context makes the meaning clear, other decisions already use "the owner" for the person, and no reader is likely to misread these sentences, so this is Minor (WAY-297).

### Out of scope

**O-1 (Minor, out of scope) — The new JavaScript file gets no ESLint rule, and nothing in the gate formats or lints it.**
`.claude/hooks/the-way-pin-check.mjs`. `eslint --print-config` gives it `"rules": {}`. D-29 and D-32 name only browser-view, simulation, account-server, build-tools and deployment. `tests/quality/test_source_tool_scope.py` takes the same parts. So the change complies with D-29. But D-28 (Scope includes agent-workflow) says "The general coding quality checks cover all code, tests included", and every new script of agent-workflow now passes the gate with no check. The gap is older than this change; D-29's *Rejected* names the play skill's scripts. I ran `@eslint/js` `recommended` on the file through a temporary config: no report, exit 0. Prettier `--check`: passes. A decision on JS of agent-workflow, or an extension of D-29 and D-32 to `.claude/hooks/**`, is a task of its own.

## Declined to judge

- A warning for Codex sessions — outside the task by its question 3.
- Branch protection of `main` against commits and pushes — outside the task by its question 5.
- Whether other Claude Code versions or other systems run the root hook for a session started in a subdirectory — the task cannot change it from the repository. D-414 records it as a measurement, not as a rule.
- Whether `"continue": false` in a SessionStart hook's JSON stops a session (D-414's *violates* list names it) — nothing in the change prints it.

## Hostile input (the handoff's note, not a named boundary)

- Only two `git` commands run, through `execFileSync` with no shell and fixed arguments. The only values from the repository's place are the root and `<root>/.the-way`, and they go through `-C` as one argument each. The tests' folder names hold a space, quotes, `&` and `{}`, and pass.
- The hook never reads `.gitmodules`.
- `rev-parse HEAD` runs only where a gitlink is pinned and `.the-way/.git` exists. A clone cannot plant `.the-way/.git`, because git refuses `.git` path components. A tracked symlink at `.the-way` is mode 120000, not 160000, so the regex gives no pin and the hook stays silent.
- A locally made symlink or foreign `.git` at `.the-way` leads to a comparison, never to the running of code. `rev-parse HEAD` reads no index and starts no fsmonitor or hook.
- Exit code: 0 on every path I ran (agreement, mismatch, not initialized, unreadable `.git`, no git on `PATH`, no repository, no gitlink, damaged index).

## Checks run

| Check | Command or method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` | `6c528d80bde0510622265c5d5993049fb84b990c` = the head given |
| Diff and log | `git diff 3b48f89f…..6c528d80`, `git log --stat` (same range) | 6 files, +322 |
| Hook tests | `python -B scripts/test.py tests/agent_workflow/test_the_way_pin_hook.py` | exit 0, 7 tests OK (Windows) |
| Private paths invariant | `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` | exit 0 |
| Cross-part imports invariant | `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` | exit 0, 10 tests |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | exit 0; 0 error, 143 warn, none on the changed files (`AGENTS.md:30` `dead-path` predates the change) |
| File sizes | `python -B .the-way/task-cycle/change_file_sizes.py 3b48f89f… 6c528d80` | exit 0; +322 lines, largest new file 193 lines. `guidelines/coding.md` has no `### Size of a function and a file` rule, so there is no size test to run (WAY-363) |
| Ruff | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/agent_workflow/test_the_way_pin_hook.py` | exit 0 |
| Prettier | `node node_modules/prettier/bin/prettier.cjs --check --no-config .claude/hooks/the-way-pin-check.mjs` | exit 0 |
| ESLint, repository config | `node node_modules/eslint/bin/eslint.js --max-warnings 0 .claude/hooks/the-way-pin-check.mjs` | exit 0; `--print-config` shows `"rules": {}` (O-1) |
| ESLint, `@eslint/js` recommended | temporary flat config with `js.configs.recommended` + node globals, `--no-config-lookup -c` | exit 0, no report |
| Line endings | `git ls-files --eol` on the three new files | `i/lf w/lf`, no attribute |
| Hook on a fixture (manual) | repository pinning a real submodule, `.the-way` one commit back; `node .claude/hooks/the-way-pin-check.mjs` | warning JSON, exit 0 |
| Silence on a git failure (manual) | same fixture, `.git/index` damaged | no output, exit 0 (evidence for I-1) |
| Environment fact source | `curl` of `https://code.claude.com/docs/en/hooks.md` and of the archived capture `20261113161817` (`id_`), passages searched with markup dropped | all three quoted passages found word for word in both |
| Exec form and SessionStart blocking in the docs | grep of the downloaded page | exec form with `args` spawns with no shell and substitutes `${CLAUDE_PROJECT_DIR}`; SessionStart: "No blocking or decision control" |

Not run:
- The full gate (`npm test`): by the handoff, the orchestrator runs it. The new `test_*.py` counts as covered only once that run shows it executed (D-83). `tests/agent_workflow/` already holds tracked `test_*.py` files, so the runner's discovery reaches the directory.
- Linux and macOS: no such machine here. CI on Linux runs the test file.
- A real Claude Code session, from the root or from a subdirectory: not repeated, so the author's measurement stays unverified by me.

## Reaches beyond the dispatch

- D-29 (whole), `decisions.md:873-886`: not in my index (its *Scope* omits agent-workflow); read to judge the lint gap the handoff raised (O-1).
- `.the-way/project-level/technology/reserved_choices.md` (whole): the method's check of a reserved choice. Node for the hook adds nothing to run or pay for, so it is no reserved choice.
- `.the-way/elements/environment-facts/template.md` and `skill/SKILL.md` (whole): to judge the new fact (M-4, M-5).
- The Claude Code hooks page and its archived copy, by `curl`, into my working directory: to verify the fact's passages and the exec form.
- Glossary entries `owner` and `integration test`: terms the change uses.

## Working copies

- `.runs/review-whole/` held the decision index (`index.md`, `sections.md`), the downloaded docs (`hooks.md`, `hooks-archived.html`), the instruction-check output, a temporary ESLint config, and the fixture `fixture/` (a repository and a submodule origin). All of it is removed: the directory no longer exists.
- For the ESLint run, a copy of that config stood briefly at the worktree root as `eslint.review.tmp.mjs`, untracked, because ESLint resolves the config's imports from its place. It was removed in the same command, and `git status --short` is empty afterwards.
- Remainder: none.

## Unread material

- Decisions of my index read whole: **10 of 49** (D-77, D-78, D-79, D-81, D-82, D-83, D-84, D-362, D-413, D-414), plus D-29 outside the index. The log has no topical sections, so the index stands in for the rest (way_of_working, "Reading the foundation" step 2).
- D-252 bears on the change and was read in part: its binding sentences, *Scope* and *Based on* (`decisions.md:6250-6269`), without its *Verification*, *Rationale* and *Rejected*.
- Guidelines: `guidelines/coding.md` and `guidelines/testing.md` read whole. No `coding-<kind>.md` matches.
- Part map: the entries of agent-workflow and product-foundation read whole.
- Invariants reached: `ruff-source-rules`, `node-test-selection`, `cross-part-imports`, `tracked-file-private-paths`, `tracked-file-private-names`. The last three were read whole. The first two were read from heading to *Part*; their *Violated* lines are unread. The game invariants with *Part* `every` do not reach the change and were set aside.
- Glossary: `owner` and `integration test` read whole; no other term of the change has an entry.
- The decision template of the-way: not opened. The foundation check passes, and D-414 has the fields of D-413.

## Searches not found or unclear

- I found no statement in the docs of which working directory a SessionStart hook gets on `clear` or `compact` after the agent changed directory. So whether the root-from-the-script's-place design (M-1) matters in practice is unclear.
- Whether Claude Code reads the root `.claude/settings.json` for a session started in a subdirectory: not verified by me. It stays the author's single measurement.
