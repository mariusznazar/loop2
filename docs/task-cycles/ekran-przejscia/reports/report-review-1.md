FAIL be3f4086c05de4490e2e572bda989c3ca0d18e09

(Saved by the orchestrator from the reviewer's returned text: the harness refused the reviewer's own write.)

# Review 1 — the plan's *Foundation entries* (`cd8ff84`) and Slice 1 (`cd8ff84..be3f408`), task cycle `ekran-przejscia`

- Range: `44317eb..be3f408`. `git log` shows `cd8ff84` and `be3f408`. `git rev-parse HEAD` = `be3f4086c05de4490e2e572bda989c3ca0d18e09`.
- Files: `foundations/decisions.md` (+210 −61), `foundations/invariants.md` (+1 −1), `assets/sprites/forest-scene.png` (new), `README.md` (+1 −1).
- Counts: blocking 1 (Important), Minor 2, out of scope 0 (Declined to judge: 7 lines).

## Findings

### Critical

none

### Important

**I1 — D-312 names the copy's *first* rule group "as it stands". Task item 7 requires the group the game wrote the rule into. The two differ in states the player reaches while the band stands.**

Blocking; within the task. The plan mandates it (plan *Choices*, row 1), and it is still a defect.

- Place: `foundations/decisions.md`, D-312, binding sentences (around lines 6655–6658 at `be3f408`): „{nazwa grupy} being the name of the copy's first rule group as it stands, the group into which the game writes such a rule (D-123), and it gives the rule no number. Where the copy holds no rule group, the band leaves that sentence out.”
- Its *Rationale*: „Accepted with it: … a group renamed or moved while the band stands shows the name of the group first at that time.”
- What the task requires (`task.md:50-51`, To do 7): „Gdy w tej minucie gra dopisała regułę, pas mówi „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.””; „„{nazwa grupy}” to nazwa grupy kopii, do której gra wpisała regułę”. Row 5 of *Settlements to record* carries the same sentence.
- What is wrong: the binding sentence treats "the first group as it stands" and "the group the game wrote into" as the same thing; its own *Rationale* admits they can differ. The band stands during the pause, exactly when the player edits the copy. On the screen of a map run the editor moves whole rule groups by a handle (D-288: „whole rule groups move by a handle”; complies: „a rule group dragged by its handle above another”). Example: a copy has groups „Ogień” and „Głód”; the first chill writes „Zawsze → Eksploruj” into „Ogień”; the player drags „Głód” above it; the band now says „Gra dopisała regułę w grupie „Głód”…”, which is false: the rule is in „Ogień”. Deleting the first group gives the same false name. Deleting every group drops the sentence the task says the band shows. A rename alone stays right (same group, new name).
- Why it matters: the band tells the player where to find the rule the game wrote — the reason the task gave for naming the group: question 6 rejected „gracz sam szuka reguły w programie”. In these states the band points at the wrong group. The "Accepted with it" is the cycle's acceptance written as the decision's, not the human's; question 6 and row 5 carry no such cost. Slices 2 and 8 build on this entry, so the departure would reach the code.
- Evidence: the D-312 lines quoted above; `task.md:50-51`; D-288 (`foundations/decisions.md:6082-6100`); `src/browser/view/program-editor.ts` exports `dropGroup` and `removeGroup`.
- What would clear it (recommended, either one): (a) the band keeps the name of the group as it stood when the discovery arrived, and D-312 says so; the screen holds that name while the band stands, outside the game state; the saved state keeps its shape and `SAVED_GAME_VERSION` stays 3. (b) D-312 keeps its present meaning, and the orchestrator puts the departure from To do 7 to the human as an explicit question at the request; D-312 is marked as awaiting that answer instead of stating the cost as accepted.

### Minor

**M1 — D-313's *Rejected* holds a way not chosen that the row's source does not keep (WAY-134).**

- Place: `foundations/decisions.md`, D-313, *Rejected*, last item: „the rule group „Program” with the condition „Zawsze” added where the copy holds none, as the game does at the first chill (D-123) — reachable only by deleting every group in the pause.”
- What is wrong: D-313 is written from row 4, whose source is questions 5 and 10. Their *Not chosen* hold three ways, all present: the button as „+ reguła”, the button later, and the target always first in the grid. The fourth way comes from the plan's *Choices*. The rule it breaks is in `.the-way/elements/decisions/template.md`, „Decision entry”: the *Rejected* of a decision written from a row „holds the ways not chosen that the row's source keeps … A way the writer derives — from what the cycle would otherwise guess, from the cost of the way chosen, or from the foundation — never enters it (WAY-134).” The foundation agent's report, concern 5, says it took that way from the plan.
- Why it matters: whoever proposes the option later reads *Rejected* as "already weighed" (template, „Fields and their readers”). Here it presents the cycle's choice, which the human never weighed, as a weighed rejection. The binding clause "disabled where the copy holds no rule group" comes from the orchestrator's answer and is fine. Where its rejected alternative belongs is the orchestrator's call: the cycle record, or a *Rejected* marked as the cycle's.

