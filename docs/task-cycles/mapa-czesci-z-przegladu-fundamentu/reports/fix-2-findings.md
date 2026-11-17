# Findings of the review of the return step, for the fix (one fix, WAY-162)

Cut word for word from `reports/review-return-step-report.md` (`FAIL 404f7d001cb8f386979b8baeece95e441b048ad0`): the blocking finding. The Minor findings of this review (m-1 to m-3) are not fixed: a Minor finding of the return step goes to the request's list.

### Important

**I-1 — The row says the `sha` case finds every `${{ … }}` in a step script written as a block `run: |`; it does not find one where `run: |` is the step's first key (`- run: |`), the deployment step's own included.**
Place: `guidelines/testing.md:185`, the clause „a w skrypcie kroku zapisanym blokiem `run: |` nie ma
żadnego wyrażenia `${{ … }}`, także z sekretem”; the test at `tests/deploy/test_deploy_workflow.py:107-117`.

What is wrong: the case opens a script block only on a line matching `^\s*run:\s*[|>]` (:110). A step
written in the common GitHub form with `run:` as its first key — `      - run: |` — does not match
(the `- ` stands between the indent and `run:`), so nothing inside that block is read. `- run: |` is a
block `run: |` in the plain meaning of the row's words, so the row claims a refusal the case does not
make. The clause also leaves out what the case does read: a folded block `run: >` (and `|-`, `>-`)
is read just as `run: |` is, so a reader learns a narrower check than the one there is.

Why it matters: this is the row a reviewer of a later change to `deploy.yml` reads to learn what the
test already refuses at this trust boundary (`guidelines/testing.md:160-167`: the row names the
direct check of the refusal). The classic workflow script injection — an event field such as
`${{ github.event.head_commit.message }}` written into a script — is exactly what
`deploy-workflow-input` exists to refuse (`foundations/invariants.md:1410`: every value from outside
the repository only as an environment variable). Written in the ordinary `- run: |` form, it passes
the case and the whole file, while the row tells the reviewer the case refuses it. The form needs no
crafting (unlike the decoys of N-1 and N-2, judged Minor in the review of the fix); it is how many
workflows write a step. The purpose of this commit was to make the row say no more than the case
reads (return-step report, point (c)); for this clause it still does.

Evidence (variants of `deploy.yml` in a scratch copy, the case run against each; script and output in
`reports/review-return-step-evidence/`):
- the deployment step rewritten with `run: |` as its first key and
  `echo ${{ github.event.head_commit.message }}` as the script's first line
  (`variant-deploy-step.yml`): `test_sha_reaches_the_script_only_through_env` **passes**, and the
  whole file runs 16 tests with 0 failures and 0 errors (`whole-file-variant7.txt`);
- a new step `- run: |` with `echo ${{ secrets.DEPLOY_HOST }}`: the case **passes** (`probe-out.txt`, line 6);
- the same expression in a block `run: >` written after `name:`: the case **fails** (line 8) — the
  form the row leaves out is read.

Repair, either of two (the choice is the orchestrator's; the first keeps the return step to words):
- word the clause to what the case reads, e.g. „a w skrypcie zapisanym blokiem (`run: |` albo
  `run: >`), gdy `run:` zaczyna swój wiersz, nie ma żadnego wyrażenia `${{ … }}`, także z sekretem;
  bloku zapisanego jako pierwszy klucz kroku (`- run: |`) ani skryptu w jednym wierszu (`run: echo …`)
  nie czyta”;
- or let the case read the first-key form too (match `^\s*(?:-\s+)?run:\s*[|>]` and take the indent
  of `run:`, not of `-`), see it fail once on the variant above, and keep the row's words.

