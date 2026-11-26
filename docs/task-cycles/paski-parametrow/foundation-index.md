# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 114. Listed by heading alone: 201.

## Listed in full

### D-04 — What is the game built with?

The game is written in TypeScript and runs in the browser. Its simulation is a set of pure functions, of which those that pass game time take a game state and a span of game minutes and return the next game state together with the events it produced, and real time enters the simulation only as an argument.

The browser view draws the game only from the game state, the game's content data, the moment of the browser's clock, which it reads and passes to the simulation, the address of the page for the screen it shows (D-281), the system's setting for reduced motion for the scene (D-317), the saver's sentence for the row of saving (D-208, D-407), and, for the scene and the chronicle, its previous reading of the game state and the events the simulation returned, for the chronicle also the player's acts on the copy with the copy before each act and after it (D-348), and for the scene the place the browser gives for the mage while it walks, and, for the mark beside the list „Program:” and the number of a creature's record, the judgings and the record the browser remembers in its lasting storage for the signed-in account and the game (D-441), and from the memories of the page, none of them in the game state or the save: the folding of rule groups (D-294), the chronicle with the tab and the filter the player picks over it (D-339, D-346, D-383), the question „Zapisać, odrzucić, wrócić?” (D-324), whether the end-of-run window is open (D-371), the pull of the previous save and the reset control of Programy, which draw their buttons from the previous-save privilege the page keeps from the account's answer (D-400, D-401, D-402) and, for what one screen alone shows, the state of that screen's own component (D-407); it changes the game state only through functions of the simulation, to which it passes the player's choices, the passing of real time and a saved game state the browser downloaded from the server or the unsaved game state it kept in the page's memory after a save found no session (D-211).

The game state stores the moment of the browser's clock at which the page made the game, which the page passes to the function that makes a new game, every save and load keeps, and which tells one game of an account from another (D-441).

- **Scope:** browser-view, build-tools, simulation

### D-418 — Where do the screenshots that a task cycle of loop2 shows the human lie, and how does the description of its request embed them?

The screenshots that a task cycle shows the human lie in the public GitHub repository `mariusznazar/screenshots`, in its directory `loop2/` and in that a directory for each cycle, named as the directory of the cycle's own record, on a branch of that repository named `loop2/` and the name of that directory, never on `main`, and the description of the request embeds each as an image by a link to its file in a particular commit of that repository, with `?raw=true` appended. That repository holds only the screenshots of public products and may be cleared after a long time, and the images of old requests then stop showing. The screenshots of the predecessor game, loop, deployed at `https://kantarion.bieda.it/`, may lie there too, since that game counts as a public product.

- **Scope:** agent-workflow

### D-419 — Who puts a screenshot into the repository for screenshots?

The agent that shows a screenshot pushes it itself to the repository `mariusznazar/screenshots` with the `gh` account of the human who owns that repository, with no step of the human.

- **Scope:** agent-workflow

### D-265 — What form does a shared control of the browser view have?

Each shared control in `src/browser/view/controls/` has one form, a React component, and `src/browser/styles.css` stays the one place of the look of the controls. A new screen is never written after the pattern of a module that builds its DOM elements through the DOM APIs, though it may import that module's pure functions.

The panel that stands in place of a card React took down is built outside React (D-323), and it takes the tag, the classes and the role of its warning sentence from one constant that the React component of that sentence reads too.

- **Scope:** browser-view

### D-267 — What keeps the rules of hooks and of effects in the browser view's code?

No tool guards the rules of hooks and of effects: `guidelines/coding-browser-module.md` holds them, review keeps them, and they are that a Hook is called only at the top level of a function component or of a custom Hook, before any early return and never inside a loop, a condition, a nested function or a `try`/`catch`/`finally` block; that every reactive value an Effect's code uses is declared as a dependency; that an Effect connecting to a system outside React returns a cleanup function that disconnects from it; and that an Effect serves to synchronize with such a system, never to transform data for rendering or to handle a user event. A defect of these rules that passes tests and review reopens D-29 for the human.

- **Scope:** browser-view · build-tools

### D-269 — Does the kitchen-sink page hold React?

The kitchen-sink page holds React: it shows each shared control in its React form, and `scripts/kitchen-sink.mjs` bundles it in its build step as the game's browser code is bundled, the compiler emitting the page's modules and esbuild joining them into the one file the page loads (D-263, D-266). A change of how the page is built is made in that build step and never in the script's lines that serve files.

- **Scope:** browser-view · build-tools

### D-270 — Which libraries built on React may the browser view take?

A library built on React — a package other than `react` and `react-dom` whose entry in `package-lock.json` declares a peer dependency on `react` — counts as another UI framework under D-03, whether it draws anything or not, so none stands in the browser view's code or its runtime dependencies. A task that needs one names it in this decision and lets it through the check of browser-view-framework in the same change.

- **Scope:** browser-view · build-tools

### D-280 — Which screens does the game have, and how does the player move between them?

The game has the screens Siedziba, Postać, Mapy, Programy, Wiedza and Przejście, all of one content width under one menu bar, in the computer layout and in the phone layout (D-396): at most 1344 px, and the width of the window less the page's side padding where that is narrower.

The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy, Programy and Wiedza, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it. The name of a character on its card on Siedziba leads to the screen Postać of that character, on which the menu bar marks Siedziba, on the screen Mapy under each of its addresses the menu bar marks Mapy, and on the screen of a map run the menu bar marks no item. A player reaches a first map run from Siedziba in at most three clicks: the item „Mapy” of the menu bar, the map's row and „Wejdź”.

An account with the owner role (D-410) has one more screen, the list of accounts (D-411), of the same content width, which is no item of the bar: the menu „Konto” of such an account holds, after the address and before its buttons, the link „Panel właściciela” to `#/konta` (D-281). The items of the bar and the bar itself are the same for a player and for an account with the owner role, and the menu „Konto” of a player holds no such link.

- **Scope:** browser-view

### D-281 — How does an address name a screen?

An address names a screen in the fragment after `#`: `#/`, `#/postac/{n}`, `#/mapy`, `#/mapy/{map}`, `#/programy`, `#/programy/{n}`, `#/wiedza` and `#/postac/{n}/przejscie`, {n} being the number of a character (D-56) or of a program (D-165), {map} the identifier of a map (D-332) and the last address naming a map run by the number of its character, and an address that leads to no existing screen silently opens the nearest one: `#/postac/{n}/przejscie` with no map run the screen Postać of that character, `#/programy/{n}` with no such program `#/programy`, and any other Siedziba, the address of a map that is not on the list of open maps included. The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself. The fragments of emailed links (D-156, D-224) stand apart from these, and after them the page opens Siedziba.

`#/konta` names the screen of the list of accounts (D-411) for an account with the owner role; for any other account it leads to no existing screen, falls under „any other” and opens Siedziba.

- **Scope:** browser-view

### D-282 — What do the screens leave room for from the start?

Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws the team as a section with a heading, and the rule panel offers its pick in steps, the action first and its target after it. The narrower layout is the phone layout (D-396).

- **Scope:** browser-view

### D-285 — How does the menu „Konto” open and close?

The menu „Konto” opens on a click and from the keyboard, and closes on Escape, on a click outside it and on a second click on „Konto”; after Escape and after a second click on „Konto” focus returns to „Konto”, after a click outside it focus stays where the player clicked, and where that place takes no focus it returns to „Konto”. It stays open while „Wyloguj” or „Wyślij ponownie” waits for the server, and after the answer until the player closes it, so the sentence of the outcome can be read.

- **Scope:** browser-view

### D-286 — How long does the page's sentence stand above the game?

A sentence the page puts above the game, such as „Adres e-mail potwierdzony.” or the sentence of a discarded saved game state, stands above the first screen the game opens on and leaves at the first change of screen.

- **Scope:** browser-view

### D-323 — What does the game do, and what does the player read, after an error that no code of the game handled?

After an error that no code of the game handled, an exception or a rejected promise, the game state held in the page changes no more until the page is reloaded, and saving goes on as D-207, D-208 and D-97 give it, sending the last whole game state from before the error, which it reads without a new reading of the clock; the page builds no game until it is reloaded, so a sign-in, whatever load or kept game state it leads to, stays at the waiting screen with the sentence, and the catch-up of D-247 and the send of the state kept by D-211 do not run. Until the page is reloaded the sentence „Coś w grze się zepsuło — odśwież stronę.” stands once, in `warning`: on a screen with the header, a game screen or a waiting screen, in the row under the menu bar beside the sentence of a failed save, on the screen of the login card in the card under the form, and, where React takes the card down, alone in the card's place (D-262), and at the waiting screen where a sign-in after the error stays it stands alone, with no „Sprawdzanie logowania…” beside it. The page writes the line of the error as D-253 gives it.

After an error that no code of the game handled, every decision about the game that goes on gives way to this one.

After an error that no code of the game handled, whether the end-of-run window is open stays a memory of the page as D-371 gives it: the window opens of itself once the scene's effect of a death or a completion has played (D-311), at every entering of the screen of an ended map run, and at „Koniec przejścia”. „✕” and Escape of the window close nothing after the error, and the question „Zapisać, odrzucić, wrócić?” is neither asked nor closed after it, „Koniec przejścia” included, so a window once open stays open until the page is reloaded, standing while the player is on the screen of the map run and no question stands.

- **Scope:** browser-view

### D-395 — What does a shared control of the browser view know of the screens that use it?

A shared control in `src/browser/view/controls/` imports no module of a screen that uses it, and a rule that belongs to one screen, such as the rule of the numbers a field takes, the control receives from that screen.

- **Scope:** browser-view

### D-407 — Does the browser view keep a React root for each screen, and where does its state live?

The browser view keeps React roots of its own for each screen, for the menu bar and for each place of the page that shows something besides the game — the waiting screen and the rows of sentences — none shared, and no single root over the whole view. The game state lives in a store outside React and the state of the screen Przejście, which is the question „Zapisać, odrzucić, wrócić?” and the end-of-run window, in a module of its own outside React; memory several screens share is a memory of the page, given to the factories of the screens and read through `useSyncExternalStore`, and the state of one screen lives in the component of that screen. The screen Przejście and its program panel read the question and the window from the state of the screen Przejście, and the game view calls no method of either to show them.

