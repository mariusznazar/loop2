FAIL dace1f39c1070b7ecf640b42223c4490222a96e7

# Review of the correction for the human's remarks — task `edytor-programu-modale`

Range `dc058bbc54cfe1b6fbaa565f7c41bf81a0da9e63..dace1f39c1070b7ecf640b42223c4490222a96e7` (commits `3c748e42`, `dace1f39`), full diff, reviewed by `review-change` with `fix.md` (correction for the human's remarks). `git rev-parse HEAD` = `dace1f39c1070b7ecf640b42223c4490222a96e7`; `.the-way` at `b502011f53225451ddf121e2b772a903b87492db`, equal to the gitlink.

Counts: blocking 1 (Important), Minor 6, out of scope 0.

## Remarks

- **(1) The window plainly sets itself off from the column under it — made, with one blocking defect.** The frame in `window-frame` (`#71717b`) and the shadow are applied by `.rule-list-panel .rule-panel` (`src/browser/program-panel.css:451-458`), the one place the rule panel is ever drawn (the panel is portaled into `panelHost`, which `seatPanel` puts into `.rule-list-panel`, `src/browser/view/rule-list.tsx:592-597`, `:791`), so both windows get it in both layouts and on both screens. In the author's screenshots the window before reads as the column continued; after, at 1600 × 1000 the light frame closes it on four sides and the shadow darkens the column under its lower edge; at 360 × 740 the frame marks its sides and top. The value has its source at it (`src/browser/tokens.css:22-23`; loop's `Sheet.tsx` at `715026e` confirmed to hold `border-zinc-700` and `shadow-[0_12px_28px_rgba(0,0,0,0.6)]`), and its contrast is held by `design-token-contrast` at 3:1 on `panel` and `highlight` (3.67:1 and 3.09:1). The shadow, though, lowers the contrast of text the player can still read and tap (Important finding 1).
- **(2) D-166: „gains” restored — made.** `foundations/decisions.md:8433` reads „…Programy did not lack width when this was chosen (2026-11-08), so opening the window under its row there gains it no width.” Nothing else in the sentence changed, and the „so” follows again: opening the window beside the editor would have gained Programy width, which it did not need.

## Findings

### Important

**1. The shadow of the window drops the text of the rows under its lower edge below the 4.5:1 of D-42 — rows the player can still read and tap.**
Place: `src/browser/tokens.css:23` (`--window-shadow: 0 12px 28px rgb(0 0 0 / 60%)`), applied at `src/browser/program-panel.css:457`; written into `foundations/decisions.md:5060` (D-40 *Rationale*, „and loop's shadow”) and `guidelines/styleguide-browser-view.md:1266-1269`.
What the player sees: when the window is shorter than the rest of the program, the rule just under its lower edge stands in a dark band. The window lies at `z-index: 1` over the rows, so its shadow covers that row, and the grey parts of the row get darker: the condition (`text-secondary`) and the number, time and count (`text-label`, `program-panel.css:236-238`).
Why it matters: those rows stay operable on purpose. A row only touching the window's lower edge is not `inert` (`liesUnder`, `src/browser/view/rule-window.tsx:58-60`), and the styleguide's Good example of the rule says „wiersze pod jego dolną krawędzią da się dotknąć” (`guidelines/styleguide-browser-view.md:1232`, `:1248`). D-42's first sentence binds every screen to WCAG 2.2 1.4.3, and its *Verification* leaves to review whatever contrast no invariant holds. The author's report says „The shadow is no role and has no pair, as D-42 gives no threshold to a shadow”. That holds for the shadow as a colour of its own. It misses that the shadow changes the background of text D-42 does hold. The human's remark asked for the value „kontrast wg D-42”.
Evidence: probe `.runs/task-cycles/edytor-programu-modale/reports/review-remarks-shadow-probe.txt`. It reads the bare column under the window's lower edge in the author's own after-shot `loop2_okno_po_rule_1600.png` (the real game, Chromium), at x=1100 from y=660. The shadow multiplies the colour by k = 0.54 at the edge, 0.71 at 12 px, 0.83 at 21 px and 0.96 at 30 px. In the before-shot the same pixels are all panel. With the text and the panel under the same factor, the ratios are:
  - `text-label`: 2.28:1 at the edge, 3.21:1 at 12 px, 4.09:1 at 21 px, 4.68:1 only from about 27 px;
  - `text-secondary`: 2.66 / 3.89 / 4.96;
  - `text`: 4.10:1 at the edge.
A row at 1600 is about 25 px tall, so the whole first operable row under the window holds its condition and its counts below 4.5:1. The author's walk did not show this state: in each of its shots the list ends under the window, so no row stood below its lower edge.
What a fix has to settle (not this review's choice): a shadow that does not fall on operable rows or keeps 4.5:1 on them (k ≥ about 0.9 for `text-label`, which leaves little shadow), or the frame alone, which the author reports already sets the window's edges off. In any case D-40's *Rationale* („and loop's shadow”, „told apart by the size of the window and its shadow”), its *Verification* test clause, the styleguide row of `window-frame`, the look bullet and the Bad example („bez cienia”), the CSS comment at `program-panel.css:448-449` and the test assertion on `box-shadow` (`tests/view/rule-window.test.mjs:264-268`) follow the choice.
Contradiction: yes — D-42 (first sentence: every screen of the browser view keeps 1.4.3 Contrast (Minimum); text roles at 4.5:1).

### Minor

**2. The colours the frame touches are held only in part.** D-42 (`foundations/decisions.md:5080`), D-40 (`:5050`) and `design-token-contrast` (`foundations/invariants.md:500`) hold `window-frame` at 3:1 against `panel` and `highlight` alone. The frame's lower edge also touches the row under it, which may stand on `rule-winning` or `rule-running` (rows under the window's edge stay drawn with their state, `program-panel.css:247-251`). At 1600 its sides touch the column's edge and `page` beyond it (author's shot `loop2_okno_po_group_1600.png`). Today the value equals `control-border`, which the test holds on all five backgrounds: computed 3.12:1 on `rule-winning`, 3.06:1 on `rule-running` and 4.1:1 on `page`. So nothing fails now, but a later change of `window-frame` alone could fall below 3:1 against a winning row with no check showing it. D-42's own sentence for `control-border` and `focus` is „against the colours they touch”.

