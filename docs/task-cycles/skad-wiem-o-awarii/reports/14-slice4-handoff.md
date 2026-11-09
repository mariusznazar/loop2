# Handoff 14-slice4 — executor of slice 4

You are the executor of slice 4 of the task cycle `skad-wiem-o-awarii` (where the owner learns that the running game of loop2 failed, and how long its logs live). Variant of `make-change`: "a slice, or the retry of a slice".

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`), you alone writing in it. The slice's base is the current head `563510db37ad30ef0d00814dfcab97e8aeaffe07`; the pin `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), read whole, and `.the-way/task-cycle/change/slice.md` when the step that names it comes; a file the method names only when its step comes. Read the passages of your slice's *Read* below; the whole frozen task is `.runs/task-cycles/skad-wiem-o-awarii/task.md`, the reviewed spec `.runs/task-cycles/skad-wiem-o-awarii/spec.md`, the plan `.runs/task-cycles/skad-wiem-o-awarii/plan.md` (read only the passages *Read* names).
- Environment: Windows; `npm ci` is done; the quality tools are in `.runs/quality-venv`. Run focused checks only, as your slice's *Checks* name them; never the whole gate (the orchestrator runs it). Each check goes in your report with its command and its exit code.
- Commits: on the task branch, explicit paths with `git add <path>`, never `git add -A`; messages in English in the repository's style (`type: :emoji: summary`, see `git log`); do not push. Test first where the slice says so (a failing run, then a passing run, both in the report).
- Answers of step 4: trust boundary **yes** (`src/server/**`, `deploy/**`): where your files are such, expect a review aimed at crafted input; irreversible operation: none performed by the cycle — you install nothing on the server and run nothing against it.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.
- Report to `.runs/task-cycles/skad-wiem-o-awarii/reports/14-slice4-report.md`; return its status, commits, a one-line check result naming what failed or did not run, and the path. The report holds the checks with command and exit code, the own-work check, the reaches beyond this handoff, and **Searches not found or unclear** (`none` is an answer).

## Current ranges of foundation entries (these hold where they differ from the plan's)

The foundation step has written D-352, D-353, the new D-347 and the invariants `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report`; read the ones your slice's *Read* names, whole, at these ranges:

- `foundations/decisions.md:5120-5155` D-252
- `foundations/decisions.md:5156-5200` D-253
- `foundations/decisions.md:7101-7115` D-323
- `foundations/decisions.md:7691-7718` D-347
- `foundations/decisions.md:7867-7881` D-352
- `foundations/decisions.md:7882-7895` D-353
- `foundations/invariants.md:809-818` account-client-requests
- `foundations/invariants.md:1269-1278` browser-failure-report
- `foundations/invariants.md:1259-1268` failure-watcher-message
- `foundations/invariants.md:1249-1258` loop2-deploy-log-dump



## The slice (copied word for word from `plan.md`)

### Slice 4 — The browser sends its last-resort line

- **Goal:** as spec B4 gives: `src/browser/view/last-resort.ts` gets one optional callback called with the kind, code and place of a line at the moment it writes that line to the console, inside the "not written before" guard, so one report goes out per distinct line per page load; the module does no network work; `src/browser/account-api.ts` gets one method of the account client that posts the three words to `/api/browser-failure` as an ordinary JSON request through the same exchange function (default time limit, `same-origin` credentials, `redirect: error`, no `keepalive`) and returns the usual result type, a failed send being a result and never a throw; `src/browser/view/app.ts` passes the callback that calls the method, ignores the result and guards the call so an exception of a test double cannot become an error of the last-resort handler. The console line and the sentence on the screen stay unchanged. Tests are written first: `tests/view/uncaught-failure.test.mjs` (callback once per distinct line, also for `report()` and a repeating fault; the existing lines unchanged) and `tests/account-api.test.mjs` (the real local server: path, method, JSON body of the three words, no `keepalive`, no redirect followed, a failure returned instead of thrown). `foundations/part_map.md`: the `browser-view` responsibility sentence gains the report the last-resort handling sends, written through the-way-update-part-map. Leaves nothing for the human.
- **Change:** `src/browser/view/last-resort.ts` · `src/browser/account-api.ts` · `src/browser/view/app.ts` · `tests/view/uncaught-failure.test.mjs` · `tests/account-api.test.mjs` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/skad-wiem-o-awarii/spec.md:35-46` Constraints · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:72-91` B. The browser's report · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:185-185` the browser tests in "Tests the change must bring" · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:217-225` Left to the maker · Foundation entries row 2 · Foundation entries row 3 · `foundations/decisions.md:5156-5199` D-253 · `foundations/decisions.md:7101-7114` D-323 · `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:7691-7719` D-347 · `foundations/invariants.md:809-817` account-client-requests · `guidelines/coding.md` · `guidelines/coding-browser-api-client.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none (the files of `browser-view` that the part map names as a boundary are the asset folders; none is touched)
- **Checks:** `npm test -- tests/view/uncaught-failure.test.mjs` (first failing) · `npm test -- tests/account-api.test.mjs` (first failing) · `npm test -- tests/view/page-document.test.mjs` · `npm run typecheck` · `python -B .the-way/elements/common/foundation_check.py` (for the part map edit)
- **Depends on:** Slice 3 (the route the account-api test calls on the real local server and the part map file both slices edit)
