# F6 independent invariant-method author report

Status: DONE_WITH_CONCERNS. The three assigned files are committed and ready for root's independent review. This report ends the F6 author stage; no review, next stage, push, merge or deployment was performed. Ruff remains a genuine non-pass pending S2 installation.

## Inputs and independence

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`; branch: `task/coding-guidelines`.
- Start: `17d23b997bc3febb827dc330410dad3458ba9e34`; final commit: `34e7d2a`; range: `17d23b997bc3febb827dc330410dad3458ba9e34..34e7d2a`.
- Pinned `.the-way` HEAD and gitlink both verified as `d829e3aa6242a9b8901274531dd82fd5c7d87628` before work. Initial tracked/untracked status was clean.
- First read: `f6-handoff.md`, then `author-contract.md`. Read product AGENTS.md/CLAUDE.md, the pinned `product-guidelines/reading.md` and `elements/common/way_of_working.md`, Superpowers 6.4.1 `test-driven-development/SKILL.md`, its `writing-good-tests.md` reference and `subagent-driven-development/implementer-prompt.md`.
- Read whole assigned invariant methods and the whole `tests/invariants/loop2_invariant_support.py`; the support file was never edited. Read whole current `loop2-one-serving-process/2`, `loop2-api-error-route/1` and `ruff-source-rules/1` entries and the linked current D-05/3, D-02/1, D-08/1, D-30/1 and `ruff-default-rules/1`.
- Refreshed foundation with complete part map, complete current Scope-field inspection and applicable complete decisions: D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-07/1, D-08/1, D-09/1, D-10/1, D-11/1, D-12/1, D-13/1, D-14/1, D-15/1, D-16/1, D-17/1, D-27/1, D-28/1, D-29/1, D-30/1, D-31/1, D-32/1, D-33/1 and D-37/1. Read product glossary and pinned process glossary. Other facts/verification methods cited by those context decisions were not rerun; they do not govern this narrow subprocess-status repair.
- Did not read the plan, frozen task, covered-code authors' reasoning, prohibited branches or another the-way copy. No subagents were dispatched.

## Guideline selection and scope refresh

The announced work affects account-server (both existing invariant files), build-tools (new quality tests and the observation interface) and deployment (the shared one-process container promise). The actual diff changes account-server and build-tools files only; deployment remains relevant context without a deployment-file change. The complete map assigns each changed path unambiguously.

`guidelines/` does not exist: `rg --files guidelines tests/quality` reported the absent path while finding existing quality files; native `Get-ChildItem -LiteralPath . -Directory -Filter guidelines` also found none and `Test-Path guidelines` returned False. Selected guideline files: none, because no files exist. This is the already-declared discipline gap the overall task creates, permitted by the reading procedure for a task writing its own missing guidelines. D-28 supplies the adopted deferrals, including no automatic Python formatting and no separate mandatory test exemplar. No new reading discrepancy or selection expansion was discovered from the actual three-file diff. No screen is changed; browser screenshots are unchecked because there is no UI change or browser route assigned to F6.

## Change and choices

| File | Added | Removed | Result |
|---|---:|---:|---|
| `tests/invariants/test_loop2_one_serving_process.py` | 7 | 0 | Reject nonzero Get-CimInstance, ps and lsof exits before parsing stdout |
| `tests/invariants/test_loop2_api_error_route.py` | 0 | 1 | Remove unused `os` import only |
| `tests/quality/test_process_observation.py` | 68 | 0 | Eight tests: failed and successful observations for both readers on both OS branches |
| Total | 75 | 1 | Three assigned source files only |

1. Explicit return-code guards retain the existing Windows-listener failure convention (`AssertionError` plus decoded stderr). Leaving the readers unchanged would accept stale or partial stdout from failed commands; changing to `check=True` would introduce a different exception convention. Three local guards cost seven lines and preserve successful parsing, command arguments, timeouts and observation timing.
2. Keep the already-correct Windows-listener guard and cover it with a regression test. Rewriting it would add churn without changing the failure boundary. All four successful fixtures retain literal independently hand-derived process/listener values.
3. Mock only external `subprocess.run` and branch selection, using complete `CompletedProcess` results. Actual parser/rejection code remains real. The unit fixtures cannot prove Unix tools run correctly on Unix; a separate manual check additionally supplied results of real exit-7 child processes to both OS branches. Test-double command mismatches raise ValueError, so they cannot satisfy expected AssertionError rejections.
4. Remove only the unused API-method import required by the adopted F401 rule. No HTTP probes, HTML/JSON checks, methods, paths, headers, invariant sentences, parser formats, process-tree semantics, assertions about the running product or support cleanup changed.

## TDD and verification

The production break named before writing tests was acceptance of plausible stdout from a failed process/listener command. Both RED runs exercised eight tests: three failed with `AssertionError not raised` (Windows process list, Unix process list, Unix listener list); the existing Windows-listener rejection and four successful-field controls passed. After the seven-line change, eight tests passed. RED was repeated once after changing the test-double's unrelated command-mismatch error from AssertionError to ValueError, before any method edit; this prevents a wrong command from producing a false positive.

Each capture below has complete combined stdout/stderr in the named `.txt` and exact command, exit and duration in its adjacent `.txt.json`. Paths are relative to the worktree above. Complete outputs follow later in this report.

| Check | Exact command executed by capture.py | Actual exit | Result / complete output path |
|---|---|---:|---|
| Initial RED | `python -m unittest discover -s tests/quality -p test_process_observation.py` | 1 | 8 tests, 3 intended failures; `.runs/task-cycles/coding-guidelines/reports/f6-red.txt` |
| Final RED | `python -m unittest discover -s tests/quality -p test_process_observation.py` | 1 | 8 tests, same 3 intended failures; `.runs/task-cycles/coding-guidelines/reports/f6-red-final.txt` |
| GREEN | `python -m unittest discover -s tests/quality -p test_process_observation.py` | 0 | 8/8; `.runs/task-cycles/coding-guidelines/reports/f6-green.txt` |
| Existing one-process method | `python -m unittest discover -s tests/invariants -p test_loop2_one_serving_process.py` | 0 | 5/5, live temporary built application and Windows observation; `.runs/task-cycles/coding-guidelines/reports/f6-one-serving-process.txt` |
| Existing API method | `python -m unittest discover -s tests/invariants -p test_loop2_api_error_route.py` | 0 | 2/2, live temporary built application; `.runs/task-cycles/coding-guidelines/reports/f6-api-error-route.txt` |
| Product test command | `C:/Program Files/nodejs/npm.CMD test` | 0 | 173/173; `.runs/task-cycles/coding-guidelines/reports/f6-product-suite.txt` |
| Quality suite | `python -m unittest discover -s tests/quality` | 0 | 101/101; `.runs/task-cycles/coding-guidelines/reports/f6-quality-suite.txt` |
| Adopted Ruff method | `python -B scripts/check_ruff.py --record .runs/task-cycles/coding-guidelines/reports/f6-ruff.jsonl` | 2 | Non-pass: local pinned Ruff unavailable; `.runs/task-cycles/coding-guidelines/reports/f6-ruff-method.txt` |
| Weakest-point manual check | `python -B .runs/task-cycles/coding-guidelines/reports/f6-real-failure.py` | 0 | 8/8 real exit-7 observations rejected; `.runs/task-cycles/coding-guidelines/reports/f6-weakest-point.txt` |
| Diff whitespace check | `git diff --check` | 0 | No output; run before final staging, no later source edit |

Capture invocation format was `python .runs/task-cycles/coding-guidelines/reports/capture.py <listed output> <listed command>`. The Ruff JSON result names no invariant verdict because the tool could not be run. This is not Ruff compliance, even though F401's unused import was removed. Root confirms installation belongs to S2.

Verification scope expansion: the focused F6 handoff assigned only three unittest commands. I also ran the product command once under Superpowers' explicit full-project-test-before-done requirement, and expanded to the complete quality suite once. The quality expansion was unnecessary relative to the focused handoff; root instructed me to collect already-running output and start no more checks. All listed checks had already started or completed before that instruction; none was started afterward. The broad runs were not repeated. Test-created untracked bytecode artifacts were removed by explicit file paths after the processes finished; no source outside the write set was changed or committed.

## Weakest point, self-review and risk

Weakest requirement: both OS branches must reject a failed observation independently of plausible stdout. The unit tests use simulated CompletedProcess results, so the ignored `f6-real-failure.py` check additionally runs real Python child processes exiting 7, emitting either plausible platform-specific stdout or no stdout. All eight cases raise AssertionError. This proves failure-status handling with real subprocess results and a second nonzero status; it does not prove actual ps/lsof availability or Unix process-table permissions. Windows live method passed; live Unix execution and container method are explicitly unchecked in F6.

Self-review read the complete final new file and both existing-file diffs. Each failure branch precedes parsing, names the failed observer and retains replacement decoding. Removing a new guard would recreate the corresponding observed RED failure. Successful fixtures prevent solving the problem by rejecting every read; mismatched subprocess selection cannot satisfy failure tests. No sentence meaning or method interpretation needed a root ruling. No broad exception handling, fallback success, linter suppression or new configuration was added. Independent review remains root's next dispatch and is not replaced by this self-review.

Sharpness from actual diff: account-server/build-tools test mechanics only, seven runtime-check lines, no application routing or deployment behavior change. The map's process-start/occupied-address failure modes are low; high deployment failure modes are not edited or certified. OS subprocess output is an observation boundary where a failed read must not certify a property. The code does not add a new product trust boundary, accept an external HTTP input, write persistent product data or create an irreversible effect. Existing shared support still owns building/starting/stopping the temporary application; its later independent cleanup change is outside this stage.

Unresolved for next dispatch: install/run pinned Ruff in S2; preserve live-Unix/container checks as unchecked until their appropriate verification stage. No other correctness concern found. The root-owned independent assessment of invariant-method changes still follows.

## Complete captured outputs

### f6-red.txt

```text
FF.F....
======================================================================
FAIL: test_failed_unix_listener_read_rejects_plausible_output (test_process_observation.ProcessObservation.test_failed_unix_listener_read_rejects_plausible_output)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2\.runs\worktrees\coding-guidelines\tests\quality\test_process_observation.py", line 39, in test_failed_unix_listener_read_rejects_plausible_output
    with self.assertRaises(AssertionError):
         ~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^
