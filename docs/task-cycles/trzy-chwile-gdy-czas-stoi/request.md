**State: ready** — corrected for your remarks and merged with the task you merged first; nothing waits for your answer except whether to make a task of the two items you let through.

## What you will see

In a map run, the three moments in which game time stands still now have an effect of their own in the scene. Each effect plays once, and then the scene stands on its last picture until the moment ends with „Wznów”, „Restart” or „Zakończ”.

- **A discovery.** The icons of what the game minute discovered come out of the forest over the clearing, each on a dark plaque with a gold frame, like the badge over the mage's head, and stay there until „Wznów”, which takes them away. Only what has an icon in the game gets a plaque, and an icon shared by two things (such as „Idź” and „Idź — ognisko”) shows once; conditions, creatures and skill trees are named only by the band over the program. The scene stays in colour.
- **A death.** The mage falls in six frames and lies grey. After a death from cold, a blue layer lies over the whole scene until „Restart” or „Zakończ”; after hunger or in a fight there is no layer, so the end does not look like a pause.
- **A solved map.** Small specks rise over the clearing once and go out, over the full gold light of the scene; the mage stays in colour. The last picture is the gold scene without specks.

Around the effects: the window that ends the map run opens after the effect — about one second after a death, about 2.7 seconds after a solved map — so that you can see it. After a reload of the page, a return to the screen or the loading of a save, and under the system setting for reduced motion, the scene shows the last picture at once and the window opens at once. If the map run ends in the same game minute as a discovery, the scene shows only the end — the fall or the specks — and the window names the discovery. While an effect plays, only the effect moves; the fire and the mage stand as at every stop. No effect lights or darkens the whole scene for a moment: over the frames of each effect the brightness of the whole scene moved by at most 0.6 %.

The colours of the blue layer and of the specks are the ones the cycle proposed and you accepted as they were; the only change since your answer is that the comments that called them "proposed, pending your choice" now say that you chose them.

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

none

### Fix or let through

1. If you switch the system setting for reduced motion off while a death or a solved map stands on the screen, the effect then plays once, and the window of the end, which is already open, does not wait for it. You would feel it only when changing that setting in the middle of the screen, which is rare. You let this through on 2026-11-12, and it stays in the lower part (Minor findings, 1) together with four wording remarks on the foundation text and the styleguide (Minor findings, 3 to 6). Make a task of it?
2. A rule of the foundation — no part of the game imports a file of another part unless allowed — still stands on a fact the foundation does not name, and has stood so since before this change. You let this through on 2026-11-12; this change does not touch that rule. Make a task of it?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. The lengths of the effects are the cycle's choice: the fall about 1 second, each plaque 0.6 s, the specks up to 2.7 s in all, so the window of the end opens that long after the end. A longer wait would make the end feel slow and a shorter one would cut the effect; each is one number in the stylesheet.
4. The cold layer fades in during the fall instead of switching on in one frame, so that the whole scene never changes in one jump; the other way is a one-rule change.
5. When several things are discovered at once, their plaques stand in a row over the clearing, eight to a row (more wrap upward), at the height where they clear the badge over the mage's head; the row first stood 3 pixels from the badge and was moved up after the cycle looked at the running game.
6. The fallen mage turns toward the middle of the frame, so when it dies in the right half of the scene it falls to the left; at the right edge the fallen mage would otherwise be cut off and lie under the frost. The price is that the mage turns on the first frame of the fall, and the first frame stands 3 pixels from where the standing mage was.
7. The rule that the specks keep a ratio of 3 to 1 against the snow is dropped: the task asks only that the specks stand out from the snow, and the ratio, which only dark colours can meet on the gold snow, would have decided your choice of colour in advance. The specks as you accepted them read as small dark sparks, not as light; a lighter colour is a later choice that must still stand out from the snow.
8. The screenshots above are published in the public repository for screenshots, on a branch of this cycle and not on its main branch, as the product's rule says, pushed by the agent with your account; they show only a made-up game. To take them back, delete the branch of this cycle in that repository; the images in this description then stop showing.
9. Four rules of the foundation were written or widened by the cycle and not seen by you at the task: the scene shows each icon of a discovery once; the dead mage falls toward the middle of the frame and a moment counts as having just begun where the game's events carry it; the plaques of a discovery, the specks and the cold layer have fixed places among the layers over the scene; and the header button „Koniec przejścia” stays during the wait of the window for the effect and then opens it at once.
10. After your answer, the cycle changed only wording: the comments of the four colour tokens, one comment in the stylesheet and two sentences of the styleguide now say that you chose the colours, accepting the proposal as it stood. It did not touch the foundation's rules, which hold as written (a cold layer whose colour no choice of the human gave is a violation, and now there is a choice).
11. The task you merged first rewrote the foundation's entries and added rules on what comments, tests and sources may name. The cycle merged it into this branch and resolved 14 conflicts in five files. Where both sides had rewritten the same entry it took the other task's form and carried this change's meaning into it, and it reworded this change's own comments, sources and test titles under the new rules, dropping the name of the task and the name of the old game's repository from them. The colours and the facts you accepted stay as they were. A reviewer who did not make the change judged the merge and found nothing that blocks; it left two wording remarks (Minor findings, 5 and 6).
12. In one entry of the other task, the one on how long the scene's effects last, the cycle replaced the quotation of the flashing rule in its list of sources by the cycle's own entry for that rule, so that the rule has one source. The entry's rule and reasoning are unchanged and the reviewer judged this within what a merge may do. The price is that an entry the task said to leave alone was touched; undoing it is a one-line change.

