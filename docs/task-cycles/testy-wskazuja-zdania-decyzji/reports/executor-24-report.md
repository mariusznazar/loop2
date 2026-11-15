# Report — executor of slice 24 (Understanding and discovery in the simulation)

**Status:** done with concerns

## Commits

Range `12a43a40636c23ed5b20d9fefa4a960377d30c84..bd53ac8a`, author `mariusznn@gmail.com` (checked with
`git log --format='%h %ae'`, the same as the earlier commits of the branch):

- `6d283d13` test: :white_check_mark: mark the tests that hold the sentences of the decisions on when the player learns what the world holds, … with lines decision:
- `bd53ac8a` docs: :memo: name the tests of D-118, D-119, D-120, D-121, D-122, D-123, D-128 and D-403, drop the pair of D-118, D-120, D-121, D-126 and D-127, …, and rewrite the pair of D-119, D-122, D-123, D-128 and D-403 …

## Files changed (added / removed lines)

`foundations/decisions.md` 82/74 (only *Verification* fields of D-118, D-119, D-120, D-121, D-122,
D-123, D-126, D-127, D-128, D-403). Tests, comment lines `decision:` only, nothing removed:
`tests/sim/discovery.test.mjs` 38, `tests/sim/repertoire.test.mjs` 13, `tests/sim/data.test.mjs` 13,
`tests/sim/encounters.test.mjs` 10, `tests/sim/copy.test.mjs` 5, `tests/sim/loop.test.mjs` 4,
`tests/sim/skills.test.mjs` 3, `tests/sim/copy-actions.test.mjs` 3, `tests/sim/death.test.mjs` 2,
`tests/sim/saved-game.test.mjs` 1, `tests/sim/completion.test.mjs` 1,
`tests/view/discovery-band.test.mjs` 8, `tests/view/status-row.test.mjs` 7,
`tests/view/program-editor.test.mjs` 5, `tests/view/chronicle.test.mjs` 4,
`tests/view/end-question.test.mjs` 4, `tests/view/run-screen.test.mjs` 4,
`tests/view/discovery-rule.test.mjs` 2, `tests/view/scene.test.mjs` 2,
`tests/view/end-window.test.mjs` 1, `tests/view/end-window-lines.test.mjs` 1,
`tests/view/end-window-game.test.mjs` 1, `tests/view/program-panel.test.mjs` 1,
`tests/view/scene-picture.test.mjs` 1. 134 lines `decision:` in all.

