# Author report — task `hook-wersji-the-way`

## Status

`done`

## Commits

- `6c528d80` — `feat: :bell: warn the agent and the human at the start of a Claude Code session when .the-way stands on another commit than the pinned one or is not initialized, ... (D-414)` (one commit, on `task/hook-wersji-the-way`, not pushed).

## Files (added / removed lines)

| File | + | - |
|---|---|---|
| `.claude/hooks/the-way-pin-check.mjs` (new) | 89 | 0 |
| `.claude/settings.json` (new) | 17 | 0 |
| `AGENTS.md` | 2 | 0 |
| `foundations/decisions.md` (new entry D-414) | 15 | 0 |
| `foundations/environment_facts.md` (new fact `claude-code-session-start-hook-output`) | 6 | 0 |
| `tests/agent_workflow/test_the_way_pin_hook.py` (new) | 193 | 0 |

## What was made

- **Hook** `.claude/hooks/the-way-pin-check.mjs` (Node, builtins only). The repository root is taken from the script's own place (two directories up), not from the environment or the working directory. It runs two read-only commands through `execFileSync("git", [...])` with no shell and fixed arguments: `git -C <root> ls-files --stage -- .the-way` (the pin) and `git -C <root>/.the-way rev-parse HEAD` (the checkout). A checkout counts only where `.the-way/.git` exists, because in an uninitialized submodule `git -C .the-way rev-parse HEAD` returns the parent repository's own commit. Pin unreadable (no git, not a repository, no gitlink) leads to silence; checkout unreadable or absent leads to a warning; agreement leads to silence. Every path ends with exit code 0 (the body is in a try/catch; `process.exitCode = 0`).
- **Output on a mismatch**: one JSON object, `systemMessage` (4 short lines for the human: pinned, checked out, repair command) and `hookSpecificOutput.hookEventName = "SessionStart"` with `additionalContext` (for the agent: both commits, the repair command, the AGENTS.md rule to stop, tell the human).
- **Settings** `.claude/settings.json`: `SessionStart`, no matcher (fires for startup, resume, clear, compact, fork; silent when the commits agree), exec form: `"command": "node"`, `"args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/the-way-pin-check.mjs"]`. No absolute path (D-362).
- **AGENTS.md**: one sentence in the part outside the `<!-- the-way:begin -->` … `<!-- the-way:end -->` block (this worktree's file does hold the markers; the sentence stands before `<!-- the-way:begin -->`). It names the hook, the two cases and says the rule to stop on a mismatch stays in force. I added "started in the repository root" (see the weakest point).
- **Foundation entries** (the foundation step): see below.

## Foundation entries

| Entry | Mark | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|
| D-414 in `foundations/decisions.md` (Scope agent-workflow, Based on `claude-code-session-start-hook-output`, Relations none, Verification: tests + a complies/violates pair for the part no test holds) | `row 1` | At the start of a Claude Code session started in the repository root, the hook of the repository warns the agent (context) and the human (screen) with both commits and the repair command when `.the-way` is on another commit than pinned or not initialized, prints nothing when they agree, blocks nothing, is a Node.js script started by one command on Windows, Linux and macOS, and covers no Codex session. | Na starcie sesji Claude Code uruchomionej w katalogu głównym repo hook ostrzega agenta (kontekst) i człowieka (ekran), podając oba commity i polecenie naprawy, gdy `.the-way` stoi na innym commicie niż przypięty albo nie jest zainicjowany; gdy się zgadzają, milczy; niczego nie blokuje, jest skryptem Node uruchamianym tym samym poleceniem na trzech systemach i nie obejmuje Codexa. |
| `claude-code-session-start-hook-output` in `foundations/environment_facts.md` | `the cycle's` | A `SessionStart` command hook of Claude Code shows a warning to the person through `systemMessage` and adds text to the agent's context through `additionalContext` of the JSON it prints. | Hook `SessionStart` Claude Code pokazuje człowiekowi ostrzeżenie przez pole `systemMessage` i dodaje tekst do kontekstu agenta przez `additionalContext` drukowanego JSON-a. |

Why the fact is `the cycle's`: row 1 names no *Based on*, but the decision rests on the behaviour of a tool the process uses (the template of decisions asks a fact entry for that), so I wrote one, following `elements/environment-facts/skill`. Source: the page `https://code.claude.com/docs/en/hooks` read 2026-11-16 as raw markdown (`.md` address, curl); archived copy found through the CDX index (capture `20261113161817`), where I checked the three passages stand word for word. Please look at it as an entry the human has not yet accepted. Not written as facts: the exec form of hooks and `CLAUDE_PROJECT_DIR` (an implementation detail the decision does not stand on); the finding on subdirectories (own measurement, kept in D-414's *Rationale* as the template says).

*Rejected* of D-414 holds only the ways the row's questions keep (1: Windows alone; 2: agent alone; 3: Codex too; 5: blocking skill calls, blocking commit/push to `main`). I wrote the owner's name nowhere (kept as "the owner").

## Checks run (command, exit code)

| Check | Command | Exit |
|---|---|---|
| Hook tests (7 cases) | `python -B scripts/test.py tests/agent_workflow/test_the_way_pin_hook.py` | 0 (run before and after the commit) |
| Private-path invariant | `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` | 0 |
| Cross-part imports | `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` | 0 |
| Scope of ESLint/Prettier/LF | `python -B scripts/test.py tests/quality/test_source_tool_scope.py` | 0 |
| Ruff on the test (the config of the repo) | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/agent_workflow` | 0 |
| ESLint on `.claude` | `node node_modules/eslint/bin/eslint.js --max-warnings 0 .claude` | 0 |
| Prettier on the script | `node node_modules/prettier/bin/prettier.cjs --check --no-config .claude/hooks/the-way-pin-check.mjs` | 0 (settings.json formatted with `--write`; JSON is outside the Prettier scope) |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 errors (before the commit with the files staged, after the commit) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | exit 0; 0 errors; 143 warnings, none of them about my files (the one on AGENTS.md:30 is the old `foundation_check.py` mention) |

Not run: the full gate (`npm test`), by the handoff; the whole `tests/quality/test_quality_invariants.py` (it holds the dependency audit, which needs the network) — I ran ruff, ESLint and Prettier directly instead; a run on Linux or macOS (no Linux distribution on this computer: `wsl -l` lists only `docker-desktop`); CI on Linux runs the test.

### Test-first and mutation checks

I wrote the code before the tests (configuration/wiring and one script; the first test run passed), so I broke the code in turn and saw the tests fail, then restored it (the script is identical to the committed one, checked with `diff`):

| Mutation | Result |
|---|---|
| `checkedOut === pinned` to `!==` | 5 tests fail |
| the `.git` existence check removed | the uninitialized-submodule test fails (git answers with the parent's commit) |
| `if (pinned === null) return;` removed | first run survived; I added the case "no submodule pinned beside a repository in `.the-way`" and the mutation then fails that case |
| `shell: true` added to the git call | 5 tests error (the clone folders carry a space, quotes and an ampersand) |
| `hookEventName: "Start"` | the mismatch test fails |
| `exitCode = 1` | 8 tests fail |
| the `catch` of `git()` made to throw | the broken-checkout test errors |

## Own-work check (section 3)

- **Requirement most likely unmet:** "a session started in a subdirectory still finds the repository root" and "works on the real Claude Code on the three systems".
- **Check 1, the real thing:** a fixture repository (real submodule, checkout moved one commit back, the committed hook and settings copied in) under `.runs/author/`, then `claude -p ... --setting-sources project --output-format stream-json --verbose --include-hook-events --model haiku` run from its root. Showed: `hook_started SessionStart:startup`, `hook_response` with `exit_code 0`, `outcome success`, the JSON as printed (so exec form with `${CLAUDE_PROJECT_DIR}` works on Windows with Claude Code 2.1.325 and the `systemMessage` / `additionalContext` form is read). The model call answered; I did not read the warning in the agent's reply.
- **Check 2:** the same run from the subdirectory `inner/` of the fixture: **no hook event at all** (no `hook_started`). Claude Code does not read the root `.claude/settings.json` when a session starts in a subdirectory, in this version. This cannot be repaired from the repository: the settings file is not loaded, so the script never runs. It is recorded in D-414's *Rationale* as accepted, and the AGENTS.md sentence says "started in the repository root". The script itself finds the root from its own place and was tested from a subdirectory as a process (`test_a_session_started_in_a_subdirectory_checks_the_same_repository`).
- Fixtures removed after the check.

## Weakest point

That the reach of the hook is narrower than the task's words suggest: sessions started in a subdirectory (and any session of Codex) get no warning — the first by Claude Code's own rule shown above, measured on one computer and one version, which is a hypothesis for other versions. Second weakest: Linux/macOS are covered only by reasoning (no shell, `node` and `git` by name, forward-slash-free code) and by CI on Linux; macOS never runs. Third: Windows with no Git Bash — exec form starts no shell, so the shell choice does not matter, but I did not run that setup.

## Choices (with the way rejected and its cost if wrong)

- **Exec form** (`command: node`, `args: [...]`) instead of shell form with a quoted placeholder: no quoting problem in Git Bash/PowerShell/sh. Rejected: shell form (differs between Git Bash and PowerShell). Cost if wrong: on a Claude Code too old to know `args`, `node` starts with no script and ends with a non-blocking hook error (exit 1, not 2, so the session goes on).
- **Root from the script's place, not from `CLAUDE_PROJECT_DIR` or the input `cwd`.** Rejected: the env variable (can differ in a worktree or be unset). Cost if wrong: none seen; the test copies the script into the fixture at the same relative place.
- **Checkout test by `.the-way/.git`'s existence** instead of comparing `git rev-parse --show-toplevel` with the folder (the handoff's example). Rejected: path comparison (case, slashes, links on Windows). Cost if wrong: a `.the-way` that has a `.git` of a foreign repository counts as a checkout and is compared (it then shows a mismatch, which is the right result).
- **Silence where the pin cannot be read** (no git, not a repository such as a zip download, no gitlink). Rejected: warning (it would show at every start in a repository that has no submodule at all). Cost if wrong: a broken git hides a mismatch.
- **No matcher** on `SessionStart` (fires also on `clear` and `compact`, where the agent's context was cut and needs the warning again). Cost: the human sees the warning again on `/clear`.
- **`systemMessage` plain lines**, with the pinned and checked-out commits in full (40 hex), as the task asks for both values.
- **No change of D-29, D-30, D-31, D-32 and no change of the ESLint/Prettier config.** `.claude/hooks/*.mjs` is outside the TS/JS scope of D-29/D-32 (their *Scope* does not name agent-workflow; D-29's *Rejected* says why the whole repository was not taken, citing the play skill's scripts), `tests/quality/test_source_tool_scope.py` takes `SCOPE_PARTS` without agent-workflow, so nothing is required of a new directory there. I still ran ESLint (parsing, no rules) and Prettier on the script and kept it Prettier-formatted. The Python test is in the Ruff scope (D-30 names agent-workflow) and passes. The `.gitattributes` has no LF rule for `.claude/`; the script works with CRLF too.
- **Test uses the system temporary directory** (`tempfile.mkdtemp`), as `test_loop2_play_skill.py` does, not `.runs/author/`: the handoff's rule is for my working copies; a permanent test must not depend on a path of the worktree. My own fixture for the real-Claude check stood in `.runs/author/`.
- **Part map unchanged:** `.claude/**` and `tests/agent_workflow/**` already belong to `agent-workflow`; the foundation check reports 0 errors. The part's description sentence is left as it is (it says the part "directs and records the work"); I judged a hook that guards the pinned process fits it.

## Reaches beyond the handoff

- The environment fact above (`foundations/environment_facts.md`) — the handoff named only the decision. Reason: D-414 rests on the behaviour of Claude Code; the decisions template asks a fact entry for that.
- Web reading of the Claude Code docs: `WebFetch` of `https://code.claude.com/docs/en/hooks` (three calls, summary by the tool's model; used only to learn where to look), then `curl https://code.claude.com/docs/en/hooks.md` (raw text, the source of the quoted passages) and the Wayback CDX/`id_` copy for the archived address. What they said: SessionStart cannot block (exit 2 only shows stderr to the user); plain stdout and `additionalContext` reach the agent; `systemMessage` is shown to the user; exec form (`args`) spawns with no shell and substitutes `${CLAUDE_PROJECT_DIR}` into `command` and `args`; on Windows exec form needs a real executable (`node` is one); `CLAUDE_PROJECT_DIR` is "the project root where the session started".
- I did not use the `claude-code-guide` agent (make-change: never dispatch a subagent).
- `eslint`, `prettier`, `ruff` run directly on my files, and `test_cross_part_imports.py`, `test_source_tool_scope.py`, `test_tracked_file_private_paths.py` — the checks my change reaches.
- Probe: whether Node's `spawn("git")` on Windows searches the working directory before PATH (a planted `git.exe` in the cwd). It does not in Node 24.17.0 here (planted `git.exe` ignored; with an empty PATH `git` was not found though the planted file stood in the cwd). So the hook sets no special cwd for git.

## Problems seen

- The context given to me at start showed an older `AGENTS.md` without the-way markers; the file in the worktree has them (lines 19 and 31 before my sentence). I used the file.
- `instruction-files` check: 143 warnings exist already on the base (dead-path in several guidelines); my change added none that I could find (grep on `AGENTS.md`, `settings.json`, `pin-check` found only the old `AGENTS.md:30` one).
- Observed in a run of the test suite: a `__pycache__` directory appears under `tests/agent_workflow/` when a test file is imported by the focused runner; I removed it each time (it is untracked and not in `.gitignore`; not changed by me).

## Unread material

- `guidelines/coding-*.md` kind files: none matches (as the handoff says), not read.
- Decisions D-28, D-29, D-30, D-31, D-73, D-77, D-78, D-81, D-82, D-83, D-84, D-85, D-252, D-351, D-362, D-412, D-413 read whole except D-252, D-351 and D-362 which I read to the end of the binding sentences, the start of *Verification*/*Rationale* (D-252: lines to the list of tests, its *Rationale* and *Rejected* not read; D-351: binding sentences and the start of *Verification*; D-362: whole). D-84, D-85 read whole.
- `guidelines/testing.md`: read whole; the second page of the long table of trust boundaries was read as returned.
- Invariants of the part (`foundations/invariants.md`) were not opened by me beyond what the tests I ran cite (`tracked-file-private-paths`); the handoff asked to select them by the method; I did not run `decision_index.py` and did not read the glossary entries of terms. The reach is the gap in my selection.
- The Claude Code hooks page: read in parts by the tool (up to characters ~200000 of ~293000 by WebFetch) and the passages I quote and the sections on SessionStart and on exec form in the raw file.
- The part of `.the-way/task-cycle/skill/foundation_step.md` and the decision/fact templates were read whole.

## Searches not found or unclear

- A statement in the docs of what the working directory of a hook is when the session starts in a subdirectory: the docs do not give it; found by experiment (no hook runs there).
- Whether the docs name a version that introduced exec form (`args`): not found in the excerpt I read; Claude Code 2.1.325 here runs it.
- Whether `${CLAUDE_PROJECT_DIR}` in a session started in a subdirectory points to that subdirectory: not observable, since no hook runs there.
- The handoff's suggestion to compare `git -C .the-way rev-parse --show-toplevel` with the repository root: I did not use it (see Choices); "unclear" which of the two it prefers, both were allowed ("e.g.").

## Working copies

- `.runs/author/e2e/` (fixture repository with the real submodule for the real-Claude run) — removed.
- `.runs/author/planted/`, `.runs/author/probe.mjs` (probe of the cwd search of `git`) — removed.
- `.runs/author/docs/` (raw hooks page, archived copy), `.runs/author/hook.orig` (backup of the script for the mutation runs), `.runs/author/fixture.py` — removed.
- `.runs/author/` is empty. The test's own temporary folders (system temp, made by `tempfile.mkdtemp` in `setUpClass`) are removed by `tearDownClass`.
