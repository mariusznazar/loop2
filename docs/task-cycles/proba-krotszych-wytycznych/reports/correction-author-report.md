# Correction for the human's remarks (request #68): four restorations

**Status:** done
**Commit:** `6882f83` on `task/proba-krotszych-wytycznych` (on top of `78d71c3`). It changes only `guidelines/coding.md` (+10 -6). Added with `git add guidelines/coding.md`; author address `mariusznn@gmail.com`.
**wc -l guidelines/coding.md after:** 308 (304 at `e1ab9c9`, 361 on the base `df0f125`).

## What I did per restoration

| Remark | Sentence | What I did |
|---|---|---|
| 2b | S019, last clause | Restored the remark that the file patterns cover every directory with code. Reworded, because the rest of S019 stays removed and "tych części" had lost its antecedent (the parts were named in S016, removed). Old (base): "Konfiguracja nie ustawia własnych reguł, ignoruje tylko zależności, pliki wygenerowane, submoduł i wyniki tymczasowe, a jej wzorce plików obejmują każdy katalog z kodem tych części. Tego pilnuje przegląd każdej zmiany konfiguracji według D-29." The text at the head before this commit (my earlier fix): "Przegląd każdej zmiany `eslint.config.mjs` pilnuje według D-29 zestawów reguł i zakresu plików." New: "Wzorce plików `eslint.config.mjs` obejmują każdy katalog z kodem browser-view, simulation, account-server i build-tools. Tego pilnuje przegląd każdej zmiany konfiguracji według D-29." The sentence after it, S020, is back to its base wording word for word ("Tego" now has an antecedent again). The parts named are the ones D-29 names in its scope. The reworded words "zestawów reguł i zakresu plików" of the earlier fix are gone; the remarks accept new wording, and nothing else in the file leans on them. |
| 4 | S104, S105 | Restored word for word, in the paragraph under `### Odłożone rodzaje i formatowanie`, after the pointer to `guidelines/testing.md` (S102) and before S107, which is their order in the base: "Automatyczne formatowanie Python i Bash pozostaje odłożone. Osobne wzorce budowania, wdrożenia, punktów uruchomienia, HTML i CSS również są odłożone." (checked as a string: one hit in the base, one in the file.) |
| 5 | S059 | Restored word for word in `### Identifiers in log lines`, between the sentence on `linkPurpose` and the sentence on a line outside a case flow: "W konsoli przeglądarki wiersz jest zwykłym tekstem, a skrypty Bash zostają przy swoim tekście." (one hit in the base, one in the file.) The paragraph is re-wrapped around it. |

No other sentence was touched. The remarks 1, 2a, 2c, 3, 6, 7 change nothing.

## Checks

| Command | Exit code |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (in `the worktree of the task`, after the edit) | 0, "0 errors" |

String checks (same session, `tr` to join lines, `grep -c -F`): S104+S105 as one passage, S059, the base S020 and the clause "obejmują każdy katalog z kodem": each 1 hit in the base and 1 in the new file. Not run: any `npm test` (no test reads `guidelines/coding.md`).

## Return step again, for what this touches

| Entry | Compared with the file at `6882f83` | Result |
|---|---|---|
| D-28 | Body and *Verification*. The deferrals (formatting of Python and Bash, exemplars for building, deployment, entry points, HTML and CSS) are again stated in the file, and the pointer to `guidelines/testing.md` stands. | Matches under either reading of "retain the stated deferrals". The restored S104 and S105 settle the reading I had chosen in the return report: it no longer matters whether "stated" means stated in the decision or in the guidelines. Nothing to correct. |
| D-29 | Body: "review ... keeps ... its file patterns to that scope", scope browser-view, simulation, account-server, build-tools; *Verification* "complies: a change to `eslint.config.mjs` that adds the file pattern of a new directory". | The file again says the patterns cover every code directory of those parts and that review watches it; the author's action (a pattern for a new directory) follows from it. Matches. Nothing to correct. |
| D-252 | Body: "its Bash scripts keep their own text and a line in the browser's console is plain text". | S059 says the same; it was a repeat, now kept by the human's decision. Matches. Nothing to correct. |

Also compared again: WAY-172. No restoration is a new or changed meaning: S104, S105 and S059 are base sentences word for word; the one reworded clause (S019) names the parts D-29 names. The other entries of the earlier return step (D-30..D-33, D-253, invariants, glossary, environment facts, part map) rest on sentences this commit does not touch; their result stands. Nothing else needs a correction.

Lists: decisions, invariants, environment facts, glossary terms, part-map changes, projected entries, rows of Settlements: none written or changed.

## Searches not found or unclear

- None new. The head `78d71c3` holds no `docs/task-cycles` (as the coordinator said); `git diff e1ab9c9 HEAD --stat` before my edit showed no change to `guidelines/coding.md`, so the file's content was that of `e1ab9c9`.
