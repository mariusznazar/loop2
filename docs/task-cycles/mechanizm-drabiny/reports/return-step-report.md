done with concerns

# Return step — task cycle `mechanizm-drabiny`

Start `ad2d8084`, head `93209ec8`, branch `task/mechanizm-drabiny`, worktree `the task's worktree`. `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, the commit the gitlink records. `origin/main` at `e84a73ce`, as the handoff gives.

The concerns, each for the request's description:

1. I added one `decision:` line to an existing test, `tests/view/end-window-lines.test.mjs:433`. The *Verification* of D-466 named that test, but the test carried no line for D-466. The handoff lets me change a test only where a *Verification* needs the test it names; I read the template's "A test holds a decision's sentence by a line `decision:`" as that need. The request names this test as one whose `decision:` lines changed.
2. I changed a binding sentence of D-466: its citation now names the styleguide's rule for „Co daje”. The human chose that sentence's clause at correction 1. Its meaning is unchanged, but the words are the cycle's and go before the human at the merge.
3. D-465 keeps part of its pair of examples, so it becomes `the cycle's`. D-448 gains a violating example. Both go before the human with the pairs quoted below.

## Commits

| Commit | File | + | − |
|---|---|---|---|
| `307ded54` docs: the Verification of D-464, D-465, D-466 and D-327 … D-448 … D-466 cites the styleguide … D-327 says where the predecessor's tag bar was read | `foundations/decisions.md` | 15 | 17 |
| `93209ec8` test: the case of the way-on buttons of the end-of-run window holds the sentence of D-466 | `tests/view/end-window-lines.test.mjs` | 3 | 1 |

## Foundation compared with the code

### The entries the change wrote or changed

- **Glossary `rung`** (`foundations/glossary.md:344-348`). It matches the code: `RungRow` and `composeMaps` in `src/browser/sim/data/maps.ts`. Every other use of the word agrees with it, under the narrow meaning:
  - D-448 *Rationale*, D-464, D-465 and D-466 in `foundations/decisions.md`;
  - `.claude/skills/loop2-balance/SKILL.md:44, 203-242`.

  No change.
- **D-464** (`foundations/decisions.md:6227`):
  - The binding sentences match `RungRow`, `composeRung` and `matchedById` in `maps.ts`, field for field. The second paragraph matches the code: `resourceLines` (`src/browser/view/map-lines.ts:175-185`) writes „≈ 0 z {tiles} kafelków” for density 0. The search (`src/browser/view/catalog-lines.ts:235-241`) and „Co daje” (`:326`) filter no density.
  - What changed: the `tests:` clause now names what the tests of `tests/sim/data.test.mjs:136-411` hold, and the pair was cut to the part no test holds.
  - Parts that the pair lost to tests:
    - the complying Las — głębiej II row;
    - "adds stone … or names the bear" (the refusal case, `:277`);
    - "short sentence … taken from the map that opens it" (`:407-409` asserts each rung's three sentences differ from its opener's).
  - Parts left in the pair: no creature changed, and paragraph 2 on density 0.
  - The lead-in now reads "An agent compares a change with the part no test holds", as the template gives.
- **D-465** (`:6244`):
  - The binding sentences match the composer: `head`, `place + 1` and `romanNumeral`.
  - The `tests:` clause now names the made-up cases of `tests/sim/data.test.mjs:340` (II to X) and `:357` (a second line starting at II), and the names of the three rungs (`:374`).
  - I dropped two parts of the clause that no test holds by a `decision:` line:
    - "with no name in a rung's row": test `:374` reads `MAPS`, not the rows, so a whole row of the same name would pass it.
    - "the composed names among the names no file of the view … writes": the invariant `content-identifiers` holds this. It does not derive from D-465, and its test carries no D-465 line.
  - The pair lost "„Las — głębiej II II” or „Las — głębiej 3”", which tests `:340` and `:374` hold.
  - It keeps the complying example. It also keeps two violating ones, "a rung's row that writes its name" and "the view composing a rung's name …", which no test holds.
