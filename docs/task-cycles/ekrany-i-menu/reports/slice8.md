# Slice 8 — The game's screens by address

- **Status:** done with concerns
- **Branch:** `task/ekrany-i-menu`, from `ff62598`; the-way pin `f45ca40724251a46965aed69f733d0a35c430048` (matches the gitlink).
- **Commit:** `649e25d` — feat: :sparkles: show one screen at a time by its address, pause a map run on leaving its screen and give the bar its place

## What changed and why

| File | + | − | What |
|---|---|---|---|
| `src/browser/view/game-view.ts` | 277 | 68 | Holds the current `Screen`; builds Siedziba (program panel beside the headquarters), Programy (program panel alone) and Przejście once and hides those not shown; moves the one program panel into the screen that holds it; builds Postać on entering and disposes it on leaving. Picks the first screen by the entry (`sign-in` → Siedziba or the state's map run; `link` → Siedziba; `address` → the fragment's screen, or Siedziba/map run with no fragment) and writes its fragment with `replace`. Listens to the address: a fragment that names no existing screen opens the nearest one and is replaced (no new entry). A send shows Przejście and „Zakończ” Postać, each with `go` (a new entry). Leaving Przejście pauses a map run that goes on through `setPaused` (a moment of saving); a return resumes nothing. Tells the page its place (`onScreen`) at the first screen and at each change, with `returnToRunEntry` outside the map run's screen. A clock reading rewrites Siedziba's lines (`headquarters.tick`) and Postać's (`update`) whenever they show, also while a map run waits. `dispose()` removes the address listener and pauses nothing. |
| `src/browser/view/run-screen.ts` | 90 | 0 | New DOM module: the program panel with the copy beside the column of the map run (status row, discovery, combat line, trip lines, body row, practice, terrain panel), moved from `game-view.ts` as they stood; `update(state, run)` takes the map run as a parameter and hands the parts `{ ...state, run }`, their signatures unchanged; `focus()`. |
| `src/browser/view/email-confirmation.ts` | 36 | 6 | `PageAddress` gains `go(hash)`, `replace(hash)` and `onChange(listener) → remove`; `browserAddress` does them through `history.pushState`, `history.replaceState` and the window's `hashchange`; outside a browser it writes nothing and hears nothing. |
| `src/browser/view/app.ts` | 60 | 10 | Keeps the entry that builds the next game (`address` at start and after a conflict, `link` after a confirmation and after „Anuluj” or a refused link of „Ustaw nowe hasło”, `sign-in` from the card) and passes it with the address and `onScreen` to the game view; the bar gets the view's place (`screen`, `returnEntry`); the page's sentences above the first screen are removed at the first change of screen (D-286). |
| `src/browser/view/character-screen.tsx` | 8 | 1 | The host element takes `tabIndex = -1` and the API gains `focus()`, for the focus a change of screen gives. |
| `src/browser/styles.css` | 14 | 5 | `.screen` (one-column grid) and `.screen.columns` (two columns, one under the other below 720 px) replace `.columns`; `.screen-area` replaces `.program-panel, .map-column` as the look of an area — each column an area of its own (D-282). |
| `tests/view/account-screen.test.mjs` | 766 | 26 | The test address gains a history of its own (`go`, `replace`, `onChange`, `follow`, `back`, `forward`, `listening`); the cases that assumed one page changed with their reason (see below); a new section „the screens by address” with 15 cases; a case of the real `browserAddress` on jsdom's history. |

Cases changed with their reason:

- „signing in and out again and again keeps at most one clock running”: counted `.columns` elements (one page); now counts `.game-view` elements, since one game holds several screens.
- „a refused save starts a new game…”: the third child of `main` was `.columns`; now the game's element `.game-view`.
- „each act of the player…”: the acts run inside `act`, because a send and „Zakończ” change the screen and the bar redraws with React.
- „a manual map run hides the report with the headquarters, and „Zakończ” shows it” → „…„Zakończ” opens Postać without it, and Siedziba shows it on being reached” (D-246 as changed by the foundation step, D-53): „Zakończ” now leads to Postać; the report shows on reaching Siedziba.
- `viewOf` and the `keep()` case pass the new options (`address`, `entry: "address"`, `onScreen`).

