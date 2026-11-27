PASS ba1ccf8d5a1835123b62b20ddf7802173e7fa10d

# Review of the whole change — wyglad-ekranu-wiedzy

Range: base `a49c5f63e63037c3e608fbf3066cde178c5c06e9`, head `ba1ccf8d5a1835123b62b20ddf7802173e7fa10d`
(`de3bbbfa` D-416, `ad650416` the screen and tests, `ba1ccf8d` the styleguide rule). `git rev-parse HEAD`
in the reviewed worktree gave the head. Route: one author, no plan, no slices; so every finding below
comes from no slice. The change touches no trust boundary of the part map (no file of the
`Trust boundary` lists of `browser-view`, `agent-workflow` or `product-foundation` is in the diff) and
holds no operation that cannot be undone. No screenshot file stands among the commits.

## Blocking findings

None.

## Minor findings

**M1 — outside the task's scope.** `foundations/decisions.md:4600` (D-280, *Rejected*): „the skill trees
shown on two screens, as in loop — the same rows on Postać and in Wiedza”. The change makes the row of a
tree on Wiedza stand „as the row of a tree on the screen Postać” (D-416, second paragraph) and gives
D-416's *Rejected* the word of row 5, that it rejects the rows of Postać with their level, practice,
points and buying, „not the layout of the row of a tree that the two screens share”. D-280's *Rejected*
names the same rejected option with no such word. The task gave row 5 for exactly this risk („bez słowa
w *Rejected* następny czytelnik D-416 może wziąć zestaw za to, co decyzja odrzuciła”, question 2's weak
point); the same reader of D-280 can still take the shared layout for what D-280 rejected. A *Rejected*
binds nothing and D-416's binding sentence now says the opposite explicitly, so the effect is a reader's
doubt, not wrong behaviour — Minor. It lies outside the task: *Decisions in play* holds D-280 „Bez
zmiany” and quotes only its binding sentence, and the author read only that sentence (a gap the
orchestrator carried). Recommendation: put it to the human as one more word in D-280's *Rejected*, the
same as row 5, or leave it; I would add the word, it costs one clause and closes the same doubt row 5
closed.

**M2 — within the task.** `tests/view/knowledge-screen.test.mjs:313` (comment „control other than the
rows of the trees”) and `tests/view/knowledge-screen.test.mjs:344` (message `"only the rows of
trees"`): after the change the buttons are the folds at the start of the rows, not the rows, as the
rest of the file now says („The folds of the trees, the buttons at the start of their rows”, line 42).
The assertion itself stays right (two folds, each with `aria-expanded`); only its words are stale, and a
reader of a failure would look for a button that is a row. Polish.

## Declined to judge

- The colour of the glyph „▸” in the fold, which the screenshots show pinkish before and after the
  change and on Postać alike — a rendering of the shared button's glyph, not of this change.
- „Konto” standing in a second row of the menu bar at 360 px (before and after) — the menu bar, outside
  the task.
- Whether the screen is „ładniejszy i czytelniejszy” — the acceptance criterion is the human's judgment
  on the comparison of screenshots; what I saw is under Checks.
- Item 6 of *To do*, the description of the request with the comparison of screenshots — the request is
  written after this review and is not in the range; the screenshots it needs exist (see Checks).

## Against the task

- *To do* 1 (branch): first line „Wprawne oko · 3 stopnie”, prices „1 · 1 · 1 pkt” in a right column,
  description under the name, the line of steps under the description from `preview` through the one
  function `rankValue` shared with Postać's `branchText`, in both layouts; branches with no number
  („Obchód”, „Czysty płomień”, „Zwiad”, „Ucisk”) with none. Met (code, tests, screenshots 06 and 08).
- *To do* 2 (row of a tree): across the area, `divider` line, fold as the shared button at the start,
  name in `text-strong`, „{n} gałęzi” at the right, a click anywhere on the row toggles (same pattern as
  `character-trees.tsx`). Met.
- *To do* 3 (Understanding in columns): `repeat(auto-fill, minmax(min(12em, (100% − gap)/2), 1fr))`,
  at least two; the rule's sentence gives the least width 12em. Met (2 columns at 1600 and 360, 6 at
  1100 in the screenshots).
- *To do* 4 (fits at 360, no crossing, 48 × 48): screenshots 07 and 08 show no scroll to the side, no
  text over a frame and folds 48 px square; the measurement lists are the author's. Plausibly met; my own
  browser measurement not run (see Checks).
- *To do* 5 (D-416 and the styleguide say what the screen shows; Good and Bad on the screen after the
  change): met; I compared every sentence of the rule „The screen Wiedza” with the CSS and the
  component, roles included.
