# Report - slice 4 (The pure lines leave headquarters.ts)

**Status:** done with concerns

**Commit:** `57f8d25` on `task/karty-i-katalog-map` (base `00b807c`): `refactor: :recycle: move the pure lines of the headquarters to team-lines and map-lines`. The worktree is clean.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/team-lines.ts` (new) | 111 | 0 |
| `src/browser/view/map-lines.ts` (new) | 16 | 0 |
| `src/browser/view/headquarters.ts` | 12 | 119 |
| `src/browser/view/character-screen.tsx` | 1 | 1 |
| `src/browser/view/program-editor.ts` | 2 | 2 |
| `tests/view/team-lines.test.mjs` (new) | 202 | 0 |
| `tests/view/map-lines.test.mjs` (new) | 26 | 0 |
| `tests/view/headquarters.test.mjs` | 5 | 212 |

What moved: `runWaitingSentence`, `chestLines`, `ProgramPositions`, `programPositions`, `generationLabel`, `ResurrectionLine`, `resurrectionLine`, `loopLine`, `stoppedLoopLine` to `team-lines.ts`; `sendMaps`, `solvingSentence` to `map-lines.ts`. `headquarters.ts` imports them and keeps `mapLabel` and `EMPTY_NAME_MESSAGE`. `program-editor.ts` imports `sendMaps` from `map-lines.ts`; the comment of `offeredResources` now names the first map of the list of maps (`sendMaps`), not the headquarters. The moved bodies are identical to HEAD.

## Checks

Each run from the worktree root, exit codes as printed.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/team-lines.test.mjs` | 0 | 16 pass, 0 fail |
| `npm test -- tests/view/map-lines.test.mjs` | 0 | 3 pass, 0 fail |
| `npm test -- tests/view/headquarters.test.mjs` | 0 | 2 pass, 0 fail |
| `npm test -- tests/view/character-screen.test.mjs` | 0 | passed (runner rejects an empty selection) |
| `npm test -- tests/view/program-editor.test.mjs` | 0 | passed |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 126 pass, 0 fail |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | Ran 1 test, OK |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | Ran 4 tests, OK |
| `npm run typecheck` | 0 | passed |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | Ran 5 tests, OK |
| `npx eslint --max-warnings 0 --no-inline-config <the 8 touched TS/JS files>` (extra, not in the slice's list) | 0 | passed |
| `npx prettier --check --no-config --no-editorconfig <the 8 touched TS/JS files>` (extra) | 0 | all files use Prettier code style |

Case count: the 19 cases of the old `headquarters.test.mjs` are now 16 moved cases (team-lines), 2 cases in map-lines (`sendMaps`, `solvingSentence`), and 2 in headquarters (no-DOM import, `mapLabel`) — plus one new no-DOM case each in `team-lines.test.mjs` and `map-lines.test.mjs`, so 21 in total, all passing.

Not run: the full `npm test` (the orchestrator runs the gate, per the handoff). The-way's `foundation_check.py` was not run by me; the slice does not name it.

## Own-work check (section 3)

- **Requirement:** the move changes no behaviour, and the new modules import no DOM module, no React and no `.tsx` file.
- **Check 1:** `git show HEAD:src/browser/view/headquarters.ts` against the new files, function by function. Result: the bodies match. The only difference is the type of `ProgramPositions.options`, see the choices below.
- **Check 2:** imports of `team-lines.ts` and `map-lines.ts`. Result: only `../sim/...` modules, all data or simulation, with `import type` for types. No `controls/`, no `react`, no `.tsx`.
- **Check 3:** `grep` for `headquarters.js` in `src`, `tests` and `scripts`. Result: `game-view.ts` still imports `createHeadquarters` (correct); no other module imports moved names from `headquarters.js`.
- **Check 4:** the cases. Result: 21 pass, which is the 19 old cases plus the two new no-DOM cases.
- **Test-first:** not done, because this is a move with no new behaviour (the method's "wiring" case). The invariant tests (`node-test-selection`, `content-identifiers`) were not changed; both pass.
- **Mutation check:** not run. `browser-view` adopts StrykerJS only when a drawing or list error passes tests and review (D-94), and this change adds no behaviour.

## Choices and adaptations

- **Type of `ProgramPositions.options`:** written inline as `(readonly [value: string, text: string])[]` instead of importing `SelectOption` from `src/browser/view/controls/select-list.ts`. Rejected: `import type { SelectOption }` from the DOM module, which is erased at build but would still name a DOM module in `team-lines.ts`. Cost if wrong: two copies of one tuple shape, which could drift; tests and typecheck catch drift.
- **No-DOM case in the new test files:** I added one case to `team-lines.test.mjs` and one to `map-lines.test.mjs`, the same wording as the case that stays in `headquarters.test.mjs`. The handoff asks that each file import in Node with no document; the case makes that a checked claim. Cost if wrong: one test that can be dropped.
- **Re-exports:** `headquarters.ts` does not re-export the moved names; callers import from the new modules, as the plan says.
- **One commit** for the slice.

## Reaches beyond the handoff

- `src/browser/view/controls/select-list.ts`: read for the `SelectOption` type, to decide the choice above. Where: line 8. Why: the choice of how `team-lines.ts` types its options.
- `src/browser/view/trip-lines.ts` (head), `src/browser/view/character-screen.tsx` (header and imports), `src/browser/view/program-editor.ts` around line 172-190: read to know the imports and the `offeredResources` comment being changed.
- `scripts/test.py` (head): read to confirm that `npm test -- <file>` builds and runs `tests/view/*.test.mjs`.
- `tests/invariants/test_browser_view_framework.py`: grepped for the `document` rule, to confirm that the new modules do not render (no match in them).
- `ui_check.md` was not read. The method asks for it before finishing a change that alters what a screen shows; this change alters no screen, so I did not read it.
- `reserved_choices.md` was not read: no choice of language, framework or place to run was needed.
- `foundations/decisions.md` entries for "Settlement 1..6" (D-327..D-332) were not read: the slice's *Read* does not name them.

## Searches not found or unclear

- None found for the slice's own content; all named passages were read at the given ranges, and each entry began at its heading.
- Unclear, not changed: `guidelines/coding-browser-module.md:237` says the screen Postać takes "`loopLine` z `headquarters.ts`" as a DOM-module pure function. After this change `loopLine` lives in `team-lines.ts`, so that sentence is stale. Also in that file, the "Where in code" list still names `src/browser/view/headquarters.ts`, which stays correct. The slice's *Change* list does not include the guideline, so I did not edit it.

## Questions and concerns

- **Concern (stale guideline text):** `guidelines/coding-browser-module.md:237` should name `team-lines.ts` for `loopLine`. Recommended answer: the orchestrator or a later slice fixes that line in the guideline, since the guideline is outside this slice's *Change* list. Cost if left: an agent reading the guideline looks for `loopLine` in `headquarters.ts` and does not find it.
- No questions for the orchestrator otherwise.
