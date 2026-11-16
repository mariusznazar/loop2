---
title: "loop2: skill z gotowymi skryptami do grafiki sceny"
status: draft
created: 2026-11-13T21:00
updated: 2026-11-14
tags: [zadanie]
related: "the project note of Loop"
---

# loop2: skill z gotowymi skryptami do grafiki sceny

Status: ready for cycle
Project relation: independent

## Description

### Need

- Każde zadanie o scenie gry pisze od zera te same skrypty do grafiki: cięcie klatek z arkusza paczki, zamianę kolorów, pomiar kontrastu i podgląd na wycinku lasu.
- Robi to osobno autor i osobno recenzent, a żaden z tych skryptów nie trafił do repozytorium.
- Odczuwa to agent w każdym cyklu zadania o scenie, który traci czas na powtórkę: 3–5 skryptów pisanych od nowa w każdym zadaniu o scenie.
- Odczuwa to Mariusz, gdy któreś ze sprawdzeń wypada albo nie, zależnie od agenta: trzy znane pułapki zależą od uważności agenta.
- Sceny dalej powstają i wyglądają dobrze — w zadaniach 17–20 Mariusz nie poprawił niczego w grafice.
- Przegląd zadań 17–20 pokazał, że kłopotem nie było rysowanie pikseli, tylko to, że każde zadanie budowało warsztat od nowa i gubiło go po scaleniu.

### To do

1. Skill w repozytorium loop2, obok `loop2-play`, który niesie gotowe skrypty i krótką kolejność kroków, w obu miejscach skilli repozytorium, ze wskazaniem w `AGENTS.md`, tak jak `loop2-play`.
2. Kolejność kroków w skillu: obrazek z paczki → przeniesienie klatek bez zmian → zamiana kolorów → przeróbka klatki zapisanej jako tekst (jedna litera na piksel) → nowa paczka, z licencją i podpisem autora. Reguły zostają tam, gdzie są — w D-271, D-317 i w sekcji sceny przewodnika stylu — a skill do nich odsyła, nie powtarza ich.
3. Krok „nowa paczka” mówi, czego fundament wymaga od paczki spoza trzech, które D-271 nazywa: zmiany D-271, faktu o jej licencji w faktach środowiska, linii w podziękowaniach gry (niezmiennik `sprite-credits`) i wiersza w zewnętrznym kontekście mapy części.
4. Sześć skryptów w skillu, każdy z testem w `npm test`:
   1. Cięcie arkusza paczki w klatki sceny i porównanie wyniku z arkuszem piksel w piksel.
   2. Zamiana kolorów obrazka bez wprowadzania nowych kolorów.
   3. Klatka zapisana jako tekst ↔ plik PNG, ze sprawdzeniami.
   4. Kontrast koloru wobec próbek sceny: gruntu i rekwizytu, przy którym efekt staje.
   5. Złożenie podglądu na wycinku lasu sceny.
   6. Pomiar błysków na serii klatek, z klatek, które daje `loop2-play`, wobec zasady o błyskach z D-317.
5. Trzy sprawdzenia w skillu, każde z tym, którym skryptem się je robi:
   1. Skala nowej paczki wobec Pixel Crawler — porównana świadomie, a nie na oko.
   2. Kolor efektu wobec rekwizytu, przy którym efekt staje, a nie tylko wobec gruntu.
   3. Czy efekt nie znika pod innym elementem sceny.
6. Skill mówi, że trzy sprawdzenia dają liczby i obraz do opisu PR-a, a ocenia je Mariusz; sprawdzenie nie ustanawia progu, a próg obowiązuje tylko tam, gdzie daje go decyzja.
7. Skill nazywa ryzyko: recenzent, który sprawdza wynik tym samym skryptem co autor, przestaje sprawdzać niezależnie. Recenzent używa skryptów skilla, ale sam wybiera, co mierzy — które piksele gruntu i rekwizytu są próbkami, co może zasłonić efekt, z którą postacią porównać skalę, który fragment arkusza był źródłem — i sam ogląda podgląd.

### Acceptance criteria

- Skrypty skilla dają na plikach `assets/sprites/` wymiary, które zmierzył przegląd zadań 17–20: wilk (`wolf-idle.png`) 31 px wysokości i 63 px długości, mag (`mage-idle.png`) 32 × 25 px.
- Agent zadania o scenie przechodzi kolejność kroków i trzy sprawdzenia samym repozytorium, bez materiału tego zadania i bez katalogów roboczych zadań 17–20.

