# Handoff — executor of Slice 8, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You make one slice of a plan, a fresh agent. Your
questions go to the orchestrator, never to the human; you return at your slice's end.

- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole;
  read a file it names when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/reset-hasla/reports/28-slice8-report.md`
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

### Slice 8 — The third state of the account screen

- **Goal:** Under „Zaloguj się” stands the button of row 1, which opens the form of To do 1 in place of
  both forms; „Wróć do logowania” returns to them. The screen's state is which sections `element`
  holds, and `reset` from outside always returns to the two forms. `accountForm` takes the button's
  text apart from the title and is exported, `registrationProblems` is split so that each rule can be
  used alone with the same result for registration, `send` serves all three forms, and the request
  form joins `forms`, so the two new buttons lock with the rest. A badly written address stands under
  the field and nothing is sent; after 204 the field is empty and row 3's sentence stands in the new
  `createFormNote` of `controls/text-field.ts`, in `text-secondary` with `role="status"`; a failure
  stands as the form's warning and keeps the field. Stylesheet rules read existing tokens only.
- **Change:** `src/browser/view/account-screen.ts` · `src/browser/view/controls/text-field.ts` ·
  `src/browser/styles.css` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:453-480` Decision 12 — The third state of the
  account screen · `.runs/task-cycles/reset-hasla/spec.md:495-500` Decision 15 — Kitchen-sink and
  style · `.runs/task-cycles/reset-hasla/spec.md:585-594` Left to the maker ·
  `.runs/task-cycles/reset-hasla/task.md:17-17` To do 1 ·
  `.runs/task-cycles/reset-hasla/task.md:19-19` To do 3 ·
  `.runs/task-cycles/reset-hasla/task.md:201-201` Settlements to record, row 1 ·
  `.runs/task-cycles/reset-hasla/task.md:203-203` Settlements to record, row 3 ·
  `foundations/decisions.md:769-782` D-36 · `foundations/decisions.md:799-812` D-38 ·
  `foundations/decisions.md:814-827` D-39 · `foundations/decisions.md:829-842` D-40 ·
  `foundations/decisions.md:859-872` D-42 · `foundations/decisions.md:874-887` D-43 ·
  `foundations/decisions.md:889-902` D-44 · `foundations/decisions.md:934-947` D-47 ·
  `foundations/decisions.md:1570-1581` D-87 · `foundations/decisions.md:1583-1594` D-88 ·
  `foundations/decisions.md:1746-1759` D-96 · `foundations/decisions.md:1791-1804` D-99 ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  Foundation entries row N1 ·
  `src/browser/AGENTS.md` · `src/browser/view/controls/button.ts` ·
  `src/browser/account-api.ts:95-120` the client's calls ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** Start from a page case in `tests/view/account-screen.test.mjs`: the button opens the
  form in place of both forms. **How the slice shows its states:** one page case on the hand-made
  document model for each state — the form with its empty field, waiting (the field and all the
  screen's buttons locked, the waiting text of row 1), a bad address under the field with nothing
  sent, the sentence of row 3 under the form with the field empty and the form staying, a refusal and
  a lost connection as the warning with the field kept and focus back where the player sent it from,
  and „Wróć do logowania” and `reset` clearing all of it. The cases of registration and sign-in in
  that file stay as they are and protect the split functions. The rendered appearance is not seen in
  this slice: the forms need a configured server, so their samples are seen on the kitchen-sink page
  in Slice 10,
  the layout of the one form in place of two only on the human's visit in H1, and the report marks
  the screenshot unchecked with that reason.
  `npm test -- tests/view/account-screen.test.mjs`,
  `npm test -- tests/invariants/test_browser_view_token_values.py`,
  `npm test -- tests/invariants/test_browser_view_focus_outline.py`, `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 7

## Passages of the task and spec its *Read* names, word for word

### `.runs/task-cycles/reset-hasla/spec.md:453-480`

> ### Decision 12 — The third state of the account screen
>
> Within `createAccountScreen`, whose client gains `requestPasswordReset`:
>
> - `accountForm` takes the button's text apart from the title, since „Nie pamiętam hasła” is sent by
>   „Wyślij odnośnik” and „Ustaw nowe hasło” by „Ustaw hasło”, and is exported for `password-reset.ts`.
> - `registrationProblems` is split so that the address's rule and the two-password rule can each be
>   used alone, the messages staying in `PROBLEM_MESSAGES`, with the same result for registration.
> - The request form joins the list `forms`, so `lock`, `clearMessages` and `reset` cover it, and the
>   two buttons „Nie pamiętam hasła” and „Wróć do logowania” lock with the rest.
> - `send` becomes generic over the answer, with what to do on success passed in, so that one waiting
>   and focus path serves all three forms.
> - The state is which sections `element` holds. Each of the two buttons runs `reset`, which empties
>   every field and removes every message, then swaps the sections and moves focus to the address
>   field of the form it opened. `reset` from outside always returns to the two forms.
> - Sending: the address's rule first, with its sentence under the field and nothing sent (row 3). On
>   204 the field is emptied, the sentence of row 3 stands in the form's note under the form, and the
>   form and „Wróć do logowania” stay. A failure stands as the form's warning and keeps the field.
> - `createFormNote` in `controls/text-field.ts`, beside `createFormWarning`, gives the sentence in
>   `text-secondary` with `role="status"`. The kitchen-sink page imports it from there, as it does the
>   warning. D-44's sentence about refusals does not cover it, which is why it has its own control.
>
> Rejected: a second screen module for the request — it would duplicate lock, focus and reset for one
> field; reusing `createFormWarning` with a changed colour — the warning role carries a meaning this
> sentence does not have (D-39).
>
> Cost if wrong: the changes to `accountForm`, `send` and `registrationProblems` touch two working
> forms; the existing cases of `tests/view/account-screen.test.mjs` are what protect them.

### `.runs/task-cycles/reset-hasla/spec.md:495-500`

> ### Decision 15 — Kitchen-sink and style
>
> `formSample` in `kitchen-sink.ts` gains the two new forms waiting and with a refusal, and the request
> form with its sentence (To do 11). Stylesheet rules of `.form-note` and of the one-form layouts use
> existing tokens. `.confirmation-notice` carries both notices of the reset, so no new rule is needed
> for them.

### `.runs/task-cycles/reset-hasla/spec.md:585-594`

> ## Left to the maker
>
> - The division into slices, and the names of private helpers.
> - The wording of the fixed log lines, as long as none holds an address, token or link.
> - Where „Nie pamiętam hasła”, „Wróć do logowania” and „Anuluj” stand within their sections, and the
>   stylesheet of the one-form states, within `guidelines/styleguide-browser-view.md`; sentences under a
>   form stay under it. The result is looked at in a browser (D-87).
> - How tests are distributed among the existing files, and whether page cases get a file of their own.
>   Refused cases carry their invariant marks and are seen failing once (*Trust boundaries*).
> - Updating comments that say "both sending routes", "a registration or a resend" and the like.

### `.runs/task-cycles/reset-hasla/task.md:17-17`

> 1. Pod formularzem „Zaloguj się” stoi przycisk „Nie pamiętam hasła”, a po jego kliknięciu w miejscu obu formularzy stoi formularz „Nie pamiętam hasła” z pustym polem „Adres e-mail”, przyciskiem „Wyślij odnośnik” (w czasie oczekiwania wyłączony, z napisem „Wysyłanie…”) i przyciskiem „Wróć do logowania”; prośbę wysyła odwiedzający bez sesji, a D-109 dostaje to uprawnienie (pytanie 1).

### `.runs/task-cycles/reset-hasla/task.md:19-19`

> 3. Po prośbie z adresem zapisanym poprawnie gracz widzi zawsze to samo zdanie w `text-secondary`: „Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.”, stojące pod formularzem, tam, gdzie stoją zdania odmowy, pole adresu jest puste, a formularz i „Wróć do logowania” zostają; odpowiedź nie czeka na serwer poczty, porażkę wysyłki widać tylko w logu serwera, a prośba, na czas, gdy konta ma tylko właściciel, nie ma własnego limitu na adres klienta, do rewizji przed podaniem adresu gry innym graczom, jeśli nadużycia staną się realne (pytania 2, 3 i 13). Adres zapisany błędnie, czyli bez jednego „@” z tekstem po obu stronach, dostaje pod polem zdanie „Podaj adres e-mail w postaci nazwa@domena.” i nic nie wychodzi; ten warunek stoi w formularzu i na serwerze (pytanie 15).

### `.runs/task-cycles/reset-hasla/task.md:201-201`

> | 1 | Pod formularzem „Zaloguj się” stoi przycisk „Nie pamiętam hasła”, po którego kliknięciu w miejscu obu formularzy stoi formularz „Nie pamiętam hasła” z pustym polem „Adres e-mail”, przyciskiem „Wyślij odnośnik” (czekając: „Wysyłanie…”) i przyciskiem „Wróć do logowania”. | decision | pytanie 1 (A; Mariusz, 2026-10-30, pozycja D27: „Pod „Zaloguj się” przycisk „Nie pamiętam hasła”, który w miejscu formularzy pokazuje pole „Adres e-mail” oraz „Wyślij odnośnik” i „Wróć do logowania”.”), *Not chosen* tam; propozycja refinera: tytuł formularza „Nie pamiętam hasła”, „pustym” i „(czekając: „Wysyłanie…”)”; zmienia D-96 (co widzi gracz przed zalogowaniem): “A signed-out visitor sees the „Zaloguj się” form […] and the „Załóż konto” form […]” i D-44 (wspólne kontrolki i napisy oczekiwania): “the button that sends a form then reads „Logowanie…” or „Zakładanie konta…” for the corresponding form” | gdzie stoi prośba, czy ekran dostaje trzeci stan i jakie ma napisy |

### `.runs/task-cycles/reset-hasla/task.md:203-203`

> | 3 | Każdy poprawnie zapisany adres dostaje w odpowiedzi na prośbę to samo zdanie w `text-secondary`: „Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.”, stojące pod formularzem, który zostaje z pustym polem adresu i z „Wróć do logowania”, a odpowiedź nie czeka na serwer poczty, więc ani jej treść, ani czas nie mówią, co się z prośbą stało, natomiast adres zapisany błędnie dostaje pod polem „Podaj adres e-mail w postaci nazwa@domena.” i nic nie wychodzi. | decision | pytanie 2 (A; Mariusz, 2026-10-30, pozycja D28: „zawsze to samo zdanie, bez czekania na serwer poczty”), *Not chosen* tam; pytanie 13 (A; pozycja 21-Q12: „pod formularzem, pole adresu puste, formularz i „Wróć do logowania” zostają”) i pytanie 15 (A; pozycja 21-Q14: „pod polem zdanie, które daje dziś „Załóż konto”: „Podaj adres e-mail w postaci nazwa@domena.”, i nic nie wychodzi”), *Not chosen* tam, oba tą samą odpowiedzią, która przyjęła ten wiersz, i oba dopisane do jego pokazanego brzmienia; propozycja refinera: rola `text-secondary` (kolor tekstu pomocniczego), „ani jej treść, ani czas nie mówią, co się z prośbą stało” i odczytanie D-105 (pułapy wysyłki): “Above either limit no message is sent and the player is told to try later” — końcówka zdania jest tym „try later”, co ten wiersz zmienia w D-105; obok D-44 (wspólne kontrolki): “A form's server refusal and loss of connection appear as one sentence below the form in `warning`”, co nie obejmuje tego zdania | czy pokazać prawdę o wyniku jak przy „Wyślij ponownie” (D-157, odpowiedź przycisku w nagłówku), czy odpowiedź czeka do 10 sekund na serwer poczty, gdzie stoi zdanie i co dostaje adres zapisany błędnie |

## Foundation entries, each whole, by identifier and current range

- `foundations/decisions.md:769-783` D-36
- `foundations/decisions.md:799-813` D-38
- `foundations/decisions.md:814-828` D-39
- `foundations/decisions.md:829-843` D-40
- `foundations/decisions.md:859-873` D-42
- `foundations/decisions.md:874-888` D-43
- `foundations/decisions.md:889-903` D-44
- `foundations/decisions.md:934-948` D-47
- `foundations/decisions.md:1570-1582` D-87
- `foundations/decisions.md:1583-1595` D-88
- `foundations/decisions.md:1746-1760` D-96
- `foundations/decisions.md:1791-1805` D-99
- `foundations/invariants.md:458-467` browser-view-token-values
- `foundations/invariants.md:468-477` browser-view-focus-outline
- `foundations/decisions.md:3896-3948` D-214

## Guideline files, each whole

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`

## Product files and method passages its *Read* names

- `src/browser/AGENTS.md`
- `src/browser/view/controls/button.ts`
- `src/browser/account-api.ts:95-120`

## Return

Write your report to its path as the method gives. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
