# Correction 1 report — the human's remarks on the request (head before: 761ff8b1)

**Status:** done. **Commit:** the one commit after 761ff8b1 (message begins "docs: say in D-366 that an effect is started, not shown…"; `git log --oneline | head -1`).

No change to the dust's drawing or place, the colours, the frames, or the contested finding (no minute threshold): let through as the human said.

## The six remarks

1. **D-366 *Rejected*** `none considered` → `unknown` (the entry is the cycle's own, no human statement). Done in `foundations/decisions.md`.
2. **D-366 "Any other reading shows none"** → "Any other reading starts none". The tail was checked and reads true with it: an effect overdue at its turn (a stop, several ends) is not started; I added "an effect already running finishes, standing still while the scene does", which is what `scene.tsx` does. Verification examples: "showing nothing" became "starting nothing" for the two-ends and the "Zjedz" and the discovery cases, and one example added: an effect running when the pause comes stands still and finishes when the game goes on. Styleguide: "opuszcza efekt zaległy" became "nie zaczyna efektu zaległego", with a sentence that a running effect finishes and stands still with the scene.
3. **"as the mage stood"** → "at the place the mage stands or walks to at the previous reading" in the binding sentence, in the Rationale ("which is the place the mage stood or walked to at the previous reading"), in the styleguide section, and in the code comment in `scene.tsx`. The verification examples say "the mage that gathered" / "where the next action leads the mage" and did not need it.
4. **D-363 Rationale**: "The mage reaches the sticks and the moss walking left and the bush walking right" → "The mage usually reaches the sticks and the moss walking left" (the bush clause dropped, the conclusion kept).
5. **Meaning sentences** (below).
6. **The figure's middle (32)**: one named value `SCENE.mageMiddle` in `src/browser/sim/data/scene.ts`; `SCENE_EFFECTS.body.x` and `.feet.x` use it; `tests/view/scene-picture.test.mjs` (the prop-middle test) imports `SCENE` and uses `SCENE.mageMiddle`. No behaviour change; the other tests keep their hand-computed literals (74, 176, …) on purpose, which stay independent of the data. `content-identifiers` and the part boundaries untouched.

## Meaning of the changed entries (WAY-134 form; mark: **the cycle's**, both)

- **D-363** (changed: Rationale only): English — a mage that faces its prop does so because the prop's side comes from the data, since the walk's direction usually turns its back to the sticks and the moss. Polish — mag zwraca się ku rekwizytowi, bo jego strona pochodzi z danych, a kierunek marszu zwykle odwracałby go plecami do patyków i mchu.
- **D-366** (changed: binding sentence, Verification, Rationale, *Rejected*): English — the scene starts an effect of a gathering's end only where the reading tells the result surely, at the place the mage stands or walks to, and starts nothing otherwise, while a running effect finishes and stands still at a stop. Polish — scena zaczyna efekt końca zbierania tylko wtedy, gdy odczyt pewnie mówi o wyniku, przy miejscu, w którym mag stoi albo do którego idzie, w innym odczycie nie zaczyna żadnego, a efekt, który już trwa, kończy się i przy zatrzymaniu stoi.

## Return-step comparison for the words touched
D-363 to D-366, D-317 and the styleguide section "The scene of a map run" compared with the code (`scene.tsx` starts an effect only at `standing === "going"` from `sceneEffect`; a running effect stays in state until `animationend` and is frozen by the stop rule; a new effect replaces it; `current.x` is `Shown.x`). D-317's text needed no change. D-364 and D-365 unchanged.

## Checks (command, exit code)
- `python -B .the-way/elements/common/foundation_check.py` — 0 errors
- `npm run typecheck` — 0; `npx prettier --check src tests/view` — 0 (after `--write` of the one test file); `npx eslint src/browser tests/view/{scene,scene-picture}.test.mjs` — 0
- `npm test -- tests/view/scene.test.mjs` — 0 (35 pass); `…/scene-picture.test.mjs` — 0 (40); `…/icons.test.mjs` — 0 (33)
- `npm test -- tests/invariants/test_content_identifiers.py` / `test_browser_view_token_values.py` / `test_cross_part_imports.py` / `test_design_token_sources.py` — 0 each
- Not run: the full `npm test`.

## Own-work check
Requirement most likely missed: that no code behaviour changed. The scene tests (which hold the effect places as literals) pass unchanged after `SCENE.mageMiddle` replaced two literals, so the values stay 32; the build and invariant tests above pass.

## Unread material
`reports/review-return-report.md` and `reports/review-fix-report.md`: read only through the handoff's quotations. `.the-way/task-cycle/skill/correction.md`: read to its first third (the merge and the pin were the orchestrator's).

## Searches not found or unclear
None. The Origin of D-363..D-366 reads `none`; I left it (not in the remarks).
