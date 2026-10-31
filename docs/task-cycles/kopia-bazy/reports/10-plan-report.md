# Plan report — kopia-bazy

Status: done with concerns.

## Result

- Plan: `docs/task-cycles/kopia-bazy/plan.md`
- Size report: `docs/task-cycles/kopia-bazy/plan-size.md`. `slice_size.py` exit 0: all seven slices fit; the largest reads about 87 700 estimated tokens (Slice 6) and the most files changed is 9 (Slices 3 and 6).
- Open design choice (step 2): none. Reading the code showed no entry the change needs beyond the task, the projected entries and the spec, and no way the code makes costly to turn back. What it did show are the matters of how below, taken in *Choices*.

## The plan in short

Entries E1 to E22 are written first by the agent of *Foundation entries*. Then seven slices, in order:

| Slice | Goal | Model | Own review |
|---|---|---|---|
| 1 | backup command, `AccountDatabase` method, integration test, smoke test | cheaper | yes, `src/server/**` |
| 2 | release check in the image build | cheaper | yes, `src/server/**` |
| 3 | backup script and schedule | same | yes, `deploy/**` and the new keys; replacing a seven-day-old backup |
| 4 | three pairs compared at each deployment | cheaper | yes, `deploy/**` |
| 5 | launcher of the restore trial | cheaper | no |
| 6 | the skill, both copies | cheaper | yes, the documented restore and key change |
| 7 | the testing guideline | cheaper | no |

H5, H2 and H3 stand in no slice, and clearing E12's *Violated* mark comes after them, as the handoff gives.

## What reading the code found, not in the spec

Each is handled in the plan; the first three change what the request must say.

1. **An invariant test the change has to alter, unnamed by the spec by file.** `tests/invariants/test_account_server_typecheck.py`, `test_no_other_deployment_route`, fails on any new file under `deploy/` (`deployment_route_files`, pattern `deploy/*`, `tests/invariants/loop2_invariant_support.py:367-368`), so `deploy/loop2-backup` and `deploy/loop2-backup.cron` fail it at once. Slice 3 changes that test's list. It cites `account-server-typecheck`, so it goes under *What the foundation puts in front of the human at the merge* (WAY-03).
2. **A second altered invariant test.** `tests/quality/test_quality_invariants.py` gains `deploy/loop2-backup` in `BASH_SCRIPTS` (`shellcheck-source-rules`). The spec names this; it is listed here so the request's list is whole.
3. **An existing test's expectation changes.** `tests/deploy/test_loop2_deploy_build.py`, `test_commit_without_the_script_warns_then_fails_the_build_with_7`, expects one warning; with three pairs a commit from before this change warns for each. Slice 4 changes it under *Changing an existing test*, the reason being spec decision 10. It cites no invariant.
4. **Slice order forced by the fixture.** `deployable_commit` and `install` in `tests/deploy/deploy_script_support.py` must carry the two new sources, or every deployment test warns, so Slice 4 comes after Slice 3.
5. **Slice 1's goal states two things the spec holds only by consequence.** A backup larger than a pipe's buffer must arrive whole, since exit 0 means the whole file was written, and an early exit of the process can cut a stream short; and a reader that goes away counts as a failure, which removes the temporary directory. The second matters because the script's time bound can end `docker exec` on the host while the process in the container goes on, with a plain backup in `/tmp`.
6. **`RUN` after `USER node`.** The spec says "after `dist`"; the plan places it after `USER node` too, so the check runs as the server's user (see *Choices*).

## Guidelines missing or uncertain

- **`guidelines/testing.md`, *Trust boundaries*: a refusal without an invariant.** The rule says a boundary's refusal test is "oznaczony niezmiennikiem", and spec *Foundation entries* asks the `src/server/` row to name the command's refusals, yet no entry of the spec covers them. Row E14 speaks of a backup leaving the server, not of the bare command. See question 2.
- **No kind for an operator command or a host script.** `guidelines/coding.md` has no kind for either, and its *Odłożone rodzaje* defers deployment patterns. `guidelines/coding-database-access.md` describes only the blocking command under *Własność połączenia*. The spec says that file stays true, and it does; but the backup command follows `src/server/account-block.ts` by the spec alone, not by a guideline. No action proposed.
- Styleguide: not read; no slice touches `browser-view`, so its order-of-work example does not apply.

## Reaches beyond the dispatch

