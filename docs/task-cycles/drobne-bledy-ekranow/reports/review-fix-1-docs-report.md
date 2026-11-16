PASS fe15a2671b959c3162ff7dea2203c48c0c7f8137

# Review of fix 1, pass 2 (documents and foundation) — cycle `drobne-bledy-ekranow`

- Fix range: `5b3dac418ed9d744c4e9854b068909b96944be57..fe15a2671b959c3162ff7dea2203c48c0c7f8137`, 7 commits (`5ddb7050`, `a3baf310`, `04185e09`, `99e9fe6d`, `b01ec83e`, `1822fbee`, `fe15a267`). `git rev-parse HEAD` = `fe15a2671b959c3162ff7dea2203c48c0c7f8137`.
- Method: `.the-way/task-cycle/review/fix.md`, read whole. The findings file `reports/review-whole-findings.md` bounds the review, together with the fix report `reports/fix-1-report.md`.
- My side: I-1 to I-4 and M-1 to M-3 of pass 2 (I-1 is the same fault as B1 of pass 1), and the fix's changes to `foundations/decisions.md`, `guidelines/styleguide-browser-view.md` and the `decision:` lines and comments of tests. The other reviewer judges the code and test logic.
- Result: every finding of mine is **fixed**. The fix brings in no new Critical or Important finding. One new Minor finding (N-1) blocks nothing.

## Each finding

### I-1 (= B1). Twelve `decision:` lines break the foundation check — **fixed**

Evidence: `python -B .the-way/elements/common/foundation_check.py` at `fe15a267` exits 0 with `0 errors` (log `reports/review-fix-1-docs-foundation-check.log`). I read every re-quoted line in the diff:
- `tests/view/shared-controls.test.mjs:787`: D-267, from „No tool guards the rules of hooks and of effects: …”.
- `tests/view/program-panel.test.mjs:617`: D-174's first sentence, whole.
- `tests/view/program-panel.test.mjs:647`: D-164, from „Programs belong to the player, …”.
- `tests/view/program-panel.test.mjs:1993`: D-306, from „After the last field the panel stays open, …”.
- `tests/view/game-saver.test.mjs:527` and `:561`: D-208, from „When one fails, …”.
- `tests/view/login-card-focus.test.mjs:218`, `:233`, `:249`, `:269`, `:303`, `:318`: D-381's second sentence, whole.

Each now begins a binding sentence and has no ellipsis and no added full stop. The quotation that came from the plan, „Where the session check leads to the game instead, nothing changes.”, is gone: `:269` now quotes D-381's „…the page moves focus to it only after …”. That test shows a signed-in player's refused link opening the game with no card taking focus, which is a negative case of that „only”, so the quotation holds. The fix report's note that D-225's „after a refusal of the link, …” stands after „; ” and so cannot be quoted is right.

### I-2. D-297 restated in its old form — **fixed**

Evidence:
- `src/browser/view/program-editor.ts:249-254` now reads „Null only where there is no group to move to: „↑” at the group's edge with no group before the rule's group, „↓” with none after it.”
- `src/browser/view/program-editor.ts` at `ruleArrows` now reads „off only where no group stands on that side of the rule's group.”
- `tests/view/program-editor.test.mjs:934` and the titles at `tests/view/program-editor.test.mjs:1591` and `tests/view/rule-editor.test.mjs:400` now say „off only where no group stands before (after) the rule's group”.
- A new case in `tests/view/program-editor.test.mjs:1614-1624`, with groups [empty, one rule, empty] and `ruleArrows(…, 2, 0)` = `{ up: true, down: true }`, now exercises the clause „so a rule group left empty at the edge of the program takes the rule” that the test at `:1593` quotes.
- `tests/view/rule-editor.test.mjs:402` now cuts its quotation before that clause, which the test does not hold, and the quotation still begins the sentence.

A search of `src`, `tests` and `guidelines` for „program's first/last rule”, „program's ends”, „only at the program” and „the ends of the program” finds only `tests/view/program-editor.test.mjs:1654`: „Past the program's ends, and for an unknown group or place, nothing.” That line is true of its own fixture (groups A, B empty, C: „↑” from A and „↓” from C have no group to go to), so it restates nothing.

### I-3. The menu test asserted focus on „Konto” — **fixed**

Evidence: `tests/view/menu-bar.test.mjs:318-330` now focuses the link before `press(link)`, as a browser does, and asserts `active()` is that link („a click on a link leaves the focus on it”). Its title says „… and leaves the focus on that item”. Its `decision:` line quotes D-285's whole first sentence, focus clause included. The fix report's mutation check, with every outside click sent to „Konto”, made this test and its neighbour fail. That is evidence the test has power. I did not rerun it; it is the other reviewer's side.

### I-4. D-381's *Verification* omitted the two exceptions — **fixed**

Evidence: `foundations/decisions.md:3093` now reads „no focus taken when the card opens after an expired save or after a session check that no refused emailed link and no „Anuluj” led to, focus in the first field after a confirmed logout, a logout answered with no session, a set password, a refused emailed link and „Anuluj” of the form „Ustaw nowe hasło””. This agrees with the binding sentence and with `app.ts`, where the focus goes to the card through the session check after those two. The pair of examples was removed, because `tests/view/login-card-focus.test.mjs:217`, `:232` and `:302` hold those cases.

### M-1. Pairs saying „no test holds” what a test now holds — **fixed**

