# Handoff — Slice 11, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 6cc3b88d80980ed17e924000baf82496727088ad. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Read every file and range of your *Read* before you write code, one per call; a read cut short is read again, and your report says what you read. Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-11.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## From Slice 10's report, section *For Slice 11, as observed*, word for word

- `forms()` in the test file reads every `.account-form` by its `h2`; the card's two switch states have none, so that helper breaks on the card.
- The file's `fire` runs outside act. My cases press and send through `inAct`. Spec decision 1 says a mount outside act is reported; I mounted inside `inAct` throughout and did not measure the outside case.
- `password-reset.ts` still imports `account-screen.ts`, so the card pulls the old DOM module in until that goes.
- The test file now has about 4280 lines; the plan's table named the cost of growing past 3381.

## Your section of the plan, word for word

### Slice 11 — The page holds the card

- **Goal:** `src/browser/view/app.ts`, still DOM and without JSX, holds the card as spec decision 3 gives: the card element stands in `root` beside `header`, `main` and the footer, never inside `main`, and while it stands those three are `hidden`; the footer is kept in a constant; one function closes the card and shows the page, and every screen that is no card goes through it; one function places a card, closing any card before it, and `showForms` and `showReset` go through it; `showForms` passes one sentence, `sentence` or the pending notice; `focus()` is called where `accountScreen.focus()` is called today and nowhere else; waiting screens keep their header and footer. `createPageNotice` stays for the refused save above the game. `src/browser/view/account-screen.ts` is deleted; `src/browser/view/password-reset.ts` loses `createResetScreen` and keeps `readResetToken`, `ResetEnding`, `ResetOutcome` and `resetOutcome`. `tests/view/account-screen.test.mjs` runs on the card: its helpers read the card's states, and each changed expectation names the item of *To do* or the answer that changes it; the cases of `createAccountScreen` itself are replaced by the cases of Slice 10 that protect the same behaviour. The report accounts for all 69 cases by name, as `.runs/task-cycles/logowanie-w-react/spec.md:175` gives. The look of the card is not finished until Slice 12: the page works, without the card's rules. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). The test file keeps the harness first and its `assert`; a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/account-screen.ts` · `src/browser/view/password-reset.ts` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:21-37` To do 2–8 ·
  `.runs/task-cycles/logowanie-w-react/task.md:79-90` Pytania 3–4 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:32-32` Constraints, moved lines ·
  `.runs/task-cycles/logowanie-w-react/spec.md:87-106` Decision 3 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:156-175` Decision 7 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/main.ts` · `src/browser/view/email-confirmation.ts` ·
  src/browser/view/account-card.tsx and tests/view/page-document.mjs, which Slices 5 and 10 write ·
  `foundations/decisions.md:1789-1803` D-97 · `foundations/decisions.md:2868-2897` D-156, D-157 ·
  `foundations/decisions.md:2928-2940` D-160 · `foundations/decisions.md:3856-3888` D-211 ·
  `foundations/decisions.md:4120-4172` D-222 · `foundations/decisions.md:4220-4253` D-225 ·
  `foundations/decisions.md:5099-5134` D-252 ·
  `foundations/invariants.md:998-1007` expired-session-unsaved-progress ·
  rows F5, F15, S1, S3, S4
- **Model:** same — this slice changes the page's every way to and from the card, and restates 69 cases against it.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`, its changed cases seen failing first; `npm test -- tests/view/password-reset.test.mjs`; `npm test -- tests/view/memory-limit.test.mjs`; `npm test -- tests/invariants/test_browser_view_framework.py`, now on a bundle with React; `npm test -- tests/invariants/test_application_build_output.py`; `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `npm run kitchen-sink -- --build-only`; `npm test -- tests/deploy/test_loop2_image_icons.py`, reported as unchecked where no Docker daemon answers; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 10 · F5 · F15 · S1 · S3 · S4

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `src/browser/main.ts`
- `src/browser/view/email-confirmation.ts`
- src/browser/view/account-card.tsx and tests/view/page-document.mjs, which Slices 5 and 10 write
- `foundations/decisions.md:1788-1802` D-97
- `foundations/decisions.md:2867-2881` D-156
- `foundations/decisions.md:2882-2896` D-157
- `foundations/decisions.md:2927-2939` D-160
- `foundations/decisions.md:3855-3887` D-211
- `foundations/decisions.md:4119-4171` D-222
- `foundations/decisions.md:4219-4252` D-225
- `foundations/decisions.md:5098-5133` D-252
- `foundations/invariants.md:999-1008` expired-session-unsaved-progress
- `foundations/decisions.md:1773-1787` D-96
- `foundations/decisions.md:1606-1618` D-88
- `foundations/decisions.md:5281-5305` D-259
- `foundations/decisions.md:5329-5352` D-261
- `foundations/decisions.md:5353-5375` D-262

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:21-37` To do 2–8

