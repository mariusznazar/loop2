# Report — executor of slice 27 (programs, the copy and the program list)

**Status:** done with concerns

The concerns are judgment calls the reviewer should look at, not failures: section "Choices"
items 1, 2 and 5, and the parts of D-171, D-172 and D-173 about the role `warning`, which no test
holds (section "Remarks for the human").

## Commits (base `88695aeb73dd01e7f7c1446918f1268b97baef66`)

- `85ddb588` test: :white_check_mark: mark the tests that hold the sentences of the decisions on who owns a program, … with lines decision:
- `c673d87a` docs: :memo: name the tests of D-93, D-164, D-165, D-166, D-167, D-168, D-169, D-170, D-171, D-172, D-173, D-174 and D-384, drop the pair of D-164, D-165, D-168, D-169 and D-170, …, and rewrite the pair of D-93, D-166, D-167, D-171, D-172, D-173, D-174 and D-384 …
- `40366024` test: :white_check_mark: mark the trip-plan tests that hold the sentences of the decisions on who owns a program, the copy's unsaved changes and a save over a changed program with lines decision:

Author address of all three: `mariusznn@gmail.com` (`git log -1 --format=%ae`), as the earlier commits of the branch.

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 119 | 58 |
| `tests/sim/program-list.test.mjs` | 32 | 0 |
| `tests/sim/copy-actions.test.mjs` | 36 | 0 |
| `tests/sim/copy.test.mjs` | 17 | 0 |
| `tests/sim/program-counts.test.mjs` | 11 | 0 |
| `tests/sim/completion.test.mjs` | 1 | 0 |
| `tests/sim/flow.test.mjs` | 2 | 0 |
| `tests/sim/loop.test.mjs` | 3 | 0 |
| `tests/sim/trip.test.mjs` | 4 | 0 |
| `tests/view/program-list.test.mjs` | 8 | 0 |
| `tests/view/program-panel.test.mjs` | 48 | 0 |
| `tests/view/account-screen.test.mjs` | 11 | 0 |
| `tests/view/end-question.test.mjs` | 13 | 0 |
| `tests/view/end-window-game.test.mjs` | 11 | 0 |
| `tests/view/maps-screen.test.mjs` | 3 | 0 |
| `tests/view/previous-save.test.mjs` | 10 | 0 |
| `tests/view/program-editor.test.mjs` | 2 | 0 |
| `tests/view/rule-editor.test.mjs` | 3 | 0 |
| `tests/view/run-header.test.mjs` | 1 | 0 |
| `tests/view/run-screen-state.test.mjs` | 1 | 0 |
| `tests/view/run-screen.test.mjs` | 3 | 0 |

Every test change is lines `decision:` added as comments at the top of a test body; no code, name
or assertion changed, and no mention of a decision number was removed.

### Test files beyond the slice's *Change* (item 5), one line each

- `tests/sim/completion.test.mjs` — D-93; focused run exit 0.
- `tests/sim/flow.test.mjs` — D-164; focused run exit 0.
- `tests/sim/loop.test.mjs` — D-93, D-164; focused run exit 0.
- `tests/sim/trip.test.mjs` — D-164, D-171, D-172; focused run exit 0.
- `tests/sim/copy.test.mjs` — D-93, D-164, D-165, D-169, D-170; focused run exit 0.
- `tests/sim/program-counts.test.mjs` — D-93; focused run exit 0.
- `tests/view/account-screen.test.mjs` (browser-view) — D-93, D-166, D-169, D-173, D-174, D-384; focused run exit 0.
- `tests/view/end-question.test.mjs` (browser-view) — D-169, D-173; focused run exit 0.
- `tests/view/end-window-game.test.mjs` (browser-view) — D-173; focused run exit 0.
- `tests/view/maps-screen.test.mjs` (browser-view) — D-170; focused run exit 0.
- `tests/view/previous-save.test.mjs` (browser-view) — D-167, D-169; focused run exit 0.
- `tests/view/program-editor.test.mjs` (browser-view) — D-93; focused run exit 0.
- `tests/view/rule-editor.test.mjs` (browser-view) — D-93; focused run exit 0.
- `tests/view/run-header.test.mjs` (browser-view) — D-173; focused run exit 0.
- `tests/view/run-screen-state.test.mjs` (browser-view) — D-173; focused run exit 0.
- `tests/view/run-screen.test.mjs` (browser-view) — D-166, D-171, D-173; focused run exit 0.

