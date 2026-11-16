PASS 614f28f2bbc6a648745d146392c57bc80c3f46ce

# Review — the return step's commit, cycle `drobne-bledy-ekranow`

Range `fe15a2671b959c3162ff7dea2203c48c0c7f8137..614f28f2bbc6a648745d146392c57bc80c3f46ce`, one commit
(`614f28f2`, "docs: bring the verification of D-297, D-318, D-319, D-41 and D-19 to what their tests
hold now…"), `foundations/decisions.md` only, +16 −12. `git rev-parse HEAD` = `614f28f2bbc6a648745d146392c57bc80c3f46ce`, the head given.
`.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the gitlink's commit.

## Findings

### Critical

none

### Important

none

### Minor

1. **`foundations/decisions.md:11086-11098` (D-319 *Verification*) — the `tests:` clause does not name the
   one test that quotes D-319's sentence on a changed target, while the pair still lists "a target changed
   on the way" as held by no test.**
   `tests/view/scene.test.mjs:653` ("a walk cut by an action that leads nowhere stops the mage where it has
   reached, and the place it was walking to is not reached") carries
   `// decision: D-319 "A target that changes on the way turns the mage from the place it has reached"`
   and holds, for five targets that keep the mage standing (eating, lighting a stick, combat, gathering and
   patrolling for fibre), that a walk whose target changes on the way ends at the place reached (62.7976 %,
   not 81.8452 %), with no walk and no `--walk-start`. The return step moved this case into D-318's clause
   (`decisions.md:11063-11064`, correct) but left D-319's clause without it, and D-319 goes on: "For the
   walk itself, a target changed on the way and the system's setting for reduced motion, an agent compares
   a change with the part no invariant and no test holds". By the return step's own rule (a part a test
   holds leaves the pair and is named in `tests:`), the degenerate case of the sentence — a target changed
   on the way to "stay where it stands", the mage stopping where it reached — is held and belongs in
   D-319's `tests:`, the pair keeping only a turn toward another place, which indeed no test holds (I
   searched `scene.test.mjs` titles and every `D-319` citation in `tests/`: none changes a walk's target
   to another place mid-walk). Why Minor: the pair's sentence stays literally true for the general turn,
   D-318 names the held case, and no reader is led to wrong code; the cost is only that a reader of D-319
   alone does not learn that one test already pins part of its second sentence. The return step itself
   raised the neighbouring point as its concern 2. Evidence: the test lines above; the clause text at
   `decisions.md:11086-11091`.

2. **`foundations/decisions.md:11089` and `:11797` — the wrap of the edited clauses.** Line 11089 runs to
   about 130 characters ("…time on the return, the mage standing at the place of the walk. For the walk
   itself, a target changed on the way and the") where the rest of the entry wraps near 100, and line
   11797 ends short ("marking no row; the numbers of stock standing in the") before the clause resumes.
   Polish only: the Markdown renders the same and no check reads the wrap; named so that a later edit of
   those clauses reflows them.

No blocking finding.

## What I checked against the task and the foundation

The five decisions read whole with *Rationale* and *Rejected*: D-41 (`decisions.md:4702-4715`), D-297
(`:8965-8996`), D-19 (`:9784-9826`, through its *Rejected*), D-318 (`:11046-11073`), D-319
(`:11075-11109`). No binding sentence, *Rationale* or *Rejected* changed; only *Verification*.

- **D-297 (N-1 of the docs review, task item 14).** Claim: the arrow toward an empty group at the edge is
  held by a test. True: `tests/view/program-editor.test.mjs:1590` ("the arrows are off only where no group
  stands before (after) the rule's group, a group's edge being no end") builds `emptyAtEdges` (empty, rule,
  empty) and asserts `ruleArrows(emptyAtEdges, 2, 0)` = `{ up: true, down: true }` (lines 1613-1623).
  Claim: where the rule lands in an empty group at the edge is held by no test. Positive control: every
  `moveRule(` call in `tests/` (program-editor.test.mjs:443-454, 873-874, 930-946, 1645-1653) and every
  use of `threeGroups()` (empty group last) in `tests/view/rule-editor.test.mjs` (lines 213, 311, 455, 792,
  817, 842, 861 — group drags, a rule drop into the middle group, the empty-group text, plural) — none
  moves a rule by an arrow into an empty group at the program's edge; the landing test at
  program-editor.test.mjs:1626 uses A, B (empty, middle), C. So the pair now stands only for the landing,
  and its rewritten *violates* (the arrow enabled, the rule left where it stands) matches the sentence
  "so a rule group left empty at the edge of the program takes the rule". The clause's "computed and from
  the buttons of the list" stays attached to the first part only; the new part is computed only, and the
  clause does not claim otherwise.
- **D-318 (task item 20).** The added "a mage whose walk they cut standing where the walk has brought it and
  not at the place it was walking to" is held by `tests/view/scene.test.mjs:653` (five actions that lead
  nowhere, each asserting 62.7976 % not 81.8452 %, `walking` false, no `--walk-start`). Agrees with the
  sentence "the mage stays where it stands" and the task's "kod pod D-318 … decyzja bez zmian".
