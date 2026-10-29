# Foundation step report — task `potwierdzenie-adresu`

**Status:** `blocked` — two questions for the human (below), the foundation step allows no other
way: F32 needs the approval WAY-172 places at a blocked draft request before Slice 2, and K1 meets
an exception in spec Decision 4 that the row does not allow. Every other entry is written.

## Commits and files

| Commit | Files (added / removed lines) |
|---|---|
| `f545afe` docs: :memo: record email confirmation, its links, limits, mail settings and Outsider in the foundation | `foundations/decisions.md` +179 −24 · `foundations/invariants.md` +55 −5 · `foundations/environment_facts.md` +18 −0 · `foundations/part_map.md` +1 −0 |
| `06b0385` docs: :memo: propose how code that talks to Outsider's SMTP service is tested, for the owner's approval | `foundations/decisions.md` +17 −2 (D-151 new, D-73 and D-79 changed — the F32 proposal, held for question 1) |

The F32 proposal stands in its own commit so the orchestrator can drop or keep it whole after the
human's answer.

## Entries written

Meaning sentences are in the task document's language, for the request.

| Identifier | Kind | Plan row | Meaning (pl) |
|---|---|---|---|
| D-140 | decision, new, partial projected | F23 | Gracz rejestruje się i loguje adresem e-mail i hasłem, może grać przed potwierdzeniem adresu, a wiadomość potwierdzająca ustala ten adres; część o odzyskiwaniu konta i resecie hasła dopisze zadanie resetu. |
| D-141 | decision, new, partial projected | F24 | Serwer kont wysyła wiadomości potwierdzające z adresu w `mariusznazar.com` przez uwierzytelniony SMTP Outsidera z istniejącego konta Mikrusa; wiadomości resetu i próbę doręczenia przed włączeniem odzyskiwania dopisze zadanie resetu. |
| D-142 | decision, new, partial projected | F25 | Serwer składa i wysyła wiadomości potwierdzające przez SMTP Outsidera biblioteką Nodemailer 10; połączenie musi przejść na TLS, a bez STARTTLS wysyłka się nie udaje. |
| D-143 | decision, new | F1 (K1) | Odnośnik potwierdzenia działa 24 godziny, odnośnik resetu 1 godzinę, każdy raz; wiadomość przyjęta przez serwer poczty unieważnia wcześniejsze odnośniki tego rodzaju dla konta, a nieudana wysyłka zostawia je ważne. |
| D-144 | decision, new | F2 (K2) | Odnośnik to adres gry z `/#confirm-email=<token>`, baza trzyma tylko skrót SHA-256 tokenu; strona sama wysyła token żądaniem zgodnym z D-104, także bez sesji, pokazuje „Potwierdzanie adresu…” i wynik nad formularzami albo siedzibą, a każdy zły token dostaje tę samą odmowę. |
| D-145 | decision, new | F3 (K3) | Zalogowany gracz z niepotwierdzonym adresem widzi w nagłówku na każdym ekranie zdanie i przycisk „Wyślij ponownie”, wysyłkę zleca tylko na adres własnego konta, a po założeniu konta i po każdej wysyłce w tym miejscu stoi zdanie wyniku w swojej roli. |
| D-44 | decision, changed | F4 (K4) | Przycisk „Wyślij ponownie” w nagłówku czekający na serwer ma napis „Wysyłanie…”, obok „Logowanie…” i „Zakładanie konta…”. |
| D-146 | decision, new | F5 (K5) | Wiadomość potwierdzająca idzie z `loop2@mariusznazar.com` z nazwą „loop2”, zwykłym tekstem, z ustalonym tematem i treścią w trzech akapitach, z odnośnikiem w osobnym wierszu. |
| D-111 | decision, changed | F6 (K6) | Produkcja wymaga do startu także pięciu ustawień poczty (nadawca, serwer, port, login, plik hasła), sprawdzanych przed nasłuchem; start nie łączy się z serwerem poczty. |
| D-13 | decision, changed | F7 (K7) | Hasło SMTP leży w `/etc/loop2/smtp-password` (root, grupa 1000, 0440), z kopią w prywatnej notatce, przekazane tylko aplikacji jako sekret tylko do odczytu; nadawca, serwer, port i login są jawnymi wartościami w `compose.yaml`. |
| D-17 | decision, changed | F7 (K7) | Plik hasła SMTP, jak tokenu tunelu i kluczy sesji, zakłada człowiek poza checkoutem i montowany jest tylko jego odbiorcy. |
| D-147 | decision, new | F8 (K9) | Adres konta to adres podany przy założeniu; loop2 go nie zmienia, więc potwierdzenie dotyczy tego jednego adresu. |
| D-148 | decision, new | F9 (K10) | Odnośnik zablokowanego konta niczego nie zmienia i gracz widzi „Odnośnik jest nieważny albo wygasł.”; odnośnik unieważniony blokadą nie wraca po odblokowaniu. |
| D-137 | decision, changed | F9 (K10, To do 16) | Blokada w jednej transakcji oznacza konto, usuwa jego sesje i unieważnia wszystkie jego odnośniki; odblokowanie nie przywraca ani sesji, ani odnośników. |
| D-109 | decision, changed | F10 (K2, K3) | Sam odnośnik uprawnia do potwierdzenia adresu własnego konta, a ważna sesja — do zlecenia wiadomości na adres własnego konta; `POST /api/email-confirmation-message` bez sesji dostaje JSON 401. |
| D-149 | decision, new | F11 | Każda wysłana albo próbowana wiadomość o koncie liczy się do pułapów D-105 od zapisu w bazie, przed przekazaniem serwerowi poczty, niezależnie od wyniku; licznik przetrwa restart, a pułap na adres liczy się na konto. |
| D-105 | decision, changed (*Verification* only) | F11, F22 | Bez zmiany znaczenia; *Verification* wymienia niezmiennik `account-message-limits`. |
| D-112 | decision, changed | F12 | Schemat w wersji 3: konto ma czas potwierdzenia adresu (pusty, dopóki niepotwierdzone), nowa tabela odnośników trzyma skrót tokenu, cel, czasy i znak unieważnienia; blokada unieważnia odnośniki, a stare wiersze odnośników są przycinane. |
| D-150 | decision, new | F13 | Wzorcem rodzaju `mail-sending` jest `src/server/account-mail.ts`; wysyłka poczty składa i nadaje wiadomości niezależnie od HTTP i bazy, w ograniczonym czasie, zgłasza porażkę jako wynik i niczego tajnego nie loguje. |
| `loop2-host-sharing` | invariant, changed | F16 | Aplikacja dostaje od hosta dodatkowo tylko odczyt hasła SMTP. |
| `account-session-authorization` | invariant, changed | F17 | `POST /api/email-confirmation-message` bez ważnej sesji dostaje JSON 401, a identyfikator ani adres podany przez wywołującego nie kieruje wiadomości na cudzy adres. |
| `account-client-outcomes` | invariant, changed | F19 | Klient przeglądarki zwraca konto tylko z logiczną wartością `emailConfirmed` w odpowiedzi. |
| `unblock-restores-no-link` | invariant, new, test | F20 | Odnośnik unieważniony blokadą niczego nie potwierdza po odblokowaniu konta. |
| `email-confirmation-link` | invariant, new, test | F21 (with the "while blocked" half of F20) | Odnośnik potwierdzenia potwierdza raz, tylko przed wygaśnięciem, tylko do wysłania późniejszej wiadomości potwierdzającej i tylko dla niezablokowanego konta, a odrzucony niczego nie zmienia. |
| `account-message-limits` | invariant, new, test | F22 | Ponad 30 wiadomości o koncie na godzinę łącznie albo 3 na jeden adres serwer niczego nie przekazuje serwerowi poczty, także po restarcie. |
| `account-email-via-outsider` | invariant, new, review, partial projected | F26 | Wiadomości potwierdzające wychodzą z `mariusznazar.com` przez Outsidera. |
| `account-email-nodemailer-starttls` | invariant, new, test, partial projected | F27 | Serwer przekazuje wiadomości potwierdzające Outsiderowi Nodemailerem 10 tylko po przejściu połączenia SMTP na TLS. |
| `player-password-login`, `email-verification-nonblocking` | invariants, *Derives from* gains D-140 | F23 (step 4.4) | Bez zmiany znaczenia. |
| `mikrus-outsider-mail` | environment fact, new | F28 | Dokumentacja Outsidera opisuje skrzynki dla własnej domeny z rekordem MX i `outsider.mikr.us` jako serwerem SMTP. |
| `nodemailer-require-tls` | environment fact, new | F29 | Nodemailer 10.2.1 z `requireTLS` wysyła STARTTLS niezależnie od ogłoszenia go przez serwer i kończy błędem zamiast pracy bez szyfrowania, gdy EHLO, STARTTLS albo przejście na TLS się nie uda. |
| `uri-fragment-in-requests` | environment fact, new (not in the plan; see Choices) | follows from D-144 *Based on* | RFC 9110 wyklucza fragment adresu z adresu żądania i z nagłówka `Referer`, a fragment widzi tylko przeglądarka i skrypty strony. |
| part map *External context* | row added | F30 | Mikrus Outsider, w obie strony, niezaufany. |
| D-151 (proposed, commit `06b0385`) | decision, new, narrows D-73 | F32 | Usługa SMTP Outsidera nie ma testu zgodności i żaden test do niej nie sięga: kod wysyłki testuje się z prawdziwym serwerem SMTP na loopbacku, trasy — z zastępczym nadawcą, a zgodność z Outsiderem sprawdza człowiek wysyłką z wdrożonego kontenera, gdy zmienia się sposób nadawania. |
| D-73, D-79 (proposed, commit `06b0385`) | decisions, changed | F32 | D-73 wymienia D-151 wśród odstępstw; D-79 traci zdanie, że rejestr npm to jedyna cudza usługa. |

