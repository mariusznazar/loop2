---
title: "loop2: zrzuty ze sprawdzania ekranu w osobnym publicznym repo"
status: draft
created: 2026-11-08T23:10
updated: 2026-11-09
tags: [zadanie]
related: "the project's note in the author's backlog"
---

## Po co to

- **Jak jest dziś:** agent, który zmienia ekran gry, robi zrzuty działającej gry, ale nie ma ustalonego miejsca, gdzie je trzymać. Część agentów wrzuca je do repozytorium loop2, więc zostają tam na zawsze w historii (dziś to około 29 MB z około 51 MB całego repo). Inni nie pokazują ich wcale i piszą tylko, że zrzuty zrobili.
- **Kto to odczuwa:** Ty przy akceptacji PR-a: czy zobaczysz ekran, zależy od tego, którą instrukcję agent posłuchał. Do tego każdy klon repo pobiera wszystkie stare zrzuty.
- **Co jeśli nic:** gdy w the way wejdzie reguła, że zrzuty nie trafiają do repozytorium produktu, PR-y loop2 zaczną pisać „zrzutu nie ma, bo produkt nie ustalił miejsca”. Luka będzie widoczna, ale ekranu dalej nie zobaczysz.

# loop2: zrzuty ze sprawdzania ekranu w osobnym publicznym repozytorium

Status: ready for cycle
Project relation: independent

## Description

### Need

- the way ustala, że zrzuty ekranu ze sprawdzenia zmiany trafiają do opisu PR-a jako obrazki, nigdy do historii repozytorium produktu, a miejsce, w którym leżą, ustala fundament produktu (WAY-316).
- Fundament loop2 nie ustala takiego miejsca, a skill `loop2-play` mówi: „Nothing of it stays in the repository: no Playwright test, no frame, no snapshot. Its evidence goes into the report or the request.” (`.claude/skills/loop2-play/SKILL.md:12`, `main` @ 2fe922c).
- Bez ustalonego miejsca PR loop2 ze zmianą ekranu nie pokaże zrzutu, tylko napisze człowiekowi, że go nie ma i dlaczego (WAY-317).
- Odbiorcą jest Mariusz przy akceptacji PR-a: ma widzieć ekran w opisie PR-a, bez uruchamiania gry.
- the way stawia też warunek drodze agenta do działającego produktu: dwa cykle w osobnych worktree sprawdzają naraz bez wspólnej przeglądarki (WAY-319); zapasowa droga loop2 przez Playwright MCP go nie spełnia, gdy dwie sesje wystartują z tego samego katalogu.

### To do

1. Fundament loop2 ustala miejsce na zrzuty: zrzuty, które cykl pokazuje człowiekowi, leżą w publicznym repozytorium `mariusznazar/screenshots`, w katalogu `loop2/`, a w nim w katalogu na każdy cykl (pytanie 4); opis PR-a osadza każdy linkiem do pliku w konkretnym commicie tego repozytorium z dopiskiem `?raw=true`; repozytorium trzyma tylko zrzuty produktów publicznych i wolno je po dłuższym czasie wyczyścić, a stare PR-y tracą wtedy obrazki (pytania 1 i 2).
2. Skill `loop2-play` zamiast zdania „Nothing of it stays in the repository: …” wskazuje, że zrzut pokazywany człowiekowi trafia do repozytorium z punktu 1 i jak trafia do opisu PR-a; nic ze sprawdzenia dalej nie zostaje w repozytorium loop2 — ani test Playwright, ani klatka, ani zrzut.
3. Skill `loop2-play` w części o Playwright MCP mówi, że z tej drogi wolno korzystać tylko z sesji agenta uruchomionej w osobnym worktree cyklu (pytanie 3).

### Questions to settle

