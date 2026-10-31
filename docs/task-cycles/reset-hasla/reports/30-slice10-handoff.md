# Handoff — executor of Slice 10, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You make one slice of a plan, a fresh agent. Your
questions go to the orchestrator, never to the human; you return at your slice's end.

- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole;
  read a file it names when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/reset-hasla/reports/30-slice10-report.md`
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

### Slice 10 — The states on the kitchen-sink page and in the styleguide

- **Goal:** To do 11 stands, D-44 having been written with the entries. `formSample` of the
  kitchen-sink page shows both new forms waiting and with a refusal under them, and the request form
  with its sentence, importing `createFormNote` from `controls/text-field.ts`. The styleguide's rule
  „States of shared controls” holds the two waiting texts and the sentence in `text-secondary` under
  the request form as what it is, no refusal, and its rule „The kitchen-sink page”, which lists the
  forms the page shows, holds the new ones. Follows the column „The cycle's author” of the skill
  `the-way-maintain-styleguide` and its template's section „Writing the file”; it settles no meaning
  of its own, and one the task did not settle stops the slice.
- **Change:** `src/browser/kitchen-sink/kitchen-sink.ts` · `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:495-500` Decision 15 — Kitchen-sink and style ·
  `.runs/task-cycles/reset-hasla/spec.md:578-580` Foundation entries, guidelines ·
  `.runs/task-cycles/reset-hasla/task.md:36-36` To do 11 ·
  `.the-way/product-guidelines/styleguide/SKILL.md:33-41` Where the skill works ·
  `.the-way/product-guidelines/styleguide/template.md:172-183` Writing the file ·
  `foundations/decisions.md:799-812` D-38 · `foundations/decisions.md:814-827` D-39 ·
  `foundations/decisions.md:829-842` D-40 · `foundations/decisions.md:889-902` D-44 ·
  `foundations/decisions.md:904-917` D-45 · `foundations/decisions.md:1570-1581` D-87 ·
  `foundations/decisions.md:1583-1594` D-88 ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `src/browser/AGENTS.md` · `src/browser/view/account-screen.ts` ·
  the reset screen's file, as Slice 9 created it ·
  `src/browser/view/controls/text-field.ts` · `src/browser/kitchen-sink/kitchen-sink.css` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** **How the slice shows its states:** the page itself: `node scripts/kitchen-sink.mjs
  --build-only` builds it and `npm run kitchen-sink` serves it on the developer's machine; the
  report names what was seen of each new sample and its text roles, or marks it unchecked with its
  reason where the harness has no browser.
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py`,
  `npm test -- tests/invariants/test_browser_view_token_values.py`,
  `npm test -- tests/invariants/test_browser_view_focus_outline.py`,
  `python -B .the-way/elements/common/foundation_check.py`, `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 8 · Slice 9

## Passages of the task and spec its *Read* names, word for word

### `.runs/task-cycles/reset-hasla/spec.md:495-500`

> ### Decision 15 — Kitchen-sink and style
>
> `formSample` in `kitchen-sink.ts` gains the two new forms waiting and with a refusal, and the request
> form with its sentence (To do 11). Stylesheet rules of `.form-note` and of the one-form layouts use
> existing tokens. `.confirmation-notice` carries both notices of the reset, so no new rule is needed
> for them.

### `.runs/task-cycles/reset-hasla/spec.md:578-580`

> Guidelines: `guidelines/styleguide-browser-view.md` through `the-way-maintain-styleguide` (To do 11);
> `guidelines/testing.md` through `the-way-maintain-testing-guidelines` (To do 14): the rows of both
> routes, both in its Origin and JSON rows, and the route counts that change.

### `.runs/task-cycles/reset-hasla/task.md:36-36`

> 11. D-44, reguła „States of shared controls” w `guidelines/styleguide-browser-view.md` i strona wszystkich stanów dostają napisy „Wysyłanie…” przycisku „Wyślij odnośnik” i „Ustawianie…” przycisku „Ustaw hasło” oraz oba nowe formularze czekające na serwer i ze zdaniem odmowy pod nimi, a także formularz „Nie pamiętam hasła” ze zdaniem w `text-secondary` po prośbie, przez skill `the-way-maintain-styleguide`; nowe znaczenie zatwierdził człowiek w pytaniach 1, 4 i 13 (WAY-172).

## Foundation entries, each whole, by identifier and current range

- `foundations/decisions.md:799-813` D-38
- `foundations/decisions.md:814-828` D-39
- `foundations/decisions.md:829-843` D-40
- `foundations/decisions.md:889-903` D-44
- `foundations/decisions.md:904-918` D-45
- `foundations/decisions.md:1570-1582` D-87
- `foundations/decisions.md:1583-1595` D-88
- `foundations/invariants.md:498-507` application-build-kitchen-sink

## Guideline files, each whole

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`

## Product files and method passages its *Read* names

- `.the-way/product-guidelines/styleguide/SKILL.md:33-41`
- `.the-way/product-guidelines/styleguide/template.md:172-183`
- `src/browser/AGENTS.md`
- `src/browser/view/account-screen.ts`
- `src/browser/view/controls/text-field.ts`
- `src/browser/kitchen-sink/kitchen-sink.css`

## Return

Write your report to its path as the method gives. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
