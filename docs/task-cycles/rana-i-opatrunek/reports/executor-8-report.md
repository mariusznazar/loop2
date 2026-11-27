# Report of the executor of Slice 8 — the values of the numerical branches on the screen Postać

**Status:** done with concerns. The code and the tests are done and committed. The walk of `walkthrough.md` and the screenshot of `ui_check.md` were not performed (see "Concerns").

## Commits (branch `task/rana-i-opatrunek`, base `82da905e5b0c5a6b5edf057ae961f78ffe64b6f1`)

- `765cc552` test: the new cases in `tests/view/character-skills.test.mjs`, written first (red on the base).
- `8829f36f` fix: `branchText` writes the numerical preview values with a decimal comma and without the computer's rounding, in `src/browser/view/character-skills.ts`.

Files changed over the range (`git diff --stat 82da905e..HEAD`):

- `src/browser/view/character-skills.ts`: 9 insertions, 1 deletion (a new private helper `previewNumber`, and the preview's value wrapped in it).
- `tests/view/character-skills.test.mjs`: 98 insertions, 0 deletions (three new `test(...)` cases).

## Checks (each as its command and exit code)

- `npm test -- tests/view/character-skills.test.mjs`
  - Red, before the code change (after the test commit, with the new cases and no fix): exit 1. The failing assertion is the first one of the `quickHealing` case: actual `teraz 0.05 zdrowia na minutę → po kupnie 0.1 zdrowia na minutę · cena 2`, expected `… teraz 0,05 … → po kupnie 0,1 …`. The assertions of `strongerRoll` and `deftHand` of the same test, and the whole third test, passed on the base; the test stops at its first failing assertion, so the later `quickHealing` ranks and `Ucisk` were not reached in that run.
  - Green, after the fix, and again after Prettier: exit 0.
- `npm test -- tests/view/character-screen.test.mjs`: exit 0.
- `npm test -- tests/view/knowledge-screen.test.mjs`: exit 0.
- `npm run typecheck`: exit 0 (the script runs `node scripts/build.mjs --check`).
- `npx prettier --check` on both changed files: exit 0 after one `--write` on the test file.
- Not run: the whole suite (`npm test` with no file), as the handoff forbids. The foundation check and the instruction check were not run.

## The new cases and what each catches

1. `the four branches of „Opatrywanie małych ran” read their words, values and prices at each rank`. It pins „Mocniejszy zwój” (ranks 0 to 3: 25, 30, 35, 40 zdrowia), „Wprawna dłoń” (10, 8, 6, 4 min), „Szybkie gojenie” (0,05 → 0,1 → 0,15 zdrowia na minutę, prices 2, 3) and „Ucisk” (price 3, no before-and-after value, description from the data). The literal values were worked out by hand from the data in `src/browser/sim/data/skills.ts` and D-379. The break it catches: the rounding artefact (`0.15000000000000002`), a comma missing, a wrong price, or a before-and-after value shown for „Ucisk”.
2. `the numerical branches of the other trees read as they do today`. It pins „Wprawne oko”, „Pełna garść”, „Oszczędne dorzucanie”, „Zwinny odskok” and „Szybki posiłek” with their current words and values. It passed on the base and still passes; it guards the change against moving the formatting onto other values.
3. The existing tests of the file are untouched.

## Own-work check (the requirement and what it showed)

- Requirement: the numerical values of the four branches read with a decimal comma and no computer rounding, and „Ucisk” shows its price only.
- Check: the exact-string cases above, including the 0,15 rank, and a reading of the change against a possible mutation: dropping `toFixed(6)` gives `0.15000000000000002` again; dropping `.replace(".", ",")` gives `0.05`. Both are caught by the `quickHealing` assertions.
- Result: the red run showed the defect; the green run passes. No check failed and then passed on a rerun.
- `Ucisk` needed no code change: the data give it no `preview`, so `branchText` already writes only its price. The new case pins that.

## Choices

- Chose a private helper `previewNumber` in `character-skills.ts`, over exporting the existing `plain` of `src/browser/view/body-row.ts`. Rejected: exporting from `body-row.ts`, because that file lies outside this slice's *Change*. Cost if wrong: the same two-line rule now lives in two files, and a change of one must be made in the other too.
- The rounding is six decimals, as the body row's `plain` uses; the handoff's example values need no more.

## Concerns

- **Walk and screenshot not performed.** The change alters text the player sees on the screen Postać, so `ui_check.md` and `walkthrough.md` apply, and the foundation does settle a route (the skill `.claude/skills/loop2-play/SKILL.md`). I did not start the game or open a browser, and I did not read that skill. The verdict therefore rests on the exact-string tests, which read the same function the screen calls (`branchText`, read by `src/browser/view/character-trees.tsx`). The orchestrator should decide whether a browser check of the screen Postać is run before the cycle's run; the check would show the words on a character with bought „Szybkie gojenie” ranks.
- Because the red run stopped at the first failing assertion, the later assertions of the new cases were confirmed green only in the post-fix run.

## Reaches beyond the dispatch (section 1)

- `grep` over `src/browser` for `toFixed` and `replace(".", ",")` to find the existing decimal-comma helper (`src/browser/view/body-row.ts`, lines 22, 240); read only its doc comment and the function body.
- `grep` over `tests` for the names of the branches, to see which tests already cover them (results only; `tests/sim/body.test.mjs` and `tests/sim/craft-and-tend.test.mjs` were not opened).
- `.ai/rules/git.md` (the user's global rule for commits, read when a hook asked for it before the first commit).

## Unread material

- `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/change/ui_check.md`'s screenshot route: not read in full because no browser walk was performed (see Concerns). `ui_check.md` and `walkthrough.md` were read whole.
- Everything else the handoff names was read whole: `task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`, `walkthrough.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (in four pages), `src/browser/AGENTS.md`, `src/browser/sim/data/skills.ts`, `src/browser/view/character-trees.tsx`, `src/browser/view/character-skills.ts`, `tests/view/character-skills.test.mjs`, D-199 (`foundations/decisions.md:7458-7490`), D-379 (`foundations/decisions.md:7577-7612`) and `foundations/part_map.md:3-33`.

## Searches not found or unclear

- None that changed the work. The styleguide's sentence on the decimal comma is in the rule "Program editor" (its line "Liczba z ułamkiem w zdaniu reguły stoi z przecinkiem dziesiętnym", decision D-57); it is not a foundation entry of the slice's *Read* list, so the new code does not cite it.

## Working copies

- The directory `.runs/executor-8/` (run logs and one copy of the test file before Prettier) was made for this slice and is removed. The worktree is clean after the two commits.
