FAIL 042fbe3ef7af8689d824560a2695833075ca4db9

# Review of fix 1: wpisy-serwera-kopii-i-testow

Range: base `a2c3729be6d927e39357f9e8d10877349199ccb8`, head `042fbe3ef7af8689d824560a2695833075ca4db9`
(`git rev-parse HEAD` gives the same; one commit `042fbe3e`). Bounded by
`reports/fix-1-findings.md`: I1 to I4 (blocking) and M1 to M5 (Minor, within the task).

Counts: one new Important finding in the fix diff (N1), which counts as remaining; every finding of
the findings file fixed; one new Minor note (N2).

## The findings of the findings file

| Finding | Verdict | Evidence |
|---|---|---|
| I1 — "owner's private note" | **fixed** | `foundations/invariants.md:1290` now reads "the operator's private note of secrets (D-13)", D-13's word; `git grep "owner's private note"` finds nothing |
| I2 — D-112 *Rejected* lacked question 3's ways | **fixed** | `foundations/decisions.md` D-112 *Rejected* ends with "D-112 left as it is, with the command reading the database outside its rules — the decision would go on naming only the other connections that open the database, while one more reads it" and the two ways of the second not-chosen line, each with its cost. Writing the cost without the count "three" is right: D-112 names four commands |
| I3 — "the last" line, not by time | **fixed** | `backup_and_restore.md` step 8 (both copies): "only the latest by its time, not by its place in the output: the file is printed before its older copy `.1`, and a line of the human's `account-block` run is written when the command runs, before the lines of the container for the same period"; the action sentence says "the latest". Both reasons agree with `SKILL.md:490-505` and `deploy/loop2-deploy:339-344` |
| I4 — only step 6's dump was checked, by `tail -n 20` | **fixed as written, with a new defect in the new command (N1)** | The step now looks for every failed dump since the backup and D-360's *Rationale* says a failed append of any deployment since the backup loses that container's lines. The search string `warning: the dump of the log of both loop2 services` is the exact start of the line `deploy/loop2-deploy:357` writes, after the UTC time `log()` puts first (`:79-84`), so the matching and the time comparison work. The bound of the search does not; see N1 |
| M1 — D-112 first paragraph of four sentences | **fixed** | the new sentence is a paragraph of its own; the first paragraph is word for word as before, so the tests' quotations hold (foundation check, 0 errors) |
| M2 — D-235's last sentence | **fixed** | "A human checks the agreement with Strych when the backup script's way of talking to it changes, and the agreement with `pusher` when the way either script talks to it changes." |
| M3 — which `made:` line | **fixed** | the `start` line of the run whose `made:` line names the weekday file, is followed by `end: sent` and agrees with the file's time of step 1 — consistent with `deploy/loop2-backup:246`, `:257`, `:128` |
| M4 — D-360 bound the known resets to a new server only | **fixed** | the third binding sentence now covers "a period whose log is lost, … a block made with no line written, and … a restore on a new server", and blocks and unblocks too, which is what the second part of step 8 does; the paragraph keeps three sentences; no test quotes D-360 (`grep -rn 'decision: D-360' tests` finds none) |
| M5 — stand-ins of both scripts | **fixed** | `guidelines/testing.md:60` lists "skryptu kopii: `docker`, `age`, `rsync`, `pusher`; skryptu czuwania: `docker`, `pusher`, `flock`, `date`", as `tests/deploy/watch_script_support.py:12` gives |

## New findings in the fix diff

### Important

**N1. The new search for failed dumps stops at the 50 oldest matches, so on a deploy log with a
longer history it never shows the failures since the backup** —
`.claude/skills/loop2-deploy/references/backup_and_restore.md:524` (same line in the `.agents`
copy): `grep -F -m 50 'warning: the dump of the log of both loop2 services' /var/log/loop2-deploy.log`.

