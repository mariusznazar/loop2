---
title: Ustalić wygląd przycisków głównych i zakładek i poprawić nimi kartę logowania, przed zadaniem 4 planu MVP2
status: draft
created: 2026-11-02T20:36
updated: 2026-11-02
tags: [zadanie]
related: "[[(P) Loop]]"
---

# Wygląd głównego przycisku i zakładek w wytycznych oraz na karcie logowania

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — przyciski-i-zakladki

## Description

### Need

- Na karcie logowania główny przycisk formularza wygląda jak każdy inny, a zakładki „Zaloguj się” i „Załóż konto” są zrobione z takich samych przycisków. Mariusz przy przechodzeniu karty na serwerze testowym: „zakładki zaloguj się/załóż konto zrobione buttonami kolidują z CTA, chyba brakuje nam wytycznych UX/UI trochę / do tego wypadałoby odróżnić główny cta od nie pamiętam hasła / wróć do logowania itp. / ale nie wiem czy nie zostawić tego do backlogu po prostu do rozkminy; na pewno jest o niebo lepiej niż było”.
- Przyczyna leży w wytycznych, nie w samej karcie: `guidelines/styleguide-browser-view.md` zna tylko przycisk zwykły, niszczący i wybrany w grupie.
- Zdanie po prośbie o odnośnik do zmiany hasła ginie na karcie. Mariusz: „kurcze wszystko jest białe albo szare, taki komunikat powinien być wyróżniony w jakiś sposób - to też będzie do dopracowania - a już po zalogowaniu było na zielono”.
- Moduły w DOM czekające na przejście na React mają w `guidelines/coding-browser-module.md` status `copy`, czyli „wolno kopiować”, więc agent może wziąć je za wzór nowego ekranu. Mariusz o tym: „dopisz do zaparkowanego zadania”.
- Karta jest wzorcem kolejnych ekranów w React, więc bez tego zadania zadania 4, 5 i 6 planu powielą ten sam układ.

### To do

1. Przycisk wysyłający formularz ma w każdym formularzu wygląd głównego przycisku według pytań 1 i 1a, w obu postaciach, bez nowego parametru.
2. „Nie pamiętam hasła”, „Wróć do logowania” i „Anuluj” są akcjami pobocznymi według pytań 1, 1a i 1b. To nowy rodzaj wspólnej kontrolki: stoi w obu postaciach, z przypadkiem w teście porównującym (D-265).
3. Przełącznik karty ma wygląd zakładek według pytań 2, 2a i 2c. Zostaje odmianą przycisku wybranego w grupie, z tym samym elementem i `aria-pressed`, w obu postaciach; przyciski tempa zostają przy dzisiejszym wyglądzie przycisku wybranego.
4. Zdanie po prośbie o odnośnik stoi w `text` z belką po lewej według pytania 3.
5. Karta ma stały górny brzeg według pytania 4, a komentarz przy `.account-card-screen` w `src/browser/styles.css` przestaje mówić o środku.
6. Komentarz przy `createFormNote` przestaje obiecywać ogłoszenie zdania (pytanie 3a).
7. `--bar-width` w `src/browser/tokens.css` zachowuje wartość 2 px, a jego `Source:` obejmuje też belkę zdania i linię zakładki, ze źródłem: wybór Mariusza z podglądu wariantów karty, 2026-11-02, w tym zadaniu.
8. `guidelines/styleguide-browser-view.md` dostaje główny przycisk, akcję poboczną i zakładkę: ich wygląd, stany, gdzie obowiązują (pytania 1b i 2b), znak bieżącej pozycji menu, zasadę z pytania 3b oraz wpisy na liście kontrolek odstępujących od stanów; zdanie po prośbie stoi tam w `text` z belką, a sformułowania z `text-secondary` przy tym zdaniu znikają. Zmiany idą przez `the-way-maintain-styleguide`.
9. Strona wszystkich stanów pokazuje w postaci DOM (D-269) główny przycisk, akcję poboczną, zakładki i zdanie po prośbie, w każdym ich stanie albo z powodem, że stan nie dotyczy.
10. `guidelines/coding-browser-module.md` dostaje status `do not copy` przy 17 plikach wymienionych w *Context* i trzy dopiski z pytania 5, bez pełnego audytu (pytanie 5a).
11. Fundament dostaje wiersze *Settlements to record* oraz zmiany D-44 i D-222 (pytanie 3, akcja poboczna na liście kontrolek), D-40 (przykład w *Verification*: wybór zakładki pokazuje linia) i D-265 (reguła o nowym ekranie).
12. Prośba o scalenie zawiera zrzuty wszystkich stanów karty na obrazie gry (pytanie 6b).

