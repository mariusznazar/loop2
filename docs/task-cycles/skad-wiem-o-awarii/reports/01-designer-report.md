# Report 01 — designer of the spec, task cycle `skad-wiem-o-awarii`

Status: done. Spec: `.runs/task-cycles/skad-wiem-o-awarii/spec.md`. No tracked file changed; the product's gate was not run.

## Questions sent and their answers

None. Every choice had a source (the task, the foundation, the code, the technology reports) or a smallest reversible reading. The readings that the orchestrator may want to overturn are listed under "Readings chosen where no source answers".

## Ways weighed and why the rejected ones lost

- Report route: with a session (rejected: failures on the login card vanish) / without (chosen, `accountId` from the stored session only). Body limit of its own (rejected: the line is bounded by the field patterns; D-104 already allows "at most 16 KiB"). Limit per address plus global (rejected: one more bounded table; a few addresses defeat it) / global only (chosen).
- Watcher's way of seeing a restart: `docker events` (rejected: 256-event buffer, long-running root reader, false alarm for each deployment's `die`) / comparing state by container id and start time (chosen; this is the technology report's safeguard for its risks 1-3).
- Watcher and the deploy lock: `flock` on the path (rejected: util-linux creates the file as root, the report's risk 2) / read-only open of an existing file plus a shared non-blocking lock released at once, looked at before and after the reads (chosen).
- Dump failure: stop the deployment (rejected: a full disk would block the deployment that fixes the game; also adds a stage to `loop2-deploy-keeps-running`) / warn and go on (chosen, the warning is the report's safeguard for "po cichu").
- Logrotate ownership: `create` naming the deploy account (rejected: D-13, the SSH user is an access value kept out of the repository) / `copytruncate` with `su root root` (chosen).
- `account-block` lines: human appends whole output (rejected, the risk named in the task) / wrapper script on the host (rejected: a second installed artefact not in the task's installation list) / writing to process 1's stream (rejected: unproved in the unprivileged LXC, silent on failure, changes `account-block`) / a filtered command in the skill (chosen).
- Scheduled check in the existing `deploy.yml` (rejected: its test pins `push` to `main` only) / a new file in `NOT_ROUTES` with a test that it deploys nothing (chosen); weakening the route test (rejected).

## Readings chosen where no source answers (the orchestrator may overturn)

1. The safeguard "the watcher counts new failure lines in the dump" (technology report, risk 4 of the watcher) is **not taken**. The accepted gap stays and is named in the spec (C3) and for the skill. Reason: it needs the Compose line format with its service tag and padding, a bounded tail, a time filter, and a rule against counting a line twice when `up` fails after the dump. It can be added later without touching the rest. If the orchestrator wants it, it is a change to C3 and to the watcher's test.
2. `guidelines/testing.md` (a table row per trust boundary and one per route) is not edited by the change; the spec flags it for the orchestrator to schedule through the testing-guidelines skill.
3. Numbers set by me, none from a source: 30 reports per rolling hour; one message per kind per 6 hours and 6 per 24 hours; a 24-hour cap on the watcher's window; 300 seconds bound for the dump; logrotate weekly or at 100 MiB, four generations; 6 attempts 20 seconds apart in the check workflow; a 5-minute cadence for both the cron and the schedule. The spec lets the maker change one only by reporting it.
4. The check workflow gets a `workflow_dispatch` with a boolean failure input, to make the "one trial failure" the task lists as a human action. The task does not name the mechanism.
5. D-253's text is left alone (sending a report does not contradict "one console line once"); D-233 is left alone (the new check catches a host that is down, which D-233 names as its own gap; its review may cite it).
6. Dump file: lines of `account-block` carry a UTC timestamp and the tag `account-block`, in the shape of the dump's other lines; this is my reading of "the same file" so the agent can date them.

## The four checks

1. Placeholder / empty section: none found. The one `for example` list of cron minutes is an example, the rule is "not minute 0, every 5 minutes".
2. Contradictions: checked the spec against the task (three ways, `local` driver, the dump file, the eight to-do items) and the foundation (D-104 body limits, D-13, D-12, D-16, D-17, D-233, D-252, D-253, D-347 as the task's row 3 changes it, the invariants). One contradiction was found and fixed: the trust-boundary table said "`.` in a word" refused while the `place` pattern allows `.`; the row now separates `kind`/`code` from `place`. One ambiguity fixed: the constraint said each unproved fact had a human check; the windowing of `docker logs` has none and is now said to be reported as unchecked.
3. Scope: the spec is five loosely coupled units (A dump, driver and logrotate; B browser report; C watcher; D scheduled check; E skill). A, D and the server half of B are independent; C needs only the line shape of B; E comes last. They are one task by the owner's decision, so one spec; the planner may slice along the units, and the spec says so in "Left to the maker".
4. Two-way readings: "the same file" for `account-block` lines (picked: a filtered command in the skill, lines beginning `{`); "the window of a deployment" (picked: the deploy lock is held, which also covers the nightly backup); "a lost state file" (picked: from now); "own limit" (picked: one global count). Written down in the spec.

## Reaches beyond the dispatch

All to design from the real code, not to widen:

- `.the-way/task-cycle/spec/design.md`: the method's next step (named by the method).
- `.the-way/project-level/technology/reserved_choices.md`: to decide whether the watcher's state file, the GitHub workflow or the `local` driver is a reserved choice. None is: the task and the foundation settle them, and a state file adds nothing to run, pay for or back up. Searched: the task's *Technology*, D-233's pattern.
- `tests/invariants/test_loop2_host_sharing.py` (header and constants): the allow-list for Docker commands and Compose keys — to see that `compose logs --no-color --timestamps` and the `logging` key are allowed.
- `tests/invariants/test_account_server_typecheck.py:55-80, 270-310` and `tests/invariants/loop2_invariant_support.py:395-440`: what `deployment_route_files` matches (all `deploy/*`, all `.github/workflows/*.yml`) — the new files must go to `NOT_ROUTES`.
- `tests/deploy/test_deploy_workflow.py:1-80`: the pattern for the new workflow's test; it reads `deploy.yml` only.
- `tests/invariants/test_loop2_distinct_address.py` (header): reads the one declared address of `deploy.yml`; the new workflow's address is to be checked equal by a test instead of declaring it twice unchecked.
- `tests/quality/test_quality_invariants.py:22`: the `BASH_SCRIPTS` list shellcheck reads.
- `tests/deploy/backup_script_support.py:1-140`: the stand-in seam for the watcher's test.
- `tests/agent_workflow/test_loop2_deploy_skill.py`: the skill's two copies, four files, no IPv6 literal, no `mikr.us`, description under 400 characters (370 now).
- `.claude/skills/loop2-deploy/references/backup_and_restore.md` (installing and reading sections), `setup_and_secrets.md` (headings, "Installing a script from an exact commit") and `troubleshooting.md` ("Installed-script warning"): where the skill's additions go and what they replace.
- `src/browser/view/last-resort.ts`, `src/browser/view/app.ts:140-280`: the callback place and the dedupe guard the report must use.
- `src/server/account-policy.ts` (grep for constructor and limits): where a limit and its test clock live.
- `foundations/glossary.md` entries "deployment", "test server", "public address", "blocked account"; `foundations/part_map.md` whole (the handoff names the parts); decision D-09 and D-323 headings by grep.
- `.runs/task-cycles/skad-wiem-o-awarii/` listing: confirmed `cycle.md` exists; not read.
- The technology reports, "Rekomendacja i ryzyka", "Gdzie zapis leży dziś" and "Czego nie wiadomo o serwerze": the safeguards used above.

## Searches not found or unclear

- Which account runs the deploy script's forced command on the server (root or another user) — the repository does not say, by design (D-13). It matters for the owner of `/var/log/loop2-app.log`; the spec leaves the name to the human's private note.
- Whether `logrotate` runs daily on this host (an unprivileged LXC): no source; the human's check in step 2 of E3.
- Docker behaviour I could not read a source for in this session: whether `State.StartedAt` changes on a restart by the restart policy and by a host reboot (the design relies on it), whether `--since` is inclusive and `--until` is inclusive of the boundary second, whether `docker compose logs` reads a `local`-driver container's whole log. The stand-ins cannot prove them. The spec marks the windowing as unchecked until the first real failure line, and the `restarted` message is proved by the human's trial in step 4 of E3.
- Whether `pusher` is on cron's `PATH` for the watcher: the backup script's identical `PATH` constant and its proven use is the only evidence.
- Whether a host reboot leaves a false `down` message (cron may run before Docker has restarted the containers): unknown; named nowhere in the spec because the six-hour throttle bounds it. The maker may add it to the skill's list if a source shows it.
- Whether the repository settings still say "public" for the environment fact of row 8: the task says so; the foundation step reads it.
- `guidelines/testing.md` has no row for the new route or for the `deploy/` watcher; no guideline names who writes them in a feature cycle (see the second reading above).

## Revision (after the spec review `02-spec-review.md`, verdict FAIL)

Spec revised once; the reviewed text is kept as `spec-reviewed.md`. Nothing outside the review's findings and the orchestrator's answers was widened.

- Finding 1 (the `failure` word of the LIMITED line): B2 now writes it through `writeFailure` with the `failure` word `browser`, kind `ReasonedFailure`, code `LIMITED`. C3's table says the browser kind counts the accepted reports and the LIMITED line, and the server kind counts `failure` words other than `browser`. A flood case is added to the route's tests (first refusal writes one LIMITED line, later refusals none) and to the watcher's tests (a flood raises the browser kind only, one `pusher` call). Orchestrator answer 1.
- Finding 2 (A4's false claim): the filter is now the exact starts `{"event":"account-` and `{"failure":"account-block"`; the claim that every sentence begins with a letter is removed and replaced by the real reason (two sentences begin with the address, `account-block.ts` lines 91-92; an address can begin with `{`). The trust-boundary row follows. Foundation entries row 1 carries the corrected reason. A residual risk (an address typed to imitate an exact start) is named for the skill. Orchestrator answer 2.
- Finding 3 (row 4): the invariant is worded as "a deployment that dumps leaves the log there; one that cannot dump says so in the deploy log and goes on", with two test cases, one each.
- Finding 4 (E3 step 6): the human finds the account that last changed the cron line (`git log -1 -- .github/workflows/check-address.yml`), sets the notification and runs the trial from that account, or reports the scheduled path as unchecked.
- Smaller points: Foundation entries rows 1 and 2 say the numbers are this design's parameters, not findings of the technology reports (row 2 notes D-105 as the one precedent for 30 an hour); C7 and D name `deploy/loop2-watch`, `deploy/loop2-watch.cron`, `deploy/loop2-app.logrotate` and the workflow for `NOT_ROUTES`; the stale count "siedmiu tras / ósmej" in `guidelines/testing.md` is noted in the route tests and in Foundation entries as scheduled, not edited.
- Review's point on the dump-based safeguard, `guidelines/testing.md` not edited, numbers without sources: not findings; kept as they were (the numbers now carry the "design parameters" note).

### Searches not found or unclear (current)

- Which account runs the deploy script's forced command on the server: not in the repository by design (D-13); the owner of `/var/log/loop2-app.log` is named by the human from the private note.
- Whether `logrotate` runs daily on this host: no source; the human's check in E3 step 2.
- Docker behaviour with no readable source here: whether `State.StartedAt` changes on a restart by policy and by a host reboot; the inclusivity of `--since` and `--until`; that `docker compose logs` reads a `local`-driver container whole. The spec marks the windowing as unchecked until the first real failure line; the `restarted` message is proved by the human's trial in E3 step 4.
- Whether `pusher` is on cron's `PATH` for the watcher: only the backup script's identical `PATH` as evidence.
- Whether a host reboot gives a false `down` message (cron may run before Docker restarts the containers): unknown; bounded by the six-hour throttle.
- Whether the repository settings still say "public" for the environment fact of row 8: the foundation step reads it.
- Which account GitHub notifies for a manual dispatch versus a schedule: the task's source states the scheduled case only; E3 step 6 now asks for the trial from the account that last changed the cron line.
- `guidelines/testing.md` has no row for the new route or the watcher, and its guard-case count goes stale; no guideline names who writes them in a feature cycle.
