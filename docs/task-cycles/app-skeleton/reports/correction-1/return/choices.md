# Autonomous choices — classification (return step, correction 1)

Test for every choice: does the cost of being wrong reach beyond this pull request? If yes and the
rule still binds after the merge (WAY-36) → foundation proposal (in
`UNAPPROVED-proposed-foundation-against-ab34d90.patch`); if yes but nothing binds after the merge
→ question under *To decide* (T-numbers of `return-step.md`); if no → stays a choice within the
request. All choices below are provisional orchestrator or agent choices, none is the human's
approval.

Sources: **F** = first-run log `.runs/task-cycles/app-skeleton/prev-run/reports/autonomous-choices.md`
(row order); **B/C** = `cycle.md` questions table; **FQ** = foundation step's questions answered
in `cycle.md` ("Answers to F"); **CQ** = check author's questions (`check-author.md`), whose root
answers are not recorded in `cycle.md` — classified on the check author's proposed answers;
**R** = other choices recorded in `cycle.md` events of correction 1.

| # | Choice | Source | Reaches beyond the PR? | Binds after the merge? | Route | Cost if wrong |
|---|---|---|---|---|---|---|
| F1 | Separate task branch and sibling worktree from origin/main | F row 1 | no | no | within the request | local disk space for the worktree |
| F2 | Source-only foundation route; binding files unchanged | F row 2 | yes — it kept the projected entries the code made true out of the foundation | — | superseded: the human's review comment ordered the WAY-126 route; correction 1 wrote them | already paid: this correction |
| F3 | One npm package and lockfile, two TypeScript configurations, Node script copying the HTML; no bundler, no workspaces | F row 3 | yes — every later task builds on this layout | yes, if accepted | foundation proposal: D-06/1 + `application-build-layout/1` + `application-build-output/1`, reworded after the critique without the HTML-copy mechanism (T6) | moving to a bundler or workspaces later needs a new version of D-06 and a migration of the build |
| F4 | Native ESM, ES2022, NodeNext; DOM types only in the browser build, Node types only in the server build | F row 4 | no — the type separation is carried by D-06; the module settings change in one configuration while the code is small, and the compiler flags every import that a change affects | no | within the request | a configuration change plus import fixes the compiler lists |
| F5 | Fixed 127.0.0.1:3000; `npm run dev` builds then serves; manual restart | F row 5 | port: yes — the read-only invariant checks start the server on that address (`loop2_invariant_support.py:24-25`, and since `2544a6a` fail if the port stays held, `:278`); a container needs another bind address. dev/restart: no | port: only through the checks, not as a rule anyone chose; dev/restart: no | To decide T7 (port); within the request (dev, restart) | the deployment task changes `main.ts` and has to reopen the foundation step for the checks' support module; a developer running `npm run dev` during a gate run gets a false failure |
| F6 | `/api` and every path under it → JSON 404 for all methods, HEAD without body; other missing paths → plain 404 | F row 6 | `/api/` part: yes | `/api/` part: yes — now bound by projected `loop2-api-error-route/1` (written), and its check reads "API error response" as JSON; `/api` without slash and the plain 404 elsewhere: no | foundation (written entry) + To decide T7 (JSON reading); within the request for the rest | a later API error format that is not JSON fails the accepted check |
| F7 | TypeScript 6.0.3 instead of the latest 7.0.2 ("classic compiler can run via Node without native platform dependencies") | F row 7 | yes — later code is compiled by it; an upgrade later is a compiler major change over more code | no — no entry or check names the compiler major | To decide T8 | the later upgrade costs more the more code exists; what 7.x changes for this build is not established in this record |
| F8 | `@types/node` 24.19.0 instead of 24.19.1 (npm release-age policy) | F row 8 | no — a patch level; the runtime check binds only major 24 (`test_account_server_runtime.py:30,72`) | no | within the request | a later patch update |
| F9 | One integrated implementation unit, fresh task and final reviewers | F row 9 | no | no | within the request | review sees configuration, page and HTTP together |
| F10 | Assertion-level TDD RED after a compilable setup | F row 10 | no | no | within the request | one extra setup build |
| F11 | Non-recursive `rmdir` for the test's empty directory; scratch kept | F row 11 | no | no | within the request | a visible cleanup failure |
| F12 | Raw HTTP paths for traversal tests; browser check through local Playwright/Chromium | F row 12 | no | no | within the request | other browsers and POSIX unchecked in this request |
| F13 | Handle the listen error; subprocess regression test for an occupied port | F row 13 | yes — a container's restart rule will rely on a non-zero exit | yes, if accepted | foundation proposal `account-server-occupied-address/1`, "without printing its readiness line `Loop: <address>`" after the panel; whether it rides in this change is T6.1 | without it only an ordinary test guards the behaviour, and an implementer may change that test |
| F14 | Startup test tolerates an existing listener on 3000 without closing it | F row 14 | no | no | within the request | a bounded, visible test failure if that listener disappears mid-test |
| F15 | Keep `dist/` between builds instead of deleting it | F row 15 | no — `dist/` is ignored by git; the invariant checks and any deployment build from a clean copy | no | within the request | a stale local file served after a rename, visible and removable |
| F16 | Exclusions and untested environments stated explicitly | F row 16 | no | no | within the request | none beyond what is stated |
| F17 | First-run return proposal set (one decision, five parts, six invariants, methods `TODO`) | F row 17 | yes | — | superseded: re-evaluated in `return-step.md` §2 | — |
| F18 | No glossary term or environment fact proposed | F row 18 | yes — a missing term or fact would leave the foundation short | — | re-evaluated in `return-step.md` §3.3–3.4: still none | — |
| B1 | Task branch | `cycle.md` B1 | no | no | within the request (human-authorized) | none |
| C1 | Which projected entries the code makes true whole (fact, D-01, D-02, D-03, five invariants); "What runs …" treated as whole although no deployment exists | `cycle.md` C1 | yes | yes | foundation: written whole with *Approved by* from the gate record (`22dbff4`); the human sees them at the request | an entry written before its code would bind wording the code does not carry; an entry left out would leave the foundation behind the code |
| C2 | Parts of entries true now go as proposals only (D-04, D-05) | `cycle.md` C2 | yes | yes, if accepted | foundation proposals D-04/1, D-05/1 (T2, T3); `loop2-one-serving-process/1`, since proposed by the foundation step (T5); after the critique also partial D-07/1 for D-01's relation (T4 E) | shortened wording mistaken for approved wording |
| C3 | Decision numbering order D-01..D-03 | `cycle.md` C3 | no — numbers carry no meaning; renumbering is free before the merge | no | within the request | none after the merge |
| C4 | Deferred fields: *Scope* `TODO`, *Relations* `TODO`, *Derives from* `TODO`, *Part* `every` | `cycle.md` C4 | yes — the main branch takes no `TODO` there | — | To decide (`return-step.md` §5, T1a–T1c, T2–T4); *Part* `every` kept for all written invariants after the panel (fix 8) | the merge stays blocked |
| FQ1 | D-02 *Verification* `invariant:` → `invariants:` | foundation step Q1 | no — one letter outside the binding part, fingerprint unchanged | — | within the request; shown in T10 | none |
| FQ2 | `account-server-runtime` *Rests on* kept `none` | foundation step Q2 | no — a schedule change still flags D-01 through its *Based on* | — | within the request (gate wording) | the invariant itself would not be flagged by a schedule change |
| FQ3 | `program rule` and `trip plan` left unwritten | foundation step Q3 | no — the glossary guard requires a use outside the glossary; terms arrive with their first use | — | within the request; shown in T9 | `program`'s definition leans on two undefined words until then |
| FQ4 | Keep the word `program` despite its second meaning in the-way's templates | foundation step Q4 | yes — a later rename touches D-03 by a new version | yes | To decide T9 | rename later instead of now |
| FQ5 | Unapproved wording in D-04/D-05 goes to the request | foundation step Q5 | — (routing) | — | forwarded: T2, T3, T5 (D-05's level 2 pair since replaced by `loop2-one-serving-process`) | — |
| FQ6 | Merge readiness depends on the part map and the work-split decision | foundation step Q6 | — (routing) | — | forwarded: `return-step.md` §5, T1, T4 | — |
| CQ1 | Typecheck check fails while any deployment file exists (tripwire) | check author Q1 | yes — the first Dockerfile, CI workflow, `.nvmrc` or platform file fails `account-server-typecheck` | yes, through the accepted test (`test_account_server_typecheck.py:90-93`) | part of the invariant test awaiting acceptance; To decide T7 | the deployment task, or any task adding a plain CI workflow, must return to the foundation step to extend the check |
| CQ2 | No `data:` lines in the checks | check author Q2 | no | no | within the request | none (WAY-69) |
| CQ3 | The support module counts as an invariant test file (read-only during implementation) | check author Q3 | yes — it freezes the port, the copy rules and the deployment patterns for implementers | yes | To decide T7 | changing any of them needs a foundation step |
| CQ4 | `/api` without the trailing slash left out of the check | check author Q4 | no — the human withdrew `unmatched-api-response` | no | within the request | `/api` may change without a failing check |
| CQ5 | "API error response" read as status 400–599 with a JSON media type and JSON body | check author Q5 | yes | yes, through the accepted test | To decide T7 | a non-JSON API error later fails the check although the sentence allows it |
| CQ6 | Express check relies on the `router` package's debug line | check author Q6 (accepted by the orchestrator) | yes — a router upgrade that changes the line fails the check | yes, through the accepted test (`test_account_server_express_http.py:44,144`) | To decide T7 | a loud false failure on upgrade; the fix needs a foundation step |
| CQ7 | `.tsx` counted as a UI-framework format; jQuery not a UI framework | check author Q7 | yes — a later JSX/TSX view without a framework fails the check | yes, through the accepted test | To decide T7 | a foundation step to change the check if TSX is wanted |
| R1 | Record in the new form: spec, plan and frozen task moved into the record; first-run docs removed (`77a3754`) | `cycle.md` "Record form" | no | no | within the request (human-ordered) | none |
| R2 | Code redo done by an implementer who had read the code before setting it aside | `cycle.md` "Redo against checks" | no — the redo came out byte-identical; only the evidence of independence is weaker | no | within the request; state it in the request | the checks' coverage evidence rests on the separately written checks and breaks, not on the redo |
| R3 | Orchestrator read the check-fix diff instead of a second reviewer | `cycle.md` "Break reruns on fixed checks" | no | no | within the request; state it in the request | a missed defect in the 2544a6a fixes |
| R4 | Merge of origin/main with `--no-ff` | `cycle.md` "Merge target" | no | no | within the request (human-ordered) | none |
| R5 | Check fixes left code-review Minor 5 (import pattern may match prose) and Minor 7 (run time about 28 s) | `check-author.md` "After code review" | no — a rare, loud false failure; run time | no | within the request | an occasional false failure to read |

Totals (41 rows): 5 to the foundation (F3, F6, F13, C1, C2), 9 to *To decide* (F5, F7, C4, FQ4,
CQ1, CQ3, CQ5, CQ6, CQ7), 3 superseded or re-evaluated in this step (F2, F17, F18), 2 forwarded
questions (FQ5, FQ6), 22 within the request.