AssertionError: AssertionError not raised

======================================================================
FAIL: test_failed_unix_process_read_rejects_plausible_output (test_process_observation.ProcessObservation.test_failed_unix_process_read_rejects_plausible_output)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2\.runs\worktrees\coding-guidelines\tests\quality\test_process_observation.py", line 30, in test_failed_unix_process_read_rejects_plausible_output
    with self.assertRaises(AssertionError):
         ~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^
AssertionError: AssertionError not raised

======================================================================
FAIL: test_failed_windows_process_read_rejects_plausible_output (test_process_observation.ProcessObservation.test_failed_windows_process_read_rejects_plausible_output)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2\.runs\worktrees\coding-guidelines\tests\quality\test_process_observation.py", line 25, in test_failed_windows_process_read_rejects_plausible_output
    with self.assertRaises(AssertionError):
         ~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^
AssertionError: AssertionError not raised

----------------------------------------------------------------------
Ran 8 tests in 0.004s

FAILED (failures=3)

```

### f6-red-final.txt

```text
FF.F....
======================================================================
FAIL: test_failed_unix_listener_read_rejects_plausible_output (test_process_observation.ProcessObservation.test_failed_unix_listener_read_rejects_plausible_output)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2\.runs\worktrees\coding-guidelines\tests\quality\test_process_observation.py", line 39, in test_failed_unix_listener_read_rejects_plausible_output
    with self.assertRaises(AssertionError):
         ~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^
