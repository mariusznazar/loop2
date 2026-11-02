# Handoff — Slice 10, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 00212956394ad4b1525286fc7c20bbd3dacd97a6. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Read every file and range of your *Read* before you write code, one per call; a read cut short is read again, and your report says what you read. Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-10.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 10 — The card and its four states

- **Goal:** `src/browser/view/account-card.tsx`, the exemplar of row F3, holds the card and its four states as React components, and one plain function, `createAccountCard(options)`, returning `{ element, focus(), dispose() }`, with the options client, the page's one sentence (`ConfirmationNotice | null`), `signedIn(account, message)` and `reset: { token, address, finished(ending) } | null`. It creates its own host element and root and renders synchronously with `flushSync`; `focus()` moves focus to the first field; `dispose()` unmounts and removes the element, and an answer still awaited is then ignored; `signedIn` and `finished` are called from an event handler or the continuation of an answer, never from render or an effect. The card reads the name and the sentence from `src/browser/sim/data/about.ts`, the rules from `src/browser/view/account-rules.ts`, and builds on the React controls and `src/browser/view/credits-section.tsx`. It does what To do 1–7 and spec decision 8 give, each form behaving as `src/browser/view/account-screen.ts` and `src/browser/view/password-reset.ts` behave today: the same requests, refusals and sentences, checks before sending, the lock of the whole card, the waiting texts, focus back on the control the player started from after the commit that unlocks, a late answer ignored. `src/browser/view/app.ts` does not use it yet, so nothing a player sees changes in this slice. New cases in `tests/view/account-screen.test.mjs`, each written first, drive the card through `createAccountCard`: the four states, the switch, the page's sentence staying across states, the credits in every state, `dispose()` during a wait, and what the cases of `createAccountScreen` protect, which go in Slice 11. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). The test file keeps the harness first and its `assert`; a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.
- **Change:** `src/browser/view/account-card.tsx` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:18-35` To do 1–7 ·
  `.runs/task-cycles/logowanie-w-react/task.md:67-84` Pytania 1–3 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:63-73` Decision 1, the harness ·
  `.runs/task-cycles/logowanie-w-react/spec.md:87-106` Decision 3 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:135-141` Decision 5 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:156-171` Decision 7, The units of the change ·
  `.runs/task-cycles/logowanie-w-react/spec.md:177-187` Decision 8 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/account-screen.ts` · `src/browser/view/password-reset.ts` ·
  `src/browser/view/email-confirmation.ts` · `src/browser/account-api.ts` ·
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/text-field.ts` ·
  tests/view/page-document.mjs, src/browser/view/account-rules.ts, src/browser/sim/data/about.ts, src/browser/view/controls/react-button.tsx, src/browser/view/controls/react-text-field.tsx and src/browser/view/credits-section.tsx, which Slices 4, 5, 8 and 9 write ·
  `foundations/decisions.md:57-118` D-04 · `foundations/decisions.md:388-406` D-18 ·
  `foundations/decisions.md:913-927` D-44 · `foundations/decisions.md:958-972` D-47 ·
  `foundations/decisions.md:1804-1848` D-98, D-99, D-100 · `foundations/decisions.md:2607-2621` D-139 ·
  `foundations/decisions.md:4120-4172` D-222 · `foundations/decisions.md:4198-4253` D-224, D-225 ·
  `foundations/decisions.md:5099-5134` D-252 ·
  `foundations/invariants.md:808-827` account-client-requests, account-client-outcomes ·
  rows F1, F3, F5, S1, S2, S3