## Cost

About 2 hours 9 minutes of working time across the orchestrator, the author (five turns), the review of the whole change (three turns), the review of the return step and the review of the merge; 255.0 million tokens in all, of which 207.2 million on Sonnet 5.5 and 47.8 million on Opus 5.5 (cached input is most of it). Review rounds: the review of the whole change failed once on four findings in the written text; one fix round followed and passed its review; the return step changed one rule and passed its review; your answers brought one correction, which passed its review; the merge with the other task was reviewed once and passed. The table of stages (link added by the edit that publishes the description) is in the record.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record by the SHA of its commit survives only then; the record is added and removed in two commits on this branch (once more after each correction).

The foundation has waited for a review through 81 merges since the start of its history, and no review has been made; the review is the skill `the-way-review-foundation`, started in a session in this repository. Nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowa** — poprawiona według Twoich uwag i scalona z zadaniem, które scaliłeś wcześniej; nic nie czeka na Twoją odpowiedź poza pytaniem, czy robić zadanie z dwóch pozycji, które przepuściłeś.

## Co zobaczysz

W przejściu trzy chwile, gdy czas gry stoi, mają teraz w scenie własny efekt. Każdy efekt gra raz, a potem scena stoi na jego ostatnim obrazie, aż chwila się skończy „Wznów”, „Restart” albo „Zakończ”.

- **Odkrycie.** Ikony tego, co odkryła minuta gry, wychodzą z lasu nad polanę, każda w ciemnej plakietce ze złotą ramką, jak plakietka nad głową maga, i stoją tam do „Wznów”, które je zabiera. Plakietkę dostaje tylko to, co ma w grze ikonę, a ikona wspólna dla dwóch rzeczy (jak „Idź” i „Idź — ognisko”) pokazuje się raz; warunki, stworzenia i drzewa umiejętności nazywa tylko pas nad programem. Scena zostaje kolorowa.
- **Śmierć.** Mag upada w sześciu klatkach i leży szary. Po śmierci z zimna nad całą sceną leży niebieska warstwa do „Restart” albo „Zakończ”; po śmierci z głodu i w walce warstwy nie ma, żeby koniec nie wyglądał jak pauza.
- **Rozwiązana mapa.** Drobinki unoszą się raz nad polaną i gasną, nad pełnym złotym światłem sceny; mag stoi w kolorze. Ostatni obraz to złota scena bez drobinek.

