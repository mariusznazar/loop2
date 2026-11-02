FAIL defa71f45c1de0879433ef965307eaf3626e872f

# Review of the return step — reguly-awarii-i-logow

Range `43f596f5e83aa3a6bbfc42c4022a01b3e060c9af..defa71f`, one commit, head confirmed by `git rev-parse HEAD`. Text of `foundations/` and `guidelines/` only. The reviewer made none of the change.

Counts: 1 blocking (Important), 2 Minor, 0 out of scope.

No slice: one-author route. No invariant or test changed in the range. The trust boundary of the dispatch is not reached by this range: it touches text only, so no hostile input was tried. No irreversible operation. No reserved choice is settled. The return report names no own-work check, and this text-only step has none to judge.

## Important (blocking)

### I1. D-253 keeps its exception in *complies*, while its binding sentence stands unqualified

**Anchor:** `foundations/decisions.md:5136`-`:5137` (binding sentence) and `:5148`-`:5149` (the new *complies* item)

**To paste:** D-253's first sentence still says that each process touching the data of accounts has a handler writing kind, code and place, yet `scripts/restore-trial.mjs` and `deploy/loop2-backup` touch those data and write neither. The new *complies* item allows them, but an exception foreseen in advance belongs in the binding sentences, so the first sentence needs the qualification question 4 already carries.

**Why I report it:**

- **What the sentence is for.** The binding sentence is what an agent compares a change with and what the human accepts at the merge. *Verification* holds examples of keeping the decision; it does not narrow it.
- **The mechanism.** `.the-way/elements/decisions/template.md:102`-`:103`: „An exception foreseen in advance is written into the binding sentences ("X is allowed when Y"); acting on it is then not a contradiction (WAY-30).” WAY-30 repeats it (`.the-way/foundations/decisions.md:769`-`:771`). The return step saw the collision and says so itself: without the new item, `scripts/restore-trial.mjs`, „which does touch a decrypted database and writes no kind or code, read as a breach of the first sentence” (`08-return-report.md:63`). The item stops the breach from showing in one field. The first sentence reads as before.
- **Concrete values.** Both touch the data:
  - `scripts/restore-trial.mjs:1`-`:3` runs „a decrypted backup of the account database”. Its last handling is a fixed verdict, `scripts/restore-trial.mjs:578`, with no kind, code or place.
  - `deploy/loop2-backup:8`-`:9` streams the plain database through its own pipe. Its last handling is `end: failed (exit N)`, `deploy/loop2-backup:132`.
  - The other two names of the item are not exceptions: `src/server/account-database-check.ts:16`-`:17` and `src/server/measure-passwords.ts:15`-`:16` touch no database of the server, and „added” in *violates* leaves them clear.
- **A second overlap the item does not settle.** `scripts/restore-trial.mjs` is also „a script run by hand”, so the second binding sentence lets it rest on the default print, while the first demands a handler and *Rationale* limits the default print to „a script that touches no account”. The binding sentences give no way to tell which applies.
- **The grade.** WAY-263: a change that restates an entry it writes „differently, including more broadly or without a qualification” is Important. The first sentence is broader than the entry's own *complies* and than question 4. A dispatch or a report calling this a wording matter does not lower it.
- **Both ways.**
  - Left as it is: nothing breaks today, because a reader who reaches *complies* gets the right answer. But the human accepts at the merge a sentence the product does not meet, and a later agent comparing a change with the binding sentence alone finds a breach in two standing files. The cost is one more review and a false alarm for each such reader.
  - Fixed: one clause in the first sentence, then this review of the fix. It asks nothing of the human, since question 4 of the accepted task carries the meaning (`task.md:54`, and `foundation_step.md`, „beyond what the accepted task document … carries”).
- **Direction, not binding.** Say in the binding sentences that `scripts/restore-trial.mjs` and `deploy/loop2-backup`, which touch those data, keep the handling they have, or draw the first sentence so that they fall outside it. Then *complies* can shorten or stay. `guidelines/coding.md:170`-`:177` already reads correctly and needs no change.

## Minor

### N1. Four of the five quoted passages keep the source's markup

**Anchor:** `foundations/environment_facts.md:422`, `:428`

**To paste:** The passages keep `` `stderr` ``, `` ``sys.stderr`` ``, `` :exc:`SystemExit` `` and `` ``sys.excepthook`` ``, while the template wants the text a reader sees, with markup dropped; the entry beside them drops it.

**Why I report it:** `.the-way/elements/environment-facts/template.md:119`: „The passage is the page's text as a reader sees it, with markup dropped and whitespace collapsed”. The precedent does so: `node-sqlite-database` (`:254`) quotes „with remainingPages and totalPages properties” and „Default: 100.”, where the source reads `` `remainingPages` `` and `` **Default:** `100` `` (`doc/api/sqlite.md:1457`, `:1455` of the same commit, fetched). Wording is right in all five (see Checks), so a reader can still find each passage, and nothing rests on the marks. Only the form departs. The count of four: both Node.js passages keep their backticks, the second around `<error class name>: <error message>`, the first two Python passages keep theirs, and the third Python passage holds no markup.

