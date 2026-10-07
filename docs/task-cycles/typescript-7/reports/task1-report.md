# Task 1 implementation report — TypeScript 7.0.2 candidate

## Result

The unchanged TypeScript 6.0.3 baseline passed. npm generated an exact 7.0.2 manifest and lockfile; a clean `npm ci` installed the Windows x64 native package and the actual compiler CLI reported 7.0.2. This task stops at the dependency candidate. Candidate type checking, builds, product tests, and invariant tests belong to Tasks 2 and 3 and remain unchecked here.

## Workspace and baseline

All commands ran at the named task worktree root. Commands and exit codes, in execution order:

| Command | Exit | Evidence |
| --- | ---: | --- |
| `git status --short` | 0 | Clean before editing. |
| `git ls-files --stage -- .the-way` | 0 | Gitlink `c64a6071384fb57cdb9d7e9db4560ddc43e3b355`. |
| `git -C .the-way rev-parse HEAD` | 0 | Same pinned commit. |
| `git symbolic-ref --short refs/remotes/origin/HEAD` | 0 | `origin/main`. |
| `node --version` | 0 | `v24.17.0`. |
| `npm --version` | 0 | `11.13.0`. |
| `git merge-base HEAD origin/main` | 0 | `50c693a476326ae00f5b35bbe076aa3ef9ec508e`. |
| `git rev-parse origin/main` | 0 | Same merge target commit. |
| `npm ci` | 0 | 80 packages added; 0 reported vulnerabilities. |
| `node node_modules/typescript/bin/tsc --version` | 0 | `Version 6.0.3`. |
| `npm run typecheck` | 0 | No diagnostic output. |
| `npm run build` | 0 | No diagnostic output. |
| `npm test` | 0 | 5 passed, 0 failed. |
| `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/typescript-7-baseline-invariants.jsonl` | 0 | 33 passed, `OK`. |

The baseline invariant record is ignored cycle evidence, not a product commit file.

## Candidate generation and clean installation

| Command | Exit | Evidence |
| --- | ---: | --- |
| `npm install --save-dev --save-exact --package-lock-only typescript@7.0.2` | 0 | npm updated the manifest and lockfile; no installation during this step. |
| `git diff -- package.json package-lock.json` | 0 | Full diff inspected before installation. |
| `npm ci` | 0 | 81 packages added; 0 reported vulnerabilities. |
| `node node_modules/typescript/bin/tsc --version` | 0 | `Version 7.0.2` from the installed CLI. |
| `npm ls typescript --depth=0` | 0 | One root `typescript@7.0.2`; the local path in npm's output is omitted here. |
| `node -p "process.platform + '/' + process.arch"` | 0 | `win32/x64`. |

The installed `node_modules/typescript/package.json` is 7.0.2 and declares 20 optional `@typescript/*` native packages, including `@typescript/typescript-win32-x64: 7.0.2`. The installed matching package reports name `@typescript/typescript-win32-x64`, version 7.0.2, `os: [win32]`, and `cpu: [x64]`. The actual CLI succeeded through this installation. No launcher error or missing native package was observed.

## Lockfile and native-package audit

The npm-generated `package-lock.json` has exact root `devDependencies.typescript: 7.0.2` and `node_modules/typescript.version: 7.0.2`. All 21 TypeScript-related package entries have npm registry `https://registry.npmjs.org/` resolved URLs and `sha512-` integrity fields. The 20 new native entries each use `version: 7.0.2`, `optional: true`, and `os`/`cpu` selectors matching their package names; the two Windows entries select `win32/arm64` and `win32/x64`. The TypeScript package lists these 20 optional dependencies at 7.0.2.

Comparison with the baseline lockfile found 20 additions, zero removals, and exactly two changed existing entries: the root and `node_modules/typescript`. There were zero unrelated package additions, removals, or version changes. The full diff also shows npm reformatting two compact fields in `package.json` (`engines` and `dependencies`); their values did not change. The TypeScript lock entry changes its CLI metadata from `tsc` plus `tsserver` to `tsc`, its minimum Node engine to `>=16.20.0`, and adds the expected native optional dependencies. No integrity value was hand-edited.

The requested direct PowerShell `ConvertFrom-Json` parsing attempt exited 1 because Windows PowerShell 5.1 rejects npm lockfile's empty-string root package key (`Cannot process argument because the value of argument "name" is not valid`). A second PowerShell audit exited 0 after replacing only that key with `__root__` in memory for parsing. It checked the exact root and compiler versions, all 21 URLs and integrity fields, native selectors, and the installed matching package. The on-disk npm-generated lockfile was untouched by this parsing workaround. A further parsed baseline-versus-candidate comparison exited 0 and found no unrelated lockfile movement.

## Files, self-review, and remaining gates

- Product files changed: `package.json`, `package-lock.json` only.
- `git diff --check`: exit 0. `git status --short` before commit showed only those two modified paths.
- Self-review confirmed the pinned process commit, baseline health, exact manifest and lockfile versions, actual CLI version, matching Windows native package, registry and integrity fields, and no unrelated lockfile movement.
- Candidate `npm run typecheck`, `npm run build`, `npm test`, invariant gate, and Linux verification are **not run** in Task 1. The orchestrator's next tasks own the Windows behavior checks; Linux is outside this task's required verification.
- Concern: the candidate is an installed and audited dependency attempt, not yet a verified migration. The PowerShell 5.1 JSON parser limitation required an in-memory audit workaround.

## Commit

`5dc50b556f648f66f5202f2c7964aa42e9d7284a` — `build: try TypeScript 7.0.2`. Staged paths were explicitly `package.json` and `package-lock.json`; `git diff --cached --check` exited 0, and post-commit `git status --short` was clean. The report remains in the ignored SDD workspace and is not part of the commit.
