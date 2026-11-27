FAIL d19e544514d3d6c07cfb2d57c04dc53403f58308

# Review of the whole change — kafelek-postaci-w-siedzibie

Range `d79ad0b7fc3972bf2b2fb3124c593522f01eda92..d19e544514d3d6c07cfb2d57c04dc53403f58308`
(`git rev-parse HEAD` = the head given; three commits `3d8cb03d`, `03ff7633`, `d19e5445`). `.the-way`
stands at the pinned `6ed3cb364adedacea214d2a0df690cea32f2e72f`. One author, no plan: no finding comes
from a slice.

Counts: blocking 1 (Important), Minor within the task 2, out of scope 0.

## Findings

### Important

**I-1. The rationale of D-389, an entry the change edits, still says that „Drużyna” speaks of
earning loops alone and that Siedziba nowhere else says a character is in a manual map run; the
cards of the change now say it.**

- Place: `foundations/decisions.md:10755-10757` (D-389, *Rationale*): „The picture says what the text
  under it does not: a character in a manual map run is a thing Siedziba otherwise says nowhere, since
  „Drużyna” speaks of earning loops alone, so the picture band shows the characters that are at the
  fire and the screen is drawn again at every change of the map run.” The same entry's *Rejected*
  (`foundations/decisions.md:10769`, `:10773-10774`) gives as the reason against drawing every character in the
  band that „a character of a manual map run sits at the fire and nothing on Siedziba says it is on the
  map”, and names „the report „Gdy cię nie było””, a title the change removes.
- What is wrong: after the change each card shows „Przejście: {mapa} · minuta {m}” (with its ending) for
  the character of the manual map run — `src/browser/view/team-cards.tsx:56` (`statusLine`),
  `src/browser/view/team-cards.tsx:88`, redrawn at each minute (`src/browser/view/headquarters.tsx:231`,
  `:244`), as D-447's new paragraph requires (`foundations/decisions.md:4938`). So „Drużyna” no longer
  speaks of earning loops alone, and Siedziba does say, in text, that a character is in a manual map run.
  The change edited D-389 (its sentence „the way to a character stays its card”, `:10765`), and left the
  sentence beside it false.
