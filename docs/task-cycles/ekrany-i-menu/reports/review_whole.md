FAIL eeb145f26f6702dd8e9cd2370269d95aa6effc6a

# Review of the whole change — task `ekrany-i-menu`

- Range: `20d804b04ba564b578551c687cde78baadf78878..eeb145f26f6702dd8e9cd2370269d95aa6effc6a` (23 commits, 43 files,
  +5665 −1179), branch `task/ekrany-i-menu`, worktree `C:/Storage/repos/loop2-wt/ekrany-i-menu`.
  `git rev-parse HEAD` = `eeb145f26f6702dd8e9cd2370269d95aa6effc6a`, the head given. `.the-way` at
  `f45ca40724251a46965aed69f733d0a35c430048`, the commit the gitlink records.
- Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`, read whole. No subagent. The reviewed worktree,
  its index and its branch were not changed; every check that builds ran in a separate worktree of the head
  (`<scratchpad>/rev`, detached at `eeb145f`, `node_modules` joined by a junction).
- Counts: **2 blocking** (Important), **8 Minor**, **6 out of scope** (the lines of *Declined to judge*).

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

## Minor findings

1. **README sentence of the browser check.** `README.md:76`: „ekran Siedziba z stopką” (should read „ze stopką”);
   „strona prowadzi na ekran przebiegu mapy” names the screen by a word the game does not use (the bar says „Wróć do
   przejścia”, the task and D-280 say „ekran przejścia”/Przejście); „gdzie wiersz stanu z minutą … i panel terenu z
   listą kafelków” has no verb. A reader still understands it. Slices 11b (f9eff8c) and the repair (0aa9ce5).
2. **A citation the decision does not carry.** `guidelines/styleguide-browser-view.md:434-437`, the paragraph on the
   list of programs, closes with „(D-40, D-280)”; D-280 says nothing of the list of programs, and the look (bar in
   `selected` at the left, chosen in `text-strong`, others in `text`, `highlight` under the pointer) comes from the
   meanings of D-40 and the plan. Template (`.the-way/product-guidelines/template.md`, *Decision* names the decision
   that carries the rule's choice). Drop D-280 there, or name D-40 alone. Slice 1 (c0211e6).
3. **An emailed link pasted into the tab of a standing game is discarded.** `src/browser/view/game-view.ts:560-566`:
   a `hashchange` to `#confirm-email=…` or `#reset-password=…` reads as no screen, opens Siedziba and replaces the
   fragment with `#/`. Before the change the page did not listen, the fragment stayed, and a reload acted on it; now
   the token is gone, so neither the paste nor a reload confirms the address or opens „Ustaw nowe hasło” in that tab.
   Rare (a mail client opens a new tab), and it never lets a token act wrongly; but To do 2 says these fragments
   „działają jak dotąd”. The plan mandated resolving them to the nearest screen; slice 8 named the cost
   (`reports/slice8.md:81`). Fix: in the listener, leave a fragment that starts with either prefix alone (or reload
   the page for it). Slice 8 (649e25d). Reasoned from the code, not run in a browser.
4. **A click outside the open menu takes focus to „Konto” even when the click gave it elsewhere.**
   `src/browser/view/menu-bar.tsx:127-138`: the document's click listener closes the menu and focuses „Konto” after the
   target's own handler ran. A click into a text field is swallowed (the walk: `reports/walk.md:55-59`); a click on
   „Wyślij” sends and opens Przejście, which takes focus, and then focus jumps back to „Konto” in the bar. D-285
   mandates focus on „Konto” after a click outside, so this follows the decision; it is a small stumble for the
   player and worth Mariusz's look when he plays. Slice 4 (240d639).
