PASS 92e0baed
# Review of the return step — koszty-i-stan-ogniska

Range `0611dfa42e681d1b264e1352fdc6a0d9defcbcfb..92e0baed` (head confirmed: `git rev-parse HEAD` = `92e0baed34ab67b6d6765a0281b593c1b997ccc7`). One commit, `foundations/decisions.md` only, 4 lines added and 4 removed, all inside D-362. No code, test, icon or screenshot in the range, so the trust boundary (`assets/icons/**`) is not reached and no reserved choice is taken.

## Findings

Blocking: none. Minor: 2. Out of scope: 0.

### Minor

**m1. "takes the name's role" in D-362's first binding sentence uses a word of the styleguide without saying so.** `foundations/decisions.md` D-362, first sentence: "in the same text as the name, so that it takes the name's role and dims with a greyed cell". "Role" is the styleguide's word for a text colour role (`text-strong`, `text-secondary`); the task says "nie potrzebuje nowej roli przewodnika stylu". A reader of the decision alone can read "role" as the part the price plays, which is not what is meant. The meaning that binds ("the price is part of the cell's text and so looks and greys as the name does") is already carried by "in the same text as the name … dims with a greyed cell", so nothing is false and no file does what the entry forbids; the phrase is only less clear than the rest. Grade Minor (WAY-104 style wording, no sentence read wrongly). Evidence: `program-editor.ts` `actionCellLabel` puts the price into `PickCell.label`; `react-pick-cell.tsx` draws `text` as one string and `.button.pick-cell.greyed` dims the button, so the intent is met.

**m2. "as the reason of its rule does (D-310)" attributes the first-item rule to D-310, whose text does not state it.** D-310 says the reason "names the thing refused as the game writes it"; the first-item choice is in the code (`firstItemFor` in `src/browser/sim/program.ts:280`, used by `lacking`, `brak opału: …` and by `actionPrice`). D-310's example "brak opału: patyk" is consistent with it, and D-362's own sentence states the rule, so the entry stays correct and binding; the `derives from D-310` relation is justified because the sentence cites D-310. A reader opening D-310 for the first-item rule will not find it there. Minor, optional: no change needed unless the human wants D-310 to state the choice too.

## Judgment (1): the change to D-362 against the code and the task's answers 1 to 3

