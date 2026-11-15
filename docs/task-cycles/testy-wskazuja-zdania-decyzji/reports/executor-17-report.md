# Report — executor of slice 17 (screens, addresses and menu decisions)

**Status:** done with concerns

The concerns are judgment calls the reviewer should look at, not failures: the partial hold of
D-277 by tests that check which item is marked (section "Choices", 1), the tests outside the
slice's *Change* that got lines (section "Files beyond the *Change*"), and three remarks on the
log's wording (section "Remarks on the log's wording (R3)").

## Commits

Base `fdf9ee3815e79b5ea89a6e75727634ad9f297d06`, branch `task/testy-wskazuja-zdania-decyzji`.

- `a1f1e0b9d46fe5331d5522a983e57aa1d4e7c3a8` test: :white_check_mark: mark the tests that hold the
  sentences of the decisions on the menu bar's mark, the screens and the menu bar, the screen
  addresses, the areas, the team section and the pick in steps, the menu Konto and the page's
  sentence with lines decision:
- `f77c17c28dda50c2e379d13d5450f7ad5d066b0c` docs: :memo: name the tests of D-277, D-280, D-281,
  D-282, D-285 and D-286, drop the pair of D-281 and D-286, which their tests hold whole, and
  rewrite the pair of D-277, D-280, D-282 and D-285 only for the part no invariant and no test holds
  (for D-277 the words of the pair stayed; only the sentence that leads into it now names the part
  it covers)

Author address after the first commit: `mariusznn@gmail.com` (`git log -2 --format='%H %ae %s'`).

## Files changed (added / removed lines, `git diff --numstat fdf9ee38 HEAD`)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 45 | 44 |
| `tests/view/account-screen.test.mjs` | 30 | 0 |
| `tests/view/screen-address.test.mjs` | 32 | 0 |
| `tests/view/menu-bar.test.mjs` | 19 | 0 |
| `tests/view/program-editor.test.mjs` | 4 | 0 |
| `tests/view/screen-registry.test.mjs` | 3 | 0 |
| `tests/view/headquarters-screen.test.mjs` | 2 | 0 |
| `tests/view/rule-editor.test.mjs` | 2 | 0 |
| `tests/view/run-screen.test.mjs` | 2 | 0 |
| `tests/view/maps-screen.test.mjs` | 1 | 0 |

The test files changed only by added comment lines `// decision: …`; no test's code, name or
assertion changed, and no mention of a decision number was removed. In each file the line stands in
the form the file already uses: the first lines of the test's body (after any lines `decision:`
already there), and in `tests/view/screen-registry.test.mjs` at the top of the comment block above
the case, after its line `decision: D-408`.

## Files beyond the *Change* (item 5)

