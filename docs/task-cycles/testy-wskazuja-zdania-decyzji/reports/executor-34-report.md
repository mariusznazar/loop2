# Report — executor of slice 34

**Status:** `done with concerns` (the concerns are judgments for the reviewer, listed under "Choices" and "Remarks on the log's wording"; no check failed).

## Commits

Base `2d7daafef594ebd13078022762fd7ba2bbcebe33`; author address `mariusznn@gmail.com` (`git log -1 --format=%ae`).

- `b06f58db` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the state a program rule shows, its signs in an attack, the reason a rule cannot start, „Teraz”, „Potem”, a click on them, the body row's needs, „Wędruj” and the words of refusals with lines decision:
- `4437095f` docs: :memo: name the tests of D-308, D-309, D-310, D-334, D-335, D-336, D-337, D-375 and D-380, drop the pair of D-335 and D-375, which their tests and invariant hold whole, and rewrite the pair of D-308, D-309, D-310, D-334, D-336, D-337 and D-380 only for the part no invariant and no test holds

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 96 | 65 |
| `tests/sim/rule-signs.test.mjs` | 46 | 0 |
| `tests/sim/actions.test.mjs` | 4 | 0 |
| `tests/sim/body.test.mjs` | 15 | 0 |
| `tests/sim/encounters.test.mjs` | 1 | 0 |
| `tests/sim/gather.test.mjs` | 1 | 0 |
| `tests/sim/program.test.mjs` | 1 | 0 |
| `tests/invariants/test_move_reach.py` | 1 | 0 |
| `tests/view/rule-signs.test.mjs` | 9 | 0 |
| `tests/view/world-area.test.mjs` | 19 | 0 |
| `tests/view/now-lines.test.mjs` | 9 | 0 |
| `tests/view/body-row.test.mjs` | 11 | 0 |
| `tests/view/status-row.test.mjs` | 2 | 0 |
| `tests/view/run-header.test.mjs` | 1 | 0 |
| `tests/view/run-screen.test.mjs` | 5 | 0 |

The test files changed only by added comment lines `decision:`; no code, name or assertion of a test changed, no mention of a decision number was removed (the comments `// D-375: …`, `// D-337: …` and the like stand beside the new lines).

Files beyond the slice's *Change* that got lines (item 5 of "Work of every slice"), each with its focused run below:

- `tests/sim/body.test.mjs` — the sim cases of the minutes of the needs (D-337).
- `tests/sim/gather.test.mjs` — the wander stream, one draw per start (D-375).
- `tests/sim/program.test.mjs` — feasibility and choice draw nothing (D-375).
- `tests/sim/encounters.test.mjs` — „Teraz” names the fight in the resolution minute (D-334).
- `tests/invariants/test_move_reach.py` — every move ends on a neighbour (D-375; the invariant `move-reach` derives from D-25, not from D-375, so R1 does not apply).
- `tests/view/run-header.test.mjs` — the clock at the minute of the death (D-334); its part `browser-view`, whose guidelines I read whole.
- `tests/view/run-screen.test.mjs` — the click on „Teraz” and „Potem” (D-336); part `browser-view`.

The slice's *Change* names `tests/view/status-row.test.mjs`, `tests/sim/actions.test.mjs` and the rest; all of them got lines.

