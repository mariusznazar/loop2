# Report of the fix of the review of the whole change (fix round 1)

**Status:** done

Range: `f742a3fb..e0d2b678` on `task/luki-w-testach-z-przegladu`. Worktree clean at return (`git status --short` empty).

## Findings, one by one

| Finding | Answer | Commit |
|---|---|---|
| I-1 | fixed: the case saves a game state before the replacement and reads it back after it | `835a6d25` |
| M-1 | fixed by removal: the comment no longer carries any measured number (the commit message of `4bfc33cd` keeps 740 ms) | `f0f40437` |
| M-2 | fixed: the comment keeps only why the deadline must outlast the way to the held answer; the computer's timings and smtp-server's greeting delay are gone | `f0f40437` |
| M-3 | fixed: `disableReverseLookup: true` on the test's SMTP server, shown to remove the failure the reviewer predicted | `f0f40437` |
| M-4 | fixed: environment fact `docker-desktop-resource-saver`, named in D-390's *Based on*; the observation itself put in D-390's *Rationale* as the product's own measurement | `7988b582` |
| M-5 | fixed, by a variant of the recommended remedy (below) | `6310a737` |
| M-6 | left for the return step, as the handoff gives | — |
| M-7 | fixed with the recommended wording, and the test's docstring brought in line | `c8edc421` |
| M-8 | fixed: `// invariant: sprite-credits` above the case at `tests/view/icons.test.mjs:350` | `f8115a87` |
| M-9 | fixed: `SAVED_DOCUMENT_JS` in `program_fixture.py`, used by both drivers | `e0d2b678` |

### I-1 (`835a6d25`)

`tests/deploy/test_account_storage.py`:
- `REQUEST_PROBE` takes `spec.method`, falling back to the old rule (POST with a body, GET without one) when the field is absent or null. So `tests/deploy/test_restore_trial.py`, which builds its own spec with no `method`, behaves as before (run below). `request()` takes `method=None`.
- Before the replacement: `PUT /api/saved-game` with `{"version": 3, "game": {"replacementCheck": "kept", "minute": 42}, "basedOn": 0}`, asserted `(200, {"revision": 1})`.
- After the replacement, right after the account check: `GET /api/saved-game`, asserted `(200, {"save": {"version": 3, "game": {...}, "revision": 1}})`, with the message "the saved game state did not outlive the replacement".
- Docstring: the first line names saved game states (and D-205). The description says the case saves one game state and reads it back. The "Does NOT cover" clause about saved game states is gone. The `require_daemon` message names saved game states too.
- Expected values come from the request (literals), and from the testing guideline's rows for `PUT`/`GET /api/saved-game` (revision 1 at the first save, `save` holding `version`, `revision`, `game`). The server reads nothing inside `game` (D-07 comment at `src/server/account-routes.ts:478-479`), so any small object works.
- The case keeps its name `test_replaced_container_keeps_accounts_and_sessions`, because To do 11 names it word for word. Its marker and `decision:` lines are unchanged. The invariant and D-17 now agree with no edit to either.

### M-1, M-2, M-3 (`f0f40437`)

`tests/account-mail.test.mjs`:
- The comment at the 1.5 s deadline is now three lines: the pre-existing line ("Each phase of the library may wait 5 s; the deadline cuts the send at 1.5 s.") and "The deadline runs from the start of the send and must outlast the way to the held answer, which a busy computer slows."
- The test's `SMTPServer` options gain `disableReverseLookup: true` under the comment "No case reads the client's host name." No case of the file reads `session.clientHostname`.
- smtp-server's source (`node_modules/smtp-server/dist/esm/smtp-connection.js:516-547`) skips `dns.reverse` when the option is set.

### M-4 (`7988b582`)

Written by following `.the-way/task-cycle/skill/foundation_step.md`, `record-environment-fact` and `record-decision`. Both entries are **the cycle's**: no row of *Settlements to record* carries them.

New entry in `foundations/environment_facts.md`, after `docker-desktop-start-detach`:

> ## docker-desktop-resource-saver
>
> Docker Desktop's Resource Saver mode stops the Docker Desktop Linux VM when no containers are running for a period of time, on Windows with WSL pausing the Docker Engine instead, and Docker Desktop can serve Docker commands that don't run containers, such as listing container images or volumes, without waking the Linux VM.
>
> - **Source:** https://docs.docker.com/desktop/use-desktop/resource-saver/ (archived: https://web.archive.org/web/20261113210303/https://docs.docker.com/desktop/use-desktop/resource-saver/, 2026-11-13) § the opening paragraph — "Resource Saver mode significantly reduces Docker Desktop's CPU and memory utilization on the host by 2 GBs or more, by automatically stopping the Docker Desktop Linux VM when no containers are running for a period of time." · § Configure Resource Saver — "Docker commands that don't run containers, for example listing container images or volumes, don't necessarily trigger an exit from Resource Saver mode as Docker Desktop can serve such commands without unnecessarily waking up the Linux VM." · § Resource Saver mode on Windows — "Instead of stopping the WSL VM, it only pauses the Docker Engine inside the docker-desktop WSL distribution."; read 2026-11-17

- Meaning (EN): Docker's documentation says Resource Saver stops Docker Desktop's VM when idle (on WSL it pauses the engine), and that Docker Desktop may answer commands that run no container without waking it.
- Meaning (PL): Dokumentacja Dockera mówi, że Resource Saver zatrzymuje maszynę wirtualną Docker Desktop przy bezczynności (na WSL wstrzymuje silnik), a Docker Desktop może odpowiadać na polecenia, które nie uruchamiają kontenera, bez jej budzenia.
- Mechanical check (write.md): all three passages were found word for word, whitespace collapsed, in the live page (curl, HTTP 200). They were also found in the archived copy of 2026-11-13, fetched decompressed from `…/20261113210303id_/…` (HTTP 200). That capture already existed in the CDX index (`web.archive.org/cdx/search/cdx?url=docs.docker.com/desktop/use-desktop/resource-saver/…`); none was made for the entry. Before `--compressed` the archive answered 429 twice.

D-390 (`foundations/decisions.md`, from line 1365):
- *Based on* gains `docker-desktop-resource-saver`.
- *Rationale* gains these sentences after "Only an answer of the daemon counts as Docker being up, because that answer is what the tests need.":

> Docker Desktop in Resource Saver can serve a command that runs no container without waking the machine of its daemon, so only a question the daemon itself answers shows it up: on one computer running Windows with WSL, Docker Desktop with engine 29.7.2, having stopped its daemon for Resource Saver, answered `docker version` and six other commands that run no container from its cache and, of the nine such commands tried, woke the daemon only for `docker system df`, which it answered once the daemon ran; Docker Desktop 4.99.0 with engine 29.9.3 answered `docker version` from its cache too and woke the daemon for `docker system df`; this observation is the product's own, and its record is not open to a reader of the repository. Accepted with it: a later Docker Desktop that serves `docker system df` from its cache would let an answer of the cache pass for the daemon's again, and nothing would show it.

- Meaning (EN): D-390 now says why the gate's question must reach the daemon, rests that on the documented Resource Saver fact, and records the cached-answer observation and its accepted risk. Its binding sentences are unchanged.
- Meaning (PL): D-390 mówi teraz, dlaczego pytanie bramki musi dotrzeć do demona, opiera to na udokumentowanym fakcie o Resource Saver i zapisuje obserwację odpowiedzi z pamięci podręcznej oraz przyjęte ryzyko; zdania wiążące bez zmian.

Why this shape:
- The fact template (section "Which facts are written") and the decision template both say that a measurement the product's own agents made, whose record a reader cannot open, gets no fact entry. It stands in the decision's *Rationale*, said to be the product's own.
- So executor 22's observation (backend log lines, nine commands) went to D-390's *Rationale*. Only what Docker's page says became a fact.
- The page names no command, as the reviewer says, so the fact does not claim that `system df` wakes the daemon.
- The figures in the rationale come from `reports/executor-22-report.md:78-87, 123-128, 138-146, 240-250`.
- The reviewer's second risk is not written into the foundation, since D-390 holds no per-question limit: `system df` on a very large store could pass `ANSWER_LIMIT` (30 s). It stays as executor 22 noted it.
- No code changed for M-4. The docstring of `scripts/docker_gate.py` already says what the rationale now carries.

### M-5 (`6310a737`)

