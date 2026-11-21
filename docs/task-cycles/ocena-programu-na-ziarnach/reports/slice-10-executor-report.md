# Report — executor of slice 10, task `ocena-programu-na-ziarnach`

**Status:** done

Branch `task/ocena-programu-na-ziarnach`, base `7fc40efc`. Method: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice".

## Commits

| Commit | What |
|---|---|
| `159eca79` | `src/browser/view/judging-lines.ts` (the texts) and `tests/view/judging-lines.test.mjs` |
| `47111517` | `src/browser/view/maps-screen.tsx`, `src/browser/view/maps-entry.ts`, `src/browser/view/judging-result.tsx`, `src/browser/maps-screen.css`, `tests/view/maps-screen.test.mjs` |

Committed by path. The working tree is clean after them.

## Files changed

Added and removed lines, from `git diff --numstat 7fc40efc..HEAD`:

- `src/browser/view/judging-lines.ts` +94 -0 (new)
- `src/browser/view/judging-result.tsx` +57 -0 (new)
- `tests/view/judging-lines.test.mjs` +141 -0 (new)
- `src/browser/view/maps-screen.tsx` +143 -10
- `src/browser/view/maps-entry.ts` +25 -1
- `src/browser/maps-screen.css` +57 -0
- `tests/view/maps-screen.test.mjs` +593 -7

## What was made

- **The texts** (`judging-lines.ts`, pure): the button, its waiting text, the heading, the row of each seed, the sentence under the rows, and the mark beside the list "Program:". The number of seeds comes from `BALANCE.judgingSeeds.length`. The cap in the undecided row comes from `BALANCE.judgingCapMinutes`, declined with `countedName` ("po 1 minucie", "po 4000 minutach"). The cause of a death comes from `deathText` of `now-lines.ts`, the first letter lowered.
- **The result and the mark** (`judging-result.tsx`): `JudgingResult` draws the heading, the rows and the sentence, with the role as a class on each row (`positive`, `danger`, `warning`). `JudgingMarkLine` draws the badge or the count, with the note.
- **The screen** (`maps-screen.tsx`):
  - the button stands in `.maps-who-actions` as `.maps-who-judge`, after „Wejdź” and before „Puść w pętlę”;
  - the state of the judging (waiting characters, standing results) lives in `MapsView` (D-407);
  - the mark stands in `.maps-who-program` after the select list;
  - the result stands last in the row of the character, after the sentence of a waiting map run.
- **The entry** (`maps-entry.ts`): the new control `judge` goes through `store.act`, whose body reads `store.get()` after the clock's reading (D-409), calls `judgeAndRemember` of slice 7 and takes its state. The act gives the judging back, which carries the cause and the minute of each death.

## Checks (command and exit code)

| Check | Command | Exit |
|---|---|---|
| Texts, written first, failing on assertions (7 of 8 cases failed on the stub) | `npm test -- tests/view/judging-lines.test.mjs` | 1 |
| Texts, passing (8 of 8) | the same | 0 |
| Screen, written first, failing on assertions (11 failed, 19 passed) | `npm test -- tests/view/maps-screen.test.mjs` | 1 |
| Screen, passing, three runs in a row (31 of 31 each) | the same | 0, 0, 0 |
| Shared controls | `npm test -- tests/view/shared-controls.test.mjs` | 0 (50 passed) |
| Screen registry | `npm test -- tests/view/screen-registry.test.mjs` | 0 (15 passed) |
| content-identifiers | `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| browser-view-token-values | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| browser-view-framework | `npm test -- tests/invariants/test_browser_view_framework.py` | 0 |
| Mutation selection (run at the end, after the commits) | `npm test -- tests/quality/test_mutation_test_selection.py` | 0, nothing to add |
| Test selection | `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| Other tests that draw the screen Mapy through the game view | `npm test -- <file>` for `end-window-game`, `chronicle-game`, `menu-bar`, `headquarters-screen` and `uncaught-failure` | 0 for each |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1: the three known errors of `tests/view/account-screen.test.mjs` (lines 2683, 2807, 2975, slice 12); no error in a file of this slice |
| Size rules | `node tests/quality/eslint-size-rules.mjs` | 0 ("0 functions and files over a threshold in 335 files") |
| Lint | `npx eslint` on the 4 source files and the 2 test files | 0 |
| Prettier | `npx prettier --check` on the 7 files | 0 |

The full gate was not run; that is the cycle's.

