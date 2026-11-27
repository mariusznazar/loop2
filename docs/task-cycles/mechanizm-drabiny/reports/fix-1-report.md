done with concerns

# Fix 1 — the findings of the review of the whole change, task cycle `mechanizm-drabiny`

Start `d7136c57ef232b05cad48b2aaaf5ef3f6cc99e5e`, head `338fdec128c38743313e2f5e1555ee2c29a1905d`, branch `task/mechanizm-drabiny`, `.the-way` at the pinned `6ed3cb36`. Variant: the fix of a review's findings.

The concern: half of I2 is contested. Mutation (b) (`candidates: []`) now fails a test. Mutation (a) (`practiceIn: {}`) is equivalent on today's data: it changes no output of the measurement on any map. The evidence is under I2 below. No test written against today's data can see it.

## Commits

| Commit | Findings | Files |
|---|---|---|
| `6f36aaf8` | I1 | `tests/view/map-lines.test.mjs` (+2 −2), `tests/view/maps-screen.test.mjs` (+1 −1) |
| `cf7203e7` | I2 | `tests/balance/progression.test.mjs` (+40 −0) |
| `533d897d` | I3, I4, Minor 3, Minor 4, plus the `tests:` clause of D-448 for the I2 test | `foundations/decisions.md` (+11 −9) |
| `f53f96ef` | I4 (styleguide), Minor 6 | `guidelines/styleguide-browser-view.md` (+4 −2) |
| `338fdec1` | Minor 1, Minor 2, Minor 5 | `.claude/skills/loop2-balance/SKILL.md` (+6 −3), `.agents/skills/loop2-balance/SKILL.md` (+6 −3), `balance/progression.mjs` (+12 −7, comments only) |

## Findings

- **I1 — fixed, `6f36aaf8`.** Each of the three lines now quotes a sentence start of the binding sentences:
  - `tests/view/map-lines.test.mjs:66` quotes D-149 "A map whose opening map is still unsolved is absent from the screen Mapy, and from the opening map’s first completion it stands there with its card for every character". The test checks `sendMaps`, the list the screen Mapy's catalog uses.
  - `:67` quotes D-466 "A new map stands in the order of the game maps' data right after the last map that the map opening it already opens".
  - `tests/view/maps-screen.test.mjs:572` quotes D-43's second sentence, "None is `0`, … from `text-strong`". This is word for word the quotation that six other tests already carry for the mask clause.
  - None of the 22 D-327 lines changed, and I4 left every sentence start they quote intact. Before the fix: `python -B .the-way/elements/common/foundation_check.py` exit 1, `3 errors`. After it, and after each later change of an entry: exit 0, `0 errors`.

- **I2 — partly fixed (`cf7203e7`), partly contested.**
  - The new case "a map whose opener stands after other maps is compared with the practice and the stock the opener was measured with" measures `forest` and `forestDeep` on seeds 1–8 with `forestBest` and `forestDeepBest`.
  - It builds the expected `withOpenerShare` itself: for each program, it sweeps `forestDeep` with `skillsFor(program, forest.practiceIn)` and the chest of that program's row of Las (the stock Las was measured with), and takes the best of those shares. It also asserts `openerBestShare`.
  - A precondition asserts that the stock changes the best share: 87.5 with the stock against 0 with an empty chest.
  - The case carries `decision: D-448 "A map is harder than the map that opens it: measured with one character on both maps — … —"`, so D-448's *Verification* gained a `tests:` clause (`533d897d`). It expects no number of a rung (D-449).
  - Runs. The mutation copies were under `.runs/fix-1/mut-a/` and `.runs/fix-1/mut-b/`: copies of `dist/`, `balance/`, `tests/sim/reference-programs.mjs` and the new test file, each with one one-line `sed` at `balance/progression.mjs:332` or `:333`. They were run with `node --test <copy>/tests/balance/progression.test.mjs`, because `npm test -- <file>` takes only a file of the worktree's own `tests/`.
    - Green, unmutated worktree: `npm test -- tests/balance/progression.test.mjs` exit 0, 17 pass.
    - Mutation (b) `candidates: []`: exit 1, 16 pass, 1 fail. The new case fails at its assertion, `0 !== 87.5` (`reports/fix-1/mut-b.log`).
    - Mutation (a) `practiceIn: {}`: exit 0, 17 pass (`reports/fix-1/mut-a.log`).
  - Why (a) is contested. It is an equivalent mutant on today's data, not a gap a test can close:
    - Practice enters a measured run only through the ranks that `skillsFor` buys. It buys only branches whose effect opens an action (`neededBranches`: `patrol`, which needs 160 practice of gathering, and `pressure`, which needs 60 of tending). `buildSkills` sets nothing else that the run reads.
    - No opener on any chain of today's data reaches either threshold. With every reference program on seeds 1–8, the gathering practice that each map is measured with is 41 for Las, 68 for Las — głębiej, 101 for II, 140 for III and 180 for IV. The largest opener's practice is III's 140, and no best program on the chain tends (`reports/fix-1/probe3.out.txt`).
    - On `forestDeep`, the case's map, the share is the same with and without the opener's practice: 87.5 against 87.5 (`reports/fix-1/probe-forestDeep.out.txt`).
    - So (a) changes no output of `measureProgression` today. Classified by `guidelines/testing.md`, "Mutation testing", it is an equivalent mutant, and adding an assertion only to kill it is what the rule rejects.
  - What would make (a) visible, and why I did not do it:
    - A field that echoes the practice the comparison measured with, for example `withOpenerPracticeIn` returned by `measureFrom`. It adds code and an output field only for the test, and the field always equals the opener's `practiceIn`.
    - The data growing an opener with 160 practice of gathering. Las — głębiej IV, at 180, would be the opener of a fifth rung.
  - **Recommendation:** accept the case as it stands. The comment of the case states the limit. Revisit (a) when a rung opened by a map with 160 practice enters, for example in task 16.