Rows tied to existing entries, no second entry (WAY-134):

- **F14** — `account-schema-lifecycle` and `account-database-schema` already say "the current
  version" and "every account and session and their values kept" since task 19; D-112 now names
  version 3 and an account's confirmation time "unset until it is", which carries "existing accounts
  stay unconfirmed". Not written into the invariants: that is K8's meaning, which the human rejected
  because it binds only at this one move and D-112 carries preservation. Slice 1's move test checks
  it as a test of D-112's step, not as an invariant test.
- **F15** — `account-startup-configuration` says "all valid account settings"; D-111, which it
  derives from, now lists the mail settings among them, so the sentence holds unchanged.
- **F18** — `account-mutation-request-guards` says "every state-changing account route", which the
  two new routes join unchanged.
- **F31** — Slice 2's, as the plan's *Choices* give.
- **F33** — no glossary entry: "account message" (D-105) and "confirmed email address" are used in
  the meaning a reader of the field gives them; "emailed link" likewise.

## Questions for the human (status `blocked`)

### Question 1 — F32: how is the code that talks to Outsider's SMTP tested? (WAY-172)

D-73 adopts the testing template whole, and the template's row for someone else's service asks for
"a double of that service in the test, and a separate contract test: a check that both sides agree
on the format". D-79 departs from it only for the npm registry, and its sentence says the registry
is "the only foreign service the tested code talks to", which stops being true with this change.
D-84 carries a real local server and controlled responses that "test reactions to forced failures
without proving the replaced operation", so the loopback SMTP server and the stand-in mailer of spec
Decision 9 are carried; leaving Outsider's contract to a human's delivery test is not.

