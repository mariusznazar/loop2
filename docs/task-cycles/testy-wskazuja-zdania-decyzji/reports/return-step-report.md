# Return step — testy-wskazuja-zdania-decyzji

- **Status:** done
- **Commits:** none. The comparison found nothing in the foundation or the guidelines that no longer matches the code the change leaves, so there was nothing to correct and the branch stays at `69b7faccfab72acb49f4ae7f5be8ce76fe082e18`.
- **Files changed:** none tracked.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (head `69b7facc`) | 0 | one line `0 errors`; no decision listed as held by nothing (output kept: `reports/return-step-foundation-check.txt`) |
| `python -B -I <my dir>/consistency.py <out>` (my script, kept as `reports/return-step-consistency.py`) | 0 | 403 entries, each with *Verification*. 0 decisions have a `tests:` clause and no line `decision:` in the tracked tree. 0 lines name a decision the log lacks. 0 decisions have no test, no invariant and no pair. It flagged 3 decisions with lines but no clause (D-26, D-27, D-271) and 1 pair beside an invariant whose intro does not say "part" (D-31). I read those four fields. All three "no clause" flags are false positives: in each, the clause `tests:` ends a line and my regex wanted a space after it. D-31 is the field the change left as it was, noted below. Output: `reports/return-step-consistency-out.txt`. |
| `python -B -I <my dir>/inv_names.py <out>` (my script, kept as `reports/return-step-inv_names.py`) | 0 | For each decision, it compares the invariants that derive from it (by *Derives from* in `foundations/invariants.md`) with the ones its `invariants:` clause names. It found 6 mismatches: D-04, D-108, D-179 and D-190 each miss one derived invariant, and D-113 and D-377 name invariants that do not derive from them. D-103 is no longer among them. Output: `reports/return-step-inv_names-out.txt`. |
| `git diff 394ca859..HEAD -- tests`, filtered for lines other than `// decision: D-NN "…"` and `# decision: D-NN "…"` | 0 | One line: the removed D-408 line (`bf65200c`). 3811 lines added and 3830 lines `decision: D-` in `tests/` (20 at the base). |
| `git diff -U0 394ca859..HEAD -- foundations/decisions.md`, filtered | 0 | Every changed line is a line of a *Verification* field or a line continuing one. |

Not run: `npm test` (the full gate). The handoff and the method leave it to the orchestrator.

## What I compared and found (the record's *Return step*)

- **Foundation compared with code.**
  - *Entries the change writes:* the *Verification* fields of 370 decisions. By my script, every `tests:` clause has lines `decision:` in the tree, and every decision with lines has a clause. No decision is left with no invariant, no test and no pair. Every line names a decision the log holds. The foundation check finds every quotation in its binding sentences (0 errors). I did not re-judge the 370 fields case by case. The review of the whole change sampled 81 decisions against the cases (`reports/review-whole-report.md`, "What I sampled"), and I relied on it for the content of each clause.
  - *Entries the task names:* D-73 and D-82, read whole except D-82's *Rationale*, which I read in full on screen.
    - D-73: its pair is new in this change. `guidelines/testing.md` holds the template's rules with the ten departures it names, and `AGENTS.md` sends an agent to it before a test is written or changed. The pin did not move in this change, so its clause on bringing `testing.md` to the template when the pin moves does not apply. The pinned testing-guideline template (`.the-way/product-guidelines/testing/template.md`) has no rule on lines `decision:`, so `testing.md` needs no new rule. The decisions template carries that rule (`.the-way/elements/decisions/template.md:225-233`).
    - D-82: a line `decision:` is a test comment that names an entry of the foundation and no document outside it. So it agrees with D-82 and with `guidelines/testing.md:95-104` ("Where the expected value comes from"). The pair of D-82 is unchanged and still true of the code.
  - *Entries a search of the foundation finds:* I searched `foundations/glossary.md`, `foundations/environment_facts.md`, `foundations/invariants.md`, `foundations/part_map.md`, every file under `guidelines/`, `AGENTS.md` and `src/browser/AGENTS.md`. The search words were `decision:`, `invariant:`, `foundation_check` / "foundation check" / "kontroli fundamentu", "pair of examples", `complies`, "clause tests", "comment" / "komentarz", "decision number" / "numer decyzji" and "cites". I also searched `foundations/decisions.md` for "comment", "foundation check", "decision number" and "cites". What each hit says:
    - The withdrawn invariants `guidelines-form` and `guidelines-reference-current` (`foundations/invariants.md:1392-1393`) name what the foundation check reports. That is still true.
    - D-77 and the decision at `foundations/decisions.md:10791` name the foundation check as a stage of the gate. The comment lines change neither.
    - D-29, D-30 and D-32 speak of suppression and `prettier-ignore` comments, which the change does not add.
    - In `guidelines/styleguide-browser-view.md`, `Source:` comments are about values in the style sheets, not tests.
    - `guidelines/coding-saved-game.md:112` is about a comment over a document in a test. It does not touch these lines.
    - None of these misstates the code the change leaves.
  - *Part map of the touched parts:* read whole. These are browser-view, simulation, account-server, build-tools, deployment and agent-workflow, through their test files, and product-foundation, through the log.
    - No part's description says what its test files hold or how a test marks a decision.
    - By the part-map template (`.the-way/elements/part-map/template.md:87-97`), *Depends on* concerns imports. Comment lines import nothing, so no *Depends on* changes. The lines `invariant:` that stood before the change show the same pattern.
    - No file was added or moved, so *Files* is unchanged. The foundation check reports no unclaimed file.
  - *Guidelines:* `guidelines/testing.md` and `guidelines/coding.md`, read whole.
    - Neither holds a rule on the form or the length of a test comment.
    - Neither has a rule on how a test cites a foundation entry, other than D-82's rule, which the lines satisfy.
    - Neither has a rule the comment-only change contradicts.
