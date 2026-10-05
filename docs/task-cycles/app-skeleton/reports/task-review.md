# Task 1 review — spec compliance and code quality

## Dispatch prompt

> Review Task1 spec compliance AND quality in C:/Storage/repos/loop2-skeleton. User delegates workflow decisions to root; questions root, stage ends at review report. No code/git mutations, no subagents. Use Superpowers6.4.1 subagent-driven-development/task-reviewer-prompt.md at C:/Users/Mariusz/.claude/plugins/cache/claude-plugins-official/superpowers/6.4.1/skills/. Read local AGENTS and required review playbook (Obsidian rulebook before vault reads). Inputs in .superpowers/sdd/2026-10-05-app-skeleton/: task-1-brief.md, task-1-report.md, review-3342d43..11c7cbb.diff. Range3342d43bb2bff033efa1791f2f3037020af6f5f7..11c7cbb7211b82687d449c168ca889f54ca6fab8. Read diff once no recrawl changed files unless cut off. No rerun suite; focused check only concrete unanswered doubt. Global constraints verbatim in brief section extracted from plan; also spec docs/superpowers/specs/2026-10-05-app-skeleton-design.md binding requirements. TypeScript DOM no UI framework; Express5 Node24; single npm package; API404 JSON {"error":"Not found"} for /api and descendants all methods, HEAD no body; no SPA fallback; loopback; blank page; no accounts/db/game/deployment; binding foundations unchanged. Root browser evidence .runs/task-cycles/app-skeleton/reports/browser.md and browser.json if needed. Full report .runs/task-cycles/app-skeleton/reports/task-review.md with complete dispatch prompt, evidence/anchors, checks, severity and both spec/quality verdicts. Report no more work beyond review; give concise verdict/path back.

## Spec Compliance

- ✅ **Spec compliant.** All twelve requested product paths appear in the diff. The single npm package pins Express 5.2.1, TypeScript 6.0.3, and Node 24 (`package.json:1–20`, `package-lock.json:1–20`); browser and server have separate strict configurations (`tsconfig.browser.json:1–14`, `tsconfig.server.json:1–14`). The build script compiles both parts, fails on compiler error, and copies HTML (`scripts/build.mjs:1–21`).
- The browser module creates only an empty `main` (`src/browser/main.ts:1–2`), loaded by the minimal document (`src/browser/index.html:1–11`). The application factory does not listen, handles `/api` before static files, uses the compiled module to locate `dist/public`, and has an ordinary 404 fallback (`src/server/app.ts:4–14`). The entry point listens on loopback (`src/server/main.ts:1–5`). No accounts, persistence, game mechanics, UI framework, bundler, or deployment code appears in the change.
- The HTTP tests exercise built HTML and JavaScript, API paths and methods including HEAD, ordinary 404 responses, and raw/encoded traversal using `node:http` without URL normalization (`tests/http.test.mjs:8–99`). The README explains a fresh install, commands, local address, browser check, restart behavior, and scope (`README.md:1–27`). `.gitignore:1–3` retains `.runs/` and excludes dependencies and build output.
- The implementer report records an import failure separately from TDD RED, then two failed HTTP behavior assertions after a successful build, followed by four green tests. It records `npm ci`, typecheck, build, `npm test`, error-path probes, and start/dev smoke checks. The root's separate browser report records one empty `main`, successful module load, blank view, and no browser errors (`.runs/task-cycles/app-skeleton/reports/browser.md`). These are reported execution evidence, not reruns by this reviewer.
- ⚠️ **Cannot verify from this task diff alone:** the claimed unchanged state of binding foundations; the controller should check the branch-wide diff before merge. The browser observation is external to the code diff and is supported by the root's browser report cited above.

## Strengths

- `src/server/app.ts:4–14` keeps construction and process startup separate and places API handling before static serving, which makes routing behavior testable without binding port 3000.
- `tests/http.test.mjs:18–37` uses an ephemeral loopback port and constructs the app while the working directory is elsewhere, directly testing the module-relative static root and closing the listener.
- `tests/http.test.mjs:67–99` checks both response status and content for missing routes and traversal probes, so an accidental HTML fallback or source-file exposure would be visible.
- `scripts/build.mjs:8–21` uses the local compiler through Node, checks each exit status, and does not copy HTML in typecheck mode.

## Issues

### Critical (Must Fix)

None.

### Important (Should Fix)

None.

### Minor (Nice to Have)

None. No polish suggestion merits another review cycle for this small task.

## Assessment

**Task quality: Approved.** The implementation matches the requested boundaries, keeps responsibilities small, and tests the actual HTTP contract. No code or Git state was changed during this review; no test suite was rerun because the existing run evidence answers the behavior questions raised by the diff. The tool display truncated the middle of the generated lockfile, but its root pins were visible and the implementer's successful `npm ci` is specific evidence of lockfile reproducibility.
