FAIL 5b3dac418ed9d744c4e9854b068909b96944be57

# Review of the whole change, pass 2 (documents and foundation) — cycle `drobne-bledy-ekranow`

- Range: `bd82d394e8ea08c77c8c8afb695bd931706f1644..5b3dac418ed9d744c4e9854b068909b96944be57` (26 commits; `git rev-parse HEAD` = the head given; `.the-way` at `bfb2e109`, the pinned commit).
- Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`, read whole.
- Scope: `foundations/decisions.md`, `guidelines/styleguide-browser-view.md`, the `decision:` lines of tests, the 15 rows the foundation agent wrote (1–9, 11–15, 17), rows 10 and 16, and the truth at the head of every changed decision sentence and styleguide row. Code style and defects are pass 1's.
- Counts: Critical 0 · Important 4 (all within the task, all blocking) · Minor within the task 3 · out of scope 4.

## Important (blocking)

### I-1. The foundation check fails at the head with 12 errors, all in `decision:` lines the slices wrote

Anchors and the check's words (`python -B .the-way/elements/common/foundation_check.py`, exit 1, `12 errors`; log `reports/review-docs-foundation-check.log`):

- `tests/view/shared-controls.test.mjs:787` — "the quotation does not begin a sentence of `D-267`" — slice 2, `f4489d36`.
- `tests/view/program-panel.test.mjs:1993` — "the quotation does not begin a sentence of `D-306`" — slice 8, `85e379de`.
- `tests/view/program-panel.test.mjs:617` — "the quotation stands in no binding sentence of `D-174`" (it elides with "..."); `tests/view/program-panel.test.mjs:647` — "the quotation does not begin a sentence of `D-164`" — slice 9, `eb8986aa`.
- `tests/view/login-card-focus.test.mjs:218`, `:233`, `:249`, `:303` — "the quotation stands in no binding sentence of `D-381`" (each begins with "…"); `:269` — the same; `:318` — the same — slice 15, `0f269e61` (218–269) and `dc787331` (303, 318).
- `tests/view/game-saver.test.mjs:527`, `:561` — "the quotation does not begin a sentence of `D-208`" — slice 16, `1130a9be`.

Why it exists and the mechanism: a line `decision: D-NN "…"` binds a test to the sentence of the decision it holds, and the foundation check holds the quotation to start a sentence of the decision's binding text and to stand in it word for word, so that a change of the decision finds every test that quotes it. The slices quoted mid-sentence fragments, elided with "…" or "...", or ended a quotation with a full stop where the decision goes on: `login-card-focus.test.mjs:318` ends „…of the form „Ustaw nowe hasło”.” while D-381 goes on „…„Ustaw nowe hasło” — and the card closes…”. One quotation is not of the decision at all: `tests/view/login-card-focus.test.mjs:269` reads `// decision: D-381 "Where the session check leads to the game instead, nothing changes."` — that sentence is from the Goal of Slice 15 in `plan.md`, and no decision holds it (search of `foundations/`, `tests/` and `guidelines/` for "leads to the game instead" finds that line alone). A test then claims a decision says what it does not say. At `fecbea47` the foundation agent's report shows the check at 0 errors, and the handoff says the base had no failing check. So the errors came in with the slices. None of the slice reports ran the check, because no slice's *Checks* named it; that is a gap of the plan as well.

Effect: the one command runs the foundation check (`AGENTS.md`), so the gate before the merge fails at this head. I inferred this and did not run the full suite, as the handoff asks.

Fix: quote each from the start of a sentence of the decision's binding text, word for word, with no ellipsis and no added full stop. For example, `program-panel.test.mjs:1993` can quote D-306 from „After the last field the panel stays open, and „✕”, Escape or opening another rule closes it, as does deleting the rule; moving the rule to another group, …”, and `game-saver.test.mjs:527` can quote D-208 from „When one fails, …”. Replace `login-card-focus.test.mjs:269` with a quotation of D-381 that the test holds, or with D-225's „after a refusal of the link, whatever its reason, …”, which carries the game for a signed-in player.

### I-2. D-297 changed, but the code comments and test titles of the change still state the old D-297

