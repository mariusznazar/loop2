# Slice 9 report: relative browser account client

**Status:** done with concerns (the concerns are listed under "Concerns").

**Base:** f34ed3fa8a93616a34fc6c6cac6b203b290dc578. **Head:** 31448168c1a397048ba752d9b46baa01c75c9d56. **Commits:** one, 3144816 "Add the relative browser account client with its tests and make it the browser API client exemplar" (author address the owner's private address). The working tree is clean. The pin `.the-way` is 574a37b9ab9572f876298f4cc10754581222d3f0.

## Changed paths (7, as allowed)

| Path | Added / removed |
|---|---|
| `src/browser/account-api.ts` (new) | 223 / 0 |
| `tests/account-api.test.mjs` (new) | 379 / 0 |
| `guidelines/coding-browser-api-client.md` (new) | 85 / 0 |
| `guidelines/coding.md` (one row) | 1 / 0 |
| `foundations/decisions.md` (D-115) | 15 / 0 |
| `foundations/invariants.md` (two invariants) | 20 / 0 |
| `foundations/part_map.md` | 3 / 2 |

No server file was touched.

## What was built

`createAccountClient({ timeoutMs })` returns `register`, `login`, `currentAccount`, `logout`. Each returns `{ ok: true, value }` or `{ ok: false, failure }`; `failure.kind` is `refused` (error status), `unreachable` (reason `timeout` or `network`) or `unexpected` (answer at a non-error status that is not the call's own success).

The client:
- calls the real global `fetch` with the paths `/api/accounts`, `/api/session`, `/api/account`, `/api/logout`, `credentials: "same-origin"`, `cache: "no-store"`, `redirect: "error"` and an `AbortController` timer that also covers reading the body (default 15000 ms);
- accepts success only at 201 (register), 200 (login, account) or 204 (logout), and for accounts only a body that is a plain object with a non-empty string `id` and `email`; it copies those two fields and drops all others;
- on a status of 400 or more returns the server's `error` text together with `code` only when the code is one of the ten the routes send; otherwise `code` is null and the text is chosen by status (429 uses the required text; every other status uses one client sentence).

Reading and storage: it imports nothing, touches no DOM, cookie, `localStorage` or game state.

## Foundation and guideline consequences

- **D-115** (new, scope browser-view): the exemplar of kind `browser-api-client` is `src/browser/account-api.ts`; binding sentences hold the behaviour of such a client. Relations: D-28, D-106.
- **`account-client-requests`** (new, method test, part browser-view, `Violated: no`): "The browser account client sends each account request to one of the relative `/api/` account paths with the method and JSON body that route takes, and follows no redirect." Derives from D-106 · D-115.
- **`account-client-outcomes`** (new, method test, part browser-view, `Violated: no`): "The browser account client returns an account only for the success status of its request with a body holding a non-empty string `id` and `email`, and returns every other answer, a failed connection and an answer not complete within its time limit as a failure." Derives from D-115.
- **Part map:** browser-view gained `Depends on: simulation · account-server`, the file `tests/account-api.test.mjs` (assigned once), and its sentence now reads "...sends the browser's requests to the account and save server, and holds the kitchen-sink page...". The pattern `src/browser/*.ts` already claims `src/browser/account-api.ts`.
- **Guidelines:** `guidelines/coding-browser-api-client.md` (exemplar row D-115; four rules: relative paths and no redirect, success only for own status and shape, bounded wait, no own state; the last has Invariant none and is kept by review) and its row in `guidelines/coding.md`. No Polish sentence was copied from a vault note.
- **`loop2-shared-public-origin` stays `Violated: yes`.** Meaning (Polish): przeglądarka dziś jeszcze nie wysyła żądań kont przez ten klient, bo ekran z formularzami (kolejny wycinek) go nie używa; znaczenie zmienia dopiero człowiek po wdrożeniu klienta w ekranie, więc ten wycinek go nie rusza.
- Not changed, outside my Change list: `guidelines/testing.md` lists the integration test files by name (`tests/http.test.mjs`, `tests/transport.test.mjs`, ...) and does not list `tests/account-api.test.mjs`, which is an integration test (real local HTTP). The orchestrator should add it in the testing-guidelines step. (Polish meaning: tabela plików testów integracyjnych w testing.md nie zna nowego pliku.)

## Checks (command, exit)

All repository tests ran only as full `npm test` in the Linux harness (reports/linux-verification.md): COMMON = `--network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly loop2-task22-verifier:latest`, target ref 7012abcfb55b4ba2b2836b574a2275eb1551df28, run from Git Bash with `MSYS_NO_PATHCONV=1`; `product.bundle` rebuilt before the red run and again before the mutation and final runs.

| # | Command | Exit | Result |
|---|---|---:|---|
| 1 | local: `npm run build`, `node --test tests/account-api.test.mjs`, eslint `--max-warnings 0` and `prettier --write` on the two new code files | 0 | quick feedback only: 9/9 pass, lint clean. Not the evidence of record. |
| 2 | `docker run --name loop2-task15-client44-red COMMON bash /inputs/verify-session34-overlay.sh f34ed3f... 7012abc... client44-red.tar` | 1 | `44-client-red.log`: first failing run (below). |
| 3 | `... client44-mutation-A COMMON bash /inputs/verify-client44-mutation.sh 3144816... 7012abc... A` | 1 | `44-client-mutation-A.log`: 2 failures, as expected. |
| 4 | same, mode B, first try | 1 | `44-client-mutation-B-anchor-compile-error.log` and `...-anchor-miss.log`: my mutation removed the email check and so did not compile (TS2322), then my script edit did not apply; neither is evidence. I dry-checked both modes' anchors on `git archive` copies and reran. |
| 5 | same, mode B | 1 | `44-client-mutation-B.log`: 5 failures, as expected. |
| 6 | `docker run --name loop2-task15-client44-final COMMON bash /inputs/verify.sh 3144816... 7012abc...` | 0 | `44-client-final.log`: 405/405 Node tests pass, 0 skipped; Python 5+65+176+32 tests OK (`skipped=3`, the three Windows-only tests); foundation check `0 errors` inside `npm test`. Docker-dependent tests ran. |
| 7 | `python -B .the-way/elements/common/foundation_check.py` locally at the head | 0 | `0 errors`. (Before the commit it reported one error: the pattern `tests/account-api.test.mjs` matched no tracked file; expected until committed.) |
| 8 | `git diff --cached --check` before the commit | 0 | clean |

**Not run or unchecked:** the Windows full gate; the three Linux-skipped Windows tests (no Linux pass attributed to them); the secure-cookie browser evidence (slice 11's); real-browser behaviour of `credentials` and of the redirect refusal; the unchanged base was not rerun.

## Fail-first and mutation evidence

**Failing first** (`44-client-red.log`): base f34ed3f with the new test, the foundation files and an empty-shell client (every call returns `unexpected`). Build succeeded; 405 Node tests, 398 pass, 7 assertion failures: "each call sends its documented method...", "the success status of each call with an account body...", "a success status other than the call's own...", "an error status is a refusal carrying the server's code...", "an error status without a known code...", "a server that never answers...", "a connection that fails...". Two tests passed against the shell for a reason the shell explains (the shell always fails, which is also the right answer for the redirect test and the malformed-body table); their failure is shown by the mutations below.

**Executed mutations** (at head 3144816, restoration = the final run, row 6):

| Invariant | Mutation | Failing test and assertion |
|---|---|---|
| `account-client-requests` | login path `/api/session` -> `/api/login` | "each call sends its documented method...": deepEqual of method/url list, `/api/login` vs `/api/session` |
| `account-client-requests` | `redirect: "error"` removed | "a redirect is not followed...": `elsewhereSeen` not empty (`actual: true, expected: false` on the first assertion) |
| `account-client-outcomes` | any status below 300 counts as success | "a success status other than the call's own...": `register 200` |
| `account-client-outcomes` | email field not checked, `String(email)` returned | "a success status with a body that is not an account...": `register with body {"id":"u1"}` |
| `account-client-outcomes` | timer no longer aborts | "a server that never answers...": `silent: no result within 5000 ms` (an AssertionError from the test's own deadline, not a runner timeout) |
| `account-client-outcomes` | error status no longer checked before the success check | "an error status is a refusal...", "an error status without a known code...": `status 400` |

Mutation script: `.runs/account-linux-inputs/mutate-client44.py`; wrapper `verify-client44-mutation.sh` (git-ignored).

**Mental mutations, not executed:** body read outside the time limit (the stalled-body test covers the abort of the body read through the same timer, but I did not mutate it separately); default time limit changed (no test: a constant); sending a body with GET (the test asserts an empty GET body; not mutated); dropping the known-code list check (the "made-up" code case in the code-less test would catch it; not mutated); `credentials` and `cache` options (unobservable, see below).

## Own-work check (section 3)

Requirement most likely unmet: "no false success". Checks: table of 14 malformed bodies x 3 calls at the success status, 7 wrong success statuses, error statuses with an account-shaped body, a redirect to a second real server that would answer with a valid account (it received nothing), connection reset before and inside the body, stalled answer. All pass at the head and each class has a mutation that fails it (table above).

Actual reading reaches: the client was exercised against a real local `node:http` server only. Not exercised: the real account server (the Origin guard and Cloudflare transport headers make a Node `fetch` test heavy, and the secure cookie is slice 11's); a real browser. Explicitly none of: screenshot (no user interface changed; `src/browser/AGENTS.md` token rule does not apply to this file since it has no style), real-browser fetch.

## Reaches beyond the dispatch

Read, by their skills' instructions: `.the-way/product-guidelines/coding/SKILL.md` and `template.md`, `elements/decisions/skill/SKILL.md` and `template.md`, `elements/invariants/skill/SKILL.md` and `template.md`, `elements/part-map/skill/SKILL.md` and `template.md`, `elements/common/rules.md`; `guidelines/coding-account-policy.md`, `coding-http-application.md`; the tail of `foundations/invariants.md` (account entries) and D-106, D-84; the execution scripts under `.runs/account-linux-inputs/`; `tests/http.test.mjs:1-140` and `package.json`. I did not read `cycle.md`. I did not invoke the five skills as tools; I followed their instructions from the pinned files by hand (the skill names resolve to the same files).

## Choices (rejected way, cost if wrong)

1. **Real fetch with a global base address.** `tests/account-api.test.mjs` sets `globalThis[Symbol.for("undici.globalOrigin.1")]` so that the relative paths resolve, the way a page's address does in a browser. Rejected: a base-URL option in the client (would make the client accept absolute addresses, against D-106), a fetch stand-in (forbidden). Cost: the symbol is an undici internal; a Node version that changes it breaks the test file (the guideline example says to recheck on a Node upgrade). The Linux harness runs Node 24.22.1 and passes.
2. **Success needs the call's exact status; extra body properties are ignored but dropped.** Rejected: rejecting extra properties (a harmless server addition would sign nobody in). Cost: a field the server adds is invisible to the client until the client is changed.
3. **Refusal message: the server's text only with a known code; otherwise by status.** This follows slice 7's choice 1. Rejected: showing the server's `error` always (the guard refusals carry English text). Cost: a new server code needs a client change to show its message.
4. **Generic wording is mine.** Three Polish sentences are not from the task or the server: "Brak połączenia z serwerem. Spróbuj ponownie." (no connection), "Serwer nie mógł obsłużyć żądania. Spróbuj ponownie." (server error or unexpected answer); 429 without a code reuses the required text "Za dużo prób. Spróbuj ponownie za kilka minut.". The task fixes no wording for these cases; slice 10 owns the screen and may change them. Cost: wording the owner has not seen.
5. **`redirect: "error"`.** A redirect becomes an `unreachable`/`network` failure. Rejected: following redirects (a password POST could be resent elsewhere). Cost: a legitimate future redirect on an API path would read as a network error.
6. **Default time limit 15000 ms** (a parameter for tests). Rejected: no limit; a shorter one (hashing under the password gate can queue). Cost: a slow server makes the player wait up to 15 s.
7. **One commit** for code, test, guidelines and foundation, because the intermediate states of a split would fail `foundation_check.py` (a citation without its invariant, or a pattern without its file).
8. **Two invariants, not three.** The time limit sits in `account-client-outcomes` ("an answer not complete within its time limit" is a failure). Cost: the sentence has several clauses (answer, failed connection, timeout), which the invariants template's WAY-56 asks to judge; they share one rule: a non-success is never an account.

## Concerns (for the orchestrator)

- `credentials: "same-origin"` and `cache: "no-store"` are set but unobservable under Node `fetch` (no cookie jar, no cache); the guideline and the invariant sentence therefore do not claim them as tested. Real-browser evidence belongs to slice 11.
- The hand-copied contract has no test against the real server in this slice; a server change of status or body shows only when slice 11 or a later integration test runs both. This is the weak point named in D-115.
- `guidelines/testing.md` needs the new test file in the integration test list (see above).
- The only `Violated: yes` account invariant touching this slice, `loop2-shared-public-origin`, stays marked (see above).
- Decision number D-115 and the two invariant names will need renumbering/reconciling with upstream PR 31 by the orchestrator, as the handoff says.

## Contract for slice 11 (and the screen of slice 10)

Import `createAccountClient` and the types from `./account-api.js` (path relative to `src/browser/`; compiled to `dist/public/account-api.js`). A result is `ok` or a `failure`:
- `refused` with `status`, `code` (one of the ten server codes or null) and `message` (show it as is);
- `unreachable` with `reason` and `message`;
- `unexpected` with `status` and `message`.

For the screen: `currentAccount()` with `failure.kind === "refused"` and status 401 means "show the forms"; any other failure means one warning with retry, not a signed-in or signed-out state. `logout()` success is `ok: true, value: null`; a failure is not a logout. There is no cookie handling and no storage; only one request per control should be in flight (the client does not serialize calls).