`grep -m 50` stops after the first 50 matching lines, counted from the start of the file, which is
the oldest end. `/var/log/loop2-deploy.log` is never rotated: the repository's only rotation file,
`deploy/loop2-app.logrotate`, names `/var/log/loop2-app.log` alone, and `log()` appends to the deploy
log at every deployment (`deploy/loop2-deploy:38`, `:67-84`). A dump that fails at every deployment
for a while — D-355 itself names such risks: a file that loses its owner, a dump that times out, a
rollback to a commit whose Compose file lacks a service — fills those 50 matches with old lines,
since every merge to `main` deploys (D-11). After that, a dump that failed since the backup is
past the cut: the human sees only old warnings, finds none later than the backup and treats the
log as complete — the silent loss of a period that I4 was raised for, the period's resets left
open to the old password. The fix is one line that keeps the bound and takes the newest end:
`grep -F 'warning: the dump of the log of both loop2 services' /var/log/loop2-deploy.log | tail -n 50`.

### Minor

**N2. The step does not say where the human finds "the deployment before it"** — same paragraph,
`backup_and_restore.md:529-530`: "the period of that container, from the deployment before it to
that deployment, is unknown". The start of the period is the previous `start:` line of
`loop2-deploy` in the deploy log, or the previous `loop2-deploy |` header in the dump; one clause
would spare the human the guess. Treating the period as starting at the time of the backup is the
safe reading, so nothing is missed through this.

## Coherence of the fix

- The two skill copies are identical (`diff -r`, exit 0).
- D-360's *Rationale* ("save those of a container whose log was not appended", "a failed append of
  any deployment since the backup loses the lines of that container"), its third binding sentence
  and step 8's two parts say the same thing.
- D-112's second paragraph names the command of D-360 and its *Rejected* keeps the ways of
  question 3; its first paragraph and the tests that quote it are untouched.
- D-235 and `guidelines/testing.md:60`, `:368` agree on the two scripts and their stand-ins.
- `tracked-file-private-names` agrees with D-13 and the glossary entry `owner`.

## Declined to judge

- D-112's second paragraph is formally "a part of another question" in the template's terms,
  while the command belongs to the same question; it changes nothing a reader does, and the fix was
  asked for by M1.

## Checks

| Check | Command or method | Result |
|---|---|---|
| Head | `git rev-parse HEAD`, `git rev-parse 042fbe3e` | both `042fbe3ef7af8689d824560a2695833075ca4db9` |
| Skill copies | `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | exit 0 |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors"; lists `account-email-nodemailer-starttls`, expected |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | exit 0, "0 error, 147 warn, 7 info", the same count as at `a2c3729b` |
| Skill test | `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill` | exit 0, OK |
| Tests quoting D-360 or D-235 | `grep -rn 'decision: D-360\|decision: D-235' tests` | none |
| The warning's words and line form | read `deploy/loop2-deploy:38`, `:67-84`, `:346-360` | the string matches line 357; UTC time first |
| Rotation of the deploy log | read `deploy/loop2-app.logrotate`; search of the deploy references | only `/var/log/loop2-app.log` is rotated |

Not run: `npm test` (the cycle's own run); the commands of step 8 on the real server.

## Reaches beyond the handoff

- `deploy/loop2-app.logrotate` and the list of `deploy/`: whether the deploy log is rotated (N1).
- `deploy/loop2-backup` lines 128, 246, 257, from the earlier review: for M3.

## Working copies

None made in this round; `.runs/review-whole/` does not exist.

## Unread material

The handoff, `fix.md`, the findings file and the fix report read whole; the fix diff read whole.
The decisions D-360, D-112 and D-235 were read whole in the earlier review and their changed parts
whole in the diff; no other decision bears on the fix diff. No guideline file beyond
`guidelines/testing.md`, read whole in the earlier review, is touched.

## Searches not found or unclear

- A rotation of `/var/log/loop2-deploy.log`: none found in the repository. Whether the server
  rotates it by a configuration of its own is not known here; N1 holds unless it does.