The rows of sentences are three roots, the row of the failure, the row of saving and the sentences above the game, and the row of the failure holds nothing else, is drawn when the page starts and is shown by the page at the error without a render, so that an error in the drawing of another root cannot take down the sentence of D-323.

- **Scope:** browser-view

### D-408 — What does a new screen of the game add, and where?

A new screen of the game is added as a module of its own, one entry in the registry of screens, its address and its position on the menu bar. No function the game view shares between its screens names the new screen, and its entry is one line of the table the registry is made from. A new screen also adds its stylesheet, a file of its own directly in `src/browser/`, and the `<link>` of its own in `src/browser/index.html` that gives the file to the player (D-421).

- **Scope:** browser-view

### D-411 — What does the screen of the list of accounts show, and how does it run the four operations?

The screen of the list of accounts, at `#/konta` for an account with the owner role (D-281), shows every account sorted by its email address, and for each account its address, its blocked state, its previous-save privilege and its role — the fields of `GET /api/owner/accounts`, `"email"`, `"role"`, `"blocked"` and `"previousSaveAllowed"`, and nothing more of an account. Each account has four buttons: „Zablokuj” and „Odblokuj”, which block and unblock it as D-137 gives, and „Nadaj uprawnienie do poprzedniego zapisu” and „Odbierz uprawnienie do poprzedniego zapisu”, which grant and revoke the privilege as D-400 gives; an account with the owner role has no „Zablokuj”. „Zablokuj” is a destructive button and opens a confirmation that says that the block ends the player's sessions in every browser and makes the links from emails useless, and that unblocking restores neither, and the other three operations act at once, with no confirmation.

- **Scope:** browser-view, account-server

### D-416 — What does the screen Wiedza show?

The screen Wiedza shows the actions, items and creatures in the Understanding and the skill trees to read, with no levels and no buying. Its left area is as in the predecessor game, loop: the heading „Zrozumienie” with the counter „{n} poznanych rzeczy”, three groups „Czynności · {n}”, „Przedmioty · {n}” and „Stworzenia · {n}”, each in the order of discovery with the newest thing last, a group with no thing standing nowhere, the campfire standing among the items, and no sentence for an empty area. Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data, the wolf the icon `wolf-head` from game-icons.net, as in loop.

Its right area has the heading „Umiejętności” with the counter „{n} drzew”, the trees the player knows in the order of the data, each a folded row with its name and „{n} gałęzi”, opened by a click or the keyboard, and an open tree shows each branch with its name, „{n} stopni”, its description from the data and the prices of all its steps in turn; each entering of the screen starts with the trees folded, and before the first known tree the area stands nowhere.

The counter „{n} poznanych rzeczy” counts the actions, items and creatures together, with no condition and no tree. The counters of the screen decline by the number, as in loop: „1 poznana rzecz”, „3 poznane rzeczy”, „13 poznanych rzeczy”, „1 drzewo”, „3 drzewa”, „8 drzew”, „1 gałąź”, „3 gałęzie”, „1 stopień”, „3 stopnie”.

- **Scope:** browser-view

### D-421 — Which stylesheets does the browser view have, and what does each hold?

`src/browser/styles.css` stays the shared stylesheet of the game, the game's stylesheet of D-47 and D-265 that keeps the one `:focus-visible` rule: it holds the base rules, that rule, the menu bar, the rows of sentences, the shared controls and the rules of what the kitchen-sink page draws besides the controls — the drawing of the map (`terrain-drawing`), the table of tiles (`tile-list`), the form (`form`) and the block of the account menu (`account-menu-block`). It holds also the common layout of the screens — the place of the screens (`.app-main`, `.screen`, `.screen-area`) and the columns of Programy, Mapy and Wiedza with their `@media` — and each rule that the elements of several screens need, that cannot be divided without changing its text and that belongs to no part with a stylesheet of its own, as the rules of the credits that name the login card and Siedziba belong to `credits.css`: a rule whose selector list names classes of more than one screen, or the rule of a sentence that several screens draw, which today are, besides those columns, the sentence `trip-warning` and the animation of the frames of the sprites of the scene and of the picture band. Each screen and every other part that several screens use has a stylesheet of its own, a `.css` file directly in `src/browser/`, which a `<link>` of its own in `src/browser/index.html` gives to the player and which the build copies as it copies the other files of that kind, with no change of the build; the kitchen-sink page links the file of design tokens, `src/browser/styles.css` and its own stylesheet alone.

- **Scope:** browser-view

### D-445 — How does the figure of a character stand on the screen Postać?

At the top of the left area of the screen Postać, beside the character's name, stands the figure of the character: the same picture as that character in the picture band of Siedziba (D-389), at the same size, moving in the frames of its idle sheet at the scene's fixed beat with no loop of drawing and standing still under the system's setting for reduced motion. It stands whatever the character does — in the camp, in a manual map run going, paused or ended, and in an earning loop — always in the same pose, with no clearing under it, on the flat background of its area. It is a picture, not a control, taking no click and no key, hidden from readers of the screen, with no text on it or over it.

- **Scope:** browser-view

### D-446 — What does the screen Postać show beside the figure of a character?

Beside the figure of a character (D-445) stand the character's name as the heading of the screen, under it one line with „pokolenie {n}” from generation number 2 up (D-218), the icon of the character's archetype and the archetype's name, and under that line the line of the resurrection (D-217). The icon of an archetype is an icon of game-icons.net (D-27) whose file the archetype's data names, and it stands before the archetype's name, drawn as a mask in the colour of that name.

- **Scope:** browser-view · simulation

### D-447 — What does the screen Postać say of what the character does now?

Under the facts of a character (D-446) stands, always and with no heading, a frame whose first line says in the role `text` what the character does: „W obozie” where the character is neither the character of a manual map run nor in an earning loop; „Przejście: {mapa} · minuta {m}” while its manual map run goes on or waits in a pause, that line followed by „ · postać zginęła” or „ · mapa rozwiązana” once the map run has ended and waits for „Restart” or „Zakończ”, {m} being the minute the clock in the header of that map run writes; and the line of its earning loop with „Zatrzymaj” (D-244) while it is in one. After a stop of its earning loop the frame reads „W obozie” with the line of the stop under it (D-245). The frame shows no current action of the character and holds no button but „Zatrzymaj”.

- **Scope:** browser-view

### D-27 — Where do the game's icons come from?

The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory the account and save server serves and copied into that directory when the application is built. An icon file holds nothing that runs and refers to nothing outside itself. A section of credits, folded and opened with one click, stands on the login card and at the bottom of Siedziba, as its last part, and credits each icon with its title as game-icons.net gives it, its author, its page on game-icons.net and its licence, and says how the icon file differs from its source.

- **Scope:** browser-view, build-tools, simulation

### D-38 — Which styleguide discipline does loop2 adopt for the browser view?

Loop2 adopts the styleguide template of its pinned the-way, with no departure, for the user interface the part browser-view draws: its styleguide holds every rule and example the template requires, in the template's order, and drops none.

- **Scope:** browser-view, agent-workflow

### D-39 — What do the signal colours of the browser view mean?

In the browser view the role `positive` means that something works, is in order or is active now; `warning` means caution, that something is not carried out or is not saved, a wrong value typed into a field included; `danger` means that a character, progress or data may be lost; `discovery` means that something new was discovered; and `player-change` means that the player did it. Each of the five is a role of the kind text and stands as text on the backgrounds `page`, `panel`, `highlight`, `rule-winning` and `rule-running`.

`positive` and `warning` also stand as the state bar of a program rule and of a rule group, which says the state of the rule, is no frame or bar at a text in the sense of D-279 and takes no colour from the text beside it.

`positive` also stands as the fill of the progress bar over the mage's head, on a track in `highlight` in a badge on `panel`, with a contrast ratio of at least 3:1 against what it stands on; `warning` stands in no progress bar. `positive` also stands as the fill of the bar of a met requirement of the solving condition in the header, on a track in `highlight`, with a contrast ratio of at least 3:1 against what it stands on. `positive` also stands as the text of the button „Odbierz”, which pays the practice waiting at an earning loop, at rest and under the pointer.

`positive` also stands as the bar at the left of the picked row of the catalog of maps on the screen Mapy, whose card is the one open now, as the predecessor game marks it (D-331); that bar is no bar at a text in the sense of D-279 and takes no colour from the text beside it.

`discovery` also stands as the frame of the plaque of a discovery in the scene, which is a solid `panel` like the badge over the mage's head, with a contrast ratio of at least 3:1 against `panel`.

- **Scope:** browser-view

### D-40 — What do the neutral roles of the browser view mean?

In the browser view the background `page` means that here is the game, `panel` a block set apart, and `highlight` that this row or track is marked or that this control is under the pointer, `rule-winning` that this program rule wins now, and `rule-running` that this program rule's action is being carried out; `divider` means that one section ends and the next begins, `control-border` that something can be clicked or typed into, `selected` that this is the one chosen in its group, and `condition-unmet` that the condition of this program rule or rule group does not hold. Of the roles of the kind text, `text-strong` means a name, heading or value looked at first, `text` content to read, `text-secondary` a description, explanation or note, `text-label` the name of a field or section, or a date, and `text-disabled` that this cannot be used now. Each of the five stands as text on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, and `text` is the text each of these backgrounds is written with.

The badge over the mage's head stands on `panel` and the track of its progress bar in `highlight`, and the icon in the badge stands in `text-strong`, though it is no text and no text stands beside it; so does the icon flying to the mage, on its plaque in `panel`, and so do the icons of the drawing of the map, on `tile-revealed`, and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either. The bar of a requirement of the solving condition in the header has its track in `highlight` and, while the requirement is not met, its fill in `text`, though it is no text. The bar of the practice of a tree on the screen Postać has a darker track and a light fill with no green, as the bar of a requirement that is not met has, its track in `text-disabled`, at a contrast ratio of at least 2:1 against `panel` (D-42), and its fill in `text`, though neither is text, and the points of that tree to spend stand beside it in `text-strong`.

- **Scope:** browser-view

### D-41 — What do the roles of the terrain grid and of keyboard focus mean?

