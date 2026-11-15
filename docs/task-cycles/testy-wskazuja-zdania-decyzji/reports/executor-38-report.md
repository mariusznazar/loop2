# Report — executor of slice 38 (the chronicle and the band of a discovery)

**Status:** done

## Commits (base `b052a0c6de307c2edf7d5897fd2227f1551967e4`)

- `dd7c3f91` test: :white_check_mark: mark the tests that hold the sentences of the decisions on what the chronicle holds, … and „Dodaj regułę z tym” with lines decision:
- `83850d6c` docs: :memo: name the tests of D-312, D-313, D-338, D-339, D-340, D-341, D-342, D-343, D-344, D-345, D-346, D-348, D-382 and D-383, drop the pair of D-312, D-313, D-338, D-340, D-341, D-344, D-345 and D-346, …, and rewrite the pair of D-339, D-342, D-343, D-348, D-382 and D-383 …

Author address after the first commit: `mariusznn@gmail.com` (`git log -1 --format=%ae`).

## Files changed (added / removed lines, base..HEAD)

| File | + | − |
|---|---|---|
| foundations/decisions.md | 94 | 111 |
| tests/sim/campfire.test.mjs | 12 | 0 |
| tests/sim/copy-actions.test.mjs | 22 | 0 |
| tests/sim/discovery.test.mjs | 17 | 0 |
| tests/sim/streak.test.mjs | 17 | 0 |
| tests/view/chronicle-entries.test.mjs | 25 | 0 |
| tests/view/chronicle-game.test.mjs | 8 | 0 |
| tests/view/chronicle.test.mjs | 42 | 0 |
| tests/view/discovery-band.test.mjs | 6 | 0 |
| tests/view/discovery-rule.test.mjs | 15 | 0 |
| tests/view/end-window-game.test.mjs | 1 | 0 |
| tests/view/end-window-lines.test.mjs | 1 | 0 |
| tests/view/end-window.test.mjs | 3 | 0 |
| tests/view/program-panel.test.mjs | 3 | 0 |
| tests/view/rule-editor.test.mjs | 3 | 0 |
| tests/view/run-screen.test.mjs | 5 | 0 |
| tests/view/tabs-area.test.mjs | 20 | 0 |

Only lines `// decision:` were added to tests (199 lines at 126 test cases); no test code, name or assertion changed and no mention of a decision number was removed. Each line stands as the first line inside its test case, after the lines `decision:` the case already held, as the earlier slices place them.

## Files beyond the slice's *Change* (item 5)

- tests/sim/streak.test.mjs — the events of a loss of the streak (D-341, D-348). Part `simulation`; no styleguide applies; `npm test -- tests/sim/streak.test.mjs` exit 0.
- tests/sim/copy-actions.test.mjs — the loss returned by acts on the copy and no other event (D-341, D-348). Part `simulation`; exit 0.
- tests/sim/campfire.test.mjs — the event of a campfire going out (D-344, D-348). Part `simulation`; exit 0.
- tests/view/run-screen.test.mjs — the chronicle in the tabs' area, the tab through the rule panel and the window, „Dodaj regułę z tym” in the band and in the window (D-338, D-346, D-313). `browser-view`, styleguide read; exit 0.
- tests/view/program-panel.test.mjs — the hint of a move reaching `editCopy`; „Dodaj regułę z tym” in the panel (D-348, D-313). `browser-view`; exit 0.
- tests/view/rule-editor.test.mjs — the hint of a move handed by the list (D-348). `browser-view`; exit 0.
- tests/view/end-window.test.mjs — the button in the window, disabled without a group (D-313). `browser-view`; exit 0.
- tests/view/end-window-game.test.mjs — the button of the window in the game view (D-313). `browser-view`; exit 0.
- tests/view/end-window-lines.test.mjs — the window's discovery line saying whether the rule can be added (D-313). `browser-view`; exit 0.

## Rows of the decisions (item 6)

No decision of this slice names invariants, and no invariant names one of them in *Derives from* (`grep` of foundations/invariants.md: 0 hits). "Invariants" is `none` in every row.

