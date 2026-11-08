**State: ready** — the change is made, reviewed and tested; seven items below wait for your yes.

## What you will see

On the screen of a map run the program is now wide, as in the original Loop: in a window 1280 px wide it is 526 px, where it was 174 px. The scene keeps its full size, 672 × 304 px, and there is no second, smaller size any more. The screen has two columns under its header: on the left the world, and under the drawing of the map and the line of a tile the tabs „Kronika” and „Teren” with the chronicle and its filters or the table of revealed tiles; on the right the program, as tall as the world and the tabs together. In a window too narrow for two columns (below about 1074 px) the three parts stand one under the other: the world, the program, the tabs. The question „Zapisać, odrzucić, wrócić?” after „Zakończ” now stands on one line at 1280 px, where it needed three.

A rule's panel (and a rule group's panel) no longer opens in a column of its own. It opens in place, in the program, directly under the row of the rule, or under the title of the group, that you are changing. This holds on the screen of a map run and on Programy, where an open rule no longer adds a third column; the list of programs and the program stay the only two. The panel does not take the place of the tabs any more, so the tab you picked stays, and the chronicle stays beside the program while you write. Folding or unfolding a group while one of its rules is open no longer moves the keyboard away from the fold button, and the panel stays on the field you were on.

A low window shows the cost you accepted for the tabs under the world: at 1280 × 720 the chronicle starts below the bottom edge of the window and you scroll to it. The place of the end of a map run is not decided here; the later task for it chooses it.

### Underneath

The program panel now draws the rule panel itself, once, and puts it into the list under the row or the group title; the separate host that placed it in a column and the second scale of the scene are removed. Ten decisions of the foundation were changed and two added to say all this.

## For you to decide

