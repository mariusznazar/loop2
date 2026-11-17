# Report of executor 5 (slice 5, links between invariants and decisions)

**Status:** done

**Commit:** `192e9096da22c2a471bc3c721a5794cc0705b52e` (on `task/poprawki-brzmienia-fundamentu`, base `173c4f3fdbc93d0d1aff68b31f8f9ffdc28fe488`).

**Files changed (6 added, 6 removed lines in all):**
- `foundations/decisions.md` (4 lines changed)
- `foundations/invariants.md` (1 line changed)
- `tests/http.test.mjs` (1 line changed)

## Each item of the slice

| Item | Result |
|---|---|
| D-04 *Verification* names `minute-span-split` | already made: `foundations/decisions.md:83` reads "invariants: simulation-isolation · simulation-inputs · minute-span-split." |
| D-103 *Verification* names `password-operation-gate`; *Derives from* of the invariant stays "D-103 · D-113" | already made: the *Verification* of D-103 holds it and the invariant derives from "D-103 · D-113" |
| D-103 reads "One bounded admission gate …" | made: "One bounded admission gate without a waiting queue covers password hashing and verification" |
| Quotation of D-103 in `tests/http.test.mjs` (rule 4) | made: line 1083 now quotes "One bounded admission gate without a waiting queue covers password hashing and verification, including dummy verification for an unknown account"; the only `decision: D-103 "` line in the repository |
| D-108 names `account-client-requests` | already made: *Verification* "invariants: loop2-shared-public-origin · account-client-requests." |
| D-179 names `trip-run-end` | already made: *Verification* "invariants: trip-transfer · trip-run-end." |
| `player-argon2-deployment-check` derives from "D-106 · D-113"; D-113 no longer names `player-argon2-password-hash` | already made: the invariant reads "D-106 · D-113"; D-113 *Verification* reads "password-operation-gate · player-argon2-deployment-check"; `player-argon2-password-hash` stays in D-106 *Verification* |
| `nature-energy-range` derives from D-377, not D-176 | already made: it reads "D-63 · D-71 · D-177 · D-377" |
| `account-server-occupied-address` derives from D-111 | made: *Derives from* now reads `D-111` instead of the "recovered from code — …" text |
| D-111 names `account-server-occupied-address` | made: *Verification* now "account-server-default-address · account-server-occupied-address · account-startup-configuration" |
| D-105 reads "(per account, whose address never changes, D-159)" | made: "…and at most three per email address per hour (per account, whose address never changes, D-159). Above either limit…" (see choice 1) |
| D-161 new *Rationale* sentence | made: "…and the table holds at most about a day of messages, and the count reads the last hour of them." |

## Choices

1. D-105: the task gives the change as "…and at most three per email address per hour." → "…(per account, whose address never changes, D-159)." with an ellipsis, so the exact join is not given. I kept "per email address per hour" and added the parenthesis before the full stop. The other reading would replace "per email address per hour" with the parenthesis; that would lose "per hour". Cost if wrong: one sentence to reword. No test quotes the changed sentence: every `decision: D-105 "` line quotes the sentence "Above either limit …", which stands unchanged.
2. The invariant `account-server-occupied-address` carried a "recovered from code" source; I replaced it with `D-111`, as the task says, and dropped the recovered-from-code text from the entry (the template allows only one of the two forms).

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 0, `0 errors`; run after the entries were written.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`; 5 `listed:` lines, none caused by this slice (I changed no invariant sentence): `account-server-runtime` (invariants.md:5), `terrain-drawing-numbers` (:354), `player-opaque-session-cookie` (:668), `trip-plan-progress` (:978), `loop-run-knowledge` (:1158) — each "reads `test` and its sentence is changed by this change, while no file citing it changed"; they come from the earlier commits of the branch.
- `npm test -- tests/http.test.mjs` — exit 0, 95 tests, 95 pass, 0 fail.
- `npx prettier --check tests/http.test.mjs` — exit 0.
- Not run: the product's full gate (not mine to run); the Python quality environment (no check of the slice needs it).

## Own-work check

The requirement most likely missed: a quotation of a changed binding sentence breaking in a test. Check: `git grep -n -E 'decision: D-(103|105|161|111|04|108|179|113|106|377) "'` listed every citing line; only D-103's quotation reached the changed span, and it was changed. The full foundation check (which compares each quotation with the binding sentences) ends with 0 errors, which confirms it. The `decision: D-105` lines quote the unchanged sentence; D-161 and D-111 have no `decision:` line in tests quoting the changed spans (D-111 lines quote other sentences and the check passes).

## Reaches beyond the handoff

- `foundations/decisions.md:3300-3312` D-161 and `:3285-3298` D-159 were read as the handoff names them. No other reach, except `git grep -n` of the identifiers (`minute-span-split`, `password-operation-gate`, `account-client-requests`, `trip-run-end`, `player-argon2-*`, `nature-energy-range`, `account-server-*`) over `foundations/` to see what already stands, and `git grep` of `decision: D-<n> "` lines, as rule 4 gives.

## Unread material

- `guidelines/coding.md` and `guidelines/testing.md` (named in the slice's *Read*) — not read: the slice changed no product code, only one quotation comment in a test; I judged them not to bear on a one-word change of a comment. Say so if the cycle wants them read regardless.
- `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` — not opened; the rules were read as copied in the handoff.
- `.the-way/elements/decisions/examples.md` and `invariants/template.md` read in part: `examples.md` whole; `invariants/template.md` only its section "Links".
- `foundations/decisions.md` ranges for D-106, D-111, D-113, D-176, D-177 (the invariant's D-177) were read for D-106, D-111, D-113, D-159, D-161, D-103, D-105, D-108, D-179, D-377 and D-04's first lines only (D-04 *Verification* by grep range); D-176 not read (the task only says it is not to be named).

## Searches not found or unclear

- The *Read* of the handoff has two truncated lines ("`foundations/decisions.md:7007-188` D-377" and a stray "**Model:** same …" inside the ranges list); I took D-377 at `:7007-7021` as in the slice's own *Read*.
- Items 1, 3, 4, 5, 6 of the plan's goal were already made at the base (D-04, D-103 *Verification*, D-108, D-179, D-113/D-106, `nature-energy-range`), though the task's quoted wordings suggest they were not; the base is the branch head after earlier slices and the foundation at `f66ae6eb` — I did not check which commit made them.

## Working copies

None kept. I wrote two output files (`.runs/fc5.txt`, `.runs/http5.txt`) directly under `.runs/` of the worktree and removed them before returning.
