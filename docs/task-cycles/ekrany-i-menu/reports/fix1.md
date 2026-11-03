# Report — the fix of the review's blocking findings, task `ekrany-i-menu`

**Status:** done

Worktree `C:/Storage/repos/loop2-wt/ekrany-i-menu`, branch `task/ekrany-i-menu`, started from
`eeb145f26f6702dd8e9cd2370269d95aa6effc6a`; process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`
(gitlink and checkout agree). No uncommitted tracked change is left; nothing was pushed.

## Commits

| Commit | Finding | Files |
|---|---|---|
| `915b052` fix: :bug: let the screen of a map run feed its program panel the map run it was given | B2 | `src/browser/view/run-screen.ts` (+25/−13), `src/browser/view/game-view.ts` (+16/−9), `tests/view/account-screen.test.mjs` (+54/−0) |
| `b3ee736` fix: :bug: show on Programy without a number the program the copy belonged to after „Zakończ” | B1 | `src/browser/view/game-view.ts` (+9/−4), `foundations/decisions.md` (+1/−1), `tests/view/account-screen.test.mjs` (+122/−2) |

`git diff --stat eeb145f..HEAD`: 4 files changed, 223 insertions(+), 31 deletions(−).

## B1 — fixed

**What the player sees now.** After „Zakończ” of a map run whose copy came from „Program 2”, the bar's
„Programy” (`#/programy`, no number) opens the panel on „Program 2”, marked on the list, with the counts of
the map run beside its rules (D-93); `#/programy/1` still opens „Program”. Once „Program 2” is deleted —
during the map run (D-168) or on Programy after „Zakończ” — `#/programy` shows the first program.

**How.** `programShownOn` in `src/browser/view/game-view.ts` takes, for the screen `programs` (the
address with no number), `state.countsProgram` — the program the simulation keeps the counts beside from
`end` to the next send, cleared by `deleteProgram` — and the first program where it is null; the
`programById` guard for a number no longer on the list stays as it was for `#/programy/{n}`. The module
comment of the view names the rule. Nothing else changed: the list of Programy marks what `programShownOn`
gives, as before, so the list and the panel agree.

**D-173.** Through `the-way-record-decision` (read `.the-way/elements/decisions/skill/SKILL.md`,
`read.md`, `decide_entry.md`, `template.md`, `elements/common/rules.md`, `way_of_working.md`, the example
WAY-03). The binding sentences stay untouched; the *Verification* complies example now reads „… „Program”
standing in the panel of Programy as it was saved” (the reviewer's wording). Step 2's search: D-173 is
named by one *Relations* line (`foundations/decisions.md:3257`) and two rationales (`:3871`, `:3901`),
none of which the example's wording touches; no invariant derives from D-173. Step 4.4: nothing follows,
since the binding part did not change. Written on my recommendation (way_of_working 4.2): a corrected
example changes no meaning of the approved decision.

**Tests written first**, both in `tests/view/account-screen.test.mjs`, section „Programy”:

- „after „Zakończ” the bar's „Programy” shows the program the copy belonged to, and `#/programy/{n}` still
  shows program n” — a save of Ala's map run on the copy of „Program 2” (which holds „Zawsze → Eksploruj”),
  ended in a death, beside „Program 3”; „Zakończ”; `#/programy` marks „Program 2”, „Dodaj grupę” lands in
  program 2 (read from the save request); `#/programy/1` marks „Program” with no count.
- „after „Zakończ” `#/programy` shows the first program once the copy's program is deleted, during the map
  run or on Programy” — two pages: the program deleted in the saved state before „Zakończ”, and deleted
  with the list's „Usuń” on Programy after it; both show „Program”, not „Program 3”, with the address's
  entries unchanged.

The helper `ended()` took an optional starting state (default unchanged), and `endedOnSecondProgram`,
`programsShown` and `countsOnProgramy` were added beside the cases.

Failing run (before the code): `npm test -- tests/view/account-screen.test.mjs` → exit 1, 2 failed of 126:
`expected [["Program",false],["Program 2",true],["Program 3",false]], got [["Program",true],["Program 2",false],["Program 3",false]]`
and, in the second case's second page, `precondition: the copy's program is shown: expected ["Program 2",true], got ["Program 2",false]`
(its first page, the deletion during the run, passed before the code, as expected: there the fallback is
the first program either way). Passing run after the code: exit 0, 126 of 126.

**Breaks the cases catch.** `programShownOn` ignoring `countsProgram` (the bug) — case 1; a stale program
number kept after its deletion on Programy — case 2, second page; `#/programy/{n}` following
`countsProgram` instead of the address — case 1's last step. A mutation no test catches: dropping the
`programById` guard for the `programs` branch alone — the simulation never leaves a `countsProgram` that
is not on the list (`deleteProgram` clears it, `end` sets it only for a program found, the save's load
refuses an unlisted one), so no state reaches it; the guard is the same line that already guards the
`program` kind, kept rather than tested with a crafted state the product cannot produce.

## B2 — fixed

**What was wrong.** The program panel of Przejście was updated by the game view with the whole game
state, apart from the screen, so it drew the copy of `state.run` while the column drew the map run the
screen was given.

**How.** `createRunScreen` in `src/browser/view/run-screen.ts` takes
`Pick<ProgramPanel, "element" | "update">` instead of the panel's element, places `panel.element` first
as before, and its `update(state, run, events)` hands the panel the same `{ ...state, run }` the column's
parts get (the panel reads `events` for a map run started, so the signature carries them). In
`src/browser/view/game-view.ts` `store.apply` no longer calls `runPanel.update`; `renderScreens(events)`
updates Przejście, its panel included, while the state holds a map run, and the first drawing goes the
same way. Without a map run the panel keeps what it showed, hidden, until the next send: at that send the
panel's `nextShown` sees `mapRunStarted` and shows the copy, as before, and the panel-level behaviour of
„Zakończ” (`tests/view/program-panel.test.mjs:443`) is unchanged. The header comment of `run-screen.ts`
now says the panel is among the parts fed the given map run. The reviewer's recommended fix, taken as
recommended.

**Test written first** in `tests/view/account-screen.test.mjs`, section „the screens by address”: „the
screen of a map run gives its program panel the map run it was given, with the copy of that map run, not
the game state's” — builds the screen on jsdom with a real program panel (controls that are never
pressed, `unpressed`), gives it the state of Ala's paused map run on the copy of „Program” and the map
run of a send on the copy of „Program 2”, and reads „Kopia: Program 2” in the panel, the select on the
copy, and the status row of the given run. Two runs before the code: the first stopped on a `TypeError`
(the screen still took an element, so the panel never reached the page — not yet a failure); after the
signature alone was changed, the second failed at its assertion:
`the panel shows the copy of the map run the screen was given: expected "Kopia: Program 2", got ""`
(exit 1, 1 failed of 124). After the update was wired: exit 0, 124 of 124.