Wokół efektów: okno końca przejścia otwiera się po efekcie — po około sekundzie od śmierci i po około 2,7 sekundy od rozwiązania mapy — żebyś go zobaczył. Po odświeżeniu strony, po powrocie na ekran i po wczytaniu zapisu oraz pod systemowym ustawieniem ograniczenia ruchu scena pokazuje od razu ostatni obraz, a okno otwiera się od razu. Gdy przejście kończy się w tej samej minucie gry co odkrycie, scena pokazuje tylko koniec — upadek albo drobinki — a odkrycie nazywa okno. Gdy efekt gra, rusza się tylko on; ogień i mag stoją jak przy każdym zatrzymaniu. Żaden efekt nie rozjaśnia ani nie przyciemnia na chwilę całej sceny: w klatkach każdego efektu jasność całej sceny zmieniła się najwyżej o 0,6 %.

Kolory niebieskiej warstwy i drobinek to te, które zaproponował cykl, a Ty przyjąłeś je bez zmian; od Twojej odpowiedzi zmieniły się tylko komentarze, które nazywały je „propozycją czekającą na Twój wybór” — teraz mówią, że je wybrałeś.

Zrzuty prawdziwej gry (konto zmyślone) stoją wyżej. Ruchu nie widać na zrzucie, więc opisuję go słowami: plakietki wychodzą z dwóch wysokich sosen jedna po drugiej, co 0,15 s, i każda pojawia się przez 0,6 s; mag upada w około sekundę; chłodna warstwa pojawia się w trakcie upadku; drobinki unoszą się o całe piksele sceny, w sumie około 2,7 s.

### Pod spodem

Scena poznaje, że chwila właśnie nastała, ze zdarzeń, które gra zwraca z nowym stanem, tak jak już poznaje start przejścia, więc scena narysowana ponownie pokazuje ostatni obraz; efekty to animacje w arkuszu stylów, które grają tylko tam, gdzie system nie prosi o ograniczenie ruchu, a nowy obraz upadku to arkusz śmierci z paczki, przeniesiony piksel w piksel do klatek, w których rysuje się maga.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Popraw albo przepuść

1. Jeśli wyłączysz systemowe ustawienie ograniczenia ruchu, gdy na ekranie stoi śmierć albo rozwiązana mapa, efekt zagra wtedy raz, a okno końca, już otwarte, nie będzie na niego czekać. Poczujesz to tylko przy zmianie tego ustawienia w środku ekranu, co zdarza się rzadko. Przepuściłeś to 2026-11-12; zostaje w części dolnej (Drobne uwagi, 1) razem z czterema uwagami o brzmieniu tekstu fundamentu i przewodnika stylu (Drobne uwagi, 3 do 6). Zrobić z tego zadanie?
2. Reguła fundamentu — żadna część gry nie importuje pliku innej części, jeśli nie wolno — dalej stoi na fakcie, którego fundament nie nazywa, i stoi tak od czasu przed tą zmianą. Przepuściłeś to 2026-11-12; ta zmiana tej reguły nie dotyka. Zrobić z tego zadanie?

### Akceptujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

