# Handoff — executor of Slice 9, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You make one slice of a plan, a fresh agent. Your
questions go to the orchestrator, never to the human; you return at your slice's end.

- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole;
  read a file it names when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/reset-hasla/reports/29-slice9-report.md`
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

### Slice 9 — The form „Ustaw nowe hasło” and the page's start

- **Goal:** `src/browser/view/password-reset.ts` holds `readResetToken`, the pure `resetOutcome` and
  `createResetScreen`, with the section of To do 4. `start()` gains a branch before the confirmation
  branch: with a reset token the page places the reset screen in `main`, sends no request and builds
  no game. Rules are checked before sending and nothing is sent on a problem; while waiting the fields
  and „Anuluj” are disabled. On `changed`, `refused` and „Anuluj” the screen clears the fragment first
  and then calls `finished`; the page goes on as Decision 10's table gives. Everything else keeps the
  form, the one sentence under it and focus. Stylesheet rules read existing tokens only.
- **Change:** `src/browser/view/password-reset.ts` · `src/browser/view/app.ts` ·
  `src/browser/styles.css` · `tests/view/password-reset.test.mjs` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:388-418` Decision 10 — The page's start ·
  `.runs/task-cycles/reset-hasla/spec.md:420-451` Decision 11 — The reset screen ·
  `.runs/task-cycles/reset-hasla/spec.md:585-594` Left to the maker ·
  `.runs/task-cycles/reset-hasla/task.md:20-29` To do 4 ·
  `.runs/task-cycles/reset-hasla/task.md:206-211` Settlements to record, rows 6 to 11 ·
  `.runs/task-cycles/reset-hasla/task.md:213-213` Settlements to record, row 13 ·
  `foundations/decisions.md:769-782` D-36 · `foundations/decisions.md:799-812` D-38 ·
  `foundations/decisions.md:814-827` D-39 · `foundations/decisions.md:829-842` D-40 ·
  `foundations/decisions.md:859-872` D-42 · `foundations/decisions.md:874-887` D-43 ·
  `foundations/decisions.md:889-902` D-44 · `foundations/decisions.md:934-947` D-47 ·
  `foundations/decisions.md:1570-1581` D-87 · `foundations/decisions.md:1583-1594` D-88 ·
  `foundations/decisions.md:1746-1759` D-96 · `foundations/decisions.md:1776-1789` D-98 ·
  `foundations/decisions.md:1931-1942` D-109 · `foundations/decisions.md:2836-2849` D-156 ·
  `foundations/decisions.md:2896-2907` D-160 · `foundations/decisions.md:3544-3559` D-203 ·
  `foundations/decisions.md:3795-3826` D-211 ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/invariants.md:998-1006` expired-session-unsaved-progress ·
  `foundations/environment_facts.md:334-338` uri-fragment-in-requests ·
  Foundation entries rows N3 and N4 ·
  `src/browser/AGENTS.md` · `src/browser/view/email-confirmation.ts` ·
  `src/browser/view/account-screen.ts` · `src/browser/view/controls/button.ts` ·
  `src/browser/view/controls/text-field.ts` · `tests/view/email-confirmation.test.mjs` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** Start from the unit case of `readResetToken` in `tests/view/password-reset.test.mjs`,
  then `resetOutcome` for each answer. Page cases stand in `tests/view/account-screen.test.mjs`
  beside the confirmation's, which hold the hand-made document model. **How the slice shows its
  states:** one page case for each — the form for a signed-out and a signed-in player with no request
  sent and no game built and no save; waiting; a problem under its field with nothing sent; `changed`
  (the fragment gone, row 9's sentence in `positive` above the forms, no session check, focus on the
  address field); `refused` (the fragment gone, the usual session check, row 10's sentence in
  `warning` above the forms or above the game); „Anuluj” (the fragment gone, the usual session check,
  no sentence); a lost connection, a timeout, 429 and 500 keeping form, fragment and link, with the
  sentence under the form and focus back. The rendered form is looked at in a browser: `npm run dev`
  without account settings serves the page, and `/#reset-password=x` shows the form with no server
  answer needed (`LOOP2_LISTEN_PORT` picks a free port); the report names what was seen, or marks it
  unchecked with its reason where the harness has no browser. The sample of the form with a refusal
  comes in Slice 10.
  `npm test -- tests/view/password-reset.test.mjs`,
  `npm test -- tests/view/account-screen.test.mjs`,
  `npm test -- tests/view/email-confirmation.test.mjs`,
  `npm test -- tests/invariants/test_browser_view_token_values.py`,
  `npm test -- tests/invariants/test_browser_view_focus_outline.py`, `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 7 · Slice 8

## Passages of the task and spec its *Read* names, word for word

### `.runs/task-cycles/reset-hasla/spec.md:388-418`

> ### Decision 10 — The page's start
>
> `src/browser/view/password-reset.ts` (new) reads the fragment with `readResetToken(hash)`, which
> returns what follows `#reset-password=` as it stands, even when empty or malformed, and null for any
> other fragment. The server's refusal is the one place that judges a token. The two prefixes cannot
> both match, so each reader stays independent.
>
> `start()` in `app.ts` gains a branch before the confirmation branch and the session check: when a
> reset token is present, the page places the reset screen in `main` and stops there. It sends no
> request (row 13), so it does not check the session, and it builds no game. So nothing of `game-saver`
> exists while the form stands for a signed-in player: no timer, no save, no state to keep. Another tab
> holding the game is untouched and meets D-211 at its next save, which is the cost question 5 accepted.
>
> When the screen ends (Decision 11), the page goes on as its ending says:
>
> | Ending | The page then |
> |---|---|
> | `changed` | Sets the sentence of row 9 as the pending notice, in `positive`, shows the forms with no session check, and moves focus to the address field of „Zaloguj się”. |
> | `refused` | Sets the sentence of row 10 as the pending notice, in `warning`, and runs the usual `checkSession`, so the existing pending-notice path puts it above the forms or the game. |
> | `cancelled` | Runs the usual `checkSession`, with no notice. |
>
> Row 9 is read as written: after a success the page does not ask about the session. A browser signed
> in to another account therefore sees the forms with the sentence, and a reload returns to that
> account's game. Nothing is lost by it, and the extra request row 10 pays for was not accepted for
> success.
>
> Rejected: the form as a fourth state of `account-screen.ts` — that screen is what a signed-out player
> sees, and `showForms` runs its `reset`; the form stands before anyone knows who is signed in. A
> session check before the form — one more request and a game built only to be removed, against row 6.
>
> Cost if wrong: small; the branch is a few lines and its cases stand in the tests of the page.

