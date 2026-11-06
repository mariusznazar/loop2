**State: ready** — the change is finished, reviewed and tested; one thing waits for you before the merge: watching the scene yourself at 1×, 4× and 16×.

## What you will see

On the screen of a map run, the still picture of the forest in the world area has become a living scene, at the same size as before (672 × 304):

- **The mage walks.** The pack's mage, not the hooded figure of the old game, stands in the snowy forest and walks to where his current activity leads him: to the sticks, the berry bush or the moss when he gathers, to the campfire when he makes, lights or feeds it, to the right edge of the picture when he explores or walks across the map, and to the middle of the clearing when he waits. When he eats, lights a stick, collects fibre or fights, he stays where he is. Each walk takes 640 ms at every pace, and his frames change every 160 ms, so the beat is the same at 1× and at 16×. If the target changes on the way, he turns from where he is.
- **A badge over his head.** A small badge on a solid panel shows the icon of the current activity, the same icon the rule shows in the editor, and under it a progress bar of that activity. There is no badge while he waits and none in a fight.
- **Props.** Sticks, the berry bush and moss always stand in the picture, even when the character's tile holds none. The campfire stands only while there is one on the character's tile: burning with moving flames, or extinguished as the same picture in grey and without motion.
- **Pause and the moments when time stands still.** "Pauza" turns the whole scene grey and stops all its motion. A stop at a discovery keeps the colours and stops the motion. After a death the motion stops, the badge goes and the mage is grey; after the map is solved the motion stops, the badge goes and the mage stays in colour.
- **A picture, not a button.** Clicking the scene does nothing and no pause sign stands on it. The scene never flashes as a whole, and with the system setting for reduced motion the frames do not change, the mage stands at his place at once and the bar jumps instead of gliding.

Screenshots of the states (scale 2, the size that ships): [gathering a stick, badge over the head](https://github.com/mariusznazar/loop2/blob/[[SHA]]/docs/task-cycles/scena-z-ludzikiem/screenshots/scale2-gathering-stick-badge.png) · [at the burning campfire](https://github.com/mariusznazar/loop2/blob/[[SHA]]/docs/task-cycles/scena-z-ludzikiem/screenshots/scale2-at-the-fire-burning.png) · [extinguished campfire](https://github.com/mariusznazar/loop2/blob/[[SHA]]/docs/task-cycles/scena-z-ludzikiem/screenshots/scale2-at-the-fire-extinguished.png) · [paused](https://github.com/mariusznazar/loop2/blob/[[SHA]]/docs/task-cycles/scena-z-ludzikiem/screenshots/scale2-paused.png) · [at a discovery](https://github.com/mariusznazar/loop2/blob/[[SHA]]/docs/task-cycles/scena-z-ludzikiem/screenshots/scale2-discovery.png) · [after a death](https://github.com/mariusznazar/loop2/blob/[[SHA]]/docs/task-cycles/scena-z-ludzikiem/screenshots/scale2-after-death.png) · [after the map is solved](https://github.com/mariusznazar/loop2/blob/[[SHA]]/docs/task-cycles/scena-z-ludzikiem/screenshots/scale2-after-completion.png).

### Underneath

The scene's pictures and places are kept in the game's data, not in the view, and its motion comes from the browser's own animation at a fixed beat, with no drawing loop of its own; six new picture files of the Pixel Crawler pack hold pixels alone.

## For you to decide

1. **Watch the scene before you merge.** The task asks you to run this branch locally and watch the scene at 1×, 4× and 16×. The agents read motion only from recorded frames, and frames can miss a jerk at 16×. Merge once you have watched it and are content?
2. **The grey of the dead mage and of the extinguished campfire.** The task says only "grey" and "without colour". The cycle took the one value the old game used for both, a little brighter than the pause's grey, and it is now written into two decisions. Accept it, or change it? (Minor findings, 10)
3. **How the scene looks, chosen by the cycle.** The mage's places were moved to the left so that he does not cover the props he gathers (his picture is twice as wide as the old game's); the badge's icon is 32 px at the shipped size and its bar is twice the usual thickness; the walk is at an even speed, where the old game eased in and out; the empty part of the bar is only just visible against the badge (about 1.2 to 1). Look at these while you watch. Accept, or ask for another look?
4. **A walk already begun finishes.** When the next activity leaves the mage standing, for example eating while he is running to the sticks, he finishes the walk to the old place instead of stopping where he is. The written decision says he stays where he stands. At 16× this can show as a mage running while "eating". Keep it, or make a task of it? (Minor findings, 7)
5. **A scene left mid-walk replays the walk.** If you leave the screen of the map run within the first 640 ms of a walk and come back, the mage jumps back to where that walk began and walks it again. Small and self-correcting. Make a task of it? (Minor findings, 6)
6. **The berry bush has no berries.** The pack has no bush with berries, so the "berry bush" is the same plain bush the old game used. Accept?  (Minor findings, 3)
7. **The scene asks the browser where the walking mage has got to.** This lets a turn start from where he is, but the written rule about what the picture may draw from does not name it. The cycle and the reviewers read it as allowed. Accept the reading?
8. **A gap in a decision, accepted by the plan.** The decision on hard-coded values says the frames and positions of a sprite are allowed, but the automated guard still refuses sprite positions written in pixels in the stylesheet; the scene gives them in percent from the code instead. A later scene task that wants pixel positions in the stylesheet will have to change the guard. Accept?
9. **A new automated check, by test instead of by review.** The approved wording of the rule that the server image holds every file the scene draws said it would be checked by review; the cycle wrote it with an automated test that builds the server image and compares each picture file byte for byte. It adds about a minute and a half to the full test run where Docker is available and is skipped without it, when the rule stays unchecked. Accept?
10. **Not checked by the cycle.** The mage's walk at 2× was not traced, 8× only partly, and most screenshots of the smaller size were read from the page state rather than looked at. The shipped size was looked at in every state. Merge without these?

