# Correction report — the human's remark on request #43, task `zapis-stanu-na-serwerze`

- **Status:** done
- **Base:** `f7d8234` · **Commit:** `776acbc` docs: :memo: say in the saver's comments that only the
  moment during the save before a logout that goes on is dropped (on `task/zapis-stanu-na-serwerze`)
- **Method:** `.the-way/task-cycle/change/SKILL.md`, a correction for the human's remarks

## The remark, as made, and how it was met

Remark: the human's decision on I-2 of `reports/32-return-fix-review-report.md`, "popraw ten
komentarz". I-2, in the reviewer's words: the header clause "after which nothing more is sent
(D-184)" is false. After the answer to the save before logout, the saver is not halted: a later
`moment()` sends, and the 30-second check sends a changed state. When `POST /api/logout` fails, the
game stays and keeps saving. The inline comment "A logout that goes on takes the game away; only a
failed one keeps saving." overstates the same thing.

Met, comments only, in `src/browser/view/game-saver.ts` (+7 −6):

- Header (`:1-8`): "…every moment of saving during one coalesced into one more save after its
  answer, except a moment asked for during the save before a logout that goes on, which is dropped
  (D-207); a check every 30 real seconds and at a hidden page that sends only a changed state; and
  the header sentence…". The rest of the paragraph was only re-wrapped. This matches D-207
  (`foundations/decisions.md:3650-3652`): "a moment of saving during one is sent after its answer,
  unless that request is the save before a logout that goes on (D-97)".
- Inline (`:186-188`): "The logout goes on, and its session's end takes the game away, so the moment
  asked for during this save is dropped (D-207). The saver goes on: when the logout's request fails,
  the game stays and later moments and checks still send." This matches the code. The block
  `pending = false; return;` drops only the pending moment. `halted` is not set, so `moment()`
  (`:211-215`) and the interval's `check` still send. `app.ts` keeps the game when the logout request
  fails.

No code changed: `git show 776acbc` shows only comment lines.

## Checks

| Command | Exit |
|---|---|
| `npm test -- tests/view/game-saver.test.mjs` | 0 (17 pass, 0 fail) |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (5 tests, OK) |

Not run: `npm test` with no argument (the cycle's gate), and `foundation_check.py` (no foundation
file changed). No test was written: a comment takes none.

## Searches not found or unclear

- The handoff said the header was "lines 1-8 now". At `f7d8234` the header block is `:1-8`, and the
  wrong clause stood at `:4-5`. It cited D-207, as the renumbering left it, not D-184 as the review
  quotes it. I corrected it under D-207.
- The inline comment stood at `:186`, as the handoff gives. After the correction it spans `:186-188`.
