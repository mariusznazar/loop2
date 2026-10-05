# Autonomous choices for request review

All choices below are provisional orchestrator choices under the invoked task cycle. None is human approval of a foundation entry. The task branch itself follows the user's explicit instruction.

| Choice | Why; alternative | Cost if wrong |
|---|---|---|
| Separate task branch and sibling isolated worktree from origin/main | User expressly required a separate branch; main already carries correct process pin | Extra local worktree storage; retained for PR fixes |
| Source-only foundation route; binding files unchanged | Task/source-only template does not assign projected-entry transcription; return proposals still assessed | Human must settle proposed foundation separately; existing empty-map failure remains visible |
| One npm package/lockfile, two TypeScript compiler configurations, Node copy of HTML | Smallest complete skeleton; rejected Vite/workspaces | Manual tooling migration when native modules stop meeting needs |
| Native ESM, ES2022, NodeNext; browser DOM types and server Node types isolated | Separate runtime environments and emitted imports | Future relative imports need correct JavaScript extension; no bundler conveniences |
| Fixed 127.0.0.1:3000; dev builds then serves, manual restart | No requested live reload or configuration feature | Occupied port must be freed; changes need restart |
| JSON404 error fallback for /api and descendants across ordinary HTTP methods; HEAD no body; ordinary404 elsewhere | Preserves API/page separation and avoids invented routes | Future API error shape or client routing may need deliberate revision |
| Exact TypeScript6.0.3 rather than latest7.0.2 | Classic compiler can run via Node without native platform dependencies | Compiler major upgrade deferred |
| Exact Node24 types24.19.0 instead of planner's24.19.1 | Latest patch was newer than local npm release-age policy; policy not overridden | Latest type patch deferred; no used API relies on it |
| One integrated implementation unit; fresh task and final reviewers | Parts only form a runnable product together | Review sees configuration, page and HTTP together |
| Require assertion-level TDD RED after compilable setup | Missing compiled-module import was only setup failure | One extra setup build; genuine behavioral evidence gained |
| Nonrecursive rmdir for test-owned empty directory; preserve SDD scratch/worktree | No recursive cleanup required; retain record before any cleanup | Unexpected directory contents cause visible cleanup failure; local scratch storage retained |
| Raw HTTP paths for traversal; real Chromium DOM/module/errors and screenshot check via existing local Playwright | URL normalization or blank pixels alone cannot prove behavior; CUA unavailable | Browser check uses local tool installation; no added product dependency; other browsers/POSIX unchecked |
| Handle Express listen error and add subprocess regression | Final reviewer reproduced false readiness/exit0 with occupied port; original plan code was wrong | Small process test/cleanup cost; no extra configuration feature |
| Startup regression tolerates another existing listener without closing it | A running dev server should be valid occupied-port stimulus | If that listener disappears during the test, the bounded subprocess test can fail visibly |
| Preserve manual build output instead of deleting dist recursively | Current skeleton has no source rename/deletion | Future renamed/removed public artifacts need cleanup decision before release |
| Keep exclusions and untested environments explicit | Accounts/database/game/deployment, watcher/configurable port, dependency-source audit, other engines/OS, local malicious links, proxy/upgrades not assessed implementation | No assurance for those cases; ordinary HTTP and implemented local workflow checked |
| Return proposal: one build decision, five responsibility parts, six invariant sentences, methodsTODO | Durable observed boundaries; separate layout/build-output/typecheck plus API/static/fallback; independent critique fixed missing compilation clause | Six future methods and five human failure assessments; overconstraint can be rejected at review |
| No glossary term or environment fact proposed | No special product meaning or externally grounded bound asserted | Future claims using standards/support policy need new sourced entries |

Panel recommendations and human-only questions are carried in the panel settlements and the full Polish proposal. Original assessed proposal bytes remain available; no automated pass or approval is inferred from those recommendations.