5. **Rendered states without screenshot evidence (WAY-219).** The walk shows the bar's marked item, no item on
   Przejście, an item under the pointer (`12-siedziba-run-waiting.png`), focus on „Konto” (`33-konto-menu-w360.png`),
   the open menu, the list of programs, both sentences of D-287 and both widths. It shows none of: „Wyloguj” waiting as
   „Wylogowywanie…” and the sentence of an uncertain logout in the menu; the line of a failed save under the bar;
   keyboard focus on an item of the bar or of the list of programs; an item of the list under the pointer; „Wyślij
   ponownie” waiting in the real menu (the kitchen-sink page has its DOM sample); Postać with „Zatrzymaj” or the line
   of a stopped loop; „Gdy cię nie było”. The jsdom cases cover what each shows, not how it looks. Worth adding to the
   request where reachable (a delayed response, as the walk did for `/api/account`). Slice 12 (the walk).
6. **Statuses of the new rows not settled by the task, and two stale ones.** `guidelines/coding-browser-module.md:20`,
   `:38`, `:41`, `:44` (and `:21`, `:33` for the stale two): `copy` for `character-screen.tsx`, `menu-bar.tsx`, `program-list.tsx` and `screen-address.ts`
   is the slice author's choice (`reports/slice11.md`, choices 1 and 3); the coding template's *Writing the files*
   takes every status from the task's settlements or a decision, and To do 16 names none. And `email-status.ts` and
   `character-skills.ts` keep `do not copy` although this change took the last DOM code out of both (the rule *Nowy
   ekran i moduły w DOM* gives that status to files that build elements through the DOM APIs). Effect: a later agent
   reads a status nobody approved. Name the four statuses in the request for Mariusz to confirm. Slice 11 (eeb145f).
7. **Boundary comments say less than the code does.** `src/browser/view/character-screen.tsx:5-7`,
   `src/browser/view/menu-bar.tsx:10-12`, `src/browser/view/program-list.tsx:7-8`: „The page calls them from an event
   handler or the continuation of an answer”; `game-view.ts` calls `characterScreen.update` and `programList.update`
   from the store's `apply` and from the clock's reading every 200 ms. The rule that matters („never from render or an
   effect”) holds. Slices 4, 5, 6 (240d639, edb2862, 6dc4819); slice 11 named it.
8. **D-196 names one saved-program editor of two.** `foundations/decisions.md:3475`: „both the copy editor and the
   saved-program editor of Programy use the repertoire of the map run's character”. A saved program picked on the
   select list of Przejście is edited there too, with the same offer (`editorRepertoire` of the state); the entry is
   silent on it, where the old text („the saved-program editor”) covered every one. Drop „of Programy” or name both.
   Foundation entries (5020b76).

## Declined to judge

- The walk's „Wprawa w tym przejściu: Eksploracja +1” not showing in the tree after a death with the resurrection
  used (`reports/walk.md:181-184`) — simulation behaviour; the change touches the simulation's comments only.
- The walk's saved „Program” gaining „Zawsze → Eksploruj” at a discovery (`reports/walk.md:185-188`) — D-123's write
  into the program at a discovery, simulation code this change does not touch.
- The shortened *Rationale* and *Rejected* of D-96, D-157, D-208 and D-217 (foundation step, concern 1) — they are the
  approved projected text written word for word; restoring the dropped clauses is the human's decision.
- The rule row of the program editor breaking at 1000 px (`reports/walk.md:158-159`) — the old editor, which task 5
  replaces.
- `src/browser/view/run-screen.ts` as a new module built through the DOM APIs, beside D-265's rule on new screens —
  question 4 keeps Przejście in DOM until task 6, and the row reads `do not copy`.
- The open menu „Konto” covering the top right of the content (`reports/walk.md:50-53`) — no decision or rule places
  it otherwise; a look for Mariusz's play after the merge.

## Against the task

