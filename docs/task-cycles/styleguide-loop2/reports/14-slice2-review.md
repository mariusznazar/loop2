PASS 396895f49bba17faca820898bd826b4dc9eac27b

# Review 14 — slice 2: Geist fonts in the product's files, copied at build and into the image

- **Reviewer:** fresh general-purpose agent, claude-opus-5-5, skill `the-way-review-change` (`.the-way/task-cycle/review/SKILL.md` at `f0b2130`); did not make the change
- **Range:** `d190e10dbe46b0fb1c7df83325c79665e4e4bf59..396895f49bba17faca820898bd826b4dc9eac27b` (one commit, `396895f`, author `<private address>`); `git rev-parse HEAD` in the worktree = the given head
- **Read:** handoff 14; `task.md`, `spec.md`, `plan.md` (Slice 2, *Foundation entries*, pattern table, C7), `reports/13-slice2-report.md`, `cycle.md` (questions table, S2-1..S2-3), all whole; `AGENTS.md`; `.the-way/product-guidelines/reading.md`; "Reading the foundation" of `.the-way/elements/common/way_of_working.md`. Guidelines selected by header: `guidelines/coding.md` (Applies to: browser-view, build-tools, deployment …) and `guidelines/styleguide-browser-view.md` (browser-view), both whole; no kind row matches (`scripts/build.mjs` is building, a deferred kind under D-28; no browser module changes). Foundation: `foundations/decisions.md` whole (D-01..D-47; bearing here D-05, D-06, D-14, D-27, D-28, D-32, D-46), `foundations/part_map.md` whole, invariants `application-build-output`, `application-package-layout`, `application-build-layout`, `icon-file-content`, `icon-credits`, `loop2-container-icons`, `prettier-source-format`, fact `geist-licence`.
- **Trust boundary (step-4 answer):** `assets/fonts/**` of `browser-view` — checked as crafted input below; `Dockerfile`, `.dockerignore`, `.gitattributes`, `scripts/build.mjs` checked to pass and copy only what the slice says.

## Findings

### Critical

none

### Important

none

### Minor

- **M1 — `README.md:11`, "arkuszy stylów z `src/browser/`".** The build copies only the `*.css` files standing directly in `src/browser/` (`scripts/build.mjs:30-35`, `readdir` of that one directory, no recursion); my probe confirmed `src/browser/zzdir/nested.css` is not copied. The README sentence does not say "directly", so a reader can take it to include nested stylesheets — in particular `src/browser/kitchen-sink/kitchen-sink.css` of Slice 7, which must *not* reach `dist/public/` (D-45). Effect today: none (no CSS exists); it is a wording that becomes misleading once the kitchen-sink stylesheet exists. Slice 8 changes `README.md` anyway (plan, Slice 8 *Change*); saying "bezpośrednio w `src/browser/`" there closes it.
- **M2 — no test of the repository fails if the build stops copying the fonts.** `scripts/build.mjs:36-44` copies the fonts into `dist/public/fonts/`; nothing in `npm test` reads `dist/public/fonts/` (the deploy tests check icons only; `test_application_build_output.py` checks compilation). D-46's *Verification* is review-only and the spec lists a container font check as a non-goal, so this is the foundation's own choice, not a defect of the slice; recorded so the whole-change review can weigh it. The stylesheet copy is likewise untested until Slice 3's check "`dist/public/tokens.css` exists" (plan C7, mandated).

### Out of scope

none

## Verification of the slice's claims

