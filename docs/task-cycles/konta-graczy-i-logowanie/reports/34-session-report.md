# Slice 6 report — session account lookup and one-browser logout

**Status:** done with concerns (the concerns are recommendations to root, none blocks this slice; see "Questions and concerns").

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie`, branch `task/konta-graczy-i-logowanie`.
- Base: `1e8a9bf1153d8cd7c58fcab210b51516ff760532` (clean at start). Head: `4101fb9e46226a9ce1a13580aa3413a1a80c398e`. Working tree clean after the last commit.
- Process checkout and gitlink both `574a37b9ab9572f876298f4cc10754581222d3f0` (checked at start; the verifier logs print the same pin).
- Nothing pushed, merged, rebased or reset. No target, secret, deployment, vault or global file touched. origin/main reconciliation (PR 31) not performed, as instructed.

## Commits

| Commit | Message |
|---|---|
| `8d2dff33a9b821f04556953b3e982b28d8927e34` | Authorize account lookup and one-browser logout by the stored session |
| `421a75d3f20635e3fcddad1d4589aa807ad1332d` | Record session authorization as a tested refusal of the account server |
| `4101fb9e46226a9ce1a13580aa3413a1a80c398e` | Check that logout ignores an account named in its query or headers |

## Changed files (base..head, `git diff --numstat`)

| File | Added | Removed |
|---|---:|---:|
| `src/server/account-routes.ts` (new) | 114 | 0 |
| `src/server/app.ts` | 9 | 32 |
| `tests/http.test.mjs` | 467 | 36 |
| `tests/transport.test.mjs` | 14 | 4 |
| `guidelines/testing.md` | 8 | 4 |
| `foundations/invariants.md` | 2 | 2 |

Six of the seven Change paths. `foundations/part_map.md` needed no change (see "Foundation and guideline consequences"). No path outside the Change list was edited. All files keep LF (`git ls-files --eol`: `i/lf w/lf`).

## What was built

`src/server/account-routes.ts` (HTTP kind, a copy of the `app.ts` exemplar's kind; its copy-list row awaits a refresh, as the handoff allows) exports `accountRoutes(runtime)`, an Express router mounted by `createApp` before the `/api` 404 handler, plus `sessionCookieName` and `sessionCookieScope`, which `app.ts` now uses for issuing the cookie, so logout clears exactly the scope it issued. The values are unchanged: `__Host-loop2.sid`, Path `/`, Secure, HttpOnly, SameSite Strict, no Domain; maxAge stays in `app.ts`. The rest of the security assembly in `app.ts` (proxy trust, session flags, transport bypass, app-level no-store, error handler, static serving) is untouched.

Contract, for slices 7 and 9:

- The canonical four paths: `POST /api/accounts`, `POST /api/session`, `GET /api/account`, `POST /api/logout`. `/api/register` and `/api/login` are gone with no alias and now get the JSON 404 for an unmatched API request.
- Any method on a known path: `Cache-Control: no-store`. When unconfigured: JSON 503 `{error:"Accounts unavailable"}`. When the request has no valid transport: JSON 403 (as before). Configured, a method/path pair that is not one of the four routes falls to the JSON 404.
- POST routes then run the existing `mutationGuards` (exact Origin, JSON media, no inflation, 16 KiB, object body), unchanged and in the same order.
- `GET /api/account`: the account comes only from `request.session.accountId` of a session the real Store loaded, looked up again with `findAccountById`. 200 `{id, email}` and nothing else. Otherwise 401 `{code:"unauthenticated", error:<Polish message>}`. Ordinary reads stay touch-only (resave=false; no explicit save).
- `POST /api/logout`: the body must be an empty object, else 400 `{code:"invalid-request", …}`. No valid session gives 401. Otherwise `request.session.destroy` is awaited. A failure gives 500 `{code:"logout-failed", …}`, sets no cookie and leaves the record in place. Success gives `clearCookie` with the shared scope, then 204 with an empty body. Session.destroy removes `req.session` first, so the middleware neither touches nor re-issues the cookie on that response.
- `POST /api/accounts` and `POST /api/session` reach the guards and then the guarded JSON 503 until slice 7. No credential, hashing or admission code was added.

## Checks run (command → exit)

Every repository test ran only through full `npm test`, inside the established isolated Linux harness (reports/linux-verification.md). Common Docker arguments, called COMMON below:
`--network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest`. Runs used Git Bash with `MSYS_NO_PATHCONV=1`. Logs are UTF-8 and sit beside this report.

| # | Command | Exit | Result |
|---|---|---:|---|
| 1 | `git status --short`; `git rev-parse HEAD`; `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 | Clean; base 1e8a9bf; pin 574a37b both ways. |
| 2 | `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie` (each time before a run) | 0 | Heads at 1e8a9bf, then 421a75d, then 4101fb9, checked with `git bundle list-heads`. |
| 3 | `docker run --name loop2-task15-session34-red COMMON bash /inputs/verify-session34-overlay.sh 1e8a9bf… 2c1d64ca… session34-red.tar` | 128 | Setup failure, not a test result: the bundle does not hold origin/main 2c1d64c, so `git update-ref` failed. I removed that owned container and reran with the task base 7012abc as the target ref, as earlier verifier runs did. |
| 4 | same name, `… 1e8a9bf… 7012abcfb55b4ba2b2836b574a2275eb1551df28 session34-red.tar` | 1 | `34-session-red.log`: the new tests laid over the unchanged base; 383 Node, 375 pass, 8 assertion failures (below). One diagnostic printed a synthetic signed cookie; that value is redacted in the retained log (see "Diagnostics"). The tests were then changed to safe diagnostics only. |
| 5 | `npm run build` (local Windows, quick feedback, not a test) | 0 | Compiles. |
| 6 | `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/server/account-routes.ts src/server/app.ts tests/http.test.mjs tests/transport.test.mjs` (local, quick feedback; the gate's own lint ran inside npm test) | 0 | Clean. |
| 7 | `node node_modules/prettier/bin/prettier.cjs --write --no-config --no-editorconfig <changed .ts/.mjs>` | 0 | Formatting only. |
| 8 | `python -B .the-way/elements/common/foundation_check.py` (local, after the foundation and guideline writes) | 0 | `0 errors`. |
| 9 | `git diff --check` before each commit | 0 | No whitespace errors. |
| 10 | `docker run --name loop2-task15-session34-first COMMON bash /inputs/verify.sh 421a75d 7012abc…` | 0 | `34-session-first.log`: 383/383 Node; Python 5+65+176+32 = 278 run, OK, `skipped=3` in the 32-test directory; foundation `0 errors`. |
| 11 | `docker run --name loop2-task15-session34-mutation-guards COMMON bash /inputs/verify-session34-mutation.sh 421a75d3… 7012abc… guards` | 1 | `34-session-mutation-guards.log`: 7 assertion failures, as expected (below). |
| 12 | `docker run --name loop2-task15-session34-mutation-identity COMMON bash /inputs/verify-session34-mutation.sh 421a75d3… 7012abc… identity` | 1 | `34-session-mutation-identity.log`: 3 assertion failures, as expected (below). |
| 13 | `docker run --name loop2-task15-session34-red-final COMMON bash /inputs/verify-session34-overlay.sh 1e8a9bf… 7012abc… session34-red-final.tar` | 1 | `34-session-red-final.log`: the committed test files (421a75d) laid over the base; the same 8 assertion failures; no unsafe value printed. |
| 14 | `docker run --name loop2-task15-session34-mutation-logout-target COMMON bash /inputs/verify-session34-mutation.sh 4101fb9e… 7012abc… logout-target` | 1 | `34-session-mutation-logout-target.log`: 1 assertion failure, as expected (the own-work check). |
| 15 | `docker run --name loop2-task15-session34-final COMMON bash /inputs/verify.sh 4101fb9e46226a9ce1a13580aa3413a1a80c398e 7012abcfb55b4ba2b2836b574a2275eb1551df28` | 0 | `34-session-final.log`: exact final head and process pin printed; Node v24.22.1, Python 3.14.9; 383/383 Node pass; Python 278 run (5, 65, 176, 32), all OK, `skipped=3`; foundation check `0 errors`. Docker-dependent deploy and invariant tests ran (0 skips in those directories). |

Archive identities: `session34-red.tar` sha256 `e79b6992f87ebe5df113de6ee28af076bef6bf9b57f3ffd752f443260c1a2403`; `session34-red-final.tar` sha256 `f4e1edf172e878b26d66267d9fcef760b94b131fb3134c88c088f8514de17dea`. The new LF harness files are in `.runs/account-linux-inputs/` (git-ignored): `verify-session34-overlay.sh` (clone at a commit, lay a test archive over it, full npm test), `verify-session34-mutation.sh` (clone, apply `mutate-session34.py <mode>`, `git diff --stat`, full npm test) and `mutate-session34.py` (each mode replaces anchors that must match exactly once). Before running them, I dry-checked every mutation's anchors on `git archive HEAD src/server` copies in the session scratchpad.

**Not run, or unchecked:**

- The three tests skipped on Linux: `test_native_windows_readers_reject_nonterminating_cim_errors`, `test_native_windows_readers_keep_owned_child_in_healthy_observation`, `test_failed_descendant_query_still_terminates_known_main_process`. Their `skipUnless(os.name == "nt")` decorators are in `tests/quality/test_process_observation.py:31,57` and `tests/quality/test_invariant_support.py:210`; the run prints only `skipped=3` and does not name them. No Linux pass is attributed to them.
- Windows full gate: not rerun. The unchanged baseline was not rerun.
- Target-image Argon2 measurement, the public browser journey, real Cloudflare provider settings and secure-cookie acceptance on the target: unchecked, outside this slice.
- Screenshot or rendered states: not applicable, because this slice changes no user interface.

## Fail-once and mutation evidence

**Failing first (runs 4 and 13, the unchanged base 1e8a9bf with the new tests; every failure is an assertion, the build succeeded):**

| Test | Failing assertion at base |
|---|---|
| http: unconfigured accounts answer the four canonical routes as unavailable JSON | `POST /api/accounts`: actual 404, expected 503 |
| http: a stored session alone selects the account, whatever identifier the request supplies (`invariant: account-session-authorization`) | 503, expected 200 |
| http: absent, tampered, unknown, expired and deleted sessions authorize neither lookup nor logout (`invariant: account-session-authorization`) | `absent lookup`: 503, expected 401 |
| http: logout destroys only this browser's session and clears the same host cookie | 503, expected 204 |
| http: a failed session destruction is not reported as logout and leaves the browser signed in | `a failed logout neither clears nor renews the cookie` (the base's 503 placeholder renews the cookie) |
| http: a read that loaded its session before logout cannot revive it afterwards | 503, expected 204 |
| transport: transport refuses ambiguous proxy metadata before loading live sessions | 503, expected 401 |
| transport: mutation guards reject foreign origins, non-JSON and malformed bodies | `/api/accounts` `text/plain`: 404, expected 415 |

**Executed mutations.** Each was applied to a disposable clone of the stated commit, followed by full npm test. The worktree was never mutated. Restoration is the unmutated head passing full npm test: runs 10 (421a75d) and 15 (4101fb9, final).

| Mode, commit | Mutation (exact) | Named assertion that failed |
|---|---|---|
| guards, 421a75d | The `GET /api/account` session guard answers `response.json({})` instead of `unauthenticated(response)` (the guard's refusal removed) | `absent lookup`: 200, expected 401 (unauthorized-refusal case); transport `/api/account` without a session: 200, expected 401 |
| guards, 421a75d | Destruction error ignored (`if (error && false)`) | `a failed destruction is a server failure` |
| guards, 421a75d | `clearCookie(…, { ...sessionCookieScope, secure: false })` | `clearing keeps Secure` |
| guards, 421a75d | `resave: true` in `app.ts` | `the delayed read must not recreate the record` (the delayed read re-inserted the destroyed record); `an ordinary account read touches the record without rewriting it`; the existing transport `ordinary reads must touch rather than resave` |
| identity, 421a75d | `request.query.accountId ?? request.session?.accountId` selects the account | lookup case: deepEqual got the second account, expected the first |
| identity, 421a75d | Logout's session guard removed | `absent logout`: 204, expected 401; logout case: repeated logout 204, expected 401 |
| logout-target, 4101fb9 | Before destroy, logout deletes every session of `request.query.accountId` (raw SQL through the private connection, `@ts-expect-error`) | `an account named in the query or a header keeps its session` |

Within each run, the failures are attributable by test name and message. Each mutation's first failing assertion is a distinct one.

**Mental mutations (not executed):**

- 204 sent before, or without awaiting, destruction: failed-destruction case (`>= 500`).
- Logout ends all sessions of the own account: the logout case's `kept` equality for `logout-two`.
- A Store keyed by account ID: `an account identifier is not a session identifier` (401 expected).
- Projecting the whole `Account` (password hash, createdAt): exact `deepEqual {id, email}`.
- Wrong cookie name, or no clearing: `the session cookie is emptied`, `exactly one cookie is cleared`.
- Logout body check removed: `logout naming an account is refused`.
- Origin guard dropped from logout: transport origin refusals on `/api/logout` (403).
- Credential placeholders admitted, or old aliases kept: transport 503 and 404 assertions.
- Router's no-store removed: the unconfigured case's `cache-control`. In configured mode, `app.ts` sets no-store for every admitted request anyway.

Not caught by any test: the exact 400/401 choice for an invalid logout body, and the error code strings and Polish messages. These are deliberate choices, asserted only as "4xx", and as "a string code plus a string message" where the spec requires both.

## Own-work check

The requirement my work most likely did not meet was "a supplied foreign account identifier grants nothing" for changing a session. The first version proved it only for a body field, which the empty-body rule refuses (400) before the session logic runs. An identifier in the query or a header of a logout that passes every guard was unchecked. I added it to the supplied-identifier case: own browser, `POST /api/logout?accountId=<second>&id=<second>` with `X-Account-Id: <second>` and `{}`. Result: 204, own record gone, the second account's record intact and its browser still reads 200. The plausible fault "logout ends the sessions of the account the caller names" (run 14) fails exactly that assertion. Final run 15 passes.

Weakest point I checked separately: a reviewer might count the test-only `/test-delayed-read` route as a facade. It only holds its response; the real session middleware, Store and SQLite run on both sides of the race. The `resave: true` mutation shows the case detects a real revival through the real Store.

## Diagnostics and synthetic values

Run 4 printed one synthetic signed cookie in an `assert.equal(set-cookie, undefined)` diff. In `34-session-red.log` I replaced the value between `__Host-loop2.sid=` and `;` with `[redacted]` (2 occurrences; the operator, attributes and failure remain visible). Every new header and cookie assertion now uses `assert.ok(<condition>, <message>)`; row diagnostics select account_id, data and expiry, never the session ID. Positive control: in run 4's raw log, the pattern `s%3A` matched before redaction. After redaction, all seven `34-session-*.log` files contain 0 matches for `s%3A` or any synthetic session ID used here (`lookup-…`, `refusal-…`, `logout-…`). The same grep finds the test name in `34-session-first.log`, so the search works. Printed values are limited to account UUIDs, synthetic emails and cookie metadata; no secret, key, password hash or session ID.

## Foundation and guideline consequences

- **`account-session-authorization`** (through the-way-record-invariant). The sentence on `{fork-point}` and now is unchanged: "The account API returns JSON 401 for `GET /api/account` or `POST /api/logout` without a valid server-side session, and an account identifier supplied by the caller cannot authorize reading or changing another account or session."
  - **Method:** review → test. **Violated:** yes → no.
  - Tests citing it: the two `tests/http.test.mjs` cases named above. Each matches the sentence: 401 JSON for both routes across absent, tampered, unknown, expired and deleted sessions; query, header, body and session-ID-shaped account identifiers grant no read or change.
  - Rests on stays `none`, because D-107's Based on is `none` (template "Links"). D-107's Verification already names this invariant, so no decision changes.
  - Polish meaning: Bez ważnej sesji na serwerze odczyt konta i wylogowanie dostają odpowiedź JSON 401, a identyfikator konta podany w żądaniu nie pozwala odczytać ani zmienić cudzego konta ani sesji.
  - **Violated mark cleared.** Polish: Znacznik „naruszony” zdjęty — serwer spełnia tę zasadę i pilnuje jej test, raz widziany z porażką. The request has to name this clearing.
- **`guidelines/testing.md`, Trust boundaries** (written from the pinned testing template's "Writing the file"; rows taken only from D-107 and D-95):
  - *Decision* gains D-107 · D-95, and *Invariant* gains account-session-authorization. Polish: Reguła granic zaufania opiera się teraz także na decyzjach o sesji i wylogowaniu i wymienia niezmiennik autoryzacji sesją.
  - The boundary row for `src/server/` names the two direct refusal cases. Polish: Granica serwera ma obok odmowy ścieżek plików bezpośredni test odmowy bez ważnej sesji.
  - Four authorization rows: no valid session → 401; own account read; logout of only this browser after destruction, with failure not reported as 204; a supplied identifier grants nothing. Polish: Tabela uprawnień mówi, kto bez sesji dostaje 401, że zalogowany czyta tylko własne konto, że wylogowanie kończy tylko sesję tej przeglądarki i dopiero po jej usunięciu, oraz że identyfikator w żądaniu nie daje uprawnień.
  - Visitor create/login and Origin/media/transport rows are left for slice 8, as the plan says.
- **`guidelines/testing.md`, integration recipe Exemplar.** I dropped the stale clause saying the helpers of `tests/http.test.mjs` have an idle request limit and an unbounded listening wait; the helpers now follow D-84 (5-second absolute request deadline, bounded readiness with error handling, `closeAllConnections` + close in `try/finally` cleanup). The exemplar remains limited to the traversal case (D-85 unchanged). Polish: Opis wzorca nie twierdzi już, że pomocniki pliku nie mają limitów — teraz je mają; wzorcem pozostaje wyłącznie przypadek ścieżek.
- **Part map** (through the-way-update-part-map, step 2): no entry changes. `src/server/**` already claims `account-routes.ts`, and `tests/http.test.mjs` and `tests/transport.test.mjs` already belong to account-server. The new module imports only account-server files and Express, so Depends on is unchanged. The trust boundary `src/server/**` covers it. The account-server sentence ("handles the HTTP requests sent to it and owns account and session persistence") still holds. The map has no surface entry for the API. Polish: Mapa części bez zmian — nowy plik i testy już należą do serwera kont, a jego zależności i granica zaufania się nie zmieniają.
- **Unchanged and still Violated: yes:**
  - `account-save-durable-storage` (the full saved-game sentence; session tests cannot clear it).
  - `account-save-sqlite-access` and `loop2-shared-public-origin` (their slices).
  - `account-mutation-request-guards` (see question 1).
- **`coding-http-application.md` "Files of this kind":** unchanged, per the handoff (the copy-list row awaits a refresh). No first account-policy kind was started.

## Reading reaches beyond the selection

- `plan.md`, lines 13–52, by `grep` for rows F01, F02, F06, F09, F17, F18, F20f–F20j, F21, F22, F24c, F24d, F25. The selection names these rows without their text. I needed them to learn what F25 asks of the part map (slices own exact added paths) and F21 (session rows in slice 6, completion in slice 8).
- `foundations/decisions.md` D-96–D-101 and D-103: read while reading the contiguous range around the selected D-94–D-113; they did not change the work.
- Method prerequisites in `.the-way`:
  - `elements/common/way_of_working.md`, `rules.md`
  - `elements/invariants/` template and examples, plus the five example invariants in `.the-way/foundations/invariants.md`
  - `elements/part-map/` skill, template and examples
  - `product-guidelines/template.md`, `testing/SKILL.md`, `testing/template.md`, `reading.md`
- `foundations/part_map.md` whole (short), for the update-part-map search.
- Installed sources:
  - `node_modules/express-session/session/store.js` (regenerate/load/createSession), to confirm Session.destroy deletes `req.session` before the Store call.
  - `node_modules/express/lib/response.js` clearCookie and cookie (Express 5.2.1), for the clearing scope and the epoch Expires.
- `tests/startup.test.mjs:330–421`, plus a grep of the old paths across tracked files, to confirm no other caller of `/api/register` or `/api/login`; the startup probe stays at 403.
- `package.json` test script; skip decorators in `tests/`.
- `verify-slice2-fix-red.sh`, and `docker inspect` of earlier runners, for the overlay pattern and the network/mount arguments.

`cycle.md` was not read.

## Choices made (rejected way, and cost if wrong)

1. **Shared cookie scope constant** used by `app.ts` and logout, rather than duplicated literals. Cost if wrong: a reviewer may count it as a change to the security assembly, though the values are identical and the issuance and clearing tests pin them independently.
2. **Logout requires an empty object (400 otherwise)**, rather than ignoring extra fields. Cost: a future client sending fields gets 400. The spec's "object of expected fields" supports it.
3. **New refusals use `{code, error}`**, keeping the existing `error` key as the one user-facing message, with Polish messages that I chose: "Sesja wygasła albo nie istnieje. Zaloguj się.", "Nieprawidłowe żądanie.", "Nie udało się wylogować. Spróbuj ponownie.". The rejected alternative was rewriting the slice-5 refusals (403/415/413/400/503/500) too; that would change transport controls beyond the behaviour delivered here. Cost: two body shapes coexist until slice 7 or 9 harmonize them.
4. **A 401 for an expired session does not clear the obsolete cookie.** The spec says "may". Cost: the browser keeps a useless cookie until it expires.
5. **The known-path gate stays on all methods** (403/503 as before). Configured, an unlisted method falls to the JSON 404. That is allowed by the spec's "may retain 404".
6. **Destruction failure is tested with a real SQLite `BEFORE DELETE` trigger**, created through the test's own inspection connection, rather than replacing the Store or database.
7. **Expiry is tested by setting `expires_at` in the past** through that inspection connection; no fixed sleep and no clock facade.

Adaptations (section 4): none structural. The red overlay needed the task base 7012abc as its target ref (setup detail, run 3).

## Questions and concerns (each with my recommendation)

1. **`account-mutation-request-guards` stays Method review, Violated yes.** Logout, the only state-changing route that exists today, refuses every listed input before mutation. But the credential routes' "structurally invalid body" check (their expected fields) arrives with slice 7, and plan F21 puts completion of the evidence there and in slice 8. *Recommendation:* slice 7 turns it to test/no with a direct cited refusal test that is seen failing once.
2. **Error body shape:** the slice-5 refusals have no `code`. *Recommendation:* slice 7 or 9 decides whether to add codes to them when the browser client starts dispatching on refusals, and records the choice. Until then the browser can dispatch on status alone.
3. **`guidelines/testing.md` gaps outside this slice, unchanged:**
   - The integration recipe's *Files* omits `tests/transport.test.mjs`, `tests/account-storage.test.mjs` and `tests/passwords.test.mjs`.
   - The trust-boundary table lacks `account-request-transport`.
   - *Recommendation:* slice 8 completes both while it completes the table.
4. **PR 31 reconciliation:** unchanged and not performed. This branch's testing guideline still lacks upstream's adopted mutation section. That gap is settled upstream (D-94/D-95 numbering collision included) and is root's final-stage work; it is not an open tool choice.

## Resources

Owned containers left exited for inspection:

- `loop2-task15-session34-red` (1), `-first` (0), `-mutation-guards` (1), `-mutation-identity` (1), `-red-final` (1), `-mutation-logout-target` (1), `-final` (0).
- The first red container (exit 128) was removed and recreated under the same name.

Anchor dry-run copies sit in the session scratchpad (`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\c03d2664-799c-4af1-901d-6528e8909f2c\scratchpad\anchor-guards`, `…\anchor-identity`, `…\anchor-logout-target`). No other worktree, daemon setting or host socket was touched.
