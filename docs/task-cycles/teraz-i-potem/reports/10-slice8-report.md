# Report 10 — slice 8, the bar of the solving condition in the header

**Status:** done

Base: `0727facebbfe59db304b0067f317fe9d7d08d34f`. Pinned the-way at `294af7fde45323ac1851c014a03071a97fc38d96` (checked with `git -C .the-way rev-parse HEAD`).

## Commits

- `cb0212e` feat: :sparkles: draw the bar of the solving condition with its numbers in the header of a map run, right after the clock, and keep it after the end

## Files changed

| File | Added / removed |
|---|---|
| `src/browser/view/status-row.ts` | +25 / -0 (`requirementText`, `requirementShare`) |
| `src/browser/view/run-header.tsx` | +48 / -8 (bar drawn from `solvingRequirements`, doc comments) |
| `src/browser/styles.css` | +60 / -3 |
| `tests/view/status-row.test.mjs` | +65 / -4 (4 new cases) |
| `tests/view/run-header.test.mjs` | +154 / -3 (7 new cases, the order case updated) |

Total 352 insertions, 18 deletions (`git diff HEAD~1 --stat`).

## What was made

- `requirementText(requirement)` gives „Passa {count}/{required}” or „Pokonane napaści {count}/{required}”; `requirementShare(requirement)` gives count over required, clamped to 0..1 (and 1 for a required number of 0 or less). Both pure, in `status-row.ts`; the count is the current one (D-135).
- `RunHeader` draws, right after the clock, a group `.run-header-solving` (only when the map has at least one requirement) holding for each requirement of `solvingRequirements(run, map)`, in its order, a part `.run-header-requirement` (class `positive` once met) with the words `.run-header-requirement-text` and its bar: the track `.run-header-requirement-bar` and inside it the fill `.run-header-requirement-fill` with `--share`, as the badge over the mage's head gets `--progress`. The bar is drawn the same before and after the end of the map run.
- CSS: the track `highlight`, thickness `--bar-width`, length `8em` (a layout dimension, D-43); the fill `width: calc(var(--share) * 100%)` in `text`, in `positive` for a met requirement; name and numbers in `text`, in `positive` when met. No new token value. `.run-header-clock:has(+ .run-header-solving)` takes the clock's auto margin away so the group, which carries `margin-right: auto`, keeps the bar next to the clock and the buttons at the right edge.

## Checks (command and exit code)

Failing first (the new cases failing for the expected reason: assertions on empty text and share 0 from stub functions, and a missing bar in the header):

- `npm test -- tests/view/status-row.test.mjs` with `requirementText` and `requirementShare` as stubs returning `""` and `0`: exit 1; 4 new cases failed, 15 passed.
- `npm test -- tests/view/run-header.test.mjs` before the header code: exit 1; 8 failed (7 new, the updated order case), 13 passed.

Passing after the code (run again on the committed tree):

- `npm test -- tests/view/status-row.test.mjs`: exit 0 (19 passed).
- `npm test -- tests/view/run-header.test.mjs`: exit 0 (21 passed).
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0.
- `npm test -- tests/invariants/test_design_token_contrast.py`: exit 0.
- `npm run typecheck`: exit 0.
- `npx eslint --max-warnings 0` on the three source/test files of the slice that are TS/JS: exit 0.
- `npx prettier --no-config --no-editorconfig --check` on the five changed files: exit 0.

