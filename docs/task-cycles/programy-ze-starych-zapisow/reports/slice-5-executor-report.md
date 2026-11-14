# Report — slice 5, executor (the browser client: the privilege, the previous save and the reset)

**Status:** `done`, with one scope deviation named below (a fixture in `tests/view/account-screen.test.mjs`).

**Worktree:** `the task's worktree`, branch `task/programy-ze-starych-zapisow`.
**Base:** `b3db0acf120d5019adbe48ffb4237de8fc810a67`. the-way pin checked: `git -C .the-way rev-parse HEAD` = `55afa8e57aa1b83c77108576a36642722e0dda15`, matching the gitlink.

## Commits

- `19ea8b1c` — `feat: :sparkles: add the previous-save flag of the account and the browser client's previous-save load and reset calls, each a success only for its own status` (author `mariusznn@gmail.com`, the address the git rules give for this account). One commit holds the tests and the change, so every commit of the branch stays green.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/account-api.ts` | 52 | 2 |
| `src/browser/view/account-card.tsx` | 7 | 2 |
| `tests/account-api.test.mjs` | 287 | 8 |
| `tests/view/account-screen.test.mjs` | 12 | 2 |

`tests/view/account-screen.test.mjs` is outside the handoff's *Change* list. See "Deviation" below.

## Checks

Commands run from the worktree root, with exit codes.

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/account-api.test.mjs` (before the change; new cases written first) | 1 | 12 of 32 failing, 20 passing. Failing: the account success case, the other-status case, the malformed-account case, the register outcome case, the error-status case, both new request-shape cases, the new document/null case, the new malformed-body case (after its precondition was added), the new load-refusal case, the new reset-204 case, the new reset-refusal case. |
| 2 | `npm test -- tests/account-api.test.mjs` (after the change) | 0 | 32 of 32 pass |
| 3 | `npm test -- tests/view/account-screen.test.mjs` (after the client and the card change, before the fixture update) | 1 | 1 of 131 failing: "a sign-in and a registration hand the account on with the outcome of the message, and keep no password". Cause: `accountOf` in `account-card.tsx` now copies `previousSaveAllowed`, and the test fixture `ACCOUNT` has no such field, so `deepEqual` fails. |
| 4 | `npm test -- tests/view/account-screen.test.mjs` (after adding `previousSaveAllowed: false` to the two fixtures) | 0 | 131 of 131 pass |
| 5 | `npm test -- tests/view/menu-bar.test.mjs` | 0 | 28 of 28 pass |
| 6 | `npm run typecheck` | 0 | clean |

Not run, with reason:
- `npm test` without a file (the product gate) and `python -B .the-way/elements/common/foundation_check.py`: left to the orchestrator, per the handoff.
- The run before the stub existed (build error TS2353 for the missing interface entries) is not counted as a failing run; it was a wrong-reason failure and was fixed by adding the interface entries before run 1 of check 1.

Invariant tests: the cases carry the markers `// invariant: account-client-outcomes` and `// invariant: account-client-requests`, as the existing account cases do. The `account-client-outcomes` cases were seen failing in check 1 and passing in check 2. No invariant test was changed or weakened; no existing assertion was relaxed. The only existing edits are fixtures (the account bodies now carry `previousSaveAllowed`) and two preconditions added to new tests.

## Own-work check (section 3)

- **Requirement:** the client must refuse an account body whose `previousSaveAllowed` is missing or not a boolean, for the account, the login and the registration alike, and must carry a `true` value through unchanged.
- **Check:** the test "a success status with a body that is not an account with string id and email is no success", extended with four bodies that have a valid `emailConfirmed` and an invalid or missing `previousSaveAllowed` (missing, `null`, `"true"`, `1`), run for `register`, `login` and `currentAccount`; plus the test "the success status of each call with an account body gives that account and no other property", whose bodies carry `previousSaveAllowed: true`.
- **What it showed:** before the change, the missing-flag bodies were accepted and the flag was dropped (failing check 1). After the change, all pass (check 2).
- **Requirement 2:** the new document shape must be exact (`previous` only; `version` a positive safe integer; `game` an object; no `revision`). **Check:** the "not exactly previous, null or version and game" test with 23 bodies, preceded by a positive precondition (`{"previous":null}` is a success) so the test does not pass on a stub that always refuses. **Showed:** all bodies refused as `unexpected` after the change.

## Server behaviour verified against the client

