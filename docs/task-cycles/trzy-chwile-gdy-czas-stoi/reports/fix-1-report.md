# Fix 1 report — task trzy-chwile-gdy-czas-stoi

**Status: done.** One commit, range from `81578d66`: `4e87b0d7`. Nothing pushed. No code or CSS changed; only foundation, styleguide and two test files.

## Findings

- **Important 1 (styleguide sentence "all motion stands")** — fixed. `guidelines/styleguide-browser-view.md`, rule "The scene of a map run": the sentence now reads that at the player's pause all motion stands, and at a discovery, a death and a completion all motion stands except the effect of that moment (below). Check: `foundation_check.py` 0 errors; prettier clean.
- **Important 2 (specks missing from D-315)** — fixed per ruling 2. D-315 binding text now lists "the specks of light after a completion, which stay in their own colours (D-322)" next to the badge and the plaques; its Verification "violates" names "a speck of light" among what must not lie under the tint.
- **Important 3 (3:1 for the specks)** — fixed per ruling 1. Removed from D-271's binding text (the sentence is task 18's again: "the outline or the fill of the frost by at least 3:1 against the snow it lies on"), from its Verification (complies now "standing out from the open snow they rise over"; violates "a speck in a colour that does not stand out from the snow it rises over") and from the styleguide ("odróżniają się od śniegu, nad którym się unoszą (D-271)"). The test `the specks of light stand out from the snow under the full gold, 3:1 at least` in `tests/view/scene-frost-contrast.test.mjs` is deleted (that file is back to its base content). Reason: no ratio is required now, and any substitute ("differs from `#ddc69e`") would be an arbitrary constant. The clause that remains is still held by the test in `scene-picture.test.mjs` that samples the forest picture along every speck's path (all snow), and by `design-token-sources` (the colours carry the named pixels). The colours and the screenshots are untouched. The `Source:` comments of the two speck tokens still state the measured ratios as facts; they are not a rule.
- **Important 4 (D-322 says the mage stands during every effect)** — fixed. D-322 binding text: "the fire standing as at every stop, and the mage too at a discovery and a completion".

## Minor findings

1. **Styleguide rule "The end-of-run window"** — fixed: the sentence now says the window opens after the effect of the end, and at once where the scene shows the last image at once (D-311, D-322); D-322 added to the rule's *Decision* line.
2. **D-371 and the header button during the wait** — fixed with one clause: „Koniec przejścia” stands in the header while the window does not stand, which includes the wait for the scene's effect (D-322), when it opens the window at once.
3. **Test name** — fixed: now "the window opens once the scene's effect of the death has ended, while the player is on the screen, and covers the header and the three areas".
4. **Examples written from proposals pending the human's choice** — answered, not changed (ruling 3). The D-271 example "colours read from pixels of the pack's bonfire" is true of the code as it stands; the violation "a cold layer whose colour no choice of the human gave" is the rule D-271 already gives for the tint layer, and it holds once the human chooses at the request. The request carries it: the token comments and these two examples change with his choice.
5. **Reduced motion keeps `data-moment-playing`** — contested as a defect, not fixed: the finding asks for nothing and says it is harmless and recorded; it stays Choice 6 of the author report, and the request should list it.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` — 0 errors.
- `npx prettier --check` on `guidelines/styleguide-browser-view.md`, `tests/view/scene-frost-contrast.test.mjs`, `tests/view/end-window-game.test.mjs` — clean.
- `npm test -- tests/view/scene-frost-contrast.test.mjs` (2 pass), `end-window-game.test.mjs` (26), `scene.test.mjs` (62), `scene-picture.test.mjs` (62) — all exit 0.
- `npm test -- tests/invariants/test_design_token_sources.py`, `test_design_token_contrast.py`, `test_browser_view_token_values.py` — each OK (the entries touched, D-39/D-42/D-271, are cited by these).
- Not run: the full gate; `test_loop2_container_sprites.py` (no sprite or data changed since its green run).

## Own-work check

The requirement most likely still unmet: that no sentence of the foundation or the styleguide contradicts D-322 or the code on layering and 3:1. I searched `foundations/decisions.md`, the styleguide and `tests/` for "3:1", "specks"/"drobinki", "stoi" near D-322 and "lies over"/"nad odcieniem": the only 3:1 left for effects is the frost's; every place that lists what lies over the tint now names the specks (D-315, styleguide lines 641-644 and the specks bullet, stylesheet comment); the remaining statement "all motion stands" is at the player's pause only.

## Unread material

none beyond the author report's own list; `fix.md` and both handoff files read whole.

## Searches not found or unclear

none
