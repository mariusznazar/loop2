# Findings to fix — review of the return step, cycle `ognisko-i-jedzenie`

Review: `.runs/task-cycles/ognisko-i-jedzenie/reports/25-return-review-report.md`, first line `FAIL 105e4b9a27ba495bbc1de5da6bf33fb130659aee`. Its one blocking finding, in the reviewer's words (lines 19–49 of the report):

### I-1 — glossary `extinguished campfire` is built from an MVP choice but does not open with "In the MVP"

- Place: `foundations/glossary.md`, entry `extinguished campfire` (new, 589ee33):
  "An extinguished campfire is a campfire standing on its tile with no minutes of burning left,
  whether it has burnt out or has not been lit yet."
- What is wrong: the entry records a choice made for the MVP, but it is worded as a permanent
  meaning of the word. The return step's report says it writes the cycle's choice "a never-lit
  campfire and a burnt-out one share one state, shown „ognisko — wygasłe”" as this term. That choice
  comes from the MVP choices: *To do* 15 (Q11, part 2, way A) gives a campfire's row only the
  two forms „ognisko — płonie, zostało 42 min” and „ognisko — wygasłe”, so a crafted campfire that
  has never been lit (*To do* 7, „niepłonące ognisko”) reads „wygasłe”. The human's rule for the
  round (task, *Context*) says: „Kandydat zbudowany z wyboru na MVP mówi, co gra robi teraz, zaczyna
  się od „W MVP” …”. Its purpose is the human's reservation under Q9: „to są elementy na potrzeby
  mvp / docelowo się zmienią, więc chciałbym uniknąć sytuacji w której decyzje będą kategorycznie
  zabraniać alternatyw”. The glossary entry this cycle built from row 7 already follows that rule
  (`map run restart`: "In the MVP, a map run restart is …"), and D-61 and D-63, which use the
  word, open with "In the MVP" as well. This entry does not.
- Why it matters: task 9 (Płomyk) remakes lighting, and later tasks may want an unlit campfire
  as a state of its own. Without the marker, the glossary tells them that a never-lit campfire *is*
  an extinguished one, as a standing meaning of the word, so a separate "unlit" state would read
  as a use against the entry instead of as the next choice. The human asked for exactly this to be
  avoided.
- Evidence: the entry's text at the head; `foundations/glossary.md`, entry `map run restart`; task
  *Context*, the paragraph "Brzmienie kandydatów…"; *To do* 7 and 15; return-step report, *Judged,
  nothing written*, "Never-lit and burnt-out campfire sharing one state — written as the glossary
  term above". Code: `src/browser/sim/types.ts:86` ("0 means extinguished, standing on its tile
  unlit"), `src/browser/view/tile-list.ts:49`.
- Recommended fix: through `the-way-record-glossary-term`, "In the MVP, an extinguished campfire is
  a campfire standing on its tile with no minutes of burning left, whether it has burnt out or has
  not been lit yet." The meaning stays the same. The definition holds no excluding word.

