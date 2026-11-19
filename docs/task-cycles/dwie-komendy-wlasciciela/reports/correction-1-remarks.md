Uwagi doradcy dnia w imieniu Mariusza

Runda 1 z 1. Poprawić w tym PR:

1. **For you to decide — Fix or let through, 1** (Findings outside the task's scope, 1; M-1 of the review of the whole change), `src/server/database.ts:255-262`: „`isDatabaseBusy` compares `errcode === 5` only. `node:sqlite` on Node v24.17.0 puts SQLite's *extended* result code in `errcode` […] so a busy error reported as an extended code (`SQLITE_BUSY_RECOVERY` 261, `SQLITE_BUSY_SNAPSHOT` 517) would read as "not busy" and get no advice to run again, and `enableWriteAheadLog` would not retry it.” — poprawić w tym PR, nie zakładać zadania: sugerowane `(errcode & 0xff) === 5`, z testem, który podaje kod rozszerzony (np. 261 i 517) i widzi radę ponowienia, a przy innym kodzie rozszerzonym (np. 2067) — brak rady. Zmiana obejmuje też polecenia blokady i kopii oraz ponawianie serwera; to zamierzone — ta sama luka dotyczy ich wszystkich, a poprawka to jedna linia.

2. **Findings outside the task's scope, 3**: „the glossary has no entry for "operator", though its `owner` entry says "operator" is the word for the person at the server and about seventy decisions use it” — dopisać wpis „operator” do słownika produktu w tym PR (znaczenie, które już niesie wpis `owner`), bez osobnego zadania.

Przepuścić:

- **Fix or let through, 2** (luka lektury przeglądu całości: D-360, D-231, D-410, D-400 bez *Rationale*/*Rejected*) — nieprzeczytane części należą do decyzji, których ta zmiana nie zmienia; następne zadanie w kolejce (formatowanie Pythona i Basha) ich nie rusza.

„You accept by merging” 3–4 — przyjęte.