Each line below was read in `src/server/account-routes.ts` in the worktree at HEAD `b3db0acf`:
- `GET /api/previous-saved-game`: 401 `unauthenticated` at lines 552-553; 403 `previous-save-forbidden` at lines 556-557 (message at 112-113); the 200 body is `{"previous":{"version":N,"game":…}}` or `{"previous":null}` at lines 560-567. The client's `previousSavedGameOf` accepts exactly this shape.
- `POST /api/saved-game-reset`: a body with any field gets 400 `invalid-request` at lines 575-576, before the session check; 401 at lines 593-594 (blocked); 403 `previous-save-forbidden` at lines 596-597; 204 for a move (588) and for nothing to move (591). The client's `resetSavedGame` (`noContentRequest("/api/saved-game-reset", {})`) takes only 204 as success and sends the empty-object JSON body.
- The account body: `accountBody` at lines 153-160 returns `id`, `email`, `emailConfirmed`, `previousSaveAllowed`. The client's `accountOfBody` requires all four.
- `previous-save-forbidden` is in `refusalCodes` on the client, matching the server's code.

## Choices made

1. **Load call's shape.** `loadPreviousSavedGame` reads through its own reader `previousSavedGameOf` and a function that mirrors `loadSavedGame`, not through `request()`. Reason: `request()` treats a `null` value as a failure, and the `null` case is a success here. Way rejected: generalising `request()` to carry a null success, which would change the shared helper for two callers. Cost if wrong: about 20 lines of parallel structure; a later refactor could merge them.
2. **Reset call's shape.** `resetSavedGame` uses `noContentRequest`, the helper logout already uses; the spec asks for "in the manner of the logout".
3. **Return type.** `PreviousSavedGame` is an exported interface `{ version: number; game: object }`, the value of a document. The `null` is carried as the whole result's value, as the spec asks.
4. **Test rewrite of the redirect case.** The new redirect case has a precondition that both requests reached the local server, so it cannot pass vacuously.

## Deviation

The handoff said "no change of `tests/view/account-screen.test.mjs` is expected". That was wrong. The card's `accountOf` now copies the field the spec requires it to copy, so the view test's `ACCOUNT` and `UNCONFIRMED_ACCOUNT` fixtures, which are typed as an account, must carry `previousSaveAllowed: false`. Cause verified by check 3. The change is two object literals, 12 added and 2 removed lines. Its effect is limited to the fixtures; no assertion was changed. Reversal would leave the view test failing. The orchestrator should decide whether to keep it in this slice (recommended) or move it.

## Spec and foundation differences

- The entries and the spec agree on the client's behaviour. The spec's list of the account's fields (`previousSaveAllowed`) and the entry E14 (`account-client-outcomes`: "the booleans `emailConfirmed` and `previousSaveAllowed`") match.
- Nothing in the foundation conflicts with the change. The spec binds where the entries differ; none found for this slice.

## Reach beyond the handoff

- `tests/view/account-screen.test.mjs` (see Deviation).
- `src/server/account-routes.ts`: read in parts, lines 95-170, 500-670, and a grep for the previous-save and reset names. Not read whole (see Unread material).
- `guidelines/styleguide-browser-view.md` was read whole (979 lines) because the handoff names it. No visual rule applies: the change alters no rendering and no style. `ui_check.md` was not read, because section 3 applies it only to a change that alters what a screen shows, and this change does not.
- `src/browser/AGENTS.md`, `guidelines/coding.md`, `guidelines/coding-browser-api-client.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md` were read whole.
- `foundations/part_map.md`, the entry `## browser-view` (lines 3-27; the next heading `## simulation` is at line 28). Read whole.
- Foundation entries read whole, each by its range: D-109 (2123-2135), D-117 (2237-2251), D-204 (3922-3954), D-209 (4106-4148), D-394 (9650-9664), D-396 (9680-9694), invariants `account-client-requests`, `account-client-outcomes`, `saved-state-http-exchange` (808-827, 1018-1027), glossary `previous save` and `previous-save privilege` (around 255-265).

## Unread material

- `src/server/account-routes.ts`: read in parts only (lines 95-170, 500-670 and the grep matches). The handoff named the file whole; the parts read cover every route the client calls and the account body.
- `ui_check.md`: not read; not applicable to this change (see Reach).
- `project-level/technology/reserved_choices.md`: not read; the slice needed no language, framework, library, store or place choice.

## Searches not found or unclear

- None. Each identifier the slice needed was found: the two routes, the account field, the refusal code, and the foundation entries by their ranges.
- Unclear: the handoff's statement "no change of that file is expected" for `tests/view/account-screen.test.mjs`, which proved false (see Deviation).

## Problems observed

- None in the product. The one surprise was the view-test fixture above.
- The worktree's `.runs/` directory is git-ignored (`git status` clean after the commit).
