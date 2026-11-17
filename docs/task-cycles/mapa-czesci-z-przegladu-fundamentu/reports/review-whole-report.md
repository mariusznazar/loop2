FAIL abd32babdc7c3d68f6da53d444d1a65663208cfd

# Review of the whole change: mapa-czesci-z-przegladu-fundamentu

Range `ea6383975cb72e875d215dfc23c171cafb838207..abd32bab` (four commits `b237e0ba`, `bbe59c96`, `dc51a43c`, `abd32bab`), worktree `the task's worktree`, `git rev-parse HEAD` = `abd32babdc7c3d68f6da53d444d1a65663208cfd` (matches the dispatch). `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink. No plan, no slices: every finding comes from the one author's range, none from a slice. Paths below are relative to the worktree root.

Counts: 1 blocking (Important, within the task), 7 Minor (all within the task), 0 out-of-scope findings; Declined to judge has 4 lines.

## Changed files (lines before → after, `change_file_sizes.py`)

| File | Before | After | Change |
|---|---|---|---|
| `foundations/invariants.md` | 1405 | 1425 | +20 |
| `foundations/part_map.md` | 223 | 230 | +7 |
| `guidelines/testing.md` | 486 | 491 | +5 |
| `tests/deploy/test_deploy_workflow.py` | 155 | 157 | +2 |
| `tests/view/email-confirmation.test.mjs` | 174 | 177 | +3 |
| `tests/view/password-reset.test.mjs` | 102 | 104 | +2 |
| `tests/view/screen-address.test.mjs` | 417 | 426 | +9 |

No product code changed. `guidelines/coding.md` has no `### Size of a function and a file` rule, so there is no size test to run; the growth is comment lines and two table cases, no structure finding.

## Findings

### Important

**I-1. The marked refusal test of `deploy-workflow-input` lets a crafted workflow step turn host-key checking off, and the row of `guidelines/testing.md` claims a check the test does not make.** Within the task (item 2, row 2 of *Settlements to record*, and the rule of `### Trust boundaries`: a refusal test "sprawdzający odmowę bezpośrednio").

- Place: `tests/deploy/test_deploy_workflow.py:58-63` (`test_ssh_is_strict_and_batch`, marked `# invariant: deploy-workflow-input` in `dc51a43c`); `guidelines/testing.md:185`; `foundations/invariants.md:1410`, `:1413`.
- What is wrong: the invariant says "the script's one SSH call sets strict host-key checking and batch mode on its command line" and rests on `openssh-option-order` ("`ssh` uses the first value it obtains for each parameter"). The row of the table says the case checks "`StrictHostKeyChecking=yes` i `BatchMode=yes` w wywołaniu `ssh`, bez żadnej innej wartości tej opcji". The test does neither: it looks for the two strings anywhere in the comment-stripped text of the whole file, and its negative check `StrictHostKeyChecking=(?!yes)` sees only the `=` form of the option. So:
  - R1: inserting `-o "StrictHostKeyChecking no"` before the existing `-o StrictHostKeyChecking=yes` on the `ssh` call — by `openssh-option-order` the first value, `no`, wins, so the connection accepts any host key — passes the two marked tests (exit 0) and all 16 tests of the file (exit 0);
  - R2: `-o BatchMode=no -o BatchMode=yes` passes the same way;
  - R3: both options removed from the `ssh` call and written into an `echo` of the probe step passes the same way.
  None of these breaks would fail a test, so the boundary `.github/workflows/deploy.yml` (keys, deployment) has no test that refuses its rule's second clause against a crafted step — the risk the dispatch named ("whether ... a crafted workflow step would get past").
