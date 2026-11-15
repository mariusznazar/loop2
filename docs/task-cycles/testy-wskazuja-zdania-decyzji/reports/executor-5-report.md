# Report — executor of slice 5 (host, container and deployment decisions)

**Status:** done with concerns

The concerns are two choices of how to judge "holds", named under *Choices* below (C1, C2). A
reviewer who reads "holds" more widely would ask for more lines in files of other parts. Neither
choice changes the field *Verification* of a decision away from what the lines hold.

## Commits

Range `60cd36c806ef8453262ca4e08bb98a0ca1f6db5e..e28cc12a`, author address `mariusznn@gmail.com`
(`git log -1 --format=%ae` after the first commit):

- `43cc52ef` test: :white_check_mark: mark the tests that hold the sentences of the decisions on where the game runs, how a change reaches the server, the tunnel, the deploying branch, secrets, the container, recovery, the installed deploy script and the sharing of the host with lines decision:
- `e28cc12a` docs: :memo: name the tests of D-08, D-09, D-10, D-11, D-13, D-14, D-15, D-16 and D-17, and rewrite the pair of examples of D-08, D-09, D-10, D-11, D-13, D-15, D-16 and D-17 for the part no invariant and no test holds

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 42 | 32 |
| `tests/deploy/test_deploy_workflow.py` | 10 | 0 |
| `tests/deploy/test_loop2_deploy_switch.py` | 12 | 0 |
| `tests/deploy/test_loop2_tunnel_image.py` | 2 | 0 |
| `tests/deploy/test_loop2_log_storage.py` | 1 | 0 |
| `tests/deploy/test_account_storage.py` | 1 | 0 |
| `tests/invariants/test_loop2_host_sharing.py` | 8 | 0 |
| `tests/invariants/test_loop2_container_isolation.py` | 2 | 0 |
| `tests/invariants/test_loop2_deploy_keeps_running.py` | 4 | 0 |
| `tests/invariants/test_loop2_deploy_trigger_input.py` | 3 | 0 |
| `tests/deploy/test_loop2_deploy_build.py` (beyond *Change*) | 11 | 0 |
| `tests/deploy/test_loop2_deploy_commit.py` (beyond *Change*) | 6 | 0 |
| `tests/deploy/test_loop2_backup.py` (beyond *Change*) | 3 | 0 |
| `tests/agent_workflow/test_loop2_deploy_skill.py` (beyond *Change*) | 1 | 0 |
| `tests/invariants/test_account_server_runtime.py` (beyond *Change*) | 1 | 0 |
| `tests/invariants/test_loop2_one_serving_process_container.py` (beyond *Change*) | 1 | 0 |
| `tests/transport.test.mjs` (beyond *Change*) | 1 | 0 |

All 67 lines added to tests are lines `decision:`. Nothing else in a test changed. No mention of a
decision number was removed: the comments `D-10/D-13`, `D-17, D-112`, `D-13`, `D-14` and
`D-111, D-13` stay where they were.

### Test files beyond the slice's *Change* (item 5 of "Work of every slice")

One line each:

- `tests/deploy/test_loop2_deploy_build.py` (part deployment): the comparison of the installed deploy script (D-16), the resource gate (D-17), and the build command (D-09, D-10, D-14).
- `tests/deploy/test_loop2_deploy_commit.py` (deployment): the server's own fetch (D-09), and the human path and the forced path of a rollback (D-15).
- `tests/deploy/test_loop2_backup.py` (deployment): the Strych login kept out of the script, and the path of the encryption key (D-13).
- `tests/agent_workflow/test_loop2_deploy_skill.py` (agent-workflow): no IPv6 address and no server name in the deploy skill (D-13).
- `tests/invariants/test_account_server_runtime.py` (build-tools): the connector image pinned by version and digest (D-10).
- `tests/invariants/test_loop2_one_serving_process_container.py` (deployment): the game and its server served inside the loop2 container (D-08).
- `tests/transport.test.mjs` (account-server): the first session secret signs, and an older one still verifies (D-13).

