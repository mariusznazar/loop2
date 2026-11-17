PASS 0fb68aa6a9e17b35d457e9aefdbe96632d7b9f98

# Review of correction 1 — mapa-czesci-z-przegladu-fundamentu

- **Status:** finished. Each remark is made. No Critical or Important finding. Two Minor findings
  (c-1, c-2), none blocking, none out of scope.
- **Range:** `6bc246ab3661041de61ef340317b8b157bdd9291..0fb68aa6a9e17b35d457e9aefdbe96632d7b9f98`, one
  commit by the one author. `git rev-parse HEAD` = `0fb68aa6…`, the head given; `.the-way` at
  `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink. The tree of `6bc246ab` equals that of
  `e117eccc` (`git diff --stat e117eccc 6bc246ab` empty). Tracked files unchanged by this review.
- **Changed files:** `tests/deploy/test_deploy_workflow.py` (+44 −20: `workflow_text()`,
  `script_expressions()`, the sha case calling it, the new case
  `test_an_expression_after_a_comment_mark_in_a_script_is_refused`); `guidelines/testing.md` (+1 −1, the
  row of `.github/workflows/deploy.yml`, :185). Changed invariant tests: the sha case (marked
  `invariant: deploy-workflow-input`) and the new case (marked the same).
- **Trust boundary:** yes; crafted input checked below. Irreversible operation: none.

## The remarks, each as made or not

**Item 1, the comment case — made.** `script_expressions(text)` reads the lines of the raw workflow
text whole (`tests/deploy/test_deploy_workflow.py:50-70`), and the sha case asserts it finds nothing in
`workflow_text()` (:132-133). On my own variants (`probe3-out.txt`), an outside value after `#` now
fails the case in every form the case reads:
- `run: |` block: after a command (K1), a comment-only line (K2), `#` inside a string (K3);
- `- run: |` as the step's first key, comment-only line (K4); `run: >` block, comment-only line (K5);
- one line `run: echo hi # ${{ … }}` (K6), `- run:` one line (K8), a plain script continued on the next
  line (K7).
Each passed with the logic as it was (comments cut before reading). Honest forms pass the case and all
17 cases: the file as it stands (H0), a YAML comment holding an expression outside any script (H1), a
`uses:` step whose `with:` holds an expression (H2), an `if: ${{ success() }}` after `- run: |` at the
key's column (H3), the deployment step honestly rewritten as `- run: |` first (H4). `code_lines()` gives
what it gave (now through `workflow_text()`), and `code()`, the `github.sha` line check and every other
case are untouched in the diff.

**Item 1, the mutation case — made, and the orchestrator's reading (Q15) is sound.** "A mutation case"
read as a permanent case that feeds the checking logic the real workflow text with one outside value
added after a comment mark is the reading that keeps the remark's intent — that a later edit of the
checking logic which cuts comments again turns a run red — and it needs the check to be a function
both cases call, which the change makes. The case (:135-147) reads `workflow_text()`, asserts the
control (nothing found in the file as it stands), asserts `umask 077` stands once, writes
`${{ secrets.DEPLOY_HOST }}` after `#` at the end of that command and as a comment-only line under it,
and asserts the exact line found each time. It calls the module's `script_expressions`, the very name
the sha case calls. With `script_expressions` replaced by the logic as it was (comments cut first) the
case **fails**; with the real function it **passes** (`probe3-out.txt`, "mutation case on deploy.yml").

**Item 1, the smaller crafted ways — made (no test extension; the row lists them).** Each form the row
calls unread, checked against the test at the head:
- a decoy `ssh ` line before the call: with a decoy that carries `StrictHostKeyChecking=yes` and
  `BatchMode=yes`, the host-key case passes while the real call sets `no` first (R1); a bare decoy
  (`command -v ssh`) makes the case fail (R2), so the decoy hides the real call's options either way,
  as the row says ("bierze się go za wywołanie"); the whole file fails R1 only by the unmarked
  `test_ssh_forwards_nothing_and_takes_only_the_sha`, which the row rightly does not count;
- `-4o "StrictHostKeyChecking no"`: passes (R3);
- a script line starting with `run:`, then an expression at the script's indent: passes (R4);
- an inline-mapping step: passes (R5); a quoted key `"run":`: passes (R6);
- an anchor, a reusable workflow: not read, by the logic (no alias resolution, no second file).
No form the row calls unread is read by the case. Two forms the row leaves out are not read either:
c-1.

**Item 2, the one sentence — made.** The row now says the host-key case takes the text from the first
place in the file where the word `ssh` and a space stand to the end of the line, backslash-continued
lines joined and comments cut, that the place need not be a call, and that `test_one_ssh_call` counts
only lines with `ssh` and `-i`. That is what `:106-114` and `:185-187` do (pattern
`(?<![\w./-])ssh\s[^\n]*` over `code()`).

**Item 2, let through — kept.** M-4, m-2, m-3, n-3, N-3 untouched; nothing in the diff beyond the
remarks: `workflow_text()` is the extraction the raw reading needs, and the row's other clauses (three
option forms, first value, `BatchMode` apart from the rule, „tekst pliku”, D-09) stand as before.

## Findings

### Critical / Important

none.

### Minor

