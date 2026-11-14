PASS 4e1decb267358d61c1e0258209f4d09bf366a2e8

# Slice 1 — review of the fix

Fix range `896b750993bec754de4cf5efd3596d324ab8b355..4e1decb2` (one commit, `4e1decb2`, head of the worktree `the task's worktree`; `git rev-parse HEAD` gives `4e1decb267358d61c1e0258209f4d09bf366a2e8`; `git status --short` empty before and after). The diff is 69 added lines in `tests/account-storage.test.mjs` and nothing else; `src/server/database.ts` is unchanged. I changed no tracked file and made no commit.

Counts: blocking 0, Minor findings new in the fix 0, out of scope 0.

## The findings file, one by one

**I1 (Important, blocking) — fixed.**

- The defect was that no test showed the move, the reset and the privilege write touching only the account they name, and that no new case carried `player-save-isolation`. The new case "the move, the reset and the privilege write touch only the account they name, and another account's saves and privilege stay as they were" carries `// invariant: player-save-isolation` and `// invariant: previous-save-slot`. It gives a neighbour account a current save (version 2, revision 2) and a previous save (version 1, revision 1) and no privilege, then grants the first account the privilege, saves a higher version for it (its own move), and resets it. It then reads the neighbour's current save, previous save and privilege as written out literally, and shows the neighbour's own reset answering `unprivileged` with its current save unchanged.
- Expected values are written out in the case, not computed from the code (`guidelines/testing.md`, "Test inputs and expected values").
- The case passes on the new head: `npm test -- tests/account-storage.test.mjs` exit 0, 76 of 76.
- My three mutations fail it, in a scratch copy of `4e1decb2` (each run on the one changed line of `src/server/database.ts`, the file restored after each run):

| Mutation | Exit | Failing case |
|---|---|---|
| M21 reset deletes every account's current save (`WHERE account_id = ? OR 1 = 1`) | 1 | the new case only |
| M22 the move copies every account's current save (`WHERE account_id = ? OR 1 = 1` in the `INSERT … SELECT`) | 1 | the new case only |
| M23 the privilege write grants every account (`WHERE id = ? OR 1 = 1`) | 1 | the new case only |

The reporter prints a failing case three times, so the tool's `failing: 3` is one case each. The three mutations had survived the head `896b7509`, so the new case is what catches them. For contrast M24 (the reader of the previous save ignoring the account) now fails 9 lines, the new case among them.

**M1, M2 (Minor)** — not part of the fix by the coordinator's message and the findings file; not reopened here. Both stand as reported in `slice-1-reviewer-report.md` for the review of the whole change.

## The fix diff itself

- No new Critical or Important finding. The case is deterministic (no clock, no randomness, no concurrency), uses the same `fixture` helper as its neighbours and a second account created through `createAccount`, and sits before the byte-limit case with unchanged neighbours.
- Marker rule: the new case carries two markers, one per `// invariant:` line, as the other cases do. `player-save-isolation` is now carried by a slice 1 test, as the plan's entry row E17 ("Slices 1, 2 (their tests)") asks.
- No assertion of an existing test was changed, weakened or removed; the diff adds lines only.

## Checks I ran

| Command | Where | Exit |
|---|---|---|
| `npm test -- tests/account-storage.test.mjs` | worktree at `4e1decb2` | 0 (76 tests, 76 pass) |
| `npm run typecheck` | worktree at `4e1decb2` | 0 |
| `npx prettier --check tests/account-storage.test.mjs` | worktree | 0 |
| `npx eslint tests/account-storage.test.mjs` | worktree | 0 |
| `npm test -- tests/account-storage.test.mjs` on the unmutated scratch copy of `4e1decb2` | scratch | 0 (76 of 76) |
| the same command with M21, M22, M23, M24 each applied by `scratchpad/mutate.py M21 M22 M23 M24` | scratch | 1, 1, 1, 1 |

Not run: the product's gate and `foundation_check.py` (the orchestrator's); the backup tests and the Docker stream test (the fix touches neither, and `database.ts` is unchanged).

## Reach beyond the dispatch

- `.the-way/task-cycle/review/fix.md` (named by the method for this variant), read whole.
- `reports/slice-1-findings.md` and `reports/slice-1-fix-report.md`, read whole.
- The scratch mutation script from the earlier review (`scratchpad/mutate.py`), reused unchanged; a fresh `git archive 4e1decb2` into the scratchpad with a `node_modules` junction, which I removed afterwards.

## Unread material

- `tests/account-storage.test.mjs` beyond the diff hunk and the run output: not read whole, as in the first review.
- `foundation-entries-report.md` and `plan.md`: not read in this round.

## Searches not found or unclear

none
