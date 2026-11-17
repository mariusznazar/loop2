# Plan — loop2: zbiorcze poprawki brzmienia fundamentu, wytycznych i komentarzy z przeglądu

- Task: .runs/task-cycles/poprawki-brzmienia-fundamentu/task.md
- Spec: none
- Base: f66ae6eb34de0b68099caf1a19f4ff368b332372

## Foundation entries

none

*Settlements to record* is `none`. The one new entry of the task, the glossary term `reading`
(To do 3.6), is written inside Slice 1 by that slice's executor; Slice 11, whose new *Rationale* of
D-316 speaks of readings, depends on Slice 1 for it. Every other foundation edit of this task is an
amendment of an existing entry that the task's *To do* and *Decisions in play* word; each is made,
through its element's skill, by the slice the *Coverage* table maps it to, not in a separate
foundation step.

## Rules for every slice

These rules bind the agent of each slice beside its own section.

1. The task's line numbers are from an older commit. Find each wording by its quotation, never by
   its line number. A quoted wording that no longer stands, or a change that is already made, is
   reported with what stands now and is not forced. Where the entry the task names is withdrawn,
   apply the change to its successor (the table "Withdrawn identifiers" of its file names it) only
   where the same defect stands there, and report it.
2. Every change to `foundations/**` follows the `SKILL.md` of that entry's element (its `read.md`,
   `decide_entry.md`, `draft.md` or `write.md` when the step that names them comes), with
   `.the-way/elements/common/way_of_working.md` and `.the-way/elements/common/rules.md`. The task
   settles each wording and the human accepted every wording it carries; write it as the task
   gives it. A question for the human, or an edit that would change what an entry binds beyond the
   task, is returned to the orchestrator with the status `blocked`; never ask the human.
3. After each entry is written run `python -B .the-way/elements/common/foundation_check.py
   --skip-test-citations`, and at the slice's end `python -B
   .the-way/elements/common/foundation_check.py`; both end with `0 errors` (the base does). A line
   `listed:` is no error; report each one.
4. Where a reworded binding sentence of a decision breaks a quotation of a line `decision: D-<n>
   "…"` in a test (the foundation check reports it), change that quotation in this slice to the
   same span of the new sentence. Find those lines with `git grep -n 'decision: D-<n> "'`; edit
   them in place without reading the test files whole. Where such a line stands in a file that is
   not in this slice's *Change*, stop and return to the orchestrator.
5. No `invariant:` line is added or changed (another task carries them); the game's behaviour does
   not change; the constant `DEPLOYMENT_MEMORY_LIMIT` keeps its name; no entry binds anything
   new, except the three wordings the human chose for D-231, D-232 and D-380.
6. Report, for each item of the slice: made, already made (what stands), or not standing (what
   stands instead).
7. Never open `foundations/decisions.md`, `foundations/invariants.md` or a large test file whole;
   read the ranges named in *Read* and find quotations with `git grep`.

## Slices

### Slice 1 — Glossary and part map wording

- **Goal:** The glossary holds To do 3.1–3.4 and 3.6 (the new term `reading` with the task's
  wording and *Not*), and the entry `at the camp` no longer names the screen Siedziba in its *Not*
  (To do 7.14 (a)); To do 3.5 needs no edit. The part map holds To do 4.1–4.3, and the person who
  runs the server is "the operator" in the build-tools entry ("on the owner's computer") and the
  deployment entry ("telling the owner", both times) (To do 4.4); the owner role of an account
  and the owner panel in the account-server entry stay.
- **Change:** `foundations/glossary.md` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:17-22` Need ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:43-54` To do 3 and 4 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:86-86` To do 7.14 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:108-110` Questions to settle (R7) ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/glossary/skill/SKILL.md` · `.the-way/elements/glossary/skill/read.md` ·
  `.the-way/elements/glossary/skill/decide_entry.md` · `.the-way/elements/glossary/skill/write.md` ·
  `.the-way/elements/glossary/template.md` · `.the-way/elements/glossary/examples.md` ·
  `.the-way/elements/part-map/skill/SKILL.md` · `.the-way/elements/part-map/skill/decide_entry.md` ·
  `.the-way/elements/part-map/skill/write.md` · `.the-way/elements/part-map/template.md` ·
  `.the-way/elements/part-map/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` ·
  `foundations/decisions.md:10489-10535` D-339 · `foundations/decisions.md:6856-6872` D-195 ·
  `foundations/decisions.md:6560-6576` D-146 · `foundations/decisions.md:9752-9824` D-389 ·
  `foundations/decisions.md:11339-11350` D-367 · `foundations/decisions.md:1643-1656` D-10 ·
  `foundations/decisions.md:2031-2056` D-354 · `src/browser/sim/types.ts:150-170` ·
  `src/browser/sim/combat.ts:60-90` · `src/browser/view/clock.ts` · `deploy/cloudflared.Dockerfile` ·
  `src/browser/sim/data/about.ts`
