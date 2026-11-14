# Handoff — the return step

Resumes the one author. Worktree `the root of the task's worktree`, branch `task/pomiary-z-przegladu-fundamentu`, head `92ce6ef7` (the whole-change review `PASS 72817471`, the fix of its Minor findings `PASS 92ce6ef7`). This is neither a fix nor a correction: no row of `make-change`'s variants applies; your stage is **the return step**.

**Read whole:** `.the-way/task-cycle/skill/return_step.md`, and `.the-way/task-cycle/skill/foundation_step.md` (the return step writes as the foundation step writes). Where you write an entry of an element, read the skill of that element (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map`).

**What to do:** compare with the code the entries the change wrote (D-268, D-04, D-147, D-208, D-247, D-339, D-347), those the task names in *Decisions in play* (also D-03 and D-75, untouched by decision of the human) and the entries the search of the foundation finds that carry the old figures or the old threshold; compare the part map of the touched parts (`product-foundation`, `browser-view`). Correct in the same change whatever no longer matches; write nothing else, and no entry for a choice the task's *Out of scope* excludes. The invariant `document-test-memory-limit` carries no file count; confirm it still matches the code of `tests/view/memory-limit.mjs`. Check specifically that no sentence of the foundation, including the guidelines, still says that the size of the chronicle is unmeasured or gives a figure the task replaced.

**Two Minor notes of the review of the fix (`reports/review-fix-minor.md`)** are not findings you fix: they go to the request's list as the reviewer's words. Do not change the text for them.

**Out of scope, named by the reviewer** (not to be changed): D-207 *Rejected* "16 saves of about 80 KB".

**If you change nothing:** say so and name what you compared. If you commit, commit by path, an English message in the repository's style, tree clean; the orchestrator has the commit reviewed. Do not run the full `npm test`.

**Report:** `reports/return-step-report.md`, with the return step's fields exactly as `.the-way/task-cycle/record_template.md` gives (*Return step* section), **Unread material**, **Searches not found or unclear**, and the own-work check. Return status, commits, the one-line check result and the report path.
