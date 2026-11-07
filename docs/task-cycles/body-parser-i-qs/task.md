---
title: "loop2: podnieść w lockfile body-parser i qs zgłaszane przez npm audit na main"
status: draft
created: 2026-11-06
updated: 2026-11-07
tags: [zadanie]
related: "[[(P) Loop]]"
---

# loop2: podnieść w lockfile body-parser i qs zgłaszane przez npm audit na main

Status: ready for cycle
Project relation: independent

## Description

### Need

- `npm audit --omit=dev` na `main` (loop2 `5694146`, 2026-11-06) zgłasza dwie podatności w zależnościach produkcyjnych: `body-parser` 2.3.0, waga wysoka, GHSA-27r3-jxmh-p828 „body-parser vulnerable to Denial of Service via trailing bytes after a compressed request body”; `qs` 6.16.0, waga średnia, GHSA-6pq8-jhm2-2vcw „qs.stringify with arrayFormat 'comma' throws an uncaught TypeError on array elements carrying a non-callable own toString (DoS)”.
- Bramka audytu zależności (D-33) ich nie łapie, bo oblewa tylko na ostrzeżeniu, którego nie było w `{fork-point}`, a te były na `main`, zanim powstała jakakolwiek dzisiejsza zmiana.
- Według lektury kodu, bez próby, żadna z dwóch podatności nie jest dziś osiągalna w serwerze gry. Jedyny parser treści żądania to `express.json` z `inflate: false` (`src/server/transport.ts:86`–`:92`), a przed nim strażnik odrzuca kodem 415 każde żądanie z `Content-Encoding` innym niż `identity` (`src/server/transport.ts:72`–`:83`); przez tych strażników idą obie trasy z treścią (`src/server/account-routes.ts:394`, `:398`). Podatna funkcja `qs` to `stringify`, a Express woła z `qs` tylko `parse`, i to tylko przy ustawieniu `query parser` = `extended`; domyślne `simple` używa `node:querystring` (`node_modules/express/lib/application.js:97`, `node_modules/express/lib/utils.js:172`, `:268`).
- Zostawione w drzewie działają jak uśpione: gdyby późniejsza zmiana włączyła rozpakowywanie treści albo parser formularzy, podatność stałaby się osiągalna, a bramka D-33 by tego nie zgłosiła, bo ostrzeżenie byłoby już w `{fork-point}`.
- Gra jest publicznie dostępna pod `https://loop2.mariusznazar.com/` (`.github/workflows/deploy.yml:19`).

### To do

1. `package-lock.json` trzyma `body-parser` w wersji 2.4.0 lub wyższej i każdą kopię `qs`, z której korzystają `express` i `body-parser`, w wersji 6.16.1 lub wyższej; `package.json` się nie zmienia, Express zostaje 5.2.1.

### Acceptance criteria

- `npm audit --omit=dev` na gałęzi zadania nie zgłasza żadnego ostrzeżenia.

### Questions to settle

- Czy zadanie zostaje, skoro według lektury kodu żadna z dwóch podatności nie jest dziś osiągalna w serwerze gry?
  - Answer: zostaje — aktualizacja kosztuje jeden mały PR, a usuwa oba ostrzeżenia z audytu i nie zostawia podatności, która stałaby się osiągalna bez sygnału po zmianie włączającej rozpakowywanie treści albo parser formularzy.
  - Not chosen:
    - odpuścić zadanie — dziś nic nie kosztuje, ale oba ostrzeżenia zostają w audycie na stałe, a po takiej zmianie serwera bramka D-33 nie zgłosi, że podatność stała się osiągalna.
  - Source: Mariusz, 2026-11-06: „robimy”

## Context