3. Długości efektów to wybór cyklu: upadek około 1 sekundy, każda plakietka 0,6 s, drobinki w sumie do 2,7 s, więc okno końca otwiera się tyle po końcu. Dłuższe czekanie sprawiłoby, że koniec wydaje się wolny, a krótsze ucięłoby efekt; każda długość to jedna liczba w arkuszu stylów.
4. Chłodna warstwa pojawia się w trakcie upadku, a nie włącza się w jednej klatce, żeby cała scena nie zmieniała się skokiem; druga droga to zmiana jednej reguły.
5. Gdy odkryto naraz kilka rzeczy, ich plakietki stoją w rzędzie nad polaną, po osiem w rzędzie (więcej zawija się w górę), na wysokości, na której mijają plakietkę nad głową maga; rząd stał najpierw 3 piksele od tej plakietki i po obejrzeniu działającej gry cykl podniósł go.
6. Upadający mag odwraca się ku środkowi kadru, więc gdy umiera w prawej połowie sceny, pada w lewo; przy prawym brzegu leżący mag byłby inaczej ucięty i leżałby pod szronem. Cena: mag obraca się w pierwszej klatce upadku, a pierwsza klatka stoi 3 piksele od miejsca, w którym stał stojący mag.
7. Reguła, że drobinki mają stosunek 3 do 1 wobec śniegu, jest zdjęta: zadanie chce tylko, żeby drobinki odróżniały się od śniegu, a ten stosunek, który na złotym śniegu spełniają tylko ciemne kolory, rozstrzygałby z góry Twój wybór koloru. Drobinki w takiej postaci, jaką przyjąłeś, wyglądają jak małe ciemne iskry, a nie jak światło; jaśniejszy kolor to późniejszy wybór, który nadal musi odróżniać się od śniegu.
8. Zrzuty wyżej leżą w publicznym repozytorium na zrzuty, na gałęzi tego cyklu, nie na głównej, jak mówi reguła produktu, wypchnięte przez agenta Twoim kontem; pokazują tylko zmyśloną grę. Żeby je cofnąć, usuń gałąź tego cyklu w tamtym repozytorium; obrazy w tym opisie przestaną się wtedy pokazywać.
9. Cztery reguły fundamentu cykl zapisał albo rozszerzył, a Ty ich przy zadaniu nie widziałeś: scena pokazuje ikonę odkrycia raz; upadający mag pada ku środkowi kadru, a chwila liczy się jako właśnie nastała tam, gdzie niosą ją zdarzenia gry; plakietki odkrycia, drobinki i chłodna warstwa mają ustalone miejsca wśród warstw nad sceną; a przycisk „Koniec przejścia” w nagłówku stoi w czasie czekania okna na efekt i otwiera je wtedy od razu.
10. Po Twojej odpowiedzi cykl zmienił tylko słowa: komentarze czterech tokenów kolorów, jeden komentarz w arkuszu stylów i dwa zdania przewodnika stylu mówią teraz, że to Ty wybrałeś kolory, przyjmując propozycję bez zmian. Nie ruszył reguł fundamentu, które zostają, jak były (warstwa chłodu w kolorze, którego żaden wybór człowieka nie dał, jest naruszeniem — teraz wybór jest).
11. Zadanie, które scaliłeś wcześniej, przepisało wpisy fundamentu i dodało reguły o tym, co mogą nazywać komentarze, testy i źródła. Cykl scalił je do tej gałęzi i rozwiązał 14 konfliktów w pięciu plikach. Tam, gdzie obie strony przepisały ten sam wpis, wziął formę tamtego zadania i wniósł w nią znaczenie tej zmiany, a komentarze, źródła i tytuły testów tej zmiany przeredagował według nowych reguł, usuwając z nich nazwę zadania i nazwę repozytorium starej gry. Kolory i fakty, które przyjąłeś, zostają, jak były. Recenzent, który zmiany nie robił, ocenił scalenie i nie znalazł niczego, co blokuje; zostawił dwie uwagi o brzmieniu (Drobne uwagi, 5 i 6).
12. W jednym wpisie tamtego zadania, o tym, jak długo trwają efekty sceny, cykl zastąpił cytat reguły o błyskach na liście źródeł własnym wpisem cyklu o tej regule, żeby reguła miała jedno źródło. Reguła i uzasadnienie wpisu się nie zmieniły, a recenzent uznał to za mieszczące się w tym, co wolno scaleniu. Cena: dotknięto wpisu, który zadanie kazało zostawić; cofnięcie to zmiana jednej linii.

## Koszt

