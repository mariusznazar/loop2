# Report — executor of slice 9 (password-reset and log-line decisions over HTTP)

**Status:** done with concerns

The concerns are the reach into seven test files that the slice's *Change* does not name (item 5 of "Work of every slice"), the line I drew for D-252 among tests that only parse a log line on the way, and a stale base fact in the handoff. Each is set out below.

## Commits

Range starts at base `199cd6e01f4031c7fd86c551f4ed23bba2c13669`; author address `mariusznn@gmail.com`, the same as the earlier commits of the branch.

- `4c2d5fe8` test: :white_check_mark: mark the tests that hold the sentences of the decisions on sign-in and password reset, the request for a reset link, its limit, the route that sets a password by a link, the server's log lines and the refusals that leave no failure line with lines decision:
- `c6841dc1` docs: :memo: name the tests of D-152, D-222, D-223, D-226, D-252 and D-353, and rewrite the pair of examples of D-222, D-223, D-226, D-252 and D-353 for the part no invariant and no test holds

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 78 | 38 |
| `tests/http.test.mjs` | 49 | 0 |
| `tests/account-storage.test.mjs` | 14 | 0 |
| `tests/view/account-screen.test.mjs` | 6 | 0 |
| `tests/startup.test.mjs` | 4 | 0 |
| `tests/account-backup.test.mjs` | 2 | 0 |
| `tests/account-mail.test.mjs` | 2 | 0 |
| `tests/password-measurement.test.mjs` | 2 | 0 |
| `tests/transport.test.mjs` | 1 | 0 |

Only lines `decision:` were added to tests (no code, name or assertion changed, no decision-number mention removed); in the log only the *Verification* fields of D-152, D-222, D-223, D-226, D-252 and D-353 changed.

### Test files beyond the slice's *Change* (item 5), one line each

- `tests/transport.test.mjs` (account-server): one D-226 line on the guard case whose field variants of `POST /api/password-reset` are refused with nothing set.
- `tests/account-storage.test.mjs` (account-server): D-353 lines on the store case that tells a block's refusal of a session write from another refusal; D-252 lines on the owner's two commands' event and failure-line cases and on the background cleanup's failure line.
- `tests/account-backup.test.mjs` (account-server): D-252 lines on the failed backup's JSON failure line.
- `tests/account-mail.test.mjs` (account-server): D-252 lines on the mailer's reasoned failure line with the fields of its case.
- `tests/startup.test.mjs` (account-server): D-252 lines on the refused listening port's one JSON failure line and the start failure that names kind and code.
- `tests/password-measurement.test.mjs` (build-tools): D-252 line on the two cases where the error's text stands in the report of `measure-passwords`.
- `tests/view/account-screen.test.mjs` (browser-view): D-222 lines on the form „Nie pamiętam hasła” cases; before it I read `guidelines/styleguide-browser-view.md` whole.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the edits, before the last comment-only edit) | 0 | `0 errors`; 11 decisions `held by nothing`, none of D-152, D-222, D-223, D-226, D-252, D-353 |
| same, on the base commit in a temporary worktree | 0 | `0 errors`; the same 11 decisions (D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220) |
| same, after the last edit | 0 | `0 errors`; the same 11 |
| `npm test -- tests/http.test.mjs` | 0 | 95 pass, 0 fail |
| `npm test -- tests/transport.test.mjs` | 0 | 12 pass, 0 fail |
| `npm test -- tests/account-storage.test.mjs` | 0 | 82 pass, 0 fail |
| `npm test -- tests/account-backup.test.mjs` | 0 | 10 pass, 0 fail |
| `npm test -- tests/account-mail.test.mjs` | 0 | 10 pass, 0 fail |
| `npm test -- tests/startup.test.mjs` | 0 | 18 pass, 0 fail |
| `npm test -- tests/password-measurement.test.mjs` | 0 | 12 pass, 0 fail |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 131 pass, 0 fail |
| `npm test -- tests/http.test.mjs` (again, after a comment-only line added to the case "a file whose read breaks off while it is sent…" while the first run was under way) | 0 | 95 pass, 0 fail |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` for each of the eight `.mjs` files | 0 each | `tests/http.test.mjs` checked again after the last edit, exit 0 |
| `git diff -U0 199cd6e0 -- foundations/decisions.md`, read | — | seven hunks, at D-152 (3232), D-222 (4624), D-223 (4679), D-226 (4778), D-252 (5763, 5779) and D-353 (9189); every changed line is a *Verification* line or its continuation |

Not run: the full gate (`npm test` with no file) — the cycle runs it, as the method gives. `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run; the handoff gives them as failing at the base.

