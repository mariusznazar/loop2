# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 69. Listed by heading alone: 230.

## Listed in full

### D-418 — Where do the screenshots that a task cycle of loop2 shows the human lie, and how does the description of its request embed them?

The screenshots that a task cycle shows the human lie in the public GitHub repository `mariusznazar/screenshots`, in its directory `loop2/` and in that a directory for each cycle, named as the directory of the cycle's own record, on a branch of that repository named `loop2/` and the name of that directory, never on `main`, and the description of the request embeds each as an image by a link to its file in a particular commit of that repository, with `?raw=true` appended. That repository holds only the screenshots of public products and may be cleared after a long time, and the images of old requests then stop showing. The screenshots of the predecessor game, loop, deployed at `https://kantarion.bieda.it/`, may lie there too, since that game counts as a public product.

- **Scope:** agent-workflow

### D-419 — Who puts a screenshot into the repository for screenshots?

The agent that shows a screenshot pushes it itself to the repository `mariusznazar/screenshots` with the `gh` account of the human who owns that repository, with no step of the human.

- **Scope:** agent-workflow

### D-282 — What do the screens leave room for from the start?

Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws the team as a section with a heading, and the rule panel offers its pick in steps, the action first and its target after it. The narrower layout is the phone layout (D-396).

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

`positive` also stands as the fill of the bar of health in the body row (D-337), on a track in `highlight`, with a contrast ratio of at least 3:1 against it at full opacity, and `warning` stands in no bar of the body row either: the orange fill of the bar of satiety takes the role `satiety-fill`, which means how much satiety the character has, on the same track and with the same ratio. `danger` also stands as the number of a value of the body row below its threshold, health below 35 included, and as the zone of overheating on the scale of temperature, with a contrast ratio of at least 3:1 against `panel`.

The frame of the button of the temperature cell takes the role `warming-frame`, amber, which means that something warms the character, while something burns on the character's tile, and the role `chill-zone` (D-40) while nothing warms the character and its map is colder than its body, each with a contrast ratio of at least 3:1 against `panel`; that frame says what acts on the character, is no frame at a text in the sense of D-279 and takes no colour from the text inside it.

- **Scope:** browser-view

### D-40 — What do the neutral roles of the browser view mean?

In the browser view the background `page` means that here is the game, `panel` a block set apart, and `highlight` that this row or track is marked or that this control is under the pointer, `rule-winning` that this program rule wins now, and `rule-running` that this program rule's action is being carried out; `divider` means that one section ends and the next begins, `control-border` that something can be clicked or typed into, `selected` that this is the one chosen in its group, and `condition-unmet` that the condition of this program rule or rule group does not hold. Of the roles of the kind text, `text-strong` means a name, heading or value looked at first, `text` content to read, `text-secondary` a description, explanation or note, `text-label` the name of a field or section, or a date, and `text-disabled` that this cannot be used now. Each of the five stands as text on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, and `text` is the text each of these backgrounds is written with.

The badge over the mage's head stands on `panel` and the track of its progress bar in `highlight`, and the icon in the badge stands in `text-strong`, though it is no text and no text stands beside it; so does the icon flying to the mage, on its plaque in `panel`, and so do the icons of the drawing of the map, on `tile-revealed`, and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either. The bar of a requirement of the solving condition in the header has its track in `highlight` and, while the requirement is not met, its fill in `text`, though it is no text. The bar of the practice of a tree on the screen Postać has a darker track and a light fill with no green, as the bar of a requirement that is not met has, its track in `text-disabled`, at a contrast ratio of at least 2:1 against `panel` (D-42), and its fill in `text`, though neither is text, and the points of that tree to spend stand beside it in `text-strong`.

