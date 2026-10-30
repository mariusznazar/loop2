# Report — work after H2: the violated mark of `account-save-durable-storage`

- **Status:** `done with concerns` (the concerns are outside this change and are reported below;
  nothing was widened to fix them)
- Variant: a correction for the human's remarks (`.the-way/task-cycle/change/SKILL.md`, section 1)
  — the work the request waited for after H1 and H2; entry written through the project skill
  `the-way-record-invariant` (`.the-way/elements/invariants/skill/SKILL.md`, with
  `elements/common/way_of_working.md`, `elements/common/rules.md`, `elements/invariants/template.md`,
  `examples.md`, `skill/decide_entry.md`, `skill/draft.md`, `skill/write.md`).
- Pin checked: `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both
  `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`.

## The human's remarks, each as made, and how

| Remark (cycle record) | How it is taken |
|---|---|
| H1, 2026-10-30 14:43Z: `bd02985` deployed with the installed script, schema version 4, a character created and a program edited on a test account, the same game back after sign-in in a second browser | establishes a saved game state in `loop2_accounts` before the replacement — the state H2 checks |
| H2, 2026-10-30 15:24 (`cycle.md:175`): `deployed bd02985…, previously bd02985…`; the application container started 15:23:49Z, after H1; volume `loop2_accounts` present | the replacement of the application container the sentence names |
| H2 check, 2026-10-30 15:30 (`cycle.md:176`): "działa, postać i program wróciły po wdrożeniu" | the saved game state — not only the account and session — survived the replacement; this is the evidence D-17 *Verification* asks for ("Checks of accounts and sessions alone do not establish preservation of saved game states and cannot clear account-save-durable-storage.") |

On this evidence the product meets the sentence today, so *Violated* turns from `yes` to `no`
(template, § Violated, WAY-51).

## The entry

Wording on `{fork-point}` (`dce2970`, `foundations/invariants.md:688-696`):

```markdown
## account-save-durable-storage

Replacing the application container preserves the SQLite database of player accounts and saved game states.

- **Method:** review
- **Rests on:** docker-volume-lifecycle
- **Derives from:** D-17 · C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md § Projected foundation changes, account-save-durable-storage/1 — "Replacing the application container preserves the SQLite database of player accounts and saved game states."; read 2026-10-27
- **Part:** account-server · deployment
- **Violated:** yes
```

Now (`foundations/invariants.md:688-696`, commit `e95a8b1`):

```markdown
## account-save-durable-storage

Replacing the application container preserves the SQLite database of player accounts and saved game states.