- **I3 — fixed, `533d897d`.**
  - The third sentence of D-466 now reads: "The catalog of the screen Mapy, within the groups each of its views makes (D-325, D-331), and the end-of-run window show the maps in the order of the game maps' data, the buttons „Otwarte: {mapa} →” after a completion included."
  - Checked against `src/browser/view/catalog-lines.ts`. `dokadRegion` and `resourceGroups` filter `shown`/`holdings`, which keep the data's order inside each group.
  - The entry's other sentences and its meaning are unchanged, and it stays marked `the cycle's`.

- **I4 — fixed, `533d897d` and `f53f96ef`.**
  - The D-327 clause now reads: "and in the phone layout the tag of the state and „odsłania ją {mapa}” stay in the heading at the top of the card, beside the name or, where they do not fit beside it, on the line under it, and „Wejdź — wybierz postać” stays at the top of the card, where the predecessor's card on a phone puts …".
  - The *Verification* complying item reads: "the tag „otwarta” in the heading, beside the name or on the line under it, and „Wejdź — wybierz postać” at the top of the card".
  - The departure from the old card (its bar above the card and its bottom bar) stays as written. The quoted sentence starts "The card of a map follows the card of the predecessor game", "It departs from the card of the predecessor game, beyond its words and the roles of its parts, in six things only", "Beside the name and the tag of its state …" and "At the right of the heading stands …" are intact.
  - The card's code agrees: `.maps-card-tags` in `src/browser/maps-screen.css` wraps the tag, the separator and the opener as one item inside `.maps-card-heading`, and `.maps-card-top` keeps the button at the top.
  - The styleguide did say "beside" where the card does not. `guidelines/styleguide-browser-view.md:1006`, "obok niej znacznik stanu", had no condition. The fix adds the clause "znacznik, „ · ” i „odsłania ją {mapa}” przechodzą razem do linii pod nazwą, gdy obok niej się nie mieszczą, na przykład w wąskim nagłówku układu telefonu (D-327)".
  - Left as it was: the first paragraph of D-327, "with the tag of its state beside it". It describes the card in general. The phone clause now qualifies it, and the computer layout's card area holds the longest heading of today's data on one line. This is my judgment and was not measured.

- **Minor 1 — fixed, `338fdec1`.**
  - The skill (both copies) now says the second table has "a row for each map whose rows the first table holds, every map of the game or those `--maps` names". It also says "A map that no map opens, as Skraj lasu, has dashes in the four cells of the opener, the verdict's included".
  - The comments at `balance/progression.mjs:316` and `:445` now say "no map opens" and "a row per requested map".
  - Checked against the printing (`openerTable`, `plain` and `share` print "—" for null) and by one run, `npm run --silent balance -- progression --maps forestEdge,forestDeep4 --seeds 1-4 --programs forestBest,forestDeepBest --out .runs/fix-1/own-check.md`, exit 0. Its second table had two rows: Skraj lasu with four dashes, and Las — głębiej IV with its opener's cells filled.

- **Minor 2 — fixed, `338fdec1`.** The first sentence on rungs in both copies is replaced: "A rung is a game map that differs from the map that opens it by its numbers alone and that the ladder mechanism makes from a row naming that map (D-448, D-464)." No sentence was added.

- **Minor 3 — fixed by the sentence, `533d897d`.**
  - D-464 gains a paragraph: "The card of a map and the view „Co daje” of the catalog of the screen Mapy show every resource of the map's data, and the search of the catalog finds the map by each of them, a resource of density 0 included, which the card gives as „≈ 0 z {kafelki} kafelków” (D-327, D-325), so the change that brings the first rung whose row gives a resource the density 0 makes the view leave that resource out of the card, „Co daje” and the search."
  - D-464 also gains a complies and a violates item about moss at density 0. Its *Scope* gains `browser-view`.
  - Checked in the code: `resourceLines`, `holdingsByResource` and the search's `map.resources.some` filter no density.
  - Rejected: the view leaving such a resource out of the card, the search and „Co daje”. It changes the view's code and tests for a case no rung of this task uses. If no rung ever needs density 0, the cost is a dead branch. The sentence is reversible at no cost.
  - The paragraph is marked `the cycle's`, for the request to put before the human.