The bars of satiety, health and nature energy in the body row (D-337) have their track in `highlight`, as the bar of a requirement in the header has, and the fill of the bar of nature energy stands in `text-strong`, white, though it is no text. On the scale of temperature the chill zone stands in the role `chill-zone`, which means that the body is chilled at that temperature, the safe zone in the role `safe-zone`, a neutral grey, which means that the body is safe at that temperature, and the marker of the temperature now in the role `scale-marker`, dark, which means where the value stands on its scale, on both sides of a light core in `text-strong`, though it is no text, so that the marker tells from the gaps between the zones, each zone with a contrast ratio of at least 3:1 against `panel` and the dark sides of the marker against each zone (D-42). The button of a cell of the body row (D-44) takes no background `highlight` under the pointer, since the track of its bar stands in that colour, and its name stands in `text-strong` under the pointer and while its explanation stands open.

- **Scope:** browser-view

### D-41 — What do the roles of the terrain grid and of keyboard focus mean?

In the browser view `character` means that here is the character and here it is going, the target of its current move told from its place by shape, a thin dashed line in place of a thick solid one, never by colour; `tile-hidden` means a place not yet known, `tile-revealed` a place known, whose icons say what lies there, and `tile-edge` the border between tiles of either kind. `link-highlight` means that this tile and this row of the list of revealed tiles are the same place, `depleted` that what was here is gone, and `focus` that here is where the player is, using the game by keyboard.

- **Scope:** browser-view

### D-42 — Which accessibility requirements does the browser view keep?

Every screen of the browser view keeps four success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast, 2.3.1 Three Flashes or Below Threshold and 2.4.7 Focus Visible — and no other requirement of WCAG, with no date or event set for returning to it. Every role of the kind text but `text-disabled`, the signal colours included, has a contrast ratio of at least 4.5:1 on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, and `text-disabled` has no threshold as text, while as the track of the bar of practice of a tree on the screen Postać it has a contrast ratio of at least 2:1 against `panel`, a pair of its own and a floor of the product that no criterion of WCAG sets. `control-border`, `focus` and `character` have a contrast ratio of at least 3:1 against the colours they touch, and so have `tile-revealed` against `tile-hidden` and the frame of the plaque of a discovery in the scene, in `discovery`, against `panel`; `condition-unmet` has no threshold.

In the body row (D-337) each fill of a bar, `positive`, `satiety-fill` and `text-strong`, has a contrast ratio of at least 3:1 against its track in `highlight` at full opacity, each zone of the scale of temperature, `chill-zone`, `safe-zone` and `danger`, at least 3:1 against `panel`, the marker, `scale-marker`, at least 3:1 against each zone, and the frame of the temperature cell, `warming-frame` or `chill-zone`, at least 3:1 against `panel`; two zones need no ratio against each other, since a narrow gap in the colour of `panel` stands between them. The alarm's pulse of a fill, from full opacity to 40 % and back in 1.1 s, smoothly and with no end, is exempt from that ratio in its dim phase, the full colour keeping it, and the pulse and the shake and the fading text of a blow in the health cell (D-450) are judged by 2.3.1.

- **Scope:** browser-view

### D-43 — What counts in the browser view as a value written in place of a design token?

In the files of the part browser-view other than its file of design tokens, a value written in place of a design token is a colour in any notation — hexadecimal, functional, a named colour or a system colour — in styles and in TypeScript and, in styles, a size or spacing in `px`, `rem` or `em`, a font name, or a unitless stroke width, dash pattern, opacity or font weight, those four unitless kinds being all. None is `0`, a percentage, a size in `fr`, `vw` or `vh`, a keyword such as `transparent`, `currentColor`, `inherit` or `none`, a screen-width threshold of an `@media` rule, the geometry of the terrain drawing or of the scene computed in TypeScript, the frames and positions of a sprite, the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid — or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it or, where no text stands beside it — in the badge over the mage's head, on the plaque of the icon flying to the mage and in the drawing of the map — from `text-strong`, and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either.

- **Scope:** browser-view

### D-44 — Which controls do the screens of the browser view build on?

