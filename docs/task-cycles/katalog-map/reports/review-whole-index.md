# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 103. Listed by heading alone: 286.

## Listed in full

### D-18 — Where does the game's content live?

The game's content — game maps, items, creatures, character skills and their numbers — stands in data files. A game map, an item or a creature of a kind the simulation already handles is added by a change of data alone.

- **Scope:** simulation, browser-view

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

A frame or a bar drawn at a text to set it apart — the frame of a form's main button (D-274), the bar of the answer to a request for a password-reset link (D-44), the frame of a field in the colour of its message — takes the colour of that text and is part of it, so the text's role keeps the meaning D-39 and D-40 give it. A line that marks the one chosen in its group stays in `selected`.

- **Scope:** browser-view

### D-396 — In which browsers and from which window size does the game have to work?

The game works in the current releases of Chrome, Edge and Firefox on a computer and of Chrome on a phone with Android; Safari, on a computer or on a phone, is outside that set. A window whose page area — the area of the page inside the browser's window, not the resolution of the screen — is 1280 px wide or wider shows the computer layout, whose smallest window has a page area of 1280 × 720 px; a narrower window, of a phone or of a computer, shows the phone layout, made for a phone held upright with a page area 360 px wide.

In the phone layout every screen fits the width of the window with no scroll to the side and no text over the border of its frame, and everything the game offers is done by touch. Nothing in the phone layout scrolls to the side, in a frame either.

Every control of the phone layout — a button, a cell of a pick, an arrow, an item of a menu — has a touch target at least 48 px high and 48 px wide, a value taken from Android's accessibility guidance. A link inside a running sentence keeps the size of its text; a link that stands by itself as a control holds the minimum.

A fault of the phone layout is fixed where a window of its width that is taller than it is wide shows it; a fault in a window narrower than 360 px, or one seen only in a window wider than it is tall, such as a phone turned sideways, is not fixed, and a fault of the computer layout in a window lower than 720 px is not fixed where no decision defines how the game looks there.

- **Scope:** browser-view, agent-workflow

### D-21 — How does time pass in a map run the player starts?

A map run the player starts passes at one game minute per real second times the pace the player picks of 1×, 2×, 4×, 8× and 16×, and the player can pause and resume it. Picking a pace while the map run is paused, the pause at a discovery included, changes the pace and leaves the map run paused until „Wznów”.

- **Scope:** simulation, browser-view

### D-22 — Where does the simulation's randomness come from?

Every random draw of the simulation comes from generators seeded by the seed saved in the map run's state, one generator for each kind of draw — attacks, gathering, the map's layout and wandering among them — and the map run draws its map's layout at its start, before the first game minute, in a fixed order. A restart of a map run keeps its seed, any other map run outside an earning loop takes a new seed, and each map run of an earning loop takes its seed from a draw of the map run before it. The first map run of an earning loop, with none before it, takes a new seed, as a send of a character does.

A judging of a program (D-439) runs on the twelve fixed seeds of a judging, the same on every map and at each judging, and takes no new seed, each of its twelve runs drawing from its own seed as a map run does.

- **Scope:** simulation

### D-24 — What is a game map made of?

A map is a grid of hexagonal tiles whose dimensions, entrance — fixed, or drawn by the map run —, cost of a move, attacking creatures with how often they attack, and resources stand in the map's data, each resource with its density, stock per tile and time to renew one piece, no time meaning a resource that does not renew. What is not on the map's list of resources cannot be gathered or revealed there. Which tile gets what is drawn by the map run from its seed, within the bounds the map sets.

The region a map belongs to stands in the map's data, and the catalog of the screen Mapy groups the maps by it (D-325).

- **Scope:** simulation

### D-55 — How many manual map runs go on at a time?

The game holds one manual map run at a time: while one character is in a manual map run, the game sends no other on a manual map run.

- **Scope:** simulation, browser-view

### D-71 — In what order does a game minute of a map run take effect?

Outside combat a game minute takes effect in this order: the character's body cools by the map's ambient temperature and warms by what burns on its tile, satiety falls, the nature energy of a well-fed mage comes back, up to its cap, health changes for cold and hunger or recovers, and the streak follows D-136; health at zero ends the map run in death at that point, otherwise burning loses a minute, tiles renew, the ending action takes effect, completion is checked, and a continuing run tries an eligible attack before the ordinary program pick, with an attack replacing that pick and interrupting any action still running. In each game minute of combat the body and the nature energy stand still, the streak grows, burning loses a minute and tiles renew, then in the last combat minute all combat turns resolve, their result and cooldown are recorded, a creature defeated in those turns adds a beaten attack and death ends the run before completion is checked; completion is checked in the earlier combat minutes too and ends the encounter with its attack description and no turns or outcome, while a continuing run after the final combat minute picks its next ordinary action in that same minute. Discoveries of a manual map run enter the Understanding where their cause occurs — body, ending action or attack — and the following effects and picks read that updated Understanding and program, a rule written by a discovery included, with discoveries collected once for the whole minute and the pause taken after that minute has finished.

