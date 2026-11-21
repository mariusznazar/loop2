# Handoff — review of the whole change, task `ekran-postaci`

## Who you are working for

The person who requested this cycle has delegated intermediate choices to the orchestrator. Nothing you
say is the human's approval, and you never ask the human anything: questions go to the orchestrator in
your report (first line `questions`). You did not make the change. You alone grade and scope your findings;
nothing in this handoff names a finding wrong, Minor or outside the task's scope.

## Where you work

- The task's worktree: `.runs/worktrees/ekran-postaci` (branch `task/ekran-postaci`).
  Run every command from that directory; never work in the main checkout `the main checkout of the repository`.
  You are read-only: you change no tracked file and make no commit.
- The pinned the-way is `.the-way` of that worktree, at `19e5774aed6d1d628042e23deccc110ed9f112c0`.
- Your directory for working copies: `.runs/review-whole/`.

## Your stage, method and variant

- Method: read `.the-way/task-cycle/review/SKILL.md` whole (`review-change`) and, since this is the review of
  the whole change, `whole_change.md` beside it, and each other file the method names only when the step
  that names it comes.
- Variant: **the whole change**.
- Range: base `cfdbd267dbbdb7f59fb34d86e436bafb204e05ef` (`origin/main`) to head
  `1e21575d248ef294a45953175c7301ec18d63d57`, three commits (`b301cbe9`, `763b5363`, `1e21575d`), 24 files.
  Compute the diff yourself (`git diff cfdbd267..1e21575d`, `git log cfdbd267..1e21575d`) and confirm
  `git rev-parse HEAD` is the head named here.
- Route: one author without a plan, no spec, no slices — so no blocking finding comes from a slice; name that
  in your report. The author's class is `strongest`.

## What you review against

- The frozen task: `.runs/task-cycles/ekran-postaci/task.md`. Read it whole: *To do* items 1–12, the
  questions and their answers, *Decisions in play*, the 13 accepted rows of *Settlements to record*,
  *Out of scope*. It was accepted on 2026-11-20; item 12 was added by the day advisor for the human on
  2026-11-21 and the cycle takes it as part of the task. Judge the coverage of every item and every
  settlement row, and the fidelity of the change and of the foundation entries to their sources.
- The author's report: `.runs/task-cycles/ekran-postaci/reports/author-report.md`. It is a set of claims to
  verify, not evidence.
- The task cites the foundation at commit `ba67f045`; the base is later. A decision whose present sentence
  differs from the task's quotation is judged against its present sentence, and the difference named.
- Decisions the task marks „Bez zmiany" must be unchanged in their binding sentences (among them D-200, D-192,
  D-217, D-218, D-244, D-245, D-287, D-282, D-280, D-243, D-52, D-27, D-189, D-246, D-416, D-39, D-44, D-38,
  D-396, D-421, D-389, D-419). The task allows the cycle to write sentences into D-199, D-40, D-271, D-272 and
  D-418 and to settle item 12's line with the sentence of the entry that holds it; the author also
  changed D-201 and D-215 and wrote D-445, D-446 and D-447 — judge each against the task and the settlements.
- You select your own foundation and guidelines by "Reading the foundation" in
  `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`, from the parts the
  change touches (`browser-view`, `simulation`, `product-foundation`, `agent-workflow`'s `guidelines/**`),
  write your own index into `.runs/review-whole/` and state in your report how many decisions you read whole.

## The answers of the cycle's two questions at start

- Trust boundary: **yes**. The part map names `assets/icons/**` (files from outside) as a trust boundary of
  `browser-view`, and the change adds `assets/icons/cultist.svg` from game-icons.net. Check crafted input at
  that boundary: the content of the SVG (nothing but one path, no script, no external reference), its
  agreement with `tests/invariants/test_icon_file_content.py`, `test_icon_credits.py` and D-27, the credit
  line it gets in „Autorzy grafiki" (author and title from the source, not from memory — the author read
  them at `https://game-icons.net/1x1/lorc/cultist.html`), how the view draws it (as a mask, with no markup
  from the data), and the new data fields of the archetype that carry the file's name.
- Irreversible operation: **no**. The screenshots lie in the public repository `mariusznazar/screenshots`
  as D-418 and D-419 settle.

## Things to look at in particular