The screens of the browser view build every button, select list, number field, text field and cell of a pick from the shared controls of `src/browser/view/controls/` — the button in its kinds (the plain button, the destructive button, the button selected in its group, the secondary action (D-275), the tab (D-276), the main look outside a form (D-274) and the button in `positive`), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons, with their text in `danger` at rest, in every layout, and the background `highlight` besides under the pointer, and „Odbierz”, which pays the practice waiting at an earning loop, is the plain button with its text in `positive` at rest and under the pointer (D-39).

A control awaiting a server response is disabled with text in `text-disabled`, „Zacznij od zera” while its reset waits for the server among them; the button that sends a form then reads „Logowanie…”, „Zakładanie konta…”, „Wysyłanie…” or „Ustawianie…” for the corresponding form — „Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła” or „Ustaw nowe hasło” — and that form's fields are disabled, and the button „Wyślij ponownie” then reads „Wysyłanie…”, as the button „Wciągnij programy z poprzedniego zapisu” reads „Wciąganie…” while its pull waits (D-401). A form's server refusal and loss of connection appear as one sentence below the form in `warning`, the answer to a request for a password-reset link (D-222) appears in that place in `text`, with a bar on its left in its own colour (D-279) and never in `positive`, and the kitchen-sink page shows the waiting and refusal states of every form, „Nie pamiętam hasła” and „Ustaw nowe hasło” included, and the form „Nie pamiętam hasła” with that answer.

Besides the kinds above, the button has the kind of the button of a cell of the body row, of which the cells of temperature, satiety and nature energy are built (D-337): it carries the name of a value at its left and its number at its right on one line, a bar under them and a note under the bar, and says whether the explanation of its value stands open (D-450). Its frame stands in `control-border`, as that of the plain button does, and its background and the role of its name under the pointer and while its explanation stands open are those D-40 gives it.

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

### D-124 — What does „+ reguła” do?

„+ reguła” adds a program rule at the end of its rule group and opens its rule panel on the condition, „Zawsze → Eksploruj” standing there until the player picks otherwise, and it is never disabled.

- **Scope:** browser-view, simulation

### D-313 — What does „Dodaj regułę z tym” do?

„Dodaj regułę z tym” in the band of a discovery adds a program rule at the end of the copy's first rule group and opens its rule panel on the field it filled from the discovery: where the discovery holds an action that takes no target or one the rule panel offers a target for, the rule is „Zawsze → {the first such action}” and the panel opens on the action, the action's target, where it takes one, being the first target that matches an item of the same discovery, else the first target the rule panel offers for that action. Where the discovery holds no such action but a condition that takes no target or one the rule panel offers a target for, the rule is „{the first such condition} → Eksploruj”, the condition's number and target being those a pick of that condition in the rule panel gives, and the panel opens on the condition; where it holds neither, the button does what „+ reguła” does (D-124). Where the copy holds no rule group, the button is disabled.

The same button stands in the end-of-run window where the window names a discovery of the game minute of the end (D-122), and there it closes the window and does what it does in the band.

- **Scope:** browser-view

### D-288 — How does the player write a program rule?

One program editor stands on Programy and on the screen of a map run. A rule's row reads as a sentence and a rule panel changes it, opening in place on the list under the row of the rule or the header of the rule group it changes, on both screens, and taking no column of its own: each pick moves on to the next field, conditions, actions and targets stand as cells in groups that the keyboard can reach, the conditions in two columns, and what the player may not pick stands greyed with its reason. Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle with such a line and by „↑” and „↓” in their header, one place at a time as the arrows of a rule do, in every layout; the drag by a handle is for the mouse of a computer.

- **Scope:** browser-view

### D-292 — How does the program editor number rule groups and program rules?

In the program editor each rule group bears its number in the program, such as „2”, and each program rule the number of its group and its own number in that group, such as „2.1”.

- **Scope:** browser-view

### D-293 — What time of an action does the program editor show?

Beside a program rule's action, in its row and in the rule panel, stands the time one carrying out of the action takes, such as „10 min”, „tura” for an action of combat, for a movement during a map run the time of a step on that map, and nothing for a movement outside a map run.

