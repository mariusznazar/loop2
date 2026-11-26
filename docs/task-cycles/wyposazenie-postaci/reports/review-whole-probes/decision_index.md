# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 45. Listed by heading alone: 0.

## Listed in full

### D-206 — What happens to a saved game state of another version?

A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one. The game discards a saved game state of any other version, loading none of it as a game, and starts the player anew; the server keeps the document that a save of a higher version replaces as the previous save (D-399), and an account with the previous-save privilege (D-400) can append its programs one by one (D-401). A saved game state whose character names an archetype missing from the data is also discarded whole.

The judgings the browser remembers (D-441) are no part of the saved game state: a discarded saved game state takes none of them along, and the game started anew shows none of those remembered for the game discarded.

- **Scope:** simulation, browser-view

### D-445 — How does the figure of a character stand on the screen Postać?

In the section „Wyposażenie” of the left area of the screen Postać, in the middle of the tiles of the slots of the gear (D-461), stands the figure of the character: the same picture as that character in the picture band of Siedziba (D-389), at twice its size, moving in the frames of its idle sheet at the scene's fixed beat with no loop of drawing and standing still under the system's setting for reduced motion. It stands whatever the character does — in the camp, in a manual map run going, paused or ended, and in an earning loop — always in the same pose, with no clearing under it, on the flat background of its area. It is a picture, not a control, taking no click and no key, hidden from readers of the screen, with no text on it or over it.

- **Scope:** browser-view

### D-446 — What does the screen Postać show of a character at the top of its left area?

At the top of the left area of the screen Postać, above the frame of what the character does (D-447), stand the character's name as the heading of the screen, under it one line with „pokolenie {n}” from generation number 2 up (D-218), the icon of the character's archetype and the archetype's name, and under that line the line of the resurrection (D-217). The icon of an archetype is an icon of game-icons.net (D-27) whose file the archetype's data names, and it stands before the archetype's name, drawn as a mask in the colour of that name.

- **Scope:** browser-view · simulation

### D-447 — What does the screen Postać say of what the character does now?

Under the facts of a character (D-446) stands, always and with no heading, a frame whose first line says in the role `text` what the character does: „W obozie” where the character is neither the character of a manual map run nor in an earning loop; „Przejście: {mapa} · minuta {m}” while its manual map run goes on or waits in a pause, that line followed by „ · postać zginęła” or „ · mapa rozwiązana” once the map run has ended and waits for „Restart” or „Zakończ”, {m} being the minute the clock in the header of that map run writes; and the line of its earning loop with „Zatrzymaj” (D-244) while it is in one. After a stop of its earning loop the frame reads „W obozie” with the line of the stop under it (D-245). The frame shows no current action of the character and holds no button but „Zatrzymaj”.

- **Scope:** browser-view

### D-44 — Which controls do the screens of the browser view build on?

The screens of the browser view build every button, select list, number field, text field and cell of a pick from the shared controls of `src/browser/view/controls/` — the button in its kinds (the plain button, the destructive button, the button selected in its group, the secondary action (D-275), the tab (D-276), the main look outside a form (D-274) and the button in `positive`), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons, with their text in `danger` at rest, in every layout, and the background `highlight` besides under the pointer, and „Odbierz”, which pays the practice waiting at an earning loop, is the plain button with its text in `positive` at rest and under the pointer (D-39). „Usuń z regułami”, which deletes a rule group with its rules from the window of the group in the phone layout (D-296), is a destructive button as well.

A control awaiting a server response is disabled with text in `text-disabled`, „Zacznij od zera” while its reset waits for the server among them; the button that sends a form then reads „Logowanie…”, „Zakładanie konta…”, „Wysyłanie…” or „Ustawianie…” for the corresponding form — „Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła” or „Ustaw nowe hasło” — and that form's fields are disabled, and the button „Wyślij ponownie” then reads „Wysyłanie…”, as the button „Wciągnij programy z poprzedniego zapisu” reads „Wciąganie…” while its pull waits (D-401). A form's server refusal and loss of connection appear as one sentence below the form in `warning`, the answer to a request for a password-reset link (D-222) appears in that place in `text`, with a bar on its left in its own colour (D-279) and never in `positive`, and the kitchen-sink page shows the waiting and refusal states of every form, „Nie pamiętam hasła” and „Ustaw nowe hasło” included, and the form „Nie pamiętam hasła” with that answer.

