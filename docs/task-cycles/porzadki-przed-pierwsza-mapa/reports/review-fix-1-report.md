PASS b6b4bbffd655c0142ed03060c352d81bd360c032

# Review of the fix, round 1 — porzadki-przed-pierwsza-mapa

Fix range `8e5af859593ac49371a1e7d79fe414b828170542..b6b4bbff` (four commits `e305ba3f`, `29d2ebe0`,
`8c5d3d7b`, `b6b4bbff`, 5 files). `git rev-parse HEAD` in the worktree
`the task's worktree` is `b6b4bbffd655c0142ed03060c352d81bd360c032`,
the head given; `git status --short` is empty. I changed nothing in the reviewed worktree (the one
mutation trial below ran in a scratch worktree that I removed). No subagent.

Result: all of F1, M1, M2, M3, M4, M5, M6 and M8 are **fixed**; no new Critical or Important finding in
the fix diff; one new Minor finding (N1), within the fix, blocking nothing.

## The findings, one by one

- **F1 — fixed.** `tests/view/program-editor.test.mjs:112` now reads `const ITEMS_LISTED = ["stick",
  "berry", "moss", "fiber"];` with a comment saying why, and the import of `ITEMS` is gone
  (`rg -n "ITEMS\b" tests/view/program-editor.test.mjs` finds none). The positional uses (`:484`
  `ITEMS_LISTED[0]`, `:524` `slice(1)`, `:528` last) now read the literal, and the case at `:158-176`
  passes the literal list to `withConditionKind`, whose `item` comes from the argument, so its
  `"stick"` no longer follows the data's order. `node --test tests/view/program-editor.test.mjs` on a
  clean `dist` (no made-up entry; `grep -ci dummy` on `items.js` and `maps.js` gave 0): exit 0, 59 pass.
  I did not repeat the author's trial with a made-up first item; I read the case instead (the list the
  test gives the product is now literal), so the criterion for the lists the test passes holds.
  - The failing case the author found with a made-up first item
    (`program-editor.test.mjs:1208`, „a known resource the map of the map run lacks stands greyed …”):
    **in my reading it does not belong to F1.** F1 was about the list the test builds and passes to the
    product. This case passes no list: `conditionTargetPick(during, { kind: "itemBelow", … })` draws its
    cells from the items of the data (the „Zapas poniżej” pick, lines 1242-1252) and the test asserts
    those four cells in the data's order, as `data.test.mjs` asserts the content of `ITEMS`. It is of the
    kind of out-of-scope matters O1 and O3 of my first report (the product's pick follows the data's
    order); it goes to the request's list with them, not to this fix.
- **M1 — fixed.** `react-number-field.tsx:8` now cites `(D-395)`; the other `D-265` in the header (the two
  forms) is right and stays.
