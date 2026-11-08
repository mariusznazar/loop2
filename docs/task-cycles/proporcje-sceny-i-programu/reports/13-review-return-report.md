PASS f0421c3b0776986a45da61d1af8b0a8a143bad72

# Review of the return step's commit (task proporcje-sceny-i-programu)

Range `5e814591a904063749c6a0471779e75a4fbc83c7..f0421c3b0776986a45da61d1af8b0a8a143bad72`. `git rev-parse HEAD` = `f0421c3b0776986a45da61d1af8b0a8a143bad72` (matches the handoff). `git log 5e81459..HEAD`: one commit, `f0421c3`. `git diff 5e81459..HEAD`: `foundations/decisions.md` only, +29 -1 (a new D-350 at the end of the log; one added source in the *Origin* of D-166). Read-only: the reviewed worktree was not changed (`git status --short` empty before and after).

Counts: blocking 0, Minor 1, out of scope 0.

## Findings

### Blocking

none

### Minor

**M-1. `foundations/decisions.md:7821-7823` (D-350 *Rejected*, and the last sentence of the rationale at `:7819-7820`) — one reason in *Rejected* says more than D-306 does.**
- *Rejected* says that closing the panel on a fold means "the player would lose the field and the rule being written". The plan's row (`plan.md`, *Choices*, row 2) gives only "D-306 names what closes it; a fold is not one". The part about losing "the rule being written" is the writer's own addition and is not right: D-306 says "each pick changes the rule at once", so a closed panel loses the open field and the player's place in it, not the rule. The binding sentence says "closes no panel and changes no field of it", so the rule's text survives either way.
- The rationale's first sentence passes from D-294 ("folding arranges the player's view of a program and changes nothing the program does") to "changes nothing the player is writing". The inference is sound, but it is stated as if D-294 said it, and D-294 is not in *Relations*. That is right under the template (*Relations* lists the higher decisions the entry serves, and D-294 is a source of an argument), so it is a matter of wording only.
- Why it matters: little. The binding sentences, *Scope*, *Relations* and *Verification* do not depend on it. An agent proposing "close the panel on fold" later would read a cost (a lost rule) that the product does not have, and weigh the option wrongly.
- Suggested wording for the clause: "the player would lose the open field and the place in it". Evidence: `foundations/decisions.md` D-306 (6554-6580) and D-294 (6339-6357) read whole.
- Not blocking: the template (`.the-way/elements/decisions/template.md`, WAY-134) binds the ways in *Rejected* to a source for the decisions written from a row of *Settlements to record*. D-350 is a "cycle's own" entry from a plan choice, and both ways it rejects are the plan's.

## What I checked, entry against code (all matched)

