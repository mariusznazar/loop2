# Report 15 — screenshots of the changed screens (stage: evidence)

## Status
DONE. All five screenshots taken and looked at. Head `64a8a83e2215ffe2eaef03743df7209346fd6c8a` before and after; `git status --short` empty before and after (`.runs/` and `dist/` are ignored).

## Files
Directory: `docs/task-cycles/proporcje-sceny-i-programu/reports/screens/`

Scenario: account `agent15@example.test` on the local start's own database; state from `compose-state.mjs` (character "Agent", combat verbs in the Understanding) sent by the ordinary save request, then in Programy one group with two rules added through "+ reguła" (both started as "Zawsze -> Eksploruj"). In the map run the copy's rule 1.2 was changed to "Wędruj" so that the character has a running action (otherwise it stood idle: "Czeka — żadna reguła nie pasuje"). Run paused at minute 45.

1. `run-two-columns-1280.png` (1280 px window, FULL-PAGE screenshot, page 1280 x 1272: the footer with graphics credits makes it taller than 720; the tabs end at about y=950, so the lower part does lie below the window's bottom edge). Shows two columns: on the left the world card with the scene (the mage and a "Eksploruj" badge in the picture, line "Eksploruj - reguła 1.1 - zostało 20 z 20 min"), body values, the hex drawing of the map with the tile line "(2, 0)" below it, and below that the card with the tabs "Kronika" / "Teren" (chronicle open, filters Wszystko ... Świat, entries including "Zmieniono regułę 1.2: Zawsze -> Eksploruj -> Zawsze -> Wędruj" and "Passa 39 przerwana: zmiana programu"); on the right the program card ("Kopia: Program", group 1 with rules 1.1 Eksploruj and 1.2 Wędruj), both columns top-aligned.
2. `run-rule-panel-open-1280.png` (full-page, 1280 x 1272). Same screen after a click on the row of rule 1.1: the panel "Reguła 1.1" (condition picker, action "Eksploruj 20 min") stands directly under that row inside the program column, rule 1.2 below it; the left column with the tabs "Kronika" / "Teren" is unchanged (same position and content).
3. `run-end-question-1280.png` (full-page). After "Zakończ" (now red) in the header: in the program column, above "Kopia: Program", the orange question "Zapisać, odrzucić, wrócić?" with the buttons "Zapisz", "Odrzuć", "Wróć". The rule panel from screenshot 2 was still open and is under its row; the left column unchanged. I pressed "Wróć" afterwards (no save, no discard).
4. `programy-panel-in-place-1280.png` (1280 px window, full-page, page 1280 x 967 because of the footer). Screen `#/programy`: two columns (left: list with "Program", "Nowy program", "Zmień nazwę", "Usuń"; right: the program with group 1 and two rules, the panel "Reguła 1.2" directly under the row of 1.2, rule list continues below with "+ reguła" and "+ dodaj grupę"). Header carries the extra link "Wróć do przejścia - Las - minuta 45" and the program card the line "Zmiany tutaj nie dotykają przejścia na mapie Las." Note: the click was meant for rule 1.1 and the panel opened for rule 1.2 (my selector `li:nth-child(1)` matched a different list item because the hidden run screen was still in the DOM); the panel is under the opened rule's row either way.
5. `run-stacked-1000.png` (1000 x 900 window, full-page, page 1000 x 1629). One column, top to bottom: the world card (scene, body values, hex map, tile line), the program card, the tabs card with the chronicle. Observation: the scene stays 672 px wide, left-aligned, inside the 968 px wide world card (the space to the right of the scene is empty), and the hex drawing stays 195 px wide at the left.

## Measurements (1280 x 720 window, screenshot 1)
- `.run-program` (program column): 526 px wide (x=738..1264), 863.5 px high; `.run-screen-areas`: 1248 px wide, left column `.run-world` 706 px wide, gap 16 px.
- Scene (`.scene`): 672 x 304 px (x=33, y=100, inside `.run-world` 706 px minus 2 x 17 px padding).
- `.run-tabs`: 706 x 213.8 px (with the chronicle open). `.world-drawing` (hex map): 672 x 164 px box with the svg 195 x 164.
- At 1000 x 900 (screenshot 5): `.run-world` 968 px, `.run-program` 968 px x 340.8, `.run-tabs` 968 px x 213.8; scene still 672 x 304.
- Document height at 1280: 1272 px (viewport 720), so the run screen scrolls.

## Commands
- `npm run local` (background; build ran, no error) -> line `Local game: https://127.0.0.1:62568`; the shell wrote `exit 0` to its log after the stop. Expected `"failure":"mail","code":"ESOCKET"` line seen.
- `node .claude/skills/loop2-play/compose-state.mjs > .playwright-cli/state.json` -> exit 0; state sent with `playwright-cli --raw run-code --filename .playwright-cli/send-state.js` -> `200 {"revision":2}`.
- `playwright-cli open`, `snapshot`, `click`, `fill`, `eval`, `resize 1280 720` / `1000 900`, `screenshot --full-page --filename ...` (five screenshots plus one retake of screenshot 1). All succeeded. Playwright MCP was not needed.
- `playwright-cli close` -> exit 0; `npm run local:stop` -> exit 0, "Local starts stopped: 1"; `.playwright-cli/` deleted.
- `playwright-cli console error` filtered for `uncaught` / `saved-game-load`: no such line.

## What I could not do and why
- Nothing from the five items was left out. "A map run in progress (paused is fine)": taken paused at minute 45 with an action running (Eksploruj, 20 of 20 min left).
- "Program with rules": the "+ reguła" button is disabled in a fresh game (no actions offered before the Understanding holds any), so the plain account flow cannot build rules; the composed state was needed.

## Reaches beyond the handoff
- Edited the run's copy (rule 1.2 Eksploruj -> Wędruj) in the map run to get a running action; the saved program "Program" was not changed by that. Pressed "Wróć" in the end question. Replaced the account's save with the composed state (local database only). Retook screenshot 1 once after the first take showed an idle character.
- Read `src/browser/view/rule-list.tsx` (why "+ reguła" is disabled) and class names in `run-screen.tsx`, `world-area.tsx`, `scene.tsx`; no change.

## Searches not found or unclear
- none
