# Return step report - porzadki-z-uwag-pr

**Status:** done (one choice for the orchestrator to confirm, under *Questions*).

Worktree `the root of the repository`, branch `task/porzadki-z-uwag-pr`, started from `60d4047`, `.the-way` at `294af7f`.

## Commits

| Commit | What | Files |
|---|---|---|
| `49b11e5` | three environment facts of the Docker documentation, named in what `account-save-durable-storage` rests on | `foundations/environment_facts.md` (+18), `foundations/invariants.md` (+1 -1) |
| `dada2f2` | one fact sentence narrowed to what its source says (see the own-work check) | `foundations/environment_facts.md` (+1 -1) |

Range `60d4047..HEAD`: 2 files, +18 -1 in total (`git diff --numstat 60d4047..HEAD`). Commits made with explicit paths, messages in the form of the repository's earlier ones. No code written.

## Table of the compared entries and the code

| Entry or candidate | Compared with | Result |
|---|---|---|
| D-352 (reload at the fragment of an emailed link) | `src/browser/view/game-view.ts` `address.onChange` (reload when `readConfirmationToken(hash)` or `readResetToken(hash)` is non-null, else the old path), `PageAddress.reload()` in `email-confirmation.ts` | matches; none |
| D-353 (`request.aborted` is a 400 with no line; a block-refused session write at response end leaves no line, any other cause keeps it) | `src/server/app.ts` (error handler, `sessions(...)` callback), `src/server/database.ts` (`BlockedSessionRefusal`, `"stored"/"blocked"/"refused"`), first store in `src/server/account-routes.ts:202` | matches; the first store in `establishSession` keeps its line as D-353's Verification says; none |
| D-354 and the rule "Recording a failure" | `src/server/account-backup.ts` (JSON line, then the sentence; `backup-cleanup` writes one line and one sentence), `account-block.ts` untouched | matches; none |
| D-254 wrap | token comparison reported by the foundation step; the entry reads the same | none |
| Rule "Recording a failure" in `guidelines/coding.md` | D-354, D-253; the rule's *Decision* field `D-252 · D-253 · D-354` | matches; none |
| Candidate 3: D-281, D-96, D-156, D-224, D-207 against the reload of Slice 10 | D-281 says the fragments of emailed links "stand apart" and the page then "opens Siedziba"; D-96 and D-224 say the reset form shows for a signed-in player and builds no game; D-156 says the link's page sends the token. The reload hands the fragment to the start of the page, which does what those entries give. D-352 derives from all four and names the one case they leave open (a page already open). The Verification of D-281 ("a page opened at `#confirm-email=…` ... opening Siedziba for a signed-in player") still holds for a page opened by the link. | no correction; none |
| Candidate 2: D-253 against `measure-passwords` | see below | not a mismatch this step corrects |
| Candidate 4: failure names and places (`backup-cleanup`, `account-backup.run`, `local-start.proxy`, `app.sessions`) | D-252 (line fields `failure`, `kind`, `code`, `place`, `accountId`), D-231, D-233, D-255, D-258 and the whole of `foundations/` and `guidelines/` by grep for each name | no entry lists or defines names or places of failure lines; D-252 sets the fields only, and the new lines carry them (`writeFailure(name, place, error)`). `backup-cleanup` is in the logging scope of D-252 ("operations that change ... its backup"). none |
| D-231 / D-233 and the new exit 1 of `account-backup` for a whole backup whose temporary directory could not be removed | D-233: "any failed end ... calls `pusher`"; the nightly script treats a non-zero end of the command as a failed stage, so the night is reported failed though the backup went out whole | consistent with D-233 as written ("any non-zero end"); see observation 3 |
| Decisions of *Decisions in play*: D-84, D-77 (tests wait with limits), D-207 (keepalive, code untouched), D-213 (`src/browser/sim/**` untouched by the diff), D-137, D-160 (skill text matches: usage line plus `Nothing changed.`, links stay stopped after unblocking), D-13 (mail steps renamed M1-M4 in the skill; no entry names H1-H5 for mail: grep of `foundations/`, `guidelines/`, `tests/agent_workflow/`, `AGENTS.md` found none), D-17, D-113 | the diff `00aa818..60d4047` | no mismatch |
| Part map: browser-view, simulation, account-server, build-tools, agent-workflow, product-foundation | `git diff --name-status 00aa818..60d4047`: 31 files, all `M`, none added or removed; each claimed by an existing part (`src/browser/view/**`, `tests/view/**`, `tests/account-api.test.mjs` browser-view; `tests/sim/**` simulation; `src/server/**` and the listed tests account-server; `scripts/**`, `tests/password-measurement.test.mjs`, `tests/invariants/test_local_start_access.py` build-tools; `.claude/**`, `.agents/**`, `guidelines/**` agent-workflow; `foundations/**` product-foundation); `foundation_check.py` reports 0 errors (it reports a tracked file claimed by no part as an error) | no change |
| Candidate 5: glossary terms | "blocked account" (D-353) used as its entry gives. "copy" (glossary: the program a map run carries out) appears in the new operator sentence of `account-backup.ts:124` and comment `:29` for the temporary copy of the database, in the ordinary sense, in server code the glossary term is not about. No sentence of the foundation reads differently for it (WAY-95), and the code text is not mine to change. | no entry, no correction |

