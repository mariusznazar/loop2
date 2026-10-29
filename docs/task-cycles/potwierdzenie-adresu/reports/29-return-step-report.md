# Return step report — task `potwierdzenie-adresu`

**Status:** `done`

Worktree `C:/Storage/repos/loop2-wt/potwierdzenie-adresu`, branch `task/potwierdzenie-adresu`, start
head `28f0686`, end head `7247c09`. Pin checked: `git -C .the-way rev-parse HEAD` and
`git ls-files --stage -- .the-way` both `3aee7d958835cc19b95519f4d21b37538b78e3e1`.

## Commits and files

| Commit | Files (added / removed lines) |
|---|---|
| `7247c09` docs: :memo: align the foundation with the email confirmation code at the return step | `foundations/decisions.md` +5 −5 · `foundations/environment_facts.md` +6 −0 · `foundations/part_map.md` +1 −1 |

No code, test or guideline changed. Not pushed.

## Return step — for the cycle record

- **Foundation compared with code:** every entry the change writes or changes (D-13, D-17, D-44,
  D-73, D-79, D-105, D-109, D-111, D-112, D-137, D-140–D-151; the invariants `loop2-host-sharing`,
  `account-session-authorization`, `account-client-outcomes`, `email-confirmation-link`,
  `unblock-restores-no-link`, `account-message-limits`, `account-email-via-outsider`,
  `account-email-nodemailer-starttls`, and the *Derives from* of `player-password-login` and
  `email-verification-nonblocking`; the facts `mikrus-outsider-mail`, `nodemailer-require-tls`,
  `uri-fragment-in-requests`), the entries the task names in *Decisions in play* (D-05, D-12, D-15,
  D-39, D-96, D-97, D-99, D-104, D-108, D-117 and the invariants listed there), and the part map of
  `account-server`, `browser-view`, `deployment`, `build-tools`, `agent-workflow` and
  `product-foundation` — read against `src/server/account-mail.ts`, `account-routes.ts`,
  `account-policy.ts`, `configuration.ts`, `database.ts`, `account-block.ts`, `compose.yaml`,
  `package.json`, `src/browser/account-api.ts`, `view/app.ts`, `view/email-status.ts`,
  `view/email-confirmation.ts`, `styles.css`, and the `invariant:` lines of the tests. Four
  mismatches found and corrected (below); everything else matches.
- **Decisions written or changed:** D-111, D-144, D-145 (changed).
- **Invariants written or changed:** none.
- **Environment facts:** `samesite-strict-cookie` (new).
- **Glossary terms:** none.
- **Part-map changes:** `account-server` — responsibility sentence gains "sends account email
  through the mail service".
- **Projected entries written whole or in part:** none at this step. Already written by the
  foundation step and checked here against the code: `mikrus-outsider-mail` whole (D-141's
  *Based on*); in part — D-140, D-141 (first sentence, confirmation messages), D-142,
  `account-email-via-outsider`, `account-email-nodemailer-starttls` (the confirmation part each);
  `email-verification-nonblocking` kept. F24's second sentence (delivery from the intended
  container in a real test) stays unwritten: H4 has not run.
- **Rows of *Settlements to record* written:** none at this step. All accepted rows were written
  by the foundation step and hold against the code: K1 → D-143, K2 → D-144, K3 → D-145, K4 → D-44,
  K5 → D-146, K6 → D-111, K7 → D-13 and D-17, K9 → D-147, K10 → D-148 and D-137. K8 was rejected
  by the human.

## Entries written or changed, with their meaning for the request