**Breaks the case catches.** The screen not updating the panel (the bug); the panel given `state`
instead of `shown`; the panel's element not placed on the screen. A deliberate decision it would also
catch: the panel placed after the column (the heading would still be read, so no — only the order
assertion of existing cases covers that).

## The real browser (B1's check, as the handoff asks)

Route as `.claude/skills/loop2-play/SKILL.md` gives: `npm run local` (address `https://127.0.0.1:56343`),
Playwright CLI 0.1.22, an account `agent-fix1@example.test` made through the login card, a character
„Ala”; ended with `playwright-cli close`, `npm run local:stop` („Local starts stopped: 1”) and the deletion
of `.playwright-cli/`. The two console errors on the login card are the expected mail failure of the local
start. What was read from the page:

1. Registration → `#/`, Siedziba. „Załóż” Ala. Bar's „Programy” → `#/programy`, list „Program” alone;
   „Nowy program” → `#/programy/2`.
2. Siedziba: Ala's row list „Program: Ala” offers „Program”, „Program 2”; picked „2”, „Wyślij” →
   `#/postac/1/przejscie`; the run panel reads `Kopia: Program 2`, select value `copy`, status
   „Minuta 19 · Czeka — żadna reguła nie pasuje · Passa 19/480”.
3. „Zakończ” → `#/postac/1`, the one shown screen `character-screen-host`, name „Ala”, the bar holds
   Siedziba and Programy only (no „Wróć do przejścia”).
4. Bar's „Programy” → `#/programy`; the list reads
   `[["Program","#/programy/1",null],["Program 2","#/programy/2","page"]]` — „Program 2” is the one shown;
   the sentence above the editor is hidden (no map run); the bar marks Programy; no counts, since
   „Program 2” holds no rule. Screenshot (deleted with `.playwright-cli/`): the list with the bar beside
   „Program 2”, the editor with the group „Program” under „Zawsze” and the trip plan.

**UI check** (`ui_check.md`): the change alters which program the panel shows, not any component's
states; the styleguide's rule „Menu bar, the menu „Konto” and the list of programs” (the chosen item in
`text-strong` with the bar in `selected`, the others in `text`) was read against the screenshot: the
marked position moved to „Program 2” and keeps that look. No component state changed, nothing new was
added to the kitchen-sink page.

## Checks (command → exit code)

After B2 (`915b052`): `npm run typecheck` → 0; `npm test -- tests/view/account-screen.test.mjs` → 0 (124/124);
`npx prettier --no-config --no-editorconfig --check src/browser/view/run-screen.ts src/browser/view/game-view.ts tests/view/account-screen.test.mjs` → 0.

After B1 (`b3ee736`), on the final code:

- `npm run typecheck` → 0
- `npm test -- tests/view/account-screen.test.mjs` → 0 (126 passed, 0 failed)
- `npm test -- tests/view/program-panel.test.mjs` → 0 (31 passed)
- `npm test -- tests/view/program-list.test.mjs` → 0 (10 passed)
- `npm test -- tests/invariants/test_saved_program_edit.py` → 0 (Ran 4 tests, OK)
- `npm test -- tests/invariants/test_copy_save.py` → 0 (Ran 5 tests, OK)
- `npm test -- tests/quality/test_quality_invariants.py` → 0 (Ran 5 tests, OK)
- `python -B .the-way/elements/common/foundation_check.py` → 0
- `npx prettier --no-config --no-editorconfig --check tests/view/account-screen.test.mjs src/browser/view/game-view.ts` → 0