- **Scope:** simulation

### D-129 — How long does the pace the player picks stay?

The pace the player picks stays until the player picks another, through a pause, the pause at a discovery included, „Restart”, „Zakończ” and the next send of a character, and a new game starts at 1×.

- **Scope:** simulation, browser-view

### D-130 — Where does the player pick the pace, and with which control?

The player picks the pace with five buttons „1×”, „2×”, „4×”, „8×” and „16×” beside „Pauza” in the header of the screen of a map run, and the button of the pace in force is a button selected in its group.

- **Scope:** browser-view

### D-131 — Which changes of the program a map run carries out reset its solving progress?

Of the edits of the copy a map run carries out, an edit after which the copy's rules or rule groups differ from those before it, the discard of the copy's unsaved changes included, sets the streak and the number of beaten attacks of the map run in progress to zero — adding, deleting or reordering a program rule, changing its condition or action, and changing a rule group — also while the map run is paused; an act of the program editor after which the copy is the same as before it, an edit or discard changing the trip plan alone, a save of the copy and an edit of a saved program leave the streak as it stands, together with the number of beaten attacks. Every switch of the character to another program sets the streak and the number of beaten attacks of the map run to zero, also where that program holds the same rules. A map run starts with zero beaten attacks, and a game minute with health lost to cold or hunger leaves their count as it stands.

- **Scope:** simulation, browser-view

### D-132 — What does the screen show, and what can the player do, after a completion?

After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run, and „Teraz” reads the map's completion text, in Las „Las rozwiązany” and in Las — głębiej „Las — głębiej rozwiązany”, in the role `positive`, the clock in the header standing at that game minute, such as „Minuta 480”, and the end-of-run window (D-368) opens of itself over the screen, its header included and the menu bar not, under the same completion text as its title, in the role `positive`, and the light of the scene stands in full gold (D-315), under the window while it stands and in sight again when „✕” uncovers the screen. „Pauza” and the pace buttons are gone, and the player has „Restart” and „Zakończ” as after a character's death, and, after a completion of a map that opens another, „Otwarte: {mapa} →” in the window, the way to the map it opened (D-53, D-173).

- **Scope:** browser-view, simulation

### D-133 — Where does the player see a map run's streak and a map's solving condition?

During a map run the header shows a bar with numbers for the requirements present in the map's solving condition: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present. A requirement that is met shows its name, its numbers and the fill of its bar in the role `positive`, and the bar stands on the screen after the end of the map run too, on the state of its stopped game minute and with the streak as it stands then, such as „Passa 0/480” after a death of cold. The card of each open map shows the sentence of its solving condition from the map's data, as „Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”.

- **Scope:** browser-view, simulation

### D-134 — Where does the player see that a map is solved?

From the first completion of a map by any of the player's characters, the list and the card on the screen Mapy show that map as „rozwiązana”: the card by that word in the role `positive`, the row of the list by its state circle filled (D-331).

- **Scope:** browser-view, simulation

### D-135 — Does the game show the longest streak of a map run?

A manual map run keeps the longest streak it reached, and the end-of-run window (D-368) shows it against the map's condition, as „najdłuższa passa {longest}/{required}” with its bar in the form of the bar of the solving condition in the header (D-133).

- **Scope:** simulation, browser-view

### D-136 — How is a map solved, and what opens the next one?

The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, alone or together — and a map opens when the map its data names as its opener is solved. A streak counts the successive game minutes in which the character loses no health to cold or hunger: a game minute with such a loss sets it to zero, wounds taken in combat do not, and every change, in a map run that has not ended, of the program rules or rule groups the map run carries out, and every switch of the character to another program during that map run, sets it to zero, on every map, while a change of the trip plan alone leaves it.

- **Scope:** simulation

### D-149 — When does the game offer a map opened by another map?

A map whose opening map is still unsolved is absent from the screen Mapy, and from the opening map’s first completion it stands there with its card for every character. Before that the catalog shows no name and no row of the map: an empty place with no name stands for it in the view „Postęp”, and it counts in the counter of its region (D-325). The same availability determined from the game’s solved maps governs sending in the simulation, and a map that requires an unsolved opening map refuses a send.

- **Scope:** simulation · browser-view

### D-214 — When is a map run a manual run of a solved map?

A manual map run is a manual run of a solved map by the state of its map when that map run starts, and it stays one to its end, on the screen after its end and after a load. A map run restart after the completion that solved the map is such a run: it takes its equipment from the chest and pays no practice.

- **Scope:** simulation

### D-215 — Where does the player read that a manual run of a solved map pays no practice?

On the screen of a manual run of a solved map, from game minute zero until „Restart” or „Zakończ”, below the body row and the backpack and above the line of the practice of the run (D-201), the line „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.” stands in `text-secondary`.

- **Scope:** browser-view

### D-388 — What numbers do the maps Las and Las — głębiej have?

