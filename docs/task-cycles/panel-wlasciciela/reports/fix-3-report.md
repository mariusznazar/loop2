# Fix report — slice 3, finding I-1

## Status

`done`

Finding I-1 (blocking): the outcomes test never checked that a real change of role ends no session, stops no link and blocks nothing.

## Commits

- `276b4289` test: :white_check_mark: check that each outcome of the role command ends no session, stops no link and blocks no account (D-410, D-137). One file: `tests/account-owner.test.mjs` (+33, −2).

The command `src/server/account-role.ts` is unchanged. The handoff allowed a change there only if a test could not be written without it; it could be.

## What changed in the test

In `the role command gives and takes the owner role by address beside an open connection and says which outcome it reached`:

- Before the first call, the account gets a live session `one` and an unspent email-confirmation link (`digest("confirm")`).
- A helper `keptAsBefore(label)` asserts: `blocked` is false, the sessions of the account are `["one"]`, and the link is unspent.
- It runs before any change and after each of the four outcomes, and after the unknown-address refusal.

## Mutations (applied by hand to `src/server/account-role.ts`, run, restored)

| Mutation | Added line in the command | Command | Result |
|---|---|---|---|
| M8: `made-owner` also blocks the account | `if (result.outcome === "made-owner") database.blockAccount(email);` | `npm test -- tests/account-owner.test.mjs` | exit 1; 12 pass, 1 fail: `made owner: the account is not blocked` (actual `true`) |
| M-already: `already-owner` also blocks the account | `if (result.outcome === "already-owner") database.blockAccount(email);` | `npm test -- tests/account-owner.test.mjs` | exit 1; 12 pass, 1 fail: `already owner: the account is not blocked` |

After each mutation the file was restored with `git checkout -- src/server/account-role.ts`. `git status` then showed only the test file modified, and no `MUTATION` marker remained in the command file.

## Checks (command and exit code)

| Check | Command | Exit | Result |
|---|---|---|---|
| Unmutated owner tests, after the test change | `npm test -- tests/account-owner.test.mjs` | 0 | 13 pass, 0 fail |
| Typecheck | `npm run typecheck` | 0 | clean |
| Owner tests | `npm test -- tests/account-owner.test.mjs` | 0 | 13 pass, 0 fail |
| Storage tests | `npm test -- tests/account-storage.test.mjs` | 0 | 84 pass, 0 fail |
| Startup tests | `npm test -- tests/startup.test.mjs` | 0 | 18 pass, 0 fail |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Prettier | `npx prettier --check tests/account-owner.test.mjs` | 0 | formatted (I ran `npx prettier --write` on the file first) |
| ESLint | `npx eslint tests/account-owner.test.mjs` | 0 | clean |

`src/server/account-role.ts` was not changed in the commit, so its Prettier and ESLint checks are not repeated here; they passed in the slice's own report. The product gate (`npm test` with no file) was not run.

## Minor findings

Not fixed, as the handoff directs.

## Unread material

`none`. The fix handoff and the findings file were read whole.

## Searches not found or unclear

`none`.

## Working copies

None made. The mutation runs used the worktree itself, each file restored from its commit. The run logs are in the session scratchpad (`a file of the orchestrator's scratch directory`), not in `.runs/executor-3/`; nothing there needs removing from `.runs/`.
