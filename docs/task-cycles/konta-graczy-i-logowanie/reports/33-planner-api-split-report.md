# Planner report — returned account API slice split

Status: done with concerns.

The returned current Slice 6 is now three sequential responsibilities: session lookup/logout (6), credential transitions with admission lifetime (7), and permission/invariant evidence reconciliation (8). Completed Slices 1–5 remain; old Slices 7–11 become 9–13. No implementation, test, foundation entry or commit was made.

## Identity and outputs

Working directory: C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie. Current reviewed head and next-slice base: 1e8a9bf1153d8cd7c58fcab210b51516ff760532. Original task base remains 7012abcfb55b4ba2b2836b574a2275eb1551df28. Process checkout and gitlink both equal 574a37b9ab9572f876298f4cc10754581222d3f0.

Only these ignored files were written:

- [Revised plan](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/plan.md).
- [Final size report](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/plan-size.md).
- [This full report](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/reports/33-planner-api-split-report.md).

The no-code return requires no reset. I did not read cycle.md, inspect or copy the discarded historical startup implementation, import upstream changes, dispatch an executor or operate the target. The next action belongs to root.

## Responsibilities and size

| New slice | Independently reviewable result | Changed files | Estimated tokens | Verdict |
|---|---|---:|---:|---|
| 6 | Canonical route assembly; session-authoritative account lookup and destroy-before-success logout; session permission/refusal rows | 7 | 110492 | fits |
| 7 | Credential validation and messages; reservation/native-work/persistence lifetime; first account-policy exemplar, kind/index and evidence | 10 | 168555 | fits |
| 8 | Complete permission table, mental-mutation record and invariant status reconciliation from real evidence | 2 | 105263 | fits |

All thirteen slices fit the pinned script's ten-file and 250000-token limits. There is no unchecked path in its final result. The earlier 169420-token figure was the concrete returned handoff's supplied measurement, not a failed size command run by me.

The credential slice still reads a substantial amount. Its first exemplar requires changing the current decision log, which the size tool counts whole; that existing file alone has 172125 characters. The invariant file contributes another 26271 characters. Those files cannot be hidden behind selected ranges when they are Change. The reduction is in implementation responsibility: lookup/logout and final permission reconciliation have separate owners, while coupled admission and durable credential transitions stay together. A fitting estimate remains no guarantee of an executor's practical capacity; an additional required path or demonstrated overload must return to root for another coherent cut.

The original materialized reading is preserved across the new responsibilities, not copied indiscriminately to every executor. Slice 6 selects session/transport contracts, current Store/database/configuration/transport code, installed session lifecycle sources and storage/transport evidence. Slice 7 carries credential/password/admission contracts, the current full implementation interfaces and first-kind maintenance. Slice 8 reads the settled permissions, reached complete entries, source/tests and actual implementation evidence. Existing HTTP tests are whole Change files for both code slices; the former missing transport path is therefore counted. All old selected supporting material remains represented by at least one new Read or Change, including the storage report/assertions and reviewed startup mutation helpers. The global foundation index is not assigned wholesale as 92 groups to each agent.

Unborn account-routes/policy implementations, policy guidelines and new author/review/mutation evidence must be materialized at the corresponding dispatch. Each section explicitly requires those paths and a fresh size run at its actual base. No future file or log is presented as already measured.

## Canonical endpoints and retained controls

The reviewed spec's four endpoints remain authoritative: POST /api/accounts, POST /api/session, GET /api/account and POST /api/logout. The existing register/login placeholder names do not create a design question or an alias contract.

Slice 6 corrects canonical routing while credential handlers remain guarded/unavailable until Slice 7. It owns the configured unauthenticated GET /api/account expectation changing from 503 to 401. Both slices explicitly own tests/transport.test.mjs: the registration guard cases must target /api/accounts, and the accepted-media login control must target /api/session and then evolve from temporary 503 to the required credential-structure refusal when Slice 7 implements it. No refusal or accepted-input assertion is removed, weakened or moved to game the count.

I independently inspected tests/startup.test.mjs:403–406. Its account request supplies no trusted proxy metadata and must remain 403. That finding adds no startup-file Change. Existing unknown-API, static-file/traversal, cookie attributes, session renewal and transport controls remain required.

Slice 6 authorizes only through the stored session, projects public account fields, checks no-store, awaits logout destruction and preserves other browsers. Slice 7 keeps reservations with actual native completion after disconnect and with the persistence boundary; tests must distinguish release on completed work from release merely because the client disappeared. Save failure must not issue a success cookie or remove the valid account; later login must work. There is no asynchronous database transaction.

## Numbered coverage and completed-work preservation

