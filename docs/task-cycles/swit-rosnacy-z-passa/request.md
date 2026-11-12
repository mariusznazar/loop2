**State: draft** — the description waits for the link to the record of the cycle; four items in "Fix or let through" will wait for your answer once it is ready.

## What you will see

The light of the forest scene now follows the streak. At streak 0 the whole scene has a cool grey-green tint. As the streak grows toward what the map asks for, the tint warms evenly toward gold, but it stops at a trace of the cool tint (20 %) when the streak reaches the required value, and it stays there while the streak keeps growing on Las — głębiej. Only solving the map turns the light fully gold. When the streak is lost during a run, the scene turns cool again over 2 seconds. When the streak is lost while the run is paused, or while a discovery holds time, the cool-down starts when the run goes on. At a death, at a completion, at the start of a run, after "Restart" and after a load, the tint stands at once where the streak or the completion puts it. The tint does not change the brightness of the picture. The badge over the mage's head and the frost stay outside it.

A campfire that burns with 20 minutes or fewer left shows a smaller flame, "dorzuć, zanim zgaśnie". It is the same flame on the same stones, cut down by hand from the existing flame picture. An extinguished campfire stays as it was.

Frost now lies on the edges of the scene. There is none while the body is at 37 °C, it grows as the body cools, is half as thick at 36 °C and 16 scene pixels thick at 35 °C and below, and warming at a fire takes it back. It lies over the tint, so its colour does not change with the streak.

Screenshots of the real game (a made-up account):

![The full flame and the smaller flame of the campfire, enlarged](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/01-flame-full-and-smaller.png?raw=true)

![The scene at streak 0, the cool tint](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/03-scene-streak-0-cool-tint.png?raw=true)

![The scene at streak 242 with the smaller flame](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/04-scene-streak-242-smaller-flame.png?raw=true)

![The scene with frost at 35.9 degrees](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/05-scene-frost-35-9C-streak-372.png?raw=true)

![The scene with the full frost](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/06-scene-frost-full-streak-480.png?raw=true)

![The scene after the completion of Las, in full gold](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/07-scene-completion-full-gold.png?raw=true)

