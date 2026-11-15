# Report — executor of slice 14 (exemplar and adopted-discipline decisions)

**Status:** done with concerns (the concerns are judgments a reviewer may weigh differently; listed under "Choices" and "Concerns").

## Commits (base `cd24bdda047f5fd0229231e04275dba8723a044e`)

- `31f9139f8f73f364f8c99534b2b0558bfcb20c39` test: :white_check_mark: mark the tests that hold the sentences of the decisions on password hashing, database access, the session Store, account policy, the browser API client and mail sending with lines decision:
- `20cb341c348b04b11f97e00e35bfb53cb21ca330` docs: :memo: name the tests of D-113, D-114, D-115, D-116, D-117 and D-162, add a pair to D-113 and rewrite the pair of D-115, D-116, D-117 and D-162 only for the part no invariant and no test holds

Author address checked: `git log -2 --format=%ae` gives `mariusznn@gmail.com` for both.

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 16 | 14 |
| `tests/account-api.test.mjs` | 17 | 0 |
| `tests/account-mail.test.mjs` | 10 | 0 |
| `tests/account-storage.test.mjs` | 4 | 0 |
| `tests/http.test.mjs` | 15 | 0 |
| `tests/password-measurement.test.mjs` | 1 | 0 |
| `tests/passwords.test.mjs` | 1 | 0 |

Every test file is outside the slice's *Change* (it names only the log); item 5 of "Work of every slice" applies to each, one line per file:

- `tests/account-api.test.mjs` (part browser-view): lines for D-117; styleguide read in part (see Unread material); focused run passed.
- `tests/account-mail.test.mjs` (account-server): lines for D-162; focused run passed.
- `tests/account-storage.test.mjs` (account-server): lines for D-114 and D-115; focused run passed.
- `tests/http.test.mjs` (account-server): lines for D-113 and D-116; focused run passed.
- `tests/password-measurement.test.mjs` (build-tools): line for D-113; focused run passed.
- `tests/passwords.test.mjs` (account-server): line for D-113; focused run passed.

Form: as earlier slices, each line stands inside the test's body as its first lines, after the `// invariant:` and `// decision:` lines already there (the file's form), never removing or moving a mention.

## Checks (command — exit code)

