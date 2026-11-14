# Return step report — zasieg-lintera-i-formatera

**Status:** done. **Commits:** none — nothing needed correcting. The worktree is clean at `f9263c07`.

I read `task-cycle/skill/return_step.md` and `foundation_step.md` whole, the task, my `author-report.md` and `fix-report.md`, and the two review reports (by search for their foundation remarks; their findings are no entries and I wrote none for them).

## Return step

- **Foundation compared with code:** none of the entries no longer matches the code at `f9263c07`. Compared one by one:
  - D-29: binding sentences (five parts; a test keeps the file patterns by asking ESLint what each file receives and comparing it with the published sets; review keeps the rules), *Scope* (includes deployment), *Verification* (`eslint-source-rules` plus the pair) against `tests/quality/test_source_tool_scope.py`, `tests/quality/eslint-rule-sets.mjs` and `eslint.config.mjs` (`directories` = `src/browser`, `src/server`, `scripts`, `tests`): match.
  - D-32: five parts, "a test keeps the check's file patterns and those attributes to the TS/JS of that scope, asking Prettier which files its patterns check and git which line ending each file gets" against the Prettier probe and the `git check-attr text eol` test. Since the fix the LF test also requires `text` to be `set` or `auto`; "kept at LF" and "asking git which line ending each file gets" still say what is checked, and the attribute lines of `.gitattributes` are `text eol=lf` (so the sentence need not name the `text` attribute). No change.
  - `eslint-source-rules` and `prettier-source-format` (sentence, *Part*, *Method* `test`, *Violated* `no`, *Derives from*, *Rests on*): the sentences say what the tests check ("according to the part map" is what `file_owners` gives; rules received, none broken, no inline directive; patterns reach each file, LF kept, files stand as Prettier leaves them). Both are cited by the new tests and by `test_quality_invariants.py`; `foundation_check.py` passes without `--skip-test-citations`.
  - D-28 ("the general coding quality checks cover all code, tests included") and D-83 (*Rejected*: inclusion by review alone): not changed by the task; the code makes the first more true and uses the second's reason. They match.
  - Entries found by the search of the foundation: D-267 (says it reopens and derives from D-29; the change leaves D-29's rule set untouched) matches; D-30, D-31, D-33 are not touched.
  - Part map, touched parts: `tests/quality/**` (build-tools) claims `tests/quality/test_source_tool_scope.py` and `tests/quality/eslint-rule-sets.mjs`; `tests/deploy/**` and `.gitattributes` (deployment) claim what the scope now reaches there; the descriptions of build-tools ("checks code quality") and deployment need no change; agent-workflow and product-foundation hold the guideline and foundation files I edited (`guidelines/**`, `foundations/**`), unchanged in kind. No count, path or file name in the entries went stale (`git grep` for the ten files, the nine files and the old pattern lists in `foundations`, `guidelines`, `README.md`, `AGENTS.md`: no hit).
  - `guidelines/coding.md`: after the fix it names no list of parts, the test file is in *Where in code*; matches.
  - The two items the handoff asked me to judge:
    - **Withdrawn row `eslint-configuration-rules`** (`foundations/invariants.md`): left as it is. It names none of the entries this change writes, it records why an identifier was withdrawn in the past, and its claim — no cheap test checks that the configuration keeps to D-29, review compares it — is still true for the part it rested on (extra rules, rules turned off beyond the sets' own, options): the new test checks that the published sets reach each scope file, not the whole configuration, and D-29 still keeps the rules with review. Rewriting a withdrawn row is outside the task and would be tidying.
    - **`README.md:60`** ("ESLint obejmuje również nowe pliki TS/JS w katalogach wskazanych w jego konfiguracji"): left as it is. The sentence stays true; the change does not make it false, it only does not mention the new test. The task does not name the README, and a mention would be an addition, not a correction.
- **Decisions written or changed:** D-29 and D-32 (written in the foundation step, as rows 1 and 2 of the task; no change in this step).
- **Invariants written or changed:** `eslint-source-rules` and `prettier-source-format` (row 3 of the task, which sets their rule; written in the foundation step; no change in this step).
- **Environment facts:** none. The test relies on behaviour of the tools — ESLint's `calculateConfigForFile`, Prettier's `[warn] <path>` report line and its colour with `COLORTERM` set, `git check-attr` — but none decides whether a commit makes either invariant's sentence true, so none belongs in *Rests on*; a change in one makes the test fail loudly (shown in the author report), never pass.
- **Glossary terms:** none. The change uses "scope", "part" and "invariant" in the senses of their entries and ordinary English; the glossary holds no entry for "scope" and none was needed.
- **Part-map changes:** none.
- **Projected entries written whole or in part:** none (the task has no projected entries).
- **Rows of *Settlements to record* written:** row 1 — D-29 and D-32 (scope with deployment; *Rejected* holds the three not-chosen ways); row 2 — D-29 and D-32 (file patterns and LF attributes kept by a test, rules and `prettier-ignore` by review; the test asks the tools and compares with the published sets); row 3 — `eslint-source-rules` and `prettier-source-format`. All written in the foundation step; each holds against the final code.

## Check
`python -B .the-way/elements/common/foundation_check.py` from the worktree root, without `--skip-test-citations` → exit 0, "0 errors". Not run: the full `npm test` (the orchestrator's).

## Unread material
- The review reports `review-whole-report.md` and `review-fix-report.md`: not read whole; I searched them for remarks on the foundation, the part map, the glossary and environment facts, and read the hits (lines about the withdrawn row, the part map, `file_owners` and unclaimed files). Their findings are no foundation entries.
- `foundations/glossary.md`: not read whole; searched for an entry on "scope", "published" and "part" (none).
- Otherwise none; the entries and files of the comparison were read as they stand in earlier steps and re-read where quoted above.

## Searches not found or unclear
none
