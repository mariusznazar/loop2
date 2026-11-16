# Findings of the review of the whole change — for the fix (cut by the orchestrator from the reviewers' reports, in their words)

Range reviewed: `bd82d394..5b3dac41`. Two reviews, both `FAIL 5b3dac418ed9d744c4e9854b068909b96944be57`: pass 1 `reports/review-whole-report.md` (code and tests), pass 2 `reports/review-docs-report.md` (documents). B1 of pass 1 and I-1 of pass 2 are the same fault (twelve `decision:` lines): fix it once. Findings marked outside the task's scope are not in this file and are not fixed.

# Pass 1 — code and tests

## Blocking findings

### B1 (Important) — twelve `decision:` lines the slices wrote quote no binding sentence, so the foundation check fails and the one command `npm test` fails at the head

Anchors (each line as `foundation_check.py` reports it, with its slice):

- `tests/view/shared-controls.test.mjs:787` — slice 2 (`f4489d36`): `// decision: D-267 "that an Effect serves to synchronize with such a system, never to transform data for rendering or to handle a user event"` — "the quotation does not begin a sentence of `D-267`".
- `tests/view/program-panel.test.mjs:1993` — slice 8 (`85e379de`): `// decision: D-306 "moving the rule to another group, by an arrow or by the handle, closes nothing, and the panel stays open on the same field and goes with the rule to its new group"` — "does not begin a sentence of `D-306`".
- `tests/view/program-panel.test.mjs:617` — slice 9 (`eb8986aa`): `// decision: D-174 "During a map run ... its click switches the character to that program at once, and the panel shows „Kopia w przejściu” again"` — "stands in no binding sentence of `D-174`" (the `...` is an elision that is not in the decision).
- `tests/view/program-panel.test.mjs:647` — slice 9 (`eb8986aa`): `// decision: D-164 "a map run restart carries on the copy of the map run it replaces as it is, its unsaved changes included"` — "does not begin a sentence of `D-164`".
- `tests/view/login-card-focus.test.mjs:218`, `:233`, `:249`, `:303` — slice 15 (`0f269e61`, `dc787331`): `// decision: D-381 "…after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło” — and the card closes from its own handlers of an answer and of a click, never while it is being drawn."` — "stands in no binding sentence of `D-381`" (the leading `…` is not in the decision).
- `tests/view/login-card-focus.test.mjs:269` — slice 15 (`0f269e61`): `// decision: D-381 "Where the session check leads to the game instead, nothing changes."` — "stands in no binding sentence of `D-381`". This sentence is not in D-381 at all: it is a sentence of the plan's Slice 15 *Goal* (`plan.md`, "Where the session check leads to the game instead, nothing changes."), quoted as if it were the decision.
- `tests/view/login-card-focus.test.mjs:318` — slice 15 (`dc787331`): `// decision: D-381 "The card takes no focus when it opens — the page moves focus to it only after a confirmed logout, after a logout the server answers with no session, after a password was set, after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło”."` — "stands in no binding sentence of `D-381`" (the sentence is cut and given a full stop where D-381 goes on with "— and the card closes …").
- `tests/view/game-saver.test.mjs:527`, `:561` — slice 16 (`1130a9be`): `// decision: D-208 "each time with the game state of that moment and at once at a moment of saving of D-207, until a save succeeds and the sentence goes"` — "does not begin a sentence of `D-208`".

Why it exists and the mechanism: a `decision:` line ties a test to the sentence of the foundation that is the source of its expected value (`guidelines/testing.md`, "Where the expected value comes from"), and `foundation_check.py` holds each such line to begin a binding sentence of the decision it names, word for word. The foundation agent left the check green at `fecbea47` (its report: "exit 0, `0 errors`"); every slice after it ran only focused `npm test -- <file>` runs, which by `guidelines/testing.md` ("Test files in the gate") run no foundation check, and none of the five slices ran `foundation_check.py`. So the lines they wrote with a mid-sentence start, an ellipsis, a truncation or a sentence from the plan were never checked. At the head the one command runs the foundation check and stops red, so the request cannot pass the gate (AGENTS.md: "Before a merge, run every test … which runs `python -B .the-way/elements/common/foundation_check.py` too"). Line 269 is worse than a form fault: it presents a sentence of the plan as the decision, which `guidelines/testing.md` forbids ("Komentarz testu nie wskazuje dokumentu spoza fundamentu"), and a later reader looking for it in D-381 finds nothing.

