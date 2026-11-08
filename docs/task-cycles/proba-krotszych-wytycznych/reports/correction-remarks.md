# Remarks of the human on request #68 (relayed), 2026-11-08

Source: a message from the Claude session `loop2-e5` to this session, which says it showed Mariusz a
table with a recommendation at each of the request's seven items and that he answered „tak, przekaż”
to the question whether it should pass to the cycle the recommendations „przywrócić 2b, 4 i 5, a resztę
przyjąć”. The attribution to Mariusz is that session's; this session could not verify it, and the
request asks him to confirm it. The answers, as relayed:

1. The ten sentences on which the readers differed: stay unchanged.
2a. The note that Ruff skips a script with no extension: removal accepted.
2b. The remark that the file patterns of ESLint must cover every directory with code, so a new
    directory needs its pattern: **put back**.
2c. The description of the browser's last-resort handler: removal accepted.
3. The new and reworded words: accepted.
4. The reading of D-28 („retain the stated deferrals”): **put back** the two sentences about deferred
   formatting and deferred exemplars. Reason given: two lines close the dispute about the reading of the
   decision.
5. The sentence on the browser console and Bash text: **put back**.
6. Merge after 2b, 4 and 5 are done.
7. Do not make a task of a sturdier trial now; the task of the-way will settle it at its question 2.

# What the correction does

Restores in `guidelines/coding.md` on the branch `task/proba-krotszych-wytycznych` (one new commit):

- 2b: the part of the removed sentence S019 that says the file patterns cover every code directory.
  S019 reads in full „Konfiguracja nie ustawia własnych reguł, ignoruje tylko zależności, pliki
  wygenerowane, submoduł i wyniki tymczasowe, a jej wzorce plików obejmują każdy katalog z kodem
  tych części.”; the remark to restore is its last clause. Restore it with as little change of other
  words as the surrounding sentences allow (the antecedent of „Konfiguracja” and the wording of the
  sentence that follows, which the earlier fix reworded, are yours to settle in a way that keeps what
  the remark says).
- 4: S104 and S105, word for word („Automatyczne formatowanie Python i Bash pozostaje odłożone.” and
  „Osobne wzorce budowania, wdrożenia, punktów uruchomienia, HTML i CSS również są odłożone.”, as they
  stood in the base file at `df0f125`, in their paragraph).
- 5: S059, word for word („W konsoli przeglądarki wiersz jest zwykłym tekstem, a skrypty Bash zostają
  przy swoim tekście.”), in its place in the rule *Identifiers in log lines*.
