# Author report — zasieg-lintera-i-formatera

**Status:** done

**Worktree:** `the repository root (the task's worktree)`, branch `task/zasieg-lintera-i-formatera`, base `aa0ecd09`.

## Commits (three, oldest first)

1. `006e5e40` — `test: :white_check_mark: add the test that every TS/JS file of the scope of D-29 and D-32 reaches ESLint, Prettier and the LF rules, failing on the ten files outside them today`. Red on purpose: it is the test written first, on the base configuration.
2. `e401b2bd` — `build: :wrench: reach every TS/JS file under tests/ with ESLint, the Prettier check and the LF rules of .gitattributes`. The configuration change; makes the test pass.
3. `8d211cbe` — `docs: :memo: say in D-29, D-32 and their invariants that a test keeps the TS/JS scope of ESLint, Prettier and LF, with deployment in the scope`. Foundation entries and `guidelines/coding.md`.

If the orchestrator squashes or reorders, note that commit 1 alone fails its own test (this is how the "before" state was kept, see below).

## Files changed

| File | Added / removed lines | Commit |
|---|---|---|
| `tests/quality/test_source_tool_scope.py` (new) | +153 / -0 | 1 |
| `tests/quality/eslint-rule-sets.mjs` (new) | +36 / -0 | 1 |
| `tests/quality/test_quality_invariants.py` | +7 / -7 over both commits (commit 1: constant `PRETTIER_FLAGS`, shared with the new test; commit 2: patterns and their comment) | 1, 2 |
| `eslint.config.mjs` | +2 / -14 | 2 |
| `.gitattributes` | +8 / -26 | 2 |
| `foundations/decisions.md` (D-29, D-32) | +7 / -7 | 3 |
| `foundations/invariants.md` (`eslint-source-rules`, `prettier-source-format`) | +3 / -3 | 3 |
| `guidelines/coding.md` | +10 / -4 | 3 |

(`git diff --numstat aa0ecd09 HEAD`.)

## What the change does

