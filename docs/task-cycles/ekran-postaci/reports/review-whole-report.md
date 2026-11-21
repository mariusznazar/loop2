PASS 1e21575d248ef294a45953175c7301ec18d63d57

# Review of the whole change — task `ekran-postaci`

- Worktree: `.runs/worktrees/ekran-postaci`, branch `task/ekran-postaci`.
- Range: base `cfdbd267dbbdb7f59fb34d86e436bafb204e05ef` to head `1e21575d248ef294a45953175c7301ec18d63d57`,
  three commits (`b301cbe9`, `763b5363`, `1e21575d`), 24 files, computed with `git diff cfdbd267..1e21575d`
  and `git log cfdbd267..1e21575d`. `git rev-parse HEAD` gave `1e21575d248ef294a45953175c7301ec18d63d57`;
  `.the-way` stands at `19e5774aed6d1d628042e23deccc110ed9f112c0`, the commit the gitlink records.
- Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`, variant "the whole change".
- Route: one author without a plan, no spec, no slices. No blocking finding comes from a slice; there are
  no slice reviews whose Minor or out-of-scope findings this review would grade. The whole change was
  judged as the one slice it is, the author's own-work check included.

## Findings

No Critical and no Important finding. No blocking finding, so no mark of contradiction is due.

### Minor findings within the task

1. `src/browser/sim/data/scene.ts:307-336` — the new constant `CHARACTER_FIGURE` with its own doc
   comment was inserted between the doc comment of `CAMP` ("The picture band at the top of Siedziba, in
   the pixels of its picture: …", lines 307-322) and `CAMP` itself (line 334). The comment of `CAMP` now
   stands directly over the comment of `CHARACTER_FIGURE` and documents nothing: `CAMP` has lost its
   description (an editor shows none on hover, and a reader of the file meets the band's description
   above a constant of the screen Postać). Why it matters: the data file of the scene is read through these
   comments, and the band's numbers (`cell`, `gap`, `lift`) are explained only there. Evidence:
   `sed -n 300,345p src/browser/sim/data/scene.ts` at the head — two `/** … */` blocks in a row, then
   `export const CHARACTER_FIGURE`, then `export const CAMP` with no comment. Fix: move `CHARACTER_FIGURE`
   with its comment above the band's comment, or below `CAMP`.

2. `src/browser/character-screen.css:237-241` (`.character-tree-bar`) — the track of the practice bar is
   barely visible on the area's background, the more so at zero practice, the state of most rows of a
   new character and of the pair compared with loop. Measured on the author's screenshot 2
   (`loop2-postac-po-smierci.png`, column x = 1200): the track is 4 px of rgb(39, 39, 42) (`highlight`)
   on rgb(24, 24, 27) (`panel`), a contrast of about 1.19:1. The old Loop's screenshot
   (`loop-postac-31-pazdziernika.png`, x = 1000) has the same 4 px track rgb(39, 39, 42) on the page
   rgb(9, 9, 11), about 1.33:1, so its empty bars read as a column of tracks, while loop2's read as an
   almost empty column beside „0 / 15”. The doubling of the thickness (commit `1e21575d`) already closed
   most of the gap; what remains comes from the blocks the task chose (settlement row 20) and from the
   value of `highlight`, which D-40 accepts as "hardly visible". Consequence for the user: on a new
   character's screen the bars, the element the task names as what makes practice "wielokrotnie
   czytelniej", are hard to see until practice fills them; numbers still carry the value. Graded Minor
   because the fill, once practice exists, is clear (screenshots 3 and 4) and the value of the track is a
   choice of role and token that this task does not settle; it is a point for the human's comparison of
   the screenshots, not a defect of the code.

### Out of scope

none

## Declined to judge

- Whether the figure on the flat `panel` reads as a sticker (task, question 7): the author judged it does
  not and added no clearing; on screenshots 2-4 the mage stands with its pixel outline on the flat block,
  as D-272 and D-445 now say and accept. The judgment is the human's by the task's acceptance criterion.
- The frame of D-447 outlined in `divider`: the blocks `screen-area` of every screen already carry a frame
  in `divider` (`src/browser/styles.css:261-267`), so the frame is the same use of the role; whether the
  human approves it, as the styleguide asks of the end-of-run window's frame, is the human's.
- The heavier look of the fold („▸” in a framed shared button) against loop's bare triangle: item 6 asks
  only for a click and the keyboard, and the styleguide rule of Wiedza already draws a tree's row as a
  shared button; a look for the human's comparison.

## Coverage of the task

Every item of *To do* is met by the commits:

1. Figure — `src/browser/view/character-figure.tsx`: the archetype's idle sheet of `SCENE_MAGES` (the
   band's own sheet), at `PICTURE_PIXEL`, `aria-hidden`, no control, frames by CSS at 160 ms a frame under
   `prefers-reduced-motion: no-preference` only (`src/browser/character-screen.css:79-86`), at the top of
   the left area beside the name, in every state (test "the figure stands first in the left area…").
   I measured the box against the sheet: the opaque pixels of every frame of
   `assets/sprites/mage-idle.png` lie in columns 20-44 and rows 32-63 (frame 0) or 33/34-63, so the box of
   32 × 34 centred and bottom-aligned holds the whole figure, as the comment of `CHARACTER_FIGURE` says.
2. Two areas `screen-area` in `.screen.character-areas`, `minmax(200px, 1fr) minmax(320px, 3fr)`, one
   column under 720 px — the same sizes and threshold as the shared rule of Programy, Mapy and Wiedza
   (`src/browser/styles.css:246-258`). Screenshots show the blocks on `panel` with the frame.
3. Name as `h2`, line with „pokolenie {n}” from 2, the `cultist` mask and „Mag żywiołów”, resurrection line
   under them in the game's present wording (D-217 as it stands at the base). Icon in the new fields
   `icon`/`iconTitle` of `src/browser/sim/data/archetypes.ts`, credited in „Autorzy grafiki”.
4. Frame `.character-screen-status`, always, no heading, outline in `divider`; `statusLine` in
   `src/browser/view/character-status.ts` gives „W obozie”, „Przejście: {mapa} · minuta {m}” with
   „ · postać zginęła” / „ · mapa rozwiązana”, null in an earning loop (the loop line with „Zatrzymaj”
   in its place), and „W obozie” with the stop line after a stop. The minute is the same expression the
   menu bar's „Wróć do przejścia” uses (`src/browser/view/screen-address.ts:198`). No new button.
5. Rows in columns (`treeRow`, `CharacterTrees`): name, „poziom {p}”, bar, „{wprawa} / {próg}” or
   „najwyższy” with a full bar, „{k} pkt” only with points.
6. Folded at each building of the screen (state in `CharacterTrees`; the screen's entry is rebuilt per
   character, `guidelines/coding-browser-module.md` "Ekran w Reactcie: Postać"); a click anywhere on the
   row or Enter/Space on the fold, a shared button with `aria-expanded`; branches keep their words and
   „Kup”, disabled as D-200 and D-287 give.
7. Bar: track `highlight`, fill `text`, no green; „{k} pkt” in `text-strong`. The thickness, `--bar-width`
   doubled, is the departure the author names (item 11), the same thickness the badge over the mage's head
   already has (styleguide "The scene of a map run").
8. „+{n} pkt czeka w pętli” right after the name in `text`, from `waitingPractice(loop)` — the same function
   `stopLoop` and „Odbierz” pay (`src/browser/sim/loop.ts:176-200`), and `paidPractice`, the same function
   they pay with, so the mark equals the points the payment would give.
9. Styleguide: rule "The screen Postać", Roles rows `highlight` and `text`, "Every background with its
   text" and "No value in place of a design token" name the bar and the figure.
10. Screenshots pushed to `mariusznazar/screenshots`, commit `2bd7b8dc…`, branch `loop2/ekran-postaci`;
    the old Loop's at 1600 × 1000 dated 31 October, new character after death, trees folded, as the
    task's context describes `loop_13_postac.png`; loop2 after death, camp with an open tree, earning loop.
    The request's description is the cycle's later step.
11. The one departure (bar thickness) is named, in D-40's *Rationale* and the styleguide; no closed
    variant was taken; no clearing.
12. `practiceText(practice, paid)` and `run-practice unpaid` in `text-secondary`: „Wprawa zebrana w tym
    przejściu, która nie wejdzie do umiejętności: …” on a manual run of a solved map
    (`src/browser/view/world-area.tsx:71,107-113`); D-201 carries the sentence and D-215 now names the
    line by reference instead of by its old words. Screenshot 5 shows it.

Every one of the 13 accepted rows of *Settlements to record* is written, each saying what the code does:
1 → D-272; 2 → D-271; 3 → D-445; 4, 18, 20 → styleguide rule "The screen Postać"; 5 → D-446; 6 → D-447;
7, 8, 19 → D-199; 9 → D-40 (colours; the thickness in the styleguide, as the departure gives);
10 → D-418. The decisions *Decisions in play* marks „Bez zmiany” are unchanged in the diff: only D-418,
D-40, D-272, D-271, D-199, D-201 and D-215 change, and D-445, D-446, D-447 are new. D-201 and D-215 lie
outside *Decisions in play* but item 12 sends the sentence of the entry that holds the line after the
change; D-215 had to change because it named the line by the words that changed.

Present sentences that differ from the task's quotations (the task cites `ba67f045`): D-217 now has the
uses wording („Wskrzeszenie drużyny: użycia {u} z {c}…”), which the screen shows unchanged, as item 3
asks; D-243 adds the judging before „Puść w pętlę” (D-439) and „Puść mimo to”; D-44 now names „Zacznij od
zera” and the button in `positive`. None of these is touched by the change.

## Trust boundary (`assets/icons/**`)

- `assets/icons/cultist.svg` holds one `svg` element with the SVG namespace and one `path` with a fill
  and path data — no script, no `foreignObject`, no `on…` attribute, no reference outside the file.
  `npm test -- tests/invariants/test_icon_file_content.py` passed.
- Its path data is byte-identical to the old Loop's `public/icons/cultist.svg` on `origin/test`
  (`the old Loop's repository (a sibling checkout)`; md5 of the `d` attribute equal), and the old Loop's
  `src/sim/data/archetypes.ts` gives `icon: 'cultist'` to „Mag żywiołów” (line 65), as question 10 says.
- Title and author: I opened `https://game-icons.net/1x1/lorc/cultist.html`; its heading is
  "Cultist icon", by Lorc under CC BY 3.0 — what `credits.ts`, the archetype's `iconTitle`, the
  environment fact `game-icons-cultist-title` and `test_icon_credits.py` hold.
- The view draws the icon as a mask (`span.icon-mask` with `--icon: url("/icons/<icon>.svg")`, the shared
  rule `src/browser/styles.css:474-481`), `aria-hidden`; the file's name comes from the archetype's data,
  read by an archetype id the load already refuses when the data lacks it (`save-version`); no markup
  from the data enters the page.

## Structure of the code the change leaves

`python -B .the-way/task-cycle/change_file_sizes.py cfdbd267 1e21575d` — exit 0. The largest growths are
`src/browser/character-screen.css` 102 → 240 and three new modules of 25-137 lines;
`src/browser/view/character-screen.tsx` shrank 217 → 211, the trees having moved to
`character-trees.tsx`. The size rule (`### Size of a function and a file`, invariant
`function-and-file-size`, *Violated: no*) run on the head reports nothing over a threshold, so the
change pushed nothing over one. No code is left without a user (`skillText` is gone with its tests) and no
name stopped being true, besides the comment of finding 1.

## Checks

All run in the reviewed worktree, which they changed in nothing tracked (`git status --short` empty after
each); `npm test -- <file>` builds into the ignored `dist/`.

- `git rev-parse HEAD` — `1e21575d…`; `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way`
  — both `19e5774a…`.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `python -B .the-way/task-cycle/change_file_sizes.py cfdbd267 1e21575d` — exit 0.
- `node tests/quality/eslint-size-rules.mjs` — exit 0, "0 functions and files over a threshold in 346 files".
- `npm test -- tests/view/character-screen.test.mjs` — exit 0, 15 pass.
- `npm test -- tests/view/character-skills.test.mjs` — exit 0, 6 pass.
- `npm test -- tests/view/world-area.test.mjs` — exit 0, 24 pass.
- `npm test -- tests/view/icons.test.mjs` — exit 0, 41 pass.
- `npm test -- tests/view/camp-picture.test.mjs` — exit 0, 7 pass.
- `npm test -- tests/invariants/test_icon_file_content.py` — exit 0, 2 tests.
- `npm test -- tests/invariants/test_icon_credits.py` — exit 0, 3 tests.
- `npm test -- tests/invariants/test_content_identifiers.py` — exit 0, 5 tests.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0, 4 tests.
- `npm test -- tests/view/account-screen.test.mjs` — exit 0, 132 pass (the changed purchase cases, which now
  open the tree first, among them).
- `npm test -- tests/view/trip.test.mjs` — exit 0, 8 pass.
- `npx prettier --check` on the 16 changed TS/TSX/MJS files and the two changed stylesheets — exit 0.
- `npx eslint` on the 16 changed TS/TSX/MJS files — exit 0.
- `npx tsc -p tsconfig.browser.json --noEmit` — exit 0.
- StrykerJS on the changed simulation files (D-94):
  `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/archetypes.ts:5-21,src/browser/sim/data/scene.ts:323-326"`
  — exit 0, "Instrumented 2 source file(s) with 0 mutant(s)": the changed lines are a type, string and
  number literals in `as const` data, for which Stryker makes no mutant. A control run on the whole file,
  `--mutate "src/browser/sim/data/archetypes.ts"` — exit 0, 1 mutant, killed. No survivor to classify.
  (A first attempt with `--incremental false` exited 1 on the bad switch and ran nothing.)
- Old Loop comparison: `git show origin/test:public/icons/cultist.svg` and
  `git show origin/test:src/sim/data/archetypes.ts` in `the old Loop's repository (a sibling checkout)` — read as above.
- Manual: the five screenshots downloaded from the links of the handoff (each 1600 × 1000, HTTP 200) and
  looked at; each shows what the author says. Pixel measurements of the bar's track on screenshots 1 and 2
  with a script of mine (finding 2), and of the idle sheet's opaque box (item 1).
- `https://game-icons.net/1x1/lorc/cultist.html` opened: heading "Cultist icon", Lorc, CC BY 3.0.

Not run, with the reason:

- The full gate (`npm test` with no argument) and `python -B .the-way/instruction-files/check_instructions.py`
  — the handoff forbids the full gate; the change touches no instruction file. Left to the cycle's run and
  to CI.
- `tests/invariants/test_loop2_container_icons.py` and `tests/deploy/test_loop2_image_icons.py` — they need
  Docker and are left to the gate; both read `assets/icons/` by listing it (`os.listdir`), with no
  hard-coded list of icons, so the new file needs no change in them; whether the container serves it
  stays unverified by me.
- The size-rule run in a worktree of the base: the run on the head names nothing over a threshold, so
  nothing the base run could fail to name; no worktree was made.
- The archived capture `https://web.archive.org/web/20261114052730/https://game-icons.net/1x1/lorc/cultist.html`
  cited by the environment fact `game-icons-cultist-title`: the fetch tool refuses web.archive.org, so the
  existence of that capture is unverified; the live page agrees with the fact.
- Real browser events, focus and motion (D-88): not checked by me in a browser; the author's walk
  reports them, and the screenshots show the static look.

## Reaches beyond my selection

- `the old Loop's repository (a sibling checkout)`, branch `origin/test`: `public/icons/cultist.svg` and the icon lines of
  `src/sim/data/archetypes.ts` — to check the icon's source and question 10.
- `https://game-icons.net/1x1/lorc/cultist.html` — the trust boundary's credit line.
- `src/browser/sim/loop.ts:176-215`, `src/browser/sim/skills.ts:33-58,151-161`,
  `src/browser/sim/types.ts` (death, completion, `solvedMapRun`), `src/browser/view/screen-address.ts:192-200`,
  `src/browser/view/scene.tsx:136-160`, `src/browser/view/camp.tsx`, `src/browser/run-screen.css:645-665`,
  `src/browser/styles.css:238-267,465-481,675-705`, `src/browser/view/controls/react-button.tsx` — the
  callers and contracts the change reaches.
- `tests/invariants/test_loop2_container_icons.py`, `tests/deploy/test_loop2_image_icons.py` — whether
  they list icons by name.
- `stryker.config.json` — the scope of D-94's run.

## Working copies

- `.runs/worktrees/ekran-postaci/.runs/review-whole` — the index of decisions
  (`index.md`, `sections.md`), the three diffs, the logs of the checks, two scripts of mine (`bbox.py`,
  `crop.py`) and the downloaded screenshots with two crops (`shots\`). Removed by its full path
  (`rm -rf`); the directory no longer exists.
- `.runs/worktrees/ekran-postaci/.runs/stryker` — the JSON report StrykerJS wrote by
  itself (the product's tool output, ignored by `.gitignore`), left in place; `.stryker-tmp` was removed by
  Stryker itself.
- No git worktree and no clone was made. Nothing is kept in `reports/` beside this report.

## Unread material

Decisions of the index of my selection read whole: 15 — D-40, D-88, D-94, D-199, D-201, D-214, D-215,
D-271, D-272, D-389, D-418, D-425, D-445, D-446, D-447 (D-40, D-199, D-201, D-418 and the three new ones
read whole through the diff and the head file). The index (`decision_index.py` with the sections
"Browser view: screens, navigation and their code", "Look of the browser view…", "Character skills and
nature energy", "Earning loop and time away", "Screen of a map run and the end-of-run window", "Scene",
"The gate, test tools and the local start", the parts `browser-view`, `simulation`,
`product-foundation`, `agent-workflow`, and the decisions of *Decisions in play* with D-445-D-447, D-201,
D-215, D-191, D-43) listed 131 decisions in full and 259 by heading; I read the whole index and ran
through the headings, opening D-88, D-94, D-214 and D-425 from them.

Bearing on the change and read only by their binding sentences in the index: D-200, D-192, D-217, D-218,
D-244, D-245, D-287, D-282, D-280, D-243, D-52, D-27, D-189, D-246, D-416, D-39, D-44, D-38, D-396, D-421,
D-419, D-43, D-191, D-283 — all „Bez zmiany” or not changed by the diff.

Guidelines read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-content-data.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`,
`src/browser/AGENTS.md`. Not read: `.the-way/product-guidelines/template.md` and
`.the-way/product-guidelines/styleguide/template.md` (the change adds a screen rule of the form the
neighbouring screen rules have; no departure from the template was looked for beyond that).

Invariants read whole: `icon-file-content`, `icon-credits`, `content-identifiers`,
`browser-view-token-values`; `function-and-file-size` by its *Violated* line. The other invariants of
`browser-view` and `simulation` were not read. Glossary: `at the camp`, `headquarters`, `archetype`,
`practice`, `earning loop`, `loop` read; the rest and the-way's glossary not read.

Of the handoff's list: the old Loop's `LoopBlock.tsx` was not read by me either (the frame's look was
judged from the old screenshot); of `src/sim/data/archetypes.ts` only the icon lines were read.
`loop_13_postac.png` in the author's notes was not opened; the pushed old screenshot was judged by its
content against the task's description.

## Searches not found or unclear

- The archived capture of the cultist page that `game-icons-cultist-title` cites — could not be fetched
  (web.archive.org refused by the fetch tool).
- StrykerJS made no mutant on the changed data lines; whether a range on such literals can ever give one
  is unclear to me, so the control run on the whole file stands beside it.
