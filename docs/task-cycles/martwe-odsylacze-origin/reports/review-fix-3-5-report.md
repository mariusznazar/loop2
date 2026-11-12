FAIL 7ec7966b

# Review of the fix of findings I-1 and I-2 (slices 3-5), range 7e3aa5e8..7ec7966b

Method: `review-change` SKILL.md and `fix.md` of the-way at the commit the gitlink of the branch records (e9a0f926), read whole. Everything read from commits
(`git show`, `git diff`, `git archive`); the worktree, the vault and the old Loop clone were not touched. Snapshot notes read for the comparison:
`technologia_budowanie_ekranow.md` (sections "Konsekwencje", "Testy", the test-count paragraph of the first list, "Opcje pominięte") and `serwer_testowy_loop2.md` (the answer under "Jaki dostęp do serwera dostaje agent?").

## Verdict in one paragraph

I-2 (D-12) is fixed. I-1 (D-03) is fixed for every cost it listed, but the fix added a conclusion to the test-cost sentence that the note does not give and that the
note's own numbers turn upside down. That is a new Important finding in the fix diff, so the review fails. Nothing before *Rationale* changed in either entry.

## Findings of the findings file

- **I-1 (D-03, lost accepted costs): the listed costs are restored; the entry still fails on one added clause (finding N-1 below).** Each cost the first reviewer named is now in
  "Lacks of the option chosen" in product terms, with no file name, no count and no pointer: the framework rule and its check written anew; the two checks for values written in place
  of tokens and for content identifiers widened (see N-2); the shared controls becoming components or wrapped elements, with the page showing them following; the guideline and its
  exemplar written anew; the mitigation that the tests of screens rewritten anyway change in every option. The DOM's *Rejected* now says it bears none of them. The cost list is fixed;
  the mitigation is carried wrongly, so the finding does not fully disappear: **remains** as N-1.