None of these files is of `browser-view`, so `guidelines/styleguide-browser-view.md` was not
needed. Each file was run on its own; the runs are below.

## Checks run

| Command | Exit | What it showed |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (working tree, then again on `e28cc12a`) | 0, 0 | `0 errors`; none of D-08 … D-17 listed as `held by nothing`. Eleven other decisions are still listed (D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220), none of them in this slice. |
| `npm test -- tests/deploy/test_loop2_log_storage.py` | 0 | 4 tests OK |
| `npm test -- tests/deploy/test_deploy_workflow.py` | 0 | 16 tests OK |
| `npm test -- tests/deploy/test_loop2_deploy_switch.py` | 0 | 10 tests OK |
| `npm test -- tests/invariants/test_loop2_host_sharing.py` | 0 | 18 tests OK |
| `npm test -- tests/invariants/test_loop2_container_isolation.py` | 0 | 3 tests OK |
| `npm test -- tests/invariants/test_loop2_deploy_keeps_running.py` | 0 | 13 tests OK |
| `npm test -- tests/invariants/test_loop2_deploy_trigger_input.py` | 0 | 10 tests OK |
| `npm test -- tests/deploy/test_loop2_deploy_build.py` | 0 | 14 tests OK |
| `npm test -- tests/deploy/test_loop2_deploy_commit.py` | 0 | 18 tests OK |
| `npm test -- tests/deploy/test_loop2_backup.py` | 0 | 26 tests OK |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| `npm test -- tests/invariants/test_account_server_runtime.py` | 0 | 5 tests OK |
| `npm test -- tests/transport.test.mjs` | 0 | 12 pass, 0 fail, 0 skipped |
| `npm test -- tests/deploy/test_loop2_tunnel_image.py` | 0 | 1 test OK; it ran against the Docker daemon, no skip |
| `npm test -- tests/deploy/test_account_storage.py` | 0 | 1 test OK; it ran against the Docker daemon, no skip |
| `npm test -- tests/invariants/test_loop2_one_serving_process_container.py` | 0 | 3 tests OK; it ran against the Docker daemon, no skip |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/transport.test.mjs` | 0 | style kept (the only `.mjs` file the slice changed) |
| `git diff -U0 60cd36c8 -- foundations/decisions.md`, read | — | 9 hunks, at D-08, D-09, D-10, D-11, D-13, D-14, D-15, D-16 and D-17. Each of the 56 changed lines is a line `- **Verification:**` or one of its indented continuation lines. D-12 is untouched. |

**Not run:**

- The full gate (`npm test` with no file). It is the cycle's run, not the slice's (WAY-160).
- `test_ruff_source_rules` and `test_shellcheck_source_rules`. They fail at the base with `FileNotFoundError`, as the handoff says. They are not caused by this slice.

No test was written and no invariant changed, so section 2 of the method has no failing first run
to record.

## Own-work check (section 3)

**Requirement most likely missed:** that every added line `decision:` quotes the start of a binding
sentence exactly. That means at least three words, no `"`, and a match against the whitespace-joined
binding sentences — on long, wrapped sentences such as D-13 and D-17.

**Check:** a script, `.runs/executor-5/quotes.py`, now removed. It took every `+` line of
`git diff -U0 60cd36c8 -- tests` and checked each one:

- that it is a line `decision:`;
- that its quotation starts at the start of a sentence of that decision's whitespace-joined binding paragraphs, or right after `. `;
- that the quotation has at least three words.

**Result:** 67 lines, 0 faulty (`python -B .runs/executor-5/quotes.py`, exit 0, printed `67 0`).
The foundation check confirms the same: exit 0, `0 errors`.

**Second risk:** a holder missed in a test file the plan did not name.