- Why it matters: the rationale is the reason the band exists in its present form; a later agent that
  reads D-389 to change the band or the cards takes as a fact that the band is the only place that shows
  a character in a manual map run, and may design on that (for instance drop the line from the card as a
  duplicate of nothing, or keep the band's reason as stated). The method grades a disagreement between
  the content of an entry the change writes or changes and the code as Important (WAY-263, WAY-364);
  the content here is the rationale's factual claim, and the cost of the fix is one sentence of D-389
  (and the two phrases of its *Rejected*), written through the project skill `the-way-record-decision`.
- Evidence: the cited lines of `foundations/decisions.md` at the head, against
  `tests/view/headquarters-screen.test.mjs` „each card shows what its character does: „W obozie”,
  „Przejście: {mapa} · minuta {m}” with its end, drawn anew at each minute, death and completion”
  (passes, 37/37), and the screenshot `loop2_siedziba_kilka_postaci.png` (Ela's card „Przejście: Skraj
  lasu · minuta 0”).
- Within the task: yes — To do 4 and the D-447 row of *Settlements to record* make the card say this,
  and the change edits D-389 itself; the handoff's note that the cycle's return step may correct a
  foundation entry does not move it out of this change.
- Slice: from no slice (a one-author change; the gap is in the change's own foundation entries,
  commit `3d8cb03d`).
- Contradiction: yes — D-389 (its *Rationale* and *Rejected*), which the code of the change now
  contradicts.

### Minor — within the task (to fix before the request opens)

**M-1. The one-character screenshot, the loop2 half of the side-by-side with the old Loop, shows the
name underlined, which the code at the head does not draw.** `loop2_siedziba_jedna_postac.png`
(screenshots repository, commit `c47fe3e51ca0c483600d2d5adf0a3964db0adeb4`) shows „Nowa postać”
underlined like a web link; `src/browser/headquarters.css:221` sets `text-decoration: none` on
`.team-member-name`, no other rule of the head underlines it, and the other screenshots of the same set
(`loop2_siedziba_plus_postac_otwarte.png`, the same „Nowa postać” card; `loop2_siedziba_kilka_postaci.png`)
show the name without an underline. The shot is most likely from a build before that line. It matters
because this pair (`loop_13_siedziba.png` beside `loop2_siedziba_jedna_postac.png`) is where the human
judges the task's acceptance criterion, To do 12; he would judge a look that does not merge. Fix: take
that screenshot again at the head, at 1600 × 1000, and publish it under the cycle's directory of the
screenshots repository.

**M-2. The play skill names the report by a title the screen no longer shows.**
`.claude/skills/loop2-play/SKILL.md:346`: „To get the report „Gdy cię nie było” of a return, stamp the
document with a time hours back …”. After the change no heading „Gdy cię nie było” stands on Siedziba
(To do 7; D-246 at `foundations/decisions.md:9336` ff.): the report is a counting sentence above
„Drużyna” and lines in the cards. An agent that follows the skill and looks for that heading finds
nothing and may take the report for missing. Fix: name it as the report of a return, the sentence
„Bez ciebie …” above „Drużyna” with the lines in the cards. Within the task: the change removed the title
the skill names.

### Minor — outside the task

none.

## Against the task, the foundation and the guidelines (what I checked and found in order)

- Every item of *To do* 1–15 is met by the commits: the grid (250 px columns, `repeat(auto-fill, …)`, two
  columns under 1280 px), frame in `control-border` with no background, icon before the name in the
  name's colour, the line of what the character does with the redraw at minute, death and completion,
  dot and green frame only in a running earning loop, the resurrection line once under „Drużyna” and none
  for an empty team, report lines in the cards under a `divider` line without the name, the stopped line
  first, the counting sentence with the declined forms and the „Bez ciebie” rule (checked against
  `src/components/probe/AwaySummary.tsx` of old Loop at `715026e`, same forms), „Skrzynka jest pełna.”
  once after it, one „Zamknij”, the whole card as one link named by the name with buttons above its area,
  the dashed „+ postać” as a new shared kind (`react-button.tsx`, `styles.css`, kitchen-sink sample, a
  case in `tests/view/shared-controls.test.mjs`), the open tile with field, „Załóż”, „Anuluj” (secondary
  action), Escape, the empty team open with no „Anuluj” and Escape not closing it, the focus to the field
  and back to the closed tile, the styleguide rule and the requoted tests (To do 14 —
  `foundation_check.py` 0 errors). To do 12 is met by the published set; M-1 is the gap in it.
- Every row of *Settlements to record* (1–15) is in the entry it names: D-446, D-447, D-39, D-42, D-217,
  D-246 (rows 7, 11, 12), D-280, D-44 in `foundations/decisions.md`; rows 1, 9, 10, 13, 14 in the new
  styleguide rule „The section „Drużyna” of Siedziba”. The entries say what the code does, with I-1 the
  one exception (D-389).
- The author's eight departures (report, „Departures”): each stays inside an answer the human chose
  (wording, look, spacing, layout) and takes no unchosen variant: the archetype line in the open tile
  (wording), the dashed frame of the open tile (the choice answer 5 left), a solid `divider` line under
  the card's own lines (the task says „pod kreską”), 250 px columns (about five at full width, as To do 1
  asks), „+ postać” in `text` (D-44 and To do 15: the text role unchanged), font sizes, „Zamknij” right
  after the sentence (To do 7: „obok”), focus after „Odbierz” to the card's name (styleguide rule „Focus
  does not fall to the page”). None changes a decision the task leaves unchanged.
- Appearance, judged from the nine loop2 screenshots and the old Loop's `loop_13_siedziba.png` (all
  downloaded with `gh api` and looked at) and from the code: computer layout five in a row at 1600 px,
  green frame and dot only at the loop, the report lines in the cards with the stopped one in `danger`,
  the open tile dashed, focus ring on the name; phone 360 px two in a row, the long unspaced name broken
  inside its card, controls at full touch size. No state the styleguide rule requires is missing from
  the set; M-1 is the one mismatch with the code.
