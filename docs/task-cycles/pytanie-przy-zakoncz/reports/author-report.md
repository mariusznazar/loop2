# Author report — Pytanie „Zapisać, odrzucić, wrócić?” przy „Zakończ”

Status: **done**

Branch `task/pytanie-przy-zakoncz`, base `06c69ad`. Commits (address `mariusznn@gmail.com`, checked):

- `c5befaf` feat: :sparkles: ask "Zapisać, odrzucić, wrócić?" at "Zakończ" when the copy holds unsaved changes
- `eb1f864` docs: :memo: record D-324 for the question of "Zakończ" while it stands, write the answers and place of the question into D-173 and "Odrzuć" into D-44 and the styleguide

Not pushed. Nothing outside the worktree and nothing in the vault was touched.

## Files changed (added / removed lines, `git diff --stat 06c69ad HEAD`)

| File | + / − |
|---|---|
| `src/browser/view/end-question.tsx` (new) | 60 / 0 |
| `src/browser/view/game-view.ts` | 103 / 8 |
| `src/browser/view/run-screen.tsx` | 51 / 12 |
| `src/browser/view/program-panel.tsx` | 9 / 3 |
| `src/browser/styles.css` | 35 / 0 |
| `tests/view/end-question.test.mjs` (new) | 836 / 0 |
| `tests/view/run-screen.test.mjs` | 33 / 0 |
| `tests/view/account-screen.test.mjs` | 2 / 0 |
| `foundations/decisions.md` | 25 / 10 |
| `guidelines/styleguide-browser-view.md` | 4 / 1 |

`src/browser/sim/` is untouched (answer of step 4: no change to `saved-game.ts`; no simulation function needed — the save and the end are two existing results composed in the view).

## What was built

- `end-question.tsx`: the band `EndQuestion`: sentence „Zapisać, odrzucić, wrócić?” (class `end-question-text`, colour `warning`), buttons „Zapisz”, „Odrzuć” (destructive kind of the shared button), „Wróć”, in that order; under the sentence the line of D-172 where the copy's program is on the list and holds changes the copy lacks. The line's text is the one function `copyLacksSentence` that `program-panel.tsx` now also uses for its own line.
- `run-screen.tsx`: the band stands in the program's area, after the band of a discovery and before the program panel; the screen got `setQuestion(open)` and `focusQuestion()`; it redraws from the state of its latest `update`.
- `game-view.ts`: the question is a variable of the view (`question: { resume } | null`), never in the game state or the save.
  - „Zakończ” with unsaved changes (`copyHasUnsavedChanges`): asks; a map run that goes on is paused through `setPaused` and `resume` is remembered; focus goes to „Zapisz”. Without unsaved changes it ends at once as before (`endRun(end)`).
  - „Zapisz”: `saveCopyIntoProgram`, or, when `programById` finds no program of the copy, `saveCopyAsNewProgram` with `suggestedProgramName` (first free name, no name field); then `end` of the saved state, as one result, one moment of saving; then Postać.
  - „Odrzuć”: `end` and Postać. „Wróć”: closes, resumes only when the question paused a map run that went on, focus back to the screen.
  - Closing: `store.apply` drops the question when the copy no longer holds unsaved changes (it does not come back); `togglePause` („Wznów” of the header and of the band) and `restart` close it first; `show` closes it when Przejście is left (before `pauseOnLeaving`, which then finds the map run already paused); a reload builds a view with no question.
  - D-323: `closeQuestion`, `saveAndEnd`, `discardAndEnd`, `back` and the asking in `end()` all return first when `halted`; „Zakończ” with unsaved changes after `halt()` therefore does nothing (before, it still navigated to Postać with the change ignored by the store).
- `styles.css`: `.end-question`, `.end-question-row`, `.end-question-text`, `.end-question-note`, only tokens (`--space-*`, `--bar-width`, `--warning`).

## Foundation entries (through `the-way-record-decision`)

