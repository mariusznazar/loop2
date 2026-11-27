PASS 26c0209e8a9bb9b882fce390ab61b12300562059

# Review of correction 1 — task rana-i-opatrunek

Range `83204edc5025b9f6ff60feb9c4b8f530c585edb7..26c0209e8a9bb9b882fce390ab61b12300562059` (four commits: `2998b1aa`, `b04a9f2f` part A; `dbc931e8` part B; `26c0209e` part C), computed with `git diff` and `git log` of that range. `git rev-parse HEAD` in the reviewed worktree gave the head named in the handoff. `.the-way` at `6ed3cb36…`, the commit the gitlink records.

Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md`, the remarks in place of a findings file. No subagent.

## The remarks, each made or not

| Remark | Asks | Verdict |
|---|---|---|
| 1 | the rule „Wytwórz — Opatrunek” judged by the pair, not by the kind; the predisposition in the type that says what a character can do; a test with a second recipe or a second target made up in the test, which would pass wrongly today; the four tests comparing the type changed | **made** |
| 2(a) | the cause „an old save would never get something new” written into `guidelines/coding-saved-game.md` through `the-way-maintain-coding-guidelines` | **made** (Minor notes m-1 to m-3 below) |
| 2(b) | let through | nothing to make; not judged |
| 2(c) | „Teraz” shows „Wytwórz — Opatrunek” whole at 360 px if a few lines of CSS do it, with no change of the scene's width; before and after screenshots at 360 px | **made** (Minor note m-4) |
| 3 | let through | nothing to make; not judged |
| 4 | let through | nothing to make; not judged |

### 1 — the pair at the rule check (`src/browser/sim/understanding.ts`, `types.ts`)

- The type: `Repertoire` (`understanding.ts:37-40`) is now `Understanding & { predispositions: readonly SkillId[] }`, a required field. `repertoireOf` sets it to a copy of the predispositions (`understanding.ts:108`). `actionInRepertoire` (`understanding.ts:132-151`) judges an action that takes an item by its kind, its item and `pairOpen(kind, item, repertoire.predispositions)`, the same helper `repertoireOf` already used. This matches the binding sentence of D-120 („an action is open to a character when the character skill that its pair of verb and target grows is among the predispositions”) and D-193's pair.
- Derived, never saved: the only builder is `repertoireOf`, called by `editorRepertoire`, `knownRepertoire` (`understanding.ts:188-229`) and `programOf` (`game.ts:184-198`). No code assigns a repertoire into the state (Grep over `src/` and `balance/` for `Repertoire|repertoireOf|editorRepertoire|knownRepertoire`, with the positive hits listed). `Understanding` in `types.ts` changed only in its comment. `saved-game.ts` is not in the diff. So the saved shape is unchanged, and no raise of `SAVED_GAME_VERSION` is needed.
- Every reader is consistent: `ruleInRepertoire`, `programInRepertoire`, `outsideReason` and the `reach` of `judgeProgram` (`program.ts:603-654`) all go through `actionInRepertoire`. The game (`programOf` in `game.ts`, `judging.ts`, `loop.ts`) and the balance instrument (`balance/engine.mjs:161`) both reduce the program through `programOf`. So the invariant `instrument-game-agreement` is held by construction. The view readers (`program-editor.ts`, `item-target-pick.ts`) read only `items`, `actions` and `conditions` (see o-1 for the target pick).
- The reason: a pair the predispositions close, whose kind and item the repertoire holds, falls to the last line of `undiscoveredPart` (`understanding.ts:267`): „jeszcze nieodkryte: Wytwórz”. That is the reason the game already gave for a kind the archetype closes whole. It is one of the two reasons D-310 allows for a rule outside the repertoire.
- The comparisons in `tests/sim/repertoire.test.mjs`: the four `deepEqual` the remark counted (lines 107, 136, 319, 327) and the three of `editorRepertoire` (lines 433, 436, 446) now expect the field. Each still compares the whole repertoire, so none was loosened. The literals `SMALL` and `bare` carry the field.
- The new tests (`tests/sim/action-targets.test.mjs:441-538`): two cases keep the kind „Wytwórz” open through a second recipe item laid in the test. One uses `board`, a recipe no skill grows. The other uses `splint`, grown by a skill `probe` laid in the test, and that skill is among the predispositions. A third case is the converse: with `tending` and without `probe`, the splint lies outside. That converse also proves the laid skill is read. Each test name says the break it catches.
- **Fails on the base, passes on the head** (checked): I ran the file with the base `understanding.ts` in a worktree of the head. Exit 1, 12 passed and 3 failed: exactly the three new cases, each `true !== false` at `actionInRepertoire`. On the head both files pass (see Checks).
- The mutation tool on the changed lines (`understanding.ts:97-109`, `136-150`): 31 mutants, 30 killed, 1 survived. The survivor is on the unchanged line 140 (o-2).

### 2(a) — the cause in the guideline of the saved game (`guidelines/coding-saved-game.md:103`, `:124`)

- The sentence states the cause right. A change after which an old document, whose keys still match, describes a game the rules no longer make raises the version, because the old save would never get what is new. The example is a tree entering the Understanding only in the minute its first action is discovered. That is the case of this task (To do 9), and of the comment over `SAVED_GAME_VERSION` (`src/browser/sim/saved-game.ts:86-95`).
- It stands where the causes stand: in the first paragraph of the rule „Wersja podnoszona razem z kształtem”, right after the cause of the ordinary actions. It is in the file's Polish and in its style; line 102, which it follows, is an unwrapped long line too.
- The fields *Decision*, *Invariant*, *Good* and *Bad* stay true: none says anything the sentence makes false.
- The parenthesis on data checked at the load (`:124`) now says that a change of those things does not raise the version by itself, except the two causes named. That is true, and needed: adding a tree is a change of „umiejętności postaci i gałęzi ich drzew” of that list, and this task raised the version for it.
- The form against `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md`: see m-1 and m-2.
- The process: see m-3.

### 2(c) — the row „Teraz” at 360 px (`src/browser/run-screen.css:621-623`, comments `:536`, `:612-614`, `src/browser/view/now-rows.tsx:7-9`)

- The change is one rule in the existing phone block, `.now-row .now-text { white-space: normal; }`. The block already carries its comment with D-396, stands after the rules of the computer layout and touches none of them. That is the styleguide rule „Two layouts and one threshold between them”. No value is written in place of a token (D-43).
- D-334 binds „keeps one height whatever it holds”, and the row keeps it: 48 px (`--touch-target-min`, D-396) holds two lines of 18.2 px. Nothing in D-334, D-335, D-336, D-396 or the styleguide (read whole) says the row cuts its text, and D-396 forbids text over the border of its frame. „Potem” is untouched, and so is the scene's width.
- My own measurement, in a worktree of the head with `npm run local`, the state the walk composed (`reports/walk-compose.mjs practice`), and Playwright CLI as a phone (360 × 740, touch), with the report's probe `correction-1c-row-measure.js`:
  - **after** (head CSS): `.now-text` 114/114 wide and 36/36 high (two lines, none lost), `white-space: normal`; `.now-row` top 498, height 48; `.next-row` top 550; scene 336 × 152; world area 318 wide.
  - **before** (base `run-screen.css` served in place of the head's): `.now-text` content 134 > box 114 (cut), one line; every box under it at the same place.
  - The numbers are equal to the report's, field by field. Kept as `reports/review-correction-1-before-360.json` and `reports/review-correction-1-after-360.json`.
- The 1280 px layout: the rule stands only inside `@media (width < 1280px)`, so the computer layout cannot change. I did not re-measure it (see Checks).
- The screenshots at `mariusznazar/screenshots` commit `fc94fd3a…`, `c1-teraz-before-360.png` and `c1-teraz-after-360.png` (both 360 × 740), looked at:
  - before: „Wytwórz — Opatr…” with an ellipsis;
  - after: „Wytwórz —” over „Opatrunek”, with the icon centred beside them;
  - „Potem”, the body row and the backpack line stand at the same places in both.
- The limit the report names (two lines) is judged in m-4.

## Findings

### Critical

none

### Important

none

### Minor

- **m-1** — `guidelines/coding-saved-game.md:103`, the example in parentheses. It restates the mechanism of D-195 inside a rule's text: „nowe drzewo umiejętności wchodzi do Zrozumienia dopiero w minucie gry, w której odkryto jego pierwszą czynność”.
  - What is wrong: `.the-way/product-guidelines/template.md` says „A rule lists no state and repeats no decision or value”. What holds no rule is an example, and examples stand under `## Examples`.
  - Why it matters: if D-195 changes, the parenthesis is a second copy that drifts. Today it agrees with D-195 and with the code (`understanding.ts:421-438`), so nobody is misled now.
  - Fix: name the example by its decision („jak drzewo, które wchodzi do Zrozumienia według D-195”), or move it under `## Examples`.
