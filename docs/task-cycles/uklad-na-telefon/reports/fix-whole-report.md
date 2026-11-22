Status: done with concerns

# Fix of the review of the whole change — report

Range: from the reviewed head `5f5e008827df995c0707500ea9c177e3d7a4a8a4` to `83acc083`. Worktree
`the task's worktree`, branch `task/uklad-na-telefon`, not pushed.

## Commits

- `666e50a5` fix: the findings I-1, I-2 and Minor 1–6 and 8 (one commit; `foundations/decisions.md`,
  the styleguide and `src/browser/styles.css` each carry the edits of several findings, so a split by
  path was not possible without interactive staging).
- `ff645a68` chore: `.git-blame-ignore-revs` names `e8d0212793a1bb7cfb31b98087c45caffb8467f2` (Minor 7).
- `83acc083` chore: the comment line of that entry says JavaScript instead of TypeScript (my own slip
  in `ff645a68`, corrected by a new commit rather than an amend).

## Files changed (added / removed lines, `git diff --numstat 5f5e0088 HEAD`)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 21 | 15 |
| `guidelines/styleguide-browser-view.md` | 19 | 9 |
| `src/browser/styles.css` | 21 | 2 |
| `src/browser/run-screen.css` | 4 | 2 |
| `.claude/skills/loop2-play/SKILL.md` | 3 | 2 |
| `.agents/skills/loop2-play/SKILL.md` | 3 | 2 |
| `tests/view/run-screen.test.mjs` | 1 | 1 |
| `tests/view/rule-editor.test.mjs` | 0 | 1 |
| `tests/view/shared-controls.test.mjs` | 2 | 0 |
| `.git-blame-ignore-revs` | 3 | 0 |

## Each finding

### I-1 — fixed

