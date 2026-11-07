# Report - slice 9, Siedziba in React

**Status:** `done with concerns` (concern: the plan's "account-screen.test.mjs passes unchanged" did
not hold for two cases, which I changed; see "Problems and mismatches").

## Commits

- `d16b01d` feat: :sparkles: draw Siedziba in React with its report, its team and its chest
  (on `task/karty-i-katalog-map`, base `df293aa`; worktree clean afterwards).

## Files changed (added / removed lines, from `git show --stat HEAD`)

| File | + / - |
|---|---|
| `src/browser/view/headquarters.tsx` (new) | +373 / 0 |
| `src/browser/view/headquarters.ts` (removed) | 0 / -289 |
| `src/browser/view/away-report.ts` (DOM part and `createAwayReport` go, header comment added) | +5 / -61 |
| `src/browser/view/game-view.ts` (new boundary, `headquartersProps`, `dispose`) | +26 / -17 |
| `src/browser/styles.css` (three unused rules go) | 0 / -16 |
| `tests/view/headquarters-screen.test.mjs` (new, 17 cases) | +531 / 0 |
| `tests/view/account-screen.test.mjs` (two cases changed, see below) | +38 / -21 |

## Checks (command, exit code)

Test written first, failing, on the old DOM module (its API differs, so it drew nothing):

- `npm test -- tests/view/headquarters-screen.test.mjs` -> exit 1; 16 of 17 cases failed on assertions
  (for example `expected ["Ala","Ola","Ela"], got []`). The one case that passed, "a name empty once
  trimmed creates nothing and says „Wpisz imię postaci.”", states behaviour the old module also had.
  The same command after the code -> exit 0, 17 pass.

