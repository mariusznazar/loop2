# Report of the revision of the spec

- Status: `done`
- Spec revised in place: `docs/task-cycles/programy-ze-starych-zapisow\spec.md` (the reviewed copy is `spec-reviewed.md`, untouched)
- No tracked file changed; no test or other check run.
- Questions: none.

## What changed, per ruling

1. **D-209 unchanged.** Removed from decision 2 the rule that the revision continues from the previous slot; removed the invariant about it, the extra sentence for a conflict that finds no save (decision 6) and D-209 from the changed decisions (it is now named as a constraint and in the non-goals, with D-213). Decision 2 now says: after a reset a save based on 0 is accepted and gets revision 1; a card with another basis gets the refusal as today and D-209's path and sentence. Named as prices: (1) a card whose basis equals a revision the new game has reached is accepted over the new game (needs equal numbers; the privileged player's own account; the new game is lost, never the previous save); (2) a card with basis 0 is accepted after a reset, as today before a first save; (3) D-209's sentence is imprecise for a card that finds no save after another card's reset. The continuation of the revision stays as a rejected way, with its reason (it changes D-209, adds a coupling, needs a sentence).
2. **Reader outside the exemplar.** Decision 4 now puts the reader in a new file `src/browser/sim/previous-programs.ts`, kind guideline `guidelines/coding-simulation-module.md`; `saved-game.ts`, `loadSavedGame`, D-213 and `guidelines/coding-saved-game.md` unchanged. Items are strict: each must be a plain object with exactly the own data keys `id`, `name`, `program`, a name that is a text non-empty after trimming, and a program the editor's check (`checkProgram(content, null)`) accepts; otherwise skipped and named one by one. Nothing outside `version`, `game.programs` and the items is read; the value of `id` is not used. The file has its own small checks and needs nothing exported from `saved-game.ts`. It is stated to be a new place where network input is read: the part map's *Trust boundary* of `simulation` gains it, and crafted documents are its test's subject. The append with numbering stays in `programs.ts` (stated, with the reason: it uses the naming functions there). Units, Foundation entries, Left to the maker updated; `coding-simulation-module.md` gains the file in its table.
3. **Finishing save and quiet period dropped.** Decision 6 now: no save before the reset; the page sends the reset; on 204 it drops the old game with its saver and builds a new game at revision 0 with a new saver; on failure the saving goes on. Claims "as for a logout" removed. Price named: the last moments not yet saved (a manual map run in progress, a save in flight) are not in the previous save; a save of the old game landing after the reset has a basis other than 0 and gets the conflict. Reading to look at: the ruling says "the page stops sending saves of this game"; to avoid a new state of `GameSaver` (the reviewer's point), the spec binds only the behaviour: the page holds the old saver's outcomes (conflict, outdated, signed out) during the request, as `app.ts` already holds them while a logout is under way (`loggingOut`, `deferred`), acts on them only if the reset fails, and drops them on 204; the saver itself may keep sending, and such a save gets the conflict. `game-saver.ts` is not changed.
4. **Older tab after a reset** named as price 4 of decision 2 with its sequence and harm; D-210 not changed apart from the move.
5. **Placement.** Both constraints dropped (reachable from any screen; not beside a control used at every turn). The spec states only: the control exists only for an account whose answer says `previousSaveAllowed`, is in the game, is behind the confirmation (the opening click changes nothing); the maker places it by the styleguide.
6. **Reviewer's notes c and d.** D-355 added to the changed decisions. The skill edit now names the two passages (`SKILL.md` lines 265-266 and 280) and keeps the `.agents` copy byte-identical. The tests that read the schema version as 4 are listed in decision 7 after verifying each in the code: `tests/account-storage.test.mjs` 185-189 (first unknown version becomes 6), 323, 347, 451, 487, 594, 639, and, found by me and not in the reviewer's list, 1289-1290 (the assertion "no schema step is added", which the change makes false), with titles/comments saying "version 4" at lines 318, 320, 444, 587; `tests/account-backup.test.mjs:281`; `tests/deploy/test_account_backup_stream.py:90`. Lines 215, 365, 508, 674, 705 and `tests/startup.test.mjs` (99) read other versions and stay. Also added to the skill edit: the account-related schema lines of `SKILL.md` around 249 and 453.
7. **Mentions elsewhere removed or adjusted:** the revision invariant and the D-209 foundation entry; "finishing save" and "quiet period" from Units, Left to the maker and Goals (non-goals now say so); the saver from the view units; `saved-game.ts` from the units and from the trust-boundary constraint sentence of the reader (the constraint now says the discipline is the spec's own, not D-213's).

## Points the orchestrator may want to look at

- The simulation-module kind guideline says it covers modules "poza ... plikiem zapisu gry"; the saved-game kind's "When to read" speaks of files that turn a document fetched from the server "na stan gry lub odmowę". The new reader produces programs, not a game state or a refusal, so I placed it in the first kind; a reviewer reading "document fetched from the server" broadly could place it in the second. If so, the guideline of the saved-game kind would need the limb the reviewer's finding 2 described.
- The stored `name` is required to be non-empty after trimming, not already trimmed; a document the game wrote always holds a trimmed name, so the difference is only for crafted input.

## Reach beyond this handoff

- `foundations/decisions.md` D-355 (whole), for ruling 6.
- `guidelines/coding-simulation-module.md` (whole), the kind guideline of the new file.
- `.claude/skills/loop2-deploy/SKILL.md` lines 262-268 and a grep of "version 4"; `tests/account-storage.test.mjs` (greps and lines 1283-1293), `tests/account-backup.test.mjs` 276-283, `tests/deploy/test_account_backup_stream.py` 84-92, and a grep of `user_version` over `tests/`.

## Unread material

- The handoff and the reviewer's report: read whole.
- `.agents/skills/loop2-deploy/SKILL.md`: not opened; its blob id equals the `.claude` copy's (`git ls-files -s`), so the same lines apply.
- Test files: read only at the lines named above; the rest of each file not read.
- Everything the first handoff named keeps the reading status of the first report (`reports/spec-designer-report.md`).

## Searches not found or unclear

none
