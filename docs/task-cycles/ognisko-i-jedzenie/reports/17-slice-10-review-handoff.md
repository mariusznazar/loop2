# Handoff — review of Slice 10, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You
**review Slice 10** of the plan as an agent that made none of it. Use the project skill
**`the-way-review-change`** (read its method and what it names, whole). Read only; write nothing but
your report. Its first line is `PASS <sha>`, `FAIL <sha>` or `questions`. Questions go to the
orchestrator, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Range to review: `ab1558b09c2fbf37a106c34e0b6b731f5d387f2e..6981b7fae945f28aa65fb0a04aeca31fc636fa64`
  (slice base ab1558b, head 6981b7f) — Slice 10, number 10 of the plan.
- The executor's handoff, with its section of the plan word for word and the selection it read:
  `.runs/task-cycles/ognisko-i-jedzenie/reports/16-slice-10-handoff.md` (and the files it names —
  `reports/foundation-map.md` for current ranges). Your selection is the same.
- The executor's report: `.runs/task-cycles/ognisko-i-jedzenie/reports/16-slice-10-report.md`.
- Frozen task `.runs/task-cycles/ognisko-i-jedzenie/task.md`, reviewed spec
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`, plan `.runs/task-cycles/ognisko-i-jedzenie/plan.md`
  — the passages the handoff names.
- Write your report to `.runs/task-cycles/ognisko-i-jedzenie/reports/17-slice-10-review-report.md`.

## Answers of step 4 — this review is aimed at the trust boundary

- Trust boundary: **yes** — `assets/icons/**` (part `browser-view`), named by the part map; the icon
  file `assets/icons/campfire.svg` is untrusted input from game-icons.net (part map, *External
  context*). Check it as crafted input: nothing in it runs (no script, event attribute, `<foreignObject>`,
  animation that sets attributes, …), it refers to nothing outside itself (no external `href`,
  `url(...)`, `@import`, entity or DOCTYPE), that it equals its source at the commit the credits name
  except for the changes the credit states (compare with the source yourself where you can reach
  it), that its credit, title and author are true to its page (D-27, `icon-file-content`,
  `icon-credits`), and that the container copies it (`loop2-container-icons` — its test skipped on
  this machine for lack of Docker; say what you could check instead).
- Irreversible operation: no.

## What the orchestrator's mechanical check passed to you

- Changed files: 9 — the 8 of the slice's *Change* plus `tests/sim/data.test.mjs` (not in
  *Change*: its whole-object comparison of the campfire's data gained `icon` and `iconTitle`).
- `test_loop2_container_icons.py` and `tests/deploy/test_loop2_image_icons.py` reported skipped (no
  Docker daemon): `loop2-container-icons` unchecked by its test.
- The icon's author is Lorc, so the slice also changed the fact `game-icons-licence` (plan F23).