After the code (the slice's *Checks*):

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 | 17 pass |
| `npm test -- tests/view/away-report.test.mjs` | 0 | 14 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 128 pass (2 cases changed, see below) |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 | 13 pass |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 | 20 pass |
| `npm test -- tests/view/character-screen.test.mjs` | 0 | 7 pass |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | 1 test OK |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | 9 tests OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | 4 tests OK |
| `npm run typecheck` | 0 | clean |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK (ESLint, Prettier, Ruff, ShellCheck) |
| browser check through `npm run local`, see below | done | no console error, 0 messages |

Also run, as tests of code I touched (`game-view.ts`): `npm test -- tests/view/menu-bar.test.mjs`
(exit 0, 28 pass), `tests/view/end-question.test.mjs` (exit 0, 17 pass),
`tests/view/memory-limit.test.mjs` (exit 0, 37 pass).

Not run: the full `npm test` and `foundation_check.py` (the orchestrator's gate). One mismatch with the
handoff: none beyond the plan's wording "unchanged" (below).

A failure that passed when run again: the first `test_quality_invariants.py` run failed on ESLint
`@typescript-eslint/unbound-method` at `headquarters.tsx` (passing `controls.stop` and
`controls.create` declared with method syntax); after I declared the three controls as function
properties it passed (exit 1 then exit 0). The first run of `account-screen.test.mjs` after the code
failed 2 cases (exit 1); after the two test changes below it passed (exit 0). A third run of my
changed tick case failed once because the observer's callback had already consumed the records
(exit 1), and passed after the case collected the records in the callback (exit 0).

## Own-work check (method section 3, WAY-164)

Requirement of the slice most likely not met: "the field of the name keeps its text and its focus and
the button keeps its focus at every refresh of the game state" (together with "after „Zamknij” the
focus goes to the heading „Drużyna”"), because React redraws the whole screen at every update.

- Check in the tests: `the field keeps its element, its text and its focus, and the button its focus,
  through every refresh of the state and of the moment` (four refreshes that change the loop, the
  team and chest, the report and the moment, then the button) and the two „Zamknij” cases. Mutations
  seen failing: removing the focus move after „Zamknij” (the „Zamknij” case failed); keys of the rows
  made unstable (the resurrection-line case failed on a rebuilt element); name not trimmed (two
  creation cases failed); the redraw guard removed (the "needs no act" case failed).
- Check in a real browser (below): text typed in the field and its focus survived 37 seconds of
  clock readings in which a resurrection line changed and a loop moved on, and a creation by Enter.
  Result: held.

`ui_check.md` read. The states of the affected components that the styleguide requires are the
states of the shared controls, which this slice did not change; the states of the screen itself were
checked in code (cases above) and in the running game (below), and two screenshots of the running
product were inspected.

## Browser check (state check: components, states, method, evidence)

Method: `.claude/skills/loop2-play/SKILL.md`: `npm run local` (https://127.0.0.1:56128 at that start),
Playwright CLI, an account made through the login card (`agent@example.test`), a composed state sent
by the ordinary save request (`GET`/`PUT /api/saved-game`, answer `200 {"revision":1}`) from a copy of
`compose-state.mjs` that built three characters, a solved Las, an earning loop of Ala, a stopped loop
of Ola, a chest with `patyk` 7 and `mech` 2, Ela at generation 2 with a resurrection 59 min 30 s away,
and a report of two lines. Closed with `playwright-cli close` and `npm run local:stop` ("Local starts
stopped: 1"); `.playwright-cli/` deleted. The stale step 3 of the skill („Wyślij” at the character)
was not followed, since Siedziba no longer has it (named in "Searches" below).

| Component | State | Evidence |
|---|---|---|
| Heading, sections | new game, empty team | snapshot: heading „Siedziba”, „Drużyna”, „Drużyna nie ma jeszcze postaci.”, label „Nowa postać: Mag żywiołów”, field „Imię nowej postaci”, „Załóż”, „Skrzynka 0/60”, „Skrzynka jest pusta.”, no report |
| Creation | empty name, „Załóż” pressed | field in the error frame, „Wpisz imię postaci.” in `warning` under it, `aria-invalid=true`, focus on „Załóż”; screenshot read |
| Report | two lines | text read: title „Gdy cię nie było”, Ela's stopped line first, in red, then Ala's line, „Zamknij”; screenshot read |
| Team | Ala in a loop, Ola stopped, Ela generation 2 | rows: name as a link (`#/postac/n`), „pokolenie 2” for Ela only, archetype, resurrection line (Ela's in `danger`), „Pętla: Las · przejście 1 · minuta 0 · domknięte 0” with „Zatrzymaj”, „Pętla zatrzymana · wprawa: Jedzenie +4” |
| Chest | two items | „Skrzynka 9/60”, „patyk: 7”, „mech: 2” |
| Clock | 37 s of readings | the same field element, value „Ol”, focus kept; Ela's line, the same element, turned from „za 1 godz. 0 min” to „za 59 min”; Ala's loop line moved to „minuta 1” |
| Creation | Enter in the field | character „Ol” created, row added with link `#/postac/4`, field emptied, focus kept in the field |
| „Zamknij” | pressed | section hidden and empty, focus on the heading „Drużyna” (`h3`, `tabindex=-1`), the next Tab reached the link „Ala” |
| „Zatrzymaj” | pressed at Ala | row now reads „Pętla zatrzymana” |
| Name link | click, then browser Back | `#/postac/1` showed the screen Postać of Ala; Back returned to `#/`, Siedziba shown, focus on the screen's section, 4 rows |
| Console | the whole check | `playwright-cli console error`: 0 messages |

Not checked in the browser: a narrower window layout (the screen's area rules are unchanged), and
keyboard Enter on „Załóż” (a click on the button was checked, Enter in the field too).

## Reaches beyond the handoff (what, where, why)

- `.the-way/task-cycle/change/ui_check.md`: the method's section 3 asks for it when a screen changes.
- `tests/view/account-screen.test.mjs` (outside the slice's *Change*): two cases changed, see below.
- `src/browser/view/controls/react-text-field.tsx`, `react-button.tsx`, `src/browser/view/maps-screen.tsx`
  (boundary shape, `inputRef`, `error`, no `onKeyDown`), `src/browser/view/clock.ts` (what a reading
  does), `src/browser/sim/game.ts` (`characterName`), `src/browser/sim/loop.ts` (`startLoop`), the
  `react-dom` development build (where it reports an update outside act) and
  `.claude/skills/loop2-play/compose-state.mjs`: read, not changed; to build on the existing
  boundaries and to compose the state for the browser check.
- `tests/view/team-lines.test.mjs`, `tests/view/map-lines.test.mjs`: not opened.

## Searches not found or unclear

- The handoff and the plan say `tests/view/account-screen.test.mjs` "passes unchanged"; two cases
  cannot, see "Problems and mismatches". Unclear whether the orchestrator meant "its behaviour
  assertions stay".
- `.claude/skills/loop2-play/SKILL.md` still tells the player to click „Wyślij” at the character in
  Siedziba (step 3 of the way into a map run, and step 5 of "Compose a game state"); the plan's
  Choices give it to its own slice, so I left it.
- `guidelines/coding-browser-module.md` (slice 10's file) still has the row `headquarters.ts | do not
  copy`, no row for `headquarters.tsx` or `away-report.ts`'s new pure-only state, the example
  „Kontrolki w DOM i ich aktualizacja” describing `headquarters.ts` as the DOM example (now untrue; the
  file is gone) and `src/browser/view/headquarters.ts` in "Where in code". For slice 10.
- `src/browser/styles.css` comment of `.rehearsal-mark` still says „under „Wyślij””; the rule is the
  screen Mapy's now (not mine to change).
- `none` otherwise: every file, decision and invariant my slice named was found.

## Problems and mismatches (as observed)

1. **Plan said `tests/view/account-screen.test.mjs` holds unchanged; two cases do not.** Both
   asserted a detail of the DOM drawing, not a requirement, and both failed with the exact error
   shown:
   - `a character in a loop shows its line and „Zatrzymaj” …` (line 2615 before): it expected
     `["Zatrzymaj"]` as the buttons of every row, because the DOM screen kept a hidden „Zatrzymaj” in
     the row of a character in no loop. React draws no such button. Failure: `expected ["Zatrzymaj"],
     got []`. Change: the loop now expects `["Zatrzymaj"]` for Ala (in the loop) and `[]` for Ola;
     the requirement it states ("no list of programs and no button of sending in a row") is kept.
   - `a clock tick rewrites the resurrection line of the headquarters … writes a line only when it
     changed, and saves nothing` (line 3047 before): it counted writes to the `textContent` property
     of the line, which React never calls (it writes the text node's value), and its ticks ran
     outside act, which React reports for every update that changes the line. Failure: `expected 1,
     got 0`. Change: the ticks run in act and the writes are the changes of the line's text that a
     `MutationObserver` of the page's document records (0, 1, 0, 1 where the old counts were 0, 1, 1, 2
     cumulative), the element is the same, the text and `danger` are asserted as before. The
     requirement the case states (the line follows the moment, a line that did not change is not
     rewritten, a tick saves nothing) is kept and each of its three breaks still fails it.
   Cause verified: the first by the failing run and the code; the second by the failing run, a debug
   print (the text had changed, the observer's callback had taken the records) and the react-dom
   source (`setTextContent` writes `firstChild.nodeValue`). The case "creating a character" of the
   same file, which sets `input.value` and clicks inside one act, passes unchanged and is the reason
   for the uncontrolled field (below).
2. The ticks in other cases of that file run outside act while Siedziba stands: that is why `update`
   draws nothing when nothing it shows changed (below). No other case needed a change.

## Choices made (way rejected, cost if wrong)

- **The name field is uncontrolled: its text lives in the input, which the screen reads at „Załóż” and
  Enter.** Rejected: a controlled field with state, as `account-card.tsx` has it. The existing case
  "creating a character" of the page test sets `input.value` and clicks in one act with no input
  event, which a controlled field reads as an empty name; the slice requires that file unchanged.
  Cost if wrong: `CharacterCreation` becomes a controlled field and that one case gets a `typeInto`.
- **`update` draws nothing when the parts of the state the screen reads (`team`, `loops`,
  `stoppedLoops`, `awayReport`) and the resurrection lines are unchanged.** Rejected: drawing at
  every call. React reports each update outside act, and the page's cases tick the clock outside act
  while Siedziba stands; and a game minute of a manual map run would redraw the hidden screen. Cost
  if wrong: if a later change makes `team` or `loops` a new object at every minute, the guard stops
  saving anything and those cases report an update outside act; one test case (`an update that changes
  nothing the screen shows draws nothing, so it needs no act`) names that break.
- **Enter in the field is a `keydown` on the creation's container**, acting when the target is the
  field. Rejected: `onKeyDown` on the shared `ReactTextField` (a change of a shared control in both
  forms and of its comparison test, outside this slice's *Change*), or a form with a submit button
  (it would give „Załóż” the main look, which the styleguide leaves to a button that sends a form,
  and jsdom's plain click does not submit). Cost: one handler on a `div`.
- **The report's section stays in the page, hidden and with no children, while the report is
  empty.** Rejected: leaving it out. The page test reads `.away-report` of an empty report and its
  hidden state. A stale title is not kept (the old DOM kept it hidden).
- **`screen-area` is the class of the screen's own root `div.headquarters`, inside a host
  `div.headquarters-host`** (as `maps-screen-host` holds `.screen.maps-screen`); game-view no longer
  adds it. The tests read `.headquarters` and its sections as before.
- **`focus()` moves focus to the host element (tabindex -1), as `createCharacterScreen`'s does, and has
  no caller**: the page test requires focus to stand on `.headquarters-screen`, which game-view's
  `shownElement` still returns. Cost if the orchestrator wants it used: game-view would call it and
  that case would change.
- **The `Zatrzymaj` button and the loop and stop lines are drawn only where they hold** (React's
  conditional), not kept hidden as in the DOM screen.
- **The three controls are function-typed properties** (`create: (name) => void`), not methods, so
  `controls.stop` can be handed to a component without the `unbound-method` lint.
- `team-lines.ts` was read as slice 4 left it and is unchanged; `runWaitingSentence` and
  `programPositions` there are used by Mapy only.

## Concerns / for the orchestrator and later slices

- Slice 10: the rows and examples named under "Searches" above, and the stale „Wyślij” steps in the
  skill `loop2-play` for its own slice.
- `foundations/decisions.md` D-265's *Verification* example „a new section of the headquarters built
  in DOM” stands in the orchestrator's notes for the return step; nothing here changed it.
- Mutation tool: not applicable (browser-view); the mutations I tried by hand are listed under the
  own-work check.

## Questions

None.