### D-312 — the band names the program rule the game wrote
- S1 („Where a band names the discovery…”) held in whole: tests/sim/discovery.test.mjs:920 „the first chill of a new game names the group Program…”, :926 „a copy whose first group the player renamed…”, :938 „a copy with no rule group gets the group Program…”, :945 „a group dragged above the one holding the rule…”, :957 „a group renamed while the band stands…”, :966 „the rule moved into another group…”, :976 „another group holding its own Zawsze → Eksploruj…”, :987 „the rule deleted while the band stands gives null, and the first other group…”, :1011 „a rule that is not Zawsze → Eksploruj…”, :1033 „the first finished exploration, a discovery that wrote no rule…”, :1062 „a saved document of the paused state, loaded again…”; tests/view/discovery-band.test.mjs:142 „the first finished exploration of a tile…”, :156 „the first chill of a new game gives the text … with no number of the rule”, :197 „a renamed first group gives its name…”.
- S2 („Where no rule group of the copy holds such a rule…”) held in whole: tests/sim/discovery.test.mjs:987, :1002 „the group of the rule deleted…”, :1011; tests/view/discovery-band.test.mjs:169 „the first chill of a copy that holds a rule „Eksploruj” of the player's own…” (the minute of exploring), :224 „the rule deleted while the band stands…”.
- Held by nothing: none. *Verification*: pair removed, clause `tests:` added.

### D-313 — what „Dodaj regułę z tym” does
- S1 („„Dodaj regułę z tym” in the band of a discovery adds…”) held in whole: tests/view/discovery-rule.test.mjs:61, :80, :100, :116, :136, :153, :266, :315; tests/view/run-screen.test.mjs:432 „at the first chill „Dodaj regułę z tym” adds „Zawsze → Wędruj”…”; tests/view/program-panel.test.mjs:1026 (same), :1085 „with a saved program shown on the list „Program:”…”.
- S2 („Where the discovery holds no such action but a condition…”) held in whole: tests/view/discovery-rule.test.mjs:180, :197, :214, :250, :266, :286 („does what „+ reguła” does”).
- S3 („Where the copy holds no rule group, the button is disabled”) held in whole: tests/view/discovery-band.test.mjs:313; tests/view/discovery-rule.test.mjs:383; tests/view/end-window.test.mjs:282 „… a discovery whose rule cannot be built has its button disabled”; tests/view/end-window-lines.test.mjs:234 „the discovery line … says whether its rule can be added”.
- S4 („The same button stands in the end-of-run window…”) held in whole: tests/view/end-window.test.mjs:231, :655; tests/view/end-window-game.test.mjs:1022; tests/view/run-screen.test.mjs:946.
- Held by nothing: none. *Verification*: pair removed.