Example with concrete values: `python -B .the-way/elements/common/foundation_check.py` at `5b3dac41` exits 1 with "12 errors"; at `fecbea47` it exited 0.

Fix: re-quote each line to the start of a binding sentence the test still holds — for D-306 `"After the last field the panel stays open, and „✕”, Escape or opening another rule closes it, as does deleting the rule; moving the rule to another group, by an arrow or by the handle, closes nothing, and the panel stays open on the same field and goes with the rule to its new group"`; for D-381 the whole second sentence `"The card takes no focus when it opens — the page moves focus to it only after … after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło” — and the card closes from its own handlers of an answer and of a click, never while it is being drawn."` (and drop line 269's quotation or replace it by that same sentence); for D-208 the second sentence from "When one fails, …"; for D-164 the first sentence from "Programs belong to the player, …"; for D-174 the second sentence without the elision; for D-267 the whole binding sentence from "No tool guards the rules of hooks and of effects: …". Then run the foundation check and see `0 errors`.

Slices: spans 2, 8, 9, 15 and 16 (commits named above). Pass 2 reads the `decision:` lines of `dddbc7d5`; these twelve are new lines of the slices and are not among them.

## Minor findings within the task's scope

### M1 — `tests/view/menu-bar.test.mjs:318` and `:325`: the test „a click on an item of the bar, which stands outside the menu, closes it” asserts that focus lands on „Konto”, which a real browser does not do under the changed D-285

The test exists to show that a click on a bar item closes the menu (D-285). It presses „Mapy” with `press`, which fires a click without moving focus, so the focus is on the body and the new rule sends it to „Konto”; line 325 then asserts `active()` is „Konto”. In a real browser a link takes focus on mousedown and D-285 now leaves it there. I checked it in the running game (Chromium, 1280 × 720): menu open, a real click on „Mapy” → menu closed, `document.activeElement` = `A`, text „Mapy”, address `#/mapy`. The assertion therefore pins a jsdom artifact that contradicts the decision the test quotes, and it would fail a correct change that, for example, models the browser's focus in `press`. Fix: focus the link before the press, as the rewritten neighbour test does with `field.focus()`, and assert the focus stays on the link; or drop the focus assertion and keep the closing. Slice 17 (`2d62c5d2`; its executor raised this as question 1 and left it).

### M2 — `src/browser/view/rule-list.tsx:168`, `:182`, `:190`–`:207`: `focusAfter` moved with its branches `up`, `down` and `add`, which nothing calls, and the type members only those branches use

To do 13 asks the program editor's module to lose the focus types of the old editor. Slice 6 moved `FocusTarget`, `StructuralEdit` and `focusAfter` whole into `rule-list.tsx`; the list calls `focusAfter` only with `"remove"` (its moves and its „+ reguła” build their own keys), and the one test of the other branches was deleted with the move. After the change three branches and the `"condition" | "up" | "down"` members exist only for `keysOf`'s matching branches and have no caller and no test — code that has no user, which `whole_change.md` asks to name. Cost if left: a reader takes the arrow branches for the live path of the focus after „↑”/„↓” and changes the wrong code. Fix: narrow `focusAfter` to the removal (its two results) and drop the dead members and `keysOf` branches. The cycle lists this as deliberate decision 5; I grade it Minor, no size rule applies (`guidelines/coding.md` has no `### Size of a function and a file`). Slice 6 (`23aa5440`).

### M3 — `tests/view/program-panel.test.mjs:590`, `:613`, `:1989`: test comments point to the task document („(To do 7)”, „To do 15”)

`guidelines/testing.md`, "Where the expected value comes from": „Komentarz testu nie wskazuje dokumentu spoza fundamentu.” „To do 7” and „To do 15” name points of `.runs/task-cycles/drobne-bledy-ekranow/task.md`, a file that lives only in the ignored record of this cycle, so after the merge the reference leads nowhere. The decisions named beside them (D-294, D-306) already carry the requirement. Fix: delete „(To do 7)” and „, To do 15”. Slices 9 (`eb8986aa`) and 8 (`85e379de`).

### M4 — `src/browser/view/tile-table.tsx:78` (`<Fragment key={text}>`) and `src/browser/view/terrain-drawing.tsx:95` (`classes.push("hovered")`): a key built from the visible text, and a class that no longer means what it says

The fire cell keys its spans by their text. Two equal texts in one row would give React duplicate keys, which it reports and which can drop or duplicate a child on update. With today's data I found no way to two equal texts on one tile — one campfire per tile (`run.ts:263`, `if (here …) return state`) and lit sticks a lighting of 5 game minutes apart (`actions.ts:141`), so their minutes left differ — so this is fragility, not a defect: the index (`key={index}`) is the stable key of a list that is only rebuilt. Second, a hovered unrevealed tile keeps the class `hovered` on its `g`, though after slice 12 such a tile is by D-41 not „the same place” as any row; no rule reads `.tile.hovered` (searched `src/browser/*.css` and the `.tsx` files), so nothing is drawn, but the class name says hover-linking where there is none. Fix: `key={index}`; push `hovered` only for a revealed tile, or leave it with a comment. Slice 12 (`798c278a`).


# Pass 2 — documents and foundation

## Important (blocking)

### I-1. The foundation check fails at the head with 12 errors, all in `decision:` lines the slices wrote

Anchors and the check's words (`python -B .the-way/elements/common/foundation_check.py`, exit 1, `12 errors`; log `reports/review-docs-foundation-check.log`):

- `tests/view/shared-controls.test.mjs:787` — "the quotation does not begin a sentence of `D-267`" — slice 2, `f4489d36`.
- `tests/view/program-panel.test.mjs:1993` — "the quotation does not begin a sentence of `D-306`" — slice 8, `85e379de`.
- `tests/view/program-panel.test.mjs:617` — "the quotation stands in no binding sentence of `D-174`" (it elides with "..."); `tests/view/program-panel.test.mjs:647` — "the quotation does not begin a sentence of `D-164`" — slice 9, `eb8986aa`.
- `tests/view/login-card-focus.test.mjs:218`, `:233`, `:249`, `:303` — "the quotation stands in no binding sentence of `D-381`" (each begins with "…"); `:269` — the same; `:318` — the same — slice 15, `0f269e61` (218–269) and `dc787331` (303, 318).
- `tests/view/game-saver.test.mjs:527`, `:561` — "the quotation does not begin a sentence of `D-208`" — slice 16, `1130a9be`.

Why it exists and the mechanism: a line `decision: D-NN "…"` binds a test to the sentence of the decision it holds, and the foundation check holds the quotation to start a sentence of the decision's binding text and to stand in it word for word, so that a change of the decision finds every test that quotes it. The slices quoted mid-sentence fragments, elided with "…" or "...", or ended a quotation with a full stop where the decision goes on: `login-card-focus.test.mjs:318` ends „…of the form „Ustaw nowe hasło”.” while D-381 goes on „…„Ustaw nowe hasło” — and the card closes…”. One quotation is not of the decision at all: `tests/view/login-card-focus.test.mjs:269` reads `// decision: D-381 "Where the session check leads to the game instead, nothing changes."` — that sentence is from the Goal of Slice 15 in `plan.md`, and no decision holds it (search of `foundations/`, `tests/` and `guidelines/` for "leads to the game instead" finds that line alone). A test then claims a decision says what it does not say. At `fecbea47` the foundation agent's report shows the check at 0 errors, and the handoff says the base had no failing check. So the errors came in with the slices. None of the slice reports ran the check, because no slice's *Checks* named it; that is a gap of the plan as well.

Effect: the one command runs the foundation check (`AGENTS.md`), so the gate before the merge fails at this head. I inferred this and did not run the full suite, as the handoff asks.

Fix: quote each from the start of a sentence of the decision's binding text, word for word, with no ellipsis and no added full stop. For example, `program-panel.test.mjs:1993` can quote D-306 from „After the last field the panel stays open, and „✕”, Escape or opening another rule closes it, as does deleting the rule; moving the rule to another group, …”, and `game-saver.test.mjs:527` can quote D-208 from „When one fails, …”. Replace `login-card-focus.test.mjs:269` with a quotation of D-381 that the test holds, or with D-225's „after a refusal of the link, whatever its reason, …”, which carries the game for a signed-in player.

### I-2. D-297 changed, but the code comments and test titles of the change still state the old D-297

Anchors:
- `src/browser/view/program-editor.ts:249-254` — „Null only where there is no group to move to: „↑” on the program's first rule and „↓” on its last.” (in the doc comment of `moveRule`, which cites D-297)
- `src/browser/view/program-editor.ts:284` — `/** Whether „↑” and „↓” of the rule at `index` of the named group act: off only at the program's ends. */`
- `tests/view/program-editor.test.mjs:1591` — test title „the arrows are off only on the program's first and last rule, a group's edge being no end”, whose line `:1593` the foundation agent re-quoted to the new D-297 sentence, „so a rule group left empty at the edge of the program takes the rule” included
- `tests/view/program-editor.test.mjs:933-934` — „// D-297: … null only at the program's ends.”
- `tests/view/rule-editor.test.mjs:400` — test title „the arrows are off only at the ends of the program: „↑” on the first rule and „↓” on the last”, whose line `:402` was re-quoted the same way

Why it matters: To do 14 and settlement row 1 make D-297 say that „↑” is disabled only where no rule group stands before the group of the rule, so an empty group at the edge takes the rule. The code does that (`moveRule` returns null only where `program.groups[at + offset]` is missing). Example: take groups [A empty, B with rules 1 and 2]. The program's first rule is B's rule 1, and its „↑” is enabled and moves it into A. The comment at `program-editor.ts:253` says that „↑” returns null there. These files are part of the change: `program-editor.ts` is changed by slices 3 and 6, and both test files have lines changed in `dddbc7d5`. They now restate D-297 more broadly than D-297 says, which is the kind of departure WAY-263 grades Important. They also recreate the very fault the task's *Need* names: an agent that reads the comment literally „naprawi” the code against the decision. The two re-quoted tests also quote a clause they do not exercise, since neither puts an empty group at the edge (D-297's own *Verification* says no test holds it).