### N2. The reading left open on D-252 is wider than the return report says

**Anchor:** `src/server/account-database-check.ts:83`-`:85`; `08-return-report.md:35`, `:70`-`:73`

**To paste:** The report says the commands' sentences go beside the JSON line, but `account-database-check.ts:83` has no JSON line beside it: it is a plain failure line with the error's message. The open reading on „wiersz logu” therefore also covers this file, and the table row „the rest matches” overstates it.

**Why I report it:** D-252's second binding sentence says a log line of Node.js code is one JSON object, and its *complies* frees only the readiness line. The report compares „every `console` call of `src/server`”, then explains the sentences that remain by their standing beside a JSON line. That holds for `account-block` and `account-backup`, not for `account-database-check.ts:83`, whose line quotes `error.message`, and not for `measure-passwords.ts:384`, which puts `error.message` in a JSON object with none of the fixed fields. I grade it Minor, not by WAY-263, because both run on made-up data (their own headers, `:16`-`:17` and `:15`-`:16`), D-253's new item keeps their handling, and whether a line to the person running a command is a log line stays unclear in the task (`cycle.md:108`). The task has not settled that reading, so this review does not settle it either. The request should name the two files when it carries the remark.

## Findings of earlier reviews

This is no review of a fix. N1-N3 and O1-O2 of the first review and N1-N3 of the review of the fix stay where they were. N3 of the review of the fix, *Origin* of D-252 not naming the cycle's Q4, is answered by `08-return-report.md:16`-`:25`, and I agree: `.the-way/elements/decisions/template.md:204`-`:208` gives the same answer, and `.runs` is ignored (`git check-ignore .runs`).

## What was compared and holds

| Claim | Result |
|---|---|
| D-252, „backup” for „copy”, „process's” for „program's” | holds. The glossary's *copy* and *program* mean what the report says (`foundations/glossary.md:25`, `:175`). Row 1's meaning stands. Both invariants exist and fix `Loop: <address>`. |
| Q4 of the cycle | kept: the readiness line stands in *complies* (`foundations/decisions.md:5114`-`:5117`) and at `src/server/main.ts:30`. |
| D-253, *program* to *process* in heading, binding sentence, *violates*, *Rationale* | holds. No trace of the old heading in `foundations`, `guidelines`, `.agents`, `.claude`, `src`, `tests`, `scripts`, with a positive control on the new one. |
| D-253, *Based on* | holds. Both facts name an outside behaviour the sentences state; `foundation_check.py` finds them. |
| D-253, *Scope* gains `deployment` | holds: the part exists and holds `deploy/**`. |
| `installLastResort` in the three programs | holds: `src/server/main.ts:9`, `account-block.ts:30`, `account-backup.ts:34`, each before its work; `src/server/log-line.ts:65`-`:70`. |
| D-96, D-213 against `src/browser/view/app.ts` | hold: `startFrom` `:80`-`:94`, `loadFailed` `:203`-`:206`, a kept state stays for the retry `:303`-`:313`, no game and no save on a failed load `:327`-`:332`. Rule „Odmowa zamiast wyjątku” in `guidelines/coding-saved-game.md:70` names D-213. |
| Both facts, form | hold apart from N1: one sentence, identifier without edition, placed before `## Withdrawn identifiers`, pages of one edition, frozen addresses, no earlier entry on the same thing. `955266b` is Node.js 24.21.0 and a release (`src/node_version.h`); `v3.14.3` is 3.14.3 (`Include/patchlevel.h`), the gate's version, and `README.md:69` requires Python 3.14. |
| Both facts, truth | hold: the source says it, and a scratch run shows it on Node.js 24.17.0 and Python 3.14.3. |
| No fact for express-session, Express, unhandled rejections, `errcode` | I agree. WAY-73 keeps a fact only while a decision or an invariant names it, and their loss would break code a test holds, not the decision. `rejected` at `tests/startup.test.mjs:588` and `errcode` at `:573` stand there. |
| History behind the *Origin* argument | holds: `d79c8e4`, `9da65d0`, `af37325`, `961cb8a` are what the report says. |
| `guidelines/coding.md` against the template | „proces” for the template's „program” (`.the-way/product-guidelines/coding/template.md:188`-`:189`, `:199`) is a word moved off a glossary entry, with no effect on the rule. No finding. |
| Numbers of the return report | hold: +11 −9, +12 −0, +3 −3; 0 errors; 57 warnings. |

## Declined to judge