D-396: the touch-target sentence moved into a paragraph of its own (the second paragraph would
otherwise hold four sentences, over the template's three), and the sentence of the cycle was added
after it: "A link inside a running sentence keeps the size of its text; a link that stands by itself
as a control holds the minimum." *Rationale* gains: "A link inside a running sentence keeps the size
of its text, since a target 48 px high on a link inside a line of text breaks that line; D-47 counts
every link a control, and such a link is the one control the minimum leaves out." *Rejected* gains:
"every link held to the minimum, inside a running sentence too — the line of text breaks; a link
inside a sentence left out of the minimum by the exception of WCAG 2.5.8 for a target in a sentence —
D-42 keeps four criteria of WCAG and no other requirement of it, and Android's guidance, the source of
the 48 px, exempts no target inside a line of text." *Verification*: complies gains "a link of the
credits inside a running sentence at the size of its text in the phone layout"; the violates example
"a control of the phone layout with a touch target smaller than 48 px in height or in width" gains ",
a link that stands by itself as a control among them".

Mark: `the cycle's` (the sentence, its rationale, its rejected ways and the added pair). Meaning (en):
in the phone layout a link inside running text keeps its text's size, while a link standing alone as
a control holds 48 × 48 px. Meaning (pl): w układzie telefonu odnośnik wewnątrz toczącego się zdania
zachowuje wielkość tekstu, a odnośnik stojący osobno jako kontrolka trzyma 48 × 48 px.

The three places now say one thing: the styleguide bullet ("Odnośnik wewnątrz toczącego się zdania
zachowuje wielkość swojego tekstu, a odnośnik, który sam jest kontrolką — … — trzyma minimum (D-396).
To jedyny wyjątek od minimum: D-47 liczy każdy odnośnik jako kontrolkę, a cel wysoki na 48 px
rozerwałby linię tekstu."); the comment of the touch-target block of `src/browser/styles.css` ("A link
inside a running sentence keeps the size of its text, the one exemption D-396 makes from the minimum,
so no rule here reaches it."); and loop2-play in both copies ("A link inside a running sentence stands
on that list too, and D-396 exempts it: it keeps the size of its text, while a link that stands by
itself as a control holds the minimum."). The code of slices 16 and 17 stays.

Check: `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors" (no test cited
D-396 before this fix: `git grep "decision: D-396"` found none). `cmp` of the two skill copies → identical.

### I-2 — fixed

D-349, first sentence, old: "… 672 × 304 px in the computer layout, and in the phone layout the larger
of the two that fits the width of the page area, so 336 × 152 px at a page area 360 px wide; the game
keeps no fractional scale of it." New: "… 672 × 304 px in the computer layout, and in the phone layout
the larger of the two that the place of the scene holds, a classic scrollbar counted in the width of
the window, so 336 × 152 px at a page area 360 px wide; the game keeps no fractional scale of it." The
opening that `tests/view/world-area.test.mjs:501` and `tests/view/scene-picture.test.mjs:232` quote is
unchanged. No other binding sentence of D-349 changed. Rationale, "Accepted with it", gains: "the
place of the scene is counted with a classic scrollbar in the width of the window, since the width a
media query reads includes one, so that no scrollbar crops the larger scene, and a browser that draws
none, as a phone does, keeps the smaller scene in a band a few pixels wider than the larger one needs."
Within row 1 ("największa całkowita skala, która się mieści" names no measure). Mark: `row 1`, wording
the writer's. Meaning (en): the phone layout draws the larger scene only where its place, counted with
a classic scrollbar, holds it. Meaning (pl): układ telefonu rysuje większą scenę tylko tam, gdzie mieści
ją miejsce sceny liczone z klasycznym paskiem przewijania.

Styleguide, rule "The scene of a map run": "większy z dwóch, który mieści się w miejscu sceny, gdy w
szerokości okna liczy się klasyczny pasek przewijania"; the sentence of the threshold adds "i z
szerokości klasycznego paska przewijania, którą warunek `@media` liczy w szerokości okna". The comment
at `src/browser/run-screen.css` over `@media (width < 707px)` already says the same and stays. The
threshold did not move. The decisions deriving from D-349 (D-373, D-389) say nothing of the page area
and need no edit.

### Minor 1 — fixed (same edit of D-349)

*Verification*, complies, old: "drawn 336 × 152 px in the phone layout at a page area 360 px wide, its
sides cropped slightly, the mage standing …". New: "drawn whole at 336 × 152 px in the phone layout at
a page area 360 px wide, its sides cropped slightly only where the place is narrower, the mage
standing …".

### Minor 2 — fixed

D-311 rationale: "the hover over a tile of the drawing and a tap on it (D-19) link with its row only
while the table is picked" (was "…, and in the phone layout a tap on it (D-19), links …").

### Minor 3 — fixed

`tests/view/run-screen.test.mjs:518` now quotes D-19 "The drawing of the game map is a picture, not a
control: its only interactions are hovering a tile".

### Minor 4 — fixed

The line `decision: D-297 …` of the case "„↓” on a group's header moves the group one place down …"
of `tests/view/rule-editor.test.mjs` is gone.

### Minor 5 — fixed

The phone block of `.end-window` reads `max-height: calc(100svh - 220px)`, with a comment on why `svh`.
D-370 ("up to a part of the height of the browser window") still holds: `svh` is the height of the
window with its bars shown. The styleguide's rule of the end-of-run window named the unit `vh`; it now
says `vh`, and `svh` in the phone layout, with the reason. `max-height` is a layout dimension D-43
leaves out; `npm test -- tests/invariants/test_browser_view_token_values.py` passes. In Chromium at
360 × 740 the computed `max-height` of `.end-window` read 520 px (740 − 220; in emulation `svh` equals
`vh`, which has no dynamic bar, so the difference on a real phone is not measured).

### Minor 6 — fixed

`src/browser/styles.css` gains, after the touch-target block, `@media (width < 1280px) and (hover: none)`
that sets `background: transparent` on `.menu-bar-item:hover`, `.account-menu-panel-link:hover`,
`.button:hover:not(:disabled)`, `.select-list:hover:not(:disabled)` and `.input-field
input:hover:not(:disabled)` — the controls of this file whose background at rest is transparent. The
styleguide rule "Two layouts and one threshold between them", where it lists the allowed `@media`,
adds that `hover: none` is no width threshold and no layout, what the block does and why.

Browser check (Chromium, playwright-cli 0.1.22, `--config=.playwright/cli.phone.config.json`, page area
360 × 740, `maxTouchPoints` 1, `(hover: none)` true, taps by `locator.tap()`):
- „Mapy” of the menu bar tapped: `:hover` true, background `rgba(0, 0, 0, 0)`.
- „+ dodaj grupę” tapped: `:hover` true, background transparent.
- destructive „Restart” at rest: colour `rgb(255, 100, 103)` (`--danger` #ff6467), background
  transparent; tapped: `:hover` true, colour still `danger`, background transparent.
- positive control: the same page, the `@media (… hover: none)` rule removed from `styles.css` through
  the CSSOM → the tapped „Restart” read background `rgb(39, 39, 42)` (`--highlight` #27272a); rule put
  back → transparent again. (An attempt to force `hover` through `Emulation.setEmulatedMedia` changed
  nothing: Chromium kept `(hover: none)` true, so that way proves nothing.)
- a new session with no touch at 1280 × 720 (`hover: none` false): „Mapy” and „Konto” under the mouse
  `rgb(39, 39, 42)`; „Restart” under the mouse `rgb(39, 39, 42)` with `danger` text; the same session
  resized to 360 × 740, a mouse in the phone layout: „Restart” under the mouse still highlighted.
- screenshots looked at: the screen of the map run at 360 px after the tap on „Restart” (no highlight
  on it), and at 1280 × 720 with „Restart” under the mouse (highlighted, red text). No place is needed:
  these are not shown to the human.

Not taken, and named as a concern: the `:hover` backgrounds of the screens' stylesheets
(`.maps-list-item:hover` in `src/browser/maps-screen.css`, `.program-list-item:hover` in
`src/browser/programs-screen.css`, `.rule-list-header:hover, .rule-list-row:hover` in
`src/browser/program-panel.css`, `.now-row[tabindex]:hover, .next-row[tabindex]:hover` in
`src/browser/run-screen.css`) still stick after a tap. The finding names the rules of `styles.css`; the
rule rows have state backgrounds (`rule-winning`, `rule-running`, `open`) that a reset to transparent
of the same specificity, placed later, would wipe, so they need a narrower selector, which is more
than this Minor fix asks. The new styleguide sentence speaks of the block and not of every hover rule,
so it does not claim them.

### Minor 7 — fixed

`.git-blame-ignore-revs` holds, under the comment line "# A test case of JavaScript by Prettier
3.9.10", `e8d0212793a1bb7cfb31b98087c45caffb8467f2` (`git rev-parse e8d02127`), in commits after the
one it names; history is not rewritten.

### Minor 8 — fixed in part, the rest answered

Both new cases of `tests/view/shared-controls.test.mjs` ("a pick cell holds its name in an element of
its own, …" and "the stylesheets let the name of a pick cell wrap …") now carry `// decision: D-396 "In
the phone layout every screen fits the width of the window with no scroll to the side and no text over
the border of its frame"`. D-289 and D-290 do not fit: D-289's binding sentences say what is greyed
and with which reason, D-290's how the pick groups its cells; neither says that a name stays inside
its cell ("long names of conditions wrap into two lines" stands in D-290's rationale, which a line
`decision:` cannot quote). D-396's sentence is what the cases' "Breaks" comments guard. Since D-396 is
now held by tests, its *Verification* gains the clause "tests: the name of a cell of a pick free, by
the stylesheets, to wrap beside its icon and to break where no space helps, in an element of its own
between the icon and the reason." The assertions stay: jsdom computes no layout, so no behavioural
test of the wrapping exists at this level; the browser check of slices 11 and 19 holds the behaviour.
Positive control of the citations: the quotation altered by one word → `foundation_check.py` reported
"tests/view/shared-controls.test.mjs:824/849: the quotation stands in no binding sentence of `D-396`",
2 errors; restored → 0 errors.

### Minor 9

Asks for no change; none made.

## Checks run (command → exit code)

- `python -B .the-way/elements/common/foundation_check.py` before the edits → 0, "0 errors"; after the
  last commit (`83acc083`) → 0, "0 errors".
- `python -B .the-way/instruction-files/check_instructions.py` → 0, "0 error, 136 warn, 7 info"; the
  warnings are all `dead-path` (paths such as `.playwright-cli/` that exist only while a check runs),
  none on a line this fix wrote.
- `npm test -- tests/view/run-screen.test.mjs` → 0 (25 pass, 0 fail).
- `npm test -- tests/view/rule-editor.test.mjs` → 0 (80 pass, 0 fail).
- `npm test -- tests/view/shared-controls.test.mjs` → 0 (53 pass, 0 fail).
- `npm test -- tests/invariants/test_browser_view_token_values.py` → 0 (4 tests OK).
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` → 0 (3 tests OK).
- `npm test -- tests/agent_workflow/test_loop2_play_skill.py` → 0 (8 tests OK).
- `npx prettier --check` on the three test files, `styles.css` and `run-screen.css` → 0.
- Not run: the full gate `npm test` with no argument, as the handoff and the method give. The edits
  ran before the last two commits, which touch only `.git-blame-ignore-revs`; the focused tests ran on
  the content committed in `666e50a5`. No CI file runs anything before the merge, so nothing but the
  cycle's run of the full gate will.

## Own-work check

Requirement my work most likely misses: acceptance "W oknie 1280 × 720 px i szerszym każdy ekran
wygląda i działa tak jak przed zmianą" against the new `(hover: none)` block — a block that also hit a
mouse would remove the hover of the computer layout. Check: the 1280 × 720 session with a mouse read
the hover background `highlight` on a menu item, „Konto” and „Restart”, and the block is limited to
`width < 1280px`. It held. Second: that the block does the work and is no no-op — the CSSOM positive
control above showed `highlight` without it and transparent with it.

## Choices, with the way rejected and the cost if wrong

- The hover block is `@media (width < 1280px) and (hover: none)`, not `(hover: none)` alone: the
  computer layout stays byte-for-byte as before on every device, as the plan's *Choices* row on phone
  blocks gives. Rejected: `(hover: none)` alone, which would also fix a touch-only device with a page
  area of 1280 px or more. Cost if wrong: such a device (a large tablet held sideways) keeps a sticky
  highlight; a one-word change of the condition.
- A reset to `transparent` under `(hover: none)` rather than moving the hover rules under `(hover:
  hover)`: a smaller diff that leaves the computer layout's rules untouched. Cost if wrong: a later
  control of `styles.css` with a background at rest would lose it after a tap until it is added to the
  block's exclusions; the comment says the block is for controls whose background at rest is transparent.
- The D-396 touch-target sentence moved into a paragraph of its own rather than the exemption joined
  to it by a semicolon into the third sentence: each paragraph keeps one to three sentences.
- One fix commit for findings that share files, rather than one commit per finding.

## Concerns

1. D-396's exemption and its *Rejected* items are the cycle's, written on the orchestrator's ruling.
   The decisions template gives the *Rejected* of an entry marked `the cycle's` as `unknown` unless a
   statement of the human names the ways weighed; the two rejected ways come from the plan's
   *Choices* and the review, not from the human. The request has to put the sentence, its rationale,
   these rejected ways and the added Verification pair before the human.
2. The sticky `:hover` background of the screens' list rows, rule rows and the rows „Teraz” and
   „Potem” stays (Minor 6, above).
3. `svh` was checked only in Chromium emulation, where it equals `vh`; on Chrome on Android it is not
   measured.

## Reach beyond the dispatch

- `foundations/decisions.md` D-291 (its opening, by `grep`), to judge whether it fits the pick-cell
  cases of Minor 8 (it does not hold the name's place in the cell).
- The decisions deriving from D-349 (D-373 at line ~6742 and D-389 at line ~10341), by `grep` of
  their headings and of "page area", for step 4.4 of the decisions skill: neither names the page area.
- `src/browser/maps-screen.css`, `src/browser/programs-screen.css`, `src/browser/program-panel.css`
  (their `:hover` rules), to size Minor 6.
- `.the-way/elements/decisions/template.md`, `skill/read.md`, `skill/decide_entry.md`,
  `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md`,
  `.the-way/elements/decisions/examples.md` — the files the decisions skill names, read as its steps came.

## Working copies

All stood in `.runs/fix-whole` (outputs of the
checks, the scripts given to `playwright-cli run-code`, a backup of the test file for the positive
control, two screenshots `phone-after-tap.png` and `computer-hover.png`); removed with `rm -rf` of that
full path. The CLI's own working files in `.playwright-cli/` (two console logs and two snapshots of
this check) were removed too. The local start was ended with `npm run local:stop` ("Local starts
stopped: 1"); its database under `.runs/local-start/` stays until the next start, as the skill says.
Nothing is kept in `reports/` beside this report. No worktree or clone was made.

## Unread material

- `tests/view/run-screen.test.mjs` (1296 lines), `tests/view/rule-editor.test.mjs` (2157 lines) and
  `tests/view/shared-controls.test.mjs` (1301 lines): read only the cases the findings name (around
  lines 505–560, 440–510 and 700–880) and their `decision:` lines found by search.
- `src/browser/run-screen.css` (1575 lines): read lines 480–580, 660–700 and 1180–1225 and the `vh`
  lines found by search, not the whole file.
- `.the-way/elements/common/reaching_another_skill.md`: not read; no hand-over to another skill came.
- The decision WAY-03 that `.the-way/elements/decisions/examples.md` names, in the-way's own
  foundation: not read; the entries edited keep the form they had.
- `.the-way/elements/decisions/skill/SKILL.md`'s step 1 selection (the decision index script): not
  run; the handoff named the entries to read.

## Searches not found or unclear

- `Emulation.setEmulatedMedia` with the feature `hover` did not switch `(hover: none)` in the Chromium
  the CLI drives; unclear whether that feature is overridable there. The CSSOM removal replaced it as
  the positive control.
- The first tap on a „Usuń” on the screen of the map run removed the button it tapped (the rule went),
  so no button slid under the finger to be read; the reviewer's case of the next row's „Usuń” sliding
  under the finger was not reproduced. The tapped „Restart” and „+ dodaj grupę” stand for it.
