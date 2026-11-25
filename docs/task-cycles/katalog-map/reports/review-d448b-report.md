PASS ecd239e0ac4e0dd827a09a8115eaec74a619c38a

# Review of the second D-448 correction, task `katalog-map`

Range `07f2577faf97d6d4ee1f1dcc044cfce9b46b21a1..ecd239e0`; `git rev-parse HEAD` = `ecd239e0ac4e0dd827a09a8115eaec74a619c38a` (matches). One commit, one file, 1 insertion and 1 deletion.

Findings: blocking 0, Minor 1 (out of scope, see below), out of scope 1.

## Checks

1. **The diff removes exactly the one clause.** `git diff 07f2577f..ecd239e0` and `--stat`: only `foundations/decisions.md`, one line, the `violates` example of D-448's *Verification* (line 6162). The only change is the loss of ", where its solving condition holds no new rule"; the rest of the line (the new map, the share not smaller than that of its opener, the wall refused until the player holds the thing it asks for) is byte-for-byte as before. Method: read of the whole diff. Result: yes.
2. **The examples are well-formed and consistent with the second paragraph.** Read D-448 whole (lines 6151-6166). The second paragraph says "A map is harder than the map that opens it" with no qualification, measured with one character on both maps from the mode `progression`. The `violates` example restates it as "a new map whose best reference program, measured with one character on both maps as the second paragraph gives, solves a share of its map runs not smaller than that of the map that opens it" (now without a qualification, as the paragraph); the second part (a wall refused until the player holds its thing) matches the paragraph's last sentence and D-438. The `complies` example (Las — wataha opened by Las — głębiej, smaller share measured with the progression character; a map whose solving condition brings in combat, with the next map after it opened by it) agrees with the first paragraph (a map may bring a new rule) and with the second, and does not contradict the now unqualified `violates`: the combat map complies by being measured harder, not by being exempt. Both examples are pairs of examples outside the binding sentences, as the template keeps them. The *Rationale* ("neither a wall nor a rung of numbers alone") and *Rejected* hold no sentence that exempts a map with a new rule from being harder.
3. **Word limits and scripts.**
   - `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
   - `python -B .the-way/instruction-files/check_instructions.py` — exit 0, `0 error, 0 warn, 112 info` (no warning).
   - Words of D-448's paragraphs, counted by `python -B -c` on lines 6153 and 6155 of `foundations/decisions.md`: 81 and 80 (limit 300 each, 600 together). The change removed words, so no limit moved.
4. **Does anything quote or rely on the removed clause.** `git grep` (excluding `.the-way`) for "holds no new rule", "no new rule", "new rule in its solving condition", "brings in", "harder than", "D-448" across `foundations/`, `tests/`, `src/`, `balance/`, `guidelines/`, `.claude/`, `.agents/`:
   - No file holds the removed clause or a paraphrase of it. No `decision:` line in tests quotes D-448 (the only mentions of "D-448" are `foundations/decisions.md:329` in the rationale of the data decision — "or asks for something new, as D-448 gives", agrees with the first paragraph —, the heading at 6151, and `foundations/decisions.md:6174`, D-449's relations).
   - `.claude/skills/loop2-balance/SKILL.md:169` and its copy `.agents/skills/loop2-balance/SKILL.md:169` say "A map is harder than the map that opens it where its best program solves a smaller share of the seeds than the best program of the map that opens it does" — each map with its own character, the old measure. It makes no exception for a map with a new rule, so it does not rely on the removed clause; it differs from D-448's second paragraph only by the measure (one character), which the previous correction (`f53f2409`) introduced, not this commit. The author named it in the foundation report and left it for task 4. **Minor, out of scope** (a skill outside `foundations/`, not touched by this range; it would be graded under "a departure from a foundation entry it writes" only for a file the change itself writes). No Critical or Important finding.

## Findings by grade

- Blocking: none.
- Minor (out of scope): the two copies of the `loop2-balance` skill at line 169 state the old measure of "harder" (see check 4); the author's report says task 4 adds the progression measure there.

## Declined to judge

- The wording of the *Rationale* and *Rejected* paragraphs and the measure itself (re-approved by the human, the previous correction's range): not part of this range.
- The text of the `loop2-balance` skill, as above: outside the range.

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/SKILL.md` (the method, named by the dispatch, read whole).
- `git grep` of the phrases above across the repository, to answer check 4 as the dispatch asked.
- Reading `foundations/decisions.md` lines 322-331 (data decision rationale that cites D-448) and 6168-6182 (D-449, the neighbour that derives from D-448), `.claude/skills/loop2-balance/SKILL.md:160-176`, to judge whether they rely on the clause.

## Working copies

None made; `.runs/review-d448b/` not created. The reviewed worktree was only read; `git status --short` was clean.

## Unread material

The *Verification* of D-448 and the whole of D-448 were read whole. The previous correction's own diff (`be5bebc7..f53f2409`) was not read as a diff, only its result in the current text of D-448. The foundation report was read from its last two sections. `decisions/template.md` was not read (not named by the dispatch). Nothing else of the dispatch was left unread.

## Searches not found or unclear

None. The searches for the removed clause found no trace elsewhere (expected); the handoff's mention of `.runs/review-d448b/` was not needed.
