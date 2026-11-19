# Author report: automatic formatting of Python and Bash (task formatowanie-python-i-bash)

**Status:** done

**Branch / worktree:** `task/formatowanie-python-i-bash`, `the root of the task's worktree`, base `b172d57088e168c5e7f104baf008bfc89b903bc1`. Working tree clean at return.

## Commits

| # | Commit | What |
|---|---|---|
| 1 | `05596b54` | `ruff.toml` formatter section; `shfmt-py==4.2.0` with five wheel hashes; the two format tests and the comment test with their support code; the environment code and its test know shfmt |
| 2 | `7d091cd9` (full hash `7d091cd99e3f678543deda624adc5cb8efbfb6a4`) | the reformat alone: 110 `.py` files and the 3 scripts of `deploy/` |
| 3 | `2d3b33c8` | `.git-blame-ignore-revs`, foundation entries, guidelines, README, AGENTS, part map, CI comment, skill copies |

Order is the suggested one. One departure: commit 1 was amended once, before the reformat existed (not pushed), because my new `tests/quality/test_format_support.py` broke the linter rule FLY002 (two `"\n".join([...])`); the fix had to stand before the reformat so that the reformat commit holds formatter output only.

## Files changed (added / removed lines)

- Commit 2 (reformat): 110 `.py` files `+8376 / -3728`; `deploy/loop2-deploy`, `deploy/loop2-backup`, `deploy/loop2-watch` `+59 / -59` in all three. (The 110 include the two new test files of commit 1 that the formatter touched; one Python file, `tests/quality/format_support.py`, was already as the formatter leaves it.)
- Commit 1: `ruff.toml +7`, `requirements-quality.in +2/-1`, `requirements-quality.txt +7`, `tests/quality/quality_environment.py +8/-1`, `tests/quality/test_quality_invariants.py` (three tests, helper, quotes), `tests/quality/test_quality_environment.py` (shfmt in the scenario, one new test), new `tests/quality/format_support.py` (about 85 lines) and `tests/quality/test_format_support.py` (about 90 lines).
- Commit 3: `.git-blame-ignore-revs` (new), `foundations/decisions.md` (D-433, D-434 added; D-28, D-32, D-424 changed), `foundations/invariants.md +20`, `foundations/environment_facts.md +24`, `foundations/part_map.md +1`, `guidelines/coding.md +63/-7`, `README.md`, `AGENTS.md`, `.github/workflows/tests.yml` (one comment line), `.claude/skills/loop2-balance/SKILL.md` and `.agents/skills/loop2-balance/SKILL.md` (identical copies, two sentences each), `tests/quality/test_quality_invariants.py` (three `decision:` quotations).

## Choices (the three *Questions carried to cycle*, and the others)