### Questions to settle

- Pytanie 1. Jak wygląda główny przycisk formularza i czym różni się od akcji pobocznych?
  - Answer: Główny przycisk bez wypełnienia: jasna ramka i mocny tekst, jak główny przycisk starego Loop. Akcje pod formularzem „Nie pamiętam hasła”, „Wróć do logowania” i „Anuluj” są podkreślonym tekstem bez ramki. W kodzie zostają przyciskami, bo zmieniają stan karty i nie mają adresu. Główny jest przycisk, który wysyła formularz, jeden na formularz; rozpoznaje go istniejące oznaczenie przycisku wysyłającego, więc główny nie jest nową kontrolką.
  - Not chosen:
    - zostawić wszystko — cztery podobne przyciski, a kolejne ekrany powielą ten układ
    - główny bez zmian, poboczne jako tekst — w formularzu „Załóż konto” nie ma akcji pobocznej, więc tam nic by się nie zmieniło
    - A, jasne wypełnienie i ciemny napis — najmocniejsza różnica, ale trzy nowe wpisy kolorów, zmiana reguł koloru i testu kontrastu oraz rozjazd z wpisami definicji; wzór tylko w GOV.UK, na ciemnym fragmencie jasnej strony
    - B, zielone wypełnienie i ciemny napis — koszt jak A, zieleń zaczyna znaczyć dwie rzeczy, a kolor pod kursorem nie istnieje w grze
    - zostawić poboczne jako zwykłe przyciski — rekomendacja sprzed uwagi Mariusza; bez nowego wyglądu, ale hierarchia wisi wtedy na samym głównym przycisku
  - Source: human, 2026-11-02, „mi się raczej wydaje, że nie pamiętam hasła zwyle robi się w formie klikalnego tekstu” i „poboczne jako tekst, główny C”.
- Pytanie 1a. Jakie stany mają główny przycisk i akcja poboczna?
  - Answer: Główny, spoczynek: tło karty, tekst w `text-strong` o wadze `--font-weight-emphasis`, ramka w kolorze tego tekstu (`currentColor`), bez nowej roli. Główny, pod kursorem: tło `highlight`, ramka i tekst bez zmian. Główny, czekanie na serwer: wygląda jak dziś każdy wyłączony przycisk, czyli tekst w `text-disabled`, waga zwykła, ramka w `control-border`. Poboczna, spoczynek: bez ramki, tekst w `text-secondary`, podkreślony, bez odstępów po bokach, żeby zaczynał się równo z polami. Poboczna, pod kursorem: tekst w `text`, tło bez zmian. Poboczna, wyłączona: tekst w `text-disabled`. Fokus obu: wspólna obwódka (D-47). Stany error i empty nie dotyczą obu, jak przycisku.
  - Source: human, 2026-11-02, „tak zgadzam się na rekomendacje”, na tabelę stanów pokazaną w rozmowie. Ramka w kolorze tekstu zastąpiła ramkę w `selected` z podglądu, bo `selected` znaczy tylko „wybrane w swojej grupie”.
- Pytanie 1b. Gdzie obowiązuje akcja poboczna jako tekst i co z głównymi działaniami poza formularzem?
  - Answer: Tekst dostają wyłącznie akcje, które otwierają albo opuszczają stan formularza, stojące pod formularzem; reszta gry zostaje przy zwykłych przyciskach. Główny wygląd obejmuje tylko przycisk wysyłający formularz; o głównych działaniach poza formularzami, jak „Wejdź”, rozstrzyga zadanie ich ekranu.
  - Not chosen:
    - wszędzie, gdzie akcja jest poboczna — agent sam ocenia, co jest poboczne, więc ekrany się rozjadą, a „Usuń” albo „Zakończ” mogłyby wyglądać na niewinny odnośnik
  - Source: human, 2026-11-02, „tak zgadzam się na rekomendacje”, w odpowiedzi na pytanie kontrolne zakotwiczone w notatce zadania: „plik karty jest wzorcem dla następnych ekranów w React”.
