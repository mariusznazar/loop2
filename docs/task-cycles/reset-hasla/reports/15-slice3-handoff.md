# Handoff — executor of Slice 3, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You make one slice of a plan, a fresh agent. Your
questions go to the orchestrator, never to the human; you return at your slice's end.

- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole;
  read a file it names when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/reset-hasla/reports/15-slice3-report.md`
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

### Slice 3 — The account policy of a reset

- **Goal:** `checkNewPassword` holds the password rules alone and `checkRegistration` is built on it
  with the same results; `passwordResetLinkLifetime` is one hour; `AccountPolicy.clearEmailAttempts`
  empties an address's failures and lock in the entry object that exists, keeps `reserved`, frees the
  entry through `forget` when nothing live remains, creates no entry and changes no client-address
  entry. Comments that speak of "a registration or a resend" follow.
- **Change:** `src/server/account-policy.ts` · `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:161-162` Decision 4, step 3 ·
  `.runs/task-cycles/reset-hasla/spec.md:358-386` Decision 9 — Clearing the address's history ·
  `.runs/task-cycles/reset-hasla/spec.md:492-492` Decision 14, the link's lifetime ·
  `.runs/task-cycles/reset-hasla/task.md:30-30` To do 5 ·
  `.runs/task-cycles/reset-hasla/task.md:32-32` To do 7 ·
  `.runs/task-cycles/reset-hasla/task.md:207-207` Settlements to record, row 7 ·
  `.runs/task-cycles/reset-hasla/task.md:215-215` Settlements to record, row 15 ·
  `foundations/decisions.md:1776-1789` D-98 · `foundations/decisions.md:1834-1847` D-102 ·
  `foundations/decisions.md:1849-1862` D-103 · `foundations/decisions.md:2028-2041` D-116 ·
  `foundations/decisions.md:2821-2834` D-155 ·
  `foundations/invariants.md:788-796` account-attempt-limits ·
  `foundations/invariants.md:798-806` account-attempt-tracking ·
  `guidelines/coding.md` · `guidelines/coding-account-policy.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/account-policy.ts`: what lifts a login lock
- **Checks:** Start from a policy case with an explicit clock: a locked address admits a login after
  `clearEmailAttempts`. Then the cases of Decision 9's *Proved by* that need no route: the client
  address's failures still count; a login in progress keeps its reservation, settles once and leaves
  `inFlight` right; clearing an unknown address adds no key; a full table is not disturbed. Cases
  carry `invariant: account-attempt-limits` and, for the table, `invariant: account-attempt-tracking`;
  each is seen failing once, then passing, with `npm test -- tests/http.test.mjs`. Also
  `npm run typecheck` and `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 2

## Passages of the task and spec its *Read* names, word for word

### `.runs/task-cycles/reset-hasla/spec.md:161-162`

> 3. The password rules, through a new `checkNewPassword`: `invalid-password` or `password-mismatch`,
>    with the sentences of registration.

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

### `.runs/task-cycles/reset-hasla/spec.md:492-492`

> stay in that file (D-162). `account-policy.ts` gains `passwordResetLinkLifetime`, one hour (D-155).

### `.runs/task-cycles/reset-hasla/task.md:30-30`

> 5. Nowe hasło podlega zasadom D-98, a jego skrót powstaje tak jak przy zakładaniu konta (D-106, bramka D-103).

### `.runs/task-cycles/reset-hasla/task.md:32-32`

> 7. Ustawienie nowego hasła w tej samej operacji usuwa wszystkie sesje konta i nikogo nie loguje, więc gracz loguje się nowym hasłem na formularzu (pytanie 5), a udany reset czyści historię nieudanych logowań i blokadę tego adresu e-mail i zostawia licznik na adres klienta (pytanie 6).

### `.runs/task-cycles/reset-hasla/task.md:207-207`

> | 7 | Formularz „Ustaw nowe hasło” ma pola „Nowe hasło” i „Powtórz hasło” z regułami i zdaniami z zakładania konta, bez porównywania ze starym hasłem. | decision | pytanie 4 (podstawa; Mariusz, 2026-10-30, pozycja D30, propozycja 2: „Pola to „Nowe hasło” i „Powtórz hasło”, z regułami z zakładania konta, bez porównywania ze starym hasłem.”); propozycja refinera: „i zdaniami”; zmienia D-98 (jakie hasła gra przyjmuje), które mówi o powtórzonym haśle tylko przy zakładaniu konta: “Registration's repeated password equals the password exactly” | czy nowe hasło ma inne reguły albo napisy niż przy zakładaniu konta i czy porównywać je ze starym |

### `.runs/task-cycles/reset-hasla/task.md:215-215`

> | 15 | Udany reset czyści historię nieudanych logowań i blokadę tego adresu e-mail, a licznik na adres klienta zostaje. | decision | pytanie 6 (A; Mariusz, 2026-10-30, pozycja D32: „Tak, dla tego adresu e-mail, a licznik na adres klienta zostaje.”), *Not chosen* tam; propozycja refinera: „historię nieudanych logowań”; zmienia D-102 (limity prób): “a locked address remains locked even for correct credentials” i `account-attempt-limits` (niezmiennik tych limitów) | czy gracz po resecie dostaje przy pierwszym logowaniu „Za dużo prób. Spróbuj ponownie za kilka minut.” |

## Foundation entries, each whole, by identifier and current range

- `foundations/decisions.md:1776-1790` D-98
- `foundations/decisions.md:1834-1848` D-102
- `foundations/decisions.md:1849-1863` D-103
- `foundations/decisions.md:2030-2044` D-116
- `foundations/decisions.md:2825-2839` D-155
- `foundations/invariants.md:788-797` account-attempt-limits
- `foundations/invariants.md:798-807` account-attempt-tracking

## Guideline files, each whole

- `guidelines/coding.md`
- `guidelines/coding-account-policy.md`
- `guidelines/testing.md`

## Product files and method passages its *Read* names

- none

## Return

Write your report to its path as the method gives. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
