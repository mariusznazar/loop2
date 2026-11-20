Status: done with concerns (slice 11, task `zapas-i-wskrzeszenie`)

## Commit and files

- `8d0e49cb` — `docs: :memo: write what the screens say of a manual run of a solved map and of the resurrection's uses into D-215, D-216, D-217 and D-329, and withdraw D-251 with no successor ...` (base `14f9b8da`). Committed by path (`git add foundations/decisions.md`); the working tree is clean after it.
- `foundations/decisions.md`: 59 lines added, 70 removed (the D-251 entry, 26 lines, is most of the removal).

## What was written (each entry through `the-way-record-decision`, read as a file: `.claude/skills/the-way-record-decision/SKILL.md` -> `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`, `common/way_of_working.md`, `common/rules.md`, `task-cycle/skill/foundation_step.md`)

Each entry: one sentence in English, one in Polish, and its mark.

- D-215 (row 8) — question now "Where does the player read that a manual run of a solved map pays no practice?". Binding line: „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.” in `text-secondary`. Rationale says the attempt pays no practice and takes supplies from and brings loot to the chest as any map run (D-189). *Rejected* kept word for word (it is the row's "line removed" way). Mark: `row 8`.
  - EN: the screen of a manual run of a solved map tells that it pays no practice but takes from and carries to the chest like any other run.
  - PL: ekran ręcznego przejścia mapy rozwiązanej mówi, że nie płaci wprawy, a zapas bierze ze skrzynki i wynosi do niej jak każde inne przejście.
- D-216 (row 7) — the four lines in the wordings of question 6; paragraph 1 holds the death lines and the form of the span (question 16: whole hours „co godzinę” / „co 2 godziny” / „co 5 godzin" declined like the game's counters, otherwise „co {g} godz. {m} min", below an hour „co {m} min", in the form of D-217); paragraph 2 holds the line of a returned use, standing only where the first solving returned one. The uses left {u} are the data's count less the uses spent the settlement of the death holds, read when the window is drawn (the orchestrator's correction (a)); Rationale says the number describes the moment of the death for as long as the data's count stays as it was, and the line at the character gives the number of the moment of reading. Mark: `row 7`; the paragraph about the form of the span is the cycle's part (from question 16, which is no row).
  - EN: the end-of-run window tells, after a death, a use spent / no use left / no practice, with the uses left of the moment of the death, and after a first solving the use that returned.
  - PL: okno końca mówi po śmierci o zużytym użyciu, braku użycia albo braku wprawy, z liczbą użyć z chwili śmierci, a po pierwszym rozwiązaniu o użyciu, które wróciło.
- D-217 (row 6) — the line at a character is „Wskrzeszenie drużyny: użycia {u} z {c}” (full stock), „…, następne za {g} godz. {m} min czasu realnego” (stock not full, a use left), both `text-secondary`, and „użycia 0 z {c}, następne za … — śmierć zabierze wprawę i wykupione stopnie” in `danger` at zero uses; below an hour „następne za {m} min czasu realnego”; the sentence about rounding minutes unchanged word for word. *Rejected* gets the two ways of question 6 the row's source keeps (each use called a resurrection; `danger` already at the last use), each with `no cost to the product known`. Mark: `row 6`; the sentence in Rationale that `danger` stands only at zero because only a death with none left takes the practice, and the pair of examples (adapted from the old pair, plus a violating case of one use left in `danger`), are the cycle's parts. The pair is the cycle's addition to the Verification for the role of the line while a use is left, a part no test holds.
  - EN: the line at a character shows the uses and, while the stock is not full, the time to the next return, in `danger` only at zero uses.
  - PL: wiersz przy postaci pokazuje użycia i, gdy zapas nie jest pełny, czas do następnego powrotu; `danger` tylko przy zerze użyć.
- D-329 — *Verification* and *Rationale* without the warning of a rehearsal and without D-251; the binding sentences untouched. Mark: `projected` (Decisions in play, D-329).
  - EN: at a character in „Kto idzie” „Wejdź” has no warning of a rehearsal under it.
  - PL: przy postaci w „Kto idzie” pod „Wejdź” nie stoi ostrzeżenie próby.
- D-251 — entry removed from the section "Earning loop and time away"; row added to "Withdrawn identifiers" between D-80 and D-254, successor `none`, with Why: a manual run of a solved map takes its equipment from the chest and brings its loot out to it as an earning loop does (D-189), so no rehearsal takes a supply the earning loop would not get and the card has nothing to mark. Its only reference in the log, in D-329, is rewritten; D-189 held none after Slice 1. Mark: `projected` (To do 7).
  - EN: the mark of a rehearsal under „Wejdź” is withdrawn with no successor.
  - PL: znak próby pod „Wejdź” wychodzi z dziennika bez następcy.

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 1 (as the slice's *Checks* expect), 47 errors, **0 of them in `foundations/`**. A second run after the commit gave 0 lines starting `foundations/`. No word-count or sentence-count error for D-215, D-216, D-217, D-329.
  - The errors by file, all lines the slice names as standing in a file a later slice changes:
    - `D-251` is withdrawn (references): `guidelines/styleguide-browser-view.md` (649, 679); `src/browser/maps-screen.css` (8, 130); `src/browser/view/maps-screen.tsx` (6); `src/browser/view/trip-lines.ts` (18, 25); `tests/sim/trip.test.mjs` (647); `tests/view/account-screen.test.mjs` (2746, 3129, 3134); `tests/view/maps-screen.test.mjs` (1, 746, 750); `tests/view/trip.test.mjs` (171, 176).
    - `decision:` quotation of a sentence Slice 1 or this slice rewrote, in no binding sentence now: D-217 — `tests/view/account-screen.test.mjs` (3260, 5152), `character-screen.test.mjs` (119), `headquarters-screen.test.mjs` (259), `maps-screen.test.mjs` (486, 535), `team-lines.test.mjs` (76, 93, 110, 129, 142, 150); D-216 — `end-window-game.test.mjs` (1087, 1164, 1165), `end-window-lines.test.mjs` (166, 187, 202), `end-window.test.mjs` (234, 285, 337, 338); D-189 (Slice 1) — `account-screen.test.mjs` (3133), `maps-screen.test.mjs` (749), `trip.test.mjs` (175); D-190 (Slice 1) — `clock.test.mjs` (320, 392, 538, 581, 582); D-242 (Slice 1) — `clock.test.mjs` (585).
  - No test quotes D-215 or D-329 in a way that now fails, so those sentence starts held.
- No test run, no full gate (not mine).

## Own-work check

- Requirement most likely missed: that no sentence or reference outside the stated change remains in the log that says the old rule (a take from nowhere, the old lines, the 8 hours, the mark). Check: `grep` of `foundations/*.md` for `D-251` (1 hit: the withdrawn row), „nic nie bierze”, „Wskrzeszenie zużyte”, „Wskrzeszenie odnowione”, „po 8 godzinach”, „drużyny gotowe”, „nie było gotowe” — no other hits. Showed what the requirement needs.
- The walkthrough and UI checks do not apply: the change alters no behaviour a user sees in the running product (foundation text only; the screens change in later slices).

## Concerns

1. **D-329 binding sentence** still reads „„Wejdź” and „Puść w pętlę” with their warnings”. The slice says only the *Verification* and rationale change, and "keep each sentence the task does not change word for word", so I left it; „Wejdź” now has no warning at all, so "their" is loosely true (only where one stands). Whether to reword it is a decision for the orchestrator.
2. **Stray wording about a ready resurrection** that the slice does not name, left untouched: `foundations/decisions.md` D-219 (heading "Whose clock counts the renewal of a resurrection?" and its binding sentence), the line about a "death with no resurrection ready" in the entry that ends with "D-56 has a map run name its character by number" (earning-loop map run copy, around the line 8661 of the base), and `foundations/decisions.md:98` ("the moment a resurrection is ready"); also `foundations/glossary.md:219` (`generation number`: "no resurrection is ready"). Not a check error; the plan lists none of them.
3. **D-216 heading** left as "…what a completion renewed?" (the task changes the four lines, not the question; "renewed" still reads true of a use returned).
4. The span reading in D-216 says "in the form of the time reading of D-217" for the not-whole-hours case; D-217's own rule of rounding minutes up is thereby referred to, not repeated. Whether the span of the data (a number of real minutes) can be non-whole is left to the code slices (Slices 14, 15).

## Reaches beyond the dispatch

- `foundations/decisions.md` — the withdrawn-numbers table and the sort order of its rows, and D-189 / D-190 / D-428 as they stand (read for the reference check, via `grep`); `git ls-files --eol` of the log (LF). Reason: to place the withdrawn row and to leave the file's line endings intact.
- `src/browser/view/counted-name.ts` (first 15 lines) — to name the declension rule of question 16 correctly in D-216 (the binding sentence names no file).
- Foundation-check output saved to a file in `.runs/` and deleted afterwards.

## Working copies

None kept: a few scratch files (`.runs/slice-11-fc.txt`, and a throwaway script and an empty directory made and removed in the first minutes) stood directly under `.runs/` of the worktree and were removed before the commit; `.runs/slice-11-executor/` was made empty and removed. Nothing remains of mine except this report.

## Unread material

- D-185, D-189, D-190, D-215, D-216, D-217, D-218, D-251, D-329 and D-368 were read whole. D-428: read in part (its closing rationale and rejected, in the output of one search), not whole. D-219 and the entries at the other stray hits of concern 2: read in part (the lines the searches returned).
- `foundations/glossary.md`: the entry `resurrection` and `generation number` read (the lines of the search), not the file. `foundations/part_map.md`: the first 31 lines (the part `browser-view`) read, the rest not.
- `task.md` read only through the passages copied in the handoff; `plan.md` not opened. The two "Foundation entries rows" (D-189, D-190) were taken from the table copied in the handoff.
- `.the-way/elements/decisions/template.md` read whole; every other file the handoff names read whole.

## Searches not found or unclear

- none

## Choices made, with the way rejected

- The new D-216 paragraph for the returned use is a second paragraph, not a second sentence of the first: the first paragraph would otherwise grow past the template's limits and the sentence start „After the first completion of a map…” stays a paragraph start. Cost if wrong: none (a test line quotes a sentence start, which stays one).
- The span of the line of D-216 is written as a placeholder `{r}` explained in a sentence of the same paragraph, rather than as the sample „co 4 godziny” in the quoted line: the quoted line then holds only the data's numbers by placeholder, as question 6 says "3 and 4 come from the game data". Cost if wrong: a later test quotes the line with a placeholder, like the existing `{n}`.
- The `Why` of the withdrawn D-251 names D-189 in words: a reference from the list is allowed to a decision of the log.