Direct in-memory comparison with the original plan found no text change in completed Slices 1, 2 or 4. Slice 3 differs only in its forward durability reference, old 10 to new 12. Slice 5 differs only in its temporary-route forward reference, old 6 to new 6–7. Their goals, Change lists, selected sources, models, risks, checks and dependencies otherwise remain unchanged.

Every successor dependency is sequential: 6 depends on 5; 7 on 6; 8 on 7; browser client 9 on 8; controls 10 on 9; shell 11 on 10; image evidence 12 on 11; operating instructions 13 on 12. Other later-slice content is preserved apart from corresponding forward labels.

The foundation and coverage tables now assign:

- Registration, credential validation, required messages and admission limits: 7; browser display/journey: 11.
- Lookup/logout and direct session refusal: 6; credential guard behavior: 7; full permission/evidence reconciliation: 8.
- Session establishment/lifecycle: 2, 5, 6 and 7; browser evidence: 11.
- First account-policy kind/exemplar/index: 7; browser client kind: 9.
- Shared waiting controls/styleguide: 10, then account shell: 11.
- Target-profile preparation and local durability evidence: 12; human operating/acceptance instructions: 13.
- Permission-table maintenance has an initial owner in 6 and explicit completion owner in 8. Neither requirement disappears between code slices.

All To do 1–18, K1–K13, projected decisions/invariants and human acceptance rows remain mapped. Historical report filenames and task numbers 16/17/19/20/21 were not renumbered as if they were slices.

## Guideline findings, sources and reading reaches

No new unresolved design choice was found. Current coding/testing and HTTP/password/database/Store guideline files were read whole. account-policy remains the expected missing first-kind file, owned with its implementation by Slice 7; it is not a waiver or an unexpected missing prerequisite.

The current branch's testing documents predate the target's adopted policy. The supplied target-advance memo and reconciled spec already settle that matter: PR 31 at origin/main 2c1d64c adopts the mutation rule and changes the test gate. The plan preserves that rule for final integration, including consistent resolution of colliding account/upstream D-94/D-95 identifiers through the element methods. There is no request for a fresh tool choice and no merge underneath this planning or the next author.

The existing styleguide order remains unchanged: reuse established fonts/tokens; controls and kitchen-sink states in new Slice 10 precede application states in new Slice 11. Backend prerequisites explain their later position. This server-only split departs from no UI order or styleguide instruction.

Controlling inputs were the complete dispatch 33, original planning authority 06, frozen task, current reviewed/reconciled spec, complete current plan, returned report 32 and its source-resolution handoff, and target-advance report 29a. Current code was the source for interface and file-count choices, not causal claims taken from author prose.

Selective reaches used to make the cut and their purpose:

| Source reached | Why it mattered |
|---|---|
| src/server/app.ts and tests/http.test.mjs, whole; tests/transport.test.mjs, whole | Canonical-path mismatch, temporary status controls, actual HTTP ownership and helper deadlines |
| src/server/configuration.ts, transport.ts, database.ts, session-store.ts and passwords.ts, whole | Existing runtime, verified-client, Store and native-gate interfaces; keep the coupled lifetime inside the correct files |
| tests/startup.test.mjs:391–420 | Confirm unchanged missing-proxy 403 instead of adding an unjustified twelfth path |
| tests/account-storage.test.mjs:1–290 and reports/15-slice2-report.md:11–19, reports/17-slice2-fix-report.md | Existing schema, expiry, renewal and destroy behavior supporting the session boundary |
| reports/29-startup-report.md:18–31 and complete reports/30-startup-review.md | Current assembly interface, exact-head verification, known limitations and selective prior evidence |
| .runs/account-linux-inputs/verify-startup29-mutation.sh and mutate-startup29.py | Existing actual mutation/restoration evidence route; these are the current reviewed helpers, not discarded implementation |
| Selected complete account decisions D-94–D-113, D-28/D-37 and supporting entries; complete account invariants and relevant part-map/environment entries named in Read | Correct boundaries, status/debt and ownership; identifiers/ranges are preserved in the plan, not replaced by summaries |
| .the-way/product-guidelines/coding/template.md, Files of this kind; coding maintenance method; current coding-http-application.md | Determine whether adding the existing-kind route copy forces another Change path |
| .the-way/elements/common/way_of_working.md, foundation-reading section, and product-guidelines/reading.md | Select complete entries and whole relevant guidelines without turning the global index into every executor's reading |
| reports/26-planner-split-report.md, styleguide-order passage | Check the unchanged controls-before-shell ordering of the previous plan |

The pinned coding template explicitly says a file added after an audit takes no copy-list row until the guidelines are refreshed or extended. Therefore adding account-routes.ts as an HTTP-kind copy does not itself require changing coding-http-application.md. The new account-policy kind is different: its exemplar and kind/index work stay with the first implementation. This distinction avoids inventing an extra mandatory file while preserving the actual first-kind rule.

