**State: ready** — three items in *Fix or let through* wait for your answer; nothing blocks the merge.

## What you will see

When a wolf attacks, the picture of the map run now shows it. At the start of the fight the wolf runs in from the right edge of the picture, in at most 0.3 s at every game pace, and stops beside the mage, facing it; the mage turns toward the wolf. For the whole fight (the five game minutes of the encounter) the wolf bites beside the mage, the mage stands in his idle pose and a small cloud of dust rolls between them; nothing flashes. When the fight ends the picture shows how it ended: a defeated wolf falls and is gone, a wolf that gives up runs off to the right edge it came from, after the mage's death the wolf stays standing beside him, and when the map is solved in the middle of a fight the wolf stays where it stands. At the very first attack of a new game the wolf already stands beside the mage at the stop at the discovery, and the biting starts after „Wznów”. If the system is set to reduced motion, the wolf stands at once, its frames stand still, and the end of a fight is a still picture for 0.3 s. The wolf is from the free pack „[LPC] Wolf Animation”; the folded „Autorzy grafiki” list (on the login card and at the bottom of Siedziba) now names its authors and licence, and the row of the dust is now called „Kurz i obłok walki”.

![The wolf running in from the right edge of the scene](https://github.com/mariusznazar/screenshots/blob/5330418718986d1482a81dcd135508df41819773/loop2/wilk-wbiega/1-run-in.png?raw=true)

![The scuffle: the wolf bites beside the mage, a cloud of dust between them](https://github.com/mariusznazar/screenshots/blob/5330418718986d1482a81dcd135508df41819773/loop2/wilk-wbiega/2-scuffle.png?raw=true)

![The defeated wolf lying, the last frame of its fall](https://github.com/mariusznazar/screenshots/blob/5330418718986d1482a81dcd135508df41819773/loop2/wilk-wbiega/3-defeated-lying.png?raw=true)

![The stop at the first attack of a new game: the wolf already stands beside the mage](https://github.com/mariusznazar/screenshots/blob/5330418718986d1482a81dcd135508df41819773/loop2/wilk-wbiega/4-first-attack-stop.png?raw=true)

![The mage at the right edge: the wolf stands on its left, turned to it](https://github.com/mariusznazar/screenshots/blob/5330418718986d1482a81dcd135508df41819773/loop2/wilk-wbiega/5-wolf-left-at-right-edge.png?raw=true)

![Reduced motion: the wolf stands at once and its frames stand still](https://github.com/mariusznazar/screenshots/blob/5330418718986d1482a81dcd135508df41819773/loop2/wilk-wbiega/6-reduced-motion-stands-at-once.png?raw=true)

![A wolf that gives up, at the start of its run off to the right edge](https://github.com/mariusznazar/screenshots/blob/5330418718986d1482a81dcd135508df41819773/loop2/wilk-wbiega/7-departing-runs-off.png?raw=true)

### Underneath

The picture of the wolf is named in the game's data, not in the drawing code, and its four new image files hold the pack's pixels unchanged, cut into frames. A fix found in review made the wolf's run and a gathering's own effect play together when they fall in one game minute.

## For you to decide

### Needed from you

none

### Fix or let through

1. Two situations were checked only by tests, in no real browser by anyone: a wolf that gives up and runs off (only the first frame of its run was caught), and a map solved in the middle of a fight. If one of them were wrong, a player would see the wolf jump or stay in the wrong place at the end of such a fight. Trying them now costs one more session of playing the game with prepared saves and, if something is wrong, a round of correction with its review; merging now costs nothing today, and the same code paths were seen working in the other outcomes. I recommend letting it through. Run them in this request, make a task of it, or let it through? (Checks)
2. Two small findings could mislead a later change, though nobody feels them today: one sentence in the reasoning of the wolf's run explains the 300 ms limit badly and could make a later reader think a safeguard is not needed, and that safeguard has no test for the case of the player pausing during the run (the test of the other half exists). If it is dropped later, a player who pauses during the wolf's run would see it start running again from the edge after „Wznów”. Fixing both costs one small correction with its review in this request; leaving them costs nothing now. I recommend letting them through. Fix them in this request, make a task of it, or let them through? (Minor findings, 1 and 2)
3. One old gap stands in the foundation, not made by this change: the rule that no part of the game imports another part's files rests on a fact nobody has named yet. Writing it needs you to name the fact and its source. Make a task of it, or let it through? (Foundation entries)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. The cycle chose, where the task left the way open: the brown wolf of the first sheet of the pack; the wolf's image files hold only cut frames (the wolf facing the mage on the left of the picture is mirrored by the drawing, not in a file), so the credit says „zmienione (wycięte klatki)” and not the example „wycięte klatki, odbicie” of the task; the wolf stands 2 px from the mage and the dust is 3 px above the ground line, both chosen by looking at the picture (judge them on the screenshots); the mage turns only when he stands still and keeps the turn after the fight; the dust cloud is the dust file of the gathering reused; when the mage dies in the fight, the falling mage lies partly over the wolf's nose; and the credit rows stand where the credits stand today, because the task that moves them is not merged yet. Another way for each would have meant more image work, a new image file or waiting for that other task. (Course of the cycle, Choices)
5. Three sentences of the foundation were added by the cycle after review and you have not seen them: a gathering's effect and the wolf's effects no longer take each other's place; one game minute that both ends a gathering and brings an attack shows both; and a death or the solving of the map in the 300 ms of the wolf's run leaves it standing beside the mage instead of held halfway. (Foundation entries)
6. The rule that the game's credits name every pack whose licence asks for it now also rests on the licence fact of the wolf's pack, which was written from the pack's own page; no test of an invariant changed and no mark of a violated invariant was set. The map of the game's parts gained the wolf's pack as an outside partner whose files are not trusted. (Foundation entries)

## Cost

About 1 h 55 min of working time counted from the session records (1 h of it waiting for tools such as the full test run), about 150 million tokens, almost all of them cached input, on Sonnet 5.5 (the orchestrator, the author and one reviewer) and Opus 5.5 (the reviewer of the whole change). One round of review and correction: the review of the whole change failed on one finding, the fix passed its review; the return step was reviewed too. The table of stages stands in the record of the cycle (`stages.md`, linked in *Course of the cycle*).

## How to merge

Merge with a merge commit, not a squash or a rebase: the link to the record of the cycle survives only when the commits are kept. The foundation has waited for a review through 83 merges since the start of the history (the limit is 30); the review is the skill `the-way-review-foundation`, started in a session in this repository, and nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — trzy pozycje w „Napraw albo przepuść” czekają na Twoją odpowiedź; nic nie blokuje scalenia.

### Co zobaczysz

Gdy atakuje wilk, obraz przejścia mapy go teraz pokazuje. Na początku starcia wilk wbiega z prawego brzegu obrazu, w najwyżej 0,3 s przy każdym tempie gry, i staje obok maga, twarzą do niego; mag obraca się ku wilkowi. Przez całe starcie (pięć minut gry) wilk gryzie obok maga, mag stoi w pozie bezczynności, a między nimi kłębi się mały obłok kurzu; nic nie błyska. Gdy starcie się kończy, obraz pokazuje, jak się skończyło: pokonany wilk pada i znika, wilk, który odchodzi, odbiega za prawy brzeg, z którego przyszedł, po śmierci maga wilk stoi dalej obok niego, a gdy mapa zostanie rozwiązana w środku starcia, wilk zostaje tam, gdzie stoi. Przy pierwszej napaści w nowej grze wilk stoi już obok maga na zatrzymaniu przy odkryciu, a gryzienie rusza po „Wznów”. Gdy system ma ustawione ograniczenie ruchu, wilk stoi od razu, klatki stoją nieruchomo, a koniec starcia to nieruchomy obraz na 0,3 s. Wilk pochodzi z darmowej paczki „[LPC] Wolf Animation”; zwijana lista „Autorzy grafiki” (na karcie logowania i na dole Siedziby) wymienia teraz jej autorów i licencję, a wiersz kurzu nazywa się „Kurz i obłok walki”.

(Zrzuty ekranu są powyżej, w części angielskiej.)

#### Pod spodem

Obrazek wilka jest nazwany w danych gry, a nie w kodzie rysowania, a jego cztery nowe pliki zawierają piksele paczki bez zmian, pocięte na klatki. Poprawka znaleziona w przeglądzie sprawiła, że bieg wilka i efekt zbierania grają razem, gdy wypadają w jednej minucie gry.

### Do rozstrzygnięcia

#### Potrzebne od Ciebie

brak

#### Napraw albo przepuść

1. Dwie sytuacje sprawdzono tylko testami, w prawdziwej przeglądarce nie widział ich nikt: wilka, który odchodzi i odbiega (złapano tylko pierwszą klatkę jego biegu), oraz mapę rozwiązaną w środku starcia. Gdyby któraś była zła, gracz zobaczyłby, że wilk skacze albo zostaje w złym miejscu na końcu takiego starcia. Sprawdzenie ich teraz kosztuje jeszcze jedną sesję grania na przygotowanych zapisach i, jeśli coś jest nie tak, rundę poprawki z jej przeglądem; scalenie teraz nie kosztuje dziś nic, a te same ścieżki kodu widziano w działaniu przy pozostałych wynikach. Rekomenduję przepuścić. Sprawdzić je w tym PR, zrobić z tego zadanie, czy przepuścić? (Checks)
2. Dwie drobne uwagi mogą wprowadzić w błąd późniejszą zmianę, choć dziś nikt ich nie odczuje: jedno zdanie w uzasadnieniu biegu wilka źle tłumaczy limit 300 ms i mogłoby skłonić późniejszego czytelnika do uznania, że zabezpieczenie jest zbędne, a to zabezpieczenie nie ma testu na przypadek pauzy gracza w trakcie biegu (test drugiej połowy istnieje). Gdyby je kiedyś usunięto, gracz, który zapauzuje w trakcie biegu wilka, zobaczyłby po „Wznów”, jak wilk rusza od brzegu od nowa. Naprawa obu to jedna mała poprawka z przeglądem w tym PR; zostawienie nic dziś nie kosztuje. Rekomenduję przepuścić. Naprawić w tym PR, zrobić z tego zadanie, czy przepuścić? (Minor findings, 1 i 2)
3. W fundamencie stoi jedna stara luka, niewniesiona przez tę zmianę: reguła, że żadna część gry nie importuje plików innej części, opiera się na fakcie, którego nikt jeszcze nie nazwał. Zapisanie go wymaga, żebyś nazwał fakt i jego źródło. Zrobić z tego zadanie, czy przepuścić? (Foundation entries)

#### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

4. Cykl wybrał tam, gdzie zadanie zostawiało drogę otwartą: brązowego wilka z pierwszego arkusza paczki; pliki obrazków wilka zawierają tylko wycięte klatki (wilk po lewej stronie maga jest odbity przez rysowanie, nie w pliku), więc wzmianka mówi „zmienione (wycięte klatki)”, a nie przykład z zadania „wycięte klatki, odbicie”; wilk stoi 2 px od maga, a kurz jest 3 px nad linią ziemi, oba wybrane na oko na obrazie (oceń je na zrzutach); mag obraca się tylko, gdy stoi, i zachowuje obrót po starciu; kłąb kurzu to ponownie użyty plik kurzu ze zbierania; gdy mag ginie w walce, pada częściowo na nos wilka; a wiersze wzmianek stoją tam, gdzie dziś stoją wzmianki, bo zadanie, które je przenosi, nie jest jeszcze scalone. Inna droga dla każdego z nich oznaczałaby więcej pracy nad obrazami, nowy plik obrazka albo czekanie na to drugie zadanie. (Course of the cycle, Choices)
5. Cykl dopisał po przeglądzie trzy zdania fundamentu, których nie widziałeś: efekt zbierania i efekty wilka nie zajmują już nawzajem swojego miejsca; jedna minuta gry, która kończy zbieranie i przynosi napaść, pokazuje oba; a śmierć albo rozwiązanie mapy w 300 ms biegu wilka zostawia go stojącego obok maga zamiast zatrzymanego w pół drogi. (Foundation entries)
6. Reguła, że wzmianki gry wymieniają każdą paczkę, której licencja tego żąda, opiera się teraz także na fakcie o licencji paczki wilka, zapisanym ze strony samej paczki; żaden test niezmiennika się nie zmienił i żadna oznaka naruszonego niezmiennika nie została ustawiona. Mapa części gry zyskała paczkę wilka jako zewnętrznego partnera, którego pliki nie są zaufane. (Foundation entries)

### Koszt

Około 1 h 55 min czasu pracy liczonego z zapisów sesji (godzina z tego to czekanie na narzędzia, np. pełny przebieg testów), około 150 milionów tokenów, prawie całość to wejście z pamięci podręcznej, na Sonnet 5.5 (orkiestrator, autor i jeden recenzent) i Opus 5.5 (recenzent całej zmiany). Jedna runda przeglądu i poprawki: przegląd całej zmiany oblał jedną uwagę, poprawka przeszła przegląd; krok zwrotny też został zrecenzowany. Tabela etapów leży w zapisie cyklu.

### Jak scalić

Scal commitem scalającym, nie squashem ani rebase'em: link do zapisu cyklu przetrwa tylko wtedy, gdy commity zostają. Fundament czeka na przegląd po 83 scaleniach od początku historii (próg to 30); przegląd to skill `the-way-review-foundation`, uruchamiany w sesji w tym repozytorium, i nic w tym PR na niego nie czeka.

</details>

## Technical changes

The change is four commits of the author, three of the fix and one of the return step; the code did not change in the last one.

- `2f144fdb` — the wolf in the scene: four PNG files (`assets/sprites/wolf-idle.png`, `wolf-run.png`, `wolf-bite.png`, `wolf-death.png`, the pack's left-facing cells moved unchanged, each frame 64 × 32), `SCENE_CREATURES` and `SCENE_FIGHT` in `src/browser/sim/data/scene.ts`, the wolf, its run in, its outcomes and the cloud in `src/browser/view/scene-picture.ts` and `scene.tsx`, the rules in `src/browser/styles.css`, tests in `tests/view/scene-picture.test.mjs` and `scene.test.mjs`. The wolf is drawn from the game state; the run in and the outcomes are effects of ordinary events (at most 300 ms, an overdue one dropped); the scuffle is not an effect.
- `8a1a2cfb` — the credits: the row of the LPC Wolf pack and the dust row's wider name in `src/browser/view/credits.ts`, the test of the credits in `tests/view/icons.test.mjs`.
- `ab8c1606` — the foundation step: D-271, D-148, D-316, D-317, D-322, the fact `lpc-wolf-licence`, the invariant `sprite-credits`, the External context row of the part map.
- `e717ec0f` — the styleguide part "The scene of a map run".
- `03f77d63`, `5221ca50`, `66b814d1` — the fix of the review: the wolf's effects in a slot of their own (so both play in one reading), a guard that the run in counts only while the scene is going or paused by the player, the typo „obłok”, the test of the wolf's side reading the places from the data, the wording of D-316 and D-317; the Minor findings of the review of the whole change were fixed in the same round.
- `f20b21b7` — the return step: D-316, D-317 and D-367 made to say what the code does after the fix.

## Checks

- Gate: `npm test` on `f20b21b7`, the final tree (equal to the reviewed one; `origin/main` had not moved from the base `7ff7c729`, so no merge and no reconciliation review), exit 0 — build, Node tests, 542 tests in 4 directories, every directory passed, `foundation_check.py` 0 errors. On the base the same command also exited 0, so no check fails on the base.
- Not run or not seen: no check of the gate failed or was left out. In a real browser nobody saw a wolf that gives up in the middle of its run (one frame of its start was caught) or a map solved in the middle of a fight; they rest on tests (item 1 of *For you to decide*). The author's Stryker run and the reviewers' on the changed range of `scene.ts` made no mutant (constants and types only).
- Own-work checks: the author ran the real game at 1× (the run in, the scuffle with the cloud, a defeat, a death in the fight, a wolf at the right edge, the first attack's stop, reduced motion), measured 100 frames over a scuffle (largest change between two consecutive frames 3,576 of 204,288 px, so no flash of the whole scene), compared the four PNG files pixel by pixel with the source sheet (0 differing pixels) and found in the browser a duplicate React key that no earlier check had caught (fixed; the tests fail when it is put back); in the fix it checked the lost run in at 1× and 16× in the real game and wrote a test that fails on the old code (exit 1) and passes on the new (exit 0).
- User-interface states and screenshots: the scene of a map run — the wolf running in, the scuffle, the defeated wolf, the stop at the first attack, the wolf left of the mage at the right edge, reduced motion, the start of the run of a wolf that gives up — seven screenshots taken at the final head, looked at by the orchestrator and kept at the place the foundation settles (`mariusznazar/screenshots`, branch `loop2/wilk-wbiega`, commit `5330418718986d1482a81dcd135508df41819773`). Not photographed: 16×, a map solved in the fight, the run in together with a gathering's end.
- The reviewers' checks: the review of the whole change verified the four files pixel by pixel in a separate clone, built the sprites and compared the bytes, ran a 300-seed simulation of attacks (it found I-1) and the real game; the review of the fix saw the right edge and reduced motion in a browser; all with exit 0 except as the findings say.
- Review reminder: `python -B .the-way/task-cycle/review_reminder.py origin/main`, exit 0 — `tag: none`, `merges: 83`, `threshold: 30`, `reminder: yes`.
- Remarks check: `python -B .the-way/task-cycle/remarks_check.py .runs/task-cycles/wilk-wbiega` — run 1 exit 1 (9 items listed), run 2 after appending them word for word exit 0 (2 runs on the original); the runs on the copy of the record and the form and private-path checks of this description are recorded when the record's link is added.

## Foundation entries

- D-271 — the scene's pictures include the wolf of the pack LPC Wolf, taken on CC BY 3.0 and credited, and the cloud of a scuffle is a sprite of the Smoke & Fire pack: `row 1`, `projected`.
- D-148 — an attacking creature appears in the text and in the scene, not in the terrain drawing: `projected`.
- D-316 — the scene draws what attacks the character: it runs in, stands beside the mage, scuffles and shows each outcome: `projected`, `row 2`, `row 5`, `row 6`; the death or the solving of the map within the run in leaves the wolf standing beside the mage: `the cycle's`.
- D-317 — what an effect of an ordinary event is and is not, the whole rule under reduced motion, the three moments without a limit: `projected`, `row 3`, `row 4`; one reading carrying the end of a gathering and an attack shows both effects: `the cycle's`.
- D-322 — at the stop of the first attack the wolf stands beside the mage, no run in, the scuffle begins at „Wznów”: `row 7`.
- D-367 — a gathering's effect and the wolf's effects no longer take each other's place: `the cycle's`.
- `lpc-wolf-licence` (environment fact) — what the pack's page gives: five licences, the link of CC-BY 3.0, the credit asked: `row 8`.
- `sprite-credits` (invariant) — the credits name every pack whose licence asks for a credit; *Rests on* gains `lpc-wolf-licence`: `row 9`. No invariant test was altered and no *Violated* mark was set or cleared.
- Part map — External context gains the LPC Wolf pack, `them → us`, `untrusted`: `projected` (the task's question on the outside partners).
- An old gap stands, not made by this change: the invariant `cross-part-imports` has a bare `TODO` in *Rests on* (item 3 of *For you to decide*).

## Minor findings

The Minor findings that no fix made, in the reviewers' words.

Review of the fix, `reports/review-2-report.md`:

**N-1 — The `paused` half of the guard has no test.** I changed the guard to `going` alone and every test
of `tests/view/scene.test.mjs` still passed (71). Without `paused`, a player's pause inside the 300 ms of
the run in would drop `data-entering`, and „Wznów” would put it back and start the run again from the
right edge, an effect after its turn (D-317). The code is right today; a test of a pause and a resume
inside the run in would keep it so.

Review of the return step, `reports/review-3-report.md` (numbers 1–5 as in the report):

1. `foundations/decisions.md:7711-7713` (D-316 *Rationale*). "At 16x the combat is decided 312 ms after the attack, so a death can come within the 300 ms of the run" does not follow as written: 312 ms is more than 300 ms. The claim itself is true of the code (the view reads the game every 200 ms, so the reading that decides the combat can come 200 ms after the reading that carries the attack, and a completion can come in any earlier combat minute; the test `tests/view/scene.test.mjs` "a death or a completion in the 300 ms of the run in ..." builds exactly that). The sentence omits the 200 ms reading, which is the real cause. Why it matters: a later reader may take the sentence as false and drop the guard `(drawing.standing === "going" || "paused")` at `src/browser/view/scene.tsx:835`. Evidence: D-317 *Rationale* line 7800 gives the 200 ms reading elsewhere. Suggested fix: name the 200 ms reading in the sentence.
2. `foundations/decisions.md:7801-7803` (D-317 *Rationale*). The inserted sentence ("Effects of different parts of the scene ... play together ...") sits between the run-of-the-wolf sentence and "One whose turn has passed would show something ...". "One" had a weak antecedent before and now reads as "one reading". Read after the inserted sentence it is ambiguous; moving the inserted sentence after the overdue-effect passage, or writing "An effect whose turn has passed", would fix it. No sentence was lost: the only deleted text in the range is the replaced ";" and "the" of the old wording.
3. `foundations/decisions.md:7772` and `:7713` hold unwrapped lines of 130+ and 170 characters in blocks wrapped at about 100 characters (the old text of the same entries already has some such lines, e.g. 7642, 7799). Cosmetic only; `foundation_check.py` passes; Markdown is not in the prettier patterns of `tests/quality/test_quality_invariants.py:17-20` (the return report's "prettier covers the Markdown" is not accurate, harmless).
4. D-317 *Rationale* states that effects of different parts of the scene play together; the binding sentence of D-317 does not, and its *Verification* *violates* list has no counterpart to the failure the fix cured (an attack whose run in is lost because the same reading ends a gathering). The rule is carried by D-367's binding sentence and by D-317's *complies* line, so it binds; this only follows the template's remark that what binds later work stands in a binding sentence or a field (WAY-05) less strictly than it could.
5. Before the range, not caused by it (written by `ab8c1606`): D-316 *Rejected* has "as in loop, with no run in" and "does not meet the scope of the project, which says the wolf runs in" (`foundations/decisions.md:7738-7739`). "loop" names the predecessor game throughout the file (D-271, D-322 and others, no path or link, no pointer to its private repository); "the scope of the project" points to a project document the foundation does not hold. Out of scope of the range; offered as an item for the foundation step.

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** the task "wilk-wbiega" of the project plan of MVP2 of loop2, accepted 2026-11-11; the definition's fingerprint `2d919ee3`; the pack page https://opengameart.org/content/lpc-wolf-animation read by the author (for the fact `lpc-wolf-licence`); the base `7ff7c729`.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`; the task did not move it.
- **Spec:** none — every where-and-how of the wolf was settled by the task's questions and settlements; the two questions carried to the cycle (which sheet, how to cut the frames) are choices of how to make what the task settles.
- **Route:** one author without a plan, class `same` as the orchestrator's (Sonnet 5.5); resumed once after the harness cut its first run off; the review of the whole change by Opus 5.5; the reviews of the fix and of the return step as the cycle gives.
- **Plan:** none.
- **Choices:** 12 rows in the questions table (Q-A and Q-1 to Q-12), the ones that bear on what the player sees stated in item 4 of *For you to decide*; the table stands in `cycle.md` of the record.
- **Blocking findings left:** none — the one blocking finding of the review of the whole change (the wolf does not run in when its reading also ends a gathering) was fixed and passed the review of the fix.
- **Record:** the link by the SHA of the commit that adds it is added by the edit after the record's commit.