**M2 — D-147 and D-185 keep *Rejected* reasons about an order the entries no longer have.**

- Place: `foundations/decisions.md`: D-147 *Rejected*: „putting it above discovery — moves the explanation of the pause”; D-185 *Rejected*: „placing it above discovery — changes the established order; placing it under the backpack — changes the accepted placement below the status”.
- What is wrong: after this change the discovery stands as a band above the program, in a different area from the paragraph and the line (D-122, D-311). D-185 no longer places its line „below the status”: its binding sentence and *Rationale* were rewritten for the world area. The template („Changing a decision”) says *Rationale* and *Rejected* „describe the decision as it then stands” (WAY-07, WAY-19). The foundation step already rewrote D-185's *Rationale* for the same reason and left its *Rejected* as it was.
- Why it matters: small. A reader weighing a new placement meets reasons that refer to a layout that no longer exists. Question 7 limits this task to the sentences about placement, and these reasons are about placement too.

## Slice 1 and the trust boundary (D-273)

- The file holds pixels alone: own chunk reader shows a valid signature and `IHDR` (336 × 152, bit depth 8, colour type 2 RGB, no interlace), `IDAT`, `IEND`, each with a valid CRC, 0 bytes after `IEND`; no text, time, gamma, colour-profile or physical-size chunk. sha256 `5b2dffeb…6198` matches the executor's report and `git show be3f408:assets/sprites/forest-scene.png`.
- The picture is the recipe and nothing more: recomposed from `C:\Storage\repos\loop\public\sprites\` (`ground.png` tiled; the twelve `DECOR` pieces of `Scene.tsx:28-41` at (x, y − height of its file), in order of y, ties in array order, `tree_bare`/`sap_bare` as `tree_snow`/`sap_snow`): 0 of 51 072 pixels differ. Nothing darkened or recoloured (D-315), no figure, fire or prop. Viewed: pines, two frosted bare trees and two saplings on pale snow ground, no text (D-272, D-314).
- The build copies only PNG files, only into what `npm run build` writes: `copySpriteFiles` in `scripts/static-files.mjs` copies the `.png` names directly in `assets/sprites/` into `sprites/` of the output; only `scripts/build.mjs:52` calls it; `scripts/kitchen-sink.mjs` imports `copyStaticFiles` alone. The range changes no `scripts/`, `package.json`, `Dockerfile` or `.dockerignore`. `copySpriteFiles` run into a scratch directory wrote exactly `sprites/forest-scene.png` and `sprites/login-backdrop.png`, the first byte-identical to the source.
- `README.md`: the `npm run build` sentence names `assets/sprites/forest-scene.png` beside `login-backdrop.png`, as the plan asks; only that line changed.
- Snow variants placed at their own height: the foot stays on `DECOR`'s ground line, as the old scene places every piece (`top = y − h`, `Scene.tsx:178-180`); not a finding.
- Own-work check: fits where the slice is weakest; the recomposition is a stronger form of it.

## The foundation entries against the task and E1–E18 — checked, no finding beyond the above

- E1, D-130: binding sentence, *Rationale* and *Rejected* match the projected entry word for word (`definicja_mvp2_loop2.md:674-689`); the *Rejected* without reasons is the projected wording.
- E2, D-19: binding sentence and the added *Rationale* sentence match the task's quotation word for word.
- E3 + E4, D-311: three areas under one header; the world in the order of To do 4 and question 4; the right area as To do 3, the end of a map run kept out by the *violates* example; the header as row 1 and To do 1, its order matching `src/browser/view/status-row.ts:189-196`; *Rejected* holds the projected entry's four ways and question 3's three *Not chosen* (WAY-134); „until task 14” dropped for a sound reason.
- E5 D-133, E6 D-147, E7 D-185, E8 D-216: sentences about place agree with question 4; D-216 matches the projected sentence.
- E9, D-122: the part this task makes true; the encounter sentence moved to D-147 (WAY-19); colours, chronicle and the end left to tasks 7, 15, 16.
- E10, D-312: see I1; its *Rejected* holds question 6's three ways.
- E11, D-313: rule, target and field agree with questions 5 and 10, the field order with D-306; see M1.
- E12 D-314, E13 D-315: agree with rows 2 and 3 and question 2; the login picture is darkened, as D-315's *violates* says (viewed).
- E14 D-272, E15 D-282, E17 D-46: agree with their rows.
- E16, D-281: unchanged, as the plan expects.
- E18, terrain-drawing-numbers: reworded only to drop „terrain panel's”; no invariant test changed in the range.

## Declined to judge

- Entries describing a header, band and areas the code at `be3f408` does not yet draw: later slices; the whole-change review checks it.
- The docstring of `tests/invariants/test_terrain_drawing_numbers.py:1` still quotes the old sentence: Slice 7's.
- „terrain panel” left in D-19 (projected wording), D-70, D-125 and D-45 (foundation report, concern 2): outside this task.
- „discovery line” in D-121 and D-195 (concern 3): still true of the text; outside this task.
- The critique of the entries by a fresh agent did not run (concern 4): a step of the cycle's process, not a property of the change.
- D-130's *Rejected* losing its reasons: the projected wording written whole (WAY-126); a matter for the project definition.
- How Slice 2 will tell that the held discovery wrote a rule once task 10 makes the first chill's rule conditional (projected D-123: „only where the copy holds no rule with the action „Eksploruj””): not in this range.

## Checks run

| Check | Command or method | Exit | Result |
|---|---|---|---|
| head | `git rev-parse HEAD` | 0 | `be3f408…`, as given |
| range | `git log --oneline 44317eb..be3f408`; `git diff --stat 44317eb..be3f408`; `git diff 44317eb..be3f408` | 0 | 2 commits, 4 files |
| PNG chunks | `python -I -B <scratchpad>/rev/chunks.py assets/sprites/forest-scene.png` | 0 | IHDR/IDAT/IEND, CRCs valid, 336 × 152 RGB 8-bit, 0 trailing bytes |
| blob identity | `git show be3f408:assets/sprites/forest-scene.png \| sha256sum` | 0 | `5b2dffeb…6198` |
| recomposition | `python -I -B <scratchpad>/rev/recompose.py assets/sprites/forest-scene.png` (Pillow 12.3.0) | 0 | 0 differing pixels of 51 072 |
| build copy | `node <scratchpad>/rev/copy.mjs <worktree> <scratchpad>/rev/out1` (`copySpriteFiles` into a scratch output) | 0 | wrote only `sprites/forest-scene.png`, `sprites/login-backdrop.png` |
| byte comparison | `cmp assets/sprites/forest-scene.png <scratchpad>/rev/out1/sprites/forest-scene.png`; `cmp … dist/public/sprites/forest-scene.png` | 0, 0 | identical |
| who copies sprites | `grep -rn "copySpriteFiles\|copyStaticFiles\|assets/sprites" scripts/ package.json Dockerfile .dockerignore` | 0 | only `build.mjs` calls `copySpriteFiles` |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 | „0 errors” |
| visual | viewed `forest-scene.png` and `login-backdrop.png` | — | snowy pines and bare trees, no text or figure; login picture darkened |

`<scratchpad>` = `C:\Users\Mariusz\AppData\Local\Temp\claude\c7b90770d5ecab56\66d7f6e0-fa53-4044-8ba6-6ec8e20036be\scratchpad`

Not run: `npm run build` in the reviewed worktree (would rewrite `dist/`; its sprite step run on its own instead); `npm test -- tests/invariants/test_terrain_drawing_numbers.py` (the range changes only the invariant's sentence).

## Reaches beyond the dispatch

- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp2_loop2.md:224-245, 629-700`: D-311, D-122, D-123, D-124, D-130 against their projected entries.
- `.the-way/elements/decisions/template.md` („Decision entry”, „Changing a decision”) and `.the-way/elements/decisions/skill/projected.md`: for M1 and M2.
- `foundations/decisions.md` D-123 (2245-2277), D-124 (2278-2301), D-306 (6461-), D-288 (6082-6100), and a grep for old placement phrases.
- `src/browser/view/status-row.ts:160-215` and the export list of `src/browser/view/program-editor.ts`.
- `C:\Storage\repos\loop\src\components\probe\Scene.tsx:1-60, 155-200` and the listing of `C:\Storage\repos\loop\public\sprites\`.
- `assets/sprites/login-backdrop.png`, viewed.
- `scripts/build.mjs:40-53`, `scripts/kitchen-sink.mjs` (grep), `Dockerfile`, `.dockerignore`.
- `guidelines/styleguide-browser-view.md`, read whole: no rule reaches a PNG picture.
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.

## Searches not found or unclear

- Whether loop's `ground.png` comes from Pixel Crawler: nothing per file; only the header comment of `Scene.tsx` („Grafika: Anokolisa — Pixel Crawler”) covers the scene's sprites as a whole.
- Where „+ grupa” puts a new group (end or start): not looked up; I1 is reachable through dragging and deleting either way.
- Whether the critique of the foundation entries is required before this review (`elements/common/way_of_working.md`, concern 4): not read; declined above.
