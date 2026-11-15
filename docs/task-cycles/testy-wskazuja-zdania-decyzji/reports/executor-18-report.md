# Report — executor of slice 18 (buttons, tabs and leaving a manual map run)

**Status:** done with concerns (the concerns are judgment calls named under "Choices", not failures).

## Commits (base `f77c17c28dda50c2e379d13d5450f7ad5d066b0c`)

- `cacc69e9` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the main button, the secondary action, the tab, leaving and returning to a manual map run and what the screens allow while it waits with lines decision:
- `031207cd` docs: :memo: name the tests of D-274, D-275, D-276, D-283, D-284 and D-287, drop the pair of D-283, which its tests hold whole, and rewrite the pair of D-274, D-275, D-276, D-284 and D-287 only for the part no invariant and no test holds

Author address checked: `git log -2 --format='%h %ae'` gives `mariusznn@gmail.com` on both.

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 42 | 28 |
| `tests/view/account-screen.test.mjs` | 5 | 0 |
| `tests/view/react-controls.test.mjs` | 4 | 0 |
| `tests/view/maps-screen.test.mjs` | 3 | 0 |
| `tests/view/character-screen.test.mjs` | 2 | 0 |
| `tests/view/end-question.test.mjs` | 2 | 0 |
| `tests/view/tabs-area.test.mjs` | 1 | 0 |
| `tests/view/team-lines.test.mjs` | 1 | 0 |

A file beyond the slice's *Change* (item 5): `tests/view/account-screen.test.mjs` (part `browser-view`) — three cases hold sentences of D-275, D-283, D-284 and D-287; its focused run is below. No code, name or assertion of any test changed; no mention of a decision number was removed.

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` at the base — exit 0, `0 errors`, 11 decisions listed as held by nothing (D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220), none of this slice.
- `python -B .the-way/elements/common/foundation_check.py` after the edits and again at `031207cd` — exit 0, `0 errors`, the same 11 listed; none of D-274, D-275, D-276, D-279, D-283, D-284, D-287 named anywhere in the output.
- Positive control of that check: one quotation broken on purpose (`Przejście` → `Przejscie` in `tests/view/team-lines.test.mjs:194`), `python -B .the-way/elements/common/foundation_check.py` — exit 1, `tests/view/team-lines.test.mjs:194: the quotation stands in no binding sentence of D-287`, `1 error`; the file restored from a copy and `git diff` confirmed the one intended line before commit.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/<f>.test.mjs` for each of react-controls, tabs-area, maps-screen, end-question, character-screen, team-lines, account-screen — exit 0 each.
- `npm test -- tests/view/react-controls.test.mjs` — exit 0 (56 pass, 0 fail)
- `npm test -- tests/view/tabs-area.test.mjs` — exit 0 (13 pass, 0 fail)
- `npm test -- tests/view/maps-screen.test.mjs` — exit 0 (21 pass, 0 fail)
- `npm test -- tests/view/end-question.test.mjs` — exit 0 (17 pass, 0 fail)
- `npm test -- tests/view/character-screen.test.mjs` — exit 0 (7 pass, 0 fail)
- `npm test -- tests/view/team-lines.test.mjs` — exit 0 (16 pass, 0 fail)
- `npm test -- tests/view/account-screen.test.mjs` — exit 0 (131 pass, 0 fail)
  (exit codes kept in `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-18-test-exits.txt`)
- `git diff -U0 f77c17c28dda50c2e379d13d5450f7ad5d066b0c -- foundations/decisions.md`, read: nine hunks, every changed line in the *Verification* field of D-274, D-275, D-276, D-283, D-284 or D-287; D-279 untouched.
- Not run: the full gate `npm test` without a file — the cycle's run, not a slice's (method section 3). `test_ruff_source_rules` / `test_shellcheck_source_rules` were therefore not run by me; per the handoff they fail at the base with `FileNotFoundError`.

## Own-work check

