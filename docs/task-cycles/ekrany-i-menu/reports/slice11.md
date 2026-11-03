# Slice 11 — The coding guidelines of browser modules

- **Status:** done with concerns
- **Task:** `ekrany-i-menu`, branch `task/ekrany-i-menu`, worktree `C:\Storage\repos\loop2-wt\ekrany-i-menu`
- **Start head:** `0aa9ce5`; `.the-way` pinned at `f45ca40724251a46965aed69f733d0a35c430048` (matches the gitlink)
- **Model class:** cheaper (Haiku 5.5), per the plan

## What changed and why

Only `guidelines/coding-browser-module.md` changed (+45 / −2). Commit:

- `eeb145f` docs: :memo: give the browser-view coding guidelines an example of the screen Postać and of the menu bar in React, and list the new files of the kind

Changes, each against the code as it stands at `0aa9ce5`:

1. **Files of this kind**: five rows added in path order, each `Decision` `—`:
   - `src/browser/view/character-screen.tsx` — `copy`, between `body-row.ts` and `character-skills.ts`
   - `src/browser/view/menu-bar.tsx` — `copy`, between `headquarters.ts` and `password-reset.ts`
   - `src/browser/view/program-list.tsx` — `copy`, between `program-editor.ts` and `program-panel.ts`
   - `src/browser/view/run-screen.ts` — `do not copy` (DOM module, `document.createElement` throughout), between `program-panel.ts` and `status-row.ts`
   - `src/browser/view/screen-address.ts` — `copy` (pure, no DOM call), between `run-screen.ts` and `status-row.ts`
2. **Examples, new `### Ekran w Reactcie: Postać`** (after the login card example): how the screen takes its character number from `#/postac/{n}` (`readScreenAddress` → `resolveScreen` → `show` → `openCharacterScreen`), when it is created and disposed, the boundary `createCharacterScreen({ onBuy, onStop, props })` with `element`, `update`, `focus`, `dispose`, the synchronous first render, the two update call sites (store `apply` → `renderScreens`, and the `startClock` callback in `game-view.ts`), the actions leaving through `onBuy`/`onStop`, and the „Kup” button disabled while `state.run !== null`.
3. **Examples, new `### Pasek menu w Reactcie`**: `menu-bar.tsx` as the React element `app.ts` places first in the header; the same boundary shape `createMenuBar({ client, onLogout, props })`; the save line under it; „Wyloguj” in menu „Konto” only reports `onLogout`, and `app.ts` saves first through `saveBeforeLogout`; the document listeners in the effect with deps `[open]` and a cleanup (D-267); „Wyślij ponownie” sent by the bar through `client`.
4. **Examples, existing `### Gra na stronie i odpowiedzi serwera`**: the save line now reads "pod paskiem menu w nagłówku", and a sentence on „Wyloguj” in menu „Konto” on the bar, with `app.ts` saving before the session ends. Nothing else in the example was touched.

