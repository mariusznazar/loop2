# Handoff — review of the whole change, task `pierwsza-mapa-bez-loterii`

You are the reviewer of the whole change. You did not make it. Method: read `.the-way/task-cycle/review/SKILL.md` whole and follow it, in its variant for **the whole change** (it sends you to `.the-way/task-cycle/review/whole_change.md`; read that when the SKILL says). Read-only: you change no tracked file and make no commit. Work from the root of the worktree `.`.

## What is reviewed

- Range: base `e54f23c0ea3bd1db13d2635333417eb50412d6a0` (the task's base, `main`) to head `23981674` (check `git rev-parse HEAD` first; on a mismatch ask before going on). Compute the diff yourself: `git diff e54f23c0..23981674` and `git log e54f23c0..23981674`. Five commits: `f513b34f`, `d5bb06de`, `32fb9908`, `78d2aa2b`, `23981674`.
- Route: one author without a plan; no spec, no plan, no slices, so no slice had a review of its own: you judge the whole change as the single review of it.
- Frozen task, read whole: `.runs/task-cycles/pierwsza-mapa-bez-loterii/task.frozen.md` (a frozen copy; the original is a private note, not for you to open). Each item of *To do* 1–8, each row of *Settlements to record*, each projected entry the task carries (*Decisions in play*, the two entries of the definition) and *Out of scope* are what the change is held to; judge source fidelity of the entries against the task's wording word for word.
- The author's report (claims to verify, not evidence): `.runs/task-cycles/pierwsza-mapa-bez-loterii/reports/author-report.md`. The author's handoff, which says what it was told to read and do: `.runs/task-cycles/pierwsza-mapa-bez-loterii/reports/author-handoff.md`.
- No pin moved: the process pin is unchanged (`.the-way` at `55afa8e5`).

## Answers of step 4 you are told

- **Trust boundary: yes.** The part map names `src/browser/sim/saved-game.ts` as the trust boundary of `simulation`; the change raises its version constant (5 → 6) and the data the loader accepts follows from `maps.ts`. Check crafted input at that boundary: a saved game of the old version, of the new version with a solved-map list that does not fit the opening order (for example Las solved with Skraj lasu not), a missing or foreign map identifier, a wrong version number; the loader's rule is „a missing key is not completed; refuse more, never less” (`guidelines/coding-saved-game.md`).
- **Irreversible operation: no.** The change only prepares game data, a version number, tests and foundation entries; discarding old saved games is the product's behaviour decided by the human (Q4 of the task), not an operation of the cycle. Check nevertheless that the change performs nothing outside the repository.
- Open design choice: none. The orchestrator settled three small choices for the author, each recorded as an autonomous choice: identifier `forestEdge`; first key of `MAPS`; 500 seeds in the balance test (author measured: the test file runs in 3.8 s). Judge them, as every choice.

## Where the orchestrator's selection fell short — read these with care

The author's report names what stayed unread or was read in part. The orchestrator decided to carry the gap to you, since you select your own foundation and guidelines:

- Decisions the author was told to read and did not read whole: D-18, D-22, D-80, D-82, D-132, D-133, D-142, D-144, D-208, D-209, D-210; read in part: D-24, D-122, D-136, D-206. The author searched the foundation by words (`first map`, `second map`, `Las`, `forest`, …) and did not read by title the decisions whose *Scope* names `simulation`. Its glossary was not read. Judge whether the corrections of To do 8 (D-121, D-124, D-330, D-378, D-388, and D-19 which the author found) are complete and exact, and whether any sentence of the foundation that the change makes false was missed (a search by meaning, not by the words the author used: „the only map”, „the map”, the start of a new game, the first run, the first discovery, the list of maps, solved maps, the order of the maps).
- Reaches the author reports beyond the task: (1) 62 existing test files migrated mechanically (new fixture `withEdgeSolved` in `tests/sim/understanding-fixture.mjs`) because a new game can no longer send to Las; (2) a behaviour change of the view, `src/browser/view/program-editor.ts` `offeredResources`: before a run it offered the resources of the first map, which are now sticks and berries, so it now offers those of every map — no decision names this behaviour; the task does not ask for it. Judge whether it belongs to the task (a change without it would leave moss and fiber never offered), whether it is a regression risk, and what grade a missing decision or a missing mention in the task deserves; (3) four Python invariant tests and `tests/invariants/program_fixture.py`, `stryker.config.json`, `README.md`, the `loop2-play` skill and its `compose-state.mjs` in both `.claude` and `.agents` copies; (4) D-19, not named in the task.
- Departures of the written entries from the approved projected wording, stated by the author as forced by the template: D-396 *Relations*, D-396 *Verification* (names `first-map-balance` as well), `first-map-stock` *Method* `test` instead of `review`. Check each against the template and the projected mode, and say whether any widens the meaning of an approved entry.
- The task document says the saved game version is 4; the base has 5. The author raised 5 → 6. The task asks for „one raise”; judge it.
- UI check: the author did not take a screenshot of the screen Mapy (no code of a look or text of a screen changed; states are checked in jsdom). Judge by `.the-way/task-cycle/change/ui_check.md` whether anything is owed; a rendered look that was not checked is carried to the request as unchecked, not passed.

## Checks and what is the orchestrator's

- The product's whole gate (`npm test` with no argument) is the orchestrator's; it runs after the reviews. The mutation tool is yours where `guidelines/testing.md` (*Mutation testing*) puts it for the files the change touches; run it only as that rule gives, on the changed files of the simulation, and report its result with the command and exit code. Run any other check you need as the focused call the product's rules give; every check you report carries its command and exit code. Build and tests write only ignored paths (`dist/`, `.stryker-tmp/`); keep the tracked tree clean.
- Base gate: `npm test` on the base `e54f23c0` exited 0 with no failing check.

## Report

Write the full report to `.runs/task-cycles/pierwsza-mapa-bez-loterii/reports/review-whole-report.md`, in the form your method gives; the report's first line is `PASS <sha>`, `FAIL <sha>` or `questions`. For each blocking finding name the slice it comes from, or that it comes from none (here: one author, so none). Grade and scope each finding yourself; list Minor findings within the task separately from those outside it. Include **Unread material** (and the count of decisions read whole and by title) and **Searches not found or unclear**. Return the short form: first line, changed files with counts, the report path, questions.