Około 2 godzin 9 minut czasu pracy orkiestratora, autora (pięć tur), przeglądu całej zmiany (trzy tury), przeglądu kroku powrotnego i przeglądu scalenia; w sumie 255,0 mln tokenów, z czego 207,2 mln na Sonnecie 5.5 i 47,8 mln na Opusie 5.5 (większość to wejście z pamięci podręcznej). Rundy przeglądu: przegląd całej zmiany raz nie przeszedł, z czterema uwagami o tekście; poszła jedna runda poprawek, która przeszła przegląd; krok powrotny zmienił jedną regułę i przeszedł przegląd; Twoje odpowiedzi dały jedną korektę, która przeszła przegląd; scalenie z drugim zadaniem przejrzano raz i przeszło. Tabela etapów (link added by the edit that publishes the description) leży w zapisie cyklu.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo odnośnik do zapisu po SHA jego commita przetrwa tylko tak; zapis jest dodany i usunięty w dwóch commitach tej gałęzi (jeszcze raz po każdej korekcie).

Fundament czeka na przegląd przez 81 scaleń od początku historii i żaden przegląd jeszcze się nie odbył; przegląd to skill `the-way-review-foundation`, uruchamiany w sesji w tym repozytorium. Nic w tej prośbie na niego nie czeka.

</details>

## Technical changes

The change in plain terms is five commits of the author, one of the return step, one of the correction and a merge commit, on top of `20bcc58d`; the merge is the second parent `eb7cf5d8` of `main`.

- `c130b231` — the scene gets the three effects. `src/browser/view/scene-picture.ts` and `scene.tsx` read the events of the simulation call to tell a moment that has just begun from one drawn again (`momentBegins`, `endEffectBegins`); the plaques, the fall (`mage-death.png` with the mage turned toward the middle of the frame), the cold layer and the 24 specks are drawn from `SCENE_MOMENTS` and the death sheet in `src/browser/sim/data/scene.ts`; `src/browser/styles.css` runs them as animations inside `prefers-reduced-motion: no-preference` and exempts only the elements of the effect from the stop; `src/browser/tokens.css` takes the colours of the cold layer and the specks with a source line each; `game-view.ts`, `run-screen.tsx` and `world-area.tsx` hold the window of the end back until the effect has played.
- `04b43088` — the plaque row 8 scene pixels higher, clear of the badge.
- `d8c8f496` — the first animation of a moment ends on a change of `visibility`, since the rule of token values reads a unitless `opacity` as a value in place of a token.
- `959a8024` — the foundation entries (see below), written with the code.
- `81578d66` — the styleguide part "The scene of a map run" and the README line that lists the files cut from the Pixel Crawler pack.
- `4e87b0d7` — the fix after the review of the whole change: the styleguide sentence that said all motion stands at the three moments, the specks named among what lies over the tint, the ratio for the specks dropped, the mage standing only at a discovery and a completion, the window rule, the header button during the wait, a test renamed; the test of that ratio is deleted.
- `66c9d371` — the return step: one icon once, the direction of the fall and how a moment is told from a redraw, written into the decision on the scene's three moments.
- `23e22246` — the correction after your answers: the `Source:` comments of the four colour tokens in `src/browser/tokens.css`, the comment of the cold layer in `src/browser/styles.css` and two sentences of the styleguide now state that you chose the colours as proposed; no value, rule or test changed.
- `f6845995` — the merge of `main` (the other task, pull request 85) into the branch: 14 conflicts in five files resolved as item 11 of "You accept by merging" says, the files both sides touched checked, the comments of this change reworded under main's new rules on names, and the sources of D-317 reconciled with the fact for 2.3.1.
- Changed tests: `tests/view/end-window-game.test.mjs` no longer expects the window at the game minute of the end but after the effect (the helpers fire the end of the effect); `tests/view/scene-picture.test.mjs` reads 8-bit RGB pictures too and lists the new sprite. No invariant test changed.

## Checks