No rule added (no new `### ` under `## Rules`, no Decision/Invariant/Good/Bad fields added). No existing row's status changed. The diff's only removed lines are the two reworded sentences of item 4.

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, output `0 errors`. Run before the edit (baseline, exit 0) and after the edit (exit 0), and again after the last wording fix (exit 0).
- `npm test -- tests/invariants/test_browser_view_framework.py` — exit 0; the script ran `scripts/test.py` on that file, 9 tests, OK. This is a focused check with a file argument, not the full gate; the full gate was not run (orchestrator's).
- Extra read-only: `python -B .the-way/instruction-files/check_instructions.py .` — exit 0. The full-repo warnings were compared with the same run without my change (stash): the outputs differ by nothing (`diff` exit 0). On the changed file the checker gives only INFO lines (dead-path INFO on bare file names such as `game-view.ts`, which the checker reads as relative names; no WARN). Not in the handoff's checks; run to see whether the guideline file reads as an instruction file, since a backtick path would trip it.
- Not run: the full `npm test`, because the handoff says it is the orchestrator's gate. The UI check (`ui_check.md`) does not apply: the slice changes no screen, only a guideline file.

## Own-work check

- **Requirement most likely missed:** that every claim the new and edited examples make about the code is true. "The example follows the code" was the part the plan singled out (the save line under the bar, „Wyloguj” in „Konto”), and the claims about call sites are easy to get wrong from the component docstrings.
- **Check made:** read the code the claims point to, line by line: `app.ts` (`startApp` header append of `bar.element`, `header.append(view.saveLine)`, `logOut` and `saveBeforeLogout`); `game-view.ts` (`show`, `openCharacterScreen`, `closeCharacterScreen`, `characterProps`, `renderScreens`, `apply`, the `startClock` callback, the `Kup` disabled condition); `menu-bar.tsx` (the props, `ITEMS`, `AccountMenu` effects with `[open]`, the „Wyślij ponownie” call through `client`); `character-screen.tsx`; `screen-address.ts`.
- **Result:** every claim matches the code except one wording I had written and then corrected before committing: I first said `loopLine` and `branchText` come from "modules that draw nothing". `headquarters.ts` also builds DOM elements (`createElement` at lines 180–222), so I reworded it to "pure functions of DOM modules, which draw nothing" (D-265's own wording).
- **Mismatch found, not changed (see Concerns):** the docstring of `character-screen.tsx` says the page calls `update`/`dispose` "from an event handler or the continuation of an answer", but `update` is called from the store `apply` and from the clock callback. My example states the actual call sites.

## Reaches beyond the handoff

What I read that the handoff did not name, and why:

- `src/browser/view/game-view.ts` — the parts the example describes: `apply` (≈228–245), `startClock` callback (≈250–256), `openCharacterScreen`/`closeCharacterScreen` (≈347–373), `firstScreen`/`resolveScreen` use (≈436–450), `renderScreens`/`shownElement` (≈520–545), `show` (≈483–495), `dispose` (≈587–598). Why: the example must describe the real wiring.
- `src/browser/view/app.ts` — imports and `startApp` header (≈1–20, 118–170, 355–370), `bar.update` (≈270–300), `logOut` (≈479–491). Why: the bar's place, the save line, and the logout order.
- `src/browser/view/menu-bar.tsx` (whole), `character-screen.tsx` (whole), `run-screen.ts` (whole), `screen-address.ts` (whole), `program-list.tsx` (first 15 lines, the header). Why: the examples and the status of each new row.
- `src/browser/view/headquarters.ts` and `character-skills.ts` and `email-status.ts` — grep only, for `createElement` / `document.` and export lines. Why: to decide the status of the new rows and to check the status of the pure modules (see Concerns).
- `.the-way/instruction-files/check_instructions.py` — run read-only (see Checks).
- `C:\Storage\The Brain\The Brain\.ai\rules\git.md` — read before the commit, as the global instructions require.
- `.the-way/product-guidelines/template.md`, `.the-way/product-guidelines/coding/template.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md` (whole), `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md` — named by the handoff or the make-change method.
- Decision entries D-96, D-97, D-208, D-213, D-264, D-265, D-267, D-269, D-270, D-280, D-281, plus D-03, D-36 — all named in the plan's *Read* row or the foundation-entry table (E2, E3, E7, E12, E13). Line ranges read as given; the ranges match the current file.
- `foundations/part_map.md` lines 3–28 and 118–133 — named by the plan.

## Mismatches of plan and code

- None structural. The five new files exist at the paths the plan names, and their behaviour matches the plan's description.
- The plan says "the example follows the code"; it does. No plan-to-code mismatch in the sense of the make-change rules.
- The plan did not say whether the new files join the `## Where in code` list. I did not add them (see Choices).

## Choices made

1. **Status `copy` for the four non-DOM new files** (`character-screen.tsx`, `menu-bar.tsx`, `program-list.tsx`, `screen-address.ts`). The template gives three statuses; `exemplar` is already taken by `account-card.tsx` (exactly one row). The alternative was `do not copy` for every React file, which would tell a reader not to copy the React screens this example describes. Cost if wrong: a reader copying one of the React files as a model for a new screen gets a React file either way; the status would only mislabel it. Easy to switch.
2. **`run-screen.ts` as `do not copy`**, as the handoff states; it builds its DOM elements through `document.createElement`, so D-265's rule applies.
3. **`screen-address.ts` as `copy`** (pure, no DOM). The alternative was `do not copy` on the grounds that it is a companion of DOM screens. Cost if wrong: the same as in 1.
4. **Not added to `## Where in code`.** The template says that section lists the files the guidelines point to. The existing examples already point to `app.ts` and `game-view.ts`, which the section does not list, so the convention is not applied in this file today. Adding the five new files would be a small change the plan did not name; left for the orchestrator to decide. Cost if left out: a reader finds the new files through the table instead; the table already names them.
5. **Example names**: `### Ekran w Reactcie: Postać` and `### Pasek menu w Reactcie`, placed after the login card example and before `### Kontrolki w DOM i ich aktualizacja`, to keep the React examples together.
6. **Polish prose, English code identifiers**, as in the rest of this file.

## Concerns and questions for the orchestrator

These are statuses or wording that look wrong; the plan says to report them and not to change them.

- **Q16 (from the handoff): `src/browser/view/email-status.ts` has status `do not copy`** but, per the orchestrator's note, it now holds only pure sentences. My grep found no DOM API call in it (its exports are `UNCONFIRMED_SENTENCE`, `messageSentence` and the `Sentence` type). Kept as is, per the plan. Place: the table in `guidelines/coding-browser-module.md`, the row for `src/browser/view/email-status.ts`.
- **Q17 (not in the handoff): `src/browser/view/character-skills.ts` has status `do not copy`**, but my grep found no DOM API call in it either (`createElement`/`document.` absent). It is a pure module like `email-status.ts`, and this is the same kind of wrong status. Kept as is. Place: the row for `src/browser/view/character-skills.ts` in the same table. The screen Postać imports `branchText` and `skillText` from it.
- **Docstring vs call sites in `src/browser/view/character-screen.tsx`** (the top comment, lines 1–10, and the boundary comment at lines 166–171 say "the page calls them from an event handler or the continuation of an answer, never from render or an effect"). In the code, the page calls `update` from `apply` (store change) and from the `startClock` callback in `game-view.ts` (lines ≈250–256). Neither is an event handler or an answer. The example describes the real call sites. This wording is the screen's own comment: I did not change it (out of this slice's *Change*). Suggested for a later change: align the docstring with the call sites, or give the clock path its own wording.
- **Same kind of doc note, `menu-bar.tsx`** (lines 10–13): "The page calls them from an event handler or the continuation of an answer" — the page calls `bar.update` from `drawBar()`, which runs from the page's state changes. Same remark applies; not changed.

## Problems observed

- None in the build or the tests. `foundation_check.py` reports 0 errors before and after.

## Commits

- `eeb145f` (on `task/ekrany-i-menu`, author `mariusznn@gmail.com`), `guidelines/coding-browser-module.md` only, added with an explicit path, message from `git commit -F` placed in the scratchpad. Not pushed. The worktree is clean after the commit.

## Searches not found or unclear

- The template's statuses: it says the three statuses are `exemplar`, `copy`, `do not copy`, but not what status a new React file gets when no exemplar is free. Unclear; my choice is in Choices 1 and 3.
- Whether a new file of a kind belongs in `## Where in code`: the template says "the files and directories of the product the guidelines point to", but the current file does not follow that for `app.ts`/`game-view.ts`. Unclear; Choice 4.
- Whether `character-skills.ts` and `email-status.ts` should be `copy` or `do not copy` now that they are pure: no rule in the template settles it (Q16, Q17).
- No other searches came up empty or unclear.
