### D-19 — How does the player interact with the terrain panel's drawing of the game map?

The terrain panel's drawing of the game map is a picture, not a control: its only interaction is
hovering, which links a tile with its row in the list of revealed tiles, and the numbers of stock
stand in that list, never on the drawing.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** none
- **Verification:** invariants: terrain-drawing-numbers. For hovering and for everything else the
  player does on the drawing, since what the player sees and what the drawing does in answer is
  shown only by a real browser, which the repository does not declare, an agent compares the change
  with the decision:
  - complies: hovering a tile marks its row in the list of revealed tiles, and hovering that row
    marks the tile
  - violates: a click on a tile that sends the character there or changes the program
- **Origin:** mag_w_lesie_loop2.md in the vault (Notes/Projects/(P) Loop), "Questions to settle", "Co pokazuje panel terenu?" · koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), §5

*Rationale:* the player writes the condition that fewer than N of a resource lie on the
character's tile against numbers the list shows, and the list keeps the stock of every resource of
a tile readable where numbers written into the tiles would not be; hovering ties a tile to its
numbers without writing them on it.
*Rejected:* the grid drawn without the list and its numbers — the player would write that condition
without seeing the number it compares; numbers written into the tiles — unreadable where a tile
holds several resources.

### D-122 — What does a map run do, and what does the player see, when something is discovered?

When something is discovered in a map run the player starts, the map run stops in the same pause
as after „Pauza”: the status row adds „ (pauza)”, and the player goes on with „Wznów”. Below the
status row a line in the role `discovery` names what was discovered, the discoveries of one game
minute in one line, and it stands until the player goes on; where the last encounter has a line, it stands below the discovery line and above the body and backpack. Where the map run ends in a completion
in the game minute of a discovery, the screen after the completion takes the place of the pause, and
the line stands below its status row until „Restart” or „Zakończ”.

- **Scope:** simulation, browser-view
- **Based on:** none
- **Relations:** derives from D-21 · derives from D-118
- **Verification:** invariants: player-map-run-pace. An agent compares a change with the decision:
  - complies: after the first finished exploration the status row ending in „ (pauza)” and below
    it the line „Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży
    mniej niż … szt., Zapas poniżej … szt.”, gone once the player presses „Wznów”; a completion of
    Las in the game minute of a discovery showing „Minuta 480 · Las rozwiązany” with no „ (pauza)”
    and the line of that discovery below it until „Restart”
  - violates: a button of its own for going on after a discovery; the line of discoveries still
    standing after „Wznów”; two discoveries of one game minute in two lines; a completion in the
    game minute of a discovery leaving the map run paused with „Wznów”; the line of that discovery
    gone from the screen after the completion before „Restart” or „Zakończ”
- **Origin:** odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "3. Jak czas gry staje przy odkryciu i co wtedy widzi gracz?" · rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "15. Co widzi gracz, gdy przejście domyka się w tej samej minucie gry, w której coś odkryto?"

*Rationale:* one pause gives the player one way to hold a map run and one way to go on, and
whatever treats a paused map run treats a map run stopped by a discovery the same. A map run that
ends in the game minute of a discovery has nothing to go on to, so the screen of its end stands
in place of the pause, and the player still reads what that game minute discovered, which enters the
Understanding as any discovery does. Accepted with it: a stop at a discovery cannot be told apart in
the game state from the player's pause, and a player who goes on at once loses the list of
discoveries, since the game keeps no record of them; the line of discoveries ends in two ways,
„Wznów” or „Restart” and „Zakończ”, and the screen after a completion can keep both discovery and encounter text.
*Rejected:* a stop at a discovery as a game state of its own, with a button of its own; the screen
after a completion with no line of the discovery made in its game minute — the player would not
learn what that game minute discovered.

### D-123 — What does the game write into the program at a discovery?

A program rule the game writes at a discovery goes into the first rule group of the copy the map run
carries out and into the first rule group of the program the copy belongs to, while that program is
on the player's list, and where either holds no rule group, the game adds the rule group „Program”
with the condition „Zawsze” and writes the rule into it; the other programs of the list stay as they
were. Today the game writes one such rule, „Zawsze → Eksploruj”, when the first chill brings
„Eksploruj” into the Understanding. The rule so written counts neither as an unsaved change of the
copy nor as a change of the program that a save of the copy announces.

- **Scope:** simulation
- **Based on:** none
- **Relations:** derives from D-90 · derives from D-121 · derives from D-164
- **Verification:** an agent compares a change with the decision:
  - complies: a new game's mage first chilled in game minute 84 with the empty rule group „Program”
    of the copy and of the program „Program” each gaining „Zawsze → Eksploruj” there, „Program 2”
    staying as it was and the copy showing no unsaved changes; a first chill in a copy whose rule
    groups the player has all deleted adding the rule group „Program” with the condition „Zawsze”
    and the rule in it
  - violates: the rule written again at a later chill or in a later map run; the rule written into
    a rule group of its own beside the first rule group; the rule written into every program of the
    list; the rule lighting „Niezapisane zmiany w kopii.” or the line of a program that changed
