done

# Executor 8 report — slice 8, the icons of „Opatrz” and of the bandage, with their credits

## Commit

- `1351e3a1e9392852085ecc40949d04f07ebe6804` on `task/model-czynnosci-i-przedmiotow` (base `760def64`); the worktree is clean after it.

## Files changed (added / removed lines)

| File | + / − | Sort (To do 14) |
|---|---|---|
| `assets/icons/bandage-roll.svg` | new, 1 line (2209 bytes) | for the bandage alone |
| `assets/icons/first-aid-kit.svg` | new, 1 line (807 bytes) | for the bandage alone |
| `src/browser/view/credits.ts` | +10 / 0 | for the bandage alone |
| `tests/invariants/test_icon_credits.py` | +6 / −2 | for the bandage alone |
| `tests/view/icons.test.mjs` | +~72 / −~12 | one-time for the model: the section's order now comes from five items, so the indices and the `NAMED` list are rewritten (`ITEM_ICONS`, `CAMPFIRE_AT`, `ACTIONS_AT`); the two new tests and the data test are for the bandage alone |

(Totals of the commit: 90 insertions, 14 deletions, 5 files.)

## Where the files came from

- Source: `https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/lorc/bandage-roll.svg` and `.../delapouite/first-aid-kit.svg` (the commit `ICON_SOURCE_COMMIT` names; the repository stores `<author>/<name>.svg`).
- The change made is exactly the one of the other icons: the black background path `<path d="M0 0h512v512H0z"/>` dropped and `fill="#fff"` made `fill="#f4f4f5"`. I checked the method first on `claw-hammer`: the same transformation of its source reproduces the committed `assets/icons/claw-hammer.svg` byte for byte. Before writing, each downloaded file was asserted to match the exact expected shape (one background path, one `#fff` path, ends in `"/></svg>`), and each output to match `<svg xmlns viewBox><path fill="#f4f4f5" d="[digits . , - space]"/></svg>`, so nothing else (script, href, style) could come in.
- Title and page confirmed at download against the foundation facts (the entries of rows 15 and 16, `game-icons-bandage-roll-title` and `game-icons-first-aid-kit-title`): the page `https://game-icons.net/1x1/lorc/bandage-roll.html` has `<h1 id="icon-name">Bandage roll icon</h1>`, author link "by Lorc", licence "CC BY 3.0"; the page `https://game-icons.net/1x1/delapouite/first-aid-kit.html` has `<h1>First aid kit icon</h1>`, "by Delapouite", "CC BY 3.0". Both match the facts and the data (`actions.ts` `tend`: `bandage-roll` / "Bandage roll icon"; `items.ts` `bandage`: `first-aid-kit` / "First aid kit icon"). The source repository's `license.txt` at that commit lists Lorc and Delapouite as contributors' folders.
- `ICON_CREDITS` got `"bandage-roll"` (Lorc, the page above, `CHANGES`) and `"first-aid-kit"` (Delapouite, the page above, `CHANGES`) — the same words of change as the other copied icons, as the change made is the same.

## Checks (command and exit code)

Run from the worktree root. The failing runs written first:

| Check | Exit |
|---|---|
| `npm test -- tests/view/icons.test.mjs` (before the files and credits; 15 tests failed, for `credit-lines: no credit for the icon first-aid-kit` and for the missing `first-aid-kit.svg`) | 1 |
| `npm test -- tests/invariants/test_icon_credits.py` (before; the driver exited 1 with `credit-lines: no credit for the icon first-aid-kit`) | 1 |

After the files and credits:

| Check | Exit |
|---|---|
| `npm test -- tests/view/icons.test.mjs` | 0 |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 |
| `npm test -- tests/invariants/test_icon_file_content.py` | 0 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 |
| `npm run typecheck` | 0 |
| `npx prettier --check src/browser/view/credits.ts tests/view/icons.test.mjs` | 0 |
| `npx eslint src/browser/view/credits.ts tests/view/icons.test.mjs` | 0 |
| `ruff format --check` and `ruff check` with `ruff.toml` on `tests/invariants/test_icon_credits.py` (see below) | 0 and 0 |
| `node tests/quality/eslint-size-rules.mjs` | 0 — "0 functions and files over a threshold in 339 files" |