- Requirement most likely missed: a line `decision:` whose quotation does not stand in the binding sentences (the D-287 lines quote a Polish sentence with `{mapa}` and curly quotes, and one starts in the middle of the second paragraph, at "Wróć do niego…"). Check: the foundation check validates every quotation; seen catching a broken one (positive control above, exit 1) and passing on the committed lines (exit 0, `0 errors`).
- Second: a *Verification* change spilling beyond the field — checked by the `git diff -U0` read above.

## Table per decision (item 6)

| Decision | Held in whole by tests | Held in part by tests | Held by invariants | Held by nothing | *Verification* |
|---|---|---|---|---|---|
| D-274 | — | Sentence 2 („Wejdź” … main look though it sends no form, „Puść w pętlę” plain): `tests/view/maps-screen.test.mjs:630` „„Wejdź” is the main button at each map, „Puść w pętlę” the plain one at a solved map alone, and both hand the page the row's program” (class `main`, type `button`, „Puść w pętlę” class `button`; one character only, and the sameness of the look is CSS); `tests/view/react-controls.test.mjs:299` „a main button outside a form is the same element in both forms, of the type button with the class main” (the kind `main` sends no form) | none (no invariant derives from it) | Sentence 1 (the look of a form's submit button, one to a form, no role of colour); the same look on the kind `main` (CSS); sentence 3 (only a submitting button, and every other action outside a form plain) | pair rewritten, `tests:` added |
| D-275 | — | Sentence 1, the part „a button still … no address” and „stands under that form”: `tests/view/react-controls.test.mjs:191` „a secondary action is the same element in both forms” (`<button type="button" class="button secondary">`, no `aria-pressed`); `tests/view/account-screen.test.mjs:5503` „the card opens on „Zaloguj się” with the name, the sentence, the switch, a form without a heading, „Nie pamiętam hasła” and the folded credits, in that order” („Nie pamiętam hasła” a `<button>` after the form and outside it) | none | Sentence 1: the look (underlined, `text-secondary`, no frame) and that the three login-card actions take the secondary kind; sentence 2 (every other action keeps D-44's button) | pair rewritten, `tests:` added |
| D-276 | — | Sentence 2, the part „keeps the HTML element, `aria-pressed` … of the button selected in its group”: `tests/view/react-controls.test.mjs:404` „a tab selected in its group is the same element in both forms”, `:425` „a tab not selected in its group is the same element in both forms”; `tests/view/tabs-area.test.mjs:144` „the area under the drawing holds the tabs Kronika and Teren with Kronika picked first, and a click on a tab tells the chronicle and shows its content alone” | none | Sentence 1 (no frame, `text-strong`, line in `selected`); sentence 2: the keyboard (Tab, Enter, Space) and no arrow keys and no tab roles; sentence 3 (the login switch drawn as tabs; pace buttons keep the selected look — `tests/view/run-header.test.mjs` „the header shows five pace buttons…” checks only the class `selected`, which a tab also carries, so it does not catch a pace button drawn as a tab) | pair rewritten, `tests:` added |
| D-279 | — | — | none | Both sentences (colours of frames and bars, and the selected line, live in `styles.css`; no test reads them) | unchanged (pair stays) |
| D-283 | The one sentence: `tests/view/account-screen.test.mjs:4326` „leaving the screen of a map run that goes on pauses it as „Pauza” does and saves at once; a return resumes nothing, and leaving a paused or an ended map run saves nothing” | also `tests/view/end-question.test.mjs:593` „leaving the screen closes the question and the map run stays paused on the return, “Zakończ” asking again” (leaving while the question stands) | none | nothing | pair removed, `tests:` added |
| D-284 | — | The sentence for a map run that went on before the player left: `tests/view/account-screen.test.mjs:4326` (same case as above), `tests/view/end-question.test.mjs:593` | none | The return to a map run that was already paused before the player left (no case leaves a paused run and comes back) | pair rewritten, `tests:` added |
| D-287 | Sentence 2 (the sentence in „Kto idzie” and the one at „Umiejętności”): `tests/view/maps-screen.test.mjs:766` „a manual map run going on, waiting and ended keeps „Wejdź” inactive and „Puść w pętlę” inactive at its character alone, with the sentence at each character”; `tests/view/account-screen.test.mjs:2789` „after the end of a map run every character's „Wejdź” is inactive under the sentence why, and „Zakończ” takes the sentence away”; `tests/view/team-lines.test.mjs:193` „the sentence beside an inactive send names the run's map from the data and tells the player to finish the run”; `tests/view/character-screen.test.mjs:224` „„Kup” is inactive with the sentence under the heading beside a waiting map run and beside an ended one” | Sentence 1: Mapy's „Wejdź” and „Puść w pętlę”, another character's loop active (`maps-screen.test.mjs:766`, `account-screen.test.mjs:2789`), „Kup” on Postać (`character-screen.test.mjs:224`) | none | Sentence 1: Siedziba and Postać keeping active what the simulation allows | pair rewritten, `tests:` added |

## Pairs added or rewritten (for the human at the merge)

**D-274** — rewritten (the „Wejdź” beside „Puść w pętlę” example moved to the tests):

```
- **Verification:** tests: „Wejdź” at a character in „Kto idzie” of the card of a map of the kind
  `main` of the shared button, a button that sends no form, beside „Puść w pętlę” as the plain
  button. For the look of the main button, one main button to a form and the plain button of every
  other action outside a form, an agent compares a change with the part no test holds:
  - complies: „Zaloguj się” under the login form with its text in `text-strong`, framed in the same
    colour and unfilled, on `highlight` under the pointer, and „Wejdź” of the kind `main` drawn in
    that same look; an action of the headquarters made with the plain shared button
  - violates: a form with two buttons in the main look; a main button filled, or framed in
    `selected` or in a colour other than its text's; a role of colour added for the main button
```

**D-275** — rewritten („a button the keyboard reaches” and „„Nie pamiętam hasła” made a link” left, being held; one example of the login-card actions added):

```
- **Verification:** tests: the secondary action of the shared button a button of the type `button`
  with the class `secondary`, in both forms; „Nie pamiętam hasła” a button standing under the login
  form, outside it. For the look of the secondary action, the actions of the login card drawn as
  secondary actions and the plain button of every other action, an agent compares a change with the
  part no test holds:
  - complies: „Wróć do logowania” under the form „Nie pamiętam hasła” as underlined text without a
    frame; „Wyloguj” in the menu „Konto” kept a plain button
  - violates: „Usuń” of a program rule drawn as underlined text; „Anuluj” of the form „Ustaw nowe
    hasło” drawn as a plain framed button; a secondary action given a frame
```

**D-276** — rewritten (only `aria-pressed="true"` left the complies example; violates unchanged):

```
- **Verification:** tests: a tab, in both forms of the shared button and as „Kronika” and „Teren”
  of the screen of a map run, a button with `aria-pressed`, `true` on the chosen one alone, which a
  click switches. For the look of a tab, its keyboard, the absence of arrow keys and of the roles
  of tabs, the switch of the login card drawn as tabs and the look of the pace buttons, an agent
  compares a change with the part no test holds:
  - complies: „Załóż konto” chosen in the switch with its text in `text-strong` and a line in
    `selected` at its bottom, and Space on „Zaloguj się” switching and moving focus to its address
    field
  - violates: arrow keys moving between tabs, or `role="tab"`, with no change of this decision; the
    chosen tab marked by a line in `positive`; a pace button drawn as a tab
```

**D-283** — pair removed; field now:

```
- **Verification:** tests: leaving the screen of a manual map run that goes on, by a change of
  address, the browser's forward button included, pausing it as „Pauza” does, its game minute
  standing while real time passes, also while the question „Zapisać, odrzucić, wrócić?” stands.
```

**D-284** — rewritten to the paused-before case:

```
- **Verification:** tests: a return to the screen of a map run that went on before the player left
  finding it in the pause leaving put it in, at the same game minute, waiting for „Wznów”. For a
  map run already paused before the player left, an agent compares a change with the part no test
  holds:
  - complies: a map run of Las paused by „Pauza” before the player opens Programy standing paused
    at the same game minute when the player comes back to it, and going on only after „Wznów”
  - violates: a map run paused before the player left going on by itself on the return
```

**D-287** — rewritten to what Siedziba and Postać keep active (`createCharacter` and `stopLoop` in `src/browser/sim/` refuse nothing for a held map run, while `send` and `buyBranch` do — read to keep the examples true):

```
- **Verification:** tests: on the screen Mapy, while a manual map run goes on, waits or has ended,
  „Wejdź” of every character inactive and „Puść w pętlę” inactive at that map run's character
  alone, another character's staying active; „Kup” on the screen Postać inactive while the map run
  waits and after its end; under the buttons of each character in „Kto idzie” the sentence naming
  the map from the data, gone after „Zakończ”; at „Umiejętności” the sentence that ranks are bought
  after the end of the map run. For what Siedziba and the screen Postać keep active, an agent
  compares a change with the part no test holds:
  - complies: while a map run of Las waits in a pause, „Załóż” on Siedziba creating a character and
    „Zatrzymaj” on the screen Postać stopping another character's earning loop
  - violates: Siedziba or the screen Postać blocking an act the simulation allows, such as „Załóż”
    or „Zatrzymaj”, while a manual map run waits or has ended
```

## Choices, with the way rejected

1. **Tests that only read which login-card state is chosen by `aria-pressed` got no D-276 line** (`account-screen.test.mjs` cases at 5503, 5549, 5575, 5696, 5967, 6013 use `switchState`). Their subject is the card's states (D-259, D-260); `aria-pressed` is their reading helper, as R4 treats a role a test merely uses. Rejected: marking each — they would fail if the switch dropped `aria-pressed`. Cost if wrong: six more lines and a `tests:` clause naming the login switch; the D-276 pair would then also drop nothing more (the switch's look and keyboard stay unheld).
2. **D-284 judged in part, not whole.** The sentence says „whether or not it went on before the player left”; every case leaves a map run that went on. The code cannot tell the two cases apart (it keeps no memory of who paused), so a resume-on-return would be caught anyway; I still kept a pair for the paused-before case, as the rule "a test narrower than the sentence holds only that part" gives. Rejected: dropping the pair. Cost if wrong: one redundant pair.
3. **`react-controls.test.mjs:299` marked for D-274 sentence 2** (the kind `main` is a `type="button"` with class `main`), beside the maps-screen case that checks „Wejdź” itself. Rejected: leaving it as a D-265 test only. Cost if wrong: one line too many.
4. **`account-screen.test.mjs:5503` marked for D-275** (it asserts „Nie pamiętam hasła” is a `<button>` placed after the form and outside it — the „stands under that form … a button still” part). Rejected: only the control-level case. Cost if wrong: one line too many.
5. **Quotation for the „Umiejętności” sentence of D-287** (`character-screen.test.mjs:226`) begins at „Wróć do niego i je zakończ, żeby wysłać postać.”, and at the section „Umiejętności” …”, the first word after a full stop and a space inside the Polish text, as the template allows and as slice 17 did for D-225. Rejected: quoting from „Under the inactive buttons…”, whose first part that test does not hold.
6. **D-276 quotation stops early** („A tab keeps the HTML element, `aria-pressed` and keyboard of the button selected in its group”) because no case holds the keyboard or the absence of arrow keys; the quotation still names „keyboard”, as the sentence's grammar binds it there.
7. **D-279 left unchanged**: no test reads the colour of a frame, bar or the selected line (`tests/view/discovery-band.test.mjs`, whose header cites D-279, checks no style).