`tests/view/email-confirmation.test.mjs` is in the slice's *Change* list but is unchanged: it is not on jsdom (it takes `assert` from `node:assert`, D-268), and the real `browserAddress` needs a `location`/`history`, so its case stands in `account-screen.test.mjs`, which the harness gives a window. Its fake address needs no new method, since `confirmFromAddress` reads and clears the fragment only.

## Checks

Each as command and exit code. Run from the worktree root.

Tests written first, seen failing for the expected reason (build before the code change, run 1):

- `npm test -- tests/view/account-screen.test.mjs` → exit 1: 20 new or changed cases failed at their assertions, among them the two the plan names first — „a reload at #/postac/1 while the save holds a map run opens the screen Postać of Ala…”: `expected "character", got "run"`; „leaving the screen of a map run that goes on pauses it…”: `expected "headquarters", got "run"`. The `browserAddress` case stopped on `address.go is not a function` in that run, because that build preceded my edit of `email-confirmation.ts`; it reached its assertions in every later run.

After the code:

- `npm run typecheck` → 0 (after fixing two type errors: `GameState.run` is a `GameMapRun`, and `state.run` narrowed to `null` across `clock.send`, read again through `store.get()`).
- `npx prettier --no-config --no-editorconfig --ignore-path .gitignore --check <the 7 files>` → 0.
- `npx eslint --max-warnings 0 <the 6 TS/JS files>` → 0 (after fixing the two `no-unsafe-*` findings that followed the narrowing error).
- `npm test -- tests/view/account-screen.test.mjs` → 0, 116/116 (run 2). After the later edits (the own-work additions, the conflict-after-sign-in case, the focus rule) → exit 1 in run 3: 114/116, two cases failing — the focus rule did not fire on jsdom (focus stays on a hidden element there) and a click outside `act` redrew Postać; both fixed (focus rule widened to „on a hidden screen of the game”, `press` instead of `fire`) → run 4: exit 0, 116/116.
- `npm test -- tests/view/email-confirmation.test.mjs` → 0 (5/5).
- `npm test -- tests/view/screen-address.test.mjs` → 0 (39/39).
- `npm test -- tests/view/character-screen.test.mjs` → 0 (7/7).
- `npm test -- tests/view/clock.test.mjs` → 0 (23/23).
- `npm test -- tests/view/status-row.test.mjs` → 0 (29/29).
- `npm test -- tests/invariants/test_browser_view_token_values.py` → 0 (4 tests), run again after the last stylesheet state → 0.
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` → 0 (3 tests).
- `npm test -- tests/invariants/test_browser_view_framework.py` → 0 (9 tests).
- `npm test -- tests/quality/test_quality_invariants.py` → 0 (5 tests), run again after the last code edit → 0.

Not run: the full `npm test` and `foundation_check.py` — the gate is the orchestrator's (the slice's *Checks* do not name them). No invariant test was changed; none of the cases I wrote is an invariant's test.

## Own-work check

- **Requirement most likely missed:** leaving Przejście through the browser's forward or back button (not a link) must pause the map run too, and the focus after a change of screen must not be lost — „its slips are history and focus faults a document imitation hides”.
- **Check:** in the leave case, after returning to the run and pressing „Wznów”, `forward` to `#/` must send `submission({ ...passing(), paused: true }, 7)`; in the send/„Zakończ” case, `document.activeElement` must be the run screen after a send and the Postać host after „Zakończ”; in the back/forward case, the shown screen after a link that left the bar and after `back`. The jsdom check first showed the focus rule not firing after `back` (jsdom keeps focus on a hidden element where a browser drops it to the body); the rule now also moves focus from a hidden screen of the game, and the case passes. The real browser (below) showed the same fault live — after „Wróć do przejścia” the link left the bar and focus fell to the body — and shows it fixed.
- **UI check** (`ui_check.md`): the states of the affected components the styleguide requires — the bar's marked item (text in `text-strong`, line in `selected`), no item marked on the run's screen, „Wróć do przejścia” as a link, the areas on `panel` with `text` — checked in code against the rule „Menu bar, the menu „Konto” and the list of programs” and D-282, and inspected in screenshots of the running product by the settled route (below): the run screen with no item marked, Postać with Siedziba marked and „Wróć do przejścia · Las · minuta 39”, Siedziba with its way back. The screenshots were deleted with `.playwright-cli/` as the route gives.