Search of the foundation: the glossary holds no term this work needs a new entry for; no invariant derives from D-173 (its *Verification* held none); D-62, D-132, D-53, D-174, D-180, D-212 mention D-173 or „Zakończ” but their binding sentences stay true after the answer, so I changed none of them. D-212's *Rejected* still says the line „Niezapisane zmiany w kopii.” “warns before „Zakończ”” — true (the line still stands); not changed.

| Entry | Writes | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|
| D-173 (edited in place) | rows 1, 2, 3, 4, 8 | „Zakończ” with unsaved changes asks in a band above the program (under the band of a discovery), with „Zapisz”, „Odrzuć” (destructive), „Wróć” and the line of D-172; „Zapisz” saves into the program or, program deleted, as a new program under the first free name, „Odrzuć” ends with no save, „Wróć” closes; the end leads to Postać and Programy shows the copy's program. | „Zakończ” przy niezapisanych zmianach pyta w pasie nad programem (pod pasem odkrycia): „Zapisz”, „Odrzuć” (niszczący), „Wróć”, z linią z D-172; „Zapisz” zapisuje w programie albo, gdy go usunięto, jako nowy program pod pierwszą wolną nazwą, „Odrzuć” kończy bez zapisu, „Wróć” zamyka; po końcu Postać, a Programy pokazuje program kopii. |
| D-324 (new, next free number) | rows 5, 6, 7 | While the question stands the map run is paused as „Pauza”, „Wróć” restores the state before „Zakończ”; the rest of the screen works and the question goes when the copy holds no unsaved changes; „Wznów”/„Restart” close it as „Wróć”; leaving the screen closes it; it lives in the page memory only. | Póki pytanie stoi, przejście jest wstrzymane jak „Pauza”, „Wróć” przywraca stan sprzed „Zakończ”; reszta ekranu działa, pytanie znika, gdy kopia nie ma niezapisanych zmian; „Wznów” i „Restart” zamykają je jak „Wróć”; wyjście z ekranu je zamyka; żyje tylko w pamięci strony. |
| D-44 (edited in place) | the task's D-44 wording (question 5) | „Odrzuć” of the question is a destructive button; example of violation and *Rejected* line added. | „Odrzuć” pytania jest przyciskiem niszczącym; dopisany przykład naruszenia i odrzucona droga. |

Why D-324 and not all in D-173: rows 5–7 answer a second, independent question (what the map run and the screen do while the question stands); template: two questions, two entries. Choice named below. `Rejected` of each entry takes only the ways the rows' sources keep (question 2 B/C, 3 B/C, 4 A/C, 8 A for D-173; 6 B/C, 7 B/C for D-324; 5 B for D-44); *Rejected* of row 1 had no alternative in its source. `python -B .the-way/elements/common/foundation_check.py` — `0 errors` after each edit and at the end.

Styleguide (To do 8): `guidelines/styleguide-browser-view.md`, rule "States of shared controls", the list of destructive buttons now also holds „Odrzuć” pytania „Zapisać, odrzucić, wrócić?” (D-173, D-44); D-173 added to that rule's *Decision* line.

## Checks (command → exit code)

The handoff's `python -B scripts/test.py <file>` fails outside npm (`KeyError: 'npm_execpath'`, exit 1); I ran every focused check as `npm test -- <file>`, which runs the same script for one file and builds first. The full gate (`npm test` without argument) was **not run**, as the handoff says.

