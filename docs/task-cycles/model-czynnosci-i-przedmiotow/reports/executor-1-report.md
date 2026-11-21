Status: done with concerns

# Executor 1 report — slice 1, the remembered judging holds the fingerprint of the content it judged

## Commits

- `0a41bd05` (base `ed70970ab7a3215b8fe48b0178973483ad54d26b`), one commit on `task/model-czynnosci-i-przedmiotow`, worktree clean after it.

## Files changed (added / removed lines of the commit)

- `src/browser/sim/judging-record.ts` (+63 / -8): `contentFingerprint(program)`, `isContentFingerprint(value)`, the field `contentFingerprint` of `JudgingRecord`, `recordOfJudging` and `markOfRecord` using it.
- `src/browser/view/judging-cache.ts` (+31 / -10): stored form version 2 (key prefix `loop2-judging-2|`), the fifth field `fingerprint`, the check at reading, the new comment of `isAboveLoaded`.
- `tests/sim/judging-record.test.mjs` (+377 / -7) and `tests/view/judging-cache.test.mjs` (+~170 / -~69, the rest is the swap of the version in the key literals).
- `guidelines/testing.md` (1 line): the row of `src/browser/view/judging-cache.ts` in "Trust boundaries".

## Names and form the next slices need

- The field of the record is `contentFingerprint` (a text), beside `contentRevision`. The stored field is `fingerprint`.
- `contentFingerprint(program)` takes the `Program` (the content of a `SavedProgram`, `saved.program`) and gives 16 lower-case hex digits (64 bits). `isContentFingerprint(value)` is the test of that form; the cache uses it.
- Any test of the next slices that builds a record by hand must hold `contentFingerprint` of the program it is beside (`contentFingerprint(state.programs[i].program)`), or `markOfRecord` gives null.

## Checks (command, exit code)

- `npm test -- tests/sim/judging-record.test.mjs` — exit 0 (14 tests).
- `npm test -- tests/view/judging-cache.test.mjs` — exit 0 (107 tests).
- `npm test -- tests/view/judging-cache-page.test.mjs` — exit 0 (6 tests).
- `npm test -- tests/invariants/test_simulation_isolation.py` — exit 0 (5 tests).
- `npm run typecheck` — exit 0. `node_modules/.bin/eslint` on the four changed code and test files — exit 0. `node_modules/.bin/prettier --check` on them — pass.
- `node tests/quality/eslint-size-rules.mjs` — exit 0, "0 functions and files over a threshold in 338 files" (D-425 holds for every file I changed).
- `python -B .the-way/elements/common/foundation_check.py` (not asked for; run for the quotations I wrote) — exit 1 with 4 errors, none in my files: `tests/sim/data.test.mjs:206`, `tests/view/program-editor.test.mjs:1058`, `tests/view/rule-editor.test.mjs:1528` (quotations of D-290, which the foundation step changed; a later slice owns those tests) and `foundations/invariants.md:236` (`content-identifiers` changed with no file citing it changed; a later slice). My first version had three further errors in `tests/sim/judging-record.test.mjs` (a quotation of D-441 and two of D-442 that did not begin or stand in a binding sentence); I fixed them and they are gone.
- Not run: the full `npm test`, `tests/view/maps-screen.test.mjs` (Slice 2) and `tests/sim/judging.test.mjs` (Slice 3): the slice leaves them as they are. I did not run them; by a search, `tests/view/maps-screen.test.mjs:145` and `tests/sim/judging.test.mjs:476` build records by hand with no fingerprint, so they are the two files the section says fail until Slices 2 and 3. Not verified by a run.

## Tests first, and seen failing

I wrote the code of the function before the tests, not after a failing test (I wrote `contentFingerprint` and the record field in one pass, then the tests). So the tests were not seen failing before the code; I saw each fail by breaking the code in the worktree for a moment and restoring it (the files restored equal their copies, checked with `cmp`):