The cell „Wytwórz” of the pick of actions shows no time, since the recipe of its target gives the time, and the cell „Opatrz” shows its own; an action whose time its target gives shows that time at each target of the pick of its target, beside the price, such as „Opatrunek (2 mchy)” and „10 min” beside it.

- **Scope:** browser-view

### D-294 — Where does the program editor keep which rule groups are folded?

Which rule groups are folded lasts in the page's memory while the player moves between screens and goes with a reload of the page, after which every rule group stands unfolded; the saved game state does not hold it. Each new copy, made at a send and at a switch of the character to another program, has every rule group unfolded, the foldings of the copy before it passing to it no more.

- **Scope:** browser-view

### D-295 — What does a folded rule group show, and where does a rule dropped on it land?

A folded rule group shows its name, its condition and the number of its program rules, and a program rule dropped on it lands at its end while the group stays folded.

- **Scope:** browser-view

### D-296 — Where does the player change and delete a rule group?

A click on the header of a rule group opens the rule panel with the group's name and condition, and the group's „✕” stands in its header. A tap or a click anywhere on the header outside its buttons opens the group, at its centre and on its text as well.

- **Scope:** browser-view

### D-297 — Where does an arrow move a program rule at the edge of its rule group?

„↓” on the last program rule of a rule group moves it to the start of the next group, and „↑” on the first program rule of a group to the end of the previous one; „↑” is disabled only where no rule group stands before the group of the rule and „↓” only where none stands after it, so a rule group left empty at the edge of the program takes the rule.

- **Scope:** browser-view

### D-298 — How does the player fold and unfold every rule group at once?

Beside the rule groups of a program that holds more than one rule group stands a plain button, „zwiń wszystkie” or „rozwiń wszystkie”, that folds or unfolds every rule group of the program.

- **Scope:** browser-view

### D-300 — Does a condition show its current value in the program editor?

The program editor shows no current value beside a condition, such as „teraz 3”.

- **Scope:** browser-view

### D-301 — What does an empty rule group say?

A rule group that holds no program rule shows „Pusta grupa — przepuszcza dalej.”

- **Scope:** browser-view

### D-303 — Does deleting a program rule or a rule group ask first?

A program rule and a rule group are deleted at once, at the click, with no question.

- **Scope:** browser-view

### D-304 — Where does the player add a rule group?

The button that adds a rule group reads „+ dodaj grupę” and stands under the rule groups, in the notation of „+ reguła”, at the foot of the list.

- **Scope:** browser-view

### D-305 — Does the program editor mark a program rule that does not fire?

The program editor shows no mark „⊘”, no count „N reguł nie zadziała” and no amber „0×” at a program rule or a rule group.

- **Scope:** browser-view

### D-423 — Which item does the condition „Zapas poniżej” start with in the program editor?

A new condition „Zapas poniżej” starts with the item the game's data names as its default, Patyk, beside its default number 8, where the character knows that item. Where the character does not know it, the condition starts with the first item the character knows, in the order of the game's data. An item put at any place of the game's data, the start included, leaves the item a new condition starts with as it was while the character knows Patyk.

- **Scope:** simulation · browser-view

### D-289 — What does the rule panel show greyed, and with which reason?

The pick of the rule panel holds nothing undiscovered, and what is discovered but may not be picked stands greyed with its reason: a branch action the character of the map run has not bought, „gałąź niewykupiona”; such an action while the game holds no map run, „wybierzesz w przejściu postaci, która ją kupiła”; „Idź”, „Zbierz”, „Obchód”, „Tu leży mniej niż” and „Zapas poniżej” with no target to point at, „nie znasz jeszcze celu”; and a discovered target absent from the map of the map run, „nie ma go na tej mapie”. While the game holds no map run every discovered target may be picked, the actions of combat may be picked outside combat too, and a rule holding a value outside what may be picked shows it in the panel as picked and greyed, with its reason where one of those above fits and with none otherwise, and the player can change it.

