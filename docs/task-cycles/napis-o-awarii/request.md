**State: ready** — the change is finished, reviewed and tested; six items below wait for your yes or no.

## What you will see

When something goes wrong in the game that no code of the game catches — in the clock, in drawing a screen, anywhere — the player now reads one sentence in orange: „Coś w grze się zepsuło — odśwież stronę.” (Something in the game broke — refresh the page.) Before, the game stood still with no word and nothing in the browser's console that came from the game.

- **Where the sentence stands.** On a game screen and on a waiting screen it stands in the row under the menu bar, next to the „could not save progress” sentence when that one is showing, not instead of it. On the login card it stands inside the card, under the form, where the sentences of a refusal stand. If drawing the card itself fails and the browser library removes the card, the sentence stands alone in a panel in the card's place. It stands once, however many errors follow, until the player refreshes the page.
- **What the game does after the error.** It stops taking changes: the clock and the buttons change nothing. Saving goes on as before and sends the last whole state from before the error, also when the player presses „Wyloguj”. A player who signs in after an error stays at the waiting screen with the sentence, and no game is built until the page is refreshed (your decision on this is item 1 below).
- **What the console gets.** One plain line with the kind of the error, its code and the place that handled it, for example `uncaught kind=TypeError code=none place=…`, and never the text of the error or its stack. The browser's own print of the error is switched off, so the text cannot get into the console. An error that keeps coming back leaves the line once.
- **What stays as it was.** A failed save, a failed load of a saved game, a refusal on the login card and a lost connection keep their own sentences, with no second sentence added.
- **For an agent that plays the game.** The skill that tells an agent how to run the game and operate it in a browser gained a short paragraph: how to read the console, what the game's line looks like, and that the browser's own entries about failed requests (for example a 401 before signing in) are not a failure. One sentence of the coding guidelines, which said the browser had no such handler yet, now says it has.

The author looked at the sentence in a real browser on the login card, on a game screen, on a waiting screen and with the card taken down, and inspected the screenshots. No screenshot is kept in the repository, by the rules of the playing skill; the observations are in the record.

### Underneath

A handler set up when the page starts listens for errors and rejected promises that nothing handled, cancels the browser's own print, writes the one line, stops the game's changes and asks the screens to show the sentence. The login card, which has its own React root, has a second handler for the case where the card is taken down.

## For you to decide

1. After an error the page builds no game until it is refreshed, so a sign-in after an error stays at the waiting screen with the sentence. This is the cycle's own choice, made when the review found that a game built after the error would still catch up the earning loops and save changed progress. It overrides five earlier decisions in that one case: a sign-in leading to the game, the catch-up after loading a saved game, sending the kept state after signing in again to the same account, retrying a save after signing in again, and loading the server's save after a save lost to another browser. The other ways were to let a later game catch up and then stop, which widens what you accepted, or to stop it before the catch-up, which loses earning-loop minutes. Accept? (Foundation entries, 1)
2. If drawing the login card fails and the card is taken down, the sentence stands on a panel styled like the card, not as bare text on the picture, so it can be read. The task said "alone"; the panel is the author's reading. Accept? (Technical changes, 2)
3. The cycle wrote two facts about how React 19.3.1 behaves, taken from React's own source: an error that nothing caught removes the whole root, and by default React then reports the error to the browser. The decision about the sentence leans on them. Accept? (Foundation entries, 4)
4. If the error comes from the part of the saving code that runs before the request is sent, saving stops for good and „Wyloguj” waits forever at „Wylogowywanie…”. The reviewer found this in existing code, not caused by this change. Make a task of it? (Minor findings, 6)
5. After the error the waiting screen still reads „Sprawdzanie logowania…” next to the sentence, though nothing is under way. Make a task of it? (Minor findings, 8)
6. Many older decisions describe a game that goes on (earning loops, the pause when leaving a screen, the buttons after a map run). After the error they are untrue, and only five are marked as overridden. The task's accepted reading covers the buttons; the earning-loop decisions are not covered and not marked. Make a task of it? (Minor findings, 5 and 11)