### D-338 — what the chronicle holds
- S1 („A manual map run keeps a chronicle…”) held in whole: tests/view/chronicle.test.mjs:154 (actions), :173 (losses with cause), :266 (combat), :425 (discovery, loss), :504 (change of the copy).
- S2 („The player filters it by these kinds in the area with the tabs…”) held in whole: tests/view/tabs-area.test.mjs:233 (filter row), :272 (a filter shows its kind); tests/view/run-screen.test.mjs:222 (the chronicle in the tabs' area); tests/view/chronicle-game.test.mjs:267 (none in the world area).
- Held by nothing: none. *Verification*: pair removed.

### D-339 — where the chronicle lives, what stands after a load
- S1 („The chronicle lives in the memory of the page…”) held in part: tests/view/chronicle-game.test.mjs:175 „the chronicle and the tab picked are there after Przejście, Siedziba and Przejście again” (leaving and coming back clears none of it).
- S2 („After a load of a saved game state…”) held in whole: tests/view/chronicle.test.mjs:361, :382, :395; tests/view/tabs-area.test.mjs:456; tests/view/chronicle-game.test.mjs:267.
- Held by nothing: that the chronicle enters neither the game state nor the save. *Verification*: pair rewritten.

### D-340 — entries of actions
- S1 held in whole: tests/view/chronicle.test.mjs:154 (words of the rule's row, no number), :248 (no entry at the end of an action).
- S2 held in whole: tests/view/chronicle.test.mjs:139, :300, :395.
- Held by nothing: none. *Verification*: pair removed.

### D-341 — entries of a loss of the streak
- S1 held in whole: tests/view/chronicle.test.mjs:173 (words, `danger`, five causes), :425, :504; tests/sim/streak.test.mjs:142, :153, :164, :174, :184, :216, :236, :248; tests/sim/copy-actions.test.mjs:328, :449, :472, :482, :499, :507, :522, :531, :539; tests/sim/discovery.test.mjs:128.
- S2 held in whole: tests/view/chronicle.test.mjs:504 (two entries in one minute, each under its filter); tests/sim/streak.test.mjs:184, :248 (none at a streak of zero).
- Held by nothing: none. *Verification*: pair removed.

### D-342 — entries of changes of the copy
- S1 held in whole: tests/view/chronicle-entries.test.mjs:39, :53, :63, :87, :102, :113, :124, :142, :151, :161, :179, :196; tests/view/chronicle.test.mjs:482, :504, :551 (save, save as new, switch, discard).
- S2 held in part: tests/view/chronicle.test.mjs:583 „an edit of the copy after a death stands at the game minute of the death”, :536 „an edit of a saved program gives no entry”.
- Held by nothing: the entries after a completion. *Verification*: pair rewritten.

### D-343 — the list and the filters
- S1 („Over the list of the chronicle stands a row of filter buttons…”) held in part: tests/view/tabs-area.test.mjs:233, :272, :402; tests/view/chronicle.test.mjs:120, :266, :607; tests/view/chronicle-game.test.mjs:232.
- S2 („The entries stand newest at the top…”) held in part: tests/view/tabs-area.test.mjs:272, :343.
- S3 held in whole: tests/view/tabs-area.test.mjs:372.
- Held by nothing: the row standing over the list; the game minute in `text-label` in a column on the left; the background `panel` (the tests read the class `chronicle-minute`, not a role — R4).
- *Verification*: pair rewritten.

### D-344 — the kind „Świat”
- S1 held in whole: tests/view/chronicle.test.mjs:221; tests/view/tabs-area.test.mjs:272; tests/sim/campfire.test.mjs:828, :841, :858, :872, :884, :905.
- S2 held in whole: tests/view/chronicle.test.mjs:221; tests/view/tabs-area.test.mjs:272.
- Held by nothing: none. *Verification*: pair removed.

### D-345 — the entry of a discovery
- S1 held in whole: tests/view/chronicle.test.mjs:425, :454.
- Held by nothing: none. *Verification*: pair removed.

### D-346 — the pick of „Kronika” or „Teren”
- S1 held in whole: tests/view/chronicle-game.test.mjs:175 (Siedziba and back), :204 (Restart); tests/view/chronicle.test.mjs:310 (Restart), :361 („Kronika” after a load); tests/view/run-screen.test.mjs:364 (rule panel), :876 (end-of-run window); tests/view/tabs-area.test.mjs:144, :184 (the pick in the page's memory).
- Held by nothing: none. *Verification*: pair removed.

### D-348 — where the chronicle learns what happened
- S1 held in part: tests/sim/streak.test.mjs:142, :153, :164, :174, :184, :216, :236; tests/sim/copy-actions.test.mjs:328, :449, :507, :539; tests/sim/discovery.test.mjs:128, :194 (same events however the span is split); tests/sim/campfire.test.mjs:828, :841, :858, :872, :884, :905; tests/view/chronicle.test.mjs:425 (a loss read inside one reading of 84 minutes); tests/view/tabs-area.test.mjs:402 (paragraph from the facts the map run keeps).
- S2 held in part: tests/view/chronicle-entries.test.mjs:39 … :210 (all 13); tests/view/chronicle.test.mjs:551; tests/view/program-panel.test.mjs:742; tests/view/rule-editor.test.mjs:417, :430, :451; tests/sim/copy-actions.test.mjs:328, :449, :472, :482, :499, :507, :522, :531, :539 (an act returns no event but the loss).
- Held by nothing: the game state holding none of these events; the hint of a move never entering the simulation.
- *Verification*: pair rewritten.

### D-382 — the list of a long chronicle
- S1 held in whole: tests/view/tabs-area.test.mjs:491, :542; tests/view/chronicle.test.mjs:607, :643, :697.
- S2 held in whole: tests/view/chronicle.test.mjs:482 (rename does not rewrite); tests/view/tabs-area.test.mjs:597, :402.
- S3 held in part: tests/view/tabs-area.test.mjs:626; tests/view/chronicle.test.mjs:665, :725.
- Held by nothing: a row already drawn is not drawn again when an entry is added above it (searched: no test compares row elements across a draw).
- *Verification*: pair rewritten.

### D-383 — the pick of a filter
- S1 held in part: tests/view/chronicle.test.mjs:120 (send), :310 (Restart), :361 (after a load); tests/view/chronicle-game.test.mjs:204 (Restart), :232 (send after „Zakończ”); tests/view/tabs-area.test.mjs:233 (the pick held by the page's memory).
- Held by nothing: the filter kept through leaving the screen and coming back (tests/view/chronicle-game.test.mjs:175 checks the tab only).
- *Verification*: pair rewritten.

## Pairs rewritten, for the human to accept at the merge

No pair was added; six were rewritten, and eight removed (D-312, D-313, D-338, D-340, D-341, D-344, D-345, D-346).

- **D-339** — for the chronicle kept out of the game state and the save:
  - complies: the saved game state holding no entry of the chronicle, and the chronicle bringing no new version of the save
  - violates: an entry of the chronicle written into the game state or the save
- **D-342** — for the edits of the copy after a completion:
  - complies: a program rule fixed after a completion at game minute 480 giving its entry at 480
  - violates: an edit of the copy after a completion giving no entry, or giving one at another game minute
- **D-343** — for the place of the row of filters, the role and the column of the game minute and the background of the list:
  - complies: the row of filter buttons over the list; „212” in `text-label` in a column on the left beside „Zbierz — Patyk”; the list on the background `panel`
  - violates: the row of filter buttons under the list; the game minute in the role of its entry's text, or after the text; the list on another background
- **D-348** — for the events kept out of the game state and the hint of a move kept out of the simulation:
  - complies: the game state and the save holding no loss of the streak and no campfire gone out; the hint of a move handed to the chronicle alone
  - violates: a field of the game state, and with it of the save, holding the losses of the streak; the hint of a move passed to a function of the simulation
- **D-382** — for the rows already drawn when an entry is added above them:
  - complies: a new entry at the top of a grown window drawing its own row alone, the rows under it standing as they were drawn
  - violates: every row of the window drawn again whenever an entry arrives
- **D-383** — for the filter kept through leaving the screen of the map run and coming back:
  - complies: „Czynności” picked, then Siedziba and back to the map run, with „Czynności” still picked
  - violates: the pick lost at a return from Siedziba

## Checks run

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the edits, before and after the last two lines) | 0, `0 errors`, no line `held by nothing` |
| control: the quotation of chronicle-game.test.mjs:176 broken to `…of the pagex`, then the same check | 1, `the quotation stands in no binding sentence of D-339`; file restored from a copy, diff back to 8 added lines |
| `npm test -- <file>` for each of the 16 changed test files, one run per file | 0 each; pass counts: campfire 35, copy-actions 35, discovery 49, streak 19, chronicle-entries 13, chronicle-game 4, chronicle 28, discovery-band 10, discovery-rule 18, end-window-game 27, end-window-lines 11, end-window 14, program-panel 53, rule-editor 75, run-screen 20, tabs-area 13; fail 0 in each |
| `npm test -- tests/view/tabs-area.test.mjs` again after its last two lines | 0 (13 pass) |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <the 16 changed .mjs files>` (twice: after the script, after the last lines) | 0, „All matched files use Prettier code style!” |
| `git diff -U0 b052a0c6… -- foundations/decisions.md`, read | 14 hunks, each inside the *Verification* field of one of the 14 decisions; nothing else of an entry changed |

Not run: the full gate `npm test` with no file (not this executor's, as the handoff gives). `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run; they fail at the base with `FileNotFoundError` (handoff).

## Own-work check

- Requirement most likely missed: "every test that holds a sentence carries a line", i.e. a test holding a sentence of these decisions left without one, especially outside the files of *Change*.
- Check: `grep` of all `tests/**/*.mjs` for the content of the sentences — `Nic tu jeszcze`, `przerwana:`, `Ognisko wygasło`, `Gra dopisała`, `Porzucono zmiany`, `Zapisano kopię`, `Przełączono postać`, `Dodano regułę`, `chronicle-filters`, `pickFilter`, `chillRuleGroupName`, `discoveryRule(`, `addDiscoveredRule`, `campfireExtinguished`, `streakLost`, `copyChangeTexts`, `entriesToDeath` — and of all tests mentioning `chronicle` or `Kronika`, and the hits read case by case.
- What it showed: hits in 13 files; those beyond the files I had marked were tests/view/scene.test.mjs (stand-ins `addDiscoveredRule: () => …`, no sentence held) and tests/view/end-window.test.mjs:94, :420 („Ognisko wygasło” as data of „Ostatnie minuty”, D-368's). It also showed tabs-area.test.mjs:144 and :233 assert that a pick reaches the page's memory (`chronicle.snapshot().tab` / `.filter`), which I had first left unmarked while marking :184 for the same fact: I added D-346 at :144 and D-383 at :233 and re-ran that file and the checks (above).

## Choices and the ways rejected

- **Marking by what the case is for, not by every incidental assertion.** Where a case asserts, on the way, a value a sentence gives that another case holds as its point (for example tabs-area.test.mjs:272 also asserts „Zbierz — Patyk” and the `danger` role of a loss; discovery-band.test.mjs:232 asserts the band's sentence while it checks that no band stands without a discovery), I marked the sentences its name and its comment `Catches …` name. Rejected: a line for every sentence any assertion touches, which would put five to eight lines on many cases. Cost if wrong: a reviewer finds a few cases that would also fail on a sentence they carry no line for; nothing is left unheld, as each such sentence has its own tests.
- **Simulation tests marked for the chronicle's sentences.** The events `streakLost` and `campfireExtinguished` are what the chronicle reads (D-348), so tests of the events hold the part of D-341 and D-344 that is about when and with what an entry comes (only above zero, in the minute, a death included, the streak and the cause; a campfire going out). Rejected: leaving D-341 / D-344 to view tests alone, whose events are written by hand. Cost if wrong: lines on sim tests a reviewer reads as holding D-348 alone.
- **D-346 held in whole.** "Through the whole map run" read as the sentence the concrete clauses after it spell out (Siedziba, „Restart”, rule panel; also the end-of-run window, run-screen.test.mjs:876). Rejected: a pair for "the whole map run" beyond those. Cost if wrong: a small pair missing.
- **The insertion was made by a script** (`.runs/executor-38/add_lines.py`, a spec of test names and quotation keys, dry run first, every name matched once, line endings kept); the two last lines and one D-348 line at chronicle.test.mjs:425 by hand.

## Remarks for the human (R3)

- D-345's binding sentence quotes the band („Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach…”), and that quotation holds a full stop followed by a space, so by the template's rule a "sentence" of the entry begins at „W regułach”. Nothing breaks; a quotation from „W regułach…” would pass the check though it starts mid-example. No change made.
- No wording of these entries found stale against the code. D-382 says the window grows "by that size"; the tests check only that it grows, not by how much — a test narrower than the sentence, not a stale sentence.

## Reaches beyond the dispatch

- `src/browser/sim/run.ts:466-498`, `src/browser/sim/understanding.ts:474-516`, `src/browser/view/discovery-band-text.ts`, `src/browser/view/chronicle.ts:100-262` — to know which events and functions the tests exercise (search by content, item 2).
- `foundations/invariants.md` (grep only) — whether any invariant derives from these decisions: none.
- Test files beyond *Change*, by case: listed in "Files beyond the slice's *Change*".
- `the author's rules on writing scripts, outside the repository` and `git.md` — the user's rules before a script and a commit.

## Working copies

- `.runs/executor-38/` in the worktree: the spec and script of the insertion, the outputs of the test runs and of the foundation check, a copy of chronicle-game.test.mjs for the control run. Removed with `rm -rf` before returning; `ls` of it then answers "No such file or directory", and `git status --short` is empty. Nothing kept in `reports/`; the tables above hold what the report needs.

## Unread material

- `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/styleguide-browser-view.md`: read whole.
- `foundations/glossary.md`: read lines 130-259 (map run kinds, copy, streak, chronicle …); lines 1-129 not read.
- `foundations/part_map.md`: read only by `grep` of `tests/` (which part owns each test file); the rest not read.
- `.the-way/elements/decisions/template.md`: read 105-265 (covers the named 111-127, 162-166, 220-260).
- `foundations/decisions.md` D-73 (1641-1654) and D-82 (1761-1774): read only as quoted in the task's "Decisions in play", not in the log.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73`: read as copied in the handoff, not in the file.
- Test files read whole: chronicle, chronicle-game, chronicle-entries, tabs-area, discovery-band, discovery-rule. Read by case only: tests/sim/discovery.test.mjs (118-217, 862-1066 and the list of cases), streak (1-40, 125-239), copy-actions (325-526), campfire (795-915), run-screen (215-260, 355-504, 866-1000), program-panel (730-800, 995-1169), rule-editor (405-470), end-window (225-335, 580-700), end-window-game (684-712, 1015-1060), end-window-lines (225-275), state-store (205-260).

## Searches not found or unclear

- A test that the chronicle stays out of the game state and the save (D-339): none found (`chronicle` in tests/sim only in D-212 lines).
- A test that the game state holds no event, or that the hint of a move never reaches the simulation (D-348): none (`hint` in tests/sim: 0 hits).
- A test that a row already drawn is not drawn again when an entry is added above it (D-382): none (`drawn again|renders|same element…` in the chronicle and tabs tests: only the paragraph case, tabs-area.test.mjs:597).
- A test of the filter kept through leaving the screen and coming back (D-383): none (`filterPressed` only in chronicle-game.test.mjs, used at :204 and :232).
- A test of the role `text-label` of the game minute, its column or the background `panel` of the list (D-343): none; the tests read the class `chronicle-minute`.
- A test of an edit of the copy after a completion (D-342): none; :583 uses a death.