- `tests/view/account-screen.test.mjs` — holds the page-level cases of D-277, D-280, D-281, D-282,
  D-285 and D-286 (addresses at a reload, nearest screen, back and forward, the three clicks, the
  page's sentence, „Wróć do przejścia” across the screens).
- `tests/view/run-screen.test.mjs` — the three areas of the screen of a map run (D-282) and the map
  run given as a parameter (D-281).
- `tests/view/rule-editor.test.mjs` — the pick in steps of the rule panel (D-282).
- `tests/view/program-editor.test.mjs` — the action pick with „Zbierz” as one cell and the target
  field after the action (D-282).

All four are files of `browser-view` (`tests/view/**` in `foundations/part_map.md:15`); the
guidelines of that part, `guidelines/styleguide-browser-view.md`, are in my *Read* (read in part,
see "Unread material"). Each one's focused test was run (below).

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (at the base, before any edit) | 0 | `0 errors`; 11 decisions `held by nothing`, none of mine |
| `python -B .the-way/elements/common/foundation_check.py` (after the edits, before commit) | 0 | `0 errors`; 11 `held by nothing`, none of D-277, D-278, D-280, D-281, D-282, D-285, D-286 |
| same, with one quotation in `tests/view/maps-screen.test.mjs` deliberately broken to „An address names a screen in the path”, then restored from a copy | 1 error | `tests/view/maps-screen.test.mjs:182: the quotation stands in no binding sentence of D-281` — a control that the check does read and match the quotations; the file was restored and `git diff` showed only my one added line |
| `python -B .the-way/elements/common/foundation_check.py` (at HEAD `f77c17c2`) | 0 | `0 errors`; 11 `held by nothing`; no line names any of my seven decisions |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the nine changed `.mjs` files | 0 | All matched files use Prettier code style |
| `git diff -U0 fdf9ee3815e79b5ea89a6e75727634ad9f297d06 -- foundations/decisions.md`, read | — | six hunks, at the log's lines 6826 (D-277), 6905–6917 (D-280), 6965 (D-281), 7004 (D-282), 7080 (D-285), 7104 (D-286): each lies in the *Verification* field of its decision; nothing else of any entry changed |
| `git diff --check` | 0 | no whitespace error; `git ls-files --eol` shows LF in the index and the worktree for the log and the test files |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 | 29 tests, 29 pass |
| `npm test -- tests/view/screen-address.test.mjs` | 0 | 57 tests, 57 pass |
| `npm test -- tests/view/screen-registry.test.mjs` | 0 | 13 tests, 13 pass |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 | 26 tests, 26 pass |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 | 21 tests, 21 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 131 tests, 131 pass |
| `npm test -- tests/view/run-screen.test.mjs` | 0 | 20 tests, 20 pass |
| `npm test -- tests/view/rule-editor.test.mjs` | 0 | 75 tests, 75 pass |
| `npm test -- tests/view/program-editor.test.mjs` | 0 | 57 tests, 57 pass |

Not run: the full `npm test` — the cycle's run before the request, as the method gives; my handoff
did not ask for it. `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run by me
(they are in `tests/quality/`, outside every file I touched); the handoff states they fail at the
base with `FileNotFoundError`.

No test was written first and no invariant's test was touched, so there is no failing run to show.

## Own-work check

- **Requirement most likely missed:** every quotation must stand in the binding sentences of its
  decision as they are at the base, and every line must sit at the case it is meant for — with 95
  lines placed by a script, one line at the wrong case or a quotation one character off (the
  quotation marks „ ” and the `·` of „Wróć do przejścia”) is the likeliest slip.
- **Check:** the quotations were not typed: the script (kept below in the working copy, since
  removed) cut each one out of the entry's binding sentences in `foundations/decisions.md` after
  joining their lines, so it matches by construction; the foundation check then passed with
  `0 errors`, and the negative control above shows it fails on a quotation that does not stand in
  the entry. For placement, I tabulated every new line with the case it stands at (header line and
  title) and read the table against my judgments; it is the table below, 95 lines at 79 cases.
- **What it showed:** all 95 lines quote their sentence and stand at the intended case; the first
  run of the script stopped on a check that was too strict (it refused the same line at two
  neighbouring cases of `tests/view/screen-address.test.mjs`) after it had written
  `tests/view/menu-bar.test.mjs`; I restored that file with `git checkout -- tests/view/menu-bar.test.mjs`,
  narrowed the check to the case's own lines, and ran the script once more on the base files.

## Judgments, one row per decision

Lines are `path:line` of the test's header at HEAD.

### D-277 — the menu bar's mark

- **Held in part by tests:** „The menu bar marks the place the player is at” — which item is
  marked (`aria-current`) for the place the player is at, and the mark moving:
  - `tests/view/menu-bar.test.mjs:155` the item of the place the page gives is marked with aria-current, and none on a map run's screen
  - `tests/view/menu-bar.test.mjs:189` the bar follows the page's update: the marked item moves, and the open menu stays open
  - `tests/view/screen-address.test.mjs:280` Siedziba and the screen of a character mark the headquarters item of the menu bar
  - `tests/view/screen-address.test.mjs:290` Programy and a program of Programy mark the programs item of the menu bar
  - `tests/view/screen-address.test.mjs:301` the maps screen and a map's screen mark the maps item of the menu bar
  - `tests/view/account-screen.test.mjs:4061` the items of the bar lead to their screens, and back and forward walk the screens the player visited, the bar marking each
  - `tests/view/account-screen.test.mjs:4885` „Wróć do przejścia · {mapa} · minuta {m}” stands on Siedziba, Postać, Programy and Mapy while a map run waits or has ended, leads to its screen and is gone there
  - `tests/view/account-screen.test.mjs:5210` the header holds the menu bar: the game's name alone on every waiting screen, the items and „Konto” over the game
- **Held by invariants:** none (no `invariants:`).
- **Held by nothing:** the look of the mark — text in `text-strong` and the line in `selected` at
  the bottom (`src/browser/styles.css:103-107`); no test reads that rule.
- **Verification:** clause `tests:` added; the pair kept word for word, its lead now names the look
  of the mark as the part it covers.

### D-278 — the login card's top edge

- **Held by tests:** nothing. The 15% stands as `padding: 15vh …` in `src/browser/styles.css:665`;
  no test reads it (searched `15vh`, `15%`, `top edge`, `account-card` and `D-278` in `tests/`).
- **Held by invariants:** none.
- **Verification:** unchanged (it already has a pair, for the whole sentence).

### D-280 — the screens and how the player moves between them

- **Sentence 1** („The game has the screens Siedziba, Postać, Mapy, Programy and Przejście, all of
  one content width under one menu bar …”) — held in part: the five screens opened at their
  addresses by `tests/view/account-screen.test.mjs:3989` a reload at each of the seven addresses
  opens its screen and leaves the address as it is. Not held: the one content width, at most
  1344 px and the full width of a narrower window (CSS; no test reads it), and the one menu bar over
  every screen (a single bar is asserted only over Siedziba, in `account-screen.test.mjs:5210`,
  which I did not count for this sentence).
- **Sentence 2** („The menu bar holds at its left the game's name …”) — held in whole:
  - `tests/view/menu-bar.test.mjs:114` a waiting screen's bar holds the game's name alone, with no item and no „Konto”
  - `tests/view/menu-bar.test.mjs:125` over the game the bar holds the name, „Siedziba” to #/, „Mapy” to #/mapy, „Programy” to #/programy and „Konto”, in that order and without icons
  - `tests/view/menu-bar.test.mjs:214` „Wróć do przejścia” stands as a link to the map run's address when the page gives it, after „Programy”, and not otherwise
  - `tests/view/menu-bar.test.mjs:253` a click on „Konto” opens the menu with the account's address and „Wyloguj”
  - `tests/view/screen-address.test.mjs:308` with no map run in the game state, the return entry is absent
  - `tests/view/screen-address.test.mjs:313` a map run going on gives the return entry with its map's name, its minute and its address
  - `tests/view/screen-address.test.mjs:321` a map run ended in death and waiting for „Restart” or „Zakończ” keeps the return entry, with its minute still
  - `tests/view/screen-registry.test.mjs:368` the page is told its place once for each change, with the way back to a map run, and never after dispose
  - `tests/view/account-screen.test.mjs:3965` a reload at #/postac/1 while the save holds a map run opens the screen Postać of Ala, with the bar marking Siedziba and „Wróć do przejścia”
  - `tests/view/account-screen.test.mjs:4209` a send leads to the screen of the map run and „Zakończ” to the screen Postać of that character, each with a new entry, and back after „Zakończ” lands on Postać
  - `tests/view/account-screen.test.mjs:4408` after an emailed link — a confirmation, „Anuluj” of „Ustaw nowe hasło” or a refused link — a signed-in player opens Siedziba, whatever the save holds
  - `tests/view/account-screen.test.mjs:4885` „Wróć do przejścia · {mapa} · minuta {m}” stands on Siedziba, Postać, Programy and Mapy while a map run waits or has ended, leads to its screen and is gone there
  - `tests/view/account-screen.test.mjs:5210` the header holds the menu bar: the game's name alone on every waiting screen, the items and „Konto” over the game
- **Sentence 3** („The name of a character on its card on Siedziba leads to the screen Postać …”)
  — held in whole:
  - `tests/view/headquarters-screen.test.mjs:180` each character stands in the order of creation with its name as a link to its screen Postać, its generation from 2 up and its archetype
  - `tests/view/menu-bar.test.mjs:155`, `tests/view/menu-bar.test.mjs:189` (as under D-277)
  - `tests/view/screen-address.test.mjs:280`, `tests/view/screen-address.test.mjs:301` (as under D-277), and `tests/view/screen-address.test.mjs:296` the screen of a map run marks no item of the menu bar
  - `tests/view/account-screen.test.mjs:3965`, `:4061`, `:4209`, `:4885` (titles above)
- **Sentence 4** („A player reaches a first map run from Siedziba in at most three clicks …”) —
  held in whole: `tests/view/account-screen.test.mjs:4269` a player with one character, who has picked nothing, goes from Siedziba through „Mapy”, the row of Skraj lasu and „Wejdź” to the screen of the map run in three clicks
- **Held by invariants:** none.
- **Held by nothing:** the one content width (sentence 1).
- **Verification:** clause `tests:` added; the pair rewritten to the content width alone.

### D-281 — how an address names a screen

- **Sentence 1** („An address names a screen in the fragment after `#` …”, the seven addresses and
  the nearest screen) — held in whole:
  - `tests/view/screen-address.test.mjs:98` a fragment with ${name} reads as no screen (the table of 29 crafted fragments)
  - `tests/view/screen-address.test.mjs:105`, `:110`, `:115`, `:123`, `:131`, `:139`, `:144` — the seven addresses read as their screens
  - `tests/view/screen-address.test.mjs:156` every screen writes the address that reads back to it
  - `tests/view/screen-address.test.mjs:173`, `:181`, `:189`, `:197`, `:205`, `:213`, `:221`, `:229`, `:237`, `:242`, `:247`, `:258`, `:266` — the nearest existing screen (a map run with none → Postać, a program with none → Programy, any other → Siedziba, a map off the list of open maps included, a listed map stays)
  - `tests/view/screen-registry.test.mjs:296` the address gets the fragment with a new entry, in place of the current one or not at all
  - `tests/view/screen-registry.test.mjs:349` start draws the instances with no events, then shows the first screen with its address replaced
  - `tests/view/maps-screen.test.mjs:181` a row is a link to the map's address, a solved map says so after its name and the map named is the marked row
  - `tests/view/account-screen.test.mjs:3965`, `:3989`, `:4015` (a reload at #/mapy/forest stays on Mapy with Las picked …), `:4061`, `:4152` (an address that leads to no existing screen opens the nearest one …), `:4610` (the address picks the program …), `:4693` („Nowy program” … with a new entry), `:4713` (deleting the program shown opens the nearest screen …), `:4760` (… `#/programy/{n}` still shows program n), `:5056` (any other change of the address of an open game …), `:5088` (browserAddress goes to a fragment …)
- **Sentence 2** („The screen of a map run takes its map run as a parameter …”) — held in whole:
  `tests/view/run-screen.test.mjs:314` the screen draws the map run it was given, the copy of that map run in its program panel, not the game state's
- **Sentence 3** („The fragments of emailed links (D-156, D-224) stand apart from these, and after
  them the page opens Siedziba.”) — held in whole: `tests/view/screen-address.test.mjs:98` (rows
  `#confirm-email=abc`, `#reset-password=abc` read as no screen), `tests/view/account-screen.test.mjs:4408`
  (after an emailed link a signed-in player opens Siedziba), `tests/view/account-screen.test.mjs:5025`
  (a fragment of an emailed link that appears in the address of an open game reloads the page …)
- **Held by invariants:** none.
- **Held by nothing:** nothing.
- **Verification:** pair removed; clause `tests:` only.

### D-282 — what the screens leave room for

One binding sentence of three parts; every line quotes it from its start.

- **Each column an area of its own** — held in part:
  - `tests/view/run-screen.test.mjs:222` the header stands above three areas of their own in the order world, program and tabs, …
  - `tests/view/account-screen.test.mjs:4496` on Programy the list and the editor are the two areas, …
- **Siedziba draws the team as a section with a heading** — held in whole:
  `tests/view/headquarters-screen.test.mjs:129` the screen holds its heading Siedziba, then the sections „Drużyna” and „Skrzynka {n}/{cap}” under it
- **The rule panel offers its pick in steps, the action first and its target after it** — held in
  whole:
  - `tests/view/rule-editor.test.mjs:1070` the acceptance criterion: „Zapas poniżej 8 · Patyk → Zbierz — Patyk” is written from a click on its row in six actions, and the panel stays open
  - `tests/view/rule-editor.test.mjs:1212` the fields of a rule stand in the order condition, number, target of the condition, action, target of the action, each only where the rule has it
  - `tests/view/program-editor.test.mjs:1059` the actions of the pick stand in four named groups, … („Zbierz” one cell)
  - `tests/view/program-editor.test.mjs:1261` a target is picked from the resources of the Understanding alone, and an action with no target has no target field
  - `tests/view/program-editor.test.mjs:1336` the fields of a rule: the number only where the condition takes one, a target only where one is named
  - `tests/view/program-editor.test.mjs:1375` the field after a pick follows the order condition, number, target, action, target, and none follows the last
- **Held by invariants:** none.
- **Held by nothing:** that a narrower layout can rearrange the areas (CSS), and the areas of Mapy
  (no test asserts the list and the card of Mapy as areas of their own).
- **Verification:** clause `tests:` added; the pair rewritten to the narrower layout and the areas
  of Mapy.

### D-285 — how the menu „Konto” opens and closes

- **Sentence 1** („The menu „Konto” opens on a click and from the keyboard, and closes on Escape,
  on a click outside it and on a second click on „Konto”, focus then returning to „Konto”.”) —
  held in part:
  - `tests/view/menu-bar.test.mjs:242` „Konto” is a native button that says whether the menu stands open, and the menu starts closed (the keyboard only as „Konto” being a native button)
  - `tests/view/menu-bar.test.mjs:253` a click on „Konto” opens the menu …
  - `tests/view/menu-bar.test.mjs:270` Escape closes the menu and focus lands on „Konto”
  - `tests/view/menu-bar.test.mjs:285` a click outside the menu closes it and focus lands on „Konto”
  - `tests/view/menu-bar.test.mjs:297` a click on an item of the bar, which stands outside the menu, closes it
  - `tests/view/menu-bar.test.mjs:308` a second click on „Konto” closes the menu and focus lands on „Konto”
- **Sentence 2** („It stays open while „Wyloguj” or „Wyślij ponownie” waits for the server …”) —
  held in whole:
  - `tests/view/menu-bar.test.mjs:433` a send waits with the button disabled as Wysyłanie…, the menu stays open, …
  - `tests/view/menu-bar.test.mjs:475` the menu stays open after the answer to „Wyślij ponownie” until the player closes it
  - `tests/view/menu-bar.test.mjs:543` the server's answer that the address is already confirmed … keeps … the open menu
  - `tests/view/menu-bar.test.mjs:649` „Wyloguj” hands the page one request and does nothing else itself
  - `tests/view/menu-bar.test.mjs:660` while the page's logout waits „Wyloguj” reads Wylogowywanie…, …; the menu stays open …
  - `tests/view/account-screen.test.mjs:1041` a logout whose outcome is uncertain keeps the game with its sentence in the open menu „Konto”, and „Wyloguj” stays usable
- **Held by invariants:** none.
- **Held by nothing:** the keyboard in a real browser — the tests on jsdom check that „Konto” is a
  native button, not that Enter or Space reaches it (the file's header says so, and D-88 leaves real
  keys to the browser check).
- **Verification:** clause `tests:` added; the pair rewritten to the keyboard in a real browser.

### D-286 — how long the page's sentence stands

- **Held in whole by tests:** `tests/view/account-screen.test.mjs:4848` the page's sentence above the first screen leaves at the first change of screen and does not come back — both kinds of sentence above Siedziba, staying through an act that changes no screen, gone at Programy and not back on Siedziba.
- **Held by invariants:** none.
- **Held by nothing:** nothing (see "Choices", 3).
- **Verification:** pair removed; clause `tests:` only.

## Pairs added or rewritten (for the human at the merge)

No pair was added. Rewritten:

**D-277** (words unchanged; the lead names the part):

```
- **Verification:** tests: the menu bar marking the item of the place the player is at, Siedziba on
  Siedziba, Mapy on Mapy and Programy on Programy, and moving the mark as the player moves. For the
  look of the mark, an agent compares a change with the part no test holds:
  - complies: the item of the menu bar for the screen the player is on with its text in
    `text-strong` and a line in `selected` at its bottom
  - violates: that item marked in green, by a background or by a frame
```

**D-280:**

```
  … For the width of the content, an agent compares a change with the part no test holds:
  - complies: the content of Siedziba and of Programy 1344 px wide in a window 1920 px wide and as
    wide as a window 1000 px wide
  - violates: content wider on Programy than on Siedziba; the content of Postać narrower than a
    window 1000 px wide
```

**D-282:**

```
  … An agent compares a change with the part no test holds:
  - complies: a narrower layout placing the world, the program and the area with the tabs „Kronika”
    and „Teren” of the screen of a map run one above the other in that order; on Mapy the list of
    maps and the card of a map each an area of its own
  - violates: the list of maps and the card of a map of Mapy drawn as one block that a narrower
    layout cannot set apart; areas of a screen whose places a narrower layout cannot change
```

**D-285:**

```
  … For the keyboard in a real browser, which the tests on a document imitation
  do not show, an agent compares a change with the part no test holds:
  - complies: Enter and Space on „Konto” opening the menu in the browser, as the browser's own click
    of a native button
  - violates: a key handler on „Konto” that stops Enter or Space, so the keyboard no longer opens
    the menu
```

Pairs removed: D-281, D-286 (held in whole by tests).

## Choices, with the way rejected and the cost if wrong

1. **D-277 held in part by tests that check which item is marked.** The sentence's own subject is
   the look of the mark; I judged that „The menu bar marks the place the player is at” is still a
   claim a test can break — a bar that marks nothing, or the wrong item, breaks it — and these tests
   fail then. Rejected: leaving D-277 with no lines, as R4 would for a test that only checks a role
   (R4 does not apply: these tests check no colour role, and the decision names the menu bar and
   the place). Cost if wrong: eight lines `decision: D-277` to remove and the clause `tests:` to
   drop; the pair stays either way.
2. **Lines for tests that hold a sentence through an assertion beside their main purpose**, e.g.
   `tests/view/screen-registry.test.mjs:349` (it asserts `address replace #/`), the four cases of
   `tests/view/program-editor.test.mjs`, and `tests/view/account-screen.test.mjs:4760`, following
   item 2 ("it holds what it would fail on if the code broke that sentence"). Rejected: marking only
   the cases whose title names the sentence. I left unmarked the cases where the address or the
   screen is only the route to the assertion (e.g. `account-screen.test.mjs:4442`, `:4782`, `:4954`,
   `:3261`). Cost if wrong: lines to remove; no test changes.
3. **D-286 held in whole** by one case that opens on Siedziba. The rule is the same for any first
   screen, and after an emailed link the page always opens Siedziba (D-281), so only the sentence of
   a discarded saved game state at a reload on another address is unexercised. Rejected: keeping a
   pair for a first screen other than Siedziba. Cost if wrong: an agent has no pair for that case.
4. **D-280's one menu bar over every screen** counted as part of the unheld sentence 1, not held by
   `account-screen.test.mjs:5210`, which checks one bar over Siedziba only; the rewritten pair does
   not name it, since the screens share one header element by construction. Cost if wrong: a
   reviewer may want a pair example for it.
5. **D-282 quotations from the start of its one sentence.** The quotation must begin at a sentence's
   start, so the lines at the tests of the team section and of the pick in steps quote the area part
   too (as earlier slices did for D-157).
6. The script that placed the lines cut each quotation out of the log rather than taking it typed.

## Remarks on the log's wording (R3)

- **D-282 rationale and pair**: the binding sentence says "Each column of a screen is an area of its
  own"; on Programy the code and `tests/view/account-screen.test.mjs:4496` have two areas and the
  rule panel inside the program panel (D-288), which the old pair also said. No conflict, noted only
  because the old pair's example "the rule panel opening in place in the editor (D-288)" belonged to
  D-288 rather than to D-282; I dropped it from the rewritten pair as held by that test.
- **D-277's look** stands in `src/browser/styles.css:103-107` and in the styleguide
  (`guidelines/styleguide-browser-view.md:512-516`) with `font-weight: var(--font-weight-emphasis)`
  in addition; the decision does not name the weight. Not a contradiction; the styleguide says more.
- **D-285, the keyboard**: the styleguide (`guidelines/styleguide-browser-view.md:540`) names Enter
  alone; the decision says "from the keyboard". No test distinguishes them.

## Mismatches with the plan

- The plan's *Checks* list five test files; four more (`account-screen`, `run-screen`,
  `rule-editor`, `program-editor`) were reached under item 5 and run too.