- Pytanie 2. Jak wyglądają zakładki?
  - Answer: Podkreślenie jasne: zakładki bez ramek, wybrana ma mocny tekst i grubą jasną linię w `selected`, niewybrana szary tekst, a pod całością stoi cienka linia. Zostaje przełącznik „Zaloguj się” / „Załóż konto”, więc D-96 i D-259 się nie zmieniają.
  - Not chosen:
    - podkreślenie zielone, jak bieżąca pozycja menu w starym Loop — zieleń jest dziś kolorem tekstu i znaczy „działa albo jest aktywne”, nie „wybrane”
    - zakładka zrośnięta z formularzem — ramka wewnątrz karty, która już jest ramką, mniej miejsca na pola, inne tło zakładki niewybranej
    - bez zakładek, „Załóż konto” jako tekst pod formularzem — zmiana D-96, D-259 i wpisu definicji, stan „Załóż konto” potrzebuje nagłówka i drogi powrotu, wytyczne nie dostają zakładek, gracz nie widzi od razu dwóch dróg na równi
    - zostawić — dwa „Zaloguj się” nad sobą w tym samym wyglądzie
  - Source: human, 2026-11-02, „niech będzie 1”.
- Pytanie 2a. Jak zakładka działa z klawiatury?
  - Answer: Zakładka jest odmianą przycisku wybranego w grupie: klawisz Tab przechodzi przez obie, Enter albo Spacja przełącza, a fokus trafia do pola adresu (D-260). Element i atrybut `aria-pressed` zostają; „zakładka” w wytycznych znaczy wygląd. Zadanie, które będzie potrzebować strzałek, dopisze je samo.
  - Not chosen:
    - prawdziwe zakładki ze strzałkami i aktywacją Enterem — ręczna obsługa klawiatury w obu postaciach (D-265) i testy, a D-42 tego nie wymaga; W3C i Carbon zalecają przy szybkim panelu przełączanie od razu strzałką, co tu skasowałoby wpisany tekst
  - Source: human, 2026-11-02, „tak”, na trzy rekomendacje pokazane razem.
- Pytanie 2b. Co dostaje pasek menu z zadania 4?
  - Answer: Ten sam znak bieżącej pozycji: mocny tekst i ta sama linia u dołu. Sam pasek, jego elementy i odnośniki buduje zadanie 4.
  - Not chosen:
    - zadanie 4 ustala samo, gdy będzie widać pasek — druga rozmowa o wyglądzie, a zadanie 4 traci główny powód, żeby czekać na to zadanie
  - Source: human, 2026-11-02, „tak”, na trzy rekomendacje pokazane razem. Znany koszt: NN/g radzi odróżniać wyglądem nawigację od zakładek.
- Pytanie 2c. Jakie stany ma zakładka?
  - Answer: Wybrana, spoczynek: tekst w `text-strong` o wadze `--font-weight-emphasis`, linia dolna w `selected`, 2 px. Niewybrana, spoczynek: tekst w `text-label`, jak nieaktywne zakładki starego Loop. Pod kursorem: tło `highlight`. Formularz czeka na serwer: tekst w `text-disabled`, linia wyboru zostaje. Fokus: wspólna obwódka (D-47). Error i empty nie dotyczą, jak przycisku. Tekst w `--font-size-body`. Cienka linia pod całością w `divider`. Napisy zostają: „Zaloguj się” i „Załóż konto”.
  - Not chosen:
    - rzeczowniki „Logowanie” i „Nowe konto” — zmiana D-96, D-259 i wpisu definicji, a „Logowanie” zderza się z napisem czekania „Logowanie…”
  - Source: human, 2026-11-02, „tak”, na trzy rekomendacje pokazane razem.