Las is a grid of 4 × 4 tiles with its entrance fixed at column 1, row 1, an ambient temperature of 25 °C and 5 game minutes to enter a tile, and it is solved by a streak of 480 game minutes (D-136); Las — głębiej is a grid of 5 × 5 tiles with its entrance drawn by the map run (D-24), an ambient temperature of 7 °C, 5 game minutes to enter a tile and the resources of Las, a wolf that attacks as D-142 gives, and it opens when Las is solved and is solved by a streak of 540 game minutes together with two beaten attacks. The resources of both maps, each with its density, its stock per tile and the game minutes to renew one piece, are: sticks 0.7, 12 and 30; berries 0.5, 8 and 40; moss 0.4, 6 and 60; fiber 0.4, 6 and 60. These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect.

- **Scope:** simulation

### D-397 — Which map does a new game open on?

A new game opens the map Skraj lasu, and solving it opens Las.

- **Scope:** simulation

### D-398 — What numbers does the map Skraj lasu have?

Skraj lasu is a grid of 4 × 4 tiles with its entrance fixed at column 1, row 1, an ambient temperature of 25 °C and 5 game minutes to enter a tile, with no attacking creature and no cap on what is carried in or out, and it is solved by a streak of 480 game minutes (D-136). Its resources are sticks, with density 1, a stock of 12 per tile and one piece renewed in 30 game minutes, and berries, with density 1, a stock of 8 per tile and one piece renewed in 40 game minutes, and it has no moss and no fiber. These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect.

- **Scope:** simulation

### D-404 — What does the first pass of a new account on Skraj lasu have to reach?

With the program of 21 rules in 5 groups that its test names, from the entrance of a game of an account with nothing discovered, the map Skraj lasu is solved on at least 289 of the 300 seeds that the test names; the figure is the measurement the human accepted on 2026-11-14 and is to be revised when the balance is worked on.

- **Scope:** simulation

### D-438 — May the progression require the player's absence?

The progression never requires the player's absence: time away gives progress and additional things, and each next map can be solved with what the maps before it gave — practice, items, a better program — with no wait for an earning loop to gather more.

Las — matecznik is excepted from that rule until the change that sets its numbers, its entry cap included, so that it can be solved with what the maps before it gave, and that change removes this paragraph. Until then it is allowed to stand in the game, open to entry and to a judging, though no program can solve it.

In one map check of the balance instrument a map can be solved where its best reference program, played with the character built from what the maps before it gave, solves at least one of the seeds 1 to 500, and Las — matecznik passes the check of its exception where no reference program solves one seed of it.

- **Scope:** simulation

### D-448 — How may a map differ from the map that opens it?

A map may differ from the map that opens it by its numbers alone, and it gives the next stage of the progression. Only a wall asks for something new that improves the result; a map may also bring a new rule into its solving condition, which every player meets — combat, or a number of pieces of an item in the backpack — and such a map is neither a wall nor a map that differs by its numbers alone.

A map is harder than the map that opens it: in one map check of the balance instrument, the best reference program solves a smaller share of its map runs than of those of the map that opens it. A wall never refuses to be entered or solved for the lack of the thing it asks for.

- **Scope:** simulation · balance-tools

### D-449 — Which numbers of a map are requirements of the game?

A number of a map is a requirement of the game only where a decision or an invariant of the foundation names it, for that map or for every map, the order of maps that the decision on how a map may differ from the map that opens it gives and the solving that D-438 gives included. Beyond those, the share of a map's runs that is solved, with the thing a wall asks for or without it, and what its earning loop takes from the chest and puts into it are no requirement of the game.

- **Scope:** simulation · balance-tools

### D-147 — What record of an encounter does the player read?

From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph in `text` as an entry of the chronicle in the game minute of the attack, which adds the turns while the encounter lasts: before the turns it gives the creature's starting health and program formatted from its action pairs, and after them it gives each action and its outcome in order, followed by the encounter's result. The paragraph stands through „Wznów”, editing, a load of the saved game state and the frozen death or completion screen until another attack replaces it as the last one or „Restart” or „Zakończ” removes its map run; a completion before the turns keeps the attack description and leaves the outcome absent. At the end of the map run the same paragraph stands in the end-of-run window (D-368), in a section of its own outside „Ostatnie minuty”, and after a load of the saved game state too.

„Teraz” reads „Walczy z wilkiem” throughout the combat minutes, including the resolution minute even if the next ordinary action starts there, while death or completion takes precedence and combat death reads „Mag zginął w walce”.

- **Scope:** simulation · browser-view

### D-148 — Where is an attacking creature pictured today?

An attacking creature appears in the encounter's text and in the scene, and the terrain drawing has no picture of it.

- **Scope:** browser-view

### D-187 — How does a map cap equipment and loot?

A map's data can set two independent whole-piece caps from zero up, one for entry and one for exit, each optionally unset. The entry cap clips the trip plan when the character enters and the exit cap at completion; gathering during the run is bounded by the character's carrying capacity, which the map cap leaves unchanged.