Besides the kinds above, the button has the kind of the button of a cell of the body row, of which the cells of temperature, satiety and nature energy are built (D-337): it carries the name of a value at its left and its number at its right on one line, a bar under them and a note under the bar, and says whether the explanation of its value stands open (D-450). Its frame stands in `control-border`, as that of the plain button does, and its background and the role of its name under the pointer and while its explanation stands open are those D-40 gives it.

The screens build the tile of a slot of the gear (D-461) from the shared controls as well: a square button that carries the icon of the piece its slot holds, or the pale name of the slot where it holds none, and that is selected in its group while the pick of the slot stands open under it.

- **Scope:** browser-view

### D-438 — May the progression require the player's absence?

The progression never requires the player's absence: time away gives progress and additional things, and each next map can be solved with what the maps before it gave — practice, items, a better program — with no wait for an earning loop to gather more.

Las — matecznik is excepted from that rule until the change that sets its numbers, its entry cap included, so that it can be solved with what the maps before it gave, and that change removes this paragraph. Until then it is allowed to stand in the game, open to entry and to a judging, though no program can solve it.

In one measurement of the balance instrument in its mode `progression`, a map can be solved where its best reference program, played with the character built from what the maps before it gave, solves at least one of the seeds 1 to 500, and Las — matecznik passes that measurement as its exception asks where no reference program solves one seed of it.

- **Scope:** simulation

### D-190 — What does a character's death take?

A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged, except that the death of a character with no practice yet — none in any skill, no rank of branch bought and none gathered at its earning loop — takes nothing besides what it carried, leaves the generation number as it was, uses up no use of the resurrection, whether one is left or not, and does not stop its earning loop. The programs, the chest, the Understanding and the solved maps survive every death; the map run kept on the screen stays as it was, and a „Restart” after a death with no use of the resurrection left starts from the character as that death left it.

The gear of a character, which is no part of what it carried (D-183), is taken by a death when the resurrection has no use left to spend on it, and by no other: a death that uses up the last use takes none of it, and the death of a character with no practice yet, which uses up no use, takes it when no use is left, though it takes nothing else besides what it carried.

The account has one resurrection, shared by all its characters, held as numbers of the account, no item of any backpack, equipment or chest: a number of uses and the span of real time after which one used use returns, both set in the balance data, 3 uses and 4 hours to start. The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop.

The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs, a use returns after the span from the moment the clock started and each next one after the span from the return of the one before it, and the clock stops when the stock is full. The first completion of a map the account has not solved yet returns one use at once while the stock is not full, once for each map, the clock running on as it was, and a full stock stays full.

- **Scope:** simulation

### D-64 — What does the backpack's cap count, and what sets its height?

The backpack's cap counts the pieces of all items together, and its height is the character's carrying capacity. Carrying capacity is 15 pieces, and the character skill trees have no branch that raises it.

- **Scope:** simulation, browser-view

### D-140 — How does combat go?

Combat goes in turns, the sides exchanging one action each, and the side that attacked strikes first; the needs stand still during combat, and the whole combat costs a fixed number of game minutes. Combat verbs can be carried out only in combat, and only they can be carried out in it, but for „Załóż” (D-458). A creature acts by pairs of condition and action kept in its data, of the same form as program rules, and an attack interrupts the action under way, which is lost.

„Załóż” can be carried out in combat and out of it, and like every action it takes the one rule that a free minute or a turn of combat starts: in combat one turn of the character, in which the wolf acts as in any turn, and out of combat 1 minute.

- **Scope:** simulation

### D-142 — When can a creature attack a map run?

An attack uses the per-game-minute chance and cooldown in its map's data, with the cooldown counted from the start of the map run and from the end of each encounter; for Las — głębiej the chance is 0.01 and the cooldown protects the full 180 minutes after either point, so the first eligible minute is 181 or E+181 after an encounter ending in E. Each eligible ordinary game minute tries its attack after the ending action's effect and the completion check, including a minute inside a longer action; an action still running is lost on an attack, while a finished action keeps its effect. The attack generator is a separate stream seeded by the map run, advanced by the eligible trials, with cooldown, active combat, death and completion leaving it as it stands, so two continuing runs on one seed meet their first attack in the same minute.