- **D-466** (`:6259`):
  - The rule, the example order and the third sentence match `composeMaps` (refuses an opener standing later), the order of `ROWS`, the views (`catalog-lines.ts:274-299, 314, 375-377`) and `wayOnButtons`.
  - The `tests:` clause gains:
    - the refusal of a rung whose opener stands later (`tests/sim/data.test.mjs:328`);
    - `sendMaps` in the data's order (`tests/view/map-lines.test.mjs:63`);
    - the catalog case named as the view „Postęp” (`tests/view/catalog-lines.test.mjs:343`).
  - The end-of-run window case (`tests/view/end-window-lines.test.mjs:428`) now carries a `decision: D-466` line quoting the third sentence (concern 1).
  - The pair lost "the catalog ordering the maps by their names", which the „Postęp” case holds.
  - Citation (pointer b): see "Corrections" below.
- **D-327** (`:10489`):
  - The temporary icon part was removed from the lead-in, the complying items and the violating items. Two tests hold it:
    - `tests/view/map-lines.test.mjs:173`, the case on `cardHeading(...).icons`;
    - `tests/view/maps-screen.test.mjs:570-571`, with a `decision: D-327 "Beside the name and the tag of its state …"` line.
  - Rationale: see "Environment facts" below.
- **D-448** (`:6195`): pointer (a), see "Corrections" below.

### Corrections the orchestrator's pointers asked for

- **(a) D-448's `tests:` clause.**
  - It now reads: "a map whose opener stands after other maps measured, beside its own measurement, with the stock the mode `progression` built for its opener and with practice enough to buy the rank of a branch the measured program needs, the character starting with a made-up practice so that the opener's practice buys that rank, and the test failing where the comparison is made with no practice or with no stock."
  - It matches the case at `tests/balance/progression.test.mjs:269-322` and the mutations (a), (b) and (d) of `reports/review-correction-1/`.
  - The part the case does not hold, that the practice is exactly the opener's, went to a new violating example: "a map measured for the comparison with the practice of its own chain of openers, which holds what the first solving of the map that opens it paid, in place of the practice that map was measured with".
  - EN: D-448 now says its test holds a practice enough to buy a rank, and that measuring a map with its own chain's practice breaks it.
  - PL: D-448 mówi teraz, że jego test trzyma wprawę wystarczającą do wykupienia stopnia, a mierzenie mapy wprawą jej własnego łańcucha łamie decyzję.
- **(b) D-466's citation.**
  - I judged it incomplete rather than wrong. D-325 gives the views and their groups, and D-331 gives the place of the solved maps in „Dokąd”. The solved-first order inside a group of „Co daje” stands only in `guidelines/styleguide-browser-view.md:971-972` and in `catalog-lines.ts:375-377`.
  - The parenthesis now reads "(D-325, D-331, and for „Co daje” the rule of the screen Mapy in `guidelines/styleguide-browser-view.md`)". Rejected way: recording the „Co daje” order in a decision. That is a choice of task 3, which no row of this task carries.
  - EN: D-466 now names, beside D-325 and D-331, the styleguide rule where the place of solved maps in „Co daje” is written.
  - PL: D-466 wskazuje teraz, obok D-325 i D-331, regułę styleguide'u, w której stoi miejsce rozwiązanych map w „Co daje”.
- **(c) D-464's density-0 paragraph and its *Verification*.** Both agree with the code, at the places named under D-464 above. Las — głębiej's grid is 5 × 5 (`maps.ts`), so „≈ 0 z 25 kafelków” in the violating example is right. No change beyond the pair cut above.
- **(d) The entries against `rung`.** No use goes against the glossary.
  - The skill defines a line of rungs slightly differently from D-465. The skill (`.claude/skills/loop2-balance/SKILL.md:211-212`) says "the rungs that map opens, each followed by the rungs they open in turn"; D-465 includes the map that is no rung in the line.
  - Read in context, "after the line of rungs that grows from that map", the skill puts a map in the same place, so I left the skill as it is.
- **(e) D-132 and D-53.** Read as "each map it opened", both stay true, since the window gives one button per opened map:
  - D-132 "„Otwarte: {mapa} →” in the window, the way to the map it opened" (`:5872`);
  - D-53 "leads to the screen Mapy with the card of the map it opened" (`:10412`).

  The test `tests/view/end-window-lines.test.mjs:436-442` shows the two buttons after Las — głębiej. I left the sentences as they are: rewording them would break the `decision:` lines that quote them whole (`end-window-lines.test.mjs:429-430`), for no gain in meaning. D-368, which the foundation writer also read, is the same case.