- **Minor 4 — fixed, `533d897d`.** D-448's *Rationale* reads "a rung that differs from the map that opens it by its numbers costs no code".

- **Minor 5 — fixed, `338fdec1`.** The comment of `measureProgression` now names `opener`, `openerName`, `openerBestShare`, `withOpenerShare` and `harder`, each null where no map opens the map.

- **Minor 6 — fixed, `f53f96ef`.** D-43 now stands in the **Decision** list of "The screen Mapy", between D-40 and D-44.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (no switch), at the start | 1 | `3 errors` (I1) |
| the same, after I1 and again after the entries were changed, and on the head after the commits | 0 | `0 errors` each time |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 122 info` |
| `npm test -- tests/balance/progression.test.mjs` | 0 | 17 pass |
| `node --test .runs/fix-1/mut-a/tests/balance/progression.test.mjs` (mutation a) | 0 | 17 pass (contested, see I2) |
| `node --test .runs/fix-1/mut-b/tests/balance/progression.test.mjs` (mutation b) | 1 | 16 pass, 1 fail: the new case |
| `npm test -- tests/balance/cli.test.mjs` | 0 | 25 pass |
| `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` | 0 | 3 tests OK |
| `npm test -- tests/view/map-lines.test.mjs` | 0 | 14 pass |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 | 52 pass |
| `npm test -- tests/view/end-window-lines.test.mjs` | 0 | 12 pass |
| `npm test -- tests/view/map-catalog.test.mjs` | 0 | 13 pass |
| `npm test -- tests/view/catalog-lines.test.mjs` | 0 | 15 pass |
| `npm run typecheck` | 0 | — |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 | 2 tests OK |
| `npx prettier --check tests/balance/progression.test.mjs tests/view/map-lines.test.mjs tests/view/maps-screen.test.mjs balance/progression.mjs` | 0 | all formatted |
| `npx eslint` on the same four files | 0 | — |
| `cmp .claude/skills/loop2-balance/SKILL.md .agents/skills/loop2-balance/SKILL.md` and `sha256sum` | 0 | identical, `4cac9d93a0af847b93b0bda963aa55dce8ddb00884f31f92e3bd37891c65d118` for both |

- Not run: the product's whole gate (`npm test` with no file), as the handoff says. It waits for the start signal of the day's advisor. No CI runs before that, so nothing but that run checks the whole suite before the merge.
- No check failed and then passed on a second run.

## Own-work check

- **Requirement most likely unmet:** that the corrected skill sentence on the second table says exactly which rows the code prints, a narrowed run included. A run with `--maps forest` measures Skraj lasu but prints no row of it.
  - **Check:** the narrowed run in the Minor 1 entry above. **Result:** two rows, the requested maps only. Skraj lasu has dashes and Las — głębiej IV has its opener's cells filled, as the new sentences say. My first wording, "each map the run measures", would have been wrong. I replaced it before the commit.
- **Second requirement:** that the new D-327 wording contradicts neither the code nor the styleguide. Both were read: `map-card.tsx:136-166` and `maps-screen.css:234-279` on the code side, and the styleguide after its edit. Both agree with "beside the name or, where they do not fit beside it, on the line under it".

## Walk

None, as the fix of a review's findings (WAY-406). The fix alters no behaviour a user sees: it changes tests, foundation and guideline text, comments, and the agent skill.

## Choices

- **I2, mutation (a):** contested rather than fixed by a field added for the test. The way rejected and its cost are under I2.
- **The I2 case's expected value** is built with `skillsFor` and `sweep`, and with the stock of the opener's own rows. The stock cannot be derived without the instrument. This is the same way as the case at `tests/balance/progression.test.mjs:213`. Rejected: asserting only that the share differs from a fresh character's. That check also passes where the practice is wrong.
- **Minor 3:** the sentence in D-464, with its *Scope* widened to `browser-view`. The view change was rejected, as given above. The cost if the sentence is wrong: task 16 has to make the view change before its first density-0 rung, which the sentence already demands.
- **The `tests:` clause added to D-448**, because the new case holds its second paragraph by a line `decision:`. The pair of examples stays for the order of Las — wataha, which no test holds.
- **The fix's entries are marked `the cycle's`:** the new D-464 paragraph and the reworded clauses of D-466 and D-327. They are written to the findings, not to a row of the task. Each is to be put before the human at the merge with the other entries of the cycle.