The invariant `browser-view-token-values` seen failing once: with `gap: 8px` temporarily written in the rule `.run-header-requirement`, `npm test -- tests/invariants/test_browser_view_token_values.py` exit 1 (`src/browser/styles.css: line 1372: gap: the length 8px`); file restored from a copy, same command exit 0. (A first attempt with `height: 2px` in the bar's rule passed with exit 0, since `height` is a layout dimension D-43 leaves out; it was restored too.) I did not run `npm test` with no argument.

Look at the header in a running browser (`npm run local`, Playwright CLI by `.claude/skills/loop2-play/SKILL.md`; stopped with `playwright-cli close` and `npm run local:stop`, "Local starts stopped: 1"; `.playwright-cli/` and the log deleted):

- Map run of Las, empty program: the header read „Ala Las Minuta 2 Passa 2/480”, bar after the clock, the buttons at the right; computed: text `rgb(212, 212, 216)` (= `--text` `#d4d4d8`), track `rgb(39, 39, 42)` (= `--highlight`), fill in `text`, track 104 px by 2 px, fill 0.004 of it.
- Paused map run of Las composed at minute 400 with streak 360: „Passa 360/480”, screenshot shows the fill three quarters of the track in the text colour.
- After a death of cold (minute 243, „Teraz” read „Mag zamarzł”): header „Minuta 243 Passa 0/480” with the empty bar, only „Restart” and „Zakończ” after it (screenshot inspected).
- Las — głębiej composed (minute 200, streak 120, 2 beaten attacks): „Passa 120/540” with a fill 23.1 px of 104 px (120/540 of the track) in `text`, then „Pokonane napaści 2/2” with name, numbers and fill in `rgb(0, 188, 125)` (= `--positive` `#00bc7d`), fill 104 px of 104 (screenshot inspected). The unmet part stayed in `text`.

## Own-work check (section 3)

Requirement most likely missed: a met requirement must turn name, numbers and fill green together, with the other requirement of the same map staying unmet, and the bar must stand after the end with the current streak.

- Test: „a requirement not met has its fill in text on a track in highlight, a met one its fill, name and numbers in positive” (through the real stylesheet, Las — głębiej with the passa unmet and the attacks met) and „after a death of cold the bar stands and reads „Passa 0/480””, plus the status-row case with streak 0. Result: both pass (run-header exit 0).
- Mutations considered: fill always green (caught by the unmet part's `var(--text)` fill check), only the fill turning green (caught by the check of the words' colour), share not clamped (caught by 600/540 giving "1"), requirements in the wrong order (caught by the text order case), a bar for a requirement the map lacks (caught by the Las case), bar removed after the end (caught by the death and completion cases). A mutation left uncaught by the jsdom cases: the `:has` rule that keeps the bar next to the clock and the buttons at the right (jsdom does not resolve it); I checked it in the running browser (the clock's right edge at 211 px, the bar group's left edge at 219 px, the first button at 869 px).

## Reaches beyond the dispatch

- I read `guidelines/styleguide-browser-view.md` whole (the dispatch lists it) and `guidelines/coding-browser-module.md` and `guidelines/coding.md`; `tests/view/scene.test.mjs:325-345` and `src/browser/view/scene.tsx:115` to see how the badge's fill gets `--progress`; `src/browser/sim/saved-game.ts:850-961` and `dist/browser/sim/game.js:295-310` only to compose the saved states for the browser check (read only; no change). `tests/invariants/test_browser_view_token_values.py:1-60` to know which properties are layout dimensions.
- A composed saved state was sent through the local game's save request, as the skill's section "Compose a game state" gives; the temporary scripts lived in `.playwright-cli/` and are deleted.

## Searches not found or unclear

- The handoff's *Read* lists `tests/view/page-document.mjs`, `src/browser/sim/data/maps.ts` and `src/browser/tokens.css`; read as far as needed (`page-document.mjs` through its use in the tests only). nothing was missing.
- The styleguide has no rule on the width of the bar's track; it is a layout dimension (D-43), `8em`, chosen by looking at the header. Unclear whether the task wants a different length.

## Choices

- Group wrapper `.run-header-solving` instead of the parts as direct children of the header: the wrapper lets the auto margin that pushes the buttons right stay on one element. Rejected: `margin-right: auto` on the last part by `:last-of-type` (fragile: depends on the tag). Cost if wrong: the header's children list changes by one element, which the order case in `tests/view/run-header.test.mjs` shows.
- `:has(+ …)` on the clock to drop its auto margin when the group follows. Rejected: always drawing an empty group. Cost if wrong: in a browser without `:has` the buttons would not sit at the right edge; every current browser has it.
- Name and numbers are one paragraph with a mono face and tabular figures (as the clock), so the numbers do not jitter as they grow. Rejected: the proportional face; the task does not say. Cost if wrong: one rule in `styles.css`.
- `--share` is the custom property of the fill (the badge uses `--progress`).

## Problems and concerns

- A map run with an empty program in the browser check stopped at discoveries and died of cold at minute 243; that is the game's behaviour with no program and not part of this slice.
- The 2 px thick bar (`--bar-width`) is thin next to the 12 px text; it is what the plan and D-43 give. A look by the human may want a different thickness, which is a decision on `--bar-width`'s use, not a code fix.
- No question for the orchestrator.
