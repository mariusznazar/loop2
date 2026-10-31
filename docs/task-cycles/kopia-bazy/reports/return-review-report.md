FAIL 687495a9735ef1138ad99941daf140be51cb6ca3

# Review of the return step — task kopia-bazy

Range `eb4ece0..687495a`, five commits, three files, all under `foundations/`. `git rev-parse HEAD` is the head given. Blocking: 2. Minor: 6. Out of scope: 5 (the lines of *Declined to judge*).

## Important

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

## Minor

### M1. `docker-build-cache-invalidation` lacks the passage D-223's "first build of a commit" rests on

**Place.** `foundations/environment_facts.md:382-386`; `foundations/decisions.md:4206`, `:4213-4215`.

**What is wrong.** D-223 says "Docker reruns the build step when the base image or the built code changes" and then "the release shows in the deployment's log at the first build of a commit". What reruns the step on a new commit with unchanged code is the build argument `LOOP2_COMMIT`, not the code. `reports/slice-2-review-report.md:64-72` shows it: a new value with the same code reran the step while the `COPY` steps stayed `CACHED`. The same page of the fact holds the passage, unquoted: "Build arguments do result in cache invalidation." (section *Build secrets*). The fact says `COPY` is checked "by file metadata", so "the built code changes" is also a little more than the fact gives. *complies* at `:4206` is true of a repeat of one commit only.

**Why it stays Minor.** "A cached step means the same release and code passed" holds. Item 7 of the handoff asked for this kind of source, and nothing behaves wrongly. **Cost:** one passage in the fact, a clause in the *Rationale*.

### M2. `node-sqlite-database`'s new clause is the documentation's, and the release behaves otherwise on the last step

**Place.** `foundations/environment_facts.md:252`; `src/server/database.ts:609-616`.

**What is wrong.** The clause "calls an optional `progress` callback after each backup step" quotes the documentation exactly, but `progress` is not called after the last step: a one-step backup calls it no times, and a backup at `rate` 100 of 1004 pages called it 10 times, the last with 4 pages remaining. The same on local Node.js 24.17.0 and on the local `node:24-slim`.

**Why it stays Minor.** The fact says what its source says, and `backupTo` counts correctly either way: it starts at 1 and adds only for `remainingPages > 0`. Item 6 said "the step count rests on it"; the code in truth rests on less than the fact says. **Cost:** nothing needs doing beyond naming it.

### M3. Two facts' sentences drop a qualification of their source

**Place.** `foundations/environment_facts.md:378` and `:390`. The template: "The sentence says no more than its source says".

- `cron-d-file-rules` states the naming rule flatly. The next sentence of the manual: "If the -l option is specified to cron ... then they must conform to the LSB namespace specification".
- `openssh-strict-host-key-checking` says `no` "lets connections to changed host keys proceed". The source adds "subject to some restrictions". It also says "never adds" where the source says "never automatically add".

**Why it stays Minor.** The product uses neither `-l` nor `no`, and `loop2-backup` passes either naming rule. **Cost:** a few words.

### M4. `openssh-option-order` names two sources of configuration its passages do not quote

**Place.** `foundations/environment_facts.md:396-398`. The sentence names "the user's configuration file and the system-wide configuration file"; the *Source* quotes only the first list item, "command-line options". The other items exist in the same list, "user's configuration file (~/.ssh/config)" and "system-wide configuration file (/etc/ssh/ssh_config)". **Cost:** two passages.

### M5. D-224's *Based on* quotes a passage no sentence of D-224 rests on, and misses those it does

**Place.** `foundations/decisions.md:4235`, `:4249`.

- "IdentityFile /backup_key" is on the page as quoted, but D-224 says nothing of the identity file; D-13 holds it. "Into the home directory" rests on the same page's `rsnappush /etc strych.mikr.us:~/`, which is not quoted, and on the trial.
- *Rejected* rests on `https://mikr.us/tools/rsnappush`, not cited. Read raw, its main command holds `--delete` (line 75), aimed at a fresh directory, so no older backup goes. The task's words were "narzędzie nie kasuje starych kopii"; "deletes nothing" is the broader spec wording. "Leaves older backups in place" says what the source shows.

**Cost:** a line of *Based on*, three words.

### M6. D-223's "no server image exists" does not hold across a rollback past this change

**Place.** `foundations/decisions.md:4210`. D-15 lets a human deploy any earlier commit, and a commit from before this change builds an image without the step. Slice 2's reviewer set this aside when no entry made the claim; D-223 now makes it unqualified. It stays Minor because it holds only while such a rollback is a live option, and the skill already names what that rollback costs (`references/troubleshooting.md:106`). **Cost:** a clause.

## Judgements the handoff asked for

