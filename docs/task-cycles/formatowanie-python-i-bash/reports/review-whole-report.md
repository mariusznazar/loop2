FAIL 2d3b33c8b8cf036a2c653a17514421f6f8ab4647

# Review of the whole change: automatic formatting of Python and Bash (formatowanie-python-i-bash)

Range `b172d57088e168c5e7f104baf008bfc89b903bc1..2d3b33c8b8cf036a2c653a17514421f6f8ab4647`
(`git rev-parse HEAD` confirmed), three commits: `05596b54` (configuration, pin, tests),
`7d091cd99e3f678543deda624adc5cb8efbfb6a4` (the reformat alone), `2d3b33c8` (foundation, guidelines,
README, AGENTS, part map, skill copies, `.git-blame-ignore-revs`). One author, no plan, no slices.

Counts: blocking 1 (Important), Minor 2, out of scope 0.

## Findings

### Important

**I-1. After the merge every deployment warns that the three installed scripts differ from the
repository, and nothing tells the human that a step on the host now follows.** Comes from no slice
(one author): a consequence of task item To do 3 that the task's *Human actions* ("none") and the
author's report leave out.

- Place: `deploy/loop2-deploy:208-235` (`compare_installed_copy`, `compare_installed_script`) together
  with commit `7d091cd9`, which changes the bytes of `deploy/loop2-deploy`, `deploy/loop2-backup` and
  `deploy/loop2-watch`.
- What is wrong: a merge into `main` starts a deployment (`.github/workflows/deploy.yml:5-7`, push to
  `main`). That deployment runs the installed `/usr/local/bin/loop2-deploy`, which compares each
  installed copy byte for byte with the file of the deployed commit (`cmp -s`, line 222) and, where
  they differ, logs: "warning: the installed … differs from deploy/… at commit …; this run goes on with
  the installed copy. A human should review the difference and reinstall the copy (see the loop2-deploy
  skill)." All three scripts differ after the reformat, so the deployment of the merge, and every one
  after it, logs three such warnings until a human reinstalls the three copies on the host (the steps
  are in `.claude/skills/loop2-deploy/references/setup_and_secrets.md`, "Installing a script from an
  exact commit"). The task says *Human actions: none*, and neither the author's report nor any file of
  the change names this step, so the request would hand the human a merge that silently turns into a
  standing warning that asks for an unexplained review of a ~120-line diff.
- Why it matters: the operator who reads the deployment log sees a warning with an instruction and no
  reason; an agent reading the log (D-355) takes it for a drifted host. Behaviour itself is safe: the
  installed copies and the reformatted files have equal shfmt syntax trees (check 3 below), so the
  reinstall is a formality and not urgent, and the running scripts do the same thing either way.
- Evidence: `deploy/loop2-deploy:222-224`; `git diff 05596b54 7d091cd9 -- deploy/` (59/59 lines);
  `.github/workflows/deploy.yml:5-7`; task `task-frozen.md` § *Human actions* "none".
- What would fix it (no code needed): the request names a human step after the merge — reinstall
  `/usr/local/bin/loop2-deploy`, `/usr/local/bin/loop2-backup` and `/usr/local/bin/loop2-watch` from the
  merge commit as the loop2-deploy skill gives it, checking each with `cmp` — says that until then each
  deployment logs the three warnings, and says why the reinstall changes no behaviour (syntax trees
  equal). The orchestrator decides whether that is a correction of the task's *Human actions* or a line
  of the request only.

### Minor

**M-1 (within the task). Two rounded figures in D-434 and one phrase of D-433 do not match their
source.** `foundations/decisions.md`, D-434 *Rationale* ("against about 170") and *Rejected* ("instead of
about 170", "about 170 changed lines"): the task's figure is 176 changed lines (`task-frozen.md`,
*Questions to settle*, Bash indent and shfmt settings; *Context* line "z wcięciem dwóch spacji (`-i 2`,
jak dziś) 176"), which rounds to about 180, not 170. The other rounded figures hold (7 275 → about 7 300,
4 641 → about 4 600, 2 349 → about 2 300, 2 634 → about 2 600, 1 634 → about 1 600, 122 → about 120).
D-433 *Rationale* says "The counts of lines and files come from a trial run", but the entry gives no
count of files. Consequence: small; a reader comparing the decision with the trial record finds a
figure that is off and a sentence announcing counts that are not there. Fix: "about 180" in the three
places, and "The counts of lines" in D-433.

