done with concerns

# Executor report - Slice 8 (the lines of the catalog as pure functions), task `katalog-map`

Worktree: `the task's worktree`, branch `task/katalog-map`, base `3e3c38a8`.
Nothing pushed. No gate run (`npm test` without a file argument was not run).

## Commits

- `af298379` test: bring `tests/view/map-lines.test.mjs` to the five maps and re-quote D-327 as amended. Files: `tests/view/map-lines.test.mjs` (+19 / -3).
- `bf37e4ca` feat: the catalog's lines as pure functions. Files: `src/browser/view/catalog-lines.ts` (+418, new), `tests/view/catalog-lines.test.mjs` (+289, new).

## What was made

- `src/browser/view/catalog-lines.ts` exports `catalogLines(input, data = MAPS, regions = REGIONS)`, `CATALOG_VIEWS` and the types. It returns, for one view:
  - `dokad`: per region the header `Las · 1 z 5` (solved over all maps in the data), the open unsolved rows, and the solved maps folded under one row (`1 rozwiązana`, expanded by a search, by an `unfolded` region, or always for the region of the picked map).
  - `coDaje`: per resource (fewest open maps first, ties in the data's key order) a group with the resource's icon, name, `N mapa/mapy/map`, rows with solved first, `≈ 8 z 25 · po 15` and `+1 co 60 min` or `nie wraca` as a warning.
  - `postep`: per region the rows of its open maps and `empty` = number of maps not yet opened (zero while a search is typed).
  - a top counter per view, and `none` = `Nic nie pasuje do „{zapytanie}”.` when the view has no row (the query is trimmed).
- Row facts in the old order: demand (streak as whole hours `8 h`, else minutes; `N do pokonania`), what the map takes (`⊘` on the first only, warning role, `wnosisz 0` kept), terrain (`bez ognia N min` from `minutesWithoutFire`, `krok N min` only where it differs from `usualStep` of the data).
- Icons: each row carries the icon names of its attackers, read from `CREATURES[id].icon` (the way `map-lines.ts` does it). No map, resource or creature identifier is written in the module (content-identifiers passes).
- Search: trimmed, `toLowerCase`, Polish letters not folded, finds open maps by map name or by resource name.

## Checks (command - exit code)

Commands were run in the worktree root. Logs are in `.runs/executor-8/`.

1. `npm test -- tests/view/catalog-lines.test.mjs` - exit 0 (11 of 11 pass). Final run: `.runs/executor-8/executor-8-cat-final.log`.
2. `npm test -- tests/view/map-lines.test.mjs` - exit 0 (11 of 11 pass). Final run: `.runs/executor-8/executor-8-map-final.log`. I did not observe the base failure (`sendMaps()` listing three ids) before my change; the plan says it fails there.
3. `npm test -- tests/invariants/test_content_identifiers.py` - exit 0 (Ran 5 tests, OK).
4. `npm run --silent typecheck` - exit 0.
5. `npx eslint --max-warnings 0 src/browser/view/catalog-lines.ts` - exit 0. Also `npx eslint --max-warnings 0 tests/view/catalog-lines.test.mjs tests/view/map-lines.test.mjs` - exit 1 at first (an unused constant `deepRow` in my test), fixed, then exit 0.
6. `npx prettier --check src/browser/view/catalog-lines.ts tests/view/catalog-lines.test.mjs tests/view/map-lines.test.mjs` - exit 0 (after `prettier --write` on the two new files).
7. `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` - exit 1, 12 errors, all owned by Slice 9: `tests/view/account-screen.test.mjs:4229` and `:4488` (D-325); `tests/view/maps-screen.test.mjs:221, 319, 321, 353, 355, 407, 409, 475, 556, 1042` (D-325 / D-327). None is in `map-lines.test.mjs` or `catalog-lines.test.mjs`, so my two citations (`map-lines.test.mjs:198` and `:237`, D-327) are resolved.
8. `python -B .the-way/elements/common/foundation_check.py` (without the flag) - exit 1, the same 12 errors.
9. `npm test -- tests/quality/test_function_and_file_size.py` - exit 0 (Ran 2 tests, OK).
10. Mutation check (own-work, section 2 of make-change): in the worktree source I changed the sort in `resourceGroups` to descending and the `nie wraca` warning flag to `false`, ran the catalog test: exit 1, 2 failing tests (both named above in the run), 9 passing. Then I restored the module from a backup and checked the restored file is identical to the backup (`diff -q` silent); the backup was deleted.

Not run: the full gate (`npm test` with no argument), the one command, and `python -B .the-way/instruction-files/check_instructions.py`. Screens are not changed in this slice (the module is not yet drawn by any screen), so no walkthrough or screenshot is due.

## Own-work check (section 3)

- Requirement most likely unmet: the old game's order and words, the region counter that counts unopened maps, the empty places, and the fold rule. Check: the 11 tests above, with hand-derived expectations from the data (Skraj lasu 8 h, Las 8 h, Las — głębiej 9 h and 2 do pokonania, Las — wataha 9 h and 6, Las — matecznik 10 h and 1, `⊘ wnosisz 0` on the matecznik only, 83 and 33 minutes without fire). All passed.
- A second requirement: "a region with nothing open not at all", which the real data (one region) cannot show. The test passes an extra region name (`["Las", "Inne"]`) to the `regions` parameter; the empty region does not stand.
- A third: "nie wraca" as a warning. The real data has no non-renewing resource, so the test passes a changed copy of Skraj lasu (same id, one resource without `renewMinutes`) through the `data` parameter.

## Choices (way rejected, cost if wrong)

1. The module takes the map data and the region list as optional parameters, defaulting to the game's data. Rejected: a fixed import, which leaves the `nie wraca` branch and the empty-region rule without any test. Cost: low; a view passes nothing. The open maps still come from `sendMaps` on the real data, so a made-up copy can change numbers but not which maps are open.
2. The search in „Co daje” keeps the old code's rule: a group whose resource name holds the text lists all its maps; otherwise only the maps whose own name holds it. Rejected: filtering by "map name or any resource name" in every group, which would show a map under a resource the text does not name. Cost: low; it is the old game's behaviour, and the handoff asked to follow the old code where the spec is silent.
3. The demand reads in hours only when the streak is a whole number of hours, else in minutes (the Choices table of the plan). Cost: low, all five maps are whole hours.
4. Icons are a list of all attackers' icons per map. Rejected: the first attacker's icon only. Cost: none today (each map has at most one attacker).
5. The module includes the top counter of each view and the `CATALOG_VIEWS` labels, which the old code has. Rejected: leaving them to the view (Slice 9). Cost: the view must not repeat them.
6. The module is written before its tests (not test-first). The tests were then written from the data and the rules; I checked them with the mutation (item 10 above) instead of a failing run first. This is a process concern for the orchestrator, not a behaviour one.

## Differences from the old game (the task's To do 5 asks to name them)

- The old card and row count a survival time (`survivalMinutes`) and a hold requirement (`holdRequired`), and a suppression list (`suppresses`, `gasi`). Loop2's data has a streak (`solving.streak`) and defeats (`solving.defeatedAttacks`) instead; no hold requirement and no suppression exist, so no such line is drawn.
- The old row showed one threat icon; loop2 shows one icon per attacker (`icons`).
- The old "Co daje" row's „nie wraca” was in the amber colour; here it is the `warning` role, as the task says.
- The old group heading counted maps with `counted(...)` from its own `plural.ts`, which I did not read; I used loop2's `counted-name.ts`, which has the same 1 / 2–4 / rest rule. This is an assumption about the old helper, not a read of it.
- The old view dims solved rows (opacity) and draws empty places with curtain widths; these are view matters left to Slice 9. The module gives only the rows and the count.

## Reaches beyond the dispatch

- I read `src/browser/sim/map-card.ts`, `counted-name.ts`, `creatures.ts`, `resources.ts`, `maps.ts` (named by the dispatch) and not `src/browser/sim/body.js` (the source of `minutesWithoutFire`'s cooling); I relied on the values the existing map-lines test asserts (83 and 33 minutes).
- I read the tests' header of `tests/invariants/test_content_identifiers.py` (its first 150 lines), to learn which names the check scans for; the rest of that file was not read.

## Working copies

- No worktree, clone or copy was made. The directory `.runs/executor-8/` holds the check logs only (`executor-8-cat.log`, `executor-8-cat2.log`, `executor-8-cat-final.log`, `executor-8-checks.log`, `executor-8-map-final.log`, `executor-8-mutant.log`, `executor-8-fc-skip.log`, `executor-8-fc-full.log`, `executor-8-eslint-tests.log`, `executor-8-size.log`). They are outputs, kept for the report.
- The backup of the module used for the mutation check (`.runs/executor-8-backup-catalog-lines.ts`) was deleted after the restore.
- A log that I first wrote outside the worktree, to `.runs/executor-8-cat.log` (the main checkout's `.runs`), was deleted.

## Unread material

- `foundations/decisions.md`: D-325, D-327, D-331, D-333, D-134, D-149 and D-24 were read by their heading ranges, but each line was printed cut at 900 to 1500 characters (`cut -c1-…`). The tails of a few long paragraphs were not seen: D-327's first paragraph after "…the number o", and part of D-24's rationale. The binding sentences I quote are whole.
- `foundations/decisions.md` D-18 is named by the guideline `guidelines/coding-browser-module.md` but not by the dispatch; I did not read it.
- `src/components/probe/plural.ts`, `time.ts`, `routes.ts` and `Icon.tsx` of the old game: not read (see Differences).
- `src/browser/sim/body.js`: not read (see Reaches).
- `tests/invariants/test_content_identifiers.py`: first 150 lines only.
- Read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, `foundations/invariants.md` lines 236–246, `foundations/part_map.md` lines 1–33, the old spec `docs/superpowers/specs/2026-09-07-mapy-katalog-i-strona-design.md`, `MapCatalog.tsx` and `mapFacts.ts` of the old game, `task.md` lines 32, 44–55, 65–69, 127, 168–171, 185, and the files named by the dispatch.

## Searches not found or unclear

- "How does `map-lines.ts` get the creature's icon": found, `CREATURES[attacker.id].icon` in `attackerLines`.
- The plan's line numbers of `foundations/*.md`: moved by the foundation commit; the entries were found by their headings (`### D-nnn —`).
- The old game's helper `counted` / `plural` and `roundHours`: not opened (see Differences); unclear whether the old 1 / 2–4 / rest rule matches the old `counted` exactly. I assumed it does.
- The handoff says the 14 citation errors of the foundation check include two of mine; the current check lists 12 (both of mine are fixed). The count changed because the foundation commit and my fix moved them; the owners named in the handoff still hold for the 12.
- A test of `map-lines.test.mjs` failing at the base: not observed (see Checks, item 2).
