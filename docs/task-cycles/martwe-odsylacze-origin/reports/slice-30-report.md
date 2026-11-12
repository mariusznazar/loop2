# Slice 30 report — view tests of the chronicle and discoveries point to no note

**Status:** done

**Slice base:** `a6ecd19ec08d94bdd439528306611d7d88fd5741` (HEAD was still it at the start; the worktree was clean).

**Commits** (branch `task/martwe-odsylacze-origin`):
- `5d0b98a3` docs: add D-380 and D-381 to `foundations/decisions.md` (+30 lines)
- `b6fb4213` test: comments of the nine view tests (+30 / -36 lines)
- `312eda1b` test: re-wrap the first comment of four of the files (after the pointers left it)

Files changed: `foundations/decisions.md` (+30), `tests/view/character-screen.test.mjs`, `chronicle-entries.test.mjs`, `chronicle-game.test.mjs`, `chronicle.test.mjs`, `discovery-band.test.mjs`, `discovery-rule.test.mjs`, `icons.test.mjs`, `now-lines.test.mjs`, `right-area.test.mjs`. Only comments changed in the tests (no test title needed a change; no code, no assertion).

## Checks (command and exit code)

| Check | Result |
|---|---|
| `npm test -- tests/view/<file>.test.mjs` for each of the nine files, one at a time (run after the last edit) | all exit 0: chronicle 27/27, chronicle-entries 13/13, chronicle-game 4/4, discovery-band 9/9, discovery-rule 18/18, now-lines 9/9, icons 32/32, right-area 13/13, character-screen 7/7 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the nine files | exit 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig` on the nine files | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| S1 (`git grep` of the Checks) | prints nothing, exit 1 |
| S2 (`git grep` of the Checks) | prints nothing, exit 1 (it printed 12 lines before the change, all pointers, all fixed; none stays) |
| S3 (`\b[Ss]pec\b|\b[Pp]lan\b|docs/task-cycles|\b[Ss]lice [0-9]+|\b[Rr]ound [0-9]+|\bpackage [0-9]+`) | prints 3 lines, all "trip plan" (see below); the 15 hits on "spec" are gone |
| the product gate (`npm test` with no argument) | not run, as the handoff says |

The first run of the foundation check, after D-380 alone, and the run with `--skip-test-citations` after each entry (as the record-decision skill step 4.3 gives) also exited 0.

## Own-work check

Requirement most likely not met: a pointer to a document outside the foundation that none of the three searches names (a pointer written in a form the regexes miss). Check run: the three S searches, plus the wider search `Row [0-9]|Finding|binding answer|Task item|[Rr]eview|answer [0-9]|cause [0-9]|loop2#|\btask\b|\bitem [0-9]|way [A-Z][0-9]|\bsection [0-9]|\bquestion\b|\bsettlement|\bTo do\b|vault|\bnote\b` on the nine files, a search for `loop`/`old `/`source repository`/`Mariusz`/`handoff`/`cycle`, and a check that every `D-nn` the nine files cite exists as a `### D-nn` heading (all 43 do). The first wider search found three pointers the S1-S3 regexes had missed: `question 5, way D1` (chronicle.test.mjs), `task item N` (chronicle-game, right-area; the S2 regex has no `item`), and `spec sections 6 and 9.2` (icons). They are fixed below. After the fix the wider search prints only `note` as a variable name in character-screen.test.mjs (a UI note, not a document) and the path `tests/view/end-question.test.mjs` (a repository file).

## Per changed line: old pointer, outcome, entry

Outcome words: entry named / entry written / removed.

### Entries written (through `the-way-record-decision`, steps 1-4.3)

