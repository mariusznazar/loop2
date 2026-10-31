PASS 7b0a391ecd6a6c9af08d3058e83a14594feee8a6

# Review of the fix of Slice 3, task `reset-hasla`

Range `0af565f..7b0a391`, one commit, one file: `tests/http.test.mjs` (+53/-1). `git rev-parse HEAD`
is `7b0a391`. The product code is unchanged. Bounded by `reports/17-slice3-fix-findings.md`, as
`.the-way/task-cycle/review/fix.md` gives.

## Findings file

**Finding 1: fixed.** Not contested.

The fault the finding named now fails. With a clear that installs a new entry and copies the
reservation (`replaces-entry-keeping-count`), exactly the two new cases fail, with exit 1:

- "a login in progress at a clear that is released leaves the failures made after the clear counting"
  (`tests/http.test.mjs:1604-1622`)
- "a login in progress at a clear leaves no reservation behind once it has failed"
  (`tests/http.test.mjs:1624-1643`)

The release path the finding called unexercised now runs on a cleared entry, twice, with `inFlight`
checked. The two cases are the two the finding gave, with the same expected values (4 and 5), and
those values come from D-102 rather than from the program: five failures in the window, one already
made in the first case, and 16 minutes past the 15-minute window in the second.

I tried two neighbours of that fault, so the cases would not be shaped only to the one I had named:

- `replaces-entry-and-guards-forget`, the same replacement with `forget` comparing the entry object,
  so that the old ticket cannot delete the key: both new cases fail. By reading, the first fails
  here through the reservation that nothing settles, not through the dropped key; the run shows the
  failure, not its value.
- `replaces-entry-without-count`, a replacement that does not copy the reservation: the existing case
  and the release case fail.

The last assertion of the existing case, `tests/http.test.mjs:1586-1590`, still speaks of a lock:
"its failure counts after the clear: five failures lock the address". The finding allowed this: add
the second case, or reword. The second case is added, and the sentence is true of the correct code.
Under the fault that assertion still passes for another reason, and the two new cases are what
catch it.

## What the fix itself broke

Nothing: no Critical or Important finding in the fix diff. The faults caught before are all still
caught (table below), the whole file passes, and ESLint, Prettier and the typecheck are clean.

Both new loops end on their own: each is refused by the email limit, and if that limit were broken,
by the client address's limit of twenty. No fault run hung.

### Minor

**A. The first new case's comment gives half of the mechanism.** `tests/http.test.mjs:1606-1607`:
"so that the old ticket's release lands on an entry nobody reads". Under the fault the release also
deletes the key through `forget`, which drops the live new entry, and that is what gives the 5 the
case refuses. The fix report repeats the half. The spec's sentence is "would let an old ticket drop a
live one". The test is right either way, as the guarded variant above shows; only the next reader
is misled about why it fails. Not blocking, and does not reopen the review.

## Minor findings of the review before

Findings 2 to 6 of `reports/16-slice3-review-report.md` stay as graded, as the coordinator says, and
the fix did not touch them.

## Declined to judge

- Behaviour outside the fix diff, which `fix.md` bounds out. Nothing new was set aside.

## Checks run

All in a scratch export of `7b0a391` (`git archive`), with `node_modules` linked from the worktree,
removed afterwards. Faults were applied to the compiled `dist/server/account-policy.js`. The reviewed
worktree stayed clean: `git status --short` empty, HEAD `7b0a391`.

| Check | Result |
|---|---|
| `git diff --stat 0af565f..7b0a391` | one file, `tests/http.test.mjs`, +53/-1 |
| `src/server/account-policy.ts` of the export against `7b0a391` (`cmp`) | identical |
| `node scripts/build.mjs --check` | exit 0 |
| `node scripts/build.mjs` | exit 0 |
| `prettier --no-config --no-editorconfig --ignore-path .gitignore --check` on `src/server/account-policy.ts` and `tests/http.test.mjs` | exit 0 |
| `eslint --max-warnings 0 tests/http.test.mjs` | exit 0 |
| `node --test tests/http.test.mjs` | exit 0, 48 pass, 0 fail |
| fault `replaces-entry-keeping-count` | exit 1, 2 cases, the two new ones |
| fault `replaces-entry-and-guards-forget` | exit 1, 2 cases, the two new ones |
| fault `replaces-entry-without-count` | exit 1, 2 cases |
| fault `deletes-entry` | exit 1, 2 cases |
| fault `zeroes-reservation` | exit 1, 2 cases |
| fault `no-op` | exit 1, 4 cases |
| fault `leaves-lock` | exit 1, 3 cases |
| fault `leaves-failures` | exit 1, 1 case |
| fault `clears-client-table` | exit 1, 1 case |
| fault `lifts-every-lock` | exit 1, 1 case |

Each fault ran with `node --test --test-name-pattern="clear|password rules" tests/http.test.mjs`. The
harness is
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\mutate.mjs`.

Not run:

- `npm test -- tests/quality/test_quality_invariants.py`: it sweeps the repository through git, and
  the export has none; I ran ESLint and Prettier directly on the changed test file. The fix report's
  exit 0 stands as its claim, unverified by me.
- The full gate: the coordinator excludes it.

## Reaches beyond the dispatch

None beyond the first review's: the code and the spec passages read there were enough.

## Searches not found or unclear

none
