# Report of executor 5 - slice 5: testing guidelines, the departure for `destroy` and the deploy workflow's unread forms

**Status:** done (the warning of the first commit was removed by the second commit, below)

## Commits

- `9045f5a9` docs: name D-422 among the departures of the testing guidelines and allow the call of destroy in its one case, and name two forms of the deploy workflow that its test does not read (base `98195ef42c61`)

- second commit, after the coordinator's message (no amend): see "Second commit" below.

## Files changed

- `guidelines/testing.md` (+7 -4):
  - *When to read*: "jedenaście odstępstw" and D-422 added to the list; one sentence says D-422 departs only for the one case of `tests/http.test.mjs` that checks the call of `destroy`, every other test keeping the template's rule on checking a call.
  - *Recipes*, `integration test`, *Doubles*: after "wywołanie sprawdzaj tylko dla skutku widocznego poza produktem" the one exception (D-422) with the case's name in `tests/http.test.mjs` and the reason (the cut of an answer is not seen on Windows, where the gate runs); D-422 added to the field's decision list.
  - *Trust boundaries*, the row of `.github/workflows/deploy.yml`: two forms added to the list the cases do not read: a key with a space before its colon (`run : ...`) and a value with `$` written as the escape `\u0024` in a double-quoted string.

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` -> exit 0 ("0 errors")
- `python -B .the-way/instruction-files/check_instructions.py` -> exit 0 ("0 error, 145 warn, 7 info"). Before my change the count was 144 warnings; the one new warning is `WARN dead-path guidelines/testing.md:188 \`\u0024\` does not exist` (the checker reads the backticked escape as a path). A warning does not stop the tests. Cost of avoiding it: writing the form without its literal, which To do 17 names word for word; I kept the literal.
- `npm.cmd test -- tests/deploy/test_deploy_workflow.py` -> exit 0 (17 tests OK, the test unchanged)
- The full gate (`npm.cmd test` without a file) not run: the orchestrator's alone.

## Own-work check

Requirement most likely unmet: the two forms of To do 17 are named in the row as forms the test does not read, each verified against the test's reading, not asserted from memory.

Check: `.runs/executor-5/craft.py` (run `python -B -I .runs/executor-5/craft.py`, exit 0) loads `tests/deploy/test_deploy_workflow.py` by path, points its `WORKFLOW` at crafted copies of `deploy.yml` in `.runs/executor-5/crafted/` and runs all 17 cases of `DeployWorkflow` plus `script_expressions` on each. Result (`.runs/executor-5/result.txt`):

- control (the file as it stands): 17 ran, 0 failed, `script_expressions` = []
- `space_before_colon` (`run : |` over the probe step's script, with `echo ${{ secrets.DEPLOY_HOST }}` as its first line): 17 ran, **0 failed**, `script_expressions` = [] - the expression passes unseen
- `escaped_dollar` (a new step `run: "echo \u0024{{ github.event.head_commit.message }}"`): 17 ran, **0 failed**, [] - passes unseen
- `escaped_dollar_secret` (same with `secrets.DEPLOY_HOST`, one of the five): 17 ran, **0 failed**, [] - passes unseen
- `plain_dollar_reference` (same step with `${{ ... }}` written plainly): fails `test_sha_reaches_the_script_only_through_env` and `test_an_expression_after_a_comment_mark_in_a_script_is_refused` - the reading does see the plain form, so the two passes above are the escape's and the space's doing.

Reading of the code that explains it: `script_expressions` opens a script only on `^(\s*(?:-\s+)?)run:(.*)$` (no space before the colon) and looks for the text `${{`; `test_sha...` looks for the text `github.sha` and `test_exactly_the_five_secrets` for `secrets\.NAME`, so an escaped value passes unless its text holds `github.sha` or a `secrets.` name outside the five - which is the limit the row now states. That YAML reads `\u0024` in a double-quoted scalar as `$` is the YAML rule (my knowledge, not verified in this task); that GitHub then evaluates it was not checked - the row's closing sentence already says the test proves what the file says, not what GitHub does.

Tooling slip, corrected: my first Edit stored `\u0024` as `$` (the escape was swallowed on the way in). I found it by searching the file for `u0024` (no hit), fixed it with a script using `chr(92)`, and searched again (hit at line 188, `grep -c` = 1; `git diff --stat` unchanged at 7+/4-).

## Reaches beyond the handoff

- `.the-way/task-cycle/change/slice.md`: named by the handoff's method; read whole.
- `.github/workflows/deploy.yml`: read whole, to write the crafted copies (not named by the handoff).
- `the author's global rule file scripts.md` and `git.md`: read, as the user's global instructions and a hook require before a script and a commit.

## Working copies

- `.runs/executor-5/` (script `craft.py`, `fix.py`, output files, `crafted/*.yml`): stands in the ignored `.runs/` of the worktree; removed before return (see last line of this report).

## Choices

- D-422 placed in the *Doubles* field's decision list as well as in the text: the field's rule is that a field that binds ends with the decisions that carry it. Rejected: leaving the list alone; cost if wrong: the field cites one decision less.
- *When to read* sentence for D-422 written in the form of the D-77 and D-82 sentences. Rejected: no sentence (the list alone); cost if wrong: a reader of the list does not learn that D-422 is one case only.
- The row's wording of the escape limit ("o ile jego tekst nie zawiera `github.sha` ani `secrets.` z nazwą spoza pięciu") states what the crafted runs showed; cost if wrong: a reviewer trusts a form the test in fact catches, which is the safer error.
- Did not add D-422 to the *Decision* line of *Trust boundaries* (the case is not a row's check of a boundary); the slice names only the two edits.

## Unread material

none (the guideline file `guidelines/testing.md` was read whole in two reads; `foundations/decisions.md` D-73 and D-422 each whole; `foundations/invariants.md` deploy-workflow-input whole; `tests/http.test.mjs:5950-5991` and the template and `guidelines/coding.md` whole). `.runs/task-cycles/.../task.md` passages were read as copied in the handoff, not opened in the file.

## Searches not found or unclear

none

Removal: `.runs/executor-5/` removed whole after the report was written (crafted copies, scripts and outputs).

## Second commit (the coordinator's fix)

The coordinator asked that the backticked escape at `guidelines/testing.md:188` not be read as a path. The second commit words it: "ucieczka, która pisze znak dolara jako ukośnik wsteczny, `u` i 0024, w ciągu w cudzysłowie"; the example `run: "echo ${{ … }}"` stays in backticks (the checker did not read it as a path; the meaning of the form is unchanged and rests on the crafted runs above). `git diff --stat`: 1 insertion, 1 deletion.

Commit: second commit of the slice (hash in the return message), made after `git add guidelines/testing.md`.

Checks of the second commit (command and exit code):
- `python -B .the-way/instruction-files/check_instructions.py` -> exit 0, "0 error, 144 warn, 7 info" (the warning of `testing.md:188` is gone; no warning of `guidelines/testing.md:18x` remains)
- `python -B .the-way/elements/common/foundation_check.py` -> exit 0, "0 errors"
- `npm.cmd test -- tests/deploy/test_deploy_workflow.py` -> exit 0 (17 tests OK)

This supersedes the "one new warning" concern of the first commit. The working directory `.runs/executor-5/` was made again for this fix and removed again before return.