**Failing runs** (the first two rows). Counts and reasons are kept here, since `.runs/executor-10/` is removed.

- `judging-lines`: the stub returned empty strings, so 7 cases failed on `AssertionError`.
- `maps-screen`: the missing button gave `what the case presses stands: expected a true value, got null` or `Cannot read properties of null`, and the case of the row's children gave `expected [... "maps-who-judge" ...], got [...]`.
- The entry case failed the same way until the screen was written.
- Two failures of the first passing attempts came from my own tests and were corrected. A case counted `calls.length`, which included `pick` calls. The mounting in the entry case stood outside `act`.
- A third failure came from the missing class `warning` on the note of the stock.

## Own-work check (WAY-164)

**Weakest point of the slice against its requirement:** "its click draws the button disabled with „Oceniam…” first, and only then makes one call". jsdom proves the order, but not that a browser paints between the two.

- **Check in code:** the case "a click draws the button disabled as „Oceniam…” before the page judges…" presses the button and asserts the disabled button with `aria-busy`, "Oceniam…" and no `judge` call yet. It then waits for the call and asserts the result and the enabled button. The case "a screen taken down while its button waits never asks the page to judge" asserts that no call is made once the screen is gone.
- **Check in the running game** (`npm run local`, Playwright CLI, `https://127.0.0.1:53759`, Chrome of the CLI), by a `MutationObserver` and a `requestAnimationFrame` log around a click on the focused button on Skraj lasu (a map not yet solved) with the new character's program: at +1 ms "Oceniam…" disabled, a frame at +1 ms, the frame at +10 ms, the result at +12 ms, and the focus on the button "Oceń na 12 ziarnach" at the end.
  - This shows that a frame boundary comes between the waiting draw and the judging: by construction, `requestAnimationFrame` then `setTimeout`.
  - It does not show a visible paint, since this judging took about 2 ms. A longer judging, where the wait would be seen, was not made in the browser.

**Mutations tried by hand** (restored after each):

- the CSS rule of a death row set to `warning`: the case of the roles failed;
- the return of the focus (`focus.owe` for the judge button) removed: the focus case failed;
- the clearing of the result at a pick (`judging.clear`) removed: the case "…goes where another program is picked…" failed ("picked back, the old result does not come back").

## Walk of the running product (`walkthrough.md`)

The change alters what a screen shows, so the walk applies. Where checked: Windows 11, Playwright CLI browser, `https://127.0.0.1:53759` (`npm run local` of this worktree), a made-up account at `example.test`. The state of the page was read by `eval` of the page and the console. The browser was closed and the start was stopped.

| Case | By what | Verdict |
|---|---|---|
| The button stands beside „Wejdź” at a character on a map not yet solved (Skraj lasu, the first map of a new game) | snapshot of the page | stands, as `button "Oceń na 12 ziarnach: Ala, mapa Skraj lasu"` |
| The click draws „Oceniam…”, disabled, then the result; the focus stays on the button | `eval` with an observer, see above | right; the focus stays on the button |
| The result: heading "Ocena na 12 ziarnach: 0 z 12 rozwiązanych", twelve rows "Ziarno {i}: mag zamarzł w 243. minucie", the sentence under them; roles | `innerText` and an inspected screenshot | text right; deaths in `danger` (red), heading in `text-strong`, the sentence in `text-secondary`, as the styleguide gives |
| The mark beside the list „Program:” ("0 z 12", `text`) | `innerText` and the screenshot | stands beside the select list |
| After a reload the mark stands (it was saved) and the result is gone | reload, `innerText` | right |
| Console | `console error` | only the two ordinary entries (401 before sign-in, 404 of the favicon); no `uncaught` line |
| Side observation | — | none beyond the above |

**What I did not check in the browser:**

- the row `bez rozstrzygnięcia` (warning) and `rozwiązane` (positive) — the game's data gave deaths only for the new character's program; both are checked in jsdom with the real stylesheet;
- the badge and the note on the stock (jsdom with the stylesheet only);
- a character in a loop or a manual map run (jsdom only);
- a long judging that shows the wait.

**The screenshot** was inspected and not kept: no place was used, nothing was pushed, and the file `.runs/executor-10/judging.png` was removed with the directory.

## Choices (with the way rejected and the cost if wrong)

1. **The yield to the browser.** `window.requestAnimationFrame(() => window.setTimeout(judge, 0))`.
   - Rejected: a bare `setTimeout(…, 0)`, which a browser may run before painting.
   - Cost if wrong: where a browser does not paint within that frame, "Oceniam…" is not seen for a long judging.
   - In tests a case waits for the call through real timers inside one `act` (`until`, up to about 2 s).