Not run: `tests/invariants/test_loop2_container_icons*` (the invariant `loop2-container-icons`, not in the slice's *Checks*; it serves each file at `/icons/<name>` — I read the same fact in the walk below); the full gate (never run, by the handoff). The `npx tsc --noEmit` I tried first failed with "no tsconfig.json" because this repository's typecheck is `npm run typecheck`; that is the exit 0 above.

Ruff: this worktree has no `.runs/quality-venv` yet (it is made at the first full `npm test`), so I ran the `ruff.exe` of the main checkout's `.runs/quality-venv` read-only, with the worktree's `ruff.toml`; the main checkout was not written.

The invariant `icon-file-content` seen failing: I put `<script>1</script>` into `assets/icons/bandage-roll.svg`; `npm test -- tests/invariants/test_icon_file_content.py` exited 1 and `npm test -- tests/view/icons.test.mjs` exited 1; I restored the file (compared byte for byte with the saved good copy) and the commit holds the good one. The invariant `icon-credits` seen failing: the first row above; passing: the exit 0 above.

## Own-work check (section 3)

- Requirement most likely missed: "each file passing the checks of `icon-file-content`" for files from outside, and "the author as the source names the contributor". The check: the two files were validated for shape before writing (above), `test_icon_file_content.py` and the `violations` test of `icons.test.mjs` run over the real files and pass, and the tampered copy was refused by both. The authors were read from the pages and `license.txt`.
- Second: the section's order. The new test of the section reads the lines by position and by name (`opatrunek` last among the items, before the campfire; `Opatrz` after `Zjedz — jagoda`, once; `bandage-roll.html` linked in exactly one line). All pass; the order the data give is: patyk, jagoda, mech, włókno, opatrunek, ognisko, ognisko wygasłe, Eksploruj, Wędruj, Idź + Idź — ognisko, Zbierz + Obchód, "Wytwórz — ognisko, Wytwórz", Zapal …, Zasil — ognisko, Zjedz — jagoda, Opatrz, Uderz — patyk, Kopnij, Odskocz, wilk, two packs (22 lines).

## Walkthrough (`walkthrough.md`)

The change alters what a user sees: the credits section of the login card gets two lines and the server serves two more icon files. The foundation settles the way to the running product (`loop2-play`, D-417). I walked it: `npm run local` -> `https://127.0.0.1:64173`, Playwright CLI 0.1.22, on Windows 11, the login card. The cases:

| Case | By what | Verdict |
|---|---|---|
| The folded section "Autorzy grafiki" has the line of the bandage, `opatrunek: „First aid kit icon”, Delapouite, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)` | `textContent` of the `details li` of the login card | passed |
| The section has the line of „Opatrz”, `Opatrz: „Bandage roll icon”, Lorc, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)` | same | passed |
| The section holds 22 lines (5 items + 2 campfires + 12 action icons + wolf + 2 packs) | `document.querySelectorAll('details li').length` | passed (22) |
| The server serves `/icons/bandage-roll.svg` (2209 bytes) and `/icons/first-aid-kit.svg` (807 bytes), `image/svg+xml`, the bytes of the files | `fetch` from the page: status 200, length, first 90 characters (the light fill) | passed |
| Side observation | the page's console and the output of the start | none noticed; the expected mail line was not looked for |

What I did not check: that the icons look right when drawn (nothing draws `bandage-roll` or `first-aid-kit` yet in this slice — the item's icon and the action's icon reach the screens in later slices, and I took no screenshot, as the section says none is asked); the other screens that draw the section (Siedziba) — held by `tests/view/headquarters-screen.test.mjs`, exit 0; a byte-for-byte comparison of the served file against the file on disk (I compared the length and the opening, not the whole).

## Reaches beyond the handoff

- `.the-way/task-cycle/change/walkthrough.md` and `.claude/skills/loop2-play/SKILL.md` lines 1-140 (method of the walk; section 3 of `make-change` asks for it) — not named by the handoff.
- `foundations/environment_facts.md:150-215` (the title facts of rows 15 and 16 and their neighbours) — row 15 and 16 are named in the plan, the file's address is not in the handoff.
- `tests/view/icons.test.mjs` and the old `RESOURCES`/`ITEMS` data (`src/browser/sim/data/items.ts`, `resources.ts`, `actions.ts`) read to get the order of the data.
- `https://raw.githubusercontent.com/game-icons/icons/<commit>/license.txt`, the two game-icons.net pages and `claw-hammer` of the source (to check the method), as the slice asked.

## Unread material

- `guidelines/styleguide-browser-view.md`: I read lines 1-400 of its length; the rest (the sections on the scene, the tokens' sources and later rules) I did not read, since the slice changes no style, no stylesheet and no markup. The icon rule ("Ikona z `assets/icons/` jest rysowana jednym sposobem, maską") stands in the part I read.
- `guidelines/testing.md`: read whole (in two readings).
- `foundations/part_map.md`: lines 1-40 (the browser-view entry and the start of the next); the rest unread.
- `.claude/skills/loop2-scene-art/SKILL.md`: read whole; none of its scripts apply (it is for the scene's PNG pictures).
- `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md` and `spec.md`: only the passages the handoff copied (I did not open the files).
- `guidelines/coding.md`, `coding-browser-module.md`, `src/browser/AGENTS.md`, `decisions.md` D-27, `invariants.md:319-353`, `credit-lines.ts`: read whole.

## Searches not found or unclear

none (the one thing that did not work at first: the raw URL layout of the source repository — `icons/ffffff/000000/1x1/<author>/` is the layout of the game-icons.net site, the source repository holds `<author>/<name>.svg` — found by fetching the repository's tree at the commit).

## Choices, mismatches, problems

- Mismatch (small, adapted): the plan's "icons.test.mjs takes the order of the section as the data now give it" — the old test took the names from `RESOURCES`; I replaced them with an explicit `ITEM_ICONS` list (written out, not read from `ITEMS`), as `guidelines/testing.md` asks for expected values not computed by the code under test, and so the bandage's line is a written-out expectation.
- Choice: the credit of both icons says `CHANGES` (`zmienione (bez tła, jasny kolor)`), the words of the other copied icons, since the change made is the same one; the way rejected: a separate constant for the two — it would say the same words twice. Cost if wrong: only the wording of two credits.
- Choice: no change to `credit-lines.ts`: it already reads the items' and the actions' `icon`/`iconTitle` from the data and merges equal icon files, so the two icons come into the section with a credit alone. `Wytwórz` (the last action row) shares `claw-hammer` with `Wytwórz — ognisko`, so its line reads "Wytwórz — ognisko, Wytwórz" (as the plan's "one line each"). I pinned that name in `ACTION_ICONS`.
- No problem found; no test the requirement contradicts; no foundation entry written.

## Working copies

`.runs/executor-8/` (the downloaded sources, the saved good copy of the tampered file, the pages and the logs): stood in the worktree under the ignored `.runs/`; removed by `rm -rf` of its full path before returning. Nothing remained. The local game start (`npm run local`) was stopped with `npm run local:stop` ("Local starts stopped: 1"); its own files are of the product's tools and stay under `.runs/local-start/`.