Anchors:
- `src/browser/view/program-editor.ts:249-254` — „Null only where there is no group to move to: „↑” on the program's first rule and „↓” on its last.” (in the doc comment of `moveRule`, which cites D-297)
- `src/browser/view/program-editor.ts:284` — `/** Whether „↑” and „↓” of the rule at `index` of the named group act: off only at the program's ends. */`
- `tests/view/program-editor.test.mjs:1591` — test title „the arrows are off only on the program's first and last rule, a group's edge being no end”, whose line `:1593` the foundation agent re-quoted to the new D-297 sentence, „so a rule group left empty at the edge of the program takes the rule” included
- `tests/view/program-editor.test.mjs:933-934` — „// D-297: … null only at the program's ends.”
- `tests/view/rule-editor.test.mjs:400` — test title „the arrows are off only at the ends of the program: „↑” on the first rule and „↓” on the last”, whose line `:402` was re-quoted the same way

Why it matters: To do 14 and settlement row 1 make D-297 say that „↑” is disabled only where no rule group stands before the group of the rule, so an empty group at the edge takes the rule. The code does that (`moveRule` returns null only where `program.groups[at + offset]` is missing). Example: take groups [A empty, B with rules 1 and 2]. The program's first rule is B's rule 1, and its „↑” is enabled and moves it into A. The comment at `program-editor.ts:253` says that „↑” returns null there. These files are part of the change: `program-editor.ts` is changed by slices 3 and 6, and both test files have lines changed in `dddbc7d5`. They now restate D-297 more broadly than D-297 says, which is the kind of departure WAY-263 grades Important. They also recreate the very fault the task's *Need* names: an agent that reads the comment literally „naprawi” the code against the decision. The two re-quoted tests also quote a clause they do not exercise, since neither puts an empty group at the edge (D-297's own *Verification* says no test holds it).

Comes from: no slice. It is a gap of the plan's *Foundation entries* row 1 („none — the code and its tests already do it”), and the foundation commit `dddbc7d5` re-quoted the lines of these two tests without their titles.

Fix: reword the comments to say „null only where no group stands on that side” and the titles to say „off only where no group stands before (after) the rule's group”. Better still, add the edge case the *Verification* pair carries (an empty first group, with „↑” on the program's first rule enabled), so the quotation of the clause holds.

### I-3. A test of the menu „Konto” asserts focus on „Konto” after a click on an item of the bar, against the new D-285

Anchor: `tests/view/menu-bar.test.mjs:318-326`, test „a click on an item of the bar, which stands outside the menu, closes it”, which ends with `assert.equal(active(), buttonNamed(page.root, "Konto"));`.

Why it exists and the mechanism: D-285 now says that after a click outside the menu „focus stays where the player clicked, and where that place takes no focus it returns to „Konto””. An item of the bar is a link, and in Chrome, Edge and Firefox (D-396) a click on a link focuses it, so in the game focus stays on the link. The test passes only because the document imitation moves no focus on `press`. Focus therefore stays on „Konto”, which the player pressed to open the menu, and the code's branch for „inside the menu container” keeps it there. Slice 17's own test at `:288` shows the pattern the browser follows: it calls `field.focus()` before `press(field)`, because „A browser focuses the field it clicks before the click reaches the page.” The test at `:318` does not do that. It asserts, as an expectation, the behaviour D-285 rejected: „focus returning to „Konto” after a click outside the menu too” is in D-285's *Rejected*. An agent that takes the test for the specification brings back the rejected behaviour. Its `decision:` line was cut to D-285's first clause in `dddbc7d5`, so the assertion's claim no longer stands on any quotation. This is a file of the change restating its entry differently (WAY-263).

Comes from: slice 17, `2d62c5d2`, with the re-quotation in `dddbc7d5`.

Fix: call `link.focus()` before `press(link)`, as the test at `:288` does, and assert `active()` is that link. The alternative is to drop the focus assertion.

### I-4. D-381's *Verification* says that a card opened after a session check takes no focus, without the two new exceptions

Anchor: `foundations/decisions.md:3093` (D-381, *Verification*): „…no focus taken when the card opens after a session check or an expired save, focus in the first field after a confirmed logout, a logout answered with no session and a set password; …”