### `.runs/task-cycles/reset-hasla/spec.md:420-451`

> ### Decision 11 — The reset screen
>
> `createResetScreen(options)` in `password-reset.ts` takes the client (`Pick<AccountClient,
> "setPassword">`), the token, the `PageAddress`, and a callback `finished(ending)`, and returns its
> element. It holds the section „Ustaw nowe hasło”, the fields „Nowe hasło” and „Powtórz hasło” with
> `new-password` autocompletion, the submit button „Ustaw hasło” and the plain button „Anuluj”.
>
> - Before sending, it checks the rules through the shared password check (Decision 12). A problem
>   stands under its field, nothing is sent, and the link stays (rows 7, 19).
> - While waiting, the button reads „Ustawianie…”, and the fields and „Anuluj” are disabled, so one
>   request runs at a time and a cancel cannot race a write.
> - The answer is sorted by the pure `resetOutcome(result)`. Success is `changed`. A refusal with the
>   code `invalid-link` is `refused`, whatever its reason (row 10). Everything else — no connection, a
>   timeout, 429, 500, an unexpected answer, and a password refusal from the server — keeps the form,
>   stands as the client's one sentence under it, and returns focus to where the player sent it from
>   (row 11).
>
> The fragment goes first: on `changed`, on `refused` and on „Anuluj” the screen calls
> `address.clearFragment()` and only then `finished(ending)`. `clearFragment` uses `history.replaceState`,
> so neither a reload nor the back button returns to the token, and nothing can send it again. The
> token otherwise lives only in the screen's closure.
>
> Accepted cost, following row 11: an answer lost after the server committed leaves the form standing,
> and a second send then gets `invalid-link`, though the password did change. The player's new password
> works on the form, or a new link can be requested.
>
> Rejected: clearing the fragment in `app.ts` — three places instead of one, and a screen test could
> not see it; sharing `confirmFromAddress` — that function sends on load and this one must not.
>
> Proved by: unit cases of `readResetToken` and `resetOutcome`; page cases with the test's address for
> each ending: which request goes out, when the fragment goes, what stands where, for a signed-in and a
> signed-out player, and that no game is built and no save is sent while the form stands.

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

