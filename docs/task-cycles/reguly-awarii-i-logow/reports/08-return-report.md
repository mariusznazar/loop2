# Return report — reguly-awarii-i-logow

**Status:** `done`

Compared at `43f596f`. Corrected in one commit; no product code and no test changed.

| Commit | Subject |
|---|---|
| `defa71f` | docs: :memo: rest D-253 on the runtimes' default print and name what keeps its handling, and write process and backup where the glossary's program and copy mean something else |

Files against `43f596f`: `foundations/decisions.md` +11 −9, `foundations/environment_facts.md` +12 −0,
`guidelines/coding.md` +3 −3.

**The step committed something, so `implement-task` step 11 asks for a fresh review of `43f596f..defa71f`.**

## The row of the second review: Q4 in D-252's *Origin*

**Not named. The template does not want it**, for three reasons:

1. *Origin* „points to where the full reasoning lives”, and „when the whole reasoning is in the entry, it is `none`”. The *complies* item carries its whole reasoning in its own words: neither a failure nor an event line, an announcement to what launches it, in the form two invariants fix. Nothing further stands in Q4.
2. *Origin* points „never to anything deleted when its task closes”. `cycle.md` lies in `.runs/`, which git ignores (`git check-ignore` confirms), and past cycles' records were committed and then removed from the tree (`d79c8e4` then `9da65d0`; `af37325` then `961cb8a`). It could stand only as „a file at a fixed commit”, and that commit does not exist before the merge.
3. „The task a decision was made in is not recorded: git history gives it.”

The other edits in this task extended *Origin* because their binding meaning came from a question of the
task document in the vault, which stays. The *complies* item changes no binding sentence.

## Return step, item by item

### Foundation compared with code

| Entry | Compared with | Result |
|---|---|---|
| D-96 | `src/browser/view/app.ts`, `loadFailed`, `startFrom` | matches |
| D-213 | `saved-game.ts`, `programs.ts`, `app.ts`; the sweep and fault tests | matches. Thrown error, line without its text, save and kept state left alone. |
| D-252 | `log-line.ts`, `main.ts`, every `console` call of `src/server` | two words corrected (see *Decisions*); the rest matches |
| D-253 | `installLastResort` in the three programs; the four that already had handling | **corrected:** see *Decisions* |
| D-28 | `guidelines/coding.md`, the kind tables | matches; the task changes it in nothing |
| D-162 | `account-mail.ts` | matches. `fields` are a label it only carries; it stays apart from HTTP and the database. |
| D-222 | `sendResetMessage`, the reset route | matches. `limited` and `blocked` write no line, and the answer still leaves first. |
| D-111 (search) | `configuration.ts`, `main.ts` | matches: setting, no contents. „The existing occupied-address error” still says `EADDRINUSE` with the address, and both invariants pass. |
| D-137 (search) | `account-block.ts`, the skill | matches |
| D-231 (search) | `account-backup.ts` | matches: the last resort writes to standard error only, and the refusal without the word stays first |
| D-233 (search) | `deploy/loop2-backup` | matches: the command's standard error reaches the log, as it did, now with kind and code and no player's data |
| D-13, D-156, D-224 (search) | every line's fields | matches: no access value, token or link |
| D-211, D-204, D-206 (search) | `app.ts` | matches |
| Part map | `account-server`, `simulation`, `browser-view`, `agent-workflow`, `product-foundation`, `deployment` | matches |

The whole-foundation search for log, console, error text, printing, stack, „default print”, „fixed
line” and the names of changed functions covered all four files of `foundations/`, `decisions.md`
included. Each hit that bears on the change is in the table.

### Decisions

Written or changed by the cycle: **D-96, D-213** (changed), **D-252, D-253** (new).

Corrected in this step, each through `the-way-record-decision`:

- **D-252, binding sentence:** „what runs on the server or its copy” → „…or its backup”. The glossary's *copy* is what a map run carries out, so the word stood against its entry. Row 1's meaning („albo jego kopię”) is unchanged; the wording is the writer's.
- **D-252, *complies*:** „a program's announcement” → „a process's announcement”, for the same reason with *program*. **This alters a word of the answer that bound the fix;** the meaning is untouched.
- **D-253, heading, binding sentence, *violates*, *Rationale*:** *program* → *process*. The glossary's *program* is the written behaviour by which a character acts. The number and the question stand.
- **D-253, *Based on*:** `none` → `node-uncaught-default-print · python-uncaught-default-print`. Its binding sentences state how both runtimes behave, and the template asks for a fact for a citation that would call the decision into question.
- **D-253, *Scope*:** gains `deployment`, since question 4 reaches `deploy/loop2-backup`.
- **D-253, *complies*:** gains what question 4 keeps and the entry lacked: `account-database-check`, `measure-passwords`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` keep the handling they have. Without it, `scripts/restore-trial.mjs`, which does touch a decrypted database and writes no kind or code, read as a breach of the first sentence.

Neither binding meaning changes, so no question for the human arises. A sentence of meaning in the task's
language for the request:

- **D-253 (po poprawce):** Bez zmiany znaczenia; decyzja opiera się teraz na dwóch faktach o domyślnym wypisie Node i Pythona, a cztery skrypty i programy z własną obsługą ją zachowują.

**The reading left open, not corrected.** Whether „wiersz logu” reaches a command's sentence to its operator
stays as it stands in the cycle's process remarks. Those sentences go beside the JSON line, and that is
the review's Minor N2 on the first report, which the dispatch keeps out of this step. Neither *complies*
nor a new entry settles it.

### Invariants

**None written or changed.** Question 15 settles that the six rules take none, and D-213's new sentence is held
by cases under `save-version`, as `guidelines/testing.md` records. The return step writes an invariant only
for a rule set by the task, a decision or the human. *Derives from* of the entries naming D-96 needs no
change: the new clause touches registration and sign-in in nothing. The recovered text of
`account-server-occupied-address` still describes `main.ts`.

### Environment facts

**Two written, through `the-way-record-environment-fact`:**

- `node-uncaught-default-print`: Node.js 24.21.0's default print of an uncaught exception, its stack trace with the error's class name and message on the first line, and exit code 1. Source: `doc/api/process.md` and `errors.md` at commit `955266b`, the commit `node-sqlite-database` cites; read 2026-11-02.
- `python-uncaught-default-print`: Python 3.14's default print of an uncaught exception to standard error. Source: `Doc/library/sys.rst` at tag `v3.14.3`, the version the gate runs on (`python --version`); read 2026-11-02.

Each passage was checked mechanically against the fetched file, 5 of 5 found, with the source's line breaks
joined. D-253's *Based on* names both, as a fact stands only while something names it.

**No fact, with the reason.** A fact stands only while a *Based on* or a *Rests on* names it, and no decision
rests on these; each is a dependency's behaviour, at a pinned version, exercised by a test of the gate:

- express-session reporting a failed store through a late `next`, and Express printing a stack in its final handler (the I1 cases);
- Node raising an unhandled rejection as an uncaught exception (the `rejected` start case);
- `errcode` of a `node:sqlite` error (the database-failure cases);
- Nodemailer's `requireTLS`: `nodemailer-require-tls` already holds it, and it agrees with the code.

### Glossary terms

**None written.** Where the change used a word against its entry, the use moved, which is what `the-way` asks of
a word the product's reader would not take that way:

- *copy* and *program*, as above; also in `guidelines/coding.md`: „działający proces”, „Procesy dotykające danych kont”, „przy starcie procesu”. The template's own English rule says „program”; the Polish file now differs from it in that word.

`failure`, `refusal`, `event`, `kind` and `place` hold their usual meanings and stand in neither glossary. No
glossary entry changes.

### Part-map changes

**None.** `src/server/log-line.ts` lies in `src/server/**`, the stand-in stays in `account-server`, no part depends on
a new part, and no trust boundary moves.

### Projected entries

None: the task carries no projected entry.

### Rows of *Settlements to record* written

| Row | Entry | Note |
|---|---|---|
| 1 | D-252 | written in `3400178`; *complies* in `a62d20f`; wording in `defa71f` |
| 2 | D-253 | written in `3400178`; completed in `defa71f` |
| 3 | D-213, with D-96 and the rule „Odmowa zamiast wyjątku” | written in `3400178` |

No row went missing, and no row was tied to an existing entry.

## Choices, for the questions table

Choices that bind after the merge stand in the entries; the others stay in `reports/02-author-report.md` and
`reports/06-fix-report.md`. New in this step:

- **Reworded the entries** rather than add a glossary entry or rename. Rejected: an entry for *process*, which is a word a reader of the field takes as it means. Cost if wrong: one word to change back.
- **Facts for the runtimes, none for the libraries,** on the rule above. If a later review holds that I1's wrapper rests on a source, the fact needs a decision naming it.

## Checks

At `defa71f`, tree clean.

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (0 errors) | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` (5) | 0 |
| The fact skill's mechanical check of the passages against the fetched sources, 5 of 5, run before the entries were written | 0 |

Before the commit, on the same content: `python -B .the-way/instruction-files/check_instructions.py .`, exit 0, 0 errors, 57 warnings, the earlier ones.

**Not run:** the full gate. The change is text of `foundations/` and `guidelines/` alone, the gate passed at `43f596f`, and it is the orchestrator's. No test of product code ran for the same reason.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| Sources of the facts | `nodejs/node` at `955266b`, `python/cpython` at `v3.14.3` | the fact skill's step 3 |
| The history of past cycle records | `git log` | the *Origin* question |
| The environment-facts and glossary templates, with the fact skill's files | `.the-way/elements/` | as the return step names them |

## Searches not found or unclear

- **Whether the template's rule on two meanings binds a Polish guideline's word.** The glossary is in English; „program” in `guidelines/coding.md` was moved anyway, since the file now sits beside D-253.
- **Whether `node-uncaught-default-print`'s edition is the one the image runs.** `Dockerfile` pins `node:24-slim`, no patch version. The fact cites the commit the foundation's other Node facts cite; `node --version` here gives 24.17.0.