- Pytanie 3. Jak wyróżnić zdanie po prośbie o odnośnik, nie obiecując wysyłki?
  - Answer: Zdanie stoi w `text` (treść do przeczytania), z belką po lewej w kolorze tego zdania (`currentColor`), o grubości `--bar-width`. Bez nowego koloru. Zmieniają się D-222 i D-44, które dziś każą mu stać w `text-secondary`. Reguła dotyczy spokojnego zdania pod formularzem, czyli dziś tylko tego jednego; „Wysłaliśmy odnośnik potwierdzający na …” w nagłówku zostaje bez zmian.
  - Not chosen:
    - szary tekst z belką — najtaniej, decyzje zostają prawdziwe, ale tekst zostaje szary
    - sam jaśniejszy tekst — wyróżnia się tylko wobec dzisiejszej szarości
    - najjaśniejszy tekst z belką — ten kolor jest w grze dla nazw i nagłówków, a to dwa pełne zdania
    - ciemne pole z belką — tło strony zaczyna znaczyć coś więcej, a blok przypomina pole do wpisania
    - własny kolor — szósty kolor sygnałowy, nowa decyzja, wartość do wskazania, nowe progi kontrastu i test
    - zieleń — nie zdradzałaby konta, ale twierdziłaby, że wiadomość wyszła
    - pomarańczowy — mówiłby, że coś się nie udało
  - Source: human, 2026-11-02, „może być c”. Znany koszt: zdanie zostaje w bieli i szarości, co Mariusz zgłosił, a GOV.UK ostrzega, że belka bywa przeoczana na gęstych stronach.
- Pytanie 3b. Jak ramka głównego przycisku, belka zdania i tekst akcji pobocznej mieszczą się w znaczeniach ról?
  - Answer: Wytyczne dostają jedną zasadę: linia przy tekście bierze kolor tego tekstu, więc ramka głównego przycisku i belka zdania są częścią tekstu, a D-40 zostaje bez zmian. Wzorem jest ramka błędnego pola w kolorze jego komunikatu. Tekst akcji pobocznej w `text-secondary` jest dopiskiem, jak „Autorzy grafiki” na tej samej karcie. Belka zdania bierze dlatego kolor zdania, a nie `text-secondary` z podglądu.
  - Not chosen:
    - nic nie zapisywać — sprawa wypłynie w przeglądzie zmiany i cykl może stanąć
    - zmienić D-40 — D-40 dołącza do rozjazdu z definicją, plan dostaje kolejny wpis, a zadanie 11, które pisze tę decyzję, musi o nim pamiętać
  - Source: human, 2026-11-02, „ok”, na uwagę krytyka planu o zdaniu D-40 „Each of the five stands as text”.
- Pytanie 3a. Czy zmienić sposób, w jaki zdanie trafia do czytnika ekranu?
  - Answer: Nie. Komentarz przy `createFormNote` w `src/browser/view/controls/text-field.ts:130` przestaje obiecywać ogłoszenie zdania, a element zostaje jak jest.
  - Not chosen:
    - zostawić bez zmian — komentarz dalej obiecuje coś, czego kod prawdopodobnie nie robi
    - zmienić element, żeby stał pusty i widoczny przed wstawieniem zdania — zmiana obu postaci, testu porównującego, próbki na stronie wszystkich stanów i sprawdzeń pustych komunikatów, przy niepewnym zysku, bo powrót fokusu w tej samej aktualizacji może przerwać ogłoszenie
  - Source: human, 2026-11-02, „tak”, na stały górny brzeg i sam komentarz.
- Pytanie 4. Czy poprawić ucieczkę „Autorzy grafiki” spod kursora?
  - Answer: Tak. Karta ma stały górny brzeg w 15% wysokości okna zamiast dokładnego środka, więc rozwinięcie wzmianek, przełączenie zakładki i pojawienie się zdania pod formularzem nic nad nimi nie przesuwa. Układ w poziomie zostaje.
  - Not chosen:
    - zostawić — skoki zostają: 96 px „Autorów grafiki” i 8 px zakładek przy oknie 1280 × 800
    - rozwijać wzmianki poza kartą — nowy element z własnym tłem, a skoki zakładek i formularza zostają
  - Source: human, 2026-11-02, „tak”, na stały górny brzeg i sam komentarz. Znany koszt: na wysokim oknie karta stoi wyraźnie wyżej niż środek. To zmienia odpowiedź z zadań 2 i 3, że karta stoi na środku okna; żadna decyzja fundamentu tego nie mówi. Pomiar 2026-11-02: przy tej regule zakładki i „Autorzy grafiki” nie przesuwają się, a karta z rozwiniętymi wzmiankami kończy się na 682 px przy oknie 1280 × 800.
