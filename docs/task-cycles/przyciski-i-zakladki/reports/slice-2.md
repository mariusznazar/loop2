# Report — slice 2 of `przyciski-i-zakladki`

**Status:** done

**Commit:** `06923e1` `feat: :sparkles: set the login card's switch as tabs and its actions under a form as the secondary action, and fix its top edge at 15% of the window's height` (base `14d07fc`). The trailer names `Claude Sonnet 5.5`, as the session's attribution reminder and slice 1's commit do; the handoff text says `Claude Opus 5.5`. Say so if the handoff's line was meant literally.

## Files changed

| File | + / − |
|---|---|
| `/home/user/loop2/src/browser/view/account-card.tsx` | 11 / 2 |
| `/home/user/loop2/src/browser/styles.css` | 11 / 6 |
| `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/screenshots/*.png` (12 files, ignored by git, not committed) | — |

What changed:
- `account-card.tsx`: „Nie pamiętam hasła”, „Wróć do logowania” and „Anuluj” are `<ReactButton kind="secondary">`; „Zaloguj się” and „Załóż konto” in the switch are `kind="tab"` with `selected`, inside `<div className="account-card-switch tabs">`. Handlers, `disabled={lock.locked}` and `open()` (which moves focus to the address field, D-260) are untouched. Submit buttons keep `submit`.
- `styles.css`: `.account-card-screen` has `align-items: flex-start` and `padding: 15vh var(--space-l) var(--space-xl)` in place of `align-items: center` and the symmetric padding; its comment now says the top edge is fixed at 15 % and no longer speaks of the middle. The comments of `.account-card-switch` (two tabs in a `tabs` container) and `.account-form-switch` (the secondary action) fit the new looks. No new token and no value in place of one (`15vh` is exempt by D-43).

## Checks (command, exit code)

| Check | Exit |
|---|---|
| `npm test -- tests/view/account-screen.test.mjs` (100 pass, 0 fail, unchanged) | 0 |
| `npm test -- tests/view/react-controls.test.mjs` (29 pass) | 0 |
| `npm run typecheck` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` (4 tests) | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` (3 tests) | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` (5 tests; includes ESLint and Prettier) | 0 |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/styles.css src/browser/view/account-card.tsx` | 0 |
| the game by `.claude/skills/loop2-play/SKILL.md`: `npm run local`, screenshots and measurements below, `npm run local:stop` ("Local starts stopped: 1") | 0 |

Not run: `npm test` with no argument (the cycle's gate, not this slice's). No invariant test was written or changed, so there is no failing run to record. No case of `tests/view/account-screen.test.mjs` broke, so none was changed.

## Own-work check of the user interface

**Requirement most likely not met:** „the tabs and „Autorzy grafiki” keep their top position between the states and when the credits unfold” (pytanie 4), and the look of each state of D-259 and the focus on a tab and on a secondary action (pytania 1a, 2c, 2a).

