# Executor 10 — report (slice 10, account mail and emailed-link decisions)

**Status:** done with concerns

## Commits (base c6841dc1046bf0da9098562ce22648ebb95c6c58)

- `267f7b59` test: :white_check_mark: mark the tests that hold the sentences of the decisions on account mail, ... with lines decision:
- `e9c1d43a` docs: :memo: name the tests of D-105, D-153, D-155, D-156, D-158, D-160 and D-227, drop the pair of D-158, ...

Author address checked: `mariusznn@gmail.com` (`git log --format='%h %ae'`).

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| foundations/decisions.md | 56 | 17 |
| tests/http.test.mjs | 16 | 0 |
| tests/account-mail.test.mjs | 3 | 0 |
| tests/account-storage.test.mjs | 3 | 0 |
| tests/invariants/test_loop2_host_sharing.py | 2 | 0 |
| tests/view/account-screen.test.mjs | 6 | 0 |
| tests/view/email-confirmation.test.mjs | 4 | 0 |
| tests/view/email-status.test.mjs | 1 | 0 |

Files beyond the slice's *Change* (item 5 of "Work of every slice"), one line each:
- `tests/account-storage.test.mjs` (account-server) — lines for D-155, D-156, D-160; focused run below.
- `tests/invariants/test_loop2_host_sharing.py` (deployment) — lines for D-158, D-227 (the Compose file fixes the sender `loop2@mariusznazar.com`); focused run below.
- `tests/view/account-screen.test.mjs` (browser-view) — lines for D-105, D-156, D-160; focused run below.
- `tests/view/email-confirmation.test.mjs` (browser-view) — lines for D-156, D-160; focused run below.
- `tests/view/email-status.test.mjs` (browser-view) — line for D-105; focused run below.

## Checks (command — exit code)

