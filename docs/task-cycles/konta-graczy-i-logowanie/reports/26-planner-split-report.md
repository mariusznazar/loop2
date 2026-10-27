# Planner report — split the oversized startup slice

Status: **done with concerns**. Planning only; no open design choice or human question blocks the revised plan.

Worktree: C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie.
Branch: task/konta-graczy-i-logowanie.
Original task base: 7012abcfb55b4ba2b2836b574a2275eb1551df28.
Current reviewed/reset base: c9af9d4521895fe6fe98ae96ccbc7035e4cea350.
Pinned process checkout and gitlink: 574a37b9ab9572f876298f4cc10754581222d3f0.

Output paths, relative to that worktree:
- docs/task-cycles/konta-graczy-i-logowanie/plan.md
- docs/task-cycles/konta-graczy-i-logowanie/plan-size.md
- docs/task-cycles/konta-graczy-i-logowanie/reports/26-planner-split-report.md

## Authority and scope

Read the split handoff, original planning authority/source answer, whole frozen task, reviewed spec, current plan and report 25. Followed the project plan-task entrypoint and its pinned method, and implement-task's controlling paragraph “A slice that proves too large”. The discarded attempt's historical SHA is not an implementation input: no historical code, diff or file was inspected or copied. cycle.md was not opened.

Only the three authorized ignored planning files are written. No product, test, guideline, foundation, vault or global file changes; no commit, server action or executor dispatch. Earlier reviewed work stays at the supplied base.

## Revised cut and coverage

New Slice 4 changes only tests/invariants/test_loop2_container_icons.py. Its existing bare production docker run lacks the resources required by D-109. The existing start_production_container helper already provides isolated production settings, synthetic signing-file and database volumes, node ownership checks, read-only secret grant, no published port, 512 MiB and cleanup. This is sufficient for a one-file preparation; the helper and fixture already have part ownership. Every SVG status/exact-source-byte assertion and nonempty input check remains required.

New Slice 5 is former Slice 4 with the identical ten Change paths. It follows the fixture preparation. All 80 previously materialized Read paths/ranges remain, and nine additional selections cover the dummy-hash contract, installed Express protocol/version, session version, icon fixture and corresponding existing fixture, Linux harness, report 25 and this source-verification report. The helper was already selected. D-109 and the current default-address invariant already carry the conditional precondition; the maker adapts the existing single test and evidence without repeating the sentence amendment.

Former Slices 5–10 become 6–11: account API, browser client, shared controls, authenticated shell, image measurement/durability, and deployment instructions respectively. Dependencies, foundation ownership references, coverage and choices use those numbers. Foundation F11/F14/F22 and coverage now also identify the new fixture preparation. No foundation entry or task obligation was added or removed.

Slices 1 and 2 are byte-identical. Slice 3's content is identical except its necessary forward reference “Slice 9” becomes “Slice 10” for account replacement evidence. Its Change, Read, model, risk, checks and dependency are untouched. This is a label correction, not reopening completed work.

The full saved-game wording of account-save-durable-storage remains debt. Local account/session preservation cannot clear it. Future writers 16/17/19/21, mail/reset/blocking/backup exclusions, default-address single-test restriction and the final blocked-draft human actions remain unchanged.

## Choice, alternative and cost

Use the existing helper in a one-file preparatory Slice 4, then implement the original ten-file startup responsibility as Slice 5. Leaving preparation unchanged breaks the full gate once required production validation lands. Adding it to startup exceeds the ten-file cap. A developer-mode bypass would stop checking the actual production configuration; another helper would duplicate already reviewed setup. The chosen split costs one additional full-gate run and independent review, with no added abstraction or lasting product contract.

Model for new Slice 4 is cheaper: this applies a settled, already reviewed pattern. Risk remains trust boundary for the actual production resource setup, including credential grant, writable storage and container startup. Its file belongs to deployment; the helper belongs to build-tools. This does not falsely label the test path itself a new part-map boundary, and does not waive independent review because the edited file is a test. Original startup model same and trust-boundary risk remain justified by coupled configuration, HTTP and session lifecycle.

The preparatory slice does not manufacture a red result against the pre-validation base: absence of these resources becomes a readiness failure only after Slice 5. It preserves existing assertions, exercises their real production setup through the full gate, and names the concrete fault. The startup slice must supply real refusal/fail-once/restoration evidence. Historical report-25 results are not a pass for rewritten code.

## Reading and reaches

Read current coding/testing guidelines whole, and the HTTP, password-hashing, database-access and session-store guidelines whole. The current icon fixture and helper were read whole; inspected the already migrated one-serving-process fixture, Dockerfile, Compose, relevant complete D-13/D-17/D-27/D-109 entries, icon/host-sharing/startup/default-address invariants, and selected build-tools/deployment/account-server part-map entries. Current installed Express protocol/secure getters and package version were read directly.

The report-25 reaches are now explicit in new Slice 5. Additional planning reaches beyond the copied selection were the pinned size script's input contract, the original planner report's existing limitations, and immutable publisher-source lookup below. They establish the slice boundary and honest reading size, not a new product design.

No new guideline is missing for the narrow fixture. Existing testing.md does not yet express the adopted mental-mutation obligation or the required account authorization table; new Slice 6 retains that maintenance. The separate computational mutation-tool/parts choice remains unresolved, with no adoption or permanent waiver. Real-browser exclusions still need their stated return-condition assessment when later browser work happens.

