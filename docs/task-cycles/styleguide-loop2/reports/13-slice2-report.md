# Report 13 — slice 2: Geist fonts in the product's files, copied at build and into the image

- **Status:** done with concerns
- **Executor:** general-purpose agent, claude-opus-5-5, skill `the-way-make-change` (`.the-way/task-cycle/change/SKILL.md` at `f0b2130`)
- **Worktree and branch:** `C:\Storage\repos\loop2-wt\styleguide-loop2`, `task/styleguide-loop2`
- **Base → head:** `d190e10dbe46b0fb1c7df83325c79665e4e4bf59` → `396895f49bba17faca820898bd826b4dc9eac27b` (one commit, not pushed; author `<private address>`)

## What was read

Handoff 13; `task.md` whole; `spec.md` whole (Decisions 2, 3, 7, 9); `plan.md` whole (Slice 2, *Foundation
entries*, the pattern table); `cycle.md` whole (questions table); `AGENTS.md`;
`.the-way/product-guidelines/reading.md`; "Reading the foundation" of
`.the-way/elements/common/way_of_working.md`. Guidelines selected by the headers: `guidelines/coding.md`
(*Applies to* covers build-tools, deployment, browser-view) and `guidelines/styleguide-browser-view.md`
(browser-view, `assets/fonts/**`), both whole; no kind row matches (`scripts/build.mjs` is building, a
deferred kind under D-28). Foundation: `foundations/decisions.md` whole (D-01..D-47; D-46, D-27, D-06, D-28,
D-32, D-05, D-14 bear on this slice), `foundations/part_map.md` whole, invariants `application-build-output`,
`application-package-layout`, `application-build-layout`, `icon-file-content`, `icon-credits`,
`loop2-container-icons`, `prettier-source-format`, fact `geist-licence`. Every changed file whole before the
change (`scripts/build.mjs`, `Dockerfile`, `.dockerignore`, `.gitattributes`, `README.md`), and the plan's
*Read* tests (`tests/deploy/test_loop2_image_icons.py`, `tests/invariants/test_loop2_container_icons.py`,
`tests/quality/test_quality_invariants.py`) plus `tests/invariants/test_application_build_output.py` and
`TreeCopy` of `tests/invariants/loop2_invariant_support.py`.

## Files changed

| File | Added | Removed |
|---|---|---|
| `.dockerignore` | 1 | 0 |
| `.gitattributes` | 3 | 0 |
| `Dockerfile` | 1 | 0 |
| `README.md` | 1 | 1 |
| `scripts/build.mjs` | 16 | 0 |
| `assets/fonts/OFL.txt` | 93 | 0 |
| `assets/fonts/Geist-Regular.woff2` | binary, 45224 bytes | — |
| `assets/fonts/Geist-Medium.woff2` | binary, 46496 bytes | — |
| `assets/fonts/GeistMono-Regular.woff2` | binary, 50376 bytes | — |
| `assets/fonts/GeistMono-Medium.woff2` | binary, 51508 bytes | — |

Commit: `396895f` "feat: keep the Geist fonts of release v1.8.2 in assets/fonts and copy fonts and stylesheets at build".

- `.gitattributes`: `assets/fonts/** -text`, with a comment, after the `deploy/**` line.
- `scripts/build.mjs`: copies every name ending `.css` directly in `src/browser/` into `dist/public/`, and
  every name ending `.woff2` plus `OFL.txt` directly in `assets/fonts/` into `dist/public/fonts/` (created).
- `Dockerfile`: `COPY assets/fonts/ assets/fonts/` beside the icons line; `.dockerignore`: `!assets/fonts/`.
- `README.md` "Pierwsze uruchomienie", step 3: what `npm run build` copies now (HTML, stylesheets from
  `src/browser/`, icons, Geist fonts with their licence into `dist/public/fonts`).

## Provenance of the font files (for the `@font-face` sources of Slice 3)

- Repository: https://github.com/vercel/geist-font. Newest release (GitHub API `releases`, read 2026-10-23,
  not a draft or pre-release): **`v1.8.2`**, published 2026-10-21T21:25:04Z.
- Tag `v1.8.2` → commit **`1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4`** (lightweight tag;
  `api.github.com/repos/vercel/geist-font/git/ref/tags/v1.8.2`), commit "Version Packages (#252)", 2026-10-21.