- **D-319 (task item 10).** The added "a walk the player cut by leaving the screen not played a second time
  on the return, the mage standing at the place of the walk" is held by
  `tests/view/run-screen.test.mjs:1099` (title as quoted; after `hidden = true`, `cancelWalk` and
  `hidden = false`, mage and badge carrier at `42.8571%`, not walking, no `--walk-start`). The test has
  no `decision:` line; its comment names D-319 and D-283, and task item 10 ties the behaviour to D-319
  ("mag stoi tam, gdzie każe D-319"). The pair (640 ms, changed target, reduced motion) stays true; see
  Minor 1 for the changed target.
- **D-41 and D-19 (task item 1).** The added "a hovered tile not revealed, which has no row, drawing no
  line and marking no row" (D-41) and "hovering a tile not revealed marking no row" (D-19) are held by
  `tests/view/world-area.test.mjs:1042` (no `polygon.link-highlight`, no `tr.hovered`, no row for `0,0`).
  The revealed case is held by `world-area.test.mjs:947`. Both agree with D-41's sentence
  ("`link-highlight` means that this tile and this row … are the same place"), which an unrevealed tile
  cannot satisfy; D-19's sentence ("links a tile with its row") is not narrowed by the clause. D-41's
  *complies* "a hovered revealed tile" agrees.
- **Against the foundation:** no invariant changed; no `decision:` line changed (foundation check below
  confirms each still begins a sentence of its decision). No reserved choice, no trust boundary, no UI
  file, no screenshot in the range.
- **Against the task:** the commit writes nothing the task excludes and nothing for later. The return
  step's other verdicts (D-144 left without a unit, rows 10 and 16 without an entry, the decisions in
  play unchanged) are claims about entries outside this commit; I spot-checked D-306's pair (its claim
  that no test holds the panel closing on deletion: the D-306 *Verification* at `decisions.md:9266-9278`
  names the cross-group move test `program-panel.test.mjs:1992` and keeps the deletion in the pair; I
  found no test title on deleting a rule with its panel open) and found it true.
- **The author's own-work check:** it named the most likely fault (a clause claiming a test that does not
  hold it, or a pair still saying "no test" where one does) and checked each added clause against its
  test; it would catch that fault. It did not apply the same check to D-319's existing pair against
  `scene.test.mjs:653`, which is Minor 1 (it raised it as concern 2 and chose to leave it).

## Declined to judge

- Concern 1 of the return step (test title `tests/view/rule-editor.test.mjs:1127` and a comment at
  `tests/view/program-panel.test.mjs:1044` writing a condition's number with no unit): code-side, outside
  the return step's commit; for the orchestrator.
- Concern 3 (D-316's verification speaking of "the place the mage keeps" without the browser's place
  D-04 now names): D-316 is unchanged by the task and by this commit.
- The return step's judgment on D-144 (no unit in the wolf's data sentence): outside this commit, which
  does not touch D-144; I did not re-derive it.
