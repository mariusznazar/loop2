FAIL a8361ff0d609724f51f856965faa57cb1164a76e

# Review of the whole change — dwie-komendy-wlasciciela

Range: `23b521a282f6a7f307bebc800b0fd985b2dbb6f8..a8361ff0d609724f51f856965faa57cb1164a76e` (commits `fc94ef7e`, `a8361ff0`); `git rev-parse HEAD` = `a8361ff0d609724f51f856965faa57cb1164a76e`; `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, as pinned. Route: one author, no plan, no slice reviews, so no slice to name for a finding.

Summary: the code of both commands, the deploy skill, the comment in `database.ts`, the database-access guideline and the tests do what *To do* 1–5 ask, and the crafted inputs at the trust boundary behave as the task says (see Checks). Two blocking findings: the new binding sentences of D-112 and D-430 name the commands by the word "owner", which the product's glossary defines as an account role and explicitly not as the person who runs commands on the server (I-1); and the new sentence in the testing guideline moves the pointer "tamże" of the `account-database-schema` test to the wrong file (I-2).

## Critical

none

## Important

### I-1 — D-112 and D-430 bind "commands that the owner runs on the server", a word the glossary gives to an account role and denies to the person who runs the commands

- **Place:** `foundations/decisions.md:2815` (D-112, third paragraph: "Beyond the rules above, no command that the owner runs on the server and that changes or copies the account database sets up a new database, …"), the D-112 *Verification* complies/violates items ("a command added later that the owner runs on the server …"), the D-112 *Rationale* ("No command that the owner runs on the server …"), `foundations/decisions.md:2949` (D-430 question: "What do the commands that the owner runs on the server say …"), D-430 first sentence ("When a command that the owner runs on the server and that changes or copies the account database …") and its *Rationale*. The same wording, of lower weight, in the comment `src/server/database.ts:213` ("Every command the owner runs on the server …").
- **What is wrong:** `foundations/glossary.md:284-288` defines the term: "An owner is an account whose role is `owner`, the role that lets its holder use the owner panel … — **Not:** the person who reaches the server and runs its commands — "operator"". The foundation keeps that split everywhere else: D-112's own first paragraph says "the operator's blocking command of D-137, its command for the previous-save privilege of D-400, its command for the role …"; D-137, D-400 and D-354 say the commands answer "the operator"; the part map's entry `account-server` says the part "gives the operator a command that blocks …". The task's Polish "właściciel" (the owner of the server, Mariusz) is, in the product's English vocabulary, "the operator".
- **Why it matters:** read with the glossary, the binding sentence of both decisions says the opposite of the settlement. The four commands are not run by an owner (an account); they are run by the operator through SSH (D-12, D-137, D-400, D-410), so the literal rule binds none of them. And the things an owner *does* run on the server and that change the account database are the four routes of the owner panel (`POST /api/owner/block` and the rest, D-137, D-400), so a reader would take D-430 to require those routes to "end with the exit code 1 and one sentence", and D-112 to require them to "open only a file in which the server has set up its tables". This is a foundation entry the change writes that restates the settled rule differently (rows 1 and 2 of *Settlements to record*), which section 3 of the review method grades Important (WAY-263); it is not a missing glossary entry, since the entry exists and excludes this sense. The settlement's "także polecenie dodane później" makes the wording matter more, not less: the author of a fifth command is the reader who must be able to tell from the sentence whether it binds them.
- **Evidence:** the quoted lines; `foundations/glossary.md:288`; `foundations/part_map.md` entry `account-server`; D-112 paragraph 1 at `foundations/decisions.md:2811`. Search of the base log: "the operator" occurs 72 times in `foundations/decisions.md` at `23b521a2`, and no decision there uses "the owner runs" for the person at the server.
- **Fix in scope:** say "the operator" (for example "no command that the operator runs on the server and that changes or copies the account database …", D-430's question "What do the operator's commands on the server say …"), in every place listed, the five test citation lines and the two new ones changing with the sentence they quote (the foundation check holds the citation to the start of the binding sentence). The Polish guideline `guidelines/coding-database-access.md:28-29` ("które właściciel uruchamia na serwerze") follows the task's own Polish word; `guidelines/coding.md:134-135` says "operatorowi" for the same person, so "operator" there would match too, but that line is Minor (M-2).

### I-2 — The testing guideline's row `src/server/` now says the `account-database-schema` test lies in `tests/account-owner.test.mjs`

- **Place:** `guidelines/testing.md:183`, the sentence added for *To do* 6: "… a dla polecenia roli właściciela (D-112, D-410; bez niezmiennika) przypadek „the role command refuses …” w `tests/account-owner.test.mjs`; baza nowszego schematu zostaje takim plikiem, jakim była, razem z trybem dziennika: przypadek „opening a database of an unknown newer schema refuses it and leaves the file as it was, its journal mode included” **tamże**, oznaczony `account-database-schema`."
- **What is wrong:** before the change "tamże" followed `tests/account-storage.test.mjs`; the inserted clause ends with `tests/account-owner.test.mjs`, so "tamże" now points there. The case is in `tests/account-storage.test.mjs:241`; `tests/account-owner.test.mjs` holds no such case.
- **Why it matters:** this table is what a reviewer uses to confirm that each trust boundary has a standing, invariant-marked refusal test ("Każda granica zaufania z mapy części ma regułę odmowy i przynajmniej jeden stały test …"). The only invariant-marked case of the row's database refusal is now sent to a file that does not hold it, so a later reviewer of a schema change looks in vain or concludes the test is gone. The sentence was written by this change for an item of the task, and the fix is one file name.
- **Evidence:** `grep "opening a database of an unknown newer schema refuses it" tests/` → only `tests/account-storage.test.mjs:241`.
- **Fix in scope:** move the role command's clause before the previous-save clause or write the file name instead of "tamże".

## Minor

- **M-1 (outside the task)** — `src/server/database.ts:255-262`, `isDatabaseBusy` compares `errcode === 5` only. `node:sqlite` on Node v24.17.0 puts SQLite's *extended* result code in `errcode` (a scratch run of a UNIQUE violation gave `2067`, not `19`), so a busy error reported as an extended code (`SQLITE_BUSY_RECOVERY` 261, `SQLITE_BUSY_SNAPSHOT` 517) would read as "not busy" and get no advice to run again, and `enableWriteAheadLog` would not retry it. In this code the transactions are `BEGIN IMMEDIATE` (no snapshot upgrade) and recovery collisions need a second process recovering a WAL at the same instant, so the reach is small; the function is unchanged and shared with the blocking and backup commands, where D-430 already rested on it. The author named it as the weakest point; I confirmed the premise (extended codes do reach `errcode`) and did not find a path in these commands that produces one. Suggested follow-up: `(errcode & 0xff) === 5`.
- **M-2 (within the task)** — `guidelines/coding-database-access.md:28-29` ("Każde polecenie, które właściciel uruchamia na serwerze …") and `src/server/database.ts:213` ("Every command the owner runs on the server …"): the same word as I-1, in a Polish guideline (where it is the task's own word) and in a code comment. A reader of the comment would read it as I-1 describes; align with whatever I-1's fix says.
- **M-3 (within the task)** — `tests/account-owner.test.mjs:640` (renamed "a damaged database file fails with the JSON line of the failure first, and changes nothing") and `tests/account-storage.test.mjs:3729` assert `/Nothing changed\./`, which matches both the sentence with the advice and the one without; the absence of the advice for a damaged file is held only by the new advice cases. Not a gap in protection (my mutation run shows the advice cases catch an always-advice sentence), only a weaker local assertion than the case's name suggests.

## Checks against the task

- *To do* 1 — met: both commands open with `{ existingOnly: true }`, refuse `isNotAccountDatabase` with exit 3 and the blocking command's sentence word for word, write nothing (scratch run and tests).
- *To do* 2 — met: advice only for `isDatabaseBusy`; newer schema, negative version and damaged file give exit 1 with "The account database could not be opened or changed. Nothing changed." (scratch run). Caveat M-1.
- *To do* 3 — met: both copies identical (`git diff --no-index` exit 0), codes 1 and 3 of both sections worded as the blocking section, and the sentence "the commands `account-previous-save` and `account-role` do not refuse such a file …" removed.
- *To do* 4 — met in content; wording M-2.
- *To do* 5 — met: both added sentences, both exclusions named, `src/server/account-database-check.ts` named.
- *To do* 6 — written, but I-2.
- *Settlements to record* row 1 (D-112) and row 2 (D-430): content of the settlement present — every such command, the four named as today's, a later one bound, the two exclusions named, the old "still set up" sentences and their *Rationale* twins gone, D-430's question changed, *Relations* gain D-400 and D-410, *Rejected* gains the task's *Not chosen*. Wording: I-1.
- Source fidelity of the rewritten decisions against the base (`git show 23b521a2:foundations/decisions.md`, D-112 and D-430 read whole before and after, with *Rationale* and *Rejected*): nothing the old text held is lost except what the settlements change; paragraphs 1 and 2 of D-112 unchanged; *Rejected* of both only extended; D-112 *Verification* tests clause extended to the four commands, D-430 *Verification* likewise. D-400 and D-410 sentences quoted in *Decisions in play* stay true (refusals change nothing).
- *Out of scope* (blocking and backup commands): not touched except the citation lines, which had to follow the rewritten sentences.
- Reserved choice: none taken.
- Structure: `python -B .the-way/task-cycle/change_file_sizes.py 23b521a2 a8361ff0` — the two commands grew to 107 lines each (+15, +12), `database.ts` +1 (comment), tests +152 and +99 (test files are outside D-425's file limit). The size invariant test passes on both base and head; nothing pushed over a threshold. The two commands now hold a third copy of `existingFile`, `noFileSentence` and `noTablesSentence` beside `account-block.ts`; the author stated the choice; below any threshold, so at most Minor and I do not raise it as a finding.

## Declined to judge

- D-112's *Relations* lists D-400 but not D-137, D-231 or D-410, which its first paragraph names already at the base — predates the change, outside the task.
- The invariant `account-database-schema` says "Opening an account database initializes the current schema version", which an `existingOnly` opening of an empty file does not do — true at the base for the blocking and backup commands as well; outside the task.
- A foreign SQLite file whose `user_version` happens to be 1–6 would be migrated as an account database by every opening — predates the change, the task names only files with no schema version.

## Checks run

| Command / method | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | head `a8361ff0…`; pin matches `bfb2e109…` |
| `npm run build` (reviewed worktree; writes only the ignored `dist/`) | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `node scripts/test-node-file.mjs tests/account-owner.test.mjs` | 0 | 15 pass, 0 fail |
| `node scripts/test-node-file.mjs tests/account-storage.test.mjs` | 0 | 94 pass, 0 fail |
| `node scripts/test-node-file.mjs tests/account-backup.test.mjs` | 0 | 12 pass, 0 fail |
| `git diff --no-index .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md` | 0 | identical |
| `python -B .the-way/task-cycle/change_file_sizes.py 23b521a2 a8361ff0` | 0 | table kept in `review-whole-sizes.md` |
| `python -B -m unittest tests/quality/test_function_and_file_size.py` in a worktree of the base | 0 | 2 tests OK |
| same in a worktree of the head | 0 | 2 tests OK |
| `python -B .the-way/elements/common/decision_index.py --output … --section "Account server: access, security and blocked accounts" --section "Database backup and restore" --part account-server --part agent-workflow --part product-foundation --decision D-112 D-430 D-400 D-410 D-137 D-231 D-354 D-360 D-252 D-253 D-425 D-114` | 0 | index kept in `review-whole-index.md` |
| Scratch run at the trust boundary: `node scratch.mjs . <dir>` on the built head commands, both commands (`account-role owner`, `account-previous-save grant`) on: empty file, text file, SQLite with a table and no version (rollback and WAL journal), server database damaged past page 1, first 50 bytes of a database, newer schema (7), negative version (−1), directory, missing file, unset, empty and blank path, `:memory:`, a valid server database with a password hash and a session holding marker strings, and a database held by `BEGIN IMMEDIATE` of another connection | 0 | Every case gave the task's exit code and sentence: exit 3 with the no-tables sentence for empty, text, no-version (both journals) and truncated header; exit 3 with the missing-file sentence for directory, missing, unset, empty, blank and `:memory:`; exit 1 with the JSON line then the sentence without advice for damaged (errcode 11), newer and negative version; exit 1 with advice for busy (errcode 5); exit 0 on the valid database. In every refused case the file's bytes and the directory listing were unchanged (no `-wal`, `-shm` or new file); no output held the hash marker, the session marker, the file path, "malformed" or "not a database". Script and full result kept as `review-whole-scratch.mjs` and `review-whole-scratch-result.md`. |
| `node -e` probe of `node:sqlite` error codes (Node v24.17.0) | 0 | UNIQUE violation reports `errcode` 2067 (extended), basis of M-1 |
| Mutation, in a worktree of the head: `account-role.ts` opened without `existingOnly`, `account-previous-save.ts` advising on every failure; `npm run build`; the two test files | 1, 1 | role: "the role command refuses a file in which the server set up no tables …" fails; previous-save: "a database failure of the previous-save command …" and "the previous-save command advises to run it again only when …" fail. The new tests catch both breaks. |
| `npm test` (full gate) | not run | the handoff reserves it for the orchestrator |
| `python -B .the-way/instruction-files/check_instructions.py` | not run | not named by the handoff; the full gate runs it |

## Reaches beyond the handoff

- `foundations/glossary.md` entries `owner` and `previous-save privilege` (lines 272-288) and a search of the glossary for "operator" — for I-1, step 4 of "Reading the foundation".
- D-353 (`foundations/decisions.md:2074`), read whole — its question ("Which refusals … leave no failure line?") pointed to the exit-3 refusal writing no failure line; it does not bear.
- `git show 23b521a2:foundations/decisions.md`, searched for "the operator" and for "owner" outside the role — evidence for I-1.
- `src/server/account-block.ts` whole, `src/server/database.ts:195-392` — the pattern the task names.
- `node:sqlite` error-code probe — for the author's weakest point (M-1).

## Working copies

All under `.runs\review-whole\`: the decision index and section list, a saved test diff, the base copy of the decision log, the scratch script and its case directories (`cases/`), logs of the build and test runs, and two worktrees `wt-base` (at `23b521a2`) and `wt-head` (at `a8361ff0`, where the mutation was made), each with a directory junction `node_modules` to the reviewed worktree's `node_modules`. The junctions were removed first with `rmdir` (the target `node_modules` checked present afterwards), the worktrees with `git worktree remove --force` and `git worktree prune`, then the directory with `rm -rf`; nothing remains. Kept beside this report: `review-whole-index.md`, `review-whole-sizes.md`, `review-whole-scratch.mjs`, `review-whole-scratch-result.md`. The reviewed worktree's `dist/` was rebuilt by `npm run build` at the head, the product's own ignored build output.

## Unread material

Decisions of the index read whole: 8 — D-112 and D-430 (before and after, with *Rationale* and *Rejected*), D-410, D-400, D-137, D-231, D-354 (binding text in the index; D-354 is one sentence), D-353. The other decisions of the index were read through the index's binding sentences (D-252, D-253, D-360, D-114, D-425, D-202 and the rest listed in full) or run through by heading; none of those that bear on the change stayed unread beyond their binding sentences, except: D-360 and D-231 were not opened beyond their binding sentences (their *Rationale* and *Rejected* unread); D-410 and D-400 *Rationale*/*Rejected* read only where shown in the diff context (D-410) or not at all (D-400).

Invariants: `account-database-schema`, `account-save-sqlite-access`, `account-save-sqlite-store`, `function-and-file-size` read whole; the other invariants whose *Part* names `account-server`, `agent-workflow` or `every` (listed by name, about 60) not opened — none is cited by a test the change alters.

Part map entries `account-server`, `agent-workflow`, `product-foundation` read whole. Glossary: entries `owner` and `previous-save privilege` read; the rest of the product glossary and the-way's glossary at the pin not read.

Guideline files read whole: `guidelines/coding.md`, `guidelines/coding-database-access.md`, `guidelines/testing.md`. Not read: `guidelines/coding-http-application.md`, `coding-session-store.md`, `coding-account-policy.md`, `coding-password-hashing.md`, `coding-mail-sending.md` — their index rows do not match the work (no HTTP, session store, policy, hashing or mail file changed).

## Searches not found or unclear

- No decision of the base log uses "the owner" for the person who runs commands on the server; the section sentence of "The server: hosting, deployment, logs and failure reports" says logs "reach the owner and the agent", a loose use outside any entry.
- No code path in the two commands found that yields an extended busy code; whether one can occur in production is unverified (M-1).
