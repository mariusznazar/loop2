# Slice 11a report: old uses of „headquarters” in comments and tests

**Status:** done with concerns
**Commit:** `d034bbf` on `task/ekrany-i-menu` (on top of `5e305f8`). No push. Working tree clean after the commit.

Concerns for the orchestrator (detail under *Searches not found or unclear* and *Mismatches*):
- one use in a file outside the *Change* list has moved in meaning (`tests/sim/death.test.mjs:263`); I did not edit it;
- the header of `run-screen.ts` (lines 4–8) does not say what the handoff describes; I left it, see *Mismatches*;
- I read the files of *Change* around each use, not each file whole (see *Reaches*).

## What changed

Every use of the word in the files of *Change* was judged against the glossary entry `headquarters` (`foundations/glossary.md:87-91`: the headquarters is the screen Siedziba). A use that meant the state of the game outside a map run, or the place after a map run, was rewritten; a use that means the screen Siedziba stayed.

| File | Lines (+/−) | What moved and how it reads now |
|---|---|---|
| `src/browser/sim/skills.ts` | 1/1 | JSDoc of `buyBranch`: "Refuses purchases outside headquarters" → "Refuses purchases while a map run is in the state" (the code checks `state.run`, which stays set after the end of a run too) |
| `src/browser/sim/types.ts` | 1/1 | field `run`: "null = the headquarters." → "null = no map run." |
| `src/browser/view/run-screen.ts` | 3/3 | JSDoc of `createRunScreen`, the `panel` parameter: the claim that the game view moves one panel between screens → the panel is this screen's alone; the game view holds a second one for Programy |
| `tests/sim/body.test.mjs` | 2/2 | comment: „Zakończ” after death leads to the screen Postać of that character (D-53, D-62) |
| `tests/sim/saved-game.test.mjs` | 5/5 | JSDoc of `HEADQUARTERS` (the const name stays): "at the headquarters" → "with no manual map run"; three test-state names and one lookup of a state name, changed together (see *Choices*) |
| `tests/sim/repertoire.test.mjs` | 1/1 | test title: "in the headquarters and in a map run" → "outside a map run and in a map run" |
| `tests/view/clock.test.mjs` | 1/1 | comment D-207: "real time at the headquarters" → "real time outside a map run" |
| `tests/invariants/test_program_closed_lists.py` | 6/6 | docstring lines and the two message labels "in the headquarters" → "outside a map run" |
| `tests/invariants/test_program_world_reference.py` | 2/2 | docstring lines and the message label "in the headquarters" → "outside a map run" |

Totals: 9 files, 25 insertions and 25 deletions (`git diff --stat HEAD~1`). No identifier, assertion, expected value, or `invariant:` line changed. I checked this by listing every changed line (`git diff -U0`): each is a comment, a JSDoc, a test title, a message label, or a test-state name. No invariant test was changed.

`src/browser/sim/types.ts` and `src/browser/sim/skills.ts` lines that the handoff listed were all changed; `tests/sim/skills.test.mjs` needed no change (see *Choices*).

## Checks (command and exit code)

- `npm run typecheck` — exit 0 (ran before the final comment-only rewrap of `run-screen.ts`; a comment cannot change types).
- `npm test -- tests/sim/body.test.mjs` — exit 0
- `npm test -- tests/sim/saved-game.test.mjs` — exit 0 (after the Prettier fix below, re-run: exit 0)
- `npm test -- tests/sim/skills.test.mjs` — exit 0 (file unchanged; run as the handoff names it)
- `npm test -- tests/sim/repertoire.test.mjs` — exit 0
- `npm test -- tests/view/clock.test.mjs` — exit 0
- `npm test -- tests/invariants/test_program_closed_lists.py` — exit 0 (`OK`)
- `npm test -- tests/invariants/test_program_world_reference.py` — exit 0 (`OK`)
- `npm test -- tests/quality/test_quality_invariants.py` — exit 1 on the first run: `test_prettier_source_format` failed on `tests/sim/saved-game.test.mjs`. My rename of the state-name key had changed line wrapping. I ran `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --write tests/sim/saved-game.test.mjs` (the diff touched only my lines), then re-ran: exit 0. After the final comment rewrap in `run-screen.ts`, re-ran: exit 0 (`Ran 5 tests … OK`).

Failing runs of tests written first: none, since no test was written. No invariant test was changed, so no seen-failing run is required.

Not run, by the handoff's rule: the full gate `npm test` without a file argument; `foundation_check.py` (not named in the Checks).

Ui check: not applicable. Only comments, JSDoc, titles and labels changed; what a screen shows is unchanged, so no screenshot route was used.

## Own-work check

