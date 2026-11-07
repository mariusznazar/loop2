# Slice 10 report — Guidelines and instructions follow the change

**Status:** done

**Commits** (branch `task/karty-i-katalog-map`, base `d16b01d`):
- `57f9578` docs: :memo: describe the view and simulation files as they stand and walk into a map run through Mapy
- `f0f3b07` docs: :memo: name the character and the card of the map as the place of the pick of a program

**Check result:** all six checks of the slice exit 0; nothing failed and nothing was left unrun. Only the slice's focused checks were run, as the handoff asks (the full `npm test` is the orchestrator's gate).

## Files changed

| File | Added | Removed |
|---|---|---|
| `guidelines/coding-browser-module.md` | 20 | 18 |
| `guidelines/coding-simulation-module.md` | 1 | 0 |
| `.claude/skills/loop2-play/SKILL.md` | 4 | 3 |
| `.agents/skills/loop2-play/SKILL.md` | 4 | 3 |
| `README.md` | 1 | 1 |
| `src/browser/sim/game.ts` (comments only) | 4 | 2 |
| `src/browser/sim/programs.ts` (comments only) | 7 | 5 |
| `src/browser/sim/types.ts` (comment only) | 1 | 1 |
| `src/browser/sim/data/maps.ts` (comment only) | 1 | 1 |

The two `SKILL.md` copies are byte-identical (`cmp` exit 0), and `tests/agent_workflow/test_loop2_play_skill.py` checks that too.

## Checks

Each run from the worktree root, output saved under `docs/task-cycles/karty-i-katalog-map/reports/slice10-logs/`:

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 | 8 tests OK |
| `npm run typecheck` | 0 | `node scripts/build.mjs --check` passed |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 27 pass, 0 fail |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | 4 tests OK |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK |

No test was written and no invariant changed, so no failing-first run applies. No code changed except comments, so no mutation was run; the sim tests above cover the files touched.

## Own-work check (method section 3)

- **Requirement:** the coding-browser-module table has rows for the four new files, no row for `headquarters.ts`, and `away-report.ts` with its pure status; its examples name `team-lines.ts` for `loopLine` and stand on `app.ts` for controls in DOM; its *Where in code* names no gone file. The simulation table holds `map-card.ts`.
- **Check:** grep of the two guideline files for `headquarters.ts` (no bare hit; only `headquarters.tsx` remains), a check that every `src/browser/...` path the two files name is git-tracked (`git ls-files --error-unmatch`, no misses), and `foundation_check.py` (0 errors).
- **Showed:** the requirements hold. The file-path check passed for every named path.
- **Requirement:** steps 3 and 5 of "The way into a map run" in both skill copies, and the README manual check, lead through Mapy, the row of Las and „Wejdź”, with no „Wyślij” left in that walk.
- **Check:** grep for `Wyślij` in `guidelines`, `README.md`, `.claude` and `.agents` (the remaining hits are about e-mail resending, not sending a character); the skill test for byte identity; the new labels checked against `tests/view/account-screen.test.mjs` lines 4067–4110 (bar item `Mapy`, list row `Las`, button labelled `Wejdź: Ala, mapa Las`) and against `src/browser/view/maps-screen.tsx` (`aria-label` and `text="Wejdź"`).
- **Showed:** the labels match the screen the test drives.

## Reaches beyond the handoff

- Read `src/browser/view/app.ts` (lines 158–200 and 280–325) to write the controls-in-DOM example on it. The file is not changed.
- Read headers and exports of `headquarters.tsx`, `maps-screen.tsx`, `team-lines.ts`, `map-lines.ts`, `away-report.ts` and `src/browser/sim/map-card.ts` to set their statuses. Grep confirmed that `team-lines.ts`, `map-lines.ts` and `map-card.ts` have no DOM and no React; `away-report.ts` mentions "document" only in its header comment.
- Read `tests/view/account-screen.test.mjs` lines 4060–4110 for the three-click labels.
- Read `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md`, `.the-way/product-guidelines/coding/SKILL.md`, `product-guidelines/template.md` and `product-guidelines/coding/template.md`. These are the method named by the slice.
- Read `guidelines/coding.md`, `guidelines/coding-content-data.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, `README.md` and `.claude/skills/loop2-play/SKILL.md` whole.
- Read the vault rules `.ai/rules/git.md` and `.ai/rules/knowledge_artifacts.md` before committing, as the user's instructions require. Commit messages are in English, files were added by path, and the commits went to the task branch.
- Grep across the tracked tree for `headquarters`, `Siedzib` and `Wyślij` to find stale wording (search reported below).

## Choices made

1. **Status of the new React screens** (`headquarters.tsx`, `maps-screen.tsx`): `copy`, like `character-screen.tsx`. The exemplar stays `account-card.tsx` (D-36). Rejected: `exemplar` for each new screen, since D-36 names one exemplar for the kind. Cost if wrong: one table cell.
2. **Status of `team-lines.ts`, `map-lines.ts`, `map-card.ts`**: `copy` as pure modules, like `account-rules.ts` and `credits.ts`. Rejected: `do not copy`, which marks modules that build DOM elements. Cost if wrong: a row's status.
3. **Controls-in-DOM example on `app.ts`**: the example now describes the session-check elements that `app.ts` creates once in `startApp` and changes in place (`waitForServer`, `askingFailed`). The slice said "such as `app.ts`"; no module in DOM had a form control updated the way the old `headquarters.ts` paragraph described. Rejected: keeping the paragraph on a module that no longer has the pattern, and inventing one. Cost if wrong: the paragraph's example could be sharper; the rule itself is unchanged.
4. **Comment citations**: the comments cite D-170 and D-133, which the named comments concern. The slice also listed D-165, but none of the named comments is about program numbers, so D-165 is not cited. Cost if wrong: one citation missing.

## Questions and concerns

- **Table rows not added:** `src/browser/view/end-question.tsx` (a React file in the view directory) has no row in the "Files of this kind" table. It is outside this slice's rows and was added after the audit that wrote the table, so under the template it takes no row until the guidelines are refreshed. Noted for the orchestrator; not changed.
- **Stale word in a test file:** `tests/sim/copy.test.mjs:131` has a comment saying "headquarters row". It is a test file outside this slice's *Change* list, so it is left as it is.
- **Stale comment outside the slice:** `src/browser/view/headquarters.tsx` and `game-view.ts` still name Siedziba; those words are the screen's name and stay.

## Searches not found or unclear

- `headquarters.ts` as a bare path: not found in any tracked file except the removed guideline rows (checked after the edits).
- `Wyślij` for sending a character: found only in the three places this slice names; none left.
- Whether `end-question.tsx` should have a row: unclear (see above).
- Whether D-165 belongs in the comments: unclear; not cited (see choice 4).
- Whether `app.ts` is the intended "module still built in DOM" for the controls example: the slice said "such as `app.ts`", so it was taken as intended.
