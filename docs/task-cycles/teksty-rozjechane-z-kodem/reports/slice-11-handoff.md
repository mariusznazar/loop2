# Handoff — Slice 11

You are the executor of Slice 11 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `4e4ac095c58eb4c937881b93eb5b1bd32d2cbb73`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 11 — The styleguide: forms, sources, justification, roles, example, pair

- **Goal:** `guidelines/styleguide-browser-view.md`, written through the project skill
  `the-way-maintain-styleguide` as the cycle's author writes the file (its `SKILL.md` and
  `template.md` in *Read*), says six things right. (To do 15) The list of controls that depart from
  the list of states names also the React forms (`react-button.tsx` and the other four files of
  `src/browser/view/controls/`), not only the DOM files. (To do 16) The rule "Every value with its
  source" knows the kind of source that stands in the token file already: Mariusz's choice from a
  preview of variants (`--bar-width`, `src/browser/tokens.css`), for values beyond the terrain and
  the focus. (To do 17) The justification of the look of the list of programs (the passage citing "D-40,
  D-280") cites only decisions that speak of that list. (To do 18) The section "Program editor" no
  longer says the editor adds no new role, colour or value while it describes `rule-winning`,
  `rule-running` and the bars. (To do 19) The *Bad* example of the rule "The kitchen-sink page" no
  longer describes what the page has today (read from `src/browser/kitchen-sink/kitchen-sink.ts` as
  Slice 3 left it). (To do 20) The rule "Contrast of every pair" lists the pair of the fill of the
  progress bar above the mage's head against its track, for which the scene rule asks 3:1; the
  executor confirms in `tests/invariants/test_design_token_contrast.py` that the invariant's existing
  thresholds already cover it and adds no role, pair or threshold — where the item would add one, it
  returns `questions`. Other lines of the file stay.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:49-54` To do, items 15 to 20 ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/styleguide/template.md` ·
  `.the-way/product-guidelines/styleguide/SKILL.md` · `src/browser/tokens.css` ·
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/number-field.ts` ·
  `src/browser/view/controls/pick-cell.ts` · `src/browser/view/controls/select-list.ts` ·
  `src/browser/view/controls/text-field.ts` · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/view/controls/react-number-field.tsx` · `src/browser/view/controls/react-pick-cell.tsx` ·
  `src/browser/view/controls/react-select-list.tsx` · `src/browser/view/controls/react-text-field.tsx` ·
  `src/browser/kitchen-sink/kitchen-sink.ts` · `tests/invariants/test_design_token_contrast.py` ·
  `foundations/part_map.md:3-28` browser-view · `foundations/decisions.md:853-866` D-39 ·
  `foundations/decisions.md:868-881` D-40 · `foundations/decisions.md:883-896` D-41 ·
  `foundations/decisions.md:898-911` D-42 · `foundations/decisions.md:928-941` D-44 ·
  `foundations/decisions.md:943-956` D-45 · `foundations/decisions.md:5620-5644` D-269 ·
  `foundations/decisions.md:5937-5985` D-280 · `foundations/decisions.md:5987-6021` D-281 ·
  `foundations/decisions.md:6276-6299` D-291 · `foundations/decisions.md:6599-6657` D-308 ·
  `foundations/decisions.md:6659-6685` D-309 · `foundations/decisions.md:6687-6711` D-310 ·
  `foundations/decisions.md:7766-7794` D-349 · `foundations/invariants.md:479-487`
  design-token-contrast · `foundations/invariants.md:489-497` design-token-sources
- **Model:** same — six rule edits in one file whose rules refer to each other and to code
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`;
  `python -B scripts/test.py tests/invariants/test_design_token_contrast.py` exits 0 (the rule's
  invariant is unchanged); `git diff --check` exits 0
- **Depends on:** Slice 3
Slice 3 is committed (e04ac0e): the kitchen-sink page now draws tile icons with the game's placement; read kitchen-sink.ts as it stands. The kind of source that item 16 names is the one in src/browser/tokens.css (--bar-width): read that file and the rule 'Every value with its source' whole before editing.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-11-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
