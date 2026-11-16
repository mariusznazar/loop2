PASS 7c0fda9fccd8c64c70f847a1876b15b59cdd07f3

# Review of slice 1 — the kitchen-sink page bundled by its build step

- Range: `d850f76063c1f7a302b89d0b89e1fca72682be6d..7c0fda9f` (two commits: `e3a58f45` foundation entries, `7c0fda9f` the slice). `git rev-parse HEAD` = `7c0fda9fccd8c64c70f847a1876b15b59cdd07f3`, the head given. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink.
- Method: `.the-way/task-cycle/review/SKILL.md`, review of a slice.

## Findings

### Critical

None.

### Important

None.

### Minor

**M1 — D-276 *Rejected* still prices a rejected way "in both forms of the control".**
`foundations/decisions.md:4899` (D-276, *Rejected*): "real tabs with arrow keys and activation by Enter — keyboard handling written by hand in both forms of the control (D-265) and its tests". The commit `e3a58f45` changed D-276's *Verification* from "both forms" to "the React form", and D-265 now says each shared control has one form, but this sentence in the same entry still says the control has two forms. A reader of D-276 alone would take the shared button to have a DOM form too, which D-265 as changed denies. The decision's statement is unaffected, so this is Minor. Evidence: the foundation agent named it itself (`reports/foundation-entries-report.md`, "Entries the search found that the plan does not list") and left it, since the plan's row 8 names only *Verification*. Fix: "keyboard handling written by hand in the control (D-265) and its tests", through `the-way-record-decision`, in the return step or a later slice.

**M2 — D-264 *Rationale* still speaks of "the screens still in DOM".**
`foundations/decisions.md:1252` (D-264, *Rationale*): "the cases that walk the page also build the screens still in DOM, so what stands in for the model has to carry those too". Once slices 8–10 draw the start page in React, no screen is built in DOM. The sentence gives the reason the harness carries a DOM stand-in, and that reason no longer holds. Minor, because the binding sentences and *Verification* of D-264 still hold. The foundation agent reported it and left it. Better settled in the return step, after slices 8–10, than now.

## Checks against the handoff's points