### Candidate 2 in detail: D-253 against `measure-passwords`

D-253 says `account-database-check`, `measure-passwords`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` "already have a last-resort handling of their own, which the sentences of this decision above ask no more of". The reports of Slice 11 and of the whole-change review say neither file has "a last-resort handler". They are right about the word handler and wrong about the decision's word:

- D-253 writes "handling", and it writes "handler" only for the processes that touch accounts (`installLastResort`). Its first version (`git show b891590`) listed the four as "keeping the handling of the last resort they already have", which says the existing top-level handling of each, not an `installLastResort`.
- `src/server/measure-passwords.ts:359-390` (the program that runs in the container) has a top-level `try`/`catch` around all the work and a deadline timer; any throw ends in one JSON line and exit 1. That is a last-resort handling of its own in the sense of the decision, as `src/server/account-database-check.ts:82-86` has one.
- `scripts/measure-passwords.mjs:318-329` (the launcher) catches only the arguments; `measure(request)` is not wrapped. An error thrown there ends in Node's default print. That is the case D-253 lists as meeting the rule: "a script ... that touches none of those data meets the rule on the last resort through the default print of Node.js". The launcher touches no account data.
- The base `00aa818` has the same shape in both files; Slice 11 changed what the report holds on a failed docker step, not the top of either file.

So the clause is true of the container program, false of the launcher, and the launcher is covered by the decision's other sentence. Nothing the change did made it false, the rule D-253 sets is met by both files, and a rewording of an approved decision's clause is a change the task does not carry (WAY-30). I did not correct it. Recommendation: leave it. If the human wants the clause exact, one clause saying "`measure-passwords` in its container program" is a later, separate `the-way-record-decision` edit.

### Candidate 1 in detail: the Docker documentation

`the-way-record-environment-fact` and WAY-11 say a source outside the product that the change rests on and the foundation does not hold is written as a fact; the template adds that a fact stands only while an invariant's *Rests on* or a decision's *Based on* names it (WAY-73). The skill text of item 28 (both copies of `references/setup_and_secrets.md` and `SKILL.md`/`troubleshooting.md`) says what the three commands remove "by Docker's documentation". `docker-volume-lifecycle` says nothing on these commands. No decision cites them. The fact holds a condition of `account-save-durable-storage` (a commit that makes the deployment run `docker compose down -v`, or `docker volume prune --all` while no container references `loop2_accounts`, would break "Replacing the application container preserves the SQLite database"; read otherwise, the facts would change whether such a commit breaks it). So each fact is named in that invariant's *Rests on*, which is WAY-73's route for a fact that holds a condition. `compose.yaml:65-67` declares `accounts` with `name: loop2_accounts` and no `external`, which is what the skill's "is one of them and is not external" rests on.

Facts written (sources fetched again 2026-11-09; the tags `docker/cli` `v27.3.1` and `docker/compose` `v2.29.7` resolve to the commits `ce1223035ac3ab8922717092e63a184cf67b493d` and `9c60fe67df0763c81f2276fd4163ee5354d70b09` by `gh api repos/<repo>/commits/<tag>`; the commit addresses are the frozen ones, as the existing docker fact uses; the file fetched at the tag and at the commit was the same byte for byte for `volume_prune.md`):

- `docker-compose-down-volumes` (source `docker/compose` `docs/reference/compose_down.md`)
- `docker-volume-prune-scope` (source `docker/cli` `docs/reference/commandline/volume_prune.md`), whose sentence carries the page's own inconsistency: the description says "only anonymous" by default, the example output of the command without `--all` lists `my-named-vol`. The skill text already says not to count on the plain command to spare the volume; the fact says the same, as the page does.
- `docker-system-prune-volumes` (source `docker/cli` `docs/reference/commandline/system_prune.md`)

Three entries, not one: they are three commands of two documents, each with its own reason to change (WAY-76). None of the sentences names a Docker version: the template names an edition in the sentence only where the product stands on it, and the Engine version on the test server is recorded nowhere; the version shows in each *Source* address. The version dependence is therefore carried by the *Source* and by the skill text, which already says to read the documentation of the server's version (`docker version`).

## The *Return step* fields of the cycle record

- Foundation compared with code: D-352, D-353, D-354, the wrap of D-254, the rule "Recording a failure"; the 14 decisions of *Decisions in play*; D-231, D-233, D-252, D-253, D-255, D-258; the part map entries of the six parts; the glossary; no mismatch except as stated for D-253 (not corrected, with evidence above).
- Decisions written or changed: none.
- Invariants written or changed: one changed, `account-save-durable-storage`: *Rests on* gained three facts; the sentence, *Method*, *Derives from*, *Part* and *Violated* are unchanged. The source of the rule: it is set by the existing entry (D-17 · D-205); no new rule is written. Marked `the cycle's`.
- Environment facts: three written (`docker-compose-down-volumes`, `docker-volume-prune-scope`, `docker-system-prune-volumes`), `the cycle's`.
- Glossary terms: none.
- Part-map changes: none.
- Projected entries written: none (the task is not projected).
- Rows of *Settlements to record* written: none by this step (rows 1-3 were written by the foundation step as D-352, D-353, D-354).