### The entries the task names

D-18, D-24, D-136, D-142, D-149, D-132, D-133, D-388, D-398, D-427, D-428, D-429, D-437, D-438, D-449, D-53, D-325, D-331, D-332 and D-333 were each compared with `maps.ts`, `balance/progression.mjs`, `balance/check-map.mjs`, `map-lines.ts`, `map-card.tsx` (through the reviews' readings), `maps-screen.css` (the same) and the skill. All hold. Notes:

- **D-388 and D-398.** The numbers of Las, Las — głębiej and Skraj lasu are unchanged in `maps.ts`.
- **D-24.** It is true of the rungs: a rung's composed map holds every field in `MAPS`.
- **D-449.** No test expects a number of a rung.
  - The stocks of the three rungs that `tests/invariants/test_map_run_tiles.py` writes out are the invariant `map-run-tiles`, which names the stock for every map. D-449 allows that.
  - The refusal and composition tests use made-up maps.
- **D-438.**
  - Its third paragraph names the character "built from what the maps before it gave".
  - `measureProgression` now takes a start `practice`, empty by default. Only the test passes it, and the CLI does not expose it, so every measurement D-438 speaks of is unchanged.
  - Review-correction-1 Minor 3 stands as an observation of the code, not of an entry: `renderProgression`'s sentence would be untrue for a result measured with a start practice.
- **D-428.** It covers the map check only. The second table of `progression` names programs by no label at all: it holds one best share per map.
- **D-332.** `#/mapy/forestDeep2` follows it with no change.

### Own search by the names the change adds

Over `foundations/`, `guidelines/`, `AGENTS.md` and `src/browser/AGENTS.md`, `git grep -n -w` for each of these found nothing:

- `composeMaps`, `composeRung`, `ROWS`, `RungRow`;
- `withOpenerShare`, `openerBestShare`, `openerName`, `measureProgression`, `practiceIn`;
- `cardHeading`, `maps-card-tags`, `maps-card-heading`;
- `forestDeep2`, `forestDeep3`, `forestDeep4`, `goalText`.

`harder` and `ladder` were found only in D-448 and D-464 to D-466, and in unrelated old entries (`:641`, `:5720` and others). Those were read and agree. Nothing in the foundation describes these names otherwise than the code does.

## Decisions written or changed

D-464, D-465, D-466, D-327 and D-448, in `foundations/decisions.md`, commit `307ded54`, all as given above. No new decision.

Marks for the request:

- **D-465 becomes `the cycle's`.** Its pair stays in part, as the foundation writer foresaw. The pair, word for word:
  - complies: "a rung that „Las — głębiej IV” opens named „Las — głębiej V” by the code of the maps' data, its row holding no name"
  - violates: "a rung's row that writes its name; the view composing a rung's name from the map that opens it"
- **D-448's added violating example**, word for word: "a map measured for the comparison with the practice of its own chain of openers, which holds what the first solving of the map that opens it paid, in place of the practice that map was measured with".
- **D-464's pair now**, word for word:
  - complies: "the first rung whose row gives moss the density 0 brought with a change of the view after which its card, the search and „Co daje” leave moss out"
  - violates: "a rung that changes the wolf's health or strike; a rung whose row gives moss the density 0 while its card shows moss with „≈ 0 z 25 kafelków”"
- **D-466's pair now**, word for word:
  - complies: "a new map that Las — głębiej opens standing after Las — głębiej IV and before Las — matecznik; a rung that Las — głębiej IV opens standing right after it"
  - violates: "a rung put right after the map that opens it, before a map that map already opened; a new map put at the end of the maps of its region"
- **D-464, D-466 and D-327** were already `the cycle's`.

## Invariants

None written or changed. No rule of the task, a decision or the human sets a new one.

## Environment facts

None written. One case was judged:

- **The case.** D-327's phone item rests partly on the predecessor's card, read from the old game's code (`MapPage.tsx` in the old game's repository). That repository is private (`gh repo view` reports `PRIVATE`); loop2 is public.
- **Why no fact.** It is neither a finding about agents or models nor the behaviour of a tool the process uses. The template's "Which facts are written" asks for a fact only for those. It is closest to a reading the product's own people made whose record a reader cannot open, and the template keeps such a reading in *Rationale*, saying so.
- **What I wrote instead.** D-327's *Rationale* now says that the tag bar above the card "the product's own reading of the predecessor's code found, a record not open to a reader of the repository".
- **What I left.** D-327's *Based on* stays `none`, as it stood for the whole comparison with the predecessor before this change.

