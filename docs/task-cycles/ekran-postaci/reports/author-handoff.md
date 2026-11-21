# Handoff — the one author of the change, task `ekran-postaci`

## Who you are working for

The person who requested this cycle has delegated every intermediate choice to the orchestrator and,
through it, to you where your method gives the choice to you. Nothing you decide is the human's
approval; the human reviews the pull request at the end. You never ask the human anything: questions go
to the orchestrator in your report (status `questions`).

## Where you work

- The task's worktree, the root of everything you do: `.runs/worktrees/ekran-postaci`
  (branch `task/ekran-postaci`, base `cfdbd267dbbdb7f59fb34d86e436bafb204e05ef`, which is `origin/main`).
  Run every command from that directory. Never work in the main checkout `the main checkout of the repository`.
- The pinned the-way is `.the-way` of that worktree, at `19e5774aed6d1d628042e23deccc110ed9f112c0`. Its
  scripts run from the worktree's root as `.the-way/<path>`.
- Your directory for working copies: `.runs/author/` (directly under the ignored `.runs/` of the
  worktree). You are the one author; no other agent writes in this worktree while you work.

## Your stage, method and variant

- Method: read `.the-way/task-cycle/change/SKILL.md` whole (`make-change`), and each file it names, one
  beside it included, only when the step or variant that names the file comes.
- Variant, in the words of its row: **the whole change as the one author**.
- Boundary: you make the whole change of the task, with its tests, its foundation entries (the
  foundation step: read `.the-way/task-cycle/skill/foundation_step.md` whole and, for each element you
  write an entry of, the `SKILL.md` of that element at the path that file gives) and the own-work
  check, commit it by path, and return before any review. You do not start the next stage, you do not
  ask the human for approval, and you do not run the return step (the orchestrator resumes you for it
  later).
- Where the change touches a user interface, read the styleguide's example of the order of work as an
  example, as your method says.

## The task, frozen

- The frozen task: `.runs/task-cycles/ekran-postaci/task.md` (read it whole: *To do* items 1–12, the
  questions and their answers, *Decisions in play*, *Settlements to record* with its 13 accepted rows,
  *Out of scope*). It was accepted for the cycle on 2026-11-20; item 12 was added by the day advisor
  for the human on 2026-11-21 and the cycle takes it as part of the task.
- There is no spec and no plan: the task leaves no open design choice. The choices the task leaves to
  you are choices of how to make what it settles; make each and name it in your report with the way
  you rejected and why, so that the orchestrator enters it in the cycle's questions table. Among them:
  the wording and the role of the line of practice on the screen of a solved map's run (item 12: it
  must say plainly what that practice is and that the run does not pay it, in the vocabulary of
  practice the screen Postać uses, and the sentence of the foundation entry that holds that line
  goes with it), where the practice waiting in an earning loop is read from for „+{n} pkt czeka w pętli",
  the name and type of the archetype's new field, the markup of the folded row of a tree and its
  keyboard handling, and the picture of the figure.
- The task cites the foundation at commit `ba67f045`; your base is later (the merge of the request
  that added the model of actions and items, with D-443 and changed entries). Before you rely on a
  decision, read it as it stands in your worktree's `foundations/decisions.md`; where its present
  sentence differs from the task's quotation, name the difference in your report.

## The answers of the cycle's two questions at start

- Trust boundary: **yes**. The part map names `assets/icons/**` (files from outside) as a trust boundary
  of `browser-view`, and the change adds one icon there, `cultist` from game-icons.net, with its line
  in „Autorzy grafiki". Every review of this cycle checks that boundary; make the file exactly as
  `tests/invariants/test_icon_file_content.py` and `test_icon_credits.py` and D-27 require, and take the
  icon from game-icons.net (the old Loop keeps the same file at
  `public/icons/cultist.svg` of the branch `origin/test` (715026e) in the repository
  `the old Loop's repository (a sibling checkout)` — read it there with `git -C the old Loop's repository (a sibling checkout) show origin/test:public/icons/cultist.svg`;
  take its author and licence line from game-icons.net itself, never from memory).
- Irreversible operation: **no**. The screenshots of the request go to the public repository
  `mariusznazar/screenshots`; D-418 and D-419 settle that and say you push them yourself, with the `gh`
  account of its owner, with no step of the human.

## What you read (named by the orchestrator)

