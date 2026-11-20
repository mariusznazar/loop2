Status: done with concerns

# Slice 12 executor report: the resurrection line speaks of uses

Method: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice" (`slice.md`). Base `8d0e49cb`, branch `task/zapas-i-wskrzeszenie`, worktree `the root of the task's worktree`.

## Status and commits

- Status: `done with concerns`. The concerns are in section "Questions and concerns".
- Commit `fe59bd56` (author `mariusznn@gmail.com`, from the repository's conditional config), on top of `8d0e49cb`. Committed by path, not with `git add -A`.

## Files changed (added / removed lines)

| File | + | - |
|---|---|---|
| `src/browser/view/team-lines.ts` | 14 | 10 |
| `src/browser/headquarters.css` | 1 | 1 |
| `src/browser/character-screen.css` | 2 | 2 |
| `tests/view/team-lines.test.mjs` | 89 | 52 |
| `tests/view/character-screen.test.mjs` | 23 | 13 |
| `tests/view/headquarters-screen.test.mjs` | 22 | 12 |

What changed in the code:
- `resurrectionLine(team, nowMs)` now reads `resurrectionAt` (the uses left, and the moment of the next return) and gives:
  - full stock: `Wskrzeszenie drużyny: użycia {u} z {c}`, not in danger, no time;
  - part of the stock: the same plus `, następne za {g} godz. {m} min czasu realnego` (or `następne za {m} min czasu realnego` below an hour), not in danger;
  - zero uses: the same plus the time, then ` — śmierć zabierze wprawę i wykupione stopnie`, in danger.
- The count `{c}` is read from `BALANCE.resurrectionUses` (`src/browser/sim/data/balance.ts`). The hours and the minutes keep the rounding of D-217 (minutes rounded up first, then split).
- The comments of `headquarters.css` (`.team-member-resurrection`) and `character-screen.css` now say `danger` at zero uses. No value of a style changed.
- Tests: the three test files set the team's current fields (`resurrectionUsesSpent`, `resurrectionNextReturnAtMs`) instead of the removed `resurrectionReadyAtMs`, and expect the new lines. Each `decision:` quotation of D-217 is a contiguous text from the start of its sentence (`The card and the screen …`, or `The minutes are rounded up …`), checked by `foundation_check.py`.

## Checks (command and exit code)

- Red run, before the implementation: `npm test -- tests/view/team-lines.test.mjs` exit 1. The new cases failed on assertions, for example `actual: 'Wskrzeszenie drużyny gotowe'`, `expected: 'Wskrzeszenie drużyny: użycia 3 z 3'`. The run was made after the test edits and before the edit of `team-lines.ts`.
- Green runs after the change:
  - `npm test -- tests/view/team-lines.test.mjs` exit 0 (19 of 19 pass; run again after the last comment-only edit, exit 0, 19 of 19).
  - `npm test -- tests/view/character-screen.test.mjs` exit 0 (9 of 9).
  - `npm test -- tests/view/headquarters-screen.test.mjs` exit 0 (28 of 28).
  - `npm test -- tests/invariants/test_browser_view_token_values.py` exit 0 (4 of 4 tests).
- `npx prettier --check` on the changed TS and MJS files: exit 0, all in Prettier style. `npx eslint` on the same four JS/TS files: exit 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 1, 39 errors, none in the six files of my Change. Before my quotation fix it showed 2 errors in `tests/view/team-lines.test.mjs` (quotations not in a binding sentence of D-217); both are fixed. The remaining 39 are outside my Change: `D-251 is withdrawn` in `guidelines/styleguide-browser-view.md`, `src/browser/maps-screen.css`, `src/browser/view/maps-screen.tsx`, `src/browser/view/trip-lines.ts`, `tests/sim/trip.test.mjs`, `tests/view/trip.test.mjs`, `tests/view/maps-screen.test.mjs`, `tests/view/account-screen.test.mjs`, and quotations of D-216, D-217, D-189, D-190 and D-242 in `tests/view/clock.test.mjs`, `end-window*.test.mjs`, `maps-screen.test.mjs`, `account-screen.test.mjs`, `trip.test.mjs`.
- The same command without `--skip-test-citations`: exit 1, 39 errors, the same list, none in my files.
- Not run: the full gate (`npm test` bare). The handoff forbids it for me. The product's `npm test -- <file>` is the only test runner I used.

## Own-work check (`SKILL.md` section 3)

- Requirement that my work most likely misses: "`danger` only at zero uses" and "the count from the data". The check: the cases of `team-lines.test.mjs` that read a part stock, zero uses and a full stock, plus the three `character-screen` and `headquarters-screen` cases that read the same states at the components. What it showed: all pass.
- Mutations I considered by hand, and the case that catches each:
  - danger on a part stock: "part of the stock" case;
  - time shown at a full stock: "full stock" case;
  - minutes not rounded up: "7 h 59 min 30 s" case (1 min vs 0 min);
  - a use returned one ms early or late: "returns at its moment" case;
  - a clock set back that shortens the time left: "clock set back" case.
- A limit I accept: the count `3` in the expected values is the value of the data today. A view that hard-coded `3` would pass. The code does read `BALANCE.resurrectionUses`, and only a change of the data would tell the two apart.
- The changed components' states are covered in jsdom: the three states (full, part, zero) at the card of a character, at the screen Postać and at the character in "Kto idzie" (`headquarters-screen` and `maps-screen` are not in my Change; see concerns).

## ui_check and walkthrough

- `ui_check.md`: read. The slice changes what a screen shows. The states are checked in jsdom (above). No screenshot was made by me. Reason, from the handoff: the walk through the running game, with screenshots, is a dedicated step after slice 17 (human remark 4 on request 166). No browser was opened; no working copy of a screenshot exists.
- `walkthrough.md`: read. The change alters user-visible behaviour, so by the method the executor makes the walk. The handoff directs otherwise (see the first question below). Walk: not performed. The plan of cases is not written; the cases are the three states at the three places, checked in jsdom only.

## Choices and adaptations

- Choice: a `nextReturnMs === null` with zero uses cannot happen (the state holds the moment exactly while the uses spent are above zero, `Team` in `src/browser/sim/types.ts`). The code returns the stock text with `danger: false` in that branch rather than guessing a time. Rejected: a fallback time, or danger there with no warning sentence. Cost if wrong: a dead branch that would show a plain stock line in place of the danger line; no value to a player.
- Choice: no `counted-name` for the hours. The question-16 form (`co godzinę`, `co 2 godziny`) is the span of the renewal in D-216 and the end window, not the countdown of D-217 (`następne za 3 godz. 10 min`). The plan's Slice 12 does not name `counted-name.ts`, so I did not use it. Cost if wrong: the countdown's hours would need the declension; the test expectations would change.
- No adaptation of section 4 of the method was needed: the plan and the code agreed on the change's shape.

## Reaches beyond the dispatch

- Read beyond the handoff's list: `foundations/decisions.md` D-190 (whole, in the handoff's "row D-190"); `foundations/glossary.md` `resurrection` (whole entry); `foundations/part_map.md` lines 1-31 (the browser-view entry); `src/browser/character-screen.css` and `src/browser/headquarters.css` whole (before their comment edits); `src/browser/view/counted-name.ts` (whole, not used).
- Searched in `src/` and `tests/` for the old field `resurrectionReadyAtMs`: none left in `src/`; in tests, see concerns.