## Cost

About 58 minutes of working time, counting the orchestrator's stretches and the agents' turns and not the waiting for you. In all 89.8 million tokens counted with the cached input (Sonnet 5.5: 71.3 million; Opus 5.5: 18.5 million), of which 281,645 are output. Three code reviews: the whole change failed once on one blocking finding, which was fixed once and passed; the return step passed. The table of stages: [stages.md](https://github.com/mariusznazar/loop2/blob/@@SHA@@/docs/task-cycles/napis-o-awarii/stages.md).

## How to merge

Merge with a merge commit, as the repository's earlier requests were merged ("Merge pull request #…"), not squash or rebase: the link to the cycle's record stays valid only while the commits are kept.

<details>
<summary>Po polsku</summary>

**Stan: gotowe** — zmiana jest skończona, przejrzana i przetestowana; sześć punktów niżej czeka na Twoje tak albo nie.

## Co zobaczysz

Gdy w grze stanie się coś, czego nie łapie żaden kod gry — w zegarze, w rysowaniu ekranu, gdziekolwiek — gracz czyta teraz jedno zdanie na pomarańczowo: „Coś w grze się zepsuło — odśwież stronę.” Dotąd gra stała bez słowa i w konsoli przeglądarki nie zostawał żaden wiersz od gry.

- **Gdzie stoi zdanie.** Na ekranie gry i na ekranie oczekiwania stoi w wierszu pod paskiem menu, obok zdania „nie udało się zapisać postępu”, gdy takie stoi, nie zamiast niego. Na karcie logowania stoi w karcie, pod formularzem, tam gdzie zdania odmowy. Gdy padnie rysowanie samej karty i biblioteka przeglądarkowa zdejmie kartę, zdanie stoi samo w panelu w miejscu karty. Stoi raz, ile by błędów nie przyszło, aż gracz odświeży stronę.
- **Co robi gra po błędzie.** Przestaje przyjmować zmiany: zegar i przyciski niczego nie zmieniają. Zapisywanie działa dalej jak dotąd i wysyła ostatni cały stan sprzed błędu, także gdy gracz naciśnie „Wyloguj”. Gracz, który zaloguje się po błędzie, zostaje na ekranie oczekiwania ze zdaniem, a gra nie jest budowana do odświeżenia strony (Twoja decyzja w punkcie 1 niżej).
- **Co dostaje konsola.** Jeden zwykły wiersz z rodzajem błędu, jego kodem i miejscem obsługi, np. `uncaught kind=TypeError code=none place=…`, nigdy treść błędu ani jego stos. Własny wypis błędu przez przeglądarkę jest wyłączony, więc treść nie trafi do konsoli. Błąd, który wraca, zostawia wiersz raz.
- **Co zostaje jak było.** Nieudany zapis, nieudane wczytanie zapisanej gry, odmowa na karcie logowania i brak połączenia zachowują własne zdania, bez drugiego zdania.
- **Dla agenta, który gra.** Skill, który mówi agentowi, jak uruchomić grę i obsługiwać ją w przeglądarce, dostał krótki akapit: jak przeczytać konsolę, jak wygląda wiersz gry i że wpisy przeglądarki o nieudanych żądaniach (np. 401 przed zalogowaniem) nie są awarią. Jedno zdanie wytycznych kodowania, które mówiło, że przeglądarka nie ma jeszcze takiej obsługi, mówi teraz, że ma.

Autor obejrzał zdanie w prawdziwej przeglądarce na karcie logowania, na ekranie gry, na ekranie oczekiwania i przy zdjętej karcie oraz sprawdził zrzuty ekranu. Zrzutów nie ma w repozytorium — tak chce skill do grania; obserwacje są w zapisie cyklu.

### Pod spodem

Obsługa ustawiana przy starcie strony słucha błędów i odrzuconych obietnic, których nic nie obsłużyło, anuluje własny wypis przeglądarki, pisze ten jeden wiersz, zatrzymuje zmiany w grze i każe ekranom pokazać zdanie. Karta logowania, która ma własny korzeń Reacta, ma drugą obsługę na przypadek, gdy karta zostanie zdjęta.

## Do rozstrzygnięcia

1. Po błędzie strona nie buduje gry do odświeżenia, więc logowanie po błędzie zostaje na ekranie oczekiwania ze zdaniem. To własny wybór cyklu, podjęty, gdy przegląd wykrył, że gra zbudowana po błędzie dalej nadrabiałaby pętle zarobkowe i zapisała zmieniony postęp. W tym jednym przypadku wybór przesłania pięć wcześniejszych decyzji: logowanie prowadzące do gry, nadrobienie po wczytaniu zapisu, wysłanie zachowanego stanu po ponownym zalogowaniu na to samo konto, ponowienie zapisu po ponownym zalogowaniu i wczytanie zapisu z serwera po zapisie przegranym z inną przeglądarką. Inne drogi: pozwolić późniejszej grze nadrobić i dopiero stanąć (szersze niż to, co przyjąłeś) albo zatrzymać ją przed nadrobieniem (gubi minuty pętli zarobkowych). Przyjmujesz? (Foundation entries, 1)
2. Gdy padnie rysowanie karty logowania i karta zostanie zdjęta, zdanie stoi na panelu wyglądającym jak karta, a nie jako goły tekst na obrazie, żeby dało się je przeczytać. Zadanie mówiło „samo”; panel to odczyt autora. Przyjmujesz? (Technical changes, 2)
3. Cykl zapisał dwa fakty o zachowaniu Reacta 19.3.1, wzięte z jego własnego źródła: błąd, którego nic nie złapało, zdejmuje cały korzeń, a domyślnie React zgłasza go wtedy przeglądarce. Decyzja o zdaniu na nich się opiera. Przyjmujesz? (Foundation entries, 4)
4. Gdy błąd pochodzi z tej części kodu zapisu, która biegnie przed wysłaniem żądania, zapisywanie staje na stałe, a „Wyloguj” czeka w nieskończoność na „Wylogowywanie…”. Recenzent znalazł to w istniejącym kodzie; ta zmiana tego nie spowodowała. Zrobić z tego zadanie? (Minor findings, 6)
5. Po błędzie ekran oczekiwania dalej pisze „Sprawdzanie logowania…” obok zdania, choć nic się nie dzieje. Zrobić z tego zadanie? (Minor findings, 8)
6. Wiele starszych decyzji opisuje grę, która działa dalej (pętle zarobkowe, pauza po opuszczeniu ekranu, przyciski po przejściu mapy). Po błędzie są nieprawdziwe, a oznaczone jako przesłonięte jest tylko pięć. Przyjęty odczyt zadania obejmuje przyciski; decyzji o pętlach zarobkowych nie obejmuje i nie są oznaczone. Zrobić z tego zadanie? (Minor findings, 5 i 11)

## Koszt

Około 58 minut czasu pracy, liczonego z odcinków orkiestratora i tur agentów, bez czekania na Ciebie. W sumie 89,8 mln tokenów liczonych z wejściem z pamięci podręcznej (Sonnet 5.5: 71,3 mln; Opus 5.5: 18,5 mln), z czego 281 645 to wyjście. Trzy przeglądy kodu: przegląd całej zmiany oblał się raz na jednej uwadze blokującej, poprawionej raz, i przeszedł; krok zwrotny przeszedł. Tabela etapów: [stages.md](https://github.com/mariusznazar/loop2/blob/@@SHA@@/docs/task-cycles/napis-o-awarii/stages.md).

## Jak scalić

Scal commitem scalającym, tak jak scalano wcześniejsze prośby („Merge pull request #…”), bez squash i bez rebase: link do zapisu cyklu działa tylko, dopóki commity zostają.

</details>

## Technical changes

1. A module that listens on the window for `error` and `unhandledrejection`, cancels the event, writes the one console line once per distinct line and tells the page; installed at the top of the page's start. A file added: `src/browser/view/last-resort.ts`; the page's start in `src/browser/view/app.ts`. The line is built with the same word filter as the existing „saved game load” line, which now shares it. Commit `cbe0a66`.
2. The sentence on screen, in the existing warning control: a row created at the first error under the menu bar in `app.ts`; in the login card, inside the form under the submit button, through a React context and a new state of the card in `src/browser/view/account-card.tsx`; and, for a card taken down by React, `createRoot` of the card given an `onUncaughtError` that puts a panel with the sentence alone in the card's place (a class `account-card-failure` in `src/browser/styles.css`, which shares the card's panel rule). Commit `cbe0a66`.
3. The stop of the game: `GameView.halt()` in `src/browser/view/game-view.ts` makes the store refuse every later result and disposes the clock, so the saver's reads make no reading of the clock. Commit `cbe0a66`.
4. The fix of the one blocking finding: `showGame` in `src/browser/view/app.ts` builds no game after an error and leaves the waiting screen with the sentence; the halt after building was removed. Commit `da4e7ac`.
5. Tests: `tests/view/uncaught-failure.test.mjs` (13 cases: the invariant, the sentence on each screen, the console line, the card taken down, a foreseen failure keeping its own sentence alone, no game after the error, a repeated error); `tests/view/page-document.mjs` lets the harness accept the game's own `uncaught ` line and still fails on any other `console.error`, with a case in `tests/view/page-document.test.mjs`. Commits `cbe0a66`, `da4e7ac`.
6. Foundation entries: see the section below. Commits `af2cfae`, `f4b73af`.
7. Guidelines: the sentence of the coding guidelines on the browser's last-resort handler (`guidelines/coding.md`, "Recording a failure"), and the table and examples of the browser-module kind (`guidelines/coding-browser-module.md`), which gained a row for the new module. Commit `af2cfae`.
8. The playing skill's paragraph "Read the console", in both copies that a test holds equal (`.claude/skills/loop2-play/SKILL.md`, `.agents/skills/loop2-play/SKILL.md`). Commit `bd1971d`.

## Checks

- The gate, `npm test`, on the final tree `f4b73af`: exit 0; 412 tests in 4 directories, every directory passed, and the foundation check printed "0 errors". The same command on the base `5694146` and on the reviewed change `da4e7ac` also exit 0. No check failed or was left unrun in the gate; a check that failed and then passed: none.
- The invariant's test was seen failing before the code was wired (exit 1) and passing after (exit 0). The author's focused runs (view tests of the changed screens, typecheck, eslint, prettier, the foundation check) exit 0; the reviewers repeated the main ones and ran mutants that were killed.
- Own-work check of the author: mutants of the new code, all killed except two equivalent ones, which were removed as code. Requirement most likely unmet, checked: the sentence in the card stands where the refusal's sentence stands (first built below the exit link, moved under the button after the screenshot).
- User-interface states checked in a real browser by the author (`npm run local`, Playwright CLI, screenshots opened and inspected, none kept): the login card with the sentence, a game screen (the minute counter did not move, buttons changed nothing, the state saved after 30 seconds was the state from before the error), a waiting screen, the card taken down by React, and a sign-in after an error (waiting screen with the sentence, no game). The reviewers ran no real browser.
- The form check of this description: (see the record's request handoff for its last command, exit code and number of runs).

## Foundation entries

1. D-323 (`row 1`, and the cycle's part): after an error nothing handled, the game state changes no more and saving goes on with the last whole state, the sentence stands once in the three places, and the page builds no game until it is refreshed; the last clause and the five `narrows` are the cycle's.
2. D-253 (`row 2`), edited in place: the page also has a last-resort handler, which cancels the event and writes one line of kind, code and place without text or stack.
3. `html-exception-reporting` (`row 3`), an environment fact: the HTML Standard lets the browser report an error to the developer console only when the page did not cancel the event.
4. `react-uncaught-render-error` and `react-default-uncaught-report` (`the cycle's`), two environment facts: React 19.3.1 unmounts a root by rendering nothing when no error boundary caught an error and hands it to the root's `onUncaughtError`; by default it reports such an error to the browser through `reportError`, which fires an `error` event at the window.
5. `uncaught-failure-game-state` (`row 4`), an invariant with a Node test: after such an error the game state held in the page does not change and every save sends the state from before it. No existing invariant test was altered, no surface of the part map changed and no *Violated* mark was set or cleared.
6. D-262 (`row 5`): the sentence stands alone in the card's place when React takes the card down.

No kept row was tied to an entry already stated.

## Minor findings

1. (Minor, review of the whole change) **M-1. The panel of a card React took down builds by hand the tree of the shared control `createFormWarning`, in the exemplar file of the kind.**
   Place: `src/browser/view/account-card.tsx:671`–`:680` (`createFailureCard`: `document.createElement("p")`, `className = "form-warning"`, `role="alert"`). D-44 has screens build their controls from `src/browser/view/controls/`. `guidelines/coding-browser-module.md` (rule *Nowy ekran i moduły w DOM*, Bad: "Nowy ekran buduje elementy przez `document.createElement`") and its example text name `createFormWarning` from `text-field.ts` as the DOM form of this sentence. Because the panel stands outside React, the DOM form of the shared control is the right tool: `createFormWarning()` then `.set(FAILURE_SENTENCE)`, as `app.ts:227`–`:228` already does for the header line. Effect: a later change to the shared control misses this copy, and `tests/view/react-controls.test.mjs` does not compare it. The copy sits in `account-card.tsx`, the exemplar of D-36, which later screens copy.

2. (Minor, review of the whole change) **M-2. `last-resort.ts` gets a row with the status `copy` in `guidelines/coding-browser-module.md:44`, which no audit gave it and the task did not ask for.**
   The coding template says "a file added after that audit takes no row until the guidelines are refreshed or extended" (WAY-200, `.the-way/product-guidelines/coding/template.md:228`–`:229`). To do 7 asks only to correct the sentence of `### Recording a failure`. The status `copy` tells later work to imitate the file. That is low risk for a module this small, but the status is a judgment of an audit through `maintain-coding-guidelines`. Either drop the row, or name it in the request as a status for the human to accept.

3. (Minor, review of the whole change) **M-3. `LastResort.remove()` is unused code.**
   Place: `src/browser/view/last-resort.ts:48`–`:49`, `:82`–`:85`. Neither the page (`app.ts` keeps `lastResort` for `report` alone) nor any test calls it. The task did not ask for it, and nothing protects it.

4. (Minor, review of the whole change) **M-4. Two assertions of the change's tests pin implementation details rather than the behaviour the requirement fixes (`guidelines/testing.md`, *Behaviour, not implementation*).**
   - `tests/view/uncaught-failure.test.mjs:380`–`:384` counts live `setInterval` timers ("the clock no longer ticks"). The requirement is that the state does not change and that a save reads no clock. A correct implementation that kept its interval but read nothing would fail this check. The same test's later checks (no save after a tick and after acts; „Wyloguj” sending `sentBefore.game`) already protect the behaviour.
   - `tests/view/uncaught-failure.test.mjs:720` asserts that React's development build calls `console.warn` exactly once. That is the behaviour of a dependency, and a React update can change it without any change of the product.

5. (Minor, review of the whole change) **M-5. D-323 records no precedence over decisions whose sentences describe a game that goes on.**
   D-323's *Relations* reads only `derives from D-252`. Some decisions say what the player can do or what the game does, and after the error that is no longer true: D-62, D-122, D-132 and D-173 („Restart”, „Wznów”, „Zakończ”), D-283 (leaving the screen pauses), D-211 ("After a sign-in to the same account the game sends that state and goes on from it") and D-247 (I-1). The task's accepted reading in its answer to question 1 covers the sentences of the definition at lines 196, 556, 631, 691, 841, 916 and 1218 as describing a game that works. D-211 and D-247 are not among them. The decision template has the prevailing decision name the other as `narrows` (WAY-25). Without that, an agent comparing a change with D-211 or D-247 meets a collision with no precedence recorded. This is graded Minor because the task's reading covers most of these decisions; D-247 is part of I-1.

6. (Minor, review of the whole change) **M-6. When the uncaught error comes from the saver's own synchronous code, saving stops for good and „Wyloguj” waits forever, so D-323's "saving goes on as D-207, D-208 and D-97 give it" overstates.**
   Place: `src/browser/view/game-saver.ts:131`–`:141`. `sendNow` sets `inFlight = true` before `read()`, `withSaveTime` and `savedGame`. If one of these throws, no answer ever comes. Every later `moment()` only sets `pending`, `check()` returns at `inFlight`, and `saveBeforeLogout()` waits for a request that never ends, so the menu stays at „Wylogowywanie…”. The task assumed such an error "wraca przy każdej chwili zapisu" (question 4). This is pre-existing behaviour of the saver, which this change does not touch, but D-323 now claims the opposite. I reasoned this from the code and did not run it. Either clear `inFlight` when `sendNow` throws, or leave it to a later task and name it.

7. (Minor, review of the whole change) **M-7. The styleguide still says a form puts one sentence in `warning` under its button.**
   Place: `guidelines/styleguide-browser-view.md:222` ("Formularz stawia pod swoim przyciskiem jedno zdanie w `warning`"). After the change, a card form can hold the refusal's sentence and „Coś w grze się zepsuło — odśwież stronę.” one under the other (`account-card.tsx:283`–`:284`), as the task wants ("tam gdzie stoi zdanie odmowy"). The rule does not name the second sentence, so a later review of the browser view may flag correct code. The task did not ask for a styleguide change, so it is enough to name this.

8. (Minor, review of the fix) **N-3. After the error, the waiting screen reads „Sprawdzanie logowania…” for good, though no request is under way.** Place: `app.ts:375`–`:376`; `leaveWaiting()` shows `checking`. The sentence beside it tells the player to reload, so the effect is a line of text that is untrue but does no harm. By WAY-220 that is Minor. The fix report names the wording as unsettled.

9. (Minor, review of the return step) **F-1. The sentences of the two new facts go beyond the passages they quote.**
   Place: `foundations/environment_facts.md`, `## react-uncaught-render-error` and `## react-default-uncaught-report` (lines 616 to 627).
   - `react-uncaught-render-error` says "when an error thrown in its tree is caught by no error boundary" and "and then hands the error". The quoted passages (`Unmount the root by rendering null.`, `update.payload = {element: null};`, `const onUncaughtError = root.onUncaughtError;`) show neither the condition nor the order. The source does support them: the `HostRoot` case of `throwException` (`ReactFiberThrow.js:648` to `:658`) creates this update only after the walk up the fibers found no class boundary, and `update.callback` (line 104 to 110) calls `logUncaughtError` after the render of null. A reader who compares the passages with the source cannot see this from the passages alone. Also the sentence says "an error thrown in its tree" while the identifier says "render-error".
   - `react-default-uncaught-report` says "through `reportError`, which fires an `error` event at the window". The passage carries "In modern browsers" and no "window"; without `reportError` the source falls back to a polyfill that dispatches an `ErrorEvent` on `window` and then writes `console.error` if the event is not cancelled. The sentence drops the qualifier.
   Why it matters: the template asks that "the sentence says no more than its source says" and that the passage be what a reader compares the source with. This weakens the check of the fact, but no decision is wrong because of it: D-323 relies on the behaviour of the one browser it runs in, and the source does say it. A fix is to quote the passages that carry the condition and the order (for example the `case HostRoot:` lines and `update.callback = () => {`), and to say "in a browser that has `reportError`".

10. (Minor, review of the return step) **F-2. D-323's *Based on* does not name `html-exception-reporting`, although the sentence appears only because the browser fires the `error` and `unhandledrejection` events.**
   Place: `foundations/decisions.md`, D-323, *Based on*.
   The decision says the sentence stands after "an exception or a rejected promise"; the page learns of both through the two events the fact describes. The template asks *Based on* to name every source that, once it stopped being true, would call the decision into question (WAY-90). D-253 names the fact and D-323 states that the page writes the line "as D-253 gives it", so the dependency is reachable by one step, and the fact's own sentence is about cancelling, which is D-253's concern. For that reason I grade it Minor and am not sure it is wrong. If the author reads the fact as D-253's alone, the entry stands as written.

11. (Minor, review of the return step) **F-3. The line between the five decisions D-323 narrows and the ones it leaves unnamed rests on the task's reading, and the reading does not list the earning-loop decisions.**
   Place: D-239, D-242, D-250 (`foundations/decisions.md:4703`, `:4791`, and D-250 above); *Relations* of D-323.
   D-323's first sentence says the game state "changes no more"; D-250 says "the earning loops of other characters go on through" a pause or an end screen, and D-239 and D-242 say an earning loop goes one game minute per real minute. After the error that is no longer true. The accepted reading of question 1 covers only the definition's sentences about saving, "Restart", "Zakończ", "Wznów" and leaving the screen, so these three are by the same test as D-62 and D-173 (overridden in what they describe), but not on the reading's list. Review 1 graded the same gap as M-5 Minor on the ground that the reading covers most of these decisions. I keep it Minor: a reader of D-250 alone meets a collision with no precedence recorded (WAY-25), but the rest of the working game is the same class and an exhaustive `narrows` list has no end. Options: leave it, as the task's reading does (cost: the collision for D-239, D-242 and D-250 stays unwritten); or name one more sentence in D-323 stating that every decision about the game going on yields to it after the error (cost: a meaning wider than rows 1 and 4, which the human has to accept when merging).

Two more notes of the review of the fix (N-1, N-2) were closed by the return step: D-323 now has three binding sentences and names five narrowed decisions.

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** task 8 `napis-o-awarii` of the plan for MVP2 of loop2, goal: when an error occurs in the game, the game says so on the screen in one sentence and writes it to the browser's console instead of standing still without a word; a plan item that depends on task 1, which is done; the task document accepted by you on 2026-11-07; base `5694146` of `main`.
- **Process pin:** `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`, not moved by this task.
- **Spec:** none: no open design choice; six questions were settled in the task document.
- **Route:** one author without a plan, Sonnet 5.5; the change fits one agent. No discarded attempt.
- **Plan:** none.
- **Choices:** 5 rows in the record's questions table (two are the start's checks; Q-3, Q-4 and Q-5 are the cycle's choices): [questions table](https://github.com/mariusznazar/loop2/blob/@@SHA@@/docs/task-cycles/napis-o-awarii/cycle.md#questions-and-autonomous-choices).
- **Blocking findings left:** none. One blocking finding stood after the review of the whole change (a game built after the error still took its catch-up and could save changed progress); it was fixed once in `da4e7ac` and the review of the fix passed.
- **Record:** [the cycle's record](https://github.com/mariusznazar/loop2/blob/@@SHA@@/docs/task-cycles/napis-o-awarii/cycle.md).