**3. D-42 names the role for one window only.** `foundations/decisions.md:5080` says „the frame of the window of a rule, `window-frame`”, while D-40 (`:5050`), the invariant (`invariants.md:500`) and the styleguide (`styleguide-browser-view.md:25`, `:203-204`) say „of a rule or of a rule group”. D-288 tells the two windows apart. The threshold binds the role named, and D-40 binds the role to both, so no requirement differs. A reader of D-42 alone might still take the group's window as unheld.

**4. D-40's *Rejected* names none of the choices weighed.** `foundations/decisions.md:5061`. The *Rationale* gains the reason for the frame, but *Rejected* gains none of the alternatives the author weighed:
  - loop's own frame `#3f3f46`, below 3:1 (1.70:1 / 1.43:1, which only the token comment records);
  - the lighter `#9f9fa9`;
  - the frame kept in `divider` with a shadow alone;
  - the frame alone.
A later session may propose loop's frame again without seeing why it lost.

**5. The source of `--window-frame` gives no place for the value it takes.** `src/browser/tokens.css:22`. The only place the comment cites (`Sheet.tsx` at `715026e`) is the source of the value rejected, `#3f3f46`. `#71717b` itself is given as „the grey of labels of loop that control-border takes”, with no address or date. The rule „Every value with its source” (`styleguide-browser-view.md:488-496`) asks for the place the value was read from. The address does stand on the line of `--control-border` just above, so tracing costs one line. Two related staleness points:
  - The file's header comment (`tokens.css:6-8`) still defines „the agent's choice” as a value the accepted text of a task left to the agent. The styleguide rule now also counts a human's remark before the request.
  - The comment of the base rule (`program-panel.css:420-422`) still says the rule panel has „a frame in `divider`”. The panel is never drawn outside `.rule-list-panel`, so the player never sees that frame.

**6. Formatting.**
  - The new row of the table Roles (`guidelines/styleguide-browser-view.md:25`) is not padded to the table's columns. `npx prettier --check` of the styleguide passes at `dc058bbc` and warns at the head. Markdown is outside the gate's Prettier patterns, so nothing fails.
  - The rewrapped docstring line `tests/invariants/test_design_token_contrast.py:44` is 167 characters against the repository's width of 100 (`ruff.toml`). E501 is not selected, so Ruff passes.
  - The flagged case „the frame of the window at 1:1 on highlight” (`test_design_token_contrast.py:284-287`) also sets every text role to white, which fails the text pairs on `highlight` too. The case still proves its line, since the test asks only that the expected finding stand among the findings.

**7. `3c748e42` alone fails the foundation check (the author's note).** At `3c748e42` the check exits 1: `tests/view/rule-window.test.mjs:223: the quotation stands in no binding sentence of D-40`. It exits 0 at the head. This repository merges by merge commit (`git log main --merges`: #175–#179), so the commit lands in `main`'s history in a state the check refuses. The cost is only to a bisect or a per-commit run; CI runs on the request's head. Putting the D-40 sentence in the same commit as the test, or the test after it, avoids it.

## Declined to judge

- The items the remarks leave to the request's description (D-296 author's example, `RulePanelView` 184/200, no glossary entry for „okno”, Firefox/Edge/phone): outside this review by the remarks themselves.
- Whether the window at 360 × 740 sets off „plainly enough” with a frame that shares its grey with the controls inside it. D-40 accepts that cost by name, and the human judges the shots.

