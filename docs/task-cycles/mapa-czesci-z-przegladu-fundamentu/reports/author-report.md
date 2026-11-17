# Author report: mapa-czesci-z-przegladu-fundamentu

**Status:** done with concerns (the work is complete and committed; six points are for the orchestrator, below, each with the reading I took and a recommendation).

Worktree `the task's worktree`, branch `task/mapa-czesci-z-przegladu-fundamentu`, base `ea6383975cb72e875d215dfc23c171cafb838207`.

## Commits (range `ea638397..abd32bab`)

| Commit | What |
|---|---|
| `b237e0ba` | Part map: items 4, 5, 6, 7 of the task (`agent-workflow` depends on `simulation` with its reason in the sentence; `simulation` out of *Depends on* of `account-server`; `.gitattributes` to `build-tools`; `tests/invariants/account_container_support.py` to `deployment`). |
| `bbe59c96` | Item 1: invariant `page-address-fragment`, three view files in *Trust boundary* of `browser-view`, three rows in the table of `guidelines/testing.md`, marker `// invariant: page-address-fragment` in 12 tests of three files, two added cases. |
| `dc51a43c` | Item 2: invariant `deploy-workflow-input`, four files in *Trust boundary* of `deployment`, two rows in the table of `guidelines/testing.md`, marker `# invariant: deploy-workflow-input` in 2 tests. |
| `abd32bab` | Wording of the compose and Dockerfile row without two paths the instruction check reports as dead. |

Files changed (added / removed lines, `git diff ea638397 --stat` before the last commit): `foundations/invariants.md` +20, `foundations/part_map.md` +12/-5, `guidelines/testing.md` +7/-2 (then a 2-line rewording), `tests/deploy/test_deploy_workflow.py` +2, `tests/view/screen-address.test.mjs` +9, `tests/view/email-confirmation.test.mjs` +3, `tests/view/password-reset.test.mjs` +2. None of the boundary files themselves (`screen-address.ts`, `email-confirmation.ts`, `password-reset.ts`, `deploy.yml`, `compose.yaml`, both Dockerfiles) is changed; no mutation is committed.

## Entries written (foundation step)

Both rows of *Settlements to record*, each marked `row <n>`; the part-map changes carry the task's *To do* items 4 to 7 and the *Trust boundary* lines items 1 and 2, marked `task item` (no row).

- `page-address-fragment`, `row 1`, `foundations/invariants.md`. English: the fragment of the page's address opens only a screen D-281 names or the nearest existing one, and the token of an emailed link in it goes unchanged into the body of its own one request and nowhere else, the server being the one that judges it. Po polsku: fragment adresu strony otwiera tylko ekran z listy D-281 albo najbliższy istniejący, a token z linku z poczty idzie bez zmian wyłącznie w treść swojego jednego żądania, gdzie ocenia go serwer. *Method* `test`, *Rests on* `none`, *Derives from* D-281 · D-156 · D-224, *Part* `browser-view`, *Violated* `no`.
- `deploy-workflow-input`, `row 2`, same file. English: the deployment workflow gives the script of its deployment step every value from outside the repository only as an environment variable of that step, and the script's one SSH call sets strict host-key checking and batch mode on its command line. Po polsku: workflow wdrożenia podaje skryptowi kroku wdrożenia każdą wartość spoza repozytorium tylko jako zmienną środowiska tego kroku, a jedno wywołanie SSH tego skryptu ustawia w wierszu poleceń ścisłe sprawdzanie klucza serwera i tryb wsadowy. *Method* `test`, *Rests on* `openssh-strict-host-key-checking · openssh-option-order`, *Derives from* `recovered from code —` (the step "Deploy the commit on the server" of `deploy.yml`: no decision of the log carries either clause), *Part* `deployment`, *Violated* `no`.
- Part map, `task item 4`: `agent-workflow` *Depends on* gains `simulation`; the reason stands in its binding sentence, because the template gives a part no other place for a reason: "It also holds the skill to play the game, which composes the game state it plays from functions of the simulation; that is why it may depend on the simulation."
- Part map, `task item 5`: `account-server` *Depends on* is now `browser-view · build-tools`.
- Part map, `task items 6 and 7`: `.gitattributes` moved to *Files* of `build-tools`; `tests/invariants/account_container_support.py` moved to *Files* of `deployment`; `tests/deploy/test_restore_trial.py` stays in `deployment`.
- Part map, `task items 1 and 2`: *Trust boundary* of `browser-view` gains the three view files; that of `deployment` gains `compose.yaml`, `.github/workflows/deploy.yml`, `Dockerfile`, `deploy/cloudflared.Dockerfile`.
- Task item 3: I looked at `scripts/restore-trial.mjs`; it stays with no trust boundary, nothing written.

