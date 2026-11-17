PASS 13d3f2d0b46fe67281ae9515425f11d66d0e11d8

# Review of correction 1 — task `drobne-poprawki-po-pr-92-94`

Range `911bb057..13d3f2d0` (3 commits, `foundations/decisions.md` only, +6/−6), answering the human's remarks in `reports/correction-1-remarks.md`. `git rev-parse HEAD` is `13d3f2d0b46fe67281ae9515425f11d66d0e11d8`, the head given.

## Each remark

| Remark | Made? | Evidence |
|---|---|---|
| Item 3, the pace decisions (my O1) | **made** | D-129 *Rationale* (`foundations/decisions.md:5423-5424`): „a mage sent then passes 480 game minutes of a map run of Las, the whole of the shortest one that solves it, unseen in half a real minute”. D-130 *Rationale* (`:5452-5453`): „lets 480 game minutes of a map run of Las, the whole of the shortest one that solves it, pass unseen”. Both now say what D-207 says after the change. The arithmetic of D-130 („At 1× the 480 game minutes of Las take 8 real minutes and at 16× 30 real seconds”, `:5449-5450`) stays; it is true, and the sentence after it now says what the 480 minutes are. |
| Item 3, the D-355 example (my O2) | **made** | D-355 *Verification*, `complies` (`:2079`): „with a `grep` of the file whose output is bounded, keeping the newest lines, through the `mikrus` MCP server”, the way of reading the `loop2-deploy` skill now gives. The `violates` example („reads it whole with no bound”) and the binding sentence („a bounded `tail`, `grep` or `zgrep`”) are unchanged and agree with it. |
| Items 1, 2, 4 — let through | **nothing changed, as bound** | The range touches no line of D-153, of `foundations/environment_facts.md`, of either `loop2-deploy` skill or of `guidelines/`. |

## The D-21 change (`5263915e`)

It is the same kind of sentence, corrected the same way. D-21 *Rationale* said „each attempt at the 480 game minutes of Las takes eight real minutes” and „a map run at 16× left in a hidden tab passes the whole of Las unseen, its end included”. Both treated 480 game minutes as the length of every attempt at Las. The first now reads „the 480 game minutes of Las, the whole of the shortest map run that solves it, take eight real minutes, and at 16× half a real minute” (`:5262-5263`). The second now reads „passes 480 game minutes of Las unseen in half a real minute, the whole of the shortest map run that solves it” (`:5270`).

This is right by the game's data. Las is solved by a streak, `solving: { streak: 480 }` (`src/browser/sim/data/maps.ts:90`, the row `name: "Las"`), so the shortest map run that solves it lasts 480 game minutes. At one game minute per real second that is 8 real minutes at 1× and 30 real seconds at 16×.

## Binding sentences and quotations

- Every changed line is in a *Rationale* or a *Verification* example.
- The `decision:` quotations in tests of the four decisions are all of binding sentences, none of the changed text:
  - D-21: `tests/sim/data.test.mjs:446` and `tests/sim/flow.test.mjs:193`.
  - D-129: `tests/sim/flow.test.mjs:50`.
  - D-355: `tests/deploy/test_loop2_deploy_dump.py:89,203,223` and `tests/deploy/test_loop2_log_storage.py:74,83,97,104`.
- No test file is in the range.

## Sentences of the same kind left

I searched once over `foundations`, `guidelines`, `README.md`, `AGENTS.md`, `.claude`, `.agents`, `src` and `tests` with `git grep -i -E` for these phrases: „whole of Las”, „whole map run of Las”, „passes the whole”, „half a minute” or „half a real minute”, „8 real minutes” or „eight real minutes”, and „480 game minutes of Las”.

The hits that remain are all correct, so none is left:
- D-207 (`:3831-3832`): already tied to the shortest map run that solves Las, „and more for a longer one”.
- D-21 (`:5263`, `:5270`) and D-129 (`:5424`): the corrected sentences.
- D-130 (`:5449`): the arithmetic above.
- `src/browser/view/clock.ts:55`: „the whole minutes”, a different sense.
- `tests/sim/loop.test.mjs:64`: „the first 480 game minutes of Las”, correct.

## New findings in the correction

None.

## Declined to judge

- Whether D-153 should say that the confirmation message reached an external mailbox. The remarks let it through and ask the human separately.

## Checks

| Check | Command or method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` | `13d3f2d0…`, exit 0 |
| Range | `git log --oneline 911bb057..13d3f2d0`, `git diff --word-diff=plain 911bb057..13d3f2d0` | 3 commits, one file |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` (it compares every `decision:` quotation with its decision) |
| Las condition | read `src/browser/sim/data/maps.ts:77-91` | `solving: { streak: 480 }` for Las |
| Quotations | `git grep -n -E "decision: D-(21\|129\|130\|355) " -- tests` | binding sentences only |
| Left sentences | the one search above | none of the kind left |
| Full gate | not run | the orchestrator's (`npm test`) |

## Reaches beyond the dispatch

`src/browser/sim/data/maps.ts`, read for the Las condition, as the handoff names it.

## Working copies

None made. `.runs/review-correction-1/` was not created.

## Unread material

D-21, D-129 and D-130 were read at their *Rationale* paragraphs and binding sentences, not whole. Their *Verification* and *Rejected* were not read, and the change does not touch them. D-355 was read whole in the review of the whole change; this time its changed `complies` line and the lines around it were read.

## Searches not found or unclear

- The one search for leftover sentences matches on the words listed. The same idea in other words, such as „a whole attempt at Las”, would not be found.
