FAIL f742a3fb

# Review of the whole change — luki-w-testach-z-przegladu

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), variant the whole change, with `whole_change.md`.
- Range `0b23580b..f742a3fb`, 31 commits, 34 files (+1217 −203 by `git diff --stat`). `git rev-parse HEAD` = `f742a3fb7bb321c586ccc2777882a7456739b115`, the head given. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink (`git ls-files --stage -- .the-way`).
- Trust boundary: the range changes no file the part map names as a boundary (`src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `compose.yaml`, `Dockerfile`, `assets/sprites/**`, `.github/workflows/**`, `package-lock.json`, `scripts/audit_dependencies.py` — none in `git diff --stat`). Crafted input at the boundaries is added only as tests: crafted saved documents (`tests/sim/saved-game.test.mjs`, `tests/invariants/test_character_team.py`, `tests/invariants/test_program_closed_lists.py`) and a crafted route (my break of `src/server/account-routes.ts`, below). No irreversible operation.

## Verdict in short

One blocking finding: the change sets `account-save-durable-storage` to *Method* `test` and gives it, as its only citing test, a case that writes and reads no saved game state, while D-17 (unchanged) says such a check cannot clear that invariant. The task asks for this citation, so the finding is a defect the task mandates; the remedy is small and within To do 11 (below). Everything else of the 17 items is met or, for the three flaky tests not reproduced, left as the acceptance criterion gives, pending the orchestrator's 3 full gate runs under load. Nine Minor findings. The commit `f742a3fb` should stay.

## Findings

### Critical

none

### Important

#### I-1. `account-save-durable-storage` reads `test`, and its one citing case does not hold its sentence, which D-17 says it cannot (blocking)

- **Place:** `foundations/invariants.md:688-694` (*Method* `review` → `test`, commit `84d2d59a`); `tests/deploy/test_account_storage.py:97-150` (the case `test_replaced_container_keeps_accounts_and_sessions`, now `# invariant: account-save-durable-storage`, and its docstring at `:20-24`, commit `60bd5bab`); `foundations/decisions.md:1798` (D-17 *Verification*, unchanged).
- **What is wrong:** the invariant's sentence is "Replacing the application container preserves the SQLite database of player accounts and saved game states." D-17's *Verification* says: "Checks of accounts and sessions alone do not establish preservation of saved game states and cannot clear account-save-durable-storage." The only case citing the invariant registers an account, reads it through its session, replaces the container and reads the account and signs in again; it never writes or reads a saved game state. The docstring the slice wrote says so itself ("it shows the database file that holds them surviving the replacement through an account and its session, and no saved game state"). So after the change the foundation holds two statements that contradict each other: the invariant counts as checked by a test (and `foundation_check.py` counts the citation as covering it), and D-17 says that very test cannot clear it.
- **Why it matters:** this is the defect the task exists to remove — its *Need*: "Fundament zawyża to, co sprawdzono". A reader of the invariant trusts a test for the saved game state, which no test shows; a change that put the saved game state in another file or table outside the volume would pass this case. By section 3 of the method (WAY-263), a change whose foundation entry it changes says more than its files do is Important.
- **Mandated by the task:** To do 11 names this citation word for word ("znacznik z `tests/deploy/test_account_storage.py`, przypadek `test_replaced_container_keeps_accounts_and_sessions`, przepięty z `account-schema-lifecycle`"), and also says "metoda `test` i znaczniki w testach, które je sprawdzają" — in tests that check them. The citation is made as asked; the defect is that the cited test does not yet check the sentence.
- **Remedy within the task (recommended):** extend the same case to save one game state before the replacement (`PUT /api/saved-game` with `version`, `basedOn: 0` and a small `game`, through the case's request probe, which today sends only GET and POST and needs a method field) and read it back after the replacement (`GET /api/saved-game`, the same `version`, `revision` 1 and `game`), seen failing once with the database path of `compose.yaml` moved outside the volume as slice 1 did; then drop the "no saved game state" clause of the docstring. The invariant and D-17 then agree with no change of either. The other way — rewording D-17 — would make the foundation drop a check it rightly asks for.
- **Evidence:** the three passages quoted above; executor 1's own concern (`reports/executor-1-report.md`, section "Concern"), which recommends the same remedy.
- **Comes from:** spans the plan's *Foundation entries* (commit `84d2d59a`, row "account-save-durable-storage — *Method* → `test`") and slice 1 (commit `60bd5bab`); a gap of the plan, which routed the concern to no slice.

### Minor

Each is within the task unless it says otherwise.

#### M-1. The comment states 750 ms where the measurement gives 740 ms (slice 17 review, Minor 1; graded here Minor, within the task)

- **Place:** `tests/account-mail.test.mjs:361`.
- **Own words:** the comment that gives the reason of the new 1.5 s deadline says the way to the held answer took "up to 750 ms with four spinning processes per CPU"; the executor's table and the commit message say 740 ms. The reason of a changed limit should carry the measured number.

#### M-2. The comment of the changed deadline holds one computer's timings (slice 17 review, Minor 2; Minor, within the task)

- **Place:** `tests/account-mail.test.mjs:357-362`.
- **Own words:** the six lines hold timings of this computer (130 ms idle, up to 750 ms under load) and a fact of smtp-server 3.21.1 (it greets 100 ms after it accepts). D-82 and `guidelines/testing.md:101-103` say a comment that carries information the code needs moves it to the foundation, and a comment without such information is not written. The timings age with the computer and the library version; the library fact is the kind of statement an environment fact keeps with its source and version. Minor: it sets no expected value and misleads no reader about behaviour.

#### M-3. smtp-server's reverse DNS lookup can still use up the whole new deadline (slice 17 review, Minor 3; Minor, within the task)

- **Place:** `tests/account-mail.test.mjs:141-187` (the test's `SMTPServer` options, no `disableReverseLookup`) and `:365` (`deadline: 1500`).
- **Own words:** before it greets, smtp-server waits up to 1500 ms for `dns.reverse` of the client's address, after its 100 ms delay; on a computer whose resolver does not answer a PTR query for 127.0.0.1 the way to the held answer is at least 1600 ms, past the new deadline, and the case would fail on the same precondition every run. Not a regression (with 300 ms it failed there too); `disableReverseLookup: true` on the test's server would remove the query from every case of the file. A follow-up for the human to weigh.

#### M-4. The Docker gate's question rests on an undocumented behaviour of Docker Desktop that the foundation does not record (slice 22, commit `f742a3fb`)

- **Place:** `scripts/docker_gate.py:10-15` (module docstring) and `:82-94` (`daemon_answers`); `tests/quality/docker_standin.py:37-48` (`cached_version`).
- **Own words:** the gate now asks `docker system df` because Docker Desktop in Resource Saver answers `docker version` from a cache. That behaviour stands only in the executor's observation of one computer (backend log lines `apicache] cache << GET /v1.55/version`) and in this docstring; Docker's documentation names no command, and no environment fact holds it. A later Docker Desktop that caches `/system/df` would bring back the old behaviour with no signal, and `system df` on a very large store could pass `ANSWER_LIMIT` (30 s) and lead to a skip. Recommended: an environment fact through `the-way-record-environment-fact`, from the Resource Saver page and the observed version, as executor 22 suggested. Minor: the change complies with D-390, D-391, D-392 and D-406 (see Scrutiny 2) and was shown to protect what it says (my break run below).

#### M-5. The check of `character-team` refuses a loop whose key and map run name two characters of the team, which the invariant does not say (slice 12, commit `de7774b5`)

- **Place:** `tests/invariants/test_character_team.py:136-137` (the altered document "a loop's map run carrying another character of the team") and `:273-275` (`membership_errors` flagging `key != str(carried)`).
- **Own words:** `character-team` says "Every character belongs to exactly one team." A loop under character 1 whose map run carries character 3 names two characters, each of which still belongs to one team; that the loop stands under the id its map run carries is the shape of D-241 ("holds its earning loops … by character number") and D-56, not this invariant. The case passes today because the load refuses such a document, but a later change of the load's shape rule would fail a test labelled `character-team` for a reason outside its sentence. The executor named the reading as unsettled. Recommended: drop that one altered document and the key check from this invariant's test, or cite the decision that holds them.

#### M-6. D-49 names as a violation "a second test that starts the server without `LOOP2_LISTEN_HOST` and `LOOP2_LISTEN_PORT`", and the change adds a second such case (slice 14, commit `dbba1499`)

- **Place:** `tests/invariants/test_account_server_default_address.py:100-123`; `foundations/decisions.md:1059` ("The one exception is a single test of the default address") and `:1066` (violates: "a second test that starts the server without …").
- **Own words:** To do 9 and the invariant `account-server-default-address` ("including wholly unconfigured non-production and fully configured valid startup") ask for this case, and read as one test file of two cases it complies with D-49; read as cases, it violates it. The harm D-49 guards against is small here, since the case passes whether 127.0.0.1:3000 is free or not. Recommended for the return step: reword D-49 through `the-way-record-decision` so that "the single test of the default address" holds a case for each start the invariant names.

#### M-7. "Every TS/JS file of the parts in D-29's scope" now literally takes in every script of agent-workflow (slice 15, commits `54909922`, `8ac7ca4e`)

- **Place:** `guidelines/coding.md:37-40`; `tests/quality/test_source_tool_scope.py:1-4`.
- **Own words:** D-29's *Scope* now names agent-workflow, so "Wzorce plików `eslint.config.mjs` obejmują każdy plik TS/JS części z zakresu D-29" read literally covers the scene-art scripts too; the next sentence ("nowy skrypt gdzie indziej w agent-workflow nie") corrects it, and the test's docstring has the same shape. Recommended: "każdy plik TS/JS pięciu części, które D-29 wymienia, i każdy plik JavaScript z trzech katalogów agent-workflow". Minor: the following sentence prevents the wrong reading.

#### M-8. The case that holds the content clauses of `sprite-credits` carries no citation of it (slice 4, commit `51618a45`)

- **Place:** `tests/view/icons.test.mjs:350` (the case "the section's last two lines credit the packs of the dust and of the wolf: what each is for, its title, author, page and licence …"); the new citing cases at `:421` and `:434`.
- **Own words:** `sprite-credits` asks for a line that names what the pack is for, its title, its author, its page with a link, its licence with a link and how the files differ; the two cases that now cite it check only that the pack's title stands in `„…”`. The existing case at `:350` pins every credit line's whole text, its links and the count of lines, so the clauses are tested, but not under the invariant's citation. Adding `// invariant: sprite-credits` above `:350` would make the invariant's test reach its whole sentence.

#### M-9. The same driver helpers written twice in two invariant tests (structure; slice 12)

- **Place:** `tests/invariants/test_character_team.py:163-171` and `tests/invariants/test_program_closed_lists.py:148-185` (`sibling`, and a saved document made through `withSaveTime`, `savedGame` and a JSON round trip, with `loadSavedGame`).
- **Own words:** both JavaScript drivers gained the same import of sibling modules and the same way to make a saved document; `tests/invariants/program_fixture.py` already holds shared driver pieces (`KNOWING_GAME_JS`, `HELD_PROGRAMS_JS`). The files grew 184 → 397 and 305 → 432 lines. `guidelines/coding.md` holds no rule of size, so this is Minor (WAY-363).

### Out of scope

none graded; the two observations outside the task stand under *Declined to judge*.

## What the orchestrator asked to scrutinise

### 1. The diagnoses of the flaky tests (slices 16-22)

- **Slice 17 (mailer, `4bfc33cd`): cause established by evidence.** The failing assertion is reproduced on demand (30 of 30 under 40 spinning processes, the slice reviewer independently 9 of 10), and a deliberate stall of 200-250 ms gives the same failure; the mechanism (smtp-server's 100 ms greeting delay plus a shared event loop against a wall-clock deadline) is read from the library's code. The repair is in the case, where the cause lies; it does not weaken the case: with the mailer's deadline ignored the case still fails (`the send exceeded 3000 ms`), and the 3000 ms limits that tell the deadline from the library's 5 s timeouts are unchanged. The tie to loop2#79's own failure is an inference, stated as such.
- **Slice 21 (container 137, `74e5365c`): cause established by evidence; tie to loop2#78 an inference.** A deterministic reproduction (a process holding the fresh database's write lock past the busy timeout gives exec 137, container `exited 1`, the server's `errcode 5` line, `OOMKilled false`) and 137 coming back by itself in the test's own sequence under disk load (2 of 10), with memory ruled out by measurement (peak ~97 MB of 512 MiB, no OOM event). The real case reproduced only the mirror form (`database is locked`, 2 of 30), which the same race explains. The repair is where the cause lies (the start sequence of the support) and removes the race rather than hiding it; it does not weaken any case (Scrutiny 3).
- **Slice 22 (image icons, `f742a3fb`): mechanism established; tie to loop2#136 an inference.** The error text of loop2#136, prefix included, is reproduced by holding the context file just after Docker Desktop's rewrite during a build that woke the VM; controls show no failure at other moments; the 40 rewrite lines in 24 h of logs each pair with an engine start. Whether loop2#136's run woke the VM cannot be read back. The repair is in the gate, a file the slice names (Scrutiny 2).
- **Slices 18, 19, 20 (transport, watcher, backup): not reproduced; nothing changed; honest.** 150, 150 and 90 counted separate runs under several loads, every run passing; each report says what is ruled out by evidence and what stays a guess (a single stall of ≥5 s; a stand-in process that never ran its first line under load on Windows, read from the failing log). By the acceptance criterion these three stay unchanged and still need the orchestrator's 3 full gate runs under load, a description in the request and a line on the task list.
- **Slice 16:** the six files ran with Git's bash, 51 tests, none skipped, all passing; nothing to repair.

### 2. Should commit `f742a3fb` stay?

Yes, keep it. Reasons:
- It lies where the slice allows a repair: "the start of Docker Desktop in `scripts/docker_gate.py` with its test `tests/quality/test_docker_gate.py`". The plan's "a cause in Docker Desktop alone … leaves every file unchanged" does not apply: the repository's own share of the cause is that the gate took a cached answer for the daemon's, which is also what D-390's rationale forbids ("Only an answer of the daemon counts as Docker being up, because that answer is what the tests need"). The change brings the gate closer to D-390, independent of loop2#136.
- It changes nothing that D-390, D-391, D-392 or D-406 say: the gate still starts Docker Desktop only where no daemon answers, waits at most 3 minutes, starts it once per run with the same lock, never stops it, and asks nothing about memory. A change that departed from any of them would be blocking (Important: behaviour against a decision of a touched part); none is found.
- `tests/quality/docker_standin.py` is changed outside the slice's *Change*; it is the stand-in helper of the gate's own test and has to answer the new question — a gap of the plan's list, no defect.
- Cost: about 0.5 s for each test that asks for a daemon (a handful of such files per run, split across the parallel directories), the reliance on undocumented cache behaviour (M-4), and on the old Docker Desktop the collision is narrowed, not removed. Against dropping it: dropping restores a gate that accepts a cached answer while the VM is stopped, which is wrong by D-390 whatever Docker Desktop's version.
- Checked: with the old question put back, the new case fails (`AssertionError: unexpectedly None`); with the commit as it is, 20 of 20 pass (checks 6-7).

### 3. Slice 21's change to `tests/invariants/account_container_support.py`

- The six other files that use `start_application` or `start_production_container` — `tests/deploy/test_account_storage.py`, `tests/deploy/test_account_backup_stream.py`, `tests/deploy/test_restore_trial.py`, `tests/deploy/test_loop2_image_icons.py`, `tests/invariants/test_loop2_container_icons.py`, `tests/invariants/test_loop2_container_sprites.py` — each start a server meant to serve; none expects a container that stops before readiness or a probe that runs before the server has opened its database. The probe (`RESOURCE_PROBE`) still proves that node writes the fresh volume (`node-write-probe`), the ownership, the modes, the settings and the limit; the only thing that changed is that the database file it opens is now the one the server created, which no case claimed to check. No case tests less.
- The wait cannot pass on a dead or failed server: the pattern is anchored to `^Loop: http://` (the line `src/server/main.ts:30` prints after `openAccountRuntime`), the running state is read each round, and the limit fails the test with the container's log. It is a wait on a condition with a limit, as D-84 allows.
- The cited text is word for word: `// decision: D-112 "The account server opens one application-owned SQLite connection before readiness"` is the start of D-112's binding sentence (`foundations/decisions.md:2732`), and `foundation_check.py` passes.
- The real container runs of the six files were not repeated by me (Docker; the executor reports each once, exit 0).

### 4. Foundation entries and markers

- Settlements row 1: D-422 (new, narrows D-73), D-73's list, `guidelines/testing.md` *When to read* and *Doubles* — present and in agreement with the case at `tests/http.test.mjs:5959`, whose comment already says it observes the call on the real response.
- Settlements row 2: `sprite-credits` → `test`, cited by two new cases; the completeness case reads the PNG files directly in `assets/sprites/`, which is exactly what `scripts/static-files.mjs:32-41` copies into the build. `login-backdrop.png` assigned to Pixel Crawler alone: I viewed the picture — trees, campfire, mage, no wolf — so the assignment is right; D-271's "sprites of the packs Pixel Crawler and LPC Wolf" is said of the scene's pictures and the login picture together.
- Settlements row 3: the three facts `express-session-id-generator`, `uid-safe-sync-id`, `random-bytes-sync-source`, each quotation found once in the installed package at the version `package-lock.json` pins (1.19.0, 2.1.5, 1.0.0); `player-opaque-session-cookie` *Rests on* names all three. Nothing invented.
- To do 11 methods: six turned to `test`, each cited — with I-1 above for `account-save-durable-storage`.
- To do 12: `account-schema-lifecycle` withdrawn with `account-database-schema` as its successor; the new sentence says "emailed link" and "refuses … before readiness"; D-112's *Verification* drops the withdrawn id; no marker of it remains (`foundation_check.py` exit 0).
- To do 16 / spec: D-29's binding sentence, *Scope*, *Rationale* and *Rejected* as the spec gives, in commit `8b32706d` alone; `eslint-source-rules` names the three directories and gains agent-workflow; D-32 and `prettier-source-format` untouched (M-7 on the guideline's wording).
- D-382's *Verification* still says no test holds the clause on rows already drawn; the plan leaves its update to the return step, where slice 6's test stands. Not a finding of this range; the return step must make it.
- Markers: `python -B .the-way/elements/common/foundation_check.py` exit 0, `0 errors`.

### 5. Structure of the code the change leaves

- First run, in the reviewed worktree: `python -B .the-way/task-cycle/change_file_sizes.py 0b23580b f742a3fb` exit 0 — 34 files modified, 41 310 → 42 324 lines (+1014). Largest growths: `tests/invariants/test_character_team.py` 184 → 397, `tests/invariants/test_program_closed_lists.py` 305 → 432, `tests/view/tabs-area.test.mjs` 647 → 749, `tests/transport.test.mjs` 1325 → 1409, `tests/view/icons.test.mjs` 390 → 474, `tests/invariants/test_program_world_reference.py` 352 → 428, `tests/sim/catch-up.test.mjs` 973 → 1043; product files `scripts/docker_gate.py` 238 → 248, `eslint.config.mjs` 98 → 110.
- Second run: not applicable. `guidelines/coding.md` holds no heading `### Size of a function and a file` (grep of its headings), so there is no test of a size invariant to run in worktrees of the base and the head; the first numbers and the diff are the material, and every structure finding is Minor (WAY-363).
- Names that stopped being true were renamed (`COMPARES_STOCK` → `COMPARES_QUANTITY`, `hang_on_version` → `hang_on_the_question`, `ANSWER_LIMIT`'s comment, the stand-in's docstring). No code left without a user. One duplication: M-9.

## Against the task, item by item

| Item | Met by | Judgement |
|---|---|---|
| To do 1 | slice 6, `1f21cf91` | met; red with `memo` removed confirmed by my run; D-382 *Verification* for the return step |
| To do 2 | slice 7, `cac04185` | met; the case asserts `data-entering`, since jsdom reads no rule inside the media query — the attribute is what the scene writes, so no finding |
| To do 3 | slice 8, `4f75e190` | met |
| To do 4 | slice 9, `24acd7e8` + `5824bb05` | met; red with a made-up PATCH route confirmed by my run; reads Express's route table (a framework internal), which fails loudly on a change |
| To do 5 | slice 4, `51618a45`; *Foundation entries* | met (M-8) |
| To do 6 | *Foundation entries* `8a4a9a76`; slice 5 `9045f5a9`, `74308be5` | met |
| To do 7 | slices 16-22 | met for 17, 21, 22 (repairs); 18, 19, 20 unchanged pending the 3 full gate runs and task lines (orchestrator's) |
| To do 8 | slice 10 `50d54bdd`; slice 13 `4377e4f3` | met; the `copy-save` citation stands on the case that checks the clause ("no switch"), which is the invariant's sentence |
| To do 9 | slice 14, `dbba1499` | met (M-6) |
| To do 10 | slices 11, 12 | met (M-5) |
| To do 11 | *Foundation entries* `84d2d59a`; slices 1, 3, 4 | met except `account-save-durable-storage` (I-1) |
| To do 12 | *Foundation entries*; slices 1, 2 | met |
| To do 13 | slice 16 (no commit) | met; result for the cycle record |
| To do 14 | *Foundation entries* `29b7d0e0` | met |
| To do 15 | slice 13 (existing control cases) | met by the existing cases of `tests/invariants/test_cross_part_imports.py` that expect "the part core does not list the part view in Depends on"; shown failing with the refusal broken |
| To do 16 | `8b32706d`; slice 15 | met (M-7) |
| To do 17 | slice 5 | met; both forms verified by the executor against the test's reading on crafted copies |

Nothing the task did not ask for was added, apart from the stand-in helper of the gate's test (needed) and the readiness wait for every container test (where the cause lies).

## Declined to judge

- Whether the single failures of loop2#79, loop2#78 and loop2#136 were the causes slices 17, 21 and 22 show: no log of those runs holds the failing moment; the acceptance criterion leaves the test of it to the 3 full gate runs.
- `// invariant: save-version` on the new case of `tests/sim/saved-game.test.mjs` (a character numbered as the next number, refused as shape): the file's neighbouring shape cases already cite `save-version` the same way; re-judging that convention is beyond the task.
- `TheDockerCommands.test_a_docker_that_never_answers_is_cut_off_and_read_as_down`, subtest `logs *` (`tests/deploy/test_loop2_watch.py:1182`), failing 2 of 6 whole-file runs under executor 19's heaviest load, and `tests/account-api.test.mjs:1221` failing once under executor 18's extreme load: outside the six tests To do 7 names; executors' observations, not checked by me. Either may meet the 3 full gate runs under load.
- The author address of the commits (`the author's git address`, foundation report concern 2): not a property of the code; the author's own git rules accept it for this account.

## Checks run

All from `the repository's root` unless named.

1. `git rev-parse HEAD` → `f742a3fb…`; `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` → both `bfb2e109…`.
2. `python -B .the-way/task-cycle/change_file_sizes.py 0b23580b f742a3fb` → exit 0 (numbers above).
3. `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors`.
4. `python -B .the-way/instruction-files/check_instructions.py` → exit 0, `0 error, 144 warn, 7 info` (the warnings are dead paths in files outside the change, among them old lines of `guidelines/testing.md:281-285`).
5. `python -B .the-way/elements/common/decision_index.py --sections …` → exit 0; the index of my selection → exit 2 on the first try (`no decision D-7`, numbers need two digits), then exit 0 (90 decisions in full, 326 by heading).
6. In a worktree of `f742a3fb` at `.runs/review-whole/head`, with `node_modules` and `.the-way` linked by junction to the reviewed worktree's: `npm.cmd test -- tests/quality/test_docker_gate.py` → exit 1 on the first try (4 errors: `.the-way/gate/run_tests.py` missing before `.the-way` was linked — a setup gap of my copy), then exit 0, `Ran 20 tests … OK`.
7. Same worktree, `daemon_answers` made to ask `docker version --format {{.Server.Version}}` again: `npm.cmd test -- tests/quality/test_docker_gate.py` → exit 1, only `test_a_version_that_docker_desktops_cache_answers_is_no_answer_of_the_daemon` failing with `AssertionError: unexpectedly None`; restored with `git checkout`, diff empty.
8. Same worktree, `npm.cmd test -- tests/view/tabs-area.test.mjs` → exit 0, 14 pass; with `memo` removed from `Row` in `src/browser/view/tabs-area.tsx` → exit 1, 13 pass 1 fail, `the new row alone drawn: expected ["230"], got ["230","212","200","0"]`; restored, diff empty.
9. Same worktree, a made-up `router.patch("/api/review-made-up", …)` added to `src/server/account-routes.ts`: `npm.cmd test -- tests/transport.test.mjs` → exit 1, 12 pass 1 fail, `a state-changing route no guard case lists`, actual `[ 'PATCH /api/review-made-up' ]`; restored, diff empty.
10. Same worktree, `npm.cmd test -- tests/quality/test_source_tool_scope.py` → exit 0, `Ran 4 tests … OK`.
11. Manual: the twelve quotations of the three environment facts searched in `node_modules/express-session`, `uid-safe`, `random-bytes` of the main checkout, each found; their `version` fields and `package-lock.json` entries 1.19.0, 2.1.5, 1.0.0.
12. Manual: `assets/sprites/login-backdrop.png` viewed — trees, campfire, mage, no wolf.
13. Manual: `src/server/main.ts:30` prints `Loop: http://${host}:${port}`, the readiness line the wait reads; D-112's binding sentence begins with the quoted text (`foundations/decisions.md:2732`).

Not run:
- The product's gate and the 3 full gate runs under load — the orchestrator's.
- The Docker-backed tests (`tests/deploy/test_account_storage.py`, `tests/invariants/test_loop2_one_serving_process_container.py`, `tests/deploy/test_loop2_image_icons.py` and the other container files) and the load series of slices 17-22 — the handoff forbids load processes, and starting containers would change the human's Docker state; judged from the reports.
- The focused red runs of slices 1-5, 7, 8 and 10-14 — judged from the reports; three of the change's new or widened checks were broken and confirmed independently (checks 7-9).
- StrykerJS: the change alters no source file of `simulation`, only its tests, so the mutation rule of `guidelines/testing.md` asks no run.

## Reaches beyond the dispatch

- `node_modules/express-session/index.js`, `session/store.js`, `node_modules/uid-safe/index.js`, `node_modules/random-bytes/index.js` (main checkout): to verify the quotations of the three facts.
- `tests/deploy/test_restore_trial.py:320-360`, `tests/deploy/test_account_backup_stream.py:50-110`, `tests/invariants/account_container_support.py` whole: Scrutiny 3.
- `src/server/app.ts`, `src/server/account-routes.ts`, `src/server/owner-routes.ts` (search of route and `use` calls): whether a state-changing handler escapes the route table slice 9 reads — none does today.
- `scripts/static-files.mjs` (search of `assets`): what the build copies from `assets/sprites/`.
- `tests/http.test.mjs:5958-5995` (the `destroy` case): D-422 against the case.
- The author's rule files on git and on scripts (outside the repository), served by a hook of the session before my working copy and my scripted edits.

## Working copies

- `.runs\review-whole\head` — a worktree of `f742a3fb` with two junctions (`node_modules`, `.the-way`) to the reviewed worktree. The junctions were removed first with `rmdir` (the reviewed worktree's `node_modules` and `.the-way` checked present afterwards), then `git worktree remove --force` and `git worktree prune`; `git worktree list` no longer shows it. The reviewed worktree is clean (`git status --short` empty) and its HEAD unchanged.
- Remaining, with reason: the output files of my runs in `.runs\review-whole\` (`index.md`, `sections.md`, `fc.txt`, `ci.txt`, `code.diff`, `dg-green.txt`, `dg-red.txt`, `tabs-green.txt`, `tabs-red.txt`, `transport-red.txt`, `scope.txt`, `r1112.txt`, `r1316.txt`) — evidence for this report; the directory is ignored by git and may be removed.

**Unread material:** 15 decisions of the index of my selection read whole: D-17, D-29, D-49, D-50, D-108, D-202, D-241, D-273, D-382, D-386, D-390, D-391, D-392, D-406, D-422. Decisions that bear on the change and stayed unread whole (binding sentences read in the index only): D-73, D-112 (binding sentence and *Verification* line), D-271 (binding sentence and the start of *Verification*), D-104, D-206, D-56, D-140, D-190, D-240, D-316, D-322, D-162, D-111, D-82, D-84, D-264, D-268. Guideline files not read whole: `guidelines/styleguide-browser-view.md` (the change touches only tests of browser-view, no screen or style), `guidelines/coding-mail-sending.md` and the other kind files of `guidelines/coding.md` (no product file of their kinds changed); `guidelines/coding.md` and `guidelines/testing.md` read whole. Invariants: the sentences of the invariants the change cites, changes or withdraws were read, several with their fields, not every invariant whose *Part* names a touched part. The part map read whole; the product's glossary and the-way's glossary not read. `.the-way/product-guidelines/template.md` and the coding and testing templates not read whole — the guideline changes keep the fields and their closing decision lists as they stood. Executor reports 1-18, 21, 22, the foundation report and the slice 17 review read whole; reports 19 and 20 read in their first part (cause, attempts, what is ruled out).

**Searches not found or unclear:**
- Whether D-49's "a single test of the default address" means a file or a case: unclear (M-6).
- A foundation entry that records Docker Desktop's cache of `docker version` in Resource Saver: not found (M-4).
- A test that writes and reads a saved game state across a container replacement: not found (I-1).
- `decision_index.py --decision D-7`: refused, the log numbers its first decisions with two digits (`D-07`).
