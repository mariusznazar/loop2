PASS 8d211cbed07a0fd0a4669c3e13a857c5c2a4dfc9

# Review of the whole change — zasieg-lintera-i-formatera

Variant: the review of the whole change, no plan, no spec, no slice reviews. Range `aa0ecd09..8d211cbe` (three commits `006e5e40`, `e401b2bd`, `8d211cbe`); `git rev-parse HEAD` = `8d211cbed07a0fd0a4669c3e13a857c5c2a4dfc9`, as given. Worktree status clean before and after my review.

Counts: blocking 0, Minor 2 (both within the task), out of scope 0 findings (4 lines of Declined to judge).

## Changed files (`git diff --numstat aa0ecd09..HEAD`; total +226 / -61)

| File | Added / removed |
|---|---|
| `.gitattributes` | +8 / -26 |
| `eslint.config.mjs` | +2 / -14 |
| `foundations/decisions.md` | +7 / -7 |
| `foundations/invariants.md` | +3 / -3 |
| `guidelines/coding.md` | +10 / -4 |
| `tests/quality/eslint-rule-sets.mjs` (new) | +36 / -0 |
| `tests/quality/test_quality_invariants.py` | +7 / -7 |
| `tests/quality/test_source_tool_scope.py` (new) | +153 / -0 |

## Coverage of the frozen task (by number)

