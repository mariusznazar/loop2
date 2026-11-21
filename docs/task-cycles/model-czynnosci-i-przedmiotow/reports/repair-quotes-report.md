done with concerns

# Repair of twelve `decision:` quotations (make-change, repair in slices 10 and 12)

Commit: `f8ad4bd332e2cc39956d4e9ac5914a6b64648011` on `task/model-czynnosci-i-przedmiotow`, base `16a720e2`.
Files changed (comment lines only, 12 lines each side): `tests/sim/action-targets.test.mjs` (+1 -1), `tests/sim/craft-and-tend.test.mjs` (+10 -10), `tests/sim/previous-programs.test.mjs` (+1 -1). No test body, expectation, product code or foundation entry changed.

Method: each new quotation was cut by a script from `foundations/decisions.md` (whitespace collapsed to single spaces as the check does), from the start of a sentence to a chosen end, so no word is typed from memory. Line numbers below are of `foundations/decisions.md`.

## The twelve lines

| # | Line | Old | New | Sentence it comes from |
|---|---|---|---|---|
| 1 | `tests/sim/action-targets.test.mjs:381` | D-310 "the reason of a rule outside the repertoire is „gałąź niewykupiona”, … „jeszcze nieodkryte: {name}”." | D-310 "The reason names the thing refused as the game writes it, … and the reason of a rule outside the repertoire is „gałąź niewykupiona”, as of a greyed cell of the rule panel, or „jeszcze nieodkryte: {name}”." (the same words, from the start of the sentence) | second sentence of the binding paragraph, lines 9930-9933 |
| 2 | `tests/sim/craft-and-tend.test.mjs:161` | D-71 "the ending action takes effect" | **D-374** "An action shortened by bought branches lasts at least one game minute." | line 7293. The case tests the floor of one game minute for both verbs under a duration branch; no sentence of D-71 is about that, D-374 is. Decision changed, see Choices. |
| 3 | `:215` | D-71 "the ending action takes effect" | D-71 "Outside combat a game minute takes effect in this order: … tiles renew, the ending action takes effect" (from the start of the sentence to the clause the case holds) | line 5618, first sentence, up to "the ending action takes effect" |
| 4 | `:385` | D-309 "and an ordinary rule whose condition holds is amber with the reason „trwa walka”" | D-309 "In the minutes of an attack, from the minute of the attack to the resolving of its turns, … and an ordinary rule whose condition holds is amber with the reason „trwa walka”." | first sentence, lines 9891-9895 |
| 5 | `:474` | D-380 "„Opatrz — {rzecz}” at full health, „zdrowie pełne”, which stands before „brakuje …” where both hold." | D-380 "„Wytwórz — {rzecz}” and „Opatrz — {rzecz}” short of a thing in the backpack, „brakuje {ile} × {rzecz}”, such as „brakuje 2 × mech” and „brakuje 1 × opatrunek”; „Opatrz — {rzecz}” at full health, „zdrowie pełne”, which stands before „brakuje …” where both hold." | the one sentence of the second paragraph, line 8142 (the clause the case holds is its end) |
| 6 | `:485` | same as 5 | same as 5 | line 8142 |
| 7 | `:520` | D-363 "so it tells the truth about what leaves the backpack and agrees with the reason at the rule" | **D-142** "„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing." | line 6764. See Concerns. |
| 8 | `:582` | D-121 "the first gathered moss brings the bandage and „Wytwórz”, and the first piece of the bandage crafted brings „Opatrz”." | D-121 "The first gathered stick brings „Wytwórz — ognisko”, … the first gathered moss brings the bandage and „Wytwórz”, and the first piece of the bandage crafted brings „Opatrz”." | the sentence that begins at "The first gathered stick" and ends with „Opatrz”, lines 7470-7476 (the clause is in the middle of a long list, so the sentence is quoted from its start) |
| 9 | `:608` | same as 8 | same as 8 | lines 7470-7476 |
| 10 | `:644` | same as 8 | same as 8 | lines 7470-7476 |
| 11 | `:690` | same as 8 | same as 8 | lines 7470-7476 |
| 12 | `tests/sim/previous-programs.test.mjs:574` | D-401 "accepts the program of an item only through the check the program editor uses, skips every other item and goes on" | D-401 "The programs are read by a reader of their own, `src/browser/sim/previous-programs.ts`, apart from the load of D-206 and D-213, which reads from the document only its version, … skips every other item and goes on, and throws for no value a document can hold." | second sentence of the first paragraph, line 4309 |

The full text of each new quotation stands in the commit (`git show f8ad4bd3`).

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 1, one error left, `tests/view/rule-editor.test.mjs:1528` (D-290, Slice 15, not mine); none of the twelve.
- `npx prettier --check` on the three changed test files: exit 0.
- `npx eslint` on the three changed test files: exit 0.
- `npm test -- tests/sim/action-targets.test.mjs`: exit 0, 12 pass.
- `npm test -- tests/sim/craft-and-tend.test.mjs`: exit 0, 26 pass.
- `npm test -- tests/sim/previous-programs.test.mjs`: exit 0, 25 pass.
- Not run: the whole test run (the full gate, the orchestrator's); the check without `--skip-test-citations`.

Own-work check: the requirement most likely missed is "no new quotation drifts from the log". The check reads the quotation against the log and reports none of the twelve; a first run of my script failed on reading too few lines of D-121 (an assertion, before any file was written), and the second passed.

## Choices

- Line 161: changed the decision from D-71 to D-374, because no sentence of D-71 is about the floor of a shortened action's duration. Rejected: keeping D-71 with a start-of-sentence quotation, which would cite a sentence the case does not hold. Cost if wrong: the case cites a decision whose own invariant `action-duration-minimum` also covers it.
- Line 520: changed the decision from D-363 to D-142, see Concerns. Rejected: deleting the line (the case then cites nothing) and quoting D-363's first-paragraph sentence on the price, which the case does not test (it tests what leaves the backpack, not the text of a price).
- Lines 215, 474, 485: where the sentence is long, the quotation runs from its start only as far as the clause the case holds (215) or to its end (474, 485).

## Concerns

- Line 520 (`craft-and-tend.test.mjs`): the case asserts that what a finished „Wytwórz” or „Opatrz” takes equals the price of the action with its target. That equality stands in D-363 only in its *Rationale* ("so it tells the truth about what leaves the backpack and agrees with the reason at the rule"), which is no binding sentence, so the check cannot hold it. D-142's sentence holds the half "take what they use out of the backpack when they end". No binding sentence of the foundation states the equality of the price and what is taken; whether one should is a foundation matter, not mine.
- The check's other error (D-290, `tests/view/rule-editor.test.mjs:1528`) stays for Slice 15.

## Reach beyond the dispatch

- Read `foundations/decisions.md` entries D-374 (7291-7299) and D-443, D-142 (first lines) beyond the seven named decisions, to find the sentence for lines 161 and 520; read the tests' neighbouring lines. Read `.the-way/elements/decisions/template.md` for the rule of the quotation (named in the handoff).

## Unread material

none (the decisions D-310, D-71, D-309, D-380, D-363, D-121, D-401 were read whole in their binding paragraphs, Verification and Rationale where shown; `fix.md` read as far as the report rules; the test cases around each line read; `template.md` read by the lines on `decision:`, not whole).

## Searches not found or unclear

none

## Working copies

The directory `.runs/repair-quotes/` (the script `fix.py`, `changes.txt`, `diff.txt` and three test logs) was made by me and removed before I returned.