**Check:** a search of `tests/` for the content terms of the ten decisions — `kantarion`,
`cloudflared`, `loop2_accounts`, `mem_limit`, `MemAvailable`, the installed paths, `authorized_keys`,
`65532`, `image prune`, `backup-encryption-key`, `cloudflare_tunnel_token`, `mikrus`, `Strych`,
rotation of keys, `keys[1]` and `require_daemon`. Then I read the cases found.

**Result:** the beyond-*Change* files listed above. The cases judged as not holding are named under
*Choices* (C1) and *Searches*.

## Reaches beyond the dispatch

- **`foundations/invariants.md`, entry `loop2-one-serving-process`.** Read to learn what it derives from (D-05, not D-08), because its container test holds a part of D-08's first sentence.
- **Other test files, read for item 5.** Every file in the beyond-*Change* list above, `tests/deploy/test_loop2_deploy_input.py`, `tests/deploy/test_loop2_deploy_dump.py` (by grep), `tests/deploy/test_check_address_workflow.py:1-160`, `tests/deploy/test_loop2_watch.py:1040-1090`, `tests/invariants/test_loop2_distinct_address.py`, `tests/invariants/test_loop2_application_port.py`, `tests/invariants/account_container_support.py`, `tests/invariants/test_account_server_typecheck.py:240-320` and `tests/agent_workflow/test_tracked_file_private_paths.py`. Reason: to judge, by the content of each sentence, whether they hold one.
- **Product files read to judge the tests.** `compose.yaml`, `Dockerfile`, `deploy/cloudflared.Dockerfile`, `.github/workflows/deploy.yml` and `deploy/loop2-deploy` (lines 1-60 and a grep for `installed`).

## Working copies

**Directory:** `.runs/executor-5/`. It held:

- three one-off scripts: `binding.py`, `keeps.py` and `quotes.py`;
- their outputs: `binding.txt`, `quotes.txt` and `holders.txt`;
- the two outputs of the foundation check;
- the output of each focused test run.

Nothing in it is needed by this report. The directory was removed before return. The Docker images
and containers the tests made were removed by the tests' own clean-up.

## Unread material

- **`.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` and `task-frozen.md:30-42,99-104`.** Read as the copies in the handoff and in the whole `task-frozen.md`, which I read whole. I did not open `plan.md` itself; the handoff carries its passages word for word.
- **`.the-way/elements/decisions/template.md`.** Read 105-264, which covers the three ranges the *Read* names.
- **The rest:** none.

## Searches not found or unclear

- **Tests of a memory limit in `compose.yaml`.** Not found. Nothing requires `mem_limit` on either service. `tests/password-measurement.test.mjs:21` only names 512 MiB as a constant of its own. So the memory-limit parts of D-10 and D-17 are held by nothing and stay in their pairs.
- **Tests of the connector's command.** No test reads `--protocol http2`, `--edge-ip-version 4` or `--token-file`, so those parts of D-10 are held by nothing.
- **Tests of `/backup_key`, of host file modes, of the private-note copies and of the 30-day keeping of old session secrets.** Not found, since these live on the host or in human procedure. They stay in the pair of D-13.
- **D-12, a test of an agent's access to the server.** Not found. `tests/agent_workflow/test_loop2_deploy_skill.py` checks the skill's copies and its text for addresses only. Nothing holds D-12 but its pair, so it is left untouched.
- **D-16's first sentence (the `authorized_keys` forced command).** No test reads it; it lies on the server. It stays in the pair.
- **Unclear: whether a test that *depends* on a sentence holds it** (see C1).

## Choices made (way rejected, cost if wrong)

