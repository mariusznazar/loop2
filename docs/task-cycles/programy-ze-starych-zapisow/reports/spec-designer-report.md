# Report of the designer of the spec

- Status: `done`
- Spec: `docs/task-cycles/programy-ze-starych-zapisow\spec.md`
- Check line: a spec designer runs no test and no other check; none was run.
- Tracked files changed: none. Written: the spec and this report, under `docs/task-cycles/programy-ze-starych-zapisow/`.

## Questions sent and their answers

None. Every choice the handoff lists as open had a smallest reversible reading that the task and the foundation allow; those that the orchestrator may want to look at are named under "Choices to look at".

## Restatement and assumptions

The task requires: one previous save per account for every account; a privilege flag set by an operator command; a pull button (privileged account, previous save present) that appends programs with numbered names and skips and names what today's game does not admit; a reset button (privileged) that moves the current save to the previous slot and starts anew; the skill describing the command.

Assumption that changes no design but was a reading: the task's point 1 sentence "zapis, który zastąpił przyjęty zapis wyższej wersji albo reset" is grammatically ambiguous. I read it as the stored save that is replaced by an accepted higher-version save, or by the reset, moves to the previous slot. Evidence: the task's own line under D-210 ("przyjęcie zapisu wyższej wersji odkłada dotychczasowy jako poprzedni zapis"), point 5 ("bieżący zapis przechodzi na miejsce poprzedniego zapisu") and the handoff's item 3. The spec states it under Constraints.

## Ways weighed, by the open items of the handoff

1. HTTP contract. Chosen: `GET /api/previous-saved-game` (200 with `previous` null or `{version, game}`; 401 no session; 403 `previous-save-forbidden` for an account without the privilege, whatever the slot holds), `POST /api/saved-game-reset` (empty object body, guards of D-104 at 16 KiB, 204, 401, 403), and a boolean `previousSaveAllowed` in the account answer. Rejected: a mode of `GET /api/saved-game` plus `DELETE` (the load route would serve another document; `DELETE` outside the guards); one status route for all accounts; privilege learnt from a failing request (the task forbids); 404 or empty success for a non-privileged account (a 404 reads as a missing route, D-05/D-204; one refusal for both routes is simpler); existence of the slot as a second boolean of the account answer (stale at once).
2. Storage and revision. Chosen: schema step 5 (flag column on `accounts`, a table of previous saves with the 64 KiB byte check), all moves inside the transaction of the save write or the reset write; the revision after a reset continues from the previous slot's revision. Rejected: restart at 1 (a stale card whose basis equals the new revision would overwrite the new game, and it breaks "one higher than the one before"); a counter column; columns on the `saved_games` row (the reset deletes it); a history table.
3. What moves. Chosen: only an accepted save of a higher version over a stored lower one, and the reset with a current save. Nothing moves on equal version, refused saves, first save, block, grant/revoke.
4. Browser reading. Chosen: a new exported function in `saved-game.ts` reading only `version`, `game.programs` and each item's `name` and `program`; each program through `checkProgram(content, null)` (the editor's check); `ProgramCheckError` skips the item, any other error propagates; versions from 1 to the current are read, a version above the current or an unreadable envelope gives no programs and one sentence; names numbered "Las (2)", "Las (3)" if taken; skipped named by name or by place. Rejected: a lenient `loadSavedGame` (a migration, against D-213); applying the strict `matches` comparison (it would skip programs only for extra keys).
5. Operator command. Chosen: `src/server/account-previous-save.ts` with `grant|revoke <email>`, the mechanics, exit codes and log shape of `account-block.ts`, events `account-previous-save-granted/-revoked`, no session ended; both byte-identical copies of the skill and `troubleshooting.md` updated. Rejected: one command for block and privilege.
6. Browser states. Bound only by what the place must satisfy and by the order of the reset (finishing save, quiet saver, request, new game). Added: a sentence of its own for a card that conflicts and finds no save, because D-209's sentence would speak of a save that does not exist.

## Choices to look at (made by me; reversible)

