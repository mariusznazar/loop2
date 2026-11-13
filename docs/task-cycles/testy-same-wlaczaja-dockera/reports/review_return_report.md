PASS 20517ed8e5163460c37a7b4dca541e6acf86b493

# Review of the return step's commit `20517ed8` (range `39f547056910286d547f6166298345b4dab5310a..20517ed8`)

`git rev-parse HEAD` = `20517ed8e5163460c37a7b4dca541e6acf86b493`, as given. One commit; the diff is one line of `foundations/part_map.md` (+1/-1), the *responsibility* sentence of `build-tools`. Nothing else is in the range (no code, test, other foundation file or screenshot). Worktree status clean; I changed nothing.

Counts: blocking 0, Minor 1, out of scope 0.

## Findings

### Critical
none

### Important
none

### Minor

1. `foundations/part_map.md:86` — the relative clause sits in the middle of a list. The sentence reads "installs dependencies, runs the test gate, which starts Docker Desktop for a test that needs a Docker daemon where none answers, and mutation analysis, checks code quality and types, ...". The clause "which starts ... answers" is closed by a comma, and the next words, "and mutation analysis", can be read as continuing it ("which starts Docker Desktop ..., and [starts] mutation analysis"). The reading is false, because the gate does not start mutation analysis (`stryker.config.json` is run apart; `scripts/test.py` has no such stage). A reader still gets the right sense from the rest of the list, so this does not block. Suggested form: move the clause after "mutation analysis" (for example "runs mutation analysis and the test gate, which starts Docker Desktop for a test that needs a Docker daemon where none answers, checks code quality ...") or make it two list items. Evidence: line 86 of the file at `20517ed8`.

2. Same line, a point I weighed against WAY-263 (a restatement "more broadly or without a qualification" of an entry is Important). D-390 has a qualification: the start happens only on a computer that has Docker Desktop, and on one without it the test is skipped at once. The sentence says "starts Docker Desktop ... where none answers" and does not carry "where Docker Desktop is installed". I grade it Minor, not Important, because Docker Desktop cannot be started where it is absent, so the sentence does not claim anything the code or D-390 contradicts; it states what the part answers for, and the part-map template keeps one sentence (`.the-way/elements/part-map/template.md`, "The binding part"; details that change with the code live in the code). I leave it as an optional wording remark for the author of finding 1's rewrite ("... starts Docker Desktop, where the computer has it, for a test ...").

## What I checked against the code and the entries