The styleguide's order-of-work example remains respected in substance: existing fonts and tokens are reused; shared controls/kitchen-sink states in Slice 8 precede the authenticated shell/states in Slice 9. The backend/resource prerequisite is the reason for their later position. This split changes no UI order or styleguide instruction.

## Immutable provider-source verification

The publisher sources below were opened successfully during this planning pass. These are source contracts, not evidence of target settings or deployed behavior.

- [Express 5.2.1 request.js](https://raw.githubusercontent.com/expressjs/express/dbac741a49a5a64336b70c06e85c2e2706e36336/lib/request.js): protocol/secure getters check the immediate peer through the trust function before using forwarded protocol; a comma-separated header supplies the first value. Installed node_modules/express/package.json reports 5.2.1 and request.js:270–315 contains these getters. Therefore the application's singular-header rejection remains necessary; the library's protocol getter is not that rejection.
- [express-session 1.19.0 index.js](https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/index.js): issecure falls back to Express req.secure when proxy is not explicitly true or false; proxy=true reads forwarding itself. The selected installed session source is already in Read. No unconditional session bypass is authorized.
- [Cloudflare HTTP headers](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/1603d9d13a2889c5792a287f2452440594fac225/src/content/docs/fundamentals/reference/http-headers.mdx): CF-Connecting-IP conveys the client address for ordinary edge-to-origin traffic, with Worker and managed-transform caveats. Cloudflare overwrites incoming X-Forwarded-Proto with the client protocol. Actual Worker/transform/Pseudo IPv4 settings still require target acceptance; the documentation does not prove them.

The exact Cloudflare fundamentals path was obtained from the immutable commit's GitHub tree, not reconstructed from the failed guessed paths in report 25. The new startup slice reads this source selection and the installed code/version. Before writing facts, its maker verifies the relied-on contract through the immutable links and the element skill. Any further publisher-source passage is materialized in its local handoff and the size rerun; links are not counted as if their remote contents were already local Read files. No discarded attempt fact entry or implementation is imported.

## Checks and limits

All commands below run from the named worktree unless stated otherwise.

| Check | Exact command/action | Result |
|---|---|---|
| Reviewed head | git rev-parse HEAD | Exit 0; c9af9d4521895fe6fe98ae96ccbc7035e4cea350 |
| Process checkout | git -C .the-way rev-parse HEAD | Exit 0; 574a37b9ab9572f876298f4cc10754581222d3f0 |
| Process gitlink | git ls-files --stage -- .the-way | Exit 0; same hash, mode 160000 |
| Tracked status | git status --short | Exit 0; empty |
| Unstaged scope | git diff --exit-code | Exit 0; empty |
| Staged scope | git diff --cached --exit-code | Exit 0; empty |
| Slice size | python -B .the-way/task-cycle/slice_size.py docs/task-cycles/konta-graczy-i-logowanie/plan.md | Exit 0; all eleven fit; final complete output is plan-size.md |
| Plan preservation | python -c "import json,pathlib; print(json.dumps(pathlib.Path('docs/task-cycles/konta-graczy-i-logowanie/plan.md').read_bytes().decode('utf-8'), ensure_ascii=True))" followed by in-memory assertions against the pre-edit plan | Read exit 0; assertions passed: disk matches intended content, completed sections unchanged except the single forward label, original startup Change unchanged and all 80 Read selections retained, later Change sets unchanged, headings 1–11 and predecessor dependencies consistent |
| Publisher lookup | $tree = Invoke-RestMethod -Uri 'https://api.github.com/repos/cloudflare/cloudflare-docs/git/trees/1603d9d13a2889c5792a287f2452440594fac225?recursive=1'; $tree.tree &#124; Where-Object { $_.path -match 'http-headers\.mdx$' } &#124; Select-Object -ExpandProperty path | Exit 0; fundamentals path above found |
| Publisher contents | web open on each of the three exact immutable URLs above; find protocol, issecure and X-Forwarded-Proto | Successful tool results; no shell exit applies |

The first revised size run passed. The final same size command is repeated after this report is complete and its UTF-8 output saved to plan-size.md, since this report is itself a Read selection. Every Change count is at most ten. Later code that does not exist is not misreported as counted.

One oversized shell-based file-write request was rejected before process launch (no command exit and no files changed by it). Used apply_patch successfully for the same authorized ignored files instead. No approval was requested and no scope was widened.

No product test or foundation checker is required solely for this planning edit.

Later dependency modules that do not exist yet remain under the existing materialize-at-dispatch rule. The new Slice 4 inputs exist now; new Slice 5 retains the current real password/DB/Store/helper source. Size is measured at the current reviewed base, never from discarded implementation text. A passing planning estimate is not permission to omit later reading.

Historical baseline and attempt outcomes remain exactly historical. The c9af9d4 baseline supplied by root passed 366 Node/278 Python with three Windows-only skips and foundation 0. Report 25 had no final restored full-gate pass and no completed default-address mutation result. Neither is a planner-run test or evidence for the new implementation.

No product npm test, browser journey, Docker application build/measurement, default-address mutation, target deploy, secret/private-copy action or public account journey was performed by this planner. The final request remains blocked draft for the specified human actions and exact target evidence. No question requires a human answer at this planning boundary.