„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing.

- **Scope:** simulation

### D-143 — What does the first wolf attack reveal?

The first wolf attack brings the wolf, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Zdrowie poniżej” and „Przeciwnik ma poniżej” into the Understanding, with the game paused after the attack minute and before the first combat turn. It brings the action „Załóż” and the condition „Puste” into the Understanding with them. The discovery leaves writing combat rules to the player; the game adds no rule at this attack, and later attacks of an already known creature leave time running unless the minute discovers something else.

- **Scope:** simulation · browser-view

### D-144 — What actions does a character use in combat?

The character uses „Uderz — patyk”, which requires a stick in the main hand of its gear, taken there from the backpack where the hand is empty (D-457), and deals a base 6 damage increased by its bought branch ranks, „Kopnij”, which deals a base 3 damage increased by its bought branch ranks and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of a base 5 damage increased by its bought branch ranks for the next damaging enemy strike. Another dodge refreshes that reduction, the strike consumes it with damage floored at zero, a creature’s dodge leaves it pending, and the encounter’s end clears it. The wolf has 24 health and a strike of 7 damage, follows „Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz”, and its dodge gives up its action with no protection.

In combat the character can use „Załóż — {rzecz}” (D-458) as well, which takes one of its turns.

- **Scope:** simulation

### D-145 — How do weapon wear and wound dressing work today?

A stick stays in the main hand after a strike, with its condition unchanged.

„Opatrz — {rzecz}” uses up one piece of the thing, an item the data give a healing, and gives back that healing to health whatever took it — cold, hunger or a blow of combat — never above full health. It is not carried out in combat and cannot be carried out at full health, and where health is full when it ends, the piece stays in the backpack and the action ends with no effect.

- **Scope:** simulation

### D-147 — What record of an encounter does the player read?

From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph in `text` as an entry of the chronicle in the game minute of the attack, which adds the turns while the encounter lasts: before the turns it gives the creature's starting health and program formatted from its action pairs, and after them it gives each action and its outcome in order, followed by the encounter's result. The paragraph stands through „Wznów”, editing, a load of the saved game state and the frozen death or completion screen until another attack replaces it as the last one or „Restart” or „Zakończ” removes its map run; a completion before the turns keeps the attack description and leaves the outcome absent. At the end of the map run the same paragraph stands in the end-of-run window (D-368), in a section of its own outside „Ostatnie minuty”, and after a load of the saved game state too.

„Teraz” reads „Walczy z wilkiem” throughout the combat minutes, including the resolution minute even if the next ordinary action starts there, while death or completion takes precedence and combat death reads „Mag zginął w walce”; at another creature it reads „Walczy z” and the form of that creature's name after „z” that its data give, as „Walczy z niedźwiedziem” at the bear.

- **Scope:** simulation · browser-view

### D-199 — What does the screen Postać show of character skills?

The screen Postać shows the section „Umiejętności” after a tree is known, and before the first known tree the section is absent. Each known tree stands as a row in columns: its name, „poziom {p}”, a bar of its practice up to its next threshold with „{wprawa} / {próg}”, or after its last threshold a full bar with „najwyższy”, and „{k} pkt” only where it has points to spend; right after the name, in the role `text`, stands „+{n} pkt czeka w pętli” where the practice waiting in the character's earning loop, the practice „Odbierz” would pay at that moment, gives the tree {n} new points to spend. The trees stand folded, a click on the row of a tree or the keyboard opens it, and each entering of the screen starts with the trees folded.

Below an open tree each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price and omit numerical before-and-after values. A fully bought branch keeps its present value if numerical and omits the next value and price.

- **Scope:** browser-view

### D-200 — Where does the player buy a branch rank, and when does it act?

The player buys a branch rank with „Kup” on the screen Postać outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too, and the rank acts from that character's next map run, the next map run of that earning loop included, while the map run going on keeps the skills of its start. The game has no purchase in the map-run view and no undo of a purchase.

- **Scope:** simulation · browser-view

### D-23 — How does a character act by its program?

