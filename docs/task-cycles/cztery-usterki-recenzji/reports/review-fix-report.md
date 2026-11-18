PASS f775999abd6a99a4fda276d51aa9ff327a5a3c24

# Review of the fix — cztery-usterki-recenzji

Range `b76678a7..f775999a` (commits `ec7004e1`, `f775999a`); `git rev-parse HEAD` =
`f775999abd6a99a4fda276d51aa9ff327a5a3c24`. Bounded by `reports/whole-review-findings.md` (I-1, I-2,
M-1, M-2, M-3) and the orchestrator's choices of ways (I-1 (a), I-2 (a), M-2 one sentence back).

Counts: remaining blocking 0; new Minor 1 (within the task); out of scope 0.

## The findings

**I-1 — fixed.** D-112's third paragraph (`foundations/decisions.md`, "Beyond the rules above, the
blocking command of D-137 and the backup command of D-231 never set up a new database: … The commands
of D-400 and D-410 are not bound by this: they still set up a new database in a file that holds
none."), its *Rationale* ("The blocking command and the backup command never set up a new database,
because …; the commands of D-400 and D-410 still do."), the comment of `existingOnly`
(`src/server/database.ts:211-214`) and the exit-3 clause of both skill copies now state the rule for
the two commands and name the two that do not keep it. The first paragraph's "under the same rules"
stays, and "Beyond the rules above" makes the third paragraph an addition to it rather than a
contradiction. No other place holds the broad sentence (`grep` of `Only the server sets up`: none).
The way bound by the handoff, (a), was taken; `account-role` and `account-previous-save` were not
given `existingOnly`. See N-1 for one clause of the new text that is broader than the code.

