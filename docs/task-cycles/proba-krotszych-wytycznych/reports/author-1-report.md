# Report of the one author: the shortened `guidelines/coding.md`, in two places

**Status:** done with concerns (the concerns are the sentences kept against the table, the adaptations and the doubtful removals below; none needs an answer before review, so not `questions`).

## Commits

| Worktree | Branch | Commit | Files | wc -l before -> after |
|---|---|---|---|---|
| `the worktree of the task` (main change) | `task/proba-krotszych-wytycznych` | `aa03c01` | `guidelines/coding.md` (+11 -71) | 361 -> 301 |
| `the worktree of the trial file branch` (trial file, never merged) | `trial/shorter-coding` | `7f38c44` | `guidelines/coding.md` (+24 -130) | 361 -> 255 |

Nothing else changed in either worktree. Committed with `git add guidelines/coding.md`; author address `mariusznn@gmail.com` (checked with `git log --format=%ae`).

## Checks (command and exit code)

Run in each worktree from its root.

| Check | Main change | Trial file |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" (before and after the edit) | exit 0, "0 errors" (before and after the edit) |
| `git -C .the-way rev-parse HEAD` vs `git ls-files --stage -- .the-way` | both `294af7fde45323ac1851c014a03071a97fc38d96` | the same |
| test files that read `guidelines/coding.md` or the directory `guidelines/` | none found (see "Searches") | none found |
| `npm test -- <file>` | not run: no test file reads the file, so there is no file to name | not run, same reason |
| full `npm test` | not run, as the handoff says (the orchestrator runs the gate) | not run |

Known failures of the base (`test_ruff_source_rules`, `test_shellcheck_source_rules`) were not touched and not run.

One-line result: `foundation_check.py` passes in both worktrees; no test reads the file, so no `npm test -- <file>` was run; the full gate is left to the orchestrator.

## Own-work check (section 3 of the method)

- Requirement most likely not met: "a removal loses nothing the reader needs" (a removed sentence whose fact stands nowhere else, or a kept sentence left with a missing antecedent).
- Check: for each sentence removed on main I grepped the key phrase in the text of D-28..D-33 and D-253 of `foundations/decisions.md` (`noInlineConfig`, `suppressions`, `--ignore-noqa`, "393 rules", `.pyi`, "extensionless", "YAML or test literals", "message", "Windows", `prettier-ignore`, "info does not block", "nested npm", "scheduled threshold", "package names and versions", "full-compliance", "compared before", `guidelines/testing.md`, "stylesheet", "explicit-time"): every phrase is found (counts 1-3). For the browser sentence S053 the file path and the function are in `guidelines/coding-browser-module.md:47` and `:323`. I then re-read each paragraph that a removal cut for dangling words ("Tego", "niego", "robi to", "własną", "też"). It found two dangling references (S020 "Tego", S034b "niego"), fixed as adaptations below, and one lost pointer (D-28), fixed by keeping S003.
- It did not check: whether Mariusz agrees that a decision "carries" a sentence (that is the review's and the human's call).

## Main change: units changed

All removals below were also checked against "no other file refers to the sentence": `grep` of `coding.md` over `tests/`, `scripts/`, `deploy/`, `src/`, `foundations/`, `guidelines/`, `AGENTS.md`, `src/browser/AGENTS.md` found references only in `AGENTS.md:7` (the path, in a "read this" line) and `guidelines/testing.md:9` and `:400` (the path). No heading of any rule was removed. The only comment that names a rule of the file is `tests/http.test.mjs:4174` ("The guidelines' rule on recording a failure: a refusal is an answer"); S046, the sentence that says it, is kept on main.

