# Handoff — correction 1 for the human's remarks on the request, task `pierwsza-mapa-bez-loterii`

You are the one author, resumed. The request is open: https://github.com/mariusznazar/loop2/pull/95. The human's remarks (a comment of the repository owner's account, relayed by the day adviser, 2026-11-14) bind. Method: `.the-way/task-cycle/change/SKILL.md`, variant **"a correction for the human's remarks"**; read what it names when its step comes. Work in the worktree `.`, branch `task/pierwsza-mapa-bez-loterii`. Do not push the branch (the orchestrator does). Report to `.runs/task-cycles/pierwsza-mapa-bez-loterii/reports/correction-1-report.md`, in the form your method gives, and return the short form.

## The remarks, word for word

> The branch conflicts with main (loop2#94 merged meanwhile): merge main into it and resolve the conflict as part of this correction.
>
> Fix or let through:
>
> 1. Check them in this request, since the round of correction goes anyway for the merge: look at the program editor in a game where nothing is solved yet and at the screen of a map run on Skraj lasu in a real browser (the `loop2-play` route), with screenshots in the description as D-357 and D-358 give. These are the first screens a new player meets.
> 2. Let it through: the author read the four decisions whole afterwards and found no sentence made false, and the reviewer's search by meaning found none either.
> 3. Let it through, with no task: the gap under the rule that no file of a part imports a file of another part is already settled in the foundation review of 2026-11-13 (F-7) and waits in the queue as the task on the part map.
>
> You accept by merging: items 4–9 accepted.

Items 2 and 3 need nothing from you; items 4–9 are accepted as they stand.

## Part A — finish the merge, which is under way and stopped on one conflict

The orchestrator has run `git merge --no-ff origin/main` in the worktree (never rebase). The merge stopped with one conflict, in `foundations/decisions.md`; `foundations/glossary.md`, `foundations/invariants.md`, `guidelines/coding-saved-game.md` and `src/browser/sim/saved-game.ts` merged without a conflict and are staged. `main` gained 14 commits, the request #94 (fixes of decisions of the game and the screens found false by the foundation review, new D-393 to D-396, a narrowed D-136, a changed saved-game guideline and a changed comment of the version constant).

The conflict is a clash of numbers: main took D-396 for „In which browsers and from which window size does the game have to work?”, and this branch wrote its own D-396 („Which map does a new game open on?”) and D-397 („What numbers does the map Skraj lasu have?”). Resolve it so:

1. Main's D-396 stays exactly as main has it, in its place; this branch's two entries take the next free numbers after the highest on main — D-397 for „Which map does a new game open on?” and D-398 for the numbers of Skraj lasu — in the order of the numbers in the log. Their text stays as it is, apart from the numbers; read main's D-393 to D-396 and the changed D-136 whole before you decide where the text of ours needs a word changed because main's changed text now says something else (and name each such change in the report).
2. Rewrite every reference to the old numbers of ours. `grep` finds them in `foundations/decisions.md`, `foundations/invariants.md` (the *Derives from* of `first-map-stock` and `first-map-balance`), `tests/invariants/test_map_run_tiles.py` and `tests/sim/data.test.mjs`; check the whole branch's changed files for more (the title in a test name, a comment). A reference to main's D-396 stays.
3. Check what the merge brought against your work: the version constant is still 6 and its comment, changed by main, still reads true for 6; the saved-game guideline's new sentence fits; the glossary's change bears on no word of yours. Where main's text of an entry you corrected (D-121, D-124, D-330, D-378, D-388, D-19) changed too, say whether your correction still stands.
4. Run `python -B .the-way/elements/common/foundation_check.py`, `npm run typecheck`, `npm run build`, and the focused tests your files reach (as the testing guideline gives): each with command and exit code in the report.
5. Commit the merge (`git add` by explicit path, then `git commit` with the message `Merge remote-tracking branch 'origin/main' into task/pierwsza-mapa-bez-loterii`), and check `git status` is clean after it.

## Part B — item 1: the two screens in a real browser, with screenshots shown

Run the game by the route of the project skill `.claude/skills/loop2-play/SKILL.md` (read it whole) on the merged tree, in a browser session of your own, and look at:

- the program editor, with no map run, in a game where nothing is solved yet (a new game; the resource choice of a rule's condition target should offer four resources — look at what it actually offers);
- the screen of a map run on Skraj lasu (send a character to it from a new game and look at the screen of the run: its heading, the goal in numbers, the world and the program, and the first minutes of the run; describe motion in words only).

Take a screenshot of each and publish them yourself, with no step of the human, by the section "Show a screenshot to the human" of that skill, which D-357 and D-358 set: the public repository `mariusznazar/screenshots`, directory `loop2/pierwsza-mapa-bez-loterii/`, on the branch `loop2/pierwsza-mapa-bez-loterii`, which already exists there (take it with `switch`, as the skill gives; never push to `main`; the clone stands in `.runs/`, delete it after). Look at every screenshot before you push: the made-up account of this start only, an address at `example.test`, no real address, password or token. Beside each screenshot in your report give the embed link by the commit that holds it, as the skill gives. Close the browser and stop the local start when you finish (`npm run local:stop`), delete `.playwright-cli/` if you made it, and do not leave a screenshot file in the repository or in the cycle's directory.

If you find a defect on either screen, fix it only if it belongs to this change; otherwise name it in the report as a finding outside the task, with the screenshot, and do not fix it.

## Not yours

- The whole gate (`npm test` with no argument): the orchestrator runs it, and only on a signal of the day adviser, because the machine is short of memory and another cycle's gate may be running. For the same reason run your focused checks one after another, never two Node test processes at once, and do not start the whole `tests/sim` and `tests/view` sets unless a merge result needs it — then say why in the report.
- Do not touch items 2 and 3 of the remarks; do not write a task for them.
- A choice the merge forces that you cannot settle from the remarks, the foundation or the code is a question to return, not a guess.
