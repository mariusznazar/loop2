# Return step report — task `ekran-wiedzy`

**Status:** `done`. One commit, `42e15a5d` (`mariusznn@gmail.com`), on the head `b67568aa`: it changes one example in D-409. Everything else compared matched, so nothing else is written. No push, no full gate. m2 and n1 are left alone.

## The record's *Return step* items

- **Foundation compared with code:** at head `b67568aa`.
  - **D-416** against `knowledge-screen.tsx`, `knowledge-lines.ts`, `knowledge-entry.ts`, `counted-name.ts` and the tests: the heading and the two areas; the counter and the three groups with counts; discovery order, newest last; the campfire among the items; the icon and name of each thing from the data, the wolf's icon `wolf-head` in `creatures.ts`; no sentence for an empty area; the right area absent before the first known tree; folded rows with name and „{n} gałęzi”, opened by click (the row is a native `button`, so the keyboard is the browser's; the entry keeps that part in the agent-compared pair); branch name, „{n} stopni”, description and every price; folded at each entering (the entry is `while-shown`, tested through the game); the first counter counting actions, items and creatures; the declined forms. Matched; the *Verification* names only what a test holds and keeps a pair only for the keyboard and the layout.
  - **D-280, D-281, D-291, D-322, D-327** against `screen-address.ts`, `menu-bar.tsx`, `game-view.ts`, `scene-picture.ts`, `map-lines.ts`, `maps-screen.tsx` and `creatures.ts`: matched (four items after Programy with no icon; `#/wiedza` read, written, resolved and marked; the icon beside an action on Wiedza; the wolf's plaque at the first attack; „Czyha” with the creature's icon).
  - **D-408** against the code: the entry is one line of the table in `game-view.ts` (the table the registry is made from), with its import, its address in `screen-address.ts` and its place in `menu-bar.tsx`; it says „the table the registry is made from” and the *Verification* „the registry's table”; both are true as the code stands, so no correction. The styleguide and `guidelines/coding-browser-module.md` (the line „dopisuje jeden wiersz w tabeli rejestru w `game-view.ts`”) agree.
  - **Named without change:** D-27, D-282, D-277, D-325, D-328, D-148, D-195, D-199, D-200, D-119, D-283 and the invariants `icon-credits`, `icon-file-content`, `loop2-container-icons`, `content-identifiers`, `loop-run-knowledge`: each still true of the code (the credit and file of the wolf, the screen and the data holding no name of a map, a resource or an archetype; the screen changes nothing, so the Understanding and the pause are as they were).
  - **Part map:** `browser-view` claims `src/browser/view/**`, `assets/icons/**`, `tests/view/**`, `tests/invariants/test_icon_credits.py`; `simulation` claims the data. The new files lie under those globs and `foundation_check.py` reports 0 errors. No change.
  - **Glossary:** `Understanding` (the record of actions, items, conditions, creatures and branches, with „Zawsze” and „Eksploruj” from the start) matches the code's `Understanding` and the screen: the screen shows the actions, items and creatures of it and the known trees. No change needed.
  - **Search of the foundation for entries the change touches that no link joins to it** (word search for `Wiedza`, `icon`, `nowhere`, the item lists of the bar, „five screens”, the Understanding's visibility): one found that did not match. **D-409** (*Verification*, „complies”) said „a new act of the screen Wiedza written as an act of the store …”. The screen Wiedza now exists and, by D-416, has no act and changes nothing; an example about a new act of it would point a reader at a screen that must not have one. Corrected to „a new act of a screen written as an act of the store …” (the rest of the line unchanged). The binding sentences of D-409 and the test citations of it (`state-store.test.mjs`) are untouched. Found and left (not wrong): D-280 *Verification* „„Wróć do przejścia” … on Siedziba, Postać, Programy and Mapy” (the tests hold that list; the entry also stands on Wiedza, which belongs to the m2 family and to the request's list); D-277 *Verification* „Siedziba on Siedziba, Mapy on Mapy and Programy on Programy” (still true).
