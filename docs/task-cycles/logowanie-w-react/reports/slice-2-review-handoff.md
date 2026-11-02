# Handoff — review of Slice 2, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him. You did not make this change.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`. Work from its root. Read-only: change no tracked file.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole, and a file it names only when the step or variant that names it comes. You review a planned slice: Slice 2.

**Range.** `7c2faf8..35371e0`. The executor's report: `.runs/task-cycles/logowanie-w-react/reports/slice-2.md`.

**This slice is marked with a trust boundary, and you are told so.** `package-lock.json` of `build-tools`, partner npm registry, which the part map calls untrusted. Check crafted input at that boundary: each added package's advisories under D-33, by running `python -B scripts/audit_dependencies.py` yourself; every install script a new package runs; that each new entry resolves from `https://registry.npmjs.org/` with an integrity hash; the lockfile holding esbuild for Windows and for Linux; and whether any added package reaches `dependencies` beyond what the slice names. An irreversible operation: none.

**Safety rule.** A failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). Run nothing on jsdom outside what this rule allows: a file outside `tests/` that loads jsdom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-2-review.md`, its first line `PASS <sha>` or `FAIL <sha>` as your method gives, each check with its command and exit code. Return that line, a one-line check result naming what failed or did not run, and the report's path; reaches and **Searches not found or unclear** stand in the report. Do not run the product's gate.

## What the executor read: its section of the plan and the current ranges, word for word


### Slice 2 — The packages and the framework guard

- **Goal:** `package.json` holds, each pinned exactly, `react` 19.3.1 and `react-dom` 19.3.1 in `dependencies`, and `esbuild` 0.28.2, `jsdom` 30.1.3, `@types/react` 19.3.0 and `@types/react-dom` 19.3.0 in `devDependencies`, and `package-lock.json` is what npm writes for them, holding esbuild for Windows and for Linux (`@esbuild/linux-x64`). `happy-dom` does not enter. Nothing uses the packages yet. `tests/invariants/test_browser_view_framework.py` says what row F4 says: `.tsx` leaves the foreign formats and joins the TypeScript ones; `react`, `react-dom` and their subpaths leave the forbidden names and the two React markers leave `FRAMEWORK_MARKERS`, since `__REACT_DEVTOOLS_GLOBAL_HOOK__` will stand in the bundle; `BUILT_PAGE` stays; every other framework's name and marker stays; its docstring stops calling `.tsx` a framework's format. This comes with the packages because `react` in `dependencies` fails the guard as it stands. The test still fails on another library in the code and in the runtime dependencies: seen failing once on each, with a made-up library put in for a moment, and the report names those runs. The report also names, for each package added and for what it brings: the result of the audit under D-33, each install script a new package runs, and the registry the lockfile resolves it from. Safety rule of this cycle: jsdom now stands on the disk, and this slice runs nothing on it; a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11).
- **Change:** `package.json` · `package-lock.json` · `tests/invariants/test_browser_view_framework.py`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:42-42` To do 13 ·
  `.runs/task-cycles/logowanie-w-react/task.md:147-149` Context ·
  `.runs/task-cycles/logowanie-w-react/spec.md:38-38` Constraints ·
  `.runs/task-cycles/logowanie-w-react/spec.md:114-116` Decision 4 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:122-122` Decision 4 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `scripts/audit_dependencies.py` · `README.md:32-32` ·
  `foundations/decisions.md:750-762` D-33 · `foundations/invariants.md:448-457` introduced-npm-vulnerabilities ·
  `foundations/invariants.md:548-557` dependency-audit-refusal · `foundations/part_map.md:3-27` browser-view ·
  `foundations/part_map.md:82-115` build-tools · rows F1, F4
- **Model:** cheaper
- **Risk:** trust boundary — `package-lock.json` of `build-tools`, partner npm registry
- **Checks:** `npm test -- tests/invariants/test_browser_view_framework.py`; `python -B scripts/audit_dependencies.py`; `git grep -c "node_modules/@esbuild/linux-x64" -- package-lock.json`; `npm ci`; `npm test -- tests/invariants/test_application_package_layout.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · F1 · F4

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `scripts/audit_dependencies.py`
- `README.md:32-32`
- `foundations/decisions.md:749-761` D-33
- `foundations/invariants.md:449-458` introduced-npm-vulnerabilities
- `foundations/invariants.md:549-558` dependency-audit-refusal
- `foundations/part_map.md:3-27` browser-view
- `foundations/part_map.md:82-115` build-tools
- `foundations/decisions.md:39-51` D-03
- `foundations/invariants.md:35-44` browser-view-framework

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:42-42` To do 13

13. Niezmiennik `browser-view-framework` i jego test `tests/invariants/test_browser_view_framework.py` mówią to, co projektowane brzmienie: widok rysuje Reactem i interfejsami przeglądarki, bez innej biblioteki widoku, a test dalej oblewa, gdy taka biblioteka wejdzie do kodu albo zależności uruchomieniowych.

### `.runs/task-cycles/logowanie-w-react/task.md:147-149` Context

- Serwer nie kompresuje plików (`src/server/app.ts:58`), a próba z raportu technologii dała około 218 KB więcej kodu na stronie.
- Każdy nowy pakiet przechodzi audyt D-33, a `scripts/audit_dependencies.py` porównuje plik blokady z punktem rozejścia gałęzi.
- Plik blokady powstaje na Windowsie, a obraz serwera buduje się na Linuksie (`Dockerfile:1`, `:4`, `:11`), więc musi nieść esbuilda dla obu systemów, bo „esbuild liczy się tam jako wiele pakietów, po jednym na system” (`rozpoznanie_mvp2/technologia_budowanie_ekranow.md:143`); człowiek przyjął ten koszt przy S6.

### `.runs/task-cycles/logowanie-w-react/spec.md:38-38` Constraints

- The trust boundary `package-lock.json`: the lockfile is written on Windows and the image is built on Linux, so it must carry `@esbuild/linux-x64`. `scripts/kitchen-sink.mjs` is left untouched, and question 7 of the task forbids its serving lines in any case.

### `.runs/task-cycles/logowanie-w-react/spec.md:114-116` Decision 4

- React and react-dom stand in `dependencies`, exactly pinned, since they reach the player, as D-03's „runtime dependencies” reads; esbuild, `@types/react`, `@types/react-dom` and jsdom in `devDependencies`. The image's `node_modules` keeps about 8 MB it does not run.

Measured: 58 modules of 382,894 bytes become one file of 357,727 bytes minified, React and the spike included, 112,179 by gzip, 929,736 unminified; none of the listed frameworks' markers but `__REACT_DEVTOOLS_GLOBAL_HOOK__`; no import specifier left; no `process.env`; 5 licence comments; bundling in under a second. The lockfile written on Windows holds 26 esbuild platform packages, `@esbuild/linux-x64` among them. So minifying pays for itself: the page weighs less than today, and the task's 218 KB does not arrive.

### `.runs/task-cycles/logowanie-w-react/spec.md:122-122` Decision 4

| `browser-view-framework` | yes | `BUILT_PAGE` stays and now reads the bundle, which still must import nothing. In the test `.tsx` leaves the foreign formats and joins the TypeScript ones; `react`, `react-dom` and their subpaths leave the forbidden names and the two React markers leave `FRAMEWORK_MARKERS`, since `__REACT_DEVTOOLS_GLOBAL_HOOK__` stands in the bundle. Every other framework's name and marker stays, so the test still fails on another library. |
