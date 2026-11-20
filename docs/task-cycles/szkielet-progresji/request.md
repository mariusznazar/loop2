**State: draft** — the final run of the tests on the request has not finished yet; one item below waits for your answer.

## What you will see

The glossary of the game now has a new word, "wall": a map that asks for something new — an item, a spell or another idea of a program — and without it is solved rarely. Nothing in the game changes: no screen, no map and no rule moves. The word is there so that the later tasks of the project, which build the first walls, share one meaning of it.

### Underneath

One entry added at the end of the foundation's glossary, written exactly as the approved project definition projects it, with no other meaning listed against it.

## For you to decide

### Needed from you

none

### Fix or let through

1. The new definition has no main verb: it reads "A map that asks for something new … and without it is solved rarely.", while every other entry of the glossary reads "A <word> is …". The reviewer also noticed that the list "an item, a spell or another idea of a program" reads items and spells as kinds of "idea of a program", although a later task treats them as separate kinds. Nobody is misled today, because the heading gives the subject and no sentence of the foundation uses the word yet; whoever reads the glossary entry will see one entry in a different form from the rest. The wording is the one you approved with the definition of the project and the task required it word for word, so the cycle left it: the author was asked to fix it and answered that the only fix, "A wall is a map that …", changes the approved first word. Changing it in this request costs a round of correction with its review, and the entry would then differ from the wording the project definition and the task quote; undoing it costs another round. Making a task of it costs a later session that would change the entry together with the definition that quotes it; undoing it, nothing. Letting it through keeps the approved wording and costs nothing today; undoing it later costs one small edit of one entry. I recommend letting it through, since the sentence is the approved one and its meaning is not in doubt. Its weak point: the entry stays the only one of its form, and the next reader or reviewer may raise it again. Change it in this request, make a task of it, or let it through? (Minor findings, 1)

### You accept by merging

none

## Cost

About ten minutes of working time in all and about 12 million tokens, almost all of them re-read from the cache. The orchestrator ran on Sonnet 5.5, the one author on Haiku 5.5 in three turns (the entry, the fix attempt, the return step) and the reviewer on Opus 5.5. One review of the whole change, which passed; one fix round that changed nothing; the return step found nothing to correct. The table of stages is in the committed record, linked under *Course of the cycle* (Record).

## How to merge

Merge with a merge commit, not a squash or a rebase: the link to the record of the cycle points at commits that only a merge that keeps them preserves.

<details>
<summary>W Twoim języku</summary>

**Stan: wersja robocza** — końcowy przebieg testów na prośbie jeszcze się nie skończył; jedna pozycja poniżej czeka na Twoją odpowiedź.

## Co zobaczysz

Słownik gry ma nowe słowo „ściana”: mapa, która pyta o coś nowego — przedmiot, czar albo inny pomysł programu — i bez tego przechodzi rzadko. W grze nic się nie zmienia: żaden ekran, żadna mapa i żadna reguła się nie rusza. Słowo jest po to, żeby kolejne zadania projektu, które budują pierwsze ściany, miały jedno wspólne znaczenie tego pojęcia.

### Pod spodem

Jeden wpis dopisany na końcu słownika fundamentu, napisany dokładnie tak, jak rzutuje go zatwierdzona definicja projektu, bez żadnego innego znaczenia wypisanego przy nim.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Napraw albo przepuść

1. Nowa definicja nie ma orzeczenia: brzmi „A map that asks for something new … and without it is solved rarely.”, a każdy inny wpis słownika brzmi „A <słowo> is …”. Recenzent zauważył też, że lista „przedmiot, czar albo inny pomysł programu” czyta przedmioty i czary jak rodzaje „pomysłu programu”, choć późniejsze zadanie traktuje je jako osobne rodzaje. Dziś nikt nie jest wprowadzony w błąd, bo podmiot daje nagłówek, a żadne zdanie fundamentu jeszcze tego słowa nie używa; kto czyta słownik, zobaczy jeden wpis w innej formie niż reszta. Brzmienie jest to, które zatwierdziłeś razem z definicją projektu, i zadanie kazało je wpisać słowo w słowo, więc cykl je zostawił: autor miał to poprawić i odpowiedział, że jedyna poprawka, „A wall is a map that …”, zmienia zatwierdzone pierwsze słowo. Zmiana w tej prośbie kosztuje rundę poprawki z jej recenzją, a wpis różniłby się wtedy od brzmienia, które cytują definicja projektu i zadanie; cofnięcie to kolejna runda. Zadanie na później kosztuje późniejszą sesję, która zmieniłaby wpis razem z definicją, która go cytuje; cofnięcie — nic. Przepuszczenie zostawia zatwierdzone brzmienie i dziś nic nie kosztuje; cofnięcie później to jedna drobna zmiana jednego wpisu. Polecam przepuścić, bo zdanie jest zatwierdzone, a jego znaczenie nie budzi wątpliwości. Słaby punkt: wpis zostaje jedynym w tej formie, a kolejny czytelnik albo recenzent może to podnieść znowu. Zmienić to w tej prośbie, zrobić z tego zadanie, czy przepuścić? (Minor findings, 1)

### Akceptujesz przez scalenie

none

## Koszt

Łącznie około dziesięciu minut pracy i około 12 milionów tokenów, prawie wszystkie wczytane ponownie z pamięci podręcznej. Koordynator działał na Sonnet 5.5, jedyny autor na Haiku 5.5 w trzech turach (wpis, próba poprawki, krok powrotny), a recenzent na Opus 5.5. Jedna recenzja całej zmiany, która przeszła; jedna runda poprawki, która niczego nie zmieniła; krok powrotny nie znalazł nic do poprawienia. Tabela etapów jest w zatwierdzonym zapisie cyklu, z linkiem w *Course of the cycle* (Record).

