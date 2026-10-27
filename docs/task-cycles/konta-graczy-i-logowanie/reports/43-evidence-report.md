# Slice 8 report — account permission and invariant evidence reconciliation

**Status:** done with concerns. Two evidence gaps are returned to the orchestrator (section "Returned to the orchestrator"). Neither is papered over: no Violated mark was set or cleared, and the entries keep their full promise.

- Worktree `C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie`, branch `task/konta-graczy-i-logowanie`.
- Base `94900832a2390a987bd79eea04cbfd0e571ac46e` (clean at start). Head `f34ed3fa8a93616a34fc6c6cac6b203b290dc578`. Working tree clean after the commit.
- Process checkout and gitlink both `574a37b9ab9572f876298f4cc10754581222d3f0` (checked at start; the verifier log prints the same pin).
- Nothing pushed, merged, rebased or reset. No target, secret, deployment, vault, global or other-worktree file touched. PR 31 and its mutation rule were not touched.

## Commit and changed paths

| Commit | Message |
|---|---|
| `f34ed3fa8a93616a34fc6c6cac6b203b290dc578` | Complete the account permission table and state two invariants as their evidence supports |

`git diff --numstat 9490083..f34ed3f`, both files keep LF (`git ls-files --eol`: `i/lf w/lf`):

| File | Added | Removed |
|---|---:|---:|
| `guidelines/testing.md` | 18 | 5 |
| `foundations/invariants.md` | 2 | 2 |

Two paths, exactly the slice's Change list. The staged paths were named one by one.

## Checks run (command and exit)

| # | Command | Exit | Result |
|---|---|---:|---|
| 1 | `git status --short`; `git log --oneline -1`; `git -C .the-way rev-parse HEAD` | 0 | Clean at 9490083; pin 574a37b both ways. |
| 2 | `python -B .the-way/elements/common/foundation_check.py` (local, after the edits, and again after the commit) | 0 | `0 errors` both times. |
| 3 | `git diff --check` before the commit | 0 | No whitespace errors. |
| 4 | `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie`; `git bundle list-heads` | 0 | Head f34ed3f. |
| 5 | `docker run --name loop2-task15-evidence43-final --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify.sh f34ed3fa8a93616a34fc6c6cac6b203b290dc578 7012abcfb55b4ba2b2836b574a2275eb1551df28` (Git Bash, `MSYS_NO_PATHCONV=1`), once | 0 | `43-evidence-final.log` beside this report. Exact head `HEAD is now at f34ed3f`, process pin 574a37b. Full `npm test` through the established Linux harness: Node 396 tests, 396 pass, 0 fail, 0 skipped; Python 5, 65, 176 and 32 tests, every directory OK, `skipped=3` in the 32-test directory; foundation check `0 errors`. `docker inspect` exit code 0. |

**Not run or unchecked:**

- The three tests skipped on Linux (`test_native_windows_readers_reject_nonterminating_cim_errors`, `test_native_windows_readers_keep_owned_child_in_healthy_observation`, `test_failed_descendant_query_still_terminates_known_main_process`). The run prints only `skipped=3`. No Linux pass is attributed to them.
- The Windows full gate; not rerun.
- Target-image Argon2 measurement, real provider (Cloudflare) settings, secure-cookie acceptance and client-address handling on the target, the public browser journey: unchecked, outside this slice. `player-argon2-deployment-check` stays Violated yes.
- No focused tests, no new tests and no mutation run of my own, as the handoff says. No screenshot: no interface changed.
- The merged state with upstream PR 31 (its mutation rule and its full/focused gate): not reconciled here. `guidelines/testing.md` still has no "Mutation testing" rule and the log holds no target merge; root's final integration owns it.
- The owned container `loop2-task15-evidence43-final` is left exited for inspection.

## Permission table: each row, its route rule and its direct refusal assertion

Method: the rows come only from the cited decisions (pinned testing template, "Trust boundaries" and "Writing the file"). A choice no decision settles is not a row. Test names are the titles in `tests/http.test.mjs` (H) and `tests/transport.test.mjs` (T). Statuses are the tests' exact values; the rows say "odmowa 4xx" where the decision asks only for a refusal.

