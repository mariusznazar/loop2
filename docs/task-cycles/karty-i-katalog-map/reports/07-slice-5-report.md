# Report - slice 5 (The lines of the card of a map and of „Kto idzie”)

**Status:** done with concerns

**Commit:** `ef77de7` on `task/karty-i-katalog-map` (base `57f8d25`): `feat: :sparkles: add the pure lines of the card of a map and the line of what a send takes`. The worktree is clean after the commit (`.runs/` is ignored).

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/map-lines.ts` | 123 | 1 |
| `src/browser/view/trip-lines.ts` | 25 | 2 |
| `tests/view/map-lines.test.mjs` | 174 | 0 (import block extended) |
| `tests/view/trip.test.mjs` | 67 | 0 |

What was added:
- `map-lines.ts`: `cardHeading`, `terrainLines`, `resourceLines`, `attackerLines`, `capLines`, the types `CardLine`, `CardHeading`, `ResourceLine`, `AttackerLines`, and the private `percentText`. `solvingSentence` is unchanged; „Żąda” uses it.
- `trip-lines.ts`: `entersLine` („Wejdzie: …” / „Wejdzie: nic”, through `sendTake` of `trip.ts`) and `emptyLoopMark` („Pętla nic nie zarobi do skrzynki” for an empty bring list). The comment of `rehearsalMark` now says „Wejdź” instead of „Wyślij”.

## Checks

Each run from the worktree root. Exit codes as printed.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/map-lines.test.mjs` (red, stubs in place) | 1 | 8 of 11 fail, all eight new cases, on assertions |
| `npm test -- tests/view/trip.test.mjs` (red, stubs in place) | 1 | 2 of 9 fail, both new cases, on assertions |
| `npm test -- tests/view/map-lines.test.mjs` (green) | 0 | 11 pass, 0 fail |
| `npm test -- tests/view/trip.test.mjs` (green) | 0 | 9 pass, 0 fail |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | Ran 4 tests, OK |
| `npm run typecheck` | 0 | passed |
| `npm test -- tests/quality/test_quality_invariants.py` (first run, before formatting) | 1 | `test_prettier_source_format` failed: Prettier flagged the four touched files |
| `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --write` on the four files | 0 | formatted |
| `npm test -- tests/quality/test_quality_invariants.py` (after formatting) | 0 | Ran 5 tests, OK |
| `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --check` on the four files | 0 | all matched files use Prettier code style |

Red-run logs (names and assertion output): `a file in the orchestrator's scratchpad` and `…\scratchpad\s5-trip-fail.log`.

Not run, with reasons:
- `npm test` without arguments: the handoff says the orchestrator runs the gate.
- `python -B .the-way/elements/common/foundation_check.py`: the slice's *Checks* do not name it. Not run by me; it stays for the gate.
- StrykerJS: the change is in browser-view, not simulation; D-94 adds the tool only when a drawing error passes tests and review. The mutation reasoning is in the test comments (each "Catches" line), not a tool run.
- `ui_check.md`: not read. The change alters no screen; nothing draws the new functions yet.

## The failing run of each test written first

The stubs were `export function …: never { return undefined as never; }` in both modules, so each test reached its assertion. Eight of the eleven map-lines tests were red on their first run (the three old cases were green); two of the nine trip tests were red (the seven old cases were green). Both red runs are listed in the logs above.

No invariant test was changed; `content-identifiers` was run green and not seen red.

## Own-work check (section 3)

- **Requirement:** the card parts of Las and Las — głębiej, and the line „Wejdzie: …”, read exactly as To do 4 gives them, with the numbers computed from the data (`patyk — ≈ 11 z 16`, `≈ 18 z 25` at 17.5, `≈ 280 min`, `bez ognia 83 min`, `33 min`), and the content identifiers kept out of the view.
- **Check 1:** the cases of `tests/view/map-lines.test.mjs` written from To do 4's literal texts for Las and Las — głębiej, and the rounding cases (0.7 × 25 = 17.5 gives 18; 0.015 gives „1,5”; 0.0123 gives „1,2”; 180 + 1/0.015 gives 247). Result: all pass after the change, and the red run showed each as an assertion failure.
- **Check 2:** `tests/invariants/test_content_identifiers.py`. Result: exit 0, the view files name no map, resource or creature.
- **Check 3:** Prettier on the four files after the change. Result: clean, exit 0.
- **Mental mutations:** a floor in place of the rounding, a note with the wrong direction, a zero cap dropped as unset, a non-renewing resource given „+1 co”, a comma written as a point, a mean gap without the chance term, a „Wejdzie” line that writes the take list as asked instead of as cut, a solved map that reads the chest. Each has a case in the test file, named in its „Catches” comment.