- The release publishes one asset: `geist-font-v1.8.2.zip`, download URL
  https://github.com/vercel/geist-font/releases/download/v1.8.2/geist-font-v1.8.2.zip, 8208251 bytes. GitHub's
  published digest `sha256:43ffb66912b1c49e40c371d96e86b3b3dab42db83eb2d0c8a17321210394c4c7`;
  `sha256sum` of the downloaded file: the same. `unzip -t`: no errors.
- No file has a download URL of its own; each was extracted from that zip (URL above) at the path given:

| File in `assets/fonts/` | Path in the release zip | Weight | SHA-256 |
|---|---|---|---|
| `Geist-Regular.woff2` | `geist-font/Geist/webfonts/Geist-Regular.woff2` | 400 | `47855d1c577de88e8528a628130e210be0939216f3b5383fe87b62d4295eb9de` |
| `Geist-Medium.woff2` | `geist-font/Geist/webfonts/Geist-Medium.woff2` | 500 | `865f5097d2abcee4f83bd5eb5da193437644421606d28358cd2a45e5fff0cb16` |
| `GeistMono-Regular.woff2` | `geist-font/GeistMono/webfonts/GeistMono-Regular.woff2` | 400 | `982d848655b7b0f089531e63b322361be64c143ea5532bc5304ce072f7992909` |
| `GeistMono-Medium.woff2` | `geist-font/GeistMono/webfonts/GeistMono-Medium.woff2` | 500 | `62c27300c1d7247a695fdc337f51c42d3a0021ee02e24629e58bef13a34333d7` |
| `OFL.txt` | `geist-font/OFL.txt` | — | `c683bfbcc7e087f5d37a54ef628f10387c451a83ddc459b151403a164ac46c90` |

