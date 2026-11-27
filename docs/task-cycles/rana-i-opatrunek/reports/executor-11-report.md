# Report — executor of Slice 11, task rana-i-opatrunek

**Status:** done

## Commits

Base `878fc9e987d763813f7ceef467e2348f8a9c4528`, head `6955a494899b6c0b9c943823d2fd6a3cc74c2ed7` (one commit, by path):

- `6955a494` test: the last reference program brings bandages … (D-427, D-428, D-144, D-145, D-187)

## Files changed (added / removed lines)

- `tests/sim/reference-programs.mjs` 51 / 2: helpers `tend(item)` and `pressure(item)`; two groups (`FIGHT_WITH_BANDAGES`, `DRESSING`); `settlingGroups` gets an option `bandages` (off by default, so the older programs are unchanged); the new program `forestBandages`, last in `REFERENCE_PROGRAMS`.
- `tests/balance/agreement.test.mjs` 88 / 1: three cases and a helper (below), imports of `stepMinute`, `mapRunEnded` and engine helpers.
- `.claude/skills/loop2-balance/SKILL.md` 1 / 1 and `.agents/skills/loop2-balance/SKILL.md` 1 / 1: "23 programs" becomes "24 programs"; the two copies are byte-identical (`cmp` and the Python test).

## The new program, for the orchestrator's measurement

- Identifier (label): `forestBandages`, label **P24** (`npm run --silent balance -- programs` ends with `P24 forestBandages — 16 rules in 7 groups. Take: 4 × opatrunek, 8 × patyk, 7 × jagoda.`).
- Take list: `bandage` 4, `stick` 8, `berry` 7 (19 asked; the cap of 15 spent in list order lets in 4 + 8 + 3, the berries give way). Chest for `--chest`: `bandage=4,stick=8,berry=7`.
- Groups: "Jedzenie" (eat below 75 satiety), "Walka" (below 50 health: Ucisk with bandage; then strike, kick), "Opatrunek" (below 70 health: Opatrz with bandage), then "Głód", "Miejsce na ognisko", "Zimno", "Zapasy" as in `forestDeepBest` (P10). Its comment says it depends on the branch Ucisk.
- Thresholds: 50 (Ucisk) and 70 (Opatrz) were the first values written, chosen a priori (a bandage heals 25, so below 75 none of it is lost to the cap at full health; the wolf bites 7). No other value was tried and none was changed after a result (To do, item 5). The program was written once.
- Commands to run for the measurement (from the worktree root):
  - `npm run --silent balance -- programs`
  - `npm run --silent balance -- trace --map forestPack --program forestBandages --chest bandage=4,stick=8,berry=7 --ranks pressure=1 --gear pocket1=bandage --seeds 1`
  - `npm run --silent balance -- sweep --map forestPack --program forestBandages --chest bandage=4,stick=8,berry=7 --ranks pressure=1 --gear pocket1=bandage --seeds 1-500` (my reading of the flags from the skill's table; I did not run a 500-seed sweep, which is the orchestrator's measurement).
  - The same sweep with `--map forestDeep` for the Las — głębiej row.
- What I saw by hand (a 40-seed exploration with the same rules, not a measurement and not kept): on Las — wataha with Ucisk bought and a bandage in the pocket, the program dressed outside a fight on all 40 seeds and pressed in a fight on 19 of 40; 32 of 40 solved. I did not tune on that.

## Checks (command and exit code)