- The gate, `npm test` on the merged tree `f6845995`, from the worktree: exit 0 — the build, the Node tests, 542 tests in 4 directories (every directory passed) and the check of the foundation, `0 errors`. On the base `20bcc58d` and on the tree before the merge (`23e22246`) the same command exited 0 as well, and the run on `23e22246` was preceded by one that the system stopped for low memory without a result, so nothing failed
- The author's focused checks, each exit 0: `tests/view/*.test.mjs` (1197) and `tests/sim/*.test.mjs` (767), `npm run typecheck`, `npx eslint src tests/view`, the invariant tests of container sprites, token values, token sources and token contrast. One failing run: `test_browser_view_token_values.py` exit 1 on a unitless `opacity` in the first stylesheet, fixed in `d8c8f496`, then exit 0.
- The reviewers' checks in separate checkouts: the review of the whole change ran the four view test files, five invariant tests, typecheck, eslint, prettier, the foundation check, a byte comparison of the built sprite, and its own pixel comparison of the death sheet with its source (0 mismatching pixels, one offset for all six frames); the reviews of the fix, of the return step and of the correction ran the affected tests (for the correction the three token invariants) and the foundation check, all exit 0; the review of the merge, in a separate checkout of `f6845995`, ran the foundation check, typecheck, the invariant on private paths, the three token invariants and the four view test files (62, 62, 2 and 26 tests), all exit 0, and checked that `assets/sprites/mage-death.png` is byte-equal to the file of the reviewed tree.
- Own-work checks. The author's, the requirement most likely unmet — the window after the effect and the last picture shown at once — was checked in the real game in Chromium: the window stood 975 ms after a death from cold, 2718 ms after a solved map, and at once after a reload, on return to the screen and under reduced motion. Flashing was measured over screencast frames of each effect: the mean brightness of the scene moved at most 0.0055 over a death from cold, and at most 4.7 % of the area changed by 0.10 or more between a frame and the first one, far under the 25 % at which flashing counts. The correction's own-work check searched the foundation, the styleguide, the stylesheet, the tokens, the data, the README and the tests for wording that calls these colours proposed or pending; the two hits it left are rules that hold.
- User-interface states looked at: the discovery (the plaque row, standing), the death from cold (eight frames of the fall and the last picture), from hunger (twelve frames), in a fight (the last picture), the solved map (three frames of the effect and the last picture), each at 1440 × 900; the review of the whole change saw a discovery, a death from cold, a reload after it and a death under reduced motion in a real browser.
- Not checked in a real browser by a reviewer: the solved map and its specks, a death from hunger or in a fight, and leaving the screen during an effect; they rest on the author's run and the tests. The first item of the first description, to watch the three moments in the running game, you accepted "in the proposed form"; the cycle does not record that you watched.
- Screenshot evidence: five screenshots of the real game, kept at the screenshots repository, branch `loop2/trzy-chwile-gdy-czas-stoi`, commit `11eb42fbf9e30bd4a710513b7440207d34964014`, as D-357 and D-358 settle. They were taken before the correction, which changed no look.
- The checks of this description: the form check `python -B .the-way/task-cycle/request_check.py … --task …`, last run exit 0 (6 runs); the check of private paths on it, `python -B .the-way/task-cycle/private_paths_check.py …`, last run exit 0 (6 runs).
- The checks of the record's copy at `docs/task-cycles/trzy-chwile-gdy-czas-stoi/`: run after this commit; their results stand in the description of the request. There was no listing or form error that the cycle holds wrong.

## Foundation entries