- **C1 — A precondition is not a hold.**
  - *Chosen:* a test holds a part of a sentence when one of its own assertions checks that part as what the case is about. A check inside a shared setup helper, or an enumeration guard, does not count when it only guards the setup of a case about something else.
  - *Left without lines, on that ground:*
    - for D-17 ("initial directory owned by uid/gid 1000"): `tests/deploy/test_loop2_image_icons.py:90`, `tests/invariants/test_loop2_container_icons.py`, `tests/invariants/test_loop2_container_sprites.py` and `tests/deploy/test_account_backup_stream.py`. They reach `verify_account_resources` as setup. `test_account_storage.py`, whose case is the data volume, got the line;
    - for D-10 ("connector is a second service"): the `set(services) == {"app", "cloudflared"}` guards in `test_loop2_host_sharing.py:421`, `test_account_server_typecheck.py:254` and `test_loop2_one_serving_process_container.py:175`;
    - for D-14: every test that builds the image with Docker. `test_loop2_image_icons.py` cites D-14 in its docstring but only uses Docker; it would still pass if the deployment ran loop2 under another runtime. D-14 is held by the two tests that check that the deployment runs `docker compose build` and `up`. This follows the precedent of D-02 in slice 4;
    - for D-08's second sentence: the watcher's tests at `tests/deploy/test_loop2_watch.py:1054,1078`. Their case is the watcher reading its own two containers, under D-356, not a deployment beside the old game.
  - *Rejected way:* a line at every test that would fail if the sentence broke. It would add about ten more lines in five files of other slices, and each would need a Docker run.
  - *Cost if wrong:* a reviewer asks for those lines. Adding them changes no field *Verification*.
- **C2 — A part an invariant of the decision states gets no line at any test.**
  - *Chosen:* where an invariant the decision names already states a part of its sentences, no test gets a line for that part, whether or not the test is marked as that invariant's test. This extends R1 by the template's rule "a sentence so held gets no invariant derived from the decision": a part is held either by an invariant or by lines, not both.
  - *Effect:*
    - `test_deploy_workflow.py::test_public_address_declared_once_and_probed` gets no D-08 line (`loop2-distinct-address` states it), only a D-10 line;
    - the forced-path refusals in `test_loop2_deploy_commit.py` get no D-09 line (`loop2-deploy-trigger-input` states it), only D-15 lines, because D-15 names no such invariant;
    - the isolation tests get no D-08 line.
  - *Rejected way:* lines on every non-invariant test that repeats an invariant's part.
  - *Cost if wrong:* a few D-08 and D-09 lines more; the fields stay as they are.
- **C3 — A test of an invariant derived from another decision gets lines for this slice's decisions (R1 read literally).** For example:
  - D-15 at three tests of `loop2-deploy-trigger-input` (derived from D-09 and D-11);
  - D-17 at four tests of `loop2-deploy-keeps-running` (derived from D-15);
  - D-08, D-13 and D-17 at tests of `loop2-host-sharing` (derived from D-17), each only for a part that invariant does not state.
- **C4 — Quotation length.**
  - *Chosen:* a quotation runs from the start of the sentence up to the clause the test holds, where that clause comes early enough. Where the clause sits deep in a long sentence, only its start is quoted. For example, `D-13 "Automation secrets and server access values"` stands at the volume tests, which hold "no container receives the encryption key or the key to Strych".
  - *Rejected way:* quoting the whole sentence every time; some D-13 sentences run past 600 characters.
  - The clause `tests:` of each decision says in words what is held.
- **C5 — D-13 at the session-key test in `tests/transport.test.mjs:765`.** I judged that the server signing with the first secret and still accepting an older one holds the code side of "session rotation prepends the new signing secret while retaining old verification secrets". It is the decision's own former complying example. Cost if wrong: one line to drop.

## The row of each decision (item 6)

Paths are as they stand at `e28cc12a`.

### D-08

**Held by tests — in part, sentence 1** ("The game and its account and save server run in a dedicated loop2 container…"):
- `tests/invariants/test_loop2_one_serving_process_container.py:194` `test_running_container_has_one_listening_node_process`

