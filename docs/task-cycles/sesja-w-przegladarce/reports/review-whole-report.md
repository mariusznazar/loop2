PASS 8e9c01a05229442b8932d9dbc1d401300643ded4

# Review of the whole change — task `sesja-w-przegladarce`

Variant: the whole change, one-author route, no spec, no plan, no slice. Range `e5516b17..8e9c01a0`
(one commit `8e9c01a0`, three files). `git rev-parse HEAD` = `8e9c01a05229442b8932d9dbc1d401300643ded4`,
the head given. `.the-way` at `bfb2e109`, the commit the gitlink records.

Blocking findings: none. Minor: 5 (all within the task). Out of scope: 0 (see Declined to judge).

## Findings

### Critical

none

### Important

none

### Minor

**M1 — the styleguide's new exception says every select list of the game is held to its row by the
shared sheet alone; on Mapy it took a rule of the screen as well.** Within the task (point 7).
Place: `guidelines/styleguide-browser-view.md:546-550`, the sentences „Lista jest najwyżej tak
szeroka jak wiersz, w którym stoi …” and „Wygląd listy stoi w jednym miejscu,
`src/browser/styles.css` (D-265), więc tak samo zachowuje się każda lista wyboru gry.”
What is wrong: `max-width: 100%` on `.select-list` (`src/browser/styles.css:300-304`) holds a list
only where the element around it is no wider than its column. On Mapy the row „Program:” is a flex
item of a column with `align-items: flex-start` (`src/browser/maps-screen.css:156-163`), and the
list stayed wide until the change added `.maps-who-program { max-width: 100%; }`
(`src/browser/maps-screen.css:209-211`). In my reproduction with the head's stylesheets, removing
only that row rule gave a list 1245 px wide and a page 1608 px wide in a 1280 px window. The
author's own row "Point 7 on the kitchen-sink page" shows the same thing in a table cell (list
1298 px, no „…”). Why it matters: the rule tells the next author that the shared sheet does the
work for every list, so a new list in a row sized to its content widens the page again, against
this very rule. The sentence also lists today's state of the product ("także lista „Program:” na
ekranie Mapy i na ekranie przejścia", "każda lista wyboru gry"), which
`.the-way/product-guidelines/template.md:90-97` keeps out of a rule. Suggested wording for the
how-to part: the list is never wider than its row, and a row that holds a list is no wider than its
column (in a flex column that does not stretch its items, the row gets `max-width: 100%`); the
name of the picked position longer than the list ends with „…”.