## Checks run

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before any edit) | 0, `0 errors`, no decision listed as held by nothing |
| `python -B .the-way/elements/common/foundation_check.py` (after the edits) | 0, `0 errors`, no decision listed as held by nothing — so none of D-308, D-309, D-310, D-334, D-335, D-336, D-337, D-375, D-380 |
| control: one quotation in `tests/view/now-lines.test.mjs` changed to "… current game hour", then `foundation_check.py` | 1, `tests/view/now-lines.test.mjs:183: the quotation stands in no binding sentence of D-335`, `1 error`; the file restored byte for byte from a copy, then the run above |
| `npm test -- tests/sim/rule-signs.test.mjs` | 0 (its output file was overwritten by the view file of the same base name, so I keep only the exit code; the run's exit was logged) |
| `npm test -- tests/sim/actions.test.mjs` | 0 (18 pass, 0 fail) |
| `npm test -- tests/sim/gather.test.mjs` | 0 (16 pass) |
| `npm test -- tests/sim/program.test.mjs` | 0 (19 pass) |
| `npm test -- tests/sim/encounters.test.mjs` | 0 (29 pass) |
| `npm test -- tests/sim/body.test.mjs` | 0 (36 pass) |
| `npm test -- tests/view/rule-signs.test.mjs` | 0 (6 pass) |
| `npm test -- tests/view/world-area.test.mjs` | 0 (22 pass) |
| `npm test -- tests/view/now-lines.test.mjs` | 0 (9 pass) |
| `npm test -- tests/view/body-row.test.mjs` | 0 (17 pass) |
| `npm test -- tests/view/status-row.test.mjs` | 0 (20 pass) |
| `npm test -- tests/view/run-header.test.mjs` | 0 (24 pass) |
| `npm test -- tests/view/run-screen.test.mjs` | 0 (20 pass) |
| `npm test -- tests/invariants/test_move_reach.py` | 0 (Ran 2 tests, OK) |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the 13 changed `.mjs` files | 0, all use Prettier code style |
| `git diff -U0 2d7daafe… -- foundations/decisions.md`, read | every hunk lies in the *Verification* field of one of the nine decisions (hunks at 8031 D-308, 8093 D-309, 8125 D-310, 9050 D-334, 9097 D-335, 9130 D-336, 9167 D-337, 10093 D-375, 10185 D-380) |

Not run: the full gate `npm test` without a file — the cycle's run before the request, as the method gives. `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run; the handoff names them as failing at the base.

## Own-work check

- Requirement most likely missed: "every test that holds a sentence carries a line" — a case that uses the functions of these sentences and got no line.
- Check: the script `.runs/executor-34/unmarked.py` (removed since) listed every case under `tests/**/*.test.mjs` whose body calls `nowAndNext(`, `ruleSigns(`, `needNotes(`, `bodyCells(`, `minutesUntil…`, `actionRefusal(`, `nowRows(`, `temperatureNoteText`, `satietyNoteText`, `judgeProgram(`, `scrollIntoView` or reads `now-row`, `next-row`, `body-note`, `body-cell`, and carries no line of my nine decisions.
- Result (`python -B .runs/executor-34/unmarked.py`, exit 0): 10 cases, each judged and left without a line on purpose:
  - `tests/sim/rule-signs.test.mjs:302` "the winner is the first green rule of the first group that holds", `:317` "no rule goes: no winner" — which rule wins is the pick's rule (D-23 and its kin), no sentence of these decisions;
  - `:441` "stopping at the winner leaves the rules below it unjudged" — an option of the function, no sentence;
  - `:592` "the winner the signs show is the rule the pick takes, …" — what the invariant `rule-state-from-pick` states (R1);
  - `:671` "no map run, no signs", `:847` "no map run, nothing for Teraz and Potem to name", `:1139` "Teraz and Potem change nothing in the state they read" — no sentence;
  - `tests/sim/body.test.mjs:632` "the notes read the run they are given and change none of its values" — no sentence;
  - `tests/view/body-row.test.mjs:256` "the cells keep the danger of their values …" — the danger of a value is D-39/D-57, not of a note;
  - `tests/view/run-screen.test.mjs:501` a hovered tile of the drawing — another decision.
- For „Wędruj” the same pattern was too broad (the word stands in 68 files), so I searched by test names (`test\(.*(wander|Wędruj|neighbour)`), by `wanderRandom`, by "draw(s) nothing" and by `def test_.*(wander|neighbour|draw)` in `tests/invariants/`; that found `tests/sim/program.test.mjs:150`, `tests/sim/gather.test.mjs:285` and `tests/invariants/test_move_reach.py:156`, all now marked.
- The quotations: the foundation check validates every line `decision:` (control run above shows it rejects a wrong one); 0 errors after the edits.

## Rows of the decisions

Paths and lines are those of the test's opening line at `4437095f`. "S1", "S2", "S3" are the binding sentences in their order.

### D-308 — the state a program rule shows during a map run

- S1 ("During a manual map run … `rule-winning` … `rule-running` … `highlight` … pointer"), held in part by tests:
  - `tests/sim/rule-signs.test.mjs:636` the rule whose action goes on stands as running when another rule wins now, and not when it is the winner
  - `tests/sim/rule-signs.test.mjs:690` after a death of cold the rule whose action was going on stands as running, on the stopped minute
  - `tests/sim/rule-signs.test.mjs:702` after a completion a finished action is no longer running, one still going is
  - `tests/sim/rule-signs.test.mjs:780` after a death in combat no action is running
  - `tests/view/rule-signs.test.mjs:103` the copy stands with the winner, a bar at each row and header, and the reason of the rule that cannot start
  - `tests/view/rule-signs.test.mjs:143` the rule whose action goes on stands as running while another rule wins, and an edit of the copy shows at once
  - `tests/view/rule-signs.test.mjs:166` an open row keeps its bar and its classes of state, which the stylesheet lets give way
  - `tests/view/rule-signs.test.mjs:188` a saved program picked during a map run and the screen Programy show no signs
  - `tests/view/rule-signs.test.mjs:221` the signs stand on the screen after a death and go with „Zakończ”
  - `tests/view/rule-signs.test.mjs:246` the stylesheet puts the background under the pointer before the states, and the open row after them
- S2 (reason and bar of every rule and rule group), held in whole by tests (the judgement of the state; the colour each mark takes is in the pair):
  - `tests/sim/rule-signs.test.mjs:275` the bar of every rule is judged, below the winning rule too
  - `:325` every rule of a group whose condition does not hold shows dark with no reason, whatever the rule would say
  - `:342` the bar of a group is green when one of its rules can start, amber when none can, and amber when it holds no rule
  - `:367` a combat rule outside combat is amber with „tylko w walce” when its condition holds, dark when it does not
  - `:388` in combat the rule the first turn would choose wins, …
  - `:650` a fix of the copy shows at once: a rule that could not start turns green
  - `:744` in the minutes of an attack the signs show the first turn's pick …
  - `tests/view/rule-signs.test.mjs:103` (above), `tests/view/rule-signs.test.mjs:188` (above)
- S3 (a rule outside the repertoire; a rule group that does not hold), held in whole by tests:
  - `tests/sim/rule-signs.test.mjs:325` (above), `:465` a rule outside the repertoire is amber with its reason, whether or not its own condition holds, `:537` a group whose condition lies outside the repertoire shows dark with its rules, …, `:576` the repertoire is checked before the condition, so a rule outside it never wins
- Held by the invariant `rule-state-from-pick` (method: review): that the background, the bar and the reason come from the function that picks the rule — a statement of no binding sentence word for word.
- Held by nothing: the colours the marks take (the class `winning`, `running`, `open`, `bar-go`, `bar-blocked`, `bar-unmet` to the roles `rule-winning`, `rule-running`, `highlight`, `positive`, `warning`, `condition-unmet`) — the file `tests/view/rule-signs.test.mjs` says itself in its head comment that the look and the colours are checked in the browser (D-88); and the signs standing on the screen after a completion (only after a death is tested in the view; the sim case at `:702` holds the running rule after a completion).
- *Verification*: pair rewritten.

### D-309 — the signs in the minutes of an attack

- S1 held in part: `tests/sim/rule-signs.test.mjs:388` in combat the rule the first turn would choose wins, an ordinary rule is amber with „trwa walka”, …; `:422` combat conditions read the health of the two sides given; `:744` in the minutes of an attack the signs show the first turn's pick at the health of the mage and of the wolf, and no action is running.
- S2 held in whole: `tests/sim/rule-signs.test.mjs:367` a combat rule outside combat is amber with „tylko w walce” …; `:780` after a death in combat no action is running; `:93` each refusal of an action gives the reason of its row in D-380.
- Invariant `rule-state-from-pick`: the signs come from the pick.
- Held by nothing: that the signs read the mage's health as it stands (`:744` varies only the wolf's health; `:422` reads health given to `judgeProgram`, not what `ruleSigns` passes); the backgrounds of those minutes (no view case of an attack).
- *Verification*: pair rewritten.