- Pytanie 5. Które pliki dostają `do not copy` i co ten status znaczy dla nich?
  - Answer: `do not copy` dostaje 17 plików budujących elementy przez API DOM, wymienionych w *Context*. `copy` zostaje przy `account-rules.ts`, `clock.ts`, `credits.ts`, `password-reset.ts`, `terrain-picture.ts`, `credits-section.tsx`, które nie rysują ekranu w DOM, i przy plikach `controls/`, bo nowa kontrolka ma obie postaci (D-265). Wytyczne dostają trzy dopiski: nowy ekran nie powstaje na wzór tych plików, co zapisuje też D-265; status nie zakazuje importowania ich czystych funkcji; przykłady z `status-row.ts`, `app.ts` i `game-view.ts` dotyczą utrzymania ekranu, który zostaje w DOM.
  - Source: human, 2026-11-02, „akceptuję”; kierunek: „dopisz do zaparkowanego zadania”.
- Pytanie 5a. Czy statusy idą przez pełny audyt kodu, którego skill `the-way-maintain-coding-guidelines` wymaga przy odświeżeniu wytycznych?
  - Answer: Nie. To świadome odstępstwo od kroków skilla: zmienia się kolumna jednej tabeli i trzy dopiski, a pozostałych rodzajów kodu nikt teraz nie przegląda.
  - Not chosen:
    - pełny audyt z próbnym przebiegiem narzędzi — dużo większa robota, niezwiązana z kartą, a decyzji o statusach by nie zmieniła
  - Source: human, 2026-11-02, „akceptuję”. Znany koszt: nic później nie wymusza tego spojrzenia.
- Pytanie 5b. Czy reguła o nowym ekranie obejmuje nową sekcję ekranu, który jeszcze jest w DOM?
  - Answer: Nie. Reguła dotyczy tylko nowych ekranów: dokładka do starego ekranu może powstać w DOM, a przenosi ją dopiero zadanie tego ekranu.
  - Not chosen:
    - reguła obejmuje też nowe sekcje — na jednym ekranie stoją obie technologie, a React wymaga osobnego miejsca zamontowania w DOM, więc małe dokładki robią się drogie
  - Source: human, 2026-11-02, „tak”, na pytanie kontrolne zakotwiczone w D-265: „a screen no task has moved to React yet stays in those APIs on the DOM form”. Znany koszt: stare ekrany mogą jeszcze urosnąć, więc ich późniejsze przejście na React jest większe.
- Pytanie 6. Co z wpisem definicji, któremu zadanie przeczy?
  - Answer: Definicja zostaje bez zmian, a rozjazd stoi w dzienniku planu: projektowany D-44 nie zna akcji pobocznej jako tekstu i każe zdaniu po prośbie o odnośnik stać w `text-secondary`, więc zadania 4, 5 i 24 biorą te dwa miejsca z bieżącego fundamentu, z tą decyzją człowieka. Inne wpisy projektowane się nie rozjeżdżają, bo wariant C nie dokłada ról, a nowe użycia istniejących ról rozstrzyga pytanie 3b.
  - Not chosen:
    - nic nie zmieniać — zadanie 24 zapisze stare brzmienie i po cichu cofnie to, co ustala to zadanie
    - zmienić definicję — ponowne zatwierdzanie i sprawdzenie całego planu, a do jego końca żadne zadanie nie może zostać gotowe do cyklu, za dwa miejsca w jednym wpisie
  - Source: human, 2026-11-02, „tak”. Znany koszt: definicja dalej mówi co innego, a zadania 4, 5 i 24 muszą przeczytać wpis w dzienniku; to wyjątek od zasady Mariusza, że przyjęta zmiana wraca do dokumentu, który nosi decyzję.
- Pytanie 6a. Jak zadanie wchodzi do planu?
  - Answer: Praca mieści się w zatwierdzonym zakresie. Numer 27, nazwa `przyciski-i-zakladki`, pozycja zakresu 19, zadanie nieprzygotowawcze. Cel: „Na karcie logowania główny przycisk ma jasną ramkę i mocny tekst, akcje pod formularzem są podkreślonym tekstem, zakładki mają linię u dołu, zdanie po prośbie o odnośnik stoi jaśniej z belką, a rozwinięcie wzmianek niczego nie przesuwa.” Zadanie 27 zależy od 2 i 3, a zadanie 4 zależy od 27.
  - Not chosen:
    - przenumerowanie zadań, żeby numer szedł w kolejności pracy — rozjechałoby się ze wszystkimi notatkami, które mówią „zadanie 4”
  - Source: human, 2026-11-02, „tak”. Podstawa zakresu: cel definicji „ładnym logowaniem”, pozycja zakresu 19 i *Deliverables*: „przewodnik stylu widoku i wytyczne kodowania widoku uzupełnione o to, co ten projekt ustala”.
