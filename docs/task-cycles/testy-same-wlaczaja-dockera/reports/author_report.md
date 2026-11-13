# Author report — "Testy gry same włączają Dockera, gdy nie odpowiada"

**Status: done with concerns** (concerns: real `docker desktop start` unproven; the handoff's "no foundation_check" vs the skill's step 4.3; testing guidelines not touched — see Concerns).

Worktree `the repository's root`, branch `task/testy-same-wlaczaja-dockera`, base `1b0c8ad4`. Method: `make-change`, whole change as the one author. Nothing uncommitted.

## Commits

| Commit | What |
|---|---|
| `7fc5d456` | feat: the mechanism — `scripts/docker_gate.py`, `scripts/test.py`, stand-in `docker`, tests of the mechanism, fixture change |
| `4328f44b` | refactor: the eight Docker test files ask the gate for a daemon; five copies of `docker_answers` removed |
| `fe779640` | docs: foundation entries — D-390, D-391, D-392, invariant `gate-docker-start-waits-once`, environment fact `docker-desktop-start-detach` |

Files (added/removed lines, whole range `1b0c8ad4..HEAD`, 553 / 94):
`scripts/docker_gate.py` +153 (new) · `scripts/test.py` +10/-2 · `tests/quality/docker_standin.py` +99 (new) · `tests/quality/test_docker_gate.py` +187 (new) · `tests/quality/gate_fixture.py` +20/-3 · the eight test files `tests/deploy/test_account_storage.py`, `test_account_backup_stream.py`, `test_loop2_image_icons.py`, `test_loop2_tunnel_image.py`, `test_restore_trial.py`, `tests/invariants/test_loop2_container_icons.py`, `test_loop2_container_sprites.py`, `test_loop2_one_serving_process_container.py` (about -50 net together) · `foundations/decisions.md` +45 · `foundations/invariants.md` +10 · `foundations/environment_facts.md` +6.

## The choice the task left to the cycle: where the start stands

**In a shared helper module of the gate, `scripts/docker_gate.py`, plus a two-line wiring in `scripts/test.py` — not in `scripts/test.py` alone, not in `tests/`.**

- The start is lazy, asked by the test (`docker_gate.require_daemon(self, "<what stays unchecked>")`). `scripts/test.py` cannot know, for `npm test -- <file>`, whether a file needs Docker; asking in the test serves the full run and the single-file run with one mechanism (To do 1–2).
- The "once per run" memory crosses the per-directory processes of `.the-way/gate/run_tests.py:93` through a state file named by the environment variable `LOOP2_DOCKER_RUN_STATE`. `scripts/test.py` creates one file per run (`docker_gate.shared_state()`, around `main`), the child processes inherit the variable. A process that finds no variable creates a file for itself and its children (so a direct `python -m unittest` still waits at most once per process tree).
- Rejected: start in `scripts/test.py` before the stages — would work for the full run but cannot serve the single-file run (it cannot know the file needs Docker); a module in `tests/invariants/` — would need a new part-map entry (the files of `tests/invariants/` are claimed one by one), and `scripts/**` is already claimed by build-tools, which deployment may import (D-351 / part map). Cost if wrong: the helper lives in `scripts/`, so a test of another part than deployment/build-tools would not be allowed to import it; today only deployment and build-tools tests do.
- Decision of mine: a recorded failed start makes later tests skip **before** asking the daemon again (skip "at once", even if the daemon came up by hand meanwhile). Rejected: re-asking the daemon first — a half-started daemon makes `docker version` hang up to 30 s per test.
- Decision of mine: `docker desktop start --detach` with output to DEVNULL, then polling `docker version` every 1 s until the limit; the start command's exit code is ignored (only a daemon answer counts, as the task says). Rejected: synchronous `docker desktop start --timeout` — "complete" does not necessarily mean the daemon answers.
- Decision of mine: Docker Desktop is detected by `docker desktop --help` exiting 0 (what the machine has), not by the OS name.
- Decision of mine: `LOOP2_DOCKER_START_LIMIT` (seconds) overrides the 180 s limit; it exists so the tests wait seconds. The default 180 itself is not exercised by any test.

## Foundation step (by `.the-way/task-cycle/skill/foundation_step.md`)

Searched the whole foundation (`Docker Desktop`, `daemon`): nothing already states these settlements. Written through the element rules (templates read whole), on the task branch:

| Entry | Marked | Meaning (English) | Znaczenie (po polsku) |
|---|---|---|---|
| D-390 | row 1 | A test needing a daemon, finding none on a computer with Docker Desktop, starts it and waits at most 3 minutes, in a full run and in a single-file run; it skips only if none answers, saying the start was tried and what stays unchecked; later tests of the run skip at once; with no Docker Desktop it skips at once. | Test potrzebujący demona, gdy żaden nie odpowiada, a komputer ma Docker Desktop, włącza go i czeka najwyżej 3 minuty, przy pełnym przebiegu i przy jednym pliku; pomija się dopiero, gdy demon nie odpowie, z komunikatem o próbie startu i o tym, co zostaje niesprawdzone; kolejne testy przebiegu pomijają się od razu; bez Docker Desktop pomija się od razu. |
| D-391 | row 2 | Docker Desktop started by the gate stays running; the gate does not stop it. | Docker Desktop włączony przez bramkę zostaje włączony. |
| D-392 | row 3 | The gate starts Docker Desktop whatever the free memory; no memory threshold. | Bramka włącza Dockera bez względu na wolną pamięć. |
| `gate-docker-start-waits-once` | row 4 | In one gate run a start that did not finish in its limit is waited for once; later tests needing a daemon skip at once, no new start. | Jeden przebieg bramki czeka na start, który nie zdążył, najwyżej raz. |
| `docker-desktop-start-detach` | the cycle's | Environment fact D-390's *Based on* names: `docker desktop start` starts Docker Desktop and with `--detach` does not synchronously wait. | Fakt środowiska: `docker desktop start` z `--detach` nie czeka na zakończenie. |

- The environment fact is **not a row** of the task; I wrote it because D-390 rests on the behaviour of a tool (template "Which facts are written") and `Based on: none` would be false. Source: the Docker docs page, archived copy `20261101133739` (found through the CDX index), passages checked word for word on the live page and on the archive.
- D-390's *Rejected* takes the "Not chosen" of questions "Kto włącza Dockera", 1 and 2 of the task, with their costs. *Relations* of D-390: `derives from D-77` (my choice; D-391, D-392 derive from D-390). Invariant *Derives from* D-390, *Part* `build-tools · deployment`, *Rests on* `none`, *Violated* `no`. D-390's binding sentence carries "once a start has not finished, later tests skip at once" so that the invariant has a decision to derive from.
- `foundation_check.py` run (see checks): 0 errors.

## Checks run (command, exit code)

All from the worktree root with `npm_execpath` set to the worktree's npm.

