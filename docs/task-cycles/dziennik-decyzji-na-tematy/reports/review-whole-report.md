PASS 3b5af51b2c3164b2f1e32feb9f3ac208f421261b

# Review of the whole change — dziennik-decyzji-na-tematy

- Range: `bea0abc1826ae794664fc6ef09043bae9d062957..3b5af51b2c3164b2f1e32feb9f3ac208f421261b`, one commit (`3b5af51b`), one file, `foundations/decisions.md`. `git rev-parse HEAD` in the worktree gives the head; `origin/main` still equals the base (fetched at review time), so no change to the log landed on `main` during the cycle.
- Route: one author, no spec, no plan, no slices. The pin of the-way is `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink, so point 1 of *To do* drops, as the task says.
- Counts: blocking 0, Minor 2 (both within the task), out of scope 0.

## Findings

### Critical

none

### Important

none

### Minor

1. **`foundations/decisions.md`, section "The gate, test tools and the local start", entry D-412 (within the task).** D-412 ("What looks for secrets in loop2's repository?") stands in section 4. The author lists it as doubtful between sections 4 and 5. Section 2, "Code rules, exemplars and static checks", is a closer fit than either, and the doubtful list should name it. Its sentence covers "the linters and the checks that keep the code and its references in bounds". Secret scanning is a check of that kind: it keeps secrets out of what the repository holds. Section 2 already holds the nearest relatives, D-33 (the dependency audit, a security check of the repository) and D-362 (no private paths in tracked files). Section 4's sentence covers "how the full gate runs its stages, Docker and the test tools, and what the local start gives an agent". D-412's first sentence is about something outside the gate, GitHub's own scanning. Only its second sentence touches the gate, and it says that the gate adds nothing. Section 5's sentence ("where the game runs, how a change reaches the server…") does not cover the repository's contents at all, even though D-13, which D-412 derives from, stands there. Effect: an agent working on a check of the repository picks section 2 and sees D-412 only by its heading, which shows because its *Scope* names `build-tools` and `agent-workflow`. The loss is small, so this is Minor. Recommendation: either move D-412 to section 2, or keep it in 4 and have the request's list of doubtful assignments give 2 as the alternative, not 5. Evidence: the section sentences from `decision_index.py --sections`, D-412 read whole, D-33 and D-362 in the index of section 2 (`reports/review-whole-index.md`).

2. **The author's report, "Own-work check and weakest point", second point, and through it the request description (within the task, point 3 of *To do*).** The report says that "the entries in the old log all had a single blank line between them". That is false. In the base log, four entries end with two blank lines instead of one: D-10, D-13, D-15 and D-227 (base lines 331, 391, 430, 5325). The change reduces each to one blank line. No entry's content changes. `compare_log_entries.py` defines an entry without its trailing blank lines and reports all 408 identical, and no non-blank line is lost or added beyond the 28 headings and sentences. The size change agrees: +108 lines = 28 × 4 lines of section headings and sentences − 4 removed blank lines. Point 3 of the task says that only the order of entries changes and the section headings with their sentences are added. A request description that repeats this without the four removed blank lines claims a little more than the commit does. Effect: none on the log. Only the request's statement is at stake. Recommendation: the request either notes "four extra blank lines after D-10, D-13, D-15 and D-227 removed", or the orchestrator accepts this as outside entry content and says so. Evidence: `reports/review-whole-verify-out.txt`, lines "entries differing exactly (incl. trailing blank lines): 4 ['D-10', 'D-13', 'D-15', 'D-227']", "entries differing after stripping trailing newlines: 0" and "runs of 2+ blank lines … in before: {3: 4}".

## Against the task

- **To do 2, met.** The log has 28 `## ` sections, in the order of the question 2 table. My script compared each heading and each sentence with the table character for character and found them all equal. Each section has the form heading, blank line, one sentence, blank line. 408 entries, 408 distinct, each in exactly one section, none outside a section. No number changed. `## Withdrawn identifiers` is the last block, byte for byte equal to the base.
- **To do 3, met for the log.** `compare_log_entries.py` on the base log and the head log: exit 0, "all the same byte for byte". Within each section the entries keep their old relative order. No non-blank line was lost or added outside the section headings and sentences. The removal of four extra blank lines (Minor 2) is the one difference outside entries and headings. Putting the script's result into the request description belongs to the orchestrator.
- **To do 4.** The orchestrator's, written later. Not judged.
- **Acceptance criterion 1.** At review time `origin/main` equals the base, so the comparison above is the comparison with `main`. The rerun at merge time belongs to the orchestrator.
- **Acceptance criterion 2, met.** `decision_index.py --sections` on the head lists 28 sections, each with its sentence and its count.
- **Question 2 table, met.** The counts match the table, except that section 4 has 17 against 14, section 7 has 18 against 17 and section 11 has 14 against 13. That is exactly the five entries written after the projection (D-412, D-413, D-414 in section 4; D-410 in 7; D-411 in 11). Every other entry stands where the task's projection put it.
- **Out of scope, kept.** No content, number or *Scope* of any entry changed.
- **Settlements to record:** `none`. No entry written, none required.