- *To do* 6: screenshots present (see Checks); the description itself is outside this range.
- *To do* 7 and the four departures of the author's report, each judged against question 4 („wygląd,
  słowa, proporcje, odstępy, ułożenie”, no unchosen variant, no decision left unchanged departed from):
  1. the line of steps as small two-line pieces in both layouts — ułożenie; question 7 named „w
     tabelce” among the allowed arrangements; no unchosen variant (Q1 a/c, Q7 b/c) is taken. Inside.
  2. „{n} gałęzi” in `text-secondary` at label size — wygląd, a note by D-40. Inside.
  3. least column width 12em, 6 columns at 1100 instead of the estimated ~8 — *To do* 3 gives the width
     to the agent and the ~8 was a stated estimate; the 4 px icon gap — odstępy. Inside.
  4. no `highlight` under the pointer on the row — wygląd, as Postać's row. Inside.
- *Settlements to record*: row 1 → D-416 sentence (faithful; „the value with no step” comes from the
  answer's own example „bez gałęzi 70 %”; „Ucisk” added to the three names agrees with the data and with
  D-199); row 2, 3, 6 → styleguide (faithful); row 4 → D-416 sentence and *Verification* reworded from
  „row” to „fold” as *Decisions in play* asks (faithful); row 5 → D-416 *Rejected*, as *Decisions in play*
  and question 2's answer place it („jedno słowo w D-416: odrzucenie … dostaje słowo”) — the row's
  *Goes to* „sentence of D-416” is satisfied by a sentence of D-416's entry; I take no finding there.
  The word adds „practice” to „level, points and buying”, which narrows nothing and matches D-416's
  *Verification* („no level, no practice, no points”).
- *Decisions in play*: D-416 changed as the three items give; *Rationale* and the kept sentences
  unchanged; D-280, D-282, D-396, D-44, D-40, D-43, D-291, D-199, D-200, D-379, D-418, D-419, D-38 not
  departed from by the code. D-416 now holds three sentences in its second paragraph, within the
  template's one to three; `foundation_check.py` passes.
- No reserved choice taken: no dependency, language, store, login or place to run changes (`package.json`
  and the lock file untouched), so I did not open `reserved_choices.md`.

## Against the foundation and guidelines

- D-43 / `src/browser/AGENTS.md`: `12em` stands in a `minmax()` of a layout grid's column — a layout
  dimension D-43 exempts; every other length reads a token, and each token named exists in
  `src/browser/tokens.css`.
- D-44 / D-47: the fold is `ReactButton` with `expanded` and `label={tree.name}`; no `outline`; the row is
  a `div` with a click handler and no focus, the keyboard reaching the fold, as on Postać (D-199).
- D-396 / rule „Two layouts and one threshold”: one `@media (width < 1280px)` block with its D-396 comment
  after the rules it changes; no other threshold.
- D-40: name `text-strong`, counts and descriptions `text-secondary`, section-like numerals `text-label`,
  values and price column `text`; no new role, value or meaning.
- Testing guidelines: values in the new cases written out explicitly from the data (game parameters),
  branch picked by identifier; the probe below shows the row test fails when the row's handler is gone.
- Structure: no file or function near D-425's thresholds (largest touched file 245 lines); the size test
  gives the same result on base and head; `knowledge-screen.tsx` was split into `Tree` and `Branch`.
- Styleguide against `.the-way/product-guidelines/template.md` and `styleguide/template.md`: the rule
  keeps the required fields; the value 12em in the rule is what *To do* 3 requires.

## Checks

All commands from the reviewed worktree `the worktree of the task` unless a
worktree of mine is named.

