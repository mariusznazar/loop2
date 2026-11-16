# Handoff to the reviewer of the whole change — loop2: skill z gotowymi skryptami do grafiki sceny

You review the whole change as an agent that did not make it. The person who requested this cycle has delegated every intermediate choice to the orchestrator; nothing you are told is that person's approval. Do not ask the human; put questions in your report.

## Where you work

- Worktree: `the root of the task's worktree` (work from its root), branch `task/skill-scen-pikselowych`. `.the-way` is at the pinned `bfb2e109735b5fff98802b8be0ff3c43c799262a`; `npm ci` and `.runs/quality-venv` are installed.
- Range to review: base `e125db89f913b8c2d7b04d493f5696c96c522ebf`, head `9459331b` (confirm `git rev-parse HEAD`); two commits, `021f2aa7` (the skill, scripts, tests, `AGENTS.md` pointer) and `9459331b` (D-415).
- Your directory for working copies and the index of your selection: `.runs/review-whole/`.
- Your report: `docs/task-cycles/skill-scen-pikselowych/reports/review-whole-report.md`; its first line is `PASS <sha>` or `FAIL <sha>`.
- You are read-only toward the repository: make no commit and change no tracked file.

## Method and variant

Read `.the-way/task-cycle/review/SKILL.md` whole and follow it; your variant is "the whole change". Read `whole_change.md` beside it when it says so, and any other file it names only when the step that names it comes. You select your own foundation and guidelines by its method; the guidelines files of the touched part `agent-workflow` each whole (`guidelines/coding.md`, `guidelines/testing.md`; no `guidelines/coding-*.md` kind matches).

## What you review against

- The frozen task, whole: `docs/task-cycles/skill-scen-pikselowych/task.md` (Polish). It has no spec and no plan: one author made the change without a plan, so you judge every task item (*To do* 1–7, both acceptance criteria, the three answered questions) and the settlement row 1 (*Settlements to record*), and source fidelity: nothing in the skill or the scripts that the task does not say or the foundation does not give, nothing the task asks for that is missing.
- The author's report: `docs/task-cycles/skill-scen-pikselowych/reports/author-report.md` — claims to verify, not evidence.
- The answers of the orchestrator at the start: trust boundary — no (every changed file is in `agent-workflow` or `product-foundation`), but the scripts read images from outside, so check crafted input: a malformed, truncated, wrong-sized, interlaced or 16-bit PNG, and a progressive or damaged JPEG, must be refused with a message and a non-zero exit code, with no output file. Irreversible operation — no. The choice of the PNG route was settled by the orchestrator: Node with `node:zlib`, no new dependency (the task's *Questions carried to cycle*); a dependency added to `package.json` or `requirements-quality.*` would contradict it.
- Things the author's report leaves for you to judge:
  1. D-415 was written for the settlement row 1 (kind `decision`). The task's *Context* says an agent's working rules stand in the skill and not in the decisions (D-254 and D-357–D-359 were withdrawn for being instructions to the agent). Judge whether D-415 states the row's meaning and no more, whether it is a decision of the product or an instruction to the agent, and whether it collides with D-271 (which fixes 3:1 only for the frost against the snow) or any other entry. The skill must not add a threshold against a prop.
  2. The scale check ("Skala nowej paczki wobec Pixel Crawler") has no script of its own: it is a mode of `sheet-frames.mjs`. Judge whether the skill makes it findable and whether the task's six-script list is met.
  3. `jpeg.mjs` is a baseline JPEG reader written for the frames of `loop2-play` (about 350 lines); the author measured it against Pillow and a real Chrome frame and found up to 57 levels of difference at coloured edges. Judge whether `flashes.mjs` stays sound with it and whether the skill states the limit where a reader needs it.
  4. The styleguide's rule "The scene of a map run" lists the decisions it rests on; the author did not add D-415 there (that file is changed through `the-way-maintain-styleguide`). Judge whether that is a finding for this change or a note for the return step.
  5. The author's unread material: the glossary as a whole (searched by terms), `guidelines/styleguide-browser-view.md` mostly, `tests/view/scene-picture.test.mjs` mostly, decisions D-73, D-77, D-81, D-83, D-85 read through `guidelines/testing.md`. Read what bears on the change yourself.
- Acceptance criterion 1: verify the figures yourself against `assets/sprites/wolf-idle.png` and `mage-idle.png`, and that the test's expected values do not come from the script's output (`guidelines/testing.md`, *Where the expected value comes from*). Acceptance criterion 2: the skill must work from the repository alone, and no tracked file may name a note or folder outside it (D-362).

## Checks you may run

Focused ones only: `npm test -- <one test file>`, the quality checks of the changed files, `python -B .the-way/elements/common/foundation_check.py`, and your own throwaway checks of the scripts on files in `.runs/review-whole/`. Do not run the full `npm test`: the orchestrator runs the gate. Every check you report carries its command and exit code. Run the scripts yourself on the real sprites and look at the preview they make; for the reviewer's independence the task itself asks (*To do* 7), choose your own samples.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

As the method gives: status line, graded findings with each finding's place `file:line` and reason, the checks you ran with commands and exit codes, the count of decisions of your index you read whole, **Unread material** and **Searches not found or unclear** (each `none` or the items), your reaches beyond the selection, and the Minor findings within the task listed apart from those outside its scope.