**M-2 (within the task, no fix advised). The first two commits do not pass the product's checks on
their own.** At `05596b54` the two format tests fail (the reformat is the next commit) and
`foundation_check.py` fails (the `decision: D-433/D-434 "…"` quotations name entries that stand only in
`2d3b33c8`); at `7d091cd9` the foundation check still fails. A `git bisect` that lands on either commit
sees failures that have nothing to do with the bug it hunts. The order follows from the reformat having
to stand alone and before its hash can be listed; rewriting the commits now would change the hash in
`.git-blame-ignore-revs`, so I advise leaving it and only naming it in the request. The author's report
names it as well.

## What I checked and found holding

- **Task coverage.** To do 1 (`ruff.toml`: top-level `line-length = 100`, `[format] exclude = ["*.md"]`,
  no other formatter setting), 2 (`shfmt-py==4.2.0` in both requirement files, five wheel hashes),
  3 (one reformat-only commit, its full hash in the new `.git-blame-ignore-revs`), 4 (two invariants and
  three tests beside `test_prettier_source_format`, failure message carrying the command), 5
  (`### Formatter` with D-433, D-434, both invariants, good and bad examples in Python and Bash; the
  deferral sentence gone; `.git-blame-ignore-revs` in *Where in code*), 6 (AGENTS.md, README.md in the
  four places, the formatting commands and `blame.ignoreRevsFile`, every `decision: D-424` quotation in
  the new wording — `foundation_check.py` 0 errors), 7 (part-map line under build-tools), 8 (both skill
  copies, both places, "about two seconds", byte-identical). Every row of *Settlements to record*:
  rows 1–2 → D-433, row 3 → D-434, row 4 → D-28, row 5 → D-424, row 6 → `### Reformatting commits`.
  Every answer of *Questions to settle* is carried; the three *Questions carried to cycle* are answered in
  D-433 (one width read by SIM401 too), in `format_support.python_sources` (Ruff's own listing) and in
  the direct commands of README and the failure message.
- **Source fidelity.** D-433, D-434, the D-28, D-32 and D-424 changes take nothing from outside the task
  besides the cycle's own answers and the four facts, apart from M-1. D-28 lost exactly the deferral
  clause, the *Verification* word, the *Rationale* words on formatters and the *Rejected* option the
  task's *Decisions in play* names; the remaining deferrals of exemplars stay and agree with
  `guidelines/coding.md` "Odłożone rodzaje kodu". D-32's new *Rejected* item ("in this decision — … which
  D-433 and D-434 hold") keeps D-32 consistent. D-433 does not contradict D-30 (same file set, same
  `--config ruff.toml`; the comment test is a product-written check of the kind D-30 rejects for
  *linter* suppression, but formatter switches have no flag that turns them off, which D-433 states).
  Glossary: no new entry sentence uses a defined term in another meaning.
- **The reformat is formatter output only (trust boundary).** In a worktree of `05596b54`,
  `ruff format --config ruff.toml .` and `shfmt -i 2 -bn -ci -ln bash -w` on the three scripts, then
  `git add -u` and `git write-tree` → `a7fa336aeaea48eb4798b4e55e17ef1104be68bc`, equal to
  `7d091cd9^{tree}`.
- **No behaviour change (trust boundary).** My own script
  `reports/review-whole-checks/equiv.py 05596b54 7d091cd9 <shfmt>`: 110 changed Python files, `ast.dump`
  without positions, 0 differing (includes `scripts/audit_dependencies.py`); 3 Bash scripts, shfmt
  `--to-json` with every position object dropped, 0 differing. Positive controls: on `6be2ec6c~1..6be2ec6c`
  it reports `deploy/loop2-watch` as differing; on `b172d57~15..b172d57` it reports Python files as
  differing.
- **Wheel hashes.** `https://pypi.org/pypi/shfmt-py/4.2.0/json` lists five wheels (macosx x86_64,
  macosx arm64, manylinux2014 aarch64, manylinux2014 x86_64, win_amd64); their SHA-256 values equal the
  five in `requirements-quality.txt`; the sdist is left out as the file's header asks; `requires_dist`
  only the `test` extra.
- **The four environment facts** against their sources at the tags: Ruff 0.17.1 `settings.rs` INCLUDE
  holds `FilePattern::Builtin("*.md")`; `comments.rs` `SuppressionKind::from_comment` as quoted;
  shfmt-py v4.2.0 `setup.py` `SHFMT_VERSION = "3.14.1"`; `shfmt.1.scd` the EditorConfig sentence. The
  detector `format_support.switches_formatter` follows `from_comment` line for line.
