# Report — executor of Slice 10, cycle `ognisko-i-jedzenie`

**Status:** done with concerns (the two container checks were skipped on this machine — no Docker
daemon — so `loop2-container-icons` and the image's icons stay unchecked; one file outside the
slice's *Change* list was adapted, see below).

Slice base `ab1558b09c2fbf37a106c34e0b6b731f5d387f2e`; branch `task/ognisko-i-jedzenie`.

## Commit

- `6981b7fae945f28aa65fb0a04aeca31fc636fa64` — feat: add the campfire icon from game-icons.net and
  credit it in the footer (author e-mail checked: the private address, as for the branch's commits).

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `assets/icons/campfire.svg` (new) | 1 | 0 |
| `src/browser/sim/data/campfire.ts` | 6 | 0 |
| `src/browser/view/credits.ts` | 5 | 0 |
| `src/browser/view/footer.ts` | 19 | 13 |
| `tests/view/icons.test.mjs` | 33 | 17 |
| `tests/invariants/test_icon_credits.py` (invariant test altered) | 3 | 1 |
| `tests/sim/data.test.mjs` (outside *Change* — adaptation) | 3 | 1 |
| `foundations/environment_facts.md` | 9 | 3 |
| `foundations/invariants.md` | 1 | 1 |

## The icon taken (trust boundary `assets/icons/**`)

- **File taken:** `lorc/campfire.svg` of github.com/game-icons/icons at `ICON_SOURCE_COMMIT`
  `82d948812bfe3f269ef8f731dcdb07b08160edc4`, fetched from
  `https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/lorc/campfire.svg`.
  It is the only file of the tree at that commit named `campfire`; the tree (fetched through the
  GitHub API, `truncated: false`) holds no other campfire icon (`lorc/small-fire.svg`,
  `delapouite/fireplace.svg` and others are different subjects).
- **Page:** https://game-icons.net/1x1/lorc/campfire.html — heading „Campfire icon”, author link
  `rel="author"` „Lorc”.
- **Author:** Lorc (folder `lorc`; the licence file's contributor list: „Lorc,
  http://lorcblog.blogspot.com”, not marked CC0).
- **Changed as the four icons:** the background path `<path d="M0 0h512v512H0z"/>` removed and
  `fill="#fff"` replaced by `fill="#f4f4f5"`; nothing else. Checked byte-wise: the source with these
  two replacements equals the committed file (the same check against `delapouite/wood-stick.svg`
  reproduces `assets/icons/wood-stick.svg` exactly, which is how the pattern was confirmed). No
  trailing newline, as the four. The file holds one `svg` and one `path` element, attributes
  `xmlns`, `viewBox`, `fill`, `d` only.

## Code

- `campfire.ts`: `CampfireDef` gains `icon` and `iconTitle`; `CAMPFIRE` gets `icon: "campfire"`,
  `iconTitle: "Campfire icon"`.
- `credits.ts`: `ICON_CREDITS.campfire` — author „Lorc”, page
  `https://game-icons.net/1x1/lorc/campfire.html`, changes the shared `CHANGES`.
- `footer.ts`: the credits come from `WITH_ICONS = [...Object.values(RESOURCES), CAMPFIRE]` — every
  thing the data gives an icon — instead of the resources alone; `FooterCredit.resourceName`
  renamed `name` (no other reader: grep over `src` and `tests`). Footer line, as rendered by the
  test: „ognisko: „Campfire icon”, Lorc, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny
  kolor)”, after the four resources' lines.

## Foundation entries (through the pinned element skills `record-environment-fact`, `record-invariant`)

Read for them: `elements/common/way_of_working.md`, `elements/common/rules.md`, both templates and
skills whole, the-way's own `foundations/environment_facts.md` (examples) and the invariant examples
`instruction-file-imports`, `script-imports`, `fingerprint-definition`. Search of the foundation for
`Delapouite`, `game-icons`, `lorc`, `campfire icon`, `icon-credits`: dependants are D-27 (*Based on*
`game-icons-licence`) and `icon-credits` (*Rests on*); the part map's external context row
`game-icons.net`. No glossary entry names icons or the footer.

- **F21 — new fact `game-icons-campfire-title`** (after `game-icons-flax-title`):
  > The page of Lorc's icon `campfire` on game-icons.net names the icon "Campfire icon".
  >
  > - **Source:** https://game-icons.net/1x1/lorc/campfire.html (archived: https://web.archive.org/web/20260621235751/https://game-icons.net/1x1/lorc/campfire.html, 2026-06-21) § heading — "Campfire icon"; read 2026-10-24

  Meaning: strona ikony na game-icons.net podaje jej tytuł „Campfire icon”. Archived copy found
  through the CDX index (`web.archive.org/cdx/search/cdx?url=game-icons.net/1x1/lorc/campfire.html`,
  five captures with status 200; the latest, 2026-06-21, taken); no capture was made for the entry.
  Mechanical check: the `h1` text of the live page and of the archived copy, markup dropped and
  whitespace collapsed, both read exactly `Campfire icon`.
- **F23 — changed fact `game-icons-licence`.** On `{fork-point}`:
  > The game-icons/icons repository provides the icons of its contributor Delapouite under Creative
  > Commons 3.0 BY.
  >
  > - **Source:** …/license.txt § first line — "Icons provided under the Creative Commons 3.0 BY or CC0 if mentioned below." · § list of contributors — "Delapouite, http://delapouite.com"; read 2026-10-13

  New:
  > The game-icons/icons repository provides the icons of its contributors Delapouite and Lorc under
  > Creative Commons 3.0 BY.
  >
  > - **Source:** …/license.txt § first line — "Icons provided under the Creative Commons 3.0 BY or CC0 if mentioned below." · § list of contributors — "Lorc, http://lorcblog.blogspot.com" · § list of contributors — "Delapouite, http://delapouite.com"; read 2026-10-24

  Meaning: licencja repozytorium obejmuje CC BY 3.0 także ikony Lorca. All three passages checked
  word for word in the fetched `license.txt` at the pinned commit; the date read moved to today as
  the whole page was re-read (one date per page, by the template). Dependants checked against the
  new sentence: D-27 — its sentence and *Based on* still hold (no change); `icon-credits` — its
  sentence names CC BY 3.0, which still holds (no change beyond F22).
- **F22 — changed invariant `icon-credits`:** *Rests on* gains `game-icons-campfire-title`; on
  `{fork-point}` it read `game-icons-licence · game-icons-wood-stick-title ·
  game-icons-berry-bush-title · game-icons-fern-title · game-icons-flax-title`. The sentence is
  unchanged. The test citing it, `tests/invariants/test_icon_credits.py`, checked against the
  wording: it gains `"campfire.svg": "Lorc"` in `AUTHORS` and `"campfire.svg": "Campfire icon"` in
  `TITLES`, and its comment names the new fact. No decision's level-1 verification gains, loses or
  renames an invariant (D-27 lists `icon-credits` by the same name).

## Checks (command — exit code)

Test-first runs:

1. `npm run build` — 0; `node --test tests/view/icons.test.mjs` before any code or icon — **1**:
   5 failing at assertions (footer items `4` ≠ `5` twice; `CAMPFIRE.icon` `undefined` ≠
   `'campfire'`; `existsSync(undefined.svg)` false; no credit for `undefined`).
2. With the **unchanged source file** copied into `assets/icons/campfire.svg`:
   `node --test tests/view/icons.test.mjs` — **1**, among the failures `campfire.svg: background
   path` (the untrusted source is rejected until changed by the pattern).
3. With the changed icon, before the credit: `python -B -m unittest discover -s tests/invariants -p
   test_icon_credits.py` — **1**: `['campfire.svg: the footer shows no credit with its page on
   game-icons.net'] != []` (invariant test seen failing for the expected reason).

After the code:

- `npm run build` — 0
- `node --test tests/view/icons.test.mjs` — 0 (26 pass)
- `npm run typecheck` — 0
- `node --test "tests/view/*.test.mjs"` — 0 (69 pass)
- `node --test "tests/sim/*.test.mjs"` — 1 first (`the campfire holds its name, costs, burning
  minutes and warmth`: a `deepEqual` of the whole `CAMPFIRE`), then 0 (196 pass) after the
  adaptation below
- `python -B -m unittest discover -s tests/invariants -p test_icon_file_content.py` — 0
- `python -B -m unittest discover -s tests/invariants -p test_icon_credits.py` — 0 (3 tests)
- `python -B -m unittest discover -s tests/invariants -p test_content_identifiers.py` — 0
- `python -B -m unittest discover -s tests/invariants -p test_loop2_container_icons.py` — 0,
  **skipped=1** → `loop2-container-icons` **unchecked** (`docker version`: „failed to connect to
  the docker API at npipe:////./pipe/dockerDesktopLinuxEngine”)
- `python -B -m unittest discover -s tests/deploy -p test_loop2_image_icons.py` — 0, **skipped=1**
  → the image's icons **unchecked**, same reason
- `python -B .the-way/elements/common/foundation_check.py` — 0 („0 errors”), also after the commit
- `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k
  prettier` — 0 (2 tests), also after the adaptation
- Not run: Ruff on `tests/invariants/test_icon_credits.py` — Ruff is not installed (as the plan
  says). The full suite (`npm test`) — the cycle's, not the slice's.

## Own-work check (section 3)

- **Requirement most likely unmet:** „the footer's credits come from every icon the data names, not
  from the resources alone”. Check: `grep -rn "icon:" src/browser/sim/data/` — only
  `resources.ts` (four) and `campfire.ts` (one) name icons, and `WITH_ICONS` takes both; every SVG
  file has a credit (`each icon file has a credit…` passes over the files of `assets/icons/`), and
  `test_icon_credits.py` passes with five files. Shown: met. A weakness remains: a future data file
  that names an icon is not picked up by itself — `WITH_ICONS` is a hand list in `footer.ts`; the
  test „each icon file has a credit” and `icon-credits` catch a new icon file without a footer
  line, so the gap shows as a failing check, not silently.
- **The icon is exactly the source changed by the pattern:** byte comparison (above) — true.
- **User interface:** the footer gains one `li` of the same structure as the four (text, two links
  with `target="_blank"`, `rel="noopener noreferrer"`, checked by the existing link test, which now
  runs over five lines). No new control, role, token or style; the links take the global
  `:focus-visible` rule. Screenshot **unchecked**: the foundation and the styleguide settle no route
  for a screenshot of the running product (the styleguide's only mention is a mockup of loop).
- Mutations in the head: a wrong author or page in `credits.ts`, the campfire left out of
  `WITH_ICONS`, a wrong title in the data, the background kept or the fill left `#fff` — each fails
  a test above (literal footer line and link, data literal, file-shape test, `icon-credits`).

## Adaptations and choices

- **Adaptation (outside *Change*):** `tests/sim/data.test.mjs:134` pinned the whole `CAMPFIRE`
  object with `deepEqual`, so the slice's own goal (the campfire's data names its icon) broke it;
  its expected literal gains `icon: "campfire"`, `iconTitle: "Campfire icon"` and its title says
  „and icon”. Small mismatch by section 4.
- **Choice:** `FooterCredit.resourceName` → `name`, since lines are no longer resources' only.
  Rejected: keeping `resourceName` for the campfire — a misleading name; cost if wrong: one rename.
- **Choice:** the list of things with icons lives in `footer.ts`, not in the data. Rejected: a new
  export in `src/browser/sim/data/` collecting icon-bearers — a data shape the plan did not ask for;
  cost if wrong: one more place to add a future icon-bearer (caught by the tests named above).
- **Choice:** the archived copy is the latest CDX capture (2026-06-21), the closest existing to the
  read date.
- **Choice of icon:** `lorc/campfire.svg`, the file whose name and title match the campfire; its
  author is Lorc, so F23 applies.

## Reaches beyond the dispatch

- `foundations/glossary.md` (grep for icon/footer) — step 4 of „Reading the foundation”; nothing
  found.
- `tests/view/icons.test.mjs`'s and `tests/invariants/test_content_identifiers.py`'s head (the
  latter to see whether the campfire falls under `content-identifiers`: it does not — maps,
  resources, archetypes only).
- `tests/sim/data.test.mjs:134-142` — the failing test above.
- `.gitattributes` and `git ls-files --eol` — to keep each file's line endings (CRLF in the working
  tree of `foundations/*.md` and `test_icon_credits.py` kept).

## Problems observed

- Docker Desktop's daemon is not running on this machine (error above); both container checks
  skip. Cause verified only as far as the error message.

No questions.