- **I-2 (D-12, premise stated as today's fact): fixed.** The *Rationale* now reads "The access was chosen while the server held nothing whose loss the owner feared, the container of the old loop game
  beside it included, so for the time the work went freely; the access was to be secured further later." The note's "dziś" / "na teraz" is carried as the premise of the choice, in the past, with
  no date and no "before any account existed" (the note gives none). It no longer says the server holds nothing to lose, so it no longer contradicts D-228 and D-230 to D-238 / D-360 (the
  backup of accounts and saved states). The unchanged first sentence ("Until public account launch, the test server is intended to hold only the owner's account, so reading ... remains accepted")
  is pre-existing and consistent with it. Whether the lapsed premise calls D-12 into question is the human's matter (see Declined to judge).

## Extra change of the fix agent: D-12 *Rejected*

"more setup than the server's present contents warrant" -> "more setup than the server's contents then warranted". **Right, not harmful.** The old phrase put the same premise in the present tense
and would have kept the contradiction the fix removes, one paragraph lower; the note gives the premise as the reason this option was rejected "na teraz", so the past tense is faithful to it. It
changes no binding sentence or field, and it sits in *Rejected*, which the orchestrator's script allows to differ. Keep it.

## Findings

### Important (blocking)

**N-1 — D-03 *Rationale* (`foundations/decisions.md:49`, the end of the "Lacks" sentence): the added clause "so the loss falls mainly on the tests of the game screens" says the reverse of the note.**

- Entry (7ec7966b): "... the tests of the screens that the project rewrites anyway, the editor and the layout of the screens, change in every option, so the loss falls mainly on the tests of the game screens."
- Note ("Testy", paragraph after the table): "projekt i tak przepisuje edytor i układ ekranów, więc testy tych ekranów zmieniają się w każdej opcji; dotyczy to głównie około 1130 wierszy ekranów gry."
  The note's first list (item 1) splits the ~3980 lines of tests standing on the hand-made model: ~2850 concern the account and saving, ~1130 the game screens. So "dotyczy to" refers to the tests that
  change anyway (mainly the ~1130 lines of game screens), not to the loss. The line "Gdyby [biblioteka] objęła tylko ekran przejścia i Programy, około 2850 z 3980 wierszy testów na modelu zostaje bez zmian"
  confirms that the model-based tests that are not rewritten anyway are mostly the account and save ones.
- What is wrong: the game-screen tests are the ones the mitigation takes out of the library's cost, since they change in every option. The library's extra loss therefore falls mainly on the rest (account and
  save screens' tests), if those move to the library. The entry says the opposite. The clause is also a conclusion ("so ...") that no sentence of the note draws; the first reviewer's fix text asked only for the mitigation
  ("the screens rewritten anyway change their tests in every option").
- Why it matters: *Rationale* carries the costs the human accepted (WAY-138). A reader weighing React against the DOM, or a later slice deciding which screens move first, is told the library hurts the tests most where it
  hurts least. It is a reason the note does not give (the review's own test for this fix), and it is stated as fact. Important by WAY-263 (the entry states the note's finding differently from the note).
- Evidence: the two quotes above; the diff of 7ec7966b, hunk `@@ -49,2 +49,2 @@`.
- Fix: end the sentence at "... change in every option." (the clause the note gives), or say that the loss of the model falls on the tests that are not rewritten anyway, mainly those of the account and saving screens (the
  note's numbers support that only as arithmetic, so the shorter ending is the safer one).

### Minor (blocks nothing)

**N-2 — D-03 *Rationale* (`foundations/decisions.md:49`): the entry says both checks must be widened for the chosen option, but for React the check of content identifiers already reads the file type of the new screens.**

- Entry: "the two checks that guard against values written in place of tokens and against content identifiers read only the file types they list, so they have to be widened to the file type of the new screens".
- Note: the same section says the content-identifiers check (and the linter) "czytają `.tsx`, ale nie `.vue` ani `.svelte`"; only the token check reads no `.tsx`. At the head commit both checks list `.tsx`
  (`tests/invariants/test_content_identifiers.py:46`, `tests/invariants/test_browser_view_token_values.py:80`), so for React the sentence is true only of the token check, and by now the widening is done.
- The fix report admits the difference ("states the cost generally"). The note's own lead sentence says "Dwa strażniki", so the entry is faithful to the note's heading; the heading is the note's loose spot. Minor: the sentence
  would be exact if it named the token check alone for React, but it misleads no one into a wrong action.

## Checks on the nothing-before-*Rationale* claim and the text

- `git diff 7e3aa5e8..7ec7966b --stat`: one file, `foundations/decisions.md`, 4 insertions, 4 deletions. `git diff -U0 ... | grep '^@@'`: hunks at lines 49-50 (D-03 *Rationale* and *Rejected*), 334 (D-12 *Rationale*), 338 (D-12 *Rejected*).
  The headings, the binding sentences, *Scope*, *Based on*, *Relations*, *Verification* and *Origin* of both entries are untouched (confirmed by reading both entries whole at 7ec7966b).
- Private traces: the added text holds no file name, note, task, path on a disk, host, port, secret or count; `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania|[C]:\\|Storage' 7ec7966b -- foundations/decisions.md`
  has no hit on a line of D-03 (39-51) or of D-12 (321-340).
- Contradictions with binding sentences: D-03's binding sentence (React, `.tsx`, no other framework) and D-12's (read only through the MCP server, humans change) are unchanged and not contradicted. D-228, D-230 to D-238 and D-360 now agree with D-12's *Rationale*, which no longer
  claims the server holds nothing to lose. D-228 and D-231 (relations to D-12) were located by heading; their content concerns the backup and does not restate D-12's premise.

## Declined to judge

- Whether the lapsed premise of D-12 (the server now holds accounts and saved states that the product backs up) calls the whole decision into question: a matter for the human, outside this fix.
- Whether the other decisions of slices 3-5 carry similar tense problems: outside the fix diff.

## Checks run

- `git ls-tree 7ec7966b .the-way` and `git -C .the-way cat-file -t e9a0f926` - exit 0 (commit exists; the submodule path is not in the superproject's tree, so the skill files were read with `git -C .the-way show e9a0f926:...`).
- `git diff 7e3aa5e8..7ec7966b`, `--stat`, `-U0 --word-diff=plain`, `-U0 | grep '^@@'` - exit 0; results above.
- `git show 7ec7966b:foundations/decisions.md | sed -n '36,56p;318,345p'` - exit 0; D-03 and D-12 read whole.
- `git show 7ec7966b:tests/invariants/test_content_identifiers.py | grep ...`, same for `test_browser_view_token_values.py` and `eslint.config.mjs` - exit 0; `.tsx` listed in all three.
- `python -B .the-way/elements/common/foundation_check.py` on a copy of the head commit made with `git archive` into the scratchpad directory
  `the session scratchpad\rev-fix-3-5\head` (a fresh `git init` there, the pinned `.the-way` archived in beside it) - exit 1, 464 errors,
  all of them `.the-way/...: no part claims it` plus one `.the-way pattern matches no file git tracks`: an artefact of the copy, where the submodule's files are plain tracked files. With those lines filtered out nothing remains, so the foundation itself has no error at the head. The fix report's own run (exit 0, 0 errors) was therefore not reproduced exactly; its result is consistent with mine.
- Not run: the product's tests (the cycle's own run; the change is text of the foundation only).

## Reaches beyond the dispatch

- `tests/invariants/test_content_identifiers.py`, `tests/invariants/test_browser_view_token_values.py`, `eslint.config.mjs` at 7ec7966b, to judge whether the note's "widen the checks" still holds (N-2).
- `foundations/decisions.md` headings of D-228, D-230 to D-238, D-360 at 7ec7966b by `git show | grep`, to confirm they exist and that D-231 and D-232 relate to D-12 and D-13; D-228 body not re-read (read by the fix agent; its binding sentence is quoted in the first review).
- Note passages beyond "Konsekwencje": the first list (item 1, test counts) and the line on a library covering only part of the view, for N-1.

## Unread material

Snapshot notes were read in the sections named above, not whole (both notes are 263 and 114 lines; the rest concerns options and questions outside the two entries). D-228 and D-230 to D-238, D-360 were not read whole. The first review report and the original diff of slices 3-5 were not read; only the findings file and the fix report.

## Searches not found or unclear

- `.the-way/task-cycle/review/SKILL.md` and `fix.md` are not in the superproject's tree (the path lies inside the submodule); found by reading them in the submodule at the gitlink commit. The handoff's "read only from commits" holds for them.
- Note ambiguity: "dotyczy to głównie około 1130 wierszy ekranów gry" has no explicit antecedent; I read it as referring to the tests that change anyway, for the reasons given in N-1. If the human reads it as referring to the loss, N-1 falls and the fix passes, but then the note would contradict its own count of 2850 lines for the account and saving screens.
