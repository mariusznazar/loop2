# Slice 21 report — the comments of the stylesheets (cycle `drobne-bledy-ekranow`)

## Status

`done`

Worktree: `.`, branch `task/drobne-bledy-ekranow`.
Base `cf068a01135704578cf0ebf3d488dcac8799efd3`, head `5b3dac41`. One commit.

## Commits

- `5b3dac41` — `docs: :memo: name in the stylesheets the file where the rule that each comment calls above stands, and the source of the grey of the dead mage and the extinguished fire`

Commit was made with explicit paths (`git add <six files>`).

## Files changed

Comments only. No selector, declaration, value or order of rules changed.

| File | Added | Removed | What changed |
|---|---|---|---|
| `src/browser/styles.css` | 3 | 2 | head comment: sentence on "each other screen and part" now says Programy, Mapy and Wiedza have a stylesheet of their own, and the shared rules that stay here are named above |
| `src/browser/run-screen.css` | 2 | 2 | comment over `grayscale(1) brightness(0.55)`: adds the source, accepted by Mariusz on 2026-11-16, as on the screenshot of the game; "rule above" at the focus sentence now names `styles.css` (D-47) |
| `src/browser/maps-screen.css` | 2 | 2 | "columns of Programy (above)" → "(in styles.css)"; "one :focus-visible rule above" → "of styles.css" |
| `src/browser/knowledge-screen.css` | 2 | 2 | "columns of Mapy (above)" → "(in styles.css)"; "one :focus-visible rule above." → "of styles.css." |
| `src/browser/program-panel.css` | 1 | 1 | "one :focus-visible rule above." → "of styles.css." |
| `src/browser/programs-screen.css` | 1 | 1 | "one :focus-visible rule above." → "of styles.css." |

Total: 11 insertions, 10 deletions.

The seven "above" comments of the task (To do 25) are the ones in the table: two in `maps-screen.css`, two in `knowledge-screen.css`, one each in `program-panel.css`, `programs-screen.css` and `run-screen.css`. Each now names `styles.css`, where the `:focus-visible` rule and the columns of Programy, Mapy and Wiedza stand (D-421, D-47).

## Checks

Focused checks, each run once after the edits, from the worktree root:

| # | Command | Exit | Log |
|---|---|---|---|
| 1 | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests OK) | `reports/slice-21-check-1-token-values.log` |
| 2 | `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 (3 tests OK) | `reports/slice-21-check-2-focus-outline.log` |
| 3 | `npm test -- tests/view/scene.test.mjs` | 0 (72 pass, 0 fail) | `reports/slice-21-check-3-scene.log` |
| 4 | `npm test -- tests/view/rule-signs.test.mjs` | 0 (6 pass, 0 fail) | `reports/slice-21-check-4-rule-signs.log` |

Summary of all four: `reports/slice-21-checks-summary.txt`.

Formatting, on the six changed files:

- `npx prettier --check` before the edits: exit 0 (`reports/slice-21-prettier-before.log`).
- `npx prettier --check` after the edits, before commit: exit 0 (`reports/slice-21-prettier-after.log`).

No new or changed test, so no failing-first run and no invariant test seen failing. The full suite was not run.

## Own-work check

Requirement of the slice: comments only, no rule changed, and the comments name the file where each rule now stands (To do 22 and 25; settlement 10).

Check, proof that no rule changed: the six stylesheets were hashed with their comments stripped (`perl -0777 -pe 's{/\*.*?\*/}{}gs'` then `sha256sum`) before the edits and after them. The two lists are identical (`diff` returned no output).

- before: `reports/slice-21-strip-before.txt`
- after: `reports/slice-21-strip-after.txt`

Result: identical for all six files. Every rule, value and selector is unchanged.

Check, the seven comments and the head comment: `grep -n above` over the six files after the edits. The remaining "above" hits are references to something in the same file (for example `styles.css:107`, `:170`, `:268`, `:419`, `program-panel.css:140`) or spatial uses (for example "the program above", "the editor above"). None says that a rule stands above in another file. Result: pass.

Check, the grey comment: the comment over `.scene[data-standing="dead"] .scene-mage-sprite, .scene-fire[data-burning="false"]` now carries the source. Result: pass (read in the diff above).

## Questions and concerns

1. Mismatch in the task passage. The task (`task.md:46`, `:205`) and the settlement say the comment over `grayscale(1) brightness(0.55)` is in `src/browser/styles.css`. The rule is in `src/browser/run-screen.css:747-749`, and `styles.css` has no such value (`grep` found it only in `run-screen.css`). I edited the comment where the rule is, as the handoff says. Small mismatch, adapted in one line (the method's `slice.md`, "a small mismatch"). The orchestrator may want to correct the task's wording.
2. Wording choice, to check: the head comment of `styles.css` now says "Programy, Mapy and Wiedza have a stylesheet of their own too, and the rules they share that stand here are named above." Way rejected: deleting the sentence (that would drop the statement that each screen's rules are in its own stylesheet, which D-421 keeps). Cost if wrong: a reviewer may want a shorter phrase; comment only.
3. Wording choice: the source comment reads "accepted by Mariusz on 2026-11-16, as on the screenshot of the game." The handoff gives this as the human's answer. Nothing else was checked against the game.

## Unread material

- `task.md` lines 46, 49, 101-105, 194-195, 205: read only as the handoff copies them word for word; the file itself was not opened.
- `.the-way/task-cycle/change/ui_check.md`: not read. The change alters no screen (comments only), so the method's condition for it does not apply.
- `.the-way/task-cycle/change/fix.md` and `project-level/technology/reserved_choices.md`: not read; not needed for a slice with no reserved choice.
- `guidelines/testing.md`: not read; no test was written or changed.
- `foundations/part_map.md`, the glossary: not read; not named by the handoff's *Read* for this slice.
- `foundations/decisions.md` D-421 (4588-4602), D-47 (4795-4809), D-316 (10846-10970), D-322 (11187-11253): read in full through the ranges.
- `foundations/invariants.md` 458-477: read in full.
- `guidelines/coding.md` and `guidelines/styleguide-browser-view.md`: read whole. `src/browser/AGENTS.md`: read whole.
- `src/browser/styles.css`, `run-screen.css`, `maps-screen.css`, `knowledge-screen.css`, `program-panel.css`, `programs-screen.css`: read whole before editing.
- The two invariant test files (`test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`): read in part (their docstrings and checks), to see whether comments count; they state that comments are left out.

## Searches not found or unclear

- `grayscale(1) brightness(0.55)` in `src/browser/styles.css`: not found. The task names that file; the value is in `run-screen.css` only.
- `above` in the head comment of `styles.css` referring to the grey rule: none.

## Reaches beyond the handoff

- `a note in the author's private notes` and `...\rules\git.md`: read because a hook blocked my first Bash call and my first commit until I had read them. Both were read before the commands ran.
- The two invariant test files: read for the rule on comments (see above).
- `CLAUDE.md`, `AGENTS.md` of the worktree and of `.the-way`: read as shown in the session context.

## Working copies

- Directory `.runs/slice-21/` (inside the worktree's ignored `.runs/`, in the handoff's directory for working copies). It held: a before-copy of the six stylesheets (`before/`), the check logs, the prettier logs, the two comment-stripped hash lists, and the run script attempt (never created, blocked by the hook).
- State at the end: the directory was removed. The logs worth keeping were copied to `.runs/task-cycles/drobne-bledy-ekranow/reports/` under the names `slice-21-*` (listed above). The before-copy of the stylesheets was not kept: it is recoverable from commit `cf068a01`.
- No git worktree was created, so no `git worktree remove` or `prune` was needed.
- Removal failures: none.