- `python -B .the-way/elements/common/foundation_check.py` at the base — 0, `0 errors`, none of my decisions listed `held by nothing`.
- `python -B .the-way/elements/common/foundation_check.py` after the change — 0, `0 errors`, 11 decisions `held by nothing` (D-181 … D-220, the same 11 as at the base), none of D-105, D-153, D-154, D-155, D-156, D-158, D-159, D-160, D-161, D-163, D-227.
- `npm test -- tests/account-mail.test.mjs` — 0
- `npm test -- tests/http.test.mjs` — 0
- `npm test -- tests/account-storage.test.mjs` — 0
- `npm test -- tests/view/email-confirmation.test.mjs` — 0
- `npm test -- tests/view/email-status.test.mjs` — 0
- `npm test -- tests/view/account-screen.test.mjs` — 0
- `npm test -- tests/invariants/test_loop2_host_sharing.py` — 0
  (exit codes kept in `reports/executor-10-test-exits.txt`)
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` — 0 for each of the six changed `.mjs` files.
- `git diff -U0 c6841dc1… -- foundations/decisions.md`, read: seven hunks, at 2164 (D-105), 3247 (D-153), 3275 (D-155), 3290 (D-156), 3320 (D-158), 3350 (D-160, insert after `invariants:`) and 4827 (D-227); every changed line lies in the *Verification* field of one of my decisions.
- Not run: the full gate `npm test` (the cycle's run, WAY-160). `test_ruff_source_rules` and `test_shellcheck_source_rules` fail at the base (handoff), not run here.
- No test was written and no invariant test changed, so no failing first run applies.

## Table of decisions (item 6)

| Decision | Held by tests (whole / part), `path:line` — case | Held by invariants | Held by nothing | *Verification* |
|---|---|---|---|---|
| D-105 | S2 in part: `tests/http.test.mjs:2246` "registration answers 201 with its message's outcome in every case…" (registration above the total → `limited`, nothing handed on); `:2461` "above three messages an hour … a resend answers limited…"; `:2918` "a well-formed address gets the same answer whether its account is … above a limit…"; `tests/view/email-status.test.mjs:17` "each outcome of a confirmation message has its sentence and role" (`limited` → „Za dużo wiadomości…” in warning); `tests/view/account-screen.test.mjs:854` "a well-formed address gets the one sentence of the reset under the form…" (the answer ending „Gdy wiadomość nie przyjdzie…”) | S1 (30/hour, 3/address) and "no message is sent" above a limit: account-message-limits | "no monthly sending cap applies" | pair rewritten |
| D-153 | S1 in part ("authenticated"): `tests/account-mail.test.mjs:283` "a message is submitted only after STARTTLS and login with the configured login and password" | S1 sender under `mariusznazar.com`, server Outsider: account-email-via-outsider (review) | S2 (delivery test before recovery is enabled) | clause `tests:` added; pair unchanged (it already spoke of S2 only) |
| D-154 | none added (R1: the invariant states the sentence) | whole: account-email-nodemailer-starttls | nothing | unchanged |
| D-155 | S1 in part: `tests/http.test.mjs:2247` (24 hours recorded) "registration answers 201…"; `:3134` "a recorded reset link lives one hour…" (one hour); `:3837` "a hash that fails answers 500 … and spends nothing…" (spent only with the password); `tests/account-storage.test.mjs:1717` "a working reset link replaces the password, … stops its reset links …, and works once" (spent in the operation that writes the password). S2 in part: `tests/http.test.mjs:2248` "registration answers 201…" (no message handed on when the recording fails); `:2585` "a later message's link stops earlier ones, also when its sending failed…"; `:3135` "a recorded reset link lives one hour, a later request stops the earlier link…" | "works once", "before expiry", stop on recording a later link, refused password and full gate leave the link: email-confirmation-link, password-reset-link, password-reset-verified-email | S2 "in the same transaction" | pair rewritten |
| D-156 | S1 in part: `tests/http.test.mjs:2249` "registration answers 201…" (origin, `/#confirm-email=`, 43 base64url characters on a line). S2 in part: `tests/view/email-confirmation.test.mjs:50` "each answer to a confirmation has its sentence and role…"; `:141` "a definitive answer … sends the token once and clears the fragment"; `:157` "a lost connection or a server error keeps the fragment…"; `tests/view/account-screen.test.mjs:1247` "with a token in the address the page confirms first, saying so…"; `:1275` "the result stands as one sentence above the game for a signed-in player…"; `:1301` "a refused link stands in warning above the form in the card…". S3 whole: `tests/http.test.mjs:2519` "a link confirms its own account once, … every malformed, unknown or used token gets the one refusal…"; `:2586` (expired, other kind); `:2640` "a block committed … stops its link for good…" (blocked); `tests/account-storage.test.mjs:1511` "a confirmation link confirms its account once, stops the account's other confirmation links…" | a refused link changes nothing; once, expiry, later link, block: email-confirmation-link | S1 "random" and "only the SHA-256 digest"; S2 the role `text-secondary` of „Potwierdzanie adresu…” and "whatever screen the game opens on" | pair rewritten |
| D-158 | whole: `tests/account-mail.test.mjs:467` "the submitted message has one recipient, the fixed sender and subject…" (display name, plain text, subject, four paragraphs, configured sender) with `tests/invariants/test_loop2_host_sharing.py:457` `test_production_account_configuration_is_fixed` (the sender is `loop2@mariusznazar.com`) | — | nothing | pair removed |
| D-159 | none found | — | whole sentence | unchanged |
| D-160 | S1 in part: `tests/http.test.mjs:2641` "a block committed … while the message is on its way stops its link for good…" (blocked confirmation link → refusal with „Odnośnik jest nieważny albo wygasł.”); `:3503` "every token that does not work gets the one refusal…" (reset link of a blocked account); `tests/view/email-confirmation.test.mjs:51` (refusal → that sentence in warning); `tests/view/account-screen.test.mjs:1302` (above the form, signed out); `:1604` "a refused link, whatever its reason, … above the form or the game" (reset form, "a link of a blocked account"). S2 in part: `tests/account-storage.test.mjs:1652` "a block committed through another connection stops every link issued before it…" (a new link after the unblock works) | S1 "changes nothing"; S2 "stays stopped after the unblock": email-confirmation-link, unblock-restores-no-link, password-reset-link | S2 "signed in again … with „Wyślij ponownie”" | pair added (it had none) |
| D-161 | none added (R1) | whole: account-message-limits ("sent or attempted", per address, across a restart) | nothing | unchanged |
| D-163 | none found (no test checks that no test reaches Outsider) | — | whole | unchanged |
| D-227 | S1 whole: `tests/account-mail.test.mjs:505` "the submitted reset message has one recipient, the fixed sender and subject…" with `tests/invariants/test_loop2_host_sharing.py:458` (sender) and `tests/http.test.mjs:3136` "a recorded reset link lives one hour…" (the route hands on the reset message, its subject) | — | S2 "After a change of password the player gets no message about the change" | pair rewritten for S2 only |