A character acts only by its program: in each free game minute and immediately before its action in each combat turn it carries out the first program rule whose condition holds and whose action of the character can be carried out then, taking rule groups in order, each only while its condition holds, and a rule group whose condition holds but which holds nothing that can be carried out passes on. Conditions are chosen from a closed list, never written as expressions, rule groups stand one level deep, and the player has no way to carry out a character's action by hand. Which piece of an item an action uses — which fuel goes into a campfire — the simulation chooses, not the program, and an action that uses an item from the gear uses the piece the gear holds (D-451).

- **Scope:** simulation, browser-view

### D-380 — Which words name each refusal of an action?

A program rule whose condition holds and whose action the game's check refuses names the reason of its row, {rzecz} being the name of the thing in lower case: „Eksploruj” on a revealed tile, „kafelek już odkryty”; „Wędruj” with no neighbouring tile, „nie ma dokąd iść”; „Idź — {rzecz}” where the player knows no place that holds the thing, „nie znasz miejsca, gdzie leży {rzecz}”, and where the thing lies on the character's tile, „{rzecz} leży już tutaj”; „Idź — ognisko” with no campfire, „nie ma ogniska”, and with the character at one, „już przy ognisku”; „Zbierz — {rzecz}” and „Obchód — {rzecz}” where the thing does not lie on the tile, „tu nie leży {rzecz}”, and with a full backpack, „plecak pełny”. „Wytwórz — ognisko” and „Zapal — patyk” on a tile not revealed, „kafelek nieodkryty”; „Wytwórz — ognisko” where a campfire stands, „tu już stoi ognisko”; „Zapal — ognisko” where none stands, „tu nie stoi ognisko”, and where it burns, „ognisko już płonie”; „Zasil — ognisko” where none burns, „tu nie płonie ognisko”, and with no fuel in the backpack, „brak opału: patyk”. „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”, „Zjedz — jagoda” and „Uderz — patyk” short of a thing in the backpack, „brakuje {ile} × {rzecz}”, such as „brakuje 4 × patyk”; „Zapal — ognisko” and „Zapal — patyk” short of nature energy, „brak energii natury: {ma} z {trzeba}”.

„Wytwórz — {rzecz}” and „Opatrz — {rzecz}” short of a thing in the backpack, „brakuje {ile} × {rzecz}”, such as „brakuje 2 × mech” and „brakuje 1 × opatrunek”; „Opatrz — {rzecz}” at full health, „zdrowie pełne”, which stands before „brakuje …” where both hold.

„Uderz — patyk” is short of a thing only where its stick lies neither in the main hand nor in the backpack (D-457), „brakuje 1 × patyk”. „Załóż — {rzecz}” short of the thing in the backpack reads „brakuje 1 × {rzecz}”, where the slot it fits already holds the thing „już założone: {rzecz}”, and for an item of a pocket with every pocket taken „kieszenie pełne” in place of „już założone”, each reason about the state of things standing before „brakuje …”.

- **Scope:** simulation · browser-view

### D-443 — How does an action name what it acts on?

An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data. An action made before this rule keeps a kind of its own until a change rewrites it.

- **Scope:** simulation · browser-view

### D-179 — How do items go into a map run and out of it?

The trip plan is a field of the program, both its lists are bound at the start of a map run — the list of what comes out as a frozen snapshot — and at a completion only what that list names goes to the chest. Reality cuts the trip plan down and never up: what the chest lacks does not go into the backpack, what the backpack lacks does not come back, and where items compete for one budget — the backpack, the map's cap, the free room in the chest — as many go in from the top of the list as fit. The backpack is the cap on both sides, a map may add a stricter cap of its own down to zero, and a trip plan over the map's cap does not keep the character from entering the map: it goes in cut, and the player is told so beforehand.

- **Scope:** simulation · browser-view

### D-183 — What happens to carried items when the player stops a run or completes with items outside its plan?

When „Zakończ” or „Restart” ends a map run before completion, or „Zatrzymaj” stops an earning loop in the middle of a map run, that map run's carried items — brought in and gathered — are lost. At completion, the items outside the frozen bring list are lost. The gear of the character is no carried item: it stays with the character after each of these ends and comes back as it stood at the end of the map run, a piece the map run took from the backpack into the gear included, though it stands on no bring list and counts toward no exit cap, while a piece the map run put from the gear into the backpack shares the fate of the backpack.