### Placements the handoff asked about

- **D-410** in 7: right. "Who may use an account, how requests are authorized" covers the role that the server reads at each request.
- **D-411** in 11: defensible. "Which screens the game has" covers the screen `#/konta`. Its relatives D-280 and D-281 stand there. Section 7 is the alternative, and the author names it.
- **D-412** in 4: see Minor 1. Section 2 is the better alternative.
- **D-413** in 4: right. CI runs the one command, the full gate whose stages section 4 holds (D-405, D-406).
- **D-414** in 4: no section's sentence covers a session-start hook. The task fixes the 28 sections, so a new section is out of reach. Section 4 is as near as section 2, and I do not hold it wrong.
- **D-307** in 21, **D-409** in 22, **D-362** in 2, **D-347** in 5, **D-190** in 14, **D-214** in 13: each matches its section's sentence ("the trip plan"; "how time away is caught up"; "the checks that keep … its references in bounds"; "how its logs and failures reach … the agent"; "its death"; "how a map is solved"). I hold none of them wrong.
- **D-215** in 13: defensible. Its binding sentence is purely about where a line stands on the screen of a map run, which section 26's sentence covers ("the layout of the screen of a map run, its rows"). But the projection puts entries by their topic before their screen: D-307, a line on Programy, is placed with the trip plan. By that rule D-215 goes with D-214. A test holds its position on the screen. The author already names 26 as its alternative, and I agree it belongs on the doubtful list.

**The handoff's question on the sentences of sections 4, 7 and 11:** none of the five entries D-410 to D-414 stands in a section whose sentence plainly contradicts it. The sentence of section 7 covers D-410 ("who may use an account, how requests are authorized"), and the sentence of section 11 covers D-411 ("which screens the game has"). The sentence of section 4 covers D-413 (the full gate, run by CI). It covers D-412 only through its second sentence and does not cover D-414 at all, but it says nothing contrary to either. Widening the sentence of section 4 is the human's decision, outside this task.

## Against the foundation

- **WAY-18**, read whole: entries keep their numbers, each section has a heading and one sentence, and the list of withdrawn numbers stands after the last section and is no section. Its *violates* case "the division of a log renumbers its entries" does not occur.
- **WAY-150**, read whole: the log now gives `decision_index.py --sections` its list, which is what the selection by topic needs.
- `elements/decisions/template.md` ("Where entries go", "Withdrawn numbers"), read whole: the form matches.
- The 17 invariants of `Part: every`, read whole. The only ones the change can reach are `tracked-file-private-paths` and `tracked-file-private-names`: the 28 sentences hold no path and name no note. The foundation check passes. No invariant test changed.
- Nothing tracked points to the log by line number (searched `decisions\.md(:\d|#L|\s+line)`, no hit). The references in tests and README go by decision number only, so moving entries breaks none.
- No reserved choice. No trust boundary or operation that cannot be undone, which agrees with the dispatch's answers.

## Structure of the code

