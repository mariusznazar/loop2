PASS ca9e7df02661a4d78c4a7bb5f959cedc1fc44219

# Review of the fix of the return step — task kopia-bazy

Range `687495a..ca9e7df`, two commits, three files. `git rev-parse HEAD` is the head given; the worktree is clean. Blocking: 0. Minor: 3. Out of scope: 3 (the lines of *Declined to judge*).

## The findings

### I1 — fixed

`foundations/decisions.md:4018-4021`, D-217 *Rationale*, now reads: "Opening the database prunes expired sessions and links, as the server does every minute, and a run holds the plain database for its seconds in the container's writable layer, so the command is a change D-12 keeps from an agent, and the rule on who runs it also keeps that output out of an agent's session."

The defect no longer exists. The premise agrees with `src/server/database.ts:176-177` and `src/server/account-backup.ts:61-62`, and the conclusion now follows from it and agrees with D-12 at `:255-256`. No use of "changes nothing a player" or "changes nothing on the server" is left in tracked files outside `.the-way`. D-217's binding sentences, *Based on* and *Verification* are untouched by this fix.

### I2 — fixed

The overstatement is gone from all three places it stood:

- **Binding sentences**, `:4228-4234`. "alone" is gone. The options "win over any SSH configuration for those options", and "so a host whose key that file does not hold fails the send" now stands behind a stated condition: root's SSH configuration and the system-wide one set neither `KnownHostsCommand` nor `VerifyHostKeyDNS`. Three binding sentences, the template's limit.
- ***Rationale***, `:4247-4251`. "no configuration changes what the script gives" is what `openssh-option-order` carries. The two options are named as what the script does not give.
- **The comment**, `deploy/loop2-backup:228-231`, says the same and cites D-224.

The sentence "those options win" holds for `BatchMode`, `StrictHostKeyChecking`, `UserKnownHostsFile` and `GlobalKnownHostsFile`, which is what `deploy/loop2-backup:235` gives. *complies* and *violates* follow the bound meaning, and the *violates* example is a change an agent can compare, as the template asks. The author contested neither finding.

## The fix diff

- **No behaviour moved in `deploy/loop2-backup`.** The diff is 4 lines added and 2 removed, all comments. With comment lines dropped, base and head are byte-identical (212 lines each, `cmp` exit 0). `bash -n` and the gate's ShellCheck command exit 0. Nothing in tracked files cites a line number of this script.
- **`openssh-extra-host-key-sources`** is sound as the fact D-224's new sentence needs. Its three passages stand word for word in `ssh_config.5` at `166456ce`. The sentence says no more than they do, and it keeps "set to `yes`" and the default. D-224's *Based on* names it, so it has a reader. The fix handoff did not name it; the template's rule on *Based on* required it.
- **No new blocking finding.** No server name, login, port, fingerprint or address in the added lines but the document address `wiki.mikr.us`. No forbidden word outside a quoted passage, and no noun `copy`. `foundation_check.py` shows 0 errors. The report's ranges are right.

## Minor

None of these reopens the review.

### N1. D-224 now declares a setting of the host and rests on no reading of it

**Place.** `foundations/decisions.md:4231-4232`, `:4238`; `reports/return-fix-report.md:42-49`.

**What is wrong.** The environment-facts template, under WAY-84: the current state of a setting people change outside the repository "is a fact, its source the place where that state is shown", and a decision that declares such a setting "rests on the fact". D-224's second sentence now declares that state, and the orchestrator read it, but no fact holds the reading. The author left it to the request, which the handoff allowed, on two reasons, neither of which stands:

- "I hold counts only." A count is a usable output: `loop2-host-forced-command-entry` is a `python3` command printing a count, a reading of a file that holds private values. The orchestrator holds the command and its output.
- "H2 changes root's file anyway, so a fact on it would go stale at once." H2 writes only the login and the path of the key, so a sentence that the file sets neither option stays true after H2.

**Why it stays Minor.** The sentence is true on the evidence the orchestrator gives, it states a condition rather than a guarantee, and the request carries the reading to the human. **Left as it is:** the log holds a condition on the host with its evidence only in a closed request. **Fixed:** one fact, in the form of `loop2-host-installed-command`, from the orchestrator's exact command and output. It would name no server, and it would have to carry no login.

### N2. D-224's "so" reads as if the two options were the only ones