**M2 — the exception now covers every select list, not only the list of programs, and nothing yet
puts that in front of the human.** Within the task (point 7). Place:
`guidelines/styleguide-browser-view.md:543-550` against the old text („lista programów jako
natywne pole wyboru (`select`)”). The task's point 7 asks that the exception for `select` say the
list cuts the name. The change adds to that the width rule and its reach to every select of the
game (the trip plan's „Weź”/„Wynieś” item lists today). The author names this only under *Choices*
in `author-report.md:151`. The rule has *Decision* `none`, and
`.the-way/product-guidelines/template.md:121-125` (WAY-172) says a rule the cycle finds itself is
named in the request's description among what the human did not see in the task and accepted at
the merge. Why it matters: without that line the human approves the request without seeing that
the styleguide's rule changed for lists the task did not name. Fix: the request's description names
the broadening as something the human did not see in the task. No code change needed. My check of
the reach: the trip plan's list in `li.trip-entry` keeps the same box with and without the change
(73 × 23 px at the same place, beside its number field); it has no long names today.

**M3 — D-299 is reported as "matches, with a note" while the state seen does not meet D-299's own
"complies" sentence in the smallest window.** Within the task (point 3). Place:
`author-report.md:71`. D-299 (`foundations/decisions.md`, its *Verification*) gives as complying
"the pick of actions of a game with every action discovered standing whole without scrolling". The
author measured the pick of rule 1.2 from y 438 to 738 in a 720 px window: its last row stands 18 px
below the window's edge until the page scrolls. D-396 makes 1280 × 720 the smallest supported
window. The binding sentence of D-299 (no search field, no row of recent picks) holds, so point 5's
condition (a) does not hold and nothing should be fixed. But the result is not "matches": the
rationale of D-299 rests on "every cell of the pick fitted without scrolling", and says that a
search or recent picks may come back when that stops being true. Why it matters: the human reads
the defects list, and this observation is not there. Fix: relabel the row as
`bad: defect for the human` (or an observation for the human), and add a defect entry that says
what the player sees (the last row of actions below the window's edge when the panel opens under
rule 1.2 in a 1280 × 720 window) and that the entry touched is D-299.

**M4 — the author does not check whether the defect fixed here brings back the excluded image
comparison (D-89 over D-87).** Within the task (point 7). Place: `author-report.md:139`, which
gives D-87 and D-88 as the reason for no test. D-89 counts as a violation "a change of the look of
a screen whose author and reviewer do not check whether a concrete visual defect … now calls for
image comparison". This change fixes exactly such a defect (the page 1661/2053 px wide). My check,
in place of the author's: image comparison is not called for. The defect is a page width, and a
whole-screen image comparison would catch it only with a reference state made for it (a program
with a long name). The measurement that does catch it, `scrollWidth` with a long name in a real
browser, is the automation D-75 and D-88 defer. No smaller test missed it, since none can compute
layout (jsdom computes none). Why it matters: without this line in the request the exclusion is
renewed without the check its decision asks for. Fix: one sentence in the request's description.

**M5 — the comparison of point 6 with the look before the split was a comparison of stylesheet
text; the report does not count it among the weak spots, and it does not say how it set aside
most of the reversed pairs.** Within the task (point 6). Place: `author-report.md:84` and
`author-report.md:185-192`. The task asks the session to view the states "i porównuje je z
wyglądem sprzed podziału". The author compared the rules at `581d09bb^` and `a9a95479`, and then
looked only at reversed pairs "whose last compound shares a class": 14 of them. My rerun of its
script without that filter (`review-whole-script-css_pairs.py.txt`) counts 7724 reversed pairs
that set the same property in the same context. I checked the two ways a set-aside pair could
still meet one element. First, same element type with no shared class: 35 pairs, all of different
element types (`review-whole-type-pairs.txt`). Second, a shared control carrying a class of a
screen: none do; the button carries only `button`, its kind and `selected`
(`src/browser/view/controls/react-button.tsx:66`), and the list only `select-list`
(`src/browser/view/controls/react-select-list.tsx:38`). So the conclusion stands as far as this
reading goes. What the method does not exclude: an element that carries the classes of two screen
rules with no class in common. Why it matters: "matches" reads as a viewed comparison, and the
human cannot tell how much was looked at. Fix: say in the weak spots that the pre-split look was
compared as stylesheet text and not viewed, and state the filter.

## The questions of the handoff

1. **The CSS.**
   - Point 7 is met in Chrome. In my reproduction with the head's stylesheets
     (`review-whole-select-page.html.txt`, 1280 × 720) the page stays 1280 px wide. The row of
     Mapy and its 200-letter list are 884 px, the list on the run screen's row is 492 px, and the
     cut name ends „…” with the arrow kept. A 40-letter list keeps its width (273 px in my fonts)
     beside its label, with or without the change.
   - The row rule of `maps-screen.css` is needed (M1).
   - Every use of the class (`grep` over `src/`): Mapy (`maps-screen.tsx:317`), the program panel
     in the run mode (`program-panel.tsx:571`), the trip plan (`trip-plan.tsx:231`) and the
     kitchen-sink page (`kitchen-sink.tsx:180`). No `<select>` stands outside the shared control.
     The trip plan's box does not change. The kitchen-sink's states are as the author reported.
     The only element the account card or the program editor builds with this class is the panel's
     list above.
   - All three game rows align their items to the centre or the top (`maps-screen.css:197`,
     `program-panel.css:14`, `program-panel.css:142`), so a change of a select's baseline from
     `overflow: hidden`, where an engine does it, moves nothing.
   - `overflow: hidden` does not clip the focus outline: the outline is drawn outside the element's
     own box, and the clip acts on its content. Seen: keyboard focus on the 200-letter list draws the
     2 px outline whole (screenshot looked at and removed).
     `tests/invariants/test_browser_view_focus_outline.py` passes, and the change sets no
     `outline`.
   - The rule belongs in the shared sheet: D-265 and D-421 put the look of a shared control only in
     `src/browser/styles.css`. A width cap on the list itself is part of that look. The limit of the
     screen's own row stands in the screen's sheet, as D-421 gives.
   - The task's „Lista dostaje największą szerokość” names no number. The width of its row is a
     reading the text allows.
2. **The styleguide's change.** It agrees with the rule's *Good* and *Bad* (the exception names the
   cut that *Bad* forbids elsewhere) and with `Decision: none`. `foundation_check.py` passes. No
   test quotes the rule's text: a search of `tests/` and of `foundation_check.py` for the rule's
   name and for „lista wyboru (`select`)” finds nothing. Its content: M1 and M2.
3. **Source fidelity.**
   - Point 7: built as the task gives, with the broadening of M2.
   - Point 5: the one commit is point 7's own order, not a fix under point 5.
   - The four defects, each checked against condition (a):
     1. The scroll: D-370 asks for the page at its top only when the window opens.
     2. „Koniec przejścia” after an error: D-323 against D-371 is open.
     3. The wolf over the campfire: D-415 leaves covering to the human.
     4. „Potem” after a completion in a fight: D-335 holds as written.

     In each, condition (a) does not hold or cannot be settled without a decision, so a defect for
     the human is right.
   - Point 2: the task wants the end of a solved Las reached by a program written in the editor.
     Las was solved by play at minute 712 with such a program. Skraj lasu, solved first, is the way
     Las now opens (`f513b34f`). That is faithful, and the author says why „Minuta 480” was not
     reached.
4. **Completeness of the report against points 1–4, 6, 7 and 8.**
   - Every item has a row: each sub-item of point 1 (loop2#65-1 three, #66-1, #79-1 three, #79-23,
     #83-4 three, #86-1 two), point 2, every item of point 3 (the scroll, D-03 three, D-254/D-417,
     D-278, D-299, D-323, D-349), the four items of point 4 in one row with its reason, every item
     of point 6, both lengths of point 7, and both ends of point 8.
   - D-317 and D-347 are named as left out, with the reason.
   - The defects for the human say what the player sees, how to reach it and which entry is touched.
     The exception is D-299 (M3).
   - The states set by hand are named in the table and in the weak spots. The two weak spots left
     unnamed are M3 and M5.

## Declined to judge

- Two long names of programs that share a long beginning read alike in the closed list once cut
  (the reason D-169 gives for unique names). This follows from the look the task chose (ellipsis),
  not from the change.
- Whether the native popup of the opened list shows a 200-letter name whole in a 1280 px window:
  headless Chromium draws no popup. The author says so, and the styleguide's „pełna nazwa stoi w
  rozwiniętych opcjach” is the task's own sentence.
- The look of `text-overflow: ellipsis` on a `select` in Firefox: point 4's tool failure leaves
  Firefox unviewed, and the author names it in its own-work check.
- The long name on the kitchen-sink page's sample (no player sees it, and no rule asks for the
  sample). The author reported it and left it as is.

