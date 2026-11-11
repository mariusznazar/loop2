# Return step report — Zbieranie jako widowisko (head 8531d93d, one commit added)

**Status:** done. **Commit:** `d457d238` docs: record the facing in D-362 and D-365, tidy D-317 and the styleguide.

## Foundation compared with code

Compared at head 8531d93d: D-362, D-363, D-364, D-317, D-271, `smoke-fire-particle-licence`, `sprite-credits`, the part-map row, the
styleguide section; *Decisions in play* of the frozen task (D-04, D-18, D-27, D-43, D-66, D-272, D-273, D-291, D-316, D-318 to D-322,
D-349, `sprite-file-content`, `content-identifiers`, `browser-view-token-values`, `cc-by-3-*`); the part map of `browser-view`,
`simulation`, `product-foundation`, `agent-workflow` (nothing changed in them: no file moved out of a part, the new files fall under
`assets/sprites/**` and `src/browser/**`). Whole-foundation search (way of working step 2) for the entries the change touches: D-316
(props and the mage's sheets: still true; the bend sheet and dust are data, the part of D-316 the task assigns to task 20 is not written),
D-319 (walk "no effect of an ordinary event": consistent), D-320 (badge unchanged; the flying plaque is a second use of `panel`, which D-40's
"a block set apart" covers), D-322 (all motion stands still: covers the effects), D-43 (the flying resource icon holds its colour in its
file: consistent), D-349 (the plaque's 24 px is drawn for the one size), D-291 (the flying icon is the resource's, not the action's: consistent).

## Decisions written or changed

- **D-362 changed** (row 1, the author's added part): a third binding sentence, "It faces the prop of what it gathers, as the game's data
  gives its side, and where the resource has no prop it bends as it stands"; Verification examples and a Rationale sentence added. Why
  an entry: the facing binds after the merge (the styleguide and the data carry it; a later agent would otherwise copy "right"). Mark: **the
  cycle's** (no row and no projected entry carries it). *Rejected* untouched (it holds the row's source ways; the ways I derived — facing right
  always, facing as it walked — stand in the Rationale as the reason, not in *Rejected*, WAY-134).
- **D-365 written** — "Which readings of the game show an effect of the end of a gathering?": exactly one end of a gathering, no action
  that takes pieces out of the backpack, a previous reading of the same map run, no map run started, the scene going on; the effect at
  the mage as it stood at the previous reading; any other reading shows none (so an overdue effect is dropped); a newer effect replaces a
  running one. Why an entry: the task carried question 2 ("which effect is overdue") to the cycle, and the rule binds task 18–20, which
  build more effects on the same scene; the task does not exclude it (it excludes only the rule of question 6 and the whole
  reduced-motion rule). Mark: **the cycle's**. *Rejected:* `none considered`. Meaning, English: the scene shows the effect of a gathering's
  end only when the reading tells the result surely, and otherwise shows nothing. Po polsku: scena pokazuje efekt końca zbierania tylko
  wtedy, gdy odczyt pewnie mówi o wyniku, a w każdym innym odczycie nie pokazuje nic.
- **D-317**: Rationale wording only (the measured "within a second" taken out). **D-27: not changed** (see below). **D-271:** unchanged
  since the foundation step.

### Item 1, D-27 — decided: no change
D-27's binding text says the footer and the section "each credit each icon with its title … its author … its page on game-icons.net and its
licence, and say how the icon file differs". That is still true of every icon; the pack's row is another line, which D-271 ("the game credits
each pack whose licence asks for a credit") and `sprite-credits` govern. D-27 does not say the footer holds nothing else, so no sentence of it
is false; the correction the return step makes is of what no longer matches, and nothing does. Left to task 24: its projected wording of
D-27 (the section "folded and opened with one click, on Siedziba and on the login card") and the move of all rows, the pack's included.
The review's note that D-27 is stale I answer with this reading; the orchestrator may overrule it.

## Invariants written or changed
None new. `sprite-credits` stays as the foundation step wrote it (method `review`; not a rule I add). I did not write an invariant for the
facing, the readings or the timings (no rule the task, a decision or the human sets as an invariant).

## Environment facts
None new. The statement that the pack file holds 16 cells of 16 × 16 in a 64 × 64 sheet with the smoke in rows 0–1 is no fact the code rests
on: `assets/sprites/dust.png` is a self-contained derived file (128 × 16, 8 frames, data in `SCENE_DUST`); no change to the pack's page could
make the code false. Its licence, which the code does rest on, stands in `smoke-fire-particle-licence`.

## Glossary terms
None. "effect of an ordinary event", "overdue", "end of a gathering", "bend" are used in the sense a reader of the field takes (WAY-95), and
D-365 gives "overdue" its operative meaning in the entry that uses it. "catch-up" was used against its entry in the changed wording and is
corrected (the fix replaced it with "a tab left in the background", in `scene-picture.ts` and D-317); no entry. No other use of "catch-up"
in my entries (searched `foundations/decisions.md`, the styleguide and `src/browser/view`: only the glossary's meaning remains).

## Part-map changes
None beyond the foundation step's External context row. The parts' files and trust boundaries are unchanged.

## Projected entries written whole or in part; rows of *Settlements to record*
- Rows 1, 2, 3 → D-362, D-363, D-364; row 4 → `sprite-credits` (with the pack's credit line the invariant's sentence names). Confirmed.
- D-317 in part (first sentence), D-271 in part (the dust pack, `Based on` with `smoke-fire-particle-licence` and
  `cc-by-3-adaptation-credit`, verification examples), `smoke-fire-particle-licence`, the part-map row, the styleguide section — all written
  (foundation step; styleguide also corrected in the fix and here). The parts the task says NOT to write are absent: no rule of question 6
  (trwające zajęcie i stan całej sceny nie są efektem) in D-317, no whole reduced-motion rule, no rule D with its condition in D-271, no
  scuffle's cloud, no wolf; D-316's projected rewrite not written. D-317's Verification and D-362/363/364 mention reduced motion only for
  the part of the rule the code of this task makes true (the styleguide says it for the mage and the effects; D-317's sentence unchanged).

## Choices that stay rows of the questions table (way not taken · cost if wrong)

1. **Timings**: effects 300 ms; flight x linear, y ease-out/ease-in with an arc of 6 scene pixels; dust runs its frames once in 300 ms; bend
   loop 160 ms per frame. Not taken: 4 dust frames at 75 ms; a higher arc (14 px, it covered the badge). Cost: look only; the human judges.
2. **Frame order of the bend**: full bend, half, standing, half (the first frame is the reduced-motion frame). Not taken: half, full, half.
   Cost: a different rhythm; the reduced-motion frame would be a half bend.
3. **The 8 dust frames** (all smoke cells of the pack) and the **brown ramp** of five scene colours, each at least 3.13:1 against the ground.
   Not taken: 4 frames; a darker ramp. Cost: look; the human judges at the request.
4. **Effect and plaque outside the `no-preference` block**: the effect's 300 ms life (a visibility animation) runs at every motion setting so
   that it disappears and `animationend` removes it; only the movement is inside the block. Not taken: no animation under reduced motion
   (the effect would never leave). Cost: the part of the whole reduced-motion rule that task 20 writes may need to keep this exception.
5. **The icon's landing** at the mage's body (32 right, 18 over the line) and the dust's place (centred on the prop, 2 below its line): data in
   `SCENE_EFFECTS`; not taken: landing at the hand. Cost: look.
6. **Effects not created at a stop** (a pause or discovery): part of D-365 as written; if the human wants the icon shown frozen over a
   discovery, D-365 changes, not a row.
7. Facing at the fibre (as the mage stands): inside D-362 now, not a row.

## Checks (command, exit code)
- `python -B .the-way/elements/common/foundation_check.py` — 0 errors (after the edits)
- `npm test -- tests/invariants/test_design_token_contrast.py` / `test_design_token_sources.py` / `test_browser_view_token_values.py` — 0 each
- Not run: the full `npm test`; no code changed in this step, so no scene tests were rerun (they last passed at 8531d93d).

## Unread material
- `foundations/glossary.md` read whole. `return_step.md` and `foundation_step.md` read whole. The element skill of the glossary
  (`record-glossary-term`) not read (no term written). `environment-facts` skill not re-read (no fact written). Decisions D-03, D-18, D-65,
  D-67, D-71, D-125, D-197, D-242, D-267, D-291, D-314, D-315 not re-read whole in this step; D-27, D-40, D-316 to D-320, D-322 read.

## Searches not found or unclear
- None not found. Unclear: whether D-27 should name the pack's row (decided no, above); whether D-365 should give "overdue" a glossary entry
  (decided no; the entry defines it where it is used).