- Guidelines (`guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`,
  `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`), rules with no invariant that the
  change reaches: hooks at the top of each component before the early return
  (`team-cards.tsx:51-53`, `:160-176`, before the return at `:195`); the `useLayoutEffect` with no dependency list moves focus after a commit, the
  pattern of the exemplar `account-card.tsx`; one form of the shared control and a case for the new kind;
  the phone blocks in `@media (width < 1280px)` and the `(hover: none)` block in the form the other
  screens use; the name breaks in its card; focus does not fall to the page. No departure found.
- Tests: each new case would fail if its behaviour broke (the author's three mutation probes, and my
  reading of the cases on the dot, the frames, the stretched link area, the touch block, the counted
  sentence, Escape at an empty team, Enter spending the key). No test asserts nothing; no product code
  exists only to pass a test. No invariant test changed.
- Reserved choice: none taken. Trust boundary: none touched (`screen-address.ts` only called).
- Structure: `change_file_sizes.py` — `headquarters.tsx` 436 → 294, `team-cards.tsx` new at 241,
  `headquarters.css` 225 → 370; the size test passes at the head (no function or file over a threshold),
  so the change pushed nothing over one. The removed exports (`reportEntries`, `reportTitle`,
  `AWAY_TITLE`, `STOPPED_TITLE`, `EMPTY_NAME_MESSAGE` from `headquarters.tsx`) have no user left. No name
  that stopped being true found in the code; M-2 is one in the play skill.
- The author's own-work check (To do 9, Enter in the field in a real browser) sits where jsdom proves
  least, and it caught and fixed a real defect. The walk follows the task's requirements, says where
  behaviour changes, and gives a reason for each case left unchecked (Firefox, Edge, the kitchen-sink page
  in a browser, a full chest in a browser, the hover of „+ postać” in a browser, a real phone).

## Declined to judge

- The new styleguide rule names files and restates decisions, as the existing rules „The screen Postać”
  and „The picture band of Siedziba” do, while `.the-way/product-guidelines/template.md` says a rule lists
  no state and repeats no decision — outside the task: To do 11 asks for a rule as full as those two, so
  the shape is mandated and the departure is the styleguide's, not this change's.
- The card loses its `highlight` while the pointer is over „Zatrzymaj” or „Odbierz” — outside the task's
  requirements, which ask for the highlight under the pointer over the card's link and buttons of their
  own; no reasonable expectation is broken.
- D-218 says „pokolenie {n}” stands „beside a character's name”, and the card puts it on the line under
  the name — outside the task: the screen Postać already does the same under the same sentence, and the
  task keeps D-218 unchanged.
- Firefox, Edge and a real Android phone — left by D-396 to a person.

## Checks run

- `git rev-parse HEAD` → `d19e544514d3d6c07cfb2d57c04dc53403f58308`; `git -C .the-way rev-parse HEAD`
  equal to `git ls-files --stage -- .the-way` (`6ed3cb36…`).
- `python -B .the-way/task-cycle/change_file_sizes.py d79ad0b7… d19e5445` → exit 0.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, „0 errors”.
- `python -B .the-way/instruction-files/check_instructions.py` → exit 0, „0 error, 0 warn, 122 info”.
- `npm run typecheck` → exit 0.
- `npm test -- tests/quality/test_function_and_file_size.py` → exit 0 (2 tests OK).
- `npm test -- tests/view/headquarters-screen.test.mjs` → exit 0 (37 pass).
- `npm test -- tests/view/away-report.test.mjs` → exit 0 (23 pass).
- `npm test -- tests/view/shared-controls.test.mjs` → exit 0 (71 pass).
- `npm test -- tests/view/account-screen.test.mjs` → exit 0 (132 pass).
- `npm test -- tests/invariants/test_browser_view_token_values.py` → exit 0 (4 tests OK).
- `npm test -- tests/invariants/test_design_token_contrast.py` → exit 0 (3 tests OK).
- `npx eslint` on the nine changed TS/JS files → exit 0; `npx prettier --check` on them and on
  `src/browser/headquarters.css`, `src/browser/styles.css` → exit 0.
