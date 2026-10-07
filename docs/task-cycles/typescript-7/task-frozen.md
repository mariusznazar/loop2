# Spróbować przejścia loop2 z TypeScriptu 6.0.3 na 7.x

Status: ready for cycle
Project relation: independent

## Description

### Need

- Kolejne zadania piszą kod kompilowany przez TypeScript 6.0.3, choć jest już 7.x; im później przejście, tym więcej kodu do sprawdzenia (T8 w PR #3).

### To do

1. Przenieść kompilator TypeScriptu w `loop2` z 6.0.3 na najnowsze wydanie 7.x tak, żeby budowanie i sprawdzanie typów obu części działały jak dziś.
2. Gdy przejście się nie uda, zostać przy 6.0.3 i oddać w PR, co je zablokowało.

### Questions to settle

- Czy przejście musi być potwierdzone budowaniem na Linuksie, skoro `loop2` ma działać w kontenerze linuksowym, a cykl biegnie na Windowsie?
  - Answer: Nie — wystarczy Windows; Linuksa sprawdzi pierwsze zadanie wdrożenia. <task owner>, 2026-10-06.

## Context

- Zadanie startuje po scaleniu PR zadania „Domknąć pierwszy fundament loop2” (`pierwszy_fundament_loop2.md` w tym folderze), żeby próba 7.x przeszła także przez jego testy niezmienników.
- Szkielet przypiął 6.0.3, bo „klasyczny kompilator działa przez Node bez natywnych zależności zależnych od platformy” (T8 w zapisie cyklu PR #3, commit `5928e7b`); czego 7.x wymaga od budowania, nie ustalono.
- `scripts/build.mjs` uruchamia kompilator przez Node z `node_modules/typescript/bin/tsc`.
- Test niezmiennika `application-build-output` wymaga od kompilatora komunikatów `Cannot find name '<nazwa>'` (założenie przyjęte w U5 PR #3).
- Najnowsze wydanie w rejestrze npm: 7.0.2 (sprawdzone 2026-10-06).

## Questions carried to cycle

- Czy 7.x da się uruchamiać obecnym `scripts/build.mjs`, czy budowanie trzeba zmienić.
- Czy komunikaty błędów 7.x zgadzają się z założeniem testu `application-build-output`.
- Czy wersja kompilatora po tym zadaniu ma zostać decyzją w fundamencie.

## Decisions in play

- D-01/1 „What runs the account and save server?”: “The account and save server is written in TypeScript and runs on Node.js 24 LTS. Its TypeScript types are checked before deployment.”
- D-06/2 „How are the browser and server built together?”: “The browser and server share one npm package and lockfile, and have separate TypeScript compilation configurations and output directories. Building the application compiles both configurations.”
- Niezmienniki `account-server-typecheck/1` („The account and save server's TypeScript types are checked before deployment.”), `application-build-output/1` („Building the application compiles both the browser and the server TypeScript configurations.”), `application-build-layout/1` („The browser and server have distinct TypeScript compilation configurations and output directories.”) i `application-package-layout/1` („The browser and server use a single shared npm package and lockfile, with no separate application package for either side.”).

## Out of scope

- Zmiana wersji Node.js.
- Budowanie i uruchamianie na Linuksie — sprawdzi je pierwsze zadanie wdrożenia.
