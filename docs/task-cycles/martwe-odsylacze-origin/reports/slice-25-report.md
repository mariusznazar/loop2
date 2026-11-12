# Slice 25 report — account and server tests point to no note

**Status:** done with concerns (one remark below, about the wording of a comment; nothing blocks)

**Base:** `838593b4592b63ca37d8ebed3f1fd9dd54dfd417` (HEAD at the start, worktree clean).
**Variant:** a slice. **Commit:** see the last section.

## Files changed (comments, docstrings only; no code, no test title)

| File | + / - |
|---|---|
| tests/account-api.test.mjs | 4 / 3 |
| tests/account-backup.test.mjs | 4 / 4 |
| tests/account-mail.test.mjs | 2 / 2 |
| tests/account-storage.test.mjs | 10 / 10 |
| tests/http.test.mjs | 21 / 24 |
| tests/startup.test.mjs | 5 / 5 |
| tests/deploy/deploy_script_support.py | 4 / 5 |

`foundations/decisions.md` is unchanged: no pointer carried a requirement that only a note or a spec held,
so no decision was written and `the-way-record-decision` was not run. Every changed line was checked as a
comment line by `git diff -U0` filtered for non-comment lines (only the docstring line of
`deployable_commit` shows, as a docstring).

## Per changed line: old pointer, outcome, entry

Outcomes: entry named / removed (the comment or the code already says it) / entry written (none).