## Choices and adaptations

- **Card functions take a `MapDef`** (per the handoff, so a made-up map can be tested). Rejected: taking a `MapId` and reading `MAPS`, which would have made the made-up cases impossible. Cost if wrong: the view passes `MAPS[mapId]` at each call.
- **„Żąda” is not a new function**; the view will call `solvingSentence(mapId)` as the plan says. Rejected: a `MapDef` version of `solvingSentence`, since the headquarters still calls it with a `MapId`. Cost: a made-up map cannot reach „Żąda” through the test API; no case needs it.
- **Renewal as its own object** (`renewal: { text, warning }`) beside the resource's text, with the view joining them with „, ”. Rejected: one string with the warning mid-line, which the view could not colour apart. Cost: the view writes the join.
- **Chance in Polish notation by hand** (`percentText`) rather than `toLocaleString("pl-PL")`. Rejected: `toLocaleString`, which depends on the ICU data of the runtime. Cost: none for the values the data gives; a chance with more than one decimal is rounded, as the plan asks.
- **The usual step is computed inside `terrainLines`** from `Object.values(MAPS)`. Rejected: a parameter, since the plan's choice says the usual step is the data's, not the caller's. Cost: one more call per card render; negligible.
- **`entersLine` takes the send's inputs** (plan, chest or `null`, capacity, map), not the cut list. Rejected: a list cut by the view, which To do 5 item 4 forbids and the plan's choice rejects. Cost: none.
- **`emptyLoopMark` returns `string | null`**, like `rehearsalMark`, not a boolean, so the view draws the mark in one place.
- **Plan vs code:** the plan named „the function slice 2 put in trip.ts” for „Wejdzie”; the code's function for the send's take is `sendTake` in `src/browser/sim/trip.ts`, and I used it. No structural mismatch.

## Reaches beyond the handoff

- `src/browser/sim/game.ts` lines 64-95 (`mapOf`, `canSendMap`): read to copy the `opensAfter as MapId` lookup pattern used there. Why: the heading's opener name needs the same lookup.
- `src/browser/sim/data/balance.ts` (head): read for the chill threshold used by `minutesWithoutFire`. Why: to check the 83 and 33 minutes against the numbers the plan gives.
- `tests/sim/map-card.test.mjs` (head): read to see how the simulation's numbers are tested. Why: to avoid repeating its cases.
- `docs/task-cycles/karty-i-katalog-map/reports/06-slice-4-report.md`: read for the state slice 4 left. Why: the new modules' imports and the stale guideline line below.
- `a private note in the author's vault`, `search.md`, `scripts.md`: read by the user's global rules before commit and before any negative search claim and before a script. I wrote no script (the Node check ran through the existing tests only).

## Searches not found or unclear

- `guidelines/coding-browser-module.md`, table "Files of this kind": no row for `src/browser/view/map-lines.ts` or `src/browser/view/team-lines.ts`, which slice 4 made as pure, non-DOM modules. Not changed: the slice's *Change* list does not name the guideline, and the orchestrator's notes name only the row for `end-question.tsx` (slice 10). Unclear whether the table needs them.
- `guidelines/coding-browser-module.md:237`: says `loopLine` stands in `headquarters.ts`. Slice 4 moved it to `team-lines.ts`; the sentence is stale. Not changed (outside this slice; see concerns).
- `solvingSentence` takes a `MapId`, not a `MapDef`. Unclear whether a later slice needs a `MapDef` form for „Żąda”; the plan does not say.
- `ui_check.md` and `project-level/technology/reserved_choices.md`: not read. The first is for screen-altering changes (this one alters none); the second is for a missing language, framework or store choice (none was needed).

## Questions and concerns

- **Concern (stale guideline):** `guidelines/coding-browser-module.md:237` names `loopLine` in `headquarters.ts`; it is now in `team-lines.ts`. Recommended answer: the orchestrator or slice 10 fixes that sentence, since it is outside this slice's *Change* list. Cost if left: an agent reading the guideline looks for `loopLine` in the wrong file.
- **Question (table rows):** should `map-lines.ts` and `team-lines.ts` get rows in the "Files of this kind" table of `guidelines/coding-browser-module.md`? Recommended answer: yes, as `copy` for pure functions with no DOM, in slice 10 beside `end-question.tsx`. Cost if left: an agent may copy the wrong pattern for a new pure module.
- No question blocks the slice.
