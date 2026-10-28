# Merge report — reconciliation with `origin/main`, task `blokada-konta`

- **Status:** done
- Stage: reconciliation with the target branch (step 12). Method: `.the-way/task-cycle/change/SKILL.md`
  for reading, checks, commits and report. Foundation entries were renumbered as
  `.the-way/elements/decisions/template.md` § "Changing a decision" and § "Withdrawn numbers"
  give, through `the-way-record-decision`.
- Merged `origin/main` `519bb8c` into `task/blokada-konta` `017c860` → merge commit **`abf2e54`**
  (parents `017c860`, `519bb8c`). Not pushed. No earlier commit rewritten.
- Pin: `.the-way` at `3aee7d9` on both sides; `git ls-files --stage -- .the-way` and
  `git -C .the-way rev-parse HEAD` agree after the merge.

## Renumbering

| Old (this branch) | New | Question |
|---|---|---|
| D-129 | **D-137** | How does the operator block and unblock a player account? |
| D-130 | **D-138** | How is a player's login kept between requests? (projected) |
| D-131 | **D-139** | What does the login of a blocked account tell the player? |

- Main's last decision is D-136.
- The log has no list of withdrawn numbers, on main or on this branch.
- No entry or reference on main holds D-137…D-139 (`git grep -n -E 'D-13[7-9]\b' origin/main`:
  no hit).
- The old numbers never reached main, so none of them goes to a withdrawn list. They name main's
  decisions now.
- Main's D-129…D-136 are kept exactly as main has them. I checked this with a line diff of main's
  `decisions.md`, `invariants.md` and `glossary.md` against the resolved files. The only main
  lines replaced are this branch's own edits of D-100, D-107, D-112 and of the invariants
  `player-opaque-session-cookie`, `account-schema-lifecycle`, `account-database-schema` and
  `account-session-storage`.

## Every reference changed

| Place | Before → after |
|---|---|
| `foundations/decisions.md`, D-100 binding sentence | "as D-131 gives" → "as D-139 gives" |
| `foundations/decisions.md`, D-107 *Relations* | `derives from D-130` → `derives from D-138` |
| `foundations/decisions.md`, D-112 first binding sentence | "blocking command of D-129" → "of D-137" |
| `foundations/decisions.md`, the three headings | D-129/D-130/D-131 → D-137/D-138/D-139 |
| `foundations/decisions.md`, D-139 *Relations* | `derives from D-129` → `derives from D-137` |
| `foundations/invariants.md`, `player-opaque-session-cookie` *Derives from* | `D-101 · D-130` → `D-101 · D-138` |
| `foundations/invariants.md`, `blocked-account-access` *Derives from* | `D-129 · D-131` → `D-137 · D-139` |
| `foundations/invariants.md`, `player-server-session` *Derives from* | `D-130 · D-129` → `D-138 · D-137` |
| `foundations/invariants.md`, `unblock-restores-no-session` *Derives from* | `D-129` → `D-137` |
| `guidelines/testing.md:149`, *Decision* line of "Trust boundaries" | `D-129 · D-131` → `D-137 · D-139` |
| `guidelines/testing.md:192`–`:194`, the three rows of the blocked account | `D-129 · D-109` → `D-137 · D-109`; `D-131` → `D-139`; `D-100 · D-131` → `D-100 · D-139` |

- The skill copies, the code and the tests cite none of the three numbers: the skill cites only
  D-12. The `git grep` on this branch before the merge listed only the places above.
- The renaming was mechanical: `D-1(29|3[01])` not followed by a digit, applied to this branch's
  side alone, before the three-way merge. The merge base `6540e4c` holds no number at or above
  D-129, so every such number on this branch was the branch's own.
- After the merge, `git grep -n -E 'D-1(29|3[01])\b'` gives exactly the four hits main has:
  - the headings of main's D-129, D-130 and D-131, at `foundations/decisions.md:2296`, `:2320`
    and `:2342`;
  - `streak-program-change` *Derives from* `D-131 · D-136`, at `foundations/invariants.md:834`.

  They are identical to `git grep` on `origin/main`, and each is one of main's meanings.
- Not changed: this cycle's earlier reports under `.runs/` (03, 05, 07), which git ignores. They
  name the old numbers; read them through the table above.

## Conflicts and how each was resolved

Files both sides changed: `.the-way` (the same gitlink on both sides, no conflict),
`foundations/decisions.md`, `foundations/glossary.md`, `foundations/invariants.md` and
`foundations/part_map.md`. No test file was changed by both sides.

| File | Conflict | Resolution |
|---|---|---|
| `foundations/decisions.md` | both sides appended entries after D-128 | main's D-129…D-136 first, unchanged, then this branch's entries as D-137, D-138, D-139: the log in number order, new entries at its end |
| `foundations/invariants.md` | both sides appended entries before `## Withdrawn identifiers` | main's `streak-program-change` first, then `blocked-account-access`, `player-server-session`, `unblock-restores-no-session`. Each keeps its own `- **Violated:** no` line, which the conflict had split between the two sides |
| `foundations/glossary.md` | both sides appended terms | main's *manual map run*, *completion*, *solved map*, *streak*, then *blocked account* |
| `foundations/part_map.md` | none; merged automatically | main's changes kept. This branch's account-server responsibility sentence is the only difference from main |

## Checks

Run on the merge commit `abf2e54`, clean tree:

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before the commit and after the tests) | 0 | 0 errors |
| `npm test -- tests/account-storage.test.mjs` | 0 | 29 pass, 0 fail |
| `npm test -- tests/http.test.mjs` | 0 | 25 pass, 0 fail |
| `npm test -- tests/account-api.test.mjs` | 0 | 9 pass, 0 fail |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| `git grep -n -E 'D-1(29|3[01])\b'` on the merge and on `origin/main` | — | the same four hits, all main's meanings |

Not run:
- `npm test` without arguments (the orchestrator's run).
- main's own test files (`tests/sim/*`, `tests/view/*`), which this branch did not touch and no
  conflict reached.