- **D-380** — How does the list of the chronicle draw a chronicle that grows through a long map run? Written because the tests assert a window of the newest entries that grows on a scroll near its end, starts anew with a filter, a send and "Restart", an entry text composed once (a discovery's entry keeps the group name the band named, after a rename), a paragraph composed only when the encounter changed, and no row drawn again when nothing changed. The foundation held none of that (it holds only that the chronicle lives in the page memory, D-339, and names the risk of a growing chronicle, D-347). Scope browser-view; Relations derives from D-338 · D-339 · D-343 · D-345; Origin `none`. Reasoning taken from the spec of the task cycle of the chronicle (decisions D2, D6, D7, D8 of that spec, read from `git show b6f9c544:docs/task-cycles/kronika-z-filtrami/spec.md`, a record of a loop2 cycle in git history; the note `kronika_z_filtrami_loop2.md` of the snapshot does not hold them) and from D-03 (the screen is drawn up to five times a second), D-312, D-339, D-347. *Rejected* holds the three ways that spec weighed (draw every entry; a limit of entries, which D-339 already rejects; a library of virtual lists). No size is stated (the maker's to tune).
- **D-381** — How long does the pick of a filter of the chronicle hold on the screen of a map run? Written because tests assert the filter picked is kept through leaving the screen and through "Restart" and is "Wszystko" at a send; D-346 holds this for the tab only and D-343 says only that "Wszystko" is picked at the send. The note (`kronika_z_filtrami_loop2.md`, To do 8 and row 14) states it for the tab alone; the spec read the filter like the tab ("the filter as D9 reads it"). So the new entry rests on that reading and says so by deriving from D-343 and D-346. *Rejected* names one way derived from D-346's own cost for the tab. A cleaner shape would be a change of D-346 to cover the filter; the slice allows only adding a decision, so that is left to the orchestrator.

Meaning in English: D-380 says the list shows a bounded, growing window of the newest entries and redraws nothing that did not change, and an entry's text is fixed when recorded. D-381 says the filter the player picked stays picked through the whole map run and "Restart", as the tab does.

The skill's step 4.1-4.2 (ask the human, show) was not done: the handoff says the orchestrator decides and the human is asked nothing; the entry is the cycle's, to be read at the merge. Step 2 (search of the foundation) was made by reading D-338 to D-348, D-312, D-122, D-147, D-03, the glossary entries `chronicle` and `map run restart`; no collision found, no glossary term gained a second meaning (the word "window" for the list is also used for the end-of-run window of D-368; D-380 says "a window of a fixed size" of the list and nothing else uses it in that text).

### Test comments

