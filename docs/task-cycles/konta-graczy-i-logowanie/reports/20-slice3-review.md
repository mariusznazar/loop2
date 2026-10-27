PASS c9af9d4521895fe6fe98ae96ccbc7035e4cea350

# Independent review of slice 3

Reviewed range: c85518a544f1a8c695195d6cb6f95235935c4c1a..c9af9d4521895fe6fe98ae96ccbc7035e4cea350. The worktree HEAD matched the dispatched head and its tracked tree was clean. The range contains three commits and eight changed files, +282/-49. The process gitlink and checkout both identify 574a37b9ab9572f876298f4cc10754581222d3f0. I did not author this change, read cycle.md, dispatch another reviewer, modify product files or operate the target server.

The review used the complete corrected author report, the execution/review handoffs, the copied task/spec passages and slice in 19-slice3-selection.md, the isolation scope answer, the named current foundation entries and complete selected guidelines. The foundation consequence was checked separately from the code/test change. The report below concerns this slice, not completion of the account task.

## Findings by grade

- Critical: none.
- Important: none.
- Minor: none.
- Out-of-scope findings: none.

## Assessment and evidence

### Image ownership and real resources

At Dockerfile:25 the runtime stage creates /app/data and assigns it to node before USER node. The container helper does not initialize the data volume as root: tests/invariants/account_container_support.py:60-68 creates new independently named volumes, while its root setup container mounts only the secret volume. The application starts through the image's normal command at lines 76-83, under 512 MiB, with explicit production settings and no published port. The subsequent exec has no user override.

The probe at tests/invariants/account_container_support.py:26-47 writes, reads and deletes a file in /app/data and opens/closes the actual built AccountDatabase. Its expected uid, gid, directory ownership, file existence, secret permissions and production settings are explicit requirement-derived values at lines 88-96. Thus a missing ownership change cannot be hidden by a root verifier or a string check of Dockerfile. In the supplied red log, both application-image checks reach the fresh-volume assertion and fail with EACCES on /app/data/node-write-probe. The supplied final log records both real application images passing the resource assertions. These executions are the author's, not mine.

The secret is generated inside a disposable setup container, written with exclusive creation, root:1000 ownership and mode 0440, and mounted read-only in the application. No generated key is placed in command arguments or environment values. The successful probe emits lengths and metadata, not key values. Cleanup registration precedes creation/start, with the application removed before its volumes and the image removed last. Operations have command timeouts. I found no new unbounded wait or resource reuse path in the helper.

The helper's immediate SQLite open is a resource probe, not evidence that the main application already owns the startup connection. That integration belongs to the following slice, as the dispatch states. Similarly, this check does not exercise record preservation across replacement.

### Compose grants and host isolation

compose.yaml:11-21 adds the four agreed settings, one application-only session-secret grant and one account-volume mount. The source is /etc/loop2/session-secrets; the database volume has the fixed own name loop2_accounts. Existing connector configuration, connector-only tunnel token, absence of a published application port and the separate 512 MiB/256 MiB service limits are retained. Dockerfile's normal command and health check are unchanged. The installed deployment script is unchanged and already uses Compose up without down/volume removal; its image cleanup does not delete volumes.

I traced the new validators against hostile variants in tests/invariants/test_loop2_host_sharing.py:212-274 and 495-543. The checks require exact secret definition names, only a file source at each accepted path, exact consumer grants, only the account volume definition/name and the exact application mount. Extra source fields, swapped or additional grants, long-form grant overrides, host paths, foreign named volumes, other destinations, external/driver settings and connector mounts cannot pass those comparisons. The existing service/build allow-lists still reject privilege and namespace additions. The surrounding check requires the exact app/cloudflared service set, so the validators' iteration cannot silently permit a missing or additional consumer in the repository check.

The underlying YAML reader rejects duplicate keys, merges, anchors and unsupported forms instead of treating them as absent. This is deliberately a narrow accepted declaration format; it is not a general security parser for arbitrary YAML. The actual declaration also passed my independent Docker Compose configuration validation.

tests/invariants/test_loop2_container_isolation.py:82 now calls the same exact volume validator instead of forbidding every volume. This agrees with the unchanged isolation sentence and accepted D-17. It preserves the other namespace, external-resource, socket and old-instance checks. Keeping the old blanket assertion would reject the required own volume; deleting all mount checks would lose the boundary. The actual change does neither. The explicitly authorized tenth Change path resolves that dependency without an invariant waiver.

The supplied final-head boundary log records exactly three assertion failures for an actual Compose mutation: the isolation and host-sharing volume checks reject other_accounts, and the secret check rejects /etc/other/session-secrets. The mutation script restores compose.yaml from HEAD, compares original/restored blob IDs and requires a clean diff before reporting the captured npm-test failure. The log records restoration to e8834a4a38b8f80af1acc07a6b860d8cff81b984.

### Existing probes, foundation and weakest point

The image/icons test retains every icon's HTTP status, media type and byte equality. The serving-process test retains its listening-process ownership/count checks, application/unknown-API requests and the actual internal deployment HTTP probe. The new shared preparation supplies real disposable resources without selecting a development mode. Its printed safe identity line uses flush=True; .the-way/gate/run_tests.py:91-104 confirms why buffered output after unittest's terminal OK would otherwise make a completed directory fail. No runner or assertion was weakened to accept that output.

The weakest slice requirement is copied ownership on a genuinely fresh data volume. The author's own-work check addresses that exact failure, and the observed EACCES red assertion distinguishes it from mere Docker setup failure. The immutable expected metadata and the final image checks support the claimed local writability result.

