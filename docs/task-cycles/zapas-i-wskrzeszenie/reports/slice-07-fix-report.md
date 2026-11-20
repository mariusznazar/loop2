**Status:** done

# Fix report, slice 7: finding I1

## Findings

- **I1 (Important), `tests/sim/saved-game.test.mjs:2474`: fixed.** The line quoted D-179 as "at a completion only what that list names goes to the chest", a tail of the sentence. It now quotes the whole sentence from its start: "The trip plan is a field of the program, both its lists are bound at the start of a map run — the list of what comes out as a frozen snapshot — and at a completion only what that list names goes to the chest" (as `foundations/decisions.md:8352` has it). Accepted by the foundation check, shown below.
- The Minor findings are not part of this fix; none was touched.

## Commit

- `f2c9c335` on `task/zapas-i-wskrzeszenie`: `test: :white_check_mark: quote D-179 from the start of its sentence, ...`. One line changed (+1 / -1), in `tests/sim/saved-game.test.mjs` only.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Foundation check, as the coordinator asked | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 | 73 errors (the review saw 74). None names `tests/sim/saved-game.test.mjs`; the 73 that stand are in files of later slices (e.g. `tests/sim/catch-up.test.mjs`), as the plan has them. |
| Saved-game tests | `npm test -- tests/sim/saved-game.test.mjs` | 0 | 44 pass, 0 fail |

- Not run: the full `npm test` and any other gate check, as instructed.

## Own-work check

- Requirement: the `decision:` line of the D-179 quotation begins a sentence of D-179 as the foundation has it.
- Check: the foundation check run above, which reports no error for the file, and the saved-game tests, which still pass (the quotation is a comment, so the tests are unaffected).
- Result: as expected. No other line changed.

## Contested findings

- None. I hold I1 right, and its fix is the one the review proposed (the whole sentence).

## Unread material

- none. The findings file was read whole; `.the-way/task-cycle/change/fix.md` was read whole.

## Searches not found or unclear

- none. I did not look for other tails of sentences in `tests/sim/saved-game.test.mjs`: the foundation check is what reports them, and it reports none for this file.

## Working copies

- `.runs/slice-07-fix` held the check outputs. It was removed by its full path; no `git worktree` was made.