`tests/invariants/test_character_team.py`:
- The altered document "a loop's map run carrying another character of the team" is dropped, as recommended.
- The reading's check `key != str(carried)` (a loop must stand under the id its map run carries) is dropped, as recommended.
- **Variant:** in its place the reading counts the number a loop stands under as a character that must stand once in the lists of the teams (`numbers.count(key) != 1`). D-241 holds earning loops "by character number", so the key names a character, and "belongs to exactly one team" applies to it. With the key check simply removed, a made-up state with a loop under character 9 and its map run carrying character 1 would go unseen by the reading. The control case now asserts exactly that state is flagged (`{"9": loop(1)}`, replacing `{"2": loop(1)}`, which named two characters of the team).
- The docstring's reading and its Controls paragraph follow.
- Consequence, named: a break in which a loop's next map run takes another character of the team, one of the four breaks in the message of `de7774b5`, is no longer caught under `character-team`. As the reviewer says, that belongs to D-241 and D-56.
- Cost if the variant is wrong: one extra flag in the reading that the reviewer may judge outside the sentence. Dropping it is a two-line edit.
- This is a changed invariant test, named here.

### M-7 (`c8edc421`)

- `guidelines/coding.md:37-39` now reads: "Wzorce plików `eslint.config.mjs` obejmują każdy plik TS/JS pięciu części, które D-29 wymienia, i każdy plik JavaScript z trzech katalogów agent-workflow, które D-29 nazywa." This is the reviewer's wording.
- The docstring of `tests/quality/test_source_tool_scope.py:1-5` names "the five parts D-29 and D-32 both name, `SCOPE_PARTS`". D-32's *Scope* is exactly those five, and D-29's is those five plus agent-workflow.

### M-8 (`f8115a87`)

One line, `// invariant: sprite-credits`, above the case at `tests/view/icons.test.mjs:350` (now `:351`), in the file's marker convention (above `test(`).

### M-9 (`e0d2b678`)

- `tests/invariants/program_fixture.py` gains `SAVED_DOCUMENT_JS`, which holds:
  - `siblingModule(gamePath, name)`, with dynamic imports inside, as `KNOWING_GAME_JS` does, so it clashes with no top-level import of a driver;
  - `savedDocument(game, saved, state, nowMs)`: `withSaveTime`, `savedGame` and a JSON round trip.
- Both drivers embed it and drop their own `sibling` and document code, and the `node:path` import they no longer need.
- Behaviour is identical: the old `documentOf` of program-closed-lists used `copy(...)`, the same round trip. Both tests pass.

## Checks (command, exit code)

All commands were run from the worktree root. Outputs are kept in `.runs/fix-1/*.txt`.