*To do*:
1. Met. `eslint.config.mjs`: `directories` is now `src/browser`, `src/server`, `scripts`, `tests`; every TS/JS file of the five parts receives the D-29 sets. Shown by the new test passing at HEAD and by the ten files listed below at the base.
2. Met. `PRETTIER_PATTERNS` takes `tests/**/*.{SCRIPT}`; `.gitattributes` takes eight `tests/**/*.<ext> text eol=lf` lines. Prettier `--check` with the patterns at HEAD: exit 0.
3. Met. The invariants say "every TS/JS file of the five parts, according to the part map"; the test (`tests/quality/test_source_tool_scope.py`) stops the gate for a file with no D-29 rules, for a file Prettier's patterns do not reach, and for a file without `eol=lf` (all three reproduced below, also for a new file and a weakened rule).
4. Met. D-29 and D-32 take deployment in the binding sentence (D-29 also in *Scope*; D-32's *Scope* already had it), say that a test keeps the file patterns (and for D-32 the LF attributes) and that review keeps the rules and the `prettier-ignore` comments. *Verification* of both is unchanged and agrees with the new invariants (complies/violates examples still hold under the new wording).
5. Met. `guidelines/coding.md` section "Linter": the paragraph now says the test `tests/quality/test_source_tool_scope.py` keeps the patterns; one sentence added in "Formatter"; both new files in *Where in code*.

*Acceptance criterion*: met. The test, run on the configuration of the base, fails and names exactly the ten files of point 1 (reproduction below).

*Decisions in play*: D-29 and D-32 changed as the task says (the task's own rows 1 and 2); D-28 and D-83 unchanged and not contradicted (the change is the reason D-83 gives for moving a pattern list from review to a test); `eslint-source-rules` is still run by the existing whole-repository ESLint (`test_eslint_source_rules`), which passes at HEAD.

*Settlements to record*: row 1 (scope of the four parts plus deployment; D-29 and D-32) — recorded in D-29/D-32 *Scope*, binding sentences and *Rejected* (the three "not chosen" ways of the question). Row 2 (patterns kept by a test, rules by review; the test asks ESLint and compares with the published sets, no frozen list) — recorded in the binding sentences and *Rationale*; the test does exactly that (second ESLint instance with only `js.configs.recommended` and `tseslint.configs.recommendedTypeChecked`). Row 3 (invariants speak of the scope by the part map) — recorded in both invariants; `foundation_check.py` exit 0. The meaning sentences of the author's table (English and Polish) fit the rows; the English wording of each invariant does what the test does (WAY-263 checked: no entry says more broadly or less qualified than the files do).

Fidelity to sources: nothing invented. The list of ten files in the task equals what the new test names at the base. Out of scope respected: ESLint rule set and Prettier options untouched, `shellcheck-source-rules` list untouched, the play-skill scripts (`.claude/skills/loop2-play/*`, `.agents/skills/loop2-play/*`) stay outside (they belong to `agent-workflow`, so `file_owners` leaves them out of the scope).

## Findings

### Critical
none

### Important
none

### Minor

1. **`tests/quality/test_source_tool_scope.py:141-149` (`test_gitattributes_keeps_lf_for_every_scope_file`) — within the task (To do 3).** The test reads only the attribute `eol`. An added line `tests/transport.test.mjs -text` (text unset, `eol=lf` still given by the earlier line) leaves `git check-attr eol` at `lf`, so the test passes, although with `-text` git does no line-ending conversion and the LF the invariant promises is no longer kept on Windows. Evidence: in a scratch worktree of HEAD I appended that line to `.gitattributes` and ran the test: exit 0, "Ran 4 tests ... OK". The mutation is contrived (an explicit unset), a missing `text` alone with `eol=lf` is treated by git as text, so the practical gap is small; the same line dropped entirely is caught (mutation 7 below). A cheap improvement is to also require `git check-attr text` to be `set` (or `auto`).

2. **`guidelines/coding.md:37-41` and `:94-96` — within the task (To do 5).** `.the-way/product-guidelines/template.md` says a rule "repeats neither a decision of the product's log nor a value taken from a configuration file; it says what the author of the code is to do". The new text names the five parts ("każdy plik TS/JS części browser-view, simulation, account-server, build-tools i deployment") — the scope that D-29 and D-32 already hold, so a next change of the scope must change three places (D-29, D-32, this file). The previous text of the paragraph did the same with four parts, so this is inherited, not new; it is Minor. A phrase such as "każdy plik TS/JS części z zakresu D-29" would say what the author is to do without the list.

## Declined to judge (all out of scope)

- Commit order: commit `006e5e40` is red by itself (the test before the configuration, on purpose, to keep the seen-failing record). Whether the cycle squashes or keeps it is the cycle's decision, not a finding about the code.
- The withdrawn invariant row `eslint-configuration-rules` in `foundations/invariants.md` still says no cheap test checks the configuration; a withdrawn row is history and names none of the entries changed here (the author's own note); left to the human.
- `README.md:60` ("ESLint obejmuje również nowe pliki TS/JS w katalogach wskazanych w jego konfiguracji") stays true and does not mention the new test; not in the task.
- The Prettier pattern `tests/{sim,view}/**/*.{WEB}` now overlaps `tests/**/*.{SCRIPT}` for scripts; harmless (the HTML and CSS part is still needed).

## Checks I ran (separate detached worktrees of HEAD and of the base under the session scratchpad, `node_modules` joined by a junction, both removed afterwards; the reviewed worktree was not changed)

All commands are from the root of the scratch worktree of HEAD unless stated.

1. `python -B scripts/test.py tests/quality/test_source_tool_scope.py` at HEAD — exit 0, 4 tests OK (about 8 s).
2. Same file by the gate's own discovery, `python -B -m unittest discover -s tests/quality -p "test_source_tool_scope.py"` — exit 0, 4 tests OK (checks that the import of `test_quality_invariants` and `loop2_invariant_support` resolves under discovery).
3. **Acceptance criterion**: in the scratch worktree of HEAD I put `eslint.config.mjs` and `.gitattributes` back to `aa0ecd09` and `tests/quality/test_quality_invariants.py` to `006e5e40` (base patterns with the new `PRETTIER_FLAGS` constant), then `python -B scripts/test.py tests/quality/test_source_tool_scope.py` — exit 1, `FAILED (failures=3)` (ESLint test, LF test, Prettier test; the control test passes). Each of the three names exactly: `tests/account-api.test.mjs`, `tests/account-backup.test.mjs`, `tests/account-database-check-standin.mjs`, `tests/account-database-check.test.mjs`, `tests/account-mail.test.mjs`, `tests/account-storage.test.mjs`, `tests/deploy/restore-trial-docker-standin.mjs`, `tests/password-measurement.test.mjs`, `tests/passwords.test.mjs`, `tests/transport.test.mjs`, and no other file (ESLint test: "64 rules unmet" per file). Reproduced independently of the author's `.runs/before.txt`.
4. **New file** (mutation 1): an untracked `deploy/mutant.mjs` (`let   x=1`, part deployment, in no config pattern) on HEAD's configuration — exit 1, ESLint test names it (64 rules unmet) and Prettier test names it; the LF test passes for it (`deploy/** text eol=lf` covers it, correct).
5. **Weakened rule** on HEAD's configuration, each restored by `git checkout` afterwards:
   - mutation 2: `no-unused-vars: "off"` for `tests/**/*.mjs` — exit 1, ESLint test names the test files (1 rule unmet, `no-unused-vars`);
   - mutation 3: options changed (`no-unused-vars: ["error", {args: "none"}]`) for `src/server` and `scripts` `.mjs` — exit 1, named (`scripts/build.mjs` and others, 1 rule unmet);
   - mutation 4: severity `warn` for `no-debugger` on `src/browser/**/*.ts` — exit 1, named (`src/browser/main.ts` and others);
   - mutation 5: `tests/passwords.test.mjs` added to the ignores — exit 1, named (64 rules unmet).
6. **Weakened patterns**: mutation 6, the `scripts` pattern removed from `PRETTIER_PATTERNS` — exit 1, Prettier test names `scripts/build.mjs`, `scripts/kitchen-sink.mjs`, `scripts/local-start.mjs`...; mutation 7, the `tests/**/*.mjs text eol=lf` line removed from `.gitattributes` — exit 1, LF test names the `tests/*.mjs` files. Mutation 8 (`-text` line) passes: see Minor 1.
7. `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` (D-351; the new Python file imports `loop2_invariant_support` and `test_quality_invariants`) — exit 0, 10 tests OK.
8. `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <empty {} file> .` at HEAD (the command of `test_eslint_source_rules`) — no output; the exit code is that of a `time` subshell in my shell (0); no report was printed.
9. `prettier.cjs` with `PRETTIER_FLAGS` and `PRETTIER_PATTERNS` of HEAD (the command of `test_prettier_source_format`) — exit 0, "All matched files use Prettier code style!".
10. `ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache .` (pinned Ruff of the main worktree's venv, run in the HEAD scratch tree) — exit 0.
11. `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree (read-only) — exit 0, "0 errors".

Not run: the full `npm test` (the orchestrator's); `tests/quality/test_quality_invariants.py` as a whole in the scratch tree (it needs `.runs/quality-venv` there; its ESLint, Prettier and Ruff commands I ran separately as 8-10; ShellCheck and the audit are untouched by the change). I did not run the changed foundation check with `--skip-test-citations`.

A changed invariant test is named: the tests of `eslint-source-rules` and `prettier-source-format` — `tests/quality/test_source_tool_scope.py` (3 cases, new) and `tests/quality/test_quality_invariants.py` (`test_prettier_source_format` now takes the flags from the shared constant `PRETTIER_FLAGS`, same command).

## Own-work check of the author

The author named the right weakest point (a new file and a weakened rule, not only today's ten files) and tested it by two mutations. My mutations 1-7 confirm it and go further (options, severity, ignores, dropped pattern, dropped LF line); the one it would not catch is Minor 1. The author's list of what stays uncaught by design (extra rules beyond the sets, `noInlineConfig`) is correct and agrees with D-29: "review keeps its rules to those sets".

## Reserved choice, trust boundary, tests

No reserved choice is taken: no new dependency (`@eslint/js`, `eslint`, `typescript-eslint` are already in the package). No trust boundary or irreversible operation (answers of step 4: no). The tests assert something and fail when the behaviour breaks (shown above); the expected rule sets come from the tools' own published sets through a second ESLint instance, not from a value the configuration computes for itself; the control test (`test_control_unmet_rules_are_found_by_severity_and_options`) pins the comparison with literals. Part map: the two new files belong to build-tools by `tests/quality/**`; no entry of the map needed a change.

## Reaches beyond the dispatch (section 1)

- `foundations/part_map.md` whole (215 lines) — to name the parts of the touched files and read the scope.
- `tests/invariants/loop2_invariant_support.py` lines 1-140 (`listed_files`, `file_owners`) — how the scope is computed, including that unclaimed files get the owner `unspecified` and fall outside the test (they are still covered by the `tests` directory in ESLint and Prettier and flagged by `foundation_check.py`).
- `scripts/test.py` lines 1-80 and the head of `.the-way/gate/run_tests.py` (found by grep) — how a new `test_*.py` file is discovered.
- `.the-way/product-guidelines/template.md` (first 120 lines) and the passages of `.the-way/product-guidelines/coding/template.md` on *Linter*, *Formatter* and *Where in code* (lines 128-156, 226-240, 290-300) — to compare the changed `guidelines/coding.md` (WAY-170).
- `.gitattributes` whole (lines 1-60) — after the author's edit.

## Unread material

Counts of section 1: decisions of my selection read whole **10** (D-28, D-29, D-30, D-31, D-32, D-73, D-77, D-83, D-267, D-351); read by title only **79** (the 89 decisions whose *Scope* names build-tools or deployment, all ten read whole among them, which leaves 79 whose title I scanned in a list).

- Decisions I did not run through even by title: those of the selection whose *Scope* names only browser-view, simulation or account-server and neither build-tools nor deployment (the selection by the five parts holds 386 of 389 decisions; 386 - 89 = 297 of them are such). I judged them by the topic (they concern the game, the browser and the server, not the linter, formatter, tests gate or part map) and did not scan their titles. Decisions that bear on the change and stayed unread: none known. Of the 80 read by title, none pointed to a bearing on the change beyond those I read whole; D-81 and D-85 (levels and exemplars of tests) and D-362 (places outside the repository) I judged by title only and did not open.
- Guideline files: `guidelines/coding.md` (327 lines) and `guidelines/testing.md` (465 lines) read whole. The kind files `guidelines/coding-*.md` I did not read: no row of the kind index matches the change (a build-tools test and configuration). `guidelines/styleguide-browser-view.md` not read (no interface). The discipline template `.the-way/product-guidelines/coding/template.md` read only at the passages named above; `.the-way/product-guidelines/template.md` first 120 of 134 lines (the rest is the note on instruction files).
- Foundation selected whole: the part map; invariants `eslint-source-rules` and `prettier-source-format` (as changed) read whole; the glossary was not read whole (the change uses no glossary term in a special meaning; "invariant", "part" only).
- The author's report read whole; the frozen task read whole; `foundation_review_2026-11-13` (author's private note) not available to me and not read.

## Searches not found or unclear

- `foundation_review_2026-11-13`, the *Source* of settlement row 2 (variant a/b of F-9), lies in the author's notes; not read. The *Rejected* wording "the file patterns kept by review alone" rests on the task's row 2 and D-83's *Rejected*, which is what the author used too.
- The invariant `prettier-source-format` speaks of "the patterns of this invariant's test"; the patterns stand in `tests/quality/test_quality_invariants.py` and are imported by `tests/quality/test_source_tool_scope.py`, both carrying `# invariant: prettier-source-format`. I read "this invariant's test" as both; unclear only in that the entry names no file, which is the form the entry had before.
- Nothing else not found.