**I-2 — fixed.** `src/server/account-block.ts:37-40` and `src/server/account-backup.ts:45-48` hold
`noFileSentence` (missing file, the old words) and `noTablesSentence` ("LOOP2_DATABASE_PATH names a
file that exists but holds no account database set up by the server. Nothing changed." / "… Nothing
was written."), the latter used only for `NOT_ACCOUNT_DATABASE`; both exit 3. Tests now assert the
new sentence and the absence of "names no existing" for the empty, non-SQLite and foreign files, and
the old sentence with exit 3 for every missing-file target (block: unset, empty, `:memory:`, absent
path — `tests/account-storage.test.mjs:3602-3620`, where `notEqual(code, 0)` became `equal(code, 3)`,
a stronger check; backup: the six targets of "a missing database file creates nothing …"). D-112's
*Rejected* clause "which the message already says" is true of the code now. The skill's exit-3 clause
and row 6 of `references/backup_and_restore.md` (both copies) name the two sentences and agree with
the code.

**M-1 — fixed.** D-153's last sentence of *Rationale* is "That both message types reach an external
mailbox is checked by no test: a person checks it (D-163)." — no reference to a clause the
*Verification* no longer holds.

**M-2 — fixed (one sentence back).** "The game's log holds, for each kind of message, the events
`link-issued` and `message-sent` and no line `"failure":"mail"`, which shows that the application
handed both kinds of message to the mail service without a failure; it does not show which of them
were his, and arrival is his observation." Checked against `foundations/environment_facts.md:888-898`
(`loop2-app-log-password-reset-mail-events`, `loop2-app-log-confirmation-mail-events`): both facts
hold those two events for their purpose and no `"failure":"mail"` line; the sentence gives no date, so
it does not touch the unknown date of the reset attempt that point 7 commands. *Based on* now has its
text.

**M-3 — fixed.** D-431's *Rationale* records the risk ("Risk taken, a hypothesis …: the channel
`net.server.socket` of `node:diagnostics_channel` … is marked by the documentation of Node.js 24 as
Stability 1, experimental; a release that renames or drops it makes every start fail … with the
failure `SERVER_NOT_READY` …"), in the form D-229 and D-255 use. The author reports reading the Node
24 page; I did not reread it (see Searches).

## New finding in the fix diff

### Minor

**N-1. D-112 and the skill say the commands of D-400 and D-410 set up a new database in every file
that holds none; for a file that is no SQLite database they fail instead.** Within the task (it is
the wording of I-1's fix). Places: D-112 third paragraph, "they still set up a new database in a file
that holds none" (`foundations/decisions.md`, third paragraph of D-112); `.claude/skills/loop2-deploy/SKILL.md:556-557`
and the `.agents` copy, "the commands `account-previous-save` and `account-role` do not refuse such a
file, and set up a new database in it", where "such a file" includes one that "is no SQLite
database"; and the comment at `src/server/database.ts:213-214`, "the commands of D-400 and D-410
still set up a database in such a file". Evidence: at head, `node dist/server/account-role.js owner a@example.test` on a 37-byte
non-SQLite file ended with exit 1, the JSON line with `errcode` 26 and the old sentence with "run the
command again", and the file stayed 37 bytes; on an empty file (previous round) it set up a 65 536-byte
database. So the description holds for an empty file and a SQLite file with no schema version, not
for a file that is no SQLite database. Graded Minor, not Important: the sentence describes a gap left
for a follow-up task, not a rule the change's code must keep, and the code errs on the safe side (it
writes nothing into that file); a reader is misled only about which of the two failure modes the role
and privilege commands show for a non-SQLite file. Fix: "in an empty file or a SQLite database with no
schema version" in the three places, or leave it to the follow-up task that gives those commands the
refusal.

## Fix diff otherwise

- The two skill copies are identical (`diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy`
  clean), and `tests/agent_workflow/test_loop2_deploy_skill.py` passes.
- The nightly backup script is untouched (`deploy/` not in the diff) and still reads neither a code
  number nor a sentence: `deploy/loop2-backup:205` fails stage 6 on any non-zero status of `docker`
  or `age`.
- Trust boundary: the new sentence holds no path, file name or SQLite text; tests keep the
  `secret-name|not a database` assertions; nothing is written in a refused file (byte and listing
  checks unchanged and green).
- The three `decision:` lines changed to the new D-112 sentence quote its start, and
  `foundation_check.py` reports 0 errors.
- D-112, D-153, D-431, the skill and the backup reference agree with each other and with the code,
  apart from N-1.

## Checks

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `f775999a…` |
| `node scripts/build.mjs` (worktree of head) | 0 | |
| `node --test tests/account-storage.test.mjs` (head) | 0 | 92 pass |
| `node --test tests/account-backup.test.mjs` (head) | 0 | 12 pass |
| `node --test tests/account-owner.test.mjs tests/startup.test.mjs` (head) | 0 | 31 pass |
| `npx prettier --check` on the 3 changed sources and 2 changed tests (head) | 0 | |
| `npx eslint` on the same files (head) | 0 | |
| `python -B -m unittest test_loop2_deploy_skill` (head, `tests/agent_workflow`) | 0 | 5 tests OK |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, read-only) | 0 | 0 errors |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` (reviewed worktree) | 0 | identical |
| `node dist/server/account-role.js owner a@example.test` on a non-SQLite file (head) | 1 | errcode 26, file unchanged — N-1 |

Not run: the full gate (the orchestrator's); `tests/invariants/test_local_start_access.py` (the fix
changes only D-431's prose there; the whole file ran green at `b76678a7`); the Docker tests.

## Reaches beyond the dispatch

- `foundations/environment_facts.md:888-898` — the two facts, for M-2.
- `deploy/loop2-backup` (grep of stage 6) — the handoff's check that the script reads no sentence.
- `src/server/account-role.ts` through its built command — for N-1.

## Working copies

- A worktree of `f775999a` at `.runs\review-fix\head`, with a junction `node_modules` to the reviewed worktree's: the junction removed first (link only), then `git worktree remove --force` and `git worktree prune`; removed.
- Test outputs, the foundation-check output and the non-SQLite probe file under `…\.runs\review-fix\`: removed; the directory is empty.
- The reviewed worktree: `git status --short` empty.

## Unread material

Bounded by the findings file, as `fix.md` gives. Read whole this round: the findings file, the fix
report, the fix diff, the new and changed sentences of D-112, D-153 and D-431, both skill copies' changed
clause and row 6 of the backup reference. The decisions and guidelines of my selection in the review
of the whole change were not reread; D-112, D-153 and D-431 were read only in their changed passages
this round, the rest of each as read in the review of the whole change. Not read: `reports/fix-handoff.md`
beyond what the handoff quotes of it.

## Searches not found or unclear

- The Node 24 documentation page the author cites for M-3: not reread by me; the risk sentence is
  checked for form and against the code, not against the page.
