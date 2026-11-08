**State: ready** — all six places are corrected, the review found nothing, and nothing below waits for your yes.

## What you will see

The product itself does not change: no screen, no message to the player, no behaviour. The change is in the written-down decisions of the product. Seven small word insertions in six places make each sentence say which meaning it uses, where a reader who also knows the process's vocabulary could take it in the other one. For example, "a full gate refuses immediately" now says "a full password gate refuses immediately", so nobody reads it as the test gate, and "the approved sentence gets an exception" now names the earlier decision whose sentence it means, so nobody takes it for a sentence of its own decision. No other sentence changes, and the qualifiers added earlier under the older wording of the rule stay as they are, as the task says.

### Underneath

The process's rule on its own words in a product's foundation now asks for a qualifier only where a sentence could be read in the other meaning; this request applies that rule to the six places the task listed, and the independent review confirmed that each one reads as the task states.

## For you to decide

none

## Cost

About 17 minutes of working time in four stages — the author, the review of the whole change, the return step and the orchestrator's own work — not counting the two waits for the full test run, about 14 minutes each. About 6.3 million tokens in all, of them 1.7 million on the cheaper model that made the change and the rest on the model that ran the cycle and reviewed it. One review round, which passed with no findings. The table of stages is in the committed record, linked below once it exists.

## How to merge

Merge with a merge commit, not squash and not rebase, because the link to the record of this cycle survives only when the commits are kept.

The foundation has waited for a review through 66 merges since the start of the history, which has no tag of a last review. The review is the skill that reviews the foundation, started in a session in this repository. Nothing in this request waits for it.

<details>
<summary>In your language</summary>

**Stan: gotowe** — wszystkie sześć miejsc jest poprawionych, przegląd nic nie znalazł i nic poniżej nie czeka na Twoje „tak”.

## Co zobaczysz

Sam produkt się nie zmienia: nie ma żadnego ekranu, komunikatu dla gracza ani zmiany działania. Zmiana dotyczy spisanych decyzji produktu. Siedem drobnych dopisków w sześciu miejscach sprawia, że każde zdanie mówi, w którym znaczeniu używa słowa, tam gdzie czytelnik znający też słownictwo procesu mógłby wziąć je w drugim. Na przykład „a full gate refuses immediately” brzmi teraz „a full password gate refuses immediately”, więc nikt nie weźmie tego za bramkę testów, a „the approved sentence gets an exception” wskazuje teraz wcześniejszą decyzję, do której zdania się odnosi, więc nikt nie weźmie tego za zdanie tej samej decyzji. Żadne inne zdanie się nie zmienia, a określenia dopisane wcześniej pod starszym brzmieniem reguły zostają, tak jak mówi zadanie.

### Pod spodem

Reguła procesu o jego własnych słowach w fundamencie produktu każe teraz dopisywać określenie tylko tam, gdzie zdanie dałoby się przeczytać w drugim znaczeniu; ten PR stosuje ją do sześciu miejsc z zadania, a niezależny przegląd potwierdził, że każde czyta się tak, jak zadanie podaje.

## Do rozstrzygnięcia

brak

## Koszt

Około 17 minut czasu pracy w czterech etapach — autor, przegląd całej zmiany, krok powrotny i własna praca koordynatora — nie licząc dwóch oczekiwań na pełny bieg testów, po około 14 minut każde. W sumie około 6,3 mln tokenów, z czego 1,7 mln na tańszym modelu, który wykonał zmianę, a reszta na modelu prowadzącym cykl i recenzującym. Jedna runda przeglądu, zakończona bez uwag. Tabela etapów jest w zatwierdzonym zapisie cyklu, do którego link pojawi się niżej, gdy zapis powstanie.

## Jak scalić

Scal commitem scalającym, bez squasha i bez rebase, bo link do zapisu tego cyklu przetrwa tylko wtedy, gdy commity zostają.

Fundament czeka na przegląd po 66 scaleniach od początku historii, w której nie ma znacznika ostatniego przeglądu. Przeglądem jest skill przeglądu fundamentu, uruchomiony w sesji w tym repozytorium. Nic w tym PR-ze na niego nie czeka.