- **Decisions written or changed:** D-409 (one example, `42e15a5d`). Nothing else.
- **Invariants written or changed:** none.
- **Environment facts:** none new. `game-icons-wolf-head-title` was written in the change; the compared source (the page and its latest archived capture) is unchanged.
- **Glossary terms:** none. „Wiedza” and „Zrozumienie” are names of a screen and of an area, used as „Siedziba” and „Mapy” are, in no meaning of their own (`headquarters` has an entry because „headquarters” is an English word; these are not).
- **Part-map changes:** none.
- **Projected entries written whole or in part:** D-416, D-280 (the part the code makes true), D-281 (same) — written in the change; the return step finds them matching and writes nothing.
- **Rows of *Settlements to record* written:** row 1 → D-291 (the icon beside the action on Wiedza) and D-416 (the sentence that each thing stands with its icon, the wolf's icon in the data), the fact `game-icons-wolf-head-title` and *Rests on* of `icon-credits`; row 2 → D-322; row 3 → D-327. All written in the change; no row missed.

## The choices of the cycle, placed by the decisions template's questions

None becomes an entry; each stays a row of the questions table.
- What folds a tree open (the shared `ReactButton` with `expanded`, the state in the screen's component; rejected: native `<details>`, a new shared control): a rule for the look of the product, so question 2 sends it to the guidelines, where the change already wrote it (the styleguide rule „The screen Wiedza”: a tree is a plain shared button, `aria-expanded`, Enter and Space, folded at each entering). No entry.
- `countedName` as the game's one rule of declension in `counted-name.ts` (the fix moved it; `rule-list.tsx` keeps `ruleCountText`): a single rule that stands in the product's code with its comment and its test (`counted-name.test.mjs`), so question 3 sends it to the code. No entry. `ruleCountText` is not touched: changing it would be a change of code, not of the foundation.
- The table of screen entries stands in `game-view.ts`: where a line of code stands, question 3; D-408 already says „one line of the table the registry is made from” and is true as it stands. No entry.
- The two departures from the approved wording in D-416 (the *Rationale* sentence; the one more binding sentence, marked `the cycle's`): entered in the fix; not reworked.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` — 0 (0 errors, test citations on), before and after the edit.
- `python -B .the-way/instruction-files/check_instructions.py` — 0 (0 errors, 139 warnings).
- No test or code changed in this commit, so I ran no test file. Not run: the full gate.

## Unread material

- `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md` read whole in this session (`foundation_step.md` earlier in the task). `record_template.md`: read only its *Return step* section and the lines around it, not the whole file.
- Of the entries the handoff names I re-read, in this step, only those that a search found or that I compared against the code text: D-409 whole; D-408, D-416, D-280, D-281, D-291, D-322, D-327 as they stand (written by me, read at their edits); D-27, D-282, D-277, D-325, D-328, D-148, D-195, D-199, D-200, D-119, D-283 **not re-read whole in this step** — I compared them from the part of their text the task quotes and from what I read of them earlier; the invariants `icon-credits`, `icon-file-content`, `loop2-container-icons`, `content-identifiers`, `loop-run-knowledge` read earlier in the task, not again. The glossary read for `Understanding`, `headquarters` and the header lines only; the part map for its `browser-view` and `simulation` entries only.
- The search of the foundation was word searches (`grep`) over `foundations/`, `guidelines/` and `README.md`, not a reading of every entry; the entries a hit led to were read.

## Searches not found or unclear

1. The handoff names `record_template.md` in `task-cycle/skill/`; it stands in `task-cycle/` (`.the-way/task-cycle/record_template.md`). Found by a file search.
2. Whether a stale example of a decision that no task wrote (D-409's) is the return step's to correct: the skill says it corrects whatever no longer matches because of the change, and the change is what made the example point at a screen that has no act; I corrected it and report it. If the orchestrator holds it outside the task, the commit is one line to drop.

## Working copies

`.runs/return-step/` was made and removed (`rm -rf`) before returning; `ls .runs` shows `local-start`, `orchestrator`, `quality-venv`, `task-cycles`. No browser, no clone, no worktree.