- **Scope:** simulation

### D-187 — How does a map cap equipment and loot?

A map's data can set two independent whole-piece caps from zero up, one for entry and one for exit, each optionally unset. The entry cap clips the trip plan when the character enters and the exit cap at completion; gathering during the run is bounded by the character's carrying capacity, which the map cap leaves unchanged. The caps clip no gear: the gear of the character goes into a map run and out of it whole and counts toward neither cap.

- **Scope:** simulation

### D-293 — What time of an action does the program editor show?

Beside a program rule's action, in its row and in the rule panel, stands the time one carrying out of the action takes, such as „10 min”, „tura” for an action of combat, for a movement during a map run the time of a step on that map, and nothing for a movement outside a map run.

The cell „Wytwórz” of the pick of actions shows no time, since the recipe of its target gives the time, and the cell „Opatrz” shows its own; an action whose time its target gives shows that time at each target of the pick of its target, beside the price, such as „Opatrunek (2 mchy)” and „10 min” beside it.

- **Scope:** browser-view

### D-290 — How does the pick of the rule panel group its cells?

The pick of the rule panel sets the actions in five named groups: Ruch — „Eksploruj”, „Wędruj”, „Idź”, „Idź — ognisko”; Zbieranie — „Zbierz”, „Obchód”; Ogień — „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”, „Zasil — ognisko”; Żywność i walka — „Zjedz — jagoda”, „Opatrz”, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Załóż”; and Wytwarzanie — „Wytwórz”. It sets the conditions in two columns, in sections with no names set apart by a line: Zawsze; Temperatura, Sytość, Zdrowie, Energia natury, Puste; Zapas, Tu leży, Zostało mniej niż — ognisko, Z dala od — ognisko; Przeciwnik ma poniżej.

- **Scope:** browser-view

### D-291 — Which icon stands for an action?

Each action has one icon, which stands for it in a program rule's row, in its cell of the pick, over the mage's head, in the rows „Teraz” and „Potem” under the scene and beside the action on the screen Wiedza; an action with a target shows the icon of the action, never one of its target.

- **Scope:** browser-view · simulation

### D-309 — What do the signs of a program rule show in the minutes of an attack?

In the minutes of an attack, from the minute of the attack to the resolving of its turns, the signs of the copy show what the first combat turn would choose now, at the health of the mage and of the creature as they stand: the combat rule the turn would choose stands on the background `rule-winning`, no rule stands on `rule-running`, and an ordinary rule whose condition holds is amber with the reason „trwa walka”. Outside those minutes a combat rule whose condition holds is amber with the reason „tylko w walce”. A rule with „Załóż”, which D-140 lets be carried out in combat, is amber with neither reason, in those minutes or outside them, and where the turn would choose it, its row stands on `rule-winning` as that of a combat rule does.

- **Scope:** simulation, browser-view

### D-363 — Where does the player read what an action costs?

The rule panel shows beside an action what it costs, read from the game's data, in brackets after the action's name, in the same text as the name, so that it takes the name's role and dims with a greyed cell — such as „Wytwórz — ognisko (6 patyków)” — at every cell of its pick, a greyed one included, save the cell of an action whose price its target gives, and at the action chosen in the panel, where the time of one execution stands; the row of a program rule shows no price. The pieces an action uses up and the nature energy it takes stand with the names of the things in the form their count takes and the energy by its full name, such as „(2 patyki, 10 energii natury)” and „(1 jagoda)”, so the data of the game's things hold the plural forms of their names; an action that takes a piece of a use — fuel, food or a thing to light — names the first item the data marks for that use, as the reason of its rule does (D-310), and an action that uses up nothing has no price. During a map run the price follows the character of the map run, as the time does (D-293), so the character with the bought branch „Czysty płomień” reads „Zapal — ognisko (10 energii natury)”, while on the screen Programy and outside a map run the price is the data's, „Zapal — ognisko (2 patyki, 10 energii natury)”.

An action whose price its target gives, „Wytwórz” and „Opatrz” with an item as the target, shows no price at its cell of the pick of actions; the pick of its target shows at each target the price of the action with that target, in brackets after the target's name, and the action chosen in the panel shows the price of its chosen target, such as „Wytwórz — Opatrunek (2 mchy)” and „Opatrz — Opatrunek (1 opatrunek)”.

