PASS 60c5f99f

# Review of the fix of slices 6-8 (range 59b06238..60c5f99f, one commit)

Head confirmed: `git rev-parse HEAD` in the worktree gave `60c5f99fb2edce6b0df7fdeb1666f74dd5fb1d3b`. One commit, `foundations/decisions.md` only, 5 lines changed (4 `*Rationale:*` lines, 1 `*Rejected:*` line); nothing before *Rationale* changed (see checks).

## Findings of the findings file

- **I-1 (D-84, D-85): fixed.** Both clauses now say what the helper was "when they were adopted" / "when the case was chosen". True: `git show 42522e67:tests/http.test.mjs` (the adoption commit, 2026-10-25) has `await once(server, "listening")` with no limit (line 29) and `outgoing.setTimeout(5000, ...)`, an idle timeout (line 67); the helper took the deadlines in `8d2dff33` (2026-10-27), which adds "HTTP readiness deadline exceeded" and removes the idle timeout. The head helper (`git show 60c5f99f:tests/http.test.mjs`, `listen()` and `send()`) has both deadlines, and the entries no longer say it lacks them. Traceable to the note's Q7 and Q5i. The clause "so the rules left the helper to take them at its next change" matches the note ("zasada Q5d obowiązuje nowe i zmieniane testy") and the entry's own binding sentence.
- **I-2 (D-79): fixed.** "When this was decided, the npm registry ... was the only service ... talked to, so the template's row ... was met only there." D-79 was written in `42522e67` (2026-10-25); D-163 entered the log on 2026-10-29 and D-235 on 2026-10-31 (`git log -S`), so the dated sentence is true. D-73's binding sentence names D-79, D-163 and D-235 as separate departures, consistent with the dated sentence. The rest of the sentence (tests of the audit substitute its result, the gate runs the real audit, that run is the check of the format) is the note's Q4n and is unchanged. No contradiction with D-163 or D-235 remains.
- **I-3 (D-96): fixed.** The rejected way is now a cost in the past ("when it was weighed, it took the player to the headquarters in place of the map run that waits for him and needed a state of the screen the code did not know ... and a new button, and with them a rule for what the player may do in Siedziba while the map run waits"). Traceable to the note's question 20, Not chosen C (landing in the headquarters, the map run waiting behind „Wróć do przejścia", a state the code did not know, a new button, a new question). The landing clause is the note's own. Against the head: D-96's binding sentence (sign-in leads to the manual map run; a reload at another address stays), its *Rationale* („Wróć do przejścia" leads back), D-280 (the menu item) and D-287 (what Siedziba allows while a map run waits) all describe the state the old wording called missing; the new wording does not claim it is missing today. The rejected way still differs from the chosen one by where sign-in lands, so it is not a duplicate of the accepted behaviour.
- **I-4 (D-144): fixed.** "so the tests of this game may expect them" is gone; "taken as the requirement" replaces it. The remaining sentence no longer grounds a test's expectation in loop's numbers, so it no longer contradicts D-82 ("a test comment names ... no document outside the foundation"; a requirement only a document held "has to be entered into the foundation before a test may expect it"). `git grep -nE "Mocniejszy|Cięższy|Zwinny" 60c5f99f -- foundations guidelines tests`: no hit, so the rank numbers are still in no entry; this is the part of I-4 the finding itself left to the step that handles To do 5, and the fix report names it. See M-2.

## New findings in the fix diff

Critical: none. Important: none.

### Minor

- **M-2 — D-144 *Rationale*, "taken as the requirement"** (`foundations/decisions.md`, D-144). The sentence "The numbers of the actions and of the ranks of their branches are those of the predecessor game, loop, taken as the requirement" says loop's numbers are the requirement, but the numbers a rank adds are in no entry of the foundation (grep above), and D-82 says a requirement a test needs stands in the foundation. A reader can take the sentence as saying the source of the numbers is loop itself. It is the clause the first reviewer's fix proposal kept and it is the note's own claim (Q8: "liczby ... są wymaganiem"), so it is not a defect of this fix; it stays open until the rank numbers are entered into D-144 or the branch decisions. Minor, blocks nothing.
- No other Minor in the diff. Tense: D-79's sentence mixes a dated opening ("was met only there") with a present-tense colon clause ("the tests of the audit substitute its result, while the gate runs the real audit"); both halves are true at the head, so this is style only.

### Out of scope (outside the fix diff, noted not graded as blocking)