1. **Width of the linter's SIM401.** The width is one setting, top-level `line-length = 100` in `ruff.toml`; Ruff has no formatter-only width (`ruff config format` has no `line-length`), so the linter's SIM401 reads 100 too. Rechecked after the reformat: `ruff check --config ruff.toml --ignore-noqa --no-fix --no-cache .` exit 0, "All checks passed!", at the commit before the reformat and at the one after. Way rejected: keeping the linter at 88 — not possible with one Ruff configuration. Cost if wrong: a SIM401 suggestion that stays silent at 100 and would show at 88; none today. Stated in D-433.
2. **How the comment test finds the `.py` files.** `format_support.python_sources` runs `ruff check --show-files --config ruff.toml --no-cache .` and keeps the paths ending `.py` or `.pyi`, so the files and the exclusions are Ruff's own (D-30's `extend-exclude`, `.gitignore`, the include list). Two tests keep it honest: a made-up tree beside a copy of the real `ruff.toml` lists `a.py` and `pkg/b.pyi` and nothing of `c.md`, `notes.txt`, `.runs/`, `.the-way/`; and every `.py`/`.pyi` that `git ls-files` lists is among Ruff's files (seen failing once by adding `"scripts"` to `extend-exclude` for a moment, exit 1, then restored). Comments are found with `tokenize` (real comments only) and matched as Ruff's `SuppressionKind::from_comment` matches them, with `fmt: skip` also anywhere among `#` segments. Way rejected: `git ls-files '*.py'` — it would not follow `ruff.toml`. Cost if wrong: a Python file kind Ruff reads and the test skips (`.pyw`, `.ipynb`); neither exists, and the formatter check itself still reads whatever Ruff reads.
3. **The formatting command and the failure message.** Direct tool calls, no npm script and no wrapper script: `ruff format --config ruff.toml .` and `shfmt -i 2 -bn -ci -ln bash -w deploy/loop2-deploy deploy/loop2-backup deploy/loop2-watch`, both from `.runs/quality-venv`. The failing test prints the tool's own output (Ruff in `--output-format concise`, shfmt with `-l`, so the list of files and not 16 000 lines of diff) and then `Format the files with: <command>`, where the path of the tool is the one of the machine running the test (`.runs/quality-venv/Scripts/ruff.exe …` here, `bin/` elsewhere), as `quality_environment.shown` writes it. The same commands are in README. Way rejected: an npm script — one more file to keep, one more place that must know the OS path and the Bash list. Cost if wrong: the Bash list is in the test and in the command; a new script added to `BASH_SCRIPTS` shows up in both, because the message is built from the list.
4. **Markdown left out by `[format] exclude = ["*.md"]`**, not by a top-level `include`. A top-level `include` would also narrow the linter (it would stop reading `ruff.toml` itself, which the linter checks for rule names). Ruff 0.17.1 includes `*.md` by default (fact written). The exclusion works: `ruff format --check` reads 111 files, no Markdown.
5. **Names.** Invariants `ruff-source-format` and `shfmt-source-format`; decisions D-433 (Python) and D-434 (Bash), the next free numbers (log held D-432 and withdrawn numbers up to D-361). Rule of row 6 stands as its own guidelines rule `### Reformatting commits` (decision `none`), after the rule of size, because the template puts a product's further rules there. D-28 lost the clause of deferral and the way "automatic formatting for every language" from *Rejected*; D-32's *Rejected* line "Python and Bash formatting now …" now reads "… in this decision — each has a formatter and settings of its own, which D-433 and D-434 hold".
6. **One invariant for Python holds both the layout and the ban of the five comments** (task item 4 joins them); the ban's sentence is also held by a `decision:` line on its own test.

## The entries written (one sentence in English, one in Polish)

