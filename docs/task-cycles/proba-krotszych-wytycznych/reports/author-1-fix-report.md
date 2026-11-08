# Fix of the Minor findings 1-7 (main change)

**Status:** done
**Commit:** `406f0af` on `task/proba-krotszych-wytycznych` (one new commit on top of `aa03c01`; only `guidelines/coding.md` changed; the trial worktree was not touched).
**wc -l guidelines/coding.md:** 302 after (301 at `aa03c01`, 361 on the base).

## Per finding

| # | What I did | Why |
|---|---|---|
| 1 | Restored S051 in `### Recording a failure`, word for word, between the sentence on `installLastResort` and the sentence on `deploy/loop2-deploy` | The decision's instruction to the author of a script that touches no account data (default print suffices; a handler of its own is a violation, D-253) would otherwise stand only in the decision. Checked: the restored sentence occurs once in the base text and once in the new text, character for character (after joining lines). |
| 2 | Replaced the kept paragraph (S037, S038) by one sentence: "Audyt porównuje plik blokady ze stanem z `{fork-point}` i oblewa każde ostrzeżenie od poziomu low, którego tam nie było; plik taki sam jak w `{fork-point}` przechodzi bez sieci." | Three lines instead of six, no `npm 12.2.1`, no command, no registry. It stays a true "how to apply" for the form (template block, WAY-168). True against D-33: it compares the lockfile with its version at `{fork-point}`, fails on an advisory of at least low severity not present there, and passes without a network request when the lockfile is equal. It is new text of mine, not a sentence of the classification; `{fork-point}` is the placeholder the rule's own Good and Bad lines already use. The trial file keeps S037/S038 as before (you said to leave it). |
| 3 | (a) S020 now reads "Przegląd każdej zmiany `eslint.config.mjs` pilnuje według D-29 zestawów reguł i zakresu plików." (b) "Test wymienia skrypty po nazwie" became "Test `shellcheck-source-rules` wymienia skrypty po nazwie" (the invariant id of the field above). "Zmiana zestawu wymaga" became "Zmiana zestawu reguł ESLint, Ruffa albo ShellChecka wymaga". "Wersje narzędzi przypinają" became "Wersje ESLint, Ruffa i ShellChecka przypinają". | The file name replaces the ambiguous "jej"; "zestawów reguł" is D-29's own "those sets". The other three additions are the smallest words that name the antecedents (the invariant id, and the three tools of D-29, D-30, D-31, which the `Decision` field names). Rest of each sentence unchanged. S020, S026, S030, S031 are `keep` sentences, so each is changed only by the inserted words. |
| 4 | Nothing | Residual only. Restoring the author's action about a new code directory would restore removed text (S019); no shorter faithful form exists that is not also a new rule. It stands in D-29's Verification. |
| 5 | Nothing | Residual only. A sentence on extensionless Python would restore S024 or add a new one; no extensionless Python script exists (the tracked files without an extension are `Dockerfile`, `deploy/loop2-backup`, `deploy/loop2-deploy`, the last two `#!/bin/bash`). |
| 6 | Nothing | Residual only. The only way to put the browser handler back in `coding.md` is to restore S053 or write a pointer to `coding-browser-module.md`; a pointer is a new sentence the classification does not give, and for a file outside `src/browser/view/` the cost is the one the finding names. Left for the human. |
| 7 | Reflowed the paragraph in `### Identifiers in log lines` (cosmetic, done). The heading `### Odłożone rodzaje i formatowanie` unchanged | A faithful fix of the heading does not exist: the handoff and the classification keep headings, and a rename changes an example's name for a sentence the classifiers disagree on. S107 stays under it. |

## Checks

| Command | Exit code |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (in `the worktree of the task`) | 0, "0 errors" |

Not run: any `npm test` (no test reads `guidelines/coding.md`; the full gate is the orchestrator's).

## Own-work check

- Requirement most likely not met: a restored or changed sentence says something the decision does not, or a kept sentence changed beyond its antecedent.
- Check: (1) the restored S051 compared with the base text as a string, 1 hit in each; (2) the new audit sentence read against D-33 clause by clause (comparison with `{fork-point}`, low and above, equal lockfile passes without network); (3) the three tools named in the Linter text against the `Decision` and `Invariant` fields (`D-29 · D-30 · D-31`; `eslint-source-rules · ruff-source-rules · shellcheck-source-rules`) and against D-29 ("those sets"); (4) the sentence of S026 after "Test `shellcheck-source-rules` wymienia skrypty po nazwie:" still occurs word for word in the base after the inserted id.
- Showed: all four hold. Not checked: whether the human accepts a new sentence in place of S037/S038 (finding 2 left that choice to the author).

## Searches not found or unclear

- None new. The sentence of finding 2 is mine, not from the classification; the review should read it as new text, not as a kept unit.