| Check | Command | Exit |
|---|---|---|
| I-1 red: database path of `compose.yaml` moved to `/tmp/accounts.sqlite`, and the new saved-game check placed first after the replacement for that run only | `npm.cmd test -- tests/deploy/test_account_storage.py` | 1 — failed at the saved-game check: `(401, {'code': 'unauthenticated', …}) != (200, {'save': {'version': 3, 'game': {…}, 'revision': 1}})`; the PUT before the replacement had passed (`red-storage.txt`) |
| I-1 green, files restored (test file hash `6E9CDCFC…` equal to the saved copy; `git diff -- compose.yaml` empty) | `npm.cmd test -- tests/deploy/test_account_storage.py` | 0 — Ran 1 test, OK (`green-storage.txt`) |
| The other user of `REQUEST_PROBE` | `npm.cmd test -- tests/deploy/test_restore_trial.py` | 0 — Ran 19 tests, OK (`restore-trial.txt`) |
| M-3 shown: the option removed and a resolver that never answers (`resolver: { reverse() {} }`) set for the run | `npm.cmd test -- tests/account-mail.test.mjs` | 1 — "a server that stops answering…" failed on "precondition: the server held its answer"; every other case slowed to ~1.6 s (`mail-silent-resolver-no-option.txt`) |
| M-3 shown: the same resolver with `disableReverseLookup: true` | `npm.cmd test -- tests/account-mail.test.mjs` | 0 — 10 passed, cases back to ~0.1 s (`mail-silent-resolver-with-option.txt`) |
| Mail test as committed (file hash `D8FD19B7…` equal to the saved copy) | `npm.cmd test -- tests/account-mail.test.mjs` | 0 — 10 passed (`mail-green.txt`) |
| Format and lint of the mail test | `node node_modules/prettier/bin/prettier.cjs --check tests/account-mail.test.mjs` / `node node_modules/eslint/bin/eslint.js tests/account-mail.test.mjs` | 0 / 0 |
| Foundation check after M-4 | `python -B .the-way/elements/common/foundation_check.py` | 0 — "0 errors" (`fc-m4.txt`) |
| M-5 green | `npm.cmd test -- tests/invariants/test_character_team.py` | 0 — Ran 6 tests, OK (`ct-green.txt`) |
| M-5 red: the new key check disabled (`if False and …`) | `npm.cmd test -- tests/invariants/test_character_team.py` | 1 — `test_control_the_reading_flags…` failed: "a loop under a character no team holds goes unseen"; file restored, hash `3DFDF419…` equal to the saved copy (`ct-red.txt`) |
| Ruff on the changed Python files | `.runs/quality-venv/Scripts/ruff.exe check tests/invariants/test_character_team.py` (and later the three M-9 files, and `tests/quality/test_source_tool_scope.py`) | 0 each |
| M-7 | `npm.cmd test -- tests/quality/test_source_tool_scope.py` | 0 — Ran 4 tests, OK (`scope.txt`) |
| Foundation check after M-7 | `python -B .the-way/elements/common/foundation_check.py` | 0 — "0 errors" (`fc-m7.txt`) |
| M-8 red: the wolf pack's `licenceUrl` in `src/browser/view/credits.ts` changed to `https://example.invalid/` | `npm.cmd test -- tests/view/icons.test.mjs` | 1 — only the case now citing at `:351` failed; the two other `sprite-credits` cases passed (`icons-red.txt`). `credits.ts` restored from its copy, hash `F4E7E1D7…` equal, `git diff -- src` empty |
| M-8 green | `npm.cmd test -- tests/view/icons.test.mjs` | 0 — 36 passed (`icons-green.txt`) |
| Foundation check and format after M-8 | `python -B .the-way/elements/common/foundation_check.py` / `node node_modules/prettier/bin/prettier.cjs --check tests/view/icons.test.mjs` | 0 "0 errors" / 0 |
| M-9 | `npm.cmd test -- tests/invariants/test_character_team.py` / `npm.cmd test -- tests/invariants/test_program_closed_lists.py` | 0 (6 OK) / 0 (4 OK) |
| Final foundation check at `e0d2b678` | `python -B .the-way/elements/common/foundation_check.py` | 0 — "0 errors" (`fc-final.txt`) |

Not run:
- The product's gate (`npm.cmd test` without a file, `gate_times.py`): the handoff keeps it for the orchestrator.
- `python -B .the-way/instruction-files/check_instructions.py`: no instruction file changed. It is left to the gate.

Every file I changed for a moment to see a test fail was restored byte for byte before its commit: the hash was compared with a saved copy, or `git diff` was empty for `compose.yaml` and `src/`.

## Own-work check (section 3)

- **Requirement most likely not met:** I-1's case could now claim saved game states without actually reaching the database for them. For example, the PUT could be refused, or the read after the replacement could be served by something other than the stored row, while the citation still counts as coverage.
- **Check:** the red run with the database path outside the volume.
  - It shows the PUT before the replacement answered 200 with revision 1, because the assertion before the move passed.
  - It shows the read after the replacement failing when the database does not survive.
  - The green run shows the saved state read back whole (`version`, `revision` and `game`).
- **Further check:** `foundation_check.py` at the final head reports 0 errors. The marker stays on the case To do 11 names (`tests/deploy/test_account_storage.py:98-99`).
- **Limit:** accounts and saved game states share one database file. No break keeps one and loses the other, so the new check fails together with the account check, not alone.

## Docker

- Before the runs, `docker ps -a` showed no containers. Volumes: `mm-gobuild` and `mm-gomod`. Images included three `loop2-account-storage-check:*` tags (`7d49d5e162c4`, `a0d184f63298`, `bd7784839963`), `loop2-image-icons-check:cf492fe1b4fa` and others, all from before this fix.
- After the runs the lists are the same. My runs left no container, volume or image: each test removes its own.
- Docker Desktop is left running and answering (`docker ps -a` answered at return).

