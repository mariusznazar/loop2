PASS e07da9b

# Review — reconciliation with `main`, task `potwierdzenie-adresu`

Range `7247c09..e07da9b` (`7dea887` renumbering, `e07da9b` merge of `origin/main` `4bfb962`).
`git rev-parse HEAD` in the worktree = `e07da9bfa7145761218196e371a05e3bf20047f6`, as given; merge
parents `7dea887` and `4bfb962`; merge base `7a633a7`; `.the-way` at `3aee7d9`, equal to the
gitlink. The reviewed worktree, its index and branch were not changed (status clean before and
after; HEAD unchanged).

## Findings

### Critical

None.

### Important

None.

### Minor

None within the range.

### Out of scope (not in the range, for the orchestrator)

- **Cycle files and request #37 still name the email decisions by their old numbers.**
  `.runs/task-cycles/potwierdzenie-adresu/cycle.md:12` and `:97-98` record "D-151 approved by the
  human" and the draft request #37 (body from `reports/07-blocked-request-body.md`, comment
  issuecomment-6489865929) asks about "D-151"; after the merge D-151 in the log is main's
  "Whose health do combat conditions compare?", and the approved decision is D-163. The renumbering
  correctly leaves git-ignored cycle files alone (author's choice, stated), but the request body
  the human reads is not git-ignored history — it will point the human at the wrong decision unless
  the orchestrator rewrites it with the new numbers (or adds the map D-140…D-151 → D-152…D-163)
  when it updates #37. Grade Minor; outside the reviewed commits, so it does not block.

## Declined to judge

- Main's own change (PR #38: combat, `combat-line`, glossary, its invariants and tests) on its
  merits, e.g. whether `combat-line` belongs on the kitchen-sink page by the branch's styleguide —
  merged and reviewed on `main`; this review judges only the reconciliation.
- The pre-existing heading order D-111, D-113, D-112 in `foundations/decisions.md` (already so at
  `7a633a7`; neither side touched it).

## What was checked and how

### Renumbering (`7dea887`) is complete and exact

- Scripted proof: for every file of the tree `7247c09` (278 files, submodule skipped), applying
  `D-1(4[0-9]|5[01])\b` → number + 12 byte for byte gives exactly the blob at `7dea887`; same file
  set. Result `files 278 changed 13 mismatches 0 same file set True` (script
  `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8920f01f-a1b3-457e-b488-3f70c8b0c5f7\scratchpad\renum_check.py`).
  So nothing else changed in that commit, and no mention in `D-NNN` form was left behind.
- `git grep -cE "D-1(4[0-9]|5[0-9]|6[0-3])\b" 7247c09`: 68 lines in the 13 files the author lists.
- Other notations: `git grep -nE "D[-‑–]?1[4-6][0-9]|D-14x|D-15x|D1[4-6][0-9]" 7247c09` minus
  the `D-` form → no hit; added lines of `7a633a7..7247c09` searched for a bare 14x/15x after a
  `D-` number or "decision 14x" → every hit carries the `D-` prefix (covered by the substitution).
- `7a633a7` named no D-140+ (author's premise): consistent with the 68-line count being only the
  branch's.

### Merge (`e07da9b`) keeps both sides and nothing else

- Files changed on each side against `7a633a7`: only `foundations/decisions.md`,
  `foundations/invariants.md`, `src/browser/styles.css` on both. `git diff --name-only 7dea887
  e07da9b` lists only files main changed, and `git diff --name-only 4bfb962 e07da9b` only files
  the branch changed → no change outside a side's own files (no evil merge); the branch's code,
  tests, skills and other foundation files are byte-identical to `7dea887`.
- `git merge-file` (ours `7dea887`, base `7a633a7`, theirs `4bfb962`) on each shared file:
  `invariants.md` and `styles.css` merge without conflict and the result is byte-identical to
  `e07da9b`. `decisions.md` has one conflict (base end of log, after D-139); `e07da9b` equals the
  merge-file output with the conflict replaced by main's block, one blank line, then the branch's
  block (`diff` shows only that blank line) — so every non-conflicting hunk is git's clean merge.
- Headings: 163 `### D-` entries, no duplicate, D-130…D-163 in order, main's D-140…D-151 (combat)
  then the branch's D-152…D-163; no conflict markers.
- Lines naming D-140…D-151 at `e07da9b` equal those at `4bfb962` (30 lines, line numbers ignored,
  `cmp`); lines naming D-152…D-163 at `e07da9b` equal those at `7dea887` (68 lines); `4bfb962`
  names none of D-152…D-163. None of main's mentions renumbered, none of the branch's left.
- `loop2-deploy` skill copies: at `e07da9b` the 23 files under `.claude/skills/` and
  `.agents/skills/` pair one to one with identical blob ids.

### Same question asked twice (WAY-33)

Read main's D-147 and D-148 (where the encounter record stands) against the branch's D-157 (the
header row of an unconfirmed address): the combat line stands in the game view's run panel below
discovery; the email row stands in the header under the title — different places, no shared
question. Titles of D-140…D-151 (combat, map opening, combat skills) and D-152…D-163 (sign-in,
mail, confirmation) share no question; main's changes to D-128/D-131/D-136 and its invariant edits
(`action-in-progress`, `program-rule-pick`) and glossary terms touch nothing the branch decides.
Neither side's text names the other's decisions (grep identities above). No relation missing.

### Schema step (step 4 answer)

Main changed no file under `src/server/`, no `compose.yaml`, `package.json`, deploy script or test
of `tests/deploy/` (its 47 files: `foundations/*`, `src/browser/**`, `stryker.config.json`,
`tests/sim|view|invariants/**`). It carries no schema step of `loop2_accounts`; nothing collides
with step 3, which stays only prepared. The branch's trust-boundary files are byte-identical to
`7dea887`, already reviewed (`PASS 7247c09`) but for the comment renumbering proven above.

### Behaviour unchanged — focused checks

Run in a separate detached worktree of `e07da9b` (scratchpad `wt-review`, `.the-way` initialised
at `3aee7d9`; `node_modules` and `.runs/quality-venv` linked read-only by junction to the reviewed
worktree's, valid because main did not change `package.json`/`package-lock.json`). Junctions
removed, worktree removed and pruned afterwards.

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `npm run typecheck` | 0 | |
| `npm run build` | 0 | |
| `node scripts/test-node-file.mjs tests/http.test.mjs` | 0 | 33 pass, 0 fail |
| `… tests/account-storage.test.mjs` | 0 | 44 pass |
| `… tests/account-mail.test.mjs` | 0 | 7 pass |
| `… tests/transport.test.mjs` | 0 | 8 pass |
| `… tests/account-api.test.mjs` | 0 | 11 pass |
| `… tests/startup.test.mjs` | 0 | 15 pass |
| `… tests/view/account-screen.test.mjs` | 0 | 22 pass |
| `… tests/view/email-confirmation.test.mjs` | 0 | 5 pass |
| `… tests/view/email-status.test.mjs` | 0 | 8 pass |
| `… tests/view/status-row.test.mjs` | 0 | 28 pass |
| `… tests/view/combat-line.test.mjs` | 0 | 3 pass |
| `… tests/view/headquarters.test.mjs` | 0 | 6 pass |
| `… tests/view/program-editor.test.mjs` | 0 | 39 pass |
| `… tests/sim/combat.test.mjs` | 0 | 11 pass |
| `… tests/sim/encounters.test.mjs` | 0 | 27 pass |
| `python -B scripts/test.py tests/quality/test_quality_invariants.py` | 0 | 5 OK (first run 1: 2 errors because the scratch worktree had no `.runs/quality-venv`; rerun with the junction, OK) |
| `… tests/deploy/test_account_storage.py` | 0 | 1 OK |
| `… tests/invariants/test_map_run_tiles.py` | 0 | 6 OK |
| `… tests/invariants/test_content_identifiers.py` | 0 | 4 OK |
| `… tests/invariants/test_program_closed_lists.py` | 0 | 3 OK |
| `… tests/invariants/test_program_rule_pick.py` | 0 | 8 OK |
| `… tests/invariants/test_simulation_inputs.py` | 0 | 2 OK |
| `… tests/invariants/test_account_server_default_address.py` | 0 | 1 OK |
| `… tests/invariants/test_loop2_host_sharing.py` | 0 | 18 OK |
| `… tests/invariants/test_browser_view_token_values.py` | 0 | 4 OK |

`node scripts/test-node-file.mjs` is what `npm test -- <file>` runs after its build; one build
served all Node files. The branch's test files are byte-identical to `7dea887`, so passing them on
the merged tree shows the reviewed behaviour unchanged by main's code.

Changed invariant tests: none in the range of the reconciliation beyond main's own
(`tests/invariants/test_map_run_tiles.py` etc., unchanged by the merge) — run above.

Not run: the whole gate (`npm test` with no argument), by the dispatch; the orchestrator runs it.
Nothing deployed; the server and `outsider.mikr.us` were not contacted.

### Author's own-work check

It names the most likely miss (an old number left, or a main mention renumbered) and checks it by
the sorted-line `cmp`; that check would catch it. Confirmed independently, and strengthened by the
byte-for-byte transform proof above.

## Reach beyond the dispatch

- `foundations/decisions.md` D-147, D-148 (main) and D-157 (branch), read whole — for the WAY-33
  question (layout of the combat line vs the header row).
- `git diff 7a633a7 4bfb962 -- foundations/invariants.md foundations/glossary.md`,
  `src/browser/view/game-view.ts`, `stryker.config.json` — to see whether main touches anything the
  branch decides or tests.
- `git diff 7a633a7 7dea887 -- guidelines/styleguide-browser-view.md guidelines/coding.md` — to
  see whether the branch's guideline changes bind main's new view code.
- `scripts/test.py`, `scripts/test-node-file.mjs`, `tests/quality/test_quality_invariants.py`
  (`venv_tool`) — how the focused tests run.
- `.runs/task-cycles/potwierdzenie-adresu/cycle.md` (grep for D-14x/D-15x) and `task.md` (no
  renumbered number) — for the out-of-scope note above.
