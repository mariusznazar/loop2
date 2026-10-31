# Handoff — reviewer of Slice 1, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You review one slice of a plan, a fresh agent that
did not make it. Your questions go to the orchestrator, never to the human.

- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`). Read it
  whole; read a file it names when the step that names it comes.
- What is reviewed: Slice 1, the range `95de83b..25345f1`. The range also holds the plan's *Foundation entries* (commits `d6bbc02`, `e8755e8`), judged here; their writer's report is `.runs/task-cycles/reset-hasla/reports/06-foundation-report.md`.
- The executor's report, claims to verify: `.runs/task-cycles/reset-hasla/reports/07-slice1-report.md`
- Report path: `.runs/task-cycles/reset-hasla/reports/08-slice1-review-report.md`; its first line is
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

### Slice 1 — The reset operations of the account database

- **Goal:** `AccountDatabase` holds `resetLinkWorks(tokenDigest)` and `resetPassword(tokenDigest,
  passwordHash)`, with the exported type `ResetOutcome`, both on one private read of a working link:
  purpose `password-reset`, unspent, `expires_at` after now, account not blocked. `resetPassword` is
  one write transaction: with no working link it changes nothing and returns `invalid`; otherwise it
  replaces the password hash, deletes every session of the account, spends every unspent reset link
  of the account and returns the account's normalized address. Confirmation links stay untouched and
  no schema step is added.
- **Change:** `src/server/database.ts` · `tests/account-storage.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:46-73` Constraints ·
  `.runs/task-cycles/reset-hasla/spec.md:206-238` Decision 6 — The database's two operations ·
  `.runs/task-cycles/reset-hasla/task.md:31-32` To do 6 and 7 ·
  `.runs/task-cycles/reset-hasla/task.md:212-212` Settlements to record, row 12 ·
  `.runs/task-cycles/reset-hasla/task.md:214-214` Settlements to record, row 14 ·
  `.runs/task-cycles/reset-hasla/task.md:219-219` Settlements to record, row 19 ·
  `foundations/decisions.md:1985-1996` D-112 · `foundations/decisions.md:1998-2011` D-114 ·
  `foundations/decisions.md:2549-2562` D-137 · `foundations/decisions.md:2564-2575` D-138 ·
  `foundations/decisions.md:2821-2834` D-155 · `foundations/decisions.md:2836-2849` D-156 ·
  `foundations/decisions.md:2896-2907` D-160 · `foundations/decisions.md:2782-2793` D-152 ·
  `foundations/invariants.md:868-876` player-server-session ·
  `foundations/invariants.md:888-896` email-confirmation-link ·
  `foundations/invariants.md:898-906` unblock-restores-no-link ·
  `foundations/invariants.md:768-776` account-database-schema ·
  `foundations/environment_facts.md:250-254` node-sqlite-database ·
  `foundations/environment_facts.md:316-320` sqlite-wal-concurrency ·
  `foundations/glossary.md:157-161` blocked account ·
  Foundation entries rows I1, I2 and I3 ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/database.ts`: a token digest from the network reaches the
  reset operations; a block, a later link and expiry have to be read again in the write transaction