### Questions to settle

- Czy do skilla wchodzi też pomiar błysków na serii klatek? Zadania 19 i 20 pisały go osobno; zasada o błyskach jest w decyzji D-317.
  - Answer: tak, jako szósty skrypt skilla; kosztuje jeden skrypt z testem więcej, w zadaniach 19 i 20 miał 20–30 linii, a klatki daje już `loop2-play`.
  - Not chosen:
    - pomiar poza skillem — kolejne zadanie z efektem pisze go od nowa, jak dwa z czterech dotychczasowych
  - Source: pytanie z notatki zadania, 2026-11-13, „Do rozstrzygnięcia przy doprecyzowaniu”; odpowiedź „1 a”, 2026-11-14, z sesji doradcy dnia w imieniu Mariusza, do potwierdzenia przy akceptacji całego dokumentu
- Co sprawdzenia skali, koloru wobec rekwizytu i zasłonięcia efektu dają: liczby i obraz do oceny Mariusza czy próg reguły?
  - Answer: liczby i obraz do opisu PR-a, a ocenia Mariusz; skill mówi, że sprawdzenie nie ustanawia progu, a próg obowiązuje tylko tam, gdzie daje go decyzja. Ocena przy każdym PR-ze o scenie zostaje na Mariuszu, a dwa dzisiejsze przypadki (kurz na patykach, kurz za magiem) zostają w grze.
  - Not chosen:
    - nowa reguła w D-271, że efekt odcina się też od rekwizytu i nie chowa się pod innym elementem — dzisiejsza scena łamie ją w dwóch miejscach, więc zadanie rośnie o poprawkę kurzu w kodzie sceny albo osobne zadanie, a progu dla rekwizytu i tak trzeba by szukać
  - Source: D-271 (`foundations/decisions.md:6176`, rewizja 2a8645d4) mówi tylko „the colour of an effect stands out from the ground it stands on”; Mariusz w zadaniu 17: „resztę odpuszczamy”; odpowiedź „2 a”, 2026-11-14, z sesji doradcy dnia w imieniu Mariusza, do potwierdzenia przy akceptacji całego dokumentu
- Które sprawdzenia recenzent robi po swojemu?
  - Answer: recenzent używa skryptów skilla, bo ich rachunek pilnują testy w `npm test`, ale sam wybiera, co mierzy — próbki gruntu i rekwizytu, element, który może zasłonić efekt, postać do porównania skali, fragment arkusza — i sam ogląda podgląd. Błąd zadania 17 był w wyborze próbki (brąz z patyków), nie w rachunku kontrastu.
  - Not chosen:
    - recenzent liczy wszystko własnymi skryptami — pełna niezależność, ale po stronie recenzenta wraca warsztat pisany od nowa, który to zadanie usuwa
    - recenzent używa skryptów bez zastrzeżeń — najtaniej, ale autor i recenzent popełniają ten sam błąd przy wyborze próbek
  - Source: notatka zadania, 2026-11-13, „Skill musi powiedzieć, które sprawdzenia recenzent robi po swojemu.”; odpowiedź „3 a”, 2026-11-14, z sesji doradcy dnia w imieniu Mariusza, do potwierdzenia przy akceptacji całego dokumentu

## Context

- Materiał zadania leży w folderze obok dokumentu tego zadania, nazwanym jak dokument z końcówką `_material`: przegląd zadań 17–20 z 2026-11-13, raport researchu paczek efektów i narzędzi z 2026-11-11 z jego skryptami pomiaru palety oraz skrypty i klatki zapisane jako tekst z katalogów roboczych zadań 17–20, bez obrazków i zrzutów i bez skryptów edytujących decyzje gry.
- Zapisy cykli 17–20 leżą w historii gita loop2: `git archive <commit> docs/task-cycles` dla 45a51b3a (17), 497cb7e8 (18), 97837dd9 (19), 0fa50dff (20); uwagi Mariusza są w zapisach cykli, nie w komentarzach PR-ów.
- Skrypty materiału czytają i piszą obrazki biblioteką Pillow (`from PIL import`), zainstalowaną na komputerze autora (12.3.0), a nieobecną w zależnościach repozytorium (`requirements-quality.in` trzyma ruff i shellcheck-py); test sceny czyta PNG bez biblioteki, przez `node:zlib` (`tests/view/scene-picture.test.mjs:764`, rewizja 2a8645d4).
- `loop2-play` jest wzorem układu: skrypty leżą obok `SKILL.md`, a `tests/agent_workflow/test_loop2_play_skill.py` pilnuje, że obie kopie skilla są jednakowe, i sprawdza jego skrypt.
- Pliki skilli, `AGENTS.md` i `tests/agent_workflow/**` należą do części `agent-workflow` (`foundations/part_map.md:121`); zadanie nie zmienia plików `assets/sprites/` ani kodu sceny.
- Reguły pracy agenta stoją w skillu, nie w decyzjach produktu: D-254 i D-357–D-359 wycofano jako „an instruction to the agent, not a decision of the product” (`foundations/decisions.md:9815`).
- Trzy pułapki z przeglądu: wilk z LPC Wolf jest wysoki jak mag i Mariusz to przyjął przy scalaniu, ale skali nikt nie porównał; kurz w brązie wziętym z patyków ginie na patykach; kurz przy zbieraniu włókna chowa się za magiem.
- Przegląd znalazł też regułę wymyśloną przez autora: zadanie 19 dopisało do D-271 próg 3:1 dla drobinek, którego nikt nie ustalił, i na jasnym śniegu zrobiło z „drobinek światła” ciemne iskry.