Evidence, from the docs diff of `fe15a267`:
- D-306 (`decisions.md:9271-9279`): the move to another group by „↓” and by the handle went into the tests clause. The pair keeps the number left without Enter and the deletion, which no test holds.
- D-294 (`:8910-8915`): the groups of a new copy at a send and at a switch went into the tests clause. The pair keeps reload and the save.
- D-172 (`:7958-7963`): the short line, with „Zapisz w programie” inactive, went into the tests clause. The pair keeps place and role.
- D-342 (`:10565-10571`): the entry of a changed rule went into the tests clause. The pair keeps the edits after a completion.
- D-207 (`:3743-3750`): the send after a failure at the hidden page and at the rhythm, taking the place of the retry, went into the tests clause. It is held by `tests/view/game-saver.test.mjs:525` and `:559`.
- D-285 (`:4428-4432`): the tests clause gains the imitation's focus after a click outside, „on a document imitation given the focus the browser would give”. The pair keeps the real-browser part.
- D-381: as I-4.

I read each new tests clause against the test that holds it (test titles at `program-panel.test.mjs:592`, `:615`, `:1415`, `:1992`; `chronicle-entries.test.mjs:71`, `:81`; `game-saver.test.mjs:525`, `:559`; `menu-bar.test.mjs:288`, `:318`). Each clause says what its test asserts.

### M-2. Rule sentences without the unit — **fixed**

Evidence: D-288 (`:8801`, `:8833`), D-295 („Temperatura poniżej 35 °C”), D-300 and D-291 („Zapas poniżej 8 szt. · Patyk”) and D-309 („Zdrowie poniżej 50 pkt”) now carry the units of `src/browser/sim/data/conditions.ts`. The same search as before, for a condition's number with no unit after it, now finds only D-144 (`:6476`, `:6484`). That is the wolf's program in the data, which I declined in the first review.

### M-3. The styleguide grounded the greyed frame in D-279 — **fixed**

Evidence: `guidelines/styleguide-browser-view.md:310-312` no longer has „więc ramka ma kolor swojego tekstu (D-279)”. The frame and the name stay in `text-disabled`, and the reason stays in `text-secondary` (D-289).

## New in the fix diff

### N-1 (Minor, new, blocks nothing). D-297's pair still says „no test holds” the empty group at the edge, which the fix's new case now holds

Anchor: `foundations/decisions.md:8979-8983` (D-297, *Verification*): „For an empty group at the edge of the program, an agent compares a change with the part no test holds: - complies: „↑” on the first rule of the program, with an empty group before its group, enabled and putting the rule at the end of that group; „↓” on the last rule of the program, with an empty group after its group, enabled and putting the rule at the start of that group …”

Why: commit `04185e09` added the case at `tests/view/program-editor.test.mjs:1614-1624`. Its `ruleArrows(emptyAtEdges, 2, 0)` = `{ up: true, down: true }` holds that the arrows toward empty edge groups are enabled. This is the same kind of second copy M-1 removed from seven decisions, made by the fix itself. The case checks only that the arrows are enabled, not where the rule lands. So the „putting the rule at the end/start of that group” half is still held by no test.

Fix (for the return step): move „enabled” into the tests clause („…the border of a group being no end, and an empty group at the edge of the program enabling the arrow toward it”) and keep the pair for where the rule lands. The alternative is to assert the landing in the test too, with `moveRule(emptyAtEdges, 2, 0, -1)`, and drop the pair.

Beyond N-1, the docs diff adds no sentence that contradicts another decision. It changes no binding sentence: only *Verification* clauses, examples and one clause of the styleguide.

## Checks run

| Check | Command | Exit | Result |
|---|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`; log `reports/review-fix-1-docs-foundation-check.log` |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 142 warn, 7 info`, as at the first review; log `reports/review-fix-1-docs-check-instructions.log` |
| Docs diff | `git diff -U1 5b3dac41..fe15a267 -- foundations/decisions.md guidelines/styleguide-browser-view.md` | — | read whole (156 lines) |
| Comment and `decision:` lines | `git diff -U0 5b3dac41..fe15a267 -- tests src/browser/view/program-editor.ts`, filtered for comment, `decision:` and `test(` lines | — | read whole |
| Residue searches | `grep -nE` for a condition's number with no unit in `foundations/decisions.md`; for the old D-297 wording in `src`, `tests` and `guidelines` | — | see M-2 and I-2 |

Not run: the full suite and the local game, as the dispatch asks. I did not rerun the focused tests; the fix report gives each with exit 0, and the test logic is the other reviewer's side.

## Reaches beyond the dispatch

- Test titles in `tests/view/game-saver.test.mjs` (`grep "^test("`) and `tests/view/program-panel.test.mjs:1413-1427`: to check that the new tests clauses of D-207 and D-172 say what those tests assert.

## Working copies

- `.runs/review-fix-1-docs/` in the task's worktree held the docs diff and the two check outputs. The two logs are kept in `reports/` as `review-fix-1-docs-foundation-check.log` and `review-fix-1-docs-check-instructions.log`. The directory was removed. No git worktree, clone or screenshot was made.

## Unread material

- `reports/review-whole-findings.md`: only its headings and my own pass-2 findings, which are in my words. The pass-1 findings B1 and M1 to M4 were read only through the fix report, since they are the other reviewer's side, apart from B1, which is my I-1.
- The code diff of `src/browser/view/rule-list.tsx`, `tile-table.tsx` and `terrain-drawing.tsx`, and the test logic beyond comment and `decision:` lines, were not read; they are the other reviewer's side.
- No decision beyond those the fix diff touches was opened. The touched ones were read in the diff with context, not re-read whole: D-381, D-207, D-285, D-172, D-288, D-294, D-295, D-300, D-291, D-306, D-309, D-342, and D-297 for N-1.

## Searches not found or unclear

- The old D-297 wording in `src`, `tests` and `guidelines`: not found, other than the one line true of its fixture (I-2). The positive control is that the same search found that line.
- A unit-less condition number in `foundations/decisions.md`: found only in D-144 (declined before).
- Unclear: none.