### D-310 — the reason of a rule that cannot start

- S1 held in part: `tests/sim/rule-signs.test.mjs:260` of several reasons the world and the backpack come before the nature energy (one reason; the world before the energy).
- S2 held in whole: `tests/sim/rule-signs.test.mjs:93` each refusal of an action gives the reason of its row in D-380; `:245` a spell short of nature energy gives the energy the character has, rounded down, of what it costs; `:465` a rule outside the repertoire is amber with its reason …; `:510` an undiscovered condition or action is named by its label; `tests/view/rule-signs.test.mjs:103` (the reason shown as the game writes it).
- Invariant `rule-state-from-pick`: the reason comes from the pick.
- Held by nothing: combat first in the order, and the backpack before the nature energy (the case `:260` is named "the world and the backpack come before the nature energy" but asserts only the world).
- *Verification*: pair rewritten.

### D-334 — „Teraz”

- S1 held in part: `tests/sim/rule-signs.test.mjs:851` Teraz names the action under way with its rule, the minutes left and the minutes in all, …; `:872` Teraz reads 3 of 5 minutes at game minute 12 …; `:885` an action picked in the minute the last one ended has all its minutes left, …; `:902` Teraz names a wait without a rule or minutes, and Potem names no rule; `tests/view/now-lines.test.mjs:52` Teraz names an action under way with the icon …; `:81` Teraz keeps the minutes of an action whose rule the copy no longer holds, and names no rule; `:95` Teraz names a wait by the words of the game and nothing at its right; `tests/view/world-area.test.mjs:202` the world area stands from the top: the scene, Teraz, Potem, …; `:322` Teraz and Potem name the action under way …; `:364` Teraz says the wait alone, ….
- S2 held in whole: `tests/sim/rule-signs.test.mjs:915` Teraz names the creature fought in every minute of an attack, …; `:996` Teraz names the completion with the text of the map, …; `tests/sim/encounters.test.mjs:337` M+5 starts ordinary work immediately, counts every combat action once and still shows combat; `tests/view/now-lines.test.mjs:106` Teraz in the minutes of an attack says the fight alone, …; `:136` Teraz after a completion says the text of the map in the role positive; `tests/view/world-area.test.mjs:391` after a death Teraz says its cause in the role text, after a completion …; `:428` in the minutes of an attack Teraz says the fight alone and Potem names the combat rule the turn would choose.
- S3 held in whole: `tests/sim/rule-signs.test.mjs:942` Teraz names the cause of a death of cold, of hunger and in combat; `:975` a death after an encounter names its cause, not the fight; `tests/view/now-lines.test.mjs:118` Teraz after a death says its cause in the role text, for each of the three causes; `tests/view/world-area.test.mjs:391` (above); `tests/view/status-row.test.mjs:167` after a death the clock stands at the minute of the death, …; `:197` a mage left without a program dies, and the clock reads the minute of its death; `tests/view/run-header.test.mjs:248` after a death the clock stands at the minute of the death with no cause …
- Invariant `rule-state-from-pick`: what „Teraz” names comes from the pick, „Walczy z wilkiem” in an attack, the cause after a death and the completion text after a completion (as exceptions it states).
- Held by nothing: „Teraz” keeping one height whatever it holds; the row writing no word „Teraz” before the icon (kept from the old pair: S1 says what the row holds, and no case checks the absence of a label in the row).
- *Verification*: pair rewritten.

