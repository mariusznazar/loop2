PASS fe779640cae69ed6288ac7c664a6b66c639bb966

# Review of the whole change — "Testy gry same włączają Dockera, gdy nie odpowiada"

Method `review-change`, whole change, one author, no spec, no plan. Range
`1b0c8ad4466fdd6d067da7bbc27b10458d81012b..fe779640` (three commits `7fc5d456`, `4328f44b`, `fe779640`);
`git rev-parse HEAD` = `fe779640cae69ed6288ac7c664a6b66c639bb966`, worktree clean. Read-only: no file of the
worktree, no index, no branch changed; I did not touch Docker Desktop and did not run `npm test`.

Result: 0 blocking findings, 6 Minor findings (4 within the task, 2 outside it), 0 Critical, 0 Important.

## Changed files (range diff, added/removed lines)

| File | + / - |
|---|---|
| `scripts/docker_gate.py` (new) | 153 / 0 |
| `scripts/test.py` | 10 / 2 |
| `tests/quality/docker_standin.py` (new) | 99 / 0 |
| `tests/quality/test_docker_gate.py` (new) | 187 / 0 |
| `tests/quality/gate_fixture.py` | 20 / 3 |
| `tests/deploy/test_account_backup_stream.py` | 3 / 3 |
| `tests/deploy/test_account_storage.py` | 3 / 15 |
| `tests/deploy/test_loop2_image_icons.py` | 2 / 15 |
| `tests/deploy/test_loop2_tunnel_image.py` | 2 / 8 |
| `tests/deploy/test_restore_trial.py` | 3 / 3 |
| `tests/invariants/test_loop2_container_icons.py` | 3 / 15 |
| `tests/invariants/test_loop2_container_sprites.py` | 4 / 15 |
| `tests/invariants/test_loop2_one_serving_process_container.py` | 3 / 15 |
| `foundations/decisions.md` | 45 / 0 (D-390, D-391, D-392) |
| `foundations/invariants.md` | 10 / 0 (`gate-docker-start-waits-once`) |
| `foundations/environment_facts.md` | 6 / 0 (`docker-desktop-start-detach`) |

16 files, 553 added, 94 removed (equals `git diff --stat`).

Invariant tests changed (named as the method asks): `tests/invariants/test_loop2_container_icons.py`
(`loop2-container-icons`), `tests/invariants/test_loop2_container_sprites.py` (`loop2-container-sprites`),
`tests/invariants/test_loop2_one_serving_process_container.py` (`loop2-one-serving-process`),
`tests/deploy/test_account_storage.py` (`account-schema-lifecycle`). In each only the skip route changed (the
local `docker_answers` check replaced by `docker_gate.require_daemon`); no assertion was touched.
The new test `tests/quality/test_docker_gate.py` carries `# invariant: gate-docker-start-waits-once`.

## Verdict against the frozen task

