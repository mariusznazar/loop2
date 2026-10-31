# Handoff — executor of Slice 7, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You make one slice of a plan, a fresh agent. Your
questions go to the orchestrator, never to the human; you return at your slice's end.

- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole;
  read a file it names when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/reset-hasla/reports/27-slice7-report.md`
- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch `task/reset-hasla`. Process pin `.the-way` at
  `a8dfe8a`, not moved.
- Trust boundary (step 4): **yes**, `src/server/**`. Two new routes take data from the network
  without a session. Every code review checks crafted input at that boundary: token forms, origin
  and body guards, account enumeration through content or time, tokens and links never reaching
  logs, a link of another kind, a blocked account, a login in progress.
- Irreversible operation (step 4): **no**; the design has no schema step. No agent deploys, sends
  real mail through Outsider or changes anything on the server (D-12); tests never reach the real
  Outsider.
- The plan's labels are now: N1 = `D-214`, N2 = `D-215`, N3 = `D-216`, N4 = `D-217`, N5 = `D-218`, N6 = `D-219`, I1 = `password-reset-verified-email`, I2 = `password-reset-link`, I3 = `password-reset-ends-sessions`, F1 = `express-session-end-of-request`, F2 = `express-session-regenerated-session-saved-again`.
- The line ranges of foundation entries below are current in the worktree; where they differ from
  the plan's section, these hold. Ranges of code or tests in the section may have moved with earlier
  slices: find them again by name.
- Quality tools stand in `.runs/quality-venv`, `node_modules` is installed, Docker runs.
- Commit on the task branch in the repository's style (English, `feat:`/`test:`/`docs:` with the
  repository's emoji form, explicit paths with `git add <path>`, never `git add -A`). No push.
- Do not run the product's gate (`npm test` with no argument); it is the orchestrator's. `npm test --
  <one file>` is the focused check the section names.
- A check you report carries its command and exit code. Your report keeps **Searches not found or
  unclear** (or `none`), every reach, the own-work check and, for an invariant's test, its failing
  run and its passing run.

## Your section of the plan (`.runs/task-cycles/reset-hasla/plan.md`), word for word

### Slice 7 — The browser client's two calls

- **Goal:** `AccountClient` gains `requestPasswordReset(email)` and `setPassword(token, password,
  passwordConfirmation)`, both through `noContentRequest`, so only 204 counts as success; nothing
  about an account comes back and nothing is kept (D-117).
- **Change:** `src/browser/account-api.ts` · `tests/account-api.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:77-91` Decision 1 — Two routes, no new refusal
  code · `.runs/task-cycles/reset-hasla/spec.md:482-486` Decision 13 — The browser client ·
  `foundations/decisions.md:2043-2056` D-117 · `foundations/decisions.md:1918-1929` D-108 ·
  `foundations/invariants.md:808-816` account-client-requests ·
  `foundations/invariants.md:818-826` account-client-outcomes ·
  `foundations/environment_facts.md:256-260` fetch-same-origin-credentials ·
  `src/browser/AGENTS.md` ·
  `guidelines/coding.md` · `guidelines/coding-browser-api-client.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** Start from the table of `tests/account-api.test.mjs` „each call sends its documented
  method, relative path and JSON body”, failing at its assertion against an empty call, then a
  success status other than 204 and a refusal for each call. Cases carry
  `invariant: account-client-requests` and `invariant: account-client-outcomes`.
  `npm test -- tests/account-api.test.mjs`, `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 5 · Slice 6, the routes whose contract the client copies by hand (D-117)

## Passages of the task and spec its *Read* names, word for word

### `.runs/task-cycles/reset-hasla/spec.md:77-91`

> ### Decision 1 — Two routes, no new refusal code
>
> - `POST /api/password-reset-message`: body exactly `{ email }`. Answers 204 with no body; a badly
>   written address gets 400 `invalid-email`.
> - `POST /api/password-reset`: body exactly `{ token, password, passwordConfirmation }`. Answers 204
>   with no body; refusals are 400 `invalid-password`, 400 `password-mismatch`, 400 `invalid-link`,
>   429 `too-many-attempts`.
> - Both paths join `paths`, so the transport gate and `Cache-Control: no-store` reach them, and both
>   join the list of routes behind `mutationGuards` with the 16 KiB limit. A body that is not exactly
>   the named string fields gets 400 `invalid-request`.
> - No new code in `refusalCodes`: every refusal above exists at the base.
>
> Rejected: 200 with a body for the request — a body is a place where an outcome can leak later, and
> nothing needs one; 202 — `noContentRequest` of the client already gives "only this status counts",
> and a second success kind costs a helper for no gain.

### `.runs/task-cycles/reset-hasla/spec.md:482-486`

> ### Decision 13 — The browser client
>
> `AccountClient` gains `requestPasswordReset(email)` and `setPassword(token, password,
> passwordConfirmation)`, both through `noContentRequest`, so only 204 counts as success (D-117).
> Nothing about an account comes back and nothing is kept.

## Foundation entries, each whole, by identifier and current range

- `foundations/decisions.md:2045-2059` D-117
- `foundations/decisions.md:1918-1930` D-108
- `foundations/invariants.md:808-817` account-client-requests
- `foundations/invariants.md:818-827` account-client-outcomes
- `foundations/environment_facts.md:256-261` fetch-same-origin-credentials

## Guideline files, each whole

- `guidelines/coding.md`
- `guidelines/coding-browser-api-client.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`

## Product files and method passages its *Read* names

- `src/browser/AGENTS.md`

## Return

Write your report to its path as the method gives. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
