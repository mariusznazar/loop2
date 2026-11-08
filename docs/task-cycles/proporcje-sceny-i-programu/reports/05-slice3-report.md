# Report 05-slice3 — executor of slice 3 (The scene has one size)

**Status:** done with concerns. The code change and the focused checks are done; the real-browser check of the badge is unperformed (reason in section 4).

## 1. Commit and files

- Commit: `f9a5b86` on `task/proporcje-sceny-i-programu` (base `6ee2e7f`). Not pushed.
- Files changed (added / removed lines, from `git diff --numstat 6ee2e7f f9a5b86`):
  - `src/browser/styles.css`: 23 / 39
  - `src/browser/view/run-screen.tsx`: 2 / 2
  - `src/browser/view/world-area.tsx`: 7 / 17
  - `tests/view/world-area.test.mjs`: 19 / 20
- Each file was read whole before it was changed (`styles.css` and `world-area.test.mjs` included).

## 2. Checks (command and exit code)

- Test first, red: `npm test -- tests/view/world-area.test.mjs` with the code unchanged, exit 1. Failure: `no scale of the scene is exported: expected false, got true`, the expected reason.
- Green after the change: `npm test -- tests/view/world-area.test.mjs`, exit 0, 21 pass, 0 fail.
- `npm test -- tests/view/scene.test.mjs`, exit 0.
- `npm test -- tests/view/run-screen.test.mjs`, exit 0.
- `npm run typecheck`, exit 0.
- `npx eslint --max-warnings 0 src/browser/view/world-area.tsx src/browser/view/run-screen.tsx`, exit 0.
- `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/world-area.tsx src/browser/view/run-screen.tsx src/browser/styles.css tests/view/world-area.test.mjs`, exit 0. The first run exited 1 on the test file; I reflowed two long assert lines and reran it.
- `npm test -- tests/invariants/test_browser_view_token_values.py`, exit 0, 4 tests OK.
- `git grep -n -i "scene-scale\|SCENE_SCALE\|sceneSize" -- src tests`: hits only in the test's two absence assertions (`"SCENE_SCALE" in worldArea`, `"sceneSize" in worldArea`), which name the removed identifiers on purpose. Nothing in `src/`.
- Not run: the full `npm test` (not run, as the handoff says; the orchestrator runs it). `foundation_check.py` not run by me.

## 3. Own-work check

- Requirement: the scene is drawn at 672 × 304 with no second scale, and the screen's grid and the badge keep the values of the former scale 2 (grid from 1276 px: 706 / 1fr / 336; icon 32 px; bar 2 × `--bar-width`).
- Unit level: the case in `world-area.test.mjs` reads the background `width` 672 and `height` 304 as literals, and asserts that neither `SCENE_SCALE` nor `sceneSize` is exported. Mutation thoughts: a constant back at 336 fails the literal case; a second scale exported again fails the absence case. A CSS value changed in `styles.css` is not caught by any unit test; only the browser check below covers it.
- Browser level (see section 4): at 1280 × 720 the grid reads `706px 174px 336px`, the `.scene` box is 672 × 304, the background has `width="672" height="304"`, and `data-scene-scale` is absent from `.run-screen-areas`. At 1920 × 1080 the grid reads `706px minmax(0px, 1fr) 336px`.

## 4. Real-browser check (loop2-play)

- Done: `npm run local` started (`Local game: https://127.0.0.1:58787`), the account made through the login card with `agent.s3@example.test` (the mail `ESOCKET` line is the expected one), the character „Agent” created, Mapy → Las → „Wejdź: Agent, mapa Las”. Measurements as in section 3.
- Unperformed: the badge over the mage. The map run waits on „Czeka — żadna reguła nie pasuje” because the default program has no rule that matches, so no action runs and no `.scene-badge` is drawn. The „+ reguła” button on Programy is disabled in this state. Reaching a running action needs the composed state (`compose-state.mjs` and the save request in loop2-play's section "Compose a game state"), which I did not do. So "the badge over the mage at the same size" is not verified in the browser. The badge CSS is changed only by the plain rules described above.
- Cleanup: `playwright-cli close`, `npm run local:stop` (reported "Local starts stopped: 1"), `.playwright-cli/` removed. No frames saved.

## 5. Reaches beyond the dispatch

- Read whole: `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/{SKILL,slice,ui_check}.md`, both files of the change named above, the four foundation entries of the Read (D-43, D-280, D-311, D-349) as ranges.
- Read by search only, not whole: `foundations/invariants.md:459-468` (browser-view-token-values, as the handoff's range), `guidelines/styleguide-browser-view.md` lines 120-132 and 590-600 (where the scale is mentioned, see section 6). `guidelines/coding.md` and `guidelines/testing.md` were not read as whole files by me (the handoff names them; coding.md was only seen through the browser-module guideline's header). Flag for the orchestrator.
- Read `the author's global rule file on writing scripts` (no script written) and `.ai/rules/git.md` (before the commit).
- No subagent dispatched.

## 6. Choices, adaptations and problems

- Choice: the size is two constants `SCENE_WIDTH = 672`, `SCENE_HEIGHT = 304` in `world-area.tsx`; `sceneSize` and `SCENE_SCALE` are removed, not kept. Rejected: keeping `sceneSize(scale)` with one call — it still invites a second scale. Cost if wrong: none seen.
- Choice: the test imports the module as a namespace to check the absence of the two exports. Rejected: asserting only the literal sizes — those already pass before the change, so they are no failing-first test. Cost: the test names two removed identifiers; a later rename of the constants would not break it.
- Adaptation of the plan's test-first note: the plan expected the size case to fail before the change. It does not: the size is 672 already at `6ee2e7f`. The failing-first assertion is the absence of the scale exports. Named here as the deviation.
- Adaptation: the scene's comment in `styles.css` no longer says "right at either scale"; the scene's own header in `scene.tsx` (lines 7-8, "the scene is right at either scale") was not in my change list and still says it. Left as is.
- Problem, not fixed (outside this slice's change list): `guidelines/styleguide-browser-view.md` still describes the two scales at lines 128-129 ("przy każdej skali") and 596-597 ("przy skali 2 — `calc(var(--bar-width) * 2)`"). The plan's To do 5 covers this; it belongs to a later slice. Also `src/browser/view/scene.tsx` lines 7-8 as above.
- Specificity: the badge's icon rule drops from `.run-screen-areas[data-scene-scale] .scene-badge .action-icon` (0,4,0) to `.scene-badge .action-icon` (0,3,0). The only other `.action-icon` rule (`styles.css` line 534) sets `height: 1lh`, base specificity 0,1,0, so nothing overrides it. Verified by grep of `.action-icon` and `.scene-badge-bar` in `styles.css`.
- Invariant tests changed: none.

## 7. Searches not found or unclear

- `foundations/decisions.md` D-349 range was not checked against the handoff's `7767-7796` by me beyond reading it; the text matches the code.
- None else.

## 8. Question for the orchestrator

- None blocking. Please decide whether the badge check must be done before merge; it needs the composed state from loop2-play (see section 4).
