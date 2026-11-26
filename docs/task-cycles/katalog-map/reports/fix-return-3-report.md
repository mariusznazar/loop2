done

# Fix of finding I1 of the review of the return step, task `katalog-map`

Worktree `the task's worktree`, branch `task/katalog-map`, head at the start `20b4471f` (confirmed with `git log`). Method: `.the-way/task-cycle/change/SKILL.md` with `fix.md`. Finding: `reports/findings-return-3.md`, read whole. Nothing pushed; the full gate was not run.

## I1 — fixed

I changed only the doc comment of `MapCard` in `src/browser/view/map-card.tsx`. Under the heading, it now says „the one short sentence of what the map demands, written by hand in the map's data”, and it says that „Żąda” closes with the sentence of the solving condition (D-133). It agrees now with D-327, D-133, the code below it and the module's header comment.

Nothing else in code, tests or the foundation changed. Nothing that R1 concerns was touched, and the two Minor findings of that review were not fixed, as directed.

## Commit

- `205b7ad6` docs: the doc of MapCard. One file, `src/browser/view/map-card.tsx`, +5/−4.

## Checks (command → exit code)

- `npx prettier --check src/browser/view/map-card.tsx` → 0
- `npx eslint --max-warnings 0 src/browser/view/map-card.tsx` → 0
- `npm run --silent typecheck` → 0
- `npm test -- tests/view/maps-screen.test.mjs` → 0
- `python -B .the-way/elements/common/foundation_check.py` → 0, "0 errors"
- `python -B .the-way/instruction-files/check_instructions.py` → 0, "0 error, 0 warn, 120 info"
- Not run: the full gate (the handoff).

## Working copies

None made.

## Unread material

`reports/review-return-3-report.md`: not read; the findings file quotes I1 whole, with its place, evidence and fix.

## Searches not found or unclear

None.
