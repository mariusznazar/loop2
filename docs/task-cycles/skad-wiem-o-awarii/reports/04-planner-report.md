# Report 04 — planner, task cycle skad-wiem-o-awarii

Status: done with concerns (concerns are guideline gaps and two reaches, below; no open question blocks the plan).

- Plan: `.runs/task-cycles/skad-wiem-o-awarii/plan.md` (7 slices)
- Final size report: `.runs/task-cycles/skad-wiem-o-awarii/plan-size.md` (every slice fits; largest read is Slice 3 at about 143k estimated tokens, largest change count 7 files)
- No tracked file changed; only the plan, the size report and this report were written.

## Model class per slice
1. cheaper — settled values into a Compose key, a logrotate file and a small text test.
2. same — root-installed deploy script run by every deployment; several existing tests tie to its stage order.
3. same — new public route on the `src/server/**` trust boundary (guards, session reading, limiter, log line with no request text).
4. cheaper — applies the account-client pattern and the settled last-resort contract.
5. same — intricate Bash (window, strict state file, locks, two throttles) plus a test seam built in the slice.
6. cheaper — a workflow and its text test on the pattern of `test_deploy_workflow.py`.
7. same — the human-typed `account-block` filter is proved by no test and must be right by reading and a hand trial.

## Risk marks
Slices 1, 2, 5 touch `deploy/**` (trust boundary of the part map); Slice 3 touches `src/server/**`. Slices 4, 6, 7 are `none`. Slice 6 is `none` because the part map names no workflow file as a boundary; the spec's own table lists `.github/workflows/**`, so the orchestrator may decide to mark it and give it a review.

## Order and dependencies
1 → 2 → 3 → 4 → 5 → 6 → 7. Shared files force the chain: `tests/invariants/test_account_server_typecheck.py` (Slices 1, 5, 6, NOT_ROUTES) and `foundations/part_map.md` (Slices 3, 4, 6). Slice 4 needs Slice 3's route for the real-server account-api test. Slice 7 is last because it names files and behaviour from all others. Styleguide order-of-work example: the change adds no style, so it is not followed or departed from.

## Choices that need the orchestrator's eye
- Part map edits are placed inside Slices 3, 4, 6 (skill rule: a part-map change for an added file belongs to the slice that adds it; `foundation_check.py` fails both for a pattern matching no tracked file and for an unclaimed file). Slice agents must use `the-way-update-part-map` for them. If that is not workable inside a slice, move them to a step of the orchestrator's.
- The invariant test of row 5 goes in `tests/deploy/` (already claimed by `deployment`), not in `tests/invariants/`, to avoid another part map edit. Spec leaves location to the maker. Row 4's test is in `tests/deploy/` by the spec; row 6's is in `tests/http.test.mjs`.
- The invariant names are unknown until the foundation step writes rows 4-6; slices tell the executor to tag tests with the name that step gave.
- Slice 2 may fail `tests/invariants/test_loop2_host_sharing.py` if its Bash reader does not understand `timeout 300 docker compose ... logs ... >> file`; that file is in Read and Checks but not in Change. If the executor finds it must change, it returns and the plan is amended.
- Slice 2 changes `tests/deploy/test_loop2_deploy_switch.py` (it asserts exactly one `logs` call; the dump is a second one).

## Spec checks with no automated proof (for the request's "unchecked" list)
Docker `inspect` fields and `--since`/`--until` windowing of `docker logs`; that `docker compose logs` reads a `local`-driver container; logrotate running daily on the host and the rotation itself; `pusher` delivery; cron running the watcher; the GitHub e-mail for a failed scheduled run and GitHub disabling the schedule after 60 days; the `account-block` append command (tried by hand only). Left to the human per slice: Slice 1 log file and logrotate install; Slice 2 reinstall of `loop2-deploy` before the merge; Slice 5 watcher and cron install and the trial restart; Slice 6 GitHub notification setting and one trial failure; Slice 7 writes all steps.

## Guidelines found missing or uncertain
- No guideline kind for Bash scripts (only the shellcheck rule in `guidelines/coding.md` and the file list in `tests/quality/test_quality_invariants.py`), for GitHub workflow files, for logrotate/cron files, or for writing a skill. Slices 1, 2, 5, 6, 7 therefore rest on the spec and on the nearest existing file as example.
- `guidelines/testing.md` has rows that go stale with this change (spec S2: trust-boundary row for `src/server/`, "siedmiu tras"/"ósmej", and the expected-results rows saying "dziewięciu trasach"); no slice edits it; it has to be scheduled through the testing-guidelines skill.
- `guidelines/coding-http-application.md` names `account-routes.ts` a copy of the exemplar `app.ts`; I read the rule as applying to the new route handler in that file.
- Whether the user's skill-writing conventions in the vault (`konwencje_skilli_i_commandow.md`) bind Slice 7 is outside the repository, so it cannot be put in *Read*; the executor carries the user's global instruction.

## Reaches beyond the dispatch
- `guidelines/coding-account-policy.md` (Slice 3): its index row says to read it before changing a file that counts attempts; the report limit lives in `src/server/account-policy.ts`.
- `guidelines/coding-browser-module.md` (Slice 4): its index row covers modules of `src/browser/view/` (`last-resort.ts`, `app.ts`).
- Selective reads: `package.json` scripts, `scripts/test.py` (to confirm `npm test -- <one file>` takes exactly one file), `.gitattributes` (deploy/** is LF), `foundation_check.py` line 47 and 552 (pattern matching no file is an error), `tests/deploy/test_loop2_deploy_switch.py` and `tests/invariants/test_loop2_deploy_keeps_running.py` (to find which existing tests the dump touches), the guideline indexes. Entry ranges were computed with a script over `foundations/*.md`.

## Searches not found or unclear
- No glossary entry was named by the handoff and none was looked up.
- Docker 28.1.1 is the client version (task context); the demon version is unread, so the `local` driver and `--since` behaviour stay unproved (already in the spec).
- The sizes of the unit-level tests in `tests/http.test.mjs` (164k characters) make Slice 3 the heaviest read; it fits.
- Not verified: whether the stand-in `docker` of `deploy_script_support.py` accepts a second `compose ... logs` call without an answer rule (assumed to exit 0 with empty output, as for other unconfigured calls).
