# Report — agent of the return step, task `rozliczenie-przejsc`

**Status:** `done with concerns`

The concerns are C1 and C2 below. Nothing in them stops the request: C1 is a word only the human can
choose and C2 is an entry the human accepts at the merge.

## Commits and files

| Commit | Address | What |
|---|---|---|
| `f9b1d44` | `mariusznn@gmail.com` | `docs: :memo: write when a character's death is settled, and say the rhythm of saving in D-04` |
| `3a5b172` | `mariusznn@gmail.com` | `test: :white_check_mark: name the moment a resurrection is ready as the glossary's entry reads` |

Branch `task/rozliczenie-przejsc`, on `923391c`. Not pushed.

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 31 | 3 |
| `foundations/invariants.md` | 1 | 1 |
| `tests/sim/saved-game.test.mjs` | 10 | 10 |

## What was corrected

1. **D-221, new** (`foundations/decisions.md`, end of the log): when a death is settled. A rule that
   binds after the merge, which no entry held; see C2.
2. **`death-settled-once`, *Derives from*** gains D-221, the link D-221's *Verification* asks for. Its
   sentence and its tests stay.
3. **D-04, *Rejected*:** „at each of its checks” reads „the 30-second rhythm of saving”, D-207's own
   words. `check`, bare, is the last word of the-way's `standing check`, so by *Two glossaries* of the
   glossary template it may not stand in the product's foundation in a meaning of the domain. Same
   meaning.
4. **`tests/sim/saved-game.test.mjs`, ten places:** „moment of resurrection” reads „moment of
   readiness”, the words of `resurrection-renewal`. The glossary gives `resurrection` as what a
   character has ready or not, the map run ending in death all the same; „moment of resurrection”
   names an event of coming back, the very meaning row 11 shuts out. Nine are titles of cases, one a
   doc comment. No expectation changed.

One sentence of the meaning for the request, in the task document's language (WAY-114):

| Entry | Znaczenie |
|---|---|
| D-221 | Śmierć rozlicza osobna funkcja symulacji, a nie funkcje upływu czasu gry: kto podaje upływ czasu, zaraz potem woła ją z chwilą zegara przeglądarki, więc stan gry na ekranie i w zapisie ma śmierć już rozliczoną, a wczytanie odmawia zapisu ze śmiercią nierozliczoną. |

## Comparison with the code at `923391c`