## Jak scalić

Scal commitem scalającym, nie squashem ani rebase: link do zapisu cyklu wskazuje commity, które zachowa tylko scalenie je zachowujące.

</details>

## Technical changes

The change is one commit, `216b8bf9`, which adds the entry `## wall` at the end of `foundations/glossary.md` after `## overlay`: the projected sentence of the definition of the project word for word and the line `- **Not:** none`; the Polish meaning sentence of the projection is left out, as the task says, since a glossary entry is written in English. The fix round for the Minor finding made no commit (see *Minor findings*); the return step made none either.

## Checks

- **Final gate:** the final gate is the CI run on the request's last head, and the cycle has no run of it on its own system. Its result: not yet known when this description was written; it is written here when the run ends.
- **Failing before the change:** none. Taken from the final gate of the cycle of the merged branch (request 164; record commit `74546bb7`, `docs/task-cycles/wzorzec-kodu-przyrzadu/cycle.md`, *Verification*: the `tests` run passed); the base `fec2ae7e` is a merge commit with the same tree as the head of that branch, so no gate was run on it.
- **Run by the author, the reviewer and the return step, exit code 0 each:** `python -B .the-way/elements/common/foundation_check.py` (`0 errors`), `python -B .the-way/instruction-files/check_instructions.py` (`0 error, 149 warn, 7 info`; the 149 warnings were not compared with a baseline, and none names the changed file as far as the visible output shows), `git diff --check`, and `python -B .the-way/task-cycle/change_file_sizes.py fec2ae7e 216b8bf9` (`foundations/glossary.md` 300 to 306 lines).
- **Own-work checks:** the author read the committed entry against the projected sentence and corrected its first draft ("A wall is a map that …") to the projected wording before the commit; the author of the fix round and of the return step read the entry again and found no fault.
- **Not run:** `npm test` on the cycle's own system (CI is the final gate); the file-size test of the product on the base and the head, which the reviewer judged unable to tell the change from the base since it reads no Markdown file.
- **Working copies left:** none. **Directories of earlier tasks kept:** none.
- **Form check, private-paths check, image check and remarks check:** to be filled in with the record's link.

## Foundation entries

- `wall` (glossary), projected: a wall is a map that asks for something new — an item, a spell or another idea of a program — and without it is solved rarely. Written whole as approved; no row of settlements, no decision, no invariant, no change of the part map.

## Minor findings

1. `foundations/glossary.md:304` — within the task; the wording is mandated by the task. The definition is a noun phrase with no main verb ("A map that asks for something new … and without it is solved rarely."), where the glossary template's form asks for "one sentence: the definition" (`.the-way/elements/glossary/template.md`, "Form of an entry") and every other entry of the file is a sentence of the form "A <term> is …" / "The <term> is …". The content agrees with the foundation and no reader would read it wrongly — the heading supplies the subject, and "without it" can only be the "something new" — so by WAY-364 it is Minor. A second reading note in the same sentence: "an item, a spell or another idea of a program" classes items and spells as kinds of "idea of a program", which the projected entry for task 11 lists as a separate third kind ("one for a spell, one for an idea of a program"); no sentence of the files yet uses the term, so no reader is misled today. Both points are the approved projected wording, which the task requires word for word and the author deliberately restored after first writing "A wall is a map that …"; changing it means departing from the meaning approved at the readiness approval, so it belongs to the human, not to a fix of this cycle. If left as is: the entry stays the only fragment-form definition, at no cost to its meaning. If changed to "A wall is a map that …": the file reads uniformly, at the cost of a wording the human did not approve. The fix round (author, `reports/author-fix-report.md`) made no change and answered with the task's passage that mandates the wording.

## Findings outside the task's scope

1. The header of the glossary says it holds "Terms used by this product's foundation", while no sentence of the foundation uses `wall` yet; the plan sets the entries that use it in later tasks, and this task carries only the term (reviewer: outside this task; no place in the code beyond the glossary header).
2. The 149 warnings of `check_instructions.py`: the change touches no instruction file (reviewer: outside this task; no place in the code).

## Course of the cycle

- **Task and sources:** the task writes one projected glossary entry, `wall`, as part of the first task of the plan of the second project; its sources are the approved project definition and the plan's row. The task document read for the cycle differs from the one whose acceptance the plan's log records (the plan's log gives sha256 8f8ebf23bd010334 for the accepted document, the cycle's frozen copy has 20a5d28ebc8c6029): the vault's history shows two changed lines, the status and the exact wording of the one *To do* item (the place of the entry, only the definition sentence, no Polish meaning sentence); the cycle took that as the day advisor's clarification of what the task already asked for and recorded the reconciliation as an autonomous choice (question row 1 of the record).
- **Process pin:** `19e5774aed6d1d628042e23deccc110ed9f112c0`, not moved.
- **Spec:** none, since the task leaves no open design choice.
- **Route:** one author without a plan: one entry in one file; author class `cheaper` (Haiku 5.5).
- **Plan:** none.
- **Choices:** 3 rows in the questions table of the record (the reconciliation of the task document, no guideline applies to the part, the selection of decisions), none beyond the task's content.
- **Blocking findings left:** none.
- **Record:** RECORD_LINK_PLACEHOLDER