- **A (recommended)** — the proposed D-151 (commit `06b0385`): no contract test for Outsider, no test
  reaches it, the mailer tested against a real SMTP server on loopback, the routes with a stand-in
  mailer, and the agreement with Outsider checked by a human's delivery from the deployed container
  when the way messages are submitted changes; D-73 lists D-151 among its departures and D-79 loses
  "the only foreign service". Cost: a later change to the mailer's connection waits for a human's
  delivery test to be known good; `guidelines/testing.md` (line 11, "sześć odstępstw") and its row
  „Czy kod rozmawia z cudzą usługą?” change in Slice 10.
- **A′** — as A without the last clause ("when the way messages are submitted changes"): the
  delivery test is H4 alone, and nothing says when it is made again. Cheaper; a broken connection
  change shows only when a player's message fails.
- **B** — keep the template's contract test: a test against the real Outsider. It needs the SMTP
  password outside the server (against D-13), the network and a share of the 1000 messages a month,
  and its result changes with the service, not the code.
- **C** — a contract test against a recorded transcript of Outsider's replies: proves nothing of the
  real service (D-84) and drifts from it.

If nothing is decided, Slices 2, 5 and 10 build tests on a meaning no decision carries, and D-79
states a falsehood once the mailer exists.

### Question 2 — K1 and spec Decision 4: may an earlier link keep working after a newer message was sent?