- **The price takes the role of the action's name and dims with a greyed cell.** Task answer 2: "cena stoi w nawiasie po nazwie czynności, tym samym tekstem co nazwa, więc nie potrzebuje nowej roli … i szarzeje razem z wyszarzoną komórką". Code: `actionPick` -> `label: actionCellLabel(state, kind)`; `ReactPickCell` draws `{text}` inside one `button` with class `greyed`; the closed value of the field uses `chosenLabel(fieldPick)` (same label); `rule-list.tsx` has no `actionPick`, `chosenLabel` or `actionPrice` call, so the row shows no price. Faithful to answer 2 and to answers 1 and 3 (unchanged parts of the entry: places, forms, follows the character of the map run through `state.run?.character.skills ?? {}`).
- **The first item of a use.** `actionPrice` takes `firstItemFor("lightable" | "fuel" | "food")`; `lightCampfire` and `craftCampfire` take `CAMPFIRE.light`/`CAMPFIRE.craft`, not a use, so the sentence "an action that takes a piece of a use — fuel, food or a thing to light" lists exactly the three kinds that are use-based ("a thing to light" is `lightItem`, "Zapal — patyk"). The reason of a rule uses the same `firstItemFor` (`program.ts:361, 367, 371`). The simulation consumes `itemFor(backpack, use)` (first item of the data's order that the backpack holds, `program.ts:154`, `run.ts:286-319`), so with two items of one use the price can name another item than the one leaving the backpack; the added *Rationale* clause says exactly this ("shows the first item of that use even when the backpack holds another, which is exact while the data marks one item for each use"), and `items.ts` marks one item per use today (stick: fuel and lightable; berry: food). True to the code and the cost is stated.
- **The added example „Zasil — ognisko (1 patyk)”.** Matches `tests/view/program-editor.test.mjs:1439` (`actionPriceText(outside, "feedCampfire")` = "1 patyk") and the label form `ACTIONS[kind].label (price)`.
- **The relation `derives from D-310`.** Justified: the sentence cites D-310. D-310 is not changed and says nothing contrary (see m2).
- **Rejected.** The first-item choice has no way listed in *Rejected*; correct under WAY-134 (a way the writer derives never enters it), and the task keeps none for it. Rationale carries the cost, as the template asks, and holds no code or file name.
- `python -B .the-way/elements/common/foundation_check.py` passes; D-362 keeps its fields, and the scope (browser-view, simulation) still fits the first-item rule (it lies in the simulation's price function and the view's text).

## Judgment (2): the three choices left as rows of the questions table

The task excludes no entry (its *Settlements to record* has three rows, all in D-362; "a candidate left out of *Settlements* is no exclusion", WAY-293), so the default holds: a choice that binds after the merge is an entry (WAY-36, WAY-293). Each choice judged by whether, once merged, it binds a later change and no entry says so.

1. **The price in the label of the pick cell (`actionPick`, `program-editor.ts:683`).** What binds — the price is part of the name's text, looks and greys as it does, is in the closed value of the field and in the accessible name of the cell — is now written in D-362 ("in the same text as the name … dims with a greyed cell"; "at every cell … at the action chosen in the panel"). What stays a row is the carrier: a part of `PickCell.label` and not a separate field. A later change that splits it (price in its own span) keeps D-362 true as long as the price stays in the cell and grey with it, so the carrier contradicts no entry; the cost (a consumer comparing the label with the bare action name, whole review O1) is a cost of code, and no consumer does it today. Not a choice that binds with no entry. Agree with the author.
2. **The price function `actionPrice` in `src/browser/sim/program.ts`.** D-362's scope names `simulation`; its sentences bind what the price says (data, forms, follows the character, the first item of a use). That the function lives in the simulation and shares `campfireLightCount` with the effect and the refusal is structure; the one fact that could bind — the price shown agrees with what is taken — is in D-362 in substance ("tells the truth about what leaves the backpack", the "Czysty płomień" violates example, and now the first-item cost). A later move of the function breaks no entry. The part map is not made false (`browser-view` already imports the data of `simulation`). Not a choice that binds with no entry. Agree.
3. **The shape of the extinguished icon data `CAMPFIRE.extinguished = { name, icon, iconTitle }`.** That the icon, its file and its credit title stand in data and not in the view is bound by D-18 (content in data files; invariant `content-identifiers`), D-27 (credits by title; invariant `icon-credits`, whose *Rests on* already holds `game-icons-wood-pile-title`) and D-70 (two icons, burning and extinguished). The field names and nesting are code. Not a choice that binds with no entry. Agree.

I also looked for a fourth choice the author's list omits: the energy's forms in data (`NATURE_ENERGY_NAME`) falls under D-362's "the data … hold the plural forms" and "the energy by its full name"; the per-icon statement of change (author's item 6) is an application of `icon-credits`. None is a choice that binds and has no entry.

Verdict on (2): none of the three is a choice that binds and has no entry.

## Judgment (3): foundation made false by the change and missed

