PASS f53f24093c35adc49abcc9860c42b240c1b57266

# Review of the D-448 correction, task `katalog-map`

Range `be5bebc7d85495cba14944f5d69d53a81890dac9..f53f2409`, one commit (`f53f2409`), one file: `foundations/decisions.md` (5 insertions, 5 deletions, all inside the entry D-448). `git rev-parse HEAD` is `f53f24093c35adc49abcc9860c42b240c1b57266`, so the head matches the dispatch. Worktree clean (`git status --short` empty).

Counts: blocking 0, Minor 3, out of scope 2 (the two Minor findings about files outside the range are also the out-of-scope ones; see below).

## Findings

### Blocking

None.

### Minor

1. `foundations/decisions.md:6159` (the *complies* example of D-448) — the measure is stated only once and in the middle of the wataha's side: "measured with the character the mode `progression` builds for Las — głębiej, its best reference program solving a smaller share ... than the best program of Las — głębiej does of theirs". It does not say that Las — głębiej is measured with that same character, which the second paragraph requires ("on both maps") and the *violates* example says outright ("measured with one character on both maps as the second paragraph gives"). A reader can take the sentence as measuring the wataha with the character built for Las — głębiej and Las — głębiej with its own; that is exactly the reading the *Rejected* list closes. Grade: Minor — the entry's binding sentence is right and the *violates* example is explicit, so the pair as a whole still points the right way; the note that proposed this wording let the cycle fit it, and the author marked the examples "the cycle's", for the human to accept at the merge. Evidence: lines 6159 and 6160 read side by side. Suggested wording if changed: "... both measured with the character the mode `progression` builds for Las — głębiej, its best reference program solving ...". In scope (a line of the range), not blocking.

2. `.claude/skills/loop2-balance/SKILL.md:168-169`, with its copy `.agents/skills/loop2-balance/SKILL.md:168-169` (the two files are byte-identical, `diff` reports no difference). The sentence "A map is harder than the map that opens it where its best program solves a smaller share of the seeds than the best program of the map that opens it does" states the harder-map measure with no character named, and the table it sits in (each map with its own character) is the measure D-448 now lists as rejected. The author reports this place (point 1 of the addition); I confirm it. Grade: Minor, and out of scope of this change: the files lie outside the range (the range is `foundations/decisions.md` only), the skill describes what the instrument measures today, and the instrument gets the one-character measure from a later task (the note, section 8, says the measure is added to the mode `progression` by task 4), at which time the paragraph and both copies change together. Until then the skill is not wrong about the instrument, only behind the decision. Decision for the orchestrator: carry it to task 4 as a named edit of both copies.

