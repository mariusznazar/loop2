Status: done

# Report of the executor of slice 2 — the records of the test of the screen Mapy hold the fingerprint

## Commits

- `ef7196d9` — `test: :white_check_mark: have the records the test of the screen Mapy builds by hand hold the fingerprint of the program's content, as the judging record now takes it, so every case of the badge, the count and the note keeps its expectation (D-441, D-442)`

Base was `0a41bd058c99181fb05b8e49ecfa5a7b01e9e8ab`. The worktree is clean after the commit.

## Files changed

- `tests/view/maps-screen.test.mjs`: +2 / -0.
  - An import of `contentFingerprint` from `../../dist/browser/sim/judging-record.js`.
  - In the helper `recordIn` (line 139 onward), one field `contentFingerprint: contentFingerprint(saved.program)`, placed after `contentRevision`.
  - No expectation, assertion, test or other line changed.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Focused test (slice's check) | `npm test -- tests/view/maps-screen.test.mjs` | 0 | 50 pass, 0 fail |
| Prettier | `npx prettier --check tests/view/maps-screen.test.mjs` | 0 | formatted |
| ESLint | `npx eslint tests/view/maps-screen.test.mjs` | 0 | clean |
| Typecheck (project script) | `npm run typecheck` | 0 | `node scripts/build.mjs --check` passed |
| Size rule D-425 | `node tests/quality/eslint-size-rules.mjs` | 0 | "0 functions and files over a threshold in 338 files" |

Logs stay in `.runs/executor-2/`: `test-run.log`, `typecheck.log`, `size.log`.

Not run: the full gate (`npm test` with no argument, or a folder run of the tests). The handoff forbids it for this slice.

Test written first: none. This is a helper change, with no new test. Its failure was checked by a mutation instead (see below).

## Own-work check

- Requirement (the slice's Goal): the helper must give the record the fingerprint `recordOfJudging` takes, so every case of the badge, the count and the note stands as before, and no expectation of the file changes.
- Check 1: the focused test file after the change, with all 50 cases. Result: 50 pass, exit 0.
- Check 2 (mutation): I removed the new field from the helper, so the record has no fingerprint, and ran the file. Result: exit 1, 44 pass, 6 fail. The six failures are the cases that read a remembered judging, which is the expected reason (`markOfRecord` returns null without the fingerprint, so the badge is missing). The names are in `.runs/executor-2/mutant-run.log`.
- After the mutation I restored the committed file with `git checkout -- tests/view/maps-screen.test.mjs`, reran it, and got exit 0, 50 pass. The worktree was clean afterwards.
- Behaviour a user sees: none. This is a test-only change, so no walkthrough of `walkthrough.md` applies, and no screenshot or `ui_check.md` step applies.

## Reaches beyond the handoff

- I read `.the-way/task-cycle/change/SKILL.md` whole, `slice.md` whole, the handoff whole, `src/browser/sim/judging-record.ts` whole, and `src/browser/AGENTS.md` whole.
- `guidelines/coding.md` and `guidelines/coding-browser-module.md` I read whole.
- `guidelines/testing.md` I read lines 1–207 of 510 (see Unread material).
- `guidelines/styleguide-browser-view.md` I read lines 1–601 of 1217.
- I searched for usages of `recordIn`, `recordOfJudging` and `contentFingerprint` with Grep. This went to `tests/sim/judging-record.test.mjs`, `src/browser/sim/judging.ts` and `src/browser/view/judging-cache.ts`, not into their contents. Reason: to confirm that the helper is the only hand-built record in the file and that nothing else in the file needs the field.
- The git commit hook (`rules-on-demand`) blocked my first commit call once, showing the git rules, and did not run it. I read the rules and repeated the same commit, English message, add by path. The commit content did not change.

## Unread material

- `guidelines/testing.md`: lines 208–510 not read.
- `guidelines/styleguide-browser-view.md`: lines 602–1217 not read.
- `tests/view/maps-screen.test.mjs`: lines 1138–2433 not read. I read 1–1137 and grepped the rest for `recordIn`, `recordOfJudging` and `contentFingerprint`. The helper's uses are at lines 1276, 1288, 1297, 1318, 1374, 1644, 1676 and 1733 (all after my edit's line shift).
- Foundation entries D-441 and D-442, and the other entries the plan names for this slice: not read. The slice's `Read` list does not name them, and the handoff says to read the foundation entries the plan names only as far as the slice needs them.
- `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`: not read. The slice alters no user interface, and no user-visible behaviour changes.

## Searches not found or unclear

- The handoff says "the typecheck" without a command. My first try was `npx tsc --noEmit -p .`, which failed with TS5081 (no `tsconfig.json` in the root). The project's own typecheck is `npm run typecheck` (`node scripts/build.mjs --check`), and that is the check I ran, with exit 0. The mismatch is worth noting for the handoff template: a typecheck command for this repository should name the project script.
- I first tried to write a log into `.runs/executor-2/` before creating it. The directory did not exist, so I created it with `mkdir -p`.

## Working copies

- No worktree, clone or copy was made. The only files I made are the check logs in `.runs/executor-2/` (`test-run.log`, `typecheck.log`, `tsc.log` from the failed `tsc` attempt, `size.log`, `mutant-run.log`, `restored-run.log`). They are outputs of my checks, not copies, and they stay in the ignored `.runs/` of the worktree.
- Removed: none needed. Nothing remains to remove.

## Problems observed

- None in this slice. The file passes in full, and nothing in it needed a change by a later slice.