- Revision continues after a reset (decision 2). This adds a rule to D-209's neighbourhood and a coupling between the slot's revision and the next save's revision.
- A reset names no basis; it is preceded by the saver's finishing save and, if that does not end "saved", does not go on.
- A document of a version above the current one is "unreadable" for the pull (conservative).
- The reset's confirmation must say that a previous save already there is replaced: pressing reset before pulling destroys the older previous save's programs, which is the task's own settlement (answers 1 and 5) but is the sharpest cost of the change.
- Schema version 5 and `SAVED_GAME_VERSION` 5 coincide; the spec says so to avoid confusion.

## Result of the four checks

1. Placeholder, TBD, empty section: none found; the wording of sentences, the place of the reset control and the names of methods are listed under "Left to the maker" as that, not as gaps.
2. Contradictions: one found and fixed (the sentence about when the previous slot holds the highest revision, which first ignored that the slot is also written by the version move). The spec does not contradict the task or the foundation except where it states a change to a decision (D-206, D-104, D-109, D-112, D-209, D-210, D-167, D-169, D-354), each listed under Foundation entries.
3. Scope: the change is one task of estimate 5 as the task fixed, but it spans five units that could be separate changes (schema and routes; the operator command and skill; the reader and append in the simulation; the pull in the view; the reset in the view and the saver). They share the privilege and the slot, so they are not independent; I did not split it. The orchestrator may choose to plan it as slices.
4. Ambiguous requirements: the task's point 1 (resolved above); "dostępny w dowolnej chwili" read as available whenever the Programs screen is shown, a manual map run waiting or going on included; "gra nie odzyska programów z zapisów zastąpionych przed wdrożeniem" is consistent with the slot starting empty.

## Reach beyond the handoff

- `.the-way/task-cycle/spec/design.md` (named by the method's step 2).
- `src/server/transport.ts` lines 61-102 (`mutationGuards`), to confirm that arrays and empty bodies are refused by the guards.
- `.claude/skills/loop2-deploy/SKILL.md` lines 255-463 and `.claude/skills/loop2-deploy/references/troubleshooting.md` lines 105-135, to see how the block command and schema versions are described; `.agents/skills/loop2-deploy/SKILL.md` compared by `diff` and blob id only (identical).
- `tests/agent_workflow/test_loop2_deploy_skill.py` (first 140 lines, by grep) and `tests/account-storage.test.mjs` (lines 175-200 and a grep of its titles), to see what the skill test and the schema tests assume.
- `src/browser/view/program-list.tsx` lines 1-80 and a grep of `src/browser/view/game-view.ts`, to name the units of the view.
- `git log` and `git show` of `src/browser/sim/saved-game.ts` at the commits that changed `SAVED_GAME_VERSION`, to confirm that `game.programs` items were `{id, name, program}` in every version and that version 1 programs lack a trip plan.
- `guidelines/styleguide-browser-view.md`: its head and a grep for confirmation wording only; the file is the author's.
- `foundations/decisions.md` D-02 read to its end after first stopping short (now whole).

## Unread material

- `src/browser/sim/saved-game.ts`: read whole lines 1-300, 440-540 and 1170-1360 (the version, the helpers, programs and the load); lines 300-440 and 540-1170 (the readers of characters, map runs, loops, report) not read; they do not bear on the programs.
- `guidelines/styleguide-browser-view.md`: not read whole (the handoff gave it to the author of the change).
- Everything else the handoff names was read whole: the part map, the glossary, all listed decisions and invariants, `database.ts`, `account-routes.ts`, `account-block.ts`, `account-api.ts`, `app.ts`, `game-saver.ts`, `programs.ts`, `guidelines/coding.md` and the four kind files. The-way's glossary was not consulted: no term of the spec needed it.

## Searches not found or unclear

- A place in the foundation or the guidelines that fixes the form of a confirmation step for a destructive act in the view: a grep of the styleguide for "potwierdz"/"confirm" found only the account-menu sentences about the email address; the pattern for the reset's confirmation is not in what I read, so the spec states the content the confirmation must hold and leaves the pattern to the author and the styleguide.
- Whether a test compares the `account-server` description in the part map with the files: not looked for.
