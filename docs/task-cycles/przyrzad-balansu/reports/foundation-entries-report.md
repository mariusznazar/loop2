# Report — the foundation entries (foundation step), task `przyrzad-balansu`

**Status:** done with concerns (the concerns are three findings below that the plan did not list; none stops a slice).

**Commit:** `333b945b8c353c0e0268a5890d652be8316bab42` on `task/przyrzad-balansu` (one commit; base `6a7b0acb`). Files: `foundations/decisions.md`, `foundations/glossary.md`, `foundations/invariants.md`. Author: the configured git user.

## Entries

| Entry | Mark | English | Polski |
|---|---|---|---|
| D-427 (new, section *Balance measurement*) | row 1 | The reference programs stand in one file of the tests of the simulation, `tests/sim/reference-programs.mjs`, which the tests of the simulation and the balance instrument both read; no copy stands elsewhere. | Programy wzorcowe stoją w jednym pliku testów symulacji, `tests/sim/reference-programs.mjs`, z którego czytają i testy symulacji, i przyrząd balansu; nigdzie nie ma ich kopii. |
| D-428 (new) | row 2 | For each map of an overlay and each reference program the map check prints the share solved on seeds 1–500, the median game minutes of solved map runs, the failures by cause and the balance of the earning loop, and no content of any program. | Tryb sprawdzania mapy wypisuje dla każdej mapy nakładki i każdego programu wzorcowego odsetek rozwiązań na ziarnach 1–500, medianę minut gry rozwiązanych przejść, porażki według przyczyny i bilans pętli zarobkowej, bez treści programów. |
| D-429 (new) | row 3 | The results of the instrument's measurements do not enter the repository; the instrument prints them or writes them to a file a flag names. | Wyniki pomiarów przyrządu nie trafiają do repozytorium; przyrząd wypisuje je albo zapisuje do pliku wskazanego flagą. |
| glossary term `overlay` | row 4 | An overlay is a file that changes the game's data in memory for the time of one measurement, leaving the data files untouched. | Nakładka to plik, który na czas jednego pomiaru zmienia dane gry w pamięci i zostawia pliki danych nietknięte. |
| invariant `instrument-game-agreement` | row 5 | The same seed, state, program and equipment from the chest give the same end minute, outcome, cause and practice through the game's functions and through the instrument. | To samo ziarno, stan, program i zapas ze skrzynki dają tę samą minutę końca, wynik, przyczynę i wprawę drogą funkcji gry i drogą przyrządu. |
| D-378 (changed) | row 6 | On Las a program of the closed lists solves the map, paying nature energy for its lightings, on a seed a test names, and the empty program dies there. | Na Lesie program z zamkniętych list rozwiązuje mapę, płacąc energią natury za rozpalanie, na ziarnie, które nazywa test, a pusty program tam ginie. |
| D-29, D-32 (changed) | the cycle's | Their sentences and *Scope* gain `balance-tools`; rule sets and formatter options unchanged; the human-acceptance clause of D-29 untouched. | Ich zdania i *Scope* obejmują część `balance-tools`; zestawy reguł i opcje formatera bez zmian; klauzula o akceptacji człowieka w D-29 nietknięta. |
| D-425 (changed) | the cycle's | Its *Scope* gains `balance-tools`; the sentences are unchanged. | Jego *Scope* obejmuje `balance-tools`; zdania bez zmian. |
| invariants `eslint-source-rules`, `prettier-source-format` (changed) | the cycle's | Sentence and *Part* gain `balance-tools`; the checks named stay. | Zdanie i *Part* obejmują `balance-tools`; wskazane testy bez zmian. |
| invariant `function-and-file-size` (changed) | the cycle's | *Part* gains `balance-tools`; its sentence names no parts, so it is unchanged. | *Part* obejmuje `balance-tools`; zdanie nie wymienia części, więc bez zmian. |

The request puts the two the cycle's groups (D-29, D-32, D-425 and the three invariants) before the human: no row of the task carries them.

## Choices (with the way rejected and cost if wrong)

