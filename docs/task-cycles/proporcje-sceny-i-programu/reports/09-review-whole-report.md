FAIL 38dfa8cd5329ca4070dead9a7233f71f425c7a93

# Report 09 — review of the whole change (task proporcje-sceny-i-programu)

- Range: `01b26d5..38dfa8c` (`git rev-parse HEAD` = `38dfa8cd5329ca4070dead9a7233f71f425c7a93`, as the handoff gives). Diff and log computed as `git diff 01b26d5..HEAD`, `git log 01b26d5..HEAD`: seven commits, 22 files.
- Method: `.the-way/task-cycle/review/SKILL.md` with `whole_change.md`. No slice had a review of its own; each slice is judged here as section 2 judges a slice, its executor's own-work check included.
- Counts: blocking 1 (Important) · Minor 7 (all within the task) · out of scope 3 (the lines of *Declined to judge*; no finding beyond the task otherwise).

## Blocking findings

### I-1 (Important) — Folding or unfolding the group of an open rule moves the keyboard focus into the rule panel and resets the field it showed

- **Place:** `src/browser/view/rule-list.tsx:551-558` (the panel drawn as an `<li>` of the group's `<ol>`, under the row) and `src/browser/view/rule-list.tsx:655-657` (the same panel drawn as a `<div>` after the header when the group is folded); with the focus effect that runs on mount at `src/browser/view/rule-panel.tsx:285-298`.
- **What is wrong:** the one rule panel now has two parents in the list. When the group holding the open rule is folded or unfolded — by its „Zwiń grupę”/„Rozwiń grupę”, or by „zwiń wszystkie”/„rozwiń wszystkie” — React unmounts the panel in one parent and mounts a new one in the other. The new `RulePanelView` starts with `focusedKey` null, so its layout effect treats it as an opening and calls `focus()` on the chosen cell of the field the page opened. The player who pressed the fold button finds the focus in the panel's grid instead of on the button, and the panel back on its first field (`condition`, or the field the page opened) instead of the field the player had moved to. Nothing in the list's own focus effect puts it back (that effect runs only when `program` changes; a fold changes no program). The same reset of the field happens when „↑”/„↓” moves the open rule across a group border (there the list's effect does put the focus back on the arrow, as the slice 1 report says).
- **Why it matters:** a keyboard player who folds a group to get it out of the way and presses Enter or Space again to unfold it instead acts on a pick cell: in the check below, Enter moved the panel on to the field „Liczba” and the group stayed folded. A focus that moves away from the control just used, with no request from the player, is a change of context the player did not ask for (WCAG 2.2, 3.2.2). The base keeps the focus on the fold button. Slice 1's own *Goal* says the focus behaviour stays as it is; the change of place of the panel made it a fresh opening. No data changes (the check below shows the rule unchanged), so the effect is disorientation, not loss.
- **Evidence:** a scratch case added to a copy of `tests/view/program-panel.test.mjs` in a separate worktree (helpers `wiredPanel`, `gameWithRule`, `click` of that file): open rule 1 on Programy, focus „Zwiń grupę”, click it, read `document.activeElement`.
  - at head `38dfa8c`: the focus is `BUTTON.pick-cell.selected` „Zawsze”, inside `.rule-panel` (the case failed);
  - at base `01b26d5`, same case: the focus stays on the button, now „Rozwiń grupę ▸” (the case passed).
  - A second case at head with `runWithNumber()` (the rule „Zapas poniżej 8 · Patyk → Eksploruj” of a map run's copy): after the fold the focus is the cell „Zapas poniżej”; Enter then moves the focus to the field „Liczba”, `acts` is empty, the rule is unchanged and the group stays folded.
  - Not run: the same in a real browser (D-88). The focus is moved by an explicit `focus()` in the effect, which jsdom runs as a browser does, so the outcome does not depend on the imitation.
- **Slice:** slice 1, `a5aa424` (the place of the panel in the list); slice 5, `df84a1d`, made it the only path by removing the hosted one, without changing the mechanism. Not caught by slice 1's own-work check, which checked that one panel stands after a fold, not where the focus goes.

## Minor findings (all within the task)

- **M-1** — `guidelines/styleguide-browser-view.md:127-128` and `:596-598` (slice 6, `38dfa8c`). The two sentences that replaced the scale now give reasons — „bo scena ma jeden rozmiar”, „bo cała scena jest rysowana w dwukrotności swojego obrazu” — while the decision that carries that choice, D-349, is named nowhere in the styleguide, not on the *Decision* line of „The scene of a map run” (`:579`) nor of „No value in place of a design token”. `product-guidelines/template.md` asks that a rule carry no rationale and name the decision that carries its choice (WAY-168, WAY-171). Effect: a reader of the rule does not find where the one size is decided. Fix: name D-349 on the *Decision* line of the scene's rule (and where the paragraph at `:124-129` stands) and say the fact without „bo”. This answers the slice 6 executor's question: yes, D-349 belongs there.
- **M-2** — `src/browser/styles.css:241-247` with the threshold at `:277` (slice 4, `d737a1a`). The comment says the program takes „at least 320 px” and 526 px in a window 1280 px wide; both hold only where the browser draws no classic scrollbar. A media query counts the scrollbar in the window's width, so in a browser with a classic vertical scrollbar of about 15–17 px (Chrome and Edge on Windows by default, when the page scrolls) the program is about 511 px at 1280 px and below 320 px between 1074 px and about 1090 px. The slice 4 executor measured with an overlay scrollbar and reported this. Effect on the player: a program column some 15 px narrower than the comment promises in a band of window widths; the comment states an untrue minimum. Fix: raise the threshold by the scrollbar's width or say in the comment that the figures are without a classic scrollbar.
- **M-3** — `tests/view/world-area.test.mjs:413-422` (slice 3, `f9a5b86`). The two assertions that `SCENE_SCALE` and `sceneSize` are not exported check names, not behaviour (`guidelines/testing.md`, *Behaviour, not implementation*): a second scale brought back under another name, or by a style rule keyed by width, passes them, and only the literal 672 × 304 on the background protects the requirement. The slice used them as its failing-first assertion because the size was already 672; that is a reason for the order of work, not for keeping them. Fix: drop them, or replace them with a check of the behaviour D-349 forbids.
- **M-4** — `src/browser/view/game-view.ts:646-647` (slice 2, `6ee2e7f`). The comment ends „so no host is placed for it here”: it names a host the code no longer has, which a reader without the history cannot place. The rest of the comment says what Programy has. Fix: drop the last clause.
- **M-5** — `foundations/decisions.md:3072` and its *Verification* (D-166; the cycle's foundation step, `189d589`). D-166 says Programy holds „in the middle the program editor”, and its *complies* example says „the editor in the middle of the screen”. With the rule panel no longer a third column (D-288, D-282 as this change wrote them), Programy has two columns in every state and the editor stands on the right. The foundation step read D-166 and left it as saying nothing of the panel's place; the change removed the only state in which the editor stood in the middle. Effect: a reader of the decision looks for a middle column that does not exist. Fix through `the-way-record-decision`: „on the right”, or „beside the list”.
- **M-6** — `src/browser/view/rule-list.tsx:554` (slice 1, `a5aa424`). The panel under a row is an item of the ordered list of rules (`<li className="rule-list-panel">` in `<ol className="rule-list-rules">`), so assistive technology counts one item more than the group has rules while a rule is open and announces the panel as a rule of the list. The slice 1 executor named this cost. Fix: give the item `role="presentation"`/`none`, or keep the semantics in mind when I-1 is fixed (one place for the panel would settle both).
- **M-7** — `src/browser/view/rule-list.tsx:590-595` with the panel at `:551-558` (slice 1, `a5aa424`). A rule dragged over the panel of an open rule is over no row, so the event reaches the group's `section` and the drop line stands at the end of the group, wherever the panel is: a rule dropped with the pointer on the panel under rule 1.1 of a long group lands at the group's end, away from the pointer. The case in `tests/view/rule-editor.test.mjs` asserts only that no line stands before the row the panel is under. Effect: a surprising landing place for a drop on the panel, shown by the line before the drop. The slice 1 executor reported it as accepted.

## Judgments of what the handoff lists

- The comment at `src/browser/view/game-view.ts:647` — M-4.
- The comment at `src/browser/styles.css:1865` („The element of its own that `createRulePanel` builds for the rule panel”) — true at head; `createRulePanel` and `.rule-panel-host` are used by no screen, but they were already used by tests alone at the base (`git grep` at `01b26d5` shows no production caller). Not a leftover of this change; see *Declined to judge*.
- `scene.tsx` headers — `src/browser/view/scene.tsx:8` now reads „right at its one size”; the header is true. No finding.
- D-349 in the scene paragraph of the styleguide — M-1 (yes).
- The panel remounts when it changes place — I-1 (focus and field) and the reset at „↑”/„↓” across a group border within it.
- Source fidelity (526 px and 622 px): no foundation entry holds 526, 622, 706, 174, 270, 510, 606 or 342 px (`git diff 01b26d5..HEAD -- foundations/`); they stand only in the stylesheet's comment as its arithmetic (M-2 on that comment).

## Against the whole task

- To do 1 — met: the rule panel opens under its row or header in the program panel (`rule-list.tsx`), `run-screen.tsx` gives no host, the right column is gone; covered by `tests/view/run-screen.test.mjs` (open panel case, „Dodaj regułę z tym” case) and `tests/view/program-panel.test.mjs:301`.
- To do 2 — met: the third section `screen-area run-tabs` draws `RightArea` whenever the screen has a state; named grid areas put it under the world from 1074 px; DOM order world, program, tabs (D-282); the pick and filter stay the chronicle memory's and an open panel changes neither (`tests/view/run-screen.test.mjs`, case at `:345`). Narrow order and widths measured by the slice 4 executor in a browser (claims; I did not repeat the browser check).
- To do 3 — met: Programy has two areas and no `rule-panel-area`; `tests/view/account-screen.test.mjs:4280`.
- To do 4 — met: `SCENE_SCALE`, `sceneSize`, `data-scene-scale` and the scale-1 rules are gone; `tests/view/world-area.test.mjs` checks 672 × 304 (see M-3); the picture's own 336 × 152 stays in the data, as the plan chose.
- To do 5 — met at `guidelines/styleguide-browser-view.md:127-128`, `:401-402`, `:596-598`, `:627-629` (see M-1).
- Settlements to record, row 1 → D-288; row 2 → D-311; row 3 → new D-349. Each row's meaning is stated by its entry; D-349's second sentence („Whatever the scene draws is drawn for this size alone”) answers the row's column „What the cycle would otherwise guess” (effects of tasks 17–20), so it is not an addition.
- Decisions in play — D-311, D-288, D-282, D-19, D-338, D-343, D-345, D-346, D-334 changed; D-280 unchanged. Each changed entry says what the code does: D-311 two columns with the tabs under the drawing and the line of a tile, the panel in the program (`styles.css:263-289`, `run-screen.tsx:112-142`); D-288 in place on both screens, no column of its own; D-346 a panel opened or closed leaves the tab; D-19, D-338, D-343, D-345 wording; D-334 leaves the place of the end open (E1). No departure under WAY-263 found.
- Out of scope respected: the place of the end of the map run is set by no entry and no code.
- No reserved choice (`project-level/technology/reserved_choices.md`): no library, store, framework or place to run enters. No trust boundary touched (no file under `assets/**`). No invariant test changed.
- Deleted tests (`tests/view/program-panel.test.mjs`, the host cases): the reason is the requirement (D-288, D-311 no longer have a host); the 16× number case removed as a duplicate has its twin at `tests/view/program-panel.test.mjs:902`, which runs without a host. The rewritten assertions in `run-screen.test.mjs` and `program-panel.test.mjs` follow the changed decisions (*Changing an existing test*).
- Guidelines: the new styles use tokens (`var(--space-xs)`) and layout dimensions D-43 leaves out (706 px column, 1074 px threshold); the effect in `run-screen.tsx` lists its one dependency and returns a cleanup (*Efekty*).

## Declined to judge

- `createRulePanel` and the rule `.rule-panel-host` (`src/browser/view/rule-panel.tsx:593`, `src/browser/styles.css:1865-1869`) are used by tests alone — already so at the base `01b26d5`; not left behind by this change.
- The scene's fixed 672 px in windows narrower than about 738 px, where the world area is narrower than the scene — unchanged from the base (the scale 2 was already in force there) and outside the task's questions.
- The place of the end of the map run — question 6, task 16, as the task and the handoff say.

## Checks run

All in a separate worktree of `38dfa8c` at `.runs/review-whole-wt` (and one of `01b26d5` at `.runs/review-base-wt` for the comparison of I-1), with `node_modules` joined from the reviewed worktree; both worktrees and the junctions removed afterwards. The reviewed worktree, its index and its branch were not changed.

| Command | Exit | Result |
|---|---|---|
| `npm run build` | 0 | |
| `node scripts/test-node-file.mjs tests/view/rule-editor.test.mjs` | 0 | 69 pass |
| `node scripts/test-node-file.mjs tests/view/program-panel.test.mjs` | 0 | 50 pass |
| `node scripts/test-node-file.mjs tests/view/run-screen.test.mjs` | 0 | 13 pass |
| `node scripts/test-node-file.mjs tests/view/account-screen.test.mjs` | 0 | 128 pass |
| `node scripts/test-node-file.mjs tests/view/world-area.test.mjs` | 0 | 21 pass |
| `node scripts/test-node-file.mjs tests/view/end-question.test.mjs` | 0 | 17 pass |
| `node scripts/test-node-file.mjs tests/view/right-area.test.mjs` | 0 | 13 pass |
| `node scripts/test-node-file.mjs tests/view/scene.test.mjs` | 0 | 19 pass |
| `node scripts/test-node-file.mjs tests/view/rule-signs.test.mjs` | 0 | 6 pass |
| `npm run typecheck` | 0 | |
| `npx eslint --max-warnings 0` on the ten changed view sources and eight changed test files | 0 | |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore $(git diff --name-only 01b26d5..HEAD -- src tests)` | 0 | |
| `python -B scripts/test.py tests/invariants/test_browser_view_token_values.py` | 0 | |
| `python -B scripts/test.py tests/invariants/test_browser_view_focus_outline.py` | 0 | |
| `python -B scripts/test.py tests/invariants/test_browser_view_framework.py` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| scratch case „folding the group of an open rule keeps the focus on the fold button” at head | 1 | fails: focus on the pick cell „Zawsze” in the panel (I-1) |
| the same scratch case at base `01b26d5` | 0 | passes: focus on „Rozwiń grupę” |
| scratch case: Enter after the fold, `runWithNumber()`, at head | 0 (logging case) | focus moves to „Liczba”, no act, rule unchanged, group still folded |

`node scripts/test-node-file.mjs` is what `npm test -- <file>` runs after its build (`scripts/test.py`); the build ran once before the files.

Not run:
- The full `npm test` — the cycle's own run, as the handoff says.
- Any check in a real browser: the slice 2 and slice 4 executors report browser checks of the layout, widths, badge and question; I did not repeat them. The focus behaviour of I-1 rests on an explicit `focus()` call and was shown on jsdom, not in a browser. The widths with a classic scrollbar (M-2) are reasoned from how a media query counts the window and the executor's note, not measured.

## Reaches beyond the handoff

- `foundations/decisions.md`, read whole by heading: D-43, D-166, D-280, D-295, D-296, D-306, D-334 (to judge the code against decisions the change bears on and that the handoff names by part or the plan names; D-166 led to M-5).
- `foundations/part_map.md` entries `browser-view` and `agent-workflow`; `foundations/invariants.md` entries `browser-view-framework`, `icon-file-content`, `icon-credits`, `loop2-container-icons`, `terrain-drawing-numbers`, `browser-view-token-values`, `browser-view-focus-outline`, `design-token-contrast`, `design-token-sources`, `saved-program-edit`, `copy-save`.
- `foundations/glossary.md`, a search for „end of the map run” (D-334's new wording).
- `src/browser/view/rule-panel.tsx:225-304` (its focus effect, for I-1); `src/browser/view/rule-list.tsx:180-740` (handlers the panel's events bubble to, for I-1, M-6, M-7); `src/browser/styles.css` regions of the page width, the rule list and the rule panel.
- `scripts/test.py`, `scripts/test-node-file.mjs`, `package.json` — to run single files without changing the reviewed worktree.
- `.the-way/product-guidelines/template.md` whole and the *Decision* lines of `.the-way/product-guidelines/styleguide/template.md` (search), for M-1.
- `.the-way/project-level/technology/reserved_choices.md`.

## Selection of foundation and guidelines

- Parts touched: `browser-view` (`src/browser/**`, `tests/view/**`), `agent-workflow` (`guidelines/**`, `.claude/skills/loop2-play/SKILL.md`), `product-foundation` (`foundations/decisions.md`).
- Guidelines read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md` (kind `browser-module`), `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (the changed regions and the rules they belong to, with the rules naming the changed decisions found by their identifiers: `:177-300`, `:365-410`, `:536-672`, `:82-135`), `src/browser/AGENTS.md`.
- Deviation from "Reading the foundation": the decision log holds 248 decisions whose *Scope* names `browser-view` and 40 naming `agent-workflow`; I did not read all of them whole. I read whole the ten entries the change writes or changes, the entries the plan's *Read* lists cite and the ones named above, and searched the log for the words of the change („right area”, „beside the rows”, „three areas”, „third”, „middle”, „column”, „scale”, „336”).

## Searches not found or unclear

- No styleguide rule cites D-349 (M-1).
- No test covers where the focus goes when the group of an open rule is folded, at base or head.
- „in the middle” of D-166 (M-5) was not in the foundation step's search list; whether D-166's author meant the middle of a three-column Programy or simply the main column is not said in the entry.
- The handoff's „D-343's title and body speak of a right area”: only the title did, as the foundation report says; checked.
