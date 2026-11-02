# Fix report — review of the return step, `defa71f`

**Status:** `done`

The one blocking finding is fixed, and I do not contest it. The meaning stays question 4's, so nothing
needed `blocked`. The Minor findings N1 and N2 of `reports/10-return-review-report.md` were left alone, as
the dispatch gives.

| Commit | Subject |
|---|---|
| `b891590` | docs: :memo: write D-253's exceptions into its binding sentences, as question 4 carries them |

Files against `defa71f`: `foundations/decisions.md` +6 −5, `guidelines/coding.md` +2 −2.

## I1 — fixed

**The finding holds.** `.the-way/elements/decisions/template.md:102`-`:103` wants an exception foreseen in
advance in the binding sentences. I had seen the collision and put it in *complies*, which holds examples
and narrows nothing.

**How, through `the-way-record-decision`.** D-253's binding part, still three sentences:

> Each process that touches the data of accounts — the server, `account-block` and `account-backup` — has one last-resort handler of its own, which writes the kind, the code and the place of what no code handled, because the runtime's default print could quote values. A script run by hand or by the test gate that touches none of those data meets the rule on the last resort through the default print of Node.js or Python, which writes what nothing handled. `account-database-check`, `measure-passwords`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` already have a last-resort handling of their own, and the two sentences above ask no more of them, though the last two touch those data and write no kind or code.

Three edits follow from it:

- **The third sentence is new.** It holds the exception the finding names, in question 4's own terms („już ją mają”), with the two that touch the data named as such.
- **The second sentence gains „that touches none of those data”.** This settles the overlap the finding raises, and not only for `scripts/restore-trial.mjs`: a future script that touches accounts now has one answer, the first sentence.
- **The *complies* item is gone,** since it repeated the third sentence. *Verification* stands as it was written.

**Why the qualifier is question 4's meaning and no more.** `task.md:54` gives the reason for the split:
„programy dotykające danych kont… bo domyślny wypis mógłby zacytować wartości”. The critique's verdict, the
source the task cites, says it outright at `failure-rules-critique-verdict.md:11`: the default print
„spełnia regułę w programie, który nie dotyka danych kont”. D-253's *Rationale* and *violates* already said
the same. So this is what the row meant, written where it binds.

**Why „ask no more of them” and not „keep it as it stands”.** Cause 10, deferred by question 6, would have some of
these scripts write a kind and a code later. A sentence that froze them would stand against that work.

**The rule brought along.** `guidelines/coding.md`, `### Recording a failure`, gains the same qualifier („które tych
danych nie dotykają”). The review said this file needed no change, but that was before the second sentence
narrowed, and a rule follows the entry it names (WAY-169). Nothing else in the rule changes.

**The sentence of D-253's meaning for the request**, updated:

- **D-253:** Własną obsługę ostatniej szansy mają serwer, `account-block` i `account-backup`; skrypty uruchamiane ręcznie albo przez bramkę, które nie dotykają danych kont, spełniają regułę domyślnym wypisem Node i Pythona; `account-database-check`, `measure-passwords`, `deploy/loop2-backup` i `scripts/restore-trial.mjs` już mają swoją obsługę i decyzja nie wymaga od nich więcej.

## Checks

At `b891590`, tree clean.

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (0 errors) | 0 |

On the same content, before the commit: `python -B .the-way/instruction-files/check_instructions.py .`, exit 0, 0 errors, 57 warnings, as before.

**Not run:** the full gate, as the dispatch gives. No product test ran: the commit is text of `foundations/` and `guidelines/` alone.

## Choices, the way rejected and the cost if wrong

- **The second sentence narrowed,** rather than a precedence clause between the two. Rejected: „the first prevails over the second”, which leaves two sentences saying different things of one script. Cost if wrong: a script touching accounts that was to rest on the default print needs a handler; none exists today.
- **The *complies* item removed.** The finding allowed it to stay. Rejected: keeping it, which is one list in two places. Cost if wrong: one example fewer for a reader.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| `guidelines/coding.md` | `### Recording a failure` | the rule naming D-253; the dispatch names only the entry |
| The verdict on the proposals | `C:\Storage\repos\loop2\.runs\coding\failure-rules-critique-verdict.md:11`, read earlier in this cycle | the source of the qualifier |

## Searches not found or unclear

none

## Problems observed

Note for the record: this is a third round on D-253 that a binding sentence would have saved. I named the
collision in `reports/08-return-report.md` and solved it in the wrong field.