- **m-2** — `guidelines/coding-saved-game.md:103`, the new cause. The rule's *Decision* names D-206 · D-213 · D-369, and none of them carries this cause.
  - What is wrong: D-206 speaks of „the version number of its shape”, and D-369 carries the earlier cause, the keys of `minutesByAction`. The new cause raises the version where the shape does not change, so every player of the old version loses the save (D-206). That is a choice with a real cost. The template wants such a choice carried by a decision the rule names.
  - Its carrier today: the human's remark and the task's To do 9, which the human accepted.
  - Why Minor: the sentence agrees with what the code did and with what the human asked, and no reader is led to a wrong act.
  - For the return step: a sentence of D-206 (a raise where an old save would describe a game the rules no longer make), or a decision of its own, that the rule then names.
- **m-3** — the process of part B. `correction-1b-report.md`, „Method steps followed”, shows that only part of `the-way-maintain-coding-guidelines` was read and run.
  - Read: the entry point, `product-guidelines/coding/SKILL.md`, `recognize.md` and both templates.
  - Left unread on purpose: `starting_set.md`, `research.md`, `trial_run.md`, `kinds.md`, `settle.md`, `task_document.md`, `hand_back.md`. The skill's step 2 names `starting_set.md` „at every refresh or extension” and `research.md` „at every extension”, and the agent itself named the mode a refresh or extension.
  - Why Minor: the skipped files deal with standing checks, linters, a trial run, the audit of kinds and the hand-back to a refinement. None of them bears on one sentence of an existing rule, and the remark settles what the human would have been asked. The output does not change for it. The departure is named here because the remark asked for that path.