- **The tests fail where they should.** In a worktree of the head with an untracked
  `scripts/zz_review_probe.py` (`X=[1,2]` and `# yapf: disable`) and `deploy/loop2-watch` re-indented,
  the three tests fail (`FAILED (failures=3)`), the format messages ending in
  `Format the files with: .runs/quality-venv/Scripts/ruff.exe format --config ruff.toml .` and
  `… shfmt.exe -i 2 -bn -ci -ln bash -w deploy/loop2-deploy deploy/loop2-backup deploy/loop2-watch`, the
  comment test naming `scripts/zz_review_probe.py:2: # yapf: disable`. Markdown: a `.md` with an
  unformatted Python block passes with the real `ruff.toml` and fails with `[format] exclude` removed.
- **Guideline examples.** `VALUES = [1, 2]` passes `ruff format --check`, `VALUES=[1,2]` fails, the
  `# fmt: off` example passes the formatter (which is why the comment test exists); the good Bash example
  passes `shfmt -l`, the bad one fails.
- **`git blame`.** Line 17 of `scripts/audit_dependencies.py` shows `7d091cd9…` without the setting and
  `ca5cf1cf…` with `-c blame.ignoreRevsFile=.git-blame-ignore-revs`; the same for a changed line of
  `deploy/loop2-backup`. The repository allows merge commits only (`allow_squash_merge` and
  `allow_rebase_merge` false), so the listed hash survives the merge.
- **Templates.** `guidelines/coding.md` against `.the-way/product-guidelines/template.md` and
  `.the-way/product-guidelines/coding/template.md`: `### Formatter` names its decisions and invariants;
  `### Reformatting commits` is a further rule after the rule of size, *Decision* `none` with its reason
  in one sentence, accepted as settlement row 6; no rationale, state or configuration value copied.
- **Structure.** `change_file_sizes.py` shows growth only from the reformat (largest +228 lines in
  `tests/invariants/test_browser_view_token_values.py`); D-425's rule covers only files ESLint checks and
  the change touches none (no `.js/.mjs/.ts` in the diff); `test_function_and_file_size` passes at the
  head. No finding of structure.
- **Irreversible operations.** The cycle runs none; the change prepares none beyond I-1's consequence of
  the merge.

## Declined to judge

- Whether one maintainer of `shfmt-py` is an acceptable risk — settled by the human in the task.
- Whether GitHub's own blame view honours `.git-blame-ignore-revs` — not testable here; it is GitHub's
  documented behaviour and the file is at the root.
- Whether the remaining linter rules that read `line-length` besides SIM401 matter — none of the
  selected rules I know of reads it besides SIM401, and `ruff check` reports nothing at 100 (the author's
  run and my quality-test run); I did not read Ruff's source for every selected rule.

## Checks run

From the worktree root unless noted; `Q` = `.runs/quality-venv/Scripts`.

- `git rev-parse HEAD` → `2d3b33c8…` (exit 0).
- Tree equality, worktree `.runs/review-whole/wt-c1` at `05596b54`: `Q/ruff.exe format --config ruff.toml
  --no-cache .` (exit 0, "110 files reformatted, 1 file left unchanged"), `Q/shfmt.exe -i 2 -bn -ci -ln bash
  -w …` (exit 0), `git add -u && git write-tree` → equal to `7d091cd9^{tree}`.
- `python -B .runs/review-whole/equiv.py 05596b54 7d091cd9 <abs path of shfmt.exe>` → exit 0, 110/0 and
  3/0; positive controls as above.
- `curl -s https://pypi.org/pypi/shfmt-py/4.2.0/json` and comparison → five equal.
- `curl` of the four fact sources at their tags → quoted text present.
- `cd tests/quality && python -B -m unittest test_quality_invariants test_format_support
  test_quality_environment test_ci_workflow` → exit 0, `Ran 31 tests … OK` (includes ESLint, Prettier,
  Ruff, ShellCheck, the two format tests, the comment test and the dependency audit).
- `cd tests/quality && python -B -m unittest test_source_tool_scope` → OK (4 tests);
  `python -B -m unittest test_function_and_file_size` → OK (2 tests).
- `cd tests/agent_workflow && python -B -m unittest discover -p "test_*.py"` → OK (89 tests);
  `cmp` of the two `loop2-balance/SKILL.md` copies → exit 0.