| Row (who, resource, action) | Decision | Route rule (`src/server/account-routes.ts`) | Direct assertion |
|---|---|---|---|
| Existing row 1, sessionless lookup and logout: now says `POST /api/logout` that meets the Origin, JSON and empty-object requirements (changed, Minor 3 of report 36) | D-107 | `unauthenticated` on `GET /api/account`; logout checks body, then `sessionAccount` | H "absent, tampered, unknown, expired and deleted sessions authorize neither lookup nor logout" (401 for lookup and logout, rows unchanged) |
| Existing rows 2-4 | D-107, D-95 | unchanged | unchanged (slice 6, re-reviewed PASS at 480309c) |
| Visitor creates an account | D-94, D-107 | `POST /api/accounts` to `signIn` 201 after `establishSession` awaits `regenerate` and `save`; failure detaches the session, 503 | H "registration stores an Argon2id hash of the exact password and signs this browser in at once"; H "a failed session save keeps the new account usable and issues no success cookie" |
| Invalid address, or password outside 12-128 code points or not equal to its repeat | D-96, D-97 | `checkRegistration` before admission, then 400 | H "passwords count 12 to 128 Unicode code points and keep their exact content"; H "malformed fields and out-of-shape credentials are refused before password work or writes" (runs inside a full gate, so any hashing would answer 429) |
| Address that already has an account, also in a race, other case or padded | D-97, D-98 | duplicate pre-check releases and 409; lost insert (`createAccount` null) releases and 409 | H "one normalized address holds one account and a duplicate gets the required message, also in a race" |
| Visitor logs in | D-107 | `POST /api/session` to `verifyPassword`, `succeed()`, `signIn` 200 | H "a credential success replaces only this browser's session with a fresh identity"; H "a failed session save keeps the new account usable and issues no success cookie" |
| Unknown address or wrong password | D-98 | both give `fail()` and `invalidCredentials`; unknown address verifies against the startup dummy hash | H "a known address with a wrong password and an unknown address fail login identically" |
| Attempts over the thresholds (5 per email, 20 per client address in 15 minutes, 5 created accounts per hour, in-flight counted) | D-100, D-101 | `policy.admitLogin` and `admitRegistration`, 429; capacity refusals release, not fail | H lock, IP, registration-limit and disconnect cases carrying `account-attempt-limits` |
| Full tracking table | D-101 | `room()` in `account-policy.ts` before a key is created | H "full limiter tables refuse newcomers without evicting a live restriction" (login branch only, see concern 2) |
| Origin missing, null, duplicate, malformed or foreign on the three state-changing routes | D-102 | `mutationGuards(publicOrigin)` mounted before the three handlers | T "refused state-changing requests change no account or session and do no password work" (22 shared variants, each with a body that would succeed if admitted) |
| Media type, compression, size, shape and field types | D-102 | same guards, then `stringFields`; logout requires an empty object | same T case, plus H malformed-input case |
| Account requests with missing, duplicate, list or malformed `X-Forwarded-Proto` or `CF-Connecting-IP`; other forwarding headers choose nothing | D-108 | `router.all` gate on `response.locals.accountClientAddress`, 403 | T "transport refuses ambiguous proxy metadata before loading live sessions" (GET `/api/account` with a live session; record unchanged; static asset still 200); T "canonical transport identity ignores caller-selected forwarding chains"; H registration-limit case under mutation d1 (limiter key) |

The boundary row for `src/server/` now names each refusal invariant with its direct case, and the rule's *Decision* and *Invariant* fields list every decision and invariant the rows and that row cite. Polish: Tabela uprawnień ma teraz wiersze dla założenia konta, logowania, nieudanego logowania, progów prób, pełnej tablicy śledzenia, nagłówka Origin, rodzaju i kształtu treści oraz danych pośrednika, każdy z decyzją, z której wynika; wiersz granicy serwera wymienia przy każdym niezmienniku test, który bezpośrednio sprawdza odmowę.

