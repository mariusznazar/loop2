# Finding of the review of the return step of the fix (task `katalog-map`), in the reviewer's words

Source: `.runs/task-cycles/katalog-map/reports/review-return-3-report.md` (FAIL 20b4471f2b699e70eddb0f7a64ae7f13f98b5eef). I1 is blocking (Important, from the fix's commits `69d98b19`..`8725b92d`); the two Minor findings of that review are not fixed in this round.


### Important

**I1. The doc comment of `MapCard` restates D-327 as it stood before the fix.**
Place: `src/browser/view/map-card.tsx:100-106` (in the fix range `523046f6..8725b92d`, commit `69d98b19`, left unchanged by `bf3e933a`; outside the return step's commits, inside the task).

The comment reads:

```
 * The card of a map (D-327): a heading with the map's name, the tag of its state and its opener, and at
 * its right „Wejdź — wybierz postać”, which takes the player to „Kto idzie”; under it the one sentence of
 * the solving condition; then two columns, ...
```

D-327 as the fix wrote it (`foundations/decisions.md`, D-327, first paragraph) says: "under the heading stands the one short sentence of what the map demands, written by hand in the map's data", and puts the sentence of the solving condition under the table of „Żąda” (D-133: "in its part „Żąda”, under the table"). The code a few lines below does that (`map-card.tsx:147` `goalSentence`, `:152` `solvingSentence` inside „Żąda”), and the module header (`map-card.tsx:1-8`) says it right. Only the function's doc, which names D-327, still restates the old D-327.

Why it matters: the fix changed D-327 and left a file of the change restating it differently. By WAY-263 (section 3 of the method) that is Important. The next agent that changes the card and reads the doc of the component it edits learns a layout that D-327 no longer has. The return step could not correct it, since it changes no code. Its report names it as open point 3.

Evidence: the search over `src/` and `tests/` for `sentence of the solving|under (its|the) heading|after the name|font-size-map-title|size of the title of a map`. This is the only stale restatement of D-327 or D-133. The other hits are true: `maps-screen.css:226`, `maps.ts:66`, `map-lines.ts:32`, `tests/view/map-lines.test.mjs:34` and `tests/view/maps-screen.test.mjs:374`.

Fix: change "under it the one sentence of the solving condition" to say the short sentence of the map's demand from its data stands under the heading, and the sentence of the solving condition closes „Żąda”, as the module header does.

Contradiction: yes. D-327, the sentence "under the heading stands the one short sentence of what the map demands, written by hand in the map's data", and D-133's "in its part „Żąda”, under the table".

