# Report — the return step, cycle `drobne-bledy-ekranow`

**Status:** done with concerns (the concerns are code-side findings I may not correct; see "Questions and concerns").

Worktree `.`, branch `task/drobne-bledy-ekranow`; started from `fe15a267`, head after the step `614f28f2`.

## Commits

- `614f28f2` — `foundations/decisions.md` only (+16 −12 lines): D-297, D-318, D-319, D-41, D-19 (*Verification*). No binding sentence changed, so no `decision:` line of a test is touched.

## The foundation compared with the code

What no longer matched, and its correction:

1. **D-297, N-1 of the docs review.** The pair of examples said no test holds the empty group at the edge; `tests/view/program-editor.test.mjs:1614-1624` holds that `ruleArrows` enables the arrow toward it. Corrected: "the arrow toward an empty group at the edge of the program enabled" moved into the *tests* clause; the pair now stands only for where the rule lands in such a group (`moveRule` at the edge is held by no test: the landing cases in `program-editor.test.mjs:1621-1660` use an empty group in the middle). The *violates* line was rewritten to match (the arrow enabled but the rule left where it stands).
2. **D-318.** Its *tests* clause said "…a fight leaving it where it stands". The code (`scene.tsx`, `placeOf` with `reachedX`) and the new test `tests/view/scene.test.mjs:653` (eating, lighting a stick, combat, gathering and patrolling for fibre, each cutting a walk) hold that a walk cut by such an action stops where the walk has brought the mage. Added to the clause.
3. **D-319.** `tests/view/run-screen.test.mjs:1099` ("a walk the player cut by leaving the screen plays no second time on the return…") holds a part of the walk's behaviour that the clause did not name. Added to the *tests* clause: "a walk the player cut by leaving the screen not played a second time on the return, the mage standing at the place of the walk". The pair for the walk itself (a changed target, reduced motion) stays: no test holds those.
4. **D-41 and D-19.** The tests clauses said "a hovered tile and its row marking each other" / "hovering a tile marking its row". `tests/view/world-area.test.mjs:1042` now holds that a hovered tile **not revealed** draws no line and marks no row (the binding sentence of D-41, "this tile and this row of the list of revealed tiles are the same place", implies it). Both clauses now say "revealed" and carry the unrevealed case; D-41's *complies* example says "a hovered revealed tile".

No other entry needed a correction. Compared and found true to the code at the head:

