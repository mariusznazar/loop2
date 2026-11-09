# Handoff 12-slice3 — executor of slice 3

You are the executor of slice 3 of the task cycle `skad-wiem-o-awarii` (where the owner learns that the running game of loop2 failed, and how long its logs live). Variant of `make-change`: "a slice, or the retry of a slice".

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`), you alone writing in it. The slice's base is the current head `7a1c8ea30bae1f4d70ba151ee12e15e1a3d34793`; the pin `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), read whole, and `.the-way/task-cycle/change/slice.md` when the step that names it comes; a file the method names only when its step comes. Read the passages of your slice's *Read* below; the whole frozen task is `.runs/task-cycles/skad-wiem-o-awarii/task.md`, the reviewed spec `.runs/task-cycles/skad-wiem-o-awarii/spec.md`, the plan `.runs/task-cycles/skad-wiem-o-awarii/plan.md` (read only the passages *Read* names).
- Environment: Windows; `npm ci` is done; the quality tools are in `.runs/quality-venv`. Run focused checks only, as your slice's *Checks* name them; never the whole gate (the orchestrator runs it). Each check goes in your report with its command and its exit code.
- Commits: on the task branch, explicit paths with `git add <path>`, never `git add -A`; messages in English in the repository's style (`type: :emoji: summary`, see `git log`); do not push. Test first where the slice says so (a failing run, then a passing run, both in the report).
- Answers of step 4: trust boundary **yes** (`src/server/**`, `deploy/**`): where your files are such, expect a review aimed at crafted input; irreversible operation: none performed by the cycle — you install nothing on the server and run nothing against it.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.
- Report to `.runs/task-cycles/skad-wiem-o-awarii/reports/12-slice3-report.md`; return its status, commits, a one-line check result naming what failed or did not run, and the path. The report holds the checks with command and exit code, the own-work check, the reaches beyond this handoff, and **Searches not found or unclear** (`none` is an answer).

## Current ranges of foundation entries (these hold where they differ from the plan's)

The foundation step has written D-352, D-353, the new D-347 and the invariants `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report`; read the ones your slice's *Read* names, whole, at these ranges:

- `foundations/decisions.md:1887-1901` D-102
- `foundations/decisions.md:1917-1929` D-104
- `foundations/decisions.md:1930-1944` D-105
- `foundations/decisions.md:1997-2011` D-110
- `foundations/decisions.md:5120-5155` D-252
- `foundations/decisions.md:5156-5200` D-253
- `foundations/decisions.md:7691-7718` D-347
- `foundations/decisions.md:7867-7881` D-352
- `foundations/decisions.md:7882-7895` D-353
- `foundations/invariants.md:729-738` account-mutation-request-guards
- `foundations/invariants.md:739-748` account-request-transport
- `foundations/invariants.md:1269-1278` browser-failure-report
- `foundations/invariants.md:1259-1268` failure-watcher-message
- `foundations/invariants.md:45-54` loop2-api-error-route
- `foundations/invariants.md:1249-1258` loop2-deploy-log-dump



## The slice (copied word for word from `plan.md`)

### Slice 3 — The report route of the server and the line it writes

- **Goal:** the server accepts `POST /api/browser-failure` as spec B1-B3 give: added to the paths the account gate covers, with `mutationGuards` and the 16 KiB body limit; no session required, `accountId` taken only from the stored session and never from the body; the body is exactly `kind`, `code`, `place` as strings in the patterns of B1, anything else gets the existing `invalid-request` 400 and writes nothing; 204 without body on acceptance; a server-wide limit of 30 accepted reports per rolling 60 minutes, kept with the other limits in `src/server/account-policy.ts` so a test can build it with a small limit and a clock, counted after the body passes its pattern, answering 429 `too-many-attempts` over it, with one `LIMITED` line at the first refusal of a window (B2); a new writer in `src/server/log-line.ts` next to `writeFailure` writes `{"failure":"browser", kind, code, place[, accountId]}` and nothing else of the request (B3). Tests are written first: `tests/http.test.mjs` gets one case per row of the spec's trust-boundary table for this route, the case that `accountId` comes from the session and never from the body, the exact line written, the flood case with a small limit and clock, and carries the invariant of row 6 (tagged `# invariant: <name>` with the name the foundation step gave row 6); `tests/transport.test.mjs` extends the "refused state-changing requests" case to the ninth route and the transport case to the new route. `foundations/part_map.md`: the `account-server` responsibility sentence gains the browser report route, written through the-way-update-part-map. `guidelines/testing.md` is not edited (its stale rows are scheduled separately, spec S2). Leaves nothing for the human.
- **Change:** `src/server/account-routes.ts` · `src/server/log-line.ts` · `src/server/account-policy.ts` · `tests/http.test.mjs` · `tests/transport.test.mjs` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/skad-wiem-o-awarii/spec.md:35-46` Constraints · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:72-84` B. The browser's report, B1 to B3 · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:166-185` Trust boundaries and the crafted input each refuses, and the first tests of "Tests the change must bring" · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:192-195` Settlements after the spec's review · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:217-225` Left to the maker · Foundation entries row 2 · Foundation entries row 3 · Foundation entries row 6 · `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:5156-5199` D-253 · `foundations/decisions.md:7691-7719` D-347 · `foundations/decisions.md:1917-1928` D-104 · `foundations/decisions.md:1887-1900` D-102 · `foundations/decisions.md:1930-1943` D-105 · `foundations/decisions.md:1997-2010` D-110 · `foundations/invariants.md:729-737` account-mutation-request-guards · `foundations/invariants.md:739-747` account-request-transport · `foundations/invariants.md:45-53` loop2-api-error-route · `guidelines/coding.md` · `guidelines/coding-http-application.md` · `guidelines/coding-account-policy.md` · `guidelines/testing.md` · `src/server/app.ts` · `src/server/transport.ts`
- **Model:** same — a new public route on the trust boundary: guards, session reading, a limiter and a log line that must carry no request text
- **Risk:** trust boundary — `src/server/**`
- **Checks:** `npm test -- tests/http.test.mjs` (the new cases first failing) · `npm test -- tests/transport.test.mjs` · `npm test -- tests/invariants/test_loop2_api_error_route.py` · `npm test -- tests/startup.test.mjs` · `npm run typecheck` · `python -B .the-way/elements/common/foundation_check.py` (for the part map edit)
- **Depends on:** Foundation entries rows 2, 3 and 6
