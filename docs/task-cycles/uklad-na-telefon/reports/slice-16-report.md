done

# Slice 16 report - the screens outside the game, the menu bar and the list of accounts at 360 px

## Status, commits, files

- Status: `done`.
- Commit: `2b4bbeaa` on `task/uklad-na-telefon` (base `5acdcdbb`), by path: `src/browser/credits.css` and `src/browser/styles.css`.
- Files changed: `src/browser/credits.css` +23 -0, `src/browser/styles.css` +9 -0. Nothing else changed (see the choices: the other files of the slice's *Change* needed no change).

## What I found and changed

I measured the base first (the screens and states below, at 1280 x 720 as a mouse sees them, and at 360 x 740 with touch, with the measurement of the loop2-play skill). At 360 px the base already held everything except two things, because slices 7 and 9 had done the shared controls and the shell:

1. `summary` „Autorzy grafiki” of the folded credits (login card, and Siedziba, which shares the rule) measured 278 x 16.8 px - a control by itself, under the minimum. Fix in `src/browser/credits.css`, in a block `@media (width < 1280px)` after the computer rules, with a comment naming D-396: the summary gets `min-width`/`min-height: var(--touch-target-min)` and `padding-block: calc((var(--touch-target-min) - 1lh) / 2)` so its text stands in the middle of the target, and the section's top padding is dropped (the summary's padding takes its place). The links inside the credits rows are links inside running sentences, which the styleguide rule leaves outside the minimum; they are unchanged.
2. The secondary action „Anuluj” (34.6 px wide at 1280, so the 48 px minimum is wider than its text): the minimum centred its text and moved its start 7 px off the line of the fields, which D-275 asks to begin level with them. Fix in `src/browser/styles.css`, in the existing phone block of the touch target: `.button.secondary { text-align: left; }`, with a comment.