- **Origin:** odkrywanie_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "2. Czy przy pierwszym wychłodzeniu gra sama dopisuje do programu regułę „Zawsze → Eksploruj”, jak w loop?" · programy_gracza_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "Q7. Do którego programu gra wpisuje regułę przy odkryciu, gdy przejście wykonuje kopię programu — do kopii, do zapisanego programu czy do obu? (pytanie planu dla zadania 12)"

*Rationale:* until the first chill the character knows no action and stands, so the rule written
then sets it moving and shows the player the shape of a program rule in the program editor. Written
into the copy and its program alike, the rule acts in the map run and stays in the program the next
map run takes, and since both receive it, it gives the player nothing to save and nothing to lose.
Accepted with it: once in a game the game changes a saved program of the player with no move of the
player, who sees the rule in the program editor and can delete it.
*Rejected:* the program left as the player wrote it at the first chill; the rule written into the
copy alone, into the saved program alone or into every program of the list.

### D-130 — Where does the player pick the pace, and with which control?

The player picks the pace with five buttons „1×”, „2×”, „4×”, „8×” and „16×” beside „Pauza” in the
status row of the map run, and the button of the pace in force is a button selected in its group.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-21 · derives from D-44
- **Verification:** an agent compares a change with the decision:
  - complies: „4×” shown selected among the five buttons beside „Pauza” while the map run passes at
    4×, each button made with the shared button selected in its group
  - violates: a select list of paces; a pace button that creates and styles a `<button>` of its
    own; the pace in force marked in a way no shared control holds
- **Origin:** rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "3. Jakie tempa przewijania gracz wybiera i gdzie stoi przełącznik tempa?"

*Rationale:* the pace stands where the player watches the map run, beside „Pauza”, the other
control of its time, and the button selected in its group marks the pace in force with a shared
control the browser view already holds.
*Rejected:* a pace control standing apart from „Pauza”, or one built from a control of its own —
the controls of a map run's time would stand in two places, or the browser view would gain a
control the shared controls do not hold.

### D-133 — Where does the player see a map run's streak and a map's solving condition?

During a map run the status row shows progress for the requirements present in the map's solving condition beside the game minute and the character's activity: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present, as „Minuta 312 · Eksploruje · Passa 120/540 · Pokonane napaści 1/2”. The headquarters shows by each available map the sentence of its solving condition from the map's data, as „Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu” or „Las — głębiej — 540 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz dwie pokonane napaści wilka”.

- **Scope:** browser-view, simulation
- **Based on:** none
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a paused map run reading „Minuta 312 · Eksploruje · Passa 120/480 (pauza)”; the
    sentence of Las standing by the map in the row of each character in the headquarters
  - violates: a progress bar in place of „Passa 120/480”; a streak target shown for a map that asks for beaten attacks alone; the sentence of the condition written in
    the code of the headquarters
- **Origin:** rozwiazanie_lasu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), § Questions to settle, "5. Gdzie i w jakiej postaci gracz widzi passę i warunek rozwiązania Lasu?" and "16. Gdzie w wierszu stanu stoi dopisek „ (pauza)”, gdy wiersz pokazuje też passę?"

*Rationale:* the player sees during a map run how far the program has come towards the map's
condition, and in the headquarters what each map asks before sending a character. Accepted with it:
a longer status row, and a new text in each map's data.
*Rejected:* a progress bar, or the streak with no number of the condition beside it — the player
would not read how many game minutes the condition still asks for.

### D-272 — Where may a picture of the game stand?

A picture of the game stands behind the login card, and text stands on a solid background, never
on a picture.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-96
- **Verification:** an agent compares a change with the decision:
  - complies: the screen of the login card with the picture over the whole window and every sentence
    of the page inside the card, on its solid `panel`; the waiting screens and the game with no
    picture
  - violates: a sentence of the page standing on the picture outside the card; the card's background
    made half-transparent over the picture
- **Origin:** rozpoznanie_projektant.md in the vault (Notes/Projects/(P) Loop), part C.2 ·
  rozpoznanie_frajda.md in the vault (Notes/Projects/(P) Loop), part 7 · definicja_mvp2_loop2.md in
  the vault (Notes/Projects/(P) Loop), Projected foundation changes, „Where may a picture of the game
  stand?”

*Rationale:* the game stops looking like a form through a picture where there is nothing to read,
and contrast stays what its check measures, since that check knows colours and not what lies under
text.
*Rejected:* a half-transparent card over a picture — the check of contrast reads colour values, not
the picture beneath; a pattern on the page's background — a form with wallpaper.

### D-273 — When do the files of `assets/sprites/` gain a refusal test?

A permanent refusal test for the files the build copies from `assets/sprites/` is deferred until
the first task changing that boundary, which introduces its refusal test and changes the method of
sprite-file-content to test; what changes the boundary is read as D-76 reads it, so a further PNG
file does not. Until then, review checks that the build copies from `assets/sprites/` only PNG
files holding pixels alone, and only into what `npm run build` writes.