- *To do* 1–17: met by the commits, save B1 and B2 (To do 6's „sam nie czyta przejścia ze stanu gry” for the panel)
  and Minor 3 (To do 2, „działają jak dotąd”). To do 18: the walk is made (`reports/walk.md`, 38 screenshots); pasting
  the screenshots into the request is the cycle's later step.
- *Settlements to record*, rows 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 14: written as D-287, D-280 (rows 2, 3, 4, 6, 9),
  D-285 (rows 7, 8), D-286, D-196, D-284; each matches the code (checked by reading and by the mutations below).
- *Decisions in play*: „Zadanie zapisuje w całości” — D-283, D-96, D-97, D-157, D-199, D-200, D-208, D-212, D-217,
  D-244, glossary `headquarters`, all written and true of the code; „Zadanie urzeczywistnia część” — D-280, D-281
  (B2), D-282, D-44, D-53, D-166, D-245, D-246, D-03 unchanged; „Przykłady i zdania do poprawy” — D-196 (Minor 8),
  D-207, D-225, D-275 corrected. E36–E38 (D-62, D-132, D-173): D-173 is B1. E39 (`card`): no entry, reasoned in
  `reports/foundation.md`, accepted.
- Changed invariant tests: `tests/invariants/test_program_closed_lists.py` and
  `tests/invariants/test_program_world_reference.py` — comments and finding labels only („in the headquarters” →
  „outside a map run”), no assertion changed; both are slice 11a (d034bbf).
- Guidelines against the pinned templates (WAY-170): the styleguide's new rule „Menu bar, the menu „Konto” and the
  list of programs” has the four fields in order and follows the required rules; the coding file's two new examples
  stand under `## Examples` with no *Decision* field, and the five rows have the template's columns. Findings: Minor 2,
  Minor 6.
- Reserved choices: none taken; addresses are product code (D-270), no library added.
- Trust boundary: none in the part map. Crafted fragments at the router: `readScreenAddress`
  (`src/browser/view/screen-address.ts:18-53`) reads only exact, anchored patterns of a decimal whole number of 1 or
  more without a sign or a leading zero, safe-integer checked, never decoded; non-numeric, signed, leading-zero, very
  long, percent-encoded, upper-case and emailed-link fragments read as no screen (the 18 cases of
  `tests/view/screen-address.test.mjs`) and open Siedziba with the fragment replaced, no new entry
  (`tests/view/account-screen.test.mjs`, „an address that leads to no existing screen …”; the walk, lines 129-132).
  `email-confirmation.ts` only writes through `pushState`/`replaceState` and listens to `hashchange`. No path lets a
  crafted fragment throw or reach the server; Minor 3 is the one weak spot.
- The executors' own-work checks: each slice report names a requirement and a check; slice 10's named its one blind
  spot (the commit of uncommitted text on a back press), which the walk then tried in the browser
  (`reports/walk.md:85-94`). None of the own-work checks looked at D-173 or the panel's run (B1, B2).

## Checks run

| Command or method | Exit / result |
|---|---|
| `git rev-parse HEAD` | 0, `eeb145f26f6702dd8e9cd2370269d95aa6effc6a` |
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0, both `f45ca40724251a46965aed69f733d0a35c430048` |
| `git diff 20d804b..eeb145f`, `git log 20d804b..eeb145f` | 0 |
| `git worktree add --detach <scratchpad>/rev eeb145f`; `git submodule update --init -- .the-way` there | 0 |
| `npm run build` (in the separate worktree) | 0 |
| `node scripts/test-node-file.mjs tests/view/<file>.test.mjs` for `screen-address`, `menu-bar`, `character-screen`, `program-list`, `program-panel`, `headquarters`, `account-screen` (123 pass), `react-controls`, `email-status`, `character-skills`, `email-confirmation`, `clock` | 0 each |
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| `python -B scripts/test.py tests/invariants/<f>.py` for `test_browser_view_framework`, `test_browser_view_token_values`, `test_browser_view_focus_outline`, `test_application_build_kitchen_sink`, `test_content_identifiers` | 0 each |
| `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` | 0 |
| `npm run typecheck` | 0 |
| `cmp` of `.claude/…/setup_and_secrets.md` and `.agents/…/setup_and_secrets.md` | 0, identical |
| Mutations, one at a time in the separate worktree, build then the named file (`<scratchpad>/mutate.sh`): M1 no pause on leaving Przejście → `account-screen` 1; M2 an emailed link landing on the save's map run → `account-screen` 1; M3 the return entry's minute from `run.minute` alone → `screen-address` 0, `account-screen` 0 (equivalent: `death.minute` and `completion.minute` are set from `run.minute`, `src/browser/sim/run.ts:458`, `:634`, `:647`); M4 Escape/click outside leaving focus where it was → `menu-bar` 1; M5 no sentence beside an inactive „Wyślij” → `account-screen` 1; M6 „Kup” active beside a waiting run → `character-screen` 1; M7 no Postać update on a clock reading → `account-screen` 1; M8 the page's sentence kept after a change of screen → `account-screen` 1; M9 the menu closing on „Wyślij ponownie” → `menu-bar` 1; M10 Siedziba's resurrection line updated only with no map run (the old rule) → `account-screen` 1; M11 no sentence above the editor of Programy → `program-panel` 1; M13 a rebuild after a conflict keeping the sign-in entry → `account-screen` 1; M14 `go` written as `replace` → `account-screen` 1; M15 `browserAddress` hearing no `hashchange` → `account-screen` 1; M16 leaving Przejście without the pause call → `account-screen` 1; M17 (unmarked chosen program) did not apply, the pattern missed | as listed; every applied, non-equivalent mutation fails its test |
| Manual: screenshots opened with Read — `02-siedziba-team.png`, `03-konto-menu-open-click.png`, `11-przejscie-running.png`, `12-siedziba-run-waiting.png`, `14-programy-run-waiting.png`, `24-postac-run-dead-waiting.png`, `33-konto-menu-w360.png` | they show what `reports/walk.md` says of them; the gaps are Minor 5 |

Not run: `npm test` without an argument (the orchestrator's, as the handoff says); a real-browser run of my own — the
paste of an emailed link into a standing game's tab (Minor 3) is reasoned from the code and slice 8's report, not
seen.

## Reaches beyond the handoff

- `foundations/decisions.md`, whole entries: D-173 and D-93 (B1: what „Zakończ” leaves in the panel and beside which
  rules the counts stand); D-218, D-55, D-262, D-277, D-36, D-265, D-269, D-276, D-40, D-167, D-169, D-170, D-268
  (touched decisions the code and the styleguide rest on); D-280–D-287 and every hunk the change wrote, read in the
  diff.
- `foundations/invariants.md`, `browser-view-focus-outline` — whether the new links get the one focus rule.
- `src/browser/sim/game.ts:396-425` (`end`, `setPaused`), `src/browser/sim/understanding.ts:300-380` (`discover`,
  `withFirstChillRule`), `src/browser/sim/run.ts` (where `death` and `completion` take their minute), `src/browser/view/clock.ts:60-127`
  — to judge the walk's open points, the pause on leaving and mutation M3.
- `.the-way/product-guidelines/template.md`, `styleguide/template.md`, `coding/template.md` (whole or the sections on
  rows and writing) — WAY-170.
- The reports `slice1.md`–`slice11.md`, `slice11a.md`, `slice11b.md`, `repair1_findings.md`, `foundation.md` — their
  concerns sections, to see what each left open.
- Selection of the foundation: the decision log holds 185 decisions whose *Scope* names `browser-view`. I read whole
  the entries the change writes, the task's *Decisions in play* and the ones listed above, not all 185; an entry of
  that set I did not read could hold a requirement this review did not compare.

## Searches not found or unclear

- Not found: a case in any test that checks which program Programy shows after „Zakończ” (B1).
- Not found: a test that hands the screen of a map run a run other than `state.run` (B2).
- Unclear: whether D-285's „focus then returning to „Konto”” after a click outside was meant for a click that lands
  on a field or a button (Minor 4); the decision's examples speak of Escape only.
- Unclear: the walk's point 2 (practice +1 not entering the tree) — set aside as the simulation's, not checked.
- Not found: a settlement or decision for the statuses of the five new rows (Minor 6).
