# Findings of the review of the whole change, head d7136c57ef232b05cad48b2aaaf5ef3f6cc99e5e — for the fix

From `reports/review-whole-report.md`, in the reviewer's words. The blocking findings come first, each with the reviewer's mark of contradiction with the settlements; the Minor findings of that review within the task follow (the orchestrator cut Minor 1–6 from the report: Minor 7 is a matter for the request's description, Minor 8 is a classification of mutation survivors with no fix asked, and Minor 9 is outside the task's scope; none of those three is in this file).

## Important findings (blocking)

### I1 — The foundation check of the one command fails on three `decision:` lines

- Places: `tests/view/map-lines.test.mjs:66`, `tests/view/map-lines.test.mjs:67`, `tests/view/maps-screen.test.mjs:572`.
- What is wrong: `python -B .the-way/elements/common/foundation_check.py` on the head ends with exit 1 and `3 errors`:
  - `tests/view/map-lines.test.mjs:66: the quotation stands in no binding sentence of D-149`
  - `tests/view/map-lines.test.mjs:67: the quotation stands in no binding sentence of D-466`
  - `tests/view/maps-screen.test.mjs:572: the quotation does not begin a sentence of D-43`
  The two lines in `map-lines.test.mjs` quote the *headings* of D-149 and D-466 ("When does the game offer a map opened by another map?", "Where does a new map stand in the order of the game maps' data?"), which are no binding sentences. The line in `maps-screen.test.mjs` quotes "which is drawn as a mask and takes its colour from the text beside it", the middle of D-43's one long sentence.
- Why it matters: `npm test`, the one command the repository requires before a merge, runs this check, so the gate fails at the head whatever else passes. No executor of Slices 3 and 8 ran the foundation check (their reports say so).
- Fix: quote a sentence start of each decision. Examples: D-149 "A map whose opening map is still unsolved is absent from the screen Mapy, and from the opening map’s first completion it stands there with its card for every character"; D-466 "A new map stands in the order of the game maps' data right after the last map that the map opening it already opens"; D-43 "In the files of the part browser-view other than its file of design tokens, a value written in place of a design token is …".
- Evidence: the command above, exit 1, run in the reviewed worktree.
- Slices: Slice 3 (`3d272ec9`) for the two lines of `map-lines.test.mjs`, Slice 8 (`d7136c57`) for `maps-screen.test.mjs:572`.
- Contradiction: no

### I2 — No test fails when the measure loses the opener's practice or the stock of the maps before the opener

- Places: `balance/progression.mjs:332-333` (the `practiceIn` and `candidates` that `withOpenerOf` passes) and the one test of that path, `tests/balance/progression.test.mjs:240-266`.
- What is wrong: the only case of the new measure uses Las, whose opener Skraj lasu opens no chain. The opener's character is therefore empty by construction: no practice and no maps before it. Two mutations of the head survive the whole test file (16 pass, 0 fail):
  - (a) `practiceIn: openerSummary.practiceIn` → `practiceIn: {}`. This measures every map with a fresh character, which is the bug D-448's second paragraph exists to forbid.
  - (b) `candidates: candidatesOf(before)` → `candidates: []`. This removes the stock that the maps before the opener give.
- Why it matters: To do 4 and D-448 require the measure "with one character on both maps — the one … `progression` builds for the map that opens it, from what the maps before that one gave". Every rung of this task and of task 16 is measured through exactly the path that has no test. A regression to (a) or (b) would pass the gate, and only someone reading the four-and-a-half-minute table by eye could catch it. The executor of Slice 4 named this gap. A fixture with a non-empty opener already stands in the data (`forestDeep` with opener `forest`, or `forestDeep2` with opener `forestDeep`). A case there can compare `withOpenerShare` against a sweep built from the opener's `practiceIn` and stock, for example, or assert that it differs from the fresh-character sweep.
- Evidence: `reports/review-whole/mut-a.log`, `reports/review-whole/mut-b.log` (command `npm test -- tests/balance/progression.test.mjs` after a one-line `sed` of each mutation in a worktree of `d7136c57`; both exit 0).
- Slice: Slice 4 (`69f74f9e`).
- Contradiction: no

### I3 — D-466 says the catalog shows the maps in the data's order, with no qualification, while the catalog groups them first

- Place: `foundations/decisions.md:6259`, third sentence of D-466: "The catalog of the screen Mapy and the end-of-run window show the maps in the order of the game maps' data, the buttons „Otwarte: {mapa} →” after a completion included."
- What is wrong: the catalog orders by the data only within groups the views make.
  - „Dokąd” puts the open unsolved maps first and the solved ones after, under the fold row (`src/browser/view/catalog-lines.ts:275-278`, D-331, styleguide "The screen Mapy" line 961).
  - „Co daje” orders its groups by how few maps give the resource, and within a group puts the solved maps first (`catalog-lines.ts:365`, `:376-377`, styleguide line 971).
  The sentence restates the order more broadly than the product does it. It was written in this change and marked `the cycle's` (it is not in row 5 of *Settlements to record*).
