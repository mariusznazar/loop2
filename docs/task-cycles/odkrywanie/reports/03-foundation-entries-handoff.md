# Handoff — writer of the plan's foundation entries, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human. Your go-ahead is
provisional; the human accepts the entries by merging the request.

## Your stage

- Method: the project skill `the-way-make-change` (pinned the-way at `.the-way`, commit 574a37b),
  read whole with what it names, as the agent that writes the plan's *Foundation entries* before
  slice 1. This stage is "the foundation step" of `.the-way/task-cycle/skill/SKILL.md` — read the
  paragraph of that file that begins "The foundation step writes the entries the task carries"
  whole. Write each entry only through the project skill of its element:
  `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term` (each
  reads and searches as its own step 1 and step 2 give).
- Boundary: write foundation entries only — no product code, no test. Change an invariant's sentence
  only; its test changes in slice 8 (program-rule-pick) and slice 10 (player-map-run-pace,
  minute-span-split). Return before slice 1.
- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/odkrywanie`, branch `task/odkrywanie`, base
  `d9a237435f22c29b7d37430054f6fa7ed0a81323`. Commit your entries on that branch (commit messages
  in English, by explicit paths, never `git add -A`). Run
  `python -B .the-way/elements/common/foundation_check.py` before you return and give its command
  and exit code.
- Report: `.runs/task-cycles/odkrywanie/reports/04-foundation-entries-report.md`. Return your
  status, commits, a one-line check result and that path. For each entry give, in the report, one
  sentence of its meaning in Polish (the task document's language) for the request.
- Questions: only where the foundation step allows one (no recommendation, an entry would change
  an approved decision beyond what the task carries, a row's meaning cannot hold, a value neither
  row nor work gives, two decisions colliding with no precedence) — return such a question with
  status `blocked`. Never write a row with another meaning.

## Task

Frozen task, read whole: `.runs/task-cycles/odkrywanie/task.md` (copy of
`C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_zadania/odkrywanie_loop2.md`, accepted
2026-10-26). The rows O1–O9 are its § Settlements to record; the projected entries and terms are
in its § Decisions in play, with the part this task writes where it writes only part. Plan item 6
of `plan_mvp_loop2.md` (definition `definicja_mvp_loop2.md`, approved 2026-10-26, fingerprint
7692b28a) — the projected entries' approved wording is quoted in the task; the definition is at
`C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` if you need the
whole approved entry (its § Projected foundation changes and § Glossary).

Plan: `.runs/task-cycles/odkrywanie/plan.md`. Its section *Foundation entries*, copied word for
word:

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| O1 | decision | row O1 of *Settlements to record* | Slice 9 |
| O2 | decision | row O2 | Slices 10, 12 |
| O3 | decision — D-71 gains the sentence on discovery, as the row's source says ("kolejność D-71 dostaje zdanie o odkryciu") | row O3 | Slices 9, 10 |
| O4 | invariant — new sentence of `player-map-run-pace`; check: `tests/invariants/test_player_map_run_pace.py` | row O4 | Slice 10 |
| O5 | invariant — new sentence of `minute-span-split`; check: `tests/invariants/test_minute_span_split.py` | row O5 | Slice 10 |
| O6 | decision | row O6 | Slice 11 |
| O7 | decision | row O7 | Slice 11 (keeps the body row, backpack, tile list and drawing as they are) |
| O8 | decision | row O8 | Slices 2, 8 |
| O9 | decision | row O9 | Slices 1, 9 |
| "When does the player learn what the world holds?" | decision, whole | projected entry the task writes (task § Decisions in play) | Slices 1, 2, 9, 10 |
| "What does an archetype open to a character?" | decision, whole | projected entry the task writes | Slices 1, 2 |
| "Whose is the knowledge of the world, and what may a character use of it?" | decision, the part this task's code makes true (task 10 writes the rest) | projected entry, task § Decisions in play | Slices 2, 8, 9, 11 |
| predisposition | glossary term, whole | projected term | Slices 1, 2 |
| archetype | glossary term, whole | projected term | Slices 1, 2 |
| repertoire | glossary term, whole | projected term | Slices 2, 8, 11 |
| Understanding | glossary term, the part this task's code makes true (task 10 writes the rest) | projected term | Slices 2, 9 |
| `program-rule-pick` | invariant — changed sentence: the pick passes over a program rule outside the character's repertoire; check: `tests/invariants/test_program_rule_pick.py` | follows O8: today's sentence has the character start a rule whose condition holds and whose action can be carried out, which a rule outside the repertoire no longer does | Slice 8 |

Part map: no change — every file the change adds lies under `src/browser/sim/**` or `tests/sim/**`, which the part `simulation` claims.


## The orchestrator's answers (bind you)

- Trust boundary: no. Irreversible operation: no. No open design choice; no spec.
- Q-C1 — The program editor offers the repertoire computed from the Understanding through the
  predispositions of the archetype of the character the program serves; today, with one program
  and every character an elemental mage, the elemental mage's repertoire. (How-to-make; no entry.)
- Q-C2 — The Understanding records discovered actions, conditions and items by their data
  identifiers; the campfire enters it under an identifier the data files give it as a discoverable
  thing, without becoming a backpack item. (How-to-make; no entry.)
- Q-C3 — The chain of revelations and the five skills stand in data files of
  `src/browser/sim/data/` (D-18). The decision written from O9 carries the chain's meaning, not its
  location.
- P-1 — `program-rule-pick` changes its sentence to follow O8: the pick passes over a program rule
  whose condition, action or target lies outside the character's repertoire, as over one whose
  action cannot be carried out; the rule stays in the program. Its *Derives from* gains the decision
  written from O8.
- P-2 — D-23 is not changed. Its Verification ("a condition picker listing the conditions of the
  closed list") admits an editor offering the repertoire. The decision written from O8 names its
  relation to D-23 as the decision skill's relations allow.
- O3 says "kolejność D-71 dostaje zdanie o odkryciu": write it as the decision skill gives for a
  new answer to the question D-71 holds, or as a new decision related to D-71, as that skill
  decides.
- The wording rule of the task's question 7 (B) binds every row's entry: say what the game does
  today, no product stage, none of "only", "never", "always", "without" or other words that exclude
  an alternative — the name of the condition „Zawsze” is a name, not such a word.

## What to read (besides the task, the plan and your skills)

- Decisions: D-04, D-18, D-20, D-21, D-23, D-39, D-44, D-60, D-62, D-63, D-71, D-90, D-91, D-92,
  D-93 (`foundations/decisions.md`), each whole.
- Invariants: player-map-run-pace, minute-span-split, program-rule-pick, program-closed-lists,
  content-identifiers (`foundations/invariants.md`), each whole.
- Glossary: `foundations/glossary.md` whole. Part map: simulation, browser-view,
  product-foundation (`foundations/part_map.md`).
