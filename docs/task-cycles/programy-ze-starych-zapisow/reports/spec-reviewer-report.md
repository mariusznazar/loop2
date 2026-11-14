FAIL

# Report of the reviewer of the spec (first attempt, spec not revised)

- Spec reviewed: `docs/task-cycles/programy-ze-starych-zapisow\spec.md`
- Frozen task: `docs/task-cycles/programy-ze-starych-zapisow\task.md`
- Method: `.the-way/task-cycle/spec/SKILL.md`, `review.md` (and `design.md`, for the form of the spec). No test or other check was run.

## Verdict

`FAIL`: three findings of the kinds `review.md` lists (a contradiction with the task, a contradiction with a guideline the maker must follow, behaviour the task does not ask for). None needs a new design from scratch; each is closed by a ruling of the orchestrator plus a few sentences in the spec. Findings 1 and 2 are the ones that would make the build or its review go wrong; finding 3 is smaller. Low-grade notes follow.

## Findings

### 1. (major, needs an orchestrator ruling) The spec changes D-209 where the frozen task says "Bez zmiany"

Task, section *Decisions in play*, D-209: "Bez zmiany; po resecie konto nie ma zapisu, więc karta otwarta przed resetem dostaje odmowę jak dziś." Spec, decision 2 ("The revision of D-209 after a reset") and *Foundation entries*, "D-209 (decision, changed)": after a reset the next accepted save gets a revision one above the revision the previous slot holds (not 1), and a card that loses to another card's reset gets a new sentence of its own (decision 6, "After a conflict that finds no save").

Why it matters: the task read as written keeps D-209 literally ("starting at 1", basis 0 for an account with no save). The spec adds a server rule (revision continues from the slot), a coupling between two tables that the foundation step must write as an invariant and a test must hold, and a new sentence for the browser. The spec flags the choice and gives the price, so it is not a hidden invention, but the task's own line says the opposite and the task is frozen: the reviewer of the change will compare the code with the task and meet the conflict.

The hole the spec closes is real: with a restart at 1, a stale card whose basis equals the revision the new game has reached would be accepted over the new game (D-209's purpose). It is narrow (needs equal numbers) and costs one extra read in the save write. I read the spec's rule against `writeSavedGame` and found it consistent: the slot's revision is the highest ever given to the account after a reset, and every later current row gets a higher number.

Question for the orchestrator: ratify the override of the task's D-209 line (then the spec should say in one sentence that it overrides the task's "Bez zmiany" knowingly, by the orchestrator's choice), or order the smallest reading that keeps D-209 unchanged (restart at 1, the old sentence kept for the conflict) with the narrow hole named as a price.

Related, smaller, same place: the spec's claim that a card open before the reset "holds a basis that no later state of the account can equal" is true for a basis of 1 or more. A card whose basis is 0 (it loaded when the account had no save and has not saved) is accepted after a reset, as it is today before a first save; the spec does not say so.

### 2. (major) The new reader of a fetched document contradicts `guidelines/coding-saved-game.md` and the wording of D-213, and the spec lists neither as changed

Spec decision 4 puts the reader in `src/browser/sim/saved-game.ts` and makes it lenient on purpose: it reads only `version`, `game.programs` and the `name` and `program` of each item, "any other key of the item is ignored", the strict `matches` comparison "is not applied", and its output is programs, not a game state or a refusal.

`guidelines/coding-saved-game.md`, rule "Odmowa zamiast wyjątku": the load function "oddaje stan gry albo odmowę z jednym z powodów `version`, `archetype`, `shape`", reads "ściśle: każdy klucz obecny i żaden obcy ... Wolno odmówić więcej, niewolno mniej". The guideline governs every file of kind `saved-game`, and the spec puts the new function in the exemplar file. D-213 words the kind the same way ("an unknown value ... into a game state or a refusal"). The spec lists D-213 only as a constraint it keeps, and its "Outside `foundations/`" list names `coding.md` and `testing.md` but not `coding-saved-game.md`.

Why the answer changes the build: a maker who follows the guideline would make the items strict (or refuse more), and the reviewer of the change who follows it will mark the lenient reader. Reading only `game.programs` cannot be strict about `game`'s keys (the task says the rest of the old save is not read), so the guideline needs a limb for it either way.

Question for the orchestrator: shall the same change amend `guidelines/coding-saved-game.md` (a second kind of function in the kind: a reader of the programs of an older document, which reads less and ignores the rest) and name it under D-213 in *Foundation entries*, or shall the reader live outside the exemplar file? The first is the smaller change. Either way the spec must say which, and whether the items themselves are read strictly (the items had exactly `id`, `name`, `program` in versions 1 to 5, checked in the git history of `saved-game.ts`; strict items would still skip one by one and would satisfy the guideline for that level).

### 3. (medium) The finishing save before a reset and the quiet period of the saver are not in the task, are not priced, and describe the logout inaccurately

Spec decision 6, "The reset", steps 1 and 2: after the confirmation the saver finishes its saving "as it does before a logout", only the outcome "saved" lets the reset go on, and "from the answer of that save until the outcome of the reset, the saver sends nothing of this game (as for a logout that goes on)".

- The task (point 5, question 5) says the current save moves to the previous slot and the game starts anew; it says nothing of a save first. Programs are saved right after every edit (D-207), so the server's save already holds them; the finishing save only guards the last unsaved minutes of a manual map run. The design method says to leave out every feature the task does not need, and the spec gives no "price if wrong" for this one (the designer's report lists it under "Choices to look at", the spec does not).
- It makes reset impossible whenever the finishing save does not end `saved`: a game over 64 KiB (`too-large`: the very case where a test reset is most useful) and a tab stopped as `outdated` are dead ends; the player must first shrink the game or reload.
- "As for a logout that goes on" is not what the code does. In `src/browser/view/game-saver.ts` the saver after a logout's save only drops the moment asked during that save (`pending = false`) and goes on; the quiet comes from the page (`loggingOut`, `deferred` in `src/browser/view/app.ts`) and from the session ending. A quiet period of the saver is therefore a new state of `GameSaver`, an interface change inside browser-view that the maker would have to invent (the spec leaves it "to the maker").