### D-335 — „Potem”

- S1 held in whole: `tests/sim/rule-signs.test.mjs:902` (above); `:1059` Potem names the winner of the judgement the signs show: …; `:1082` Potem names no rule where none wins, in the minutes of an attack too; `:1093` in the minutes of an attack Potem names the combat rule the turn would choose, …; `tests/view/now-lines.test.mjs:152` Potem names the rule that wins with its icon, …; `:171` Potem with no winning rule says the character will stand, in the role warning; `tests/view/world-area.test.mjs:202`, `:322`, `:364`, `:428` (above).
- S2 held in whole: `tests/sim/rule-signs.test.mjs:1059` (above); `:1122` after a death Potem names the rule that wins at the stopped minute; `tests/view/now-lines.test.mjs:182` Potem does not depend on what Teraz says: after a death it still names the winning rule; `tests/view/world-area.test.mjs:391` (the row stays after a death and a completion).
- Invariant `rule-state-from-pick`: what „Potem” names comes from the pick.
- Held by nothing: none.
- *Verification*: pair removed.

### D-336 — a click on „Teraz” or „Potem”

- S1 held in whole: `tests/view/run-screen.test.mjs:631` a click on Teraz and on Potem, and Enter and Space on them, scroll the row of their rule to the middle of the window; `:674` for a rule of a folded group Teraz and Potem scroll the header of that group; `:709` the program scrolls once per click and does not follow the rule when the game goes on; `:725` a row that names no rule is no control: the keyboard does not reach it and it scrolls nothing.
- S2 held in part: `tests/view/run-screen.test.mjs:783` while the program panel shows a saved program a click on Teraz scrolls nothing (a program picked on its list, through `showProgram`).
- Invariants: none.
- Held by nothing: a program made with „Nowy program”; the saved program staying shown after the click (no assertion after the press).
- *Verification*: pair rewritten.

