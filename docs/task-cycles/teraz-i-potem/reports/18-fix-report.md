# Report 18 — fix of the findings of report 17 (return step)

**Status:** done

## Files and commits

- `foundations/decisions.md` — +4 / −4 (D-336 binding sentence and one *Rationale* line)
- Commit `1fd54fd` on `task/teraz-i-potem` (parent `0a8c6a8`): "docs: :memo: say in D-336 that a click on Teraz or Potem scrolls nothing whenever the program panel shows a saved program, however it came to be shown"

## Findings

**I-1 (Important) — fixed.** Confirmed in code before the edit: `src/browser/view/program-panel.tsx:558` puts „Nowy program” in the run panel's actions, `:763-769` (`createProgram`) then calls `show({ kind: "saved", programId })`, and `scrollToRule` returns for every `shown.kind !== "copy"`. D-167 gives „Nowy program” on the list of programs.

Written through `the-way-record-decision` (`elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md` and `elements/common/way_of_working.md` read in step 16): an edit in place of D-336, the same question.

- Binding sentence, now: „While the program panel shows a saved program in place of the copy, however it came to be shown — picked on its list (D-174) or made with „Nowy program” (D-167) — the click scrolls nothing and the saved program stays shown.” The condition no longer names a route or „during the map run”, so it also covers the screen after the end of a map run, which is what the code does.
- *Rationale*: „a saved program the player picked during the map run is another program” → „a saved program the panel shows in place of the copy is another program”.
- *Verification*, *Rejected* and the accepted cost already spoke of „a saved program” with no route; unchanged.
- Meaning, EN: while the program panel shows any saved program instead of the copy, a click on „Teraz” or „Potem” scrolls nothing and that program stays shown. PL: gdy panel programu pokazuje zamiast kopii jakikolwiek zapisany program, kliknięcie „Teraz” albo „Potem” niczego nie przewija, a ten program zostaje na ekranie. Mark: `the cycle's`.
- What follows (step 4.4): no decision or invariant derives from or names D-336 (`grep -n "D-336" foundations/*.md` — only its own entry); nothing to carry.

**M-1 (Minor)** — not in the findings file and not fixed, as the dispatch gives. The edit left the long *Rationale* line as it was.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the edit, before the commit) | 0 | `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` (after commit `1fd54fd`) | 0 | `0 errors` |

Not run: `npm test` and any test file — no code or test changed, and the dispatch names the foundation check alone.

## Own-work check

- Requirement most likely missed: that no other sentence of D-336 still narrows the case to one route or to the time „during the map run”.
- Check: `awk` over D-336 piped to `grep -n "picked\|during the map run\|D-174\|D-167"`.
- Result: one hit only, the new binding sentence that names both routes as examples. The *Rationale*'s accepted cost („a player who shows a saved program during a map run…”) remains. It is an example of the cost and does not narrow the rule.

## Reaches beyond the dispatch

- D-167 (`foundations/decisions.md`, its binding sentence), to cite the decision that gives „Nowy program”.

## Searches not found or unclear

none