Question for the orchestrator: keep the finishing save (then give it a price, say what happens for `too-large` and `outdated`, and say that the quiet period is new machinery), or drop it? Dropping is safe on the code: a save from the old game that reaches the server after the reset has a basis other than 0 and gets a conflict, and the old saver is disposed with the old game.

## Lower-grade notes (do not by themselves make the spec fail)

a. **A tab of an older version after a reset bypasses D-210.** D-210's guard compares with the stored current save. After a reset there is none. An older tab (code of version 4) whose save is refused as a conflict loads "no save", builds a game of its own version and saves it on basis 0, accepted with the lower version. Then a reload with the current code refuses it as another version and the first save of the new game moves it into the slot, replacing the document the reset put there. The harm is the programs of the reset document, to the own account of a privileged player, in a rare sequence (an older tab open across a deployment and a reset). The spec does not name it. A cheap closing would be to let the version guard also compare with the slot's version when there is no current save; the orchestrator may also accept it as a price.

b. **Placement constraints of the reset control go beyond what the task delegates.** Task *Context*: "Miejsce przycisku 'Zacznij od zera' na ekranie wybiera cykl według wytycznych wyglądu widoku." Spec decision 6 fixes that it be reachable "from any screen" and "not beside a control that is used at every turn". The second is not tied to a source and is ambiguous (the menu "Konto" holds "Wyloguj", which the spec elsewhere makes unpressable while the reset waits; `guidelines/styleguide-browser-view.md` lists what that menu holds). Neither the designer nor I could check the constraint against the styleguide's whole text. Ask the maker to apply the styleguide and drop the two constraints, or say where each comes from.

c. **Foundation and skill passages that the change makes false and the spec does not list.** D-355 says that "a human's run of `account-block` appends to the same file the JSON lines of the command, those only"; the skill's "Seeing deployments" text (`.claude\skills\loop2-deploy\SKILL.md:265-266` and `:280`) says the `account-block` lines are the only thing that reaches the dump file. The spec has the new command append its event lines to the same file (decision 5), so both become wrong. Add D-355 to the changed decisions and the two passages to the skill edit.

