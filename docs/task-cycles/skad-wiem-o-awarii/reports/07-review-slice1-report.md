FAIL 89dfbcb1abfc95bb5474f8298b3b5abd7cf7c6d2

# Review of slice 1, task cycle `skad-wiem-o-awarii`

Range `00aa818e59ab484358970f98af1f4ab61e969e4c..89dfbcb` (3 commits: `9b91774`, `bbefd44`, `89dfbcb`). `git rev-parse HEAD` = `89dfbcb1abfc95bb5474f8298b3b5abd7cf7c6d2`, the head given. `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, as pinned. Worktree clean before and after my checks. Method: `.the-way/task-cycle/review/SKILL.md`.

Counts: 1 blocking, 3 Minor, 1 out of scope.

## Blocking

### Important 1. The stanza does not compress anything: `delaycompress` is there, `compress` is not

- Place: `deploy/loop2-app.logrotate:6-13`, and the pinning list `LOGROTATE_DIRECTIVES` in `tests/deploy/test_loop2_log_storage.py:20-29`.
- What: spec A3 (`spec.md:66`) names the effect "compress all but the newest rotated file (`delaycompress`, so the agent's `tail` and `grep` meet plain text in the newest rotated file)". The stanza carries `delaycompress` and no `compress`. In `logrotate(8)`, `delaycompress` "Postpone[s] compression of the previous log file to the next rotation cycle. This only has effect when used in combination with compress." (read at https://manpages.ubuntu.com/manpages/jammy/man8/logrotate.8.html, jammy). Compression is switched on by the `compress` directive, in the stanza or in the host's global `/etc/logrotate.conf`. The repository does not set it, and nobody has read that global file (D-12 forbids a read of it by the agent; the spec's E3 list does not ask the human to check it). On Debian and Ubuntu the shipped `/etc/logrotate.conf` has `compress` commented out; I recall this and could not verify it here (no logrotate on this machine, and the man page does not say what the file holds). So on the usual host the stanza compresses nothing, and `delaycompress` is a no-op.
- Why it matters: the stanza is the whole deliverable of the slice, and the effect named in A3 is not produced by it. Consequences: (1) up to five uncompressed generations of a file bounded only by the size trigger, on the shared Mikrus disk that D-17 and `loop2-host-sharing` protect (a crash-looping container is the very case the spec names as the reason for `maxsize`); (2) D-352 *Rationale* ("the compressed older generations are invisible to `tail` and `grep`") and the planned skill text (`zgrep` of the older compressed ones, spec E1) describe a state the file does not create; the agent would be told to `zgrep` files that are plain text, which works for `zgrep` but misstates the record; (3) if the host's global file does set `compress`, the effect appears by luck of an unread host setting, which D-352 itself calls out as the thing to avoid ("depends on nothing about the server that nobody has checked").
- Evidence: the file lists eight directives and none is `compress` (`grep -n compress deploy/loop2-app.logrotate` finds only the line `delaycompress`). The test pins exactly these eight (`sorted(body) == LOGROTATE_DIRECTIVES`), so a correct stanza with `compress` added would make the test fail until its list is changed too.
- The executor followed the spec's literal directive list, which names `delaycompress` and not `compress`; the cause is in the spec's directive list, so the correction is to the spec text and the plan's slice (add `compress`, extend the test's list, and say it in D-352 if its sentence is to name compression; today it names only "rotation"). A rationale of "the spec said so" does not lower the grade (review skill, section 1).
- Smallest fix: add `compress` to the stanza (before `delaycompress`, order is free) and to `LOGROTATE_DIRECTIVES`; the E3 step "logrotate -d, then one forced rotation" then shows two files, the newest plain and none compressed until the second rotation, which the skill should say.

## Minor

### Minor 1. Three invariants read `Method: test` before any test cites them

- Place: `foundations/invariants.md:1249-1278` (`loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report`).
- What: `.the-way/elements/invariants/template.md:59-60` says "An invariant whose test is not written yet reads `review` (WAY-61)". In this range no file holds `# invariant: loop2-deploy-log-dump`, `failure-watcher-message` or `browser-failure-report` (`grep -rn "invariant:" tests` filtered to the three names finds nothing). `foundation_check.py` does not look for the citing test, so it passes (exit 0, "0 errors").
- Why Minor and not Important: the spec (rows 4-6) and the handoff fix the method to `test` and the tests arrive with slices 2, 3 and 5 within the same request; at the head of the request the claim is true. It becomes Important at the review of each of those slices, and of the whole change, if any of them lands without the `invariant: <name>` line. The reviewers of slices 2, 3 and 5 should check that line. The author's report (05, concern 1) raised this itself.