## Cost

The cycle took about 3 h 15 min of working time (the orchestrator's and the agents' turns joined) and 171.7 million tokens, nearly all of it cached input: Sonnet 80.4 M, Opus 71.7 M, Haiku 19.6 M. There were four code reviews — slice 1 with the foundation entries, the whole change, the fix of its one blocking finding, and the return step's commit — and one blocking round: the review of the whole change, fixed once, and the fix passed. The table of stages is in the record: [stages](https://github.com/mariusznazar/loop2/blob/[[SHA]]/docs/task-cycles/scena-z-ludzikiem/stages.md).

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record of the cycle survives only then; squashing or rebasing would break it.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — zmiana jest skończona, sprawdzona przez recenzentów i przetestowana; przed scaleniem czeka jedna rzecz: obejrzenie sceny własnymi oczami przy 1×, 4× i 16×.

## Co zobaczysz

Na ekranie przejścia nieruchomy kadr lasu w obszarze świata zamienił się w żywą scenę, w tym samym rozmiarze (672 × 304):

- **Mag chodzi.** W śnieżnym lesie stoi mag z paczki, a nie postać w kapturze ze starej gry. Idzie tam, dokąd prowadzi go bieżąca czynność: do patyków, krzaka jagód albo mchu przy zbieraniu, do ogniska przy jego wytwarzaniu, zapalaniu i zasilaniu, do prawego brzegu kadru przy eksplorowaniu i chodzeniu po mapie, a na środek polany, gdy czeka. Gdy je, zapala patyk, zbiera włókno albo walczy, zostaje, gdzie stoi. Dojście trwa zawsze 640 ms, a klatki zmieniają się co 160 ms, więc takt jest ten sam przy 1× i 16×. Gdy cel zmieni się w drodze, mag skręca z miejsca, w którym jest.
- **Plakietka nad głową.** Mała plakietka na pełnym tle pokazuje ikonę bieżącej czynności, tę samą co przy regule w edytorze, a pod nią pasek postępu tej czynności. Przy czekaniu i w walce plakietki nie ma.
- **Rekwizyty.** Patyki, krzak jagód i mech stoją w kadrze zawsze, także gdy na kafelku postaci ich nie ma. Ognisko stoi tylko wtedy, gdy jest na kafelku postaci: płonące z ruchomym ogniem albo wygasłe, tym samym obrazkiem szarym i bez ruchu.
- **Pauza i chwile, gdy czas stoi.** „Pauza” szarzeje całą scenę i zatrzymuje cały jej ruch. Zatrzymanie na odkryciu zostawia kolor i zatrzymuje ruch. Po śmierci ruch stoi, plakietki nie ma, a mag jest szary; po rozwiązaniu mapy ruch stoi, plakietki nie ma, a mag zostaje w kolorze.
- **Obraz, nie przycisk.** Kliknięcie w scenę niczego nie robi i nie stoi na niej znak pauzy. Scena nigdy nie błyska całą powierzchnią, a przy systemowym ograniczeniu ruchu klatki nie chodzą, mag staje na miejscu od razu, a pasek skacze zamiast płynąć.