- **55 of 94 decisions read.** It holds for the entries written, though step 2 of "Reading the foundation" was not met and the report says so. My own search of the whole log for pins, digests, base image, `node:24`, build cache, SSH, host keys, known hosts, cron and `rsnappush` found D-10 (the connector's pin, a different image), D-13, D-15, D-16, D-17 and nothing colliding with D-223 or D-224. I read the 39 unread headings, and whole those near the entries: D-01, D-06, D-114. `account-server-runtime` asks for the major version only, which an unpinned `node:24-slim` meets. No repeat of the search is needed for these entries. No finding.
- **The cron manual's NOTES.** Read raw at lines 108-109: "In general, the system administrator should not use /etc/cron.d/, but use the standard system crontab /etc/crontab." The author's judgement stands. It is advice, the same manual gives the directory's rules, and the template says that where a source recommends the sentence does not require. It does not contradict what the change rests on, because D-217 binds "a schedule" and no entry binds the directory. Worth one line in the request for the human. No finding.
- **`account-save-sqlite-upgrade`.** The link is sound. The fact holds a condition deciding whether a commit makes the sentence true, namely what a cached step means. The task left *Rests on* to the cycle, and the sentence is word for word the task's.
- **Quotations.** Every passage of the four new facts, `progress`, and D-224's quotation stands word for word in the raw source. The one miss of my script is the roff join `.IR run-parts "(8) :"`, read by eye at `cron.8:269-277`. `version.h` at `166456ce` gives OpenSSH 8.9 p1. The archived Strych page exists and holds the passage. What the quotations leave out is M1, M3 and M4.

## The handoff's other checks

- **Items 1, 2, 3, 5, 6, 7:** written, and each matches the spec's decision, with M1 and M5 as noted. Item 4: the figure is right (58 MiB at `spec.md:62`, 74 984 KiB at `slice-1-review-report.md:46`); the sentence is I1.
- **Entries against code:** D-223 against `Dockerfile:14-29`, `account-database-check.ts`, `compose.yaml` and `deploy/loop2-deploy:309-314`. D-224 against `deploy/loop2-backup:231-234`. The schedule, the 900-second wait and the three pairs: all match, apart from I1 and I2.
- **Trust boundary and irreversible operations:** no entry has an agent perform anything, and every act on the host is a human's. The scan of added lines found no server name, login, port, fingerprint or address but the document address `wiki.mikr.us`; its pattern found `strych.mikr.us` in `deploy/loop2-backup` as a positive control.
- **Form:** new numbers are the next free, entries stand at the end, facts before the withdrawn list. No *should*, *will* or capitalized keyword in the added entries' own text. The scan's hits are quoted passages, the lower-case `may` in D-223's *Rationale* and the `must` of the cron fact's sentence, which repeats its source; none breaks the template. The noun `copy` does not occur: the hits are Docker's `COPY`.
- **Own-work check:** the requirement fits, but the check compares passages with raw sources and scans words. It cannot see an inference that goes beyond its source, which is what I1 and I2 are. The check would pass them, and did.
- **Invariant tests changed:** none. *Violated* on `account-save-backup` stays `yes`.

## Declined to judge

- `deploy/loop2-backup:229`, the comment repeating I2: code outside this range, named there.
- D-215's *Verification* overlapping D-223: D-215 stands whole by the handoff's bound answer.
- Minor findings of earlier reviews, `copy` in `account-database-check.ts` among them: they stay out by the handoff.
- Whether `/etc/cron.d` starts this file, and which `cron` and OpenSSH packages the host really has: the server is out of bounds; H2.8's.
- `docker exec`'s exit status: no passage, confirmed below; no fact can be written, and H3 holds the real path.

## Checks

| Command or method | Result |
|---|---|
| `git rev-parse HEAD`; `git diff eb4ece0..687495a`; `git log` | exit 0; head as given; three files |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | exit 0; both `a8dfe8ac` |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| `curl` of the raw sources: `cron.8`, `invalidation.md`, `ssh_config.5`, `version.h`, `sqlite.md`, Strych's page and archive, `rsnappush`, Docker's `container_exec.md` | each HTTP 200 |
| `python -I quotes.py`, passages of five facts against raw text | exit 0: cron 2 of 3 (the miss above), Docker 4 of 4, strict 5 of 5, order 3 of 3, Node.js 10 of 10 |
| `node --no-warnings progress.mjs`, Node.js 24.17.0 | exit 0: `rate` max, 0 calls; `rate` 100, 10 calls, last `[4,1004]`; `rate` 2^31 refused |
| Same by `docker run --rm -i --memory=256m --network=none node:24-slim` | exit 0, same result; no image built |
| `ssh -G -F <scratch config> ...`, OpenSSH_10.3p1 | exit 0, as in I2; no connection made |
| `grep` of added lines for forbidden words, `copy`, addresses, with a positive control | as under *Form* and *Trust boundary* |
| `grep` of `container_exec.md` for exit status and bytes | no hit, `exec` hits 28 lines; agrees with the author's search |

Not run: the full `npm test`, the orchestrator's gate; focused tests, since no code or test changed; anything on the server or Strych; H5, H2, H3; `ssh -G` on 8.9p1, not installed here.

## Reaches beyond the dispatch

- D-01, D-06, D-114, in `foundations/decisions.md`, for the judgement on the unread decisions.
- D-104's limit: to confirm the 64 KiB stands there, under a heading that does not suggest it.
- `foundations/part_map.md`, the parts of the entries' *Scope*; `foundations/glossary.md`, `copy`; three invariants' sentences.
- `deploy/loop2-deploy`, `compose.yaml`, `scripts/restore-trial.mjs`, `tests/invariants/test_account_save_sqlite_upgrade.py`: the claims of D-217 and D-223.
- `.runs/.../spec.md`, `reports/whole-review-carry.md`, `reports/slice-1-review-report.md`, `reports/slice-2-review-report.md`: the sources of what was owed.
- `.claude/skills/loop2-deploy/SKILL.md` and `references/backup_and_restore.md`: how D-12 and the root SSH entry are used.
- The owner's `scripts.md`, `search.md`, `playbook_code_review.md`, before scripts and the review.

## Searches not found or unclear

- Whether root's SSH configuration or the host's system-wide file holds `KnownHostsCommand` or `VerifyHostKeyDNS`: not read, the server is out of bounds.
- Whether `none` turns `KnownHostsCommand` off on 8.9p1: the manual passage I read does not say.
- The release of the local `node:24-slim` in the probe: not printed; `slice-2-review-report.md:66` gives 24.22.1 for the image of that review.
- `progress` on 24.21.0, the release the fact names: not run; shown on 24.17.0 and on the local image.
