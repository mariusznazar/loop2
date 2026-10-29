FAIL

# Independent spec review — programy-gracza

Reviewer of `.runs/task-cycles/programy-gracza/spec.md` against the frozen task
`.runs/task-cycles/programy-gracza/task.md` (accepted 2026-10-28), the designer's report
`reports/02-design-report.md` and the orchestrator's answers `reports/03-design-answers.md`.
Method: `.the-way/task-cycle/spec/SKILL.md` (entry point `.claude/skills/the-way-write-spec/SKILL.md`),
review variant `.the-way/task-cycle/spec/review.md`. Worktree
`C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`, HEAD `4bfb962`.
`cycle.md` was not read.

Two findings: one omission against the foundation (the part map) and one requirement read in a way
the product's own vocabulary does not support, unnamed. The rest of the spec holds against the task
and the foundation; the points the handoff asked about are confirmed one by one below.

## Findings

### F1 — The two new invariants need a part-map change the spec says is not needed

Spec, `spec.md:230`: "Entries this task does not change, checked against it: … the part map (the new
modules fall under `src/browser/sim/**` and `src/browser/view/**`)." The same spec writes two new
invariants with method test, rows 9 and 15 (`spec.md:210`, `spec.md:216`), and leaves "tests for the
two new invariants" to the maker (`spec.md:239`).

In this repository every invariant with method test has its check at
`tests/invariants/test_<id>.py` (e.g. `tests/invariants/test_streak_program_change.py`), and the
part map claims each such file **by name**, with no glob: the `simulation` part lists them one by one
(`foundations/part_map.md:32`–`:53`), `browser-view` likewise (`:7`–`:22`), and *Files left out on
purpose* is empty (`:170`–`:173`). A new `tests/invariants/test_<new-id>.py` is therefore claimed
by no part, and `foundation_check.py` reports "no part claims it"
(`.the-way/elements/common/foundation_check.py:561`).

What goes wrong in the build: a maker who follows the repository's convention adds two test files
the foundation step has no entry for. The gate then fails, or the part map gets changed without
`the-way-update-part-map` at the last minute. The spec's statement that the part map is unaffected
is wrong as soon as the invariants' tests exist.

Fix: list among the *Foundation entries* a part-map change in which the `simulation` part gains the
two invariant test files (written through `the-way-update-part-map`), or say where those tests go
if not in `tests/invariants/`, and drop the part map from "Entries this task does not change".

### F2 — „z podpowiedzią pierwszej wolnej nazwy” read as a pre-filled field, with no reading named

Task, To do 8: "„Zapisz jako nowy program” pokazuje pole nazwy z podpowiedzią pierwszej wolnej nazwy
i „Zapisz”"; row 6: "zapis jako nowy program podpowiada pierwszą wolną nazwę". Spec, `spec.md:163`:
"The same field serves „Zmień nazwę” and „Zapisz jako nowy program”; for the latter it is filled with
the suggested name."

In this product the "podpowiedź" of a field is the text it shows while it is empty: the styleguide's
empty state reads "puste pole z podpowiedzią w `text-label`"
(`guidelines/styleguide-browser-view.md:174`–`:175`), and the shared text field takes it as `hint`,
written to `placeholder` (`src/browser/view/controls/text-field.ts:14`, `:47`, `:84`; used in
`src/browser/view/headquarters.ts:104`, `hint: "Imię"`). The spec takes the other reading, a value
already typed into the field, and its four checks do not name it among the requirements read two ways.

The answer changes what the player does. If the field is pre-filled, clicking „Zapisz” without
typing saves under „Program n”. If the name is only a hint, the field is empty: „Zapisz” without
typing is refused with „Wpisz nazwę programu.” (To do 4: the name must not be empty), and the player
has to type the name the hint shows.

Question to the orchestrator: is the suggested name the field's value or its hint? Both cost about
the same to build. The pre-filled reading fits To do 4's non-empty rule better, because a suggestion
that cannot be saved without retyping does little. But the task's word, in this product's
vocabulary, means the hint. Whichever the answer, the spec should state it as a reading.

## Points the handoff asked about

- **Every *To do* item.** All twelve items are covered: 1 (decisions 1–2), 2 (decision 7), 3
  (decisions 2, 3, 5, 7, with Q-D3), 4 (decision 2, texts Q-D2), 5 (decisions 4, 8, order Q-D4), 6
  (decision 3), 7 (decision 5 "edit the copy"), 8 (decisions 3, 5, 7), 9 (decisions 2, 3, 5, 7,
  Q-D1), 10 (decisions 3, 6, 7, Q-D5), 11 (decision 5, last paragraph), 12 (decisions 5, 7). None is
  dropped or changed apart from F2.
- **Every row of *Settlements to record*, the projected entry and the two additions.** Rows 1–16
  stand at `spec.md:201`–`:217`, each with the task's kind (rows 9 and 15 are invariants, row 13 a
  glossary term). „(new) — Who owns a program?” is recorded without its earning-loop parts, as the
  task says. The D-136 clause and the `streak-program-change` clause about a switch are both there,
  and the latter is tested with a switch to a program with the same rules. The only gap is the
  part-map change of F1.
- **The program-number decision against D-56 and D-22.** It holds. The decision uses one more than
  the number given last, keeps the next number in the game state and never gives a number twice; it
  rejects random identifiers for D-22's reason, as D-56 does. The spec makes it a new decision with
  *Rejected* and *Verification*.
