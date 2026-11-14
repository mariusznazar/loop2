# Findings of the review of the whole change — for the fix

Source: `reports/review-whole-report.md`, first line `FAIL 8e5af859593ac49371a1e7d79fe414b828170542`, range
`6ab6a32be884ac174b068b8a6a5dd1515073d2a9..8e5af859`. Cut word for word from the report: the one blocking
finding, then the Minor findings of the review of the whole change within the task, as the cycle fixes
them together with the blocking one (the Minor finding M7, outside the task, and the out-of-scope
matters O1–O3 are not here and are not yours to fix).

## Blocking finding

### F1 — Important — To do 1 and acceptance criterion 2 unmet in `tests/view/program-editor.test.mjs`

Place: `tests/view/program-editor.test.mjs:112` (`const ITEMS_LISTED = Object.keys(ITEMS);`), used by
position at `:484` (`item: ITEMS_LISTED[0]`), `:524` (`ITEMS_LISTED.slice(1)`) and `:528`
(`ITEMS_LISTED[ITEMS_LISTED.length - 1]`), and passed as the data-order input to `withConditionKind`
in cases whose expectations are hard-coded to `"stick"` (`:158-176`, the case "group conditions offer
the same kinds …", expecting `{ kind: "itemBelow", item: "stick", value: 8 }`).

What is wrong: To do 1 names, among the shapes to replace, `Object.keys(ITEMS)` "unpacked by position
and variants". `ITEMS_LISTED` is that variant: a named constant holding the data's key order, read by
position. The author's report calls it "all items" and leaves it (report, Item 1, "Left on purpose"),
but three of its uses are positional picks, and the input it gives to `withConditionKind` makes the
expected `"stick"` of the case at `:158-176` true only while the stick is first in the data.

Why it matters: acceptance criterion 2 says the tests pass unchanged whatever place a new item takes
in the data. The author's own trial (report, "Criterion 2 trial") shows `program-editor.test.mjs:158`
failing with `{ itemBelow, item: 'dummyFirst' }` against `'stick'`. The fix is in the test alone, with
no change of product behaviour: write the item list the case passes as an explicit literal
(`["stick", "berry", "moss", "fiber"]`) and take the first item from it, which is what the rule just
written to `guidelines/testing.md` ("Test inputs and expected values") asks. This is not the same as
the editor-default cases of out-of-scope matter O1: here the test builds the list the product is given.

Evidence: `rg -n "ITEMS_LISTED" tests` (lines above); the author's trial; the testing rule's sentence
at `guidelines/testing.md:120-123`.

## Minor findings within the task

- M1 — `src/browser/view/controls/react-number-field.tsx:5-8` cites `(D-265)` for "the field knows no
  rule of any screen"; the decision written for this is D-395 (D-265 is the two-forms decision). A
  reader following the citation reaches the wrong rule.
- M2 — `src/browser/view/controls/react-number-field.tsx:66-67` still says "or while a rejected trip
  count stays in it"; a shared control that no longer knows the trip rule names it in a comment. Say
  "a rejected text".
- M3 — `src/browser/view/trip-editor.ts` `readTripCount` returns the inline shape
  `{ value: number; commit: boolean } | null` instead of `NumberReading | null` from the control. The
  two stay equal by hand; importing the type is the direction D-395 allows (screen imports control).
- M4 — `D-395`, `*Rejected:* unknown` (`foundations/decisions.md`, end of D-395). The row's source
  does keep a way not chosen: To do 5 and the note's row D15 say the control takes a function "instead
  of the parameter `rule="trip"`". It names no cost or reason beside it, and the template lets a
  decision written from a row use `unknown` where it has none, so I do not call the entry wrong; but
  the entry's own *Verification* ("violates: … picks the rule of a screen by a value of one of its
  parameters") shows the way, and *Rejected* could hold it with `unknown` for the reason. Leaving it
  as is loses nothing a reader could not find in the *Verification* line.
- M5 — `D-394`, *Rationale* last clause ("a function of the simulation that is the simplest point of
  observation of a rule is worth keeping where the game has no use for it") states a general principle
  that row 2 does not settle (row 2 settles `actionFeasible` alone). Trim it to `actionFeasible`.
- M6 — `tsconfig.sim.json` `"noEmit": true` is what D-06 and D-393 call "emits nothing", and the
  source note (card D21) names it, but no test pins it: without it the build would write `.js` files
  beside the simulation's sources, since the configuration has no `outDir`.
  `tests/invariants/test_simulation_type_check.py` would still pass. A one-line assertion on the
  configuration, or on `git status` of the copy after `npm run build`, would close it.
- M8 — `tests/invariants/test_simulation_type_check.py` (`test_typecheck_command_refuses_a_name_the_simulation_has_no_right_to`):
  the case asserts the compiler's exact wording `Cannot find name '<name>'` in the output for each of
  the four planted names. `guidelines/testing.md` "Behaviour, not implementation" says not to fix
  the exact text of a refusal without a requirement that settles it. The author's reason is good — the
  text is what tells the simulation's configuration apart from the browser's, which passes all four
  names — so the pin is not wrong, but it ties the invariant to the wording of one compiler release
  (the package is pinned, so it holds today). A less brittle pin is the error code per name
  (`TS2304` or `TS2584`, which the compiler gives for an unknown name), which keeps the
  discrimination. Within the task (the test is new
  code of this change).