- **M2 — fixed.** `react-number-field.tsx:65` says "while a rejected text stays in it".
- **M3 — fixed.** `trip-editor.ts` imports `type { NumberReading }` from `./controls/react-number-field.js`
  and types `readTripCount(text: string): NumberReading | null`. The import is type-only (erased), in the
  direction D-395 allows (a screen module imports the control's type). `npm run typecheck` exit 0.
  The kitchen-sink page does not import `trip-editor.ts` (the author says; D-269 is not reached by a type
  import in any case).
- **M4 — fixed.** D-395 *Rejected* is no longer `unknown`; see N1 for its wording.
- **M5 — fixed.** D-394 *Rationale* now ends "…and `actionFeasible` is their simplest point of
  observation of that." The general principle about functions of the simulation is gone; the binding
  sentence, *Verification* and *Rejected* are unchanged.
- **M6 — fixed.** New case `test_the_build_writes_nothing_beside_the_sources_of_the_simulation`
  (cites `# invariant: simulation-type-check`): in a copy, `npm run build` must exit 0 and no file
  under `src/browser/sim/` may end in `.js`, `.d.ts`, `.js.map` or `.tsbuildinfo`. I checked that it
  can fail: in a scratch worktree of `b6b4bbff` (node_modules junctioned, removed afterwards) I deleted
  the line `"noEmit": true,` from `tsconfig.sim.json` and ran the test: exit 1, 1 failure, the new case,
  "First list contains 33 additional elements. First extra element 0: 'src/browser/sim/body.js' …
  `tsconfig.sim.json` emits what it should only check". The reviewed worktree was not touched.
- **M8 — fixed.** `PLANTED_USES` carries the error code of each name (`document` TS2584, `setTimeout`
  TS2304, `console` TS2584, `structuredClone` TS2304); `plant_uses` returns the line each planted use
  stands on; the typecheck case collects `(line, code)` of every `src/browser/sim/hex.ts(line,col): error
  TSnnnn:` line of the output with `ERROR_LINE` and asserts each name's `(line, code)` pair is present.
  The compiler's sentence is no longer matched. The discrimination from the browser configuration
  (which gives no error for these four) is kept. The test passes (below). I did not run the mutation
  "give a name another code" and rely on reading the pairing by line.

## New findings in the fix diff

- **N1 — Minor, within the fix.** `foundations/decisions.md`, end of D-395: *Rejected:* "the control
  picking the rule of a screen by a value of its parameter `rule`, as `rule="trip"` did — the source keeps
  no cost or reason beside it, so none is known." Two things depart from the decisions template
  (`.the-way/elements/decisions/template.md`): (a) "*Rationale* and *Rejected* … do not tell how the
  decision was reached" (WAY-05, WAY-29): "the source keeps no cost or reason beside it" speaks of the
  source of the entry, not of the way; (b) they "describe the decision as it then stands, never the
  change" (WAY-07, WAY-19): "as `rule="trip"` did" points to the previous state of the code. A reader
  also meets a control that still has a parameter named `rule` (now a function, `NumberRule`), so "its
  parameter `rule`" reads as the thing the entry keeps. The meaning of row 4 is kept and the way the
  source keeps is now in the entry; a form that says the same without those two defects would be
  "*Rejected:* the control choosing the rule of a screen by a value of a parameter that names the screen
  — no cost or reason known." Blocks nothing; its fix, if wanted, is one line.

## The entries D-394 and D-395 written without the skill (the cycle's question)

I read the template and rules for a decision and the skill `.the-way/elements/decisions/skill/SKILL.md`.
Judged against them:
- **Form.** Both entries keep their fields (*Scope*, *Based on*, *Relations*, *Verification*, *Origin*) as
  they were; only the *Rationale* of D-394 and the *Rejected* of D-395 changed; both are edited in place
  (the template's rule for a change), with no new number, and `python -B
  .the-way/elements/common/foundation_check.py` reports `0 errors` (exit 0).
- **Meaning of rows 2 and 4.** Row 2 settles `actionFeasible` alone: after the edit the *Rationale*
  names only it, so the meaning is kept (and the first report's M5 is met). Row 4 settles that a shared
  control imports no module of a screen and takes the rule from the screen; its binding sentence,
  *Verification* and *Rationale* are untouched, and *Rejected* now holds the way the source keeps (the
  function instead of the parameter), with the cost or reason stated as not kept, which the template's
  "each with the cost or the reason kept beside it … or `unknown`" allows for a reason not kept. N1 is the
  only departure I found.
- **Does the way they were written change anything in the entries?** The skill's own steps add reading
  (`read.md`), a search of the foundation for neighbours the entry changes (`decide_entry.md`), a draft,
  and for an edit that changes binding sentences the follow-on edits of step 4.4. None of the two edits
  changes a binding sentence, a *Verification* line or a number, and no neighbouring entry derives from a
  changed sentence, so I found nothing a run of the skill would have changed beyond what N1 says (the
  skill's reading of `rules.md` WAY-05/07 is where N1 would have come from). The deviation from
  `AGENTS.md` (entries only through the project skills) is the cycle's to record; I do not grade it.

## Checks I ran (command, exit code)

| Command | Exit | Note |
|---|---|---|
| `git rev-parse HEAD`; `git status --short` | 0 | `b6b4bbffd655c0142ed03060c352d81bd360c032`; clean |
| `git log --oneline 8e5af859..b6b4bbff`; `git diff 8e5af859..b6b4bbff` | 0 | read whole (46 lines added, 22 removed, 5 files) |
| `npm run build` | 0 | dist clean first: `grep -ci dummy dist/browser/sim/data/items.js dist/browser/sim/data/maps.js` gave 0 and 0 |
| `npm run typecheck` | 0 | includes `tsconfig.sim.json` |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `node --test tests/view/program-editor.test.mjs` | 0 | 59 pass, 0 fail |
| `npm test -- tests/invariants/test_simulation_type_check.py` | 0 | `Ran 4 tests in 21.917s OK` (the three earlier cases and the new one) |
| In a scratch worktree of `b6b4bbff`, `"noEmit": true,` removed: `python -B scripts/test.py tests/invariants/test_simulation_type_check.py` | 1 | 1 failure, the new case of M6, as it must; the scratch worktree and its junction removed, reviewed worktree clean at the same head |

Not run: `npm test` (the cycle's gate); the made-up-first-item trial of F1 (read instead, see F1); the
other invariant tests (`tsconfig.sim.json` is unchanged in the range, and no other file they
read changed).

## Declined to judge

- The case at `program-editor.test.mjs:1208` and the editor-default cases of O1: outside this fix, as
  said under F1.
- The way the author recorded the two entries, as a deviation from `AGENTS.md`: the cycle's.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/skill/SKILL.md` and `template.md` lines 55-85 and 112-145 (the form of
  *Rationale* and *Rejected*, editing in place), to judge D-394 and D-395 as the handoff asks.
- `foundations/decisions.md` D-394 and D-395, whole, and `tests/view/program-editor.test.mjs` lines
  1206-1252 and `src/browser/view/program-editor.ts` `actionTargetPick`, to say whether `:1208` belongs to F1.
- `tsconfig.sim.json`, to prepare the mutation trial of M6 in a scratch worktree.

## Unread material

- Decisions: this review is bounded by the findings file, so I did not select the whole foundation again;
  I read D-394 and D-395 whole (the two edited entries) and, from my own review of the whole change, kept
  in mind D-04, D-06, D-264, D-265, D-268, D-393, which I did not reread.
- Read whole: the fix diff, `reports/review-fix-1-handoff.md`, `.the-way/task-cycle/review/fix.md`,
  `reports/fix-1-report.md`, `reports/findings-review-1.md` (the first 80 lines; they held every
  finding), `tests/invariants/test_simulation_type_check.py` through its diff (the whole file was read in
  my first review, and the fix diff carries every changed line).
- Not read whole: `tests/view/program-editor.test.mjs` (read lines 100-115 through the diff and
  1206-1252); the guideline files (read whole in the earlier review of the same head's parent, not read
  again).
- Not read: `reports/review-whole-report.md` beyond what I wrote myself.

## Searches not found or unclear

- None unclear for the findings: the line numbers of F1 (`:112`, `:484`, `:524`, `:528`, `:158-176`)
  matched. I looked for another use of `ITEMS` in `program-editor.test.mjs` after the import was removed
  and found none. I did not find a line of the template that says how a *Rejected* may state a reason
  that is not kept other than the whole-field `unknown` (N1 rests on the template's prose rules, not on a
  rule for that case).
