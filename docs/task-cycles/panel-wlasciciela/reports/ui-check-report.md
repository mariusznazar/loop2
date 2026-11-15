# UI check of "panel właściciela" — report

Worktree `the task's worktree`, branch `task/panel-wlasciciela`, head `e9b68648`.
Method: `npm run local` (HTTPS, own database), real browser through Playwright CLI (three sessions of my own
names: `ui-check-player`, `ui-check-owner`, `ui-check-second`; the last one only made the second account and was
closed at once). Window 1400×900 unless said otherwise. Accounts: `player@example.test`, `owner@example.test`,
`second@example.test`, throwaway passwords. Nothing published; no server, no `mikrus` tool touched.

Status: **done, with observations** (no defect against a rule of the styleguide or the task found; several
points the orchestrator may want to judge, listed under "Observations").

## Commands run (exit codes)

| Command | Exit |
|---|---|
| `npm run local` (first run with a 580 s limit, stopped by me to relaunch with a longer limit) | 0 |
| `npm run local:stop` (after the first run) | 0 ("Local starts stopped: 1") |
| `timeout 3300 npm run local` (the run used; address printed `https://127.0.0.1:56835`) | 0 at the end (ended by the stop below) |
| `LOOP2_DATABASE_PATH=<.runs/local-start/28364-56835-f1fc0156bfcc3860/accounts.sqlite> node dist/server/account-role.js owner owner@example.test` | 0 ("Made … an owner") |
| same, `owner nobody@example.test` | 4 ("No account has the address … Nothing changed.") |
| same, `owner second@example.test`, twice | 0 ("Made … an owner"), 0 ("already an owner; nothing changed") |
| same, `player owner@example.test` (demotion test), then `owner owner@example.test` (restored) | 0, 0 |
| `npm run local:stop` (final) | 0 ("Local starts stopped: 1"); no `node` process with `local-start` and no listener on 56834/56835 remains |

The role command finds the database by the variable `LOOP2_DATABASE_PATH`, which I set to the file
`accounts.sqlite` in the directory of the running start under `.runs/local-start/` (the local start sets the same
name for its server, `scripts/local-start.mjs:353`).

## Steps as observed

Screenshot paths are in `.runs\ui-check\`.

### 1. Player's account

- State: `player@example.test` signed in through the card, no owner role.
- Result: the bar has Siedziba, Mapy, Programy; the menu „Konto” holds the address, the unconfirmed-address line with
  „Wyślij ponownie”, and „Wyloguj”; **no „Panel właściciela”**. Screenshot `screenshot 01-player-menu-konto`.
- Typing `#/konta` into the address (goto, then also a full reload): the address bar ends at `https://127.0.0.1:56835/#/`
  and the content is Siedziba; the bar marks Siedziba (`aria-current="page"`). Passed.
- Console: no error and no failed request on these loads besides the ordinary 401 of `/api/account` before sign-in.

### 2. Owner's account

- State: `owner@example.test`, role given by the command above.
- The page that was already open when the role was given did **not** show the link until it was reloaded (the menu was
  opened without reload and held only address, „Wyślij ponownie”, „Wyloguj”). After a reload the menu holds, in this
  order: address, „Panel właściciela”, the unconfirmed line with „Wyślij ponownie”, „Wyloguj”. Bar identical to the
  player's. Screenshot `screenshot 03-owner-menu-konto`.
- Following the link (click, and Enter from keyboard focus): address `#/konta`, menu closed (`aria-expanded=false`),
  focus on the screen's host element (`accounts-screen-host`); no item of the bar is marked (`aria-current` null on all
  three). Reload at `#/konta` keeps the screen (screenshot `screenshot 09-owner-two-owners-after-reload`).
- Hover over the link: colour `text` `rgb(212,212,216)`, background `highlight` `rgb(39,39,42)`. Keyboard focus (Enter on
  „Konto”, then Tab): outline 2 px solid `focus` `rgb(244,244,245)`, offset 2 px (`screenshot 13-owner-menu-link-keyboard-focus`,
  `screenshot 12-owner-menu-link-hover`). Escape closes the menu and returns focus to „Konto”.
- Role is read at each request: with the role revoked by the command, the open owner page's next
  `GET /api/owner/accounts` answered 403 `owner-forbidden`; after a reload the page showed Siedziba at `#/` (not the
  list) and the menu without the link. Passed.

### 3. List screen

Screenshots `screenshot 04-owner-accounts-list-initial`, `screenshot 09-owner-two-owners-after-reload`, `screenshot 10-owner-player-blocked`,
`screenshot 18-owner-accounts-narrow-600`.