- **Scope:** browser-view · build-tools
- **Based on:** none
- **Relations:** narrows D-73 · derives from D-76
- **Verification:** an agent compares a change with the decision:
  - complies: a task adding a further PNG picture to `assets/sprites/` with no refusal test, its
    review checking that the file holds pixels alone
  - violates: a change making the build copy SVG files from `assets/sprites/`, or copy the
    directory into the kitchen-sink page, with no refusal test and sprite-file-content still checked
    by review
- **Origin:** logowanie_na_tle_gry_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania),
  Questions to settle, questions 3 and 4, and § Settlements to record, row C1 · plan_mvp2_loop2.md in
  the vault (Notes/Projects/(P) Loop), Open questions

*Rationale:* the boundary of the pictures is kept as the fonts and the preview server are, by review
until a change of its principle, so the tasks that add the scene's pictures bring no test files.
Accepted with it: further files are kept by review alone, so the deferral may in practice last for
good, and absence of a test proves no refusal.
*Rejected:* a permanent refusal test, as the rule „Trust boundaries” of the testing guidelines asks
— the plan records neither its cost nor the human's reason for it; every change of the files of the
boundary ending the deferral — a test at the task that first adds a picture, a change of the answer
that the tasks bring no test files, and a change of the plan; new files ending it, and a change of
the build not — the same costs.

### D-281 — How does an address name a screen?

An address names a screen in the fragment after `#`: `#/`, `#/postac/{n}`, `#/programy`,
`#/programy/{n}` and `#/postac/{n}/przejscie`, {n} being the number of a character (D-56) or of a
program (D-165) and the last address naming a map run by the number of its character, and an
address that leads to no existing screen silently opens the nearest one: `#/postac/{n}/przejscie`
with no map run the screen Postać of that character, `#/programy/{n}` with no such program
`#/programy`, and any other Siedziba. The screen of a map run takes its map run as a parameter and
reads no map run of the game state by itself. The fragments of emailed links (D-156, D-224) stand
apart from these, and after them the page opens Siedziba.

- **Scope:** browser-view
- **Based on:** uri-fragment-in-requests
- **Relations:** derives from D-280
- **Verification:** an agent compares a change with the decision:
  - complies: a reload at `#/programy/3` opening Programy with program 3 picked;
    `#/postac/2/przejscie` with no map run of character 2 opening the screen Postać of character 2;
    `#/programy/9` with no program 9 opening `#/programy`; `#/nieznany` opening Siedziba; a page
    opened at `#confirm-email=…` confirming as D-156 gives and opening Siedziba for a signed-in
    player
  - violates: an address in the path, such as `/programy`; a screen „Nie ma takiego miejsca”; the
    screen of a map run reading the map run from the game state rather than from its parameter
- **Origin:** zakres_mvp2_loop2.md in the vault (Notes/Projects/(P) Loop), „Decyzje o układzie” · rozpoznanie_projektant.md, part A.4 · ekrany_i_menu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), Questions to settle, question 8

*Rationale:* the server hands out files, so a screen reached by the fragment survives a refresh, and
the fragments of emailed links keep prefixes of their own. A number in the address and a map run as
a parameter cost a decision now, while a map run for each character and looking into an earning
loop's map run become additions rather than rebuilds.
*Rejected:* addresses in the path — a refresh of a screen ends in an error from the server, which
hands out files alone; an address of a map run without the character's number — a rebuild once each
character has its own map run; a screen „Nie ma takiego miejsca” — the back button lands on it after
„Zakończ”.

### D-282 — What do the screens leave room for from the start?

Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws
the team as a section with a heading, and the rule panel offers its pick in steps, the action first
and its target after it.

- **Scope:** browser-view
- **Based on:** none
- **Relations:** derives from D-280
- **Verification:** an agent compares a change with the decision:
  - complies: the program panel and the column of the map run on the screen of a map run each an
    area of its own, which a narrower layout can place one above the other; on Programy the list of
    programs, the program editor and the rule panel each an area of its own; the team on Siedziba
    under the heading „Drużyna”; the rule panel offering „Zbierz” and, once it is picked, the targets
    of „Zbierz” in a field after it
  - violates: two columns of a screen drawn as one block that a narrower layout cannot set apart;
    the characters of Siedziba as a bare list with no heading; one flat pick holding „Zbierz —
    patyk” and „Zbierz — jagoda” as cells of their own
- **Origin:** zakres_mvp2_loop2.md in the vault (Notes/Projects/(P) Loop), „Decyzje o układzie” · rozpoznanie_projektant.md, part D.1 · definicja_mvp2_loop2.md in the vault (Notes/Projects/(P) Loop), Projected foundation changes, "What do the screens leave room for from the start?"

*Rationale:* a layout for a phone, several teams and actions with targets of their own come later,
and these three shapes make each of them an addition. They cost a decision and no code.
*Rejected:* rigid columns, a plain list of characters and one flat pick — each of the three later
additions becomes a rebuild of a screen.