**How:** the Playwright library, not the CLI (`playwright-cli` is not installed here, orchestrator's choice Q4), `chromium.launch()` with a context at 1280 × 800 and `ignoreHTTPSErrors: true`, against `https://127.0.0.1:36369`. Layout read with `getBoundingClientRect().top` in the page. The scripts stand in the scratchpad (`/tmp/claude-0/-home-user/3ebadaf3-39b4-5e1f-a5be-1c18fe7c07c8/scratchpad/shots.js`, `reset.js`) and were not committed.

**Top positions (px, window 1280 × 800):**

| State | card top | tabs top | „Autorzy grafiki” top | card bottom |
|---|---|---|---|---|
| „Zaloguj się” | 120 | 223.77 | 449.70 | 491.50 |
| „Załóż konto” | 120 | 223.77 | 464.48 | 506.28 |
| „Zaloguj się”, credits unfolded | 120 | 223.77 | 449.70 | 683.47 |
| „Zaloguj się”, refusal under the form | 120 | 223.77 | 475.89 | 517.69 |
| „Załóż konto” reached by keyboard (Tab, Enter) | 120 | 223.77 | 464.48 | 506.28 |
| „Nie pamiętam hasła” | 120 | no tabs | 391.53 | 433.33 |
| „Nie pamiętam hasła” with the answer | 120 | no tabs | 454.09 | 495.89 |
| „Ustaw nowe hasło” (fresh load with `#reset-password=`) | 120 | no tabs | 454.09 | 495.89 (card top 120) |

- Card top is 120 = 15 % of 800 in every state.
- The tabs stay at 223.77 between „Zaloguj się”, „Załóż konto” and the refusal; „Autorzy grafiki” stays at 449.70 when the credits unfold.
- **„Autorzy grafiki” does not keep its top between the states.** It stands below the form, so it moves with the form's height: +14.78 px from „Zaloguj się” to „Załóż konto” (an extra field), +26.19 px with a refusal under the login form (the sentence), −58.17 px in „Nie pamiętam hasła”. The task's pomiar says it does not move on unfolding and the tabs do not move; it says nothing of a fixed position across states, and the card's design cannot give one without fixed form heights. This is a finding, not a defect of the slice.
- The reset line in the earlier run of the script used the same document and a hash change, so it showed the previous state; the row above is from a fresh load (`reset.js`) and the screenshot `11-…` is from it.

**Screenshots** (`/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/screenshots/`), all at 1280 × 800 on the picture of the game, all opened and read:
- `01-login.png` — „Zaloguj się”: selected tab with the thick light line and strong text, „Załóż konto” grey, thin line under both; the main button framed in the text's colour; „Nie pamiętam hasła” underlined text, level with the fields.
- `02-register.png` — „Załóż konto”: the selected line has moved to it; focus ring on the address field (focus went there, D-260).
- `03-request.png` — „Nie pamiętam hasła”: heading, no tabs, „Wyślij odnośnik” main, „Wróć do logowania” underlined text.
- `04-request-answer.png` — the answer under the form: text in `text` with a bar at its left; the field empty, form stays. The main button shows the hover background because the mouse had just clicked it.
- `05-login-credits-unfolded.png` — credits unfolded, card grows downward, everything above unchanged.
- `06-login-refusal.png` — „Nieprawidłowy adres e-mail lub hasło.” in `warning` under the main button, above the secondary action.
- `07-focus-tab-login.png`, `08-focus-tab-register.png` — keyboard focus ring on each tab (Tab reaches both in order).
- `09-focus-secondary-action.png`, `10-focus-secondary-back.png` — keyboard focus ring on „Nie pamiętam hasła” and on „Wróć do logowania”.
- `11-reset-new-password.png` — „Ustaw nowe hasło” opened by `#reset-password=`; main „Ustaw hasło”, secondary „Anuluj”.
- `12-reset-focus-cancel.png` — keyboard focus on „Anuluj”.

**Keyboard behaviour checked in the same run:** Tab → „Zaloguj się”, Tab → „Załóż konto”, Enter on it opens the register form and puts focus on the address field (`autocomplete="email"`); Space on „Zaloguj się” does the same for the login form.

**States not captured:**
- the card locked while a form waits for the server (the server answers at once here, so the disabled tabs, the secondary actions and the waiting main button are not on a screenshot; `account-screen.test.mjs` covers the lock, and the looks of those states were checked by slice 1 on a scratch page);
- hover on a tab and on a secondary action (only the main button's hover shows incidentally in `04`);
- field problems of „Załóż konto” and „Ustaw nowe hasło” (`warning` under a field), a refusal under „Nie pamiętam hasła” and under „Ustaw nowe hasło”;
- windows other than 1280 × 800, so a narrow window where the card is narrower than 400 px, and a window shorter than the card at 15 vh, where the page grows taller (not measured);
- the screen reader (as in the audit).

**Mutation by thought:** reverting `kind="tab"`, `kind="secondary"` or the `tabs` class in the card would pass every test of `account-screen.test.mjs` (they find controls by text and attribute) and only the screenshots show it. That is passing data to a shared control with no rule of its own, which `guidelines/testing.md` (choosing the level) puts outside a separate permanent test; the shared control's two forms are protected by the cases of `react-controls.test.mjs` from slice 1. Reverting `align-items: flex-start`/`15vh` is caught by no test either; the measurement above is the only check (jsdom computes no layout).

## Reaches beyond the handoff

- `.the-way/task-cycle/change/SKILL.md` and its `slice.md` and `ui_check.md` (the method named in the handoff and by it, `ui_check.md` because the change alters what a screen shows).
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md` lines 1-80 (choosing the level), `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`: all named by the handoff.
- Not read: the foundation entries `foundations/decisions.md` (D-36 … D-278), `foundations/invariants.md`, `part_map.md`, `glossary.md`. I relied on the task's *Decisions in play* and *Questions to settle* and on the guideline files, which cite them; the slice edits no foundation entry and the three invariant tests passed. A rule in one of those entries that the task's text does not carry could have been missed.
- `src/browser/view/credits-section.tsx` (read to see what „Autorzy grafiki” is).
- `src/browser/styles.css` lines 285-440 (read whole around the edit; the rest of the file not).
- `tests/view/account-screen.test.mjs`: grep for class and name checks only, not the ranges 1-160 and 3384-3620 whole.

## Searches not found or unclear

- The handoff's commit-trailer line says `Claude Opus 5.5`; the session's own attribution reminder says `Claude Sonnet 5.5`. I used the latter (it is the model that made the commit).
- The task's pomiar (Questions, pytanie 4) says tabs and „Autorzy grafiki” do not move; it does not say whether „Autorzy grafiki” should stand still across states with different form heights. I read it as the unfolding and the tabs (see the table).

## Choices

- **Container class kept next to the card's own:** `account-card-switch tabs` — rejected: replacing the card's class with `tabs`, which would drop its `display: flex`, `gap` and `margin-bottom`. Cost if wrong: none, the card's class carries only layout.
- **Top edge by padding of the screen, not by margin of the card:** `padding-top: 15vh` on `.account-card-screen` — rejected: a margin on `.account-card` (the same position, but the screen's padding already holds the spacing and the comment). Cost if wrong: none visible; the measurement shows card top 120 at 800.
- **Bottom padding kept at `--space-xl`**, side padding at `--space-l`: the horizontal layout stays as the task asks.
- **No test added:** see the mutation note; adding one would be a file beyond *Change*.

## Problems observed

None in the slice. In the first script run the reset state was captured on the same document by a hash change and showed the previous state (cause is a guess: the page does not seem to re-read the fragment on a hash change of a loaded card; I did not verify it, and retook screenshot 11 on a fresh load); this is a limit of my script, not a finding about the page's behaviour for a player who follows a link.
