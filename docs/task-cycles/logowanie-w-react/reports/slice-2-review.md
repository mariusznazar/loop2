PASS 35371e04171e6c72e15108ebd4808184c3b84c36

# Review — Slice 2, task `logowanie-w-react`

Range `7c2faf8..35371e0`, one commit. `git rev-parse HEAD` is the head given. The changed invariant test is `tests/invariants/test_browser_view_framework.py` (invariant `browser-view-framework`); its change follows row F4 and D-03 and weakens nothing beyond that row.

## Findings

**Critical:** none.

**Important:** none.

**Minor:**

1. `tests/invariants/test_browser_view_framework.py:38-47` — the guard no longer stops a component library built on React, and nothing says so. Within the task (To do 13), not blocking.
   - Before this slice such a library could not enter: it needs `react`, and `react` failed the guard. With `react` off the list that protection is gone, and the list holds no React-based library beyond `next` and `@remix-run/react`, though its comment calls it "UI frameworks and component libraries". Row F4 asks for the list to stay as it is, so the executor did what the plan says; the docstring's "a UI framework absent from the list" covers it in general terms, but this family is the likeliest "other library" now that React stands in the view.
   - Evidence, in a separate worktree: `@mui/material` put in `dependencies`, in a non-dev lock entry and in an import of `src/browser/zz-temp.tsx`: the test file exits 0. The same for `"react": "npm:preact@10.0.0"` in `dependencies`: exit 0, since the name is allowed and the value is not read.
   - Cost if left: a human or a reviewer has to catch it in the diff. Graded Minor as broader coverage: the guard has always been a list and says so, and the requirement of the slice, failing on a listed library, holds.

2. `.runs/task-cycles/logowanie-w-react/reports/slice-2.md:21` — says `jsdom` brings 29 dev packages; the list next to it and the lockfile hold 32 (3 + 3 + 27 + 1 + 32 = 66 entries). Every package is named, so the Goal's requirement is met; the number is wrong.

## Declined to judge

Each line is outside this slice and counts as out of scope.

- `guidelines/coding-browser-module.md:45-66`: the rule „TypeScript i DOM” and its bad example `import "react";` contradict D-03. Slice 14 changes them (`plan.md:305`); no program reads those examples (see Searches).
- Guards other than this test that pick files by extension and do not read `.tsx`: the plan's slice at `plan.md:162` takes them.
- `code_only` in the test reads an apostrophe in JSX text as a string's start. No `.tsx` file exists yet, and the check needs only one file with a `document.` call.
- npm 12 blocks dependency install scripts unless `allowScripts` names them (`node_modules/npm/docs/content/commands/npm-install-scripts.md`). The image's npm 11.19.1 only warns and runs them; `argon2` was already in that state, and esbuild's command works without its script.
- `engines.node` `24.x` admits versions below jsdom's `^24.15.0`. Development only; this machine has 24.17.0, `node:24-slim` gave 24.22.1.
- The 48 advisories present at the fork point: D-33 does not block them.

## The trust boundary: `package-lock.json`