| File | Old pointer | Outcome | Entry |
|---|---|---|---|
| `tests/view/character-screen.test.mjs:1` | `task ekrany-i-menu, To do 4 and 12; questions 3, 10 and 12` | removed | the decisions already cited on the line (D-199, D-200, D-217, D-244, D-245, D-287) stay |
| `tests/view/chronicle-entries.test.mjs:1` | `task kronika-z-filtrami, To do 5`, `spec D4` | removed; D-348 added to the cited ones | D-342, D-348, D-292 |
| `tests/view/chronicle-game.test.mjs:1-2` | `task kronika-z-filtrami, To do 1, 6 and 8`; `spec D2, D9, D11` | removed; D-381 added | D-338, D-339, D-346, D-381, D-147, D-311 |
| `tests/view/chronicle-game.test.mjs:181` (now 180) | `spec D2` | removed | D-346, D-339 |
| `tests/view/chronicle-game.test.mjs:208` | `spec D2` | removed; D-381 added | D-343, D-346, D-381 |
| `tests/view/chronicle-game.test.mjs:234` | `spec D2` | removed; D-381 added | D-343, D-346, D-381 |
| `tests/view/chronicle-game.test.mjs:266` | `task item 6` | removed | D-339, D-147 (D-147 holds that the paragraph stands in the chronicle and never in the world area) |
| `tests/view/chronicle.test.mjs:1-2` | `task kronika-z-filtrami, To do 1–7`; `spec D2, D3, D6, D7, D8` | removed; D-348, D-380, D-381 added | D-338 to D-346, D-348, D-380, D-381, D-147, D-122 |
| `tests/view/chronicle.test.mjs:117` | none, but "Kronika and Wszystko at a send" had only D-343, D-346 | D-381 added | entry named |
| `tests/view/chronicle.test.mjs:253` | `question 5, way D1` | removed | D-147 (one paragraph, the last encounter) |
| `tests/view/chronicle.test.mjs:290` | none, "the filter the player picked (D-346)" | D-381 added | entry named |
| `tests/view/chronicle.test.mjs:417-418` | `spec D8` | entry named | D-380 (with D-312, already there) |
| `tests/view/chronicle.test.mjs:532` | `spec D7` | entry named | D-380 |
| `tests/view/chronicle.test.mjs:586` | `spec D2, D7` | entry named | D-380 |
| `tests/view/discovery-band.test.mjs:1` | `task ekran-przejscia, To do 7` | removed | D-122, D-312, D-313, D-44, D-279 stay |
| `tests/view/discovery-rule.test.mjs:1` | `task ekran-przejscia, To do 7, questions 5 and 10` | removed | D-313 (read whole: it holds every rule the cases test), D-124, D-131 stay |
| `tests/view/now-lines.test.mjs:1` | `task teraz-i-potem, To do 1` | removed | D-334, D-335, D-291, D-292 stay |
| `tests/view/icons.test.mjs:1` | `spec sections 6 and 9.2` | entry named | D-27 and the invariant `icon-file-content` (read whole; it derives from D-27) |
| `tests/view/icons.test.mjs:207-208` | `the text and the two links as the task zbieranie-jako-widowisko (To do 7) writes them` | removed; replaced by "with its page and its licence linked", which the invariant `sprite-credits` states | D-271, `sprite-credits` (already named on the line above) |
| `tests/view/right-area.test.mjs:2-3` | `task kronika-z-filtrami, To do 6, 8 and 9`; `task proporcje-sceny-i-programu, To do 2`; `spec D5, D6, D7, D9` | removed; D-380, D-381 added | D-311, D-343, D-344, D-346, D-380, D-381, D-147, D-276, D-130 |
| `tests/view/right-area.test.mjs:151` | `task item 8` | removed | D-311, D-346 |
| `tests/view/right-area.test.mjs:271` | `task items 9 and 7` | removed | D-343, D-344, D-338 |
| `tests/view/right-area.test.mjs:339` | `task item 2` | removed | D-343, D-338 |
| `tests/view/right-area.test.mjs:367` | `task item 9` | removed | D-343 |
| `tests/view/right-area.test.mjs:395` | `spec D6` | entry named | D-380 (with D-147, D-339) |
| `tests/view/right-area.test.mjs:476` | `spec D7` (and D-343) | entry named | D-380 (D-343 dropped from that line: it does not hold the window) |
| `tests/view/right-area.test.mjs:526` | `spec D7` (and D-343) | entry named | D-380, D-381 |
| `tests/view/right-area.test.mjs:580` | `Spec D6, D7` | entry named | D-380 |
| `tests/view/right-area.test.mjs:609` | `Spec D7` | entry named | D-380 |

Three of the four re-wrapped headers (character-screen, discovery-rule, now-lines, chronicle-game) changed only their line breaks in the third commit.

## Hits of S2 and S3 left, and why they point to nothing outside the repository

- S2: none left.
- S3: `tests/view/chronicle-entries.test.mjs:28` ("A program of the given groups, its trip plan empty unless given"), `:174` (the test title "a changed trip plan gives one entry that names no item") and `:180` (the expected entry "Zmieniono plan wyprawy"): "trip plan" is a part of a program in the game (D-342), not a plan document.
- Other hits of the wider search: `character-screen.test.mjs:236,238,252` (`note`, a variable for the sentence under the heading of the section "Umiejętności"); `chronicle-game.test.mjs:7` ("tests/view/end-question.test.mjs", a file of the repository, named as the setup the test follows).
- Left on purpose, not a pointer by the slice's definition: `chronicle.test.mjs:211` "Catches the words of loop („Postać zamarzła.”) in place of those of „Teraz”": it names the old Loop's wording of a death as a game, not a file, line or test of its repository, and D-344 (Rejected) holds the same wording; `icons.test.mjs:124` "the source repository" is the public icon repository `game-icons/icons` (ICON_SOURCE_COMMIT in `src/browser/view/credits.ts`), not the old Loop.

## Reach beyond the dispatch (make-change section 1)