- `git rev-parse HEAD` — 0, `ba1ccf8d…`.
- `python -B .the-way/elements/common/decision_index.py --output .runs/review-whole/sections.md --sections` — 0.
- `python -B .the-way/elements/common/decision_index.py --output .runs/review-whole/index.md --section "Browser view: screens, navigation and their code" --section "Look of the browser view: styleguide, controls, pictures and fonts" --section "Character skills and nature energy" --section "Discovery and the Understanding" --part browser-view --part agent-workflow --part product-foundation --decision 416 280 281 282 396 44 40 43 291 199 200 379 418 419 38 42 39 47 48 274 275 276 279 425` (each `--decision` given separately) — 0; 74 listed in full, 270 by heading.
- `python -B .the-way/instruction-files/check_instructions.py` — 0; „0 error, 0 warn, 120 info”. No warning, so no finding.
- `python -B .the-way/task-cycle/change_file_sizes.py a49c5f63 ba1ccf8d` — 0; 8 files, +378 lines.
- Worktree of the base `.runs/review-whole/base` and of the head `.runs/review-whole/head`, each with `.the-way` at `6ed3cb36` and `npm ci` — 0 and 0.
- base: `npm test -- tests/quality/test_function_and_file_size.py` — 0 (Ran 2, OK); head: the same — 0 (Ran 2, OK). Nothing pushed over a threshold.
- head: `npm test -- tests/view/knowledge-lines.test.mjs` — 0 (5/5); `npm test -- tests/view/knowledge-screen.test.mjs` — 0 (7/7); `npm test -- tests/view/character-skills.test.mjs` — 0 (8/8); `npm test -- tests/view/character-screen.test.mjs` — 0 (16/16).
- head: `python -B .the-way/elements/common/foundation_check.py` — 0, „0 errors”.
- Probe, head: the row's `onClick` moved onto the fold only (a row that only its fold opens), then `npm test -- tests/view/knowledge-screen.test.mjs` — 1 (1 of 7 failed); reverted with `git checkout`, worktree clean. The test protects the click anywhere on the row.
- Screenshots: the eleven files of `mariusznazar/screenshots@8bbd7858`, `loop2/wyglad-ekranu-wiedzy/`, downloaded with `curl -sSfL` (each 0) and looked at one by one: 00 (old Loop, 26 things; new game), 01–04 (before at 1600 folded/open, at 360 folded/open), 05–09 (after at 1600 folded/open, at 360 folded/open, phone layout at 1100). What they show: full-width tree rows with lines and right-aligned counts in place of ragged framed buttons; open branches with the line of steps in both layouts, „Długi krok” ending „1 min”, „1 min”, „Mocniejszy cios” in two rows of steps at 360, „Zwiad” and „Obchód” with no line; the Understanding in 2 columns at 1600 and 360 and 6 at 1100; nothing crosses a frame and nothing scrolls to the side in the 360 shots; folds 48 px square at 360. The open trees hold every case *To do* 6 names. The screen plausibly meets the criterion; the verdict is the human's.
- Not run: the full suite (the cycle's or CI's); a browser session of my own with the measurement of `.claude/skills/loop2-play/SKILL.md` — I relied on the screenshots and the author's measurement lists for *To do* 4, so the touch-target and crossing numbers stay the author's claims, consistent with what the screenshots show.

## Reaches beyond the dispatch

- `tests/view/page-document.mjs` (`press`), `src/browser/view/controls/react-button.tsx`, `src/browser/view/character-trees.tsx`, `src/browser/character-screen.css` — to judge the row's click, the fold and the parity with Postać.
- `src/browser/tokens.css` — to confirm each token the CSS reads exists.
- `.the-way/elements/decisions/template.md` (sentence limits of a decision) — to judge D-416's new paragraph.
- `foundations/invariants.md` (function-and-file-size, not violated), `foundations/glossary.md` (headings; phone and computer layout), `foundations/part_map.md` (parts and trust boundaries).

## Working copies

- `.runs\review-whole\head` and `...\base` — git worktrees of the head and the base; removed with `git worktree remove --force` and `git worktree prune`.
- `.runs\review-whole\shots` — the eleven downloaded screenshots; removed.
- `.runs\review-whole` — the index, logs and extracted entries; removed with the directory. Nothing kept in `reports/` beside this report: no probe shows a finding.

## Unread material

- Decisions of the index read whole: 15 of 74 listed in full — D-416, D-199, D-200, D-396, D-280, D-282, D-38, D-40, D-42, D-43, D-87, D-88, D-291, D-418, D-419. Read in part: D-44 (binding sentences and the tests of *Verification*; its complies/violates and *Rationale* cut short), D-379 (binding sentences, *Rejected*, *Rationale* cut short, *Verification* first line). The rest of the 74 by their binding sentences in the index, as the method lets the index stand for them. Of the entries the handoff names as read by the author only in their binding sentences: D-39, D-47, D-48, D-274, D-275, D-276, D-279 I too read only as binding sentences in the index — the change uses no signal colour, no main button, secondary action or tab, no frame at a text, no token name and no outline, so nothing further of them bears; D-280's *Rejected* did bear and gave M1.
- the-way's glossary at the pinned commit: not read — the files of the change use no word of the process.
- `project-level/technology/reserved_choices.md`: not read — the change settles no reserved choice.
- Guidelines: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md` read whole; no other guideline file applies.

## Searches not found or unclear

- Row 5's *Goes to* „sentence of D-416” against *Decisions in play* „w *Rejected*” — unclear in the task; judged as satisfied (above).
- The task's „8 trees, 14 branches” and three branches with no number against the data's 9, 18 and four („Ucisk”) — the data hold; D-416 names four.