Text for the request's description (agent-workflow and the gap of the test), in words it can copy: "`agent-workflow` may now depend on `simulation`. This is a rule with a reason, not an alignment of the map to the code: the skill to play the game (`.claude/skills/loop2-play/compose-state.mjs` and its copy in `.agents/skills/loop2-play/`) composes the game state from functions of the built simulation. The test `cross-part-imports` does not see this import: it reads `import()` only with a string literal, and `compose-state.mjs` loads the simulation through `import()` of a path built in code (`pathToFileURL(join(sim, name)).href`), which the test lists under 'Does NOT cover'. So no test enforces this dependency or its absence."

## Places updated where an entry is cited (search of the foundation)

`guidelines/testing.md` section "Trust boundaries": the *Decision* list gained D-10, D-13, D-237, D-281; the *Invariant* list gained `page-address-fragment` and `deploy-workflow-input`; five rows added (three view files, `deploy.yml`, one row for `compose.yaml` + `Dockerfile` + `deploy/cloudflared.Dockerfile`). The `deploy/` row is unchanged; the new compose row says the `cloudflared` Dockerfile in `deploy/` is outside its tests. The test markers are in the four test files. No other entry names these files or identifiers (searched `foundations`, `guidelines`, `AGENTS.md`, `src/browser/AGENTS.md` for the three view files, `deploy.yml`, `cloudflared.Dockerfile`, `account_container_support`, `.gitattributes`; `guidelines/coding-browser-module.md` only lists the three view files with their kind, not as boundaries).

Findings I did not write (entries beyond the two rows): the *Verification* of D-281 (names tests only) and of D-09 (names `loop2-deploy-trigger-input` only) could name the new invariants, through `record-decision`; there is no environment fact for how GitHub Actions substitutes `${{ }}` in a `run` script, nor for the runner's own SSH configuration (`openssh-extra-host-key-sources` is held for the Mikrus host only). The second invariant rests on the two OpenSSH facts that exist.

## Checks (command, directory, exit)

