# Foundation entries handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`. Slice 1's base, written before this dispatch: `4bfb9623e9310220e335377df7fbb4c9ad413406` (also the task's base). Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`, gitlink and checkout equal.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. Your stage: **the agent of the plan's *Foundation entries*** — the foundation step of the planned route; you take none of the variant rows of `make-change`. Read `.the-way/task-cycle/skill/foundation_step.md` whole and follow it; read `.the-way/task-cycle/change/SKILL.md` (entry point `.claude/skills/the-way-make-change/SKILL.md`) for commits, own-work check and the report. When you write an entry of an element, read that element's skill and follow it: the project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term` (each `.claude/skills/<name>/SKILL.md`). Write no product code, no test, no guideline file and no part-map line. Questions go to the orchestrator in your report (status `questions`, or `blocked` for a question the foundation step leaves to the human), never to the human. Do not read `cycle.md`. Do not run the gate (`npm test`); run `python -B .the-way/elements/common/foundation_check.py` on your result.

Two questions at start: trust boundary — no; irreversible operation — no.

Write F1–F24 of the plan's *Foundation entries*. Not F25: the plan places the two part-map lines in Slices 4 and 5, with their check files, because `foundation_check.py` refuses a pattern of *Files* matching no tracked file. The two new invariants (F9, F15) are proposed under the identifiers `saved-program-edit` and `copy-save`; if the element's skill leads you to other identifiers, use them and name them in your report — the slices' check files take them. Each new invariant's *Verification* names its check `tests/invariants/test_<identifier with underscores>.py`, which Slices 4 and 5 create.

