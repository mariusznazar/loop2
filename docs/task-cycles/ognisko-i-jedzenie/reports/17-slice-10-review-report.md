PASS 6981b7fae945f28aa65fb0a04aeca31fc636fa64

# Review of Slice 10 — cycle `ognisko-i-jedzenie`

Range: `ab1558b09c2fbf37a106c34e0b6b731f5d387f2e..6981b7fae945f28aa65fb0a04aeca31fc636fa64` (one
commit, 6981b7f, author `<the repository owner's address>`). `git rev-parse HEAD` in the reviewed worktree is
the given head. The handoff first named the base `ab1558b9`; the orchestrator corrected it to the
full SHA above, the commit `ab1558b` resolves to, and that range is the one reviewed.

Read: the review handoff; the executor's handoff (`16-slice-10-handoff.md`) with its selection,
read as given: `task.md:30`, `:87`, `:154`; `spec.md:86-89`, `:379-480`; `plan.md:7-48`;
`reports/foundation-map.md`; D-18, D-27, D-36, D-43 and D-63 (F15), each whole at its current
range; invariants `content-identifiers`, `icon-file-content`, `icon-credits`,
`loop2-container-icons`; `foundations/environment_facts.md` `game-icons-licence` to
`game-icons-campfire-title`; part map `browser-view` and *External context*;
`guidelines/coding.md`, `coding-browser-module.md`, `coding-content-data.md`,
`styleguide-browser-view.md`, `src/browser/AGENTS.md`, each whole; the executor's report, read as
claims to check; the diff and log of the range.

## Findings

### Critical

None.

### Important

None.

### Minor

1. **`src/browser/view/footer.ts:25` — the footer's list of what has an icon is written by hand
   in the view.** `const WITH_ICONS = [...Object.values(RESOURCES), CAMPFIRE];` In the plan's
   words, "the footer's credits come from every icon the data names". The view meets that today by
   listing the two data sources itself. `grep icon src/browser/sim/data/` finds only
   `resources.ts` and `campfire.ts`, so nothing is missed now. Later, a data file that names an
   icon, such as a creature in task 8, adds no footer line unless someone also edits `footer.ts`.
   The checks catch this only when the icon is a new file. `icon-credits` and "each icon file has
   a credit" go over the files of `assets/icons/`, not over what the data names. If the new thing
   reuses an icon file that already has a credit, the footer's credits still hold. If it uses a
   new file, `icon-credits` fails. The executor reports this weakness himself. The tests guard
   the outcome that matters, a credit for every icon file shown, so this does not block. A list
   the data exports would make it hold by construction, but the plan did not ask for that data
   shape.

## Trust boundary — `assets/icons/campfire.svg` (untrusted, from game-icons.net)

- **Nothing in it runs and it refers to nothing outside itself.** The file is 1654 bytes. It holds
  only the elements `svg` and `path` and only the attributes `xmlns`, `viewBox`, `fill` and `d`.
  It has no `&`, no `url(`, no DOCTYPE or entity, no processing instruction, no CR, no script, no
  `foreignObject`, no `on*` attribute, no animation and no `href`. The only namespace is
  `http://www.w3.org/2000/svg`. `test_icon_file_content.py` passes at the head.
- **It equals its source except for the stated changes.** I fetched
  `https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/lorc/campfire.svg`
  (HTTP 200, 1678 bytes). The commit is `ICON_SOURCE_COMMIT` in `credits.ts`. The source contains
  `<path d="M0 0h512v512H0z"/>` once and `fill="#fff"` once. With that path removed and the fill
  replaced by `fill="#f4f4f5"`, the source equals the committed file byte for byte. `#f4f4f5` is
  `--text-strong` in `src/browser/tokens.css:21` and the fill of the four earlier icons, as D-43
  and the styleguide require. The statement of change, „zmienione (bez tła, jasny kolor)”, is true
  of the file.
- **The credit, title and author match the icon's page.** I fetched
  `https://game-icons.net/1x1/lorc/campfire.html` (HTTP 200): `<h1 id="icon-name"
  itemprop="name">Campfire icon</h1>` and `<a href="https://lorcblog.blogspot.com"
  rel="author">Lorc`. The archived copy
  `https://web.archive.org/web/20260621235751/https://game-icons.net/1x1/lorc/campfire.html` (HTTP
  200) has the same heading and author link. The data's `iconTitle: "Campfire icon"` and the
  credit's author „Lorc” and page agree with the page. In `license.txt` at the pinned commit, line
  1 reads "Icons provided under the Creative Commons 3.0 BY or CC0 if mentioned below." and
  line 5 reads "- Lorc, http://lorcblog.blogspot.com". Lorc is not marked CC0 there, so CC BY 3.0
  holds for this icon. The three passages that F23 cites stand word for word in that file.
- **The container copies it** (`loop2-container-icons`; its test and
  `tests/deploy/test_loop2_image_icons.py` skip here because Docker has no daemon). Instead I
  checked statically and with a local build. The `Dockerfile` has `COPY assets/icons/
  assets/icons/` and then `RUN npm run build`. `scripts/static-files.mjs:21-28` copies every
  `*.svg` of `assets/icons/` into `dist/public/icons/`, and the runtime stage copies `dist`. In a
  scratch worktree of the head, `npm run build` put `campfire.svg` into `dist/public/icons/`, and
  `cmp` against `assets/icons/campfire.svg` showed identical bytes. Not checked: that the running
  container serves it at `/icons/campfire.svg`.

## Against the task, spec and foundation