- **The copy and its base against restart, switch and the death and completion screens.**
  - „Restart” carries the whole copy record forward and keeps the seed (D-62, `restart-seed`; the
    code's `restart` passes `run.seed`, `src/browser/sim/game.ts:502`).
  - A switch keeps the seed, the minute and the action in progress (D-20, `action-in-progress`). It
    is refused after a death or a completion (Q12, the `map run` term).
  - The copy stays editable and savable on both end screens without a streak reset (D-62, D-132,
    `setProgram`'s rule for an ended run, `game.ts:405`–`:416`).
- **The counts against D-93.** All these keep D-93's content rule: edits reconcile, saves leave the
  counts, a discard reconciles, „Restart” and a switch start from zero, and after „Zakończ” the
  counts are reconciled against the copy's program and stay beside it alone. The D-93 change names
  the narrowing to the copy's rules (Q-D5). After save-as-new, the counts follow the copy's
  identities, which the new program inherits.
- **The first-chill write against D-123 and To do 11.** The rule goes into the copy, its base and the
  copy's program, each into its own first group by `withFirstChillRule`
  (`src/browser/sim/understanding.ts:314`). The pairs stay equal or unequal as before, so the write
  makes no unsaved change and nothing for the save to announce. The ids match because before the
  first chill no program can hold a rule (D-124), so every `nextRuleId` is equal. Writing into "the
  copy's program" after save-as-new, rather than into the original program, is the only reading
  under which To do 11 holds, because the base then tracks the new program.
- **The D-131 change against row 9.** They agree. D-131's "Of the edits of the program" becomes the
  edits of the copy, the discard included, and an edit of a saved program leaves the streak.
- **The boundary between the simulation and the view (D-04, `simulation-inputs`).**
  - Everything the game must remember goes through simulation functions that return a
    `GameResult`: the list, the names, the copy record, the row pick and the program used last.
  - Only the panel's shown program is view state, and it is never saved.
  - The editor keeps passing edits to the simulation, as D-04's compliance example has it.
- **No work of tasks 13, 16 or 18.** The spec only leaves room for them: the copy lives on the map
  run, so each earning loop can own one; the records are plain game-state data; the trip plan is
  untouched. The glossary term's mention of an earning loop is the task's own wording of row 13.

## Observations (not findings)

- `spec.md:102` calls "changed since" "a comparison of content, so a program edited and then put back
  counts as unchanged". The spec does not say whether the identity counters count as content.
  `setProgram`'s comparison includes them (`game.ts:412`), so a rule added and then deleted still
  counts as a change. Reusing that comparison, the natural build, is consistent with D-131 as it
  stands, and nothing else depends on the choice today. One sentence would remove the doubt.
- `spec.md:89` keeps a deleted program's name in the copy record, while the new decision's
  *Verification* names "a pointer naming a program by name" as a violation (`spec.md:221`). The name
  is only for display, not a pointer. Saying so in the decision would stop a later reviewer from
  misreading it.

## Reaches beyond the handoff's list

- `.the-way/task-cycle/spec/review.md`: the method that the skill names for this step.
- `foundations/part_map.md`, the *Files* of `simulation` and `browser-view` and the empty *Files
  left out on purpose*, together with the `tests/invariants/` listing,
  `.the-way/elements/common/foundation_check.py:561` and `.the-way/elements/invariants/template.md`
  (grep): to check whether new invariant tests are claimed (F1).
- `foundations/decisions.md` D-54 (cited by the spec for list order) and the parts of D-24, D-25,
  D-57, D-144, D-150 and D-151 printed alongside the ranges read. None bears on a finding.
- `src/browser/view/controls/text-field.ts` (grep for `hint`) and
  `guidelines/styleguide-browser-view.md:174`: what "podpowiedź" means in the product (F2).
- In the predecessor game loop, the test `src/sim/policy.test.ts:595`–`:660` (`cdc7c0d`), which the
  definition allows: the naming tests the task cites, read for F2. They leave the UI open.

## Checks run

- `git rev-parse HEAD`: exit 0, `4bfb9623e9310220e335377df7fbb4c9ad413406` (equal to the handoff's
  base).
- `git status --short`: exit 0, clean.
- `git -C .the-way rev-parse HEAD`: exit 0, `3aee7d958835cc19b95519f4d21b37538b78e3e1`. `git ls-files
  --stage -- .the-way`: exit 0, the same commit, so the pin holds.
- `git check-ignore -q .runs/task-cycles/programy-gracza/reports/05-spec-review.md`: exit 0, ignored.
- The code citations in the spec's *Constraints* were checked by grep (all exit 0): `types.ts:251`,
  `game.ts:276`, `:327`, `:339`, `:416`, `:502`, `:521`, `:632`, `understanding.ts:314`,
  `game-view.ts:40`–`:60`, `program-editor.ts:616`, styleguide `:196`–`:197`. All match the code at
  `4bfb962`. The count of test files that reach `setProgram` or `.program`: 41.

Not run: `npm test`, `python -B .the-way/elements/common/foundation_check.py` and every other gate
check. The handoff excludes them at the spec stage, and no product file changed. F1 is therefore an
inference from the part map's explicit file lists and the check's rule, not an observed failure.