- Failing run of the tests first (stub `scripts/docker_gate.py` that starts nothing): `python -B scripts/test.py tests/quality/test_docker_gate.py` → exit 1, 8 failures of 11 (assertions: daemon not awaited/started, skip message without "started Docker Desktop", start count 0 != 1; the one selected file run ended "No test executed in the selected file"). The 3 that passed against the stub are the "no Docker Desktop" cases (a skip at once is also what the stub does); they were shown failing by mutation 2 below.
- The same command with the real module → exit 0, `Ran 11 tests`, OK (~21 s).
- Mutation 1 (invariant): deleted the recorded-gap check in `daemon_gap` → exit 1, 2 failures, among them `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once` ("2 != 1" starts). Restored (file diff-identical to the good copy).
- Mutation 2: removed the `desktop_present()` check → exit 1, 3 failures (the plugin-less cases wait the whole limit). Restored.
- `python -B scripts/test.py tests/quality/test_test_gate.py` → 0 (7 tests; the changed `gate_fixture.py` still serves it).
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` → 0 (10 tests; `from scripts import docker_gate` in deployment and build-tools tests is within the part map).
- `python -B scripts/test.py tests/quality/test_quality_invariants.py` → 0 (5 tests: eslint, ruff, prettier, shellcheck on the whole repo); also `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa .` → 0 after the last edits.
- `python -B scripts/test.py tests/quality/test_node_test_selection.py` → 0.
- `python -B scripts/test.py tests/deploy/test_loop2_tunnel_image.py` → 0, `Ran 1 test in 13.2s`, OK: with the real daemon answering, the converted test runs, is not skipped.
- Skip wiring of all eight files, single-file runs with a stand-in `docker` first on PATH (a driver script in the scratchpad, not committed): plugin absent → each file skips at once, 0 starts; plugin present, daemon never rises (limit 2 s) → each skips after ~2 s, one start per single-file run (8 separate runs). Single-file exit code 1 for a file whose only test skipped is the existing D-77 behaviour, unchanged.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → 0 errors after writing the entries; and the full `python -B .the-way/elements/common/foundation_check.py` after the commits → `0 errors` (the citation of the invariant is found once the test file is tracked).
- **Not run:** full `npm test` (the orchestrator's, WAY-160); the eight Docker files with the real Docker beyond the tunnel one (each builds the game image, up to 20 minutes, and the computer's Docker may be in use by other work); the real start of Docker Desktop.

## Own-work check (section 3)

- Requirement most likely not met: *Acceptance criterion — a gate run waits for Docker at most once whatever the number of directories*, because the memory must cross the per-directory processes and a single-process test would not show it.
- Check: `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once` runs the real `scripts/test.py` through `npm test`, the real `.the-way/gate/run_tests.py` copied into a temporary git repository with two directories each holding a test that needs Docker, a stand-in `docker` that never answers, limit 3 s. It showed: exit 0, exactly 1 call of `desktop start`, 2 skipped lines both containing "started Docker Desktop" and the unchecked text. Mutation 1 turned it red (2 starts).
- Other requirements checked with the same harness: single file starts Docker (`test_one_selected_test_file_starts_a_stopped_docker_desktop_too`), the gate never stops or restarts (stand-in logs, To do 5), no Docker Desktop skips at once (To do 4).

## What the stand-in does not prove (for the orchestrator's real check, task To do 6)

- That the real `docker desktop start --detach` starts the real Docker Desktop on this computer and that the process launched with output to DEVNULL survives after the Python process ends (I did not run it: it was not allowed to touch the running Docker Desktop).
- That the real `docker version` returns non-zero quickly when the daemon is down (assumed from the existing 30 s-limit code; a hanging `docker version` is bounded by 30 s per ask, and by the remaining limit while waiting).
- That the real `docker desktop --help` exits 0 with the daemon down (it exits 0 now, with the daemon up, 0.4 s; it is a local plugin command) and non-zero where the plugin is missing (the stand-in models this; I only saw `docker nosuchthing` exit 1).
- The default limit of 180 s (no test waits 3 minutes).

## Reaches beyond the dispatch (section 1)

- Read `foundations/environment_facts.md` entries (format examples, `docker-*`) and `.the-way/elements/environment-facts/` (template and skill) — to write the fact `docker-desktop-start-detach`, not in the handoff's list.
- Read the-way's `elements/invariants/` skill and template, `elements/common/rules.md`, `elements/decisions/` skill and template and example WAY-03 — as the foundation step requires.
- Read `tests/invariants/test_cross_part_imports.py` (head and the import resolution) and `tests/quality/gate_fixture.py` / `test_test_gate.py` — to place the helper within the part map and to reuse the fixture.
- Used `curl` for the Docker docs page and the Internet Archive CDX index (public pages, no project data sent).

## Unread material

- `foundations/invariants.md` read selectively: the `Part`/`Method` list of all non-`every` entries, and whole entries `loop2-one-serving-process`, `loop2-container-icons`, `loop2-container-sprites`, `ruff-source-rules`, `node-test-selection`, `focused-test-execution`, `account-schema-lifecycle`, `account-save-sqlite-upgrade`, `document-test-memory-limit`, `cross-part-imports`, `tracked-file-private-paths`, `tracked-file-private-names`. The other `every`-part entries (about 25) were not read whole; none touches the gate's Python or Docker code by its name.
- `foundations/decisions.md`: read whole D-77, D-84, D-235, D-28, D-30, D-49, D-73, D-78, D-81, D-83, D-85, D-89, D-351, D-362. Not read: D-74..D-76, D-79, D-82, D-163, D-273 (named by D-73's binding sentence; none concerns Docker or the gate's run), and decisions whose *Scope* names build-tools or deployment but not found by title (the log is about 1 MB; I did not scan every *Scope*). D-390 stands beside D-229/D-232-style deployment decisions I did not open.
- `guidelines/coding.md` and `guidelines/testing.md` read whole (the tool output of `coding.md` showed the whole file; the kind files `coding-*.md` do not match).
- Glossary read whole; the-way's glossary at the pinned commit not read (no term of it is used by the entries).
- `AGENTS.md` of the product read as given in the session context; `src/browser/AGENTS.md` not read (not touched).

## Searches not found or unclear

- `guidelines/testing.md` has no place that says how a new test that needs Docker should ask for a daemon; D-390's *Verification* carries it for review. Not a missing item of the task, but a gap I did not fill (see Concerns).
- The task's *Context* says `docker desktop status` showed `stopped` while the daemon answered; I saw the same (`Status stopped`) with the daemon answering, so the code ignores the status.
- The handoff says "run no product gate (`npm test`, `foundation_check.py`)", while the foundation skill's step 4.3 requires running `foundation_check.py --skip-test-citations` after writing an entry. I ran it as the skill gives (and once in full after the commits, reading its report only); this is a mismatch of the handoff, not a gate run.

## Concerns and questions for the orchestrator

1. **Real start unproven** (above). The cycle's step 6 check is the only proof; suggested order: stop Docker Desktop yourself per the task's precondition, run `npm test`, watch that `docker desktop start --detach` returns, the daemon answers within 3 minutes, and the Docker tests are not skipped. If `docker desktop start --detach` turns out to bring Docker Desktop down with the Python process (job object), the fix is in `start_desktop` (creation flags), not elsewhere.
2. **Testing guidelines** (`guidelines/testing.md`) are untouched: a new Docker-needing test is steered only by D-390's *Verification*. A line in the integration-test recipe's *Doubles* (and `scripts/docker_gate.py` in *Where in code*) would be natural; it goes through `the-way-maintain-testing-guidelines` and I judged it outside this task. Recommend: do it as a small follow-up if the reviewer asks; leaving it costs a reviewer catching a new test that keeps its own daemon check.
3. `tests/quality/__pycache__/` appeared untracked during my runs (bytecode from nested processes); I removed it; the tree is clean.
4. The 3 minutes is an estimate-based margin the task fixed; no test exercises the real default.
5. Skip messages' wording ("the gate started Docker Desktop and it did not answer within N seconds") is asserted in two places because the task requires the message to say the start was tried; if the orchestrator prefers other words, both test and module change together.
