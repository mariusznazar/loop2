# Slice 3 — report of the executor

**Status:** done

**Commit** (base `a874dbff`): `b607bfe5` — `docs: :memo: give the table of files of the browser module a row for every file of the view and the statuses of the audit`

**Files changed:** `guidelines/coding-browser-module.md` (+23 −11). `guidelines/coding-simulation-module.md` is **unchanged**: its table already holds one row for each of the 19 files of its kind with the statuses of the audit (`do not copy` at `loop.ts` and `skills.ts`, `copy` elsewhere, `game.ts` the exemplar), so there was nothing to write (the plan lists it under *Change*; see Mismatches).

## What the table of the browser module now holds

80 rows for the 80 files git tracks under `src/browser/view/` (`controls/` included), in the order of the path, the exemplar `account-card.tsx` (D-36) first, columns File, Status, Decision, `—` on every row but the exemplar's.

- `do not copy`: `game-view.ts`, `headquarters-entry.ts`, `programs-entry.ts`, `rule-list.tsx`.
- `do not copy` → `copy`: `app.ts`, `body-row.ts`, `combat-line.ts`, `email-confirmation.ts`, `game-saver.ts`, `program-editor.ts`, `status-row.ts`, `tile-list.ts`, `trip-editor.ts`, `trip-lines.ts`. `rule-list.tsx` goes `copy` → `do not copy`.
- New rows `copy`, the seven of the audit: `camp-picture.ts`, `camp.tsx`, `end-question.tsx`, `header-rows.tsx`, `page-sentences.tsx`, `previous-save-lines.ts`, `waiting-screen.tsx`.
- New rows `copy`, the five files added after the audit: `counted-name.ts`, `knowledge-entry.ts`, `knowledge-lines.ts`, `knowledge-screen.tsx` (part b) and `run-screen-reading.ts` (added by Slice 2, named in the orchestrator's notes).

## (a) The places that give `do not copy`, found again at the head `a874dbff` and confirmed

Each still breaks the rule the task names. Nothing changed that would make one of them stop; I report none as no longer breaking.

| File and line | What stands there | Rule it breaks |
|---|---|---|
| `src/browser/view/game-view.ts:179` | `const element = document.createElement("div");` with `element.className = "game-view"` at 180, the container that holds the screens | "Nowy ekran i moduły w DOM" (browser module): the page builds by the DOM API only the header and the main block, and the factory of a root only the host of that root; the container of the screens is none of them. Also "TypeScript i DOM", D-265. Question 6 of the task settles this status |
| `src/browser/view/headquarters-entry.ts:50-53` | `document.createElement("section")` with class `screen headquarters-screen`, `tabIndex = -1`, `section.append(headquarters.element)` | "Nowy ekran i moduły w DOM"; "TypeScript i DOM": „Żaden ekran nie powstaje przez API DOM” |
| `src/browser/view/programs-entry.ts:317-319` | `document.createElement("section")` with class `screen programs-screen`, `tabIndex = -1`; `section.append(list.element, panel.element)` at 370 | the same two rules |
| `src/browser/view/rule-list.tsx:220` and `:224` | `useState(() => document.createElement("div"))` and `place.appendChild(panelHost)` in `seatPanel` (the place of the rule panel, accepted in the reasoning of D-407) | the same two rules |
| `src/browser/sim/loop.ts:107-127` (`startLoop`) | `const refused: GameResult = { state, events: [] }` returned at 113, 122 and 127 for an unknown or unsolved map, a character not on the team or already running, and a program not on the list | "Hiding a failure" of `guidelines/coding.md` (D-252): „Awarii nie zamieniaj ani w odpowiedź „wszystko w porządku”, ani w pustą listę”; the pattern of `game.ts` in `send` (`game.ts:451-471`) throws an error for the same cases |
| `src/browser/sim/skills.ts:169`, `:181`, `:188` (`buyBranch`) | `return { state, events: [] }` for a map run in the state, an unknown branch or character, a tree not known, and a rank that is missing or unaffordable | the same rule; the doc comment names these cases „refused”, so the behaviour is documented, but it is the unchanged state with no event that the task names |

Lines at the head differ from the audit's by at most one or two lines (`game-view.ts:178` → 179, `rule-list.tsx:220-227` → 220-224, `skills.ts:176-181` → 169-188 as the three returns).

## (b) The files of the kind the audit did not see, read against every rule of the kind and of `guidelines/coding.md`

I read each whole and compared by hand, with no linter run.

- `counted-name.ts` — one pure function; no DOM, no Hook, no data name. `copy`.
- `knowledge-entry.ts` — the entry of the registry: builds the screen through `createKnowledgeScreen`, no DOM API of its own, no Hook. `copy`.
- `knowledge-lines.ts` — pure functions; names and icons come from the data catalogues (`ACTIONS`, `CAMPFIRE`, `CREATURES`, `ITEMS`, `RESOURCES`, `SKILLS`, `BRANCHES`) by identifiers the state gives, and no id or name of a map, resource or archetype is written in the file; the group headings and the counter forms are sentence text, not content names. `copy`.
- `knowledge-screen.tsx` — a function component in `.tsx`, React the only framework; one `document.createElement("div")` at 167, which is the host of its own root made by its factory, the case the rule allows; `useState` at the top of the component, no Effect, `createRoot` + `flushSync` as the exemplar; the `style` attribute sets the custom property `--icon` on an icon span, as `maps-screen.tsx`, `now-rows.tsx`, `rule-list.tsx`, `scene.tsx` (copy files) do — the rule against a `style` attribute concerns the look of a shared control of `controls/`, which this is not. `copy`.
- `run-screen-reading.ts` (Slice 2) — one Hook, `useRunScreenSnapshot`, called at the top level of components; `useCallback` with the list `[reading]`, `useSyncExternalStore`; no Effect, no DOM API. `copy`.

None of the five breaks a rule; the places I grepped for in all of `src/browser/view/` (`createElement`, `appendChild`, `innerHTML`, `eslint-disable`, `prettier-ignore`, `ts-ignore`, `noqa`) hold no silencing comment anywhere and the `createElement` calls stand where the audit judged them (hosts of roots, the header and `main` of `app.ts`, the four `do not copy` places).

## (c) Changes since the audit to the files of the first table

`git diff e125db89 7ba7a116 -- <file>` for `credit-lines.ts`, `credits.ts`, `game-view.ts`, `map-lines.ts`, `maps-screen.tsx`, `menu-bar.tsx`, `program-editor.ts`, `scene-picture.ts`, `screen-address.ts`, and `git diff 7ba7a116 HEAD -- src/browser/view/` (five files: `program-panel.tsx`, `run-entry.ts`, `run-screen-reading.ts`, `run-screen-state.ts`, `run-screen.tsx`). The task's status stays everywhere:

- `credit-lines.ts`, `credits.ts` — the creatures added to the list of icons and one credit keyed by the icon file `wolf-head` in a file that holds only such keys. `copy` stays.
- `game-view.ts` — one entry `createKnowledgeEntry({ store })` and a sentence; the container at 179 is the place already given. `do not copy` stays.
- `map-lines.ts`, `maps-screen.tsx` — the attacker's icon read from the data, drawn as an icon span with the `--icon` property like the other copy files. `copy` stays.
- `menu-bar.tsx`, `screen-address.ts` — one more item and one more screen kind, no DOM API. `copy` stays.
- `program-editor.ts` — `countedName` moved out into `counted-name.ts`, an import added; no DOM API. `copy` stays.
- `scene-picture.ts` — the creatures' plaques read from the data catalogue. `copy` stays.
- `program-panel.tsx` — `setQuestion` removed, `EndQuestionSlot` calls `useRunScreenSnapshot` at the top level of its own component, so the Hook runs whether the question stands or not; the `createElement("section")` at 705 is the host of the panel's root, as before. `copy` stays.
- `run-entry.ts`, `run-screen-state.ts` — no DOM API, no Hook, no failure hidden; `copy` stays.
- `run-screen.tsx` — the one change I weighed. Slice 2 added `useEffect(() => { if (covering) document.documentElement.scrollTop = 0; }, [covering])`. Against "Efekty": the dependency list names the one reactive value it reads (`covering`), and it is not a handler of the player's act (the window opens from the clock, by a death or a completion, as well as from a click) nor a transformation of data for drawing. It returns no cleanup function, but it subscribes to nothing: it assigns one position and leaves nothing to detach, so I read the rule's cleanup clause as not applying. I kept `copy`. This is a judgement, not a certainty: a reader who reads the clause for every Effect that touches the document would give `do not copy`; the orchestrator can overrule it, and the cost is one row.

## (d) The listing, run at the slice's head (output of `.runs/slice-3-executor/listing.py`, pasted)

```
browser-module files: 80 rows: 80
  files without a row: []
  rows without a file: []
  duplicate rows: []
  exemplars: [('src/browser/view/account-card.tsx', 'D-36')]
  do not copy: ['src/browser/view/game-view.ts', 'src/browser/view/headquarters-entry.ts', 'src/browser/view/programs-entry.ts', 'src/browser/view/rule-list.tsx']
  rows in path order (exemplar aside): True
  decision column dash outside exemplar: True
simulation-module files: 19 rows: 19
  files without a row: []
  rows without a file: []
  duplicate rows: []
  exemplars: [('src/browser/sim/game.ts', 'D-35')]
  do not copy: ['src/browser/sim/loop.ts', 'src/browser/sim/skills.ts']
  rows in path order (exemplar aside): True
  decision column dash outside exemplar: True
sim data files (content-data): 14
```

The sim listing takes the files at depth `src/browser/sim/<file>` other than `saved-game.ts`; the 14 files of `src/browser/sim/data/` are kind `content-data` and have no row, as the plan says.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 1 | exactly one error, the one the orchestrator named as present at the base and not mine: `tests/view/run-screen-state.test.mjs:309: the quotation does not begin a sentence of D-371`; my change adds none |
| `python -B .runs/slice-3-executor/listing.py` (the listing of (d)) | 0 | as pasted above |
| `./node_modules/.bin/prettier --check guidelines/coding-browser-module.md guidelines/coding-simulation-module.md` | 0 | formatted |

I did not run `npm test` (the cycle runs it) nor any linter.

## Own-work check

The requirement of the slice my work most likely fails: one row for every file and no row without a file, with the exact set of `do not copy`, and nothing else of the two files changed. Check: the listing of (d), which reads the table back from the file and compares it with `git ls-files` at the head, and `git diff HEAD~1 --stat` showing only the table's lines in one file (23 insertions, 11 deletions, all inside `## Files of this kind`). It showed 80 = 80 and 19 = 19 with no missing, extra or duplicate row, the four and the two `do not copy` as required, the exemplars first with `D-36` and `D-35`, the path order and `—` in the third column. The first run of my generating script read the files in the system's code page and garbled the Polish text; the `git diff` showed it at once, I restored both files with `git checkout`, fixed the script to read UTF-8, and the second run changed only the table (the first run is not committed and left no trace in the commit).

## Mismatches between the plan and the code

- The plan lists `guidelines/coding-simulation-module.md` under *Change*; its table was already as the task wants, so it is unchanged and not in the commit. Small.
- Slice 2's `run-screen-reading.ts` was not named by the plan; the orchestrator's note gave it a row, done.
- The plan's slice names the four Wiedza files as the whole of the files without a row beside the seven; the listing found exactly these and `run-screen-reading.ts`, no other.

## Reaches beyond the handoff

- `git diff` and `grep` over all of `src/browser/view/` for the DOM API and silencing comments, and `git ls-files` for the listing: to judge the rows the audit gave without my reading every file whole, and to make (d) exact. No file outside the handoff was read for meaning.
- `src/browser/sim/game.ts:451-471` (`grep -n throw`), to confirm the pattern the task names for the `send` of the exemplar.
- `src/browser/view/controls/react-button.tsx` (`grep expanded`), to see that `knowledge-screen.tsx` passes a prop the control has.

## Unread material

None of the handoff's named files or entries was left unread. Read in part, as the handoff's ranges give: `game-view.ts:150-210`, `headquarters-entry.ts:30-75`, `programs-entry.ts:300-340`, `rule-list.tsx:195-245`, `loop.ts:85-145`, `skills.ts:155-200`, `.the-way/product-guidelines/coding/template.md:240-285` and `kinds.md:1-30`. I did not open `.runs/task-cycles/porzadki-widoku-po-react/task.md`; its passages came word for word in the handoff. The files of the table that no part of the slice names (for example `app.ts`, `camp.tsx`, `waiting-screen.tsx`) I did not read whole; their statuses are the task's, with the DOM API grep of the whole directory as the only check.

## Searches not found or unclear

None.

## Working copies

`.runs/slice-3-executor/` held `make_tables.py` (generated the table), `listing.py` (the listing of (d)), `listing.out`, `fc.out` and `view-files.txt`. The output of the listing is pasted above; I removed the directory before returning.
