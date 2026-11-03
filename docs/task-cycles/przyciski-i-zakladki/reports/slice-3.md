# Report — slice 3 of task `przyciski-i-zakladki`

**Status:** done

**Commit:** `1975f89` — `feat: :sparkles: show the main button, the secondary action and the tabs in every state on the kitchen-sink page and the answer to a request in its own look` (on `claude/lucid-ptolemy-jl068t`, base `06923e1`, not pushed).

## Files changed (added / removed lines)

| File | + / - |
|---|---|
| `/home/user/loop2/src/browser/kitchen-sink/kitchen-sink.ts` | 96 / 18 |
| `/home/user/loop2/src/browser/kitchen-sink/kitchen-sink.css` | 9 / 0 |

## What was made

- **Rows of the table "Wspólne kontrolki w stanach"** (DOM form only, no `.tsx` reached): „Przycisk”, **„Przycisk główny”** (`createButton(…, { submit: true })`, so the main look comes from `type="submit"` and no kind of its own), „Przycisk niszczący”, „Przycisk wybrany w grupie”, **„Akcja poboczna”** (`kind: "secondary"`), **„Zakładka niewybrana”** and **„Zakładka wybrana”** (`kind: "tab"` plus `setButtonSelected(button, false|true)`, each inside a `div.tabs`, the container class a screen sets, so the thin `divider` line shows), then the lists and fields as before.
- **States**
  - Main button: default, hover (existing `highlight` rule), focus, disabled, loading as its waiting („Zaloguj się” → „Logowanie…”); error and empty with the button's reasons.
  - Secondary action: default, hover, focus, disabled; error and empty with the button's reasons; loading with its own reason: „Nie dotyczy: na serwer czeka tylko przycisk, który wysyła formularz; akcja poboczna jest wtedy wyłączona (D-275).”
  - Tab (both rows): default, hover, focus, disabled (text `text-disabled`, line of the choice kept); error and empty with the button's reasons; loading with its own reason: „… zakładka jest wtedy wyłączona, z linią wyboru (D-276).”
  - Both loading reasons are true of the card: `account-card.tsx` passes `disabled={lock.locked}` to every secondary action and tab.
- **Forms section:** the form „Nie pamiętam hasła” with the answer was already on the page; it now shows the answer in `text` with its bar, from `styles.css` (screenshot below). Nothing needed to be added to the forms.
- **Comments:** „The six shared controls of D-44” is now „The seven shared controls of D-44 …”, with the two looks beside the button named (D-274, D-276); the comment of `formSample` says the sentence stands „in `text` with a bar at its left”, not `text-secondary`; the comment of `forced` mentions the secondary action's own hover; the header comment's over-long line is rewrapped.
- **`kitchen-sink.css`:** one new rule, `.button.secondary.sample-hover { color: var(--text); background: transparent; }`, tokens only, no `outline`; without it the existing `.button.sample-hover` would have drawn `highlight` under a hovered secondary action, which `.button.secondary:hover:not(:disabled)` in `styles.css` does not. The main button's and the tab's hover are reached by the existing rule (their real hover is the `highlight` background with frame and text unchanged).

## Checks (command → exit code)

| Check | Exit |
|---|---|
| `npm run kitchen-sink -- --build-only` | 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 (3 tests) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests) |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 (3 tests) |
| `npm run typecheck` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (5 tests) |
| `npx prettier --no-config --no-editorconfig --check src/browser/kitchen-sink/*` | 0 |

