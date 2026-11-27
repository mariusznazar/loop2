FAIL 338fdec128c38743313e2f5e1555ee2c29a1905d

# Review of fix 1 — task cycle `mechanizm-drabiny`

Range `d7136c57ef232b05cad48b2aaaf5ef3f6cc99e5e..338fdec128c38743313e2f5e1555ee2c29a1905d` (five commits, eight files; `git rev-parse HEAD` printed the head given). `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, the commit the gitlink records. Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md`. Bounded by `reports/findings-1.md` (I1–I4, Minor 1–6).

## Findings of the findings file

| Finding | Verdict |
|---|---|
| I1 | fixed |
| I2 | fixed; the contested half, mutation (a), withdrawn as an equivalent mutant on today's data |
| I3 | **remains** (narrower than before) |
| I4 | fixed |
| Minor 1 | fixed |
| Minor 2 | fixed |
| Minor 3 | fixed (by the sentence in D-464) |
| Minor 4 | fixed |
| Minor 5 | fixed |
| Minor 6 | fixed |

### I1 — fixed

`python -B .the-way/elements/common/foundation_check.py` on the head ends with exit 0 and `0 errors`. The three lines now quote sentence starts:
- `tests/view/map-lines.test.mjs:66` quotes D-149's first binding sentence, and the case checks `sendMaps`, which is the subject of that sentence.
- `tests/view/map-lines.test.mjs:67` quotes D-466's first sentence, and the case checks the order of the maps' data.
- `tests/view/maps-screen.test.mjs:572` quotes D-43's second sentence, word for word as the nine other `decision: D-43 "None is `0`…"` lines of `tests/` do.

The 24 `decision: D-327 …` lines of `tests/view/` (the handoff says 22) quote three sentence starts: "The card of a map follows…", "It departs from the card of the predecessor game…", "Beside the name and the tag of its state…" and "At the right of the heading stands…". None runs into the clause the fix changed, and the check passes.

### I2 — fixed; the contested half withdrawn

- **Mutation (b)** (`candidates: candidatesOf(before)` → `candidates: []` at `balance/progression.mjs:333`): my own run fails the new case. Exit 1, 16 pass, 1 fail, the case "a map whose opener stands after other maps is compared with the practice and the stock the opener was measured with" (`reports/review-fix-1/mut-b.log`). Fixed.
- **Mutation (a)** (`practiceIn: openerSummary.practiceIn` → `practiceIn: {}` at `:332`): my own run passes everything. Exit 0, 17 pass (`reports/review-fix-1/mut-a.log`). I hold that this is an **equivalent mutant on today's data**, not an untested path a regression would let through today. My reasons, from my own reading:
  - The practice a comparison gets reaches a measured run in two ways, and nowhere else:
    - `skillsFor` (`balance/progression.mjs:75-86`) for the measured program;
    - `stockFor` → `stockOnMap` (`:108-134`), which builds the stock character from the same practice.
  - In both, the practice acts only through the ranks that `buyBranch` buys for `neededBranches`, which are the branches whose effect opens an action. In today's data those are `patrol` (3 points of `smallItemGathering`, whose thresholds 30/80/160 give 3 points at 160) and `pressure` (3 points of `tending`, thresholds 10/28/60, so 60). These are my own dump of `BRANCHES` and `SKILLS`.
  - The simulation reads practice in no other place that changes the result of a run. `skillBonus` and `branchActionAvailable` read ranks alone. The only other reader in a run is the death settlement (`hasNoPractice`, `src/browser/sim/game.ts:676`), and in a stock run of today's data it leaves the chest and the ranks as they are: there are no ranks to lose, and the gear is `{}`.
  - My probe `reports/review-fix-1/probe-openers.mjs` measures every map with every reference program on seeds 1–8 (output `probe-openers.out.txt`). No opener's practice buys a rank for any reference program: "ranksFromOpener none" at every map. The largest opener practice is Las — głębiej III's 140 gathering, and no map has any tending practice.
  - `measureProgression` takes no map data from its caller, so no test can build an opener with 160 gathering on today's data without adding code for the test, which `guidelines/testing.md` "Mutation testing" rejects ("Autor dodaje asercję tylko dla rzeczywistej luki w wymaganym zachowaniu").
  - By that section's classification it is a "zmiana równoważna", and the reason is the one above. The half of I2 it stood for is withdrawn, so I2 no longer blocks.
