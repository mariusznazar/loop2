# Report — executor of slice 5 (correction 1), task `ocena-programu-na-ziarnach`

## Status

`done`. Class `same` was enough.

## Commits

- `d84a5958` feat: :sparkles: add the judging cache of the browser view … (D-441, D-209) — one commit, four files, made by path.

## Files changed (added / removed lines)

- `src/browser/view/judging-cache.ts` — new, +324
- `tests/view/judging-cache.test.mjs` — new, +791
- `foundations/part_map.md` — +1 (the module under *Trust boundary* of `browser-view`)
- `guidelines/testing.md` — +3 / −2 (rule "Trust boundaries": D-441 in *Decision*, `judging-cache-reading` in *Invariant*, one table row for the module)

## What the module exposes (`src/browser/view/judging-cache.ts`)

- `openJudgingCache({ accountId, madeAtMs, state, afterRefusedSave, storage })` gives `{ read(ids), remember(ids, record) }`.
  `ids` is `JudgingIds` and the record is `JudgingRecord`, both from `src/browser/sim/judging-record.ts`. `read` gives the record or `null`; `remember` stores it.
- `lastingStorageOf(page)` gives `page.localStorage`, or `null` where reaching it throws.
- Types `JudgingStorage` (`length`, `key`, `getItem`, `setItem`, `removeItem` — what a `Storage` offers), `JudgingCacheOpening`, `JudgingCache`.
- The key is `loop2-judging-1|<account>|<madeAtMs>|<character>|<program>|<map>`. Each part has `%` and `|` written as `%25` and `%7C`, so no part holds the separator and no two different accounts share a text. The key function is not exported; the tests write keys as literals.
- The value is JSON with exactly four fields: `results` (twelve letters `s`, `d`, `u`), `equipment` (`[item, count]` pairs, written in the order of the data's items), `revision`, `generation`. A longer value than 1024 characters is not parsed.
- At opening, best effort: removes this account's values under another game's moment; where `afterRefusedSave`, this game's values too; otherwise this game's values whose revision or generation stands above the loaded program's or character's (spec Decision 11.3). Other accounts' and other versions' keys are left.
- No comment, title or sentence claims more of the refused-save path than D-441 gives (spec Decision 11.2).

## Checks (command → exit code)

- Written first, with the module an empty stub (`read` gives `null`, `remember` does nothing): `npm test -- tests/view/judging-cache.test.mjs` → exit 1, 79 tests, 60 pass, 19 fail, each on an assertion (a judging read back, the opening removing a value). The stub passes the 60 refusal cases only because it reads nothing, so the refusal was also seen failing on the real code, below.
- The refusal seen failing once (invariant `judging-cache-reading`): the real code with three checks broken for a moment (the exact four fields, the length of the results, the bound on the value's length): `npm test -- tests/view/judging-cache.test.mjs` → exit 1, 8 fail — one more field, `__proto__` beside the four, `constructor` beside the four, eleven results, thirteen results, no results, a valid value padded past the bound, a valid value with a long text before it. The code was restored before the commit.
- The real code: `npm test -- tests/view/judging-cache.test.mjs` → exit 0, 79 pass, 0 fail (final run after the last edit).
- `npm test -- tests/invariants/test_cross_part_imports.py` → exit 0
- `npm test -- tests/invariants/test_simulation_isolation.py` → exit 0
- `npm test -- tests/quality/test_mutation_test_selection.py` → exit 0 (no `stryker.config.json` entry is needed)
- `npm test -- tests/quality/test_function_and_file_size.py` → exit 0
- `npm test -- tests/quality/test_node_test_selection.py` → exit 0
- `npx eslint tests/view/judging-cache.test.mjs src/browser/view/judging-cache.ts` → exit 0; `npx prettier --check` of the two TS/JS files → clean (Prettier does not govern the two `.md` files and flags them as before my change); `npm run typecheck` → exit 0
- `python -B .the-way/elements/common/foundation_check.py` (the new files staged) → exit 1, 5 errors, all in `tests/sim/saved-game-judgings.test.mjs` (lines 111, 124, 170, 257, 304; quotations of D-440 and D-165 in a file of the first run that I did not change). My files show no error: the module is claimed as a trust boundary, `judging-cache-reading` is cited by my test, no fault of `guidelines/testing.md`. Before staging the files, the same check showed the two errors that staging cleared (the invariant with no test, the pattern matching no tracked file).
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → exit 1, the same 5 errors in the same file, none in mine.
- Not run: the full gate (as the handoff says).

## Own-work check

The requirement my slice most likely misses: the cache never throws and never gives a judging of another account, another game or another form, on values that anyone with the browser can write (Decision 4, the trust boundary). The check is the 79-case file above: 55 crafted values (each of the four fields missing, extra, `__proto__` or `constructor` as a field name, results of 11, 13, 0 length, unknown and capital letters, items the data lack or named twice or called `__proto__`/`constructor`/`toString`, counts 0, negative, fractional, textual, beyond the safe integers or too large for a number, revisions below 0, generations below 1, and values over the bound with valid content), each read as `null`, left in the storage, with no throw; keys of another account, another game and four other versions or prefixes; a getItem answering with no text; accounts whose identifier holds `|` or `%`. It showed all pass, and the refusal seen failing under the break described above. A second check with a real `Storage` (a one-off script under `.runs/`, jsdom's `localStorage` through `lastingStorageOf`, with the memory limit started first as the testing guidelines require): a judging written and read again by a cache opened anew, the other game's key removed, an unrelated key left — it printed `true`, 2 keys, `x`. The script was removed with my directory.

## Choices (with the way rejected and the cost if wrong)

- **Key parts escape `%` and `|`** instead of `encodeURIComponent`. The latter throws on a lone surrogate in an account id, which would let an exception out of the opening; the escape throws on no text. Cost if wrong: none seen.
- **Equipment is written in the order of the data's items** (spec Decision 4) and read in the order stored, any order admitted; a record given in another order therefore comes back in the data's order. The mark reads the stock only, so the order changes nothing it shows. Rejected: keeping the given order (the spec says the data's order) and refusing a misordered value (the spec's list of ignored values does not include it).
- **Value fields are `results`, `equipment`, `revision`, `generation`** (the spec names the four, not their names); full words, so the value comes to about 80 characters, within the spec's 50–90.
- **The bound is 1024 characters.** A largest valid value (four items, counts at the safe maximum) is about 150.
- **`lastingStorageOf(page)` is an addition beyond the names the handoff lists**: where the page reaches `window.localStorage` and the browser throws, the page needs the `null`; putting that try in the one file that knows `localStorage` keeps the guard out of every caller. Cost if wrong: one small function to delete; slice 6 or 7 may call it or not.
- **The opening's drop of values above the loaded game's own (Decision 11.3) is made for a triple whose character or program the loaded game holds, each field compared with its own.** A triple whose program or character the loaded game lacks, or a key or value of no form of the cache's, is left (Decision 8: values of a deleted program stay, unread). Tests cover: above by revision dropped, above by generation dropped, above by both, equal or below kept, absent character or program kept, malformed keys and values kept.
- **Tests use no jsdom**: the stand-in storages are plain objects (a map-backed one, one whose setItem throws while a flag holds, one whose every call and `length` throw, none), so the file needs no `page-document.mjs`. The handoff note spoke of jsdom for the screen tests of later slices.

## Reaches beyond the handoff

- Read `guidelines/testing.md` whole (not in the *Read* list, but I changed it and the guidelines require it before writing tests).
- Read `.the-way/task-cycle/change/slice.md` (the variant the method names), `.the-way/elements/part-map/skill/decide_entry.md`, `write.md` and `.the-way/elements/part-map/template.md` lines 118–135 ("Trust boundary") as the part-map skill's steps name them; `a note in the author's private notes` and `scripts.md` as the user's instructions require before a commit and a script.
- Read `foundations/decisions.md` D-441 whole and `foundations/invariants.md` `judging-cache-reading` (the orchestrator's note names them).
- Read `src/browser/sim/types.ts` lines 60–95, 455–470, 485–565 and `src/browser/sim/data/items.ts` 1–50, `src/browser/view/screen-address.ts` 1–40 and `tests/sim/judging-record.test.mjs` fixtures, to see the types, the items, a trust-boundary neighbour and the fixture style.
- Used the directory `.runs/executor-c1-5/` (named in the dispatch message) where the handoff text says `.runs/executor-5/`.

## Unread material

- `foundations/decisions.md` D-211, D-209 and D-117: not read whole; the handoff's passages of the spec carry what they say for this slice, and D-441 holds the rest.
- `guidelines/styleguide-browser-view.md`: lines 1–80 only (roles, backgrounds and text rules; the module draws nothing).
- `.the-way/product-guidelines/testing/template.md`: lines 150–230 (the range 180–200 and its neighbours).
- `src/browser/account-api.ts`: lines 1–30.
- `foundations/invariants.md` `cross-part-imports` and `document-test-memory-limit`: read as given (1195–1259).
- The spec file `spec.md` and `plan.md`: not opened, as the handoff says; the passages in the handoff were the source.

## Searches not found or unclear

- None found missing. One thing the handoff leaves unclear: the dispatch message names `.runs/executor-c1-5/`, the handoff text `.runs/executor-5/` (I took the message).

## Problems observed, concerns

- **A remaining gap the cache does not close, as the spec states it**: an entry of this game for a program number the loaded game does not hold stays, whatever its revision. If a page lost a save with a new program N (page closed while its save failed, D-208), a later new program N in the loaded game can show an entry of the lost one where both stand at the same content revision (0). D-441's rationale already names this class ("can stand beside other content that reaches the same content revision"); it is the accepted rare cost. A drop of entries of program numbers at or above the loaded game's `nextProgramId` would close this case, but Decision 11.3 and Decision 8 do not give it, so I did not add it. Guess on size: a pair of conditions in `isAboveLoaded`.
- The foundation check's 5 errors in `tests/sim/saved-game-judgings.test.mjs` are quotations of the first run's D-440 and D-165 sentences in a file of the first run; they are in no file this slice changes.
- `foundations/part_map.md` *browser-view*'s first sentence does not mention remembering judgings; I changed *Trust boundary* only, as the slice says.

## Working copies

My directory `.runs/executor-c1-5/` held the real module's copy (while the stub stood in for the first run), run outputs and a one-off jsdom check script. It was removed by its full path; nothing remains.
