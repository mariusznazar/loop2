# Blocking findings — review of the whole change, in the reviewer's words

From `reports/whole-review-report.md`, head `d8b14826d0d7aab5c524c9b4d45123990cec2b8d`.

### I1. The launcher says PASS and exit 0 when it could not tell that its volumes are gone

- **From:** slice 5, commit `46614c6`. This review is its only one.
- **Place:** `scripts/restore-trial.mjs:492-530`, the listing at `:500-512`; the contract at `:27-28`.
- **What is wrong:** `cleanup()` reads no status. `rm`, `volume rm`, `ps` and `volume ls` may all fail; a failed listing has empty output, so `left` is empty, the first attempt returns "nothing left", and the verdict stands. Exit 4, "a container or volume could not be removed and is named", is reached only while Docker still answers.
- **Why it matters:** the data volume holds the plain database, every address and password hash. To do 5 ends in removing the backup from the computer, the plan's Goal says "after every end", and step 8 of the skill's trial removes only the files it names, so the owner has no other sign. This repository's rule is that a check that did not run is never a pass. A daemon that stops or restarts between the probe and the cleanup is enough.
- **Evidence:** a run of the launcher in `node:24-slim` with a stand-in `docker` that answers the trial and fails every removal and listing with "Cannot connect to the Docker daemon": `PASS`, `launcher exit 0`.
- **Fix:** a listing that did not exit 0 means unknown, not empty: exit 4, naming what was made. One test with a stand-in `docker`.

### I2. The trial's procedure cannot show that it ran the same commit

- **From:** spans slice 5 (`46614c6`) and slice 6 (`0ea27e1`). Regraded from M3 of slice 6's first review.
- **Place:** `.claude/skills/loop2-deploy/references/backup_and_restore.md:212`, and its copy in `.agents`; `scripts/restore-trial.mjs:358-364`; `Dockerfile:15`.
- **What is wrong:** step 4 reads "Build the image from a clean checkout of the same commit: `docker build -t <image> .`". No commit stands before it, and without `--build-arg LOOP2_COMMIT=<sha>` the label reads `unknown`, so the launcher prints `image revision: unknown`. Slice 5's report says that line exists "so H3 can tie the run to the commit"; the skill's command defeats it. The launcher's test builds with the argument, so it does not show this.
- **Why it matters:** "uruchomienie tego samego commitu" is part of what To do 5, settlement 12 and D-220's *complies* call a checked restore. H3 runs once, its report goes into the request's record at step 7, and with H2 it clears `account-save-backup`. A record reading `unknown` proves no commit, and a build at another commit passes unnoticed.
- **Evidence:** the lines above; `tests/deploy/test_restore_trial.py:298-300` passes the argument.
- **Fix:** name the commit, the head H5 deployed, and give `docker build --build-arg LOOP2_COMMIT=<sha> -t <image> .`, with a sentence that the report's revision must read that sha.

### I3. The skill restates D-218 without its qualification and D-13 more broadly

- **From:** slice 6, commit `0ea27e1`; the first half meets slice 1's command. Regraded from M7, under WAY-263: both entries are this change's.
- **Place:** `backup_and_restore.md:31-32` and `:23`, both copies.
- **What is wrong:**
  - `:31-32` says "so the plain database exists only inside the pipe". D-218 says "exists on the host only in that pipe", and D-217 says it rests in the container's writable layer for the run.
  - `:23` says "The key and the known-hosts file are secrets or access values (D-13)". D-13 does not name that file, and `:117` of the same file rightly calls its fingerprint no secret.
- **Why it matters:** the first is more than wording. A run killed by a signal leaves the plain database in the container's `/tmp` until the container is replaced (Minor 1), and the one reference a human reads says no such file can exist, so nobody looks. The second cites a decision for what it lacks and contradicts its own file.
- **Evidence:** in a container of this head, a SIGTERM to the command while it streamed: `command exit 143`, and `/tmp/loop2-backup-*/backup.sqlite` stayed, 6 225 920 bytes, directory 0700, file 0644.
- **Fix:** "exists on this host only inside the pipe; in the container it lies in `/tmp` for the seconds of the run, and a killed run can leave it there until the container is replaced". `:23`: the key is a secret (D-13); the known-hosts file holds none.

### I4. The command's guard is cited to decisions that do not hold it, and no entry holds it

- **From:** spans slice 1 (`49bfb74`), slice 7 (`d8b1482`) and the plan's *Foundation entries* (E4). It takes up Minor 3 of slice 1's first review and Minor 3 of its fix review.
- **Place:** `guidelines/testing.md:168`; `src/server/account-backup.ts:16-18`; D-217 and D-222 in `foundations/decisions.md`.
- **What is wrong:**
  - The guideline's row reads "Odmowa polecenia kopii bazy (D-217, D-222; bez niezmiennika)". Neither names the fixed word or any refusal, and `:156` of that guideline says "Oczekiwanie bierze się z decyzji uprawnień".
  - The code's comment cites D-217 for removing the directory "on every end". D-217 says no such thing, and I3's run disproves "every end".
  - Spec decision 2's fixed word and its "Only a human or the installed backup script runs the command" stand only in the skill. A search of `foundations/decisions.md` finds neither. D-137 holds exactly this for the block command, with a *violates* line for an agent running it through the `mikrus` MCP server. D-12 forbids an agent changes, not reads, and no entry names this command, so only the skill keeps an agent from sending every address and hash into its transcript.
- **Why it matters:** this is F3's fault again, which slice 1's review graded Important: a restatement broader than the entry (WAY-263). The rule "the command prints nothing without one word" guards the widest read of player data in the product, and once `.runs` is gone a reader following either citation finds nothing.
- **Evidence:** the texts of D-217 and D-222 at this head; the search named under *Checks*; slice 7's report, which names the citation as a choice.
- **Fix:** through `the-way-record-decision`, D-217 or an entry of its own gains the fixed word, the refusal before the database opens, and who may run the command, with D-137's *violates* line. The comment then says what the code does: a failure and a reader that goes away, not "every end". This may come with the return step's entries, but the row and the comment are false until it does.