- **m-4** — `src/browser/run-screen.css:621-623`, the limit of two lines. A text of „Teraz” that needs a third line is cut silently, with no ellipsis.
  - What happens: the `.now-text` span grows with its lines, and the row, 48 px with `overflow: hidden`, centres it. So the clipping removes part of the first line and of the last.
  - Evidence: my probe, which injects texts into the running page. „Wytwórz — Opatrunek z bardzo długą nazwą” beside „reguła 1.1 · zostało 10 z 10 min” gives a span 73 px high in the 48 px row. `reports/review-correction-1-limit.js`, output `reports/review-correction-1-limit.out.json`.
  - Today no text reaches it. The widest right-hand text I could make up, „reguła 12.10 · zostało 120 z 120 min”, still leaves „Wytwórz — Opatrunek”, „Ucisk — Opatrunek” and „Zakłada opatrunek” on two lines (82 px box, 36/36 high). The longest label of the data is „Wytwórz — ognisko”, and the texts with no right-hand part („Walczy z niedźwiedziem”, „Czeka — żadna reguła nie pasuje”) have the whole row.
  - Before the change such a text ended in an ellipsis; after it, it would lose a half line at the top.
  - Fix (Minor polish): a clamp of two lines (`display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;` on the phone rule) would keep the ellipsis for a third line. The report weighed this and rejected it as more CSS for a case no action reaches; I agree it reaches no text today.

