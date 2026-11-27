# Handoff — the return step over correction 1 (task rana-i-opatrunek)

You take the return step again, over the correction only, as a fresh agent of the type `the-way-stage` with `make-change` (as the agent of the return step: read `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md` whole, and `.the-way/task-cycle/change/SKILL.md` sections 3 and 6; when you write or change an entry of an element, that element's `SKILL.md`, by the path `foundation_step.md` gives). The first return step is `reports/return-step-report.md` (commit `85a623e4`); read it for what it already compared.

- Worktree `the worktree's root` (branch `task/rana-i-opatrunek`); the range of the correction is `83204edc5025b9f6ff60feb9c4b8f530c585edb7..26c0209e8a9bb9b882fce390ab61b12300562059` (`git rev-parse HEAD` shows the head `26c0209e…`): `2998b1aa`, `b04a9f2f` (the type `Repertoire` carries the predispositions; `actionInRepertoire` judges an item action by its pair), `dbc931e8` (a sentence in `guidelines/coding-saved-game.md`), `26c0209e` (the text of the row „Teraz” wraps in the phone layout). Compute the diff yourself. The remarks of the correction (they bind and say what it was to do): `reports/correction-1-remarks.md`; the parts' reports `reports/correction-1a-report.md`, `…1b…`, `…1c…`; the correction's review `reports/review-correction-1-report.md` (PASS; its four Minor and two out-of-scope findings are for the request's list; **they are no foundation entries and you write none for them**).
- Your directory for working copies: `.runs/return-step-2/`. Report: `.runs/task-cycles/rana-i-opatrunek/reports/return-step-2-report.md` (the file is the input of the cycle's scripts). The cycle record and other agents' files of the record directory are not yours except those named here. Commit by path, in English, no push; run `python -B .the-way/elements/common/foundation_check.py` **without** the switch after each change (exit 0) and `python -B .the-way/instruction-files/check_instructions.py`. Never run the whole suite.

## What you compare (only what the correction touches)

1. D-120 (its binding sentence says an action is open when the skill that its **pair** of verb and target grows is among the predispositions; the correction makes the repertoire judge by the pair): compare it and its *Verification* with the code and the new tests (`tests/sim/action-targets.test.mjs` and `tests/sim/repertoire.test.mjs`); the earlier return step left the *Verification* of the entries as they stood in the foundation, so the pair of examples and the clause `tests:` of D-120 must name what the tests now hold (the second recipe item laid in a test: a rule „Wytwórz — Opatrunek” refused for a character without the tree while another target of „Wytwórz” stays open). Correct what no longer matches.
2. The other entries that speak of the repertoire or of the check of a rule against it: D-126, D-193, D-195, D-196, D-443 and the glossary entry `repertoire` (and `predisposition`): compare each with the new type (it carries the predispositions it was derived from; a derived field, not saved) and correct what no longer matches. The decision that the guideline sentence of the correction rests on is D-195 and D-206: read them, say whether the sentence of the guideline needs an entry (the review's Minor finding 2 says D-206 speaks of the version „of its shape” and none of the entries the rule names covers the raise for an old save that would never get something new); **write an entry or change D-206 only if the rules of `return_step.md` call for it** (a choice that binds after the merge, from the human's remark, which asked for the sentence in the guideline and for no entry): the human's remark settles the guideline sentence; where you find no rule that calls for an entry, write none and say why.
3. The row „Teraz” (D-334, D-335, D-336, D-396, D-43): compare the decisions with the CSS as the correction left it (the text wraps inside the fixed height of the row in the phone layout, where it was cut with an ellipsis): correct a decision that now says the text is cut in the phone layout, or say that none does.
4. Your own search by the names and words the correction adds (`predispositions`, `pairOpen`, a `Repertoire` with a field, the wrapping of `.now-text`), and the part map of the parts the correction touches (`simulation`, `browser-view`, `agent-workflow`): the foundation check claims every tracked file.

Report as the record's *Return step* gives it: what no longer matched and its correction, or none; decisions, invariants, environment facts, glossary terms, part-map changes written or changed (identifiers or none); each check as command and exit code; **Unread material**; **Searches not found or unclear** (`none` where none); working copies. If you commit nothing, say so.

## Working copies (word for word)

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