| Entry | Result |
|---|---|
| D-03, D-04 | match; `clock.ts` is the one reader of `Date.now()` and `performance.now()` under `src/browser/`, `settleDeath`, `send` and the headquarters' lines take its moment, and the game state holds moments of events; D-04's *Rejected* corrected as above |
| D-179, D-187, D-188 | match: `takeFromNowhere`, `tripEntryCut` and `tripWarning` as written |
| D-183 | true: „the items outside the frozen bring list are lost” holds on a marked run, on which those inside go too, as `trip-run-end` says |
| D-185, D-186, D-201, D-147 | match; order in `game-view.ts`: deposit line, settlement line, body row, solved line, practice, preview |
| D-189, D-194, D-214 | match: mark bound in `startRun`, carried to the end and through the load; pay and deposit only on an unmarked completion |
| D-190 | matches; the map run kept on the screen gains only its settlement, `restart` reads the team after `progressLost` |
| D-212 | matches: the load settles nothing and the clock leaves a settled death the very state |
| D-215–D-218 | match, texts, roles and places |
| D-219 | matches. The clock reads `Date.now()` once on each flush, and the death's game minute and its settlement are one flush. The „real moment” of `resurrection-renewal` is therefore that reading, at most one reading after the game minute of death; Q11 accepts the limits of that clock, and the sentence needs no change |
| D-220 | matches: `createCharacter` is the one place a character is made |
| D-61, D-62, D-71, D-96, D-119, D-132, D-134, D-136, D-164, D-173, D-176, D-191, D-199, D-200, D-206, D-207 | true; a wipe leaves the Understanding, the copy, the seed and the rhythm of saving as they say. D-200's „no undo of a purchase” is no sentence about a death |
| D-192 | not changed, as report 06 gives; `Character` already holds `id` and `name` beside its three roles |
| `solved-map-manual-run`, `trip-transfer`, `trip-run-end` | match; markers in `tests/sim/trip.test.mjs` and `tests/sim/saved-game.test.mjs` |
| `resurrection-renewal` | matches; markers in `tests/sim/death.test.mjs`, `tests/view/clock.test.mjs`, `tests/view/headquarters.test.mjs`. *Part* names `browser-view`, where two of the three files stand |
| `death-settled-once` | matches; markers in `tests/sim/death.test.mjs` alone (`:304`, `:317`), so the handoff's list reads wider than the file holds, and that fits its *Part*, `simulation` |
| `minute-span-split`, `map-run-repeatability`, `restart-seed`, `player-map-run-pace`, `simulation-isolation`, `simulation-inputs`, `save-version`, `character-team` | true |
| `resurrection`, `generation number` | match the code; see correction 4 and C1 for the uses |
| `manual map run`, `solved map`, `map run restart`, `completion`, `practice`, `repertoire`, `copy` | true |
| Part map: `simulation`, `browser-view`, `build-tools`, `product-foundation` | true. No new source file; `tests/sim/death.test.mjs` falls under `tests/sim/**`, `stryker.config.json` stands in `build-tools`; `foundation_check.py` claims every tracked file |
| *Method* `test` of the three new invariants | holds now the tests stand |

Handoff's other points:

- **D-04's old wording:** a multi-line search of every file outside `.the-way`, `.runs`, `node_modules`
  and `dist`, for the English wordings and the Polish forms „tylko ze stanu”, „wyłącznie ze stanu” and
  „rysuje … ze stanu”, finds D-03 and D-04 in their new wording and a styleguide line on another
  matter. Control: the same words hit `src/browser/sim/game.ts` and `src/browser/view/game-view.ts`
  at `95de83b`, and the old sentence twice in that commit's log. `passRealTime` and `createGameView`
  read the new way. `src/browser/sim/saved-game.ts:1110`, „no real time enters the load”, stays true.
- **Styleguide:** `guidelines/styleguide-browser-view.md` names neither the headquarters' row nor the
  lines of the map-run screen, so nothing there goes false. The new lines use `text-secondary` and
  `danger` in their meanings, from tokens, and add no shared control, state or role.
- **`guidelines/coding-saved-game.md`:** true, its examples of keys included: `tripList`, `chest`,
  `characterSkills`, `practice`, `fields`, `list`, `oneOf`, `integer`, `count` stand as it says.
  `deposited` is `[]` at a marked completion, which „its entries in the order of `bringPlan`” covers.
  „żaden czas rzeczywisty … nie wchodzi do wczytanego stanu gry” is about the time passed since the
  save: nothing is added at the load, and a stored moment comes from the document as
  `realMsCarry` already does. Version 1's document stays in the test and is refused
  (`tests/sim/saved-game.test.mjs:736`). `guidelines/testing.md:166` cites four cases by name; all
  four stand.
- **`guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`,
  `src/browser/AGENTS.md`:** nothing goes false; „Widok przekazuje wybory gracza do tych funkcji”
  still holds of `passRealTime` and `advanceMinutes`.
- **The review's search, repeated for what it left out:** `restart`, `deposit`, `equipment`, `chest`,
  `practice`, `rank`, `bought`, `death`, `dies`, `loot`, `repeat`, `again`, `solved`, `earn`, `paid`,
  `headquarters`, `real time`, in `foundations/` and `guidelines/`, each hit read in its line and, where
  the line could go false, in its entry. The omitted long lines were read from the file. None goes
  false beyond what is corrected above.
