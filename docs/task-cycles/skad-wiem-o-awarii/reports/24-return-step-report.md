# Report 24 - the return step of the task cycle `skad-wiem-o-awarii`

**Status: done.** Worktree `the root of the repository`, branch `task/skad-wiem-o-awarii`, start head `ae151c4dfe7d69b47bec823903dda696c3cf9343`, `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (checked with `git -C .the-way rev-parse HEAD`). Nothing pushed. `git status` was clean when I started (no running `npm test`).

## Commits

| Commit | Files | Lines |
|---|---|---|
| `04a7eb5` docs: :memo: add the environment facts of the Compose recreate, the bound of the local log driver, the rotation rules of logrotate, the shortest interval of a scheduled workflow and the free runs of public repositories | `foundations/environment_facts.md` | +30 |
| `5f085f7` docs: :memo: name those facts in Based on of D-352 and D-353, say a restart of either container, a warning line and the limits that keep the server kinds free, and drop a risk that the comparison of installed copies now answers | `foundations/decisions.md` | 6 lines changed (+6 -6) |
| `ca4370d` docs: :memo: add to the responsibility of the part deployment that it appends the log of the replaced containers to a file on the host | `foundations/part_map.md` | +5 -4 |

All three carry `mariusznn@gmail.com` (checked with `git log --format='%h %ae'`).

## 1. Foundation compared with the code at head - the entries this change wrote

I read the code (`deploy/loop2-deploy`, `deploy/loop2-watch`, `deploy/loop2-watch.cron`, `deploy/loop2-app.logrotate`, `compose.yaml`, `.github/workflows/check-address.yml`, `src/server/account-policy.ts`, `account-routes.ts`, `log-line.ts`, `src/browser/account-api.ts`, `view/app.ts`, `view/last-resort.ts`), the diff of the skill `loop2-deploy` and the names of the tests.

| Entry | What matched | What no longer matched, and the correction |
|---|---|---|
| D-352 | The append just before `start_container` and after the build (`dump_container_logs`); `warning:` and go on on failure; both services on `driver: local`; the stanza (`weekly`, `maxsize 100M`, `rotate 4`, `compress`, `delaycompress`, `copytruncate`, `su root root`) gives "weekly or sooner when it grows large", four generations, `zgrep` for the compressed ones, and no deployment account; the `account-block` lines are appended by the human with the filter of the skill (JSON lines only); the human's steps (create the file with the account's owner, install the rotation, reinstall the script). | *Verification* complies said "a line starting `warning:`", but the deploy log line is `<time> loop2-deploy: warning: ...`. Now "a `warning:` line". *Based on* quoted three citations the decision rests on (Compose removes the replaced container, the `local` driver's 100MB bound, `logrotate`'s rotation); they are now facts (section 4) named in *Based on*. |
| D-353 | Watcher run by cron every five minutes, reads state, health, start time and the log of the game container, passes over a held deployment lock (checked twice), throttles per kind and per day, calls `pusher` with a fixed subject and text; the workflow (`3-58/5`, six attempts, `permissions: {}`, no checkout, no secret); the route limits to 30 an hour, writes `{"failure":"browser",...}` that the watcher counts; the "LIMITED" first refusal of an hour also begins `{"failure":"browser"` and is counted as the browser kind; the origin guards of D-104 are on the route; the page posts each distinct line once. | The sentence said "a restart of the game's process", but `evaluate()` compares the start time of both containers (game and tunnel) and the text says "game or tunnel". Now "a restart of either of them"; the *Verification* example says "a container of the game". The example "spends only the budget of the browser kind and leaves the server kind free" was not what the code does: the day's budget of six messages is shared and the browser kind is last in the order, so a flood takes at most four of them (one per six hours). Now "raises the browser kind of message no oftener than the limits of the watcher allow, so that the messages of the server kinds still go". *Rationale* risk "covered by no invariant test and no comparison of installed copies": the deploy script now compares the installed watcher, its schedule and the logrotate file (`compare_installed_script`); I dropped the second clause, the first stays true. *Based on* now names the facts of section 4. |
| D-347 (as edited) | Question and sentence speak only of the game running in the browser; *Verification* and *Rejected* have no ban on a server route; the console line and the sentence on the screen are unchanged by the code (the page still writes the line and cancels the event); the route is D-353's. | none |
| `loop2-deploy-log-dump` | Test `test_loop2_deploy_dump.py` (append before `up`, warning and go on); *Part* deployment. | none |
| `failure-watcher-message` | Five fixed subjects and sentences in the constants; tests in `test_loop2_watch_message.py`; rests on `mikrus-pusher-mail`. | none |
| `browser-failure-report` | `isBrowserReport` patterns, `accountId` only from `request.session`, tests in `http.test.mjs`, `account-api.test.mjs`; *Part* account-server. | none |
| `docker-container-log-removal`, `github-scheduled-workflow-disabling`, `loop2-repository-visibility` | I did not open the Moby sources or the visibility API again; I checked their sentences against the code and the deploy script (`up -d --force-recreate`, repository public in the workflow's premise). The GitHub passage "scheduled workflows are automatically disabled when no repository activity has occurred in 60 days" stands in the live page and in the capture `20261031092549` (opened for the new fact on the same page). | none |

## 2. Entries the task names, and a search of the whole foundation

Searched `foundations/*.md` for D-347, D-352, D-353, `account-block`, `pusher`, `loop2-app.log`, `browser-failure`, `/var/log`, `logrotate`, "running game", "failure watcher", "console". I read whole: D-09, D-12, D-13, D-16, D-17, D-102, D-103 (neighbour), D-104, D-105, D-110, D-137, D-233, D-235, D-252, D-253, D-254, D-347, D-352, D-353 and the invariants `loop2-host-sharing`, `account-mutation-request-guards`, `account-request-transport`, `account-client-requests`, `loop2-api-error-route`, `account-save-backup-failure-notice`, `loop2-deploy-keeps-running`, `loop2-deploy-trigger-input`, `loop2-distinct-address`, and the facts `mikrus-pusher-mail`, `mikrus-host-docker-workloads`, `cron-d-file-rules`. None is false now:

- D-252: the browser report is a failure line with the fixed fields `failure`, `kind`, `code`, `place`, `accountId`, through `console`. True.
- D-253: still true (the page writes its console line once and cancels the event); the report is an addition, not against it. D-353 derives from it.
- D-233: still true for the backup; the new check catches a host that is down, which D-233 names as its own gap (observation of the spec, no change).
- D-104: the route is registered under `mutationGuards` with the 16 KiB limit. True.
- D-102, D-103, D-105, D-110: the new route has its own global limit in memory; their sentences are about logins, registrations, mail and the identity of an account request, none says "every route". True.
- D-12, D-13, D-16, D-09: the watcher and the workflow hold no secret, change nothing as an agent, and nothing is installed by an agent. D-16 speaks of the deploy script's copy; the other copies compared are additions. True.
- D-137: "The `loop2-deploy` skill describes the command, and only a human runs it" still holds; the skill's block for appending JSON lines is a human's step. True.
- D-17: "changes nothing on the host but loop2's own checkout, ... log and lock": the dump file `/var/log/loop2-app.log` is a second log of loop2's own. I judged it covered by "its log" and left the sentence; D-352 (derives from D-17) states the append, and `loop2-host-sharing` is about containers, images, networks and volumes. If the reviewer reads "log" as the deploy log only, the one-word edit is "logs"; not made because it widens D-17 beyond what the task approved.
- Invariants `loop2-host-sharing`, `loop2-deploy-keeps-running` (the dump is before the start and never stops the deployment), `account-mutation-request-guards`, `account-request-transport`, `account-client-requests`, `loop2-api-error-route`, `account-save-backup-failure-notice`, `loop2-deploy-trigger-input`, `loop2-distinct-address`: true; no edit.

Other files that quote an entry or state something the entries now state differently (named, not fixed; not foundation):

- `.claude/skills/loop2-deploy/SKILL.md` and its twin `.agents/skills/loop2-deploy/SKILL.md`: "The browser kind has its own budget, so a flood of browser reports leaves the server kind free" (the day's budget of six is shared; see D-353 above), and "a line starting `warning: the dump of the log of both loop2 services ...`" (the line starts with the time and `loop2-deploy:`; the text after is right).
- `tests/deploy/test_loop2_watch.py:1`, `tests/deploy/test_loop2_log_storage.py:74,83,97,104` refer to "decisions C1 to C7 of the spec" and "A2/A3": labels of the spec of this cycle, which does not stay in the tree. Code comments, not entries.

## 3. Part map (`deployment`, `account-server`, `browser-view`, `agent-workflow`, `build-tools`, `product-foundation`)

- `deployment` *Files*: `.github/workflows/check-address.yml`, `deploy/**` (watcher, cron file, logrotate file), `tests/deploy/**` all there; the sentence named the watcher, the schedule, the logrotate file and the check but not the dump the deploy script itself makes. Changed (`ca4370d`): "deploys a commit ..., appending the log of the containers it replaces to a file on the host", and the last clause now says the watcher and the check tell the owner (the logrotate file does not).
- `account-server`: sentence names the report route; `src/server/**`, `tests/http.test.mjs`, `tests/transport.test.mjs` are listed. No change.
- `browser-view`: sentence names the report; `src/browser/*.ts`, `src/browser/view/**`, `tests/view/**`, `tests/account-api.test.mjs` listed. No change.
- `agent-workflow` (`.claude/**`, `.agents/**`, `guidelines/**`), `build-tools` (`tests/quality/**`, `tests/invariants/test_account_server_typecheck.py`), `product-foundation` (`foundations/**`): unchanged sentences and files fit. The external context already holds GitHub Actions, Cloudflare, HTTP clients and the `pusher` service.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0 ("0 errors"), before and after each commit; it claims every tracked file.

## 4. Environment facts written (`04a7eb5`)

The rule of the decisions' template: a citation that, once it stopped being true, would call the decision into question is a fact; any other source stays quoted. The foundation step (report 05, concern 3) left the citations of the chosen way quoted. The change rests on them, so I wrote them, each read today from the address (live page, and for a page without editions the capture I checked word for word):

| Identifier | Sentence | Named by |
|---|---|---|
| `docker-compose-recreate-removal` | In Docker Compose v2.35.1, recreating a container removes the container it replaces. (`convergence.go`, `recreateContainer`) | D-352 |
| `docker-local-log-driver-bound` | By default, the `local` log driver of Docker preserves 100MB of log messages per container. (capture 2026-10-15) | D-352 |
| `logrotate-rotation-rules` | On Ubuntu 22.04, `logrotate` can handle each log file daily, weekly, monthly or when it grows too large, rotates a file bigger than its `maxsize` even before the time interval ends, and rotates a log `count` times before it removes it. (man page `jammy`, capture 2026-10-09) | D-352 |
| `github-schedule-shortest-interval` | The shortest interval at which GitHub runs scheduled workflows is once every 5 minutes. (capture 2026-10-31) | D-353 |
| `github-actions-public-runs-free` | GitHub charges nothing for the use of standard GitHub-hosted runners in public repositories. (capture 2026-11-08) | D-353 |

The logrotate man page was not in the CDX index of captures; the availability lookup found the capture `20261009164358` and I read it. Left quoted, as precedents of ways not chosen or of risks, not as premises: Docker `configure` and `json-file` pages, `journald.conf`, Grafana, Better Stack, Loki, `docker events` buffer, Healthchecks.io, UptimeRobot, Cloudflare, `sendBeacon`, Sentry, GlitchTip, and GitHub's delay and notification-recipient sentences (D-353 stands if either changes; it only changes a lack).

Not written, and no facts: what `docker inspect` returns in the fields the watcher reads (`.State.Status`, `.State.Health.Status`, `.State.StartedAt`), the `--since`/`--until` windowing of `docker logs`, that `docker compose logs` reads a `local`-driver container, that `logrotate` runs daily on the host, that cron starts the watcher, that GitHub e-mails a failed scheduled run, delivery by `pusher`. The spec and the skill list them as unproved here and give the human's checks; I read no source for them and write none. They stay unchecked.

## 5. Glossary

Checked the words the change uses against `foundations/glossary.md` and the-way's glossary. "deployment" is used as its entry defines it; "public address" and "test server" likewise. "watcher", "dump" (code and log line only; the entries avoid it), "report", "failure", "running game" are words in the reader's own meaning; "running game" is used for the game as served and played, which is the glossary's "running instance", and D-347 is already worded to the browser. Words of the-way's glossary used bare: none in the entries I read (the "test gate" is qualified; "parts" in D-353 means the parts of the part map). No term used against its entry. No glossary entry written.

## 6. Rows of *Settlements to record*, and choices that bind after the merge

All eight rows were written by the foundation step: row 1 D-352, row 2 D-353, row 3 D-347 (edited), row 4 `loop2-deploy-log-dump`, row 5 `failure-watcher-message`, row 6 `browser-failure-report`, row 7 `docker-container-log-removal`, row 8 `github-scheduled-workflow-disabling` and `loop2-repository-visibility`. I added no row. Choices not made entries: the route name `POST /api/browser-failure`, 30 reports an hour, 6 hours per kind, 6 a day, 300 seconds for the dump, the `3-58/5` minutes, `100M`, four generations: they are parameters of the design held by tests and the skill, and the binding sentences of D-352/D-353 hold the rules without the numbers (as the foundation step and the spec chose); no task row or decision asks for them as rules.

## Checks (command, exit)

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at start | 0 ("0 errors") |
| same after the facts (before any decision names them) | 0 |
| same after the decisions and the part map edits, and after the third commit | 0 |
| `git diff --check` | 0 |
| mechanical check of each new fact: passage found word for word in the live page or file and in the capture (Compose line count 1; the `local` sentence; the billing list; the schedule sentence; the `logrotate` DESCRIPTION, `rotate`, `maxsize` text) | passages found; `rotate count` sentence is wrapped over two lines in the text I extracted and was matched by eye |

Not run: any test of the repository (the return step changes only `foundations/`; the full suite is the cycle's run), the-way's own tests.

## Reaches beyond the handoff

- `.the-way/elements/environment-facts/**` (SKILL, read, decide_entry, draft, write, projected, template), `elements/decisions/**` (SKILL, read, decide_entry, template), `elements/part-map/**` (SKILL, decide_entry, write, template), `elements/glossary/template.md` (head), `elements/common/rules.md`, `way_of_working.md`, `common/skill/SKILL.md`, `task_variant.md`, `read.md`: the methods for the entries I wrote.
- Source code and tests named in section 1, `compose.yaml`, the workflow, and the diff of the skill `loop2-deploy` and its `setup_and_secrets.md`: to compare the entries with the code.
- `.runs/task-cycles/skad-wiem-o-awarii/{task.md,spec-reviewed.md,cycle.md,plan.md}` (searched for "fact", "environment fact"): to see what the task and spec say about facts; reports 05 (read whole).
- Web: `docs.docker.com/engine/logging/drivers/local/` (live and capture 20261015110255), `docs.github.com` billing and schedule pages (live and captures 20261108201638, 20261031092549), `manpages.ubuntu.com/.../logrotate.8.html` (live and capture 20261009164358), `raw.githubusercontent.com/docker/compose/v2.35.1/pkg/compose/convergence.go`, the CDX index and the availability lookup of the Internet Archive.
- `a note in the author's notes vault` and `git.md`.

## Searches not found or unclear

- No capture of the logrotate man page in the CDX index; found by the availability lookup (capture `20261009164358`).
- The environment-facts template leaves "which decision sets that an identifier names no value" and "which decision sets that a fact names an edition only where the product stands on it" pending; my identifiers name no value, my sentences name `v2.35.1` and `Ubuntu 22.04` as the existing facts `docker-container-log-removal` (`v28.1.1`) and `cron-d-file-rules` do. I do not know the Compose release on the server (as with the Docker daemon); the fact is true of the edition it names.
- I did not decide whether D-17's "log" should read "logs" (section 2).
- None other.

## Questions

none.

## Skill sentences

Added at the coordinator's request, after the section "Other files that quote an entry". Only these two sentences changed, identically in `.claude/skills/loop2-deploy/SKILL.md` and `.agents/skills/loop2-deploy/SKILL.md`.

1. Old: "The browser kind has its own budget, so a flood of browser reports leaves the server kind free."
   New: "The browser kind comes last in the order and goes once in six hours at most, so a flood of browser reports takes four of the day's six messages at most and leaves room for the server kinds."
2. Old: "On failure it is a line starting `warning: the dump of the log of both loop2 services ... failed (exit <N>; ...)`"
   New: "On failure it is a line with `warning: the dump of the log of both loop2 services ... failed (exit <N>; ...)`"

Commit: see the last line of `git log` for the message "say in the loop2-deploy skill that the browser kind shares the day's budget of the watcher and that the warning line carries the time and the script's name".

Checks: `cmp` of the two SKILL.md files: identical (exit 0). `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`: 5 tests, OK, exit 0.