- D-322 — what the scene shows while time stands still: in the pause everything stands, and in a discovery, a death and a completion the scene plays an effect once and stands on its last picture, with the plaques, the fall, the cold layer after a death from cold and the specks. Marks: `row 1`, `row 2`, `row 3`, `row 4`, `row 5`, `row 6`; the clauses "each icon once", the direction of the fall and how a moment is told from a redraw are `the cycle's`.
- D-311 — how the screen of a map run is laid out: the window of the end opens after the effect and at once where the scene shows the last picture at once. Mark: `row 7`.
- D-371 — the end-of-run window's memory: the header button „Koniec przejścia” also stands while the window waits for the effect. Mark: `the cycle's`.
- D-39 — the signal colours: `discovery` also frames the plaque of a discovery in the scene, on `panel`. Mark: `row 2`.
- D-42 — the accessibility criteria: a fourth criterion, 2.3.1 on flashing, the plaque-frame pair at 3:1, the sentence about `condition-unmet` and the dark bar kept. Mark: `projected`.
- D-271 — where the scene's pictures come from: the layers CSS may draw now include the cold layer, and the death sheet and the specks are named. Marks: `projected`; the cold layer is `the cycle's`.
- D-315 — where the tint of the scene's light stands: the plaques of a discovery, the specks and the cold layer have places among the layers (plaques and specks keep their colours, the cold layer lies over the tint and under the frost). Mark: `the cycle's`.
- `wcag-three-flashes` (environment fact) — WCAG 2.2 criterion 2.3.1, with its source. Mark: `projected`.
- D-317 — how long the scene's effects last: its list of sources cites the cycle's fact on WCAG 2.3.1 in place of a quotation of the same text, so that the criterion has one source. Mark: `the cycle's`. The entries above stand in the form the other task gave them (*Origin* `none`, reasoning as the game has it). The correction wrote or changed no foundation entry. No invariant written or changed; no surface changed; no *Violated* mark set or cleared; the part map is unchanged.

## Minor findings

1. Review of the whole change, Minor 5, place `src/browser/view/scene.tsx:509-513` with `src/browser/view/game-view.ts:146-151,351-354`: "under reduced motion the scene keeps `data-moment-playing` set; I saw `playing=true` at a death under reduced motion in Chromium. If the player switches the setting off while the moment stands, the effect plays then and the window, already standing, does not wait. The author names this (Choice 6). It is harmless today and recorded so the human sees it." The author contested it as a defect and the reviewer of the fix accepted that; it stays as written.
2. Review of the whole change, Minor 4, place `foundations/decisions.md`, the decision on where the scene's pictures come from, the examples under its verification: "The foundation's example is written from a proposal that is still pending the human's choice. Likewise the new violation „a cold layer whose colour no choice of the human gave” describes the code as it stands today (`src/browser/tokens.css`, `--scene-chill` „pending Mariusz's choice”). Both hold only once the human chooses at the request. The request should say that the token comments and these examples change with his choice." Answered by the correction `23e22246`: the human chose, the token comments say so, and both examples hold as written.
3. Review of the return step, Minor 1, place `foundations/decisions.md:7280`, the binding text of the decision on the three moments, last sentence: "The clause "and a moment has just begun where the events ... carry it (D-04), so a scene drawn again on the same moment, after a return to the screen, a reload or a load, **and a scene under the system's setting for reduced motion** show the last image of the effect at once" makes the reduced-motion scene read as a consequence of the events ("so"). In the code it is not: under that setting the scene may well receive the events that carry the moment, and the CSS alone takes the animation away (`src/browser/styles.css`, the reduced-motion rules at about line 2371), and `game-view.ts:353` reads the setting separately. The rest of the entry (Rationale, D-311, D-319) states the two separately. Effect: a reader could implement reduced motion by the events, which is wrong; low, because the sentence's "show the last image at once" is true of both. Suggested: put reduced motion in a clause of its own ("..., and a scene under the system's setting for reduced motion shows ...")."
4. Review of the return step, Minor 2, place `foundations/decisions.md:7290`, the verification of the decision on the three moments, the new "complies" item: "The row is inserted on the line of the death of cold and lengthens it to about 200 characters; every other line of the list wraps near 100. It also covers only the right half; the left half (a mage that died in the left half falling to the right) is the default and needs no row, so nothing is missing, but the *violates* list has no matching row for a mage that falls out of the frame or under the frost, which the entry's own reason (the fallen mage would be cut off) would support. Polish only; the checker passes."
5. Review of the reconciliation with the target branch, Minor 1, place `guidelines/styleguide-browser-view.md:336-338` with `:357-361`: "the intro of the list of value sources now miscounts. The merge took main's sentence "Źródło wartości ustalone z Mariuszem dla loop2, z dwoma rodzajami dołożonymi później: grubością belki i linii zakładki (2026-11-02) oraz wyglądem sceny (2026-11-11):" and put under it this task's bullet for a third later kind, the values proposed on screenshots of the three moments and chosen on 2026-11-12. A reader of the rule "Every value with its source", which the review of a change to the token file uses to judge a `Source:` comment (the invariant test checks only that one is there, `:369-370`), reads "two later kinds" and then finds three. Main fixed exactly this kind of miscount ("z jednym rodzajem" at `20bcc58d`); the merge reintroduces it. No effect on behaviour or tests. Remedy: "z trzema rodzajami dołożonymi później: …, wyglądem sceny (2026-11-11) oraz kolorami trzech chwil sceny (2026-11-12):"."
6. Review of the reconciliation with the target branch, Minor 2, place `foundations/decisions.md:7888`, the *Rationale* of the decision on the three moments: "the merge took main's opening sentence "a scene that moves while game time stands still would contradict the pause, which loop avoided on purpose." and dropped this task's continuation of it, "so only the effect of the moment moves, for a few seconds, and then the scene stands still on its last image" (at `dc42ad8e`). The *Rationale* now opens with an absolute principle and goes on to effects that move while time stands, the reason for the exception standing only implicitly in *Rejected* ("the scene alive while the effect plays — the world would move while game time stands"). Settlement row 6 is carried in full by the binding sentence ("nothing but the effect moves while it plays") and *Verification* ("the fire moving while the effect of a moment plays"), so nothing an agent compares a change with is lost; the loss is in the reasoning a later reader of the entry gets. Remedy: append ", so only the effect of a moment moves, for a few seconds" to main's first sentence."