A thing that lies on no map, such as the bandage, is no target of „Idź”, „Zbierz”, „Obchód” or „Tu leży mniej niż”, in a map run or outside one. „Wytwórz” and „Opatrz” with no known target stand greyed with „nie znasz jeszcze celu”, as „Idź” and the others above do.

- **Scope:** browser-view

### D-290 — How does the pick of the rule panel group its cells?

The pick of the rule panel sets the actions in five named groups: Ruch — „Eksploruj”, „Wędruj”, „Idź”, „Idź — ognisko”; Zbieranie — „Zbierz”, „Obchód”; Ogień — „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”, „Zasil — ognisko”; Żywność i walka — „Zjedz — jagoda”, „Opatrz”, „Uderz — patyk”, „Kopnij”, „Odskocz”; and Wytwarzanie — „Wytwórz”. It sets the conditions in two columns, in sections with no names set apart by a line: Zawsze; Temperatura, Sytość, Zdrowie, Energia natury; Zapas, Tu leży, Zostało mniej niż — ognisko, Z dala od — ognisko; Przeciwnik ma poniżej.

- **Scope:** browser-view

### D-291 — Which icon stands for an action?

Each action has one icon, which stands for it in a program rule's row, in its cell of the pick, over the mage's head, in the rows „Teraz” and „Potem” under the scene and beside the action on the screen Wiedza; an action with a target shows the icon of the action, never one of its target.

- **Scope:** browser-view · simulation

### D-299 — Does the pick of the rule panel hold a search or a row of recent picks?

The pick of the rule panel holds no search field and no row of recent picks.

- **Scope:** browser-view

### D-302 — What does the rule panel of the copy say of the streak?

The rule panel of the copy a map run carries out reads „Zmiana zeruje passę tego przejścia.”, and it says nothing of the firing counts.

- **Scope:** browser-view

### D-306 — How does the rule panel take the player through a rule?

A click on a program rule's row opens the rule panel on the condition, and its fields follow as condition, number, target of the condition, action and target of the action, the number field and a field of a target standing only where the condition or the action has one; each pick changes the rule at once and moves to the next field, a pick of the value already picked included, and Enter or leaving the field confirms the number. In the grid of a field the arrow keys move between the cells, a greyed one included so that its reason can be read, and Enter picks, doing nothing on a greyed cell. After the last field the panel stays open, and „✕”, Escape or opening another rule closes it, as does deleting the rule; moving the rule to another group, by an arrow or by the handle, closes nothing, and the panel stays open on the same field and goes with the rule to its new group.

A tap or a click anywhere on a program rule's row outside its buttons opens the rule panel, at the centre of the row, on its text and on its empty strip alike, and moves no rule.

- **Scope:** browser-view

### D-308 — What state does a program rule show during a map run?

During a manual map run and on its screen after its end, until „Restart” or „Zakończ”, the rule of the copy that wins now stands on the background `rule-winning` and the rule whose action is being carried out, where it is another rule, on the background `rule-running`, except that a row open to editing stands on `highlight` in their place, keeping its bar, and a row under the pointer keeps the background of its state. A rule whose condition holds and whose action cannot be carried out names the reason, such as „tu nie leży mech”, and a bar at each program rule and rule group of the copy, below the winning rule too, is green when the condition holds and it can start, a rule group when one of its rules can, amber when the condition holds and it cannot start, and dark when the condition does not hold. A rule outside the character's repertoire shows amber with that reason whether or not its condition holds, unless the condition of its rule group does not hold: the bar of a rule counts that condition too, so every rule of such a rule group shows dark, with no reason, and a rule group whose condition lies outside the repertoire counts as one whose condition does not hold.

- **Scope:** simulation, browser-view

### D-309 — What do the signs of a program rule show in the minutes of an attack?

In the minutes of an attack, from the minute of the attack to the resolving of its turns, the signs of the copy show what the first combat turn would choose now, at the health of the mage and of the creature as they stand: the combat rule the turn would choose stands on the background `rule-winning`, no rule stands on `rule-running`, and an ordinary rule whose condition holds is amber with the reason „trwa walka”. Outside those minutes a combat rule whose condition holds is amber with the reason „tylko w walce”.

