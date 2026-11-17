# Planner report — poprawki-brzmienia-fundamentu

- **Status:** done (first returned as `questions`)
- **Orchestrator's answers (autonomous choices, not the human's approval):**
  1. The verdicts of Slices 5–15 are accepted. Rule 7 is added to the plan's rules, and
     `plan-size.md` records the reason.
  2. The 12 files of Slice 12 are accepted.
  3. The rename of "camp" in Slice 15 is accepted.
  4. D-419 and `playwright-cli-session-separation` are accepted as the successors.
  5. The reading of To do 4.4 is accepted.
  6. *Foundation entries* now reads `none`: `reading` is written inside Slice 1, and Slice 11
     depends on Slice 1 only.
- **Edits made after the answers:** rule 7 is in "Rules for every slice", whose range in each
  slice's *Read* moves to `plan.md:18-48`. Slice 11's *Read* and *Depends on* no longer name
  `reading`, and its row of *Coverage* names Slice 1 alone. The size script was run again (the
  same verdicts) and the note on the accepted verdicts was appended to `plan-size.md`.
- **Plan:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md` (17 slices)
- **Size report:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan-size.md`
- **Estimate of what the executors read:**
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/planner-size-estimate.md`
- **Check result:** `slice_size.py` reports 11 of 17 slices `too large` (Slices 5–15), Slice 12
  also for changing 12 files; none `unchecked`. Each of the 11 changes `foundations/decisions.md`,
  which the script counts whole. No product gate run (not my stage).

## Question for the orchestrator

1. **The size verdict cannot reach "every slice fits" for any slice that changes the decision
   log.** The script counts every existing file of *Change* whole. `foundations/decisions.md` is
   1 261 318 characters, about 504 500 estimated tokens alone, so a slice that changes it is
   `too large` whatever else it holds; splitting cannot help. The executors do not read the log
   whole: the element skill and *Read* give each entry by its range. A second source of the
   overcount: the slices that change a quotation line `decision:` in a large test file (for
   example `tests/view/account-screen.test.mjs`, 350 732 characters, edited at one or two
   quotation lines found by `git grep`).
   I measured the plan again with the log taken out of *Change* and the test files that a slice
   edits only at a few lines it finds by `git grep` taken out too
   (`reports/planner-size-estimate.md`): every slice fits, the largest Slice 14 at 149 906
   estimated tokens, Slice 13 at 132 709, Slice 15 at 140 328. To get there I already split two
   slices (invariants into 4 and 5, the picture band into 15 and 16).
   - Proposed answer: accept the `too large` verdicts of Slices 5–15 as caused by whole-file
     counting of the log and of quotation-only test files, record that in the cycle record, and
     keep rule 4 of the plan ("edit them in place without reading the test files whole").
   - Way not proposed: one slice for all decision edits. It is equally `too large` and holds
     more than sixty entries, each with the element's search of the whole foundation.
2. **Slice 12 changes 12 files** (the decision log and eleven test files, each by its quotations
   of D-44's first sentence). A cut that changes only some of the quotations leaves
   `foundation_check.py` failing between the two slices: a quotation stands in no binding sentence.
   Proposed answer: accept the 12 files.

## Concerns

- **The picture band (To do 7.14 (b)) reaches beyond D-389.** The task names D-389, the comments
  of `camp.tsx` and the test names. The band is also called "the camp" in D-271 (binding sentence),
  D-272 (*Verification*), D-421, D-54, the sentence of the log's section "Screen Mapy and
  Siedziba" and the invariant `loop2-container-sprites`. The task's aim ("camp" means only where
  a character is) and the decision skill's step 4.4 bring them in. Slice 15 takes them, and with
  them the quotations of D-389 and D-271 in three test files of `tests/view/`. Left as they stand
  and listed by Slice 16: the comments in `src/browser/headquarters.css`,
  `src/browser/run-screen.css`, `src/browser/styles.css`, `src/browser/sim/data/scene.ts` and
  `src/browser/view/camp-picture.ts`, point 2 of `README.md`, and the styleguide's rule heading
  "The camp of Siedziba" (`guidelines/styleguide-browser-view.md`, section at line 935). The plan
  lists this under *Choices*. If the orchestrator wants the rename only in what the task names,
  Slice 15 shrinks to D-389 and its quotations. "Camp" then keeps two meanings in the foundation.
- **Withdrawn entries the task names.** D-358 is withdrawn, its successor D-419 holds the same
  defect (*Rejected:* `unknown`, the hand-over in its *Rationale*). The fact
  `playwright-cli-sessions-per-workspace` is withdrawn too, its successor is
  `playwright-cli-session-separation`. Slices 7 and 2 apply the change to the successor only where
  the defect stands. Listed under *Choices*.
- **To do 4.4 has no quotation.** Its line numbers (`part_map.md:89`, `:156`) at `fc00c406` hold
  `/package-lock.json` and `.github/workflows/deploy.yml`, not the word "owner". The plan reads
  4.4 as the build-tools entry ("on the owner's computer") and the deployment entry ("telling the
  owner", twice). The account-server entry's "owner role" and "owner panel" stay.
- **Items already made, or partly made, at the base** (the executors report them, rule 1): To do
  7.1. No comment of the three simulation test files still holds a line number of a foundation
  file. What is left is the line "Source: the invariant minute-span-split." over `traceChunks`,
  which To do 7.12 removes. D-189's binding sentence already says the card of a map and „Wejdź”;
  its *Rationale* is left. D-84's binding sentence: the task says it was done in `8d2dff33`. D-367
  has no pair complies/violates now, so the "violates" example of To do 7.13 may not stand.
- **The task's line numbers.** `git log fc00c406..HEAD` counts 614 commits, not the 44 the handoff
  gives. Every slice locates by quotation (rule 1), so this changes nothing in the plan.
- **Reworded invariants that read `test`.** Slices 4, 5, 8 and 15 reword invariant sentences whose
  citing tests do not change. `foundation_check.py` prints such an invariant as a `listed:` line,
  which is no error. Rule 3 has the executors report those lines.
- **Quotations that the task's wordings break.** At the base, rewording these decisions breaks
  quotations of lines `decision:` in tests, so the slices change those test files:
  - D-17 (2 files) and D-232 (2 files): Slice 6;
  - D-46 (1), D-185 (4) and D-311 (8): Slice 10, nine files together;
  - D-44 (11 files): Slice 12;
  - D-207 (4 files): Slice 13;
  - D-218 (3), D-262 (1) and D-280 (1): Slice 14;
  - D-103 (1 file): Slice 5;
  - D-389 and D-271 (3 files): Slice 15;
  - D-170 (1 file): Slice 9.

  D-57's sentence keeps its quotation if the decimal comma is appended after "counted with tenths".
  Slice 14 says so. Where an executor's wording breaks a quotation in a file outside its *Change*,
  rule 4 has it stop and return.

## Guidelines found missing or uncertain

- `guidelines/coding.md` holds no rule of size, so the plan holds no slice that moves code first.
- `guidelines/styleguide-browser-view.md` applies to `browser-view`, whose *Files* include
  `tests/view/**`. So a slice that changes only quotation lines of view tests reads the whole
  styleguide, 93 455 characters. The same holds for `guidelines/testing.md`. I named both whole, as
  `product-guidelines/reading.md` and `AGENTS.md` require. This weighs on Slices 9–16 and is no
  defect of the guideline.
- Uncertain: editing a guideline file inside a task cycle. `the-way-maintain-styleguide` and
  `the-way-maintain-testing-guidelines` work in refinement; the cycle's author writes the file as
  the templates give. Slices 7 and 17 therefore read `.the-way/product-guidelines/template.md` and
  the discipline's `template.md`, not the maintain skills.
- `guidelines/testing.md:17-19` says D-82 is a departure "w dwóch sprawach". That is the sentence
  To do 6.3 corrects; it is consistent with the task.

## The order and the styleguide's example

The styleguide's "Plan of a user-interface change" orders the work of a new look: environment,
values, one screen, its states. This change alters no screen, only words, so the plan departs from
it (listed under *Choices*). The slices are ordered by dependency:
- the glossary first, since D-316's new *Rationale* in Slice 11 uses the new term `reading`;
- then the decision slices one after another, chained through `foundations/decisions.md` and the
  shared test files;
- Slices 2, 3, 4 and 17 have no dependency.

## Reaches beyond the dispatch

- `.the-way/task-cycle/slice_size.py`, `.the-way/task-cycle/skill/planning.md`: to understand how
  the size is measured and what the orchestrator's review asks.
- `.the-way/elements/common/foundation_check.py`, docstring lines 1–118 and a search for
  `decision:`: to learn that a quotation of a reworded binding sentence is an error, and that a
  reworded `test` invariant is only `listed:`. I ran it once on the base: `0 errors`.
- `.the-way/elements/decisions/skill/SKILL.md`, `.the-way/elements/common/way_of_working.md`, and
  `.the-way/elements/common/skill/SKILL.md` (opened by mistake; it is `find-foundation-entries`):
  to know what an executor of a decision edit does.
- `.the-way/product-guidelines/reading.md`, the first 60 lines of
  `.the-way/product-guidelines/styleguide/SKILL.md`, and the file lists of the two maintain
  skills: to settle the guideline reading.
- In the log: D-419, D-112, D-205, D-54, D-421, D-272, D-319, D-365, D-366, D-39, D-273, D-418,
  D-115, D-213, D-162, D-73, D-308, D-400–D-402, D-370, D-371, the section headings, and the
  withdrawn table row of D-358. I located each by heading range, and read whole only D-57, D-367
  and D-419. Why: successors of withdrawn entries, entries quoted or reached by the edits, and
  entries naming the band.
- Line ranges of every entry the plan names, computed by a script over the headings of the five
  foundation files, to write *Read*.
- `git grep` of the lines `decision: D-<n> "` for 44 decisions the task changes or reaches, to
  find which test files each reworded sentence breaks (the list in *Concerns*).
- The code and tests needed to name files and ranges:
  - `src/browser/view/camp.tsx` (first 80 lines);
  - `tests/invariants/account_container_support.py:120-135`;
  - `README.md` (lines 33–48 and 70–100);
  - `security-notes.md` (lines 1–12);
  - `tests/sim/encounters.test.mjs:720-730`;
  - `tests/invariants/test_program_world_reference.py:18-26`;
  - the first lines of `test_loop2_application_port.py` and `test_loop2_deploy_keeps_running.py`;
  - `tests/view/game-saver.test.mjs` (lines 850–862 and 918–935);
  - `foundations/decisions.md` passages of D-104, D-271, D-49, D-236, D-389;
  - the case lists of `tests/transport.test.mjs` and `tests/view/icons.test.mjs`;
  - `grep` hits in `types.ts`, `combat.ts`, `clock.ts`, `balance.ts`, `scene.tsx`, `trip-lines.ts`,
    `actions.ts`, `chronicle-entries.ts`, `maps-screen.tsx`, `run-header.tsx`, `programs.ts`,
    `database.ts`, `account-routes.ts`, `run.ts`, `account-backup.ts`, `deploy/loop2-deploy`,
    `compose.yaml`, `styles.css` and `run-screen.css`;
  - the uses of "camp" in the foundation, `src/`, `tests/` and the styleguide.
- `git show fc00c406:…` of the lines To do 4.4 and 7.1 cite.

## Working copies

- `.runs\planner\` held:
  - the script that computed the entries' ranges, and its outputs (entry ranges, decision
    quotations, the uses of "camp", code locations, the foundation check's output);
  - two variants of the plan, used to estimate the reading.

  The directory is removed.
- Kept beside this report:
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/planner-size-estimate.md`. It is the
  script's output on the variant of the plan that leaves out of *Change* the decision log and the
  test files edited at a few lines found by search; the question above cites it.
- No worktree or clone was made.

## Unread material

- `guidelines/styleguide-browser-view.md`: read in part, as the handoff allowed. I read:
  - its header (lines 1–8);
  - its list of section headings;
  - the section "Examples" (lines 1142–1160, with the order-of-work example);
  - the lines a search found for To do 6.1 (line 240), 6.2 (line 391), the rule "A name typed by
    the player breaks in its row" (heading at line 528) and "camp".
- The decisions of *Decisions in play* (both lists): located by heading and range, not read whole,
  except D-57, D-367 and D-419. Passages read: D-389 (first 8 lines), D-236 (first 4), D-104
  (lines 2590–2597), D-271 (lines 4880–4892), D-49 (lines 1057–1068). For the others I read only
  what a search or the quotation analysis showed. The executors read each whole through *Read*.
- The invariants the task names: located by range, not read, except the uses of "camp".
- The glossary: read only `at the camp` (lines 93–97) and the line of `headquarters`; the other
  named entries were located by range, not read.
- Environment facts: read only `node-sqlite-database`, `node-uncaught-default-print`,
  `node-assert-failure-inspect`, `playwright-mcp-default-profile-sharing`,
  `playwright-cli-workspace-lookup`, `playwright-cli-session-separation` and
  `session-secret-rotation`, each cut at 400 characters a line. The other facts of To do 5 were
  located by range, not read.
- The element skills other than decisions: not read (`SKILL.md`, `read.md`, `decide_entry.md`,
  `draft.md`, `write.md`, `template.md`, `examples.md` of glossary, invariants, part map and
  environment facts). Nor were `.the-way/elements/decisions/skill/read.md`, `decide_entry.md`,
  `template.md` and `examples.md`, or `.the-way/elements/common/rules.md`. I listed them by name
  and size only; the executors read them through *Read*.
- `.the-way/project-level/technology/reserved_choices.md`: not read. The change needs no new
  language, framework, library, store, login or place to run.
- Read whole: the task, `foundations/part_map.md`, `guidelines/coding.md`,
  `guidelines/testing.md`, `.the-way/task-cycle/plan/SKILL.md`,
  `.the-way/task-cycle/skill/foundation_step.md`, the handoff.

## Searches not found or unclear

- D-358: no entry; it is withdrawn (row at `foundations/decisions.md:11411`), successor D-419.
- `playwright-cli-sessions-per-workspace`: no entry; it is withdrawn
  (`foundations/environment_facts.md:975`), successor `playwright-cli-session-separation`.
- `button.ts` (D-44, `button.ts:2-4`): there is no such file in `src/browser/view/controls/`; the
  button is `react-button.tsx`.
- `styles.css:1712-1714` (D-46) and `styles.css:2437-2443` (D-322): the stylesheet is split
  (D-421). The rules of the map run's screen and its effects now stand in
  `src/browser/run-screen.css`. Slices 10 and 11 name passages of it that I located only roughly
  (`:80-110`, `:330-345`, `:760-780`); the executors confirm them.
- `database.ts:474-486` (2.7): the message limits now stand near `src/server/database.ts:534-575`.
  `account-backup.ts:15-22, 118-127` (D-232): the temporary copy is now made with `mkdtemp` in the
  system's temporary directory (line 69) and removed at line 99.
- `foundations/part_map.md:89` and `:156` (To do 4.4): these lines hold no "owner" at `fc00c406`
  (see *Concerns*).
- The number of commits between `fc00c406` and the base: 614 by `git log`, the handoff says 44.
- `.runs/quality-venv` does not stand in this worktree (it stands in the main checkout's `.runs`).
  The plan's ruff checks therefore say "where that environment stands, otherwise reported
  unchecked".