- `.the-way/elements/common/way_of_working.md` "Reading the foundation", `.the-way/product-guidelines/reading.md`, `.the-way/task-cycle/skill/SKILL.md` steps 8-9, `.the-way/task-cycle/skill/foundation_step.md`, `.the-way/task-cycle/skill/planning.md`: what the plan's method and the order of *Foundation entries* depend on.
- `.the-way/elements/common/foundation_check.py`: to learn that a test's `invariant:` line must name an existing entry and that *Method: test* needs no citing test at the check, which sets the order of E13 to E15 before their tests.
- `.the-way/product-guidelines/testing/SKILL.md`: how the cycle's author changes the guideline, for Slice 7's *Read*.
- `foundations/invariants.md`: `account-server-typecheck`, `account-database-schema`; `foundations/environment_facts.md`: `node-sqlite-database`, `sqlite-wal-concurrency`, `mikrus-host-swap`; `foundations/glossary.md`: `deployment`, `test server`, `copy`; `foundations/decisions.md`: D-31, D-83 in part. Each for a slice's *Read*.
- D-49, D-81, D-110, D-111 and `account-startup-configuration` are in *Read* of Slices 1 and 5 by their titles from a search of *Scope*, not read by me whole. The orchestrator's check of *Read* should judge them.
- Tests and scripts, to find what a new file breaks: `tests/invariants/test_account_server_typecheck.py`, `tests/invariants/test_account_server_runtime.py`, `tests/invariants/loop2_invariant_support.py`, `tests/invariants/account_container_support.py`, `tests/invariants/test_loop2_host_sharing.py`, `tests/invariants/test_loop2_container_isolation.py`, `tests/invariants/test_loop2_one_serving_process_container.py`, `tests/invariants/test_loop2_deploy_keeps_running.py`, `tests/deploy/test_loop2_deploy_build.py`, `tests/deploy/test_account_storage.py`, `tests/account-storage.test.mjs`, `tests/password-measurement.test.mjs`, `tests/quality/test_node_test_selection.py`, `scripts/test.py`, `.gitattributes`, `.dockerignore`, `package.json`, `tsconfig.server.json`.
- One focused check command tried to show the form runs: `npm test -- tests/deploy/test_loop2_deploy_input.py`, 8 tests, exit 0. `python -B .the-way/elements/common/foundation_check.py`, 0 errors. No other check named in the plan has been run; most name files that do not exist yet.

## Searches not found or unclear

- **`copy` in the glossary.** `foundations/glossary.md:175`: "A copy is the program a map run carries out". The spec's designer searched the glossary for backup words only (`reports/02-spec-design-report.md:71`), and spec *Foundation entries* says "Glossary: none". See question 1.
- **Decision 8's "stage" names.** Left to the maker; Slice 6 must take them from the script, so it reads the script by name.
- **`foundations/violated_invariants.md`** is named by `foundation_check.py` and does not exist here. The check reports 0 errors, and the last cycle set and cleared a mark in `foundations/invariants.md` alone (commit e95a8b1), so the plan follows that.
- **Whether a Docker build's plain output keeps the check's printed release.** Spec decision 9 and H5.2 rely on it for a rebuilt step. Nothing in the repository shows this form of output; `deploy/loop2-deploy:298-300` keeps whatever Compose prints. If the output hides it, only the log line changes, not the check. H5.2 shows it.

## Questions, each with a proposed answer

Neither stops the plan.

1. **Does the word `copy` for a database backup collide with the glossary's `copy`?** Proposed: no entry in the glossary; the writers of E1 to E20 say "backup" for this thing, as the projected entries do, and the skill and code follow. The spec's own working names use "copy", but "of a row the wording is the writer's" lets this stand. Evidence: D-13, D-16 and D-112 already use "copy" in its ordinary sense and no conflict is recorded, so the cost of doing nothing is a word in two meanings in later reading, and the cost of the proposal is none. The writer's search of the foundation (WAY-33) meets this anyway; the plan's note under *Foundation entries* points to it. The plan's entry names use "backup" for this reason.
2. **Which invariant marks the command's refusal in the `src/server/` row of `guidelines/testing.md`?** Proposed: none new. The row describes the refusal with its test case and the decision that carries it, since the boundary already has its refusal tests and the rule asks for "przynajmniej jeden". A fifth invariant would add an entry neither the task nor the spec carries, which would be an open design choice. Cost of the proposal: one test of a boundary stands without an invariant's mark, and the review of Slice 7 may raise that. The alternative, reading E14 widely enough to cover the bare command, would stretch a settled sentence.

## Concerns for the orchestrator

- **The size of the foundation step.** E1 to E22 are eight new decisions, three changed, four new invariants and one changed, four facts and two part-map changes, written by one agent with a search of the whole foundation for each. `slice_size.py` does not measure this step, so nothing here shows it fits one agent.
- **The identifiers of E14 and E15 are proposals.** If the writer of the entries chooses others, the two test paths in Slice 3's *Change*, *Checks* and rows E14 and E15 follow them when the handoff is built.
- **The tests of Slices 1, 2 and 5 build real images.** On a machine where no daemon answers they skip and report themselves unchecked. Docker's engine answers on this computer today (29.7.2 at the base gate).
- **Slice 3 has `same` for a reason the method's sentence does not list word for word.** The method gives `same` for a change across many parts; the slice reaches three, and its real weight is the pipe's exit statuses. The orchestrator's check of *Model* may lower it; a failed `cheaper` executor retries one class higher.