- Manual: the nine loop2 screenshots and `loop_13_siedziba.png`, fetched by
  `gh api -H "Accept: application/vnd.github.raw" repos/mariusznazar/screenshots/contents/loop2/kafelek-postaci-w-siedzibie/<file>?ref=c47fe3e5…`
  and looked at; they showed M-1 and the appearance judged above. `loop_01_start.png` was listed, not
  looked at.
- Not run: the full gate `npm test` and `gate_times.py` (the human's rule: the orchestrator's or CI's
  run); the size test in a worktree of the base (the head names no function or file over a threshold,
  so the comparison could name nothing); the size test ran in the reviewed worktree at the head commit,
  which it changes in nothing, not in a separate worktree of the head; StrykerJS (no simulation file
  changed); no mutation probe of my own (the author's three probes and the cases read covered what I
  would have probed).

## Reaches beyond the dispatch

- `.claude/skills/loop2-play/SKILL.md` lines 80–92 and 340–352, by a search for the removed wordings,
  to find what the change left stale (M-2).
- `foundations/glossary.md` entries „headquarters”, „at the camp”, „secondary action”, for the words the
  change uses.
- `foundations/invariants.md` entries `content-identifiers`, `browser-view-token-values`,
  `browser-view-focus-outline`, `design-token-contrast`, `browser-view-framework`,
  `application-build-kitchen-sink`, `function-and-file-size`, whole, the invariants the change reaches.
- `.the-way/product-guidelines/template.md`, the lines on a binding rule, to compare the new styleguide
  rule (Declined to judge).
- Old Loop `src/components/probe/AwaySummary.tsx` at `715026e`, to check the sentence forms the change
  takes.
- The screenshots repository via `gh api`, to judge the appearance.

## Working copies

- `.runs/review-whole/` held the
  diffs of the range, the decision index and the section list of `decision_index.py`, a small extraction
  script for whole decision entries, the downloaded screenshots and the logs of the checks; removed
  before return. No git worktree or clone was made. No background process remains: the one background
  run (the focused checks) ended before return; no server or browser was started. `dist/` from the builds
  of `npm test` is the product's own output.

## Unread material

- Decisions read whole: 22 of the 85 listed in full in the index of my selection (sections „Browser
  view: screens, navigation and their code”, „Look of the browser view: …”, „Team, body, death and
  resurrection”, „Earning loop and time away”, „Screen Mapy and Siedziba”, `--part browser-view`, and
  `--decision` for the task's *Decisions in play* and the decisions the altered tests cite): D-280, D-446,
  D-447, D-217, D-389, D-51, D-52, D-275, D-396, D-40, D-279, D-245, D-244, D-218, D-54, D-184, D-425,
  D-88 (each extracted whole), and D-39, D-42, D-44, D-246 (binding part from the index, the rest from the
  diff of the range, whose hunks hold their *Verification*, *Rationale* and *Rejected* lines whole).
- Decisions bearing on the change read by their binding sentences only (index): D-282, D-287, D-265,
  D-418, D-419, D-38, D-43, D-331, D-329; the other index decisions likewise. The 232 decisions listed by
  heading were run through by their questions; D-425, D-88 and D-184 opened from them.
- Guideline files: none unread — `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
  `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md` read whole.
- `foundations/part_map.md` read whole. `foundations/glossary.md`: three entries only.
  `foundations/invariants.md`: the seven entries named above whole; the other entries whose *Part* names
  browser-view by heading only.
- Old Loop `CharacterTile.tsx` and `RosterPanel.tsx`: not read (the task's *Context* describes them);
  `.claude/skills/loop2-scene-art/SKILL.md`: not read (no picture or effect of the scene changed);
  `loop_01_start.png`: not looked at.

## Searches not found or unclear

- What underlines the name in `loop2_siedziba_jedna_postac.png`: a search of the head's stylesheets for
  `text-decoration` finds only `none` on `.team-member-name` and no rule that underlines it, so I take the
  shot to predate that line; not confirmed against the build the author used (M-1).