AssertionError: AssertionError not raised

======================================================================
FAIL: test_failed_unix_process_read_rejects_plausible_output (test_process_observation.ProcessObservation.test_failed_unix_process_read_rejects_plausible_output)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2\.runs\worktrees\coding-guidelines\tests\quality\test_process_observation.py", line 30, in test_failed_unix_process_read_rejects_plausible_output
    with self.assertRaises(AssertionError):
         ~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^
AssertionError: AssertionError not raised

======================================================================
FAIL: test_failed_windows_process_read_rejects_plausible_output (test_process_observation.ProcessObservation.test_failed_windows_process_read_rejects_plausible_output)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2\.runs\worktrees\coding-guidelines\tests\quality\test_process_observation.py", line 25, in test_failed_windows_process_read_rejects_plausible_output
    with self.assertRaises(AssertionError):
         ~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^
AssertionError: AssertionError not raised

----------------------------------------------------------------------
Ran 8 tests in 0.003s

FAILED (failures=3)

```

### f6-green.txt

```text
........
----------------------------------------------------------------------
Ran 8 tests in 0.001s

OK

```

### f6-one-serving-process.txt

```text
.....
----------------------------------------------------------------------
Ran 5 tests in 12.292s

OK

```

### f6-api-error-route.txt

```text
..
----------------------------------------------------------------------
Ran 2 tests in 8.140s

