# Executor report — Slice 5 (The tests of the data and of discovery agree with Ucisk)

**Status:** done

**Base:** 7bee096f03aaff62280b63b32d5280c8ecd13efd (verified at start; the pinned the-way `.the-way` is 6ed3cb364adedacea214d2a0df690cea32f2e72f, verified).

**Commit:** 17a80c095368a46b97a7ca549ebac3f1757d6596 `test: :white_check_mark: …` (one commit, by path, not pushed).

**Files changed (added / removed lines):**
- `tests/sim/action-targets.test.mjs` +19 / -9 — `repertoireWith` gains the predisposition `tending` (D-120; task item 2); the third test is rewritten: the verbs with the bandage are closed with no predisposition, open with `tending`, and each adds one practice of `tending` (D-120, D-193; task item 1). The first two tests are unchanged and now pass through the predisposition.
- `tests/sim/body.test.mjs` +5 / -5 — five `decision:` quotation lines (D-387, D-60) changed to the opening of their binding sentences; no assertion changed.
- `tests/sim/craft-and-tend.test.mjs` +6 / -3 — two expectations of discovery: at the first moss the minute reveals `pressure` with `craft` and the tree `tending` (D-195); at the first crafted bandage the minute reveals `tend` and `pressure`, and the Understanding ends with `pressure` after `tend` (D-195). One `decision:` quotation (D-145) changed to the opening of its sentence.
- `tests/sim/data.test.mjs` +9 / 0 — the group list gains `["pressure", "foodAndCombat"]` after `dodge` (D-290); the grown pairs of „Opatrywanie małych ran” gain `{ action: "pressure" }` (D-150, D-379; task item 1); the rows table gains a row for `treeDiscovered` of `tending` with `pressure` (D-195).
- `tests/sim/team.test.mjs` +1 / 0 — `ZERO_SKILLS` gains `tending` (the nine character skills of the data; D-192).
- `tests/sim/tending.test.mjs` +5 / -5 — five `decision:` quotation lines (D-379 ×4, D-121) changed to the opening of their binding sentences; no assertion changed.

Totals: 6 files, +46 / -21.

**Checks (command → exit code), run after the commit's files were staged and edited:**
- `npm test -- tests/sim/data.test.mjs` → 0 (45 pass, 0 fail)
- `npm test -- tests/sim/craft-and-tend.test.mjs` → 0 (30 pass)
- `npm test -- tests/sim/discovery.test.mjs` → 0 (50 pass; it already passed on the base and is unchanged)
- `npm test -- tests/sim/action-targets.test.mjs` → 0 (12 pass)
- `npm test -- tests/sim/team.test.mjs` → 0 (27 pass)
- `npm test -- tests/sim/body.test.mjs` → 0 (39 pass)
- `npm test -- tests/sim/tending.test.mjs` → 0 (8 pass)
- `npm test -- tests/sim/skills.test.mjs` → 0 (19 pass)
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → 0 ("0 errors"; it was 1 with "11 errors" on the base, the eleven quotation lines listed in the plan)

Logs: `.runs/executor-5/` (base-*.log, after-*.log, base-foundation.log, after-foundation.log). These are run logs in the ignored `.runs/`, not working copies.

**Failing tests on the base (each named by the plan's Goal, so measured as the Goal's failing checks):**
- `data.test.mjs`: 3 failing (group list; grown pairs; the rows table "action pressure" 0 !== 1).
- `craft-and-tend.test.mjs`: 2 failing (first moss; first „Wytwórz” reveals „Opatrz”; both list `pressure`, which D-195 requires).
- `action-targets.test.mjs`: 3 failing ("an action with an item target lies in the repertoire…"; "the reason of a rule whose item target … names the item by its row"; "neither verb is grown by a character skill…").
- `team.test.mjs`: 1 failing ("a created character joins the end of the team's list…", missing `tending` in the expected skills).
- `discovery`, `body`, `tending`, `skills`: all passed on the base (the foundation quotations were the only failure in body and tending).
- foundation check on the base: 11 errors, all `decision:` quotations (body 5, craft-and-tend 1, tending 5).