- **Entries.** 66 added, 0 removed, 1 changed (the root entry, `dependencies` and `devDependencies` only). The lockfile's 28 deleted lines in the diff are shifted hunks: every other entry is equal as JSON.
- **Registry.** Each of the 66 resolves to exactly `https://registry.npmjs.org/<name>/-/<base>-<version>.tgz` with a `sha512-` hash; no entry of the whole lockfile resolves elsewhere. All 66 equal the public registry's own metadata in integrity, tarball, dependencies, optional and peer dependencies.
- **Signatures.** `npm audit signatures` verified all 530 installed packages, 210 with attestations (react, react-dom, scheduler, esbuild and jsdom among those with attestations in the registry's metadata).
- **Audit under D-33.** Exit 0. Itemised, closing what the executor's report left as a guess: the fork point `3d366c8` and the head report the same 48 (46 moderate, 2 high) from the same 10 advisory records; none of the advisories' nodes is an added package. The name `undici` in that list is `node_modules/npm/node_modules/undici`; the added `node_modules/undici` 8.12.3 lies outside the ranges reported.
- **Install scripts.** One new package runs one: esbuild, `postinstall: node install.js`, read whole on disk. With its platform package present it only hard-links the binary on Linux and checks `--version`; its fallback (`npm install`, then a download from the hardcoded `registry.npmjs.org`) checks a SHA-256 from esbuild's own `package.json`, and is reached only when the platform package is missing. On disk and in the registry no other added package has `preinstall`, `install`, `postinstall` or a `gypfile`, nor a `binding.gyp` among the 41 on this disk; `prepare` and `prepublish` of `jsdom`, `undici`, `whatwg-url`, `tr46`, `csstype` and `@bramus/specificity` do not run on an install from the registry. `canvas`, jsdom's optional peer with scripts of its own, is not in the lockfile.
- **Both systems.** `@esbuild/linux-x64` and `@esbuild/win32-x64` are there, 26 platform packages in all, as the spec measured. Windows `npm ci` installs `win32-x64`; in `node:24-slim`, `npm ci` installs `linux-x64`, its postinstall ran (`bin/esbuild` became the ELF binary) and `esbuild --version` prints 0.28.2.
- **Reaching `dependencies`.** `package.json` gains exactly `react` and `react-dom`, pinned exactly. The only other non-dev entry added is `scheduler` 0.28.0, which `react-dom` requires. After `npm prune --omit=dev` in the container esbuild and jsdom are gone and `react`, `react-dom` and `scheduler` stay, 268K + 7.9M + 128K, the spec's "about 8 MB". `happy-dom` is absent.
- **The lockfile is what npm writes.** `npm install --package-lock-only` with the local npm 12.2.1 leaves `package.json` and the lockfile unchanged.

## Against the task, the foundation and the guidelines

- **To do 13, row F4.** Comparing the two versions' constants: `UI_FRAMEWORKS` loses `react`, `react-dom`; `FRAMEWORK_MARKERS` loses the two React markers; `FOREIGN_CODE_EXTENSIONS` loses `.tsx`; `TYPESCRIPT_EXTENSIONS` gains it; nothing else moves, `BUILT_PAGE` stays. Subpaths are allowed too, since `names_in` reduces a specifier to its package. The docstring's first sentence is the invariant's word for word, and it stops calling `.tsx` a framework's format.
- **Nothing uses the packages yet.** No import of them under `src`, `scripts` or `tests`; no `.tsx` file is tracked; the names in `tests/view/memory-limit.test.mjs` are data of its refusal cases.
- **Reserved choices.** None taken: React by D-03, esbuild by D-263, jsdom by D-264, the type packages by spec decision 4.
- **Guidelines.** `guidelines/coding.md` Dependency audit, Linter: met. `guidelines/testing.md` Changing an existing test: the cause stands on the requirement's side, D-03 and `browser-view-framework`. `guidelines/styleguide-browser-view.md`: no rule reached, no screen or style changes, so no screenshot applies.
- **Own-work check.** The requirement it names is the weakest one and its runs catch it. The gap it admits, `.tsx` never exercised, is closed below.
- **The executor's other claims** on versions, the failing run before the edit, the preact runs and the 26 entries: reproduced.

## Checks

Unless marked, each ran in a detached separate worktree of `35371e0` (Node 24.17.0, global npm 11.13.0), removed afterwards. The reviewed worktree's `git status --short` is empty at the end.

| Check | Exit | What it showed |
|---|---|---|
| `python -B scripts/audit_dependencies.py`, reviewed worktree | 0 | no new advisory; prints nothing |
| one-off script running the D-33 audit command on the fork point and on the head | 0 | 48 and 48, no new advisory, none on an added node |
| one-off script comparing the lockfile at `7c2faf8` and `35371e0` | 0 | as under The trust boundary |
| one-off script comparing the 66 entries with `https://registry.npmjs.org/` | 0 | 66 checked, 0 flagged |
| `npm ci` | 0 | only `@esbuild/win32-x64` on disk |
| `node node_modules/npm/bin/npm-cli.js audit signatures --registry=https://registry.npmjs.org/` | 0 | 530 verified, 210 attestations |
| `node node_modules/npm/bin/npm-cli.js install --package-lock-only --ignore-scripts --no-audit --no-fund --registry=https://registry.npmjs.org/` | 0 | no file changed |
| `docker run` of `node:24-slim` (Node 24.22.1, npm 11.19.1): `npm ci --no-audit --no-fund` | 0 | `@esbuild/linux-x64` only; warns that `argon2` and `esbuild` are not in `allowScripts`, and runs them |
| the same container: `./node_modules/.bin/esbuild --version` | 0 | 0.28.2 |
| the same container: `npm prune --omit=dev --no-audit --no-fund` | 0 | esbuild and jsdom gone |
| `npm run typecheck` | 0 | |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | 6 tests |
| `npm test -- tests/invariants/test_application_package_layout.py` | 0 | 1 test |
| `npm test -- tests/invariants/test_account_server_runtime.py` | 0 | 5 tests |
| `npm test -- tests/quality/test_audit_dependencies.py` | 0 | 2 tests |
| `npm test -- tests/quality/test_quality_invariants.py`, separate worktree | 1 | Ruff and ShellCheck error with `FileNotFoundError`: `.runs/quality-venv` does not exist there. Not the change |
| `npm test -- tests/quality/test_quality_invariants.py`, reviewed worktree, where the tools stand | 0 | 5 tests |
| `git grep -c "node_modules/@esbuild/linux-x64" -- package-lock.json` | 0 | `package-lock.json:1` |
| `git grep -c "happy-dom" -- package.json package-lock.json` | 1 | no hit, as required |
| `git grep` for imports of react, react-dom, jsdom, esbuild under `src`, `scripts`, `tests`; `git ls-files 'src/browser/**/*.tsx'` | — | none; 0 files |

Mutations, each `npm test -- tests/invariants/test_browser_view_framework.py`, each restored:

| Put in | Exit | Failing test |
|---|---|---|
| the guard of `7c2faf8` on the head's tree | 1 | `test_no_ui_framework_in_runtime_dependencies`, `['react', 'react-dom']` |
| `preact` in `dependencies` | 1 | the same, `['preact']` |
| `preact` only in a non-dev lock entry | 1 | the same, `['preact']` |
| `vue` nested under `node_modules/react/node_modules/` in the lockfile | 1 | the same, `['vue']` |
| `.ts` file importing `preact` | 1 | `test_browser_source_imports_no_ui_framework`, and the built page's test, the build failing |
| `.tsx` file importing `preact/hooks` | 1 | `test_browser_source_imports_no_ui_framework` |
| `.tsx` file holding `__PREACT_DEVTOOLS__` | 1 | the same |
| `.tsx` file with a script tag loading `lit@3` from a URL | 1 | the same |
| `.tsx` file importing `react`, `react/jsx-runtime`, `react-dom/client` | 0 | none: allowed, as required |
| `.jsx` file | 1 | `test_browser_source_holds_typescript_and_no_other_code` |
| `.vue` file | 1 | the same |
| `@mui/material` in `dependencies`, the lockfile and a `.tsx` import | 0 | none: Minor 1 |
| `"react": "npm:preact@10.0.0"` in `dependencies` | 0 | none: Minor 1 |

**Not run:**

- the full `npm test` and with it `python -B .the-way/elements/common/foundation_check.py`: the handoff forbids the gate, and this slice touches no foundation file and adds no file;
- anything on jsdom: the safety rule; nothing here loads it;
- the whole `docker build`: only its `npm ci`, the esbuild binary and `npm prune --omit=dev` were reproduced in the container; this slice's code does not change what the later steps build.

## Reaches beyond the dispatch

- `guidelines/coding-browser-module.md`, whole: a search for `react` found its bad example.
- `.runs/task-cycles/logowanie-w-react/plan.md:9-31` rows, `:162-163`, `:305-306` Slice 14: to place that example and the other guards.
- `.the-way/project-level/technology/reserved_choices.md`: the method names it.
- `foundations/decisions.md:5376-5397`, the openings of D-263 and D-264: to see esbuild and jsdom settled.
- `Dockerfile`, `.dockerignore`, `tsconfig.browser.json`, `scripts/test.py`, `tests/quality/test_quality_invariants.py:11-27`, `tests/invariants/loop2_invariant_support.py`: how the packages reach the image and how the checks run.
- `node_modules/esbuild/install.js`, `node_modules/npm/docs/content/commands/npm-install-scripts.md`: the install script, and the warning the container printed.
- The public npm registry's metadata of the 66 packages.

## Searches not found or unclear

- Any program reading the `good` and `bad` blocks of guidelines: none found in `tests/` or the pinned `.the-way`, so the stale block in `guidelines/coding-browser-module.md` breaks no check. A search, not a run of `foundation_check.py`.
- Whether Node 24 images will move to npm 12, where install scripts are blocked by default: nothing in the foundation says; no entry names `allowScripts`.
