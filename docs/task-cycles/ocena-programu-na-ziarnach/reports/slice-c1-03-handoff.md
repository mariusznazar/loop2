# Handoff — the executor of slice 3, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `bc386205`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 3 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-3/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-03-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- the plan's *Foundation entries* row 2, as the foundation step wrote it — find it in `foundations/` by its heading: The content revision of a program (0 when a program is made — created, saved from a copy as new, pulled from a previous save, the first program of a new game — and one higher at each save after which its rules, rule groups with their order or trip plan differ, never at a rename); the foundation step
- the plan's *Foundation entries* row 7, as the foundation step wrote it — find it in `foundations/` by its heading: D-401 — How does an account with the privilege pull the programs of its previous save? (an item of a version-9 save has exactly `id`, `name`, `program` and the content revision, an item of an earlier version the three keys, a pulled program starts at revision 0; the *Rejected* clause on „the items h
- the plan's *Foundation entries* row 9, as the foundation step wrote it — find it in `foundations/` by its heading: previous-save-programs-reader (from version 9 on an item's keys are exactly `id`, `name`, `program` and the content revision, before it exactly the three)
- `foundations/invariants.md:1048-1056` save-version
- `foundations/part_map.md:33-64` simulation
- `.the-way/product-guidelines/testing/template.md:180-200`
- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `src/browser/sim/types.ts:85-100`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 6-6 (reports/correction-1-remarks: remark 4)

