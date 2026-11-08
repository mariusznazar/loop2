# Findings to fix — review of the return step, report 17 (`reports/17-return-review-report.md`), head `0a8c6a8`

Cut from the report in the reviewer's words: the blocking finding. The Minor finding of a review of the return step is not fixed (it goes to the request's list).

### Important

**I-1. D-336's new sentence exempts only a saved program "picked on its list", while the code
scrolls nothing whenever any saved program is shown — „Nowy program” during a map run shows one too.**
Within the task (D-336 is the task's row 3, and the sentence is the return step's own).

- Place: `foundations/decisions.md:7299-7301` — „While the program panel shows a saved program picked
  on its list during the map run (D-174) in place of the copy, the click scrolls nothing and the saved
  program stays shown.” The *Rationale* repeats the narrowing at `:7321` („a saved program the
  player picked during the map run is another program”).
- What the code does: `src/browser/view/program-panel.tsx:822` —
  `if (mode !== "run" || state === null || shown.kind !== "copy") return;` — no scroll for every
  shown saved program, however it came to be shown. During a map run the panel of the screen of a map
  run shows a saved program by two routes, not one: a pick on the list (`program-panel.tsx:533-543`,
  D-174), and „Nowy program”, which stands in the run panel's actions (`program-panel.tsx:558`) and
  whose action shows the new program (`program-panel.tsx:763-769`, `show({ kind: "saved", programId })`;
  D-167 gives the button). The plan's *Choices* row the entry comes from says the same as the code, not
  the entry: „The program panel scrolls only while it shows the copy; with a saved program shown a
  click scrolls nothing” (`plan.md:575`).
- Why it matters: read as written, D-336's first sentence (a click scrolls the program so the rule the
  row names stands in its middle) is the rule, and its new second sentence the one exception. In the
  state after „Nowy program” during a map run the exception does not apply, so the entry requires a
  scroll the code does not make — WAY-263: the change's files fail to do what the entry it writes
  requires. A later author who follows D-336 there would "fix" the code — scroll the new program to a
  rule of the same number, or bring the copy back, the very way D-336's *Rejected* now turns down. The
  same narrowing makes the screen after the end of a map run unclear: the list still lets the player
  pick a saved program after a death or a completion (the run still stands until „Zakończ”, `game.ts`
  `end`), the rows „Teraz” and „Potem” still stand (D-334, D-335), and the code scrolls nothing — but
  whether a pick then is "during the map run" the entry does not say.
- Evidence: scratch test (below) — on `underway()` with the copy shown, a click on „Nowy program” in
  the run panel shows „Program 2” (`select.value` 2, no `copy-heading`), and a click on „Teraz” and
  Enter on „Potem” record `scrolls.length` 0, the copy not put back. `tests/view/run-screen.test.mjs:698-719`
  shows the saved program by `panel.showProgram(1)`, the boundary's call, not a list pick — the test the
  return report cites already exercises a route other than the one the sentence names.
- Fix within the return step's boundary: drop the route from the condition, e.g. „While the program
  panel shows a saved program in place of the copy, the click scrolls nothing and the saved program
  stays shown.” (D-174 and D-167 may stay cited as the ways a saved program gets shown), and in the
  *Rationale* „a saved program the panel shows in place of the copy is another program”.