| id | action done | evidence |
|---|---|---|
| S016, S017 | removed | D-29: ESLint 10.12.0, `eslint.config.mjs`, @eslint/js 10.0.1, typescript-eslint 8.71.2, globals 17.13.0, API 6.0.2, "application compilation stays on TypeScript 7" |
| S018 | removed | D-29: `noInlineConfig`, `--max-warnings 0`, "an inline configuration comment fails the check"; the rule's Bad line and S029 carry the action |
| S021 | removed | D-29: "an empty bulk-suppressions file of its own" |
| S022, S023 | removed | D-30: Ruff 0.17.1, `--config ruff.toml --ignore-noqa`, 393 rules, the fourteen examples, "no suppression comment takes effect" |
| S024 | removed | D-30: "Every `.py` and `.pyi` file Ruff finds" (the extensionless Python gap is a consequence of that wording; see doubtful list) |
| S025 | removed | D-31: pinned ShellCheck 0.11.0, flags, "extensionless scripts included", "no example-only rules" |
| S028 | removed | D-31: "Embedded commands in YAML or test literals are outside" |
| S032, S033, S035 | removed | D-32: Prettier 3.9.10, flags, defaults, "no ignore file of its own", "narrow repository attributes preserve LF" |
| S034a | removed | D-32: "The editor's `prettier.config.mjs` sets no option" |
| S036 | removed | D-32: excluded kinds, "review keeps ... `prettier-ignore` comments out", Rejected "Per-file historic exceptions" |
| S040, S041, S042, S043, S044 | removed | D-33 (and its Rationale for S041): failed request fails, new advisory changes the result, no scheduled review, names and versions only, exclusions |
| S039 | removed | D-33: coverage sentence |
| S051, S052 | removed | D-253: the third binding sentence and the named four scripts, almost word for word |
| S053 (a and b) | removed | D-253 second binding sentence; `src/browser/view/last-resort.ts` and `installLastResort` stand in `guidelines/coding-browser-module.md:47` and `:323` |
| S059 | removed | D-252: "Bash scripts keep their own text and a line in the browser's console is plain text" |
| S098 | removed | D-30 "no suppression comment takes effect"; the rule's Bad line; S029 |
| S102 | removed | D-28 last sentence names `guidelines/testing.md`; `AGENTS.md:9` also sends test authors there |
| S103, S104, S105, S108, S109, S110 | removed | D-28 body, each clause |
| S106 | removed | D-28 (no stylesheet exemplar) and its Rationale; `AGENTS.md` sends browser-view work to `guidelines/styleguide-browser-view.md` |

## Main change: units where I did not do what the table says

