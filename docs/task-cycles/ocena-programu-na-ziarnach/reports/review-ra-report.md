PASS afac5cd0c2cd4f73ffef5b7c57ae8f6c16fe9d0d

# Review `ra` — task `ocena-programu-na-ziarnach`, Foundation entries and slices 1, 2

- Range: `c36e2739883002af2b959b787eb0880b748fd7e5..afac5cd0c2cd4f73ffef5b7c57ae8f6c16fe9d0d` (three commits: `a65b8fa4` foundation entries, `b2114894` slice 1, `afac5cd0` slice 2). `git rev-parse HEAD` in the cycle's worktree: `afac5cd0c2cd4f73ffef5b7c57ae8f6c16fe9d0d`, as given.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), the-way pinned at `19e5774aed6d1d628042e23deccc110ed9f112c0` (checked in the review worktree: `git -C .the-way rev-parse HEAD` equals the gitlink).
- Changed files: `foundations/decisions.md`, `foundations/glossary.md`, `foundations/part_map.md`, `tests/invariants/source_lexer.py` (new), `tests/invariants/balance_source_scan.py`, `tests/invariants/test_content_identifiers.py`, `tests/invariants/test_simulation_isolation.py`, `tests/invariants/test_simulation_randomness.py`, `tests/invariants/test_local_start_access.py` — the slices' *Change* and the two foundation files of the plan's *Foundation entries*.

## Findings

### Critical

none

### Important

none

### Minor

