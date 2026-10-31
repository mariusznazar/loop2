# Blocking findings — review of the return step, in the reviewer's words

From `reports/return-review-report.md`, head `687495a9735ef1138ad99941daf140be51cb6ca3`.

### I1. D-217's corrected sentence keeps the conclusion of the sentence it was to correct

**Place.** `foundations/decisions.md:4018-4021`, D-217 *Rationale*, commit `45d795c`. Owed by item 4 of the return handoff.

**What is wrong.** The old sentence was "Running the command changes nothing on the server, so the limit on changes of D-12 does not reach it". The whole review found the premise false: opening the database prunes rows. The new sentence is:

> Opening the database prunes only the expired sessions and links the server itself prunes every minute, so the command changes nothing a player can see, the limit on changes of D-12 is not what keeps an agent from it, and the rule on who runs it is what keeps that output out of an agent's session.

The premise changed and the conclusion stayed. D-12 has no such measure as "a player can see". It reads: "An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human." The command does change the server: `src/server/database.ts:176-177` deletes rows, and `src/server/account-backup.ts:61-62` writes a plain database file into the container's writable layer, as D-217's own *Rationale* says at `:4009`. So D-12 does reach the command, and is one of the things that keep an agent from it. D-217 also `derives from D-12`.

**Why it matters.** The template gives *Rationale* its reader: "the agent in a borderline case". This sentence tells that agent that a run through the `mikrus` MCP server with changes no player sees stands outside D-12. Nothing stops this run today, because D-217's binding sentence names who runs the command. The harm is the precedent it sets for the next command of this kind, against the rule that limits what agents do on the server. It restates a decision the entry derives from without that decision's reach, which is the case of WAY-263, and it is item 4 only half done: the figure is right, the sentence is not.

**Evidence.** D-12 at `foundations/decisions.md:255-256`; the code at the lines above.

**Left as it is:** the log says D-12 does not bar a change a player cannot see, and a later agent or a human at the merge reads that as settled. **Fixed:** one sentence, no code. For example: "Opening the database prunes expired sessions and links, as the server does every minute, and a run holds the plain database for its seconds in the container's writable layer, so the command is a change D-12 keeps from an agent, and the rule on who runs it also keeps that output out of an agent's session."

### I2. D-224 says nothing in root's configuration loosens the host-key check; its own source shows two options that do

**Place.** `foundations/decisions.md:4244-4245`, D-224 *Rationale*, commit `b25bde1`, and through it "alone" and "so a host whose key that file does not hold fails the send" at `:4229-4231`. The code's comment at `deploy/loop2-backup:228-229` says the same; that file is outside this range.

**What is wrong.** "Options on the command line come before every SSH configuration, so nothing in root's configuration loosens the host-key check". First-value-wins protects only the parameters the command line sets. `deploy/loop2-backup:233` sets `BatchMode`, `StrictHostKeyChecking`, `UserKnownHostsFile`, `GlobalKnownHostsFile` and `ConnectTimeout`. It sets neither of these, and the manual page the two new facts cite gives both:

- `KnownHostsCommand` — "Specifies a command to use to obtain a list of host keys, in addition to those listed in UserKnownHostsFile and GlobalKnownHostsFile." (`ssh_config.5` at `166456ce`)
- `VerifyHostKeyDNS` — "If this option is set to yes, the client will implicitly trust keys that match a secure fingerprint from DNS."

Either line in root's configuration, or in the system-wide file, widens what is trusted beyond the one compared line.

**Why it matters.** This is the trust boundary of the task's key to Strych, and the sentence is the guarantee D-224 was written to hold. The author's own-work check names this kind of fault as the one most likely missed: "a binding or sourced sentence saying more than its source". An entry that promises more than the code does at a trust boundary is the case of WAY-263. No procedure writes either option: the skill's step 5 writes only the login and `IdentityFile`, `VerifyHostKeyDNS` defaults to `no`, and `KnownHostsCommand` acts only when set. So this is an overstated guarantee, not a hole shown on the server. Whether the server's files hold either option I could not read.

**Evidence.** `ssh -G -F <scratch config> -o BatchMode=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile=/etc/loop2/strych-known-hosts -o GlobalKnownHostsFile=/dev/null -o ConnectTimeout=30 backuphost`, with a config file setting all of `KnownHostsCommand`, `VerifyHostKeyDNS`, `StrictHostKeyChecking no` and another `UserKnownHostsFile`. Output: `stricthostkeychecking true`, `userknownhostsfile /etc/loop2/strych-known-hosts`, `globalknownhostsfile /dev/null`, and also `knownhostscommand /bin/true`, `verifyhostkeydns true`. Run on the local OpenSSH_10.3p1; the host's 8.9p1 is not here, and its manual says the same.

**Left as it is:** a reader at H2, or a later agent, takes root's configuration as unable to affect the check. **Fixed by wording:** one clause, no code, and nothing changes before H2: the options given there win for those options, and the check rests on root's configuration holding only the login and the key. **Fixed by code:** two more options on the command line, which closes the gap but changes a script with its test and review, and whether `none` is accepted for `KnownHostsCommand` on 8.9p1 I did not establish. I recommend the wording.