To do:
1. Gate starts Docker Desktop when a test needing Docker gets no daemon answer, waits at most 3 minutes — met
   by `scripts/docker_gate.py:daemon_gap` (`START_LIMIT = 180`, `docker desktop start --detach`, poll of
   `docker version` every second to a deadline). Judged against the stand-in only; real behaviour is task
   step 6 (the orchestrator's).
2. Full `npm test` and `npm test -- <file>` — met: the mechanism is lazy, asked by the test through
   `require_daemon`, so one path serves both; `scripts/test.py` wraps `main` in `docker_gate.shared_state()`.
   Covered by `test_one_selected_test_file_starts_a_stopped_docker_desktop_too` and the whole-run cases.
3. Skip only after the limit, message says the start was tried and what stays unchecked — met
   (`...the gate started Docker Desktop and it did not answer within N seconds; <unchecked>`), asserted in
   `test_the_skip_names_what_stays_unchecked_and_tells_a_start_from_no_start` and the whole-run test.
4. No Docker Desktop: skip at once with the unchecked information — met (`desktop_present()` false, or `docker`
   not on PATH); test `test_a_whole_run_on_a_computer_without_docker_desktop_skips_at_once`.
5. Docker Desktop started by the gate stays up — met; no code path issues `desktop stop` or `restart`;
   `stops()` of the stand-in is asserted empty in two cases.
6. The real check on this computer — not mine; the code could not be shown unable to work (see "What is
   unproven" below).

Acceptance criterion (one wait per run): met, and the claim holds for the real runner: the memory is an
environment variable naming a state file, inherited by the per-directory processes of
`.the-way/gate/run_tests.py:93`. I re-ran mutation 1 myself (below): it turns the invariant test red.

Settlements to record: row 1 -> D-390, row 2 -> D-391, row 3 -> D-392, row 4 -> invariant
`gate-docker-start-waits-once` (Derives from D-390, Part `build-tools · deployment`, Method `test`, test cites
it). Sources and "Not chosen" of the task are carried into *Rejected* faithfully (2 and 5 minutes, "only a full
`npm test`", "the way's rule for an agent", "nothing", memory threshold, "the gate stops it"). Nothing in the
change is taken from the task and altered or invented that I could find; the added claims are the author's own
choices and are named as such in the author's report (lazy start, detection by `docker desktop --help`,
`LOOP2_DOCKER_START_LIMIT`, later tests skip before asking the daemon again).

## Findings

### Critical

none

### Important

none

### Minor

1. **Within the task — skip message says "started" when the start command may not have worked.**
   `scripts/docker_gate.py:142-143` (the text of `gap`) with `start_desktop` at `:112-118`, which ignores the
   exit code and suppresses `OSError`/`TimeoutExpired`. If `docker desktop start --detach` itself fails
   (exit 1, or cannot be launched) the skip still reads "the gate started Docker Desktop and it did not
   answer within N seconds". The task asks for "the start was tried and did not finish", and the code does
   try, so the sentence is not false enough to block, but a reader of the request will think Docker Desktop
   started and hung. Evidence: reading of `start_desktop`; the stand-in has no case where `desktop start`
   exits non-zero while `desktop --help` exits 0. Cost of leaving: a wrong first guess when diagnosing a skip;
   a fix is the word "tried to start" or recording the start's exit code in the message.

2. **Within the task — a citation in D-390's *Rationale* has neither an environment fact nor a quoted source.**
   `foundations/decisions.md`, D-390 *Rationale*: "the status that Docker Desktop reports can say that it is
   stopped while the daemon answers". This is the behaviour of a tool the process uses, and the decision's
   choice (only an answer of the daemon counts) rests on it; the environment-facts template ("Which facts are
   written", `.the-way/elements/environment-facts/template.md:46`) asks a fact entry for such a citation, or a
   quotation with its source (WAY-90). The task's *Context* holds the observation (a reading of 2026-11-13); the
   change does not carry its source into D-390 (*Based on* names only `docker-desktop-start-detach`). The code is
   right either way (it ignores the status); the gap is in the entry. Graded Minor: the entry's binding
   sentence does not depend on it.

3. **Within the task — `guidelines/testing.md` does not tell a test author how to ask for a Docker daemon.**
   This is the author's concern 2, which I confirm. The file read before writing a test (AGENTS.md) names the
   Docker tests only as smoke tests (`tests/deploy/test_account_backup_stream.py`, line 364) and lists
   `scripts/test.py` in *Where in code*; nothing says "a test that needs a container calls
   `docker_gate.require_daemon`". The rule exists only in D-390's *Verification*, found by a reader of the
   foundation by Scope, not by a reader of the testing guidelines. `product-guidelines/reading.md` ("Distinguish
   the gaps") puts an extension of existing guidelines in the current task unless the human separates it,
   so it lies within the task; nothing in the statements of the guidelines is false today. Cost of leaving:
   the next Docker test written from the guidelines alone keeps its own daemon check, which D-390 forbids,
   and review has to catch it. Route: `the-way-maintain-testing-guidelines` (a line in the integration
   recipe's *Doubles* and `scripts/docker_gate.py` in *Where in code*), or a follow-up task if the human
   separates it.

4. **Within the task — timing assertions of the new tests can fail on a loaded computer.**
   `tests/quality/test_docker_gate.py`: `assertLess(... , 1.5)` in
   `test_after_a_start_that_did_not_finish_the_next_ask_gives_the_gap_at_once`, `assertLess(..., 10)` in the
   no-plugin case, `assertLess(..., 55)` in the whole-run no-plugin case. Each of those intervals contains
   Python and Node process starts; on a machine under memory pressure (the task's *Context* mentions three
   out-of-memory interruptions of the gate) a 1.5 s bound on a call that starts no process but reads one file
   can still be exceeded, as the stand-in launches are slow on Windows. The tests do fail for the right reason
   (my mutation run shows 2.37 s > 1.5 when the recorded gap is ignored), so the bound is useful, only tight.
   Same flaw does not hide anything; grade Minor.

5. **Outside the task — the "waits once per run" guarantee holds for `npm test`, not for a run of the-way's
   Python runner started alone.** `scripts/docker_gate.py:15-17` (module docstring) says so; `state_file()`
   makes one file per process tree when no variable is set, and `.the-way/gate/run_tests.py` does not set
   one, so `python .the-way/gate/run_tests.py` waits once per directory (up to 3 minutes each). The invariant
   and the task's acceptance criterion speak of "one run of the gate", which is `npm test`, so I do not count
   this against the change; mentioned because the pinned `.the-way` cannot be edited here.

6. **Outside the task — the wait is bounded by the limit only after the first two asks.**
   `scripts/docker_gate.py:120-133` (`daemon_gap`): the first `daemon_answers()` (up to 30 s) and
   `desktop_present()` (up to 30 s) run before `deadline` is taken, and `start_desktop()` (up to 60 s) is inside
   it. With a daemon that hangs rather than refuses, a first test can wait 3 minutes + up to 60 s. D-390 says
   "at most 3 minutes". The ordinary case (a stopped Docker Desktop refuses at once) is unaffected; I could
   not produce the hanging case without the real Docker. Outside the task as it states the failing case (a
   Docker that does not rise); noted for the cycle.

## Declined to judge

- Whether `docker desktop start --detach` survives its launching Python process on Windows (job object), whether
  real `docker version` returns quickly with the daemon down, whether real `docker desktop --help` exits 0
  with the daemon down: the orchestrator's real check (task To do 6); the author names all four as unproven
  (author report, "What the stand-in does not prove") and `test_docker_gate.py` names it in its docstring.
- The 180 s default itself: no test waits it; both the author and the test's docstring say so.
- The parallel start of two gates in two working directories (a race on the state file or a double start):
  outside the task, and `docker desktop start` is idempotent.
- The rule that a recorded failure makes later tests skip even if Docker came up by hand meanwhile: the
  author's choice, stated in D-390 ("skipped at once, with no new start"); I judge it as the decision says,
  not as a defect.
- Whether `scripts/docker_gate.py` should have stood in the part `test-helpers`: judged and fine as it is, see
  below; not a finding.

## Against the foundation and guidelines (what I checked)

- Part placement: `scripts/**` is build-tools; deployment tests import it; `Depends on` of deployment names
  build-tools, tests of `tests/quality/**` are build-tools; `scripts/test.py` (outside `tests/`) imports it, so
  it could not be in `test-helpers` under D-351. `tests/invariants/test_cross_part_imports.py` run: 10 tests OK.
  New files are claimed by `scripts/**` and `tests/quality/**`; `foundation_check.py`: 0 errors.
- D-77: the single-file run still fails when only skipped tests ran ("No test executed", `scripts/test.py:36`);
  D-390 *Relations* `derives from D-77` is correct. D-84: the new tests wait with a limit and clean their files
  (`addCleanup`, temporary directories); the stand-in is named as proving the gate's reaction, as D-84 and
  `testing.md` (Doubles) ask. D-235: the same "stand-in proves reactions, not delivery" reading, applied to
  `docker`; consistent.
- The foundation entries say what the code does: D-390's binding sentence vs `daemon_gap` (wait, limit,
  skip text, skip at once after a recorded gap, no-Desktop skip at once); D-391 vs the absence of any
  `stop`/`restart` call; D-392 vs the absence of any memory query; invariant vs the recorded-gap check. No
  entry says more broadly or less qualified than the code (WAY-263).
- Coding guidelines (`guidelines/coding.md`): Ruff passes (`ruff check --config ruff.toml --ignore-noqa .`),
  no suppression comments; "Hiding a failure": the gap is not turned into success, it becomes a skip with the
  reason, and the unchecked sentence; the swallowed `OSError`/`TimeoutExpired` in `daemon_answers` and
  `start_desktop` lead to a gap, not to "all fine" (see Minor 1 for the wording).
- Reserved choices: none taken (no new language, library or store; `subprocess`, `tempfile`, `json` of the
  standard library; no new dependency).
- Tests: they assert behaviour (start counts from the stand-in's call log, skip lines of the real runner, exit
  codes) and do not take the code's own computed value as expectation. Mutation 1 re-run by me (below). The
  remaining unmutated cases (no plugin, daemon answers, no `docker`) pass for a reason independent of the
  code under test (the stand-in's recorded calls).
- Screenshots: none among the commits; the change has no user interface.

## Checks run (command, exit code)

All from the worktree root unless a path says otherwise, `npm_execpath` set to the installed npm.

1. `git rev-parse HEAD`, `git log --oneline 1b0c8ad4..HEAD`, `git diff --stat 1b0c8ad4466fdd6d067da7bbc27b10458d81012b..HEAD` -> exit 0, head and three commits as given.
2. `python -B .the-way/elements/common/foundation_check.py` -> exit 0, `0 errors`.
3. `python -B scripts/test.py tests/quality/test_docker_gate.py` -> exit 0, `Ran 11 tests in 37.238s`, OK (stand-in `docker` only; it never touches the computer's Docker).
4. `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` -> exit 0, 10 tests OK.
5. `python -B -m unittest discover -s tests/quality -p test_test_gate.py` -> exit 0, 7 tests OK (the changed fixture still serves it).
6. `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa .` -> exit 0, `All checks passed!`.
7. Mutation re-run in a scratch copy outside the repository (`git archive HEAD` plus `.the-way/gate`, `.the-way/elements` and `node_modules/npm`, in the scratchpad `...\scratchpad\mut2`): delete the `recorded_gap()` check at the head of `daemon_gap`, run `python -B scripts/test.py tests/quality/test_docker_gate.py` -> exit 1, 2 failures: `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once` (`2 != 1`: two starts) and `test_after_a_start_that_did_not_finish_the_next_ask_gives_the_gap_at_once` (2.37 s not less than 1.5). Confirms the author's mutation 1 independently. (A first attempt without `node_modules/npm` in the copy failed for a missing npm, not for the mutation; I discarded it.)
8. Manual: WebFetch of `https://docs.docker.com/reference/cli/docker/desktop/start/` -> page says "Start Docker Desktop" and, for `--detach`, "Do not synchronously wait for the requested operation to complete." — the two quotations of the environment fact `docker-desktop-start-detach` match the live page. The archived copy address was not opened by me.
9. `git status --short` after all runs -> empty (nothing left in the reviewed worktree).

Not run: full `npm test` (the orchestrator's); the Docker tests that build images (8 files, up to 20 minutes each, against the computer's real Docker); any real start of Docker Desktop; the mutation 2 of the author (`desktop_present()` removed), taken on the author's report.

## What is unproven (named, as the handoff asks)

The stand-in proves the gate's reaction, not a real start: that `docker desktop start --detach` brings the real
Docker Desktop up on this computer and that it survives the end of the Python process, that real `docker version`
exits non-zero quickly with the daemon down, that real `docker desktop --help` exits 0 with the daemon down and
non-zero where the plugin is absent, and that the 180 s default is enough. These are named in the author's
report, in `tests/quality/test_docker_gate.py`'s docstring and in D-390 *Verification* ("proves the gate's
reaction, not a real start"). The code does not look unable to work: the sequence (`--help` present?, start,
detach, poll with a deadline, record a gap) is the one the environment fact describes.

## Reaches beyond my selection (section 1)

- `guidelines/coding.md` and `guidelines/testing.md` read whole (testing.md in two reads, 372 + 94 lines),
  as the selection of `product-guidelines/reading.md` gives for parts build-tools and deployment. The kind
  files `guidelines/coding-*.md` do not match this work and I did not read them.
- `.the-way/elements/environment-facts/template.md` lines around "Which facts are written": to judge Minor 2.
- `.the-way/gate/run_tests.py` (lines 60-130): to check how the per-directory processes inherit the state
  variable and whether a path of the-way's own runner sets it.
- `tests/invariants/test_cross_part_imports.py` run (not read): to confirm the part-map reading.
- WebFetch of the public Docker documentation page (no project data sent).

## Unread material

- Counts of decisions of my selection (those whose *Scope* names build-tools or deployment, found by a
  script over `foundations/decisions.md`, 92 entries including D-390, D-391, D-392): **13 read whole**
  (D-30, D-73, D-77, D-78, D-81, D-83, D-84, D-235, D-351, D-362, D-390, D-391, D-392) and **79 by title only**
  (every one of the 92 titles and *Scope* lines was seen).
- Decisions whose title may bear on the change and that I did not read whole: D-252 and D-253 (failure
  logging and last-resort handlers; read only as `guidelines/coding.md` restates them for scripts run by the
  gate), D-234 (restore trial; its test `tests/deploy/test_restore_trial.py` only changed its skip line),
  D-49 (test ports; not touched), D-14 and D-05 (container; the tests only changed how they skip), D-268
  (memory limit of document tests; not touched). I judge none of them to bear on the code of the change.
- Decisions D-74..D-76, D-79, D-82, D-163, D-273 (the departures named by D-73) — title only; they concern
  generated inputs, browsers, fonts, the npm registry, Outsider and sprites; no bearing on a Docker start.
- Invariants of my selection (61 entries have a `Part` naming build-tools, deployment, test-helpers or
  `every`, listed by a script): read whole `gate-docker-start-waits-once`, `focused-test-execution`,
  `node-test-selection`, `cross-part-imports`, `ruff-source-rules`, `loop2-container-icons`; the rest read as a
  title and `Part` line only. The `every`-part entries other than these (for example
  `account-server-runtime`, `loop2-one-serving-process`, the simulation ones) were not read whole; none names
  Docker, the gate's Python or a daemon (a `git grep -i daemon` over the foundation finds only D-390, a log
  decision at `foundations/decisions.md:8949` and the new invariant).
- Part map and glossary read whole. The pinned the-way's glossary was not read (no term of it is used by
  the three decisions and the invariant). `.the-way/product-guidelines/template.md` was not needed: the
  change writes no guideline.
- Guideline files: `guidelines/coding.md`, `guidelines/testing.md` read whole; `styleguide-browser-view.md` and
  the `coding-*.md` kind files not read (no browser-view file touched; no kind of the index applies).
- Not read whole: the full text of `.the-way/task-cycle/skill/foundation_step.md` and the other the-way
  rules the author used to write the entries; I judged the entries by their template excerpts and
  `foundation_check.py` (0 errors), not by a second reading of the element skills.

## Searches not found or unclear

- I did not find a place in `guidelines/testing.md` that says how a new test that needs Docker asks for a
  daemon (Minor 3).
- I did not find a source for the claim "status can say `stopped` while the daemon answers" in the foundation;
  it stands only in the task's *Context* (Minor 2).
- The handoff names the author's "Unread material" about D-74..D-76 and others; I did not find any decision
  of the 92 whose binding sentence contradicts D-390 (a `git grep` for `skipTest`, "unavailable", "skips",
  "daemon" over the foundation and guidelines).