| id | table says | what I did | why |
|---|---|---|---|
| S003 | remove | kept | It is the only pointer from the file to D-28. After S102-S110 also go, no text of `coding.md` names D-28 (checked: `grep -c D-28` would be 0). WAY-169 has the author of a change to D-28 find the guidelines by the identifier, so with S003 gone a change to D-28 cannot find this file. The fact (the file's link to its adopting decision) stands nowhere else. A finding for the human. |
| S037, S038 | remove | kept (both; S038 begins "W przeciwnym razie", so S037 must stay with it) | Removing S037-S044 leaves `### Dependency audit` with only its four field lines. The form block of `product-guidelines/template.md` puts "how to apply the rule: what to do, and how" after the fields, and WAY-168 says a rule "says what to do and how". `foundation_check.py` reads no body text (see "Searches"), so this is a judgement on the form, not on a check. The two sentences are the shortest standing description of how a change meets the rule. Cost if wrong: 6 lines stay that D-33 also holds. The alternative is a bodyless rule, which the human may choose. |

The only deviations on main are S003 and S037/S038.

## Main change: adaptations of kept sentences (the wording changed)

| id | old | new | why |
|---|---|---|---|
| S020 (kept) | "Tego pilnuje przegląd każdej zmiany konfiguracji według D-29." | "Przegląd każdej zmiany konfiguracji ESLint pilnuje według D-29 jej reguł i zakresu plików." | "Tego" pointed at S016-S019, all removed. The new words are D-29's own ("keeps its rules to those sets and its file patterns to that scope"). A sentence marked `keep` is thus not word for word; the alternative of keeping S019 as antecedent fails because S019 itself opens with "Konfiguracja", which then has none. |
| S034b (kept) | "nie dodawaj do niego opcji." | "Nie dodawaj opcji do `prettier.config.mjs`." | "niego" pointed at `prettier.config.mjs`, named in S034a (removed). |

## Trial file: units changed

Same sentence-level evidence as for main where the action is the same; only the differences and the extra units are listed.

| id | action done | evidence |
|---|---|---|
| S016-S019, S021-S025, S028, S032-S033, S034a, S035-S036, S039-S044, S051-S053, S059, S098, S102-S106, S108-S110 | removed | as in the main table |
| S031 | removed | D-29..D-33 "local pinned"; template `coding/template.md` "Pinned versions" bullet; `## Where in code` lists the declarations |
| S046 | removed | template `coding/template.md`: "an expected refusal, such as a wrong password, is an ordinary answer, which the rule does not reach"; S045 (kept) still says "z powodu innego niż spodziewana odmowa". The comment `tests/http.test.mjs:4174` names the rule; it is a comment, not a check |
| S060, S061 | removed | template, "Identifiers in log lines": a line outside a case flow carries none; the last-resort line need carry none |
| S064b | removed | template, "Secrets and personal data": "an identifier that is a secret stays out even where it stands on the list" |
| S084, S085 | removed | D-252 last sentence; template, "Logging scope" |
| S086-S101 (all sixteen sentences of Examples) | removed | D-30 names the fourteen rules; headings `### PLW1510` ... `### SIM102` stay, with no text under them |
| S047 | replaced by name | "Error cause chaining", "log once, at the point that handles it (no log-and-rethrow)" (the classifiers' proposals, in quotes in Polish text) |
| S049 | replaced by name | "Obsługa ostatniej szansy („last-resort handler”, D-253)." The Polish noun kept so that "mają własną" in S050 still has its antecedent; the pointer `(D-253)` kept because it was in the sentence and `foundation_check.py` reads decision numbers |
| S055 | replaced by name | "„Fail loudly”." |
| S064a | replaced by name | "„Never log secrets”." |
| S065a | replaced by name | "„No personal data in logs”;" followed by S065b, kept ("jedynym wyjątkiem od tego zakazu ..."), which now reads "this ban" about the quoted name |

Adaptations of kept sentences: S020 and S034b exactly as for main. Nothing else.

## Trial file: units where I did not do what the table says

| id | table says | what I did | why |
|---|---|---|---|
| S003 | remove | kept | Same reason as on main (the only pointer to D-28 in the file; traceability, not a measured behaviour). |
| S037, S038 | remove | kept | Same reason as on main (the form block: the rule keeps its "how to apply" text). The trial tasks do not touch the dependency audit, so this cannot change the measurement. |

The fact standing in a template of the-way was used as sufficient only for S046, S060, S061, S064b, S084, S085 (all in the trial table; for main the table keeps them). Every other trial removal rests on a decision, as on main.

## Removals I hold doubtful (sentence quoted whole; I did not keep them, because the evidence below says the claim holds, but a reader may judge otherwise)

None of the removals made is one I hold false. Three are the weakest, listed so the human may overrule:

1. S024, both files: "Ruff sprawdza pliki `.py` i `.pyi`; skrypt Pythona bez rozszerzenia pomija." D-30 says "Every `.py` and `.pyi` file Ruff finds", which carries the scope, but only by wording; "an extensionless Python script is not checked" is a consequence a reader must draw. Searched: the tracked files with no extension are `.the-way`, `Dockerfile`, `deploy/loop2-backup` and `deploy/loop2-deploy`; the last two start with `#!/bin/bash`, so no extensionless Python script exists today.
2. S019, both files: "Konfiguracja nie ustawia własnych reguł, ignoruje tylko zależności, pliki wygenerowane, submoduł i wyniki tymczasowe, a jej wzorce plików obejmują każdy katalog z kodem tych części." The author-facing consequence (adding a code directory means adding its pattern to `eslint.config.mjs`) stands only in D-29's Verification ("complies: a change to `eslint.config.mjs` that adds the file pattern of a new directory"), not in its binding sentence, which says only that review keeps the patterns to the scope.
3. S053 (both files): "Przeglądarka też ją ma: `installLastResort` z `src/browser/view/last-resort.ts` anuluje zdarzenie błędu, którego nic nie obsłużyło, i zapisuje w konsoli zwykłym tekstem jeden wiersz z rodzajem, kodem i miejscem obsługi, bez treści i stosu błędu, ten sam wiersz raz do odświeżenia strony." The behaviour is D-253's; the path and the function are in `coding-browser-module.md`, which an agent reads only when it touches a browser-view module. An agent that writes browser code outside a module of that kind would not see the pointer.

For the trial file, additionally: the replacements by name lose the details of the sentence (for S064a the words "bez wyjątku"; the exception for list identifiers is still S065b's). The claim there is that D-252 adopts the template's rules whole, so the template carries what the name does not.

## Foundation entries

None written. I do not think one is needed. If the human decides to keep S003 and S037/S038 out (the classification), no entry is touched either.

## Choices (the way rejected and its cost if wrong)

- Kept S003 and S037/S038 (above). Rejected: removing them as tabled. Cost if wrong: 8 lines more in each file than the classification gives.
- Reworded S020 and S034b minimally. Rejected: leaving them word for word with a dangling "Tego" and "niego". Cost if wrong: a `keep` is no longer a byte-for-byte keep for two sentences; the measurement of the trial file is not affected (neither sentence is on a trial rule).
- Left the headings of the sixteen example sections with no text on the trial file. Rejected: keeping one line each. Cost if wrong: none for main (not done there); on the trial file the form block is still met, since an example under `## Examples` needs no field.
- On main, the heading `### Odłożone rodzaje i formatowanie` (under `## Examples`) now holds one sentence (S107). Rejected: removing S107 (the table keeps it: the classifiers differ) or the heading (headings stay).

## Reaches beyond the dispatch

- `grep` of `coding.md`, `D-28`, `Logging scope`, `Recording a failure` and the other rule names over the whole repository to find references (the handoff names this check).
- `foundations/decisions.md`: D-28, D-29, D-30, D-31, D-32, D-33, D-252, D-253, each read whole to check the removals (the handoff names the check; the dispatch did not give the entries).
- `.the-way/foundations/decisions.md`: WAY-168, WAY-169, WAY-171, WAY-172, each whole, for the form and the meaning-change question.
- `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md`, whole, for the form of the file.
- `guidelines/coding-browser-module.md:40-50` and `:318-330`, to check where the browser handler is described.
- `the author's rule on git` before the commits (the global instructions name it).

## Searches not found or unclear

- No test file reads `guidelines/coding.md` or the directory `guidelines/`. Searched: `grep -rIn 'coding\.md\|guidelines[/\\]\|"guidelines"'` over `tests/`, `scripts/`, `deploy/`, `src/`, `.claude/skills/loop2-play`, `.claude/skills/loop2-deploy`. Hits are only comments in `tests/account-storage.test.mjs:2231`, `tests/http.test.mjs:4113` and `:4174`, a docstring in `tests/invariants/test_terrain_drawing_numbers.py:24`, and paths in `src/browser/*`. The handoff says to run each such test file; there is none, so none was run. (A first, wider `grep` for the word `coding` matched `encoding` in dozens of tests; I discarded it.)
- The only check that reads the file is `foundation_check.py`, which reports a decision number, an invariant or a part it does not hold; it does not check that a rule has a body or that a section has text. So the empty-body question for `### Dependency audit` is decided on the text of the form (template block and WAY-168), not on a check; that is unclear and is why S037/S038 are kept.
- Whether `foundation_check.py` accepts a heading under `## Examples` with no text: yes, run on the trial file after the edit, exit 0, "0 errors". Whether it checks a rule's body: I read `check_guidelines` (lines 485-510 of `.the-way/elements/common/foundation_check.py`); it reads only the fields *Applies to* and *Invariant* and fingerprinted references, so it does not.
- The handoff's statement that "the other cases of `tests/quality/test_quality_invariants.py` pass on the base" was not verified (I did not run that file).
- The handoff says units absent from the table are structure; I did not re-read the table of kinds or the `## Where in code` list for changes, and changed none.
