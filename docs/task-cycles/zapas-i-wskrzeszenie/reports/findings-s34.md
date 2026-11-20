# Findings of the grouped review of slices 3-4 (blocking findings, in the reviewer's words)

Review report: `reports/review-s34-report.md`, first line `FAIL 0fde9df091c2a4bb27b3d8de99fdc9f18c3d0ab4`. Both blocking findings come from slice 3.

## Findings

### Important

**I-1 (slice 3). `tests/sim/trip.test.mjs:670` still quotes the old sentence of D-214, in a case this slice rewrote, and the case now asserts the opposite of the quote.**

The case "a run records at its start whether its map was solved, and a restart after the solving completion records it anew" (`tests/sim/trip.test.mjs:668`) had its body rewritten in `74652031`: the restart now takes from the chest (`assert.deepEqual(restarted.team.chest.pieces, { stick: 2, berry: 3, moss: 2 })`, lines 680-688). But its line 670 still reads:

```
// decision: D-214 "A map run restart after the completion that solved the map is such a run: it takes its equipment from nowhere and pays nothing"
```

D-214 now says (`foundations/decisions.md`, D-214): "A map run restart after the completion that solved the map is such a run: it takes its equipment from the chest and pays no practice." The slice's goal requires "each `decision:` line quoting a sentence Slice 1 rewrote quotes the sentence as it stands now", and the executor's report claims "Every `decision:` quote that Slice 1 rewrote now quotes the sentence as it stands (D-189, D-214)" — false for this line. Why it matters: the case claims to hold a rule of D-214 the game no longer has, and the foundation check fails on it. Evidence: `python -B .the-way/elements/common/foundation_check.py` (exit 1) prints `tests/sim/trip.test.mjs:670: the quotation stands in no binding sentence of `D-214``; it is the only error the check reports in the files of this range (`tests/sim/trip.test.mjs`, `tests/sim/run-record.test.mjs`, `balance/`, `tests/balance/`). The one-line fix is the quote line 72 of the same file already carries.

Contradiction: yes — D-214 (the case's `decision:` line restates D-214 with the sentence the entry no longer holds, while its assertions follow the new sentence).

**I-2 (slice 3). The comment of `clippedTake` in `src/browser/sim/trip.ts:79-80` still says the old rule of D-189.**

```
/**
 * The take list as a run of a solved map takes it (D-189): each entry cut by the carrying capacity
 * and the map's entry cap in list order, the list's own counts standing in for the stock. Pure.
 */
```

After this slice no run of a solved map takes its list that way: every start goes through `takeTrip` from the chest (`src/browser/sim/game.ts:283`), and D-189 says "A manual map run of a map already solved takes its equipment from the chest and brings its loot out to it as every other map run does (D-179), and pays no practice." The slice's goal requires that "the comments ... of `trip.ts` say what holds now", and the executor updated the comments of `sendTake`, `takeFromNowhere` and `tripLoot` in the same file but left this one. Why it matters: a reader of the simulation (and the agent of slice 16 or 17, which still meets this function through the view's `rehearsalMark` in `src/browser/view/trip-lines.ts:37`) reads, under the citation of D-189, a rule D-189 no longer has. By the method's rule on a file that restates a foundation entry differently (WAY-263) this is Important; the fix is one comment, saying what the function computes (the take list clipped by capacity and entry cap with the list's own counts as stock) without attributing it to a run of a solved map.

Contradiction: yes — D-189 (the comment cites D-189 for taking from nowhere, which D-189 now rejects).