- **D-350 binding sentences against `src/browser/view/rule-list.tsx`.** `renderGroup` (`:590-690`): `panelUnderRow = panelOpenHere && !isFolded && group.rules.some(...)`; for a folded group, or the group's own header, `<div className="rule-list-panel" ref={seatPanel} />` stands right after the header (`:683-685`). The panel is one element moved by `seatPanel` and drawn once through `createPortal(panel, panelHost)` (`:234-240`, `:764`), so a fold does not remount it. "Closes no panel and changes no field" matches the tests below. "Every group at once" matches „zwiń wszystkie” (`:745-749`), which only calls `onFoldedChange`. The entry says nothing beyond the code: it states where the panel stands and that a fold does not close it. It does not claim a drop, a move across a group border or „Dodaj regułę z tym” (the return report keeps these out).
- **Verification examples against tests.** I ran in a separate worktree of `f0421c3` (see checks): `tests/view/program-panel.test.mjs:372-393` (open rule, „Zwiń grupę”, the panel under the header, „Rozwiń grupę”, back under the row); `:1676-1708` (fold and unfold keep the same panel element and the field „Czynność”; focus stays on the button); `:1711-1730` („zwiń wszystkie” and „rozwiń wszystkie” keep the same panel element and field); `tests/view/rule-editor.test.mjs:1629-1642` (the panel right after the header of a folded group); `:1731-1757` (the same element after fold, unfold and a move). The "complies" examples name rule 2.1 in group 2, where the tests use group 1 or a test pair; the labels „Zwiń grupę”, „Rozwiń grupę”, „zwiń wszystkie” and the field „Czynność” are real (`rule-list.tsx:669-672`, `:745`), and the numbering `2.1` is the form of `ruleNumber` (`program-editor.ts:794`). The one example no test asserts in this exact form is "„zwiń wszystkie” leaves the panel under the header of its group": the test at `program-panel.test.mjs:1711` asserts the same element and field after „zwiń wszystkie”, not the place; the code gives the place (`isFolded` and `panelUnderRow` above). It is an illustration for an agent comparing a change, not an invariant test, so no finding. The "violates" example "the panel standing under no header and no row, such as at the end of the list" is the failure the test at `rule-editor.test.mjs:1629` guards against.
- **Rejected.** "Closing the panel when its group folds" with D-306: D-306 reads "„✕”, Escape or opening another rule closes it" (matches). "Unfolding the group for the panel": D-295 *Rejected* reads "the group unfolding at the drop — the list runs from under the pointer" (matches). Both are the two ways of `plan.md` *Choices* row 2. See M-1 for the one added clause.
- **Origin `none` of D-350.** Right under the template ("when the whole reasoning is in the entry, it is `none`"): the reasoning is in the rationale and *Rejected*; the plan row is deleted with the cycle's files.
- **Relations.** `derives from D-288 · derives from D-295`: D-288 is the entry that places the panel; D-295 is the entry that keeps a folded group folded. Both exist; `foundation_check.py` reports no missing reference.
- **D-288, D-295, D-294, D-306, D-311 read whole.** D-288 ("under the row of the rule or the header of the rule group it changes") is not contradicted: D-350 fills the case it leaves open. No collision between D-350 and D-295 (drop onto a folded group) or D-296 (the group's own panel under its header: the same place). D-311 does not speak of the folded case. D-350's scope (`browser-view`) is right: the behaviour is only in `rule-list.tsx` and the page's panel.
- **D-166 *Origin*.** The added source (`zadanie_proporcje_sceny_i_programu_loop2.md … To do, item 3, and Questions to settle, question 3`) is the same form as the other entries the task changed (D-288 cites items 1 and 3 and questions 1 and 3; D-311 cites items 1 and 2, questions 1, 2 and 6, row 2). Item 3 and question 3 are the passage that fixes Programy at two columns, with the editor on the right, which is the sentence of D-166. The binding sentences, *Verification*, *Rationale* and *Rejected* of D-166 are unchanged by the commit (the diff shows only the *Origin* line).
- **Next free number.** D-350 follows D-349 (the last entry before it); no withdrawn number or entry holds 350.
- **Entries not written (return report).** The reasoning for no glossary entry, no invariant, no environment fact and no part map change holds against the task (no rule set by the task that a test could check; no *Based on* or *Rests on* names a scrollbar fact; the files of the change sit in the parts already mapped). I did not reopen the choices left as rows of the questions table, which the plan keeps (WAY-36), apart from checking that none of them states a place the player can see differently after the merge, other than D-350's case.

## Declined to judge

- The sentence in D-306 listing what closes the panel ("„✕”, Escape or opening another rule") is shorter than the code (a move of the open rule across a group border and the deletion of the rule also close it, as the return report notes). It is already so at the base and is not touched by this commit; a different question for another request. Outside the task.
- Whether a rule added by „Dodaj regułę z tym” into a folded first group should unfold the group (D-313 is silent, as the return report says). Behaviour outside the task.
- Whether D-288's binding sentence should be widened by a clause on a folded group instead of a separate D-350. It reads as complete under the template (a new rule next to an existing decision is a new question, WAY-19); I chose not to judge a different shape of the foundation.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` in the worktree | `f0421c3b0776986a45da61d1af8b0a8a143bad72`, exit 0 |
| `git diff 5e81459..HEAD` and `git log 5e81459..HEAD` | one commit, one file, exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` (in the reviewed worktree, read-only) | `0 errors`, exit 0 |
| In a separate worktree `.runs/review13-wt` of `f0421c3` (detached; `node_modules` joined by a junction): `node scripts/build.mjs` | exit 0 |
| Same worktree: `node --test tests/view/rule-editor.test.mjs tests/view/program-panel.test.mjs` | 126 tests, 126 pass, 0 fail, exit 0 |
| `git worktree remove --force .runs/review13-wt`, then removal of the leftover junction with `rmdir` (the link only) | worktree gone; `node_modules` of the reviewed worktree intact (268 entries); reviewed worktree `git status --short` empty |

Not run: `npm test` (the full gate is the cycle's own run), a check in a real browser (D-350 describes the placement the tests assert on the DOM; this commit changes no code or style).

## Reaches beyond the handoff

- `foundations/decisions.md` D-296 (read whole) and D-166 (read whole, to see that only its *Origin* changed and what its sentences say): to check that D-350 does not collide with the panel under a group's own header and that the *Origin* addition matches D-166's subject.
- `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md` (whole): to judge the return step's rule for what it writes and where the Rejected of a "cycle's own" entry comes from.
- `.the-way/elements/decisions/template.md` (whole): form of an entry, *Origin*, *Rejected*, WAY-134, WAY-36.
- `src/browser/view/rule-list.tsx` (the header comment, the props, `renderRule`, `renderGroup`, the root), `src/browser/view/program-editor.ts:789-796` (`groupNumber`, `ruleNumber`): for the DOM of the folded group and the numbering used by the examples.
- `scripts/test.py`, `package.json` scripts: to see how to run a focused test file; `git check-ignore` on `.runs`, `dist`, `node_modules`.

## Searches not found or unclear

- The decisions' template says of *Origin*: "The task a decision was made in is not recorded: git history gives it", while the entries of this log (D-288, D-311, D-166 now) name the vault's task documents in *Origin* as sources of reasoning. The product's own practice is consistent across the entries the task changed, and the template also allows "a file at a fixed commit"; I took the practice as the convention and did not grade the added source of D-166. Unclear in the template, not blocking.
- No test asserts the place of the panel after „zwiń wszystkie” (only the element and the field); found by reading `program-panel.test.mjs:1711-1730`. Noted under "Verification examples" above; not graded.