- **O-1 — D-84 binding sentence** still ends "The HTTP helper in `tests/http.test.mjs` takes these waiting and cleanup rules when that helper changes." The helper has taken them (`8d2dff33`), so the sentence reads as an unmet obligation. It is a binding sentence, was not in the findings, and the fix report names it. Not a contradiction with the new *Rationale*, which says the rules left the helper to its next change. D-85's binding sentence ("not the whole file or its timeout and cleanup helpers") stays true. Outside the fix diff.

## Declined to judge

- Whether D-144's binding sentence or the branch decisions should gain the rank numbers (To do 5 of the task the note belongs to): outside this fix and the task of the findings file.
- Whether D-84's binding sentence should be rewritten now that the helper is bounded: it is a binding sentence outside the fix diff (O-1).

## Checks

- `git rev-parse HEAD` (in the worktree) -> exit 0, `60c5f99f...` (the given head).
- `git log --oneline 59b06238..60c5f99f` and `git diff --stat 59b06238..60c5f99f` -> exit 0; one commit, one file, 5 insertions and 5 deletions.
- `git diff -U0 59b06238..60c5f99f | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | cut -c1-12 | sort | uniq -c` -> exit 0; changed lines begin only with `*Rationale:` (4 added, 4 removed) and `*Rejected:*` (1 and 1): nothing before *Rationale* changed.
- `git diff --word-diff=porcelain -U0 59b06238..60c5f99f` -> exit 0; the word-level changes are only the tense changes, the "when ... was decided / adopted / chosen / weighed" openers, the replaced D-96 cost phrases and the D-144 clause, as the fix report says.
- Pointer scan of the added lines (`grep -oiE 'vault|\.md|Notes/|C:[/\\]|IPv4 pattern|https?://|password|token|Q[0-9]|question [0-9]|task'`) -> exit 0; the only match was the `+++ b/foundations/decisions.md` header, none in added text. No pointer to a note, task, question number or disk place, no secret, no host address.
- `git show 42522e67:tests/http.test.mjs | grep -nE "listen|setTimeout|timeout"` -> exit 0; lines 28-29 (no readiness limit) and 67-68 (idle timeout) as the adoption-time state.
- `git show 8d2dff33 -- tests/http.test.mjs | grep ...` -> exit 0; the commit adds the readiness deadline and the absolute deadline and removes the idle timeout.
- `git show 60c5f99f:tests/http.test.mjs | sed -n 1,130p` -> exit 0; `listen()` carries a 5000 ms readiness deadline, `send()` an absolute 5000 ms deadline destroying the request.
- `git log -S"D-163 — How is the code" / "D-235 — How is the code" / "D-79 — How is the npm" -- foundations/decisions.md` -> exit 0; dates 2026-10-29, 2026-10-31, 2026-10-25.
- Read whole at 60c5f99f (`git show 60c5f99f:foundations/decisions.md` into the scratch directory `the session scratchpad\review-fix-6-8\dec.md`): D-73, D-79, D-82, D-84, D-85, D-96, D-144, D-163 (to its Rationale), D-235 (to its Origin), D-287 (first paragraph), D-280 (the sentence naming „Wróć do przejścia").
- Not run: `python -B .the-way/elements/common/foundation_check.py` — it reads the working tree, which this review does not touch; the fix report gives exit 0. Unverified by me. The product's full tests: the cycle's own run, not repeated.

## Reaches beyond the dispatch

- `git show 42522e67:tests/http.test.mjs` and `git show 8d2dff33 -- tests/http.test.mjs`, `git log -S` on the decision titles: to date the helper's state and the entries, because the fixed sentences claim a state "when adopted". Not named by the handoff.
- D-163, D-235, D-280, D-287 and D-82, D-73: named by the handoff.

## Unread material

D-280 and D-287 were read only as far as the passages that bear on D-96 (the menu item „Wróć do przejścia" and the first paragraph of D-287), not whole; D-163 and D-235 read through their Verification and Origin lines, not their Rationale and *Rejected* to the end. Of the snapshot notes I read the passages the findings quote (przewodnik_testow_loop2.md Q4, Q4n, Q5i, Q7 and zapis_stanu_na_serwerze_loop2.md question 20) and not the whole notes. The first review report (`reports/review-6-8-report.md`) was not read; the findings file stands for it.

## Searches not found or unclear

- Rank numbers of the combat branches ("Mocniejszy", "Cięższy", "Zwinny") in `foundations/`, `guidelines/`, `tests/` at 60c5f99f: not found (the fix and the first review also say so); noted under M-2.
- The note for D-144 (`wprawa_i_drzewa_loop2.md`, Q8) was not re-read by me; I relied on the findings file's quotation of it. Otherwise none.