- The correctness of every other entry the return step reports as "true to the code" (D-04, D-172,
  D-207, D-208, D-285, D-294, D-342, D-350, D-381 and the decisions in play): the whole-change and docs
  reviews passed them at `fe15a267`, and this commit does not touch them; only D-306's pair was
  spot-checked.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Head | `git rev-parse HEAD` | 0 | `614f28f2bbc6a648745d146392c57bc80c3f46ce` |
| Pin | `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | both `bfb2e109735b5fff98802b8be0ff3c43c799262a` |
| Diff | `git diff fe15a267..HEAD`; `git log fe15a267..HEAD` | 0 | one commit, `foundations/decisions.md` only |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 142 warn, 7 info` (same counts the return step reports) |
| Focused tests | `npm test -- tests/view/program-editor.test.mjs` | 0 | pass |
| Focused tests | `npm test -- tests/view/scene.test.mjs` | 0 | pass |
| Focused tests | `npm test -- tests/view/run-screen.test.mjs` | 0 | pass |
| Focused tests | `npm test -- tests/view/world-area.test.mjs` | 0 | pass |
| Worktree clean after runs | `git status --short` | 0 | empty |

Not run: the full suite (the handoff forbids it; it is the cycle's own run). The local game was not
started; no check needed it.

## Decisions read whole

7: D-41, D-297, D-19, D-318, D-319 (the five the commit changes), and D-283, D-284 (to judge whether the
walk cut by leaving the screen belongs to D-319 or to them).

## Reaches beyond the handoff

- D-283 and D-284 (`decisions.md:9828-9870`): whether leaving the screen and the return carry the walk
  behaviour D-319's new clause names; they speak of the pause only, so D-319 (task item 10) is its place.
- D-306 *Verification* (`decisions.md:9266-9278`): spot-check of the return step's claim that its pair
  rightly keeps the deletion.
- `tests/view/rule-editor.test.mjs` (lines 95-135, 205-330, 395-440, 450-470, 785-930) and
  `tests/view/program-editor.test.mjs` (120-140, 225-260, 893-946, 1590-1660): the positive control
  for D-297's landing part.
- `tests/view/scene.test.mjs` (540-702, 2445-2470, the list of test titles) and every `D-319` citation
  in `tests/`: whether any test turns a walk toward another place mid-walk (Minor 1).
- `git diff bd82d394..fe15a267 -- tests` (the added tests' titles and `decision:` lines): to see which
  new tests cite the five decisions.
- `scripts/test.py`: how `npm test -- <file>` runs one file.

## Working copies

None made under `.runs/review-return-step/` (no worktree, clone, script or screenshot was needed). One
stray file, `.runs/fc.err` (the stderr of a
foundation-check run), was written outside my directory by mistake and removed at once; nothing remains.
The build the focused tests ran is the product's own tool; `git status --short` was empty after it.

## Unread material

- `foundations/decisions.md`: not read whole; read the five changed entries whole, D-283 and D-284 whole,
  and D-306's *Verification* only.
- `.runs/task-cycles/drobne-bledy-ekranow/reports/return-step-report.md`, `return-step-handoff.md`,
  `task.md`: read whole.
- `.the-way/task-cycle/review/SKILL.md`: read whole. `.the-way/task-cycle/skill/return_step.md`: not read
  (not named for this review; the rule it gives the return step is quoted in my handoff and used as such).
- The test files named above: read in the passages listed, not whole.
- `plan.md`, the spec, the decision index, the earlier review reports: not read (not dispatched).

## Searches not found or unclear

- Not found: a test that changes the target of a walk to another place mid-walk (D-319's pair; searched
  every `D-319` citation in `tests/` and the titles of `tests/view/scene.test.mjs`).
- Not found: a test that moves a rule by an arrow into an empty group at the program's edge (D-297's
  pair; searched every `moveRule(` call in `tests/` and every `threeGroups()` use in
  `tests/view/rule-editor.test.mjs`).
- Not found: a test title on deleting a rule whose panel stands open (D-306's pair; searched test titles
  in `tests/view` for delet/remov/Usuń).
- Unclear: none.
