# Report — revision of the spec, task kopia-bazy

Status: done
Spec: `docs/task-cycles/kopia-bazy/spec.md`, revised once

Check result: the four checks of `design.md` pass and all four review findings are resolved; new local measurements ran in Docker on Node.js 24.22.1; not run: anything on the server or on Strych, anything with `age` or `rsync`, and no test suite, since no code was written.

## Questions sent

None. The handoff `05-spec-revision-handoff.md` answered every open point, and no answer opened a new question.

## Findings of the review

| # | Finding | Binding answer | What changed in the spec |
|---|---|---|---|
| 1 | The skill may not name Strych's host | Way A | Decision 13: no file of the skill names a Mikrus host or address, web pages included, and the skill points to the constants block of `deploy/loop2-backup`. H2.3 in decision 11 takes the host from there. *Left to the maker*: `tests/agent_workflow/test_loop2_deploy_skill.py` only gains the new file in its list, and its pattern stays |
| 2 | The backup log could hold the Strych login | Way A | Decision 8: for the send the log holds the stage and `rsync`'s exit code, and the error text of `ssh` and `rsync` reaches no file. The human's way to the reason is a hand run of the send, in a private terminal, which an agent never makes. Decision 15 gains the sentinel-login test. Decision 13 gains the hand run and its warning |
| 3 | The terminal refusal did not stop the slip it named | Way A | Decision 2: the command needs the one fixed word `--to-standard-output`; without it, or with anything else, it refuses before opening the database and prints nothing. Both wrong sentences are corrected. Decisions 8, 13, 14 and 15 follow |
| 4 | The marker had no place in the human's procedure | Row added | H2.4a in decision 11, before every run whose copy H3 may use: the human gives the name, waits for the automatic save and reloads the page. The name coming back after the reload shows the save finished. Decision 12 points to it |

**The terminal refusal is dropped,** which the handoff left to me. With the fixed word in place, a check inside the container could only ever stop someone who typed both `-t` and the word, and that person has already asked for the output. So it protects nothing further and would be code and a test with no use. The script never uses `-t`, and a test holds that.

I kept the numbering H2.5 to H2.8 and named the new row H2.4a, because the handoff and the first report refer to those numbers.

## What the reviewer left to the orchestrator

- **Reading 1.** *Foundation entries* now says what `foundation_step.md` gives: of a row, the meaning is the row's and the wording the writer's; a projected entry stands whole. The Decision 7 reading and the invariant of settlement 10 now agree: the words name no step that does not exist, and a failed replacement is a failed send.
- **`account-save-backup`.** It is recorded with *Violated: yes*. The mark is cleared only after H2 and H3, by a later commit on this branch, as e95a8b1 did.
- **What names the mark in the request:** *What the foundation puts in front of the human at the merge* (`.the-way/task-cycle/record_template.md:169`–`171`).
- **A rollback to before this change.** Decision 13 now says that the nightly run fails and a message comes each night, and that this is a true alarm. Decision 10 points to it.
- **The figure of about 385 accounts** stays in the spec, for the orchestrator to carry to the request.

## Facts read from the server

All are used as read on 2026-10-30 and dated in the spec.

- Decision 4 and H2.1: `age` is not installed, `apt` offers `1.0.0-1ubuntu0.1`, and the release-binary fallback is gone.
- Decision 6 and H2.3: root's SSH config has no Strych entry, so H2.3 writes it.
- Decision 6: root's default `known_hosts` holds H1's lines, and the design's own file stands.
- Decision 8: the clock reads CET, and the lock is root-owned with mode 640, so the question about the lock closes. The temporary filesystem has about 19 GB free.
- Decision 11: the cron service is active and `/etc/cron.d` exists, and whether a file there really starts stays H2.8's to show.

## Corrections to my first report

Two statements of `02-spec-design-report.md` no longer stand. The spec is corrected.

1. **"Docker's engine is off."** It answers here, 29.7.2. Decision 3 and decision 15 said otherwise and now say so. The container smoke test runs in the gate on this computer.
2. **"`rate: -1` was accepted on this release."** True of 24.17.0 only: 24.22.1 refuses it. Decision 1 rejected it already, so the design does not change, but the review's rerun repeated the same local result.

## New measurements

Not asked for by the handoff. With the engine answering, they replace two gaps my first report had left open. They ran on 2026-10-31 in a disposable container of the local `node:24-slim`, limited to 512 MiB with no swap, using the probe files in `docs/task-cycles/kopia-bazy/design-probe/`. Their databases were removed, and no image was pulled.

