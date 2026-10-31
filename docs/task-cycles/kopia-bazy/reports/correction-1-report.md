# Report — correction 1, task kopia-bazy

**Status:** done

## Remarks

1. **I2, "make `previous` at step 1".** Restore step 1 now reads `mkdir -m 0700 /root/loop2-restore /root/loop2-restore/previous`; step 4 says the files go into `previous` "(made in step 1)". Both skill copies identical (`diff -r` exit 0). Walk on scratch files (Git Bash, Windows; `-m 0700` is refused there, the directories were still made): `mv` of `accounts.sqlite`, `-wal`, `-shm` one at a time, each exit 0; `previous` holds all three, the source directory is empty. One file alone: exit 0, `previous` holds it as a file inside the directory.
2. **I5, way (a).** `cleanPassword` uses `/^\u{feff}+/u`. The test `test_every_leading_mark_is_dropped_and_a_mark_inside_or_none_is_unchanged` (renamed, since the old name said "only the first") expects `"x"` for two leading marks, one character changed in the expectation. Failing first: `python -B -m unittest tests.deploy.test_restore_trial.PasswordReading` exit 1 (`'"\ufeffx"' != '"x"'`); after: same command exit 0 (3 tests). `npm test` takes a whole file only, so the focused run used `unittest`. The sentence in the reference stands unchanged. Under console 65001 with `$OutputEncoding = [Text.Encoding]::UTF8` (`powershell -NoProfile`): 20 bytes in, first code unit feff, `cleanPassword` equals `ascii-pass-1`: true.

## Checks (command, exit code)

- `npm test -- tests/deploy/test_restore_trial.py` exit 0
- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0
- `npm test -- tests/quality/test_quality_invariants.py` exit 0
- `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` exit 0
- Not run: the full `npm test`; anything on the server; the `mv` walk on Linux.

## Beyond the handoff

I also changed the code comment above `cleanPassword` to say two marks are possible, and renamed the test (above). Nothing else touched; N1 to N4 and M1 to M7 left.

## Searches not found or unclear

None.
