PASS 0894f755dacc2d82190640ea6cbec92e64f5f4e8

# Review of the return step's commits — task koniec-przejscia

Range `4ef0789c..0894f755` (confirmed: `git rev-parse HEAD` is `0894f755dacc2d82190640ea6cbec92e64f5f4e8`; `git log` shows one commit, `0894f755`; `git diff --stat` shows `foundations/decisions.md` only, +54 -9). The range holds no code. Everything below was read against the code at the head (`git diff 211a4ea..0894f755`, not changed in this range).

Counts: blocking 0, Minor 8, out of scope 0.

## Findings

No Critical and no Important finding. Each new or corrected binding sentence was compared with the code; where a sentence differs from the code it is listed below as Minor, with the sentence and the code beside it.

### Minor

**M1. D-362 *Rationale* still says the keyboard work is to build.**
Place: `foundations/decisions.md`, D-362, *Rationale*, "Accepted with it: … the keyboard, Escape and the return to the window are to build; …" (line of the entry, unchanged by this range).
Why: the return step corrects what no longer matches the code (WAY-11). The keyboard, Escape and the return to the window are built (`end-window.tsx` `onKeyDown`, `run-screen.tsx` `focusHeaderButton`, `game-view.ts` `openWindow`) and the new D-364 now holds them, with its own "Accepted with it" for the keyboard. In D-362 the sentence reads as an unbuilt cost after the merge.
Evidence: D-364 binding sentence and *Rationale* against the D-362 sentence; the code above.

**M2. D-364 *Rationale* says an effect of the end on the scene "is seen before the window opens".**
Place: D-364, *Rationale*, "Accepted with it: the covered screen, the scene included, is not seen while the window stands, so an effect of the end on the scene is seen before the window opens or after „✕”".
Why: in the code the window opens at the game minute of the end (`game-view.ts`: `if (ended) endWindowOpen = true;`), so no effect is seen before it opens. The half-sentence rests on the delayed opening that the task gives to a later task (task, Question 1 (a): "do zadania 19 otwiera się od razu"). It states what the product does not do today, and it points to later work in a place where the entry should state the present.
Evidence: `game-view.ts` (the `ended` line); task Question 1 (a). The rest of the sentence (seen after „✕”) holds.

**M3. D-364 asks "where does the keyboard go?" but leaves out one place the code sends it.**
Place: D-364 question and binding sentences; code `game-view.ts` `restart()` (`if (fromWindow && !halted) runScreen.focusHeaderButton("Restart")`).
Why: after „Restart” pressed in the window the focus goes to the header's „Restart”. A test pins it (`tests/view/end-window-game.test.mjs:583`, "with the header's „Restart” focused"), and the slice-4 report lists it as its choice 4 with a rejected way (the run screen element). The return report leaves it as a row of the questions table, "binds nobody", but a change of it is a change of where the keyboard goes, which is the question of D-364. The binding sentence names „✕” and Escape only.
Evidence: `game-view.ts` `restart()`; `tests/view/end-window-game.test.mjs:583`; `slice-4-report.md` choice 4.

**M4. D-363 does not say one refusal of the load that is part of its closed list.**
Place: D-363 binding sentence ("the load … refuses a record whose …") against `src/browser/sim/saved-game.ts` `currentActivity`: `if (doing.kind === "rule" && isCombatAction(doing.action)) refuse();`.
Why: the load refuses a document whose activity going on holds a combat action, so that no game minute counts to a kind outside the closed list; `run-record.ts` `minuteKind` casts on the strength of it. This is a refusal of a trust-boundary reader, beside the record's own refusals, and a later task adding a combat action that can be started outside a fight would meet it only in the code comment. The return report calls it "a code consequence of the closed list" and keeps it out of the entry; the closed list is D-363's, so the consequence is too.
Evidence: `saved-game.ts` (the line above), `run-record.ts` `minuteKind` comment, `slice-1-report.md` choice 4.

**M5. D-363 uses "the plain map run that earning loops share", a phrase the foundation does not define.**
Place: D-363 binding sentence, *Verification* (violates: "the plain map run of an earning loop"), *Rejected*.
Why: the phrase comes from the code (`MapRun` against `GameMapRun`, `plainMapRun` in `saved-game.ts`); the glossary and the other entries hold no "plain map run" (searched: the only hits are D-363 itself). "The map run of the game state" and "the plain map run" read as two things the glossary does not tell apart, and the reader meets them in the sentence that decides which of them holds the record. Understandable by contrast with "earning loops", so Minor (WAY-104 grading), not a glossary finding that a sentence would be read wrongly.
Evidence: `grep -n -i "plain map run" foundations/*.md` (three hits, all in D-363); `foundations/glossary.md` entries `map run`, `manual map run`.