### `.runs/task-cycles/reset-hasla/task.md:20-29`

> 4. Odnośnik z wiadomości prowadzi gracza do ustawienia nowego hasła (pytanie 4):
>    - Odnośnik ma postać `<adres gry>/#reset-password=<token>`, token to 32 losowe bajty, baza trzyma tylko jego skrót SHA-256, a strona czyta token z fragmentu adresu.
>    - Odnośnik zużywa się dopiero razem z nowym hasłem.
>    - Formularz „Ustaw nowe hasło” stoi w miejscu gry i formularzy konta, także gdy gracz w tej przeglądarce jest zalogowany, a strona nie sprawdza odnośnika, zanim pokaże formularz.
>    - Formularz ma pola „Nowe hasło” i „Powtórz hasło”, z regułami i zdaniami z zakładania konta (D-98), bez porównywania ze starym hasłem.
>    - Przyciski to „Ustaw hasło” (w czasie oczekiwania „Ustawianie…”) i „Anuluj”, który usuwa fragment adresu i otwiera stronę jak zwykle.
>    - Po sukcesie gracz widzi formularze konta i nad nimi „Hasło zmienione. Zaloguj się nowym hasłem.” w `positive`.
>    - Po odmowie odnośnika, jednym zdaniem dla każdego jej powodu, strona robi zwykłe sprawdzenie sesji i stawia „Odnośnik jest nieważny albo wygasł.” w `warning` nad tym, do czego ono prowadzi: nad formularzami konta albo nad grą (pytanie 14).
>    - Fragment adresu znika po każdej z tych dwóch odpowiedzi.
>    - Brak połączenia albo odmowa z pełnej bramki haseł (zdanie „Za dużo prób. Spróbuj ponownie za kilka minut.”) zostawia formularz, zdanie pod nim i ważny odnośnik.

### `.runs/task-cycles/reset-hasla/task.md:206-211`