3. `foundations/decisions.md:6138` (D-438, third paragraph) and its holding test `tests/balance/progression.test.mjs:240` (`// decision: D-438 "In one map check of the balance instrument a map can be solved where ..."`). D-438 calls the measure of the mode `progression` "one map check of the balance instrument"; D-448's *Rationale* and *Rejected*, and D-428 (`foundations/decisions.md:12159`, `12161`), use "the map check" for the other mode, the one that measures only the maps an overlay adds. The words now overlap for two measures. Grade: Minor, out of scope: D-438's sentence keeps its meaning (it asks only whether a map can be solved, for which each map's own character is right), no sentence a reader would read wrongly was cited, and D-438 lies outside the range and was not asked to be changed. A later edit that says "the mode `progression`" in D-438 has to re-quote the test line at `tests/balance/progression.test.mjs:240` in the same change (the foundation check reads the quotation). The author reports this place as well.

## Checks

1. Mechanical comparison with the re-approved definition (a script of mine, `.runs/review-d448/cmp.py`, reading the entry of the definition and D-448 at the head; removed, see below). Results, each as the script printed it:
   - the second paragraph of the definition's entry is contained in D-448 verbatim: `True`;
   - the definition's *Rationale* sentence block (from "Two maps are compared with one character" to the end of the *Rationale*) is contained in D-448's *Rationale* verbatim: `True`;
   - the *Rejected* line of the definition equals D-448's *Rejected* line: `True`;
   - D-448's *Rationale* at the base with the one removed sentence ("The harder map is told by the check ... at each new map.") replaced by a marker equals the head's *Rationale* with the block replaced by the same marker: `True`, so the rest of the *Rationale* is unchanged and only that sentence went;
   - the second paragraph of the note `d448-source.md` (section 1, "Ma być, słowo w słowo") equals the definition's, by reading both (the text above matches the entry).
   (1) holds.
2. Unchanged parts: the line-by-line comparison of D-448 at the base and at the head (both 18 lines) differs on exactly lines 4 (second paragraph), 10 and 11 (the two examples), 14 (*Rationale*) and 15 (*Rejected*). The first paragraph is equal (`True`); *Scope* (`simulation · balance-tools`), *Based on*, *Relations* (`derives from D-18 · derives from D-136 · derives from D-438`) and *Origin* are unchanged. (2) holds. *Relations* agrees with the note, section 3 ("zostają jak na gałęzi").
3. Examples: *Verification* keeps the form the template asks for (`an agent compares a change with the decision:` with `complies:` and `violates:`; the violating example is a new map, not a change that replaces the decision; the entry has no invariant and no test line on its changed sentence, so a pair is allowed: the `decision:` lines of tests do not quote D-448 — `git grep -n "D-448" -- . ':!foundations/decisions.md'` finds no tracked file, so none in `tests/`, `src/` or `balance/`; the only other mention is inside `foundations/decisions.md:329`, "as D-448 gives", which stays true). The *violates* example measures with one character on both maps; the *complies* example does so only by implication — Minor finding 1.
4. Nothing else changed: `git diff --stat be5bebc7..f53f2409` lists `foundations/decisions.md` alone; no other `foundations/` file and no skill, test or code file in the range. D-449 is untouched (its heading and paragraphs are outside the diff's hunk, which ends at line 6168). (4) holds.
5. Limits and scripts:
   - word counts of D-448's paragraphs, counted by me as runs between spaces: 81 and 80 (limit 300 each, 600 together; the author's report says the same);
   - `python -B .the-way/elements/common/foundation_check.py` at the worktree root: exit 0, last line `0 errors`; the output has no warning line (`grep -i warn` finds none);
   - `python -B .the-way/instruction-files/check_instructions.py`: exit 0, last line `0 error, 0 warn, 112 info` — no warning, so no finding from it;
   - `git -C .the-way rev-parse HEAD` is `301e4eae1111310ccd80e466f62ea01838b9ff88`, the commit `git ls-files --stage -- .the-way` records.
   (5) holds.
6. Places the new measure makes untrue: examined, graded and placed as Minor findings 2 and 3 above; both lie outside the range's files and neither is a finding of this change. I found no further place: `git grep` for "harder than" and "map check of the balance" outside those gave nothing that states the old measure as a rule except the skill paragraph; D-428 and its test use "map check" for the overlay mode, as D-448 now does.
7. Template conformance of the entry (the *Rationale* and *Rejected* are quoted from a source that the human re-approved, so the check is only that they name no file or script of the process: they name the product's own mode `progression` and the product's map check; a measurement stands with what was measured and under which conditions — seeds 1 to 500, 2026-11-25 — as the template allows). No finding.

I did not run the product's full gate, nor the tests of `tests/balance/` (the range changes no code and no quotation a test reads; the foundation check, which reads the citations, passed).

## Declined to judge

- Whether the measure of the numbers (99.4%, 97.4%, 71.8%) is right: it is the definition's own measurement, whose record is not open to this repository; I checked only that the text equals the definition's.
- Whether the instrument measures with one character today: that is the work of the later task, not of this foundation change.
- Whether the human accepts the *Verification* examples: the author marked them as the cycle's, for the merge.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` (sections "Verification", rules for *Rationale* and *Rejected*) and `.the-way/elements/decisions/skill/SKILL.md` lines 20-70, to judge the form of the examples; the dispatch named the skill, the template is the file the skill sends to.
- `foundations/decisions.md` lines 6128-6170 (D-438 whole third paragraph region and D-448 whole) and 325-331 (the other mention of D-448), `.claude/skills/loop2-balance/SKILL.md:160-175` and `.agents/skills/loop2-balance/SKILL.md` (by `diff`), `tests/balance/progression.test.mjs:236-244`: to grade the places of check (6).
- `grep -n "D-448" foundations/*.md` and `git grep` for D-448 in tracked files, to confirm no other file quotes the entry.

## Working copies

One directory of my own: `.runs/review-d448/` (the script `cmp.py`, its output `cmp-out.txt`, the outputs of the two checks `fc.txt` and `ci.txt`). No worktree or clone was made. The directory is removed before I return; nothing in it is needed by a finding, since no finding rests on a probe.

## Unread material

None of the dispatch. The handoff, `.the-way/task-cycle/review/SKILL.md` and `d448-source.md` were read whole. The definition file (private) was read only at the entry "How may a map differ from the map that opens it?", its neighbour entry's start, and one line of its section that names the checking of each new map; it was not read whole (the handoff asked for the entry). The author's report was read from its section "Addition 2026-11-25: D-448 ..." to its end, not from the start. `.the-way/elements/decisions/template.md` was read in parts (lines 42-54, 83-133, 135-160, 200-330), not whole; the reach is named above.

## Searches not found or unclear

- `git grep` for a `decision:` line quoting D-448 outside `foundations/`: found none (the entry has no test line, so its examples are the only holder of its changed sentence; the template allows the pair for that case).
- The definition's entry has `Relations: TODO` and `Verification: TODO`, so it cannot confirm the branch's *Relations*, only the note does (section 3); not unclear, the note is explicit.
- The definition has no literal "D-448", the entry is addressed by its question; nothing unclear beyond that.