## Reaches beyond the dispatch

- **The-way process files**, for the foundation step: `.the-way/elements/common/way_of_working.md`, `rules.md`, `.the-way/elements/decisions/template.md`, `skill/read.md`, `skill/decide_entry.md`, `examples.md` and WAY-03 in the-way's decision log. The decisions' skill names them.
- **`foundations/glossary.md`**, the entry `rung`, for Minor 2.
- **Product code**, to check the wordings against what the code does:
  - `src/browser/view/catalog-lines.ts:255-400` and `src/browser/view/map-lines.ts:14-20, 175-188` for I3, I1 and Minor 3;
  - `src/browser/view/map-card.tsx:125-180` and `src/browser/maps-screen.css:230-300` for I4;
  - `src/browser/sim/skills.ts`, `balance/engine.mjs` `buildSkills`, the branches and thresholds of `dist/browser/sim/data/skills.js`, and `tests/sim/reference-programs.mjs` (the program list and its patrol and bandage programs) for the evidence of I2;
  - `balance/check-map.mjs` `plain` and `share`, and `balance/cli.mjs`, for Minor 1.
- **The review report** `reports/review-whole-report.md`, lines 1–95: the passages of I1–I4 and Minor 1–9. The findings file points at it.

## Working copies

- **`.runs/fix-1/`**, removed with `rm -rf` by its full path, and removal checked by `ls`. It held:
  - the probe scripts `probe.mjs`, `probe2.mjs` and `probe3.mjs`;
  - the mutation copies `mut-a/` and `mut-b/`;
  - the logs, and the table of the own-work run `own-check.md`.
- No git worktree was made, and nothing was left running.
- **Kept beside this report** in `reports/fix-1/`:
  - `mut-a.log` and `mut-b.log`, the runs against each mutation;
  - `probe.mjs` with its output `probe-forestDeep.out.txt`;
  - `probe3.mjs` with its output `probe3.out.txt`.
- The probe scripts import `../../balance/…` and ran from `.runs/fix-1/` of the worktree as `node .runs/fix-1/probe.mjs forestDeep forestBest forestDeepBest` and `node .runs/fix-1/probe3.mjs forestDeep4 1 8`. To rerun them, put them back at that depth.

## Unread material

- `guidelines/styleguide-browser-view.md`: only lines 915–1094 were read, which take in the whole rule "The screen Mapy" (926–1081). The handoff names lines 920–1090, not the whole file.
- `.the-way/task-cycle/skill/foundation_step.md` was read whole. `elements/common/reaching_another_skill.md` was not read, since no hand-over to another skill came.
- `task_frozen.md` and `plan.md` were not read: no finding needed a passage of them.
- `reports/review-whole-report.md` after line 95 was not read. Minor 7–9 and the review's sections on checks, coverage, reaches, working copies and searches are not this fix's.
- Everything else the handoff names was read whole:
  - `guidelines/testing.md` (in two parts, whole), `guidelines/coding.md`, `guidelines/coding-balance-instrument.md` and `src/browser/AGENTS.md`;
  - `balance/progression.mjs`, `tests/balance/progression.test.mjs` and the skill;
  - the decisions D-43, D-148, D-149, D-325, D-327, D-331, D-448, D-464, D-465 and D-466.
- Of `tests/view/map-lines.test.mjs` and `tests/view/maps-screen.test.mjs`, only the passages around the lines changed were read (1–30, 55–100 and 560–585).

## Searches not found or unclear

- **Not found:** an opener whose practice buys a rank on today's data, sought to make mutation (a) visible. See I2.
- **Unclear:** whether `node --test` on a mirrored copy under `.runs/fix-1/` counts as "the equivalent" of `npm test -- <file>` for the mutation runs. `npm test -- <file>` takes only an existing test file of the worktree.
