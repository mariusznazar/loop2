# Panel manifest — task/app-skeleton, correction 2

- Repository: C:\Storage\repos\loop2-skeleton, branch task/app-skeleton at 031b0a689f71366cdc874a93f1b2ea51092c035b; target main 91ee59e295b8e0b024c4af1d4d1318738ab8f29e; the-way pinned at 96c52488752701ffa321ca69c0c2aa2dd3e46d2d (`.the-way`).
- Assessed range of this round: `0b96e9e..031b0a6` — files in `files.txt` beside this manifest (7 paths). The whole branch against main (`91ee59e..031b0a6`, `files-branch.txt`, 26 paths) is what would merge; earlier parts of it were assessed by a panel before and are context, not the subject.
- Commits in the range:
  - 99ed33f — foundation entries a human accepted at the request: first part map (five parts, failure modes `none`), Scope and Relations of D-01..D-03, new decisions D-04/1..D-07/1, invariants loop2-one-serving-process/1 and application-build-output/1, Derives from of loop2-api-error-route. The wording of these entries is human-approved; the panel assesses form, consistency and whether the work under them holds, and reports any defect as a question for the human, never a rewrite.
  - aa2c621, 031b0a6 — invariant checks for the two new invariants (031b0a6 tightens the build-output check after code review).
  - 3af85d1 — server code `src/server/app.ts`, `src/server/main.ts` written again against the checks.
- Proposed, UNAPPROVED foundation change not on the branch: `UNAPPROVED-proposed-foundation-against-031b0a6.patch` beside this manifest (one sentence of the part map), SHA-256 b4526f1d24775206906dd4a220b6e4daea3134bf2282ff909bafe59b210a5a6f.
- Commands: gate `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/<name>.jsonl`; format guards `python -B .the-way/elements/<element>/format_guard.py foundations/<file> --base 91ee59e295b8e0b024c4af1d4d1318738ab8f29e [--merge-onto 91ee59e295b8e0b024c4af1d4d1318738ab8f29e]` (part map: no `--merge-onto`); `npm test`. Port 127.0.0.1:3000 is shared: run the gate only when it is free, never kill a process you did not start.
- Excluded from assessors: spec, plan, frozen task, cycle chronology, agent reports, prompts, author reasoning, the other assessor's assessment.
