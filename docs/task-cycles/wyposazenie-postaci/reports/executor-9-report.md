done

# Executor-9 report: Slice 9, the icon of „Załóż”

Status: done. Commit `75df8a09` on `task/wyposazenie-postaci` (base `04a81323`), by path.

## Files changed

| File | Added | Removed |
|---|---|---|
| `assets/icons/gloves.svg` (new) | 1 | 0 |
| `src/browser/view/credits.ts` | 5 | 0 |
| `tests/invariants/test_icon_credits.py` | 4 | 1 |
| `tests/view/icons.test.mjs` | 2 | 0 |

## Choices

- **Icon file.** Taken from the pinned commit `82d948812bfe3f269ef8f731dcdb07b08160edc4`, path `delapouite/gloves.svg` (HTTP 200). I removed the background path `<path d="M0 0h512v512H0z"/>` and changed the shape's `fill="#fff"` to `fill="#f4f4f5"`, the one colour `icons.test.mjs` allows. The file has no trailing newline, as 22 of the 24 icon files do. Rejected: taking it from the game-icons.net page, as `wood-pile.svg` was, because the commit holds the file. Cost if wrong: small; the file would need a different credit text.
- **Credit.** `gloves` in `ICON_CREDITS`: author Delapouite, page `https://game-icons.net/1x1/delapouite/gloves.html`, the shared `CHANGES` text. Placed last in the object; the section order comes from the data (`credit-lines.ts`), not from this object.
- **Test lists.** `icons.test.mjs`: `gloves: "Gloves icon"` in `TITLES`; `{ name: "Załóż", icon: "gloves" }` as the last entry of `ACTION_ICONS` (the action's label, after „Odskocz”). `test_icon_credits.py`: `"gloves.svg": "Delapouite"` in `AUTHORS`, `"gloves.svg": "Gloves icon"` in `TITLES`, and the environment fact `game-icons-gloves-title` added to the comment list.

## Checks (command, exit code)

- `npm test -- tests/view/icons.test.mjs`: 0 (45 of 45 pass).
- `npm test -- tests/view/account-screen.test.mjs`: 0.
- `npm test -- tests/view/end-window-game.test.mjs`: 0.
- `npm test -- tests/invariants/test_icon_file_content.py`: 0 (2 of 2).
- `npm test -- tests/invariants/test_icon_credits.py`: 0 (3 of 3).
- `python -B .the-way/elements/common/foundation_check.py`: 1, with 2 errors: `tests/view/character-screen.test.mjs:134` (no binding sentence of D-446) and `:400` (D-445). Neither file is in this slice, and my change adds no error. I did not run the base to compare, so the 2 errors are attributed by file, not measured.
- Other `tests/view/` files that draw the credits section (found by searching for `CreditsSection`, `credit`, `Autorzy`, `startApp`, `createPagePlaces` and similar): `chronicle-game`, `end-question`, `end-window-lines`, `end-window`, `headquarters-screen`, `judging-cache-page`, `login-card-focus`, `owner-panel`, `previous-save`, `run-screen`, `uncaught-failure`. Each run with `npm test -- <file>` exited 0. None printed `credit-lines: no credit for the icon`. I did not run the base for them, since none failed.
- `npx prettier --check src/browser/view/credits.ts tests/view/icons.test.mjs`: 0.
- `ruff format --check`: not run. `python -m ruff` is not installed here and `.runs/quality-venv` is not in this worktree, so the Python formatter check is unchecked.
- Not run: the full suite and the one command, as the slice and handoff forbid.
- Tests failing on the base: none after my change, so no base run was needed.

## Own-work check

- Requirement: the file equals the pinned source minus its background, filled light, and holds nothing `icon-file-content` forbids; the credit names title, author, page, licence and change; both test lists hold the new icon.
- Check: `icons.test.mjs`, `test_icon_file_content.py` and `test_icon_credits.py`, all above. Passing.
- Break check, per the invariant rule: I removed the `gloves` entry from `credits.ts` and ran `npm test -- tests/invariants/test_icon_credits.py`, which exited 1 with `Error: credit-lines: no credit for the icon gloves`. I restored the entry and the same command exited 0.

## Walkthrough (walkthrough.md)

The change alters what a user sees: the login card's credits gain a line, and the action pick cell „Załóż” gets an icon. I performed the walk on the local start, Chromium through `playwright-cli` 0.1.22, at `https://127.0.0.1:59164`, following `loop2-play`. I made the account with `POST /api/accounts` from the page, sent the state from `compose-state.mjs` with `PUT /api/saved-game` (200, `{"revision":1}`), then opened the map „Skraj lasu” with Agent and a rule window, then its „Czynność” pick.

| Case | By what | Verdict |
|---|---|---|
| The login card's section gives „Załóż” the line `Załóż: „Gloves icon”, Delapouite, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)`, linked to `game-icons.net/1x1/delapouite/gloves.html` | DOM read of the section after opening it | ok |
| The pick cell „Załóż”, in the group „Żywność i walka”, shows the icon mask `url("/icons/gloves.svg")` at 16.8 × 16.8 px | DOM read of every `.pick-cell` (0 cells without an icon) | ok |
| `/icons/gloves.svg` is served | `fetch` from the page: 200, `image/svg+xml`, 4424 bytes | ok |
| The glove shows in the cell | screenshot inspected by me; kept nowhere | ok |
| No game error on the run | `playwright-cli console error` | 0 errors |
| Side observation | the „Załóż” cell sits at the bottom of the pick window, under the group of the fold; no fault | noted |

- **What I did not check:** the icon while the action runs over the mage's head in the scene, and the discovery band; the Programy screen; the phone layout; the kitchen-sink page. Reason: the run needs a combat turn, and the slice changes only the file and the credit line. These are unchecked for want of time, not for want of a tool.
- An early probe of the cell read the wrong button and showed no icon; I corrected the probe, and the product was fine. Not a product fault.

## Working copies

- `.runs/executor-9/` (logs, runner script, walk snapshots): removed, path `.runs/executor-9`.
- `.playwright-cli/` (state, send script, snapshots, console log, two screenshots I inspected): removed. No screenshot is shown to the human, so none went to the screenshots repository.
- The icon source fetched first into the system temp directory (`$TMPDIR/g.svg`): removed.
- `.runs/local-start/` (the database of the local start) stays until the next start, as `loop2-play` says; the start was stopped with `npm run local:stop` ("Local starts stopped: 1").
- `dist/` built by the tests and the local start: the product's build output, not a working copy.

## Unread material

- `foundations/decisions.md` D-27 (lines 4952-5005) and D-291 (10004-10036): not read. The slice's Read names them; I read F33 and F34 whole, and the invariants `icon-file-content` and `icon-credits` whole.
- `guidelines/styleguide-browser-view.md` (1896 lines): not read whole. I searched it for `icon`, `ikon` and `credit` and read the matching lines only. This slice changes no screen's style, so the icon drawing rule is unchanged.
- `tests/view/icons.test.mjs`: read lines 1-330 whole and the other lines only where a search matched. Its tests after line 330 were checked by their pass result.
- `src/browser/sim/data/actions.ts`: read the `equip` entry (lines 215-262) and the search matches, not the whole file.
- `task_frozen.md` and `plan.md`: not read; the handoff named no range from them beyond the slice text.
- Read beyond the dispatch: `src/browser/view/credit-lines.ts`, `src/browser/view/controls/react-pick-cell.tsx`, `src/browser/view/rule-panel.tsx` (lines 425-470), `.claude/skills/loop2-play/SKILL.md`, `.the-way/task-cycle/change/ui_check.md`, `.the-way/task-cycle/change/walkthrough.md`, `guidelines/coding.md`, `guidelines/testing.md` and `guidelines/coding-browser-module.md` (whole), `src/browser/AGENTS.md`, `.the-way/task-cycle/change/slice.md`.

## Searches not found or unclear

- Ruff: not found in this worktree (see Checks).
- The foundation check gave 2 errors; the handoff said 14 at the start of the cycle. I did not find which slices reduced them, and I did not run the base.
- The quality venv `.runs/quality-venv`: absent in this worktree.

## Problems observed

No product fault found. The two foundation errors in `tests/view/character-screen.test.mjs` are outside this slice.
