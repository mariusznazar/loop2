# Findings to fix — review of the whole change, report 13 (`reports/13-review-report.md`), head `434f32b`

Cut from the report in the reviewer's words: the blocking finding first, then the Minor findings of the review of the whole change within the task. Nothing is out of scope.

### Important (blocking)

**I-1. The numbers of the bar of the solving condition are set in Geist Mono, which D-46 forbids** — slice 8, commit `cb0212e`.

- Place: `src/browser/styles.css`, rule `.run-header-requirement-text`:
  ```css
  .run-header-requirement-text {
    margin: 0;
    font-family: var(--font-family-mono);
    font-variant-numeric: tabular-nums;
    color: inherit;
  }
  ```
- What is wrong: D-46 (`foundations/decisions.md:953`) sets "the chronicle and the clock of the map run in Geist Mono and every other text in Geist". The styleguide repeats it (`guidelines/styleguide-browser-view.md:117-118`: „tekst gry idzie stosem Geist, kronika i zegar przejścia stosem Geist Mono”). After this change the header holds the clock and, as a separate thing, the bar of the solving condition with its numbers (D-311, D-133 as rewritten here). „Passa 120/480” and „Pokonane napaści 1/2” are not the clock, yet they are set in Geist Mono. Before the change they were part of the one status row, which D-46's *Verification* named as the clock's place; this change itself split them off and rewrote D-46's *Verification* to "the clock of the map run in the header of the screen of a map run set in Geist Mono", so the entry the change edits now forbids what slice 8 wrote.
- Why it matters: WAY-263 — the change's files do what a foundation entry it changes forbids. For the player the effect is small (the numbers read in the clock's face instead of the face of all other text), but the code and the decision disagree, and the next reader of D-46 or the styleguide cannot trust either. The plan's slice 8 *Goal* names no face; the executor chose it (report 10, *Choices*: „Name and numbers are one paragraph with a mono face and tabular figures (as the clock), so the numbers do not jitter … Rejected: the proportional face; the task does not say”).
- Evidence: the CSS rule above (diff of `cb0212e`); D-46's binding sentence; no test pins the face of the bar's text (`tests/view/run-header.test.mjs:336-341` checks only the clock's face), so a fix changes no test.
- Fix in the code: drop `font-family` from `.run-header-requirement-text` and keep `font-variant-numeric: tabular-nums`, which keeps the figures from jittering in Geist too. Keeping the mono face would instead need a change of D-46 settled with the human.

### Minor

**M-1. A stale "status row" in the header comment of a file this change touched** — slice 6 (`92f6860`) touched the file; within the task.
`src/browser/view/run-screen.tsx:3-4` still says „one header — the character's name, the map's name and the status row — over three areas”. After slice 7 the header has no status row (D-311 as rewritten: clock, bar of the solving condition, buttons). A reader of the module is told of a part the screen no longer has.

**M-2. A stale "status row" in a code comment the change made false** — no slice touched the file; the change made it false; within the task.
`src/browser/view/screen-address.ts:154`: „The minute is the one the status row writes”. The foundation step corrected the same sentence of D-280 to „as the clock in the header of that screen writes it”; the code comment that cites it was left.

**M-3. The styleguide's example still names the status row** — within the task (To do 5 changes the styleguide; the example became stale with To do 3).
`guidelines/styleguide-browser-view.md:293-294`, rule "A fault of one screen is fixed in its component": *Good* „Za ciasny wiersz stanu poprawiony w regułach tego wiersza …”, *Bad* „… żeby zmieścił się wiersz stanu”. The rule still holds; its example names a row the screen no longer has. Slice 1's *Goal* said "Nothing else of the file changes", so the slice kept it on purpose; the cost is an example a reader cannot find on the screen.

**M-4. D-216 *Rejected* still weighs „the same in the status row”** — Foundation entries (`bd44c39`, left as the handoff notes); within the task.
`foundations/decisions.md:4048`: „*Rejected:* the same in the status row — a very long row and a change of its accepted wording”. As a record of a rejected way it is not false, but its reason („a very long row”) no longer has an object; a reader may look for a status row. A clause such as „in the status row of the header, which the header then had” would keep it true.

**M-5. „Teraz” and „Potem” stay controls that do nothing while the program panel shows a saved program** — slice 6 (`92f6860`); within the task.
`src/browser/view/now-rows.tsx` (`RuleRow`) makes a row a tab stop with a pointer cursor and the `highlight` hover whenever the copy holds the rule; `src/browser/view/program-panel.tsx` (`scrollToRule`) returns at once unless the panel shows the copy (`shown.kind !== "copy"`). So with a saved program shown during a map run the player can focus and click a row that looks clickable and nothing happens. The plan's *Choices* accepted this cost („A player who shows a saved program during a map run clicks and sees nothing happen”), and D-336 is silent on it; a reasonable player would expect either the copy to come back with the rule centred or the row not to look clickable. Rare state, no damage; graded Minor. Test `tests/view/run-screen.test.mjs` "while the program panel shows a saved program a click on Teraz scrolls nothing" pins the current behaviour.