- `deploy/loop2-deploy` absent from D-253 though its *Scope* now reaches `deployment`: the task defers cause 9 (`task.md:54`, `:175`), and `guidelines/coding.md:177`-`:178` carries it.
- „kopia bazy wykonana” in `guidelines/coding.md:259`: the task's own item (question 11), and „bazy” keeps it apart from the glossary's *copy*.
- Whether a command's sentence to its operator is a log line, as a decision: the task leaves it open; only the report's account of it is N2.
- Hostile input at the trust boundaries: the range changes no code.

## Checks

Run in the reviewed worktree unless marked; nothing in it changed (`git status --short` empty before and after; this report lies in the ignored `.runs/`).

| Command or method | Exit, result |
|---|---|
| `git rev-parse HEAD` | 0, `defa71f45c1de0879433ef965307eaf3626e872f`, the given head |
| `git log --stat` and `git diff 43f596f5e83aa3a6bbfc42c4022a01b3e060c9af..defa71f` | 0 |
| `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` | 0, both `f45ca40724251a46965aed69f733d0a35c430048` |
| `python -B .the-way/elements/common/foundation_check.py` | 0, 0 errors |
| `python -B .the-way/instruction-files/check_instructions.py .` | 0, 0 errors, 57 warnings |
| `git check-ignore .runs` | 0 |
| `git log --oneline -1` on `d79c8e4`, `9da65d0`, `af37325`, `961cb8a` | 0 each |
| `curl -sS` of `doc/api/process.md`, `doc/api/errors.md`, `doc/api/sqlite.md`, `src/node_version.h` at `955266b…` | 0 each, HTTP 200, unauthenticated |
| `curl -sS` of `Doc/library/sys.rst`, `Include/patchlevel.h` at `v3.14.3` | 0 each, HTTP 200, unauthenticated |
| `python -I -B <scratchpad>/tools/passages.py <scratchpad>/sources`, the five passages against the fetched files with whitespace collapsed | 0, each found once |
| `node n.mjs`, a scratch file throwing an `Error` | 1, as the fact says: stack on standard error, class name and message on its first line |
| `python -I -B p.py`, a scratch file raising `ValueError` | 1, traceback and exception on standard error |
| `node r.mjs`, a scratch file with an unhandled rejection | 1, the message on standard error |

**Not run:**

- The full gate: the orchestrator's run, as the dispatch gives.
- `tests/quality/test_quality_invariants.py`: its tools run on code and scripts, and this range changes Markdown alone; the author's run is reported at exit 0 and not repeated.
- No product test ran, for the same reason.
- The Node.js release of the built image: `Dockerfile` pins `node:24-slim`, and no image was built or read.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| WAY-30, WAY-263, and the headings of WAY-11, WAY-73, WAY-134 | `.the-way/foundations/decisions.md` | the grade of I1 and the fact rule |
| The decisions template; the foundation step | `.the-way/elements/decisions/template.md`, `.the-way/task-cycle/skill/foundation_step.md` | D-253's form; `return_step.md` says it writes as that step writes |
| The code D-253 names | `scripts/restore-trial.mjs`, `deploy/loop2-backup`, `src/server/account-database-check.ts`, `src/server/measure-passwords.ts`, `account-block.ts`, `account-backup.ts`, `log-line.ts` | whether the entry says what the code does |
| Glossary entries *program*, *copy*, and its headings | `foundations/glossary.md` | the words moved |
| The invariants' sentences, by search | `foundations/invariants.md` | D-252's *complies* |
| D-229, by search; `README.md:69`; `package.json`; `Dockerfile`; `.github/workflows` | | which runtime the product stands on |
| The cycle record and earlier reports | `cycle.md`; `reports/02`, `04`, `07` | Q4, the open reading, what was already raised |
| `doc/api/sqlite.md`, `src/node_version.h`, `Include/patchlevel.h` | the sources' own editions | the precedent of N1 and the editions |

## Searches not found or unclear

- **Which Node.js release the image runs.** `Dockerfile` floats on `node:24-slim`, `package.json` says `24.x`, and the local gate runs 24.17.0, while `node-uncaught-default-print` names 24.21.0, as `node-sqlite-database` does. Whether the product „stands on” 24.21.0 (`.the-way/elements/environment-facts/template.md:85`) is unclear. No finding: the entry follows its precedent and nothing rests on the patch number. The return report names the same gap.
- **`.github/**` through the search tool.** A first search with a glob returned nothing for that directory; hidden directories are skipped. Read directly with `grep -rn`: no runtime is pinned there.
- **Whether „touches the data of accounts” reaches a process that only carries them,** as `deploy/loop2-backup` carries the plain database through a pipe. The return report says it does for `scripts/restore-trial.mjs`, and I read the pipe the same way. I1 stands on either reading through `scripts/restore-trial.mjs`.
