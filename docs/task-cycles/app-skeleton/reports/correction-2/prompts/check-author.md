# Prompt — invariant check author C2 (correction 2)

You are a fresh agent in the-way's autonomous task cycle for the loop2 application skeleton. The orchestrator (Claude Opus 5.5) runs the cycle under the task owner's delegation. Questions return to the orchestrator in your reply; never ask the human.

- Worktree: C:\Storage\repos\loop2-c2 (detached at 0b96e9e, yours alone). the-way pinned at 96c52488752701ffa321ca69c0c2aa2dd3e46d2d as `.the-way`, already initialized. Run its scripts from the worktree root as `python -B .the-way/...`.
- Isolation (WAY-69; the checks must be written from the sentences, not from the code): do NOT read, list, grep or diff `src/`, `scripts/`, `tests/*.mjs`, `dist/`, `docs/`, git history (`git log -p`, `git show`, `git diff` of anything outside tests/invariants), or anything under `.runs/` except what you write. You MAY read README.md, package.json, package-lock.json (names and versions), tsconfig.browser.json, tsconfig.server.json, .gitignore, foundations/ (read-only), .the-way/, and the existing files in tests/invariants/ (earlier checks and their shared helper `loop2_invariant_support.py`, written by an earlier check author who also never saw the code). If a check cannot be written without seeing code, stop and say so.
- Write boundary: two new files `tests/invariants/test_loop2_one_serving_process.py` and `tests/invariants/test_application_build_output.py`, and your report. Do not change the existing check files or the helper; if a helper change is unavoidable, stop and ask. No commits. `npm ci` inside this worktree is allowed.
- Stage boundary: both checks exist and were run once with the gate; return.
- Read first: `.the-way/gate/run_tests.py` docstring; `.the-way/elements/invariants/template.md` (Method, the test that cites an invariant); WAY-61, WAY-65, WAY-69 in `.the-way/foundations/decisions.md`; README.md.

## Invariants (version 1), accepted by the human; method for both: `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`

1. **loop2-one-serving-process** — "One Express 5 process serves both the built game and `/api/` requests."
   Derives from D-05: "One Node.js process running Express 5 serves both the built game's static files and the `/api/` paths. An unmatched `/api/` request receives an API error, not the game's HTML page." (The second sentence is already checked by loop2-api-error-route; do not duplicate it.) Context: no container or deployment yet; no account routes exist yet, so `/api/` requests today are only unmatched ones. "The built game" is what the product's build produces for the browser.
2. **application-build-output** — "Building the application compiles both the browser and the server TypeScript configurations."
   Derives from D-06: "The browser and server share one npm package and lockfile, and have separate TypeScript compilation configurations and output directories. Building the application compiles both configurations." (Only the second sentence is this invariant.)

## How

- Python unittest, `tests/invariants/test_*.py`; a line `# invariant: <identifier>/1` inside each citing test body; module docstring saying what the check covers and what it does not.
- You may run package.json commands (npm via the helper), start the built server through the helper, use stdlib HTTP, read files at run time; deterministic, time-bounded, clean up the processes you start, fail clearly on an occupied port.
- WAY-69: the input you assert on and the value you expect are written out as literals wherever the code the invariant is about would otherwise compute them (e.g. made-up source with a type error written as a literal into a temporary copy); only the side you compare against comes from the run. Never read the expected value at run time from the file the invariant is about.
- Run the whole gate once in this worktree (`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`); report exit code and each invariant's verdict. Do not tune a check to behaviour you have not seen; report failures as they are.

## Report

Full report: `C:\Storage\repos\loop2-c2\.runs\check-author-c2.md` (design of each check, which clause each test covers, what it does not cover, assumptions written into the check, run output summary, questions). Reply in at most 20 lines, questions first.

## Shared port

Another agent in a separate worktree may start the product on 127.0.0.1:3000 at the same time. If the port is occupied by a process you did not start, wait and retry (up to ~5 minutes) instead of treating it as a result; never kill a process you did not start. Stop every server you start as soon as its check is done.