- **Requirement most likely missed:** that the change alters no assertion, expectation, identifier or invariant line, and that no rewritten string is still false under the new glossary term.
- **Check:** `git diff -U0 -- src tests` and read every `+`/`-` line (done; list in *What changed*). Then `git grep -n -i -w "headquarters"` over the nine files, judging each remaining use (done; the remaining uses are identifiers or screen-sense uses). Then `git grep` for the old phrases ("in the headquarters", "the headquarters after", "null = the headquarters", "at the headquarters") across the repo outside `foundations/` and `.runs/`: the only hits left are the screen-sense or out-of-*Change* uses listed below.
- **Result:** clean, apart from the two problems this check found and I fixed: one missed use at `tests/invariants/test_program_world_reference.py:39` (fixed, same commit), and the `run-screen.ts` comment that was joined into one overlong line by my edit (rewrapped, same commit). The Prettier failure was caught by the quality check, not by this check.

## Choices made

- **Test-state names renamed (saved-game.test.mjs).** The three keys "the headquarters after …" became "after … with no map run", and the one lookup of a key was changed in the same edit. Reason: the keys are local to one test and only the lookup reads them (`git grep` found no other reader; the test passes). Cost if wrong: none found; a runner selector would have shown in the grep.
- **`HEADQUARTERS` const, `headquarters()` helper (skills.test.mjs), `headquarters.ts` module names:** identifiers, left. No comment or title near `headquarters()` in `tests/sim/skills.test.mjs` uses the word, so that file needed no change.
- **`src/browser/sim/types.ts:380` "headquarters row" and similar** (`src/browser/sim/game.ts:303`, `src/browser/sim/programs.ts:357` and `:532`, `tests/sim/copy.test.mjs:131`, `src/browser/sim/data/maps.ts:52`, `src/browser/view/program-editor.ts:208`): the row or the list shown on the screen Siedziba, so they stay true. Left.
- **`src/browser/view/run-screen.ts` header, lines 4–8:** says the program panel and copy stood "beside the headquarters before the screens got addresses". That is a history of the old single page, and under the new term it still holds (the lines stood beside the Siedziba content). Left. The handoff's described panel claim is in the `createRunScreen` JSDoc (lines 33–34), which I rewrote. Rejected alternative: rewriting the header to "beside the screen Siedziba" — the sentence is about history, so the rewrite added nothing.

## Reaches beyond the handoff

- Read in full: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/testing.md` (named in *Read*). Also `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`, and `.the-way/project-level/technology/reserved_choices.md` (the last to check whether any choice here was reserved: none; no code choice was needed).
- Read: `foundations/decisions.md` D-62 (lines 1227–1239) and D-53 (lines 1065–1078), D-280 (lines 5841–5883), `foundations/part_map.md` simulation entry (lines 30–60), the task passage `task.md:221`.
- Files of *Change* were read by region around each use (Read with offset and limit), not whole. Reason: `tests/sim/saved-game.test.mjs` is over 2,000 lines and only a few lines of it bear the word. This departs from the make-change rule "every file you change, whole". `git grep` covered every tracked file in each changed file, so no use was missed by that.
- Wider `git grep -i -w headquarters` over tracked files outside `foundations/` and `.runs/`, to find moved uses outside *Change*.

## Mismatches of plan and code

1. The handoff says `run-screen.ts` lines 4–8 "say the game view moves one program panel between the screens that hold it". They do not. That claim is at lines 33–34 (the `createRunScreen` JSDoc), and I rewrote it there. See *Choices* for the header.
2. Uses outside the *Change* list whose meaning moved, not edited (the handoff's rule: change only the files named):
   - `tests/sim/death.test.mjs:263` — `// Nothing it carried comes back: at the headquarters the chest stands as the death left it.` The sentence concerns the game state after „Zakończ”, i.e. the old meaning, outside a map run. Moved. Needs a decision: add the file to *Change* in a slice, or leave the comment for a later slice.
   - `tests/view/account-screen.test.mjs:2862` — `/** Ala at generation 2 at the headquarters, her resurrection ready … */`. Can be read as the screen or as the state with no map run; I could not decide. Goes to the orchestrator.
   - Judged as the screen Siedziba, so they stay true, left: `tests/view/account-screen.test.mjs` lines 2018, 2489, 2875, 2878, 3300, 3304 and its `"headquarters"` screen-name literals; `tests/view/headquarters.test.mjs` lines 1, 20, 25, 49; `tests/view/screen-address.test.mjs` lines 87, 189; `.claude/skills/loop2-deploy/references/setup_and_secrets.md` lines 329–334 and the identical copy under `.agents/skills/loop2-deploy/references/setup_and_secrets.md` ("the headquarters appears at once", "still reaches the headquarters").

## Searches not found or unclear

- Searched: `git grep -n -i -w "headquarters"` over tracked files outside `foundations/` and `.runs/`, the nine files of *Change* in full, and the old phrases listed in *Own-work check*. Found: the uses listed above.
- Unclear: whether `tests/view/account-screen.test.mjs:2862` means the screen or the state (see *Mismatches*, item 2).
- Unclear: whether `tests/sim/death.test.mjs:263` should be in this slice's *Change* (see above).
- Not found: no test or runner selects on any title, label or state name I changed (`git grep` for the old and new strings).
