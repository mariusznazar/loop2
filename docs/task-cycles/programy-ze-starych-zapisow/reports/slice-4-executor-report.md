# Slice 4 — executor report

**Status:** done with concerns (see Questions 1 and 2)

**Commit:** `b3db0acf` on `task/programy-ze-starych-zapisow` (base `d946a58b`), message `docs: :memo: describe the previous-save command and schema version 5 in the loop2-deploy skill`. Worktree clean after the commit.

**Check line:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0 (5 tests OK); `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` exit 0, no output. Not run by me: the product gate (`npm test` without a file) and `foundation_check.py`, both left to the orchestrator as the handoff says.

## Files changed

Each file is changed in both copies, byte-identical (83 added and 5 removed lines in each `SKILL.md`; 19 added and 12 removed in each `references/troubleshooting.md`):

- `.claude\skills\loop2-deploy\SKILL.md`
- `.agents\skills\loop2-deploy\SKILL.md`
- `.claude\skills\loop2-deploy\references\troubleshooting.md`
- `.agents\skills\loop2-deploy\references\troubleshooting.md`

What changed, in `SKILL.md`:
- Account mail (around lines 247-249): the first deployment of the commit with previous saves moves the database to version 5.
- "The failure record and alerts": the `account-block` lines passage (lines 265-266) and the "human's `account-block` lines" passage (line 280) now name `account-previous-save` lines too.
- New section "The previous-save privilege" after "Blocking a player account" and before "Rollback": only the human runs it; the plain `docker exec` commands for `grant` and `revoke`; the bash block that keeps the event lines in `/var/log/loop2-app.log` with tag `account-previous-save`; what grant and revoke do and do not do; what it prints and exit codes 0 to 4; what it touches.
- Rollback: one sentence in "A rollback changes code, never data" saying the current code writes version 5, and a new paragraph after the version 4 paragraph: the first deployment of the commit with previous saves (including a trial deployment of the branch) moves the database to version 5; code that knows only version 4 or older refuses it (exit 8).

What changed, in `troubleshooting.md`, "A database newer than the code": current code writes version 5; version 5 adds the privilege flag and the table of previous saves; the first-start migration goes to version 5 and leaves every existing account's privilege off; a new paragraph on the first deployment of the change with previous saves, with the same consequences as versions 2 to 4; "no step back from version 5 to version 4"; in "Saved game states in a rollback", version 5 and a sentence that previous saves stay in the volume.

## Own-work check

- **Requirement most likely unmet:** the new bash filter must let through exactly the command's event and failure lines and nothing else. An unmet form would mean the human's appended file gets a sentence, a crash line or a truncated line.
- **Check:** `bash` script in the scratchpad, `the cycle's scratch directory/filter-check.sh`, run with a fake `docker` that prints a granted event line, a sentence, a `account-previous-save` failure line, an `uncaught` failure line and a truncated `{"event":"account-x"`. Exit 0.
- **Showed:** the appended file got exactly the event line and the failure line, each with a UTC time and the tag. The sentence, the `uncaught` line and the truncated line did not pass.
- **Statements checked against the code:**
  - usage line, exit codes 0 to 4, the sentences, the event names `account-previous-save-granted` and `-revoked`, and the failure name `account-previous-save`: `src/server/account-previous-save.ts:21-95`.
  - grant and revoke change only the account's flag, no session or link: `src/server/database.ts:772-792`. The previous save is not touched there either.
  - the 403 `previous-save-forbidden` for the fetch and the reset: `src/server/account-routes.ts:556-557` and `:596-597`.
  - version 5 as step 5 (column `previous_save_allowed` default 0, table `previous_saves`): `src/server/database.ts:146-157`; the current version 5 per D-112.
  - "a page already open keeps the flag until it reloads; the server decides at each request": from D-394 and the spec's section 5 as copied in the handoff. I did not re-read `sessionAccount` to confirm the per-request read.