The plan's *Foundation entries* section, copied word for word from `.runs/task-cycles/programy-gracza/plan.md` (heading „Foundation entries”):

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F1 — row 1: the program list in the program panel, „Kopia w przejściu” first during a map run | decision | task, *Settlements to record* row 1 | Slice 6 |
| F2 — row 2: „Nowy program”, „Zmień nazwę”, „Usuń”; the new program's empty group; the last program stays; no duplicate today | decision | task row 2 | Slice 4 · Slice 6 |
| F3 — row 3: deleting the program of a running copy leaves the map run on the copy, with only „Zapisz jako nowy program” | decision | task row 3 | Slice 4 · Slice 5 · Slice 7 |
| F4 — row 4: the names of programs | decision | task row 4 | Slice 4 · Slice 6 |
| F5 — row 5: the select list „Program:” of a headquarters row and its default | decision | task row 5 | Slice 1 · Slice 4 · Slice 8 |
| F6 — row 6: the copy's heading, the line of unsaved changes, the three buttons, the copy belonging to the new program after „Zapisz jako nowy program” | decision | task row 6 | Slice 5 · Slice 7 |
| F7 — row 7: „Porzuć zmiany” is a destructive button (changes D-44's list) | decision | task row 7 | Slice 7 |
| F8 — row 8: a save over a changed program announced by a line in `warning` and done at once | decision | task row 8 | Slice 5 · Slice 7 |
| F9 — row 9: an edit of a saved program during a map run leaves that map run's copy, streak and counts; method test, its check `tests/invariants/test_saved_program_edit.py` under the proposed identifier `saved-program-edit` | invariant | task row 9 | Slice 4 |
| F10 — row 10: the screens after a death and a completion; „Zakończ” drops the unsaved changes; the counts after it (refines D-93) | decision | task row 10 | Slice 1 · Slice 6 · Slice 7 |
| F11 — row 11: the rule written at a discovery goes into the copy and its program, and neither counts it as a change (changes D-123) | decision | task row 11 | Slice 1 · Slice 5 |
| F12 — row 12: a switch starts the counts from zero and zeroes the beaten attacks with the streak (changes D-93) | decision | task row 12 | Slice 5 |
| F13 — row 13: the copy of a program | glossary term | task row 13 | every slice, for the word „copy” |
| F14 — row 14: picking a saved program during a map run opens it; the button „Przełącz postać na ten program” and when it stands | decision | task row 14 | Slice 7 |
| F15 — row 15: the two saves leave the copy's content and the streak; a save as a new program is no switch; method test, its check `tests/invariants/test_copy_save.py` under the proposed identifier `copy-save` | invariant | task row 15 | Slice 5 |
| F16 — row 16: „Przełącz postać na ten program” is a destructive button (changes D-44's list and rationale) | decision | task row 16 | Slice 7 |
| F17 — new: „How does the game state tell one program from another?” | decision | spec, *Foundation entries*, “Further entries”, first item; spec decision 1 | Slice 1 · Slice 4 · Slice 5 · Slice 8 |
| F18 — „(new) — Who owns a program?”, the part this task makes true, every part but those on the earning loop | decision | task, *Decisions in play*, projected entry „(new) — Who owns a program?”; spec, “Further entries”, second item | Slice 1 · Slice 4 · Slice 5 |
| F19 — D-136: “and every switch of the character to another program” sets the streak to zero | decision, change | task, *Decisions in play*, „(new) — How is a map solved, and what opens the next one?”; spec, “Further entries” | Slice 5 |
| F20 — `streak-program-change`: covers the copy, and every switch sets the streak to zero, also to a program of the same rules; method test | invariant, change | task, *Decisions in play*, `streak-program-change/1`; spec, “Further entries” | Slice 1 · Slice 5 |
| F21 — D-131: the edits of the copy the map run carries out, the discard among them; an edit of a saved program leaves the streak | decision, change | spec, “Further entries”; task To do 7 | Slice 1 · Slice 4 · Slice 5 |
| F22 — D-44: „Porzuć zmiany” and „Przełącz postać na ten program” join the destructive buttons, and the rationale widens (rows 7 and 16) | decision, change | spec, “Further entries” | Slice 7 |
| F23 — D-93: rows 10 and 12 and spec decision 6 | decision, change | spec, “Further entries” | Slice 1 · Slice 5 · Slice 6 · Slice 7 |
| F24 — D-123: row 11 | decision, change | spec, “Further entries” | Slice 1 |
| F25 — part map: the part `simulation` gains by name the check files of F9 and F15 | part map, change | spec, “Further entries”, last item | Slice 4 · Slice 5 |

The foundation step writes F1–F24 before Slice 1, through the project skills `the-way-record-decision`, `the-way-record-invariant` and `the-way-record-glossary-term`. F7, F10, F11, F12 and F16 may be written as the changes of D-44, D-93 and D-123 that F22, F23 and F24 name, as the foundation step words them.

Read, for the wording and meaning of each entry:
- The frozen task `.runs/task-cycles/programy-gracza/task.md` whole (accepted 2026-10-28): *Questions to settle* Q1–Q17 with their sources, *Settlements to record* rows 1–16, *Decisions in play* (the projected entry „(new) — Who owns a program?” quoted there in full, the two additions, Q11's rule of wording: no excluding words such as „tylko”, „nigdy”, „zawsze”, „bez” in new rows; the approved projected entry keeps its wording, and new rows do not repeat its excluding words).
- The spec `.runs/task-cycles/programy-gracza/spec.md`: *Decisions* 1–8 and *Foundation entries* (lines 198–233), the meaning sentences you word from. The orchestrator's answers `reports/03-design-answers.md` and `reports/06-spec-revision-handoff.md` (autonomous choices, not human approval).
- The approved definition `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` (approved 2026-10-28, fingerprint 7e33760d), § Projected foundation changes, „(new) — Who owns a program?” (about lines 995–1045) for F18's wording, *Verification* and *Rejected*, and „(new) — How is a map solved, and what opens the next one?” for F19. Name each as the entry's *Origin* as the element's skill gives.
- Current foundation entries, whole, as they stand at the base: D-04, D-20, D-22, D-23, D-39, D-44, D-52, D-53, D-54, D-55, D-56, D-62, D-90, D-91, D-92, D-93, D-118, D-119, D-122, D-123, D-124, D-126, D-127, D-131, D-132, D-133, D-135, D-136, D-143; invariants `streak-program-change`, `action-in-progress`, `restart-seed`, `map-run-repeatability`; glossary `foundations/glossary.md` whole; part map entries `simulation` and `browser-view`.

Write the entries in as few commits as the skills and the foundation step allow, each commit a coherent set, message in English as the repository's commits are (`docs: :memo: …`), `git add` by path. Report at `.runs/task-cycles/programy-gracza/reports/11-foundation-report.md`: each entry's identifier with its line range after your commits, one sentence of its meaning in Polish (the task document's language) for the request, the row(s) of *Settlements to record* each carries, the commits, and each check with its command and exit code. Return status, commits, a one-line check result naming what failed or did not run, and the report path.
