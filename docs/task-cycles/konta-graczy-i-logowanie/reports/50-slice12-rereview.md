PASS 19695d670a69ea6d005a3795541b57ba4fe5a3f6

# Review of the fix of slice 12's blocking finding

- Head unchanged: `git rev-parse HEAD` = 19695d670a69ea6d005a3795541b57ba4fe5a3f6, and `git status --short` is empty. The fix made no commit, so there is no code diff to review. What changed are ignored record files: the new `reports/49-target-measurement-procedure.md` (the text slice 13 copies into the loop2-deploy skill) and a pointer in `reports/47-measure-report.md:169-171,218`.
- Method: `.claude/skills/the-way-review-change/SKILL.md` -> `.the-way/task-cycle/review/SKILL.md`, section 4 (review of a fix), under the rules of `reports/48-measure-review-handoff.md`.
- Inputs read whole: `reports/50-slice12-rereview-handoff.md`, `reports/49-slice12-blocking-findings.md`, `reports/49-slice12-fix-handoff.md`, `reports/49-slice12-fix-report.md` and `reports/49-target-measurement-procedure.md`; also the pointer lines of `reports/47-measure-report.md` and the tail of `reports/49-fix-labels.log`.
- Counts: 0 blocking, 0 Minor and 0 out of scope from this round. Minor findings 2–7 and out-of-scope finding 8 of `reports/48-measure-review.md` stand as recorded, not regraded.

## Finding 1 (Important): fixed

The defect: in Windows PowerShell 5.1, the procedure's label check `docker inspect --format '{{index .Config.Labels "org.opencontainers.image.revision"}}' loop2` stopped with a template parsing error (exit 64).

On the head's procedure the defect no longer exists:
- `49-target-measurement-procedure.md:32-33` reads the labels with `docker inspect --type container --format '{{json .Config.Labels}}' loop2 | ConvertFrom-Json` and prints `$labels.'org.opencontainers.image.revision'`. No Docker format string in the file contains a double quote (lines 32 and 34), so 5.1's quote dropping cannot change them.
- The shell is stated: `49-target-measurement-procedure.md:7,26`.
- My own evidence:
  - Fix report Checks 2 and 4 show both new format strings arriving unchanged and parsing; docker stops only at `error during connect` against a closed port.
  - In PowerShell 5.1, I piped the label JSON the fix captured from a real labelled image (`49-fix-labels.log`) through `ConvertFrom-Json`; `$labels.'org.opencontainers.image.revision'` printed `19695d670a69ea6d005a3795541b57ba4fe5a3f6` (Check 1 below).
  - The fix's Check 5 ran the two format strings against a labelled container on the task's own daemon. `{{.Image}}` equalled the image id, and the label JSON carried the commit (`49-fix-labels.log`, last lines, which I read).

## The new procedure: no new finding

What I checked in `49-target-measurement-procedure.md`, and what it showed:

- **Fails closed when inspect fails.** If `docker inspect` fails (SSH refused, no container), `$labels` and `$image` stay empty. If the human pastes the whole block anyway, PowerShell 5.1 drops a `$null` argument entirely: my probe (Check 2) shows `--image $x --commit abc` arriving as `["--image","--commit","abc"]`. The launcher then refuses `--image` because its value starts with `-` (`scripts/measure-passwords.mjs:48-49`) and exits 2, and nothing runs. A label that differs from `$sha` is refused by the launcher before any `run` (`scripts/measure-passwords.mjs:106-109,188-193`).
- **Exit code and output file.** `node … | Out-File -Encoding utf8` keeps the launcher's exit code in `$LASTEXITCODE`: fix report Check 6 shows 1 and 2. The text's account of exit 2 leaving an empty file, because usage goes to stderr, matches `scripts/measure-passwords.mjs:265-269`. The file holds no secret: the launcher prints only its report and verdict, and the entrypoint never prints a password or hash (reviewed in report 48).
- **Memory step.** `ssh <alias> grep MemAvailable /proc/meminfo` carries no quoted argument, and the threshold `1048576 kB` matches `MIN_MEM_AVAILABLE_MIB=1024` (`deploy/loop2-deploy:35`).
- **Server impact.** "What it changes on the server" (`:52-59`) matches the launcher: `--network none`, no volume, mount or environment, `--memory`/`--memory-swap` equal, `--restart no`, name `loop2-password-measure-<hex>`, `rm --force` in `finally`. "Also after a failure" holds for failures inside the launcher process. The case of the launcher process itself being killed is my earlier Minor finding 5, which stands and is not new. D-12 holds: the text says agents do not run it (`:3`). D-17 holds: one loop2 container under its own limit, no pull or build, after the deployment's memory threshold.
- **The 3.4 s figure** (`:59`) comes from the local log (`47-measure-report.md`, "Local measurement") and is labelled local.