- Rows sorted by address (owner@, player@, second@). Each row: address (`text-strong` `rgb(244,244,245)`, weight 500),
  „Blokada: …”, „Uprawnienie do poprzedniego zapisu: …”, „Rola: …”; labels in `text-label` `rgb(141,141,151)`, values in
  `text`. A blocked account's value „zablokowane” is in `warning` `rgb(254,154,0)`, an unblocked one's in `text`.
  Passed against the rule "The list of accounts".
- Buttons per row: player row: „Zablokuj”, „Odblokuj”, „Nadaj uprawnienie do poprzedniego zapisu”, „Odbierz …”; the two that
  make no sense are disabled (unblocked account: „Odblokuj” and „Odbierz” disabled, without the privilege; with the privilege
  „Nadaj” disabled instead; blocked account: „Zablokuj” disabled). Disabled text `text-disabled` `rgb(82,82,92)`.
- **No „Zablokuj” at the owner's own row nor at a second owner** (made `second@example.test` an owner and reloaded: both
  owner rows hold three buttons). The privilege can be given and taken at an owner's row (the buttons are there).
- Button states: „Zablokuj” rest `text` `rgb(212,212,216)`; hover `danger` `rgb(255,100,103)` on `highlight`; keyboard focus
  `danger` text with the 2 px `focus` outline. „Nadaj…” hover: text unchanged, `highlight` background.
- Width: at 1900 px the screen's panel is 1344 px wide and centred (x=278), the same as the bar; at 600 px it takes the
  window (568 px of 600, no horizontal scroll) and the buttons wrap (`screenshot 18-owner-accounts-narrow-600`).
- Tab order: Konto, then the buttons in DOM order, skipping disabled ones (Nadaj-owner, Zablokuj-player, Nadaj-player,
  Zablokuj-second, Nadaj-second), then the bar items in the next cycle. Enter on a button acts. Focus after an operation:
  see Observation 3.
- Loading line (list request held back with a delayed route, then reload): „Wczytywanie listy kont…” in `text-secondary`
  `rgb(159,159,169)` (`screenshot 14-owner-accounts-loading`).
- Failed-read line (list request aborted with a route): „Nie udało się wczytać listy kont. Spróbuj ponownie.” in `warning`
  above a button „Spróbuj ponownie” (`screenshot 15-owner-accounts-failed-read`).
- **Empty list: unchecked.** The owner's own account is always on the list, so „Nie ma żadnych kont.” cannot be reached in the
  running game.

### 4. Operations end to end

- „Zablokuj” at the player's row opens the confirmation under the row with the sentence „Blokada kończy sesje gracza w każdej
  przeglądarce i unieważnia jego odnośniki z maili, a odblokowanie nie przywraca ani sesji, ani odnośników.” (`warning`, bar
  at the left in the same colour), „Tak, zablokuj” (destructive, neutral at rest) and „Wróć” (secondary action); keyboard
  focus lands on „Wróć”. `screenshot 05-owner-block-confirmation`. Network at that point: only the earlier `GET /api/owner/accounts`;
  **nothing sent** by the first click.
- „Wróć”: confirmation gone, all three states still „odblokowane”, still no `POST /api/owner/block`; focus back on „Zablokuj”.
- „Tak, zablokuj”: `POST /api/owner/block` 200, then `GET /api/owner/accounts`; the row shows „zablokowane” in `warning`, „Zablokuj”
  disabled, „Odblokuj” enabled with focus (`screenshot 10-owner-player-blocked`). The player's other browser: its next request
  (`GET /api/account`) answered 401 `unauthenticated`, a reload showed the login card (`screenshot 11-player-after-block-reload`);
  signing in as the player showed „To konto jest zablokowane.” (`POST /api/session` 403).
- „Odblokuj”: row back to „odblokowane”; the player's page after a reload still showed the login card (session **not**
  restored); signing in as the player then worked (Siedziba at `#/`).
- „Nadaj uprawnienie do poprzedniego zapisu” (done by keyboard Enter): `POST /api/owner/grant-previous-save` 200 at once, no
  confirmation, row shows „tak” (`screenshot 06-owner-after-grant`). The player's page after a reload: the Programy list shows the
  button „Zacznij od zera” (`screenshot 07-player-programy-with-privilege`); with the privilege taken (`POST …/revoke-previous-save`
  200, no confirmation) and a reload it is gone (the buttons are „Nowy program”, „Zmień nazwę”, „Usuń” only). Passed.
- Waiting state of an operation (browser `fetch` of the page delayed by 4 s through a patch in the page, because a route
  delay did not hold for POSTs): during the wait every button of the **whole list** is disabled, in `text-disabled`, labels
  kept, focus on the page body; after the answer the list is read again (`screenshot 16-owner-revoke-waiting`,
  `screenshot 17-owner-block-waiting`; in the second the confirmation is already gone while waiting).
