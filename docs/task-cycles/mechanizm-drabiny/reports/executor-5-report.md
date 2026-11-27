done
# Report — executor of slice 5 (make-change, "a slice, or the retry of a slice")

Slice 5 — the skill `loop2-balance` says how to add a rung and check it.

## Commits

- `48632dc4` docs: :memo: the balance instrument's skill says how a rung of the ladder is added and checked with the progression measure, reads the second table beside its opener, names the rungs under --map and times one progression run (D-438, D-448, D-464, D-465, D-466). Author `mariusznn@gmail.com` from the repository's configuration.

## Files changed

- `.claude/skills/loop2-balance/SKILL.md`: 77 lines changed, 20 removed (the diff stat of both copies: 77 insertions and 20 deletions each, 134 insertions and 20 deletions in total).
- `.agents/skills/loop2-balance/SKILL.md`: the same change; byte-identical to the `.claude` copy (`cmp` exit 0).

## What the skill now says (replaced or added)

- `--map` list: adds `forestDeep2`, `forestDeep3`, `forestDeep4` (Las — głębiej II, III, IV) with the note that the game composes their names. Replaces the five-id list.
- Commands table, row `progression`: its output is one table, one sentence and a second table beside the opener. Replaces the earlier output description.
- Progression section, first-table paragraph: replaced by a description of the first table and the sentence, followed by the second table (its columns, the two shares side by side, the verdict read from the share with the opener's character against the opener's best share, dashes for a map that opens nothing). Replaces the earlier paragraph that ended "Both go to the person as they are…" (now kept in the new text).
- Progression section, the sentence "A map is harder than the map that opens it where its best program solves a smaller share of the seeds than the best program of the map that opens it does." is replaced by the measure with one character (opener's character, D-448). This is the sentence that the rg check looks for; it now finds nothing.
- New section "Adding a rung of the ladder and checking it" (before "Where results go"): placement (D-466), the row's fields and rules (D-464), the composed name (D-465), the three hand-written sentences, the check command `progression --out` on the branch's data with no overlay, the pass criteria (`Can be solved` yes; `Harder than the opener` yes), narrowing with `--maps` and `--seeds 1-100`, one full run at the end, the request's description with labels only (D-428, D-429). The number of reference programs is left out of the text (the instrument lists 24 at this commit; I did not write the number).
- Timing paragraph, last paragraph: the five-map figure "about a minute and a half" is replaced by the one measured run (see checks) and the statement that the full run was not timed.
- The `description:` line of the frontmatter is unchanged (the skill's scope is the same).

Each added sentence makes superfluous a standing one, and the standing one was removed in the same edit: the "harder" sentence (replaced by the one-character measure), the first-table paragraph (replaced), the five-map timing sentence (replaced). No sentence was added without a removed one.

## Checks (command and exit code)

1. `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` — exit 0, `Ran 3 tests … OK`. Run after the edit and before the commit. No test was written or changed; no test was written first (the change is a skill text, which the slice names "no test" for beyond the existing file).
2. `rg -U -n "harder\s+than\s+the\s+map\s+that\s+opens\s+it\s+where\s+its\s+best\s+program\s+solves\s+a\s+smaller\s+share\s+of\s+the\s+seeds\s+than\s+the\s+best\s+program\s+of\s+the\s+map\s+that\s+opens\s+it\s+does" .claude/skills/loop2-balance/SKILL.md .agents/skills/loop2-balance/SKILL.md` — exit 1 (no match; the old sentence is gone from both copies).
3. `cmp .claude/skills/loop2-balance/SKILL.md .agents/skills/loop2-balance/SKILL.md` — exit 0 (identical).
4. `python -B .the-way/instruction-files/check_instructions.py` — exit 0; `0 error, 0 warn, 124 info`.
5. Timing, the measure the skill names: `npm run --silent balance -- progression --maps forest --seeds 1-100 --out <worktree>/.runs/executor-5/timing-forest-100.md` — exit 0; `time` real 0m15.9s (includes the build the npm script runs first, about two seconds). One run, not repeated. The output held the first table with the rows of Las only (labels P1–P24) and the second table with one row: `Las | 100 % | yes | Skraj lasu | 96 % | 81 % | yes`. The 500-seed run was not made.
6. Own-work check (section 3 of make-change): the requirement that the skill's text must match the instrument's actual output and names. Check: `npm run --silent balance -- progression --maps forestDeep2 --seeds 1-100 --out <…>/rung-check.md` — exit 0; the rows read `Las — głębiej II | P1 | 0 % …` and so on, confirming the composed name the skill gives, and that `--maps` narrows to the rung and still measures its opener. No failure occurred, so no rerun pair is needed.

Not run: the whole test suite (`npm test` without a file) — not in the slice's checks and not run by me, per the handoff; `python -B .the-way/elements/common/foundation_check.py` — not in the slice's checks, not run.

## Walkthrough and ui_check

The change alters no behaviour the user sees in the running product: it edits the text of an agent skill only; the product's code and screens are untouched. `ui_check.md` and `walkthrough.md` do not apply.

## Reach beyond the handoff

None. The change touches only the two skill files named by the slice. No trust boundary and no irreversible operation (step 4 answers hold).

## Choices

- Row numbers: the handoff's "row 2, row 3, row 4, row 5" I read by their content as D-464 (row 2, the mechanism), D-465 (row 3, the name) and D-466 (row 5, the order). I did not locate a "row 4" in the frozen task's "Settlements to record" section (task_frozen.md from line 157), which I did not read; the measure in the skill is taken from To do 4 and D-448. Rejected: quoting the Settlements table as the source for the rung's rules; the decisions carry the same rules.
- The number of reference programs is not written in the skill (the handoff's rule); the skill says "every reference program that `programs` lists".
- The timing sentence gives only the one measured run; the rest is stated as not timed.

## Problems observed

- The first table and the second table of `progression --maps forest` print Las only; Skraj lasu's measure appears only as the opener's cells. This is how the code works now (`renderProgression` prints `maps`, the requested rows), and the skill says so.
- Observation, not a fault of my slice: in the test run above (`--maps forestDeep2`, seeds 1-100) the rung Las — głębiej II solved 0 % of the seeds with programs P1–P8 and 39 % with P9 (`rung-check.md`, removed). This is the rung's own numbers, which Slice 5 does not tune; the full check belongs to the cycle's rung work. I did not verify the foundation's expectation for these numbers.

## Unread material

- `.runs/task-cycles/mechanizm-drabiny/task_frozen.md`: lines 28–34 were read with each line cut at 1500 characters; the tails of To do 1 and the other rows past that point are unread in full. Lines 87–95 were read with each line cut at 1500 characters (the answer and the rejected options of Q6 were complete within that cut).
- `foundations/decisions.md`: D-438 (lines 6176–6194) and D-448 (6195–6211) were read with each line cut at 900 characters; the Rationale and Rejected tails of those two entries are unread. D-449 (6212–6226) and D-428, D-429 (12610–12641) were read with the same cut and their lines appeared complete. D-427 (12595–12609) and D-464, D-465, D-466 (6227–6271) were read whole.
- `foundations/glossary.md` term `rung` (line 344): read whole.
- `foundations/part_map.md` lines 140–158 (agent-workflow): read whole.
- `balance/progression.mjs` (495 lines): read in ranges 1–22, 313–356 and 443–495 only; the state-building functions (lines 23–312 and 357–442) were not read.
- `src/browser/sim/data/maps.ts`: read in ranges 76–117, 240–275, 350–372 and 414–440 only.
- `tests/balance/progression.test.mjs` (421 lines): not read; only grepped for the opener case at lines 240–265. The handoff names it as the source of the new cases of Slice 4; I did not use it for the skill's text.
- `tests/agent_workflow/test_loop2_balance_skill.py`: read whole.
- `.the-way/task-cycle/change/SKILL.md`, `slice.md`: read whole. `.the-way/task-cycle/change/ui_check.md`, `walkthrough.md`: not read (no user-visible change).
- `.claude/skills/loop2-balance/SKILL.md`: read whole before editing.

## Searches not found or unclear

- "row 4" of the plan's "Settlements to record" rows: not identified (see Choices).
- The frozen task's *Settlements to record* section (from task_frozen.md line 157): not read.
- The plan's range for the `task_frozen.md` lines of the Q2/Q6 passages: found by heading; their ranges in the handoff matched the content I read.

## Working copies

- `.runs/executor-5/` — the directory for working copies, which held the timing output, the instrument's output for `forestDeep2` and the logs of the checks. It was removed with `rm -r` by its full path; the directory no longer exists. No git worktree was made, so no `git worktree remove` was needed.
