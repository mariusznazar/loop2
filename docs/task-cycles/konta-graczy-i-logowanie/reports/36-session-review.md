FAIL 4101fb9e46226a9ce1a13580aa3413a1a80c398e

# Independent review of replanned slice 6: session lookup and one-browser logout

- Reviewed: planned slice 6, range `1e8a9bf1153d8cd7c58fcab210b51516ff760532..4101fb9e46226a9ce1a13580aa3413a1a80c398e` (8d2dff3, 421a75d, 4101fb9).
- Worktree `C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie`, branch `task/konta-graczy-i-logowanie`; `git rev-parse HEAD` = the given head; tree clean; `.the-way` checkout and gitlink both `574a37b9ab9572f876298f4cc10754581222d3f0`.
- Method: `.claude/skills/the-way-review-change/SKILL.md` -> `.the-way/task-cycle/review/SKILL.md`, with the user's playbook `C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md` (entry shape: anchor, text to paste, reasoning).
- Counts: blocking 1 (Important), Minor 3, out of scope 0 (Declined to judge lists 6 lines).

## Summary of the judgement

The code of the slice does what the selection asks. `GET /api/account` takes the account only from `request.session.accountId` of a session the real Store loaded. `POST /api/logout` awaits `Session.destroy`, reports failure as 500 without a cookie, and clears exactly the issued scope on success. Ordinary reads stay touch-only. The guards keep their order, the old placeholders are gone without aliases, and the credential routes stay a guarded 503. The tests use real HTTP, the real Store and a real SQLite file. Their fail-once and mutation evidence in the retained logs matches the report.

I accept the status change of `account-session-authorization` (Method review -> test, Violated yes -> no); the reasons are under "Invariant status change" below.

The one blocking finding is in the permission table this slice wrote into `guidelines/testing.md`. One row states a refusal that the code does not perform and that the row's own cited test asserts the opposite of. The row also rests on a choice that no decision carries.

## Findings

### Important

#### 1. Permission row says a logout naming an account is refused and changes no session; the code ends the caller's session with 204 when the account is named in the query or a header (new thread)

**Anchor:** `guidelines/testing.md:184`; contradicting test `tests/http.test.mjs:412-422`; code `src/server/account-routes.ts:84-87`

**To paste:** Row 4 of the permission table says a logout that names an account "zostaje odrzucone bez zmiany żadnej sesji", but the case "a stored session alone selects the account…" sends `POST /api/logout?accountId=<other>` with `X-Account-Id: <other>` and expects 204 with the caller's own session destroyed. Only a non-empty body is refused, and that refusal comes from the empty-body choice of this slice, not from D-107, which the row cites.

**Why I report it:**
- *What the row is for.* The pinned testing template makes this table the source of expected refusals at a trust boundary. Each row is "who, which resource, which action, expected result", taken from the product's permission decisions. A choice no decision settles is a question, never a row (`.the-way/product-guidelines/testing/template.md`, "Trust boundaries" and "Writing the file"). Slice 8 completes this table, and later refusal tests are written from it.
- *What the row says.* "Identyfikator nie daje uprawnień: odczyt własnego konta albo 401, a wylogowanie wskazujące konto zostaje odrzucone bez zmiany żadnej sesji". Decision: D-107.
- *What the code does.* `account-routes.ts:84-87` refuses only a non-empty JSON body (400 `invalid-request`). The query string and headers are never read. A logout of a signed-in browser that names another account in the query or a header passes every guard and destroys the caller's own session (`account-routes.ts:92-104`). That behaviour is correct for D-107: the identifier grants nothing. The test asserts exactly this at `tests/http.test.mjs:412-422`: status 204, own record gone, the named account's record kept. The executor's own-work check added that assertion on purpose (report 34, "Own-work check").
- *Concrete case.* Browser A (account 1) sends `POST /api/logout?accountId=<account 2>` with `{}`. The row predicts a 4xx and no session change. The product answers 204 and deletes A's session. Follow the row and you write a test that fails against correct code, or you "fix" the code to refuse logouts whose URL carries extra parameters. Neither D-107 nor the spec asks for that, and it would change the observable logout contract for slice 9's browser client.
- *Source.* D-107 says only that "an account identifier supplied in a request grants no authority" and that logout without a valid session is 401. It contains no refusal of a logout that names an account. The body refusal is the executor's choice 2 in report 34 ("Logout requires an empty object (400 otherwise)"), resting on the spec's "empty JSON object" input and, at most, on D-102's "Input is an object of expected fields". So the row writes an unsettled choice into the permission table and cites the wrong decision for it.
- *Fix (for the author, not to paste).* Make the row's expected result say what D-107 gives, for example: "Identyfikator w żądaniu nie daje uprawnień: odczyt zwraca własne konto albo 401, a wylogowanie kończy wyłącznie sesję tej przeglądarki albo zwraca 401; sesje wskazanego konta zostają." If the empty-body refusal is to stand in the table, give it its own wording ("treść inna niż pusty obiekt JSON zostaje odrzucona przed zmianą sesji") and cite D-102, the decision on expected fields.
- *Grade.* Important. This is a binding expectation at a trust boundary, written by this change, that contradicts the change's own test. Its next reader is slice 8. It lies within the task (task To do 18; slice 6 Goal: "Add the session/account permission and direct unauthorized-refusal rows").