## Glossary terms

None written. The change uses `rung`, `streak`, `beaten attack`, `completion`, `solved map` and `practice` as their entries give them (`foundations/glossary.md`).

## Part-map changes

None.

- `git diff --name-status e84a73ce..HEAD` lists only modified files (`M`), 22 of them, this step's two among them, and none added.
- `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`, so every tracked file is claimed.
- The descriptions of `simulation`, `balance-tools`, `browser-view`, `agent-workflow` and `product-foundation` still say what the changed files do.

## Projected entries written whole or in part

None by this step. The projected entries D-448, D-449 and D-438 were written by task 3. This change makes true D-448's measure in `progression`, its second paragraph, and only D-448's *Verification* changed here.

## Rows of *Settlements to record*

All five were written before this step. I checked each against the head:

| Row | Place it went to |
|---|---|
| 1 — the rungs after Las — głębiej, each opened by the one before | data, `src/browser/sim/data/maps.ts` (`opensAfter` of `forestDeep2` to `forestDeep4`); held by `tests/sim/data.test.mjs:136` |
| 2 — the rung's row | D-464 |
| 3 — the rung's name | D-465 (now `the cycle's`, for its pair) |
| 4 — the word `rung` | glossary `rung` |
| 5 — the place of a new map | D-466 |

## Choices that bind after the merge

None became an entry: each passed through the template's "Where it goes" as follows.

| Choice | Place |
|---|---|
| The rung identifiers `forestDeep2` to `forestDeep4` | Data (question 3), in `maps.ts`; held by `tests/sim/data.test.mjs:115`; that they stay fixed is already D-332's (saved games and addresses). The convention for later identifiers (the number of the place) stays a row of the questions table. |
| The numbers the first rungs got | Data (question 3); no requirement of the game (D-449), so no test holds them. |
| `ROWS` as one ordered table of whole maps and rung rows | Code; what binds of it is D-464 (a rung is a row of the maps' data) and D-466 (the order). |
| The refusal of a row by a throw when the data load | Code, held by `tests/sim/data.test.mjs:277, 307, 328`; the binding part is D-464's sentence. |
| The second table of `progression` | Code, held by the case at `tests/balance/progression.test.mjs:435`; how an agent reads it stands in `.claude/skills/loop2-balance/SKILL.md:180-196` (question 1). Stays a row of the questions table. |
| The new input `practice` of `measureProgression` | Code with its comment (`balance/progression.mjs:7-8, 367-368`), held by the case at `tests/balance/progression.test.mjs:275`, whose comment says why; someone who removed it is stopped by that case and told why, so no entry. Stays a row of the questions table. |

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at the start | 0 | `0 errors` |
| the same after the entries were changed | 0 | `0 errors` |
| the same with one word of the new `decision: D-466` line changed (`Mapy` → `Mapa`), a positive control, the file then restored | 1 | `tests/view/end-window-lines.test.mjs:433: the quotation stands in no binding sentence of D-466`, `1 error` |
| the same after the last wording of D-448's clause, and again at the head `93209ec8` | 0, 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` (before the commits and at the head) | 0 | `0 error, 0 warn, 120 info` |
| `npm test -- tests/view/end-window-lines.test.mjs` | 0 | 12 pass, 0 fail |
| `npx prettier --check tests/view/end-window-lines.test.mjs` | 0 | formatted |
| `npx eslint tests/view/end-window-lines.test.mjs` | 0 | clean |

What did not run, and why:

- The whole gate (`npm test` with no file). The handoff reserves it for CI on the request.
- No test of the decisions' other `tests:` clauses. Those tests are unchanged since the reviews, which ran them at `ad2d8084`.

No check failed and then passed on a rerun.

## Own-work check