1. Gdzie leżą zrzuty loop2?
   - Answer: w osobnym publicznym repozytorium na zrzuty, z katalogiem na każdy cykl; opis PR-a osadza obrazek linkiem do pliku w commicie tego repo, jak w PR #67.
   - Not chosen:
     - osobne prywatne repo — obrazek w publicznym PR-ze loop2 widziałby tylko Mariusz, innym czytelnikom pokazałby się jako zepsuta ikonka, a mechanizm wymagał próby; prywatność niczego nie chroni, bo loop2 i jego PR-y są publiczne
   - Source: zadanie the way „artefakty testów”, pytanie 3; Mariusz, 2026-11-08: „osobne repo dla loop2 chyba byłoby spoko”, „widzę obrazki” (o PR #67), „niech będzie publiczne”.
2. Czy repozytorium na zrzuty wolno czyścić?
   - Answer: tak; zrzuty są dowodem na czas akceptacji, repozytorium wolno po dłuższym czasie wyczyścić, a obrazki w starych PR-ach przestaną się wtedy wyświetlać.
   - Not chosen:
     - miejsca na zrzuty się nie czyści, a gdy urośnie, temat wraca — Mariusz: „jeśli za pół roku coś w wyglądzie się będzie psuło to po jakiego grzyba mam sięgać do widoków sprzed pół roku?”
   - Source: zadanie the way „artefakty testów”, pytanie 2; Mariusz, 2026-11-08: „kiedyś jak bedę chciał usunąć stare obrazki, to się je usunie po prostu i przestaną się wyświetlać w PR'ach do których już nikt nie będzie miał potrzeby wracać”.
3. Jak zapasowa droga przez Playwright MCP spełnia warunek dwóch cykli naraz?
   - Answer: wolno z niej korzystać tylko z sesji agenta wystartowanej w worktree cyklu.
   - Source: zadanie the way „artefakty testów”, pytanie 8; Mariusz, 2026-11-08: „akceptuję” (tabela trzech decyzji o spisie zadań, wiersz 1).
4. Jak nazywa się repozytorium na zrzuty?
   - Answer: `mariusznazar/screenshots`, wspólne dla produktów publicznych; loop2 trzyma w nim swoje zrzuty w katalogu `loop2/`. Produkt prywatny z niego nie korzysta, bo jego zrzuty byłyby publiczne, a skasowanie i ponowne założenie repo czyści zrzuty wszystkich produktów naraz.
   - Not chosen:
     - `loop2-screenshots`, repo tylko dla loop2 — czyszczenie dotyczy tylko loop2, ale każdy następny produkt zakłada własne repo
   - Source: Mariusz, 2026-11-09: „nie wiem czy loop2 będzie jedyne korzystające z tego repo”, „wspólne screenshots”.
5. Czy przepięcie the way na wersję z WAY-316..319 robi cykl tego zadania, czy dzieje się przed cyklem?
   - Answer: przed cyklem — jako pierwszy commit cyklu innego zadania, który idzie przed tym; cykl tego zadania startuje już na wersji the way z WAY-316..319 i czeka na tamten wynik.
   - Not chosen:
     - pierwszy punkt cyklu tego zadania — cykl startuje według starego procesu i zmienia go w trakcie, a PR o zrzutach niesie zmiany z 10 PR-ów the way i ewentualne poprawki fundamentu
   - Source: Mariusz, 2026-11-09: „przed cyklem przejdzie planuję jako pierwszy commit zupełnie innego cyklu, który zrobię przed tym zadaniem”.

## Context

- Zadanie wynika z zadania the way „artefakty testów”: `the note of the the-way task about test artifacts in the author's backlog`, pytania 2, 3, 6 i 8.
- Reguła the way weszła PR-em #91 repozytorium the-way, scalonym 2026-11-08 (commit scalenia 17b83bf); loop2 przypina the way na 294af7f, który jej nie zawiera (sprawdzone 2026-11-09).
- Obrazek osadzony w PR #67: `![The screen of a map run in two columns](https://github.com/mariusznazar/loop2/blob/a70acfacb9909615ba5ff7c98d557cd066d351cc/docs/task-cycles/proporcje-sceny-i-programu/reports/screens/run-two-columns-1280.png?raw=true)` — wyświetlał się Mariuszowi (2026-11-08).
- loop2 i the-way są publiczne (`gh repo view`, 2026-11-08).
- Repozytorium `mariusznazar/screenshots` ma gałąź `main` z README i wyłączone zgłoszenia, wiki i tablice projektów (`gh repo view`, 2026-11-09); agent wypycha do niego zrzuty z konta `gh` Mariusza, który jest jego właścicielem.
- Skill `loop2-play` ma dwie kopie, `.claude/skills/loop2-play/` i `.agents/skills/loop2-play/`, które `tests/agent_workflow/test_loop2_play_skill.py` trzyma bajtowo równe.
- Playwright CLI 0.1.22 rozdziela sesję domyślną według repozytorium: w dwóch worktree tego samego repo każdy ma własną przeglądarkę (próba Mariusza, 2026-11-08).
- Playwright MCP trzyma trwały profil przeglądarki dla katalogu, z którego wystartowała sesja agenta, więc dwie sesje z tego samego katalogu się blokują (sprawa AIR-454 w notatkach autora o Claude Code).
- Skill `loop2-play` już zamyka przeglądarkę na końcu sprawdzenia (część „End the check”: `playwright-cli close`, a na MCP `browser_close`).

## Questions carried to cycle

none

## Human actions

- Założenie na GitHubie publicznego repozytorium `mariusznazar/screenshots` na zrzuty — before the cycle, done (agent na polecenie Mariusza, 2026-11-09)

## Decisions in play

- D-254 — How does an agent operate the game as a player does?: „An agent operates the running game in a real browser with Playwright CLI, and with Playwright MCP where the CLI fails, and reads motion from a stream of frames. This inspection adds to the checks D-75 and D-88 leave with a person and replaces none of them.” — punkt 3 zawęża drogę zapasową tej decyzji.
- WAY-316 (the-way @ 17b83bf) — Where do the screenshots that a change shows the human lie, and how do they reach the request?: „… are embedded as images in the description of the request, from a place that the foundation of the product settles outside the product's repository; the-way names no place. No file of a screenshot is committed to the product's repository, the copy of the task cycle's record that a commit adds to it included. A screenshot is evidence for the time of acceptance: the product may clear its place after a long time, and the images of old requests then stop showing.”
- WAY-317 (the-way @ 17b83bf) — What does a task cycle do when the foundation of a product settles no place for screenshots?: „… the author inspects the screenshot as WAY-219 gives and the request shows none: the section of its description for the human's decisions says that no screenshot is shown and why, and the cycle does not stop.”
- WAY-319 (the-way @ 17b83bf) — What must an agent's way to the running product allow when two task cycles run at once?: „The way to the running product that the foundation of a product settles for its interface lets two task cycles working in separate worktrees of the product check at the same time without a browser they share, and an agent closes the browser it opened when its check ends.”

## Settlements to record

Candidates: 8 shown, 5 accepted — 2026-11-09

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Zrzuty, które cykl loop2 pokazuje człowiekowi, leżą w publicznym repozytorium `mariusznazar/screenshots`, w katalogu `loop2/` z katalogiem na każdy cykl, a opis PR-a osadza każdy linkiem do pliku w konkretnym commicie tego repozytorium z dopiskiem `?raw=true`; repozytorium trzyma tylko zrzuty i wolno je po dłuższym czasie wyczyścić. | decision | pytania 1, 2 i 4 | czy osadzać obrazek adresem `raw.githubusercontent.com`, linkiem do gałęzi, czy do commita, i czy katalog cyklu stoi w korzeniu repo |
| 2 | Agent sam wypycha zrzuty do repozytorium `mariusznazar/screenshots` z konta `gh` Mariusza, bez kroku człowieka. | decision | propozycja z materiału (praktyka PR #67, gdzie agent sam commitował zrzuty), przyjęta: Mariusz, 2026-11-09, „tak jak rekomendujesz” | czy agent może pisać do repo poza loop2, czy przekazuje zrzuty człowiekowi do wgrania, skoro D-12 ogranicza mu dostęp poza repozytorium |
| 3 | Z Playwright MCP wolno korzystać tylko z sesji agenta uruchomionej w worktree cyklu. | decision | pytanie 3 | czy dopisać warunek do D-254, zakazać MCP w cyklu, czy zostawić drogę zapasową bez warunku |
| 4 | Playwright MCP trzyma trwały profil przeglądarki dla katalogu, z którego wystartowała sesja agenta, więc dwie sesje z tego samego katalogu się blokują. | environment fact | *Context*; sprawa AIR-454 | na czym stoi warunek z wiersza 3 — bez faktu decyzja nie ma podstawy, którą da się sprawdzić, gdy MCP zmieni sposób trzymania profilu |
| 5 | Playwright CLI rozdziela sesję domyślną według repozytorium, więc w dwóch worktree tego samego repo każdy ma własną przeglądarkę. | environment fact | *Context*; próba Mariusza, 2026-11-08 | czy główna droga spełnia WAY-319 bez zmiany, czy i ją trzeba ograniczyć jak MCP |

## Out of scope

- Usunięcie zrzutów, które już leżą w historii loop2 — zadanie ich nie rusza.
