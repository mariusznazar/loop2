# Fix 1 report — task oboz-w-siedzibie (Minor findings M1–M4)

**Status:** done (M2 contested, left as it was). From head `07fd0de3`; not pushed.

## Commits
- `test: :white_check_mark: check that the camp's two sprite files hold pixels alone and are the size of the data` (M4)
- `docs: :memo: leave the sides of the chest and the characters out of D-389 and shorten the styleguide rule of the camp to what the author is to do` (M1, M3)
(`git log --format='%h %s' -3` of the branch; both after `07fd0de3`.)

## Per finding
- **M1 — fixed.** D-389 *Verification*, complies: "the chest to its right and the characters … to its left" became "the chest and the characters of Siedziba beside it" (the binding sentence never fixed the sides). The styleguide *Good* and the rule's body no longer say the sides either. The sides are not part of what D-389 binds: the task's Q3 and row 1 settle the band, background, crop, which characters, motion and picture-not-control, and leave the composition to the screenshot. The comment of `CAMP` in `src/browser/sim/data/scene.ts` still describes the present layout; it is the code's own comment and changes with the code if the composition changes, so I did not touch it (no entry or rule needs to follow it).
- **M2 — contested, title left.** The record-decision method (`template.md`, "Changing a decision": "A number stands for the question a decision answers"; the skill's step 3 only gives the heading form `#### <PREFIX>-<NN> — <question>` for a change of a current one; `decide_entry.md`: a question the log already answers takes an edit of that entry in place) names no way to change the question of a current decision; changing it would make the number stand for another question. So I left "Where do the scene's pictures come from?". The camp's pictures are, by the task, a change of D-271 (Q5, row text), and the log's search by the camp finds D-389 and D-271 through D-389's *Relations*. Goes to the request's list.
- **M3 — fixed.** The rule „The camp of Siedziba” (`guidelines/styleguide-browser-view.md`) was cut from about 35 lines to 15: it now says what the author is to do (imperatives), repeats no sentence of D-389, names no file of the code (it points to the game's data and to TypeScript for sizes), and keeps what To do 7 asks: what the camp is made of, which characters stand in it, where the band stands, its background, the narrow window, the motion and reduced motion, no text or click. *Decision* gained D-286 and D-280, which the body cites. Read `.the-way/product-guidelines/template.md` ("A rule … repeats no decision … lists no state") and the styleguide template; done by hand within their rules since the skill `the-way-maintain-styleguide` is a refinement skill whose author-side form is the template. The token rule's paragraph on the camp's geometry (it names `camp.tsx` as the scene's does `scene.tsx`) was not in M3's range and is unchanged.
- **M4 — fixed.** New case at the end of `tests/view/scene-picture.test.mjs`, "the camp's files hold pixels alone, in the size of the data": chunks `IHDR`, `IDAT`, `IEND` only for both files, sizes 672 × 48 and 26 × 21, the clearing with no clear pixel, the chest with no half-clear pixel, in the form of the wolf's case (same `decodePng`). Failing once for the break it names: `assets/sprites/chest.png` re-exported with a `tEXt` chunk before `IDAT`, `npm test -- tests/view/scene-picture.test.mjs` exit 1, the new case failing; file restored from a copy (not in `git status`); then the same command exit 0, 70 pass.

## Checks (command, exit)
- `python -B .the-way/elements/common/foundation_check.py`: 0, 0 errors
- `npm run typecheck`: 0
- `npm test -- tests/view/scene-picture.test.mjs`: 0 (70 pass), after the broken run above (exit 1)
- `npm test -- tests/view/headquarters-screen.test.mjs`: 0 (22 pass); `npm test -- tests/view/camp-picture.test.mjs`: 0 (7 pass)
- `npm test -- tests/quality/test_quality_invariants.py`: 0 (Prettier, ESLint, Ruff on the changed files)
- `npm test -- tests/invariants/test_browser_view_token_values.py`: 0
- `python -B .the-way/instruction-files/check_instructions.py .`: 0 errors, no new warning (124 warn; 126 before, the rule lost two dead-path lines)
- Full gate not run.

## Own-work check
Requirement most likely missed: the shortened rule drops something To do 7 asks. I compared its list ("z czego obóz się składa, które postacie, gdzie stoi pas, jego tło i zachowanie w węższym oknie, czym jest ruch i co robi pod ograniczeniem ruchu, że nie ma tekstu ani reakcji na kliknięcie") with the new body: all eight are present; "no new role/token/meaning" kept. `grep` of the three texts for "prawej", "lewej", "right of", "to its left" finds none in D-389 or the styleguide rule.

## Unread material
none beyond the earlier report's list; read whole this time: the handoff, findings, `change/fix.md`, `product-guidelines/template.md` lines on rules (the file was read in the first stage), the decisions template section "Changing a decision" and `decide_entry.md`.

## Searches not found or unclear
- Not found: any rule of the record-decision method that allows a changed question of a current decision (basis of the M2 contest).
- Unclear: whether the `scene.ts` comment is among M1's "three texts"; I read the handoff's M1 (decision, styleguide) as not including it and said so above.