## The note on the loop2-deploy skill, line 66

`.claude/skills/loop2-deploy/SKILL.md:66` (and its `.agents` copy) shows the label template with nested double quotes as a read on the server. It belongs to slice 13, not to this fix:
- The line predates this slice and lies outside its range and its Change paths.
- It is correct in the server's bash.
- Slice 13 edits both copies of that skill.

If slice 13 also shows a Windows-side form (for example `ssh <alias> docker inspect …` from PowerShell 5.1), it should use the JSON form above or say which shell it assumes.

## Declined to judge

- PowerShell 7 behaviour of the procedure: not installed here. The procedure scopes itself to 5.1, and its format strings carry no double quotes, so I have no reason to expect a difference. Unverified.
- Whether Docker over `ssh://<alias>` works against the Mikrus daemon, and whether the SSH account may use Docker. Only the human's run shows that; no server command is allowed.

## Checks

| # | Check | Command | Exit / result |
|---|---|---|---|
| 1 | Label JSON parsing in 5.1 | PowerShell 5.1: `$labels = '{"org.opencontainers.image.revision":"19695d670a69ea6d005a3795541b57ba4fe5a3f6","org.opencontainers.image.title":"loop2"}' \| ConvertFrom-Json; $labels.'org.opencontainers.image.revision'` | 0; prints the commit |
| 2 | Empty variable as a native argument in 5.1 | PowerShell 5.1: `$x = $null; node -e "console.log(JSON.stringify(process.argv.slice(1)))" -- --image $x --commit abc` | 0; `["--image","--commit","abc"]` (the null is dropped). An earlier attempt without `--` exited 9, because node read `--image` as its own option. That was a fault of the probe, not of the procedure. |
| 3 | Fix-run label output | PowerShell 5.1: `Get-Content …\reports\49-fix-labels.log \| Select-Object -Last 15` (run together with check 1, whose combined call exited 9 for the reason given in row 2) | file read; `LABELS={…"19695d6…"…}`, and `IMAGE` = `IMAGE_ID` |
| 4 | Head and tree | `git rev-parse HEAD`; `git status --short` | 0; 19695d6…, clean |
| 5 | Skill line 66 | `sed -n 60,70p .claude/skills/loop2-deploy/SKILL.md` | 0; server-side bash read, as described |

Not run:
- Full `npm test`: no committed file changed, so `reports/47-measure-final2.log` (exit 0 at this head) still stands.
- `foundation_check.py`: unchanged since report 48 (0 errors).
- Anything on the server or on the task's daemon.

## Reaches beyond the dispatch

- `scripts/measure-passwords.mjs:48-49,106-109,188-193,265-269`: how the launcher treats an empty `--image`, a wrong label and usage output, to judge the procedure's fail-closed paths.
- `deploy/loop2-deploy:35`: the memory threshold the procedure cites.
- `.claude/skills/loop2-deploy/SKILL.md:60-70`: the executor's note about line 66.
