PASS be5bebc7d85495cba14944f5d69d53a81890dac9

# Review of the return step's commits, task `katalog-map`

Range `7abe5a4d616c414f323a799a73280eaf3d034f43..be5bebc7`; `git rev-parse HEAD` = `be5bebc7d85495cba14944f5d69d53a81890dac9` (confirmed: the head the commit list ends at). One commit, `be5bebc7`, touching `foundations/decisions.md`, `foundations/environment_facts.md`, `foundations/invariants.md` and one comment line in `tests/view/map-catalog.test.mjs`. No screenshot file, no product code in the range.

Blocking findings: 0. Minor: 2. Out of scope: 0.

## Findings

### Minor

**M1. The new binding sentence of D-325 is wider than the task's** — `foundations/decisions.md:10200`, the last sentence of the second paragraph of D-325: "The view picked, the text typed and the regions unfolded in the catalog end with the screen, which opens on „Dokąd” with no text typed."
- The task binds two things in *To do* 5: "Widok i szukane słowo nie zostają po wyjściu z ekranu" and, as the default view, „Dokąd”. The sentence adds a third: the regions unfolded. The task document I was given does not say it.
- It is true of the code (`src/browser/view/map-catalog.tsx:225-227`: `view`, `query` and `unfolded` are three `useState`s of the one component) and held by the test `the unfolded region survives a change of view and ends with the component` (`tests/view/map-catalog.test.mjs:172-197`: mounts anew, asserts „Dokąd” pressed, `field.value === ""`, the group folded). The decision log has the same kind of sentence at D-416 ("each entering of the screen starts with the trees folded", `foundations/decisions.md:4823`), so the extension is the consistent one.
- Why it stays Minor: the sentence says no more than the code does and the test holds, and it keeps a rule the task states for the view and the word; the widening is the part the human did not name. The return step marks it `the cycle's` and says so ("Searches not found", third item), so the request puts it before the human. If the human wants only the two things the task names, the words "and the regions unfolded" and the clause in the `tests:` and the `decision:` line change together.
- I could not check the report's claim that the plan's *Choices* settle this (the plan is not in my dispatch).

**M2. The *Rejected* of D-449 re-targets ways the task keeps for other questions** — `foundations/decisions.md:6181`.
- The first way ("a share of a map's runs that the map must reach as a requirement, of 90 % of the seeds already, measured with what the game gives when the map enters — each change would tune its map to the items of the day, which later changes alter anyway, and a wall that enters before its thing would have to be easy without it") is the task's Q6 *Not chosen* b, whose question is how one map check reads „can be solved”, not which numbers are requirements; the same way, with the same reason, already stands in D-438's *Rejected* for its own question (`foundations/decisions.md:6149`). The reason text is the task's, nearly word for word.
- The second ("the resources of Las — wataha fixed as a requirement, its moss absent or present — no cost to the product known") joins Q5's two *Not chosen* options (a: no moss, b: moss), which the task keeps as ways nobody chose because "Mariusz zdjął wymagania co do map". "Fixed as a requirement" is the writer's wording; no task passage names that as a rejected way.
- The decisions template (`.the-way/elements/decisions/template.md`, bullets on `*Rejected*`) gives a decision marked `the cycle's` `unknown` unless a statement of the human names the ways weighed, and says a way the writer derives never enters it. The text above is the task's words, so I do not call it invented, and the author says it is not the definition's (the definition was not open to the author). It is graded Minor because the report discloses it, nothing in code or in another entry rests on it, and a reader is not misled about what the entry binds (the binding sentence is untouched). A reader could take the second way as one the human weighed for this question; `unknown` would not give that impression. D-448's `unknown` (no way in the task) is correct.

### Notes (no grade)

- The *Verification* of D-149 (`foundations/decisions.md:5995-5999`) and of D-441 (`:12296-12311`) hold long unwrapped lines where the edit joined text; cosmetic only.
- D-334 says "„Walczy z” and the name of another creature" where D-147 says "the form of that creature's name after „z”"; the code (`src/browser/view/now-lines.ts:87`, `Walczy z ${CREATURES[id].nameWith}`) uses the data's form, so D-147 is exact and D-334 is a looser pointer to it ("as D-147 gives"). Not a departure.

