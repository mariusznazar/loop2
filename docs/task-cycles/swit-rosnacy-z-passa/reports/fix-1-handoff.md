# Handoff — the fix of review 1's findings (the one author, resumed)

You are the one author of this cycle, resumed for **the fix of a review's findings** (variant of
`the-way-make-change` named "the fix of a review's findings"; read the variant's file of the method
when you come to it). The review of the whole change (`reports/review-1-report.md`, first line
`FAIL 83c8369a58703dcf4f471226635bc424d5135da0`) found two blocking findings and seven Minor ones within
the task. The findings, in the reviewer's words, are in `reports/findings-1.md` — read it whole. The
fix range runs from the reviewed head `83c8369a58703dcf4f471226635bc424d5135da0`.

Same worktree and branch (`the task's worktree`, `task/swit-rosnacy-z-passa`).
Commit by path, in English. Write your report to
`docs/task-cycles/swit-rosnacy-z-passa/reports/fix-1-report.md` (checks with command and exit code,
**Unread material**, **Searches not found or unclear**, the own-work check).

Fix **every** finding of `reports/findings-1.md`, the Minor ones too. Where you hold a finding wrong,
answer it with evidence in the report instead of fixing it; do not skip silently. Run the affected checks
again (focused tests, `npm run typecheck`, `foundation_check.py`, the token/contrast invariants for the
files you change, eslint/prettier through the quality test). Do not run the full `npm test`.

## The orchestrator's rulings (they bind the fix)

- **I1 — the plaque of the flying icon.** Take way (b): follow row 1 as the human settled it. Render the
  flight and its plaque under `.scene-tint`, change the test at `tests/view/scene.test.mjs:1429` (and
  the comment at `:1379`) and the styleguide at `:627-631` to say so, and do **not** add a third exception
  to D-315. Reason: the human's yes cannot be had inside the cycle, and way (a) changes his settlement; (b)
  is the smallest reading that fulfils the task and is a CSS/DOM reorder. Then **measure**, in Chromium
  (as in your own-work check), whether the icon on the plaque stays legible under the tint at the cool
  end, at 0.4, 0.8 and full gold: the contrast of the icon (`text-strong`) against the plaque's
  `panel` as the browser mixes it must keep what D-365 asks of it (read D-365 and its Verification
  whole). If it does not, do not invent a value: return `questions` with the numbers. Say in the report
  the measured numbers. The orchestrator carries the alternative (a third exception) to the request for
  the human to decide.
- **M1 — *Origin*.** The pinned template (WAY-27) governs over the task's item 7. For D-372 and D-373 let
  *Origin* read `none` (the reasoning is in their *Rationale* and *Rejected*); in D-132, D-271, D-315 and
  D-316 remove the item naming the task document that you added, leaving each *Origin* as it was before
  your change (where an *Origin* held a `TODO` for the task's place of settlement, replace it with what the
  template says for an entry the task settles, and name the template line you followed in your report).
  Do not name the task document anywhere in the foundation.
- **M4 — the thinnest frost.** Do not change the look. Make the screenshots needed to show it to the human
  (the frost at 1 and at 2 scene pixels, e.g. at about 36.9 °C and 36.8 °C, streak low), push them by the
  route of D-357 and D-358 to the same directory of the screenshots repository as the other seven and report
  the **new commit** and the links for the request. Describe in the styleguide (and where the entry
  states the frost) that at the first one or two pixels the frost is the outline alone, as the task
  leaves it, so the statement is true. Do not start the fill at depth 1.
- **M6 — rounding.** Replace the test's expectation of `14` at 35.2 °C with an anchor the task fixes
  (the reviewer suggests 35.5 °C → 12) or accept 14 and say in the test why; correct the report's
  earlier statement ("no test catches `Math.ceil`"), in your fix report.
- **I2, M2, M3, M5, M7** as the findings say. For M5 name the true source of each snow colour (the
  task's preview where it is there, your own measurement of today's rendering where it is not) and say
  honestly in the test's comment and the styleguide what the test guards; for M7 point to the rules and
  decisions that hold the values (D-316, D-372, the frost rules in `src/browser/styles.css`), do not write
  the values into the styleguide.
- The number clash with the open branch `task/martwe-odsylacze-origin` (O1) is out of scope; leave D-372
  and D-373 as numbers.

Return `done`, `done with concerns`, `questions`, `returned` or `blocked`, with your commits, the
one-line check result and the report path. Commit everything; leave the worktree clean.
