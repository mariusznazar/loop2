# Report — executor of slice 36 (what the scene shows and how the mage acts in it)

## Status

done with concerns

The concerns are judgments at the border of "holds a part" (section "Concerns"); none blocks.

## Files changed and commits

Range from the slice's base `81dfed74ff0e81bb0e7096e70fb62b6722f3abe5`:

| File | Added | Removed |
|---|---|---|
| `tests/view/scene.test.mjs` | 92 | 0 |
| `tests/view/scene-picture.test.mjs` | 58 | 0 |
| `foundations/decisions.md` | 113 | 95 |

- `0ed2db55` test: :white_check_mark: mark the tests that hold the sentences of the decisions on what the scene draws, its effects, where the mage goes and walks, the badge over its head, a click on the scene, time standing still and the effects of gathering with lines decision:
- `6c1d2329` docs: :memo: name the tests of D-316, D-317, D-318, D-319, D-320, D-321, D-322, D-364, D-365, D-366 and D-367, drop the pair of D-318, D-366 and D-367, which their tests hold whole, and rewrite the pair of D-316, D-317, D-319, D-320, D-321, D-322, D-364 and D-365 only for the part no invariant and no test holds

Author address of both commits: `mariusznn@gmail.com`, the same as the earlier commits of the branch (`git log --format='%h %ae %s' -3`).

150 lines `decision:` added (92 in `scene.test.mjs`, 58 in `scene-picture.test.mjs`), each inside its case, after the line that opens it and after the lines `decision:` already standing there, as earlier slices place them. No test's code, name or assertion changed; no mention of a decision number removed. The full list of lines with their case and `path:line` is kept beside this report: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-36-lines.tsv`.