K1: "wysłanie nowego odnośnika unieważnia wcześniejsze odnośniki tego samego rodzaju dla tego
konta". D-143 states it so. Spec Decision 4, after its review: when the mailer has answered `sent`
but marking the earlier links as no longer working then fails in the database (a disk error, or
`SQLITE_BUSY` past the busy timeout while the owner's block command holds the write lock), the
answer stays `sent` and "the earlier links stay usable until they expire or are spent by a later
send, confirmation or block … This is the one case where K1's 'a new link invalidates earlier ones'
is not met". The foundation step returns an exception the row does not allow to the human.

- **A (recommended)** — accept the exception, written into D-143 as foreseen: "…except where
  recording that fails after the mail service accepted the message, when the earlier links keep
  working until they expire, are used, or a later message, a confirmation or a block stops them."
  Cost: in a rare database fault an older confirmation link (24 h) — and in task 21 an older reset
  link (1 h) — still works; the spec and plan stay as they are. Without the sentence, D-143 is false
  in that fault and a reviewer may fail Slice 5 on it.
- **B** — stop the earlier links in the same transaction that records the new one, before handing it
  to the mail service: K1 holds with no exception, but a sending that fails leaves the player with
  no working earlier link (D-143's "a message whose sending failed leaves the earlier links working"
  would change), and spec Decisions 3 and 4 and Slices 1 and 5 change.
- **C** — report `failed` in that fault: the player sends again into the same fault, and the earlier
  links still work, so K1 is not met either.

`email-confirmation-link` ("only until a later confirmation message of its account has been sent")
takes the same exception under A.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` on the base `7a633a7` | 0 | 0 errors |
| the same after the entries, before `f545afe` and before `06b0385` (each run) | 0 | 0 errors |
| the same on `06b0385` | 0 | 0 errors |
| own-work check (below), a reciprocity script over `foundations/` | 0 | no mismatch in this change's entries |
| mechanical source checks of the three facts and the cited passages (Python and `grep -F` over the fetched sources) | 0 | every passage stands word for word in its source |

Not run: `npm test` — the handoff forbids it and no test changed. The invariants changed or added
with *Method* `test` have no test yet: Slices 1, 2, 5, 6 and 9 write or change them (see Concerns).

## Own-work check (section 3)

- Requirement most likely missed: every invariant a decision's *Verification* names derives from that
  decision, and every decision an invariant derives from names it back (the decision template's
  "Verification"), which `foundation_check.py` does not check.
- Check: a script reading every `**Verification:** invariants:` list and every `**Derives from:**`
  in `foundations/decisions.md` and `foundations/invariants.md` and reporting each one-sided link.
- Result: nine one-sided links, all older than this change (D-06, D-22, D-113, and the invariants
  `application-build-output`, `map-run-layout`, `minute-span-split`, `password-operation-gate`,
  `account-client-requests`); none involves an entry this change wrote or changed. Not fixed: out of
  this task's scope.

## Reaches beyond the dispatch

- The MVP definition in the vault, `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`
  (sha256 `3e9c2cc9146b…`, as the task records), § Projected foundation changes, lines 240–375,
  1758–1785 and 2367–2378: the gate-approved *Based on*, *Rationale* and *Rejected* of the three
  partial decisions and the projected invariants and fact, which the task quotes only by their
  sentences. Needed to write them "whole as the readiness gate approved", minus the reset part.
- Fetched into `.runs/task-cycles/potwierdzenie-adresu/foundation-sources/` (ignored by `.gitignore`;
  nothing installed into `node_modules`): the Nodemailer 10.2.1 tarball from
  `https://registry.npmjs.org/nodemailer/-/nodemailer-10.2.1.tgz` (sha256 `8b6a42d2…`), extracted;
  `https://wiki.mikr.us/outsider/` live and its Wayback copies of 2026-03-14 and 2026-09-21 (the
  CDX index lists 2026-09-21 as the newest capture); the OWASP Email Validation and Verification and
  Forgot Password cheat sheets, rendered and as Markdown at commit `995524d4…` of
  OWASP/CheatSheetSeries; RFC 9110 and RFC 9112 from rfc-editor.org; `fetch.bs` at the commit
  `fetch-origin-header` already cites.
- In the worktree, read selectively: `guidelines/testing.md` (head, the level table and recipes) and
  `.the-way/product-guidelines/testing/template.md` (the foreign-service row) for F32; the-way's
  decisions WAY-03, WAY-126, WAY-134, WAY-172.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| D-140 holds the projected entry's first two sentences, minus "for account recovery", not only the clause "a confirmation message establishes that address" | the clause alone under a question about signing in and reset — a binding sentence that does not answer its heading | the human reads at the merge two sentences D-96 already implies; task 21 then only appends recovery |
| Each partial projected decision is marked in its *Origin* ("this entry holds what that entry says of …, and … enters with password reset"); the two partial invariants carry no mark, since an invariant has no such field, and follow their decisions | a `TODO` — the main branch may hold one only in *Rests on* | task 21 finds the invariants through the decisions' *Verification* rather than by a mark of their own |
| D-140 *Relations* `none`: the decision it derives from, "Who can create and use a player account?", is projected and not in the log (task 16 writes it) | `TODO` — not allowed on the main branch | task 16's search has to add the relation; none today |
| Gate-approved *Based on* citations of D-140–D-142 carried as the definition gives them (titles, addresses and dates, no quoted passages), like D-138 | re-reading and quoting each — the gate approved them as they are | a later reader finds no quoted passage to compare |
| New invariants whose tests the slices write carry *Method* `test` now (`email-confirmation-link`, `unblock-restores-no-link`, `account-message-limits`, `account-email-nodemailer-starttls`) | `review` until each slice turns it — no slice's *Change* lists `foundations/invariants.md` | a slice that drops its test leaves a `test` invariant with no test; its review catches it against the plan's *Checks* |
| K10 kept in two places: D-137 says what the block command does to links, D-148 what a blocked account's link does; the "while blocked" half of F20 went into `email-confirmation-link`, the "after unblocking" half into a new `unblock-restores-no-link`, beside `unblock-restores-no-session` | changing `blocked-account-access`, whose sentence is a gate-approved projection about sign-in and authenticated endpoints | none known |
| D-149 is a new decision deriving from D-105, which keeps its wording (only its *Verification* gains the invariant) | rewriting D-105 — a new rule beside an existing decision is a new question | one more decision |
| D-13 gains "the sender address and the mail service's host, port and login stand as plain values in `compose.yaml`" | leaving them unsaid — D-13 keeps "access values" out of the repository, and a reader could take the SMTP login for one | none known |
| `account-email-via-outsider` rests on `mikrus-outsider-mail` and names `account-server · deployment` | the projection's `Rests on: none` and `every` — the value `outsider.mikr.us` the sentence depends on comes from the fact, and `every` fits a map with no parts | a reviewer of an unrelated part no longer reads it |
| `uri-fragment-in-requests` written, beyond the plan's rows | citing RFC 9110 in D-144's *Based on* without a fact — the template asks for a fact where a falsified citation would call the decision into question, as it would the fragment form | one more fact to keep |
| The partial invariant `account-email-nodemailer-starttls` rests on no fact | `nodemailer-require-tls` in its *Rests on* — the fact is a reason of D-142, not a condition of the sentence, which its test checks directly | none known |
| The F32 proposal in a commit of its own | one commit — the orchestrator could not drop the proposal without editing the other entries | none |

## Concerns

- Changed invariants are ahead of the code until their slices land: `account-client-outcomes`
  (Slice 6), `account-session-authorization` (Slice 5), `loop2-host-sharing` (Slice 9); the new
  `test` invariants have no citing test until Slices 1, 2 and 5. The code on `06b0385` does not yet
  meet the changed sentences; no test fails for it, since the tests are unchanged.
- `guidelines/testing.md:11` says "jego sześć odstępstw to D-74, D-75, D-76, D-77, D-78 i D-79"; if
  question 1 is answered A or A′, it becomes seven, which Slice 10's goal should name (its plan row
  lists the foreign-service row, not this line).