Other `guidelines/testing.md` changes. Polish: Przepis testu integracyjnego wymienia teraz pliki testów transportu, magazynu kont i haseł, a sekcja „Where in code” je wskazuje.

- Integration recipe *Files* and *Where in code* gain `tests/transport.test.mjs`, `tests/account-storage.test.mjs`, `tests/passwords.test.mjs`. Level check against the glossary: transport and storage tests use real SQLite files and local HTTP; `passwords.test.mjs` runs a child Node process. All three are integration tests (real files, local HTTP, processes).
- No "Mutation testing" rule was added: the mutation rule of PR 31 stays for the final reconciliation (spec section 9).

## Invariant reconciliation

Evidence for each entry is the retained failure and restoration record of its slice, as read by the independent reviews (reports 30, 36, 38, 40, 42, which opened those logs). I did not open the mutation logs themselves; I relied on the author reports and the reviews' own log checks. Each entry's complete sentence was read against its cited tests.

| Entry | Method, Violated | Fail-once and restoration evidence | Result |
|---|---|---|---|
| `account-session-authorization` | test, no | Slice 6: `34-session-red-final.log` (8 assertion failures at base), mutations guards (`response.json({})` in place of the refusal), identity (`request.query.accountId ??`), logout-target (deletes sessions of the named account); restored by `34-session-final.log`, exit 0 | **Sentence changed** (below). Mark stays no. |
| `account-mutation-request-guards` | test, no | Slice 7: red run (14 failures), a5 (Origin check on logout only), c5 (unexpected fields ignored); restored by `39-credentials-final.log`, exit 0 | Unchanged. "Before password work" rests on the guards sitting before every handler and no refused variant changing state; a fault that hashes and then refuses would not be caught by status alone. |
| `account-request-transport` | test, no | Slice 5: fixed identity before validation fails both transport cases; slice 7 d1 (`request.ip` as registration key) fails the limiter-key assertion; restored by `29-startup-final.log` and the final gate | Unchanged, with gap 1 below. |
| `account-attempt-limits` | test, no | Slice 7: a1, a2, a3, c1, c2, e1, e2; restored by run 14 and now by the exact head | **Wording changed** (below). Email clause corrected earlier at 9490083. |
| `account-attempt-tracking` | test, no | Slice 7: a4 (evicts before sweeping) | Unchanged, with gap 2 below. |
| `player-argon2-password-hash` | test, no | Slice 7: b1 (hash of the trimmed password) fails the package's own `argon2.verify` | Unchanged. |
| `password-operation-gate` | test, no | Slice 1 mutations (`slice1-password-gate-mutation.log`); `passwords.ts` untouched since | Unchanged. |
| `account-session-storage`, `account-database-schema`, `account-schema-lifecycle`, `player-opaque-session-cookie`, `player-express-session-sqlite-store`, `account-startup-configuration` | test or review, no | Slice 2 (`15-slice2-mutation.log`, `17-slice2-fix-red.log`) and slice 5 (`29-startup-red-*.log`) | Unchanged. The deployed Store entry keeps method review: local assembly does not certify a running target. |
| `account-save-durable-storage` | review, **yes** | none | **Kept whole.** The sentence covers accounts and saved game states. No save code exists and no container replacement was run, so it is not cleared and not narrowed. |
| `player-argon2-deployment-check` | review, **yes** | none | Kept. Needs the human's measurement on the deployed image. |
| `account-save-sqlite-access` | review, **yes** | none | Kept. Local checks show `node:sqlite` only; the sentence also covers the save server, and the plan puts image evidence in a later slice. |
| `loop2-shared-public-origin` | review, **yes** | none | Kept: the browser client is slice 9. |
| `player-self-registration`, `player-password-login`, `email-verification-nonblocking` | review, **yes** | none | Kept as instructed: their evidence is the browser of slice 9. The server half exists and is tested; each sentence is about the player. |

