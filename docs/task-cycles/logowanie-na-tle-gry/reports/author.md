# Author report — task `logowanie-na-tle-gry`, the whole change as the one author

**Status:** done with concerns

The concerns are choices the reviewer and the orchestrator should look at, none of them blocking:
the wording of D-271 against its projected question (choice 5), the *Part* of
`sprite-file-content` (choice 6), and two kinds of window where the fire and the mage do not stand
fully beside the card (choice 3). The settled route for looking at the screen, `playwright-cli`, is
not installed here; I used the Playwright library installed in the container instead (see
*Checks*).

## Commits (branch `claude/keen-curie-jazxic`, base `6864463`, not pushed)

| Commit | What |
|---|---|
| `688e133` | feat: the build copies the PNG files of `assets/sprites/` into `dist/public/sprites/`, the kitchen-sink page does not; `.dockerignore` and `Dockerfile` take `assets/sprites/` into the image; the picture `assets/sprites/login-backdrop.png` |
| `b2a2831` | style: the screen of the login card stands on the picture over the whole window |
| `9aeb122` | docs: README — the build copies the PNG files of `assets/sprites/`; where the picture comes from |
| `925dd61` | docs: foundation — `pixel-crawler-terms`, D-271, D-272, D-273, D-96 and D-73 changed, `sprite-file-content`, part map `browser-view` and *External context* |
| `f8d8e52` | docs: `guidelines/testing.md` — nine departures, D-273 and `sprite-file-content` in *Trust boundaries*, the table row, the paragraph under it, *Not tested on purpose*, *Where in code* |

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `assets/sprites/login-backdrop.png` | binary, new (74 655 bytes, 480×270 RGB) | |
| `scripts/static-files.mjs` | 15 | 0 |
| `scripts/build.mjs` | 2 | 1 |
| `.dockerignore` | 1 | 0 |
| `Dockerfile` | 1 | 0 |
| `src/browser/styles.css` | 11 | 1 |
| `README.md` | 1 | 1 |
| `foundations/decisions.md` | 86 | 3 |
| `foundations/environment_facts.md` | 6 | 0 |
| `foundations/invariants.md` | 10 | 0 |
| `foundations/part_map.md` | 3 | 0 |
| `guidelines/testing.md` | 16 | 12 |

Not in the product (Q1): the composing script and its evidence, in
`.runs/task-cycles/logowanie-na-tle-gry/reports/compose/` — `compose.py` (the pack files and regions
it takes stand in its `SOURCES`, the placements in `TREES`, `FIRE`, `WIZARD`) and `evidence/`
(screenshots, measurements, the one-off scripts and their logs). Run as
`python3 compose.py /home/user/loop/assets/pixel-crawler <out.png>`; it writes the committed file
byte for byte (checked with `cmp`, twice).

## What the change does

- `scripts/static-files.mjs`: a new `copySpriteFiles(root, out)` copies the files directly in
  `assets/sprites/` whose name ends in `.png` into `<out>/sprites/`. Only `scripts/build.mjs` calls
  it; `copyStaticFiles`, which the kitchen-sink page also calls, is unchanged, and
  `scripts/kitchen-sink.mjs` is untouched (its boundary, D-76, is not changed). The icon and font
  copies are unchanged.
- `.dockerignore` lets `assets/sprites/` into the build context; `Dockerfile` copies it into the
  build stage before `npm run build`.
- `src/browser/styles.css`, `.account-card-screen` (the screen that stands alone in the body while
  the card stands, D-262): the body's side padding is undone with
  `margin: 0 calc(-1 * var(--space-l))`, the padding moves inside, and
  `background: url("/sprites/login-backdrop.png") 17.5% 50% / cover no-repeat;
  image-rendering: pixelated`. The card's own background stays solid `var(--panel)`. No new token:
  the dimming is in the file.
- README line 25 says the build also copies the PNG files of `assets/sprites/`, where the picture
  comes from, and that `npm run kitchen-sink` does not copy them.

## The four questions carried to the cycle — my answers

1. **How the picture is composed.** At the pack's own pixel size: the snow floor of
   `Environment/Tilesets/Floors_Tiles.png` (region 0,352–80,384) tiled over the whole picture;
   winter trees from the fourth (snowy) column of `Environment/Props/Static/Trees/Model_01/`
   Size_02–Size_05 and the snowy stump of Size_05; the bonfire `Bonfire_02-Sheet.png` frame 1 with
   the flame `Fire_01-Sheet.png` frame 1 above it; the wizard `Entities/Npc's/Wizzard/Idle/Idle-Sheet.png`
   frame 1, standing left of the fire and facing it. Night: every pixel multiplied by a dark blue
   light (0.26, 0.30, 0.48), warmed around the fire (radius 90 px), then dimmed by 0.72. One frame of
   each sheet, so nothing moves. Only the Pixel Crawler pack is used, so no credit is added
   (`pixel-crawler-terms`).
   Rejected: drawing the scene in the browser from several files — more files at the boundary and a
   drawing the task does not ask for; dimming in CSS — needs a new token whose source is the
   human's (task *Context*). Cost if wrong: the picture is made again with the script, one file.