- Compared with the existing confirmation „Zacznij od zera” (`screenshot 08-player-zacznij-od-zera-confirmation`): same sentence
  style (`warning` with a left bar), same destructive „Tak, …” and „Wróć”; see Observation 2 for placement.
- **Not shown: „Wciągnij programy z poprzedniego zapisu”.** After giving the privilege and „Zacznij od zera” + „Tak” on an empty
  game (message „Gra zaczyna się od nowa, a poprzednia czeka jako poprzedni zapis.”) the button did not appear on the Programy
  screen after a reload (`screenshot 20-player-after-reset-with-privilege`). I did not look into why; my guess, not checked, is that
  the previous save of an empty game holds nothing to pull. This is an existing behaviour of D-401, not the panel's.

### 5. The refusal

Player's session, `fetch` from the page (script held in the page, state of accounts unchanged after it):

```
GET  /api/owner/accounts                  -> 403 {"code":"owner-forbidden","error":"To konto nie jest kontem właściciela."}
POST /api/owner/block                     -> 403 (same body)
POST /api/owner/unblock                   -> 403 (same body)
POST /api/owner/grant-previous-save       -> 403 (same body)
POST /api/owner/revoke-previous-save      -> 403 (same body)
```

Owner's session, directly: `POST /api/owner/block {email: owner@example.test}` -> 409 `owner-not-blockable`
(„Konta właściciela nie można zablokować.”); unknown address -> 404 `unknown-account`. Passed.

### 6. Console and network

No uncaught line (`uncaught …` or `saved-game-load`) in any session. Console errors were only browser entries for
expected answers: the 401 before sign-in, the five 403s of step 5, a 401 after the block, a 403 at the blocked sign-in. In the
owner's session the failed requests were the 401 before sign-in, the 409 and 404 of my own probes, and two
`net::ERR_FAILED` of the list request that I aborted on purpose for the failed-read line. No other failed request.

## Observations for the orchestrator (not fixed, not rules broken as far as I can tell)

1. **Menu link appears only after a reload.** A page opened before the role was given keeps the menu without „Panel
   właściciela” until it is reloaded; the task says the command takes effect "from its next request" (the server does:
   step 2), and the page reads its role at load. Cost: after the human gives the role on the server, he reloads once. Not a
   rule of the styleguide.
2. **Confirmation placement at a wide window.** At 1400 px the sentence stands on the left and „Tak, zablokuj” / „Wróć” at the
   far right of the same line (`screenshot 05-owner-block-confirmation`), about 300 px from the sentence; in „Zacznij od zera” (narrow
   column) the buttons stand under the sentence. The rule says only "tak jak potwierdzenie „Zacznij od zera”: pod wierszem, a w
   nim jedno zdanie … przycisk … akcja poboczna" — both stand under the row, so I do not call it a departure.
3. **Focus after an operation.** The rule "Wyłączony przycisk traci fokus klawiatury, więc ekran po odpowiedzi przywraca go na
   kontrolce, od której gracz zaczął" cannot be kept to the letter here, since the pressed button ends disabled after the
   answer (Nadaj→tak, Odbierz→nie, Zablokuj→zablokowane, Odblokuj→odblokowane). Observed: focus moves to the enabled button of
   the opposite operation of the same row (after „Odblokuj”: „Zablokuj”; after „Zablokuj”: „Odblokuj”; after grant: „Odbierz”;
   after revoke: „Nadaj”); during the wait it sits on the page body. After „Wróć” it returns to „Zablokuj”.
4. **Whole list disabled while one operation waits.** The rule speaks of the pressed button being disabled; the screen
   disables every button of every row (`screenshot 17-owner-block-waiting`). Stricter, not contradicted.
5. **Failed-read line has an extra button.** The rule for the failed read speaks of one sentence in `warning` "nad listą";
   the screen adds a button „Spróbuj ponownie” and the sentence also ends with „Spróbuj ponownie.” (`screenshot 15-owner-accounts-failed-read`).
6. **The screen has no heading** (no `h2`; the list is labelled „Konta” for assistive technology only), unlike Siedziba.
   The styleguide's rule for the list names none.
7. **Link text indent.** „Panel właściciela” has 8 px left padding, so its text starts 8 px right of the address and the buttons
   (its box starts at the same x); this is how a list item with hover background is drawn, and the rule says "jak odnośnik na
   liście programów".

## Screenshots (all kept only in `.runs/ui-check/`; no place for the public screenshots was used; nothing pushed)

