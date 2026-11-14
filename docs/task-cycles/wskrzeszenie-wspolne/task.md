---
title: Wskrzeszenie wspólne dla całego konta, odnawiane też przy pierwszym rozwiązaniu mapy, którego nie zużywa śmierć postaci bez wprawy
status: draft
created: 2026-11-13
updated: 2026-11-14
tags: [zadanie]
related: "the author's project note Loop"
---

# Wskrzeszenie wspólne dla całego konta, odnawiane też przy pierwszym rozwiązaniu mapy, którego nie zużywa śmierć postaci bez wprawy

Status: ready for cycle
Project relation: independent

## Description

### Need

- Dziś każda postać ma własne wskrzeszenie: nowa postać rodzi się z gotowym (D-220, `src/browser/sim/game.ts:415`), a chwila gotowości stoi w postaci (`resurrectionReadyAtMs`, `src/browser/sim/types.ts:398`).
- Przez to gracz, którego postać zużyła wskrzeszenie, zakłada nową postać na jedną ryzykowną próbę i omija stawkę śmierci, którą wskrzeszenie ma ważyć (koncepcja D29, fundament D-190).
- Kierunek z zakresu Projektu 2: „Wiele postaci zostaje; wskrzeszenie jest wspólne dla konta. Po śmierci którejkolwiek postaci ryzykowne próby czekają na odnowienie wskrzeszenia, więc nowa postać założona na jedną próbę nie zdejmuje stawki śmierci.” (the author's note on the scope of project 2, „Kierunek” 3).
- Linia zadania dokłada odnowienie przy pierwszym rozwiązaniu mapy i wyklucza Zarzewie (wskrzeszenie jako przedmiot noszony w plecaku); oba za krytyką propozycji progresji: „Odnowienie pierwszym rozwiązaniem mapy — tak […]. Zarzewia nie robiłbym” (the author's note with the critique of the progression proposal, tabela werdyktów, D13).
- Dziś każda śmierć postaci z gotowym wskrzeszeniem zużywa je, także śmierć postaci, która nie ma jeszcze żadnej wprawy i której wskrzeszenie niczego nie chroni (D-190; `characterAfterDeath`, `src/browser/sim/game.ts:575-604`, rewizja `e6a95a9b`).
- Pomiar przyrządu balansu: na nowym koncie pierwsze przejście pierwszej mapy kończy się śmiercią (Las dziś: 0 z 300; Skraj lasu 480 min i 25 °C: 3 z 300), więc „pierwsza śmierć jest pewna i zużywa wskrzeszenie”, a „przez następne 8 godzin realnych każda śmierć zabiera cały dorobek” (the author's note on the balance simulator, ustalenie 2.4).
- Linia zadania: „żeby nowy gracz nie zaczynał od śmierci, która zabiera mu wskrzeszenie na osiem godzin” (the author's note on the balance simulator, działanie D2: „Osobno rozstrzygnąć, czy śmierć postaci, która nie ma jeszcze żadnej wprawy, zużywa wskrzeszenie”).
- Przy wskrzeszeniu wspólnym dla drużyny pierwsza śmierć świeżej postaci zabierałaby wskrzeszenie wszystkim postaciom (pytanie 5).

### To do

1. Konto ma jedno wskrzeszenie zamiast jednego na postać: śmierć którejkolwiek postaci z gotowym wskrzeszeniem zużywa je dla wszystkich, a do jego odnowienia śmierć każdej postaci zabiera jej wprawę i wykupione stopnie i podnosi numer pokolenia — poza śmiercią postaci bez wprawy (punkt 6).
2. Nowa postać nie przynosi własnego wskrzeszenia; nowa gra zaczyna z gotowym.
3. Zużyte wskrzeszenie odnawia się jak dziś po czasie realnym z danych balansu (8 godzin) albo wcześniej: jest gotowe od chwili pierwszego rozwiązania mapy, której konto jeszcze nie rozwiązało, raz na mapę; gotowe zostaje gotowe (pytanie 2).
4. W doliczaniu nieobecności postacie biorą wspólne wskrzeszenie w kolejności listy postaci, jak miejsce w skrzynce: śmierć każdej postaci zastaje wskrzeszenie takie, jakie zostawiło doliczanie postaci wyżej na liście, nawet gdy ta zginęła później w czasie realnym; w otwartej grze i w przejściu ręcznym bierze je śmierć wcześniejsza w czasie (pytanie 1).
5. Postać nie ma jeszcze żadnej wprawy, gdy w każdej umiejętności ma zero wprawy, nie ma żadnego wykupionego stopnia i nie ma wprawy zebranej w pętli zarobkowej (pytanie 6).
6. Śmierć postaci bez wprawy nie zużywa wskrzeszenia drużyny, nie podnosi numeru pokolenia i nie zatrzymuje pętli zarobkowej postaci — tak samo, gdy wskrzeszenie jest gotowe i gdy nie jest; zabiera to, co postać niosła, i nie płaci nic z przejścia, jak każda śmierć (pytania 6 i 7). Dotyczy przejścia ręcznego, pętli zarobkowej w otwartej grze i doliczania nieobecności, w którym śmierć postaci bez wprawy zostawia wskrzeszenie drużyny takie, jakie zastała, dla postaci niżej na liście.
7. Wiersz wskrzeszenia przy postaci (karta i ekran postaci, postać w „Kto idzie” na karcie mapy) brzmi „Wskrzeszenie drużyny gotowe” w `text-secondary` albo „Wskrzeszenie drużyny za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” w `danger`, poniżej godziny „Wskrzeszenie drużyny za {m} min czasu realnego — …”, z zaokrągleniem minut jak dziś (pytanie 3).
8. Linia okna końca przejścia po śmierci, która zużyła wskrzeszenie, brzmi „Wskrzeszenie zużyte: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Następne wskrzeszenie, wspólne dla całej drużyny, po 8 godzinach czasu realnego albo po pierwszym rozwiązaniu nowej mapy.”, godziny z danych balansu (pytanie 3).
9. Po śmierci postaci bez wprawy okno końca przejścia, w części o tym, co śmierć kosztowała, pokazuje „Postać nie miała jeszcze wprawy, więc śmierć nie zużyła wskrzeszenia drużyny.” w `text-secondary`, do „Restart” albo „Zakończ” i także po wczytaniu, w miejscu linii o zużytym albo niegotowym wskrzeszeniu (pytanie 8).
10. Po rozwiązaniu, które odnowiło zużyte wskrzeszenie, okno końca przejścia pokazuje linię „Wskrzeszenie odnowione: pierwsze rozwiązanie tej mapy.” w `text-secondary`, do „Restart” albo „Zakończ” i także po wczytaniu, jak linia śmierci z D-216; rozwiązanie przy gotowym wskrzeszeniu tej linii nie pokazuje (pytanie 3).
11. Zmiana kształtu stanu gry podbija raz wersję kształtu zapisu, `SAVED_GAME_VERSION` (dziś 6, `src/browser/sim/saved-game.ts:80`) (pytanie 4).
12. Fundament mówi to, co zmiana czyni prawdziwym: decyzje z *Decisions in play* dostają zmiany tam opisane; niezmiennik `resurrection-renewal` mówi o wskrzeszeniu konta, o odnowieniu przy pierwszym rozwiązaniu mapy i o tym, że śmierć postaci bez wprawy zostawia chwilę gotowości wskrzeszenia taką, jaka była; niezmiennik `catch-up-state` zawęża się do postaci, której skrzynki ani wskrzeszenia nie sięga przejście innej postaci; hasło słownika `resurrection` mówi o wskrzeszeniu konta, a nie postaci, i o tym, że śmierć postaci bez wprawy go nie zużywa; hasło `generation number` mówi, że taka śmierć numeru nie podnosi.

### Questions to settle

- Pytanie 1. Gdy w czasie nieobecności giną dwie postacie w pętli, która bierze wspólne wskrzeszenie?
  - Answer: a — postać wyżej na liście postaci, nawet gdy zginęła później; doliczanie zostaje postać po postaci (D-240). Przyjęty koszt: raport może pokazać, że postać niżej na liście straciła wszystko wcześniej, niż postać wyżej zginęła z wskrzeszeniem; niezmiennik `catch-up-state` się zawęża; doliczanie „postać po postaci” utrwala się o jeszcze jedną rzecz.
  - Not chosen:
    - b — bierze postać, która zginęła pierwsza w czasie — wymaga doliczania minuta po minucie przez wszystkie postacie naraz, czyli zmiany D-240 na wariant przez nią odrzucony, dzielenia skrzynki w kolejności czasu, dłuższego doliczania po długiej nieobecności i zadania ponad estymatę 3.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a”.
- Pytanie 2. Co dokładnie odnawia wskrzeszenie przy rozwiązaniu mapy?
  - Answer: a — pierwsze rozwiązanie każdej mapy, której konto jeszcze nie rozwiązało, od razu przywraca zużyte wskrzeszenie; gotowe zostaje gotowe; raz na mapę. Przyjęty koszt: każda nowa mapa daje jedną ochronę na następną próbę; D-190 odrzuca „a resurrection per map”, więc decyzja dostaje zdanie, że odnowienie przychodzi za sukces, nie z góry.
  - Not chosen:
    - b — bez odnowienia, tylko wspólne wskrzeszenie (dokładnie „Kierunek” 3) — po śmierci gracz czeka 8 godzin także po udanym rozwiązaniu; linia zadania do poprawy.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „2 a”.
- Pytanie 3. Co gra pokazuje o wspólnym wskrzeszeniu i o jego odnowieniu?
  - Answer: b — przy każdej postaci „Wskrzeszenie drużyny gotowe” i „Wskrzeszenie drużyny za …”; w oknie końca przejścia „… Następne wskrzeszenie, wspólne dla całej drużyny, po 8 godzinach czasu realnego albo po pierwszym rozwiązaniu nowej mapy.” i po odnawiającym rozwiązaniu „Wskrzeszenie odnowione: pierwsze rozwiązanie tej mapy.” w `text-secondary`. Przyjęty koszt: zmiana D-217 i testów widoku z tymi napisami; gdy wróci „wiele drużyn”, słowo „drużyny” trzeba będzie przemyśleć.
  - Not chosen:
    - a — wiersze przy postaciach bez zmian, zmienione tylko okno końca przejścia — gracz dowiaduje się o wspólności dopiero po pierwszej śmierci, co D-217 już odrzuciło („the player learns the stake once it has paid it”).
    - c — napisy bez zmian — wspólność widać tylko z tego, że postacie odliczają razem, a odnowienie tylko jako zniknięcie odliczania.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „3 b”.
- Pytanie 4. Czy zadanie czeka na zadanie o wciąganiu programów ze starych zapisów, żeby podbicie wersji zapisu nie zabrało programów?
  - Answer: tamto zadanie jest scalone 2026-11-14 (PR #96), więc nie ma na co czekać: podbicie wersji zapisu zaczyna grę od nowa, a konto z uprawnieniem do poprzedniego zapisu wciąga z niego programy (D-206, D-399–D-401). Wcześniej: „4 a” — bez czekania (2026-11-13); „5 b” — czekać przez łańcuch zależności (2026-11-14).
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14, tryb samodzielny: „1 — b, jedno pytanie 4 w Twoim brzmieniu”.
- Pytanie 5. Czy zadanie o śmierci postaci bez wprawy idzie po zadaniu o wskrzeszeniu wspólnym dla konta, czy niezależnie od niego?
  - Answer: a — po nim: linia zadania czeka na linię „wskrzeszenie wspólne” (`⛔ loop2-wskrzeszenie-wspolne`), a reguła od razu dotyczy wskrzeszenia drużyny. Przyjęty koszt: zadanie czeka, aż tamten cykl się scali.
  - Not chosen:
    - b — oba zadania niezależnie — dwa cykle naraz zmieniają te same funkcje (`characterAfterDeath`, `settleDeath`, `endLoopRun`), to samo zdanie D-190 i ten sam plik napisów; drugi do scalenia rozwiązuje konflikt, a ten, kto poprawia D-190, może zgubić zmianę pierwszego.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „1 a (dopisz 🆔 linii „wskrzeszenie wspólne” i ⛔ w tej linii — tylko te pola)”.
- Pytanie 6. Kiedy postać „nie ma jeszcze żadnej wprawy”?
  - Answer: a — zero wprawy w każdej umiejętności, żaden wykupiony stopień i zero wprawy zebranej w pętli zarobkowej, czyli śmierć bez wskrzeszenia nie zabrałaby jej niczego poza tym, co niosła. Przyjęty koszt: rozliczenie śmierci w pętli musi znać wprawę pętli, której `endLoopRun` dziś do `characterAfterDeath` nie podaje (`src/browser/sim/loop.ts:320`, rewizja `e6a95a9b`).
  - Not chosen:
    - b — liczy się tylko wprawa w umiejętnościach, bez zebranej w pętli — świeża postać, która przez pół nocy zbierała wprawę w pętli, przy śmierci nie zużyłaby wskrzeszenia i straciłaby tę wprawę, którą wskrzeszenie miało chronić.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „2 a”.
- Pytanie 7. Co robi śmierć postaci bez wprawy, gdy wskrzeszenie nie jest gotowe?
  - Answer: a — niczego w postaci nie zmienia, przy gotowym wskrzeszeniu ani bez niego: pokolenie zostaje, pętla idzie dalej jak po śmierci przykrytej wskrzeszeniem. Przyjęty koszt: zmienia się też zdanie D-190 o pokoleniu i hasło słownika `generation number`.
  - Not chosen:
    - b — zmienia się tylko zużycie gotowego wskrzeszenia, reszta jak dziś — świeża postać, która nic nie straciła, dostaje „pokolenie 2”, napis „straciła całą wprawę” w `danger`, a jej pętla staje.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „3 a”.
- Pytanie 8. Co pokazuje okno końca przejścia po śmierci postaci bez wprawy?
  - Answer: a — nową linię „Postać nie miała jeszcze wprawy, więc śmierć nie zużyła wskrzeszenia drużyny.” w `text-secondary` (słowo „drużyny” za odpowiedzią na pytanie 5, zgodnie z napisami z pytania 3). Przyjęty koszt: zmiana D-216 i jeden napis więcej.
  - Not chosen:
    - b — bez linii o wskrzeszeniu — gracz nie wie, czy wskrzeszenie poszło, dopóki nie zajrzy do postaci.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „4 a”.

## Context

- Połączone 14.11.2026 (Mariusz): to zadanie przejmuje w całości zadanie Śmierć postaci, która nie ma jeszcze żadnej wprawy, nie zużywa wskrzeszenia; pytania 5–8 pochodzą z niego. Powód: oba zmieniają tę samą funkcję śmierci, decyzję D-190, niezmiennik `resurrection-renewal` i hasło słownika `resurrection`, a zmiana kształtu stanu gry podbija wersję zapisu raz zamiast dwa razy.
- Źródła: the author's note on the scope of project 2, „Kierunek” 3 (szkic, nie zatwierdzona definicja projektu), i the author's note on the balance simulator, ustalenie 2.4 i działanie D2; zadanie jest niezależne.
- Śmierć postaci bez wprawy wybrano przy doprecyzowaniu zadania 9 MVP2 (pozycja 1c, Pierwsza mapa bez loterii — Skraj lasu z patykami i jagodami na każdym kafelku przed Lasem) jako osobne zadanie poza projektem, zamiast zmieniać definicję MVP2, która nie wymienia D-190 wśród zmienianych decyzji.
- Zadanie 10 MVP2 (the author's note of the task of the first action from the start) ma sprawić, że pierwsze przejście nowego konta da się wygrać; to zadanie chroni gracza, gdy mimo to zginie.
- Zarzewie opisuje the author's note on progression („Zarzewie”, karta D13); krytyka odradza je w the author's note with the critique of the progression proposal, sekcja 3.7.
- Świadomy koszt z zakresu: dochód dalej mnoży się przez liczbę postaci („trzy postacie zapełniają skrzynkę w dwie–trzy doby”).
- Zadanie o programach ze starych zapisów jest scalone 2026-11-14 (Wciąganie programów ze starych zapisów na uprawnienie i reset gry od zera do testów, PR #96), więc zależność `⛔ loop2-wciaganie-programow-ze-starych-zap` w linii zadania jest spełniona: serwer trzyma zapis, który zastąpił zapis wyższej wersji, jako poprzedni (D-399), a konto z uprawnieniem do poprzedniego zapisu (D-400) wciąga z niego programy przyciskiem na ekranie Programy, z zapisu każdej wersji od 1 do bieżącej (D-401).
- Do sprawdzenia przed wdrożeniem: czy konto Mariusza na serwerze testowym ma uprawnienie do poprzedniego zapisu. Nadanie go było działaniem człowieka z cyklu tamtego zadania; według doradcy dnia Mariusz przechodził je z sesją wdrożenia PR #96 (2026-11-14, 12:08–12:40), więc najpewniej je ma. Bez uprawnienia podbicie wersji zabiera mu programy, jak przy wersjach 4 i 5.
- Rewizja kodu niżej: `e6a95a9b`.
- Śmierć rozlicza `characterAfterDeath` i `settleDeath` (`src/browser/sim/game.ts:575-646`), w pętli `endLoopRun` (`src/browser/sim/loop.ts:300-376`), który podaje `characterAfterDeath` samą postać, bez wprawy zebranej w pętli (`src/browser/sim/loop.ts:317-320`).
- Doliczanie nieobecności idzie postać po postaci, każda przez cały czas nieobecności (`catchUp`, `src/browser/sim/loop.ts:560-608`), a otwarta gra minuta po minucie, w każdej minucie postacie w kolejności drużyny (`passLoops`, `src/browser/sim/loop.ts:520-558`; D-242).
- Pierwsze rozwiązanie mapy dopisuje ją do `solvedMaps` w funkcji, która przesuwa czas gry i nie zna zegara (`src/browser/sim/game.ts:829-830`); pętla chodzi tylko po mapie już rozwiązanej (D-243), więc pierwsze rozwiązanie zdarza się zawsze w przejściu ręcznym.
- Sposób rozliczenia śmierci stoi w stanie gry jako `deathSettlement` o rodzajach `resurrectionUsed` i `progressLost` (`src/browser/sim/saved-game.ts:798-835`); komentarz przy `SAVED_GAME_VERSION` każe podbić wersję przy każdej zmianie kształtu stanu gry (`src/browser/sim/saved-game.ts:74-80`).
- Napisy o wskrzeszeniu: wiersz przy postaci (`src/browser/view/team-lines.ts:69-90`, D-217), okno końca przejścia (`src/browser/view/end-window-lines.ts:95-101`, D-216), raport z nieobecności („wskrzeszenie zużyte”, `src/browser/view/away-report.ts:86`, bez zmiany: dopisuje je tylko przy zużytym wskrzeszeniu, więc po śmierci postaci bez wprawy go nie dopisze).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-190 — „A character's death takes what it carried and pays nothing of its map run; when the character has no resurrection ready, it also takes all its practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged. The programs, the chest, the Understanding and the solved maps survive every death; the map run kept on the screen stays as it was, and a „Restart” after a death with no resurrection ready starts from the character as that death left it. Each character has one resurrection, used up by a death and renewed after a span of real time set in the balance data, eight hours to start, and a death without one stops the character's earning loop.” *Rejected* holds: „a resurrection per map — ten solved maps would be ten free deaths, and the characters of a team would fight over the one; a resurrection as an item in the chest — set aside, not refused for good […]”.
  - Change made by this task: the account has one resurrection, shared by all its characters, in place of one per character: a death of any character with it ready uses it up, and until it is ready again a death of any character takes what a death with no resurrection ready takes. It is renewed after the span of real time in the balance data, eight hours to start, or at once by the first completion of a map the account has not solved yet, once per map; a ready resurrection stays ready. A death of a character with no practice yet — none in any skill, no rank of branch bought and none gathered at its earning loop — uses up no resurrection, whether one is ready or not, leaves the generation number as it was and does not stop the character's earning loop; like any death, it takes what the character carried and pays nothing of its map run (pytania 6 i 7). The rationale gains that a new character made for one risky try no longer escapes the stake of death; that the renewal at a first solving comes for a success, not ahead of each map, which is why it is not the rejected resurrection per map (pytanie 2); and that a resurrection used up by the death of a character with no practice would protect nothing, while the first death of a new character is near certain and would leave the team for the next eight hours without one (ustalenie 2.4 notatki o balansie). Zarzewie, a resurrection as an item carried in the backpack, is not made.
- D-220 — „A new character has generation number 1 and a ready resurrection.”
  - Change made by this task: a new character has generation number 1 and brings no resurrection of its own; a new game has the account's resurrection ready.
- D-240 — „The catch-up takes place when the player returns and advances the missed game minutes, taking the characters one at a time, each to the end, in the order of the player's list of characters. Characters meet only at the borders of map runs: an item reaches the chest when a map run completes, and the next map run takes what it finds there; when the chest has room for one character's loot only, the character earlier on the list takes it.”
  - Change made by this task: characters also meet at the shared resurrection: the death of each character in the catch-up finds the resurrection as the catch-up of the characters earlier on the list left it, so with one resurrection for two deaths the character earlier on the list takes it, even when it died later in real time (pytanie 1); the death of a character with no practice leaves the resurrection as it found it. Accepted with it: the report may show a character lower on the list losing everything earlier than a character higher on it died with the resurrection.
- D-242 — „[…] Each game minute has its own real moment, the loop clock's value plus the real time up to and including that game minute, and a death in it is settled at that moment, in the open game as in the catch-up. In the open game a reading passes its game minutes one after another, within each game minute the characters in the team's order, however many game minutes it brings.” — unchanged; in the open game the earlier death takes the shared resurrection, and of two deaths in one game minute the one of the character earlier in the team's order.
- D-217 — „The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie gotowe” in `text-secondary`, and while the resurrection is not ready „Wskrzeszenie za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger`, the time reading „za {m} min czasu realnego” below one hour. The minutes are rounded up to a whole minute before the split into hours and minutes.”
  - Change made by this task: the texts read „Wskrzeszenie drużyny gotowe” and „Wskrzeszenie drużyny za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie”, so that the player sees the resurrection is shared before a death shows it (pytanie 3).
- D-329 — its *Verification* reads: „complies: a character at a solved Las whose program picked takes patyk 6 and jagoda 4 showing from the top its name as a link, „Wskrzeszenie gotowe”, „Program:”, […]”.
  - Change made by this task: the example reads „Wskrzeszenie drużyny gotowe”, following the change of D-217 (pytanie 3).
- D-216 — „After a character's death, in the section of the end-of-run window (D-368) saying what it cost, until „Restart” or „Zakończ” and after a load too, a line stands: „Wskrzeszenie zużyte: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Następne wskrzeszenie po 8 godzinach czasu realnego.” in `text-secondary` when the death used up a resurrection, the hours coming from the balance data, and „Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.” in `danger` when no resurrection was ready.”
  - Change made by this task: the first line reads „Wskrzeszenie zużyte: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Następne wskrzeszenie, wspólne dla całej drużyny, po 8 godzinach czasu realnego albo po pierwszym rozwiązaniu nowej mapy.” (pytanie 3); after the death of a character with no practice yet, the line reads „Postać nie miała jeszcze wprawy, więc śmierć nie zużyła wskrzeszenia drużyny.” in `text-secondary`, in place of the two lines above (pytanie 8); after a completion that renewed a used-up resurrection, the end-of-run window shows „Wskrzeszenie odnowione: pierwsze rozwiązanie tej mapy.” in `text-secondary`, until „Restart” or „Zakończ” and after a load too — in this decision or in the decision of the window that the cycle's search of the foundation finds fitting (pytanie 3).
- D-386 — „A moment of real time that the game state stores, the save time and the moment a character's resurrection is ready, is a safe integer of milliseconds of any sign, which the load takes without comparing it with any clock; […]”
  - Change made by this task: „the moment a character's resurrection is ready” becomes the moment the account's resurrection is ready.
- D-219 — „The browser's clock counts the renewal of a resurrection, so the renewal runs in real time at every pace of a map run and while the game is closed.” — unchanged; the renewal at a first solving adds no other clock.
- D-189 — rationale: „Accepted with it: practice taken is safe from a later death that a resurrection covers, and a death with none takes it with the rest of the character's practice (D-190).” — unchanged: a character that took practice has practice, so the rule for a character with no practice does not reach it.
- D-206 — „A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one. The game discards a saved game state of any other version, loading none of it as a game, and starts the player anew; the server keeps the document that a save of a higher version replaces as the previous save (D-399), and an account with the previous-save privilege (D-400) can append its programs one by one (D-401). […]” — unchanged; the task raises the version (pytanie 4).

## Settlements to record

Candidates: 0 shown, 0 accepted — 2026-11-14

none

## Out of scope

- Zarzewie, czyli wskrzeszenie jako przedmiot wytwarzany i noszony w plecaku.
- Wiersz wskrzeszenia przy postaci bez wprawy nie dostaje osobnego brzmienia: stoi przy niej ten sam wiersz wskrzeszenia drużyny co przy innych postaciach (punkt 7).
