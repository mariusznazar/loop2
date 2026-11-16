# Classification of the word `owner` (item 7), not committed

Method: every occurrence of the word `owner` / `owner's` / `owners` as a separate word (not part of an
identifier, a path, a flag, a file name or a compound such as `owner-routes`, `asOwner`) in every file
git tracks except `.the-way/`, found by `.runs/author/list_owner2.py` (before: 870 occurrences, after: 694).
Each occurrence was classified by hand from its context; the script's R/? tag is only a first sort.

## (a) The person who runs the server: changed to `operator` (176 occurrences, 151 lines)

| Place | Lines | Occurrences |
|---|---|---|
| `foundations/decisions.md` | 53 | 73 |
| `.claude/skills/loop2-deploy/SKILL.md` and its twin | 4 + 4 | 4 + 4 |
| `.claude/skills/loop2-deploy/references/backup_and_restore.md` and its twin | 18 + 18 | 18 + 18 |
| `.claude/skills/loop2-deploy/references/setup_and_secrets.md` and its twin | 6 + 6 | 6 + 6 |
| `.github/workflows/check-address.yml` (comment) | 1 | 1 |
| `deploy/loop2-watch` (comments) | 2 | 2 |
| `scripts/restore-trial.mjs` (comments) | 3 | 3 |
| `src/server/account-backup.ts`, `account-block.ts`, `account-previous-save.ts`, `database.ts` (comments) | 4 | 4 |
| `tests/account-storage.test.mjs` (six test titles "the owner's command ...") | 6 | 6 |
| `tests/**` lines `decision:` that quote a changed decision (D-13, D-233, D-234, D-356) | 26 | 26 |

## (b) Kept as it is

- the role: `owner role`, `owner panel`, `"role":"owner"`, `made owner`, `blocked owner`, `acting owner`,
  `the account of the owner who acted` (decisions lines 6266, 6283, 6309 second occurrence), `an owner`
  as the holder of the role, routes `/api/owner/...`, error codes `owner-forbidden`, `owner-not-blockable`;
  421 occurrences tagged R by the script were all read, those that were the person were taken out (see (a));
- identifiers: variables named `owner` in `src/browser/sim/*`, `src/browser/view/app.ts`, `program-panel.tsx`,
  `end-question.tsx`, `game-view.ts`, `screen-address.ts`, `saved-game.ts` (the owner of a program, a character
  or an account) and in tests (`const owner = ...`, `asOwner`, `file_owners`, e-mail address `owner@example.test`);
- Unix owner of a file or a directory: `owner root, group 1000`, `owner uid 1000`, `readable by its owner alone`,
  `the file's owner, group and mode`, `file may get root as its owner`, `with the owner of the deployment account`
  (D-355 lines 9916, 9926, and the same words in `backup_and_restore.md` 122, 477, 507, 529, 534,
  `setup_and_secrets.md` 13, 43, 46 second occurrence, 111, 121, 219, 261, 347, 520, `troubleshooting.md` 62, 75);
- the repository's owner on GitHub: `AGENTS.md:32`, `foundations/decisions.md:10937`;
- the glossary entry `owner` itself, the part-map and testing-guidelines lines that speak of the role;
- quotations: decisions in the `decision:` lines of tests were changed only where they quote a changed decision.

## Doubtful, kept unchanged (named in the report)

1. `foundations/decisions.md:256` "its owner's game" (D-07, the player's own saved game).
2. `foundations/decisions.md:4716` "real for its owner" (D-210, owner of the game under test or of the save).
3. `foundations/decisions.md:4859` "leaving the owner no trace" (D-213, the player whose save is overwritten).
4. `foundations/decisions.md:5128` "the account's owner" (D-222, the person whose address gets the mail).
5. `foundations/decisions.md:10579` "until its owner closes it" (a process or a resource).
6. `.claude/skills/loop2-play/SKILL.md:172` "The owner accepts a request by seeing the screen" and `:186`
   "the owner's `gh` account" (and the twin in `.agents/`); the same words in the withdrawn row of D-358
   (`foundations/decisions.md:10981`): the GitHub account of the repository's owner, kept.
7. `.claude/skills/loop2-deploy/references/backup_and_restore.md:268` "has the owner of such an account reset it again"
   (the holder of an account, not the person who runs the server).
8. `.github/workflows/check-address.yml:13` the input `description` "to test that the failure reaches the owner":
   shown by GitHub, not a comment; left.
9. `foundations/part_map.md:89`, `:156` "the owner's computer", "telling the owner": a part description, outside
   the places item 7 names; left.
10. `tests/sim/skills.test.mjs:637` "its owner's run" (the character that owns the tree).
11. Comments in `tests/**` that use the word for the person (about 40, e.g. `account-storage.test.mjs:1219`,
    `deploy/test_loop2_backup.py:17`): item 7 names the titles of tests, not their comments; left.
