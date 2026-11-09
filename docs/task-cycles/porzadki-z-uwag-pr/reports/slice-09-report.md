# Slice 9 report - the simulation's tests catch the load and loop defects they miss today

- **Status:** done
- **Worktree:** `the root of the repository`, branch `task/porzadki-z-uwag-pr`
- **Range:** `378259f` (head at start) to `f7f0726`
- **Commit:** `f7f0726` test: :white_check_mark: catch the load refusals and the stopped loop's generation the simulation's tests missed (the first version `e6ffdbf` was amended once, to drop a wrong invariant tag, before the report; nothing was pushed)

## Files changed

| File | Added | Removed |
|---|---|---|
| `tests/sim/saved-game.test.mjs` | 105 | 0 |
| `tests/sim/loop.test.mjs` | 19 | 0 |

No product file changed in the commit. `git status` is clean after the commit. The temporary defects were made with `sed` and taken out with `git checkout --` on the same file each time; the `git diff -- src` before each run showed exactly the one-line defect.

## What changed

Six new tests in `saved-game.test.mjs` and one in `loop.test.mjs`. No existing test was changed. The expected values come from the decisions, the data file or the document itself, not from the code's output.

1. **Chest at its capacity (item 12).** `a chest holding exactly its capacity loads, and one piece beyond it is refused as shape`. The capacity is the literal 60 from `src/browser/sim/data/balance.ts` (`chestCapacity: 60`), with a comment saying so. The chest is `{ stick: 60 }`, which loads; `{ stick: 60, berry: 1 }` is refused as `shape`.
2. **Deposit at its planned count (item 12).** `a completion depositing exactly the planned counts loads`. The planned counts are the document's own frozen bring plan (`berry` 5, `stick` 20, D-179). Depositing exactly those loads.
3. **Two characters of one number (item 13).** `two characters of one number are refused as shape, the rest of the document sound`. The base is `HEADQUARTERS`, which has one character, no other reference to a character number, and loads on its own (asserted in the test). A second character with number 1 and the name "Ewa" is the only fault.
4. **Program number not below the counter (item 13).** `a program whose number is not below the next program number is refused as shape`. Base `HEADQUARTERS` (`nextProgramId` 2); a second program with id 2 and a distinct name, which nothing references. Refused as `shape` for that fault alone.
5. **Death with a wrong solved mark (item 14).** `a map run ended in death whose mark disagrees with its map's being solved is refused as shape`. Two cases on the document: mark set on a death on an unsolved map, and mark unset on a death on a solved map. Both refused as `shape`. Expectation from D-214 (the mark stays to the end of the run) and D-55.
6. **Rule group name that is no text (item 16).** `a program whose rule group's name is no text is refused as shape`. Base `HEADQUARTERS`; the group's name is `7`, `null` or `["Program"]`, each refused as `shape`. Expectation from the glossary entry "rule group" (a named set of rules).
7. **Generation of a loop of a character other than the first (item 15), in `loop.test.mjs`.** `a loop of a character other than the first that stops in passing writes that character's own generation`. Ola (id 2) has a loop whose body is dying and whose resurrection is ready only far in the future, so her loop stops at the first minute with no resurrection (D-190). Her generation goes from 1 (creation, `game.ts:412`) to 2. The test calls `passLoops(state, T0, T0 + 5 * 60_000)` and asserts Ola's report line has `stop: { generation: 2, away: false }`, that Ala's generation stays 1, and that Ola's loop is gone. `passLoops` is added to the file's import from `dist/browser/sim/loop.js`.

## Checks (command - exit code)