- Pytanie 6b. Jak człowiek sprawdza zmianę?
  - Answer: Bez osobnego kroku na serwerze. Agent wkleja do PR-a zrzuty wszystkich stanów karty, a człowiek ogląda je przed scaleniem; uwaga po scaleniu idzie kolejnym PR-em.
  - Not chosen:
    - oglądanie na serwerze testowym przed scaleniem, jak w zadaniach 2 i 3 — wymaga wdrożenia commita gałęzi, a zmieniają się tylko wygląd i wytyczne
  - Source: human, 2026-11-02, „tak”.

## Context

- Karta na `main` po scaleniu PR #52 (commit `6864463`): `src/browser/view/account-card.tsx`, style `src/browser/styles.css:254`, `:287`, `:300`.
- Podgląd wariantów powstał z prawdziwych stylów gry i obrazu z zadania 3. Jest materiałem do wyboru, nie specyfikacją; wygląd opisują odpowiedzi w *Questions to settle*.
- Badania, po niezależnej krytyce, stoją w `.runs/styleguide/browser-view/` repozytorium: `button-hierarchy.md`, `tabs-semantics-and-look.md`, `neutral-status-message.md`.
- Stary Loop: główny przycisk to jasna ramka i jasny tekst (`C:\Storage\repos\loop\src\components\probe\LoopBlock.tsx:22`), bieżąca pozycja menu ma zieloną linię u dołu (`GameMenu.tsx`), zakładki katalogu są obramowanymi przyciskami (`MapCatalog.tsx:194`).
- Przycisk wysyłający formularz ma już odrębny atrybut w obu postaciach: `src/browser/view/controls/button.ts:29`, `react-button.tsx:47`.
- Odpowiedź serwera na prośbę o odnośnik wychodzi, zanim serwer zacznie pracę nad kontem, więc gdy zdanie się pojawia, wiadomość może jeszcze nie wyjść. Zmiana czasu w zdaniu nie należy do tego zadania.
- Audyt obejmuje kartę logowania, bo jej dotyczy zadanie; pozostałych ekranów nie oglądano.
- Audyt obejrzał na działającej grze 2026-11-02: cztery stany karty, odnośnik `#reset-password=` wprost z adresu, „Sprawdzanie logowania…” przy przeładowaniu i fokus klawiatury. Nie sprawdzono czytnikiem ekranu.
- Pliki ze statusem `do not copy`, z pierwszym miejscem budowania elementów, commit `799d1ff`: `src/browser/view/app.ts:99`, `away-report.ts:118`, `body-row.ts:64`, `character-skills.ts:54`, `combat-line.ts:86`, `email-confirmation.ts:96`, `email-status.ts:67`, `footer.ts:46`, `game-view.ts:94`, `headquarters.ts:172`, `program-editor.ts:631`, `program-panel.ts:191`, `status-row.ts:172`, `terrain-panel.ts:19`, `tile-list.ts:104`, `trip-editor.ts:47`, `trip-lines.ts:112`.
- The audit's list; places 1 to 4 are its top.
- 1 — `medium` — Gość nie widzi na karcie, który przycisk jest główny, a kolejne ekrany powielą ten układ.
  - Category: a missing shared component
  - Places: `src/browser/view/account-card.tsx:251`, `src/browser/styles.css:136`, `guidelines/styleguide-browser-view.md:198`
  - Fix: Przycisk wysyłający formularz dostaje własny wygląd, a akcje pod formularzem wygląd tekstu.
  - Removes: 4 formularze karty i wzór dla kolejnych ekranów
  - Reaches: `several parts`
  - Checked: `account-card.tsx:251`, cztery stany na działającej grze: główny przycisk ma ten sam wygląd co „Nie pamiętam hasła”; stoi pierwszy, bo usuwa najwięcej.
  - Taken: *To do* 1, 2
- 2 — `medium` — Gość widzi dwa „Zaloguj się” nad sobą w tym samym wyglądzie i nie wie, co przełącza, a co wysyła.
  - Category: a missing shared component
  - Places: `src/browser/view/account-card.tsx:584`, `src/browser/styles.css:287`
  - Fix: Przełącznik dostaje wygląd zakładek.
  - Removes: 1 przełącznik
  - Reaches: `several parts`
  - Checked: `account-card.tsx:584`, stan logowania na działającej grze: zakładka i przycisk wyglądają jednakowo.
  - Taken: *To do* 3
