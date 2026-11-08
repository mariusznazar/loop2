---
title: "loop2: po zmianie reguł słownika w the-way poprawić zdania fundamentu, w których słowo procesu da się przeczytać w dwóch znaczeniach"
status: draft
created: 2026-11-05T21:10
updated: 2026-11-08
tags: [zadanie]
related: "projekt Loop w prywatnych notatkach autora"
---

# loop2: poprawić zdania fundamentu, w których słowo procesu the-way da się przeczytać w dwóch znaczeniach

Status: ready for cycle
Project relation: independent

## Description

### Need

- W dokumentacji zasad loop2 (katalog `foundations/`) niektóre słowa mają też własne znaczenie w procesie the-way. Najczęściej to „sentence”: w loop2 zwykle znaczy komunikat pokazywany graczowi, ale w kilku decyzjach znaczy zdanie samej decyzji.
- Agent, który czyta takie zdanie razem z regułami the-way, może wziąć jedno znaczenie za drugie, także przy zmianie, która tego zdania dotyczy.
- Reguła the-way o słowach procesu w fundamencie produktu (WAY-104) każe teraz dopisywać określenie tylko tam, gdzie zdanie dałoby się przeczytać w drugim znaczeniu, w którąkolwiek stronę; wcześniej kazała dopisywać je do każdego gołego słowa ze słownika the-way.
- Pod starą regułą cykle dopisywały określenia w jednych decyzjach, a w innych nie, więc w PR-ach pojawiały się dopiski bez widocznej zasady.

### To do

1. D-23, pole *Verification* (`foundations/decisions.md:545`): „since a sentence naming what a kind of condition may take” czyta „since a sentence of this decision naming what a kind of condition may take”.
2. D-109, *Rejected* (`foundations/decisions.md:1994`): „and one more sentence here” czyta „and one more sentence in this decision”.
3. D-120, *Rejected* (`foundations/decisions.md:2183`): „while leaving the sentence unchanged” czyta „while leaving this decision's sentence unchanged”.
4. D-253, zdanie wiążące (`foundations/decisions.md:5166`): „which the sentences above ask no more of” czyta „which the sentences of this decision above ask no more of”.
5. D-309, *Rejected* (`foundations/decisions.md:6666`): „and the approved sentence gets an exception” czyta „and the approved sentence of D-308 gets an exception”.
6. D-103, pole *Verification* i *Rationale* (`foundations/decisions.md:1909`, `:1913`): „a full gate refuses immediately” czyta „a full password gate refuses immediately”, a „The measured gate shares the host processor” czyta „The measured password gate shares the host processor”; zdanie wiążące D-103 („One bounded gate without a waiting queue covers password hashing and verification”) zostaje bez zmian.

### Acceptance criteria

- Poza miejscami z punktów 1–6 zadanie nie zmienia żadnego zdania fundamentu.

### Questions to settle

- Czy zadanie zmienia tylko listę miejsc przyjętą przy doprecyzowaniu, czy cykl sam przegląda cały fundament i decyduje, które zdania poprawić?
  - Answer: tylko lista przyjęta przy doprecyzowaniu — punkty 1–6 z *To do*. Z siedmiu zaproponowanych miejsc odpada D-173, *Rejected* (`foundations/decisions.md:3192`, „and is a new kind of element to build and describe”): „window” i „to build” przesądzają tam znaczenie elementu interfejsu.
  - Not chosen:
    - przegląd w cyklu — może znaleźć więcej miejsc, ale ocena „da się przeczytać w drugim znaczeniu” jest uznaniowa, więc spór przenosi się do przeglądu zmiany i do PR-a, a listę widać dopiero w PR-ze.
    - nic nie robić — sześć miejsc zostaje i każde może zostać źle przeczytane przy zmianie, która go dotyczy.
  - Source: Mariusz, 2026-11-08: „lista zamknięta, przyjmuję wiersze 1–6, 7 zostaw”