2. Karta niesie cztery stany (D-96):
   - „Zaloguj się”: adres, hasło i przycisk „Nie pamiętam hasła”.
   - „Załóż konto”: adres, hasło i powtórzone hasło.
   - „Nie pamiętam hasła”: puste pole „Adres e-mail”, przyciski „Wyślij odnośnik” i „Wróć do logowania”, który wraca do „Zaloguj się”.
   - „Ustaw nowe hasło”: formularz strony otwartej odnośnikiem z wiadomości, także dla zalogowanego gracza, a strona nie buduje gry, póki ten formularz stoi (D-225).
3. Karta otwiera się na „Zaloguj się” (pytanie 1):
   - W „Zaloguj się” i „Załóż konto” stoi przełącznik, a formularz nie ma nagłówka.
   - „Nie pamiętam hasła” i „Ustaw nowe hasło” mają nagłówek i nie mają przełącznika, a wychodzi się z nich jak dziś: „Wróć do logowania” i „Anuluj”.
4. Przełącznik czyści pola i komunikaty formularzy i stawia fokus w polu adresu, jak dziś „Nie pamiętam hasła” (pytanie 2).
5. Każdy formularz działa jak dotąd: te same żądania do serwera, te same odmowy i zdania, sprawdzanie pól przed wysłaniem, blokada całej karty na czas czekania, napisy „Logowanie…”, „Zakładanie konta…”, „Wysyłanie…” i „Ustawianie…”, powrót fokusu na kontrolkę, od której gracz zaczął, pominięcie spóźnionej odpowiedzi i wejście do gry po sukcesie (D-44, D-96, D-222, D-225).
6. Zdania strony, które dziś stoją nad formularzami (potwierdzenie adresu, zmienione hasło, nieważny odnośnik, wygasła sesja, zaktualizowana gra), stoją w karcie, nad przełącznikiem (pytanie 3):
   - Gdzie przełącznika nie ma, zdanie stoi nad formularzem (D-156, D-225).
   - Zdanie zostaje przy przełączaniu stanów karty i odchodzi dopiero przy przejściu między kartą a grą.
7. Zwinięte wzmianki stoją w każdym stanie karty, jedno kliknięcie je otwiera, a ich treść jest ta sama co w stopce: tytuł ikony, autor, strona, licencja i sposób zmiany pliku (D-27, `icon-credits`).
   - Napis na zwiniętej sekcji: „Autorzy grafiki” (pytanie 6).
8. Karta stoi na środku okna (pytanie 11), a na jej ekranie nie ma nic poza nią, ani nagłówka, ani stopki (pytanie 4).
   - Ekrany oczekiwania zostają jak dziś, z nagłówkiem i stopką: „Sprawdzanie logowania…”, „Potwierdzanie adresu…”, ostrzeżenie ze „Spróbuj ponownie” i chwila po udanym logowaniu (`src/browser/view/app.ts:276`).

### `.runs/task-cycles/logowanie-w-react/task.md:79-90` Pytania 3–4