2. **Resolution.** 480×270 (16:9), the pack's own pixels, scaled by the browser with
   `image-rendering: pixelated` (exactly 4× at 1920×1080). Rejected: a file pre-scaled ×4
   (1920×1080) — larger file, and smooth scaling blurs the pixel art at 1280 and 2560 widths.
   Cost if wrong: at non-integer scales (1280 px wide is 2.67×) some art pixels are one screen
   pixel wider than others; visible only on close look at a dimmed background.
3. **How it fits the window.** `cover` with `background-position: 17.5% 50%`. The fire and the
   mage stand at x 58–116 of 480 (their middle near 17.5 %), and a percentage position puts the
   picture's 17.5 % point at the window's 17.5 % point whatever the scale. At 1280 px that is
   224 px, the middle of the 440 px strip left of the card, so they stand beside the card for
   every common height. Computed for widths 1280–3840 and heights 400–2200
   (`evidence/geometry.txt`): all hold but two kinds of window — 1280 px wide and 1850 px or more
   tall (1366 px from 2100 px), where the fire reaches under the card's edge, and ultrawide windows
   at most 500–550 px tall (3440 or 3840 wide), where the vertical crop cuts the top of the flame.
   Rejected: `background-position: center` — the group drifts under the card as the window grows
   taller; a position by pixel offset — a length in styles, which D-43 counts as a value in place
   of a token. Cost if wrong: the position is one value; a new picture is not needed.
4. **Does the composing script enter the repository?** No — Q1 of the orchestrator, binding. The
   script and its list of files and regions stand in `reports/compose/compose.py`.

## Foundation entries written (with one sentence of meaning in Polish)

- `pixel-crawler-terms` (fact) — sentence as projected; *Source* is the frozen address
  `https://github.com/mariusznazar/loop/blob/8072ce6…/assets/pixel-crawler/Terms.txt` (the commit
  that last changed the file) in place of the projected "repository loop, `assets/pixel-crawler/Terms.txt`",
  the four passages checked word for word against the file, read 2026-11-02.
  *Znaczenie:* Paczka Pixel Crawler nie wymaga wzmianki, wolno ją przerabiać i używać, nie wolno sprzedawać samych obrazków.
- **D-271 — Where do the scene's pictures come from?** (part of the projected entry): "The scene's
  pictures and the picture of the game behind the login card are sprites of the pack Pixel Crawler,
  kept in `assets/sprites/` outside the directory the account and save server serves and copied
  into it when the application is built. A sprite file holds pixels alone." Based on
  `pixel-crawler-terms`; Relations `none`; Verification `sprite-file-content` and a pair of
  examples. LPC Wolf, the credits and the scene's mage are left to task 20.
  *Znaczenie:* Obrazy gry, także ten za kartą logowania, to obrazki paczki Pixel Crawler z `assets/sprites/`, kopiowane przy budowaniu, i plik obrazka zawiera same piksele.
- **D-272 — Where may a picture of the game stand?** (part): "A picture of the game stands behind
  the login card, and text stands on a solid background, never on a picture." Relations
  `derives from D-96`; Verification a pair of examples (the definition had `TODO` in both; no
  invariant derives). The band of Siedziba and the scene are left to task 21.
  *Znaczenie:* Obraz gry stoi za kartą logowania, a tekst leży zawsze na pełnym tle.
- **D-273 — When do the files of `assets/sprites/` gain a refusal test?** (row C1): the deferral
  "until the first task changing that boundary … what changes the boundary is read as D-76 reads
  it, so a further PNG file of the pack does not", review meanwhile. Relations
  `narrows D-73 · derives from D-76`. *Rejected* holds the ways not chosen that questions 3 and 4
  keep, with their costs.
  *Znaczenie:* Granica `assets/sprites/` dostaje stały test odmowy dopiero przy zmianie jej zasady; kolejny plik PNG jej nie zmienia, a do tego czasu pilnuje przegląd.
- **D-96** changed: "one card on a picture of the game", and in *Rationale* "and shows a picture of
  it". **D-73**: its closed list of departures gains D-273.
- `sprite-file-content` (invariant) as projected, *Derives from* D-271.
  *Znaczenie:* Każdy plik, który budowanie kopiuje z `assets/sprites/`, jest obrazem PNG.
