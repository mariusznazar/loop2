FAIL e9350ae8345abc1976c09520977934e1a058aaf5

# Review of the fix of slice 6

Range `a11ad0a..e9350ae`, two commits: `e801bc7` (slice 5's launcher and its test) and `e9350ae` (the reference, both copies). "The reference" means `.claude/skills/loop2-deploy/references/backup_and_restore.md`; its copy in `.agents/` is byte-identical.

Three of the five findings are fixed. Two remain, each by a small and specific gap; both fixes are one line.

## Each finding

| Finding | Result |
|---|---|
| I1 — "With no server" cannot be followed | **fixed** |
| I2 — the moved-aside database | **remains**, in one new gap the fix made; the rest is fixed |
| I3 — the no-merge window | **fixed** |
| I4 — `docker` exit 1 | **fixed** |
| I5 — the password under a UTF-8 console | **remains** for one combination of settings; the rest is fixed |

No finding was contested.

### I1 — fixed

Walked as the human on a fresh host. The reference, lines 274 onward: ten numbered steps, counted in the text ("ten in all"; a count of the numbered lines gives 10), every one named the human's, and "never been tried" is said. `age` is installed at step 4, before the restore needs it at step 9. `rsync` and `pusher` are checked, with a test message. `/etc/loop2` is made before the files that lie in it, and the session keys, SMTP password and token before step 8's deployment, which needs them. The backup key has its path and mode, and `/backup_key` its path and 0600. Installing steps 7 to 12 close the path, so the deliberate failure of step 10 runs on the new host. The sentence on `notice: pusher exit 127` is true: `timeout` returns 127 for a command it cannot find, and `deploy/loop2-backup:104–108` logs that status.

Two small gaps stand in the list; see N1 and N2.

### I2 — remains

**Fixed:** all three files move together; the destination is stated and lies outside `/srv/loop2` and `/tmp`; the reason is given (`git clean -ffdx`, `deploy/loop2-deploy:194`); the directory goes only after the check passes, and the same day; the way back is written and holds up when walked.

**What remains, made by the fix:** no step creates `/root/loop2-restore/previous`. Step 1 (line 245) makes only `/root/loop2-restore`. Step 4 (lines 250–253) then says "Move all three files … (those that exist), together into `/root/loop2-restore/previous`", and gives no command. Tried on scratch files with `mv`:

| What the human types | Result |
|---|---|
| The files one at a time, into a directory that does not exist | `previous` becomes a file, each `mv` replaces it, and it ends holding only `shm`. **The main file and the `-wal` are gone.** |
| All three in one `mv` | `mv: target … is not a directory`, exit 1, nothing moved; safe |
| One file, the usual case after a clean stop, when "those that exist" is one | exit 0; `previous` is a file holding the database, not a directory. Nothing is lost, but the way back (line 269) then says to move files back "from `/root/loop2-restore/previous`", which fails |

**Why it matters.** This is the defect I2 named: the fallback that fails at the one moment it is used. The first row destroys the database from before the restore, with the app stopped and the human following the text. Grade: Important.

**Fix.** Step 1 makes both: `mkdir -m 0700 /root/loop2-restore /root/loop2-restore/previous`.

### I3 — fixed

The reference, lines 106–109: "From this deployment until this request's merge, merge nothing else to `main` and deploy nothing else to the server", with the reason. That is question 10 (`task-frozen.md:104`) in full, both halves, and it no longer leans on a rule about saved game states.

### I4 — fixed

The reference, line 57: exit 1 now covers a missing or stopped container, no backup command, and a failed backup; 125 to 127 no longer claim a missing container; the rollback case carries its number. Confirmed for the case the fix states but my first probe did not exercise exactly: `docker exec` into a running container of an image without the file gave exit 1. See N3 for a word in that line.

### I5 — remains

**Fixed:** a single mark. `cleanPassword` drops it (`scripts/restore-trial.mjs:153`), and the launcher's reading, run on bytes from real pipes, gives the password back.

**What remains.** Under console 65001 with `$OutputEncoding = [Text.Encoding]::UTF8`, PowerShell writes **two** marks. Measured from `powershell -NoProfile`, read as the launcher reads, cleaned by the head's `cleanPassword`:

| Console | `$OutputEncoding` | Bytes in | Equals the password |
|---|---|---|---|
| 65001 | default | 17 | yes |
| 852 | default | 14 | yes |
| 852 | `[Text.Encoding]::UTF8` | 17 | yes |
| 65001 | `[Text.Encoding]::UTF8` | 20 | **no**, length 13 |

The fourth row is the false `FAIL: the test account could not log in`, and the reference, line 215, now says "This form needs no special console", which that row shows untrue. The test pins the behaviour: `tests/deploy/test_restore_trial.py:174` asserts that a second mark stays.

**My own part.** The first report's table gave this row as "any … mark first" and hid that there are two under 65001. The data was in my measurement (20 bytes); the fix followed the finding and the orchestrator's bound answer, "strips one leading U+FEFF". The fix report's reason, that a second mark "would be part of the password", does not hold in practice: the reference keeps this password ASCII.

**Weight, stated plainly.** Narrow. It needs both settings at once, and this computer has no PowerShell profile, so the owner would have set them himself. A plain window passes. It is still the defect as found, and a sentence in the skill that is false in a measured case.

**Fix, for the orchestrator's routing, since it departs from its bound answer.** Either `/^\u{feff}+/u` with the test's second case changed, or keep one mark and take "needs no special console" back to what is true: it says which settings work. I recommend the first: one character, and the sentence stands.

## New findings in the fix diff

The `previous` directory is the one new Important finding, counted under I2 above. Nothing else in the fix diff is Critical or Important. Both skill copies are byte-identical. No instruction has an agent act, and no Mikrus host or address stands in the skill. The `PasswordReading` tests call the exported function through Node.js, not a copy of it, and the old code keeps the mark, as my first review's run showed, so they fail without the fix.

## Minor notes (these do not reopen anything)

**N1 — A host with `pusher` whose message does not arrive.** "With no server", step 4. The list says "check that it arrives", then speaks only of a host with no `pusher`. The advice "take the missing notice to the owner" is addressed to someone who is the owner. Say what to do when the message does not come, and "decide" in place of "take to the owner".

**N2 — The session keys "by its section".** Line 281. The section's sequence, "Creating the file", generates a new key and does not put the note's content in place, so followed literally it signs every player out. No data is lost; a sentence would say to write the note's content with owner root, group 1000, mode 0440.

**N3 — "the line before it".** Line 57. A missing script makes Node print several lines, so "the lines before it".

**N4 — `umask 077` went with the old step 1.** The decrypted file now takes root's default umask, likely 0644. Inside the 0700 directory that is harmless, but M1 of the first review (no mode at step 5, line 255) now has a little more weight, since a `mv` carries that mode into the volume.

## Declined to judge

- M1 to M7 of the first review: not in the findings file, so not fixed, and by `fix.md` not reopened; N4 only notes how the fix touched M1.
- Whether `rsync` installs from `apt` on a new host: the fix report calls it unverified, and no source settles it.
- Whether `/root` on another host is a private home directory: taken as ordinary.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `e9350ae8…`, the head given |
| `git log`, `git diff a11ad0a..e9350ae` | two commits, four files |
| `diff -r` of the two skill copies | exit 0 |
| `npm test -- tests/deploy/test_restore_trial.py` | exit 0, 13 tests, 17 s |
| `npm test -- tests/quality/test_quality_invariants.py` | exit 0, 5 tests |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | exit 0, 5 tests |
| Scratch: pipes under consoles 65001 and 852, with and without `[Text.Encoding]::UTF8`, into the head's `cleanPassword` | table in I5 |
| Scratch: `mv` of three files in three ways with `previous` not made, in Git Bash on scratch files | table in I2 |
| `docker exec` into a running `node:24-slim` container, backup command absent | exit 1 |
| Count of numbered steps under "With no server" | 10 |
| Manual: I1 and I2 walked first as the human, then the changed lines of I3, I4, I5 | above |
| `git status --short` after all checks | empty; no probe container left |

**Not run:**
- Anything on the server or on Strych, by the boundary; the restore steps, `ssh-keyscan`, `scp` and `mkdir`/`mv` on a real volume are unexecuted.
- `age`, not needed.
- The full `npm test` and `foundation_check.py`: the cycle's own run.

The scratch `mv` ran on Windows through Git Bash, not on the server; `mv`'s behaviour here is the same on Linux by its definition, which I did not try there.

## Reaches beyond the dispatch

None beyond the first handoff's boundary, and `deploy/loop2-deploy:194` and `deploy/loop2-backup:104–108`, read to check the reference's claims. `.the-way/task-cycle/review/fix.md` read whole.

## Searches not found or unclear

- No step of the reference makes `/root/loop2-restore/previous`: searched by the word `previous`, two hits, lines 252 and 269, neither creating it.
- Whether the owner would ever run both settings of I5's fourth row: unknown. This computer has no profile setting either.