- Why it matters: the change makes this test the method of a trust-boundary invariant and the row tells the next reviewer the test checks the ssh call and rejects any other value; a reviewer of a later change to `deploy.yml` trusts a green run that does not hold. The test pre-dates the change, but marking it and writing the row's claim are this change's.
- Evidence: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-whole-evidence/results_deploy.json` (script `mutate_deploy.py` beside it): for R1, R2, R3 `marked_exit` 0, `whole_file_exit` 0, `restored_exit` 0.
- What would fix it, within the task: make the case read the options of the one `ssh` call — the joined line `code()` gives — taking the first value of each option in every form `ssh` accepts (`-o K=V`, `-o "K V"`, `-oK=V`), and assert the first value of `StrictHostKeyChecking` and of `BatchMode` is `yes`, as `tests/deploy/test_loop2_backup.py:190-195` already does for D-238 (`options["BatchMode"]`); show it failing on R1 once; and let the row say what the test then checks. The alternative, narrowing the row's claim to what the test checks today, leaves the boundary's rule unrefused and is not what item 2 asks.

### Minor (all within the task)

**M-1. `deploy-workflow-input` says more than row 2.** `foundations/invariants.md:1410`. Row 2 and answer 2 settle: "Dane spoza repozytorium docierają do skryptu wdrożenia w `deploy.yml` tylko przez zmienne środowiska, a połączenie SSH sprawdza klucz serwera." The entry adds "and batch mode", "on its command line" and "of that step". "On its command line" makes the clause checkable and agrees with the code; batch mode is tied to host-key confirmation by the fact `openssh-strict-host-key-checking` and has the precedent of D-238 for the backup script, which is why this is Minor and not Important; but no row or answer settles batch mode as a rule of `deploy.yml`, so a later change dropping `BatchMode=yes` would break an invariant the human did not choose. Either drop "and batch mode" from the sentence, or let the request name the addition so the human accepts it at the merge.

**M-2. "an environment variable of that step" is not refused by any marked test.** `foundations/invariants.md:1410`; `tests/deploy/test_deploy_workflow.py:70-92`. R4 — `SSH_PORT_TOP: ${{ secrets.DEPLOY_PORT }}` added to the workflow-level `env:` — passes the two marked tests and all 16 (evidence: `results_deploy.json`, R4). Such a secret reaches the environment of every step, the probe step's `curl` included. `test_sha_reaches_the_script_only_through_env` checks that no `${{ }}` stands inside a `run` script and that `github.sha` stands on some `env:` line at any indentation, not the step's. Either let the test check that every `secrets.`/`github.sha` expression stands in the `env:` mapping of the step "Deploy the commit on the server", or drop "of that step" from the sentence (row 2 does not carry it).

**M-3. The *Rests on* of `deploy-workflow-input` names facts that decide nothing of the sentence, about another OpenSSH.** `foundations/invariants.md:1413`. The sentence is about what the workflow's text gives the `ssh` call, which no fact decides; `openssh-strict-host-key-checking` and `openssh-option-order` are the reasons the command line matters, and both are read for OpenSSH portable 8.9p1, the Mikrus host's, while the call runs on GitHub's `ubuntu-24.04` runner. The invariants template: "A fact that is only a reason for a decision the entry derives from stays in that decision's *Based on*". `none`, or a fact of the runner's ssh, would be accurate; this does not change what the test does.

**M-4. Each new entry joins more than one rule in one sentence.** `foundations/invariants.md:1400` (the screen a fragment opens; the token going unchanged into its request) and `:1410` (values only through the step's environment; strict host-key checking; batch mode). The invariants template: "One entry states one invariant ... One invariant per entry lets the failure of its test, seen once, show that the test catches that rule (WAY-08)". The task mandates one invariant per row ("nowy niezmiennik"), so this defect is the task's; the marks already split one-to-one (screen-address tests vs. the two token files; the sha test vs. the ssh test), so a split into two entries each would cost only the entries.

**M-5. The *Decision* list of `### Trust boundaries` lacks D-224.** `guidelines/testing.md:155`. The change adds D-281 for the new invariant, which derives from D-281 · D-156 · D-224, and the row of `password-reset.ts` (`:178`) rests on D-224, but D-224 is not in the list (D-222, D-225, D-226 are).

**M-6. The row of `password-reset.ts` does not name the test that proves the reset token reaches its request unchanged.** `guidelines/testing.md:178`. The row says the request body with the token is guarded by `account-client-requests` and `password-reset-link`; the first says the client sends the JSON body a route takes, the second is the server's. The step from the fragment into the form's request — `showReset(token)` in `src/browser/view/app.ts:789-813`, the form sending it — is proved by `tests/view/account-screen.test.mjs:1632` ("a sent form ... sends the token and both passwords once", `[ ["setPassword", RESET_TOKEN, ...] ]`) and `:6502`, which carry no mark and the row does not name. No marked test fails if the reset form alters the token before sending. The task limits the marks to the three test files, so naming these two cases in the row (or marking them, if the human widens item 1) is the within-task repair.