- `judging-record.ts`, fingerprint made a constant: 4 tests fail (the record test, the "differs exactly where a save raises the content revision" test, the five-thousand test, the lost-change test); exit 1.
- groups left out of the hashed content: the same 4 fail; exit 1.
- an identity counter put into the hashed content: the relation test fails; exit 1.
- keys not sorted: the relation test fails (through the case of a copy saved into its program with reversed keys); exit 1. (Before I moved that case to `saveCopyIntoProgram` this mutation passed: the editor's save, `editProgram`, puts the keys in order by itself, so a case through it could not tell. Both runs, the passing one and the failing one, happened; the case was changed for that reason.)
- array order ignored: the relation test fails; exit 1.
- `markOfRecord` without the fingerprint check: the lost-change test fails; exit 1.
- record fingerprint taken from the wrong program: the record test fails; exit 1.
- `judging-cache.ts` (invariant `judging-cache-reading`): the form check of the fingerprint replaced by `typeof … !== "string"`: 9 cases fail (capital letters, 15 and 17 digits, prefix, empty, letter past f, line end, sign, white space); exit 1. The check removed altogether (cast to string): 14 cases fail (those and the missing, null, number, list, object, boolean and the version-1 value); exit 1. Prefix back to version 1: 20 fail; exit 1. Fingerprint not written: 1 fails; exit 1. `copyOf` dropping the fingerprint: 2 fail (after I changed two tests to use another fingerprint than the one the mutation wrote; before that the mutation passed, since the constant it wrote equalled the test's fingerprint); exit 1.
- The passing commands above are the later runs of the same tests with the code restored.

## Own-work check (section 3)

- Requirement most likely unmet: "the same for two contents `contentDiffers` calls equal, different for every change D-442 lists, a chance of a collision of at most one in 2^52".
- Checks: (1) the relation test takes each case from `editProgram` raising the content revision or not (a relation the fingerprint does not compute) for 15 changes (action, rule condition, rule added, removed, swapped, moved to another group, rule identity, groups swapped, group condition, group name, take list, take order, bring list) and for the same content saved again and the counters alone changed, plus the first chill (`advanceMinutes`, 83 vs 84 minutes) and a change and back; the case of the keys made in another order goes through `saveCopyIntoProgram`, which keeps the keys as they come. (2) 5220 contents in the test (4000 values of one number, the 720 orders of six rules, 500 trip-plan counts) all give different fingerprints. (3) Outside the test, a throwaway script over 1,000,000 contents (a trip-plan count times a condition value) gave 1,000,000 different fingerprints. (4) The form: 16 hex digits; the cache refuses 13 other forms.
- What it showed: all pass. The bound is for a hash that behaves as a random one on non-adversarial contents (see the choice below); the function gives no proof of it.

## Walk (`walkthrough.md`)

The slice alters no behaviour a user sees in the running product by itself: the mark beside „Program:” changes only where a judging stood beside other content, and the screen that shows it (Slice 2) is not changed here; `tests/view/maps-screen.test.mjs` is where that is held. No walk made.

## Choices, with the way rejected and the cost if wrong

- **The hash.** Two 32-bit lanes of a multiply-and-xor hash over the UTF-16 units of the canonical text (the structure of the public "cyrb53" hash, with the 64 bits kept whole), in `Math.imul` alone, so no host global enters (`simulation-isolation`). Rejected: a 64-bit FNV with `BigInt` (weaker mixing, slower); a hash with a fixed random base (needs a random number, which the invariant refuses); a cryptographic hash (needs a host global, `crypto`). Cost if wrong: a collision shows a judging beside content it did not judge until the next judging or change, which is today's behaviour. The "one in 2^52" is the figure of a hash that mixes like a random one over 64 bits (2^-64); a non-cryptographic hash has no proof of it, and a player who crafts content against it harms only his own screen.
- **The canonical text.** The groups and the trip plan (as `contentDiffers` compares them, `[groups, tripPlan]`), with the keys of every object sorted, an array in its order, a string quoted so a text never reads as a number. The group name and the rule identities count, as in `contentDiffers`. Rejected: calling `contentDiffers` (private and a pairwise test, no hash); `JSON.stringify` (key order counts).
- **The text form.** 16 lower-case hex digits; any text of another form is "another form" at reading. Rejected: base 36 or base 64 (no gain; a fixed width makes the check one pattern).
- **Place.** The function stands in `judging-record.ts`, beside the record, as the spec's unit 1 gives first; `programs.ts` is not changed.
- **No memo.** The fingerprint is computed at each `markOfRecord` call (each draw of a card of Mapy, for each triple shown). Content is a few KB; I did not measure the draw. Rejected: a `WeakMap` memo by program object (a test that mutates a program in place would read a stale text). Cost if wrong: a slower draw of a card with many triples; I did not measure it, so it is not shown that it is slow or fast.
- **Version swap in the cache test.** The existing literals of version 1 are now version 2 and those that stood for "another version" (2) are now 1. A new case holds a value of the real version-1 form (four fields) under a version-1 key and shows it neither read, written nor removed at three kinds of opening.
- **A case added beyond the plan** in `tests/view/judging-cache.test.mjs`: "a value whose program the loaded game no longer holds is removed where its generation stands above its character's, and one whose character it no longer holds where its content revision stands above its program's", which pins what the new comment of `isAboveLoaded` says (no behaviour changed; it passed on first run, before and after the comment).
- **`guidelines/testing.md`**: only the row of `src/browser/view/judging-cache.ts` changed: "four fields" to "five", the fingerprint cases, the version-1 case and the removal case above.

## Adaptations of the plan (section 4)

- None structural. One small mismatch: the plan says "the fields are five" in the row; the row had "czterech pól" and says "pięciu pól" now.
- The stored fields are in the order results, equipment, revision, fingerprint, generation (JSON of `writeValue`); the plan names no order.

## Reaches beyond the handoff

- `guidelines/coding-saved-game.md` and the other guideline files: not read.
- `python -B .the-way/elements/common/foundation_check.py`, run to check my quotations (not in the section's *Checks*); it also names the four errors above that are not mine.
- `git.md` of the author's rules (`the author's global rules for git`) and `scripts.md`, which a hook required before a commit and a script.
- `tests/invariants/test_simulation_isolation.py` read in part (its list of host globals and its docstring), to choose a hash that uses none.
- `tests/sim/content-revision.test.mjs` lines 28–163 and 308–347, for the cases of D-442 and the way the copy is saved with its keys as they come.

## Unread material

- `guidelines/styleguide-browser-view.md`: not read whole (98 KB); I read its list of headings and searched it for "judging" and "localStorage" (no hit). The slice changes no style, token or screen.
- `foundations/glossary.md:308-312` (judging) and `:320-324` (content revision), `foundations/part_map.md:3-65`: not read; the decisions and invariants carried what I needed.
- `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md` and `task-frozen.md`: read only through the passages the handoff copies (and a search of the spec for "fingerprint" and a read of its lines 395–450, the *Foundation entries* and *Left to the maker*).
- `guidelines/coding.md`, `guidelines/testing.md` (all three pages), `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, D-441, D-442, D-440, `judging-cache-reading`, `simulation-isolation`, `src/browser/sim/programs.ts` (lines 280–410, 576–593, 708–733) and `game.ts` `setProgram`: read as named; the files I changed: read whole.

## Searches not found or unclear

- none

## Problems observed

- `foundation_check.py` errors named above, not mine: the quotations of D-290 in three test files and the `content-identifiers` change in `foundations/invariants.md:236` (the check wants a file citing it changed); they belong to the slices that bring those files.
- The "chance of at most 1 in 2^52" cannot be proved of a non-cryptographic hash; see the choice above (a guess, not verified, that nothing in the game's content is structured against it; the 1,000,000-content run found no collision).

## Working copies

- `.runs/executor-1/` of the worktree (`.runs/executor-1/`): copies of the two source files for the mutations, a script that hashes 1,000,000 contents, the text of the commit message, the test text I inserted and the output of a test run. Removed before returning with `rm -rf` on the full path; `ls .runs` afterwards shows no `executor-1`. Nothing remains.
