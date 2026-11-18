# Report - executor of slice 4 (the guidelines of code and tests cover the part)

**Status:** done

## Commits and files

- `5dcd4781` docs: cover the part balance-tools in the coding and testing guidelines
  - `guidelines/coding.md`: +3 -3
  - `guidelines/testing.md`: +5 -3

## What changed

`guidelines/coding.md`
- *Applies to* gains `balance-tools`, after `build-tools` (the order of `foundations/part_map.md`).
- Paragraph under `### Linter` ("Wzorce plików `eslint.config.mjs` ..."): "pięciu części, które D-29 wymienia" became "sześciu", with `balance-tools` (`balance/` and `tests/balance/`) named among them. D-29's sentence lists browser-view, simulation, account-server, build-tools, balance-tools and deployment, so six; its *Scope* has seven entries because agent-workflow's three directories stand apart, as the paragraph already says.

`guidelines/testing.md`
- *Applies to* gains `balance-tools`, after `build-tools`.
- Table of parts: new row `balance-tools` - "W obliczeniach na zbudowanej symulacji gry: przebiegach rozgrywek z danego ziarna, ich sumach i zgodności wyniku z tym, co daje sama gra."
- Recipe `unit test`: *Files* now reads "`tests/sim/`, `tests/view/` i `tests/balance/`"; *Purpose* names "obliczenia przyrządu pomiarowego balansu na zbudowanej symulacji" beside the rules of the simulation and the logic of the view.
- *Where in code*: `tests/balance/` added beside `tests/sim/` and `tests/view/`.

The guidelines are written in Polish, so the additions are Polish; identifiers and paths stay as they are.

## Places that count the parts or name the files the linter reaches

Found in the two files, and what I did:

| Place | Action |
|---|---|
| `coding.md` *Applies to* | counted the part (added) |
| `coding.md` `### Linter` paragraph, "pięciu części, które D-29 wymienia" | counted the part (five -> six) |
| `coding.md` `### Formatter` paragraph: "każdy plik TS/JS części z zakresu D-32" | unchanged: it names no number and no list of parts; it points at D-32's scope, which now holds the part |
| `coding.md` `### Size of a function and a file`: "pliki części z niezmiennika" | unchanged: names no part; follows `function-and-file-size`, which the foundation step already widened |
| `coding.md` *Where in code* (configuration files and the tests of the standing checks) | unchanged: it lists configuration and tests, none of them new |
| `coding.md` `### Linter` paragraph on three agent-workflow directories and the shellcheck list | unchanged: about agent-workflow and Bash scripts, not the new part |
| `coding.md` *Kinds of code*, *Examples* | unchanged (see the kind judgement below) |
| `testing.md` *Applies to*, table of parts, unit-test *Files* and *Purpose*, *Where in code* | changed as above |
| `testing.md` `### Mutation testing`: "W pozostałych częściach autor sprawdza w głowie" | unchanged: it already covers `balance-tools`, since Stryker is adopted for `simulation` alone |
| `testing.md` `### Trust boundaries` | unchanged: the part has no trust boundary (part map) |
| `testing.md` `### Test files in the gate` | unchanged: it speaks of patterns passed to Node, and `scripts/test.py` has the pattern `tests/balance/*.test.mjs` since Slice 2 |
| `testing.md` `integration test` and `smoke test` recipes | unchanged: the tests of the part import the built simulation and the instrument, read no test data and start no process (D-81; plan Choice 12) |

## Kind of code: the instrument's code is no kind of its own

I judged it with `kinds.md`, `recognize.md` and the template. I find none, and write no `coding-<kind>.md` and no row in *Kinds of code*:

1. A kind needs an exemplar, and the exemplar is designated by a decision the human approves (`kinds.md`, "Who designates the exemplar"; the template's "Required form of a kind"). The frozen task asks only for the part's name in the two lists and the table row; no settlement designates an exemplar, so a kind written now would be a rule the task did not settle.
2. D-28 defers separate exemplars for build, deployment and entry-point code, and the instrument's code is of that family: one engine module that imports the built simulation, and a command line to come in Slice 8.
3. The one convention a script could check of the instrument's code - it imports the simulation only from `dist/browser/sim/` and copies none of its numbers - is already kept by `cross-part-imports` (`balance-tools` depends on `simulation`) and `instrument-game-agreement` (`tests/balance/agreement.test.mjs`). A kind rule would repeat them.
4. Only `balance/engine.mjs` (354 lines) exists when this slice is made; the other modules arrive in Slices 5-9. A kind judged from one file would be the case "a first file built with no exemplar is the file every later one copies". The question may be asked again when the part is whole, as an extension of the coding guidelines.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 (printed "0 errors") |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (5 tests OK) |
| `python -B .the-way/instruction-files/check_instructions.py` (the check the skills name for guidelines is the foundation check; this one I ran for the guideline files too) | 0 (0 errors, 144 warnings, 7 info; the warnings are sizes of files, I did not compare them with the base) |

The full gate (`npm test` with no file) was not run, as the handoff says.

## Own-work check

Requirement most likely unmet: "its identifier stands in *Applies to* of both files, and the table of parts says its complexity lies in calculations on the game's simulation", and that the linter paragraph's count is right. A script of mine (not kept) read both *Applies to* lines and the table: the parts of *Applies to* of `testing.md` equal the parts of its table rows (8 and 8), `coding.md` names 8 parts, both contain `balance-tools`, and D-29's sentence lists six TS/JS parts (the count 7 of its *Scope* includes agent-workflow, which the paragraph treats separately). It passed.

## Choices

- Position of `balance-tools` in the lists: after `build-tools`, as in `foundations/part_map.md`; the alternative, at the end, would break the order the part map gives. Cost if wrong: a reordered line.
- The unit-test *Purpose* sentence also names the instrument: the slice asked for *Files* only, but a recipe whose *Files* include a directory whose *Purpose* does not name its subject would read oddly. Cost if wrong: one clause removed.
- No new rule, exemplar or decision: the template says a choice the task did not settle never becomes a rule.

## Problem observed (for the orchestrator, not fixed here)

The *Scope* of D-28, D-73, D-81 and D-85 does not name `balance-tools`, while both guideline files now apply to it, and the tests of the part follow D-73 and D-81 (they are unit tests under D-81). The foundation check passes, so nothing stops, but the decisions' *Scope* lines and the guidelines now disagree on the parts. The foundation step (plan row "D-29 and D-32 ... D-425") changed only D-29, D-32 and D-425; this slice may change only the two guideline files, so I left the four decisions as they are. Whether to add the part to their *Scope* is the cycle's call (a change of decisions through `the-way-record-decision`).

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` (named by the method, not by the handoff).
- `.the-way/product-guidelines/coding/recognize.md`, `.the-way/product-guidelines/coding/template.md`, `.the-way/product-guidelines/testing/recognize.md`, `.the-way/product-guidelines/testing/template.md`: the form of the files and the rules for judging a kind; the skills name them for steps 1-4.
- `.the-way/elements/common/foundation_check.py` (its header and the lines on guidelines): to see what it checks of *Applies to*.
- `eslint.config.mjs`, `.gitattributes`, `tests/quality/test_source_tool_scope.py`, `tests/quality/test_quality_invariants.py`, `scripts/test.py` (grep and short reads): to state which files the linter reaches and that the pattern of the tests stands.
- `foundations/decisions.md` D-30, D-31 by reading around D-29/D-32 (lines 461-489): incidental to the D-29 range.

## Unread material

- `.the-way/product-guidelines/coding/{starting_set,research,trial_run,settle,task_document,new_tools,hand_back}.md` and `.the-way/product-guidelines/testing/{starting_set,research,audit,new_level,settle,task_document,new_tools,hand_back}.md` and `.the-way/product-guidelines/{audit_end,template}.md`: not read; the steps they serve (the research, the trial run, the audit, the settling with the human and the hand-back to refinement) belong to the refinement of a task, and here the task document is the frozen task, which settles the change. I grepped the two `hand_back.md` files for the checks they name (only the foundation check and the audit end, which did not run).
- `.the-way/product-guidelines/coding/SKILL.md`, `orchestrated_mode.md`, `kinds.md`, `.claude/skills/the-way-maintain-*-guidelines/SKILL.md`, `.the-way/product-guidelines/testing/SKILL.md`, `orchestrated_mode.md`, `reading.md`: read whole.
- `foundations/decisions.md` D-28, D-29, D-32, D-73, D-81, D-85: read whole (D-29 and D-32 as changed).
- `foundations/part_map.md`: read whole.
- `.runs/task-cycles/przyrzad-balansu/task-frozen.md`: read lines 36-68 (the range 38 and 61-65 and around); the rest not read. `plan.md`: read whole.
- `tests/sim/acceptance.test.mjs`: read lines 1-80 of the file only; the rest unread (it holds no part list or guideline text).
- `balance/engine.mjs`: read whole. `tests/balance/agreement.test.mjs`: lines 1-80 read. `tests/balance/engine.test.mjs`: lines 1-60 read. (Slice 3 changed no file under `balance/` and `tests/balance/`.)
- `guidelines/coding.md`, `guidelines/testing.md`: read whole before the change.
- `guidelines/coding-simulation-module.md`: lines 1-40 read, to see the form of a kind's file.

## Searches not found or unclear

- None found missing. Unclear: whether "the mode for an agent of the task cycle" is the orchestrated mode of the skills; their `orchestrated_mode.md` files describe the routing of a refinement turn to a project orchestrator, which does not apply to a cycle's author, so I took the cycle author's side of each skill (the template's "Writing the files").
- The checks "the two maintain skills name for the guidelines they change": the skills name none by command; the foundation check is the one that reads guidelines, and the quality test is the slice's own. I ran both, and `check_instructions.py` as well.

## Working copies

None made. `.runs/executor-4/` was not created.