- **Release and provenance (trust boundary).** GitHub API, read now: `/releases/latest` → `v1.8.2`; releases list: `v1.8.2` published 2026-10-21T21:25:04Z, not draft or pre-release, newest by date and version; one asset `geist-font-v1.8.2.zip`, 8208251 bytes, published digest `sha256:43ffb669…94c4c7`. `git/ref/tags/v1.8.2` → commit `1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4`. I downloaded the zip myself: `sha256sum` equals the published digest. Extracted `geist-font/Geist/webfonts/Geist-{Regular,Medium}.woff2`, `geist-font/GeistMono/webfonts/GeistMono-{Regular,Medium}.woff2`, `geist-font/OFL.txt`: `cmp` with each file of `assets/fonts/` exit 0, and the committed blobs (`git show 396895f:assets/fonts/<f> | sha256sum`) give the same five hashes as the executor's table. The release has static per-weight files, so taking them rather than `Geist[wght].woff2` follows spec Decision 3. S2-1 and S2-2 (zip files kept; zip URL plus in-zip path as the record) are met.
- **The files hold nothing else.** `assets/fonts/` holds exactly the five files. Each woff2 parses as a WOFF2 header: signature `wOF2`, flavour `0x00010000` (TrueType), declared length = file size, 18 tables, metadata length 0, private-data length 0. `OFL.txt` is 4383 bytes of printable ASCII and LF only, opens "Copyright 2024 The Geist Project Authors" and "This Font Software is licensed under the SIL Open Font License, Version 1.1." Its trailing space at line 21 (`git diff --check` reports it) is the release's byte, required by "byte for byte".
- **`.gitattributes`.** `assets/fonts/** -text` stands after `deploy/**`; no later pattern of the file matches `assets/fonts/` (every later line is scoped to `src/`, `scripts/`, `tests/…` or a named root file), so the attribute holds: `git check-attr` → `text: unset`; `git ls-files --eol assets/fonts` → `attr/-text` on all five lines. A clone with `core.autocrlf=true` keeps all five hashes; `OFL.txt` there has 0 CRLF of 92 newlines while `README.md` in the same clone has 73 of 73 (positive control).
- **`.dockerignore` / `Dockerfile`.** `.dockerignore` starts with `*` and re-includes exactly `!assets/fonts/` beside `!assets/icons/`; `Dockerfile` adds only `COPY assets/fonts/ assets/fonts/` in the build stage; the runtime stage copies `dist` as before. An image I built from the head served `/fonts/<name>` for each of the five files: 200, `font/woff2` (licence `text/plain; charset=utf-8`), each body's SHA-256 equal to the release's.
- **`scripts/build.mjs`.** Copies `*.css` directly in `src/browser/` into `dist/public/`, and only names ending `.woff2` plus `OFL.txt` directly in `assets/fonts/` into `dist/public/fonts/`; everything stays inside `if (!checkOnly)`. Probes in a scratch worktree: a `src/browser/zz-probe.css` with CRLF copied byte for byte; a nested `src/browser/zzdir/nested.css` not copied; a stray `assets/fonts/zz-stray.ttf` not copied (and `diff -r assets/fonts dist/public/fonts` then exits 1, so the plan's check would flag a stray file). Probes removed.
- **Author's own-work check.** The requirement it names (byte-for-byte under `core.autocrlf=true`) is the weakest point of the `.gitattributes` line, and its clone check would catch it unmet; I repeated it with the same result. Its other three checks I repeated or covered above.
- **Screens (WAY-219):** no screen changes; no stylesheet references the fonts yet.

## Declined to judge

- `geist-licence` citing the readme at `d1d9ce6` rather than the release commit — settled by S2-3 for the return step; the readme at `1d6dfdb` still reads "This Font Software is licensed under the SIL Open Font License, Version 1.1." (fetched now), so the fact holds at the release.
- `@font-face` rules, their `Source:` comments and that stylesheets load fonts from nowhere else — Slice 3; no stylesheet exists in this range.
- A footer credit for the fonts — a spec non-goal.

## Checks run

Write-producing checks ran in a separate detached worktree of `396895f` in the scratchpad (node_modules and the quality venv linked from the task worktree, `.the-way` copied at `f0b2130`), removed afterwards; the reviewed worktree, its index and branch were not changed (`git status --short` empty, HEAD `396895f` after).

| Command or manual check | Exit | Result |
|---|---|---|
| `git diff d190e10..396895f`, `git log d190e10..396895f` | 0 | one commit, 10 files = Slice 2 *Change* |
| GitHub API `releases/latest`, `releases?per_page=5`, `git/ref/tags/v1.8.2` (curl) | 0 | `v1.8.2`, `1d6dfdb6e58c0ddd841c1e24e59aef01ec3916e4`, one zip asset with digest |
| `curl` the zip; `sha256sum` | 0 | equals published digest `43ffb669…94c4c7` |
| `cmp` of five extracted zip files with `assets/fonts/*`; `git show 396895f:assets/fonts/<f> \| sha256sum` | 0 | identical; committed blobs = release bytes |
| WOFF2 header parse (Python, `struct`) | 0 | `wOF2`, TrueType flavour, length = size, no metadata or private block |
| `git check-attr -a`, `git ls-files --eol assets/fonts` | 0 | `text: unset`, `attr/-text` on 5 lines |
| `git -c core.autocrlf=true clone` + checkout of `396895f`; `sha256sum assets/fonts/*`; CRLF count | 0 | five release hashes; `OFL.txt` 0 CRLF, `README.md` 73 CRLF (positive control) |
| `npm run build` (scratch worktree) | 0 | `dist/public/fonts/` holds the five files |
| `diff -r assets/fonts dist/public/fonts` | 0 | no difference |
| probe build with `zz-probe.css`, nested css, stray `.ttf` | 0 | root CSS copied byte-exact; nested and stray not copied; `diff -r` then 1 |
| `python -B .the-way/elements/common/foundation_check.py` | 1 | 10 errors, exactly the plan table's patterns after Slice 2 (`src/browser/*.css`, `src/browser/kitchen-sink/**`, the four `browser-view` tests, `tsconfig.kitchen-sink.json`, `test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs`, `src/browser/AGENTS.md`); both `assets/fonts/**` errors gone |
| `python -B .the-way/gate/run_tests.py tests/quality` | 0 | 27 tests OK |
| `python -B -m unittest discover -s tests/invariants -p "<p>"` for `test_application_build_output.py`, `test_application_package_layout.py`, `test_icon_file_content.py`, `test_icon_credits.py`, `test_loop2_one_serving_process.py`, `test_loop2_api_error_route.py` | 0 each | OK |
| same for `test_application_build_layout.py` | 5 | no such file in the repository (invariant tested elsewhere); not a check of this slice |
| `python -B .the-way/gate/run_tests.py tests/deploy` (Docker 29.7.2 answered) | 0 | 64 tests OK, none skipped |
| `python -B -m unittest discover -s tests/invariants -p "test_loop2_container_icons.py"` | 0 | 1 test OK, not skipped |
| `docker build` of the head; `docker exec … fetch /fonts/<name>` + SHA-256, five files | 0 | 200, `font/woff2` / `text/plain`, bytes = release; container and image removed |
| `curl` readme at `1d6dfdb` | 0 | OFL 1.1 sentence present |

Not run: the full suite `npm test` — the cycle's own run before the request.