## Pairs added or rewritten (for the human to accept at the merge)

- **D-105** (rewritten)
  - complies: the two hourly limits the only bound on sending, so that hour after hour at the limits every message they allow goes out
  - violates: a monthly cap, or any count over a span longer than an hour, that refuses a message the two hourly limits would let through
- **D-155** (rewritten)
  - complies: the earlier links of the kind stopped by a statement run in the transaction that inserts the new link
  - violates: the earlier links stopped in a transaction of their own after the new link is committed, so that a fault between the two leaves them working beside the new one
- **D-156** (rewritten)
  - complies: a token drawn from a cryptographically secure source and kept in the database only as the SHA-256 digest of its text; „Potwierdzanie adresu…” in `text-secondary`; the confirmation made whatever screen of the game the address names
  - violates: a token kept in clear in the database, beside or instead of its digest; a token from a counter, a clock or a source that is not cryptographically secure; the waiting sentence in another role; a link that confirms nothing because the address names a screen of the game
- **D-160** (added)
  - complies: the player of an unblocked account, signed in again with the address still unconfirmed, finding „Wyślij ponownie” in the menu „Konto” and getting a working link by it
  - violates: an unblocked account whose unconfirmed address offers no „Wyślij ponownie”, or whose request for another confirmation message is refused because of the past block
- **D-227** (rewritten)
  - complies: a password set through a link with no message handed to the mail service
  - violates: a message about the change of password handed to the mail service after a password is set

D-158's pair was removed (held whole). D-153's pair stays word for word.

## Own-work check (section 3)