Every line, by decision, with its test as `path:line` (line of the test's opening), the case's name and
the quotation: `reports/executor-24-lines.txt` beside this report.

Files beyond the slice's *Change*, one line each (item 5 of "Work of every slice"; for the `browser-view`
ones `guidelines/styleguide-browser-view.md` was read whole first, each file's focused test passed):

- `tests/sim/loop.test.mjs` — D-119, D-120 (a manual run's discovery widening an earning loop's pick; a bought branch per character).
- `tests/sim/skills.test.mjs` — D-119, D-120 („Obchód” offered and carried out only for its owner).
- `tests/sim/saved-game.test.mjs` — D-403 (the crafted documents refused as shape).
- `tests/sim/completion.test.mjs` — D-122 (a completion in the game minute of a discovery keeps it held).
- `tests/sim/copy-actions.test.mjs` — D-123 (the chill rule neither an unsaved change nor announced by a save).
- `tests/sim/death.test.mjs` — D-119 (the Understanding survives every death; a branch action drops out after a death that took the branch).
- `tests/view/discovery-band.test.mjs` — D-122, D-123 (the band).
- `tests/view/status-row.test.mjs` — D-122 (the clock at a stop at a discovery; the band's text).
- `tests/view/run-screen.test.mjs` — D-122, D-123 (the band above the program; its „Wznów”; the precondition on the rule the game wrote).
- `tests/view/scene.test.mjs` — D-122 (the scene in colour at a discovery).
- `tests/view/scene-picture.test.mjs` — D-122 (a stop at a discovery stands in colour).
- `tests/view/chronicle.test.mjs` — D-122, D-123 (the band's text entering the chronicle).
- `tests/view/end-question.test.mjs` — D-122 (the band stays through „Wróć”, goes at the band's „Wznów”, does not stand after a completion).
- `tests/view/end-window.test.mjs` — D-122 (the window names the discovery with „Dodaj regułę z tym”, no „Wznów”, no band).
- `tests/view/end-window-lines.test.mjs` — D-122 (the discovery line gives the band's text).
- `tests/view/end-window-game.test.mjs` — D-122 (the window of a completion at a discovery names it).
- `tests/view/program-editor.test.mjs` — D-118, D-121, D-120 (the picks of a new game; a branch action not bought greyed).
- `tests/view/discovery-rule.test.mjs` — D-121, D-123 (the real first chill: what it reveals, the rule the game wrote).
- `tests/view/program-panel.test.mjs` — D-123 (precondition: the copy holds the rule the game wrote).

## Table of the decisions

| Decision | Held in whole or in part by tests | Held by invariants | Held by nothing | *Verification* became |
|---|---|---|---|---|
| D-118 | S1 whole. Start of a new game: `tests/sim/repertoire.test.mjs:80` „a new game's Understanding holds the condition Zawsze and the action Eksploruj alone”, `tests/view/program-editor.test.mjs:729` „the offer is the repertoire: a new game offers „Eksploruj”…”, `tests/view/program-editor.test.mjs:1132` „a section holds only what the Understanding holds…”. Nothing before its event, each thing by its event: `tests/sim/discovery.test.mjs:128` „a new game sent with its one empty group waits until the minute of the first chill…”, `tests/sim/discovery.test.mjs:345` „the first finished exploration reveals Idź…”, `tests/sim/discovery.test.mjs:492` (rows) „${row.name} reveals exactly its row of the table…”, `tests/sim/discovery.test.mjs:520` „a gathering that misses reveals nothing”, `tests/sim/discovery.test.mjs:532` „a lighting that takes no hold…”, `tests/sim/discovery.test.mjs:541` „a crafting that puts no campfire…”, `tests/sim/data.test.mjs:531` „every action and condition stands in exactly one row, and Zawsze and Eksploruj in none”, `tests/sim/encounters.test.mjs:412` „a creature-only discovery pauses before turns…”, `tests/sim/encounters.test.mjs:437` „the discovered wolf stays known…” | S2 („game time stops by itself”) by player-map-run-pace and minute-span-split (only a manual map run discovers, D-249) | none | pair removed |
| D-119 | S1 whole: `tests/sim/discovery.test.mjs:602` „the Understanding stands after death, Restart and Zakończ, and stands for the next character sent”, `tests/sim/loop.test.mjs:461` „an action a manual map run discovers meanwhile enters the loop's next pick…”; „belongs to the player”: `tests/sim/repertoire.test.mjs:401` „creating, sending, restarting, pausing…”, `tests/sim/repertoire.test.mjs:433` „a character's death leaves the Understanding as it is”, `tests/sim/encounters.test.mjs:437`, `tests/sim/encounters.test.mjs:555` „known attacks do not pause and restart clears combat…”, `tests/sim/death.test.mjs:309` „the programs, the chest, the Understanding and the solved maps survive every death”. S2 whole: through predispositions — `tests/sim/repertoire.test.mjs:100` „the mage, with all five skills…”, `tests/sim/repertoire.test.mjs:131` „without the skill ${skill}…”, `tests/sim/repertoire.test.mjs:143` „with no predisposition…”, `tests/sim/repertoire.test.mjs:150` „an action is in the repertoire only where the Understanding holds it”; never saved, anew at each pick — `tests/sim/repertoire.test.mjs:543` „an action leaving the Understanding in the middle of a map run…”, `tests/sim/loop.test.mjs:461`, `tests/sim/death.test.mjs:435` „„Restart” after a death that took everything…”; a bought branch only for its buyer — `tests/sim/loop.test.mjs:548` „a loop picks its rules by the skills of its own character…”, `tests/sim/skills.test.mjs:600` „Obchód is known with its tree but offered only in its owner's run…”. S3 in part: `tests/sim/skills.test.mjs:600` (editor and simulation agree for a branch) | none | S3: one computation serving both the editor and the simulation | pair rewritten |
| D-120 | S1 whole: `tests/sim/repertoire.test.mjs:131`, `tests/sim/repertoire.test.mjs:143`; the branch clause `tests/sim/loop.test.mjs:548`, `tests/sim/skills.test.mjs:600`, `tests/view/program-editor.test.mjs:1159` „a branch action known and not bought stands greyed…”. S2 whole: `tests/sim/repertoire.test.mjs:131`, `tests/sim/repertoire.test.mjs:143`; its example (the walks grown by no skill) `tests/sim/data.test.mjs:405` „the character skills grow the listed pairs of verb and target, and the walks stand in none” | none | none | pair removed |
| D-121 | S1 whole: `tests/sim/repertoire.test.mjs:80`, `tests/sim/discovery.test.mjs:128`, `tests/view/program-editor.test.mjs:729`, `tests/view/program-editor.test.mjs:1132`. S2 whole: the chill — `tests/sim/discovery.test.mjs:128`, `tests/sim/discovery.test.mjs:272` „a second chill and the minutes after reveal nothing…”, `tests/sim/discovery.test.mjs:658` „a body temperature of exactly 35,0 °C…”, `tests/sim/discovery.test.mjs:671` „what the chill reveals is exactly its row…”, `tests/sim/discovery.test.mjs:737` „a span of minutes … ends at the minute of the first chill, paused, holding what the chill revealed…”, `tests/sim/encounters.test.mjs:507` „first chill and attack in one minute…”, `tests/view/discovery-rule.test.mjs:148` „the first chill adds „Zawsze → Wędruj”…”; the exploration — `tests/sim/discovery.test.mjs:345`, `tests/sim/encounters.test.mjs:469` „an ending exploration and first wolf…”; later tiles — `tests/sim/discovery.test.mjs:382` „a later revealed tile adds its new items only…”; in the data — `tests/sim/data.test.mjs:508` „each revealing event reveals exactly the actions, conditions and items of its row”. S3 whole: `tests/sim/discovery.test.mjs:492` (rows), `tests/sim/discovery.test.mjs:520`, `tests/sim/discovery.test.mjs:532`, `tests/sim/discovery.test.mjs:541`, `tests/sim/discovery.test.mjs:550` „a known item and its actions, revealed again…”, `tests/sim/discovery.test.mjs:688` „a revealing event reveals what of its row is still new…”, `tests/sim/data.test.mjs:508`, `tests/sim/data.test.mjs:563` „the campfire is revealed by the first gathered stick…” | first-exploration-discovery and new-account-first-pass state no sentence of it (they rest on S1); kept | none | pair removed |
| D-122 | S1 whole, with the invariant: `tests/view/status-row.test.mjs:150` „at a stop at a discovery the clock reads „ (pauza)”…”, `tests/view/run-screen.test.mjs:481` „„Wznów” of the band goes on as the header's „Wznów” does, and the band goes”. S2 but the role: above the program — `tests/view/run-screen.test.mjs:264`, `tests/view/end-question.test.mjs:808`; what was discovered — `tests/view/status-row.test.mjs:214`, `:221`, `:236`, `:246`, `:259`, `:272`, `tests/view/discovery-band.test.mjs:142`; the rule the game wrote — `tests/view/discovery-band.test.mjs:154`, `:165`, `:190`; one per game minute — `tests/sim/encounters.test.mjs:469`, `tests/sim/encounters.test.mjs:507`; the two buttons — `tests/view/discovery-band.test.mjs:142`, `:278`; „Wznów” as the header's, standing until the player goes on — `tests/view/run-screen.test.mjs:481`, `tests/view/discovery-band.test.mjs:227`, `tests/view/end-question.test.mjs:544`, `:639`, `tests/sim/discovery.test.mjs:771`, `:789`; the scene in colour — `tests/view/scene.test.mjs:354`, `:1922`, `tests/view/scene-picture.test.mjs:444`; the chronicle — `tests/view/chronicle.test.mjs:397`, `:421`, `:446`. S3 but the role: `tests/sim/completion.test.mjs:165`, `tests/sim/discovery.test.mjs:800` (held until „Restart” or „Zakończ”), `tests/view/end-window.test.mjs:228`, `tests/view/end-window-lines.test.mjs:226`, `tests/view/end-window-game.test.mjs:964`, `tests/view/discovery-band.test.mjs:251`, `tests/view/end-question.test.mjs:808` | player-map-run-pace: the stop is a pause, and no pause where the map run ends in that game minute | the role `discovery` of the band's text and of the window's text of a discovery | pair rewritten |
| D-123 | S1 whole: first rule group of copy and program — `tests/sim/discovery.test.mjs:128`, `:233`, `:883`, `tests/sim/copy.test.mjs:225`, `tests/sim/copy-actions.test.mjs:374`; program gone — `tests/sim/copy.test.mjs:257`; no rule group — `tests/sim/discovery.test.mjs:209`, `:893` (copy and program both without one); other programs as they were — `tests/sim/copy.test.mjs:225`. S2 whole: only at the first chill — `tests/sim/discovery.test.mjs:128`, `:272`, `:282`, `tests/sim/copy.test.mjs:225`, `tests/sim/copy-actions.test.mjs:374`, `tests/sim/encounters.test.mjs:412`, `:507`, `tests/view/discovery-rule.test.mjs:148`, `tests/view/program-panel.test.mjs:1000`, `tests/view/run-screen.test.mjs:423`; not where the copy holds „Eksploruj” — `tests/sim/discovery.test.mjs:293`, `:309`, `:602`, `tests/view/discovery-band.test.mjs:165`, `tests/view/chronicle.test.mjs:421`. S3 whole: `tests/sim/copy-actions.test.mjs:374`, `tests/sim/discovery.test.mjs:128`, `:209`, `:233`, `tests/sim/copy.test.mjs:225`, `:257` | none | S1: the copy or its program alone holding no rule group | pair rewritten |
| D-126 | no lines (R1) | whole: program-rule-pick | none | pair removed |
| D-127 | no lines (R1) | whole: program-rule-pick | none | pair removed |
| D-128 | S1 in part (what the data holds): `tests/sim/data.test.mjs:109` „actions carry their labels…”, `:138` „combat actions carry…”, `:171` „the wolf has 24 health…”, `:232` „conditions carry labels…”, `:248` „health conditions…”, `:508`, `:531` (nothing beside „Zawsze” and „Eksploruj”), `:563` | none | S1: the simulation reading what reveals a thing from the data; S2 whole (a change of data alone) | pair rewritten |
| D-403 | in part: `tests/sim/saved-game.test.mjs:2201` „a crafted document of the current version is refused whole as shape” (D-403's documents among the crafted ones) | none (save-version does not derive from D-403) | what the game does with the refused state (discards it, starts anew under the damaged-save sentence) and the version number staying | pair rewritten |

Line numbers in this table are those of the tests' opening lines at the slice's base `12a43a40`; `reports/executor-24-lines.txt` gives them at `bd53ac8a`.

## Pairs added or rewritten (for the human at the merge)

- **D-119** (rewritten), for one computation serving both the program editor and the simulation:
  - complies: the program editor and the simulation both asking one function for a character's repertoire
  - violates: an editor that filters by archetype while the simulation does not
- **D-122** (rewritten), for the role of the band and of the window's text of a discovery:
  - complies: the text of the band above the program and the text naming a discovery in the end-of-run window, both in the role `discovery`
  - violates: the band's text, or the window's text of a discovery, in `text` or in `warning`
- **D-123** (rewritten), for the copy or its program alone holding no rule group:
  - complies: a first chill in a copy whose rule groups the player has all deleted, while its program on the list keeps its rule group „Program”, adding the rule group „Program” with the condition „Zawsze” and the rule to the copy, and the rule at the end of the program's first rule group
  - violates: the rule group „Program” added to the copy only where its program holds no rule group either
- **D-128** (rewritten), for the simulation reading what reveals a thing from the data and a change of data alone:
  - complies: the simulation reading what reveals „Zasil — ognisko” from the field of its entry in the data of the actions; a condition revealed by the first gathered stick added as an entry of the data of the conditions, with no change of the simulation's code
  - violates: a list in the simulation's code naming „Wędruj” and „Temperatura poniżej” as what the first chill reveals; a condition revealed by the first crafted campfire that takes a change of the simulation's code to be revealed
- **D-403** (rewritten), for what the game does with such a state and for the version number:
  - complies: the game discarding such a state and starting the player anew, with „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” above it; the version number of the shape the same before and after the change that put „Eksploruj” into the Understanding of a new game
  - violates: the sentence of another version, „Zapis pochodził z innej wersji gry…”, standing above the new game for it; the version raised for the sake of it

No pair was added to a decision that had none.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`; none of D-118, D-119, D-120, D-121, D-122, D-123, D-126, D-127, D-128, D-403 listed as `held by nothing` (run before and after the last edits).
- `npm test -- <file>`, one run per file, every one exit 0 with `fail 0` (counts of passing cases in brackets): `tests/sim/completion.test.mjs` (27), `tests/sim/copy.test.mjs` (12), `tests/sim/data.test.mjs` (36), `tests/sim/discovery.test.mjs` (49), `tests/sim/encounters.test.mjs` (29), `tests/sim/loop.test.mjs` (46), `tests/sim/repertoire.test.mjs` (32), `tests/sim/saved-game.test.mjs` (39), `tests/sim/skills.test.mjs` (19), `tests/sim/copy-actions.test.mjs` (35), `tests/sim/death.test.mjs` (33), `tests/view/chronicle.test.mjs` (28), `tests/view/discovery-band.test.mjs` (10), `tests/view/discovery-rule.test.mjs` (18), `tests/view/end-question.test.mjs` (17), `tests/view/end-window-game.test.mjs` (27), `tests/view/end-window-lines.test.mjs` (11), `tests/view/end-window.test.mjs` (14), `tests/view/program-editor.test.mjs` (57), `tests/view/program-panel.test.mjs` (53), `tests/view/run-screen.test.mjs` (20), `tests/view/scene-picture.test.mjs` (70), `tests/view/scene.test.mjs` (71), `tests/view/status-row.test.mjs` (20). The list of commands and exit codes: `reports/executor-24-test-runs.txt`.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <the 24 changed .mjs files>` — exit 0.
- `git diff -U0 12a43a40636c23ed5b20d9fefa4a960377d30c84 -- foundations/decisions.md`, read: eleven hunks, each inside the *Verification* field of one of D-118, D-119, D-120, D-121, D-122, D-123, D-126, D-127, D-128, D-403; a filter of the changed lines for anything that is not a `- **Verification:**` line or its indented continuation printed nothing.
- Every quotation was checked by a script against the binding sentences (whitespace runs made one space, the quotation at the start of a sentence, no `"`, at least three words) before the lines were written; the foundation check checked them again.
- Not run: `tests/sim/discovery.test.mjs` etc. under the full gate (`npm test` without a file) — the cycle's, not the slice's (WAY-160). `tests/invariants/test_exploring_reveal.py` and `tests/invariants/test_player_map_run_pace.py` were not run: the slice changed neither (see Concerns). No test was written and no invariant test changed, so no failing run applies.

## Own-work check

- Requirement most likely missed: a test that holds a sentence of these decisions and got no line, found only by content, not by number (task, "To do" 2).
- Check: a search of all tests for the measures of D-123's third sentence (`copyHasUnsavedChanges|programHasChangesCopyLacks|Niezapisane zmiany w kopii`) and of all test titles for `first chill|Understanding|repertoire|reveal|discover|archetype|predisposition` outside the files already read.
- What it showed: three missed cases — `tests/sim/copy-actions.test.mjs:374` „the rule the first chill writes is neither an unsaved change nor a change the save announces” (D-123, the most direct test of its S3), `tests/sim/death.test.mjs:309` (D-119 S1) and `:435` (D-119 S2). Lines were added, D-119's clause `tests:` widened, both files run (exit 0). The rest of the hits were judged and left (see Choices).

## Reaches beyond the dispatch

- `src/browser/sim/programs.ts:645-669` and `src/browser/sim/game.ts:780-830` — to learn what „an unsaved change of the copy” and „a change of the program that a save announces” measure (copy ≠ base; program ≠ base), and how the chill rule is written into copy, base and program; needed to judge which tests hold D-123 S3.
- `foundations/invariants.md` entries were read whole as named; `tests/invariants/test_program_rule_pick.py` was grepped to confirm it drives rules and groups outside the repertoire (it does, cases at lines 297 and 307), so that D-126 and D-127 are held by an invariant that is tested.
- Test files beyond the *Change* (listed above) and `tests/view/account-screen.test.mjs:3265-3315`, `tests/sim/saved-game.test.mjs:700-800, 1300-1410, 2190-2220` — to judge D-403 and D-122.
- `the author's rules on writing scripts, outside the repository` and `.../git.md` — the user's rules before the insertion script and the commits.

## Working copies

`.runs/executor-24/` held the insertion script, its report, the foundation-check output and the per-file test logs; removed before return. Kept beside this report: `reports/executor-24-lines.txt` (every line by decision) and `reports/executor-24-test-runs.txt`. No worktree or clone was made.

## Choices

- **Parts an invariant already states get no line**, also in tests that are not the invariant's own (R1 read as the earlier slices applied it to D-21 and D-23): the stop at a discovery (D-118 S2, D-122's pause, a completion leaving no pause) and everything of D-126 and D-127. Rejected: lines on `tests/sim/discovery.test.mjs:737-827`, `tests/sim/repertoire.test.mjs:203-595`, `tests/sim/copy.test.mjs:311` for those parts. Cost if wrong: D-126 and D-127 carry no clause `tests:` though many tests hold them.
- **A precondition that asserts a sentence counts as holding it** (e.g. „precondition: the copy holds the rule the game wrote” at `tests/view/run-screen.test.mjs:423`, `tests/view/program-panel.test.mjs:1000`, `tests/view/discovery-band.test.mjs:165`, `tests/view/chronicle.test.mjs:421`, `tests/view/end-window-game.test.mjs:964`). A sentence that is only a premise of a scenario, never asserted, does not (helpers like `chilled()`, the scenario minutes 84 and 104 of `tests/invariants/test_player_map_run_pace.py`, `tests/invariants/test_minute_span_split.py`). Cost if wrong: either a handful of lines too many, or the two invariant files of the *Change* missing D-121/D-123 lines.
- **D-118 S1's general clause** („each by the need, action, item or encounter that reveals it”) is marked on the tests of `tests/sim/discovery.test.mjs` that start from the bare Understanding and check what enters (and what does not), on `tests/sim/data.test.mjs:531` and on the wolf's encounter; not on every other test of a particular discovery (e.g. Zwiad in `tests/sim/skills.test.mjs:622`, D-121 cases on what is still new), which D-121 or another decision holds more exactly.
- **D-120 judged held in whole**: with one archetype in the data, the repertoire is tested through predisposition lists, which is what „opens character skills, not actions” rests on; the old violating example „an archetype defined as a list of allowed verbs” would break those calls.
- **D-123 S1 „where either holds no rule group”**: the tests cover copy and program both without groups; the case of one of them alone is left to the rewritten pair.
- **D-403**: only the load's refusal is marked; `tests/view/account-screen.test.mjs:3268` holds the damaged-save sentence for a generic bad shape, not for D-403's document, so it got no D-403 line and the consequence stays in the pair.
- **R4**: `tests/view/tabs-area.test.mjs:332` (a chronicle entry in the role `discovery`) got no D-122 line; D-122 names the role for the band and the window, not for the chronicle.
- The lines were inserted by a one-off script (validated header text per case, quotations checked against the log, line endings kept), not by hand; three later lines by Edit.

## Concerns

- **Plan mismatch (small):** the slice's *Change* names `tests/invariants/test_exploring_reveal.py` and `tests/invariants/test_player_map_run_pace.py`; neither got a line. The first tests exploring-reveal on a knowing game and holds no sentence of these decisions; the second is player-map-run-pace's own test, whose discovery scenarios use the first chill and the rule of D-123 only as premises (see Choices).
- **Stale pointer in a test comment** (R3-like, not a decision's wording): `tests/sim/encounters.test.mjs:434-436` (base numbering) reads „Sources: foundations/decisions.md:2008, :2032, :2575.” — line numbers of the log that no longer point at D-118, D-119, D-143 (now near 2432, 2471 …); left as it is (no comment may be removed or changed).
- **R3 — wording against the code or tests:** D-403 says „the version number of the shape stays as it is”, which describes a change (not raising the version for this refusal) rather than a state a test on one commit can show; left to the pair. D-122 S3 „until „Restart” or „Zakończ”” — the window itself also closes with „✕” and Escape (D-368); the sentence is read here as the discovery being named until „Restart” or „Zakończ”, which `tests/sim/discovery.test.mjs:800` holds for the state.

## Unread material

- `guidelines/testing.md`, `guidelines/coding.md`, `foundations/part_map.md`, `foundations/glossary.md`, `guidelines/styleguide-browser-view.md`, the decision entries and invariants named, the template sections and the decisions skill: read whole.
- The test files were read by case and by range, as instructed, not whole: `tests/sim/discovery.test.mjs` whole; `tests/sim/repertoire.test.mjs` whole; `tests/sim/data.test.mjs` 1-16, 105-274, 393-592; `tests/sim/copy.test.mjs` 1-75, 220-326; `tests/sim/encounters.test.mjs` 366-575 (the rest by test titles); `tests/invariants/test_exploring_reveal.py` whole; `tests/invariants/test_player_map_run_pace.py` 1-60, 160-391; the files beyond the *Change* only at the cases named above.

## Searches not found or unclear

- No test checks that the band or the window's text of a discovery stands in the role `discovery` (searched `discovery-band`, `role-discovery`, `--discovery` and `discovery` with `role` in `tests/`); hence D-122's pair.
- No test checks that the simulation reads `revealedBy` from the data (searched `revealedBy` in `tests/` outside `tests/sim/data.test.mjs`: nothing); hence D-128's pair.
- No test pins that the editor and the simulation use one function for the repertoire (`editorRepertoire`, `repertoireOf`, `programOf` usages read); hence D-119's pair.
- No test exercises a first chill where only the copy, or only its program, holds no rule group; hence D-123's pair.