- **Scope:** simulation

### D-239 — How fast does the earning loop go?

An earning loop goes only on a solved map, one game minute per real minute, and the speed control does not reach it, while a manual map run may be fast-forwarded. Each map run of an earning loop is a map run of its own, followed at once by the next as long as the earning loop goes on. Solving a map unlocks its earning loop without certifying that the chosen program survives every seed.

- **Scope:** simulation · browser-view

### D-243 — How does the player start an earning loop?

The player starts an earning loop with „Puść w pętlę”, which stands at each character in the section „Kto idzie” of the card of each solved map, beside „Wejdź”, and takes the program of that character's list „Program:”, which its click first judges anew (D-439). For that list the start counts as a send: the program becomes the one the character used last and the one with which a character last entered a map, and the pick clears. At a character in an earning loop „Wejdź” and „Puść w pętlę” are inactive, and the player stops the earning loop first.

The judging of „Puść w pętlę” takes what the earning loop would take from the chest at that moment, and the earning loop starts at once where it solves all twelve seeds, or where it gives each seed the same line as the result of the button of a judging (D-329) that stands under the character. Otherwise the new result stands under the character in place of the one that stood there, „Na {k} z 12 ziaren program mapy nie rozwiązuje.” stands above the button in `warning`, the button reads „Puść mimo to”, and a second click starts the earning loop.

- **Scope:** browser-view · simulation

### D-53 — Where does the player send a character from, and where do the buttons that end a map run lead?

The player sends a character to a game map from the card of the map on the screen Mapy, and „Zakończ” returns to the screen Postać of that character. „Otwarte: {mapa} →” of the end-of-run window (D-368), which stands after a completion of a map that opens another, leads to the screen Mapy with the card of the map it opened.

- **Scope:** browser-view

### D-325 — What does the screen Mapy show?

The screen Mapy holds on the left the catalog of the game's maps, and on the right a card of the picked map with what it asks, its terrain, what lies there, what lurks there and what it takes, and a section „Kto idzie” with the characters, their program, what enters from the trip plan, „Wejdź”, „Puść w pętlę” and the judging of their program (D-439), the card standing under the catalog in the phone layout (D-282, D-396).

The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data, those not yet opened included, and offers a search that finds the open maps by a fragment of the name of the map or of a resource, and three views of one list, „Dokąd”, „Co daje” and „Postęp”, in the last of which a map not yet opened stands as an empty place with no name. A map whose data name a creature for the record shows the number of D-440 in its row.

- **Scope:** browser-view

### D-326 — What does the game say before an earning loop that earns nothing?

Where the bring list of the program picked is empty, „Pętla nic nie zarobi do skrzynki” stands in `warning` beside „Puść w pętlę”, and the button still acts.

- **Scope:** browser-view

### D-327 — What does the card of a map hold?

The card of a map follows the card of the predecessor game, loop, with its numbers taken from the map's data, and a part the map lacks stands nowhere: the heading names the map and, once it is solved, „rozwiązana” in `positive`, and for a map that another map opens „odsłania ją {mapa}” in `text-secondary`; „Żąda” holds the sentence of the map's solving condition (D-133); „Teren” holds the grid, the entry, the step, with „— drożej niż zwykle” or „— taniej niż zwykle” beside a step other than the usual one (D-333), and the minutes without fire (D-333) with the temperature of the surroundings; „Leży tu” holds each resource with its icon, the approximate number of tiles that hold it, its stock and its renewal, or „nie odnawia się” in `warning`; „Czyha” holds the creature with its icon, its health and blow, the chance of an attack in a minute, the quiet time and one total number, the mean gap between attacks counted with that quiet time; „Odbiera” holds the entry cap and the exit cap, each in `warning`. It departs from the card of the predecessor game in five things only: the line of an attack gives that one total number in place of the quiet time and the mean gap after it, an unsolved map shows no „otwarta”, „Odbiera” has no „gasi: {umiejętność}”, „Żąda” is the one sentence of the condition from the data, and „Czyha” of a map whose data name a creature for the record holds at that creature the number of D-440.

- **Scope:** browser-view · simulation

### D-328 — Does the card of a map show what the player has not discovered?

The card of a map shows all that the map's data holds, whatever the player has discovered, and the Understanding does not change by it: the program editor still offers no action or condition that the player has not discovered.

- **Scope:** browser-view

### D-329 — What stands at each character in the section „Kto idzie”, and in what order?