**Held by tests — whole, sentence 2** ("The existing loop container remains untouched"):
- `tests/invariants/test_loop2_host_sharing.py:375` `test_old_deployment_is_only_read`
- `tests/deploy/test_loop2_deploy_switch.py:86` `test_switch_probe_prune_and_last_line`
- `tests/deploy/test_loop2_deploy_switch.py:145` `test_failed_health_wait_exits_8_with_the_restore_line_and_container_logs`
- `tests/deploy/test_loop2_deploy_switch.py:187` `test_failed_probe_exits_8_with_the_restore_line`
- `tests/deploy/test_loop2_deploy_switch.py:246` `test_no_down_no_other_project_no_unfiltered_prune`

**Held by invariants:** `loop2-container-isolation` holds the dedicated container, and the compose file and Dockerfile naming no old loop. `loop2-distinct-address` holds the address that differs from `kantarion.bieda.it`.

**Held by nothing:** "on Mikrus".

**Verification became:** pair rewritten.

### D-09

**Held by tests — in part, sentence 1:**
- "A push to the deploy branch starts an automation": `tests/deploy/test_deploy_workflow.py:27` `test_triggers_on_push_to_main_only`
- "…tells the server to build … from that commit":
  - `tests/deploy/test_deploy_workflow.py:69` `test_sha_reaches_the_script_only_through_env`
  - `tests/deploy/test_deploy_workflow.py:109` `test_ssh_forwards_nothing_and_takes_only_the_sha`
  - `tests/deploy/test_loop2_deploy_build.py:268` `test_build_command_and_commit`
- "the server pulls the code from GitHub itself":
  - `tests/deploy/test_deploy_workflow.py:48` `test_no_checkout`
  - `tests/deploy/test_loop2_deploy_commit.py:124` `test_forced_path_fetches_main_only`

**Held by invariants:** `loop2-deploy-trigger-input` holds "only … a commit that belongs to that branch".

**Held by nothing:**
- the key's restriction to the one rebuild command;
- that no step copies built code onto the server. The tests would not catch a step that clones and builds on the runner and copies by `scp`.

**Verification became:** pair rewritten.

### D-10

**Held by tests — in part, sentence 1:**
- the address: `tests/deploy/test_deploy_workflow.py:132` `test_public_address_declared_once_and_probed`
- the connector is a second service of the loop2 project:
  - `tests/invariants/test_loop2_container_isolation.py:67` `test_compose_names_its_own_project_service_and_container`
  - `tests/deploy/test_loop2_deploy_build.py:268` `test_build_command_and_commit`
  - `tests/deploy/test_loop2_deploy_switch.py:86` `test_switch_probe_prune_and_last_line`

**Held by tests — in part, sentence 3:**
- the image pinned by version and digest: `tests/invariants/test_account_server_runtime.py:202` `test_deployment_files_name_only_node_24`
- waits for both health checks before reporting success:
  - `tests/deploy/test_loop2_deploy_switch.py:86`, `:145` and `:187`
  - `tests/deploy/test_loop2_tunnel_image.py:27` `test_nonroot_connector_can_run_the_disconnected_readiness_check`

**Held by invariants:** `loop2-application-port` holds "publishes no host port".

**Held by nothing:**
- encrypted and remotely managed;
- the connector's own memory limit;
- forwarding to `http://app:3000`;
- the hostname replacing the AAAA record, Origin Rule and Configuration Rule;
- HTTP/2 over IPv4.

**Verification became:** pair rewritten.

### D-11

**Held by tests — whole:**
- `tests/deploy/test_deploy_workflow.py:27` `test_triggers_on_push_to_main_only`
- `tests/deploy/test_deploy_workflow.py:40` `test_concurrency_never_cancels_a_running_deployment`

**Held by invariants:** `loop2-deploy-trigger-input` holds that only commits of `main` are deployed.

**Held by nothing:** a manual approval brought in through a GitHub `environment:` rule.

**Verification became:** pair rewritten.

### D-12

