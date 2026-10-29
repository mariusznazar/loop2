# Reconciliation with the target branch — report — programy-gracza

- **Status:** done
- **Branch:** `task/programy-gracza`, from `b00517a` to `3048428`; not pushed.
- **Commits:**
  - `8ff0c75` docs: :memo: renumber the player-programs decisions D-152..D-162 to D-164..D-174
  - `3048428` Merge origin/main (38dc54e) into task/programy-gracza (parents `8ff0c75`, `38dc54e`)
- Pinned process checked: `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both give `3aee7d958835cc19b95519f4d21b37538b78e3e1`.
- Trust boundary: no. Irreversible operation: no.

## Free-identifier check

- `git show 38dc54e:foundations/decisions.md`: the highest heading is `### D-163`. No identifier above D-163 appears anywhere in the file (`grep -o -E "\bD-[0-9]+\b" | sort -n | tail` gives D-161, D-162, D-163). The file has no *Withdrawn identifiers* list.
- `git grep -E "D-1(6[4-9]|7[0-9])\b" HEAD` on `b00517a`: no hits, so no reference already used the target numbers.
- `git grep -E "D-1(5[2-9]|6[0-2])\b" 4bfb962`: no hits. The base had none of these identifiers, so every hit on the branch belonged to this task.
- Result: D-164–D-174 are free. The mapping C16 gives applies unchanged.

## Mapping applied

D-152→D-164, D-153→D-165, D-154→D-166, D-155→D-167, D-156→D-168, D-157→D-169, D-158→D-170, D-159→D-171, D-160→D-172, D-161→D-173, D-162→D-174.

The renumbering ran as one regex pass per file, `\bD-(15[2-9]|16[0-2])\b` → number + 12, using `newline=''` so line endings were kept (all 15 files are `i/lf w/lf`). Every match was rewritten exactly once, and the source and target ranges do not overlap. To verify, I mapped D-164–D-174 back to D-152–D-162 in each file of the working tree and compared the result byte for byte with `HEAD`: 0 mismatches. The diff is therefore the identifier change and nothing else. After the commit, `git grep -E "D-1(5[2-9]|6[0-2])\b"` gave 0 hits.

## References changed, by file (lines changed +/−, occurrences)

| File | Lines | Occurrences | What |
|---|---|---|---|
| foundations/decisions.md | 26/26 | 26 | the eleven headings; *Relations* `derives from D-152` in D-93 (l.1648), D-123 (l.2172), D-131 (l.2370) and in D-165–D-174; body text of D-171 and D-172 |
| foundations/invariants.md | 2/2 | 3 | *Derives from* of `saved-program-edit` (D-164) and `copy-save` (D-164 · D-171) |
| src/browser/sim/programs.ts | 3/3 | 3 | D-170 ×2, D-169 |
| src/browser/sim/types.ts | 2/2 | 2 | D-165, D-164 |
| src/browser/view/headquarters.ts | 2/2 | 2 | D-170 ×2 |
| src/browser/view/program-panel.ts | 1/1 | 1 | D-165 |
| tests/invariants/program_fixture.py | 1/1 | 1 | D-164 |
| tests/invariants/test_program_closed_lists.py | 1/1 | 1 | D-164 |
| tests/invariants/test_program_rule_pick.py | 1/1 | 1 | D-164 |
| tests/invariants/test_program_world_reference.py | 1/1 | 1 | D-164 |
| tests/invariants/test_simulation_inputs.py | 2/2 | 2 | D-164 ×2 |
| tests/sim/copy-actions.test.mjs | 1/1 | 3 | D-164, D-171, D-174 |
| tests/sim/copy.test.mjs | 3/3 | 6 | D-164, D-165, D-170 |
| tests/sim/program-list.test.mjs | 2/2 | 5 | D-164, D-165, D-168, D-169, D-170 |
| tests/view/program-panel.test.mjs | 11/11 | 12 | D-166–D-174 in the test comments |

Total: 59 lines and 69 occurrences in 15 files, which matches the orchestrator's list of files. `foundations/glossary.md` had no reference. No reference sits in an entry that the base or the target owns.

## Merge

`git merge --no-ff --no-commit 38dc54e` had one conflict, in `foundations/decisions.md`. It came in three hunks.

1. **D-44, binding sentences** (both sides changed it). The combined text keeps this branch's five destructive buttons („Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”) and adds the target's clause ", and the header's button „Wyślij ponownie” then reads „Wysyłanie…”". Neither side's other sentences changed.
2. **D-44, *Verification* / *Origin***. *Violates* keeps this branch's longer list; the target left that line as it was on the base. *Origin* lists all three sources joined by ` · `: styleguide Q12 · programy_gracza Q5 and Q16 · potwierdzenie_adresu question 3 and row K4. This is a choice (see below). D-44's *Rationale* and *Rejected* were auto-merged from this branch, because the target left them unchanged.
3. **End of the log.** It now holds the target's D-152–D-163 and then this branch's D-164–D-174, one blank line between them. The headings run in identifier order, with no duplicates and 174 entries. The only out-of-order pair, D-113 before D-112, is already on `38dc54e` and is not part of this change.

