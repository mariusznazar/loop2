# Handoff - correction 1 after the human's remarks on the request, task `katalog-map`

You make the correction of an open request of a task cycle of the-way, as the one author of this correction. The human's remarks, relayed by the day's advisor, bind you; they are not
yours to second-guess, but where one cannot be done as written, say so in your report. Questions that block the work go to the orchestrator, never to the human.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`, head `720d1d2a` (confirm); the request is https://github.com/mariusznazar/loop2/pull/177.
  Commit by path (`git add <path>...`, never `-A`, `.`, `-a`), messages in English in the repository's style, push nothing to the product repository (the orchestrator pushes).
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant "a correction for the human's remarks". Read it whole; read a file it names only when its step comes.
- The remarks, word for word: `.runs/task-cycles/katalog-map/reports/correction-1-remarks.md` (read whole). The frozen task: `.runs/task-cycles/katalog-map/task.md`; the plan: `.runs/task-cycles/katalog-map/plan.md`.
  The earlier reports of the cycle in `.runs/task-cycles/katalog-map/reports/` are yours to read where this handoff names them: `executor-10-report.md` and `executor-10b-report.md` (the look of the catalog and the comparison with the old Loop,
  in plain words, place by place), `executor-9-report.md`, `fix-whole-report.md`, `review-whole-report.md` (the Minor findings 4–9) and `review-whole-fix-report.md`.
- The old Loop, read-only: its code with `git -C the old game's repository show feat/archetypes:<path>` (never check out; find the card of a map with `git -C the old game's repository ls-tree -r --name-only feat/archetypes | grep -i probe`; the catalog is `src/components/probe/MapCatalog.tsx`)
  and its two screenshots (open them with the image reading tool): `the old Loop's screenshot of the Maps screen in the author's notes` and `.../loop_03_mapa_skraj.png`.
- Your directory for working copies: `.runs/corrector/`. No full gate (`npm test` with no file argument) - the orchestrator runs it. Focused checks only, each with its command and exit code in the report.

## What to do (the human's remarks, the orchestrator's reading; where they differ, the remarks hold)

1. **The right-hand card of a map and three places of the catalog - FIX in this request.** The criterion of the task is a set of screenshots on which the old Loop is not the clearer one; the old Loop is a floor, not a ceiling. Fix every place that the earlier
   comparison names as better in the old Loop: (a) the card of a map: a big title with a state tag, one short demand sentence, the table „Żąda" and „Teren", the button at the top; (b) a magnifying glass in the search field; (c) the view tabs looking like buttons at once (boxed);
   (d) the picked row filled, with a green bar. Read the old card's code and screenshot, and the current card (`src/browser/view/maps-screen.tsx`, `map-lines.ts`, `src/browser/maps-screen.css`), and make the new card at least as clear, in the product's own roles, tokens and controls
   (read `guidelines/styleguide-browser-view.md` whole and `src/browser/AGENTS.md`; no new token: if no existing role gives the green of the old bar, use the nearest existing role and say in your report what you used and why, and what the old Loop used). Keep what is better in this game
   (the readable state circle, the facts on a line of their own, the counters). Keep the number of the lair („niedźwiedź: n ze zdrowie") in the row and in „Czyha". The card must keep working in the phone layout at 360 px (D-396, D-282). A magnifying-glass icon must come from game-icons.net
   (D-27): there is none in `assets/icons/` today; prepare it as the other icons are (see how `assets/icons/bear-head.svg` was added: commits `7a132107`, `23d8c7bb`, `5766c306`: the file prepared like `wolf-head.svg`, its credit in `src/browser/view/credits.ts`, the title in `tests/invariants/test_icon_credits.py`, the environment fact
   for the title and `icon-credits`' *Rests on*, through the foundation skills). **The decision that the card realises today changes together with the code:** the decisions on the card (D-327), on the right area and the catalog (D-325), on the picked row (D-331) and what else you find that says how these look (read them whole, and search
   the foundation by the words your change adds) - write them through the project skills (`.claude/skills/the-way-record-decision/SKILL.md` and the others, which point at `.the-way/elements/*/skill/SKILL.md`; and `.the-way/task-cycle/skill/foundation_step.md`); the styleguide section „The screen Mapy" follows through
   `.the-way/product-guidelines/styleguide/SKILL.md`. Tests: the component and screen tests follow, with hand-written expectations.
2. **„z" / „ze" before a number (a) - FIX.** The rule in `src/browser/view/counted-name.ts` (`withPreposition`) is wrong for 7 and 70-79 (and 17, 700-799): Polish says „z siedmiu", „z siedemdziesięciu", „z siedemnastu". Replace the rule by one that follows the first spoken word of the number:
   „ze" where it begins with „sze" (6, 16, 60-69, 600-699), with „st" (100-199) or is zero („ze zera"), „z" otherwise; for 1000 and more by the first spoken word of the number. One function, rows of tests for 0, 1, 2, 6, 7, 8, 12, 16, 17, 24, 50, 60, 69, 70, 79, 100, 120, 199, 200, 600, 700, 1000, 6000, 7000.
   Update the styleguide sentence and the decisions that describe it, if any (search the foundation for „ze"), and the test that holds it.
3. **The fold of the solved maps (b) - FIX** (the player feels it). Today the fold row is dim and cannot be used while the picked map stands in the folded group and while a search is typed. Make it work: the fold row stays enabled and the player's click folds or unfolds the group; the picked map's row stays visible
   (above the fold row) when its group is folded, so D-331's reason (the picked row with its bar is seen) holds; a typed search keeps showing the maps that match, and the fold row there folds or unfolds the matches the same way. Where this changes a sentence of D-325/D-331, change the sentence with the code. Tests and the styleguide follow.
4. **A decision that calls the instrument's mode "a map check" (d) - FIX (one sentence).** D-438's third paragraph calls the mode `progression` "a map check" while D-448 and D-428 use that name for the overlay mode; reword that sentence in D-438 so that it names the mode `progression` as the mode (not a map check), and re-quote the test line that holds it
   (`tests/balance/progression.test.mjs`, a `decision:` line near line 240) in the same change. Through the decisions skill.
5. **NOT yours** (the human lets them through or leaves them to later tasks): the base-run of the tests (CI is green), the sentence of the skill `loop2-balance` on the measure (task 4 changes it), the model of the earlier reviews, the earlier reading of the review. Do not touch them.
6. Screenshots (the task's criterion): after the change, take again the pairs of the human's comparison with the old Loop - window 1600 x 1000, a new game, and with the first map picked (the same states as the old screenshots) - and the three views, a search that finds and one that finds nothing, a solved map picked with the group unfolded and the group folded, the lair with its number,
   and the phone layout at 360 px (the list, a map picked, the card, the three views, the search) as `loop2-play` (`.claude/skills/loop2-play/SKILL.md`) and `.the-way/task-cycle/change/ui_check.md` give; look at each image before pushing and keep any email address or account name out; push them as D-418 and D-419 settle to `mariusznazar/screenshots`,
   branch `loop2/katalog-map` (fetch it first; add a new commit; never force-push; never `main`), directory `loop2/katalog-map/`, with the same file names as before for the same states (and new names for new states, e.g. `card-1600-*.png`); the old Loop's two images stay. In your report say in plain words, pair by pair, what the old Loop still does better, if anything, and what this game does better - the human reads it.
   Run the browser checks of `loop2-play` ("Check the phone layout": nothing scrolling to the side, nothing out of its frame, no control under the touch minimum) in both layouts.
7. Focused checks to run and report: the tests of every file you change, `npm test -- tests/view/maps-screen.test.mjs`, `map-catalog.test.mjs`, `catalog-lines.test.mjs`, `maps-record.test.mjs`, `counted-name.test.mjs`, `map-lines.test.mjs`, `tests/view/icons.test.mjs`, `tests/balance/progression.test.mjs`, the invariants `test_icon_credits.py`, `test_icon_file_content.py`, `test_content_identifiers.py`, `test_browser_view_token_values.py`,
   `test_browser_view_focus_outline.py`, `test_design_token_sources.py`, `test_design_token_contrast.py`, `npm run --silent typecheck`, eslint and prettier on the changed files, `python -B .the-way/elements/common/foundation_check.py` (no flag) and `python -B .the-way/instruction-files/check_instructions.py` (exit 0 expected for both).
8. Report path: `.runs/task-cycles/katalog-map/reports/correction-1-report.md` (the report file is the input of the cycle's scripts, the case Claude Code's refusal of files named `report...` leaves open). First line: your status (`done`, `done with concerns`, `questions`, `returned`, `blocked`).
   It holds: for each remark what you did, each check with command and exit code, your own-work check, the commits, the screenshots' links and the plain-words comparison (6), a note of each foundation entry you wrote or changed with the mark `the cycle's`/`projected`/`row n` as `foundation_step.md` gives and one sentence of its meaning in English and Polish, **Unread material**, **Searches not found or unclear** (each `none` or the items).
   Return status, commits, a one-line check result, the report path, questions.
- `cycle.md` and other files of `.runs/task-cycles/katalog-map/` not named here are not yours to read.

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