Judged and kept: the nine-line block of `account-card.css` from slice 9 (the screen of the card undoes the page's 8 px side padding with `-var(--space-s)`): at 360 px the picture covers the whole window, the card stands 16 px from each side, nothing overshoots. Not changed: `account-card.css`, `waiting-screen.css`, `accounts-screen.css`, `accounts-screen.tsx` (the list of accounts fits a 360 px row with the stylesheet alone, so no markup of its own is added).

## Checks (command and exit code)

| Command | Exit |
|---|---|
| `npm test -- tests/invariants/test_browser_view_token_values.py` (4 tests, OK) | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` (3 tests, OK) | 0 |
| `npm test -- tests/view/accounts-screen.test.mjs` | 0 |
| `npm test -- tests/view/owner-panel.test.mjs` (4 pass) | 0 |

No failing run of a test written first: I wrote no test. The change is stylesheet rules in a phone `@media` block, and jsdom does not apply such a block (styleguide rule "Two layouts and one threshold between them"), so no test can fail on it; the check of a phone rule is the browser measurement below. The two invariant tests passed with the change; I did not break their rules to see them fail, since the slice adds no invariant (the tests guard rules I only kept: no px value and no outline in the stylesheet).

## Own-work check (section 3)

Requirement the work most likely did not meet: "every control of these screens has at least the touch-target minimum and nothing crosses its frame or scrolls to the side" for each state of the five screens. The check: the measurement of loop2-play (`scrollsToTheSide`, `contentWiderThanItsBox`, `outsideTheWindow`, `controlsSmallerThan48`), extended in my script to take a screenshot and measure after each state, in Chromium by Playwright CLI with `.playwright/cli.phone.config.json` (360 x 740, touch), every action by `tap`.

States (login card, no account): 01 „Zaloguj się”, 02 with the credits open, 03 refusal under the form, 04 „Załóż konto”, 05 the sign-up error, 06 „Nie pamiętam hasła”, 07 its answer, 08 „Ustaw nowe hasło” (a link `#reset-password=...`), 09 its error; waiting screens: 10 „Sprawdzanie logowania…” (the account request held), 11 the warning with „Spróbuj ponownie” (request aborted), 12 „Potwierdzanie adresu…” (link `#confirm-email=...`, request held). Signed in as the owner: 20 the bar, 21 the open menu „Konto” with the address, „Panel właściciela”, „Adres e-mail niepotwierdzony.”, „Wyślij ponownie” and „Wyloguj”, 22 the menu after „Wyślij ponownie”, 23 the list of accounts (four accounts: the owner, a player with a 62-character address with no space, a blocked player, a player with the previous-save privilege), 24 the confirmation of „Zablokuj”, 25 the list while read, 26 a failed read with „Spróbuj ponownie”, 27 an operation waiting for the server, 28 a refused operation, 29 the menu of the player with the long address.

Result at 360 x 740 (files in `reports/slice-16-evidence/`: `out360-before.json`, `in360-before.json`, `out360-after.json`, `in360-after.json`):

- Before (base `5acdcdbb`): on 01-09 `controlsSmallerThan48` listed `summary "Autorzy grafiki" 278 x 16.8`; no other control of these screens, no side scroll, `contentWiderThanItsBox` and `outsideTheWindow` empty on 01-12 and on 23-28. 
- After (commit `2b4bbeaa`): on 01-12 and on 23-28 `scrollsToTheSide` false, `contentWiderThanItsBox` empty, `outsideTheWindow` empty, `controlsSmallerThan48` empty (links inside the rows of the credits listed as in the base, 46 on 02 and 03: links inside running sentences, outside the minimum by the styleguide rule and the source of D-396).
- Not mine, seen on the way: on 20, 21, 22 and 29 (Siedziba under the menu bar) `contentWiderThanItsBox` lists `div.camp` 844 > 344 and `div.scene-sheet`, and `outsideTheWindow` `img.camp-background` -492..852 - the picture band of Siedziba, which D-389 says is clipped on purpose, and slice 17 owns it. Same before and after.
- The screenshots were read: the card, the five forms, the menu with the long address (the address breaks, nothing crosses the menu), the list of accounts with the confirmation (the sentence, then „Tak, zablokuj” and „Wróć” below it), „Anuluj” now level with the fields.
- At 1100 x 800 (`out1100-after.json`, `in1100-after.json`): the same states, the same result: no side scroll, no crossing, no small control (the same Siedziba camp entries).
- At 1280 x 720 without touch (a fresh session, no touch): before and after screenshots of all 22 states were compared by pixel difference. 21 are identical. 22 (the menu after „Wyślij ponownie”) differs only in its sentence: the base run read „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” and the run after the change „Za dużo wiadomości. Spróbuj ponownie za godzinę.” (the server's limit of resend messages, reached by repeating the click over the runs), not in layout.

## Walk of the running product (walkthrough.md)

The change alters what a screen shows in the phone layout, so the walk applies. Where each case was checked: the local start (`npm run local`, over HTTPS on the loopback address, port chosen by the system) on Windows 11, Chromium of Playwright CLI 0.1.22, at 360 x 740 with touch, 1100 x 800 with touch and 1280 x 720 without touch.

| Case | By what | Verdict |
|---|---|---|
| Login card, four forms and credits at 360 px: no side scroll, nothing over a frame, controls at least 48 | the measurement on states 01-09 after `tap`s | fit; the one fault of the base (the summary) fixed |
| Waiting screens at 360 px | states 10-12 | fit, no fault |
| Menu bar and open menu „Konto”, owner and player with a long address | states 20-22, 29 | fit, no fault; the long address breaks inside the menu |
| Owner panel: list, confirmation, loading, failed, waiting, refused operation | states 23-28 | fit, no fault |
| The computer layout as before at 1280 x 720 | 22 screenshots, pixel difference | the same; one differs by a sentence of the server (see above) |
| A tap on „Autorzy grafiki” opens the section; the summary is 48 px | state 02 after the tap | opens, no longer under the minimum |
| Side observation | - | Siedziba's camp crosses at 360 and 1100 px (slice 17's); „Konto” on a row of its own at 360 px takes a line of the bar (slice 9's settled choice) |

What I did not check: the screen of the sign-in just made (the moment after a sign-in that succeeded, too short to catch), the sentence above the card (`confirmation-notice` of D-261), the failure card „Coś w grze się zepsuło — odśwież stronę.” (React taking the card down, cannot be triggered from outside), a real confirmation link and a real reset link (mail does not leave a local start), the keyboard on a real phone, Firefox, Edge and Chrome on Android. What fell wrong: only the two faults above, both corrected; no test exists for a rule of the phone block (jsdom).

## How I got an account with the owner role (note 4 of the handoff)

The start made by `npm run local` has its database at `.runs/local-start/<process>-<port>-<mark>/accounts.sqlite`. I made the accounts through `POST /api/accounts` (the same request the card makes), with made-up addresses at `example.test`, and used the product's own operator commands against that file, from the worktree root, while the start ran: `LOOP2_DATABASE_PATH=<that file> node dist/server/account-role.js owner owner@example.test`, then `account-block.js block <email>` and `account-previous-save.js grant <email>` for the rows. Each command printed its sentence and exited 0. No database edit outside the commands. The scripts are in `reports/slice-16-evidence/` (`setup.sh`, `reset.sh`, `walk-out.js`, `walk-in.js`; their port and password are those of that one start). This answers the open point of the skill loop2-play (it has no way to reach `#/konta` locally); I did not edit the skill, which is outside this slice.

One caveat that cost a restart: an account created by `curl` from Git Bash with a non-ASCII password failed to sign in through the card (a code-page mangling of the request body), so the accounts were made again with an ASCII password. 

## Choices (with the way rejected and the cost if wrong)

- Only the two faults the measurement showed were fixed, in `credits.css` and `styles.css`; the list of accounts, the waiting screens and the card were left as they stood. Rejected: restyling the list of accounts (for example two buttons to a row) - nothing measured fails, and the styleguide asks markup of its own only where the stylesheet cannot fit a row. Cost if wrong: the human may find the list long at 360 px (the screen is about 1300 px tall for four accounts); a later task would restyle it.
- Summary: padding computed from `1lh` and the minimum, not a fixed `px` padding. Rejected: a flex summary (it removes the disclosure triangle) and `min-height` alone (the text would sit at the top of the target). Cost if wrong: a browser without the `lh` unit (older than Chromium 109 or Firefox 120) drops the padding and the summary falls back under the minimum; the minimum `min-height` still holds the box at 48 px but the text sits at its top.
- The secondary action keeps its text at the left (`text-align: left`) in the phone layout. Rejected: leaving it centred in its 48 px target - the visible start is 7 px off the line of the fields. Cost if wrong: none known.
- Kept the visual order of the menu bar as slice 9 left it ("Konto" on its own row at 360 px). Rejected: moving „Konto” up beside the name with `order` - it would put the visual order against the tab order and the open menu over the row of items. Cost if wrong: the bar takes about 100 px of a 740 px window.

## Reach beyond the dispatch

- `.claude/skills/loop2-deploy/SKILL.md` and `src/server/account-role.ts`, `scripts/local-start.mjs`: read for the way to the owner role (note 4 asked for it).
- `.the-way/task-cycle/change/slice.md` and `walkthrough.md`: read as the method names them.
- `src/browser/view/menu-bar.tsx`, `account-card.tsx`, `waiting-screen.tsx`, `credits-section.tsx` (markup and class names, to write the walk script), and `src/browser/account-api.ts` (endpoints for making the made-up accounts).
- `guidelines/styleguide-browser-view.md` was read whole in three reads, as were the other files of the *Read*.

## Working copies

- `.runs/slice-16/` (scripts, screenshots, JSON, logs) and `.playwright-cli/` stood in the worktree; both removed. The evidence kept: `.runs/task-cycles/uklad-na-telefon/reports/slice-16-evidence` (the scripts and the six measurement files).
- The Playwright session was closed and the local start ended with `npm run local:stop` ("Local starts stopped: 1"). `.runs/local-start/` keeps the database directory of that start, which the next start removes by its own rule; it is a file of the product's own tool, not a working copy of mine.
- No screenshot is shown to the human; none was pushed (the cycle shows its set in slice 20).

## Unread material

none (every file and entry of the handoff's *Read* was read whole; the passages of `foundations/decisions.md` by the ranges the handoff gives, D-396 and D-44 entries, D-280 whole; `foundations/glossary.md:259-265` and `:290-295` read within the range 259-298; task lines 28-45 read).

## Searches not found or unclear

- The skill loop2-play says nothing of an account with the owner role or of reaching `#/konta` in a local start; I found the way in `scripts/local-start.mjs` (the database path) and the operator commands in `src/server/` (see above). Not a fault of this slice.
- The handoff's range for D-396 (`foundations/decisions.md:5507-5521`) and the notes' (`:5508-5526`) differ by one line from the file; I read the entry whole (`:5508-5526`).
- Slice 7's token `--touch-target-min` exists in `src/browser/tokens.css` (the stylesheets read it); I did not open `tokens.css` itself, because the slice changes no token.

## Questions and concerns

No question. Concern: no test can protect the two rules (the phone block is not applied by jsdom); the next change that rewrites the shared phone block of `styles.css` or the summary rule of `credits.css` is protected only by a browser check, as the styleguide rule says. For the orchestrator: the Siedziba picture band measurement above is slice 17's, and the long list of accounts at 360 px may be judged by the human on the screenshot.