One sentence of the meaning of each entry written or changed:

- `docker-compose-down-volumes` - EN: By default `docker compose down` removes containers and networks and no volume, and only with `--volumes` the named volumes of the Compose file, never an external one. PL: Domyślnie `docker compose down` usuwa kontenery i sieci, a żadnego wolumenu; dopiero z `--volumes` usuwa nazwane wolumeny z pliku Compose, nigdy zewnętrznego. Mark: the cycle's.
- `docker-volume-prune-scope` - EN: The documentation of `docker volume prune` says it removes unused volumes, by default anonymous ones only and with `--all` the named ones too, but its own example lists a named volume as deleted without `--all`. PL: Dokumentacja `docker volume prune` mówi, że usuwa nieużywane wolumeny, domyślnie tylko anonimowe, a z `--all` także nazwane, lecz jej przykład bez `--all` wymienia nazwany wolumen wśród usuniętych. Mark: the cycle's.
- `docker-system-prune-volumes` - EN: `docker system prune` removes no volume by default, `--volumes` adds anonymous volumes, and `--all` removes all unused images. PL: `docker system prune` domyślnie nie usuwa wolumenów, `--volumes` dodaje wolumeny anonimowe, a `--all` usuwa wszystkie nieużywane obrazy. Mark: the cycle's.
- `account-save-durable-storage`, *Rests on* - EN: the invariant that replacing the application container keeps the database now rests also on what the three Docker commands remove. PL: niezmiennik, że wymiana kontenera aplikacji zachowuje bazę, opiera się teraz także na tym, co usuwają trzy polecenia Dockera. Mark: the cycle's.

