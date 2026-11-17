Status: done

# Return step

Commit `5a699506` on `task/wpisy-serwera-kopii-i-testow`, from head `88060bcf`; author address `mariusznn@gmail.com`. It changes `foundations/decisions.md` (one phrase of D-360) and `foundations/environment_facts.md` (the fact `node-sqlite-database`); nothing else, nothing under `.runs/`.

## Foundation compared with code

Range compared: `f0e466ca..88060bcf` (the commits that hold foundation: `a2c3729b`, `042fbe3e`, `88060bcf`).

| Entry or file | Compared with | Result |
|---|---|---|
| D-15 (rollback across a schema change) | `src/server/database.ts:312-332` (a version above the current one is refused, nothing written), `deploy/loop2-deploy` exit 8 (health) | matches |
| D-109 (the browser report route) | `src/server/account-routes.ts:392-405, 416-449`: no session needed, `mutationGuards` and the transport prelude, `admitBrowserReport()` limit, `accountId` only from the session, body names no account | matches |
| D-112 (the address command, a paragraph of its own) | the skill's command opens `DatabaseSync(..., { readOnly: true })`, which the node:sqlite documentation names; the code's own connection is untouched | matches; the source of "read-only" was missing, see Environment facts |
| D-235 and `guidelines/testing.md:60, 368` | `deploy/loop2-watch` (calls `pusher`, never Strych), `tests/deploy/watch_script_support.py:1-40` (its stand-ins `docker`, `pusher`, `flock`, `date`) | matches |
| D-360 and the skill's step 8, step 7 and "Restoring" | the log lines in `src/server/account-routes.ts:746` (`password-set`), `account-block.ts:95,97`, `account-role.ts:89,91`, `account-previous-save.ts:92,94`, `owner-routes.ts:75-78,146-167` (panel block, unblock, privilege events), `deploy/loop2-deploy:79-84, 357, 360, 424` (the deploy log's lines, the dump and its warning) | matches. One phrase corrected (below) |
| D-355 (names `account-role`) | `SKILL.md` "The owner role" (the wrapper appends the role command's JSON lines), the tests quoting D-355 (they end at "…four rotated generations") | matches |
| Invariants `cross-part-imports`, `tracked-file-private-names`, `account-email-nodemailer-starttls` | `tests/invariants/test_cross_part_imports.py` (unchanged sentence), the skill and D-13 ("the operator's private note"), `tests/account-mail.test.mjs:305` (STARTTLS before login and message) and `src/server/account-mail.ts:161` (`requireTLS`); D-154 and `package.json:23` (`nodemailer` 10.2.1) hold the version | match |
| D-49 and the 15 decisions of the testing family | the part `test-helpers` in `foundations/part_map.md` (its helper `tests/invariants/loop2_invariant_support.py`, which D-49's *Verification* names), the *Applies to* of `guidelines/testing.md` | match; D-80 is a withdrawn number, not an entry |
| Part map: `product-foundation`, `agent-workflow`, `deployment` | `foundation_check.py` (every tracked file claimed); the `deployment` text says "telling the owner" where the glossary's `owner` means an account with the owner role | no change by this change. The word in that part's description is older than this change and outside it; I left it |
| D-137, D-234, D-228, D-252, D-400, D-410 (read for the comparison) | D-137 and D-234 say nothing about what a restore brings back; D-400 and D-410 give the commands the step repeats; D-252 says a change of the role and each operation of the owner panel leave one line with the account's number | match |

Corrected in this commit:
1. D-360's *Rationale* said "an account whose rights the owner took": in the glossary `owner` is an account with the owner role, not the person who runs the commands. It now says "an account whose role or privilege was taken since has it again after the restore ... and one that was given it since is without it".

## Environment facts

One fact changed in place: `node-sqlite-database`. The skill's address command and D-112's new sentence ("opens ... only to read") rest on the option `readOnly` of `DatabaseSync`, which the fact did not hold. Its sentence now names "an option that opens the database in read-only mode and fails when the database does not exist", and its *Source* gained, from the same page and edition (the raw `doc/api/sqlite.md` at the commit already cited): `§ new DatabaseSync, readOnly — "If true, the database is opened in read-only mode." · "If the database does not exist, opening it will fail."`. I fetched the page (`curl`), checked that each passage of the entry, old and new, stands in it with markup dropped, and changed the date read to 2026-11-17. D-112, which already names the fact in *Based on*, needs no other change; the fact's other dependents (D-355 and the decisions listed by `grep 'Based on:.*node-sqlite-database'`) lose nothing by an added capability.

Withdrawn identifiers: `git-path-patterns` was withdrawn in the first commit (row 3); nothing else is withdrawn or added.

## Decisions, invariants, glossary terms, part map, projected entries

- Decisions written or changed by the change: D-15, D-360, D-355, D-112, D-235, D-109, D-49 and the 15 testing decisions (scope only). No new decision is written in this step.
- Invariants: `cross-part-imports`, `tracked-file-private-names` and `account-email-nodemailer-starttls` as in the earlier rounds; none written or withdrawn in this step.
- Glossary terms: none written. The words the change introduces ("block", "unblock", "role", "privilege", "restore") are used in the meanings of the glossary entries `blocked account`, `owner` and `previous-save privilege`; the one use against an entry (D-360, above) is corrected.
- Part map: no change.
- Projected entries: none (no definition projected anything for this task).
- Pairs of examples: D-15, D-109, D-112 and D-360 carry a pair for the part no invariant and no test holds. The new passages of D-109 (the report route) and D-112 (the address command) are held by no test through a `decision:` line: the tests of the route cite the invariant `browser-failure-report` (derived from D-356), not D-109, and the address command has no test. I therefore removed nothing from any pair and added no `tests:` clause.

## The choices of the cycle, and the place each went to

(The rule: an instruction for how a human or an agent works goes to the skill, question 1 of the decisions template's "Where it goes"; a sentence a decision already answers goes into that decision, question 5.)

| Choice | What I did and why |
|---|---|
| (a) The step stands inside step 8 after step 6 and does not search the running container's log, because step 6 recreates it | Skill text only (both copies, step 8): an instruction for how the human restores, so question 1 names the skill; no entry. D-360's binding sentences already say "after a restore over the server's database ... find in the game's log" and D-355 holds where the log lies. A row of the table only. |
| (b) The search is bounded to lines after the time of the backup (the `start` line of the run that made the file) and before the deployment of step 6, and takes the latest line by time for each pair | Skill text only, for the same reason. D-360's binding sentences carry the part a later change must keep: "since the time of the backup" and "the latest change of its block and unblock lines, of its role lines and of its privilege lines". The exact bounds, the way to read the backup's time and the order of the output are the skill's. A row of the table only. |
| (c) Withdrawal of the fact `git-path-patterns`, and D-80 read as a retired number | The withdrawal is written where the environment-facts template gives it (the withdrawn list of `foundations/environment_facts.md`, with the reason "no decision is based on it and no invariant rests on it"); no other entry. D-80 is already in the log's list of withdrawn numbers with its reason, and the task's wrong count is a fact about the task document; no entry. |
| (d) D-355 names `account-role` besides `account-block` and `account-previous-save` | Written: question 5 (the log already answers it), as a change of D-355's own sentences in the six places where it named the two commands. |
| (e) The marker of step 7 written with day and hour | Skill text only (step 8 of "Installing and reinstalling", the trial paragraph and step 7 of the restore): an instruction for the operator, so no entry. A row of the table only. |

No choice binds after the merge in a way that only an entry can hold; the task excludes no entry, and none was needed.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` ("0 errors"; it still lists `account-email-nodemailer-starttls`, which the request names) | 0 |
| `python -B .the-way/instruction-files/check_instructions.py` ("0 error, 144 warn, 7 info") | 0 |
| `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill` | 0 |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | 0 (identical) |

`npm test` not run. No test quotes the phrase of D-360 I changed or the fact (`grep 'decision: D-360'` finds none; a fact is no test's quotation).

## Working copies

`.runs/author/dl/sqlite.md`, the downloaded documentation page, and nothing else; removed with `find .runs/author -mindepth 1 -delete`, the directory is empty.

## Unread material

- D-228: its heading and the lines the search for "restor" showed, not the entry whole (the comparison needed only that it speaks of restoring the latest retained backup).
- D-252: its binding sentences and the passage about role and owner-panel lines; not the *Rationale* and *Rejected*.
- D-137: whole (the part after the binding sentences); D-234, D-400 and D-410: whole.
- The reviews' reports (`review-whole-report.md`, `review-correction-1-report.md`): not read; the handoff says their Minor findings are no foundation entries.
- The skill files `setup_and_secrets.md` and `troubleshooting.md`: not read; a search found no text there about what a restore repeats.

## Searches not found or unclear

- No `decision: D-360` line and no test of the restore step exists; none was expected (the step is prose for a human).
- The `deployment` part's description says the watcher and the check "tell the owner"; in the glossary `owner` is an account with the owner role. Older than this change; left.
- The record's *Return step* is not a separate file I could name; I followed the handoff's list for what the report holds.
