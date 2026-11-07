# Report - slice 6 (The addresses of the screen Mapy)

**Status:** done with concerns

**Commit:** `6ef8213` on `task/karty-i-katalog-map` (base `ef77de7`): `feat: :sparkles: name the screens Mapy and its map addresses, with their nearest screen`. The worktree is clean after the commit (`.runs/` is ignored).

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/screen-address.ts` | 34 | 6 |
| `src/browser/view/game-view.ts` | 6 | 1 |
| `tests/view/screen-address.test.mjs` | 64 | 0 |

What was done:
- `screen-address.ts`: two new `Screen` kinds, `{ kind: "maps" }` and `{ kind: "map", mapId }`. `readScreenAddress` reads `#/mapy` and `#/mapy/{map}`; `{map}` is taken as the hash gives it and accepted only when `Object.hasOwn(MAPS, name)`. `resolveScreen` keeps `maps`, and gives Siedziba for a map whose opener is unsolved, through `canSendMap(state.solvedMaps, mapId)`. `screenAddress` writes both addresses. `MenuItem` holds `"maps"`, and `markedMenuItem` gives both new screens `"maps"`.
- `game-view.ts`: `screenHolder` returns `null` for the two kinds (no DOM holder, as Postać has none). Required by the exhaustive switch; nothing else in the page changes.
- `screen-address.test.mjs`: the cases of both addresses, their negative fragments, the nearest-screen cases and the menu mark.

## Checks

Each run from the worktree root, after the change and formatting unless marked.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/screen-address.test.mjs` (red, before the source change, cases added) | 1 | 8 new positive cases fail on assertions: the maps address, the map address (both maps), the round trip, the four `resolveScreen` map cases, and the maps menu mark. Negative fragment cases already read as no screen and pass, as they guard. |
| `npm test -- tests/view/screen-address.test.mjs` | 0 | 57 tests, 57 pass, 0 fail |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 126 tests, 126 pass, 0 fail |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | Ran 4 tests, OK |
| `npm run typecheck` | 0 | passed |
| `npm test -- tests/quality/test_quality_invariants.py` (first run) | 1 | `test_prettier_source_format` failed: Prettier flagged `screen-address.ts` and `screen-address.test.mjs` |
| `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --write` on those two files | 0 | formatted; diff reviewed, only the slice's own lines |
| `npm test -- tests/quality/test_quality_invariants.py` (after formatting) | 0 | Ran 5 tests, OK |

Not run: the full `npm test` (by design of the slice; the orchestrator runs the gate), and `python -B .the-way/elements/common/foundation_check.py` (not in this slice's Checks).

## The failing run of each test written first

The red run is the first row of the table above: `npm test -- tests/view/screen-address.test.mjs`, exit 1, with the eight positive cases failing on `AssertionError` (`strictDeepEqual` or `strictEqual`), not on a missing module. The source was unchanged at that time; the test file had the cases added. No invariant test was added or changed; `content-identifiers` ran green on the final code.

## Own-work check (section 3)

- Requirement most likely unmet: a map address names a screen only when its text is an own key of `MAPS` and the map is open (D-281, D-332, D-149). `#/mapy/__proto__`, `#/mapy/constructor`, `#/mapy/forest-deep`, `#/mapy/las-glebiej`, `#/mapy/%66orest`, `#/mapy/Forest` and `#/mapy/forest/x` must read as no screen; `#/mapy/forestDeep` with `solvedMaps` empty must give Siedziba, and with `["forest"]` must give the map.
- Check: the test cases listed above, run with the command in the table.
- Result: all pass (57 of 57).
- Mutations, in head only, not run as mutations: dropping `canSendMap` makes the "off the list" case fail; reading `MAPS[name]` without `Object.hasOwn` makes the prototype-name cases fail. Both are covered by named cases.
- Screenshot (ui_check.md): **unchecked**. This change alters what the page shows at `#/mapy` and `#/mapy/{map}`: with no DOM holder, all three DOM screens are hidden, so the game area is empty (see Questions and concerns). I did not run the browser route (`.claude/skills/loop2-play/SKILL.md`); the slice's Checks name none. The state was checked in code: `show()` sets `hidden` on the three holders from `screenHolder(next)`, which is `null` for both kinds.