Why it matters: D-381's sentence now has the page move focus to the card „after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło””. In the code (`src/browser/view/app.ts:799-804`, `:821-824`, `:599-602`), both of those reach the card through a session check: `showReset` sets `focusCardOnForms` and runs `checkSession()`, and `showForms` then calls `focusCard()`. So the *Verification* clause „no focus taken when the card opens after a session check” is now false for exactly the two cases the task adds, and it lists the focus cases without them. My handoff requires *Verification* to be consistent with the new sentence. The decision is an entry the change writes, and the clause restates it without the qualification (WAY-263). The pair of examples below the clause carries the new cases, but the tests clause a reader meets first denies them.

Comes from: the plan's *Foundation entries* row 17, commit `dddbc7d5`.

Fix: „no focus taken when the card opens after a session check, other than one after a refused emailed link or „Anuluj”, or after an expired save, focus in the first field after a confirmed logout, a logout answered with no session, a set password, a refused emailed link and „Anuluj””. `tests/view/login-card-focus.test.mjs` now holds these cases, so the pair can go too (see M-1).

## Minor within the task

### M-1. Pairs of examples that say „no test holds” what a slice's test now holds

The foundation agent's report says the return step removes such parts. Listed here so that the return step has them all:
- D-306, `foundations/decisions.md:9281-9290`: the move to another group is held by `tests/view/program-panel.test.mjs:1992`. The deletion that closes the panel has no test (slice 8's report says so), so that part of the pair stays.
- D-294, `:8918-8926`: send and switch, held by `tests/view/program-panel.test.mjs:592` and `:615`.
- D-172, `:7962-7972`: the short line, held by `tests/view/program-panel.test.mjs:1415`.
- D-342, `:10578-10583`: the new entry, held by `tests/view/chronicle-entries.test.mjs:71`, `:81`.
- D-207, `:3746-3755`: the send after a failure, held by slice 16's cases in `tests/view/game-saver.test.mjs`.
- D-285, `:4435-4445`: the click on a field and on the background, held on the imitation by `tests/view/menu-bar.test.mjs:288`. The real-browser part stays.
- D-381, `:3093-3095`: held by `tests/view/login-card-focus.test.mjs:217`, `:232`, `:302`.

Why: a pair names what only an agent compares. When a test holds it, the pair is a second copy that drifts. Slices: 8, 9, 10, 11, 15, 16, 17 and the foundation commit.

### M-2. Rule sentences without the unit stand in more decisions than the handoff names

Row 16 says that the number stands with its unit „na każdym ekranie”, and the code writes „Zapas poniżej 8 szt. · Patyk”. These quotations of a row still have no unit:
- `foundations/decisions.md:8807` and `:8839` (D-288)
- `:8947` (D-295, „Temperatura poniżej 35”)
- `:9036` (D-300, „Zapas poniżej 8 · Patyk”)
- `:9200` (D-291, „Zapas poniżej 8 · Patyk → Zbierz — Patyk”)
- `:9403` (D-309, „Zdrowie poniżej 50”)

The handoff names D-288, D-295 and „one more”, so D-300, D-291 and D-309 may be beyond what the return step knows. None of these is a sentence the change writes, and each is an example a reader could copy into a test expectation. Comes from: none (the plan's row 16 named only D-306).

### M-3. The styleguide's sentence on the greyed pick cell grounds the colour of its frame in D-279

Anchor: `guidelines/styleguide-browser-view.md:310-313`: „wyszarzona (stan disabled) ma ramkę przerywaną w `text-disabled` — słowo kluczowe `dashed`, bez nowej wartości — z nazwą też w `text-disabled`, więc ramka ma kolor swojego tekstu (D-279), …”

Why: row 12 asks only to name the frame's colour `text-disabled` and to say there is no highlight under the pointer. The code holds both: `src/browser/styles.css:433-443` gives `border-color: var(--text-disabled)` and `.button.pick-cell.greyed:hover { background: transparent; }`, which outranks `.button:hover:not(:disabled)`. D-279 covers „a frame or a bar drawn at a text to set it apart” — a main button's frame, the bar of an answer, a field's frame in the colour of its message. A cell's frame is the frame of a control (D-40, `control-border`). The citation therefore reads D-279 more widely than it is written, which the task did not ask for. The colour is right, so nothing breaks. Fix: drop „więc ramka ma kolor swojego tekstu (D-279)”, or name the reason as the cell's own state of „cannot be used now” (D-40). Comes from the foundation commit `fecbea47`.

## Minor outside the task's scope

- **O-1** `guidelines/styleguide-browser-view.md:529-540` (new rule „A name typed by the player breaks in its row”): „Reguła dotyczy każdego wiersza z takim tekstem, także nowego”. The rule is right for the task (row 13). But no stylesheet besides `src/browser/headquarters.css:155-160` breaks a typed name: the program names on the list of Programy (D-169 sets no length limit), the name in „Kto idzie” on Mapy, the heading of Postać, and the names of rule groups. A search of `src/browser/*.css` for `overflow-wrap` and `word-break` finds only the Siedziba row, the chronicle and the end-of-run window. So the styleguide now holds a rule several screens break today. I did not check this in a browser. It is outside To do 2, which names the Siedziba row. A follow-up task would need to fix the other rows.
- **O-2** `foundations/decisions.md:65-71` (D-04): the „only from” list now names the page's memory of the end-of-run window (D-371). It still names no other memory of the page the view draws from: the folding (D-294), the tab „Kronika”/„Teren” (D-346), the filter (D-383), and the question of „Zakończ” (D-324). The task chose exactly three sources (question 5), so widening the list is the human's decision. A literal reader finds the list incomplete in the same way the task found it.
- **O-3** `src/browser/view/scene.tsx:742` and `:917` (`effectEnded`, `tintReturned`), and the `onEnd` handlers at `:253`, `:314`, `:356`, `:372`, `:437`, `:501`: the flight, the dust, the wolf's effects and the tint's return end only on `animationend`. Slice 19 found that the browser cancels animations when the screen is hidden and fixed only the walk. An effect cut by leaving the screen may play again on the return, against D-317 („an effect overdue when its turn comes is dropped”) and D-367. I did not verify this, since I did not start the game. It is outside To do 10, which names the walk. It is worth a task.
- **O-4** `guidelines/styleguide-browser-view.md:999`: „Escape czyta korzeń okna, nigdy dokument (D-285)” cites D-285, the menu „Konto”, for the end-of-run window, whose Escape D-370 settles. The sentence predates this change and the change did not touch it.

## What is good

- Rows 1–9, 11, 12 (but see M-3), 13, 14, 15 and 17 each keep the meaning of their settlement and add no decision beyond it. Every *Rejected* the task's „Not chosen” gives is written in: D-04, D-172 (both variants), D-207, D-285, D-297, D-306, D-342 (both), D-350 (row 3's exact words), D-381. D-207's insertion leaves the rest of the sentence as the answer asks.
- Every changed binding sentence is true of the code at the head:
  - D-297: `moveRule` and `ruleArrows`, `program-editor.ts:255-294`.
  - D-306: `holdingTarget`, which follows the rule to the group that holds it, closes on a rule that is gone and keeps the field (`rule-panel.tsx:226-248`). The assumption that rule numbers are unique holds, because the program check refuses a duplicated identity (`src/browser/sim/programs.ts:256-264`).
  - D-294: `startsNewCopy` and the `switching` flag, `program-panel.tsx:262-272`, `:799-818`. The run screen passes every result's events to its panel (`run-entry.ts:260-263`, `run-screen.tsx:292-300`), so a send made from Mapy reaches it.
  - D-172: `copyLacksSentence(name, unsaved)`. The question of „Zakończ” stands only with unsaved changes (D-173) and takes the full form.
  - D-342: `chronicle-entries.ts:267`.
  - D-207: `game-saver.ts:226-230`. `failures > 0` sends, and `sendNow` cancels the planned retry. A too-large refusal resets `failures` and is not resent, as D-208 says.
  - D-285: `menu-bar.tsx:154-168`.
  - D-381: `app.ts:599-602`, `:799-804`, `:821-824`, and `email-confirmation.ts` `refused`. A signed-in player goes to the game and `showGame` clears the flag.
  - D-04: `reachedX` gives the place the browser draws.
- Rows 10 and 16 are carried by the code:
  - Row 10: the comment stands at `src/browser/run-screen.css:743-746`, where the rule now lives.
  - Row 16: units in `src/browser/sim/data/conditions.ts` and the test `tests/sim/data.test.mjs:267-292`, which fails for a condition with a number and no unit. The player's sentence (`program-editor.ts:795-805`), the wolf's sentence (`combat-line.ts:12-21`) and the panel's field (`rule-panel.tsx`, `rule-panel-unit`) read the unit from the data.
- The styleguide rows: row 7 says what D-285 says. Row 11 matches the code: one fill in `text` (`run-screen.css:447-451`) and the legend under the bar (`end-window.tsx:200-213`). The other two items of „Otwarte dla człowieka” stay. Rows 13 and 14 have the template's form: *Decision* none, a one-sentence reason, and no inventory.
- Commit `dddbc7d5` changed only `decision:` comment lines in the nine test files: 32 lines removed and 32 added, and no other changed line (`git show -U0 dddbc7d5 -- tests` filtered for anything but `// decision:` finds nothing).
- Slice 20's argument holds. D-194: „A run cut short by „Restart” or „Zakończ” before completion leaves the character's practice … as they were”. D-201's line shows practice „gathered in that run”. D-199's row shows the character's own practice. So „Eksploracja +1” during the run and „0/15” after „Zakończ” both follow the rules.
- Slice 18 against D-316–D-319: freezing the mage where it stands also at a death or a completion in the middle of a walk agrees with D-322 („nothing but the effect moves while it plays, … and the mage too at a discovery and a completion”) and with D-317. I found no conflict with D-318 listing only the actions.

## Declined to judge

- Slice 12: the keys of the fire-cell spans are their texts, which duplicate with two identical burning items, and an unrevealed hovered tile still gets the class `hovered` — code defects, pass 1's.
- Slice 8: `setOpen(null)` called during render in `program-panel.tsx` — code, pass 1's.
- `foundations/decisions.md:6479`, `:6487` (D-144): „Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz” describes the wolf's program in the data (scope simulation), not a sentence on a screen, so row 16 does not reach it.

## Checks run

| Check | Command | Exit | Result |
|---|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 1 | 12 errors (I-1); log `reports/review-docs-foundation-check.log` |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 errors, 142 warnings, 7 info; log `reports/review-docs-check-instructions.log` |
| ESLint, changed `.ts`/`.tsx` | `npx eslint <the 19 changed .ts/.tsx files>` | 0 | no message; log `reports/review-docs-eslint.log` |
| Prettier, every changed file | `npx prettier --check <the 51 changed files>` | 123 | `foundations/decisions.md` and `guidelines/styleguide-browser-view.md` flagged. Both were already unformatted at the base (`git show bd82d394:<file> \| npx prettier --stdin-filepath <file>` differs from the file), and the rule `### Formatter` of `guidelines/coding.md` holds Prettier to TS/JS. Nothing new; log `reports/review-docs-prettier.log` |
| File sizes | `python -B .the-way/task-cycle/change_file_sizes.py bd82d394 5b3dac41` | 0 | +1281 lines over 51 files; largest growths are `program-panel.tsx` +40, `rule-list.tsx` +41, `styles.css` +23. `guidelines/coding.md` has no rule `### Size of a function and a file`, so there is no size test to run and any finding of structure is Minor; log `reports/review-docs-file-sizes.md` |
| Focused test | `npm test -- tests/view/menu-bar.test.mjs` | 0 | passes, I-3's test included, which confirms that it passes on the imitation; log `reports/review-docs-menu-bar-test.log` |
| `decision:` lines of `dddbc7d5` | `git show -U0 dddbc7d5 -- tests`, filtered | — | 32 removed, 32 added, comment lines only |

Not run:
- The full suite (`npm test` without a file) — the handoff reserves it.
- The look in the running game that the orchestrator carried: the unit beside the number field (slice 4), on the rows of rules and in the wolf's sentence (slices 3, 5), the two forms of the line of a changed program (slice 10), the chronicle entry (slice 11), and the drag-handle move across a group border in a real browser (slice 8). Unchecked, because the handoff forbids starting the local game. Slice 8's move is checked only on the imitation (`program-panel.test.mjs:2025-2045`).

## Reaches beyond the handoff

- `foundations/decisions.md` D-144, D-145, D-146, D-147 (6477–6565): whether the wolf's sentence stands without a unit in a decision about a screen.
- D-225 (3429–3467): what „Anuluj” and a refused reset link lead to, for D-381.
- D-245 (8508–8545): what „Zatrzymaj” does, for row 14.
- D-193, D-194, D-199, D-201 by index: slice 20.
- `foundations/invariants.md` headings, and `tracked-file-private-paths` / `tracked-file-private-names` (1278–1297) whole: whether row 10's comment naming the human breaks an invariant. It does not.
- `src/browser/sim/programs.ts:200-277`: uniqueness of rule identities, for slice 8.
- `src/browser/view/run-entry.ts:200-277`, `run-screen.tsx:280-310`: whether a send from Mapy reaches the run panel, for D-294.
- `src/browser/view/game-saver.ts:120-277`, `app.ts:520-610`, `:770-832`, `scene.tsx` (diff of slices 18–19): the truth of D-207, D-381 and D-04.
- `.the-way/product-guidelines/template.md:39-138`: the form of rows 13 and 14.
- `guidelines/coding.md` headings and `### Formatter`: the size rule and what Prettier covers.

## Working copies

- `.runs/review-docs/` in the task's worktree held the diffs of the two documents, the decision index, the copies of the base documents for Prettier and the logs. What the report needs is kept in `reports/` as `review-docs-foundation-check.log`, `review-docs-check-instructions.log`, `review-docs-eslint.log`, `review-docs-prettier.log`, `review-docs-file-sizes.md`, `review-docs-menu-bar-test.log` and `review-docs-decision-index.md`. The directory was removed. No git worktree or clone was made, and no screenshot was taken.

## Unread material

- **Decisions of my index read whole: 16** — D-04, D-172, D-207, D-285, D-294, D-297, D-306, D-342, D-350, D-381 (every changed one, at the head), D-144, D-145, D-146, D-147, D-225, D-245.
- The index (`python -B .the-way/elements/common/decision_index.py` with 12 sections and the part browser-view: 167 decisions in full by their binding sentences, 126 by heading, plus D-193, D-194, D-199 and D-201 by a second index) was read whole. Of the headings outside the sections I opened D-225 and D-245. I did not open D-156, D-52, D-313, D-88 or D-160, whose questions touch the change; I judged them through the code and the task.
- `guidelines/styleguide-browser-view.md` was not read whole. I read its diff, lines 196 and 218–228, 300–320, 445–455, 520–560, 600–625, 866–876, 992–1002 and 1025–1070, and searched it for every changed decision and for „tile-list”. `guidelines/coding.md` was read by its headings and `### Formatter` only.
- `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `foundations/part_map.md` and `foundations/glossary.md` were not read; pass 1 covers the code and tests.
- Invariants were read by heading only, except the two named above.
- The plan was read whole; the executors' reports were read only for slices 8 (by search), 20 (whole) and the foundation agent's (whole). The other slice reports were searched only for `foundation_check`.

## Searches not found or unclear

- „leads to the game instead” in `foundations/`, `tests/` and `guidelines/` — found only in the test line itself (`tests/view/login-card-focus.test.mjs:269`), not in any decision. The positive control is that the search found the test line.
- A test that deleting a rule closes its open panel — searched `tests/view` for „delet”, „Usuń … panel”, „closes its panel”, „deleting the rule”; none found. Slice 8's report confirms it wrote none.
- `### Size of a function and a file` in `guidelines/coding.md` — not found (headings listed in full), so there is no size test.
- Unclear: the handoff names „D-288, D-295 and one more decision” with an unrounded example; I could not tell which „one more” the return step knows, so M-2 lists all six places.
