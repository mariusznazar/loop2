PASS 93209ec83c2d686575adbfcb1cd85bebb90e4ee7

# Review of the return step — task cycle `mechanizm-drabiny` (review-change, the return step's commits)

Range `ad2d8084..93209ec83c2d686575adbfcb1cd85bebb90e4ee7`. It holds two commits, `307ded54` and `93209ec8`, and changes two files: `foundations/decisions.md` (+15 −17) and `tests/view/end-window-lines.test.mjs` (+3 −1). `git rev-parse HEAD` printed the head I was given. `.the-way` is at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, the commit the gitlink records. I reviewed by `.the-way/task-cycle/review/SKILL.md` section 2, against the task and the entries the return step changed, within the bounds of `return_step.md` and `foundation_step.md`.

Counts: 0 blocking, 3 Minor (all within the task), 0 out of scope. No invariant test was changed.

## The handoff's questions, judged

### 1. Each changed *Verification* against the tests it names

I read every case each `tests:` clause names.

- **D-464** (`foundations/decisions.md:6236-6238`). Every part of the clause is held by a case with a `decision: D-464` line, in `tests/sim/data.test.mjs`:
  - "a rung's row taking the numbers it gives and the rest": `:183`;
  - "matched by identifier": `:230`;
  - "density 0 kept in its place and placed on no tile": `:251`;
  - "a row that gives no number composing a rung with the numbers of that map and the three sentences": `:218`;
  - "same order / attackers / kinds … and sentences other than that map's": `:389`, which asserts `notEqual` for all three sentences at `:407-409`;
  - "opened by the map its row names": `:136`;
  - "adds … or names … twice, refused": `:277` and `:307`;
  - "completion text naming the composed name": `:374`.

  The two examples that were dropped are both held:
  - "adds stone … names the bear": `:294` refuses `bear` and `:290` refuses a resource the opener lacks, by the same `matchedById` (`src/browser/sim/data/maps.ts:140-143`);
  - "short sentence taken from the opener": `:407-409`.

  The pair that remains covers only parts no test holds. "Changes the wolf's health or strike": `RungRow` has no creature field (`maps.ts:111-113`), and no case with a D-464 line covers it. The density-0 view paragraph has no case either. Correct.

- **D-465** (`:6251-6253`).
  - Made-up names II to X: `data.test.mjs:340`. The table there takes `rung2`…`rung10`, and the names are asserted as `Pole II`…`Pole X`.
  - A second line starting at II: `:357`.
  - The three names in the game's data: `:374`.
  - The two parts that were dropped were rightly dropped:
    - `:374` reads `MAPS`, not the rows.
    - A row that writes `name` is not refused at runtime. `isRung` (`maps.ts:119-121`) treats it as a whole map, and only the type `name?: never` (`maps.ts:111`) stands in the way.
    - The invariant `content-identifiers` would not catch a view that builds the name from its parts.

  The pair that remains ("a rung's row that writes its name", "the view composing a rung's name") is held by no test. D-465 is therefore `the cycle's`, as the report says.
  - The complying example, the rung after IV named V, is close to what `:340` holds on made-up data. It also illustrates the unheld part "its row holding no name", so keeping it does no harm.

- **D-466** (`:6266-6268`).
  - Order and opener before: `data.test.mjs:115`.
  - Refusal of a later or missing opener: `:328`.
  - „Postęp” order: `tests/view/catalog-lines.test.mjs:343`.
  - Maps open to a send in the data's order: `tests/view/map-lines.test.mjs:63`.
  - The end-of-run window: `tests/view/end-window-lines.test.mjs:429`, which now carries its line.

  The dropped "catalog ordering the maps by their names" is held beyond „Postęp”, which supports the drop. `tests/view/map-catalog.test.mjs:510-517` asserts the unfolded „Dokąd” list as Skraj lasu, Las, Las — głębiej, Las — wataha after the open maps. A sort by name would put „Las” first and fail it.

  The remaining pair (a future map that Las — głębiej or Las — głębiej IV opens; a map misplaced at insertion) is held by no test. `:115` pins only today's eight maps.