In the browser view `character` means that here is the character and here it is going, the target of its current move told from its place by shape, a thin dashed line in place of a thick solid one, never by colour; `tile-hidden` means a place not yet known, `tile-revealed` a place known, whose icons say what lies there, and `tile-edge` the border between tiles of either kind. `link-highlight` means that this tile and this row of the list of revealed tiles are the same place, `depleted` that what was here is gone, and `focus` that here is where the player is, using the game by keyboard.

- **Scope:** browser-view

### D-42 — Which accessibility requirements does the browser view keep?

Every screen of the browser view keeps four success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast, 2.3.1 Three Flashes or Below Threshold and 2.4.7 Focus Visible — and no other requirement of WCAG, with no date or event set for returning to it. Every role of the kind text but `text-disabled`, the signal colours included, has a contrast ratio of at least 4.5:1 on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, and `text-disabled` has no threshold as text, while as the track of the bar of practice of a tree on the screen Postać it has a contrast ratio of at least 2:1 against `panel`, a pair of its own and a floor of the product that no criterion of WCAG sets. `control-border`, `focus` and `character` have a contrast ratio of at least 3:1 against the colours they touch, and so have `tile-revealed` against `tile-hidden` and the frame of the plaque of a discovery in the scene, in `discovery`, against `panel`; `condition-unmet` has no threshold.

- **Scope:** browser-view

### D-43 — What counts in the browser view as a value written in place of a design token?

In the files of the part browser-view other than its file of design tokens, a value written in place of a design token is a colour in any notation — hexadecimal, functional, a named colour or a system colour — in styles and in TypeScript and, in styles, a size or spacing in `px`, `rem` or `em`, a font name, or a unitless stroke width, dash pattern, opacity or font weight, those four unitless kinds being all. None is `0`, a percentage, a size in `fr`, `vw` or `vh`, a keyword such as `transparent`, `currentColor`, `inherit` or `none`, a screen-width threshold of an `@media` rule, the geometry of the terrain drawing or of the scene computed in TypeScript, the frames and positions of a sprite, the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid — or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it or, where no text stands beside it — in the badge over the mage's head, on the plaque of the icon flying to the mage and in the drawing of the map — from `text-strong`, and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either.

- **Scope:** browser-view

### D-44 — Which controls do the screens of the browser view build on?

The screens of the browser view build every button, select list, number field, text field and cell of a pick from the shared controls of `src/browser/view/controls/` — the button in its kinds (the plain button, the destructive button, the button selected in its group, the secondary action (D-275), the tab (D-276), the main look outside a form (D-274) and the button in `positive`), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons, with their text in `danger` at rest, in every layout, and the background `highlight` besides under the pointer, and „Odbierz”, which pays the practice waiting at an earning loop, is the plain button with its text in `positive` at rest and under the pointer (D-39).

A control awaiting a server response is disabled with text in `text-disabled`, „Zacznij od zera” while its reset waits for the server among them; the button that sends a form then reads „Logowanie…”, „Zakładanie konta…”, „Wysyłanie…” or „Ustawianie…” for the corresponding form — „Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła” or „Ustaw nowe hasło” — and that form's fields are disabled, and the button „Wyślij ponownie” then reads „Wysyłanie…”, as the button „Wciągnij programy z poprzedniego zapisu” reads „Wciąganie…” while its pull waits (D-401). A form's server refusal and loss of connection appear as one sentence below the form in `warning`, the answer to a request for a password-reset link (D-222) appears in that place in `text`, with a bar on its left in its own colour (D-279) and never in `positive`, and the kitchen-sink page shows the waiting and refusal states of every form, „Nie pamiętam hasła” and „Ustaw nowe hasło” included, and the form „Nie pamiętam hasła” with that answer.

- **Scope:** browser-view

### D-45 — Where does the browser view's kitchen-sink page stand?

The kitchen-sink page of the browser view is built from `src/browser/kitchen-sink/` and opened on the developer's machine by its own command, `npm run kitchen-sink`, and nothing `npm run build` writes, which is what reaches the test server, holds it. The page shows every shared control in each of its states or the reason a state does not apply, every role, and samples of tiles in each state drawn with the roles, never a drawing of the game from a game state.

- **Scope:** browser-view, build-tools

### D-46 — Which fonts does the browser view use, and where do they come from?

The fonts of the browser view are Geist and Geist Mono, whose web-font files and licence file are taken from a release of github.com/vercel/geist-font into `assets/fonts/`, outside the directory the account and save server serves, and copied into that directory when the application is built. The game loads fonts only from those files, never from another server, and sets the chronicle, its entries in the end-of-run window included, and the clock of the map run in Geist Mono and every other text in Geist.

- **Scope:** browser-view, build-tools, deployment

### D-47 — Which elements of the browser view are controls, and how does their focus show?