1. **`scripts/kitchen-sink.mjs`, the lines that serve files.** `git diff d850f760..7c0fda9f -- scripts/kitchen-sink.mjs` has three hunks: the `import { build } from "esbuild"` line, the header comment plus the new constant `staging`, and the build lines (the compile's failure branches, then the esbuild call in `try/finally`). The constants `out` (`scripts/kitchen-sink.mjs:17`) and `host` (`:20`), `buildOnly`, the `if (!buildOnly)` block (`:64-81`, `express.static(fileURLToPath(out))`, `app.listen(0, host)`) and `openInBrowser` (`:84-98`) fall in no hunk, so they stand exactly as at `d850f760`. `staging` is `new URL("staging/", out)` and is removed before the server block runs, on every path. `scripts/build.mjs`, `scripts/static-files.mjs`, `package.json`, `package-lock.json`, `src/browser/kitchen-sink/`, `tsconfig.browser.json` and `tests/` are unchanged in the range (`git diff --quiet … -- <those paths>`, exit 0).
2. **Crafted request paths at the running preview server.** I started the script in a worktree of the head (`node scripts/kitchen-sink.mjs`, which is what `npm run kitchen-sink` runs). PATH was limited to node's directory so that `openInBrowser` found no `cmd` and opened no browser; that launch failure is the swallowed error the script allows. The system picked port 59305. Each path below was sent with `curl --path-as-is`:
   - `/` → 200, the page's `index.html`
   - `/kitchen-sink/kitchen-sink.js` → 200, the bundle
   - `/..%2f..%2fpackage.json`, `/%2e%2e/package.json`, `/%2e%2e/%2e%2e/package.json`, `/kitchen-sink/../../package.json`, `/../package.json`, `/..%5c..%5cpackage.json`, `/%2e%2e%5c%2e%2e%5cpackage.json`, `/....//....//package.json`, `/kitchen-sink/..%2f..%2f..%2fpackage.json` → 404 each
   - null byte: `/index.html%00.css`, `/kitchen-sink.css%00`, `/%00` → 404 each
   - sprites: `/assets/sprites/fire.png`, `/sprites/fire.png`, `/../assets/sprites/fire.png`, `/..%2f..%2fassets%2fsprites%2ffire.png` → 404 each
   - the staging and compiled modules: `/staging/kitchen-sink/kitchen-sink.js`, `/view/controls/button.js` → 404 each
   - absolute paths: `/c-drive/Windows/win.ini`, `/%2fC:%2fWindows%2fwin.ini`, `//etc/passwd` → 404 each

   Nothing outside `dist/kitchen-sink/` was served. `Get-NetTCPConnection -LocalPort 59305 -State Listen` showed only `127.0.0.1`. A request to the machine's other IPv4 address (172.27.192.1:59305) and one to `[::1]:59305` were both refused. The server was stopped afterwards (port no longer listening).
3. **What the command writes.** All three runs below were in the review worktree. Before and after each run I took a listing of every file outside `node_modules/`, `.git/` and `dist/kitchen-sink/`, with size and modification time, and compared the two.
   - A successful `npm run kitchen-sink -- --build-only` exited 0 and changed no file outside `dist/kitchen-sink/`. `dist/` then held only `dist/kitchen-sink/` with `fonts/` (4 woff2 + `OFL.txt`), `icons/` (17 svg), `index.html`, `kitchen-sink.css`, `styles.css`, `tokens.css` and `kitchen-sink/kitchen-sink.js`. There was no `staging/`, no compiled module, and no `sprites/` or any PNG. The bundle holds the marker once and has no `import` or `require(` line, so it is self-contained.
   - Failed esbuild run: I appended `// @ts-ignore` + `import "review-missing-package";` to the page's module. The run exited 1 with esbuild's resolve error, changed nothing outside, and left `dist/kitchen-sink/` empty, without `staging/`.
   - Failed compile: I appended a TS2322 error. The run exited 1, changed nothing outside, and left no `dist/` at all.

   Both temporary edits were reverted with `git checkout` in the review worktree. The script copies nothing from `assets/sprites/`: it calls `copyStaticFiles` only, never `copySpriteFiles` (`scripts/static-files.mjs:6-30`) (D-273).
4. **The nine foundation entries (`e3a58f45`).** Each was checked against the task's *Settlements to record*, its questions and the spec's *Foundation entries*.
   - **D-269** (`foundations/decisions.md:4062-4092`) carries settlement 1 (question 1 a): bundled as the game's code is bundled, React forms shown, a change made in the build step and never in the lines that serve files. *Rejected* is question 1 b. *Based on* `browser-bare-import-resolution` was weighed and kept, and the rationale grounds the bundler on it. Against the script, the statement "the compiler emitting the page's modules and esbuild joining them into the one file the page loads (D-263, D-266)" is what `scripts/kitchen-sink.mjs:24-55` does. Its *violates* clauses (lines that serve files or open the browser changed; bundle or compiler output outside `dist/kitchen-sink/`) are not hit, by points 1 and 3. Its first clause, "holds React … shows each shared control in its React form", is not yet true at this head; see Declined to judge.
   - **D-265** carries settlement 2 (question 3 b): one form; a panel built outside React reading the tag, classes and role from one constant. *Rejected* gives question 3 a, question 3 c and question 1 b. "styles.css stays the one place" is kept, as the task says.
   - **D-407**'s first paragraph carries settlement 3 (question 2 a). Its second paragraph is the cycle's precision of spec Decision 1, written apart from the settlement as the spec asks. *Rejected* gains question 2 b; question 2 c was already there. I found no sentence that says more than its source.
   - **D-03** loses the exception. **D-323** gains To do 4. **D-44, D-275, D-276** change their *Verification* wording. **D-381** has its rationale refreshed. Each says what the plan's row and the spec give.

   `python -B .the-way/elements/common/foundation_check.py` exited 1 with exactly 39 errors, all in `tests/view/react-controls.test.mjs` (the known state), and no other error.
5. **The slice against its *Goal* and spec Decision 4.** `tsconfig.kitchen-sink.json` takes `*.ts` and `*.tsx` and emits into `dist/kitchen-sink/staging`. esbuild runs with `bundle: true`, `format: "esm"`, `platform: "browser"`, `target: "es2022"` (as `scripts/build.mjs:48`), `minify: false` and `define: { "process.env.NODE_ENV": '"development"' }`. Its output is `dist/kitchen-sink/kitchen-sink/kitchen-sink.js`, the path `index.html` and the invariant test name. The staging directory is removed in `finally` and on both failure branches of the compile, and the copies follow as before. The executor's choice to keep `outDir` in the tsconfig (so that a bare `tsc -p tsconfig.kitchen-sink.json` cannot write to `dist/browser`) falls within "left to the maker" and is sound.
   - Real browser: Playwright MCP opened `http://127.0.0.1:59305/`. The page title was „Loop — strona wszystkich stanów”, with 60 buttons and 5 sections, the body marker `loop2-kitchen-sink-page`, and one module script `/kitchen-sink/kitchen-sink.js`. The h2 headings were „Wspólne kontrolki w stanach”, „Formularze czekające na serwer”, „„Konto” z niepotwierdzonym adresem: część z postaci DOM kontrolek, bez Reacta”, „Role” and „Próbki kafelków”, so the page still draws the DOM forms, as the slice requires.
   - Console at level warning and above: one entry, `Failed to load resource … 404` for `/favicon.ico`, which `loop2-play` names as ordinary. No other error and no warning.

   Reserved choice: none taken. esbuild is settled by D-263, and no dependency is added.

Guidelines (`guidelines/coding.md`, read whole): the rules the change reaches are the linter (eslint passes, no suppression), the formatter (prettier passes) and the recording of a failure. For the last, an esbuild error is re-thrown after the `finally` and a compile error exits with tsc's status. This is a developer script that touches no account data, so the default Node report satisfies the rule. Hiding a failure: nothing is swallowed except the browser launch, which was already allowed before the slice.

Author's own-work check: the executor chose "nothing outside `dist/kitchen-sink/`, a failed run included" and "no staging left", which is where the slice is weakest. Its check covered the failed compile only. I added the failed-esbuild path (point 3), and it holds.

Changed invariant test: none.

## Declined to judge

- D-269's clause "holds React: it shows each shared control in its React form" is false at this head: the page still draws the DOM forms, and slice 1 is required to keep them. The plan sequences it this way (the entry serves slices 1, 2 and 13; slice 2 draws the page in React). Its agreement with the code belongs to the review of the whole change.
- D-265 ("one form"), D-407 (three rows of sentences as roots), D-03 (no exception), D-323 (sentence alone at the waiting screen), D-381 (rationale) and the *Verification* changes of D-44, D-275 and D-276 describe states that slices 5 and 8–12 build. They were judged here against their sources, not against code that does not exist yet.
- `guidelines/coding-browser-module.md:214` ("Skrypt `scripts/kitchen-sink.mjs` nie składa paczki…") is stale from this slice on. Slice 13 changes the guidelines through `the-way-maintain-coding-guidelines`, and the slice's *Change* does not include that file.
- The comments esbuild writes into the bundle name the staging paths (`// dist/kitchen-sink/staging/sim/data/resources.js`). They are harmless comments in a developer page's bundle, with no effect on behaviour.

## Checks run

| Check | Command or method | Exit code or result |
|---|---|---|
| invariant test | `npm test -- tests/invariants/test_application_build_kitchen_sink.py` (reviewed worktree; the test works in its own tree copy) | 0 — 3 tests OK |
| build only | `npm run kitchen-sink -- --build-only` in the review worktree, then listing of `dist/` | 0; listing as in point 3 |
| writes nothing outside, success | listing of files outside `node_modules/`, `.git/` and `dist/kitchen-sink/` (path, size, mtime) compared before and after | identical |
| failed esbuild run | unresolvable import added under `// @ts-ignore`, same build, same comparison | 1; nothing outside changed; no `staging/` |
| failed compile | TS2322 error added, same build, same comparison | 1; nothing outside changed; no `dist/` |
| untouched files | `git diff --quiet d850f760..7c0fda9f -- scripts/build.mjs scripts/static-files.mjs package.json package-lock.json src/browser/kitchen-sink tsconfig.browser.json tests` | 0 |
| lint | `npx eslint scripts/kitchen-sink.mjs` | 0 |
| format | `npx prettier --check scripts/kitchen-sink.mjs tsconfig.kitchen-sink.json` | 0 |
| foundation check | `python -B .the-way/elements/common/foundation_check.py` | 1 — 39 errors, all `tests/view/react-controls.test.mjs` (known state); none else |
| crafted paths | running server, `curl --path-as-is`, 23 paths | as in point 2: only `/` and the bundle 200, everything else 404 |
| bind address | `Get-NetTCPConnection -LocalPort 59305 -State Listen`; requests to 172.27.192.1 and `[::1]` | only 127.0.0.1; both refused |
| real browser | Playwright MCP, page opened, DOM counted, console read at level warning | page drawn, console: favicon 404 only |

Not run: the whole `npm test`, which is the orchestrator's.

## Reaches beyond the dispatch

- `tests/invariants/test_cross_part_imports.py:1-90`: it maps `dist/kitchen-sink/` to sources, and I checked that the new staging layout does not break it (it reads imports in tracked files only).
- `foundations/decisions.md:1250-1254` (D-264 *Rationale*) and `:2831-2835`, `:4895-4903` (D-259, D-276 *Rejected*): found by a search for "both forms", "DOM form", "two forms" and "screens still in DOM" after the foundation commit, to see what still speaks of two forms. This gives M1 and M2.
- `README.md:76` and the grep of `kitchen-sink.mjs`, `dist/kitchen-sink`, `bundles nothing` and `one by one` over the repository: to find text the slice makes stale. Only `guidelines/coding-browser-module.md:214` was found (Declined to judge).
- `guidelines/testing.md:179`, the row for `scripts/kitchen-sink.mjs`, seen through the same grep.

## Working copies

- `.runs/review-slice-1/` held a detached worktree of `7c0fda9f` at `.runs/review-slice-1/wt`, with `node_modules` as a junction to the reviewed worktree's `node_modules`. It also held the snapshot listings, the server log, the build logs, the word diff of `decisions.md` and the invariant test's log. The junction was removed first with `rmdir`; the reviewed worktree's `node_modules` was checked intact afterwards (268 entries, `esbuild` present). Then I ran `git worktree remove --force` and `git worktree prune`, and removed the directory. No remainder.
- The preview server (process 9996, port 59305) was stopped.
- Playwright MCP wrote its session files to the main checkout's root, as `the main checkout's .playwright-mcp/console-2026-11-16T06-57-26-869Z.log` and `page-2026-11-16T06-57-27-052Z.yml`. Both were deleted, along with the then-empty directory. The browser was closed. No screenshot was taken.
- Departures from the cycle's rule on working copies, each removed at once: the curl response body went to Git Bash's `/tmp/r.bin` (system temp), and the foundation check's output went to the session scratchpad as `fc.log`. Both files are deleted.
- The reviewed worktree is unchanged (`git status --short` empty).

## Unread material

- `.claude/skills/loop2-play/SKILL.md`, `guidelines/coding.md`, `scripts/build.mjs`, `scripts/static-files.mjs`, `tests/invariants/test_application_build_kitchen_sink.py`, the two authors' reports, the spec and the task: read whole. Of the plan: the *Foundation entries* table and slice 1 (as copied in the handoff). The other slices were read only by heading.
- Decisions read whole: D-45, D-76, D-263, D-266, D-269, D-273. The changed decisions D-03, D-44, D-265, D-275, D-276, D-323, D-381 and D-407 were read through the full word diff of the range, not as whole entries from the file. Of D-276, *Verification* and *Rejected* were read; its statement was not.
- Invariants `application-build-kitchen-sink` and `preview-server-access`, and part map `build-tools`: read whole.
- Named in the handoff's current ranges but not read, because none bears on slice 1: D-36, D-43, D-47, D-96, D-97, D-156, D-157, D-207 to D-211, D-225, D-253, D-261, D-262, D-264 (except its rationale lines 1250-1254), D-267, D-274, D-280, D-286, D-288, D-289, D-395, D-402; invariants `browser-view-focus-outline`, `browser-view-token-values`, `browser-view-framework`, `uncaught-failure-game-state`.
- `guidelines/testing.md`: not read beyond its line 179. No test is written or changed in the range.

## Searches not found or unclear

- The foundation agent's report places the stale "both forms" sentence in D-276 *Rejected*. It is there (`foundations/decisions.md:4899`). The search's other hit, "two forms" at `:2833` (D-259 *Rationale*), means the two forms of the login card (sign-in and register), not the controls, and is no finding.
- None else.
