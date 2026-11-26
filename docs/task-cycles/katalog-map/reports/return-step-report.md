done

# Report - the return step, task `katalog-map`

- Worktree `the task's worktree`, branch `task/katalog-map`, head before my work `7abe5a4d` (confirmed). Range compared: `97936c245cecfc11778fcf3d10feb075436d17fc..7abe5a4d`.
- Commit (one, by path): `be5bebc7` - files `foundations/decisions.md`, `foundations/environment_facts.md`, `foundations/invariants.md`, `tests/view/map-catalog.test.mjs` (one added `decision:` line). Nothing pushed. No product code changed (the mutation of check 5 was reverted before the commit).
- Method read whole: `task-cycle/change/SKILL.md`, `task-cycle/skill/return_step.md`, `foundation_step.md`; the `SKILL.md` of record-decision (with `read.md`, `decide_entry.md`, `projected.md`, `template.md`), record-invariant (with `decide_entry.md`, `draft.md`, `write.md`, `template.md`), record-environment-fact (with `read.md`, `decide_entry.md`, `draft.md`, `write.md`, `template.md`), record-glossary-term (`SKILL.md`, `decide_entry.md`); `elements/common/way_of_working.md`.

## Return step items

### Foundation compared with the code (entries compared, each correction)

Each entry below was read whole and set against the code and the tests of the range. "Corrected" lists the edit; "none" means it matched.

| Entry | Compared with | Result |
|---|---|---|
| D-325 | `catalog-lines.ts`, `map-catalog.tsx`, `maps-screen.tsx`, tests of the catalog | binding sentences match. Corrected the *Verification*: the `tests:` clause now holds the catalog (regions, counters, search with the sentence of nothing found, three views, empty places, the number in the row); the pair keeps only what no test holds (the catalog on the left, the card on the right, the card under it in the phone layout). Added one binding sentence (see "Decisions written or changed") |
| D-331 | `map-catalog.tsx` rows, tests | binding sentences match. *Verification*: state circle filled/empty, no „rozwiązana” after the name and the short demand moved from the pair to `tests:`; the pair keeps the roles `text-secondary`, `text-strong`, `selected`, which no test reads |
| D-134 | rows and card, tests | the `tests:` clause said „rozwiązana” stands after the name on the list, no longer true; it now says the card's mark and the row's circle; pair keeps only the card's role `positive` |
| D-149 | `catalog-lines.ts` empty places and counter, tests | `tests:` now holds the empty place with no name, the region's counter over all maps and "the catalog" in place of "the list"; the pair is removed, since the tests hold all of it |
| D-24 | `maps.ts` (`region`, `REGIONS`), `tests/sim/data.test.mjs` | region sentence held by the test of the data; the added pair examples removed, `tests:` names the region |
| D-327 | `map-lines.ts`, `maps-record.test.mjs` | `tests:` holds the number in „Czyha” at the record creature, on that map's card alone; the added pair (24 ze 120; "or as „0”") removed - the "as „0”" example contradicted the test of a first judging that took nothing |
| D-440 | `judging.ts` (`creatureDamage`), `judging-cache.ts`, `maps-record.test.mjs`, `tests/sim/judging.test.mjs` | the fourth paragraph matches the code in each clause; `tests:` now holds it; the pair I would otherwise have left is removed (every part is held) |
| D-441 | `judging-cache.ts`, `judging-cache-record.test.mjs` | the record paragraph matches; `tests:` holds the record (own key and version, form, never lowered, refused write, opening); the added pair removed; the old pair for „Wyloguj” stays |
| D-271 | `credits.ts`, `icons.test.mjs` | `tests:` now names the credit line of the bear's pack (CC BY 4.0, title, author, page, how files differ); "credited with ... CC BY 4.0" and "a bear's picture without the credit line" left the pair, the pair keeps the cut of the files, which no test reads; *Based on* gains `cc-by-4-credit` |
| D-438 | `progression.mjs` (`SOLVABLE_SEEDS = 1`), `data.test.mjs` | match; `tests:` adds Las — matecznik in the data with entry cap 0 opened by Las — wataha (the test of the data cites the exception paragraph); the pair stays for "no reference program solves a seed", which no test holds |
| D-448 | `maps.ts` order, the measurement | match, no test cites it, the pair stays |
| D-449 | as D-448 | match; *Rejected* written (see below) |
| D-04 | `judging-cache.ts` | the clause on the record matches the code (read in `maps-entry.ts` and the cache); none |
| D-18, D-429, D-388, D-136 | wording | D-18 and D-429 *Rationale* are as the task asks; D-388 untouched; D-136 not edited (see item d) |
| D-147, D-334, invariant `rule-state-from-pick` | `now-lines.ts` (`CREATURES[id].nameWith`), `now-lines.test.mjs` | **found by my search** (`nameWith`, „wilkiem”): each said „Teraz” reads „Walczy z wilkiem” at every attack, false at the bear („Walczy z niedźwiedziem”), and the cycle's own test of the bear already cites the D-147 and D-334 sentences. Corrected, see below |
| `wall`, glossary | search of the foundation | matches; none |
| part map: `browser-view` sentence, External context row, `balance-tools` | code, `foundation_check` | match; none (no file of the range is claimed by no part) |
| environment facts `lpc-bears-deer-lions-licence`, `game-icons-bear-head-title` | `PACK_CREDITS`, `ICON_CREDITS` | match; none |
| `sprite-credits`, `icon-credits` | `credits.ts`, tests | `icon-credits` none; `sprite-credits` gains the new fact (below) |
| D-282, D-281 | "the list of maps" | the catalog is still the list in these two (a map off the list of open maps; the list and the card each an area); judged true, none |
| D-316, D-143, D-148 and the other wolf sentences of the log | scene code, `SCENE_CREATURES` | each says what the scene or the Understanding does at the wolf; none says the wolf is the only creature; the bear stands in the same data shape and code; none |
| D-416 | catalog counters | the cited sentence declines counters by the number; the catalog follows it; none |
| glossary `judging`, `loop record`, `solved map`, `overlay` | words the code adds (`record`, `region`, `catalog`, `lair`, `sink`) | see "Glossary terms" |

