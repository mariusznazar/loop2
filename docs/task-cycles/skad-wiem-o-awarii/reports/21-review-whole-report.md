PASS c493ba8c44780dfe76724bd618aed97b03e10a5f

# Review of the whole change, task cycle `skad-wiem-o-awarii`

Range `00aa818e59ab484358970f98af1f4ab61e969e4c..c493ba8` (13 commits). `git rev-parse HEAD` = `c493ba8c44780dfe76724bd618aed97b03e10a5f`, the head given. `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (`git -C .the-way rev-parse HEAD`), unchanged by the range. Worktree `the root of the repository`, clean before and after my checks (`git status --short` empty). Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`. I changed no tracked file; the one scratch worktree I made for a mutation run is removed.

Counts: blocking 0 · Minor 5 new (N1-N5, all within the task) + decisions on the slice reviews' Minor findings below · out of scope 3 (O1-O3).

## Blocking findings

None.

## Against the task: To do 1-8 and Settlements to record 1-8

| Item | Met by | Judgement |
|---|---|---|
| To do 1, dump before recreate | `deploy/loop2-deploy` (`dump_container_logs` between `build_image` and `start_container`), slice 2 | met; reviewed in slice 2 |
| To do 2, `local` driver on both services | `compose.yaml`, slice 1 | met; no other `logging` key (test and `loop2-host-sharing` pass) |
| To do 3, `account-block` JSON lines only | the human's command in the skill, spec A4 (no code change by design) | met; I tried the filter, see Checks |
| To do 4, logrotate file | `deploy/loop2-app.logrotate`, slice 1 + fix (`compress` added) | met |
| To do 5, watcher and cron file | `deploy/loop2-watch`, `deploy/loop2-watch.cron`, slice 5 + fix | met |
| To do 6, scheduled workflow | `.github/workflows/check-address.yml`, slice 6 | met; judged below |
| To do 7, browser sends, server writes | `src/browser/{account-api,view/app,view/last-resort}.ts` (slice 4), `src/server/{account-routes,account-policy,log-line}.ts` (slice 3) | met |
| To do 8, skill | both copies of `loop2-deploy` (slice 7), byte-identical (`diff -r` empty) | met; both missing WAY-139 items covered (lifetime of the log, where the owner learns of a failure) |
| Rows 1, 2, 3 | D-352, D-353, D-347 edited | present; compared with the code below |
| Rows 4, 5, 6 | invariants `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report` | present; each cited by tests (see below) |
| Rows 7, 8 | `docker-container-log-removal`, `github-scheduled-workflow-disabling`, `loop2-repository-visibility` | present; I re-read the two sources that can be re-read (see Checks) |
| Human actions 1-4 | skill `references/setup_and_secrets.md` "The failure record and alerts", steps 1-7 | all four covered; nothing is installed or run by the change |

Source fidelity: D-352 and D-353 *Rejected* hold the task's *Not chosen* lists (1, 2, 4-9 and A, A2, B-E2, G-J) with a cost each; the one dropped clause ("probable collision with D-347") is correct because D-347 no longer forbids it. The numbers (about four weeks, 100 MiB, four generations, 300 s, 30 reports an hour, 6 hours, 6 a day) are the spec's design parameters and are not presented as findings of the technology reports. Out of scope of the task (heartbeat of the nightly backup) is not done. I found nothing added that nobody asked for.

## Trust boundaries (step 4 answer: yes) and the irreversible operation