**Held by tests:** none.

**Held by invariants:** none.

**Held by nothing:** both sentences.

**Verification became:** unchanged; its pair stands.

### D-13

**Held by tests — in part, sentence 1:**
- access values outside the repository:
  - `tests/deploy/test_deploy_workflow.py:52` `test_exactly_the_five_secrets`
  - `tests/deploy/test_deploy_workflow.py:146` `test_no_ipv6_and_no_other_host`
  - `tests/agent_workflow/test_loop2_deploy_skill.py:72` `test_no_ipv6_literal_and_no_mikrus_server_name`
  - `tests/deploy/test_loop2_log_storage.py:103` `test_the_stanza_holds_exactly_the_directives_of_a3`
- the Strych login kept out of the script:
  - `tests/deploy/test_loop2_backup.py:134` `test_rsync_is_called_once_with_one_file_to_one_computed_name_and_no_login`
  - `tests/deploy/test_loop2_backup.py:169` `test_the_host_key_options_stand`
- the runtime credential paths:
  - `tests/deploy/test_loop2_backup.py:183` `test_the_constants_name_the_design_s_own_files`
  - `tests/invariants/test_loop2_host_sharing.py:437` `test_runtime_secrets_are_granted_only_to_their_consumers`
- no container gets the encryption key or the key to Strych:
  - `tests/invariants/test_loop2_host_sharing.py:437` (as above)
  - `tests/invariants/test_loop2_host_sharing.py:443` `test_account_volume_is_owned_and_mounted_only_by_the_application`
  - `tests/invariants/test_loop2_container_isolation.py:84` `test_compose_shares_nothing_with_another_deployment`

**Held by tests — in part, sentence 2:**
- the grants and the host modes they keep: `tests/invariants/test_loop2_host_sharing.py:437`
- the connector running as group 65532: `tests/deploy/test_loop2_tunnel_image.py:27`
- the plain mail values: `tests/invariants/test_loop2_host_sharing.py:448` `test_production_account_configuration_is_fixed`

**Held by tests — in part, sentence 3:**
- credentials named by secret name: `tests/deploy/test_deploy_workflow.py:52` and `tests/invariants/test_loop2_host_sharing.py:448`
- the first session secret signs and an older one verifies: `tests/transport.test.mjs:765` "rolling static responses use the newest signing key and touch real SQLite without rewriting identity"

**Held by invariants:** none named.

**Held by nothing:**
- host ownership and modes (root:root 0400, the host directory);
- `/backup_key`;
- the private-note copies;
- the order of human rotation;
- keeping old session secrets for 30 days;
- keeping the old encryption key;
- credentials in requests.

**Verification became:** pair rewritten.

### D-14

**Held by tests — whole:**
- `tests/deploy/test_loop2_deploy_build.py:268` `test_build_command_and_commit`
- `tests/deploy/test_loop2_deploy_switch.py:86` `test_switch_probe_prune_and_last_line`

**Held by invariants:** none.

**Held by nothing:** none.

**Verification became:** pair removed. The field is now `tests:` alone.

### D-15

**Held by tests — in part, sentence 2:**
- a human run deploying an earlier commit or a commit of any branch:
  - `tests/deploy/test_loop2_deploy_commit.py:134` `test_human_path_fetches_every_branch_head_and_prunes`
  - `tests/deploy/test_loop2_deploy_commit.py:158` `test_earlier_ancestor_of_main_accepted_on_both_paths`
  - `tests/deploy/test_loop2_deploy_commit.py:206` `test_commit_only_on_another_branch_accepted_on_human_path`
