# Findings of the review of the whole change (blocking only, in the reviewer's words)

Source: `reports/review_whole.md`, first line `FAIL eeb145f26f6702dd8e9cd2370269d95aa6effc6a`. Only the blocking findings are given; the Minor and out-of-scope findings are not yours to fix.

## Blocking findings

### B1 (Important) — D-173 says that after „Zakończ” the program panel shows the copy's program; the merged game does not, and the Verification example the change wrote describes a panel that is not there

- **Place:** `foundations/decisions.md:3124` (binding sentence of D-173, kept: „after „Zakończ” the program panel
  shows the program the copy belongs to”) and `foundations/decisions.md:3130` (the *Verification* example this change
  rewrote: „„Zakończ” with unsaved changes returning to the screen Postać of that character at once, „Program” standing
  in the panel as it was saved”); the code: `src/browser/view/game-view.ts:335-342` („Zakończ” → `show({ kind:
  "character" … }, "go")`), `src/browser/view/game-view.ts:383-387` (`programShownOn`: `#/programy` shows
  `state.programs[0]`), `src/browser/view/program-panel.ts:126` (only the run panel's `nextShown` moves to the copy's
  program after the end, and that panel stands on Przejście, hidden from „Zakończ” on until the next send).
- **What is wrong:** what a player sees — after „Zakończ” of a map run whose copy came from „Program 2”, the game opens
  Postać, which has no program panel; the bar's „Programy” opens `#/programy`, which shows „Program” (the first of the
  list), not „Program 2”. The only panel that does move to the copy's program is the run panel of Przejście, which no
  screen shows after „Zakończ”. So D-173's binding clause is untrue of the merged game. The *Verification* example
  the foundation step rewrote (95a3fea) puts „Program” „in the panel” after a return to Postać, where no panel stands.
- **Why it matters:** WAY-263 — the change writes D-173 (its *Verification*) and its files fail to do what the entry
  requires. A later task (5 builds the editor of Programy) reads D-173 as binding and builds on a behaviour the game
  lost; the D-93 counts „after „Zakończ” beside the rules of the program the copy belongs to” are reachable only if
  the player picks that program by hand.
- **Evidence:** reading of the code above; `tests/view/program-panel.test.mjs:443` („„Zakończ” shows the copy's
  program with them”) tests the run-mode panel only; no case of `tests/view/account-screen.test.mjs` checks which
  program Programy shows after „Zakończ” (grep for `countsProgram`/„after „Zakończ”” in both files). The foundation
  step's report (`reports/foundation.md`, concern 2) and slice 10's report (`reports/slice10.md`, concern 2) both
  named this; neither the plan nor a later slice resolved it.
- **Slice:** spans the plan's *Foundation entries* (E38, commit 95a3fea — the Verification rewritten, the binding
  clause left), slice 8 (649e25d — „Zakończ” to Postać) and slice 10 (5e305f8 — Programy's panel shows the address's
  program); a gap of the plan, whose E38 asked for the *Verification* only.
- **Recommended fix:** make the code meet the binding clause — after „Zakończ”, `#/programy` (no number) shows
  `state.countsProgram` where it names a program still on the list, else the first — with a case in
  `tests/view/account-screen.test.mjs`, and reword D-173's *Verification* example to „… „Program” standing in the
  panel of Programy as it was saved”. The other way, rewording D-173's binding clause, changes an approved decision
  beyond what the task carries and is a question for the human.

### B2 (Important) — the program panel of the screen of a map run reads the map run from the game state, not from the screen's parameter (D-281, To do 6)

- **Place:** `src/browser/view/game-view.ts:239` and `:568` (`runPanel.update(state, …)` with the whole state, apart
  from `runScreen.update(state, state.run)` at `:528`); `src/browser/view/run-screen.ts:39-42` (`createRunScreen` takes
  the panel's element only) and `:74-76` (only the column's parts get `{ ...state, run }`);
  `src/browser/view/program-panel.ts:94`, `:121-144`, `:208` (the run panel reads `state.run` for the copy, its
  counts, „Kopia w przejściu” and the map of the editor).
- **What is wrong:** D-281, written by this change, says: „The screen of a map run takes its map run as a parameter
  and reads no map run of the game state by itself.” To do 6 says the same („Ekran dostaje przejście jako parametr i
  sam nie czyta przejścia ze stanu gry”). The program panel with the copy is half of that screen (D-166: „On the
  screen of a map run the program panel shows the copy”), and it draws `state.run`, not the run the address names and
  the screen was given. The header comment of `run-screen.ts` (lines 5–7, „it hands its parts a game state with that
  map run in place”) is untrue for that part.
- **Why it matters:** today a player sees no difference, since the game holds one manual map run and the address can
  name only that one. The decision exists for what comes next (D-281 and D-244 rationales: „a map run for each
  character and looking into an earning loop's map run become additions rather than rebuilds”): with a second run
  the column would show one run and the panel beside it the copy of another. WAY-263 grades a departure of the
  change's files from an entry the change writes as Important.
- **Evidence:** the lines above; no test passes the screen a run other than `state.run`, so nothing catches it.
- **Slice:** spans slice 8 (649e25d, which made `run-screen.ts` take the panel's element and feed the parameter only
  to the column) and slice 10 (5e305f8, which gave Przejście its own `runPanel` updated from the store with the whole
  state).
- **Recommended fix:** `createRunScreen` takes the panel itself (its `update`), and `update(state, run, events)`
  passes the same `{ ...state, run }` to the panel; the game view stops updating `runPanel` directly. A case that
  hands the screen a state whose `run` differs from the parameter and checks that the panel shows the parameter's
  copy.
