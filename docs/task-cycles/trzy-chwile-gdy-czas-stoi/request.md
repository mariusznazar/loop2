**State: draft** — the description waits for the link to the record of the cycle; two items in "Needed from you" and two in "Fix or let through" will wait for your answer once it is ready.

## What you will see

In a map run, the three moments in which game time stands still now have an effect of their own in the scene. Each effect plays once, and then the scene stands on its last picture until the moment ends with „Wznów”, „Restart” or „Zakończ”.

- **A discovery.** The icons of what the game minute discovered come out of the forest over the clearing, each on a dark plaque with a gold frame, like the badge over the mage's head, and stay there until „Wznów”, which takes them away. Only what has an icon in the game gets a plaque, and an icon shared by two things (such as „Idź” and „Idź — ognisko”) shows once; conditions, creatures and skill trees are named only by the band over the program. The scene stays in colour.
- **A death.** The mage falls in six frames and lies grey. After a death from cold, a blue layer lies over the whole scene until „Restart” or „Zakończ”; after hunger or in a fight there is no layer, so the end does not look like a pause.
- **A solved map.** Small specks rise over the clearing once and go out, over the full gold light of the scene; the mage stays in colour. The last picture is the gold scene without specks.

Around the effects: the window that ends the map run opens after the effect — about one second after a death, about 2.7 seconds after a solved map — so that you can see it. After a reload of the page, a return to the screen or the loading of a save, and under the system setting for reduced motion, the scene shows the last picture at once and the window opens at once. If the map run ends in the same game minute as a discovery, the scene shows only the end — the fall or the specks — and the window names the discovery. While an effect plays, only the effect moves; the fire and the mage stand as at every stop. No effect lights or darkens the whole scene for a moment: over the frames of each effect the brightness of the whole scene moved by at most 0.6 %.

Screenshots of the real game (a made-up account):