- **Scope:** simulation, browser-view

### D-310 — How does a program rule that cannot start name its reason?

A program rule whose condition holds and whose action cannot be carried out names one reason: when there are several, the one of combat comes first, then the world and the backpack, then the nature energy, and a branch the character did not buy after them. The reason names the thing refused as the game writes it, in lower case and without a dot before the name, such as „tu nie leży mech”, „brakuje 4 × patyk”, „brak opału: patyk” and „brak energii natury: 7 z 10”, and the reason of a rule outside the repertoire is „gałąź niewykupiona”, as of a greyed cell of the rule panel, or „jeszcze nieodkryte: {name}”.

- **Scope:** simulation, browser-view

### D-350 — Where does the rule panel stand while the rule group of its rule is folded?

A rule panel open on a rule whose rule group is folded stands directly under the header of that group, where the row of the rule is not drawn. Folding or unfolding that group, or every group at once, closes no panel and changes no field of it, and the panel stands under the row again when the group unfolds.

- **Scope:** browser-view

### D-363 — Where does the player read what an action costs?

The rule panel shows beside an action what it costs, read from the game's data, in brackets after the action's name, in the same text as the name, so that it takes the name's role and dims with a greyed cell — such as „Wytwórz — ognisko (6 patyków)” — at every cell of its pick, a greyed one included, save the cell of an action whose price its target gives, and at the action chosen in the panel, where the time of one execution stands; the row of a program rule shows no price. The pieces an action uses up and the nature energy it takes stand with the names of the things in the form their count takes and the energy by its full name, such as „(2 patyki, 10 energii natury)” and „(1 jagoda)”, so the data of the game's things hold the plural forms of their names; an action that takes a piece of a use — fuel, food or a thing to light — names the first item the data marks for that use, as the reason of its rule does (D-310), and an action that uses up nothing has no price. During a map run the price follows the character of the map run, as the time does (D-293), so the character with the bought branch „Czysty płomień” reads „Zapal — ognisko (10 energii natury)”, while on the screen Programy and outside a map run the price is the data's, „Zapal — ognisko (2 patyki, 10 energii natury)”.

An action whose price its target gives, „Wytwórz” and „Opatrz” with an item as the target, shows no price at its cell of the pick of actions; the pick of its target shows at each target the price of the action with that target, in brackets after the target's name, and the action chosen in the panel shows the price of its chosen target, such as „Wytwórz — Opatrunek (2 mchy)” and „Opatrz — Opatrunek (1 opatrunek)”.

- **Scope:** browser-view, simulation

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

The screen of a map run has two columns under one header in the computer layout: on the left the world and, under the drawing of the map and the line of a tile that end it, an area with the tabs „Kronika” and „Teren” holding one content at a time, the chronicle or the table of revealed tiles, as the player picks, „Kronika” picked when the character is sent to the map; on the right the program, in which the editing of a rule or a rule group opens in place under its row (D-288). The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with a bar under each of its values and the minutes each need lasts, the explanation of a value right under its cells while the player has one open (D-450), the backpack and the lines below them, the drawing of the map and the line of a tile under it. The header holds the character's name, the map's name, the clock, a bar of the solving condition with its numbers (D-133), „Pauza” or „Wznów”, the pace, and after the end of the map run „Koniec przejścia”, which opens the end-of-run window, „Restart”, the warning of a cut trip plan and „Zakończ”.

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

### D-337 — What does the body row show of each value of the body, and of how long each need lasts?

The body row holds each of its values in a cell of its own, and under temperature and under satiety a note in smaller grey text, health and nature energy standing with no note. The note under temperature reads the first of these that holds: „marznie” in red below 35 °C, „przy ogniu” while something burns on the character's tile, „nie stygnie” on a map that does not cool the body, and „bez ognia {n} min”; the note under satiety reads „głoduje” in red below 30 and „bez jedzenia {n} min” otherwise. {n} is the whole game minutes, rounded down, left until the character starts to be chilled or to starve, and the notes stand from game minute zero and on the screen after the end of a map run, on the state of its stopped game minute.