| Entry | What changed and why | Meaning (pl) |
|---|---|---|
| part map, `account-server` | The responsibility sentence did not say the part sends mail, while `src/server/account-mail.ts` composes and submits account messages (Slice 2 concern C1; whole review "Slice 2, M1"). Through `the-way-update-part-map`; *Files*, *Depends on* and *Trust boundary* unchanged and matching the code. | Część `account-server` odpowiada także za wysyłanie wiadomości o koncie przez serwer poczty. |
| D-111 | The binding sentence said "the SMTP host a DNS host name" and "the login printable text … without whitespace"; the code (`src/server/configuration.ts:45-46`) accepts host labels of letters, digits and hyphens joined by dots, at most 253 characters (a label may start or end with a hyphen and pass 63 characters), and a login of at most 254 characters without whitespace or control character (Cf characters pass). The spec, Decision 7, defines the host the code's way ("a DNS host name (letters, digits, hyphens, dots)"). The sentence now states what the code checks. | Serwer SMTP to do 253 znaków etykiet z liter ASCII, cyfr i myślników rozdzielonych kropkami, a login to tekst do 254 znaków bez białych znaków i znaków sterujących; reszta ustawień poczty i start bez nich — bez zmian. |
| D-144 | The page shows a third outcome D-144 did not name: when the confirmation request gets neither the confirmation nor the refusal (no connection, a server error, an unexpected answer), it shows the account client's failure sentence in `warning` and keeps the fragment for a reload (`src/browser/view/email-confirmation.ts:155-177, 196-206`; spec Decision 10). The binding sentence names it. *Based on* gains `samesite-strict-cookie`, and *Rationale* one sentence on why a signed-in player arriving from a mail service on another site sees the result above the headquarters. | Gdy żądanie potwierdzenia nie dostaje ani potwierdzenia, ani odmowy, strona pokazuje zdanie błędu klienta w roli `warning` i zostawia token w adresie do ponownego wczytania; zalogowany gracz z poczty na innej stronie widzi wynik nad siedzibą, bo własne żądania strony niosą ciasteczko sesji. |
| D-145 | Likewise for the header row: a resend that fails other than with `email-already-confirmed` shows the client's failure sentence in `warning` beside „Wyślij ponownie” (`src/browser/view/email-status.ts:95-106`; spec Decision 10). The binding sentence names it ("the last three in `warning`"). | Gdy prośba o ponowną wiadomość kończy się błędem innym niż „adres już potwierdzony”, w wierszu nagłówka stoi zdanie błędu klienta w roli `warning` obok „Wyślij ponownie”. |
| `samesite-strict-cookie` | New fact (WAY-11): the change rests on the session cookie (`SameSite=Strict`, D-104) reaching the page's own `GET /api/account` after a navigation from a mail service on another site, so that D-144's "above the headquarters for a signed-in one" holds; the foundation held no source for it. Source: MDN content at commit `13ef67a4…`, § Controlling third-party cookies with SameSite, passage checked word for word. | Przeglądarka wysyła ciasteczko `SameSite=Strict` tylko z żądaniami pochodzącymi z witryny, która je ustawiła — ustawienie właściwe dla funkcji zawsze za pierwszą nawigacją, takich jak logowanie. |