Scratch worktree `.runs/author/wt` (detached at the base, with `node_modules` linked from the main checkout because the task worktree has no `node_modules` and no `dist`) held every mutation; `mutate.py` applies one mutation, rebuilds (`node scripts/build.mjs`), runs the one test file, restores and runs it again. Script and raw results: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/author-evidence/` (`mutate.py`, `results_view.json`, `results_deploy.json`, `results_pre.json`, `results.json`, `view_summary.txt`). Commands: view `node --test --test-reporter=tap tests/view/<file>.test.mjs`; deploy `python -B -m unittest tests.deploy.test_deploy_workflow`, both run from the scratch worktree.

### Each marked test, shown failing once and passing

For every mutation: run with the break = exit 1 with the tests named; the same command after the restore = exit 0 (the 26 mutations of the table, and D6 and D7 of point 1 below).

| Mutation (break of the guarded behaviour) | Marked test that fails |
|---|---|
| S1 case-insensitive address regex | `a fragment with an upper-case address reads as no screen` (loop test) |
| S2 any text accepted as a map identifier | the 9 map-address cases of the loop test (hyphen, Polish name, capital, percent-encoded, fragment/hash after it, `__proto__`, `constructor`, trailing slash) |
| S3 / S3b the emailed-confirmation / password-reset fragment read as Siedziba | the loop-test case of that fragment |
| S10 address percent-decoded before reading | the two percent-encoded cases of the loop test |
| S4 character screen kept with no such character | `a character screen of a number no character carries gives Siedziba` |
| S5 list of accounts kept for a non-owner | `a player's address of the list of accounts opens Siedziba` |
| S6 map screen kept off the list of open maps | `a map off the list of open maps gives Siedziba: ...` |
| S7 program screen kept with no such program | `a program screen of a number no program carries gives Programy` |
| S8 run screen always kept | the three run-screen tests (`... with no map run of its character ...`, `... with no map run, but with another's ...`, `... of a number no character carries gives Siedziba`) |
| S9 no named screen opens Programy | `no screen named gives Siedziba` |
| E1 token judged (43 base64url characters or none) | `the fragment's token is read, and a fragment without one yields none`; `a definitive answer ... sends the token once ...` |
| E2 key found anywhere in the fragment | `the fragment's token is read, ...` |
| E6 token percent-decoded | `the fragment's token is read, ...` (only because of the added case, below) |
| E3 token lower-cased before sending | `a definitive answer ... sends the token once ...` |
| E4 token sent twice | `a definitive answer ... sends the token once ...` |
| E5 fragment cleared before the answer | `a definitive answer ... sends the token once ...` |
| P1 token judged | `the fragment's token is read as it stands, and any other fragment yields none` |
| P2 key found anywhere | same test |
| P3 the confirmation fragment read as a reset token | same test |
| P4 token percent-decoded and trimmed | same test (only because of the added case) |
| D1 `${{ github.sha }}` inline in the `ssh` line | `test_sha_reaches_the_script_only_through_env` (and `test_ssh_forwards_nothing_and_takes_only_the_sha`, unmarked) |
| D2 `${{ secrets.DEPLOY_PORT }}` inline in the `run` script | `test_sha_reaches_the_script_only_through_env` only |
| D3 `StrictHostKeyChecking=no` | `test_ssh_is_strict_and_batch` |
| D4 `StrictHostKeyChecking=accept-new` | `test_ssh_is_strict_and_batch` |
| D5 `BatchMode=yes` removed | `test_ssh_is_strict_and_batch` |