![The frost at 1 scene pixel](https://github.com/mariusznazar/screenshots/blob/1ef193d6c4520a43c6ec7baec3809bdbf5320957/loop2/swit-rosnacy-z-passa/08-scene-frost-1-pixel.png?raw=true)

![The frost at 2 scene pixels](https://github.com/mariusznazar/screenshots/blob/1ef193d6c4520a43c6ec7baec3809bdbf5320957/loop2/swit-rosnacy-z-passa/09-scene-frost-2-pixels.png?raw=true)

Motion is described, not shown: the return to the cool tint runs 2 seconds in a straight line, and under the system setting for reduced motion it shows its end at once and the flame frames stand still.

### Underneath

The scene draws the tint as a layer of colour over the picture of the forest and everything on it, and the frost as a separate layer over that; both read the game's state through a few numbers and take every colour from the design tokens.

## For you to decide

### Needed from you

none

### Fix or let through

1. Only you can accept the look of the smaller flame, the acceptance criterion of this task. When a campfire has 20 minutes or fewer of burning left, a player sees a flame with 20 of its 44 flame pixels per frame instead of the full one, on the same stones and with the same four frames; the first screenshot puts the two side by side. I made it by hand from the existing flame picture, so it is pixel work whose look nothing but your eye can judge. If you accept it, nothing more is needed. If you want another size or shape, redoing the one picture costs a correction round with a review, and it can show up later only as a change of one file. If you would rather not spend this request on it, a separate task does the same later. I recommend accepting it, since in the screenshot it still reads as the same fire, smaller. Do you accept the smaller flame, want it redone in this request, or want a task for it?

2. The picture of an item flying to the backpack, which sits on a small dark plaque, lies under the tint in this change, so the plaque takes a faint hue. You settled that everything in the scene but the badge over the mage's head and the frost lies under the tint, so I followed that. The review recommended asking you whether this plaque should be a third exception like the badge, since both exist for the same reason: the icon stays readable on the forest. I measured the icon against its plaque under the tint at every stage: from 15.8 to 16.3 against 16.1 without any tint, so the icon stays as readable as before. Keeping it under the tint costs nothing. Making it an exception costs one reorder of the layers, a test, a change to the wording of the decision about the tint and a correction round with a review; where it shows later is only the plaque's hue under a strong tint. I recommend keeping it under the tint, because the measured readability does not suffer and it follows your decision. Keep it under the tint, or make it a third exception in this request?

3. In the first minutes of a run that starts below 37 °C, when the frost is only 1 or 2 scene pixels thick, it looks like scattered dark teal specks, not white frost with an inner outline (screenshots 7 and 8 of the list above). Whoever plays sees this for a few game minutes at the start of the runs where the body cools; the task fixed the colours and the full width but not these first steps. Letting it through costs nothing today. Making the first steps lighter, with fill from the first pixel, changes the look you chose and costs a correction round with a review; where it shows later is whenever a player starts cold. A task can do that separately. I recommend letting it through until you have seen it in play. Do you let the first steps through, want them lighter in this request, or want a task for it?

4. A reviewer did not run the finished game in a real browser: the cool-down, the pause greying the tint and frost together, and reduced motion rest on the author's measurements in a real browser and on the review of the code, and the review viewed all the screenshots and found them in line with the code. The review of the whole change also read 15 of about 80 invariants in full, the rest by title only. If something in those measurements is wrong, a player would see a wrong return time or a coloured pause on the first play. Having a fresh reviewer run the game and repeat the measurements costs another session with the running game; it adds nothing today if the screenshots are right. I recommend letting it through, since the author measured each of those in a real browser and the screenshots agree. Do you let it through or have a fresh reviewer walk through the game in this request?

5. A rule of the foundation stands on a fact it does not name, and has stood so since before this change: the rule that no part of the game imports a file of another part unless allowed. Nothing breaks, but anyone checking the rule cannot see what it rests on. This request did not touch it. Writing the missing fact needs you to name it and its source; a task can do the same, and letting it through keeps the gap. I recommend making a task of it, since it is unrelated to the scene. Do you write the fact in this request, make a task, or let it through?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

6. The entries of the foundation do not name the task note in "Origin", although the task asked for it. The pinned process says a task note is never named there, and another open branch removes every such reference; I followed the process and put the reasoning in each entry's rationale. The price is that the entries do not point back to the task's note.

7. The tint also holds still at a discovery, not only in the player's pause: a loss of the streak that falls into a discovery starts its cool-down when the run goes on. I chose it because all motion of the scene stands still at a discovery, and a cool-down is motion. The price is that a loss during a discovery shows its return only after the discovery ends.

8. The frost's edge is ragged, made of squares of one scene pixel: a solid band two pixels thinner than the full width, with teeth on some of every few pixels and crystals of two different spacings. The task fixed the colours and the width but not the shape. The price is that the shape is mine and you see it first here.

9. On a map whose condition asks for no streak, the tint stays at its coolest until the map is solved; no such map exists yet and the task leaves it to the task that adds one. The price is that a later map may need a different rule.

10. Three entries of the foundation are the cycle's own, written after the code showed them true: the entry about the tint now says it holds still in the pause and at a discovery; the entry about where the tint's layer stands now says that the flying icon and its plaque lie under it, together with the dust, the mage and the fire; the frost entry says that only the first pixel of thickness is the outline alone, the fill coming with the next one.

## Cost

About 1 hour 15 minutes of working time, 119 million tokens in all, almost all of them cached input, on Sonnet 5.5 (the orchestrator, the author, the fix and the review of the return step) and Opus 5.5 (the review of the whole change and the review of its fix). Review rounds: the review of the whole change failed once, one fix, one review of the fix (passed), one review of the return step (passed). The table of stages is in the committed record: pending.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record of the cycle survives only then. The foundation has waited for a review for 80 merges since the start of its history (there is no tag of a last review); the review is the skill `the-way-review-foundation`, started in a session in this repository; nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**Stan: wersja robocza** — opis czeka na odnośnik do zapisu cyklu; cztery pozycje w „Popraw albo przepuść” będą czekały na Twoją odpowiedź, gdy opis będzie gotowy.

## Co zobaczysz

Światło sceny lasu idzie teraz za passą. Przy passie 0 cała scena ma chłodny szarozielony odcień. Gdy passa rośnie do tego, czego chce mapa, odcień ociepla się równo ku złotu, ale przy passie wymaganej zostaje w nim ślad chłodu (20 %) i stoi tak, dopóki passa rośnie dalej bez rozwiązania, jak na Las — głębiej. Pełne złoto daje dopiero rozwiązanie mapy. Gdy passa spada w czasie przejścia, scena wraca do chłodnego odcienia przez 2 sekundy. Gdy spada w czasie pauzy albo odkrycia, powrót zaczyna się, gdy przejście rusza dalej. Przy śmierci, rozwiązaniu, starcie przejścia, po „Restart” i po wczytaniu odcień stoi od razu tam, gdzie stawia go passa albo rozwiązanie. Odcień nie zmienia jasności obrazu. Plakietka nad głową maga i szron zostają poza nim.

Ognisko, które pali się jeszcze 20 minut lub krócej, ma mniejszy płomień: „dorzuć, zanim zgaśnie”. To ten sam płomień na tych samych kamieniach, zmniejszony ręcznie z dzisiejszego obrazka. Wygasłe ognisko zostaje takie, jakie było.

Na brzegach sceny leży szron. Nie ma go, gdy ciało ma 37 °C, rośnie, gdy ciało stygnie, przy 36 °C ma połowę grubości, a przy 35 °C i niżej 16 pikseli sceny; ogrzanie przy ogniu go cofa. Leży nad odcieniem, więc jego kolor nie zmienia się z passą.

Zrzuty prawdziwej gry (konto zmyślone) stoją wyżej. Ruch opisuję słowami: powrót do chłodnego odcienia trwa 2 sekundy i idzie równo, a pod systemowym ustawieniem ograniczenia ruchu pokazuje od razu swój koniec, a klatki płomienia stoją.

### Pod spodem

Scena rysuje odcień jako warstwę koloru nad obrazem lasu i wszystkim na nim, a szron jako osobną warstwę nad nią; obie czytają stan gry przez kilka liczb, a każdy kolor biorą z tokenów.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Popraw albo przepuść

1. Tylko Ty możesz przyjąć wygląd mniejszego płomienia — to kryterium akceptacji zadania. Gdy ognisko pali się jeszcze 20 minut lub krócej, gracz widzi płomień z 20 z 44 pikseli płomienia w klatce zamiast pełnego, na tych samych kamieniach i w tych samych czterech klatkach; pierwszy zrzut stawia oba obok siebie. Zrobiłem go ręcznie z dzisiejszego obrazka płomienia, więc to praca pikselowa, której wygląd oceni tylko Twoje oko. Jeśli go przyjmiesz, nic więcej nie trzeba. Jeśli chcesz inny rozmiar albo kształt, przeróbka jednego obrazka kosztuje rundę poprawki z przeglądem, a później pokaże się tylko jako zmiana jednego pliku. Jeśli nie chcesz na to zużywać tej prośby, osobne zadanie zrobi to samo później. Rekomenduję przyjąć, bo na zrzucie dalej czyta się jako ten sam ogień, mniejszy. Przyjmujesz mniejszy płomień, chcesz go przerobić w tej prośbie, czy chcesz na to zadanie?

2. Obrazek przedmiotu lecącego do plecaka, który stoi na małej ciemnej plakietce, leży w tej zmianie pod odcieniem, więc plakietka przyjmuje lekki odcień barwy. Ustaliłeś, że wszystko w scenie poza plakietką nad głową maga i szronem leży pod odcieniem, więc to wykonałem. Przegląd zalecał zapytać Cię, czy ta plakietka ma być trzecim wyjątkiem jak plakietka maga, bo obie istnieją z tego samego powodu: ikona ma być czytelna na lesie. Zmierzyłem ikonę wobec plakietki pod odcieniem na każdym etapie: od 15,8 do 16,3 wobec 16,1 bez odcienia, więc ikona zostaje tak samo czytelna jak przedtem. Zostawienie jej pod odcieniem nic nie kosztuje. Zrobienie wyjątku kosztuje przestawienie warstw, test, zmianę brzmienia decyzji o odcieniu i rundę poprawki z przeglądem; później pokaże się tylko odcień plakietki przy silnym odcieniu. Rekomenduję zostawić pod odcieniem, bo zmierzona czytelność nie cierpi, a to zgadza się z Twoją decyzją. Zostawić pod odcieniem, czy zrobić z niej trzeci wyjątek w tej prośbie?

3. W pierwszych minutach przejścia, które zaczyna się poniżej 37 °C, gdy szron ma tylko 1 albo 2 piksele sceny, wygląda jak rozsiane ciemne ciemnozielono-niebieskie kropki, a nie biały szron z wewnętrznym obrysem (zrzuty 7 i 8 z listy wyżej). Gracz widzi to przez kilka minut gry na początku przejść, w których ciało stygnie; zadanie ustaliło kolory i pełną szerokość, ale nie te pierwsze kroki. Przepuszczenie nic dziś nie kosztuje. Rozjaśnienie pierwszych kroków, z wypełnieniem od pierwszego piksela, zmienia wygląd, który wybrałeś, i kosztuje rundę poprawki z przeglądem; później pokaże się za każdym razem, gdy gracz zaczyna na zimno. Osobne zadanie może to zrobić osobno. Rekomenduję przepuścić, dopóki nie zobaczysz tego w grze. Przepuszczasz pierwsze kroki, chcesz je jaśniejsze w tej prośbie, czy chcesz na to zadanie?

4. Recenzent nie uruchomił gotowej gry w prawdziwej przeglądarce: powrót do chłodu, szarzenie odcienia i szronu razem z pauzą oraz ograniczenie ruchu opierają się na pomiarach autora w prawdziwej przeglądarce i na przeglądzie kodu, a przegląd obejrzał wszystkie zrzuty i uznał je za zgodne z kodem. Przegląd całej zmiany przeczytał też w całości 15 z około 80 niezmienników, resztę tylko po tytułach. Gdyby coś w tych pomiarach było błędne, gracz zobaczyłby przy pierwszej grze zły czas powrotu albo pauzę w kolorze. Świeży recenzent z uruchomioną grą i powtórzonymi pomiarami to kolejna sesja z uruchomioną grą; dziś nic nie dodaje, jeśli zrzuty są prawidłowe. Rekomenduję przepuścić, bo autor zmierzył każdą z tych rzeczy w prawdziwej przeglądarce, a zrzuty się zgadzają. Przepuszczasz, czy ma przejść grę świeży recenzent w tej prośbie?

5. Reguła fundamentu stoi na fakcie, którego fundament nie nazywa, i stała tak jeszcze przed tą zmianą: reguła, że żadna część gry nie importuje pliku innej części, jeśli nie wolno. Nic się nie psuje, ale kto sprawdza regułę, nie widzi, na czym stoi. Ta prośba jej nie ruszała. Zapisanie brakującego faktu wymaga, żebyś go nazwał razem ze źródłem; zadanie może zrobić to samo, a przepuszczenie zostawia lukę. Rekomenduję zrobić z tego zadanie, bo nie dotyczy sceny. Zapisujesz fakt w tej prośbie, robisz zadanie, czy przepuszczasz?

### Akceptujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

6. Wpisy fundamentu nie nazywają notatki zadania w polu „Origin”, choć zadanie o to prosiło. Przypięty proces mówi, że notatki zadania się tam nie nazywa, a inna otwarta gałąź usuwa każde takie odwołanie; poszedłem za procesem, a uzasadnienie wpisałem w *Rationale* każdego wpisu. Cena: wpisy nie wskazują z powrotem notatki zadania.

7. Odcień stoi w miejscu także przy odkryciu, nie tylko w pauzie gracza: utrata passy w czasie odkrycia zaczyna powrót do chłodu, gdy przejście rusza dalej. Wybrałem to, bo cały ruch sceny stoi przy odkryciu, a powrót odcienia jest ruchem. Cena: utrata w czasie odkrycia pokazuje swój powrót dopiero po jego końcu.

8. Brzeg szronu jest postrzępiony, z kwadratów jednego piksela sceny: pełne pasmo cieńsze o dwa piksele niż pełna szerokość, z zębami na niektórych pikselach z każdych kilku i kryształkami o dwóch różnych odstępach. Zadanie ustaliło kolory i szerokość, ale nie kształt. Cena: kształt jest mój i widzisz go dopiero tu.

9. Na mapie, której warunek nie wymaga passy, odcień zostaje najchłodniejszy aż do rozwiązania; takiej mapy jeszcze nie ma, a zadanie zostawia to zadaniu, które ją doda. Cena: późniejsza mapa może potrzebować innej reguły.

10. Trzy wpisy fundamentu są własne cyklu, zapisane po tym, jak kod pokazał je jako prawdziwe: wpis o odcieniu mówi teraz, że stoi w pauzie i przy odkryciu; wpis o tym, gdzie leży warstwa odcienia, mówi teraz, że lecąca ikona z plakietką leży pod nią razem z kurzem, magiem i ogniem; wpis o szronie mówi, że tylko pierwszy piksel grubości to sam obrys, a wypełnienie dochodzi z następnym.

## Koszt

Około 1 godziny 15 minut pracy, 119 milionów tokenów w sumie, prawie wszystkie to wejście z pamięci podręcznej, na Sonnet 5.5 (orkiestrator, autor, poprawka i przegląd kroku powrotnego) i Opus 5.5 (przegląd całej zmiany i przegląd jego poprawki). Rundy przeglądu: przegląd całej zmiany nie przeszedł raz, jedna poprawka, jeden przegląd poprawki (przeszedł), jeden przegląd kroku powrotnego (przeszedł). Tabela etapów jest w zatwierdzonym zapisie cyklu: odnośnik czeka.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo odnośnik do zapisu cyklu przeżywa tylko wtedy. Fundament czeka na przegląd od 80 scaleń od początku historii (nie ma znacznika ostatniego przeglądu); przegląd to skill `the-way-review-foundation`, uruchamiany w sesji w tym repozytorium; nic w tej prośbie na niego nie czeka.

</details>

## Technical changes

The scene's tint, the smaller flame and the frost are drawn from game state; the tint is a layer, `mix-blend-mode: color`, with the colour mixed in `oklch` from two tokens by a share of 0–1 and the opacity read from the same share. No colour is built in TypeScript.

- `96d7b4f3` — feat: the tint layer and its share of the streak (0.8 at the required streak, 1 only at a completion), its 2 s return as a change of state on a new element, the smaller flame (`fire-small.png`, 20 minutes in the scene data), the frost layers of `mask` made of scene-pixel squares, the badge moved to a carrier element beside the mage so it stays outside the tint; seven tokens in `src/browser/tokens.css`, each with its source; tests in `tests/view/scene.test.mjs`, `scene-picture.test.mjs` and a new `scene-frost-contrast.test.mjs`.
- `38a75f0a`, `83c8369a` — the foundation entries and the scene part of the styleguide.
- `78957216`, `a3125aaa` — the fix of the review of the whole change: the flying icon and its plaque under the tint, the frost's thickness pinned at 35.5 °C, honest sources of the snow samples in the contrast test, the styleguide points to the rules that hold the values, no task note in any entry's origin.
- `650e6df0` — the return step: two wordings made true to the code (the return waits at a discovery too; the frost is the outline alone only at its first pixel).

## Checks

- Gate on the final tree: `npm test`, exit 0: the build, the Node tests, 542 tests in 4 directories (every directory passed), and `foundation_check.py` with 0 errors. The base gate first failed in `tests/quality` only because the new worktree lacked the quality environment (`.runs/quality-venv`); set up as README.md gives, the quality test passed on the base (exit 0) and `foundation_check.py` passed on the base (exit 0). No check fails on the base.
- Failed runs in the cycle: `tests/invariants/test_application_build_output.py` failed once (exit 1) on the first custom-property name `--tint-from`, which the bundle test's heuristic read as a module specifier; renamed to `--tint-start`, then exit 0.
- Own-work check of the author (a real browser): brightness changes by at most 0.62 %; the badge stays on `panel`; a paused scene with tint, frost and the smaller flame has no coloured pixel; under reduced motion the return shows its end at once; the return took about 2 s in a straight line; the contrast of the frost's outline against the snow is at least 3.19 under every tint. After the fix: the icon against its plaque 15.8 to 16.3.
- Mutation analysis of the scene data file made no mutants (the file holds data).
- Screenshots: nine, by the route of the foundation for screenshots; the review of the whole change viewed seven and the review of the fix the two new ones.
- Form check of this description, check of private paths on it, the three checks on the copy of the record and the process-remarks check: see the last lines of this section after the record is committed.

## Foundation entries

- D-315 (projected, whole; row 1) — the tint of the scene's light is a layer over the background in full light, over everything the scene draws but the badge over the mage's head and the frost.
- D-316 (projected, the part about the tint; rows 2 and 3) — the tint follows the streak, is full gold only at a completion, returns over 2 s after a loss, holds still in the pause and at a discovery, and stands at once at a death, a completion, a start, "Restart" and a load.
- D-132 (projected, whole) — after a completion the light of the scene stands in full gold, under the end-of-run window, and "✕" uncovers it.
- D-271 (projected, the part about CSS; rows 5 and 7) — CSS may draw layers and specks of one-pixel squares on the scene's grid; the packs' palettes bind the frost and the specks, the tint's colours come from the human's choice; the frost stands out from the snow by 3:1 in its outline or fill.
- D-372 (new; row 4) — frost on the edges of the frame: none at 37 °C, half at 36 °C, 16 scene pixels at 35 °C and below, taken back by warming.
- D-373 (new; row 6) — a burning campfire shows its full flame with more than 20 minutes left and a smaller, hand-cut flame in the last 20.
- The cycle's own parts: see item 10 of "You accept by merging".
- No invariant test altered, no surface changed, no "Violated" mark set or cleared. No glossary, environment fact or part-map change.

## Minor findings

- **Review of the fix, M1:** the rationale and rejected alternatives of the tint's entry still name only the pause ("the return waits for „Wznów”"), while its statement and verification now say pause and discovery. In `foundations/decisions.md` (the tint's entry, *Rationale* and *Rejected*).
- **Review of the fix, M2:** the resume after a discovery has no test of its own; the resume test chains through the pause only. In `tests/view/scene.test.mjs`.
- **Review of the fix, N2** (noted by the reviewer in its summary): a test comment speaks in the first person ("my measurement"), in `tests/view/scene-frost-contrast.test.mjs`.

## Findings outside the task's scope

- The number D-372 is also taken by the open branch `task/martwe-odsylacze-origin`; whichever merges second must renumber. Place: `foundations/decisions.md`.

## Course of the cycle

- **Task and sources:** the task "Świt rosnący z passą" (plan item 18 of the MVP2 plan), accepted 2026-11-11; the approved definition (fingerprint 2d919ee3); the foundation at the base commit.
- **Process pin:** the pin recorded by the repository, no move. The product's checkout of the process had been left on an older commit than the pin; the cycle set it to the pin before starting.
- **Spec:** none; no open design choice (the four questions carried to the cycle are choices of how to make what the task settles).
- **Route:** one author without a plan, a class equal to the orchestrator's, for a change across the view, the scene data, the foundation and the styleguide.
- **Plan:** none.
- **Choices:** 15, see the questions table of the record (the plaque under the tint, the origin ruling, the thinnest frost, the hold of the tint at a discovery and the shape of the frost among them).
- **Blocking findings left:** none; the review of the whole change failed once with two blocking findings (the plaque against the settlement, the packs' palettes against the tint's colours), both fixed and passed on the review of the fix.
- **Record:** pending — the link by the SHA of the commit that adds it.