## Working copies

- I made one working directory, `.runs/slice-12-executor/`, for the run logs. It held only text logs and no copy of a worktree, a screenshot or a script. I removed it with `rm -rf` on its full path before writing this report. Nothing of it is kept in `reports/`; the results above are its content.

## Unread material

- `src/browser/sim/game.ts`: read only the lines around `resurrectionAt`, `usesAt` and `resurrectionReady` (about lines 80-135). The rest (960 lines) not read; it is outside my Change.
- `tests/view/character-screen.test.mjs` (335 lines): read lines 1-60 and 100-140 and the edited area. The rest not read; the edits are the helper and one test.
- `tests/view/headquarters-screen.test.mjs` (905 lines): read lines 20-70 and 250-285 and the grep hits. The rest not read; the edits are the helper and one test.
- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md`: read lines 32, 73-75, 140-170 (question 16 and its neighbours). The rest not read; the handoff sends me there only by these passages.
- `guidelines/coding-*.md` other than `coding-browser-module.md`: not read; not named by the handoff.
- `foundations/decisions.md` D-185 and D-216 (read only as the neighbours of D-217 and D-219, in the range 6240-6300); the rest not needed.
- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `src/browser/view/team-lines.ts`, `tests/view/team-lines.test.mjs`, `src/browser/sim/data/balance.ts`, `foundations/decisions.md` D-217, D-218, D-219, `foundations/invariants.md` `resurrection-renewal`: read whole.
- `.the-way/task-cycle/change/slice.md`, `ui_check.md`, `walkthrough.md`, `SKILL.md`: read whole.

## Searches not found or unclear

- "The form of the hours from the data, read through `counted-name.ts` where the plan says so": the plan's Slice 12 says nothing of that; I found no place in the slice where the declension applies. Unclear, see the choice above.
- The walk's route to the running product (`walkthrough.md` section 1 asks for it): not searched, since the handoff sends the walk to a later step.
- `resurrectionReadyAtMs` in the task's "Context" section (`task.md`, the current state of `src/`): the field is not in `src/` any more. The task text is stale on this point; the code and the Slice 11 state hold `resurrectionUsesSpent` and `resurrectionNextReturnAtMs`.

## Questions and concerns

1. The method (`walkthrough.md`) says the executor of a slice makes the walk of a change that alters user-visible behaviour. The handoff says the walk is a dedicated step after slice 17 and asks for a statement here. I followed the handoff and did not open a browser. Recommended answer: keep the handoff's rule, since it is the orchestrator's dispatch and the method reads the same way for a dedicated walk. If you want the walk here, I need a route to the running game first (`.claude/skills/loop2-play/SKILL.md`).
2. Tests outside my Change that my change now breaks. Left as they are, since they are outside the Change; the plan gives them to later slices:
   - `tests/view/account-screen.test.mjs`: old field `resurrectionReadyAtMs` at about lines 3250 and 5147-5190 and old lines at about 3260-3321 and 5152-5190. The plan's table puts this file in Slice 18.
   - `tests/view/maps-screen.test.mjs`: helper `withResurrection` with the old field (line 64, used at 538) and the old quotations at 486 and 535. The plan's Mapy slice (about line 554-575 of `plan.md`) owns it; I did not check its slice number.
   - `tests/sim/saved-game.test.mjs`, `tests/sim/team.test.mjs`, `tests/view/clock.test.mjs`, `tests/view/trip.test.mjs`, `tests/view/world-area.test.mjs`: still use `resurrectionReadyAtMs`. I did not run them; their owners are other slices.
3. `src/browser/maps-screen.css` line 187 class `.maps-who-resurrection.danger` and its comment (plan says the comment of `maps-screen.css` on the role of the resurrection line speaks of zero uses in a later slice). Left alone.
4. The task's "Context" (`task.md`) says `resurrectionReadyAtMs`, `resurrectionRenewalRealMinutes: 480` and `src/browser/view/trip-lines.ts` as the current state; the code has 240 minutes (`balance.ts`) and the fields above. Stale, not mine to fix.