A control of the browser view is every HTML element the browser lets the keyboard reach, links included, and the code marks none. One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`, and no other style or code of the part browser-view sets `outline` or an `outline-*` property, except that the kitchen-sink page's stylesheet repeats that rule with one more selector, for its sample of the focused state.

- **Scope:** browser-view

### D-48 — How are the design tokens of the browser view named?

In the file of design tokens of the browser view, each role of its styleguide's table of roles is the custom property `--<role>`, under the role's own name, and every other value of appearance is a custom property named by what it is for, never by its colour or by its number alone.

- **Scope:** browser-view

### D-271 — Where do the scene's pictures come from?

The scene's pictures and the picture of the game behind the login card are sprites of the packs Pixel Crawler, LPC Wolf and „[LPC] bears, deer, lions and more”, and the dust of a miss and the cloud of a scuffle are sprites of the pack Smoke & Fire Animated Particle [16x16] recoloured to the scene's colours, all kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built. The pictures in the picture band at the top of Siedziba, its clearing, fire, chest and characters, and the figure of a character on the screen Postać, are sprites of the pack Pixel Crawler kept there in the same way, the figure being the mage in the frames of its idle sheet, the picture a character of the band stands in, and the chest is one still picture whatever it holds. A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, the game takes the pack LPC Wolf under its licence CC BY 3.0, the bear's pictures come from the pack „[LPC] bears, deer, lions and more”, which the game takes under its licence CC BY 4.0 and credits, and the character of the scene is the mage of Pixel Crawler.

CSS may draw in the scene layers, such as the tint of its light, the cold layer of a death of cold and the frost, and specks, and the frost and the specks are squares of one pixel of the scene on its grid in colours of the palettes of the packs, while the colours of the tint layer and of the cold layer have their source in the human's choice; whatever has a drawing — a character, a creature, a thing — comes from a pack, and the colour of an effect stands out from the ground it stands on, the outline or the fill of the frost by at least 3:1 against the snow it lies on.

- **Scope:** browser-view · build-tools · deployment

### D-272 — Where may a picture of the game stand?

A picture of the game stands behind the login card, in a band at the top of Siedziba, as the scene and as the figure of a character at the top of the screen Postać, which stands with no clearing under it, on the flat background of its area, and text stands on a solid background, never on a picture.

- **Scope:** browser-view

### D-273 — When do the files of `assets/sprites/` gain a refusal test?

A permanent refusal test for the files the build copies from `assets/sprites/` is deferred until the first task changing that boundary, which introduces its refusal test and changes the method of sprite-file-content to test; what changes the boundary is read as D-76 reads it, so a further PNG file does not. Until then, review checks that the build copies from `assets/sprites/` only PNG files holding pixels alone, and only into what `npm run build` writes.

- **Scope:** browser-view · build-tools

### D-274 — What does a main button look like, and which buttons have it?

The button that sends a form, marked as its submit button, is that form's main button, one to a form: its text in `text-strong`, a frame in the colour of that text and no fill, with no role of colour of its own. „Wejdź” at each character in the section „Kto idzie” of the card of a map has the same main look though it sends no form, while „Puść w pętlę” beside it keeps the plain button. Beyond these, the main look covers only a button that sends a form, and any other action outside a form keeps the button D-44 gives it.

- **Scope:** browser-view

### D-275 — Which actions of the browser view stand as text rather than as buttons?

An action that opens or leaves a state of a form and stands under that form — „Nie pamiętam hasła”, „Wróć do logowania” and „Anuluj” of the login card — is a secondary action: underlined text in `text-secondary` without a frame, and a button still, since it changes the state of the screen and has no address. Every other action of the browser view keeps the button D-44 gives it.

- **Scope:** browser-view

### D-276 — What is a tab of the browser view?

A tab is a button selected in its group drawn without a frame, the chosen one with its text in `text-strong` and a line in `selected` at its bottom. A tab keeps the HTML element, `aria-pressed` and keyboard of the button selected in its group — Tab reaches each, Enter or Space switches — with neither arrow keys nor the roles of tabs. The switch of the login card stands as tabs, and the pace buttons of D-130 keep the look of the button selected in its group.

- **Scope:** browser-view

### D-277 — How does the menu bar show where the player is?

The menu bar marks the place the player is at as the chosen tab is marked (D-276): its text in `text-strong` and the same line in `selected` at its bottom.

- **Scope:** browser-view

### D-279 — What colour does a frame or a bar that sets a text apart take?

A frame or a bar drawn at a text to set it apart — the frame of a form's main button (D-274), the bar of the answer to a request for a password-reset link (D-44), the frame of a field in the colour of its message — takes the colour of that text and is part of it, so the text's role keeps the meaning D-39 and D-40 give it. A line that marks the one chosen in its group stays in `selected`, save the bar of the picked row of the catalog of maps, which stands in `positive` (D-39, D-331).

- **Scope:** browser-view

### D-396 — In which browsers and from which window size does the game have to work?

The game works in the current releases of Chrome, Edge and Firefox on a computer and of Chrome on a phone with Android; Safari, on a computer or on a phone, is outside that set. A window whose page area — the area of the page inside the browser's window, not the resolution of the screen — is 1280 px wide or wider shows the computer layout, whose smallest window has a page area of 1280 × 720 px; a narrower window, of a phone or of a computer, shows the phone layout, made for a phone held upright with a page area 360 px wide.

In the phone layout every screen fits the width of the window with no scroll to the side and no text over the border of its frame, and everything the game offers is done by touch. Nothing in the phone layout scrolls to the side, in a frame either.

Every control of the phone layout — a button, a cell of a pick, an arrow, an item of a menu — has a touch target at least 48 px high and 48 px wide, a value taken from Android's accessibility guidance. A link inside a running sentence keeps the size of its text; a link that stands by itself as a control holds the minimum.

A fault of the phone layout is fixed where a window of its width that is taller than it is wide shows it; a fault in a window narrower than 360 px, or one seen only in a window wider than it is tall, such as a phone turned sideways, is not fixed, and a fault of the computer layout in a window lower than 720 px is not fixed where no decision defines how the game looks there.

- **Scope:** browser-view, agent-workflow

### D-133 — Where does the player see a map run's streak and a map's solving condition?

During a map run the header shows a bar with numbers for the requirements present in the map's solving condition: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present. A requirement that is met shows its name, its numbers and the fill of its bar in the role `positive`, and the bar stands on the screen after the end of the map run too, on the state of its stopped game minute and with the streak as it stands then, such as „Passa 0/480” after a death of cold. The card of each open map shows the sentence of its solving condition from the map's data in its part „Żąda”, under the table, as „480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”.

- **Scope:** browser-view, simulation

### D-51 — What team does a new game start with?

A new game starts with an empty team, and the player creates the first character in the headquarters before sending any character to a game map.

- **Scope:** simulation, browser-view

### D-52 — How is a character named?

A character has a name, which the player types when creating it; a name that is empty, also once the white space at its start and end is trimmed, creates no character, and two characters may bear the same name.

- **Scope:** simulation, browser-view

### D-54 — In what order do the characters of the team stand?

The characters of the team stand on its list in the order they were created.

- **Scope:** simulation, browser-view

### D-56 — How does the game state tell one character from another?

Each character carries a number the game gives it when the character is created, 1 for the first character of a game and one more than the number the game state gave last for each later one, so the numbers of two characters of one game differ. A map run names the team's character it carries by that number.

- **Scope:** simulation, browser-view

### D-57 — In what unit does a character's warmth stand?

A character's warmth is its body temperature in degrees Celsius, counted with tenths and written with a decimal comma, as „36,5 °C”.

- **Scope:** simulation, browser-view

### D-58 — What cools a character's body?

A character's body cools in each game minute outside combat by more, the further the game map's ambient temperature lies below the body's starting temperature, and the ambient temperature stands in the game map's data.

- **Scope:** simulation

### D-59 — How far do warming and eating raise a character's warmth and satiety?

Warming raises a character's body temperature up to its starting body temperature, and eating raises its satiety up to its starting satiety.

- **Scope:** simulation

### D-60 — When does a character lose and regain health?

Outside combat, a character loses health in each game minute in which it is chilled — its body temperature below the threshold of chill — and loses it again, apart, in each game minute in which it is starving — its satiety below the threshold of hunger; in a game minute in which it is neither, its health comes back by itself, up to full health. During the game minutes of combat the character's needs and health stand still until the combat actions change its health.

- **Scope:** simulation

### D-61 — When does a character die, and of what?

A character dies in the game minute in which its health reaches zero, also during the character's action in progress, and the map run then ends in death with its cause. For a death of cold or hunger, the cause is cold where the character's body is chilled in that game minute, and hunger otherwise. A character whose health reaches zero through combat dies with the cause combat in the game minute of the combat turns.

- **Scope:** simulation

### D-62 — What does the screen show, and what can the player do, after a character's death?

After a character's death the screen stays on the state of the game minute of death and time stands still for that map run, the end-of-run window D-368 gives opens of itself over the screen, its header included and the menu bar not, and the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen D-53 gives, in the window and, with the window closed, in the header. After a character's death the pace buttons are gone together with „Pauza”.

- **Scope:** browser-view, simulation

### D-190 — What does a character's death take?

A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged, except that the death of a character with no practice yet — none in any skill, no rank of branch bought and none gathered at its earning loop — takes nothing besides what it carried, leaves the generation number as it was, uses up no use of the resurrection, whether one is left or not, and does not stop its earning loop. The programs, the chest, the Understanding and the solved maps survive every death; the map run kept on the screen stays as it was, and a „Restart” after a death with no use of the resurrection left starts from the character as that death left it.

The account has one resurrection, shared by all its characters, held as numbers of the account, no item of any backpack, equipment or chest: a number of uses and the span of real time after which one used use returns, both set in the balance data, 3 uses and 4 hours to start. The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop.

The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs, a use returns after the span from the moment the clock started and each next one after the span from the return of the one before it, and the clock stops when the stock is full. The first completion of a map the account has not solved yet returns one use at once while the stock is not full, once for each map, the clock running on as it was, and a full stock stays full.

- **Scope:** simulation

### D-216 — Where does the player read what a death took and what a completion returned?

After a character's death, in the section of the end-of-run window (D-368) saying what it cost, until „Restart” or „Zakończ” and after a load too, a line stands: „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia {u} z {c}; zużyte wracają po kolei, jedno {r} czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.” in `text-secondary` when the death used up a use of the resurrection, the count {c} and the span {r} coming from the balance data and the uses left {u} being that count less the uses spent that the settlement of the death holds, read when the window is drawn, „Wskrzeszenie drużyny nie miało żadnego użycia: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.” in `danger` when no use was left, and „Postać nie miała jeszcze wprawy, więc śmierć nie zabrała drużynie żadnego użycia wskrzeszenia.” in `text-secondary` when the character had no practice yet, in place of the two lines above. The span {r} reads „co godzinę”, „co 2 godziny” or „co 5 godzin” where it is a whole number of hours, declined by the number as the other counters of the game are, and otherwise „co {g} godz. {m} min”, below one hour „co {m} min”, in the form of the time reading of D-217.

After the first completion of a map that returned a use of the resurrection, in the section saying what the end gave, below the line of D-185, until „Restart” or „Zakończ” and after a load too, the line „Wróciło jedno użycie wskrzeszenia drużyny: pierwsze rozwiązanie tej mapy.” stands in `text-secondary`; a completion that finds the stock of uses full shows none.

- **Scope:** browser-view

### D-217 — What does the game show of a character's resurrection?

The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full, „Wskrzeszenie drużyny: użycia {u} z {c}, następne za {g} godz. {m} min czasu realnego” in `text-secondary` while the stock is not full and a use is left, and „Wskrzeszenie drużyny: użycia 0 z {c}, następne za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger` at zero uses, the count {c} coming from the balance data and the time reading „następne za {m} min czasu realnego” below one hour. The minutes are rounded up to a whole minute before the split into hours and minutes.

- **Scope:** browser-view

### D-218 — How does the headquarters show a character's generation number?

The headquarters and the screen Postać show „pokolenie {n}” beside a character's name from generation number 2 up, in `text-secondary`.

- **Scope:** browser-view

### D-219 — Whose clock counts the renewal of a resurrection?

The browser's clock counts the renewal of a resurrection, so the renewal runs in real time at every pace of a map run and while the game is closed.

- **Scope:** simulation · browser-view

### D-220 — What generation number and resurrection does a new character have?

A new character has generation number 1 and brings no resurrection of its own; a new game has the account's resurrection with its full number of uses.

- **Scope:** simulation

### D-221 — When is a character's death settled?

A character's death is settled by a function of the simulation apart from the functions that pass game time, which leave the death unsettled and take no real moment. Whoever passes game time gives the result to that function at once, with a moment of the browser's clock, so the game state the browser view holds, draws and saves holds a settled death. A load refuses a saved game state that holds a death unsettled.

- **Scope:** simulation · browser-view

### D-387 — What numbers do the body, the gathering, the campfire and eating have?

These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect: the body starts at 37.0 °C, 100 satiety and 100 health, which are also its caps; in a game minute outside combat it cools by 0.002 °C for each degree its map's ambient temperature lies below 37.0, loses 0.6 satiety, is chilled below 35.0 °C and starving below 30 satiety, loses 0.35 health for being chilled and another 0.35 for starving, and regains 0.05 health in a game minute in which it is neither. A gathering lasts 10 game minutes and succeeds with the chance 0.7. Making a campfire lasts 20 game minutes and uses 6 sticks; lighting it lasts 5 game minutes, uses 2 sticks (besides the nature energy of D-63) and gives it 60 minutes of burning; feeding it lasts 5 game minutes, uses one stick and adds 20 minutes of burning; a burning campfire warms the character on its tile by 0.5 °C a game minute; lighting a stick lasts 5 game minutes and uses the stick, which burns 3 minutes and warms the character on its tile by 0.15 °C a game minute; eating lasts 5 game minutes, uses one berry and gives 25 satiety.

- **Scope:** simulation

### D-175 — What does a mage pay for spells with?

Each spell costs the mage nature energy, which comes back by itself only while the mage is well fed; empty nature energy closes the spells and takes no health. A character without nature energy has no spells and pays nothing for them.

- **Scope:** simulation

### D-176 — With how much nature energy does a mage start a map run?

A mage starts every map run, a new one and one started by „Restart”, with its nature energy at the cap.

- **Scope:** simulation

### D-177 — What does too little nature energy do to Płomyk?

A mage carries out Płomyk while its nature energy reaches the spell's price; with less, the program passes over a program rule with „Zapal — ognisko” or „Zapal — patyk” and picks a later one, as for any action of the character not feasible then, and the rule stays in the program.

- **Scope:** simulation

### D-178 — What does the body row show of a mage's nature energy?

The body row ends with „Energia natury {n}”, the mage's nature energy cut down to a whole number, from game minute zero, in the role `text` at every value of the energy, zero included.

- **Scope:** browser-view

### D-191 — How does a character skill grow?

A character skill grows by practice, which counts only its actions that ended in effect, and is never bought. A character skill has one practice counter and one curve, and what is saved of it is its practice and the ranks of branches bought, its level, free points and every effect being computed from these two. Each level gives points that buy ranks of branches of its own tree, at prices that differ from branch to branch, and each next level needs more practice than the one before.

- **Scope:** simulation · browser-view

### D-192 — What describes a character?

A character is described by traits, character skills and the predispositions of its archetype. A number that acts in one action only belongs to the tree of that action's character skill, never to a trait.

- **Scope:** simulation · browser-view

### D-193 — When and how much practice does an action add?

An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles. Eating has its effect when the berry is eaten, even at full satiety; a dodge has its effect when it removes some damage from an enemy strike, counted in the turn of that strike.

- **Scope:** simulation

### D-194 — When does a manual map run pay its practice to its character?

