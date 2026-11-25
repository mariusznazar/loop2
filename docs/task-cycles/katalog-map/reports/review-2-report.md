PASS 5766c306f3c41145bfaf9debc3a22abbddde134e

# Review of Slice 2, task `katalog-map`, range `a0949dec..5766c306`

`git rev-parse HEAD` = `5766c306f3c41145bfaf9debc3a22abbddde134e`, as the handoff gives. Three commits judged: `7a132107` (code, icon,
tests), `23d8c7bb` (environment fact `game-icons-bear-head-title`, `Rests on` of `icon-credits`), `5766c306` (title line in
`tests/invariants/test_icon_credits.py`).

## Findings

Blocking: 0. Minor: 0. Out of scope: 0. No Critical or Important finding.

### What was verified, against the slice's Goal

- Bear entry (`src/browser/sim/data/creatures.ts`): name `niedźwiedź`, `nameWith` `niedźwiedziem`, icon `bear-head`, title
  `Bear head icon`, `revealedBy` attacked by `bear`, health 120, strike 20, one rule `always -> strike`. This is the numbers of the old game's
  entry (read with `git -C the old game's repository show feat/archetypes:src/sim/data/creatures.ts`: `health: 120`, `damage: 20`, one rule
  `always -> strike`). The wolf got `nameWith: "wilkiem"`. `nameWith` has no reader yet; the plan says Slice 2b makes `now-lines.ts` read it.
- `SCENE_CREATURES.bear`: four sheets, 64x64, frames 1/5/3/4. Checked against the files: `assets/sprites/bear-idle.png` 64x64,
  `bear-run.png` 320x64, `bear-bite.png` 192x64, `bear-death.png` 256x64 (PNG header read), so counts and sizes agree. The `satisfies Record<CreatureId, ...>`
  forces the entry. The doc comment of `SceneCreatureSheets` was corrected (it claimed the feet stand on the bottom row); the corrected text
  is true for the wolf and says what the executor found for the bear.
- Icon file `assets/icons/bear-head.svg` (trust boundary):
  - the old repository's `assets/game-icons/delapouite/bear-head.svg` is byte-identical (`cmp` exit 0) to
    `https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/delapouite/bear-head.svg`, the commit `ICON_SOURCE_COMMIT` of `credits.ts:21` (HTTP 200);
  - removing `<path d="M0 0h512v512H0z"/>` and changing `fill="#fff"` to `fill="#f4f4f5"` in that source gives the repository file
    exactly (compared in a script: True), and the same two edits reproduce `wolf-head.svg` exactly from its source (True): the file is
    prepared as the wolf's is;
  - the file holds only `<svg>` and one `<path>`: no `<script>`, no `href`, no `on*` attribute, no other element, no external reference; no
    trailing newline, as in `wolf-head.svg` (`git ls-files --eol`: both `i/none w/none`);
  - the licence file of that commit lists Delapouite among the authors (`license.txt`).
- Credit: `ICON_CREDITS["bear-head"]` = author Delapouite, `https://game-icons.net/1x1/delapouite/bear-head.html`, `CHANGES`
  ("zmienione (bez tła, jasny kolor)"), placed after the wolf's. The page named in the credit resolves and its heading reads "Bear head
  icon" (fetched; `<h1 id="icon-name">Bear head icon`, `<title>Bear head icon, SVG and PNG | Game-icons.net`); the archive URL of the fact answers 200. The line is true: the changes are exactly
  the two edits above; the author is Delapouite by the page's own folder `delapouite/`.
- Foundation entries of the range: `game-icons-bear-head-title` has the form of its neighbours and its quotation matches the page;
  `icon-credits` `Rests on` lists it after the wolf's, in the order of the `TITLES` table. The `icon-credits` text itself is unchanged and
  says what the code does (a credit line with title, author, page, licence, the difference).
- Tests judged: `tests/sim/data.test.mjs` bear test compares the whole entry with `deepEqual`, so a change of any number, name, icon or rule
  fails it; the wolf test holds `nameWith`. `tests/view/icons.test.mjs`: `TITLES`, `CREATURE_ICONS` (wolf then bear, the order of the data),
  the wolf section test now also asserts the next line is the bear's, the bear section test asserts the full line text and the href, the
  data test asserts the file exists. The expected strings are written out in the tests, not computed from the code. `tests/invariants/test_icon_credits.py`
  `TITLES` gets `bear-head.svg: Bear head icon`, the quotation of the fact; this changed invariant test is named here. The test comments quote D-27, D-128,
  D-140, D-416; `foundation_check.py` reports none of them as unfound.
