Uwagi doradcy dnia w imieniu Mariusza

1. (a) Fix it in this request: the sentence the change added to the description of the build part must not read as if the test run also started the mutation analysis, and it says "where Docker Desktop is installed".
1. (b) Fix it in this request: if Docker does not refuse the connection but hangs, the first test that needs Docker must not wait about one minute beyond the 3 minutes.
1. (c) Let it through: the per-directory wait when the process's own test runner is started directly instead of `npm test` belongs to the pinned process.
2. Let it through: no fresh reviewer for the seven decisions read by title only; the full test run, the foundation check and the search of the whole foundation for Docker found no conflict.

The request also conflicts with `main` now; bring `main` in as part of this round.