1. *Not measured in a browser.* The program's 526 px was measured in a browser that draws its scrollbar over the page. A browser with the usual scrollbar of about 15 px (Chrome and Edge on Windows) gives the program about 15 px less (about 511 px at 1280), and the two columns then start a little later than the stylesheet's comment said before; the comment now says so, and no threshold was changed. How the narrow window of Programy (below 1100 px) looks was reasoned from the code and not opened in a browser. Accept it as it stands?
2. *Where the panel stands when its group is folded.* The task did not say. A rule that is open inside a folded group keeps its panel, directly under the group's title; folding does not close it and unfolding is not done for it. Accept?
3. *Where two columns start.* The task gave no number: the columns start from a window of about 1074 px, where the program is still at least 320 px (the same minimum as the editor of Programy). Below it the three parts stand one under the other. The program's frame is as tall as the world and the tabs together; the frame of the tabs ends under its content. Accept?
4. *A rule dragged over the open panel.* A rule or a group dragged over an open panel shows no line and is not accepted there; you drop it elsewhere. Before this change nothing stood there to drop on. Accept?
5. *Two settlements written into existing decisions.* The task's first two rows (the panel in place; two columns with the tabs under the world) were written into the two decisions they change, not as two new ones, since a separate decision would repeat the same sentence; the third row (one scene size) became a new decision. Accept?
6. *Foundation entries you did not see at the task* (they follow from the three settlements): the decision on the screen of a map run lists the tabs as part of the area under the world, not of a right area; the decision on the areas the screens leave room for names the new areas; the decision on the list of revealed tiles says the list stands behind a tab; the decisions on the chronicle (what it holds, how it stands and is filtered, and how long an entry's text may be) say the filter and the entries live in the area under the world; the decision on how long a picked tab holds says an open or closed panel leaves it alone; the decision on „Teraz” and the end of a map run keeps the place of the end open; the decision on Programy now says the program stands on the right of the list; and a new decision says that a rule panel open in a folded group stands under the group's title. Accept?
7. *Findings left unfixed that you will feel.* Moving an open rule with the arrows into another group closes its panel; it did so before this change, and no part of the task asked for it to follow the rule. In a window narrower than about 738 px the scene (672 px) is wider than the area that holds it; it was so before this change. Fix them in this request, or make a task of it? (Findings outside the task's scope, 2 and 3)

## Cost

About 1 hour 44 minutes of working time, counted from the session's transcripts, 136 million tokens in all (most of them cached input), on three models: Sonnet 5.5 for the orchestrator and eight agents, Haiku 5.5 for four slices and a repair, Opus 5.5 for the review of the whole change. One round of review of the whole change failed with one important finding; one fix, reviewed by the same reviewer, passed. The full gate ran twice on the final code: the first run failed on a copy of a skill file that one slice had left out of step with its twin, the second passed. The table of stages: the table of stages is linked here once the record is committed

## How to merge

Merge with a merge commit, not a squash or a rebase, so that the commits and the link to the record of the cycle survive. Nothing in this request waits for it, but the foundation has waited for a review through 64 merges since the start of the history, where the threshold is 30; the review is the skill `the-way-review-foundation`, started in a session in this repository.

<details>
<summary>Po polsku</summary>

**Stan: gotowe** — zmiana jest zrobiona, sprawdzona i przetestowana; siedem punktów niżej czeka na Twoje „tak”.

## Co zobaczysz

Na ekranie przejścia program jest teraz szeroki, jak w oryginalnym Loop: w oknie 1280 px ma 526 px, a miał 174 px. Scena zachowuje pełny rozmiar 672 × 304 px i nie ma już drugiego, mniejszego rozmiaru. Ekran ma pod nagłówkiem dwie kolumny: po lewej świat, a pod rysunkiem mapy i linią kafelka zakładki „Kronika” i „Teren” z kroniką i jej filtrami albo tabelą odsłoniętych kafelków; po prawej program, tak wysoki jak świat z zakładkami razem. W oknie za wąskim na dwie kolumny (poniżej około 1074 px) trzy części stoją jedna pod drugą: świat, program, zakładki. Pytanie „Zapisać, odrzucić, wrócić?” po „Zakończ” stoi teraz w jednym wierszu przy 1280 px, a potrzebowało trzech.

Panel reguły (i panel grupy reguł) nie otwiera się już w osobnej kolumnie. Otwiera się w miejscu, w programie, tuż pod wierszem reguły albo pod tytułem grupy, którą zmieniasz. Dotyczy to ekranu przejścia i Programów, gdzie otwarta reguła nie dodaje już trzeciej kolumny; lista programów i program zostają jedynymi dwiema. Panel nie zajmuje już miejsca zakładek, więc wybrana zakładka zostaje, a kronika stoi obok programu, gdy piszesz. Zwinięcie albo rozwinięcie grupy, gdy któraś jej reguła jest otwarta, nie przenosi już klawiatury z przycisku zwijania, a panel zostaje na polu, na którym byłeś.

Niskie okno pokazuje koszt zakładek pod światem, który przyjąłeś: przy 1280 × 720 kronika zaczyna się poniżej dolnej krawędzi okna i trzeba do niej przewinąć. Miejsce końca przejścia nie jest tu rozstrzygnięte; wybierze je późniejsze zadanie.

### Pod spodem

Panel programu rysuje teraz panel reguły sam, raz, i wstawia go do listy pod wierszem albo pod tytułem grupy; osobny host, który umieszczał go w kolumnie, i druga skala sceny zostały usunięte. Dziesięć decyzji fundamentu zmieniono i dwie dopisano, żeby mówiły to samo.

## Do rozstrzygnięcia

1. *Niezmierzone w przeglądarce.* 526 px programu zmierzono w przeglądarce, która rysuje pasek przewijania nad stroną. Przeglądarka ze zwykłym paskiem około 15 px (Chrome i Edge na Windows) daje programowi około 15 px mniej (około 511 px przy 1280), a dwie kolumny zaczynają się nieco później, niż mówił komentarz arkusza stylów; komentarz teraz to mówi, progu nie zmieniono. Jak wygląda wąskie okno Programów (poniżej 1100 px), wywnioskowano z kodu i nie otwarto w przeglądarce. Przyjmujesz tak, jak jest?
2. *Gdzie stoi panel, gdy jego grupa jest zwinięta.* Zadanie tego nie mówiło. Otwarta reguła w zwiniętej grupie zachowuje panel tuż pod tytułem grupy; zwinięcie go nie zamyka, a rozwinięcie nie jest robione dla niego. Przyjmujesz?
3. *Od kiedy dwie kolumny.* Zadanie nie podało liczby: kolumny zaczynają się od okna około 1074 px, gdzie program ma jeszcze co najmniej 320 px (tyle, ile najmniej ma edytor Programów). Niżej trzy części stoją jedna pod drugą. Ramka programu jest tak wysoka jak świat z zakładkami razem; ramka zakładek kończy się pod swoją treścią. Przyjmujesz?
4. *Reguła przeciągnięta nad otwarty panel.* Reguła albo grupa przeciągnięta nad otwarty panel nie pokazuje linii i nie jest tam przyjmowana; upuszczasz ją gdzie indziej. Przed tą zmianą nic tam nie stało, więc nie było na co upuszczać. Przyjmujesz?
5. *Dwa ustalenia zapisane w istniejących decyzjach.* Dwa pierwsze wiersze zadania (panel w miejscu; dwie kolumny z zakładkami pod światem) zapisano w dwóch decyzjach, które zmieniają, a nie jako dwie nowe, bo osobna decyzja powtórzyłaby to samo zdanie; trzeci wiersz (jeden rozmiar sceny) stał się nową decyzją. Przyjmujesz?
6. *Wpisy fundamentu, których nie widziałeś przy zadaniu* (wynikają z trzech ustaleń): decyzja o ekranie przejścia podaje zakładki jako część obszaru pod światem, a nie prawego obszaru; decyzja o obszarach, na które ekrany zostawiają miejsce, nazywa nowe obszary; decyzja o liście odsłoniętych kafelków mówi, że lista stoi za zakładką; decyzje o kronice (co zawiera, jak stoi i jest filtrowana, jak długi bywa wpis) mówią, że filtr i wpisy żyją w obszarze pod światem; decyzja o tym, jak długo trzyma się wybrana zakładka, mówi, że otwarty lub zamknięty panel jej nie rusza; decyzja o „Teraz” i końcu przejścia zostawia miejsce końca otwarte; decyzja o Programach mówi teraz, że program stoi po prawej od listy; a nowa decyzja mówi, że panel reguły otwarty w zwiniętej grupie stoi pod tytułem grupy. Przyjmujesz?
7. *Uwagi, których nie poprawiono, a które odczujesz.* Przesunięcie otwartej reguły strzałkami do innej grupy zamyka jej panel; tak było przed tą zmianą i zadanie nie prosiło, żeby panel szedł za regułą. W oknie węższym niż około 738 px scena (672 px) jest szersza niż obszar, który ją trzyma; tak było przed tą zmianą. Poprawić je w tej prośbie, czy zrobić z tego zadanie? (Uwagi poza zakresem zadania, 2 i 3)

## Koszt

Około 1 godziny 44 minut czasu pracy, liczonego z transkryptów sesji, razem 136 milionów tokenów (większość to wejście z pamięci podręcznej), na trzech modelach: Sonnet 5.5 dla koordynatora i ośmiu agentów, Haiku 5.5 dla czterech plastrów i naprawy, Opus 5.5 dla przeglądu całej zmiany. Jedna runda przeglądu całej zmiany nie przeszła z jedną ważną uwagą; jedna poprawka, oceniona tym samym recenzentem, przeszła. Pełna bramka poszła dwa razy na końcowym kodzie: pierwszy przebieg padł na kopii pliku skilla, którą jeden plaster zostawił niezgodną z bliźniaczą, drugi przeszedł. Tabela etapów: the table of stages is linked here once the record is committed

## Jak scalić

Scal commitem scalającym, nie squashem ani rebase'em, żeby commity i odnośnik do zapisu cyklu przetrwały. Nic w tej prośbie na to nie czeka, ale fundament czeka na przegląd od 64 scaleń od początku historii, a próg to 30; przegląd to skill `the-way-review-foundation`, uruchomiony w sesji w tym repozytorium.

</details>

## Technical changes

- The screen of a map run (`src/browser/view/run-screen.tsx`, `src/browser/view/right-area.tsx`, `src/browser/styles.css`; commit d737a1a): the host element and the "rule panel open" store of the screen are gone; the third section (tabs and chronicle) is always drawn and a named grid puts it under the world from about 1074 px; the program section spans both rows. The areas stay three sections in this order, so the keyboard order and the stacked order are unchanged. The scene's one size and the grid replace the two-scale rules (commit f9a5b86, `src/browser/view/world-area.tsx`).
- The rule panel in the list (`src/browser/view/rule-list.tsx`, `src/browser/view/program-panel.tsx`; commits a5aa424, a43cc8e): the rule list draws the panel at a slot under the open row or under the header of the group (the folded-group case included); after the review, one host element is drawn once through a portal at the list's root and moved by the slots' refs, so a fold or a move does not mount the panel again (the focus and the field stay). The item that holds it is marked `role="presentation"`, and the panel is no drop target.
- Programy (`src/browser/view/game-view.ts`, `src/browser/styles.css`, commit 6ee2e7f): no area for the panel, two columns in every state. The host path (`placeRulePanel`, its portal and callback) and the stale words about a right area, a panel beside the rows and two scales are removed (commit df84a1d), and the step of the `loop2-play` skill that said the panel replaces the table of revealed tiles is corrected in both copies of the skill (commits df84a1d, 64a8a83).
- The styleguide (commits 38dfa8c, 405534e): the tabs stand in the area under the world, the scene has one size, and the scene rule cites its decision.
- Tests (`tests/view/*.test.mjs`): each behaviour change began with a failing test; two cases that tested only the removed host and one duplicate case were deleted with their reasons in the reports; the name-assertions on the removed scale were replaced by a check of the one size against the window and the game state (commit c6a99da).
- Foundation (`foundations/decisions.md`; commits 189d589, 5e81459, f0421c3): see *Foundation entries*.

## Checks

- The gate, `npm test`, on the final code (`64a8a83`): exit 0 in run 2 — 2005 Node tests passed, 0 failed; `412 tests in 4 directories; every directory passed`; the foundation check reported `0 errors`. Run 1 on `f0421c3` failed: `tests/agent_workflow`, `test_both_copies_are_byte_identical` (the skill `loop2-play` has two copies that must be byte-identical; one slice changed only one), fixed in `64a8a83`; so the check failed in 1 cycle run and passed in 1, the rerun's result being the pass above.
- Failing on the base `01b26d5` as well: `tests/startup.test.mjs`, "exits with an error instead of reporting ready when its listening port is occupied", timed out (`ETIMEDOUT` after 5 s) in the base run during which an agent worked in the same checkout; alone it passes (18 of 18). Neither final run showed it. It belongs to the part `account-server`, outside this task's part.
- Not run: 8 Docker tests of `tests/deploy` and `tests/invariants` (container isolation, icons, sprites, one serving process, connector image, container replacement, restore trial, backup bytes) were skipped, as on the base, since no Docker daemon answers on this computer; they stay unchecked. Mutation testing was not run (the task changes no part with a mutation tool).
- A real browser (the skill `loop2-play`, Playwright CLI, Chromium without a window): Programy at 1280 px (two columns, the panel under a row and under a header, a fold with the panel open); the screen of a map run at 1280, 1074, 1073 and 1000 px (the program 526 px at 1280 and 320 px at 1074, the stacked order below, the panel under its row with the tabs unchanged, „Dodaj regułę z tym” under the new rule, the end question on one line, the badge over the mage 32 × 32 px with a bar 4 px thick, as before); the fold and unfold with Enter and Space with the focus staying on the button; five screenshots, each looked at, in the record (see the images above). The state is built through the skill's own composed saved game.
- Own-work checks: slice 1 (the folded-group case and "opening another rule moves the panel"), slice 2 (two areas under a header and a row), slice 3 (the one size 672 × 304 and the badge), slice 4 (no gap under the world whether the program is shorter or taller; measured at 1074 px), slice 5 (no leftover host path or right-area wording, by `git grep`), slice 6 (no old wording left in the styleguide), the fix (the focus and the field after a fold, shown failing on the old code with exit 1 and passing).
- The review of the whole change ran the build, nine focused view test files, typecheck, eslint, prettier, three browser-view invariant tests and the foundation check in a separate worktree, all exit 0; the review of the fix and of the return step the same kind of checks, all exit 0.
- The form check of this description: pending. The check of private paths on this description: pending. The check of private paths on the copy of the record: pending. The remarks check on the original and on the copy: pending.

## Foundation entries

- D-288 (row 1) — the rule panel opens in place under the row of the rule or the title of the rule group it changes, on Programy and on the screen of a map run, and takes no column of its own. The row is tied to this existing decision; no second entry.
- D-311 (row 2) — the screen of a map run has two columns under its header: the world with, under the drawing of the map and the line of a tile, the area with the tabs „Kronika” and „Teren”; on the right the program. The row is tied to this existing decision; no second entry.
- D-349 (row 3, new) — the scene has one size, 672 × 304 px, twice its picture, with no second scale.
- D-282 (the cycle's) — the examples of areas now name the world, the program and the area with the tabs, and the list of programs and the editor of Programy.
- D-19 (the cycle's) — the list of revealed tiles stands behind the tab „Teren” of the area under the world.
- D-338, D-343, D-345 (the cycle's, wording) — the chronicle's filter and entries stand in the area with the tabs under the world.
- D-346 (the cycle's) — the picked tab stays in the area under the world, and an open or closed rule panel leaves it as it was.
- D-334 (the cycle's, wording) — the end of a map run is said to stand on the screen; its place stays open for the later task.
- D-166 (the cycle's) — on Programy the program editor stands on the right of the list; its *Origin* names this task.
- D-350 (the cycle's, new, from the return step) — a rule panel open on a rule of a folded group stands directly under the group's title, and folding or unfolding closes no panel and changes no field.
- No invariant test was changed, no surface of the part map, and no *Violated* mark set or cleared; no glossary entry and no environment fact written.

## Minor findings

- Review of the return step, M-1 — `foundations/decisions.md`, D-350 *Rejected* and the last sentence of its rationale: "*Rejected* says that closing the panel on a fold means "the player would lose the field and the rule being written". … The part about losing "the rule being written" is the writer's own addition and is not right: D-306 says "each pick changes the rule at once", so a closed panel loses the open field and the player's place in it, not the rule." (Suggested wording: "the player would lose the open field and the place in it". Not blocking; within the task; not fixed.)
- The Minor finding N-1 of the review of the fix (the *Origin* of D-166 named no source) was fixed by the return step in `f0421c3`. All seven Minor findings of the review of the whole change were fixed.

## Findings outside the task's scope

1. Review of the whole change, Declined to judge: "`createRulePanel` and the rule `.rule-panel-host` (`src/browser/view/rule-panel.tsx:593`, `src/browser/styles.css:1865-1869`) are used by tests alone — already so at the base `01b26d5`; not left behind by this change."
2. Review of the whole change, Declined to judge: "The scene's fixed 672 px in windows narrower than about 738 px, where the world area is narrower than the scene — unchanged from the base (the scale 2 was already in force there) and outside the task's questions."
3. Review of the fix, Declined to judge: "The page closing the open rule's panel when „↑”/„↓” moves the rule across a group border (`open.target.groupId` in `src/browser/view/program-panel.tsx`): the base `01b26d5` behaves the same and no part of this task asks for the panel to follow the rule; it is for the orchestrator or a later task to decide whether the page should update `open` at such a move."
4. Review of the return step, Declined to judge: "The sentence in D-306 listing what closes the panel („✕”, Escape or opening another rule) is shorter than the code (a move of the open rule across a group border and the deletion of the rule also close it, as the return report notes). It is already so at the base and is not touched by this commit; a different question for another request. Outside the task."
5. Review of the return step, Declined to judge: "Whether a rule added by „Dodaj regułę z tym” into a folded first group should unfold the group (D-313 is silent, as the return report says). Behaviour outside the task."
6. Review of the return step, Declined to judge: "Whether D-288's binding sentence should be widened by a clause on a folded group instead of a separate D-350. It reads as complete under the template (a new rule next to an existing decision is a new question, WAY-19); I chose not to judge a different shape of the foundation."

The task's place of the end of a map run (*Out of scope* of the task) is left to the later task for it.

## Course of the cycle

- **Task and sources:** an independent task: the rule panel on the list and two columns of the screen of a map run, so that the program is as wide as in the original Loop; sources: the task document approved on 2026-11-08, the foundation and code at `01b26d5` (after the merge of the chronicle with filters).
- **Process pin:** `294af7fde45323ac1851c014a03071a97fc38d96`, not moved.
- **Spec:** none: the task settles what the player sees; how the panel is hosted under a row and how the grid is written are choices of how, listed in the plan and in the record.
- **Route:** planned slices (six slices and the foundation entries before them), because the change spans separable work with its own tests; no discarded attempt.
- **Plan:** six slices, each `fits` the size script, the plan and its size report are in the record; slices 1 and 4 on the same class as the orchestrator, the others on a cheaper one; no slice had a review of its own, the review of the whole change judged them all.
- **Choices:** 16 other choices, see the questions table of the record: the record is linked here once it is committed
- **Blocking findings left:** none; one blocking finding of the review of the whole change was fixed and the fix passed its review.
- **Record:** linked once the record is committed