OK

```

### f6-product-suite.txt

```text

> loop2@0.0.0 test
> npm run build && node --test tests/http.test.mjs tests/startup.test.mjs "tests/sim/*.test.mjs" "tests/view/*.test.mjs"


> loop2@0.0.0 build
> node scripts/build.mjs

✔ serves the built HTML and JavaScript from another working directory (70.8658ms)
✔ API keeps its JSON error across paths, methods, queries and HTML negotiation (63.8506ms)
✔ ordinary missing routes and files do not become the home page or API (8.0402ms)
✔ raw and encoded traversal cannot expose files outside dist/public (20.2223ms)
✔ a map run starts at minute 0 on the entrance with the first activity chosen (2.6285ms)
✔ explore takes 20 minutes, reveals the tile and brings nothing (0.6999ms)
✔ explore is not feasible on a revealed tile, so the next choice is a wait (0.2454ms)
✔ the next activity is chosen in the finishing minute by the program current then (0.3514ms)
✔ a program change during an explore does not interrupt it (1.5423ms)
✔ Wędruj prefers an unrevealed neighbour (1.4781ms)
✔ Wędruj goes to some neighbour when all are revealed (0.6853ms)
✔ starting Wędruj draws once: candidates[floor(u × n)] in tile-list order (0.2388ms)
✔ Wędruj is not feasible with no neighbour on the map (0.1789ms)
✔ a step lasts the target tile stepMinutes and moves the character at its end (0.6683ms)
✔ Idź targets the nearest revealed tile with stock and gives the first step (1.6014ms)
✔ Idź is not feasible with no known tile in stock (0.7813ms)
✔ Idź is not feasible standing on the target (0.3535ms)
✔ walking by program reaches the stock step by step and stays there (1.4744ms)
✔ the run never ends by itself: steps keep coming for hours (0.8213ms)
✔ the same run and program give the same steps (3.2134ms)
✔ newMapRun and stepMinute do not change their inputs (4.588ms)
✔ the map Las has the size, entrance, step and resources of the task (1.9434ms)
✔ every resource of the map is defined in the resource data, with name and icon (0.3302ms)
✔ each resource's data gives its icon's title as the icon's page on game-icons.net gives it (0.1661ms)
✔ actions carry their labels, status texts and the fixed explore duration (0.1382ms)
✔ conditions carry labels and the value range of hereBelow (0.1281ms)
✔ the archetype and the pace are in data (0.1031ms)
✔ setProgram accepts every resource of the map data list, in conditions and in walks (8.3158ms)
✔ setProgram accepts the empty program, both actions without a resource and the ends of the range (0.6128ms)
✔ setProgram rejects a resource id outside the map data list (1.5869ms)
✔ setProgram rejects kinds outside the closed list and values outside the data range (1.2113ms)
✔ a refused program leaves the game unchanged (0.7063ms)
✔ send rejects a map or an archetype id not in the data (0.6655ms)
✔ every map step and every fixed action duration is a whole number of minutes, at least 1 (0.3686ms)
✔ an activity of 0 minutes from faulty data still finishes in the next minute (1.2421ms)
✔ a new game has an empty program, no map run, the initial seed and no pause (2.4768ms)
✔ a send starts a map run at minute 0 with the seed mixed from the last seed and the real time (1.6643ms)
✔ a send while a map run exists is refused (1.1009ms)
✔ a program edit during a 20-minute exploration does not interrupt it and applies at minute 20 (1.1432ms)
✔ Restart starts a new map run at minute 0 with the same seed and tiles and the current program (2.6322ms)
✔ Restart with the starting program gives back the sent map run (0.5858ms)
✔ Zakończ ends the map run, keeps the program and the last seed (0.599ms)
✔ the next send after Zakończ takes a new seed from the later real time (0.6055ms)
✔ Restart and Zakończ without a map run are refused (0.3453ms)
✔ offset coordinates convert to axial with odd rows shifted right (4.0563ms)
✔ sameHex and tileAt compare axial coordinates (0.3787ms)
✔ a tile inside the grid has six neighbours, the corner (0,0) has two, in tile-list order (0.3396ms)
✔ hex distance counts steps (0.1548ms)
✔ centres: origin at zero, next in row one tile width right, next row 1.5 radii lower (0.2845ms)
✔ six corners at the radius, the first straight above the centre, clockwise (0.2506ms)
✔ tile label is (col, row) in offset coordinates (0.1259ms)
✔ nearestTile: the start tile qualifies at 0 minutes and is its own first step (0.4962ms)
✔ nearestTile: walks the shortest route and gives the first step (0.368ms)
✔ nearestTile: null when nothing qualifies (0.4186ms)
✔ nearestTile: equally near tiles are decided by tile-list order (0.4739ms)
✔ nearestTile: the first step is the first neighbour in list order on a cheapest path (0.6722ms)
✔ nearestTile: a cheaper detour is preferred over a costly tile (0.3436ms)
✔ tiles are row-major, unrevealed, with the map step cost (2.1813ms)
✔ only the map resources appear, each with its full stock (2.8713ms)
✔ the entrance is the fixed one and lies on the map (0.4799ms)
✔ the same seed gives the same tiles, another seed other tiles (0.5792ms)
✔ every resource with positive density lies on at least one tile, seeds 1-20 (0.6994ms)
✔ the minimum guarantee places a resource nobody drew (1.321ms)
✔ a resource of zero density is never placed (0.3125ms)
✔ drawLayout does not change the map (0.2349ms)
✔ golden values: the layout stream of seed 1, mixSeed(1, 1000) and the stocks of Las for seed 1 (0.6089ms)
✔ always holds (2.5402ms)
✔ hereBelow reads 0 on an unrevealed tile, whatever lies there (0.6836ms)
✔ hereBelow compares the true stock of a revealed tile (0.4254ms)
✔ hereBelow with N = 0 never holds (0.3272ms)
✔ the first rule whose condition holds and whose action is feasible wins (1.6623ms)
✔ a rule whose condition does not hold is skipped (0.3368ms)
✔ a rule whose action is not feasible is skipped (0.3028ms)
✔ with no applicable rule the character waits (1.9853ms)
✔ a wait lasts waitMinutes, one game minute (0.4115ms)
✔ feasibility and choice do not draw from the wander generator (0.4747ms)
✔ the chosen action is a copy, not the program rule itself (0.3337ms)
✔ no public function of the game changes its inputs (13.0775ms)
✔ the program held by the state does not follow later changes of the object passed in (0.5124ms)
✔ a returned state is plain JSON (1.6804ms)
✔ the same state gives the same sequence (2.5992ms)
✔ values lie in [0, 1) and the state stays a uint32 (3.6015ms)
✔ nextRandom does not change its input and advances the state (0.4894ms)
✔ different states give different sequences (0.3184ms)
✔ streams of one seed differ (0.3055ms)
✔ a stream state is deterministic and changes with the seed (0.259ms)
✔ mixSeed is deterministic and changes with either argument (0.2786ms)
✔ mixSeed uses the high part of a large realMs (0.1928ms)
✔ S1: the simulation imports only its own files and names no DOM, Node, timer, clock or other randomness (15.0273ms)
✔ S1 control: each forbidden form is flagged, and the same names in comments and strings are not (2.5212ms)
✔ S2 scans the simulation outside sim/data, the view and the entry module main.ts (0.3624ms)
✔ S2: no file of the simulation outside sim/data, of the view or main.ts writes a content id or name (8.701ms)
✔ S2 control: literal ids, names and closed unions are flagged; reading them from data is not (0.4172ms)
✔ a directory that does not exist yet (the view before it is written) gives no files, not an error (0.2642ms)
✔ 1000 ms of real time moves the run on by one game minute (3.3592ms)
✔ parts of a second carry over from one call to the next (0.3743ms)
✔ real time passed while paused changes nothing, carry included (0.9318ms)
✔ after a resume time goes on from where the pause held it (0.3198ms)
✔ one long real time (a hidden tab) advances that many minutes at once, with no cap (5.7762ms)
✔ 1000 ms in one call and 1000 calls of 1 ms give the same state and events (2.5726ms)
✔ real time is ignored when it is not a finite number above zero (0.7856ms)
✔ real time without a map run is ignored (0.5719ms)
✔ passing real time gives the events of the minutes it covers, in order (1.0084ms)
✔ advanceMinutes advances a span of game minutes, also while paused (0.6382ms)
✔ advanceMinutes of zero minutes changes nothing (0.4ms)
✔ advanceMinutes rejects a span that is not a whole number of minutes from zero up (1.0554ms)
✔ advanceMinutes and setPaused without a map run change nothing (0.3673ms)
✔ exits with an error instead of reporting ready when port 3000 is occupied (291.0597ms)
✔ listens on the address given by LOOP2_LISTEN_HOST and LOOP2_LISTEN_PORT (161.5675ms)
✔ rejects LOOP2_LISTEN_PORT="0" without a readiness line (143.1846ms)
✔ rejects LOOP2_LISTEN_PORT="65536" without a readiness line (212.5795ms)
✔ rejects LOOP2_LISTEN_PORT="abc" without a readiness line (151.294ms)
✔ rejects LOOP2_LISTEN_PORT="3000x" without a readiness line (146.8843ms)
✔ rejects LOOP2_LISTEN_PORT="" without a readiness line (146.88ms)
✔ every icon file passes the untrusted-input rules (5.3379ms)
✔ the check rejects an svg holding a script (0.2923ms)
✔ the check rejects an svg holding an onload attribute (0.1303ms)
✔ the check rejects an svg holding a foreignObject (0.112ms)
✔ the check rejects an svg holding an external href (0.1836ms)
✔ the check rejects an svg holding an external xlink:href (0.1415ms)
✔ the check rejects an svg holding an external url( (0.0973ms)
✔ the check rejects an svg holding a data: URI (0.08ms)
✔ the check rejects an svg holding a protocol-relative address (0.1118ms)
✔ the check rejects an svg holding an xmlns with another value (0.2211ms)
✔ the check rejects an svg holding a <!DOCTYPE (0.1037ms)
✔ the check rejects an svg holding an <!ENTITY (0.1954ms)
✔ the check rejects an svg holding an <?xml-stylesheet (0.1317ms)
✔ the check rejects an svg holding a <style element (0.0563ms)
✔ the check rejects an svg holding an @import (0.0804ms)
✔ the check rejects an svg holding an unquoted href (0.0639ms)
✔ the check rejects an svg holding an unquoted xlink:href (0.0558ms)
✔ the check passes an svg holding only the two allowed namespace declarations (0.2056ms)
✔ every icon file is a dark shape without a background: svg and path elements, allowed attributes only (1.3428ms)
✔ each icon credit records that the file was changed from its source (0.1957ms)
✔ each footer line names the icon by its title on game-icons.net and says after the licence that it was changed (1.8119ms)
✔ the footer links open in a new tab, without opener or referrer (0.2915ms)
✔ each icon named in the resources data exists as a file (0.3791ms)
✔ each icon file has a credit with an author and the source commit (0.2486ms)
✔ importing the editor touches no DOM: Node has no document and the import succeeded (1.9805ms)
✔ the number field: empty or not a number keeps the previous value and commits nothing (0.9522ms)
✔ the number field: a number is rounded to a whole number and committed when it differs (0.2118ms)
✔ the number field: a number is clamped to the data's range 0–50 (0.2245ms)
✔ the number field: the same value after rounding or clamping is written back but not committed (0.1582ms)
✔ „Dodaj regułę” appends „Zawsze → Eksploruj” (0.2721ms)
✔ „Usuń” removes the rule at its position (0.1788ms)
✔ „↑” and „↓” swap a rule with its neighbour; past either end nothing is committed (0.3297ms)
✔ switching the condition to „Tu leży mniej niż” takes the map's first resource and the data's default N (0.2381ms)
✔ switching the condition to „Zawsze” drops its resource and number; the same kind commits nothing (0.1956ms)
✔ switching the action to „Idź” takes the map's first resource; other kinds carry none (0.2193ms)
✔ choosing a resource or a number changes only that rule; the same choice commits nothing (0.2372ms)
✔ the resource lists offer the shown map's resources before sending and the run's map's during a run, in order (0.8945ms)
✔ focus after a structural edit: same button in the moved rule's row, next „Usuń” or „Dodaj regułę”, new condition (0.1506ms)
✔ every program the editor builds passes setProgram, before sending and during a run (2.2806ms)
✔ exploring shows the minute and „Eksploruje” (2.1952ms)
✔ the minute shown is the map run's game minute (0.4584ms)
✔ wandering shows „Wędruje” (0.3329ms)
✔ walking to a resource shows „Idzie po: ” and the resource's name from data, for each resource (0.494ms)
✔ waiting because no rule applies shows „Czeka — żadna reguła nie pasuje” (0.2559ms)
✔ a paused map run gets „ (pauza)” appended, and loses it when resumed (0.4062ms)
✔ a game without a map run has an empty picture (1.6249ms)
✔ all tiles are drawn from minute 0, unrevealed ones without icons (1.8318ms)
✔ polygon points come from the hex centre and corners at the given size (1.351ms)
✔ every polygon lies inside the picture (0.4574ms)
✔ a revealed tile carries one icon per resource present, dimmed only at stock zero (0.912ms)
✔ the picture holds no stock numbers (0.9161ms)
✔ the character tile has the character outline (0.541ms)
✔ the step target is outlined only while a move runs (7.4171ms)
✔ a tile's icons follow the order of the resources in the run's map data (0.6725ms)
✔ a game without a map run has no columns and no rows (1.5592ms)
✔ the columns are the map's resources in the map's order, with names and icons from data (1.4947ms)
✔ rows stand only for revealed tiles, in tile-list order, labelled (col, row) (0.5072ms)
✔ each row gives the stock of every resource of the map, „—” where the tile lacks it, 0 when used up (0.2695ms)
✔ a fresh map run lists nothing; exploring the entrance lists that tile with its stock (0.553ms)
ℹ tests 173
ℹ suites 0
ℹ pass 173
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1562.2144

```

### f6-quality-suite.txt

```text
.....................................................................................................
----------------------------------------------------------------------
Ran 101 tests in 91.212s

OK

```

### f6-ruff-method.txt

```text
{"check": "scripts/check_ruff.py", "verdict": "fail", "invariant": null, "description": "QualityError: local Ruff is unavailable: C:\\Storage\\repos\\loop2\\.runs\\worktrees\\coding-guidelines\\.runs\\quality-venv\\Scripts\\ruff.exe"}

```

### f6-weakest-point.txt

```text
windows processes: plausible stdout rejected real exit 7
windows processes: empty stdout rejected real exit 7
unix processes: plausible stdout rejected real exit 7
unix processes: empty stdout rejected real exit 7
windows listeners: plausible stdout rejected real exit 7
windows listeners: empty stdout rejected real exit 7
unix listeners: plausible stdout rejected real exit 7
unix listeners: empty stdout rejected real exit 7
8/8 failed real subprocess observations rejected

```