4. **Nieaktualny tytuł testu w `guidelines/testing.md:177` (Findings outside the task's scope 3)** — poprawić w tej prośbie tak, żeby tytuł nie wymieniał numeru najwyższej wersji (wtedy nie zestarzeje się przy każdej zmianie wersji).

### lines 130-130 (spec: Decision 6 (S1))

- **S1 — the content revision of a saved program**: a field of `SavedProgram` (Decision 2), 0 in `newGame`, `createProgram`, `saveCopyAsNewProgram` and `appendPrograms`, raised by one in `withProgramSaved` where `sameData` finds the groups or the trip plan different, kept as it is by `renameProgram` and every other function that copies a saved program. `withProgramSaved` goes back to giving the list of programs alone (as before `3218a620`, when its callers used `withProgramContent`), now with the revision raised; its callers take the list as before slice 7. The save writes the field; the strict load reads it as a safe integer from 0, the item of the list holding exactly `id`, `name`, `program` and the revision, built from new values (`guidelines/coding-saved-game.md`, „Ścisłe wczytanie”); nothing compares it with anything at the load. The previous-save reader (`previous-programs.ts`) reads an item of a document of version 9 or above only where its keys are exactly `id`, `name`, `program` and the revision, and one of a version from 1 to 8 only where they are exactly `id`, `name` and `program`; the revision's value, like `id`'s, is neither read nor checked, since the pull makes a new program of revision 0.

### lines 173-173 (spec: Decision 10)

- **Previous save** (`tests/sim/previous-programs.test.mjs`, trust boundary `previous-save-programs-reader`): a version-9 document's programs read with their revision key, the pull making them programs of revision 0; an item of a version-9 document without the revision key, and one of a version from 1 to 8 with it, skipped and named.

### lines 179-183 (spec: Decision 11)

### 11. Settlements of the orchestrator after the review of the revision (`reports/spec-review-2-report.md`)

The review of the revised spec found one thing the build would get wrong, and offered one narrowing. The orchestrator settles them as a question of the cycle, and the planner and the maker take these as binding:

1. **D-401 is changed, unconditionally** (not „if the foundation step finds it needs it”): its binding sentence about the keys of an item of a previous save („… takes an item only when its keys are exactly `id`, `name` and `program` …”) says, after the change, that an item of a version-9 save has exactly the four keys `id`, `name`, `program` and the content revision, that an item of an earlier version has the three keys, and that a pulled program starts at revision 0; its *Rejected* clause that rests on „the items had one shape in every version” is corrected to say that the shape changed once, at version 9, for the revision. The three lines `decision:` of `tests/sim/previous-programs.test.mjs` that quote the old sentence follow the new wording, and the invariant on the previous-save programs reader (rewritten as the spec says) and D-401 must agree. Where the foundation step finds D-209 or D-402 name the same keys, it changes them the same way.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 3 — the reader of a previous save knows the revision, and the guideline names no highest version

- **Goal:** the previous-save reader `src/browser/sim/previous-programs.ts` (trust boundary
  `previous-save-programs-reader`) reads an item of a document of version 9 or above only where its
  keys are exactly `id`, `name`, `program` and the content revision Slice 1 named, and one of a
  version from 1 to 8 only where they are exactly `id`, `name` and `program`; the revision's value,
  like the id's, is neither read nor checked, since the pull makes a new program of revision 0
  (`appendPrograms`, Slice 1); every other item is skipped and named, and the reading still throws for
  no value a document can hold (D-401 as the Foundation entries changed it, the changed invariant).
  The failing cases come first in `tests/sim/previous-programs.test.mjs`: a version-9 document's
  programs read with their revision key and pulled at revision 0; an item of a version-9 document
  without the revision key, and one of a version from 1 to 8 with it, skipped and named; the case
  „an item with a key besides id, name and program is skipped and named, and the others go on”
  follows the changed invariant. The title of the case that today reads „a document of each version
  from 1 to 9, the current one included, gives its programs in order, a program without a trip plan
  skipped and named” names no highest version number, so that it does not go stale at the next raise
  (remark 4, `reports/correction-1-remarks.md:6`), and what the case checks stays. In
  `guidelines/testing.md`, rule „Trust boundaries”, the row of `src/browser/sim/previous-programs.ts`
  (line 177 at the base) names the renamed case and the new cases by their titles, with no highest
  version number, written as `.the-way/product-guidelines/testing/template.md` gives the rule. The
  lines `decision:` of `tests/sim/previous-programs.test.mjs` and `tests/view/previous-save.test.mjs`
  that quote D-401's sentence on the keys of an item follow its new wording; nothing else of
  `tests/view/previous-save.test.mjs` changes.
- **Change:** `src/browser/sim/previous-programs.ts` · `tests/sim/previous-programs.test.mjs` ·
  `tests/view/previous-save.test.mjs` · `guidelines/testing.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/reports/correction-1-remarks.md:6-6`
  remark 4 · `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:130-130` Decision 6 (S1) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:173-173` Decision 10 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:179-183` Decision 11 · Foundation entries
  row 2 · Foundation entries row 7 · Foundation entries row 9 · `foundations/invariants.md:1048-1056`
  save-version · `foundations/part_map.md:33-64` simulation ·
  `.the-way/product-guidelines/testing/template.md:180-200` · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `src/browser/sim/types.ts:85-100`
- **Model:** same — the slice changes a reader at a trust boundary and its direct refusal cases.
- **Risk:** trust boundary — `src/browser/sim/previous-programs.ts`
- **Checks:** `npm test -- tests/sim/previous-programs.test.mjs` (the new cases written first,
  failing) · `npm test -- tests/view/previous-save.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `python -B .the-way/elements/common/foundation_check.py` (its report names no stale quotation of
  the two test files and no fault of `guidelines/testing.md`)
- **Depends on:** Slice 1 · Foundation entries row 7 · row 9

## Notes of the orchestrator for this slice

- Slices 1 and 2 are made: each saved program carries `contentRevision`, the game state `madeAtMs`, loaded strictly; the document of version 9 in `tests/sim/saved-game.test.mjs` holds them (the version stays 9, not deployed).
- Your slice: the reader of a previous save (`src/browser/sim/previous-programs.ts`, a trust boundary of the part `simulation`): from version 9 on an item has exactly `id`, `name`, `program` and the content revision; before it exactly the three keys; a pulled program starts at revision 0 (D-401 as the foundation step changed it — its key sentence and *Rejected* clause — D-442, and the invariant `previous-save-programs-reader` as changed; read them whole). The three lines `decision:` of `tests/sim/previous-programs.test.mjs` and the ones in `tests/view/previous-save.test.mjs` that quote D-401's old key sentence follow its new wording (word for word from the beginning of a sentence); the foundation check shows no error for your files afterwards. Write the failing cases first (the reader refuses a version-9 item without the revision or with a non-integer / negative / unsafe one, and takes the three-key item of an earlier version), crafted-document cases at this trust boundary: foreign keys, `__proto__`, wrong types.
- Remark 4 (binding): the title of the trust-boundary case of `tests/sim/previous-programs.test.mjs` — today „a document of each version from 1 to 9 …” — and the line of `guidelines/testing.md` (about line 177) that names it by title must not name the highest version number, so that they do not go stale at the next raise of the version; change both together (the guideline names the case by its title: keep them equal), choose a title that says what the case checks without the number (for example „… each version below the current one …”) — read how the guideline names trust-boundary cases first, and say in the report what you wrote.
- Quote every `// decision:` line you add word for word. No full gate. Focused: `npm test -- tests/sim/previous-programs.test.mjs`, `npm test -- tests/view/previous-save.test.mjs`, the invariants tests that read the guideline (`npm test -- tests/agent_workflow/` where a test reads `guidelines/testing.md` — find them by search), ESLint, Prettier.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