## Reaches beyond the dispatch

- `src/browser/styles.css` (search for `aria-current`, `menu-bar`, `15vh`) — to see where D-277's
  look and D-278's top edge stand and whether a test reads them.
- `tests/view/run-screen.test.mjs`, `tests/view/rule-editor.test.mjs`,
  `tests/view/program-editor.test.mjs`, `tests/view/end-window.test.mjs:640-670`,
  `tests/view/program-panel.test.mjs:298-345`, `tests/view/previous-save.test.mjs` (cases near its
  page notices), `tests/view/account-screen.test.mjs` (cases by range) — candidates found by
  searching the content of the sentences, as item 2 asks.
- `the author's rules on writing scripts, outside the repository` and `.../rules/git.md` — my global
  instructions before a script and a commit.

## Working copies

- `.runs/executor-17/` (directly under the worktree's `.runs/`): the insertion script
  `add_lines.py` with its log, the table of placed lines `marked.tsv`, the outputs of the nine test
  runs and of the foundation check, and `maps.bak`, the copy used to restore
  `tests/view/maps-screen.test.mjs` after the negative control. The report holds what it needs of
  them; the directory is removed before I return.

## Unread material

- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md` — I read it whole, beyond the
  passages my *Read* names (`slice.md` says a slice opens only its passages).
- `guidelines/coding.md` — read in part: searched for comments, Prettier and line endings
  (`:34-35`, `:89-101`); the rest not read. My change adds comment lines only.
- `guidelines/styleguide-browser-view.md` — read in part: `:1-12`, `:491-551` (menu bar, the menu
  „Konto” and the list of programs) and a search for "test", „Konto” and "menu bar".
- `foundations/part_map.md` — read in part: a search for `tests/view` (`:15`).
- `foundations/glossary.md` — not read; no term of it decided a judgment.
- `.the-way/elements/decisions/template.md` — read `:108-262` (covers the three named passages).
- `guidelines/testing.md`, `.the-way/elements/decisions/skill/SKILL.md`, the seven entries, D-73 and
  D-82 — read whole.

## Searches not found or unclear

- No test reads the CSS of the menu bar's mark (`.menu-bar-item[aria-current="page"]`), the login
  card's `15vh`, or the content width 1344 px: searched `menu-bar-item`, `aria-current`,
  `styles.css`, `15vh`, `15%`, `1344`, `max-width` in `tests/`.
- No test asserts the list and the card of Mapy as areas of their own: searched `screen-area`,
  `area of its own`, `areasOf` in `tests/`.
- No case tests the page's sentence above a first screen other than Siedziba (D-286).