- the key deploys only commits of `main`:
  - `tests/deploy/test_loop2_deploy_commit.py:189` `test_commit_only_on_another_branch_refused_on_forced_path_absent_from_clone`
  - `tests/deploy/test_loop2_deploy_commit.py:195` `test_commit_only_on_another_branch_refused_on_forced_path_after_human_fetch`
  - `tests/invariants/test_loop2_deploy_trigger_input.py:154` `test_commit_only_on_another_branch_refused`
  - `tests/invariants/test_loop2_deploy_trigger_input.py:161` `test_commit_of_another_branch_the_clone_already_holds_refused`
  - `tests/invariants/test_loop2_deploy_trigger_input.py:173` `test_commit_main_no_longer_holds_refused`

**Held by tests — in part, sentence 3:**
- "No earlier image is kept" (the prune of dangling loop2 images): `tests/deploy/test_loop2_deploy_switch.py:86`

**Held by invariants:** `loop2-deploy-keeps-running` holds sentence 1 whole.

**Held by nothing:**
- "a revert merged to `main`";
- a kept earlier image that is not dangling, such as one tagged per commit;
- that a rollback restores code but not data.

**Verification became:** pair rewritten.

### D-16

**Held by tests — in part, sentence 2** (compares and only warns):
- `tests/deploy/test_loop2_deploy_build.py:58` `test_installed_copy_equal_to_the_source_gives_no_warning`
- `tests/deploy/test_loop2_deploy_build.py:67` `test_difference_warns_with_the_rollback_wording_and_continues`
- `tests/deploy/test_loop2_deploy_build.py:84` `test_commit_without_the_sources_warns_for_each_pair_then_fails_the_build_with_7`
- `tests/deploy/test_loop2_deploy_build.py:158` `test_all_six_differing_warn_six_times`

**Held by invariants:** none.

**Held by nothing:**
- sentence 1 (the key runs only the installed copy, outside the checkout);
- "reinstalling the copy is a human's change".

**Verification became:** pair rewritten.

### D-17

**Held by tests — in part, sentence 1** (never prunes the build cache or base images):
- `tests/invariants/test_loop2_host_sharing.py:395` `test_every_docker_command_is_one_a_deployment_may_run`
- `tests/deploy/test_loop2_deploy_switch.py:86` `test_switch_probe_prune_and_last_line`
- `tests/deploy/test_loop2_deploy_switch.py:246` `test_no_down_no_other_project_no_unfiltered_prune`

**Held by tests — in part, sentence 2** (the thresholds):
- `tests/deploy/test_loop2_deploy_build.py:181` `test_memory_below_1024_mib_exits_5_without_a_build`
- `tests/deploy/test_loop2_deploy_build.py:193` `test_disk_below_4_gib_exits_5_without_a_build`
- `tests/deploy/test_loop2_deploy_build.py:205` `test_exact_thresholds_pass`
- `tests/deploy/test_loop2_deploy_build.py:231` `test_unreadable_values_exit_5`
- `tests/invariants/test_loop2_deploy_keeps_running.py:127` `test_stop_at_the_memory_reading`
- `tests/invariants/test_loop2_deploy_keeps_running.py:133` `test_stop_at_unreadable_memory`
- `tests/invariants/test_loop2_deploy_keeps_running.py:139` `test_stop_at_the_disk_reading`
- `tests/invariants/test_loop2_deploy_keeps_running.py:145` `test_stop_at_unreadable_disk`

**Held by tests — in part, sentence 3:**
- `/app/data/accounts.sqlite`: `tests/invariants/test_loop2_host_sharing.py:448` `test_production_account_configuration_is_fixed`
- the path read from compose and the fresh directory owned by 1000:1000: `tests/deploy/test_account_storage.py:97` `test_replaced_container_keeps_accounts_and_sessions`

**Held by invariants:**
- `loop2-host-sharing` holds that nothing of another workload is touched, the read-only grants under D-13, and the application alone mounting `loop2_accounts` at `/app/data`.
- `account-save-durable-storage` (method review) holds the database kept across container replacement. A rollback is also such a replacement, and the deployment cannot remove its volume, because `volume rm` and `down` are not on the allowed list.

**Held by nothing:** "each loop2 container runs under its own memory limit".