A manual map run holds the practice it gathers separately by character skill and pays all of it once to the character making the run in the game minute of the completion that first solves its map, while a manual run of a solved map keeps its practice with the run. A run cut short by „Restart” or „Zakończ” before completion leaves the character’s practice and bought ranks as they were.

- **Scope:** simulation

### D-195 — When does a character skill tree become known?

A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens, and a tree whose first action the Understanding holds from the start enters with the first finished action of that skill. The band of a discovery names the tree beside the action, as „Odkryto: Zbierz, drzewo umiejętności Zbieranie małych przedmiotów.”, followed by the sentence naming newly discovered conditions when the same game minute reveals one.

- **Scope:** simulation · browser-view

### D-196 — Which branch actions does the program editor offer outside a map run?

Outside a map run the program editor offers the repertoire computed from the Understanding through the archetype’s predispositions; bought branches contribute no actions to that editor's offer. During a map run, a manual map run that waits in a pause and one that has ended and waits for „Restart” or „Zakończ” included, both the copy editor and the saved-program editor of Programy use the repertoire of the map run's character, including its bought branches.

- **Scope:** simulation · browser-view

### D-197 — What does the gathering branch Obchód do?

The gathering tree has the branch „Obchód”, which opens „Obchód — {zasób}”: a guaranteed batch of the chosen resource from the current tile, up to the amount in the data, the tile’s remaining stock and the backpack’s remaining capacity. „Pełna garść” likewise takes no more pieces than remain on the tile or fit in the backpack.

- **Scope:** simulation

### D-198 — What does the exploration branch Zwiad do?

With the bought branch „Zwiad”, exploration reveals the current tile and its neighbours together, while still requiring the current tile to be unrevealed. Items on all tiles revealed in that game minute enter the Understanding together in its discovery pause.

- **Scope:** simulation · browser-view

### D-199 — What does the screen Postać show of character skills?

The screen Postać shows the section „Umiejętności” after a tree is known, and before the first known tree the section is absent. Each known tree stands as a row in columns: its name, „poziom {p}”, a bar of its practice up to its next threshold with „{wprawa} / {próg}”, or after its last threshold a full bar with „najwyższy”, and „{k} pkt” only where it has points to spend; right after the name, in the role `text`, stands „+{n} pkt czeka w pętli” where the practice waiting in the character's earning loop, the practice „Odbierz” would pay at that moment, gives the tree {n} new points to spend. The trees stand folded, a click on the row of a tree or the keyboard opens it, and each entering of the screen starts with the trees folded.

Below an open tree each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price and omit numerical before-and-after values. A fully bought branch keeps its present value if numerical and omits the next value and price.

- **Scope:** browser-view

### D-200 — Where does the player buy a branch rank, and when does it act?

The player buys a branch rank with „Kup” on the screen Postać outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too, and the rank acts from that character's next map run, the next map run of that earning loop included, while the map run going on keeps the skills of its start. The game has no purchase in the map-run view and no undo of a purchase.

- **Scope:** simulation · browser-view

### D-201 — What does the map-run view show of its practice?

Below the body row the map-run view shows a line in the role `text`, „Wprawa w tym przejściu: {umiejętność} +{n} · …”, listing the skills with positive practice gathered in that run. On a manual run of a solved map, which pays no practice (D-189), the line reads „Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: {umiejętność} +{n} · …” in the role `text-secondary` instead. Zero-valued skills and the line at zero are absent, and the positive line remains after death and completion until „Restart” or „Zakończ”.

- **Scope:** browser-view

### D-374 — How short can an action shortened by bought branches be?

An action shortened by bought branches lasts at least one game minute.

- **Scope:** simulation

### D-377 — How fast does a mage's nature energy come back?

In a game minute outside combat in which the mage's satiety, taken after its fall in that minute, is at least 60, the mage's nature energy comes back by 0.5, up to its cap; in a game minute in which satiety after the fall is below 60 it comes back by nothing.

- **Scope:** simulation

### D-378 — Can a program of the closed lists solve Las?

On Las a program built of the closed lists of conditions and actions solves the map, paying nature energy for its lightings, on at least one seed that a test of the simulation names, and the empty program dies there.

- **Scope:** simulation

### D-379 — What are the curves of practice, and the effects and prices of the branches, of the eight character skills?

The eight character skills give a level and a point at each of these amounts of practice: „Zbieranie małych przedmiotów” at 30, 80, 160, 280 and 450; „Wytwarzanie ogniska” at 20, 55, 110 and 190; „Rzucanie czaru Płomyk” at 2, 6 and 14; „Eksploracja” at 15, 45, 100 and 200; „Walka bronią jednoręczną” at 15, 40, 100 and 300; „Kopanie” at 10 and 30; „Unik przed ciosem” at 4 and 15; „Jedzenie” at 15, 40 and 80. Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order: „Wprawne oko” +5 percentage points of the chance of a gathering, prices 1 · 1 · 1; „Pełna garść” 2 pieces in place of 1 from a successful gathering, price 3; „Obchód” 40 minutes and 12 pieces, price 3; „Oszczędne dorzucanie” +5 minutes of burning from a piece fed to a campfire, prices 1 · 1 · 2; „Zgrabna konstrukcja” −5 minutes of making a campfire, prices 1 · 2 · 2; „Szybka ręka” −1 minute of lighting, prices 1 · 1 · 1; „Czysty płomień”, price 3; „Wprawny krok” −3 minutes of exploring, prices 1 · 1 · 1; „Długi krok” −2 minutes of each step between tiles, prices 1 · 1 · 2; „Zwiad”, price 3; „Mocniejszy cios” +2 damage of a blow with a stick, prices 1 · 1 · 1 · 1; „Cięższy kop” +1 damage of a kick, prices 1 · 1; „Zwinny odskok” 1 more taken from a blow by a dodge, prices 1 · 1; „Szybki posiłek” −1 minute of eating, prices 1 · 1 · 1. These numbers stand in the data of the character skills (D-18).

- **Scope:** simulation

### D-125 — What do the body row, the backpack, the list of revealed tiles and the drawing of the game map show of what is not yet discovered?

The body row, the backpack, the list of revealed tiles and the drawing of the game map show what the game state holds, whatever the Understanding holds: the body row shows satiety before the condition „Sytość poniżej” is discovered, and the backpack, the list of revealed tiles and the drawing of the game map show every item they hold.

- **Scope:** browser-view

### D-19 — How does the player interact with the drawing of the game map?

The drawing of the game map is a picture, not a control: its only interactions are hovering a tile and tapping it, each of which marks the tile's row in the list of revealed tiles, and the numbers of stock stand in that list and in the line under the drawing, which shows the hovered or the tapped tile or else the character's tile, never on the drawing. A tap with a finger on a tile keeps its row marked until a tap elsewhere takes the mark off, hovering with the pointer on a computer stays as it is, and a click of a mouse on a tile changes nothing.

- **Scope:** browser-view

### D-283 — What happens to a manual map run when the player leaves its screen?

Leaving the screen of a manual map run pauses it as „Pauza” does.

- **Scope:** browser-view

### D-284 — Does a return to the screen of a manual map run resume it?

A return to the screen of a manual map run that waits in a pause leaves it in that pause until the player presses „Wznów”, whether or not it went on before the player left.

- **Scope:** browser-view

### D-287 — What do Siedziba, the screen Postać and the screen Mapy allow, and say, while a manual map run waits or has ended?

While the game state holds a manual map run that waits in a pause, or that has ended and waits for „Restart” or „Zakończ”, Siedziba, the screen Postać and the screen Mapy keep active what the simulation allows, while „Wejdź”, „Puść w pętlę” at that map run's character and „Kup” stand inactive. Under the inactive buttons of each character in the section „Kto idzie” of the card of a map stands „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”, and at the section „Umiejętności” „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.” Wherever the sentence under the buttons of a character stands, „Wróć do niego i je zakończ, żeby wysłać postać.” in it is a link to the screen of that manual map run, `#/postac/{n}/przejscie` with {n} the number of the map run's character (D-281).

- **Scope:** browser-view

### D-311 — How is the screen of a map run laid out?

The screen of a map run has two columns under one header in the computer layout: on the left the world and, under the drawing of the map and the line of a tile that end it, an area with the tabs „Kronika” and „Teren” holding one content at a time, the chronicle or the table of revealed tiles, as the player picks, „Kronika” picked when the character is sent to the map; on the right the program, in which the editing of a rule or a rule group opens in place under its row (D-288). The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with the minutes each need lasts, with the backpack and the lines below them, the drawing of the map and the line of a tile under it. The header holds the character's name, the map's name, the clock, a bar of the solving condition with its numbers (D-133), „Pauza” or „Wznów”, the pace, and after the end of the map run „Koniec przejścia”, which opens the end-of-run window, „Restart”, the warning of a cut trip plan and „Zakończ”.

In the phone layout (D-396) the screen has one column under the same header, with the world, the program and the area with the tabs „Kronika” and „Teren” one above the other in that order (D-282).

After a character's death or a completion that window (D-368) stands in place of this screen, its header included (D-370), under the menu bar and the row of warnings below it, and holds the lines of the end (D-185, D-216), which the world area does not; „✕” in it and Escape pressed in it (D-370) close it and uncover the screen, it opens again at every entry on the screen of an ended map run, and it closes when the question „Zapisać, odrzucić, wrócić?” of D-173 stands. It opens of itself at the end of the map run once the scene's effect of the death or the completion has played, so that the effect is seen, and at once where the scene shows the last image of that effect at once (D-322): at an entry on the screen, after a reload or a load, and under the system's setting for reduced motion.

- **Scope:** browser-view

### D-324 — What does the map run do, and what stands on the screen, while the question of „Zakończ” stands?

While the question „Zapisać, odrzucić, wrócić?” of D-173 stands, the map run is paused as „Pauza” pauses it, and „Wróć” puts it back as it was before „Zakończ”: a map run that went on goes on, and a paused one, the stop at a discovery included, stays paused. The rest of the screen works as usual, so editing the copy, the pace buttons, a second „Zakończ” and the buttons of the panel of the copy act and leave the question standing, except that it goes, with the map run left paused, when the copy no longer holds unsaved changes — after „Zapisz w programie”, „Zapisz jako nowy program”, „Porzuć zmiany”, „Przełącz postać na ten program” or an edit after which the copy no longer differs from its program as D-171 gives — and „Wznów”, in the header or in the band of a discovery, „Restart” and, after the end of the map run, „Koniec przejścia” of the header close it as „Wróć” does and then do what they do without it, „Koniec przejścia” opening the end-of-run window (D-368, D-311). Leaving the screen of the map run closes the question as „Wróć” does, the map run standing paused as D-283 gives, and the question lives in the memory of the page alone, so after a reload it is gone and the map run comes back as D-212 gives.

