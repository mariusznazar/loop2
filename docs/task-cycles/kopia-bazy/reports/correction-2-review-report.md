FAIL ea94d22c23c2e5c8ad627a75bb7b2e3ae1d6d400

# Review of correction 2, task kopia-bazy

Range `e69034c..ea94d22`, two commits: `aa77ed0` (the mark) and `ea94d22` (the reference, both copies). "The reference" means `.claude/skills/loop2-deploy/references/backup_and_restore.md`; its copy in `.agents/` is byte-identical.

The mark and the byte check hold. The walk does not: followed in order, the removal of step 8 ends with `True`, and the plain database and both keys stay on the computer. Both blocking findings come from the same gap, which is that the text never says where the shell stands. The fix is a few short lines.

## Each remark

### Remark 1, clear the mark — made

`foundations/invariants.md:1107`: `account-save-backup`, *Violated* `yes` to `no`, that one field, in its own commit, the same shape as `e95a8b1`.

On the evidence named: the invariant's method is `review`, with the human's H2 and H3 as its check, and no test (slice handoff, row E12). The results in `correction-2-handoff.md:8–10` meet its sentence: a scheduled run made and sent a backup to Strych, and a backup fetched from there restored with the marker back. `7 x 82136 = 574952` is right. The weekday file 7 fits 2026-11-01, a Sunday. The range changes no code, so the results at `e69034c` hold for the head.

What I could check myself: the image `loop2-h3:latest` on this computer reads `image revision: e69034ce9b6ecad1d3854eff5b8db1f39e163895`, as H3 reports. The rest is the owner's word as relayed; the server and Strych are outside the boundary.

### Remark 2, the trial's procedure — made, except that the removal does not end with `False`

Each point is in the text: the zip and the newer `age`; the folder, key file and `icacls`; the `scp` form with `<host from the constants block>`; the ED25519 comparison; the `icacls` for the second key; `Read-Host` in a block of its own with the reason; the launcher's whole path; the order of step 8; `Remove-Variable`. See R1 and R2 for where following it fails.

## Blocking findings

Two, both Important, both within the task.

### R1 — Step 8 as written does not remove the folder

**Place:** the reference, lines 208 and 263–272.

**What is wrong.** Step 1 says "Make a private folder and work in it", and no step leaves it. PowerShell then refuses to remove the folder it stands in. Run in order, in Windows PowerShell 5.1, in the scratch folder, after giving both keys their rights back:

```text
Remove-Item : Cannot remove the item at '…\c2-walk' because it is in use.
Remove-Item ok: False
True
```

`-Force` does not help, and nothing inside the folder goes: a second scratch folder kept its `accounts.sqlite` after the same refusal. After `Set-Location ..` both folders were removed, and `Test-Path` gave `False`.

**Why it matters.** The folder holds the decrypted database, with every address and password hash, and both keys. The text promises "`Test-Path` shows `False`" and says nothing for `True`; the next words are to close the window. A person who does not know a terminal has no way forward. The handoff names this exact end, and D-220 counts the backup "removed from the computer" as part of a checked restore.

**Fix.** In step 8, after the two `icacls` lines and before `Remove-Item`: `Set-Location ..`. Add one line for what a `True` means.

### R2 — The block of step 5 does not run after step 4

**Place:** the reference, lines 208, 232 and 248–252.

**What is wrong.** Step 4 builds with `docker build … .`, which needs the shell in the checkout, and nothing brings it back. Step 5's block then gives `--database .\accounts.sqlite`, a path relative to the private folder. Run from the checkout:

```text
--database is not a readable file
launcher exit 2
```

Run from the private folder, the same block reached a verdict. The correction created this split: the database used to lie where the launcher was run, and now the folder and the checkout are two places. "The path of the launcher may be given whole" answers half of it. Steps 1 and 4 also give no command for entering either place, and for this reader "work in it" is not an instruction he can carry out.

**Why it matters.** The handoff's standard is that every block runs as written and in order, for a person who does not know a terminal. Nothing is harmed, and exit 2 starts nothing, but the walk stops there, and "refused … arguments" does not say the fault is where he stands.