2. **Where the result lives.** In `MapsView` state, per character, with `{mapId, programId, judging}`. It is shown only while the card's map and the list's program equal those it was judged for, and it is cleared at a pick, at a change of `props.mapId` (state adjusted during render) and at a new judging.
   - Rejected: an effect that clears it, which is against the guidelines on effects.
   - Cost if wrong: a result judged on a map would stay hidden, not erased, until the map changes. It is erased on the next change of the map.
3. **The focus.** A new owed target "judge" in the existing `OWED_TARGETS`. The focus goes back to the button only if the button had it at the click (`activeElement` at the click).
   - Rejected: always focusing it, which would steal a focus the player moved during the wait.
4. **The label of the button:** `„{text}: {name}, mapa {map}”` with the text being "Oceń na 12 ziarnach" or "Oceniam…", so that the accessible name contains the visible text in both states.
5. **The order in the row:** „Wejdź”, the judging, „Puść w pętlę”. The existing case of `.maps-who-actions` children changed with its reason (the new button stands in the row).
6. **The roles in tests.** The classes `positive`, `danger` and `warning` stand on the rows and on the note, and a case reads the real stylesheet (`gameStylesheetText`) to see which token each lands on. The role "text" is the default colour of `.maps-who-mark`.
7. **The number 12 in the texts** comes from `BALANCE.judgingSeeds.length` (D-18). If the number changed, "Oceń na {n} ziarnach" would follow; the Polish form after "na" would be a thing to look at again.

## Reaches beyond the handoff

- `foundations/decisions.md` D-243 whole (lines 8771-8806), to quote its present first sentence in the two shortened quotations.
- `src/browser/view/controls/react-button.tsx` and `src/browser/sim/types.ts` (the types `Judging`, `SeedResult`, `RememberedJudgings`), to build on the button's `waitingText` and the types.
- `tests/view/page-document.mjs`, `tests/view/game-stylesheets.mjs`, `tests/sim/understanding-fixture.mjs` and `tests/view/run-header.test.mjs` (the pattern of a case that reads the stylesheet), to write the cases.
- `.the-way/task-cycle/change/slice.md`, `ui_check.md` and `walkthrough.md`, and `.claude/skills/loop2-play/SKILL.md`, which the method and the handoff send to.
- `tests/quality/eslint-size-rules.mjs`, to see the size thresholds (D-425, named in `guidelines/coding.md`).
- Once `tests/view/page-document.mjs` was changed to print a stack of React's warning (the unwrapped update in the entry case) and restored at once from a copy; `git status` shows no change in it.

## Problems seen

- **The kitchen-sink page does not hold the state "Oceniam…" of the plain shared button.** The styleguide's rule "States of shared controls" names it as a loading state of the button, and "The kitchen-sink page" asks for a new state of a shared control to stand on the page in the same change. `src/browser/kitchen-sink/` is outside the Change list of this slice, so I left it. The button is the existing `ReactButton` with `waitingText`, which the page already shows for other texts. That page may want a sample of the plain button reading "Oceniam…" (a slice or a finding).
- **A late result across a map change.** A judging asked for on a map and answered after the player has opened another map stores its result for the old map and hides it there. Coming back to the old map first changes `mapId` again, so the result is erased. I checked this in code only, with no case of its own.

## Working copies

- `.runs/executor-10/` (logs of the runs, the probe script, copies of two files, `judging.png`) stood under the ignored `.runs/` of this worktree. It is removed, by its full path; `ls .runs` afterwards shows `local-start`, `quality-venv` and `task-cycles` only.
- `.playwright-cli/` (from the CLI) was removed; the local start was stopped with `npm run local:stop` and the CLI browser was closed (WAY-319).
- `.runs/local-start/` stays: it is the product's own file (the database of that start), outside this rule.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1-730 (roles, rules to "The screen Mapy") and 1189-1213; not read: "The screen Wiedza", "Program editor", "The scene of a map run", "The picture band of Siedziba", "The chronicle of a map run", "The end-of-run window", "The list of accounts" (lines 726-1188), which do not concern this screen.
- `src/browser/sim/data/balance.ts`: read the passages of the judging (cap and seeds) and the start of the file, not the whole.
- The frozen task: only the passages the handoff copies.

## Searches not found or unclear

- none

## Class of model

`same` was enough.