- **Scope:** browser-view

### D-334 — What does „Teraz” say on the screen of a map run?

Under the scene of the screen of a map run the row „Teraz” keeps one height whatever it holds, and while the character carries out an action it holds the icon of the action and the action as the row of its program rule writes it, such as „Zbierz — Patyk”, and at its right the number of the program rule the action comes from and the minutes of the action, such as „reguła 2.1 · zostało 3 z 5 min”, with no progress bar, and while the character waits „Czeka — żadna reguła nie pasuje”, with no rule and no minutes. In the minutes of an attack it holds „Walczy z wilkiem” alone, or „Walczy z” and the name of another creature, as D-147 gives, with no icon, no number of a rule and no minutes, and after a completion the completion text D-132 gives. After a character's death it reads the cause of the death in the role `text`, „Mag zamarzł”, „Mag umarł z głodu” or „Mag zginął w walce”, while the clock in the header stands at the game minute of the death, such as „Minuta 312”.

- **Scope:** browser-view · simulation

### D-335 — What does „Potem” say on the screen of a map run?

Under „Teraz” the row „Potem” holds the word „Potem”, the icon and the action of the program rule that wins now and at its right its number, such as „reguła 2.1”; in the minutes of an attack that rule is the combat rule the turn would choose, as D-309 gives, and while no rule wins the row reads „żadna reguła nie pasuje — postać stanie” in the role `warning`. The row says the state of the current game minute, which may change before the action in progress ends, and on the screen after the end of a map run it names the rule that wins at the stopped game minute, as the background `rule-winning` does (D-308).

- **Scope:** browser-view · simulation

### D-336 — What does a click on „Teraz” or „Potem” do?

A click on the row „Teraz” or „Potem”, with the mouse or from the keyboard, scrolls the program once so that the program rule the row names stands in its middle, or, for a rule in a folded rule group, the header of that group, after which the program does not follow that rule by itself; a row that names no rule scrolls nothing. While the program panel shows a saved program in place of the copy, however it came to be shown — picked on its list (D-174) or made with „Nowy program” (D-167) — the click scrolls nothing and the saved program stays shown.

- **Scope:** browser-view

### D-337 — What does the body row show of how long each need lasts?

The body row holds each of its values in a cell of its own, and under temperature and under satiety a note in smaller grey text, health and nature energy standing with no note. The note under temperature reads the first of these that holds: „marznie” in red below 35 °C, „przy ogniu” while something burns on the character's tile, „nie stygnie” on a map that does not cool the body, and „bez ognia {n} min”; the note under satiety reads „głoduje” in red below 30 and „bez jedzenia {n} min” otherwise. {n} is the whole game minutes, rounded down, left until the character starts to be chilled or to starve, and the notes stand from game minute zero and on the screen after the end of a map run, on the state of its stopped game minute.

- **Scope:** browser-view · simulation

### D-346 — How long does the pick of „Kronika” or „Teren” hold on the screen of a map run?

The tab „Kronika” or „Teren” the player picks in the area under the world on the screen of a map run stays picked through the whole map run, through leaving its screen and coming back, and through „Restart”, and a rule panel opened or closed in the program leaves it as it was; a reload of the page does not keep the pick, and „Kronika” stands picked again.

- **Scope:** browser-view

### D-349 — What size is the scene on the screen of a map run?

The scene has two sizes, one and two times its picture of 336 × 152 px: 672 × 304 px in the computer layout, and in the phone layout the larger of the two that the place of the scene holds, a classic scrollbar counted in the width of the window, so 336 × 152 px at a page area 360 px wide; the game keeps no fractional scale of it. Where a few pixels of the width are missing for the whole picture, the sides of the scene are cropped slightly, and the crop hides nothing the player acts with, such as a creature or an item.

Whatever the scene draws is drawn for these two sizes, and its small elements, such as the icon on the plaque of a discovery and the badge over the mage's head, stay readable at either, drawn at a size of their own, independent of the scale of the scene, where shrunk with it they are not.

- **Scope:** browser-view

### D-368 — What does the end-of-run window say, and how does it open and close?

When a manual map run ends in a character's death or a completion, the end-of-run window opens of itself over the screen of the map run, covering it with its header but not the menu bar nor the row of warnings under it, and under „Koniec przejścia” it answers in this order what happened, what it cost or gave, why and what next: the cause as a title — after a death „Mag zamarzł”, „Mag umarł z głodu” or „Mag zginął w walce”, after a completion the completion text of the map from its data, such as „Las rozwiązany”, in the role `positive` — with the longest streak the map run reached against the map's condition as „najdłuższa passa 116/480” with its bar in the form of the bar of the header (D-135, D-133), the discovery of that game minute where there is one (D-122), the line of what the end gave or cost (D-185, D-216), the sections of why and the buttons of what next.

Each section of why stands only where it has content: „Ostatnie minuty” only after a death, the four last entries of the chronicle other than the paragraph of the last encounter, ending with the entry of the death, each with its game minute as in the chronicle; the paragraph of the last encounter, in the words of the chronicle, in a section of its own (D-147); „Nie zadziałały ani razu”, the rules of the copy with the counter „Wykonano 0×” (D-93), each with its number, such as „2.2”, and the sentence of its row; „Na co poszedł czas”, one bar with a legend and percentages, with a piece of its own for each action of at least 8 % of the time, at most five, the rest in „reszta”, where „Idź”, „Idź — ognisko” and „Wędruj” join as „W drodze”, waiting stands as „Czeka” and combat as „Walka”; and „Wyprawa i teren”, with the lines „weszła z …” or „pustym plecakiem”, „odsłonięto {n} z {m} kafelków” and „w drodze {n} min”, and no line „odłożyła”.

The window scrolls in itself while its buttons — „Restart” with the warning of a cut trip plan (D-188), „Zakończ” and, after a completion of a map that opens another, „Otwarte: {mapa} →” (D-132) — stay fixed at its bottom; „✕” in the window and the key Escape pressed in it (D-370) close it and uncover the screen of the map run, whose header then holds „Koniec przejścia”, which opens it again, and the window opens again at every entry on the screen of an ended map run, after leaving by the menu bar and after a reload too.

- **Scope:** simulation, browser-view

### D-369 — What does a manual map run keep of itself for the end-of-run window, and how does a load read it?

A manual map run keeps, in the map run of the game state and so in the saved game state, and not in the plain map run that earning loops share, three things for the end-of-run window (D-368): the longest streak, the greatest value its streak held at the end of a game minute; the game minutes it passed by what the character was doing, each game minute counted once, to what the character was doing at its start, as a count for every kind of a closed list — the kinds of the data's ordinary actions, a wait and a fight — so that the counts sum to the game minute; and the items the character entered with, the entries of the backpack the send gave it, in the order of the data's items. The record begins at the start of the map run and again at „Restart”, and the load of a saved game state refuses a record whose longest streak lies below the streak going on or above the game minute, whose counts are not exactly those of the closed list or do not sum to the game minute, or whose items are out of the order of the data's items or add up to more pieces than the character carries.

- **Scope:** simulation

### D-370 — How does the end-of-run window cover the screen of a map run, and where does the keyboard go?

While the end-of-run window (D-368) stands, the header and the three areas of the screen of a map run are not shown, though they stay in the page with their state, and the window stands in their place under the menu bar and the row of warnings, as wide as the content column of the screens (D-280), in the computer layout and in the phone layout, and as tall as its content up to a part of the height of the browser window, with no backdrop; its heading with „✕” and its buttons stay fixed while its middle part scrolls, and the page is at its top when the window opens, so the menu bar stands above it in sight. The window takes the focus when it opens, Escape is read in the window and not on the document, and nothing traps the focus, so the menu bar above the window stays within the keyboard's reach; „✕” and Escape move the focus to „Koniec przejścia” in the header.

- **Scope:** browser-view

### D-371 — Who remembers whether the end-of-run window is open, and where does „Koniec przejścia” stand?

Whether the end-of-run window (D-368) is open is a memory of the page, kept by the game view and never written into the game state or the save: it is open when a map run ends and when the game is built on an ended map run, it becomes open again at every entering of the screen of an ended map run, and „✕”, Escape and the question „Zapisać, odrzucić, wrócić?” (D-173) close it, and the window stands only while it is open, the player is on that screen and no question stands. „Koniec przejścia” stands in the header before „Restart”, only while the map run has ended and the window does not stand, which includes the wait of the window for the scene's effect of the end (D-322), when it opens the window at once.

- **Scope:** browser-view

### D-385 — How does the list of revealed tiles show an item that burns on a tile?

An item burning on a revealed tile, such as a lit stick, stands in that tile's row of the list of revealed tiles after the text of the tile's campfire, as „patyk — płonie, zostało 3 min” with its minutes of burning left, for as long as it burns; it has no icon on the drawing of the game map, and its name comes from the game's data (D-18).

- **Scope:** browser-view

### D-314 — What does the background of the scene show?

The background of the scene is a still picture of a forest in snow, composed from the pictures of the pack Pixel Crawler that the predecessor game, loop, cut out.

- **Scope:** browser-view

### D-315 — Where does the tint of the scene's light stand?

The background picture of the scene is in full light and with no tint, and the tint of the scene's light is a layer over that picture, never a tint or a darkness in the picture's file. The layer lies over everything the scene draws — the background, the props, the campfire burning or extinguished, the mage, the wolf, the dust and the flying icon on its plaque — but the badge over the mage's head and the plaques of a discovery, which stay on their solid `panel` background (D-320, D-322), the specks of light after a completion, which stay in their own colours (D-322), and the frost on the edges of the frame, which lies over the layer and does not change its colour with the streak; the cold layer after a death of cold (D-322) lies over the layer of the tint, under the frost.

- **Scope:** browser-view

### D-316 — What does the scene show, and from what does it draw?

