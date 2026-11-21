PASS 1351e3a1e9392852085ecc40949d04f07ebe6804

# Review of slice 8 — the icons of „Opatrz” and of the bandage, with their credits

Range reviewed: `760def64fcb1dd3d34a07cdd8f596db00f8ecf36..1351e3a1e9392852085ecc40949d04f07ebe6804` (one commit, `1351e3a1`). `git rev-parse HEAD` gave `1351e3a1e9392852085ecc40949d04f07ebe6804`; `.the-way` stands on the pinned `19e5774aed6d1d628042e23deccc110ed9f112c0`.

## Findings

### Critical

none

### Important

none

### Minor

none within the slice. Two out-of-scope remarks stand under *Declined to judge*.

## What was checked, and how

- **The trust boundary `assets/icons/**` (the claim most likely to be false: that the two files are the upstream icons, changed only as the others were).** I fetched both sources myself from the source repository at `ICON_SOURCE_COMMIT` (`https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/lorc/bandage-roll.svg` and `.../delapouite/first-aid-kit.svg`), applied the change the other icons carry (dropped `<path d="M0 0h512v512H0z"/>`, `fill="#fff"` to `fill="#f4f4f5"`) with `sed`, and compared with `cmp`: both committed files are byte-identical to the transformed sources. Each file matches, as one whole line, `^<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#f4f4f5" d="[path-data characters only]"/></svg>$`, and holds no byte outside printable ASCII: no element but `svg` and `path`, no attribute but `xmlns`, `viewBox`, `fill`, `d`, no reference outside the file. `tests/invariants/test_icon_file_content.py` and the `violations` and light-shape tests of `tests/view/icons.test.mjs` run over the real files and pass (below); their crafted-input controls (`CRAFTED`, `test_control_the_scan_flags_each_forbidden_form`) are unchanged by the slice.
- **Titles and authors (Foundation entries rows 15, 16; invariant `icon-credits`).** The two pages fetched today give `<h1 id="icon-name" itemprop="name">Bandage roll icon</h1>` with `by … Lorc` and `<h1 …>First aid kit icon</h1>` with `by … Delapouite`, each `CC BY 3.0`; the source repository's `license.txt` at that commit lists Lorc and Delapouite as contributors. These match `foundations/environment_facts.md:204-214` (`game-icons-bandage-roll-title`, `game-icons-first-aid-kit-title`), the data (`src/browser/sim/data/actions.ts` `tend`: `bandage-roll` / "Bandage roll icon"; `src/browser/sim/data/items.ts` `bandage`: `first-aid-kit` / "First aid kit icon"), `ICON_CREDITS` (`src/browser/view/credits.ts:169-178`: author, page under the author's folder, `CHANGES`) and the written-out `AUTHORS`/`TITLES` of `tests/invariants/test_icon_credits.py:87-88,117-118`. The invariant `icon-credits` (`foundations/invariants.md:331-341`) already rests on the two title facts; the code does what it says.
- **D-27** (`foundations/decisions.md:4870-4921`): the files stand in `assets/icons/`, reach the served directory only through the build's copy (no change to the build), hold nothing that runs and refer to nothing outside; each is credited with its title, author, page, licence and how it differs from its source. Compliant.
- **The task (To do 7, Ikony) and the spec (Decision 3, unit 8: "The credits name the two new icons once each; the items' icons come from the items' rows").** `credit-lines.ts` reads the items' and actions' icons from the data and merges equal icon files, so the slice needed only the credits: the section now reads (22 lines) patyk, jagoda, mech, włókno, opatrunek, ognisko, ognisko wygasłe, then the actions' icons one line each with „Wytwórz — ognisko, Wytwórz” sharing `claw-hammer` (the task's „Wytwórz” has the hammer of „Wytwórz — ognisko”) and „Opatrz” after „Zjedz — jagoda”, then wilk and the two packs — as the plan's section asks. The new test asserts `bandage-roll.html` stands in exactly one line; `first-aid-kit` stands once, as the bandage's.
- **Tests against `guidelines/testing.md`.** The expected lines of the two new section tests and of the bandage's data test are written out (title, author, page, words of change), not computed by the product; the bandage is picked by its identifier (`ITEMS.bandage`), not by place. Replacing `Object.values(RESOURCES)` with the written-out `ITEM_ICONS` makes the expectation independent of the data rather than read from it ("Test inputs and expected values"); the moved indices (`CAMPFIRE_AT`, `ACTIONS_AT`) change the expectation for a cause on the side of the data — the fifth item — named in the plan ("Changing an existing test"). No assertion was weakened: the count of lines, the per-line equality and the link checks stand as before. Would they fail when the behaviour breaks? A missing credit makes `creditLines` throw (the executor shows both suites red before the credits); a wrong author or title breaks the written-out line of the new tests and `test_icon_credits.py`.
- **Code that passes a test without meeting the requirement (WAY-409):** `credits.ts` adds two plain data rows; no branch or value made for a test's input. None found.
- **Guidelines.** `coding.md`: Prettier, ESLint, Ruff format and check pass on the changed files; no size rule reached (two data rows, test file additions). `coding-browser-module.md` "Nazwy treści z danych": `credits.ts` names icon files and authors, which is what the file of credits holds for every icon; it writes no item or resource name. `styleguide-browser-view.md`: no stylesheet, role, token or markup changed; the icons' content is exempt from the token rule (D-43) and they are drawn by mask. `src/browser/AGENTS.md`: no colour or length written; the `#f4f4f5` inside the SVG files is the icon file's content, which D-43 exempts, as for every icon.
- **The executor's walk.** It judges that the change alters what a user sees (two new lines in „Autorzy grafiki”, two more icon files served), which agrees with the change; its cases (the two lines, 22 lines, both files served as `image/svg+xml`) follow from the task's "ze wzmianką w sekcji „Autorzy grafiki”", and what it left unchecked (the icons drawn, since nothing draws them yet in this slice; a byte-for-byte comparison of the served file) has a reason. No screenshot file is among the commits.
- **Reserved choice:** none taken.
- **The sort of To do 14** stands in the executor's report table (four files for the bandage alone, `icons.test.mjs` one-time for the model with its two new tests for the bandage alone), as the slice asks.

