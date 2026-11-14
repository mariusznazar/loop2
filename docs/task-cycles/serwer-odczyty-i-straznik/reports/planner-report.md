# Planner report — serwer-odczyty-i-straznik

**Status:** done with concerns (a reach beyond the dispatch, two points where the guidelines and templates are silent, and four open questions below).

- Plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md`
- Final size report: `docs/task-cycles/serwer-odczyty-i-straznik/plan-size.md` (exit 0: 12 slices, every one fits; the largest reads about 126k estimated tokens, the limit is 250k).
- No tracked file changed, no `npm test`, no slice check run. Only read-only commands were run: the size script and `python -B .the-way/elements/common/foundation_check.py` (`0 errors` on the base).

## Shape of the plan

12 slices, in this order: 1 test of the second lock look with a broken `flock` (item 5) · 2 the watcher's sixth kind, code and tests (item 3; Risk: trust boundary) · 3 skill, readings list, new kind, accepted gaps (items 3, 4, 8) · 4 restore-trial rhythm and "Not tried" (items 6, 7) · 5, 6, 7 server readings through `mikrus`, written as facts (item 9) · 8 `gh` visibility and the two licences' read date (items 10, 11) · 9 rhythm of GitHub's scheduled runs, fact and skill (item 12) · 10 the three invariants narrowed to what their tests check (item 1) · 11 the mail invariant narrowed and its delivery fact (item 2) · 12 the password-measurement fact and the places that name its invariant (item 2).
The four *Settlements to record* rows are the plan's *Foundation entries* (foundation step, before slice 1).

**The one structural decision to look at first.** `foundations/decisions.md` is about 1,020,000 characters (about 408k tokens); the size script counts every file a slice changes whole, so any slice that names it in *Change* is too large (I saw this: slice 6 came out at 461k tokens in the first draft). Therefore no slice edits a decision. All decision edits that wait for readings or for the human's results, and the withdrawal of `account-save-backup` and `player-argon2-deployment-check` (a slice cannot withdraw an invariant a decision still names: `foundation_check.py` reports a name that names no entry or a withdrawn one), are listed in the plan as a table "written at the return step", fed by a part "For the return step" at the end of each reading slice's report. The slices write the environment facts, which are small enough. Cost: the return step carries about twenty decision edits and two withdrawals, and facts stand without a dependant between their slice and the return step (`foundation_check.py` has no check for that; I found none in a search for it). The orchestrator may split the return step's handoff.

## Guidelines found missing or uncertain

- `guidelines/coding.md` has no pattern for the shell scripts of `deploy/` ("Odłożone rodzaje i formatowanie": deployment patterns deliberately deferred); the plan relies on the surrounding scripts and the testing guidelines.
- `guidelines/testing.md`, table of trust boundaries, row `deploy/`, says "każdy z pięciu rodzajów" for the watcher's message. Slice 2 changes the count to six and nothing else, without the skill `the-way-maintain-testing-guidelines` (which leads a refinement with the human); noted as a choice. Ask if the orchestrator wants it otherwise.
- The template of environment facts has `TODO — decision pending` for "the source of a setting read with its setter's credentials on a service they do not run". The human's results from the Cloudflare panel, the GitHub mail and the external inbox are of that kind, and none of the human's results carries a command and its output word for word. The plan therefore writes them as remarks at the entries (return step), and as facts only where the command and the output arrive.

## Relation to the styleguide example

None: the change has no user interface and no styleguide was read.

## Reaches beyond the dispatch (what, where, why)

- `.the-way/task-cycle/skill/foundation_step.md`, `planning.md`, `return_step.md` and the headings and steps 9 and 11 of `.the-way/task-cycle/skill/SKILL.md`: to see when the foundation step runs and what the return step may write, after the size script showed that decisions cannot be changed in a slice.
- `.the-way/elements/environment-facts/template.md` and `.the-way/elements/environment-facts/skill/SKILL.md`: the form of a fact and the rule that a fact stands only while a decision or an invariant names it.
- `.the-way/task-cycle/slice_size.py` (head) for the rule that *Change* files count whole, and `.the-way/elements/common/foundation_check.py` (searched, then run).
- `.the-way/elements/common/way_of_working.md` lines 1-140 ("Reading the foundation").
- Decisions beyond the handoff's list: D-08, D-11, D-14 (title only), D-15, D-106, D-111, D-113, D-238, D-361, D-362 (see Unread material for the parts cut). Reached because the invariants of items 1 and 2 are named in their *Verification*, and for the rules on the installed-script reading and on private names.
- `tests/agent_workflow/test_loop2_deploy_skill.py` (whole): it is the check that the two skill copies are byte for byte the same, and it refuses an IPv6 literal and the provider's host name in the skill.
- `scripts/test.py` head, `tests/quality/test_quality_invariants.py` (grep: the script list of the ShellCheck rule includes `deploy/loop2-watch`).
- `guidelines/coding-password-hashing.md`, `scripts/measure-passwords.mjs` and `tests/password-measurement.test.mjs` (the lines that name `player-argon2-deployment-check`), `references/setup_and_secrets.md` lines 380-392 and 528-621: found by a search for every file that names the three invariants of item 2; they become part of slice 12.

## Unread material

- Decisions I read whole, as the handoff names them: D-09, D-10, D-12, D-13, D-16, D-17, D-110, D-153, D-205, D-206, D-223, D-228, D-230, D-231, D-232, D-233, D-234, D-235, D-237, D-253, D-355, D-356, D-360. D-228..D-232 and the others above were read whole.
- Read in part, each line cut at 1800 or 2500 characters by my output limit: D-08, D-11, D-15, D-238, D-361, D-362 (the *Rejected* lines cut), D-106 and D-111 and D-113 (first lines whole, *Rationale* and *Rejected* cut for D-111 and D-113).
- Not read at all, only located by range: D-14, D-229, D-236, D-252 (its rules were read through `guidelines/coding.md`), D-357, D-358, and the facts `cgroup-memory-accounting` and `sqlite-online-backup` (they stand in slice *Read* fields by range).
- `foundations/environment_facts.md`: the fourteen facts the handoff names were read whole; the rest of the file only by the template's form, not entry by entry; `foundations/glossary.md` searched for "watcher" (no hit), not read.
- The skill `the-way-record-environment-fact`: its `SKILL.md` and the template were read; its `read.md`, `decide_entry.md`, `draft.md`, `write.md` were not (the executors read them when they write).
- `deploy/loop2-backup`: lines 1-50 and 83-135 (header, constants, log writer, exit handler); the rest only by grep.
- `deploy/loop2-deploy`: header and a grep of its log lines; not read whole.
- `tests/deploy/test_loop2_watch.py`: lines 1-96, 438-551, 840-884 and the list of test names by grep; the other groups unread. `tests/deploy/test_loop2_watch_message.py` and `tests/deploy/watch_script_support.py`: whole. `tests/deploy/backup_script_support.py`, `tests/deploy/test_loop2_backup.py`, `tests/invariants/test_account_save_backup_failure_notice.py`: not read (only located; slice 2 gets `backup_script_support.py` in *Read*).
- `.claude/skills/loop2-deploy/SKILL.md`: lines 1-365 read; 365-463 not (account blocking and rollback, which no slice touches). `references/backup_and_restore.md`: lines 44-97, 250-300, 365-395, 440-462, 524-532. `references/setup_and_secrets.md`: lines 380-392 and 528-621. `references/troubleshooting.md`: unread. The `.agents/` copy: compared with `diff -r` (identical), not read.
- `cycle.md` of the record: first 60 lines; `.the-way/elements/common/way_of_working.md`: lines 1-140.
- Everything else the handoff names I read whole: the task, `AGENTS.md`, both guidelines, the part map, `deploy/loop2-watch`, `deploy/loop2-watch.cron`, the ten invariants, `.github/workflows/check-address.yml`, the three invariant tests of item 1.

## Searches not found or unclear

- The handoff says *Human actions* has seven entries; the task holds eight (counts, reset message, key copy, Cloudflare, cookie, GitHub mail, licences, password measurement), lines 119-126. The plan covers all eight.
- No command or output word for word exists in the task for any of the human's results (account count, key copy, Cloudflare, cookie, GitHub mail, reset message, measurement). Item 11 and the task's own sentence that the count "is written as a fact" cannot be met as a fact from the text in hand.
- `foundation_check.py`: I found no check that reports a fact no decision or invariant names (searched its text for such wording); the template says such a fact must not stand. Unclear whether the check is meant to catch it.
- Whether any test compares the module docstrings of the three invariant tests with the invariants' sentences: not searched; slice 10 tells its executor to search.
- "wyjścia 7 (D-237)" in item 9: read as the exit 7 of the deploy script (build or type check, including the image's release check), from `deploy/loop2-deploy` header and the skill's table; the task does not say.
- Where exactly a missing backup log should count: the task says "no successful send for 26 hours"; I took a missing or unreadable log as "no send" (Choices).
- The list of readings in the skill has `gh run list --workflow check-address.yml --limit 10` but not `--event schedule`; slice 3 adds the form so that slice 9 stays within the list.

## Open questions, with proposed answers

1. **Return step weight.** The return step carries the decision edits (the table in the plan) and two withdrawals. Proposed: the orchestrator gives it the plan's table and the reports of slices 5-12, and, if it prefers two agents, splits it by the two files `decisions.md` and `invariants.md` (the withdrawals need the decisions' pointers in the same commit, so they stay together). Evidence: `plan-size.md`, and the size of `decisions.md`.
2. **Human results without command and output.** Slice 12 stops without a word-for-word report of the measurement, and then the invariant `player-argon2-deployment-check` cannot be withdrawn. Proposed: before slice 12 the orchestrator asks Mariusz to paste the raw report of the measurement (the script prints it) and, if he can, the command of the account count and its output; without the count they stay remarks.
3. **Reinstalling the watcher.** After the merge the deploy log warns that the installed `loop2-watch` differs from the source, and the sixth kind does nothing until a human reinstalls it from the merge commit. Slice 3 says so in the skill; the request's description should say so too.
4. **The comment in `.github/workflows/check-address.yml`** still says "Every five minutes". The task says the schedule does not change; the comment states what the schedule asks for. Proposed: leave it, and let the return step's D-356 text say what GitHub gives.

Choices that bind (copied into the plan's *Choices* table): kind name and place in the order, once a day and counted in the day's six, a missing log counts as no send, the time of a send is read from its line, a future time does not count, a bounded tail, the fixture's default, and the split between slices and the return step.