The scene draws the character, its campfire, what attacks it and the moment of the map run from the game state, its previous reading and the events the simulation returned, and it holds no state of the game, the picture of each resource, creature and archetype it shows standing in the game's data. Sticks, the berry bush and moss always stand in the scene, and the campfire only while it stands on the character's tile, burning with a fire that moves or extinguished, the same picture in `grayscale(1) brightness(0.55)` and without motion.

What attacks the character stands beside the mage through the minutes of the combat: it runs in from the right edge of the frame and stands on the right of the mage, facing it, or on its left where the mage stands at the right edge, and the mage turns toward it; a death of the character or the solving of the map within the run leaves it standing beside the mage. The two scuffle, the creature in the frames of its bite and the mage in those of its idle sheet, with a small cloud of dust between them and no flash. A defeated creature falls where it stood and is gone, a creature that departs runs off to the right edge it came from, and after the character's death in the combat the creature stays beside the mage, standing still, as it does where the map run is solved in the minutes of a combat.

Motion comes from CSS at a fixed beat that does not depend on the pace, with no loop of drawing, and a fight shows as a scuffle that pictures no single blow.

The tint of its light (D-315), never blue and never greying the scene as the pause does, follows the streak: it goes evenly from a cool grey-green at streak 0 to a trace of the cool tint, 20 %, at the streak the map's condition asks for, stays there while the streak grows on, and is full warm gold only at a completion, and it leaves the brightness of the picture as it is and has no effect in the game. A loss of the streak while the map run goes on takes the tint back to the cool one over 2 s as a change of the scene's state, not an effect, which in the player's pause and at a discovery, where time stands still (D-322), begins where the scene goes on, while at a death, at a completion, at the start of a map run, after „Restart” and after a load the tint stands at once where the streak, or the completion, puts it.

- **Scope:** browser-view · simulation

### D-317 — How long do the scene's effects last?

An effect of an ordinary event is a short sign of one event at the character or in a part of the scene — the flight of an icon, a cloud of dust, the run of a wolf, the outcome of a combat — and lasts at most 300 ms and shows no text at 8× and 16×, and an effect overdue when its turn comes is dropped. What the character does through an action, such as bending through a gathering or the scuffle through a combat, and a state of the whole scene, such as the tint, the cold layer and the frost, are no effect: the first lasts as long as the action, and the second changes at the rate set for it. The three moments in which time stands still — a discovery, a death and the solving of a map — have no such limit: the effect of each plays once, and then the scene stands on its last image until the moment ends with „Wznów”, „Restart” or „Zakończ”, and a scene drawn again on the same moment shows that image at once.

The scene follows the system's setting for reduced motion: the frames stand still, every move from place to place and every change of its state shows its end at once, a short effect of an ordinary event appears still at its place for at most 300 ms and goes, and the effect of a moment shows its last image at once.

The scene shows no flash of its whole area.

- **Scope:** browser-view

### D-318 — Where does the mage go for each action?

The mage walks to the place its current action leads it to: with „Zbierz” and „Obchód” to the sticks, the berry bush or the moss, as the target says, with „Wytwórz — ognisko”, „Zapal — ognisko” and „Zasil — ognisko” to the place of the campfire, with „Eksploruj”, „Wędruj”, „Idź” and „Idź — ognisko” to the right edge of the scene, always the same place, and while it waits, no program rule fitting, to the middle of the clearing. Where its action leads nowhere — „Zbierz” and „Obchód” with fibre as the target, „Zapal — patyk”, „Zjedz — jagoda”, „Wytwórz” and „Opatrz” with an item as the target, and a fight — the mage stays where it stands.

- **Scope:** browser-view

### D-319 — How does the mage walk to its place?

The walk of the mage to its place lasts 640 ms and the frames of its sprite change every 160 ms, at every pace, as a movement of the character and no effect of an ordinary event. A target that changes on the way turns the mage from the place it has reached. At the start of a map run, after „Restart”, after a load and under the system's setting for reduced motion the mage stands at its place at once, and under that setting the frames stand still.

- **Scope:** browser-view

### D-320 — What stands over the mage's head?

Over the mage's head stands a badge on a solid `panel` background, never an icon or a bar straight on the picture of the forest, holding the icon of the current action (D-291) in `text-strong`, though no text stands beside it, and under the icon the progress bar of that action with its fill in `positive` on a track in `highlight`. While the character waits no icon and no bar stand there, and in combat no icon does. Under the system's setting for reduced motion the bar jumps at the readings of the clock instead of filling smoothly between them.

- **Scope:** browser-view

### D-321 — Does a click on the scene do anything?

The scene is a picture, not a control: a click on it does nothing and no pause sign stands on it.

- **Scope:** browser-view

### D-322 — What does the scene show while time stands still?

While the player's pause holds a map run, the scene is greyed with `grayscale(1) brightness(0.5)` and all its motion, the fire and the mage together, stands still.

In the three moments in which time stands still, a discovery, a death and a completion, the scene plays an effect once and then stands on its last image until the moment ends with „Wznów”, „Restart” or „Zakończ”, and nothing but the effect moves while it plays, the fire standing as at every stop, and the mage too at a discovery and a completion: at a discovery the scene keeps its colours (D-122) and the icon of each thing discovered that the game's data gives an icon, each icon once, comes out of the forest on a plaque on `panel` with a frame in `discovery`, like the badge over the mage's head (D-320), and stands over the clearing, „Wznów” cutting the effect short; after a death no badge stands over the head, the mage falls in the six frames of its death sheet, toward the middle of the frame so that it lies inside the picture, and lies grey with `grayscale(1) brightness(0.55)`, and after a death of cold a blue layer lies over the whole scene, above the tint of the light and under the frost (D-315), which after a death of hunger or in a fight stands nowhere; after a completion no badge stands there, the mage stands in colour and specks of light rise over the clearing and go out, over the full gold of the tint. At the stop at a discovery that the first attack makes, the creature already stands beside the mage, with no run in, and the scuffle begins at „Wznów”.

Where the map run ends in the game minute of a discovery the scene shows the effect of the end alone, and a moment has just begun where the events of the simulation call that returned the state carry it (D-04), so a scene drawn again on the same moment, after a return to the screen, a reload or a load, shows the last image of the effect at once (D-317, D-319). A scene under the system's setting for reduced motion shows the last image at once too (D-317).

- **Scope:** browser-view

### D-364 — How does the mage show a gathering?

While the mage gathers, with „Zbierz” or „Obchód”, fibre included, it bends in a loop through the whole action, from the moment it stands at the place of the action to its end, at the fixed beat of the scene's frames. Bending is a continuing occupation of the character, no effect of an ordinary event, so the limit of D-317 does not bind it. It faces the prop of what it gathers, as the game's data gives its side, and where the resource has no prop it bends as it stands.

- **Scope:** browser-view

### D-365 — What flies when something is gathered?

When a gathering ends with a piece more in the backpack, the icon of the gathered resource, the one the game's data gives it and the drawing of the map shows, flies in an arc from the prop of the resource to the mage on a small plaque on a solid `panel` background, and vanishes at the mage. A resource with no prop sends it from under the mage's feet, and „Obchód” sends one icon for its whole result.

- **Scope:** browser-view

### D-366 — Where does the dust of a miss stand?

When „Zbierz” ends with no piece more in the backpack, a cloud of dust stands at the prop of the resource, and where the resource has no prop, under the mage's feet.

- **Scope:** browser-view

### D-367 — Which readings of the game show an effect of the end of a gathering?

The scene shows an effect of the end of a gathering, D-365 or D-366, only in a reading of a map run that goes on, drawn from a previous reading of the same map run, in which exactly one gathering ended and no action that takes pieces out of the backpack ended, and which a map run started does not accompany; it places the effect at the place the mage stands or walks to at the previous reading. Any other reading starts none, so that an effect overdue when its turn comes, one at a stop or in a reading that carries several ends, is dropped; an effect already running finishes, standing still while the scene does, unless the map run is left, the scene is hidden — by leaving the screen of the run or by the end-of-run window that stands in its place (D-370) — or a new map run starts, and an effect of a gathering that comes while another still runs takes its place, while the effects of the wolf (D-316), which belong to another part of the scene, are neither taken by it nor take it.

- **Scope:** browser-view

### D-372 — What does the frost on the edges of the scene's frame show?

The scene shows frost on the edges of its frame, never over its whole area (D-317), that follows the temperature of the character's body: none at 37 °C, growing in thickness as the body cools to 35 °C, at 36 °C half of its full thickness, 16 pixels of the scene at its deepest while the character is chilled, whatever the size of the scene on the screen, and taken back as the character warms at a fire. Its inner edge is ragged, so its thickness is the depth of its deepest teeth, and at the first pixel of thickness it is the outline alone, the fill coming with the next pixels. The frost lies over the layer of the tint (D-315).

- **Scope:** browser-view · simulation

### D-415 — Who judges the colour of an effect against the prop it stands at, and whether another element of the scene covers it?

The human judges, at the request that brings an effect of the scene, whether its colour stands out from the prop it stands at and whether another element of the scene covers it, from the numbers and the picture the change shows, and no threshold decides either. A threshold binds only where a decision gives it, as D-271 gives the outline or the fill of the frost 3:1 against the snow.

- **Scope:** browser-view

## Listed by heading alone