## Out of scope

- **o-1** — `src/browser/view/item-target-pick.ts:51-54`, `knownTargets`. The pick of the target of „Wytwórz” offers, ungreyed, every recipe item the Understanding holds, even where the character's predispositions close the pair. The cause: it filters by `items` alone, not by the pair (part A's probe, `reports/correction-1a-probe.out.txt`).
  - **Not a miss of remark 1.** The remark names the rule check, `actionInRepertoire` (the earlier Minor m-1) and the type that says what a character can do. Those are made, and the type now carries what the pick needs. The pick of the editor is another function, of the part `browser-view`, which the remark does not name.
  - It is also outside the correction's diff, and with today's data no player can reach it: the one archetype holds `tending`, the only tree that grows a recipe pair.
  - It sits against D-289's „what is discovered but may not be picked stands greyed with its reason” as soon as a second archetype or a second recipe skill exists.
  - Recommendation: carry it to the task with the club (task 9), which adds a second recipe item.
- **o-2** — `src/browser/sim/understanding.ts:140`, `case "patrol":`. The mutant `case "":` survives the eight test files of the narrowed run. With it, „Obchód” with an undiscovered resource would count as inside the repertoire, since the default branch finds no item target.
  - The line is not changed by the correction, and the gap is older. A test of „Obchód” with a resource the repertoire lacks would kill it.

## Declined to judge

- Items 2(b), 3 and 4 of the remarks: the human let them through.
- The wording of the reason „jeszcze nieodkryte: Wytwórz” for a rule whose verb the player has discovered but whose pair the archetype closes. D-310 allows only „gałąź niewykupiona” or „jeszcze nieodkryte: {name}”, and the game already gave this reason for a kind the archetype closes whole. Any other wording is a change of D-310, outside this correction.

## Foundation after the correction

No entry I read is false after the correction.

- D-120's binding sentence now agrees with the code. Its *Verification* can name the new tests of `tests/sim/action-targets.test.mjs`, which is the return step's work.
- D-206 („the version number of its shape”) is not false, but it does not carry the cause the guideline now gives (m-2).
- D-289 stays true of the code reachable today; o-1 names where it would stop being true.

## Checks (command and exit code)

- `npm test -- tests/sim/action-targets.test.mjs` on the head (worktree of `26c0209e`): exit 0, 15 passed.
- `npm test -- tests/sim/repertoire.test.mjs` on the head: exit 0, 33 passed.
- The same `action-targets` file with `src/browser/sim/understanding.ts` taken from `83204edc` (`git show 83204edc…:src/browser/sim/understanding.ts > src/browser/sim/understanding.ts` in my worktree, restored after): exit 1, 12 passed and 3 failed, the three new cases, each `true !== false`.
- `npx stryker run stryker-review-correction-1.json` (narrowed configuration, kept as `reports/review-correction-1-stryker.json`: mutate `understanding.ts:97-109` and `:136-150`, eight test files): exit 0, 31 mutants, 30 killed, 1 survived (o-2), score 96.77%.
- `python -B .the-way/elements/common/foundation_check.py` on the head: exit 0, 0 errors.
- `python -B .the-way/instruction-files/check_instructions.py` on the head: exit 0, 0 error, 0 warn.
- `npm run typecheck` on the head: exit 0.
- A manual check of the phone layout (method in section 2(c)):
  - `npm run build`, `node reports/walk-compose.mjs practice`, `npm run local` (address `https://127.0.0.1:64481`), `playwright-cli open --config=.playwright/cli.phone.config.json`;
  - a made-up account at `example.test` made through the card; the state sent by `PUT /api/saved-game` (200);
  - the probe `correction-1c-row-measure.js` run with the head CSS and with the base CSS; then the limit probe.
  - It showed what section 2(c) and m-4 say.
  - Session closed, start stopped (`npm run local:stop`: „Local starts stopped: 1”).