### Sentences changed through the-way-record-invariant

Only the sentence changed; method, rests on, derives from, part and Violated are the same. A Violated mark was neither set nor cleared.

1. `account-session-authorization` (Minor 3 of report 36, stated as the evidence supports).
   - Before: "The account API returns JSON 401 for `GET /api/account` or `POST /api/logout` without a valid server-side session, and an account identifier supplied by the caller cannot authorize reading or changing another account or session."
   - Now: "The account API returns JSON 401 for `GET /api/account`, and for `POST /api/logout` that meets the Origin, media-type and body requirements, without a valid server-side session, and an account identifier supplied by the caller cannot authorize reading or changing another account or session."
   - Why: a sessionless logout with a wrong Origin, wrong media type or a non-empty body is refused earlier (403, 415, 400), as D-102 and D-107 ("subject to the ... guards") require. The cited cases send guard-satisfying logouts and expect 401, so they agree with the new wording.
   - Polish: Bez ważnej sesji na serwerze odczyt konta, a także wylogowanie spełniające wymagania nagłówka Origin, rodzaju i treści żądania, dostają odpowiedź JSON 401, a identyfikator konta podany w żądaniu nie pozwala odczytać ani zmienić cudzego konta ani sesji.
2. `account-attempt-limits` (Minor 2 of report 40).
   - Before: "...and settles each admitted attempt only when its password work has completed, whether or not its client is still connected."
   - Now: "...and settles each admitted attempt only after the password work it started has completed, whether or not its client is still connected."
   - Why: a duplicate registration is released by the pre-check and a gate refusal is released when the gate throws; neither started password work, so "only when its password work has completed" had nothing to wait for. The disconnect case still agrees: an attempt that started work is not settled until it ends.
   - D-114's second binding sentence keeps the older wording; I may not edit decisions in this slice. Recommendation: align it when root next touches D-114 (the identifier collision with PR 31 already makes root revisit it).
   - Polish: ... każdą dopuszczoną próbę rozlicza dopiero po zakończeniu pracy hasła, którą ta próba rozpoczęła, także gdy klient się rozłączył. (Reszta zdania bez zmian; po poprawce z 9490083 liczy porażki od ostatniego udanego logowania w ciągu ostatnich 15 minut.)
   - The same correction of report 42's Minor note applies to the Polish meaning in reports 39 and 41: failures are counted "od ostatniego udanego logowania, z ostatnich 15 minut", not "w ciągu 15 minut od ostatniego udanego logowania".

## Returned to the orchestrator (evidence the entries claim and the tests do not show)

I did not add tests (slice rules) and I did not narrow either promise, since narrowing a trust-boundary promise to fit a missing test would weaken it. Both entries keep Violated no, as accepted by the independent reviews; the review-kept parts are stated plainly in the boundary row of `guidelines/testing.md`. Recommendation for the owning code slice or the whole-change review: add the tests below.

1. **`account-request-transport`, before password work on the POST routes.** The sentence says the request is refused "before session authorization or password work". The direct case (T "transport refuses ambiguous proxy metadata before loading live sessions") sends only `GET /api/account` and a static asset. No test sends `POST /api/accounts` or `POST /api/session` with invalid transport headers. A fault that applied the `accountClientAddress` check to the GET route only would pass the suite (I confirmed by `grep` that no test of `tests/` sends a POST with missing or malformed forwarding headers). *Recommendation:* in the guards case or the transport case, add one POST variant per credential route with a missing `X-Forwarded-Proto` and a body that would succeed, asserting 403 and unchanged accounts and sessions; mutation: move the gate behind `router.get`.
2. **`account-attempt-tracking`, registration branch.** Report 40, Minor 4. `admitRegistration` has its own room check (`account-policy.ts`, about line 186). The cited case fills the tables with logins only. Removing that check would leave the suite green, although the sentence covers "an attempt that needs a new key". *Recommendation:* one more step in the tracking case: with both address slots live, a registration from a third address gets 429 and creates no account; mutation: drop the room check in `admitRegistration`.