- **Node.js 24.22.1, 66 MB database, separate writer process:**
  - Above the page count: finished in 6.1 s, integrity `ok`, no restart, peak 58 MiB, no busy error, writer's longest commit 394 ms.
  - Default `rate`: not finished after 20 s, 18 restarts seen, peak 62 MiB, writer's longest commit 48 ms.
- **The single target file:** whole on its own on 24.22.1 too.
- **`rate: -1`:** refused, `ERR_OUT_OF_RANGE`.
- **`docker exec` without a terminal:** 8 MiB of every byte value arrived with its SHA-256 unchanged, 8388608 bytes, through a pipe in Git's bash.

How far these reach: the database lay on a bind mount of the Windows disk, which explains the slow time and may explain the 394 ms commit. It stayed under the 1000 ms busy timeout, but neither figure is a measurement of the server's Docker volume. The memory figures do carry over; the 58 MiB leaves room inside the roughly 100 MiB left beside the password work. They cover the backup step only, not the streaming to standard output.

## Ways weighed in this revision

- **Findings 1 to 3:** the ways were the reviewer's, and the handoff bound way A in each.
- **The terminal refusal:** keeping it beside the word lost for the reason above.
- **The hand run of the send, within finding 2:** discarding the text in every run won over leaving it on the script's standard error for cron to throw away. That second way would let a human see the reason by running the script, but it hangs on cron's mail staying off: if someone turned the mail on, the login would land in a local mail file.

## The four checks

1. **Placeholders, empty sections:** none; a search finds no `TBD` or `TODO`.
2. **Contradictions:** a search for the replaced sentences finds none left: the engine, "takes no argument", the terminal refusal, the release-binary fallback, "confirms or writes". Every H2 step reference resolves. Against the foundation: D-13's "log" now holds, since no access value enters this log.
3. **Several independent changes:** unchanged. To do 6 stands apart from the backup except for the one `AccountDatabase` method.
4. **Two readings:** the send's error text, the fixed word and the rule on wording entries are each written one way.

No decision of the first version was reopened. The review judged the design sound, and this revision is local corrections.

## Reaches beyond the dispatch

- `.the-way/task-cycle/spec/review.md`, whole, for what the next review checks.
- `.the-way/task-cycle/skill/foundation_step.md`, whole, for Reading 1.
- `.the-way/task-cycle/record_template.md:165`–`172`, and a search of `.the-way/task-cycle/` for *Violated*, for which request field names the mark.
- `.the-way/elements/invariants/template.md:156`–`168`, for the rule on *Violated*.
- `git show e95a8b1`, for the model of the clearing commit.
- `tests/agent_workflow/test_loop2_deploy_skill.py`, for finding 1's pattern and list.
- Docker on this computer, for the measurements above.

Nothing was written outside `docs/task-cycles/kopia-bazy/`, apart from a removed disposable container. No `mikrus` tool, no ssh, no commit, no foundation entry.

**Searches not found or unclear:**

- **Human acceptance of the *Violated* mark.** The template says *Violated* turns to `yes` only by a foundation change a human accepts, "never by a step of implementation". The spec reads the human's merge of the request naming the mark as that acceptance. But the mark is set and cleared on the branch before the merge, so at the merge the entry already reads `no`. The previous cycle did the same; the template does not spell out this order.
- **The server's Node.js release:** unread. The local image holds 24.22.1, and the check of decision 9 needs no answer, but the table in decision 1 is not a measurement of the server's release.
- **Whether the server's zone follows summer time:** only the abbreviation CET at this date was read. Decision 8 holds either way.
- **The text OpenSSH prints on a refused login:** from the reviewer's knowledge, not observed. The rule in decision 8 holds whatever it prints.
- **What Strych does at its 200 MB limit:** still no source; the design rests on a non-zero exit of `rsync`.
- **`rsync`'s list of exit values:** not read, so the skill's reading of a failed send needs it. With the error text discarded, that list is now the log's only clue to the reason.
- **Whether `age` from `winget` reads a file made by Ubuntu's 1.0.0:** no source read here says so in words; H3 proves it for this case.
- **A hand run of the send leaves its small file on Strych.** No deletion way exists there. It is harmless in size, and the maker can reuse one fixed file name so that repeats replace it.