- 3 — `medium` — Gracz po prośbie o odnośnik łatwo przeocza odpowiedź, bo stoi tym samym szarym co opisy.
  - Category: a meaning
  - Places: `src/browser/styles.css:231`, `src/browser/view/account-card.tsx:258`
  - Fix: Zdanie stoi jaśniej, z belką po lewej.
  - Removes: 1 zdanie
  - Reaches: `several parts`
  - Checked: `styles.css:231`, stan po prośbie na działającej grze: zdanie ma kolor zdania o grze nad formularzem.
  - Taken: *To do* 4
- 4 — `medium` — Gracz chybia drugim kliknięciem, bo sekcja „Autorzy grafiki” ucieka spod kursora o 96 px, a zakładki przesuwają się o 8 px.
  - Category: accidental architecture
  - Places: `src/browser/styles.css:261`
  - Fix: Karta ma stały górny brzeg.
  - Removes: 3 skoki: wzmianek, zakładek i formularza
  - Reaches: `one file`
  - Checked: `styles.css:261`, pomiar przy oknie 1280 × 800: 543 → 447 px i 319 → 311 px; przy stałym brzegu bez przesunięcia.
  - Taken: *To do* 5
- 5 — `light` — Gracz z czytnikiem ekranu może nie usłyszeć zdania pod formularzem.
  - Category: accidental architecture
  - Places: `src/browser/view/controls/react-text-field.tsx:112`, `src/browser/view/controls/text-field.ts:130`
  - Fix: Element stoi pusty i widoczny, zanim dostanie zdanie.
  - Removes: 1 element w dwóch postaciach
  - Reaches: `one part`
  - Deferred: below the top; pytanie 3a, zmienia się tylko komentarz
- 6 — `light` — Właściciel utrzymuje trzy wartości, których żaden styl nie czyta.
  - Category: a missing design token
  - Places: `src/browser/tokens.css:56`, `:66`
  - Fix: Usunąć tokeny bez odbiorcy albo zostawić je ze źródłem.
  - Removes: 2 tokeny; `--bar-width` dostaje odbiorcę w *To do* 7, a `--player-change` czyta strona wszystkich stanów
  - Reaches: `one file`
  - Deferred: below the top
- Sprawdzenie nie wycofało ani nie obniżyło żadnej przyczyny.
- Czego audyt nie mógł zobaczyć: zachowania czytnika ekranu i pozostałych ekranów gry.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Wpisy obecne cytuje `foundations/decisions.md` przy loop2 `799d1ff`. Wpis projektowany cytuje `definicja_mvp2_loop2.md` (odcisk 8de9ffff).

### Wpisy, które zadanie zmienia

- D-44 — Which controls do the screens of the browser view build on?: „The screens of the browser view build every button, select list, number field and text field from the six shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the select list, the number field and the text field”; „the answer to a request for a password-reset link (D-222) appears in that place in `text-secondary`”.
- D-222 — What does a request for a password-reset link answer?: „the page then shows „Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.” in `text-secondary` under the form „Nie pamiętam hasła””.
- D-40 — What do the neutral roles of the browser view mean? (*Verification*): „complies: the date of a row written in `text-label`; the button chosen in a group framed in `selected` with its text in `text-strong`; a button under the pointer on the background `highlight`, its frame and its text role unchanged”.
- D-265 — How does a shared control stand in a screen built with React while other screens stay in DOM?: „Until its last screen in the browser's DOM APIs moves to React, a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function, drawing one tree of DOM elements with the same classes and attributes, and a screen no task has moved to React yet stays in those APIs on the DOM form.”

### Wpis projektowany, któremu zadanie przeczy

- D-44 (definicja, pisze zadanie 24, realizują zadania 4, 5 i 24): „the seven shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the select list, the number field, the text field and the pick cell”; „the answer to a request for a password-reset link (D-222) appears in that place in `text-secondary`”. Zadanie nie urzeczywistnia tego wpisu; rozjazd rozstrzyga pytanie 6.

### Wpisy, które zadanie stosuje bez zmiany

