# Slice 6 — executor report

**Status:** `done`

**Commit:** `6a9283c4` on `task/programy-ze-starych-zapisow` (base `19ea8b1c`), message `feat: :sparkles: read the programs of a previous save one by one and append them with numbered names`. Single commit; the slice's changes were staged by explicit path.

**Check line:** every named slice check is green on the committed tree (`previous-programs` 15/15, `program-list` 33/33, `saved-game` 37/37, `test_mutation_test_selection`, `test_simulation_isolation` 5/5, `test_simulation_inputs` 2/2, `npm run typecheck`, `foundation_check.py` exit 0 with 0 errors). Not run: the product's full gate (`npm test` without a file), and the StrykerJS run on the two changed simulation files (the handoff leaves it to the review).

## Files changed

| File | Lines | Note |
|---|---|---|
| `src/browser/sim/previous-programs.ts` | +116 (new) | the reader |
| `src/browser/sim/programs.ts` | +38 | `freeName` (private) and `appendPrograms` |
| `tests/sim/previous-programs.test.mjs` | +513 (new) | 15 tests |
| `tests/sim/program-list.test.mjs` | +87 | `appendPrograms` import and 8 tests at the end |
| `stryker.config.json` | +1 | `tests/sim/previous-programs.test.mjs` after `map-card` |
| `guidelines/coding-simulation-module.md` | +1 | row `src/browser/sim/previous-programs.ts`, copy |
| `guidelines/testing.md` | +2 −1 | the invariant `previous-save-programs-reader` added to the *Trust boundaries* invariant line; new row for the reader with the test titles |

Total of the commit: 7 files, +758 −1.

## What was built

- `readPreviousPrograms(saved: unknown)` returns `{ ok: false }` for an unreadable document, or `{ ok: true, items }`. Each item is `{ kind: "read", name, program }`, `{ kind: "skipped", name }` or `{ kind: "skipped", place }`. A document is unreadable when it is not a plain object, its `version` is not a safe integer from 1 up to `SAVED_GAME_VERSION` (imported from `saved-game.ts`), its `game` is not a plain object, its `game.programs` is not a list without holes. Items are read through own data descriptors only; an item is accepted only with exactly the keys `id`, `name`, `program`, a name that is text non-empty after trimming, and a program that `checkProgram(program, null)` accepts. Only `ProgramCheckError` skips; every other error propagates.
- `appendPrograms(state, read)` appends the given programs at the end, numbered from `nextProgramId` (which rises by the count), each name made free by D-169's rule (lowercase comparison, against the list including earlier appended names, `name (n)` for the smallest free n from 2). Returns a `GameState`; nothing else of the state changes.

## Checks run (command, exit code)

Each check was run by me on the final tree unless noted.

- `npm test -- tests/sim/previous-programs.test.mjs`: exit 1 on the first run (see failing runs below), exit 0 on the final run (15/15).
- `npm test -- tests/sim/program-list.test.mjs`: exit 0 (33/33). Before the implementation, with the stub `appendPrograms` returning the state unchanged, exit 1 at the assertion of "an append changes nothing of the game state but the programs and the counter" (programs length 3 expected 4).
- `npm test -- tests/sim/saved-game.test.mjs`: exit 0 (37/37), unchanged.
- `npm test -- tests/quality/test_mutation_test_selection.py`: exit 0.
- `npm test -- tests/invariants/test_simulation_isolation.py`: exit 1 on the first run, then exit 0 (5 tests OK). The first run flagged the local parameter name `document` as a host global; I renamed the parameter to `saved` (the one adaptation below).
- `npm test -- tests/invariants/test_simulation_inputs.py`: exit 0 (2 tests OK).
- `npm run typecheck`: exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: run twice. Before the commit, exit 1 with 2 errors: the part-map pattern `src/browser/sim/previous-programs.ts` matched no tracked file (the expected error), and `previous-save-programs-reader` was cited by no tracked file because the test file was not yet tracked. After the commit, exit 0, `0 errors`.

Failing runs, as the method asks (both runs recorded):

- Reader tests against the stub `readPreviousPrograms` (returns `{ ok: false }`): exit 1; the readable-document tests fail at their assertions (`actual: { ok: false }`, `expected: { ok: true, items: [...] }`).
- Reader test "nothing of the document beside its version, its game's programs and the items' name and program is read", first implementation: exit 1, because my own test asserted a read that the descriptor-based reader does not make. Fixed the test to log descriptor reads too and to assert that every read lies in the allowed set. Second run: exit 0.
- Isolation check on the first implementation: exit 1 (`previous-programs.ts names the host global document`). Fixed by the rename; rerun exit 0.

## Own-work check (section 3)

- Requirement most likely unmet: an appended name is numbered without regard to letter case, and a pulled name that already ends in `(2)` gets another `(2)`; and a pulled program's trimmed name is the one appended. Check: the append tests "a pulled name is taken regardless of letter case…" (`las`, `NOC`, `Noc (2)`) and "…a name ending in (2) gets another (2)" (`Las (2) (2)`), and the reader test "the name read is trimmed". Result: all green, on the final tree.
- Deliberate breaks, to see the invariant tests fail (the stub did not show the unreadable and no-throw tests failing, so I did this): in the worktree I (a) made the version bound `SAVED_GAME_VERSION + 1` and (b) made `hasExactKeys` always true. Command `npm test -- tests/sim/previous-programs.test.mjs`: exit 1, 3 tests failed: "a document of another version or with no whole version is unreadable" (save-version), "an item with a key besides id, name and program is skipped…" and "an item missing a key is skipped…" (previous-save-programs-reader). Restored; the file is byte-identical to the committed one (`cmp`); rerun exit 0. A first attempt with `if (false)` did not compile (TypeScript narrowing), so it tested nothing; a second with `&& false` also did not compile; the third used a type-safe mutation.

