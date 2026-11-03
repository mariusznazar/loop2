# Slice 9 — Siedziba as a screen of its own

**Status:** done
**Commit:** `0e7c625` on `task/ekrany-i-menu` (one commit, not pushed)
**Worktree:** `C:\Storage\repos\loop2-wt\ekrany-i-menu`, start `649e25d`, tree clean after the commit

## What changed and why

- `src/browser/view/headquarters.ts`
  - Stops drawing the skills: `createCharacterSkills`, the `skills` list and `HeadquartersControls.buy` are removed (To do items 3 and 4; D-199, D-200).
  - The name in each row is now an `<a class="team-member-name">` with `href` from `screenAddress({ kind: "character", characterId })`, i.e. `#/postac/{n}` (To do item 3, question 7, D-281).
  - New pure export `runWaitingSentence(mapId)`: „Przejście na mapie {name} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”, the name from `MAPS`.
  - Each row gets one `<p class="team-member-run-note">` after its map blocks. `update()` sets it to that sentence while `state.run !== null` (going, paused or ended), hidden otherwise. The sentence sits under the lines of sending, once per row (To do 8, row 1; question 3).
  - The section „Drużyna” keeps its heading.
- `src/browser/view/character-skills.ts`: `createCharacterSkills` removed with its now-unused imports. `skillText`, `branchText`, `practiceText` stay (`run-screen.ts` imports `practiceText`).
- `src/browser/view/game-view.ts`: the headquarters' `buy` wiring removed. The purchase on Postać (`onBuy`) is unchanged.
- `src/browser/styles.css`: dead rules `.character-skills`, `.character-skills h4`, `.skill-tree`, `.skill-summary`, `.skill-branch` removed; `.team-member-run-note` added (`flex-basis: 100%; margin: 0; color: var(--text-secondary)`), mirroring `.team-member-stopped`. Only tokens, no px.
- `tests/view/headquarters.test.mjs`: one case for `runWaitingSentence` (forest „Las”, forestDeep „Las — głębiej” from the data).
- `tests/view/character-skills.test.mjs`: the DOM case (`createCharacterSkills`) removed with its helpers and imports. The same case already stands in `tests/view/character-screen.test.mjs` under the same name, so it carries the behaviour without change to that file.
- `tests/view/account-screen.test.mjs`:
  - The ACTS entry „buying a branch rank” gets `hash: "#/postac/1"`; the runner opens the page at `fakeAddress(hash ?? "")`.
  - The loop case's „Kup” check moves to a second view opened at `#/postac/1`.
  - New case: after the end of a map run every row's sending is inactive with the sentence under its lines of sending, and „Zakończ” hides it.
  - New case: the name is a link to `#/postac/1`, and that address opens the character screen.

Line counts (`git show --numstat 0e7c625`): styles.css +7 −28; character-skills.ts +1 −79; game-view.ts +0 −3; headquarters.ts +39 −18; account-screen.test.mjs +64 −3; character-skills.test.mjs +1 −79; headquarters.test.mjs +14 −0. Total 7 files, +126 −210.

## Checks (command — exit code)

Before the code (test first):
- `npm test -- tests/view/headquarters.test.mjs` — exit 1. The new case: `AssertionError: Expected values to be strictly equal: actual '' expected 'Przejście na mapie Las jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.'` (stub `runWaitingSentence` returned `""`).
- `npm test -- tests/view/account-screen.test.mjs` — exit 1, with the two new cases failing for the expected reasons: „Ala: one sentence in the row: expected 1, got 0”. The loop case failed at that point on a React act warning from my first version of its navigation; that was fixed (see the Choices below).

After the code:
- `npm run typecheck` — exit 0.
- `npm test -- tests/view/headquarters.test.mjs` — exit 0, 19 of 19 pass.
- `npm test -- tests/view/character-skills.test.mjs` — exit 0, 3 of 3 pass.
- `npm test -- tests/view/account-screen.test.mjs` — exit 0, 118 of 118 pass (intermediate runs failed on the test harness, fixed as described below).
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0, 4 tests OK.
- `npm test -- tests/invariants/test_content_identifiers.py` — exit 0, 4 tests OK.
- `npm test -- tests/quality/test_quality_invariants.py` — first run exit 1: `test_prettier_source_format` on `tests/view/account-screen.test.mjs` and `tests/view/character-skills.test.mjs` (my edits). Fixed with `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --write` on those two files. Final run exit 0, 5 tests OK (this includes ESLint and Ruff).
- `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --check --ignore-path .gitignore <the 7 changed files>` — exit 0.

Not run:
- The full gate `npm test` without a file argument: the orchestrator's, not this slice's.
- `python -B .the-way/elements/common/foundation_check.py`: not named in this slice's Checks.
- Mutation testing (StrykerJS): not named for this slice; the own-work check below was done by hand.