> | 6 | Formularz „Ustaw nowe hasło” stoi w miejscu gry i formularzy konta, także gdy gracz w tej przeglądarce jest zalogowany. | decision | pytanie 4 (podstawa; Mariusz, 2026-10-30, pozycja D30, propozycja 1: „Formularz „Ustaw nowe hasło” pokazuje się także zalogowanemu graczowi, bo uprawnia sam odnośnik.”); propozycja refinera: „w miejscu gry i formularzy konta”; zmienia D-96 (co widzi gracz przed zalogowaniem i po nim): “signing in with email and password and reloading with a valid session also lead to the headquarters” | gdzie stoi formularz i czy zalogowany gracz trafia najpierw do gry |
> | 7 | Formularz „Ustaw nowe hasło” ma pola „Nowe hasło” i „Powtórz hasło” z regułami i zdaniami z zakładania konta, bez porównywania ze starym hasłem. | decision | pytanie 4 (podstawa; Mariusz, 2026-10-30, pozycja D30, propozycja 2: „Pola to „Nowe hasło” i „Powtórz hasło”, z regułami z zakładania konta, bez porównywania ze starym hasłem.”); propozycja refinera: „i zdaniami”; zmienia D-98 (jakie hasła gra przyjmuje), które mówi o powtórzonym haśle tylko przy zakładaniu konta: “Registration's repeated password equals the password exactly” | czy nowe hasło ma inne reguły albo napisy niż przy zakładaniu konta i czy porównywać je ze starym |
> | 8 | Formularz „Ustaw nowe hasło” ma przyciski „Ustaw hasło” (czekając: „Ustawianie…”) i „Anuluj”, który usuwa fragment adresu i otwiera stronę jak zwykle. | decision | pytanie 4 (podstawa; Mariusz, 2026-10-30, pozycja D30, propozycja 3: „Przyciski to „Ustaw hasło” (w czasie oczekiwania „Ustawianie…”) oraz „Anuluj”, który otwiera stronę jak zwykle.”); propozycja refinera: „usuwa fragment adresu”; zmienia D-44 (wspólne kontrolki i napisy oczekiwania): “the button that sends a form then reads „Logowanie…” or „Zakładanie konta…” for the corresponding form” | napisy przycisków i czy po wyjściu z formularza token zostaje w adresie |
> | 9 | Po ustawieniu hasła nad formularzami konta stoi „Hasło zmienione. Zaloguj się nowym hasłem.” w `positive`, a fragment adresu znika. | decision | pytanie 4 (podstawa; Mariusz, 2026-10-30, pozycja D30, propozycja 4: „Po sukcesie: formularze konta i „Hasło zmienione. Zaloguj się nowym hasłem.””); propozycja refinera: „nad”, rola `positive` (kolor powodzenia) i „fragment adresu znika” | co widzi gracz po sukcesie i czy token zostaje w adresie |
> | 10 | Po odmowie odnośnika, z jakiegokolwiek powodu, strona sprawdza sesję i stawia „Odnośnik jest nieważny albo wygasł.” w `warning` nad tym, do czego ona prowadzi, nad formularzami konta albo nad grą, a fragment adresu znika. | decision | pytanie 4 (podstawa; Mariusz, 2026-10-30, pozycja D30, propozycja 5: „Po odmowie: formularze konta i „Odnośnik jest nieważny albo wygasł.””), a miejsce zdania z pytania 14 (B; pozycja 21-Q13: „strona sprawdza sesję i stawia zdanie nad tym, do czego ona prowadzi: nad formularzami albo nad grą”), *Not chosen* tam, zgodnie z uwagą wiersza w pakiecie: „„nad formularzami” zmienia 21-Q13”; propozycja refinera: „z jakiegokolwiek powodu”, rola `warning` (kolor ostrzeżenia) i „fragment adresu znika”; obok D-156 (odnośnik potwierdzenia), od której bierze miejsce zdania: “above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on”; zmienia D-160 (odnośnik zablokowanego konta), które daje to zdanie tylko odnośnikowi potwierdzenia: “a player who opens such a confirmation link sees” | co widzi gracz po odmowie, czy powód odmowy zmienia zdanie i czy token zostaje w adresie |
> | 11 | Brak połączenia albo pełna bramka haseł zostawia formularz, zdanie pod nim i ważny odnośnik. | decision | pytanie 4 (podstawa; Mariusz, 2026-10-30, pozycja D30, propozycja 6: „Brak połączenia albo „Za dużo prób. Spróbuj ponownie za kilka minut.” zostawiają formularz i ważny odnośnik.”, gdzie zdanie „Za dużo prób…” to odmowa pełnej bramki haseł z D-103, limitu pracy nad hasłami); propozycja refinera: „zdanie pod nim” | czy błąd połączenia albo przeciążenie zużywa odnośnik i czy gracz musi prosić o nowy |

### `.runs/task-cycles/reset-hasla/task.md:213-213`

> | 13 | Strona nie sprawdza odnośnika resetu, zanim pokaże formularz, więc o nieważnym odnośniku gracz dowiaduje się po jego wysłaniu. | decision | pytanie 4 (A; Mariusz, 2026-10-30, pozycja D30: „A – strona nie sprawdza odnośnika przed pokazaniem formularza.”), *Not chosen* tam | czy dodać drugą trasę bez sesji, która mówi każdemu, czy token jest ważny, i stan „Sprawdzanie odnośnika…” |

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
- `foundations/decisions.md:1776-1790` D-98
- `foundations/decisions.md:1931-1943` D-109
- `foundations/decisions.md:2840-2854` D-156
- `foundations/decisions.md:2900-2912` D-160
- `foundations/decisions.md:3548-3564` D-203
- `foundations/decisions.md:3799-3831` D-211
- `foundations/invariants.md:458-467` browser-view-token-values
- `foundations/invariants.md:468-477` browser-view-focus-outline
- `foundations/invariants.md:998-1007` expired-session-unsaved-progress
- `foundations/environment_facts.md:334-339` uri-fragment-in-requests
- `foundations/decisions.md:3974-3995` D-216
- `foundations/decisions.md:3996-4029` D-217

## Guideline files, each whole

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`

## Product files and method passages its *Read* names

- `src/browser/AGENTS.md`
- `src/browser/view/email-confirmation.ts`
- `src/browser/view/account-screen.ts`
- `src/browser/view/controls/button.ts`
- `src/browser/view/controls/text-field.ts`
- `tests/view/email-confirmation.test.mjs`

## Return

Write your report to its path as the method gives. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