## Reaches beyond the handoff

- `src/server/account-routes.ts:180-210, 476-545`: the save route's fields and answers, to word the PUT and GET of I-1.
- `tests/deploy/test_restore_trial.py`, found by grep: it reuses `REQUEST_PROBE`, so the probe had to stay compatible.
- `node_modules/smtp-server/dist/*/smtp-connection.js`, grep: that `disableReverseLookup` skips the lookup.
- For M-4, each read as the element skills give:
  - `.the-way/elements/environment-facts/` (SKILL, read, decide_entry, draft, write, template) and `.the-way/elements/common/way_of_working.md`, `rules.md`;
  - `.the-way/elements/decisions/` (SKILL, read, decide_entry, template, examples) and WAY-03 in `.the-way/foundations/decisions.md`;
  - D-390, D-391, D-392, D-405 and D-406 whole;
  - invariant `gate-docker-start-waits-once`, fact `docker-desktop-start-detach`, the `test-helpers` entry of the part map;
  - `reports/executor-22-report.md` (lines 70-162, 238-262);
  - Docker's page and its archived copy.
  - Why: to write the fact and the decision's change as the element skills give.
- For M-7: D-29's binding paragraph and *Scope*, and D-32's *Scope*, to check "pięciu części".
- For M-8: `src/browser/view/credits.ts:50-75`, to choose the break.
- I read `.the-way/product-guidelines/coding/SKILL.md` to see whether the edit of `coding.md` needed it. It runs in refinement; the cycle's author writes the guideline files.

## Working copies

All under `.runs/fix-1/` in the worktree:
- File copies: `test_account_storage.final.py`, `account-mail.final.mjs`, `test_character_team.final.py`, `credits.ts.orig`. Removed.
- `web/`: downloads of Docker's page and of its archived copy. Removed.
- The `*.txt` outputs of the runs listed above stay in `.runs/fix-1/` for the orchestrator to read. They are ignored by git.
- No worktree or clone was made.

## Choices, with the ways rejected

- **I-1:** the probe's method field falls back to the old rule, rather than every caller sending a method. Rejected way: editing `test_restore_trial.py` too, which is outside the finding.
- **I-1 red run:** the saved-game check was placed first for that run only, so the run fails at the new assertion and not at the account check before it. Cost: none; restored from the copy.
- **I-1 naming:** the case's name is kept although it no longer says "saved games". To do 11 names it word for word, and renaming would break that citation of the task.
- **M-2:** no environment fact was written for smtp-server's greeting delay. Once the timings left the comment, no code or comment rests on it.
- **M-4:** fact plus rationale, rather than a fact holding the observation. The templates send an own, unpublished measurement to the decision's *Rationale*.
- **M-5:** the variant described above, rather than dropping the key check whole.
- **M-9:** only the two pieces the finding names were moved. Rejected: also moving `node()` and `drive()`, a larger refactor that the finding does not ask for.

**Unread material:**
- `reports/review-whole-report.md`: not read. The findings file quotes the reviewer's words and evidence for each finding, and that sufficed.
- `plan.md`: not read; slice 1 and *Foundation entries* were not opened. The finding quotes the plan row and commits, and executor 1's report gave slice 1's work.
- `guidelines/testing.md`: read whole, in two pages. `guidelines/coding.md`, `task.md`, the findings file, the handoff, the method and `fix.md`, `foundation_step.md` and executor 1's report: read whole.
- `reports/executor-22-report.md`: read in part (lines 70-162 and 238-262).
- D-17: only its *Verification* line, as quoted in the finding (`decisions.md:1798`). D-29 and D-32: binding paragraph or *Scope* lines only.

**Searches not found or unclear:**
- The archived copy of Docker's page answered 429 to two plain requests. A third request with `--compressed` returned it, and the passages were found there.
- The live page says Resource Saver on Windows with WSL only pauses the engine. Executor 22's logs on this WSL computer read `VM stopped`. The fact keeps to the page; the rationale keeps to what was observed and says "stopped its daemon". Which of the two describes this computer's mode precisely is unclear.
