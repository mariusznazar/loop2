# Report — executor of slice 9

**Status:** done

**Commits:** `24acd7e8f51ce13dedc5a23e775b8bee0ccf68ab` (base `4f75e190fe824fc420f15df6eaa7d087fb7ea018`) and the fix `5824bb05fb69cd7ae58d267e43d668141a82130b` (below).

**Files changed:** `tests/transport.test.mjs` (+95, -11 in the first commit; the fix changes one line).

## What was made

- New case "every route the application answers with a method other than GET and HEAD is a route a guard case lists" at the end of `tests/transport.test.mjs`, marked `invariant: account-mutation-request-guards` with a D-104 quote (verbatim; grep of `foundations/decisions.md` finds it once).
- It builds a second application with `createApp({ ...f.runtime, mailer: f.mailer })`, never listened on, so the fixture's own test-only `POST /test-session` is not in the table. The helper `stateChangingRoutes(app)` walks `app.router.stack` (Express 5.2.1), descends into nested routers, and returns every `METHOD path` of a route whose method is not GET or HEAD, sorted. A route that answers every method (`router.all`) on a path some route of one method also serves is the preliminary check of that path (`accountPrelude`, `router.all(Object.values(paths), ...)` in both routers) and is dropped; an all-methods route on a path no other route serves is kept as `ALL path` and so fails the case.
- The case compares against the fourteen routes of the guard cases: the eight POST routes (`guardedAccountPaths`), `PUT /api/saved-game`, `POST /api/saved-game-reset`, and the four owner POST routes. It fails naming each unlisted route, and also fails naming a listed route the application lacks (a stale list, and a walker that found nothing).
- To make "a guard case lists it" real for routes of this file, the eight paths became one module constant `guardedAccountPaths`; the guard case "refused state-changing requests ..." asserts its `routes` paths equal it (a precondition), the save case's loop over "the eight others" uses it instead of its own literal list, and `savedGameReset` is a constant used by the reset case's `const reset`. No expectation of an existing case changed.

## Checks (command, exit code)

- `npm.cmd test -- tests/transport.test.mjs` before the mutation: exit 0, 13 pass 0 fail.
- Seen failing, mutation 1: `router.delete("/api/made-up-change", ...)` added in `src/server/account-routes.ts` before `router.get(paths.account, ...)`; `npm.cmd test -- tests/transport.test.mjs`: exit 1, the new case fails with `a state-changing route no guard case lists` and actual `[ 'DELETE /api/made-up-change' ]`; the other 12 pass. Restored with `git checkout -- src/server/account-routes.ts`; `git diff --quiet -- src` exit 0.
- Seen failing, mutation 2: `router.all("/api/made-up-all", ...)` at the same place; `npm.cmd test -- tests/transport.test.mjs`: exit 1, actual `[ 'ALL /api/made-up-all' ]`. Restored the same way, `git diff --quiet -- src` exit 0.
- `npm.cmd test -- tests/transport.test.mjs` with the code restored (dist rebuilt by the command): exit 0, 13 pass 0 fail.
- `npm.cmd test -- tests/owner-routes.test.mjs`: exit 0, 13 pass 0 fail.
- `git status --short -- src`: empty, exit 0.
- `node node_modules/prettier/bin/prettier.cjs --check tests/transport.test.mjs`: exit 0. `node node_modules/eslint/bin/eslint.js tests/transport.test.mjs`: exit 0.
- Not run: the full suite, `gate_times.py` (orchestrator's alone); `foundation_check.py` and the instruction check (not in this slice's checks).

## Fix after the coordinator's message (commit `5824bb05`)

- Finding: `python -B .the-way/elements/common/foundation_check.py` exited 1 with `tests/transport.test.mjs:1377: the quotation does not begin a sentence of D-104`. The foundation check was not among my slice's named checks, so I had not run it; my grep of the quotation found it as a substring and showed nothing of this.
- Fix: the `// decision: D-104` line of the new case now quotes from the start of D-104's first sentence, `"The session cookie uses SameSite=Strict, and every state-changing route requires exactly ... compressed inflation rejected"`, the same passage the existing case "mutation guards reject foreign origins ..." quotes. Nothing else in the case changed.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`.
- `npm.cmd test -- tests/transport.test.mjs`: exit 0. Prettier `--check` on the file: exit 0. ESLint on the file: exit 0.
- The branch head had another commit above mine (`50d54bdd`, another slice's); left alone. `git status --short` empty.

## Own-work check

Requirement most likely missed: the case must fail for a state-changing route left off the lists, not only for the one shape I tried, and it must not pass because the walker found nothing. Checked by two mutations of different shape (a method-specific route, an all-methods route), both red naming the route; and the reverse direction (listed route absent from the application) makes an empty walk fail, because all fourteen listed routes would be reported missing. The reverse direction itself I did not mutate.

## Choices (way rejected, cost if wrong)

- Fresh `createApp` for the table instead of exposing the fixture's app: the fixture's app has the test-only POST `/test-session`, which would need an exclusion by name. Cost if wrong: a second `createApp` on the same runtime; it ran without a problem.
- All-methods routes dropped only where the path has a route of one method: rejected dropping every `_all` route (a new `router.all` with a mutating handler would pass unseen) and keeping every one (the preliminary check of all twelve account paths and five owner paths would need listing). Cost if wrong: an `all` route added on a path that already has a method route is not seen.
- The module constants shared with the existing cases, rather than a separate literal in the new case only: with a separate literal a route added to the table and the list would pass without any guard case covering it. The owner four stay a literal in the new case, because `tests/owner-routes.test.mjs` runs its tests on import and cannot be imported; a fifth owner POST route added to the new list but not to that file's `postPaths` would not be seen (outside this slice's change file).

## Limits seen (not changed)

- The walker reads routes (`layer.route`) and nested routers only. A handler mounted with `app.use(path, fn)` that mutates state is no route in the table and is not seen; neither is the mount path of a nested router (both routers here are mounted at the root).
- The test reads Express 5 internals (`app.router.stack`, `route.methods`, `route.path`), which are not a public API; an Express upgrade may change them, and the case would then fail by "a route the guard cases list that the application does not have", not pass silently.

## Reaches beyond the handoff

- `tests/transport.test.mjs` read whole (the change file). `.the-way/task-cycle/change/slice.md` and `SKILL.md` read whole. `guidelines/testing.md` read whole (in two pages). Probe script `.runs/executor-9/probe.mjs` to see the Express route table shape. `git`, `grep` of D-104 text. No foundation entry beyond those the handoff names.

## Working copies

- `.runs/executor-9/` in the worktree (probe.mjs and the output files of the runs): removed before return; the outputs quoted above are in this report. No git worktree or clone made.

## Plan and code disagreements

- Line ranges: all as the handoff gave. No structural mismatch. Small: the plan says "the eight routes ... the save route and the reset route ... and the four POST routes of the owner panel" — fourteen in all; the case lists exactly those.
- `src/server/account-routes.ts` was changed temporarily for the red runs and restored byte for byte (`git diff` empty); it was read only in part (lines 30-70 and 89-860 of the file, not the file's last lines from 860).

**Unread material:** `src/server/account-routes.ts` lines 1-29 and 860 to the end (a temporary mutation only); `src/server/owner-routes.ts`, `src/server/app.ts`, `foundations/*` ranges and `tests/owner-routes.test.mjs:954-1066` read whole as named.

**Searches not found or unclear:** none.