## Own-work check (section 3)

- Requirement most likely missed: the sentence must stand once per row, under its lines of sending, and only while a manual map run exists (going, paused or ended). The sentence must not appear for a character in an earning loop when no run exists, and must go on „Zakończ”.
- Check: the DOM case „after the end of a map run every row's sending is inactive under the sentence why…” (two rows, one note each, position after „Wyślij”, hidden after „Zakończ”). Run first before the code: failed (`expected 1, got 0`). Run after: passes.
- Second requirement: „Kup” still acts for a character in a loop, on Postać (D-200). Check: the loop case, the Kup button on `#/postac/1` enabled. Passes.
- Visual check (ui_check.md route, loop2-play skill): `npm run local` started; Playwright CLI opened the game; account registered; „Ala” created; „Wyślij” at Las pressed; Siedziba opened during the run. Observed: „Wyślij: Ala, mapa Las” is `[disabled]`; the sentence stands under it in the grey secondary text, as the screenshot showed; the name „Ala” is a link (`/url: "#/postac/1"`); clicking it opens `#/postac/1` with the character's content. Screenshot taken and read, then deleted with `.playwright-cli/` after the check. `npm run local:stop` ran; the browser closed.
- The screenshot was taken once, during a run, at 1280 px width. States of the name link (hover, focus) were not captured; the link has no own styling and gets the global focus rule.

## Reaches beyond the handoff

- `guidelines/testing.md` and `guidelines/styleguide-browser-view.md` read whole (the handoff names them).
- `tests/view/character-screen.test.mjs` read: to confirm that the DOM case of `character-skills.test.mjs` is carried there (it is, under the same name). Not changed.
- `src/browser/view/screen-address.ts` read (`screenAddress` signature and the `#/postac/{n}` form).
- `src/browser/view/menu-bar.tsx` read (how the bar writes its links, a plain `<a href>`; the name link follows that).
- `src/browser/view/run-screen.ts` grep: it imports `practiceText` from `character-skills.ts`, which stays.
- `.claude/skills/loop2-play/SKILL.md` read (the settled browser route the ui_check names).
- `C:\Storage\The Brain\The Brain\.ai\rules\git.md` read before the commit (the commit message in English, `git add` by path, the message from a file outside the repo).
- `foundations/decisions.md` D-281 read to confirm the link's address rule. D-277 looked at in passing.

## Mismatches of plan and code

None structural. The plan's Change list was followed; `tests/view/character-screen.test.mjs` is not in it and was not changed, because the DOM case already stands there.

## Choices made

1. The sentence is one `<p>` per row, appended after the last map block of the row. Rejected: one sentence per map (the plan says once per row); beside each „Wyślij” (the ruling says under the lines of sending).
2. The sentence's condition is `state.run !== null`, not per-button `disabled`. This is equal to „Wyślij is inactive for every row during a run” and covers going, paused and ended. Cost if wrong: none seen; a character in an earning loop with no manual run shows no sentence, as the plan requires.
3. The name link keeps the browser's default underline and takes its colour from `.team-member-name` (`text-strong`). Rejected: a new rule to remove the underline. The styleguide has no rule for links inside the team row, so this is unclear and left as it is (see Searches).
4. The removed skill rules in styles.css are dead after the removal of the Siedziba skills; they are removed. Cost if wrong: a dead rule would stay; nothing reads them.
5. The loop case opens a second view at `#/postac/1` for the Kup check instead of following a link. Reason: the act warning below appeared with the `follow` path in the view harness (no menu bar).
6. `viewOf(...).view.dispose()` is wrapped in `inAct` where a character screen is mounted. Cause (verified by the test passing after the change): `root.unmount()` in `dispose()` is an update outside act, which the React test environment reports as the act warning. Existing cases avoid this by never disposing a view with a character screen. Not fixed in the harness.
7. The ACTS runner accepts an optional `hash` per entry, passed to `fakeAddress`. Rejected: clicking the „Ala” link inside the runner (the fake address does not follow the anchor's href).
8. The DOM sentence case starts a view at `#/` (Siedziba) and checks the rows, then a second view at `#/postac/1/przejscie` for „Zakończ”. Reason: a reload with an ended run opens the run's screen, so Siedziba is hidden at the start.

## Searches not found or unclear

- A styleguide rule for a link inside the team row (its colour, underline, hover): not found; the name link keeps the browser's default underline. Unclear whether the styleguide wants more.
- Whether the name link is a „control” in the styleguide's sense (the list of shared controls and their states): not found, and I did not treat it as one.
- Observed, not in scope: in the row the map label and the solving sentence run together (`Mapa: Las  Las — 480 minut …`) on the screenshot; this predates the slice.