**M6. *Rejected* of D-363 and D-324 omits ways the plan and the reports name.**
Place: D-363 *Rejected*; D-324 *Rejected* and *Rationale* (unchanged by this range).
Why: the handoff asks for the ways the plan and the reports name, each with its cost.
- D-363 omits: counting in `minuteBeforePick` of `run.ts` (plan *Choices*, row 2: touches the shared minute and the earning loops, and the span-split invariant is checked there for every map run); a sparse record with an absent key for 0 (slice 1, choice 1); carrying the old record through „Restart” (slice 1, choice 2). The statement binds "again at „Restart”" and "a count for every kind", so the last two are ways against its own sentences.
- D-324 gained the rule that „Koniec przejścia” of the header closes the question and opens the window, but its *Rationale* and *Rejected* say nothing of it. Slice 4, choice 2 names the ways rejected (hiding the button while the question stands; ignoring the press) with the cost (a player loses the question).
Evidence: plan *Choices*; `slice-1-report.md` lines 101–102; `slice-4-report.md` line 98; D-324 as it stands.

**M7. D-365 repeats rules that D-362, D-311, D-173 and D-132 already state.**
Place: D-365 binding sentences ("it is open when a map run ends …, it becomes open again at every entering …, and „✕”, Escape and the question close it") against D-362 ("opens again at every entry … after leaving by the menu bar and after a reload too", heading "how does it open and close?"), D-311 ("it opens again at every entry …, and it closes when the question … stands"), D-173 ("the window closes when the question stands and stays closed after „Wróć”").
Why: the template moves a sentence that an older decision answers in passing to the new decision (WAY-19). D-365's own question is who remembers and where the button stands; the opening and closing rules are D-362's question, and they now stand in four entries, so one change of the rule means four edits. The sentences agree today (checked against `game-view.ts`: `endWindowOpen` set at the end, at the build and at every entering of an ended run's screen; closed by `closeWindow`, `askToEnd`; `windowShown()`).
Evidence: the four entries side by side; `game-view.ts` lines for `endWindowOpen`, `windowShown`, `askToEnd`, `show`.

**M8. D-311 lists „Koniec przejścia” after „Zakończ”, while D-365 and the code put it before „Restart”.**
Place: D-311 binding sentence: "The header holds … „Pauza” or „Wznów”, the pace, „Restart”, the warning of a cut trip plan and „Zakończ”, and after the end of the map run „Koniec przejścia”, which opens the end-of-run window."
Why: read as the header's order, the button stands last; D-365 says "in the header before „Restart”" and `run-header.tsx` renders it before „Restart” (`{ended && !windowOpen ? … : null}` before the „Restart” button). The sentence of D-311 was corrected in this range for another clause and the order was not touched. A reader may take "after the end" as time, so Minor.
Evidence: `run-header.tsx` diff; D-311 and D-365.

## What was checked and found true

- D-363 against `src/browser/sim/run-record.ts`, `types.ts` (`GameMapRun`, `RunRecord`, `MinuteKind`), `game.ts` (`startRun` spreads `startRecord`, `advanceMinutes` calls `nextRecord` with the map run before the minute and after it, the minute of the end included; `restart` goes through `startRun`) and the reader `saved-game.ts` `record()`: longest streak in `[streak, minute]`, keys exactly those of `MINUTE_KINDS` (`fields` refuses a missing or extra key), sum equal to `minute`, items rising in the order of `ITEMS` (a repeated item refused by `tripList` and by the strict order), pieces not above `carryingCapacity`. The trust boundary reader agrees with every sentence about how a load reads the record (the extra refusal is M4). `SAVED_GAME_VERSION = 4`, one rise.
- D-364 against `styles.css` (`.end-window`: width 100 %, `max-height: 80vh`, body `overflow-y: auto`, heading and buttons outside the scrolling part), `run-screen.tsx` (`hidden={covering}` on the header and the three areas; page scroll to the top when the window appears and in `focusWindow`), `end-window.tsx` (focus once on mount, `onKeyDown` on the root, no `aria-modal`, no trap), `game-view.ts` (`focusOwedWindow` for a window built before the page places the game).
- D-365 against `game-view.ts` and `run-header.tsx`: the memory is a boolean of the view, not in the game state; the header button stands only while the run has ended and the window is closed; `closeQuestion()` plus open in `openWindow`.
- D-324 correction against `openWindow` (closes the question as „Wróć” does — the map run has ended, so there is nothing to set going — then opens the window); *Relations* and the two examples agree.
- D-311 and D-362 corrections ("Escape pressed in it (D-364)"; the focus clause moved to D-364) agree with `end-window.tsx` and `run-screen.tsx` (`windowControls.close` moves the focus to „Koniec przejścia”).
- D-339: the two corrected sentences keep the meaning of D-338 and D-339. D-338 is untouched. The old words ("keeping its version", "keeps its shape and its version") became false when the version rose for the run record, and the new words say the chronicle brings no new version. A search of the foundation for the version of the save found no other sentence that now says 3 or says the version never changes.
- Template and rules: each new entry has the question, one to three binding sentences, *Scope* (parts of the part map), *Based on*, *Relations*, *Verification* (a pair of examples, no invariant named), *Origin* (the task document's items, questions and rows, checked against the task and the file exists in the vault), *Rationale*, *Rejected*. No forbidden words in the added lines (`should`, `will`, `must`, capitals, `MVP`, `later`, `TODO`: none). The marks `the cycle's` are right: no row of *Settlements to record* and no projected entry holds the three whole.
- Nothing deferred is listed for later. No entry was written for a choice that binds nobody: the choices the return report keeps as rows of the questions table (slices 1 to 7, fix 1) are details of one file or one rule of the stylesheet, except M3, M4 and M6 above.
- The part map entries `browser-view` and `simulation`: the new files stand under patterns they hold; no line is needed. The invariants `save-version`, `death-settled-once`, `minute-span-split`, `content-identifiers`, `browser-view-token-values` read whole; none is contradicted by D-363 to D-365 or by the corrections. No invariant test changed in this range.

## Declined to judge

- The questions of whether D-363 to D-365 should name invariants in *Verification* (`save-version`, `minute-span-split`): the template makes the pair of examples optional and the names only where invariants derive from the decision; I set it aside as a choice of the writer.
- The code, tests, guidelines and styleguide of the change: reviewed and passed before this range; the range holds none.
- The wording of the window's heading in D-362 (the return report's "M4 contested"): left as the foundation step worded it, the handoff gives it as settled.

## Checks

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `0894f755dacc2d82190640ea6cbec92e64f5f4e8`, as dispatched |
| `git log 4ef0789c..0894f755`, `git diff --stat 4ef0789c..0894f755` | one commit, `foundations/decisions.md` only |
| `python -B .the-way/elements/common/foundation_check.py` (no switch), run from the worktree root | exit 0, `0 errors` |
| search of the added lines for forbidden words and for "later", "TODO", "to build" | none in the added lines; "to build" stands in the unchanged D-362 *Rationale* (M1) |
| `grep -n -i "plain map run" foundations/*.md` | three hits, all D-363 (M5) |

No focused test was run: the range holds no code and the handoff names only the foundation check. The claims about code were compared by reading, not by running. I did not run the product's tests; the executors' logs under `reports/` were not read as evidence.

## Reach beyond the dispatch

- `slice-1-report.md`, `slice-3-report.md`, `slice-4-report.md` (lines with "Rejected" and the choices): to see which ways the executors name as rejected, for M3 and M6.
- `src/browser/sim/data/actions.ts`, `src/browser/sim/run.ts` (`minuteBeforePick`, `finishMinute`), `src/browser/sim/game.ts` (`startRun` callers, `restart`, `advanceMinutes`): to check what "at its start" and "ordinary actions" mean in D-363.
- `src/browser/styles.css` (`.end-window*`), `tests/view/end-window-game.test.mjs` (grep for the focus after „Restart” and „Konto”): for D-364 and M3.
- `foundations/glossary.md` entries `map run`, `manual map run`, `earning loop`, `streak`, and a search for "plain map run": for M5.
- The vault file `koniec_przejscia_loop2.md` (existence only): for *Origin*.
- Scratch files in the session scratchpad `a scratch file outside the repository` and `inv.py` (read-only printers of an entry); nothing in the worktree, its index or branch was changed.

## Unread material

- Entries of the dispatch's list read whole: D-363, D-364, D-365, D-362, D-311, D-324 (from the diff and the entry), D-339, D-338, D-206, D-212, D-213, D-285, D-173, D-122, D-132, D-135 (D-324 read as it stands in the diff and its examples; not re-read in a separate printout). The five invariants read whole. `foundations/part_map.md`: `browser-view` and `simulation` read whole.
- Not read whole: D-280, D-207, D-208, D-348, `.the-way/elements/decisions/examples.md`, `.the-way/elements/decisions/skill/`. D-280 matters for the width clause of D-364 (checked in `styles.css` instead: width 100 % of the screen's element).
- `plan.md`: *Choices* and *Coverage* read; slices 1 to 7 (lines 34 to 99) not read.
- Code read only in the passages above: `end-window.tsx` whole; `game-view.ts`, `run-screen.tsx`, `run-header.tsx` as the diff `211a4ea..0894f755` shows them; `saved-game.ts` as the diff and the helpers `fields`, `tripList`, `count`; `end-window-lines.ts`, the tests and the styleguide not read.

## Searches not found or unclear

- Not found: a sentence in the foundation that says in which order the sections of the part "why" stand (the task carries this as "Questions carried to cycle" 3). D-362 lists them in the order the code draws them, so the order is implied by the list; no entry says it is the order. Not a finding, since the list reads in order and the code agrees.
- Unclear: whether "does not name a count" in the template's rule for *Rationale* reaches "the file of design tokens" in D-364's *Rationale*. D-48 and D-43 use the same phrase as a name of a part of the product, so I did not grade it.
- Unclear: the handoff says to read "D-285, D-173, D-122, D-132, D-135 and what each links to as far as you need"; I followed links only as far as the claims needed.
