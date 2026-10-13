# SDD ledger — plan: docs/task-cycles/serwer-testowy/plan.md

Spec: docs/task-cycles/serwer-testowy/spec.md (revision 2, approved). Briefs task-N-brief.md are the plan's "Slice N" sections (the plan uses "Slice", not "Task"; extracted with an equivalent awk).
Adapter (the-way implement-task): foundation step runs before Slice 2; boundary of SDD is the final review and fixes — return before workspace cleanup and finishing-a-development-branch.

## Pre-flight scan

| Pair or slice | Produces → consumes | Found |
|---|---|---|
| Foundation step → Slices 2–5 | invariant checks (isolation, distinct-address, container one-serving-process, typecheck extension) read Dockerfile, compose.yaml, deploy/loop2-deploy, workflow | Checks fail until their files exist; each slice names which checks are expected to pass after it. Agrees. |
| Slice 1 → Slice 2 | LOOP2_LISTEN_HOST / LOOP2_LISTEN_PORT names → Dockerfile ENV | Same names in both briefs. Agrees. |
| Slice 2 → Slice 4 | compose.yaml project loop2, service app, container loop2, port 18080, label org.opencontainers.image.title=loop2, LOOP2_COMMIT build arg → script build/up/probe/prune | Same values in both briefs. Agrees. |
| Slice 3 → Slice 4 | deploy/loop2-deploy constants block and steps 1–6; tests/deploy/deploy_script_support.py seam → steps 7–13 and their tests | Slice 4 extends both files; constants for thresholds, waits, port, project are created in Slice 3's block. Agrees. |
| Slice 4 → Slice 5 | exit codes 2–8 and output → workflow fails on non-zero and shows output | Agrees. |
| Slices 2–5 → Slice 6 | paths, exit codes, secret names, port → skill text | Slice 6 depends on all; reviewer checks names match. Agrees. |
| Slice 1 alone | tests in startup.test.mjs vs main.ts change; README Polish | Self-consistent. |
| Slice 2 alone | Dockerfile/compose; checks: compose config, invariant gate; Docker parts unchecked locally | Self-consistent. |
| Slice 3 alone | creates .gitattributes, script, support, two test files | Self-consistent; `git ls-files --eol` check needs the file committed. |
| Slice 4 alone | changes script and support, adds two tests | Self-consistent. |
| Slice 5 alone | workflow + static test | Self-consistent. |
| Slice 6 alone | six skill files + copy test | Self-consistent. |

Ruling: the invariant gate run after a slice is judged against the slice's own list of checks expected to pass; checks reading files of later slices fail by design — the plan says so (plan.md Slice 2 Checks, Foundation entries preamble) — cost if wrong: a real regression hidden among expected failures; mitigated because each slice names the expected failures exactly.