Zrzuty stanów: patrz angielska wersja wyżej.

### Pod spodem

Obrazy i miejsca sceny leżą w danych gry, a nie w widoku, a ruch daje sama przeglądarka w stałym takcie, bez własnej pętli rysowania; sześć nowych plików obrazków z paczki Pixel Crawler ma same piksele.

## Do rozstrzygnięcia

1. **Obejrzyj scenę przed scaleniem.** Zadanie prosi, żebyś uruchomił tę gałąź lokalnie i obejrzał scenę przy 1×, 4× i 16×. Agenci czytali ruch tylko z nagranych klatek, a klatki mogą przegapić szarpnięcie przy 16×. Scalić, gdy obejrzysz i będziesz zadowolony?
2. **Szarość martwego maga i wygasłego ogniska.** Zadanie mówi tylko „szary” i „bez koloru”. Cykl wziął jedną wartość, której stary Loop używał dla obu, trochę jaśniejszą niż szarość pauzy, i jest ona teraz zapisana w dwóch decyzjach. Przyjąć czy zmienić? (Drobne uwagi, 10)
3. **Wygląd sceny wybrany przez cykl.** Miejsca maga przesunięto w lewo, żeby nie zasłaniał rekwizytów, które zbiera (jego obrazek jest dwa razy szerszy niż w starej grze); ikona plakietki ma 32 px w dostarczanym rozmiarze, a jej pasek jest dwa razy grubszy niż zwykle; marsz ma równą prędkość, gdy stary Loop zwalniał na końcach; pusta część paska ledwo odróżnia się od plakietki (około 1,2 do 1). Przyjrzyj się temu przy oglądaniu. Przyjąć czy poprosić o inny wygląd?
4. **Zaczęty marsz się kończy.** Gdy kolejna czynność zostawia maga w miejscu, na przykład jedzenie w czasie biegu do patyków, mag dokańcza marsz do starego miejsca zamiast stanąć, gdzie jest. Zapisana decyzja mówi, że zostaje, gdzie stoi. Przy 16× może to wyglądać jak mag biegnący, gdy „je”. Zostawić czy zrobić z tego zadanie? (Drobne uwagi, 7)
5. **Scena opuszczona w trakcie marszu powtarza marsz.** Jeśli wyjdziesz z ekranu przejścia w pierwszych 640 ms marszu i wrócisz, mag wskakuje tam, gdzie marsz się zaczął, i idzie go od nowa. Drobne i samo się naprawia. Zrobić z tego zadanie? (Drobne uwagi, 6)
6. **Krzak jagód nie ma jagód.** Paczka nie ma krzaka z jagodami, więc „krzak jagód” to ten sam zwykły krzak, którego używał stary Loop. Przyjąć? (Drobne uwagi, 3)
7. **Scena pyta przeglądarkę, dokąd doszedł idący mag.** Dzięki temu skręt zaczyna się tam, gdzie mag jest, ale zapisana reguła o tym, z czego obraz może rysować, tego nie nazywa. Cykl i recenzenci uznali to za dozwolone. Przyjąć tę interpretację?
8. **Luka w decyzji, przyjęta przez plan.** Decyzja o wartościach wpisanych na stałe mówi, że klatki i pozycje obrazka są dozwolone, ale automatyczny strażnik nadal odrzuca pozycje obrazka zapisane w pikselach w arkuszu stylów; scena podaje je z kodu w procentach. Kolejne zadanie sceny, które będzie chciało pikseli w arkuszu stylów, będzie musiało zmienić strażnika. Przyjąć?
9. **Nowe automatyczne sprawdzenie, testem zamiast recenzją.** Zatwierdzone sformułowanie reguły, że obraz serwera zawiera każdy plik, który rysuje scena, mówiło o sprawdzaniu recenzją; cykl zapisał ją z automatycznym testem, który buduje obraz serwera i porównuje każdy plik obrazka bajt po bajcie. Wydłuża to pełne uruchomienie testów o około półtorej minuty tam, gdzie jest Docker, a bez niego test jest pomijany i reguła zostaje niesprawdzona. Przyjąć?
10. **Czego cykl nie sprawdził.** Marszu maga przy 2× nie prześledzono, przy 8× tylko częściowo, a większość zrzutów mniejszego rozmiaru odczytano ze stanu strony, a nie obejrzano. Dostarczany rozmiar obejrzano w każdym stanie. Scalić bez tego?