Comes from: no slice. It is a gap of the plan's *Foundation entries* row 1 („none — the code and its tests already do it”), and the foundation commit `dddbc7d5` re-quoted the lines of these two tests without their titles.

Fix: reword the comments to say „null only where no group stands on that side” and the titles to say „off only where no group stands before (after) the rule's group”. Better still, add the edge case the *Verification* pair carries (an empty first group, with „↑” on the program's first rule enabled), so the quotation of the clause holds.

### I-3. A test of the menu „Konto” asserts focus on „Konto” after a click on an item of the bar, against the new D-285

Anchor: `tests/view/menu-bar.test.mjs:318-326`, test „a click on an item of the bar, which stands outside the menu, closes it”, which ends with `assert.equal(active(), buttonNamed(page.root, "Konto"));`.

Why it exists and the mechanism: D-285 now says that after a click outside the menu „focus stays where the player clicked, and where that place takes no focus it returns to „Konto””. An item of the bar is a link, and in Chrome, Edge and Firefox (D-396) a click on a link focuses it, so in the game focus stays on the link. The test passes only because the document imitation moves no focus on `press`. Focus therefore stays on „Konto”, which the player pressed to open the menu, and the code's branch for „inside the menu container” keeps it there. Slice 17's own test at `:288` shows the pattern the browser follows: it calls `field.focus()` before `press(field)`, because „A browser focuses the field it clicks before the click reaches the page.” The test at `:318` does not do that. It asserts, as an expectation, the behaviour D-285 rejected: „focus returning to „Konto” after a click outside the menu too” is in D-285's *Rejected*. An agent that takes the test for the specification brings back the rejected behaviour. Its `decision:` line was cut to D-285's first clause in `dddbc7d5`, so the assertion's claim no longer stands on any quotation. This is a file of the change restating its entry differently (WAY-263).