## Progress
Slice 1: base c8a4b3b43137ba3b37e0afb5e5eac449870494ce
Slice 1: implementer done b9400ed (11/11 npm test; gate 51, 18 expected failures)
Slice 1: minor (deferred): empty LOOP2_LISTEN_HOST passes `??` and makes Node listen on all interfaces
Slice 1: minor (deferred): IPv6 host prints unbracketed readiness line (orchestrator ruling in dispatch)
Slice 1: minor (deferred): no test of the occupied-address error on a non-default address
Slice 1: complete (commits c8a4b3b..b9400ed, review clean; deliberate break of account-server-occupied-address/1 failed the check)
Slice 2: base b9400ed
Slice 2: implementer DONE_WITH_CONCERNS 1fa0d31 (Docker checks unchecked: no daemon; healthcheck timings chosen 5s/3s/5s/3)
Slice 2: review (sonnet) spec compliant, quality approved; real docker build/run passed (Node 24, non-root, GET / 200, /api 404 JSON, healthy, type error fails build); 4 deliberate breaks caught. Important finding in foundation-step check test_loop2_one_serving_process_container.py (probe as root cannot read /proc of non-root server → fails on correct image).
Ruling: return to the foundation step — the check's author fixes the probe; the Slice 2 reviewer then reruns it unbroken and with a two-listener break — invariant tests are read-only for slices (implement-task foundation step) — cost if wrong: none to the slice's code.
Slice 2: Important finding ADDRESSED by foundation-step commit 54dc9f7 (scoped re-review: unbroken passes; two-listener break fails 2 != 1)
Slice 2: complete (commits b9400ed..1fa0d31, plus foundation correction 54dc9f7, review clean)
Slice 3: base 54dc9f7
Slice 3: implementer (opus) DONE_WITH_CONCERNS 5ecea7e; 26/26 tests/deploy; bash -n ok; eol lf. Concerns: /run lock after reboot for a non-root account; temporary exit 1 after checkout (Slice 4 replaces); isolation/typecheck script parts fail until Slice 4.
Ruling: /run lock kept — the run account the automation key uses has the rights the script needs on this host (as the old loop deployment); Slice 6's skill names the tmpfiles.d entry a non-root account needs — cost if wrong: deployments after reboot exit 4 until a human adds the entry.
Slice 3: review (opus) spec compliant, quality approved; trust boundary holds; 4 scratch breaks caught. Important (spec-mandated) /run lock for non-root after reboot — Ruling: see Slice 3 ruling above (an account with the rights the script needs; skill names tmpfiles.d) — cost if wrong: exit 4 after reboot until a human adds the entry.
Slice 3: minor (deferred): git checkout of a bare 40-hex name prefers a local branch of that name; use <sha>^{commit}
Slice 3: minor (deferred): an annotated tag's ID is accepted as a commit
Slice 3: minor (deferred): sshd environment settings (PermitUserEnvironment/AcceptEnv) unverified
Slice 3: minor (deferred): docker inspect lacks --type container
Slice 3: minor (deferred): constants-block comment inaccurate
Slice 3: minor (deferred): skipping the fetch is caught only by a seam check; no test of main rewound on GitHub
Slice 3: complete (commits 54dc9f7..5ecea7e, review clean with 1 spec-mandated finding ruled)
Slice 4: base 5ecea7e
Slice 4: implementer (opus) DONE_WITH_CONCERNS 5201598; tests/deploy 47/47; 11 mutations caught; invariants 48/51 (3 = workflow missing). Concerns: (1) foundation-step parser in loop2_invariant_support.py treats `<<word` in comments as a heredoc → Slice 3 isolation passes were vacuous; marker renamed in script; (2) Slice 3 label read lacks --type container (pinned args outside boundary); (3) last container log lines go only to the server log; (4) /run lock.
Ruling: (1) return to the foundation step — check author fixes the parser to ignore comments, before the Slice 4 review — cost if wrong: isolation checks blind to parts of the script. (2) deferred minor for the final review. (3) accepted; Slice 6's skill says where the container log lines are — cost if wrong: an Actions reader must look on the server. (4) Q20 stands.
Slice 4: minor (deferred): Slice 3's label read uses docker inspect without --type container
Slice 4: review (opus) spec compliant, quality approved; a0b9fe9 reader fix reviewed OK. Breaks: isolation 6/6 caught; typecheck 3/4 — Important: tests/invariants/test_account_server_typecheck.py:256 orders build-before-up by function definition order, not call order in main.
Ruling: return to the foundation step (correction 3) — check author makes the order follow the calls `main` executes; also fixes the reader's `$(` at end of line and number-before-redirect misreads (review minor 3) — cost if wrong: a swapped deploy sequence passes the invariant check.
Slice 4: minor (deferred): resource gate reads a zero-padded number with 8/9 as octal (real sources never produce one)
Slice 4: minor (deferred): exit-8 message prints the probe's content type unfiltered (no access value)
Slice 4: minor (deferred): test nits (fixture-path assertion, unused variable, swapped comments in support); EXIT_AFTER_CHECKOUT depends on stubs giving no docker info
Slice 4: minor (ruled): container log lines only in the server log — accepted, skill says where (see Slice 4 ruling (3))
Slice 4: Important ADDRESSED by foundation-step 7edefb0 (scoped re-review: 5 typecheck breaks fail, unbroken passes, nothing weakened)
Slice 4: complete (commits 5ecea7e..5201598, plus foundation corrections a0b9fe9, 7edefb0, review clean)
Slice 5: base 7edefb0
Slice 5: implementer (sonnet) DONE_WITH_CONCERNS 4adedf0; tests/deploy 60 OK; invariants 56 OK; static text test only (no actionlint, no real run before merge)
Slice 5: review (opus) spec ❌: (I1) /api/ probe accepts any 4xx/5xx, not a JSON API error; (I2) static test passes with the fail-on-nonzero block deleted; (I3) foundation check account-server-typecheck/1 passes a workflow copying files with uses: appleboy/scp-action. distinct-address breaks caught. Minors: test gaps (-A, extra remote args, printing decoded key); ssh errors may print the resolved address unmasked. Unverified: runners reach SSH over IPv4 only; known_hosts [host]:port form.
Ruling: I1, I2 and the minors on ssh verbosity/test gaps → fix round 1 by the implementer; I3 → foundation-step correction 4 by the check author afterwards (sequential writers); IPv4 SSH host and [host]:port known_hosts → Slice 6 skill and the human actions — cost if wrong: first automated deploy fails at SSH until the human fixes secrets.
Slice 5: fix round 1 (implementer) deadec8 — I1 probe requires 4xx/5xx with JSON content type; I2 test requires captured ssh status to be exited with; minors: LogLevel=ERROR, -A/ForwardAgent, extra remote args, printing decoded key rejected; tests/deploy 63, invariants 56. I3 sent to the check author (correction 4).
Slice 5: re-review: I1, I2, I3 ADDRESSED; slice code approved. New Important #11 on the foundation check: quoted "uses":, flow-style step, scp inside trap pass. Ruling: correction 5 — reader fails closed on any YAML/shell form outside the spec's subset — cost if wrong: the check rejects a legitimate later workflow edit until the check is widened (a foundation-step change).
Slice 5: minor (deferred): ssh fatal errors can print the resolved shared IPv4 unmasked (LogLevel=ERROR does not hide them)
Slice 5: minor (deferred): a file could travel base64-encoded in ssh's argument (forced command ignores arguments; static test rejects extra remote args)
Slice 5: minor (deferred): review minors M5, M7–M10 (see task-5-review.md)
Slice 5: fix round 2/5 (correction 5, 34faea7): #11 ADDRESSED; new Important #13 (ssh fed a file: 0<file, piped continuation, variable-encoded file) and Minor #14 (`Uses:`). Fix round 3/5: correction 6 — pin the ssh invocation to one allowed shape and match keys case-sensitively.
Slice 5: fix round 3/5 (correction 6, 98be735): #13, #14 ADDRESSED; new Important #15 (commit env var overwritable: printf -v, for, function name). Fix round 4/5: correction 7 to the same check author.
Ruling: rounds 4–5 keep the check's author rather than a fresh agent — WAY-69 requires the check from an agent that wrote neither the code nor the sentence, and the author holds the reader's design; the SDD fresh-implementer rule targets stuck implementers, and this chain converges (each round closes its finding) — cost if wrong: one more round.
Slice 5: fix round 4/5 (correction 7, bceae3d): #15 forms fail but NOT ADDRESSED as a class — new Important #16 (name split by backslash-newline; $'\x2dv'). Fix round 5/5: correction 8 (join continuations first; refuse $'' and $"").
Slice 5: fix round 5/5 (correction 8, ebfb73b): #16 ADDRESSED; #15 NOT ADDRESSED (printf "$o" "${n}SHA" assembles -v and the name from variables).
Slice 5: parked — #15 static workflow check can be evaded by assembling a variable name at run time — Ruling: not load-bearing: the automation key is restricted server-side to `restrict,command=/usr/local/bin/loop2-deploy`, which accepts only a 40-hex commit on main and reads no ssh input; that entry is the real guarantee and the human verifies it at human actions 4/5; named in the request as a limit of a static shell check — cost if wrong: a workflow edit that sends other content passes the invariant check, and the server still refuses it.
Slice 5: complete (commits 7edefb0..deadec8 slice; foundation corrections daaff1b, 34faea7, 98be735, bceae3d, ebfb73b; 1 parked)
Slice 6: base ebfb73b
Slice 6: implementer (sonnet) DONE c9c85c2; agent_workflow 5 OK; deploy 63 OK; choices: memory 536870912, mikrus exec tool, docker builder prune as human cache reclaim, exit 255 row
Slice 6: review (sonnet) spec ✅ with Important: docker builder prune host-wide; minors (log-lines claim, git status as root, mikrus changing tools, Actions-log sentence, unreadable installed script). Fix round 1/5 to the implementer.
Slice 6: fix round 1/5 e52937a (builder prune removed with effect stated; minors)
Slice 6: complete (commits ebfb73b..e52937a, review clean after fix round 1)
Final review (opus): ready to merge after M1 (--type container at deploy/loop2-deploy:130) and M2 (typecheck check docstring names the parked #15 limit); no Critical/Important; chain consistent; access-value scan clean; foundation faithful; parked #15 ruling sound; other deferred lines stand.
Ruling: M1 → Slice 4 implementer (script code); M2 → check author (foundation check, WAY-69); sequential, then one scoped re-review of the fix wave — cost if wrong: none.
Final fix M1: 6643314 (--type container; tests/deploy 63/63; invariants 57/57 on rerun after one EADDRINUSE flake on port 3000 in test_loop2_api_error_route)
Final fix M2: 6bba3d2 (docstring only; 10 tests; guard 0)
Final re-review: M1, M2 ADDRESSED; nothing new broken.
Final: minor (deferred, not blocking): SKILL.md:50 (both copies) read command lacks --type container — no second fix wave (SDD); named in the request.