**Verification became:** pair rewritten.

## The pairs added or rewritten, for the human's acceptance at the merge

No pair was added. D-14's pair was removed. D-12's pair is unchanged. These pairs were rewritten:

- **D-08**
  - complies: the loop2 containers deployed on the Mikrus host through the forced command of the installed deploy script
  - violates: a workflow or deploy script that runs the game or its account and save server on a host of another provider, such as a cloud platform's container service
- **D-09**
  - complies: the automation's key in `authorized_keys` restricted to the forced command of the installed deploy script
  - violates: a key that opens a shell on the server; a workflow step that fetches or builds the code on the runner and copies the result onto the server
- **D-10**
  - complies: the connector run as a remotely managed tunnel from its token file with `--protocol http2` and `--edge-ip-version 4`, under a memory limit of its own, the tunnel's published route sending the hostname to `http://app:3000`
  - violates: a connector left to choose its protocol or IP version itself; a connector service with no memory limit; a locally managed tunnel run from a configuration file of its own; a proxied AAAA record, Origin Rule or Configuration Rule kept for loop2 beside the tunnel's hostname
- **D-11**
  - complies: the deployment job with no `environment:` whose protection rule waits for a reviewer
  - violates: a deployment job given an `environment:` whose protection rule holds every push to `main` until someone approves it
- **D-13**
  - complies: the encryption key file owned by root with group root and mode 0400 and the key to Strych at `/backup_key`, each copied in the owner's private note; a request that names a credential by its secret name; a human rotation that replaces the host file and its private copy before recreating the consumer, an old session secret kept after the new first one until 30 days past the last deployment able to sign with it, and an old encryption key kept in the private note while a backup made with it remains
  - violates: an access or credential value in a request, a skill, a command argument, a log or a container environment; a world-readable credential file on the host; removal of an old session secret while its signatures can still be valid, or of an old encryption key while a backup still needs it
- **D-15**
  - complies: a revert merged to `main`, deployed as any push; a rollback that rebuilds the earlier commit and leaves the database volume as it is
  - violates: a rollback that restarts a kept image of an earlier commit, such as an image tagged with each commit and kept past its replacement; a rollback that also restores a copy of the database from that time
- **D-16**
  - complies: an `authorized_keys` entry whose forced command names the root-owned installed copy's path outside the checkout; a deployment that leaves the installed copy as it found it
  - violates: a forced command that points into the server's checkout; a deployment that reinstalls its own script
- **D-17**
  - complies: each Compose service of loop2 with a memory limit of its own
  - violates: a Compose service of loop2 with no memory limit

## Where a decision's wording differs from the code (R3: nothing of it changed)

- **D-14** says "The loop2 container" in the singular. Since D-10, loop2 runs two containers, the application and the connector, both built and started by Docker Compose.
- **D-17**, sentence 2, says memory and disk "stay above thresholds". The deploy script builds at exactly the thresholds: `test_exact_thresholds_pass` passes 1024 MiB and 4 GiB. So "at or above" is what the code does.
- **D-16** speaks of the deploy script alone. The deployment compares six installed copies with their sources (`tests/deploy/test_loop2_deploy_build.py:1-10`): the backup script and its schedule, the watcher and its schedule, and the logrotate file. Those five pairs are not this decision's subject.
- **D-15**, sentence 3, says "No earlier image is kept". The deployment prunes only *dangling* images labelled loop2 (`docker image prune --force --filter label=…`, without `--all`). An earlier image that still carried a tag would be kept.
- **D-10**, sentence 3, lists "waits for both application health and an active connector connection". The connector's readiness check is `cloudflared tunnel … ready` through Compose's health check. `tests/deploy/test_loop2_tunnel_image.py` itself says it is "not evidence of authenticated readiness".

## Problems observed

None. Every focused run passed. The three tests that need Docker ran against a live daemon; none
was skipped.
