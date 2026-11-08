# Report 16 — the return step

**Status:** done

Worktree `the worktree's root`, branch `task/teraz-i-potem`, compared at head
`52367a97ee32519e9c97a2649be9530f3e50a73c` (task base `381588f`). Pinned the-way `294af7f`
(`git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` agree).

## Files and commits

- `foundations/decisions.md` — +15 / −6 (D-336, D-334)
- Commit `0a8c6a8` "docs: :memo: say in D-336 that a click on Teraz or Potem scrolls nothing while the
  program panel shows a saved program, and in D-334 that the row Teraz carries no word of its own"

## Return step

### Foundation compared with code

Each entry read whole at the head and compared with `git diff 381588f..52367a9` and the code it names
(`body.ts` `minutesUntilChilled`, `minutesUntilStarving`, `needNotes`; `game.ts` `nowAndNext`,
`ruleSigns`; `run.ts` `solvingRequirements`, `meetsSolving`; `status-row.ts` `clockText`,
`requirementText`, `requirementShare`; `now-lines.ts`; `now-rows.tsx`; `run-header.tsx`;
`body-row.ts` `bodyCells`; `world-area.tsx`; `program-panel.tsx` `scrollToRule`; `run-screen.tsx`;
`screen-address.ts` `returnToRunEntry`; `styles.css`).

