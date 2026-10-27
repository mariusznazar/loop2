# Slice 13 fix report: blocking finding 1 of the whole-change review

**Status:** done

**Fix range:** bf36040ed5f916a01fea53af4ae0bc3c779bad5b .. 40977266b5d66825c49fcdd0c6982c1872e8a2c5. **Commit:** 4097726 (one).

## Changed paths

`.claude/skills/loop2-deploy/references/setup_and_secrets.md` and its `.agents` twin: 37 insertions, 23 deletions each (git shows 74/46 for the pair), byte-identical (`cp`), LF kept. No other path.

## Resolution of the finding

The finding is right: the old `case ... echo STOP ... esac` line only printed, so later lines ran. Fix, in all three key blocks (the two named plus the creation block, which had the same pattern of a lasting `umask 077`):

- Each block now runs as a subshell `( umask 077 ... )`, so the umask never stays in the human's shell.
- Every step is chained with `&&`; the guard is `*) echo "STOP: ..."; false ;; esac &&`, so a failed guard stops the rest and the file is untouched.
- The new key is first put in a variable and its length must be 43, so a failed key pipeline cannot write a short or empty key.
- `trap 'rm -f -- "$tmp"' EXIT` inside the subshell removes the temporary file on any failure (harmless after a successful `mv`).
- The creation block uses `f=...` and `test ! -e "$f"` first, and its follow-up `stat`/`wc` use `$f`.
- The sentences "When it printed STOP, do not run the last N lines" are replaced by "After STOP the file is as it was"; an intro sentence says the blocks can be pasted whole. The rotation intro now names the accepted forms and says empty and pretty-printed files are refused.

Other fenced blocks I wrote were looked at with whole-paste in mind: the PowerShell measurement block (the `Remove-Item Env:DOCKER_HOST` line is last and unconditional, as the text says), the `ssh ... grep MemAvailable` line and the `stat` reads are single commands; nothing else has a guard.

## Local block runs

Scratch directory under the session scratchpad, synthetic 43-character keys (`A...`, `B...`), `/etc/loop2` replaced by a scratch `etc/`, `chown root:1000` replaced by `true` (not root locally), `umask 022` set before each block. Each block was run as one pasted script (`bash block.sh`); the file was reset before each case.

| Block | Input form | Result |
|---|---|---|
| create | file absent | file written, valid JSON with 1 key, 48 bytes, no temp left, umask after 0022 |
| create | file exists (one key) | nothing changed |
| rotate | one key | new key first, 2 keys, valid JSON |
| rotate | two keys | 3 keys, valid JSON |
| rotate | empty `[]`, blank, pretty-printed | STOP printed, file unchanged, no temp left |
| retire | two keys | oldest dropped, 1 key, valid JSON |
| retire | one key | STOP, file unchanged (before the fix this wrote invalid JSON) |
| retire | `[]`, blank, pretty-printed | STOP, file unchanged |

Umask after every block was 0022. No leftover `.session-secrets.*` file in any case. The first harness attempt was faulty (it could not overwrite the read-only file and reused one printf format for two keys); the results above are from the corrected harness. Scratch files removed afterwards. Not tested: real ownership (`root:1000`), mode 0440 as root, `mv -T` onto a root-owned file, and the server shell; mode shown locally as 444 is a Windows Git Bash artifact.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie` | 0 | rebuilt at 4097726 |
| `docker run --name loop2-task15-deployskill53-final --network container:loop2-task15-dind ... loop2-task22-verifier:latest bash /inputs/verify.sh 4097726... 7012abc...` (full `npm test`; log `reports/53-whole-fix-final.log`) | 0 | Node 429/429 pass, 0 fail; Python 279 tests in 4 directories passed (3 Windows-only skips as before); twin-byte, frontmatter and sensitive-value tests included; foundation check 0 errors |
| `quick_validate.py .claude/skills/loop2-deploy` | 0 | valid |
| `quick_validate.py .agents/skills/loop2-deploy` | 0 | valid |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |

Container removed after the run. No server command run. Working tree clean after the commit.

## Reading reaches

Only the files named in the handoff, the current blocks of `setup_and_secrets.md`, and the scratch scripts I generated. No reach beyond them.

## Open point

None. Minor findings 2-17 and out-of-scope 18 were not touched, as instructed.