## Questions carried to cycle

- Czym skrypty czytają i piszą PNG: Pillow dołożoną do zależności repozytorium czy Node bez biblioteki, jak test sceny? Wybór zostaje cyklowi (przyjęte 2026-11-14, z sesji doradcy dnia w imieniu Mariusza); fakty stoją w Context.

## Human actions

none

## Decisions in play

- **D-271 — Where do the scene's pictures come from?** (`foundations/decisions.md:6176`): „The scene's pictures and the picture of the game behind the login card are sprites of the packs Pixel Crawler and LPC Wolf, and the dust of a miss and the cloud of a scuffle are sprites of the pack Smoke & Fire Animated Particle [16x16] recoloured to the scene's colours, all kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built. […] A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, the game takes the pack LPC Wolf under its licence CC BY 3.0, and the character of the scene is the mage of Pixel Crawler. CSS may draw in the scene layers, such as the tint of its light, the cold layer of a death of cold and the frost, and specks, and the frost and the specks are squares of one pixel of the scene on its grid in colours of the palettes of the packs, while the colours of the tint layer and of the cold layer have their source in the human's choice; whatever has a drawing — a character, a creature, a thing — comes from a pack, and the colour of an effect stands out from the ground it stands on, the outline or the fill of the frost by at least 3:1 against the snow it lies on.” Jego *Verification* liczy jako naruszenie „a picture drawn from a pack other than the three named”.
- **D-317 — How long do the scene's effects last?** (`foundations/decisions.md:7793`), zdanie o błyskach: „The scene shows no flash of its whole area.”
- **D-349 — What size is the scene on the screen of a map run?** (`foundations/decisions.md:8788`): „The scene has one size, 672 × 304 px, twice the size of its picture, and the game keeps no second scale of it. Whatever the scene draws is drawn for this size alone.”
- **D-87 — When are whole-screen pixel comparisons used?** (`foundations/decisions.md:1750`): „Whole screens are not preserved by pixel-by-pixel image comparison, while agreed appearance rules keep their checks and a changed appearance is inspected in a browser.”
- **D-362 — How does loop2 point to places outside the repository that its readers cannot reach?** (`foundations/decisions.md:9034`): „No file git tracks names a note the author keeps outside the repository or the folder it lies in, or a file of a repository its readers cannot reach […]; what a reader needs of such a source stands in the foundation or in the file itself.”

## Settlements to record

Candidates: 3 shown, 1 accepted — 2026-11-14

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | To, czy kolor efektu odcina się od rekwizytu, przy którym efekt staje, i czy efekt nie chowa się pod innym elementem sceny, ocenia Mariusz przy PR-ze z liczb i obrazu sprawdzeń; żaden próg tego nie rozstrzyga. | decision | odpowiedź na pytanie „Co sprawdzenia skali, koloru wobec rekwizytu i zasłonięcia efektu dają…” w *Questions to settle*, której *Not chosen* trzyma drogę odrzuconą | czy dopisać do D-271 albo do testów sceny próg kontrastu efektu wobec rekwizytu, tak jak zadanie 19 dopisało nieustalony próg 3:1 dla drobinek |

## Out of scope

- Generatory obrazków (PixelLab, Retro Diffusion): w czterech zadaniach żaden nie był potrzebny.