- D-03 — How is the browser view built?
- D-06 — How are the browser and server built together?
- D-07 — How is the work of the game split between the server and the browser?
- D-18 — Where does the game's content live?
- D-263 — Which tool bundles the browser's code?
- D-266 — Where does the output of the browser's compilation stand?
- D-28 — Which coding-guideline discipline does loop2 adopt?
- D-29 — Which rules check TypeScript and JavaScript?
- D-30 — Which Python rules block a change?
- D-31 — Which Bash rules block a change?
- D-32 — How is web code formatted?
- D-36 — Which file is the exemplar for browser modules?
- D-117 — Which file is the exemplar for a browser API client?
- D-213 — Which file is the exemplar for saved-game code?
- D-351 — How does loop2 keep the imports of its parts within the dependencies its part map allows?
- D-362 — How does loop2 point to places outside the repository that its readers cannot reach?
- D-425 — How large may a function and a file of the code be?
- D-433 — How is Python formatted?
- D-434 — How are the Bash scripts formatted?
- D-73 — Which testing discipline does loop2 adopt?
- D-74 — When are tests on generated inputs considered?
- D-75 — When are complete player journeys tested in a real browser?
- D-76 — When do fonts and the preview server gain refusal tests?
- D-77 — How are tests selected and limited as a whole?
- D-78 — How is one test case shaped?
- D-79 — How is the npm registry response contract checked?
- D-81 — At which levels do loop2 tests stand?
- D-82 — Which product documents supply test expectations?
- D-83 — Where are tests written and how do they enter the gate?
- D-84 — Which real mechanisms do new or changed tests exercise?
- D-85 — Which cases are the exemplars of the test levels?
- D-87 — When are whole-screen pixel comparisons used?
- D-88 — How are real browser events, focus and SVG checked?
- D-89 — Who revisits a deliberate testing exclusion?
- D-432 — Where does the knowledge of a test that fails at random with no cause found stand?
- D-94 — Where does loop2 use a mutation testing tool?
- D-264 — What does a test of a screen built with React run on?
- D-268 — What keeps a test on a document imitation from taking the machine's memory?
- D-417 — How does an agent operate the game as a player does?
- D-252 — How does loop2 write its failures to its logs, and what does it log?
- D-253 — Which processes of loop2 have a last-resort handler of their own?
- D-347 — How does an agent learn what went wrong in the game running in the browser?
- D-356 — How does the operator learn that the running game failed?
- D-101 — How long do independent browser sessions last?
- D-102 — How are account attempts limited?
- D-104 — Which request origin and body may change account state?
- D-108 — What public address do the game and account server share?
- D-109 — What identity authorizes an account request?
- D-138 — How is a player's login kept between requests?
- D-139 — What does the login of a blocked account tell the player?
- D-160 — What does an emailed link of a blocked account do?
- D-202 — Who can create and use a player account?
- D-410 — What is the role of an account, who gives it and where does the server read it?
- D-96 — What does a player see before and after signing in?
- D-97 — What does the player's logout do?
- D-98 — Which player passwords are accepted?
- D-99 — How are player email addresses compared and checked?
- D-100 — What do duplicate registration and failed login tell the player?
- D-259 — Which state does the login card open on, and what stands above its fields in each state?
- D-260 — What does the switch of the login card do to what the visitor typed?
- D-261 — Where does the page's one sentence stand on the login card?
- D-262 — What stands on the screen of the login card, and where do the waiting screens stand?
- D-278 — Where does the login card stand in the height of the window?
- D-381 — How does the page open, focus and close the login card, and what does the card do while a form waits?
- D-152 — How does a player sign in and reset a forgotten password?
- D-156 — How does an emailed link confirm a player's email address?
- D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message?
- D-159 — Can an account's email address change?
- D-222 — What does a request for a password-reset link answer?
- D-224 — What form does a password-reset link take?
- D-225 — What does the form „Ustaw nowe hasło” hold, and how does it end?
- D-352 — What does a page whose game is open do when the fragment of an emailed link appears in its address?
- D-203 — What happens to unsaved progress when a session expires?
- D-204 — How does the browser exchange saved game states with the server?
- D-206 — What happens to a saved game state of another version?
- D-207 — When does the game save the game state on the server?
- D-208 — What does the player see of saving the game state?
- D-209 — Which browser's save of the game state does the server accept?
- D-210 — What does the server do with a save of the game state whose version differs from the one it holds?
- D-211 — What does the player see when a save of the game state finds no session?
- D-212 — How does a manual map run come back from a loaded saved game state?
- D-400 — What is the previous-save privilege and who gives it?
- D-401 — How does an account with the privilege pull the programs of its previous save?
- D-402 — How does an account with the privilege start the game from zero?
- D-21 — How does time pass in a map run the player starts?
- D-55 — How many manual map runs go on at a time?
- D-129 — How long does the pace the player picks stay?
- D-130 — Where does the player pick the pace, and with which control?
- D-131 — Which changes of the program a map run carries out reset its solving progress?
- D-132 — What does the screen show, and what can the player do, after a completion?
- D-134 — Where does the player see that a map is solved?
- D-135 — Does the game show the longest streak of a map run?
- D-149 — When does the game offer a map opened by another map?
- D-215 — Where does the player read that a manual run of a solved map pays no practice?
- D-64 — What does the backpack's cap count, and what sets its height?
- D-70 — How does the browser view show a campfire?
- D-373 — How does the flame of the campfire show how long the fire has left?
- D-444 — How do the game's data tell an item from a resource?
- D-141 — When do combat turns take effect?
- D-143 — What does the first wolf attack reveal?
- D-147 — What record of an encounter does the player read?
- D-148 — Where is an attacking creature pictured today?
- D-151 — Whose health do combat conditions compare?
- D-118 — When does the player learn what the world holds?
- D-119 — Whose is the knowledge of the world, and what may a character use of it?
- D-122 — What does a map run do, and what does the player see, when something is discovered?
- D-124 — What does „+ reguła” do?
- D-312 — How does the band of a discovery name the program rule the game wrote?
- D-313 — What does „Dodaj regułę z tym” do?
- D-23 — How does a character act by its program?
- D-26 — How does a program point at things of the world?
- D-90 — Where do the program rules of a program belong?
- D-91 — What program does a new game start with?
- D-92 — What counts as one firing of a program rule?
- D-93 — What does a program rule show the player?
- D-376 — What numbers does a condition on the body, the backpack, the campfire and the tile accept?
- D-380 — Which words name each refusal of an action?
- D-443 — How does an action name what it acts on?
- D-164 — Who owns a program?
- D-165 — How does the game state tell one program from another?
- D-166 — Where does the player see the player's programs and pick the one to edit?
- D-167 — What can the player do with the list of programs?
- D-168 — What becomes of a map run whose copy's program the player deletes?
- D-169 — How is a program named?
- D-170 — Where does the player pick the program a character enters a map with, and which one stands there first?
- D-171 — How does the program panel show the copy and its unsaved changes?
- D-172 — How does the game announce a save of the copy over a program that changed?
- D-173 — What can the player do with the copy after a map run ends?
- D-174 — How does the player switch the character to another program during a map run?
- D-384 — Which program does the program panel show when the one it showed is gone?
- D-50 — Whose is the chest?
- D-179 — How do items go into a map run and out of it?
- D-180 — Where does the player arrange the trip plan?
- D-181 — Which entries does a trip list accept?
- D-182 — What trip plan does a new program hold?
- D-184 — How does the headquarters show the chest's capacity?
- D-185 — Where does the player read what completion deposited?
- D-186 — What does the running map show of the frozen bring plan?
- D-188 — Where does the player learn that a map cuts the trip plan?
- D-307 — What does the line of an empty trip plan say?
- D-239 — How fast does the earning loop go?
- D-240 — When and how is the time away computed?
- D-242 — Which clock drives an earning loop?
- D-243 — How does the player start an earning loop?
- D-244 — What does the player see of an earning loop?
- D-245 — What does „Zatrzymaj” do?
- D-246 — What does the player read after being away?
- D-247 — When is time away computed, and how much?
- D-248 — What is the save time?
- D-250 — What does a pause or an end screen hold?
- D-409 — Where does an act of the player that depends on time catch up the time?
- D-288 — How does the player write a program rule?
- D-292 — How does the program editor number rule groups and program rules?
- D-293 — What time of an action does the program editor show?
- D-294 — Where does the program editor keep which rule groups are folded?
- D-295 — What does a folded rule group show, and where does a rule dropped on it land?
- D-296 — Where does the player change and delete a rule group?
- D-297 — Where does an arrow move a program rule at the edge of its rule group?
- D-298 — How does the player fold and unfold every rule group at once?
- D-300 — Does a condition show its current value in the program editor?
- D-301 — What does an empty rule group say?
- D-303 — Does deleting a program rule or a rule group ask first?
- D-304 — Where does the player add a rule group?
- D-305 — Does the program editor mark a program rule that does not fire?
- D-423 — Which item does the condition „Zapas poniżej” start with in the program editor?
- D-289 — What does the rule panel show greyed, and with which reason?
- D-290 — How does the pick of the rule panel group its cells?
- D-291 — Which icon stands for an action?
- D-299 — Does the pick of the rule panel hold a search or a row of recent picks?
- D-302 — What does the rule panel of the copy say of the streak?
- D-306 — How does the rule panel take the player through a rule?
- D-308 — What state does a program rule show during a map run?
- D-309 — What do the signs of a program rule show in the minutes of an attack?
- D-310 — How does a program rule that cannot start name its reason?
- D-350 — Where does the rule panel stand while the rule group of its rule is folded?
- D-363 — Where does the player read what an action costs?
- D-53 — Where does the player send a character from, and where do the buttons that end a map run lead?
- D-325 — What does the screen Mapy show?
- D-326 — What does the game say before an earning loop that earns nothing?
- D-327 — What does the card of a map hold?
- D-328 — Does the card of a map show what the player has not discovered?
- D-329 — What stands at each character in the section „Kto idzie”, and in what order?
- D-330 — What is the first of the three clicks from Siedziba to the first map run?
- D-331 — What does the screen Mapy show before a map is picked, and how does a row of the list look?
- D-332 — What does {map} name in `#/mapy/{map}`?
- D-333 — How are the numbers of the card of a map counted, and where?
- D-389 — What does the picture band at the top of Siedziba show, and how does it stand and move?
- D-338 — What does the chronicle of a map run hold?
- D-339 — Where does the chronicle of a map run live, and what of it stands after a load?
- D-340 — Which actions of the character give an entry of the chronicle, and how does it read?
- D-341 — When does a loss of the streak give an entry of the chronicle, and how does it read?
- D-342 — Which changes of the program give an entry of the chronicle, and how does it read?
- D-343 — How does the chronicle stand in the area with the tabs, and how does the player filter it?
- D-344 — What does the kind „Świat” of the chronicle hold, and how do its entries read?
- D-345 — What does the entry of a discovery say in the chronicle?
- D-348 — From what does the chronicle learn what happened in a game minute and what the player changed in the copy?
- D-382 — How does the list of the chronicle draw a chronicle that grows through a long map run?
- D-383 — How long does the pick of a filter of the chronicle hold on the screen of a map run?
- D-439 — How does the game judge a program before an earning loop?
- D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?
- D-441 — Where does the game keep the last judging of each character, program and map?