- D-39 — What do the signal colours of the browser view mean?: „`positive` means that something works, is in order or is active now”.
- D-40 (fragment): „`selected` that this is the one chosen in its group”, „`text-strong` means a name, heading or value looked at first, `text` content to read, `text-secondary` a description, explanation or note, `text-label` the name of a field or section, or a date, and `text-disabled` that this cannot be used now”.
- D-42 — Which accessibility requirements does the browser view keep?: „keeps three success criteria of WCAG 2.2 […] 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast and 2.4.7 Focus Visible”.
- D-43 — What counts in the browser view as a value written in place of a design token?, D-48 — How are the design tokens of the browser view named?: nowe wartości wyglądu czytają istniejące tokeny; `15%` wysokości okna i `vh` nie są wartością wpisaną zamiast tokenu.
- D-45 — Where does the browser view's kitchen-sink page stand?: „The page shows every shared control in each of its states or the reason a state does not apply, every role, and samples of tiles in each state”.
- D-47 — Which elements of the browser view are controls, and how does their focus show?: „One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`”.
- D-96 — What does a player see before and after signing in? (fragment): „a switch between „Zaloguj się” and „Załóż konto””, „with the button „Nie pamiętam hasła””.
- D-259 — Which state does the login card open on, and what stands above its fields in each state?: „The switch stands only in „Zaloguj się” and „Załóż konto””.
- D-260 — What does the switch of the login card do to what the visitor typed?: „A change of state at the switch of the login card empties every field and removes every message of the card's forms and moves focus to the address field of the form it opened”.
- D-269 — Does the kitchen-sink page hold React?: „it shows each shared control in its DOM form”.
- D-272 — Where may a picture of the game stand?: „text stands on a solid background, never on a picture”.

## Settlements to record

Candidates: 13 shown, 8 accepted — 2026-11-02

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Główny przycisk to przycisk wysyłający formularz, jeden na formularz: jasna ramka w kolorze mocnego tekstu, bez wypełnienia; działania poza formularzem nie są nim objęte. | decision | Pytania 1, 1a i 1b | Czy „Wejdź” ma ten wygląd i czy główny przycisk dostaje własną rolę koloru. |
| 2 | Akcja, która otwiera albo opuszcza stan formularza i stoi pod nim, jest podkreślonym tekstem bez ramki; reszta gry zostaje przy zwykłych przyciskach. | decision | Pytania 1, 1a i 1b | Czy podkreślony tekst wolno stawiać na ekranach gry, na przykład przy „Usuń”. |
| 3 | Zakładka jest odmianą przycisku wybranego w grupie: wybór pokazuje linia u dołu, a obsługa klawiatury zostaje jak przy przycisku. | decision | Pytania 2, 2a i 2c | Czy zakładki dostają strzałki i role zakładek, a linia kolor `selected` czy inny. |
| 4 | Bieżącą pozycję paska menu znaczy ten sam mocny tekst i linia u dołu co zakładkę. | decision | Pytanie 2b | Zadanie 4 wybrałoby znak bieżącej pozycji od nowa. |
| 5 | Karta logowania ma stały górny brzeg w 15% wysokości okna, nie dokładny środek. | decision | Pytanie 4 | Czy następna zmiana karty przywróci środek i skoki. |
| 6 | Zdanie po prośbie o odnośnik stoi jaśniej, w `text`, z belką po lewej, nigdy na zielono, bo zieleń twierdziłaby, że wiadomość wyszła. | decision | Pytanie 3 | Czy kolejny ekran z taką odpowiedzią weźmie zieleń, a D-222 i D-44 dalej każą pisać ją szarym. |
| 7 | Nowy ekran nie powstaje na wzór modułów w DOM; ich czyste funkcje wolno importować, a dokładka do ekranu, który jeszcze jest w DOM, może powstać w DOM. | decision | Pytania 5 i 5b | Czy nowy ekran w DOM jest dopuszczalny, skoro D-265 pozwala ekranom zostać w DOM. |
| 8 | Linia przy tekście bierze kolor tego tekstu, więc ramka albo belka są częścią tekstu i nie zmieniają znaczenia jego roli. | decision | Pytanie 3b | Czy ramka głównego przycisku i belka zdania łamią zdanie D-40 „stands as text”. |

## Out of scope

- Pasek menu i jego elementy buduje zadanie 4.
- Wygląd przycisków niszczących zmienia zadanie 24.
- Zmiana czasu w zdaniu po prośbie o odnośnik i element, który je ogłasza czytnikowi.
- Zdanie „Wysłaliśmy odnośnik potwierdzający na …” w nagłówku.
- Pełny audyt kodu i pozostałych ekranów.