- **Environment facts:** none to write. The change rests on nothing outside the product that the
  foundation lacks; the numbers of loop reach it through the human's answers, as in earlier tasks,
  and no entry of `foundations/environment_facts.md` cites loop's tests.
- **Projected entries:** read in `definicja_mvp_loop2.md`, § Projected foundation changes. The code
  makes true no entry the foundation step missed; `solved-map-manual-run`'s *Part*, `every`, is as
  approved.
- **Words:** `settle` for a death, `renewal`, `reading`, `moment` and `marked run` keep meanings a
  reader gives them, so none takes an entry. `marked run` stands in code comments alone, each beside
  `solvedMapRun`; D-134's visible mark is another use of the same plain word.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at the start, on `923391c` | 0 | 0 errors |
| the same, with the entries written | 0 | 0 errors |
| the same, on `3a5b172` | 0 | 0 errors |
| `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --ignore-path .gitignore --check tests/sim/saved-game.test.mjs` | 0 | clean |
| `git diff --check` | 0 | clean |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 17 pass, 0 fail |
| `git grep -c "moment of resurrection"` | 1 | no hit left; the words hit before the edit |
| `git log -3 --format='%h %ae %s'` | 0 | both commits at `mariusznn@gmail.com` |

Not run: `npm test` whole, as the handoff gives; it is the orchestrator's, and it passed at `923391c`,
before these two commits. ESLint was not run on the test: strings and one comment changed.

## Own-work check

- **The requirement most likely missed:** „a choice that binds after the merge”. The foundation step
  worked from the spec's table of entries, so a binding rule the table left out would stand nowhere.
- **The check:** each spec decision read for what still binds once the change is merged, each against
  a search of the foundation.
- **What it showed:** decision 4 binds and stood in no entry, a search for `settl` in the three
  foundation files finding D-216's clause on what the game state remembers and `death-settled-once`,
  neither saying who settles or that the load refuses. It stood in code comments and in the spec,
  which leaves the tree with the cycle. Written as D-221. The other decisions: 1 in D-214; 2 in D-189
  and the invariants; 3 in D-220 and `resurrection-renewal`; 5 in D-216's *Rationale* and
  `death-settled-once`; 6 in D-190; 7 in D-04 and D-219; 8 in D-215–D-218; 9 in the guideline's strict
  reading and D-206, D-07 and D-55; 10 and 11 end with the work.

## Concerns

**C1. The verb `resurrect` keeps another meaning in three tracked places; left as it stands, for the
human's word.**
`foundations/decisions.md` (D-101, „a delayed renewal cannot resurrect a destroyed session”),
`tests/http.test.mjs:642` and the test name at `tests/sim/program-counts.test.mjs:258` use it for
bringing back a session and a count. Report 06 (C4) and report 08 (M3) name it; report 17 leaves it for
the request. Read strictly, the glossary template's *Which words take an entry* asks for a rename with
the human choosing the word, so an agent may not pick it. I do not read this as a question that
returns `blocked`: the foundation step's list does not hold it, the meaning is one a reader gives, so
*Not* stays `none` and no `TODO` stands, and the main branch's rule is kept either way.

- Question for the request: is `resurrect` renamed in those three places?
- Recommended: **„restore”** in D-101 and the HTTP comment, and „bring back” in the test's name. It
  costs three one-word edits and no meaning.
- Left as it is: one word in the foundation with a second, ordinary sense, about no character.

**C2. D-221 stands in no table of the spec or the plan.**
It comes from spec decision 4, whose *Rejected* it keeps, and the return step's „a choice that binds
after the merge” (WAY-36). The rule binds task 18: its computing of time away has to settle each death
it passes, or a saved game state is refused at the next load and so discarded. Report 17 declined that
call as task 18's review; after the merge nothing but this entry tells that review to look.

- The binding sentences say „a moment of the browser's clock”, not „the reading”, so that a moment
  task 18 computes stays within them. A narrower sentence would be changed by task 18 at once.
