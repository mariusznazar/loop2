# Slice 6 report — reasoning of D-73 to D-89 into the entries

**Status:** done with concerns (two points for the orchestrator, below; nothing blocks)

**Slice base:** `1879a6d9a8e331a6d8902fa20d10e457dbab7911` (HEAD at the start, worktree clean, branch `task/martwe-odsylacze-origin`).

**Commits:** `c0e12bc5` — `docs: :memo: move the reasoning of D-73 to D-89 into the entries and drop their private origins`

**Files changed:** `foundations/decisions.md` (+37 / -37 lines). Only `Origin`, `Rationale` and `Rejected` lines of D-73, D-74, D-75, D-76, D-78, D-79, D-80, D-81, D-83, D-84, D-85, D-86, D-87, D-88, D-89 changed. D-77 and D-82 not touched.

## Steps of `the-way-record-decision` done

Per entry: step 1 (read `read.md`, the template, `rules.md`, `way_of_working.md`, `examples.md` names WAY-03 which I read, WAY-27 read; the entries whole), step 2 (decide the entry: an existing entry edited in place; question and binding sentences untouched; searched the log for D-28, D-33, D-38, D-46, D-64, D-86, D-88, D-163, D-235, D-264, D-273 — those that the notes name or that name the slice's entries), step 3 (draft from the note passages named by *Origin*), step 4.3 (write by the editor tool, run `foundation_check.py`). Steps 4.1, 4.2 and 4.4: no question arose (nothing the writer lacked a recommendation for), nothing follows from an edit of *Rationale*/*Rejected*/*Origin* alone (no binding part changed).

## Checks

| Check | Command | Result |
|---|---|---|
| foundation check | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | exit 0, `0 errors`. (The switch is the one the skill's step 4.3 prescribes; the slice's *Checks* give the command without it. I did not run it without the switch.) |
| no note names inside the slice's decisions | `git grep -nIE 'in the vault\|_loop2\.md\|koncepcja_\|rozpoznanie_\|technologia_\|zadanie_\|Notes/Projects\|_zadania' -- foundations/decisions.md`, filtered to lines 1539–1763 | no line (before my edit the same filter had matched the 15 *Origin* lines plus those naming `logowanie_w_react`) |
| diff reading | `git diff 1879a6d9 -U0 -- foundations/decisions.md`, every changed line classified | all 74 changed lines are `- **Origin:**`, `*Rationale:*` or `*Rejected:*` lines of the 15 decisions |
| scan of added lines for paths, file names, host addresses, personal names | `git diff … \| grep '^+' \| grep -oE …` | nothing (only the diff header) |

Not run: the product's gate `npm test`, as instructed.

## Own-work check (WAY-164)

Requirement most likely missed: "a reason a note does not give is not added, and one it gives is not lost". Check: for each decision I listed the note's answer, its costs ("Pokazany koszt", "słaby punkt"), its rejected alternative and the facts it rests on, then looked for each in the new text; and for each sentence added I looked for its sentence in the note. Result: every added sentence has a passage (listed below); the one place where I carry something the note gives only in a neighbouring passage is marked in the concerns.

## One line per decision (what moved, from which passage)

- **D-73** (Q4): the pinned-version-without-commit rule (as D-28, D-38), each departure being a decision with its reason, the rest of the template standing, and the shown weak point (departures age if no one checks their return condition). *Rejected* unchanged: the note gives no further way.
- **D-74** (Q4b, Q4g): departure from the template's automatic recommendation of a property test, why (scope, present complexity), not an exclusion of behaviours; accepted cost and gain; tool left to the later task. *Rejected* gains the library/tests/extra runs now (Q4b) and the unconstrained "return when needed" with its cost (Q4g).
- **D-75** (Q10c, Q10 shared source): cost of manual check vs. automation, departure from the template's e2e recommendation and its justification, trust boundaries unaffected, no removal of an existing test without the reason.
- **D-76** (Q6c, Q6g, question 7, S5): why the departure (what the code does today, existing test leaves the serving out, audit found no refusal test), template allows departure but not as its foreign-service exception, invariants checked by review and their wording, cost, where the departure is recorded, the sprite-file departure (D-273) referring to the reading. *Rejected* gains the expansion by two cases, the "no invariants, exception in the rule" alternative.
- **D-78** (Q5k, with Q4 departure 5): departure from "no logic in a test", cost, refinement not a mandate to rewrite.
- **D-79** (Q4n): registry the only foreign service of the tested code, the real audit in the gate as the format check. *Rejected* wording kept to the note ("test without new protection").
- **D-80** (Q3): the named price (no test can say Las is too easy or hard), requirement only once agreed, the premise that the intended balance has no settled source or place (Q3 source). *Rejected* gains the example "today's survival time on Las" (row 8's guess).
- **D-81** (Q5e–Q5g, Q5n): the three levels' definitions, costs and limits, the hand-made-model boundary, glossary entries only for unit and integration. *Rejected* gains substituting every response (Q5f) and an entry for all three names (Q5n).
- **D-83** (Q5a, Q5r): why the invariant (command names some files, selects some directories), cost, migration alternative. *Rejected* unchanged.
- **D-84** (Q5b–Q5d, Q7): seed, repeatability not independent expectation, controlled responses, readiness, polling allowed, costs of the alternatives, no concrete limits, helper deferral for scope (Q7). *Rejected* gains real waiting of game minutes with its cost, and the fixed pause cost.
- **D-85** (Q5h–Q5j): content, gain and boundary of each of the three exemplars, cost of upkeep, the alternative of a new exemplar. *Rejected* gains the costs from the source line.
- **D-86** (Q6b, Q6f): refusal wording tied to the existing test, why the rule is written beside the test, cost, no login mechanism or new HTTP function. *Rejected* unchanged. The weak point of Q6f (the testing guide's permission table gains rows at the first player accounts) is not moved: it concerns the table of the guidelines, not this decision.
- **D-87** (Q10b, Q10 shared source): cost of image comparison, trust-boundary and "external icons/fonts" scope, no removal of an existing test without the reason.
- **D-88** (Q10d; the question carried to the cycle): what the model does not check, separation from D-75, weak point, screens built with React lose the hand-made model and take a ready-made imitation. *Rejected* unchanged.
- **D-89** (Q10a–Q10d): Q10a's category (code that only passes data) and its return condition, cost, trust boundaries, no removal of an existing test without the reason.

## Concerns / questions for the orchestrator

1. **D-77 against its note.** The note (Q5m, Q5a) keeps a full `npm test` with no way to select one file; D-77's binding sentence now has `npm test -- <test file>`. D-77 is outside this slice (*Origin* `none`), I changed nothing in it and in D-73 I carried only departure (4) (no configuration file limiting the whole run), which D-77 still states. The note therefore contradicts a current binding sentence of a decision outside the slice; later evolution rather than a conflict I can place, but it is a question if anyone wants to know the reasoning of the selector.
2. **D-88 and the carried question.** The note gives for D-88 only the question ("what replaces the hand-made document model in the tests of screens moving to React") and, in the plan context, that the choice between two ready-made imitations was left to that task; the answer (jsdom) is in D-264, whose *Origin* names the same passage and belongs to a later slice. I wrote only what the passage gives (screens in React lose the hand-made model and take a ready-made imitation; the exclusion covers it) and did not add why the imitation proves only logic beyond what D-88 already said and Q5f supports. D-264's slice should carry the answer.

No value or wording in the task or the plan failed my check, except the observation above that the slice's check command omits `--skip-test-citations` (harmless here: it exits 0 with the switch; invariants of this repository cite tests already).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-28, D-33, D-38, D-46, D-64, D-86, D-163, D-235, D-264, D-273 (searched by number, only the passages named): to check the cross-references the notes make and that D-264 answers the carried question. `foundations/glossary.md` entries for "unit test" and "integration test" (grep) to check that D-81's description matches. `.the-way/elements/decisions/skill/projected.md` (read; projected mode only, not used).

## Unread material

- `przewodnik_testow_loop2.md`: read whole except nothing skipped (lines 1–266 read). The `Decisions in play` and `Settlements to record` sections were read.
- `logowanie_w_react_loop2.md`: read lines 1–135, 150–170 and 255–330 (question 7, the carried questions, D-76 and D-88 snapshots, S5); lines 136–149 (Context), 171–254 (other decisions in play) not read — outside the passages the *Origin* names.
- `.the-way/foundations/decisions.md` WAY-03 (68–94) and WAY-27 (718–752): read.
- `.runs/.../task.md` passages: read from the handoff's copy, not opened separately. Foundation entries rows 1 and 2 (D-82 as changed, D-362 as changed): D-82 read in place; D-362 not opened (not touched by the slice).
- `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`, `elements/common/rules.md`, `way_of_working.md`, `task-cycle/skill/foundation_step.md`, `task-cycle/change/SKILL.md` and `slice.md`, `.claude/skills/the-way-record-decision/SKILL.md`: read whole. `guidelines/coding.md` and `guidelines/testing.md`: not read (no code or tests changed).

## Searches not found or unclear

- None missing: both notes exist in the snapshot. The `MANIFEST.md` lists `przewodnik_testow_loop2.md` and `logowanie_w_react_loop2.md` as deleted notes read from vault commit `b9c0e931` / `7c692492`.
- Unclear: the note does not say which decision carries Q10a (pass-through code); D-89 names it in *Origin*, so I carried it in D-89's *Rationale* (see D-89 above).
