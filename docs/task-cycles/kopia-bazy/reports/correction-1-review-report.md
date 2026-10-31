PASS db739297d05da0733f8aebcad3b1abbcc1edd899

# Review of correction 1, task kopia-bazy

Range `fa7eedb..db73929`, two commits: `4154191` (launcher and test) and `db73929` (the reference, both copies). "The reference" means `.claude/skills/loop2-deploy/references/backup_and_restore.md`; its copy in `.agents/` is byte-identical.

Both of the human's remarks are made. No blocking finding. Two Minor notes.

## Each remark

The human's decision, „oba tak jak rekomendujesz”, binds two things (`reports/correction-1-handoff.md:5–8`).

### 1. I2, make `previous` at step 1 — made

The reference, line 245, holds the bound command word for word: `mkdir -m 0700 /root/loop2-restore /root/loop2-restore/previous`. Line 252 says the files go there "(made in step 1)".

The executor's walk ran on Windows, where the mode does not apply, so this was repeated as root in throwaway `node:24-slim` containers, with a tmpfs as the volume, so that `mv` also crossed filesystems as it may on the server:

| Walk | Result |
|---|---|
| Step 1 | exit 0; both are directories, mode 700, owner root |
| Step 4, three files, one `mv` each, the case that destroyed data before | each exit 0; `previous` holds all three, each with its own content; the volume holds none |
| Step 4, one file by a glob, the clean stop | exit 0; `previous` stays a directory, with the file inside it |
| Step 5 | `install -o 1000 -g 1000` gives 1000:1000 |
| The way back, the three moved to the volume | exit 0; each file's content is back, owner 1000:1000 |
| Step 1 again, with the directory left | `mkdir` exit 1, "File exists"; what `previous` held stays |

The finding's first row, which left `previous` holding only `shm`, no longer happens. The way back's words now fit, too.

### 2. I5, way (a), every leading mark — made

`scripts/restore-trial.mjs:154` uses `/^\u{feff}+/u`, and the sentence "This form needs no special console" stands unchanged at the reference's line 215. It is now true in every case measured. Bytes from real PowerShell 5.1 pipes under `-NoProfile`, read as the launcher reads them, through the head's `cleanPassword`:

| Console | `$OutputEncoding` | Bytes in | Equals the password |
|---|---|---|---|
| 65001 | default | 17 | yes |
| 65001 | `[Text.Encoding]::UTF8` | 20 | **yes**, the case that remained |
| 852 | default | 14 | yes |
| 852 | `[Text.Encoding]::UTF8` | 17 | yes |

On crafted text: two marks give `<mark>x` on the base and `x` on the head; three marks and a line ending give the password; a mark inside stays; marks alone are refused as an empty password.

## The diff

- **Test.** One expectation changed, for the human's decision, which is the reason and the source the guideline *Changing an existing test* asks for. It is not weakened: it now requires more. Run on the base commit's function, that case gives `<mark>x`, so the test fails without the `+`, which agrees with the executor's failing run.
- **The two changes beyond the handoff.** Both are needed and neither is a finding. The test's old name said "only the first", which would now be false. The comment above `cleanPassword` says two marks are possible; that is what was measured, under 65001 with `[Text.Encoding]::UTF8`.
- **Scope.** Four files, the four the handoff names. N1 to N4 and M1 to M7 stayed out, as it says.
- **No agent instruction, host or address** came in. Both skill copies are byte-identical.

## Minor notes (neither blocks)

**C1 — Two lines lost their wrap.** The reference, lines 244 and 252, run to 109 and 114 characters in a part of the file wrapped near 100. Polish only. Grade: Minor.

**C2 — A second attempt can overwrite the kept database. Outside this diff; it comes from the earlier fix's steps.** If step 7 fails and the human, instead of the way back, tries another backup from step 1, `mkdir` fails with "File exists", which can be passed over, and step 4 then moves the restored `accounts.sqlite` onto the one kept in `previous`. `mv` replaces a same-named file without a word, exit 0, as the walk's last row of moving files back showed. The reference covers failure with the way back only and does not speak of trying another backup. One sentence would close it: to try another backup, take the way back first. Grade: Minor, out of this correction, reported for the orchestrator. It needs the human to pass over an error and to leave the written way.

**Evidence for M1 of the first review, not reopened:** step 5's `install` gave mode 755 in the walk, as that note predicted.

## Declined to judge

- N1 to N4 and M1 to M7: outside the remarks, by the handoff.
- Whether stripping every leading mark could harm a password that really begins with one: the human decided it, and the reference keeps this password ASCII.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `db739297…`, the head given |
| `git log`, `git diff fa7eedb..db73929` | two commits, four files |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | exit 0 |
| `npm test -- tests/deploy/test_restore_trial.py` | exit 0, 13 tests |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | exit 0, 5 tests |
| `npm test -- tests/quality/test_quality_invariants.py` | exit 0, 5 tests |
| Scratch: pipes under consoles 65001 and 852, with and without `[Text.Encoding]::UTF8` | table of remark 2 |
| Scratch: `cleanPassword` of `fa7eedb` and of the head on crafted text | under remark 2 |
| `docker run --rm --tmpfs /vol node:24-slim`, two containers, Linux, root | table of remark 1; both exit 0 |
| Containers left of that image; restore-trial containers left | 0; 0 |
| `git status --short` after all checks | empty |

**Not run, or changed from what was planned:**

- **Step 7's `rm -r /root/loop2-restore` was not walked**, nor the way back's removal of the restored file. My first container script held `rm -rf` of that path; the session's safety hook refused it, since it refuses deletion outside the project, and nothing ran. I did not work around it: each scenario ran in its own `--rm` container with no deleting command, and the way back's files were moved over the restored file instead. So the walk shows the way back's move, not its removal. Removal itself is ordinary and carries no risk this correction touched.
- Two container attempts ended at exit 125 before anything ran, because Git Bash rewrote `/vol` into a Windows path; repeated with `MSYS_NO_PATHCONV=1`.
- Nothing on the server or on Strych, by the boundary; the `tmpfs` stands in for the volume, so Docker's real volume directory was not used. No image was pulled: `node:24-slim` was already here.
- `age`: not needed.
- The full `npm test` and `foundation_check.py`: the cycle's own run.

## Reaches beyond the dispatch

`reports/correction-1-handoff.md`, named by the dispatch for the remarks. `git show fa7eedb:scripts/restore-trial.mjs` into a scratch file, to run the base's function. `.the-way/task-cycle/review/fix.md`, for the correction's rule.

## Searches not found or unclear

None.