At each character in the section „Kto idzie” stand, from the top, the name as a link to the screen Postać, the line of the resurrection and, at a character in an earning loop, the line of the earning loop, „Program:” with its list and, beside it, the judging remembered for the program it shows (D-440), „Wejdzie: …” in `text-secondary` always, „Wejdzie: nic” included, the warning of a clipped plan, „Wejdź” and „Puść w pętlę” with the warning of an empty list „Wynieś” beside „Puść w pętlę” (D-326) and the warning of seeds left unsolved above it (D-243), with the button of a judging beside them, and under them the result of a judging while it stands, the characters standing in the order of D-54. „Wejdź” opens the screen of the map run and „Puść w pętlę” leaves the player on the card. A team with no character has in the section the sentence „Drużyna nie ma jeszcze postaci. Załóż ją w Siedzibie.”

The button of a judging, „Oceń na 12 ziarnach”, judges the program of the character's list „Program:” on the map of the card (D-439) and reads „Oceniam…” while the judging counts. Its result unfolds under the character as „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”, twelve lines „Ziarno {i}: …” and „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”, and stands until the player picks another program on that list, judges again or leaves the card.

- **Scope:** browser-view

### D-330 — What is the first of the three clicks from Siedziba to the first map run?

The first of the three clicks from Siedziba to a first map run (D-280) is the item „Mapy” of the menu bar, and the row of the map and „Wejdź” follow it; no button at a character in Siedziba leads to the screen Mapy.

- **Scope:** browser-view

### D-331 — What does the screen Mapy show before a map is picked, and how does a row of the list look?

Under `#/mapy`, before the player picks a map, „Wybierz mapę z listy.” stands on the right, under the list in the phone layout (D-282, D-396), in `text-secondary`. A row of the list is a link to `#/mapy/{map}` with the name of the map, the state circle of the map at its left, filled at a solved map and empty at an open one, and the short demand of the map, and the picked row looks as the picked program on the list of programs does: its text in `text-strong` and a bar in `selected` at its left.

- **Scope:** browser-view

### D-332 — What does {map} name in `#/mapy/{map}`?

In `#/mapy/{map}`, {map} is the identifier of the map in the game's data as it stands, such as `#/mapy/forestDeep`, and the address is built from the map's data.

- **Scope:** browser-view

### D-333 — How are the numbers of the card of a map counted, and where?

The numbers of the card of a map that follow a rule of the game are computed by functions of the simulation, from the map's data and beside the rules they follow, and the view only writes them out. The minutes without fire are the game minutes that a body, from its starting temperature and with no warmth, goes through on that map before the game minute in which it is first chilled, and the item stands only where the map cools the body below the threshold of chill; the tiles that hold a resource are its density times the tiles of the grid, rounded to the nearest whole; the mean gap between attacks is the cooldown of the attack plus the reciprocal of its chance in a game minute, rounded to a whole minute (D-142). The usual step is the step most maps' data give, the first of the data's order on a tie.

- **Scope:** simulation · browser-view

### D-389 — What does the picture band at the top of Siedziba show, and how does it stand and move?

The picture band at the top of Siedziba stands across the content, about 96 px high, under the row of warnings below the menu bar and over the heading „Siedziba”, drawn at twice the pixels of its picture: a snow clearing in full light and with no tint, composed of the pictures of the pack Pixel Crawler from which the forest of the scene is composed, with a burning campfire in the middle, the chest and the characters at the camp, and in the phone layout it is cropped at the sides around the campfire where the window is narrower than the picture, and never scaled down. The characters that stand in it are those at the camp, a character being at the camp where it is neither in a manual map run, going, paused or ended and waiting for „Restart” or „Zakończ”, nor in an earning loop: the first of them in the order of creation that the band holds at the width of the window, the rest standing in the picture nowhere while the section „Drużyna” lists them all, and a picture band with none at the camp shows the fire and the chest alone. The picture band moves as the scene does, the fire in the frames of its flame and each character in the frames of its idle sheet, at the scene's fixed beat with no loop of drawing, and stands still under the system's setting for reduced motion; its campfire burns always and is no campfire of the game state; and it is a picture, not a control, taking no click and no key, hidden from readers of the screen, with no text on it or over it.

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

### D-427 — Where do the reference programs stand?

The reference programs, the programs that the tests of the simulation and the balance instrument run to see how a map is solved, stand in one file of the tests of the simulation, `tests/sim/reference-programs.mjs`, and both read them from it. The balance instrument is the tool of the part `balance-tools` that runs the game's built simulation outside the browser; no test of the simulation and no file of the instrument holds a copy of a reference program of its own.

- **Scope:** simulation, balance-tools

### D-428 — What does the map check of the balance instrument print?

For each game map an overlay adds and each reference program, the map check of the balance instrument prints the share of map runs solved on the seeds 1 to 500, the median game minutes of the solved map runs, the failures by cause and the balance of the earning loop, which is what a map run takes from the chest, what it puts into it and how often the character dies. The table holds no condition, action or rule of any program. It names each program by a label, `P1`, `P2` and so on, the program's place in the whole list of reference programs that the command `programs` prints, and never by the program's identifier, which can state the rules of its program in other words.

The earning loop of the map check and the command of the loop start with the full number of uses of the resurrection, the switch `--no-resurrection` starts the loop with every use spent and the clock of the returns started at the start of the loop, after which the uses return as in the game, and the player of a campaign who waits for the resurrection before trying the next map tries when at least one use is left.

