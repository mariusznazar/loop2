# Executor report — slice 4: RulePanelView divided under the threshold of a function

Status: done.

Written to this path after the coordinator's repair request. The first attempt (the full report in the final message) had no file; this file is the record.

## Commits

- `e0cd12e5` on `task/struktura-kodu`, author `mariusznn@gmail.com` (the private address the git rules allow), message `refactor: :recycle: divide RulePanelView under the threshold of a function, the change of a field as the pure function changedProgram and the group's name field, the pick grid with its keys and the number field as components of rule-panel.tsx`.
- No further commit: the repair checks showed no defect.

## Files changed

- `src/browser/view/rule-panel.tsx`: +317 / -200 (`git show --stat e0cd12e5`).
- Working files in this directory: `executor-4-steps.sh`, `executor-4-log-new.txt`, `executor-4-log-base.txt` (the manual-check script and its two logs, see Checks).

## Checks (command, exit code)

Focused checks on the committed file:

| Command | Exit | Result |
|---|---|---|
| `node tests/quality/eslint-size-rules.mjs` | 0 (the run always exits 0) | No report for `rule-panel.tsx`. Total over threshold: 6 items in 297 files (was 7). Before the change: `RulePanelView` 345 lines, line 197. |
| `npm run typecheck` | 0 | Runs `scripts/build.mjs --check`. |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/rule-panel.tsx` | 0 | No warnings. |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/rule-panel.tsx` | 0 | Formatted. |
| `npm test -- tests/view/rule-editor.test.mjs` | 0 | 76 of 76 pass. The same file also passed before the change (baseline). |
| `npm test -- tests/view/discovery-rule.test.mjs` | 0 | 18 of 18 pass. |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | 60 of 60 pass. |
| `npm run build` | 0 | Run after the change, and again after the restore. |

Not run: the full suite (`npm test` without an argument), `foundation_check.py`, `check_instructions.py`. The slice's checks are the focused ones; the full run is the cycle's before the request.

Manual check in a real browser (D-88), with Playwright CLI 0.1.22 against `npm run local`. Nothing kept but the logs; no screenshot.

Comparison of the same steps on the base build and on the committed build:
- Script: `executor-4-steps.sh`. It signs up a made-up account, sends the composed state (no branch purchase, so one action is greyed), opens the map run, adds a rule with "+ reguła", and then runs: two arrow keys and Enter in the condition grid; a number typed and Enter; four arrow keys into the action grid onto the greyed cell, Enter on it; the close button.
- Base build: `git show 2935e093:src/browser/view/rule-panel.tsx` put in place, `npm run local`, the steps, `npm run local:stop`, then `git checkout HEAD -- src/browser/view/rule-panel.tsx` (the committed file), `npm run build`. `git status` is clean afterwards.
- Result: `diff executor-4-log-new.txt executor-4-log-base.txt` is empty. The logs are identical at every step: the focused element, its class and tab index, and the text of each field.

What the steps showed (both builds):
- The panel opens under rule 1.1 with the condition grid; arrows move the focus; Enter on "Zdrowie poniżej" commits the condition and the number field takes focus with 36.5 selected; typing 35 and Enter commits and moves to the action grid, focus on the chosen cell.
- The greyed cell: "Obchód — gałąź niewykupiona" (class `greyed`, `aria-disabled=true`). Arrow keys reach it; Enter on it changes nothing (the rule stays "Eksploruj").
- The close button puts focus back on the rule's row (`rule-list-row`).

The greyed-cell check needed a state without the branch purchase. The composer's file is unchanged; I used a copy with the one `buyBranch` line commented out, composed with `node`, and sent it with the ordinary save request (answer 200).

Earlier checks, from the first pass: the group name rename commits on Enter ("Program" to "Program nowa"); "✕" on the group panel puts focus on the group header.

## How I divided the function

`RulePanelView` was 345 lines. The verdict's cut (`changed` and the group's name field) would have left about 290, so I cut further inside the same file:

- `changedProgram` (top level, pure): the change a picked value makes; was the inner `changed`. It takes the state, the program, a `RuleTarget` (group, place, condition) and the field and value.
- `fieldsOf` (top level, pure): the fields after a change; was the inner `fieldsIn`. Moved out to bring the component under 200; the first cut left it at 206.
- `GroupNameField` (component): the group-name field. Its state stays in the parent.
- `PickGrid` (component): the grid of pick cells, with its key and focus handlers (`gridKey`, `gridFocus`), which moved with it. The grid's own `cellsBefore` counter stays inside the render.
- `NumberRow` (component): the number field with its unit and its Enter handling. It returns null where the old guard returned null.
- `RulePanelView` keeps: the state (`shown`, `name`), the refs, `pickOf` and the tabbable cell, the focus effect (no dependency list, as before), `moveTo`, `setCursor`, `choose`, `commitNumber`, `commitName`, `renderField` and the page shell.

The four exports (`RulePanelOpen`, `RulePanelProps`, `RulePanelHandlers`, `RulePanelView`) are the same as the base. The new helpers are not exported.

## Own-work check

The requirement most likely missed: hooks stay at the top level of a component, and the focus effect keeps its behaviour.

- Check: `grep -n "useState\|useRef\|useLayoutEffect" src/browser/view/rule-panel.tsx`. All hook calls are in `RulePanelView` (lines ~529–543), above its early return. The new components (`GroupNameField`, `PickGrid`, `NumberRow`) call no hook.
- Check: `grep -n "^export" src/browser/view/rule-panel.tsx` against the base: the same four exports.
- Check: the focus effect's code is unchanged and still has no dependency list; its values (`openKey`, `requested`, `active`, `tabbable`, the refs) are read in the same render.
- Result: pass. The browser comparison above is the behaviour check.

## Choices

- Name state kept in the parent, not moved into `GroupNameField`. Rejected: moving it, which would reset the typed name when the field unmounts without a blur (an edge case the old code did not have). Cost if wrong: a stale name could survive a group switch; not seen.
- Focus effect kept in `RulePanelView`, not moved to a custom Hook. Rejected: a custom Hook with about six arguments and two refs; it would add call-site lines and no clarity. The effect has no dependency list, as before.
- Components kept in `rule-panel.tsx`, no new file (the plan's rule: split inside the existing files).

## Reaches beyond the handoff

- `.the-way/task-cycle/change/slice.md` and `SKILL.md`: the method (read).
- `plan.md` table rows, by grep (the handoff's "Foundation entries" rows, lines 11–12 and 332–361).
- `src/browser/view/controls/react-pick-cell.tsx`: how a greyed cell is marked (class `greyed`, `aria-disabled`, reason text).
- `src/browser/view/program-editor.ts` lines 499–510, 570–600 and 654–670: the greying rules (`PICK_REASONS`, `conditionPick`, `resourcePick`), read to find a greyed cell. Earlier I said I had not opened this file; that was true then, and these ranges are what I read later.
- `.claude/skills/loop2-play/compose-state.mjs`: read; a copy with the branch purchase removed was made under the working directory for the greyed-cell state (the repository copy is unchanged).
- The git rules (`.ai/rules/git.md`) and the scripting rules (`.ai/rules/scripts.md`): a hook asked me to read them before the commit and before writing a script; each call was retried after reading.
- `gh auth status`: a sign-in check only.

## Unread material

- `guidelines/testing.md`: not read. No test was written or changed; the slice writes none.
- `ui_check.md` (the change method's file): not read. The slice does not change what any screen shows; the browser comparison showed the same steps with the same results on both builds.
- `src/browser/view/program-editor.ts`: read only at the three ranges named under Reaches; the rest is unread.
- `foundations/decisions.md` D-29 and other decisions outside the handoff's list: not read.
- `plan.md`: only the table rows named above; the slice section as the handoff copied it.
- Everything else the handoff named was read (see the first report's list, unchanged).

## Searches not found or unclear

- A greyed cell in the standard composed state: none in the grids reached (condition, condition target, action; the target of "Zjedz — jagoda" did not open a field). Resolved with the variant without the branch purchase.
- Nothing else unclear.

## Working copies

- `.playwright-cli/` (state files, send scripts, the first logs, Playwright snapshots, the compose variant): removed after the logs were copied to `reports/`. Kept in `reports/`: `executor-4-steps.sh`, `executor-4-log-new.txt`, `executor-4-log-base.txt`.
- `.runs/executor-4/` (the first pass's logs): removed in the first pass.
- Product output (`dist/`, `.runs/local-start/`): created by `npm run build` and `npm run local`; the starts are stopped (`npm run local:stop`). Not my copies.
- No worktree was made by me in this pass.