- **Scope:** browser-view, simulation

### D-287 — What do Siedziba, the screen Postać and the screen Mapy allow, and say, while a manual map run waits or has ended?

While the game state holds a manual map run that waits in a pause, or that has ended and waits for „Restart” or „Zakończ”, Siedziba, the screen Postać and the screen Mapy keep active what the simulation allows, while „Wejdź”, „Puść w pętlę” at that map run's character and „Kup” stand inactive. Under the inactive buttons of each character in the section „Kto idzie” of the card of a map stands „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”, and at the section „Umiejętności” „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.” Wherever the sentence under the buttons of a character stands, „Wróć do niego i je zakończ, żeby wysłać postać.” in it is a link to the screen of that manual map run, `#/postac/{n}/przejscie` with {n} the number of the map run's character (D-281).

At the character of that map run the tiles of its gear cannot be selected, and under the heading „Wyposażenie” stands „Przejście na mapie {mapa} jest niezakończone. Wyposażenie zmienisz po jego zakończeniu.”, while the tiles of the gear of every other character stay selectable.

- **Scope:** browser-view

### D-311 — How is the screen of a map run laid out?

The screen of a map run has two columns under one header in the computer layout: on the left the world and, under the drawing of the map and the line of a tile that end it, an area with the tabs „Kronika” and „Teren” holding one content at a time, the chronicle or the table of revealed tiles, as the player picks, „Kronika” picked when the character is sent to the map; on the right the program, over which the window of a rule or a rule group opens under its row (D-288), the world staying in sight and the map run going on while the window stands. The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with a bar under each of its values and the minutes each need lasts, the explanation of a value right under its cells while the player has one open (D-450), the backpack and the lines below them, the drawing of the map and the line of a tile under it. The header holds the character's name, the map's name, the clock, a bar of the solving condition with its numbers (D-133), „Pauza” or „Wznów”, the pace, and after the end of the map run „Koniec przejścia”, which opens the end-of-run window, „Restart”, the warning of a cut trip plan and „Zakończ”.

Under the line of the backpack stands the line of the gear, in the same text as the line of the backpack, naming the main hand first and the pockets after it: „Wyposażenie: patyk w ręku, 2 × opatrunek pod ręką”, „Wyposażenie: 2 × opatrunek pod ręką”, „Wyposażenie: patyk w ręku” and, where the character holds nothing, „Wyposażenie: nic”.

In the phone layout (D-396) the screen has one column under the same header, with the world, the program and the area with the tabs „Kronika” and „Teren” one above the other in that order (D-282), and the window of a rule or a rule group takes the width of the screen.

The window of a rule or a rule group belongs to the area of the program: it is not seen while the end-of-run window stands and stands again as it was once that window closes, and it closes when the question „Zapisać, odrzucić, wrócić?” of D-173 appears, so that the question is seen and takes the focus.

After a character's death or a completion that window (D-368) stands in place of this screen, its header included (D-370), under the menu bar and the row of warnings below it, and holds the lines of the end (D-185, D-216), which the world area does not; „✕” in it and Escape pressed in it (D-370) close it and uncover the screen, it opens again at every entry on the screen of an ended map run, and it closes when the question „Zapisać, odrzucić, wrócić?” of D-173 stands. It opens of itself at the end of the map run once the scene's effect of the death or the completion has played, so that the effect is seen, and at once where the scene shows the last image of that effect at once (D-322): at an entry on the screen, after a reload or a load, and under the system's setting for reduced motion.

- **Scope:** browser-view

### D-439 — How does the game judge a program before an earning loop?

The game runs a program on twelve fixed seeds of a map, the same seeds each time, and shows the result seed by seed: solved, a death with its cause and game minute, or undecided where the program has neither solved the map nor died within a cap of game minutes set in the game's data, 4000 to start. Such a judging is no map run of the character: it takes nothing from the chest, pays nothing and settles no death.

A program can be judged on every map open to the player, a map not yet solved included, and for a character in an earning loop or in a manual map run, and the judging changes nothing of either. The character enters each of the twelve runs with the take list of the program cut by what lies in the chest, by the character's carrying capacity and by the map's entry cap, all twelve starting with the same equipment, and nothing leaves the chest. A judging discovers nothing: it runs with what the player has discovered, writes nothing into the Understanding and adds no rule to the program.