- `cd tests/deploy && python -B -m unittest discover -p "test_*.py"` → exit 1, 236 run, 5 import errors
  caused by my invocation (`No module named 'tests'`/`'scripts'`); those five rerun from the root as the
  gate runs them (`python -B -m unittest discover -s tests/deploy -p <module>.py`) → all OK (1+1+1+1+19
  tests). So every test of `tests/deploy` passes at the head.
- Probe of the three format tests in the worktree (above) → exit 1, `FAILED (failures=3)` as expected.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, 0 errors.
- `python -B .the-way/instruction-files/check_instructions.py .` → exit 0, `0 error, 147 warn, 7 info`;
  on base and head in the same worktree → `235 warn` both, no new warning (the differences are word
  counts only).
- `python -B .the-way/task-cycle/change_file_sizes.py b172d57 2d3b33c8` → exit 0.
- `git blame` with and without the ignore file → as above.
- Not run: the product's whole gate `npm test` (the orchestrator's); the directory `tests/invariants`
  (58 files reformatted; their syntax trees are equal to before, so they test what they tested; the full
  gate runs them).

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md` WAY-16, WAY-205, WAY-312 (searched by identifier, entries read):
  to judge the formatting command in `guidelines/coding.md` and the reformat's form.
- `deploy/loop2-deploy:195-250`, `.github/workflows/deploy.yml:1-25`,
  `.claude/skills/loop2-deploy/SKILL.md:655-690`, `.claude/skills/loop2-deploy/references/backup_and_restore.md:100-112`,
  `references/setup_and_secrets.md:78-90, 520-530`, `tests/deploy/deploy_script_support.py:159-210,
  320-345`: to see what the reformat of the deploy scripts does on the host and in their tests (I-1).
- `gh api repos/mariusznazar/loop2` (merge settings): whether the listed hash survives the merge.
- PyPI JSON of `shfmt-py` 4.2.0 and the raw sources of the four facts on GitHub.

## Working copies

- `.runs/review-whole/wt-c1`: a detached worktree (at `05596b54`, later moved to `2d3b33c8` and
  `b172d57`) for the tree equality, the failing-test probe, the Markdown probe and the warning counts,
  with a junction `.runs/quality-venv` to the reviewed worktree's environment. The junction was removed
  with `rmdir` first (the environment stays intact), then `git worktree remove --force` and
  `git worktree prune`; `git worktree list` no longer shows it.
- `.runs/review-whole/` (my scripts, outputs, the decision index and the PyPI JSON): what this report
  needs is kept in `.runs/task-cycles/formatowanie-python-i-bash/reports/review-whole-checks/`
  (`equiv.py`, `selection.md`, `decision-index.md`, the test outputs, `probe-run.txt`, the check outputs,
  `file-sizes.txt`); the directory itself removed.
- The reviewed worktree, its index and branch were not changed.

## Unread material

Decisions of the index read whole: 8 (D-28, D-30, D-31, D-32, D-424, D-425, D-433, D-434) of 50 listed
in full and 378 by heading. Run through the headings outside the chosen sections; none other pointed to
a bearing beyond D-09/D-11/D-355 (deployment and its log), which I did not open — I read the workflow and
the script instead, and they settle I-1.

- Invariants: read whole only those bearing on the change (`eslint-source-rules`, `ruff-source-rules`,
  `shellcheck-source-rules`, `prettier-source-format`, `function-and-file-size`, `ruff-source-format`,
  `shfmt-source-format`). The invariants the ~110 reformatted test files cite by `invariant:` lines were
  not read: the reformat leaves their syntax trees equal, so no test changes what it checks.
- `foundations/environment_facts.md`: the four new entries only (sources fetched).
- `.claude/skills/loop2-deploy/SKILL.md` and its references: the passages named above only.
- Guideline files: `guidelines/coding.md` and `guidelines/testing.md` read whole; the kind files
  `guidelines/coding-*.md` not read (no file of a kind is changed beyond layout);
  `guidelines/styleguide-browser-view.md` not read (no user interface changed).
- The-way's glossary at the pinned commit: not read (no term of the-way is used in another meaning in
  the new entries).

## Searches not found or unclear

- `tests/deploy` run from its own directory cannot import `tests.*`; the gate runs it from the root
  (`.the-way/gate/run_tests.py`, `sys.path[0] = os.getcwd()`), which I then did.
- No test of the repository quotes a line of the deploy scripts that the reformat removed (searched each
  removed line longer than 12 characters under `tests/` outside `tests/quality`).
- `foundations/glossary.md` holds no entry for formatter, reformatting or blame; none needed.
