# Settlement review — icon titles in the footer, and deliberate breaks of the settlement's checks

## Settlement code review

- Commits reviewed, each diffed on its own (`git show <commit>`), from `git log --oneline
  1098bae~3..HEAD`: fc809ac `feat(view): name each icon's game-icons.net title in the footer
  credit` · 30c77eb `docs(sim): cite D-22 for the layout draw order instead of the spec` · 1098bae
  `docs(readme): say credits.ts also holds the icons' titles` · cf5fe99 `fix(view): read each
  icon's title from the resource data, not the view`. The foundation and check commits between them
  (77b6046 … 1b62937) are reviewed here only where the code depends on them, and through the breaks
  in the second section.
- Net code change fc809ac~1..cf5fe99: `src/browser/sim/data/resources.ts` gains `iconTitle` per
  resource; `src/browser/view/footer.ts` carries `title: resource.iconTitle` into `FooterCredit`
  and writes „{resource}: „{title}”, {author}, …” per line; `credits.ts` ends where it started
  (fc809ac added `title`, cf5fe99 removed it again); `tests/view/icons.test.mjs` and
  `tests/sim/data.test.mjs` pin the four titles; `src/browser/sim/layout.ts:7` cites D-22; README
  lines 23 and 29.
- Against: D-27/1, icon-credits/1, content-identifiers/1, D-18/1, the facts
  `game-icons-{wood-stick,berry-bush,fern,flax}-title/1` and `cc-by-3-adaptation-credit/1`
  (§ 4(b)(ii) "the title of the Work if supplied").

What I ran, in a temporary detached worktree of cf5fe99 (node_modules copied in; removed afterwards):

| Check | Result |
|---|---|
| `npm test` | exit 0; `tests 173`, `pass 173`, `fail 0`, `skipped 0` |
| `python -B -m unittest test_content_identifiers test_icon_credits test_program_closed_lists test_walk_feasibility test_walk_target test_program_world_reference test_map_run_layout test_terrain_drawing_numbers` (from `tests/invariants`) | exit 0; `Ran 22 tests`, `OK` |
| `test_content_identifiers` at fc809ac alone (worktree moved to fc809ac, then back) | **FAILED**: `src/browser/view/credits.ts names the resource stick by its identifier 'stick'`, from the string `'Wood stick icon'` |

### Strengths

- The titles match the four environment facts exactly: "Wood stick icon", "Berry bush icon",
  "Fern icon", "Flax icon", including the word "icon" and the letter case the pages' headings
  give (`foundations/environment_facts.md:106-136`). Nothing was trimmed or translated, so the
  credit names "the title of the Work if supplied" as § 4(b)(ii) asks, and icon-credits/1 holds.
- Each footer line now carries all five things icon-credits/1 asks for: the title, the author,
  the page (the link behind „game-icons.net”), the licence `CC BY 3.0` (a link), and the
  statement of change. The order matches D-27/1's sentence.
- `ResourceDef.iconTitle` is a required field, and `RESOURCES` is checked with
  `satisfies Record<string, ResourceDef>` (`src/browser/sim/data/resources.ts:7,15`). A resource
  added without a title therefore fails the type check, before any test runs.
- The tests pin the titles as written-out values and do not read them back from the code under
  test. `tests/view/icons.test.mjs:126-146` builds the footer and compares each whole line with a
  `TITLES` table. `tests/sim/data.test.mjs:34-40` pins the data. A title changed in the data
  breaks both.
- `src/browser/sim/layout.ts:7` now cites D-22 instead of a spec section in the git-ignored
  `.runs/`. D-22/1 does make the layout draw "in a fixed order", so the citation holds and will
  last.
- The README describes where the titles live (`README.md:29`) and what the footer shows
  (`README.md:23`), and it is in step with cf5fe99.

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

None.

#### Minor (Nice to Have)

1. **fc809ac on its own fails content-identifiers/1, and nothing in the code says why the title
   moved.** At fc809ac the title stood in `src/browser/view/credits.ts`. The check reads the word
   `stick` in `'Wood stick icon'` as naming the resource `stick` (verified above). cf5fe99 moved
   the titles into `resources.ts`, where the check does not look. What a person meets: a
   `git bisect` or a revert across these commits lands on one commit whose invariant run fails.
   A later maintainer who sees the title in the simulation's data and the author, page and change
   in the view's `credits.ts` may "tidy" the title back into `credits.ts` and trip the same
   check, not knowing why. Leaving it costs nothing today. The fix is cheap: one line in
   `ResourceDef.iconTitle`'s comment (`resources.ts:6`), e.g. "kept here, not in credits.ts: a
   title may contain a resource's identifier as a word, which the view may not name". If the
   branch is squashed on merge, the history half of this goes away by itself.

