# Blocking findings of the whole-change review (reports/52-whole-review.md), in the reviewer's words

Reviewed head: bf36040ed5f916a01fea53af4ae0bc3c779bad5b. Verdict: FAIL, 1 Important (from slice 13, commit bf36040), 16 Minor, 1 out of scope. Only the Important finding below is to be fixed; the Minor findings 2-17 and out-of-scope finding 18 are not fixed in this round (they go to the request).

#### 1. The STOP guard of the key rotation and retirement blocks prints a warning and runs the remaining lines anyway; retirement on a one-key file installs invalid JSON (new thread)

**Slice:** 13 (`19695d6..bf36040`, commit bf36040).

**Anchor:** `.claude/skills/loop2-deploy/references/setup_and_secrets.md:153` and `:160` (rotation); `:181` and `:188` (retirement). Byte-identical twin: `.agents/skills/loop2-deploy/references/setup_and_secrets.md`, same lines.

**To paste:** The `case … *) echo "STOP…" ;; esac` line does not stop the block, so the `mktemp`, `printf` and `chown … && mv` lines that follow it still run. On a file with one key, the retirement block writes `["<key>"]]` over `/etc/loop2/session-secrets`. The next deployment then refuses to start the application (exit 8). Making the guard abort — for example `*) echo "STOP…"; false ;; esac &&` chained into the remaining lines, as the creation block already chains with `&&` — closes this.

**Why I report it:**

- *What the code is for.* Task To do 16 and K11 have the skill tell the human how to rotate and retire session keys without signing players out. The handoff asks whether the human sequences are safe and correct. The blocks are fenced shell, written to be pasted into a root shell on the server.
- *Mechanism.* The guard is an `echo` inside `case`. Nothing makes the later lines depend on it. A block pasted into bash is read line by line from the paste buffer, so every line runs whatever the guard printed. The prose under each block ("When it printed STOP, do not run the last three/four lines") assumes the human runs the lines one at a time and reads the output in between. The fence invites the opposite. The creation block (`:131-135`) shows the author knew the safe form, because there every step is chained with `&&` behind `test ! -e`.
- *Example, reproduced (scratch check 4 below).*
  - The file holds `["AAAA…A"]`, one key of 43 characters.
  - The retirement block runs as one script. It prints `STOP: fewer than two keys, or not the one-line form`, exits 0 and leaves `["AAAA…A"]]` in the file. `JSON.parse` rejects it.
  - The rotation block's guard has the same flaw. Its realistic outputs stay valid JSON for the one-line and pretty-printed forms. A `[]` file gives `["<new>",]`, which is invalid.
- *Consequence.*
  - The running container keeps the old file through its bind mount (the old inode), so nothing shows at once.
  - The next `loop2-deploy` force-recreates `app`. Pushes to `main` start one automatically. `readSecrets` (`src/server/configuration.ts:36-78`) then throws `Invalid or unavailable account configuration: LOOP2_SESSION_SECRET_FILE`, health fails and the deployment ends with exit 8. Exit 8 is documented as possible partial availability.
  - Recovery needs the human to rebuild the file from the private note. The prose then says "Update the private note". A human following it after the block has run copies the broken content into the note too. The key text is still recoverable from it, but only by hand.
- *Grade.* Important, not Critical: no data is lost, and the outage needs the human to run the retirement on a one-key file (or the rotation on an unexpected form). It blocks because the defect is in the safety mechanism the task asked this slice to provide (To do 16). The guard claims to protect and does not.
- *Possible fix* (`:178-185`, the same shape for rotation):

  ```sh
  f=/etc/loop2/session-secrets
  ( umask 077
    current=$(cat "$f") &&
    case $current in '["'*'","'*'"]') ;; *) echo "STOP: fewer than two keys, or not the one-line form"; false ;; esac &&
    tmp=$(mktemp /etc/loop2/.session-secrets.XXXXXX) &&
    printf '%s]\n' "${current%,\"*}" > "$tmp" &&
    chown root:1000 -- "$tmp" && chmod 0440 -- "$tmp" && mv -T -- "$tmp" "$f" )
  stat -c '%U %g %a' "$f"
  ```

  The subshell also keeps `umask 077` out of the human's root shell; today `umask 077` at `:151` and `:179` stays set for the rest of that session. Then drop the "do not run the last N lines" sentences, or reword them to "nothing was changed".

