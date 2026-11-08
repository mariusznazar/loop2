PASS 1fd54fda05929e0f516dd8067f2bd47274a023b8

# Report 19 — review of the fix of the return step's finding I-1

Range `0a8c6a8b8638b8dde94976f6006555bd97c9d73d..1fd54fd` — one commit, `1fd54fd`,
`foundations/decisions.md` only (+4 / −4, D-336). `git rev-parse HEAD` =
`1fd54fda05929e0f516dd8067f2bd47274a023b8`, the head given. Method: `.the-way/task-cycle/review/SKILL.md`
with `fix.md`; bounded by the findings file `reports/18-findings.md`.

Counts: blocking 0; Minor 0 new (M-1 of report 17 remains, unfixed by the dispatch's ruling, blocks
nothing); out of scope 0.

## Findings of the findings file

**I-1 (Important) — fixed.**

- D-336's binding sentence (`foundations/decisions.md:7299-7301`) now reads: „While the program panel
  shows a saved program in place of the copy, however it came to be shown — picked on its list (D-174)
  or made with „Nowy program” (D-167) — the click scrolls nothing and the saved program stays shown.”
  The condition is now the code's own: `program-panel.tsx:822` returns for every
  `shown.kind !== "copy"`. Both routes by which the run panel shows a saved program are named, the
  list pick (`program-panel.tsx:533-543`) and „Nowy program” (`:558`, `:763-769`); the boundary call
  `showProgram` that the test uses falls under "however it came to be shown". In the running game the
  boundary calls `showProgram` only on the Programy screen's own panel (`game-view.ts:639`).
- The words "during the map run" are gone from the condition, so the screen after a death or a
  completion, where the list still lets the player pick a saved program and the rows still stand, is
  covered as the code behaves. That was the unclear case I-1 named.
- The *Rationale* (`:7321`) now reads „a saved program the panel shows in place of the copy is another
  program”, with no route. The accepted cost („a player who shows a saved program during a map run
  clicks…”) is an instance of the cost, not a condition, so it narrows nothing.
- *Verification* examples and *Rejected* already spoke of "a saved program" with no route, and they
  still match the code.
- No other entry cites D-336 (`grep -n "D-336" foundations/*.md` finds only its own entry), so no
  other entry needs to change with it.
- Evidence that the code says what the new sentence says: report 17's scratch test („Nowy program”
  during a map run, then a click on „Teraz” and Enter on „Potem”: `SCROLLS=0 COPYHEAD=0`) and
  `tests/view/run-screen.test.mjs` 13/13. The fix diff touches no code, so both still describe the
  head (`git diff 0a8c6a8..1fd54fd --stat` shows only `foundations/decisions.md`).

## The fix diff itself

Nothing broken. The dash clause lists the two routes the game has today, and "however it came to be
shown" keeps the rule general, so a later route is covered too. The citations are right: D-174 gives
the list pick during a map run, and D-167 gives „Nowy program”. M-1 (the joined *Rationale* line,
`:7322`) is unchanged, as the dispatch gives; it stays a Minor for the request's list.

## Declined to judge

none — nothing outside the findings file was weighed beyond the fix diff.

## Checks

| Check | Command or method | Exit / result |
|---|---|---|
| Head | `git rev-parse HEAD` | 0 — `1fd54fda05929e0f516dd8067f2bd47274a023b8` |
| Range | `git log --oneline 0a8c6a8..1fd54fd`; `git diff 0a8c6a8..1fd54fd` | 0 — one commit, `foundations/decisions.md` only |
| Narrowing left in D-336 | `awk 'NR>=7294 && NR<=7328' foundations/decisions.md \| grep -n "picked\|during\|D-174\|D-167\|saved program"` | 0 — only the new binding sentence names routes, as examples; "during a map run" left only in the accepted cost |
| Citations of D-336 | `grep -n "D-336" foundations/*.md` | only its own entry |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 — `0 errors` |
| Worktree untouched | `git status --short` | empty |

Not run: tests. The fix changes no code or test, and report 17's focused run and scratch test stand
for the unchanged code. `npm test` is left to the cycle's own run before the request.

## Reaches beyond the dispatch

none beyond what report 17 already read (D-167, `program-panel.tsx`, `game-view.ts`).

## Searches not found or unclear

none
