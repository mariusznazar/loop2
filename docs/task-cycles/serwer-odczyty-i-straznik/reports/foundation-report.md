# Report — the foundation step of the task cycle `serwer-odczyty-i-straznik`

**Status:** done

## Commits

- `9630fb90` — docs: :card_file_box: let the watcher read the backup log in D-233 and D-356, name the server without flock among the silent cases, and make the restore trial a monthly one in D-234 (one file: `foundations/decisions.md`, +45 −24 lines)

## Check

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, output `0 errors` (the same as on the base). `npm test` not run, as the handoff says.

## Entries, one sentence each

Edits in place of D-233, D-234 and D-356 in `foundations/decisions.md`. No new decision, no invariant, no environment fact, no other file.

- **row 1** (D-233, D-356)
  - EN: The failure watcher reads the backup log and, when it holds no successful send of a backup from the last 26 hours, sends a message of its own kind through `pusher` at most once a day; the review before the public launch of accounts is gone from D-233.
  - PL: Strażnik czyta log kopii i, gdy nie ma w nim udanego wysłania kopii z ostatnich 26 godzin, wysyła przez `pusher` wiadomość własnego rodzaju najwyżej raz na dobę; przegląd przed otwarciem kont znika z D-233.
- **row 2** (D-356)
  - EN: With no working `flock` on the server the watcher still ends with success, writes a line in its own log and sends nothing; D-356 lists this among the cases in which nothing comes, next to the schedule that did not start.
  - PL: Gdy na serwerze nie działa `flock`, strażnik dalej kończy się sukcesem z linią we własnym logu i nic nie wysyła; D-356 wymienia ten przypadek wśród tych, w których nic nie przychodzi, obok harmonogramu, który nie ruszył.
- **row 3** (D-234)
  - EN: The owner repeats the restore trial on his own computer every month and after each change of the database's schema version or of the saved game's version, instead of one trial before the merge.
  - PL: Właściciel powtarza próbę odtworzenia kopii na swoim komputerze co miesiąc i po każdej zmianie wersji schematu bazy albo wersji zapisu gry, zamiast jednej próby przed scaleniem.
- **row 4** (D-234)
  - EN: The paths of the restore procedure that nobody has run, `umask 077` among them, stay untried as an accepted cost.
  - PL: Ścieżki procedury odtwarzania, których nikt nie przeszedł, razem z `umask 077`, zostają nieprzećwiczone jako przyjęty koszt.

## What changed, per entry

- **D-233.** Binding sentence 2 now says the watcher of D-356 reads `/var/log/loop2-backup.log`, the 26-hour threshold, the message of its own kind under the same content limits, at most once a day; the host that is down and push.mikr.us stay. *Verification* gets a complies and a violates example for the watcher's message (invariant list unchanged). *Rationale*: the sentence about the written review is replaced by the reason for 26 hours (a night's backup that waited for the deployment lock of D-231), for once a day (the six-hour rhythm of the other kinds would bring up to four mails a day and use the daily limit the game's failures share), and by the two-messages case. *Rejected*: the item "this way with no written review" is reworded to "no signal ... with a written review before the public launch of accounts instead" (the way F-4 of the review named as the alternative), and the six-hour rhythm is added with its cost (the row's source).
- **D-234.** Binding sentences: the "one trial before the change merges" is replaced by the rhythm; the untried paths and `umask 077` are named. *Verification* gets the repeat in complies and a change of the schema or save version taken as covered by an earlier trial in violates. *Rationale* names why the trial repeats and why the untried paths are an accepted cost; the old clause "backups of later schema versions are not tried" is dropped, since the trial after a schema change now covers that moment. *Rejected* gains: one trial as it was, the automatic run on the owner's computer (with its costs from the row's source), the session of a human on the server for the way back and a second attempt.
- **D-356.** Binding sentence 1 names the new input (the backup log, the lack of a successful send, as D-233 gives); binding sentence 3 lists a server without a working `flock` among the cases where nothing is sent. *Rationale* adds the new input to what the watcher sees and the `flock` case to the lacks of the option chosen. *Rejected*: "as in D-233" removed from the absence with a written review (D-233 no longer holds a review), and the two ways not chosen for `flock` added with their costs from the row's source. *Verification* needed no change: "leaves at least two for the server kinds" stays true with the new kind inside the day's limit.

