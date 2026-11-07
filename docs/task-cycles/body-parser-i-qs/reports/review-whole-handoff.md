# Handoff — review of the whole change

Stage: review of the whole change, with `review-change`. You did not make this change. You are read-only: change no file of the worktree, commit nothing.

## Delegation

You are a reviewer in a task cycle run by an orchestrator for Mariusz. You ask no human anything; questions go to the orchestrator as section 4 of the method gives. Grade and scope are yours; nothing in this handoff names a finding wrong, Minor or out of scope.

## Where and what

- Worktree (work from its root; `cd` nowhere else): `C:\Storage\repos\loop2\.runs\worktrees\body-parser-i-qs`, branch `task/body-parser-i-qs`.
- Range: base `5694146af4b65fbe506c43eb3638c87fd0ad4783` (the task's base on `main`) to head `2ec0fd8`. Compute the diff yourself (`git diff 5694146..HEAD`, `git log 5694146..HEAD`) and confirm `git rev-parse HEAD` is the head you were given, as the method says.
- Pinned the-way: `.the-way` at `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`; the task does not move the pin.

## Method

Read whole: `.the-way/task-cycle/review/SKILL.md`, then `.the-way/task-cycle/review/whole_change.md` (this is the review of the whole change); read another file the method names only when the step that names it comes. You select your own foundation entries and guidelines for the parts the change touches, by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`, each whole.

## Inputs

- Frozen task, read whole: `C:\Storage\repos\loop2\.runs\worktrees\body-parser-i-qs\.runs\task-cycles\body-parser-i-qs\task.md` (original in the user's vault, `Notes/Projects/(P) Loop/_zadania/podniesienie_body_parser_i_qs_loop2.md`).
- The author's report (claims to verify, not evidence): `C:\Storage\repos\loop2\.runs\worktrees\body-parser-i-qs\.runs\task-cycles\body-parser-i-qs\reports\author-report.md`.
- No spec and no plan were written: one author, no open design choice.

## Answers of the cycle's start

- **Trust boundary: yes.** `package-lock.json` is a trust boundary of the part `build-tools` (`foundations/part_map.md`). Check crafted input at that boundary: every changed `resolved` URL stays on `https://registry.npmjs.org/`; each changed `integrity` belongs to the exact version it sits under (compare with the registry, e.g. `npm view <pkg>@<version> dist.integrity`); no package, install script or non-registry source enters the tree; the entries of other packages are untouched.
- **Irreversible operation: no.** The change only edits the lockfile on a branch; merging (which deploys to the test server) is the human's decision at the request. The change must not push, merge or deploy; check that it does not.

## Points the orchestrator wants checked

- Task item 1 and the acceptance criterion `npm audit --omit=dev` with no warning. Run it with the pinned npm: `node node_modules/npm/bin/npm-cli.js audit --omit=dev` (the author ran the later checks with the machine's bare `npm`, 11.13.0, not the pinned 12.2.1).
- `qs` is at 6.17.1 although the task says 6.16.1 *or higher*: judge that against the task, and whether `package.json` and Express 5.2.1 stayed unchanged.
- Whether the changed dependency ranges inside the `body-parser` entry (`content-type`, `iconv-lite`, `qs`) are satisfied by the lockfile's existing entries.
- Whether the change leaves D-33, D-02 and D-104 (and the invariants `introduced-npm-vulnerabilities`, `dependency-audit-refusal`, `account-mutation-request-guards`) true; the task's Context claims `body-parser` 2.4.0's zstd support is refused by the guard in `src/server/transport.ts` before the parser runs.
- Do not run `npm test`: the orchestrator runs the product's gate. Run only focused checks you need, each with its command and exit code in the report.

## Report

Write the full report to `C:\Storage\repos\loop2\.runs\worktrees\body-parser-i-qs\.runs\task-cycles\body-parser-i-qs\reports\review-whole.md` as the method gives; its first line is `PASS <sha>`, `FAIL <sha>` or `questions`. Return that first line, the report path and a one-line result naming what failed or did not run. The report holds each reach beyond this handoff and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
