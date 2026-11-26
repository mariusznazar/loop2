done

# Report — fix-ci: the red result of the final gate (CI) of the task `wyposazenie-postaci`

## Commit

`1cd18ec9f0d343f56b2a9cc4a223cfcbbec02d00` on `task/wyposazenie-postaci` (on top of `c5e7355c`): `tests/view/gear-rule-panel.test.mjs`, 1 line added, 1 removed.

## What I did

Removed the unused import `press` from line 5 of `tests/view/gear-rule-panel.test.mjs` (`import { assert, inAct, withPage } from "./page-document.mjs";`). A search of the file for `press` showed only the import and the words `aria-pressed` / "presses a key"; no case calls it. No assertion, case or other file changed.

## Checks (focused, not the gate; `npm test` not run)

| Check | Command (from the worktree root) | Exit |
|---|---|---|
| ESLint as `test_eslint_source_rules` runs it, with an empty suppressions file of its own | `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <empty {} file> .` | 0, no output (0 problems) |
| The test file | `node --test tests/view/gear-rule-panel.test.mjs` | 0, 4 of 4 pass (it reads the existing `dist/`, which stands in the worktree) |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0, "0 error, 0 warn, 121 info" |

The ESLint failure before the fix is the one CI reported (the handoff's quoted output); I did not rerun the failing state. Nothing else was reported by any check, so no other fault was found or fixed.

Not run: the rest of the one command (`npm test`: node tests, `tests/deploy`, `tests/invariants`, the Python quality tests other than the ESLint one, Ruff, ShellCheck, shfmt, Prettier). They passed in CI at the head before this change or were not reached there (the quality stage stopped the run); I did not run them here, as the handoff forbids the gate. In particular the Prettier format check of the changed line was not run separately; removing a name from an import list that fits one line leaves a layout Prettier keeps.

## Own-work check

Requirement most likely not met: the fix must remove only the unused import and leave the test's cases and assertions as they were, and ESLint must be clean over the whole repository. Check: `git diff --stat` before the commit showed one file, 1 insertion and 1 deletion, the import line; ESLint over the repository exited 0; the four cases of the file still pass. Shown: met.

## Reach beyond the dispatch

None. I read `fix.md` as `SKILL.md` section 1 names it for this variant, `guidelines/coding.md` whole, and `guidelines/testing.md` lines 1-199 (the section "Changing an existing test" is there; removing an unused import changes no expectation).

## Unread material

- `guidelines/testing.md`: read lines 1-199 of 510; the rest (after the trust-boundary table) not read, as it holds nothing on changing an existing test beyond the section read.
- `.the-way/task-cycle/change/SKILL.md` and `fix.md`: read whole. `ui_check.md` and `walkthrough.md` not read: the change alters no screen and no behaviour, and the fix reads no walk (WAY-406).

## Searches not found or unclear

none

## Working copies

I made `.runs/fix-ci/` in the worktree and put one file in it, the empty `eslint-suppressions.json` for the ESLint run; I removed the directory after the checks (path `.runs/fix-ci`, not present now). One stray `.runs/` directory I made by mistake under `docs/task-cycles/wyposazenie-postaci/` (the shell stood there at the first call) held the same file; I removed it too. No remainder. The files that the product's tests and tools make themselves were not touched.
