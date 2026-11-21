PASS aaef0873

# Review rc13 — slice 3 of correction 1, task `ocena-programu-na-ziarnach`

- Range: `bc386205..aaef0873` (one commit, `aaef0873`); `git rev-parse aaef0873` = `aaef0873a43bc17b178d443ab8070dd20de77178`, the head given; `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, the pinned commit.
- Files: `src/browser/sim/previous-programs.ts`, `tests/sim/previous-programs.test.mjs`, `tests/view/previous-save.test.mjs`, `guidelines/testing.md` — equal to the slice's *Change*.
- Kind: a slice of a correction made for the human's remarks (method `review-change`, `fix.md`).

## Findings

### Critical

none

### Important

none

### Minor

1. **The pull of a version-9 item at revision 0 is proven in two halves, never end to end** —
   `tests/sim/previous-programs.test.mjs:310` (the reader's result for a version-9 item holding
   any revision is `{ kind, name, program }`, no revision) and `tests/sim/content-revision.test.mjs:167`
   (`appendPrograms` given items with no revision makes them revision 0). Spec Decision 10 and the
   plan word this case as „a version-9 document's programs read with their revision key and pulled
   at revision 0”, and D-442's *complies* names „a program pulled from a previous save whose item
   held 7, starting at 0”. No test feeds a version-9 item holding a non-zero revision through the
   reader into `appendPrograms`. Today it cannot go wrong: `PreviousItem` has no revision field and
   `appendPrograms` writes `contentRevision: 0` explicitly (`src/browser/sim/programs.ts:525`); my
   probe (below) composed the two on an item holding 7 and got 0. A later change would have to break
   both sides together to slip through. Broader coverage that would be nice, not a defect.

## Remarks of the correction

- **Remark 4 (binding) — made.** The case formerly titled „a document of each version from 1 to 9,
  the current one included, …” is now „a document of each readable version, the current one
  included, gives its programs in order, a program without a trip plan skipped and named”
  (`tests/sim/previous-programs.test.mjs:134`), and the row of `src/browser/sim/previous-programs.ts`
  in `guidelines/testing.md:177` names it by exactly that title (it named „from 1 to 5”, already
  stale at the base). Every one of the fourteen case titles in the row matches a `test(` title of the
  file character for character (compared against the file's list of `test("…"` lines). What the case
  checks stays: versions 1–8 with three-key items, version 9 with four-key items, the same expected
  results, and the precondition `SAVED_GAME_VERSION === 9` that forces the table's revision at the
  next raise. The two new titles name „version 9” and „from 1 to 8”: these name the version at which
  the item's shape changed (D-401, D-442), a fixed fact that stays true after a raise, not the highest
  version, so they do not go stale in the sense of the remark. No test reads the guideline's case
  titles: `tests/` holds only two mentions of `guidelines/testing.md` (`tests/flaky-tests.md:6`,
  `tests/invariants/test_terrain_drawing_numbers.py:24`), neither of which reads the row;
  `tests/agent_workflow/` and `tests/invariants/` hold no reader of it.
- Remarks 1, 2, 3, 5 are not of this slice.

## Review against the sources

- **D-401 (changed), invariant `previous-save-programs-reader` (changed), D-442, spec Decision 6 (S1)
  and 11.1:** `readItem` takes the document's version and demands exactly `id`, `name`, `program`,
  `contentRevision` from version 9 (`FIRST_VERSION_WITH_REVISION`), exactly the first three below it
  (`src/browser/sim/previous-programs.ts:68-102`). The values of `id` and `contentRevision` are never
  read (`ownData` is called on `name` and `program` alone); the result carries no revision. The key
  name `contentRevision` is the one the save writes and the strict load reads
  (`src/browser/sim/saved-game.ts:490`, `src/browser/sim/types.ts:100`). The code says what the entries
  say; nothing more broadly or without a qualification.
- **`decision:` lines:** the five lines of `tests/sim/previous-programs.test.mjs` that quote D-401's key
  sentence (`:135`, `:268`, `:337`, `:429`, `:477` — the base's three plus two in new or changed cases)
  and the one of `tests/view/previous-save.test.mjs:485` quote it word for word from the sentence's
  beginning; the new lines quote D-401's second paragraph and the start of D-442's first sentence
  word for word. No line anywhere in the tests still quotes the old wording („keys are exactly `id`,
  `name` and `program`”: no match; positive control: „exactly `id`” matches 6 lines in the two
  files). The foundation check names none of the range's files. Nothing else of
  `tests/view/previous-save.test.mjs` changed.
- **Changed invariant tests** (`invariant: previous-save-programs-reader`):
  „an item with a key besides those of the items of its version is skipped and named, and the others
  go on” (renamed from „… besides id, name and program …”, a version-9 half added; the version-5 half
  kept as it was), the two new cases at `:310` and `:336`, and „nothing of the document beside its
  version, its game's programs and the items' name and program is read” (`:795`), whose document moved
  from version 5 to version 9 with items holding `contentRevision` so that a read of the revision
  would show; the version-5 path of that case is no longer watched, which loses nothing, since the key
  list is the one place the path depends on the version and the reads are the same on both. The
  `DOCUMENT` of the current version now holds `contentRevision`, so the sweep of hostile values
  (`:623`), the frozen document (`:770`) and the shared-nothing case (`:782`) run on four-key items.
  No expectation was weakened; changed expectations follow D-401's new sentence.
- **Seen failing:** with the base's `previous-programs.ts` put back in my worktree, the file failed 6
  cases (the four changed or new ones, the frozen document and shared-nothing), each on an assertion
  against a reader that wanted three keys; with the head's, all 21 pass.
- **Guidelines:** `guidelines/coding.md` (Linter, Formatter, Size of a function and a file: checked
  below), `guidelines/coding-simulation-module.md` (`previous-programs.ts` is of kind
  simulation-module, status copy; isolation and unchanged arguments hold — the reader imports
  simulation files only and writes nothing, `simulation-inputs` passes), `guidelines/testing.md`
  (Trust boundaries: the row and its form against `.the-way/product-guidelines/testing/template.md`
  — the row names the boundary, its invariant, the file and the cases by title, as the rule asks;
  Changing an existing test; Behaviour, not implementation — the case at `:336` asserts only which
  items are read at versions 1, 5, 8, not their whole result, which is fitting; Mutation testing: run,
  below). `src/browser/AGENTS.md` (tokens of the view) is not reached by a simulation file. The
  styleguide of `browser-view` is not needed: the range changes no file of that part except one
  comment line of a test; I agree with the orchestrator.
- **Reserved choice:** none taken.
- **Code made for a test:** none; no branch or value of the reader exists for a test's input.

## Trust boundary

`src/browser/sim/saved-game.ts`: the range does not touch it (no line of it changed).

`src/browser/sim/previous-programs.ts` (`previous-save-programs-reader`), attacked with crafted
documents through the built reader of the head, in a probe script in my directory: 43 cases, 0
deviations, none threw.

- Version 9, items with every value of the revision — `0`, `5`, `-1`, `1.5`, `2**53`,
  `Number.MAX_VALUE`, `NaN`, `Infinity`, `"7"`, `""`, `null`, `true`, `[]`, `{}`, `[1,2]`,
  `{"a":1}` — all read, the value neither read nor checked, as D-401 gives.
- Version 9, from JSON text as the server gives it: revision missing; revision plus a fifth key; an
  own `__proto__` in place of the revision, in place of `id`, and as a fifth key with an object;
  `constructor` in place of the revision; `ContentRevision` (another case); an item that is a list
  of the four key names; a program of a wrong type; a name of a wrong type — each skipped. A
  duplicated `contentRevision` key in the text collapses to one key in `JSON.parse` and is read, as
  expected.
- Earlier versions: four keys at versions 1, 3 and 8 skipped; three keys at 3 and 8 read.
- Mixed lists at version 9 (`[3 keys, 4 keys, 7, null, 5 keys]` → skipped, read, skipped, skipped,
  skipped) and at version 8 (`[3 keys, 4 keys, "s"]` → read, skipped, skipped).
- Versions: 10 unreadable; `"9"` unreadable; `8.5` unreadable; `9.0` in the text read as 9.
- Not from JSON, but values a caller could hand: an accessor `contentRevision` that throws when read
  — the item is read and the getter is never called; a symbol key in place of the revision —
  skipped; a non-enumerable own `contentRevision` — read (an own key, as `Reflect.ownKeys` counts).
- The result of a version-9 item holding 7 has exactly the keys `kind`, `name`, `program`, and
  `appendPrograms(newGame(0), …)` gives it revision 0.

## Irreversible operation

None: the change only reads a document and returns new values; it writes nothing and prepares
nothing that cannot be undone.

## The author's own-work check and report

The executor names the version-9 / below-9 boundary and crafted shapes as the weakest point; its
skip case and its read case cover it, and my mutation run confirms it: every mutant on the changed
lines (`>=` to `>` or `<`, the key list swapped, the version argument dropped) is killed. Its claims
on checks agree with what I ran. Its unread material (the guidelines not read whole) is covered by my
reading above; no rule of them is broken. The slice changes nothing a user sees beyond which items of
a crafted or version-9 previous save are read; no walk through the running product was due.

## Declined to judge

- The five Stryker survivors (below) on lines the range did not change (`:46`, `:48`, `:52`, `:61`,
  `:104`) — outside the range; I classify them anyway: `:61` is equivalent (`Number.isSafeInteger`
  implies a number); `:48` and `:52` are equivalent to each other's guard for JSON input (a hole is
  caught by either); `:46` (an array of another prototype) and `:104` (an accessor `program`) take
  inputs no JSON document can hold.
- `guidelines/testing.md` failing Prettier — the same at the base (the orchestrator's note), not of
  the range.

## Checks

All run in a detached worktree of `aaef0873` with `npm ci` (exit 0):

- `npm test -- tests/sim/previous-programs.test.mjs` — exit 0, 21 pass, 0 fail.
- The same with `src/browser/sim/previous-programs.ts` of `bc386205` — exit 1, 6 fail (listed
  above); restored to the head afterwards.
- `npm test -- tests/view/previous-save.test.mjs` — exit 0, 46 pass.
- `npm test -- tests/invariants/test_simulation_inputs.py` — exit 0, 2 tests OK.
- `npm test -- tests/quality/test_function_and_file_size.py` — exit 0.
- `npm run typecheck` — exit 0.
- `npx eslint` on the three code and test files — exit 0; `npx prettier --check` on them — exit 0.
- `python -B <cycle worktree>/.the-way/elements/common/foundation_check.py <review worktree>` (the
  pinned `.the-way` of the cycle's worktree, at `19e5774a…`, run on my worktree, whose submodule was
  not initialized) — exit 1, 8 errors, none in the range's files: seven quotations of D-440 and D-165
  in `tests/sim/judging-record.test.mjs` and `tests/sim/saved-game-judgings.test.mjs`, and
  `foundations/invariants.md:1472` `judging-cache-reading` with no test — owned by later slices, as the
  orchestrator notes.
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/previous-programs.ts"`
  — exit 0, 143 mutants: 136 killed, 5 survived, 2 no coverage; score 95.10 %. Every survivor and
  no-coverage mutant lies on a line the range did not change (classified under Declined to judge);
  every mutant on the changed lines was killed.
- Probe of crafted documents (Trust boundary above), `node probe.mjs` — exit 0, 43 cases, 0 failures.
- Not run: the full `npm test` and `check_instructions.py` — the handoff forbids the full suite; the
  cycle runs it before the request.

## Reaches beyond the dispatch

- `tests/sim/content-revision.test.mjs:155-185` and `src/browser/sim/programs.ts:513-525` — to see
  whether the pull at revision 0 is tested (Minor 1).
- `src/browser/sim/saved-game.ts:490-502` — that the key name `contentRevision` is the one the save
  writes.
- `tests/view/previous-save.test.mjs:245-250` and its `decision:` lines — the version its documents
  carry (7 by default, so the view's pull still takes three-key items).
- `foundations/decisions.md` D-401 and D-442 whole, the invariants `save-version` and
  `previous-save-programs-reader` whole — named by the plan's rows and the orchestrator's notes.

## Working copies

- `.runs/review-rc13/wt` — detached
  worktree of `aaef0873`; removed with `git worktree remove --force`, then `git worktree prune`.
- `.runs/review-rc13/` — the probe
  script and the outputs of the foundation check, the size check and Stryker; the directory removed
  whole. Nothing kept beside this report; the results stand above. No remainder.

## Unread material

- `.the-way/product-guidelines/testing/template.md`: read lines 175–204 (the rule „Trust boundaries”
  and its neighbours), not the whole file.
- `foundations/part_map.md`: read the section `simulation` (lines 33–64) only.
- `guidelines/styleguide-browser-view.md`: not read (no file of `browser-view` changed beyond one
  comment line of a test).
- `task-frozen.md`: not opened; the handoff's section of passages of the frozen task is empty and the
  plan's *Read* points to the spec and the remarks, which I read.

## Searches not found or unclear

- The handoff's section „Passages of the frozen task” is empty; I judged against the plan's *Read*
  (remarks, spec, foundation entries) instead.