### Minor

#### 2. The assertion message says "touches", but the assertion only proves "not rewritten" (new thread)

**Anchor:** `tests/http.test.mjs:375-378` (with `seed` at `tests/http.test.mjs:302-303`)

**To paste:** The message "an ordinary account read touches the record without rewriting it" claims a renewal, but the assertion compares only `data`; `expires_at` is never checked, although `seed` leaves one day "so a renewal visibly moves its expiry".

**Why I report it:**
- The assertion catches `resave: true`; the guards mutation run shows it. It does not catch a lookup route that skips renewal. Examples: a future change that sets `rolling: false`, or one that answers before the session middleware's end hook.
- The transport test "rolling static responses…" (`tests/transport.test.mjs:384-391`) proves renewal for a static request through the same middleware. So the product is covered, and this is not a gap in protection. The fault is a message that claims more than the line checks.
- Fix: also assert `storedRow(f, "lookup-first").expires_at > before.expires_at`. Or rename the message to "an ordinary account read does not rewrite the record".

#### 3. Logout's body check runs before the session check, so a sessionless logout with a non-empty body gets 400, while the invariant sentence and table row 1 promise JSON 401 (new thread)

**Anchor:** `src/server/account-routes.ts:84-91`; `foundations/invariants.md:694`; `guidelines/testing.md:181`

**To paste:** Should the invariant sentence, or table row 1, say that the request guards (Origin, media, body shape) answer before the session check, given that a sessionless logout with `{"accountId":…}` gets 400 rather than the 401 the sentence states?

**Why I report it:**
- The sentence reads: "The account API returns JSON 401 for … `POST /api/logout` without a valid server-side session". Read literally, it is false for a sessionless logout whose body is not `{}` (400), and for a wrong Origin or media type (403/415).
- The order itself is right. D-102 refuses invalid input "before mutation", and the spec says guards run before every state-changing route. No authority is ever granted, so this is no security defect.
- The cost is precision. A later reviewer comparing the sentence with a test may read a 400 or 403 on a sessionless logout as a violation. One clause fixes the sentence and the row: "after the request guards" or "otherwise passing the request guards". Rewording the sentence goes through the-way-record-invariant.

#### 4. The new route module's comment names a later slice's policy as if fixed (new thread)

**Anchor:** `src/server/account-routes.ts:107`

**To paste:** The comment "Credentials and admission arrive with their policy; until then they stay unavailable" describes the plan, not the code; once slice 7 lands it either goes or becomes false.

**Why I report it:** This is polish only. A comment about a future slice is a timeline note, and it goes stale the moment slice 7 replaces the handler. Slice 7 will touch these lines anyway, so the cost is near zero. I report it so the comment is not left behind.

## Invariant status change: `account-session-authorization` (review -> test, Violated cleared)

I accept it, for these reasons:

- *The whole sentence against the cited tests.* JSON 401 for both routes covers absent, foreign-key (tampered), unsigned, unknown, expired and deleted sessions (`tests/http.test.mjs:427-472`). Each case also asserts content type, no-store, a code plus a message, and no account fields. The identifier clause covers lookup with a query or header identifier, with and without a session; a session cookie whose ID is an account ID; a logout body naming an account; and a logout with a query or header naming an account (`tests/http.test.mjs:352-425`). Both cases carry `// invariant: account-session-authorization`. The sentence's 401 wording has the precision gap of Minor 3, which is no reason to keep the invariant at review.
- *Fail-once (manual inspection of the retained logs).*
  - `34-session-red-final.log`: the committed tests over base 1e8a9bf fail by assertion. Examples: "absent lookup", and the stored-session case at its first status check.
  - `34-session-mutation-guards.log`: with the GET session guard's refusal replaced by `response.json({})`, the refusal case fails at "absent lookup", and the transport case fails at its final 401 check.
  - `34-session-mutation-identity.log`: with `request.query.accountId ?? request.session?.accountId`, the stored-session case's `deepEqual` gets the second account. With the logout guard removed, "absent logout" fails.
  - Each named failure can only come from the mutation the report attributes it to. In the guards run, four mutations were applied at once. I checked that none of the other three could produce "absent lookup" (a 200 for a sessionless read) or "clearing keeps Secure".
- *Restoration.* `34-session-final.log` at exact head 4101fb9: 383/383 Node; Python 5/65/176/32 OK (skipped=3); foundation check `0 errors`.
- *Links.* "Rests on: none" follows D-107's "Based on: none". The session validity it depends on is held by `account-session-storage` and the cookie invariants, each with its own facts. I found no environment fact holding a condition that decides this sentence, outside those entries.

## Specific checks the handoff asked for

- **Crafted input at the boundary.** All covered as above, plus two-browser independence (`tests/http.test.mjs:474-520`). Failed destruction: a real SQLite `BEFORE DELETE` trigger gives 500 JSON with no Set-Cookie, no leaked detail, the record kept, and the browser still at 200 (`:522-549`). I confirmed by reading `node_modules/express-session/session/session.js:109-113` and `node_modules/express-session/index.js:232-235,338-341` that `Session.destroy` deletes `req.session` before calling the Store, so neither the success path nor the failure path re-issues or touches the cookie.
- **Delayed ordinary read cannot revive.** Real: the session middleware loads the session before `reached()`, the logout completes, and the held response ends through express-session's end hook into the real `Store.touch` (update-only). The `resave: true` mutation shows the case catches a real reinsertion through `Store.set`.
- **Is the test-only delayed-read route a facade under D-84/D-88?** No. D-84 rejects "a substitute for the mechanism whose failure is being tested". The mechanism under test is the session middleware's renewal against the Store and SQLite, and all three stay real. The route only holds an ordinary response, which a slow static-file stream can do in production. It follows the precedent of `/test-identity` and `/test-session` in `tests/transport.test.mjs:52-74`. D-88 concerns browser events, focus and SVG and does not apply.
- **no-store, exact clearing scope, no private fields.**
  - no-store on 200, 204, 401 and 500, and on the unconfigured 503.
  - Clearing: one cookie, empty value, Path=/, HttpOnly, Secure, SameSite=Strict, no Domain, an Expires in the past (`tests/http.test.mjs:489-503`).
  - The 200 body equals exactly `{id, email}`.
- **Preserved guards and startup probe.** The `mutationGuards` order and code are unchanged (`src/server/transport.ts:59-96` is untouched by the range). Transport refusals now run against `/api/logout`, `/api/accounts` and `/api/session`. The startup test is unchanged and passes at head, with the probe still at 403 per report 34. I did not re-run it.
- **`guidelines/testing.md` against the pinned template and the cited decisions.**
  - The rule's *Decision* gains D-107 and D-95, and its *Invariant* gains `account-session-authorization`. Both match the template's "Trust boundaries" field rules.
  - The boundary row for `src/server/` names the direct refusal cases.
  - Rows 1–3 follow D-107 and D-95. In row 1, "z kodem odmowy" comes from spec §1 rather than from D-107; that is harmless.
  - Row 4: Finding 1.
  - The Exemplar edit removes a clause that is no longer true and keeps D-85's limit ("Nie zatwierdza całego pliku ani jego pomocników").
- **D-84 helper upgrade.** `listen` has a 5-second readiness deadline with error handling. `send` has an absolute 5-second deadline. Cleanup runs in `t.after` / `after` with `closeAllConnections`, then close, the inspection DB, the runtime and the directory in try/finally (`tests/http.test.mjs:26-111,225-238`).
- **Executor's own-work check.** It names the weakest point I would have picked: an identifier outside the body on a logout that passes the guards. The `logout-target` mutation (`34-session-mutation-logout-target.log`) fails exactly the added assertion.

## Declined to judge