- Part-map sentence against the code: `scripts/docker_gate.py` (`require_daemon`, `daemon_gap`, `start_desktop`, `desktop_present`) and `scripts/test.py` (`docker_gate.shared_state()` around both the full gate and one-file runs) do what the sentence says: a test that needs a daemon asks the gate; where no daemon answers and `docker desktop` exists, the gate runs `docker desktop start --detach` and waits (180 s); otherwise it skips. `scripts/**` is claimed by `build-tools`, so the code of the change belongs to the part whose sentence changed.
- Form: one sentence, in the plain style of the neighbouring list items, no new fields; *Files*, *Depends on* and *Trust boundary* untouched, as the template's "The binding part" and WAY-11 require. `docker_gate.py` takes in no data from outside the product (an environment variable of the product's own, a state file it makes), so no new trust-boundary pattern is called for (template "Trust boundary").
- D-390, D-391, D-392 (`foundations/decisions.md:9563-9606`), whole: they match the code. 3 minutes = `START_LIMIT = 180`; the skip message says the start was tried and did not finish (`daemon_gap`) and what stays unchecked (`require_daemon`); no Docker Desktop gives a skip at once; later tests of the run skip at once through the state file (`recorded_gap`, `record_gap`); the one-file run gets the same state file via `shared_state`; the gate issues no command that stops or restarts Docker Desktop (D-391); there is no memory test (D-392). The state file inherited by the per-directory processes (`.the-way/gate/run_tests.py:96`, `Popen` without `env`, so the environment is inherited) matches the last sentence of D-390's rationale.
- Invariant `gate-docker-start-waits-once` (`foundations/invariants.md:1308`), whole: `Method: test`; the test `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once` in `tests/quality/test_docker_gate.py:141` carries the `# invariant:` marker. Part `build-tools · deployment` is right for a gate in `scripts/` used by tests of `deployment`.
- Environment fact `docker-desktop-start-detach` (`foundations/environment_facts.md:792`), whole: matches `start_desktop`, which runs `docker desktop start --detach` and does not wait on it; the code then polls `docker version`.
- Part-map entries `deployment` and `test-helpers`, whole: unchanged and still true. The tests of `deployment` import `scripts/docker_gate.py` of `build-tools`, which `deployment`'s *Depends on* allows. I considered whether `docker_gate.py` belongs to `test-helpers` (it serves tests of two parts): it does not, because `scripts/test.py`, which is no test, imports it, and `test-helpers` is a part that no code except tests may import. Placement in `build-tools` is right; no finding.
- Task passages: *Settlements to record* rows 1-4 are written in earlier commits as D-390, D-391, D-392 and the invariant (not in this range; I read the entries and they hold rows 1-4 as the task words them). *Out of scope* (Docker on the test server and deployment): the range touches nothing of the server or deployment, only a build-tools sentence.
- The return step wrote nothing it may not write: no decision, invariant, environment fact or glossary entry, and no project-definition projection; a part-map entry's sentence is what the return step may change (return step's own report, "Part-map changes", and the diff agree).
- The return step's other claims verified: no unclaimed file (`foundation_check.py`, 0 errors); the claimed files `scripts/docker_gate.py`, `tests/quality/docker_standin.py`, `tests/quality/test_docker_gate.py` fall under `scripts/**` and `tests/quality/**` of `build-tools`; `git grep` finds no leftover `docker_answers` copy in tests (all eight converted tests call `docker_gate.require_daemon`; `tests/deploy/test_loop2_tunnel_image.py:28` too).
- No invariant test was changed in the range. No guideline file was changed in the range; the sentence of `guidelines/testing.md` on `docker_gate.require_daemon` (outside this range) says the same as the part-map sentence.

## Declined to judge

- The code of the change, its tests and the wording of D-390 to D-392 and of the other entries: outside this range (earlier commits, reviewed in earlier rounds); read only to compare with the sentence.
- The cycle's one-time real check of a stopped Docker Desktop (task, *To do* 6): not part of this commit.

## Checks run

- `git rev-parse HEAD` -> `20517ed8e5163460c37a7b4dca541e6acf86b493`.
- `git log 39f547056910286d547f6166298345b4dab5310a..20517ed8` -> one commit; `git diff` of the range -> `foundations/part_map.md` 1 insertion, 1 deletion.
- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors`, exit 0.
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` -> 10 tests OK, exit 0 (reads the part map).
- Not run: full `npm test` (handoff forbids); Docker Desktop not started or stopped.

## Reaches beyond the dispatch

- `.the-way/elements/part-map/template.md`, whole: the form the part-map element gives a *responsibility* line (one sentence; binding part; what a change must rewrite).
- `tests/quality/test_docker_gate.py` (grep of names and line 141 area) and `.the-way/gate/run_tests.py` (grep for `env`, `Popen`): to verify that the per-directory processes inherit the state file and that the invariant has its test.
- `git grep` for `docker_answers`, `require_daemon`, `docker_gate`: to find any entry or test left on the old per-test daemon check.
- `stryker.config.json`, `scripts/test.py`: to judge whether the list reading in Minor 1 is false.

## Unread material

none (all dispatch material read whole: handoff, `review-change` skill, task, return step report, D-390, D-391, D-392, the invariant, the environment fact, the entries `build-tools`, `deployment`, `test-helpers`, `scripts/docker_gate.py`, `scripts/test.py`; the two tests named under Reaches were read in part, as listed).

## Searches not found or unclear

none
