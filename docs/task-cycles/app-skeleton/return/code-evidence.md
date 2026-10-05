# UNAPPROVED proposal evidence

Code commit: de3ceb36b51636464c8e5fd80980e8c9d18754ed
Real code diff base: 3342d43bb2bff033efa1791f2f3037020af6f5f7

| Proposed entry | Exact code evidence |
|---|---|
| How are the browser and server built together? | package.json:7; package-lock.json:6; tsconfig.browser.json:3; tsconfig.server.json:3; scripts/build.mjs:9 |
| application-build-layout/1 | package.json:1; package-lock.json:6; tsconfig.browser.json:10; tsconfig.server.json:10; scripts/build.mjs:18 |
| application-build-output/1 | scripts/build.mjs:9; scripts/build.mjs:10; scripts/build.mjs:18; scripts/build.mjs:20 |
| application-type-check/1 | package.json:8; scripts/build.mjs:7; scripts/build.mjs:9; scripts/build.mjs:14; scripts/build.mjs:15 |
| unmatched-api-response/1 | src/server/app.ts:6; tests/http.test.mjs:65 |
| public-file-boundary/1 | src/server/app.ts:9; tests/http.test.mjs:17; tests/http.test.mjs:54; tests/http.test.mjs:86 |
| missing-page-response/1 | src/server/app.ts:11; tests/http.test.mjs:77 |
| browser-page | src/browser/main.ts:1; src/browser/index.html:9 |
| server-http | src/server/app.ts:4; src/server/main.ts:3; tests/http.test.mjs:8; tests/startup.test.mjs:7 |
| build-tools | package.json:7; scripts/build.mjs:9; README.md:5; .gitignore:1 |
| agent-workflow | AGENTS.md:10; .agents/skills/the-way-implement-task/SKILL.md:12; .claude/rules/the-way.md:1; .gitmodules:1 |
| product-foundation | foundations/decisions.md:1; foundations/invariants.md:1; foundations/part_map.md:1; foundations/environment_facts.md:1; foundations/glossary.md:1 |

All current foundation files have no entries. File ownership is enumerated in ownership-at-code-commit.json. No file moves from another part. F1 removes both docs patterns because neither has tracked files in this commit. Any later record-document commit requires ownership reassessment at actual adoption, outside this named code snapshot. Proposed allowed dependencies are judgments awaiting approval, not a verified dependency graph. No declared graph command exists in package.json.

Existing tests are ordinary behavior tests and supply no invariant verdict. All proposed Method fields are TODO. No accepted invariant check, deliberate break or human verdict is claimed.

Final startup-error evidence: src/server/main.ts:3 handles the listener callback error; tests/startup.test.mjs:7 tests an occupied port; package.json:12 names both ordinary test files; README.md:21 describes that test. No accepted invariant verdict follows.
