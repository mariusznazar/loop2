# Handoff - the fix of the whole-change review's findings, task `katalog-map`

You fix the findings of the review of the whole change of a planned task cycle of the-way. The person who requested the cycle has delegated
intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`. The reviewed head is `cf6be29e`
  (confirm `git rev-parse HEAD`). Your range runs from there. Commit by path (`git add <path>...`, never `-A`, `.`, `-a`), messages in English in
  the repository's style, push nothing to the product repository. You may make several commits.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant "the fix of a review's findings". Read it whole; read a file it names only
  when its step comes.
- The findings: `.runs/task-cycles/katalog-map/reports/findings-whole.md` (in the reviewer's words; B1 blocking, findings 1 to 11 Minor within the task,
  all to be fixed in this round). The full review is `reports/review-whole-report.md` (you may read it for context). Frozen task:
  `.runs/task-cycles/katalog-map/task.md`; plan: `.runs/task-cycles/katalog-map/plan.md` (the plan's *Choices* row that left `SOLVABLE_SHARE` is
  overruled by B1: no decision allows it).
- A finding you hold wrong you answer with evidence in your report instead of changing code, with the reviewer's claim and your evidence quoted;
  say so for each such finding. Run the affected checks again. No full gate (`npm test` with no file argument is not yours); focused checks only.
- Guidelines (each whole, before you touch the code they govern): `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
  `guidelines/coding-balance-instrument.md`, `guidelines/coding-content-data.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`,
  `src/browser/AGENTS.md`. Foundation: read by heading D-438, D-440, D-441, D-448, D-449, D-416 and the invariant `judging-cache-reading`.
  Foundation entries are written only through the project skills (`.claude/skills/the-way-record-decision/SKILL.md` and the others, which point at
  `.the-way/elements/*/skill/SKILL.md`, read as files) and `foundation_step.md` (`.the-way/task-cycle/skill/foundation_step.md`).
- Your directory for working copies: `.runs/fixer/`. Report path: `.runs/task-cycles/katalog-map/reports/fix-whole-report.md` (the report file is the
  input of the cycle's scripts, the case Claude Code's refusal of files named `report...` leaves open). First line: your status. It holds, for each
  finding (B1, 1..11), what you did or why you hold it wrong, each check with its command and exit code, your own-work check, the commits,
  **Unread material**, **Searches not found or unclear** (each `none` or the items). If you take screenshots or run the game, follow the rules of
  `.claude/skills/loop2-play/SKILL.md`; a screenshot shown to the human goes to the place D-418/D-419 settle (branch `loop2/katalog-map` of
  `mariusznazar/screenshots`, never `main`, never force-push, no personal datum in any image), only where a finding changes what the screen shows (6, 7, 8).
- `cycle.md` and files of `.runs/task-cycles/katalog-map/` not named here are not yours to read.

## Orchestrator's directions per finding (choices where the review leaves them open)

- B1: make `balance/progression.mjs` read a map as solvable where its best program solves one seed or more of the measured seeds (rename the constant
  and its comment accordingly), bring the three cases of `tests/balance/progression.test.mjs` to that, check nothing else reads the old share
  (`grep` for `solvable`, `SOLVABLE_SHARE` in `balance/`, `tests/`, `.claude/skills/loop2-balance/`, `.agents/skills/loop2-balance/`), and keep the skill's
  two copies byte for byte equal (`cmp`).
- 1: add the one clause to D-441 through the skill `the-way-record-decision` (a record the storage refuses stays for the open page and the stored one is
  left, since the record never falls); mark it `the cycle's`.
- 2: no behaviour change; put one comment where the stored number is read, saying a hand-written `-0` or `2.4e1` reads as the number it denotes, as the
  judgings' reading does.
- 3: add the new test file and the record's cases to the row of `guidelines/testing.md` for `judging-cache.ts` (through the skill
  `.the-way/product-guidelines/testing/SKILL.md`, `the-way-maintain-testing-guidelines`, read as a file). The sentence of the invariant `judging-cache-reading`
  is a rule accepted by the human: do not change its rule; if the record's reading at that boundary needs the invariant to say so, report it as a concern
  and change nothing in the invariant except what the skill of invariants allows without changing its rule (e.g. its *Verification* cases), saying so.
- 4 and 5: `DokadRegion` carries `region: RegionName` and the `forced`/unfolded state computed once in `catalog-lines.ts`; the component stops parsing the
  header text and recomputing the rule. Tests follow.
- 6: the group of the picked map unfolds only where the picked map itself stands in the folded group of solved maps (D-331's reason: the picked row with
  its bar must be visible); otherwise the fold row stays enabled and works; a search still unfolds. Tests and the styleguide section of the screen Mapy
  follow (that section is yours to correct in this one place, by the same skill).
- 7: decline the counters with the forms the file already uses for „rozwiązana”/the product's counted-name helper (D-416): e.g. "1 poznana · 0 rozwiązanych";
  choose the forms by the Polish rule for numerals and test 0, 1, 2, 5, 12, 22.
- 8: one place holds the rule for „z”/„ze” before the number: „ze” where the spoken form of the number begins with s, z, sz, ś, ź or ż (6, 7, 60–79,
  100–199, 600–799 and so on for numbers below 1000), „z” otherwise; use it in `recordLine`; tests for 24, 50, 120, 6, 7, 70, 200.
- 9: if the tests can choose their data by id from the game's data without the seam, remove the optional parameters of `catalogLines`; where a case needs
  data the game's five maps cannot show (the „nie wraca” branch, a region with nothing open), keep the seam out of the product code by exporting the pure
  helper that takes the data and calling it from the tests; where you hold the finding wrong, answer with evidence.
- 10: state what the run takes now, once, in both copies of the skill ("about a minute and a half"), with no history of this change.
- 11: correct the rule "The scene of a map run" of the styleguide: name the bear, its per-creature sink (`SCENE_FIGHT.sink`) and say what holds for each
  creature's sheets (the wolf's paws stand on the bottom row; the bear's do not and its drawing is lowered by its sink), saying nothing the code does not do.

## Working copies (the first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