Wording on `{fork-point}` beside the new one (step 4.2 of the invariant skill): `- **Rests on:** docker-volume-lifecycle` became `- **Rests on:** docker-volume-lifecycle · docker-compose-down-volumes · docker-volume-prune-scope · docker-system-prune-volumes`. The only test that mentions the invariant is a comment in `tests/deploy/test_account_storage.py:21` (the method is `review`); it quotes no *Rests on*.

For the request (WAY-03): test files the diff `00aa818..60d4047` altered that cite invariants, to be checked against which cited test was altered: `account-client-requests`, `account-client-outcomes` (`tests/account-api.test.mjs`); `account-database-schema`, `account-schema-lifecycle` (`tests/account-storage.test.mjs`, `tests/startup.test.mjs`); `public-file-access`, `account-session-authorization`, `player-server-session`, `player-argon2-password-hash` (`tests/http.test.mjs`); `account-startup-configuration` (`tests/startup.test.mjs`); `local-start-access` (`tests/invariants/test_local_start_access.py`); `trip-transfer`, `map-run-repeatability`, `loop-run-knowledge`, `saved-program-edit` (`tests/sim/loop.test.mjs`); `solved-map-manual-run`, `save-version` (`tests/sim/saved-game.test.mjs`); `expired-session-unsaved-progress` (`tests/view/account-screen.test.mjs`). I listed the files that cite them; I did not check which cited test the hunks touch.

## Files changed, with line counts

| File | Added | Removed |
|---|---|---|
| `foundations/environment_facts.md` | 18 | 0 |
| `foundations/invariants.md` | 1 | 1 |

