PASS df5b31fabf640b3b0ec152f7532ce6ea5d72ecdf

# Review — the work after H2, task `zapis-stanu-na-serwerze`

- Reviewed: a later change to the open request #43, range `bd02985..df5b31f` (`e95a8b1`, `df5b31f`),
  computed with `git diff bd02985..df5b31f` and `git log bd02985..df5b31f`.
- `git rev-parse HEAD` = `df5b31fabf640b3b0ec152f7532ce6ea5d72ecdf`, the head given; working tree clean.
- Pin: `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` both `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`.
- Method: `.the-way/task-cycle/review/SKILL.md`.
- Blocking findings: 0. Minor: 2. Out of scope: 1 (Declined to judge).

## What the range does

- `foundations/invariants.md:696` — `account-save-durable-storage`: `- **Violated:** yes` → `- **Violated:** no`. Sentence, Method (`review`), Rests on (`docker-volume-lifecycle`), Derives from (`D-17 · D-205`) and Part (`account-server · deployment`) unchanged.
- `tests/deploy/test_account_storage.py:20-24` — the module docstring's *Does NOT cover* sentence only; no code or assertion changed.

## Against the task and the plan

- To do 14 (`task.md:32`): after H2 shows a saved game state surviving the replacement of the application container, the cycle removes the violated mark through `the-way-record-invariant`. Plan § Work after H2 (`plan.md:628-634`) and Foundation entries row 31 (`plan.md:45`) say the same. The range does exactly this and nothing else in the foundation.
- The claim most likely to be false: that the evidence is of *saved game states*, not only accounts and sessions, which D-17 *Verification* (`foundations/decisions.md:359`) requires: "Checks of accounts and sessions alone do not establish preservation of saved game states and cannot clear account-save-durable-storage." Checked against the cycle record (`.runs/task-cycles/zapis-stanu-na-serwerze/cycle.md`, rows H1 14:43, H1 check 14:55, H2 15:24, H2 check 15:30):
  - a recognisable saved game state was made after H1 (a character and a program, 14:55), in the container H1 started;
  - H2 redeployed the same commit (`deployed bd02985…, previously bd02985…`), the application container started 15:23:49Z — after the save — with the volume `loop2_accounts` present; tabs were closed before H2, so no open tab could re-write the state after the replacement;
  - after reload and sign-in the human reported "działa, postać i program wróciły po wdrożeniu". The browser keeps nothing in persistent storage (task To do 9, "nic nie trafia do pamięci trwałej przeglądarki"), so the state that came back could only come from the server's database.
  The evidence tells a preserved saved game state from a lost one; the mark is cleared on the evidence D-17 asks for.
- The record-invariant element (`.the-way/elements/invariants/template.md` § Violated, WAY-51; `.the-way/elements/invariants/skill/SKILL.md` step 3): *Violated* reads `no` for a rule the product meets today; the field takes `no | yes`, so `no` (not removing the line) is the form. No test cites the invariant (`git grep "invariant: account-save-durable-storage"` — none; Method `review`), so no expected-failure marking had to go.
- The entries it derives from and rests on, read whole: D-17 (`foundations/decisions.md:352`), D-205 (`foundations/decisions.md:3597` ff.), `docker-volume-lifecycle` (`foundations/environment_facts.md`). Clearing the mark contradicts none of them; the sentence still matches D-205 ("persistent local storage outside the replaceable application container layer") and D-17 ("the database preserved across application-container replacement"). WAY-263: the change's files neither do what the entry forbids nor restate it differently.
- Nothing else in the tree still says the mark stands or the check is open: `git grep` over the head (excluding `.the-way`) for `account-save-durable-storage`, "saved game states are not checked", "stays open", "violated mark" finds only the two decision *Verification* lines, the entry and the new docstring.
- The docstring's new claims are true: the test neither writes nor reads a saved game state (`grep -n -i saved` in `tests/deploy/test_account_storage.py` and `tests/invariants/account_container_support.py` hits only the docstring), and the product stores saved game states in the same database (D-205, To do 1).
- Trust boundary and irreversible operation: the range touches neither (a foundation line and a docstring).

## Findings

### Critical

none

### Important

none

### Minor

- M-1 — `tests/deploy/test_account_storage.py:21-23`: the docstring records an event and copies a field of the foundation — "account-save-durable-storage (method review) was cleared by the human's redeployment check on the test server, in which a saved game state came back…". The entry's *Method* and *Violated* are the foundation's to hold; a later task turning *Method* to `test` (the author's concern 2) or setting the mark again would leave this sentence false without anything failing. Why it matters: a reader of the test takes the docstring as the current state. A wording that stays true reads, for instance, "saved game states, which the product stores in the same database but this test neither writes nor reads; their survival of the replacement is kept by the review of account-save-durable-storage". Evidence: the lines quoted; the template's rule that an entry's status comes from its method, not from text written by hand (`.the-way/elements/invariants/template.md`, intro, WAY-08). Not blocking: the sentence is true today and the docstring is no contract.
- M-2 — the request body, not in the range (`.runs/task-cycles/zapis-stanu-na-serwerze/reports/41-request-body.md:85`): "*Violated* marks: none set or cleared yet; `account-save-durable-storage` is cleared after H2." WAY-51 (template § Violated): "a change that sets or clears it names that in its request". The description of PR #43 must be updated to name the mark cleared at `e95a8b1` before the human reviews it; the author raised it as concern 3 and the cycle record leaves it to the orchestrator. Graded Minor because the reviewed commits cannot carry it and the body already announces the clearing; it becomes a gap only if the request goes to the human unchanged.

## Declined to judge

- Whether *Method* of `account-save-durable-storage` should turn to `test` by extending the Docker test to write and read a saved game state across the replacement (author's concern 2) — outside To do 14, which only removes the mark; the template lets an invariant without a written test read `review`.

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- `npm test -- tests/quality/test_quality_invariants.py` — exit 0, `Ran 5 tests … OK` (Ruff and the other quality checks over the changed Python file).
- `python -B -c "import ast; ast.parse(...)"` on `tests/deploy/test_account_storage.py` — parsed; no line over 99 characters.
- Manual: the cycle record's H1/H2 rows against D-17 *Verification* (above) — the evidence is of a saved game state.
- Not run: `npm test -- tests/deploy/test_account_storage.py` — it builds the image (up to 20 minutes) and the range changes only its docstring, which the parse check covers; the author reports it exit 0 with 1 test run. Not repeated: the full suite (the cycle's own run). Touched no server.

## Reaches beyond the dispatch

- `.the-way/elements/invariants/template.md` (§ Form of an entry, § Method and test, § Violated) and `.the-way/elements/invariants/skill/SKILL.md` — the element's rules for *Violated*, as the handoff asks.
- `.runs/task-cycles/zapis-stanu-na-serwerze/cycle.md`, rows 2026-10-30 14:43–15:45 — the recorded H1/H2 evidence and timestamps, to check the order of save, replacement and check.
- `task.md` lines 107-108 (question 11), 191, 224-225 (H1, H2), 244 and To do 9 — what H2 was to show and that the browser keeps no persistent copy.
- `plan.md` § Work after H2 and row 31.
- `reports/41-request-body.md:85` — whether the request names the cleared mark (M-2).
- `guidelines/coding.md` and `guidelines/testing.md`, whole — AGENTS.md requires them before reviewing a test change.
- `git grep` over the head for leftover statements of the mark or of the open check.

## Searches not found or unclear

none
