# Handoff — Slice 7, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 204659445526e79a34f601bbf4efa302f4393c76. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-7.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 7 — The guards read .tsx

- **Goal:** Before the first `.tsx` file, the guards that pick files by extension read it, each with a case of control: `tests/invariants/test_browser_view_token_values.py:79`, where a `.tsx` control flags a colour in a `style` attribute; `tests/invariants/test_application_build_output.py:49`, where `.tsx` stands in `EMITTED_EXTENSION` and a made-up `.tsx` source compiles to its `.js` in the build, and a type error in a `.tsx` file fails `npm run typecheck`; `tests/invariants/test_application_package_layout.py:20`, where `.tsx` stands in `SOURCE_EXTENSIONS`. Each control is seen failing once with the extension taken out. `IMPORT_SPECIFIER` of `tests/invariants/test_browser_view_framework.py` needs white space after `import`, so it does not see the minified form `import"x"`, and `BUILT_PAGE` is a minified bundle now: it comes to read that form, with a control seen failing without the change, so that the guard of To do 13 keeps failing on a framework left as an import in the bundle. `tests/invariants/test_simulation_randomness.py:54` stays. No `.tsx` file of the product enters.
- **Change:** `tests/invariants/test_browser_view_token_values.py` · `tests/invariants/test_application_build_output.py` · `tests/invariants/test_application_package_layout.py` · `tests/invariants/test_browser_view_framework.py`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:39-39` To do 10 ·
  `.runs/task-cycles/logowanie-w-react/task.md:43-43` To do 14 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:122-125` Decision 4 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:289-289` Left to the maker ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `tests/invariants/loop2_invariant_support.py:175-225` ·
  `foundations/decisions.md:898-912` D-43 · `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:75-94` application-package-layout, application-build-layout · row F20
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_application_build_output.py`; `npm test -- tests/invariants/test_application_package_layout.py`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3 · F20

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `tests/invariants/loop2_invariant_support.py:175-225`
- `foundations/decisions.md:897-911` D-43
- `foundations/invariants.md:459-468` browser-view-token-values
- `foundations/invariants.md:75-84` application-package-layout
- `foundations/invariants.md:85-94` application-build-layout
- `foundations/invariants.md:65-74` application-build-output

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:39-39` To do 10

10. `npm run build` składa kod przeglądarki razem z Reactem esbuildem w pliki podawane przez serwer, `npm run typecheck` sprawdza pliki `.tsx`, a obraz Dockera buduje się tak samo (D-06).

### `.runs/task-cycles/logowanie-w-react/task.md:43-43` To do 14

14. Strażnicy, którzy wybierają pliki po rozszerzeniu, czytają też `.tsx`, każdy z przypadkiem kontrolnym: `tests/invariants/test_browser_view_token_values.py:79` (uwaga planu, 2026-11-01), `tests/invariants/test_application_build_output.py:49`, `tests/invariants/test_application_package_layout.py:20`.

### `.runs/task-cycles/logowanie-w-react/spec.md:122-125` Decision 4

| `browser-view-framework` | yes | `BUILT_PAGE` stays and now reads the bundle, which still must import nothing. In the test `.tsx` leaves the foreign formats and joins the TypeScript ones; `react`, `react-dom` and their subpaths leave the forbidden names and the two React markers leave `FRAMEWORK_MARKERS`, since `__REACT_DEVTOOLS_GLOBAL_HOOK__` stands in the bundle. Every other framework's name and marker stays, so the test still fails on another library. |
| `application-build-output` | yes | Test: `dist/public` becomes `dist/browser` in `CONFIGURATIONS`; `.tsx` in `EMITTED_EXTENSION` with its control; a new case for the bundle. The sentence gains the bundling. |
| `application-build-layout` | yes, stays true: `dist/browser` and `dist/server` are distinct | Only the test above. |
| `application-package-layout` | no | `.tsx` in `SOURCE_EXTENSIONS`, with its control. |

### `.runs/task-cycles/logowanie-w-react/spec.md:289-289` Left to the maker

- How the bundle's case in `test_application_build_output.py` proves bundling, and the wording of each control case of To do 14. On the token guard, a `.tsx` control flags a colour in a `style` attribute; measured, the reader needs only the extension.