**Declined to judge:** none set aside as outside the task. The D-136 *Rationale* sentence that D-448 makes untrue (`foundations/decisions.md:5983`) is outside the task (task 9 writes D-136) and outside this range; not graded.

## The specific checks of the dispatch

1. **Every `tests:` clause names a test that exists and holds the sentence; each pair left stands for a part no test holds** — read against the tests, passes. For D-325, D-331, D-134, D-149, D-24, D-327, D-440, D-441, D-271, D-438, D-147, D-334 I listed the `decision:` lines per decision (`grep -rn "decision: D-xxx" tests`) and opened the tests each clause names:
   - D-325: counter and regions `tests/view/catalog-lines.test.mjs:71-` and `tests/view/map-catalog.test.mjs`; the sentence of nothing found `catalog-lines.test.mjs:246,274`, `map-catalog.test.mjs:340`; empty places `map-catalog.test.mjs:199-` and `catalog-lines.test.mjs:280`; the number in the row `tests/view/maps-record.test.mjs:146,249` and `catalog-lines.test.mjs:319,356`; view/text/unfolded `map-catalog.test.mjs:172`. The pair keeps only the left/right and phone-layout placement; no test in `maps-screen.test.mjs` or `map-catalog.test.mjs` reads a layout (grep for layout, phone, 360 and "side by side" finds only comments).
   - D-331: circle filled/empty and no „rozwiązana” after the name `map-catalog.test.mjs:98-110`, `maps-screen.test.mjs:269-294`; the pair keeps the roles `text-secondary`, `text-strong`, `selected`, and no test of `map-catalog` or `maps-screen` reads those for the row (grep).
   - D-134: the card's mark `maps-screen.test.mjs:424-434`; the circle as above; the pair keeps only the role `positive` of the card's mark, which no test reads.
   - D-149: `catalog-lines.test.mjs:280-294` (counter over all maps, empty places, none while a search is typed), `map-catalog.test.mjs:199-` (no name, `aria-hidden`, no link), `maps-screen.test.mjs:226,316` (absent from the catalog, no card); the pair was removed because the tests hold all of it; the one reach I could not close is "no name anywhere on the screen", which the tests hold in the catalog and the card only (rows, empty places, card), the places the name could stand.
   - D-24: `tests/sim/data.test.mjs:89-104` (the region of each map, one of `REGIONS`).
   - D-327: `maps-record.test.mjs:249` (the number at the record creature, on that map's card alone); the removed example "or as „0”" contradicted `maps-record.test.mjs:223` (a first judging that took nothing stands as 0), so removing it is right.
   - D-440: `tests/sim/judging.test.mjs:541,561,590,604,615` (the whole health for a fight won, the health lost where the character died, 0 for no fight / a fight cut off / a map with no creature, the largest of twelve); `maps-record.test.mjs:146-457` (row and card, never before the first judging, raised/left, kept through a change of program and loss of the character, nothing at other numbers of the creature).
   - D-441: `tests/view/judging-cache-record.test.mjs:135-679` (own key and version, form, never lowered, refused write `:510,526,543`, opening `:596,631,654`); the pair for „Wyloguj” stays and no test of the cache or of `account-screen.test.mjs` reads the judgings surviving a logout (the logout cases there test the button and the removal of the game).
   - D-271: `tests/view/icons.test.mjs:247-262,475-497` (the bear's line: title, author, page link, "CC BY 4.0" with its link, „zmienione (wycięte klatki)”); `src/browser/view/credits.ts:75-84` agrees; the pair keeps the cut of the files, which no test reads.
   - D-438: `tests/sim/data.test.mjs:137-153` (`opensAfter: "forestPack"`, `carryIn: 0`) cites the exception paragraph; `tests/balance/progression.test.mjs:240` the one-seed reading; the pair keeps "no reference program solves a seed", which no test holds.
   - D-147/D-334: `tests/view/now-lines.test.mjs:127-157` (the bear's „Walczy z niedźwiedziem”, the form read from the data; the case that puts a made-up form on the wolf's data entry).
2. **D-325's new binding sentence** — see M1. It is the task's *To do* 5 for the view and the typed word and for „Dokąd” as the first view; the held `decision:` line is `tests/view/map-catalog.test.mjs:174`, a prefix of the sentence, and `foundation_check.py` accepts the quotation.
3. **`judging-cache-reading` widened** — `foundations/invariants.md:1470`. It is a correction of reach, not a new rule: D-441's record paragraph (`foundations/decisions.md:12273`) already says the record "is read only in that form and version and, on opening and at a refusing storage, treated as the judgings are", and the invariant `Derives from: D-441` with `Method: test`; the cases of `judging-cache-record.test.mjs` that cite it (the cases at `:305`, `:340`, `:442-:632`) test form, version, account, game, refusals and no throw for the record. The other phrase changed ("the cache's own version" to "the version the cache writes") is right for two key families with versions of their own. Nothing new is required of the cache that D-441 does not already say.
4. **`cc-by-4-credit`** — `foundations/environment_facts.md:96-107`. I fetched `https://creativecommons.org/licenses/by/4.0/legalcode.en` myself (HTTP 200) and checked, by a script run with `python -I` on the page text with markup dropped and whitespace collapsed, each of the ten quoted passages: all ten found word for word. The section numbering is confirmed by the page's own cross-references ("the conditions in Section 3(a)(1)", "required by Section 3(a)(1)(A)"). The sentence is true of the quoted text: "if it is supplied by the Licensor" is kept, "to the extent reasonably practicable" qualifies only the URI, as in the licence; it says no more than the source (the licence says "must", the sentence says "requires"). The form follows the template's edition source: frozen address with 4.0 in its path, place, passages joined by ` · `, date read 2026-11-25 (today); as the cc-by-3 facts it carries no archived copy. Cited as rules for facts demand: named in D-271 *Based on* and in `sprite-credits` *Rests on*, which its sentence serves (the credit line of the bear's pack, `credits.ts:75-84`). The pack's own licence is the existing fact `lpc-bears-deer-lions-licence` (CC-BY 4.0), consistent.
5. **D-449's *Rejected*** — see M2. D-448 stays `unknown`: correct, nothing in the task is a way not chosen for it.
6. **D-147, D-334, `rule-state-from-pick`** — true of the code: `src/browser/view/now-lines.ts:87` builds „Walczy z ” plus `CREATURES[line.creatureId].nameWith`; `src/browser/sim/data/creatures.ts:29,45` give „wilkiem” and „niedźwiedziem”; the only other `Walczy z` in `foundations/` is in D-334's *Rejected* (history of a rejected form), none in `guidelines/`. The invariant's text agrees with D-147 ("as D-147 gives"); it reads by `review`, no test cites it.
7. **Word limits and checks** — below. D-441's binding sentences (598 of 600 words by the author) pass `foundation_check.py`, which carries the 600-word limit (`ENTRY_LIMIT = 600`).

Other things read against the foundation entries the commit writes: D-134/D-331 first paragraphs say what the code does (circle filled/empty, no „rozwiązana” after the name); D-24's second paragraph matches the region field and its test; D-440/D-441 record paragraphs match the code the tests drive; the trimming of the „Wyloguj” list in D-441 lost no true statement: the key, value and *Rationale* (identifier, numbers, identifiers of maps, kinds of results and items) hold it, in more exact form. The record paragraph of D-441 does not say whether the record stays after „Wyloguj”; the sentence says the "remembered judgings" do. The record is one value of the same storage, no code clears it at logout (no test or text says otherwise), so I leave it; it is not a departure.

## Checks run

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `git rev-parse HEAD`; `git log --oneline 7abe5a4d616c414f323a799a73280eaf3d034f43..be5bebc7`; `git diff --stat` and `git diff -U0` of the range | 0 | one commit, head confirmed, 4 files |
| 2 | `python -B .the-way/elements/common/foundation_check.py` (run from the worktree root, output to a file) | 0 | `0 errors` |
| 3 | `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 112 info` (no warning) |
| 4 | `curl -sL https://creativecommons.org/licenses/by/4.0/legalcode.en` then `python -I` on the page text, ten passages | 0 | all ten FOUND |
| 5 | `grep -rn "decision: D-…" tests` for each of the twelve decisions, and reading the tests named above | 0 | as under check 1 |

Not run: the product's full gate and any test of the product (by the handoff; the range changes no code but one comment line). `foundation_check.py` runs the test-citation checks, so every `decision:` and `invariant:` line of the tests quotes a sentence that stands. A changed invariant is named: `judging-cache-reading` (sentence reworded; its citing tests are `tests/view/judging-cache.test.mjs` and `tests/view/judging-cache-record.test.mjs`), `rule-state-from-pick` (reads by `review`), `sprite-credits` (*Rests on* only).

## Reaches beyond the dispatch

- `.the-way/elements/invariants/skill/decide_entry.md` (the rule for a changed invariant), `.the-way/elements/environment-facts/template.md` and `skill/draft.md`, `.the-way/elements/decisions/template.md` (the *Rejected* rule): to judge checks 3, 4 and 5.
- The task's *Questions to settle* Q5 and Q6 (inside the task I was told to read) for the origin of D-449's *Rejected*.
- `src/browser/view/map-catalog.tsx:225-227`, `src/browser/view/now-lines.ts`, `src/browser/sim/data/creatures.ts`, `src/browser/view/credits.ts:70-84`, `foundations/decisions.md` D-416 (`:4819-4823`) and D-136's *Rationale* (`:5983`): to check the corrected sentences against the code.
- `the user's agent configuration directory` hook text led me to read `a rules file of the author's agent configuration` before the one script I ran.

## Working copies

One, `.runs/review-return/` (the fetched legal code, the script of check 4 and its output, the outputs of checks 2 and 3). I removed it with `rm -rf` by its full path; `git status --short` stays empty. No worktree and no clone was made; no probe shows a finding, so nothing is kept in `reports/`.

## Unread material

- Read whole: the handoff, `.the-way/task-cycle/review/SKILL.md`, `return_step.md`, `foundation_step.md`, the return step's handoff and report, the frozen `task.md` (all 218 lines), the whole diff of the range.
- Read whole by heading: D-325, D-331, D-134, D-149, D-24, D-327, D-440, D-441, D-271 (the *Verification* and the first lines, and the *Rationale* only to the bear sentence), D-438, D-448, D-449, D-147 (the binding paragraph, *Verification*), D-334 (up to the start of its *Rejected*, which I read in part), the invariants `judging-cache-reading`, `rule-state-from-pick` (the sentence and fields), `sprite-credits` (the sentence and *Rests on*), the environment facts `cc-by-4-credit` and `lpc-bears-deer-lions-licence` (first paragraph and the start of its *Source*; the tail of the *Source* not read).
- Not read whole: D-271's *Rationale* after the bear sentence; D-147's *Rationale* and *Rejected* after their first sentences (not edited in the range); D-334's *Rejected* beyond its first lines; the tests named above were read at the cited cases, not whole files; the `plan.md` and `cycle.md` and every file of `.runs/task-cycles/katalog-map/` not named in the handoff (not mine to read); `guidelines/*` and the styleguide (no code, no guideline change in the range).

## Searches not found or unclear

- The plan's *Choices* that the return step cites for the lifetime of the catalog's view: not in my dispatch, so the claim that the plan rejected "kept in the page's state" is unverified; the task itself binds only the view and the typed word (M1).
- The project definition (the approved *Rationale* and *Rejected* of D-448 and D-449): not available to me either; what the entries should hold is for the request to put before the human (M2).
- Whether „ze 7” or „z 7” is the usual Polish (the return step's open item): nothing I read settles it; not part of this range.
