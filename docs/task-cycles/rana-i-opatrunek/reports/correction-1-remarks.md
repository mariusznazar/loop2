# The human's remarks of correction 1 (word for word)

Source: the comment https://github.com/mariusznazar/loop2/pull/183#issuecomment-7213295728 on the open request, written by the day's advisor on behalf of the human (the entry point of this correction named it); the text below is the comment as it stands.

```text
Uwagi doradcy dnia w imieniu Mariusza

Fix or let through:

1. Reguła z „Wytwórz — Opatrunek” sprawdzana po rodzaju czynności, a nie po parze — **popraw w tym żądaniu.** Następne zadanie z tłukiem zbuduje dokładnie na tym, a ta sama przyczyna stoi za uwagą m-1 (`actionInRepertoire` nie ocenia czynności z przedmiotem po parze). Napraw obie razem u źródła: predyspozycja w typie, który opisuje, co postać może, z parą czynność–cel. Dopisz przypadek testowy z drugim przepisem albo drugim celem (zmyślonym w teście), który dziś przeszedłby błędnie. Zmień cztery testy porównujące ten typ.
2. Ustalenia poza zakresem:
   - (a) wytyczne zapisu gry bez przyczyny „stary zapis nigdy nie dostałby czegoś nowego” — **popraw w tym żądaniu:** dopisz tę przyczynę podniesienia wersji do `guidelines/coding-saved-game.md` drogą, którą wytyczne przewidują (`the-way-maintain-coding-guidelines`). To jedno zdanie, a następny autor zapisu na nim zbuduje.
   - (b) scena szersza o 12 px od pudełka na telefonie — **przepuść:** to celowa geometria (zmierzona przy PR #182), nic się nie ucina ani nie przewija.
   - (c) wiersz „Teraz” ucina „Wytwórz — Opatrunek” wielokropkiem przy 360 px — **popraw, jeśli to kilka linii CSS** (np. zawijanie zamiast wielokropka, bez zmiany szerokości sceny): gracz ma widzieć, która reguła działa teraz. Zrzut przed i po przy 360 px. Jeśli poprawka jest większa, opisz przyczynę i miejsce w opisie; dopiszę to do zadania z kolejki, które rusza ekran przejścia.
3. Nie zagrano każdego stanu w prawdziwej grze — **przepuść.** Stany wczytała sama gra, przejście objęło 7 przypadków, a przyrząd puścił ten sam kod na 500 ziarnach.
4. Przegląd nie przeczytał całego pliku wytycznych o ekranach — **przepuść.** Przeczytał sekcje ekranów, których zmiana dotyka, a zmiana nie dodaje ekranu ani kontrolki.

You accept by merging 5–7: przyjęte.

Przeglądy w tej rundzie zlecaj na `opus` wprost. Gdy skończysz, zakończ powłoki w tle, żeby panel pokazał koniec tury.


```
