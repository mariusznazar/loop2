# Return step 2 report (after correction 1): mapa-czesci-z-przegladu-fundamentu

**Status:** done. **I commit nothing**, so the return step has no range to review (the head stays `0fb68aa6`; `git status --short` is empty).

`return_step.md` and `foundation_step.md` were read whole in the first return step of this session; the pinned the-way is unchanged (`.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`), and I applied them again as written. No entry is written, so no element `SKILL.md` was needed.

## Return step (fields of the record)

- **Foundation compared with code:** what correction 1 changed (`6bc246ab..0fb68aa6`: `tests/deploy/test_deploy_workflow.py` and the one `deploy.yml` row of `guidelines/testing.md`), against the code at `0fb68aa6`. Nothing no longer matched; nothing corrected.
  - The invariant `deploy-workflow-input` (`foundations/invariants.md:1410`): "the script of its deployment step every value from outside the repository only as an environment variable, and the script's one SSH call sets strict host-key checking on its command line". The workflow holds exactly that (the five secrets and `github.sha` only in the `env:` of the one step; one `ssh` call with `StrictHostKeyChecking=yes` on its command line). The sentence names the deployment step; the case now reads the script of every `run:` key, which is wider than the sentence and so leaves it true. Its *Derives from* place text is still true of `deploy.yml`.
  - The mark on `test_an_expression_after_a_comment_mark_in_a_script_is_refused`: the invariants template ("Method and test") says a test fed input made up for it is the method of a sentence about a check, never of one about the data the check reads, and `deploy-workflow-input` is about the workflow, the data. The mark and that sentence of the template therefore differ in letter. Per the handoff (reviewer's c-2, Minor; the cycle does not fix it) I did **not** change the mark and I write no entry for it; the invariant's method stays `test` because the unchanged real cases (`test_sha_reaches_the_script_only_through_env`, `test_ssh_is_strict_and_batch`) check the file as it stands. It goes to the request's list.
  - The row of `.github/workflows/deploy.yml` in the table of trust boundaries of `guidelines/testing.md`, each sentence against the cases as they stand: (1) the commit's name only on a line `NAZWA: ${{ github.sha }}`: true (the regex of the case); (2) a script is the value of `run:` (also `- run:`) and the lines deeper than the key, as a block, on one line or continued, with no `${{ … }}`: true (`script_expressions`); (3) its lines are read whole, comment mark included: true (it reads the raw text, `workflow_text()`); (4) the mutation case appends the expression after `#` at the end of the command and as a comment-only line and checks that the same function finds it: true; (5) the host-key case takes the text from the first place where `ssh` and a space stand to the end of the line, backslash lines joined, comments cut, reads `-o K=V`, `-o "K V"`, `-oK=V`, takes the first value, and `test_one_ssh_call` counts only lines with `ssh` and `-i`: true; (6) the forms listed as unread (a line with `ssh` and a space before the call, `-4o`, a script line starting with `run:`, an inline-mapping step, a quoted key, an anchor, a reusable workflow): each was run against the cases in correction 1 and passes them, so the sentence is true; the review's c-1 (`run : …` with a space before the colon, a quoted value written with `$`) names two more forms the row does not list: that is an omission, not a false sentence, and goes to the list, not fixed here. No sentence of the row is false.
  - D-09 and D-11 against `deploy.yml`, `compose.yaml` and the Dockerfiles: unchanged by the whole change (`git diff ea638397..HEAD -- .github compose.yaml Dockerfile deploy` is empty); the workflow still starts on a push to `main`, hands the commit's name to the server in one SSH call and checks out no code. Match.
  - The part-map entry of `deployment`: *Files* and *Trust boundary* unchanged by correction 1; the trust boundary still holds `deploy/**`, `compose.yaml`, `.github/workflows/deploy.yml`, `Dockerfile`, `deploy/cloudflared.Dockerfile`, all tracked files; the foundation check passes. Match.
- **Decisions written or changed:** none.
- **Invariants written or changed:** none in this step (the change's own, written earlier: `page-address-fragment`, `deploy-workflow-input`).
- **Environment facts:** none. `deploy-workflow-input` has `Rests on: none`, and nothing the correction added rests on a source outside the product.
- **Glossary terms:** none. The correction added no word that takes a meaning other than the one a reader of the field takes ("comment mark", "script", "expression" are used as the workflow language uses them).
- **Part-map changes:** none in this step.
- **Projected entries written whole or in part:** none.
- **Rows of *Settlements to record* written:** none in this step; written earlier: row 1 as `page-address-fragment`, row 2 as `deploy-workflow-input`.

## Checks (command, exit)

- `python -B .the-way/elements/common/foundation_check.py` (no switch): exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0, `0 error, 144 warn, 7 info`.
- `python -B scripts/test.py tests/deploy/test_deploy_workflow.py`: exit 0, 17 tests OK.
- Not run: Ruff (not installed), `npm test` (not mine).

## Reaches, working copies, unread, searches

- Reaches beyond the handoff: none.
- Working copies: none made in this step.
- **Unread material:** `reports/review-correction-1-report.md` (c-1 and c-2 taken from the handoff); the evidence folder of correction 1 not reopened.
- **Searches not found or unclear:** the invariants template's sentence on made-up input and the repository's practice of marking `test_control_…` cases pull in different directions for the mutation case (see the mark above); I followed the handoff and left it.