- Requirement most likely missed: "every test that holds one of its binding sentences carries a line `decision:`" — a holding test in a file I did not read.
- Check: a search of all of `tests/` for the screen texts and identifiers of the sentences („Odnośnik jest nieważny albo wygasł.”, „Za dużo wiadomości…”, „Gdy wiadomość nie przyjdzie…”, „Potwierdzanie adresu…”, „Adres e-mail potwierdzony.”, `confirm-email`, `LOOP2_MAIL_FROM`, `loop2@mariusznazar.com`, `outsider`, `monthly`), then the name of each case found that has no line.
- What it showed: eight cases I did **not** judge (they are left unmarked; see Concerns): `tests/view/menu-bar.test.mjs:544` "an answer that comes while the menu is closed is there when the player opens it…" (shows „Za dużo wiadomości…”, a candidate for D-105 S2); `tests/view/account-screen.test.mjs:3180`, `:4290` "after an emailed link — a confirmation, … or a refused link — a signed-in player opens Siedziba, whatever the save holds" (a candidate for D-156 S2 "whatever screen the game opens on"), `:4718`, `:4918`, `:5184`; `tests/account-api.test.mjs:446` (the client carries the server's code and message); `tests/view/screen-address.test.mjs` near line 71 (the fragment of an emailed confirmation).

## Concerns

1. **Context limit.** My session's context ran short, so I judged the candidates above only by their names and did not mark them. Where one of them holds a sentence, the matching part of a pair I wrote stands for something a test holds. Most likely: `tests/view/account-screen.test.mjs:4290` may hold D-156's "whatever screen the game opens on", and `tests/view/menu-bar.test.mjs:544` may hold more of D-105 S2. I recommend a short retry or a follow-up judgment of these eight cases.
2. **D-156 S2's quotation in `tests/view/email-confirmation.test.mjs:50`, `:157`** and in `tests/view/account-screen.test.mjs:1275`, `:1301` runs past what each case holds (the rule allows it, since a quotation starts at the sentence start). The clause `tests:` says which part is held.
3. **D-153**: the only line is for "authenticated" (`tests/account-mail.test.mjs:283`). `test_production_account_configuration_is_fixed` also fixes the sender and the host `outsider.mikr.us`. The review invariant account-email-via-outsider already states that, so I added no D-153 line there (R1 in spirit). That case is no test of that invariant, so a reviewer may read R1 more narrowly and want the line.

## Log wording against the code (R3) — nothing changed

- **D-153** *Rationale* says the delivery of the confirmation message is unsettled. Its *Verification* pair still names "both message types". That is the log's own remark; I left it as it was.
- **D-155**'s binding sentence says "in the same transaction". The storage case at `tests/account-storage.test.mjs:1600` shows the stop happens within `issueLink`, but no test proves a single transaction. That part is left to the pair.

## Reaches beyond the dispatch

- `tests/account-storage.test.mjs` 380-450 and 1386-1915, `tests/invariants/test_loop2_host_sharing.py` 420-510, `tests/view/email-confirmation.test.mjs`, `tests/view/email-status.test.mjs`, `tests/view/password-reset.test.mjs`, `tests/view/account-screen.test.mjs` 850-857, 1218-1312 and 1590-1651: candidate tests found by content search (item 2 and item 5).
- `.the-way/elements/common/foundation_check.py` 781-821: to confirm that a quotation may run across a full stop inside a paragraph (it may; it is a substring that starts a sentence).
- `.the-way/task-cycle/change/slice.md` whole: named by the method's row for a slice.

## Working copies

- `.runs/executor-10/` (outputs of the foundation check and the logs of the focused runs) in the worktree. Removed. The exit codes are kept in `reports/executor-10-test-exits.txt`.

## Unread material

- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md`: I read it **whole**, more than the passages the dispatch names (slice.md asks for the passages only).
- `guidelines/styleguide-browser-view.md`: lines 1-250 only. That is the guideline item 5 asks me to read before lines go into `tests/view/**`. The rest did not fit the context. My changes there are comment lines only.
- Files I changed but did not read whole (the method asks for whole): `tests/view/account-screen.test.mjs` (read 850-857, 1218-1312, 1590-1651 of 6209), `tests/account-storage.test.mjs` (read 380-450, 1386-1915 of 3268), `tests/invariants/test_loop2_host_sharing.py` (read 420-510). `tests/http.test.mjs`, `tests/account-mail.test.mjs` and the two small view files I read whole.
- `.the-way/elements/decisions/template.md`: lines 105-264 (beyond the named 111-127, 162-166 and 220-260).

## Searches not found or unclear

- A test that no test reaches `outsider.mikr.us` (D-163): none found.
- A test that a password reset sends no message about the change (D-227 S2): none found. `tests/http.test.mjs:4877` lists the log lines after a reset but asserts no count of messages.
- A test that the confirmation link's token is random and stored only as its SHA-256 digest (D-156 S1): none found for the confirmation link. `tests/http.test.mjs:3118` shows the digest for reset links only.
- A test that holds D-159 (no operation changes an address): none found.
- A test that no monthly cap applies (D-105): none found.
- Unclear: the eight unjudged candidate cases listed under the own-work check.
