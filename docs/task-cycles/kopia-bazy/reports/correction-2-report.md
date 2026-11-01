# Report — correction 2, task kopia-bazy

**Status:** done

## Remark 1 — clear the mark
`foundations/invariants.md`, `account-save-backup`: *Violated* `yes` to `no`, that field only, in its own commit, following `.the-way/elements/invariants/skill/SKILL.md` and its `write.md` (read whole). Checks: `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors".

## Remark 2 — the trial's procedure
`references/backup_and_restore.md`, "Trying a backup on the owner's computer", both copies byte-identical, English, host as `<host from the constants block>`:
- intro: `winget` hung, the Windows zip of the releases page serves, a newer `age` opened the backup;
- step 1: private folder, key file `strych-key` with a final line break and no `.txt`, the `icacls` and `scp -p -i` commands, fingerprint comparison on first connection (another key type is no match);
- step 3: same `icacls` for the backup key file, check of the first 15 bytes;
- step 5: `Read-Host` in its own block entered alone with the reason, launcher path given whole;
- step 8: `icacls ... :F` for both keys, `Remove-Item -Recurse -Force`, `Test-Path` shows `False`, `Remove-Variable`, close the window.

**Deviation to decide:** the handoff's byte check (`[IO.File]::ReadAllBytes`, `[Text.Encoding]::ASCII.GetString`) contains `::`, which the skill test `test_no_ipv6_literal_and_no_mikrus_server_name` takes for an IPv6 literal (failed, exit 1, match at `::`). I did not touch the test (handoff: no test). I used `$b = Get-Content .\accounts.sqlite -Encoding Byte -TotalCount 15` then `-join ($b | ForEach-Object { [char]$_ })`, run on scratch bytes in Windows PowerShell 5.1: prints `SQLite format 3`. The text says "in Windows PowerShell" because `-Encoding Byte` does not exist in PowerShell 7. The owner did not run this exact form; if the owner wants the original form, the test's pattern needs a decision. Same `::` limit applies to any future PowerShell static call in the skill.

## Checks (command, exit code)
- `python -B .the-way/elements/common/foundation_check.py` exit 0
- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0 (after one failing run, exit 1, described above)
- `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` exit 0
- Not run: full `npm test`; the commands themselves on the owner's computer except the byte check.

## Searches not found or unclear
- Head `e69034c` named in the handoff was the head at start; commits since are mine only.
