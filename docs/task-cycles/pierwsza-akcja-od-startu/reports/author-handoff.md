# Handoff — the one author of task pierwsza-akcja-od-startu

## Delegation and place

The person who requested this cycle delegated every intermediate choice to the orchestrator; you work for the orchestrator, never ask the human, and send your questions in your report. Work only in the worktree `the root of the task's worktree` (branch `task/pierwsza-akcja-od-startu`, base `e6a95a9b310ff810c35ac87c28ff8f4c4f8b4037`); its `node_modules` is installed. Work from the worktree's root, so the-way's skills read the worktree's `.the-way` (pin `55afa8e57aa1b83c77108576a36642722e0dda15`).

## Method and variant

Method: `.the-way/task-cycle/change/SKILL.md` of the worktree, read whole; variant: **the whole change as the one author**. Read a file the method names only when the step or variant that names it comes. The foundation step is yours: read `.the-way/task-cycle/skill/foundation_step.md` whole when you reach it, and the skill of an element (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`) when you write an entry of that element. You also write the return step's entries later when resumed; do not start it now.

## The task

The frozen task: `docs/task-cycles/pierwsza-akcja-od-startu/task.frozen.md` (read whole; its path is relative to the worktree). It is the document accepted by the human on 2026-11-13. Task 9 (the first map Skraj lasu) is merged and is in your base; the task's *Context* says "in the moment of the cycle a new game opens the map Skraj lasu" — that is now true.

No spec and no plan exist: the orchestrator found no open design choice. If you meet one, return `returned` with no code (the cycle's rule), and do not start settling it.

## Answers to the questions of step 4 (orchestrator)

- Trust boundary: **yes** — `src/browser/sim/saved-game.ts` is named as a trust boundary of the part `simulation`; item 6 changes it. Check crafted input at it: a document whose Understanding has `actions` missing, empty, duplicated or of a wrong type; a document with "Eksploruj" and without "Zawsze"; extra or missing keys. A refusal must stay a refusal for every shape that is not exactly what the loader admits (the saved-game guidelines: "Brakujących kluczy nie uzupełniaj. Wolno odmówić więcej, niewolno mniej.").
- Irreversible operation: **no**. The save version is not raised (Q1 A).
- Open design choice: none. Reserved choice: none.

## Answer to the question carried to the cycle (autonomous choice C1)

The test of item 8 uses the same way of making seeds as `tests/sim/first-map-balance.test.mjs` (consecutive real moments from `FIRST_REAL_MS`, one millisecond apart) and takes the first 300 of them, as Q6 names 300; it uses the helpers of `tests/sim/` (`program-fixture.mjs`, `understanding-fixture.mjs`). Only a helper that both tests would need goes to a shared fixture file under `tests/sim/`, and only if the testing guidelines call for it; name it in your report.

## The program `las_najlepszy` (autonomous choice C2)

The test of item 8 needs the program `las_najlepszy`; it comes from a measuring instrument that lies outside the repository, so write it into the test as a fixture from the text below and name no note and no instrument (D-362). Conditions and actions are named as the game labels them; map them to the identifiers of the data files. "patyk" is the stick, "jagoda" the berry, "ognisko" the campfire. 21 rules in 5 groups, an empty "Weź" (the take list):

- Group "Jedzenie" — when: Zawsze
  1. Sytość poniżej 75 % → Zjedz — jagoda
- Group "Głód" — when: Sytość poniżej 65 %
  2. Zapas poniżej 1 × jagoda → Zbierz — jagoda
  3. Zapas poniżej 1 × jagoda → Idź — jagoda
- Group "Szukaj jedzenia" — when: Sytość poniżej 60 %
  4. Zapas poniżej 1 × jagoda → Eksploruj
  5. Zapas poniżej 1 × jagoda → Wędruj
- Group "Zimno" — when: Temperatura poniżej 36 °C
  6. Zawsze → Zapal — ognisko
  7. Zapas poniżej 2 × patyk → Zbierz — patyk
  8. Zapas poniżej 2 × patyk → Idź — patyk
  9. Zawsze → Idź — ognisko
  10. Zawsze → Wytwórz — ognisko
  11. Zapas poniżej 6 × patyk → Zbierz — patyk
  12. Zapas poniżej 6 × patyk → Idź — patyk
- Group "Zapasy" — when: Zawsze
  13. Zapas poniżej 2 × patyk → Zbierz — patyk
  14. Zapas poniżej 2 × jagoda → Zbierz — jagoda
  15. Zapas poniżej 8 × patyk → Zbierz — patyk
  16. Zapas poniżej 4 × jagoda → Zbierz — jagoda
  17. Zapas poniżej 2 × patyk → Idź — patyk
  18. Zapas poniżej 2 × jagoda → Idź — jagoda
  19. Zawsze → Eksploruj
  20. Zapas poniżej 2 × patyk → Wędruj
  21. Zapas poniżej 2 × jagoda → Wędruj

The test plays it on Skraj lasu, from the entrance, twice: from a game of an account with no discoveries — the state a new game now has — and from a game whose Understanding holds everything (`newKnowingGame`), on the same 300 seeds; the threshold is exactly Q6's: the new account solves at least as many seeds as the account with everything discovered. If the measured result does not meet the threshold, do **not** weaken the test or the threshold: finish everything else, keep the test as it stands (it fails), and return `done with concerns` with both measured counts, the seed list and the way you measured, so the cycle can go back to the human (Q6).

## What you read, by name

- Foundation entries by identifier: those of the task's *Decisions in play* — D-118, D-121, D-123, D-124, D-128, D-195, D-71, D-312, D-313, D-345, D-249, D-96, D-206, D-80, D-362 — each whole, with its rationale and rejected ways, in `foundations/decisions.md`; and the glossary entry "Understanding". Then, by "Reading the foundation" in `.the-way/elements/common/way_of_working.md`, the decisions, invariants and entries of the parts you touch (`simulation`, `browser-view`, and `product-foundation` for the entries you write), plus the invariants whose tests you alter (the lines `invariant: <identifier>` in the tests of the task's *Context*). The part map `foundations/part_map.md` whole. Also read D-397 and D-398 and the invariant `first-map-balance`, which task 9 wrote beside your test.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-content-data.md` (the data files), `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, and `src/browser/AGENTS.md`.
- The task's *Context* names the code places; verify each against the worktree before you rely on it, since the task was written at commit 2b4d760c and the base has moved.

## Foundation entries you write (the foundation step, with your code)

Item 7 of the task, rows 1–3 of *Settlements to record* and the entries of *Decisions in play*: D-118, D-121, D-123, D-124, D-128, D-195 and the glossary entry "Understanding", each whole in the wording of the approved definition, quoted in *Decisions in play* of the task (the full text with *Rationale* and *Rejected* stands in the approved definition, a note of the author's private vault: read it, only for reading, at `the approved project definition in the author's private notes`, under the headings the task's *Decisions in play* names, and the section *Glossary*; write nothing into it and name it in no tracked file (D-362); where a field of an entry stands there as `TODO`, it stays as the foundation holds it, except a field the changed binding sentence makes false, which you correct with the entry — the task's items 7 and Q4 say which); the corrections of D-71 and D-313 and the examples of *Verification* of D-121 and D-124 named in items 7 and in *Context*; the entry of row 2 (refusal of a saved game whose Understanding lacks "Eksploruj"), and the two invariants of rows 1 and 3. Note that task 9 already changed parts of D-121, D-124 and D-378, as the task says; read each entry as it stands in your base before you edit. Where D-312 and D-345 need a change so that "Gra dopisała regułę…" is said only where the game wrote a rule (item 5), make it and say so. Write the entries through the skills of the elements, in the same commits as the code or beside them, as the method gives.

## Checks you run, and the one you must not

Run focused checks only: `npm run build` where the tests import `dist` (see `scripts/test.py`), and one test file at a time as `npm test <file>`. **Do not run `npm test` with no argument** (the full gate) and no other full run of every test: the orchestrator runs the gate itself, after a signal from the human's day advisor, and a full run before it is forbidden by the human's instruction. Do not run `foundation_check.py` over the whole foundation as a gate either; the check of the foundation is part of the gate — you may run it once at the end as your own-work check only if it is quick, and then report it as yours, not as the gate. Name in your report each check that did not run, with the reason.

## Rules of the repository and of the human you follow

- Code in English: identifiers, docstrings, comments; Polish stays only in what the code shows the player or matches on.
- Commits: English messages in the repository's form (`type: :emoji: text`, as `git log` shows); `git add` by explicit paths, never `git add -A`, `git add .` or `git commit -a`; commit on the task branch only; never push; never touch `docs/task-cycles/` (the orchestrator writes the record's copy). Check `git log --format='%h %ae'` shows the repository's author address after your first commit.
- Never write secrets or personal data into code, tests or the report.
- A screenshot is kept nowhere in the record (the record's copy holds no image). If you check the changed screen (the button "+ reguła" and the discovery band) in the browser, the skill `.claude/skills/loop2-play/SKILL.md` gives how; the check is optional beyond what the testing guidelines and the styleguide call for, and its outcome goes to your report as a manual check with method and observed result.

## Report

Write your full report to `docs/task-cycles/pierwsza-akcja-od-startu/reports/author-report.md` in the form `make-change` gives, with every check as command and exit code, **Unread material**, **Searches not found or unclear**, the own-work check, the entries with one sentence of meaning in English and one in Polish and the mark `row <n>`, `projected` or `the cycle's`, and the commits. Return the short result: status, commits, one-line check result, the report's path.