### D-337 — the body row's needs

- S1 held in part: `tests/view/body-row.test.mjs:43` the body row reads temperature, satiety, health and nature energy in cells, …; `:244` health and nature energy stand with no note, at their lowest too; `tests/view/world-area.test.mjs:537` only the value below its threshold stands in danger, … (the cells); `:611` the body row stands in cells with the minutes of the needs under temperature and satiety from game minute zero, none under health and nature energy.
- S2 held in whole: `tests/view/body-row.test.mjs:43`, `:146` the words of the note under temperature, one for each state, `:171` the words of the note under satiety, one for each state, `:188` each note at its threshold …, `:206` by a fire the note under temperature reads „przy ogniu” …, `:221` a chilled body by the fire still reads „marznie” in danger, `:232` on a map that does not cool the body the note under temperature reads „nie stygnie”; `tests/sim/body.test.mjs:506` a map that does not cool the body below the threshold gives no minutes until chilled, `:543` the notes at minute zero read the minutes of both needs, `:556` the note of temperature reads chilled below 35.0 °C and minutes at 35.0 °C, `:564` the note of satiety reads starving below 30 and minutes at 30, `:572` a stick or a campfire burning on the character's tile gives by fire, `:584` what does not warm the character's tile gives minutes, not fire, `:605` a chilled body by the fire still reads chilled, `:615` a map at the body's starting temperature gives not cooling, and fire is read before it; `tests/view/world-area.test.mjs:611`, `:647` a note under temperature and one under satiety read „marznie” and „głoduje” in danger …, `:677` by a fire the note under temperature reads „przy ogniu”, ….
- S3 held in whole: `tests/sim/body.test.mjs:482` from the starting temperature a body lasts 83 game minutes on Las and 33 on Las — głębiej …, `:492` from 36.9 °C a body lasts 79 game minutes on Las, the whole minutes of 79.2, `:499` a body at exactly 35.0 °C is not chilled but lasts no minute, …, `:515` from full satiety a body lasts 116 game minutes …, `:523` satiety lasts the same on a map of another ambient temperature, `:528` satiety that falls to exactly 30 is not starving, …, `:543` (above); `tests/view/body-row.test.mjs:43`, `:188`; `tests/view/world-area.test.mjs:611`, `:647`, `:697` the notes stand after the end of a map run, on the state at the stopped minute.
- Invariants: none.
- Held by nothing: "a note in smaller grey text" (the size and the role `text-secondary` of `.body-note`).
- *Verification*: pair rewritten.

### D-375 — „Wędruj”

