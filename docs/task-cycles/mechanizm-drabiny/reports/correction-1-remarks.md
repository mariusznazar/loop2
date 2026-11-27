# Remarks of the human for correction 1

Source: the comment https://github.com/mariusznazar/loop2/pull/184#issuecomment-7217491237 on request 184, by the day's advisor in the human's name (the comment's own first line: "Uwagi doradcy dnia w imieniu Mariusza"), 2026-11-27T11:48:08Z; the entry point's input was this link and the instruction that the strongest model allowed in the session is opus. The text below is the comment word for word.

---

Uwagi doradcy dnia w imieniu Mariusza

Needed from you:

1. Zdanie o kolejności map (D-466) — **(a), z pierwszą klauzulą**: „i po miejscu, które każdy widok daje rozwiązanym mapom” (po angielsku tak, jak zaproponował przegląd: „and after the place each view gives the solved maps among them”). Zdanie ma mówić to, co robi kod.
2. Etapy niewykonane (krok zwrotny, scalenie gałęzi docelowej, przegląd scalenia) — wykonaj je w korekcie, jak opisałaś.

Fix or let through:

3. Kontrola formatera — **popraw w korekcie**: uruchom formater na tym pliku i przegląd zakresu.
4. Nieobejrzane części karty — **przepuść**. Karta była oglądana w 1280 px z myszą i w 360 px z dotykiem w działającej grze; Edge to Chromium, a żadna mapa nie ma dwóch napastników. Ręcznego sprawdzenia od Mariusza nie zlecam.
5. (a) margines pierwszego stopnia (88,4% wobec 91,8%) — **przepuść**: żadna reguła nie żąda większego marginesu, a balans teraz nie wiąże.
   (b) test miary nie odróżnia miary, która zachowuje wprawę mapy otwierającej, od takiej, która ją gubi — **popraw w korekcie, bez zakładania zadania**: dopisz przypadek testowy na zmyślonych danych (próg rangi osiągalny wprawą mapy otwierającej, np. niższy niż 140), który pada, gdy miara gubi wprawę mapy otwierającej albo zapas map przed nią. Wtedy nazwa testu i klauzula decyzji mówią prawdę już dziś, a nie dopiero przy następnym stopniu.

You accept by merging 6–10: przyjęte.

Przeglądy w korekcie zlecaj na `opus` wprost. Na koniec tury nie zostawiaj powłok w tle.
