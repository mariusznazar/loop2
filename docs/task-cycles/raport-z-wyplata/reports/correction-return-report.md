# Correction return report — the return step again, for what the correction touched

**Status:** done. **Commits:** none (nothing no longer matched). **Check:** `python -B .the-way/elements/common/foundation_check.py` → `0 errors`, exit 0, on `76389bff` with a clean tree; no commit was made, so none after one. The full gate was not run.

## Foundation compared with code

- **Invariant `loop-practice-payment`, read whole** (`foundations/invariants.md`): sentence "The practice an earning loop gathers is never added to its character's skills twice, whichever of „Odbierz” and the stop of the loop pays it and whether the completion of the map run it was gathered in came between."; *Method* test, *Rests on* none, *Derives from* D-189 · D-241 · D-245 · D-246, *Part* simulation, *Violated* no. Compared with `src/browser/sim/loop.ts`: only `takeLoopPractice` (the player's „Odbierz”) and `stopLoop` (the stop) add `waitingPractice(loop)` to a character's skills; `endLoopRun` at a completion only adds the run's practice to the loop (`sumPractice(practice, run.practice)`) and never to the skills, and `takeLoopPractice` empties `loop.practice` and the running map run's `practice`, so nothing paid can be paid again by a later take, completion or stop. The sentence matches the code. *Part* simulation fits: the files are in `src/browser/sim/`.
- **The three tests that cite it** (`tests/sim/loop.test.mjs`, lines 878, 924, 952): "taking the practice pays what the loop and its map run going on gathered, empties both …" (checks the emptying that the "never twice" rests on), "practice taken is paid once: the completion … adds only what came after, and so does the stop" (a completion between „Odbierz” and the stop; skills end at exactly what was gathered) and "taking the practice twice in a row pays it once …" (a second „Odbierz” pays nothing). Each checks the sentence as worded; `trip-run-end` stays at lines 627, 692, 814, where items are checked. Nothing to correct.
- **The mirror between *Derives from* and *Verification* (WAY-12), checked both ways:** the invariant names D-189, D-241, D-245, D-246; each of them names `loop-practice-payment` in its *Verification* (`foundations/decisions.md` lines 3695, 5119, 5249, 5297 — D-189 beside `solved-map-manual-run · trip-transfer · trip-run-end`, D-245 beside `trip-run-end`, D-241 and D-246 alone); no decision names it that the invariant does not name. Each of the four decisions was read whole earlier in this cycle; their binding sentences say what the invariant says (D-189: practice is added at „Odbierz” and at the stop; D-246: after „Odbierz” it is gone until the loop gathers more; D-241: the loop holds only what was gathered since the last „Odbierz”; D-245: the stop pays what D-189 gives). No *Relations* change is asked: the invariant takes none, the decisions' *Relations* are unchanged by the correction.
- **The guideline sentence** (`guidelines/coding-browser-module.md`, lines 290–293): "… rodzaje `secondary`, `tab` i `main`, a zwykły przycisk z tekstem w `positive` („Odbierz” w raporcie Siedziby) to rodzaj `positive` (D-44)." Compared with `src/browser/view/controls/button.ts` (`ButtonKind` has `"positive"`, `createButton` adds the class `positive`) and `react-button.tsx` (`ReactButtonKind` has `"positive"`; `kind` goes into the class), and with `styles.css` (`.button.positive` sets text `--positive`) and D-44 (the plain button with its text in `positive` at rest and under the pointer): the sentence matches code and decision. The guideline's own sentence just before it ("Rodzaj przycisku ustawia `kind` w obu postaciach") and the one after it (the React forms, `kind`, `waitingText`, `selected`, `submit`) still hold.
- **The part map and the glossary** — unchanged by the correction; no word is used against its entry.

## Decisions written or changed
none in this step (the correction's edit of the *Verification* lines of D-241, D-245 and D-246 stands in `950f0751`).

## Invariants written or changed
none in this step. `loop-practice-payment` was reworded in `950f0751` by the correction on the human's remark, under the rule the task and D-189 and D-246 set (as the earlier return report gave).

## Environment facts
none.

## Glossary terms
none.

## Part-map changes
none.

## Projected entries written whole or in part
none in this step.

## Rows of *Settlements to record* written
none in this step.

## Search of the foundation (WAY-33)

- Entries that name `loop-practice-payment`: `foundations/invariants.md` (the entry), `foundations/decisions.md` D-189, D-241, D-245, D-246 (their *Verification*), `tests/sim/loop.test.mjs` (three citations); nothing else in `foundations/`, `guidelines/`, `src/`, `AGENTS.md`. Result: the set of links is closed and symmetric.
- Entries that state the former wording ("… added to its character's skills once …"): none in `foundations/` or `guidelines/`. Found only in the cycle's own files, `.runs/task-cycles/raport-z-wyplata/cycle.md` (the record's *Return step*, line 100) and `request.md` (lines 145 and 152, which quote the old sentence as the reviewer's finding): they are the orchestrator's, not foundation entries, and were not touched; the record's line will read the old sentence until the orchestrator rewrites it.
- Entries that list the kinds of the shared button: `guidelines/coding-browser-module.md` line 290–293 (updated), `guidelines/styleguide-browser-view.md` (the Roles table row of `positive`, "States of shared controls", "Main button, secondary action and tab", the kitchen-sink rule — all updated earlier, each names the `positive` kind), the comments of `button.ts` and `react-button.tsx` (name it), D-44 (names it in its binding sentence), D-274 and D-275 (name `main` and `secondary` only as the looks they settle and add no list of kinds). A grep of `foundations/`, `guidelines/`, `AGENTS.md`, `src/browser/AGENTS.md` for `secondary`, `tab` and `main` as kinds found no other list. Result: none left unmentioned.

## Unread material

Read whole: `correction-return-handoff.md`, `return_step.md` (read earlier, same file), the entry `loop-practice-payment`, the *Verification* lines and binding sentences of D-189, D-241, D-245, D-246 (each read whole earlier in this cycle, not again whole in this step), the sentence and its paragraph in `guidelines/coding-browser-module.md`, `loop.ts` around `takeLoopPractice`, `stopLoop`, `endLoopRun`, `button.ts` and `react-button.tsx` kinds. Not read in this step: `correction-report.md` (my own), `request.md` and `cycle.md` beyond the lines the search found.

## Searches not found or unclear

- No further entry lists the kinds of the shared button (a result).
- No rule says what the return step does for the record's own *Return step* line (`cycle.md` line 100) that quotes the invariant's former sentence: it is the orchestrator's file; flagged here instead of edited.
