# Report of the fix — review of the correction, finding 1

**Status:** done

Range: reviewed head 0c8b97c083013cb61dc9f195a7105d0d41c121be to 20039dc.

| Commit | Message |
|---|---|
| 20039dc | docs: :memo: name the process number in D-256's clause on a silent port and bring README, the skill and the script's comments to it |

## Finding 1: fixed

D-256's clause now reads, word for word, "a start whose process number is in use and whose port takes a connection and stays silent counts as running". The sentence's first part stands as it was. This matches `isRunning`, `processExists(start.pid) && (await showsItsCertificate(start))`: silence decides only once the number proved alive.

This edit changes the meaning of approved wording, and the human has not seen these words. They come from the reviewer's proposal, by your binding. The request has to show them.

| File | Added | Removed | What |
|---|---|---|---|
| `foundations/decisions.md` | 2 | 2 | D-256's clause, edited in place. No decision derives from D-256 and no invariant names it, so nothing follows from it |
| `README.md` | 1 | 1 | The same limit, in Polish, at `:19` |
| `.claude/skills/loop2-play/SKILL.md` | 3 | 3 | The same limit near `:33` |
| `.agents/skills/loop2-play/SKILL.md` | 3 | 3 | Byte-identical copy |
| `scripts/local-start.mjs` | 7 | 5 | Comments only: the head's `:21`–`:22` limit, and "the starts that have ended" at `:12`–`:13` now reads "the starts it does not find running" |

`git diff` of the script shows no changed line outside a comment. One comment was left as it stands: `showsItsCertificate`'s ("so it counts as running"), near `:244`. It speaks of that function's own answer, the number being asked one line further down in `isRunning`, and your binding names only the two places above.

## Correction of the report

Appended to `reports/correction.md` as a note dated 2026-11-02, its rows left as they were: the row of D-256 under *Return step*, and the two places that credited the human with the words of D-254's *Rejected*.

How the claim on D-256 went wrong, as the note says: I compared the clause with `showsItsCertificate` and not with `isRunning`, which holds the condition.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/invariants/test_local_start_access.py` | 0 | 16 tests, 168 s |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 | 8 tests |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors, before the commit and on 20039dc |
| `prettier --check scripts/local-start.mjs`, with the gate's flags | 0 | Formatted |
| `cmp` of the skill's two copies | 0 | Identical |

**Not run:** the full `npm test`, by your order. `tests/quality/test_quality_invariants.py` was not named and not run; the only change it reads is in comments of one script, which Prettier passed, and ESLint and the rest did not run on it. I did not repeat the reviewer's two planted directories, since no code changed.

**Left behind:** nothing. No start ran outside the tests, `.runs/local-start/` does not exist, `git status --short` prints nothing, and nothing was pushed.

## Other findings

`reports/review-correction.md` findings 2 to 8 are untouched, as ordered.

## Reaches beyond the dispatch

None.

## Searches not found or unclear

None.