- S1 held in whole: `tests/sim/actions.test.mjs:188` Wędruj prefers an unrevealed neighbour; `:229` Wędruj goes to some neighbour when all are revealed; `tests/invariants/test_move_reach.py:156` `test_every_move_ends_on_a_neighbour` (in part: onto a neighbouring tile).
- S2 held in whole: `tests/sim/actions.test.mjs:267` starting Wędruj consumes exactly one draw; `tests/sim/gather.test.mjs:285` the wander stream gives the same draws with and without gathering (each wander one Mulberry32 step on).
- S3 held in whole: `tests/sim/actions.test.mjs:279` Wędruj is not feasible with no neighbour on the map; `tests/sim/program.test.mjs:150` feasibility and choice do not draw from the wander generator.
- Invariants: none of D-375's own.
- Held by nothing: none.
- *Verification*: pair removed.

### D-380 — the words of each refusal

- S1 held in part: `tests/sim/rule-signs.test.mjs:93` each refusal of an action gives the reason of its row in D-380 (all rows of S1 but „Obchód” with a full backpack; the reason at the rule by the judgement cases of D-308 S2).
- S2 held in whole: `tests/sim/rule-signs.test.mjs:93`.
- S3 held in part: `tests/sim/rule-signs.test.mjs:93` (the shortages of „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”, „Zjedz — jagoda”); `:388` („Uderz — patyk” in combat, „brakuje 1 × patyk”); `:245` and `:260` („brak energii natury: {ma} z {trzeba}” for „Zapal — patyk”).
- Invariants: none.
- Held by nothing: „Obchód — {rzecz}” with a full backpack reading „plecak pełny”; „Zapal — ognisko” short of nature energy reading „brak energii natury: {ma} z {trzeba}”.
- *Verification*: pair rewritten.

## Pairs added or rewritten (for the human to accept at the merge)

D-308 (rewritten; it also gained `tests:`):

> For the colours the marks take, and for the signs after a completion on the screen, an agent compares a change with the part no invariant and no test holds:
> - complies: the row that wins now on `rule-winning`, the running row on `rule-running` and an open row on `highlight`; the bar of a rule that can start in `positive`, of one that cannot in `warning` and of one whose condition does not hold in `condition-unmet`; the same signs on the screen after a completion until „Restart”
> - violates: the row that wins now on `highlight` or on `rule-running`; the bar of a rule that can start in `warning`; the bar of a condition that does not hold in the colour of the text beside it; the signs gone after a completion

D-309 (rewritten):

> For the mage's health the signs read and the backgrounds of those minutes, an agent compares a change with the part no invariant and no test holds:
> - complies: in the minutes of an attack „Odskocz” under „Zdrowie poniżej 50” winning while the mage has 40 health, its row on `rule-winning`
> - violates: the signs of an attack counted at the mage's full health; the row of the combat rule the turn would choose on `rule-running` or on `highlight`

D-310 (rewritten):

> For the place of combat and of the backpack in the order of the reasons, an agent compares a change with the part no invariant and no test holds:
> - complies: „Uderz — patyk” outside combat with no stick reading „tylko w walce”; „Zbierz — Mech” on a tile with no moss in the minutes of an attack reading „trwa walka”; „Zapal — patyk” on a revealed tile with no stick and too little nature energy reading „brakuje 1 × patyk”
> - violates: „brakuje 1 × patyk” beside „Uderz — patyk” outside combat; „tu nie leży mech” beside „Zbierz — Mech” in the minutes of an attack; „brak energii natury: 7 z 10” beside „Zapal — patyk” with no stick in the backpack

D-334 (rewritten):

> For the height of the row and the words it leaves out, an agent compares a change with the part no invariant and no test holds:
> - complies: „Teraz” keeping the height of one line whether it reads „Czeka — żadna reguła nie pasuje”, „Zbierz — Patyk” with its rule and minutes or „Mag zamarzł”, so what stands under it keeps its place; no word „Teraz” written in the row before the icon
> - violates: „Teraz” growing by a line as its text changes, moving „Potem” and the body row down; the word „Teraz” written in the row before the icon, as „Potem” is in its row

D-336 (rewritten):

> For a saved program made with „Nowy program” and for what the panel shows after the click, an agent compares a change with the part no test holds:
> - complies: a click on „Teraz” while the panel shows a program just made with „Nowy program” scrolling nothing; the saved program staying shown where it stood after a click on „Potem”
> - violates: a click on „Potem” while the panel shows a saved program putting the copy back in its place; a click on „Teraz” scrolling a program just made with „Nowy program”