- **Model:** same — this file is what every later screen copies, and its state, focus and late answers take judgment the spec leaves to the maker.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`, each new case seen failing first; `npm test -- tests/view/react-controls.test.mjs`; `npm test -- tests/view/memory-limit.test.mjs`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 4 · Slice 6 · Slice 8 · Slice 9 · F1 · F3 · F5 · S1 · S2 · S3

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `src/browser/view/account-screen.ts`
- `src/browser/view/password-reset.ts`
- `src/browser/view/email-confirmation.ts`
- `src/browser/account-api.ts`
- `src/browser/view/controls/button.ts`
- `src/browser/view/controls/text-field.ts`
- tests/view/page-document.mjs, src/browser/view/account-rules.ts, src/browser/sim/data/about.ts, src/browser/view/controls/react-button.tsx, src/browser/view/controls/react-text-field.tsx and src/browser/view/credits-section.tsx, which Slices 4, 5, 8 and 9 write
- `foundations/decisions.md:52-113` D-04
- `foundations/decisions.md:383-401` D-18
- `foundations/decisions.md:912-926` D-44
- `foundations/decisions.md:957-971` D-47
- `foundations/decisions.md:1803-1817` D-98
- `foundations/decisions.md:1818-1832` D-99
- `foundations/decisions.md:1833-1847` D-100
- `foundations/decisions.md:2606-2620` D-139
- `foundations/decisions.md:4119-4171` D-222
- `foundations/decisions.md:4197-4218` D-224
- `foundations/decisions.md:4219-4252` D-225
- `foundations/decisions.md:5098-5133` D-252
- `foundations/invariants.md:809-818` account-client-requests
- `foundations/invariants.md:819-828` account-client-outcomes
- `foundations/decisions.md:39-51` D-03
- `foundations/decisions.md:792-806` D-36
- `foundations/decisions.md:1773-1787` D-96
- `foundations/decisions.md:5281-5305` D-259
- `foundations/decisions.md:5306-5328` D-260
- `foundations/decisions.md:5329-5352` D-261

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:18-35` To do 1–7

1. Niezalogowany gość widzi jedną kartę: nazwę gry, jedno zdanie o grze, przełącznik „Zaloguj się” i „Załóż konto”, formularz wybranego stanu i zwinięte wzmianki (D-96).
   - Zdanie brzmi: „Napisz postaci program i sprawdź, jak długo przeżyje bez ciebie.” (pytanie 5).
   - Zdanie stoi w danych gry w `src/browser/sim/data/`, a widok je stamtąd czyta (D-96, D-18).
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

### `.runs/task-cycles/logowanie-w-react/task.md:67-84` Pytania 1–3

- Pytanie 1. Który stan karty stoi po jej otwarciu i co stoi nad polami w każdym z czterech stanów?
  - Answer: Karta otwiera się na „Zaloguj się”. Przełącznik stoi tylko w „Zaloguj się” i „Załóż konto” i tam formularz nie ma nagłówka. „Nie pamiętam hasła” i „Ustaw nowe hasło” mają nagłówek, nie mają przełącznika, a wychodzi się z nich jak dziś: „Wróć do logowania” i „Anuluj”.
  - Not chosen:
    - przełącznik we wszystkich czterech stanach — w „Ustaw nowe hasło” kliknięcie przełącznika musiałoby zrobić to, co „Anuluj”, czyli usunąć odnośnik z adresu, a tego D-225 nie przewiduje, więc trzeba zmienić tę decyzję
    - nagłówek także przy przełączniku — trzy razy to samo słowo na małej karcie
  - Source: human, 2026-11-01, odpowiedź na cały pakiet rundy: „zgadzam się na komplet rekomendacji”, pozycja 7 pakietu. Pytanie nazwało koszt tej drogi: „w tych dwóch stanach jest tylko jedno wyjście”.
