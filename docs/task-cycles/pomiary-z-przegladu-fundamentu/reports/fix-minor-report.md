# Fix report — the four Minor findings of the whole-change review

**Status:** done. **Commit:** `92ce6ef7` (on reviewed head `72817471`), author `mariusznn@gmail.com`. Only `foundations/decisions.md` changed (18 added, 14 removed). Tree clean.

## Findings
1. **Minor 1 (D-247) — fixed.** "so the seconds after many months hold for a loop that does not die" became "so the seconds after many months are those of a loop that does not die, which no loop measured was". It no longer reads as a measured result for such a loop.
2. **Minor 2 (D-268) — fixed by the reviewer's first alternative.** "forty files stands against that measurement" became "and it is set at forty files". The sentence now says the threshold counts files and is set at forty; no derivation is claimed.
3. **Minor 3 (D-04, D-147, D-339) — fixed.** Each of the three now gives "went on to game minute 1670 as a median (341 to 1816)" for the Las variant, the same words as D-347.
4. **Minor 4, part one (D-347) — fixed.** One sentence after the measurement: "What a load takes from the chronicle, which the lack above names, is that much, apart from the paragraph of the last encounter: up to 255 entries and 18 892 bytes of a map run of Las, 186 entries and 13 853 bytes of one of „Las — głębiej”." Figures are the *Context*'s maxima; "apart from the paragraph of the last encounter" is D-339's own sentence.
5. **Minor 4, part two ("a game that knows everything") — fixed in plain words, no glossary entry.** In D-04, D-147, D-339, D-347 and D-208 the phrase is now "a game that already knew everything, so that no discovery was made in it" (D-208: the same, inside its sentence). Why this and not a glossary entry: the *Context* gives the phrase only as the reason the measurement covers no discoveries ("odkryć (gra znała wszystko)"), so the plain wording says exactly that and nothing more; a glossary entry would need a definition of the game's state that no source gives, and would go through `the-way-record-glossary-term` for one phrase of one measurement. Cost if the reviewer wants a term: the phrase in five places then moves to one entry.

None contested.

## Checks
- `python -B .the-way/elements/common/foundation_check.py` — `0 errors`, exit 0 (after the edits).
- `grep -c "knows everything" foundations/decisions.md` — 0 left (exit 0 of the pipeline, count 0).
- Not run: the full `npm test` (the orchestrator's); no focused test, since only entries of the foundation changed and `tests/view/memory-limit.mjs` was not touched.

## Own-work check
- Requirement most likely unmet: the fix grows beyond its findings or brings a figure outside the *Context*. Check: `git diff 72817471 -- foundations/decisions.md` read through; every figure added (1670, 341, 1816, 255, 18 892, 186, 13 853) stands in the *Context* line of the chronicle measurement and in D-347 before the fix; nothing else changed. Result: the diff touches only the five phrases above plus the one new sentence in D-347.
- Second: the new D-347 sentence must not claim more than the measurement. It states the size of what a load takes (maxima) and leaves the choice untouched; no fit/overflow claim.

## Reaches beyond the dispatch
None.

## Unread material
`foundations/glossary.md` not read again (only the choice not to add an entry rests on the earlier selective grep and the *Context* wording). The review file `reports/review-whole-change.md` not read, only the findings file the handoff names. `.the-way/task-cycle/change/SKILL.md` was read in the first run and `fix.md` now.

## Searches not found or unclear
- The *Context* gives no definition of "gra znająca wszystko"; the gloss "so that no discovery was made in it" is read from the *Context* line that lists discoveries as left out because the game knew everything. If the reviewer reads that line otherwise, the gloss needs a source from the human.
- Line 129 of `foundations/decisions.md` (D-04) now runs to 105 characters (multibyte „ counted as bytes by the tool); the foundation check does not limit it.
