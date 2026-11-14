# Correction 1 report — the human's remark 3

Status: **done**. Head `76fb7bcb`; one commit: `d7cddb27` (two single-line edits in `foundations/decisions.md`). Nothing uncommitted outside `.runs/`.

## The remarks as made

- Remark 1 (make a task of the editor default): not mine; nothing changed for it.
- Remark 2 (a fresh reviewer): not mine.
- **Remark 3 (mine):** run the project skill's checks over the entries this cycle wrote and the three hand edits; redo through the skill only what is flagged; no full rewrite. Done as below.
- Remarks 4-6: accepted, no work.

## The skill: invoked with the Skill tool, what it returned

I invoked `the-way-record-decision` with the Skill tool, with the arguments naming this correction. It returned its own text (base directory `.claude/skills/the-way-record-decision`, i.e. the main checkout's copy of the skill, a pointer that tells to work with the product's pinned `.the-way`): follow `.the-way/elements/decisions/skill/SKILL.md` and the files it names. I worked in this worktree's `.the-way`: `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both show `55afa8e57aa1b83c77108576a36642722e0dda15` (exit 0), as the skill requires. The skill gives no command of its own to run checks; its checks are the rules of its element: the decisions `template.md` (the fields, "Binding sentences", "Decision or invariant", "Changing a decision", "Relations and precedence", "Verification", the rules on *Rationale*/*Rejected* and on a decision written from a row), `elements/common/rules.md` (every field, `none`/`TODO`, references), `way_of_working.md` steps 2 (search of the foundation) and 4.4 (what follows from the entry), `decide_entry.md` (the one question), and `foundation_check.py`. I applied them by reading each entry against them, as the sources I had read whole in this session (the template, `rules.md`, `way_of_working.md`, `read.md`, `decide_entry.md`), and I ran the script. I did not add checks of my own taste.

The three hand edits' range: `git log --oneline 6ab6a32b..7d61f0f3 -- foundations/decisions.md` lists, of this cycle, `8e5af859` (D-393, D-394, D-395 new, D-06), `8c5d3d7b` (hand edit: *Rationale* of D-394 and *Rejected* of D-395), `e8ea984a` and `9e7f586e` (hand edit: D-264).

## Remark 3, entry by entry

`python -B .the-way/elements/common/foundation_check.py`: exit **0**, `0 errors`, before the edits and after (the script was run over all entries; it checks fields, references, scope, relations, verification identifiers).

### D-393 (new) — one thing flagged, redone

Checked: the question (a choice someone could answer otherwise; D-04 and D-06 answer it in passing? D-04 forbids a function that reads the page and names no check, D-06 names the build: no sentence moves) — ok. Binding sentences: 2 sentences, present tense, no normative capitals, no stage name, concrete — ok. Fields: *Scope* `simulation, build-tools` (parts, no paths), *Based on* `none`, *Relations* derives from D-04, *Verification* names `simulation-isolation · simulation-type-check`, and both invariants name D-393 in *Derives from* (`invariants.md`: `D-04 · D-393`, `D-393`) — ok; *Origin* `none` — ok. *Rejected*: the ways the row's source keeps (the cut of the test's scan, the move to its own directory), each with cost or reason — ok. *Rationale* rule "names no file, script or count … never a general bound; a measurement may stand with what was measured": the clause "within seconds of a change" is a bound that the entry does not give a measurement for — **flagged**. Redone: "…at the type check, ahead of the slower tests of the gate among which the test of isolation stands." Meaning of row 1 unchanged.

### D-394 (new, *Rationale* hand-edited in `8c5d3d7b`) — nothing flagged

Checked: question; 2 sentences, the second concrete (the removal), no stage; fields; *Verification* pair (the violating example is code that goes against the entry while the entry stays: a removal of `actionFeasible` for lacking a caller); *Rationale* now limited to `actionFeasible` (the earlier general clause is gone) and names no file, script or count; *Rejected* is the answer's "Not chosen" of question 1 with its cost, without the count of test files the source holds (a count of the foundation's files is kept out of authored prose). Nothing flagged; unchanged.

### D-395 (new, *Rejected* hand-edited in `8c5d3d7b`) — one thing flagged, redone

Checked: the question; 1 sentence; *Relations* derives from D-265; *Verification* pair; *Rationale* clean. *Rejected*: the text said "…as `rule="trip"` did — the source keeps no cost or reason beside it, so none is known." The template says an entry "holds only its current wording … describe the decision as it then stands, never the change" (WAY-07) and that *Rationale* and *Rejected* do not tell how the decision was reached (WAY-29): "as `rule="trip"` did" names the earlier state of the code, and "the source keeps no cost" speaks of a source — **flagged**. Redone: "the control picking the rule of a screen by a value of one of its parameters — no cost or reason of it is known." The way the row's source keeps stays (the human-review finding M4 asked for it), without history and without the source.