## Checks

- `npm test -- tests/invariants/test_design_token_contrast.py` — exit 0 (3 tests).
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0 (4 tests).
- `npm test -- tests/invariants/test_design_token_sources.py` — exit 0 (2 tests).
- `npm test -- tests/view/rule-window.test.mjs` — exit 0 (10 pass, 0 fail).
- `npm run typecheck` — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` at the head — exit 0 („0 errors”).
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0 („0 error, 0 warn, 122 info”).
- The same foundation check run in a detached worktree of `3c748e42` (`.runs/review-remarks/at-3c748e42`) with the head's pinned `.the-way` script — exit 1, 1 error (finding 7).
- `npx prettier --check` on the styleguide (exit 1, warn) and on its `dc058bbc` copy (pass); on `src/browser/tokens.css`, `program-panel.css`, `kitchen-sink/role-samples.tsx`, `tests/view/rule-window.test.mjs` — pass.
- Manual: the eight before/after screenshots fetched with `gh api` from `mariusznazar/screenshots` at `e3dee7a7` and viewed (all four pairs).
- Manual probe: pixels of the after/before shot at 1600 read with Pillow (finding 1; probe file in `reports/`).
- Manual: contrast of `#71717b` on `rule-winning`, `rule-running`, `page`, computed by the WCAG 2.2 formula (finding 2).
- Manual: `git show 715026e:src/components/probe/Sheet.tsx` in `a checkout of the old Loop's repository` — the frame and shadow classes the sources cite stand at lines 48 and 63.
- Not run: the full gate (`npm test` with no file), which is the cycle's; the kitchen-sink page build. Neither a finding needed. No running game opened: the author's own render served the probe.

## Reach beyond the dispatch

- `foundations/decisions.md` D-288 opening paragraph (`:9441-9450`): whether „the window of a rule” covers the group's window (finding 3).
- D-43 (`:5095-5108`), read whole while reading D-40–D-42.
- `src/browser/view/rule-window.tsx:54-105` (`liesUnder`, `useCoverBelow`) and `src/browser/view/rule-list.tsx:370-395`, `:520-545`, `:590-600`, `:770-792`: which rows stay operable and where the panel is drawn (finding 1, remark 1).
- `src/browser/program-panel.css:230-301`, `:420-458`: the roles of a row's parts and the row states (findings 1, 2, 5).
- `ruff.toml`, `tests/quality/test_quality_invariants.py:18-28`: the width and the Prettier patterns (finding 6).
- The repository `loop` at `715026e`: source of the values.

## Working copies

`.runs/review-remarks/` held the detached worktree `at-3c748e42`, the eight screenshots, the probe script and its output, and a copy of the styleguide at `dc058bbc`. The worktree was removed with `git worktree remove --force .runs/review-remarks/at-3c748e42`, and the directory with `rm -rf .runs/review-remarks`. `git worktree list` holds no `review-remarks`, and `git status` of the reviewed worktree is clean. Kept: the probe's text (script and output) at `.runs/task-cycles/edytor-programu-modale/reports/review-remarks-shadow-probe.txt` as the evidence of finding 1. No browser was opened.

## Unread material

- Decisions read whole: 5 — D-40, D-41, D-42, D-43, D-166. D-288 is read in its opening paragraph only, the rest not.
- `guidelines/styleguide-browser-view.md` (1895 lines) is not read whole. Read: lines 1-30 (table Roles), 180-210 (contrast of every pair), 455-504 (every value with its source), 1180-1290 (program editor; the window of a rule and of a rule group).
- `guidelines/testing.md` is read to line 203 of 510; the rest is not read.
- `guidelines/coding.md` is not read.
- `.the-way/product-guidelines/reading.md` and `.the-way/elements/common/way_of_working.md` are not read: the selection was made from the handoff's naming of the touched entries.
- `.the-way/product-guidelines/template.md` is not compared with the styleguide change.

## Searches not found or unclear

- A sentence of D-42 or the styleguide on text under a shadow or overlay: none found. Finding 1 rests on D-42's first sentence (every screen keeps 1.4.3).
- Whether WCAG 1.4.3 is commonly applied to text under an overlay's drop shadow: unclear in general practice. Here the rows are operable by D-288 and the styleguide, so the review treats them as text that must keep the ratio.