Each of the twelve runs starts too with the gear the character has at the time of the judging, the gear the game keeps at the character outside a map run, the same for all twelve, and the judging takes nothing of it.

- **Scope:** simulation · browser-view

### D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?

The game remembers the last judging of each character, program and map in the browser that made it, as D-441 gives: the twelve results of its seeds — solved, a death or undecided — and the equipment it took from what the chest held, while the cause and the game minute of a line stand only in the result shown after the judging (D-329). A judging, the one „Puść w pętlę” runs included (D-243), replaces the judging remembered for its character, program and map.

Beside the list „Program:” of a character in „Kto idzie” stands the judging remembered for that character, the program the list shows and the map of the card: the badge „szczelny: 12 z 12” in `positive` where it solved all twelve seeds, and „{n} z 12” in `text` otherwise. Where the chest holds less of an item than the judging took, the result stays with „oceniono z zapasem, którego dziś nie ma w skrzynce” beside it and the badge goes out, „12 z 12” standing in its place.

A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map. A judging so erased never stands again, since such a save raises the program's content revision (D-442) and such a death the character's generation number, and the judging of a deleted program stands beside no other program (D-165).

A change of a character's gear that the player makes on the screen Postać erases every judging remembered for that character, on every map; a change with which the character comes back from a map run, such as a refill of a slot or a „Załóż”, and the death of a character with no practice that takes its gear (D-190) erase none.

On a map whose data name a creature for the record, the game remembers in the browser that made it the record of the most health of that creature that any judging took in one fight, a fight the character won giving the creature's whole health, a fight in which the character died counting as any other and a seed with no fight giving 0, and the largest of the twelve seeds of a judging counting. The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441).

- **Scope:** simulation · browser-view

### D-441 — Where does the game keep the last judging of each character, program and map?

The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form, the signed-in account by its identifier, the game by the moment it was made (D-04), the character, the program and the map, and the value holding the kind of each of the twelve results, the equipment the judging took, and the content revision of the program (D-442) and the generation number of the character in the game state the judging read. The saved game state holds no judging, and nothing of a remembered judging enters the game state, which is whole without it. The value holds besides a fingerprint of the content of the program it judged, a short text that is the same for two contents the content revision counts as no change (D-442) and another for every change it counts, but for a chance of a collision of at most one in 2^52.

A remembered judging stands beside the list „Program:” only while its character is on the team at its generation number and its program is on the player's list at its content revision. A value of another form, one whose results do not number the seeds of a judging in the game's data, or one under a key of another version of the stored form shows nothing, as where nothing is remembered, and a key of another version is neither read, written nor removed. A remembered judging stands there too only while the fingerprint of the content the program holds equals the one stored, so two different contents share a judging only through such a collision, and a value whose fingerprint is no text of the form of a fingerprint is a value of another form.

Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323). When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game or whose program number or character number is not below the number the loaded game gives to its next program or character, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts. Another device, or a browser whose data were cleared, shows no remembered judging until a judging is made there.

The unsaved game state stays out of the browser's lasting storage as D-211 gives, and the remembered judgings stay there after „Wyloguj”, holding no email address, no name and nothing the game loads.

Beside the judgings the browser keeps the record of D-440 in its lasting storage, one value under a key of its own with its own version for each account, game and map, holding the number and the creature's numbers it was made at. It is read only in that form and version and, on opening and at a refusing storage, treated as the judgings are. A record the storage refuses stays for the open page, and the stored one is left, since the record never falls.

- **Scope:** browser-view · simulation

### D-451 — Where does an action take the piece it uses from?

A character has gear apart from its backpack: what it wears, what it wields and what it has at hand. An action that uses a piece of a kind kept piece by piece uses the piece the gear holds.

- **Scope:** simulation · browser-view

### D-452 — Whose is the gear, and where does the player put it on from?

A character's gear belongs to the character and stays at it between map runs, but for a death that D-190 says takes it; the player puts a piece of an item on from the chest on the screen Postać, and a piece taken off returns to the chest. The gear goes with the character into every map run, a manual one and one of an earning loop, and comes back with it. The trip plan of a program holds no gear, switching the program changes none, and an earning loop does not refill it from the chest between its map runs.