- `python -B .the-way/elements/common/foundation_check.py` at the base — 0; `0 errors`; none of the slice's eleven decisions listed.
- `python -B .the-way/elements/common/foundation_check.py` after the change — 0; `0 errors`; lists `held by nothing` only D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220 (none of the slice's), the same list as at the base. The check validated every new quotation (0 errors).
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/passwords.test.mjs tests/password-measurement.test.mjs tests/account-storage.test.mjs tests/http.test.mjs tests/account-mail.test.mjs tests/account-api.test.mjs` — 0 ("All matched files use Prettier code style!").
- `npm test -- tests/passwords.test.mjs` — 0 (2 tests, 2 pass).
- `npm test -- tests/password-measurement.test.mjs` — 0 (12 / 12).
- `npm test -- tests/account-storage.test.mjs` — 0 (82 / 82).
- `npm test -- tests/account-mail.test.mjs` — 0 (10 / 10).
- `npm test -- tests/account-api.test.mjs` — 0 (32 / 32).
- `npm test -- tests/http.test.mjs` — 0 (95 / 95).
- `git diff -U0 cd24bdda -- foundations/decisions.md`, read: six hunks, each inside the *Verification* field of D-113, D-114, D-115, D-116, D-117 or D-162 (hunks at 2313, 2341, 2356, 2371, 2386, 3445 of the base).
- Not run: the full `npm test` (the cycle's run, not a slice's); `test_ruff_source_rules` and `test_shellcheck_source_rules`, known failing at the base, not touched.

No test was written and no invariant test changed, so no failing run applies.

## Table of decisions (item 6)

| Decision | Held in whole or in part by tests (`path:line` of the line, case) | Held by invariants | Held by nothing | *Verification* |
|---|---|---|---|---|
| D-34 | none | none | both sentences (exemplar `resources.ts` and guidelines read; catalogue only an example) | unchanged |
| D-35 | none | none | both sentences | unchanged |
| D-36 | none. `tests/view/program-panel.test.mjs:866` "time passing keeps what is typed …", `:1642` "dispose() takes the panel out of the page" and `tests/view/headquarters-screen.test.mjs:586` "the field keeps its element …" mention D-36 in a comment; they hold focus-keeping and disposal behaviour, which D-36's second sentence keeps only as examples in the guidelines, not a requirement — judged mentions only, no line | none | both sentences | unchanged |
| D-37 | none | none | both sentences | unchanged |
| D-38 | none (no tracked test reads the styleguide; the-way's `foundation_check.py` checks the guideline's form, but it is a script of the pin, neither a test of loop2 nor an invariant) | design-token-sources holds one rule the template brings, not the sentence | the sentence (styleguide holds every required rule and example in order) | unchanged |
| D-113 | sentence 2, in part: `tests/passwords.test.mjs:51` "compiled password operations create and verify the production Argon2id profile" (exact content, trimmed fails, profile m=65536,t=3,p=1); `tests/http.test.mjs:862` "registration stores an Argon2id hash of the exact password and signs this browser in at once" (trimmed password refused, profile); `tests/http.test.mjs:3411` "a working link sets the exact password once, …" (trimmed new password fails, profile); `tests/password-measurement.test.mjs:63` "the entrypoint measures the production profile and gate with synthetic passwords only" (measurement with that profile and the gate of two) | password-operation-gate (shared bounded gate; its test `tests/passwords.test.mjs:5` gets no line, R1); player-argon2-password-hash (Argon2id by `argon2`); player-argon2-deployment-check (measured in the deployed image) | sentence 1 (exemplar and guidelines read) | pair added |
| D-114 | sentence 2, in part: `tests/account-storage.test.mjs:163` "two connections cannot insert the same normalized email and SQL characters remain data" (bound values); `:207` "a schema initialization failure rolls back every new table and version" (transactional initialization); `:2559` "startup and bounded periodic cleanup remove expired rows and disposal stops its timer" (disposal) — each built with no HTTP and no hashing | none | sentence 1; of sentence 2 the ownership of the connection and independence as structure | tests clause added; pair kept as it stood (it already spoke only of the unheld part), its lead-in changed to "with the part no test holds" |
| D-115 | sentence 2, in part: `tests/account-storage.test.mjs:2502` "Store callback failures are delivered once and callback exceptions are not swallowed" (adapting callbacks) | account-session-storage (validation of stored identity and cookie data before hydration, blocked and hash guards, renewal) — its tests get no line (R1) | sentence 1; "leaves HTTP and cookie policy to application assembly" | pair rewritten |
| D-116 | sentence 2, in part: `tests/http.test.mjs:1580` "the password rules of a new password are those of registration, with the same problems" (normalizes and checks credentials, policy alone); `:1628` "a locked address admits a login after its attempts are cleared, …", `:1657` "clearing an address's attempts leaves its client address's failures counting", `:1770` "clearing an unknown address changes nothing and a clear frees a locked place …" (policy alone, no HTTP, hashing or database); `:1683` "a login in progress at a clear keeps its reservation and settles once on the same entry" and `:1727` "a login in progress at a clear that is released leaves the failures made after the clear counting" (also settled once); `:1748` "a login in progress at a clear leaves no reservation behind once it has failed" (supplied clock moved, policy alone); `:1239` "five failed logins lock an address for 15 minutes …", `:1291` "one client address is admitted twenty failed logins …", `:1362` "one client address creates five accounts per rolling hour, …", `:1437` "a disconnected login keeps its reservation …", `:1514` "full limiter tables refuse newcomers without evicting a live restriction", `:1896` "a blocked account's correct password gets its own refusal …" (supplied clock: each moves the clock given to the policy and fails if the policy read the computer's clock) | account-attempt-limits (thresholds, settlement only after password work whatever the client) · account-attempt-tracking (bounded table) | sentence 1; no counters kept outside the policy | pair rewritten |
| D-117 | sentence 2, in part ("typed failure"): `tests/account-api.test.mjs:285` "a success status other than the call's own is no success, …", `:323` "a success status with a body that is not an account …", `:377` "register gives the confirmation message outcome …", `:423` "sendConfirmationMessage gives the outcome of a 200 answer …", `:452` "an error status is a refusal carrying the server's code and message, …", `:569` "an error status without a known code is a refusal by status …", `:594` "a server that never answers, or stalls inside the body, ends in a timeout failure", `:621` "a connection that fails before or inside the answer is a network failure, …", `:732` "loadSavedGame is no success for another status …", `:779` "loadSavedGame turns an error status into a refusal, …", `:836` "saveGame maps each documented refusal to its own outcome", `:855` "saveGame reports every other answer as a failure, …", `:898` "saveGame reports a dead connection as a network failure …", `:1019` "loadPreviousSavedGame is no success for another status …", `:1063` "loadPreviousSavedGame turns the refusals, …", `:1136` "resetSavedGame turns the refusals, …", `:1237` "reportBrowserFailure gives a failure, never a throw, …" | account-client-requests (relative `/api/` paths, no redirect) · account-client-outcomes (success only for own status and well-formed body; every other answer, failed connection and time limit a failure) | sentence 1; "keeps no identity, cookie or document state" | pair rewritten |
| D-162 | sentence 2, in part: `tests/account-mail.test.mjs:284` "a message is submitted only after STARTTLS and login …" (submits to the mail service); `:474` and `:513` "the submitted (reset) message has one recipient, …" (composes both kinds); `:306` "a server that offers no STARTTLS …", `:325` "a STARTTLS upgrade to a certificate not trusted …", `:388` "a crafted recipient fails without connecting, …", `:431` "each failure with no error of the library names its reason, …", `:549` "a crafted recipient of a reset message fails without connecting" (failure as result); `:355` "a server that stops answering yields failed within the shortened deadline …" (bounded time); `:568` "nothing the mailer writes to the console holds the password, the login, the token or the link …" (no credential, token, link or message in a log) — all with no HTTP server and no database | none | sentence 1; no composing in a route and no database or request read by the mailer, as structure | pair rewritten |

## Pairs added or rewritten (for the human's acceptance at the merge)

D-113 (added; lead-in "An agent compares a change with the part no invariant and no test holds:"):
- complies: the kind guidelines of password hashing naming `src/server/passwords.ts` as the exemplar, and the table of kinds in `guidelines/coding.md` sending a password-hashing file to them
- violates: the kind guidelines of password hashing naming another file as the exemplar; the table of kinds in `guidelines/coding.md` no longer sending a password-hashing file to them

D-115 (rewritten):
- complies: session-store guidelines naming `src/server/session-store.ts` as the exemplar; the cookie's name, flags and lifetime set where the application is assembled, the Store keeping and checking what the library hands it
- violates: session-store guidelines naming another file as the exemplar; the Store setting the cookie's flags or lifetime, or reading the HTTP request

D-116 (rewritten):
- complies: account-policy guidelines naming `src/server/account-policy.ts` as the exemplar; a new kind of attempt limited by a method of the policy that its route calls
- violates: account-policy guidelines naming another file as the exemplar; counters of attempts kept in a route handler beside the policy

D-117 (rewritten):
- complies: browser API client guidelines naming `src/browser/account-api.ts` as the exemplar; a client whose only setting is its time limit, each call reading nothing an earlier call left
- violates: browser API client guidelines naming another file as the exemplar; a client that keeps the signed-in account, writes `document.cookie` or `localStorage`, or changes the page

D-162 (rewritten):
- complies: mail-sending guidelines naming `src/server/account-mail.ts` as the exemplar; a new kind of account message composed by a function of that file and handed to the mailer by its route
- violates: mail-sending guidelines naming another file as the exemplar; the subject or text of a message composed in a route handler; the mailer reading the database or the request

D-114's pair stands word for word as at the base; only its lead-in became "An agent compares a change with the part no test holds:".

## Choices, with the way rejected and the cost if wrong

1. **"Against a supplied clock" (D-116) marked on every attempt test that moves the policy's clock**, through the routes too (`http.test.mjs:1239, 1291, 1362, 1437, 1514, 1896`), by the rule "it holds what it would fail on". Rejected: marking only the policy-level case `:1748`. Cost if wrong: six lines a reviewer reads as weaker than they are. The browser-report limit cases (`:5745`, `:5797`) also move that clock, but I judged a browser report no "attempt" of D-116 (its relations are D-98, D-99, D-102, D-103; the report limit is D-356's), so they got no line.
2. **D-116 "independently of HTTP, password hashing and the database" held in part by the cases that run the policy alone** (`:1580, 1628, 1657, 1683, 1727, 1748, 1770`): each builds `AccountPolicy` with a clock only and would fail if it came to need a database or a server. The same reading gave D-114's and D-162's cases their "with no HTTP server …" in the clause. The structural part (no import, no state elsewhere) stays in the pairs.
3. **D-114 "transactional schema initialization" read as the schema of a new database** (D-112 says opening "initializes a new database, moves an existing older known version forward"), so `account-storage.test.mjs:207` got the line and the failing-migration cases (`:359`, `:501`, `:717`, `:768`, `:799`) did not. Cost if wrong: five missing lines.
4. **D-113's measurement "in the deployed container image"** left to the invariant player-argon2-deployment-check (method review); the launcher cases of `password-measurement.test.mjs` (`:288` and after) hold D-106's bounds of the run, not that the measurement was made, and got no line. `tests/http.test.mjs:1011` "passwords count 12 to 128 …" got no D-113 line: a hashing that trimmed both sides alike would still pass it.
5. **D-117's lines quote the sentence to "as a typed failure"**, stopping before "keeps no identity, cookie or document state", which no test holds; D-162's lines quote as far as the part each case holds.
6. **Dropped from D-117's pair** the screen reading the client's typed result and the screen calling `fetch` itself: no binding sentence of D-117 names a screen; they come from its *Rationale*. Cost if wrong: an agent loses that comparison example; the sentence itself is unchanged.
7. The lines were inserted by a one-off script (`.runs/executor-14/insert.py`, line endings kept, every title matched once before writing), then each placement read in the diff.

## Concerns (R3: wording of a decision against the code or tests — nothing of the entries changed)

- D-34, D-35, D-36, D-37: their second sentences speak of what the kind guidelines show as examples, not of code; no test can hold them, so each keeps its pair. D-36's code comments (`src/browser/view/*.tsx`) and three view tests cite D-36 for focus-keeping and disposal, which D-36 leaves as examples; the requirement they hold belongs to other decisions (browser-view-framework, D-03), so the citation of D-36 there reads stronger than the decision.
- D-38: the form of the styleguide is checked by the-way's `foundation_check.py`, which cannot carry a line `decision:`; the pair stays as the only holder of the sentence.
- D-113 lists player-argon2-deployment-check under `invariants:`, but the invariant's *Derives from* names only D-106, and password-operation-gate derives from D-113 while player-argon2-password-hash names only D-106 too: the template asks each listed invariant to name the decision in *Derives from*. Left as it stands (R1: `invariants:` stays); for the human.

## Own-work check

Requirement most likely not met: "every test that holds a sentence carries a line" — a test in a file beyond the six I searched. Check: `grep -rlE "SmtpMailer|createAccountClient|hashPassword|verifyPassword|new AccountPolicy|account-mail\.js|session-store\.js" tests` → also `tests/startup.test.mjs` and `tests/transport.test.mjs`. Read their uses: `startup.test.mjs:499` "configured runtime has a real database and dummy hash and releases its connection" checks the dummy hash is Argon2id and refuses an unrelated password (no exact-content, no profile parameters) and `transport.test.mjs:534` only builds a hash for a fixture; neither holds a sentence of the slice's decisions. A search for `exemplar`, `coding-*.md`, `styleguide` and `guidelines/` in `tests/` found no test that reads a guideline file (positive control: the same Grep found `styleguide` in two comments of `tests/view/program-list.test.mjs`).

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` (named by the method's row) and `.the-way/elements/decisions/skill/read.md` (named by the decisions skill), whole.
- `the author's rules on writing scripts, outside the repository` and `.ai/rules/git.md` (user rules before a script and a commit).
- `guidelines/styleguide-browser-view.md`, in part, because `tests/account-api.test.mjs` is of the part browser-view (item 5).
- Source greps in `src/server/session-store.ts`, `src/server/app.ts`, `src/server/account-routes.ts`, `src/browser/account-api.ts`, `src/server/account-policy.ts` to check that the rewritten pairs describe the code (cookie policy set in assembly and routes, the Store only validating; the client holding only its time limit).

## Working copies

`.runs/executor-14/` under the worktree held `fc-base.txt`, `fc-after.txt`, `insert.py`, `spec.json`, `insert-out.txt`, `lines.txt`, `runs.txt` and the six `run-*.log`; the report carries what they showed; the directory was removed before return (see the last line).

## Unread material

- `tests/http.test.mjs`, `tests/account-storage.test.mjs`, `tests/account-api.test.mjs`, `tests/account-mail.test.mjs`, `tests/password-measurement.test.mjs`: read by case and by line range, not whole (orchestrator's instruction; the method asks every changed file whole). Read: every case named in the table, the list of every case's name in each file, `account-mail.test.mjs:282-632`, `account-storage.test.mjs:130-239, 2255-2617`, `http.test.mjs:1552-1755` and the headers of every case given a line. `tests/passwords.test.mjs` read whole.
- `guidelines/styleguide-browser-view.md`: lines 1-12 and its headings and lines naming tests only (80 KB; context kept for the judgments). Nothing in what was read bears on a comment line in a client test.
- `foundations/part_map.md`: only the lines naming the six test files and the part headings. `foundations/glossary.md`: not read (no term of the slice's sentences needed it).
- `.the-way/elements/decisions/template.md`: lines 108-262 (covering the three named ranges).

## Searches not found or unclear

- No test of loop2 reads a coding or styleguide guideline file: the first sentence of every decision of the slice (the exemplar and its guidelines read) is held by nothing.
- No test holds D-115's "leaves HTTP and cookie policy to application assembly" nor D-117's "keeps no identity, cookie or document state" (searched `cookie`, `localStorage`, `sessionStorage`, `document.` in `tests/account-api.test.mjs`).
- Unclear: whether "schema initialization" of D-114 covers moving an older database forward (choice 3), and whether a browser report is an "attempt" of D-116 (choice 1).

Removal: `.runs/executor-14` removed with `rm -rf`; `test ! -e` confirmed it is gone. No worktree or clone was made.
