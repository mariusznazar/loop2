# Plan — loop2: panel reguły na liście i dwie kolumny ekranu przejścia, żeby program był szeroki jak w oryginalnym Loop

- Task: `docs/task-cycles/proporcje-sceny-i-programu/task.md`
- Spec: none
- Base: 01b26d54d1fea63de8570ca854814ff8e564048c

## Foundation entries

The entries are written by the cycle's foundation step before slice 1, through the project skills of
the foundation, so no slice writes one. A slice that depends on an entry reads it by its row here;
an entry of the log that the rows change is read by its identifier and its range at the base, and the
agent reads its text as the foundation step left it. The plan names the entries and words none.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Row 1 — the panel of a rule or a rule group opens in place, under the row of the rule or the header of the group it changes, on the screen of a map run and on Programy | decision | Settlements to record, row 1 (questions 1 and 3) | Slices 1, 2, 4, 5, 6 |
| Row 2 — the screen of a map run has two columns under its header: on the left the world with, under the drawing of the map and the line of a tile, the area with the tabs „Kronika” and „Teren”; on the right the program | decision | Settlements to record, row 2 (questions 1, 2 and 6) | Slices 4, 5, 6 |
| Row 3 — the scene has one size, 672 × 304, twice its picture | decision | Settlements to record, row 3 (question 1, To do 4) | Slices 3, 6 |
| D-311 (changed: three areas become two columns, the place of the tabs, the rule opened from its row) | decision | Decisions in play; rows 1 and 2 | Slices 4, 6 |
| D-288 (changed: the rule panel stands under the rows, not beside them) | decision | Decisions in play; row 1 | Slices 1, 2, 5, 6 |
| D-282 (changed: the examples of areas of the screen of a map run and of Programy) | decision | Decisions in play; rows 1 and 2 | Slices 1, 2, 4, 6 |
| D-19 (changed: the list of revealed tiles no longer stands in the area the editing takes) | decision | Decisions in play; row 2 | Slice 4 |
| D-338 (changed: the chronicle's filters are no longer in a right area) | decision | Decisions in play; row 2 | none of the slices; wording only |
| D-343 (changed: the title and body speak of a right area) | decision | Decisions in play; row 2 | Slices 4, 6 |
| D-345 (changed: the rationale speaks of a right area) | decision | Decisions in play; row 2 | none of the slices; wording only |
| D-346 (changed: the tab picked is kept in the area under the world; a closed panel gives nothing back) | decision | Decisions in play; rows 1 and 2 | Slice 4 |
| D-334 (changed only where its *Rejected* names a right area; the place of the end of the map run stays open for task 16) | decision | Decisions in play; row 2; Out of scope | none of the slices; wording only |

D-280 is read and stays as it is. D-336 and D-43 bear on the change (the scroll of „Teraz” and „Potem”
into the program, the layout dimensions the stylesheet may write in `px`) and need no change. No
invariant, glossary entry, environment fact or part-map entry is written: the change adds no file and
no term.

## Slices

### Slice 1 — The rule list draws the rule panel under the row or header it changes

- **Goal:** Where the program panel is given no host for its rule panel, an open rule's panel stands
  in the rule list itself: directly under the row of the rule it changes, or directly under the
  header of the rule group it changes; when the open rule sits in a folded group, whose row is not
  drawn, the panel stands under that group's header. The list takes the panel as an optional prop it
  draws, so a click, a key or a drag inside the panel reaches no handler of the row (the panel is not
  inside the row's own list item). The layout that put the panel beside the rows
  (`program-editor-layout.with-panel`, `program-rule-panel`) and its styles go; the new place is
  styled with tokens only. What stays as it is: the panel takes the focus when it opens, „✕” and
  Escape close it and give the focus back to the row or header, opening another rule moves the panel
  to that rule, and the hosted path (`placeRulePanel`) works as before, because slices 2 and 4 still
  use it. Tests first, failing before the change: in `tests/view/rule-editor.test.mjs` a list given
  a panel draws it right after the open row, right after the open header, and after the header of a
  folded group holding the open rule, and never inside the row's item; in
  `tests/view/program-panel.test.mjs` the case that expects the panel beside the rows (both modes)
  expects it under the row or header instead.
- **Change:** `src/browser/view/rule-list.tsx` · `src/browser/view/program-panel.tsx` · `src/browser/styles.css` · `tests/view/rule-editor.test.mjs` · `tests/view/program-panel.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:44-51` Pytanie 1
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:58-62` Pytanie 3
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-122` Settlements to record
  · `foundations/decisions.md:6159-6194` D-288 · `foundations/decisions.md:6538-6565` D-306 · `foundations/decisions.md:6360-6378` D-296 · `foundations/decisions.md:6343-6359` D-295 · `foundations/decisions.md:6021-6046` D-282 · `foundations/decisions.md:6696-6750` D-311 · `foundations/decisions.md:912-926` D-43 · `foundations/decisions.md:7310-7344` D-336
  · Foundation entry Row 1
  · `foundations/part_map.md:3-28` browser-view
  · `foundations/glossary.md:53-57` program rule · `foundations/glossary.md:59-63` rule group
  · `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:459-468` browser-view-token-values · `foundations/invariants.md:469-478` browser-view-focus-outline
  · `src/browser/view/rule-panel.tsx` · `tests/view/page-document.mjs`
- **Model:** same — focus, keyboard and drag behaviour inside a 700-line shared list and an 850-line panel, with tests in two large files; the design is settled here, but the edge cases (folded group, opening another rule) need judgment a cheaper class tends to miss.
- **Risk:** none
- **Checks:** `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/rule-signs.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm run typecheck` · `npx eslint --max-warnings 0 src/browser/view/rule-list.tsx src/browser/view/program-panel.tsx` · `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/rule-list.tsx src/browser/view/program-panel.tsx src/browser/styles.css tests/view/rule-editor.test.mjs tests/view/program-panel.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py`; no check in a browser here: both screens still give the panel a host, so the player sees the new place only after slices 2 and 4, which carry that check
- **Depends on:** Foundation entry Row 1

### Slice 2 — Programy keeps two columns and opens the panel in the editor

- **Goal:** On Programy an open rule or group no longer adds a third area: the screen holds the list
  of programs and the program panel, and the panel's rule panel stands under its row or header, by
  the path slice 1 made. `game-view.ts` no longer builds the area for the rule panel or gives the
  program panel of Programy a host, the toggling of the screen's class for an open panel goes, and
  the stylesheet's rules for three areas, for the window under 1100 px that set the panel under the
  editor, and for the empty area of the panel go with the code that needed them; the comments of the
  stylesheet and of `game-view.ts` that describe three areas are rewritten. Test first, failing
  before the change: the case of `tests/view/account-screen.test.mjs` that expects the list, the
  editor and the panel as three areas (the case that opens a rule on Programy and looks for the area
  of the panel, near line 4285) expects two areas while a rule is open, no area for the panel, and
  the panel inside the program panel directly under the header or row opened; leave the other cases
  of the file, among them the one that cites the invariant `saved-program-edit`, as they are.
- **Change:** `src/browser/view/game-view.ts` · `src/browser/styles.css` · `tests/view/account-screen.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:58-62` Pytanie 3
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-122` Settlements to record
  · `foundations/decisions.md:6159-6194` D-288 · `foundations/decisions.md:6021-6046` D-282 · `foundations/decisions.md:912-926` D-43 · `foundations/decisions.md:6538-6565` D-306 · `foundations/decisions.md:6343-6359` D-295
  · Foundation entry Row 1
  · `foundations/part_map.md:3-28` browser-view
  · `foundations/invariants.md:459-468` browser-view-token-values · `foundations/invariants.md:469-478` browser-view-focus-outline · `foundations/invariants.md:839-848` saved-program-edit
  · `src/browser/view/program-panel.tsx` · `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` · `npm run typecheck` · `npx eslint --max-warnings 0 src/browser/view/game-view.ts` · `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/game-view.ts src/browser/styles.css tests/view/account-screen.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py`; manual state check by `loop2-play`: on `#/programy` in a window 1280 px wide open a rule and a group header and see the panel under the row or header with the list of programs and the editor still the only two columns, then fold the group holding the open rule
- **Depends on:** Slice 1 · Foundation entry Row 1

### Slice 3 — The scene has one size

- **Goal:** The scene is drawn at one size, 672 × 304, twice its picture of 336 × 152. In
  `src/browser/view/world-area.tsx` the switch of scale (`SCENE_SCALE`, `sceneSize(scale)`, the
  wording about the human's choice) is replaced by that one size, kept as constants; in
  `src/browser/view/run-screen.tsx` the `data-scene-scale` attribute on the grid of areas goes; in
  `src/browser/styles.css` every rule keyed by a scale becomes a plain rule with the values of the
  scale 2 (the three-column grid from 1276 px, the side of the icon in the badge over the mage, the
  doubled thickness of the badge's bar) and the rules of the scale 1 go, with the comments that
  explain two scales rewritten for one. The picture's own size, 336 × 152 in the scene data file and
  in the scene's picture, stays: it is the size of the file, not a way to show it. Test first,
  failing before the change: the case of `tests/view/world-area.test.mjs` that checks the scene's
  size against the scale (near line 414) checks the one size on the background image and no longer
  imports a scale or a function of scale.
- **Change:** `src/browser/view/world-area.tsx` · `src/browser/view/run-screen.tsx` · `src/browser/styles.css` · `tests/view/world-area.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:44-51` Pytanie 1
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:79-82` Context
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-122` Settlements to record
  · `foundations/decisions.md:912-926` D-43 · `foundations/decisions.md:5935-5984` D-280 · `foundations/decisions.md:6696-6750` D-311
  · Foundation entry Row 3
  · `foundations/part_map.md:3-28` browser-view
  · `foundations/invariants.md:459-468` browser-view-token-values
  · `src/browser/view/scene.tsx:1-60` the scene's header and its props
  · `tests/view/page-document.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` · `npm run typecheck` · `npx eslint --max-warnings 0 src/browser/view/world-area.tsx src/browser/view/run-screen.tsx` · `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/world-area.tsx src/browser/view/run-screen.tsx src/browser/styles.css tests/view/world-area.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py`; `git grep -n -i "scene-scale\|SCENE_SCALE\|sceneSize" -- src tests` prints nothing except the one-size constants the slice names; manual state check by `loop2-play`: the scene on a map run looks as before, with the badge over the mage at the same size
- **Depends on:** Slice 2 · Foundation entry Row 3

### Slice 4 — The screen of a map run in two columns, the tabs under the map, the panel in the program

- **Goal:** Under its header the screen of a map run has two columns from a window width the slice
  computes from its columns (the world's 706 px, the 16 px gap, a program of at least 320 px and
  the page's padding; about 1074 px): on the left the world and, under it, below the drawing of the
  map and the line of a tile, the area with the tabs „Kronika” and „Teren”; on the right the program,
  as tall as the two areas together, taking the rest of the width (526 px in a window 1280 px wide).
  In a narrower window the three areas stand one under the other in the order world, program, tabs
  area. The areas stay three sections of their own in the DOM in that order (D-282); the stylesheet
  places the tabs area under the world by named grid areas, not by moving it in the DOM or by
  nesting it in the world's section. The screen no longer gives its program panel a host:
  `createRunScreen` does not call `placeRulePanel` and the screen's `RunScreenPanel` type no longer names it, the store of "rule panel open" with its
  `useSyncExternalStore`, the host element and the element that held it are gone, the tabs area is
  drawn whenever the screen has a state, whether a rule is open or not, and the rule panel of the
  copy opens under its row in the program panel by the path slice 1 made. The tab picked and the
  filter are the chronicle memory's as before (D-346) and an open rule changes neither. The old
  column of the right area (336 px, its class, the horizontal scroll for the table of revealed
  tiles) is replaced by the same scroll on the new area; the comments of the stylesheet that explain
  three columns are rewritten. The doc comments of `run-screen.tsx` and `right-area.tsx` and the
  names of the cases in the two test files speak of the area under the drawing, not of a right area;
  the module and component keep their names (see *Choices*). Tests first, failing before the change:
  in `tests/view/run-screen.test.mjs` the case of the three areas expects the tabs area third in the
  DOM with the tabs and the chronicle, the case of the open panel expects it inside the program
  panel under its row, the tabs standing beside it, and „✕” changing neither the tab nor the
  filter, and the cases of „Dodaj regułę z tym”, of a hovered tile and of the question at „Zakończ”
  follow; in `tests/view/end-question.test.mjs` the helper that renames a group finds the name field
  in the program panel.
- **Change:** `src/browser/view/run-screen.tsx` · `src/browser/view/right-area.tsx` · `src/browser/styles.css` · `tests/view/run-screen.test.mjs` · `tests/view/right-area.test.mjs` · `tests/view/end-question.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:23-30` Need
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:44-57` Pytanie 1 and Pytanie 2
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:71-75` Pytanie 6
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-126` Settlements to record, Out of scope
  · `foundations/decisions.md:6696-6750` D-311 · `foundations/decisions.md:6021-6046` D-282 · `foundations/decisions.md:7630-7654` D-346 · `foundations/decisions.md:414-442` D-19 · `foundations/decisions.md:7537-7570` D-343 · `foundations/decisions.md:5935-5984` D-280 · `foundations/decisions.md:912-926` D-43 · `foundations/decisions.md:6159-6194` D-288 · `foundations/decisions.md:7310-7344` D-336
  · Foundation entries Row 1 and Row 2
  · `foundations/part_map.md:3-28` browser-view
  · `foundations/glossary.md:18-23` map run · `foundations/glossary.md:248-252` chronicle
  · `foundations/invariants.md:459-468` browser-view-token-values · `foundations/invariants.md:469-478` browser-view-focus-outline
  · `src/browser/view/program-panel.tsx:131-181` ProgramPanel · `src/browser/view/world-area.tsx` · `src/browser/view/tile-table.tsx` · `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** same — a layout across a shared stylesheet and a screen module with named grid areas, a one-column fallback and a check in a real browser; the arithmetic of the widths and the grid's row behaviour need judgment, and three test files change with it.
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/right-area.test.mjs` · `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/scene.test.mjs` · `npm run typecheck` · `npx eslint --max-warnings 0 src/browser/view/run-screen.tsx src/browser/view/right-area.tsx` · `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/run-screen.tsx src/browser/view/right-area.tsx src/browser/styles.css tests/view/run-screen.test.mjs tests/view/right-area.test.mjs tests/view/end-question.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py`; manual state check by `loop2-play` in a real browser: on a map run in a window 1280 × 720 px the world on the left with „Kronika” and „Teren” under the drawing and the line of a tile, the program on the right at about 526 px (measure it), a rule opened under its row with the tabs unchanged, „Dodaj regułę z tym” opening its panel under the new rule, the question „Zapisać, odrzucić, wrócić?” after „Zakończ” on fewer lines than the three of the base, a window narrower than the threshold showing world, program, tabs one under the other
- **Depends on:** Slice 3 · Foundation entries Row 1 and Row 2

### Slice 5 — What the move leaves behind goes

- **Goal:** Nothing the move of the rule panel and of the tabs leaves behind remains. The host path
  of the program panel is gone: `placeRulePanel` from the panel's type and body, its host and its
  `onRuleOpen` callback, the portal into the host (`createPortal` and its import), the host's part in
  `commitEditor`;
  `git grep -n "placeRulePanel\|ruleHost\|createPortal" -- src tests` prints nothing. In the tests a
  case that tested only the host (the screen told of an open panel, a panel standing in a host) is
  deleted with its reason — the host no longer exists — and a case about what the player sees (the
  panel opens on the new rule, takes the focus, closes and gives the focus back) stays, rewritten for
  the panel under the row; the stubs of `placeRulePanel` in the fake panels of `tests/view/scene.test.mjs`
  go. No comment or test name of the changed files speaks of a rule panel beside the rows, of a
  right area of the screen of a map run, or of two scales of the scene (the screen Mapy has an area
  of its own on the right and keeps its words). The step of `.claude/skills/loop2-play/SKILL.md` section "Compose a game state" that says the rule panel "takes the place of the table of revealed tiles" (around line 134) says what the player sees now: the panel opens under the rule's row and the tabs stay as they were. (Added by the orchestrator after slice 4's report: the change made that sentence untrue.)
- **Change:** `src/browser/view/program-panel.tsx` · `src/browser/view/rule-panel.tsx` · `src/browser/view/scene.tsx` · `src/browser/view/chronicle.ts` · `src/browser/view/tile-table.tsx` · `src/browser/view/world-area.tsx` · `tests/view/program-panel.test.mjs` · `tests/view/scene.test.mjs` · `tests/view/world-area.test.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-122` Settlements to record
  · `foundations/decisions.md:6159-6194` D-288 · `foundations/decisions.md:6696-6750` D-311
  · Foundation entries Row 1 and Row 2
  · `foundations/part_map.md:3-28` browser-view
  · `foundations/invariants.md:459-468` browser-view-token-values
  · `tests/view/page-document.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/rule-signs.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm run typecheck` · `npx eslint --max-warnings 0 src/browser/view/program-panel.tsx src/browser/view/rule-panel.tsx src/browser/view/scene.tsx src/browser/view/chronicle.ts src/browser/view/tile-table.tsx src/browser/view/world-area.tsx` · `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/program-panel.tsx src/browser/view/rule-panel.tsx src/browser/view/scene.tsx src/browser/view/chronicle.ts src/browser/view/tile-table.tsx src/browser/view/world-area.tsx tests/view/program-panel.test.mjs tests/view/scene.test.mjs tests/view/world-area.test.mjs` · `git grep -n "placeRulePanel\|ruleHost\|createPortal" -- src tests` prints nothing · `git grep -n -i "right area" -- src tests` prints only lines of the screen Mapy (`src/browser/view/maps-screen.tsx`, `tests/view/maps-screen.test.mjs`)
- **Depends on:** Slice 2 · Slice 4 · Foundation entries Row 1 and Row 2

### Slice 6 — The styleguide speaks of the new layout and the one scene size

- **Goal:** `guidelines/styleguide-browser-view.md` says in the new layout's words what it says in the
  old one's, in the places the task names and in any other that says the same: the paragraph that
  keeps the scene's exceptions and says the badge icon's size stands "przy każdej skali"
  (`guidelines/styleguide-browser-view.md:124-133`), the line that says the progress bar has a
  thickness that is doubled "przy skali 2" (`:596-597`), the rule on tabs that names "dwa przyciski
  „Kronika” i „Teren” nad prawym obszarem ekranu przejścia, gdy nie stoi w nim otwarty edytor
  reguły" (`:399-402`), and the opening of the rule on the chronicle that names the right area of
  the screen of a map run (`:626-628`). The scene has one size, so the text no longer speaks of
  scales; the tabs stand in the area under the world and an open rule panel does not take their
  place; the chronicle rule says where the chronicle stands in the new words. Roles, values and
  decisions cited stay as the foundation steps left them; no new role, colour or value enters. The
  sentence at `:646` that names `src/browser/view/right-area.tsx` stays true (the module keeps its
  name). Search the file for every other place that speaks of a right area of the screen of a map
  run, of a rule panel beside the rows or of a scale, and change those too; leave the Mapy
  rule's "po prawej" and the spacing scale ("skala odstępów") alone.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/proporcje-sceny-i-programu/task.md:32-40` To do
  · `docs/task-cycles/proporcje-sceny-i-programu/task.md:114-122` Settlements to record
  · `foundations/decisions.md:6696-6750` D-311 · `foundations/decisions.md:7537-7570` D-343 · `foundations/decisions.md:6159-6194` D-288 · `foundations/decisions.md:6021-6046` D-282 · `foundations/decisions.md:912-926` D-43
  · Foundation entries Row 1, Row 2 and Row 3
  · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` (reports 0 errors at the base) · `grep -n -i "prawy obszar\|prawego obszaru\|prawym obszarem\|skali\|skal[aęi] [12]" guidelines/styleguide-browser-view.md` shows no line about the screen of a map run or the scene (the spacing scale „skali odstępów" is not one)
- **Depends on:** Slice 5 · Foundation entries Row 1, Row 2 and Row 3

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: a program as wide as in the original Loop — 526 px in a window 1280 px wide, 622 px at content 1344 px, by merging the program and the right area and keeping the scene at 672 × 304 | Slice 4 (columns; the measured width is its manual check), Slice 3 (the scene stays one size) |
| To do 1 — on the screen of a map run the panel of a rule or group opens in place under its row or header, and the program and the right area become one column | Slice 1 (the list draws the panel under the row), Slice 4 (the screen stops hosting it, the right area is gone), Row 1, Row 2 |
| To do 2 — the left column holds, under the drawing and the line of a tile, the area with „Kronika” and „Teren”, the chronicle with its filters and the table of revealed tiles; the tab pick is kept as today (D-346) and an open panel takes no room from the tabs; in a window too narrow for two columns: world, program, „Kronika” and „Teren” in that order (D-282) | Slice 4, Row 2, D-311 · D-282 · D-346 |
| To do 3 — on Programy an open rule or group adds no third column; the panel opens under its row or header as on the screen of a map run | Slice 1, Slice 2, Row 1, D-288 · D-282 |
| To do 4 — the scene stays 672 × 304; code, test and styleguide drop the second size, 336 × 152 | Slice 3 (code and test), Slice 5 (words in comments), Slice 6 (styleguide), Row 3 |
| To do 5 — the styleguide speaks of the new layout where it spoke of the old: the right area at the chronicle (`:626-628`) and the scale of the scene (`:128-129`, `:596-597`) | Slice 6 (with `:399-402`, which says the same and the task's lines did not name) |
| Settlement row 1 — the panel opens in place on both screens | Row 1; Slices 1, 2, 4 |
| Settlement row 2 — two columns, the tabs under the map, the program on the right | Row 2; Slices 4, 6 |
| Settlement row 3 — one scene size, 672 × 304 | Row 3; Slices 3, 5, 6 |
| Nine decisions of *Decisions in play* change by what the rows settle: D-311, D-288, D-282, D-19, D-338, D-343, D-345, D-346, D-334 (D-280 stays) | The nine rows of *Foundation entries*, written by the cycle's foundation step before Slice 1 |
| Out of scope — the place of the end of the map run (question 6; task 16) | No slice places it: Slice 4 moves only „Kronika” and „Teren”; the row for D-334 leaves the end of the map run open |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The program panel hands its rule panel to the rule list as a node the list draws after the open row (a sibling item, not inside the row's item) or after the open header; the portal into a host and the host path go (Slices 1 and 5) | Keeping the portal and moving a host element under the open row (an element outside React's tree moved by hand, the focus and the layout split in two places, two ways to host); drawing the panel inside the row's own item (a click, key or drag inside the panel reaches the row's handlers that open the panel and start a drag) | The list's tree changes shape again; tests find the panel by class, so the rework is local to `rule-list.tsx` and `program-panel.tsx` |
| An open rule inside a folded group has its panel under that group's header (its row is not drawn) | Closing the panel when the group folds (D-306 names what closes it; a fold is not one); unfolding the group for the panel (D-295 keeps a group folded when a rule is dropped on it, so the list does not run from under the pointer) | A panel under a header where the player expected it gone: one condition in `rule-list.tsx`; no stored data |
| The tabs area is the third `section.screen-area` of the screen, last in the DOM as today, and the stylesheet puts it under the world by named grid areas with the program spanning both rows | Nesting the tabs area inside the world's section (in one column it would stand between world and program, against the order of D-282 and To do 2); moving it in the DOM (changes the order the keyboard walks and every `areasOf` test) | The grid's rows may leave a gap under the world when the program is taller; a CSS fix in `styles.css` |
| Two columns from the window width where the program has at least 320 px (706 + 16 + 320 + the page's padding, about 1074 px, recomputed from the stylesheet by Slice 4); 320 px is the minimum the editor's column on Programy already has | Keeping the old minimum of 170 px (a program that narrow is the defect the task removes); two columns at every width (the world's 706 px would leave the program no room) | One number: windows between the old 1276 px and the new threshold get the program narrower or wider than expected; changed in one rule |
| `src/browser/view/right-area.tsx`, `RightArea` and `tests/view/right-area.test.mjs` keep their names; their words, comments and test names speak of the area under the drawing | Renaming them: the table of `guidelines/coding-browser-module.md` and the styleguide's `:646` name the file, and the table belongs to guidelines the project keeps through its own skill | A name that says "right" for an area on the left; a later rename is mechanical but needs the table and `:646` edited with it |
| The scene's 336 × 152 stays as the size of the picture in `src/browser/sim/data/scene.ts` and `scene-picture.ts`; only the second way to show it goes | Removing 336 × 152 everywhere: it is the size of the PNG, not a display size | None; the constant is a fact about the file |
| The foundation entries are written by the cycle's foundation step before Slice 1, and no slice writes one; the slices name them by row | A slice 1 for the foundation agent: the skills for decisions are the cycle's, not a slice's, and a slice would have no code to check | If a slice meets a sentence of an entry not yet worded, it asks the orchestrator; no code depends on wording the step has not fixed |
| The styleguide is the last slice, after the code | Putting it first: it would describe a layout nobody has made, and its example order (environment, values, one screen, states) has nothing to offer a change that adds no token and no control | The styleguide is stale between slices; it is a text edit with no code in it |
| Slices 2, 3 and 5 are `cheaper`, 1 and 4 `same` | One class for all: a cheaper agent on Slices 1 and 4 risks an unfinished folded-group case or a grid that leaves a gap, and a same-class agent on 2, 3, 5 and 6 pays for judgment they do not use | A cheaper slice returns too large or wrong; the orchestrator reruns it on `same` |