- `python -B .the-way/task-cycle/change_file_sizes.py bea0abc1… 3b5af51b`: exit 0. `foundations/decisions.md` goes from 10983 to 11091 lines, +108.
- `guidelines/coding.md` holds no rule `### Size of a function and a file`, so no size test exists. The file is a Markdown log, not code. No finding of structure.

## Declined to judge

- The placement of the 391 entries other than the twelve the handoff names. The task's projection placed them and the change keeps them. I checked that the change equals the projection, not each placement against its section's sentence.
- Whether the sentences of sections 4, 7 and 11 should be widened. They are the human's accepted text, and the task puts a change of them out of scope.

## Checks run

- `git rev-parse HEAD`: `3b5af51b2c3164b2f1e32feb9f3ac208f421261b`, the given head. `git -C .the-way rev-parse HEAD` equals `git ls-files --stage -- .the-way` (`bfb2e109…`).
- `git log` / `git diff --stat bea0abc1..3b5af51b`: one commit, one file. Exit 0.
- `git fetch origin main`, then `git rev-parse origin/main`: equals the base.
- `python -B .the-way/elements/common/compare_log_entries.py <base log> foundations/decisions.md`: exit 0, "Compared 408 entries … all the same byte for byte."
- `python -B .the-way/elements/common/decision_index.py --sections --output …`: exit 0, "Sections: 28."
- `python -I review-whole-verify.py before.md after.md task.md out.txt`: exit 0. This is my own script. It compares headings and sentences with the task table, checks the section form, compares the assignment with the projection, checks relative order, compares the withdrawn block and the entries exactly and without trailing blank lines, and counts non-blank lines lost or added. It is kept at `reports/review-whole-verify.py`, with its output at `reports/review-whole-verify-out.txt`. A first run showed a false "form" mismatch in every section, because the script's expected string was wrong. I corrected the script and the kept output is from the second run.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- `python -B .the-way/task-cycle/change_file_sizes.py bea0abc1… 3b5af51b`: exit 0.
- `python -B .the-way/elements/common/decision_index.py --output … --section "Code rules, exemplars and static checks" --section "The gate, test tools and the local start" --part product-foundation --part agent-workflow --decision` for each of the twelve named entries: exit 0. The index is kept at `reports/review-whole-index.md`.
- Not run: `npm test`, the cycle's gate, which belongs to the orchestrator as the handoff says. `check_instructions.py`: no instruction file changed.

## Reaches beyond the dispatch

- WAY-18 and WAY-150 in `.the-way/foundations/decisions.md`, read whole: the task's *Decisions in play* names them.
- `src/browser/AGENTS.md` and the tracked files outside `.the-way/`: searched for `decisions.md` and line anchors, to check that moving entries breaks no reference.
- The-way's glossary (`.the-way/foundations/glossary.md`): searched headings for "section" and "log", with no hit.
- the file `scripts.md` of the author's own agent rules, outside the repository: read before writing the script, as the user's instructions require.

## Working copies

- `.runs/review-whole/` under the worktree held the base and head logs, the verification script and its output, the index, and extracts of the twelve entries, of WAY-18 and WAY-150, and of the 17 invariants of `every`. It is removed.
- Kept in `reports/`: `review-whole-verify.py`, `review-whole-verify-out.txt` and `review-whole-index.md`.
- No remainder.

## Unread material

Decisions of my index read whole: 12 of 78 (45 listed in full, 33 by heading). They are D-190, D-214, D-215, D-307, D-347, D-362, D-409, D-410, D-411, D-412, D-413 and D-414. Besides them, WAY-18 and WAY-150 of the-way were read whole. I ran through the 33 headings of decisions outside the chosen sections; none points to a bearing on a change that moves entries without altering them. No decision that bears on the change stayed unread. Guidelines: none selected. The change touches only `product-foundation`, no file of the guidelines names it in *Applies to*, and the change writes no user interface, code or test.

## Searches not found or unclear

- `### Size of a function and a file` in `guidelines/coding.md`: not found. The product has no size rule.
- Glossary entries of the-way for "topical section" or "decision log": not found. None needed.
