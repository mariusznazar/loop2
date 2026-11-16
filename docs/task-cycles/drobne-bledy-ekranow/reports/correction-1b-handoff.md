# Handoff — correction 1, part B (documents), cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything; a question goes to the orchestrator in your report with status `questions`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`, head `8b068a5b` (take the full hash from `git log -1`). Your commits come after it. Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **a correction for the human's remarks** on the open request (https://github.com/mariusznazar/loop2/pull/146). Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole; your variant, in the words of its row: "a correction for the human's remarks" — each remark binds; the report holds each remark as made, and how. You have no skill tool.
- The human's remarks, word for word (they were given by the adviser of the day on the human's behalf): `reports/correction-1-remarks.md` (`.runs/task-cycles/drobne-bledy-ekranow/reports/correction-1-remarks.md`). Read them whole; this handoff gives you the part that is yours.
- The frozen task: `.runs/task-cycles/drobne-bledy-ekranow/task.md` (the task binds where the remarks say less); the record's reports of the earlier work are in `reports/` (named below where you need them).
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/correction-1b-report.md`. Your directory for working copies: `.runs/correction-1b/`.

## Working copies (first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## Your part of the remarks

You do the **documents** of the human's remarks: **items 3, 5 and 6** of "Also in this round", and the sentences that part A of the correction made untrue or incomplete. Part A (code and tests, commits `4c6b4496`, `63f615e7`, `0c539660`, `786a4ca0`, `8b068a5b`, head `8b068a5b793493bd344f55f6bcb65447ef9185c7`) is done; its report is `reports/correction-1a-report.md` — read its sections "What the documents need from you" and "Extension of 1(c)". You write foundation entries as `task-cycle/skill/foundation_step.md` gives (read it whole; the `SKILL.md` of the element `.the-way/elements/decisions/skill/SKILL.md` for a decision, read as a file); you change only `foundations/decisions.md` and `guidelines/styleguide-browser-view.md` (and, only if a `decision:` line of a test must be re-quoted because a sentence you change leaves it quoting text that no longer stands, that line alone). You change no code and no other test.

1. **Remark 3** — add the test at `tests/view/scene.test.mjs:653` (find it by its title; the line may have moved) to D-319's list of tests (its *Verification*, clause `tests:`), and correct D-319's example that says no test covers a changed target: it is true only for a turn toward another place, which no test covers; say so. Also add part A's new tests where the rule is D-319's (a walk cut by leaving the screen: slice 19's case) if the clause still misses them. Read D-319 whole first.
2. **Remark 5** — `foundations/decisions.md` D-04 (about lines 65-71): its „only from” list names the memory of the end-of-run window but no other memory of the page the view draws from. „A list that says „only from” and is not whole is false; widen it to every memory of the page the view actually draws from.” Find every memory of the page the view draws from by reading the code (`src/browser/view/**`: the folding of rule groups — D-294, the tab „Kronika”/„Teren” — D-346, the filter — D-383, the question of „Zakończ” — D-324, and every other thing the view keeps in the page's memory and draws from: search the view for state kept outside the game state and the save, such as module-level variables, `useState` in the game view, session or local storage, and the decisions that name them), and name each in D-04's sentence with the decision that settles it; do not invent a source: where the code does not draw from a thing, it does not go in. Keep D-04's sentence otherwise as it stands (the three sources the task added stay).
3. **Remark 6** — `guidelines/styleguide-browser-view.md` (about line 999): „Escape czyta korzeń okna, nigdy dokument (D-285)” cites D-285, the menu „Konto”; cite the decision that settles the Escape of the end-of-run window (D-370, „Escape is read in the window and not on the document”) instead — check in the decision log that it is that one, and that D-285 does not also hold there; keep the sentence's meaning.
4. **Sentences made untrue or incomplete by part A** (from its report; check each against the code at the head and against the decision, and correct only what is untrue or incomplete):
   - D-367's sentence says an effect already running finishes, standing still while the scene does, unless the map run is left or a new one starts; part A made an effect cut by leaving the screen of the run end on `animationcancel`, so it is dropped on the return, as D-317 says of an overdue effect (the human's remark 1(a) binds: „a flight, a dust cloud, a wolf's run or the 2-second return of the light's tint that is cut by leaving the screen of the run plays again from its start on the return — an overdue effect played, which D-317 drops"). Add „or the screen of the run is left” (or the smallest wording that says it) to D-367's sentence and mark the change `the cycle's` in your report with the passage of the human's remark that gives it, quoted (WAY-25). If you find D-367 and D-317 colliding in a way this does not settle, return `questions`.
   - The *Verification* of D-316, D-317 and D-319 (their `tests:` clauses and pairs of examples): add the new cases of part A's tests (the cut of a flight, a dust cloud, a wolf's run and the tint return) where they hold part of a sentence; leave an example only for a part no test holds.
   - Styleguide, section „The scene of a map run”: lines about 775-777 (the return of the tint, without its end by a cut), 824-829 (the effect ends and stands still with the scene, D-367) and 872-874 (the hidden scene's effect of a moment stands on the last frame, which the browser's cancel now ends): bring each to what the code does, keeping the styleguide's style.
   - Styleguide, „A name typed by the player breaks in its row” (about 529-540): its *Good* names only the team row of Siedziba; name the kinds of text it now covers (a character's name, a program's name, a group's name and the account's address, in the places part A's table lists), and say, as the rule's own exception, that the native list of programs (a select) is as wide as its longest option and is not covered; do not decide the design of that select (a cut with an ellipsis or a width cap is the human's decision; it goes to the request as a finding).
   - A sentence for the number with a fraction in a rule's sentence („Temperatura poniżej 36,5 °C”, with the decimal comma of the body row, D-178): add it where the styleguide's „Program editor” rule describes the row of a rule (about 708-713) only if it fits as one clause; do not add a rule.
5. **Re-quoting.** A `decision:` line of a test quotes the start of a binding sentence of a decision, word for word: where you change a binding sentence (D-367, D-04, D-319), run `python -B .the-way/elements/common/foundation_check.py` and re-quote any test line it lists, changing nothing else of the test.

**Checks you run (command and exit code each):** `python -B .the-way/elements/common/foundation_check.py` (exit 0, `0 errors`), `python -B .the-way/instruction-files/check_instructions.py` (exit 0), `npx prettier --check` on any test file you touch. Never run the full suite. Commit with explicit `git add <paths>`; separate commits for the decisions and for the styleguide are welcome.

Your report: as `make-change` gives it for a correction — each remark as the human made it and how it was made, your commits, each check with its command and exit code, one sentence of meaning in English and one in the task document's language for each entry you write or change and its mark (`row <n>`, `projected` or `the cycle's`), the own-work check (the requirement most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material**, **Searches not found or unclear**, reaches beyond the handoff, and the line on working copies.