- **D-327** (`:10498-10528`).
  - The temporary "and the icon of the heading until its tests stand" was removed from the lead-in and from both examples.
  - The `tests:` clause already named the icon (`:10499-10501`).
  - `tests/view/maps-screen.test.mjs:570-625` holds that sentence, with a `decision: D-327 "Beside the name and the tag of its state …"` line (`:571`). `tests/view/map-lines.test.mjs:173` holds it as well.

  The removal is correct.

- **D-448** (`:6204-6206`).
  - The clause now says what the case at `tests/balance/progression.test.mjs:275-322` holds:
    - practice enough to buy the rank (the precondition at `:286-290`);
    - the opener's stock (`openerStock`, `:301-303`);
    - failure with no practice or no stock (the preconditions at `:312-319`, and mutations (a) and (b) of `reports/review-correction-1/`).
  - It no longer claims that the practice is exactly the opener's.
  - The new violating example is mutation (d) of review-correction-1, which all 17 cases survive. It is therefore correctly an example and not a test claim. It goes against the second paragraph while the entry stays as it is, as the template's rule for a violating example asks.
  - See Minor 1 for a test the clause leaves out, and Minor 2 for the entry's mark.

### 2. D-466's citation

- Only the parenthesis changed. The clause the human chose, "within the groups each of its views makes and after the place each view gives the solved maps among them", stands word for word. The sentence still starts "The catalog of the screen Mapy", and the meaning is unchanged.
- The four `decision: D-466` lines that quote the first sentence (`data.test.mjs:117`, `:329`, `catalog-lines.test.mjs:344`, `map-lines.test.mjs:67`) are untouched. `foundation_check.py` exits 0.
- The citation resolves: `guidelines/styleguide-browser-view.md:926` is the rule "The screen Mapy", and `:971-972` says „w grupie najpierw rozwiązane”.
- Citing a guideline file from a decision is allowed and has precedent:
  - `.the-way/elements/common/rules.md` "References" restricts only how entries are named.
  - Another binding sentence of loop2 refers to the styleguide: `foundations/decisions.md:5185`, "each role of its styleguide's table of roles".
  - D-465 names a file path in its binding sentence.
- The citation adds a source, not a rule. If the styleguide rule changed, the sentence would stay true, because it says "after the place each view gives".

### 3. The added `decision: D-466` line

- It is within `return_step.md`. The step "names that test by the clause `tests:`". The decisions template (`.the-way/elements/decisions/template.md:284-287`) says the `tests:` clause carries no path, because "the lines `decision:` find the tests". A clause that names a case with no line is a link that cannot be followed. Adding the line is the least change that makes the clause true, and it changes no behaviour of the test.
- The quotation has to start at the start of a sentence and run without a gap (`template.md:277-281`). To reach "the end-of-run window" it must therefore carry the parenthesis, and with it the citation's wording. A later rewording of that citation will break this line, and the check catches that: my probe below shows it.
- The other way is worse. Dropping the window from the clause and keeping an example would hand an agent a comparison that a test already makes, against the rule "leaves a pair only for a part no test holds".
- The case does protect the order. A mutant that reverses `wayOnButtons` fails it (probe below).

### 4. D-327's *Rationale* and no environment fact

- The template's "Which facts are written" (`.the-way/elements/environment-facts/template.md:55-60`) covers a reading the product's own people made whose record a reader cannot open. It is written as no fact. The decision keeps the result in *Rationale* and says there that the reading is the product's own and its record not open. The new clause does exactly that.
- This matches the foundation's own practice for observations of that kind:
  - `foundations/decisions.md:1518`, "this observation is the product's own, and its record is not open to a reader of the repository";
  - `:795`, which already says the old loop game's repository "is not open to a reader at all".
- `foundations/environment_facts.md` has no entry about the predecessor game. A search for `predecessor`, `MapPage`, `old game` and `loop-` found none.
- *Based on* `none` is consistent with the rest of D-327's comparison with the predecessor.
- One wording point is left: Minor 3.