Every marked test appears above: the 9 of `screen-address.test.mjs` (the loop test, which makes 33 cases, counts as one; then the three run-screen tests, character, program, no screen, map off the list, player's `#/konta`), the 2 of `email-confirmation.test.mjs`, the 1 of `password-reset.test.mjs` (12 in the view files) and the 2 of `test_deploy_workflow.py`.

Mutations that no test of the files caught before my change, and the cases I added: E6 and P4 (percent-decoding of the token) survived the existing tests (`results_pre.json`: exit 0, no failure), so the clause "unchanged" of the invariant was unprotected. I added one case to each list, `["a percent-encoded token", "#confirm-email=%41%2B", "%41%2B"]` and `["a percent-encoded token", "#reset-password=%41%2B", "%41%2B"]`, which are the only tests I added (they fail on E6 and P4, pass on the code).

### Other checks

| Check | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at the base, before any change | exit 0, `0 errors` |
| same, after the last commit `abd32bab` (no switch) | exit 0, output `0 errors`; every tracked file belongs to exactly one part (this is the check for moving `.gitattributes` and `account_container_support.py`) |
| `python -B .the-way/instruction-files/check_instructions.py` after the last commit | exit 0, `0 error, 147 warn, 7 info` (my first version of the compose row added two dead-path warnings, 149; I reworded and they are gone, 147 stands as before) |
| `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` (task worktree, after commit 1, and in the scratch worktree with the final part map) | exit 0, 10 tests |
| `python -B scripts/test.py tests/invariants/test_application_package_layout.py` (task worktree, and scratch with the final map) | exit 0, 2 tests |
| `python -B scripts/test.py tests/quality/test_source_tool_scope.py` in the scratch worktree with the new part map | exit 0, 4 tests |
| same in the task worktree | exit 1: `test_prettier_patterns_check_every_scope_file` lists nearly every file; cause verified: the task worktree has no `node_modules` (the base in the scratch worktree with `node_modules` passes, exit 0). Not caused by my change. |
| `python -B scripts/test.py tests/deploy/test_deploy_workflow.py` (task worktree, last tree) | exit 0, 16 tests |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the three view test files (scratch) | exit 0 |
| `python -B -c "import tests.deploy.test_restore_trial ..."` (the importer of the moved file) | exit 0 |
| grep claim of item 5: `git grep -nE "sim/\|/sim\b\|simulation" -- src/server <the 11 `tests/*.mjs` and the 5 `tests/invariants/*.py` files of account-server>` | exit 1, no match (no file of `account-server` mentions the simulation); `test_cross_part_imports` passes with `simulation` out of its *Depends on* |

Not run: `npm test` (not mine). `tests/deploy/test_restore_trial.py` as a test run (its case at line 374 needs the Docker daemon, `docker_gate.require_daemon` would start Docker Desktop; I checked its import only). The view test files in the task worktree itself (no `dist`, no `node_modules`; run in the scratch worktree with the same files instead). `tests/invariants/test_loop2_container_icons.py`, `..._sprites.py`, `..._one_serving_process_container.py` (Docker); the move changes only which part owns the helper they import, which `cross-part-imports` and the foundation check cover.

Mismatch in the handoff: `python -B -m unittest tests.invariants.test_cross_part_imports` fails with `ModuleNotFoundError: No module named 'loop2_invariant_support'` (tests of `tests/invariants/` import their support module as a top-level name); I used `python -B scripts/test.py <file>`, the repository's one-file form.

### Own-work check (section 3)

Requirement most likely not met: "the test that refuses must really refuse; check each marked test against its rule, not its name". Check: the mutation table above, each marked test failed for the break of its rule. It found two things: the percent-decoding hole (E6, P4) which I closed with two cases, and that two of the four deploy tests the task names (point 1 below) do not refuse the rule. A second requirement: "each tracked file in exactly one part": the foundation check, exit 0.

## Questions and concerns, each with the reading taken and a recommendation

1. **Two tests the task names for `deploy.yml` are not marked.** `test_exactly_the_five_secrets` and `test_decoded_key_is_never_printed` do not fail when the rule of `deploy-workflow-input` is broken: D2 (a secret inline in the `run` script, the same five secrets) leaves the first passing; they fail only on D6 (a sixth secret) and D7 (`echo "$SSH_KEY_BASE64"`), which break other properties (the set of secrets, a secret not printed). I marked `test_sha_reaches_the_script_only_through_env` and `test_ssh_is_strict_and_batch`, which fail on D1, D2, D3, D4, D5. Recommendation: leave the two unmarked now; if the human wants them kept from removal as redundant (the task's "Not chosen" reason), the smallest honest way is a third entry, `deploy-workflow-secrets` ("the workflow uses exactly the five secrets and prints none of them"), in its own task, rather than widening this sentence. Cost of leaving: the two tests stay linked to no boundary, as today.
2. **The sentence of `page-address-fragment` has two clauses** (address opens only listed screens; token goes only into its one request), as row 1 says it. The invariants template wants one rule per entry and the failure of one test to show one rule. Reading taken: one entry, as the row. Recommendation: keep; if split is wanted, `page-address-screen` and `page-address-token`, the marks already sit one-to-one (screen-address tests, then the two token files).
3. **Added cases (the percent-encoded token)** go beyond "mark the existing tests"; reason above. Recommendation: keep; removing them leaves E6 and P4 unprotected.
4. **`deploy/cloudflared.Dockerfile` is already inside `deploy/**`** in the *Trust boundary* of `deployment`; I listed it by name as the task says, so the entry carries a pattern covered by another. `foundation_check` accepts it. Recommendation: keep (it matches the table row that names the file); drop the line if a duplicate pattern is unwanted.
5. **Tests of the files left unmarked on purpose:** `a lost connection or a server error keeps the fragment, so a reload tries again` (fails on E1, E3, E4, E5 too, but its subject is the retry, not the token's single request), `an address without a token sends nothing` and the two reading tests of the screen address that do not refuse (`... reads as its screen`). The case that the token goes into the JSON body is proved by `tests/account-api.test.mjs`, marked `account-client-requests`, not by the three files; the table rows say so. I did not read `tests/view/account-screen.test.mjs`, which the password-reset test header names as proof of the form, so I claim nothing about it. Recommendation: leave as is.
6. **`Derives from` of `deploy-workflow-input` is `recovered from code —`**, because no decision of the log says either clause (D-09 and D-13 are close but say less). If the human prefers it to name D-09 · D-13, that changes the entry, not the tests.

## Choices made, with the way rejected

- Reason of the `agent-workflow` dependency in the binding sentence (the template has no other field): rejected a separate note or a comment, which nothing reads. Cost if wrong: the sentence is rewritten.
- Three rows (one per view file) instead of one row for the three files; one row for `deploy.yml`; one shared row for `compose.yaml` and the two Dockerfiles. Rejected one row for the three view files (the cell would carry nine test names for three files).
- No move of code out of a function over a threshold: the change touches no product code (the guidelines' rule of size does not apply).
- The compose row names what the review checks from the task ("secrets only as files in /run/secrets, where the images come from") and adds only what D-10, D-13, D-237 and the two files say.

## Reaches beyond the handoff

`scripts/test.py` (how a one-file Python run goes); `tests/quality/test_source_tool_scope.py` and `tests/invariants/test_application_package_layout.py` (both read the part map and name `.gitattributes` or build-tools, so run after the moves); `tests/account-api.test.mjs` lines 130 to 210 (token in the JSON body); D-12 and D-413 in `foundations/decisions.md` (neighbours of D-13 and the model of the review-only row for `tests.yml`); `foundations/environment_facts.md` headings and the three OpenSSH facts; `guidelines/coding-browser-module.md` (grep only).

## Working copies

One: the detached worktree `.runs/author/wt` with a junction `node_modules` to the main checkout's `node_modules`. The junction was removed first (`rmdir`, the target still holds its 268 entries), then the worktree with `git worktree remove --force` and `git worktree prune`; both gone. `.runs/author/` keeps only `mutate.py` and the result files, copied to `reports/author-evidence/`. Nothing remains uncommitted in the worktree.

## Unread material

- `guidelines/styleguide-browser-view.md`: not read (the handoff names it; I changed only test files of `tests/view/`, which the part owns, and no screen).
- `guidelines/coding-*.md` kind files: not read (no row of the index matches the work).
- Decisions: D-210 and D-351 not opened whole (D-351 read only as quoted in the task and in `test_cross_part_imports.py`'s docstring); D-73, D-76, D-273 read in part (their binding sentences, *Verification* and, for D-76, *Rationale*; D-273's *Rationale* and *Rejected* not); D-237 read to its first rationale lines; D-332, D-160, D-277, D-280, D-39, D-104, D-264, D-88 (cited by `decision:` lines of the test files I marked; I changed none of those lines) not opened.
- Invariants: I did not run the search of *Part* for `browser-view`, `deployment`, `agent-workflow`, `account-server`, `build-tools`, `every`; I read `loop2-container-isolation`, `loop2-deploy-trigger-input`, `loop2-deploy-keeps-running`, `loop2-application-port`, `loop2-host-sharing`, `email-confirmation-link`, `password-reset-link` and neighbours, `cross-part-imports`, `browser-failure-report` and the withdrawn list. The tests I marked cited no invariant before.
- `foundations/decisions.md` index at `decision-index.md`: read the first 80 lines only.
- Examples named by `examples.md` of `part-map` and `invariants` (`decisions`, `repository`, `installation-command`, `instruction-file-imports`, ...) in the-way's foundations: not read; I followed the templates and the neighbouring entries of this repository.
- `elements/common/critique/`, `first_map.md`, `missing_element_file.md`, `projected_mode.md`, `project-level/technology/reserved_choices.md`: not applicable, not read.

## Searches not found or unclear

- The part-map template gives a part no field for a reason; "where the template lets a part carry a reason" is only its binding sentence, which I used.
- `deploy/cloudflared.Dockerfile` is already matched by `deploy/**` (point 4).
- No environment fact for GitHub Actions' substitution in `run` scripts, nor for the runner's SSH configuration; the second invariant rests on the two OpenSSH facts held (finding above).
- The handoff's `python -B -m unittest tests.invariants.test_cross_part_imports` does not run (mismatch above).
- Whether D-09 and D-281 should name the new invariants in their *Verification* is unclear to me; left as a finding.