- Part map: `browser-view` gains `assets/sprites/**` in *Files* and *Trust boundary*; no
  `src/browser/*.tsx` (no tracked file matches, question 7); *External context* gains
  "the Pixel Crawler pack of Anokolisa | them → us | untrusted".
- `guidelines/testing.md`: "dziewięć odstępstw … D-235 i D-273"; *Trust boundaries* *Decision*
  gains D-273 and *Invariant* `sprite-file-content`; a row `assets/sprites/`; the paragraph under
  the table covers fonts, preview and `assets/sprites/` and says a further PNG file does not change
  that boundary; the sentence in *Not tested on purpose* (now lines 377–378, the task's :352–:353)
  covers the pictures; *Where in code* gains `assets/sprites/`. Written by the template's section
  "Writing the file" (`product-guidelines/testing/template.md`), the cycle author's part of
  `the-way-maintain-testing-guidelines`.

`python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors", after each step.

## Checks run (command → exit code)

- `npm run build` → 0; `dist/public/sprites/login-backdrop.png` equal to the source (`cmp`).
- `npm run kitchen-sink -- --build-only` → 0; no `dist/kitchen-sink/sprites/`, no `.png` under
  `dist/kitchen-sink/`.
- Crafted input at the boundary, one-off: `assets/sprites/probe.svg` and `probe.png.txt` added,
  `npm run build` → 0, `dist/public/sprites/` held only `login-backdrop.png`; probes removed.
- The PNG holds pixels alone: the compose script asserts its chunks are only `IHDR`, `IDAT`, `IEND`
  and checks every CRC; it passed for the committed file.
- Container, one-off copy of `tests/invariants/test_loop2_container_icons.py` with the directory,
  suffix and URL prefix switched to `assets/sprites`, `.png`, `/sprites/`
  (`evidence/oneoff_container_sprites.py`):
  `PYTHONPATH=…:tests/invariants:<dir> python -B -m unittest -v oneoff_container_sprites` → 0
  (the production container serves `/sprites/login-backdrop.png` with the file's bytes). Seen
  failing with the `COPY assets/sprites/` line removed from `Dockerfile` → 1 (`docker build`
  failed: `ENOENT … scandir '/app/assets/sprites/'`); `Dockerfile` restored, tree clean.
- `npx prettier --check` on `scripts/static-files.mjs`, `scripts/build.mjs`, `src/browser/styles.css` → 0.
- Focused tests, each `npm test -- <file>` (log `evidence/focused.log`):
  - `tests/invariants/test_application_package_layout.py` → 0
  - `tests/invariants/test_browser_view_token_values.py` → 0
  - `tests/invariants/test_browser_view_focus_outline.py` → 0
  - `tests/invariants/test_application_build_kitchen_sink.py` → 0
  - `tests/invariants/test_application_build_output.py` → 0
  - `tests/invariants/test_browser_view_framework.py` → 0
  - `tests/quality/test_quality_invariants.py` → 0
  - `tests/invariants/test_loop2_container_icons.py` → 0 (1 test, OK, not skipped)
  - `tests/deploy/test_loop2_image_icons.py` → 0 (1 test, OK, not skipped)
  - `tests/view/react-controls.test.mjs` → 0 (no failure, 0 skipped)
- Screen, in a real browser (`npm run local`, Chromium through the Playwright library at
  `/opt/node-tools/node_modules/playwright`, scripts `evidence/shots.mjs` and `evidence/states.mjs`,
  results `evidence/shots.json`, `evidence/states.json`, screenshots in `evidence/`):
  - the card on the picture in „Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła”, „Ustaw nowe
    hasło” (`#reset-password=anything`), with the credits open, at 1280×720, 1280×1024, 1920×1080,
    2560×1440 and 390×844: picture fetched with 200, card 400 px wide centred, its background
    `rgb(24, 24, 27)` (`panel`, opaque), no visible text outside the card, the fire and the mage
    left of the card at every width from 1280 (on 390×844 under the card, as allowed);
  - „Ustaw nowe hasło” for a signed-in player: card on the picture;
  - a refused reset link, signed out: „Odnośnik jest nieważny albo wygasł.” in the card on the
    picture, still there after pressing „Załóż konto”; signed in: the sentence above the game, no
    picture;
  - „Sprawdzanie logowania…” (session request held 1.5 s), „Potwierdzanie adresu…”, the warning
    with „Spróbuj ponownie” (account request aborted) and the game after registration: no element
    has a background image.
  The sentences of D-156 „Adres e-mail potwierdzony.”, D-97 and D-211 were not produced in the
  browser (they need mail, an outdated tab or an expired session); they go through the same
  `sentence` of the card (D-261), seen above for D-225/D-160.

Not run: the full gate (`npm test`) — the cycle's, as the method gives. Other container tests
(`test_loop2_container_isolation.py`, `test_account_save_sqlite_upgrade.py` and the like) build the
same image and are left to the gate. H1 (the test server) is the human's.

## Own-work check (section 3)

Requirement most likely unmet: "Przy oknie o szerokości od 1280 px ognisko i mag widać obok
karty". Check: the geometry of `cover` with position 17.5 % 50 %, computed from the group's
pixel box for widths 1280–3840 and heights 400–2200 (`evidence/geometry.txt`), and screenshots at
1280×720, 1280×1024, 1920×1080 and 2560×1440. Result: holds on every screenshot and every computed
window but 1280×≥1850, 1366×≥2100 (fire reaches 3–45 px under the card's edge) and 3440/3840 wide
by ≤500–550 tall (top of the flame cut). See choice 3.

## Reaches beyond the dispatch

- `tests/deploy/test_loop2_image_icons.py` and `.gitattributes` — found by a search for tests and
  settings reading the changed files; read to see whether a picture needs a test of its own or an
  attribute (it does not: git takes a PNG as binary).
- `src/browser/tokens.css` (values of `page` and `panel`) — to dim the picture so the card stands
  out.
- `src/browser/index.html`, `src/browser/view/credits*.ts*` — the page's root and whether the card
  holds images (it does not, so the inherited `image-rendering` touches nothing in it).
- The-way: `elements/*/template.md`, `elements/common/rules.md`, `way_of_working.md`, the skills of
  the four elements and `product-guidelines/testing/template.md` § "Writing the file" — the method
  of writing the entries, as the foundation step names it.
- `/home/user/loop/assets/README.md` and the pack's sheets — named by the handoff.

## Searches not found or unclear

- `playwright-cli` is not installed (`command not found`); the skill `loop2-play` says to stop and
  tell the human. Playwright MCP is not among my tools. I used the installed Playwright library
  instead; the evidence is the same kind (screenshots of the running game).
- D-271's question as projected names "the scene's pictures", while the only picture this task makes
  stands behind the login card (choice 5).
- The task's line numbers in `guidelines/testing.md` (:10, :149–150, :174–178, :352–353) had moved;
  found by content (:10, :149–150, :175–182, :377–378 now).

## Choices made, with the way rejected and its cost

1–4. The questions carried to the cycle, above.
5. **D-271's wording.** Kept the projected question and wrote the binding sentence as "The scene's
   pictures and the picture of the game behind the login card are sprites of the pack Pixel
   Crawler …", so the entry task 20 extends is the same entry and the code of this task makes it
   true. Rejected: a new question "Where do the game's pictures come from?" — task 20 would find no
   entry of the projected question; "the game's pictures" would also collide with the icons of
   D-27. Cost if wrong: one sentence of D-271 reworded.
6. **`sprite-file-content` *Part*** kept as projected, `browser-view`. A change in `build-tools`
   (the copy's filter in `scripts/static-files.mjs`) could make it false too, together with a
   non-PNG file in `assets/sprites/`. Rejected: adding `build-tools` — departs from the approved
   entry. Cost if wrong: a reviewer of a build-tools change may not select the invariant.
7. **D-272 Relations and Verification** (TODO in the definition): `derives from D-96`, and a pair
   of examples; no invariant. Rejected: an invariant "no text outside the card" — no cheap test,
   and the task asks for none.
8. **D-271 Relations `none`** — like D-27 and D-46, which keep icons and fonts the same way and name
   no relation.
9. **D-273**: Scope `browser-view · build-tools`; Relations `narrows D-73 · derives from D-76`;
   Origin the task document and the plan's *Open questions*.
10. **`pixel-crawler-terms` *Source*** given as a frozen GitHub address at the commit that last
    changed `Terms.txt`, in place of the projected "repository loop, `assets/…`", same passages;
    read date 2026-11-02 (my re-read), not the projected 2026-11-01.
11. **No permanent test** for the copy of `assets/sprites/` into the build or the image: D-273 and
    the guidelines' "copies data, no own rule" give review; one-off checks above stand as evidence.
    Rejected: a container test of sprites like `tests/deploy/test_loop2_image_icons.py` — an image
    build more in the gate and a test of an invariant (`loop2-container-sprites`) task 20 writes.
12. The build now fails when `assets/sprites/` is missing (`readdir` throws), as it does for
    `assets/icons/` and `assets/fonts/`.
13. The picture's file name `login-backdrop.png`.

No invariant test was changed.

## Problems observed

None in the product. The background command of `npm run local` was stopped with
`npm run local:stop` ("Local starts stopped: 1").
