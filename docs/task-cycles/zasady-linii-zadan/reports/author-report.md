# Author report — zasady-linii-zadan (the whole change as the one author)

Status: **done** (the conflict between the handoff and the decisions template is resolved by the coordinator's correction; see *Conflict and correction* below).

Worktree: `<repository root>`, branch `task/zasady-linii-zadan`, base `8a2b3f2c`.

## Commits

| Commit | Subject | Files |
|---|---|---|
| `59d3f8fd` | docs: :memo: read the task rules from the entry task-rules under loop2 in the locations file | `AGENTS.md` (+1 −1) |
| `a46e02fc` | docs: :memo: name the entry task-rules among the entries of loop2 in D-362 | `foundations/decisions.md` (+5 −5) |
| `9bbed2f8` | docs: :memo: restore the origin of D-362 without the task document of this task | `foundations/decisions.md` (correction; the *Origin* line is byte-identical to the base `01418389`) |

Nothing else changed. `.the-way`, `.gitmodules`, `.claude/skills/the-way-*` and `.agents/skills/the-way-*` were not touched. Nothing pushed; no branch created or switched.

## What was made

1. **Item 2 of To do** — `AGENTS.md`, section `## Backlog`: the bullet beginning "When a task document first reaches `Status: ready for cycle`" is replaced by the line of the-way's `AGENTS.md` at `e9a0f92` with `loop2` for `the-way`. Checked by comparing the two lines after the substitution: identical. Single-line bullet, as the neighbouring loop2 bullets are. The `Projects` and `Tasks` lines are unchanged.

2. **Item 3 and row 1 of Settlements to record** — `foundations/decisions.md`, `### D-362` (number kept; the entry is edited in place):
   - *Binding sentence*: the entries under `loop2` are now `projects`, `tasks` and `task-rules`; the rules of a task's line are named among the places loop2 points to. The "no absolute path on that disk" clause is unchanged.
   - *Verification*, `complies`: the example now names any entry under `loop2` (`projects`, `tasks` or `task-rules`) instead of `projects` alone. `violates` unchanged. The invariant `tracked-file-private-paths` is still the only invariant named; it derives from D-362 and its wording still matches (no change needed to it).
   - *Origin*: unchanged from the base (`zadanie_loop2_lokalizacje_poza_repozytorium.md` …). Earlier in this cycle I had added a clause naming this task document; the coordinator's correction removed it (see *Conflict and correction*).
   - *Rationale*: one sentence added — the rules of a task's line sit with the author's other rules for tasks, so a change to them reaches loop2 without an edit to the agent instructions.
   - *Rejected*: two ways from the row's source (task question 2, *Not chosen*) appended with their costs: leaving D-362 unchanged (an agent takes `task-rules` for an entry outside loop2's rules; the next foundation review must fix the mismatch); a separate loop2 decision that the rules come from the author's notes (repeats a rule the-way keeps for its own tasks; two places to keep up to date). The earlier rejected alternatives are kept.
   - No other decision derives from or narrows D-362 (grep of `D-362` in `foundations/` finds only D-362 and the invariant). No entry needed a change beyond D-362 itself.

### Entry for the row (`row 1`)

- D-362 — English: loop2 names the rules of a task's line by the entry `task-rules` under `loop2` in the locations file, and no tracked file holds a path on the author's disk.
- D-362 — Polska: loop2 wskazuje zasady linii zadań wpisem `task-rules` pod `loop2` w pliku lokalizacji, a żaden plik śledzony przez git nie zawiera ścieżki na dysku autora.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Foundation check (full, after the correction `9bbed2f8`) | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Foundation check (as the foundation step asks, before the correction) | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | `0 errors` |
| Tracked private paths (after the correction) | `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` | 0 | `checked: 436 files, 0 listed, 14 binary files not read` |
| Focused test directory | `python -B .the-way/gate/run_tests.py tests/agent_workflow` | 0 | `Ran 14 tests … OK` |

