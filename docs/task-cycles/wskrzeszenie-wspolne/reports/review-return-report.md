PASS b29af11bfd959d3f81b940d6838ea2285b0e09d7

# Review of the return step, range `49ca4387..b29af11b`

HEAD confirmed: `git rev-parse HEAD` = `b29af11bfd959d3f81b940d6838ea2285b0e09d7`. One commit, `b29af11b`; `git diff --stat` shows `foundations/decisions.md` only (9 insertions, 3 deletions). The trust boundary (`src/browser/sim/saved-game.ts`) is not touched by this range. No invariant file, test or code file is touched, so no invariant test is changed.

Counts: blocking 0, Minor 3, out-of-scope 0.

## What the change says, and what I compared it with

D-242, third sentence, now adds: the death and the first completion of the manual map run that a reading brings are settled after the earning loops' game minutes of that reading, at the reading, so that of two deaths on the account's one resurrection in the open game the earlier in real time takes it. *Verification* gained a complying example (a loop's end in a death a millisecond before the reading, the manual run in another, the resurrection to the loop's death) and a violating one (the manual run's death settled before the loops' game minutes).

Against the code, `src/browser/view/clock.ts:88-108` (`flush`):
- `passRealTime` for the manual run (line 94), then `passLoops` (95), the loop clock taken (96), then `settleCompletion(settleDeath(loops.state, moment).state, moment)` (99-102), then one `store.apply` (103). So the manual run's death and first completion are settled after the loops' minutes, at the reading `moment`; the loops' minutes lie at the minutes' own moments, none after the reading (D-242 first and second sentences). The sentence is true of the code. Within the settling, death comes before completion, which matches "the death and the first completion".
- Test of that order: `tests/view/clock.test.mjs:568-605`. A loop's minute lies at T0 + 60 s, the reading a millisecond later (`jump(LOOP_MINUTE_MS - 1000 + 1)` after the date's one second per reading). It asserts that `resurrectionReadyAtMs` is T0 + 60 s + the renewal (the loop's moment), Ola's generation stays 1, her loop goes on, Ala's death finds it used (`progressLost`, generation 2). Settling the manual death first would give the resurrection to Ala and fail it, so the test fails when the behaviour breaks. The expected values are literals and constants, not computed by the code under test. The test sits on the same line as the entry's complying example, so the example is true of the tests.
- `tests/view/clock.test.mjs:530-563` (one result, events together) and `:609-622` (minute's own moment) are consistent with the sentence.

Against the other sentences of D-242 and its *Relations* and *Rationale*: the first two sentences are unchanged and agree with the new one (minute's own moment for loop deaths, the reading for the manual run: D-221 says the death is settled "at that reading"). The "violates" item "one character passed through all the game minutes of a reading before the next" is not contradicted. The *Rationale*'s "Accepted with it: a character reaching the chest or the resurrection in the open game can differ from the catch-up" agrees (the catch-up, D-240, gives the resurrection by list order). D-190 and D-240 say the shared resurrection and its renewal by a first completion, and D-240's "violates" (the character that died first in real time taking it in the catch-up) does not touch the open game. D-386 (the functions that settle a death and a first completion refuse a moment that is no safe integer) is consistent with the clock passing `moment` to both. `foundation_check.py` passes.

Reserved choice: the change settles no language, framework, library, store, login or place to run. The task's *Decisions in play* lists D-242 as unchanged; the change adds a statement the task itself requires (To do 4: "w otwartej grze i w przejściu ręcznym bierze je śmierć wcześniejsza w czasie") and reserves no choice. It decides nothing the task or the human left open: it writes down an order that commit `4f0781c3` already put in `clock.ts`.

## Findings

### Blocking (Critical or Important)

none

### Minor

1. `foundations/decisions.md:5244-5245` — "the earlier in real time takes it" says more than the code decides. The manual run's death is dated at the reading (`clock.ts:99-102`), while the real moment at which it happened lies somewhere in the real time elapsed since the previous reading; a loop's death is dated at its minute's moment, which is never after the reading. So for a loop's death and a manual death that really came earlier within the same reading, the loop's death still takes the resurrection. What holds is "the earlier at the moment it is settled at". Why it matters: a reader or a later change reads "earlier in real time" as a rule about when the deaths happened, and would take the code's order as a bug in that case. Evidence: `clock.ts:94-102` (the elapsed time is passed to `passRealTime`, the death is settled at `moment`), and D-221's "settled at that reading". It follows the wording of the task (To do 4), so I grade it Minor; a wording such as "so that of two deaths on the account's one resurrection in the open game the one settled at the earlier moment takes it" would state exactly what the code does.

2. `foundations/decisions.md:5249` and `:5267-5279` — the sentence now concerns the account's shared resurrection and the first completion's renewal, which are D-190's, but D-242's *Relations* do not say "derives from D-190" and its *Rationale* does not give the reason for the new order (the loops' ends lie at their minutes' moments, none after the reading, so they come before the reading's own settling). Why it matters: the reason exists only in the comment of `clock.ts:97-98` and in the return report; the next reader of the entry gets the order but not why it is not the reverse. Cost is low: the file passes the foundation check, and D-240's *Relations* also omit D-190 while it speaks of the resurrection.

3. `foundations/decisions.md:5242-5245` and the *Verification* at `:5257-5259` — the sentence says "the death and the first completion", but the complying and violating examples and the test (`clock.test.mjs:568-605`) cover only the death. A first completion of a map the account has not solved, settled in the same reading as a loop's death on the one used-up resurrection, is not covered by any test of the clock (the completion tests at `clock.test.mjs:362-398` have no loop). The order for the completion is true of `clock.ts:99-102` but unprotected. Minor, since the sentence matches the code and the task does not ask for that test.

Style only: `foundations/decisions.md:5261` is 115 characters in an entry otherwise wrapped near 100 (lines 5250 and 5254 are 101); no check fails on it.

## Declined to judge

- Whether the order of the settling in `clock.ts` is the right one for the player (a loop's death before the manual run's first completion at the same reading): code, outside the return step's range; task To do 4 requires the earlier death to take it.
- The catch-up's order (D-240) and `catch-up-state`: not changed by the range.
- The earlier commits of the task's change (`4f0781c3`, `77dd1194`, `d88b362f` and before): reviewed by other reviews; I read `4f0781c3 --stat` only to see that `clock.ts` is the code the sentence speaks of.

## Checks run

- `git rev-parse HEAD`, `git log 49ca4387..HEAD --oneline`, `git diff 49ca4387..HEAD`, `git diff --stat`: one commit, one file, as the handoff says.
- `git status --short` in the worktree: clean (no output) at the start of the review.
- `python -B .the-way/elements/common/foundation_check.py`: `0 errors`, exit code 0.
- Manual read of `src/browser/view/clock.ts` (whole) and `tests/view/clock.test.mjs` (whole): the order of `flush` and the test of the order, as described above.
- Not run: `npm test` (not allowed), focused tests of the clock (not asked; the review is of text and the handoff forbids the suite). The conclusion that the test at `clock.test.mjs:568` fails when the order is reversed is from reading the test and `clock.ts`, not from a run: unverified by execution.

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/SKILL.md` (whole): the method named by the task of the handoff.
- `.runs/task-cycles/wskrzeszenie-wspolne/task.md` and `reports/return-report.md` (whole): to read the task's *Decisions in play* and To do 4, and the claims to verify.
- `foundations/invariants.md` lines 528-536, 1048-1058, 1128-1155 only (the five named invariants read whole).
- `git log --oneline -8` and `git show 4f0781c3 --stat`: to see where the order in `clock.ts` came from.
- `awk` over `foundations/decisions.md` lines 5239-5265 for line lengths, and `grep` of `Relations:` lines: to check the style and relation findings.
- `grep -rln "settleCompletion|resurrectionRenewed" tests src`: to see which tests touch the first-completion settling (finding 3).

## Unread material

none. Read whole: D-242, D-221, D-240, D-190, D-386; invariants `catch-up-minutes`, `catch-up-death-moment`, `catch-up-state`, `minute-span-split`, `resurrection-renewal`; `src/browser/view/clock.ts`; `tests/view/clock.test.mjs`; the handoff, the task, the return report. D-190 and D-386 I read whole to their *Rejected* line.

## Searches not found or unclear

none