| File:line (now) | Old pointer | Outcome | Entry |
|---|---|---|---|
| account-api:416 | "(task, To do 2, 4 and 10; src/server/account-routes.ts)" and the claim that the texts are the server's | rewritten as "sample refusals of the server ...; the client must hand on whatever code and message it is sent, so the wording is not what is tested" | none (see concern 1) |
| account-api:438 | "Task blokada-konta, To do 4" | entry named | D-139 |
| account-api:583 | "spec decisions 1 and 3; task To do 2, 4 and 7" | entry named | D-204, D-209, D-210 |
| account-backup:399 | "To do 6, cause 4" | entry named (the Faults text stays) | D-233 (already there), D-252 |
| account-backup:448 | "To do 5, loop2#046-6, Settlement 3 (D-354), D-233" | removed all but the decisions | D-354, D-233 |
| account-backup:494 | "To do 8, cause 7, D-253" | removed the numbered items | D-253 |
| account-mail:419 | "To do 5, cause 3" | removed (the Fault text and D-252 in the comment stay) | D-252 (already there) |
| account-mail:625 | "(spec Decision 11)" | removed (the comment says why the code is checked) | none |
| account-storage:185 | "task zapis-stanu-na-serwerze (spec, decision 4; D-112)" | entry named: version 4 is the current version | D-112 ("current version 4") |
| account-storage:1893, :1959 | "(loop2#043-28)" | removed (the comment gives the reason itself) | none |
| account-storage:2308 | "kept from the task's question 11" | removed | D-252 (already there) |
| account-storage:2339 | "To do 6, cause 4" | entry named | D-252, D-354 |
| account-storage:2367 | "To do 8, cause 7, D-253" | removed the numbered items | D-253 |
| account-storage:2386 | "(cause 1)" | entry named | D-252 |
| http:696 | "the task's To do 2, 4 and 10", "the orchestrator's answer 5 (reports/02-designer-answers.md)" | entry named; the answer (rolling 15-minute windows, lock from the fifth failure, in-flight reservation) is read from the cycle record in git history and is in D-102 | D-100, D-102 |
| http:1504 | "task reset-hasla" | removed | D-102 (already there) |
| http:1730 | "task blokada-konta, To do 3 and 4", "task, question 4; Mariusz, 2026-10-28" | entry named (the message is D-139's) | D-137, D-139 |
| http:2092 | "task potwierdzenie-adresu", "spec Decision 4 and D-156", "spec Decision 2" | entry named (routes, bodies, refusal and link form are in D-156) | D-156, D-155, D-105 |
| http:2685 | "task reset-hasla, spec decisions 1 to 3" | entry named | D-222 |
| http:2729 | "spec decision 2" | entry named | D-222 |
| http:3198 | "task reset-hasla, spec decisions 1, 4, 5, 8 and 9" | entry named | D-226 |
| http:3799 | "task zapis-stanu-na-serwerze, spec decision 1" | entry named | D-204, D-209, D-210 |
| http:4030 | "Spec decision 1" | removed (D-209, D-210 stay) | D-209, D-210 |
| http:4103 | "Spec decision 1 (exact fields and types); trust boundary of the slice" | entry named (expected fields, explicit type checks, no coercion); "of the slice" became "of the save route" | D-104 |
| http:4179 | "Spec decision 3: the body limit alone does not bound the stored text" | entry named (server stores at most 64 KiB of each saved game state) | D-104 |
| http:4272 | "kept from the task's question 11 and its acceptance criterion" | removed | D-252 (already there) |
| http:4412 | "To do 3, cause 1" | entry named | D-252 |
| http:4544 | "To do 5, cause 3" | entry named | D-252 |
| startup:121 | "(loop2#050-21)" | removed (the comment gives the reason itself) | none |
| startup:203 | "To do 3, D-252" | removed the numbered item | D-252 |
| startup:323 | "D-111, spec Decision 7" | removed the spec | D-111 |
| startup:568 | "To do 4, cause 2" | entry named | D-111, D-252 |
| startup:617 | "To do 8, cause 7, D-253" | removed the numbered items | D-253 |
| deploy_script_support.py:44 | "written in a later slice of the task" | removed; the watcher (`deploy/loop2-watch`, `deploy/loop2-watch.cron`) exists and the sentence was stale | none |
| deploy_script_support.py:381 | "as every commit of this task on does" | removed | none |

Pointers outside the three searches that I found with wider searches (`cause N`, `loop2#...`, `orchestrator`,
`reports/`, `answer N`, `Settlement`, "slice of the plan", "trust boundary of the slice"): all handled above.

## Searches (Checks)

- S1 (exit 1, no line printed): passed.
- S2 (exit 1 after the edits). Before the edits it printed 34 lines, all pointers and all changed (table). After:
  no line, so none to list as "points to nothing outside the repository".
- S3 (exit 1 after the edits). Before: 15 hits, all pointers to a spec or to "the task"/"the slice", all changed.
  No hit used the word for something else.
- Wider search `\btasks?\b|\bspecs?\b|cause [0-9]|[Ss]ettlement|loop2#|orchestrator|reports/|\bslice\b|Mariusz|\bnotes?\b`
  (minus "precondition", `.slice(` and a data field `note`): two lines remain, both fine:
  `tests/http.test.mjs:1621` "settlement count" means the count of settled attempts of the policy, and
  `tests/account-mail.test.mjs:19,21` hold the test address `loop2.mariusznazar.com` of the fixture links, which is
  test data of the mail tests and not a pointer (left unchanged; the handoff says no other host of a note enters a
  file, and this one came from the code, not from a note).

## Checks (command, exit code)

| Check | Result |
|---|---|
| `npm test -- tests/account-api.test.mjs` | exit 0, 25 pass |
| `npm test -- tests/account-backup.test.mjs` | exit 0, 10 pass |
| `npm test -- tests/account-mail.test.mjs` | exit 0, 10 pass |
| `npm test -- tests/account-storage.test.mjs` | exit 0, 64 pass |
| `npm test -- tests/http.test.mjs` | exit 0, 89 pass |
| `npm test -- tests/startup.test.mjs` | exit 0, 18 pass |
| `python -B -m py_compile tests/deploy/deploy_script_support.py` | exit 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 <the six .mjs files>` | exit 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig tests/http.test.mjs tests/startup.test.mjs` | exit 0 |
| (extra) the same prettier check with the repository's config on all six .mjs files | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| S1, S2, S3 | exit 1 each (no line) |

Nothing failed and nothing could not run; the Python tests in `tests/deploy/` were not run (the slice names only
`py_compile` for the one Python file, and those tests start containers). `py_compile` left `tests/deploy/__pycache__/`;
I deleted it before the commit.

## Own-work check

- Requirement most likely missed: a pointer that none of the three searches matches (a pointer worded in a way the
  regexes do not cover). Check: a wider search (above) over the seven files for `cause N`, `loop2#`, `orchestrator`,
  `reports/`, `answer N`, `Settlement`, "slice", "note", `Mariusz`, `.md`, "concept", "criterion", "cycle", "settled",
  "agreed". It found five pointers the three searches did not (`cause N` in 13 places, `loop2#...` in 4, the
  "orchestrator's answer 5 (reports/02-designer-answers.md)" line, "(Settlement 3 ...)" and "of the slice"); all are
  handled. After the edits it shows nothing but the two harmless lines above.
- Requirement 2: a named decision must hold what the comment says. I read D-100 (line 1997), D-104 (2057), D-111 (2150),
  D-112 (2176), D-139 (2892), D-155 and D-156 (3145, 3160), D-204 (3911), D-209 (4085), D-210 (4129), D-233, D-252, D-354
  (5467, 4848, 8694) at the passages the comments name, and found each claim there (see the table). D-222 and D-226
  I took from the row of `guidelines/testing.md` that lists them for the same routes and from their headings; I did not
  read them whole (see Unread material).
- Requirement 3: nothing but comments. The filtered diff shows no changed code line; the six test files pass as before.

## Concerns and mismatches

1. **A comment claim that did not survive my check** (`tests/account-api.test.mjs:416`): the comment said the texts of
   the table are "the ones the server sends". Three of them are not: the test has "Sesja wygasła albo nie istnieje."
   (server: "Sesja wygasła albo nie istnieje. Zaloguj się.", `src/server/account-routes.ts:96`), "Nie udało się
   zalogować." (server: "... Spróbuj zalogować się ponownie.", line 246) and "Nie udało się wylogować." (server:
   "... Spróbuj ponownie.", line 687). The test only checks that the client carries whatever it is sent, so I wrote the
   comment as "sample refusals of the server; the wording is not what is tested". These three sentences are in no
   foundation entry and in no note I could find, so there was nothing to name.