- **Method:** review
- **Rests on:** docker-volume-lifecycle
- **Derives from:** D-17 · D-205
- **Part:** account-server · deployment
- **Violated:** no
```

(The *Derives from* change to `D-17 · D-205` was made earlier in the cycle; this commit changes only
*Violated*.) Meaning in Polish: „Wymiana kontenera aplikacji zachowuje bazę SQLite z kontami
graczy i zapisami stanu gry — i od H2 produkt to spełnia.”

- Tests citing the entry: none (`git grep "invariant: account-save-durable-storage"` finds nothing;
  *Method* `review`), so no expected-failure marking had to be removed.
- The sentence, *Method*, *Rests on*, *Derives from* and *Part* are unchanged; the binding part is
  unchanged, so no entry naming this one needs a change (step 4.4).

## Files and commits

- `foundations/invariants.md` — +1 −1 (`- **Violated:** yes` → `- **Violated:** no`, line 696)
- Commit `e95a8b1` — `docs: :memo: clear the violated mark of account-save-durable-storage after the redeployment check`
  (by path, on `task/zapis-stanu-na-serwerze`, not pushed)

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- `git grep -n "Violated:\*\* yes" foundations/invariants.md` — no hit: no invariant of the product
  is marked violated after this change.
- Not run: `npm test` — the full suite is the cycle's run before the request (make-change § 3,
  WAY-160); the change touches no code and no test.

## Own-work check

- Requirement most likely not met: that the mark is cleared only on a check that tells a saved game
  state from its absence (D-17 *Verification*), not on an account or session surviving.
- Check: read the cycle record's H1 and H2 rows (`cycle.md:175-176`) and the H1 row the handoff
  quotes — H1 made a recognisable change to the game (a character and a program), H2 replaced the
  application container (start 15:23:49Z after H1, same volume), and the human reported the
  character and the program back after the redeployment.
- Result: the evidence is of saved game states, not only of accounts; the requirement holds.

## Foundation search (step 2)

Entries naming `account-save-durable-storage`: D-17 *Verification* (`foundations/decisions.md:359`)
and D-205 *Verification* (`foundations/decisions.md:3603`), both read whole; the fact
`docker-volume-lifecycle` (`foundations/environment_facts.md:304-308`), read whole. Clearing
*Violated* changes no level 1 verification of either decision, and nothing waits for this change.
Glossary entries read: product `deployment`, `test server`; the-way's `human action`,
`invariant`, `invariant test`. No new or shifted term.

## Reaches beyond the dispatch

- the-way's glossary at the pinned commit (`.the-way/foundations/glossary.md`, entries `human action`,
  `invariant`, `invariant test`) — "Reading the foundation" step 4 asks for it.
- The frozen task's *Human actions* H2 and the projected entry line (`task.md:225`, `:244`) and
  question 11 (`task.md:107-108`) — to confirm what H2 was to show.
- The test `tests/deploy/test_account_storage.py` — the only other file naming the identifier.

## Concerns (not changed, as the handoff asks)

1. **Stale docstring in `tests/deploy/test_account_storage.py:20-21`:** "Does NOT cover: saved game
   states, which the product does not store yet, so the replacement check of
   account-save-durable-storage stays open". The product stores saved game states since this task,
   and H2 has now checked them by hand, so both halves of the sentence are no longer true. The file
   is unchanged on this branch (`git diff --stat dce2970 HEAD -- tests/deploy/test_account_storage.py`
   empty). Recommended: a one-line docstring correction in this request, or a note for a later task;
   the orchestrator decides.
2. **Method `review` stays, though a cheap-ish test may now exist:** the same Docker test that
   replaces the container for accounts and sessions could also write and read a saved game state
   through `PUT`/`GET /api/saved-game` and turn *Method* to `test`. Not cheap in the template's
   sense (it builds the image, skipped where no Docker daemon answers), so `review` is defensible;
   named here only so the choice is seen.
3. **The request must name the cleared mark:** the template (§ Violated, WAY-51) requires "a change
   that sets or clears it names that in its request". The request body
   (`reports/41-request-body.md:85`) still says "none set or cleared yet"; the orchestrator updates
   it to name `account-save-durable-storage` cleared at `e95a8b1`.

## Comment fix

The orchestrator took concern 1 into this change. Read first: `guidelines/coding.md` and
`guidelines/testing.md` whole (AGENTS.md, before changing a test).

- `tests/deploy/test_account_storage.py:20-24` — +5 −3, only the docstring's *Does NOT cover*
  sentence; no code and no test logic changed. Before:
  "Does NOT cover: saved game states, which the product does not store yet, so the replacement
  check of account-save-durable-storage stays open; …". Now:
  "Does NOT cover: saved game states, which the product stores in the same database but this test
  neither writes nor reads; account-save-durable-storage (method review) was cleared by the human's
  redeployment check on the test server, in which a saved game state came back after the
  application container was replaced; the Compose stack and the deployment command (the test runs
  the image with equivalent settings); a rollback to older code; the server's image."
- Commit `df5b31f` — `docs: :memo: say in the account storage test that saved game states were checked by the human's redeployment`
  (by path, not pushed).
- Checks:
  - `npm test -- tests/deploy/test_account_storage.py` — exit 0, `Ran 1 test … OK` (ran, not
    skipped: the Docker daemon answered, two containers on one data volume).
  - `npm test -- tests/quality/test_quality_invariants.py` — exit 0, `Ran 5 tests … OK`.
- Concern 1 above is resolved by this commit; concerns 2 and 3 stand (3 is the orchestrator's).

## Choices

- Status `done with concerns` rather than `done`: the stale docstring (concern 1) misleads a reader
  of the deploy test about what remains open; cost if wrong — none to the entry.
- No change to the entry's wording or links: the evidence matches the sentence as written; the way
  rejected (re-wording to name code rollback, which D-17 also asks for) would widen the change
  beyond To do 14.

## Searches not found or unclear

none
