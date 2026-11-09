PASS 35f56d2

# Report 25 - review of the return step's commits, task cycle `skad-wiem-o-awarii`

Reviewer: an agent that made none of the commits. Worktree `the root of the repository`, branch `task/skad-wiem-o-awarii`. `git rev-parse HEAD` = `35f56d246a67379a80d6c6324947411442cea786` (the given head). `git -C .the-way rev-parse HEAD` = `294af7fde45323ac1851c014a03071a97fc38d96` (the pin). Range `ae151c4..35f56d2`, four commits (`04a7eb5`, `5f085f7`, `ca4370d`, `35f56d2`), computed with `git diff` and `git log` over the whole range. I changed no tracked file; `git status --short` was empty at the end.

Verdict: no blocking finding. Five Minor findings, two out-of-scope notes.

## Findings

### Critical

none.

### Important

none.

### Minor

**M1. `logrotate-rotation-rules` joins three claims into one sentence, and the third drops "or mailed".**
Place: `foundations/environment_facts.md:666` (the entry), source line 668.
The sentence says `logrotate` (a) handles a file daily, weekly, monthly or when it grows too large, (b) rotates a file bigger than `maxsize` even before the time interval ends, (c) rotates a log `count` times "before it removes it". These are three directives of the man page (DESCRIPTION, `maxsize`, `rotate`). The template says one entry states one fact with one reason to change, and that two facts from one edition about different things stand as two entries (`.the-way/elements/environment-facts/template.md`, "The sentence"). On (c), the source says "before being removed or mailed to the address specified in a mail directive"; the sentence says only "removes it". For the stanza of `deploy/loop2-app.logrotate` (no `mail`) this is true, so it is not a false statement, only a narrower reading than the page.
Why it matters: low. A changed wording of one directive forces a re-read of the whole entry, and D-352 names the entry for two different things (weekly-or-sooner, four generations). Nothing rests on the omission.
Evidence: I fetched the archived page (`web.archive.org/web/20261009164358/...`) and the live page; all three quoted passages are in both (script `rv_check.py` and `rv3.py` in the scratchpad; the `maxsize` passage matches when the page's spaces around the parentheses and commas are collapsed). Suggested split: one entry for the time and size triggers, one for the `rotate count` rule, with "before it removes or mails it".

**M2. `github-schedule-shortest-interval` cites an older capture than the closest existing one.**
Place: `foundations/environment_facts.md:674`.
The template asks for "the closest archived copy that already exists". The CDX index lists, for the same page, captures `20261031092549` (cited) and `20261108201723` (one day before the read date 2026-11-09). The cited capture is the one the existing entry `github-scheduled-workflow-disabling` uses (line 644), so the two entries on one page are consistent with each other, and I checked that both captures and the live page hold the sentence "The shortest interval you can run scheduled workflows is once every 5 minutes."
Why it matters: low; the sentence is the same in all three. Either cite the newer capture in both entries or leave it; no reader is misled.

**M3. "leaves room for the server kinds" and "so that the messages of the server kinds still go" are softer than the code, and both can be read as full freedom.**
Place: `.claude/skills/loop2-deploy/SKILL.md:288-290` and its twin `.agents/skills/loop2-deploy/SKILL.md` (same lines); `foundations/decisions.md`, D-353 *Verification*, first "complies" example.
What the code does (`deploy/loop2-watch`): `KINDS=(down unhealthy restarted failures browser)`, so the browser kind is last (the skill's table is in the same order); `KIND_INTERVAL_SECONDS=21600`, so the browser kind goes once in six hours at most; `DAY_MESSAGE_LIMIT=6` over a rolling `DAY_SECONDS=86400` (a message exactly 24 hours old no longer counts, `NOW - stamp < DAY_SECONDS`). So a browser flood takes four of six at most - the skill's number is right. What is left for four server kinds is two messages a day, and because of the order the two that go first are `down` and `unhealthy`; `restarted` and `failures` can be held for the day (`held=...(day)`). "Leaves room" is true, "still go" is true for at least two; neither says that two is the bound.
Why it matters: a reader of the skill during an incident may take it that a browser flood never mutes a server message. The sentence it replaced said exactly that and was wrong; the new one is correct but not exact. Tests that protect the numbers exist: `tests/deploy/test_loop2_watch.py:173` (flood), `:563` (six hours), `:581` and `:589` (24-hour window), `:600` (order until the budget ends).
Suggested wording: "...takes four of the day's six messages at most and leaves at least two for the server kinds, `down` and `unhealthy` first."

**M4. The Rationale of D-352 still says the append "depends on nothing about the server that nobody has checked"; the return step's own list shows two such dependencies.**
Place: `foundations/decisions.md`, D-352 *Rationale* (the sentence "Appending the log to a file on the host just before the replacement keeps it, costs nothing and depends on nothing about the server that nobody has checked"); not in the range's diff, so this is a sentence the return step compared and left.
The return step's report lists as unread: that `logrotate` runs daily on the host, and the Compose release on the server (the new fact `docker-compose-recreate-removal` is about v2.35.1 and says so; report 24, "Searches not found or unclear"). The skill states the first one correctly (`references/setup_and_secrets.md`: "If neither exists, report it as unchecked: the size cap does not hold") and the *Risks taken* of D-352 list the rotation failures as hypotheses. The sentence about "nothing unchecked" is the one place that reads as proved.
Why it matters: the Rationale is not a binding sentence, so no code is wrong; the risk is a later reader taking the rotation and the Compose behaviour on the server as established. Fix: add the two items to the *Risks taken* list of D-352 or soften the sentence.
Evidence: the sentence in `foundations/decisions.md` D-352; the code (`deploy/loop2-deploy` calls `docker compose ... up -d --force-recreate`, `deploy/loop2-app.logrotate` has `weekly`, `maxsize 100M`, `rotate 4`); the skill sentence quoted above.

**M5. The part map's `deployment` sentence has an ambiguous "the last two".**
Place: `foundations/part_map.md:146-150`.
"...it also holds the logrotate file of that log file, the failure watcher and its schedule and the scheduled check of the public address, the last two telling the owner when the running game fails." The list has three items and one of them has an internal "and its schedule"; "the last two" can be read as "its schedule and the scheduled check". The meaning intended (the watcher with its schedule, and the check) is clear from the previous version and from the files, so this is polish. The sentence is otherwise right: the dump is at `deploy/loop2-deploy` `dump_container_logs`, called between `build_image` and `start_container` (`main`, line 431); the logrotate file is in `deploy/**`; the workflow is listed in *Files*.

### Out of scope

- `tests/deploy/test_loop2_watch.py:1` ("decisions C1 to C7 of the spec") and `tests/deploy/test_loop2_log_storage.py` (lines 74, 83, 97, 104: "A2/A3" and similar) refer to labels of a spec that does not stay in the tree. The return step named them in report 24 and did not change them. They are code comments of earlier slices, not in this range.
- `.claude/skills/loop2-deploy/SKILL.md:295` says "GitHub then notifies the owner of the failed run" without a qualifier on that line; the qualifiers are two paragraphs below ("The four limits of the scheduled check" (3), "What no test proves"). Not in this range's diff and not wrong in context.

## What I checked, by point of the handoff

**The five facts against their sources (each fetched, today).**
- `docker-compose-recreate-removal`: `raw.githubusercontent.com/docker/compose/v2.35.1/pkg/compose/convergence.go` line 639 is `err = s.apiClient().ContainerRemove(ctx, replaced.ID, containerType.RemoveOptions{})` inside `recreateContainer` (line 604), after `ContainerStop` of the replaced container. The quoted passage is a substring of that line. The sentence says no more. True of the edition it names; the server's own Compose release is not known (M4).
- `docker-local-log-driver-bound`: the passage "By default, the local driver preserves 100MB of log messages per container and uses automatic compression to reduce the size on disk." is in the live page and in capture `20261015110255`. The sentence is a faithful cut of it.
- `logrotate-rotation-rules`: the three passages are in the live page and in capture `20261009164358`; see M1 for the form. Ubuntu 22.04 matches the host (`foundations/environment_facts.md:25,31,37` read Ubuntu 22.04.5 LTS).
- `github-schedule-shortest-interval`: passage in the live page and in both captures (M2).
- `github-actions-public-runs-free`: "The use of standard GitHub-hosted runners is free:" followed by the list item "In public repositories" is in the live page and in capture `20261108201638`; the list's other items (GitHub Pages, Dependabot) are not claimed. The same page says larger runners are billed for public repositories; the sentence says "standard", which is right. The workflow runs on `ubuntu-24.04`, a standard runner.
- Form: each entry has one field *Source*, an `(archived: ..., date)` where the page has no edition, a `§` place, the passage word for word, and a read date. Identifiers name no value. The two named editions (`v2.35.1`, `Ubuntu 22.04`) follow the precedent of `docker-container-log-removal` (`v28.1.1`) and `cron-d-file-rules`; the template's rule on editions is still a pending `TODO` decision, so I do not grade it.
- Whether a capture was made on request (the template forbids it): the CDX index shows `20261108201638` (billing) and `20261108201723` (schedule) 45 seconds apart on the evening of 2026-11-08. Both pages are captured many times a week (billing nearly every day in October, schedule several times a week), so a crawl is as likely as a request. I found no trace of a "save" call in `.runs/task-cycles/skad-wiem-o-awarii/` (grep for `web.archive.org/save`, `Save Page Now`). I cannot prove either way; see "Searches not found or unclear".

**Decisions D-352 and D-353 (`5f085f7`).**
- *Based on* now names the three (D-352) and two (D-353) facts first, then the sources still quoted. The quotes removed from the lists are exactly those the new facts hold (compose `ContainerRemove`, the `local` 100MB sentence, "allows automatic rotation, compression, removal"; the shortest interval; the free runners). `foundation_check.py` passes, so each new fact is named by a decision.
- D-352 *Verification*: "a `warning:` line" matches `deploy/loop2-deploy` (the log line is `<time> loop2-deploy: warning: the dump of the log of both loop2 services to ... failed (exit ...)`, `log()` at line 79-81, warning at line 357). The binding sentence matches the code: the append is between build and start (`main`, lines 429-431), a failure is a warning and the deployment goes on, both services on `driver: local` (`compose.yaml:29-30,58-59`), the stanza has `weekly`, `maxsize 100M`, `rotate 4`, `compress`, `delaycompress`, `copytruncate`, `su root root`, no deployment account.
- D-353 "a restart of either of them": `evaluate()` in `deploy/loop2-watch` compares the id and start time of both containers (`CONTAINERS`); `TEXT_RESTARTED` says "game or tunnel". The old wording ("the game's process") was wrong and the correction is right. The *Verification* example "a container of the game" matches.
- The dropped risk clause "no comparison of installed copies": `compare_installed_script` compares six copies including the watcher, its schedule and the logrotate file (`deploy/loop2-deploy:228-236`), called in `main` before the build. The remaining clause "covered by no invariant test" is true: `foundations/invariants.md` holds no invariant about the watcher except `failure-watcher-message` (messages only).
- Workflow: `3-58/5`, six attempts 20 seconds apart, `permissions: {}`, no checkout, no secret - matches D-353 and its violations list.

**The skill (`35f56d2`).** Only the two sentences changed, in both copies; `cmp` of the two files exit 0. Sentence 2 ("a line with `warning: ...`") is right. Sentence 1 is right in its numbers and order; see M3 for the wording. The old text of both sentences is gone from `foundations/`, `.claude/skills/loop2-deploy/`, `.agents/skills/loop2-deploy/`, `guidelines/` (grep for "own budget", "game's process", "line starting").

**The part map (`ca4370d`).** See M5. The responsibility sentence now names the dump; *Files* and *Trust boundary* are unchanged and `deploy/**` covers the logrotate file and the watcher. The sentences of `account-server` (accepts the browser report, writes one line of its log) and `browser-view` (reports each distinct last-resort line) are already right, so leaving them is correct.

**Points the orchestrator asked me to weigh.**
- Browser kind, order, interval, cap: checked in M3; the skill sentence is correct in its numbers.
- Glossary and D-17: WAY-95 (`.the-way/foundations/decisions.md`, "Which words take a glossary entry?") asks for an entry for a word that means in the product something other than the field's meaning, and `return_step.md` makes the return step write such a word through `record-glossary-term`. The words the change adds (watcher, dump, report, failure, kind, running game) are used in their ordinary meaning, and `foundations/glossary.md` has no entry that they contradict ("deployment", "public address", "test server" are used as defined). I find no entry required, and no sentence the files hold that a reader would read wrongly for lack of one (WAY-297 grading therefore gives nothing). On D-17: its sentence says a deployment changes nothing on the host but "... log and lock". The deploy script now also appends to `/var/log/loop2-app.log`. A reader who takes "log" as the deploy log alone would see a second file; D-352 derives from D-17 and says the append plainly, and the spec (`spec.md:38`) reads D-17 as allowing it. Changing "log" to "logs" is optional and I do not grade it as a finding; the return step was right that it is a change of D-17's wording the task did not approve.
- Facts not written (`docker inspect` fields, `--since`/`--until`, daily logrotate, cron, `pusher` delivery, GitHub e-mail): none of the lines in the range states them as proved. The skill's "What no test proves" and `references/setup_and_secrets.md` ("the only check", "reported as unchecked") keep them as the human's steps; D-353 says "so that GitHub notifies the owner" as a purpose and its Rationale says the page does not say whether GitHub e-mails by default. The `docker inspect`/`docker logs` documentation is readable on the web, but no decision or invariant cites it, and a fact with no dependant is withdrawn at once (template, "A fact stands only while..."), so I do not call the omission a miss. The one remaining unproved-looking sentence is the one in M4.
- Human action looking done or irreversible operation: none. The range changes `foundations/` and the skill only; no sentence says the human installed the watcher, the schedule, the logrotate file or the notifications. D-352 and D-353 say what "a human creates / installs / sets", in the present tense of the design. Trust boundary: `deploy/**`; the range touches no code in it.

## Declined to judge

- The stale sentences in `guidelines/*` that the request lists for separate scheduling (the handoff tells me not to grade them).
- The code of the slices (deploy script, watcher, route, page): reviewed by earlier reviews; I read them only to compare with the entries.
- Whether the owner's e-mail notifications of GitHub, the `pusher` delivery, cron, and the `logrotate` timer work on the server: human steps, no test or source available to me.

## Checks run

| Command | Exit |
|---|---|
| `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD` | 0; heads as given |
| `git log --format='%h %s' ae151c4..35f56d2`; `git diff ae151c4..35f56d2` | 0 |
| `git diff --check ae151c4..35f56d2` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 (5 tests, OK) |
| `cmp .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md` | 0 |
| `curl` of the Compose `convergence.go` at `v2.35.1`, of the live and archived pages of the five facts, and of the CDX index of the Internet Archive; quotes compared with a script (`rv_check.py`, `rv2.py`, `rv3.py` in the scratchpad; output ASCII) | passages found; see above |

Not run: the full suite (the cycle's own run), any test of `tests/deploy/` (the range changes no code).

## Reaches beyond the handoff

- `deploy/loop2-watch` (whole), `deploy/loop2-deploy` (lines 28-40, 200-240, 329-360, 420-440), `deploy/loop2-app.logrotate`, `compose.yaml` (logging keys), `.github/workflows/check-address.yml`: the code the entries describe.
- `.the-way/task-cycle/skill/return_step.md` and `.the-way/foundations/decisions.md` (WAY-95): for the glossary question.
- `.the-way/elements/part-map/template.md` (head): the form of a part sentence.
- `foundations/glossary.md` (headings), `foundations/invariants.md` (the three invariants of the cycle), `foundations/environment_facts.md` (lines 15-40, 440-460, 560-690): precedents and host edition.
- `foundations/part_map.md`: `account-server` and `browser-view` entries.
- `.claude/skills/loop2-deploy/SKILL.md` (lines 268-335) and `references/setup_and_secrets.md` (lines 440-530): the other sentences about the same facts.
- `tests/deploy/test_loop2_watch.py` (test names) and a grep of `tests/deploy`, `src`, `deploy`: the out-of-scope notes.
- Web: the five source pages (live and archived), the CDX index; Internet Archive.
- `a note in the author's notes vault` and `git.md`.
- `.runs/task-cycles/skad-wiem-o-awarii/{task.md,spec.md,cycle.md}` (searches for D-17, D-12) and `reports/24-return-step-report.md`.

## Searches not found or unclear

- Whether the captures `20261108201638` and `20261108201723` were made by a request (Save Page Now) or by a crawl: not decidable from the CDX index; I found no trace of a request in the cycle's files. Question for the orchestrator below.
- The Compose release on the server and the `logrotate` timer on the host: unread by any agent (report 24 says the same); not found in the foundation.
- The template's four `TODO — decision pending` points (identifier naming, edition in a sentence, present tense, edition a citation takes) have no deciding decision in the-way at the pin; I graded none of them.

## Questions

1. Did any agent of this cycle (or the refinement session) ask the Internet Archive to save the two GitHub pages on 2026-11-08 around 20:16-20:17 UTC? If yes, the billing entry's archived copy was made for the entry and the template forbids it; the fix is to cite the closest older capture (for billing, `20261102225155` or `20261107064600`, both in the CDX index; I did not read their text). If no, nothing to do. Not blocking: I have no evidence of it.