## The real browser (orchestrator's ruling)

Route: `npm run local` (address `https://127.0.0.1:61607`), Playwright CLI 0.1.22, an account `agent-slice8@example.test` made through the login card, a character „Ala”; ended with `playwright-cli close`, `npm run local:stop` („Local starts stopped: 1”) and `rm -rf .playwright-cli`. Each step with what was read from the page (`location.hash`, `history.length`, the shown `.screen`, the bar's `aria-current`, `document.activeElement`, the status text):

1. After registration: `#/`, Siedziba shown, Siedziba marked.
2. „Wyślij” at Ala: `#/postac/1/przejscie`, `history.length` 2 → 3 (a new entry), the run screen shown, no item marked, focus on the run screen, „Minuta 5 · …” growing.
3. `goto …#/postac/1` (a fragment change, as a link): Postać shown with „Ala”, Siedziba marked, „Wróć do przejścia · Las · minuta 39”; the map run paused at minute 39.
4. **Reload at `#/postac/1`**: stays on Postać, same bar, status row hidden, address unchanged, `history.length` 4.
5. **Back**: `#/postac/1/przejscie`, the run screen shown, „Minuta 39 · … (pauza)”, no item marked. **Forward**: `#/postac/1`, Postać. Back twice: `#/`, Siedziba marked.
6. Link „Programy”: `#/programy`, `history.length` +1, Programy marked, „Wróć do przejścia” standing, focus stays on the link. Link „Wróć do przejścia”: the run screen, paused, „Wznów,1×,2×,4×,8×,16×,Restart,Zakończ”.
7. „Wznów”, two seconds, link „Siedziba”: „Wróć do przejścia · Las · minuta 44”; back to the run: „Minuta 44 … (pauza)”, still 44 two seconds later — the leave paused it.
8. „Zakończ”: `#/postac/1`, Postać shown with focus on it, no „Wróć do przejścia”. Back: stays at `#/postac/1` on Postać (the entry of the gone map run replaced).
9. After the focus fix and a rebuild: back from Programy hands focus to Postać's host; a send again, „Siedziba”, „Wróć do przejścia”: focus on the run screen, „Minuta 4 … (pauza)”.

One slip of mine during the walk: after a reload Playwright's refs carry a prefix (`f1e8`), which my first pattern missed, so three "clicks" went to an empty ref and changed nothing; repeated with the right refs, every one behaved. No product fault behind it.

## Choices made (beyond the plan)

- **The first screen's fragment is written for every entry** (`replace`, no new entry), also after the sign-in form and a link, so a reload returns to it and the previous player's address never stays in the bar. Rejected: writing it only when the address named no screen — a sign-in at `#/programy` would show Siedziba under an address of Programy. Cost if wrong: one `replaceState` at each build.
- **Focus after a change of screen:** a send focuses the run screen, „Zakończ” Postać (their buttons leave with their screens), and a change through the address focuses the shown screen where focus stands on the body or on a hidden screen of the game; a link that stays in the bar keeps it. The screens' root elements take `tabIndex = -1` for it, so the one `:focus-visible` rule draws the outline round the screen when the keyboard reaches it. Rejected: no focus handling — after „Wyślij” the keyboard would start from the top of the document (seen live after „Wróć do przejścia”).
- **A hashchange to an emailed link's fragment while the game stands** (`#confirm-email=…`, `#reset-password=…`) opens Siedziba and replaces the fragment, as the plan's list of crafted fragments asks. The link is then not acted on in that tab; a player who pastes a link into the tab of a standing game has to open it in a new tab. Rejected: running the page's start again — a new way through `app.ts`; the case is rare (mail clients open a new tab). Named here as a concern.
- **`#/programy/{n}` shows Programy with the panel's own pick**, not program n: the plan leaves the list to Slice 10 („the program panel alone, until Slice 10”).
- **The one program panel moves between the screens** (DOM move) rather than three panels: one view state (the program shown) and one editor; moving a focused editor field blurs it, which commits its text — the panel's own rule on changing the program shown.
- **Hidden screens are updated at every state change** as before (the headquarters was updated while hidden during a run already); the run screen only while the state holds a map run.
- **`run-screen.ts` is a DOM module** composing the DOM parts, as the plan says. The coding guideline „Nowy ekran i moduły w DOM” and D-265 say a new screen is not written after a DOM module's pattern; this screen is today's map-run column given a module of its own (task: „Ekran przejścia … pokazuje to, co dziś stoi przy przejściu … nowy układ robi zadanie 6”), with its parts' signatures unchanged, which I take as the plan's intent; the module's header says so. The reviewer may weigh it. It has no row in the guideline's table (not in my *Change*).

## Mismatches of plan and code

- None structural. Small: the plan's „`#/programy/-1`” names no screen at all under Slice 3's pattern (`[1-9][0-9]*`), so it opens Siedziba, not Programy; the case lists both it and `#/programy/9` (no such program → Programy).
- The plan names `tests/view/email-confirmation.test.mjs` under *Change*; unchanged for the reason above.

## Reaches beyond the handoff

- `src/browser/sim/types.ts` (`GameMapRun`, `MapRun`) — for the run screen's parameter type, where the typecheck showed `MapRun` lacks the copy and trip fields.
- `node_modules/jsdom/lib/jsdom/living/window/{History-impl,SessionHistory}.js` — to learn that jsdom fires `hashchange` on `history.back()` through a queued task, which decides how the `browserAddress` case waits (a promise on the next `hashchange`, 2 s limit, no mocked timers).
- `tests/invariants/test_browser_view_token_values.py` (its docstring) — to confirm `grid-template-columns` and `min-height` are layout dimensions exempt from the px rule before writing the stylesheet.
- `playwright-cli --help` — the commands `goto`, `go-back`, `go-forward`, `reload`, `screenshot`.
- The styleguide rule „Menu bar…”, read whole as the handoff names, is what the UI check compared against.

## Mutations considered

Each of these is caught: no pause on leaving (leave case); the entry's first screen ignoring the address (reload cases); `go` and `replace` swapped (entries assertions); no `onScreen` at a change (bar cases); sentences not removed (sentence case); Postać not disposed (hosts case); listener not removed (`listening()`); the tick refreshing only without a run (Q14 case); `entry` not set to `link`/`sign-in`/`address` (first-screen, emailed-link and conflict-after-sign-in cases). Not caught: `run-screen.ts` reading `state.run` instead of its parameter — equivalent while the state holds one map run, which is this slice's world; named for the reviewer.

## Concerns

- The emailed-link fragment arriving by hashchange is swallowed (above).
- D-287's sentences beside the inactive „Wyślij” on Siedziba while a map run waits are not this slice's (the headquarters is not in its *Change*); the screenshot of Siedziba shows „Wyślij” inactive with no sentence yet.
- `history.length` read 2 right after registration in the walk (one entry of the opened tab plus the page's); `replace` added none, as the later readings show.

## Searches not found or unclear

- Unclear: whether „`#confirm-email=…` and `#reset-password=…` beside a screen's address” in the plan means those fragments arriving while the game stands, or a fragment combining both (`#/postac/1#confirm-email=…`); the cases cover both readings (both open Siedziba).
- Unclear: what change the plan expected in `tests/view/email-confirmation.test.mjs`; none was needed.