- **Scope:** simulation

### D-453 — When may the player change a character's gear?

The player changes a character's gear on the screen Postać outside an unfinished manual map run of that character, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too. At a character in an earning loop the change acts from its next map run, while the map run going on keeps the gear it started with.

- **Scope:** simulation · browser-view

### D-454 — Does the screen Postać show a slot of the gear that nothing fits?

The screen Postać shows every slot of the gear, a slot that no item of the game fits yet included: it stands there and is empty.

- **Scope:** browser-view

### D-455 — Is the gear a backpack?

The gear is no backpack: a piece in the gear takes no room of the backpack's cap (D-64), is counted by no condition „Zapas poniżej” and by no line of the backpack on the screen of a map run, and is taken by none of the actions that take pieces from the backpack — „Zasil — ognisko”, „Zapal — patyk”, „Wytwórz — ognisko”, „Wytwórz”, „Zjedz — jagoda” and „Opatrz”.

- **Scope:** simulation · browser-view

### D-456 — Which slots does the gear have, and which item fits which?

The gear has eight slots, each holding one piece: „Ręka główna”, „Druga ręka”, „Głowa”, „Tułów”, „Nogi” and three pockets of the belt, each slot being of one place, the three pockets of the place „Kieszeń”. The data of each item name the place it fits: the stick fits the main hand and the bandage a pocket. „Uderz — patyk” takes its stick from the main hand and from no other slot.

- **Scope:** simulation

### D-457 — When does an empty slot of the gear take a piece from the backpack?

An empty slot of the gear stays empty until a rule puts something on it or the character uses an action that takes a piece from that slot. That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own.

- **Scope:** simulation

### D-458 — Which action puts a piece on the gear, and what does it do?

The action „Załóż — {rzecz}”, one for all slots, takes one piece of its item from the backpack into the slot the item fits, into the first empty pocket for an item of a pocket, and puts the piece that slot held, if any, into the backpack, so that the count of the backpack's pieces never rises.

- **Scope:** simulation

### D-459 — What does the condition „Puste — {miejsce}” ask?

The condition „Puste — {miejsce}” holds when the place it names holds nothing; „Puste — Kieszeń” holds when at least one pocket is empty. A program names a place of the gear only by its kind, never by the number or the position of a pocket, and the targets of the condition are the places some item of the data fits, a place gaining its target when the first item starts to fit it.

- **Scope:** simulation · browser-view

### D-460 — How is the gear of a character in an earning loop merged at the end of a map run?

At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left. A slot counts as changed from the first piece the player puts on it or takes off it, whether or not it holds again the item it held at the start of the map run.

- **Scope:** simulation

### D-461 — How does the player change the gear on the screen Postać?

The player changes the gear by touching the tile of a slot, which opens under it a pick in the cells of the pick of an action in the program editor: the items of the chest that fit the slot, each with its icon, its name and the number of its pieces in the chest, and „Zdejmij” where the slot holds something. Choosing an item moves one piece of it from the chest into the slot and the piece the slot held back into the chest, and „Zdejmij” moves the piece of the slot into the chest.

- **Scope:** browser-view · simulation

### D-462 — What do the tiles of a character in an earning loop show?

At a character in an earning loop the tiles of the gear show the gear set for its next map run, with the sentence „Postać jest w pętli. Zmiana działa od następnego przejścia.” standing above them.

- **Scope:** browser-view

### D-463 — How does the game state count the gear changes the player makes?

The game state counts at each character, from 0, the gear changes the player makes on the screen Postać (D-461): each putting on, exchanging and taking off of a piece counts one, a change with which the character comes back from a map run (D-460) and a death that takes its gear (D-190) count none, and the count never goes down. The value of a remembered judging holds the count of its character in the game state the judging read (D-441), and the judging stands beside the list „Program:” only while that count equals the count the game state gives its character, so that a change of the gear made by the player erases every judging remembered for that character, on every map (D-440).

The count is a part of the stored form of a judging, whose version rises with it, so a value stored without it shows nothing; when the page opens the remembered judgings of a game it removes also the values of this game whose count stands above that of their character in the loaded game, as it does for the generation number (D-441).

- **Scope:** simulation · browser-view

## Listed by heading alone