- Co z określeniami dopisanymi pod starą regułą, które nowa reguła już nie wymaga (np. „game map”, „the character's action”, „DOM element”, „release check”)?
  - Answer: zostają bez zmian — niczemu nie szkodzą; zostaje tylko niespójność między nimi a gołymi użyciami tych słów w innych zdaniach.
  - Not chosen:
    - wycofać wszystkie dopisane pod starą regułą — spójność, ale najpierw trzeba z historii gita ustalić, które wystąpienia dopisano dla reguły, a potem przepisać około stu miejsc zatwierdzonych decyzji, niezmienników i słownika; duży PR za zysk kosmetyczny.
    - wycofać tylko tam, gdzie fraza brzmi nienaturalnie — wybór uznaniowy, więc wraca spór, którego lista zamknięta unika.
  - Source: Mariusz, 2026-11-08: „zostawmy, niczemu nie szkodzą chyba”

## Context

- Loop2 przypina wersję the-way z nową regułą (`.the-way` na `294af7f`, zmiana reguły w commicie the-way `24e092c`).
- Brzmienie reguły, według którego się poprawia: WAY-104 w `.the-way/foundations/decisions.md` przy przypiętym commicie, z przykładami „complies”/„violates” w polu *Verification*; przykład „violates” mówi m.in., że przepisanie każdego gołego „map” na frazę, choć żadne zdanie nie czyta go jako mapy części, łamie decyzję.
- Gołe „map” (mapa w grze) zostaje bez zmian: w fundamencie loop2 żadne zdanie nie używa gołego „map” w znaczeniu mapy części produktu, a plik `foundations/part_map.md` nazywa ją „Part map”.
- Uwaga z przeglądu PR-ów loop2#044-11 („Older foundation entries use bare `map`, `action` and `test`, the last words of terms of the-way”): przy nowej regule gołe „map”, „action” (czynność postaci) i „test” nie wymagają zmian, bo w przejrzanych zdaniach żadne nie czyta się jako „part map”, „human action” ani „invariant test”; „human action” w znaczeniu procesu stoi już z określeniem (D-219 i D-248 w *Rejected*). Źródło uwagi: `prywatna notatka autora z uwagami z przeglądu pull requestów`, sekcja „Dopisek: słowa procesu w dwóch znaczeniach (loop2)”.
- Przejrzenie fundamentu przy doprecyzowaniu (loop2 `main` na `01b26d5`, 2026-11-08) objęło słowa ze słownika the-way, które w loop2 mają też własne znaczenie: „sentence”, „entry”, „step”, „gate”, „element”, „action”, „part”, „choice”, „map”.
- Zmiana dotyczy tylko plików części `product-foundation` (`foundations/**`); ta część nie ma własnych wytycznych ani testów, a fundament sprawdza `python -B .the-way/elements/common/foundation_check.py`, który uruchamia też `npm test`.
- Źródło zadania: sprawa AIR-591 w zeszycie ai-review (`prywatny zeszyt ai-review autora`) i zmiana reguł słownika w the-way (WAY-293 i nowe brzmienie WAY-104).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Wpisy loop2 cytuje `foundations/decisions.md` przy loop2 `01b26d5`; WAY-104 cytuje `.the-way/foundations/decisions.md` przy przypiętym `294af7f`. Każda zmiana z *To do* dopisuje określenie do słowa i nie zmienia znaczenia decyzji.

- **WAY-104 — How does a product write a word of its domain that the glossary of the-way holds?** (decyzja the-way, według której zadanie poprawia): „A word that the glossary of the-way holds at the commit a product pins, or the last word of a term it holds, in any of its forms, takes a qualifier — a phrase holding the word — in a sentence of the files of the product's `foundations/` that could otherwise be read in the other meaning: a sentence that uses the word for the product's domain and could be read as the process's, or one that uses it for the process and could be read as the domain's, and a bare use that no sentence of those files reads in the other meaning keeps the meaning it has there. A qualified word takes a glossary entry only where WAY-95 gives a word one, and where the bare word itself has an entry in the glossary of the-way, that entry records no *Not* for its domain meaning. The product's code, its interface and talk about the product use the word of the domain unchanged.”
- **D-23 — How does a character act by its program?** Zmienia się pole *Verification*: „For a condition written as an expression, since a sentence naming what a kind of condition may take would also bind which kinds the closed list holds, which this decision leaves open, an agent compares the change with the decision:”
- **D-103 — Where are attempt counters kept and how is password work bounded?** Zdanie wiążące, które zostaje: „One bounded gate without a waiting queue covers password hashing and verification, including dummy verification for an unknown account, with a concurrency cap selected by measurement within the container memory budget and slots released only when the actual operation completes.” Zmieniają się *Verification*: „complies: a full gate refuses immediately and a disconnected request retains its slot until native work finishes” i *Rationale*: „The measured gate shares the host processor with other workloads.”
- **D-109 — What identity authorizes an account request?** Zmienia się pozycja *Rejected*: „a request of its own that checks a password-reset link before its form is shown, with „Sprawdzanie odnośnika…” — a second new route without a session, answering anyone whether a token works, one more state of the page with its tests, and one more sentence here”. To samo „sentence” D-225 w *Rejected* nazywa „one more sentence in D-109” i to zdanie zostaje.
- **D-120 — What does an archetype open to a character?** Zmienia się pozycja *Rejected*: „reading the predisposition condition as only necessary while leaving the sentence unchanged — its plain reading would admit „Obchód” without buying the branch”.
- **D-253 — Which processes of loop2 have a last-resort handler of their own?** Zmienia się ostatnie zdanie wiążące: „A script run by hand or by the test gate that touches none of those data meets the rule on the last resort through the default print of Node.js or Python, which writes what nothing handled, and `account-database-check`, `measure-passwords`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` already have a last-resort handling of their own, which the sentences above ask no more of, though the last two touch those data and write no kind or code.”
- **D-309 — What do the signs of a program rule show in the minutes of an attack?** Zmienia się pozycja *Rejected*: „no rule on the background of the rule that wins during the minutes of an attack — it is not seen what the mage will start the fight with, and the approved sentence gets an exception”. Przyjęte zdanie, o które chodzi, to zdanie wiążące D-308 (*Relations* D-309: „derives from D-308”): „During a manual map run and on its screen after its end, until „Restart” or „Zakończ”, the rule of the copy that wins now stands on the background `rule-winning` […]”.

## Settlements to record

Candidates: 2 shown, 0 accepted — 2026-11-08

none

## Out of scope

- Wycofanie określeń dopisanych pod wcześniejszym brzmieniem WAY-104 (np. „game map”, „the character's action”, „DOM element”, „release check”).
- Przegląd całego fundamentu poza sześcioma miejscami z *To do*.