## Checks run

- `git rev-parse HEAD`, `git log`/`git diff e5516b17..8e9c01a0`, `git diff --check` on the range →
  exit 0, no whitespace errors. `git status --short` empty before and after.
- `python -B .the-way/task-cycle/change_file_sizes.py e5516b17 8e9c01a0` → exit 0. Sizes:
  `guidelines/styleguide-browser-view.md` 1160→1163, `src/browser/maps-screen.css` 225→233,
  `src/browser/styles.css` 690→702. `guidelines/coding.md` holds no `### Size of a function and a
  file`, so no size test exists. Structure: no finding.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors`.
- `npm test -- tests/invariants/test_browser_view_token_values.py` → exit 0 (4 tests OK).
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` → exit 0 (3 tests OK).
- `npx prettier --check src/browser/styles.css src/browser/maps-screen.css` → exit 0.
- Browser check (manual):
  - Setup: a static page with the head's `tokens.css`, `styles.css`, `program-panel.css` and
    `maps-screen.css`, built in the DOM of the Mapy column, the run panel's row and a trip entry. It
    was served by `python -m http.server` on 127.0.0.1 and opened with `playwright-cli -s=rv` in
    headless Chromium at 1280 × 720.
  - Results: the widths above. With the row rule removed: 1245 px list, page 1608 px. With the whole
    change removed: page 1608 px, trip list unchanged, 40-letter list unchanged. Keyboard focus on
    the long list: `:focus-visible`, outline solid 2 px drawn whole. Computed `text-overflow:
    ellipsis`, `overflow: clip` (Chromium's computed value for `hidden` on a select), „…” seen.
  - Limits: the game was not started, so the fonts fell back (404 of the font files) and absolute
    widths differ from the author's. The page is kept as `review-whole-select-page.html.txt`.
- Rerun of the author's comparison of the split without its filter
  (`python -B review-whole-script-css_pairs.py.txt 581d09bb^ a9a95479 …`) → exit 0, 7724 pairs, 14
  with a shared class. Filter of same-type pairs (`review-whole-script-type_pairs.py.txt`) → exit
  0, 35 pairs, none of one element type.
- Not run: `npm test` in full (the orchestrator's gate). `python -B
  .the-way/instruction-files/check_instructions.py` was not run here because no instruction file
  changed; it stays for the full gate. Firefox was not run (the same tool problem as point 4;
  nothing installed). The running game was not opened, so the author's in-game measurements
  (1661/2053 px before, 884/492 px after) are confirmed only by reproduction, not repeated.

## Reaches beyond the dispatch

- D-89 (`foundations/decisions.md`, whole): the return check of D-87 for a change of look (M4).
- D-415 (whole): to judge defect 3.
- D-395, D-418, D-419 (binding text): for the shared control's knowledge of screens and for the
  author's pushed screenshots.
- Invariants `browser-view-token-values`, `browser-view-focus-outline` and
  `tracked-file-private-paths` (whole): the invariants a stylesheet and a guideline change reach.
- `.the-way/product-guidelines/template.md` lines 1-130 and the styleguide template's lines on
  *Decision*: to judge the changed rule (M1, M2).
- Code read: `src/browser/view/maps-screen.tsx:290-340`, `program-panel.tsx:555-590`,
  `trip-plan.tsx:200-260`, `controls/react-select-list.tsx`, `controls/react-button.tsx:66`, and
  the containers' rules in `src/browser/maps-screen.css` and `program-panel.css`. These were for
  question 1.
- The author's evidence `author-css-split-compare.txt` and `author-script-css_compare.py.txt`, read
  for M5.

## Working copies

- `.runs/review-whole/` in the worktree held: the decision index and section list, the
  reproduction page, the server log, one screenshot of the focus, the outputs of the focused tests
  and of `foundation_check.py`, the comparison scripts and their outputs, and an extract of eight
  decisions. Removed.
- Kept in `reports/` beside this report:
  - `review-whole-script-css_pairs.py.txt`
  - `review-whole-script-type_pairs.py.txt`
  - `review-whole-type-pairs.txt`
  - `review-whole-select-page.html.txt`
- `.playwright-cli/` in the worktree root held the CLI's snapshot and console log of my session.
  Removed. Browser session `rv` closed; `playwright-cli list` shows no browsers.
- The `http.server` on 127.0.0.1:8765 was stopped, and the port has no connection.
- Remainder: none.

## Unread material

- Decisions of the index: 72 listed in full (sections "Look of the browser view", "Programs:
  ownership, names and the copy", "Screen Mapy and Siedziba", "Screen of a map run and the
  end-of-run window", parts `browser-view` and `agent-workflow`, and the decisions the task
  names). 14 of them read whole: D-03, D-75, D-87, D-88, D-169, D-170, D-255, D-265, D-278, D-299,
  D-323, D-349, D-417, D-421. The other 58 were read in their binding sentences in the index.
- The 235 listed by heading were run through. Those opened beyond the index are listed under
  Reaches.
- D-254 is withdrawn (`foundations/decisions.md:11415`), and its question is answered by D-417,
  read whole.
- Of the decisions that bear on the change and stayed unread whole: D-43, D-44, D-47 and D-396
  were read in their binding sentences only.
- Guideline files: `guidelines/styleguide-browser-view.md`, `guidelines/testing.md` and
  `guidelines/coding.md` were read whole. `guidelines/coding-browser-module.md` was not read,
  because no module of the view directory changed.
- Invariants: the three named under Reaches were read whole. The rest of those of `browser-view`
  and `every` were read by heading and *Part* only, because a stylesheet and a guideline change
  reach none of their rules.
- The glossary entries `map run` and `program` were read; the-way's glossary was not read.
- Part map: `browser-view` and `agent-workflow` were read whole.

## Searches not found or unclear

- A test or a check that quotes the text of the rule "A name typed by the player breaks in its
  row": none found in `tests/` or in `foundation_check.py`.
- `curl` to the stopped server ended with exit 28 rather than a refused connection.
  `Get-NetTCPConnection -LocalPort 8765` found no connection, so I take the server as stopped.