2. The orchestrator's addition to *Read* asked me to read whole each invariant that the six test files cite (26
   invariants) and the part-map entry. I read the `account-server` part-map entry whole and did not read the 26
   invariants, because no line I changed touches an `invariant:` line or a claim an invariant makes (see Unread
   material). If the orchestrator wants them read, say so.
3. No decision was needed, so the slice's allowance to add one was not used. The comments that named a "cause" or a
   "To do" of the failure-logging task kept the "Faults:" text, which carries what the test catches; the task's
   numbering added nothing the code needs.

## Reaches beyond the dispatch (section 1 of `make-change`)

- `git show fc1ef97f:docs/task-cycles/konta-graczy-i-logowanie/reports/02-designer-answers.md` (the loop2 history):
  to read what "answer 5" held (rolling windows of D-102); nothing from it entered a file.
- Greps of `foundations/decisions.md` by D-number, and `sed` of D-100/D-104/D-111/D-112/D-139/D-155/D-156/D-204/D-209/
  D-210/D-233/D-252/D-354 by line range, to check what each named decision holds.
- `src/server/database.ts` (grep for `schemaSteps`, `currentVersion`) and `src/server/account-routes.ts` (grep for the
  three message texts) to check the claims of two comments.
- `deploy/loop2-deploy` (grep for `watch`) and `ls deploy` to confirm that the watcher exists.
- Snapshot of private sources: I opened only `MANIFEST.md`, `reguly_awarii_i_logow_loop2.md` (the To do / "przyczyna"
  numbering) and grepped the vault snapshot for the three message texts (no hit). Nothing from a note entered a file.

## Unread material

- `guidelines/coding.md` and `guidelines/testing.md`: read whole (testing.md in two pages).
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole.
- `.claude/skills/the-way-record-decision/SKILL.md`, `.the-way/elements/decisions/skill/SKILL.md`: read whole.
- Not read: `.the-way/elements/decisions/skill/read.md`, `decide_entry.md`, `.the-way/elements/decisions/template.md`,
  `.the-way/elements/common/rules.md`, `way_of_working.md`, `.the-way/task-cycle/skill/foundation_step.md` (only needed
  to write a decision; none was written).
- `foundations/decisions.md`: read by passage only (D-100, D-104, D-111, D-112, D-139, D-155, D-156, D-204, D-209, D-210,
  D-233, D-252 first paragraph, D-354; D-80 / D-82 / D-362 / D-368 not read; D-222, D-226 headings only).
- `foundations/invariants.md`: the 26 invariants cited by the six files, not read (concern 2); `action-duration-minimum`
  and `tracked-file-private-names` not read.
- Task passages: used as copied in the handoff; `task.md` itself not opened.
- Snapshot notes: `reguly_awarii_i_logow_loop2.md` read in part (lines 1-70 by grep, numbering only).

## Searches not found or unclear

- What "loop2#046-6", "loop2#043-28" and "loop2#050-21" name: not found in the tree or in the snapshot. I took them to be
  numbers of review remarks of pull requests of loop2 (not a note and not a file); the comments they stood in were
  complete without them, so I removed them. If they name something else, the loss is only a pointer.
- The wording of the three client texts of concern 1 in any note or foundation entry: not found.
- A "spec" or "task" that decided the schema version 4 for the saved game states: not needed, D-112 says "current
  version 4".

## Commit

Given in the return message (one commit on `task/martwe-odsylacze-origin`).