## Own-work check

- Requirement most likely missed: "every test that holds one of its binding sentences carries a line" — a holder left without a line.
- Check: an `awk` listing of every case of `tests/http.test.mjs` that calls the reset routes or captures the log, with the D-152/222/223/226/252/353 lines it carries; then a reading of each unmarked one.
- Result: it showed one more holder, „a file whose read breaks off while it is sent is cut, writes one line of the request, and is not handed to Express's own handler” (its faults name Express's own handler printing a stack), which I then marked with D-252 lines. The other unmarked cases were judged and left: „a request needs no session, names only the account…” (D-109's account choice, no D-222 sentence beyond it), „a recorded reset link lives one hour…” (D-155), „a failed renewal after an answer that has ended… calls no destroy” (its fault is the destroy guard, not the line), and the D-356 report cases (see Choices).

## Rows per decision

### D-152

- Whole or in part by tests:
  - S2 "They can start playing before confirming…; a confirmation message establishes that address for account recovery" — in part (the second clause): `tests/http.test.mjs:4876` „each business event of the server leaves one line…” (register, confirm by the message's link, reset message to that address, reset).
  - S3 "A player resets a forgotten password by a single-use link…, without operator assistance" — in part (set by the link alone, refused at its second use): `tests/http.test.mjs:3363` „a working link sets the exact password once…”, `tests/http.test.mjs:4876`.
- By invariants: S1 whole (`player-password-login`); S2 first clause (`email-verification-nonblocking`); S3's single use and the previously confirmed address (`password-reset-verified-email`).
- By nothing: none.
- *Verification*: tests clause added; no pair before and none added (held in whole).

### D-222

- S1 "Every request … gets one and the same answer, which leaves before any work … without waiting for the mail server, so neither its content nor its time tells…; the page then shows „Jeśli … odnośnik." — whole: `tests/http.test.mjs:2843` „a request for a reset link is answered before the mail service is asked…”, `:2873` „the answer … ends before the account is looked up…”, `:2901` „a well-formed address gets the same answer…”; the page part in `tests/view/account-screen.test.mjs:853` „a well-formed address gets the one sentence of the reset under the form in a status…” and `:5984` „a well-formed address gets the one sentence under the form in a status…”.
- S2 "Gdy wiadomość nie przyjdzie… under the form „Nie pamiętam hasła”, in the look D-44 gives that answer, and the form stays…" — in part (the look's bar and role colour not held): `tests/view/account-screen.test.mjs:853`, `:5984`.
- S3 "An address not so written gets „Podaj adres…” under the field and nothing is sent…" — whole: form `tests/view/account-screen.test.mjs:829` „an address not written as name@domain gets its sentence under the field…”, `:5953` „a request checks its address first…”; server `tests/http.test.mjs:3023` „an address not written as name@domain is refused with invalid-email…”.
- S4 "Only after the answer does the server record and send a link, and only for … confirmed … not blocked … within the limits of D-105, and a failure … shows only in the server's log" — whole: `tests/http.test.mjs:2873`, `:2901`, `:2973` „a failed lookup after the answer leaves the process alive…”, `:3157` „a reset message counts against the limits…”, `:3228` „no answer and no line of the server's log holds a reset link's token…”.
- By invariants: none named (D-222 has none).
- By nothing: the look of the answer — `text` with a bar in its colour, as D-44 gives it.
- *Verification*: tests clause added, pair rewritten for the look alone.

### D-223

- S1 "A request for a password-reset link has no limit of its own per client address, and only the limits of D-105 bound it" — in part: `tests/http.test.mjs:3157` „a reset message counts against the limits shared with the confirmation message…”, whose ten requests from one client address in an hour are each answered and handed on as far as D-105 allows, so a per-address ceiling below ten fails it.
- By invariants: none.
- By nothing: a per-address limit that lets ten or more requests an hour through; S2, the review before the address goes to other players.
- *Verification*: tests clause added, pair rewritten.

### D-226

- S1 "`POST /api/password-reset` checks the fields…, then the rules of D-98, then the form of the token and whether its link works, all before any password work…; it then hashes through that gate, with no attempt admission of D-102, and checks the link again in the transaction of D-112…" — in part: fields `tests/transport.test.mjs:515` „refused state-changing requests change no account or session and do no password work”; rules before link `tests/http.test.mjs:3402` „the password rules come before the link…”, `:3772` „the route clears the address's failed logins once…” (a spent link with a short password gets `invalid-password`); link before password work `:3481` „every token that does not work gets the one refusal after no password work…”, `:3402`; no admission for the account's locked address `:3710` „a locked address logs in with the new password straight after a reset…”; link read again after the hashing `:3588` „a block, a later link or an expiry committed during the hashing…”.
- S2 "Every token that is malformed … gets one and the same refusal `invalid-link`, before the hashing or after it, a full password gate answers 429 `too-many-attempts`, and any other failure writes nothing, so the last two leave the link working" — whole with the invariant: `:3481`, `:3588`, `:3402`, `:3710`, `:3815` „a hash that fails answers 500 with no detail and spends nothing…”.
- S3 "The route neither uses nor changes the session a request brings with it, which ends with the account's others or stays working, renewed as D-101 renews it" — in part: `tests/http.test.mjs:3649` „a reset ends every session of its account, even the one sent along…”.
- By invariants: `password-reset-link` — once, before expiry, until a later link, not blocked, a refusal changes nothing, a refused password and a full gate leave the link working.
- By nothing: fields judged before the password rules; no admission keyed by the client address; no transaction across the hashing; the renewal of a session sent along.
- *Verification*: invariants kept, tests clause added, pair rewritten.

### D-252

- S1 "Loop2 adopts all six rules on failures and logs of the coding template … and departs from none of them" — in part (the rules as the server and commands keep them): `tests/http.test.mjs:2094`, `:2973`, `:3228`, `:3852` „no answer and no line of the server's log holds a set-password request's token or password”, `:4876`, `:4952` „an expected refusal and a message that was not sent leave no line of success…”, `:5034` „every failure the server handles leaves a line of its kind, code and place…”, `:5168` „a route's deadline on a mailer that never answers writes the deadline as its reason”, `:5231`, `:5245`, `:5263` (the three failed-renewal cases), `:5843` „a file whose read breaks off while it is sent is cut…”; `tests/account-storage.test.mjs:2788` „the owner's command writes one event…”, `:2822` „a database failure of the owner's command…”, `:2871` „a cleanup that fails in the background…”, `:3066` „the previous-save command writes one event…”, `:3097` „a database failure of the previous-save command…”; `tests/account-backup.test.mjs:407` „a failed backup adds the error's kind and code…”; `tests/account-mail.test.mjs:422` „each failure with no error of the library names its reason…”; `tests/startup.test.mjs:185` „rejects LOOP2_LISTEN_PORT=… without a readiness line”, `:567` „a start that fails names the setting and the original error's kind and code…”.
- S2 "A log line of its Node.js code is one JSON object on one line…" — in part (the Node.js line form; `measure-passwords` keeping the error's text in its report): the S1 list without `:2973`, `:3228`, `:3852`, `:4952`, plus `tests/password-measurement.test.mjs:174` „the entrypoint refuses to measure where the cgroup does not count hits of its limit”, `:188` „the entrypoint stops with a failure when its deadline passes first”.
- S3 "The product logs changes of a player's account and of access to it …, and no progress of a game and no housekeeping…" — in part: `tests/http.test.mjs:4876`, `:4952`, `tests/account-storage.test.mjs:2788`, `:3066`.
- By invariants: none.
- By nothing: the guideline file holding the six rules with no departure; the readiness line, the browser's console line and Bash lines as plain text; `account-database-check`'s sentence with the error's text and no failure line; no failure line of the log form from `measure-passwords`; operations on the server or its backup and no housekeeping; the consent rule for an item that points to a person.
- *Verification*: tests clause added, pair rewritten.

### D-353

- S1 "A browser that breaks off sending the body … is an expected refusal, like a body that is too large or broken, and the session write that the library makes as a response ends, refused because the account was blocked … ; neither leaves a failure line" — in part: `tests/http.test.mjs:4993` „a browser that breaks off sending a request body…”, `:2062` „a block committed while a registration waits on its message leaves no line of failure…”, and at the store `tests/account-storage.test.mjs:2112` „a session write refused because the account is blocked says so…”.
- S2 "A session write that fails for any other reason stays a failure" — whole for the end-of-response write: `tests/http.test.mjs:2094` „a session write at the end of a registration refused for another cause…”, `tests/account-storage.test.mjs:2112`.
- By invariants: none.
- By nothing: a body too large or broken leaving no failure line; the first store of a session refused because of a block keeping its line.
- *Verification*: tests clause added, pair rewritten.

## Pairs added or rewritten (for the human's acceptance at the merge)

**D-222** (rewritten)
- complies: the sentence under the form in `text`, with a bar at its left in the colour of the sentence, as D-44 gives that answer
- violates: the sentence under the form in `warning` or in `positive`, or without its bar

**D-223** (rewritten)
- complies: a request for a link going through the two limits of D-105 and no other count, however many requests one client address sends in an hour; this decision looked at again before the game's address is given to players other than the owner, once abuse has become real
- violates: a counter of requests per client address added beside those limits while this decision stands, also one that lets ten or more requests an hour through

**D-226** (rewritten)
- complies: a request whose fields are out of shape and whose password breaks the rules of D-98 refused for its fields; a session of another account sent along renewed as D-101 renews it at every request
- violates: an attempt admission of D-102 keyed by the client address, taken by the route; a transaction held across the hashing; a session sent along that the route leaves unrenewed while it stays working

**D-252** (rewritten)
- complies: a new rule on failures or logs written into `guidelines/coding.md` in the form of the pinned template, with no departure; the readiness line `Loop: <address>` as plain text, since the six rules call for failure and event lines and this line is neither: it is a process's announcement to what launches it, in the exact form the invariants `account-server-occupied-address` and `account-server-default-address` fix; a line in the browser's console as plain text, and a Bash script's lines in its own text; a failed run of `account-database-check` leaving in the log of the image build its sentence with the error's text and no failure line of the log form, and a failed run of `measure-passwords` printing no failure line of the log form; an operation that changes what runs on the server or its backup added to the list of the logging scope in the change that brings it
- violates: a rule of the six left out of `guidelines/coding.md`, or code that departs from one, with no decision of a departure; a failure line of the log form, with `failure`, `kind`, `code` and `place`, written by `account-database-check` or `measure-passwords`; the error's text left out of the sentence of `account-database-check`; a line for housekeeping, such as a cleanup of the database that succeeded; an email address added to the list without the human's consent

**D-353** (rewritten)
- complies: a body too large or broken refused with no line of `failure`; the first store of a session, made in the route that signs the player in, refused because of a block, leaving its line
- violates: a line of `failure` for a body too large or broken; the first store of a session refused because of a block left without its line

D-152 got no pair (held in whole by its invariants and tests).

## Choices, with the way rejected and its cost if wrong

1. **Where D-252's S2 is held.** I marked the cases whose subject is the form or fields of a log line (their name, their stated faults or their comment cite the line or D-252), not every case that parses a line on its way to another decision. Left unmarked although they parse an exact line: the D-253 last-resort cases (`tests/account-storage.test.mjs` „what no code of the owner's command handled…”, „what no code of the previous-save command handled…”, `tests/startup.test.mjs` „… no code of the server handled ends it with one line…”), `tests/account-backup.test.mjs` „a whole backup whose temporary directory cannot be removed…” (D-354), the D-356 report cases of `tests/http.test.mjs` and `tests/transport.test.mjs`, and `tests/http.test.mjs` „a failed renewal after an answer that has ended… calls no destroy”. Rejected: marking all of them (about fifteen more lines). Cost if wrong: a reviewer asks for those lines, a pure comment addition.
2. **D-252's exclusion clauses** (Bash text, the browser console line, the readiness line, what commands print). I judged them as the scope of the JSON form; the outputs themselves are fixed by other decisions or invariants (D-253 "as plain text"; `account-server-default-address`; D-233/D-355 for Bash). So `tests/view/uncaught-failure.test.mjs`, `tests/startup.test.mjs` „listens on the address given by…”, `tests/invariants/test_account_server_default_address.py` and the Bash tests of `tests/deploy/` carry no D-252 line, and the pair keeps those clauses. The one exception is `measure-passwords` keeping the error's text in its report, D-252's own positive rule, which I marked. Rejected: marking every test that asserts such an output, which spans the deploy tests. Cost if wrong: lines in Python and view files and a narrower pair.
3. **D-252 S1** (adopting the six rules), following the precedent of D-28 in the log: tests that check a rule's content (failure with its cause, no personal data or secret, refusal not a failure, a line per business event) carry an S1 line. Rejected: S1 held by nothing, as the adoption of a template. Cost if wrong: the S1 lines go and the pair grows.
4. **`tests/account-storage.test.mjs:2112`** (store classification) marked for D-353 in part: a store that took a block's refusal for another, or the reverse, would break D-353 and fail this case; a change in `app.ts` would not. Rejected: no line, because it asserts no log line.
5. **D-152**: the S2 clause "a confirmation message establishes that address for account recovery" and "resets … by a link … without operator assistance" are not stated by its invariants (R1), so tests carry lines for them; the sentences the invariants state got none.
6. **Long quotations**: where a case holds a later clause of a sentence (D-226 S1's transaction or admission clause, D-252 S2's `measure-passwords` clause), the quotation runs from the start of the sentence to that clause, since a quotation has to begin at a sentence start.

## Remarks on the log's wording (R3, nothing changed)

- **D-353:** S2 "A session write that fails for any other reason stays a failure" does not say which way the first store of a session goes when a block refuses it. The reason is the block, but the write is not the end-of-response write that S1 exempts. The code (`src/server/app.ts:57-64`) and the pair keep its line; the sentence alone reads both ways.
- **D-222:** the page's Polish answer holds a full stop and a space („…odnośnik. Gdy wiadomość…”), so by the rule of sentences the answer is cut into two binding sentences. Lines for the page quote both.
- **D-223:** S2 ("This holds while only the owner has accounts, and the decision is reviewed before…") is a condition of review that no test or code can hold.

## Mismatches with the handoff or plan

- The handoff's base fact "23 decisions `listed: … held by nothing`" does not hold for this base. The check on `199cd6e0` lists 11, as at the end of this slice.
- The plan's *Change* names `foundations/decisions.md` and `tests/http.test.mjs` only. Item 5 took the slice into seven more files, listed above.
- The plan's *Read* ranges for invariants match the worktree. The log ranges were taken from the handoff's current ranges.

## Reaches beyond the dispatch

- `guidelines/styleguide-browser-view.md`, whole: before adding lines to `tests/view/account-screen.test.mjs`, as AGENTS.md and item 5 require.
- `.the-way/elements/common/foundation_check.py:780-822` (`check_decision_line`): to confirm how a quotation's start is judged, after a full stop and a space, inside the Polish answer of D-222.
- `.the-way/task-cycle/change/slice.md`, whole: the method's row for a slice names it.
- `foundations/invariants.md`, entry `account-server-default-address`: to judge the readiness-line clause of D-252.
- `foundations/decisions.md`, D-28: the precedent for an adoption sentence.
- Source passages: `src/server/log-line.ts`, `src/server/app.ts:50-129` and `src/server/account-routes.ts:640-739`, to judge D-252, D-353 and D-226 against the code.

## Working copies

- `.runs/executor-9/base`: a detached worktree of `199cd6e0` with its `.the-way` submodule, used to run the foundation check on the base. Removed with `git worktree remove --force`, then `git worktree prune`.
- `.runs/executor-9/`: holds the outputs of the checks above (`fc.txt`, `fc2.txt`, `fc-base.txt`, `run-*.txt`, `runs.txt`). Removed before return; the results stand in the table above.

## Unread material

none — every passage of the *Read* was read whole: plan 16-73, task 30-37 and 39-42 and 99-104, template 111-127 and 162-166 and 220-260, the decisions skill's `SKILL.md` whole, `guidelines/testing.md`, `guidelines/coding.md`, `foundations/part_map.md`, `foundations/glossary.md`, D-152, D-222, D-223, D-226, D-252, D-353, D-73, D-82, and the four invariants plus `password-reset-ends-sessions`. `tests/http.test.mjs` was read in its sections 2020-2160, 2730-3990, 4815-5330 and 5820-5919, not whole (5,900 lines). The rest was searched by the content of the sentences.

## Searches not found or unclear

- No test asserts that a body too large or broken leaves no failure line. `tests/transport.test.mjs` asserts statuses and the absence of report lines only.
- No test covers the first store of a session refused because of a block (D-353 pair).
- No test checks the renewal of a session sent along to `POST /api/password-reset`, an admission keyed by the client address, or the order of field checks before the password rules (D-226 pair).
- No test checks the look of the reset answer — its `text` role and its bar (D-222 pair).
- Unclear: D-353 S2's reach (see Remarks).