- `src/server/**`, `POST /api/browser-failure`: re-read `account-routes.ts` and `account-policy.ts` at head. Guards (`mutationGuards`, 16 KiB), the account gate (`router.all` list), exact three string fields, anchored patterns (no `m` flag, so a trailing line break fails), count taken after the patterns, `accountId` from `request.session` only, 204 without body, 429 with one `LIMITED` line per hour. The limiter keeps one array of at most 30 numbers and one number, whoever sends. Slice 3's review ran four mutations (limit 31, `.` in a word, route outside the guarded list, window 30 minutes), each caught; I did not repeat them.
- `deploy/**`: watcher (state file, `docker inspect` answer, container log, deploy lock, own lock), dump (header holds validated commit names only; dumped content never reaches the console or the deploy log), logrotate file (no user name, no secret). Slice 5's review ran the hostile inputs (NUL, option-like lines, huge lines, damaged state) and a mutation that survived and was fixed. The A4 shell command I tried by hand.
- `.github/workflows/**`: judged below.
- Irreversible operation: none performed. Every file is a repository file; nothing runs against the server or GitHub (all Docker, `flock`, `pusher`, `curl` in the tests are stand-ins under a temporary tree). The skill's human steps match spec E3 (1-7) and the task's four *Human actions*; the step to reinstall `loop2-deploy` before the merge is there, with the reason.

## Slices without a review of their own

### Slice 4 (browser sends its report, `563510d..7bf49e5`)