- Pytanie 2. Co dzieje się z wpisanym adresem, hasłem i komunikatami, gdy gość przełączy „Zaloguj się” i „Załóż konto”?
  - Answer: Przełącznik czyści pola i komunikaty formularzy i stawia fokus w polu adresu, jak dziś „Nie pamiętam hasła”.
  - Not chosen:
    - adres przechodzi na drugi stan, a hasła i komunikaty znikają — osobna reguła i jej przypadki testów
    - każdy stan trzyma swoje pola — hasło leży w niewidocznym polu, a powrót pokazuje stare komunikaty
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 8 pakietu. Pytanie nazwało koszt tej drogi: gość, który wpisał adres pod „Zaloguj się” i dopiero wtedy się przełączył, wpisuje go drugi raz. Fakt z kodu (tak jest dziś, to nie wymaganie): „Each button empties every field and removes every message, swaps the sections and moves focus to the address field of the form it opened.” (`src/browser/view/account-screen.ts:363`–`:364`, loop2 48544f0).
- Pytanie 3. Gdzie stoi jedno zdanie strony, które decyzje każą stawiać nad formularzami konta?
  - Answer: Zdanie strony stoi w karcie, nad przełącznikiem, a gdzie przełącznika nie ma, nad formularzem. Zostaje przy przełączaniu stanów karty i odchodzi dopiero przy przejściu między kartą a grą, jak dziś. Odpowiedź dotyczy też zadania 3.
  - Not chosen:
    - zdanie nad kartą — po zadaniu 3 potrzebny drugi panel na obrazie, bo „text stands on a solid background, never on a picture” (definicja, „Where may a picture of the game stand?”)
    - zdanie znika przy przełączeniu — jedno kliknięcie kasuje „Gra została zaktualizowana. Odśwież stronę.”
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 9 pierwszego pakietu; brzmienie dla stanów bez przełącznika i pytanie P2 przeciw temu wyborowi: human, 2026-11-01, „wszystko według rekomendacji”, drugi pakiet. Pytania nazwały koszty tej drogi: „karta na chwilę rośnie o jeden wiersz” oraz gość po zmianie hasła, który przełączy kartę na „Załóż konto”, czyta „Zaloguj się nowym hasłem.” nad zakładaniem konta. Fakt z kodu (tak jest dziś, to nie wymaganie): „leaves at the next change between forms and game” (`src/browser/view/app.ts:88`–`:89`, loop2 48544f0).

### `.runs/task-cycles/logowanie-w-react/spec.md:63-73` Decision 1, the harness

The harness is one new module, `tests/view/page-document.mjs` (no `.test.mjs`, so `node-test-selection` is untouched). It does what the trial showed to be needed:

- **It stands before React.** The test file imports it first, so that `window` exists when `react-dom` loads. Measured: with `window` installed after `react-dom`, a controlled field's `onChange` never fires; installed before, it does. Nothing fails loudly.
- **A fresh window per case**, as `onPage` gives a fresh document now, so a game left undisposed cannot answer another case's `visibilitychange`.
- **A control that becomes disabled loses focus.** Neither imitation does this and neither lets `blur()` do it; the model did. Measured: with the code that returns focus removed, the case still passes without this rule, and fails with it. It is kept as a rule of the harness, which watches `disabled` and moves focus to an element outside `body`.
- **No comparison on an element reaches Node's failure message.** A failing `assert.equal` on two rendered elements grew by about 2 GB/s at the end of another session's measurement on this machine, and that session names this spec's own trial, which ran such a comparison, the most likely cause of the low-memory errors of 12:52 to 13:00 that took down agent sessions. `--max-old-space-size=2048` did not stop the growth, and `timeout` stops it too late: 60 s at that rate is over 100 GB against a commit limit of 59.8 GB. Tests on jsdom therefore run under a watchdog that kills their process above a set memory limit (decision 9), and they take `assert` from this harness (decision 10). Node builds the message itself, by `inspect` with `depth: 1000`, `customInspect: false` and `getters: true`, before anything is thrown, so a `util.inspect.custom` on an element cannot shorten it. Why a rendered element explodes and a plain one does not was read without running a failing comparison: a plain jsdom element has no own enumerable key, so `inspect` stops at once, and a rendered one has five, among them `__reactFiber$…`, through which a walk following what `inspect` follows met 1,000,000 paths, the walk's budget, over only 253 distinct objects. `inspect` remembers only the current path (`ctx.seen`), so it writes an object out again for each path that reaches it, and its one brake, `ctx.budget`, counts per level of indentation. One failing comparison on a rendered element was then run once, under two caps: it confirms that the thread of decision 9 stops the growth, and it does not confirm this reading of why the memory grows.
- **React's work is awaited through `act`**, so `settle` wraps it; the flag `IS_REACT_ACT_ENVIRONMENT` stands in the harness; a mount that happens outside `act` is wrapped too, the only warning the trial met.
- **Typing goes through the input's native value setter and a bubbling `input` event**, the way React sees a change.
- **A report of React's development build through `console.error` fails the case.** Tests run React's development build, which reports hooks called in another order, missing keys and a field that changes from controlled to uncontrolled. Lines the product writes itself (`saved-game-load …`) are told apart.

