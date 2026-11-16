# Slice 15 report: the focus on the login card after a refused link and after „Anuluj”

## Status

`done with concerns`

The focus now moves to the login card after every refused emailed link (reset form and confirmation)
and after „Anuluj” of the reset form, as D-381 says. The concern left is the mutation named below,
which no test catches.

## Commits

- `0f269e61` on `task/drobne-bledy-ekranow`: `fix: :bug: move the focus to the login card after a refused reset link and after Anuluj of the reset form` (reset form and „Anuluj”).
- `dc787331` on `task/drobne-bledy-ekranow`: `fix: :bug: move the focus to the login card after a refused confirmation link too` (confirmation link, added on the coordinator's answer).

Base `9096759396be96477e22bf68506cf3069222bc29`; the range holds both commits.

## Files changed

- `src/browser/view/app.ts`: +10 in `0f269e61`, and +4/−2 in `dc787331` (the `start` path). A flag `focusCardOnForms` is set by the refused and the cancelled endings of the reset form, and by a refused confirmation link. `showForms` moves focus to the card the session check shows and clears the flag. `showGame` clears the flag.
- `src/browser/view/email-confirmation.ts` (`dc787331`): `confirmFromAddress` now returns `{ notice, refused }` instead of the notice alone. `refused` is true only for a definitive answer in `warning`, which is the server's refusal of the link. It returns `null` for an address with no token, as before.
- `tests/view/login-card-focus.test.mjs`: new file, 6 cases on jsdom through `tests/view/page-document.mjs`, with the harness of `account-screen.test.mjs`. Four in `0f269e61`, two in `dc787331` (the refused confirmation link, and a confirmation that succeeds).
- `tests/view/email-confirmation.test.mjs` (`dc787331`): the assertions at lines 148 and 164 read the notice from `answer.notice`, and check the `refused` flag. Line 135 (no token gives `null`) needed no change, and neither did line 98 (`confirmationOutcome` is unchanged).

I read `app.ts`, `email-confirmation.ts` and `tests/view/email-confirmation.test.mjs` whole before changing them.

## Test first

- Reset-form cases: written before the code in `0f269e61`. Run before the change: `npm test -- tests/view/login-card-focus.test.mjs` exit 1; three cases failed with `expected <input>, got <body>`. The game case passed already, as a guard. Log `slice-15-red-login-card-focus.log`.
- Confirmation case: written before the code in `dc787331`. Run before the change: exit 1; the refused confirmation case failed with `<body>`; the success guard passed. Log `slice-15-red-confirmation-focus.log`.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/login-card-focus.test.mjs` (after `0f269e61`) | 0 | 4 of 4. Log `slice-15-green-login-card-focus.log`. |
| `npm test -- tests/view/login-card-focus.test.mjs` (after `dc787331`) | 0 | 6 of 6. Log `slice-15-green-login-card-focus-with-confirmation.log`. |
| `npm test -- tests/view/email-confirmation.test.mjs` (after `dc787331`) | 0 | 5 of 5. Log `slice-15-green-email-confirmation.log`. |
| `npm test -- tests/view/account-screen.test.mjs` (after `dc787331`) | 0 | 133 of 133. Log `slice-15-green-account-screen-after-confirmation.log`. |
| `npm test -- tests/view/password-reset.test.mjs` (after `0f269e61`) | 0 | 2 of 2. Log `slice-15-green-password-reset.log`. |
| `npm test -- tests/quality/test_node_test_selection.py` (after `0f269e61`) | 0 | OK. Log `slice-15-green-node-selection.log`. |
| `npx eslint src/browser/view/app.ts src/browser/view/email-confirmation.ts` (after `dc787331`) | 0 | No output. |
| `npx eslint src/browser/view/app.ts` (after `0f269e61`) | 0 | No output. Log `slice-15-eslint-app.log`. |
| `npx prettier --check src/browser/view/app.ts src/browser/view/email-confirmation.ts tests/view/login-card-focus.test.mjs tests/view/email-confirmation.test.mjs` (after `dc787331`) | 0 | All files pass. |
| `npx prettier --check` (after `0f269e61`, before `dc787331`) | 1, then 0 | Before `prettier --write` on the new test file it failed; after it passed (`slice-15-prettier-check-before-format.log`, `slice-15-prettier-check-after-format.log`). |

Not run: the full suite. The handoff and the method forbid it.

## Browser check (D-88)

Run with `npm run local` and Playwright CLI 0.1.22 (`playwright-cli`). No mail leaves the test server, so a real emailed link cannot be made. A made-up token gives the server's real refusal (`invalid-link`). Each page was loaded as a full page with a query string, since a fragment-only change of the same URL keeps the old page.

1. Refused reset link, „Ustaw nowe hasło” sent (first build, `0f269e61`; game at `https://127.0.0.1:49153`). The card showed „Odnośnik jest nieważny albo wygasł.” and the „Adres e-mail” field was the active element, inside `.account-card`. Console: only the browser's own network lines (400, 401, 404); no `uncaught` or `saved-game-load` line of the game. Logs in `slice-15-browser-check.log`.
2. „Anuluj” of the same form (same build). The fragment was cleared, the card showed, and the „Adres e-mail” field was the active element, inside the card. Logs in `slice-15-browser-check.log`.
3. Refused confirmation link `#confirm-email=…`, first build (`0f269e61`): focus was on `BODY`. The open case at the time. Logs in `slice-15-browser-check.log`.
4. Refused confirmation link, second build (`dc787331`; game at `https://127.0.0.1:63004`): the card showed „Odnośnik jest nieważny albo wygasł.” and the active element was the „Adres e-mail” input, inside `.account-card`. Console: only the browser's network lines (400 on `/api/email-confirmation`, 401 on `/api/account`, 404 favicon); no game `uncaught` line. Logs in `slice-15-browser-check-confirmation.log`.

No screenshot was taken or shown, so D-418 and D-419 did not apply and nothing was pushed to `mariusznazar/screenshots`. The checks are textual: `document.activeElement` read in the page, and the snapshot's `[active]` marker.

The local game was stopped (`npm run local:stop`, one start stopped each time) and the browser closed (`playwright-cli close`).

## Own-work check

- Requirement: after a refused emailed link the card takes focus in its first field, whatever the link is (reset form or confirmation). Met for both now.
- Check: load a refused confirmation link in the browser and read the active element (step 3 before the change, step 4 after). Result before: `BODY`. Result after: the card's „Adres e-mail” field. Both runs are in the logs above.
- Check for the retry route: jsdom case 3 (a refused reset link whose session check fails and passes at „Spróbuj ponownie”). Passes, focus in the card.
- Check for the success guard: jsdom case 6 (a confirmation that succeeds moves no focus into the card). Passes.
- Red before the code: the focus cases failed with `<body>` (see "Test first"). Green after: all pass.
- Mutation no test catches: removing the `focusCardOnForms = false` line in `showGame`. The flag would then survive a game and move focus into a later card opened without a refused link. The only test that would see this is an expired-save case on a page that has a game and then a save answered 401; the existing case "an expired save takes no focus" (`account-screen.test.mjs` line 5544) starts a fresh page. I did not add a test: reaching the later card needs a game built, a save sent and answered 401, which takes setup beyond this slice. The mutation may stay without a test, as the coordinator allows.

## D-381 against the code

Wording in D-381 (read as it stands): „after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło”” and the rule that where the session check leads to the game nothing changes.

The two cases the wording names, both handled now:

- **„an emailed link the server refused”.** The wording is generic. The code has two real flows that fit it, and both are handled:
  - (a) The reset-form link refused by the server (`POST /api/password-reset` answers `invalid-link`). The page clears the fragment and runs the session check; the card takes focus. Handled (jsdom cases 1 and 3, browser check 1).
  - (b) The confirmation link refused on the page's start (`#confirm-email=`, `POST /api/email-confirmation` answers `invalid-link`). The page shows the sentence above the card through `confirmFromAddress` and `checkSession`; the card takes focus through the `refused` flag. Handled (jsdom case 5, browser check 4).
- **„Anuluj” of „Ustaw nowe hasło”.** Handled (jsdom case 2, browser check 2). For a signed-in player „Anuluj” opens the game, and nothing changes there (jsdom case 4).

Real cases the wording does not name, which D-381's word „only” leaves without focus, and which stay without focus:
- A confirmation that succeeds for a signed-out visitor shows „Adres e-mail potwierdzony.” above the card, with no focus (jsdom case 6).
- A lost connection on the check shows the waiting screen with its retry, not the card, so no focus is due there.

Conclusion: the decision's words cover both refused-link flows and „Anuluj”, and the code handles all three. I did not edit the decision.

## Questions and concerns

1. None open. The earlier question about the confirmation link was answered by the coordinator (yes, handled in this slice), and it is done in `dc787331`.
2. The mutation named in the own-work check (the flag reset in `showGame`) has no test, for the reason given there.

## Unread material

- Rows 14 and 17 of the plan's Foundation entries: I did not open the plan file. I read the same two rows in `task.md` lines 209 and 212 (the Settlements to record table), which hold the same text.
- `foundations/part_map.md`: not read; the handoff does not name it.
- `foundations/decisions.md` D-418: read only its first lines (about 1521–1530). It did not apply, since no screenshot was shown. D-419 was read whole.
- `foundations/decisions.md` lines 3086–3100 (D-381), 2840–2854 (D-96), 3429–3468 (D-225), 3195–3221 (D-156), 2941–2964 (D-259), 3010–3060 (D-262), 1551–1565 (D-420), 1002–1016 (D-88): read whole.
- `foundations/invariants.md` `node-test-selection` and `document-test-memory-limit`: read whole.
- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`: read whole (`testing.md` and `styleguide-browser-view.md` in two reads each).
- `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`: read whole.
- `.runs/task-cycles/drobne-bledy-ekranow/task.md` lines 28, 128–132, 194–195, 209, 212: read.
- `tests/view/account-screen.test.mjs`: lines 1–434 and 1700–1834 read; lines 5542–5562 and 6063–6150 seen only in grep output, not read.

## Searches not found or unclear

- The plan's rows 14 and 17: unclear, because the plan file itself was not opened.
- None else.

## Reaches beyond the handoff

- `src/browser/view/account-card.tsx`, `src/browser/view/password-reset.ts`, `tests/view/page-document.mjs`, `tests/view/password-reset.test.mjs`: read whole to follow the flows.
- `.the-way/task-cycle/change/ui_check.md`: read (the method names it). Judged not applicable, since the change alters focus and not what a screen shows; the focus was checked in the browser.
- The `loop2-play` skill was followed. One note for that skill: a change of the fragment alone on the same URL does not reload the page; a query string forces the load. Not a fault of the change.
- The coordinator's answer extended the Change list to `src/browser/view/email-confirmation.ts` and `tests/view/email-confirmation.test.mjs`.

## Working copies

- `.runs/slice-15/` (my directory): held the check logs. The kept logs are in `reports/` as `slice-15-*` files; the directory was removed.
- `.playwright-cli/` (made by the browser tool in the worktree): removed, both times.
- Scratch logs at `.runs/` root (`slice-15-*`, `bc-*`, `local2-*`): removed after their copies went into `reports/`.
- No git worktree, clone or screenshot was made.
- `.runs/local-start/` (the local game's database, made by the product's own `npm run local`): stays, as the loop2-play skill says; it is no working copy of mine.
- `dist/`: the build output of `npm test` and `npm run local`, made by the product's tools; left as they leave it.
- The local game was stopped both times.