- What stays open is a Minor item (new Minor 1 below): the case becomes blind again the day an opener reaches 160 gathering. That day comes with task 16: Las — głębiej IV is measured with 180 on seeds 1–8, so a rung that IV opens has such an opener.

### I3 — remains

Contradiction: yes — D-466 (the change's own entry), against the rule "The screen Mapy" of `guidelines/styleguide-browser-view.md:971-972` („w grupie najpierw rozwiązane”) and `src/browser/view/catalog-lines.ts:375-377`.

- Place: `foundations/decisions.md:6261`, third sentence of D-466: "The catalog of the screen Mapy, within the groups each of its views makes (D-325, D-331), and the end-of-run window show the maps in the order of the game maps' data, the buttons „Otwarte: {mapa} →” after a completion included."
- What is wrong:
  - The finding named two places where the catalog does not follow the data's order:
    - the open/solved split of „Dokąd”;
    - the solved-first order inside a resource group of „Co daje”.
  - The new clause covers the groups. The order inside a „Co daje” group is still not the data's. `resourceGroups` puts the solved holdings of a group first and the unsolved after them (`catalog-lines.ts:375-377`), and the styleguide calls this an order *inside* a group, not a group of its own: "grupy po zasobie …; w grupie najpierw rozwiązane".
  - D-325 and D-331, which the clause cites as making the groups, say nothing of that order.
  - The fix report says that `resourceGroups` filters `holdings` "which keep the data's order inside each group". That passes over lines 375-377.
- Evidence: `reports/review-fix-1/probe-codaje.mjs` (output `probe-codaje.out.txt`) calls `catalogLines` with Skraj lasu, Las, Las — głębiej and Las — głębiej II solved and the view „Co daje”. Every group lists `forestDeep2(solved)` before `forestPack`. For example: "moss: forest(solved), forestDeep(solved), forestDeep2(solved), forestPack, forestDeep3". In the data, Las — wataha (`forestPack`) stands before Las — głębiej II. The state can happen in play: both maps are opened by Las — głębiej, and the player can solve II before Las — wataha.
- Why it matters: it is what the finding named. A later agent reads D-466 alone, for example the agent of task 16 that adds rungs to the catalog. It takes the sentence as a requirement that a „Co daje” group lists its maps in the data's order, which goes against the styleguide rule and the code. A reviewer would also hold the correct solved-first order to D-466. WAY-263: the entry states the order more broadly than the product does, without a qualification.
- Fix (one clause), for example: "The catalog of the screen Mapy, within the groups each of its views makes and after the place each view gives the solved maps among them (D-325, D-331), and the end-of-run window show …". The other way is to name only „Postęp” and the end-of-run window as following the data's order.
- Slice: none of the plan's slices. The sentence comes from the plan's *Foundation entries* (`5a0b6ccf`), and the fix rewrote it in `533d897d`.

### I4 — fixed

- The phone clause of D-327 (`foundations/decisions.md:10493`) now reads "stay in the heading at the top of the card, beside the name or, where they do not fit beside it, on the line under it, and „Wejdź — wybierz postać” stays at the top of the card". The *Verification* complying item (`:10523`) reads the same way.
- The card does what the clause says:
  - `.maps-card-tags` is one item of `.maps-card-heading` (`flex-wrap: wrap`, `src/browser/maps-screen.css:245-279`), so the tag, „ · ” and the opener wrap together under the name;
  - `.maps-card-go` stays in `.maps-card-top`, above the goal sentence (`src/browser/view/map-card.tsx:135-165`).
- The departure from the predecessor's phone card, with its bar above the card and its bar at the bottom, still stands as To do 8 asks.
- The styleguide (`guidelines/styleguide-browser-view.md:1009-1011`) agrees with the clause and the CSS.

### Minor 1–6 — fixed

1. Both copies of the skill now say: "a row for each map whose rows the first table holds, every map of the game or those `--maps` names" and "A map that no map opens, as Skraj lasu, has dashes in the four cells of the opener, the verdict's included". This agrees with the code:
   - `measureProgression` returns `maps` for the requested maps alone (`balance/progression.mjs:401-405`);
   - `openerTable` prints a row per entry (`:452-476`);
   - `plain` and `share` print „—” for null (`balance/check-map.mjs:102-109`), and `yesOrNo` prints „—” for null (`:441-444`).

   The comments at `:316` and `:446-451` agree. The two copies are byte-identical (`cmp` exit 0), and `tests/agent_workflow/test_loop2_balance_skill.py` passes.
2. The skill's first sentence on rungs (`.claude/skills/loop2-balance/SKILL.md:205-206`) now adds the ladder mechanism and the row, as the glossary entry `rung` (`foundations/glossary.md:346`) does.
3. D-464's new paragraph (`foundations/decisions.md:6231`) agrees with the code:
   - `resourceLines` writes „≈ {holding} z {tiles} kafelków” (`src/browser/view/map-lines.ts:181`);
   - `holdingsByResource` and the search's `map.resources.some` filter no density (`catalog-lines.ts:241`, `:320-329`).

   The paragraph asks the first density-0 rung to bring the change of the view. The new complying and violating items match it, and the *Scope* gains `browser-view`.
4. D-448's *Rationale* reads "a rung that differs from the map that opens it by its numbers".
5. The comment of `measureProgression` (`balance/progression.mjs:348-360`) names `opener`, `openerName`, `openerBestShare`, `withOpenerShare` and `harder`, and their null.
6. D-43 now stands in the **Decision** line of "The screen Mapy" (`guidelines/styleguide-browser-view.md:928`).

## New findings in the fix diff

None Critical or Important.

### Minor

1. **D-448's `tests:` clause and the new case's name claim the practice, which the case cannot tell apart on today's data.**
   - Places: `foundations/decisions.md:6204` ("tests: a map whose opener stands after other maps measured, beside its own measurement, with the practice and the stock the mode `progression` built for its opener"), and the name of the case at `tests/balance/progression.test.mjs:272`.
   - What is wrong: as the I2 section above shows, the case fails where the stock is lost and passes where the practice is lost.
     - The comment above the case says so.
     - D-448's *Verification* does not. It now leaves to an agent only "the part no test holds".
   - Why it matters: when task 16 adds a rung opened by Las — głębiej IV (180 gathering, which buys `patrol`), its agent reads that a test holds the practice and does not check it by hand. A regression of the kind of mutation (a) would then pass the gate. The condition for revisiting stands only in the fix report, which is no foundation entry.
   - Fix, for example: "… with the stock the mode `progression` built for its opener, and with its practice, which on the maps of today buys no rank, so no test yet tells it apart". The same condition could also go into the ladder section of the balance skill.
   - Within the task. It does not block (WAY-162).

### Minor note outside the fix diff

2. **A test comment repeats the misreading of Minor 1.** `tests/balance/progression.test.mjs:250` reads "Skraj lasu opens no map, so its character is a new one: no practice and no stock". Skraj lasu opens Las. What the case relies on is that no map opens Skraj lasu. The line is outside the fix diff, so this is a note and does not reopen the review.

## Declined to judge

- Whether the heading of the computer layout holds the longest name, the icon and the tag item on one line, as D-327's first paragraph ("with the tag of its state beside it") says. Neither the fix (it says "not measured") nor I measured it. The finding and this fix are about the phone clause alone.
- Whether "At the right of the heading stands „Wejdź — wybierz postać”" (D-327, second paragraph) holds at 360 px, where `.maps-card-top` wraps. The sentence is outside the fix diff and outside the findings.
- Whether, on the real measurement on seeds 1–500, any opener's practice reaches 160 gathering. Only the test's seeds 1–8 bear on whether the mutant is equivalent for the test. A run on 500 seeds takes far longer than a focused check.

## Checks

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | head `338fdec1…`; `.the-way` at the recorded `6ed3cb36…` |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 122 info` |
| `npm test -- tests/balance/progression.test.mjs` | 0 | 17 pass (`reports/review-fix-1/green.log`) |
| `node --test .runs/review-fix-1/mut-a/tests/balance/progression.test.mjs` (copy of `dist/`, `balance/`, `tests/sim/reference-programs.mjs` and the test file, `sed` at `balance/progression.mjs:332` to `practiceIn: {},`) | 0 | 17 pass: mutation (a) survives (`mut-a.log`) |
| the same with `sed` at `:333` to `candidates: [],` | 1 | 16 pass, 1 fail, the new case (`mut-b.log`) |
| `node .runs/review-fix-1/probe-openers.mjs` (all maps, all programs, seeds 1–8) | 0 | no opener's practice buys a rank (`probe-openers.out.txt`) |
| `node .runs/review-fix-1/probe-codaje.mjs <out>` | 0 | „Co daje” groups put Las — głębiej II before Las — wataha (`probe-codaje.out.txt`) |
| `npm test -- tests/view/map-lines.test.mjs` | 0 | 14 pass |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 | 52 pass |
| `npm test -- tests/balance/cli.test.mjs` | 0 | 25 pass |
| `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` | 0 | 3 tests OK |
| `cmp .claude/skills/loop2-balance/SKILL.md .agents/skills/loop2-balance/SKILL.md` | 0 | identical |
| `npx prettier --check` and `npx eslint` on `tests/balance/progression.test.mjs`, `balance/progression.mjs`, `tests/view/map-lines.test.mjs`, `tests/view/maps-screen.test.mjs` | 0, 0 | clean |
| manual: CSS and TSX of the card heading against D-327 and the styleguide | — | agree (I4) |

Not run:
- the typecheck, because the fix changes no TypeScript;
- StrykerJS, because the fix changes no file of `simulation`. The mutation runs above stand for the changed lines of `balance-tools`, where `guidelines/testing.md` asks the author to check in the head;
- the whole gate (`npm test` with no file), because the handoff reserves it. Nothing but that run checks the whole suite before the merge.

## Reaches beyond the dispatch

- `src/browser/sim/skills.ts` (`skillBonus`, `branchActionAvailable`, `hasNoPractice`, `paidPractice`), `src/browser/sim/game.ts:650-700` (`teamAfterDeath`) and `balance/engine.mjs:58-75` (`buildSkills`): to judge where practice reaches a run, for I2.
- `dist/browser/sim/data/skills.js` and `maps.js`, dumped: the branches, costs, thresholds and openers, for I2.
- `src/browser/view/catalog-lines.ts:240-408` and `src/browser/view/map-lines.ts:175-188`: for I3 and Minor 3.
- `src/browser/view/map-card.tsx:120-185` and `src/browser/maps-screen.css:225-300`: for I4.
- `foundations/decisions.md`: D-325, D-327, D-331, D-448, D-449, D-464, D-465 and D-466 whole, to check the wording; D-149 and D-43 through the lines the tests quote and the foundation check.
- `foundations/glossary.md:344-348`, the entry `rung`, for Minor 2.
- `balance/check-map.mjs:102-109` (`plain`, `share`), for Minor 1.

## Working copies

- `.runs/review-fix-1/`: the mutation copies `mut-a/` and `mut-b/`, the probes, the logs and a dump of the data. Removed with `rm -rf` by its full path; `ls .runs/` afterwards shows it gone. No git worktree was made, and no process was left running.
- A stray file `.runs/fc.err` (stderr of one foundation-check run, empty) was written outside my directory by mistake and removed by its full path at once.
- Kept beside this report, in `.runs/task-cycles/mechanizm-drabiny/reports/review-fix-1/`: `mut-a.log`, `mut-b.log`, `green.log`, `probe-openers.mjs` with `probe-openers.out.txt`, and `probe-codaje.mjs` with `probe-codaje.out.txt`. The probes import `../../balance/…` and `../../dist/…`, so they run from `.runs/review-fix-1/` of the worktree: `node .runs/review-fix-1/probe-openers.mjs` and `node .runs/review-fix-1/probe-codaje.mjs <output file>`.

## Unread material

- `.runs/task-cycles/mechanizm-drabiny/task_frozen.md`: only *To do* 4, 7 and 8 and rows 2, 3 and 5 of *Settlements to record* were read, as the handoff names them.
- `reports/review-whole-report.md` and its `reports/review-whole/` files: not read. `findings-1.md` carries its findings in the reviewer's words.
- `guidelines/styleguide-browser-view.md`: only lines 926–1025 were read, part of the rule "The screen Mapy", the lines the handoff names among them.
- `guidelines/coding.md`: not read. The fix changes no code beyond comments.
- `guidelines/testing.md`: read whole.
- `tests/view/map-lines.test.mjs` and `tests/view/maps-screen.test.mjs`: only the changed lines and the `decision:` lines (by search) were read.
- `src/browser/view/catalog-lines.ts` outside lines 240–408 and `map-card.tsx` outside lines 120–185: not read.

## Searches not found or unclear

- Not found: a reader of practice in a map run other than ranks and the death settlement (searched `src/browser/sim/` for `.practice`, `skillProgress` and `hasNoPractice`).
- Not found: a sentence of D-325 or D-331 that sets the solved-first order inside a „Co daje” group. The code's comment at `catalog-lines.ts:351` cites D-325 for it, but D-325's text does not hold it.
- Unclear: the handoff counts 22 `decision: D-327 …` lines in the view tests, and I found 24 in four files of `tests/view/`. The count does not change the result, since the foundation check passes.