### D-06 (changed in place in `8e5af859`) — nothing flagged

Checked: binding sentences (2, present tense, now naming the third configuration that emits nothing); *Rationale* addition names `D-393` by number (a reference by identifier alone, allowed) and no file or count; "Changing a decision" (the entry holds only the current wording); step 4.4: the decisions that derive from D-06 (D-29, D-263, D-266) concern the linter, the bundling tool and the output directory of the browser's compilation, none says "both configurations"; the invariants naming D-06 (`application-package-layout`, `application-build-layout`, `application-build-output`) are still true as written (a third configuration that only checks leaves them true); `grep -n "both configurations\|two configurations" foundations/*.md` finds nothing. *Verification* names invariants deriving from D-06; `simulation-type-check` derives from D-393, not D-06, and the template requires no more. Nothing flagged.

### D-264 (changed in place; first wording by hand in `e8ea984a`, corrected in `9e7f586e`) — nothing flagged

Checked: 3 binding sentences (the limit is three), present tense, `press` clicks inside `act` and `fire` sends the event, as the code does (checked in the previous fix); *Verification* pair true of the code ("a copy of the harness's `press` or `fire`"); *Rationale* addition names no file or count; step 4.4: D-268 (derives from D-264) and the invariant `document-test-memory-limit` say nothing of `press`/`fire`, their sentences hold; no passing answer elsewhere moves.
The two Minor findings that earlier rounds left: (a) "a new rule in D-264 that might be its own question": the template's check is `decide_entry.md`, "name the one question the binding sentences answer; when they answer two independent questions, propose two entries, or keep the question the rest serves", with "a new rule next to an existing decision is a new question (WAY-19)". The third sentence says what a test file takes from the harness D-264 introduces, and D-264's own *Verification* already forbids "a second harness for the next screen": a copy of the click helper in a test file is that second harness at the size of a helper. The question "what does a test of a screen built with React run on?" is answered by the harness and what it carries; D-268 sets the same kind of sentence (what a test file takes from it: `assert`) inside its own entry. I read the sentence as part of the one question: **not flagged**; if the human reads it as a second question, the way is a new number with the third sentence moved to it, one entry, and I did not take it since the check does not force it. (b) "one long *Rationale* line of D-264": the template names no limit on a line; **not flagged**.

## What changed

`git diff` (commit `d7cddb27`): two lines of `foundations/decisions.md`: the first sentence of the *Rationale* of D-393 and the *Rejected* of D-395. The edits were typed with a script into the file, as every entry is typed; the skill has no tool that writes, and I say so rather than call it "by the skill's own hand". No code, no test and no guideline changed.

## Checks (command, exit code)

| Command | Exit |
|---|---|
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0, same commit `55afa8e5…` |
| `python -B .the-way/elements/common/foundation_check.py` before and after the edits | 0, `0 errors` |
| `git log --oneline 6ab6a32b..7d61f0f3 -- foundations/decisions.md` | 0 |
| `grep -n "both configurations\|two configurations" foundations/*.md` | 1 (no match) |

Not run: any test (no code or test changed), the whole gate.

## Own-work check

- Requirement most likely not met: "redo only what is flagged, keep the meaning of rows 1-4 and D-06". Check: the diff has two lines; each keeps the entry's binding sentences, fields and its row's meaning (D-393's *Rationale* still says the compiler is quick-and-early against a late test; D-395 *Rejected* still holds the parameter way). It showed no change to binding sentences, *Verification*, *Relations*.
- A check I may have read too leniently: the "one question" check on D-264 (above); I give my reading and the alternative so the human can decide.

## Unread material

- `.the-way/elements/decisions/examples.md` (the entries it lists were not read); D-07 and D-04 whole were read earlier in the cycle, not again here; `invariants.md` read only at the three entries named. The skill's files of the-way were read earlier in this session (this worktree's `.the-way`), not re-read in full after the invocation, since the returned text is the same pointer.

## Searches not found or unclear

- The skill names no executable checker beyond `foundation_check.py`; its "checks" are the rules of the template and `rules.md`, which I applied by reading. No further tool found.
- Whether "within seconds" counts as a "general bound" is a reading; I flagged it because the template's wording names bounds explicitly. Whether D-264's third sentence is its own question is a reading as well (above).