### 5. Nothing left that the return step should have corrected

- **Part map.** The task's diff from `e84a73ce` lists 22 files, all modified and none added. `foundation_check.py` exits 0 with `0 errors`, so every tracked file is claimed.
- **Own search.** I repeated it with a positive control: `git grep -w` over `foundations`, `guidelines`, `AGENTS.md` and `src/browser/AGENTS.md` for `composeMaps`, `RungRow`, `forestDeep2`, `withOpenerShare`, `openerBestShare`, `cardHeading` and `goalText` exits 1. The same command finds `goalText` in `src/browser/view`.
- **Sampled entries.**
  - D-132 (`:5872`), D-53 (`:10412`) and D-368 (`:11421`). Their singular "the map it opened" reads as "each map it opened". `wayOnButtons` gives one button per opened map, and `end-window-lines.test.mjs:438-444` shows two.
  - D-448's "harder" against `balance/progression.mjs:357-359`.
  - The glossary `rung` (`foundations/glossary.md:344-348`) against `RungRow` and `composeMaps`.
  - The plan's *Choices* (`plan.md:123-140`) against the report's table "Choices that bind after the merge". Each binding choice is either held by a test, or is data or code, or stays a row of the questions table. None needed an entry.
- **No new Critical or Important finding** arises from the return step.

## Findings

### Critical

none

### Important

none

### Minor

1. **D-448's `tests:` clause leaves out the case that holds the comparison for a map whose opener is the first map. That case carries no `decision: D-448` line.**
   - Place: `foundations/decisions.md:6204` and `tests/balance/progression.test.mjs:241-267`.
   - What is wrong:
     - The case at `:241` measures Las with the character of Skraj lasu: a new character, no practice and no stock (`:251-262`). It asserts `harder` equal to `withOpenerShare < edge.bestShare` (`:263`). That is part of D-448's second paragraph: "measured with one character on both maps — the one … mode `progression` builds for the map that opens it …— the best reference program solves a smaller share".
     - The clause names only the case at `:275`.
     - The case at `:241` also catches mutation (c) of review-correction-1, the stock from the map's own chain (`reports/review-correction-1/mut-c.log`).
     - The template asks *Verification* to name "the tests that hold its sentences" (`.the-way/elements/decisions/template.md:200-204`), and `return_step.md` asks the step to name each test that holds part of the sentence.
   - Why it matters: an agent reading D-448 learns of one case of the measure and not of the one that holds the verdict "harder" and the stock. A change to `:241` would not be seen as touching D-448.
   - Why Minor: nothing the entry says is false, and the pair holds no example that `:241` holds. This gap was there before the return step, which did not close it.
   - Fix, for example: add a `decision: D-448 "A map is harder than the map that opens it: …"` line at `:241`, and to the clause "and a map opened by a map that no map opens measured with a new character, harder where its best share is the smaller".

2. **The report does not mark D-448 `the cycle's`, although the step added a violating example that neither the projected entry nor task 3 gave it.**
   - Place:
     - `reports/return-step-report.md:116-128` ("Marks for the request");
     - `foundations/decisions.md:6206`, the third violating example.
   - What is wrong:
     - `.the-way/task-cycle/skill/foundation_step.md:31-36` says that a pair of examples the writer adds, which its projected entry does not give, makes the entry `the cycle's`. The exception is a pair kept only until a test of the same change holds the sentence, and this example is kept because no test holds it.
     - The report quotes the example word for word under "D-448's added violating example", but marks only D-465, and says D-464, D-466 and D-327 were already marked.
   - Why it matters: the request puts each entry marked `the cycle's` before the human (WAY-114). Without the mark, the description may list the example without saying that the entry as a whole now carries the cycle's words.
   - Why Minor: the quote is there, so the human will see the words either way. Only the mark is missing, and it lives in the report, not in a tracked file.