D-337 (rewritten):

> For the look of the notes, an agent compares a change with the part no test holds:
> - complies: the notes under temperature and satiety in `text-secondary`, smaller than the values above them
> - violates: a note in the size of its value; „bez ognia 79 min” in `text`

D-380 (rewritten):

> For „Obchód” with a full backpack and „Zapal — ognisko” short of nature energy, an agent compares a change with the part no test holds:
> - complies: „Obchód — jagoda” on a tile that holds berries, with a full backpack, reading „plecak pełny”; „Zapal — ognisko” at an extinguished campfire with the sticks it needs and 7 nature energy reading „brak energii natury: 7 z 10”
> - violates: „Obchód — jagoda” with a full backpack reading „tu nie leży jagoda”; „Zapal — ognisko” short of nature energy reading another reason or none

Pairs removed: D-335, D-375. No pair added to a decision that had none.

## Choices, with the way rejected

- **A class that names a state is not the colour role it maps to.** The view tests check classes `winning`, `running`, `open`, `bar-go`, `bar-blocked`, `bar-unmet`; `src/browser/styles.css` maps them to the roles. I judged those tests to hold which row is in which state, and left the colours to the pair (R4; the head comment of `tests/view/rule-signs.test.mjs` says the look is checked in the browser). Where a test checks a class that is the role itself (`danger`, `warning`, `positive`, as earlier slices counted), I counted the role as held (D-334 S3 `text`, D-335 S1 `warning`, D-337 S2 "in red"). Rejected: counting the state classes as the colours too, which would drop the pair of D-308 and D-309. Cost if wrong: D-308 and D-309 carry a pair the reviewer judges redundant; easy to drop.
- **Overlap with the invariant `rule-state-from-pick` (method review).** It states where the signs and the rows come from, and names the three exceptions of „Teraz”. R1 speaks of "a test of an invariant"; no test is marked with this invariant, so I added lines to tests that hold the content of the sentences (which row, which words), and left without a line only `tests/sim/rule-signs.test.mjs:592`, which checks no more than what the invariant states. Rejected: leaving „Walczy z wilkiem”, the cause and the completion text without lines because the invariant mentions them — the tests hold more ("alone", "with no icon, no number, no minutes", the words of each cause). Cost if wrong: some D-334 S2/S3 lines read as doubling the invariant.
- **Partial holders carry the line of the sentence start.** A quotation must begin at the start of the sentence, so a test that holds a later clause (e.g. `tests/sim/program.test.mjs:150` for "finding that out draws nothing", `tests/sim/body.test.mjs:564` for the satiety clause of D-337 S2) quotes the sentence's opening words. For D-334 S1 I stopped the quotation at "the row „Teraz”" so it does not read as holding "keeps one height".
- **Where the line stands.** As earlier slices did: the first lines inside the case's callback, after any lines `decision:` already there (Python: after `# invariant:`). The script `.runs/executor-34/add_lines.py` (dry run, then `--apply`) inserted 125 lines at 94 cases by line number, refusing a line that is not a case opening.

## Remarks on the log's wording (R3 — nothing changed)

- D-310 S2 says the reason names the thing "in lower case", and gives „jeszcze nieodkryte: {name}” for an undiscovered rule; the code and `tests/sim/rule-signs.test.mjs:510` write the label with its capital, „jeszcze nieodkryte: Sytość poniżej”, „jeszcze nieodkryte: Zjedz — jagoda”. Read as a separate clause the sentence allows it, but "{name}" does not say it is the label as the editor writes it.
- The test name `tests/sim/rule-signs.test.mjs:260` "of several reasons the world and the backpack come before the nature energy" claims more than it asserts (only the world); a test name, not the log, so only noted.

## Reaches beyond the dispatch