Step 4.4 of each: no entry follows. D-111's invariants (`account-server-default-address`,
`account-startup-configuration`) and D-144's (`email-confirmation-link`) keep their sentences; D-109
and D-112, which derive from D-144/D-145, are unaffected; nothing else names the new fact.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` after the part-map edit | 0 | 0 errors |
| the same after all edits, before `7247c09` | 0 | 0 errors |
| `npm test -- tests/startup.test.mjs` (tests of D-111's invariant `account-startup-configuration`) | 0 | 15 pass |
| `curl` of the MDN page at commit `13ef67a4…`, backticks dropped, `grep -c -F` of the quoted passage | 0 | 1 match |
| own-work check (below) | 0 | every fixed sentence found |
| `git diff --check` | 0 | clean |

Not run: the whole gate (`npm test`) — the handoff forbids it; the other focused tests
(`tests/account-storage.test.mjs`, `tests/http.test.mjs`,
`tests/invariants/test_account_server_default_address.py`) — no invariant and no code changed, and
the whole review ran them on `28f0686` with exit 0.

## Own-work check (section 3)

- Requirement most likely missed: that each fixed Polish text D-44, D-144, D-145, D-146 and D-148
  name — after my edits — stands verbatim in the code, so no corrected sentence names text the
  code does not show.
- Check: every `„…”` of those five entries extracted with `awk`/`grep -o` and searched with
  `grep -rF` in `src/` (the `<adres>` placeholder cut off).
- Result: all 20 texts found.

## Judged and left as they are

- **D-137 and the `loop2-deploy` skill** (whole review N1): D-137 says the skill describes the
  command, and it does; that its bullets omit the stopped links is a gap of the skill's text, not a
  false entry. Left to the request's list of review findings.
- **D-146 and `guidelines/coding-mail-sending.md:41-42`** (N2): D-146's "comes from
  `loop2@mariusznazar.com`" holds through `LOOP2_MAIL_FROM` in `compose.yaml`; the over-broad word
  is in a guideline, not the foundation.
- **D-111 and a password file holding only a UTF-8 BOM** (S4 M1): D-111 does not ask for a
  nonempty file and the code refuses a zero-byte one; the silent BOM drop stays a review finding.
- **D-145 "both are gone once the address is confirmed"**: a page open while the address is
  confirmed in another tab keeps the row until it reloads or a resend gets `409`; read as the
  ordinary meaning of K3 ("po potwierdzeniu zdanie i przycisk znikają"), not as a promise of a live
  update.
- **Glossary `integration test`** ("real files, local HTTP or processes") against D-151's "an
  integration test against a real SMTP server run on the loopback interface": the same meaning —
  a real local connection, no unit test — so no term changes.
- **Cycle choice Q7** (no message when the registration's session cannot be stored): a detail of
  an error path, not a rule that binds later work; no entry.
- **Part map *Depends on*** of the touched parts: the new imports stay within it
  (`account-server` → Nodemailer, an outside package; the two view modules → `account-api.ts`
  of `browser-view`).

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| D-111 corrected to the checks the code makes | tightening `configuration.ts` to RFC 1123 labels and Unicode "printable" | an operator typo such as `-outsider.mikr.us` passes startup and fails at the first send instead; the human sees the stated check at the merge and can ask for the tighter one |
| D-144 and D-145 name the client's failure sentence | leaving them at the server's outcomes — a reader comparing code with them finds a third sentence they do not allow; returning it to the human as an exception of K2/K3 — the rows speak of the server's answers, and D-44 already gives a lost connection one sentence in `warning` | the human may read the added clause as beyond K2/K3; it is shown in the meaning table |
| `samesite-strict-cookie` written and cited in D-144 | no fact — the placement above the headquarters for a player coming from a mail service rests on an uncited browser behaviour | one more fact to keep; the MDN passage states the rule through "originating from the cookie's origin site", not by naming a page reached from another site |

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md` WAY-11 — to read what "corrects whatever no longer matches"
  covers.
- `.the-way/elements/common/way_of_working.md`, `rules.md`, the templates and skills of the
  part map, decisions and environment facts, and their examples (part map `decisions`,
  `repository`; WAY-03) — the element skills require them.
- `.runs/task-cycles/potwierdzenie-adresu/cycle.md` — Slice 2 concern C1 and the cycle's choices
  Q1–Q22, to check none binds after the merge without an entry.
- `foundations/glossary.md` (whole, short) — for terms the entries use.
- `https://api.github.com/repos/mdn/content/commits?...` and the MDN pages for Set-Cookie and the
  cookies guide at fixed commits, fetched into the session scratchpad — the source of the new fact.
- `C:\Storage\The Brain\The Brain\.ai\rules\git.md` — the user's commit rules, read before
  checking the commit (English message, paths, private address the owner's private address confirmed).

## Problems

None. The worktree is clean at `7247c09`; upstream `origin/task/potwierdzenie-adresu` matches the
branch name.
