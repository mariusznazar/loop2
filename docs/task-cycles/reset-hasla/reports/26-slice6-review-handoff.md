# Handoff — reviewer of Slice 6, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You review one slice of a plan, a fresh agent that
did not make it. Your questions go to the orchestrator, never to the human.

- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`). Read it
  whole; read a file it names when the step that names it comes.
- What is reviewed: Slice 6, the range `8fe869d..5fcea3b`.
- The executor's report, claims to verify: `.runs/task-cycles/reset-hasla/reports/25-slice6-report.md`
- Report path: `.runs/task-cycles/reset-hasla/reports/26-slice6-review-report.md`; its first line is
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

### Slice 6 — Setting the password by a link

- **Goal:** `POST /api/password-reset` follows the order of Decision 4: transport and guards, exactly
  three string fields, the password rules through `checkNewPassword`, the token's form and
  `resetLinkWorks`, `hashPassword` through the gate, `resetPassword`, then `clearEmailAttempts` and
  204 in the same turn as the commit. Refusals are 400 `invalid-password`, `password-mismatch`,
  `invalid-link` and 429 `too-many-attempts`; no `refusalCodes` entry is added, no ticket taken, and
  a full gate or a refused password leaves the link working. The route never touches
  `request.session`, and a session of the same account authorizes nothing afterwards, however it was
  sent along.
- **Change:** `src/server/account-routes.ts` · `tests/http.test.mjs` · `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:46-73` Constraints ·
  `.runs/task-cycles/reset-hasla/spec.md:77-91` Decision 1 — Two routes, no new refusal code ·
  `.runs/task-cycles/reset-hasla/spec.md:157-184` Decision 4 — The order of the set-password route ·
  `.runs/task-cycles/reset-hasla/spec.md:186-204` Decision 5 — The gate only, no attempt ticket ·
  `.runs/task-cycles/reset-hasla/spec.md:327-356` Decision 8 — The session a set-password request
  brought with it · `.runs/task-cycles/reset-hasla/spec.md:358-386` Decision 9 — Clearing the
  address's history · `.runs/task-cycles/reset-hasla/task.md:30-32` To do 5, 6 and 7 ·
  `.runs/task-cycles/reset-hasla/task.md:136-136` Questions carried to cycle, second question ·
  `.runs/task-cycles/reset-hasla/task.md:202-202` Settlements to record, row 2 ·
  `.runs/task-cycles/reset-hasla/task.md:211-215` Settlements to record, rows 11 to 15 ·
  `.runs/task-cycles/reset-hasla/task.md:219-219` Settlements to record, row 19 ·
  `foundations/decisions.md:1776-1789` D-98 · `foundations/decisions.md:1821-1832` D-101 ·
  `foundations/decisions.md:1834-1847` D-102 · `foundations/decisions.md:1849-1862` D-103 ·
  `foundations/decisions.md:1864-1875` D-104 · `foundations/decisions.md:1892-1903` D-106 ·
  `foundations/decisions.md:1931-1942` D-109 · `foundations/decisions.md:1944-1957` D-110 ·
  `foundations/decisions.md:1972-1983` D-113 · `foundations/decisions.md:1985-1996` D-112 ·
  `foundations/decisions.md:2549-2562` D-137 · `foundations/decisions.md:2564-2575` D-138 ·
  `foundations/decisions.md:2821-2834` D-155 · `foundations/decisions.md:2836-2849` D-156 ·
  `foundations/decisions.md:2896-2907` D-160 ·
  `foundations/invariants.md:638-646` player-argon2-password-hash ·
  `foundations/invariants.md:658-666` password-operation-gate ·
  `foundations/invariants.md:718-726` account-session-authorization ·
  `foundations/invariants.md:728-736` account-mutation-request-guards ·
  `foundations/invariants.md:738-746` account-request-transport ·
  `foundations/invariants.md:788-796` account-attempt-limits ·
  `foundations/invariants.md:858-866` blocked-account-access ·
  `foundations/invariants.md:868-876` player-server-session ·
  `foundations/invariants.md:898-906` unblock-restores-no-link ·
  `foundations/environment_facts.md:262-266` express-session-cookie-lifecycle ·
  Foundation entries rows N3, N4, N5, I2, I3 and F1 ·
  `src/server/account-policy.ts` · `src/server/database.ts:150-221` the connection and its
  transaction · `src/server/passwords.ts` · `src/server/app.ts` ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` ·
  `guidelines/coding-account-policy.md` · `guidelines/coding-password-hashing.md` ·
  `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/account-routes.ts`: a token and a password from the network
  without a session; token forms, a link of another kind, a blocked account, origin and body guards