| File | Shows |
|---|---|
| `screenshot 01-player-menu-konto` | player, menu „Konto” open: address, resend line, „Wyloguj”, no panel link |
| `screenshot 03-owner-menu-konto` | owner after reload, menu with „Panel właściciela” between the address and the buttons |
| `screenshot 04-owner-accounts-list-initial` | list at `#/konta`: owner, player, second (the last two players), bar unmarked |
| `screenshot 05-owner-block-confirmation` | confirmation of „Zablokuj” under the player's row, focus on „Wróć” |
| `screenshot 06-owner-after-grant` | after „Nadaj…”: privilege „tak”, focus on „Odbierz…” |
| `screenshot 07-player-programy-with-privilege` | player's Programy with the privilege: „Zacznij od zera” present |
| `screenshot 08-player-zacznij-od-zera-confirmation` | the existing „Zacznij od zera” confirmation, for comparison |
| `screenshot 09-owner-two-owners-after-reload` | two owners: no „Zablokuj” in their rows; reload kept `#/konta` |
| `screenshot 10-owner-player-blocked` | player blocked: „zablokowane” in `warning`, „Odblokuj” focused |
| `screenshot 11-player-after-block-reload` | the blocked player's browser after a reload: login card |
| `screenshot 12-owner-menu-link-hover` | link „Panel właściciela” under the pointer (`highlight` background) |
| `screenshot 13-owner-menu-link-keyboard-focus` | link reached by keyboard: focus outline |
| `screenshot 14-owner-accounts-loading` | loading line „Wczytywanie listy kont…” |
| `screenshot 15-owner-accounts-failed-read` | failed read: sentence in `warning` and „Spróbuj ponownie” |
| `screenshot 16-owner-revoke-waiting` | all buttons disabled while „Odbierz…” waits |
| `screenshot 17-owner-block-waiting` | the same after the confirmed block |
| `screenshot 18-owner-accounts-narrow-600` | the list in a 600 px window |
| `screenshot 20-player-after-reset-with-privilege` | player after „Zacznij od zera”: line about the previous save |

All show only the made-up accounts of this start. The log of the start is `.runs/ui-check/local.log`.

## Reach beyond the handoff

- Read `src/browser/view/accounts-screen.tsx` (class list, texts, loading/failed/empty branches) and `src/browser/styles.css`
  (rules `.accounts-confirm`, `.accounts-confirm-text`) to know which text and element to look for; read
  `src/browser/account-api.ts:600-660` and `src/server/owner-routes.ts:22-26` for the route names and request body of step 5.
  Read `scripts/local-start.mjs` for where the database lies. No product file changed.
- Used a patch of `window.fetch` in the page (a delay on POST) and `page.route` (delay, abort of the list request) to show
  the waiting, loading and failed-read states; both belong to my browser session only.
- Gave and took the owner role several times through the command (listed above), and signed the player in again after
  each block, because a block deletes the sessions.

## Working copies

- Screenshots: kept in `.runs\ui-check\` (list above); the tool's own
  working directory `.playwright-cli/` and my probe scripts were removed.
- Browsers: `ui-check-player` and `ui-check-owner` closed (`playwright-cli list`: no browsers); `ui-check-second` closed earlier.
- Game: stopped with `npm run local:stop`; no process and no listener remain. The start's database directory
  `.runs/local-start/28364-56835-f1fc0156bfcc3860/` stays, as the skill says, until the next start (ignored by git).
- `git status` of the worktree: clean.

## Unread material

- `guidelines/styleguide-browser-view.md` read whole (both pages); `.runs/task-cycles/panel-wlasciciela/task-frozen.md` read whole;
  `src/server/account-role.ts` read whole; `.the-way/task-cycle/change/ui_check.md` and `.claude/skills/loop2-play/SKILL.md` read whole.
- Not read: `src/browser/tokens.css` (token values were read from the running page's computed styles instead), the tests of the change,
  `foundations/decisions.md` (D-410, D-411 and the others are cited only through the styleguide and the task), the rest of
  `src/browser/styles.css`, `src/browser/AGENTS.md`, `guidelines/coding.md` and `guidelines/testing.md` (no product code or test written).

## Searches not found or unclear

- „Wciągnij programy z poprzedniego zapisu” did not appear for the player after a reset of an empty game; condition not read in
  full (only that the button is hidden when `pull.control === "away"` in `src/browser/view/program-list.tsx:253`), cause unconfirmed.
- Empty list sentence „Nie ma żadnych kont.”: not reachable in the running game, seen only in the source text.
- A route delay (`page.route`) held the GET of the list but did not delay the POST of an operation in the CLI session; I did not find why
  and used a patch of `window.fetch` instead.