The release has static per-weight files, so these were taken (spec Decision 3), not the variable
`Geist[wght].woff2`. Each woff2 file begins with the `wOF2` signature. `OFL.txt` reads "This Font Software is
licensed under the SIL Open Font License, Version 1.1." and "SIL OPEN FONT LICENSE Version 1.1 - 26 February
2007"; it has LF line endings.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm run build` | 0 | `dist/public/fonts/` holds the five files |
| `diff -r assets/fonts dist/public/fonts` | 0 | no difference |
| `git ls-files --eol assets/fonts` | 0 | `attr/-text` on all five lines (`i/-text w/-text` for the woff2 files, `i/lf w/lf` for `OFL.txt`) |
| `sha256sum assets/fonts/*` | 0 | each hash equals the hash of the file extracted from the release zip, table above |
| `sha256sum dist/public/fonts/*` | 0 | the same five hashes |
| `python -B .the-way/gate/run_tests.py tests/deploy` | 0 | 64 tests, OK, none skipped: a Docker daemon (29.7.2) answered, so the image tests ran (the image built with the new `COPY` and `.dockerignore` lines) |
| `python -B .the-way/gate/run_tests.py tests/quality` | 0 | 27 tests, OK, none skipped (Prettier on `scripts/build.mjs`, ESLint, Ruff, ShellCheck, audit) |
| `python -B -m unittest discover -s tests/invariants -p "test_application_build_output.py"` | 0 | 3 tests, OK |
| `python -B -m unittest discover -s tests/invariants -p "test_loop2_container_icons.py"` (test of the changed `Dockerfile`, beyond the plan's list) | 0 | 1 test, OK, not skipped |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore scripts/build.mjs` | 0 | formatted |
| `python -B .the-way/elements/common/foundation_check.py` (after the commit) | 1 | 10 errors, exactly the patterns the plan's table leaves after Slice 2: `src/browser/*.css`, `src/browser/kitchen-sink/**`, `tests/invariants/test_browser_view_token_values.py`, `tests/invariants/test_browser_view_focus_outline.py`, `tests/invariants/test_design_token_contrast.py`, `tests/invariants/test_design_token_sources.py`, `tsconfig.kitchen-sink.json`, `tests/invariants/test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs`, `src/browser/AGENTS.md`; the two `assets/fonts/**` errors (*Files* and *Trust boundary* of `browser-view`) are gone |

The `tests/deploy`, `tests/quality` and `test_application_build_output.py` runs and the first
`foundation_check.py` run were made with the change staged, before the commit; the working tree did not
change between staging and the commit (`git status --short` empty after it). `foundation_check.py`,
`test_loop2_container_icons.py` and the checks below ran on the committed head.

No test was written first: the slice is files from outside, build wiring and configuration (section 2, "where
you cannot"); no invariant's test is new or changed. The full suite (`npm test`) was not run — it is the
cycle's run before the request.

## Own-work check (section 3)

1. **Requirement most likely missed:** spec Decision 3 / plan Slice 2, "the working tree, `dist/public/fonts/`
   and the image hold the release's bytes" on a checkout with `core.autocrlf=true` — `OFL.txt` is text and
   would be turned to CRLF without the attribute. **Check:** `git -c core.autocrlf=true clone --branch
   task/styleguide-loop2 <worktree> clone-check` into the scratchpad, then `sha256sum assets/fonts/*` and
   `od -c` there. **Showed:** all five hashes equal the release's; `OFL.txt` keeps `\n`, while `README.md` in
   the same clone has `\r\n` (positive control: the conversion was active).
2. **The image serves the fonts** (no repository test covers it — spec non-goal): a one-off script
   (`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\1d1a68d6-a4ef-4c40-a07f-c510f1f4e29e\scratchpad\container_fonts_check.py`)
   built the image from the worktree, ran it and GET `/fonts/<name>` for each file from inside the
   container: exit 0; each 200, `font/woff2` (licence `text/plain; charset=utf-8`), the same bytes as
   `assets/fonts/`. Container and image removed.
3. **The stylesheet copy, which copies nothing yet** (plan C7): a temporary probe — `src/browser/zz-probe.css`
   (with a CRLF), `src/browser/view/zz-nested.css`, `src/browser/zz-probe.txt` — then `npm run build` exit 0:
   `cmp src/browser/zz-probe.css dist/public/zz-probe.css` exit 0, no nested or `.txt` file copied. The probe
   files were removed and the build rerun (exit 0) before the commit.
4. **What the `Dockerfile` line guards:** with `assets/fonts/` moved aside, `npm run build` exits 1 (`readdir`
   fails), so an image built without the `COPY`/`.dockerignore` lines fails at `npm run build`, as spec
   Decision 3 says; restored, exit 0.

User-interface screenshot check (WAY-219): not applicable — no screen changes in this slice; fonts are not
yet referenced by any stylesheet (Slice 3).

Mutations in my head: a wrong font filter (`.woff`) or a missing licence copy fails `diff -r`; a font copy
into `dist/public/` instead of `fonts/` fails `diff -r`; a dropped `COPY` line fails the image build of
`tests/deploy`. Left unprotected until Slice 3: the stylesheet copy — no test in the repository yet, only the
probe above; Slice 3's check "`dist/public/tokens.css` exists" is the first to catch its loss.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The release's published asset — the zip — as the source of the bytes; its digest checked against GitHub's | the same paths from the repository tree at the tag commit (`fonts/Geist/webfonts/…`, raw.githubusercontent.com) | see concern 1: the tree's files are other bytes; replacing them is five files and the Slice 3 sources |
| Font copy filtered to `*.woff2` and `OFL.txt` by name | copying every file of `assets/fonts/` | a stray file added there would not reach `dist/public/fonts`; `diff -r` would then flag it in review |
| The comment line above `assets/fonts/** -text` | the bare attribute line | none |
| Commit type `feat:` | `build:` | none |

No adaptation of section 4: the plan's paths and names matched the code.

## Concerns for the next dispatch

1. **The repository tree at the tag holds other font bytes than the release zip.** At commit `1d6dfdb`,
   `fonts/Geist/webfonts/Geist-Regular.woff2` is 45228 bytes (zip: 45224), `Geist-Medium.woff2` 46464 (zip:
   46496), `GeistMono-Regular.woff2` 50764 (zip: 50376), `GeistMono-Medium.woff2` 51864 (zip: 51508); the
   same tree bytes stand in `packages/next/dist/fonts/` (the npm package's files). `OFL.txt` is 4383 bytes in
   both. I took the zip, the one file the release publishes. Slice 3's `Source:` comments should name the
   release asset (`geist-font-v1.8.2.zip` of release `v1.8.2`, commit `1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4`),
   not a path of the repository tree. Recommended answer: keep the zip's files.
2. **"Each file's download URL"** (handoff, step-4 answer): no file has its own URL; the report gives the zip's
   URL with each file's path inside it. Recommended answer: accept this as the recorded provenance.
3. **`geist-licence` cites the readme at commit `d1d9ce6…`**, not the release's commit `1d6dfdb`; the
   shipped `OFL.txt` states OFL 1.1 as the fact does. No change made; whether the fact should cite the
   release's commit is the foundation's to decide (`the-way-record-environment-fact`), not this slice's.
4. **Docker answered here**, so `tests/deploy` and `test_loop2_container_icons.py` ran instead of skipping;
   no font-serving test exists in the repository (spec non-goal), only my one-off check above.