- Pytanie 3. Gdzie stoi jedno zdanie strony, które decyzje każą stawiać nad formularzami konta?
  - Answer: Zdanie strony stoi w karcie, nad przełącznikiem, a gdzie przełącznika nie ma, nad formularzem. Zostaje przy przełączaniu stanów karty i odchodzi dopiero przy przejściu między kartą a grą, jak dziś. Odpowiedź dotyczy też zadania 3.
  - Not chosen:
    - zdanie nad kartą — po zadaniu 3 potrzebny drugi panel na obrazie, bo „text stands on a solid background, never on a picture” (definicja, „Where may a picture of the game stand?”)
    - zdanie znika przy przełączeniu — jedno kliknięcie kasuje „Gra została zaktualizowana. Odśwież stronę.”
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 9 pierwszego pakietu; brzmienie dla stanów bez przełącznika i pytanie P2 przeciw temu wyborowi: human, 2026-11-01, „wszystko według rekomendacji”, drugi pakiet. Pytania nazwały koszty tej drogi: „karta na chwilę rośnie o jeden wiersz” oraz gość po zmianie hasła, który przełączy kartę na „Załóż konto”, czyta „Zaloguj się nowym hasłem.” nad zakładaniem konta. Fakt z kodu (tak jest dziś, to nie wymaganie): „leaves at the next change between forms and game” (`src/browser/view/app.ts:88`–`:89`, loop2 48544f0).
- Pytanie 4. Co widać poza kartą na jej ekranie i co widać, zanim karta się pojawi?
  - Answer: Na ekranie karty nie ma nic poza kartą, ani nagłówka, ani stopki. Ekrany oczekiwania zostają jak dziś, z nagłówkiem i stopką, także po zalogowaniu.
  - Not chosen:
    - oczekiwanie w karcie — zalogowany gracz przy każdym odświeżeniu widzi kartę logowania, jakby go wylogowało
    - nagłówek i stopka także przy karcie — wyklucza to cytat niżej
  - Source: dla ekranu karty cytat, którego człowiek nie skreślił: „A signed-out visitor sees one card on a picture of the game” (D-96, `definicja_mvp2_loop2.md:600`) oraz „A section of credits, folded and opened with one click, stands on Siedziba and on the login card” i *Rejected*: „the credits open in a footer of every screen — dozens of rows standing below the game” (D-27, `:465`, `:474`), odcisk 8de9ffff. Dla oczekiwania: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 10 pakietu; pytanie nazwało koszt tej drogi: przy każdym wejściu niezalogowany gość przez chwilę widzi nagłówek i stopkę, zanim wskoczy karta. Fakt z kodu (tak jest dziś, to nie wymaganie): `root.append(header, main, createFooter());` (`src/browser/view/app.ts:401`) i ekran oczekiwania po logowaniu (`:276`), loop2 48544f0.

### `.runs/task-cycles/logowanie-w-react/spec.md:32-32` Constraints, moved lines

- The task's *To do*, *Acceptance criteria*, eleven answered questions and six rows of *Settlements to record* are settled. Lines it cites moved on the base: `showForms` is at `src/browser/view/app.ts:268`, `root.append(header, main, createFooter());` at `:445`, the title „Loop” at `:134`, the README step of `npm run build` at `README.md:25` and the sentence „sees the forms again” at `.claude/skills/loop2-deploy/SKILL.md:225`. The runner counts 69 cases in `tests/view/account-screen.test.mjs`, where the task says 67.

### `.runs/task-cycles/logowanie-w-react/spec.md:87-106` Decision 3

### 3. `app.ts` holds the card as it holds the game: an object it creates and disposes

`src/browser/view/account-card.tsx` exports, beside the components, one plain function that `app.ts` calls without any JSX:

- `createAccountCard(options)` returns `{ element, focus(), dispose() }`, the shape of `createGameView`. The options: the client, the page's one sentence (`ConfirmationNotice | null`), `signedIn(account, message)`, and, for a page opened by a reset link, `reset: { token, address, finished(ending) } | null`.
- It creates its own host element and root and renders synchronously with `flushSync`, so that when the function returns the card is in the element. This keeps every transition of the page synchronous, leaves no frame with an empty screen and lets `focus()` follow placement as `accountScreen.focus()` does today.
- `focus()` moves focus to the first field; the page calls it where it calls `accountScreen.focus()` today, after a confirmed logout and after a password was set. No other opening of the card moves focus.
- `dispose()` unmounts the root and removes the element. An answer still awaited is then ignored.
- A new root for each opening: nothing typed survives between openings, since no state outlives `dispose()`, where a root kept for the page's life would need a reset of its own.

In `app.ts`:

- The card element stands in `root` beside `header`, `main` and the footer, never inside `main`. While it stands those three are `hidden` (`[hidden]` in `styles.css` is `display: none !important`, so the header's `display: flex` cannot override it). The footer is kept in a constant.
- One function closes the card and shows the page, and every screen that is no card goes through it: the waiting screen, „Potwierdzanie adresu…”, the failed load and the game, four of the six places of `main.replaceChildren` today. Leaving the card therefore has one way out and no path can forget it. Sign-in is covered, since `enter` leads to `showGame` or `waitForServer`; „Anuluj” and a refused link are covered, since `checkSession` starts with `waitForServer`.
- One function places a card, closing any card before it: `showForms` and `showReset`, the other two places. A set password reaches `showForms` from the reset card, so the old card is disposed and a new one opens with the sentence.
- `showForms` passes one sentence, `sentence` or the pending notice. They cannot both stand: a non-null `sentence` comes only from a running game, and `showGame` has already taken the pending notice. A sentence in `warning` with `role="alert"`, a positive one with `role="status"`, as `createConfirmationNotice` gives them. `createPageNotice` stays for the refused save above the game.

The card calls `signedIn` and `finished` from an event handler or the continuation of an answer, never from render or an effect. Measured: disposing inside React's own click, as „Anuluj” does, gives no warning.

Rejected: `root.replaceChildren` for the card's screen — it removes the `<script>` from `body` and rebuilds the order by hand. Rejected: one root kept for the page's life with `render(null)` — a reset of state to keep right for nothing gained. Rejected: the card kept mounted and hidden — a typed password would stay in the page behind the game. Rejected: an asynchronous `root.render` — every caller then has to wait for the card, and the empty frame is possible. Rejected: JSX in `app.ts` — it stays a DOM module. Cost: `flushSync` is React's last resort, used here once, at the one boundary between the DOM page and a React screen; it goes when `app.ts` moves.

### `.runs/task-cycles/logowanie-w-react/spec.md:156-175` Decision 7

| Unit | Does | Used by, and depends on |
|---|---|---|
| `src/browser/sim/data/about.ts` (new) | The game's name and its one sentence. | Read by the card and by `app.ts`'s header. Imports nothing. A file of kind `content-data`. |
| `src/browser/view/account-rules.ts` (new) | Pure and without React or DOM: `addressProblem`, `passwordProblems`, `registrationProblems`, `RegistrationField`, `RESET_REQUESTED_SENTENCE`. | The card, the kitchen-sink page and tests. |
| `src/browser/view/password-reset.ts` (kept) | Loses `createResetScreen`; keeps `readResetToken`, `ResetEnding`, `ResetOutcome` and `resetOutcome`. | `app.ts`, the card, `tests/view/password-reset.test.mjs`, unchanged. |
| `src/browser/view/account-screen.ts` (deleted) | Goes with `accountForm` and `createAccountScreen`. | In `src/` only `password-reset.ts` and `app.ts` use them, both changed. |
| `src/browser/view/account-card.tsx` (new) | The card and its four states, and `createAccountCard`. The exemplar of D-36. | `app.ts`. Depends on the client, the two units above, the React controls, `credits-section.tsx`. |
| `src/browser/view/credits-section.tsx` (new) | The folded credits, drawn from `footerCredits()` of `footer.ts`, so the content is the footer's. | The card, today. |
| `src/browser/view/controls/react-button.tsx`, `react-text-field.tsx` (new) | Decision 2. | The card. |
| `src/browser/view/app.ts` (changed) | Decision 3; the header reads the name from `about.ts`. | `main.ts`, unchanged, so `src/browser/*.tsx` does not enter the part map (question 10). |
| `src/browser/styles.css` (changed) | Rules of the card's screen and the card, on existing tokens; the rules of the two forms side by side go. | The card and `app.ts`. |
| `tests/view/memory-limit.mjs` (new, first) | Decision 9: `startMemoryLimit({ limitBytes, intervalMs })`, with the limit's value as its default. | `tests/view/page-document.mjs` and its test. Node's `worker_threads` and nothing else. |
| `tests/view/memory-limit.test.mjs`, `memory-limit-child.mjs` (new, second) | Decision 9's proof, and the guard of decision 10. | The gate. |
| `tests/view/page-document.mjs`, `tests/view/react-controls.test.mjs` (new, after those) | Decisions 1, 2 and 10. | `tests/view/account-screen.test.mjs` and the gate. |

The order among these is a requirement: the watchdog and its test stand and pass before the first test on jsdom runs, and the harness's `assert` before the first case is moved onto it.

The credits' test: `tests/view/icons.test.mjs` and `tests/invariants/test_icon_credits.py` keep their stand-ins for `createFooter`, which stays in DOM, and read the card's section through `renderToStaticMarkup`, which needs no document. Measured: the section renders so with `document` undefined, and `createFooter` renders on jsdom, so task 24 can drop either stand-in. The script `test_icon_credits.py` writes to a temporary directory has to reach `react` and `react-dom/server` from the built copy, not from where the script stands.

Every case of `tests/view/account-screen.test.mjs` is accounted for by name in the maker's report: moved with only its harness changed, or changed in its expectation with the item of *To do* or the answer that changes it, or, for `createAccountScreen`'s own cases such as „reset from outside …”, replaced by the case that protects the same behaviour through `createAccountCard` (`guidelines/testing.md`, *Changing an existing test*). `tests/view/password-reset.test.mjs:4` loses its mention of the hand-made model.