3. **In D-327's *Rationale* the new clause stands between "the tag of the state in a bar above the card" and "and its button in a bar pinned at the bottom". Its "which" can be read as attaching to "the card", and the button's bar is left without its source.**
   - Place: `foundations/decisions.md:10531`, "On a phone the predecessor puts the tag of the state in a bar above the card, which the product's own reading of the predecessor's code found, a record not open to a reader of the repository, and its button in a bar pinned at the bottom of the screen".
   - What is wrong:
     - A reader may take the reading as the source of "the card".
     - The bottom bar was read from the same code (`reports/foundation-report.md:150`, `MapPage.tsx:261-264`), and To do 8 also gives it, but the sentence does not say so.
   - Why Minor: it is the wording of a *Rationale*, and it misleads nobody about what the card does.
   - Fix, for example: "On a phone the predecessor puts the tag of the state in a bar above the card and its button in a bar pinned at the bottom of the screen, as the product's own reading of the predecessor's code found, a record not open to a reader of the repository; …".

No blocking finding, so no mark of contradiction.

## Declined to judge

- The sentence of `renderProgression` (`balance/progression.mjs:516`), which review-correction-1 Minor 3 found. It is code outside this range, and the return step rightly calls it an observation of code, not of an entry.
- The comment "Skraj lasu opens no map" (`tests/balance/progression.test.mjs:251`). It is outside the range and is review-fix-1's Minor note 2.
- Whether the rule "The screen Mapy" of `guidelines/styleguide-browser-view.md` (its **Decision** line, `:928`) should name D-466. Guidelines are not among what `return_step.md` compares, and the rule states no order of maps that D-466 sets.

## Checks

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | head `93209ec8`; `.the-way` `6ed3cb36`, matching the gitlink |
| `git diff ad2d8084..93209ec8`; `git log --stat ad2d8084..93209ec8` | 0 | 2 commits, 2 files |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, no switch) | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 120 info` |
| `npm test -- tests/view/end-window-lines.test.mjs` | 0 | 12 pass, 0 fail |
| `python -B <worktree>/.the-way/elements/common/foundation_check.py <scratch worktree of 93209ec8>`, baseline | 0 | `0 errors` |
| the same, with one word of the quotation at `end-window-lines.test.mjs:433` changed (`end-of-run window show the maps` → `end-of-run window list the maps`), a positive control | 1 | `tests/view/end-window-lines.test.mjs:433: the quotation stands in no binding sentence of D-466`, `1 error` |
| the same after `git checkout -- tests/view/end-window-lines.test.mjs` in the scratch worktree | 0 | `0 errors` |
| `node --test tests/view/end-window-lines.test.mjs` in the scratch worktree, with `dist/` copied in and `wayOnButtons` in `dist/browser/view/end-window-lines.js` mutated to `.map(…).reverse()` | 1 | 11 pass, 1 fail: the way-on buttons case |
| the same with the real `end-window-lines.js` restored | 0 | 12 pass |
| `git grep -n -w -e composeMaps -e RungRow -e forestDeep2 -e withOpenerShare -e openerBestShare -e cardHeading -e goalText -- foundations guidelines AGENTS.md src/browser/AGENTS.md` | 1 | nothing found |
| `git grep -n -w -e goalText -- src/browser/view`, positive control of the search | 0 | `src/browser/view/map-lines.ts:35` |
| `git diff --stat e84a73ce..HEAD` | 0 | 22 files, all modified |

Not run:
- `npm test` with no file: the handoff reserves the whole gate for CI on the request.
- The other test files the clauses name (`data.test.mjs`, `catalog-lines.test.mjs`, `map-lines.test.mjs`, `maps-screen.test.mjs`, `progression.test.mjs`): the range does not change them. I judged them by reading the cases; their last runs are the earlier reviews' at `ad2d8084`.
- A mutation of the D-448 measure: I relied on the logs of review-correction-1's mutations (a) to (d), which the clause is now written against.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md:200-204, 270-310`: the rules for `decision:` lines, the `tests:` clause and the pair, for questions 1 and 3.
- `.the-way/elements/common/rules.md:39-57` ("References", "Identifiers"): whether a decision may cite a guideline file, for question 2.
- `.the-way/elements/environment-facts/skill/SKILL.md` (whole) and `template.md:1-160`: for question 4.
- `foundations/decisions.md`:
  - D-448, D-449, D-464, D-465 and D-466, read whole (`:6195-6272`);
  - D-327, read whole (`:10489-10532`);
  - the passages around "styleguide" (`:475, 949, 4878, 5114, 5185`), around "not open to a reader" (12 places) and around "the map it opened" (`:5872, 5883, 10412, 11421`): for questions 2, 4 and 5.
