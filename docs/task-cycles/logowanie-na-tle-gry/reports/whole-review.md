FAIL f8d8e525c4ceec9f5696b770695952f2086bdfb3

# Review of the whole change — task `logowanie-na-tle-gry`

- Range: `6864463..f8d8e52` (5 commits: 688e133, b2a2831, 9aeb122, 925dd61, f8d8e52), computed with
  `git diff` / `git log` of that range; `git rev-parse HEAD` = f8d8e525…, the head given.
- Route: one author without a plan; no spec, no plan, no slices, so every finding below comes from
  no slice; this review is the only one the change gets.
- Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md` at the pinned the-way f45ca40
  (`git -C .the-way rev-parse HEAD` = the gitlink).
- Counts: blocking 1 (Important 1, Critical 0); Minor 3; out of scope 0 (the Declined-to-judge
  lines below are out of scope by the method and are not findings).

## Findings

### Important

**I1. D-273 narrows the settled condition with "of the pack", and the testing guidelines restate it
without that qualification.**

- Place: `foundations/decisions.md:5669-5673` (D-273, binding sentence: "what changes the boundary
  is read as D-76 reads it, so a further PNG file of the pack does not") and `:5679-5680` (its
  *complies* example: "a task adding a further PNG picture of the pack"); against
  `guidelines/testing.md:181-183` ("kolejny plik PNG w `assets/sprites/` nie zmienia granicy
  obrazków") and the frozen task.
- What is wrong: the task's settlement C1 and its question 3 say, without qualification, "Kolejny
  plik PNG nie kończy odstępstwa i plan się nie zmienia", "kolejny plik PNG go nie kończy". D-273
  writes "a further PNG file *of the pack*". D-273 itself names no pack, so "the pack" has no
  antecedent in the entry; read beside D-271 it means Pixel Crawler. A PNG from another pack — the
  LPC Wolf sprite that task 20 adds to `assets/sprites/` by the projected "Where do the scene's
  pictures come from?" — is then not covered by the sentence, and D-76's reading ("another kind
  of file, another way in, another recipient") leaves open whether a new pack, a new external
  partner, is "another way in". The guidelines this change writes say any further PNG does not end
  the deferral; the decision it writes says only a further PNG of the pack does not. The two
  artifacts of one change disagree, and the decision departs from the human's settlement.
- Why it matters: C1 was recorded exactly so that a later task would not guess ("zadanie 6, które
  pierwsze dokłada obrazek, samo zgadywałoby, czy dodaje stały test"). With "of the pack", task 20
  has to guess again whether its LPC Wolf PNG ends the deferral and brings a refusal test — the
  cost the human rejected under question 3 ("test przy zadaniu 6 …, zmiana odpowiedzi „pliki
  testów żadne", zmiana planu"). By WAY-263 a change's file that restates an entry it writes
  differently, here without the qualification (or, seen from the task, an entry that adds a
  qualification its settlement does not hold), is Important. Within the task (To do 7, row C1).
- Evidence: `grep -n "of the pack" foundations/decisions.md` → lines 5672 and 5679 (and 5617,
  D-271, where it is correct); task `task.md`, question 3 *Answer* and *Settlements to record* C1;
  `guidelines/testing.md` lines 179-186 at the head.
- Fix suggested: drop "of the pack" in both places of D-273 ("so a further PNG file does not";
  "a task adding a further PNG picture to `assets/sprites/`"), so the decision says what C1 and
  `guidelines/testing.md` say.

### Minor

**M1. The 1280 px condition of question 8 does not hold for every window from 1280 px wide.**

- Place: `src/browser/styles.css:269` (`background: url(…) 17.5% 50% / cover no-repeat`).
- What: the task's condition is "Przy oknie o szerokości od 1280 px ognisko i mag widać obok
  karty". The author's own geometry (`reports/compose/evidence/geometry.txt`) shows 18 failing
  windows: 1280 × ≥1850 and 1366 × ≥2100 (the fire reaches 3–45 px under the card's left edge;
  the mage, left of the fire, stays visible) and 3440/3840 × ≤500–550 (the top of the flame is cut;
  both stay beside the card).
- Why Minor: graded by effect on the user (WAY-220): such windows are rare (a 1280 px wide window
  1850 px tall, or an ultrawide window half a screen tall), and in each the mage and most of the
  fire remain visible beside the card. With `cover`, a window that tall makes the group of fire and
  mage (x 58–116 of 480) about as wide as the whole strip left of the card, so no position of this
  picture removes the overlap; only another way of fitting would. Worth a line for the human at H1
  rather than a fix.
- Evidence: `geometry.txt` ("cases failing: 18"); screenshots `login-1280x720.png`,
  `login-1280x1024.png`, `login-2560x1440.png` looked at, the fire and mage beside the card in each.

**M2. D-271 widens the projected entry, and the source that task 20 will write from does not
know it.**

- Place: `foundations/decisions.md:5617-5619` (D-271: "The scene's pictures and the picture of the
  game behind the login card are sprites of the pack Pixel Crawler …").
- What: the projected entry (`definicja_mvp2_loop2.md:328-336`) speaks only of "the scene's
  pictures". The author added "and the picture of the game behind the login card", so that the
  entry covers the one picture this task's code makes (author's choice 5). That is a reasonable
  bridge — without it the decision would describe pictures no code yet makes — but it is a wording
  the definition does not hold, and the definition stays the source from which task 20 writes the
  rest of the entry (LPC Wolf, credits, the scene's mage). Task 20, writing from the projected
  sentence, would drop the login picture from the decision.
- Why Minor: nothing in the product is wrong today; the risk is a later overwrite. The orchestrator
  should carry the widened sentence back to the projected entry in the definition (or to the
  plan's note for task 20) in the return step, so the next writer starts from it.
- Evidence: `git diff 6864463..f8d8e52 -- foundations/decisions.md`; definition lines 328-336.

**M3. The comment of `copySpriteFiles` claims more than its filter does; the filter is the file
name only and follows symlinks.**

- Place: `scripts/static-files.mjs:32-44` — comment "Only `.png` files go: a sprite file holds
  pixels alone", code `if (name.endsWith(".png")) await copyFile(…)`.
- What: the filter is by name. In a scratch worktree of the head I added to `assets/sprites/` a
  text file `fake.png`, a symlink `link.png → /etc/hostname`, `probe.svg`, `probe.png.txt`,
  `PROBE.PNG` and `sub/nested.png`, and ran `npm run build` (exit 0): `dist/public/sprites/` held
  `fake.png` (ASCII text), `link.png` (the content of `/etc/hostname`, followed through the link)
  and `login-backdrop.png`; the SVG, `.png.txt`, upper-case `.PNG` and the subdirectory were not
  copied. A directory named `dir.png` makes the build fail (exit 1).
- Why Minor: D-273 deliberately keeps `sprite-file-content` by review, and this change's only file
  passes it (below); the icon and font copies have the same name-only filter. But the comment reads
  as if the filter secured "pixels alone", which a reviewer of a later sprite could take at its
  word; and a tracked symlink is a way a non-PNG reaches what the server serves. Reword the comment
  to say the filter selects by name and the content is review's (D-273), or skip non-regular files
  (`lstat`); and a reviewer of each later sprite checks the git mode `100644`, not only the bytes.
- Evidence: commands and outputs under *Checks*; `git ls-tree -r f8d8e52 assets/sprites` →
  `100644 blob f9d0365… login-backdrop.png`.

## The whole task, item by item

- To do 1 (card on the picture in its four states, signed-in reset included; still, dimmed, whole
  window; no picture on the waiting screens; fire and mage beside the card from 1280 px): met.
  The class `account-card-screen` is set only by `createAccountCard`
  (`src/browser/view/account-card.tsx:635`), which builds the card for all four states, and the
  waiting screens stand outside it (D-262), so the picture stands with the card only. Picture
  viewed: a snowy forest at night, a bonfire and the pack's purple-robed wizard beside it, one
  frame, dimmed in the file. Author's screenshots and `states.json` looked at. 1280 px condition:
  see M1.
- To do 2 (all text on a solid background, card not half-transparent; the page's sentences in the
  card): met. `.account-card` keeps `background: var(--panel)`, opaque; the screen holds nothing but
  the card; the sentences stand in the card per D-261 (author's `refused-link-*` states).
- To do 3 (file in `assets/sprites/`, from Pixel Crawler, PNG; `npm run build` copies it; the
  kitchen-sink build does not): met — checked below.
- To do 4 (the image holds the file; locally and on the test server): the image part met — checked
  below; the test server is H1, the human's.
- To do 5 (README): met, `README.md:25`.
- To do 6 (foundation): `sprite-file-content`, `pixel-crawler-terms`, part map `browser-view`
  (`assets/sprites/**` in *Files* and *Trust boundary*, no `src/browser/*.tsx` — `git ls-files
  'src/browser/*.tsx'` matches nothing, the `.tsx` files stand under `view/`), *External context*
  partner, D-96 "on a picture of the game" with the projected rationale clause, D-271 and D-272 as
  parts: met, with M2.
- To do 7 (D-273, D-73's list, testing.md :10, :149-150, table row, paragraph, *Not tested on
  purpose* sentence, through `maintain-testing-guidelines`): written; the author followed "Writing
  the file" of `.the-way/product-guidelines/testing/template.md`, the cycle author's part. I1 stands
  against D-273's wording.
- *Settlements to record* C1: recorded as D-273, with I1.
- Fidelity to sources: the picture is recomposed byte for byte from Pixel Crawler files only
  (below); `pixel-crawler-terms` quotes Terms.txt word for word (below); its *Source* is a frozen
  GitHub address of the same file instead of the projected "repository loop, `assets/…`", and the
  read date is the author's re-read — a more exact address of the same source, not an alteration.
  D-271 wording: M2.
- Reserved choice: none taken. No dependency; the composing script stays in the cycle record (Q1).
- Tests: no test was added or changed; none was required (D-273 keeps the boundary by review; the
  copy is "copies data, no own rule"); no invariant test changed.
- Author's own-work check (the 1280 px condition): a fair weak point for the picture; its geometry
  check found and reported the failures (M1). It did not reach the wording of D-273 against C1
  (I1).

## Trust boundary `assets/sprites/**` — crafted input

- Build copies only `.png` names from `assets/sprites/`: yes (probes above); content is not checked
  by the build — see M3.
- The PNG holds pixels alone: parsed independently — signature, chunks `IHDR, IDAT, IDAT, IEND`,
  all CRCs valid, no byte after `IEND`; IHDR 480×270, 8-bit RGB, no interlace; the IDAT zlib
  stream ends exactly (`eof True`, `unused_data` 0) and inflates to 389 070 bytes = 270 × (1 + 480 × 3).
- Nothing from `assets/sprites/` reaches the kitchen-sink output or the preview server:
  `scripts/kitchen-sink.mjs` is unchanged and calls only `copyStaticFiles`; after `npm run
  kitchen-sink -- --build-only` (also with the probes in place) `dist/kitchen-sink/` held no `.png`
  and no `sprites/`. The page's `styles.css` names `/sprites/login-backdrop.png` only under
  `.account-card-screen`, which no kitchen-sink module renders (D-269: no React there).
- Icon and font copies unchanged: `copyStaticFiles` is untouched by the diff.
- Image: `.dockerignore` admits `assets/sprites/`, `Dockerfile` copies it before `npm run build`;
  the container serves `/sprites/login-backdrop.png` with the file's bytes (one-off, below).

## Declined to judge

- D-87 and the *Not tested on purpose* bullet on pixel comparisons say "bezpieczeństwo ikon
  i fontów nie jest wyłączone" and do not name the sprites — the task lists the exact lines of
  `guidelines/testing.md` to change and does not include this one, nor D-87.
- The name-only, symlink-following filter of the icon and font copies in `copyStaticFiles` —
  code the change does not touch.
- No preload of the picture, so the card may stand for a moment on `page` before the picture
  arrives — no requirement speaks of it, and no text stands on the picture meanwhile.
- The card on the test server (H1) — the human's, after the request opens.
- The sentences of D-156 „Adres e-mail potwierdzony.", D-97 and D-211 not produced in a browser —
  they go through the same card sentence (D-261) the author saw for D-225/D-160; producing them
  needs mail, an outdated tab or an expired session, beyond what this review re-runs.

## Checks run

Scratch worktree of f8d8e52 under the scratchpad (`git worktree add --detach`, removed after; the
reviewed worktree, index and branch untouched — `git status --short` empty, HEAD f8d8e52 at the
end), with `node_modules`, `.the-way` and `.runs/quality-venv` linked from `/home/user/loop2`.

- `npm run build` → 0; `cmp dist/public/sprites/login-backdrop.png assets/sprites/login-backdrop.png` → same.
- `npm run kitchen-sink -- --build-only` → 0; no `.png`, no `sprites/` under `dist/kitchen-sink/`.
- Crafted input (`fake.png`, symlink `link.png → /etc/hostname`, `probe.svg`, `probe.png.txt`,
  `PROBE.PNG`, `sub/nested.png`), `npm run build` → 0; copied: `fake.png`, `link.png`,
  `login-backdrop.png` (M3). `npm run kitchen-sink -- --build-only` → 0, no `.png` in its output.
  A directory `dir.png` → `npm run build` exit 1. Probes removed.
- PNG chunk and IDAT parse (one-off Python, `python3 -I`) → as above.
- `python3 -I compose.py /home/user/loop/assets/pixel-crawler <scratch>/out.png` (the cycle
  record's script, read whole first; it reads only the twelve regions of `SOURCES`) →
  `cmp` with `assets/sprites/login-backdrop.png`: identical.
- `npm test -- tests/invariants/test_browser_view_token_values.py` → 0 (4 tests OK)
- `npm test -- tests/invariants/test_application_build_kitchen_sink.py` → 0 (3 tests OK)
- `npm test -- tests/invariants/test_application_build_output.py` → 0 (7 tests OK)
- `npm test -- tests/invariants/test_design_token_sources.py` → 0 (2 tests OK)
- `npm test -- tests/deploy/test_loop2_image_icons.py` → 0 (1 test OK, not skipped)
- The author's one-off container check, copied to the scratchpad, run against the worktree:
  `PYTHONPATH=<wt>:<wt>/tests/invariants:<oneoff> python -B -m unittest -v oneoff_container_sprites`
  → 0 (1 test OK; the production container served `/sprites/login-backdrop.png` with the file's bytes).
- `npx prettier --no-config --no-editorconfig --check scripts/static-files.mjs scripts/build.mjs src/browser/styles.css` → 0
- `npx eslint --max-warnings 0 scripts/static-files.mjs scripts/build.mjs` → 0
- `python -B .the-way/elements/common/foundation_check.py` in `/home/user/loop2` → 0, "0 errors".
- `git -C /home/user/loop show 8072ce6:assets/pixel-crawler/Terms.txt` → the four quoted passages
  of `pixel-crawler-terms` stand word for word in points 1–4.
- Manual: the PNG and the author's screenshots `login-1280x720.png`, `login-390x844.png` viewed;
  `shots.json`, `states.json`, `geometry.txt` read.

Not run: the full gate (`npm test`) — the cycle's own run before the request, as the method gives.
Not re-run by me: the browser pass over the running game (`npm run local` with Playwright); I
relied on code reading (the class is set only by `createAccountCard`) and the author's screenshots
and DOM measurements. Not run: the other container tests that build the image
(`test_loop2_container_isolation.py` and the like) — left to the gate.

## Selection and reaches

Selected by "Reading the foundation" and `product-guidelines/reading.md`. Parts touched:
browser-view (`src/browser/styles.css`, `assets/sprites/**`), build-tools (`scripts/*.mjs`,
`README.md`), deployment (`Dockerfile`, `.dockerignore`), product-foundation (`foundations/**`),
agent-workflow (`guidelines/testing.md`). The decision log is 5 696 lines and *Scope* names
browser-view in 171 entries; I read whole the entries the task's *Decisions in play* names and
those of these parts that bear on pictures, static files, the build, the kitchen-sink page,
tokens, contrast and the login card: D-05, D-06, D-27, D-40, D-42, D-43, D-45, D-46, D-73, D-76,
D-86, D-87, D-96, D-259, D-261, D-262, D-266, D-269, D-271, D-272, D-273. Invariants read whole:
`sprite-file-content`, `application-build-output`, `application-build-kitchen-sink`,
`preview-server-access`, `icon-file-content`, `loop2-container-icons`, `font-file-provenance`,
`browser-view-token-values`. Environment fact `pixel-crawler-terms`. Part map read whole.
Glossary searched for "sprite", "picture", "obraz": no entry. Guidelines read whole:
`guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `guidelines/coding.md` (no kind
row matches: `styles.css` and the build scripts have no kind file; `coding-browser-module.md` is
for modules in the view directory, which the change does not touch).

Reaches beyond the dispatch:
- `/home/user/the-brain/Notes/Projects/(P) Loop/definicja_mvp2_loop2.md` lines 320-360, 505-520,
  596-612, 1330-1370, 1435-1445 — the projected entries D-271, D-272, D-96, `sprite-file-content`,
  `pixel-crawler-terms`, D-43, to judge fidelity.
- `/home/user/loop` git, `assets/pixel-crawler/Terms.txt` at 8072ce6 — to verify the fact's source.
- `.the-way/product-guidelines/testing/SKILL.md` and `template.md` § "Writing the file" — to see
  whether the cycle author may write the testing guidelines (it may).
- `src/browser/view/account-card.tsx:615-660`, `scripts/kitchen-sink.mjs`, `src/browser/tokens.css`
  (`--page`, `--panel`, `--space-l`) — callers and values the CSS change relies on.
- `reports/compose/compose.py` and `evidence/oneoff_container_sprites.py` of the cycle record — run
  as checks.

## Searches not found or unclear

- "the pack" in D-273 has no antecedent in the entry (I1).
- The task's line numbers in `guidelines/testing.md` had moved (task 48544f0 → head); found by
  content: :10, :149-150, :175-186, :377-378.
- `git log -- assets/pixel-crawler/Terms.txt` in `/home/user/loop` shows one commit, 8072ce6, whose
  message speaks of a skill branch, not of the pack; the file stands there as quoted, so the frozen
  address holds — noted only because the author calls it "the commit that last changed the file".
