# Return step report

**Status:** done. **Commits:** none (the foundation matches the code at `57c25292`; nothing needed a change). Worktree clean, head `57c25292`.

## Return step (in the form of the record)

- **Foundation compared with code:** each entry the change writes or touches, read against the code at `57c25292`; nothing no longer matched, no correction.
  - D-433 against `ruff.toml` (`line-length = 100`, `[format] exclude = ["*.md"]`, no other formatter setting), `tests/quality/test_quality_invariants.py` (`test_ruff_source_format`, `test_no_python_file_carries_a_comment_that_switches_the_formatter`, with `decision:` quotations that stand in the binding sentences) and `tests/quality/format_support.py` (file listing by Ruff, comment detector). Its scope equals the *Part* of `ruff-source-format` and the scope of D-30. Its *Verification*: the clause `tests:` names the two things tests hold (the ban found as real comments, and the listing equal to Ruff's files); the pair of examples is only for what no test holds (the other settings of `ruff.toml`), because the test runs with the repository's own `ruff.toml` and so does not hold the width or the settings. Nothing to remove from the pair.
  - D-434 against `BASH_SCRIPTS` and `format_support.SHFMT_FLAGS` (`-i 2 -bn -ci -ln bash`), the pinned `shfmt-py==4.2.0` (`shfmt --version` → `v3.14.1`), `test_shfmt_source_format`; the sentence about `&&`/`||` is the corrected one of `57c25292` and agrees with what shfmt does (seen in correction 1). No pair, none needed (a test holds the sentence).
  - D-28, D-32, D-424: the changed wording agrees with the code (`TOOLS` holds `shfmt`, the environment test has the shfmt case, the six quotations of D-424's first sentence stand in the sentence, `foundation_check.py` exit 0). D-30, D-31 compared (found by search): no sentence of them is contradicted; `ruff.toml` now also holds the width and the format section, which D-30's list of what `ruff.toml` sets does not mention and does not forbid (D-433 states them); no edit.
  - Invariants `ruff-source-format`, `shfmt-source-format` against their tests: the sentences match what the tests check (layout; the five comments; the Bash list); *Part* lists equal those of the matching linter invariants.
  - Four environment facts against their dependants: each is named by D-433 or D-434 *Based on* and by nothing else; their passages were fetched on 2026-11-19 and were not changed since.
  - Part map, `build-tools` *Files*: holds `.git-blame-ignore-revs` (the file exists and git tracks it; the foundation check reports no unclaimed file and no pattern matching nothing). The parts of the other touched files: `deploy/**` (deployment), `tests/quality/**`, `ruff.toml`, `requirements-quality.*`, `README.md` (build-tools), `guidelines/**`, `AGENTS.md`, the skill copies, `.github/workflows/tests.yml` (agent-workflow) — each claimed once. The sentence of `build-tools` ("checks code quality and types") still covers the format checks; left as it is.
  - Guidelines `guidelines/coding.md` (`### Formatter`, `### Reformatting commits`, "Where in code") against the code: the named paths exist and are tracked, the commands in the text are those the failure messages print, the examples behave as stated (checked in the first round), no value of a configuration repeated.
  - `README.md`, `AGENTS.md`, the two skill copies of `loop2-balance`: agree with the code and with each other (`cmp` of the copies, earlier round).
- **Decisions written or changed:** none in this step. (The change wrote D-433 and D-434 and changed D-28, D-32 and D-424 earlier; see `author-report.md`.)
- **Invariants written or changed:** none in this step (`ruff-source-format` and `shfmt-source-format` were written by the change; rule set by the task, To do 4, and decisions D-433 and D-434).
- **Environment facts:** none new in this step (four written by the change: `ruff-formatter-suppression-comments`, `ruff-default-file-patterns`, `shfmt-py-bundled-version`, `shfmt-editorconfig-and-flags`). The change rests on no source outside the product that the foundation does not hold.
- **Glossary terms:** none. Words used ("formatter", "command list" in D-434) are ordinary and no glossary entry gives them another meaning (searched the glossary by heading and for "format" in the first round).
- **Part-map changes:** none in this step (the change added `.git-blame-ignore-revs` to `build-tools`).
- **Projected entries written whole or in part:** none (the task names none).
- **Rows of *Settlements to record* written** (all by the change, none missed): row 1 D-433; row 2 D-433 and the comment test; row 3 D-434; row 4 sentence of D-28; row 5 sentence of D-424; row 6 guidelines: coding, rule `### Reformatting commits`. No row was missing, no new row found.

## The point the orchestrator names: when a change of the bytes of a script of `deploy/` needs the reinstall on the host

What the foundation and the skills say today, found by search of `foundations/`, `guidelines/`, `.claude/skills/loop2-deploy/`, `README.md`, `AGENTS.md`, `deploy/`:

- **D-16** (`foundations/decisions.md`, "What does the automation's key run on the server?"): the key runs a root-owned installed copy; each deployment compares it with the script's source at the deployed commit and only warns when they differ; reinstalling the copy is a human's change. **D-228** (backup script and schedule, the sentence at about line 2284 of the log) says the same for the installed backup script and schedule. The warning on a difference is therefore the designed behaviour and a byte-only change gives it by design.
- **Skill `loop2-deploy`**: `references/backup_and_restore.md` "Installing and reinstalling" step 1: "Reinstall `/usr/local/bin/loop2-deploy` if the commit changes `deploy/loop2-deploy`", check with `cmp`; `references/setup_and_secrets.md` line 343: the installed script is reinstalled only when the head changes `deploy/loop2-deploy`, compare with the installed copy "as `troubleshooting.md` describes and, if they differ in behaviour, install from the exact head" (this one speaks of behaviour, the first of bytes; they are not contradictory for this change, since the reformat changes bytes only and the syntax trees are equal).
- Neither the foundation, the guidelines nor the skill say anything about a change of bytes with no change of behaviour, nor about a reformatting commit, nor that a reformatting of `deploy/` brings the step. The guideline `### Reformatting commits` I wrote speaks of the commit and the blame file only.
- **Found, no edit made** (the handoff: add nothing unless `return_step.md` calls for it and the task allows; the human accepted the step as a human action after the merge, carried by the request). `return_step.md` calls for no entry for it: it is a one-time human step, not a choice that binds after the merge, and the task's *Human actions* stays as the human left it. If the human wants the rule "a reformat of a script of `deploy/` brings the reinstall step" kept for later reformatting commits, that would be a new line in the guideline `### Reformatting commits` or the deploy skill, which this step does not write (no entry is deferred or proposed for later).

## Checks (command → exit code)

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- `python -B .the-way/instruction-files/check_instructions.py .` → exit 0.
- `cd tests/quality && python -B -m unittest test_quality_invariants.QualityInvariants.test_ruff_source_format …test_shfmt_source_format …test_no_python_file_carries_a_comment_that_switches_the_formatter test_format_support test_quality_environment` → exit 0, `Ran 15 tests … OK`.
- Not run: the product's whole gate.

## Questions

None. No drift found that would need a new decision or that reverses an accepted one.

## Unread material

- Not read whole in this step: `foundations/decisions.md` D-228 (read in part: the sentence about the installed copies), D-16 (read the binding sentences and *Verification*, not *Rationale*/*Rejected*); `.claude/skills/loop2-deploy/` files only by search hits and the passages quoted above; `.the-way/task-cycle/record_template.md` read in part (its *Return step* section).
- The handoff, `return_step.md` and `foundation_step.md` read whole; the other entries of the change were read in the earlier rounds (see `author-report.md`).

## Searches not found or unclear

- No place of the foundation, guidelines or skills says when a change of the bytes of a `deploy/` script, with equal behaviour, needs the reinstall (searched "installed copy", "installed script", "reinstall", "differs from deploy"); the skill's two statements differ in wording (bytes at one place, behaviour at the other), described above.

## Working copies

None made; `.runs/return-step/` was not created.