- **Checks:** Start from a storage case in which a working reset link changes password, sessions and
  links together, failing at its assertion against an empty `resetPassword`. Then the cases of
  Decision 6's *Proved by*, on real SQLite, each refusal changing nothing: a block committed through
  a second connection and a later link recorded between `resetLinkWorks` and `resetPassword`, a link
  stopped by a block and an unblock after it, expiry at the exact boundary, a confirmation link, an
  unknown digest. Cases carry `invariant: password-reset-link`,
  `invariant: password-reset-verified-email`, `invariant: password-reset-ends-sessions`,
  `invariant: player-server-session` and `invariant: unblock-restores-no-link`; each is seen failing
  once, then passing, with `npm test -- tests/account-storage.test.mjs`. Also `npm run typecheck`
  and `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** D-112 · D-138 · D-155 · I1 · I2 · I3

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

### `.runs/task-cycles/reset-hasla/spec.md:206-238`

> ### Decision 6 — The database's two operations
>
> Both in `AccountDatabase`, both on one private read, so the check before hashing and the check in the
> transaction cannot drift apart. The private read takes a token digest and the time, and returns the
> link's account when the link has the purpose `password-reset`, is not spent, has `expires_at` after
> now (equal to now is expired, as for sessions and confirmation) and its account is not blocked.
>
> - `resetLinkWorks(tokenDigest): boolean` — the read alone, no transaction.
> - `resetPassword(tokenDigest, passwordHash): ResetOutcome` — one write transaction, with
>   `ResetOutcome` being `{ outcome: "reset"; email: string } | { outcome: "invalid" }`. It runs the
>   read again and returns `invalid`, having changed nothing, when no link works. Otherwise it replaces
>   the account's password hash, deletes every session of the account and marks every unspent reset
>   link of the account as spent, and returns the account's normalized address.
>
> `BEGIN IMMEDIATE` holds the write lock from the start, so a block through the operator's connection
> either comes first and is seen, or waits and then finds the password changed. A later link recorded
> during hashing spent this one (D-155), a block spent it too (D-137), and an hour passing during
> hashing fails the time check: each answers `invalid-link` and the finished hash is dropped.
>
> A token of the other kind fails on purpose in both directions: `confirmEmailAddress` already reads
> only `email-confirmation`.
>
> Rejected: reusing `issueLink`'s shape with an outcome per reason — one refusal is all the route may
> give, so reasons have nowhere to go; a column for the password's generation — a schema step that
> Decision 7 does not need.
>
> Cost if wrong: the row 19 invariant fails, which the storage tests of Decision 6 are there to catch.
>
> Proved by: `tests/account-storage.test.mjs` cases on real SQLite for each refusal, each changing
> nothing, including a block committed through a second connection between the read and the
> transaction, a later link recorded between them, a link stopped by a block and an unblock after it,
> expiry at the exact boundary, a confirmation link and an unknown digest; and one success in which
> password, sessions and links change together.

### `.runs/task-cycles/reset-hasla/task.md:31-32`

> 6. Odnośnik konta zablokowanego niczego nie zmienia, także po odblokowaniu konta (D-160).
> 7. Ustawienie nowego hasła w tej samej operacji usuwa wszystkie sesje konta i nikogo nie loguje, więc gracz loguje się nowym hasłem na formularzu (pytanie 5), a udany reset czyści historię nieudanych logowań i blokadę tego adresu e-mail i zostawia licznik na adres klienta (pytanie 6).

### `.runs/task-cycles/reset-hasla/task.md:212-212`

> | 12 | Odnośnik resetu zużywa się dopiero razem z nowym hasłem. | decision | pytanie 4 (Mariusz, 2026-10-30, pozycja D30: „Odnośnik musi zużyć się dopiero razem z nowym hasłem.”); obok D-155 (ważność odnośników), które mówi tylko: “each works once” | czy odnośnik zużywa się przy otwarciu, przy wysłaniu formularza, czy przy zapisie hasła |

### `.runs/task-cycles/reset-hasla/task.md:214-214`

> | 14 | Reset usuwa wszystkie sesje konta w tej samej operacji co zmiana hasła i nikogo nie loguje; gracz loguje się nowym hasłem na formularzu. | decision | pytanie 5 (A; Mariusz, 2026-10-30, pozycja D31: „Reset usuwa wszystkie sesje konta i nikogo nie loguje.”), *Not chosen* tam; propozycja refinera: „w tej samej operacji co zmiana hasła”; zmienia D-138 (jak trwa logowanie): “can invalidate it on logout or account blocking”, `player-server-session` (niezmiennik o sesji na serwerze) i wyliczenie w D-211 (co widzi gracz, gdy zapis nie znajdzie sesji): “an expiry or a block of the account” | czy sesje zostają, czy gracz wchodzi od razu do gry |

### `.runs/task-cycles/reset-hasla/task.md:219-219`

> | 19 | Odnośnik resetu ustawia nowe hasło tylko raz, tylko przed wygaśnięciem, tylko dopóki nie zapisano późniejszego odnośnika resetu tego konta, tylko gdy konto nie jest zablokowane i tylko gdy nie zatrzymała go blokada, także po odblokowaniu konta; odmowa niczego nie zmienia, a hasło nieprzyjęte i pełna bramka haseł odnośnika nie zużywają. | invariant | Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją” (wiersz 21-K13 drugiego pakietu, z uwagą „od refinera, poprawiony po uwadze krytyka”); cały wiersz to propozycja refinera, zbudowana na pozycji D30 („Odnośnik musi zużyć się dopiero razem z nowym hasłem.”, propozycja 6: „zostawiają formularz i ważny odnośnik”), D-155 (ważność odnośników), D-160 (odnośnik zablokowanego konta): “A link that a block stopped stays stopped after the account is unblocked” i D-137 (blokada konta): “restores no session and no link”; obok `email-confirmation-link`, który mówi tylko o odnośniku potwierdzenia, i `password-reset-verified-email/1`, który nie mówi o wygaśnięciu ani o bramce; zmienia `unblock-restores-no-link`: “An emailed link stopped when its account was blocked confirms nothing after the account is unblocked.”, który mówi tylko o potwierdzeniu | czy test odmów obejmuje odnośnik resetu, także zatrzymany blokadą, i w którym kroku odnośnik się zużywa |

## Foundation entries, each whole, by identifier and current range

- `foundations/decisions.md:1985-1999` D-112
- `foundations/decisions.md:2000-2014` D-114
- `foundations/decisions.md:2551-2565` D-137
- `foundations/decisions.md:2566-2578` D-138
- `foundations/decisions.md:2825-2839` D-155
- `foundations/decisions.md:2840-2854` D-156
- `foundations/decisions.md:2900-2912` D-160
- `foundations/decisions.md:2784-2796` D-152
- `foundations/invariants.md:868-877` player-server-session
- `foundations/invariants.md:888-897` email-confirmation-link
- `foundations/invariants.md:898-907` unblock-restores-no-link
- `foundations/invariants.md:768-777` account-database-schema
- `foundations/environment_facts.md:250-255` node-sqlite-database
- `foundations/environment_facts.md:316-321` sqlite-wal-concurrency
- `foundations/glossary.md:157-162` blocked account
- `foundations/invariants.md:1038-1047` password-reset-verified-email
- `foundations/invariants.md:1048-1057` password-reset-link
- `foundations/invariants.md:1058-1067` password-reset-ends-sessions

## Guideline files, each whole

- `guidelines/coding.md`
- `guidelines/coding-database-access.md`
- `guidelines/testing.md`

## Product files and method passages its *Read* names

- none

## Return

Write your report to its path as the method gives. Return its first line and the path.
