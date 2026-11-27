# Findings of the review of the whole change — Minor findings within the task, to fix (cut word for word from `reports/review-whole-report.md`, first line `PASS 328562acde41050216e5c67414478ccd2e24c84e`)

No blocking finding. Contradiction with the settlements: none of the findings carries the mark.

### Minor (each within the task)

1. **`foundations/decisions.md:7475` (D-196, binding sentence) — reads two ways once a rank can be
   bought while a map run waits.** The sentence says that during a map run, one that waits or has
   ended included, the editors use "the repertoire of the map run's character, including its bought
   branches". Before this change the character in the map run and the character in the team held the
   same bought branches for the whole of a map run, since no purchase was possible while it stood.
   The change makes them differ (a rank bought in the wait goes to the team's character alone,
   `src/browser/sim/skills.ts:238-283`), so "its bought branches" can now be read as the branches the
   character holds in the team. The code reads it as the map run's own skills of its start
   (`programOf(..., run.character.skills)` in `src/browser/sim/game.ts`), and the *Rationale* the
   change rewrote for D-196 says so ("keeps the skills of its start, without a rank bought in that
   wait"), so code and rationale agree; only the binding sentence is open to a wrong reading by the
   next agent that touches the editors. The author named the ambiguity and left it. Suggested: a
   wording such as "the repertoire of the map run's character with the branches it held at the start
   of the map run". Minor, because the content agrees with the code and the rationale disambiguates
   it; the change writes D-196 (its rationale), so the fix belongs to this task.

2. **`guidelines/styleguide-browser-view.md:1272-1276` (rule "The screen Postać") — repeats the
   sentence of D-287 word for word.** The rule now carries the whole UI sentence „Przejście na mapie
   {mapa} jest niezakończone. Kupiony stopień działa od następnego przejścia tej postaci, także
   w pętli; „Restart” zaczyna bez niego.”, which D-287 already holds. `product-guidelines/template.md`
   of the pinned the-way, "A rule lists no state and repeats no decision or value", calls such a
   sentence a second copy that drifts from the first. The rule before the change named the sentence
   by D-287 without quoting it. The same file already quotes the sentence under „Wyposażenie” the same
   way (line 1218), so the change follows a local precedent; the consequence is one more place to
   update when D-287's words change. Suggested: describe the sentence ("zdanie D-287 o tym, od kiedy
   kupiony stopień działa") without its words.

3. **`src/browser/run-screen.css:256` — the block `@media (width < 1280px) and (hover: none)` for
   `.run-header-back` has no comment of its own naming D-396.** The styleguide rule "Two layouts and
   one threshold between them" (`guidelines/styleguide-browser-view.md:594-595`) says each block of
   the phone layout has a comment that names D-396. The comment above the preceding
   `@media (width < 1280px)` block (lines 240-245) names D-396 and mentions the device that does not
   hover, so a reader finds the reason two blocks up; every other such block in the stylesheets
   (`src/browser/character-screen.css:65`, `src/browser/run-screen.css:672`, `src/browser/styles.css:789`,
   `src/browser/maps-screen.css:615` and others) carries its own comment. No effect for the player.

4. **`src/browser/sim/skills.ts:223-231` (`purchaseOpen`) — a second copy of the test of a map run's
   end.** `purchaseOpen` writes out `run.death !== null || run.completion !== null`, the test
   `mapRunEnded` holds, because `run.ts` imports `skills.ts`; the comment says so and the author's
   report names the cost. A later kind of end added to `mapRunEnded` alone would leave purchases
   refused in it, and no test would show it, since the tests enumerate today's two ends. Suggested:
   either a comment in `mapRunEnded` pointing back to `purchaseOpen`, or the end test moved to a module
   both import. Structure finding below the size threshold (both runs of the size rule report 0), so
   Minor.

5. **`tests/sim/skills.test.mjs:248-252` — `assert.equal(bought.run, waiting.run, …)` asserts the
   very object of the map run, not that the map run stayed as it was.** The requirement (D-200
   *Verification*: "the map run staying as it was") is met by any purchase that leaves the map run's
   content unchanged; an implementation that rebuilt `state.run` with equal content (for example a
   spread of the state that copies the run) would fail this assertion while meeting the requirement.
   `guidelines/testing.md`, rule "Behaviour, not implementation", asks the reviewer to flag an
   assertion that a correct change of implementation could break. The refusal assertions of the same
   file use identity on purpose (a refused purchase returns the state given), which is a different
   claim. Suggested: `assert.deepEqual` of the run, or of `run.character.skills`, against the waiting
   run.