- **Checks:** Start from the route case of a working link setting a password and the new password
  logging in. Then every combination of a good and bad link with a good and bad password, with the
  refusal Decision 4 gives, a link that still works where it was good, and no password work where it
  was bad (a full gate does not turn the bad-link answer into 429); a full gate leaves a good link
  working; a hash that fails answers 500 and spends nothing; a token of the other kind, used, expired,
  superseded, of a blocked account and stopped by a block before an unblock gets the one
  `invalid-link`; a block and a later link committed during hashing change nothing and answer
  `invalid-link`; the sessions of Decision 8's *Proved by*, with a session of a second account still
  working; a locked address logging in straight after a reset, and a refused set-password clearing
  nothing. The new route joins the refusals of `tests/transport.test.mjs` and the list at
  `tests/http.test.mjs:197`. Cases carry `invariant: password-reset-link`,
  `invariant: password-reset-ends-sessions`, `invariant: player-server-session`,
  `invariant: unblock-restores-no-link`, `invariant: account-attempt-limits`,
  `invariant: account-session-authorization`, `invariant: player-argon2-password-hash`,
  `invariant: account-mutation-request-guards` and `invariant: account-request-transport`; each is
  seen failing once, then passing, with `npm test -- tests/http.test.mjs` and
  `npm test -- tests/transport.test.mjs`. Also `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · Slice 5

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

### `.runs/task-cycles/reset-hasla/spec.md:157-184`

> ### Decision 4 — The order of the set-password route
>
> 1. The transport gate and the guards.
> 2. The fields: exactly three strings, else `invalid-request`.
> 3. The password rules, through a new `checkNewPassword`: `invalid-password` or `password-mismatch`,
>    with the sentences of registration.
> 4. The link: the token's form through `isLinkToken`, then the read `resetLinkWorks` of its digest;
>    either failing gets `invalid-link`.
> 5. Hashing through `hashPassword`, so through the gate (Decision 5).
> 6. The write transaction `resetPassword` (Decision 6): `invalid` gets `invalid-link`.
> 7. `clearEmailAttempts` (Decision 9), then 204, in the same turn as the commit.
>
> The password comes before the link. A request whose link and password are both bad gets the password
> refusal. Reason: with the link first, a short password would turn the route into exactly what
> row 13 rejected, an answer to anyone about whether a token works, without spending it and without
> changing anything. Pure checks first also matches registration, and nothing is lost: the page checks
> the same rules before it sends, so only a crafted request meets this order.
>
> Rejected: no check before hashing — a bad token would occupy a slot of the gate, which the task
> forbids; spending or reserving the link before hashing — a full gate or a failed hash would use it
> up, against rows 11 and 19; one transaction around the hashing — against D-112.
>
> Cost if wrong: only a crafted request sees the order, so changing it later changes no player's
> screen.
>
> Proved by: for each combination of a good and bad link with a good and bad password, the refusal
> above, a link that still works afterwards where the link was good, and no password work where the
> link was bad (a full gate does not change the bad-link answer into 429).

### `.runs/task-cycles/reset-hasla/spec.md:186-204`

> ### Decision 5 — The gate only, no attempt ticket
>
> The route takes no ticket of `AccountPolicy`. A ticket limits guesses, and a 256-bit token is not
> guessed. Password work here is already bounded by the working links: a bad token reaches no work,
> the gate admits two at a time, and the first commit spends the link, so one link costs a handful of
> hashes at most, and D-105 bounds links to 30 an hour. No decision gives a threshold for this route,
> and adding one would change D-102, D-103 and `account-attempt-limits` for no case the task names.
>
> Failure of hashing: `PasswordCapacityError` answers 429 `too-many-attempts` through `limited` (row
> 11), and the link keeps working. Any other failure, of hashing or of the database, is left to the
> application's error handler, which answers 500 without detail. Nothing was written, so the link keeps
> working and the page treats it as it treats no connection (Decision 11).
>
> Rejected: a new ticket per client address — a new limit nobody asked for; the login ticket keyed by
> the account's address — a request that is no login would take the place of logins and could lock
> them.
>
> Cost if wrong: someone holding several working links occupies the gate for a few seconds. They hold
> the mailbox anyway.

### `.runs/task-cycles/reset-hasla/spec.md:327-356`

> ### Decision 8 — The session a set-password request brought with it
>
> The route never touches `request.session`: no `regenerate`, no `destroy`, no field written. Its
> outcome then follows from the library, read in `node_modules/express-session/index.js`:
>
> - `hash` ignores the cookie, so a session loaded from a cookie whose data did not change is not
>   modified; `resave: false` makes `shouldSave` false, and `saveSession` is never called, so the upsert
>   that could bring a row back does not run. A session regenerated during the request behaves otherwise
>   (Decision 7), and this route regenerates nothing.
> - `shouldTouch` is true, so the end of the request calls `store.touch`, which reaches `renewSession`.
>   That is an `UPDATE` of an existing, unexpired row, and it changes nothing once the row is gone
>   (D-101, D-112).
> - With `rolling: true` the response sends the same cookie again. It names no session, so the next
>   request gets a fresh, unsaved session and 401, as after a block.
>
> A session of the same account therefore ends with all the others and nothing brings it back. A
> session of another account is neither used nor changed, as the confirmation route already says of a
> session sent along. A request with no cookie stores nothing, since `saveUninitialized` is false.
>
> Rejected: `request.session.destroy` for a session of the same account — it would need an await and a
> branch on whose session it is, for a row the transaction already removed; clearing the cookie — two
> `Set-Cookie` headers with `rolling: true` for a cookie that is already harmless.
>
> Cost if wrong: an upgrade of express-session that changes this end-of-request behaviour could revive
> a session. That is why this rests on a new environment fact (see *Foundation entries*).
>
> Proved by: a route case that sets a password while sending a valid session of the same account,
> another browser's session of it and a session of a second account: the first two authorize nothing
> afterwards, even though the first was renewed at the end of that very request, and the third still
> works.

### `.runs/task-cycles/reset-hasla/spec.md:358-386`

> ### Decision 9 — Clearing the address's history
>
> `AccountPolicy.clearEmailAttempts(email)` takes the normalized address that `resetPassword` returned.
> If the address has an entry, it empties `failures` and sets `lockedUntil` to none, keeps `reserved`,
> and frees the entry when nothing live remains, through the existing `forget`. If there is no entry,
> it creates none. No client-address entry changes (row 15).
>
> The entry object stays and only its fields change. A ticket holds that object, and its settlement
> calls `forget` on the key; a replaced entry would let an old ticket drop a live one, against D-103,
> and reservations would stop counting. So a login in progress at the reset settles once, as D-116
> says, on the same entry: `succeed` and `release` change nothing further, and `fail` adds one failure
> to the emptied history. That is a real wrong guess after the moment of the reset. The gate holds at
> most two such logins, so the clear cannot end in a lock by itself.
>
> Order: the clear comes after the commit, in the same turn. A failed write must clear nothing, because
> row 15 says a successful reset; and no await stands between them, so no login can be admitted against
> the old lock after the password changed. If the process stops between them, D-103's restart clears
> the history anyway.
>
> Rejected: deleting the entry — the fault above; clearing before the commit — a failed reset would
> lift a lock; waiting for logins in progress to finish — a wait in a route, for nothing a player sees.
>
> Cost if wrong: at worst one or two failures remain on the address after a reset, far below the lock.
>
> Proved by: policy cases with an explicit clock: a locked address admits a login after the clear; the
> client address's failures still count; a login in progress keeps its reservation, settles once and
> leaves the count of `inFlight` right; clearing an unknown address adds no key; a full table is not
> disturbed. A route case: a locked address logs in with the new password straight after a reset, and
> a refused set-password clears nothing.

### `.runs/task-cycles/reset-hasla/task.md:30-32`

> 5. Nowe hasło podlega zasadom D-98, a jego skrót powstaje tak jak przy zakładaniu konta (D-106, bramka D-103).
> 6. Odnośnik konta zablokowanego niczego nie zmienia, także po odblokowaniu konta (D-160).
> 7. Ustawienie nowego hasła w tej samej operacji usuwa wszystkie sesje konta i nikogo nie loguje, więc gracz loguje się nowym hasłem na formularzu (pytanie 5), a udany reset czyści historię nieudanych logowań i blokadę tego adresu e-mail i zostawia licznik na adres klienta (pytanie 6).

### `.runs/task-cycles/reset-hasla/task.md:136-136`

> - Jak trasa ustawienia hasła sprawdza odnośnik przed pracą nad hasłem i ponownie w transakcji zapisu, tak by zły token nie zajmował bramki D-103, a blokada albo nowszy odnośnik z czasu haszowania niczego nie zmieniły (D-112: “no transaction spans asynchronous hashing, mail sending or an HTTP response”; D-155, D-160).

### `.runs/task-cycles/reset-hasla/task.md:202-202`

> | 2 | Prośbę o odnośnik może wysłać odwiedzający bez sesji, a podany w niej adres wskazuje jedynie konto, na którego adres może wyjść odnośnik; sam odnośnik resetu, bez sesji, uprawnia do ustawienia nowego hasła swojego konta i do niczego innego; obie trasy podlegają zabezpieczeniom transportu, pochodzenia i wejścia. | decision | pytania 1 i 4 (A; Mariusz, 2026-10-30, pozycja D27: „dopisanie do reguł, że o reset może prosić osoba niezalogowana”; pozycja D30, propozycja 1: „bo uprawnia sam odnośnik”), *Not chosen* tam; propozycja refinera: „wskazuje jedynie konto, na którego adres może wyjść odnośnik”, „i do niczego innego” i zdanie o zabezpieczeniach; zmienia D-109 (co uprawnia do żądania): “an account identifier or email address supplied in a request grants no authority” i `account-session-authorization` (niezmiennik o tym samym): “an account identifier or email address supplied by the caller cannot authorize reading or changing another account or session or direct a message to another address” | czy trasy wymagają czegoś więcej niż zabezpieczeń transportu, pochodzenia i wejścia oraz czy sesja w przeglądarce zmienia wynik |

### `.runs/task-cycles/reset-hasla/task.md:211-215`

> | 11 | Brak połączenia albo pełna bramka haseł zostawia formularz, zdanie pod nim i ważny odnośnik. | decision | pytanie 4 (podstawa; Mariusz, 2026-10-30, pozycja D30, propozycja 6: „Brak połączenia albo „Za dużo prób. Spróbuj ponownie za kilka minut.” zostawiają formularz i ważny odnośnik.”, gdzie zdanie „Za dużo prób…” to odmowa pełnej bramki haseł z D-103, limitu pracy nad hasłami); propozycja refinera: „zdanie pod nim” | czy błąd połączenia albo przeciążenie zużywa odnośnik i czy gracz musi prosić o nowy |
> | 12 | Odnośnik resetu zużywa się dopiero razem z nowym hasłem. | decision | pytanie 4 (Mariusz, 2026-10-30, pozycja D30: „Odnośnik musi zużyć się dopiero razem z nowym hasłem.”); obok D-155 (ważność odnośników), które mówi tylko: “each works once” | czy odnośnik zużywa się przy otwarciu, przy wysłaniu formularza, czy przy zapisie hasła |
> | 13 | Strona nie sprawdza odnośnika resetu, zanim pokaże formularz, więc o nieważnym odnośniku gracz dowiaduje się po jego wysłaniu. | decision | pytanie 4 (A; Mariusz, 2026-10-30, pozycja D30: „A – strona nie sprawdza odnośnika przed pokazaniem formularza.”), *Not chosen* tam | czy dodać drugą trasę bez sesji, która mówi każdemu, czy token jest ważny, i stan „Sprawdzanie odnośnika…” |
> | 14 | Reset usuwa wszystkie sesje konta w tej samej operacji co zmiana hasła i nikogo nie loguje; gracz loguje się nowym hasłem na formularzu. | decision | pytanie 5 (A; Mariusz, 2026-10-30, pozycja D31: „Reset usuwa wszystkie sesje konta i nikogo nie loguje.”), *Not chosen* tam; propozycja refinera: „w tej samej operacji co zmiana hasła”; zmienia D-138 (jak trwa logowanie): “can invalidate it on logout or account blocking”, `player-server-session` (niezmiennik o sesji na serwerze) i wyliczenie w D-211 (co widzi gracz, gdy zapis nie znajdzie sesji): “an expiry or a block of the account” | czy sesje zostają, czy gracz wchodzi od razu do gry |
> | 15 | Udany reset czyści historię nieudanych logowań i blokadę tego adresu e-mail, a licznik na adres klienta zostaje. | decision | pytanie 6 (A; Mariusz, 2026-10-30, pozycja D32: „Tak, dla tego adresu e-mail, a licznik na adres klienta zostaje.”), *Not chosen* tam; propozycja refinera: „historię nieudanych logowań”; zmienia D-102 (limity prób): “a locked address remains locked even for correct credentials” i `account-attempt-limits` (niezmiennik tych limitów) | czy gracz po resecie dostaje przy pierwszym logowaniu „Za dużo prób. Spróbuj ponownie za kilka minut.” |

### `.runs/task-cycles/reset-hasla/task.md:219-219`

> | 19 | Odnośnik resetu ustawia nowe hasło tylko raz, tylko przed wygaśnięciem, tylko dopóki nie zapisano późniejszego odnośnika resetu tego konta, tylko gdy konto nie jest zablokowane i tylko gdy nie zatrzymała go blokada, także po odblokowaniu konta; odmowa niczego nie zmienia, a hasło nieprzyjęte i pełna bramka haseł odnośnika nie zużywają. | invariant | Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją” (wiersz 21-K13 drugiego pakietu, z uwagą „od refinera, poprawiony po uwadze krytyka”); cały wiersz to propozycja refinera, zbudowana na pozycji D30 („Odnośnik musi zużyć się dopiero razem z nowym hasłem.”, propozycja 6: „zostawiają formularz i ważny odnośnik”), D-155 (ważność odnośników), D-160 (odnośnik zablokowanego konta): “A link that a block stopped stays stopped after the account is unblocked” i D-137 (blokada konta): “restores no session and no link”; obok `email-confirmation-link`, który mówi tylko o odnośniku potwierdzenia, i `password-reset-verified-email/1`, który nie mówi o wygaśnięciu ani o bramce; zmienia `unblock-restores-no-link`: “An emailed link stopped when its account was blocked confirms nothing after the account is unblocked.”, który mówi tylko o potwierdzeniu | czy test odmów obejmuje odnośnik resetu, także zatrzymany blokadą, i w którym kroku odnośnik się zużywa |

## Foundation entries, each whole, by identifier and current range

- `foundations/decisions.md:1776-1790` D-98
- `foundations/decisions.md:1821-1833` D-101
- `foundations/decisions.md:1834-1848` D-102
- `foundations/decisions.md:1849-1863` D-103
- `foundations/decisions.md:1864-1876` D-104
- `foundations/decisions.md:1892-1904` D-106
- `foundations/decisions.md:1931-1943` D-109
- `foundations/decisions.md:1944-1958` D-110
- `foundations/decisions.md:1972-1984` D-113
- `foundations/decisions.md:1985-1999` D-112
- `foundations/decisions.md:2551-2565` D-137
- `foundations/decisions.md:2566-2578` D-138
- `foundations/decisions.md:2825-2839` D-155
- `foundations/decisions.md:2840-2854` D-156
- `foundations/decisions.md:2900-2912` D-160
- `foundations/invariants.md:638-647` player-argon2-password-hash
- `foundations/invariants.md:658-667` password-operation-gate
- `foundations/invariants.md:718-727` account-session-authorization
- `foundations/invariants.md:728-737` account-mutation-request-guards
- `foundations/invariants.md:738-747` account-request-transport
- `foundations/invariants.md:788-797` account-attempt-limits
- `foundations/invariants.md:858-867` blocked-account-access
- `foundations/invariants.md:868-877` player-server-session
- `foundations/invariants.md:898-907` unblock-restores-no-link
- `foundations/environment_facts.md:262-267` express-session-cookie-lifecycle
- `foundations/decisions.md:3974-3995` D-216
- `foundations/decisions.md:3996-4029` D-217
- `foundations/decisions.md:4030-4070` D-218
- `foundations/invariants.md:1048-1057` password-reset-link
- `foundations/invariants.md:1058-1067` password-reset-ends-sessions
- `foundations/environment_facts.md:358-363` express-session-end-of-request

## Guideline files, each whole

- `guidelines/coding.md`
- `guidelines/coding-http-application.md`
- `guidelines/coding-account-policy.md`
- `guidelines/coding-password-hashing.md`
- `guidelines/testing.md`

## Product files and method passages its *Read* names

- `src/server/account-policy.ts`
- `src/server/database.ts:150-221`
- `src/server/passwords.ts`
- `src/server/app.ts`

## Return

Write your report to its path as the method gives. Return its first line and the path.