## Choices and adaptations

- `canSendMap` is imported from `sim/game.ts` into the pure view module `screen-address.ts`. Rejected: a local copy of the prerequisite check. Cost if wrong: two copies of D-149's rule drifting apart; the import pulls the simulation module in, which `game-view.ts` already does.
- The map name is cast `as MapId` only after `Object.hasOwn(MAPS, name)`. Rejected: a type guard listing the keys. Cost if wrong: none found; the same pattern is used in `sim/game.ts:374`.
- No adaptation of section 4: the plan's *Read* and the handoff's copy matched the code. The handoff said D-149 and D-281 lines 2801-2815 and 5954-5986 while the current ranges are 2802-2816 and 5964-5999; I used the current ones, found by heading.
- `MenuItem` gained `"maps"`, but `ITEMS` in `menu-bar.tsx` is not exhaustive over it and has no maps entry. Nothing links to the addresses before slice 8, so no entry was added. Nothing is marked on the bar for the two new screens until then.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/ui_check.md`: read, because the method names it for a change that alters what a screen shows; the change does, at `#/mapy`.
- `src/browser/view/menu-bar.tsx` lines 60-80 and 262-290: to see whether `ITEMS` must hold every `MenuItem` (it need not) and how `markedMenuItem` is consumed.
- `src/browser/sim/game.ts` lines 55-70: `mapOf`, to see how the data is read in `canSendMap`.
- `src/browser/sim/types.ts` (the `MapId` export) and `tsconfig.browser.json` (`lib` ES2022, for `Object.hasOwn`): to confirm the type import and that the library method is available.
- `docs/task-cycles/karty-i-katalog-map/reports/07-slice-5-report.md`: for the report's form only.

All other files in the handoff's *Read* were read whole or in the named passage: the-way `SKILL.md` and `slice.md`, `AGENTS.md`, `guidelines/coding.md`, `coding-browser-module.md`, `testing.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`, `foundations/decisions.md` D-18, D-149, D-277, D-280, D-281, D-332, `foundations/invariants.md` (content-identifiers), `foundations/part_map.md` (browser-view), `task.md` 28-35, 126-139, 282-295, `plan.md` 636-660, and the code named in the handoff.

## Searches not found or unclear

- Nothing sought was missing from the handoff's paths.
- Unclear: the plan does not say what the page shows at `#/mapy` and `#/mapy/{map}` between this slice and slice 8. The handoff's choice implies an empty game area. The D-281 verification line "a reload at `#/mapy/forest` opening Mapy with Las picked" cannot be met until slice 8.
- Not performed: the screenshot of the running game (see own-work check).

## Questions and concerns

1. **Empty game area at `#/mapy` and `#/mapy/{map}` until slice 8.** Before this slice those addresses opened Siedziba; now a typed or reloaded address shows the menu bar and no screen, because the two kinds have no holder. Nothing links to them before slice 8, so the exposure is limited to someone typing the address.
   - If left as it is (the plan's choice): the game area is blank at two addresses for the length of this slice's branch; slice 8 builds the screen on entering and removes the blank.
   - If changed (for example, `resolveScreen` sending the two kinds to Siedziba until the holder exists): D-281's test for `#/mapy` and this slice's own tests contradict the change, so the test file would need rewriting.
   - Recommendation: accept, as the plan says, and have slice 8 check the reload at `#/mapy/forest` against D-281. The orchestrator decides.
2. The import of `canSendMap` from `sim/game.ts` (see Choices) makes `screen-address.ts` depend on the simulation module. Recommendation: keep it; a copy of the rule would drift from D-149.