| Entry | Mark | English | Polish |
|---|---|---|---|
| D-433 How is Python formatted? | row 1 and row 2 | Python files stand as Ruff 0.17.1 formats them at line width 100 with Markdown left out, and carry no comment that switches the formatter. | Pliki Pythona stoją tak, jak formatuje je Ruff 0.17.1 przy szerokości linii 100, bez Markdowna, i nie niosą komentarza, który formater wyłącza. |
| D-434 How are the Bash scripts formatted? | row 3 | The Bash scripts that ShellCheck checks by name stand as shfmt 3.14.1 leaves them with `-i 2 -bn -ci -ln bash`, which makes shfmt read no EditorConfig file. | Skrypty Bash, które czyta ShellCheck, stoją tak, jak zostawia je shfmt 3.14.1 z `-i 2 -bn -ci -ln bash`, co sprawia, że shfmt nie czyta żadnego pliku EditorConfig. |
| D-28 (changed) | row 4 | Loop2 no longer defers the automatic formatting of Python and Bash. | Loop2 nie odkłada już automatycznego formatowania Pythona i Basha. |
| D-424 (changed) | row 5 | The environment `.runs/quality-venv` holds Ruff, ShellCheck and shfmt. | Środowisko `.runs/quality-venv` obejmuje Ruffa, ShellCheck i shfmt. |
| D-32 (*Rejected* line changed) | the cycle's | The way "Python and Bash formatting now" is no longer rejected but held by D-433 and D-434. | Droga „formatowanie Pythona i Basha teraz” nie jest już odrzucona, tylko opisana w D-433 i D-434. |
| invariant `ruff-source-format` | row 1 and row 2 (task To do 4) | Every `.py` and `.pyi` file Ruff finds under `ruff.toml` stands as `ruff format` leaves it and carries none of the five switching comments. | Każdy plik `.py` i `.pyi`, który Ruff czyta z `ruff.toml`, stoi tak, jak zostawia go `ruff format`, i nie niesie żadnego z pięciu komentarzy wyłączających. |
| invariant `shfmt-source-format` | row 3 (task To do 4) | Every Bash script the test names stands as shfmt 3.14.1 leaves it with `-i 2 -bn -ci -ln bash`. | Każdy skrypt Bash z listy testu stoi tak, jak zostawia go shfmt 3.14.1 z `-i 2 -bn -ci -ln bash`. |
| fact `ruff-formatter-suppression-comments` | the cycle's | Ruff 0.17.1 gives `yapf: disable` and `yapf: enable` the kind of `fmt: off` and `fmt: on`. | Ruff 0.17.1 traktuje `yapf: disable` i `yapf: enable` jak `fmt: off` i `fmt: on`. |
| fact `ruff-default-file-patterns` | the cycle's | Ruff 0.17.1 lists `*.md` among the file patterns it includes by default. | Ruff 0.17.1 ma `*.md` wśród wzorców plików, które czyta domyślnie. |
| fact `shfmt-py-bundled-version` | the cycle's | The release 4.2.0 of `shfmt-py` sets the version of its shfmt binary to 3.14.1. | Wydanie 4.2.0 paczki `shfmt-py` ustawia wersję swojego shfmt na 3.14.1. |
| fact `shfmt-editorconfig-and-flags` | the cycle's | shfmt 3.14.1 reads EditorConfig formatting options except where any parser or printer flag is given. | shfmt 3.14.1 czyta opcje formatowania z EditorConfig, chyba że podano jakąkolwiek flagę parsera albo drukarki. |
| part map `build-tools` `Files` line `.git-blame-ignore-revs` | task To do 7 | The file `.git-blame-ignore-revs` belongs to build-tools. | Plik `.git-blame-ignore-revs` należy do części build-tools. |
| guidelines `### Formatter` (changed), `### Reformatting commits` (new), `### Odłożone rodzaje kodu`, `## Where in code` | row 5 and row 6 | The formatter rule names the three formatters and their invariants with a good and a bad Python and Bash example; a commit that only reformats goes alone and its hash goes to `.git-blame-ignore-revs` later. | Reguła formatera wymienia trzy formatery i ich niezmienniki z dobrym i złym przykładem w Pythonie i Bashu; commit, który tylko przeformatowuje, idzie sam, a jego hash trafia później do `.git-blame-ignore-revs`. |

The four environment facts are the cycle's: no row names them, and the settlements rest on them (a tool's behaviour the process uses, D-433 and D-434 *Based on*). Their sources were fetched and quoted on 2026-11-19 (raw files at the tags `0.17.1`, `v4.2.0`, `v3.14.1`). I wrote no glossary term (no term of the task needs one) and no projected entry (none was named).

## Checks (command → exit code)

Run from the worktree root unless noted; `Q` = `.runs/quality-venv/Scripts`.

