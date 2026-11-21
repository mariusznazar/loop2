PASS 51015538

# Review `w2f` — the fix of the Minor findings M1–M11 of the review of the whole of correction 1

Range `c43c8ad7..51015538` (five commits: `9e6ae5a4`, `efcceb44`, `2e5536b1`, `b8b6c24c`, `51015538`). `git rev-parse HEAD` in the cycle worktree gave `510155383b91fa787fe8a9cac9b8119a8702f90f`, the head given; `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, the pinned commit. Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. The findings file holds Minor findings alone, so only a new Critical or Important finding in the fix would fail this review (WAY-162). None was found.

## Findings

### Critical

none

### Important

none

### Minor

**N1 — `src/browser/view/judging-cache.ts:250-251`: the comment of `isAboveLoaded` still says what M8 said was wrong (M8 remains in part).** The new comment's first sentence is right: each half is compared where the loaded game holds it. The sentence after it, "A triple whose program or character the loaded game once gave and no longer holds is left alone", is still false for one kind of triple. Take a triple whose program was deleted and whose character is still held: if its stored generation stands above the character's, the code (`:268-271`) removes it. Example: the key `…|3|2|forest`, where program 2 was deleted and character 3 is held at generation 1, with a stored generation of 5. The `character` half is true, so the value is removed. That is the very case M8 named ("a value whose program is gone but whose generation stands above is removed"). Only the wording is wrong; no behaviour is.

**N2 — `tests/sim/content-revision.test.mjs:191-223`: the case "one path from the document to the list" does not give `appendPrograms` what the product gives it (M5 remains in part).** The case maps the reader's items to `{ name, program }` before it appends them (`:83-84` of the diff). The one production caller, `src/browser/view/programs-pull.ts:119`, passes the read items whole. The fix report says the case catches "a reader or an append that carries the item's revision through, which neither half's case could catch alone". I tested that claim with a mutation that does exactly this: the reader puts `contentRevision` on its `read` item, and `appendPrograms` takes `entry.contentRevision ?? 0`. The new case still passes (`npm test -- tests/sim/content-revision.test.mjs` exit 0, 39 of 39). The reader's half in `tests/sim/previous-programs.test.mjs` is what catches it (exit 1: "an item of a document of version 9 holds the content revision, … and the result has no revision to pull" and four more). So the new case adds a composition, but not at the seam the finding meant. Feeding `read.items.filter(({ kind }) => kind === "read")` unmapped, as `programs-pull.ts` does, would close the gap. Evidence: `reports/review-w2f-evidence/mut-m5.txt` and `mut-m5b.txt`. This is broader coverage, as M5 itself was.

**N3 — `foundations/part_map.md:5`: the new clause reads more broadly than D-441.** It says the part "keeps in the browser's lasting storage … the judgings the player has made of characters, programs and maps". D-441 keeps one value per triple, the last judging of each character, program and map (D-440); a later judging replaces it, and the opening drops some. A reader could take "the judgings the player has made" to mean every judging. I grade it Minor, not by WAY-263. The sentence names what kind of state the part keeps, not a rule of keeping, and D-441 holds that rule word for word. No file does what the sentence forbids or misses what it requires. Suggested wording: "the last judging of each character, program and map (D-441)".

**N4 — `guidelines/testing.md:178` (the row of `judging-cache.ts`): the new words "i przypadki po nim w tym samym pliku" are accurate today, but they name the cases by their position in the file.** Today they are true: every case after "a value above the loaded game's content revision …" in `tests/view/judging-cache.test.mjs` (to the end of the file, line 890) concerns the drop at the opening. The rest of the table names each case by its title. A case added later at the end of that file for something else would fall under this row without anyone deciding so. It matches the guideline's own rule ("Trust boundaries": the drop of D-441 is no refusal of `judging-cache-reading`, and the row says these cases carry no invariant mark, which they do not). The edit was made by hand, not through `the-way-maintain-testing-guidelines`; it only follows a count the fix made false.

## Each finding of the findings file

- **M1 — fixed.** `MapsEntryOptions.judgingCache` is required (`src/browser/view/maps-entry.ts:27`), and both `?.` are gone (`:50`, `:129`). My probe was a file that calls `createMapsEntry({ store })` with no cache. `npm run typecheck` gave exit 1 with `TS2741: Property 'judgingCache' is missing … but required in type 'MapsEntryOptions'` (`review-w2f-evidence/m1-typecheck.txt`). The probe was removed. The replacement case of `tests/view/maps-screen.test.mjs` ("an entry given a cache with no storage …") asserts that the mark stands for the open page and is gone on a rebuilt screen.
- **M2 — fixed.** `runWaitingParts` in `src/browser/view/team-lines.ts:24-29` is the one place of the link text, and `RunWaitingNote` draws `parts.lead` then `parts.link` with no slicing (`maps-screen.tsx:321-341`). No reference to `runWaitingSentence` or a second `RUN_LINK_TEXT` remains (grep with a positive control on `runWaitingParts`). Mutation: the screen draws `parts.link` in place of `parts.lead`. Two cases of `maps-screen.test.mjs` fail (exit 1).
- **M3 — fixed.** `newAccount` builds the list with `appendPrograms` (`balance/campaign.mjs:173-189`). `createCharacter` and `newGame` reference no program number (`pickedPrograms {}`, `lastEnteredProgram null`, `countsProgram null`), so emptying the list leaves no dangling number. Mutation: every program of the account gets `contentRevision: 5`. The new case fails (exit 1, 16 of 17 pass). All of `tests/balance/*.test.mjs` pass, and so do the two invariant tests of the instrument's repeatability and file writes.
- **M4 — fixed.** D-386 adds "and the function that makes a new game refuses a moment that is no safe integer with a RangeError". It sits in the paragraph about the moment the game was made, not the one the finding called the second; that placement suits it. *Verification* names the function. The code agrees: `src/browser/sim/game.ts:385-390`. The test citation follows the new sentence, and `foundation_check.py` gives 0 errors.
- **M5 — remains in part, Minor (N2).** One case now composes the reader and `appendPrograms`. It projects the items first, so it does not catch the carry-through mutation the fix report says it catches.
- **M6 — fixed.** `isNotBelow` and the two comparisons are at `judging-cache.ts:237-265`, and D-441's third paragraph and *Rationale* say the same. The cases the mutation should catch do fail when the fix is undone. Without either comparison, 8 cases fail (`review-w2f-evidence/mut-m6.txt`). With `>` in place of `>=`, 3 cases fail. With the program half removed, 4 cases fail. Trust-boundary probes are in the Checks below.
- **M7 — fixed.** With `part` writing `%` and `|` bare, the case "an account whose identifier holds the separator of a key …" fails, and only that case (exit 1, `review-w2f-evidence/mut-m7.txt`).
- **M8 — remains in part, Minor (N1).** The second comment, of `tidyStorage` (`:276-278`), is right now. The first, of `isAboveLoaded`, still has its last sentence wrong.
- **M9 — fixed.** `return page.localStorage ?? null;` (`:341`). Mutation: drop `?? null`. The case "a page whose window refuses its storage gives none …" fails (exit 1). My probe gives `lastingStorageOf({})` as `null`, a throwing getter as `null`, and a given storage as that same storage.
- **M10 — fixed.** `JudgingCacheOpening` has no `madeAtMs`. The opening reads `opening.state.madeAtMs` for both the prefix it tidies (`:285`) and the keys it reads and writes (`:309`). `game-view.ts` no longer passes the field, and typecheck gives exit 0.
- **M11 — fixed, with N3.** The part's sentence now names the lasting storage and the judgings. `judging-cache.ts` is the one file under `src/` that reaches `localStorage`. No file there reaches `sessionStorage`, `indexedDB`, cookies or `caches` (grep).

None was contested, so there is nothing to keep or withdraw.

## The trust boundary

The range does not touch `src/browser/sim/saved-game.ts`, the boundary the dispatch names: none of the 15 changed files is that file. It does touch the boundary of `judging-cache.ts` (`judging-cache-reading`, values read from the browser's storage).

I read the load to see whether the new drop can remove a valid entry of the loaded game: `saved-game.ts:458`, `:491` and `:552` refuse any program or character number at or above `nextProgramId` and `nextCharacterId`. So every number the loaded game holds stands below its next numbers, and the drop cannot reach it.

My probe (`review-w2f-evidence/probe.mjs`, output `probe-output.txt`) opened a game whose characters are 1 and 3 (2 has left), whose programs are 1 and 4 (2 and 3 were deleted), and whose next numbers are 5 and 5. The opening threw nothing. These were kept:

- the game's own `1|1` and `3|4`;
- `2|4` (a character once given), `3|2` (a program once given), `4|1` and `0|1`;
- triples with 2 or 4 parts;
- the Arabic-Indic digit `١`, `__proto__`, `constructor` and the escaped `%35`;
- values under a never-given number that are no value of the cache's: a wrong field, `__proto__`, and 5000 characters long;
- another account's values and another version's.

These were removed: `5|1`, `1|5`, a program number of 200 000 digits (no throw, no parse) and the account's other game.

With the next numbers at `Number.MAX_SAFE_INTEGER`, `9007199254740990` was kept, and `9007199254740991` and `…992` were removed. A storage whose `getItem` throws, or answers an object, throws nothing out of the opening.

Every strict reading rule stands: a value is judged only through `readValue`, and a number only in canonical decimal text.

There is no operation that cannot be undone. The change only removes, at the opening, values of the cache that the browser would otherwise keep, as D-441 gives.

## Declined to judge

- A tab that opens while another tab's save of a newly made program or character has not yet reached the server would drop that tab's fresh judging of it. Reason: the same holds for content revisions before this fix. D-441's *Rationale* treats a number or revision above the loaded game as coming from a save that did not reach the server. Two tabs saving one game meet D-209. This is no change of this fix.
- `keysOf` in `judging-cache.ts:193-204` passes on a key that is not a string, and `tidyStorage` then calls `startsWith` on it, outside any guard. Reason: this was there before the range. A real `Storage.key` gives a string or `null`. Outside the fix diff.
- The foundation entries and the guideline row were written by hand, not through the skills `the-way-record-decision`, `the-way-update-part-map` and `the-way-maintain-testing-guidelines`. Reason: it is a question of process the orchestrator already noted. I judged the content instead (N3, N4, M4, M6).

## Checks

All run in a detached worktree of `51015538` at `.runs/review-w2f/wt` after `npm ci` (exit 0) and `git submodule update --init -- .the-way` (at `19e5774a`).

- Focused tests, `npm test -- <file>` (each builds first): `tests/view/judging-cache.test.mjs` 0 (88/88); `tests/view/judging-cache-page.test.mjs` 0 (6/6); `tests/view/maps-screen.test.mjs` 0 (50/50); `tests/view/team-lines.test.mjs` 0 (20/20); `tests/balance/campaign.test.mjs` 0 (17/17); `tests/sim/content-revision.test.mjs` 0 (39/39); `tests/view/account-screen.test.mjs` 0 (132/132); `tests/sim/previous-programs.test.mjs` 0 (21/21); `tests/balance/{agreement,check-map,cli,engine,loop,overlay,progression,trace}.test.mjs` each 0; `tests/invariants/test_balance_instrument_repeatability.py` 0 (2 tests); `tests/invariants/test_balance_instrument_file_writes.py` 0 (3 tests).
- Mutations, each undone with `git checkout` before the next. Every one failed except the one marked:
  - M6, the never-given comparison removed: exit 1, 8 failures.
  - M6, `>` for `>=`: exit 1, 3 failures.
  - M6, the program half removed: exit 1, 4 failures.
  - M9, `?? null` removed: exit 1, 1 failure.
  - M7, the escapes removed: exit 1, 1 failure.
  - M3, revision 5 on the account's programs: exit 1, 1 failure.
  - M2, `parts.link` drawn for `parts.lead`: exit 1, 2 failures.
  - M5, revision carried from the reader through the append: `content-revision.test.mjs` exit 0 (not caught, N2); `previous-programs.test.mjs` exit 1.
  - M1, a probe caller without the cache: `npm run typecheck` exit 1, `TS2741`.
- `npx eslint` on the 12 changed code files: 0.
- `npx prettier --check` on the same 12: 0. On the three changed Markdown files it warns, as it already did on their base versions from `c43c8ad7`. They lie outside the pattern of `prettier-source-format`.
- `npm run typecheck`: 0.
- `node tests/quality/eslint-size-rules.mjs`: 0, "0 functions and files over a threshold in 338 files".
- `python -B .the-way/elements/common/foundation_check.py`: 0, "0 errors". With `--skip-test-citations`: 0, "0 errors". I ran it in my worktree of the head, with `.the-way` at the same pinned commit and the same tracked files as the cycle worktree, not in the cycle worktree itself. No test citation is stale.
- Probe `node .runs/review-w2f/probe.mjs`: exit 0. Output is in `reports/review-w2f-evidence/probe-output.txt`.
- Not run: the full gate (`npm test` with no file), as the dispatch says.

## Reaches beyond the dispatch

- `src/browser/sim/saved-game.ts:440-560` and `:1290-1370` (grep for `nextProgramId`/`nextCharacterId`): whether the load lets a held number stand at or above the next number. It does not.
- `src/browser/sim/programs.ts:479-511` (`appendPrograms`, `freeName`) and `src/browser/sim/game.ts:385-497` (`newGame`, `createCharacter`): for M3, whether emptying the list leaves a dangling program number.
- `src/browser/sim/previous-programs.ts:1-110` and `src/browser/view/programs-pull.ts:105-122`: for M5, what the production path hands to `appendPrograms`.
- `foundations/decisions.md:11924-11949`: D-441 whole, its *Rationale* through the diff.
- `.the-way/elements/part-map/template.md:180-204`: the binding part of an entry, to judge N3.
- `guidelines/testing.md:1-60` and `:150-180`: its header and the rule "Trust boundaries", to judge the row (N4).
- `a note in the author's private notes` and `.ai\rules\git.md`, the user's rules, before the probe script and the worktree.

## Working copies

- `.runs/review-w2f/wt`: a detached worktree of `51015538` with its `node_modules` and `dist`. Removed with `git worktree remove --force`, then `git worktree prune`.
- `.runs/review-w2f/`: the probe, the test outputs and the diff of the tests. Removed. What the report needs is kept in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-w2f-evidence/`: `probe.mjs`, `probe-output.txt`, `mut-m5.txt`, `mut-m5b.txt`, `mut-m6.txt`, `mut-m7.txt`, `m1-typecheck.txt`.
- No screenshot taken. The cycle worktree was left as it was (clean status after the removal).

## Unread material

- `reports/review-whole-2-report.md` was not read. The findings file quotes its Minor findings word for word, and `fix.md` bounds the review by the findings file.
- The dispatch's sections *Passages of the frozen task* and *The plan's sections* are empty. `task-frozen.md` was not opened, since no passage pointed into it.
- `guidelines/testing.md`: lines 61-149 and 181-509 not read. I read the header and "Trust boundaries", the part the edited row lies in.
- D-386: only the two paragraphs and the *Verification* that the diff shows. D-442: only the sentence the new case cites.

## Searches not found or unclear

- `tests/view/programs-pull.test.mjs`: no such file. I looked for a test of the production pull path for N2 and did not search further.