- Why it matters: a later agent that reads D-466 alone, such as the agent of task 16, may take it as a requirement to drop the grouping, which D-325, D-331 and the styleguide keep. WAY-263 and WAY-364 grade such a mismatch Important.
- Fix (one clause): for example "… show the maps in the order of the game maps' data within the groups each view makes (D-325, D-331) …", or name the end-of-run window and „Postęp” alone.
- Slice: the plan's *Foundation entries* (`5a0b6ccf`).
- Contradiction: yes — D-466, the entry the change writes, which here says more than the catalog does (against D-331 and the styleguide's rule "The screen Mapy").

### I4 — D-327 says that on a phone the tag and the opener "stay beside the name", but the card puts them on the line under it

- Place: `foundations/decisions.md:10491`, the clause "and in the phone layout the tag of the state and „odsłania ją {mapa}” stay beside the name and „Wejdź — wybierz postać” at the top of the card"; and its *Verification* complying item "the tag „otwarta” beside the name".
- What is wrong: Slice 8 made the tag, the separator and the opener one item, `.maps-card-tags` (`src/browser/view/map-card.tsx:145-161`, `src/browser/maps-screen.css:268-279`), which wraps as a whole.
  - Executor 8 measured the solved Las — głębiej card at 360 px: 318 px of room, against the name 134 + icon 31 + tag item 150 + gaps. The item goes to the second line of the heading (`reports/executor-8-report.md`, Walk and "Where my code makes a foundation entry less exact").
  - The cards of the rungs have longer names and a longer opener („odsłania ją Las — głębiej II”). By the same widths, their tags stand under the name on the phone in both states, as does the card of Las — wataha. This is derived from executor 8's measured widths, not measured by me.
  So the entry written in this change says "beside" where the card puts the tag under the name. The departure D-327 means to name (the old Loop puts the tag in a bar above the card) is still true, but the sentence about this card is not.
- Why it matters: D-327 is the entry against which a later change of the card is judged. A reviewer would hold a correct wrap to "beside the name", or an executor would shrink the icon to keep one line. WAY-263 grades it Important.
- Fix (one clause): for example "stay in the heading at the top of the card, beside the name or on the line under it, …", with the *Verification* item read the same way.
- Slices: the plan's *Foundation entries* (`1d14b6eb`) and Slice 8 (`d7136c57`).
- Contradiction: yes — D-327 (the change's own entry).

## Minor findings within the task (to be fixed with the blocking ones, by one fix)

1. **The rows of the second table are described wrongly, in the skill and in two code comments.**
   - Places: `.claude/skills/loop2-balance/SKILL.md:180` and `:186` (and the same lines of the byte-identical `.agents/skills/loop2-balance/SKILL.md`); `balance/progression.mjs:316` and `:445`.
   - The skill says the second table has "a row for each map that another map opens", but the code prints a row for every requested map, Skraj lasu included.
   - The skill and both comments say "A map that opens nothing has dashes in the opener's cells". The dashes stand at a map that no map opens: Skraj lasu opens Las, yet has dashes, while Las — głębiej IV opens nothing and has its cells filled.
   - The verdict columns are read correctly, so no pass or fail is misread. But To do 7 asks the skill to say how to read the measure, and a later agent reads these sentences. Within the task. Slices 4 (`69f74f9e`, comments) and 5 (`48632dc4`, skill).

2. **The skill's first sentence on rungs reads wider than the glossary.**
   - Place: `.claude/skills/loop2-balance/SKILL.md:203`: "A rung is a game map that differs from the map that opens it by its numbers alone (D-448)."
   - Taken alone, this calls Las a rung, which D-464's *Rationale* says it is not. The glossary entry `rung` adds "made by the ladder mechanism, from a row …". The next sentence of the skill limits it.
   - Within the task. Slice 5 (`48632dc4`).

3. **A resource of density 0, which D-464 allows, would still show on the card and in the catalog.**
   - Places: D-464 (`foundations/decisions.md:6229`) against D-327's „Leży tu” and D-325's search and „Co daje”.
   - A rung that gives a resource density 0 would show „≈ 0 z 25 kafelków” for it on its card, would be found by that resource's name and would be listed under it in „Co daje”.
   - No rung of this task uses density 0, so no user sees it today. The first rung that does (task 16) needs the view to leave such a resource out, or a sentence in D-327 and D-325. Within the task as a latent edge of its mechanism. Foundation entries (`5a0b6ccf`).

4. **D-448's *Rationale* now reads two ways.**
   - Place: `foundations/decisions.md:6209`: "a rung that differs from the map before it by its numbers".
   - Under D-466 the map before a rung in the data is not always its opener (before Las — głębiej II stands Las — wataha).
   - The rationale binds nothing. The cheap fix is "the map that opens it", as the foundation writer proposed. Outside this change's entries, but caused by D-466. Within the task.

5. **`measureProgression`'s comment does not mention the fields the change adds.**
   - Place: `balance/progression.mjs:348-356`.
   - The comment lists what the result's `maps` hold, but not the new `opener`, `openerName`, `openerBestShare`, `withOpenerShare` and `harder`. A reader of the exported function's comment does not learn of them.
   - Within the task. Slice 4.

6. **The styleguide's rule does not list D-43 among its decisions.**
   - Place: `guidelines/styleguide-browser-view.md:928`.
   - The rule "The screen Mapy" now cites D-43 in its item on the card heading (`:1009`), but its **Decision** list does not name D-43. A reader who finds rules by decision does not reach it.
   - Within the task. Slice 7 (`733f8c42`).