- The look is the task's measure (its acceptance criterion is the human's judgment of the side-by-side
  screenshots of the old Loop's screen and loop2's after the change); code inspection does not establish
  rendered appearance. The author's screenshots (window 1600 × 1000), each a link to a file in a commit of
  the public repository `mariusznazar/screenshots`:
  1. old Loop, 31 October: `https://github.com/mariusznazar/screenshots/blob/2bd7b8dc2a5729c8680604685b98e8695f1d7cbe/loop2/ekran-postaci/loop-postac-31-pazdziernika.png?raw=true`
  2. loop2, after death, trees folded: `…/loop2-postac-po-smierci.png?raw=true`
  3. loop2, camp, a tree open: `…/loop2-postac-oboz-drzewo.png?raw=true`
  4. loop2, an earning loop with the waiting mark: `…/loop2-postac-petla.png?raw=true`
  5. loop2, the run screen of a solved map after item 12: `…/loop2-przejscie-rozwiazanej-mapy.png?raw=true`
  (the same directory and commit for 2–5). If you can open and see images, check that each shows what the
  author says and look for faults of look the tests cannot see (spacing, overflow of the narrow left part,
  the figure standing as a sticker, the bar's visibility, the frame); if you cannot, say the screenshots
  stayed unchecked by you.
- The author's own open points: the frame's outline in `divider` (the styleguide lists the frame of a window
  in `divider` as an open question for the human), the changes to D-201 and D-215 which are outside the
  task's *Decisions in play*, the thickness of the practice bar (4 px against the header's 2 px, a departure
  the author named), the screen's own copies of the shared column rule and of the figure's frame rule (kept
  out of the shared rules because D-421 is „Bez zmiany").
- What the author left unread, which you must not take as read: the glossary (not read); the old Loop's
  `LoopBlock.tsx` and `src/sim/data/archetypes.ts`; sections „Scene" and „Screen of a map run and the
  end-of-run window" and „The gate, test tools and the local start" of the decision log read through the
  index's binding sentences only; the invariants of `browser-view` and `simulation` read by heading, whole only
  seven of them. The author also reports that the container tests for the new icon
  (`tests/invariants/test_loop2_container_icons.py`, `tests/deploy/test_loop2_image_icons.py`) and
  `check_instructions.py` did not run.
- The old Loop for comparison, read only: the repository `the old Loop's repository (a sibling checkout)`, branch `origin/test`
  (715026e), `src/components/probe/CharacterScreen.tsx`, `LoopBlock.tsx`.

## Rules for the checks you run

- Run **no full gate**: not bare `npm test`, `npm run test:all` or anything that runs every test; the user's
  instruction for this cycle is that the full gate never starts without a signal from the day advisor, and
  CI runs it later. Focused checks are yours to run where a finding needs them: `npm test -- <one file>` runs
  exactly one file; `python -B .the-way/elements/common/foundation_check.py` (no switch). Every check you
  report carries its command and its exit code; a check you did not run is named as unchecked.
- `cycle.md` and the other files of the cycle's record directory (`.runs/task-cycles/ekran-postaci/`), other
  agents' handoffs and reports, are not yours to read except the frozen task, the author's report and this
  handoff.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your report

- Write it to `.runs/task-cycles/ekran-postaci/reports/review-whole-report.md` (the name begins with the role,
  never with `report`). That file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it);
  this is the case the harness's note about subagent reports leaves open. Where the write is refused all the
  same, return the report whole as your answer.
- Its first line is `PASS 1e21575d248ef294a45953175c7301ec18d63d57`, `FAIL 1e21575d248ef294a45953175c7301ec18d63d57` or
  `questions`. Then everything the method asks: graded findings, each with its place in the code, its grade,
  whether it is within the task or outside it, and — for a blocking finding — whether it contradicts the
  settlements; the Minor findings within the task listed apart; the checks you ran with command and exit code;
  the number of decisions read whole; your reaches beyond what you selected; **Unread material** (what
  this handoff names, or your own selection, that stayed unread or was read in part, or `none`); **Searches not
  found or unclear** (each thing you looked for and did not find or found unclear, or `none`); and the line on
  your working copies, where each stood and that it was removed.
- Return to the orchestrator the report's first line, a one-line check result naming what failed or did not
  run, and the report's path.
