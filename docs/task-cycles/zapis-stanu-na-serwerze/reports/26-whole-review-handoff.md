# Handoff — reviewer of the whole change, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **reviewer of the whole change**, a
fresh agent that made none of it. Read-only: change no file other than your report. Questions go to
the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Process pin `.the-way` at `a8dfe8a`, not moved by this task.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree. Read it whole; read a file it
  names only when the step or variant that names it comes. You review the whole change.
- Range: `dce2970..ae0d7e2` (the task's base to the head; 35 files, +6289 −224).
- Frozen task: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md` — read it whole.
- Spec: `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md` — read it whole (*Decisions* 10 was
  settled by the orchestrator after the spec's re-review).
- Plan: `.runs/task-cycles/zapis-stanu-na-serwerze/plan.md` — read it whole (Slice 5's *Read* gained
  D-117 and D-157, Slice 6's D-129, at the orchestrator's review).
- Select your own foundation entries and guidelines by the parts the change touches, as your method
  gives.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/26-whole-review-report.md`, first
  line `PASS <sha>`, `FAIL <sha>` or `questions`; for each blocking finding name the slice it comes
  from, or that it comes from none (a gap of the plan, or the plan's *Foundation entries*).
- Do not run the whole gate (`npm test` with no argument); it is the orchestrator's, after your
  review. Run focused checks and any mutation analysis your method gives.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**` (part map, `account-server`: the save routes `GET` and
  `PUT /api/saved-game` taking a whole saved game state as JSON from the network, authorized by the
  session alone, and schema step 4) and `src/browser/sim/saved-game.ts` (the simulation's
  *Trust boundary* since Slice 1: the load of data from outside the simulation). Check crafted input
  at both places: D-104's guards on the save route (exact Origin, `application/json`, compressed
  bodies, 64 KiB for the save route and 16 KiB kept for the others), an account named in a request,
  missing, forged or removed sessions and a blocked account's session, non-integer or huge
  `version` and `basedOn`, oversized and multi-byte text, deep nesting, prototype keys, unknown
  archetypes, broken references — each refused without changing what is stored or the game state.
- Irreversible operation: **yes** — schema step 4 (version 3 → 4) of the test server's persistent
  `loop2_accounts`, run by the human's deployments H1 and H2 and by the merge (D-11); after it,
  code from `main` before this task's merge refuses the database (exit 8). Check that the change only
  prepares it (tests on temporary databases only, the deploy skill's text, no agent performing it).

## Slices, their ranges and their reviews

| Part of the change | Range | Own review |
|---|---|---|
| Foundation entries (plan rows 1–30, 32–34) | `dce2970..fb1ef9d`; D-97 fixed in `59cd18a` | judged with Slice 1's review |
| Slice 1 — the simulation's saved-game document and load | `fb1ef9d..b4c3687`; fix `b36292e` | `FAIL b4c3687` → fixes → `PASS b36292e` |
| Slice 2 — schema version 4 and the database operations | `b36292e..bbf6ad2` | `PASS bbf6ad2` |
| Slice 3 — the save routes | `bbf6ad2..fc6540c` | `PASS fc6540c` |
| Slice 4 — the client's saved-game methods | `fc6540c..adb13fb` | none — judge it |
| Slice 5 — the game saver | `adb13fb..6aae1e7` | none — judge it |
| Slice 6 — the page builds the game from the saved game state | `6aae1e7..e27ba5f` | none — judge it |
| Slice 7 — the coding guidelines | `e27ba5f..483f5dc` | none — judge it |
| Slice 8 — the testing guideline | `483f5dc..11d1fb6` | none — judge it |
| Slice 9 — the deploy skill's text | `11d1fb6..59bf3da`; fix `ae0d7e2` | `FAIL 59bf3da` → fix → `PASS ae0d7e2` |

Plan rows 31 (the violated mark of `account-save-durable-storage`, removed after H2) and To do 14
are work after H2, outside this range; the mark stands `Violated: yes` on purpose.

## Reports of the executors whose slices had no review of their own

Read each; their mismatches the mechanical check passed on are below.

- Slice 4: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/16-slice4-report.md` — concern:
  `keepalive: true` cannot be observed from a Node test server, so no test pins it.
- Slice 5: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/17-slice5-report.md` — concern: the
  saver's 30-second check could meet `POST /api/logout` in flight (closed in Slice 6).
- Slice 6: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/18-slice6-report.md` — **mismatch**:
  it changed `src/browser/view/program-panel.ts` and `tests/view/program-panel.test.mjs`, outside its
  *Change*, because a game built from a loaded map run showed program 1 in the editor instead of the
  copy (D-189); screenshot unchecked — the foundation names no route for one.
- Slice 7: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/19-slice7-report.md` — names three
  meanings that need the human's approval (WAY-172): `guidelines/coding-saved-game.md` whole; the
  same-version refusals in its rule „Wersja podnoszona razem z kształtem”; the failure wording of
  `guidelines/coding-browser-module.md`. It left the `SAVED_GAME_VERSION` comment in
  `src/browser/sim/saved-game.ts` saying less than the guideline.
- Slice 8: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/20-slice8-report.md`.

Also for your information: Slice 2's executor saw one failure of the cookie case "set and touch
refuse unusable cookie input without changing stored sessions" (subtest "invalid domain") in a run
under a deliberate mutation of the migration, not in a run of the slice's code; three clean runs
passed; cause not verified (`reports/12-slice2-report.md`, *Problems*).

## Minor and out-of-scope findings of the slice reviews

Copied word for word in `.runs/task-cycles/zapis-stanu-na-serwerze/reports/25-slice-minor-findings.md`
(Slice 1 M1–M3, Slice 2 M1–M2 and its four out-of-scope lines, Slice 3 M1–M3, Slice 9 Minor and
the Slice 9 fix review's Minor). They were not fixed; judge them as your method gives.

## Return

Write your report as the method gives and return its first line, the report path, the changed
files with their added and removed line counts, a one-line check result naming what failed or did
not run, and one line per Critical or Important finding with the slice it comes from.