- `npm test -- tests/view/end-question.test.mjs` → 0 (16 cases)
- `npm test -- tests/view/run-screen.test.mjs` → 0 (8 cases)
- `npm test -- tests/view/account-screen.test.mjs` → 0 after the one change below; first run on the new code → 1 (one case failed: see below)
- `npm test --` on `tests/view/react-controls`, `program-panel`, `discovery-band`, `run-header`, `uncaught-failure` `.test.mjs` → 0 each
- `npm test --` on `tests/invariants/test_browser_view_token_values.py`, `test_browser_view_framework.py`, `test_browser_view_focus_outline.py`, `test_design_token_contrast.py`, `test_copy_save.py` → 0 each
- `npx tsc -p tsconfig.browser.json --noEmit` → 0; `npx eslint --max-warnings 0` on the changed source and test files → 0; `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser tests/view` → 0
- `python -B .the-way/elements/common/foundation_check.py` → 0 (`0 errors`)

### Tests written, and the break each catches

I wrote the code first and the tests after (the wiring is view code; the first failing test could not be named before the shape of the band existed); the tests were then seen to catch breaks by mutation (below), which stands in for a seen-failing run. Names of the breaks are in the comment above each case in `tests/view/end-question.test.mjs`; in short:

1. sentence, answers in order, only „Odrzuć” destructive, each answer wired to its own act;
2. the D-172 line only where the program is on the list and holds changes the copy lacks (text written out, not computed);
3. „Zakończ” with unsaved changes asks at every moment (going on, paused, paused at a discovery, after a death, after a completion), no new history entry, map run unchanged, a running one stopped (real time moved by hand: no game minute passes);
4. „Zakończ” without unsaved changes ends at once and opens Postać;
5. „Zapisz” into the program (and replacing what the program had since), Programy then shows that program;
6. „Zapisz” with the program deleted: new program, first free name (also skipping a taken name, case-insensitive), no name field, `lastUsedPrograms`, Programy;
7. „Odrzuć”: programs untouched, Postać;
8. „Wróć”: a running map run goes on (minute advances), a paused one stays paused, a stop at a discovery stays, the copy kept, focus back on the screen;
9. leaving the screen closes the question, the run stays paused on return, „Zakończ” asks again;
10. the kept document holds no trace of the question and a view built from it stands with no question, paused;
11. „Wznów” (header and band) and „Restart” close the question; pace buttons and a second „Zakończ” leave one question;
12. panel buttons work while it stands; after „Zapisz w programie”, „Porzuć zmiany”, „Zapisz jako nowy program”, „Przełącz postać na ten program” the question goes, the run stays paused, „Zakończ” ends at once;
13. an edit that leaves the copy different keeps the question, an edit back to equality (group renamed back) removes it;
14. the order in the program's area: band of a discovery, question, program panel (also after a completion in a discovery minute, where the band has no „Wznów”), and question first when no band;
15. after `halt()` the answers change nothing (kept document compared whole before and after) and „Zakończ” asks nothing;
16. the first answer takes focus.

Plus `tests/view/run-screen.test.mjs`: the question stands in the program's area under the band, not in the world or right area, only while told. `tests/view/account-screen.test.mjs`: the one case "after „Zakończ” `#/programy` shows the first program once the copy's program is deleted…" now answers the question with „Odrzuć” (the copy of a deleted program holds unsaved changes, D-168 / D-173); the other cases the task listed (lines 2396, 2629, 3518, 3810, 4271) needed no change — their copies hold no unsaved changes, so they still end at once.

Mutation check (own-work; done by hand on `game-view.ts`, restored after each, `git diff` verified): 12 mutants, each failing at least one case of `end-question.test.mjs`: question never asked; no pause on asking; „Wróć” never resumes; resume always; no reconcile on a copy without unsaved changes; question kept at leaving; „Zapisz” always into the program (breaks the deleted-program case); `togglePause` keeps the question; `restart` keeps it; answers act after `halt()`; „Odrzuć” that saves; asking after `halt()`.

### Own-work check of the method (section 3)

Requirement most likely not met: “pas pytania stoi … tuż nad nagłówkiem kopii „Kopia: {imię}”” (To do 1) together with “pytanie stoi w pasie nad programem, jak pas odkrycia”. In the panel the heading „Kopia: …” is not the first thing: the list „Program:” and „Nowy program” stand above it. Check: the case 14 above and, in the running game, the DOM order (`discovery-band > end-question > run-program-place`) — the band stands above the whole program panel, so the list „Program:” and „Nowy program” stand between the question and the heading. See the choice below. The browser showed it as intended by “nad programem, jak pas odkrycia”.