- Test written first, failing on a stub of the program (the stub, an empty program, was in `REFERENCE_PROGRAMS`-less form; the base has no program at all, so an import of it would stop on a missing export, which is no assertion): `npm test -- tests/balance/agreement.test.mjs` exit 1 with the stub — the two preconditions failed on their assertions (`enteredWith` lacked the bandages; "seed 1 dressed"), the agreement case passed (the empty program agrees trivially).
- After the program: `npm test -- tests/balance/agreement.test.mjs` exit 1 once — the precondition of the take list failed because the game lists `enteredWith` in the order of its items (stick, berry, bandage), not of the take list; I changed the assertion to compare the counts as a record (a reading of the game's own listing, not a weakening: it still fails if bandages are 0 or berries 7). Then exit 0, 12 passed.
- `npm test -- tests/balance/cli.test.mjs` exit 0
- `npm test -- tests/balance/check-map.test.mjs` exit 0
- `npm test -- tests/balance/progression.test.mjs` exit 0
- `npm test -- tests/sim/judging.test.mjs` exit 0
- `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` exit 0
- `npm run --silent balance -- programs` exit 0; the new program is the last label, P24.
- `npm run --silent balance -- trace --map forestPack --program forestBandages --chest bandage=4,stick=8,berry=7 --ranks pressure=1 --gear pocket1=bandage --seeds 2` exit 0 (seed 2, the first seed I looked at with a combat turn of Ucisk; the Checks name `--seeds 1`, which shows Opatrz but no Ucisk turn, see below).
- `npx prettier --check` and `npx eslint` on the two test files: exit 0 (not in the Checks; run because the full gate runs them).
- `python -B .the-way/elements/common/foundation_check.py` exit **1**, 8 errors, all of the form "the quotation does not begin a sentence of / stands in no binding sentence of `D-199` / `D-290` / `D-293` / `D-289` / `D-363`" in `tests/view/character-skills.test.mjs` and `tests/view/pressure-pick.test.mjs`. None of those files or `foundations/` is in my diff, and the check reads their quotations against `decisions.md`; I take them to be failures of the base (earlier slices' tests against the foundation step's new wording), but I did **not** run the check on the base in a clean copy, so that is a reading of the diff, not a measured result. No error names a file of this slice.
- Not run: the whole suite (`npm test` with no file), by the handoff's order.

## Own-work check

Requirement most likely not met: "each rule of bandages acts where its condition holds" (Checks, last trace) and "bandages stand before what gives way to them within the cap".

- The take-list order: the precondition case sends a chest of 4 bandages, 8 sticks, 7 berries through the game and reads that 4 + 8 + 3 came. Mutation: berries listed before the bandages would leave 0 bandages and the case fails.
- Opatrz outside a fight: the trace (seed 2) shows `start Opatrz opatrunek` at minutes 112 (H=50.1), 268 (58.9), 372 (59.8), 795 (63.0), all below 70, and none above. The precondition case also asserts `minutesBy.tend > 0` on seeds 1 to 10.
- Ucisk in a fight: the trace of the instrument shows no combat turns (it prints started rule actions only), so the trace of the Checks cannot show Ucisk. I read the turns of the combat record (`lastCombat.result.exchanges`) of seed 2 and 3 with a scratch script (removed): the one turn of Ucisk on seed 2 came at 46.1 health after a bite (below 50) and gave 71.1 (+25); at 50.1 health the next turn kicked (condition not held); on seed 3 the turn came at 48.1 after a bite and gave 73.1. The precondition case in the test file does the same by the game's own `stepMinute` and asserts that some seed of 1 to 10 has a turn of Ucisk.
- Mutation in my head: removing the pressure rule fails the precondition (`pressed > 0`); removing the dressing rule fails `minutesBy.tend > 0`; a program that stops using the pocket bandage first is not caught by a case (the agreement case compares the two ways, it does not name which bandage is used up first); that is a rule of the game (D-144) with its own tests in earlier slices.
- The agreement case ends alike through the game and through the instrument on 40 seeds (`minutes.size > 1`, so the seeds are not copies).

## Walkthrough

The change alters nothing a player sees in the game: it adds a reference program that only the tests and the balance instrument read, and moves the instrument's list of programs by one entry (the `programs` and `trace` commands I ran above; the table of `check-map` and `progression` gets one more row per map, which I did not run, they stay in the orchestrator's measurement). No screen, no answer of the account server.

## Reaches beyond the dispatch

