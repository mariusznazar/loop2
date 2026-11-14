# Handoff — the mutation analysis of the changed simulation files, task pierwsza-akcja-od-startu

You are the reviewer of the whole change, resumed for the one step of your review that the testing guidelines give to the reviewer and that was held back until now: "Mutation testing" in `guidelines/testing.md` (section read whole; D-73 · D-94 · D-95). The human's day advisor has since given the start signal; the full gate has run green on `e6ac95cdc86bfabf2b4bb3ceb0eca187020b6427` (exit 0), and nothing else runs in this worktree now.

Work from the worktree root `the root of the task's worktree`; the head is `e6ac95cd…` (confirm). You may now run commands that write `dist/`, `.runs/stryker/` and `.stryker-tmp/` (all ignored); touch no tracked file.

## What to run

For the changed files of the part `simulation` — `src/browser/sim/data/actions.ts`, `src/browser/sim/data/skills.ts`, `src/browser/sim/game.ts`, `src/browser/sim/saved-game.ts`, `src/browser/sim/understanding.ts` — the local StrykerJS as the guidelines give:

```sh
node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "<file>[:<first>-<last>],…"
```

To keep the run to the change, give each file only the line ranges the change touched (compute them from `git diff e6a95a9b310ff810c35ac87c28ff8f4c4f8b4037..HEAD -- <file>`; a range may take a function whole). Run it in as few invocations as the tool allows; if one invocation exceeds the tool's time limit of the harness, run it in the background and wait for its end. Classify each surviving mutant as the guidelines say (real gap needing an assertion; equivalent change; code that does not compile; behaviour not worth fixing), with the reason for the last three. Do not set a percentage threshold. Do not change any file; do not write the assertions: a real gap goes into your report as a finding with the mutant (file, line, the change made) and the requirement it leaves unprotected, graded as `review-change` grades; the cycle sends it to the author.

## Report

Write `reports/review-mutation-report.md`; first line `PASS <sha>` where no real gap was found, or `FAIL <sha>` where one was, as `review-change` grades; every command with its exit code; the count of mutants by outcome per file; each survivor with its class and reason; **Unread material**; **Searches not found or unclear**. Return the first line, the counts, a one-line check result and the report's path.