**Quotation changes (each to the opening of the binding sentence that says the same; the check requires a quotation to be a substring beginning a sentence, and these are long because the sentence that holds the test's claim begins earlier):**
- D-387 (body ×4 lines incl. one in the combat test): the sentence "These numbers are requirements of the game … each rank adding 0.05 to it".
- D-60 (body ×3 lines): "Outside combat, a character loses health … up to full health".
- D-145 (craft-and-tend): "„Opatrz — {rzecz}” uses up one piece … never above full health".
- D-379 (tending ×4): "Each rank of a branch of „Opatrywanie małych ran” gives the effect below …" (sentence through the price of the branch named), and "The nine character skills give … „Opatrywanie małych ran” at 10, 28, 60 and 110".
- D-121 (tending): "The first gathered stick brings … the first gathered moss brings the bandage and „Wytwórz”".

**Choices made:**
- Discovery of „Ucisk” with the tree: expectations follow D-195 and the data as Slice 4 left them (`pressure` in ACTIONS order, before `craft`, which is the order the code emits). Choice of the order is the code's; the test expects it.
- `repertoireWith` in `action-targets` now includes `tending` and its comment is rewritten. The old comment "with every skill" was already inaccurate (the list never had the combat skills); the new comment states the skills the tests use. Way rejected: adding all nine skills — it would change the repertoire of tests that do not concern the verbs. Cost if wrong: low; the file's other tests pass.
- The third `action-targets` test was rewritten rather than deleted: its claim now is the inverse of the old one, and the two new assertions (closed with no predisposition; open and practiced with `tending`) are the requirement's content. No assertion was weakened; the old one was stale by task item 1.
- Test names were left unchanged where the claim still holds (e.g. "the first gathered moss reveals the bandage and „Wytwórz”"). Cost: the names no longer list every revealed action; cheap to rename later.

**Own-work check (SKILL section 3):** requirement — the Goal's expectations change only where Slice 4's data change makes them stale, and each changed expectation keeps its source in the foundation. Check — each of the eight Checks run, plus the foundation check; the base failures listed above went from failing to passing; no assertion other than these expectations changed; the quotation lines changed only in their text. Result: all pass; the foundation check exits 0. Mutation testing was not run: no product source changed, and the testing guidelines run it only on changed simulation files.

**Reaches beyond the dispatch (SKILL section 1):**
- Read whole: `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `guidelines/testing.md`, `guidelines/coding.md`.
- Read in part: `foundations/decisions.md` at D-60, D-387, D-145, D-379, D-121, D-120, D-193, D-195 (the binding paragraphs, to write quotations); `foundation_check.py` lines 70–80 and 940–1000 (the citation rule, to know what a quotation must match).
- Read in part, the dispatch's ranges: `tests/sim/data.test.mjs` 300–340, 640–700, 706–800, 808–862; `tests/sim/craft-and-tend.test.mjs` 600–730; `tests/sim/action-targets.test.mjs` 8–34, 325–432, 155–175, 480–494; `tests/sim/team.test.mjs` 28–48, 60–140; `tests/sim/tending.test.mjs` only at the cited lines; `src/browser/sim/data/actions.ts` and `skills.ts` whole (dispatch).
- Also read to understand behaviour: `src/browser/sim/skills.ts` 153–176 (`skillsGrowing`, `practiced`), `src/browser/sim/understanding.ts` 84–135 (`repertoireOf`, `actionInRepertoire`), `src/browser/sim/data/archetypes.ts` (predispositions).
- Not read: `src/browser/sim/data/revelations.ts`, `understanding.ts` beyond the lines named, `ui_check.md`, `walkthrough.md` (this slice alters no behaviour a user sees; no walkthrough needed), `part_map.md` (the plan's pointer; not needed for test expectations).

**Unread material:**
- `tests/sim/data.test.mjs`, `craft-and-tend.test.mjs`, `action-targets.test.mjs`, `team.test.mjs`, `tending.test.mjs`, `body.test.mjs`: read in the ranges above only, not whole. The failing tests and their neighbours were read; other tests were not read beyond the failing runs' names.
- `task_frozen.md` and the passages of the plan were used as the dispatch copied them (not opened).

**Searches not found or unclear:** none that changed the work. One note: the test "the first „Wytwórz” that ends with its effect on the bandage reveals „Opatrz” in that minute and nothing before it" still describes its claim; it now also asserts `pressure` in the same minute.

**Working copies:** none made. The only directory used is `.runs/executor-5/` for run logs (ignored by git). No worktree was made, so nothing needed removal.

**Problems as observed:** none in the product; no source changed. The discovery test already passed on the base; the Goal's wording "pass again" is satisfied.