- **Failed then passed, both runs:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 1 with `test_description_is_short_and_yaml_safe` (`444 not less than 400`), after I had added "granting or revoking the previous-save privilege" to the frontmatter description. I reverted that addition; rerun exit 0, 5 tests OK.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/slice.md` read whole (it was named by the method's slice variant, which I had not read yet). Its rule on mismatches: no mismatch in this slice; the plan's line ranges and the code names matched.
- `.the-way/task-cycle/change/SKILL.md` read whole (method).
- `src/server/log-line.ts` read whole: the JSON line shapes (`writeEvent`, `writeFailure`), which the filter depends on.
- `src/server/database.ts` lines 120-210 and 740-792, and `src/server/account-routes.ts` lines 547-600: to verify the version 5 step, the privilege write and the route answers.
- `references/setup_and_secrets.md` lines 289 and 325-345: read only to see what it says about schema versions (not edited, see Questions).
- `the author's rule file on git` and `scripts.md`: the user's rules that the hook asked me to read before the commit and before writing the filter script. The first commit attempt was blocked by the hook to deliver the rules; I reran the same commit.
- Foundation entries read whole: D-112 (`foundations/decisions.md:2177-2191`), D-137 (`:2870-2889`), D-354 (`:8945-8970`), D-355 (`:8971-8985`), D-394 (`:9650-9664`).

## Unread material

- `docs/task-cycles/programy-ze-starych-zapisow/spec.md` (lines 30-41, 138-147) and `plan.md`: I read the copies in the handoff, not the files themselves.
- `project-level/technology/reserved_choices.md`: not read. No technology choice came up, so section 5 of the method did not apply.
- `references/backup_and_restore.md`: not read; not in this slice's list.
- `tests/agent_workflow/test_loop2_deploy_skill.py`, `src/server/account-block.ts`, `src/server/account-previous-save.ts`, `.claude/skills/loop2-deploy/SKILL.md` and `references/troubleshooting.md` (before the edit): read whole.

## Searches not found or unclear

- none. Note: the hook `rules-on-demand` blocked my first commit attempt once to show me `git.md`; the rule's content did not change the commit.

## Choices made

- **Description of the skill not changed.** I first added the command to the frontmatter description, which the test caps at 400 characters (it reached 444). Rejected: a shorter wording, since the handoff does not ask for a change of the description. Cost if wrong: an agent asking about granting the privilege may not select this skill from its description; the body covers the command.
- **Filter kept in the block's shape.** The new bash block mirrors the block command's, with the two starts `'{"event":"account-'` and `'{"failure":"account-previous-save"'`. Rejected: a generic filter on every failure line, which would let the `uncaught` line through (the block's filter does not allow it). Cost if wrong: none found in the check above.
- **Sentences described, not quoted.** The new section describes the command's sentences in prose rather than quoting them, except the usage line, which is quoted in full as the block section does. Cost if wrong: a later change of the sentence in the code would need the skill's prose checked, not its quote.
- **Version 5 paragraph placed after the version 4 paragraph** in `SKILL.md`, not replacing it, since the version 4 paragraph's facts stay true.

## Problems observed

- `references/setup_and_secrets.md` lines 325-336 (the human's procedure "Deploying a request head and accepting it") describes the window for the version 4 deployment (S1): merge nothing else to `main` until the branch is merged. It has no matching window for version 5. The handoff said the other two references stay as they are, so I did not edit it.
- The skill's frontmatter description does not name the new command (see Choices).

## Questions

1. **Should `references/setup_and_secrets.md` get a matching step for the version 5 deployment (the "merge nothing else" window and the previous-save commit in the human's procedure), in this change or in a later slice?**
   - Recommended answer: yes, a short paragraph in the same place as the version 4 one, in a slice of its own or added to this change, because a human who follows that procedure would otherwise miss the window for version 5.
2. **Should the skill description name the previous-save command, with the description shortened to fit 400 characters?**
   - Recommended answer: leave it as it is; the command is found through the body, and a shorter description is a separate choice of wording for the human.
