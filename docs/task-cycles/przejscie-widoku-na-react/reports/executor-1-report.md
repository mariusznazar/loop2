# Report — executor of slice 1 (the kitchen-sink page bundled by its build step)

**Status:** done

**Commit:** `7c0fda9f` — `feat: :sparkles: bundle the kitchen-sink page with esbuild from the compiler's staged modules, as the game is bundled (D-269, D-263, D-266)`. Worktree clean afterwards (`git status --short` empty).

## Files changed

- `scripts/kitchen-sink.mjs` (+33 / -3): `import { build } from "esbuild"`; a constant `staging` (`dist/kitchen-sink/staging/`); after `tsc -p tsconfig.kitchen-sink.json` the staged entry `staging/kitchen-sink/kitchen-sink.js` is bundled by esbuild into `dist/kitchen-sink/kitchen-sink/kitchen-sink.js` (`format: "esm"`, `platform: "browser"`, `target: "es2022"`, `minify: false`, `define: { "process.env.NODE_ENV": '"development"' }`), and the staging directory is removed in a `finally` and on a failed compile. The copies of `index.html`, `kitchen-sink.css` and the static files stand as before. `out`, `host`, `buildOnly`, the `if (!buildOnly)` server block and `openInBrowser` are untouched (diff shows hunks only in the import, the header comment, the `staging` constant and the build lines).
- `tsconfig.kitchen-sink.json` (+5 / -2): `outDir` is `dist/kitchen-sink/staging`; `include` takes `src/browser/kitchen-sink/*.ts` and `*.tsx`.

## Checks (command, exit code)

- `npm test -- tests/invariants/test_application_build_kitchen_sink.py` — exit 0 (3 tests OK).
- `npm run kitchen-sink -- --build-only` — exit 0; listing of `dist/kitchen-sink/`: `fonts/`, `icons/`, `index.html`, `kitchen-sink.css`, `styles.css`, `tokens.css`, `kitchen-sink/kitchen-sink.js` and nothing else — no staging directory, no compiled module (`find dist/kitchen-sink -type f`). The bundle holds the marker `loop2-kitchen-sink-page` (grep count 1).
- `npx eslint scripts/kitchen-sink.mjs` — exit 0.
- `npx prettier --check scripts/kitchen-sink.mjs tsconfig.kitchen-sink.json` — exit 0 (after `prettier --write` of the two files).
- `npm run typecheck` — exit 0.
- `npm run kitchen-sink` (serving) and the page opened in a real browser with `playwright-cli` (0.1.22): the page drew as before (60 buttons, 5 sections, the table of shared controls in all states); the screenshot was inspected and is kept nowhere. The console held one error, `Failed to load resource … 404 (Not Found)` for `/favicon.ico` (ordinary, named as such in `loop2-play`), and Chromium's verbose DOM notes about password fields outside a form (belong to the page's own samples, not errors).
- Foundation check not run (known red until slice 12). Whole `npm test` not run (the orchestrator's alone).
- No test was written or changed, as the slice says; hence no failing run of a test written first.

## Own-work check

Requirement most likely missed: "the command writes nothing outside `dist/kitchen-sink/`, a failed run included" and "no staging directory after a run". Check: appended `export const broken: number = "x";` to `src/browser/kitchen-sink/kitchen-sink.ts`, ran `npm run kitchen-sink -- --build-only` — exit 1 with `TS2322`; `dist/kitchen-sink` did not exist afterwards (noEmitOnError emits nothing, the staging removal covers the rest); `git status` showed nothing outside the two changed files. The temporary edit was reverted with `git checkout` before the commit. Success path: the invariant test checks no file outside `dist/kitchen-sink/` changed (passed).

Mutation in my head: a wrong `NODE_ENV` define would break the page in the browser (`process is not defined`) — caught by the browser check, not by a test (the slice gives no test); a staging directory left behind is caught by my listing, not by the invariant test.

## Choices

- Staging directory `dist/kitchen-sink/staging/`, set as `outDir` in the tsconfig and mirrored by the `staging` constant in the script (comment names the pair). Rejected: passing `--outDir` from the script and dropping it from the tsconfig — a bare `tsc -p tsconfig.kitchen-sink.json` would then fall back to the extended `dist/browser`, writing outside `dist/kitchen-sink/`. Cost if wrong: two names to keep equal, in one script and one file.
- No source map (not asked, nothing reads it).
- Staging removed also on a failed compile and on an esbuild error (`finally`), so a failed run leaves only what noEmitOnError already leaves (nothing).

## Reaches beyond the handoff

None. Everything read was named in the handoff or its slice (plus `.the-way/task-cycle/change/slice.md`, which the method names for a slice).

## Unread material

- `README.md:31-35` read as lines 25-40; `foundations/part_map.md:87-121` read whole; D-45, D-76, D-263, D-266, D-273, D-269 each read from heading to the end of its range but the *Rationale* of D-76 was cut at 1500 characters of its line (the rest of that rationale line unread); spec/task passages read as the handoff gives them. Everything else named: read whole.

## Searches not found or unclear

None. (D-45's range in the handoff, `4555-4568` in the slice versus `4557-4570` in the current ranges, differed by two lines; I used the current range.)

## Working copies

`.runs/executor-1/` (log of the server, the screenshot) and `.playwright-cli/` stood in the worktree root; the preview server process was stopped, the browser session closed, `dist/kitchen-sink/` (git-ignored build output) removed, and both directories deleted. No remainder.
