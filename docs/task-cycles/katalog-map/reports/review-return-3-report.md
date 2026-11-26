FAIL 20b4471f2b699e70eddb0f7a64ae7f13f98b5eef

# Review of the return step's commits (return step 3), task `katalog-map`

- Worktree `the task's worktree`, branch `task/katalog-map`. `git rev-parse HEAD` = `20b4471f2b699e70eddb0f7a64ae7f13f98b5eef`, the head given.
- Range `1e44e946..20b4471f`: one commit, `20b4471f`, one file, `guidelines/styleguide-browser-view.md` (+2/-1), the item for a value taken from loop in the rule "Every value with its source" (lines 417-420).
- `.the-way` at `301e4eae1111310ccd80e466f62ea01838b9ff88` = the gitlink `git ls-files --stage -- .the-way` records.
- Method: `.the-way/task-cycle/review/SKILL.md`, read whole. The return step's method `.the-way/task-cycle/skill/return_step.md`, its handoff and its report, read whole.

Counts: blocking 1, Minor 2, out of scope 0.

## Findings

### Important

**I1. The doc comment of `MapCard` restates D-327 as it stood before the fix.**
Place: `src/browser/view/map-card.tsx:100-106` (in the fix range `523046f6..8725b92d`, commit `69d98b19`, left unchanged by `bf3e933a`; outside the return step's commits, inside the task).

The comment reads:

```
 * The card of a map (D-327): a heading with the map's name, the tag of its state and its opener, and at
 * its right „Wejdź — wybierz postać”, which takes the player to „Kto idzie”; under it the one sentence of
 * the solving condition; then two columns, ...
```

D-327 as the fix wrote it (`foundations/decisions.md`, D-327, first paragraph) says: "under the heading stands the one short sentence of what the map demands, written by hand in the map's data", and puts the sentence of the solving condition under the table of „Żąda” (D-133: "in its part „Żąda”, under the table"). The code a few lines below does that (`map-card.tsx:147` `goalSentence`, `:152` `solvingSentence` inside „Żąda”), and the module header (`map-card.tsx:1-8`) says it right. Only the function's doc, which names D-327, still restates the old D-327.

Why it matters: the fix changed D-327 and left a file of the change restating it differently. By WAY-263 (section 3 of the method) that is Important. The next agent that changes the card and reads the doc of the component it edits learns a layout that D-327 no longer has. The return step could not correct it, since it changes no code. Its report names it as open point 3.

Evidence: the search over `src/` and `tests/` for `sentence of the solving|under (its|the) heading|after the name|font-size-map-title|size of the title of a map`. This is the only stale restatement of D-327 or D-133. The other hits are true: `maps-screen.css:226`, `maps.ts:66`, `map-lines.ts:32`, `tests/view/map-lines.test.mjs:34` and `tests/view/maps-screen.test.mjs:374`.

Fix: change "under it the one sentence of the solving condition" to say the short sentence of the map's demand from its data stands under the heading, and the sentence of the solving condition closes „Żąda”, as the module header does.

Contradiction: yes. D-327, the sentence "under the heading stands the one short sentence of what the map demands, written by hand in the map's data", and D-133's "in its part „Żąda”, under the table".

### Minor

**M1. The rule's item now holds the state of one token, a copy of its `Source:` comment, and "z elementem" can be read as tied only to the card's title.**
Place: `guidelines/styleguide-browser-view.md:417-420`, commit `20b4471f`.

The item now reads „dla wartości wziętej z gry loop — działająca gra loop pod https://kantarion.bieda.it/, odczytana 2026-10-20 z wyrenderowanej strony, a dla rozmiaru tytułu karty mapy (`--font-size-map-card-title`, D-327) 2026-11-26, z elementem, z którego wartość wzięto;”.

1. `product-guidelines/template.md`, "A rule lists no state and repeats no decision or value", forbids a sentence that lists what the code is today or copies a value. The token's name and its reading date already stand in `src/browser/tokens.css:59`, and now stand twice. The next loop value read on another day changes the rule again, or the rule drifts.
2. After the elliptic "a dla … 2026-11-26," the closing „z elementem, z którego wartość wzięto” can be read as belonging to the card-title clause alone. It is less clearly the requirement of every loop value, which it was before the commit.

Why only Minor: the content agrees with the code. The rule already carried dates and one token by name (`--bar-width`, 2026-11-02, 2026-11-11, 2026-11-12) before this commit. The Good line (403) keeps the element as a general requirement. WAY-364 makes a departure from the template's form Minor where the content agrees.

A wording that keeps the rule free of state: „…działająca gra loop pod https://kantarion.bieda.it/, odczytana z wyrenderowanej strony, z datą odczytu i z elementem, z którego wartość wzięto;”. The dates then stand only in the comments of `tokens.css`.

**M2. The header comment of `src/browser/tokens.css` defines "loop" as read on 2026-10-20 only.**
Place: `src/browser/tokens.css:4-6` (fix range, commit `bf3e933a` added line 59 and left the header; outside the return step's commits, inside the task).

The header reads: '"loop" is the running game https://kantarion.bieda.it/, read 2026-10-20 from the rendered page'. Line 59 reads "Source: loop, https://kantarion.bieda.it/ read 2026-11-26 …". The line's own comment names its date, so no value is read with the wrong date. The header's definition is now untrue for one token, which is why Minor. Fix: drop the date from the header's definition, or name both dates.

## Checks of the handoff

1. **The added words are true.** `src/browser/tokens.css:59`: `--font-size-map-card-title: 22px; /* Source: loop, https://kantarion.bieda.it/ read 2026-11-26 from the rendered page: the title of the card of a map, the element h1 „Skraj lasu” at /mapy/forestEdge, its computed font-size 22px */`. The comment names the old Loop's page, the reading from the rendered page, the date 2026-11-26 and the element. The styleguide item names the same page, the rendered page, 2026-11-26 for that token, and "z elementem". They say the same thing. The other 2026-10-20 loop tokens (lines 10-12, 17-19, 23-27, 30-34, 37-38, 40, 54-58, 60) keep their date, so the item's "2026-10-20" for the rest stays true. Holds, with the form remarks of M1.
   Not verified: whether the live page really renders 22 px today. My handoff asks for the naming, not the reading. The rule gives the truth of a token's source to the review of the change of the token file, which is the fix's review, `review-whole-4`, not read by me.
2. **Agreement with the rule and with the invariant `design-token-sources`.**
   - Read: `foundations/invariants.md:508-516` and `tests/invariants/test_design_token_sources.py`, both whole.
   - The invariant asks only for a comment opening `Source:` with further text on the line of the `;`. Line 59 holds it. The rule's first paragraph (406-411) restates the invariant's form, and the new item does not touch it.
   - The rule's last paragraph (445-448) says that a new value gets its source in the same change, taken from what was settled with the human. The source kind "the running loop, read from the rendered page" was settled before. The value is a reading of it. No contradiction.
   - The intro (413-415) lists the kinds added later. A new date of an existing kind is no new kind, so the intro stays true.
   - Ran `python -B -m unittest discover -s tests/invariants -p test_design_token_sources.py -v`: exit 0, 2 tests OK.
   - The invariant test was not changed in the range.
3. **No entry left unwritten or uncorrected (fix range `523046f6..8725b92d`, `git diff` read for `foundations/decisions.md`, the styleguide, `maps-screen.css`, `maps.ts`, `map-lines.ts`; `map-card.tsx` read whole).**
   - D-327 (read whole) agrees with the code in every point I checked. The title is at `--font-size-map-card-title` with `--font-weight-body` (`maps-screen.css:252-253`). `goalSentence` stands under the heading (`map-card.tsx:147`) from `goalText` in the data (`maps.ts`). „Żąda” closes with `solvingSentence` (`:152`) in `text-secondary` at the detail size (`maps-screen.css` `.maps-card-condition`). The *Verification* example of 22 px versus 15 px matches tokens 59 and 58.
   - The departure sentence "in six things only" is not reported again, by the human's decision.
   - D-133 (read whole) agrees: the condition is in „Żąda”, under the table.
   - D-18 (whole) and D-24 (whole) agree. `goalText` is a text of a map's data row, which is what D-18 asks. D-24 does not list display texts (`solvingText` and `completionText` are not listed there either), so the new field departs from nothing.
   - Part map: `map-card.tsx` falls under `src/browser/view/**` of `browser-view`. Agrees.
   - Glossary: "solved map", "streak" and "beaten attack" were read. The short sentences' „pokonane wilki” is a beaten attack in the entry's sense, and no term is used against its entry.
   - The return step's "what matched without change" holds. The one disagreement I found between D-327 and the code is the code's doc comment (I1), which the return step may not change and which it reported. No foundation entry is missing or wrong.
4. **Foundation and instruction checks.**
   - `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
   - `python -B .the-way/instruction-files/check_instructions.py`: exit 0, "0 error, 0 warn, 120 info".
   - No warning.

## Other checks run

- `git diff 1e44e946..20b4471f`, `git log 1e44e946..20b4471f`: one commit, one file.
- `git log --oneline 523046f6..8725b92d`, `git diff --stat` and `git diff` of the fix range, as above.
- `git status --short` before and after the checks: clean, nothing changed in the reviewed worktree.
- The template comparison for a change of guidelines (method section 2): the changed item compared with `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md`, both read whole. Finding M1.
- The return step's unclear question on Prettier: `tests/quality/test_quality_invariants.py:18-28` (`PRETTIER_PATTERNS`) covers `src/`, `scripts/`, `tests/` and `balance/` only, so `guidelines/*.md` is in no Prettier gate. The return step's Prettier exit 1 on the styleguide is no gate's failure.

Not run: the product's full gate (handoff); the tests of the code (no code in the range).

## Considered, no finding

- D-327's "the mean gap between attacks counted with it" is the New Minor of `review-whole-4`, which the return step reported as open point 2. The sentence is true. It is ambiguous, not out of agreement with the code. I did not grade it again.

## Declined to judge

- `src/browser/tokens.css:20`, `--condition-unmet`, carries "Source: loop" without the page, reading date or element the rule's item asks for. It predates this task.
- `--touch-target-min`, whose source is an environment fact, a kind the rule's list does not name (the return step's unclear point). It predates this task.

## Reaches beyond the dispatch

- `guidelines/styleguide-browser-view.md`, read whole (lines 1-1595): the method reads a guideline file whole (WAY-213), and the range changes it.
- `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md`, whole: method section 2, for a change of a product's guidelines.
- D-38, whole (`foundations/decisions.md:4987`): the rule's *Decision* and the invariant's *Derives from*.
- `src/browser/tokens.css:1-62`: to check the other loop dates and the header (M2).
- `src/browser/view/map-card.tsx`, whole: check 3, D-327 against the code (I1).
- `foundations/part_map.md:1-40` and the glossary entries "solved map", "streak" and "beaten attack": check 3.
- `package.json` "test" script and `tests/quality/test_quality_invariants.py:18-28`: to settle the return step's unclear Prettier point.
- A Grep over `src/**` and `tests/**` for the old wording of D-327 and D-133: to find every stale restatement (I1).

## Working copies

None made. The directory `.runs/review-return-3/` was not created. All checks ran read-only in the reviewed worktree.

## Unread material

- Of the dispatch: none. Read whole: the handoff, the method, `return_step.md`, `return-step-3-report.md`, `return-step-3-handoff.md`, the diff of the range, `foundations/invariants.md` entry `design-token-sources`, `tests/invariants/test_design_token_sources.py`, D-327, D-133, D-18, D-24.
- Of the fix range: the diffs of `map-card.tsx` (read whole instead), `maps-screen.tsx`, `tests/sim/data.test.mjs`, `tests/view/map-lines.test.mjs`, `tests/view/maps-record.test.mjs` and `tests/view/maps-screen.test.mjs` were not read as diffs. The tests were reached only by the Grep above. Check 3 asks for agreement of the entries with the code, which the code files read settle.
- Not read, by the handoff: `cycle.md`, `review-whole-4-report.md`, `correction-2-remarks.md`, `findings-whole-2.md`, `fix-whole-2-report.md`, `task.md`.

## Searches not found or unclear

- Whether the old Loop's page renders the card title at 22 px today: not checked by me (see check 1). The reading's truth belongs to the fix's review, which I was not given.
- Whether I1 was graded in `review-whole-4-report.md`: unknown, since that report is not mine to read. The return step lists it as its own open point 3, which suggests it was not.
