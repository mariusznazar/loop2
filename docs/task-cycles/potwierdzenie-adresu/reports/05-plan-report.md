# Report — planner, task `potwierdzenie-adresu`

- Status: `done with concerns`
- Plan: `.runs/task-cycles/potwierdzenie-adresu/plan.md`
- Size report: `.runs/task-cycles/potwierdzenie-adresu/plan-size.md` — `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/potwierdzenie-adresu/plan.md`, exit 0, all ten slices `fits` (largest: Slice 2, about 126k estimated tokens, most of it `package-lock.json`, which it changes and so reads whole). The first run left Slice 9 `unchecked` (a spec range one line past the file's 542 lines); fixed, run again.
- Base: `7a633a7`; worktree clean; nothing committed; no code, test or foundation entry written; `npm test` not run.

## Open design choice (section 2)

None found. Reading the code shows the spec's design can be made as written. The choices the plan
takes are of how to make it, listed under *Choices* in the plan. Two of them follow from the code:

- `foundation_check.py` reports a part-map *Files* pattern that matches no tracked file
  (`.the-way/elements/common/foundation_check.py:47`, `:552`). So the claim of
  `tests/account-mail.test.mjs` (F31) is written by Slice 2, together with the file, and not by
  the foundation step.
- Making the mail settings required for any account configuration breaks every fixture that
  configures accounts: `tests/http.test.mjs:249`, `tests/transport.test.mjs:41`,
  `tests/startup.test.mjs:70`, `tests/invariants/account_container_support.py:96` (used by
  `tests/deploy/test_account_storage.py`, `tests/deploy/test_loop2_image_icons.py`,
  `tests/invariants/test_loop2_container_icons.py` and
  `tests/invariants/test_loop2_one_serving_process_container.py`), and the list of stripped
  settings in `tests/invariants/test_account_server_default_address.py:32`. Slice 4 changes them
  all together with the requirement.

## Slices

| Slice | Goal | Model | Risk |
|---|---|---|---|
| 1 | schema step 3 and the store of emailed links | same | trust boundary `src/server/**` · cannot be undone (schema step 3) |
| 2 | the mailer, exemplar of the kind `mail-sending`, its integration test, Nodemailer and `smtp-server`, part-map claim | same | trust boundary `src/server/**` · `package-lock.json` |
| 3 | coding guidelines of the kind `mail-sending` and its index row | cheaper | none |
| 4 | startup requires the mail settings and password file; every account fixture supplies them | cheaper | trust boundary `src/server/**` |
| 5 | the confirming route, the resend route, the send step, the policy's token and limits | same | trust boundary `src/server/**` |
| 6 | the browser client's calls | cheaper | none |
| 7 | the header row and the confirmation from the link | cheaper | none |
| 8 | the page of every state and the styleguide's „Wysyłanie…” | cheaper | none |
| 9 | `compose.yaml`'s third secret, the host-sharing test, both copies of the deploy skill | cheaper | none (`compose.yaml` and the skills are no trust boundary in the part map) |
| 10 | `guidelines/testing.md` for SMTP and the new routes | cheaper | none |

## Questions to the orchestrator (the plan does not wait for them)

1. **To do 13 and WAY-172 — the plan's row F32.** To do 13 says the new meaning of the testing
   guidelines is approved "tak, jak daje WAY-172". The task document does not settle that meaning,
   so if it is a new one, WAY-172 requires approval at a blocked draft request before any code
   that uses it — and the mailer's tests (Slice 2) use it.
   - Proposed answer: the foundation step judges F32 first. D-84 already says that "a test of
     file or HTTP failure uses real temporary files or a real local server", and that controlled
     responses "test reactions to forced failures without proving the replaced operation"
     (`foundations/decisions.md:1500`). The recipe *Doubles* of `guidelines/testing.md:311`
     allows a working simplification of a dependency. If the writer finds that these carry the
     meaning (a local SMTP server for the mailer, a stand-in mailer for the routes), no decision
     changes and nothing waits.
   - If the writer finds that D-84's "file or HTTP" does not cover SMTP, it proposes a change of
     D-84 and returns `blocked`. The blocked draft request then comes before Slice 2. Every slice
     depends on the foundation step anyway, so the whole cycle waits there.
   - Cost of the proposed answer if wrong: the mailer's tests are built on a meaning the human
     later rejects, and are redone.
2. **D-44's change (F4) and the styleguide text.** I took answer 3's approval of „Wysyłanie…”
   (WAY-172 in the task) as covering both the change of D-44 in the foundation step and the
   styleguide rule's text in Slice 8. If you read "przez skill `the-way-maintain-styleguide`" as
   requiring the rule's text in the foundation step too, move the styleguide file from Slice 8 to
   the foundation step's agent. Nothing else changes.

## Guidelines found missing or uncertain

- `guidelines/coding-browser-module.md` — its table *Files of this kind* lists ten view modules
  but not `src/browser/view/account-screen.ts`, `game-view.ts` or `body-row.ts`, and Slice 7's two
  new modules would also be missing. WAY-199 says that kind guidelines give a status beside "each
  file of the kind they list". It is uncertain whether every file has to be listed. The plan adds
  no rows. Proposed: name this in the request as a finding, and do not add rows in this cycle.
- `guidelines/coding.md:226` — „Wzorce zapisu gry i poczty powstaną przy pierwszych
  implementacjach.” Slice 3 updates it for mail.
- `guidelines/testing.md` — its rows count the routes ("dla trzech tras", "na czterech trasach";
  `:167`, `:197`–`:199`), and the integration recipe lists its test files one by one (`:309`).
  Every new route or test file therefore has to change these rows. Slice 10 makes those changes.
- No guideline file covers `src/server/configuration.ts` (no kind matches it, so only the general
  file applies) or the product's own skill `loop2-deploy`. The only check of the skill is
  `tests/agent_workflow/test_loop2_deploy_skill.py`, which checks that both copies are identical
  and contain no address. Nothing is missing in the template's sense; this note says what Slices 4
  and 9 rest on.

## Order and the styleguide's example

The styleguide's example (`guidelines/styleguide-browser-view.md:295-302`) gives this order:
environment and library, then values with their sources, then one screen, then its states. The
plan follows it with one step dropped. The client (Slice 6) plays the part of the library. No new
token or value is needed, so there is no values step. Then come the screen (Slice 7) and its
states on the kitchen-sink page (Slice 8).

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/SKILL.md` § "Execute, verify and review" and
  `.the-way/task-cycle/skill/planning.md`, `.the-way/task-cycle/skill/foundation_step.md` — to see
  how the plan's *Foundation entries* and the guideline work are dispatched.
- `.the-way/foundations/decisions.md` WAY-172, WAY-199, WAY-200, WAY-216 — to place To do 12 and 13
  and the exemplar's approval route.
- `.the-way/product-guidelines/reading.md`, `.the-way/elements/common/way_of_working.md` § "Reading
  the foundation" — to select each slice's *Read*.
- `.the-way/product-guidelines/{coding,styleguide,testing}/SKILL.md` — only the table of what the
  cycle's author writes.
- `.the-way/elements/common/foundation_check.py` header and its *Files* check — for F31.
- `.the-way/task-cycle/change/ui_check.md` — what a changed user interface's check asks.
- Product files beyond the named list, to name each slice's files:
  `tests/password-measurement.test.mjs:60-75`, `tests/invariants/account_container_support.py`,
  `tests/invariants/test_account_server_default_address.py:20-50`,
  `tests/invariants/test_loop2_host_sharing.py:425-450`,
  `tests/agent_workflow/test_loop2_deploy_skill.py:1-70`, `tests/deploy/test_account_storage.py`
  (grep), `tests/invariants/test_browser_view_framework.py` and
  `tests/invariants/test_account_server_express_http.py` (grep for checks of the dependency list),
  `src/browser/AGENTS.md`, `README.md` (grep), `package.json`, `scripts/test.py:1-60`.
- Foundation entries read whole beyond the handoff's list: D-28, D-36, D-38, D-45, D-49, D-73,
  D-79, D-83, D-85, D-88, D-100, D-102, D-103, D-106, D-107, D-110, D-113, D-116, D-138 (some only
  to confirm their range); invariants `player-self-registration`, `player-password-login`,
  `player-opaque-session-cookie`, `account-save-*`, `account-server-default-address`; glossary
  `blocked account`, `unit test`, `integration test`.
- Nodemailer 10 and the Outsider pages were not read: the plan only needs what the spec cites.
  Slice 2 allows its executor to read them and name the reach.

## Notes for the review of the plan

- **Files made by an earlier slice.** Some *Read* entries name files that do not exist at the base
  (`src/server/account-mail.ts`, `tests/account-mail.test.mjs`,
  `guidelines/coding-mail-sending.md`, `src/browser/view/email-status.ts`). They are written
  without backticks and marked "(made in Slice N)". The size script therefore does not count them.
  They are small.
- **Existing entries that the foundation step changes.** These are D-13, D-17, D-44, D-105, D-109,
  D-111, D-112, D-137 and the invariants of F14–F20. *Read* names them by their base ranges, which
  will move. Per `planning.md`, the handoff of each slice gives their current ranges.
- **Invariant checked only by review.** `email-verification-nonblocking` stays unchanged.
  Slices 5 and 7 keep it.
- **Container checks.** The checks that need Docker (Slices 4 and 9) count a run where every case
  is skipped as a failure (`scripts/test.py`: "No test executed"). The executors are told to
  report such a run as unchecked.
- **Base failure.** `tests/invariants/test_loop2_one_serving_process.py`, which fails on the base
  on this machine, is named as a check of no slice.
