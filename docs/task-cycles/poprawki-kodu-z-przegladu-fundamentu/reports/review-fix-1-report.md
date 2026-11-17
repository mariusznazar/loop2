PASS e384f7934ac3735171ce79d604a2740b5f8f6b46

# Review of fix 1 — findings I-1, I-2, M-1, M-2

Range `1d8caf1710408bd57940048892bd9c19fc75640b..e384f793` (one commit, `e384f793`); `git rev-parse HEAD` is `e384f7934ac3735171ce79d604a2740b5f8f6b46`. The fix touches `foundations/glossary.md`, `tests/invariants/test_player_map_run_pace.py` and `tests/view/game-saver.test.mjs`. Read: `reports/fix-1-findings.md`, `reports/fix-1-report.md`, the fix diff, `.the-way/task-cycle/review/fix.md`, and the glossary template rules already read in the review of the whole change (`.the-way/elements/glossary/template.md`).

Counts: blocking 0 remaining; Minor 1 new in the fix diff; out of scope 1 note.

## The findings

### I-1 — fixed

`foundations/glossary.md:93-97` now holds the entry `## at the camp`: "A character is at the camp when it is in no manual map run, going, paused or ended and waiting for „Restart” or „Zakończ”, and in no earning loop." The headword is the words D-389, the code and the task's row write in running text (`git grep -w 'at the camp'` at the head: D-389 lines 9729-9731 and 9748, `camp-picture.ts:25,60,62,68`, `camp.tsx:4,70`, `headquarters.tsx:4`, `scene.ts:310`, the camp-picture and scene-picture tests). Every one of those uses reads true under the definition. The definition is one sentence and says what row 2 (`task.md:92`) says, the „Siedziba” half of the row being carried by the *Not* of `headquarters`. Its *Not* separates the picture band from the place, which was the misreading I-1 named. The fix withdraws the author's earlier choice explicitly (`fix-1-report.md:16`). `foundation_check.py` passes (no term held twice).

### I-2 — fixed

`foundations/glossary.md:91`: the *Not* of `headquarters` is now "the place where a character stands — at the camp". It names the meaning and gives as its carrier the term of another entry, as the template's form asks, and no longer restates the place. The qualifier stands once, in the definition of `at the camp`, the same as D-389's (`decisions.md:9731-9732`).

### M-1 — fixed

`tests/invariants/test_player_map_run_pace.py:13-21` now names the two other recorded fields, `completion` not null and `death` not null (the driver's `completed` and `dead`, lines 328-329 of the file), and says "the discovery and death scenarios alone start from the new game `newGame()` gives". That matches `BARE_START` in the three death cases.

### M-2 — fixed

`tests/view/game-saver.test.mjs:956`: the comment is now "„Wyloguj” works again: the next save before logout is a request of its own.". That is what lines 957-961 assert. The 5-second-only half of M-2 was coverage, not a gap, and needed no change.

## What the fix diff itself brings

### N-1 — Minor, within the fix

`foundations/glossary.md:97`, first item of the new *Not*: "the screen Siedziba — headquarters". The template has *Not* name "each meaning the word carried in the files git tracks" (`template.md:88-94`). The words "at the camp" never meant the screen. The old confusion ran the other way: „Siedziba” carried the place, and the *Not* of `headquarters` now records that. So the item records a meaning the term never had. It misleads no reader, because it points the screen to its own entry. Fix if wanted: drop the item, leaving the band alone in the *Not*.

## Out-of-scope note

- The picture band is still called "the camp" in the prose: D-389's heading and its first sentence, "a camp with none shows the fire and the chest alone", and `camp.tsx:2`. The new *Not* gives `campDrawing` as what carries that meaning, which holds in code but not in prose. With the entry in place, "the camp" (the band) and "at the camp" (the place) are told apart. Whether the band's word must still be renamed under the template's rule on a word with two meanings (WAY-99, the human choosing) is a question for the human, outside the fix's findings. It does not reopen the review.

## Checks

| Check | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (worktree at `e384f793`) | exit 0 |
| `npx prettier --check tests/view/game-saver.test.mjs` | exit 0 |
| `npx eslint tests/view/game-saver.test.mjs` | exit 0 |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/invariants/test_player_map_run_pace.py` | exit 0 |
| Manual: `git grep -n -I -w -E 'at the camp' HEAD`, each use read against the new definition | all uses consistent |

Not re-run: the two test files. The fix changed only a comment and a docstring there, and both ran green at `1d8caf17` in the review of the whole change; the fix report gives exit 0 for both at the new head. Also not run: the full gate and `check_instructions.py`.

## Reaches beyond the dispatch

None beyond the glossary template already read in the review of the whole change.

## Working copies

None made; `.runs/review-fix-1/` was not needed. `git status --short` of the worktree is empty.

## Unread material

none (the findings file, the fix report and the fix diff read whole; `fix.md` read whole).

## Searches not found or unclear

- The line numbers the findings file cites for M-2 (`game-saver.test.mjs:616-617`, `:582-588`) count from the start of the diff hunk, not the file; the places are at 956-957 and about 940 of the file, as the fix report says. My mistake in the original report, with no effect on the finding.