Not run: `npm test` (the gate; the orchestrator's run, per the handoff). No test was written or changed, so no failing-first run exists; the invariant `tracked-file-private-paths` is not changed by this work and its test was run once above (passing).

Pin check at start: `git -C .the-way rev-parse HEAD` = `e9a0f926dc9758f6554e8c0a30925d3e4d68cfed`; `git ls-files --stage -- .the-way` records the same commit.

## Own-work check (section 3 of the method)

- **Requirement most likely unmet:** the text of `AGENTS.md`, of D-362 and of every tracked file holds no absolute path on the author's disk and no note link (invariant `tracked-file-private-paths`). The new text names a note folder `Notes/Projects/(P) Loop/_zadania` and a task file name, which D-362's own binding sentence allows; no path or link. **Check:** the tracked-private-paths check above. **Shown:** exit 0, 0 listed.
- **Second requirement most likely unmet:** the AGENTS.md line must equal the-way's line with `loop2` in place of `the-way`. **Check:** a diff of the two lines after substitution. **Shown:** identical.
- **Third requirement most likely unmet:** D-362's *Origin* must not name this task document (WAY-27). **Check:** `cmp` of the *Origin* line against the base `01418389` after the correction. **Shown:** identical; no task document of this task is named.

## Choices made

- **Commit split:** two commits (AGENTS.md line; D-362), one per file, each message in the `docs: :memo:` style of `git log`.
- **Rejected for the D-362 *Rationale*:** no mention of how the decision was reached (the template forbids it); only the why of the rule.
- **Rejected in D-362 *Verification* `complies`:** the new example names the entry family, not only `projects`. The alternative (leave it) would have been coherent too; chosen because the handoff asks that the Verification examples be kept coherent with the change.
- **Choice of how to make the D-362 change's binding sentence:** added "the rules of a task's line" after "the list of its tasks", in the same sentence shape as before. Cost if wrong: a reviewer may prefer a shorter sentence; the meaning is unchanged in substance.

## Conflict and correction

- **Conflict:** the handoff asked that D-362's new *Origin* name this task document. The decisions template forbids it: `.the-way/elements/decisions/template.md`, section *Origin*: "a task document is never named in *Origin*, wherever the product keeps its tasks … (WAY-27)".
- **What I did first:** followed the handoff and added the clause `zadanie_loop2_zasady_linii_zadan_z_pliku_lokalizacji.md …` to *Origin* (commit `a46e02fc`).
- **Correction (coordinator's message, commit `9bbed2f8`):** the template is right. The *Origin* line of D-362 is restored to its exact text at the base `01418389`, naming only the earlier task document `zadanie_loop2_lokalizacje_poza_repozytorium.md`. Verified: the line is byte-identical to the base. The reasoning of question 2 stays in *Rationale* and *Rejected*, as written.
- **Observation (not changed, outside this task):** the base *Origin* of D-362 already names a task document, which WAY-27 forbids. It is an inherited convention, left as it is.
- **Recommendation:** none needed from this task; the convention of task documents in *Origin* is for the coordinator to settle repository-wide if it matters.

## Unread material

- Reading the foundation's examples: `.the-way/elements/decisions/examples.md` read (names WAY-03); the entry WAY-03 in the-way's `foundations/` **not read** (the example is not needed for a change of an existing entry; named here as the handoff's reading list does not name it).
- `.the-way/elements/decisions/projected.md` and `.the-way/elements/common/projected_mode.md`: not read (no projected mode in this change).
- `.the-way/elements/common/critique/`, `missing_element_file.md`: not read (no critique requested; the product's decisions file exists).
- The guideline files `guidelines/coding.md` and `guidelines/testing.md`: **not read**, as the handoff says they do not apply (no product code, test or user interface changed). Note: `guidelines/testing.md` line 93 mentions `ready for cycle` in an unrelated sentence; I did not read the guideline.
- `.the-way/project-level/task_line.md` (the-way's rule of a task's line; not named in the handoff): not read; not needed since the handoff gives the line's wording.
- Frozen task `docs/task-cycles/zasady-linii-zadan/task.md`: read whole.
- Foundation entries read whole: D-362 (`foundations/decisions.md`, the entry), invariant `tracked-file-private-paths` (`foundations/invariants.md`, its entry), part-map entries `agent-workflow` and `product-foundation` (`foundations/part_map.md`), the element's `template.md`, `rules.md` (89 lines, whole), `way_of_working.md`, `decide_entry.md`, `read.md`, `SKILL.md` of record-decision.
- Decisions whose *Scope* names `agent-workflow` or `product-foundation`: searched by *Scope* line (about 45 hits); titles read; none bears on the task rules or the backlog except D-362. The bodies of the others were **not read** (the reading method asks for whole reads of the decisions found on the topic; none was found by title).
- Glossary entries (reading method step 4): **not read** (no term of the change is a glossary term).

## Searches not found or unclear

- Searched `foundations/`, `guidelines/` and `AGENTS.md` for `task-rules`, `task's line`, `task line`, `ready for cycle` and `Backlog`: the only hits are D-362 and the AGENTS.md line, plus the unrelated sentence in `guidelines/testing.md:93` and one in `foundations/decisions.md:1548` (about the entry `projects`; it names the entry only and needs no change).
- Searched the decisions log by title for `agent`, `backlog`, `task`, `locat` and `path`: no title besides D-362 bears on the change.
- Unclear at first, now settled by the coordinator's correction: the handoff's phrase "in the form the decisions' template gives" for *Origin* (the template says the opposite for task documents).

## Problems as observed

- None in the change. The product's `npm test` gate was not run here (the orchestrator's).
- Observation: the base *Origin* of D-362 already names a task document (`zadanie_loop2_lokalizacje_poza_repozytorium.md`), which the template's WAY-27 forbids. Inherited convention, outside this task; not changed.
