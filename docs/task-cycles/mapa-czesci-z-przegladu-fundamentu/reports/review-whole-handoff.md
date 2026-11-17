# Handoff — review of the whole change

You are a reviewer of a task cycle of the-way. You did not make the change. The person who requested the cycle has delegated intermediate choices to the orchestrator; no go-ahead of the orchestrator is the human's approval. You are read-only: you change no tracked file of the worktree and commit nothing. You ask the human nothing.

## Where you work

- Worktree, your working directory and the root every command runs from: `the task's worktree` (branch `task/mapa-czesci-z-przegladu-fundamentu`). Never `cd` to the main checkout.
- Pinned the-way: `.the-way` of the worktree at `bfb2e109735b5fff98802b8be0ff3c43c799262a` (equals the gitlink).
- Your method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), the review of **the whole change**. Read that `SKILL.md` whole; read `whole_change.md` beside it, as it tells, and any other file it names only when the step that names it comes.
- Your directory for working copies: `.runs/review-whole/` (directly under `.runs/` of the worktree).
- Your full report goes to `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-whole-report.md`; its first line is `PASS <sha>`, `FAIL <sha>` or `questions`.
- Run the model of this review is `opus`, the strongest class available.

## What you review

- The range: base `ea6383975cb72e875d215dfc23c171cafb838207`, head `abd32bab`, four commits (`b237e0ba`, `bbe59c96`, `dc51a43c`, `abd32bab`) by one author without a plan. Read the full diff of the range.
- The frozen task, which you read whole: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/task.md` (approved with its settlements 2026-11-13). Cover every item of its *To do*, both rows of *Settlements to record*, and the answers of *Questions to settle*; check the change does nothing the task's *Out of scope* names. The source fidelity is yours to judge: no entry may say more or less than the rows and answers settle.
- The report of the author: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/author-report.md` (status `done with concerns`; its evidence of the mutations is in `reports/author-evidence/`). The author's run of the foundation check and of the focused tests is its claim, not yours: run the checks you need yourself.
- No spec and no plan: one author, no open design choice.

## The answers of the two questions at start

- Trust boundary: **yes**. The change writes the boundaries of the part map: three files of `src/browser/view/` into the *Trust boundary* of `browser-view`, and `compose.yaml`, `.github/workflows/deploy.yml`, `Dockerfile`, `deploy/cloudflared.Dockerfile` into that of `deployment`, with two new invariants (`page-address-fragment`, `deploy-workflow-input`) and the marks and rows of the table of trust boundaries in `guidelines/testing.md`. **Check crafted input at these boundaries:** for each marked test, whether it really refuses the rule of its invariant (a test that passes when the guarded behaviour is broken is no test of refusal), whether a crafted address, a crafted token in a fragment or a crafted workflow step would get past; for the review-only files, whether the row of the table names what the review checks.
- Irreversible operation: **no**.

## Deviations and gaps I carry to you

1. The task's second *Questions to settle* answer says the tests `test_sha_reaches_the_script_only_through_env`, `test_ssh_is_strict_and_batch`, `test_exactly_the_five_secrets` and `test_decoded_key_is_never_printed` get the invariant's mark ("m.in."). The author marked only the first two, because it saw the other two pass when the rule of the invariant is broken (author report, concern 1, and the mutation table). Judge this against the task: grade it as the task's items and the testing guidelines ("a test is marked with an invariant and seen failing once") bear on it. You alone grade it.
2. The author added two test cases (a percent-encoded token stays as it stands) beyond "mark the existing tests" (concern 3). Judge whether they belong to the task.
3. Unread material of the author that I did not decide as harmless: `decisions` D-351 and D-210 not opened whole; the search of invariants by *Part* not run by the author. You select your own foundation and read them as the method gives. `guidelines/styleguide-browser-view.md` unread by the author: I judged it bears on nothing, since the change draws no screen (record: question Q1 of the cycle).
4. The author's mismatch of the handoff: `python -B -m unittest tests.invariants.test_cross_part_imports` does not run; the author used `python -B scripts/test.py <file>`. The product's one command of tests runs all of them; **do not run `npm test`** (the orchestrator runs the full gate on a signal from the human's adviser): focused checks only — `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`, the one file of a test you want to see.
5. The reason of the new dependency of `agent-workflow` on `simulation` is stated in the binding sentence of its part-map entry; the request's description, which I write, will name the gap of the test `cross-part-imports` (`import()` with a path built in code is not seen). Check that the sentence says what the task's fourth answer says and nothing wider.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

The report's first line, status, the changed files with their line counts, the checks you ran with command and exit code, your reaches, your selection and the number of decisions you read whole, **Unread material**, **Searches not found or unclear**, each finding graded and scoped by the method (the reviewer alone grades and scopes), and the Minor findings within the task listed as the method gives. Return the report's path and a short return.