- `foundations/environment_facts.md`: a search for the predecessor, plus its count of headings and of `reading:` sources, for question 4.
- `foundations/glossary.md:344-348` (`rung`).
- `guidelines/styleguide-browser-view.md`: the list of its headings, `:926-984` (the rule "The screen Mapy") and the search for „Otwarte”, for question 2.
- The test files `tests/sim/data.test.mjs:100-420`, `tests/view/catalog-lines.test.mjs:160-374`, `tests/view/map-lines.test.mjs:55-180`, `tests/view/maps-screen.test.mjs:563-626`, `tests/view/map-catalog.test.mjs:480-535`, `tests/view/end-window-lines.test.mjs:380-458` and `tests/balance/progression.test.mjs:238-327`, plus a search of `tests/` for the five decision numbers: for question 1.
- `src/browser/sim/data/maps.ts:84-273` (`RungRow`, `composeRung`, `composeMaps`), `balance/progression.mjs` (a search for `harder` and the labels) and `dist/browser/view/end-window-lines.js:219-229`: for questions 1 and 3.
- `package.json` scripts: to run the mutation without the gate.
- `reports/foundation-report.md`: a search for `MapPage`, for Minor 3.

## Working copies

- `.runs/review-return/` held:
  - a detached git worktree of `93209ec8` at `.runs/review-return/wt`;
  - within it, a copy of the reviewed worktree's `dist/` for the mutation.
- I removed the worktree with `git worktree remove --force .runs/review-return/wt` (exit 0), then ran `git worktree prune`.
- I removed the directory with `Remove-Item -Recurse -Force .runs/review-return`. `Test-Path` printed `False`, and `git worktree list` shows no worktree of mine.
- The reviewed worktree's `git status --short` is clean.
- Nothing is kept in `reports/`: both probes found no finding, and their inputs and commands are given in full under "Checks".
- No process is left running.

## Unread material

- `.runs/task-cycles/mechanizm-drabiny/plan.md`: only *Foundation entries* (`:7-17`) and *Choices* (`:123-140`), as the handoff names; *Slices* and *Coverage* not read.
- `reports/review-fix-1-report.md` and `reports/review-whole-report.md`: not read whole. I used only the lines a search for `MapPage`, "bar above" and "pinned at the bottom" found. Review-correction-1, which names what was open, I read whole.
- `.the-way/elements/environment-facts/template.md`: lines 1-160 of 212. The rest (withdrawals, catalogues, fields, examples) does not bear on whether a fact is written.
- `guidelines/styleguide-browser-view.md`: only `:926-984` and the searches named above. The range changes a comment line in a test of `browser-view`, not a file the styleguide governs in look.
- `guidelines/testing.md`: not read whole; a search for `decision:` and `tests:` found nothing. The range adds a comment line and no assertion, and the rules for that line stand in the decisions template, which I read.
- Everything else the handoff names was read whole: the return step's report and handoff, the frozen task, the method files and review-correction-1's report.

## Searches not found or unclear

- Not found: a sentence in `guidelines/testing.md` about `decision:` lines or the `tests:` clause (Grep for `decision:|tests:`). The rule stands in the decisions template instead.
- Not found: an entry about the predecessor game in `foundations/environment_facts.md` (searched for `predecessor`, `MapPage`, `old game` and `loop-`).
- Not found: D-466 among the decisions of the styleguide rule "The screen Mapy" (`:928`). I set this aside under Declined to judge.