- **Scope:** balance-tools

### D-429 — Do the results of the balance instrument's measurements enter the repository?

The results of the measurements of the balance instrument do not enter the repository. The instrument prints each result, or writes it to the file that a flag of its command names, and writes no file into the repository of its own accord.

- **Scope:** balance-tools

### D-439 — How does the game judge a program before an earning loop?

The game runs a program on twelve fixed seeds of a map, the same seeds each time, and shows the result seed by seed: solved, a death with its cause and game minute, or undecided where the program has neither solved the map nor died within a cap of game minutes set in the game's data, 4000 to start. Such a judging is no map run of the character: it takes nothing from the chest, pays nothing and settles no death.

A program can be judged on every map open to the player, a map not yet solved included, and for a character in an earning loop or in a manual map run, and the judging changes nothing of either. The character enters each of the twelve runs with the take list of the program cut by what lies in the chest, by the character's carrying capacity and by the map's entry cap, all twelve starting with the same equipment, and nothing leaves the chest. A judging discovers nothing: it runs with what the player has discovered, writes nothing into the Understanding and adds no rule to the program.

- **Scope:** simulation · browser-view

### D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?

The game remembers the last judging of each character, program and map in the browser that made it, as D-441 gives: the twelve results of its seeds — solved, a death or undecided — and the equipment it took from what the chest held, while the cause and the game minute of a line stand only in the result shown after the judging (D-329). A judging, the one „Puść w pętlę” runs included (D-243), replaces the judging remembered for its character, program and map.

Beside the list „Program:” of a character in „Kto idzie” stands the judging remembered for that character, the program the list shows and the map of the card: the badge „szczelny: 12 z 12” in `positive` where it solved all twelve seeds, and „{n} z 12” in `text` otherwise. Where the chest holds less of an item than the judging took, the result stays with „oceniono z zapasem, którego dziś nie ma w skrzynce” beside it and the badge goes out, „12 z 12” standing in its place.

A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map. A judging so erased never stands again, since such a save raises the program's content revision (D-442) and such a death the character's generation number, and the judging of a deleted program stands beside no other program (D-165).

On a map whose data name a creature for the record, the game remembers in the browser that made it the record of the most health of that creature that any judging took in one fight, a fight the character won giving the creature's whole health, a fight in which the character died counting as any other and a seed with no fight giving 0, and the largest of the twelve seeds of a judging counting. The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441).

- **Scope:** simulation · browser-view

### D-441 — Where does the game keep the last judging of each character, program and map?

The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form, the signed-in account by its identifier, the game by the moment it was made (D-04), the character, the program and the map, and the value holding the kind of each of the twelve results, the equipment the judging took, and the content revision of the program (D-442) and the generation number of the character in the game state the judging read. The saved game state holds no judging, and nothing of a remembered judging enters the game state, which is whole without it. The value holds besides a fingerprint of the content of the program it judged, a short text that is the same for two contents the content revision counts as no change (D-442) and another for every change it counts, but for a chance of a collision of at most one in 2^52.

A remembered judging stands beside the list „Program:” only while its character is on the team at its generation number and its program is on the player's list at its content revision. A value of another form, one whose results do not number the seeds of a judging in the game's data, or one under a key of another version of the stored form shows nothing, as where nothing is remembered, and a key of another version is neither read, written nor removed. A remembered judging stands there too only while the fingerprint of the content the program holds equals the one stored, so two different contents share a judging only through such a collision, and a value whose fingerprint is no text of the form of a fingerprint is a value of another form.

Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323). When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game or whose program number or character number is not below the number the loaded game gives to its next program or character, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts. Another device, or a browser whose data were cleared, shows no remembered judging until a judging is made there.

The unsaved game state stays out of the browser's lasting storage as D-211 gives, and the remembered judgings stay there after „Wyloguj”, holding the account's identifier, numbers of characters and programs, identifiers of maps, kinds of results and items with their counts, and no email address, no name and nothing the game loads.

Beside the judgings the browser keeps the record of D-440 in its lasting storage, one value under a key of its own with its own version for each account, game and map, holding the number and the creature's numbers it was made at. It is read only in that form and version and, on opening and at a refusing storage, treated as the judgings are.

- **Scope:** browser-view · simulation

## Listed by heading alone