Also known and unchanged (review-kept, not a new finding): the clause "refuses before password work" of `account-attempt-limits` for a refused attempt (report 39, "Not caught by any test"; report 40 notes the disconnect case catches admission moved after the work, not "admit, then still verify a refused attempt").

Minor findings of reports 36 (2, 4) and 40 (3, 5, 6) were not taken up: they do not state something an entry claims, except those handled above. For the review of the whole change: 36-2 (message "touches" over-claims), 40-3 (three overlap cases do not assert overlap), 40-5 (lone surrogates reach Argon2 as U+FFFD), 40-6 (full-table sweep cost).

## Mental mutations of this documentation change (not executed)

| Plausible fault | Caught by |
|---|---|
| A row cites a decision or invariant that does not exist, or an identifier renamed in the PR 31 renumbering | `foundation_check.py` (`0 errors` run twice and inside the full gate) |
| A row promises a refusal the code does not give (the report 36 finding, again) | Not caught by any command; checked by hand per row against the route rule and test in the table above |
| A row cites a test title that does not exist in the file | Not caught by any command; titles were copied from `tests/http.test.mjs` and `tests/transport.test.mjs` and checked with `grep` |
| A new test file left out of the recipe | `tests/quality/test_node_test_selection.py` covers gate selection, not this list; checked against `git ls-files tests` |
| Sentence rewording makes a cited test contradict its entry | The cited cases were read against both new sentences (section above); no command checks it |
| Edit changes line endings of the two files | `git ls-files --eol`: `i/lf w/lf` for both |

## Own-work check

The requirement most likely not met: "each row from the decisions it cites, a choice no decision settles is not a row". Check: I went through every cell of the new rows against the binding sentences of D-94, D-96, D-97, D-98, D-100, D-101, D-102, D-107, D-108. Two statements go beyond a decision's wording and were softened: "Odmowa 4xx" instead of exact statuses, and no row for "other browsers' sessions stay on login" (D-99 and D-107 do not say it; the test asserts it as spec behaviour). The spec-only items left out: the empty-object rule of logout (implementation choice 2 of report 34), `Retry-After`, the machine-readable codes, `unconfigured` 503.

## Reading reaches beyond the selection

- `.the-way/task-cycle/change/SKILL.md`, `.the-way/product-guidelines/testing/SKILL.md` and `template.md`, `.the-way/elements/invariants/skill/SKILL.md` and `template.md`: method prerequisites that the named project skills point to (the template read through the saved tool output, rules on "Trust boundaries" and the mutation rule).
- `tests/transport.test.mjs:100-300` and `:356-392`, and `grep` of `tests/` for forwarding headers and `403`: to find the direct refusal assertion for transport and to establish gap 1.
- `tests/http.test.mjs:442-488` and `grep -n "^test(" ` with the titles at the lines named above: to copy case titles and check the logout wording.
- `tests/passwords.test.mjs:1-35` and `tests/account-storage.test.mjs:1-30`: level of each test file.
- `foundations/glossary.md:94-104`, already in the selection; `plan.md` rows F20a-F25 by `grep -n "^| F"`: to place which slice owns the remaining Violated entries.
- `reports/17-slice2-fix-report.md`, `reports/29-startup-report.md` (whole), `reports/30-startup-review.md` (summary and evidence ranges), `reports/15-slice2-report.md` (grep): slice 2 and 5 evidence.
- `reports/36`, `37`, `38`, `40`, `41`, `42` whole, as selected. I did not open the mutation or red logs; the reviews' own log checks stand.
- `cycle.md` was not read.

## Observations (no action taken)

- `account-schema-lifecycle` and `account-database-schema` state nearly the same sentence for the same decision. Merging or withdrawing one is a decision for root, not for this slice.
- `guidelines/coding-http-application.md` still has no copy row for `account-routes.ts` (outside this slice's Change list).
- Resources: the owned container `loop2-task15-evidence43-final` (exit 0) stays for inspection. No other worktree, daemon setting or host socket was touched.
