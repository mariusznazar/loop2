# Handoff — review of the reconciliation with the target branch

You are a fresh reviewer, read-only, who made none of the change. Review with `review-change` the
**merge of the target branch into the task branch**: read `.the-way/task-cycle/review/SKILL.md` whole.

- Worktree `the task's worktree`. Merge commit
  `7d61f0f3e1401acbfbb359f12bc2822343a14453`: first parent `9e7f586e` (the task branch, whose whole
  change, its fix, its return step and their fixes were each reviewed `PASS`), second parent
  `5159e8c475a5faa77529020a51b21e271c695132` (`origin/main`, two merged requests ahead: "the linter and
  formatter scope over all test files" and "the measurements for the decisions of the foundation
  review"). The merge had no textual conflict. Compute `git diff 9e7f586e..7d61f0f3` yourself.
- The question: **do the two sides still hold together?** What the target branch brought that bears on
  the parts this change touches: the linter now covers every test file
  (`eslint.config.mjs`, `tests/quality/eslint-rule-sets.mjs`, `tests/quality/test_source_tool_scope.py`,
  `.gitattributes`, `guidelines/coding.md`), and edits of decisions and an invariant in
  `foundations/` — among them D-268, which also concerns the harness `tests/view/page-document.mjs`
  and the test file `tests/view/memory-limit.mjs`. Our change edited D-264, D-06, D-394, D-395, added
  `simulation-type-check` and changed the part map. Read each decision the merge's diff of
  `foundations/` touches that bears on browser-view, simulation, build-tools or tests, whole, and
  the invariant lines it changes. Judge: a rule the target branch added that a file of our change now
  breaks (the linter over the test files we changed and added, `tests/invariants/test_simulation_type_check.py`
  and the changed tests in `tests/view/` and `tests/sim/`), a decision whose text now contradicts one
  of ours (D-264 vs D-268), a part-map or foundation-check break, and a file the two sides both
  changed.
- Foundation reading for this range is yours, by "Reading the foundation"; say what stayed unread.
- Checks: `python -B .the-way/elements/common/foundation_check.py`; for the linter, run the repository's
  lint check on the files our change touched only if you can do it without writing `dist/` — the
  orchestrator's whole gate is running in this worktree right now (`npm test`, which builds `dist/`),
  so do **not** run `npm test`, `npm run build` or any test that writes to the tree. Report each check
  with command and exit code.
- Report: `.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/review-merge-report.md`; first line
  `PASS <sha>` or `FAIL <sha>`; **Unread material**; **Searches not found or unclear**.
