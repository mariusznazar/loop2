# Slice 1 report — The Node.js range in README, package.json and the lockfile

**Status:** done

## Commits

- `fe84d1e` — `chore: :wrench: require Node.js 24.15.0 or newer in line 24 in the README, package.json and the lockfile` (on branch `task/teksty-rozjechane-z-kodem`, on top of slice base `3fcf546`)

## Files changed

| File | Added | Removed | Change |
|---|---|---|---|
| `README.md` | 1 | 1 | line 5: `Wymagania: Node.js 24.15.0 lub nowszy w linii 24 (`^24.15.0`) i dostarczony z nim npm.` (was `24.x`) |
| `package.json` | 1 | 1 | line 7: `engines.node` = `^24.15.0` (was `24.x`) |
| `package-lock.json` | 1 | 1 | line 39: `packages[""].engines.node` = `^24.15.0` (was `24.x`); nothing else |

The reason sentence in the README (npm and jsdom declare the floor) was not added: the plan makes it optional, and the slice's goal does not require it. The lockfile supports it: the `node_modules/jsdom` entry (engines at line 4346) and the `node_modules/npm` entry (engines at line 4846) both declare `^22.22.2 || ^24.15.0 || >=26.0.0`.

## Checks

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `python -B scripts/test.py tests/invariants/test_account_server_runtime.py` (before the change, baseline) | 0 | Ran 5 tests, OK |
| 2 | `python -B scripts/test.py tests/invariants/test_account_server_runtime.py` (after the change) | 0 | Ran 5 tests, OK |
| 3 | `git diff --stat -- package-lock.json` (against the slice base) | — | 1 insertion, 1 deletion: one line changed |
| 4 | `python -B scripts/audit_dependencies.py` | 0 | No output. The lockfile differs from the fork point `2fe922c` (`git merge-base HEAD origin/HEAD`), so the audit ran both npm audits, the one on the fork-point lockfile and the one on the changed lockfile, and the script reported no advisory new against the fork point. The script raises (exit 1) on a failed request or unreadable report, so exit 0 means complete reports were read. |

Not run by this slice:
- `npm test` (the whole gate): the orchestrator runs it, per the handoff.
- `python -B .the-way/elements/common/foundation_check.py`: not in this slice's checks and the cycle's gate runs it. Left unchecked here.

No test was written or changed. The change is configuration and prose, so the existing invariant test is the regression check the plan names. The test was not seen failing for this change: it reads only the major version 24, which both the old and the new value satisfy.

## Own-work check (make-change section 3)

- **Requirement:** `^24.15.0` is in the three places named by the slice, `nothing else of the lockfile changes`, and no `24.x` remains in them.
- **Check:** `grep -rn '24\.x\|24\.15\.0' README.md package.json package-lock.json`, and `git diff --numstat -- package-lock.json`.
- **Showed:** no `24.x` left in the three files; `24.15.0` appears at README:5, package.json:7, package-lock.json:39; the lockfile diff is one line (1/1). Requirement met.
- **Gap noted:** no test pins the floor `24.15.0`; the invariant test only checks major 24. A bump from `^24.15.0` to `^24.0.0` would pass every current check. Adding such a test is outside this slice.

## Reach beyond the handoff

- `.the-way/task-cycle/change/SKILL.md` and `.the-way/task-cycle/change/slice.md`: named by the method; read whole.
- `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`: named by the handoff as the frozen task; read whole.
- `scripts/audit_dependencies.py` (57 lines): read to know what the audit check prints and when it exits 1. Not named in *Read*.
- `a rule file of the author's agent instructions`: read before the commit, as the vault's git rules require (outside the repo). Commit used explicit paths; the commit author is the address the conditional gitconfig gives for the `mariusznazar` remote.
- `package-lock.json` lines 4317-4350 and 4688-4850: read by grep and awk to confirm which entry holds the npm and jsdom engines (for the reason above only).

## Unread material

- `.runs/.../plan.md`: not opened; the slice text is copied in the handoff, and the handoff says the copy is the source for this slice.
- `guidelines/coding.md`: read whole.
- `foundations/part_map.md:84-116`: read.
- `foundations/decisions.md:3-15` (D-01) and `:765-776` (D-33): read whole entries.
- `foundations/invariants.md:5-13`, `:449-457`, `:549-557`: read whole entries.
- `tests/invariants/test_account_server_runtime.py`: read whole.
- README: read lines 1-12 only (line 5 is the one changed); the rest is not part of this slice.

## Searches not found or unclear

- `24.x` across the tracked `.md`, `.json`, `.mjs`, `.py`, `.yml` and `.yaml` files: remaining hits are `foundations/decisions.md:23` (inside a prose quote about Node.js 24 docs), `foundations/environment_facts.md:5` and `:7` (the Node.js 24.x end-of-life fact, which is not part of this slice). None of these were changed.
- The audit script prints nothing on a pass; exit 0 is the only signal. Not unclear, but noted so the orchestrator knows the silence is a pass and not a skipped run.

## Questions and concerns

- None blocking.
- Optional for the orchestrator: whether the README should later carry the reason sentence (npm and jsdom floor), and whether a test should pin the floor `24.15.0`. Both are outside this slice.
