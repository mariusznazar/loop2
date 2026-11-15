# Report — executor of slice 9 (the address `#/konta` and the screen in the registry)

**Status:** done with concerns. None blocks the slice; the concerns are in "Questions and concerns" below. One failure in `tests/view/account-screen.test.mjs` is pre-existing at the base commit, not from this slice.

## Commits

Base `757f4a90`, branch `task/panel-wlasciciela`.

- `c6a88e74` — `feat: :sparkles: add the address #/konta and the list of accounts to the screen registry, for an owner only (D-281, D-410, D-411)`

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/screen-address.ts` | 17 | 4 |
| `src/browser/view/game-view.ts` | 31 | 7 |
| `src/browser/view/programs-entry.ts` | 3 | 1 |
| `src/browser/view/accounts-entry.ts` | 2 | 5 |
| `tests/view/screen-address.test.mjs` | 76 | 20 |
| `tests/view/screen-registry.test.mjs` | 42 | 2 |

(From `git show --numstat HEAD`.)

## What was made

- `screen-address.ts`: `Screen` has the kind `accounts`, which `KIND_NAMED` names (so the registry checks an entry for it). `readScreenAddress("#/konta")` reads it; `screenAddress` writes `#/konta`; `markedMenuItem` gives `null`; `resolveScreen(named, state, owner)` gives the screen for an owner and Siedziba for any other account. `owner` is a required third parameter.
- `game-view.ts`: `createGameView` takes `role?: AccountRole` (left out, `player`) and passes `owner` to its `firstScreen`, to the address listener and to `createProgramsEntry`. It registers `createAccountsEntry` in the table for every account, last after Mapy. Its `client` option is widened by the five list and operation methods (see choice 1).
- `programs-entry.ts`: takes `owner` as a required option and passes it to its one `resolveScreen` call (the deleted-program fallback).
- `accounts-entry.ts`: amendment A4 done. `kinds: ["accounts"]`; the `KIND` constant and the cast are gone, and the now unused `Screen` type import is dropped (ESLint reported it).
- Tests: `screen-address.test.mjs` gets the eighth address in the round-trip table and four new tests (read, an owner's address opening the list at a reload, a player's opening Siedziba, no bar item); `screen-registry.test.mjs` gets the sixth entry in its table, a refusal test for a table without the accounts entry, and a test that the list is built on entering and taken down on leaving. The 15 existing `resolveScreen` calls in `screen-address.test.mjs` gained the argument `false` (a player), with no assertion changed.

## Checks