- **A new section of the decision log, *Balance measurement*,** for D-427 to D-429. Rejected: *Testing discipline* for D-427 and *The gate, test tools and the local start* for D-428 and D-429 (each fits a part of the topic, none the instrument as a whole); *Maps* (it is about numbers and solving, not about a tool). Cost if wrong: moving three entries to another section. The request names the section, as the decisions template asks.
- **D-427 *Verification* is a pair of examples, no `tests:` clause and no invariant.** No test of the plan holds "no copy stands elsewhere" by a `decision:` line, and the SKILL asks for a pair until a test stands. D-428 and D-429 likewise. Cost: if slice 1, 2 or 9 cite D-427/D-428 by a `decision:` line, the return step turns the pair into a `tests:` clause.
- **D-427 *Relations* `derives from D-351`** (the place is a file of `simulation` because of the part-import rule). Rejected: `none`. D-428 and D-429 have `none` (the ties to D-388, D-18, D-82 stand in the *Rationale* as references, not as a higher decision they serve).
- **The invariant derives from D-22 alone.** The row's own source is a private conversation, which cannot be cited as an address; D-22 carries the repeatability of a map run on a seed. Rejected: also D-427 (it settles where programs stand, not what the instrument must agree with). *Part*: `simulation · balance-tools`, since a change to either can make it false.
- **D-378: dropped "as well as sticks" and "keeps the mage alive for 480 game minutes", took the sentence word for word from the handoff.** The question in the heading changed to "Can a program of the closed lists solve Las?". *Rejected* changed from `unknown` to the two ways Question 2 of the task keeps (b, c), since the entry now follows the settled question. *Verification* names a program "built of the kinds of the closed lists", no feeding and no claim of every kind.
- **D-378 *Rationale* names the balance instrument** as what weighs the share of seeds (the old text left that to a later change). Cost if wrong: one clause.
- **D-428 *Rejected* holds Question 5's ways b and c,** though c (no skill describing the instrument) concerns a skill that no decision records; the rule says the row's source's ways are taken, so both are kept and c is worded as the source gives it.
- **D-429 *Rejected* holds only Question 4's way c** (take everything, one-time scripts included). Question 4 keeps no way that is about results alone; this is the one that comes with the "results" of the analyses. It fits thinly. Cost: a reader may find the rejected way not about results; the alternative, `unknown`, would say nobody weighed anything.
- **D-427 names `tests/sim/reference-programs.mjs` in its binding sentence** (the plan's *Choices* 2 names it), and not in *Rationale* or *Rejected*.

## Search of the foundation (WAY-33)

Read whole: D-378, D-388, D-398, D-404, D-18, D-22, D-29, D-32, D-82, D-83, D-266, D-351, D-362, D-425, D-73, D-28, D-81, D-84 (read), D-397; invariants `map-run-repeatability`, `simulation-randomness`, `cross-part-imports`, `tracked-file-private-paths`, `tracked-file-private-names`, `eslint-source-rules`, `prettier-source-format`, `function-and-file-size`, `first-map-balance`, `new-account-first-pass`, `program-closed-lists`; `foundations/part_map.md` and `foundations/glossary.md` whole.

- No existing decision states the place of reference programs, the table of a map check or where measurement results go; D-388 and D-18 name the numbers and the data only, D-82/D-83 the expectations and selection of tests; D-266 and D-351/`cross-part-imports` apply to the new part with no change (the instrument imports `dist/browser/sim/`, which D-351 matches to its source). No row is tied to an existing entry in place of a new one.
- The word `overlay` stands in no tracked English file (`git grep -i -w` over the repository, without `.the-way`, and `grep` over `.the-way` markdown); the glossary holds no entry for it. Other words checked: `loop` (glossary: the predecessor game, unaffected), `map` (the foundation says "game map" and "map run"; the definition uses "game map"). *Not* of `overlay` is `none`.
- Cleared by D-378's change: no other entry quotes or relies on "keeps the mage alive" (only the test file `tests/sim/acceptance.test.mjs`).

## Own-work check

Requirement most likely not met: the entries must not leave a report beyond those the plan names. Check: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` from the worktree root; it ends "15 errors" (10 + 5) and 2 further lines marked `listed:`, which are notes, not errors. Every line it names:

| Report | Lines | Cleared by |
|---|---|---|
| `balance-tools` names no part: D-29, D-32, D-425, D-427, D-428, D-429 (*Scope*) and `eslint-source-rules`, `prettier-source-format`, `function-and-file-size`, `instrument-game-agreement` (*Part*) | 10 errors | Slice 2 (part map) |
| the quotation at `tests/sim/acceptance.test.mjs` lines 109, 120, 151 and 180 stands in no binding sentence of D-378 | 4 errors | Slice 1 |
| **not in the plan's list:** `tests/quality/test_quality_invariants.py:78` quotes D-32's sentence ("...build-tools and deployment and browser HTML and CSS pass `--check`..."), which now names `balance-tools` | 1 error | Slice 3, which already changes that file |
| `eslint-source-rules` and `prettier-source-format` reworded while no file citing them changed (`tests/quality/test_quality_invariants.py`, `tests/quality/test_source_tool_scope.py`) | 2 `listed:` notes | Slice 3 |

Nothing else is reported. The pairs of examples of the three new decisions and the changed D-378 raised no report. The baseline before my change was "0 errors". Also run: `decision_index.py --section "Balance measurement" --part balance-tools` read the new section and found D-427 to D-429.

## Concerns (not listed by the plan)

1. **The D-32 quotation in `tests/quality/test_quality_invariants.py:78`** stands in no binding sentence of D-32 after the part is added. Slice 3 changes that file and must update the quotation; its *Checks* run the foundation check with "no report at all", so it will find it, but its *Goal* does not name it.
2. **D-425's binding sentence enumerates what its function limit covers** ("the application, the scripts, the tests, the JavaScript of the three agent-workflow directories … and the two root configuration files"). The handoff and the plan change its *Scope* only; the instrument's files in `balance/` are read as covered because they are files ESLint checks under D-29 (the sentence says "every file that ESLint checks under D-29"). If review reads the list as closed, the sentence needs "the instrument of `balance-tools`" added; I left it, as the handoff limits row 7 to the *Scope*.
3. **Other decisions that bind every code part list the parts one by one in *Scope*** (about 20 of them hold `test-helpers`, among them D-28, D-73, D-81 to D-85, D-351, D-362), so `decision_index.py --part balance-tools` will not select them for a change of the new part. The plan and the handoff do not change them; a later step (slice 4 for the guidelines, the return step, or the human) decides whether their *Scope* gains the part.

## Unread material

none of what the handoff names. D-84, D-81 and D-28 were read whole beyond the handoff list (reaches below); the decisions named only in the plan's slice *Read* lists (D-63, D-177, D-387, D-60, D-61, D-136, D-23, D-239, D-240, D-249, D-397 beyond what is quoted here, D-405, D-417) were not read, since no row of this step depends on them (D-397 was read whole).

## Searches not found or unclear

- A source for the invariant of row 5 that is not a private conversation: none found; I derived it from D-22 (see Choices).
- Whether a glossary entry is wanted for `balance instrument` and `reference program`: the handoff asks for none; both words are used in ordinary meaning and D-427 defines the instrument in its sentence, so I wrote none.
- No guideline is mine to change; found missing: `guidelines/testing.md` and `guidelines/coding.md` do not yet name `balance-tools` (slice 4).

## Reaches beyond the handoff

- D-28 (whole, `foundations/decisions.md:431-445`), D-81 and D-84 (the test levels and mechanisms) and D-397: to judge whether other entries bind the new part's tests (finding 3).
- The two files `.the-way/elements/common/decision_index.py` and `foundation_check.py` were run only.
- `.the-way/elements/decisions/examples.md`, `invariants/examples.md` and `glossary/examples.md`: read the lists; the examples they name (WAY-03 and others) are entries of the-way's own log, which I did not open.

## Working copies

One file, `.runs/foundation-entries/index.txt` (the decision index), stood under the ignored `.runs/` of the worktree; I removed it and its directory before returning. No other copy was made.
