done with concerns

# Report - the return step of the fix of correction 1, task `katalog-map`

- Worktree `the task's worktree`, branch `task/katalog-map`. Code head at the start `8725b92d` (later commits of the branch only add and remove the copy of the cycle's record; confirmed with `git log`). Range compared: `523046f6..8725b92d`. Nothing pushed. The product's full gate was not run (handoff). No product code changed (stage rule).
- Commit (one, by path): `20b4471f` - `guidelines/styleguide-browser-view.md` (+2/-1): the rule "Every value with its source", its item for a value taken from loop, now names the second reading date and the one value it belongs to.
- Method read whole: `.the-way/task-cycle/change/SKILL.md`, `task-cycle/skill/return_step.md`, `foundation_step.md`; of the environment fact element `SKILL.md`, `template.md`, `decide_entry.md`, `read.md`, `draft.md`, `write.md`; `product-guidelines/styleguide/SKILL.md`. Read whole: the handoff, `return-step-2-report.md`, `fix-whole-2-report.md`, `review-whole-4-report.md`, `correction-2-remarks.md`, `findings-whole-2.md` (first 80 lines, the whole of B1, B2 and the Minor findings).

## Return step items

### Foundation compared with the code (this fix only)

| Entry | Compared with | Result |
|---|---|---|
| D-327 | `map-card.tsx` (heading, `goalSentence`, „Żąda” closing with `solvingSentence`), `maps-screen.css` (`.maps-card-name` at `--font-size-map-card-title`, `--font-weight-body`; `.maps-card-goal` in `text`; `.maps-card-condition` in `text-secondary` at `--font-size-detail`), `sim/data/maps.ts` (`goalText` of the five maps), `map-lines.ts`, the tests that quote it | The binding sentences of the first and second paragraph (title size and weight, the short hand-written sentence in the map's data, „Żąda” with the condition closing it, the button) match the code. The `tests:` clause matches the tests (short sentence from the data, condition closing „Żąda”, tables, columns, tag, button, record). The quotations of the tests ("The card of a map follows the card of the predecessor game", "It departs from the card of the predecessor game, beyond its words and the roles of its parts, in six things only") are still the beginnings of the binding sentences. The pair stays: no test holds the title's 22 px (searched `tests/` for `maps-card-name`, `font-size-`: only text assertions), the colours or the phone columns. **Not changed, by the human's decision:** the departure sentence, untrue by R1 of `review-whole-4-report.md` (see "Open points"). |
| D-133 | `solvingSentence`, `map-card.tsx` (`.maps-card-condition` in „Żąda”), the tests | "in its part „Żąda”, under the table" matches; the `tests:` text ("the sentence of each map's solving condition standing in its data and on its card in „Żąda”") matches `maps-screen.test.mjs` and `data.test.mjs`. The quotations of the tests (`decision: D-133 "The card of each open map shows the sentence of its solving condition from the map's data"`) are a still-true beginning. None. |
| D-18, D-24 (new data field `goalText`) | the type `MapDef` and the five rows | D-18 puts a map's content in data files; a text of a map's row is that. D-24 lists the fields of a map's data and names neither `solvingText` nor `completionText`, which already stand in the rows, so the field is no departure from it; D-327 names the field ("written by hand in the map's data"), which is where it is bound. `test_content_identifiers.py` was run by the fix and the review (0). None. |
| invariant `design-token-sources`, D-38, the styleguide's rule "Every value with its source" | `tokens.css:59` | The invariant asks for a comment opening `Source:` on the line of the `;`: held (the review ran `test_design_token_sources.py` -> 0). The rule's item for a loop value asks for: the running game at https://kantarion.bieda.it/, read from the rendered page, with the element. The comment names all three, and the date 2026-11-26. The rule named **2026-10-20** as the date; the other 25 loop tokens carry it. **Corrected** (commit `20b4471f`): the item now reads „…odczytana 2026-10-20 z wyrenderowanej strony, a dla rozmiaru tytułu karty mapy (`--font-size-map-card-title`, D-327) 2026-11-26, z elementem, z którego wartość wzięto;”. The rule's sentence is the cycle's wording; the value and the source are the ones the fix's report names (read in a real browser, `article h1`, `22px`). |
| the styleguide's card item (lines 917-934) | CSS and `map-card.tsx` | the title at `--font-size-map-card-title` and the text weight, the short sentence in `text`, the condition under „Żąda” in `text-secondary` at the size of a detail: true of the code. None. |
| the rest of the styleguide, other entries naming the card | searched `foundations/` and `guidelines/` for `font-size-map-title`, `map-card-title`, "title of a map", "tytułu mapy", "solving condition" with "under the heading", "pod nagłówkiem", "zdanie warunku", `MapCard`, `CHOOSE_TEXT`, `maps-screen` | `--font-size-map-title` (15 px) is still the title of a map run's header (`run-screen.css:219`); D-327's violating example names it as such. D-325, D-328, D-329, D-333, D-396, D-440 do not speak of the card's sentence or title size. The hits in decisions 5903 and 10234 are D-133 itself and a past-tense Rationale ("When this was decided"). None. |
| part map | `foundations/part_map.md` | `map-card.tsx` stands under `src/browser/view/**` of `browser-view`; no file moved out of a claim. None. |
| `guidelines/coding-browser-module.md`, table "Files of this kind" | the table | lists `maps-screen.tsx` and not `map-card.tsx`, `map-catalog.tsx`, `catalog-lines.ts`; the foundation check passes. The gap predates the fix (return-step-2's report notes 14 files missing). Not changed here: the table is no foundation entry and a status for a file is for the owner of the guidelines. |
| glossary | headings of `foundations/glossary.md`; "beaten attack" read | the five sentences say „pokonane wilki” where the condition says „pokonane napaści wilka”; the glossary says a beaten attack is an attack in which the creature reaches zero health, so a defeated wolf is a beaten attack. No term used against its entry. None written. |
| invariants | `foundations/invariants.md`, searched for card, sentence, token | `design-token-sources` only (above); no invariant speaks of the card's sentence. None. |

### Decisions, invariants, environment facts, glossary terms, part-map changes, projected entries, rows of settlements

- **Decisions:** none written or changed. D-327 and D-133 are already as the fix wrote them; D-327's departure list stays as it is (decision of the human).
- **Invariants:** none.
- **Environment facts:** none written. The old Loop's page as a source: `foundations/environment_facts.md` holds no entry about it (searched `kantarion` in `foundations/`: hits only at `foundations/decisions.md:1670` (screenshots) and `:1733` (the deployment address), never as a fact); the 25 loop tokens read 2026-10-20 have none either, because the source was settled in D-38 / the styleguide's rule, not cited. A fact "stands only while an invariant's *Rests on* or a decision's *Based on* names it" (template, "Which facts are written"), and D-327 has *Based on: none* and says only "the size and weight of the predecessor's card title" - it would not be called in question by a new size on the old page, only its example "22 px" would age. So the 22 px is held by the token's `Source:` comment and the rule, as for the 25 earlier values. If the human wants it a fact, it needs a *Based on* in D-327 first.
- **Glossary terms:** none.
- **Part-map changes:** none.
- **Projected entries, rows of *Settlements to record*:** none missed; the fix's entries are the human's remarks, which the cycle's rule makes `the cycle's`.
- **A choice that binds after the merge:** the choices of the fix are all written: the title's size and weight (D-327, token, styleguide), the hand-written short sentence in a map's data (D-327), the condition in „Żąda” (D-327, D-133). The module `map-card.tsx` and the wording of the five sentences are no binding choice (the wording is the human's to change, the review says so).

## Open points (for the orchestrator, none decided here)

1. **R1 of `review-whole-4-report.md`.** D-327's sentence "It departs from the card of the predecessor game, beyond its words and the roles of its parts, in six things only: …" is untrue by R1: the predecessor's heading holds the icon of the attacking creature, which this card's does not, and on a phone the predecessor stands its entry button in a bar pinned to the bottom. Left as it is, by the human's decision (correction-2 remarks: the code and D-327 stay, item 8 of the To do of task 4 takes it). Four tests quote "…in six things only" (`map-lines.test.mjs:272, 311`, `maps-record.test.mjs:230, 463`, `maps-screen.test.mjs:354, 401, 457`), and each holds a quotation that stays true as text while the list does not.
2. **New Minor of the review (`review-whole-4-report.md`, "New Minor").** D-327, first paragraph, "the mean gap between attacks counted with it": the trim to 300 words made "it" refer to "one total number" as readily as to "the quiet time". Not changed: the return step's reach is what no longer matches, and the sentence is true; a restoring "counted with that quiet time" is two words more (the paragraph is at 297, the limit 300). If the orchestrator wants it, it is a change of a binding sentence through `record-decision`, and the `tests:` clause is untouched.
3. **A stale doc comment in code** (not touched, no code in this stage): `src/browser/view/map-card.tsx`, the doc of `MapCard`, says "under it the one sentence of the solving condition"; the card shows there the short sentence of the demand and the condition closes „Żąda”. The header of the module is right.
4. The date in the rule was corrected as above; the rule is the human's from 2026-10-20, so the human sees the added item at the merge together with the token.

## Commands and exit codes

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `python -B .the-way/elements/common/foundation_check.py` (after my edit, staged) | 0 | `0 errors` |
| 2 | `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 120 info` |
| 3 | `python -B .the-way/elements/common/foundation_check.py` (after the commit `20b4471f`) | 0 | `0 errors` |
| 4 | `python -B .the-way/instruction-files/check_instructions.py` (after the commit) | 0 | `0 error, 0 warn, 120 info` |
| 5 | `npx prettier --check guidelines/styleguide-browser-view.md` | 1 | warns on the table of the Roles at lines 14-41, which my edit did not touch; the file at `8725b92d` gives the same diff (`git show 8725b92d:… \| npx prettier --stdin-filepath …`). Prettier is not a gate of the markdown here (the file is no input of `npm test`'s format check as far as the fix's and the reviews' runs show); named for completeness. |

`git -C .the-way rev-parse HEAD` = `git ls-files --stage -- .the-way` = `301e4eae1111310ccd80e466f62ea01838b9ff88`. Not run: the full gate (handoff), the tests of the code (no code changed).

## Working copies

`.runs/return-step-3/` under the worktree root held one prettier output of the styleguide; removed with `rm -rf` on its full path (`.runs/return-step-3`). Two temporary copies of the styleguide in `.runs/` (`sg-copy.md`, `sg-base.md`) were removed with `rm -f` in the same step. No worktree, no clone. One of my commands wrote a copy of the styleguide at HEAD to `/tmp/x.md` by a shell redirect, outside the worktree, before I had weighed the rule on working copies; I removed it with `rm -f /tmp/x.md` (checked: gone).

## Unread material

- Read whole: the handoff, the three method files, `return-step-2-report.md`, `fix-whole-2-report.md`, `review-whole-4-report.md`, `correction-2-remarks.md`, D-18, D-24, D-38 (whole), D-327 (whole, in the diff and in the log text), D-133 (the paragraph and *Verification* by the diff; its *Rationale* by range 5890-5910 only), the invariant `design-token-sources`, the styleguide's rule "Every value with its source" (lines 399-447) and the card item (lines 917-945), the glossary entries "solved map", "streak", "beaten attack", the whole of `map-card.tsx`, `maps-screen.css` by its diff and lines 262-300, `map-lines.ts` by its diff, `maps.ts` and `tokens.css` by their diffs, the environment-facts template and its `SKILL.md` with `decide_entry.md`, `read.md`, `draft.md`, `write.md`, the styleguide skill's `SKILL.md`.
- Read in part: `findings-whole-2.md` (first 80 lines, which hold every finding); the tests by `grep` and the lines cited (`data.test.mjs:36-75`, `map-lines.test.mjs:30-66`, `maps-screen.test.mjs:345-420`), not whole; D-133's *Rationale* and *Rejected*; the whole log by search only (`font-size-map-title`, `map-card-title`, "solving condition", "under its heading"), as listed.
- Not read: `guidelines/coding.md`, `testing.md`, `src/browser/AGENTS.md` (no code written); `reports/review-whole-3-report.md`; `cycle.md`.

## Searches not found or unclear

- A fact of the foundation for the old Loop's page as a source of a token: not found (and by the template's rules none is due, see above). Unclear: whether the human wants a fact there at all, since the 25 earlier loop values have none.
- Whether the styleguide's rule should have been extended for the 2026-11-21 token `--touch-target-min` too (its `Source:` names an environment fact, a source kind the rule's list does not name): not part of this fix; noted, not changed.
- Prettier's markdown check of `guidelines/styleguide-browser-view.md` fails already at `8725b92d`; whether any gate runs it is unclear (not found in the fix's or the reviews' command lists).
