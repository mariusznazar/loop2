# Fix 2 report: the blocking finding of the review of the return step

**Status:** done. One commit, `e117eccc` (range `404f7d00..e117eccc`).

## I-1, fixed (the second repair, as the orchestrator chose)

**The case.** `test_sha_reaches_the_script_only_through_env` in `tests/deploy/test_deploy_workflow.py` now takes every key `run:` of the workflow with `^(\s*(?:-\s+)?)run:(.*)$`, so `run:` opens a script whether it is a later key of the step (`        run: |`) or the first key (`      - run: |`). The indent of the script is the length of the group before `run:`, that is the column of the key itself, not of the `- `, so the next key of the same step (`name:`, `env:` at the key's column) ends the script, and so does the next step. A `${{` on the key line itself (the one-line form `run: echo ${{ … }}`) fails the case, and so does a `${{` on any later line indented deeper than the key (block `|`, `|-`, `>`, `>-`, or a plain scalar continued on the next lines). The case's other assertion (the commit's name stands only on a line `NAME: ${{ github.sha }}`, and the `ssh` argument is `"$DEPLOY_SHA"`) is unchanged. Nothing wider: a script reached through a YAML anchor or in a called reusable workflow stays unread.

**Evidence.** Scratch files in `.runs/author/` (a copy of the case that takes the workflow path as an argument, `runner.py`; ten variants of `deploy.yml` written by `make_variants.py`, which includes the reviewer's variants of the deployment step and of a new `- run: |` step; `matrix.sh`). Command per cell: `python -B runner.py <test file> variants/<variant>.yml test_sha_reaches_the_script_only_through_env` run from `.runs/author/`; the number is its exit code (1 = the case failed, 0 = it passed). Old = the test at `404f7d00` (`git show HEAD:...`), new = the test now. Raw: `reports/fix-2-evidence/matrix_old.txt`, `matrix_new.txt`.

| Variant of `deploy.yml` | Old case | New case |
|---|---|---|
| the file as it stands (`run: \|` after `name:`) | 0 | 0 |
| the deployment step with `- run: \|` first, script holds no expression (honest) | 0 | 0 |
| the deployment step with `- run: \|` first and `echo ${{ github.event.head_commit.message }}` (reviewer's variant) | 0 | **1** |
| a new step `- run: \|` with `echo ${{ secrets.DEPLOY_HOST }}` | 0 | **1** |
| a step `run: echo ${{ secrets.DEPLOY_HOST }}` on one line | 0 | **1** |
| the same on one line as the first key (`- run: echo ...`) | 0 | **1** |
| `run: >` block with the secret expression | 1 | 1 |
| `run: \|-` block with the secret expression | 1 | 1 |
| `- run: >-` block (first key) with the secret expression | 0 | **1** |
| `run: echo one` continued on the next line with `${{ secrets.DEPLOY_HOST }}` | 0 | **1** |

The honest file and the honest `- run: |` variant pass the whole file as well: `python -B whole.py <test file> variants/honest-run-first-no-expression.yml` exit 0, and the same for `honest-as-it-stands.yml` exit 0 (all 16 cases, none failed). So the widening does not break a neighbouring case. After the change: `python -B scripts/test.py tests/deploy/test_deploy_workflow.py` exit 0, 16 tests.

**The row.** `guidelines/testing.md` row of `.github/workflows/deploy.yml` now says of this case: the commit's name stands only on a line `NAZWA: ${{ github.sha }}` (as before); in the step's script, "that is in the value of the key `run:` (also where the key opens a step, `- run:`) and in the lines indented deeper than that key, written as a block `|` or `>`, on one line or continued on the next lines", there is no expression `${{ … }}`, a secret included; and "the case does not read a script a YAML anchor leads to, nor a script of a called reusable workflow". The `ssh` clause is unchanged: no sentence of it is false of the test as it stands (m-1 stays on the request's list).

## Checks (command, exit)

- `python -B scripts/test.py tests/deploy/test_deploy_workflow.py`: exit 0, 16 tests.
- `python -B .the-way/elements/common/foundation_check.py` (no switch): exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0, `0 error, 147 warn, 7 info` (unchanged).
- Ruff on the changed Python file: not run, not installed on this computer.
- `npm test`: not run, as ordered.
- Own-work check: the requirement a widening most misses is "the honest file still passes and the neighbouring cases do not break"; checked with the honest variants and the whole file (exit 0 above). An earlier version of my `matrix.sh` printed the exit code of `basename` instead of the case (every cell 0); I saw the old test passing on the folded block, which the finding says it fails, ran the case by hand (exit 1), fixed the script, and the table above is from the corrected one.

## Working copies, reaches, unread, searches

- Working copies: files, not a worktree, in `.runs/author` (`runner.py`, `make_variants.py`, `matrix.sh`, `whole.py`, the ten variants, the old copy of the test, the two matrices). All removed from there; copied to `reports/fix-2-evidence/` first. The files of the earlier fixes stay in `.runs/author/`.
- Reaches beyond the handoff: none.
- **Unread material:** `reports/review-return-step-report.md` (I took the finding from `fix-2-findings.md`) and the reviewer's `probe-out.txt` and `whole-file-variant7.txt` beyond what the handoff quotes; I read `probe.py`. `variant-deploy-step.yml` not opened (my `make_variants.py` builds the same variant).
- **Searches not found or unclear:** none.