The browser-view styleguide was not read whole before these edits: see "Unread material".

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before any edit) | 0 | `0 errors`; none of the slice's decisions listed as `held by nothing` |
| `python -B .the-way/elements/common/foundation_check.py` (after the lines, before the log) | 0 | `0 errors` |
| control: one quotation in `tests/sim/flow.test.mjs` changed to `"Programz belong …"`, then the check | 1 | `tests/sim/flow.test.mjs:68: the quotation stands in no binding sentence of D-164`, `1 error`; file restored from its copy, `grep -c Programz` 0 |
| `python -B .the-way/elements/common/foundation_check.py` (final, at `40366024` content) | 0 | `0 errors`; lists 10 decisions `held by nothing`: D-181, D-182, D-184, D-185, D-186, D-188, D-216, D-217, D-218, D-220 — none of this slice |
| `npm test -- <file>` for each of the 19 files of `85ddb588`, one run per file | 0 each | e.g. `tests/view/program-panel.test.mjs`: 53 pass, 0 fail |
| `npm test -- tests/sim/trip.test.mjs` | 0 | 29 pass, 0 fail |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <the 19 files>` | 0 | all files in Prettier style |
| the same Prettier check on `tests/sim/trip.test.mjs` | 0 | in style |
| `git diff -U0 88695aeb -- foundations/decisions.md`, read | — | 13 hunks, each starting at the `- **Verification:**` line of D-93, D-164, D-165, D-166, D-167, D-168, D-169, D-170, D-171, D-172, D-173, D-174, D-384 and ending before `- **Origin:**`; no other line changed |

Not run: the full gate `npm test` with no file (the cycle's run before the request, per the method).
`test_ruff_source_rules` and `test_shellcheck_source_rules` were not run by me; the handoff names them
as failing at the base.

## Own-work check

- **Requirement most likely missed:** "every test that holds a sentence carries a line" — a test of
  one of these decisions standing in a file I did not open.
- **Check:** listed every test file under `tests/` that calls the program and copy acts or reads
  their state (`switchProgram`, `saveCopyIntoProgram`, `saveCopyAsNewProgram`, `discardCopyChanges`,
  `suggestedProgramName`, `programName(`, `pickProgram`, `copyHasUnsavedChanges`,
  `programHasChangesCopyLacks`, `renameProgram`, `deleteProgram`, `ruleCounts`, `countsProgram`,
  `Kopia: `, `Niezapisane`) and compared it with the files already marked.
- **Result:** 9 files not yet judged. In `tests/sim/trip.test.mjs` two cases held sentences and got
  lines in `40366024` ("restart uses the unsaved copy …" for D-164; "saved plan edits stay out of the
  copy …" for D-164, D-171, D-172). In `tests/sim/discovery.test.mjs`, `encounters.test.mjs`,
  `repertoire.test.mjs`, `saved-game.test.mjs`, `tests/view/chronicle.test.mjs`,
  `end-window-lines.test.mjs`, `end-window.test.mjs` and `rule-signs.test.mjs` the counts and copy
  acts are the measure of other decisions (D-92 firings, discoveries, saving, the end-of-run lines,
  signs), not of these sentences; no line.
- A second check of the quotations: the control run above shows the foundation check fails on a
  quotation that is not in the binding sentences, so its `0 errors` covers all 220 quotations.

## The decisions, sentence by sentence

Sentences are numbered by their order in the binding paragraphs. The full list of tests per sentence
as `path:line` (line of `test(` at `c673d87a`) with each case's name stands in
`.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-27-tests-by-sentence.md`; the two
cases of `tests/sim/trip.test.mjs` added later are `tests/sim/trip.test.mjs:281` (D-164 S1) and
`tests/sim/trip.test.mjs:317` (D-164 S2, D-171 S2, D-172). Below, the main cases.

| Decision | Held in whole by tests | Held in part by tests | Held by invariants | Held by nothing | *Verification* became |
|---|---|---|---|---|---|
| D-93 | S2 (`tests/sim/program-counts.test.mjs:142` „identical rules count independently …”, `:170`, `:292`, `:96`; `tests/sim/copy-actions.test.mjs:162`, `:238`, `:328`; `tests/sim/copy.test.mjs:184`; `tests/view/program-editor.test.mjs:162`); S3 (`tests/sim/program-counts.test.mjs:54` „counts stay absent …”, `:111`; `tests/sim/completion.test.mjs:261`; `tests/sim/copy.test.mjs:202`, `:222`, `:299`; `tests/sim/program-list.test.mjs:231`, `:254`, `:291`; `tests/view/program-panel.test.mjs:806`, `:845`; `tests/view/account-screen.test.mjs:4786`) | S1: heading, „Wykonano {n}×”, the group's sum, no count beside a saved program, none in an earning loop (`tests/view/rule-editor.test.mjs:169` „the list stands under the heading „sprawdzane od góry””, `:265`; `tests/view/program-editor.test.mjs:1588`; `tests/view/program-panel.test.mjs:676`, `:1501`; `tests/sim/loop.test.mjs:414`) | saved-program-edit (an edit of a saved program leaves the counts) · trip-plan-progress (a trip-plan edit leaves them) | S1: that the heading stands on both Programy and the screen of a map run (the case mounts the list alone) | pair rewritten |
| D-164 | S1 (`tests/sim/copy.test.mjs:77`, `:99`, `:184`; `tests/sim/copy-actions.test.mjs:328`, `:362`, `:395`; `tests/sim/flow.test.mjs:67`, `:120`; `tests/sim/loop.test.mjs:289`, `:501`; `tests/sim/trip.test.mjs:281`); S2 (`tests/sim/program-list.test.mjs:435`; `tests/sim/copy.test.mjs:77`; `tests/sim/copy-actions.test.mjs:97`, `:179`, `:213`, `:275`, `:328`; `tests/view/program-panel.test.mjs:1227`, `:1245`, `:1331`; `tests/sim/trip.test.mjs:317`) | S3: edited at any time, taking effect at a send, not at a restart, at a switch (`tests/sim/program-list.test.mjs:264`, `:337`; `tests/sim/copy.test.mjs:99`, `:184`; `tests/sim/copy-actions.test.mjs:328`; `tests/view/program-panel.test.mjs:676`) | saved-program-edit: S3's "never in an earning loop already running" and the copy left by an edit of a saved program (its test `tests/sim/loop.test.mjs:501` carries the invariant) · copy-save | none | pair removed |
| D-165 | S1 (`tests/sim/program-list.test.mjs:76`, `:89`, `:107`, `:445`, `:498`; `tests/sim/copy.test.mjs:62`; `tests/sim/copy-actions.test.mjs:213`); S2 (`tests/sim/program-list.test.mjs:362`; `tests/sim/copy.test.mjs:99`, `:202`) | — | none | none | pair removed |
| D-166 | S2 (`tests/view/program-panel.test.mjs:1501`, `:1541`, `:1555`; `tests/view/account-screen.test.mjs:4590`); S3 (`tests/view/program-panel.test.mjs:676`, `:790`, `:806`; `tests/view/run-screen.test.mjs:316`; `tests/view/account-screen.test.mjs:4590`) | S1: Programy holds the list and the panel with the program picked (`tests/view/program-list.test.mjs:73`; `tests/view/program-panel.test.mjs:1571`; `tests/view/account-screen.test.mjs:4590`, `:4631`, `:4681`) | none | S1: the list on the left, the editor on the right | pair rewritten |
| D-167 | S1 (`tests/sim/program-list.test.mjs:89`; `tests/view/program-list.test.mjs:123`, `:145`, `:156`; `tests/view/program-panel.test.mjs:536`, `:555`; `tests/view/previous-save.test.mjs:273`, `:304`, `:339`, `:354`, `:567`, `:631`, `:799`, `:861`); S2 (`tests/sim/program-list.test.mjs:197`; `tests/view/program-list.test.mjs:105`; `tests/view/program-panel.test.mjs:536`, `:642`) | — | none | S3: no act that duplicates a program | pair rewritten |
| D-168 | S1 (`tests/sim/program-list.test.mjs:211`, `:246`; `tests/view/program-panel.test.mjs:845`, `:1348`); S2 (`tests/sim/copy-actions.test.mjs:149`, `:196`, `:249`, `:310`; `tests/view/program-panel.test.mjs:1348`) | — | none | none | pair removed |
| D-169 | S1 (`tests/sim/program-list.test.mjs:76`, `:89`, `:120`; `tests/sim/copy.test.mjs:62`; `tests/view/program-panel.test.mjs:536`, `:555`, `:1311`; `tests/view/end-question.test.mjs:467`; `tests/view/account-screen.test.mjs:4717`); S2 (`tests/sim/program-list.test.mjs:138`, `:164`, `:176`, `:190`, `:445`, `:467`, `:480`, `:489`, `:527`; `tests/sim/copy-actions.test.mjs:262`; `tests/view/program-list.test.mjs:310`, `:325`, `:342`; `tests/view/program-panel.test.mjs:575`, `:1277`; `tests/view/previous-save.test.mjs:389`, `:455`) | — | none | none | pair removed |
| D-170 | S1 (`tests/view/maps-screen.test.mjs:476`, `:549`); S2 (`tests/sim/program-list.test.mjs:377`, `:396`, `:417`, `:429`; `tests/sim/copy.test.mjs:99`, `:139`; `tests/sim/copy-actions.test.mjs:328`; `tests/view/maps-screen.test.mjs:549`) | — | none | none | pair removed |
| D-171 | S1 (`tests/view/program-panel.test.mjs:1178`, `:1348`; `tests/view/run-screen.test.mjs:316`); S3 (`tests/sim/copy-actions.test.mjs:213`; `tests/view/program-panel.test.mjs:1277`, `:1311`) | S2: the line under the heading and the three buttons active or inactive, refused acts (`tests/sim/copy-actions.test.mjs:110`, `:120`, `:129`, `:162`, `:196`, `:262`, `:310`; `tests/view/program-panel.test.mjs:1178`, `:1227`, `:1331`; `tests/sim/trip.test.mjs:317`) | copy-save (saves leave the copy and the streak; a save as new is no switch) | S2: the role `warning` of the line | pair rewritten |
| D-172 | — | the line's text and when it stands, the save at the first click, the line gone after it (`tests/sim/copy-actions.test.mjs:110`, `:137`, `:162`, `:179`; `tests/view/program-panel.test.mjs:1245`; `tests/sim/trip.test.mjs:317`) | none | that the line stands beside the save buttons, and its role `warning` | pair rewritten |
| D-173 | S3 (`tests/view/end-question.test.mjs:395`, `:424`, `:467`, `:534`; `tests/view/end-window-game.test.mjs:745`, `:811`, `:828`, `:867`, `:897`, `:919`, `:960`; `tests/view/run-screen-state.test.mjs:134`; `tests/view/run-header.test.mjs:290`; `tests/view/program-panel.test.mjs:806`, `:1452`; `tests/view/account-screen.test.mjs:4786`) | S1: after a death (`tests/sim/copy-actions.test.mjs:189`, `:249`, `:301`; `tests/view/program-panel.test.mjs:1428`); S2: all but the role (`tests/view/end-question.test.mjs:258`, `:285`, `:344`, `:395`, `:424`, `:703`, `:821`, `:870`; `tests/view/end-window-game.test.mjs:811`, `:828`, `:897`, `:919`; `tests/view/run-screen.test.mjs:285`) | none | S1: the screen after a completion; S2: the role `warning` of the question's sentence | pair rewritten |
| D-174 | S2 (`tests/view/program-panel.test.mjs:1379`, `:1412`, `:1555`) | S1: the pick opening a saved program for editing, the button beside another saved program and gone after a death, the click switching at once and showing „Kopia w przejściu” (`tests/view/program-panel.test.mjs:676`, `:1379`, `:1412`, `:1428`; `tests/view/account-screen.test.mjs:4681`; `tests/sim/copy-actions.test.mjs:404`) | none | S1: that the button stands under the list | pair rewritten |
| D-384 | — | after „Usuń” of the program shown, after „Zakończ” with the copy's program deleted, on Programy for a number of no program (`tests/view/program-panel.test.mjs:642`, `:845`, `:1571`; `tests/view/account-screen.test.mjs:4738`, `:4831`) | none | the case after „Otwarte: {mapa} →” | pair rewritten |

## Pairs added or rewritten (for the human to accept at the merge)

No pair was added. Rewritten, each speaking only of the part no test and no invariant holds:

- **D-93** — For the screens the heading stands on:
  - complies: „sprawdzane od góry” above the rules both on Programy and on the screen of a map run
  - violates: the heading standing on the screen of a map run alone, or on Programy alone
- **D-166** — For where the list and the editor stand on Programy:
  - complies: the list of programs in the left column of Programy and the program editor in the right one
  - violates: the program editor standing on the left of Programy and the list of programs on its right
- **D-167** — For a duplicate of a program:
  - complies: a variant of „Program” made by saving the copy of a map run as a new program
  - violates: a button or an act of the game that copies a program into a new one on the list
- **D-171** — For the role of the line:
  - complies: „Niezapisane zmiany w kopii.” drawn in the colour of the role `warning`
  - violates: the line drawn in the colour of plain text or of another role
- **D-172** — For where the line stands and its role:
  - complies: the line standing beside „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany”, in the colour of the role `warning`
  - violates: the line standing away from the save buttons, or drawn in the colour of plain text
- **D-173** — For the screen after a completion and the role of the question's sentence:
  - complies: a fix made in the copy on the screen after a completion and put into its program by „Zapisz w programie”; the sentence „Zapisać, odrzucić, wrócić?” in the colour of the role `warning`
  - violates: the save buttons inactive, or the copy closed to editing, on the screen after a completion; the sentence of the question drawn in the colour of plain text
- **D-174** — For where the button stands:
  - complies: „Przełącz postać na ten program” standing under the list „Program:” of the panel
  - violates: the button standing in the header of the screen of a map run, or under the program's rules
- **D-384** — For „Otwarte: {mapa} →”:
  - complies: „Otwarte: Las — głębiej →” after the copy's program „Program 2” was deleted, the program editor then showing „Program”, the first program of the list
  - violates: after „Otwarte: Las — głębiej →” the editor left on the deleted „Program 2”, or showing „Program 3” because it stood next to it

Pairs removed: D-164, D-165, D-168, D-169, D-170.

## Choices, with the way rejected and the cost if wrong

1. **Lines inside the test body, not above `test(`.** Item 3 of "Work of every slice" says
   "directly above it"; the earlier slices of this branch put every line `decision:` as the first
   lines of the body (`git diff 45aae5f8..88695aeb`), and the handoff asks to follow their form. I
   followed the branch; a line already standing (`decision: D-44 …`, `D-131 …`, `D-123 …`) stays first
   and mine follow it. The foundation check accepts both places. Cost if wrong: one mechanical move of
   220 lines. This is a small mismatch between the plan's words and the branch's practice (slice.md,
   "adapt and report").
2. **A test that only uses a control on the way to checking another decision gets no line** (the
   spirit of ruling R4). Not marked: the rows of the table `ACTS` in
   `tests/view/account-screen.test.mjs:2308` (rows „Nowy program”, „Zmień nazwę”, „Usuń”, „Zapisz w
   programie”, „Przełącz postać …”, the pick in „Kto idzie”), used by the case „each act of the player
   that changes the game state is saved at once, …” (`:2577`), which checks that each act saves
   (D-207); `tests/sim/completion.test.mjs:269` („the program edited on a map run
   that has completed leaves its streak at 480”), whose assertions are the streak and the completion,
   not the edit; `tests/view/chronicle.test.mjs:547`, `tests/view/rule-signs.test.mjs:182`,
   `tests/view/end-window-lines.test.mjs:262`, `:283`, which cite D-173, D-174 or D-93 for other
   behaviour. The way rejected: a line at every test that would fail if a control of the sentence
   were gone. Cost if wrong: a reviewer may count these as tests holding a part and ask for lines.
3. **R1 applied:** `tests/sim/program-list.test.mjs` „an edit of a saved program leaves the map run,
   its copy, …” and `tests/sim/loop.test.mjs` „editing or deleting the program after the start …” got
   no line for what the invariant saved-program-edit states (loop's case carries `invariant:
   saved-program-edit` above it); the loop case got a line for D-164 S1 only (an earning loop carries
   out a copy taken at its start, a deletion included), which the invariant does not state. The
   Python tests of saved-program-edit and copy-save got no line.
4. **Quotations** run from the start of the sentence a test holds, often to its end, stopping
   earlier for long sentences (D-93 S1, S3; D-164 S1–S3; D-173 S2, S3); the clause `tests:` says which
   part is held. For the pull of D-169 S2 the quotation runs to the sentence's end, so that it reaches
   the clause on pulled names.
5. **D-164 held whole, its pair removed.** "Programs belong to the player, as one list shared by all
   characters" I judged held by the cases where sends and loops of characters take their program from
   the one list of the game state (`tests/sim/copy.test.mjs:99`, `tests/sim/loop.test.mjs:289`);
   "takes effect at the next manual map entry … at the next switch" by the cases where a send and a
   switch take the program's content as it then stands and a restart keeps the copy. The way rejected:
   keep a pair for "one list shared by all characters". Cost if wrong: an agent comparing a change
   that stores a program on a character would have no example; the tests would still fail on it,
   since every send reads `state.programs`.
6. **The roles `warning` of D-171, D-172 and D-173 are unheld.** The tests read the lines' texts and
   classes `copy-line`, `end-question-text`, `end-question-note`, never the role; so each of the three
   keeps a pair for the role alone.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` whole — named by the method's table for a slice.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md`, a `grep` of the `### Slice` headings and
  the *Change* lines of other slices — to see which slices own the test files where tests of my
  decisions stand (end-question, maps-screen, previous-save, account-screen); I read no other section.
- `foundations/invariants.md`, the entries saved-program-edit, copy-save and trip-plan-progress
  whole (found by heading; named by the plan's *Read* with old ranges).
- Test files outside the *Change*: the cases listed above in `tests/sim/flow.test.mjs`,
  `loop.test.mjs`, `completion.test.mjs`, `trip.test.mjs`, `copy.test.mjs`, `program-counts.test.mjs`,
  `saved-game.test.mjs`, and `tests/view/end-question.test.mjs`, `end-window-game.test.mjs`,
  `run-screen-state.test.mjs`, `run-screen.test.mjs`, `run-header.test.mjs`, `chronicle.test.mjs`,
  `maps-screen.test.mjs`, `previous-save.test.mjs`, `account-screen.test.mjs`, `rule-editor.test.mjs`,
  `program-editor.test.mjs`, `rule-signs.test.mjs`, `end-window-lines.test.mjs` — found by searching the
  sentences' texts and functions, as item 2 asks.
- `src/browser/view/program-panel.tsx` and `src/browser/view/end-question.tsx`, a `grep` for the
  classes of the lines — to settle whether any test reaches the role `warning`.
- The user's own rules `the author's rules on writing scripts, outside the repository` and `git.md` — before
  the insertion script and the commits.

## Working copies

- `.runs/executor-27/` in the worktree held the insertion script, a listing script, the logs of the
  focused runs, the foundation-check outputs and a copy of `tests/sim/flow.test.mjs` for the control
  run. Removed with `rm -rf` before returning; `git status --short` is empty. The list of tests per
  sentence it produced is kept as
  `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-27-tests-by-sentence.md`.

## Unread material

- `guidelines/styleguide-browser-view.md` — not read whole: I read its list of headings and searched
  it for "comment", "komentarz" and `tests/`; it holds no rule on test comments. The change adds only
  comments to browser-view test files.
- `foundations/glossary.md` — not read.
- `foundations/part_map.md` — read only by `grep` of its part headings and of the `tests/` paths
  (to name each file's part).
- `foundations/decisions.md` D-73 and D-82 — not read in the log; their binding sentences as the
  frozen task quotes them (lines 90–91) were read.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` — read as the handoff copies it, not
  in the file.
- `.the-way/elements/decisions/template.md` — read lines 105–264 (the plan's three ranges lie inside).
- `tests/view/program-panel.test.mjs` 215–530 and 868–1140 and `tests/view/account-screen.test.mjs`
  beyond the cases named — read only by test name; these cases concern the trip plan, folding,
  focus, rule panels and discoveries.

## Searches not found or unclear

- A test of the role `warning` of „Niezapisane zmiany w kopii.”, of the line of D-172 or of the
  question's sentence — none found (classes only).
- A test that the heading „sprawdzane od góry” stands on Programy and on the screen of a map run — none;
  `tests/view/rule-editor.test.mjs:169` mounts the list alone.
- A test of editing or saving the copy on the screen after a completion — none (after a death only).
- A test of the program shown after „Otwarte: {mapa} →” with the copy's program deleted — none.
- A test of where „Przełącz postać na ten program” stands — none (presence only).
- A test of the left and right columns of Programy — none (layout is the browser's).
- A test that no act duplicates a program — none.
- `tests/view/account-screen.test.mjs:4162` (`#/programy/9`) — unclear whether it holds D-384: it checks
  the screen and the address only, not the program shown; not marked; D-384's address case is held by
  `tests/view/program-panel.test.mjs:1571`.

## Remarks for the human (R3: wording against tests and code; nothing changed)

- `tests/sim/program-counts.test.mjs:16` cites "D-92 and D-93 (foundations/decisions.md:1619,1641)":
  the line numbers are stale (D-93 stands at 1933 at the base); left as it is.
- `tests/view/rule-signs.test.mjs:182`, `tests/view/end-window-lines.test.mjs:262` and `:283`, and
  `tests/sim/flow.test.mjs:149` cite D-174, D-93 and D-173 for behaviour these decisions' sentences
  do not state (signs, the unfired-rules line, shares of time, „Zakończ” dropping the copy); they
  mention the numbers only.
- D-171, D-172 and D-173 say more than their tests do: the role `warning` of the three lines, and
  D-172's placement "beside the save buttons", stand untested (pairs kept for them).
- D-93 S1 says the heading stands on both screens; the test checks the list component alone.

## Questions

none