Each of the four values — temperature, satiety, health and nature energy — stands in its cell as in loop: its name at the left and its number at the right on one line, a bar under them and its note under the bar, while the backpack stays a line with no bar. The bar of satiety is empty at 0 and full at 100, that of health full at the starting health and that of nature energy full at its cap, both from the game's data, each of them empty at 0. Temperature stands on a linear scale from 30 °C at its left end to 41 °C at its right, whose track is three zones — chill from 30 to 35 °C, safe from 35 to 39 °C, with 37.0 °C inside it, and overheating from 39 to 41 °C, drawn though the game knows no overheating — and on which a short upright marker the height of the bar stands at the temperature now, at the left end below 30 °C.

Below its threshold — temperature below 35 °C and satiety below 30, as the game's data give them, and health below 35, a threshold of the look alone that the game does not know — the number of a value stands in red and its fill pulses in its own colour, on the scale the marker together with the zone it stands in, still under the system's setting for reduced motion; no fill takes the colour of the alarm, and nature energy has no alarm. The pulse goes on while game time stands — in the player's pause, at the moments of a discovery, a death and a completion, and on the screen after the end of a map run — though the motion of the scene then stands (D-322). The frame of the button of the temperature cell says what acts on the character: amber while something burns on the character's tile, also once the temperature stands at 37.0 °C, bluish while nothing warms the character and its map is colder than its body, and the plain frame of the button on a map that does not cool it, with no pulse, changing only when what acts on the character changes.

The cells of temperature, satiety and nature energy are buttons that open the explanation of their value, and the health cell, which is no button and holds the place of their frame, shows a creature's blow, as D-450 gives; the cell whose explanation stands open and the cell under the pointer show the name of their value in `text-strong`, their background unchanged.

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

### D-450 — What do the cells of the body row show on a click and at a creature's blow?

A click on the cell of temperature, satiety or nature energy (D-337) opens, right under the four cells and above the backpack, the explanation of its value — its threshold, what happens to the character below it and how fast the value changes, with the numbers of the game's data — and moves down what stands under it; a second click on that cell closes it, and a click on another of those cells switches to that cell's explanation, so that at most one explanation stands open.

At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, read from the events the simulation returned (D-04) and never at a first draw of the screen, after a reload or after a load: one marker for a combat, {n} being the sum of the creature's blows in it, where that sum is at least 2, a killing blow included before the end-of-run window opens, and a new blow replacing the marker of the one before. The marker shows at the paces 1×, 2× and 4× and at no other, as the scene shows no text of its effects at 8× and 16× (D-317), and a blow at 8× or 16× is dropped, not kept for a slower pace. While game time stands — in the player's pause, at the moments of a discovery, a death and a completion, and on the screen after the end of a map run — the shake and the text stand where they reached, a marker that comes while it stands, as that of a killing blow does, standing at its first frame, and they go on when time goes on; under the system's setting for reduced motion the cell does not shake and the text stands still and goes.

- **Scope:** browser-view

## Listed by heading alone