- `src/browser/sim/program.ts:283-395` (`actionRefusal`, `worldRefusal`, `combatRefusal`) and `src/browser/sim/data/actions.ts:125-146` — to know whether „Zapal — ognisko” costs nature energy and the order of the reasons, so the pairs speak truly.
- `src/browser/sim/game.ts:222-265` (`nowAndNext`) — how „Potem” is taken from the judgement.
- `src/browser/styles.css:1040-1100`, `1798-1903` — the mapping of the sign classes and of `.body-note` to roles and sizes, for the pairs of D-308 and D-337.
- `foundations/invariants.md` entry `move-reach` — whether R1 applied to `tests/invariants/test_move_reach.py` (it derives from D-25).
- `tests/sim/body.test.mjs`, `tests/sim/gather.test.mjs`, `tests/sim/program.test.mjs`, `tests/sim/encounters.test.mjs`, `tests/sim/campfire.test.mjs:588-647`, `tests/view/run-screen.test.mjs:535-797`, `tests/view/run-header.test.mjs:244-284`, `tests/view/end-window.test.mjs:163-192`, `tests/view/end-window-lines.test.mjs:60-99`, `tests/invariants/test_move_reach.py:140-179`, `tests/invariants/test_simulation_randomness.py:470-499` — candidate cases found by the search by content (item 2). The end-window cases hold the window's title (D-368, D-132), not „Teraz”, and got no line.

## Working copies

- `.runs/executor-34/` under the worktree held: `add_lines.py`, `add_lines.log`, `unmarked.py`, `unmarked.txt`, `marked.py`, `marked.txt`, `base-check.txt`, `check-after.txt`, `check-control.txt`, `tests.log` and the outputs `out-*.txt` of the focused runs; a backup copy of `tests/view/now-lines.test.mjs` for the control run stood there and was restored and removed at once. The whole directory was removed before return; the report carries what it needs (exit codes and counts above).

## Unread material

none — every file and entry of the *Read* was read whole (the guidelines `testing.md`, `coding.md`, `styleguide-browser-view.md`, `foundations/part_map.md`, `foundations/glossary.md`, the entries D-308, D-309, D-310, D-334, D-335, D-336, D-337, D-375, D-380, D-73, D-82, the invariant `rule-state-from-pick`, the template passages and the decisions skill `SKILL.md` whole). The changed test files were read by case, not whole: `tests/sim/rule-signs.test.mjs` 1-1099 (all of it), `tests/sim/actions.test.mjs` 1-30, 150-289, 330-399 (the cases of „Wędruj” and „Idź”; the rest holds explore, steps and runs), `tests/view/world-area.test.mjs` 196-460 and 524-728 (the rows and the body row; the rest holds the scene, drawing and table), `tests/view/status-row.test.mjs` 160-209 (the clock after the end), and `tests/view/rule-signs.test.mjs`, `tests/view/now-lines.test.mjs`, `tests/view/body-row.test.mjs` whole. The plan file and the frozen task were read only in the passages the handoff copied or names (task lines 28-105).

## Searches not found or unclear

- A test of the order "combat first" or "the backpack before the nature energy" among the reasons (D-310 S1): not found (`trwa walka|tylko w walce` and the refusal words over `tests/`).
- A test of „Obchód — {rzecz}” with a full backpack, or of „Zapal — ognisko” refused for nature energy by its words (D-380): not found (refusal words over `tests/`; `campfire.test.mjs:590` checks only feasibility).
- A test that „Teraz” keeps one height, or that its row has no label (D-334): not found (`now-row` over `tests/`).
- A test of „Nowy program” shown in the panel during a map run with a click on „Teraz”/„Potem” (D-336): not found (`scrollIntoView|now-row|next-row` reach only `world-area` and `run-screen`).
- A test of the size or the role of `.body-note` (D-337): not found (`body-note` over `tests/`).
- A view test of the signs in the minutes of an attack or after a completion (D-308, D-309): not found (`winning|bar-` over `tests/`).
- A test that `ruleSigns` reads the mage's health as it stands (D-309): not found; `tests/sim/rule-signs.test.mjs:744` varies the wolf's health only.
- The foundation check printed only `0 errors` at the base, no list of decisions held by nothing, so the base list the handoff mentions did not show; my nine decisions all carried pairs at the base, so none could stand on it.