- D-03 — How is the browser view built?
- D-04 — What is the game built with?
- D-06 — How are the browser and server built together?
- D-07 — How is the work of the game split between the server and the browser?
- D-263 — Which tool bundles the browser's code?
- D-266 — Where does the output of the browser's compilation stand?
- D-28 — Which coding-guideline discipline does loop2 adopt?
- D-29 — Which rules check TypeScript and JavaScript?
- D-30 — Which Python rules block a change?
- D-31 — Which Bash rules block a change?
- D-32 — How is web code formatted?
- D-34 — Which file is the exemplar for content data?
- D-35 — Which file is the exemplar for simulation modules?
- D-36 — Which file is the exemplar for browser modules?
- D-117 — Which file is the exemplar for a browser API client?
- D-213 — Which file is the exemplar for saved-game code?
- D-351 — How does loop2 keep the imports of its parts within the dependencies its part map allows?
- D-362 — How does loop2 point to places outside the repository that its readers cannot reach?
- D-393 — What keeps the simulation from using names outside the JavaScript language?
- D-394 — Does the simulation keep `actionFeasible`, which the game does not call?
- D-412 — What looks for secrets in loop2's repository?
- D-425 — How large may a function and a file of the code be?
- D-433 — How is Python formatted?
- D-434 — How are the Bash scripts formatted?
- D-437 — Which file is the exemplar for the code of the balance instrument?
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
- D-95 — When is the mutation testing tool removed?
- D-255 — Where does the data an agent checks the game on come from?
- D-256 — Does the local start keep an account between its starts?
- D-257 — Where does account mail go at the local start?
- D-258 — What does the game present to a browser at the local start?
- D-264 — What does a test of a screen built with React run on?
- D-268 — What keeps a test on a document imitation from taking the machine's memory?
- D-413 — How does CI check a pull request into `main`?
- D-414 — What does a Claude Code session of loop2 show at its start where `.the-way` is not at the commit the repository pins?
- D-417 — How does an agent operate the game as a player does?
- D-420 — From which session may an agent use Playwright MCP?
- D-431 — What does the local start do when another program takes the port of its server?
- D-12 — What access to the server does an agent have?
- D-13 — Where do the server's access values and secrets live?
- D-15 — How is loop2 recovered when a deployment goes wrong?
- D-252 — How does loop2 write its failures to its logs, and what does it log?
- D-253 — Which processes of loop2 have a last-resort handler of their own?
- D-347 — How does an agent learn what went wrong in the game running in the browser?
- D-355 — Where does the log of the running game on the server lie, how long does it live and how does an agent read it?
- D-356 — How does the operator learn that the running game failed?
- D-228 — Which failure does the database backup survive?
- D-230 — How often is a database backup made, and how many stay?
- D-231 — Where does the database backup run?
- D-232 — How is the database backup encrypted?
- D-233 — How does the operator learn that a database backup failed?
- D-234 — What does a checked restore of the database mean?
- D-238 — How does the backup script reach Mikrus Strych?
- D-360 — What does a restore of the database from a backup do about the passwords, sessions, blocks, roles and privileges it brings back?
- D-101 — How long do independent browser sessions last?
- D-102 — How are account attempts limited?
- D-104 — Which request origin and body may change account state?
- D-108 — What public address do the game and account server share?
- D-109 — What identity authorizes an account request?
- D-137 — How is a player account blocked and unblocked?
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
- D-386 — Which game states does the load of a saved game state admit?
- D-399 — Which saved game state does the server keep beside the current one?
- D-400 — What is the previous-save privilege and who gives it?
- D-401 — How does an account with the privilege pull the programs of its previous save?
- D-402 — How does an account with the privilege start the game from zero?
- D-403 — What does the load do with a saved game state whose Understanding lacks „Eksploruj”?
- D-51 — What team does a new game start with?
- D-52 — How is a character named?
- D-54 — In what order do the characters of the team stand?
- D-56 — How does the game state tell one character from another?
- D-57 — In what unit does a character's warmth stand?
- D-58 — What cools a character's body?
- D-59 — How far do warming and eating raise a character's warmth and satiety?
- D-60 — When does a character lose and regain health?
- D-61 — When does a character die, and of what?
- D-62 — What does the screen show, and what can the player do, after a character's death?
- D-190 — What does a character's death take?
- D-216 — Where does the player read what a death took and what a completion returned?
- D-217 — What does the game show of a character's resurrection?
- D-218 — How does the headquarters show a character's generation number?
- D-219 — Whose clock counts the renewal of a resurrection?
- D-220 — What generation number and resurrection does a new character have?
- D-221 — When is a character's death settled?
- D-387 — What numbers do the body, the gathering, the campfire and eating have?
- D-63 — How does a character light a campfire or a stick?
- D-64 — What does the backpack's cap count, and what sets its height?
- D-65 — What does a full backpack do to gathering?
- D-66 — What does a missed gathering do?
- D-67 — How does a tile's stock renew?
- D-68 — What becomes of a campfire that burns out?
- D-69 — How much does feeding add to a burning campfire?
- D-70 — How does the browser view show a campfire?
- D-72 — Where does a character craft a campfire and light a stick?
- D-373 — How does the flame of the campfire show how long the fire has left?
- D-444 — How do the game's data tell an item from a resource?
- D-140 — How does combat go?
- D-141 — When do combat turns take effect?
- D-142 — When can a creature attack a map run?
- D-143 — What does the first wolf attack reveal?
- D-144 — What actions does a character use in combat?
- D-145 — How do weapon wear and wound dressing work today?
- D-146 — What ends an encounter?
- D-150 — Which character skills open the current combat actions?
- D-151 — Whose health do combat conditions compare?
- D-175 — What does a mage pay for spells with?
- D-176 — With how much nature energy does a mage start a map run?
- D-177 — What does too little nature energy do to Płomyk?
- D-178 — What does the body row show of a mage's nature energy?
- D-191 — How does a character skill grow?
- D-192 — What describes a character?
- D-193 — When and how much practice does an action add?
- D-194 — When does a manual map run pay its practice to its character?
- D-195 — When does a character skill tree become known?
- D-196 — Which branch actions does the program editor offer outside a map run?
- D-197 — What does the gathering branch Obchód do?
- D-198 — What does the exploration branch Zwiad do?
- D-199 — What does the screen Postać show of character skills?
- D-200 — Where does the player buy a branch rank, and when does it act?
- D-201 — What does the map-run view show of its practice?
- D-374 — How short can an action shortened by bought branches be?
- D-377 — How fast does a mage's nature energy come back?
- D-378 — Can a program of the closed lists solve Las?
- D-379 — What are the curves of practice, and the effects and prices of the branches, of the eight character skills?
- D-118 — When does the player learn what the world holds?
- D-119 — Whose is the knowledge of the world, and what may a character use of it?
- D-120 — What does an archetype open to a character?
- D-121 — What brings each action, item and condition of the first maps into the Understanding?
- D-122 — What does a map run do, and what does the player see, when something is discovered?
- D-123 — What does the game write into the program at a discovery?
- D-124 — What does „+ reguła” do?
- D-125 — What do the body row, the backpack, the list of revealed tiles and the drawing of the game map show of what is not yet discovered?
- D-128 — Where does what reveals an action, an item, a condition or a creature stand?
- D-312 — How does the band of a discovery name the program rule the game wrote?
- D-313 — What does „Dodaj regułę z tym” do?
- D-20 — What interrupts the character's action in progress?
- D-23 — How does a character act by its program?
- D-25 — How does a character move?
- D-26 — How does a program point at things of the world?
- D-90 — Where do the program rules of a program belong?
- D-91 — What program does a new game start with?
- D-92 — What counts as one firing of a program rule?
- D-93 — What does a program rule show the player?
- D-126 — What does the simulation do with a program rule outside the character's repertoire?
- D-127 — What does the simulation do with a rule group whose condition lies outside the character's repertoire?
- D-375 — Where does „Wędruj” go, and how does it draw?
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
- D-442 — How does the game state count the changes of a program's content?
- D-50 — Whose is the chest?
- D-179 — How do items go into a map run and out of it?
- D-180 — Where does the player arrange the trip plan?
- D-181 — Which entries does a trip list accept?
- D-182 — What trip plan does a new program hold?
- D-183 — What happens to carried items when the player stops a run or completes with items outside its plan?
- D-184 — How does the headquarters show the chest's capacity?
- D-185 — Where does the player read what completion deposited?
- D-186 — What does the running map show of the frozen bring plan?
- D-188 — Where does the player learn that a map cuts the trip plan?
- D-189 — What pays, and what takes from the chest?
- D-307 — What does the line of an empty trip plan say?
- D-240 — When and how is the time away computed?
- D-241 — How does the game state hold earning loops?
- D-242 — Which clock drives an earning loop?
- D-244 — What does the player see of an earning loop?
- D-245 — What does „Zatrzymaj” do?
- D-246 — What does the player read after being away?
- D-247 — When is time away computed, and how much?
- D-248 — What is the save time?
- D-249 — What does a map run of an earning loop discover?
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
- D-19 — How does the player interact with the drawing of the game map?
- D-283 — What happens to a manual map run when the player leaves its screen?
- D-284 — Does a return to the screen of a manual map run resume it?
- D-287 — What do Siedziba, the screen Postać and the screen Mapy allow, and say, while a manual map run waits or has ended?
- D-311 — How is the screen of a map run laid out?
- D-324 — What does the map run do, and what stands on the screen, while the question of „Zakończ” stands?
- D-334 — What does „Teraz” say on the screen of a map run?
- D-335 — What does „Potem” say on the screen of a map run?
- D-336 — What does a click on „Teraz” or „Potem” do?
- D-337 — What does the body row show of how long each need lasts?
- D-346 — How long does the pick of „Kronika” or „Teren” hold on the screen of a map run?
- D-349 — What size is the scene on the screen of a map run?
- D-368 — What does the end-of-run window say, and how does it open and close?
- D-369 — What does a manual map run keep of itself for the end-of-run window, and how does a load read it?
- D-370 — How does the end-of-run window cover the screen of a map run, and where does the keyboard go?
- D-371 — Who remembers whether the end-of-run window is open, and where does „Koniec przejścia” stand?
- D-385 — How does the list of revealed tiles show an item that burns on a tile?
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
