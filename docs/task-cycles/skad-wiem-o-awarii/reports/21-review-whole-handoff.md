# Handoff 21 — review of the whole change

You review the whole change of the task cycle `skad-wiem-o-awarii` as an agent that made none of it, with `review-change`, read-only. Task: where the owner learns that the running game of loop2 failed, and how long the game's logs live.

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`). Pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; the task did not move the pin.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`), read whole, and `.the-way/task-cycle/review/whole_change.md` as the skill says for this review; `fix.md` only if its step comes. You alone select your own foundation entries and guideline files by the parts the change touches (deployment, account-server, browser-view, agent-workflow, product-foundation, build-tools tests), each whole. Change no tracked file; write only your report.
- **Range:** base `00aa818e59ab484358970f98af1f4ab61e969e4c` (main), head `c493ba8` (confirm `git rev-parse HEAD`): `git diff 00aa818e59ab484358970f98af1f4ab61e969e4c..c493ba8`, `git log --format='%h %s' 00aa818e59ab484358970f98af1f4ab61e969e4c..c493ba8`.
- Report: `.runs/task-cycles/skad-wiem-o-awarii/reports/21-review-whole-report.md`; first line `PASS <sha>` or `FAIL <sha>`, or `questions`. For each blocking finding name the slice it comes from, or that it comes from none.
- Task, spec, plan: the whole frozen task `.runs/task-cycles/skad-wiem-o-awarii/task.md`; the reviewed spec `.runs/task-cycles/skad-wiem-o-awarii/spec.md` (its section *Settlements after the spec's review* binds); the plan `.runs/task-cycles/skad-wiem-o-awarii/plan.md`. Check coverage of every item of *To do* 1-8, every row of *Settlements to record* 1-8 and source fidelity.
- Answers of step 4: trust boundary **yes** (`src/server/**`, `deploy/**`): check crafted input at both. Irreversible operation: none performed by the cycle; check that the change only prepares what a human installs or runs on the server and in GitHub, and that the skill's human steps (spec E3) and the task's four *Human actions* match.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.
- You do not run the product's whole gate (the orchestrator does); you may run focused checks, each with command and exit code in your report. Windows; `npm ci` is done; quality tools are in `.runs/quality-venv`.

## The slices, their ranges and whether each had a review of its own

| Part of the change | Range | Review of its own |
|---|---|---|
| Foundation entries (facts, D-352, D-353, D-347 edit, three invariants) | `00aa818..bbefd44` (reports `reports/05-foundation-entries-report.md`) | judged inside the review of slice 1 (`reports/07-review-slice1-report.md`) |
| Slice 1 — `local` driver, logrotate file | `bbefd44..0908743` (`089dfbcb` fixed by `0908743`) | yes: `FAIL` then fix then `PASS` (`reports/07-review-slice1-report.md`, `reports/09-review-slice1-fix-report.md`) |
| Slice 2 — dump in `loop2-deploy` | `0908743..7a1c8ea` | yes: `PASS` (`reports/11-review-slice2-report.md`) |
| Slice 3 — report route of the server | `7a1c8ea..563510d` | yes: `PASS` (`reports/13-review-slice3-report.md`) |
| Slice 4 — browser sends its report | `563510d..7bf49e5` | **none** — judge it; executor's report `reports/14-slice4-report.md` (status `done with concerns`) |
| Slice 5 — watcher and cron file | `7bf49e5..996e42c` | yes: `FAIL` then fix then `PASS` (`reports/16-review-slice5-report.md`, `reports/18-review-slice5-fix-report.md`) |
| Slice 6 — scheduled address check | `996e42c..fc493ba` | **none** — judge it; executor's report `reports/19-slice6-report.md` |
| Slice 7 — `loop2-deploy` skill, both copies | `fc493ba..c493ba8` | **none** — judge it; executor's report `reports/20-slice7-report.md` |

Minor and out-of-scope findings of the slice reviews, in the reviewers' words, are in those review reports (their *Minor* and *Out of scope* sections); read them and say which you judge should be fixed within the task, which not, and why.

The foundation entries' writer's report is `reports/05-foundation-entries-report.md`.

## Points the orchestrator asks you to weigh (not findings)

- The three invariants `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report` were written with `Method: test` before their tests; check that each is cited by `invariant: <name>` lines in the tests (Python tests use `# invariant:`, JavaScript tests `// invariant:`) and that each test would fail if the property broke.
- Slice 4's executor reports that its "no keepalive" check wraps the real `fetch`, and that it wrote tests and code before reading the testing guidelines and the styleguide; judge the tests against `guidelines/testing.md`.
- Slice 6 has no review of its own: judge the workflow `.github/workflows/check-address.yml` as a trust surface (the `workflow_dispatch` input, permissions, concurrency, what a run can reach) and its test.
- Slice 7's executor reports that the filter of the `account-block` command can be passed by an address typed with a line break inside it (residual risk named in the skill; the spec's S1 asked for exact starts and a closing `}`); judge whether the skill's wording is true to what the filter does, and whether the residual risk is acceptable for a command a human types with an address they type.
- Compare the foundation entries with the code at head (D-352, D-353, D-347's edit, the invariants, the environment facts, the part map): do they say what the code does? Do other places that cite D-347 or the old wording still hold?
- The skill must name nothing that does not exist at head (file names, constants, subjects, paths, line shapes): spot-check against the code.
- Things no automated check proves (for the request's *unchecked* list; confirm the list is complete and nothing claims more): Docker's log driver and `inspect` fields, `--since`/`--until` of `docker logs`, that `docker compose logs` reads a `local`-driver container, logrotate on the host, `pusher` delivery, cron running the watcher, the GitHub e-mail for a failed scheduled run, bash 5.1 on the host, a shared `flock` on a read-only file.
- Guideline departures to judge: the limit of the report route is an option of `AccountPolicy` (spec asks; `guidelines/coding-account-policy.md` says thresholds are not options); `accountId` of the report is read straight from `request.session`.
- `guidelines/testing.md` is deliberately not edited (spec S2); its stale rows are to be scheduled.

## Return

First line as above, graded findings (Critical, Important, Minor, out of scope) with reasons and, for each blocking one, its slice; your decision per slice-review Minor finding as above; the checks you ran with command and exit code; your reaches beyond this handoff; and **Searches not found or unclear**.