2. **One icon's credit now lives in two places.** The title is in
   `src/browser/sim/data/resources.ts` (part `simulation`). The author, the page and the
   statement of change are in `src/browser/view/credits.ts` (part `browser-view`). Swapping or
   adding an icon means editing both files and both parts. The tests catch a missing half
   (`icons.test.mjs:155-163` for the credit, the required type for the title), so nothing ships
   broken. The cost is upkeep, and a split that D-27/1 does not explain. D-18/1's "a change of data
   alone" lists maps, items, creatures and skills, not credits, so this does not violate D-18;
   it is a matter of cohesion. Options: (a) leave it — two edits per icon, guarded by tests;
   (b) later, move the whole credit (author, page, change) next to `iconTitle` in the data, in a
   change of its own — one place per icon, at the cost of touching browser-view and its tests.
   I recommend (a) for this request.

### Declined to judge

- Showing an English title („Wood stick icon”) in a Polish interface — § 4(b)(ii) asks for the
  title as supplied, and the plan settles it as untrimmed; a translation would be a product choice
  outside this review.
- The README's footer template nests „…” inside „…” (`README.md:23`) — a matter of typography in
  documentation, not of behaviour.
- Whether the four titles are still the pages' headings today — the environment facts were read
  on 2026-10-13 and their *Method* is `TODO`; checking the live pages is outside a code review and
  outside what I may reach.
- The changes to the checks and the foundation between the code commits (77b6046 … 1b62937) as
  documents — judged here only through the deliberate breaks below.

### Assessment

**Ready to merge?** Yes

**Reasoning:** The footer now names each icon's title exactly as the facts quote it, together
with the author, page, licence and change, and all tests and the relevant invariant checks pass.
The two Minor points are about history and upkeep, not behaviour.

## Deliberate breaks of the settlement's checks

- I wrote each break from its invariant's sentence in `foundations/invariants.md` at cf5fe99. I
  did not write the sentences, the checks or the code. I read a check only after its breaks had
  run, to explain a break that passed.
- Where I ran them: a temporary detached worktree of cf5fe99 in the session scratchpad, with
  `node_modules` copied in. A script applied one break, ran `npm run build` (every break
  compiled, so no break failed for a reason of its own), then ran the invariant's check from
  `tests/invariants`: `python -B -m unittest -v <module>`. It then restored the tree
  (`git checkout -- .` plus `git clean` of the added files). After the last break the worktree
  was removed and pruned. No Docker is involved. `C:\Storage\repos\loop2-mag-w-lesie` was not
  modified (HEAD cf5fe99, tree clean).
- Every unbroken run passed (`U` rows). A break **fails** = the check caught it. A break
  **passes** = a gap, unless noted otherwise.

| Invariant (check module) | # | Break (change to the product) | Result |
|---|---|---|---|
| program-closed-lists/1 (`test_program_closed_lists`) | U | unbroken | pass |
| | PCL1 | `checkAction` returns any unknown action kind instead of throwing (`src/browser/sim/game.ts`) | **fail** (`action kind 'gather' … ` accepted) |
| | PCL2 | `checkCondition` turns any unknown condition kind into `always` instead of refusing | **fail** (`condition kind 'never' …`) |
| | PCL3 | `checkAction` accepts one extra kind, `rest`, that `ACTIONS` in the data does not list | **fail** (`action kind 'rest' …`) — the check finds even a single named extra kind |
| walk-feasibility/1 (`test_walk_feasibility`) | U | unbroken | pass |
| | WF1 | going to a resource is possible also while the character stands on a tile holding it (`minutes > 0` dropped, `src/browser/sim/program.ts`) | **fail** |
| | WF2 | unrevealed tiles count as holding the resource (`tile.revealed` dropped from the predicate) | **fail** |
| | WF3 | going is impossible when the nearest such tile is one step (5 min) away (`minutes > 5`) | **fail** |
| | WF4 | a revealed tile with a stock of 0 counts (`resource in tile.stock`) | **fail** (`test_a_stock_of_zero_is_no_stock`: "going to stick was possible and first, and not started") |
| walk-target/1 (`test_walk_target`) | U | unbroken | pass |
| | WT1 | the walk heads for the farthest qualifying tile (`<` → `>` in `nearestTile`, `src/browser/sim/hex.ts`) | **fail** |
| | WT2 | the walk heads also for unrevealed tiles holding the resource | **fail** |
| | WT3 | the first step is the first neighbour in list order, toward the target or not (`===` → `>=`) | **fail** |
| | WT4 | the walk lands on the target tile in one activity, not one move toward it (`src/browser/sim/run.ts`) | **fail** ("the move's target (2, 0) is no neighbour of (0, 0)") |
| program-world-reference/1 (`test_program_world_reference`) | U | unbroken | pass |
| | PWR1 | a `walkTo` rule keeps a tile number `tile` given with it | **fail** |
| | PWR2 | a resource may be given, and is held, as a number (its index) | **fail** |
| | PWR3 | a `walkTo` rule keeps a position `at: {q, r}` given with it | **fail** |
| map-run-layout/1 (`test_map_run_layout`) | U | unbroken | pass |
| | MRL1 | the layout is drawn from `seed + program.rules.length` | **fail** |
| | MRL2 | exploring a tile empties its resources (`stock: {}`) | **fail** |
| | MRL3 | a move onto a tile takes 1 from each stock there; which resources it holds stays, how much changes | **pass — gap in the reading, see below** |
| terrain-drawing-numbers/1 (`test_terrain_drawing_numbers`) | U | unbroken | pass |
| | TDN1 | the panel draws an SVG `<text>` with each icon's stock (`terrain-picture.ts` + `terrain-panel.ts`) | **fail** |
| | TDN2 | each icon gets a `<title>` (hover tooltip) with its stock | **fail** |
| | TDN3 | each revealed tile with resources shows its total stock, "N szt." | **fail** |
| icon-credits/1 (`test_icon_credits`) | U | unbroken | pass |
| | IC1 | the fern's title in the data trimmed to `Fern` | **fail** |
| | IC2 | the footer line leaves the title out (`footer.ts`) | **fail** |
| | IC3 | the berry bush's and the fern's titles swapped in the data | **fail** |
| | IC4 | a new icon file `assets/icons/oak.svg` with no resource and no credit | **fail** ("oak.svg: the footer shows no credit with its page on game-icons.net") |
| | IC5 | the wood stick's title in lower case, `wood stick icon` | **fail** |

