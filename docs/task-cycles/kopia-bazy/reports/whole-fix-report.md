# Fix of the review of the whole change — kopia-bazy

**Status:** done with concerns (three choices below go a step past the handoff's wording, each named).

Worktree `C:/Storage/repos/loop2-wt/kopia-bazy`, branch `task/kopia-bazy`, from `d8b1482` to `eb4ece0`.

## Commits and files

| Commit | File | Added | Removed |
|---|---|---|---|
| `5908e19` fix: exit 4 when Docker does not show what was made gone | `scripts/restore-trial.mjs` | 63 | 46 |
| | `tests/deploy/restore-trial-docker-standin.mjs` (new) | 121 | 0 |
| | `tests/deploy/test_restore_trial.py` | 87 | 10 |
| `fac78c2` docs: the skill | `.claude/skills/loop2-deploy/references/backup_and_restore.md` | 16 | 10 |
| | `.agents/skills/loop2-deploy/references/backup_and_restore.md` | 16 | 10 |
| `eb4ece0` docs: D-217 | `foundations/decisions.md` | 18 | 9 |
| | `guidelines/testing.md` | 3 | 2 |
| | `src/server/account-backup.ts` | 7 | 6 |

## Blocking findings

All four fixed; none contested.

### I1 — fixed (`5908e19`)

`cleanup()` now takes `made`, the names the trial asked Docker to make, each recorded before its command so a command cut short still counts. Only an attempt whose removals and listings all exited 0, and whose listings hold none of what was made, shows it gone. It returns `left` (Docker lists it) and `unknown` (not shown gone). Either one means exit 4, the names on their own line (`left behind, ...` or `not shown to be gone, check and remove by hand: ...`), and PASS replaced by `FAIL: a container or a volume could not be removed or shown to be gone`. A status `null` (docker could not run, or timed out) counts as not 0. The contract at the top of the launcher says so, and so does step 6 of the skill's trial.

Check: the class `EndOfAPassingTrial` in `tests/deploy/test_restore_trial.py`, on the new stand-in `tests/deploy/restore-trial-docker-standin.mjs`. It needs no Docker: the launcher's `spawn` starts the stand-in in place of `docker`, by `--import`, as `tests/account-database-check-standin.mjs` does for `node:sqlite`.

| Case | Before the fix | After |
|---|---|---|
| every removal and listing fails (the reviewer's run) | **fails**: `AssertionError: 0 != 4` | exit 4, all four named |
| every listing fails, each removal exits 0 | **fails**: `0 != 4` | exit 4, all four named |
| every removal fails, listings answer empty | **fails**: `0 != 4` | exit 4, all four named |
| `volume rm` fails, `volume ls` still lists | passes | exit 4, the two volumes named, the containers not |
| removals and listings fail once, then answer | passes | PASS, exit 0 |
| control: Docker confirms | passes | PASS, exit 0, both listings called |

Failing run: `npm test -- tests/deploy/test_restore_trial.py`, exit 1, `FAILED (failures=3)`, 19 tests, on the launcher of `d8b1482`.
Passing run: the same command, exit 0, `Ran 19 tests in 137.466s`, `OK`, no skip, the run on a real daemon included: Docker 29.7.2 gave exit 0 for PASS, 1 for a wrong password and an absent marker, 130 for an interruption, and no leftovers.

The existing case `test_valid_input_without_docker_fails_without_a_verdict_and_shows_no_secret` holds that nothing made means no cleanup and exit 3 stands.

### I2 — fixed (`fac78c2`)

Step 4 of "Trying a backup on the owner's computer", both copies: the image is built from a clean checkout of the commit step 2 of "Installing and reinstalling" deployed, by `docker build --build-arg LOOP2_COMMIT=<sha> -t <image> .`, and "The launcher's report must read `image revision: <sha>`". `unknown` or another value shows no same commit, and the trial does not count until a build gives that sha. Step 6's list of what the launcher prints gains the image revision.

The skill says "step 2 of Installing and reinstalling" rather than H5, because `H1-H5` in `setup_and_secrets.md` is another list. Prose: no test. The launcher printing `image revision: unknown` for an unlabelled image was seen in the own-work run below.

### I3 — fixed (`fac78c2`)

- `:31-32`, both copies: "so the plain database exists on this host only inside the pipe (in the container it lies in `/tmp` for the seconds of the run, and a killed run can leave it there until the container is replaced)". The finding's words, in parentheses so that the sentence stays one ordered list.
- `:23`, both copies: "The key is a secret (D-13); the known-hosts file holds none."

Check: `cmp` of the two copies, identical; `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`, exit 0, 5 tests (byte-identical copies, no Mikrus host or address).

### I4 — fixed (`eb4ece0`)

D-217 extended through `the-way-record-decision`, read from `.the-way/elements/decisions/`. A new second binding sentence:

> That command opens only an existing database file, needs its one fixed word `--to-standard-output`, without which it refuses before it opens the database and prints nothing to standard output, and is run only by a human or the installed backup script.

- *Verification*: a *complies* for the refusal, and two *violates*: the command opening the database or writing to standard output without its word, and "a skill instruction in which an agent runs the command through the `mikrus` MCP server", as D-137 has.
- *Rationale*: why the word stands, and that D-12's limit on changes does not reach this read. *Rejected*: a refusal for a terminal, from spec decision 2.
- `guidelines/testing.md`, the `src/server/` row: "(D-217; bez niezmiennika)". D-222 left the row and left the rule's *Decision* field at `:149`, where only this row brought it.
- `src/server/account-backup.ts`, the comment: D-217 is cited for the word; the directory goes "also after a failure and after a reader that goes away; a signal that kills the process leaves it".
- Step 4.4: D-219 and D-222 derive from D-217 and restate none of this; D-112 names the command for its connection only; no invariant names D-217 in *Derives from*. No new invariant.

**The changed D-217 in one Polish sentence, for the request:** Polecenie kopii bazy otwiera tylko istniejący plik bazy, wymaga jednego stałego słowa `--to-standard-output`, a bez niego odmawia, zanim otworzy bazę, i niczego nie wypisuje na standardowe wyjście, i uruchamia je tylko człowiek albo zainstalowany skrypt kopii, nigdy agent przez serwer `mikrus`.

Check: `python -B .the-way/elements/common/foundation_check.py`, exit 0, 0 errors, at `eb4ece0`; a search of `foundations/decisions.md` now finds the word; `npm test -- tests/account-backup.test.mjs`, exit 0, 7 tests.

## Checks

| Command | Result |
|---|---|
| `npm test -- tests/deploy/test_restore_trial.py` (before the launcher's fix) | exit 1, 3 failures, each `0 != 4` |
| `npm test -- tests/deploy/test_restore_trial.py` | exit 0, 19 tests, no skip |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | exit 0, 5 tests |
| `npm test -- tests/account-backup.test.mjs` | exit 0, 7 tests |
| `npm test -- tests/quality/test_node_test_selection.py` | exit 0, for the new `.mjs` under `tests/` |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors, at `eb4ece0` |
| Prettier, the gate's options, on `scripts/restore-trial.mjs`, `src/server/account-backup.ts`, the stand-in | first exit 1 on the launcher, which my code caused; after `--write`, exit 0 |
| ESLint, the gate's options, on the same three files | exit 0, at `eb4ece0` |
| Ruff, the gate's options, on `tests/deploy/test_restore_trial.py` | exit 0 |
| `cmp` of `backup_and_restore.md` in both copies | identical |

Not run: the full `npm test`, the orchestrator's. ESLint on the whole repository: run on the three changed files only. Anything on the server or Strych, H5, H2, H3: not allowed here.

## Own-work check

The requirement most likely unmet: "no verdict of PASS stands above it" for a failure my test's stand-in does not produce. That stand-in always exits 1 and reaches the launcher through a redirected `spawn`. A real `docker` that cannot be started gives status `null` through the child's `error` event, a path the test does not walk.

The check: the launcher in `node:24-slim`, `--network none`, with a shell `docker` on `PATH` (no redirect), the reviewer's way, in two runs: that program failing every removal and listing, and that program deleting itself after the probe, so that the cleanup's `spawn` fails.

It showed, in both runs: `not shown to be gone, check and remove by hand:` with all four names, `FAIL: a container or a volume could not be removed or shown to be gone`, `launcher exit 4`.

Mutants in my head: dropping either status check, dropping `made.push` of a container, one attempt instead of three, not resetting `left` and `unknown` between attempts, and keeping PASS are each caught by a case above. Dropping the `.filter` on `kinds` changes only the number of Docker calls: nothing empty can become unknown.

## Reaches beyond the dispatch

- `foundations/decisions.md`, D-112, by a search for the backup command, to see what it holds for a missing file: nothing.
- `.the-way/elements/decisions/template.md`, `decide_entry.md`, `read.md`, `elements/common/way_of_working.md`, `rules.md`: the reading `the-way-record-decision` requires.
- `.the-way/product-guidelines/testing/SKILL.md`, lines 1 to 60, to see whether correcting a citation needs that skill: "Using a meaning that a decision of the product's log already carries takes no approval."
- `tests/quality/test_quality_invariants.py`, for the gate's exact commands; `foundations/part_map.md`, for what claims the new test file (`tests/deploy/**`).

## Searches not found or unclear

- D-217 had three binding sentences, the template's limit. See the second choice below.
- Whether a `docker rm --force` of an absent name exits 0 on every CLI: exit 0 on 29.7.2, read here; older clients not tried. See the first choice below.
- No entry held the row's second case, "a missing database file creates nothing". See the third choice below.
- `backup_and_restore.md:39` says "never run it by hand", and D-217 says a human may run the command. The skill narrows how, the entry says who; I read no contradiction and left both.
- The skill's "Never" list still forbids an agent reading the known-hosts file, which I3 now says holds no secret. Stricter than needed, harmless, left.

## Choices

1. **A removal that did not exit 0 means unknown, even when the listing then shows the name gone.** The handoff binds this; the finding names only the listing. Rejected: trusting an answering listing over a failed removal. Cost if wrong: a Docker client that fails `rm --force` on an absent name gives a false exit 4 on every run, since the setup container removes itself. The owner would see that at once, and the real-daemon case shows it does not happen on 29.7.2.
2. **Three binding sentences kept by merging.** The new sentence is second; the lock and the comparison are joined into the third, with their meaning unchanged, so that D-217 stays within the template's "1–3 binding sentences". Rejected: a fourth sentence (against the template), a separate entry (the handoff chose D-217). Cost: one long sentence.
3. **"Opens only an existing database file" is added to D-217, past the handoff's list.** The guideline's row also cites the case for a missing file, and no entry held it, so the row would have stayed false for that case. The source is spec decision 2, "never creating one". Rejected: splitting that case out of the row uncited. Cost if unwanted: one clause.
4. **Naming is by kind:** where only `volume ls` fails, the volumes are named and the containers are not, since the containers were shown gone. The handoff says "naming what was made"; that is the same in the run the finding describes.
5. **The stand-in is a tracked `.mjs` with a redirected `spawn`,** because on Windows Node's `spawn` finds no script named `docker` on `PATH`. Rejected: a run in a container, which would skip where no daemon answers; a `docker` path option in the launcher, a product seam for a test. `guidelines/testing.md`'s *Where in code* gains the file. Prettier's gate patterns do not cover `tests/deploy` (declined item 4); I ran Prettier on it directly.

## Problems observed

None beyond the findings. `npm test -- tests/deploy/test_restore_trial.py` took 137 s here against 28 s for the reviewer, and the failing run 35 s; I did not look into why.
