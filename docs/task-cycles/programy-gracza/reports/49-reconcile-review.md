PASS 3048428d4d91bbc60ddfe9d3679e2452b25bcc7f

# Review of the reconciliation with the target branch — programy-gracza

- Range: `b00517a..3048428` — the renumbering commit `8ff0c75` and the merge commit `3048428` (parents `8ff0c75`, `38dc54e`).
- `git rev-parse HEAD` = `3048428d4d91bbc60ddfe9d3679e2452b25bcc7f`, the head given. Pinned process: `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both `3aee7d958835cc19b95519f4d21b37538b78e3e1`.
- Trust boundary: no for this task's change; task 20's server code is judged only for how the merge combined it. Irreversible operation: no.

## Findings

- Critical: none.
- Important: none.
- Minor: none.

Blocking: 0. Minor: 0. Out of scope: 0.

## 1. Renumbering `8ff0c75`

- **Every reference moved, and nothing else changed.** For each of the 15 files in `git diff --name-only b00517a 8ff0c75`, applying `\bD-(15[2-9]|16[0-2])\b` → number+12 to the `b00517a` text gives byte for byte the `8ff0c75` text (scratch script, 69 occurrences, 0 mismatches). The diff is the identifier change and nothing else.
- **No file was missed.** `git grep -l -E "\bD-1(5[2-9]|6[0-2])\b" b00517a` lists exactly those 15 files. `git grep -E "\bD-1(5[2-9]|6[0-2])\b" 8ff0c75` gives 0 hits. I also looked for range forms (`D-152–154`, `D-152..D-162`) and bare numbers 152–162 near decision text in the foundation, the program code and the tests. The only hit is a kernel version string in `foundations/environment_facts.md:37`, which has nothing to do with decisions.
- **Each reference still means the same decision.** The order is kept: the eleven headings of D-164–D-174 on `3048428`, with their numbers stripped, equal the headings of D-152–D-162 on `b00517a` (`diff` empty). Because the mapping is exact and keeps the order, every reference points at the same question it pointed at before.
- **The target numbers were free.** On `b00517a` no file held D-164–D-174 before the commit. The base `4bfb962` holds none of D-152–D-174. `38dc54e:foundations/decisions.md` ends at D-163 and has no *Withdrawn identifiers* list.
- **The target's D-152–D-163 were not touched.** For each file, the per-file counts of D-152–D-163 on `3048428` equal those on `38dc54e` (`diff` of `git grep -o … | sort | uniq -c` empty). The per-file counts of D-164–D-174 on `3048428` equal those on `8ff0c75`.
- **The rules of `the-way-record-decision` hold.** Each number stands for its question. New questions take the next free numbers, 164–174 after the log's highest, 163, with no entry or withdrawn number holding them. Every reference was rewritten in the same change. `foundation_check.py` resolves every reference (exit 0, below).

## 2. Merge `3048428`

- **Only `decisions.md` differs from git's own merge.** `git merge-tree --write-tree 8ff0c75 38dc54e` reports a conflict only in `foundations/decisions.md`. `git diff --stat <that tree> 3048428` differs only in `foundations/decisions.md`. So every other file, the four other shared files included, is git's auto-merge, unchanged.
- **`foundations/decisions.md`: each entry comes whole from one side, except D-44.** I split the file into entries per version, with a scratch script. Of the merge's 174 entries, every one except D-44 equals its version on the side that owns it, or on the side that changed it. The preamble is identical. There are no duplicate headings, and the numbers run in order except D-113 before D-112, which `38dc54e` already has. There is a blank line between D-163 and D-164, the file ends with LF and is `i/lf w/lf`, and the tree holds no conflict markers.
- **D-44 combines both sides coherently.** Against `8ff0c75`, the merge adds only the target's clause in the binding sentence (", and the header's button „Wyślij ponownie” then reads „Wysyłanie…”") and the target's third *Origin* source, joined with ` · `. Against `38dc54e`, the merge adds only this task's five-button list, the longer *violates* line, the *Rationale* sentences and the *Rejected* alternatives. The five destructive buttons are „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany” and „Przełącz postać na ten program”. They match `guidelines/styleguide-browser-view.md:197-198` and the comment at `src/browser/styles.css:141`. „Wyślij ponownie” is a plain button in both texts, so there is no contradiction. Using ` · ` in *Origin* matches the separator the template gives for list fields, so it is a reasonable choice.
- **`foundations/invariants.md`: both sides' entries are intact.** The target adds `· D-152` to two *Derives from* lines and changes two account invariants. It also adds `email-confirmation-link`, `unblock-restores-no-link`, `account-message-limits`, `account-email-via-outsider` and `account-email-nodemailer-starttls`. This task changes `streak-program-change` and adds `saved-program-edit` (D-164 · D-131 · D-93) and `copy-save` (D-164 · D-171 · D-131). The hunks are separate, no identifiers collide, and `foundation_check.py` passes.
- **`foundations/part_map.md`: both sides' lines stand.** The target's account-server responsibility sentence, `tests/account-mail.test.mjs` and the trust-boundary row `Mikrus Outsider | both | untrusted` are all there. So are this task's `test_saved_program_edit.py` and `test_copy_save.py` in simulation.
- **`guidelines/styleguide-browser-view.md`: both sides' text stands.** The target's „Wysyłanie…” text sits in the Good example, the loading paragraph and the kitchen-sink paragraph. This task's five-button list stands at l.197-198.
- **`src/browser/styles.css`: the hunks are separate.** The target's `.email-status*` and `.confirmation-notice*` rules stand beside this task's rules, and the stylesheet invariant tests pass (below).
- **View code where the two tasks meet.** Only the target changed `app.ts`, `account-screen.ts`, `email-status.ts` and `email-confirmation.ts`. This task changed `game-view.ts`, `headquarters.ts` and `program-panel.ts`, but not the signature `createGameView(): GameView` (`src/browser/view/game-view.ts:46`), which the target's `showGame` still calls with no arguments. The target's email-status row is appended to `header`, and this task's views live in `main` under `game.element`. Typecheck passes, and `tests/view/account-screen.test.mjs`, which imports app, headquarters and program-panel, passes.

## Declined to judge

- Task 20's server, mail and deployment code and its tests (`src/server/**`, `tests/account-mail.test.mjs`, `tests/deploy/**`, etc.). They were reviewed and merged on the target, the merge did not alter them (it equals git's auto-merge outside `decisions.md`), and this task does not touch them.
- The out-of-order pair D-113/D-112: it is already on `38dc54e`, not part of this reconciliation.
- The wording of the target's own clause in D-44 ("…fields are disabled, and the header's button…"): it is the target's text, taken over unchanged.

## Checks

Run in a separate detached worktree of `3048428` (in the scratchpad, `git worktree add --detach`; `npm ci` there; removed afterwards), except where noted.

| Command | Exit |
|---|---|
| Scratch script: forward mapping `b00517a`→`8ff0c75` over the 15 files, byte comparison | 0 (69 occurrences, 0 mismatches) |
| `git grep -E "\bD-1(5[2-9]|6[0-2])\b" 8ff0c75` | 0 hits |
| `diff` of per-file D-152–D-163 counts `38dc54e` vs `3048428`; D-164–D-174 counts `8ff0c75` vs `3048428` | both empty |
| Headings D-152–D-162 on `b00517a` vs D-164–D-174 on `3048428` (numbers stripped), `diff` | empty |
| Scratch script: per-entry comparison of `decisions.md` across `4bfb962`, `8ff0c75`, `38dc54e`, `3048428` | only D-44 combined; read by diff |
| `git merge-tree --write-tree --name-only 8ff0c75 38dc54e`, then `git diff --stat <tree> 3048428` | conflict only in decisions.md; difference only in decisions.md |
| `git grep -E "^(<<<<<<<|>>>>>>>|=======$)" 3048428` | 0 hits |
| `npm ci` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `node scripts/test-node-file.mjs` on tests/sim/copy (12 pass), copy-actions (26), program-list (26), program-counts (11), flow (12), tests/view/program-panel (21), headquarters (9), program-editor (39), account-screen (22), email-status (8), email-confirmation (5) | 0 each, 0 fail |
| `python -B scripts/test.py` on tests/invariants/test_saved_program_edit (4), test_copy_save (5), test_streak_program_change (5), test_program_closed_lists (3), test_program_rule_pick (8), test_program_world_reference (3), test_simulation_inputs (2), test_browser_view_token_values (4), test_browser_view_focus_outline (3) | 0 each, OK |
| `python -B scripts/test.py tests/quality/test_quality_invariants.py` in the scratch worktree | 1: 2 errors, `FileNotFoundError`. The test takes ruff and shellcheck from `ROOT/.runs/quality-venv`, which the scratch worktree does not have. Environment, not the change. |
| same, in the reviewed worktree, with `PATH` holding `.runs/quality-venv/Scripts` (read-only: ruff `--no-fix --no-cache`, shellcheck) | 0 (5 tests, OK); `git status --short` empty afterwards |

Not run:

- `npm test` with no arguments (the gate): the dispatch leaves it to the cycle.
- tests/sim/discovery, tests/view/clock, and the target's server and deploy tests: discovery and clock are untouched by both commits, and the server and deploy code is unchanged by the merge.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/skill/SKILL.md` §1–2 and `.the-way/elements/decisions/template.md` § Changing a decision, § Withdrawn numbers, § Relations: the rules for an identifier, as the dispatch asks.
- `.the-way/elements/common/rules.md` § Identifiers, § Withdrawn identifiers: what a withdrawn number blocks.
- `scripts/test-node-file.mjs`, `package.json` scripts, `tests/quality/test_quality_invariants.py:11,25`: how to run single test files, and why the quality test failed in the scratch worktree.
- `src/browser/view/game-view.ts:46` and `git diff 4bfb962 38dc54e -- src/browser/view/app.ts`: where task 20's header row meets this task's game view.