![Death from cold, last picture: the blue layer over the whole scene](https://github.com/mariusznazar/screenshots/blob/11eb42fbf9e30bd4a710513b7440207d34964014/loop2/trzy-chwile-gdy-czas-stoi/death-cold-last-image.png?raw=true)

![Death from hunger, last picture: no layer, the cool grey-green light of streak 0 for comparison](https://github.com/mariusznazar/screenshots/blob/11eb42fbf9e30bd4a710513b7440207d34964014/loop2/trzy-chwile-gdy-czas-stoi/death-hunger-last-image.png?raw=true)

![Solved map, in the middle of the effect: specks over the full gold](https://github.com/mariusznazar/screenshots/blob/11eb42fbf9e30bd4a710513b7440207d34964014/loop2/trzy-chwile-gdy-czas-stoi/completion-specks.png?raw=true)

![Solved map, last picture](https://github.com/mariusznazar/screenshots/blob/11eb42fbf9e30bd4a710513b7440207d34964014/loop2/trzy-chwile-gdy-czas-stoi/completion-last-image.png?raw=true)

![Discovery: plaques over the clearing](https://github.com/mariusznazar/screenshots/blob/11eb42fbf9e30bd4a710513b7440207d34964014/loop2/trzy-chwile-gdy-czas-stoi/discovery-plaques.png?raw=true)

Motion cannot be seen on a screenshot, so in words: the plaques come out of the two tall pines one after another, 0.15 s apart, and each fades in over 0.6 s; the mage falls over about one second; the cold layer fades in during the fall; the specks rise by whole pixels of the scene for about 2.7 s in all.

### Underneath

The scene tells that a moment has just begun from the events the game returns with the new state, the way it already tells that a map run has started, so a scene drawn again shows the last picture; the effects are animations in the stylesheet that run only where the system does not ask for reduced motion, and the new picture of the fall is the pack's own death sheet moved, pixel for pixel, into the frames the mage is drawn in.

## For you to decide

### Needed from you

1. Before merging, watch the three moments in the game started from this branch (the command `npm run local` starts the game on your computer): a discovery, a death from cold, a death from hunger, a death in a fight, and the solving of the first forest, in one session. If you merge without watching, the lengths of the effects, the place of the plaques and the look of the fallen mage are judged by nobody, and the first player to see them finds out; the screenshots above show the last pictures, not the motion. Watching costs one session of yours and getting the game to each of the moments; the death in a fight has no wolf yet, since the wolf comes in a later task. I recommend watching, since your acceptance criteria ask for it. Did you watch, and does it look right — or what should change?
2. Choose the colours that no source fixes. The cycle proposes the blue of the cold layer (a strong blue at half strength, over the whole scene) and the colours of the specks (a dark red and a bronze brown read from two pixels of the pack's fire). On the screenshot the specks read as small dark sparks rather than as light, because the rule that kept them readable against the gold snow had to be dark; that rule is dropped in this request (item 9), so you may choose lighter ones, which must still stand out from the snow. Accepting the proposal costs nothing; naming other colours costs one round of correction with a review, and the screenshots above are then stale. I recommend accepting the blue and looking at the specks in the game before deciding. Do you accept the proposed colours, or which do you want instead?

### Fix or let through

3. If you switch the system setting for reduced motion off while a death or a solved map stands on the screen, the effect then plays once, and the window of the end, which is already open, does not wait for it. You would feel it only when changing that setting in the middle of the screen, which is rare. Two wording remarks on the foundation text stand beside it (Minor findings, 1 to 4). Fixing it in this request costs a round of correction with a review; making a task of it costs nothing now; letting it through leaves the rare case as it is. I recommend letting it through. Fix it in this request, make a task of it, or let it through?
4. A rule of the foundation — no part of the game imports a file of another part unless allowed — still stands on a fact the foundation does not name, and has stood so since before this change. Nothing breaks, but whoever checks the rule cannot see what it rests on. Writing the missing fact needs you to name it and its source and costs a short step in this request; making a task of it leaves the gap; letting it through accepts it on the main branch. I recommend letting it through, since this change does not touch that rule. Name the fact now, make a task of it, or let it through?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

5. The lengths of the effects are the cycle's choice: the fall about 1 second, each plaque 0.6 s, the specks up to 2.7 s in all, so the window of the end opens that long after the end. A longer wait would make the end feel slow and a shorter one would cut the effect; each is one number in the stylesheet, and you judge them when you watch (item 1).
6. The cold layer fades in during the fall instead of switching on in one frame, so that the whole scene never changes in one jump; the other way is a one-rule change.
7. When several things are discovered at once, their plaques stand in a row over the clearing, eight to a row (more wrap upward), at the height where they clear the badge over the mage's head; the row first stood 3 pixels from the badge and was moved up after the cycle looked at the running game.
8. The fallen mage turns toward the middle of the frame, so when it dies in the right half of the scene it falls to the left; at the right edge the fallen mage would otherwise be cut off and lie under the frost. The price is that the mage turns on the first frame of the fall, and the first frame stands 3 pixels from where the standing mage was.
9. The rule that the specks keep a ratio of 3 to 1 against the snow is dropped: the task asks only that the specks stand out from the snow, and the ratio, which only dark colours can meet on the gold snow, would have decided your choice of colour in advance.
10. The screenshots above are published in the public repository for screenshots, on a branch of this cycle and not on its main branch, as the product's rule says, pushed by the agent with your account; they show only a made-up game. To take them back, delete the branch of this cycle in that repository; the images in this description then stop showing.
11. Four rules of the foundation were written or widened by the cycle and not seen by you at the task: the scene shows each icon of a discovery once; the dead mage falls toward the middle of the frame and a moment counts as having just begun where the game's events carry it; the plaques of a discovery, the specks and the cold layer have fixed places among the layers over the scene; and the header button „Koniec przejścia” stays during the wait of the window for the effect and then opens it at once.

## Cost

About 1 hour 39 minutes of working time across the orchestrator, the author (three turns), the review of the whole change (two turns) and the review of the return step; 177.0 million tokens in all, of which 146.1 million on Sonnet 5.5 and 30.9 million on Opus 5.5 (cached input is most of it). Review rounds: the review of the whole change failed once on four findings in the written text; one fix round followed and passed its review; the return step changed one rule and passed its review. The table of stages is in the record, linked under "Course of the cycle".

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record by the SHA of its commit survives only then; the record is added and removed in two commits on this branch.

The foundation has waited for a review through 81 merges since the start of its history, and no review has been made; the review is the skill `the-way-review-foundation`, started in a session in this repository. Nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**Stan: wersja robocza** — opis czeka na odnośnik do zapisu cyklu; dwie pozycje w „Potrzebne od Ciebie” i dwie w „Popraw albo przepuść” będą czekały na Twoją odpowiedź, gdy opis będzie gotowy.

## Co zobaczysz

W przejściu trzy chwile, gdy czas gry stoi, mają teraz w scenie własny efekt. Każdy efekt gra raz, a potem scena stoi na jego ostatnim obrazie, aż chwila się skończy „Wznów”, „Restart” albo „Zakończ”.

- **Odkrycie.** Ikony tego, co odkryła minuta gry, wychodzą z lasu nad polanę, każda w ciemnej plakietce ze złotą ramką, jak plakietka nad głową maga, i stoją tam do „Wznów”, które je zabiera. Plakietkę dostaje tylko to, co ma w grze ikonę, a ikona wspólna dla dwóch rzeczy (jak „Idź” i „Idź — ognisko”) pokazuje się raz; warunki, stworzenia i drzewa umiejętności nazywa tylko pas nad programem. Scena zostaje kolorowa.
- **Śmierć.** Mag upada w sześciu klatkach i leży szary. Po śmierci z zimna nad całą sceną leży niebieska warstwa do „Restart” albo „Zakończ”; po śmierci z głodu i w walce warstwy nie ma, żeby koniec nie wyglądał jak pauza.
- **Rozwiązana mapa.** Drobinki unoszą się raz nad polaną i gasną, nad pełnym złotym światłem sceny; mag stoi w kolorze. Ostatni obraz to złota scena bez drobinek.

Wokół efektów: okno końca przejścia otwiera się po efekcie — po około sekundzie od śmierci i po około 2,7 sekundy od rozwiązania mapy — żebyś go zobaczył. Po odświeżeniu strony, po powrocie na ekran i po wczytaniu zapisu oraz pod systemowym ustawieniem ograniczenia ruchu scena pokazuje od razu ostatni obraz, a okno otwiera się od razu. Gdy przejście kończy się w tej samej minucie gry co odkrycie, scena pokazuje tylko koniec — upadek albo drobinki — a odkrycie nazywa okno. Gdy efekt gra, rusza się tylko on; ogień i mag stoją jak przy każdym zatrzymaniu. Żaden efekt nie rozjaśnia ani nie przyciemnia na chwilę całej sceny: w klatkach każdego efektu jasność całej sceny zmieniła się najwyżej o 0,6 %.

Zrzuty prawdziwej gry (konto zmyślone) stoją wyżej. Ruchu nie widać na zrzucie, więc opisuję go słowami: plakietki wychodzą z dwóch wysokich sosen jedna po drugiej, co 0,15 s, i każda pojawia się przez 0,6 s; mag upada w około sekundę; chłodna warstwa pojawia się w trakcie upadku; drobinki unoszą się o całe piksele sceny, w sumie około 2,7 s.

### Pod spodem

Scena poznaje, że chwila właśnie nastała, ze zdarzeń, które gra zwraca z nowym stanem, tak jak już poznaje start przejścia, więc scena narysowana ponownie pokazuje ostatni obraz; efekty to animacje w arkuszu stylów, które grają tylko tam, gdzie system nie prosi o ograniczenie ruchu, a nowy obraz upadku to arkusz śmierci z paczki, przeniesiony piksel w piksel do klatek, w których rysuje się maga.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

1. Przed scaleniem obejrzyj trzy chwile w grze uruchomionej z tej gałęzi (polecenie `npm run local` uruchamia grę na Twoim komputerze): odkrycie, śmierć z zimna, śmierć z głodu, śmierć w walce i rozwiązanie pierwszego lasu, w jednej sesji. Jeśli scalisz bez oglądania, długości efektów, miejsce plakietek i wygląd leżącego maga nie oceni nikt, a dowie się o nich pierwszy gracz; zrzuty wyżej pokazują ostatnie obrazy, nie ruch. Oglądanie kosztuje jedną Twoją sesję i doprowadzenie gry do każdej z chwil; śmierć w walce nie ma jeszcze wilka, bo wilk przychodzi w późniejszym zadaniu. Polecam obejrzeć, bo Twoje kryteria akceptacji tego chcą. Czy obejrzałeś i czy wygląda dobrze — albo co zmienić?
2. Wybierz kolory, których żadne źródło nie ustala. Cykl proponuje niebieski chłodnej warstwy (mocny niebieski w połowie siły, nad całą sceną) i kolory drobinek (ciemną czerwień i brąz, odczytane z dwóch pikseli ognia z paczki). Na zrzucie drobinki wyglądają jak małe ciemne iskry, a nie jak światło, bo reguła, która trzymała je czytelnymi na złotym śniegu, wymuszała ciemne kolory; ta reguła jest w tej prośbie zdjęta (pozycja 9), więc możesz wybrać jaśniejsze, które nadal muszą odróżniać się od śniegu. Przyjęcie propozycji nic nie kosztuje; wskazanie innych kolorów kosztuje rundę poprawek z przeglądem, a zrzuty wyżej tracą aktualność. Polecam przyjąć niebieski i obejrzeć drobinki w grze, zanim zdecydujesz. Czy przyjmujesz proponowane kolory, czy jakie chcesz zamiast nich?

### Popraw albo przepuść

3. Jeśli wyłączysz systemowe ustawienie ograniczenia ruchu, gdy na ekranie stoi śmierć albo rozwiązana mapa, efekt zagra wtedy raz, a okno końca, już otwarte, nie będzie na niego czekać. Poczujesz to tylko przy zmianie tego ustawienia w środku ekranu, co zdarza się rzadko. Obok stoją dwie uwagi o brzmieniu tekstu fundamentu (Drobne uwagi, 1–4). Poprawa w tej prośbie kosztuje rundę poprawek z przeglądem; zadanie na później nic teraz nie kosztuje; przepuszczenie zostawia rzadki przypadek, jak jest. Polecam przepuścić. Poprawić w tej prośbie, zrobić z tego zadanie, czy przepuścić?
4. Reguła fundamentu — żadna część gry nie importuje pliku innej części, jeśli nie wolno — dalej stoi na fakcie, którego fundament nie nazywa, i stoi tak od czasu przed tą zmianą. Nic się nie psuje, ale kto sprawdza regułę, nie widzi, na czym stoi. Wpisanie brakującego faktu wymaga, żebyś go nazwał razem ze źródłem, i kosztuje krótki krok w tej prośbie; zadanie na później zostawia lukę; przepuszczenie przyjmuje ją na głównej gałęzi. Polecam przepuścić, bo ta zmiana tej reguły nie dotyka. Nazwać fakt teraz, zrobić z tego zadanie, czy przepuścić?

### Akceptujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

5. Długości efektów to wybór cyklu: upadek około 1 sekundy, każda plakietka 0,6 s, drobinki w sumie do 2,7 s, więc okno końca otwiera się tyle po końcu. Dłuższe czekanie sprawiłoby, że koniec wydaje się wolny, a krótsze ucięłoby efekt; każda długość to jedna liczba w arkuszu stylów, a oceniasz je, oglądając (pozycja 1).
6. Chłodna warstwa pojawia się w trakcie upadku, a nie włącza się w jednej klatce, żeby cała scena nie zmieniała się skokiem; druga droga to zmiana jednej reguły.
7. Gdy odkryto naraz kilka rzeczy, ich plakietki stoją w rzędzie nad polaną, po osiem w rzędzie (więcej zawija się w górę), na wysokości, na której mijają plakietkę nad głową maga; rząd stał najpierw 3 piksele od tej plakietki i po obejrzeniu działającej gry cykl podniósł go.
8. Upadający mag odwraca się ku środkowi kadru, więc gdy umiera w prawej połowie sceny, pada w lewo; przy prawym brzegu leżący mag byłby inaczej ucięty i leżałby pod szronem. Cena: mag obraca się w pierwszej klatce upadku, a pierwsza klatka stoi 3 piksele od miejsca, w którym stał stojący mag.
9. Reguła, że drobinki mają stosunek 3 do 1 wobec śniegu, jest zdjęta: zadanie chce tylko, żeby drobinki odróżniały się od śniegu, a ten stosunek, który na złotym śniegu spełniają tylko ciemne kolory, rozstrzygałby z góry Twój wybór koloru.
10. Zrzuty wyżej leżą w publicznym repozytorium na zrzuty, na gałęzi tego cyklu, nie na głównej, jak mówi reguła produktu, wypchnięte przez agenta Twoim kontem; pokazują tylko zmyśloną grę. Żeby je cofnąć, usuń gałąź tego cyklu w tamtym repozytorium; obrazy w tym opisie przestaną się wtedy pokazywać.
11. Cztery reguły fundamentu cykl zapisał albo rozszerzył, a Ty ich przy zadaniu nie widziałeś: scena pokazuje ikonę odkrycia raz; upadający mag pada ku środkowi kadru, a chwila liczy się jako właśnie nastała tam, gdzie niosą ją zdarzenia gry; plakietki odkrycia, drobinki i chłodna warstwa mają ustalone miejsca wśród warstw nad sceną; a przycisk „Koniec przejścia” w nagłówku stoi w czasie czekania okna na efekt i otwiera je wtedy od razu.

## Koszt

Około 1 godziny 39 minut czasu pracy orkiestratora, autora (trzy tury), przeglądu całej zmiany (dwie tury) i przeglądu kroku powrotnego; w sumie 177,0 mln tokenów, z czego 146,1 mln na Sonnecie 5.5 i 30,9 mln na Opusie 5.5 (większość to wejście z pamięci podręcznej). Rundy przeglądu: przegląd całej zmiany raz nie przeszedł, z czterema uwagami o tekście; poszła jedna runda poprawek, która przeszła przegląd; krok powrotny zmienił jedną regułę i przeszedł przegląd. Tabela etapów leży w zapisie cyklu, odnośnik w „Przebiegu cyklu”.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo odnośnik do zapisu po SHA jego commita przetrwa tylko tak; zapis jest dodany i usunięty w dwóch commitach tej gałęzi.

Fundament czeka na przegląd przez 81 scaleń od początku historii i żaden przegląd jeszcze się nie odbył; przegląd to skill `the-way-review-foundation`, uruchamiany w sesji w tym repozytorium. Nic w tej prośbie na niego nie czeka.

</details>

## Technical changes

The change in plain terms is five commits of the author and one of the return step, on top of `20bcc58d`.

- `c130b231` — the scene gets the three effects. `src/browser/view/scene-picture.ts` and `scene.tsx` read the events of the simulation call to tell a moment that has just begun from one drawn again (`momentBegins`, `endEffectBegins`); the plaques, the fall (`mage-death.png` with the mage turned toward the middle of the frame), the cold layer and the 24 specks are drawn from `SCENE_MOMENTS` and the death sheet in `src/browser/sim/data/scene.ts`; `src/browser/styles.css` runs them as animations inside `prefers-reduced-motion: no-preference` and exempts only the elements of the effect from the stop; `src/browser/tokens.css` takes the colours of the cold layer and the specks with a source line each; `game-view.ts`, `run-screen.tsx` and `world-area.tsx` hold the window of the end back until the effect has played.
- `04b43088` — the plaque row 8 scene pixels higher, clear of the badge.
- `d8c8f496` — the first animation of a moment ends on a change of `visibility`, since the rule of token values reads a unitless `opacity` as a value in place of a token.
- `959a8024` — the foundation entries (see below), written with the code.
- `81578d66` — the styleguide part "The scene of a map run" and the README line that lists the files cut from the Pixel Crawler pack.
- `4e87b0d7` — the fix after the review of the whole change: the styleguide sentence that said all motion stands at the three moments, the specks named among what lies over the tint, the ratio for the specks dropped, the mage standing only at a discovery and a completion, the window rule, the header button during the wait, a test renamed; the test of that ratio is deleted.
- `66c9d371` — the return step: one icon once, the direction of the fall and how a moment is told from a redraw, written into the decision on the scene's three moments.
- Changed tests: `tests/view/end-window-game.test.mjs` no longer expects the window at the game minute of the end but after the effect (the helpers fire the end of the effect); `tests/view/scene-picture.test.mjs` reads 8-bit RGB pictures too and lists the new sprite. No invariant test changed.

## Checks

- The gate, `npm test` on the final tree `66c9d371`, from the worktree: exit 0 — the build, the Node tests, 542 tests in 4 directories (every directory passed) and the check of the foundation, `0 errors`. On the base `20bcc58d` the same command also exited 0, so nothing failed there.
- The author's focused checks, each exit 0: `tests/view/*.test.mjs` (1197) and `tests/sim/*.test.mjs` (767), `npm run typecheck`, `npx eslint src tests/view`, the invariant tests of container sprites, token values, token sources and token contrast. One failing run: `test_browser_view_token_values.py` exit 1 on a unitless `opacity` in the first stylesheet, fixed in `d8c8f496`, then exit 0.
- The reviewers' checks in separate checkouts: the review of the whole change ran the four view test files, five invariant tests, typecheck, eslint, prettier, the foundation check, a byte comparison of the built sprite, and its own pixel comparison of the death sheet with its source (0 mismatching pixels, one offset for all six frames); the review of the fix and of the return step ran the affected tests and the foundation check, all exit 0.
- Own-work checks. The author's, the requirement most likely unmet — the window after the effect and the last picture shown at once — was checked in the real game in Chromium: the window stood 975 ms after a death from cold, 2718 ms after a solved map, and at once after a reload, on return to the screen and under reduced motion. Flashing was measured over screencast frames of each effect: the mean brightness of the scene moved at most 0.0055 over a death from cold, and at most 4.7 % of the area changed by 0.10 or more between a frame and the first one, far under the 25 % at which flashing counts.
- User-interface states looked at: the discovery (the plaque row, standing), the death from cold (eight frames of the fall and the last picture), from hunger (twelve frames), in a fight (the last picture), the solved map (three frames of the effect and the last picture), each at 1440 × 900; the review of the whole change saw a discovery, a death from cold, a reload after it and a death under reduced motion in a real browser.
- Not checked in a real browser by a reviewer: the solved map and its specks, a death from hunger or in a fight, and leaving the screen during an effect; they rest on the author's run and the tests. Not run by the author: the full gate (run by the orchestrator, above).
- Screenshot evidence: five screenshots of the real game, kept at the screenshots repository, branch `loop2/trzy-chwile-gdy-czas-stoi`, commit `11eb42fbf9e30bd4a710513b7440207d34964014`, as D-357 and D-358 settle.
- The form check, the check of private paths on this description, and the checks of the record's copy (private paths, image files, remarks): their last runs are filled in with the record's link.

## Foundation entries

- D-322 — what the scene shows while time stands still: in the pause everything stands, and in a discovery, a death and a completion the scene plays an effect once and stands on its last picture, with the plaques, the fall, the cold layer after a death from cold and the specks. Marks: `row 1`, `row 2`, `row 3`, `row 4`, `row 5`, `row 6`; the clauses "each icon once", the direction of the fall and how a moment is told from a redraw are `the cycle's`.
- D-311 — how the screen of a map run is laid out: the window of the end opens after the effect and at once where the scene shows the last picture at once. Mark: `row 7`.
- D-371 — the end-of-run window's memory: the header button „Koniec przejścia” also stands while the window waits for the effect. Mark: `the cycle's`.
- D-39 — the signal colours: `discovery` also frames the plaque of a discovery in the scene, on `panel`. Mark: `row 2`.
- D-42 — the accessibility criteria: a fourth criterion, 2.3.1 on flashing, the plaque-frame pair at 3:1, the sentence about `condition-unmet` and the dark bar kept. Mark: `projected`.
- D-271 — where the scene's pictures come from: the layers CSS may draw now include the cold layer, and the death sheet and the specks are named. Marks: `projected`; the cold layer is `the cycle's`.
- D-315 — where the tint of the scene's light stands: the plaques of a discovery, the specks and the cold layer have places among the layers (plaques and specks keep their colours, the cold layer lies over the tint and under the frost). Mark: `the cycle's`.
- `wcag-three-flashes` (environment fact) — WCAG 2.2 criterion 2.3.1, with its source. Mark: `projected`.
- No invariant written or changed; no surface changed; no *Violated* mark set or cleared; the part map is unchanged.

## Minor findings

1. Review of the whole change, Minor 5, place `src/browser/view/scene.tsx:509-513` with `src/browser/view/game-view.ts:146-151,351-354`: "under reduced motion the scene keeps `data-moment-playing` set; I saw `playing=true` at a death under reduced motion in Chromium. If the player switches the setting off while the moment stands, the effect plays then and the window, already standing, does not wait. The author names this (Choice 6). It is harmless today and recorded so the human sees it." The author contested it as a defect and the reviewer of the fix accepted that; it stays as written.
2. Review of the whole change, Minor 4, place `foundations/decisions.md`, the decision on where the scene's pictures come from, the examples under its verification: "The foundation's example is written from a proposal that is still pending the human's choice. Likewise the new violation „a cold layer whose colour no choice of the human gave” describes the code as it stands today (`src/browser/tokens.css`, `--scene-chill` „pending Mariusz's choice”). Both hold only once the human chooses at the request. The request should say that the token comments and these examples change with his choice." The token comments and these examples change with your choice of colours (item 2).
3. Review of the return step, Minor 1, place `foundations/decisions.md:7280`, the binding text of the decision on the three moments, last sentence: "The clause "and a moment has just begun where the events ... carry it (D-04), so a scene drawn again on the same moment, after a return to the screen, a reload or a load, **and a scene under the system's setting for reduced motion** show the last image of the effect at once" makes the reduced-motion scene read as a consequence of the events ("so"). In the code it is not: under that setting the scene may well receive the events that carry the moment, and the CSS alone takes the animation away (`src/browser/styles.css`, the reduced-motion rules at about line 2371), and `game-view.ts:353` reads the setting separately. The rest of the entry (Rationale, D-311, D-319) states the two separately. Effect: a reader could implement reduced motion by the events, which is wrong; low, because the sentence's "show the last image at once" is true of both. Suggested: put reduced motion in a clause of its own ("..., and a scene under the system's setting for reduced motion shows ...")."
4. Review of the return step, Minor 2, place `foundations/decisions.md:7290`, the verification of the decision on the three moments, the new "complies" item: "The row is inserted on the line of the death of cold and lengthens it to about 200 characters; every other line of the list wraps near 100. It also covers only the right half; the left half (a mage that died in the left half falling to the right) is the default and needs no row, so nothing is missing, but the *violates* list has no matching row for a mage that falls out of the frame or under the frost, which the entry's own reason (the fallen mage would be cut off) would support. Polish only; the checker passes."

## Findings outside the task's scope

1. Review of the whole change, out of scope, place the *Origin* line of the decision on the three moments in `foundations/decisions.md`: "D-322's *Origin* (`foundations/decisions.md`, D-322 Origin line), like those of D-39, D-42, D-311 and others, still names task documents (`scena_z_ludzikiem_loop2.md … To do …`). The pinned decision template forbids that („a task document is never named in *Origin*”, `.the-way/elements/decisions/template.md:223-226`). The range did not add such a reference (it added `rozpoznanie_frajda.md`, a research document), so this is outside the task."

## Course of the cycle

- **Task and sources:** the goal is that the discovery, the death and the solving of a map have their own effects in the scene at a stopped time and that no effect flashes the whole scene; the task is item 19 of the MVP2 plan of loop2 (plan `plan_mvp2_loop2.md`), accepted by the human on 2026-11-11, definition approved the same day; it depends on item 18, delivered by the request merged as pull request 83 (base `20bcc58d`).
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved; the gate on the base exited 0.
- **Spec:** none — the four questions the task carried to the cycle are choices of how to make what the foundation settles; the author made them and the orchestrator entered them in the questions table.
- **Route:** one author without a plan, class `same`; the change spans five parts but builds on the code of the previous task in the same files; one fix round after the review of the whole change and one return step, each reviewed.
- **Plan:** none.
- **Choices:** 15 rows in the questions table of the record (Q-A, then Q-1 to Q-14, the ruling on the ratio for the specks among them); those that change what you see or what the foundation binds stand above under "You accept by merging"; the table is in the record, below.
- **Blocking findings left:** none; the four blocking findings of the first review were fixed and passed the review of the fix.
- **Record:** the link by the SHA of the commit that adds it comes with the next edit of this description.