Each test file was run through `npm test -- <file>`, which builds first (the slice's checks). Logs are in the session scratchpad, `a temporary directory outside the repository`.

Passing runs, on the unchanged code, before any defect:
- `npm test -- tests/sim/saved-game.test.mjs` - exit 0 (33 of 33 pass) - `pass-saved.log`
- `npm test -- tests/sim/loop.test.mjs` - exit 0 (37 of 37 pass) - `pass-loop.log`

Failing runs, one defect at a time, each in place only for its run:

| Item | Defect (file:line, as the handoff names it) | Command | Exit | New test that failed |
|---|---|---|---|---|
| 12a | `saved-game.ts:373` `>` to `>=` | `npm test -- tests/sim/saved-game.test.mjs` | 1 | chest holding exactly its capacity |
| 12b | `saved-game.ts:775` `>` to `>=` | same | 1 | completion depositing exactly the planned counts |
| 13a | `saved-game.ts:512` `ids.has(id)` removed at characters | same | 1 | two characters of one number |
| 13b | `saved-game.ts:484` counter check removed at programs | same | 1 | program number not below the counter |
| 14 | `saved-game.ts:980` mark not compared after a death (see below) | same | 1 | death with a wrong solved mark |
| 16 | `programs.ts:249` `typeof group.name !== "string" ||` removed | same | 1 | rule group name that is no text |
| 15 | `loop.ts:409` `generationOf` reads `state.team.characters[0]` | `npm test -- tests/sim/loop.test.mjs` | 1 | loop of a character other than the first |

Each failing run shows exactly the one new test in its `failing tests` list; the other tests of the file passed. Logs: `defect-12a-chest.log`, `defect-12b-deposit.log`, `defect-13a-character.log`, `defect-13b-program.log`, `defect-14-death-mark.log`, `defect-16-group-name.log`, `defect-15-generation.log`.

Final passing runs on the committed code:
- `npm test -- tests/sim/saved-game.test.mjs` - exit 0 (33 of 33) - `final-saved.log`
- `npm test -- tests/sim/loop.test.mjs` - exit 0 (37 of 37) - `final-loop-2.log`, run after the amend

Extra check on the files I changed:
- `npx prettier --check tests/sim/loop.test.mjs tests/sim/saved-game.test.mjs` - exit 0

Not run:
- `npm test` without arguments: not run, as the instructions forbid. The product's gate and the foundation check were not run by me either.
- `tests/sim/catch-up.test.mjs`, which also imports `passLoops`: not in the slice's checks, so not run. I did not verify whether it already catches defect 15.

## The defects as they were made

- **Defect 14.** The line is `if (run.completion ? !mapSolved : solvedMapRun !== mapSolved) refuse();`. The defect makes the non-completion branch skip the mark check after a death: `... : run.death === null && solvedMapRun !== mapSolved) refuse();`. The handoff names the defect only as "the mark not compared after a death", so this exact form is my reading of it.
- **Defect 16.** Removing the `typeof` check alone fails the TypeScript build (`programs.ts(276,12): name: unknown is not assignable to string`), so the build broke before any test ran (first attempt, exit 1 with no test failing). For the defect to be a runtime defect, I also changed `name: group.name` to `name: group.name as string` in the temporary edit. The cast is not in the commit.

## Own-work check (section 3)

- **Requirement most likely not met:** the refusals must be for the one fault alone, without a second fault refusing the document earlier. The crafted cases in `CRAFTED` at `saved-game.test.mjs:1145`-`:1152` (`two characters of one number`, `a program's number reaching the next one`) break references too (loops, pick, report), so they would still be refused under the defect. The new tests use the clean base `HEADQUARTERS`.
- **Check written and run:** each of the six refusal and load tests was run with its defect in place (the table above). Every defect turned exactly its test red and left the others green, so the new tests isolate their faults. The base document of each refusal test is asserted to load (`HEADQUARTERS` in the duplicate-character test; the other bases are the same document already used by the existing load tests).
- **Result:** all seven defects were caught by their own test. No test passed under a defect.

## Reach beyond the handoff (section 1)

- Read `guidelines/coding.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-simulation-module.md` and `guidelines/testing.md` whole, as the handoff names them through the CLAUDE.md of the repo.
- Read `D-352`, `D-353`, `D-354` whole (end of `foundations/decisions.md`, lines 7870-7951). They are about the browser view and the account server, not this slice.
- Read `src/browser/AGENTS.md` (the design-token rule for `browser-view` files). It does not apply to tests or to `src/browser/sim/`; I changed no CSS or view file.
- Read `the author's private rules note on git` before the commit (commit language, explicit paths, the author address). The author is `mariusznn@gmail.com`, the same as the previous commits of this worktree; I did not touch the git config.
- Read `src/browser/sim/data/balance.ts` for `chestCapacity` (60) and `loopMinuteRealSeconds` (60).
- Grep for `passLoops` and `catchUp` callers: the view's `src/browser/view/clock.ts` calls them, so `passLoops` is the function the open game uses; that is why the loop test calls it directly.
- Did not read `.the-way/task-cycle/change/ui_check.md`: the change alters no screen.
- Did not read the vault's `Notes/Projects/(P) Loop/_tasks_active.md` or the vault's `task.md` passages beyond what the handoff gave; I used the passages the handoff copies word for word.

## Choices

1. **Clean base for the refusal tests.** The new refusal tests start from `HEADQUARTERS` and change one thing, not from `DOCUMENT` or `CRAFTED`. Rejected: adding entries to `CRAFTED`, because those documents break references and a refusal could come from the other fault. Cost if wrong: none for coverage; the new tests are slightly more verbose.
2. **Loop test through `passLoops`.** Rejected: driving the stop through `passRealTime` in `game.ts`, which needs the whole game state and more setup; `passLoops` is the function that writes the report line. Cost if wrong: the test is tied to `passLoops`'s export and signature, which the view also uses.
3. **Defect 16 with a cast.** Chosen: the cast keeps the TypeScript build passing so the runtime defect is what fails. Rejected: leaving the build broken, which would have failed every test in the file for a reason other than the check. Cost if wrong: none; the cast is only in the temporary edit.
4. **Stop path for item 15.** Rejected: testing `stopLoop` (the player's "Zatrzymaj"), since `stopLoop` writes `stoppedLoops` with no generation at all. The generation is written only where a loop stops in passing (`passLoops` and `catchUp`, `loop.ts:511` and `:567`), so that is the path the defect can touch. Cost if wrong: the test covers `passLoops`, not `catchUp`; `catchUp` uses the same `generationOf`, so a defect in `generationOf` would also show there, but that is not tested here.
5. **Invariant tags.** The refusal tests carry `// invariant: save-version`, because they are the trust-boundary refusals of `save-version` (the guideline asks for a tag and a seen failure). I did not tag the loop test: it is not a trust-boundary test, and no invariant in `foundations/invariants.md` matches the generation of a stopped line. My first version tagged it `death-settled-once`; I removed that tag before the commit (the amend). The loop test itself is not a changed invariant test.

## Adaptations of the plan to the code (section 4)

- The handoff says "stopping the loop of a character other than the first writes that character's generation". In the code the generation is written only when a loop stops in passing (death without resurrection), not when the player stops it. The test follows the code's path (see choice 4). This is a one-line adaptation, not a structural mismatch.
- The defect for item 16 needed the cast (see the defects section). Minor.
- The handoff's description of the "second fault" at `saved-game.test.mjs:1145`-`:1152` is consistent with what I read there (the `CRAFTED` cases), but I did not run those cases to confirm which other check refuses them. I wrote the new tests on clean bases, so their result does not depend on that.

No plan line numbers or values failed my own reckoning: `saved-game.ts:373`, `:484`, `:512`, `:775`, `:980`, `loop.ts:408`-`:410` and `programs.ts:249` all had the content the handoff names.

## Searches not found or unclear

- Nothing was missing. Unclear: the exact form of the death-mark defect at `saved-game.ts:980` (see the defects section); I chose the form above.
- Unclear: whether `tests/sim/catch-up.test.mjs` already catches defect 15. I did not run it (not in the slice's checks).
- Not found: no invariant in `foundations/invariants.md` that fits the generation of a stopped loop's report line. The loop test is therefore untagged (choice 5).

## Problems observed

- None in the product code. The product files are unchanged.
- The handoff's *Checks* are the focused runs only; `npm test` without arguments was not run, as the handoff requires.