- `eslint.config.mjs`: `directories` is now `src/browser`, `src/server`, `scripts`, `tests` (the whole `tests/` directory, as the human's answer to question 1 says: "cały katalog `tests/` bez wyjątku"); the two explicit `tests/http.test.mjs` and `tests/startup.test.mjs` entries are gone, as `tests` includes them. The rule sets and the files of the tests are untouched. The `programs` of the typed parser already covered `tests/**/*`.
- `PRETTIER_PATTERNS`: `tests/**/*.{SCRIPT}` replaces `tests/{sim,view,quality}/**/*.{SCRIPT}` and `tests/{http,startup}.test.mjs`; the HTML/CSS pattern for `tests/{sim,view}` stays (it is partly redundant for scripts and harmless).
- `.gitattributes`: eight lines `tests/**/*.<ext> text eol=lf` replace the 24 lines for `tests/sim`, `tests/view`, `tests/quality` and the two named files.
- The test: new file `tests/quality/test_source_tool_scope.py` (four tests) plus the helper `tests/quality/eslint-rule-sets.mjs`.
  - The files of the scope: `listed_files` + `file_owners` of `tests/invariants/loop2_invariant_support.py` (part `test-helpers`), kept when their part is one of the five and their suffix is TS/JS. 229 files today.
  - ESLint (`# invariant: eslint-source-rules`): the helper opens one ESLint with `eslint.config.mjs` and a second one with nothing but the published sets (`js.configs.recommended`, `tseslint.configs.recommendedTypeChecked`, each restricted by a generic glob to JS/TS suffixes), and prints for each file the rules each gives it (`calculateConfigForFile`). The Python test requires every rule the sets give a file to arrive with the same severity and options (a rule the sets turn off may be off or absent). No rule list is kept in the product, and no pattern syntax of ESLint is reproduced.
  - Prettier (`# invariant: prettier-source-format`): the test makes a temporary tree holding each scope file with unformatted content, runs `prettier --check` with the flags and the patterns of `test_quality_invariants.py` (`PRETTIER_FLAGS`, `PRETTIER_PATTERNS`, now one source for both tests) and reads which files Prettier reports; a file it does not report is not reached. No glob syntax is reproduced.
  - LF (`# invariant: prettier-source-format`): `git check-attr eol` for each scope file; it must be `lf`.
  - One control test (`# invariant: eslint-source-rules`) feeds `unmet_rules` made-up rule dictionaries: wrong severity, off where on, changed options, absent, a null configuration.
- Foundation: see the next section. `guidelines/coding.md`, section "Linter": the paragraph that said review keeps the patterns now says the test `tests/quality/test_source_tool_scope.py` keeps them (and, in section "Formatter", one sentence that the same test keeps the Prettier patterns and the LF rules); two files added to *Where in code*.

## Where the new test sits and why

A new file, not `test_quality_invariants.py`. Each test of `test_quality_invariants.py` runs one pinned tool over the whole repository and reads its exit code; the new tests compare what three tools do with the files of the part map, and they need a helper script and the part-map reader. The exemplar of the task (`tests/quality/test_node_test_selection.py`, D-83) is a file of its own for the same reason. The new file imports `PRETTIER_PATTERNS` and `PRETTIER_FLAGS` from `test_quality_invariants.py`, so the patterns stay in one place. Rejected: the new tests inside `test_quality_invariants.py` — one class of two kinds of test, and a file that would import the part-map reader and run a helper. Cost if wrong: moving the tests later is a rename of one file.

## Foundation step (entries written)

I read the templates of the decisions and invariants elements, `rules.md`, `way_of_working.md`, both skills and `foundation_step.md`, and wrote the edits in place by their rules (no new entry: both rows change entries that already answer the question; the search of the foundation found no entry stating the same settlement elsewhere). `foundation_check.py` passes with 0 errors and without `--skip-test-citations`.

| Entry | Row | Meaning in English | Znaczenie po polsku |
|---|---|---|---|
| D-29 | row 1 and row 2 | ESLint's D-29 sets apply to every TS/JS file of browser-view, simulation, account-server, build-tools and deployment; a test, not review, keeps the file patterns to that scope by asking ESLint what each file receives and comparing it with the published sets, and review keeps the rules. | Zestawy reguł D-29 obejmują każdy plik TS/JS pięciu części łącznie z deployment; wzorce plików trzyma przy zakresie test, który pyta ESLint o reguły każdego pliku i porównuje je z zestawami samych bibliotek, a reguły zostają przy przeglądzie. |
| D-32 | row 1 and row 2 | Prettier's check applies to every TS/JS file of the same five parts plus browser HTML and CSS; a test keeps the check's patterns and the LF attributes to the TS/JS of the scope by asking Prettier and git; `prettier-ignore` stays with review. | Kontrola Prettiera obejmuje pliki TS/JS tych samych pięciu części i HTML/CSS widoku; wzorce i atrybuty LF dla TS/JS trzyma test, który pyta Prettiera i gita; komentarze `prettier-ignore` zostają przy przeglądzie. |
| `eslint-source-rules` | row 3 | Every TS/JS file of the five parts, by the part map, receives the published rule sets from the configuration and breaks none and carries no inline directive. | Każdy plik TS/JS pięciu części według mapy części dostaje z konfiguracji opublikowane zestawy reguł, nie łamie żadnej i nie ma komentarza konfiguracyjnego. |
| `prettier-source-format` | row 3 | Every TS/JS file of the five parts, by the part map, is matched by the test's patterns and kept at LF by `.gitattributes`, and every matched file stands as Prettier leaves it. | Każdy plik TS/JS pięciu części według mapy części pasuje do wzorców testu, ma LF w `.gitattributes`, a każdy dopasowany plik stoi tak, jak zostawia go Prettier. |

Details of the edits. D-29: sentence 1 and *Scope* take deployment; sentence 2 now reads "a test keeps its file patterns to that scope … and review keeps its rules to those sets"; *Rationale* gains the reason (review alone does not keep a list of patterns complete; the tool's own sets, never a list in the product); *Rejected* keeps the existing frozen-rule-list way and gains the three ways of the rows' sources (four parts only, the whole repository, patterns by review alone). *Verification* is unchanged on purpose: `invariants: eslint-source-rules` plus the existing pair of examples still hold under the new wording (the complies example, a new directory's pattern added to the configuration, is exactly what the test now demands). D-32: sentence 1 takes deployment (its *Scope* already had it), the "review keeps the check's file patterns" clause moves to the test, `prettier-ignore` stays with review; *Rationale* and *Rejected* as for D-29; *Verification* unchanged. `eslint-source-rules`: sentence as above; *Part* now includes deployment. `prettier-source-format`: sentence as above; *Part* already had the five parts. *Derives from*, *Rests on*, *Method* (`test`) and *Violated* (`no`) unchanged in both.

The wording of the *Rejected* additions is the writer's; the ways come from the *Not chosen* of question 1 and the variant a of F-9 as the task's rows keep them.

## Checks (command, exit code)

All from the worktree root.

- Acceptance, before (config of the base plus the new test; the working tree then equalled commit `006e5e40`): `python -B scripts/test.py tests/quality/test_source_tool_scope.py` → exit 1. Three of the four tests fail, each naming exactly these ten files and no other: `tests/account-api.test.mjs`, `tests/account-backup.test.mjs`, `tests/account-database-check-standin.mjs`, `tests/account-database-check.test.mjs`, `tests/account-mail.test.mjs`, `tests/account-storage.test.mjs`, `tests/deploy/restore-trial-docker-standin.mjs`, `tests/password-measurement.test.mjs`, `tests/passwords.test.mjs`, `tests/transport.test.mjs`. ESLint test: "64 rules unmet" for each; LF test and Prettier test: listed. Output kept in `.runs/before.txt` (not committed). How the "before" state was made: the test was written and run before any configuration change, then committed alone (commit 1) before the configuration commit. The control test passed in that run (`.FFF`).
- After (HEAD `8d211cbe`): same command → exit 0, 4 tests OK in about 6 s.
- `python -B scripts/test.py tests/quality/test_quality_invariants.py` → exit 0 (5 tests, 29 s): ESLint on `.` with `--max-warnings 0`, Prettier on `PRETTIER_PATTERNS`, Ruff, ShellCheck, audit all pass after the change.
- `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the ten files → exit 0.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the ten files → exit 0. `git ls-files --eol` on them: `i/lf w/lf attr/text eol=lf`.
- `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache .` → exit 0.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors" (no `--skip-test-citations`).
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` → exit 0 (the new Python file imports `loop2_invariant_support` from `test-helpers`, which D-351 allows for files under `tests/`).
- Not run: the full `npm test` (the orchestrator's); `tests/quality/test_node_test_selection.py` (I did not touch it or add a `*.test.mjs` file).

## Own-work check

The requirement I judged most likely unmet: that the new test stops the gate for a *new* file or a *weakened rule*, not only for today's ten files (the acceptance run proves only those). Check: two temporary mutations on the finished configuration, both restored before committing. (1) A new file `deploy/mutant.mjs` (part deployment) plus `{ files: ["src/server/**/*.ts"], rules: { "@typescript-eslint/no-floating-promises": "off" } }` added to `eslint.config.mjs`: `python -B scripts/test.py tests/quality/test_source_tool_scope.py` → exit 1; the ESLint test named `deploy/mutant.mjs` (64 rules unmet) and all 15 `src/server/*.ts` files (1 rule unmet, `@typescript-eslint/no-floating-promises`); the Prettier test named `deploy/mutant.mjs`; the LF test passed for it (`deploy/** text eol=lf` covers it, correct). (2) After restoring: the same command → exit 0. `git status` clean afterwards.

Mutations considered by head and covered: a pattern dropped from `PRETTIER_PATTERNS` (Prettier test, shown by the acceptance run), a `.gitattributes` line dropped (LF test, same), a rule off or at warning (control test and mutation 1), a part-map change (the files come from `file_owners`, so a file moved between parts changes the scope).

Not caught, by design: a rule added in the configuration beyond the sets, or options changed on a rule the sets do not give (the test requires that the sets' rules arrive; D-29 leaves extra rules and the rule sets to review and to a human-accepted change). The `noInlineConfig` setting and the suppressions file stay with the existing ESLint run.

## Reach beyond the dispatch

- `.the-way/elements/decisions/template.md`, `decisions/skill/{SKILL,read,decide_entry}.md`, `invariants/template.md`, `invariants/skill/{SKILL,decide_entry,draft,write}.md`, `common/rules.md`, `common/way_of_working.md`, `task-cycle/skill/foundation_step.md`: read whole, as the foundation step and the skills of the elements require.
- `foundations/decisions.md` lines 6030–6058 (D-267, the decision that says it reopens D-29 and derives from it): read to see whether the changed D-29 wording touches it; it does not. Found by `git grep D-29`.
- `foundations/invariants.md` withdrawn row `eslint-configuration-rules` and `README.md` line 60 (found by `git grep eslint`): see Problems.
- `tests/invariants/test_cross_part_imports.py` (docstring) and the first 140 lines of `loop2_invariant_support.py`: the helper `file_owners`, as the handoff names it.
- `tests/quality/gate_fixture.py`, `scripts/test.py`, `.the-way/gate/run_tests.py` (head): to know how a new test file is discovered and how its imports resolve.
- `.gitignore`, `ruff.toml` (head): the Prettier probe copies `.gitignore`; I checked that Ruff does not select E402 before writing the imports without `noqa`.
- Global rules of the author's instructions read before scripts and commits: `scripts.md`, `git.md` (outside the repository).

## Unread material

- `foundations/part_map.md`: read whole. `guidelines/coding.md` and `guidelines/testing.md`: read whole. D-28, D-29, D-32, D-83 and the invariants `eslint-source-rules`, `prettier-source-format`, `node-test-selection`: read whole.
- `tests/invariants/loop2_invariant_support.py`: read lines 1–140 only (the module docstring, constants, `listed_files`, `file_owners`), not the process helpers below.
- `tests/invariants/test_cross_part_imports.py`: read the docstring and the first 80 lines.
- `D-30`, `D-31`, `D-33` were read (the neighbours of D-29 and D-32); D-83's neighbour D-84 read by its heading only.
- Otherwise none.

## Searches not found or unclear

- None unresolved. The task's list of ten files agrees with the tree: the test names exactly those ten and no other (reconciled against base `aa0ecd09`; the eight commits after `fc00c406` do not touch them). The count of the scope, 229 files, and the six play-skill scripts of the part agent-workflow outside it, are as the task says.
- The *Source* of row 2 names `the author's note of the review of the foundation of 2026-11-13` (variant a/b of F-9) in the author's notes; I did not have that note, so the *Rejected* wording for "patterns kept by review alone" rests on the task's own text of row 2 ("wariant a: wpisy zostawić, poprawić kod — zostawia nowy plik spoza wzorców bez sygnału") and *Decisions in play* (D-83's *Rejected*).

## Choices, with the way rejected and its cost if wrong

- **`tests` as one directory in all three places** (ESLint `directories`, `PRETTIER_PATTERNS`, `.gitattributes`) instead of listing the nine files and `tests/deploy/**`. The human's answer says "cały katalog `tests/` bez wyjątku". Rejected: nine names plus `tests/deploy/**` — every new file in `tests/` root would need a pattern edit, a new subdirectory would again be a gap. Cost if wrong: TS/JS files under `tests/agent_workflow` or `tests/invariants` (other parts) would be linted and formatted as well; no such file exists today, and being stricter is harmless.
- **Expected rules from a second ESLint instance, not from `js.configs.recommended.rules` directly.** ESLint fills default options into each rule (for example `getter-return` arrives as `[2, {allowImplicit: false}]`), so a direct comparison with the bare sets false-fails on 23 to 27 rules of every correct file; I saw it fail that way first. Asking ESLint to resolve the published sets for the same file gives the same shape, and it also tells which sets reach which file by the tool's own `files` matching. Rejected: stripping options or comparing severity only — drops the check of options. Cost if wrong: a future ESLint that changes how it resolves an `overrideConfig` with `overrideConfigFile: true` would break the helper loudly (it prints nothing and exits non-zero), never silently.
- **Prettier probe on made-up files**, not `--list-different` on the real files (it lists only files that differ, so formatted files would look unreached) and not a re-implementation of fast-glob. Cost if wrong: Prettier changing the wording of its report line (`[warn] <path>`) makes the test fail for all files, not pass.
- The probe runs Prettier with `NO_COLOR=1` and `FORCE_COLOR` removed: on this computer `COLORTERM=truecolor` makes Prettier colour its report even through a pipe, which broke the parsing (found by the first run).
- `unmet_rules` treats a rule the sets turn off as satisfied by "off or absent" in the configuration; a rule the sets enable needs identical severity and options.
- **The failing test is committed first** (commit 1 is red). Alternative, one commit, would have lost the seen-failing record in the history; the record is also in this report.
- The check that the scope is not empty (`assertTrue(paths)`) guards the test against a part-map reader that finds nothing.

## Problems observed

- `foundations/invariants.md`, the withdrawn row `eslint-configuration-rules`, says "no cheap test checks that `eslint.config.mjs` keeps to D-29 … the review of each change to that configuration compares it with D-29". A withdrawn row is history and names none of the entries I changed; it is now only partly true (the scope of the patterns is checked by a test, the rules by review). I left it unchanged; the human may want it reworded or left.
- `README.md` (line 60) says "ESLint obejmuje również nowe pliki TS/JS w katalogach wskazanych w jego konfiguracji". It stays true; it does not mention the new test. Not touched (not in the task).
- The `tests/{sim,view}/**/*.{WEB}` Prettier pattern now overlaps with `tests/**/*.{SCRIPT}` for scripts. Harmless; kept for HTML and CSS.
- The ESLint part of the new test takes about 5 s (two ESLint instances, `calculateConfigForFile` for 229 files, the typed programs of `eslint.config.mjs` are built once); the whole file runs in about 6 s.