## Checks (command and exit code)

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` after the three facts and the invariant (output in `.runs/task-cycles/porzadki-z-uwag-pr/reports/return-foundation-check.log`) | 0 | `0 errors` |
| same, after the narrowing of one sentence | 0 | `0 errors` |
| `python -I <scratchpad>/retstep/check_passages.py` (every quoted passage found in the fetched file after dropping markup and collapsing whitespace) | 0 | 12 of 12 passages `OK` |
| `curl -sSf` of the three addresses at the commits | 0 | all open; `volume_prune.md` at the tag and at the commit identical (`cmp`) |
| `gh api repos/docker/cli/commits/v27.3.1 --jq .sha`, `gh api repos/docker/compose/commits/v2.29.7 --jq .sha` | 0 | the two SHAs above |

Not run, by the handoff: `npm test` and every other test (the product's gate was run on `60d4047`). The change after it touches only `foundations/environment_facts.md` and `foundations/invariants.md`; the `agent_workflow` tests that read `foundations/` have not been rerun by this step.

## Own-work check

The requirement I most likely did not meet: a fact sentence that says more than its source (`environment-facts` template, "The sentence"). Check: each sentence set against its passages. It failed once: `docker-system-prune-volumes` first said that `--all` "widens the images it removes, not the volumes", and the source says only that `--all` is "Remove all unused images not just dangling ones". Both runs: the check by reading (no command) found it; after the fix of `dada2f2` the sentence reads "its `--all` option removes all unused images, not just dangling ones" and `foundation_check.py` exit 0. The passages check (12 of 12) ran on the final text. A second candidate, that a fact without a dependant is written, is covered by the *Rests on* above and `foundation_check.py` (0 errors).

## Choices (way rejected, cost if wrong)

1. **Write the Docker facts and name them in `account-save-durable-storage`'s *Rests on*.** Rejected: (a) write no fact, because no decision cites them and the template says a fact stands only while something names it (leaves WAY-11's "writes the sources the change rests on" unmet and the skill text resting on a source the foundation does not hold); (b) name them in D-17's *Based on* (they are not a reason for D-17, only a condition for a commit). Cost if wrong: the human or a reviewer strikes the three facts and the added *Rests on* names; the skill text keeps its own quotation of the documentation, so nothing else changes.
2. **Three facts, not one.** Rejected: one entry for all three commands (two documents, three commands, three reasons to change; WAY-76). Cost if wrong: two entries to merge.
3. **Sentence of `docker-volume-prune-scope` carries the page's inconsistency.** Rejected: a sentence that repeats only "by default only anonymous", which would make a reviewer take plain `docker volume prune` for safe, against the skill text. Cost if wrong: one clause to strike.
4. **Source addresses at the commits, not the tags.** A tag can be moved; the existing docker fact cites a commit. Cost if wrong: none; the tag is named here and in the skill text.
5. **No Docker version in any sentence.** See Candidate 1. Cost if wrong: a reader of the sentence alone does not see the edition; the *Source* address shows it.
6. **D-253 left as it is.** See Candidate 2. Cost if wrong: the clause stays loose about the launcher, as it was before the task.
7. **Two commits, not an amended one.** Cost: one extra commit in the history.

## Reaches beyond the handoff

- `.the-way/elements/invariants/{template.md,skill/*.md}` and `.the-way/elements/common/way_of_working.md` steps 2-4: the skill of the invariant whose *Rests on* I changed.
- `.the-way/foundations/decisions.md` WAY-11, WAY-36, WAY-73, WAY-95 (the-way's own decisions, for what the return step writes and when a fact stands).
- `foundations/decisions.md` D-231, D-233, D-255, D-258 (named by the handoff), D-17 (its *Based on*), and `foundations/invariants.md` `account-save-backup*`, `local-start-access`, `account-save-durable-storage`.
- `src/server/account-database-check.ts`, `src/server/measure-passwords.ts`, `deploy/loop2-backup` (grep for traps), `compose.yaml:60-70`, `.claude/skills/loop2-deploy/references/backup_and_restore.md:20-60`, for the comparisons above.
- `the author's private rules note on scripts` and `git.md`, the user's rules for scripts and commits.

## Questions (for the orchestrator, none blocks)

1. Does the orchestrator accept naming the three Docker facts in the *Rests on* of `account-save-durable-storage` (choice 1)? Recommendation: yes. The alternative the template leaves is no fact at all, and the skill text's authority would then rest on a source the foundation does not hold.
2. Should D-253's clause on `measure-passwords` be made exact (container program versus launcher)? Recommendation: no, leave it; it is not wrong enough to change an approved decision inside this task.

## Observations (not corrected; not entries)

1. `.claude/skills/loop2-deploy/references/backup_and_restore.md` (exit table, stage 6): "`docker` 1: ... or a failed backup" does not say that exit 1 now also ends a backup that went out whole when only the removal of its temporary directory failed (`account-backup.ts:119-127`); the night is reported failed by the script (D-233, any non-zero end) and the sentence `The backup went out whole to standard output; only the removal of its temporary copy failed ...` stands in Docker's output line before it in the log. The skill is no foundation entry, so this step does not edit it; it is a candidate for a later skill edit.
2. The comment at `scripts/local-start.mjs:28-30` cites D-253 for a default print after the stop has told every start; D-253 allows the default print for a script that touches no account data, and `local-start.mjs` is one.
3. `tests/deploy/test_account_storage.py:21` says `account-save-durable-storage` "was cleared by the human's" check; adding facts to its *Rests on* does not change that.

## Searches not found or unclear

- Any foundation entry that lists or defines the names or places of failure lines (`backup-cleanup`, `account-backup.run`, `local-start.proxy`, `app.sessions`): not found, by grep over `foundations/`, `guidelines/`, the skills and `src/`; D-252 sets only the fields.
- Whether `docker-system-prune-volumes`, `docker-volume-prune-scope` and `docker-compose-down-volumes` hold on the Docker Engine of the test server: unclear; its version is recorded nowhere in the repository, and this step ran no command on the server.
- The meaning of "last-resort handling" in D-253 against "handler": unclear in the text; settled above from the history of the entry (`b891590`).
- Which invariant test hunks the diff touched (for the request's list of altered invariant tests): not determined; only the citing files are listed.