- `git show b6f9c544:docs/task-cycles/kronika-z-filtrami/spec.md` (the spec of the chronicle cycle in git history): to learn what "spec D2/D6/D7/D8" required, since the cycle records are no longer in the tree. Needed to decide that D7 and D8 live nowhere in the foundation.
- `foundations/decisions.md`: D-03, D-27, D-122, D-147, D-271, D-312, D-313, D-338 to D-348 (each read whole, or the lines of the entry); `foundations/invariants.md`: `resurrection-renewal` (cited by an `invariant:` line in character-screen.test.mjs, read whole), `icon-file-content`, `sprite-credits`; `foundations/glossary.md`: `chronicle`, `map run`, `map run restart`.
- `.the-way/task-cycle/change/slice.md` (the slice method named by make-change section 1).
- `src/browser/view/right-area.tsx` and `src/browser/view/chronicle.ts` (the header comments and constants, to make D-380 say what the code does; not changed, slice 31 owns them).
- The snapshot note `kronika_z_filtrami_loop2.md` (lines on the filter, "Restart", the chronicle's life) to see whether D-381's content came from the note; it did not (see above).

## Unread material

- `guidelines/styleguide-browser-view.md` and `guidelines/testing.md` and `guidelines/coding.md`: read whole.
- `foundations/part_map.md` entry of `browser-view`: not read whole. I searched it only for the part's name; the Orchestrator's addition asked for it. The files of Change are all tests under `tests/view/`, assigned to `browser-view` by the testing guideline's table ("Applies to") and D-264's recipe; no entry was written into the part map and none was needed.
- The vault notes of the snapshot: only `kronika_z_filtrami_loop2.md` was read (the lines named above); the notes of ekran-przejscia, ekrany-i-menu, teraz-i-potem, zbieranie-jako-widowisko and proporcje-sceny were not opened. Their pointers were all of the kind "the task X, To do N" next to decisions that the same comment already cites, and D-313 was read whole to confirm it holds what the cases of discovery-rule test. For character-screen, now-lines and discovery-band I did not check each case against its cited decisions beyond the checks above.
- `.the-way/elements/decisions/examples.md` names WAY-03; read only as a pointer, I did not open WAY-03 (the entries D-377 to D-379 of this log served as the form examples).
- `.the-way/elements/common/projected_mode.md`, `missing_element_file.md`, `critique/SKILL.md`: not read (not projected mode; the log exists; the skill says a change's entries are no collective set).

## Searches not found or unclear

- The spec decisions D3, D5, D9, D11 of the chronicle spec: D3 and D4 map to D-340/D-341/D-344/D-345 and D-342/D-348; D5 (readings of the task's wording) and D9 (tabs, filters, list) map to D-311, D-343, D-346; D11 (tests the design makes necessary) is not a requirement. I dropped these pointers without a separate check of each assertion against the decisions.
- The requirement "the entry of a discovery is fixed when recorded" is put in D-380; D-312's phrase "binds the band alone" implies it but does not say it.
- A value in the task or plan that did not survive my check: none. One remark on the plan: Slice 30's Goal does not name `icon-file-content` or the like; the icons pointer ("spec sections 6 and 9.2") was a section number of a spec, not found in the snapshot, so I replaced it with the decision and invariant that hold the rule.

## Choices and their costs

- Wrote D-380 and D-381 instead of dropping the `spec D7/D8/D2/D9` pointers. If wrong (the windowing is an implementation detail, not a requirement), the cost is two decisions that bind later work about the list; the alternative of dropping the pointers would have left the tests' expectations (window, redraw, filter kept) sourced in no foundation entry, against D-82. Both decisions are the cycle's (no row of the task carries them) and are put before the human at the merge.
- Kept D-381 separate from D-346 instead of editing D-346 (the slice allows only a new decision). Cost if wrong: two decisions say one thing about the tab and the filter.
- Used the spec in git history as the source of D-380's reasoning, since the note does not hold it. Cost if wrong: the reasoning is the spec author's; the *Rationale* cites D-03, D-312, D-339 and D-347 for the parts they hold.