- A manual look at the two screenshots of the report, fetched from `raw.githubusercontent.com/mariusznazar/screenshots/fc94fd3a…/loop2/rana-i-opatrunek/`: as in section 2(c).
- Not run:
  - the whole suite: the cycle's own run before the request, as the method and the handoff give;
  - a new measurement at 1280 × 720: the change stands only inside `@media (width < 1280px)`, so the computer layout cannot change, and the report's byte-identical measurement agrees. Left unverified by me;
  - `tests/quality/test_function_and_file_size.py` on `action-targets.test.mjs`: the part report says it ran it with exit 0; not repeated.

## Reaches beyond the dispatch

- `foundations/decisions.md`, D-120, D-289 and D-310, each whole: to judge item 1, its reason and o-1.
- D-206 whole, and the invariant `save-version`: to judge m-2.
- D-334, D-335, D-336, D-396 and D-43, each whole: named by the handoff for item 2(c), read here as a reach of the method.
- A Grep of `foundations/` for sentences on raising the version (none generic beyond D-206 and D-369): for m-2.
- `src/browser/sim/game.ts:175-249` and `:300-310`, `src/browser/view/now-lines.ts`, `src/browser/view/now-rows.tsx`, `src/browser/view/item-target-pick.ts`, all whole except `game.ts`: for the readers of the repertoire and the texts of „Teraz”.
- `src/browser/sim/data/maps.ts`, the completion texts: for the longest texts of „Teraz”.
- `src/browser/run-screen.css:525-641`: for the rules of the rows.
- `.claude/skills/loop2-play/SKILL.md:1-350`: to start the game, operate it as a phone and send a state.
- `reports/walk-compose.mjs:1-90`: to compose the same state as part C.
- `.the-way/product-guidelines/coding/SKILL.md`: to check m-3.

## Working copies

- `.runs/review-correction-1/`, which held:
  - the worktree of the head `head/`, with its `.the-way` initialized at `6ed3cb36…`;
  - its `node_modules` junction to the main checkout's `node_modules`;
  - the narrowed Stryker configuration;
  - the local start's database under `head/.runs/local-start/` and the composed state under `head/.runs/walk/`;
  - `head/.playwright-cli/`;
  - the downloaded screenshots under `shots/`, and the measurement outputs.
- Removed: the junction first with `rmdir` (the shared `node_modules` checked present after), then `git worktree remove --force`, `git worktree prune` and the directory by its full path. `git worktree list` shows no remainder, and the reviewed worktree's `git status --short` is empty.
- Kept beside this report: `review-correction-1-stryker.json`, `review-correction-1-limit.js`, `review-correction-1-limit.out.json`, `review-correction-1-before-360.json`, `review-correction-1-after-360.json`.

## Unread material

- `.the-way/product-guidelines/coding/` files other than `SKILL.md` and `template.md`: not read. I judge m-3 from the skill's own steps.
- `src/browser/sim/game.ts`: read only at the lines named above.
- Everything else the handoff names was read whole: the remarks, `task_frozen.md`, the three part reports and the parts of their handoffs bearing on what each was to do, `guidelines/coding-saved-game.md`, `guidelines/styleguide-browser-view.md`, `.the-way/product-guidelines/template.md`, `.the-way/product-guidelines/coding/template.md`, and the review method files.
- The handoffs of parts A, B and C (`correction-1a/1b/1c-handoff.md`): not read whole. I took what each part was to do from the review handoff and the part reports.

## Searches not found or unclear

- A decision that carries a raise of the version where the shape does not change: not found beyond D-206's „version number of its shape” and D-369's keys (m-2).
