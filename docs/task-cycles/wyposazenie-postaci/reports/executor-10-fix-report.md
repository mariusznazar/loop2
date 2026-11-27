done

# Executor-10 fix report — the blocking finding of the review of Slice 10

## Commit

- `90ff1100` on `task/wyposazenie-postaci` (fix range from `8f896859`): `tests/view/judging-cache-gear.test.mjs` only (3 lines: the import).

## Finding

- Important 1 (the new test file imports `node:assert/strict` beside the jsdom harness) — fixed, not contested. The file's first import is now `import { assert, inAct, press, withPage } from "./page-document.mjs";`, the import of `node:assert/strict` and the later import of the harness are gone, as `tests/view/maps-record.test.mjs:10` does. The file uses only `equal`, `notEqual`, `deepEqual` and `ok`, which the harness's `assert` has (`tests/view/page-document.mjs:217-`); its `deepEqual` takes plain data, and every comparison of the file is of plain data, so nothing changed in what they assert. I read `guidelines/testing.md` section "Tests on a document imitation" (lines 326-342) and `foundations/invariants.md:1198-1206` before the edit.
- Minor findings: none in the file; not touched.

## Checks (command, exit code)

- `npm test -- tests/view/memory-limit.test.mjs` exit 0 (it failed on `8f896859`, per the review).
- `npm test -- tests/view/judging-cache-gear.test.mjs` exit 0.
- `npm test -- tests/view/judging-cache.test.mjs` exit 0.
- `npm test -- tests/view/judging-cache-record.test.mjs` exit 0.
- `npm test -- tests/view/judging-cache-page.test.mjs` exit 0.
- `npm test -- tests/view/maps-record.test.mjs` exit 0.
- `npm test -- tests/view/maps-screen.test.mjs` exit 0.
- `npm run typecheck` exit 0.
- `npx prettier --check` and `npx eslint` on the file: clean.
- `python -B .the-way/elements/common/foundation_check.py`: the same 2 errors as before (`tests/view/character-screen.test.mjs:134` and `:400`), not mine.
- Not run: the full suite (the cycle's run).

## Own-work check

- Requirement most likely unmet: invariant `document-test-memory-limit` for every file the slice made or changed. Check: the gate's own test `tests/view/memory-limit.test.mjs` (it walks the tree for files that go round the harness) passes. The other test files of the slice (`judging-cache.test.mjs`, `judging-cache-record.test.mjs`) load no jsdom harness, so the invariant does not bind them; I did not change that.
- The finding was in a test I had not run because it stood outside the slice's *Checks*; I now run it with the focused checks.

## Reach beyond the dispatch

- none beyond what the findings file and the coordinator's message name (`guidelines/testing.md` section, the invariant, `tests/view/page-document.mjs`'s `assert`).

## Working copies

- none made.

## Unread material

- none: the findings file, `fix.md`, the section of `guidelines/testing.md` and the invariant were read whole; `tests/view/page-document.mjs` in the lines of its `assert`.

## Searches not found or unclear

- none.