1. **`foundations/decisions.md`, D-22, the added paragraph (diff line „A judging of a program (D-439) runs on the twelve fixed seeds of its map, the same at each judging, and takes no new seed, each of its twelve runs drawing from its own seed as a map run does.”).** "the twelve fixed seeds of its map" reads naturally as seeds that differ from map to map (seeds a map holds), while *To do* 1 of the task says „Ziarnami oceny są liczby od 1 do 12, te same na każdej mapie, dla każdego programu i każdej postaci, zapisane w danych gry obok pułapu.” The sentence follows row 10 („na dwunastu stałych ziarnach mapy”) and the projected entry of D-439 („twelve fixed seeds of a map”), so it is no departure from a settlement; but the executor of slice 3 who reads D-22 alone may put twelve seeds into each map's data. Cheap fix at the return step: "on twelve fixed seeds, the same on every map and at each judging". Not blocking: slice 3 reads *To do* 1 too.
2. **`foundations/decisions.md`, D-243 *Verification*, its `tests:` clause** („starting the earning loop at once on the click with the program the character's list „Program:” shows”) now stands beside the new second paragraph, which starts the earning loop at once only where all twelve seeds are solved or the result standing under the character repeats. Read alone the clause says the opposite of the binding paragraph for a program that loses on some seed. The writer named it (foundation report, concern 2) and the plan has slices 11 and 12 change those tests and the return step rewrite the clause; recorded here so the return step does not miss it. Graded Minor by WAY-364: the content of the clause still describes the tests that stand today.
3. **`tests/invariants/source_lexer.py:208`, docstring of `string_values`**: „as the old cut of the balance instrument read it” names code that no longer exists after this commit; a later reader has no "old cut" to look at. Say what the reading is for (a template piece with the marks of a substitution taken off its ends) instead of where it came from.
4. **Slice 2 report, "Where a test sees more or differently", first bullet**: the justification „the sentences of all four invariants exclude regular expressions from the scan” is not what the invariants say — the sentences of `simulation-isolation`, `simulation-randomness`, `content-identifiers`, `balance-instrument-file-writes` and `balance-instrument-repeatability` (`foundations/invariants.md`) say nothing of regular expressions; it is the *Covers* of the test files (for example `tests/invariants/test_simulation_randomness.py:9-11`, "with its comments and the text of its string and template literals and regular expressions removed") that leave regex text out. The conclusion holds — text inside a regular expression literal is no import, no global, no draw and no write, and the old copies already blanked every regex they recognised — but the request should give the right reason. No change of code needed.
5. **`tests/invariants/source_lexer.py`, readings of text that is not valid TypeScript or JavaScript.** My differential probe (below) found, besides the regex after `${` the executor names, two more places where an old copy gave a reading the new code does not, both only on text no parser accepts: (a) a template left unclosed at the end of the file whose last characters are an escaped `` \` `` or `\${` (`_template_text`, lines 194-201, strips the mark even though it is escaped; `split_source` kept it) — `simulation-randomness` loses the reading `\${`-ended string; (b) a string left unclosed at the end of the file, where the old balance `string_values` gave the body less its last character and the new one gives the whole body (the old truncated reading, for example `'f` from `'fs`, is gone). Neither can stand in a file the build accepts, so no scanned form is lost; named for completeness, no change asked.

### Out of scope

none

## Blocking findings and their marks

none (no Critical or Important finding).

## What I checked, and how

### Foundation entries (`a65b8fa4`)

Each entry compared with its row of *Settlements to record* and, for D-439, the projected entry word for word, and every added sentence of *Rationale* and *Rejected* traced to the answer or the not-chosen variants of its source question in *Questions to settle* of `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md` (lines 54-139):

- D-439: paragraph 1 is the projected entry word for word; paragraph 2 holds rows 1, 2, 3 without addition (a map not yet solved, a character in an earning loop or a manual map run, nothing of either changed; the take list cut by chest, carrying capacity and entry cap, the same twelve, nothing leaves the chest; nothing discovered, nothing written to the Understanding or the program). *Rejected* holds the projected entry's ways plus Questions 3 b, 4 a/c/d and 9 b in their reasons; *Rationale* the costs of Questions 3, 4, 9. *Relations* (D-18, D-179, D-409) fit *To do* 1, 2 and 4. *Verification* pairs agree with *To do* 1-2 (cap boundary counted as solved or a death; four berries of „jagoda 10”).
- D-440 (row 4): all clauses of the row present; the texts „szczelny: 12 z 12” in `positive`, „{n} z 12” in `text`, „oceniono z zapasem, którego dziś nie ma w skrzynce” word for word; "„12 z 12” standing in its place" from *To do* 6; erasure by change of rules, groups or trip plan and by the death that takes practice and ranks. *Rejected* holds Questions 2 b/c/d, the follow-up a, the "x czasu" idea and 15 a/c with their reasons. Nothing beyond the row and *To do* 6.
- D-243 (row 5): the second paragraph carries every clause of the row, the warning text word for word in `warning`; the quoted first sentence changed because "acts at once on the click" became untrue — as the plan's *Foundation entries* paragraph allows, the seven test quotations following in slices 10-12. *Rejected* holds Questions 1 a/c and 14 a/c; *Rationale* the costs of Questions 1 and 14, including the weak point "a player who … forgot its result".
- D-329 (row 6): the button, its two texts, the result's heading and closing sentence word for word, how long the result stands, the remembered judging beside „Program:”; the earlier quoted passages kept (foundation check reports no D-329 quotation).
- D-325 (row 7), D-241 (row 8, with *To do* 7's death that does not stop the loop), D-246 (row 9, text and declension word for word; "stands nowhere where it is zero" and "whose earning loop goes on" from *To do* 7), D-22 (row 10; see Minor 1), D-190 *Rationale* (row 11, wording task 24 left: checked against D-189 as it stands, `foundations/decisions.md:8560`), glossary `judging` and `loop record` (rows 12, 13): each agrees with its row.
- No invented setting: every binding sentence comes from a projected entry, a row or *To do*; the writer's extra clauses (listed in its report) each trace to *To do* 5, 6 or 7 or Question 1's answer.
- Length limits and template: `foundation_check.py --skip-test-citations` gives exactly the 7 expected errors, all quotations of D-243's old first sentence (see Checks).

### Slice 1 (`b2114894`), `tests/invariants/test_local_start_access.py`

- Mechanism against `scripts/local-start.mjs:392-421`: `start()` picks the server port with `freePort()` (listen on 0, close), so the port is free for the system until the built server — here the stand-in imported in the same process — listens. Node's `listen(port, host)` with a host binds on a later turn of the event loop (after the host lookup), so the old `BUSY_SERVER`, whose `Atomics.wait` ran at the top level of the module, held the process for 4 s with the port unbound. A second start (or any process of the gate) asking the system for a free port in that window can get it; the stand-in has no `error` handler, so the loser dies with `Error: listen EADDRINUSE: address already in use 127.0.0.1:<port>`, the message of the CI failure. My own probe confirms the unbound window and its closing (`reports/review-ra-bind_probe.mjs`, result below). The cause holds by mechanism and message; like the executor I did not reproduce the CI failure itself.
- The fix: the hold moves into the listen callback after the `Loop:` line, and the case waits for that line before the second start, with a precondition `assertRegex` marked as such (`guidelines/testing.md`, "Behaviour, not implementation": a precondition stands before the act and is marked). The window during which the first start's server port is free shrinks to the moments between its `freePort()` and its bind, a window every start has and D-49's *Rationale* accepts („A short window remains between the system naming the port free and the server listening on it”), so I do not count it against "no collision can happen".
- What the case checks is unchanged: the directory precondition, the second start running, the first's directory kept, two directories. The second start still meets the first while its process is held (the hold begins a few tens of milliseconds later relative to the second start's launch than before, out of 4 s). No other case changed; `scripts/local-start.mjs` unchanged; `tests/flaky-tests.md` holds no entry of the case.

### Slice 2 (`afac5cd0`), one cut of source text

- None of the four files keeps a cut or the two constants (`git diff`; `grep` for `segments|split_source|REGEX_AFTER` in `tests/invariants/`). `balance_source_scan.py` keeps `code_only` and `string_values` as names taken from `source_lexer`, so the two balance tests are unchanged.
- No control case and no expected value of the five tests changed: the diff of the four files removes the cut and adds imports only; `findings` of `test_simulation_randomness.py` changes only its source of `code` and `strings`.
- Whether any test sees less: compared old copies (from `c36e2739`) and new views on all 326 tracked TS/JS files of the review worktree (no difference in what is seen) and on 200 000 random token soups built from quotes, backticks, `${`, braces, slashes, comment marks, backslashes, line ends and forbidden names. Every case in which an old view saw a forbidden name in code that the new does not involves `${/` — the regex after an opening substitution, which the new code reads as a regex as JavaScript does; all of them also hold an unclosed regex, that is text no parser accepts. The string readings an old copy gave and the new does not are listed in Minor 5, all on unclosed text at the end of the file. `content-identifiers` and the `without_comments` of `simulation-isolation`: no loss found.
- Where tests see more (the executor's list for the request): agreed — escaped forbidden strings for the balance tests, edge-marked template text for `simulation-randomness`, substitutions no longer glued together in `split_source`'s code view (`` `${x}${Math.random()}` `` was read `xMath.random()` and missed; now flagged).
- Part map: `test-helpers` sentence now names the cutting of source text; *Files* lists `tests/invariants/source_lexer.py`; `foundation_check.py` reports no file claimed by no part or by two.
- `cross-part-imports`: the four importing files stand under `tests/` and the imported file belongs to `test-helpers`, the exception the invariant gives; its test passes.

### Trust boundary and irreversible operation

- `src/browser/sim/saved-game.ts` (trust boundary, the saved game taken in from the server): the range does not touch it, nor any file that reads a saved game. Nothing to check at that boundary in this range. `scripts/local-start.mjs` (trust boundary `local-start-access`) is unchanged; the changed case is a case of D-256, not of the boundary's refusal cases.
- Irreversible operation: none. The range writes foundation text, a test helper and tests; it runs, migrates or deletes nothing.

### Guidelines

`guidelines/coding.md` and `guidelines/testing.md` read whole. The new file and the changed files pass Ruff format and Ruff check with `ruff.toml` (rules "Linter", "Formatter"); the new Python file is outside the ESLint size rule (D-425). Testing rules "Changing an existing test", "Behaviour, not implementation" (precondition marked), "integration test — Time and randomness" (wait on a condition with a deadline, ports per D-49) hold for slice 1.

## Declined to judge

- The residual window between a start's `freePort()` and its server's bind, present in every start of `scripts/local-start.mjs`: a property of the start (D-431, D-49 *Rationale*), outside the slice, which may not change the script.
- D-165's list of records naming a program lacking the judging; „Puść mimo to” between the two clicks; the invariants the writer did not read: recorded and answered by the orchestrator, carried to slice 11 and the return step.
- Whether D-439 and D-440 need `tests:` clauses: by the template they come when the `decision:` lines of later slices stand (return step).
- The escape and edge-mark readings of `source_lexer.py` having no control case of their own: as before the change; no stated requirement asks for one.

## Checks

All in the detached worktree `.runs/review-ra/wt` at `afac5cd0`, after `git submodule update --init -- .the-way` and `npm ci` (exit 0).

| Check | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | exit 1, 7 errors, all "the quotation stands in no binding sentence of `D-243`": `tests/sim/loop.test.mjs:237`, `:304`; `tests/view/account-screen.test.mjs:2683`, `:2807`, `:2975`; `tests/view/maps-screen.test.mjs:494`, `:700` — the expected seven |
| `python -B .the-way/elements/common/foundation_check.py` | exit 1, the same 7 errors and nothing else (no part-map error for `source_lexer.py`) |
| `npm test -- tests/invariants/test_simulation_isolation.py` | exit 0 |
| `npm test -- tests/invariants/test_simulation_randomness.py` | exit 0 |
| `npm test -- tests/invariants/test_content_identifiers.py` | exit 0 |
| `npm test -- tests/invariants/test_balance_instrument_file_writes.py` | exit 0 |
| `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | exit 0 |
| `npm test -- tests/invariants/test_cross_part_imports.py` | exit 0 |
| `npm test -- tests/invariants/test_local_start_access.py` | exit 0, `Ran 22 tests in 198.672s`, `OK` (one run, not a diagnosis of the random failure) |
| `ruff format --config ruff.toml --check` and `ruff check --config ruff.toml` on the six changed Python files (ruff from `.runs/quality-venv`, used as a tool only) | exit 0, exit 0 |
| Probe `python -B probe/fuzz.py 200000` (old copies from `c36e2739` against `source_lexer.py`) | exit 0; 0 differences on 326 tracked TS/JS files; differences on soups only as described under Slice 2 and Minor 5 |
| Probe `node probe/bind_probe.mjs` (old and new stand-in shape, a second bind during the hold) | exit 0; old shape: `bound-ok` (port free during the hold); new shape: `EADDRINUSE` (port held) |

Not run: the full `npm test` (the cycle's own run, by the handoff); `check_instructions.py` (no instruction file changed in the range); StrykerJS (no file of `simulation` changed).

## Reaches beyond the dispatch

- `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:54-139` (*Questions to settle*) — to trace the *Rationale* and *Rejected* sentences the entries add to the questions the rows name as sources.
- `foundations/decisions.md`: D-189 (`:8560`, wording task 24 left, for D-190 and D-439's *Rejected*), D-49, D-431, D-432 (`:1148-1181`, `:1697-1712`, for slice 1), the withdrawn-identifiers row of D-251, the *Verification* of D-243 as it stands.
- `foundations/invariants.md`: the sentences of `simulation-isolation`, `simulation-randomness`, `content-identifiers`, `balance-instrument-file-writes`, `balance-instrument-repeatability`, `cross-part-imports` — to judge the executor's claim on regular expressions (Minor 4).
- `scripts/local-start.mjs:215-496` — the start's picking and binding of ports, for slice 1's mechanism.
- `a note in the author's private notes`, `git.md` — the user's rules, served by a hook before my probes and the worktree command.

## Working copies

- `.runs/review-ra/` held the detached worktree `wt` (at `afac5cd0`), the old copies of the four files (`old/`), the probes (`probe/fuzz.py`, `probe/bind_probe.mjs` and its two stand-ins) with their output, and the check logs. The worktree was removed with `git worktree remove --force` (exit 0) and `git worktree prune`, then the directory removed by its full path (exit 0); no remainder. Kept beside this report: `reports/review-ra-fuzz.py`, `reports/review-ra-fuzz-out.txt` and `reports/review-ra-bind_probe.mjs` (the probes read the removed paths `.runs/review-ra/wt` and `.runs/review-ra/old/`; to rerun, recreate them as described above). The cycle's worktree is clean (`git status --short` empty).

## Unread material

- `foundations/decisions.md`: the decisions of *Decisions in play* not changed by the range (D-326, D-239, D-251 as withdrawn, D-249, D-170, D-409, D-165, D-328, D-206, D-07, D-18, D-437) were read only in the passages the frozen task quotes, not whole; the changed entries D-22, D-190, D-241, D-243, D-246, D-325, D-329, D-439, D-440 were read in the diff and its context, not each whole from the file.
- Slice 2's *Read*: `foundations/part_map.md` read in the `test-helpers` entry (diff and context), not lines 33-64 and 127-137; `foundations/decisions.md:704-753` D-351 not read; `.the-way/elements/part-map/skill/SKILL.md` not read; `tests/invariants/loop2_invariant_support.py` not read. `tests/invariants/test_balance_instrument_file_writes.py` and `test_balance_instrument_repeatability.py` read in their `findings` and flagged sources only.
- Slice 1's *Read*: D-256 (`:1280-1306`) and `foundations/invariants.md:1188-1197` local-start-access not opened; `foundations/part_map.md:90-125` build-tools not read; `tests/flaky-tests.md` not opened (the executor's statement that it holds no entry of the case not verified).
- The executor's differential script `reports/slice-02-diff_check.py` not read or run; I wrote my own probe instead.

## Searches not found or unclear

- none