The test file's formatting was once brought back with `prettier --write` on `tests/view/account-screen.test.mjs`
(the file I had just edited; nothing else). Not run: the full `npm test` (the cycle's run, as the handoff
and `make-change` section 3 give); the mutation tool (browser-view is not in its scope).

## Own-work check (section 3)

The requirement most at risk: D-93's „after „Zakończ” beside the rules of the program the copy belongs to”
— B1 makes Programy show that program, but the counts beside its rules are the programs panel's
`shownContent`, which I did not touch. The check: the first B1 case gives „Program 2” the rule
„Zawsze → Eksploruj” and reads the counts on Programy after „Zakończ”. First run: failed —
`one rule with its count: expected 1, got 2` — because the map run itself adds a rule to the program
during the run (the probe `probe_rules.mjs` in my scratchpad showed program 2 and the copy with two rules
after the death, counts `{"1":1,"2":0}`, and the same after the save's load and `end`). The assertion
was then written against the rules the program holds at the end, read from the saved state as a
precondition, with the first count (the explore rule) matched as ≥ 1; second run: passed (126/126). Both
runs are the `npm test -- tests/view/account-screen.test.mjs` entries above (exit 1, then exit 0). The
counts stand beside the program as D-93 asks.

## Reaches beyond the handoff

- `src/browser/sim/game.ts:160-215, 389-413` (`send`, `newGame`, `end`) and `src/browser/sim/programs.ts`
  (`editProgram`, `createProgram`, `checkProgram`, `withProgramContent`, `emptyProgram`) — to see when
  `countsProgram` is set and cleared, and why program 2 had two rules in the own-work check.
- `src/browser/view/screen-address.ts` whole — the `Screen` kinds `programs` and `program` that
  `programShownOn` branches on.
- `src/browser/view/program-list.tsx` (`onDelete`, `chosenId`) — what the list's „Usuń” deletes (the
  chosen program), for case 2 of B1.
- `src/browser/view/program-editor.ts:1040-1096` and the class `rule-count` — how counts are drawn, for
  the own-work check.
- `src/browser/view/status-row.ts:1-60` — the status text the B2 case matches.
- `tests/view/page-document.mjs` whole, `tests/sim/program-fixture.mjs` whole — `withPage`, `assert`,
  `programFromRules` for the new cases.
- `docs/task-cycles/ekrany-i-menu/reports/slice8.md:59-98` — the browser route Slice 8 used;
  `reports/foundation.md:88-96` — the foundation step's concern 2 on D-173; `plan.md` rows E38 and
  To do 6; `task.md` To do 5 and 6 — question 15's wording.
- `.the-way/task-cycle/change/ui_check.md`, `.the-way/elements/decisions/examples.md` and WAY-03 in
  `.the-way/foundations/decisions.md` — as the skills name them.
- `C:\Storage\The Brain\The Brain\.ai\rules\git.md` and `scripts.md` — before the commits and the probe.

## Choices made

- **B2: the run screen is updated only while the state holds a map run**, as before, so the run panel is
  not updated at „Zakończ” (it is hidden then) and keeps the ended state until the next send. Rejected:
  updating the panel with a state of no map run through another path of the screen — the screen takes a
  map run by its contract, and the panel's `nextShown` already shows the copy at the next send. Cost if
  wrong: a stale panel state behind a hidden screen; the click handlers guard on `state` and every render
  takes the fresh state, so nothing reads it.
- **B2: `Pick<ProgramPanel, "element" | "update">`** rather than the whole `ProgramPanel`: the screen
  never calls `showProgram`, and the case builds a real panel anyway.
- **B1: `countsProgram` read directly in the view** rather than through a new simulation helper: the
  field is the simulation's own memory of what D-93 asks, documented in `types.ts:388-394`, and one
  expression reads it. Cost if wrong: a later change of where the counts stand touches one function.
- **B1's cases on the page (jsdom), not on the panel**: the behaviour lies in the game view's choice of
  program for `#/programy`, which the panel-level tests cannot reach.
- The test helper `ended()` gained an optional parameter with its default unchanged; its other callers are
  untouched.

Not fixed on the way, as the handoff forbids: the README wording, the statuses in
`guidelines/coding-browser-module.md`, the comments of the boundaries, and the row of `run-screen.ts` in
the guideline's table.

## Searches not found or unclear

- The exact number of rules „Program 2” holds at the end of the own-work check's map run is not derivable
  from a document: the map run adds a rule to the program during the run (seen through the probe, not
  read in a decision). The case reads that number from the saved state as a precondition and asserts the
  count of the rule it set out with; where the task wants a literal, a fixture whose map run adds no rule
  would be needed.
- `the-way-record-decision` step 4 asks the human in one round; the handoff delegates every choice to the
  orchestrator and forbids questions to the human, and the change is an example's wording, so the entry
  was written on my recommendation without a question.
