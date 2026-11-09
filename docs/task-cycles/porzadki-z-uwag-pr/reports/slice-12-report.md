# Report - Slice 12 (executor, `make-change`)

**Status:** done (with the concerns and questions listed below, none blocking)

## Commits

One commit on `task/porzadki-z-uwag-pr` from base `2e884d1` (hash in the return message). Files changed, each `.claude/skills/...` and its twin in `.agents/skills/...` byte for byte alike (`cmp` said same for all four pairs):

| File (twin identical) | added | removed |
|---|---|---|
| `loop2-deploy/SKILL.md` | 14 | 8 |
| `loop2-deploy/references/setup_and_secrets.md` | 57 | 15 |
| `loop2-deploy/references/troubleshooting.md` | 5 | 5 |
| `loop2-play/SKILL.md` | 2 | 1 |

(The numbers are per copy, taken before the final reflow of one paragraph of `setup_and_secrets.md`; within two lines.)

## What was done, by item

- **22** The mail's steps are now M1-M4 (`setup_and_secrets.md` "The SMTP password"; the text says why), the saved-game steps S1 (first deployment of the branch) and S2 (redeployment of the same commit), defined in the paragraph under "Deploying a request head and accepting it". References followed: `SKILL.md` (S2, M1/M2, M4, M4, S1) and `troubleshooting.md` (M4 twice in the table, M4 and S1 in "Rollback and the accounts"). The tunnel's H1-H5 and every reference to them stayed (`setup_and_secrets.md` the tunnel section, "see H2", "as in H2", "first H3"; `troubleshooting.md` "Abandoning the request during H1-H5"; `backup_and_restore.md:324`), and so did the backup's "H2" in `tests/invariants/test_account_save_backup_encrypted.py`.
- **23** The sentence now says the game saves its state itself after each change the player makes (D-207), there is no button for the game state, and „Zapisz w programie”, „Zapisz jako nowy program” and „Zapisz” keep a program. Read against `src/browser/view/program-panel.tsx:575,585,618` (all three act on a program or its name).
- **24** `loop2-play/SKILL.md` line 35 (127 characters) wrapped at 99 characters; no word changed.
- **26** New paragraph "A measurement that was interrupted" in the measuring section: why a container can be left (removal only in the `finally` step), how the human lists it (`docker ps --all --filter name=loop2-password-measure --format ...`) and removes it (`docker rm --force <name>`), not to remove a measurement still running in another shell; the agent runs neither.
- **27** "for a few seconds" became "for a dozen or so seconds on the server".
- **28** Rewritten from the Docker excerpts of the handoff (`reports/05-docker-docs-excerpts.md`), cited in the text with date 2026-11-09 and tags `docker/cli` `v27.3.1` and `docker/compose` `v2.29.7`; the Engine version on the server is stated as recorded nowhere, and the text says another version may document otherwise. Result: `docker compose down` leaves the volume; `docker compose down -v`/`--volumes` removes the declared named volumes (`compose.yaml` declares `accounts` with `name: loop2_accounts`, not external); `docker volume prune` without `--all` removes anonymous volumes only, with `--all` also unused named ones; `docker system prune --volumes` prunes anonymous volumes only. So of the three commands the old text named, two do not remove `loop2_accounts` as documented, and the ones that do are `down -v` and `volume prune --all`.
- **29** `SKILL.md` "What it prints": wrong arguments print the usage line and under it `Nothing changed.` (`src/server/account-block.ts:39-40`); the usage text is quoted from the source line `:20-21`.
- **30** `unblock`: the emailed links the block stopped (confirmation and reset) stay stopped; the player asks for a new one, for the confirmation with „Wyślij ponownie” (D-137, D-160). The reset-side name of the button was not looked up; the text says only "asks for a new one" for it.
- **31** Block that writes the mail password: the `stat` line no longer follows the block; it is a separate second code block, introduced as "a second paste, made after the password has been typed", and the paragraph above tells to paste the block alone and why.

## Checks (command and exit code)

- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`: exit 0, 5 tests OK (run twice, the second after the last edit).
- `npm test -- tests/agent_workflow/test_loop2_play_skill.py`: exit 0, 8 tests OK (same).
- No test was written (prose; `make-change` section 2), so there is no failing run. The product's gate and `foundation_check.py` were not run (slice rule); they stay unchecked.

### Item 31, old and new block fed to `bash` through standard input

Method: the block text taken from the base (`git show HEAD:...`) and from the working file, `/etc/loop2` replaced by a temporary directory under the scratchpad (`.../scratchpad/t31/wk/<case>`, deleted afterwards; nothing left in `/etc` or `/tmp`), fed once with `bash < input`. A test password string `typed-test-password-not-real` stands for what the human types. Old: block (with its `stat` line) + the typed line. New: block + the typed line + the `stat` line (the second paste). The run is Git Bash on Windows, not root; `chown root:1000` fails there (`chown: invalid user: 'root:1000'`), so each case was run twice: plain, and with a stub `chown` that exits 0 so the later steps can be seen.

| Case | Exit | What the password became | Where it stopped |
|---|---|---|---|
| old, plain | 127 | not reached (file never moved) | at `chown root:1000` (invalid user), the `mv` never ran; the typed line then ran as a command: `typed-test-password-not-real: command not found` |
| old, chown stubbed | 127 | the file `smtp-password` held `stat -c '%U %g %a' "$f"` (the next pasted line) | whole block ran; the typed line ran as a command (`command not found`) |
| new, plain | 1 | not reached | at `chown root:1000`; then `stat` found no file |
| new, chown stubbed | 0 | the file held `typed-test-password-not-real` (the typed line) | whole block ran; `stat` printed owner, group and mode of the file (the mode read 444 here only because Windows ignores `chmod`) |

The old block reproduces the finding: the password is the next pasted line, no error, and the later typed password is executed as a command. The new block does not. Without root, both stop at `chown`, before the move, so no file at the final path.

## Own-work check

Requirement most likely not met: item 28, that the text names as removing the volume only what the documentation says removes it, without a claim beyond the two tags. Check: reread the new text against the excerpts line by line. `compose down` default and `-v` (excerpt: "Remove named volumes declared in the "volumes" section"), `volume prune` "By default, it only removes anonymous volumes" and `--all`, `system prune --volumes` "Prune anonymous volumes". Shown: all three bullets rest on a quoted line; the one inference is that `loop2_accounts` counts as "named" and "declared in the Compose file, not external", checked in `compose.yaml:65-67`. Second candidate: a reference to a renamed step missed; check: `grep -nE '\b(H[1-5]|M[1-4]|S[12])\b'` over both skill directories; every remaining H1-H5 is the tunnel's or the backup's (listed in item 22). Trust boundary: the slice touches no product code; the only crafted input considered is the password prompt (item 31, tested above).

## Reaches beyond the handoff

- `SKILL.md` "Database" bullet (was "a prune removes the accounts...") and `troubleshooting.md` "Rolling back to a commit without accounts" (was "the state a volume prune would clear; run none"): both claimed a prune removes the volume, which contradicts the new item 28 text, so I changed them to `docker volume prune --all`. Why: otherwise the skill would say two things. They stay prohibitions.
- Read `src/browser/view/program-panel.tsx:575-620` beyond the listed 540-580 to see the third button „Zapisz” (`:618`).
- Read `scripts/measure-passwords.mjs:31` (`RUN_TIMEOUT_MS`) only to be sure no `--rm` is used. None: the container is removed only in `finally`.

## Adaptations of the plan to the code

- The line numbers of the plan are off by up to a few lines (Slice 11 and the foundation step moved text); I worked from the text, not the numbers. `setup_and_secrets.md` measuring section was already changed by Slice 11 (docker step wording); I left it and only changed the load sentence and added the new paragraph.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Names M1-M4 (mail) and S1, S2 (saved game) | descriptive names such as "mail-panel step"; renumbering to 1-4 plain | a later reader may take "M4" for something else; defined once at the first use of each family |
| Item 31 fixed by moving `stat` out of the block into its own block | a `read < /dev/tty` in the block, or the check written first; both change the command | a human who pastes both blocks together gets the old failure again; the paragraph above the block warns against it |
| Item 28 states only what the two cited tags document, with a sentence that other versions may differ | stating the older behaviour of `system prune --volumes` from memory | the server's Engine could differ; the text tells the human to read the documentation of the version `docker version` gives |
| Item 26 gives two commands for the human; no change to the launcher | a signal handler in the launcher (plan's Choices) | a killed terminal leaves the container, which is exactly what the paragraph handles |

## Questions for the orchestrator

1. The password-reset side of item 30: the text says only "asks for a new one" for the reset link. Recommended: leave, unless the reset request screen's wording is wanted; I did not look up the button of the reset form.
2. Item 28 was asked to cite "its commit or date in the report": done in the text and here: tags `docker/cli` `v27.3.1`, `docker/compose` `v2.29.7`, fetched 2026-11-09 by the orchestrator. The Engine version on the server is unknown (recommended: the human records it as an environment fact if it matters).
3. The other task (`zadanie_skad_wiem_o_awarii_loop2`) will also change the blocking section of `SKILL.md`; the two edits here are in "What it prints" and `unblock`, a merge conflict is possible at those lines.

## Searches not found or unclear

- The docs excerpts say nothing on `docker volume rm`, which also removes the volume; not mentioned in the skill, since the handoff allows only the documented commands. Not found there.
- The Docker Engine version on the test server: recorded nowhere (as the handoff says).
- The name of the button that asks for a new password-reset message: not looked up.