**c-1 — Two more crafted spellings the cases do not read are missing from the row's list.**
Place: `guidelines/testing.md:185`, the sentence „Tych postaci przypadki nie czytają …”. A key written
with a space before its colon, `run : echo ${{ … }}` (U1), and a double-quoted value whose `$` is
written as the YAML escape `\u0024`, `run: "echo \u0024{{ github.event.head_commit.message }}"` (U2):
the sha case and all 17 cases pass on both (`probe3-out.txt`, U1, U2; `variant-U1.yml`,
`variant-U2.yml`). Both are YAML that a parser reads as the key `run` and as a value holding `${{`, and
both must be written on purpose, as the forms the row does list. The remark asks the row to say plainly
which crafted forms are not read; a closing clause would cover these and the rest of their kind, e.g.
„ani żadnej innej pisowni YAML, w której tekst pliku różni się od wartości, jaką czyta GitHub, jak
odstęp przed dwukropkiem klucza albo znak ucieczki w napisie w cudzysłowie”.

**c-2 — The mutation case should carry no `invariant:` mark.**
Place: `tests/deploy/test_deploy_workflow.py:136`. The sentence of `deploy-workflow-input`
(`foundations/invariants.md:1410`) is about the data — what the deployment workflow gives its script.
The invariants template of the pinned the-way says a test fed input made up for it is the method of a
sentence about the check it exercises, never of one about the data that check reads
(`.the-way/elements/invariants/template.md:55-57`, WAY-61). The mutation case feeds made-up input (the
workflow with an added expression) to check the check; its own control line reads the real file, but
that part only repeats the sha case. With the mark, a red mutation case after an edit of the checking
logic reads as the workflow breaking the invariant while the workflow still complies — the same
misreading N-3 named. Which way: drop the mark; the sha case stays the marked refusal test of the row,
which the rule of `### Trust boundaries` (`guidelines/testing.md:160-163`) asks for. The author's
precedent is real — `test_control_the_scan_flags_each_forbidden_form` of `icon-file-content` and
`test_control_a_tsx_source_below_a_nested_package_is_refused` of `application-package-layout` carry
their marks the same way, and the row of `assets/icons/` names the control case as its refusal test —
so the product already departs from the template there; that is why this is Minor and not a
departure this change alone makes. A sentence about the check (a second invariant) would be the other
lawful way, but it is a new entry the remarks did not ask for.

## Declined to judge

- That `script_expressions` also refuses an expression in a YAML comment on the key line or after
  ` #` in a plain one-line value (K6, K8), which YAML drops and GitHub never substitutes: it fails
  closed, and the docstring's reason ("GitHub fills in an expression … before the shell reads any
  comment") holds for the block scalars the honest file uses. No finding.
- The test gaps N-1, N-2, n-2 (decoy, bundled flag, `run:` line in a script) themselves: the remarks
  let them stand behind the row.
- Ruff and the coding guidelines: `guidelines/coding.md` read whole; its rules for this file are the
  Ruff rule set (D-29 to D-31, `ruff-source-rules`), which the file passes, and no rule of logging or
  failure recording reaches a test of workflow text. No finding.

## Checks

| Check | Command | Exit / result |
|---|---|---|
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 144 warn, 7 info` |
| focused test | `python -B scripts/test.py tests/deploy/test_deploy_workflow.py` | 0, 17 tests OK |
| Ruff | `.runs/quality-venv/Scripts/ruff.exe check tests/deploy/test_deploy_workflow.py` (ruff 0.17.1, the version `requirements-quality.txt` pins) | 0, all checks passed |
| variants | `python -B -I probe3.py <worktree root> <out>`: 21 variants of `deploy.yml`, each run against the sha case with the new logic and with the logic as it was (comments cut first, by replacing the module's `script_expressions`), the host-key case and the whole class; then the mutation case on the real file with both logics, and on a violating file | 0; `probe3-out.txt`: H0-H4 pass all 17; K1-K8 fail the sha case (old logic: pass); R1-R6 as the row says; U1, U2 pass (c-1); mutation case new pass / old FAIL; on K2 it fails by its control |
| head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD` vs the gitlink | match |

`npm test` was not run, as the dispatch orders.

## Reaches beyond the dispatch

- `.the-way/elements/invariants/template.md` "Method and test" and "The sentence" (:44-108): to judge
  the mark of the mutation case (c-2).
- `tests/invariants/test_icon_file_content.py:151-152`, `tests/invariants/test_application_package_layout.py:71-72`
  and the entries `icon-file-content`, `application-package-layout` in `foundations/invariants.md`: to
  check the author's precedent for the mark.
- `requirements-quality.txt`: the pinned Ruff version.
- `reports/correction-1-handoff.md`: the orchestrator's reading Q15, which the dispatch names.

## Working copies

- `.runs/review-correction-1`
  held `probe3.py`, 21 variant files and the output; removed. Kept in
  `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-correction-1-evidence`:
  `probe3.py`, `probe3-out.txt` and the variants K2, K3, R1, R2, U1, U2. No worktree was made.

## Unread material

The author's evidence in `reports/correction-1-evidence/`: not opened; I ran my own variants, as the
dispatch orders. Everything else the dispatch names was read whole: the handoff, the remarks, the
orchestrator's handoff of the correction, the author's report, the full diff, `guidelines/coding.md`;
`guidelines/testing.md` was read whole earlier in this session (the review of the return step) and its
`### Trust boundaries` section and the changed row again now.

## Searches not found or unclear

- Not verified against GitHub itself: that GitHub's workflow parser accepts `run :` with a space before
  the colon and evaluates `${{` reached through the escape `\u0024` (c-1). Both are valid YAML; whether
  GitHub's own parser and expression step treat them so I judged from YAML, not from a run or a recorded
  fact. c-1 stands either way as a gap in the row's list of what the cases do not read.