- D-112's binding sentences grew long (three sentences, the second listing three tables); kept as
  one decision because the schema is one question.

## Revision for question 2

The orchestrator answered question 2 with way **B**: the exception came from the cycle's own
design, not from the human's row, so the design changes and K1 holds whole. The transaction that
records a new link, before its message is handed to the mail service, also stops every earlier
unspent link of the same account and purpose. There is no step after `sent`, and a sending that
fails leaves no earlier link working. Question 2 no longer goes to the human; question 1 (F32) stays
open, and commit `06b0385` is unchanged.

Commit: `6ec347f` docs: :memo: stop earlier emailed links when a new one is recorded, before its
message is sent — `foundations/decisions.md` +6 −6 · `foundations/invariants.md` +1 −1.

| Entry | What changed | Meaning (pl) |
|---|---|---|
| D-143 | binding: a link's lifetime counts from its recording; recording a new link stops, in the same transaction, every earlier link of its kind for the account, before the message goes to the mail service, so a failed sending leaves no earlier link working; *Verification* examples, *Rationale* and *Rejected* follow (the rejected way is now stopping earlier links only after the mail service accepted the new message) | Odnośnik potwierdzenia działa 24 godziny, odnośnik resetu 1 godzinę od zapisania, każdy raz; zapisanie nowego odnośnika, jeszcze przed przekazaniem wiadomości serwerowi poczty, w tej samej transakcji unieważnia wcześniejsze odnośniki tego rodzaju dla konta, więc po nieudanej wysyłce żaden wcześniejszy odnośnik nie działa. |
| D-112 | binding: recording an emailed link also marks every earlier link of the same account and purpose as no longer working, in the transaction that writes it | Zapis odnośnika w bazie w tej samej transakcji sprawdza blokadę konta i unieważnia wcześniejsze odnośniki tego konta o tym samym celu. |
| `email-confirmation-link` | sentence: "only until a later confirmation link of its account has been recorded" in place of "… message … has been sent" | Odnośnik potwierdzenia potwierdza raz, tylko przed wygaśnięciem, tylko dopóki nie zapisano późniejszego odnośnika potwierdzenia tego konta i tylko dla niezablokowanego konta, a odrzucony niczego nie zmienia. |

D-149 describes no step after a sending, so it is unchanged. D-144 ("a confirmation stops every
other confirmation link of the account") is unaffected.

Check: `python -B .the-way/elements/common/foundation_check.py` → exit 0, 0 errors, on `6ec347f`.