The page was also served by `npm run kitchen-sink` (HTTP on `127.0.0.1`, port picked by the system) and inspected in Chromium through the Playwright library (`playwright-cli` is not installed; orchestrator's choice Q4; `ignoreHTTPSErrors: true` set, though the page is served over plain HTTP); no console or page errors. Screenshot of the whole page: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/screenshots/kitchen-sink-full.png`. The full `npm test` was not run (handoff: the cycle runs it). No invariant's test was added or changed, so there is no failing run to record.

## Own-work check (section 3, `ui_check.md`)

**Requirement most likely missed:** the hover sample of the secondary action must be drawn as the game draws its hover (text in `text`, background unchanged), and every other new look must be drawn as the game draws it, from the game's own rules.

**Check:** in the served page I read `getComputedStyle` of each sample in each state, and compared the secondary action's hover sample with a real hover (`mouse.hover` on the same button with the sample class removed). Results:

- Secondary hover, sample: `rgb(212,212,216)` (`text`), background transparent, underline; real hover: identical.
- Main button: default `rgb(244,244,245)` (`text-strong`), weight 500, frame 1px in the same colour, no fill; hover: background `rgb(39,39,42)` (`highlight`), text and frame unchanged; disabled and waiting: `rgb(82,82,92)` (`text-disabled`), weight 400, frame `control-border`.
- Secondary: `rgb(159,159,169)` (`text-secondary`), underline, no frame at the sides; disabled `text-disabled`, underline kept.
- Tab selected: `text-strong`, weight 500, 2px bottom line in `selected`, `aria-pressed="true"`; not selected: `rgb(141,141,151)` (`text-label`), transparent 2px line, `aria-pressed="false"`; disabled: `text-disabled`, selected one's line kept; hover: `highlight` background.
- The screenshot shows all the rows, the group's thin line under each tab sample, and the answer of the request form with its left bar in `text`.

Not checked in a browser: the dark-versus-light scheme (the page has one), and narrow-window layout of the new rows beyond the 1500 px viewport; keyboard focus was seen only as the sample's outline (`sample-focus`), not by pressing Tab.

Mutations considered: dropping `setButtonSelected` for tabs (the aria-pressed read-out above would show `null`); a tab sample outside `.tabs` (no group line in the screenshot); the new CSS rule deleted (the secondary hover sample would then be drawn in `highlight`; I reasoned this from the cascade and did not run the page without the rule, so no failing run exists); no test covers the page's contents, only the build and the invariants above.

## Choices made

1. **Main button and tab as rows beside the seven controls** rather than as extra states of „Przycisk”: D-44 lists seven controls, D-274 says the main button is no new control and D-276 says a tab is the selected-in-group button drawn as a tab, so the page names them as looks, in rows of their own. Rejected: folding them into the „Przycisk” and „Przycisk wybrany w grupie” rows. Cost if wrong: two rows to merge.
2. **Waiting sample of the plain „Przycisk”** changed from „Zaloguj się” → „Logowanie…” to „Wyślij ponownie” → „Wysyłanie…” (the header's button, a real non-submit plain button that waits, D-44): the old sample was a plain button reading the login form's waiting text, which no longer exists since every submit button has the main look. The main button's row now shows the login form's waiting. Cost if wrong: one string.
3. **Tabs shown inside `div.tabs`** so the group's line is on the page; a lone tab with the group's line under it is the card's own markup with one tab. Rejected: a bare tab with no line (hides D-276's line of the group). Cost if wrong: the wrapper is removable in `inTabs`.
4. **Reasons for loading of the secondary action and the tab** are worded by me in the page (the handoff says „in the page's words”): the state does not apply because only the button that sends the form waits; the control is then disabled. They cite D-275 and D-276. Slice 4 (styleguide) should word its list of the controls that depart from the states list consistently with these.
5. **Error and empty** of the secondary action and the tab reuse the button's reasons („przycisk nie ma niepoprawnej wartości” and „… pozycji ani wpisu”), as the task says (pytania 1a, 2c: as to the button).

## Reaches beyond the handoff (section 1)

- `foundations/decisions.md` D-274, D-275, D-276 (and D-44, D-222) were read as the handoff names them; no other foundation passage was needed.
- `tests/invariants/test_application_build_kitchen_sink.py` (first 80 lines), to see what the build check covers (what it asserts about the page). Why: to know whether a change to the page's imports would be seen.
- `src/browser/view/account-card.tsx:306-330, 586-615`, to verify that secondary actions and tabs are disabled while the card is locked (the basis of the two loading reasons).
- `.runs/task-cycles/przyciski-i-zakladki/reports/slice-1.md` (first 80 lines), to read what slice 1 made.

## Searches not found or unclear

- `foundations/decisions.md` D-279, named by D-44 and D-274 („a bar … in its own colour (D-279)”), I did not read: the handoff did not list it and nothing in the slice needed it.
- The task's wording „Strona wszystkich stanów pokazuje … zakładki” does not say whether the tabs are to be shown as a pair in a group or one by one in a states table; I chose the states table (one row per selected/not selected), each in a `tabs` container.
- `playwright-cli` is absent (known; Playwright library used instead). The page is served over HTTP, so `ignoreHTTPSErrors` had no effect.
- No test covers the kitchen-sink page's contents; the build, token-value and focus-outline invariants do not look at which rows exist.

## Problems observed

- None in the code of this slice. The tab rows are tall on the page because of the long „Nie dotyczy” reasons in the last column (the column is 160px wide); a guess: shorter reasons would help, but they follow the styleguide's pattern of stating the reason.