- D-04 (the three sources: `chronicle-entries.ts` from the copy before and after, the window's memory, `reachedX` in `scene.tsx`), D-172 (`copyLacksSentence(name, unsaved)`; the question band passes `true`, so D-173's "the line of D-172 stands under the sentence" is the full form), D-207 and D-208 (the saver tests at `game-saver.test.mjs:525` and `:559` exist; D-208 needed no word), D-285 (`menu-bar.tsx` outside click; tests `:288`, `:318`, `:332`), D-294 (`startsNewCopy`, `switching` in `program-panel.tsx`; tests `:592`, `:615`, `:646`), D-306 (`holdingTarget`; test `:1992`; the pair keeps the number left without Enter and the deleting, which no test holds), D-342 (`chronicle-entries.ts`; the pair keeps the edits after a completion), D-350 (the *Rejected* names deleting the rule, as D-306 does), D-381 (`app.ts` `focusCardOnForms`; the six tests of `login-card-focus.test.mjs` exist under those titles).
- The decisions in play and not changed: D-316, D-322, D-336, D-348, D-370, D-371, D-396, D-421, D-208 — read, and no sentence or clause of theirs disagrees with the code (D-421: the comments of the stylesheets only changed; D-348 names no wording of a changed rule; D-396 untouched).
- **D-144 (the wolf's program, no unit).** Judged: the unit does not belong there. D-144 states the wolf's rules as game data (`creatures.ts`), which `tests/sim/combat.test.mjs`, `data.test.mjs` and `encounters.test.mjs` quote with six `decision:` lines of the binding sentence, none of which shows a screen; the sentence with „pkt” is the crossing screen's text (`combat-line.ts`, held by `combat-line.test.mjs`), and no decision holds that text. Writing „8 pkt” into D-144's binding sentence would break those six quotations, which I may not re-quote. Left as it is.
- Row 10 and row 16 of *Settlements to record*: no entry, as the handoff says. Row 16's code and test are in the diff (`conditions.ts` `unit`, `tests/sim/data.test.mjs`).

Part map: the one file the change adds, `tests/view/login-card-focus.test.mjs`, is claimed by `tests/view/**` of browser-view; no file moved or removed; the map needs no change (`foundation_check.py` also reports no unclaimed file). Glossary: read whole; the change uses "copy", "streak" and "moment of saving" in their entries' meanings; no term to correct or add. Invariants and environment facts: nothing the change rests on is new; none written.

## Entries written or changed

Decisions: D-297, D-318, D-319, D-41, D-19 — *Verification* only. Invariants, environment facts, glossary terms, part-map changes, projected entries: none. No row of *Settlements to record* went anywhere new (rows 1–9, 11–15 and 17 were written by the foundation step and fix 1; rows 10 and 16 are data, code and test).

| Entry | Mark | English | Polski |
|---|---|---|---|
| D-297 *Verification* | the cycle's | The arrow toward an empty group at the edge is held by a test; the pair keeps only where the rule lands there. | Strzałka ku pustej grupie na brzegu jest trzymana testem; para zostaje tylko dla miejsca, w które wpada reguła. |
| D-318 *Verification* | the cycle's | A mage whose walk an action that leads nowhere cuts stands where the walk has brought it. | Mag, któremu czynność bez celu przerwała marsz, stoi tam, dokąd marsz go doprowadził. |
| D-319 *Verification* | the cycle's | A walk cut by leaving the screen is not played again on the return; the mage stands at the walk's place. | Marsz przerwany wyjściem z ekranu nie gra się drugi raz po powrocie; mag stoi w miejscu marszu. |
| D-41 *Verification* | the cycle's | A hovered tile not revealed draws no line and marks no row. | Najechany kafelek nieodkryty nie ma linii i nie zaznacza wiersza. |
| D-19 *Verification* | the cycle's | Hovering a tile not revealed marks no row. | Najechanie na nieodkryty kafelek nie zaznacza żadnego wiersza. |

(The marks are "the cycle's" only in the sense of the request's list: each is a correction of a clause to what a test of this change holds, no new choice; none changes a binding sentence.)

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` (at the edited tree, then the same commit) | 0 | `0 errors`; log `reports/return-step-foundation-check.log` |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 142 warn, 7 info`, as at fix 1; log `reports/return-step-check-instructions.log` |
| Foundation check before my edits | same command at `fe15a267`, run at the start | 0 | `0 errors` |

Not run: the full suite and any test (the handoff forbids the suite; only `decisions.md` changed and no `decision:` line was touched, so the foundation check is the check that reads my change). The `decision:` lines of the cycle's tests still begin a sentence of their decision (the check above, item 6 of the handoff).

## Own-work check

Requirement most likely not met: a *Verification* clause that says a test holds what it does not, or a pair that still says "no test holds" what a test holds. Check: for each clause I added, I read the cited test at the head: D-318 against `scene.test.mjs:653` (five named cases, each cut walk stops at 62.7976 %, `walking` false), D-319 against `run-screen.test.mjs:1099` (the mage and badge stand at 42.8571 % with no `--walk-start` after `animationcancel`), D-41 and D-19 against `world-area.test.mjs:1042` (title: no line, no row), D-297 against `program-editor.test.mjs:1614-1624` (`ruleArrows(emptyAtEdges, 2, 0)` = `{ up: true, down: true }`), and a grep of the titles for existence (`grep -n '^test('` of the files). A positive control for the landing part left in the pair: the landing cases at `program-editor.test.mjs:1621-1660` use groups A, B (empty, middle), C, so none puts a rule into an empty group at the program's edge, and the pair stays right. It showed no fault. What it cannot show: that the tests of an entry I did not touch hold exactly what their clauses say; I compared the entries the cycle changed and those named in the handoff, not every clause of the log.

## Questions and concerns

1. **Test titles and comments that still write a condition's number with no unit (fix 1 named them; I may change no tests or comments):** `tests/view/rule-editor.test.mjs:1127` (the title „Zapas poniżej 8 · Patyk → Zbierz — Patyk”) and `tests/view/program-panel.test.mjs:1044` (a comment). One word each; the orchestrator may have the author of the change add „szt.” (a comment and a title only; nothing checks them).
2. **D-319's pair** still says "a target changed half way turning the mage from where it stands" is held by no test. The new case at `scene.test.mjs:653` quotes D-319's "A target that changes on the way turns the mage from the place it has reached" but exercises targets that lead nowhere only; no test changes the target of a walk to another place. I left the pair as it was (true), and did not move that sentence into a clause.
3. **D-316's verification** speaks of "the place the mage keeps" read from the scene's previous reading, while D-04 now names the place "the browser gives for the mage while it walks" (the settlement of row 4). They do not contradict (D-316 derives from D-04); I made no change, as the task keeps D-316 unchanged. A later reviewer reading D-316 alone would not find the browser's place named there.
4. The D-285 pair (the real-browser part) stays whole, as at fix 1; it is still true that the imitation proves it only with the focus the test gives.

## Reaches beyond the handoff

- `src/browser/view/scene.tsx` (`placeOf`, `reachedX`, `walkEnded`), `terrain-drawing.tsx`, `tile-table.tsx`, `program-panel.tsx`, `end-question.tsx`, `app.ts`, `menu-bar.tsx`, `character-screen.tsx`, `headquarters.tsx`, `chronicle-entries.ts`, `combat-line.ts` (diffs), `src/browser/styles.css` (diff), `tests/view/scene.test.mjs`, `run-screen.test.mjs`, `world-area.test.mjs` (the added tests): to compare each clause with the code and the tests.
- Decisions read beyond the handoff's list: D-19, D-70, D-385 (the hovered tile and the fire cell), D-283, D-284 (leaving a screen), D-173, D-225, D-226, D-303, D-313, D-363, D-376, D-18 (the neighbours of the changed sentences). D-70 and D-385 needed no change: the fire cell's spans are a support of the look, which the test itself says is checked in the browser (D-88), and no sentence of those decisions names the markup.
- `a directory of the author's user profile` (the commit rules, by the instructions).

## Unread material

- `.runs/task-cycles/drobne-bledy-ekranow/decision-index.md`: read lines 1–566 of 1235 (the decisions I needed were read in `foundations/decisions.md` directly).
- `.runs/task-cycles/drobne-bledy-ekranow/plan.md`, `sections.md`, `cycle.md`, `carry-to-whole-review.md`, `review-whole-report.md`, `review-docs-report.md`, `review-fix-1-code-report.md` and the slice reports: not read (the docs review of fix 1, the fix report and the foundation entries report were enough).
- `.the-way/elements/decisions/skill/SKILL.md`, `.the-way/elements/glossary/skill/SKILL.md` and the other element skills: not read, because I wrote no new entry and changed only *Verification* clauses and examples, by the rule the return step file gives (`return_step.md`); the foundation check passes.
- `foundations/decisions.md`: not read whole (11 359 lines); I read each entry named in the handoff whole, except D-336, D-370, D-371, D-396 and D-421 and D-04 *Rationale*, which I read in the part their sentence and *Verification* hold and found nothing the code changes; and the others listed under "Reaches".
- `guidelines/styleguide-browser-view.md`: searched by grep (focus, Konto, unit, hover, walk, link-highlight) and read at lines 540–620 only.
- The code of `rule-list.tsx`, `rule-panel.tsx`, `program-editor.ts`, `game-saver.ts`, and the other tests of the change: diffs of some not read; the claims about them rest on the fix-1 reviews and the foundation check.

## Searches not found or unclear

- Not found: a test that a rule's panel closes when its rule is deleted (D-306's pair keeps it, as at fix 1); a test of `moveRule` into an empty group at the edge of the program (D-297's pair keeps it); a test that a changed target of a walk to another place turns the mage from where it stands (D-319's pair).
- Not found: any entry of the foundation that states how the wolf's rule or a condition's number reads on a screen, in a form the unit would make false, other than D-144, which is data (judged above).
- Unclear: none.

## Working copies

None remained. I made no worktree, clone or screenshot. Two log files of the checks were written first to `.runs/` of the worktree, copied to `reports/` as `return-step-foundation-check.log` and `return-step-check-instructions.log`, and the originals removed. The directory `.runs/return-step/` was not needed and was not created.

## Fix 2 range

Compared: `614f28f2..faf603a0` (one commit, `src/browser/view/program-panel.tsx`, +4 −2) with the entries it touches: D-313 (read whole: the button of the band and of the end-of-run window adds the rule at the end of the copy's first group and opens its panel on the field it filled), D-306 (the panel stays open, goes with its rule to another group, closes with „✕”, Escape, another rule or deleting the rule), D-350 (the panel of a folded group stands under its header), D-294 (a new copy has every group unfolded), and the *Verification* of D-313 and D-306 against the tests named in the fix report (`tests/view/end-window-game.test.mjs:1022`, the focused runs of `program-panel`, `run-screen`).

Result: **no change**. The fix only reorders two statements of `addDiscoveredRule` (`opening` is set after `controls.editCopy`, before the final `draw()`): the behaviour the decisions give is the one the code has again. D-313's tests clause already names "the same button in the end-of-run window that names a discovery, closing the window and then adding the rule with its panel open", which is the case the failing test holds and which passes after the fix. D-306 and D-350 say what closes the panel and where it stands; neither says anything about when the view is asked to open it, so no sentence or example is made false. The panel's closing "for good" where its rule is missing (slice 8) agrees with D-306 ("as does deleting the rule"); no decision promises the panel to survive a draw in which its rule is absent, so none needs a clause for the order of the request. No commit of mine for this range.

Checks: `python -B .the-way/elements/common/foundation_check.py` at `faf603a0` → exit 0, `0 errors` (log `reports/return-step-fix-2-foundation-check.log`). Not run: any test, the full suite. Unread: the fix report's logs; D-350 and D-294 read for their binding sentences only, not re-read whole in this pass. Working copies: none.