- `balance/engine.mjs` (exports `makeState`, `startOf`, `prerequisitesOf`, `buildSkills`, `buildGear`, `runOnce`) and `balance/trace.mjs`, read to know what the test can import and what a trace shows.
- `src/browser/sim/types.ts:60-215`, `src/browser/sim/data/skills.ts` (the branch `pressure`, skill `tending`), `src/browser/sim/data/items.ts` (bandage: heals 25, fits a pocket, no resource), `src/browser/sim/data/gear.ts`: to write the notation and the rank of the test.
- `balance/progression.mjs:44-70` (`neededBranches`: the branch is bought by the progression mode for a program that uses the action), `balance/cli.mjs:160-215` (flags), `tests/agent_workflow/test_loop2_balance_skill.py`, and `.claude/skills/loop2-balance/SKILL.md` lines 20-70, 95-110, 160-200: what the skill says of the count, the flags and the pocket.
- `.the-way/task-cycle/change/walkthrough.md` sections 1-4 (to judge whether a walk applies).
- No gap that changes the work; the slice's *Read* named the right files.

## Working copies

`.runs/executor-11/` in the worktree held scratch scripts (`explore.mjs`, `count.mjs`, `exch.mjs`) and the outputs of runs. Removed in full before this report was written; nothing remains.

## Unread material

- `foundations/decisions.md` D-427, D-428, D-429, D-438, D-144, D-145, D-187: read whole at the current ranges.
- `foundations/invariants.md` instrument-game-agreement: read whole. 
- `foundations/glossary.md:302-307` (wall) and `foundations/part_map.md:34-66, 128-159`: not read; the slice changes no data of a map and no file whose part I had to look up (the files I changed are named by the plan's *Change*). `src/browser/sim/data/maps.ts:140-161` forestPack: read.
- `guidelines/testing.md` and `coding.md`: read whole. `guidelines/coding-balance-instrument.md` and `coding-simulation-module.md`: not read; I changed no file of `balance/` or of the game's code, only tests and the skill copies.
- The `check-map` and `progression` tables with the new program: not run (the orchestrator's measurement).

## Searches not found or unclear

- The Checks' trace command with `--seeds 1` does not show Ucisk: the trace prints only started rule actions, never the turns of a combat, and seed 1 has no turn of Ucisk. Ucisk is shown by the combat record, as above.
- The plan says the foundation check passes; on this branch it prints 8 errors in two test files of the browser view (above), which are not this slice's.

## Choices (with the way rejected and its cost if wrong)

1. Identifier `forestBandages`, not `forestPackBandages`: the program is written from the groups of the best program of Las — głębiej and is read on both Las — głębiej and Las — wataha. Cost if wrong: a rename in two files.
2. The groups through an option `bandages` of `settlingGroups` (default off), not a copy of the groups for the new program: one source for the settling rules, so a later change of them reaches the new program too. Cost if wrong: the older programs run the same code path with the option off; the 24 `programs` entries print as before (the first 23 unchanged, P24 new).
3. Take list `bandage 4, stick 8, berry 7`: berries asked beyond the cap so the cap and the order are exercised (the plan's "standing before what gives way to them"); rejected: exactly 4 + 8 + 3, which would not exercise the order. Cost if wrong: the orchestrator's chest for the measurement is `bandage=4,stick=8,berry=7`; with 3 berries the result is the same.
4. Helper names `tend` and `pressure` in the notation, the action kinds of the data (`tend`, `pressure`); the instrument's own test `DRESSING` of `agreement.test.mjs` keeps its inline `{ kind: "tend", … }` (not touched).
5. The precondition case that reads combat turns steps a map run itself with `stepMinute` instead of adding a field to the instrument's result: no change of `balance/` (not in the slice's *Change*). Cost if wrong: a second stepping loop in a test.
6. The agreement case was in its first form written against an empty stub; the case itself passed with the stub, since an empty program agrees through both ways, so the failing-first evidence is the two preconditions, not the agreement case. Said here so that it is not read as a failure of the agreement case.

## Problems as observed

- None in the product. Seed 3 on Las — wataha dies in a fight at minute 509 with 7 health at its start: the 4 bandages and the pocket one were spent by Opatrz outside fights (40 minutes of tending on that seed) before that fight; that is the stock spent by the rule of 70 as written, not a rule that plainly does not work, so I left it (no tuning).