## Koszt

Cykl zajął około 3 h 15 min czasu pracy (tury orkiestratora i agentów razem) i 171,7 mln tokenów, prawie wszystkie jako wejście z pamięci podręcznej: Sonnet 80,4 mln, Opus 71,7 mln, Haiku 19,6 mln. Były cztery recenzje kodu — slice 1 z wpisami fundamentu, cała zmiana, poprawka jedynego blokującego ustalenia i commit kroku powrotnego — i jedna runda blokująca: recenzja całej zmiany, poprawiona raz, a poprawka przeszła. Tabela etapów jest w rekordzie: [etapy](https://github.com/mariusznazar/loop2/blob/[[SHA]]/docs/task-cycles/scena-z-ludzikiem/stages.md).

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo odnośnik do rekordu cyklu przetrwa tylko wtedy; ściśnięcie albo rebase go zerwie.

</details>

## Technical changes

The change is about 2,550 lines in 23 files, made in six slices after a foundation step, one after another.

- **Foundation step** (commits `40ded65`, `0d11c97`): decisions D-316 to D-322 and the parts of D-04, D-39, D-40, D-43, D-122 and D-271 that this task makes true, and the invariant `loop2-container-sprites`.
- **Slice 1, sprite files** (`873f9f9`, `d3a04f3`): `assets/sprites/mage-idle.png` (four 64 × 64 frames), `mage-run.png` (six), `fire.png`, `sticks.png`, `berry-bush.png`, `moss.png`, each holding only the pixel chunks; the mage re-cut from the pack's Wizzard sheets to one common frame size, the others traced to the pack and copied; `README.md` names them. The one-off Pillow script stayed outside the repository.
- **Slice 2, container check** (`a20acf5`, `bd7216b`): `tests/invariants/test_loop2_container_sprites.py` builds the server image and compares each PNG served at `/sprites/<name>` with the file in the working tree; the part map claims it under `deployment`.
- **Slice 3, data and picture module** (`e7c19c2`, `73564b5`): `src/browser/sim/data/scene.ts` (pictures, frame sizes, places) and `src/browser/view/scene-picture.ts` (a pure function from the game state to what the scene draws: the mage's goal, props, fire, badge, standing), with `tests/view/scene-picture.test.mjs`.
- **Slice 4, the scene drawn still** (`ddff013`, `a3368dc`, `5d12eea`): `src/browser/view/scene.tsx`, the scene's rules in `src/browser/styles.css`, `world-area.tsx` drawing it in place of the picture; the mage's places moved 16 px left for his wider frame (moss 32, sticks 42, bush 224, fire 80, clearing 144, right edge 275 in pixels of the 336-wide frame).
- **Slice 5, motion** (`3046a37`, `d2851be`): CSS animations at the 160 ms and 640 ms beats; the walk is a CSS animation started on a new element from the offset the browser reports (one layout effect); every stop holds all animation by pausing it; reduced motion keeps everything still; `run-screen.tsx` hands the simulation's events down.
- **Slice 6, guidelines** (`c6dd7c3`): the styleguide's new rule for the scene and its exemptions, and rows for the three new files in the coding guidelines.
- **Fix and return step** (`6ee3c4d`, `81f6f08`): D-43's example reworded to what the guard allows (review finding I1); D-318's words matched to the data (the fibre; „Zjedz — jagoda”).

## Checks

- **The gate:** `npm test` on the final head `81f6f08` in the task's worktree, **exit 0**, nothing failed and nothing was skipped: 1,719 Node tests passed (0 failed, 0 skipped), the three Python groups passed (13, 115 and 244 tests, the last with Docker answering, so the new container test ran and was not skipped; then 40 quality tests), and the foundation check reported 0 errors. The final tree is the tree the gate checked.
- **On the base** (`8f9e713`), `npm test` ended with exit 1 in this fresh worktree only because the quality tools' environment that the README installs did not exist yet: `test_ruff_source_rules` and `test_shellcheck_source_rules` errored at process start. After installing it as the README says, the quality tests passed on the base; the foundation check was 0 errors on the base. No check fails on the base itself.
- **Failed in a cycle run and passed after the fix of the code:** `tests/invariants/test_browser_view_framework.py` failed once during slice 5 (it read a minified CSS variable name `--walk-from` as an import); the variable was renamed to `--walk-start` and the test passes. `tests/quality/test_quality_invariants.py` failed once in slice 3 on an unused import in the new test, removed. Both files belong to the task's own parts; none is flaky.
- **Own-work checks:** slice 1 — each new picture traced to the pack by comparing pixels, chunk types listed, build output compared byte for byte; slice 2 — the container test seen failing against a wrong expectation and passing; slice 3 — the picture module's tests seen failing against a stub (26 failing) and the container case broken on purpose and restored; slice 4 — the scene test seen failing against a stub (9 failing), the two greys mutated and restored, the mage's places corrected after screenshots showed him covering the sticks; slice 5 — eight of nineteen cases failing first on their assertions, one mutation of the badge's key at first uncaught and its case changed, the walk, the stops, the turn on the way, „Restart”, a load, reduced motion and a completion read from frame streams at the committed head; slice 6 — the foundation check and the token-values test.
- **User-interface states and screenshots:** operated in a real browser as the project's play skill gives (the settled way). At scale 2, the size that ships, the scene was looked at while exploring, gathering a stick, moss and the berry bush, at the burning and the extinguished fire, waiting in the clearing, paused, at a discovery, after a death and after the map was solved. At scale 1 (the smaller size, changed locally and not committed) most screenshots were read from page state and not looked at. Motion: frame streams at 1× and 16× (the beat held at 157–164 ms, a walk 643 ms), 8× partly, a pause and a discovery during a walk, a turn on the way, „Restart”, a load, reduced motion and a completion; 2× was not traced. Your own viewing at 1×, 4× and 16× is **unchecked** and stays with you.
- **The form check of this description:** `python -B .the-way/task-cycle/request_check.py docs/task-cycles/scena-z-ludzikiem/request.md --task docs/task-cycles/scena-z-ludzikiem/task.frozen.md`, exit 0 ("form holds"), run 1 of the description before the record's link was put in; its last run is recorded in the record's *Request handoff*.

## Foundation entries

Written by this change, each with its meaning in one sentence:

- **D-316** (`projected`, and `row 3`): the scene draws the character and its campfire from the game state, holds no state of the game, takes its pictures from the game's data, always shows sticks, bush and moss, and shows the campfire only on the character's tile, burning or still and grey.
- **D-317** (`projected`, its last sentence only; task 20 writes the rest): the scene follows the system's setting for reduced motion and shows no flash of its whole area.
- **D-318** (`row 2`): where the mage goes for each activity.
- **D-319** (`row 4`): the walk lasts 640 ms and the frames change every 160 ms at every pace; a changed target turns the mage from where he is; he stands at once at the start, after „Restart”, after a load and under reduced motion.
- **D-320** (`row 5`, `row 6`, `row 9`): what stands over the mage's head: a badge on a solid panel with the action's icon in `text-strong` and a bar in `positive` on a `highlight` track; none while waiting and none in a fight.
- **D-321** (`row 7`): the scene is a picture; a click does nothing and no pause sign stands on it.
- **D-322** (`row 1`, `row 8`): what the scene shows while time stands still: the pause greys it and stops its motion, a discovery keeps its colours, a death and a completion stop the motion and take the badge away, the dead mage grey.
- **D-04** (`projected`, the part for the scene): the scene may also draw from its previous reading of the game state and from the events the simulation returned.
- **D-39** (`projected`, the part): `positive` also fills the progress bar over the mage's head, on a `highlight` track in a `panel` badge, with at least 3:1.
- **D-40** (`projected`, the part, and `row 9`): the badge stands on `panel`, the bar's track takes `highlight` and the icon in the badge `text-strong`.
- **D-43** (`projected`, the part, and `row 9`): the geometry of the scene and the frames and positions of a sprite are no values written in place of a token, and an icon with no text beside it takes `text-strong`.
- **D-122** (`projected`, the part, and `row 1`): at a stop at a discovery the scene keeps its colours.
- **D-271** (`projected`, the part): the character of the scene is the pack's mage.
- **Invariant `loop2-container-sprites`** (`projected`): the container built from the repository serves every file the scene's drawing asks for at `/sprites/<file name>` with the same bytes as the file in `assets/sprites/`; its method is a test, where the approved wording had review.

No kept row is tied to an entry already stated. Invariant tests altered: none; one new invariant test, `tests/invariants/test_loop2_container_sprites.py`, plus the case in `tests/view/scene-picture.test.mjs` that cites it. Surfaces altered: none. *Violated* marks set or cleared: none.

## Minor findings

From the review of the whole change (the first four also stood in the review of slice 1 with the foundation entries), in the reviewer's words condensed; places in the code follow.

1. D-317's question "How long do the scene's effects last?" promises durations its body does not state; the partial entry is the task's assignment and task 20 completes it (`foundations/decisions.md`, D-317).
2. The README sentence repeats „autorstwa Anokolisy, których warunki nie wymagają wzmianki” and holds three parts in one list item; Polish only (`README.md:25`).
3. `berry-bush.png` holds a bush with no berries; the pack has none and the name is the game's name for the thing; no action (`assets/sprites/berry-bush.png`).
4. D-318 named the fibre „the flax”; the return step corrected it (fixed in `81f6f08`).
5. The case "a loaded map run comes back paused, so it stands as at a pause" tests nothing of a load: its input equals the pause case; the load is covered by the scene's first-draw case (`tests/view/scene-picture.test.mjs:416-423`).
6. A walk replays after the screen is hidden and shown again within 640 ms of its start, because `display: none` cancels the animation without an end event (`src/browser/view/scene.tsx:221-230`).
7. Where the next action "stays", a walk under way finishes at its old target, while D-318 says "stays where it stands" (`scene.tsx:122-126`, `placeOf`).
8. The container test's docstring cites "Slice 3 of task `scena-z-ludzikiem`", which exists only in the ignored `.runs/` folder; it should name the case in `tests/view/scene-picture.test.mjs` (`tests/invariants/test_loop2_container_sprites.py:12-13`).
9. The invariant `loop2-container-sprites` departs from the approved definition: its sentence is reworded (served path and bytes), its method is `test` instead of `review`, its parts are widened to five and D-316 added; stricter, not looser (`foundations/invariants.md:1209-1217`).
10. The grey `grayscale(1) brightness(0.55)` stands in two decisions as binding though no human chose it; changing it later takes a decision change as well as one value in the stylesheet (D-316, D-322; `src/browser/styles.css`).
11. The styleguide's rule "Contrast of every pair" does not mention the progress fill, while the new scene rule states 3:1 for it; one clause (`guidelines/styleguide-browser-view.md:170-172`).
12. From the review of the fix: the new example in D-43 is slightly narrower than the code — the walk's start offset is a percentage of the mage's own frame and the frame stepping is a percentage in the stylesheet; the guard accepts both (`foundations/decisions.md`, D-43).

## Findings outside the task's scope

1. D-122's *Accepted with it* still says a stop at a discovery cannot be told apart in the game state from the player's pause, beside the new clause that the scene keeps its colours at a discovery; the task assigns the correction to task 16 (`foundations/decisions.md`, D-122). Minor, outside the scope.

No check whose file belongs to a part outside the task's parts failed in a cycle run and passed again.

## Course of the cycle

- **Task and sources:** task 7 `scena-z-ludzikiem` of the plan for MVP2 of loop2 (depends on task 6, merged as request 58); sources `definicja_mvp2_loop2.md` at efc19197 and the task document accepted on 2026-11-03; the plan file has changed since only in states and log lines.
- **Process pin:** the-way at `61c72fb`, the commit the target branch's gitlink records; this task does not move it.
- **Spec:** none — no open design choice was found at the start.
- **Route:** planned slices; the task has fifteen items across five parts, nine settlement rows and carried projected entries, two guideline updates and motion that only frames can show, so one agent could not hold it.
- **Plan:** `plan.md` in the record, six slices, all fitting the size check (`plan-size.md`).
- **Choices:** 10 rows of other choices in the questions table of the record (`cycle.md`, *Questions and autonomous choices*).
- **Blocking findings left:** none; the one blocking finding of the review of the whole change was fixed in `6ee3c4d` and the review of the fix passed.
- **Record:** [[RECORD_LINK]]
