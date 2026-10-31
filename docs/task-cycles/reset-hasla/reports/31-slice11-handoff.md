# Handoff — executor of Slice 11, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You make one slice of a plan, a fresh agent. Your
questions go to the orchestrator, never to the human; you return at your slice's end.

- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole;
  read a file it names when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/reset-hasla/reports/31-slice11-report.md`
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

## What earlier slices left for this one

- `guidelines/testing.md:168` still names the case "transport refuses both link routes before the
  session, the link or the mail service", now renamed to "transport refuses all three link routes…"
  (`tests/transport.test.mjs:244`); Slice 6 may have renamed it again: look the name up.
- The same table counts routes ("five", "six", "siedmiu trasach"); count them from the code.
- The password-hash guard on the session write and `password-reset-ends-sessions` are not named yet.
- A guideline rule cites only identifiers that exist; each new one is checked by a search.
- The foundation writer's map of invariants to test files stands in
  `.runs/task-cycles/reset-hasla/reports/06-foundation-report.md`, *Test files named by the plan*.

## Your section of the plan (`.runs/task-cycles/reset-hasla/plan.md`), word for word

### Slice 11 — The guidelines and the deploy skill after the change

- **Goal:** To do 14 stands. The rule „Trust boundaries” of `guidelines/testing.md` holds a row for the
  request for a link and a row for setting a password, both routes in the rows of Origin and JSON
  requirements, the route counts that changed, the new cases by their names in its row of
  `src/server/`, and the identifiers the change adds in its *Decision* and *Invariant* fields. Follows
  the column „The cycle's author” of the skill `the-way-maintain-testing-guidelines` and its
  template's section „Writing the file”; it settles no choice of its own, and one the task did not
  settle stops the slice. The coding guidelines follow what the entries and the code now say, as
  `.the-way/product-guidelines/reading.md` places in the current task, using only meanings the
  decisions already carry: `guidelines/coding-session-store.md`, *Callback po operacji*, names the
  expected password hash; `guidelines/coding-database-access.md`, *Stan konta w instrukcji zapisu*,
  names the password hash beside the block; `guidelines/coding-mail-sending.md`, *Wzorzec rodzaju* and
  *Jedna wiadomość dla jednego odbiorcy*, name the reset message; `guidelines/coding-browser-module.md`
  names `createFormNote` beside `createFormWarning`, and its *Files of this kind* gains the screen
  modules only where its wording says it lists them all. `.claude/skills/loop2-deploy/SKILL.md`, in
  *Account mail*, says the application sends both messages and that an agent does not press
  „Wyślij odnośnik” on the test server either; `.agents/skills/loop2-deploy/SKILL.md` follows word for
  word where that copy holds the same passage.
- **Change:** `guidelines/testing.md` · `guidelines/coding-session-store.md` ·
  `guidelines/coding-database-access.md` · `guidelines/coding-mail-sending.md` ·
  `guidelines/coding-browser-module.md` · `.claude/skills/loop2-deploy/SKILL.md` ·
  `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:77-91` Decision 1 — Two routes, no new refusal
  code · `.runs/task-cycles/reset-hasla/spec.md:578-580` Foundation entries, guidelines ·
  `.runs/task-cycles/reset-hasla/task.md:39-39` To do 14 ·
  `.the-way/product-guidelines/testing/SKILL.md:37-45` Where the skill works ·
  `.the-way/product-guidelines/testing/template.md:264-273` Writing the file ·
  `.the-way/product-guidelines/coding/SKILL.md:37-41` Where the skill works ·
  `.the-way/product-guidelines/coding/template.md:206-214` Writing the files ·
  `foundations/decisions.md:1864-1875` D-104 · `foundations/decisions.md:1931-1942` D-109 ·
  Foundation entries rows N1, N4, N5, I1, I2 and I3 ·
  `tests/http.test.mjs` · `tests/transport.test.mjs` · `tests/account-storage.test.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`. Every case the table names is
  looked up by its name in the test file it names, and the search is reported. A search of the five
  guideline files for each identifier they newly cite finds it in the foundation.
- **Depends on:** Slice 1 · Slice 2 · Slice 4 · Slice 5 · Slice 6 · Slice 8

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

### `.runs/task-cycles/reset-hasla/spec.md:578-580`

> Guidelines: `guidelines/styleguide-browser-view.md` through `the-way-maintain-styleguide` (To do 11);
> `guidelines/testing.md` through `the-way-maintain-testing-guidelines` (To do 14): the rows of both
> routes, both in its Origin and JSON rows, and the route counts that change.

### `.runs/task-cycles/reset-hasla/task.md:39-39`

> 14. Tabela uprawnień i granic zaufania w `guidelines/testing.md` (reguła „Trust boundaries”) dostaje wiersze prośby o reset i ustawienia hasła, a jej wiersze wymagań Origin i JSON wymieniają obie nowe trasy, przez skill `the-way-maintain-testing-guidelines`, z testami odmowy oznaczonymi niezmiennikiem.

## Foundation entries, each whole, by identifier and current range

- `foundations/decisions.md:1864-1876` D-104
- `foundations/decisions.md:1931-1943` D-109
- `foundations/decisions.md:3896-3948` D-214
- `foundations/decisions.md:3996-4029` D-217
- `foundations/decisions.md:4030-4070` D-218
- `foundations/invariants.md:1038-1047` password-reset-verified-email
- `foundations/invariants.md:1048-1057` password-reset-link
- `foundations/invariants.md:1058-1067` password-reset-ends-sessions

## Guideline files, each whole



## Product files and method passages its *Read* names

- `.the-way/product-guidelines/testing/SKILL.md:37-45`
- `.the-way/product-guidelines/testing/template.md:264-273`
- `.the-way/product-guidelines/coding/SKILL.md:37-41`
- `.the-way/product-guidelines/coding/template.md:206-214`
- `tests/http.test.mjs`
- `tests/transport.test.mjs`
- `tests/account-storage.test.mjs`

## Return

Write your report to its path as the method gives. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