Comes from: slice 17, `2d62c5d2`, with the re-quotation in `dddbc7d5`.

Fix: call `link.focus()` before `press(link)`, as the test at `:288` does, and assert `active()` is that link. The alternative is to drop the focus assertion.

### I-4. D-381's *Verification* says that a card opened after a session check takes no focus, without the two new exceptions

Anchor: `foundations/decisions.md:3093` (D-381, *Verification*): „…no focus taken when the card opens after a session check or an expired save, focus in the first field after a confirmed logout, a logout answered with no session and a set password; …”

Why it matters: D-381's sentence now has the page move focus to the card „after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło””. In the code (`src/browser/view/app.ts:799-804`, `:821-824`, `:599-602`), both of those reach the card through a session check: `showReset` sets `focusCardOnForms` and runs `checkSession()`, and `showForms` then calls `focusCard()`. So the *Verification* clause „no focus taken when the card opens after a session check” is now false for exactly the two cases the task adds, and it lists the focus cases without them. My handoff requires *Verification* to be consistent with the new sentence. The decision is an entry the change writes, and the clause restates it without the qualification (WAY-263). The pair of examples below the clause carries the new cases, but the tests clause a reader meets first denies them.

Comes from: the plan's *Foundation entries* row 17, commit `dddbc7d5`.

