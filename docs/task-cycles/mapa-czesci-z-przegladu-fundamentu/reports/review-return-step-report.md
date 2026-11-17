FAIL 404f7d001cb8f386979b8baeece95e441b048ad0

# Review of the return step's commits — mapa-czesci-z-przegladu-fundamentu

- **Status:** finished. One blocking finding (I-1), three Minor (m-1 to m-3), none out of scope.
- **Range:** `d5932fc5b68c99fdc9a6b45cc23a812b04720d51..404f7d001cb8f386979b8baeece95e441b048ad0`, one commit
  (`404f7d00`, "docs: name the invariant page-address-fragment in the verification of the three
  decisions …"). `git rev-parse HEAD` = `404f7d001cb8…`, the head given. `.the-way` at
  `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink.
- **Changed files:** `foundations/decisions.md` (+3 −3: the *Verification* lines of D-156 at :3220,
  D-224 at :3431, D-281 at :4378); `guidelines/testing.md` (+1 −1: the row of
  `.github/workflows/deploy.yml` at :185). The worktree's tracked files are unchanged by this review
  (`git status --short` empty).
- **Trust boundary:** yes — the row describes the refusal test of the trust boundary
  `.github/workflows/deploy.yml` of part `deployment`. Irreversible operation: none.

## Findings

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

### Minor

**m-1 — The `ssh` clause still names a „call” and a „line” where the case reads the first text `ssh ` of the joined file, and `test_one_ssh_call` does not make that text the call.**
Place: `guidelines/testing.md:185`, „pierwsza wartość `StrictHostKeyChecking` w pierwszym wierszu pliku
z wywołaniem `ssh`, którego jedyność pilnuje `test_one_ssh_call`, to `yes`”; test at
`tests/deploy/test_deploy_workflow.py:83` and `:155-157`.

What is wrong: (a) the case takes the first match of `(?<![\w./-])ssh\s` in the text whose `\`
continuations are joined (`code()`, :22-23), whether it is a call or not; a line `: ssh -o
StrictHostKeyChecking=yes -o BatchMode=yes` placed before a call that sets `-o "StrictHostKeyChecking
no"` first passes the case and `test_one_ssh_call` (`probe-out.txt`, line 4; control without the
decoy fails, line 5). The return-step report says the row "now says" the first line holding `ssh`; the
row says the first line *with a call of* `ssh`. (b) `test_one_ssh_call` counts physical lines that hold
`ssh ` and `-i`, so it keeps one keyed call, not one `ssh ` text; naming it as the guard of uniqueness
suggests it closes the decoy, which it does not. (c) „pierwszy wiersz pliku” read literally is
`deploy.yml:44`, which holds none of the options; the case reads lines 44-47 joined. This is N-2's gap
restated in the row; the decoy must be written on purpose, so Minor, as N-2 was. A wording that holds:
„w pierwszym miejscu pliku, gdzie stoi słowo `ssh` ze spacją, razem z wierszami dołączonymi przez `\`”.

**m-2 — D-224's pair is still introduced as „the part no test holds” now that its *Verification* names an invariant.**
Place: `foundations/decisions.md:3434-3435`. The template's form after an `invariants:` clause is „An
agent compares a change with the part no invariant and no test holds:”
(`.the-way/elements/decisions/template.md:37-38`); D-156 at :3229 has it. The content agrees with the
code — the pair (a token of 32 bytes from a cryptographic source, its digest the only stored form) is
held by neither the invariant nor a test — so it is Minor by WAY-364; no reader is misled into a
wrong check.

**m-3 — The three changed *Verification* lines are no longer wrapped as the lines around them.**
Place: `foundations/decisions.md:3220`, `:3431`, `:4378`. Each first line now runs to about 120-130
characters while the entry wraps near 100. Polish only.

## The return step's conclusions, against `task-cycle/skill/return_step.md`

- **Verification of D-156, D-224, D-281 gains `page-address-fragment`.** Correct. The invariant names
  the three in *Derives from* (`foundations/invariants.md:1404`), and the template's rule is that a
  decision names in *Verification* the invariants derived from it (`template.md:168-170`, `:229-231`).
  Form: `invariants:` stands before `tests:`, one invariant per decision, joined by ` · ` where D-156
  already had `email-confirmation-link`, ended by `.` before `tests:`, as in D-02, D-03 and the rest of
  the log. The `tests:` clauses stay: the template keeps the clause for the tests that hold the
  decision's sentences whether or not an invariant also marks them, and no `decision:` link is lost.
  The other invariants that derive from these decisions (`email-confirmation-link` from D-156,
  `loop2-deploy-trigger-input` from D-09) were already named. The pair rule of the step (remove from a
  pair what a test holds) has nothing to act on: no part of the pairs of D-156 or D-224 is held by the
  invariant's tests.
- **D-09 unchanged.** Correct: `deploy-workflow-input` names no decision in *Derives from*
  (`recovered from code`), so no decision's *Verification* must name it.
- **No environment fact.** Agreed: neither new invariant has a condition outside the product; both
  rest on `none`, and their sentences are about what the page and the workflow's text do.
- **No glossary term.** Agreed: the words of the two entries are used in their ordinary technical
  meaning; nothing in the files would be read wrongly for lack of an entry.
- **No entry deferred.** Agreed: the report proposes none and lists none for later; N-1 to N-3 stay
  review findings, not entries.
- **The row of `deploy.yml` corrected.** Partly: the `-4o` sentence and the three forms are now true
  (bundled `-4o "StrictHostKeyChecking no"` passes the case, `probe-out.txt` line 2); the `sha` clause
  is not (I-1) and the `ssh` clause still overstates in a crafted case (m-1).
- **Sentences of the row verified true at the head:** the commit's name only on a line `NAME:
  ${{ github.sha }}` (:100-103); the three option forms (:34-37); the first value wins (`setdefault`,
  :43); the case checks `BatchMode` too, which is no rule of the invariant (:87); the test reads text
  only (:1-2).

## Declined to judge

- The test's own gaps N-1, N-2 and N-3 (bundled flag, decoy line, `BatchMode` in the marked case):
  in the request's list, not reopened; m-1 grades only the row's words.
- That the case does not read a one-line `run: echo ${{ … }}`: the row says „zapisanym blokiem”, so it
  claims nothing there; no finding.
- D-281's sentence lists eight addresses where the task's quotation lists seven (`#/wiedza`): not
  touched by this commit.