</details>

## Technical changes

The change is one commit, `20f5ffd`, on the base `331688e`: seven word-level insertions in `foundations/decisions.md`, 7 lines added and 7 removed, and no other file. The six places and the exact wording are the task's *To do* 1–6: D-23 *Verification* ("a sentence of this decision naming…"), D-103 *Verification* and *Rationale* ("a full password gate…", "The measured password gate…"), D-109 *Rejected* ("one more sentence in this decision"), D-120 *Rejected* ("leaving this decision's sentence unchanged"), D-253 binding sentence ("the sentences of this decision above"), D-309 *Rejected* ("the approved sentence of D-308"). The binding sentence of D-103 is untouched. The task's line numbers belong to an earlier main (`01b26d5`); at this base the lines moved by a few, the wording did not, and the author located each place by its wording.

One departure from the process: the author made the edits with the file-editing tool and did not run the steps of the decision-recording skill, which the foundation step asks for. The edits are only inserted words with no change of identifier, link or order; the reviewer accepted this and found it harmless; it is named here so that nobody has to guess it.

## Checks

- Gate: `npm test` on `20f5ffd`, exit 1: 412 tests in four directories; only `tests/quality` fails, with two errors, `test_ruff_source_rules` and `test_shellcheck_source_rules`, both `FileNotFoundError` because `ruff` and `shellcheck` are not installed on the computer that ran the cycle. The same two errors fail on the base `331688e` (`npm test` exit 1 there too); they are an environment gap, not caused by this change. In `tests/deploy` 5 tests were skipped (no Docker daemon) and in `tests/invariants` 3.
- `python -B .the-way/elements/common/foundation_check.py` on `20f5ffd`: exit 0, `0 errors` (the same on the base).
- Own-work check of the author: `git diff --check` reported clean and the author compared every changed sentence with the task; the orchestrator ran `git diff --check 331688e HEAD` again: exit 0. The author's report named the check without its command and exit code, so the orchestrator's run stands as the evidence.
- No user interface is touched, so no state check or screenshot applies.
- Form check, check of private paths on this description, and the two checks on the copy of the record: filled in with the commit of the record.

## Foundation entries

All six are entries that already existed; none is new, none is a row of settlements to record (the task has none) and none is `the cycle's`. Each was accepted with the task document.

- D-23 *Verification* — the sentence about what a kind of condition may take is now marked as a sentence of this decision. Task item 1.
- D-103 *Verification* and *Rationale* — "gate" now reads "password gate" in both places; the binding sentence is unchanged. Task item 6.
- D-109 *Rejected* — "one more sentence here" now reads "in this decision". Task item 2.
- D-120 *Rejected* — "the sentence" now reads "this decision's sentence". Task item 3.
- D-253 binding sentence — "the sentences above" now reads "the sentences of this decision above". Task item 4.
- D-309 *Rejected* — "the approved sentence" now names the sentence of D-308. Task item 5.

No invariant test, surface or *Violated* mark is changed. The return step compared the six entries, the entries that name them, the invariants that derive from D-23, D-103 and D-109 and the part-map entry for the foundation with the change, and found nothing to correct; it settled that WAY-95 requires no glossary entry for "password gate".

## Minor findings

none

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** an independent task to qualify, in six places, a word of the process that a sentence of the foundation could be read in two meanings; sources are the task document accepted 2026-11-08 and the rule WAY-104 at the pinned process commit.
- **Process pin:** `294af7fde45323ac1851c014a03071a97fc38d96`, not moved by this task.
- **Spec:** none, because the task leaves no open design choice: it fixes the six places and their wording, and settles that the list is closed and that earlier qualifiers stay.
- **Route:** one author without a plan, on the cheaper model, because the change is seven word insertions in one file; no discarded attempt.
- **Plan:** none.
- **Choices:** 2 choices, both of how to make the change and invisible to the user: the author locates the places by wording because the task's line numbers moved, and the author's class is the cheaper one. Questions table in the record.
- **Blocking findings left:** none.
- **Record:** the link by the SHA of the commit that adds it is added after that commit exists.