Second likely gap: a state change after `halt()`. Check: case 15 (compared kept documents) — passed.

### Check of the changed screen in a real browser (loop2-play, `npm run local`, Playwright CLI)

- Components and states: the question band (sentence in `warning` with a bar at the left, „Zapisz”, „Odrzuć” destructive, „Wróć”), the band of a discovery above it, the header „Zakończ”/„Wznów”, the panel of the copy with „Niezapisane zmiany w kopii.”.
- Method: account made through the login card at `example.test`; „Ala” sent to Las; copy made unsaved with „+ dodaj grupę”; at 1× (running) and at the first discovery (16×, game minute 84, paused with the band) „Zakończ” clicked; afterwards „Wróć”, reload, „Zapisz”, „Odrzuć”. Window 1280×720.
- Observed: running map run at „Minuta 10 … (pauza)” with the question and „Zapisz” focused (screenshot below); „Wróć” → minute 18, „Pauza” again, no question; after „Zakończ” and a reload: paused, no question, „Wznów”; „Zapisz” → `#/postac/1`, Programy shows „Program” with the two groups of the copy; at the discovery the DOM order of the program's area was `discovery-band > end-question > run-program-place`, scene in colour, status ending „(pauza)”; „Odrzuć” → `#/postac/1`, the bar's „Wróć do przejścia” gone. No line beginning `uncaught` in the console.
- Evidence: `.runs/task-cycles/pytanie-przy-zakoncz/reports/question-running.png`, `.runs/task-cycles/pytanie-przy-zakoncz/reports/question-under-discovery-band.png`, `.runs/task-cycles/pytanie-przy-zakoncz/reports/after-save-programy.png` (the last one taken on Programy after „Zapisz”; I did not open it).
- Not checked: the danger colour of „Odrzuć” under the pointer or at focus (it uses the same class and rule as „Zakończ”, which showed `danger` in the screenshots); windows narrower than 1280 px (the column was already narrow: at 1280 px the question wraps to three rows, sentence, two buttons, one button); the kitchen-sink page (the band is no shared control, so it has no place there).
- `.playwright-cli/` deleted, the local start stopped (`Local starts stopped: 1`).

## Choices of how to make what the task settles (each with the way rejected and its cost if wrong)

1. **State of the question lives in the view** (`game-view.ts`), not in the simulation. Rejected: a field in the game state — it would reach the save (`saved-game.ts`, a trust boundary; answer of step 4 forbids it) and survive a reload against row 6. Cost if wrong: a second place that knows the end of a map run; small.
2. **Remembering the pause**: `question.resume` is true only if the map run went on at the moment of asking; „Wróć” resumes only then. Rejected: always `setPaused(false)` on „Wróć” — would set a paused map run going (row 5). Cost if wrong: none seen.
3. **Placement above the whole program panel** (see own-work check). Rejected: inside the panel, just above `.copy-section` — it would put the band between the list/actions and the heading, and only the copy section and rules would move, whereas row 8 says nothing already standing moves except the program itself. Cost if wrong: a one-line move of `<EndQuestion>` into the panel; needs a prop path into the panel with its own React root.
4. **Save + end as one result** (`saveCopyIntoProgram`/`saveCopyAsNewProgram` then `end`, one `act`), not two acts. Rejected: two acts — two moments of saving and a redraw of the run screen with a saved copy between. Cost if wrong: none seen; `copy-save` invariant test passes.
5. **D-324 as a second entry** instead of crowding rows 5–7 into D-173's three binding sentences. Rejected: all eight rows in D-173 — an unreadable entry answering two questions. Cost if wrong: a reviewer may prefer one entry; merging them is an edit of two entries and of D-324's relations.
6. **Focus**: on opening, the first answer „Zapisz” takes focus (the safe answer); at „Wróć” focus goes to the run screen through the existing `focusShownScreen`. Rejected: leaving focus on „Zakończ” — the keyboard would pass the world area first. Cost if wrong: a keyboard player lands on „Zapisz” after clicking „Zakończ”; Enter saves, which loses nothing.
7. **After `halt()` „Zakończ” with unsaved changes does nothing** (including no navigation). Rejected: asking and showing answers that do nothing. Cost: a halted game no longer opens Postać from that button when the copy holds unsaved changes; D-323 says the buttons change nothing, so this follows it.
8. **Look**: the sentence has a bar at the left in its own colour, like the band of a discovery (D-279), spacing from existing tokens. No new value in the token file.
9. **`copyLacksSentence`** exported from `program-panel.tsx` so the band and the panel carry one sentence; the band imports a `.tsx` module (React view to React view, allowed).

