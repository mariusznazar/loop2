# Final whole-branch code review

## Dispatch (verbatim)

Fresh broad whole-branch code review in C:/Storage/repos/loop2-skeleton, base3342d43bb2bff033efa1791f2f3037020af6f5f7..head11c7cbb7211b82687d449c168ca889f54ca6fab8. Use Superpowers6.4.1 requesting-code-review/SKILL.md and code-reviewer.md at C:/Users/Mariusz/.claude/plugins/cache/claude-plugins-official/superpowers/6.4.1/skills; local AGENTS and required code-review playbook. User delegates workflow choices root; boundary final review/report only, questions root, no subagents or code/git mutations. Requirements: minimal TypeScript DOM blank page (no UI lib), Express5 TypeScript onNode24 serves built files, API unknown gives APIerror notHTML, reproducible install/dev/build/typecheck with README. No account/db/game/deploy. Code diff package .superpowers/sdd/2026-10-05-app-skeleton/review-3342d43..11c7cbb.diff. Spec docs/superpowers/specs/2026-10-05-app-skeleton-design.md authoritative, plan docs/superpowers/plans/2026-10-05-app-skeleton.md argument, no deferred minors or parked findings. Execution evidence task-1-report.md in same SDD folder and .runs/task-cycles/app-skeleton/reports/browser.md + browser.json; don't rerun suite already passed unless concrete uncovered doubt warrants focused test. No need read chronology or other reviews. Judge reasonable user expectations beyond enumerated cases, list each declined-to-judge behavior with reason. Scope includes test/build/dev robustness and trust-boundary HTTP/static files. Binding foundation unchanged confirmed by root branch diff, proposals under separate assessment; don't assess uncommitted return proposals. Full report .runs/task-cycles/app-skeleton/reports/final-code-review.md with full dispatch, exact assessed range/files, strengths/findings severity anchored file:line with rationale, declined-to-judge and merge verdict for code. Return concise verdict/report. Root handles fixes/PR, never merge.

## Scope and method

Assessed range: `3342d43bb2bff033efa1791f2f3037020af6f5f7..11c7cbb7211b82687d449c168ca889f54ca6fab8`, in `C:/Storage/repos/loop2-skeleton`.

All twelve changed files assessed: `.gitignore`, `README.md`, `package-lock.json`, `package.json`, `scripts/build.mjs`, `src/browser/index.html`, `src/browser/main.ts`, `src/server/app.ts`, `src/server/main.ts`, `tests/http.test.mjs`, `tsconfig.browser.json`, `tsconfig.server.json`. Compared the supplied diff package to the actual git diff; verified no working-tree differences in these product files. Read authoritative design and frozen task, plan, local AGENTS, requesting-code-review skill and reviewer template, and required code-review playbook. Reviewed code and README separately. Did not inspect other reviewers' judgments or uncommitted foundation proposals.

Strengths acknowledged before findings: implementation keeps the requested scope small, isolates application construction from process startup, serves a module-relative public directory, and tests actual HTTP responses including raw traversal paths. Source and build files implement the requested blank DOM page without extra product features. Detailed positive anchors follow the findings.

## Critical

None found.

## Important — fix before merge

### 1. Occupied port is reported as successful startup

**Thread:** new finding.

**Anchor:** `C:/Storage/repos/loop2-skeleton/src/server/main.ts:3`.

**Do wklejenia:** Gdy port 3000 jest zajęty, proces wypisuje `Loop: http://127.0.0.1:3000` i kończy się kodem 0, choć nie uruchomił serwera. Express 5 przekazuje błąd nasłuchu do callbacka; obsłuż go przed komunikatem gotowości i zakończ proces niezerowym kodem. Dodaj sprawdzenie startu przy zajętym porcie, bo obecne testy otwierają wyłącznie aplikację na losowym wolnym porcie.

**Dlaczego to zgłaszam:** This entry point is what both npm start and npm run dev ultimately run. A developer may already have another copy of the app or a different service on the documented fixed port. Express 5.2.1's installed `node_modules/express/lib/application.js:598` wraps the final callback and registers it with `server.once('error', done)` before calling server.listen. Ignoring its error argument therefore consumes the bind error. The callback prints a ready message, stderr stays empty, the process has no listener to keep it alive, and it exits successfully. A developer can believe the new build is serving while their browser displays an older process; automation receives false success.

Focused reproduction reserved `127.0.0.1:3000` with an owned Node net.Server, then spawned existing `dist/server/main.js` with the current Node executable, captured output/exit, and closed the blocker in finally. A five-second timeout did not fire. Exact result:

```json
{"code":0,"signal":null,"stdout":"Loop: http://127.0.0.1:3000\n","stderr":""}
```

Root confirmed the port was free before the probe. No existing service was stopped, no product file changed, and no listener remained. Read error in the listen callback, report it and set a nonzero exit code before returning; print readiness only on success. A focused entry-point subprocess test should reserve the port and check nonzero exit, useful error output, and absence of the readiness message. This corrects the plan's supplied startup code based on ordinary local-use expectations, without adding a feature.

## Minor

None found. No minor finding is parked or deferred.

## Dobre / strengths

- `C:/Storage/repos/loop2-skeleton/src/server/app.ts:6`: API middleware precedes static serving and returns JSON independently of method and Accept header. The plain 404 fallback prevents unknown browser routes from silently becoming the home page.
- `C:/Storage/repos/loop2-skeleton/src/server/app.ts:9`: the public directory derives from the compiled module URL, limiting exposure to build output and removing working-directory dependence.
- `C:/Storage/repos/loop2-skeleton/tests/http.test.mjs:37`: real HTTP requests preserve traversal syntax, handle errors and timeout, and assert status, content type and body. Tests construct the app in another directory and clean up the owned listener and empty temporary directory.
- `C:/Storage/repos/loop2-skeleton/scripts/build.mjs:9`: compiler invocation uses the Node executable without shell interpolation, preserves compilation failure, and gates copying on successful compilation. Check mode uses noEmit. Source environments are strict and separate DOM/Node ambient types.
- `C:/Storage/repos/loop2-skeleton/README.md:7`: fresh-copy command order, prebuilt-start requirement, loopback address, restart-only dev behavior and DOM/module verification describe the implementation accurately.
- `C:/Storage/repos/loop2-skeleton/package-lock.json:1`: valid lockfile v3 matches exact package dependency choices. Parsed all 81 package entries: every nonroot entry has integrity metadata and every resolved package uses the public npm registry. No extra UI or deployment toolchain appears.

## Evidence and limits

Read `.superpowers/sdd/2026-10-05-app-skeleton/task-1-report.md`: successful npm ci, both typechecks, build, four HTTP tests, compiler failure probes in both source environments, failure-gated dev, successful start/dev smoke checks and cleanup are recorded. RED evidence distinguishes actual HTTP assertion failures from missing-import setup failure. These passed checks were not redundantly rerun.

Read `.runs/task-cycles/app-skeleton/reports/browser.md` and measured `.runs/task-cycles/app-skeleton/browser.json`. The JSON is in the cycle directory, not reports. It records Chromium 149, document/module status 200, one empty main, empty body text and no console/page/request errors. The report records screenshot inspection. This reviewer did not independently rerun or visually inspect that browser execution.

One new focused execution was justified and performed: the occupied-port failure above. The installed dependency source confirms its mechanism. Existing HTTP tests use createApp on port 0 and cannot catch the entry-point callback failure.

## Declined to judge

- Accounts, database/persistence, game mechanics and deployment/container behavior: explicitly excluded; no implementation here to judge.
- Automatic watching/live reload and configurable listening port: manual restart and fixed local address are explicit choices; the current workflow is assessable without these features.
- Automatic output deletion for future source renames: the plan explicitly retains outputs and this branch has no renamed/deleted source/output. Reassess when the file graph changes; this is not approval for future stale public artifacts.
- Full transitive-dependency security audit and future advisories: manifest, lock structure and relevant Express startup source were inspected, but every dependency source was not audited and no current advisory scan is claimed. The recorded zero-vulnerability result is execution evidence only.
- POSIX execution and additional browser engines: commands use cross-platform Node/npm constructs, but supplied execution evidence is Windows/Chromium; no independent POSIX or multi-engine run was performed.
- Symlink/junction injection into dist/public by a filesystem writer: no links or mutable public-upload source are introduced; judged the HTTP boundary against generated files and remote path input, not a compromised build directory.
- Proxy tunneling, malformed HTTP framing and protocol upgrades: no proxy/upgrade service is built; ordinary API HTTP methods and static requests are the application contract. This does not waive ordinary request errors.
- Foundation proposal acceptance and complete part ownership: binding foundations are unchanged, proposals receive a separate assessment, and the empty part map cannot be called a pass. This verdict covers product code only.

## Assessment

**Ready to merge: With fixes.**

The skeleton meets its functional scope with credible recorded build, HTTP and browser evidence, but its entry point falsely reports success when the fixed port is occupied. Correct that path and verify the reproduction before merging. No other code finding remains open in this review.