- Pierwszą wersją bez podatności jest `body-parser` 2.4.0 (zakres podatny `>= 2.0.0, < 2.4.0`) i `qs` 6.16.1 (zakres podatny `>= 6.7.0, <= 6.16.0`), według GitHub Advisory Database (`gh api advisories/GHSA-27r3-jxmh-p828`, `gh api advisories/GHSA-6pq8-jhm2-2vcw`, odczyt 2026-11-06).
- Express 5.2.1 deklaruje `body-parser` `^2.2.1` i `qs` `^6.14.0` (`npm view express@5.2.1`, 2026-11-06), więc obie wersje bez podatności mieszczą się w jego zakresach i wystarcza zmiana pliku blokady.
- Wydanie `body-parser` 2.4.0 poza poprawką dodaje obsługę kodowania zstd (https://github.com/expressjs/body-parser/releases/tag/v2.4.0, „feat: zstandard support”, #586); strażnik z `src/server/transport.ts:72`–`:83` odrzuca to kodowanie tak samo jak każde inne, a odrzucenie skompresowanej treści sprawdzają testy niezmiennika `account-mutation-request-guards` (`tests/transport.test.mjs`, `tests/http.test.mjs`).
- Kopia `qs` dla `typed-rest-client` narzędzia do testów mutacyjnych jest już przypięta na 6.16.1 przez `overrides` w `package.json` i audyt jej nie zgłasza.
- Lokalny `~/.npmrc` tej maszyny ma `min-release-age=6`; `body-parser` 2.4.0 wyszedł 2026-10-22, `qs` 6.16.1 2026-10-14, a najnowszy `qs` 6.17.1 2026-10-28, więc żadnej z tych wersji to ustawienie nie blokuje (`npm view <pakiet> time`, 2026-11-06).
- Zmieniony plik blokady uruchamia w bramce audyt przez sieć (`scripts/audit_dependencies.py`), który oblewa na każdym ostrzeżeniu od poziomu low, którego nie było w `{fork-point}`, więc odświeżenie, które wciągnęłoby nową podatną wersję innego pakietu, nie przejdzie.
- Scalenie do `main` samo wdraża commit na serwer testowy (`.github/workflows/deploy.yml:5`–`:7`); który commit tam działa, mówi skill `loop2-deploy` (`C:\Storage\repos\loop2\.claude\skills\loop2-deploy\SKILL.md`).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- **D-33 — Which introduced dependency vulnerabilities block a change?** „The dependency audit passes without a network request where `package-lock.json` equals its version at {fork-point}, and otherwise fails on each advisory of low, moderate, high or critical severity that local pinned npm 12.2.1, run as `npm audit --json --package-lock-only --audit-level=low --include=dev --include=optional --include=peer --registry=https://registry.npmjs.org/`, reports for that lockfile and not for its version at {fork-point}, reading the npm/GitHub Advisory Database through the public npm registry when the check runs. A failed request or an unreadable report fails the audit; info does not block, and the low threshold has no automatic revision or scheduled threshold review. The audit covers the root npm package of build-tools with its direct, transitive, production, development, optional and peer dependencies, sending package names and versions without application code, while nested npm packages and runtime, container-image, operating-system and non-npm dependencies are outside it.”
- **D-02 — How does the account and save server handle HTTP requests?** „The account and save server uses Express 5 on Node.js 24 to route and handle HTTP requests and responses.”
- **D-104 — Which request origin and body may change account state?** „The session cookie uses SameSite=Strict, and every state-changing route requires exactly the configured serialized HTTPS Origin and an application/json body with at most 64 KiB for the save route `PUT /api/saved-game` and at most 16 KiB for every other route, optional charset allowed and compressed inflation rejected, while the server stores at most 64 KiB of each player's saved game state. Missing, null, duplicate, malformed or foreign Origin and wrong media type are refused before mutation or password work, and Host or forwarded host headers never choose the expected origin. Input is an object of expected fields with explicit type checks rather than coercion, and no cross-origin allowance or form-body alternative bypasses these guards.”

## Settlements to record

Candidates: 1 shown, 0 accepted — 2026-11-06

none

## Out of scope

- Podniesienie Expressa do 5.3.0 w `package.json`.
- Ostrzeżenia z zależności deweloperskich, które zgłasza audyt całego drzewa (`minimatch`, `glob`, `ip-address` i `undici` w pakiecie `npm`).
