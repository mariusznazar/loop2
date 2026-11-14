# Return report — pierwsza-akcja-od-startu

Worktree `the root of the task's worktree`, head `d925d5ca`. **Status: done. No change was made and no commit was written**; the working tree is clean.

## Foundation compared with code

Compared, entry against the code at `d925d5ca`; every one matches:
- D-118, D-121, D-128: `ACTIONS.explore` has no `revealedBy`; `newUnderstanding()` reads from the data what nothing reveals („Zawsze”, „Eksploruj”); the chill reveals `wander` and `temperatureBelow` only (`tests/sim/data.test.mjs`, `tests/sim/discovery.test.mjs`).
- D-195: `SKILLS.exploration.revealedBy = { kind: "explored" }`, read in `newlyRevealed`; the band names the tree beside the first exploration's discovery (`status-row.test.mjs`, `discovery.test.mjs`).
- D-123: `advanceMinutes` writes the rule at the first chill only where `holdsRuleWith(copy.program, "explore")` is false (`discovery.test.mjs`, two cases).
- D-124: `rule-list.tsx` has no `disabled` on „+ reguła” (`rule-editor.test.mjs`).
- D-71, D-313: the corrected examples agree with `discovery-rule.test.mjs` (the chill gives „Zawsze → Wędruj”) and `discovery.test.mjs` (the rule written at pick 84).
- D-312, D-345: agree with `chillRuleGroupName` (`minutesByAction.explore > 0` leaves the sentence out). The three Minor findings of the fix's review were not touched, as the handoff says.
- D-403: `saved-game.ts` refuses a document lacking what `newUnderstanding()` holds, version 6 unchanged (`saved-game.test.mjs`, the crafted table).
- D-404 and the invariant `new-account-first-pass`: the test asserts at least 289 of 300 (exit 0).
- D-96, D-206 (the sentence and the version rule): unchanged and agree. D-249: `loop.ts` discovers nothing in an earning loop, no change. D-80 and D-362: kept; no tracked file in the diff names a vault note or the instrument (`git diff e6a95a9b HEAD`, searched for the names: 0 hits).
- The search of the whole foundation (one search, below) found no further sentence that the change makes false.

## Decisions written or changed

Changed in the change: D-118, D-121, D-123, D-124, D-128, D-195, D-71, D-312, D-313, D-345. New: D-403, D-404. Nothing written or changed in this step.

## Invariants written or changed

Written in the change: `first-exploration-discovery`, `new-account-first-pass`. Nothing written in this step; no rule of the task, a decision or the human is left without one.

## Environment facts

None written. I considered the balance measurement of the first pass (289 and 290 of 300): it comes from an instrument outside the repository, which D-362 forbids naming, and the figure now stands as a decision of the human (D-404), not as a fact the decision rests on, so no fact is written for it.

## Glossary terms

None written. „Understanding” was changed in the change; no word of the change is used against its entry or needs a new one.

## Part-map changes

None. `simulation` claims `tests/sim/**` (the new test) and `src/browser/sim/**`; `browser-view` claims `tests/view/**` and `src/browser/view/**`; the removed `offeredActionKinds` is named by no entry; `product-foundation` claims `foundations/**`. `foundation_check.py` reports no file claimed by none.

## Projected entries written whole or in part

All written in the change: D-118, D-121, D-123, D-124, D-128, D-195 and the glossary entry „Understanding”, whole in the wording of the approved definition, apart from the fields the definition leaves as `TODO` (kept as the foundation held them, with the two examples of D-121 and D-124 corrected, and the invariant names added to D-121's *Verification*, as the first report says). Nothing more in this step.

## Rows of *Settlements to record* written

- Row 1 — `first-exploration-discovery` (invariant).
- Row 2 — D-403 (decision).
- Row 3 — `new-account-first-pass` (invariant), whose threshold now rests on D-404, the human's decision of 2026-11-14 (marked `the cycle's` in the fix report).

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` — my own check, not the gate: exit 0, "0 errors".
- `git status --short` empty; `git log -1` is `d925d5ca`.
- Searches (read only), on `foundations/*.md`, `guidelines/*.md`, `README.md`, `.claude/skills/*/SKILL.md`: for the first chill's reveals, „Eksploruj” brought by the chill, "no action", "knows no action", "disabled until the first chill", „Zawsze” alone, `offeredActionKinds`, every „Eksploruj” in the log not inside „Zawsze → Eksploruj”. Every hit is either already corrected or still true (D-125's „+ reguła” example in D-91, the pick example of D-126, the card of a map in D-… "offers no action or condition not discovered", the *Rejected* of D-124 and D-121, which say why the old way was refused).
- Not run: any test (no code changed), the full gate, mutation analysis, a browser.

## Unread material

- `.the-way/elements/glossary/…`, `.the-way/elements/environment-facts/…` and the `SKILL.md` files of `the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map`: not read, because no entry of those elements was written.
- `guidelines/styleguide-browser-view.md`: read by search only, as before (no sentence about the first chill or a disabled „+ reguła”).
- `reports/review-whole-report.md` and `reports/review-fix-report.md`: not read; the handoff gave the findings.

## Searches not found or unclear

- No sentence in the decisions, invariants, glossary, part map or guidelines remained that says „Eksploruj” comes with the first chill, that a new game knows no action, or that „+ reguła” is disabled at the start, outside the *Rejected* and *Rationale* passages that quote the old way as refused.
- The one search of the whole foundation named in the handoff was made as a set of `grep` searches by the words above; a sentence that says the same without those words would not be found.

## Commits

None. Nothing differed from the code, so nothing was changed.