- Reach of the new creature id: `Object.keys(CREATURES)` is read by `understanding.ts:376` (revealed only by an attack by the bear, which no
  map yet makes), `credit-lines.ts:62` (the credits line, tested), `saved-game.ts` (`uniqueOf`/`oneOf` accept the new id, harmless).
  Nothing defaults to or branches on the wolf alone; the tests of those files pass.
- No product code branch or value made for a test; no reserved choice taken; no screenshot in the range.
- The executor's walk (credit line on the login card, the built icon copy identical) agrees with what the diff alters; its unchecked cases
  (the look, the phone layout, the bear's plaque) have reasons. The bear's feet standing about 3 rows above the frame bottom in `scene.tsx`
  is Slice 4's to judge, as the handoff says; not judged here.

### Declined to judge

- The bear's feet standing above the frame's bottom edge in the scene: the handoff gives it to Slice 4.
- `nameWith` having no reader: Slice 2b by the plan.
- The 14 known citation errors of `foundation_check.py`: owners in Slices 8 and 9.

## Checks (command, exit code)

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/sim/data.test.mjs` | 0 | 40 pass |
| `npm test -- tests/view/icons.test.mjs` | 0 | 43 pass |
| `npm test -- tests/view/scene-picture.test.mjs` | 0 | 75 pass |
| `npm test -- tests/sim/discovery.test.mjs` | 0 | 50 pass |
| `npm test -- tests/invariants/test_icon_file_content.py` | 0 | 2 tests OK |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 | 3 tests OK |
| `npm run --silent typecheck` | 0 | clean |
| `npx eslint --max-warnings 0 src/browser/sim/data/creatures.ts src/browser/sim/data/scene.ts src/browser/view/credits.ts` | 0 | clean |
| `npx prettier --check` on those three files and `tests/sim/data.test.mjs`, `tests/view/icons.test.mjs` | 0 | all formatted |
| `python -B .the-way/elements/common/foundation_check.py` | 1 | 14 errors, all "quotation stands in no binding sentence" of D-325/D-327 in `tests/view/account-screen.test.mjs`, `map-lines.test.mjs`, `maps-screen.test.mjs`: the known ones; none other |
| icon comparison script (source at the pinned commit vs old repo vs repo file; wolf the same) | 0 | all True / `cmp` 0 |
| `gh api repos/game-icons/icons/git/trees/<commit>?recursive=1` and `curl` of the raw source and the icon page | 0 | files exist at the commit; page heading confirmed |

Not run: the full gate (the cycle's own run); ruff format of `tests/invariants/test_icon_credits.py` (no `.runs/quality-venv` in this
worktree; the change is one dict line and a comment re-wrapped within 100 columns, visible in the diff).

## Reach beyond the dispatch

- `src/browser/sim/understanding.ts:376`, `src/browser/view/credit-lines.ts:62`, `src/browser/sim/saved-game.ts:357,679`: read to see what a
  new creature id reaches (grep of `CREATURES`).
- `license.txt` of the icon repository at the pinned commit (network): the author line of Delapouite.
- The three PNG headers of `assets/sprites/bear-*.png` (and `bear-death.png`): to check the sheets' sizes.

## Working copies

`.runs/review-2/` (the old repo's icon files, the downloaded source files, test logs):
removed. Nothing else made.

## Unread material

Not read by me in this session: `guidelines/coding.md`, `guidelines/coding-content-data.md`, `guidelines/coding-browser-module.md`,
`guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, `foundations/part_map.md`, D-27 and D-271 in
`foundations/decisions.md` (the slice's *Read* names them; I judged the diff against the dispatch's passages, the executor's report and
the entries the change itself writes, and `foundation_check.py` passed on the quotations of the tests). The task passages the handoff
copies were read whole. The diff, the executor's report and the three changed foundation entries were read whole.

## Searches not found or unclear

- The executor's claim that the bear's feet stand about 3 rows above the frame bottom was not verified by me (Slice 4).
- No decision gives the bear's numbers 120/20; they come from the old game's entry, as the task says.
