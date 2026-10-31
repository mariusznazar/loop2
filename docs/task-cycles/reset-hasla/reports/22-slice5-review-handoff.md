# Handoff — reviewer of Slice 5, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You review one slice of a plan, a fresh agent that
did not make it. Your questions go to the orchestrator, never to the human.

- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`). Read it
  whole; read a file it names when the step that names it comes.
- What is reviewed: Slice 5, the range `aa9ff04..b966a74`.
- The executor's report, claims to verify: `.runs/task-cycles/reset-hasla/reports/21-slice5-report.md`
- Report path: `.runs/task-cycles/reset-hasla/reports/22-slice5-review-report.md`; its first line is
  `PASS <sha>`, `FAIL <sha>` or `questions`.
- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch `task/reset-hasla`. Process pin `.the-way` at
  `a8dfe8a`, not moved.
- Trust boundary (step 4): **yes**, `src/server/**`. Two new routes take data from the network
  without a session. Every code review checks crafted input at that boundary: token forms, origin
  and body guards, account enumeration through content or time, tokens and links never reaching
  logs, a link of another kind, a blocked account, a login in progress.
- Irreversible operation (step 4): **no**; the design has no schema step. No agent deploys, sends
  real mail through Outsider or changes anything on the server (D-12); tests never reach the real
  Outsider.
- The plan's labels are now: N1 = `D-214`, N2 = `D-215`, N3 = `D-216`, N4 = `D-217`, N5 = `D-218`, N6 = `D-219`, I1 = `password-reset-verified-email`, I2 = `password-reset-link`, I3 = `password-reset-ends-sessions`, F1 = `express-session-end-of-request`, F2 = `express-session-regenerated-session-saved-again`.
- The line ranges of foundation entries below are current in the worktree; where they differ from
  the plan's section, these hold. Ranges of code or tests in the section may have moved with earlier
  slices: find them again by name.
- Do not change any file. Do not run the product's gate; run focused checks where a claim needs it.

## Your section of the plan (`.runs/task-cycles/reset-hasla/plan.md`), word for word

### Slice 5 — The request for a link

- **Goal:** `POST /api/password-reset-message` stands behind the transport gate and the guards of
  Decision 1, answers a well-formed address with 204 before any work on an account and a badly
  written one with 400 `invalid-email`, and only after the answer, through `setImmediate`, starts
  `sendResetMessage`, which never rejects. `sendConfirmation` becomes `sendLinkMessage(runtime,
  policy, account, kind)`, one path with a table of two kinds, keeping all it does; both confirmation
  routes read its outcome as before. A message goes only to a confirmed address of an account not
  blocked and within the limits of D-105. Comments on "both sending routes" and the five small routes
  follow.
- **Change:** `src/server/account-routes.ts` · `tests/http.test.mjs` · `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:46-73` Constraints ·
  `.runs/task-cycles/reset-hasla/spec.md:77-91` Decision 1 — Two routes, no new refusal code ·
  `.runs/task-cycles/reset-hasla/spec.md:93-134` Decision 2 — The request is answered before any work
  on an account · `.runs/task-cycles/reset-hasla/spec.md:136-155` Decision 3 — One sending path with a
  table of kinds · `.runs/task-cycles/reset-hasla/task.md:18-19` To do 2 and 3 ·
  `.runs/task-cycles/reset-hasla/task.md:137-137` Questions carried to cycle, third question ·
  `.runs/task-cycles/reset-hasla/task.md:202-205` Settlements to record, rows 2 to 5 ·
  `foundations/decisions.md:1791-1804` D-99 · `foundations/decisions.md:1864-1875` D-104 ·
  `foundations/decisions.md:1877-1890` D-105 · `foundations/decisions.md:1931-1942` D-109 ·
  `foundations/decisions.md:1944-1957` D-110 · `foundations/decisions.md:2821-2834` D-155 ·
  `foundations/decisions.md:2836-2849` D-156 · `foundations/decisions.md:2851-2864` D-157 ·
  `foundations/decisions.md:2881-2894` D-159 · `foundations/decisions.md:2896-2907` D-160 ·
  `foundations/decisions.md:2909-2920` D-161 · `foundations/decisions.md:2922-2935` D-162 ·
  `foundations/decisions.md:2937-2950` D-163 · `foundations/decisions.md:108-127` D-05 ·
  `foundations/invariants.md:718-726` account-session-authorization ·
  `foundations/invariants.md:728-736` account-mutation-request-guards ·
  `foundations/invariants.md:738-746` account-request-transport ·
  `foundations/invariants.md:908-916` account-message-limits ·
  `foundations/environment_facts.md:334-338` uri-fragment-in-requests ·
  Foundation entries rows N1, N2, N3 and I1 ·
  `src/server/account-policy.ts` · `src/server/account-mail.ts` ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` ·
  `guidelines/coding-mail-sending.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/account-routes.ts`: an address from the network without a
  session; enumeration through content or time; tokens and links never reaching logs; a blocked
  account
- **Checks:** Start from the route case of a mailer that never answers: the 204 comes at once.
  Then the same answer and body for an unknown address, an unconfirmed one, a blocked one, one above a
  limit and when recording fails; nothing recorded and nothing handed on for the first four, each
  such case sending a request for a confirmed control address after it and waiting for that message,
  as Decision 2's *Proved by* gives; a forced failed lookup leaves the process alive and one fixed
  line in the log without the address; `invalid-email` hands nothing on; a reset message counts
  against the limits shared with confirmation; a later request stops the earlier reset link; a recorded
  reset link's `expires_at` minus `created_at` is 3 600 000. The new
  route joins the Origin, body, field and transport refusals of `tests/transport.test.mjs` and the
  list of canonical routes at `tests/http.test.mjs:197`. Cases carry
  `invariant: password-reset-verified-email`, `invariant: account-session-authorization`,
  `invariant: account-message-limits`, `invariant: account-mutation-request-guards` and
  `invariant: account-request-transport`; each is seen failing once, then passing, with
  `npm test -- tests/http.test.mjs` and `npm test -- tests/transport.test.mjs`. Also
  `npm run typecheck` and `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 3 · Slice 4

## Passages of the task and spec its *Read* names, word for word

### `.runs/task-cycles/reset-hasla/spec.md:46-73`

> ## Constraints
>
> - **Trust boundary:** yes. `src/server/**` is the boundary of `account-server`. Every code review of
>   the cycle checks crafted input there: token forms, origin and body guards, account enumeration
>   through content or time, tokens and links never reaching logs, a link of another kind, a blocked
>   account, a login in progress.
> - **Irreversible operation:** no. `emailed_links` admits the purpose `password-reset` since
>   version 3, and `accounts.password_hash` already exists, so no step is added and code of an earlier
>   commit opens the database as before.
> - D-112: no transaction spans asynchronous hashing, mail sending or an HTTP response; recording a
>   link reads the block in its own transaction and stops earlier links of the same purpose.
> - D-155, D-156, D-160, row 19: a reset link works once, for one hour, until a later reset link is
>   recorded, while its account is not blocked and unless a block stopped it, also after an unblock;
>   the server gives one refusal for every token that does not work.
> - D-102, D-103, D-116: password work passes the one gate; an admitted attempt is settled once, after
>   its password work; a live restriction is never evicted; attempt histories live in process memory.
> - D-104, D-109: both routes stand behind the transport, Origin, JSON, 16 KiB and exact-field guards;
>   a request's address grants no authority.
> - D-161, D-162: a message counts from the moment it is recorded; sending is bounded, reports failure
>   as a result and writes no credential, token, link or message to a log.
> - D-05, `loop2-one-serving-process`: one Node process serves every request, and D-112's connection is
>   synchronous, so two requests interleave only where one of them awaits. The operator's block is the
>   only writer from another connection.
> - D-117: the browser client copies the server's contract by hand, so a route and its client change
>   together.
> - express-session 1.19.0 as pinned: `resave: false`, `saveUninitialized: false`, `rolling: true`.
>   With these, a session the route regenerated and saved is saved a second time when the response
>   ends (Decision 7).

### `.runs/task-cycles/reset-hasla/spec.md:77-91`

> ### Decision 1 — Two routes, no new refusal code
>
> - `POST /api/password-reset-message`: body exactly `{ email }`. Answers 204 with no body; a badly
>   written address gets 400 `invalid-email`.
> - `POST /api/password-reset`: body exactly `{ token, password, passwordConfirmation }`. Answers 204
>   with no body; refusals are 400 `invalid-password`, 400 `password-mismatch`, 400 `invalid-link`,
>   429 `too-many-attempts`.
> - Both paths join `paths`, so the transport gate and `Cache-Control: no-store` reach them, and both
>   join the list of routes behind `mutationGuards` with the 16 KiB limit. A body that is not exactly
>   the named string fields gets 400 `invalid-request`.
> - No new code in `refusalCodes`: every refusal above exists at the base.
>
> Rejected: 200 with a body for the request — a body is a place where an outcome can leak later, and
> nothing needs one; 202 — `noContentRequest` of the client already gives "only this status counts",
> and a second success kind costs a helper for no gain.

### `.runs/task-cycles/reset-hasla/spec.md:93-134`

> ### Decision 2 — The request is answered before any work on an account
>
> The handler does only what depends on the request's own text: the fields, then the address's form
> through `normalizeEmail`. It then ends the response with 204 and only after that, in a later turn of
> the event loop (`setImmediate`), starts the unit `sendResetMessage`. No lookup, no `issueLink`, no
> mail step comes before the response. So the same bytes leave in the same time for every well-formed
> address, whatever the account's state, and a database failure on that path cannot change the answer.
>
> `sendResetMessage(runtime, policy, email): Promise<void>` finds the account by the normalized
> address, does nothing unless an account exists with a confirmed address, and hands the account to
> `sendLinkMessage` (Decision 3), whose outcome it ignores. It never rejects: a failure of the lookup
> is caught and leaves one fixed line in the log without the address, because a throw on this path
> would have no request to fall back on and would end the process. A blocked account reaches
> `issueLink`, which answers `blocked` and records nothing (D-112, row 2 and question 10). `limited`
> leaves no trace beyond the count; a limit is no failure of sending.
>
> Reading of row 3, chosen so it cannot be read two ways: "czas" is the time of this answer. The
> commit of `issueLink` runs after the answer, but it does stop the event loop for its few
> milliseconds, so a client that measures a second request sent right after could in principle see it.
> Removing that takes a second thread and a second connection, against D-112's one connection. It is
> an accepted cost, and D-105 bounds it: only a commit that writes costs a sync to disk, so a probe
> gets at most three samples an hour for one account and 30 in total, and each sample mails the
> account's owner.
>
> Rejected: recording in the handler and sending in the background — `issueLink` runs under `PRAGMA
> synchronous = FULL`, and its commit costs a sync to disk only when it writes, which is only for a
> confirmed account that is neither blocked nor above a limit, so the answer's time would tell exactly
> what row 3 forbids; a fixed or random floor on the answer's time — hides the usual
> commit and not a slow one, and slows every request; a durable queue of messages — a schema step,
> which would make the operation irreversible, for a message the player can ask for again.
>
> Cost if wrong: a process stopped between the answer and the recording sends nothing, and the player
> waits for a message that does not come. The sentence's own ending covers that case. If the unit
> threw, the process would stop; hence the rule that it never rejects, and a test forcing a failed
> lookup.
>
> Proved by: a route test with a mailer that never answers gets its 204 at once; the same answer and
> body for an unknown address, an unconfirmed one, a blocked one, one above a limit, and when recording
> fails; nothing recorded and nothing handed on for the first four. Stand-in mailers prove reactions,
> not delivery (D-163). Work of this kind ends after the answer, so a case that asserts "nothing
> happened" sends a request for a confirmed control address after it and waits for that message:
> immediates run in order, so the earlier work has finished by then.

### `.runs/task-cycles/reset-hasla/spec.md:136-155`

> ### Decision 3 — One sending path with a table of kinds
>
> `sendConfirmation` becomes `sendLinkMessage(runtime, policy, account, kind)`, keeping all it does
> today: make the token, record the link with `accountMessageLimits`, catch a recording failure and
> log a fixed line, compose, hand on, and bound the sending through `boundedSending` and
> `policy.sendingDeadline`. Its result stays `"sent" | "limited" | "failed" | "blocked"`, and it still
> never throws.
>
> `kind` names what differs and nothing else: the link's purpose, its lifetime, the fragment of its
> address, and the composing function. Two values of it exist, for confirmation and for reset. The two
> existing callers keep reading the outcome; `sendResetMessage` ignores it, because row 3 shows it to
> nobody. Bounded time and the log's content thus come from one place: `SmtpMailer` logs its failure
> and `boundedSending` its missed deadline, each a fixed line.
>
> Rejected: a copy for reset — two places for the same order of recording and sending, which is the
> order D-155 and D-161 depend on; a queue or a separate bounded wrapper for the unwaited path — the
> existing promise needs no one to await its result in order to stay bounded.
>
> Cost if wrong: small; it is a rename with one parameter, covered by the existing tests of both
> confirmation routes.

### `.runs/task-cycles/reset-hasla/task.md:18-19`

> 2. Po prośbie serwer zapisuje i wysyła jednorazowy odnośnik tylko na wcześniej potwierdzony adres konta, które nie jest zablokowane, a odnośnik jest ważny 1 godzinę, działa raz, jego zapisanie unieważnia wcześniejsze odnośniki resetu tego konta, a wiadomość liczy się do pułapów wysyłki D-105 wspólnych z wiadomością potwierdzającą (D-155, D-161; pytania 3 i 10).
> 3. Po prośbie z adresem zapisanym poprawnie gracz widzi zawsze to samo zdanie w `text-secondary`: „Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.”, stojące pod formularzem, tam, gdzie stoją zdania odmowy, pole adresu jest puste, a formularz i „Wróć do logowania” zostają; odpowiedź nie czeka na serwer poczty, porażkę wysyłki widać tylko w logu serwera, a prośba, na czas, gdy konta ma tylko właściciel, nie ma własnego limitu na adres klienta, do rewizji przed podaniem adresu gry innym graczom, jeśli nadużycia staną się realne (pytania 2, 3 i 13). Adres zapisany błędnie, czyli bez jednego „@” z tekstem po obu stronach, dostaje pod polem zdanie „Podaj adres e-mail w postaci nazwa@domena.” i nic nie wychodzi; ten warunek stoi w formularzu i na serwerze (pytanie 15).

### `.runs/task-cycles/reset-hasla/task.md:137-137`

> - Jak odpowiedź na prośbę nie czeka na serwer poczty, a wysyłka dalej ma ograniczony czas i zapisuje porażkę w logu bez tokenu i odnośnika (D-162), skoro dziś obie trasy wysyłające czekają na wynik (`boundedSending`, *Context*).

### `.runs/task-cycles/reset-hasla/task.md:202-205`

> | 2 | Prośbę o odnośnik może wysłać odwiedzający bez sesji, a podany w niej adres wskazuje jedynie konto, na którego adres może wyjść odnośnik; sam odnośnik resetu, bez sesji, uprawnia do ustawienia nowego hasła swojego konta i do niczego innego; obie trasy podlegają zabezpieczeniom transportu, pochodzenia i wejścia. | decision | pytania 1 i 4 (A; Mariusz, 2026-10-30, pozycja D27: „dopisanie do reguł, że o reset może prosić osoba niezalogowana”; pozycja D30, propozycja 1: „bo uprawnia sam odnośnik”), *Not chosen* tam; propozycja refinera: „wskazuje jedynie konto, na którego adres może wyjść odnośnik”, „i do niczego innego” i zdanie o zabezpieczeniach; zmienia D-109 (co uprawnia do żądania): “an account identifier or email address supplied in a request grants no authority” i `account-session-authorization` (niezmiennik o tym samym): “an account identifier or email address supplied by the caller cannot authorize reading or changing another account or session or direct a message to another address” | czy trasy wymagają czegoś więcej niż zabezpieczeń transportu, pochodzenia i wejścia oraz czy sesja w przeglądarce zmienia wynik |
> | 3 | Każdy poprawnie zapisany adres dostaje w odpowiedzi na prośbę to samo zdanie w `text-secondary`: „Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.”, stojące pod formularzem, który zostaje z pustym polem adresu i z „Wróć do logowania”, a odpowiedź nie czeka na serwer poczty, więc ani jej treść, ani czas nie mówią, co się z prośbą stało, natomiast adres zapisany błędnie dostaje pod polem „Podaj adres e-mail w postaci nazwa@domena.” i nic nie wychodzi. | decision | pytanie 2 (A; Mariusz, 2026-10-30, pozycja D28: „zawsze to samo zdanie, bez czekania na serwer poczty”), *Not chosen* tam; pytanie 13 (A; pozycja 21-Q12: „pod formularzem, pole adresu puste, formularz i „Wróć do logowania” zostają”) i pytanie 15 (A; pozycja 21-Q14: „pod polem zdanie, które daje dziś „Załóż konto”: „Podaj adres e-mail w postaci nazwa@domena.”, i nic nie wychodzi”), *Not chosen* tam, oba tą samą odpowiedzią, która przyjęła ten wiersz, i oba dopisane do jego pokazanego brzmienia; propozycja refinera: rola `text-secondary` (kolor tekstu pomocniczego), „ani jej treść, ani czas nie mówią, co się z prośbą stało” i odczytanie D-105 (pułapy wysyłki): “Above either limit no message is sent and the player is told to try later” — końcówka zdania jest tym „try later”, co ten wiersz zmienia w D-105; obok D-44 (wspólne kontrolki): “A form's server refusal and loss of connection appear as one sentence below the form in `warning`”, co nie obejmuje tego zdania | czy pokazać prawdę o wyniku jak przy „Wyślij ponownie” (D-157, odpowiedź przycisku w nagłówku), czy odpowiedź czeka do 10 sekund na serwer poczty, gdzie stoi zdanie i co dostaje adres zapisany błędnie |
> | 4 | Na czas, gdy konta ma tylko właściciel, prośba o reset nie ma własnego limitu na adres klienta i ograniczają ją tylko pułapy D-105, z przyjętym kosztem, że kto zna dziesięć potwierdzonych adresów, wyczerpie w godzinę pułap 30 wiadomości i przez tę godzinę nikt nie dostanie wiadomości, oraz że może trzy razy na godzinę unieważnić czekający odnośnik innego gracza; do rewizji przed podaniem adresu gry innym graczom, jeśli nadużycia staną się realne. | decision | pytanie 3 (A; Mariusz, 2026-10-30, pozycja D29: „A – bez nowego limitu, na czas, gdy konta masz tylko Ty.” i „A, do rewizji przed podaniem adresu gry innym graczom, jeśli nadużycia staną się realne.”), *Not chosen* tam; propozycja refinera: „w godzinę”, „przez tę godzinę” i „trzy razy na godzinę”; obok D-102 (limity prób), który wymienia limity logowania i zakładania kont, D-105 (pułapy wysyłki, 30 na godzinę razem i 3 na adres) i jego *Rationale*, które przyjmuje tylko wyczerpanie miesięcznego limitu dostawcy | czy dołożyć licznik próśb w pamięci jak przy limitach logowania (D-102) i bramce haseł (D-103) |
> | 5 | Odnośnik resetu ma postać `<adres gry>/#reset-password=<token>`, token to 32 losowe bajty, baza trzyma tylko jego skrót SHA-256, a strona czyta token z fragmentu adresu. | decision | pytanie 4 (podstawa; Mariusz, 2026-10-30, pozycja D30: „Budowa jest taka jak przy potwierdzeniu adresu: `<adres gry>/#reset-password=<token>`, 32 losowe bajty, a w bazie sam skrót.”); propozycja refinera: „SHA-256” i „strona czyta token z fragmentu adresu”, oba z D-156; obok D-156, która mówi tylko o odnośniku potwierdzenia | postać odnośnika, nazwę fragmentu i sposób trzymania tokenu |

## Foundation entries, each whole, by identifier and current range

- `foundations/decisions.md:1791-1805` D-99
- `foundations/decisions.md:1864-1876` D-104
- `foundations/decisions.md:1877-1891` D-105
- `foundations/decisions.md:1931-1943` D-109
- `foundations/decisions.md:1944-1958` D-110
- `foundations/decisions.md:2825-2839` D-155
- `foundations/decisions.md:2840-2854` D-156
- `foundations/decisions.md:2855-2869` D-157
- `foundations/decisions.md:2885-2899` D-159
- `foundations/decisions.md:2900-2912` D-160
- `foundations/decisions.md:2913-2925` D-161
- `foundations/decisions.md:2926-2940` D-162
- `foundations/decisions.md:2941-2955` D-163
- `foundations/decisions.md:108-128` D-05
- `foundations/invariants.md:718-727` account-session-authorization
- `foundations/invariants.md:728-737` account-mutation-request-guards
- `foundations/invariants.md:738-747` account-request-transport
- `foundations/invariants.md:908-917` account-message-limits
- `foundations/environment_facts.md:334-339` uri-fragment-in-requests
- `foundations/decisions.md:3896-3948` D-214
- `foundations/decisions.md:3949-3973` D-215
- `foundations/decisions.md:3974-3995` D-216
- `foundations/invariants.md:1038-1047` password-reset-verified-email

## Guideline files, each whole

- `guidelines/coding.md`
- `guidelines/coding-http-application.md`
- `guidelines/coding-mail-sending.md`
- `guidelines/testing.md`

## Product files and method passages its *Read* names

- `src/server/account-policy.ts`
- `src/server/account-mail.ts`

## Return

Write your report to its path as the method gives. Return its first line and the path.