- **Model:** same - a new glossary entry and part-map text written under the element rules (orchestrator's change from `cheaper`, record Q9)
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after
  each entry and `python -B .the-way/elements/common/foundation_check.py` at the end, `0 errors`.
- **Depends on:** none

### Slice 2 — Environment facts quoted from their sources

- **Goal:** The facts of To do 5.1–5.11 say what the task gives, each citation copied from the
  source page the fact's *Source* names, opened by the agent, never from the review, the task or
  memory. 5.1 covers `node-sqlite-database`, `node-uncaught-default-print` and
  `node-assert-failure-inspect` (the sentence speaks of the line Node.js 24, the exact release read
  stays in *Source*). 5.10 names the withdrawn `playwright-cli-sessions-per-workspace`; apply it to
  its successor `playwright-cli-session-separation` where the gap stands. A source that cannot be
  reached leaves its fact unchanged, with the reason in the report.
- **Change:** `foundations/environment_facts.md`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:55-66` To do 5 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/environment-facts/skill/SKILL.md` ·
  `.the-way/elements/environment-facts/skill/read.md` ·
  `.the-way/elements/environment-facts/skill/decide_entry.md` ·
  `.the-way/elements/environment-facts/skill/draft.md` ·
  `.the-way/elements/environment-facts/skill/write.md` ·
  `.the-way/elements/environment-facts/template.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `foundations/decisions.md:336-369` D-237
- **Model:** same - each citation is copied from an outside page, which a cheaper agent may write from memory (orchestrator's change from `cheaper`, record Q9)
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` at the end, `0 errors`; the
  report shows, for each fact changed, the passage quoted and the address and date it was read at,
  and for each fact left unchanged the reason.
- **Depends on:** none

### Slice 3 — Comments of the simulation tests

- **Goal:** The comments of To do 7.1, 7.3, 7.4, 7.6 and 7.12 hold: no comment of these tests
  points to a line number of a foundation file (7.1 may already be made; report what stands); the
  repeated line of the comment over `traceChunks` in `tests/sim/encounters.test.mjs` is gone
  (7.1 for `:727` and 7.12 name it); the docstrings of `test_action_in_progress.py` and
  `test_program_rule_pick.py` quote the invariant's present sentence and name in "Does NOT cover"
  what the test does not check; `test_copy_save.py` says that a switch zeroes the streak with the
  beaten attacks and the rule counts; `COMPARES_STOCK` in `test_program_world_reference.py` holds
  `"itemBelow"` beside `"hereBelow"` and its comment says both. No assertion changes.
- **Change:** `tests/sim/encounters.test.mjs` · `tests/sim/combat.test.mjs` ·
  `tests/sim/program-counts.test.mjs` · `tests/invariants/test_action_in_progress.py` ·
  `tests/invariants/test_program_rule_pick.py` · `tests/invariants/test_copy_save.py` ·
  `tests/invariants/test_program_world_reference.py`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:72-78` To do 7.1–7.6 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:84-84` To do 7.12 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `foundations/invariants.md:187-196` action-in-progress ·
  `foundations/invariants.md:248-262` program-rule-pick · `foundations/invariants.md:848-856` copy-save ·
  `foundations/invariants.md:386-395` program-world-reference ·
  `foundations/invariants.md:528-536` minute-span-split ·
  `foundations/invariants.md:165-174` map-run-repeatability · `foundations/invariants.md:309-317` restart-seed ·
  `foundations/decisions.md:7530-7572` D-23 · `foundations/decisions.md:6519-6540` D-144 ·
  `foundations/glossary.md:168-184` beaten attack, combat turn, copy ·
  `src/browser/sim/programs.ts:740-810`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/encounters.test.mjs`, `npm test -- tests/sim/combat.test.mjs`,
  `npm test -- tests/sim/program-counts.test.mjs`, then `npm test -- <file>` for each of the four
  Python files; `npx prettier --check tests/sim/encounters.test.mjs tests/sim/combat.test.mjs
  tests/sim/program-counts.test.mjs`; `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml`
  on the four Python files where that environment stands, otherwise reported unchecked.
- **Depends on:** none

### Slice 4 — Wording of invariants

- **Goal:** `foundations/invariants.md` holds To do 2.7–2.10, 2.12, 2.14 and 2.15: the sentences
  of `account-message-limits`, `password-reset-verified-email`, `loop-run-knowledge`,
  `terrain-drawing-numbers`, `player-opaque-session-cookie`, `trip-plan-progress`,
  `account-server-runtime` and `player-argon2-deployment-check` say what the task gives (2.15: the
  512 MiB limit `compose.yaml` gives the application container; "deployment" stays the act, as
  the glossary has it). The comments of `scripts/measure-passwords.mjs` say "the container's
  memory limit" (To do 7.10); the constant `DEPLOYMENT_MEMORY_LIMIT` keeps its name. No *Derives
  from* and no decision changes here (Slice 5 makes the links).
- **Change:** `foundations/invariants.md` · `scripts/measure-passwords.mjs`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:34-37` To do 2.7–2.10 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:39-39` To do 2.12 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:41-42` To do 2.14–2.15 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:82-82` To do 7.10 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:108-110` Questions to settle (R7) ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/invariants/skill/SKILL.md` · `.the-way/elements/invariants/skill/decide_entry.md` ·
  `.the-way/elements/invariants/skill/draft.md` · `.the-way/elements/invariants/skill/write.md` ·
  `.the-way/elements/invariants/template.md` · `.the-way/elements/invariants/examples.md` ·
  `.the-way/elements/common/rules.md` · `.the-way/elements/common/way_of_working.md` ·
  `guidelines/coding.md` · `foundations/glossary.md` ·
  `foundations/decisions.md:3300-3311` D-161 · `foundations/decisions.md:8731-8757` D-249 ·
  `foundations/decisions.md:2601-2615` D-106 · `foundations/decisions.md:581-594` D-113 ·
  `src/server/database.ts:530-575` · `src/server/account-routes.ts:30-45` · `compose.yaml`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives (it lists each reworded invariant that reads
  `test` whose citing test did not change; report those lines); `npm test --
  tests/password-measurement.test.mjs`; `npx prettier --check scripts/measure-passwords.mjs`.
- **Depends on:** none

### Slice 5 — Links between invariants and decisions

- **Goal:** The *Derives from* of the invariants and the *Verification* of the decisions agree as
  To do 2.1–2.6 and 2.11 give: D-04 names `minute-span-split`; D-103 names
  `password-operation-gate` (its *Derives from* stays "D-103 · D-113") and reads "One bounded
  admission gate …"; D-108 names `account-client-requests`; D-179 names `trip-run-end`;
  `player-argon2-deployment-check` derives from "D-106 · D-113" and D-113 no longer names
  `player-argon2-password-hash`; `nature-energy-range` derives from D-377 too (not from D-176);
  `account-server-occupied-address` derives from D-111 and D-111 names it. D-105 reads "(per
  account, whose address never changes, D-159)" and D-161 has its new *Rationale* sentence. The
  quotation of D-103 in `tests/http.test.mjs` follows the new sentence (rule 4).
- **Change:** `foundations/invariants.md` · `foundations/decisions.md` · `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-33` To do 1, 2.1–2.6 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:38-38` To do 2.11 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:135-135` D-04 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:144-148` D-103 to D-113 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:150-150` D-161 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:152-152` D-179 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/invariants/skill/SKILL.md` · `.the-way/elements/invariants/skill/decide_entry.md` ·
  `.the-way/elements/invariants/skill/write.md` · `.the-way/elements/invariants/template.md` ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `guidelines/coding.md` · `guidelines/testing.md` ·
  `foundations/decisions.md:59-187` D-04 · `foundations/decisions.md:2562-2577` D-103 ·
  `foundations/decisions.md:3139-3160` D-105 · `foundations/decisions.md:2601-2615` D-106 ·
  `foundations/decisions.md:2630-2641` D-108 · `foundations/decisions.md:2705-2729` D-111 ·
  `foundations/decisions.md:581-594` D-113 · `foundations/decisions.md:3285-3298` D-159 ·
  `foundations/decisions.md:3300-3311` D-161 · `foundations/decisions.md:6691-6714` D-176 ·
  `foundations/decisions.md:8117-8131` D-179 · `foundations/decisions.md:7007-7021` D-377
- **Model:** same - links between two files of the foundation and the Verification of D-04, each to be kept consistent (orchestrator's change from `cheaper`, record Q9)
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- tests/http.test.mjs`;
  `npx prettier --check tests/http.test.mjs`.
- **Depends on:** Slice 4

### Slice 6 — Decisions of the server, its deployment and its backup

- **Goal:** D-17, D-231 (the human's wording), D-232 (the human's wording, its *Verification*
  included), D-236, D-253, D-255, D-355 and D-356 say what *Decisions in play* gives them. The
  quotations of D-17 and D-232 that the new sentences break follow them (rule 4; at the base they
  stand in the four test files of *Change* named for them). The test docstrings hold To do 7.7
  ("containers"), 7.8 (the docstring of `test_loop2_application_port.py` opens with the
  invariant's sentence, then says the file checks the side of the sources) and 7.11 ("the human"
  at the notice's wording in `tests/deploy/test_loop2_backup.py`; the quotations of D-233 there
  stay).
- **Change:** `foundations/decisions.md` · `tests/deploy/test_loop2_deploy_switch.py` ·
  `tests/invariants/test_loop2_host_sharing.py` · `tests/deploy/test_loop2_backup.py` ·
  `tests/invariants/test_account_save_backup_encrypted.py` ·
  `tests/invariants/test_loop2_deploy_keeps_running.py` ·
  `tests/invariants/test_loop2_application_port.py`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:79-80` To do 7.7–7.8 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:83-83` To do 7.11 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:136-136` D-17 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:158-162` D-231 to D-255 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:175-176` D-355, D-356 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `guidelines/coding.md` · `guidelines/testing.md` ·
  `foundations/glossary.md` ·
  `foundations/decisions.md:1791-1815` D-17 · `foundations/decisions.md:2168-2237` D-231 ·
  `foundations/decisions.md:2239-2279` D-232 · `foundations/decisions.md:2420-2454` D-236 ·
  `foundations/decisions.md:1887-1936` D-253 · `foundations/decisions.md:1102-1168` D-255 ·
  `foundations/decisions.md:2058-2071` D-355 · `foundations/decisions.md:2073-2086` D-356 ·
  `foundations/invariants.md:135-153` loop2-deploy-keeps-running, loop2-application-port ·
  `foundations/invariants.md:1108-1116` account-save-backup-encrypted ·
  `deploy/loop2-deploy:26-45` · `src/server/account-backup.ts` · `src/server/database.ts:150-175` ·
  `src/server/database.ts:915-935` · `tests/invariants/test_account_server_typecheck.py:20-45` ·
  `.agents/skills/loop2-deploy/references/backup_and_restore.md`
- **Model:** same — D-231 and D-232 take the human's wordings, which must keep what each binds and
  name the leftover of a failed clean-up exactly as the code leaves it.
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- <file>` for each of the six test
  files of *Change*; `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml` on them where
  that environment stands, otherwise reported unchecked.
- **Depends on:** Slice 5

### Slice 7 — Decisions of testing and of the process, with the testing guidelines

- **Goal:** D-28, D-83 (the branch of Python: the gate's runner runs each directory holding a
  `test_*.py` git tracks, so a new Python file runs once git tracks it; the hand selection and its
  test stay for Node), D-84, D-85 and D-220 say what *Decisions in play* gives them; the change
  given for the withdrawn D-358 is applied to its successor D-419, whose *Rejected* reads
  `unknown` while its *Rationale* holds the hand-over (rule 1). `guidelines/testing.md` holds To
  do 6.3 (D-82 is a departure in one matter, the comment naming a value's source; a human's
  judgement enters through a decision of the foundation) and 6.4 (the sentence on Python files in
  "Test files in the gate" says what D-83 now says), written as
  `.the-way/product-guidelines/template.md` and the testing template give.
- **Change:** `foundations/decisions.md` · `guidelines/testing.md`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:70-71` To do 6.3–6.4 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:137-137` D-28 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:141-143` D-83 to D-85 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:157-157` D-220 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:177-177` D-358 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `.the-way/product-guidelines/template.md` ·
  `.the-way/product-guidelines/testing/template.md` · `guidelines/coding.md` ·
  `foundations/decisions.md:431-444` D-28 · `foundations/decisions.md:611-624` D-115 ·
  `foundations/decisions.md:656-699` D-213 · `foundations/decisions.md:3313-3326` D-162 ·
  `foundations/decisions.md:813-826` D-73 · `foundations/decisions.md:933-946` D-82 ·
  `foundations/decisions.md:948-961` D-83 · `foundations/decisions.md:963-976` D-84 ·
  `foundations/decisions.md:978-991` D-85 · `foundations/decisions.md:6125-6142` D-220 ·
  `foundations/decisions.md:1542-1570` D-418, D-419 · `foundations/decisions.md:11411-11411` D-358 withdrawn ·
  `.the-way/gate/run_tests.py` · `tests/quality/test_node_test_selection.py`
- **Model:** same — D-83's binding sentence is rewritten and must keep what it binds for Node while
  it states the Python branch as the gate runs it.
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives (it checks `guidelines/testing.md` too);
  `npm test -- tests/quality/test_node_test_selection.py`.
- **Depends on:** Slice 6

### Slice 8 — D-104, D-271 and D-49 say what their tests hold; sprite credits

- **Goal:** To do 7.15 (a)–(f) and 2.13 hold together: the last item of D-104's `tests:` says
  what the case of the guards in `tests/transport.test.mjs` checks (each route on the list it holds
  itself); the item of D-271's `tests:` says the file has an assignment in the test's table, not
  that it is right, and D-271's *Rejected* reads "…only once it is made"; D-49's new sentence
  writes the invariant's name in code marks; `README.md` says what D-49 says of the test file of
  the default address (one file, a case for each of the two starts), and its list of the sprite
  files (point 2 of "First run") names `mage-bend` and `fire-small` under Pixel Crawler, `wolf-*`
  under LPC Wolf and `dust` under Smoke & Fire, checked against `assets/sprites/`; the invariant
  `sprite-credits` says that this list of `README.md` names each file's pack; the line `decision:
  D-112` at the helper `wait_until_ready` of `tests/invariants/account_container_support.py`
  becomes a plain comment naming D-112; the test `test_replaced_container_keeps_accounts_and_sessions`
  of `tests/deploy/test_account_storage.py` gets a name that says it keeps the saved game states
  too.
- **Change:** `foundations/decisions.md` · `foundations/invariants.md` · `README.md` ·
  `tests/invariants/account_container_support.py` · `tests/deploy/test_account_storage.py`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:40-40` To do 2.13 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:87-87` To do 7.15 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:164-164` D-271 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/invariants/skill/SKILL.md` ·
  `.the-way/elements/invariants/skill/decide_entry.md` · `.the-way/elements/invariants/skill/draft.md` ·
  `.the-way/elements/invariants/skill/write.md` · `.the-way/elements/invariants/template.md` ·
  `.the-way/elements/common/rules.md` · `.the-way/elements/common/way_of_working.md` ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `foundations/decisions.md:2579-2599` D-104 · `foundations/decisions.md:4864-4966` D-271 ·
  `foundations/decisions.md:4996-5027` D-273 · `foundations/decisions.md:1057-1070` D-49 ·
  `foundations/decisions.md:2731-2746` D-112 · `foundations/decisions.md:3674-3701` D-205 ·
  `tests/transport.test.mjs:283-330` · `tests/transport.test.mjs:431-640` ·
  `tests/view/icons.test.mjs:420-460` · `tests/invariants/test_account_server_default_address.py`
- **Model:** same — the clauses of D-104 and D-271 must state exactly what their tests check,
  read from the tests, without narrowing what the decisions bind.
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- tests/deploy/test_account_storage.py`
  (it needs a Docker daemon; where none answers, report it unchecked);
  `npm test -- tests/invariants/test_account_server_default_address.py`; `.runs/quality-venv/Scripts/ruff.exe
  check --config ruff.toml` on the two Python files where that environment stands, otherwise
  reported unchecked.
- **Depends on:** Slice 7 · Slice 5

### Slice 9 — Decisions of the game, its programs and the chronicle

- **Goal:** D-119, D-170, D-189 (its binding sentence may already say the card of a map; its
  *Rationale* still speaks of the list of maps), D-310, D-335, D-342, D-347, D-373, D-380 (the
  human's wording, *Relations* and *Rationale*) and D-384 say what *Decisions in play* gives them.
  The quotation of D-170 in `tests/view/maps-screen.test.mjs` follows the new sentence (rule 4).
- **Change:** `foundations/decisions.md` · `tests/view/maps-screen.test.mjs`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:98-102` Questions to settle (wordings accepted) ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:149-149` D-119 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:151-151` D-170 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:154-154` D-189 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:167-167` D-310 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:172-174` D-335 to D-347 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:180-184` D-373 to D-384, decisions read ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` ·
  `foundations/decisions.md:7110-7141` D-119 · `foundations/decisions.md:7955-7971` D-170 ·
  `foundations/decisions.md:8299-8319` D-189 · `foundations/decisions.md:8786-8810` D-251 ·
  `foundations/decisions.md:9341-9418` D-308 · `foundations/decisions.md:9420-9455` D-309 ·
  `foundations/decisions.md:9457-9491` D-310 · `foundations/decisions.md:10158-10189` D-335 ·
  `foundations/decisions.md:10596-10635` D-342 · `foundations/decisions.md:1938-1997` D-347 ·
  `foundations/decisions.md:10783-10794` D-382 · `foundations/decisions.md:6375-6414` D-373 ·
  `foundations/decisions.md:7038-7063` D-379 · `foundations/decisions.md:7821-7834` D-380 ·
  `foundations/decisions.md:8070-8088` D-384 · `src/browser/view/maps-screen.tsx:300-325` ·
  `src/browser/sim/program.ts:270-300` · `src/browser/sim/data/actions.ts:140-155` ·
  `src/browser/view/chronicle-entries.ts:225-255`
- **Model:** same — D-380 takes the human's wording of its *Relations* and *Rationale*, which must
  keep what D-308, D-309 and D-310 bind.
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- tests/view/maps-screen.test.mjs`;
  `npx prettier --check tests/view/maps-screen.test.mjs`.
- **Depends on:** Slice 8

### Slice 10 — Decisions of the screen of a map run and the end-of-run window

- **Goal:** D-46, D-185, D-311, D-363 and D-368 say what *Decisions in play* gives them. The
  quotations of D-46, D-185 and D-311 that the new sentences break follow them (rule 4; at the
  base they stand in the nine test files of *Change*).
- **Change:** `foundations/decisions.md` · `tests/view/end-question.test.mjs` ·
  `tests/view/end-window-game.test.mjs` · `tests/view/end-window-lines.test.mjs` ·
  `tests/view/end-window.test.mjs` · `tests/view/run-header.test.mjs` ·
  `tests/view/run-screen-state.test.mjs` · `tests/view/run-screen.test.mjs` ·
  `tests/view/trip.test.mjs` · `tests/view/world-area.test.mjs`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:139-139` D-46 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:153-153` D-185 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:168-168` D-311 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:178-179` D-363, D-368 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` ·
  `foundations/decisions.md:4819-4832` D-46 · `foundations/decisions.md:8224-8242` D-185 ·
  `foundations/decisions.md:9952-10079` D-311 · `foundations/decisions.md:9518-9529` D-363 ·
  `foundations/decisions.md:10335-10368` D-368 · `foundations/decisions.md:10393-10436` D-370, D-371 ·
  `src/browser/view/trip-lines.ts:70-95` · `src/browser/view/run-header.tsx:1-20` ·
  `src/browser/run-screen.css:80-110` · `src/browser/run-screen.css:330-345`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- <file>` for each of the nine test
  files of *Change*; `npx prettier --check` on them.
- **Depends on:** Slice 9

### Slice 11 — Decisions of the scene

- **Goal:** D-70 (F-36), D-316 (F-10: its new *Rationale* and *Rejected*; its binding sentences
  and *Verification* stay), D-317, D-322 (two sentences and the new *Rationale*) and D-367 (To do
  7.13: its example and the wording before "over at once") say what *Decisions in play* and To do
  7.13 give them. In `tests/view/scene.test.mjs` the comment that repeats "312 ms" follows the new
  *Rationale* of D-316 (To do 7.9), and the case "an effect or a return of the tint cut by leaving
  the screen …" gets a line `decision: D-367` quoting a binding sentence of D-367 (To do 7.13).
- **Change:** `foundations/decisions.md` · `tests/view/scene.test.mjs`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:81-81` To do 7.9 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:85-85` To do 7.13 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:140-140` D-70 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:169-171` D-316 to D-322 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `foundations/glossary.md` ·
  `foundations/decisions.md:6342-6357` D-70 · `foundations/decisions.md:4774-4787` D-43 ·
  `foundations/decisions.md:10880-11005` D-316 · `foundations/decisions.md:11007-11092` D-317 ·
  `foundations/decisions.md:11123-11159` D-319 · `foundations/decisions.md:11229-11294` D-322 ·
  `foundations/decisions.md:11311-11350` D-365, D-366, D-367 · `src/browser/view/clock.ts` ·
  `src/browser/sim/data/balance.ts` · `src/browser/view/scene.tsx:20-40` ·
  `src/browser/run-screen.css:760-780`
- **Model:** same — D-316 and D-322 get new reasons and split sentences that must keep their binding
  sentences and *Verification* as they are.
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- tests/view/scene.test.mjs`;
  `npx prettier --check tests/view/scene.test.mjs`.
- **Depends on:** Slice 10 · Slice 1

### Slice 12 — The shared controls of D-44, and D-03

- **Goal:** D-03 (*Relations* "narrowed by D-265" and the exception in its sentence) and D-44 (the
  shared controls with the button in its seven kinds, as *Decisions in play* gives) say what the
  task gives. Every quotation of D-44's first sentence that the new wording breaks follows it
  (rule 4; at the base they stand in the eleven test files of *Change*); the other quotations of
  D-44 stay.
- **Change:** `foundations/decisions.md` · `tests/view/account-screen.test.mjs` ·
  `tests/view/end-question.test.mjs` · `tests/view/end-window.test.mjs` ·
  `tests/view/headquarters-screen.test.mjs` · `tests/view/maps-screen.test.mjs` ·
  `tests/view/program-list.test.mjs` · `tests/view/program-panel.test.mjs` ·
  `tests/view/rule-editor.test.mjs` · `tests/view/run-header.test.mjs` ·
  `tests/view/trip-plan.test.mjs` · `tests/view/discovery-band.test.mjs`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:134-134` D-03 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:138-138` D-44 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` ·
  `foundations/decisions.md:44-57` D-03 · `foundations/decisions.md:4168-4214` D-265 ·
  `foundations/decisions.md:4789-4802` D-44 · `foundations/decisions.md:5029-5152` D-274, D-275, D-276 ·
  `src/browser/view/controls/react-button.tsx`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- <file>` for each of the eleven test
  files of *Change*; `npx prettier --check` on them.
- **Depends on:** Slice 11 · Slice 9 · Slice 10

### Slice 13 — Decisions of saving the game

- **Goal:** D-207 says "— among them an edit of a program or of the copy, …" as *Decisions in
  play* gives; D-04 cites D-208 at its sentence on the save and names the previous-save privilege
  (D-400) from which Programy draws the buttons of the pull and the reset (To do 7.13); D-208's
  clause `tests:` says that the retry sends the game state of its moment and that the sentence
  goes after a retry that succeeds (To do 7.14 (c)). The quotations of D-207 that the new sentence
  breaks follow it (rule 4; at the base they stand in the four test files of *Change*). In
  `tests/view/game-saver.test.mjs` the comment over `BREAKS` follows its table (`extra`/`client`
  in place of `breaks(), mend()`, To do 7.14 (d)).
- **Change:** `foundations/decisions.md` · `tests/view/account-screen.test.mjs` ·
  `tests/view/state-store.test.mjs` · `tests/view/game-saver.test.mjs` ·
  `tests/view/previous-save.test.mjs`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:85-86` To do 7.13–7.14 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:155-155` D-207 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` ·
  `foundations/decisions.md:59-187` D-04 · `foundations/decisions.md:3748-3856` D-207, D-208 ·
  `foundations/decisions.md:4074-4121` D-400, D-401, D-402 · `src/browser/view/game-view.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- <file>` for each of the four test
  files of *Change*; `npx prettier --check` on them.
- **Depends on:** Slice 12

### Slice 14 — Decisions of the screens and the login card

- **Goal:** D-218, D-262, D-278 and D-280 say what *Decisions in play* gives them, and D-57's
  sentence says the decimal comma, appended after "counted with tenths" so that its quotations
  stand (To do 7.13). The quotations of D-218, D-262 and D-280 that the new sentences break follow
  them (rule 4; at the base they stand in the three test files of *Change* other than
  `program-editor.test.mjs`). In `tests/view/headquarters-screen.test.mjs` the links of the credits
  "lead outside the game" (To do 7.2); the case "a number with a fraction stands in the sentence of
  a rule and of a group with a decimal comma …" of `tests/view/program-editor.test.mjs` gets a line
  `decision: D-57` quoting D-57's sentence (To do 7.13).
- **Change:** `foundations/decisions.md` · `tests/view/account-screen.test.mjs` ·
  `tests/view/headquarters-screen.test.mjs` · `tests/view/team-lines.test.mjs` ·
  `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:74-74` To do 7.2 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:85-85` To do 7.13 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:156-156` D-218 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:163-163` D-262 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:165-166` D-278, D-280 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` ·
  `foundations/decisions.md:5884-5898` D-57 · `foundations/decisions.md:6081-6101` D-218 ·
  `foundations/decisions.md:3046-3120` D-262, D-278 · `foundations/decisions.md:4968-4994` D-272 ·
  `foundations/decisions.md:4307-4375` D-280 · `foundations/decisions.md:4518-4533` D-323 ·
  `src/browser/view/character-screen.tsx`
- **Model:** cheaper
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- <file>` for each of the four test
  files of *Change*; `npx prettier --check` on them.
- **Depends on:** Slice 13 · Slice 12

### Slice 15 — The picture band in the foundation

- **Goal:** The band with the picture at the top of the screen Siedziba is called "the picture
  band" (the name the glossary's `at the camp` already gives it in its *Not*), so that "camp"
  means in the foundation only where a character is: in D-389 (its heading's question, sentences,
  *Verification* and *Rationale*) and in the other entries that call the band "the camp" — D-271,
  D-272, D-421, D-54, the sentence of the section "Screen Mapy and Siedziba" and the invariant
  `loop2-container-sprites`. Every quotation of D-389 and D-271 the new wording breaks follows it
  (rule 4; at the base they stand in the three test files of `tests/view/` of *Change*), and the
  docstring of `tests/invariants/test_loop2_container_sprites.py` says what the invariant now
  says. "At the camp" for a character stays. No glossary entry is added: "picture band" is plain
  words. The names and other comments of the tests and the comments of `camp.tsx` are Slice 16's.
- **Change:** `foundations/decisions.md` · `foundations/invariants.md` ·
  `tests/view/camp-picture.test.mjs` · `tests/view/headquarters-screen.test.mjs` ·
  `tests/view/scene-picture.test.mjs` · `tests/invariants/test_loop2_container_sprites.py`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:86-86` To do 7.14 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/invariants/skill/SKILL.md` ·
  `.the-way/elements/invariants/skill/decide_entry.md` · `.the-way/elements/invariants/skill/draft.md` ·
  `.the-way/elements/invariants/skill/write.md` · `.the-way/elements/invariants/template.md` ·
  `.the-way/elements/common/rules.md` · `.the-way/elements/common/way_of_working.md` ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `foundations/glossary.md` ·
  `foundations/decisions.md:9752-9824` D-389 · `foundations/decisions.md:9531-9534` Screen Mapy and Siedziba ·
  `foundations/decisions.md:4864-4994` D-271, D-272 · `foundations/decisions.md:4627-4640` D-421 ·
  `foundations/decisions.md:5837-5856` D-54
- **Model:** same — one name replaces another across six decisions and an invariant, and every
  replacement must keep what its entry binds.
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- tests/view/camp-picture.test.mjs`,
  `npm test -- tests/view/headquarters-screen.test.mjs`, `npm test -- tests/view/scene-picture.test.mjs`,
  `npm test -- tests/invariants/test_loop2_container_sprites.py` (it needs a Docker daemon; where
  none answers, report it unchecked); `npx prettier --check` on the three `.mjs` files;
  `git grep -n -w camp -- foundations/` shows "camp" only for where a character is.
- **Depends on:** Slice 14 · Slice 8 · Slice 1

### Slice 16 — The picture band in the code's comments and the tests' names

- **Goal:** The comments of `src/browser/view/camp.tsx` and the names and comments of the tests of
  `tests/view/camp-picture.test.mjs`, `tests/view/headquarters-screen.test.mjs` and
  `tests/view/scene-picture.test.mjs` that speak of the band call it "the picture band", as D-389
  now does (To do 7.14 (b)); "at the camp" for a character stays. The file names, the identifiers
  in code (`Camp`, `campDrawing`, CSS classes) and the comments of other files stay; list in the
  report each other place in `src/` and `README.md` that still calls the band "the camp". No
  behaviour and no assertion changes.
- **Change:** `src/browser/view/camp.tsx` · `tests/view/camp-picture.test.mjs` ·
  `tests/view/headquarters-screen.test.mjs` · `tests/view/scene-picture.test.mjs`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:86-86` To do 7.14 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `foundations/glossary.md` ·
  `foundations/decisions.md:9752-9824` D-389 · `src/browser/view/camp-picture.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/camp-picture.test.mjs`, `npm test --
  tests/view/headquarters-screen.test.mjs`, `npm test -- tests/view/scene-picture.test.mjs`;
  `npx prettier --check src/browser/view/camp.tsx tests/view/camp-picture.test.mjs
  tests/view/headquarters-screen.test.mjs tests/view/scene-picture.test.mjs`;
  `python -B .the-way/elements/common/foundation_check.py`, `0 errors`.
- **Depends on:** Slice 15

### Slice 17 — Styleguide, the comment of the copy line and the security notes

- **Goal:** `guidelines/styleguide-browser-view.md` holds To do 6.1 (the second sentence in
  `warning` on the login card after an error no code of the game handled, D-323 added to the
  rule's *Decision*) and 6.2 (three kinds added later), and the paragraph of the rule "A name typed
  by the player breaks in its row" keeps the rule and drops its list of today's places (To do
  7.13), written as `.the-way/product-guidelines/template.md` and the styleguide template give;
  `src/browser/program-panel.css` has one accurate comment over `.copy-line` (To do 7.13);
  `security-notes.md` names in "GitHub account" the second ruleset `main_tests` with its bypass for
  the repository's administrator role, says that the operator's account, and so an agent on it,
  holds that bypass so a merge without a green `tests` needs an explicit merge with administrator
  rights, and that the ruleset `main` still has no bypass (To do 8.1). The state of the rulesets
  may be read with `gh api repos/mariusznazar/loop2/rulesets`; change nothing on GitHub.
- **Change:** `guidelines/styleguide-browser-view.md` · `src/browser/program-panel.css` ·
  `security-notes.md`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:68-69` To do 6.1–6.2 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:85-85` To do 7.13 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:88-89` To do 8 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/styleguide/template.md` ·
  `guidelines/coding.md` · `src/browser/AGENTS.md` ·
  `foundations/decisions.md:4518-4533` D-323 · `foundations/decisions.md:3046-3095` D-262 ·
  `foundations/decisions.md:4714-4727` D-39
- **Model:** same - a guideline paragraph and a statement of the rulesets that must be read from `gh api` (orchestrator's change from `cheaper`, record Q9)
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`, `0 errors` (it checks the
  guidelines); `npm test -- tests/view/program-panel.test.mjs`.
- **Depends on:** none

## Coverage

| What the task requires | Slices or entries |
|---|---|
| To do 1 — every change of *Decisions in play* (Zmieniane) | D-03, D-44: Slice 12 · D-04: Slices 5 and 13 · D-17, D-231, D-232, D-236, D-253, D-255, D-355, D-356: Slice 6 · D-28, D-83, D-84, D-85, D-220, D-358 (as D-419): Slice 7 · D-46, D-185, D-311, D-363, D-368: Slice 10 · D-70, D-316, D-317, D-322: Slice 11 · D-103, D-105, D-108, D-111, D-113, D-161, D-179: Slice 5 · D-119, D-170, D-189, D-310, D-335, D-342, D-347, D-373, D-380, D-384: Slice 9 · D-207: Slice 13 · D-218, D-262, D-278, D-280: Slice 14 · D-271: Slices 8 and 15 |
| To do 2.1–2.6, 2.11 — links of invariants and decisions | Slice 5 |
| To do 2.7–2.10, 2.12, 2.14, 2.15 — wording of invariants | Slice 4 |
| To do 2.13 — `sprite-credits` and the sprite list of `README.md` | Slice 8 |
| To do 3.1–3.4 — glossary | Slice 1 |
| To do 3.5 — `copy`, `beaten attack`, `deployment` stay | Slice 1 (no edit), their sentences: Slice 4 (2.14, 2.15, 7.10) |
| To do 3.6 — new term `reading` | Slice 1 |
| To do 4.1–4.4 — part map | Slice 1 |
| To do 5.1–5.11 — environment facts | Slice 2 |
| To do 6.1, 6.2 — styleguide | Slice 17 |
| To do 6.3, 6.4 — testing guidelines | Slice 7 |
| To do 7.1, 7.3, 7.4, 7.6, 7.12 — simulation test comments | Slice 3 |
| To do 7.2 — headquarters test comment | Slice 14 |
| To do 7.7, 7.8, 7.11 — deployment test docstrings and comments | Slice 6 |
| To do 7.9 — the comment of `scene.test.mjs` | Slice 11 |
| To do 7.10 — `scripts/measure-passwords.mjs` | Slice 4 |
| To do 7.13 — `program-panel.css`, styleguide paragraph | Slice 17 |
| To do 7.13 — D-04 | Slice 13 |
| To do 7.13 — D-57, `decision: D-57` in `program-editor.test.mjs` | Slice 14 |
| To do 7.13 — D-367, `decision: D-367` in `scene.test.mjs` | Slice 11 |
| To do 7.14 (a) — `at the camp` | Slice 1 |
| To do 7.14 (b) — the picture band | Slices 15 and 16 |
| To do 7.14 (c), (d) — D-208, `game-saver.test.mjs` | Slice 13 |
| To do 7.15 (a)–(f) — D-104, D-271, `account_container_support.py`, `README.md`, D-49, `test_account_storage.py` | Slice 8 |
| To do 8.1 — `security-notes.md` | Slice 17 |
| Out of scope — no behaviour change, no `invariant:` line, `DEPLOYMENT_MEMORY_LIMIT` kept | Rules for every slice, rule 5 |
| *Settlements to record* | none |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Every foundation edit is made inside the slice of its topic, through its element's skill; the one new entry, `reading`, comes in Slice 1, before Slice 11 uses it. | One foundation slice writing all the entries' edits before the tests: more than sixty entries for one agent, and the quotations of the tests would break between that slice and the next. | Small: a slice reads more element skills than a foundation-only slice would. |
| The decisions are cut by topic into eleven slices, chained through `foundations/decisions.md`. | One slice for every decision: far more entries, each with the element's search of the foundation, than one agent holds. | A slice whose decisions turn out to touch another topic reaches a decision outside its *Read*; it names the reach. |
| A quotation of a line `decision:` that a reworded binding sentence breaks is changed in the same slice as the decision. | A separate slice for the quotations: the foundation check would fail between the two slices. | The slice carrying D-44 changes twelve files and the one carrying D-311 ten, most by one line; the size script counts each of those files whole. |
| The change the task gives for the withdrawn D-358 is applied to its successor D-419, and that for the withdrawn fact `playwright-cli-sessions-per-workspace` to `playwright-cli-session-separation`, each only where the same defect stands. | Dropping both as not standing: the defect the task names would stay where the successor carries it. | One *Rejected* field and one citation the task did not name by the successor's number change; the request names both. |
| The band is called "the picture band", the name the glossary's `at the camp` already gives it, in every foundation entry that calls it "the camp" (D-389, D-271, D-272, D-421, D-54, the sentence of the section, `loop2-container-sprites`), in `camp.tsx` and in the tests of `tests/view/` that speak of it (Slices 15 and 16). | D-389 alone: "camp" would keep two meanings in the foundation. Every comment of the code too (`headquarters.css`, `run-screen.css`, `styles.css`, `sim/data/scene.ts`, `camp-picture.ts`), point 2 of `README.md` and the styleguide's rule "The camp of Siedziba": files the task does not name. | The comments outside these files and the styleguide's rule keep "camp" for the band until a later change; Slice 16 lists them. |
| To do 2.13 travels with 7.15 in Slice 8, so that `README.md`, `sprite-credits` and D-271 change in one slice. | 2.13 in the invariants' slice: `README.md` would change in two slices. | none |
| To do 4.4 is read as the build-tools entry ("on the owner's computer") and the deployment entry ("telling the owner"), since the task quotes no wording there. | Leaving 4.4 for the orchestrator: the line numbers it gives point to other lines today. | A third use of "owner" for the operator stays unchanged; the review of the change sees the part map whole. |
| To do 7.10 travels with the invariants (Slice 4), and the testing guidelines with D-82 and D-83 (Slice 7). | Separate slices: the same word or rule would change in two slices. | none |
| The wording of the invariants (Slice 4) and the links between invariants and decisions (Slice 5) are two slices, and so are the picture band in the foundation (Slice 15) and in the code's comments and the tests' names (Slice 16). | One slice each: each would read over 150 000 estimated tokens besides the decision log. | One more agent for each pair; the second of each pair depends on the first. |
| The order of the slices departs from the styleguide's "Plan of a user-interface change": this change alters no screen, only words. | Following the example: it orders the work of a new look, which this task does not have. | none |