- Whether `deploy-workflow-input` should derive from D-09 and M-4 (each new invariant joins two rules):
  settled in earlier rounds, outside this commit.

## Checks

| Check | Command | Exit / result |
|---|---|---|
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 147 warn, 7 info` |
| focused test | `python -B scripts/test.py tests/deploy/test_deploy_workflow.py` | 0, 16 tests OK |
| variants of `deploy.yml` | `python -B -I probe.py <worktree root> <out>`: each variant written to a scratch file, `WORKFLOW` of the imported test module pointed at it, three cases run | 0; per-variant results in `probe-out.txt` (baseline all pass; I-1 and m-1 variants pass where the row claims a refusal; controls fail as expected) |
| whole file on the I-1 variant | the test class loaded with `WORKFLOW` pointed at `variant-deploy-step.yml` | 0; `16 0 0` (run, failures, errors) |
| head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD` vs `git ls-files --stage -- .the-way` | match |

`npm test` was not run, as the dispatch orders; it is the cycle's own run.

## Reaches beyond the dispatch

- `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-fix-1-report.md`, findings N-1 to
  N-3 (lines 31-35): to know what N-3 was, so as not to reopen it and not to mistake I-1 for it.
- `.the-way/elements/decisions/template.md`, the field *Verification* and section "Verification":
  to judge the form of the three lines.
- `foundations/invariants.md`, a search of *Derives from* for D-09, D-156, D-224, D-281: to check that
  no other derived invariant was left unnamed.

## Working copies

- `.runs/review-return-step`
  held the probe script, the variant files and their output; removed. What the report needs is kept
  in `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-return-step-evidence`
  (`probe.py`, `probe-out.txt`, `variant-deploy-step.yml`, `whole-file-variant7.txt`). No worktree
  was made.

## Unread material

none — of the dispatch, read whole: the review method, `return_step.md`, the return-step report, the
task, the invariants `page-address-fragment` and `deploy-workflow-input`, `foundations/part_map.md`,
`guidelines/testing.md` (in two reads), D-09, D-156, D-224, D-281 with their *Rejected*,
`tests/deploy/test_deploy_workflow.py`, `.github/workflows/deploy.yml`, and the full diff. The
browser-view sources the return step compared with `page-address-fragment` were not re-read; this
commit does not touch them and the dispatch did not name them.

## Searches not found or unclear

- Unclear: whether „skrypt kroku” in the row means the deployment step's script alone or any step's;
  I-1 holds either way, since the deployment step's own script in the `- run: |` form passes.