- *Verification*'s examples are mine, from spec decision 4; no human gave them. *Origin* cites To do 16
  and the first question carried to cycle, since the spec leaves the tree.
- Rejected: leaving it in the cycle record. Then only code comments carry the rule, and task 18's
  refinement reads the foundation. Cost if wrong: one entry and one link to take out.

## Choices, each with the way rejected

| Choice | Rejected | Cost if wrong |
|---|---|---|
| D-221 a new entry with the next number; the log's question „When is a character's death settled?” is answered nowhere | a clause in D-190, whose question is what a death takes; a clause in D-212, which holds the load alone | a moved sentence |
| `death-settled-once` names D-221, as the template's two-way link asks | *Verification* with examples alone | one link |
| The number the line of To do 18 names is held at the death, not read from the team (spec decision 5): left out of the foundation; D-216's `{n}` does not collide with it, and the code and its load rule hold it | a clause in D-216, with a rule of no meaning to a player today | task 18 reads the key's comment in `src/browser/sim/types.ts` |
| „moment of readiness” in the test's titles, the invariant's own words | „time of readiness”, which no entry uses | wording |
| The comment at `tests/sim/saved-game.test.mjs:442`, „version 1 with the mark…”, left: it says what the document was built on, and report 10's and 12's comments stay findings of review | rewriting it here | none |
| Two commits, foundation and test | one commit | none |

## Changed invariant tests

Titles only, under `// invariant: save-version`, in `tests/sim/saved-game.test.mjs`: the case at `:702`
and eight rows of the table of crafted documents (`:828`, `:842`–`:854`). Each row still breaks the
same key the same way, and the file passes. `death-settled-once` changed only in *Derives from*, so its
sentence and the cases citing it stand as they were.

## Answers of step 4

Trust boundary and `SAVED_GAME_VERSION`: this step changes neither `saved-game.ts` nor the constant.
No entry names the raising of the version, and D-221's sentence on the load states what the code does.

## Reaches beyond the handoff

| What | Where | Why |
|---|---|---|
| `guidelines/coding.md`, `guidelines/testing.md`, whole | | `AGENTS.md`, before changing a test |
| `guidelines/coding-browser-module.md`, `guidelines/coding-simulation-module.md`, `src/browser/AGENTS.md`, whole | | whether a sentence went false |
| The glossary element, the decisions element, `elements/common/way_of_working.md`, `elements/common/rules.md`, `record-invariant` | `.the-way/elements/` | the entries written |
| the-way's glossary, headings | `.the-way/foundations/glossary.md` | correction 3 |
| WAY-11, WAY-33, WAY-36, WAY-126, WAY-134 | `.the-way/foundations/decisions.md` | what the return step writes |
| Projected entries | `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`, `plan_mvp_loop2.md` | WAY-126 |
| `README.md`, lines 46–79 | | whether the change makes it false |

## Searches not found or unclear

- **Unclear, whether the verb `resurrect` is one of the two meanings the template renames,** or an
  ordinary sense it leaves alone: C1.
- **Unclear, the handoff's list of markers:** it places `death-settled-once` in the three test files
  together; the file holds it in `tests/sim/death.test.mjs` alone.
- **Unclear, how far the template's bare-word rule reaches:** the foundation's older entries use bare
  `map`, `action` and `test`, last words of the-way's terms, as a matter of course. I corrected only
  the one bare word this change brought in with a meaning of its own, `check`. `map` in the new entries
  follows `solved map` and the log's use.
- **Observed, not this change:** `README.md`, § *Co pokazuje strona*, describes an earlier game:
  „Stan gry żyje tylko w pamięci strony” and „Konta, zapis stanu i serwerowa część gry jeszcze nie
  istnieją” were false before this task, and it speaks of none of the things this change touches. Left
  as it is.
- **Not found:** the *Rests on* of the new invariants needs no fact, and no term of the task's sources
  stays unwritten.