Fix: „no focus taken when the card opens after a session check, other than one after a refused emailed link or „Anuluj”, or after an expired save, focus in the first field after a confirmed logout, a logout answered with no session, a set password, a refused emailed link and „Anuluj””. `tests/view/login-card-focus.test.mjs` now holds these cases, so the pair can go too (see M-1).

## Minor within the task

### M-1. Pairs of examples that say „no test holds” what a slice's test now holds

The foundation agent's report says the return step removes such parts. Listed here so that the return step has them all:
- D-306, `foundations/decisions.md:9281-9290`: the move to another group is held by `tests/view/program-panel.test.mjs:1992`. The deletion that closes the panel has no test (slice 8's report says so), so that part of the pair stays.
- D-294, `:8918-8926`: send and switch, held by `tests/view/program-panel.test.mjs:592` and `:615`.
- D-172, `:7962-7972`: the short line, held by `tests/view/program-panel.test.mjs:1415`.
- D-342, `:10578-10583`: the new entry, held by `tests/view/chronicle-entries.test.mjs:71`, `:81`.
- D-207, `:3746-3755`: the send after a failure, held by slice 16's cases in `tests/view/game-saver.test.mjs`.
- D-285, `:4435-4445`: the click on a field and on the background, held on the imitation by `tests/view/menu-bar.test.mjs:288`. The real-browser part stays.
- D-381, `:3093-3095`: held by `tests/view/login-card-focus.test.mjs:217`, `:232`, `:302`.

Why: a pair names what only an agent compares. When a test holds it, the pair is a second copy that drifts. Slices: 8, 9, 10, 11, 15, 16, 17 and the foundation commit.

### M-2. Rule sentences without the unit stand in more decisions than the handoff names

Row 16 says that the number stands with its unit „na każdym ekranie”, and the code writes „Zapas poniżej 8 szt. · Patyk”. These quotations of a row still have no unit:
- `foundations/decisions.md:8807` and `:8839` (D-288)
- `:8947` (D-295, „Temperatura poniżej 35”)
- `:9036` (D-300, „Zapas poniżej 8 · Patyk”)
- `:9200` (D-291, „Zapas poniżej 8 · Patyk → Zbierz — Patyk”)
- `:9403` (D-309, „Zdrowie poniżej 50”)

The handoff names D-288, D-295 and „one more”, so D-300, D-291 and D-309 may be beyond what the return step knows. None of these is a sentence the change writes, and each is an example a reader could copy into a test expectation. Comes from: none (the plan's row 16 named only D-306).

### M-3. The styleguide's sentence on the greyed pick cell grounds the colour of its frame in D-279

Anchor: `guidelines/styleguide-browser-view.md:310-313`: „wyszarzona (stan disabled) ma ramkę przerywaną w `text-disabled` — słowo kluczowe `dashed`, bez nowej wartości — z nazwą też w `text-disabled`, więc ramka ma kolor swojego tekstu (D-279), …”

Why: row 12 asks only to name the frame's colour `text-disabled` and to say there is no highlight under the pointer. The code holds both: `src/browser/styles.css:433-443` gives `border-color: var(--text-disabled)` and `.button.pick-cell.greyed:hover { background: transparent; }`, which outranks `.button:hover:not(:disabled)`. D-279 covers „a frame or a bar drawn at a text to set it apart” — a main button's frame, the bar of an answer, a field's frame in the colour of its message. A cell's frame is the frame of a control (D-40, `control-border`). The citation therefore reads D-279 more widely than it is written, which the task did not ask for. The colour is right, so nothing breaks. Fix: drop „więc ramka ma kolor swojego tekstu (D-279)”, or name the reason as the cell's own state of „cannot be used now” (D-40). Comes from the foundation commit `fecbea47`.