## Reaches beyond the handoff (what, where, why)

- `guidelines/styleguide-browser-view.md` rule "States of shared controls": read whole as the handoff said; edited as To do 8 asks (the handoff made that line mine).
- `.the-way/elements/decisions/skill/*.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/common/{way_of_working,rules}.md`, `.the-way/foundations/decisions.md` (entry WAY-03): read for `the-way-record-decision`, as that skill names them.
- `.the-way/task-cycle/change/ui_check.md`: read as the method says for a change of what a screen shows.
- `.claude/skills/loop2-play/SKILL.md`: named in the handoff for the browser check.
- `foundations/part_map.md` (parts file lists), `foundations/invariants.md` `copy-save`: named in the handoff.
- `scripts/test.py`: to see why the handoff's command failed.
- `foundations/decisions.md` search for „Zakończ”, `D-173` and `Niezapisane zmiany w kopii.` (all entries mentioning them), to find sentences of other decisions that answered the question in passing (none moved).
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` and `git.md` (the user's global rules for scripts and commits).

## Searches not found or unclear

- Handoff command `python -B scripts/test.py <file>` does not run outside npm (`npm_execpath` unset); `npm test -- <file>` does the same.
- “Tuż nad nagłówkiem kopii” (To do 1, row 8) against “w pasie nad programem”: the heading is not the first element of the panel (list and „Nowy program” come first). Read as “above the program panel”; see choice 3. Unclear which was meant literally.
- The task's list of tests to update (lines 2396, 2629, 3518, 3810, 4271, 4313): only the 4313 case needed a change; the others stand on copies with no unsaved changes. Not a defect, a mismatch with the list.
- `guidelines/coding-browser-module.md`, table "Files of this kind": no row for `end-question.tsx`. The guideline says a file added after the last audit has none and is no exemplar; I did not edit that guideline (not asked). `foundation_check.py` reports no error for it.
- No invariant guards D-173 or D-324 (`Verification` is an agent comparison); I added none (the task gives no invariant).
- No spec and no plan existed (as the handoff says).
- Glossary: no term of this work lacks an entry or is used in another meaning than its entry gives.

## Problems as observed

- First `account-screen.test.mjs` run on the new code: 1 failure, the deleted-program case (cause verified: `copyHasUnsavedChanges` is true for a copy whose program is gone, so „Zakończ” asked; the test pressed „Zakończ” and then waited for a save that had not happened). Fixed in the test by answering „Odrzuć”; re-run exit 0.
- Early runs of the new test file failed on React's “not wrapped in act” report: cause verified — `view.keep()` and `view.dispose()` were called outside act while the character screen existed (`keep` makes a clock reading, which updates the screen). Fixed by wrapping both in `inAct`; re-run exit 0. No code change.
- At 1280 px the question wraps into three rows in the narrow program column (screenshot); readable, not judged against a design (the task gives none).
