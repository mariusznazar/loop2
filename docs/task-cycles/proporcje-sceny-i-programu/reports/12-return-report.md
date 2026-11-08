# Report 12 — the return step (task proporcje-sceny-i-programu)

- Status: done
- Head at start: `5e814591a904063749c6a0471779e75a4fbc83c7` (confirmed). Branch `task/proporcje-sceny-i-programu`, worktree `the worktree's root`.
- Method: `the-way-make-change` (`.the-way/task-cycle/change/SKILL.md`) with `return_step.md` and `foundation_step.md`, read whole; `the-way-record-decision` read for D-350 (`elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `common/way_of_working.md`).

## Commit

- `f0421c3` — `docs: :memo: add D-350 on the rule panel standing under the header of a folded group, and name the task in the origin of D-166`; one file, `foundations/decisions.md` (+29 −1). Committed by explicit path.

## Comparison, entry by entry

Compared against the code at `5e81459` (`git diff 01b26d5..HEAD` for `src/browser/styles.css`, `view/run-screen.tsx`, `view/right-area.tsx`, `view/world-area.tsx`, `view/rule-list.tsx`, `view/program-panel.tsx`, `view/rule-panel.tsx`, `view/game-view.ts`), the tests named in report 11, and a search of the whole foundation.

| Entry | Compared with | Result |
|---|---|---|
| D-349 (row 3) | `world-area.tsx`: `SCENE_WIDTH = 672`, `SCENE_HEIGHT = 304`, no `SCENE_SCALE`, no `sceneSize`; `styles.css`: no `data-scene-scale` rule left, badge icon 32 px and bar `calc(var(--bar-width) * 2)` as plain rules; `run-screen.tsx` no `data-scene-scale` | matches |
| D-311 (row 2) | `run-screen.tsx` three `screen-area` sections in DOM order world, program, tabs; `styles.css` named grid areas, `706px minmax(0, 1fr)` from 1074 px, one column below; `world-area.tsx` ends with the drawing and the line of a tile; the tabs area drawn whenever the screen has a state | matches |
| D-288 (row 1) | `rule-list.tsx`: panel drawn once through `createPortal(panel, panelHost)` at the list's root, seated by `seatPanel` in a slot under the row or under the header; `game-view.ts`: Programy holds two areas, no `rule-panel-area`, no `with-rule-panel`; `styles.css`: no three-column Programy rule | matches; one case (a rule of a folded group) was stated by no entry, see D-350 |
| D-282 | `styles.css` (order world, program, tabs one under the other; Programy and Mapy one line under 720 px) | matches |
| D-19 | `RunScreenView` holds `hovered` and hands it to `WorldArea` and `RightArea` alike; the table shows while the tab „Teren” is picked | matches |
| D-338, D-343, D-345, D-334 | wording only (place of the area); read against `right-area.tsx`; D-334's *Rejected* no longer names an area that does not exist | matches |
| D-346 | `RightArea` reads the chronicle memory; `RunScreenView` no longer hides it for an open panel (the `useSyncExternalStore` on the open flag is gone) | matches |
| D-166 | Programy: list on the left, editor on the right (`game-view.ts:646-647`) | the text matched; its *Origin* named no source for the change (N-1 of report 11), fixed in `f0421c3` |
| D-280 | content at most 1344 px; the grid is inside the content | unchanged, matches |
| D-166, D-295, D-296, D-306, D-313, D-298 (found by the search for `rule panel`, `fold`) | each read for a place of the panel or of the fold | none states a place that has changed; D-313 and D-306 say "opens"/"closes", not where |
| Invariants of `browser-view` (`browser-view-token-values`, `browser-view-focus-outline`, `browser-view-framework`, `design-token-contrast`, `design-token-sources`; `loop2-container-sprites`) | text against the stylesheet and the scene's files | no sentence names a scale, a column, a class or a file this change removed |
| Glossary | search for `scene`, `scale`, `tabs`, `area`, `rule panel`, `right` | no entry speaks of a place or a size; `chronicle` is meaning-only |
| Part map, `browser-view` and `agent-workflow` | the change adds no file (`tests/view/rule-editor.test.mjs` is under `tests/view/**`; `.claude/skills/loop2-play/SKILL.md` under `.claude/**`; `guidelines/**`) | the lists of files hold; no responsibility, dependency or trust boundary changed |
| Environment facts | search for `grid`, `media`, `portal`, `scrollbar` | none held. See below why none is written |

Searches beyond the entry names: `grep -rniE` over `foundations guidelines src tests .claude AGENTS.md` for `right area`, `right-area`, `beside the rows`, `SCENE_SCALE`, `scene-scale`, `sceneSize`, `placeRulePanel`, `run-right`, `right-tabs`, `rule-panel-area`, `program-editor-layout`, `with-rule-panel`, `run-rule`, `ruleHost`, Polish `prawy obszar`, `panel obok`, `the middle`, `third column`, `three columns`, `scale 1/2`, `336 ×`. What remains is correct: `right-area.tsx`, `RightArea` and `tests/view/right-area.test.mjs` keep their names by decision of the plan (the handoff says so; the table in `guidelines/coding-browser-module.md:57` and `styleguide-browser-view.md:647` name the file); the Mapy screen's "right area" (D-2xx at `decisions.md:7230`, `7234`, `maps-screen.tsx`, `tests/view/maps-screen.test.mjs`) is a different screen; `336 × 152` stands in `world-area.tsx:29`, `scene-picture.test.mjs:35` and in D-349 as the size of the picture; `tests/view/account-screen.test.mjs:4286` and `run-screen.test.mjs:244` assert the absence of the removed classes; `src/browser/styles.css:200` says "a grid of three areas of its own", which is still true.

## Entries written

- **D-350** — "Where does the rule panel stand while the rule group of its rule is folded?" (`foundations/decisions.md`, end of the log). Mark: `the cycle's`.
  - English: A rule panel open on a rule whose group is folded stands under the header of that group, and folding or unfolding the group closes no panel and changes none of its fields.
  - Polish: Panel reguły otwarty na regule, której grupa jest zwinięta, stoi pod nagłówkiem tej grupy, a zwinięcie albo rozwinięcie grupy nie zamyka panelu ani nie zmienia jego pól.
  - Why an entry: the plan's *Choices* row 2 chose it ("an open rule inside a folded group has its panel under that group's header", rejecting closing the panel and unfolding the group), and no entry states it: D-288 (row 1) says "under the row of the rule or the header of the rule group it changes", which does not tell a reader where a rule whose row is not drawn goes. It binds after the merge (the fold, "zwiń wszystkie" and the adding of a discovered rule into a folded first group reach it on the page), it has two weighed ways and a check on a change, so the plan test of WAY-36 gives an entry. It derives from D-288 and D-295; D-288 itself is left as row 1 wrote it.
- **D-166** — *Origin* only: `zadanie_proporcje_sceny_i_programu_loop2.md … To do, item 3, and Questions to settle, question 3` added, as in the other nine entries this task changed. Mark: `the cycle's` (a correction of an entry the change had changed).
  - English: The origin of D-166 now names the task that moved the editor of Programy to the right column.
  - Polish: Pochodzenie D-166 wskazuje teraz zadanie, które przeniosło edytor Programów do prawej kolumny.

## Entries considered and not written

- Glossary: none. No word of the change means in the product something a reader of the field would not take it to mean ("rule panel", "program", "chronicle" already stand as the product's words; "the area under the world" is a phrase, not a term).
- Invariant: none. No rule is set by the task, a decision or the human that a test could check and no invariant covers; the 672 × 304 size is D-349's *Verification* (an agent compares), and no `Method` is named by the task.
- Environment fact: none. The change rests on CSS Grid placement and on a media query counting a classic scrollbar in the window's width, but no decision or invariant of the foundation cites them as a source whose change would call it into question (`Based on: none` in D-311, D-288, D-349, D-350; the stylesheet's comment holds the arithmetic and the caveat). An entry stands only while a *Based on* or a *Rests on* names it (`elements/environment-facts/template.md`, "Which facts are written"), so one would be an orphan.
- Part map: none (see the table).
- Choices left as rows of the questions table (no entry), by WAY-36 and `return_step.md`:
  - the panel handed to the list as a node after the open row, not inside the row's item (a structure of the code, local to `rule-list.tsx`);
  - the two-column threshold of 1074 px and the 320 px minimum of the program (layout dimensions; D-43 leaves them out, and the stylesheet's comment holds the arithmetic; no entry holds a px value);
  - `RightArea`, `right-area.tsx` and its test keep their names (a name; settled by the handoff);
  - the 336 × 152 stays as the size of the picture in the data (a fact about the file);
  - the order of the foundation step and of the styleguide slice (the work's order, which ends with the merge);
  - a drop on the open panel lands nowhere: the root's `overPanel` takes the line away and does not accept the event (`rule-list.tsx:400-404`; report 10 names it as a choice, report 11 M-7 accepts it). It is an edge of one gesture no later work builds on; the cost if wrong is one handler.
- Known and settled, not reopened: the place of the end of the map run (task 16); the names `RightArea`/`right-area.tsx`; a move of the open rule across a group border closes the panel on the page, as at the base.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the edit, before the commit) | 0 | `0 errors` |
| `git status --short` (after the commit) | 0 | empty |

Not run: `npm test` and any build or test of code (the handoff reserves the full gate to the orchestrator; this step changed `foundations/decisions.md` only, and no code, test or style). Not run: any check in a real browser.

## Reaches beyond the handoff

- `.the-way/elements/decisions/template.md`, `.the-way/elements/decisions/skill/{SKILL,read,decide_entry}.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/elements/environment-facts/template.md` (whole or in the parts quoted), `.the-way/elements/glossary/template.md` ("Which words take an entry"), `.the-way/foundations/decisions.md` WAY-36 — to apply the plan test, the form of an entry and the rule for facts.
- `foundations/decisions.md` D-294, D-295, D-296, D-306, D-313, D-314, D-316 (read whole): for the place of the fold and the panel.
- `tests/view/rule-editor.test.mjs:1625-1650` and `src/browser/view/rule-list.tsx` (`renderGroup`): to confirm the folded-group behaviour D-350 states and the labels „Zwiń grupę”, „Rozwiń grupę” and „zwiń wszystkie”.
- Reports `09-review-whole-report.md` and `11-review-fix1-report.md` (the final reviews, as the handoff names) and `plan.md` *Choices*.
- Wrote one inline Python edit of `foundations/decisions.md` (a single string replacement in D-166's *Origin*, line endings kept as LF); I did not read `scripts.md` before it, the edit was a single `str.replace` with no backslashes and no console output of text.

## Searches not found or unclear

- The question whether D-166's *Origin* must grow when an entry changes: the decisions template says *Origin* "points to where the full reasoning lives" and has no sentence that demands an edit; I added it for the consistency N-1 of report 11 asked for (every other changed entry gained one). Unclear, not blocking.
- Whether a rule that a player adds into a folded first group by „Dodaj regułę z tym” (D-313) should have its group unfolded: D-313 says nothing of folding and I found no other entry that does; D-350 states only where the panel stands. Not reopened.
- No environment fact for the scrollbar caveat in the stylesheet: the file holds no entry on `@media` widths and the template asks for one only where a *Based on* or *Rests on* needs it; I found none that does.