- Seen failing (WAY-08), before the reformat, at commit 1: `cd tests/quality && python -B -m unittest test_quality_invariants.QualityInvariants.test_ruff_source_format …test_shfmt_source_format …test_no_python_file_carries_a_comment_that_switches_the_formatter` → exit 1, `FF.` (the two format tests failed; the comment test passed because no file had such a comment yet). Trimmed output in `.runs/task-cycles/formatowanie-python-i-bash/reports/author-checks/first-run.txt`; both messages end with `Format the files with: …`.
- The comment test seen failing: same command with `# yapf: disable` and `# note # fmt: skip # noqa` appended to `scripts/audit_dependencies.py` for a moment → `FAILED (failures=1)`, both comments named by file:line; file restored with `git checkout`.
- Passing after the reformat (the same three tests, plus `test_ruff_source_rules`, `test_shellcheck_source_rules`, `test_format_support`, `test_quality_environment`): `cd tests/quality && python -B -m unittest …` → exit 0, `Ran 17 tests … OK`. After commit 3: `python -B -m unittest test_quality_invariants test_format_support test_quality_environment test_ci_workflow test_invariant_support` → `Ran 44 tests … OK`, exit 0 (this includes the ESLint run and the dependency audit of `test_quality_invariants`).
- `test_quality_environment` with `TOOLS` set back to the two old tools for a moment → `FAILED (failures=1)` (the new shfmt test), restored → `OK`.
- `test_format_support` (detector on made-up sources, listing on a made-up tree, completeness against `git ls-files`) → `OK`; the completeness test seen failing once as described in choice 2.
- `.runs/quality-venv/Scripts/ruff.exe format --check --config ruff.toml --no-cache .` → exit 0, "111 files already formatted"; `ruff check --config ruff.toml --ignore-noqa --no-fix --no-cache .` → exit 0; `shfmt -i 2 -bn -ci -ln bash -l deploy/…` → exit 0; `shellcheck --norc --shell=bash --extended-analysis=true deploy/…` → exit 0.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors" (at commit 3; it also checks that each `decision: D-424 "…"` and `decision: D-433/D-434 "…"` quotation stands in the binding sentences). It reported 4 errors before the entries were written (expected: the quotations and the untracked file).
- `python -B .the-way/instruction-files/check_instructions.py .` → exit 0, `0 error, 147 warn, 7 info`. The warnings are `dead-path` lines of the skill and guideline files; of the one my first wording of `guidelines/coding.md` added (`.py` read as a path) I removed the cause, so my change adds none (148 → 147 on that edit; I did not run the script on the base for a count).
- Not run: the product's whole gate and `npm test` (the orchestrator's); `tests/quality/test_source_tool_scope.py`, `test_docker_gate.py`, the deploy and invariant directories (no JS, deploy logic or build file changed; the Bash scripts changed in layout only, shown below).
- `test_loop2_balance_skill` (`cd tests/agent_workflow && python -B -m unittest test_loop2_balance_skill`) → `OK`; the two skill copies are byte-identical (`cmp`, exit 0).
- `git blame` with the ignore file: line 17 of `scripts/audit_dependencies.py` shows `7d091cd99` without the setting and `ca5cf1cfa` (the original author's commit) with `-c blame.ignoreRevsFile=.git-blame-ignore-revs`.

## Own-work check (WAY-164) against the orchestrator's five weakest points

1. **The reformat commit holds formatter output only; behaviour unchanged at the trust boundaries.**
   - Tree equality: a detached worktree of commit 1, `ruff format --config ruff.toml .` plus `shfmt -i 2 -bn -ci -ln bash -w` on the three scripts, `git add -A`, `git write-tree` → `a7fa336aeaea48eb4798b4e55e17ef1104be68bc`; `git rev-parse 7d091cd9^{tree}` → the same. So the commit is exactly the formatters' output on commit 1.
   - Python behaviour: `.runs/task-cycles/…/reports/author-checks/ast_equiv.py HEAD` (the parse of each tracked `.py`/`.pyi` at commit 1 against the file after the reformat, `ast.dump` without positions) → 111 files, 0 differing. The strict variant `ast_equiv_strict.py` (no normalisation of docstrings) → 111 files, 0 differing. This includes `scripts/audit_dependencies.py`. Positive control: the comparison was not run on a deliberately changed file, but the same script style (`ast.dump`) is the one Python itself gives; its input is each file's real parse.
   - Bash behaviour: `shfmt --to-json` (it reads stdin only in 3.14.1, so `git show HEAD:deploy/x | shfmt … --to-json` against `shfmt … --to-json < deploy/x`), positions dropped (`json_equiv.py`) → the three trees equal. Positive control: a copy of `loop2-deploy` with two changed exit codes gave `False`; the real pair gave `True`. The shfmt changes are `(( $# != 0 ))` → `(($# != 0))`, a continued `&&` moved to the start of its line indented two spaces, and the same for arithmetic in `$(( … ))`.
   - The five wheels: see point 3. The CRLF note: in this worktree every `.py` is `i/lf w/lf` (`git ls-files --eol`), so the nine CRLF files of a Windows main checkout are not here and that case was not exercised; with `line-ending = "auto"` Ruff keeps each file's ending, and git stores LF for them, so no whole-file change appears in the index (not demonstrated on this machine).
2. **Both tests fail on an unformatted file and pass after the reformat.** Shown above (first-run `FF.`, then 17 tests `OK`); the comment test and the completeness test each seen failing once.
3. **Hashes of the five wheels.** `.runs/task-cycles/…/reports/author-checks/check_wheels.py` fetched the JSON of `https://pypi.org/pypi/shfmt-py/4.2.0/json` and downloaded each of the five wheels (`macosx_10_9_x86_64`, `macosx_11_0_arm64`, `manylinux2014_aarch64`, `manylinux2014_x86_64`, `win_amd64`), computed SHA-256 and compared: each equals the digest PyPI publishes and each is in `requirements-quality.txt`; "pinned set equals downloaded set: True 5". The sdist (`cf7842d6…`) is left out, as the file's own sentence asks (wheels only). `pip install --require-hashes -r requirements-quality.txt` into a fresh `.runs/quality-venv` → "Successfully installed ruff-0.17.1 shellcheck-py-0.11.0.1 shfmt-py-4.2.0"; `shfmt --version` → `v3.14.1`. The package has no runtime dependencies (`requires_dist` only the `test` extra).
4. **No other `.py` escapes the formatter.** The comment test and the listing come from `ruff check --show-files` (same `ruff.toml`), and the test `test_every_python_file_git_tracks_is_in_the_listing` compares it with `git ls-files`; the format check is `ruff format --check .` itself. 111 tracked `.py`/`.pyi` files, all listed. Markdown is out via `[format] exclude`.
5. **The cited sentences of D-424 equal the new wording.** The six `# decision: D-424 "…"` comments that quote the first sentence (one in `test_quality_invariants.py`, five in `test_quality_environment.py`, one of the five new) all read "… `.runs/quality-venv` of Ruff, ShellCheck and shfmt whenever it is absent …"; `foundation_check.py` would report one that does not stand in the binding sentences (exit 0, 0 errors); the two comments in `test_quality_environment.py` that quote the second sentence of D-424 are unchanged. A grep for "of Ruff and ShellCheck" over the repository (outside `.runs/` and `.the-way/`) finds none left.

## Evidence for the claims about the tools

- Ruff and the comments: formatted a made-up file for each form (`#fmt:off … #   fmt:   on`, `# fmt: skip`, `# noqa: E501  # fmt: skip`, `#yapf:disable … # yapf: enable`) and got the lines inside left unformatted; `# fmt: offline`, `# fmt: skipped`, a prose comment `# the fmt: off comment` and `# fmt:` were formatted as normal code. This matches the source of `SuppressionKind::from_comment` at 0.17.1 (the fact).
- shfmt and EditorConfig: in a directory holding an `.editorconfig` with `indent_style = tab`, `shfmt -i 2 -bn -ci -ln bash` produced two spaces and `shfmt -ln bash` alone produced a tab. So the flags do replace EditorConfig, as D-434 says.
- Guideline examples: the good ones passed `ruff format --check` / `shfmt -l`, the bad unformatted ones failed, and the Python example with `# fmt: off` passes the formatter check — it is why the comment test exists.

## Reaches beyond the dispatch (section 1)

- `.github/workflows/tests.yml` (a trust-boundary file of agent-workflow): one comment line changed ("Ruff, ShellCheck and shfmt"). Why: the comment named the two old tools. No step changed; the install already runs `requirements-quality.txt`. `test_ci_workflow` passes.
- `.the-way/instruction-files/SKILL.md`, `changing.md`, `kind_main_file.md` and `.the-way/elements/*/skill/*.md`, `template.md` of decisions, invariants, environment facts, part map and `elements/common/way_of_working.md`, `rules.md`: read for the foundation step, as the handoff directs.
- Sources of the four facts: raw files on `raw.githubusercontent.com` (Ruff 0.17.1, shfmt-py v4.2.0, mvdan/sh v3.14.1) and `https://pypi.org/pypi/shfmt-py/4.2.0/json`.
- `.the-way/elements/part-map/template.md` (first 150 lines), `.the-way/product-guidelines/template.md` (lines 1–140).

## Unread material

- `foundations/glossary.md`: not read; I looked at its headings and searched for "format" (no term is used in another meaning).
- `.runs/author/decision-index.md` (the generated index): written, not opened; I read D-28, D-30, D-31, D-32, D-424, D-425 and the part of the code section whole from `foundations/decisions.md` instead, and no other decision of the three parts' selection was read (D-29's text I read in passing).
- `foundations/environment_facts.md`: read only the entries `ruff-default-rules` and `shellcheck-default-bash-checks` in part (first lines) and the headings; D-424 cites no fact.
- `foundations/invariants.md`: `eslint-source-rules`, `ruff-source-rules`, `shellcheck-source-rules`, `prettier-source-format` whole; the other entries only by heading search.
- `.the-way/product-guidelines/coding/template.md`: lines 42–175 (the part about the formatter, the list of rules and what each section carries), not from line 176 on.
- `.the-way/instruction-files/tool_loading.md` and `judging.md`: not read (the AGENTS.md change is one phrase in an existing paragraph; the skill's own steps for the mode "change" were followed, and the check script run).
- `guidelines/testing.md` and `guidelines/coding.md`: read whole.

## Searches not found or unclear

- The handoff expected nine `.py` files with CRLF in the working copy: none here (`git ls-files --eol '*.py'` shows `w/lf` for all).
- The handoff says to compare `shfmt --to-json` before and after; in 3.14.1 `--to-json` reads standard input only, so I fed it through a pipe.
- `ruff format` has no `--show-files`; the listing comes from `ruff check --show-files`, which also lists `ruff.toml` (filtered out by suffix).
- The pinned the-way's `.claude/skills/the-way-maintain-instruction-files/SKILL.md` stops following itself in a product and points to `instruction-files/SKILL.md` in the product's `.the-way`; I followed that file.
- No statement of the bundled shfmt version on the PyPI page of `shfmt-py`; it stands in `setup.py` at the tag (the fact's source) and in the README's "Versioning" section, which sends the reader to that file.

## Concerns and points for the orchestrator

- **Numbers in D-433 and D-434 Rationale/Rejected** (+7 275 / +4 641 / +2 349 net lines for widths 88 / 100 / 120; 1 634 / 176 / 122 diff lines for the three Bash settings) are written as the product's own measurement with its record not open to a reader, as the template asks; I rounded them ("about 7 300", "about 4 600", "about 2 300", "about 1 600", "about 170", "about 120"). The task's own figures are those of the trial at `23b521a2`; the reformat I made gives `+8376 / -3728` for Python (net +4 648, including my two new test files) and 59/59 for the three scripts, in line with them. A reviewer who thinks a rounded measurement is a "count" may ask to cut them.
- **`Based on` of D-433** names two facts; `ruff-default-file-patterns` says only that `*.md` is in Ruff's default include list; that the formatter then formats Python blocks in Markdown is my own trial (mentioned in the *Rationale* as default behaviour, from the task's *Context*); the code of Ruff's formatter was not read for that.
- **Commit 1 does not satisfy its own new invariants** (they pass only from commit 2 on), and the foundation check fails at commits 1 and 2 (the entries and the file `.git-blame-ignore-revs` stand in commit 3), as the suggested order has it. Every commit from 2 on keeps the format tests passing (commit 3 was run).
- `.git-blame-ignore-revs` carries comment lines; git and GitHub accept `#` comments there.
- The whole gate was not run.

## Working copies

- `.runs/author/` (scripts, the PyPI JSON, `.runs/author/wheels/` empty, the first-run output, `decision-index.md`, scratch copies of `ruff.toml`): made by me, removed before return, except what the report needs, kept in `.runs/task-cycles/formatowanie-python-i-bash/reports/author-checks/` (`ast_equiv.py`, `ast_equiv_strict.py`, `json_equiv.py`, `check_wheels.py`, `first-run.txt`). `check_wheels.py` reads `.runs/author/shfmt-py.json`, which is not kept: download it from `https://pypi.org/pypi/shfmt-py/4.2.0/json` to that path to rerun.
- The detached worktree `.runs/author/wt-check` (commit 1, for the tree equality): removed with `git worktree remove --force` and `git worktree prune` at once after use; `git worktree list` no longer shows it.
- `.runs/quality-venv/` is the product's own environment made by the install command; it stays (ignored by git).