### Minor 2. The lines of D-347's *Rationale* are rewrapped unevenly

- Place: `foundations/decisions.md` D-347 *Rationale*, the line "chronicle only if the chronicle enters the save. Risks taken, each a hypothesis: the sentence may show with no" (about 120 characters, between neighbours of about 100). Cosmetic; the neighbouring entries wrap at about 100. No effect on a reader.

### Minor 3. A stale comment in `NOT_ROUTES`

- Place: `tests/invariants/test_account_server_typecheck.py:70`. The comment "Files of `deploy/` that start no image: the backup script is read by a test of its own below." now sits above a tuple that also holds the logrotate file, which no test of its own "below" reads (the new test is in `tests/deploy/`). The author's report 06 names it as left on purpose. The comment is imprecise, nothing more.

## Out of scope

- Behaviour of `weekly` with `maxsize 100M` (the executor's concern in report 06): I checked it and it is not a defect, see below; recorded here only because the handoff raised it.

## The executor's concern about `maxsize`, answered

The report 06 recollection ("`maxsize` ... would mean the size cap does not force a rotation sooner than a week") is the description of `minsize`, not `maxsize`. `logrotate(8)` (jammy, read in this review):

- `maxsize`: "Log files are rotated when they grow bigger than size bytes even before the additionally specified time interval (daily, weekly, monthly, or yearly)." ... "When maxsize is used, both the size and timestamp of a log file are considered."
- `minsize`: "Log files are rotated when they grow bigger than size bytes, but not before the additionally specified time interval."

So `weekly` + `maxsize 100M` rotates at 100M even before the week ends, as spec A3 says ("sooner when the file passes 100 MiB"), at the next logrotate run (daily at best, as A3 also says). No change needed for that directive. `M` is 1048576 bytes in logrotate, so 100M is 100 MiB.

## The other directives, against spec A3 (`spec.md:66`) and logrotate(8)

| Spec A3 asks | Stanza | Result |
|---|---|---|
| weekly, or sooner past 100 MiB | `weekly`, `maxsize 100M` | meets (see above) |
| keep 4 rotated files | `rotate 4` | meets |
| compress all but the newest rotated file | `delaycompress` only | NOT met, Important 1 |
| `missingok`, `notifempty` | both present | meets |
| `copytruncate`, no `create` | `copytruncate`; no `create` | meets; `copytruncate` leaves the file's owner (the deploy account) untouched, which is why no user name is needed (D-13) |
| `su root root` | present | meets; man page: "Rotate log files set under this user and group instead of using default user/group (usually root)" |
| no user name in the file | none; header comment names only paths and "by a human" | meets |

Trust boundary `deploy/**`: the file takes no input and runs nothing; it holds no access value, no account name and no secret (D-13). Mode in git is 100644 and `.gitattributes` gives `deploy/** text eol=lf` (`git ls-files --eol` shows `i/lf w/lf attr/text eol=lf`). The change prepares what a human installs and runs nothing against the server; no script of the range touches Docker, SSH or the host.

## Compose and the tests, against spec A2 and the Compose test row (`spec.md:64`, `:187`)

- `compose.yaml` now has `logging:` / `driver: local` on `app` (after `init: true`) and on `cloudflared` (after `healthcheck`), and no other `logging` key. Meets A2 and D-17 (`logging` is an allowed key of a service in `loop2-host-sharing`; the focused run passes).
- `test_loop2_log_storage.py` reads both files as text with the standard library, as `tests/deploy/test_deploy_workflow.py` does. The Compose test fails if a service has no `logging` block, a flow-style `logging: {...}`, an extra option line (the list would hold more than `driver: local`), a `log_driver`/`log_opt` key, or a third `logging` key. The stanza test fails on an added, missing or duplicated directive (including `create`), a second stanza, or a changed header. It passes for a reason other than the code computing its own expected value: expected values are literals written from the spec. Tests name the decision and the spec item they protect (`# D-352, A3 ...`), matching the testing guideline's request that a test name what it protects.
- Mutation I ran (not the author's): none beyond reading the code paths; the author's mutation run (report 06, check 4: `json-file` for `local`, `create` for `copytruncate`) is consistent with what the assertions do. I did not repeat it. I did not run a mutation for a missing `compress`, because the test's expected list is the thing at fault there (Important 1).
- `test_account_server_typecheck.py`: `LOGROTATE_CONFIG` in `NOT_ROUTES` is the one-line edit spec A3/D and the plan ask for (the route test counts every `deploy/*` file). Changed invariant test: yes, `tests/invariants/test_account_server_typecheck.py` (the route tripwire gets a fourth allowed non-route file; the change is the allowance the spec names, and its comment is Minor 3). The tripwire keeps counting every other `deploy/*` file and every workflow.

## Foundation entries of the range, against the task's rows 1-8 and the spec

Read whole: D-352, D-353, the edited D-347, the three invariants, the three environment facts, and the cited D-09, D-13, D-17 and `loop2-host-sharing`.

- Row 1, D-352: states the append before the replace, the non-fatal failure ("says so in the deploy log and goes on"), `local` driver and about 100 MB, weekly-or-sooner rotation with four generations, about four weeks, the `account-block` JSON lines and no other, the agent's reads through `mikrus`, the human's steps. *Rejected* holds the task's options 1, 2, 4, 5, 6, 7, 8, 9 with costs; the clause "probable collision with D-347" is dropped because D-347 no longer forbids it (author's concern 5; correct). The binding sentence says "rotates the file weekly, or sooner when it grows large" and does not name compression; its *Rationale* assumes compressed generations (Important 1). Otherwise it does what the stanza does (weekly, sooner on size, four generations).
- Row 2, D-353: three ways, what each catches, the four silences (server and GitHub both down, the watcher's schedule, the 60-day disabling, public repository). Matches the task's Answer and *Lacks*. The sentence "the page in the browser ... sends the kind, the code and the place ... to a route of the game's server" is what the task row 7 requires and what D-347 now allows.
- Row 3, D-347: question narrowed to "the game running in the browser"; the route and the server-output prohibitions are removed from *Verification* and *Rejected*; *Verification* keeps Sentry and GlitchTip. *Origin* adds the task, as the form requires. Matches the task's row 3.
- Rows 4-6, invariants: the sentences match the rows; `Rests on`, `Derives from`, `Part`, `Violated: no` are filled; `Method` is Minor 1. The sentence of `browser-failure-report` says "of the allowed form" without naming the form; the form is in the spec (B1) and will be pinned by its test, so a reader of the invariant alone cannot tell it. Minor in effect, not separately listed because the task row itself says "zgodne ze wzorcem".
- Rows 7-8, environment facts: one fact each, with a source and a quoted passage; row 8 split into two facts for two sources (author's concern 2), which I find correct under the template's one-fact-one-source rule. Not re-fetched by me beyond reading the entries; I did not open the moby sources (see Searches).
- `python -B .the-way/elements/common/foundation_check.py`: "0 errors", exit 0. `git diff --check 00aa818..89dfbcb`: exit 0.
- No entry of the range restates another more broadly or without a qualification (WAY-263) apart from Important 1's gap between the Rationale and the stanza.

## Declined to judge

- Whether the watcher, the dump script, the route and the workflow (slices 2-6) match D-352/D-353: not in this slice's code.
- The wording and content of the *Based on* citations copied from the task without being re-opened (author's concern 4): outside the slice; the author says so.
- The glossary question of "watcher" (author's concern 6): Minor by the grade rules unless a sentence reads wrongly; I found none.
- The 100 MiB / four-generation / weekly numbers: this design's parameters (spec Row 1), not judged for being right.

## Checks I ran

| Command (from the worktree root) | Exit |
|---|---|
| `git rev-parse HEAD` | 0, `89dfbcb1abfc95bb5474f8298b3b5abd7cf7c6d2` |
| `git -C .the-way rev-parse HEAD` | 0, `294af7fde45323ac1851c014a03071a97fc38d96` |
| `npm test -- tests/deploy/test_loop2_log_storage.py` | 0 (4 tests) |
| `npm test -- tests/invariants/test_loop2_host_sharing.py` | 0 (18 tests) |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 (9 tests) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml tests/deploy/test_loop2_log_storage.py tests/invariants/test_account_server_typecheck.py` | 0 |
| `git diff --check 00aa818..89dfbcb` | 0 |
| `git ls-files --eol` on the three new/changed text files | LF in index and worktree |
| `grep -n compress deploy/loop2-app.logrotate` | only the `delaycompress` line |

Not run: a real `logrotate -d` (no logrotate on this machine; the spec's E3 human step covers it, and the stanza's behaviour on the host stays unverified), the first red run of the new test (the author reports it; the head only has the green state), the full gate (the cycle's own run).

## Reaches beyond the handoff

- `https://manpages.ubuntu.com/manpages/jammy/man8/logrotate.8.html` through the web-fetch tool, twice, for `maxsize`, `minsize`, `size`, `delaycompress`, `compress`, `copytruncate`, `su`. The tool returns excerpts of at most 125 characters, so the quotes above are excerpts. The statement about the host's `/etc/logrotate.conf` default is my recollection, not read here, and is marked as such.
- `.the-way/elements/invariants/template.md:52-68` (the Method section), for Minor 1.
- `.the-way/elements/common/foundation_check.py:85-100` (the fields it checks), to confirm it does not look for the citing test.
- `.runs/task-cycles/skad-wiem-o-awarii/task.md` whole and `spec.md` whole (the handoff names passages; I read the files whole to check the foundation rows and the other units' dependence on the stanza).
- `foundations/part_map.md` lines about `deploy/**` and `tests/deploy/**` (grep), to confirm the new files are claimed (the foundation check agrees).
- `guidelines/coding.md` and `guidelines/testing.md` whole, and `tests/deploy/test_deploy_workflow.py` lines 1-60, as the slice's *Read* names them.

## Searches not found or unclear

- The host's `/etc/logrotate.conf` and the logrotate version on the Mikrus server: not readable here and not read by anyone in the repository; this is what Important 1 turns on. If the orchestrator holds a statement of the host's global config, it can settle whether the effect appears on that host, but the stanza should not rest on it.
- The first line of the man page's `delaycompress` excerpt is exact; the sentence "This only has effect when used in combination with compress" came from the second fetch and is quoted as the tool returned it. I did not open the man page myself.
- The moby source files and the GitHub documentation page behind the three environment facts: not opened by me; author's report 05 says it opened them. Unverified by this review.
- The red state of the new test before the change: not reproduced (the head holds only the green state); relied on report 06.
- No other searched item was missing.

## Questions

none for the review to proceed. For the orchestrator: Important 1 needs a decision whether to add `compress` (my recommendation: yes, change spec A3's directive list, the plan's slice 1 text and the test list together, and let D-352 name compression only if the orchestrator wants the binding sentence to), or to have the human confirm the host's global `compress` first (the weaker route: the stanza would still depend on an unread host file).
