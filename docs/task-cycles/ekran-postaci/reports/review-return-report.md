PASS 61f5ce35b983e85f46fe682dd0f5df08e303394b

# Review of the return step's commit — task `ekran-postaci`

Range `7a10eaf074825de3b7177bb281ff348d8e186059..61f5ce35b983e85f46fe682dd0f5df08e303394b`, one commit (`61f5ce35`),
files `foundations/decisions.md` (+13 −15) and `tests/view/icons.test.mjs` (+2). `git rev-parse HEAD` =
`61f5ce35b983e85f46fe682dd0f5df08e303394b` (matches). `.the-way` at `19e5774a…`, the commit the gitlink records.

Blocking findings: 0. Minor: 2. Out of scope: 2 (under Declined to judge).

## What the commit does, verified

- Only the *Verification* fields of D-445, D-446 and D-201 change. Their binding sentences, *Rationale* and
  *Rejected* are byte-for-byte as at `7a10eaf0` (the diff has no hunk outside the three *Verification* fields).
  No invariant, glossary entry or part-map entry changes.
- **D-445** (`foundations/decisions.md:4873-4882`): the violation „a figure that walks while its character is in
  an earning loop” is gone. A test holds it: `tests/view/character-screen.test.mjs:399-448` ("the figure stands
  first in the left area …") asserts in its `check()` that the figure's `img` `src` equals the idle sheet the
  picture band draws (`campDrawing(camp).members[0].idle.href`), and runs that check for the earning-loop state
  (`:443-446`); a walking sheet fails it. The tests clause already named "in an earning loop". The pair that stays
  — the motion by CSS and reduced motion — is held by no test (the test reads no animation or media rule). Correct.
- **D-446** (`foundations/decisions.md:4895-4902`):
  - "the icon the mask of the file the archetype's data names, before the name" — held by
    `tests/view/character-screen.test.mjs:133-165`: the icon is `archetype.firstElementChild` (before the name),
    has class `icon-mask` and `--icon` = `url("/icons/${ARCHETYPES[…].icon}.svg")`. This also holds the removed
    violation "drawn as a picture of its file" (an `<img>` fails the class check).
  - "the icon the elemental mage's data names a file of `assets/icons/` credited with its page on game-icons.net"
    — held by `tests/view/icons.test.mjs:358-364` (data names `cultist`, title „Cultist icon”, the file exists in
    `assets/icons/`) and `tests/view/icons.test.mjs:342-356` (the credits line „Mag żywiołów: „Cultist icon”,
    Lorc, game-icons.net, CC BY 3.0, …” with the link `https://game-icons.net/1x1/lorc/cultist.html`). This
    replaces the old complies example truthfully.
  - The pair that stays, where the view takes the icon's file name from: no test catches a view that writes
    `"cultist"` itself while the data says the same — true, the test at `character-screen.test.mjs:145-148`
    compares with the data's value, which a hard-coded equal name passes.
- **D-201** (`foundations/decisions.md:7368-7375`): "the line of a run that pays in the role `text` through the
  real stylesheet" — held by `tests/view/world-area.test.mjs:821-835`, which loads `gameStylesheetText()`
  (`:36`) and asserts `color` `var(--text)` for the paying line (`:833`). The pair that stays — the line after a
  completion — is held by no test: the completed state in `world-area.test.mjs:260-269` carries no practice, and
  `character-skills.test.mjs:144-165` tests the text function only. Correct.
- The two new `decision: D-446` lines (`tests/view/icons.test.mjs:344`, `:360`) both begin at the start of the
  second binding sentence of D-446 ("The icon of an archetype is …"), quote it verbatim and hold no `"`; the
  foundation check passes (below). The line at `:344` quotes only the prefix the test holds; for `:360` see
  Minor 1.

## Findings

### Minor 1 — `tests/view/icons.test.mjs:360`: the quotation claims more of D-446 than the test holds (within the task)

The line quotes the whole sentence "The icon of an archetype is an icon of game-icons.net (D-27) whose file the
archetype's data names, and it stands before the archetype's name, drawn as a mask in the colour of that name". The
test under it (`:361-363`) checks only that the data names `cultist` with its title and that the file exists; it
renders nothing, so it holds neither "before the archetype's name" nor "drawn as a mask in the colour of that name".
A reader who follows the `decision:` lines to find which test holds the mask and its colour lands on a test that
checks neither. The line at `:344` shows the right form: quote the prefix up to "whose file the archetype's data
names". Grade Minor: the template lets a quotation be any start of a sentence of three words or more, the check
passes, and no behaviour depends on it; the cost is a misleading pointer.
Evidence: `tests/view/icons.test.mjs:358-364`; template rule `.the-way/elements/decisions/template.md:268-277`.

### Minor 2 — `foundations/decisions.md:4895-4902`: "in the colour of that name" is now held by no test and covered by no example (within the task)

The commit dropped the violation "the icon of an archetype drawn as a picture of its file, in a colour of its own".
Its first half is held (the `icon-mask` class check, above); its second half is not. No test reads the colour of
the archetype's icon: `character-screen.test.mjs:133-165` checks class, `aria-hidden` and `--icon`; the colour
comes only from `.icon-mask { background-color: currentColor }` (`src/browser/styles.css:474-481`) and the
comment of `src/browser/character-screen.css:81`; a grep of `tests/` for `character-screen-archetype` and
`currentColor` finds no colour assertion for it (only `tests/invariants/test_browser_view_token_values.py`, which
accepts any token, so a rule giving the icon `var(--positive)` passes it). The tests clause, rightly, does not
claim the colour; but after the commit a change that gives the archetype's icon a colour of its own passes every
test, and the *Verification* no longer points the comparing agent to that part. Keeping a violation such as "the
archetype's icon given a colour of its own instead of its name's" would restore it. Grade Minor: the template makes
a pair optional and the binding sentence still states the colour, so an agent comparing a change reads it there;
together with Minor 1 the two `decision:` lines quoting the colour (`icons.test.mjs:360`, and the earlier
`character-screen.test.mjs:135`) make it look held when it is not.
Evidence: method of the return step "leaves a pair only for a part no test holds"
(`.the-way/task-cycle/skill/return_step.md:16-18`); template `.the-way/elements/decisions/template.md:282-287`.

No Critical or Important finding. The commit changes no binding sentence and no *Rationale*; no claim of a
`tests:` clause it writes names something a test does not hold.

## Declined to judge

- `tests/view/character-skills.test.mjs:146`, `:159` and `tests/view/world-area.test.mjs:215` quote D-201's
  sentence "… the positive line remains after death and completion until „Restart” or „Zakończ”", while no test
  holds the part after a completion (the pair rightly keeps it). The same over-quotation as Minor 1, but these
  lines predate this commit and lie in the whole change already reviewed twice; out of scope of this review, Minor.
- D-445's binding sentence names the figure standing in a manual map run "paused"; the test of the figure checks
  going, ended (dead) and earning-loop states, not paused, and neither the tests clause nor the pair names paused.
  Not touched by this commit; out of scope of this review, Minor.

## Checks

- `git rev-parse HEAD` — `61f5ce35b983e85f46fe682dd0f5df08e303394b`; `git -C .the-way rev-parse HEAD` equals
  `git ls-files --stage -- .the-way` (`19e5774a…`).
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors" (holds the two new `decision:
  D-446` quotations).
- `npm test -- tests/view/icons.test.mjs` (runs the build, then that file alone via `scripts/test-node-file.mjs`)
  — exit 0, 41 pass, 0 fail. `git status --short` afterwards — empty.
- Manual check by reading: for each part moved into a `tests:` clause, the test that holds it and the assertion
  (above); for each part left in a pair, that no test asserts it (greps of `tests/` for `icon-mask`,
  `currentColor`, `character-screen-archetype`, `run-practice`, `completed(`).
- Not run: the full gate (the user's instruction for this cycle); `python -B
  .the-way/instruction-files/check_instructions.py` (the commit touches no instruction file); a mutation run
  showing that a coloured archetype icon passes the screen's test (judged by reading the test's assertions).

## Reaches beyond the dispatch

- `tests/view/character-screen.test.mjs:120-165`, `:394-494` — the tests the D-445 and D-446 clauses name.
- `tests/view/world-area.test.mjs:205-314`, `:810-835`, and `tests/view/character-skills.test.mjs:140-166` — the
  tests of D-201's clause and pair.
- `tests/view/icons.test.mjs:338-367` — the two cases with the new lines.
- Grep of `tests/` for `decision: D-(445|446|201|27) ` — every test that quotes these decisions.
- `src/browser/styles.css:468-481`, grep of `src/browser/character-screen.css` — how the icon's colour is set, for
  Minor 2.
- `package.json` (the `test` script) and `scripts/test.py:53-84` — to confirm a one-file run is not the full gate.

## Unread material

none — the handoff, the method `.the-way/task-cycle/review/SKILL.md`, `.the-way/task-cycle/skill/return_step.md`,
the task `task.md` and the author's return report read whole; D-445, D-446 and D-201 read whole at the head and in
the diff against `7a10eaf0`; `.the-way/elements/decisions/template.md` read in its sections "Binding sentences"
(end), "Decision or invariant", "Changing a decision", "Withdrawn numbers", "Relations and precedence" and
"Verification" (lines 140-309), not lines 1-139 and 310 onward, which hold no rule on *Verification* beyond the
form at line 42 found by grep.

## Searches not found or unclear

- Not found: a test that asserts the colour of the archetype's icon on the screen Postać (Minor 2).
- Not found: a test that holds D-201's line staying after a completion (consistent with the pair kept).

## Working copies

None made; `.runs/review-return/` was not created. The build the one-file test run made is the product's own
output, outside the rule; `git status --short` stayed empty.