- Invariants: read `program-rule-pick`, `rule-state-from-pick`, `icon-file-content`, `icon-credits` (incl. its *Rests on* with `game-icons-wood-pile-title`), `loop2-container-icons`, `terrain-drawing-numbers` whole. None says anything about the label of a pick cell, the price, the plural forms or the number of campfire icons; `rule-state-from-pick` concerns the background, bar and reason of a rule, not the cell text. `terrain-drawing-numbers`: the drawing holds no number (price is in the panel). None made false.
- Glossary: `program rule` (a pair of condition and action) and `extinguished campfire` (no minutes left, burnt out or not yet lit) are true as written; the new icon is drawn for both cases exactly as the entry says. „Price” has no entry and the field's meaning matches D-63, D-175 and D-362 (what an action takes from the backpack and the nature energy); no sentence is read wrongly for lack of one (WAY-95, WAY-297 grade Minor at most) — agree with the author.
- Environment facts: `game-icons-wood-pile-title` is present, with source and read date; the *Rests on* of `icon-credits` lists it. The credit's statement of change (M1) is covered by `icon-credits`. The rule for the form after a count is a language rule of the code and no decision's *Based on* needs it.
- Part map: `assets/icons/**` (trust boundary) and the files of `browser-view` and `simulation` are claimed as before; the range adds no file; `foundation_check.py` reports `0 errors`.
- Other entries touched by the content of D-362: D-288 (a rule's row reads as a sentence; panel changes it), D-289, D-290 (names of the actions), D-293 (the time stays in the row and the panel; the price stands beside it only in the panel), D-310 (reasons unchanged): none contradicted.

## Declined to judge

- The whole change's code, tests, icon and screenshots (reviewed in `review_whole_report.md` and `review_fix_report.md`): not in this range.
- The cell layout where the price wraps (whole review M3): out of this range and the task's cost of answer 2.

## Checks run

| Check | Command | Exit |
|---|---|---|
| head of the range | `git rev-parse HEAD` (in the worktree) = `92e0baed34ab67b6d6765a0281b593c1b997ccc7` | 0 |
| the diff, computed by me | `git diff 0611dfa42e681d1b264e1352fdc6a0d9defcbcfb..92e0baed`, `git log --oneline` and `git diff --stat` of the range: one commit, `foundations/decisions.md`, +4 -4 | 0 |
| whitespace | `git diff --check 0611dfa42e681d1b264e1352fdc6a0d9defcbcfb..92e0baed` | 0 |
| foundation check | `python -B .the-way/elements/common/foundation_check.py` -> `0 errors` | 0 |
| pinned the-way | `git ls-files --stage -- .the-way` = `e3825a82…`; `git -C .the-way rev-parse HEAD` = `e3825a82386a61930a86f8517fc0c5f422fc2833` | 0 |
| clean tree | `git status --short` empty | 0 |
| manual: the claims of D-362 against the code | read `program.ts` (`actionPrice`, `campfireLightCount`, `firstItemFor`, `itemFor`, `actionRefusal`), `run.ts` (`landUse`), `program-editor.ts` (`actionPick`, `actionPriceText`, `actionCellLabel`), `rule-panel.tsx` (cells and the closed value), `react-pick-cell.tsx`, `rule-list.tsx` (no price), `data/campfire.ts`, `data/items.ts`; grep of tests for the example strings | n/a |

Not run: `npm test` and any code test (the handoff forbids it and the range holds no code).

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md` WAY-36 (line 969) and WAY-293 (about line 9293), the entry that gives the return step's rule its precedence: to judge the three choices.
- `.the-way/elements/decisions/template.md` lines 50-75 (*Rejected*, WAY-134, WAY-05): to judge whether the first-item choice needed a *Rejected* way and whether the *Rationale* clause breaks the rule that prose forces nothing on later work.
- `foundations/decisions.md` D-18, D-19, D-27, D-70, D-288, D-293, D-310 (read the text); `foundations/invariants.md` (the six invariants named above, whole); `foundations/glossary.md` (`program rule`, `rule group`, `extinguished campfire`, the list of headings), `foundations/environment_facts.md` (the wood-pile fact), `foundations/part_map.md` (lines on `assets/icons/**` and the parts' files): to judge (3).
- The code files named above (read-only): to verify D-362's claims.
- `reports/review_whole_report.md` lines 23-37 (M3, O1, the table), `reports/review_fix_report.md` not re-read: only to place O1 and M3.

## Unread material

- `review_fix_report.md` and the whole-change review's other sections: not read (not in this range).
- The whole decision log: not read; I read the entries named above whole and found the others by grep (`WAY-36`, `precedence`, `actionPrice`, `firstItemFor`).
- `foundations/invariants.md` was not read whole; I read the six invariants named above whole and searched the file for `campfire`, `label`, `pick`, `plural`.
- `guidelines/*.md` not read (no code in the range).

## Searches not found or unclear

- Not found: any invariant, glossary entry, environment fact or part-map line that the change makes false.
- Not found: a sentence in D-310 that states the first-item rule (see m2); the rule stands only in D-362 and the code.
- Unclear: whether the handoff's "the return step's rule for a choice that binds after the merge" means WAY-36 alone or WAY-36 with WAY-293; I applied both, and the verdict is the same under either.
