PASS ccc647c4aa604eb3e2669e69f48003b13216cfd9

# Review — the return step's commit over correction 1, cycle `drobne-bledy-ekranow`

Range: `31ca8d122e4df926a6cde3d6a22e3a37788192cd..ccc647c4aa604eb3e2669e69f48003b13216cfd9`, one commit
(`ccc647c4`, `foundations/decisions.md`, 3 insertions, 4 deletions: the *Verification* of D-57 and of
D-367). `git rev-parse HEAD` = `ccc647c4aa604eb3e2669e69f48003b13216cfd9`, the head of the handoff.
`.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records.

## Findings

### Critical

none

### Important

none

### Minor

1. **The two tests the changed clauses now name carry no line `decision:` for the decision whose
   clause names them.** `foundations/decisions.md:11309` (D-367) now says a test holds "the flight of
   an icon and the cloud of dust whose animation the browser cancels because the scene is hidden over
   at once, and not played from their start when the scene is drawn again"; the test that holds it,
   `tests/view/scene.test.mjs:1990` („an effect or a return of the tint cut by leaving the screen is
   over as its animation's end makes it, and a scene shown again does not play it”), carries only
   `decision: D-317` and `decision: D-316` (`:1991`, `:1992`). `foundations/decisions.md:5855-5856`
   (D-57) now says a test holds the number of a condition on warmth "in the sentence of a rule and of a
   rule group with the decimal comma of the body row, „36,5 °C”"; the test that holds it,
   `tests/view/program-editor.test.mjs:1573` („a number with a fraction stands in the sentence of a
   rule and of a group with a decimal comma, a whole one without it”), carries no line `decision:` at
   all. Why it matters: the template of a decision, `.the-way/elements/decisions/template.md:232-244`,
   says the line `decision:` "stands at the test that holds the sentence" and that the clause `tests:`
   carries "no path, no test name and no number: the lines `decision:` find the tests". With the pair
   of examples of D-367 gone, an agent who looks for what holds that part of D-367 by `decision: D-367`,
   or for the test of D-57 by `decision: D-57`, finds neither test; the clause tells it a test exists
   but gives it no way to it. The content of both clauses is true (both tests exist with those titles,
   hold what the clauses say and pass, see Checks), so the departure is one of form and no sentence is
   read wrongly: Minor (WAY-364). The D-367 half is the Minor finding the reviewer of correction 1
   already gave, which the return step report (`return-step-report.md:104`, `:107`) sends to the
   request; the D-57 half is new — the return step report does not name it. Adding the two lines is a
   change of test files, outside the return step, so it goes to the request beside the other.

2. **D-57's *Verification* names as held a part that is in no sentence of D-57.**
   `foundations/decisions.md:5855-5856` adds "with the decimal comma of the body row, „36,5 °C”"; the
   binding sentence of D-57 (`:5848`, "A character's warmth is its body temperature in degrees Celsius,
   counted with tenths.") and its *Rationale* and *Rejected* (`:5859-5860`) say nothing of a decimal
   comma, and the return step report itself says "The decimal comma of the body row itself stands in no
   decision" (`return-step-report.md:105`). The template gives the clause as `tests: <the parts of the
   sentences they hold, in words>` (`template.md:241-244`), so a clause naming something the sentences
   do not hold makes D-57 look as if it settled the comma. Why only Minor: the attribution is the
   product's standing one, not new — the styleguide's Program editor row says "jak temperatura w
   wierszu ciała (D-57)" (`guidelines/styleguide-browser-view.md:726-728`), the header of
   `tests/view/body-row.test.mjs:1-2` writes "the temperature in tenths with a decimal comma (D-57)",
   and the clause before the commit already named "shown cut down to tenths in the body row", which
   the sentence does not hold either; the clause agrees with the code, and an agent who reads the comma
   as D-57's is led to nothing the code does not do. A choice of a decimal comma with no decision behind
   it is a gap the return step rightly did not fill by inventing an entry; where the human wants it
   closed, the place is a decision of its own (`the-way-record-decision`), and then the comma leaves
   D-57's clause. Nothing to fix in this request.

3. **The new D-367 clause reads ambiguously.** `foundations/decisions.md:11309`: "the flight of an
   icon and the cloud of dust whose animation the browser cancels because the scene is hidden over at
   once, and not played from their start when the scene is drawn again". With no verb or mark before
   "over at once", the words read first as "the scene is hidden over at once". The earlier clauses of
   the same list use the same elliptical form ("an effect that runs standing still … , gone when its
   animation ends"), and the rest of the clause sets the reading right, so no one acts wrongly on it:
   Minor, polish. A colon or "are" before "over at once" would remove it.

Blocking: none. Out of scope: none.

## The return step's claims (report section "Correction 1 range", item 1 and 2 of "Changed")

- D-367: the dropped pair said "complies: the flight of an icon or the cloud of dust whose animation
  the browser cancels because the scene is hidden — … — over at once and not drawn again when the scene
  is shown; violates: the same effect left standing at its first frame, so that it plays from its start
  when the screen is shown again". `tests/view/scene.test.mjs:1999-2072` holds both halves for the
  flight (`.scene-flight`) and the dust (`.scene-dust`): it fires `animationcancel` on the element and
  everything under it (`cancelWithin`, `:1981-1984`), asserts the effect gone (`:2069`), draws the
  scene again and asserts it not back (`:2071`). A scene with no handler of `animationcancel` fails at
  `:2069`. So the part leaves the pair for the clause `tests:`, as the template (`template.md:245-248`)
  and the handoff's rule give, and no part of the pair stays unheld. **True.**
- The causes the pair named — leaving the screen of the run or the end-of-run window — are gone from
  *Verification* but stand in the binding sentence (`:11304`); the hiding itself is `[hidden]` with
  `display: none` (`src/browser/styles.css:20-21`, `src/browser/view/run-screen.tsx:180`), and
  `tests/view/end-window-game.test.mjs:186-189` hold the areas hidden under the window. The cancel by
  the browser of a `display: none` subtree is the browser's, not a test's. I count no part left unheld.
- D-57: the test exists with that title (`program-editor.test.mjs:1573`), checks `conditionSentence`,
  `ruleSentence` and `groupSummary(...).condition` with „36,5 °C”, „30,1 °C” and a whole „36 °C”
  (`:1574-1595`), and passes. **True**, with Minor 2 on the attribution.
- "no binding sentence changed": the diff touches two *Verification* lines only. **True.**
- The checks the report gives (exit 0, `0 errors`; exit 0, `0 error, 142 warn, 7 info`) match mine.

## Declined to judge

none

## Checks

- `python -B .the-way/elements/common/foundation_check.py` at `ccc647c4` → exit 0, `0 errors`
  (log `.runs/task-cycles/drobne-bledy-ekranow/reports/review-corr-1-return-step-foundation-check.log`).
- `python -B .the-way/instruction-files/check_instructions.py` at `ccc647c4` → exit 0,
  `0 error, 142 warn, 7 info` (log `reports/review-corr-1-return-step-check-instructions.log`).
- `npm test -- tests/view/scene.test.mjs` → exit 0, 73 pass, 0 fail (log
  `reports/review-corr-1-return-step-scene-test.log`).
- `npm test -- tests/view/program-editor.test.mjs` → exit 0, 55 pass, 0 fail (log
  `reports/review-corr-1-return-step-program-editor-test.log`).
- `git status --short` after the runs → empty; the worktree is unchanged (the build writes the ignored
  `dist/`, a file of the product's own tools).
- Not run: the full suite (the cycle's own run, as the handoff gives); the local game (forbidden by the
  handoff; nothing in the range is a change of behaviour).

## Decisions read whole

2: D-57 (`foundations/decisions.md:5846-5860`) and D-367 (`:11302-11313`), each with *Rationale* and
*Rejected*.

## Reaches beyond the handoff

- `.the-way/elements/decisions/template.md:37-41`, `:166-170`, `:227-267` — the form of
  *Verification*, the clause `tests:`, the line `decision:` and the pair of examples, to judge the
  commit's two clauses and the dropped pair (findings 1 and 2).
- `guidelines/styleguide-browser-view.md:720-731` — the row that cites D-57 for the comma, to judge
  why the return step wrote it into D-57 (finding 2).
- `tests/view/body-row.test.mjs:1-110` — the tests that carry `decision: D-57`, and the header that
  ties the comma to D-57 (finding 2).
- A search of `hidden` in `src/browser/` and of hidden areas in `tests/view/`, reading
  `tests/view/end-window-game.test.mjs:186-189` from the result — whether the causes of the hiding the
  pair named stay held once the pair is gone.
- `scripts/test.py` — how a focused `npm test -- <file>` runs (it builds `dist/` first).

## Working copies

None made. The directory `.runs/review-corr-1-return-step/` was not created. Four logs of my checks
stand in `reports/` beside this report, as the report needs them.

## Unread material

- `reports/correction-1a-report.md` (132 lines) and `reports/correction-1b-report.md` (89 lines),
  named as context: not read; the claims under review are those of `return-step-report.md`, section
  "Correction 1 range", read whole, and the remarks `reports/correction-1-remarks.md`, read whole.
- `return-step-report.md`: lines 1-88 (the sections before "Fix 2 range", of earlier ranges) not read;
  lines 89-110 read.
- The frozen task `task.md`: read whole.

## Searches not found or unclear

- A line `decision: D-367` at `tests/view/scene.test.mjs:1990` and a line `decision:` at
  `tests/view/program-editor.test.mjs:1573`: not found (finding 1).
- A decision that settles the decimal comma of the body row or of a rule's sentence: not found in
  D-57; the return step report says none exists, and I did not search the whole log for it beyond the
  places that cite D-57 (finding 2).
- A rule on `decision:` lines in `guidelines/testing.md`: a search of `decision:` there found nothing;
  the rule I applied is the template's.