d. **Existing tests that read the schema version as 4.** The spec names only the unknown-version case in `tests\account-storage.test.mjs:185-189`. Others read the current version as 4: `tests\account-storage.test.mjs` (lines 323, 347, 451, 487, 594, 639), `tests\account-backup.test.mjs:281` and `tests\deploy\test_account_backup_stream.py:90` (a Python test of the deployment part). A maker told of one place will meet the rest when the gate fails; the list is cheap to give.

e. **The pull's name rule** ("Las (2) (2)" for a name that already ends in a number in parentheses) is a reading of the task's "dostaje kolejny numer, np. 'Las (2)'" that the task does not fix; the spec states it, which is enough. No contract depends on it.

## What I checked and found sound

- **The reading of the task's point 1** (the handoff's first item). The sentence "zapis, który zastąpił przyjęty zapis wyższej wersji albo reset" is grammatically ambiguous, but the task's own D-210 line ("przyjęcie zapisu wyższej wersji odkłada dotychczasowy jako poprzedni zapis"), point 5 ("bieżący zapis przechodzi na miejsce poprzedniego") and the Need (programs of the replaced save are what is lost) all fix the spec's reading: the stored save that an accepted higher-version save, or the reset, replaces moves to the slot. The other reading (the incoming save is stored as previous) contradicts point 5. The spec states the reading under Constraints. Resolved, no finding.
- **Claims about the code, each verified.** `writeSavedGame` reads blocked, then outdated (`stored.version > save.version`), then conflict, in one `BEGIN IMMEDIATE` transaction (`src\server\database.ts:643-677`). `readAccount` validates every column of `accounts` (`:306-328`), so a new column must be validated there. `mutationGuards` refuses a wrong Origin, a non-JSON or compressed body, an empty body (the `verify` hook) and a non-object or array (`src\server\transport.ts:61-102`); the logout route is the model for an empty-object body (`account-routes.ts:669-673`). The router's `paths` table gives every listed path `no-store`, the 503 of a server without accounts and the transport check (`account-routes.ts:377-388`). Block-command mechanics, exit codes 0 to 4, the `installLastResort` and `writeFailure` use are as the spec says (`account-block.ts`). The page builds the game of a refused load with the stored revision and saves at once (`src\browser\view\app.ts:479-492`, `:419`), so the first save of the new game after a bump is based on the stored revision and is the save that would move the old document (the spec's claim about the first save after a version bump holds). `game.programs` with items `{id, name, program}` existed in versions 1 to 5, and a version 1 program has no `tripPlan` (git history of `saved-game.ts`, commits 2923c3c8, 16f8bee8, bc8eaecd, 41abf1fc); `checkProgram` for any JSON-parsed value throws only `ProgramCheckError` (no accessors, no recursion), so the pull reader can meet the "no value a document can hold makes it throw" rule. `tests\account-storage.test.mjs` treats schema version 5 as the first unknown one.
- **Trust boundary.** The two new routes sit under the existing guards and the session; no field names an account; the 403 for an account without the privilege is returned before the slot is read, with the same code and body whatever the slot holds, and the account answer carries only the account's own flag, so the existence of the previous save leaks nowhere. A blocked account gets 401 on both routes (the session lookup already refuses it, and the reset write rereads the block in its transaction). An unprivileged account cannot move anything: the privilege is read in the reset's transaction. A revoked privilege acts at the next request, as the spec says. The reset's cost for a flooding privileged account is bounded by one small transaction.
- **64 KiB and the move.** The slot copies a row that already passed the 64 KiB byte check, the slot's table carries the same check, and the move is a copy plus the usual write in one transaction that rolls back whole. The step is additive (a column with a default, a new table), edits steps 1 to 4 not, and keeps every row; the deployment consequence (`main` before the change fails health with exit 8 after the first deployment) is stated and matches what the skill says of versions 2 to 4 (`SKILL.md:444-458`).
- **Task fidelity.** Every sentence of points 1 to 6 and of the five settlements appears in the spec as a requirement; the beyond-the-task choices are the ones in findings 1 and 3, in note b, the sentence for a conflict that finds no save (flagged, priced) and the request for the slot each time the Programs screen opens (priced by the rejected alternatives in decision 1).
- **Contract between the parts.** I found no choice left to the maker that changes the contract between the server, the client and the simulation: statuses, codes, field names and bodies are fixed; what the maker still invents (wording, names of methods, the saver's internal quiet state, the shape returned by the reader) stays inside one part, except the reader's output shape, which the view and the simulation share and which decision 4 describes well enough to build from.

## Questions (to the orchestrator)

1. Ratify the spec's change of D-209 (revision continues after a reset; new sentence for a conflict that finds no save) against the task's "Bez zmiany", or order restart at 1? (finding 1)
2. Amend `guidelines/coding-saved-game.md` and D-213 in the same change for a second, lenient reader of an older document, or place the reader elsewhere; and are the items read strictly? (finding 2)
3. Keep the finishing save and the saver's quiet period before a reset (with a price and the handling of `too-large` and `outdated`), or drop them? (finding 3)
4. Take note a (older tab after a reset) as a price, or close it in the spec? (note a)
5. Drop the two placement constraints of the reset control, or give their source? (note b)

## Reach beyond the handoff

- `.the-way/task-cycle/spec/review.md` and `.the-way/task-cycle/spec/design.md` (named by the method; the form the spec must follow).
- `guidelines\styleguide-browser-view.md`: a grep for "Konto", "menu", "potwierdz", "confirm", "destruct" only, to judge note b; not read whole.
- `tests\account-storage.test.mjs`, `tests\account-backup.test.mjs`, `tests\startup.test.mjs`, `tests\deploy\test_account_backup_stream.py`: greps for `user_version` and `saved_games` (note d); not read.
- `.claude\skills\loop2-deploy\SKILL.md` lines 255-464, to check the spec's statements on the skill, the log file and the rollback paragraph (note c and the verified claims); the `.agents` copy not looked at.
- `git log` and `git show` of `src/browser/sim/saved-game.ts` at commits 2923c3c8, 16f8bee8, bc8eaecd, 41abf1fc (grep of `programs`, `tripPlan`, `SAVED_GAME_VERSION`; lines 365-385 of the first).
- `foundations\decisions.md` D-08 heading line only (to find the end of D-07) and the tail of D-213 (lines 4282-4298), which the handoff's "from its heading to the next" required.
- The designer's report (`reports\spec-designer-report.md`), named by the handoff.

## Unread material

- `src\browser\sim\saved-game.ts`: read lines 1-330 and 1170-1365, and a grep of its exports; lines 331-1169 (the readers of characters, map runs, loops, report) not read; they do not bear on programs.
- `src\browser\sim\programs.ts`: read lines 1-560; lines 561-end (copy and switch functions) not read.
- The-way's glossary (`.the-way/foundations/glossary.md`): not consulted; no term of the spec was missing from the product's glossary.
- `guidelines\styleguide-browser-view.md`: not read whole (not in my handoff; see reach).
- Everything else the handoff names was read whole: `part_map.md`, `glossary.md`, decisions D-01, D-02, D-07, D-96, D-104, D-109, D-112, D-114, D-137, D-164, D-165, D-166, D-167, D-169, D-202, D-204 to D-213, D-229, D-353, D-354, D-386; the sixteen invariants; `database.ts`, `account-routes.ts`, `account-block.ts`, `transport.ts`, `account-api.ts`, `view\app.ts`, `view\game-saver.ts`; `guidelines\coding.md` and the four kind files.

## Searches not found or unclear

- No place in the foundation or the guidelines fixes the form of a confirmation step for a destructive act (the designer's search found the same); the spec states what the confirmation must say and leaves the pattern to the maker, which is enough.
- Whether a test compares the `account-server` description in the part map with the files, or whether `foundation_check.py` claims a new `tests\*.test.mjs` file for `account-server` without an explicit entry (the part map lists that part's tests by name): not looked for; the spec's part-map line says the update step claims the new test files, which I take as the plan.
- The wording of the task's point 1 ("zapis, który zastąpił przyjęty zapis wyższej wersji albo reset") is unclear taken alone; resolved from the task's other lines (see "What I checked").