What jsdom does not prove stays with a person and an agent: pressing Enter in a field does not send a form, a click on a label does not move focus, and nothing computes layout. Measured for Enter and the label on both imitations.

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

### `.runs/task-cycles/logowanie-w-react/spec.md:135-141` Decision 5

### 5. No tool guards React's rules: the guideline and review do

`eslint.config.mjs` keeps its rule set (D-29), so `eslint-plugin-react-hooks` does not enter. `guidelines/coding-browser-module.md` gains the rules of hooks and of effects, and review keeps them.

What already reaches a `.tsx` file: `tsc` in strict mode; ESLint with `recommendedTypeChecked`, whose patterns and typed programs already take `.tsx` (measured: it runs on the spike's two `.tsx` files with no change of the configuration and no report); Prettier, whose patterns take `.tsx`; and, from decision 1, a report of React's development build failing a test, which catches a changed order of hooks on any path a case walks.

Rejected: adding the plugin — a human-accepted change of D-29 that this cycle cannot make alone, and the task does not ask for it. Rejected: a check written by the product — D-29 rejects those for the same reason. Cost if wrong: a dependency array left incomplete passes everything and shows as a stale value. Return condition: a defect of React's rules that passed tests and review reopens D-29 for the human. The cycle may name this choice in the request, for the human to overturn.

### `.runs/task-cycles/logowanie-w-react/spec.md:156-171` Decision 7, The units of the change

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

### `.runs/task-cycles/logowanie-w-react/spec.md:177-187` Decision 8

### 8. Readings the task leaves open

- **The switch** is two buttons selected in their group. Pressing the button of the state already shown does nothing: nothing is cleared, focus does not move. To do 4 speaks of switching.
- **The lock.** „Blokada całej karty” locks every field and button of the card, the switch and „Nie pamiętam hasła” included, as `lock` does today. The folded credits stay usable: they send nothing, and their links open in a new tab.
- **One form waits at a time** is held in a ref, set before the request leaves, not in state alone, since state shows only after a commit.
- **Focus goes back after the commit that unlocks**, since a disabled control cannot take it. The origin is the control of the form the player sent it from, or the submit button, as today.
- **The folded credits** are a native `<details>` with `<summary>` „Autorzy grafiki”: one click, the keyboard, and the one focus rule of D-47, with no state and no script. They stand last in the card in all four states, and stay open or closed across a change of state, since they are not remounted.
- **The order in the card:** the name (`h1`), the sentence, the page's sentence, then the switch or the state's heading (`h2`), the form with its message under it, the exit button, the credits. The header being hidden, there is one `h1`.
- **The fields keep everything they have today:** `autocomplete` tokens, hints, `inputmode="email"` and `spellcheck` off on the address, `noValidate` on the form, no trimming of a password.
- **Controlled fields.** The card's state holds what is typed, so that clearing is a change of state and the request reads the state.
- **The width** is a layout dimension of about 400 px, within the sketch's 380–420 px; the sketch is material, and the value stands in `styles.css`.