## Choices made

1. **Reader output shape.** A union with `kind` ("read" or "skipped"), where a skipped item carries `name` or, when it has no text name, `place`. Rejected: a flat `{ name, program | null }`, which hides whether the name or the place names the item. Cost if wrong: the page switches on `kind`; small.
2. **Skipped names are trimmed**, the same as accepted names. The spec says "its name where that is a non-empty text", which does not say whether the name is shown as given. Rejected: showing the name as given. Cost: only whitespace differs, which is not visible in the sentence the page will write.
3. **Own data read by descriptor, not by property access.** Rejected: plain property access, which would run getters and read prototype keys. Cost: none for JSON documents.
4. **`appendPrograms` returns a `GameState`**, as the spec's wording says, while the other list functions in `programs.ts` return `GameResult`. Cost: a caller that wants events must wrap it.
5. **`appendPrograms` takes `{ name, program }[]`, not the reader's `PreviousItem` type.** The caller filters `kind === "read"`. Rejected: importing the reader's type into `programs.ts`, which would make `programs.ts` depend on the reader file. Cost: a structural duplicate of two fields.
6. **Trust-boundary invariant line.** I added `previous-save-programs-reader` to the *Invariant* line of *Trust boundaries* in `guidelines/testing.md`, beside `previous-save-slot`. The handoff named the row, not this line; without it the table lists the invariant nowhere. Cost if wrong: one word, easy to remove.
7. **Extra hostile value** in the sweep: `JSON.parse('{"__proto__":{"kind":"always"}}')`, beyond the list the handoff names from `saved-game.test.mjs`.

## Adaptations of section 4

- The reader's parameter is named `saved`, not `document`: the isolation check flags a local name that matches a browser global. Small mismatch, adapted in one line.
- The foundation check showed 2 errors before the commit, not the one the handoff expected: the second error (the invariant with no citing test) comes from the test file being untracked. It cleared on commit; nothing in the plan changed.

## Reach beyond the handoff

- `.the-way/task-cycle/change/slice.md`: read whole (named by the method).
- `guidelines/coding-simulation-module.md` and `guidelines/testing.md`: read whole (the plan changes both; `testing.md` in two pages).
- `src/browser/sim/programs.ts`: read whole (the handoff named `checkProgram` and the editor's call; I read the file to change it).
- `src/browser/sim/saved-game.ts` lines 119–278 and 470–505: helper functions read for the reader's pattern (`own`, `fields`, `list`, `programList`). Not changed.
- `tests/sim/saved-game.test.mjs` lines 1–70 and 2170–2192: the handoff gives 28–62 and 2195–2275; I read the surrounding lines for the hostile values.
- `tests/quality/test_mutation_test_selection.py`: read whole (the check that the new file is listed in `stryker.config.json`).
- `tests/invariants/test_simulation_isolation.py` lines 1–150 and `tests/invariants/test_simulation_inputs.py` lines 1–80: read to see what the two checks scan.
- Foundation entries: D-206 (3978–4021), D-167 (3337–3351), D-169 (3367–3381), D-393 (9635–9649), D-395 (9665–9679), invariant `previous-save-programs-reader` (1338–1347), glossary `previous save` (254–259), part map `simulation` (30–61).
- `src/browser/sim/types.ts` lines for `SavedProgram`, `ProgramNameCheck`: grep only.

## Unread material

- `tests/sim/program-list.test.mjs`: the file I changed. Read in part before the append: lines 1–128, 328–340 and the last five lines. Lines 129–327 and 341–412 were not read; the file passes its checks in full (33/33) after the change, so no existing test conflicts.
- Foundation entry `save-version`, `foundations/invariants.md:1028-1037` (E13): not opened; I used the guideline's quotation of it in `coding-saved-game.md`.
- Foundation entries not opened: D-164, D-165, D-210, D-213, D-386 (the handoff's Read list); glossary `program` (25–31) and `trip plan` (199–204); invariants `saved-program-edit` (838–847) and `copy-save` (848–857); the `account-server` part-map entry (E23, not changed by this slice).
- Spec and task: the passages in the handoff were used as copied there; `task.md`, `spec.md` and `plan.md` were not opened.
- `src/browser/sim/saved-game.ts` lines 1–59 and 280–469 and 506 onward: not read (not changed; the reader imports only its `SAVED_GAME_VERSION`).

## Searches not found or unclear

- The shape of a skipped name (as given or trimmed) is unclear in the spec; choice 2.
- The glossary term and the invariant `save-version` text were not opened (see Unread material).
- No match was found for a local helper named `hasExactKeys` or `listWithoutHoles` in the repo; they are new, private to the reader.
- No other unclear points arose.

## Questions

None. Every choice is recorded above with its rejected way and its cost.

## Problems observed

- The foundation check treats an untracked test file as uncited (see Checks). Evidence: the pre-commit run above.
- The rules-on-demand hook blocked my first Bash call of a script and my first `git commit`; both were retried after reading the rules file, and nothing ran in the blocked calls.
