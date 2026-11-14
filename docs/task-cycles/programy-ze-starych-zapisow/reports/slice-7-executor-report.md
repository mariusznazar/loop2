# Slice 7 — the pull on the screen Programy — executor report

**Status:** `done`

**Commit:** `72a395c729ed3c20f3f51373d11935a3fdb86d7e` (on top of `ea8de2c2`), one commit, message
`feat: :sparkles: add the pull of the previous save's programs to the screen Programy for an account with the privilege`.

## Files changed

Lines changed per file, from `git show --stat HEAD` (insertions and deletions together; the whole commit is
1343 insertions and 14 deletions):

| File | Lines changed |
|---|---|
| `src/browser/view/game-view.ts` | 163 |
| `src/browser/view/program-list.tsx` | 63 |
| `src/browser/view/app.ts` | 1 |
| `src/browser/view/previous-save-lines.ts` (new, not in the plan's *Change* list) | 85 |
| `tests/view/previous-save.test.mjs` (new) | 885 |
| `tests/view/program-list.test.mjs` | 160 |
| `src/browser/styles.css` | not changed: nothing needed (see choices) |

## Checks, each as command and exit code

Written first and seen to fail (the module `previous-save-lines.ts` was first created as an empty stub so
that the file reached its assertions):

- `npm test -- tests/view/previous-save.test.mjs` before the change: exit 1; 20 of 21 cases failed, each on its
  assertion ("a question is waiting for its answer", plural words, result line). The one case that passed is
  "an account without the flag … never asks", which the old code satisfies by not knowing the flag.
- `npm test -- tests/view/program-list.test.mjs` before the change: exit 1; 6 of 17 failed (the six new cases that
  need the control; the "pull away" case passes on the old code).

After the change, on the final tree:

- `npm test -- tests/view/previous-save.test.mjs` exit 0 (22 pass)
- `npm test -- tests/view/program-list.test.mjs` exit 0 (17 pass)
- `npm test -- tests/view/account-screen.test.mjs` exit 0 (131 pass)
- `npm test -- tests/view/end-question.test.mjs` exit 0 (17 pass)
- `npm test -- tests/view/react-controls.test.mjs` exit 0 (56 pass)
- `npm test -- tests/invariants/test_browser_view_token_values.py` exit 0 (4 pass)
- `npm run typecheck` exit 0
- `npm test -- tests/quality/test_quality_invariants.py` exit 0 (5 pass; the formatter invariant)
- `npm test -- tests/quality/test_source_tool_scope.py` exit 0 (4 pass)
- `npx prettier --check` on the six changed files: exit 0; `npx eslint` on them: exit 0

Not run, by the handoff: the gate (`npm test` without a file) and `foundation_check.py`.

### Breaking the behaviour on purpose (rule 2 of the handoff)

Each break was made in the worktree, `npm test -- tests/view/previous-save.test.mjs` was run, and the file was
restored by `cp` from a copy made before (game-view.ts checked by `sha256sum`: `2ddeb332…abbc` before and after;
app.ts restored from its copy, `git diff --stat` shows its one inserted line only).

| Break | Result |
|---|---|
| the privilege check removed from `askPrevious` | exit 1: "an account without the flag, or with it false, never asks…" |
| the stale-answer guard (`mine !== pullAsk`) removed from the check's answer | exit 1: "an answer of the check that comes after the player left the screen is ignored…" |
| the button shown while the question is open (`setPull` at rest instead of away) | exit 1: three cases ("the question is asked at each entering…", the late-answer case, the late-pull case) |
| the pull appended through `take` instead of `act` (no save) | exit 1: four cases (the pull and save case, the copies case, the over-limit case, the map-run case) |
| the stale-answer guard removed from the pull's answer | exit 1: "the answer of a pull that comes after the player left the screen appends nothing…" |
| `app.ts` no longer passes `previousSaveAllowed` | exit 1: "the page gives the game the account's flag…" |

Not broken on purpose: "the pull fetches again" (the case asserts a second question is open after the press and
that the second document, not the first, is what is appended, so a pull using the check's document would give
other names, but I did not run that break).

## Own-work check (section 3)

The requirement most likely not met: task point 3, "dostępny w dowolnej chwili; na koncie bez uprawnienia albo bez
poprzedniego zapisu przycisku nie ma", read with spec 6 "no request … is ever sent" for an account without the
privilege. The weak places were (a) the page not handing the account's flag to the game and (b) the button tied to
the absence of a map run. Checks: a page-level case that starts the real `startApp` with a client and gives the
account `previousSaveAllowed` true, false and missing (only true asks, once; the button stands only after the
document answer); the map-run case with a run going, paused and ended. Both pass; the first fails when the line in
`app.ts` is removed (break above).

## UI check (`ui_check.md`)

States of the affected control, by the styleguide (`States of shared controls`, the plain button; the line in
`text` with the bar of `.form-note`, a failure in `warning`):

- in code and in jsdom: away, rest (plain `button`, not destructive, enabled), waiting ("Wciąganie…", disabled,
  `aria-busy`), focus returned to the button after the wait, result line as `form-note` (`role=status`), failure as
  `form-warning` (`role=alert`), line standing where the control is away, text shown only as text.
- in a real browser (Playwright CLI, `npm run local`, a made-up account `pull-check@example.test`, a version 4
  save replaced by a version 5 save so the first stood as the previous save, the privilege granted with
  `account-previous-save grant`): I saw the button at rest on the screen Programy beside „Nowy program”,
  „Zmień nazwę” and „Usuń” (in a 1280 px window it wrapped to a second row of the narrow list column), the pull appending
  „Program (2)” and „Las nocą” (the program named „Program” of the document got „(2)” because the list held
  „Program”), the sentence „Wciągnięto 2 programy. Pominięto programy, których ta wersja gry nie przyjmuje: „Stary
  program”, „Obcy”.” standing under the buttons with a bar at its left, the focus on the button after the answer,
  `GET /api/saved-game` afterwards showing revision 3 with the three programs (the game saved at once), no console
  errors. With the request answered 500 by a route in the browser, the line „Nie udało się sprawdzić poprzedniego
  zapisu.” stood in orange (`warning`) and no button.
- not seen in a real browser: the waiting state (it lasts a moment), the 401 and 403 sentences, the „Nie ma już
  poprzedniego zapisu.” sentence, the result sentence while a manual map run waits or goes on, an account without
  the privilege, a narrower window than 1280 px.
- screenshots shown (public repository `mariusznazar/screenshots`, directory `loop2/programy-ze-starych-zapisow`,
  branch `loop2/programy-ze-starych-zapisow`, commit `797ffbfa254bed0494ba163711258caf16f0f081`; both show only the
  made-up account of this start):
  - `![The screen Programy with „Wciągnij programy z poprzedniego zapisu” at rest](https://github.com/mariusznazar/screenshots/blob/797ffbfa254bed0494ba163711258caf16f0f081/loop2/programy-ze-starych-zapisow/pull-rest.png?raw=true)`
  - `![The screen Programy after a pull, with the result sentence next to the button](https://github.com/mariusznazar/screenshots/blob/797ffbfa254bed0494ba163711258caf16f0f081/loop2/programy-ze-starych-zapisow/pull-result.png?raw=true)`
  - a third screenshot (the warning of a failed check) was looked at and is not shown.
- The browser was closed (`playwright-cli close`), the local start stopped (`npm run local:stop`, "Local starts
  stopped: 1"), `.playwright-cli/` and `.runs/screenshots/` deleted.

## Choices, with the way rejected and its cost if wrong

1. **A new pure module `src/browser/view/previous-save-lines.ts`** (the sentences, the Polish plural, the result
   line from the reader's answer), not in the plan's *Change* list. Rejected: the sentences inside the 1000-line
   `game-view.ts`. Cost if wrong: one more file; it is a pure module like `end-window-lines.ts`, covered by the
   browser-view part's pattern `src/browser/view/**`.
2. **State of the pull held in `game-view.ts`** as an immutable `PullView` (`away` / `rest` / `waiting` plus one
   line), given to the list through `props.pull`; `program-list.tsx` holds no memory of it besides a flag for the
   focus. A counter (`pullAsk`) numbers every question, every pull and every leaving of the screen, so a late answer
   is ignored by one rule. Rejected: separate flags per request. Cost if wrong: one counter serves three things;
   a leaving of the screen also drops a pull in flight (its programs are not appended).
3. **Only an entering of Programy asks.** A change from one program to another on the screen, and the first screen
   of a game built at `#/programy`, are handled (the first asks, the second does not). Rejected: asking at every
   `show`. Cost if wrong: a previous save that appears while the player moves between programs shows the button only
   at the next entering.
4. **A 401 at the question (not at the pull) is no `onSignedOut`**: the spec's text for the question says a failure
   shows one sentence, and names the 401 only for the pull. The saver meets the 401 at the next save and D-211 then
   applies. Rejected: routing it to `onSignedOut` too. Cost if wrong: an expired session shows „Nie udało się
   sprawdzić poprzedniego zapisu.” until the next save.
5. **A 403 at the question is the same sentence as any other failure of the question** (the spec's text), so a
   privilege taken away after the page was built shows the 403 sentence only when the pull is pressed. Rejected:
   a sentence of the lost privilege at the question too. Cost if wrong: the wording says "could not be checked"
   for an account that has lost the privilege.
6. **After a 403 the control goes away and the page's flag is not changed**, so the next entering asks again.
   Rejected: remembering the 403 in the page. Cost if wrong: one more request that gets 403 at each entering.
7. **Result line in `text` as the shared `ReactFormNote` (bar in the colour of the text), failure in `warning` as
   `ReactFormWarning`**; both stand in the existing `.program-actions` flex row, so no new rule in `styles.css` was
   needed. Rejected: a new class of its own. Cost if wrong: on a narrow list column the button and the sentence
   wrap as seen in the screenshot.
8. **Wording** (the maker's): button „Wciągnij programy z poprzedniego zapisu”, waiting „Wciąganie…”; „Wciągnięto
   N program/programy/programów.”; „Pominięto program, którego ta wersja gry nie przyjmuje: „A”.” / „Pominięto
   programy, których ta wersja gry nie przyjmuje: „A”, „B”.”, a skipped item with no name as „bez nazwy (pozycja
   N)”; „Poprzedni zapis nie zawiera programów, które ta wersja gry potrafi wczytać.”; „Nie ma już poprzedniego
   zapisu.”; „Nie udało się pobrać poprzedniego zapisu. Spróbuj ponownie.”; „To konto nie ma już uprawnienia do
   poprzedniego zapisu.”; „Nie udało się sprawdzić poprzedniego zapisu.” The skipped list is not shortened.
9. **A document of a readable version whose items are all skipped gives the skipped sentence alone**; a document
   with no accepted and no skipped item, and an unreadable one, give the "holds no program" sentence; the control
   stays in these cases (the spec says it goes away only for `null`).
10. **Focus returns to the button after the wait** by a layout effect keyed on `pull.control` and a ref flag set by
    the press (the styleguide's rule for a disabled button that loses focus). A press that the page ignores (halted
    game) would leave the flag set until the next change of the control; a rare, harmless case.

## Reach beyond the dispatch

- `src/browser/view/game-saver.ts` lines 1-220: to see how saves are driven, for the tests' client.
- `src/browser/view/controls/react-text-field.tsx` lines 85-130 (`ReactFormNote`, `ReactFormWarning`) and
  `src/browser/styles.css` lines 560-900: the existing sentence controls and the list's rules.
- `src/browser/view/screen-address.ts` (grep of the addresses), `tests/sim/previous-programs.test.mjs` lines 1-125
  (fixtures of documents), `tests/view/account-screen.test.mjs` lines 1-130 and 260-460 (the page-level test
  helpers), `scripts/local-start.mjs` (header), `src/server/account-previous-save.ts` (grep for the database
  variable), `package.json`, `tests/quality/test_quality_invariants.py` (grep for the Prettier patterns), the
  foundation's screenshot decisions by grep (D-357, D-358 lines only): why: the tests, the browser check and the
  formatter invariant.
- `.claude/skills/loop2-play/SKILL.md` whole: the route of the browser check the foundation settles.
- The two rule files a hook of this computer asked for (scripts and git rules) before a script and the first push.
- Pushed two screenshots to the public repository `mariusznazar/screenshots` as D-358 and the skill prescribe.

## Unread material

- `src/browser/sim/programs.ts`: read lines 385-599 (the naming functions, `createProgram`, `appendPrograms` and the
  rest up to `zeroCounts`), not the rest of the file.
- `tests/view/end-question.test.mjs`: read lines 1-315 of the named 1-150 range and further; not the rest.
- The task, spec and plan files were not opened; the passages copied into the handoff were read whole.
- `foundations/decisions.md`: D-164, D-165 (as part of the range), D-166, D-167, D-168 (read as it stood in the
  range), D-169, D-206, D-207, D-208, D-211, D-44, D-393, D-394, D-395 read whole; the handoff's first list gave
  D-207 as 4012-4075 and the current range is 4022-4085, and I used the current one.
- The other guideline files were read whole (the styleguide and the testing guidelines in pages).

## Searches not found or unclear

- none. (One note: the handoff names `foundations/decisions.md:4167-4202` for D-211 in the *Read* and 4186-4221 in
  the list of entries; I used the second, which is current.)

## Problems observed

- A first attempt at a mutation script was stopped by a hook of this computer (rules to read), it ran nothing; the
  mutations were redone one by one with the edit tool.
- In jsdom the game view holds images and bold text of its own, so a first form of the "names are text" case, which
  counted every `img` of the game, failed on the test and not on the code; the case now counts only inside the
  screen Programy.

## Questions

none.
