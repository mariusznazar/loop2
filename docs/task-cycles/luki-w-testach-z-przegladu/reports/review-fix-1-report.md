PASS e0d2b678

# Review of the fix of the findings — luki-w-testach-z-przegladu, fix round 1

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), variant the fix of a review's findings, with `.the-way/task-cycle/review/fix.md`.
- Range `f742a3fb..e0d2b678`, seven commits (`835a6d25`, `f0f40437`, `7988b582`, `6310a737`, `c8edc421`, `f8115a87`, `e0d2b678`), 10 files, +83 −58. `git rev-parse HEAD` = `e0d2b678f55cf2f28cdd168f5d36b82a6dea5026`, the head given; the worktree is clean.
- Bounded by `reports/review-whole-findings.md`: I-1 (blocking) and M-1 … M-9. M-6 is left to the return step by the orchestrator's choice and is not counted against the fix.

## Verdict in short

The blocking finding I-1 is fixed. Of the Minor findings, M-1, M-2, M-3, M-4, M-5, M-7, M-8 and M-9 are fixed; M-6 is deferred to the return step. The fix diff brings no new Critical or Important finding. One new Minor note.

## Each finding

| Finding | State | Evidence |
|---|---|---|
| I-1 | **fixed** | below |
| M-1 | **fixed** (by removal) | `tests/account-mail.test.mjs:359-361`: the comment carries no measured number now |
| M-2 | **fixed** | same lines: the computer's timings and smtp-server's greeting delay are gone; what is left says only why the deadline must outlast the way to the held answer |
| M-3 | **fixed** | `tests/account-mail.test.mjs:152-153` `disableReverseLookup: true`; see point 4 |
| M-4 | **fixed** | see point 3 |
| M-5 | **fixed** (a variant of my remedy, accepted) | see point 2 |
| M-6 | deferred to the return step (orchestrator's choice) | D-49 unchanged in the range |
| M-7 | **fixed** | `guidelines/coding.md:37-39` now names "pięciu części, które D-29 wymienia"; `tests/quality/test_source_tool_scope.py:1-5` names "the five parts D-29 and D-32 both name, `SCOPE_PARTS`" — true: D-32's *Scope* is those five and D-29's is those five plus agent-workflow |
| M-8 | **fixed** | `// invariant: sprite-credits` above the case at `tests/view/icons.test.mjs:351`; the fix shows it failing alone of the three citing cases with the wolf's licence link changed |
| M-9 | **fixed** | see point 5 |

### Points the orchestrator asked me to judge

1. **I-1.** `tests/deploy/test_account_storage.py` now saves a game state before the replacement (`PUT /api/saved-game`, body `{"version": 3, "game": {...}, "basedOn": 0}`, asserted `(200, {"revision": 1})`, lines 132-134) and reads it after the replacement (`GET /api/saved-game`, asserted `(200, {"save": {"version": 3, "game": {...}, "revision": 1}})`, lines 148-151). The case citing `account-save-durable-storage` thus holds the whole sentence — accounts and saved game states — and so agrees with D-17's "Checks of accounts and sessions alone … cannot clear account-save-durable-storage"; the docstring no longer says the case leaves saved game states out. The probe takes a method and falls back to the old rule where none is given, so `tests/deploy/test_restore_trial.py`, which reuses `REQUEST_PROBE` without `method`, keeps its requests (the fix ran it: exit 0, 19 tests). The red run with the database path of `compose.yaml` moved to `/tmp/accounts.sqlite` failed at the new check, `(401, …) != (200, {'save': …})`, after the PUT before the move had passed (fix report; a Docker run, not repeated by me, as the handoff gives). The case keeps its name, which To do 11 names word for word — accepted.
2. **M-5, the variant.** The fix dropped the altered document "a loop's map run carrying another character of the team" and the check `key != str(carried)`, as recommended, and added that the number a loop stands under stands once in the lists of the teams (`tests/invariants/test_character_team.py:267-271`). That is within the sentence: by D-241 the game state holds earning loops "by character number", so the key names a character, and "Every character belongs to exactly one team" applies to it as to the character a map run carries. The test still fails where it should: I removed both of the load's checks that refuse a loop under a character no team holds (`characterKey`'s `!records.characters.has(character)` and `earningLoop`'s `run.character.id !== characterId` in `src/browser/sim/saved-game.ts`), and the case `test_a_load_naming_a_character_no_team_holds_or_one_twice_is_refused` failed with the new reading's own line, "the earning loop stands under the character 9, which stands 0 times in the lists of the teams" (check 7). The fix names the cost: a loop's next map run taking another character of the team is no longer caught under `character-team`; that belongs to D-241 and D-56, as I said.
3. **M-4.** The new fact `docker-desktop-resource-saver` (`foundations/environment_facts.md:810-814`) has the form of its neighbours: one statement, a *Source* with the page, an archived copy and its date, each passage quoted by its section, and the reading date. Its statement keeps to the page — it names no command, so it does not claim that `docker system df` wakes the daemon. I fetched the live page (`https://docs.docker.com/desktop/use-desktop/resource-saver/`, HTTP 200) and found each of the three quotations once, with whitespace collapsed (check 3). D-390's *Based on* names the fact; D-390's *Rationale* carries the cached-answer observation, said to be the product's own with a record not open to a reader, and the accepted risk of a later Docker Desktop caching `docker system df` — the shape the templates give an own measurement. The numbers agree with `reports/executor-22-report.md` (six further cached commands, nine tried, engines 29.7.2 and 29.9.3). D-390's binding sentences are unchanged. `foundation_check.py` exit 0.
4. **M-3.** `disableReverseLookup: true` stands in the test's own `smtpServer` helper; no case of `tests/account-mail.test.mjs` reads the client's host name (`grep` for `clientHostname`, `reverse` finds nothing in the file), so it removes only the DNS query. The file passes 10 of 10 (check 5). The fix shows the effect with a resolver that never answers: without the option the case failed on its precondition; with it, all passed.
5. **M-9.** `SAVED_DOCUMENT_JS` (`tests/invariants/program_fixture.py:77-89`) holds `siblingModule` — the same `pathToFileURL(join(dirname(gamePath), name))` import, with its `node:path` and `node:url` imports made dynamic so they cannot clash with a driver's own — and `savedDocument`, the same `withSaveTime` + `savedGame` + JSON round trip that both drivers wrote (`copy(...)` in program-closed-lists was that same round trip). No other name of either driver is shadowed (`grep`). Both tests pass (check 6).
6. **New findings in the fix diff:** no Critical or Important one.

## New Minor note (does not block)

- **Place:** `tests/deploy/test_account_storage.py:99` (the case's name `test_replaced_container_keeps_accounts_and_sessions`) and `:122` (`SAVED_GAME`'s `"version": 3`).
- **Own words:** the case's name no longer says all it checks (saved game states too); kept on purpose, since To do 11 names it. Separately, the saved document's `version` 3 is a literal below the game's current shape version; the server reads nothing inside the document and accepts any version at the first save, so the case is right, but a later decision that the server compare the version with the current one would make this literal fail the case for a reason outside it. Neither changes what the case shows today.

## Checks run

All from `the repository's root` unless named.

1. `git rev-parse HEAD` → `e0d2b678…`; `git status --short` → empty.
2. `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors`; `python -B .the-way/instruction-files/check_instructions.py` → exit 0, `0 error, 144 warn, 7 info` (as at `f742a3fb`).
3. `curl -s -L --compressed https://docs.docker.com/desktop/use-desktop/resource-saver/` → HTTP 200; the three quoted passages of `docker-desktop-resource-saver`, tags stripped and whitespace collapsed, each found once (a Python count run with `-I`).
4. Worktree of `e0d2b678` at `.runs/review-whole/fix1`, with `node_modules` and `.the-way` linked by junction to the reviewed worktree's, for checks 5-7.
5. `npm.cmd test -- tests/account-mail.test.mjs` → exit 0, 10 pass; `npm.cmd test -- tests/view/icons.test.mjs` → exit 0, 36 pass.
6. `npm.cmd test -- tests/invariants/test_character_team.py` → exit 0, `Ran 6 tests … OK`; `npm.cmd test -- tests/invariants/test_program_closed_lists.py` → exit 0, `Ran 4 tests … OK`; `npm.cmd test -- tests/quality/test_source_tool_scope.py` → exit 0, `Ran 4 tests … OK`.
7. With both load checks of a loop's character removed from `src/browser/sim/saved-game.ts` (point 2): `npm.cmd test -- tests/invariants/test_character_team.py` → exit 1, `FAIL: test_a_load_naming_a_character_no_team_holds_or_one_twice_is_refused`, the new reading's message for step 7; restored with `git checkout`, diff empty.

Not run: `tests/deploy/test_account_storage.py` and `tests/deploy/test_restore_trial.py` (Docker; the handoff says not to start containers — judged from the fix report's red and green runs); the product's gate.

## Reaches beyond the dispatch

- `src/browser/sim/saved-game.ts:1085-1160` (`characterKey`, `earningLoop`, `earningLoops`): to choose the break of point 2.
- Docker's Resource Saver page (live): to verify the quotations of the new fact.
- `reports/executor-22-report.md` (already read in the review of the whole change): the figures of D-390's new *Rationale*.

## Working copies

- `.runs\review-whole\fix1`: a worktree of `e0d2b678`; its two junctions were removed first with `rmdir` (the reviewed worktree's `node_modules` and `.the-way` checked present afterwards), then `git worktree remove --force` and `git worktree prune`. Removed.
- `.runs\review-whole\web\` (the downloaded page): removed.
- Remaining as evidence, ignored by git: `.runs\review-whole\fix1-*.txt` (outputs of checks 5-7).

**Unread material:** the fix report and the whole fix diff read whole; `reports/review-whole-findings.md` not opened — the findings are my own, quoted in the handoff and in my report of the whole change; the archived copy of Docker's page not fetched (the live page holds every quotation); the element skills of environment facts and decisions not read again for this round — the form of the new entries was compared with their neighbouring entries.

**Searches not found or unclear:**
- Whether Resource Saver on this WSL computer stops the VM or pauses the engine: the page says pauses on WSL, executor 22's logs read `VM stopped`; the fact keeps to the page and D-390's rationale to the observation, so the two do not contradict each other, but which describes the computer is unclear (as the fix report says).
