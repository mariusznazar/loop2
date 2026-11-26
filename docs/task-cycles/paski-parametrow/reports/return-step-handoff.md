# Handoff — the return step — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`, HEAD at the start of your work `e058ab30`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Your stage: the return step (step 11 of the cycle). You take no row of the variants of `make-change`. Read `.the-way/task-cycle/change/SKILL.md` whole for how a change is made, committed and reported, then `.the-way/task-cycle/skill/return_step.md` whole (what the return step compares and writes) and `.the-way/task-cycle/skill/foundation_step.md` whole (the return step writes as the foundation step writes); read the `SKILL.md` of an element, at the path `foundation_step.md` gives, when you write an entry of that element. Read the other files they name only when their step comes.
- Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English, in the form of the repository's earlier commits (`type: :emoji: text`). Where you find nothing to write or correct, commit nothing and say so with the evidence of your search.
- Your directory for working copies: `.runs/return-step/`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/return-step-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness refuses the write, return the report whole as your answer. It ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, and names the place each settlement you write went to, as the record's *Return step* gives it (WAY-11, WAY-134).
- Run no full gate (no bare `npm test`): checks are focused; after any foundation edit run `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py`. The full gate is the orchestrator's.
- Frozen task, read whole: `.runs/task-cycles/paski-parametrow/task.md`. `cycle.md` and the other agents' handoffs are not yours to read; the reports you may read are named here.

## The change you compare the foundation with
- Range of the whole change: base `51667231eafb32db53eaaf662f07e728323aa2ba` to head `e058ab30` (`git rev-parse HEAD` must show a SHA that starts so). It was reviewed in two rounds (a fail of the whole-change review with one blocking finding about the marker of the temperature scale, a fix, a pass of the review of the fix). Compute the diff yourself; the code, not the reports, is the source.
- What it did, in short: the four cells of the body row of a map run drawn as the cells of the old Loop (`src/browser/view/body-row-cells.tsx`, `body-row.ts`, `body-blow.ts`, the shared button kind `value-cell` in `controls/react-button.tsx`, the rules in `run-screen.css` and `styles.css`, five new roles in `tokens.css`, the kitchen-sink samples), the explanation on a click, the pulse of an alarm and the marker of a creature's blow; the foundation entries already written by the cycle: D-337, the new D-450, D-311, D-178, D-39, D-40 (rewritten once more by the fix for the marker with a light core between dark sides), D-42, D-44, D-04 and the invariant `design-token-contrast`; the styleguide's new rule "The body row of a map run" and its roles table. Reports you may read for context: `reports/foundation-report.md`, `reports/fix-1-report.md`.
- The decisions in play of the task (its *Decisions in play*) and the rows of its *Settlements to record*: compare each against the code as it stands now. Entries to compare by identifier, read whole: D-337 `foundations/decisions.md:10966-11078`, D-450 `11299-11355`, D-311 `10678-10818`, D-178 `7224-7256`, D-39 `5012-5038`, D-40 `5039-5057`, D-42 `5073-5089`, D-44 `5105-5123`, D-04 `59-217` (ranges at `7308e0bd`; the fix edited D-40, D-337, D-450, so find them by identifier), and the invariant `design-token-contrast` in `foundations/invariants.md`.
- Do your own search too (WAY-11): by the names and words the change's code adds — for example `value-cell`, `satiety-fill`, `chill-zone`, `safe-zone`, `scale-marker`, `warming-frame`, `holds-marker`, `bodyRowCells`, `blowMarker`, `body-explanation`, `alarm`, `controls`, the `hover: none` block of the cell — in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md` (read it: a word the change uses in a meaning for which WAY-95 gives it an entry, and a term used against its entry, are yours to handle), `foundations/environment_facts.md` and the part map `foundations/part_map.md` (the parts the change touches: browser-view and its tests; `python -B .the-way/elements/common/foundation_check.py` shows whether every tracked file stands in a part).
- Where a decision you compare carries a pair of examples in its *Verification* and a test holds part of its sentence, move that part out of the pair and name the test with the clause `tests:`, as `return_step.md` gives (the fix and the executors wrote `decision:` quotation lines in tests; check them against the entries).
- The sources outside the product that the change rests on and the foundation does not hold (as environment facts): the values of the five roles carry `Source:` lines in `src/browser/tokens.css` — check whether a source stands there that no environment fact holds and the entries need (`return_step.md` says when one is written). Write no entry that is only a wish; no entry is deferred.
- Known open points that are **not yours** to settle and that you leave as they are: the marker of the temperature scale now departs in look from the task's „w ciemnym kolorze” (for the human's veto at the request); the sum of the creature's blows against the health lost on the blow marker (the entries, the task and the code agree on the sum); the resting roles of the name and the number of a cell (`text-label`, `text`) which no decision carries and the styleguide rule states; the Minor notes N-1 and N-2 of the review.

## Gaps of the earlier reviews that I carry to you
The reviewers read the glossary entries not at all; you read them (above). The styleguide's other rules and the-way's styleguide-specific template were not read by the reviewers; if your comparison of the new styleguide rule with its entries needs them, read them and say so; otherwise name them unread.

## Working copies — copied word for word from the cycle's skill
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