- To do 15 (the icon credited in the footer) and spec unit 10 (the icon, changed like the other
  icons, with its credit and title fact) are met. Spec unit 1's "the campfire's icon and the
  icon's title" stands in `campfire.ts`. The footer line reads exactly „ognisko: „Campfire icon”,
  Lorc, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)”, as the plan states it. The
  test asserts that line literally, along with the page link.
- D-27 is met: the icon comes from game-icons.net, stands in `assets/icons/`, is copied at build
  time and is credited with its title, author, page, licence and change. D-18 and
  `content-identifiers` hold: the view reads the name and the icon from the data, and
  `test_content_identifiers.py` passes. D-43 holds: the icon's colour is in the file, and
  `browser-view-token-values` passes.
- Foundation entries the slice writes:
  - **F21** `game-icons-campfire-title` follows the pattern of `game-icons-wood-stick-title`:
    page, archived copy with its date, heading quoted, read date. I checked the quote against
    both pages.
  - **F23** `game-icons-licence` now names Lorc, and its passages are verified above. D-27 still
    rests on it unchanged, since the sentence still says CC BY 3.0.
  - **F22** `icon-credits` gains `game-icons-campfire-title` under *Rests on*; its sentence is
    unchanged.
- **Changed invariant test:** `tests/invariants/test_icon_credits.py` gains `"campfire.svg":
  "Lorc"` in `AUTHORS` and `"campfire.svg": "Campfire icon"` in `TITLES`, and its comment names
  the new fact. Its docstring's reading of the sentence is unchanged and still fits.
- **File outside *Change*:** in `tests/sim/data.test.mjs:134-144`, the `deepEqual` of the whole
  `CAMPFIRE` gains the two new fields. This follows directly from the slice's own goal and is not
  a finding.
- The rename `FooterCredit.resourceName` → `name`: `git grep resourceName 6981b7f -- src tests
  scripts` finds nothing, so no reader is left behind.
- Line endings: `git ls-files --eol` shows the index at LF for every changed text file, the icons
  at `i/none` like the four, and the CRLF working copies of `foundations/*.md` and
  `test_icon_credits.py` kept as they were.
- Styleguide: the footer gains one `li` with the same structure and no new style, role, token or
  `outline`. Its links fall under the global `:focus-visible` rule. No screenshot was given. The
  change adds no new state or control, so I do not treat that as a gap.

## Own-work check

The executor named the requirement most likely unmet: "credits from every icon the data names".
That is where the change is weakest; see Minor 1. His check, a grep of the data plus the tests,
would catch a missing campfire line. I confirmed this with a mutation, below. The check would not
catch a future data file that names an existing icon, which is the remainder in Minor 1.

## Declined to judge

- The campfire's icon on its tile in the terrain drawing (To do 15, D-63): that belongs to Slice
  12, not this slice.
- The campfire's state in the tile-list row (To do 15): that belongs to Slice 12.

## Checks run

All ran in a separate worktree of the head, under the session scratchpad, with `node_modules`
linked. The reviewed worktree was not changed. The scratch worktree is removed, and the reviewed
worktree's `git status --short` is empty.

- `npm run build` — 0
- `npm run typecheck` — 0
- `node --test tests/view/icons.test.mjs` — 0 (26 pass)
- `node --test "tests/view/*.test.mjs"` — 0 (69 pass)
- `node --test "tests/sim/*.test.mjs"` — 0 (196 pass)
- `python -B -m unittest discover -s tests/invariants -p test_icon_file_content.py` — 0 (2 tests)
- `python -B -m unittest discover -s tests/invariants -p test_icon_credits.py` — 0 (3 tests)
- `python -B -m unittest discover -s tests/invariants -p test_content_identifiers.py` — 0 (4 tests)
- `python -B -m unittest discover -s tests/invariants -p test_browser_view_token_values.py` — 0
  (4 tests)
- `python -B -m unittest discover -s tests/invariants -p test_loop2_container_icons.py` — 0, but
  **skipped=1**, so `loop2-container-icons` is **unchecked**. `docker version` reports "failed to
  connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine".
- `python -B -m unittest discover -s tests/deploy -p test_loop2_image_icons.py` — 0, but
  **skipped=1**, so it is **unchecked** for the same reason.
- `python -B .the-way/elements/common/foundation_check.py` — 0 („0 errors”)
- `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k
  prettier` — 0
- Mutation in the scratch worktree: `CAMPFIRE` removed from `WITH_ICONS` in `footer.ts`, then
  rebuilt (build 0). `node --test tests/view/icons.test.mjs` exited 1 with 2 tests failing, and
  `test_icon_credits.py` exited 1 with `['campfire.svg: the footer shows no credit with its page
  on game-icons.net'] != []`. Afterwards the file was restored with `git checkout`.
- Manual check: I fetched the source SVG, `license.txt`, the icon's live page and its archived
  copy (all HTTP 200) and compared bytes and text as described under *Trust boundary*.
- Not run: Ruff on `test_icon_credits.py`, because Ruff is not installed. The full suite (`npm
  test`) is the cycle's run, not this review's.

## Reaches beyond the dispatch

- `src/browser/tokens.css:21` (`--text-strong`): to check that the icon's fill is the value of
  `text-strong` (D-43).
- `Dockerfile` and `scripts/static-files.mjs:21-28`: to check the copy into the container in
  place of the skipped container test.
- The docstrings of `tests/invariants/test_icon_credits.py` and
  `tests/invariants/test_icon_file_content.py`: to see what each test reads into its invariant.
- `git grep resourceName` over `src`, `tests` and `scripts`: to look for readers left behind by
  the rename.
- Outside the repository: the four game-icons URLs above, to check the untrusted file and its
  credit.
