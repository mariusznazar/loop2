PASS b891590cf5a2c3bae0079cdf6dd03b888800ba6e

# Review of the fix of the return step's review — reguly-awarii-i-logow

Range `defa71f..b891590`, one commit, head confirmed by `git rev-parse HEAD`. Text of `foundations/decisions.md` and `guidelines/coding.md` only. Bounded by `reports/11-return-findings.md`, as `fix.md` gives.

Counts: 0 blocking, 1 Minor, 0 out of scope.

No invariant or test changed in the range. No hostile input tried: the range changes no code.

## The finding

### I1 — fixed

**The defect no longer exists on the new head.** The exception now stands in the binding sentences (`foundations/decisions.md:5136`-`:5143`):

- The third sentence names `account-database-check`, `measure-passwords`, `deploy/loop2-backup` and `scripts/restore-trial.mjs`, says the first two sentences ask no more of them, and says that the last two touch those data and write no kind or code. That is the „X is allowed when Y” of `.the-way/elements/decisions/template.md:102`-`:103`.
- The second overlap of the finding is settled. The second sentence now reaches only a script „that touches none of those data”, so `scripts/restore-trial.mjs` falls under one sentence, and a future script touching accounts falls under the first.
- The first sentence no longer claims more than the product meets: the two standing files it did not fit are excepted by name.
- The binding part stays at three sentences, the template's limit (`template.md:94`).

The author does not contest the finding, so nothing is kept or withdrawn.

**The qualifier adds no meaning beyond the accepted task.** This was the claim most likely to be false, since row 2 of *Settlements to record* does not carry those words. It holds:

- Question 4 gives the split and its reason (`task.md:54`).
- The source the task cites says it outright: the default print „spełnia regułę w programie, który nie dotyka danych kont” (`C:\Storage\repos\loop2\.runs\coding\failure-rules-critique-verdict.md:11`, line read, cited from `task.md:117`).
- D-253's *Rationale* and *violates* already said the same.

So no question for the human arises (WAY-30), and the request's sentence of meaning, updated in `12-return-fix-report.md:46`, shows the human the change.

## What the fix itself broke

Nothing Critical or Important.

- **Does the narrowed second sentence make a new breach?** It would if a script outside the four touched account data and rested on the default print. None does. Of all tracked files in `scripts/` and `deploy/`, only `deploy/loop2-backup` and `scripts/restore-trial.mjs` hit a search for the database, its path or the two account commands; `scripts/restore-trial.mjs` is the positive control, 2 hits on `LOOP2_DATABASE_PATH`. `deploy/loop2-deploy` names only the installed backup script. The entry points of `src/server` are the server, the two account commands and the two the third sentence names; `src/server/log-line.ts` also matches the search, and it is no entry point.
- **Does the removal from *complies* lose anything?** No: the third sentence holds the same list, and *violates* still reads true, since „added” leaves standing handling clear.
- **Is „write no kind or code” true?** Yes in the sense D-253 uses „code”. `deploy/loop2-backup` writes exit codes (`:132`), and `account-backup`'s own JSON line reaches the same log, but that line is the command's and an exit code is no error's code. Same reading as the finding.
- **The rule brought along.** The finding said `guidelines/coding.md` needed no change. That was before the second sentence narrowed, and WAY-169 asks a rule naming a changed binding part to follow in the same change, so the author was right to touch it. `guidelines/coding.md:170`-`:178` is the only rule naming D-253; the other hits are code and test comments, which do not restate the narrowed sentence. Its last sentences still say the four „już ją mają”, which agrees with the third sentence.
- **Other restatements of the sentence:** none in `foundations`, `guidelines`, `.agents`, `.claude`, `AGENTS.md` or `README.md`.

## Minor

### N1. „które” in the guideline can attach to the tests

**Anchor:** `guidelines/coding.md:173`-`:174`

**To paste:** „W skryptach uruchamianych ręcznie albo przez bramkę testów, które tych danych nie dotykają” can be read as tests that do not touch the data, since „testów” stands nearest; placing the qualifier by „skryptach” removes the doubt.

**Why I report it:** D-253 qualifies the script, and a reader of the rule most likely takes it so, because the sentence before it speaks of processes touching the data. Under the other reading a script run by hand would stand unqualified. It blocks nothing: the rule names D-253, the entry is exact, and no script today depends on it. Left as it is, the cost is one reader's second look; fixing it costs one line.

N1 and N2 of `reports/10-return-review-report.md` stay as they were, unfixed as `fix.md` gives.

## Declined to judge

- N1 and N2 of the earlier report: `fix.md` keeps Minor findings out of the fix.
- Anything outside the fix diff: nothing further considered.

## Checks

In the reviewed worktree; nothing in it changed (`git status --short` empty before and after; this report lies in the ignored `.runs/`).

| Command or method | Exit, result |
|---|---|
| `git rev-parse HEAD` and `git rev-parse b891590` | 0, both `b891590cf5a2c3bae0079cdf6dd03b888800ba6e` |
| `git log --stat defa71f..b891590` and `git diff defa71f..b891590` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0, 0 errors |
| `python -B .the-way/instruction-files/check_instructions.py .` | 0, 0 errors, 57 warnings |
| `git ls-files scripts deploy` | 0, the population searched |
| `grep -nlE 'LOOP2_DATABASE_PATH\|sqlite\|AccountDatabase\|accounts\.sqlite\|account-backup\|account-block\|DatabaseSync' $(git ls-files scripts deploy)` | 0, `deploy/loop2-backup`, `scripts/restore-trial.mjs` |
| `grep -c 'LOOP2_DATABASE_PATH' scripts/restore-trial.mjs`, positive control | 0, 2 |
| `grep -lE 'process\.(argv\|exit)' src/server/*.ts` | 0, six files, five entry points and `log-line.ts` |
| `grep -nE 'sqlite\|DATABASE\|account-\|backup' deploy/loop2-deploy` | 0, the installed backup script only |
| `sed -n 11p` of `failure-rules-critique-verdict.md` in the main checkout | 0, the line the fix report cites |
| `grep -rnE 'default print\|domyśln(y\|ego\|ym) wypis'` over `foundations guidelines .agents .claude AGENTS.md README.md` | 0, no restatement beyond D-253, the fact and the rule |
| Search for `D-253` over the repository, `.the-way`, `.runs`, `node_modules` and `dist` left out | 6 files: the entry, the rule, and code and test comments |

**Not run:** the full gate, as the dispatch gives. No product test ran, since the range is Markdown alone.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| WAY-169 | `.the-way/foundations/decisions.md:4664` | the guideline edit the fix report rests on |
| The critique's verdict, line 11 | `C:\Storage\repos\loop2\.runs\coding\failure-rules-critique-verdict.md` | the source of the qualifier |
| Tracked scripts and entry points | `scripts/`, `deploy/`, `src/server/` | whether the narrowed sentence makes a new breach |

## Searches not found or unclear

none
