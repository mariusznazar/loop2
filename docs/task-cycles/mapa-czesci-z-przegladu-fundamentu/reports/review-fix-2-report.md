PASS e117eccc906f4619dd63f1156f8948c609e0acd3

# Review of the second fix — mapa-czesci-z-przegladu-fundamentu

- **Status:** finished. I-1 fixed. No new Critical or Important finding in the fix diff. Four Minor
  findings (n-1 to n-4), none blocking; n-1 is flagged below for the orchestrator's attention.
- **Range:** `404f7d001cb8f386979b8baeece95e441b048ad0..e117eccc906f4619dd63f1156f8948c609e0acd3`, one
  commit by the one author. `git rev-parse HEAD` = `e117eccc…`, the head given; `.the-way` at
  `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink. The worktree's tracked files are
  unchanged by this review.
- **Changed files:** `tests/deploy/test_deploy_workflow.py` (+8 −3: the script-reading loop of
  `test_sha_reaches_the_script_only_through_env`, :106-122); `guidelines/testing.md` (+1 −1: the row of
  `.github/workflows/deploy.yml`, :185). A changed invariant test: the case is marked
  `invariant: deploy-workflow-input` (:96).
- **Trust boundary:** yes; crafted input checked below. Irreversible operation: none.

## The finding of the findings file

**I-1 — fixed.** The case now opens a script on every line matching `^(\s*(?:-\s+)?)run:(.*)$`
(`tests/deploy/test_deploy_workflow.py:112`), takes the indent from the column of `run:` itself
(`len(key.group(1))`, :114), refuses `${{` on the key line (:115-116) and on every later line indented
deeper than the key (:118-122). On my own variants, run in a copy under `.runs/review-fix-2/`
(`probe2-out.txt`):
- the deployment step rewritten with `- run: |` first and
  `echo ${{ github.event.head_commit.message }}` — the variant of I-1 — the case **fails** and the
  whole file has 1 failure (C1; it passed all 16 at `404f7d00`);
- a new `- run: |` step with a secret (C2), one-line `- run: echo ${{ … }}` (C3), one-line `run:` after
  `name:` (C4), empty `run:` with a plain script on the next line (C5), `- run: >-` (C6): each **fails**;
- the honest file (H0), the deployment step honestly rewritten as `- run: |` first (H1), a
  `- run: |` step followed by `if: ${{ success() }}` and an `env:` holding `${{ secrets.DEPLOY_HOST }}`
  at the key's column (H2), and a `uses:` step whose `with:` holds an expression (H3): each **passes**
  the case and all 16 cases. So the `env:` mapping that holds `github.sha`, a later key of the step at
  the column of `run:`, and comment lines (stripped by `code_lines`) are not read as script.

The row now names `|` and `>`, the first-key form, the one-line and continued forms, and the two
places the case does not reach (a YAML anchor, a called reusable workflow); the part of I-1 that the
row left `run: >` out is fixed too. The orchestrator's choice — widen the case rather than word the
gap — was sound: the gap was an ordinary way to write a step, and a test that reads it protects the
invariant, where a sentence would only have warned the reviewer.

## Findings in the fix diff

### Critical / Important

none.

### Minor

**n-1 — The row's new sentence says no line deeper than `run:` holds `${{ … }}`; the case does not read what follows ` #` on a line, and GitHub substitutes expressions there.** *(Flagged: by its effect I would weigh this near Important; I grade it Minor because its cause, `code_lines`, lies outside the fix diff and the row before the fix overstated in the same way, which I missed in the review of the return step — fix.md makes such an issue a Minor note.)*
Place: `guidelines/testing.md:185`, „w wierszach wciętych głębiej niż ten klucz … nie ma żadnego
wyrażenia `${{ … }}`”; cause `tests/deploy/test_deploy_workflow.py:16-19` (`code_lines` drops
`(^|\s)#.*$` from every line, script lines included). In a block scalar `#` is text, and GitHub
evaluates `${{ … }}` anywhere in the value of `run:`, shell comments included. Variants: C7, the
deployment script holding `echo "Deploying #${{ github.event.head_commit.message }}"`, and C8, a
commented-out line `# was ${{ github.event.head_commit.message }}`: the case and all 16 cases **pass**,
before the fix and after it (`old-case-out.txt`, `probe2-out.txt`). A commented-out line with an
expression is a common way to disable a step line; a commit message with a newline then breaks out
of the comment. Repair: read the script lines unstripped (strip comments only outside `run:` values),
or say in the row that text after ` #` is not read.

**n-2 — The widened key pattern also matches a script line that starts with `run:`, which resets the indent and ends the reading early (a regression of the fix, crafted only).**
Place: `tests/deploy/test_deploy_workflow.py:112-114`. Inside a script, a line `run: note` at the
script's indent (for example in a heredoc) is taken as a new key; the next line at the same indent
ends the block, so later script lines go unread. Variant C9 (heredoc with a `run: note` line, then
`echo ${{ github.event.head_commit.message }}`): the new case **passes**, the old case **failed**
(`old-case-out.txt`). Needs a line written to fit; Minor. Repair: match a key `run:` only while not
inside a script, or only at an indent not deeper than the current script's.

**n-3 — The case now also reads `defaults: run:` as a script and fails on an honest expression there.**
Place: `tests/deploy/test_deploy_workflow.py:112`. Variant H4, a job-level
`defaults: run: working-directory: ${{ github.workspace }}`: the case **fails** (it passed before).
This fails closed — no protection is lost — but an honest change would meet a red test, and the row
calls what it reads „skrypt kroku”. Minor.

**n-4 — A `run` written as a flow mapping or a quoted key is not read; the row says „w wartości klucza `run:`”.**
Variants C10 (`- { name: Echo, run: 'echo ${{ … }}' }`) and C11 (`"run": echo ${{ … }}`): the case
passes. Both forms are rare and written on purpose; Minor. The row could add them to what it does not
read.

The `ssh` clause of the row is unchanged by the fix; m-1 of the review of the return step stays on the
request's list, as do m-2 and m-3.

## Declined to judge

- N-1, N-2, N-3 of the review of the first fix and m-1 to m-3 of the review of the return step: on the
  request's list, not reopened.
- That the check of `github.sha` (:100-103) also uses the stripped lines, so `echo "x #${{ github.sha }}"`
  passes it too: the same cause as n-1, outside the fix diff; named there, no separate finding.

## Checks

| Check | Command | Exit / result |
|---|---|---|
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 147 warn, 7 info` |
| focused test | `python -B scripts/test.py tests/deploy/test_deploy_workflow.py` | 0, 16 tests OK |
| variants, new case | `python -B -I probe2.py <worktree root> <out>`: 16 variants of `deploy.yml`, each run against the sha case and the whole test class with `WORKFLOW` pointed at the variant | 0; results in `probe2-out.txt` (honest H0-H3 pass, H4 fails; crafted C1-C6 fail; C7-C11 pass) |
| variants, old case | the case of `git show 404f7d00:tests/deploy/test_deploy_workflow.py` run on C7, C8, C9, H4 | 0; C7 pass, C8 pass, C9 FAIL, H4 pass (`old-case-out.txt`) |
| head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD` vs the gitlink | match |

`npm test` was not run, as the dispatch orders. Ruff was not run on the changed test (the author
reports it is not installed; I did not try).

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md`: the method's file for a fix review, read whole.
- The test at `404f7d00` (`git show`), to tell what the fix changed from what it inherited (n-1, n-2,
  n-3).

## Working copies

- `.runs/review-fix-2` held
  `probe2.py`, the variants, the old test and the outputs; removed. Kept in
  `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-fix-2-evidence`:
  `probe2.py`, `probe2-out.txt`, `old-case-out.txt` and the variants C1, C7, C8, C9, H4. No worktree
  was made.

## Unread material

The fix's own evidence in `reports/fix-2-evidence/` (its matrices and scripts): not opened; I ran my
own variants, as the dispatch orders. Everything else the dispatch names was read whole: the
handoff, the findings file, the fix report, the full diff, the changed test case.

## Searches not found or unclear

none.