## Choices and costs

The plan records these implementation choices, not new product decisions:

1. Split the returned API responsibility into 6/7/8. Leaving it as one slice requires eleven changed paths and leaves the original executor overload intact. The split costs two additional author/full-gate rounds; the two code slices each receive independent trust-boundary review instead of one broad review.
2. Keep reservations, native completion after disconnect and persistence-before-success in Slice 7. Cutting across that lifetime would make local completion appear correct while another stage still releases capacity too early or announces success before storage. Keeping it together carries more concurrent cases for that author, but permits one real HTTP/DB argument about the complete operation.
3. Let Slice 8 reconcile documentation from observed evidence. Deferring that responsibility without an owner would leave stale permission rows or unearned invariant marks. A named consumer costs an extra full-gate/doc round and must send missing behavior or proof back to root rather than manufacture a pass.
4. Preserve the natural HTTP test files. Omitting the transport file or moving unrelated assertions would hide required work; counting both costs a shared-file dependency in both code slices and keeps the regressions visible.
5. Retain cheaper as the documentation model; use same for 6 and 7 because session callback/destruction sequencing and coupled reservation/persistence lifetime each require ordinary implementation choices. Security labels alone are not the reason for the model choice. Both code slices are trust-boundary work; the documentation-only slice has Risk none and remains subject to whole-change review.

## Checks performed and limits

All commands below ran from the declared worktree.

| Command/check | Result |
|---|---|
| git rev-parse HEAD | Exit 0; 1e8a9bf1153d8cd7c58fcab210b51516ff760532 |
| git -C .the-way rev-parse HEAD | Exit 0; 574a37b9ab9572f876298f4cc10754581222d3f0 |
| git ls-files --stage -- .the-way | Exit 0; matching mode-160000 gitlink |
| git status --short | Exit 0; empty |
| git diff --check | Exit 0; no tracked whitespace change |
| python -B .the-way/task-cycle/slice_size.py docs/task-cycles/konta-graczy-i-logowanie/plan.md | Exit 0; all 13 fit, no unchecked paths |
| Same exact size command invoked through an ASCII Python subprocess wrapper to save stdout as UTF-8 plan-size.md | Exit 0; preserved that existing file's newline convention |
| UTF-8 byte read of saved plan and JavaScript comparison against the intended draft | Exact match; 13 consecutive numbered headings; original LF endings retained |
| JavaScript comparison of each completed Slice 1–5 against the pre-edit plan | Only the two necessary forward-reference changes described above |
| JavaScript comparison of old Slices 7–11 with new 9–13 | All content preserved except numbering and the new immediate predecessor of browser-client work |
| git check-ignore docs/task-cycles/konta-graczy-i-logowanie/plan.md docs/task-cycles/konta-graczy-i-logowanie/plan-size.md docs/task-cycles/konta-graczy-i-logowanie/reports/33-planner-api-split-report.md | Exit 0; all three outputs ignored |
| Python byte-read/decode assertions for the three output files, final size rows and replacement characters | Exit 0; valid UTF-8, 13 fits, no unchecked row or replacement character |

No npm test, foundation check, mutation, restoration, benchmark, container runner or target operation ran solely for planning. No new passing behavior or product failure is claimed. The supplied exact-head baseline is 377 Node and 278 Python tests, three native-Windows skips, foundation 0 and independent startup PASS with zero findings; it was not repeated or promoted to proof of the pending API.

Read-command diagnostics were corrected rather than used as absence evidence. At the first resumed call the stored worktree variable was missing, so three report reads targeted the default checkout and failed with exit 1; the explicit worktree was set and the supplied files were read. Guessed coding-method/kind-template paths were absent; rg --files identified the real coding method/template. An attempted plan-task/SKILL.md path exited 1; the wrapper located task-cycle/plan/SKILL.md, which was then read completely. A later search included an incorrectly guessed historical planner-report filename and exited 1; the existing report 26 contained the unchanged style-order passage, so no claim relies on the missing name. Combined outputs that truncated relevant material were reopened in smaller passages. These are inspection diagnostics, not failed repository tests.

## Concerns and stop boundary

Root must materialize new dependency files and evidence at each actual dispatch and rerun size. A fitting planning estimate does not waive the ten-file limit or an author's concrete size return.

The full account-save-durable-storage promise includes saved game states and remains debt. Local account/session evidence cannot clear it. Exact deployed-image Argon2 acceptance, provider settings and the public account/browser journey remain unchecked; three native-Windows checks remain skipped in the supplied Linux baseline. Secret creation/private copy/rotation, deployment and target measurement remain prepared human actions. Final reconciliation must preserve upstream policy/gate and report the actual merged result.

No open question needs a human answer or blocks this revised plan. Return to root before implementation.