A test file the slice's *Change* does not name: `tests/view/scene-picture.test.mjs` (part browser-view; its styleguide `guidelines/styleguide-browser-view.md` was read whole; focused run below).

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (at the base) | 0 | `0 errors`; no note for any decision of this slice |
| `python -B .the-way/elements/common/foundation_check.py` (after the lines and the fields, before and after commit) | 0 | `0 errors`; none of D-316–D-322, D-364–D-367 listed as `held by nothing` |
| same, with one quotation broken on purpose (`D-321 "The scene is a pictureX, not a control"`), the file then restored byte for byte | 1 | `tests/view/scene.test.mjs:402: the quotation stands in no binding sentence of D-321` — shows the check validates each quotation |
| `npm test -- tests/view/scene.test.mjs` | 0 | tests 71, pass 71, fail 0 |
| `npm test -- tests/view/scene-picture.test.mjs` | 0 | tests 70, pass 70, fail 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/scene.test.mjs tests/view/scene-picture.test.mjs` | 0 | all matched files use Prettier code style |
| `git diff -U0 81dfed74… -- foundations/decisions.md`, each hunk's new lines mapped by a script to the entry heading and field above them | — | every changed line lies in the *Verification* field of one of D-316, D-317, D-318, D-319, D-320, D-321, D-322, D-364, D-365, D-366, D-367 (0 outside) |

Not run: the full gate (`npm test` without a file) — not the executor's, as the handoff and the method say. `test_ruff_source_rules` and `test_shellcheck_source_rules`, which fail at the base with `FileNotFoundError` by the handoff, were not run by this slice.

## Own-work check

- Requirement most likely unmet: "every test that holds one of its binding sentences carries a line" — a test in a file outside the two scene files missed.
- Check: `grep` of every test file for the content of the sentences (`scene`, the classes `scene-*`, the wolf, the tint, the bend, the badge, `640`, `160ms`, `300ms`, `prefers-reduced-motion`, `.png`) and for the numbers D-316–D-322, D-364–D-367 outside `scene.test.mjs` and `scene-picture.test.mjs`; each hit read.
- What it showed: `tests/view/world-area.test.mjs:482` (the scene as the picture of the forest at its one size, no text, hidden) holds D-349 and D-272, not D-321's "not a control" — no line; `tests/view/end-window-game.test.mjs` and `tests/view/run-screen-state.test.mjs` cite D-322 for the window waiting for the scene's effect, which is a sentence of D-311 (slice 35), not of D-322 — no line; `tests/view/camp-picture.test.mjs:100` and `tests/view/headquarters-screen.test.mjs:671` concern the camp (D-389), not the scene; no test outside jsdom reads the scene's motion (the header of `scene.test.mjs` says the beat and reduced motion are read in a browser, D-88), and no test checks that the browser view's code names no sprite file. No missed test found.
- Second requirement checked: each quotation matches its binding sentence — the foundation check validates it (negative run above).

## Rows of the decisions

Sentences are numbered by their order in the binding paragraph (a sentence ends at a full stop and a space). "Tests" give the case's `path:line` (the line of `test(`) and its name, shortened where long.

### D-316 — Verification: pair rewritten

- S1 "The scene draws the character, its campfire…" — in part: the scene drawing from its previous reading and from the events of the call: `tests/view/scene.test.mjs:591` „at „Restart”, the event of a map run started, the mage stands at its place at once…”; `tests/view/scene.test.mjs:625` „where the activity leaves the mage standing, it keeps the place of the previous reading…”; `tests/view/scene.test.mjs:1839` „the effect plays in the reading whose events carry its moment…”; `tests/view/scene.test.mjs:2385` „the wolf runs in from the right edge at the reading whose events carry the attack…”. Unheld: "holds no state of the game" and the pictures standing in the game's data.
- S2 "Sticks, the berry bush and moss always stand in the scene…" — in part: `tests/view/scene-picture.test.mjs:231` „the props stand always, also on a tile holding none of them…”; `:275` „the props stand the same whatever the mage is doing”; `:287` „no campfire on the character's tile: no fire…”; `:297` „a burning campfire on the character's tile is drawn with its frames…”; `:313` „an extinguished campfire … is drawn in the same picture, not burning”; `:769` „a burning fire draws the smaller flame…” (the extinguished fire keeps the full picture); `tests/view/scene.test.mjs:131` „a scene going on draws the background, the three props and the mage…”; `:282` „the fire is absent without a campfire on the tile…”; `:361` „the greys…” (extinguished fire in `grayscale(1) brightness(0.55)`); `:1709` „a burning fire shows the smaller flame…”. Unheld: the burning fire's motion and the extinguished fire "without motion".
- S3 "What attacks the character stands beside the mage…" — in whole: `tests/view/scene-picture.test.mjs:1356` „through the minutes of a combat the scene draws the wolf scuffling…”; `:1417` „the wolf stands on the right of the mage at each place … and on its left there…”; `:1471` „the wolf runs in at the reading whose events carry its attack…”; `tests/view/scene.test.mjs:2292` „in the minutes of a combat the wolf stands beside the mage, on its right, facing it…”; `:2351` „where the mage stands at the right edge the wolf stands on its left…”; `:2385` „the wolf runs in from the right edge…”; `:2596` „the mage keeps the way it turned after the fight…”; `:2690` „a death or a completion in the 300 ms of the run in leaves the wolf standing…”.
- S4 "The two scuffle, the creature in the frames of its bite…" — in part: `tests/view/scene-picture.test.mjs:1356`; `:1450` „the cloud of the scuffle stands over the middle of the gap…”; `tests/view/scene.test.mjs:2292`; `:2465` „the wolf stands still in its idle frame…” (bite frames while it fights). Unheld: the mage in its idle frames while it scuffles; "no flash".
- S5 "A defeated creature falls where it stood and is gone…" — in whole: `tests/view/scene-picture.test.mjs:1382` „the wolf stays after the mage's death in the fight and after a map run solved in a combat…”; `:1503` „the wolf falls where it stood when defeated and runs off to the right edge…”; `tests/view/scene.test.mjs:2465`; `:2512` „a defeated wolf falls and a departing one runs off to the right…”.
- S6 "Motion comes from CSS at a fixed beat…" — held by nothing.
- S7 "The tint of its light (D-315)…" — in part: `tests/view/scene-picture.test.mjs:918` „the tint is the streak's share of the required streak times 0.8…”; `:938` „the tint grows evenly in the streak, never down”; `tests/view/scene.test.mjs:1533` „the tint goes from 0 at streak 0 to 0.8…”; `:2163` „a completion's last image is the mage in colour in the full gold…”. Unheld: never blue, never greying, brightness left as it is, no effect in the game.
- S8 "A loss of the streak while the map run goes on…" — in part: `tests/view/scene-picture.test.mjs:988`, `:998`, `:1023`, `:1037` (the four cases of `tintShown`); `tests/view/scene.test.mjs:1551` „a loss of the streak in the map run's course returns the tint … on a new element…”; `:1586` „… in the player's pause or at a discovery returns the tint only where the scene goes on”; `:1613` „at a death, a completion, a map run started and a first draw the tint stands at once…”. Unheld: the length of 2 s.
- Invariants: `loop2-container-sprites` holds no binding sentence of D-316 (it is about the container serving the files); kept as it stood.

### D-317 — Verification: pair rewritten

- S1 "An effect of an ordinary event is a short sign of one event…" — in part: `tests/view/scene.test.mjs:936` „a gathering that ends with a piece more … sends the icon…” (no text); `:1098` „no effect without exactly one end of a gathering…” (two ends overdue); `:1147` „an effect whose turn comes at a stop is dropped…”; `:1195` „an effect lasts 300 ms, is dropped when its animation ends…”; `:2385` (no run in after a load or at a reading with no attack); `:2512` (fall 300 ms, no text, overdue dropped); `tests/view/scene-picture.test.mjs:682` (two ends overdue); `:1471` (run in not at an overdue reading). Unheld: 300 ms of the dust, of the run in and of the run off.
- S2 "What the character does through an action…" — in part: `tests/view/scene.test.mjs:855` „the mage bends while it gathers…”; `:2292` (scuffling through the combat). Unheld: the tint, cold layer and frost as states that change at their own rate.
- S3 "The three moments in which time stands still…" — in part: `tests/view/scene.test.mjs:1818` „a scene drawn on a moment … stands on its last image”; `:1870` „the end of an effect's own animation stands the scene on its last image…”; `:1921` „a moment that has played does not play again…”. Unheld: "no such limit" (an effect of a moment longer than 300 ms).
- S4 "The scene follows the system's setting for reduced motion…" — held by nothing.
- S5 "The scene shows no flash of its whole area." — in part: `tests/view/scene.test.mjs:2221` „the cold layer blends by colour, so it keeps the brightness…”. Unheld: any other effect over the whole area.
- Invariants: none.

### D-318 — Verification: pair removed

- S1 "The mage walks to the place its current action leads it to…" — in whole: `tests/view/scene-picture.test.mjs:111`, `:127`, `:145`, `:159`, `:172` (Zbierz, Obchód, the campfire actions, the right edge, waiting); `tests/view/scene.test.mjs:173` „the props and the mage stand at the places of the data…”; `:193` „the mage stands where the activity leads it…”; `:563` „at an ordinary change of activity the mage walks from where it stands to its next place…”.
- S2 "Where its action leads nowhere…" — in whole: `tests/view/scene-picture.test.mjs:139` (fibre), `:152` (Zapal — patyk, Zjedz), `:185` (combat); `tests/view/scene.test.mjs:625`.
- Invariants: none. Nothing unheld.

### D-319 — Verification: pair rewritten

- S1 "The walk of the mage to its place lasts 640 ms…" — held by nothing (jsdom runs no animation).
- S2 "A target that changes on the way turns the mage…" — held by nothing.
- S3 "At the start of a map run, after „Restart”, after a load…" — in part: `tests/view/scene.test.mjs:548` „at its first draw, after a load included, the mage stands at its place at once…”; `:591` „at „Restart”…”; `:765` „the screen of a map run hands the events of each update to the scene”. Unheld: reduced motion.

### D-320 — Verification: pair rewritten

- S1 "Over the mage's head stands a badge…" — in part: `tests/view/scene.test.mjs:221` „the badge over the mage holds the icon of the action as a mask and a fill as long as the progress”; `:682` „a new action's bar starts empty…”; `:1501` „the badge's carrier stands where the mage stands and walks as it walks”; `tests/view/scene-picture.test.mjs:334` „the badge shows the icon of the action, the file of the rule's row…”; `:360` „the progress is 0 at the start…”; `:421` „the badge stays at a pause and at a stop at a discovery”. Unheld: `panel`, `text-strong`, `positive` on `highlight`.
- S2 "While the character waits no icon and no bar stand there…" — in whole: `tests/view/scene.test.mjs:257` and `tests/view/scene-picture.test.mjs:382` „no badge while waiting, in combat, after a death and after a completion”.
- S3 "Under the system's setting for reduced motion the bar jumps…" — held by nothing.

### D-321 — Verification: pair rewritten

- S1 "The scene is a picture, not a control…" — in part: `tests/view/scene.test.mjs:401` „the scene is a picture: hidden from assistive technology, no text, nothing the keyboard reaches”; `:432` „a click on the scene, on any part of it, does nothing”. Unheld: "no pause sign stands on it" (no case draws a paused scene and looks for a sign that is not text).

### D-322 — Verification: pair rewritten

- S1 "While the player's pause holds a map run, the scene is greyed…" — in whole: `tests/view/scene.test.mjs:361` „the greys…”; `:651` „every stop holds every animation of the scene…”; `:1147` (an effect running stands still at the pause); `:1743` „the pause greys the tint and the frost with the whole scene…”; `:2432` (the wolf's frames and the cloud held at every stop); `tests/view/scene-picture.test.mjs:444` „the player's pause stops the scene, which is then greyed”.
- S2 "In the three moments in which time stands still…" — in part: `tests/view/scene.test.mjs:257`, `:361`, `:651`, `:1870`, `:1921`, `:1938` „a discovery shows a plaque for each icon … and „Wznów” takes them away”, `:1989`, `:2038` „after a death the mage shows its death sheet…”, `:2072` „a dead mage falls toward the middle of the frame…”, `:2096` „the cold layer stands after a death of cold alone…”, `:2133` „the specks of a completion…”, `:2163`, `:2176` „at its stop only the effect of a moment runs…”; `tests/view/scene-picture.test.mjs:382`, `:463`, `:474`, `:481` (the standings of a discovery, a death and a completion), `:1068`, `:1119`, `:1145`, `:1163`, `:1212`, `:1244`, `:1293` „the death sheet holds pixels alone, six frames…”. Unheld: the plaques on `panel` with a frame in `discovery`; the layer after a death of cold blue.
- S3 "At the stop at a discovery that the first attack makes…" — in whole: `tests/view/scene.test.mjs:2432`.
- S4 "Where the map run ends in the game minute of a discovery…" — in part: `tests/view/scene.test.mjs:1818`, `:1839`, `:2002` „a death or a completion in the game minute of a discovery shows no plaque”; `tests/view/scene-picture.test.mjs:1084` „a moment has just begun where the events of the call carry…”, `:1225`. Unheld: reduced motion showing the last image at once.

### D-364 — Verification: pair rewritten

- S1 "While the mage gathers…" — in part: `tests/view/scene.test.mjs:855`; `:885` „the mage's bend sheet is the data's file, shown in place of the idle sheet…”; `tests/view/scene-picture.test.mjs:551` „the mage bends while it gathers, whichever the target, and at nothing else”. Unheld: the loop at the fixed beat, and bending only from the moment it stands at its place.
- S2 "Bending is a continuing occupation of the character…" — in whole: `tests/view/scene.test.mjs:855` (bending at the start of the action as a state of the mage, no effect).
- S3 "It faces the prop of what it gathers…" — in whole: `tests/view/scene.test.mjs:915`, `:1362`; `tests/view/scene-picture.test.mjs:732`, `:746`.

### D-365 — Verification: pair rewritten

- S1 "When a gathering ends with a piece more in the backpack…" — in part: `tests/view/scene.test.mjs:936`, `:1033` (no icon at a miss), `:1084` „an „Obchód” that brought nothing shows no effect”, `:1195` (gone when its animation ends), `:1268` „an effect stands at the mage that gathered…”; `tests/view/scene-picture.test.mjs:614` „a hit flies the resource's icon from the middle of its prop to the mage's body…”, `:651`. Unheld: the arc and the plaque's `panel` background.
- S2 "A resource with no prop sends it from under the mage's feet…" — in whole: `tests/view/scene.test.mjs:988`, `:1005`; `tests/view/scene-picture.test.mjs:641`, `:651`.

### D-366 — Verification: pair removed

- S1 "When „Zbierz” ends with no piece more in the backpack…" — in whole: `tests/view/scene.test.mjs:1033`, `:1061` „a missed „Zbierz” of the fibre puts the cloud under the mage's feet”, `:1268`; `tests/view/scene-picture.test.mjs:661`.

### D-367 — Verification: pair removed

- S1 "The scene shows an effect of the end of a gathering…" — in whole: `tests/view/scene.test.mjs:1098`, `:1268`; `tests/view/scene-picture.test.mjs:682`, `:710` „no effect where an action that takes pieces out of the backpack ended…”.
- S2 "Any other reading starts none…" — in whole: `tests/view/scene.test.mjs:1098`, `:1147`, `:1195`, `:1224` „a new effect takes the place of the one still running…”, `:1247` „a map run started drops an effect still standing”, `:2631` „a reading that carries the attack together with the end of a gathering…”; `tests/view/scene-picture.test.mjs:682`. "Unless the map run is left": leaving unmounts the scene and the next entry is a first draw, which starts no effect (`:1098`, the first-draw case); I judged that held.

## Pairs added or rewritten (for the human to accept at the merge)

No pair was added to a decision that had none. Rewritten:

**D-316** — "For what the scene holds, the source of its pictures, its motion and the colours of its tint, an agent compares a change with the part no invariant and no test holds:"
- complies: the place where the mage stands kept by the scene and not in the game state; the file and the place of the sticks, the bush, the moss and the wolf read from the files of the game's data; a burning campfire moving and an extinguished one standing still; the frames of the mage's sprite changing by a CSS animation at the same beat at 1× and at 16×; the mage in the frames of its idle sheet while it scuffles; the tint never blue, never greying the scene, leaving its brightness as it is and changing nothing in the game; a loss of the streak taking the tint back over 2 s
- violates: the picture of a resource named in the code of the browser view; the picture or the file of the wolf named in the code of the browser view; a blow shown by a flash or a mark of its own; a canvas or a timer redrawing the scene on every tick; the beat of the frames following the pace; an extinguished campfire whose flame still moves; the place where the mage stands kept in the game state; a tint that darkens or greys the scene or turns it blue; a return of the tint in one frame

**D-317** — "For the length of the other effects, the state of the whole scene, the system's setting for reduced motion and a flash of the whole area, an agent compares a change with the part no invariant and no test holds:"
- complies: the cloud of dust of a miss gone in 300 ms; the wolf running in from the right edge, and running off to it, in 300 ms at 1× and at 16×; the tint, the cold layer and the frost changing at the rate set for each and never dropped as an effect; the fall of the mage after a death lasting longer than 300 ms; the scene under the system's setting for reduced motion keeping its frames still, standing the mage and the wolf at their places at once, showing the flight or the dust still at its place for 300 ms and the last image of a moment at once; an effect of the scene that changes a part of its area
- violates: a cloud of dust, a run in or a run off of a wolf that lasts 500 ms; a wolf that runs in for 640 ms; the effect of a moment cut off at 300 ms; a scene that moves under the system's setting for reduced motion as it does without it; an effect that lights or darkens the whole area of the scene for a moment

**D-319** — "For the walk itself, a target changed on the way and the system's setting for reduced motion, an agent compares a change with the part no invariant and no test holds:"
- complies: the walk from the sticks to the campfire taking 640 ms at 1× and at 16×, the frames of its sprite changing every 160 ms; a target changed half way turning the mage from where it stands; the mage standing at its place at once, its frames still, under the system's setting for reduced motion
- violates: a walk shortened to 300 ms or to the time of the action; a walk whose length follows the pace or the distance; a mage that, its target changed on the way, starts its new walk from the place it walked from; a mage that walks under the system's setting for reduced motion

**D-320** — "For the colours of the badge and the system's setting for reduced motion, an agent compares a change with the part no invariant and no test holds:"
- complies: the mage gathering a stick with the badge on `panel` over its head, the icon of „Zbierz” in it in `text-strong` and under it the bar in `positive` on `highlight`; the bar jumping at each reading of the clock under the system's setting for reduced motion
- violates: the badge with no background of its own, its icon standing straight on the trees; the fill of the bar in `text-strong` or `warning`; a bar that fills smoothly under the system's setting for reduced motion

**D-321** — "For a pause sign, an agent compares a change with the part no invariant and no test holds:"
- complies: the scene of a paused map run telling the pause by its grey alone
- violates: a pause sign standing on the scene

**D-322** — "For the colours of the plaques and of the cold layer and the system's setting for reduced motion, an agent compares a change with the part no invariant and no test holds:"
- complies: the plaques of a discovery on `panel` framed in `discovery`; the layer over the scene after a death of cold blue; a scene under the system's setting for reduced motion showing the mage lying at once
- violates: plaques of a discovery with no frame, or framed in another role than `discovery`; a layer after a death of cold in the cool grey-green of the tint; a scene under the system's setting for reduced motion that plays the fall of the mage

**D-364** — "For the loop of the bend, its beat and the moment it begins, an agent compares a change with the part no invariant and no test holds:"
- complies: the mage at the sticks bending in a loop from the end of its walk to the end of „Zbierz — Patyk”, at the same beat at 1× and at 4×
- violates: a beat of the bend that follows the pace; a mage that bends while it still walks to the sticks; a bend that plays its frames once and stands

**D-365** — "For the arc and the background of the plaque, an agent compares a change with the part no invariant and no test holds:"
- complies: the icon of a stick on a plaque in `panel` flying in an arc from the sticks to the mage
- violates: the icon on a plaque with no background of its own, straight on the picture of the forest; an icon that flies in a straight line

Removed whole: the pairs of D-318, D-366 and D-367.

## Wording of the log against the code (R3)

None found. The stylesheet carries the lengths the sentences give (`640ms`, `calc(var(--frames) * 160ms)`, `300ms`, `2s` in `src/browser/styles.css`), and the cases read agree with the sentences.

## Concerns

1. Lines on cases that check the scene's standing (`tests/view/scene-picture.test.mjs:444`, `:463`, `:474`, `:481`): they check the classification the stylesheet reads (paused, discovery, dead, completed), not the grey itself; I marked them because each fails where the code greys or keeps in colour the wrong stop by that classification, and their names state the sentence. `tests/view/scene.test.mjs:321` „the scene marks how it stands…” and `tests/view/scene-picture.test.mjs:417`, `:435` were left without a line: their names state no sentence and they repeat the same classification. If the reviewer reads such a test as narrower than "holds a part", the four lines go and nothing in the fields changes, since other cases hold the same parts.
2. D-316 S1 lines (`tests/view/scene.test.mjs:591`, `:625`, `:1839`, `:2385`): the sentence's source list ("from the game state, its previous reading and the events") is held through these cases, which fail where the scene ignores the events or the previous reading. The other parts of S1 ("holds no state of the game", pictures in the data) stay in the pair.
3. `tests/view/scene.test.mjs:173` „the props and the mage stand at the places of the data…” carries D-318 S1: it fails where „Zbierz — Patyk” leads the mage elsewhere than the sticks, though its subject is the percentages of the frame.
4. D-317 S1 length: `scene.test.mjs:1195` reads the computed `animation-duration` of the flight from the rule `.scene-effect` outside any `@media` rule; the dust is a `.scene-effect` too, but no case reads its duration, so the dust's 300 ms stays in the pair.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` — the method's row for a slice names it.
- `.the-way/elements/common/foundation_check.py:700-737` — to learn how `held by nothing` is reported (a note, printed only where a decision is held by nothing).
- `tests/view/world-area.test.mjs:470-530` and `:790-830`, `tests/view/run-screen-state.test.mjs:80-130`, the case list of `tests/view/end-window-game.test.mjs` — candidates of the content search.
- `src/browser/styles.css:2175-2185` and the lines with `640ms`, `160ms`, `300ms`, `2s` — to judge which lengths a computed-style case reads and whether the sentences agree with the code (R3).
- `the author's rules on writing scripts, outside the repository` and `.../rules/git.md` — the session's own rules before the insertion script and the commits.

## Working copies

- `.runs/executor-36/` held the insertion script `add_lines.py`, the outputs of the foundation check and of the two test runs, and the list of lines; a backup copy of `scene.test.mjs` for the negative check stood there and was restored from. The directory was removed (`rm -rf`, checked absent). The list of lines is kept beside this report as `executor-36-lines.tsv`.

## Adaptations of section 4

- The plan's line ranges of the log are stale; the handoff's current ranges held. No other mismatch.
- The slice's *Change* names `tests/view/scene.test.mjs` only; `tests/view/scene-picture.test.mjs` holds many sentences of the same decisions and got lines by item 5 of "Work of every slice" (one line above).

## Unread material

- `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/styleguide-browser-view.md`, `foundations/part_map.md`, `foundations/glossary.md`: read whole.
- `tests/view/scene.test.mjs` and `tests/view/scene-picture.test.mjs`: every case read; the PNG decoder helper of `scene-picture.test.mjs` (`:765-827`) read as a helper only.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md`: lines 28-105 read (the *Read* names 30-37, 39-42, 99-104).
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md`: not opened; its passages are copied in the handoff.
- `.the-way/elements/decisions/template.md`: lines 105-264 read (covering 111-127, 162-166, 220-260).

## Searches not found or unclear

- No test checks that the browser view's code names no sprite or creature file (searched `.png` across `tests/`): that part of D-316 S1 stays in the pair.
- No test checks the walk's 640 ms, the 160 ms frames, the 2 s return of the tint or any rule under `prefers-reduced-motion` (searched `640`, `160ms`, `2s`, `prefers-reduced`, `reduced-motion` across `tests/`); the header of `scene.test.mjs` says jsdom runs no animation.
- No case checks a target changed mid-walk (searched "on the way", "half", "reached").
- The foundation check prints no line for decisions held by something; at the base it printed `0 errors` alone, so the handoff's "23 decisions held by nothing" list was not visible in this worktree's run — none of this slice's decisions was listed.