| Entry | Result |
|---|---|
| D-334 | Matches: icon and `actionSentence`, right part „reguła {n} · zostało {left} z {all} min”, wait text, „Walczy z {creature}” alone from the attack through the minute of resolution, death causes in `text`, completion text in `positive`, `.now-row { height: 1lh }` with no wrap. Gap: the binding sentence lists what the row holds but does not say outright that no word „Teraz” stands in it, while D-335 gives „Potem” its word; a reader taking „Teraz” in quotes for screen text could add one. Correction: a *violates* example „the word „Teraz” written in the row before the icon, as „Potem” is in its row” (the cycle's). |
| D-335 | Matches: „Potem” label, the winner of `ruleSigns(state).judgement`, the combat rule in attack minutes, after the end at the stopped minute; „żadna reguła nie pasuje — postać stanie” in `warning`. |
| D-336 | Matched for what it said; silent on a state the code settles. `scrollToRule` returns unless the panel shows the copy (`program-panel.tsx:821-832`), so while a saved program picked on the panel's list (D-174) is shown, a click scrolls nothing and the saved program stays shown; test `tests/view/run-screen.test.mjs:700` pins the no-scroll. Correction: a binding sentence for that state, a *complies*/*violates* pair, a *Rationale* sentence with the accepted cost and a *Rejected* way, all from the plan's *Choices* row (the cycle's). See "Choices that may bind". |
| D-337 | Matches: cells, notes in `text-secondary` at `--font-size-detail`, „marznie”/„głoduje” in `danger`, order chilled → fire (`warmthAt > 0`) → not cooling → minutes, rounding down by stepping `bodyMinute`. „nie stygnie” "on a map that does not cool the body": `bodyMinute` cools at a constant rate with no floor at the ambient temperature, so `minutesUntilChilled` is null only where the map does not cool at all (ambient ≥ 37 °C) — the entry holds. Hand check of the example: (36.9 − 35)/0.024 = 79.2 → 79; (82 − 30)/0.6 = 86.7 → 86. |
| D-133 | Matches: bar per requirement, streak before beaten attacks, a missing requirement not drawn, met requirement's name, numbers and fill in `positive`, the bar drawn after the end with the current streak. |
| D-311 | Matches: header order name, map, clock, bar, „Pauza”/„Wznów”, pace, „Restart”, warning, „Zakończ” (`run-header.tsx`); world order scene, `NowRows`, encounter paragraph, end lines, body row (`world-area.tsx`). |
| D-147 | Matches the „Teraz” sentence (`nowLine` precedence death → completion → combat → action/wait). |
| D-122 | Matches: `clockText` gives „Minuta {m} (pauza)” at every pause and no „ (pauza)” after the end. |
| D-132 | Matches: completion text in „Teraz” in `positive`, clock at the completion minute, „Pauza” and pace gone. |
| D-39, D-40 | Match: `.run-header-requirement-fill` `text` on `highlight`, `positive` once met; the hover of a row that is a control on `highlight` with `text`. |
| D-62, D-135, D-178, D-57 | Their corrected examples match the screen; D-178's binding sentence holds (energy is the last cell). |
| D-46 | Matches: only `.run-header-clock` sets `--font-family-mono`; the bar's words inherit Geist (fix `52367a9`). |
| D-324 | Matches: the question pauses the run, so the clock ends in „ (pauza)”. |
| D-280 | Matches: `returnToRunEntry` takes `death.minute ?? completion.minute ?? minute`, the minute `clockText` writes. |
| D-291 | Matches: the action's icon in both rows, never the target's. |
| D-216 | *Rejected* as fixed in `52367a9` reads as a way weighed while the header held a status row; true. |
| `rule-state-from-pick` | Matches: „Teraz” of an action comes from `run.current`, which the pick left; „Potem” from the one `ruleSigns` judgement; the exceptions are the three D-147 gives. *Method* `review` stays right: no test cites the identifier (`grep -rln rule-state-from-pick tests src guidelines scripts` — no hit). |
| Part map `browser-view`, `simulation` | Match: `src/browser/view/**` claims `now-lines.ts` and `now-rows.tsx`, `tests/view/**` claims `now-lines.test.mjs`; responsibilities and dependencies unchanged; no new `src/browser/*.tsx`, so the definition's projected `browser-view` change does not apply. |

Searches of the whole foundation: `status row|statusText|status text|run-header-status|Zbiera: |Eksploruje|status activity|character's activity` — only D-216 *Rejected* (fixed) and D-334's own *Rejected*/*violates*; `(pauza)|Minuta |Passa |Pokonane napaści|Las rozwiązany|Mag zamarzł|…|in the header` — every hit consistent; `world area|under the scene` — D-147 and D-185 still true with „Teraz” and „Potem” between the scene and the paragraph; invariants for `header|body row|status|clock|world area|scene` — no screen invariant touched. Entries found and read whole besides the list: D-44, D-47, D-171, D-174 (line read), D-185 (line read), D-209 (header hit, unrelated), D-244, D-265, D-333.

### Decisions written or changed

- **D-336** — changed, `the cycle's`. EN: while the program panel shows a saved program picked on its list during the map run, a click on „Teraz” or „Potem” scrolls nothing and the saved program stays shown. PL: gdy panel programu pokazuje zapisany program wybrany z listy w trakcie przejścia, kliknięcie „Teraz” albo „Potem” niczego nie przewija, a zapisany program zostaje na ekranie. *Rejected* gains the plan's way „the click putting the copy back into the program panel … and then scrolling”.
- **D-334** — *Verification* only, `the cycle's`: a *violates* example, the word „Teraz” written in the row before the icon. EN: the row „Teraz” carries no word of its own. PL: w wierszu „Teraz” nie stoi słowo „Teraz”. Binding sentences unchanged.

### Invariants written or changed

none

### Environment facts

none — the change uses `:has()`, `1lh` and `scrollIntoView({ block: "center" })`, but no entry of the foundation rests on browser support of them, and the foundation holds no fact of that kind for any other CSS feature it uses; a fact is written where a decision's *Based on* or an invariant's *Rests on* needs it.

### Glossary terms

none — „Teraz” and „Potem” are names of rows that D-334 and D-335 define in their binding sentences, and the D-334 example now settles that „Teraz” is no word on the screen; game minute, streak, completion and beaten attack are used as `foundations/glossary.md` gives them; „solving condition” was used before this change with no entry; the-way's glossary at the pin holds none of these words (only `return step` near them).

### Part-map changes

none

### Projected entries written whole or in part

none by this step; the foundation step wrote all that the plan assigns (D-311 in part, D-133 whole, `rule-state-from-pick`, D-147, D-122 and D-132 in part, D-39, D-40). The definition's projected entries searched for „Teraz”, „Potem”, body row, the bar and the clock (`definicja_mvp2_loop2.md`): no further one this code makes true.

### Rows of *Settlements to record* written

none by this step; rows 1–8 stand in D-334 (1, 4, 8), D-335 (2), D-336 (3), D-133 (5, 6), D-337 (7), as report 02 gives and as compared above.

## Choices that may bind after the merge

| Choice | Decision |
|---|---|
| The program panel scrolls only while it shows the copy | Entry: D-336 (above). It binds after the merge. It touches the open Minor M-5 (`reports/15-fix-review-report.md`): if the human picks the fixer's way 1 (the click brings the copy back) D-336 changes with it; way 2 (the row inert while a saved program is shown) adds a sentence on the row's look. The finding itself is no entry. |
| „Teraz” has no label word | Entry: a D-334 *violates* example; the binding enumeration already carried it, as row 1 and loop at `cdc7c0d` (`NowLine.tsx` — label only on „potem”) do. |
| Rows naming a rule are focusable elements built as the rule rows of `rule-list.tsx` | Questions table, no entry: D-44 lists buttons, select lists, fields and pick cells, not a row that takes a click, and D-47 already makes every keyboard-reachable element a control with the one focus rule; `rule-list.tsx:443-455` is the precedent. |
| Bar track length 8em | Questions table, no entry: a layout dimension D-43 allows. |
| Note size `--font-size-detail` | Questions table, no entry: D-337 says „smaller grey text”, and the styleguide's sizes carry the token. |
| Field `status` of `src/browser/sim/data/actions.ts` left unread | Not so: `src/browser/view/combat-line.ts:54` still reads `ACTIONS[character.action.kind].status`. No foundation entry names the field. |

## Checks

| Command | Exit | Result |
|---|---|---|
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0; 0 | both `294af7fde45323ac1851c014a03071a97fc38d96` |
| `python -B .the-way/elements/common/foundation_check.py` (after the edits, before the commit) | 0 | `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` (after the commit `0a8c6a8`) | 0 | `0 errors` |

Not run: `npm test` and any test file — the handoff bounds this step to the foundation check, and no code or test changed. The new D-336 sentence's "the saved program stays shown" is read from code (`now-rows.tsx` calls only `onShowRule`; `scrollToRule` returns at once); `tests/view/run-screen.test.mjs:700` asserts no scroll but not that the shown program stays.

## Own-work check

- Requirement most likely missed: that a sentence I added states what the code does, not what I expect it to do — the D-336 claim that the saved program stays shown, and the reason that a saved program may hold rules with the same numbers.
- Check: read `program-panel.tsx:816-832` (`scrollToRule` returns unless `mode === "run"`, a state and `shown.kind === "copy"`; it changes no state), `now-rows.tsx:70-85` (the row calls `onShowRule` only), `run-screen.tsx` (`onShowRule` calls `panel.scrollToRule` only), and the test at `run-screen.test.mjs:698-719` ("the saved program's … rows carry the same numbers as the copy's").
- Result: both hold; I rewrote a first draft of the *Rationale* that said a saved program "holds no rule of the copy", which the test's comment shows false.

## Reaches beyond the handoff

- `definicja_mvp2_loop2.md` (vault), sections *Glossary* and *Part map* of *Projected foundation changes* and a search for „Teraz”, „Potem”, clock and body row — WAY-126 has the return step read the sources' projected entries.
- `the old Loop repository` at `cdc7c0d`, `src/components/probe/NowLine.tsx:40-115` — whether loop's „Teraz” row had a label word.
- `.runs/task-cycles/teraz-i-potem/plan.md` § *Choices* and `reports/13-review-report.md`, `14-fix-report.md`, `08-slice6-report.md` — the ways and costs of the saved-program choice for D-336's *Rejected* and *Rationale*.
- D-44, D-47, D-171, D-174, D-265 read whole or by line — whether the rows built as focusable elements and the saved-program state are already settled.

## Searches not found or unclear

- The handoff says the data field `status` of `src/browser/sim/data/actions.ts` is left unread after the change; `src/browser/view/combat-line.ts:54` still reads it.
- `.the-way/task-cycle/skill/return_step.md` says "every other choice stays a row of the questions table" right after the sentence on invariants; whether "every other" covers only choices that are no rule set for an invariant, or all choices that are not WAY-36 decisions, is unclear. I read it as the latter: a choice that binds after the merge is written as a decision, the rest stay rows.