Judged as a slice. Behaviour is right: `onLine` is called inside the "not written before" guard, after `console.error`, so one report per distinct line per page load (including the React card's `report()`); `app.ts` guards the call with `try`/`catch` and `.catch`, so a throwing or refusing client cannot become an error of the handler; the client method goes through `noContentRequest` and the same `exchange` (relative path, `same-origin`, `redirect: "error"`, `keepalive` false). The client keeps no state. Console line and screen sentence are unchanged. Part-map sentence matches.

- Executor's own-work check (the server must accept every line the page sends): the right requirement. It was met by reading slice 3's cases that feed the route the real words of `errorWords` and the two real places; I confirm those cases exist (`tests/http.test.mjs`, slice 3 review). It did not run them in the slice, but the cycle's gate does.
- Tests against `guidelines/testing.md`: expected values are literals; the `uncaught-failure` file uses the `tests/view/page-document.mjs` imitation and its `assert`; no existing test was changed. The "no keepalive" check does catch the property: I changed the default `keepalive = false` of `exchange` to `true` in a scratch worktree and `npm test -- tests/account-api.test.mjs` failed (exit 1) in the new report test (see Checks).
- The executor read the testing guidelines and the styleguide after the work. I found no rule that this order made it break. The styleguide does not apply (no element, style or screen changes).

N1-N3 below come from this slice; none blocks.

### Slice 6 (scheduled check, `996e42c..fc493ba`)

Judged as a trust surface.

- `workflow_dispatch` input: one boolean, reaches the script only through `env: FORCE_FAILURE`, compared to the string `"true"`; the only `${{ }}` in the file is that line, and a test (`test_expressions_reach_a_run_script_only_through_env`) pins it. On a scheduled run the input is empty and the check goes on to the address. Anyone who can dispatch has write access, which already allows a push.
- Permissions: `permissions: {}` at workflow level; no checkout, no secret, no `ssh`, no Docker, no `github.*` expression; the only host is the declared public address and a test shows it equals the one in `deploy.yml`. Fork behaviour: scheduled workflows do not run on forks by default, and the file holds nothing a fork would gain.
- Concurrency: group `check-address-loop2`, not `deploy-loop2`, so it can never delay or cancel a deployment. Worst case of one run is 6 x 15 s + 5 x 20 s = 190 s, under the 5-minute job timeout and under the 5-minute interval, so scheduled runs do not overlap. One consequence with no action needed: a manual forced-failure run that is still going when a scheduled run starts would be cancelled and send no failure e-mail; the forced run ends in a few seconds and the human sees "cancelled" and repeats it.
- Cron `3-58/5 * * * *` is minutes 3, 8, ..., 58, never 0; the test derives the set and the gaps.
- Test: text checks plus the extracted run script run by Git's bash with `curl` and `sleep` as functions (200 passes at once; six non-200 fail after six calls and five 20 s sleeps with `::error::`; 503, 000, 200 passes at the third; forced failure makes no request). Each would fail if the behaviour broke (a 200 check accepting any 2xx, a missing sleep, a forced check placed after the request, a second host). Ran green (17 tests, exit 0).
- Route tripwire: the workflow, the watcher, its cron file and the logrotate file are named in `NOT_ROUTES`. **Changed invariant test: `tests/invariants/test_account_server_typecheck.py`** (the allowance grew by four names plus a docstring sentence; no assertion weakened; the tripwire still counts every other `deploy/*` file and workflow). **Also changed: `tests/quality/test_quality_invariants.py`** (`BASH_SCRIPTS` gains `deploy/loop2-watch`).
- No finding.

### Slice 7 (skill, `fc493ba..c493ba8`)

- Names checked against code at head: subjects `loop2_gra_nie_dziala`, `loop2_usluga_niezdrowa`, `loop2_ponowny_start`, `loop2_awarie_serwera`, `loop2_awarie_przegladarek`; `/var/lib/loop2-watch/state`, `/var/log/loop2-watch.log`, `/run/loop2-watch.lock` (constants of `deploy/loop2-watch`); log shapes `skipped:`, `run: due=...`, `dropped:`, `stage ...`, `end: failed (exit N)`; the header `<UTC> loop2-deploy | previous commit X, new commit Y` and the texts `dump: the size of ... went from N to M bytes` and `warning: the dump of the log of both loop2 services ... failed (exit N; ...)` (`deploy/loop2-deploy`); `.1` plain and `.2.gz` to `.4.gz` (`rotate 4`, `compress`, `delaycompress`); six installed copies (`compare_installed_script`); `POST /api/browser-failure`, 30 an hour, `LIMITED`, `"failure":"browser"`; the section name "Installing a script from an exact commit" exists in `references/setup_and_secrets.md:78`. All exist. `description` is 394 characters (under 400); the skill test passes.
- The filter of the `account-block` command: wording true to what it does, tried by hand (Checks). It passes a JSON event line and a JSON failure line, and fails the command's sentences, a sentence whose address starts with `{`, and the crash line (`{"failure":"uncaught"`), as the skill says. Residual risk: acceptable for a command a human types, with the wording fix of N4. The effect of a pass is one forged line in a file an agent reads; it cannot run anything and it cannot carry an address because the forged line must be a complete `{...}` line.
- The `printf` format strings of the command use `\n`, not real line breaks (the executor's slip was corrected before the commit; I read the committed text).
- Two copies identical; four files each; no IPv6 literal; no `mikr.us` name; no deploy-account name (the steps say `<run account>`).

## The foundation entries against the code

- D-352 (record): every binding sentence has its code: append before recreate and non-fatal failure (`dump_container_logs`), `local` driver on both services, weekly or past 100 MiB, four generations, only JSON lines of `account-block`, agent reads through `mikrus`. Nothing in it is broader than the stanza or the script.
- D-353 (three ways): watcher (kinds, window by comparing states, deploy lock, throttle, fixed text), scheduled check (200 only, no secret), browser report (limited, written as a failure line, counted by the watcher as its own kind). The silences it names are the ones the skill names. *Verification* "complies" and "violates" lists match the code (no message holds a count, a commit or an account; the route takes nothing but the three words; the workflow checks out nothing).
- D-347 edit: the question is narrowed to the browser; the old prohibition on a server route and on looking in the server's output is gone; nothing else in the repository cites D-347's old sentence (grep over `foundations`, `guidelines`, `src`, `tests`, `.claude`, `.agents`: only the entry itself and the comments in N1).
- Invariants: all three are cited by `invariant: <name>` lines: `loop2-deploy-log-dump` (2 tests, `tests/deploy/test_loop2_deploy_dump.py`), `failure-watcher-message` (8, `tests/deploy/test_loop2_watch_message.py`), `browser-failure-report` (7 in `tests/http.test.mjs`, plus tags discussed in N2). Each would fail if its property broke: slice 2's review mutated the order and the non-fatal failure (both caught); slice 5's review found one surviving mutation (raw output of an off-shape `inspect` into the log), the fix added seven subtests and the second review showed them failing on that mutation; slice 3's review ran four mutations. `Method: test` is therefore true at head.
- Environment facts: `delete.go:160` at `v28.1.1` holds `containerfs.EnsureRemoveAll(container.Root)` and `container.go` holds `GetRootResourcePath("local-logs")` (I fetched both); `gh repo view mariusznazar/loop2 --json visibility` prints `PUBLIC`. The 60-day sentence I did not re-fetch (the writer quotes a live page and an archive capture).
- Part map: `deployment` Files gain the workflow and the sentence names the watcher, the logrotate file and the check; `account-server` and `browser-view` sentences name the report. `foundation_check.py`: "0 errors", exit 0. WAY-263 (a changed entry restated more broadly): none found.
- Glossary: "watcher" and "dump" have no glossary entry; no sentence in the files would be read wrongly for lack of one. No finding.

## Minor findings (new in this review; all within the task unless stated)

**N1 (slice 4). Three comments cite D-347 for sending the report.** `src/browser/view/app.ts:238` ("Sends a line the page wrote to the server (D-347)"), `src/browser/view/last-resort.ts:41` ("report each distinct line once (D-347)") and the header comment of `tests/view/uncaught-failure.test.mjs:563`. D-347 now answers only for how an agent reads the browser's console and expressly no longer speaks about a server route; the report is D-353 (and D-253 for "once"). A reader who follows the citation lands on a decision that does not say what the comment says. Fix: cite D-353 (and D-253).

**N2 (slice 4). The invariant tag `browser-failure-report` stands on tests that do not prove it.** `tests/view/uncaught-failure.test.mjs:562`, `:591`, `:625` (and `tests/account-api.test.mjs:905`, `:931`). The invariant says the *server* writes only a kind, a code and a place of the allowed form with `accountId` from the session. The three view tests prove "once per distinct line", "own place of the card" and "a failing client does not become an error of the handler", which are D-253 and D-353 behaviour, not that rule. The tag makes the invariant look covered on the browser side. Fix: drop the tag from the three view tests; the two client tests may keep it (they show the client sends exactly the three words).

**N3 (slice 4). The "no keepalive" check wraps the real `fetch`.** `tests/account-api.test.mjs:882-897` (`withRecordedFetch`). The guideline `guidelines/coding-browser-api-client.md` Examples says the test "Niczego nie podstawia za fetch", and `guidelines/testing.md` says to check a call only "dla skutku widocznego poza produktem". It is a pass-through spy, restored in `finally`, the effect it protects (a report using the page's keepalive quota so the save at "Wyloguj" fails) is outside the product's reach, and the server cannot see the option. Its mutation proof is above. Keep. The Example sentence is now untrue of this file; see O2.

**N4 (slice 7). The residual-risk sentence understates where the line break can come from.** `.claude/skills/loop2-deploy/SKILL.md:363-367` (and the `.agents` copy). It says "an address that the human types on purpose with a line break inside". `normalizeEmail` (`src/server/account-policy.ts:83-88`) accepts any text around exactly one `@`, so a player can register an address with a line break whose middle line is a complete JSON event, and the human can then paste it. Only the two sentences that begin with the address ("... was already blocked", "... was not blocked") can pass the filter this way (the others have the address in the middle and end with a full stop). The effect stays a forged line in the dump. The risk is acceptable; the sentence should say that the address may also come from a pasted registered address, and the same advice ("type the address as it is registered", or check it for a line break before pasting) stands. Fix: one sentence, both copies.

**N5 (slice 7). The rollback paragraph omits the Compose-file case of slice 2's Minor 3.** `.claude/skills/loop2-deploy/SKILL.md:397-404`. The dump reads the *new* commit's `compose.yaml`. A rollback to a commit whose Compose file lacks `app` or `cloudflared` (the "Rollback across the tunnel transition" section in `references/troubleshooting.md:151` describes one) makes `docker compose logs` fail, the script warns and the log of the running containers is not kept. The loss is not silent (the `warning:` line), but the skill's own paragraph on rollback and the record should say it. Fix: one sentence, both copies.

## Decision per Minor / out-of-scope finding of the slice reviews

| Finding | Where | Decision |
|---|---|---|
| Slice 1 Minor 1, `Method: test` before tests | `foundations/invariants.md` | resolved: all three invariants are cited |
| Slice 1 Minor 2, uneven wrap in D-347 *Rationale* | `foundations/decisions.md` (the line "chronicle only if the chronicle enters the save. Risks taken, ...") | cosmetic, no effect on a reader; not worth a foundation edit now; fold into any later edit of D-347 |
| Slice 1 Minor 3, comment above `NOT_ROUTES` | `tests/invariants/test_account_server_typecheck.py:75-77` | resolved: the comment was rewritten and now names the watcher's own test; it does not mention the logrotate file and cron file, harmless |
| Slice 2 Minor 1, real line break inside the `printf` format of the dump header | `deploy/loop2-deploy:342-343` | **fix within the task**: write `\n`; it is a root script every deployment runs, the break is a trap for the next editor, and the 9 dump tests plus `loop2-host-sharing` and `loop2-deploy-keeps-running` pass with `\n` (that reviewer showed it) |
| Slice 2 Minor 2, wall-clock bound in the stuck-Docker test | `tests/deploy/test_loop2_deploy_dump.py` | no fix: 24 s of margin, exit 124 and the single warning already prove the cut |
| Slice 2 Minor 3, dump reads the new commit's Compose file | skill | **fix within the task** as N5 |
| Slice 3 Minor 1, threshold as an option of `AccountPolicy` against `guidelines/coding-account-policy.md` | `src/server/account-policy.ts:161`, guideline "Zegar w testach" | code stays: the spec asks for it, and a test needs a small limit; the departure is from an *Example* sentence ("wartości progów i okien opcjami nie są"), not a rule with an invariant. Schedule a one-sentence change of that example (O2); no code fix |
| Slice 3 Minor 2, constructor check untested | `src/server/account-policy.ts:198-204` | no fix: same habit as the sibling check, no caller can pass a bad value |
| Slice 3 Minor 3, "first refusal of a window" read as "first refusal with no notice in the last hour" | `admitBrowserReport` | no fix; the skill and D-353 say "first refusal of an hour", which is true; the watcher counts lines and does not assume one per burst |
| Slice 3 out of scope, a body can imitate the server's `LIMITED` notice | route | stays out of scope; D-353 *Lacks* accepts false reports |
| Slice 5 M1, header comment claims more than the script does | `deploy/loop2-watch:23-25` ("Nothing read from a log or from Docker, no number and no name of a commit or an account goes into one, into the state or into the log of this script") and `:39` ("Every constant stands in this block") | **fix within the task**: narrow the sentence to the message (the state holds container ids and start times, the log holds counts and statuses; the patterns and the two anchored prefixes stand outside the block). It is the root script's own statement of its invariant, a wrong rule here travels to a later edit; comment only |
| Slice 5 M2, a clock stepped back holds a kind longer | `deploy/loop2-watch:424-437` | no fix: rare, bounded, and the window handling has a test |
| Slice 5 M3, the `read` loop is slow on huge input | `deploy/loop2-watch:328-340` | no fix: no outside party can send input of that size (30 reports an hour, each under 200 characters); a failure is visible in the log, never silent. Add to the unchecked list (Linux speed not measured) |
| Slice 5 M4, a missing `flock` is logged as a held lock | `deploy/loop2-watch:171-176`, `:201-208` | no fix: the next-morning check (state age and log) shows it; the line could name the status, optional |
| Slice 5 M5, NUL inside the prefix still counts | script | no fix: harmless, only a count above zero matters |

## Out of scope

- **O1.** `guidelines/testing.md` stale places (spec S2, scheduled through the testing-guidelines skill, not edited): the `src/server/` row of "Trust boundaries" (`guidelines/testing.md:170`: "siedmiu tras", "ósmej"; the browser-report cases are not named) and the expected-results rows (`:218-220`: the route lists and "dziewięciu trasach"); also the `deploy/` row (`:175`) does not name the watcher or the dump. Also its "Where in code" does not list the new test files. These were stale-by-design; nobody has yet scheduled them, so the orchestrator should do that before the request opens.
- **O2.** `guidelines/coding-account-policy.md` ("Zegar w testach": "wartości progów i okien opcjami nie są") is now untrue of its own exemplar file, and `guidelines/coding-browser-api-client.md` ("Niczego nie podstawia za fetch") is untrue of `tests/account-api.test.mjs`. One sentence each, through the coding-guidelines skill. Same scheduling as O1.
- **O3.** `guidelines/coding-browser-module.md` (example "Gra na stronie i odpowiedzi serwera") describes the last-resort handling as writing one console line; true, but no longer all it does. Optional wording through the same skill.

## Declined to judge

- That Docker, `logrotate`, `pusher`, cron, `flock` on a read-only file, bash 5.1 and GitHub behave as the files assume: not provable in this sandbox; listed under unchecked.
- The numbers (100 MiB, four generations, 300 s, 30 reports an hour, 6 hours, 6 a day): the spec's design parameters.
- Content and wording of the *Based on* citations copied from the task (writer's concern 4): outside this review.
- Whether `Method: test` in place of `review` for the invariants is the right method before the tests exist: moot, the tests exist.
- Glossary entries for "watcher" and "dump": Minor by the grade rules and no sentence is misread without one.

## What no automated check proves (for the request's *unchecked* list)

The handoff's list is right and complete for what the skill and the files already say. I would add four items the skill's "What no test proves" does not name; nothing in the files claims more than is proved.

From the handoff: Docker's `local` log driver and `docker inspect` fields (and the `.State.StartedAt` form the watcher's pattern expects); `--since`/`--until` of `docker logs`; that `docker compose logs` reads a `local`-driver container (and the json-file containers of the first deployment); logrotate on the host (that it runs daily, accepts the stanza with `su root root` and `copytruncate`, and the forced rotation of a one-line file); `pusher` delivery; cron running the watcher; the GitHub e-mail for a failed scheduled run; bash 5.1 on the host; a shared `flock` on a read-only file while the deployment holds the exclusive one.

Add:
1. The schedule of the workflow firing at all (GitHub does not run it before the merge; "Run workflow" is not offered before the merge either; the 60-day disabling is not exercised).
2. The `account-block` command of the skill on the server's shell: tried only in Git Bash with a stand-in for `docker`.
3. The report from a real browser: the view tests run on jsdom and the client test on Node's `fetch` against the real local server; a real browser's sending of `Origin` on the same-origin POST, `redirect: "error"` and the page's behaviour on a real uncaught error are not exercised (the same holds for the existing account routes).
4. The watcher's speed on a large window on Linux (slice 5 M3: measured only through the Windows seam).

## Checks I ran (from the worktree root unless noted)

| Command | Exit |
|---|---|
| `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD` | 0, 0 (`c493ba8c...`, `294af7fd...`) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 (5 tests) |
| `npm test -- tests/deploy/test_check_address_workflow.py` | 0 (17) |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 |
| `npm test -- tests/account-api.test.mjs` | 0 |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 (9) |
| `npm test -- tests/invariants/test_loop2_host_sharing.py` | 0 (18) |
| `npm test -- tests/deploy/test_loop2_log_storage.py` | 0 (4) |
| `npm test -- tests/invariants/test_loop2_distinct_address.py` | 0 (2) |
| `npm test -- tests/invariants/test_loop2_deploy_trigger_input.py` | 0 (10) |
| `npm test -- tests/deploy/test_deploy_workflow.py` | 0 (16) |
| `npm test -- tests/invariants/test_loop2_deploy_keeps_running.py` | 0 (13) |
| `npm test -- tests/deploy/test_loop2_deploy_dump.py` | 0 (9) |
| `npm test -- tests/deploy/test_loop2_watch_message.py` | 0 (8) |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml` on `tests/deploy/test_check_address_workflow.py`, `test_loop2_watch.py`, `watch_script_support.py`, `test_loop2_deploy_dump.py` | 0 |
| `node_modules/.bin/prettier --check` on the changed `src/` files and on `tests/http.test.mjs`, `tests/account-api.test.mjs`, `tests/transport.test.mjs`, `tests/view/uncaught-failure.test.mjs` | 0 |
| `node_modules/.bin/eslint src tests/view/uncaught-failure.test.mjs tests/account-api.test.mjs` | 0 |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | 0 (identical) |
| Mutation in a scratch worktree of the head (`git worktree add --detach` under the scratchpad, `node_modules` joined by a junction, both removed afterwards): `src/browser/account-api.ts` default `keepalive = false` changed to `true`, then `npm test -- tests/account-api.test.mjs` | 1, as intended: the new report test fails |
| Hand trial of the skill's `account-block` filter in Git Bash with a stand-in `docker`, script `...\scratchpad\filt.sh` | event line appended; failure line appended and `exit 3` shown; sentence starting with `{`, `... was not blocked` and the `"failure":"uncaught"` line not appended; an address with a line break (middle line a complete event object) passes, as N4 says |
| `curl` of `moby/moby` `v28.1.1` `daemon/delete.go` and `container/container.go`; `gh repo view mariusznazar/loop2 --json visibility` | `EnsureRemoveAll(container.Root)` at line 160, `local-logs` at line 465; `PUBLIC` |

Not run: the whole gate (the cycle's own run); `tests/http.test.mjs`, `tests/transport.test.mjs`, `tests/startup.test.mjs`, `tests/deploy/test_loop2_watch.py` (183 s) and `test_loop2_deploy_build/switch.py` (green at their slices' reviews; the files are unchanged since); `tests/quality/test_quality_invariants.py` (shellcheck of the three scripts; green at slice 5's review, `deploy/loop2-deploy` and the watcher unchanged since); `npm run typecheck`; any run on Linux, with real Docker, `flock`, `pusher`, cron, `logrotate` or GitHub.

## Reaches beyond the handoff

- `guidelines/testing.md`, `guidelines/coding-account-policy.md`, `guidelines/coding-browser-api-client.md` and `src/browser/AGENTS.md` whole; `guidelines/coding.md` lines 1-30 and 105-225 (recording, hiding, identifiers, secrets and logging scope); `guidelines/coding-browser-module.md` lines 296-342 (the example on the page and the last-resort handling). Not read whole: `guidelines/styleguide-browser-view.md` (672 lines; the change adds no element, style, screen or state), `guidelines/coding-http-application.md` (slice 3's review compared the route with it), the rest of `coding.md` and `coding-browser-module.md`. This is a departure from "each whole" for the files whose rules the change cannot reach; I name it so the orchestrator can ask for more.
- `src/server/account-block.ts` (lines 25-100) and `src/server/log-line.ts`: to check the shapes the filter and the watcher's prefixes rest on.
- `src/browser/view/last-resort.ts`, `src/browser/view/app.ts` (lines 195-260): to check the callback's place and scope.
- `deploy/loop2-watch` whole, `deploy/loop2-deploy` (the dump stage, `start_container`, locks), `deploy/loop2-backup` (lock lines, `pusher` use), `compose.yaml`: to compare the foundation entries and the skill with the code.
- `foundations/decisions.md` D-253 (whole) and `foundations/environment_facts.md` `mikrus-pusher-mail`: to check D-253 and the `pusher` interface against the new text.
- Slice reports and reviews `reports/05`, `07`, `09`, `11`, `13`, `14`, `16`, `18`, `19`, `20` (the handoff names them).
- Web: `raw.githubusercontent.com/moby/moby/v28.1.1/{daemon/delete.go,container/container.go}`; `gh repo view`.

## Searches not found or unclear

- The 60-day sentence of the GitHub page behind `github-scheduled-workflow-disabling` was not re-fetched here.
- Where GitHub offers "Run workflow" for a workflow that is not yet on the default branch: not in the foundation; the skill is worded to need none.
- Whether `logrotate -f` skips a one-line file under `notifempty`: not found; the skill's step works either way.
- Nothing else looked for was missing. No question for the orchestrator.