### The one break that passes: MRL3 (map-run-layout/1)

What a player would see: two map runs on one seed, under different programs, whose tiles hold the
same kinds of resources but in different amounts at the same game minute. In MRL3 that happens
because a character that walks more lowers the stocks on the tiles it enters.

Why the check passes: its docstring
(`tests/invariants/test_map_run_layout.py:10-12`) reads "the resources on a tile" as "which
resources the tile's `stock` holds — the keys of `stock` … not how much". Its "Does NOT cover"
lists "how much of a resource a tile holds". The check does what it says. The gap lies between
the sentence and that reading. "The same resources on each tile" can fairly be read as including
the amounts. D-22/1, which the invariant comes from, is about the layout drawn from the seed.
What the sentence promises a player — the program does not change the map — fails as soon as the
program changes amounts.

Cost today: none. No code path changes a tile's stock (there is no gathering, and `renewMinutes`
is not used), so amounts cannot differ between runs yet. The gap opens with the first feature that
consumes or renews stock. A program that decides where to gather will then legitimately change
amounts. At that point the sentence has to say which it means anyway.

Choices for whoever owns the invariant:
- (a) Keep the narrow reading and make the sentence say so, e.g. "… have the same resources
  present on each tile …". This costs one word in `foundations/invariants.md`. A later gathering
  feature stays compatible with it.
- (b) Widen the check to compare the amounts too. This costs a change to an invariant check,
  which needs its own independent assessment. It will have to be undone, or the invariant split,
  once gathering exists.

I recommend (a).

**Other gaps: none.** 27 of 28 breaks fail, each for the reason its change predicts. All seven
checks pass on the unbroken tree.

## Re-review of cf5fe99..267e2ec

- Range: 99c7f3b (`foundations/invariants.md`), f534c21 (`tests/invariants/test_map_run_layout.py`),
  267e2ec (`src/browser/sim/data/resources.ts`). Three files, +11 −5. Nothing else changed.
  Checkout at 267e2ec, tree clean before and after.
- **MRL3 now passes legitimately.** The sentence now reads "the same kinds of resource present on
  each tile, whatever their amounts, at every game minute, whatever programs they run under". MRL3
  keeps the kinds on each tile and changes only the amounts, so it no longer makes the sentence
  false. The sentence now says what the check reads (`test_map_run_layout.py:10-12`, unchanged).
- **The other breaks still fail; I did not re-run them.** f534c21 changes only the docstring's
  quotation of the sentence (lines 1-3). No line of the check's code changed, and MRL1 (layout
  drawn from `seed + rules`) and MRL2 (exploring empties a tile) change which kinds a tile holds,
  which the reworded sentence still forbids. Their earlier failures stand.
- **Minor 1 is fixed.** The comment on `ResourceDef.iconTitle` (`resources.ts:6-11`) says why the
  titles live in the data and not in `credits.ts`: content-identifiers/1 keeps resource names out
  of the view, and "Wood stick icon" contains `stick` as a word. The code is unchanged.
- **Format guard of the changed foundation file**:
  `python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base
  d2b4687 --merge-onto <origin/main>`. Here d2b4687 is `git merge-base HEAD origin/main`.
  Result: `0 error(s), 0 warning(s), 0 unchecked`. map-run-layout/1 is new on this branch, so
  rewording it needs no version bump.
  For the record, a run with `--base cf5fe99` instead reports "the sentence changed … the version
  is 2, or a correction names …". That error comes only from measuring against a commit in the
  middle of the branch. It does not apply to the merge.

**Verdict:** Yes, ready to merge. The MRL3 gap is closed by the rewording, the other
map-run-layout breaks still fail, Minor 1 is fixed, and Minor 2 stays as the recommended
"leave it".