- Credential routes, hashing, admission and rate policy behind the guarded 503: these are slice 7 (handoff).
- `account-mutation-request-guards` staying review/Violated yes, and completion of the permission table (visitor create/login, Origin/media/transport rows): these are slices 7–8 (plan F21).
- Two error-body shapes coexisting (`{error}` on slice-5 refusals, `{code, error}` on new ones): the executor's question 2 for slices 7/9. It does not affect this slice's routes.
- `guidelines/testing.md` integration recipe *Files* omitting `tests/transport.test.mjs` and other account test files, and the missing `account-request-transport` boundary row: these are slice 8.
- `guidelines/coding-http-application.md` "Files of this kind" lacking `src/server/account-routes.ts`: the handoff allows the refresh to come later.
- PR 31 / upstream mutation-testing section reconciliation: this is root's final-stage work.

## Checks run

| # | Command or method | Exit / result |
|---|---|---|
| 1 | `git status --short`; `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` (Git Bash, worktree root) | 0; clean; HEAD 4101fb9e…; both pins 574a37b9… |
| 2 | `git log --oneline 1e8a9bf..4101fb9`; `git diff --stat 1e8a9bf..4101fb9`; `git diff 1e8a9bf..4101fb9 -- src/ foundations/ guidelines/`; `git diff 1e8a9bf..4101fb9 -- tests/transport.test.mjs` | 0; 3 commits, 6 files, +614/−78 |
| 3 | `python -B .the-way/elements/common/foundation_check.py` (worktree root; output in `C:/Users/Mariusz/AppData/Local/Temp/claude/C--Storage-repos-loop2/c03d2664-799c-4af1-901d-6528e8909f2c/scratchpad/fc36.txt`) | 0; `0 errors` |
| 4 | `git diff --check 1e8a9bf..4101fb9` | 0; no whitespace errors |
| 5 | `git ls-files --eol` on the six changed files | 0; all `i/lf w/lf` |
| 6 | `git grep -n "api/register\|api/login" -- ':!*.md'` and `-- '*.md'` | 0; only the two no-alias assertions in tests; no Markdown hits |
| 7 | Manual: `grep -a` over `reports/34-session-{final,red-final,mutation-guards,mutation-identity,mutation-logout-target}.log` for test counts, `✖` lines and AssertionError messages | Counts and failing-assertion names match report 34's tables |
| 8 | Manual: source reading of `node_modules/express-session/session/session.js:109-113` and `node_modules/express-session/index.js:232-235,338-341,455-487` | Confirms destroy-before-Store and no cookie or touch after destroy |

**Not run:** `npm test`, in any form. The evidence in report 34 and its logs is consistent and not disputed, Finding 1 is a text-against-code finding that needs no run, and the full suite is the cycle's own run (method §2; handoff). The Windows gate, the target image, Argon2 measurement, the public browser journey and the Cloudflare provider are not checked, as in report 34.

## Reading reaches beyond the dispatch

- `.the-way/elements/invariants/template.md` (whole): the Method, Links and Violated rules for judging the status change.
- `.the-way/product-guidelines/testing/template.md` (whole): the "Trust boundaries" and "Writing the file" rules for judging the table rows.
- `foundations/decisions.md` D-84, D-85, D-86, D-88, D-95, D-99, D-102, D-105, D-107 (each whole, by line ranges from a heading grep): the cited decisions and the facade question.
- `foundations/invariants.md:532-541,642-761` (entries whole): the changed invariant and its neighbours of the account-server part.
- `foundations/part_map.md:56-73` (account-server entry): to confirm `src/server/**` claims the new module and that no map change was needed.
- `docs/task-cycles/konta-graczy-i-logowanie/plan.md` grep for F21 and F25: to place the table-completion and part-map scope.
- `src/server/session-store.ts` (grep for destroy, touch and callbacks) and `src/server/database.ts` (grep for `ON DELETE`, `destroySession`, `findAccountById`): to confirm that destroy errors reach the callback and that account deletion cascades to sessions.
- `node_modules/express-session/session/session.js` and `index.js` (lines above): the destroy and renewal ordering.
- `tests/transport.test.mjs` (whole): unchanged helpers and the precedent for test-only routes.
- `guidelines/coding.md`, `guidelines/coding-http-application.md`, `guidelines/coding-database-access.md`, `guidelines/coding-session-store.md` (each whole), as selected.

No synthetic session value, cookie value, password hash or secret is reproduced in this report.
