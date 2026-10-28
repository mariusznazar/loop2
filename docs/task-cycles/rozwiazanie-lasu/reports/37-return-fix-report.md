# Report — fix of the return step's review finding, task `rozwiazanie-lasu`

**Status:** done

## Commits and files

- `be66f63` docs: :memo: leave the streak's counting to D-136 and its place in the game minute to
  D-71 (on `de899fa`)
- `foundations/decisions.md` +5 −4

## I-1 — the streak's counting rule in both D-71 and D-136 (WAY-19): fixed

I accept the finding. Pinned WAY-19 says that when a new decision answers a question an older one
answered in passing, the sentence moves to the new one. D-136 now answers how the streak counts, so
the clause moves out of D-71:

- D-71 binding sentence: "— and with it the streak of the map run, which grows by one where the
  character lost no health for being chilled or starving in that minute and falls to zero where it
  did; then," → "— and with it the streak of the map run, as D-136 counts it; then,". D-71 keeps
  where the streak moves in the order: with the body step, before death and the rest of the minute.
- D-71 *Relations*: gains `derives from D-136`.
- D-71 *Verification*, violates: "a game minute in which the character is chilled growing the
  streak" leaves D-71 and moves to D-136's *violates*, beside the starving example already there.
- D-71 *Rationale* ("The streak follows the body …") is about the order, so it stays. So does
  D-71's completion example.

Row 5 of *Settlements to record* stays held, now across two entries: D-71 holds where the streak and
the completion fall in the minute, and D-136 holds what the streak counts. No accepted meaning
changes.

Check: `grep -n "grows by one\|falls to zero" foundations/decisions.md` → no hit (exit 1). The
counting stands in D-136 alone.

## Entries changed, with their meaning in Polish

| Entry | Change | Meaning (pl) |
|---|---|---|
| D-71 | binding sentence, *Relations*, *Verification* | Minuta gry przejścia dzieje się w tej kolejności: najpierw ciało postaci, a razem z nim passa przejścia liczona tak, jak mówi D-136; potem, gdy zdrowie doszło do zera, śmierć; inaczej ognie, odnawianie kafelków i skutek kończącej się akcji, a wtedy, gdy przejście spełnia warunek rozwiązania mapy, domknięcie w miejscu wyboru reguły, a w przeciwnym razie wybór reguły. |
| D-136 | *Verification* gains an example | Warunek rozwiązania mapy stoi w jej danych jako passa, którą przejście ma osiągnąć; passa liczy kolejne minuty gry, w których postać nie traci zdrowia z zimna ani z głodu: minuta z taką utratą ją zeruje, a każda zmiana reguł programu albo grup reguł wykonywanych w przejściu zeruje ją na każdej mapie (znaczenie się nie zmienia; dochodzi przykład minuty wychłodzenia). |

## Checks

| Command | Exit | What it showed |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` before the commit | 0 | `0 errors` |
| same, after commit `be66f63` | 0 | `0 errors` |
| `git diff -U0 foundations \| grep '^+' \| grep -i -w -E 'only\|never\|always\|without\|alone'` (wording rule, task question 10) | 1 | no hit |
| `grep -n "grows by one\|falls to zero" foundations/decisions.md` | 1 | no hit |

No test was run, because no code, no test and no invariant changed. The full gate was not run, as
the dispatch says.
