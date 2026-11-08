# Handoff — third group of runs, without the coding guidelines file (scope change Q5)

Run directories `[a run directory of the trial] T<n>-none-<k>` (n = 1..3, k = 1..5): a plain copy of
the base `df0f125` made by `scratch/make_run.py`, then `guidelines/coding.md` deleted and, in
`AGENTS.md`, the line „Before changing product code, including scripts and tests, read
`guidelines/coding.md`.” deleted. The other `guidelines/coding-*.md` files stay.

Prompt of an agent: the wrapper of `scratch/run-wrapper.md` with the sentence „What does apply from
the repository's instructions: before you change product code, read `guidelines/coding.md` whole,
and the kind file `guidelines/coding-<kind>.md` that its table points to if one fits the code you
write.” replaced by „You may use whatever the repository offers to write good code for it.”, and
the task text of `trial-tasks/T<n>/prompt.md` at `543b6f6` as before. The agent answers with the
three points of the wrapper (files created, files read, build).

Results go to `results-tests.jsonl` (the rows of `scratch/run_all.py`), the agents' sources to
`reports/runs/<run>/`, what they read to `reports/runs-reads.md`.