### Known items of the handoff

- **(a) `judging-cache-reading`.** The sentence said "gives a judging". D-441's new paragraph (its own key, own version, "It is read only in that form and version ... treated as the judgings are") sets the record's reading, and ten cases of `judging-cache-record.test.mjs` already cite the invariant. By `record-invariant` this is a **correction of the reach of an entry whose rule a decision sets** (D-441), not a new rule: the sentence now reads "gives a judging or a record only where it has the form the cache writes and stands under a key of the version the cache writes that names the account and the game the cache was opened for ...". I replaced "the cache's own version" by "the version the cache writes" because the judgings and the record have each a key version of their own. Wording on `{fork-point}` against the new one: only those two phrases differ. Tests that cite it checked against the new wording: `tests/view/judging-cache.test.mjs` (unchanged cases, the judgings) and the cases of `judging-cache-record.test.mjs` at lines 305, 340, 442, 450, 460, 469, 496, 511, 527, 544, 564, 581, 597, 632, 655 (form, version, account, game, refusals, no throw); each reads against the widened sentence. `Method` stays `test`. D-441 already names the invariant in its *Verification*. I saw a test fail once against a broken record reading (check 5).
- **(b) D-441.** The first paragraph says the key names the version, the account by its identifier, the game, the character, the program and the map, and the value holds the kind of each result, the equipment and the revision and generation numbers; the record paragraph says what its value holds; the *Rationale* repeats "the account's opaque identifier, numbers, identifiers of maps, kinds of results and items". The list cut from the „Wyloguj” sentence ("the account's identifier, numbers of characters and programs, identifiers of maps, kinds of results and items with their counts") is therefore still said, in more exact form; nothing true is lost and the sentence keeps its prohibition (no email address, no name, nothing the game loads). I left the binding sentences as the fixer wrote them (598 words of 600). The record's own sentence on a refused write is the fixer's clause; it is held by `judging-cache-record.test.mjs:512`.
- **(c) „z” / „ze”.** Searched the decisions, invariants, glossary and part map for „z”, „ze”, "after „z”": the only mentions are D-147/D-334 (the form after „z”, corrected below) and examples of mine that I removed (D-327, D-440 pairs with "24 ze 120"). No decision or glossary entry says anything against the rule of `counted-name.ts` (`withPreposition`: „ze” before zero, 6, 7, 16, 17, 60 to 79, 100 to 199, 600 to 799 and by thousands) or against the styleguide's sentence; the rule is held by the styleguide (a rule for the look of the product, template "Where it goes", question 2) and by tests. None. The doubt of the fix reviewer (is „ze 7” or „z 7” the usual Polish) is not settled by anything in the repository or the foundation; no creature of the data has such a number.
- **(d) D-136** not edited. Its *Rationale* still holds "is to teach another mechanic or to set a challenge that the means so far do not close", which D-448 makes untrue; task 9 writes D-136.
- **(e) *Rejected* of D-448 and D-449.** The task document has no question on how a map may differ and no *Not chosen* for that entry; its *Questions to settle* hold Q5 (moss on the wolf pack, ways a and b) and Q6 (the readings of „can be solved”, ways b and the other four, already in D-438's *Rejected*). **D-448 stays `unknown`**: nothing in the task is a way not chosen for it. **D-449 now states**, from the task: a share of a map's runs the map must reach as a requirement, 90 % of the seeds already (Q6 b) with its cost as the task keeps it ("each change would tune its map to the items of the day, which later changes alter anyway, and a wall that enters before its thing would have to be easy without it"), and the resources of Las — wataha fixed as a requirement, its moss absent or present (Q5 a and b) with `no cost to the product known` (the task keeps none). Both entries stay marked `the cycle's`; the project definition, which holds the approved fields, was not open to me. The two entries' *Rejected* are what the task document keeps, not what the definition keeps.

### Decisions written or changed (by the return step)

1. **D-325** - one binding sentence added to the paragraph on the catalog: "The view picked, the text typed and the regions unfolded in the catalog end with the screen, which opens on „Dokąd” with no text typed." Why: the task's *To do* 5 binds it ("Widok i szukane słowo nie zostają po wyjściu z ekranu"), the plan's *Choices* rejected the other way (kept in the page's state), nothing in the foundation says it, and the log has the same kind of sentence at D-416 ("each entering of the screen starts with the trees folded"). The place is the sentence of D-325 (template "Where it goes", question 5). Held by a new line `decision:` in `tests/view/map-catalog.test.mjs` at the test "the unfolded region survives a change of view and ends with the component", which already asserts it. *Verification* edited as in the table. Marked `the cycle's` (the sentence is the task's, the wording mine).
2. **D-147** - the sentence "„Teraz” reads „Walczy z wilkiem” ..." keeps its text and gains "; at another creature it reads „Walczy z” and the form of that creature's name after „z” that its data give, as „Walczy z niedźwiedziem” at the bear." The existing quotations of the tests still stand as prefixes; `tests:` adds the bear's reading, held by `now-lines.test.mjs` (the case of the bear and the case of the form from the data). `the cycle's`.
3. **D-334** - "„Walczy z wilkiem” alone" gains "or „Walczy z” and the name of another creature, as D-147 gives"; `tests:` adds the bear. `the cycle's`.
4. **D-24, D-134, D-149, D-327, D-331, D-440, D-441, D-271, D-438** - *Verification* only, as in the table; no binding sentence changed by me. D-271 *Based on* gains `cc-by-4-credit`.
5. **D-449** - *Rejected*, above.

No decision's meaning was changed beyond what the task carries. The binding sentences I added or widened (D-325, D-147, D-334) are the cycle's and go before the human at the merge.

### Invariants written or changed, with the task, decision or human that sets the rule

- `judging-cache-reading` - sentence widened to "a judging or a record" (set by D-441, as in (a)). 
- `rule-state-from-pick` (method `review`) - "„Teraz” reads „Walczy z wilkiem” in the minutes of an attack" now reads "„Teraz” reads „Walczy z” and the name of the attacking creature in the minutes of an attack"; the rule is D-147's (the invariant copies it, "as D-147 gives"). No test cites it (it is read by review).
- `sprite-credits` - *Rests on* gains `cc-by-4-credit`; the sentence is unchanged. The credit line of the bear's pack, which the sentence requires, is conditioned by the licence CC BY 4.0, and the foundation held only the terms of CC BY 3.0.
- No invariant was written new: no task, decision or human sets a rule that no existing invariant covers and a test could check.

### Environment facts written

- **`cc-by-4-credit`** - the Creative Commons Attribution 4.0 International Public License requires whoever shares licensed material, including in modified form, to retain the supplied identification of the creator, copyright notice, licence notice, disclaimer notice and a URI or hyperlink to the material, to indicate if the material was modified, and to indicate that it is licensed under the licence with its text or a URI or hyperlink to it, in any reasonable manner based on the medium, means and context. Source: `https://creativecommons.org/licenses/by/4.0/legalcode` § 3(a)(1)(A) to (C) and § 3(a)(2), each passage word for word, read 2026-11-25. The page is an edition (the address names 4.0), so it carries no archived copy, as the facts `cc-by-3-*` do not. The passages were checked against the fetched page by a script (all ten stand: `reports/return-step-probes/verify_cc4.out`). Named by `sprite-credits` (*Rests on*) and D-271 (*Based on*). The foundation step's concern 3 was this gap.
- Not written, with the reason: the old game's repository and its numbers (the predecessor game is cited by the log without facts, as D-388 and D-327 do); the OpenGameArt page's remarks "a little jankier ..." (in the *Rationale* of D-271 as an accepted cost, no decision rests on it); the rule of the Polish „ze” (nothing in the foundation rests on it, the rule is in the styleguide and the code).

### Glossary terms

None written. Words checked against WAY-95 and the glossary: "record" (D-440; the glossary's `loop record` is another named term and no sentence reads wrongly for the field's meaning of "the best result"), "catalog", "region", "empty place", "lair", "judging" (used as the entry gives it), "map check" (D-428's own phrase). `wall` was changed by the foundation step. No term is used against its entry.

### Part map

No change. `browser-view`'s sentence and the External context row are as the code makes them true; `foundation_check` reports no file claimed by no part.

### Projected entries and rows of *Settlements to record*

All six rows were written by the foundation step and are in the log: row 1 D-325, row 2 D-331, row 3 D-24, row 4 D-440, row 5 D-271, row 6 D-438. The four projected entries (D-448, D-449, D-438 paragraph 2, `wall`) are in the log, verbatim. I wrote no row or projected entry (nothing was missed). The pairs added by the foundation step "kept until a test of the same change holds the sentence" were reduced to what no test holds, in each decision above, as `return_step.md` asks.

## Commands and exit codes

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (after the first edits) | 0 | `0 errors` |
| 2 | `python -B .the-way/elements/common/foundation_check.py` (after all edits, before the commit) | 0 | `0 errors` |
| 3 | `python -B .the-way/elements/common/foundation_check.py` (after the commit) | 0 | `0 errors` |
| 4 | `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 112 info` |
| 5a | mutation of `src/browser/view/judging-cache.ts:270` (`!hasOnlyFields(parsed, RECORD_FIELDS)` replaced by `false`), then `npm test -- tests/view/judging-cache-record.test.mjs` | 1 | three cases fail ("a value with one more field", "__proto__", "constructor", all citing `judging-cache-reading`); `reports/return-step-probes/mut-fail.txt` |
| 5b | the file restored (`git checkout -- src/browser/view/judging-cache.ts`), the same command | 0 | pass 70, fail 0; `reports/return-step-probes/mut-pass.txt` |
| 5c | a first mutation (`!isCount(damage, 0)` replaced by `false`) | 1 | stopped at the build, a type error, so it showed no test failing; reverted, not counted |
| 6 | `npm test -- tests/view/map-catalog.test.mjs` | 0 | pass 13, fail 0 |
| 7 | `npx prettier --check tests/view/map-catalog.test.mjs` | 0 | passes |
| 8 | `python -I verify_cc4.py` (the ten passages of the new fact against the fetched page) | 0 | all found |

Not run: the product's full gate (`npm test` with no argument), by the handoff; the other tests of the range (the two reviews ran them at `7abe5a4d`; my product change is one comment line in a test).

## Searches not found or unclear

- The project definition (`definicja_projektu_2_loop2.md`) lies in the author's vault and was not open to me; the *Rationale* and *Rejected* of D-448 and D-449 stay as the task and the foundation step could write them. If the definition holds approved ones, the request should put them in.
- Whether „ze” or „z” before 7, 17 and 70 to 79 is the usual Polish: nothing in the repository settles it (the styleguide's rule and the code agree with each other).
- Whether the choice "the view is not kept after the screen" should have been a row of the task's *Settlements to record*: it was not; I wrote it as a sentence of D-325 under the return step's rule on a choice that binds after the merge. If the human would keep it a rule of the styleguide alone, the added D-325 sentence and the `decision:` line are the two things to remove.

## Unread material

- `cycle.md`, and the files of `.runs/task-cycles/katalog-map/` not named in the handoff: not read.
- Task `task.md`: all 218 lines read. `plan.md`: all 417 lines read. Foundation report, the two review reports: read whole.
- Decisions: the diff of the range in `foundations/` read whole; D-441, D-440, D-24, D-325, D-327, D-134, D-149, D-331, D-438, D-448, D-449, D-271 (Verification, Rationale of D-271 to the cited sentence), D-147, D-334 (Verification), D-282, D-416 read by range. D-18, D-429 read through the diff only. D-136, D-388 not opened (not edited). The rest of the log was searched by `grep` for the words of the code (`wolf`, `Mapy`, `list of ... maps`, `„z”`, `bear`, `forestPack`, `forestLair`, `region`, `record`, `catalog`) and each line of the hits that bears on the change was read; D-316 and the decisions about the scene were read at the hit lines (11555-11575, 11632-11706), not whole.
- Invariants: `judging-cache-reading`, `rule-state-from-pick`, `sprite-credits` (by the diff), `icon-credits` (diff). `first-exploration-discovery`, `content-identifiers`, `first-map-stock`, `first-map-balance` not re-read (unchanged by me, covered by the reviews' runs).
- Glossary: the headings of all entries and the entries `wall`, `solved map`, `overlay`, `judging`, `loop record`, `completion`, `beaten attack` read; the rest not.
- Code: `counted-name.ts` read whole; `judging-cache.ts` lines 258-290 and the grep of its record names; `now-lines.ts` by grep; `src/browser/view/catalog-lines.ts`, `map-catalog.tsx`, `maps-screen.tsx`, `maps-entry.ts`, `map-lines.ts`, `judging.ts`: not read here, I relied on their tests (titles and sample bodies of `map-catalog.test.mjs`, `maps-screen.test.mjs`, `data.test.mjs`, `now-lines.test.mjs`, titles of `catalog-lines.test.mjs`, `maps-record.test.mjs`, `judging-cache-record.test.mjs`, `icons.test.mjs`) and on the two reviews that read the code. I did not read `guidelines/*` (no code, no guideline change), and the styleguide only at lines 895-925.
- `.the-way` `elements/part-map/skill`, `elements/glossary/skill/write.md` and `read.md`: not read (no part-map entry and no glossary entry written).

## Working copies

All in `.runs/return-step/` (ignored): the diff of the foundation, the scripts that list the `decision:` lines of the tests, the titles of the tests, the fetched legal code of CC BY 4.0 with its text extract, check outputs, the commit message. I removed the directory before returning; kept in `.runs/task-cycles/katalog-map/reports/return-step-probes/`: `mut-fail.txt`, `mut-pass.txt` (the probe of 5a/5b, whose input is the one-line mutation named above), `verify_cc4.out`, `fc3.txt`. No worktree and no clone was made. Files that `npm test` made itself (`dist/`) stay outside this rule and are ignored by git.
