# Handoff — the agent of the plan's *Foundation entries*, task `przyciski-i-zakladki`

## Delegation and stage

- The person who requested this cycle (Mariusz, the product's owner) delegated the cycle's intermediate choices to its orchestrator; nothing in this handoff is that person's approval.
- Method: `.the-way/task-cycle/change/SKILL.md` of the pinned the-way (commit `f45ca40`), read whole; a file it names only when the step or variant that names it comes. Your stage is none of its variant rows: you are **the agent of the plan's *Foundation entries*** in the planned route, doing the foundation step. Read `.the-way/task-cycle/skill/foundation_step.md` whole, and the skill of an element when you write an entry of that element: here `.the-way/elements/decisions/skill/SKILL.md` (project skill `the-way-record-decision`; use only the prefixed project skill, never a personal one of that name).
- Boundary: write only the entries of the plan's *Foundation entries* (below) in `foundations/` — and, where the element's skill requires it for those entries, the files it names — on the task branch, committed. No code, no guideline file, no slice of the plan. Questions go to the orchestrator in your report with status `questions` or `blocked`, as `foundation_step.md` gives, never to the human. Do not run the product's gate (`npm test` without arguments); run `python -B .the-way/elements/common/foundation_check.py` as your focused check.
- Return: your status, your commits, a one-line check result naming what failed or did not run, and the path of your full report: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/reports/foundation-entries.md`. In the report keep, for each entry, its identifier and one sentence of its meaning in Polish (the task document's language) for the request; each row tied to an entry already stated, with that entry; your checks with command and exit code; each reach beyond this handoff; and **Searches not found or unclear** (or `none`).

## Worktree and commits

- Work from `/home/user/loop2`, the product's root, on branch `claude/lucid-ptolemy-jl068t`. Base (slice 1's base too): `799d1ffc899fe631ddc03381302ede7d94f49df5`. Commit your entries there; do not push.
- Commit messages follow the product's history: `git log --oneline -15` shows the form (e.g. `docs: :memo: ...`); end each message with the two lines

  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01GQhoocenE4Tn51AoqvPwAH
  ```

  and add files by path (`git add <path>`), never `git add -A`.
- Frozen task: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/task.md` — read it whole; its *Questions to settle* are the sources of the rows (with the human's words and the ways not chosen, which feed each decision's *Rejected*), its *Decisions in play* quotes the current wording of the entries it changes, and *Settlements to record* holds the rows.
- Plan: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/plan.md`, section *Foundation entries* — copied word for word below. No spec was written.

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## The plan's *Foundation entries* (copied word for word from `plan.md`)

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Row 1 — the main button is the button that sends a form, one per form, framed in the colour of its strong text, unfilled; actions outside forms are not covered | decision | *Settlements to record*, row 1 (pytania 1, 1a, 1b) | Slice 1 · Slice 2 · Slice 3 · Slice 4 |
| Row 2 — an action that opens or leaves a state of a form and stands under it is underlined text without a frame; the rest of the game keeps plain buttons | decision | *Settlements to record*, row 2 (pytania 1, 1a, 1b) | Slice 1 · Slice 2 · Slice 3 · Slice 4 |
| Row 3 — the tab is a variant of the button selected in its group: a line at its bottom shows the choice, keyboard handling stays the button's | decision | *Settlements to record*, row 3 (pytania 2, 2a, 2c) | Slice 1 · Slice 2 · Slice 3 · Slice 4 |
| Row 4 — the current position of the menu bar is marked by the same strong text and bottom line as the tab | decision | *Settlements to record*, row 4 (pytanie 2b) | Slice 4 |
| Row 5 — the login card has a fixed top edge at 15% of the window's height, not the exact middle | decision | *Settlements to record*, row 5 (pytanie 4) | Slice 2 |
| Row 6 — the sentence after a request for a password-reset link stands in `text` with a bar on its left, never in green | decision | *Settlements to record*, row 6 (pytanie 3) | Slice 1 · Slice 3 · Slice 4 |
| Row 7 — a new screen is not built on the pattern of the DOM modules; their pure functions may be imported, and an addition to a screen still in DOM may be made in DOM | decision | *Settlements to record*, row 7 (pytania 5, 5b) | Slice 5 |
| Row 8 — a line at a text takes that text's colour, so a frame or bar is part of the text and does not change its role's meaning | decision | *Settlements to record*, row 8 (pytanie 3b) | Slice 1 · Slice 4 |
| D-44 changed — the secondary action on the list of shared controls; the answer to a request for a password-reset link no longer in `text-secondary` | decision (change) | *To do* 11; pytania 1, 3 | Slice 1 · Slice 2 · Slice 3 · Slice 4 |
| D-222 changed — the answer to a request for a password-reset link no longer in `text-secondary` | decision (change) | *To do* 11; pytanie 3 | Slice 1 · Slice 3 · Slice 4 |
| D-40 changed — the example in *Verification*: the choice of a tab shown by the line | decision (change) | *To do* 11; pytania 2, 3b | Slice 4 |
| D-265 changed — the rule on a new screen | decision (change) | *To do* 11; pytania 5, 5b | Slice 5 |

The entries are written by the agent of the plan's *Foundation entries* through
`the-way-record-decision`, as `.the-way/task-cycle/skill/foundation_step.md` gives, before slice 1.
The task carries no projected entry to write (pytanie 6) and names no invariant, environment fact,
glossary term or part-map change.

## Notes from the orchestrator

- The rows' meanings are the human's; their wording is yours (WAY-134). Where your search of the whole foundation finds a row already stated — the planner names rows 6 (by the changed D-222/D-44), 7 (by the changed D-265) and 8 (beside D-40's *Verification*) as candidates — tie the row to that entry instead of writing a second one, and say so in the report.
- The planner raised whether „zakładka” (meaning a look, not ARIA tabs with arrow keys, pytanie 2a) meets the glossary test. The task names no glossary term; weigh it only as your element skill's search asks, and report what you found — writing a glossary entry is not in your boundary; the return step takes such a finding.
- Pytanie 6 holds that the project definition stays unchanged and its projected D-44 differs; that is not yours to change.
- What to read beyond the task: the element skill selects for you (step 1 of `.the-way/elements/decisions/skill/SKILL.md`). The entries you change are D-40 (`foundations/decisions.md:852-866`), D-44 (`:912-926`), D-222 (`:4119-4171`), D-265 (`:5427-5457`) at the base.