**M-7. "its own one request" reads as a count the code does not keep.** `foundations/invariants.md:1400`. The page sends the confirmation token again after a lost connection or a server error (`tests/view/email-confirmation.test.mjs:161`, D-156 "with the token kept in the page's address for a reload"), and the reset form sends the token again after a refused password (D-225, D-226 "a good link survives every refusal"). The wording is faithful to row 1 ("swojego jednego żądania"), whose meaning is the one kind of request the token belongs to; a reader who takes "one request" as one sending would read the code as violating the entry. A wording such as "into the body of the request of its own link" with the human's agreement would remove the reading.

## The dispatch's deviations, judged

1. `test_exactly_the_five_secrets` and `test_decoded_key_is_never_printed` left unmarked: **no finding.** Answer 2 lists them ("m.in."), but item 2 asks for the mark on "testy odmowy" of this invariant, and the invariants template has a test cite "each invariant it checks" and be "seen failing once" for its rule. I read both tests (`tests/deploy/test_deploy_workflow.py:52-56`, `:119-122`): the first compares the set of secret names, the second forbids printing the key; neither fails when a value reaches the script outside the environment or when host-key checking is off (the author's D2 mutation, and my R1–R4, leave both green). Marking them would put a citation on tests that do not check the sentence. The answer's "Not chosen" concern — these two tests stay linked to no boundary — stays open; the request must name this departure from answer 2, and the author's separate invariant for the secrets is a matter for a task of its own.
2. The two added percent-encoded cases: **within the task.** Item 1 asks for "raz pokazaną porażkę" of the invariant's tests; without them nothing failed when the token was percent-decoded (the clause "unchanged"). Adding a case weakens nothing (`### Changing an existing test`). I re-ran the decoding break (V1): it fails only the marked case with the added row.
3. Unread material of the author: my own selection, below.
4. The handoff's unittest command: confirmed; `python -B scripts/test.py <file>` runs the file.
5. The sentence of `agent-workflow` (`foundations/part_map.md:128`): "It also holds the skill to play the game, which composes the game state it plays from functions of the simulation; that is why it may depend on the simulation." It says what answer 4 says — a rule with its reason, the skill composing the game state from functions of the simulation — and nothing wider; `.claude/skills/loop2-play/compose-state.mjs:9-14` loads the built simulation through `import()` of a computed path, as the task's context says. The request's description must still name the gap of `cross-part-imports` (the author's report holds a text for it).

## The rest of the task, checked

- Item 1: the three view files in *Trust boundary* of `browser-view` (`part_map.md:29-31`); `page-address-fragment` written (`invariants.md:1398-1406`); 12 tests of the three files marked; rows at `testing.md:176-178`. Marked tests refuse: V1 (confirmation token decoded), V3 (token lower-cased before sending), V4 (list of accounts for a player), V5 (map off the list kept) each fail a marked test and pass after the restore. V2 (reset token trimmed) fails nothing; I take it as equivalent in a browser, whose URL parser removes the spaces around an address and encodes those inside a fragment, so `location.hash` cannot carry them — no finding.
- Item 2: four files in *Trust boundary* of `deployment` (`part_map.md:184-188`; `deploy/cloudflared.Dockerfile` also matched by `deploy/**`, which the foundation check accepts); `deploy-workflow-input` written; two tests marked (I-1, M-1, M-2, M-3); the review-only row (`testing.md:186`) names what the review checks — secrets only as files under `/run/secrets`, not as an environment variable, build argument or image file (D-13), and images only from `node` by its major version, unpinned (D-237, whose *Verification* gives `node:24-slim` as complying) or from the official cloudflared image pinned by version and digest (D-10); `compose.yaml` holds no `image:` and only paths of secret files in `environment:`, as D-13 allows.
- Item 3: `scripts/restore-trial.mjs` stays outside every *Trust boundary*.
- Item 4: `simulation` added to *Depends on* of `agent-workflow` (`part_map.md:142`), reason in the sentence (deviation 5).
- Item 5: `simulation` out of *Depends on* of `account-server` (`part_map.md:87`); no file of `src/server/` and none of the account-server tests named in its *Files* mentions the simulation (searches below), and `cross-part-imports` passes.
- Items 6 and 7: `.gitattributes` in `build-tools`, `tests/invariants/account_container_support.py` in `deployment`; every importer of the helper belongs to `deployment` (`tests/deploy/*` and three `tests/invariants/test_loop2_container_*`/`one_serving_process_container` files); the foundation check reports every file in one part.
- *Out of scope*: nothing moved to `test-helpers`, `tests/deploy/test_restore_trial.py` not moved, `node:24-slim` not pinned. Respected.
- Reserved choices: the change settles no language, framework, library, store, login or place to run.
- Changed invariant tests, for the request: `tests/view/screen-address.test.mjs`, `tests/view/email-confirmation.test.mjs`, `tests/view/password-reset.test.mjs`, `tests/deploy/test_deploy_workflow.py` (each now cites an invariant on the head).
- The author's own-work check named the right weak point ("the test that refuses must really refuse") and its mutation table caught the decoding hole; it did not try a contrary option value in another form or the options moved off the call, which is where I-1 lies.

## Declined to judge

- `src/browser/view/game-view.ts:235-282` and `src/browser/view/app.ts:811-821` also read `address.hash()` and hand it to the three boundary files; they are not on the *Trust boundary* list. The task names exactly three files and the reading itself happens in those; whether the callers belong on the list is outside the task.
- `test_one_ssh_call` (`tests/deploy/test_deploy_workflow.py:130-132`) counts only lines that hold `-i`, so a second `ssh` call without `-i` is not counted; the test is not marked and its rule is not this task's.
- Putting the reason of a dependency into the binding sentence of a part (`part_map.md:128`): the template gives no other field, and answer 4 asks the document to carry the reason; I set it aside as the task's own choice.
- Whether D-09 and D-281 should name the new invariants in their *Verification* (author's report): writing decisions is outside the task's two rows.

## Checks

| Check | Command or method | Exit / result |
|---|---|---|
| foundation check, reviewed worktree | `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 147 warn, 7 info`; the warnings on changed files (`part_map.md:212`, `testing.md:278-282`) stand on lines this change did not write |
| file sizes | `python -B .the-way/task-cycle/change_file_sizes.py ea6383975cb72e875d215dfc23c171cafb838207 abd32bab` | 0, table above |
| part imports | `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` (reviewed worktree) | 0, 10 tests |
| package layout | `python -B scripts/test.py tests/invariants/test_application_package_layout.py` | 0, 2 tests |
| deploy workflow tests | `python -B scripts/test.py tests/deploy/test_deploy_workflow.py` | 0, 16 tests |
| tool scope | `python -B scripts/test.py tests/quality/test_source_tool_scope.py` (scratch worktree with `node_modules`) | 0, 4 tests |
| build, scratch worktree of the head | `node scripts/build.mjs` | 0 |
| the three view test files | `node --test tests/view/screen-address.test.mjs tests/view/email-confirmation.test.mjs tests/view/password-reset.test.mjs` | 0, 75 tests |
| crafted `deploy.yml` steps R1–R5 | `python -B mutate_deploy.py <scratch> <out>`: each step applied, the two marked tests and the whole file run, restored, the marked tests run again | R1–R4 all green while broken (I-1, M-2); R5 (untrusted event text in the step `env:`) is allowed by the invariant and green, as expected; every restore exit 0 |
| view mutations V1–V5 on the built modules | `python -B mutate_view.py <scratch> <out>`, `node --test <file>` broken and restored | V1, V3, V4, V5 exit 1 with marked tests named; V2 exit 0 (equivalent, above); every restore exit 0 |
| Prettier on the three view test files | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <3 files>` (scratch) | 0 |
| Ruff on `tests/deploy/test_deploy_workflow.py` | `python -B -m ruff check --config ruff.toml ...` | not run: `No module named ruff` on this computer; the change adds two comment lines there. Unverified; the full gate runs Ruff |
| full gate `npm test` | — | not run, by the dispatch; the orchestrator runs it |

## Reaches beyond the dispatch

- `tests/view/account-screen.test.mjs` (search for `token|resetPassword`, then lines 1490-1510 and 1630-1665): where the reset token reaches its request (M-6).
- `src/browser/view/app.ts:780-833`, and a search of `src/browser` for `.hash()`/`readScreenAddress`: who hands the fragment to the boundary files (M-6, Declined to judge).
- `.claude/skills/loop2-play/compose-state.mjs:1-30` and the docstring of `tests/invariants/test_cross_part_imports.py:1-38`: deviation 5.
- `foundations/environment_facts.md:516-532` (`openssh-strict-host-key-checking`, `openssh-option-order`, `openssh-extra-host-key-sources`): the facts the new invariant rests on (I-1, M-1, M-3).
- `deploy/loop2-backup` and `tests/deploy/test_loop2_backup.py` (search for `BatchMode` only): precedent of D-238 (M-1, I-1 fix).
- Search of `Dockerfile`, `compose.yaml`, `deploy/cloudflared.Dockerfile` for `FROM|image:|secrets|environment`: the review-only row.
- Search of `src/server/` and the account-server test files for the simulation: item 5.
- Search of the repository for `account_container_support`: item 7.
- `.the-way/elements/invariants/template.md` and `.the-way/elements/part-map/template.md`, whole: the form of the entries the change writes.

## Working copies

- `.runs/review-whole` held a detached worktree `wt` of `abd32bab` with a junction `node_modules` to `the main checkout's `node_modules``, the two mutation scripts and their results. The junction was removed first (`rmdir`; the target still holds its entries, `prettier` present), then the worktree with `git worktree remove --force` and `git worktree prune`, then the directory. All removed; nothing remains. The scripts, results and the decision index are kept in `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-whole-evidence/` (`mutate_deploy.py`, `mutate_view.py`, `results_deploy.json`, `results_view.json`, `index.md`, `sections.md`). The reviewed worktree is unchanged (`git status --short` empty).

## Unread material

- Decisions: the index of my selection (sections "Testing discipline", "The server: hosting, deployment, logs and failure reports", "Browser view: screens, navigation and their code", "Account email and password reset", "Code rules, exemplars and static checks"; parts `browser-view`, `deployment`, `agent-workflow`, `product-foundation`, `account-server`, `build-tools`, `simulation`; added D-281, D-210, D-32, D-46, D-09, D-10, D-11, D-351, D-332, D-156, D-224, D-13, D-237) lists 92 in full and 323 by heading; I read the 92 index entries and ran through the 323 headings. Read whole: **11** — D-09, D-10, D-11, D-12, D-13, D-32, D-46, D-156, D-224, D-332, D-413. Read through *Rationale* and the first lines of *Rejected* only: D-210, D-237, D-238, D-281, D-351; the change goes against none of them, so their *Rejected* bears nothing. No other decision bearing on the change stayed unread.
- Invariants: read whole the two new entries, `loop2-container-isolation`, `loop2-deploy-trigger-input`, `loop2-application-port`, `loop2-host-sharing`, `account-client-requests`, `email-confirmation-link`, `password-reset-link`, `cross-part-imports`, and the sentence and fields of every entry whose *Part* is `every` (three of them, at lines 168, 179 and 840, only in part, being about the simulation's time). Not read: the other entries whose *Part* names `browser-view`, `deployment`, `agent-workflow`, `account-server`, `build-tools` or `simulation` (about 60 for the first three alone), since no test the change alters cites them and the change alters no code they constrain.
- Guidelines: `guidelines/testing.md` and `guidelines/coding.md` read whole. `guidelines/styleguide-browser-view.md` not read: the change draws no screen and changes only test files of `browser-view`. The kind files `guidelines/coding-*.md` not read: no index row's *When to read* matches (no module of any kind is added or changed).
- Glossary: read `dependency of a part`, `invariant`, `part` of the-way's glossary and `deployment` of loop2's; the other entries not read.
- `.the-way/elements/invariants/examples.md` and `.the-way/elements/part-map/examples.md` and the entries they name: not read.

## Searches not found or unclear

- `ruff` is not installed as a Python module here; the lint of `tests/deploy/test_deploy_workflow.py` is unverified.
- No environment fact holds the OpenSSH of GitHub's `ubuntu-24.04` runner (M-3).
- Unclear: whether "its own one request" of row 1 means one sending or the one kind of request (M-7); I read it as the latter.
- Search of `src/server/` and of `tests/{http,startup,transport,passwords,account-storage,account-owner,owner-routes,account-backup,account-database-check,account-mail}.test.mjs` and `tests/account-database-check-standin.mjs` for the simulation (`sim/|simulation|browser/sim`): no match. No positive control was run for this pattern; the claim rests also on `cross-part-imports` passing with `simulation` out of the *Depends on* of `account-server`, which covers imports and not other reaches.
