PASS 276b428917f438a78a028bd43499c4fc7259294a

# Review of the fix of slice 3 — range 85966562..276b4289

HEAD confirmed `276b4289`. One commit, one file: `tests/account-owner.test.mjs` (+33, -2); `src/server/**` unchanged. Read whole: the handoff, `fix.md`, the findings file, the fix report, the whole diff.

## Findings of the file

- **I-1 — fixed.** The outcomes test now gives the account a live session `one` (`liveSession`) and an unspent `email-confirmation` link (`digest("confirm")`) before the first call. The helper `keptAsBefore(label)` asserts that `blocked` is false, that `sessionsOf(raw, account.id)` equals `["one"]` and that `linkSpent(raw, "confirm")` is 0. It runs before any change and after each of the four outcomes (made owner, already owner, made player, already player) and after the unknown-address refusal. The expected values are fixed in the test, not read from the command.
- No existing assertion was weakened: the diff only adds lines; the two removed lines are the old `createAccount` call and the old `fixture` destructuring, replaced by versions that also bind `raw` and `account`. The role, exit-code, sentence and four-different-sentences assertions are unchanged.

## New findings in the fix diff

Critical/Important: none. Minor: none. (M-1 of the slice review — "already" outcomes asserting nothing unchanged — is closed by this fix as a side effect; M-2 is not part of the fix and stays for the review of the whole change.)

## Mutations I ran (worktree of 276b4289, rebuilt each time, `node --test tests/account-owner.test.mjs`, restored after)

| Mutation (line added after `result = database.setAccountRole(email, role);`) | Exit | Result |
|---|---|---|
| none (baseline) | 0 | 13 pass, 0 fail |
| M3: `already-owner` also calls `database.blockAccount(email)` | 1 | 12 pass, 1 fail |
| M8: `made-owner` also calls `database.blockAccount(email)` | 1 | 12 pass, 1 fail |
| M9: `made-player` also calls `database.blockAccount(email)` | 1 | 12 pass, 1 fail |

Both mutations that survived before the fix are now caught.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Build | `node scripts/build.mjs` | 0 | built |
| Typecheck | `node scripts/build.mjs --check` | 0 | clean |
| Three files | `node --test tests/account-owner.test.mjs tests/account-storage.test.mjs tests/startup.test.mjs` | 0 | 115 pass, 0 fail |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |

Not run: `npm test` through `scripts/test.py` (the cycle's own run; `node --test <file>` runs the same files).

## Reach beyond the handoff

None.

## Working copies

`.runs/review-3/wt` (worktree of `276b4289`, junction `node_modules`): the junction removed by `rmdir` first, then `git worktree remove --force` and `git worktree prune`. `.runs/review-3/` itself, with `mutate.py`, `role.orig` and `out.txt`, removed. Nothing remains; the real `node_modules` is intact and `git status` is clean.

## Unread material

none (of the fix: the diff of one file was read whole; the pattern files and decisions of the slice review are as that report states).

## Searches not found or unclear

none