| Check | Command | Exit |
|---|---|---|
| Failing run, tests written first, before the product change: 4 of 61 fail in `screen-address` (`#/konta` read, round trip, marks no item, owner's reload); 1 of 15 fails in `screen-registry` (the refusal without the accounts entry). The registry test "built on entering and taken down" passes already, since it uses plain test entries and the registry is generic. | `npm test -- tests/view/screen-address.test.mjs`; `npm test -- tests/view/screen-registry.test.mjs` | 1; 1 (evidence `reports/executor-9-evidence/first-address.txt`, `first-registry.txt`) |
| Typecheck | `npm run typecheck` | 0 (`typecheck-final.txt`) |
| The slice's tests | `npm test -- tests/view/screen-address.test.mjs` | 0 (61 of 61) |
| The slice's tests | `npm test -- tests/view/screen-registry.test.mjs` | 0 (15 of 15) |
| The slice's tests | `npm test -- tests/view/previous-save.test.mjs` | 0 (44 of 44) |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0, prints `0 errors` |
| Prettier (handoff), first run | `npx prettier --check <6 files>` | 1: only `tests/view/screen-address.test.mjs` (the long `resolveScreen` lines) |
| Prettier, after `npx prettier --write tests/view/screen-address.test.mjs` (only my `resolveScreen` lines changed) | `npx prettier --check <6 files>` | 0 |
| ESLint (handoff), first run | `npx eslint <6 files>` | 1: `accounts-entry.ts` 20:15 `'Screen' is defined but never used` (a consequence of removing the cast) |
| ESLint, after dropping that import | `npx eslint <6 files>` | 0 |
| Other view tests that build the game view: `accounts-screen` | `npm test -- tests/view/accounts-screen.test.mjs` | 0 (21 of 21) |
| Other view tests that build the game view: `chronicle-game` | `npm test -- tests/view/chronicle-game.test.mjs` | 0 (4 of 4) |
| Other view tests: `end-question` | `npm test -- tests/view/end-question.test.mjs` | 0 (17 of 17) |
| Other view tests: `end-window-game` | `npm test -- tests/view/end-window-game.test.mjs` | 0 (27 of 27) |
| Other view tests: `account-screen` | `npm test -- tests/view/account-screen.test.mjs` | 1: 130 pass, 1 fails, "a sign-in and a registration hand the account on with the outcome of the message, and keep no password" (line 6123). **Pre-existing**: the same run with the four product files at `757f4a90` (`git show HEAD:<file>`, restored afterwards) gives the same 130 pass and 1 fail (`base-account-screen.txt`). The stub at line 6131 hands `role: "admin"` through, and the expectation has no `role` field. Not touched by this slice. |
| Mutation (own-work check): the owner branch of `resolveScreen` replaced by `return named;` | `npm test -- tests/view/screen-address.test.mjs` | 1, caught by "a player's address of the list of accounts opens Siedziba" (`mutant-address.txt`); the file restored from a backup and the diff checked |

Not run, with the reason: the product's gate (bare `npm test`), which the handoff reserves for the orchestrator. `tests/view/menu-bar.test.mjs`, `owner-panel`, `react-controls` and the invariants on styles were not run; they do not read this slice's files (the slice touches none of the styles or the menu).

## Own-work check (section 3)

- Requirement my work most likely does not meet: the address `#/konta` must open Siedziba for a player and the list for an owner, and the game view must build without the new option (every existing caller).
- Check: the mutation above, plus the existing `previous-save` (44) and `accounts-screen` (21) tests and the four other view files that build the game view, all run after the change.
- Result: the mutation was caught at once; the callers and the other view tests stay green, except the pre-existing `account-screen` case above.
- Screenshot / UI: no check of how the screen looks. The slice changes no drawing; the list screen is still reachable only through `#/konta`, which the bar does not link yet (Slice 10).

## Weakest point

`resolveScreen` takes `owner` as a required parameter, so a caller that forgets it fails at the TypeScript level (checked by the typecheck, which passed), while the `.mjs` test calls were given `false` by hand. The check of it is the owner-versus-player pair of tests and the mutation above.

## Choices, with the way rejected and the cost if wrong

1. **The five list and operation methods come in the `client` option, not in a separate `accounts` option.** The spec asks for "the client methods of the screen as options". A separate option that every existing caller and test would have to pass, or a stand-in when it is left out, was rejected. The page's one client already carries the methods, and the entry calls them only for an owner's screen. Cost if wrong: the `client` type is wider, and a later change that needs a different client for the list changes one option line and the game view's type.
2. **`owner` is a required parameter of `resolveScreen` and of the programs entry, and the calls in `screen-address.test.mjs` pass `false`.** Rejected: an optional `owner = false`, which would let a caller forget the role silently. Cost if wrong: the 15 test calls are a mechanical change, and a future caller must pass the value.
3. **`role` on `createGameView` is optional and `player` when left out** (as the handoff asks), and `owner` is derived once in `game-view.ts`.
4. **The accounts entry sits last in the table** (after Mapy), so the page's document order has the list after the other while-shown screens. The table order is chosen on purpose per D-408; no order was asked for by the spec.
5. **The registry test "built on entering and taken down on leaving" is not a failing-first test.** It drives the generic registry with plain entries, so it passes before the change. It is kept as the behaviour check of the registry with the new kind; the failing-first check of the kind is the refusal test and the address tests.

## Reach beyond the handoff (section 1)

- `.runs/task-cycles/panel-wlasciciela/reports/executor-7-report.md`: read whole (named by the handoff).
- `foundations/decisions.md` D-410 (`:10894-10910`) and D-411 (`:10911-10936`), read whole; D-408 (`:10864-10893`) read whole (the handoff names it); D-280 and D-281 read at their current ranges (`:7296-7365`, `:7366-7411`), since the handoff's old ranges `:7278-7340` and `:7342-7382` point at the wrong text now.
- `.the-way/task-cycle/change/slice.md`: read whole, as the method names it.
- `.runs/task-cycles/panel-wlasciciela/plan.md` and `task-frozen.md`: read to find the slice's text and the passages in the handoff's *Read* line (task-frozen 20-44 read as the handoff gives 29-38).
- `guidelines/styleguide-browser-view.md` (whole, read in two pages) and `guidelines/testing.md` (whole, in two pages), both named by the *Read* line.
- `src/browser/view/accounts-entry.ts`, read whole (the file the handoff names, made by Slice 7).
- `tests/view/previous-save.test.mjs` (`createGameView` call at 137) and `tests/view/account-screen.test.mjs` (the call at 2560): read only at the `createGameView` calls, to see how the callers pass the client.
- `src/browser/account-api.ts` lines 1-30 (the `AccountRole` type): read to name the role type in the option.
- `.the-way/AGENTS.md` / the worktree `AGENTS.md` and `CLAUDE.md`: already in context.
- The user's `.ai/rules/git.md`, read on the hook's request before the commit.

## Working copies

- `.runs/executor-9/` (my outputs, the backup `screen-address.ts.bak` and the copies `mine/` of my four product files, made for the base check): **removed**. The evidence I keep is in `reports/executor-9-evidence/`. No worktree, clone or screenshot was made. The base check used `git show HEAD:<file>` into the four files, and my files were copied back from `mine/` and checked by `git status` and the diff stat before the commit.

## Unread material

- `guidelines/coding-browser-module.md`: read whole.
- `guidelines/coding.md`: read whole.
- `guidelines/testing.md`: read whole (two pages, lines 1-477).
- `guidelines/styleguide-browser-view.md`: read whole (two pages, lines 1-1037).
- `src/browser/AGENTS.md`: read whole.
- `.the-way/task-cycle/change/ui_check.md`: not read. The method reads it "before you finish a change that alters what a screen shows"; this change alters no drawing (the list is reached only at `#/konta`, and Siedziba and the other screens draw as before), so I judged it not to apply. The orchestrator may judge otherwise.
- `src/browser/view/screen-registry.ts` lines 151 onward: not read; the handoff names no part of it, and the registry logic is unchanged.
- `src/browser/view/accounts-screen.tsx`: not read; the slice does not touch it, and the *Read* line names only the entry.
- The D-408 test citation: `tests/view/screen-registry.test.mjs` cites D-408 (see concern 1).

## Searches not found or unclear

- None for the slice's own needs. Unclear: the handoff's *Read* line gives the old ranges for D-280 and D-281 (`:7278-7340`, `:7342-7382`); the current ranges are `:7296-7365` and `:7366-7411`, found by the heading `### D-nnn`. I read the current ones.

## Questions and concerns

1. **D-408 and the tests it cites.** D-408 says a new screen adds "its address and its position on the menu bar". The list screen has no position on the bar (D-280, D-281, and the bar stays the same for a player and an owner), so the screen does not follow D-408's example in that respect. Does the cited test `tests/view/screen-registry.test.mjs` collide with the new screen? The test (`D-408` lines in the file, which I did not change) checks the registry's mechanics on plain entries, and the new entry follows the same mechanics, so it does not collide. The rule's words about the bar do not fit a screen with no bar item; the map-run screen has none either (D-280). I did not change D-408. The orchestrator decides whether D-408 needs a sentence for a screen with no bar item.
2. **Pre-existing failure in `tests/view/account-screen.test.mjs`** at line 6123 ("a sign-in and a registration hand the account on…"). It fails at the base commit `757f4a90` too (130 pass, 1 fail, same case). The stub at line 6131 returns `role: "admin"`, and the expectation has no `role`. It probably comes from the account client's `role` field (commit `175d6d42`, Slice 5), which the view test's stub and its expectation do not follow. Not in this slice's *Change*; the orchestrator should decide who fixes it and when, and whether the full gate (bare `npm test`) will show it.
3. **The `client` option** is widened instead of a separate `accounts` option (choice 1). If the orchestrator wants the separate option, the change is in `game-view.ts`'s `GameViewOptions` only.
4. **The `accounts-entry.ts` amendment A4** is done as written: `kinds: ["accounts"]`, the cast and the `KIND` constant are gone, and the unused `Screen` import is dropped (an ESLint finding, not in the amendment's words, but a direct consequence).
5. **`programs-entry.ts` and the amendment**: the owner value reaches the programs entry as the option `owner`, which the game view passes. The handoff's note on `role` (the name `role` in `app.ts`) is not affected: this slice does not touch `app.ts`.
6. The first-run failing count of the registry test: the registry refusal fails as expected (`no screen entry holds the kind accounts` is not thrown before the change, because the kind is not yet in `SCREEN_KINDS`).