- **The requirement most likely unmet.** That each `tests:` clause I wrote names only what a test really holds; an over-claim is the fault the review found in D-448.
- **The check.** For each claim I read the test case that holds it and the break it catches:
  - D-464: `tests/sim/data.test.mjs:136, 183, 218, 230, 251, 277, 307, 374, 389`;
  - D-465: `:340, 357, 374`;
  - D-466: `:115, 328`, `tests/view/catalog-lines.test.mjs:343`, `tests/view/map-lines.test.mjs:63`, `tests/view/end-window-lines.test.mjs:428`;
  - D-448: `tests/balance/progression.test.mjs:269-322` with the mutation logs of `reports/review-correction-1/`.
- **What it showed.** Three claims were over-claims and were dropped:
  - D-465's "with no name in a rung's row";
  - D-465's "names no file of the view … writes";
  - D-448's "the practice … built for its opener".

  One claim, D-466's end-of-run window, had no `decision:` line, and gained one (concern 1).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md` and `template.md`, `.the-way/elements/common/way_of_working.md` and `rules.md`, `.the-way/elements/decisions/examples.md` and WAY-03 of the-way's log: the method foundation_step.md names for changing a decision.
- `.the-way/elements/environment-facts/skill/SKILL.md`, `decide_entry.md` and `template.md` lines 1-100: to judge the source of D-327's phone item.
- `guidelines/coding.md` and `guidelines/testing.md`, whole: `AGENTS.md` asks for both before a test changes.
- `guidelines/coding-content-data.md`, whole: to see whether a rule of identifiers exists. It holds none.
- `guidelines/styleguide-browser-view.md:920-935, 960-975, 1795-1905`: the rule of the screen Mapy, for the D-466 citation, and the rule of the end-of-run window, for the changed test.
- `tests/invariants/test_content_identifiers.py:1-240`, `tests/invariants/test_map_run_tiles.py:1-40` and the invariants `map-run-tiles` (`foundations/invariants.md:297`): for D-465 and D-449.
- `gh repo view` of the old game's repository and of loop2, for visibility: the environment-fact judgement. This was a read through the authenticated `gh` CLI, and nothing was sent beyond the two repository names.

## Working copies

- `.runs/return-step/` held:
  - the outputs of the foundation and instruction checks;
  - the log of the focused test;
  - a backup of `tests/view/end-window-lines.test.mjs` for the positive control;
  - the two commit messages.

  I removed it by its full path after writing this report.
- No git worktree was made, and no process was left running.
- Nothing is kept in `reports/`. The positive control's input and command are given in full in "Checks".

## Unread material

- `guidelines/styleguide-browser-view.md`: only lines 920-935, 960-975 and 1795-1905, of 1979. `AGENTS.md` asks for the file before a change of a `browser-view` file. The one such change is a comment line in a test, and the rule of the end-of-run window it concerns was read whole.
- `.the-way/elements/environment-facts/template.md`: lines 1-100 of 212 ("Where entries go", "Which facts are written", "The sentence", the start of "Source"). No fact was written.
- `.the-way/elements/common/reaching_another_skill.md`: not read, since no hand-over to another skill came.
- `src/browser/view/map-card.tsx` and `src/browser/maps-screen.css`: not read by me. For D-327 I relied on the readings of `review-whole-report.md` and `review-fix-1-report.md`; this step changed no sentence of D-327 about them.
- Everything else the handoff names was read whole:
  - the method files and the frozen task;
  - the plan's *Foundation entries*, *Coverage* and *Choices*;
  - the foundation writer's report and the reports of fix 1 and correction 1;
  - the three reviews.

## Searches not found or unclear

- Not found: a decision that sets the solved-first order inside a group of „Co daje”. Searched D-325 and D-331 read whole; it stands in `guidelines/styleguide-browser-view.md:971-972` alone.
- Not found: a rule for the identifiers of content data. Searched `guidelines/coding-content-data.md`, read whole.
- Not found: any use in the foundation of the names the change's code adds (see "Own search").
- Unclear: whether adding a `decision:` line to an existing test is within "change … tests only where a decision's *Verification* needs the test it names to exist". I read it as within (concern 1). The other way is to drop the end-of-run window from D-466's `tests:` clause and give it a pair of examples.
- Left as observed, not mine: the comment at `tests/balance/progression.test.mjs:251`, "Skraj lasu opens no map", is untrue (review-fix-1 Minor note 2).