- D-03 — How is the browser view built?
- D-04 — What is the game built with?
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
- D-265 — What form does a shared control of the browser view have?
- D-267 — What keeps the rules of hooks and of effects in the browser view's code?
- D-269 — Does the kitchen-sink page hold React?
- D-270 — Which libraries built on React may the browser view take?
- D-280 — Which screens does the game have, and how does the player move between them?
- D-281 — How does an address name a screen?
- D-285 — How does the menu „Konto” open and close?
- D-286 — How long does the page's sentence stand above the game?
- D-323 — What does the game do, and what does the player read, after an error that no code of the game handled?
- D-395 — What does a shared control of the browser view know of the screens that use it?
- D-407 — Does the browser view keep a React root for each screen, and where does its state live?
- D-408 — What does a new screen of the game add, and where?
- D-411 — What does the screen of the list of accounts show, and how does it run the four operations?
- D-416 — What does the screen Wiedza show?
- D-421 — Which stylesheets does the browser view have, and what does each hold?
- D-445 — How does the figure of a character stand on the screen Postać?
- D-446 — What does the screen Postać show beside the figure of a character?
- D-447 — What does the screen Postać say of what the character does now?
- D-21 — How does time pass in a map run the player starts?
- D-55 — How many manual map runs go on at a time?
- D-129 — How long does the pace the player picks stay?
- D-130 — Where does the player pick the pace, and with which control?
- D-131 — Which changes of the program a map run carries out reset its solving progress?
- D-132 — What does the screen show, and what can the player do, after a completion?
- D-133 — Where does the player see a map run's streak and a map's solving condition?
- D-134 — Where does the player see that a map is solved?
- D-135 — Does the game show the longest streak of a map run?
- D-149 — When does the game offer a map opened by another map?
- D-215 — Where does the player read that a manual run of a solved map pays no practice?
- D-51 — What team does a new game start with?
- D-52 — How is a character named?
- D-54 — In what order do the characters of the team stand?
- D-56 — How does the game state tell one character from another?
- D-57 — In what unit does a character's warmth stand?
- D-62 — What does the screen show, and what can the player do, after a character's death?
- D-216 — Where does the player read what a death took and what a completion returned?
- D-217 — What does the game show of a character's resurrection?
- D-218 — How does the headquarters show a character's generation number?
- D-219 — Whose clock counts the renewal of a resurrection?
- D-221 — When is a character's death settled?
- D-64 — What does the backpack's cap count, and what sets its height?
- D-70 — How does the browser view show a campfire?
- D-373 — How does the flame of the campfire show how long the fire has left?
- D-444 — How do the game's data tell an item from a resource?
- D-141 — When do combat turns take effect?
- D-143 — What does the first wolf attack reveal?
- D-147 — What record of an encounter does the player read?
- D-148 — Where is an attacking creature pictured today?
- D-151 — Whose health do combat conditions compare?
- D-178 — What does the body row show of a mage's nature energy?
- D-191 — How does a character skill grow?
- D-192 — What describes a character?
- D-195 — When does a character skill tree become known?
- D-196 — Which branch actions does the program editor offer outside a map run?
- D-198 — What does the exploration branch Zwiad do?
- D-199 — What does the screen Postać show of character skills?
- D-200 — Where does the player buy a branch rank, and when does it act?
- D-201 — What does the map-run view show of its practice?
- D-118 — When does the player learn what the world holds?
- D-119 — Whose is the knowledge of the world, and what may a character use of it?
- D-122 — What does a map run do, and what does the player see, when something is discovered?
- D-125 — What do the body row, the backpack, the list of revealed tiles and the drawing of the game map show of what is not yet discovered?
- D-312 — How does the band of a discovery name the program rule the game wrote?
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
- D-314 — What does the background of the scene show?
- D-315 — Where does the tint of the scene's light stand?
- D-316 — What does the scene show, and from what does it draw?
- D-317 — How long do the scene's effects last?
- D-318 — Where does the mage go for each action?
- D-319 — How does the mage walk to its place?
- D-320 — What stands over the mage's head?
- D-321 — Does a click on the scene do anything?
- D-322 — What does the scene show while time stands still?
- D-364 — How does the mage show a gathering?
- D-365 — What flies when something is gathered?
- D-366 — Where does the dust of a miss stand?
- D-367 — Which readings of the game show an effect of the end of a gathering?
- D-372 — What does the frost on the edges of the scene's frame show?
- D-415 — Who judges the colour of an effect against the prop it stands at, and whether another element of the scene covers it?
- D-439 — How does the game judge a program before an earning loop?
- D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?
- D-441 — Where does the game keep the last judging of each character, program and map?
