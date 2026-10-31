# Handoff — executor of Slice 4, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You make one slice of a plan, a fresh agent. Your
questions go to the orchestrator, never to the human; you return at your slice's end.

- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole;
  read a file it names when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/reset-hasla/reports/19-slice4-report.md`
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
- Quality tools stand in `.runs/quality-venv`, `node_modules` is installed, Docker runs.
- Commit on the task branch in the repository's style (English, `feat:`/`test:`/`docs:` with the
  repository's emoji form, explicit paths with `git add <path>`, never `git add -A`). No push.
- Do not run the product's gate (`npm test` with no argument); it is the orchestrator's. `npm test --
  <one file>` is the focused check the section names.
- A check you report carries its command and exit code. Your report keeps **Searches not found or
  unclear** (or `none`), every reach, the own-work check and, for an invariant's test, its failing
  run and its passing run.

## Your section of the plan (`.runs/task-cycles/reset-hasla/plan.md`), word for word

### Slice 4 — The reset message and the confirmation message's new paragraph

- **Goal:** `composePasswordResetMessage(address, link)` gives the message of To do 8, and
  `composeConfirmationMessage` gains row 17's paragraph before its last one. The texts stay in the
  mail file; no way of reaching Outsider changes, so D-163 asks for nothing beyond H1.
- **Change:** `src/server/account-mail.ts` · `tests/account-mail.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:488-493` Decision 14 — The messages ·
  `.runs/task-cycles/reset-hasla/task.md:33-35` To do 8, 9 and 10 ·
  `.runs/task-cycles/reset-hasla/task.md:216-218` Settlements to record, rows 16, 17 and 18 ·
  `foundations/decisions.md:2866-2879` D-158 · `foundations/decisions.md:2922-2935` D-162 ·
  `foundations/decisions.md:2937-2950` D-163 · `foundations/decisions.md:2795-2806` D-153 ·
  `foundations/decisions.md:2808-2819` D-154 ·
  `foundations/invariants.md:918-926` account-email-via-outsider ·
  `foundations/invariants.md:928-936` account-email-nodemailer-starttls ·
  `foundations/environment_facts.md:322-326` mikrus-outsider-mail ·
  `foundations/environment_facts.md:328-332` nodemailer-require-tls ·
  Foundation entries row N6 ·
  `guidelines/coding.md` · `guidelines/coding-mail-sending.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/account-mail.ts`: a player's address and a link enter a
  message
- **Checks:** Start from the existing case „the submitted message has one recipient, the fixed sender
  and subject and a text body with the link on its own line” for the reset message, on the real loopback SMTP server, failing at
  its assertion against an empty `composePasswordResetMessage`. The confirmation message's expected
  body changes because of row 17, named as `guidelines/testing.md`, *Changing an existing test*,
  asks. The case that nothing the mailer writes to the console holds the password, the login, the
  token or the link reaches the reset message too.
  `npm test -- tests/account-mail.test.mjs`, `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** D-153 · D-154 · D-158 · N6

## Passages of the task and spec its *Read* names, word for word

### `.runs/task-cycles/reset-hasla/spec.md:488-493`

> ### Decision 14 — The messages
>
> `account-mail.ts` gains `composePasswordResetMessage(address, link)` with the subject and body of
> question 7, and `composeConfirmationMessage` gains row 17's paragraph before its last one; the texts
> stay in that file (D-162). `account-policy.ts` gains `passwordResetLinkLifetime`, one hour (D-155).
> The way messages reach Outsider does not change.

### `.runs/task-cycles/reset-hasla/task.md:33-35`

> 8. Wiadomość resetu ma nadawcę i formę wiadomości potwierdzającej (`loop2@mariusznazar.com`, nazwa „loop2”, zwykły tekst bez HTML, te same ustawienia poczty i to samo hasło SMTP), temat „Ustaw nowe hasło w loop2” i treść: „Ktoś — zapewne Ty — poprosił o ustawienie nowego hasła do konta w loop2 na tym adresie e-mail. Aby je ustawić, otwórz odnośnik:” / <odnośnik> / „Odnośnik jest ważny przez godzinę i działa raz.” / „Jeśli to nie Ty, zignoruj tę wiadomość. Hasło się nie zmieni.” (pytanie 7).
> 9. Wiadomość potwierdzająca dostaje przed „Jeśli to nie Ty, zignoruj tę wiadomość.”, osobnym akapitem, zdanie „Potwierdzony adres pozwala samodzielnie zresetować zapomniane hasło.”, a D-158 i oczekiwania testów zmieniają się razem z nią (pytanie 8).
> 10. Po zmianie hasła gracz nie dostaje wiadomości o tej zmianie (pytanie 9).

### `.runs/task-cycles/reset-hasla/task.md:216-218`

> | 16 | Wiadomość resetu przychodzi od nadawcy i w formie wiadomości potwierdzającej, z tematem „Ustaw nowe hasło w loop2” i treścią z pytania 7. | decision | pytanie 7 (tak; Mariusz, 2026-10-30, pozycja D33); obok D-158, która mówi tylko o wiadomości potwierdzającej | temat i treść wiadomości, którą gracz czyta, gdy bezpieczeństwo konta jest najważniejsze |
> | 17 | Wiadomość potwierdzająca ma przed „Jeśli to nie Ty, zignoruj tę wiadomość.” zdanie „Potwierdzony adres pozwala samodzielnie zresetować zapomniane hasło.” | decision | pytanie 8 (A; Mariusz, 2026-10-30, pozycja D34: „Czy dopisać do wiadomości potwierdzającej zdanie „Potwierdzony adres pozwala samodzielnie zresetować zapomniane hasło.”?”), *Not chosen* tam; propozycja refinera: miejsce przed „Jeśli to nie Ty, zignoruj tę wiadomość.” i osobny akapit; zmienia D-158 (treść wiadomości potwierdzającej), w tym jego „three paragraphs” i *Rejected*: “promises a password reset the game does not yet offer.” | czy tekst wiadomości potwierdzającej zmienia się z resetem i w którym miejscu |
> | 18 | Po zmianie hasła gracz nie dostaje wiadomości o tej zmianie, z przyjętym odstępstwem od OWASP. | decision | pytanie 9 (A; Mariusz, 2026-10-30, pozycja D35), *Not chosen* tam; obok D-161, który liczy wiadomości po wierszach odnośników | czy za zaleceniem OWASP dodać trzeci rodzaj wiadomości i zmienić liczenie pułapów |

## Foundation entries, each whole, by identifier and current range

- `foundations/decisions.md:2870-2884` D-158
- `foundations/decisions.md:2926-2940` D-162
- `foundations/decisions.md:2941-2955` D-163
- `foundations/decisions.md:2797-2811` D-153
- `foundations/decisions.md:2812-2824` D-154
- `foundations/invariants.md:918-927` account-email-via-outsider
- `foundations/invariants.md:928-937` account-email-nodemailer-starttls
- `foundations/environment_facts.md:322-327` mikrus-outsider-mail
- `foundations/environment_facts.md:328-333` nodemailer-require-tls
- `foundations/decisions.md:4071-4098` D-219

## Guideline files, each whole

- `guidelines/coding.md`
- `guidelines/coding-mail-sending.md`
- `guidelines/testing.md`

## Product files and method passages its *Read* names

- none

## Return

Write your report to its path as the method gives. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