I combined D-44 by the rules of `the-way-record-decision` for an edit in place: the entry describes the decision as it now stands, its number is unchanged, and nothing derives from or narrows D-44 in a way that changes.

Other files both sides changed, auto-merged. Each side's hunks are separate and the result reads coherently.

- `foundations/invariants.md`: this branch changes `streak-program-change` and adds `saved-program-edit` and `copy-save`. The target adds `· D-152` to two account invariants and adds `email-confirmation-link`, `unblock-restores-no-link`, `account-message-limits`, `account-email-via-outsider` and `account-email-nodemailer-starttls`. All entries are intact and no identifier collides. The merged file holds the target's D-152–D-163 references with the same count as on `38dc54e` (9), and they keep their task-20 meaning.
- `foundations/part_map.md`: the target's account-server responsibility line, `tests/account-mail.test.mjs` and the trust-boundary row `Mikrus Outsider` all stand, and so do this branch's `tests/invariants/test_saved_program_edit.py` and `test_copy_save.py` in simulation.
- `guidelines/styleguide-browser-view.md`: the target's waiting-label text for „Wyślij ponownie” (the Good example, the loading paragraph, the kitchen-sink paragraph) stands. So does this branch's destructive-button list „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany” i „Przełącz postać na ten program”, which names the same five buttons as merged D-44. „Wyślij ponownie” is a plain button on both sides.
- `src/browser/styles.css`: the target's `.email-status*` and `.confirmation-notice*` rules stand, and so do this branch's destructive-button comment (five buttons, as in D-44), program-list, copy and switch rules, and `.team-member-program-label`.

Cross-check on the merged `HEAD`: D-152–D-163 occurrences are 29 in decisions.md and 9 in invariants.md, the same as on `38dc54e`, and no other file gained any. D-164–D-174 occurrences are 69 on `8ff0c75` and 69 on `3048428`.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after renumbering, before commit) | 0 (0 errors) |
| `node scripts/test-node-file.mjs` on copy, copy-actions, program-list (sim) and program-panel (view), after renumbering | 0 each |
| `python -B scripts/test.py` on test_program_closed_lists, test_program_rule_pick, test_program_world_reference, test_simulation_inputs, after renumbering (program_fixture.py is imported by them) | 0 each |
| `python -B .the-way/elements/common/foundation_check.py` (merge resolved, before commit) | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (on `3048428`) | 0 (0 errors) |
| `npm ci` (package-lock.json changed on the target) | 0 |
| `npm run typecheck` | 0 |
| `npm run build`, then `node scripts/test-node-file.mjs <file>` for tests/sim/copy (12 pass), copy-actions (26), program-list (26), program-counts (11), flow (12), discovery (31), tests/view/program-panel (21), program-editor (39), headquarters (9), clock (5) | 0 each, 0 fail |
| same for target tests that read this task's files: tests/view/account-screen.test.mjs (imports view/app, headquarters, program-panel; 22 pass), tests/view/email-status.test.mjs (8), tests/view/email-confirmation.test.mjs (5) | 0 each |
| `export PATH="$PWD/.runs/quality-venv/Scripts:$PATH"; python -B scripts/test.py <file>` for tests/invariants/test_saved_program_edit (4), test_copy_save (5), test_streak_program_change (5), test_program_closed_lists (3), test_program_rule_pick (8), test_program_world_reference (3), test_simulation_inputs (2) | 0 each, OK |
| same for test_browser_view_token_values (4) and test_browser_view_focus_outline (3), which read `src/browser/styles.css`, a file both sides changed | 0 each, OK |
| same for tests/quality/test_quality_invariants.py (5) | 0, OK |

Not run:
- `npm test` with no arguments (the gate): the handoff leaves it to the cycle.
- The target's server tests (http, transport, account-api, account-mail, account-storage, startup, tests/deploy, the account container invariants): they read only server and deploy code this task does not change.

## Own-work check

The most likely miss: a reference to this task's decisions left under an old number, or a task-20 reference rewritten by mistake. Checks that would catch it:

- the reverse-mapping byte comparison (0 mismatches);
- `git grep` for D-152–D-162 on `8ff0c75` (0 hits);
- D-152–D-163 counts on the merged `HEAD` equal to those on `38dc54e` (29 and 9), and in no other file;
- D-164–D-174 counts equal before and after the merge (69).

All held.

## Choices

- **D-44 *Origin* joins all three sources with ` · `.** Rejected: keeping the target's `; ` before the potwierdzenie_adresu source. That would mix two separators in one field. Cost if wrong: one punctuation mark in one field.
- **The merge commit is a plain `git commit`.** A merge cannot be committed by path. The index held only the merge result and the resolved `foundations/decisions.md`, and `git status` showed nothing else, untracked files included.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` and `.the-way/elements/common/rules.md` (§ Identifiers, § Withdrawn identifiers), which the record-decision skill references, read for the rules on renumbering and combining an entry.
- `scripts/test.py` and `package.json`, read for how to run a single test file without the gate.
- `git diff 4bfb962 38dc54e` of the target's test files, grepped to find which tests read files this task changed.

## Problems observed

None.