**Place.** `foundations/decisions.md:4231-4233`.

**What it is.** Two more options can bypass the host-key check, neither of them named.

- `NoHostAuthenticationForLocalhost`, flagged by the author. It reaches a connection only to a loopback address, so it needs a `Hostname` that D-224's *complies* already keeps out of root's entry.
- `GSSAPIKeyExchange`, which the author could not have seen, because the cited source is upstream's manual. The server's build is Ubuntu's, and its manual at `applied/ubuntu/jammy-updates` adds: "When using GSSAPI key exchange the server need not have a host key."

**Why it stays Minor.** The second defaults to `no` and needs a Kerberos realm that neither end is said to have, so neither is a way for a stranger answering on the shared name to be trusted. I checked the rest of the option list of the host-key kind: `HostKeyAlias`, `CheckHostIP`, `RevokedHostKeys`, `ProxyCommand`, `ProxyJump`, and `UpdateHostKeys`, which accepts keys only from an already trusted host. None widens the check. **Cost:** nothing needs doing; naming it in the request is enough.

### N3. The skill does not say what D-224 now rests on

**Place.** `.claude/skills/loop2-deploy/references/backup_and_restore.md:115-116`, and its identical copy. Outside the fix diff. The step writes only the login and `IdentityFile`, so it complies with D-224. A human adding anything else to root's file has no sentence warning against the two options. The author names this too.

## Declined to judge

- The Minor findings M1 to M6 of the first review: not in the findings file, so not fixed, and `fix.md` does not reopen them. D-224's *Based on* and "deletes nothing" stand as M5 left them.
- D-12's second sentence against the nightly run, now that D-217 calls the command a change: the sentence speaks of an agent, and a schedule a human installed is that human's act under D-217, as the game's own writes are no one's change; nothing here reads as a collision.
- The orchestrator's reading of root's SSH configuration through the `mikrus` server, whether it stands on the skill's allowed list of reads: it is no change of this range, and I did not repeat it.

## Checks

| Command or method | Result |
|---|---|
| `git rev-parse HEAD`; `git status --short` | `ca9e7df…`; no output |
| `git diff 687495a..ca9e7df` | read whole |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| `git show <sha>:deploy/loop2-backup`, comment lines dropped, `cmp` of base and head | exit 0, 212 lines each |
| `bash -n` on the head's script | exit 0 |
| `.runs/quality-venv/Scripts/shellcheck.exe --norc --shell=bash --extended-analysis=true deploy/loop2-backup` | exit 0, no report |
| `python -I quotes.py`, passages against raw text, now with the new fact | exit 0: `openssh-extra-host-key-sources` 3 of 3; the others as in the first review |
| `git grep` for the old claims, for line references to the script, and for the two options | as above |
| `grep` of added lines for addresses, forbidden words and `copy`, the pattern's positive control as in the first review | as above |
| `curl` of Ubuntu's `ssh_config.5` at `applied/ubuntu/jammy-updates` | HTTP 200, 65 966 bytes; read as data |
| `cmp` of the two copies of `backup_and_restore.md` | exit 0 |

Not run: the full `npm test`, the orchestrator's gate; `npm test -- tests/deploy/test_loop2_backup.py`, since the script's code is byte-identical and the author reports 26 tests OK; `ssh -G` on 8.9p1, not installed here; anything on the server or Strych; H5, H2, H3. No process of mine is left running.

## Reaches beyond the dispatch

- `foundations/environment_facts.md`, `loop2-host-forced-command-entry` and `loop2-host-installed-command`: the form of a reading, for N1.
- `.the-way/elements/environment-facts/template.md`: WAY-84, for N1.
- Ubuntu's `ssh_config.5`, for N2: the cited manual is upstream's and the server runs Ubuntu's build.
- Strych's page, the form of its SSH entry, and `references/backup_and_restore.md:112-118`: root's entry as D-224 now describes it.

## Searches not found or unclear

- The orchestrator's reading itself: root's file, `/etc/ssh/ssh_config` and `/etc/ssh/ssh_config.d/`, and the client's version. Not repeated; the server is out of bounds, so it stands as reported, and the exact command is not in any report I read.
- Which Ubuntu package revision the server has: `jammy-updates` is a moving branch, read once on 2026-10-31 and used for N2 alone, so it is no source for an entry.
