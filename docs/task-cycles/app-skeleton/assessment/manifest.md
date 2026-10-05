# Panel manifest — task/app-skeleton, correction 1

- Assessed range: `91ee59e295b8e0b024c4af1d4d1318738ab8f29e..2544a6a` (main base to branch head), code, foundation and invariant tests; first-run record and docs excluded (the branch removed them in 77a3754).
- Files assessed in the range: `files.txt` beside this manifest (23 paths).
- Commits in the range that change these files: 11c7cbb (skeleton code), de3ceb3 (startup error fix), 22dbff4 (foundation entries written whole from the approved project definition), ab34d90 and 2544a6a (invariant checks); 83f6158 merges main.
- Proposed, UNAPPROVED foundation change not on the branch: `UNAPPROVED-proposed-foundation-against-ab34d90.patch` (applies with `git apply` at ab34d90 and at 2544a6a; foundations/ is identical in both), SHA-256 2b40a6262fea2b61e34842221111bb91ffc2cdee94aaac0b5d4d8b1fe9d8dccf.
- Excluded from assessors: spec, plan, frozen task, cycle chronology, agent reports, prompts, author reasoning.
- Changes made after the panel:
  - invariant checks, panel-decided mechanics fixes 9-10: commit 155350e; its diff is `post-panel-checks.diff` (the one diff this record keeps);
  - proposal set, settlement fixes 1, 2, 5-8 (unapproved proposals only): current version `post-panel-proposal.patch` (same content as reports/correction-1/return/UNAPPROVED-proposed-foundation-against-ab34d90.patch); the changes are listed in return-step.md "After panel".
- Final assessed commits: code 11c7cbb, de3ceb3 (unchanged since the first run; redo against checks byte-identical); foundation 22dbff4; checks ab34d90, 2544a6a, 155350e. Target main 91ee59e unchanged at final recheck.