## Remarks for the human (R3)

- D-287's first sentence lists Siedziba among the screens where „Wejdź”, „Puść w pętlę” and „Kup” stand inactive, but Siedziba has none of these buttons (`tests/view/headquarters-screen.test.mjs:759` „nothing on the screen sends a character or leads to the screen Mapy”); the sentence is not wrong, only broader than the screens it acts on. Nothing changed.
- `tests/view/maps-screen.test.mjs:766` also drives a map run that goes on (not paused) on Mapy, a state D-283 makes unreachable for the player; the decision speaks only of waiting or ended runs. Nothing changed.
- `tests/view/react-controls.test.mjs:402` comment cites „pytania 2 and 2c” — a reference to questions of a task document, which D-82 forbids as a source in a test comment. Not in my scope; left as is.

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-277, D-278, D-285, D-286 read in passing (they lie inside the read ranges) and the commit `f77c17c2` / `a1f1e0b9` diffs, for form.
- `guidelines/styleguide-browser-view.md:190-490` (States of shared controls, Kitchen-sink page, Main button/secondary action/tab, A line at a text) — the part of the browser-view styleguide that speaks of these controls, before touching `tests/view/**` and `tests/view/account-screen.test.mjs`.
- `src/browser/view/run-entry.ts:225-260`, `src/browser/view/team-lines.ts:10-40`, `src/browser/sim/game.ts` and `src/browser/sim/skills.ts`, `loop.ts` (signatures of `send`, `createCharacter`, `buyBranch`, `startLoop`, `stopLoop`) — to judge what the tests hold and to keep the D-287 pair true.
- `tests/view/page-document.mjs:134-137` (`press` is a click only), `tests/view/run-header.test.mjs:170-225`, `tests/view/chronicle-game.test.mjs:174-200`, `tests/view/screen-registry.test.mjs` case names, `tests/view/headquarters-screen.test.mjs` case names — candidate tests read and judged not holding.
- `the author's rules on writing scripts, outside the repository` and `git.md` (the user's own rules for scripts and commits).

## Working copies

- `.runs/executor-18/` held the foundation-check outputs, the seven test logs, the exit codes and a copy of `team-lines.test.mjs` for the positive control; removed. The exit codes kept in `reports/executor-18-test-exits.txt`.
- One output of the final foundation check was written for a moment to `/tmp/fc.txt` (the system temporary directory, against the working-copy rule) and removed in the same command. No remainder.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 190-490 only, of 986.
- `guidelines/coding.md`: read lines 1-105 and the heading list, of 330 (the slice adds comment lines only).
- `foundations/part_map.md` and `foundations/glossary.md`: not read (no part or term question arose; `account-screen.test.mjs` being `browser-view` is given by the plan's item 5).
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` and `task-frozen.md` passages: read as carried in the handoff and the task file read whole.
- Test files changed but read by range, not whole: `tests/view/react-controls.test.mjs` 1-700 of 1336; `tests/view/maps-screen.test.mjs` 1-30, 610-884; `tests/view/end-question.test.mjs` 1-20, 540-720; `tests/view/tabs-area.test.mjs` 1-260; `tests/view/team-lines.test.mjs` 1-20, 185-202; `tests/view/account-screen.test.mjs` 158-172, 240-275, 1505-1545, 2780-2860, 3340-3440, 3540-3585, 4316-4425, 5405-5614 and grep hits. `tests/view/character-screen.test.mjs` read whole.

## Searches not found or unclear

- No test reads `styles.css` for the main button, the secondary action, the tab's line or a bar at a text (searched `styles.css`, `currentColor`, `text-strong`, `underline` in `tests/`): the look parts of D-274, D-275, D-276 and all of D-279 stay with the pairs.
- No test presses Enter, Space or an arrow key on a tab or the login switch (`press` is a click; the only arrow keys are in `tests/view/menu-bar.test.mjs` and `tests/view/rule-editor.test.mjs`, not tabs).
- No test asserts the class `tab` or `secondary` on the login card's own buttons (searched `secondary`, `tab` in `tests/view/account-screen.test.mjs`).
- No test returns to the screen of a map run that was paused before the player left.
- No test checks Siedziba or Postać keeping an act active while a manual map run waits.