## Choices

- The full rule (26 hours, once a day, the log) stands once, in D-233; D-356 refers to it ("that D-233 gives"), so the same question is not answered twice (WAY-33). Rejected way: repeating the rule in both entries — it would drift. Cost if wrong: D-356 depends on reading D-233 for the number.
- The decision says "a successful send of a backup", not the log line `end: sent <file>`, so the entry does not hold the code's wording; the code is slice 2's. The subject and sentence of the new message are not written in any entry (orchestrator's note).
- The backlog line that reminds the owner of the monthly trial is not named in D-234: the backlog lies outside the repository (AGENTS.md says so). Cost if wrong: the means of keeping the rhythm is written nowhere in the foundation.
- The same-commit wording "the same commit run on it" in D-234 is kept as it was (the instruction reads it as the commit the server deployed).
- Not touched by design: D-235, D-360, the sentence about GitHub's rhythm in D-356 ("scheduled about every five minutes", the Rationale risk "a mail every 5 minutes and hundreds of runs a day"), D-228's *Verification* that still names `account-save-backup` (withdrawn at the return step), every invariant and environment fact.

## Search of the foundation (WAY-33)

`grep` over `foundations/`, `guidelines/`, `AGENTS.md`, `.claude/skills/loop2-deploy`, `deploy`, `docs` for "public launch", "reviewed before", "written review": the review is stated only in D-233 (and its mention in D-356 *Rejected*, fixed); D-223 says "reviewed before the game's address is given to other players", which is another decision's own sentence and untouched. `grep` for "checked restore", "one trial", "restore trial", "watcher", "flock", "five kinds" in the foundation files: no other entry states the restore trial as one trial; no other entry holds the watcher's kinds or `flock` (D-253 line 8960 only says the watcher reports failure lines). The invariants `account-save-backup-failure-notice` and `failure-watcher-message` stay true (the second covers every message the watcher sends, the new kind included).

## For the return step

- D-356's *Rationale* still says "scheduled about every five minutes" and the five-minute risk; the return step rewrites it with GitHub's rhythm.
- D-228 names the invariant `account-save-backup` in *Verification*; withdrawn later.
- D-233 and D-356 now say the watcher reads the backup log; the fact of the backup log (`account-save-backup`'s replacement) may be named by D-233 *Based on* then.

## Reach beyond the handoff

- `the author's private note on the foundation review of 2026-11-13`, F-4 (lines 164-185): the row's source names F-4, and the *Rejected* of D-233 needed the alternative it offers (the review). Also `.the-way/elements/common/rules.md`, `way_of_working.md`, the skill's `read.md`/`decide_entry.md`/`SKILL.md` and `template.md` (the method), `foundations/decisions.md` D-232 and D-238 (neighbours, read whole), and a grep of `deploy/loop2-watch` for `flock`/`skipped` lines to word row 2 truly.

## Unread material

- `foundations/part_map.md`: read the part `deployment` (lines 145-176) and the headings only, not the whole file.
- `plan.md`: read only the sections the handoff names (lines 1-46), not the slices.
- `deploy/loop2-watch`: read lines 1-110 (header, constants, state) and a grep of `flock`/`skipped`, not the whole script; `deploy/loop2-backup`: a grep of the log lines only (`end: sent <file>` at line 128, `end: failed` at 132).
- `foundations/decisions.md`: read whole only D-12, D-13, D-228, D-230, D-231, D-232, D-233, D-234, D-235, D-238, D-356, D-360 and part of D-237; the rest by grep.
- The environment facts and invariants the handoff names: read whole. Everything else in the handoff list: read whole.

## Searches not found or unclear

- None not found. Unclear: the handoff's list names D-09 and D-10, D-228 and D-355 as later changes; I did not need them. The meaning of "the same commit" in D-234 is explicit only in the instruction (`backup_and_restore.md`, "Restoring"); left as it was.
- Task *Context* says a failed night gives two messages (script and the watcher the next day); I put it in D-233's *Rationale* as a consequence of the rule, from the task's *Context*, not from a row's source.