## Declined to judge

- `README.md:78` still says "The resource icons come from game-icons.net" and "The titles of the icons are held by the resource data in `src/browser/sim/data/resources.ts`"; after slice 7 the items' titles stand in `items.ts` and the actions' in `actions.ts`. The file is not among this slice's files and the text was already short of the actions' icons before it; outside this slice — a point for the review of the whole change (Minor there at most, as a reader would look for an item's title in the wrong file).
- `src/browser/view/credit-lines.ts:51-53` keeps the doc comment "in the section's order: the resources, then the campfire …" though `WITH_ICONS` now spreads `ITEMS`; written by an earlier slice, not by this one; outside this slice, for the review of the whole change.

## Checks run

| Check | Exit |
|---|---|
| `npm test -- tests/view/icons.test.mjs` (39 tests, 39 pass) | 0 |
| `npm test -- tests/invariants/test_icon_credits.py` (3 tests, OK) | 0 |
| `npm test -- tests/invariants/test_icon_file_content.py` (2 tests, OK) | 0 |
| `npm test -- tests/view/account-screen.test.mjs` (132 tests, 132 pass) | 0 |
| `npm test -- tests/view/headquarters-screen.test.mjs` (28 tests, 28 pass) | 0 |
| `npm run typecheck` | 0 |
| `npx prettier --check src/browser/view/credits.ts tests/view/icons.test.mjs` | 0 |
| `npx eslint src/browser/view/credits.ts tests/view/icons.test.mjs` | 0 |
| `ruff format --check --config ruff.toml tests/invariants/test_icon_credits.py` and `ruff check --config ruff.toml …` (the `ruff.exe` of the main checkout's `.runs/quality-venv`, run read-only; this worktree has no `.runs/quality-venv` yet) | 0 and 0 |
| `curl -sS -f` of the two source SVGs at `ICON_SOURCE_COMMIT`, of `license.txt` at that commit and of the two pages on game-icons.net | 0 each |
| `sed` transform of each source and `cmp` with the committed file | 0 each (identical) |
| `grep -cE` of the whole-line shape of each file, and `grep -cP '[^\x20-\x7e]'` | 1 and 0 for each file |

Not run: the full gate (the handoff reserves it); `tests/invariants/test_loop2_container_icons*` (the invariant `loop2-container-icons` serves every file of `assets/icons/` by the same rule, unchanged by the slice; not among the slice's *Checks*); the running game in a browser (the executor's walk covers it; I did not repeat it).

## Reaches beyond the handoff

- `foundations/environment_facts.md:204-214` — the two title facts of rows 15 and 16, found by searching their identifiers, to compare the titles with the data, the credits and the tests.
- `src/browser/sim/data/items.ts:98-105` and `src/browser/sim/data/actions.ts:180-190` — the rows of the bandage and of „Opatrz”, to confirm the icon names and titles the credits pair with.
- `tests/view/icons.test.mjs` and `tests/invariants/test_icon_credits.py` read whole (the slice changes them; to judge the changed tests within the file).
- `README.md:33,78` — searched for `game-icons` / `assets/icons`, to see whether a list of icons outside the code needed the two new files (it holds none; line 78 is the out-of-scope remark above).
- A search of `tests/` for `creditLines|CreditsSection|Autorzy grafiki` — to confirm no other test counts the credit lines.
- Network: the upstream source files, `license.txt` and the two pages on game-icons.net and raw.githubusercontent.com, to verify the files and the titles at the boundary independently of the executor.

## Working copies

`.runs/review-8/` held the downloaded sources, the two pages, `license.txt`, the transformed copies and the logs of the checks. It was removed before return by its full path; nothing of it is needed beside this report, whose results are written out above.

## Unread material

none — read whole: `guidelines/coding.md`, `guidelines/testing.md` (in two readings), `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` (in three readings), `src/browser/AGENTS.md`, `.claude/skills/loop2-scene-art/SKILL.md`, `src/browser/view/credit-lines.ts`, D-27, the invariants `icon-file-content`, `icon-credits`, `loop2-container-icons`, `foundations/part_map.md:1-33` (the browser-view entry), the passages of the task and spec the handoff carries, the executor's report and the diff. `task-frozen.md` and `spec.md` themselves were not opened beyond the passages the handoff copied, as the handoff gives.

## Searches not found or unclear

none