The only foundation diff adds the helper to build-tools at foundations/part_map.md:92. Both callers belong to deployment, which already permits dependency on build-tools; the helper's import of the built database is also within build-tools' allowed account-server dependency. No responsibility, dependency permission or trust boundary was silently rewritten. D-13/D-17 already carry the required policy at the review base. account-save-durable-storage, account-startup-configuration and account-schema-lifecycle remain marked violated. The report does not incorrectly clear them from a writable empty volume.

Changed invariant tests reviewed: loop2-host-sharing (top-level resource allowance, service keys, runtime-secret and account-volume checks); loop2-container-isolation (exact own-volume allowance); loop2-one-serving-process (real production-resource preparation around the retained process/HTTP assertions). No invariant sentence changes in this range. The helper remains existing test/build support; no new product code kind or exemplar is introduced. No rendered interface category or deferred browser-test return condition is triggered by these changes.

## Declined to judge

None. The uncompleted obligations below remain explicit limits of this slice and are not waived by this result.

## Checks I ran

All commands ran from C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie.

| Command/check | Result |
|---|---|
| git ls-files --stage -- .the-way; git -C .the-way rev-parse HEAD | Both exit 0; matching pinned commit 574a37b9ab9572f876298f4cc10754581222d3f0. |
| git rev-parse HEAD; git status --short | Both exit 0; dispatched head and no tracked change. |
| git log --oneline c85518a544f1a8c695195d6cb6f95235935c4c1a..c9af9d4521895fe6fe98ae96ccbc7035e4cea350 | Exit 0; b5d5d31, e4a46c7, c9af9d4. |
| git diff / git diff --stat over the same exact range | Exit 0; independently computed and inspected all eight file diffs. |
| git diff --check c85518a544f1a8c695195d6cb6f95235935c4c1a..c9af9d4521895fe6fe98ae96ccbc7035e4cea350 | Exit 0. |
| python -B .the-way/elements/common/foundation_check.py | Exit 0; 0 errors. |
| docker compose -f compose.yaml config --quiet | Exit 0; declaration accepted without starting services or reading any secret value. This is syntax/configuration validation, not a runtime grant check. |
| Manual adversarial code trace | Compared the exact resource validators, their crafted inputs, caller service checks and YAML parser; results described above. No mutation was made in the reviewed worktree. |
| Manual evidence inspection | Read source/runner identities, red EACCES assertion, final-head boundary assertion failures/restoration and final gate summaries against the helper and harness scripts. Results described below. |

## Supplied executions, not rerun by this reviewer

The author invoked every repository test through full npm test in an isolated Linux verifier. I inspected the relevant logs and harness, rather than treating the report itself as proof.

- 19-slice3-red.log: head b5d5d31, 366 Node cases, 278 Python cases, five intended assertion failures including both fresh-volume EACCES failures; reported runner exit 1.
- 19-slice3-boundaries.log: head c9af9d4, 366 Node cases, 278 Python cases, the three exact foreign-secret/foreign-volume assertion failures, three native-Windows skips; npm exit 1 and restored Compose blob recorded in the log.
- 19-slice3-final.log: head c9af9d4, matching process pin, 366 passing Node cases; 278 Python cases across four directories with three native-Windows skips, each directory ending OK; final foundation 0 errors. The author reports the enclosing Docker runner exit 0. The observed terminal log and fail-fast verify.sh are consistent with that result.

The final log's application-image identities and fresh-volume names match the author report. The verifier image is separate infrastructure. These logs prove local image execution with equivalent isolated application settings; they do not show the whole live Compose/tunnel stack. Static checks and my Compose validation cover the declaration separately.

I did not rerun full npm test merely to proceed: the review method forbids repeating the full suite, and D-77 permits no focused selection. No additional unresolved defect justified another full execution. I made no independent claim of running the image probes or mutation tests. The previous diagnostic mutation/output-buffering run remains the author's reported history; it is not the final result.

## Limits and unchecked work

- The three native Windows quality/process cases remain unchecked by this Linux evidence; I did not rerun the Windows baseline.
- No target deployment, target Argon2 benchmark, real secret creation/rotation or public browser journey was performed or certified.
- Account/session preservation across container replacement remains a later-slice obligation. Saved-game preservation remains the broader task dependency; a successful directory write and SQLite open prove neither.
- Mandatory production startup validation is still a following-slice responsibility. This slice supplies the real settings/resources its smoke tests need when that validation arrives.
- No runtime Compose secret bind, live connector readiness or public tunnel behavior was independently exercised in this review. Existing topology declarations were inspected; current local smoke fixtures intentionally use a daemon-local read-only secret volume.
- The existing computational mutation-testing settlement gap is not resolved or widened by this connection-based slice.

## Reaches beyond the named selection

- tests/invariants/loop2_invariant_support.py:551-631: read the complete ComposeKey, unquoting, mapping and compose_outline implementation to verify that unsupported/duplicate/merged YAML cannot evade the new resource checks. The named selection originally covered lines 1-140.
- package.json: whole: confirmed the sole npm test entrypoint, Python-directory discovery invocation and final foundation check; this explains why no selected repository-test run was introduced.
- .runs/account-linux-inputs/verify.sh and verify-slice3-boundaries.sh: whole: verified the supplied exact-head clone/setup, full npm entrypoint, actual mutations and restoration check.
- The author logs named above: inspected identity, assertion and terminal-summary passages to check supplied evidence. These are evidence reaches, not new executions.

The complete changed files, retained test callers, selected deploy script, database/Store and guidelines were read as dispatched. The .the-way/gate/run_tests.py:1-110 reach was explicitly requested in the review handoff; it confirms the flushing explanation. No other source or environment was used to infer a pass.