Foundation (read each decision whole as it stands at your base; then select further by "Reading the
foundation" in `.the-way/elements/common/way_of_working.md`, writing your own index into `.runs/author/`):

- The decisions of the task's *Decisions in play*: D-199, D-40, D-272, D-271, D-389, D-418, D-419,
  D-200, D-192, D-217, D-218, D-244, D-245, D-287, D-282, D-280, D-243, D-52, D-27, D-189, D-246, D-416,
  D-39, D-44, D-38, D-396, D-421.
- The decision log's sections that bear on the work: „Browser view: screens, navigation and their
  code", „Look of the browser view: styleguide, controls, pictures and fonts", „Character skills and
  nature energy", „Earning loop and time away", „Screen Mapy and Siedziba", „Scene", „Screen of a map
  run and the end-of-run window", „The gate, test tools and the local start" (where the screenshots
  lie); the invariants of the parts `browser-view` and `simulation`; the part map; the glossary.
- The decision that holds the line „Wprawa w tym przejściu" of the screen of a map run (item 12): find it
  with a search of the log; it changes with the wording you choose.

Guidelines, each whole:
`guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-simulation-module.md`,
`guidelines/coding-content-data.md`, `guidelines/coding-saved-game.md` (only if you touch the saved game
state — the task adds nothing to it), `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`,
`src/browser/AGENTS.md`.

Skills of the product, as `AGENTS.md` names them: `.claude/skills/loop2-scene-art/SKILL.md` (the figure
is a picture of the scene, and the three checks of a new picture or effect apply to it) and
`.claude/skills/loop2-play/SKILL.md` (to run the game and operate it in a real browser).

Code you will touch or read (starting points, from the task): `src/browser/view/character-screen.tsx`,
`character-entry.ts`, `character-skills.ts`, `team-lines.ts`, `src/browser/character-screen.css`,
`src/browser/view/camp.tsx` and `camp-picture.ts` (the figure of the mage at the campfire, whose sprite
sheet, size and beat the new figure shares), `src/browser/sim/data/scene.ts`,
`src/browser/sim/data/archetypes.ts`, `src/browser/view/credits-section.tsx`, `src/browser/styles.css`
(`screen-area`), the screen of a map run that holds the line „Wprawa w tym przejściu", and the tests
`tests/view/character-screen.test.mjs`, `tests/view/character-skills.test.mjs`.

The old Loop, read only, for the threshold the task sets (never write in it): the repository
`the old Loop's repository (a sibling checkout)`, branch `origin/test` (715026e), `src/components/probe/CharacterScreen.tsx`,
`LoopBlock.tsx`, `src/sim/data/archetypes.ts`. The old screenshot:
`the old Loop's screenshot of the character screen, kept in the author's notes`
(1600 × 1000, 31 October; a new character after a run ended in death, practice zero, trees folded).

## The standard the human measures against

The task's acceptance criterion: on the side-by-side screenshots of the old Loop's character screen and
loop2's after the change, the human does not point to the old Loop as the better. The old Loop is a
threshold, not a template (task item 11, questions 6, 7 and 12): you may depart from the set where it
comes out better, only within what the human chose (words, proportions, look; the clearing under the
figure only if on your screenshot the figure looks like a sticker), never from a decision the task marks
„Bez zmiany", and you show every departure on the screenshots and say in your report what you departed
from and why. The sentences you write into D-199, D-40, D-271 and D-272 say what the screen really
shows after any departure.

## Screenshots (items 10 and 12 of the task)

Make them yourself with the game run on this computer (`loop2-play` skill; the window 1600 × 1000):

1. loop2's character screen in a state as like the old screenshot as the game allows (a character
   after a run ended in death, practice zero, trees folded);
2. a character in the camp with a tree open;
3. a character in an earning loop (with the „+{n} pkt czeka w pętli" mark where it can appear);
4. the screen of a solved map's run after the item-12 change;
5. the old Loop's screenshot `loop_13_postac.png` itself, pushed as the left half of the pair.

Where they lie and how: D-418 and D-419 (read `.the-way/task-cycle/change/ui_check.md` for the order of
work): the public repository `mariusznazar/screenshots`, directory `loop2/ekran-postaci/`, on a branch
named `loop2/ekran-postaci`, never on `main`; you push with the `gh` account of that repository's owner. No
screenshot goes into the repository of the game, into `.runs/task-cycles/` or into `reports/`; your
report holds the address of each image, as a link to its file in a particular commit of that repository
with `?raw=true` appended, and what each shows.

## Rules of the product you must keep

- Commit by explicit path, `git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`;
  commit messages in English in the form of the repository's earlier commits (`type: :emoji: text`, with
  the decisions the commit bears at the end); write the message with `git commit -F <file>` where it holds
  quotes or backticks.
- **Run no full gate.** Do not run bare `npm test`, `npm run test:all` or anything that runs every test:
  the full gate is the orchestrator's, and the user's instruction for this cycle is that it never starts
  without a signal from the day advisor. Focused checks only: `npm test -- <one file>` runs exactly one
  file; ESLint, Prettier, the typecheck and the size rules of the product on the files you touch;
  `python -B .the-way/elements/common/foundation_check.py` (no switch) after you write foundation
  entries. Every check you report carries its command and its exit code.
- Code, identifiers, docstrings and comments in English; strings the game shows are Polish as the task
  gives them.
- `cycle.md` and the other files of the cycle's record directory (`.runs/task-cycles/ekran-postaci/`),
  other agents' handoffs, reports and findings, are not yours to read except the frozen task and this
  handoff.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your report

- Write it to `.runs/task-cycles/ekran-postaci/reports/author-report.md` (the name begins with the role,
  never with `report`). That file is the input of the cycle's scripts (`task-cycle/remarks_check.py`
  reads it); this is the case the harness's note about subagent reports leaves open. Where the write is
  refused all the same, return the report whole as your answer.
- Its first line is your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or
  `blocked`), then everything your method asks: the commits, each check with its command and exit
  code, the own-work check, the weakest-point check, the choices you made with the way you rejected,
  the departures from the old Loop's set and why, the addresses of the screenshots, **Unread material**
  (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found
  or unclear** (each thing you looked for and did not find, or found unclear, or `none`), and the
  line on your working copies: where each stood and that it was removed.
- Where a source this handoff names could not be read, or your selection of the foundation fell short
  of what the work reached, say so under the reach; the orchestrator adds it to later handoffs.
- Return to the orchestrator its status, its commits, a one-line check result naming what failed or did
  not run, and the report's path.
