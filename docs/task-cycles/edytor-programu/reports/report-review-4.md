PASS ad60b00f421305c4afa7687faf2148e971a24d33

Saved by the orchestrator from the reviewer's returned text (its tool refused the file). Blocking 0, Minor 2, out of scope 0.

Minor:
1. `assets/icons/boot-kick.svg` and `assets/icons/dodge.svg` end with a newline; the other 14 icon files end without one. No effect on drawing or on any invariant; it only breaks the recipe slice 3 set.
2. `src/browser/view/footer.ts:32-34` (outside the change list): the checks `action.icon === undefined` and `action.iconTitle === undefined` are dead now that both fields are required; harmless; remove when the file is next touched.

Trust boundary `assets/icons/**`: five sources fetched from `game-icons/icons` at `82d948812bfe3f269ef8f731dcdb07b08160edc4` (skoll/logging, delapouite/meal, lorc/deadly-strike, lorc/boot-kick, felbrigg/dodge), all HTTP 200, compared by script: each changed file has one path whose `d` is byte-identical to the source's shape, fill `#f4f4f5`, `xmlns` and `viewBox` unchanged; elements only `svg` and `path`, attributes only `xmlns`, `viewBox`, `fill`, `d`; no script, no `foreignObject`, no `on*`, no external reference. Credits name Skoll, Delapouite, Lorc, Lorc, Felbrigg with their game-icons.net pages; `AUTHORS`/`TITLES` agree; `icon-credits` rests-on holds the five title facts. `tests/sim/data.test.mjs` outside the change list: only icon fields added to three `deepEqual` expectations, justified.

Checks run: `git rev-parse HEAD` exit 0; `git diff 9a8c4e2..ad60b00 -- src tests` read whole, exit 0; fetch and compare of the five sources, exit 0, all `d equal: True`; `python -B -m pytest -q -p no:cacheprovider tests/invariants/test_icon_credits.py tests/invariants/test_icon_file_content.py` 7 passed, 32 subtests, exit 0, git status clean after.
Not run: `npm test` focused tests (they build `dist/` in the worktree), `test_loop2_container_icons.py` (Docker, long), the full gate.

Searches not found or unclear: none