## Findings outside the task's scope

1. Review of the whole change, out of scope, place the *Origin* line of the decision on the three moments in `foundations/decisions.md`: "D-322's *Origin* (`foundations/decisions.md`, D-322 Origin line), like those of D-39, D-42, D-311 and others, still names task documents (`scena_z_ludzikiem_loop2.md … To do …`). The pinned decision template forbids that („a task document is never named in *Origin*”, `.the-way/elements/decisions/template.md:223-226`). The range did not add such a reference (it added `rozpoznanie_frajda.md`, a research document), so this is outside the task."

## Course of the cycle

- **Task and sources:** the goal is that the discovery, the death and the solving of a map have their own effects in the scene at a stopped time and that no effect flashes the whole scene; the task is item 19 of the MVP2 plan of loop2 (plan `plan_mvp2_loop2.md`), accepted by the human on 2026-11-11, definition approved the same day; it depends on item 18, delivered by the request merged as pull request 83 (base `20bcc58d`).
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved, and the same on `main` after the merge; the gate on the base exited 0.
- **Spec:** none — the four questions the task carried to the cycle are choices of how to make what the foundation settles; the author made them and the orchestrator entered them in the questions table.
- **Route:** one author without a plan, class `same`; the change spans five parts but builds on the code of the previous task in the same files; one fix round after the review of the whole change, one return step and one correction after the human's answers of 2026-11-12 („1 i 2 akceptuję w zaproponowanej formie / resztę akceptuję również”), each reviewed; then, at the human's remark after he merged another task first, a merge of `origin/main` (`eb7cf5d8`) into the branch with 14 conflicts resolved by the author, reviewed once by a fresh reviewer.
- **Plan:** none.
- **Choices:** 18 rows in the questions table of the record (Q-A, then Q-1 to Q-17, the ruling on the ratio for the specks, the limit of the correction and the two rules of the merge among them); those that change what you see or what the foundation binds stand above under "You accept by merging"; the table is in the record, below.
- **Blocking findings left:** none; the four blocking findings of the first review were fixed and passed the review of the fix.
- **Record:** the record of the cycle (link added by the edit that publishes the description), at the commit that adds it; the next commit removes it from the branch, so the changed files of this request show only the change.
