# Handoff — the plan's *Foundation entries*, task `rozwiazanie-lasu`

## Delegation

The person who requested this cycle (the product's owner) has delegated every intermediate choice of
the cycle to its orchestrator. Send your questions to the orchestrator, never to the human; the
orchestrator's answers are not the human's approval. A question the foundation step leaves to the
human goes back with the status `blocked`.

## Where and how

- Worktree: `C:\Storage\repos\loop2-wt\rozwiazanie-lasu` — work from its root. Branch
  `task/rozwiazanie-lasu`; base of slice 1 and of this stage: `c0c51a0` (the branch's first commit,
  which moved the-way pin from `574a37b` to `3aee7d9`).
- Method: `.the-way/task-cycle/change/SKILL.md` (pinned the-way `3aee7d9`), read whole. Your stage is
  **the plan's *Foundation entries*** — none of the method's variant rows is yours; you write the
  foundation entries the plan lists, and no product code or test.
- Read whole also `.the-way/task-cycle/skill/foundation_step.md`, and the skill of an element when
  you write an entry of that element: the project skills `the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`
  (entry points in `.claude/skills/the-way-*/SKILL.md`, each pointing into `.the-way`). Never an
  unprefixed personal skill of the same name.
- Commit on the branch, by paths (`git add <file>…`, never `-A` or `.`), with commit messages in
  English in the repo's form (`docs: :memo: …`), one or more commits.
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/12-foundation-entries-report.md`
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md` — read whole: its *Settlements to
  record* (rows 1–14 and the notes under them), *Decisions in play* (the current wordings and
  "Zadanie zapisuje" / "Zadanie urzeczywistnia część wpisu…") are the source of the entries.
- Reviewed spec: `.runs/task-cycles/rozwiazanie-lasu/spec.md`, section *Foundation entries*
  (lines 295–342) and decisions 1–6 for the meaning the code will have.
- Plan: `.runs/task-cycles/rozwiazanie-lasu/plan.md`, section *Foundation entries* (lines 7–34):
  that table is your list of what to write; copied here word for word:

> | Entry | Kind | From | What depends on it |
> |---|---|---|---|
> | D-21, new answer | decision, changed | *Settlements to record* row 1; spec *Foundation entries* | Slices 1, 2 |
> | The chosen pace stays until the player changes it; a new game starts at 1× | decision, new | row 2 | Slices 1, 2 |
> | Five buttons „1×”–„16×” beside „Pauza”, the chosen one a button selected in its group | decision, new | row 3 | Slice 2 |
> | `player-map-run-pace`, new wording; check: `tests/invariants/test_player_map_run_pace.py` | invariant, changed | row 4 | Slices 1, 5 |
> | D-71, a sentence added (streak after the body step; completion at the place of the pick) | decision, changed | row 5 | Slices 3, 5 |
> | Of the edits of the program, an edit after which it differs sets the streak to zero | decision, new | row 6 | Slice 4 |
> | The completion screen; D-62, a sentence added (pace buttons gone with „Pauza” after death) | decision, new · D-62 changed | row 7 | Slices 2, 5, 6 |
> | `map run restart`, new wording (also after a completion) | glossary term, changed | row 8 | Slice 5 |
> | The status row shows the streak; the headquarters shows the map's condition sentence | decision, new | row 9 | Slice 6 |
> | „Mapa: {mapa} · rozwiązana” in `positive` from the first completion | decision, new | row 10 | Slice 6 |
> | The game does not show a map run's longest streak today | decision, new | row 11 | Slices 3, 6 (they add none) |
> | D-122, new wording (a completion in the minute of a discovery replaces the pause) | decision, changed | row 12 | Slices 5, 6 |
> | `minute-span-split`, new wording (up to the end of the map run); check: `tests/invariants/test_minute_span_split.py` | invariant, changed | row 13 | Slices 3, 5 |
> | D-93, the sentence of the ends of a map run gains the completion | decision, changed | row 14 | Slice 5 |
> | `completion` | glossary term, new | task *Decisions in play*, "Zadanie zapisuje"; spec | Slices 5, 6 |
> | `solved map` | glossary term, new | task *Decisions in play*, "Zadanie zapisuje"; spec | Slices 5, 6 |
> | `streak` | glossary term, new | task *Decisions in play*, "Zadanie zapisuje"; spec | Slices 3, 4, 6 |
> | `manual map run` | glossary term, new | projected entry the task's code makes true whole (WAY-126); spec | Slices 1, 2 |
> | `streak-program-change` — the part on a change of the program rules or rule groups; check: `tests/invariants/test_streak_program_change.py` | invariant, new (projected `streak-program-change/1`, part) | projected entry assigned to this task; spec | Slice 4 |
> | Part `simulation`: *Files* gains `tests/invariants/test_streak_program_change.py` | part map, changed | follows from the invariant's new check file | Slice 4 |
>
> Not written by this change, though its code makes part of them true: "(new) — How is a map solved,
> and what opens the next one?" (task 8 writes it) and "(new) — How fast does the earning loop go?"
> (task 18 writes it), as the task's *Decisions in play* assigns them.

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## Orchestrator's answers binding this stage

- The task document is written in Polish; foundation entries are in English, as the product's
  foundation is. Keep for the request one sentence of each entry's meaning in Polish (WAY-114), in
  your report.
- Rule of wording the human set for this task's candidates (task, question 10, way B): a candidate
  contains no „tylko”, „nigdy”, „zawsze”, „bez” or other words that exclude an alternative —
  in English likewise "only", "never", "always", "without"/"no … ever" used to exclude; an
  exclusion that outlasts the task describes what the game does not have today, not what it may not
  have. Row 11 is such an exclusion ("today").
- The invariant tests themselves are written by slices 1, 4 and 5, not by you: an invariant whose
  check file does not exist yet (`test_streak_program_change.py`) is written with that check named,
  and the part map line for that file is yours.
- `python -B .the-way/elements/common/foundation_check.py` must exit 0 after your commits; run it
  and report its command and exit code. Run no other gate.

## What to read of the foundation

Each entry whole, from the worktree as it stands: decisions D-04, D-18, D-20, D-21, D-24, D-39,
D-44, D-53, D-55, D-60, D-61, D-62, D-71, D-90, D-93, D-118, D-122, D-123; invariants
`player-map-run-pace`, `minute-span-split`, `map-run-repeatability`, `restart-seed`,
`action-in-progress`, `program-rule-pick`; the glossary (`foundations/glossary.md`, read whole);
the part map entries `simulation` and `browser-view`. The element skills tell you what else to
search (the search of the whole foundation, WAY-33).

## Report

Write your full report to the report path as the method and `foundation_step.md` give it — each
entry written with its identifier, its Polish meaning sentence, the row it comes from, and each check
with its command and exit code — and return only your status, your commits and the report path.
