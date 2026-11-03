# Findings — repair before the review of the whole change

Found by the orchestrator's own runs after slice 11b (head `f9eff8c`); they are not a review's
findings. Both must be fixed before the review of the whole change.

## F1 — `tests/view/character-screen.test.mjs:120` (made by slice 5, `edb2862`)

`python -B .the-way/elements/common/foundation_check.py` exits 1 with one error:

```
tests/view/character-screen.test.mjs:120: `invariant: resurrection-renewal (the readiness boundary is the simulation's; the wording is D-217)` cites no one identifier
1 error
```

The line has an explanation in parentheses after the identifier. Every other test that cites this
invariant writes the line as exactly `// invariant: resurrection-renewal` (see
`tests/view/headquarters.test.mjs:141`, `tests/view/clock.test.mjs:249`). Fix: make the line exactly
`// invariant: resurrection-renewal`. Keep the explanation as a separate comment line **above** it that
does not contain the word `invariant:`. Change nothing else in the file.

Check that shows it fixed: `python -B .the-way/elements/common/foundation_check.py` exits 0;
`npm test -- tests/view/character-screen.test.mjs` exits 0.

## F2 — `README.md:76` (made by slice 11b, `f9eff8c`)

The rewrite of the browser check after `npm run local` dropped two things that are still true and still
worth checking:

- the page's footer with the credits (`createFooter` in `src/browser/view/app.ts`, which the page still
  places under the content);
- after a character is created and „Wyślij” is pressed, the status row with the minute growing every second
  and the terrain panel with its list of tiles. Both stand on the screen of the map run (`run-screen.ts`
  holds the status row and `createTerrainPanel`), the screen a send leads to (D-280, D-281); the real-browser
  walk of slice 8 (`docs/task-cycles/ekrany-i-menu/reports/slice8.md`, steps 2 and 3) read „Minuta 5 · …”
  growing on it.

Fix: in the same sentence of line 76, restore both. The sentence should say that after creating the
account the page shows the screen Siedziba with the footer and its credits, and „Wyloguj” stands in the menu
„Konto”; and that after creating a character and „Wyślij” the page leads to the screen of the map run with
the status row whose minute grows every second and the terrain panel with the list of tiles. Keep the line
Polish, keep `/main.js` and the console-errors parts as they are, change no other line.

Check that shows it fixed: the sentence reads as above (quote it in your report); `npm test -- tests/quality/test_quality_invariants.py`
exits 0.
