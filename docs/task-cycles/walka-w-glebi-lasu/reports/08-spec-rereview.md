PASS

# Independent spec re-review

Reviewed the revised `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/spec.md` in full and `reports/07-spec-revision-report.md` under `reports/08-spec-rereview-handoff.md`, retaining the original review's sources and method. The original `reports/05-spec-review.md` is preserved.

## Earlier finding

Finding 1 is resolved. The Foundation entries table at `spec.md:139` now explicitly names D-58 and requires ordinary cooling to apply outside combat minutes, while preserving map-specific ambient temperature and its existing effect on the cooling rate. This carries accepted task To do 6 / Q1 into the independent cooling decision alongside the existing D-60, D-61 and D-71 changes.

The new row agrees with the minute table: the ordinary body step still happens in attack minute M, temperature stands during M+1 through M+5, and ordinary cooling resumes in M+6 if the run continues. It adds no new balance choice, no change to ambient temperature, and no exception to world burning or renewal. No new contradiction or build-changing omission was introduced by this correction.

## Scope, checks and limits

- Re-read the revised spec and revision report with `Get-Content -Raw -Encoding UTF8`: exit 0, complete output.
- Re-read D-58 whole by its entry heading and the original finding with `Get-Content -Encoding UTF8`: exit 0. No reach beyond the original and revision handoffs was needed.
- `git ls-files --stage -- .the-way`: exit 0; pinned commit `3aee7d958835cc19b95519f4d21b37538b78e3e1`.
- `git -C .the-way rev-parse HEAD`: exit 0; same commit.
- `git status --short`: exit 0, empty before writing this ignored report.
- Product gate (`npm test`), foundation gate, mutation tests, browser checks and the 20-seed measurement: not run, as required by this review stage. No executable product result is claimed.

No product, test, foundation or spec file was edited in this re-review. Its only output is this report. The verdict approves the revised specification; implementation and its evidence remain work for later stages.