**Fix.** Step 1: `Set-Location <the private folder>`. Step 4: `Set-Location <path to the checkout>`, the build, then `Set-Location <the private folder>`. With that, R1's `Set-Location ..` is the only other line needed.

## Judged and found good

**The byte check.** Run as written in Windows PowerShell 5.1 on a real SQLite file made by `node:sqlite`: 15 bytes, prints `SQLite format 3`. On a file with `age`'s header it prints `age-encryption.`, so a forgotten decryption shows. The words "in Windows PowerShell" are needed and stand there. The orchestrator's acceptance holds: it runs and reads true.

**The rest of the walk, on scratch values:**

| Point of the text | Result |
|---|---|
| `icacls .\strych-key /inheritance:r /grant:r "${env:USERNAME}:R"` | exit 0; `ssh-keygen -y` then reads the key, exit 0 |
| "or `ssh` refuses the key" | true: a key others can read gave `Bad permissions`, exit 255 |
| "with a final line break" | true: without one, `invalid format`, exit 255. A CRLF file, as Notepad writes, passes |
| The same `icacls` for the backup key | exit 0 |
| Second block of step 5, whole launcher path, from the private folder, on `loop2-h3:latest` with a scratch database | ran to a verdict, exit 1, login status 401, as a scratch password should; the path in other letter case also runs |
| "Read-only keys stopped `Remove-Item`" | reproduced: access denied, the key stayed, the rest went; after the `:F` grant the folder went, `False` |
| `icacls <key file> /grant:r "${env:USERNAME}:F"` for both keys | exit 0 each |
| `Remove-Variable secure, credential` | none left |

No Mikrus host stands in the skill, no agent instruction came in, and the fingerprint comparison points at the right step.

## Minor

**C1 — The zip's `age` is not found by name.** The reference, lines 204–206 and step 3. A zip puts `age.exe` in a folder that is not on the path, and step 3's `age --decrypt` then gives "The term 'age' is not recognized". PowerShell does not run a program from the folder it stands in by name alone either; only `.\age` did, shown with a stand-in. This computer has no `age` on its path today. The dispatch says to walk on a computer with `age`, so this does not block; but the text recommends the very way that leads here. Half a sentence would close it: use the whole path of `age.exe`.

## Declined to judge

- The Minor findings of the earlier reviews, M1 to M7, N1 to N4, C1 and C2 of correction 1: out of this correction by its handoff; the second-attempt overwrite stays open as reported.
- The `::` limit of the skill's address test: the orchestrator settled it, and the test stays.
- Whether `loop2-h3:latest` should be removed after the trial: not named in the remarks; the image holds no player data.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `ea94d22c…`, the head given |
| `git diff --stat e69034c..ea94d22` | three files, the three allowed; no code |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | exit 0, 5 tests |
| Scratch walk in Windows PowerShell 5.1, console 852, `-NoProfile`, in the session's scratch folder, with a scratch key, a scratch database and a scratch password | the tables above, R1 and R2 |
| `node …\restore-trial.mjs` on `loop2-h3:latest`, through the block | exit 1; no container or volume left |
| The same folder removed after `Set-Location ..` | `Test-Path` gave `False`; the scratch folder is gone |
| `git status --short` after all checks | empty |

**Not run:**

- `scp` and the fingerprint prompt: Strych is outside the boundary. H3 is the evidence for that form.
- `age`: not on this computer; step 3's own command was not run, only a stand-in for the name lookup.
- `Read-Host` itself: this tool has no console for a prompt, so a scratch value stood in. The reason the text gives was not reproduced; it rests on H3.
- `docker build`: the existing `loop2-h3:latest` served.
- Anything on the server.
- The full `npm test`: the cycle's own run.

## Reaches beyond the dispatch

- `.the-way/elements/invariants/skill/SKILL.md:44`, and `e95a8b1`, for the rule and shape of the mark.
- `docs/task-cycles/kopia-bazy/reports/slice-6-handoff.md`, row E12, for the invariant's check.
- The image `loop2-h3:latest` on this computer, run through the launcher: its label, and a real run of the block.

## Searches not found or unclear

- How the owner got past R1 and R2 in H3: not recorded. He may have stepped out by hand, which would explain why the removal worked for him and the text does not show it.