- **Decisions, invariants, environment facts, glossary terms, part-map changes written or changed:** none.
  - The change rests on no source outside the product beyond the pinned the-way, so it needs no environment fact.
  - It uses no word in a meaning for which WAY-95 gives an entry. I checked the added *Verification* text against the 45 glossary terms, with particular attention to "loop": "the old loop game" uses the term as defined. "The loop of the bend" (D-364) repeats the ordinary "in a loop" that D-364's binding sentence held at the base, so the change adds no new use of the word.
- **Projected entries:** none. The task carries none.
- **Rows of *Settlements to record* written:** none. The task's section reads `none`.
- **Choices that bind after the merge:** none found beyond what the request already names. That is the D-103 `invariants:` departure, accepted by the orchestrator, plus the unmoved pin.

### Findings of the kind the executors and the reviewer listed

- Names missing from or extra in an `invariants:` clause: my independent check finds exactly the set the reviewer listed (D-04, D-108, D-179, D-190 missing one each; D-113, D-377 naming non-derived ones). I found nothing new. These are findings for the request, outside this task.
- Log wording (R3): I found nothing the executors and the reviewer did not list.
- D-31's pair still opens "An agent compares a change with the decision:" beside its `invariants:`. The template allows that form (`.the-way/elements/decisions/template.md:257`), and the pair speaks only of the part the invariant does not hold. Executor 1 and the reviewer both judged it unchanged on purpose (`reports/executor-1-report.md:62`, `reports/review-whole-report.md:52`). I did not count it as a new finding.

## Own-work check

- **The requirement my step most likely misses:** a `tests:` clause naming tests for which no line `decision:` exists, or a decision left with no test, no invariant and no pair. A mismatch like that would only show when someone compared the log with the tree.
- **The check:** `reports/return-step-consistency.py` over all 403 entries and every tracked non-Markdown file.
- **What it showed:** 0 such cases, after reading the four flags by hand (3 false positives of my regex and D-31 as above).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md:218-279` (*Verification*): to judge the form of D-31 and what a line `decision:` needs.
- `.the-way/elements/part-map/template.md:86-115` (*Allowed dependencies*): to judge whether comment lines touch *Depends on*.
- `.the-way/elements/glossary/template.md:40-64` (*Which words take an entry*): to judge the glossary item.
- `.the-way/product-guidelines/testing/` searched for `decision:` and for comment rules: to check whether `testing.md` owes the template a rule.
- `foundations/decisions.md:9955-9968` (D-364): the "loop" use.
- `reports/review-whole-report.md` (whole) and `reports/executor-1-report.md` (lines 27, 62, 127, 141): what was already found.

## Working copies

- `.runs/return-step/` held my two scripts, their outputs and the foundation check's output. The output of the first foundation-check run first went to `.runs/return-step-fc.txt` in the same worktree. I moved it into that directory at once.
- I copied what the report needs to `reports/` (`return-step-consistency.py`, `return-step-consistency-out.txt`, `return-step-inv_names.py`, `return-step-inv_names-out.txt`, `return-step-foundation-check.txt`).
- I removed the directory before returning (`test -e` then gave 1). I made no worktree or clone.

## Unread material

- `foundations/decisions.md`: of the 370 changed fields, I read in full only those of D-26, D-27, D-31, D-73, D-82, D-271 and D-364. I checked the rest by script and through the reviewer's sample, as stated above. Other entries I read only through search hits.
- `foundations/invariants.md`, `foundations/environment_facts.md`: read only through search hits and by script. I read the entry `password-operation-gate` (lines 658-666).
- `foundations/glossary.md`, `foundations/part_map.md`, `guidelines/testing.md`, `guidelines/coding.md`: read whole.
- `guidelines/styleguide-browser-view.md` and the `guidelines/coding-*.md` kind files: read only through the search for comment rules. No product code or styling changed.
- The plan: lines 1-80 only. The executors' reports: only `executor-1-report.md` through search hits. `reports/review-fix-report.md` and `reports/slice_ranges.md`: not read.

## Searches not found or unclear

- A rule in `guidelines/` on the form, length or placement of a test comment, or on how a test cites a foundation entry beyond D-82: not found.
- A rule on lines `decision:` in the pinned testing-guideline template (`.the-way/product-guidelines/testing/`): not found. The rule lives in the decisions template.
- An environment fact, glossary term or invariant about lines `decision:`, the clause `tests:` or the pair of examples: not found.
- Unclear, and settled for this step: is a line `decision:` the kind of comment D-82 forbids, one that "carries nothing the code needs"? I judged it is not, because it names an entry of the foundation that the foundation check reads. The reviewer reached the same view (`reports/review-whole-report.md:62`).
