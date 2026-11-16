# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 167. Listed by heading alone: 126.

## Listed in full

### D-01 — What runs the account and save server?

The account and save server is written in TypeScript and runs on Node.js 24 LTS. Its TypeScript types are checked before deployment.

- **Scope:** account-server, build-tools

### D-02 — How does the account and save server handle HTTP requests?

The account and save server uses Express 5 on Node.js 24 to route and handle HTTP requests and responses.

- **Scope:** account-server, build-tools

### D-03 — How is the browser view built?

The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.

- **Scope:** browser-view, build-tools

### D-04 — What is the game built with?

The game is written in TypeScript and runs in the browser. Its simulation is a set of pure functions, of which those that pass game time take a game state and a span of game minutes and return the next game state together with the events it produced, and real time enters the simulation only as an argument. The browser view draws the game only from the game state, the game's content data, the moment of the browser's clock, which it reads and passes to the simulation, and, for the scene and the chronicle, its previous reading of the game state and the events the simulation returned, for the chronicle also the player's acts on the copy with the copy before each act and after it (D-348), for the end-of-run window the page's memory of whether it is open (D-371), and for the scene the place the browser gives for the mage while it walks, and changes the game state only through functions of the simulation, to which it passes the player's choices, the passing of real time and a saved game state the browser downloaded from the server or the unsaved game state it kept in the page's memory after a save found no session (D-211).

- **Scope:** browser-view, build-tools, simulation

### D-05 — What serves the built game and account requests in the container?

One Node.js process running Express 5 serves both the built game's static files and the `/api/` account and save routes in the loop2 container. An unmatched `/api/` request receives an API error, not the game's HTML page.

- **Scope:** account-server, build-tools, deployment

### D-06 — How are the browser and server built together?

The browser and server share one npm package and lockfile, and have separate TypeScript compilation configurations and output directories. Building the application type-checks the simulation's files under a third configuration of their own that emits nothing, compiles the browser and server configurations and bundles the browser's code, React included, into the files the server hands out.

- **Scope:** build-tools, browser-view, simulation, account-server

### D-07 — How is the work of the game split between the server and the browser?

The server holds the players' accounts and each player's saved game state, and computes nothing of the game. The browser computes the whole game — the map runs, the earning loops and the catch-up — and sends the saved game state to the server.

- **Scope:** account-server, browser-view, simulation

### D-18 — Where does the game's content live?

The game's content — game maps, items, creatures, character skills and their numbers — stands in data files. A game map, an item or a creature of a kind the simulation already handles is added by a change of data alone.

- **Scope:** simulation, browser-view

### D-229 — How does the account and save server access SQLite?

The account and save server accesses its SQLite database through Node.js 24's built-in `node:sqlite` module, without an external SQLite driver. A Node.js release is deployed only after the server's database read, write and backup operations have been checked on that release.

- **Scope:** account-server, build-tools, deployment

### D-237 — How is a Node.js release checked before it is deployed?

A build step of the server image's final stage, run as the server's own user on the image's own Node.js release, makes a temporary database through the server's database code, writes and reads back an account and a saved game state, makes a backup by the method of D-236 and in its one backup step, opens that backup, reads the same values and prints the release it checked, and any difference or error fails the image's build. The Node.js image stays unpinned.

- **Scope:** account-server, deployment

### D-263 — Which tool bundles the browser's code?

esbuild bundles the browser's code when the application is built.

- **Scope:** build-tools · browser-view

### D-266 — Where does the output of the browser's compilation stand?

The per-module output of the browser's compilation stands in `dist/browser/`, where tests import it and from where the bundle is made, and `dist/public/` holds only what the server hands out: that bundle, the page and the static files. A build that writes them first removes both directories.

- **Scope:** build-tools · browser-view · simulation · account-server

### D-96 — What does a player see before and after signing in?

A signed-out visitor sees one card on a picture of the game: the game's name, one sentence about the game from the game's data, a switch between „Zaloguj się” and „Załóż konto”, the form of the state picked — email and password with the button „Nie pamiętam hasła”, or email, password and repeated password — and the folded credits, with neither headquarters nor program panel visible; that button puts in the card the form „Nie pamiętam hasła” with an empty field „Adres e-mail” and the buttons „Wyślij odnośnik” and „Wróć do logowania”, the last of which brings back „Zaloguj się”, and a page opened by a password-reset link shows the form „Ustaw nowe hasło” (D-225) in the card, for a signed-in player too, and builds no game while that form stands. Anyone can create an account without operator approval or email confirmation and immediately enters Siedziba signed in; signing in with email and password, and reloading with a valid session at an address with no fragment, that form apart, also lead to Siedziba, or, when the saved game state holds a manual map run, to that map run — paused while it goes on, or on its screen after its end when it ended in a completion or in the character's death — while a reload at another address stays on the screen that address leads to, and after an emailed link (D-156, D-224) the page opens Siedziba. The browser constructs the game only after the server confirms the session and then answers with the account's saved game state or that it has none, and an unavailable or uncertain answer to either request shows a warning and retry rather than an anonymous game or a new one, as does a load that meets an error of the code (D-213), which discards nothing, with „Nie udało się wczytać gry. Spróbuj ponownie.” in `warning`; a saved game state that the game discards — of another version, naming an archetype missing from the data or of a shape the game does not admit — starts a new game, above which stands once, in `warning`, „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” for the first two and „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” for the last.

- **Scope:** browser-view, account-server

### D-97 — What does the player's logout do?

The shared „Wyloguj” button stands in the menu „Konto”, first saves the current game state on the server while it reads „Wylogowywanie…”, and then ends only this browser's server-side session; a tab that stopped saving after the refusal of D-210 ends it without saving. When that save fails for want of a connection or by an error of the server, logout does not happen and the game stays with „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.” in `warning`; when the server refuses the save as based on an earlier save than another browser's (D-209) or as too large (D-208), logout goes on; when it refuses it as of a lower version (D-210), and when the tab had already stopped saving after that refusal, logout goes on and the account forms show „Gra została zaktualizowana. Odśwież stronę.” in `warning` above them; and when it answers that there is no session, the game ends as D-211 gives. A confirmed logout returns to the account forms and hides the game, while a failed server operation keeps the game with a warning instead of claiming that logout succeeded; logout disposes the mounted game's timers and owned events, and stale account responses cannot remount it.

- **Scope:** browser-view, account-server

### D-98 — Which player passwords are accepted?

A player password has from 12 through 128 Unicode code points of any kind, without a digit or uppercase-letter requirement, and its content is preserved without trimming or normalization. Registration's repeated password and the repeated new password of a password reset equal the password exactly, a new password keeps to these rules with registration's sentences and is never compared with the account's old password, and browser validation uses the same code-point interpretation without making UTF-16 field limits authoritative.

- **Scope:** account-server, browser-view

### D-99 — How are player email addresses compared and checked?

The account server normalizes email with ECMAScript trim and lowercase, stores the normalized address uniquely, and accepts its form when exactly one `@` has nonempty text on both sides. It imposes no dot, DNS or ASCII restriction; confirmation establishes whether the address is real.

- **Scope:** account-server, browser-view

### D-100 — What do duplicate registration and failed login tell the player?

Registration with an email address that already has an account shows „Konto z tym adresem już istnieje.”. A credential login with an unknown address or a wrong password shows „Nieprawidłowy adres e-mail lub hasło.” without distinguishing the two, and so does, whatever the account's block, a login with the password that was right when it was checked and that a password reset replaced meanwhile, which is neither a failed nor a successful login for the attempt limits of D-102; a blocked account's correct password is refused as D-139 gives.

- **Scope:** account-server, browser-view

### D-259 — Which state does the login card open on, and what stands above its fields in each state?

The login card opens on „Zaloguj się”. The switch stands only in „Zaloguj się” and „Załóż konto”, where the form has no heading; „Nie pamiętam hasła” and „Ustaw nowe hasło” have a heading and no switch, and the ways out of them are „Wróć do logowania” and „Anuluj”.

- **Scope:** browser-view

### D-260 — What does the switch of the login card do to what the visitor typed?

A change of state at the switch of the login card empties every field and removes every message of the card's forms and moves focus to the address field of the form it opened, as the button „Nie pamiętam hasła” does, and the page's one sentence (D-261) stays.

- **Scope:** browser-view

### D-261 — Where does the page's one sentence stand on the login card?

The one sentence of the page that D-97, D-156, D-160, D-211 and D-225 put above the account forms stands in the login card, above the switch, and above the form where no switch stands. It stays while the card changes state and leaves only at a change between the card and the game.

- **Scope:** browser-view

### D-262 — What stands on the screen of the login card, and where do the waiting screens stand?

Nothing stands on the screen of the login card but the card, not even the header. The waiting screens — „Sprawdzanie logowania…”, „Potwierdzanie adresu…”, the warning with „Spróbuj ponownie” and the moment after a sign-in that succeeded — stand outside the card, with the header, for a signed-in player too. When React takes the card down after an exception no code of the game handled, the sentence „Coś w grze się zepsuło — odśwież stronę.” stands alone in the card's place (D-323).

At each entry into the warning with „Spróbuj ponownie”, the first and one after a retry, focus moves to that button. The button is one element through the refusal, the retry, in which it reads „Sprawdzanie…” and is disabled, and the next refusal.

- **Scope:** browser-view

### D-278 — Where does the login card stand in the height of the window?

The top edge of the login card stands at 15% of the window's height, whatever the card holds, so the unfolding of the credits, a change at the switch and a sentence appearing under a form move nothing above them.

- **Scope:** browser-view

### D-381 — How does the page open, focus and close the login card, and what does the card do while a form waits?

The page opens the login card as an object it creates, focuses and closes: an element that holds the whole card from the moment the card is created, a call that moves focus to the first field of the form the card stands on, and a call that closes the card and takes the element out of the page with whatever it holds; every opening is a new card, so nothing typed, a password included, outlives the card and an answer awaited by a closed card changes nothing. The card takes no focus when it opens — the page moves focus to it only after a confirmed logout, after a logout the server answers with no session, after a password was set, after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło” — and the card closes from its own handlers of an answer and of a click, never while it is being drawn. While a form waits for the server's answer the whole card is locked, every field and button, the switch and „Nie pamiętam hasła” included, with the folded credits alone staying usable; a second send before the lock is drawn changes nothing, a press of the switch at the state already shown clears nothing and moves no focus, and when the lock lifts focus returns to the control the player sent from, or to the button of the form.

- **Scope:** browser-view

### D-203 — What happens to unsaved progress when a session expires?

If a player's session expires while the game runs, the browser keeps the unsaved game state. After the player signs in again to the same account, the game retries saving that state.

- **Scope:** browser-view

### D-204 — How does the browser exchange saved game states with the server?

The browser loads and sends whole saved game states through HTTPS request-response endpoints, using JSON and the browser's `fetch()` API. It loads its account's saved game state with `GET /api/saved-game`, whose success answers either that saved game state with the version of its shape and its revision or that the account has none, and replaces it with `PUT /api/saved-game`, whose body holds the version of the shape, the revision the browser last saw and the game.

- **Scope:** browser-view, account-server

### D-205 — Where are player accounts and saved game states stored?

The account and save server stores player accounts and each player's complete saved game state in a SQLite database file on persistent local storage outside the replaceable application container layer.

- **Scope:** account-server, deployment

### D-206 — What happens to a saved game state of another version?

A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one. The game discards a saved game state of any other version, loading none of it as a game, and starts the player anew; the server keeps the document that a save of a higher version replaces as the previous save (D-399), and an account with the previous-save privilege (D-400) can append its programs one by one (D-401). A saved game state whose character names an archetype missing from the data is also discarded whole.

- **Scope:** simulation, browser-view

### D-207 — When does the game save the game state on the server?

The game saves the game state on the server by itself right after each change of it the player makes — an edit of a program or of the copy, an act on the list of programs, creating a character, sending one, „Puść w pętlę”, „Zatrzymaj”, „Odbierz”, buying a branch rank, „Restart”, „Zakończ”, „Zamknij” of the report, a pause and a pace — right after a manual map run ends in a completion or in the character's death, right after a reading of the clock or a catch-up whose result ended map runs of earning loops, with one save for that result, every 30 real seconds while a manual map run passes, and once more when the page becomes hidden, closing included, with no guarantee that this last save arrives. The 30-second rhythm and the hidden page send the game state only where it changed since the save last sent, or where the save last sent failed, the save time of a document being no change of it; the browser has at most one save request in flight, each sent with `keepalive`, and a moment of saving during one is sent after its answer, unless that request is the save before a logout that goes on (D-97). A save whose body is larger than 64 KiB is not sent and counts as refused as too large (D-208).

- **Scope:** browser-view

### D-208 — What does the player see of saving the game state?

A save of the game state that succeeds shows nothing. When one fails, the header line under the menu bar shows „Nie udało się zapisać postępu. Gra spróbuje ponownie.” in `warning`, or, once the save before a logout has failed, the sentence D-97 gives for that failure, and the game retries the save after 5, 10 and 20 real seconds and then every 30 real seconds, each time with the game state of that moment and at once at a moment of saving of D-207, until a save succeeds and the sentence goes. When the server refuses a save as larger than its limit of D-104, the game does not retry that save but tries again at its next moment of saving, and the same line reads „Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.” in `warning` until a save succeeds; the game sets no limit on the number of earning loops, and the limits of a save stay as D-104 and D-207 give them.

- **Scope:** browser-view

### D-209 — Which browser's save of the game state does the server accept?

The server gives each save of the game state it accepts a revision one higher than the one before, starting at 1, and accepts a save only when it names as its basis the revision of the saved game state the server holds, or 0 where the account has none, refusing every other. The browser whose save it refuses so drops its unsaved game state, loads the server's saved game state — a manual map run that went on coming back paused (D-212) — shows „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” in `warning` on the header line of D-208 until its first successful save, and plays on from the loaded state, saving as D-207 gives.

- **Scope:** browser-view, account-server

### D-210 — What does the server do with a save of the game state whose version differs from the one it holds?

The server refuses a save of the game state whose version of the shape is lower than the version of the saved game state it holds, comparing that number before the basis of D-209 and reading nothing of the game. The tab whose save it refuses so shows „Gra została zaktualizowana. Odśwież stronę.” in `warning` on the header line of D-208 and saves nothing more, while the game stays on its screen. A save it accepts whose version is higher than that of the saved game state it holds moves that saved game state to the previous save (D-399) in the transaction that writes the save, the server comparing the two numbers and reading nothing of the game.

- **Scope:** browser-view, account-server

### D-211 — What does the player see when a save of the game state finds no session?

When the server answers a save of the game state that there is no session, whatever ended it — an expiry, a block of the account (D-137) or a password reset (D-138) — the game leaves the screen and its time stops, the account forms return with „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” in `warning` above them, and the unsaved game state stays in the page's memory only, never in the browser's lasting storage, so a reload or a closing of the page before signing in loses it. After a sign-in to the same account the game sends that state and goes on from it, a manual map run in it coming back as D-96 and D-212 give; after a sign-in to another account the state is dropped and the game loads that account's saved game state.

- **Scope:** browser-view

### D-212 — How does a manual map run come back from a loaded saved game state?

A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów”; one that ended in a completion or in the character's death comes back with its screen after its end, with „Restart”, „Zakończ” and the copy open to editing as D-62, D-132 and D-173 give, and with the end-of-run window (D-368) open again, holding all it held but „Ostatnie minuty”, which stand only where the chronicle holds the entries (D-339), and the screen the page opens on is the one D-96 gives. No time that passed between the save and the load advances it, the computing of time away included.

- **Scope:** simulation, browser-view

### D-386 — Which game states does the load of a saved game state admit?

The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards. A moment of real time that the game state stores, the save time and the moment the account's resurrection is ready, is a safe integer of milliseconds of any sign, which the load takes without comparing it with any clock; the function that stamps a save time, the function that settles a death and the function that settles the first completion of a map refuse a moment that is no safe integer with a RangeError, and the last two read no moment where there is nothing to settle.

- **Scope:** simulation

### D-399 — Which saved game state does the server keep beside the current one?

The server keeps for every account, with the previous-save privilege (D-400) or without it, at most one previous save: the saved game state that an accepted save of a higher version (D-210) or a reset (D-402) replaced, a later move replacing the previous save an earlier one left. The previous save is a saved game state of the same form as the current one, with the version, the revision and the game as the server stored them, held to the limit of D-104 and removed only with its account, and the server computes nothing of it (D-07). No other act writes it — not a save of the same version as the stored one, a first save, a refused save, the blocking or unblocking of the account, the granting or revoking of the privilege or a load — and the load of the game never reads it, so the game loads the saved game state of D-204 alone.

- **Scope:** account-server, simulation

### D-400 — What is the previous-save privilege and who gives it?

The previous-save privilege is a flag on the player account, off when the account is created, which the operator grants and revokes, naming the account by its email address normalized as at login, with the command `account-previous-save` run in the `loop2` container as D-137 gives for the block — the command reports that the privilege was granted or revoked, that the account already was in the state asked for, or that no account has that address, and changes nothing when it refuses — and only a human runs it on the server. One flag covers pulling the programs of the previous save (D-401) and the reset (D-402), and the server reads it in the request: `GET /api/previous-saved-game` and `POST /api/saved-game-reset` answer JSON 403 with the code `previous-save-forbidden` to a signed-in account without it, whatever its previous save holds. The answers that carry the account — `GET /api/account`, the login and the registration — hold the flag as the boolean `previousSaveAllowed` and nothing of the previous save, so the page shows no control for the privilege and sends no request for the previous save or the reset where the flag is false.

An account with the owner role (D-410) also grants and revokes the privilege of any account, an account with the owner role included, from the owner panel, by `POST /api/owner/grant-previous-save` and `POST /api/owner/revoke-previous-save` with the account's email address in the body, which the server answers only to a valid session of such an account, with the answers `granted`, `already-granted`, `revoked` or `not-granted` and JSON 404 with the code `unknown-account` where no account has that address, and which change nothing when they refuse; a grant or a revoke through the panel, like through the command, ends no session and stops no link, and the command stays beside the panel. The address in the body of those routes is normalized as at login, and an address written as no address is the address of no account.

- **Scope:** account-server, browser-view, deployment, agent-workflow

### D-401 — How does an account with the privilege pull the programs of its previous save?

An account with the previous-save privilege has on the screen Programy, at any time that screen is shown while its previous save exists, the button „Wciągnij programy z poprzedniego zapisu”, which fetches the previous save again and appends its programs to the end of the player's list; an account without the privilege, or with no previous save, has no such button. The programs are read by a reader of their own, `src/browser/sim/previous-programs.ts`, apart from the load of D-206 and D-213, which reads from the document only its version, from 1 up to the game's current one, the list of programs of its game and the items of that list, takes an item only when its keys are exactly `id`, `name` and `program` and its name is not empty after trimming, accepts the program of an item only through the check the program editor uses, skips every other item and goes on, and throws for no value a document can hold. Each program appended takes the next program number (D-165) and its trimmed name, or, where that name is taken, the name, a space and „(n)” as D-169 gives, nothing else of the game state changes and the game saves at once (D-207); one sentence beside the button then tells how many programs were appended and names every program skipped, or that the previous save holds no program this version of the game can read, that there is no previous save, or that it could not be fetched.

- **Scope:** simulation, browser-view

### D-402 — How does an account with the privilege start the game from zero?

An account with the previous-save privilege has in the game the control „Zacznij od zera”, which opens a confirmation saying that the present game goes to the place of the previous save, that a previous save already there is replaced and its programs can no longer be pulled, and that the game starts from zero; the click that opens the confirmation changes nothing, and an account without the privilege has no such control. After the confirmation the page sends no save of its own and sends `POST /api/saved-game-reset`, holding while it waits the outcomes of the old game's saver, which it acts on only if the reset fails, with the control disabled and „Wyloguj” not pressable, and the server, in one transaction that reads the account's blocked state, its privilege and its saved game state, moves the saved game state to the previous save (D-399) and leaves the account with none, answering 204 also where there was nothing to move. On 204 the page replaces the game with a new one built as for an account with no saved game state, revision 0 and no save sent at once, with one sentence above it that the game starts anew and the previous game waits as the previous save; D-209 is unchanged, so a save of the old game that reaches the server later, based on a revision other than 0, is refused.

Where an error that no code of the game handled came first (D-323), a reset that succeeds closes the game that stood, with its saving, and builds none, so the page shows the waiting screen with the sentence of the failure alone. An outcome of the saver of the game a reset built is not held for the logout of the old game, which may still wait for its answer.

- **Scope:** account-server, browser-view

### D-403 — What does the load do with a saved game state whose Understanding lacks „Eksploruj”?

The load refuses a saved game state whose Understanding does not hold the condition „Zawsze” and the action „Eksploruj”, as a saved game state of a shape the game does not admit: the game discards it whole and starts the player anew, above which stands „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” (D-96), and the version number of the shape stays as it is.

- **Scope:** simulation

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

The game has the screens Siedziba, Postać, Mapy, Programy, Wiedza and Przejście, all of one content width under one menu bar: at most 1344 px, and the full width of a narrower window. The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy, Programy and Wiedza, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it. The name of a character on its card on Siedziba leads to the screen Postać of that character, on which the menu bar marks Siedziba, on the screen Mapy under each of its addresses the menu bar marks Mapy, and on the screen of a map run the menu bar marks no item. A player reaches a first map run from Siedziba in at most three clicks: the choice of a map, the map's row and „Wejdź”.

An account with the owner role (D-410) has one more screen, the list of accounts (D-411), of the same content width, which is no item of the bar: the menu „Konto” of such an account holds, after the address and before its buttons, the link „Panel właściciela” to `#/konta` (D-281). The items of the bar and the bar itself are the same for a player and for an account with the owner role, and the menu „Konto” of a player holds no such link.

- **Scope:** browser-view

### D-281 — How does an address name a screen?

An address names a screen in the fragment after `#`: `#/`, `#/postac/{n}`, `#/mapy`, `#/mapy/{map}`, `#/programy`, `#/programy/{n}`, `#/wiedza` and `#/postac/{n}/przejscie`, {n} being the number of a character (D-56) or of a program (D-165), {map} the identifier of a map (D-332) and the last address naming a map run by the number of its character, and an address that leads to no existing screen silently opens the nearest one: `#/postac/{n}/przejscie` with no map run the screen Postać of that character, `#/programy/{n}` with no such program `#/programy`, and any other Siedziba, the address of a map that is not on the list of open maps included. The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself. The fragments of emailed links (D-156, D-224) stand apart from these, and after them the page opens Siedziba.

`#/konta` names the screen of the list of accounts (D-411) for an account with the owner role; for any other account it leads to no existing screen, falls under „any other” and opens Siedziba.

- **Scope:** browser-view

### D-282 — What do the screens leave room for from the start?

Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws the team as a section with a heading, and the rule panel offers its pick in steps, the action first and its target after it.

- **Scope:** browser-view

### D-285 — How does the menu „Konto” open and close?

The menu „Konto” opens on a click and from the keyboard, and closes on Escape, on a click outside it and on a second click on „Konto”; after Escape and after a second click on „Konto” focus returns to „Konto”, after a click outside it focus stays where the player clicked, and where that place takes no focus it returns to „Konto”. It stays open while „Wyloguj” or „Wyślij ponownie” waits for the server, and after the answer until the player closes it, so the sentence of the outcome can be read.

- **Scope:** browser-view

### D-286 — How long does the page's sentence stand above the game?

A sentence the page puts above the game, such as „Adres e-mail potwierdzony.” or the sentence of a discarded saved game state, stands above the first screen the game opens on and leaves at the first change of screen.

- **Scope:** browser-view

### D-323 — What does the game do, and what does the player read, after an error that no code of the game handled?

After an error that no code of the game handled, an exception or a rejected promise, the game state held in the page changes no more until the page is reloaded, and saving goes on as D-207, D-208 and D-97 give it, sending the last whole game state from before the error, which it reads without a new reading of the clock; the page builds no game until it is reloaded, so a sign-in, whatever load or kept game state it leads to, stays at the waiting screen with the sentence, and the catch-up of D-247 and the send of the state kept by D-211 do not run. Until the page is reloaded the sentence „Coś w grze się zepsuło — odśwież stronę.” stands once, in `warning`: on a screen with the header, a game screen or a waiting screen, in the row under the menu bar beside the sentence of a failed save, on the screen of the login card in the card under the form, and, where React takes the card down, alone in the card's place (D-262), and at the waiting screen where a sign-in after the error stays it stands alone, with no „Sprawdzanie logowania…” beside it. The page writes the line of the error as D-253 gives it.

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

The screen Wiedza shows the actions, items and creatures in the Understanding and the skill trees to read, with no levels and no buying. Its left area is as in the predecessor game, loop: the heading „Zrozumienie” with the counter „{n} poznanych rzeczy”, three groups „Czynności · {n}”, „Przedmioty · {n}” and „Stworzenia · {n}”, each in the order of discovery with the newest thing last, a group with no thing standing nowhere, the campfire standing among the items, and no sentence for an empty area. Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data, the wolf the icon `wolf-head` from game-icons.net, as in loop. Its right area has the heading „Umiejętności” with the counter „{n} drzew”, the trees the player knows in the order of the data, each a folded row with its name and „{n} gałęzi”, opened by a click or the keyboard, and an open tree shows each branch with its name, „{n} stopni”, its description from the data and the prices of all its steps in turn; each entering of the screen starts with the trees folded, and before the first known tree the area stands nowhere.

The counter „{n} poznanych rzeczy” counts the actions, items and creatures together, with no condition and no tree. The counters of the screen decline by the number, as in loop: „1 poznana rzecz”, „3 poznane rzeczy”, „13 poznanych rzeczy”, „1 drzewo”, „3 drzewa”, „8 drzew”, „1 gałąź”, „3 gałęzie”, „1 stopień”, „3 stopnie”.

- **Scope:** browser-view

### D-421 — Which stylesheets does the browser view have, and what does each hold?

`src/browser/styles.css` stays the shared stylesheet of the game, the game's stylesheet of D-47 and D-265 that keeps the one `:focus-visible` rule: it holds the base rules, that rule, the menu bar, the rows of sentences, the shared controls and the rules of what the kitchen-sink page draws besides the controls — the drawing of the map (`terrain-drawing`), the table of tiles (`tile-list`), the form (`form`) and the block of the account menu (`account-menu-block`). It holds also the common layout of the screens — the place of the screens (`.app-main`, `.screen`, `.screen-area`) and the columns of Programy, Mapy and Wiedza with their `@media` — and each rule that the elements of several screens need, that cannot be divided without changing its text and that belongs to no part with a stylesheet of its own, as the rules of the credits that name the login card and Siedziba belong to `credits.css`: a rule whose selector list names classes of more than one screen, or the rule of a sentence that several screens draw, which today are, besides those columns, the sentence `trip-warning` and the animation of the frames of the sprites of the scene and of the camp. Each screen and every other part that several screens use has a stylesheet of its own, a `.css` file directly in `src/browser/`, which a `<link>` of its own in `src/browser/index.html` gives to the player and which the build copies as it copies the other files of that kind, with no change of the build; the kitchen-sink page links the file of design tokens, `src/browser/styles.css` and its own stylesheet alone.

- **Scope:** browser-view

### D-27 — Where do the game's icons come from?

The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory the account and save server serves and copied into that directory when the application is built. An icon file holds nothing that runs and refers to nothing outside itself. A section of credits, folded and opened with one click, stands on the login card and at the bottom of Siedziba, as its last part, and credits each icon with its title as game-icons.net gives it, its author, its page on game-icons.net and its licence, and says how the icon file differs from its source.

- **Scope:** browser-view, build-tools, simulation

### D-38 — Which styleguide discipline does loop2 adopt for the browser view?

Loop2 adopts the styleguide template of its pinned the-way, with no departure, for the user interface the part browser-view draws: its styleguide holds every rule and example the template requires, in the template's order, and drops none.

- **Scope:** browser-view, agent-workflow

### D-39 — What do the signal colours of the browser view mean?

In the browser view the role `positive` means that something works, is in order or is active now; `warning` means caution, that something is not carried out or is not saved, a wrong value typed into a field included; `danger` means that a character, progress or data may be lost; `discovery` means that something new was discovered; and `player-change` means that the player did it. Each of the five is a role of the kind text and stands as text on the backgrounds `page`, `panel`, `highlight`, `rule-winning` and `rule-running`. `positive` and `warning` also stand as the state bar of a program rule and of a rule group, which says the state of the rule, is no frame or bar at a text in the sense of D-279 and takes no colour from the text beside it. `positive` also stands as the fill of the progress bar over the mage's head, on a track in `highlight` in a badge on `panel`, with a contrast ratio of at least 3:1 against what it stands on; `warning` stands in no progress bar. `positive` also stands as the fill of the bar of a met requirement of the solving condition in the header, on a track in `highlight`, with a contrast ratio of at least 3:1 against what it stands on. `positive` also stands as the text of the button „Odbierz”, which pays the practice waiting at an earning loop, at rest and under the pointer. `discovery` also stands as the frame of the plaque of a discovery in the scene, which is a solid `panel` like the badge over the mage's head, with a contrast ratio of at least 3:1 against `panel`.

- **Scope:** browser-view

### D-40 — What do the neutral roles of the browser view mean?

In the browser view the background `page` means that here is the game, `panel` a block set apart, and `highlight` that this row or track is marked or that this control is under the pointer, `rule-winning` that this program rule wins now, and `rule-running` that this program rule's action is being carried out; `divider` means that one section ends and the next begins, `control-border` that something can be clicked or typed into, `selected` that this is the one chosen in its group, and `condition-unmet` that the condition of this program rule or rule group does not hold. Of the roles of the kind text, `text-strong` means a name, heading or value looked at first, `text` content to read, `text-secondary` a description, explanation or note, `text-label` the name of a field or section, or a date, and `text-disabled` that this cannot be used now. Each of the five stands as text on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, and `text` is the text each of these backgrounds is written with. The badge over the mage's head stands on `panel` and the track of its progress bar in `highlight`, and the icon in the badge stands in `text-strong`, though it is no text and no text stands beside it; so does the icon flying to the mage, on its plaque in `panel`, and so do the icons of the drawing of the map, on `tile-revealed`, and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either. The bar of a requirement of the solving condition in the header has its track in `highlight` and, while the requirement is not met, its fill in `text`, though it is no text.

- **Scope:** browser-view

### D-41 — What do the roles of the terrain grid and of keyboard focus mean?

In the browser view `character` means that here is the character and here it is going, the target of its current move told from its place by shape, a thin dashed line in place of a thick solid one, never by colour; `tile-hidden` means a place not yet known, `tile-revealed` a place known, whose icons say what lies there, and `tile-edge` the border between tiles of either kind. `link-highlight` means that this tile and this row of the list of revealed tiles are the same place, `depleted` that what was here is gone, and `focus` that here is where the player is, using the game by keyboard.

- **Scope:** browser-view

### D-42 — Which accessibility requirements does the browser view keep?

Every screen of the browser view keeps four success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast, 2.3.1 Three Flashes or Below Threshold and 2.4.7 Focus Visible — and no other requirement of WCAG, with no date or event set for returning to it. Every role of the kind text but `text-disabled`, the signal colours included, has a contrast ratio of at least 4.5:1 on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, and `text-disabled` has no threshold. `control-border`, `focus` and `character` have a contrast ratio of at least 3:1 against the colours they touch, and so have `tile-revealed` against `tile-hidden` and the frame of the plaque of a discovery in the scene, in `discovery`, against `panel`; `condition-unmet` has no threshold.

- **Scope:** browser-view

### D-43 — What counts in the browser view as a value written in place of a design token?

In the files of the part browser-view other than its file of design tokens, a value written in place of a design token is a colour in any notation — hexadecimal, functional, a named colour or a system colour — in styles and in TypeScript and, in styles, a size or spacing in `px`, `rem` or `em`, a font name, or a unitless stroke width, dash pattern, opacity or font weight, those four unitless kinds being all. None is `0`, a percentage, a size in `fr`, `vw` or `vh`, a keyword such as `transparent`, `currentColor`, `inherit` or `none`, a screen-width threshold of an `@media` rule, the geometry of the terrain drawing or of the scene computed in TypeScript, the frames and positions of a sprite, the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid — or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it or, where no text stands beside it — in the badge over the mage's head, on the plaque of the icon flying to the mage and in the drawing of the map — from `text-strong`, and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either.

- **Scope:** browser-view

### D-44 — Which controls do the screens of the browser view build on?

The screens of the browser view build every button, select list, number field, text field and cell of a pick from the eight shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons, neutral until the pointer or the focus reaches them and then in `danger`, and „Odbierz”, which pays the practice waiting at an earning loop, is the plain button with its text in `positive` at rest and under the pointer (D-39). A control awaiting a server response is disabled with text in `text-disabled`, „Zacznij od zera” while its reset waits for the server among them; the button that sends a form then reads „Logowanie…”, „Zakładanie konta…”, „Wysyłanie…” or „Ustawianie…” for the corresponding form — „Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła” or „Ustaw nowe hasło” — and that form's fields are disabled, and the button „Wyślij ponownie” then reads „Wysyłanie…”, as the button „Wciągnij programy z poprzedniego zapisu” reads „Wciąganie…” while its pull waits (D-401). A form's server refusal and loss of connection appear as one sentence below the form in `warning`, the answer to a request for a password-reset link (D-222) appears in that place in `text`, with a bar on its left in its own colour (D-279) and never in `positive`, and the kitchen-sink page shows the waiting and refusal states of every form, „Nie pamiętam hasła” and „Ustaw nowe hasło” included, and the form „Nie pamiętam hasła” with that answer.

- **Scope:** browser-view

### D-45 — Where does the browser view's kitchen-sink page stand?

The kitchen-sink page of the browser view is built from `src/browser/kitchen-sink/` and opened on the developer's machine by its own command, `npm run kitchen-sink`, and nothing `npm run build` writes, which is what reaches the test server, holds it. The page shows every shared control in each of its states or the reason a state does not apply, every role, and samples of tiles in each state drawn with the roles, never a drawing of the game from a game state.

- **Scope:** browser-view, build-tools

### D-46 — Which fonts does the browser view use, and where do they come from?

The fonts of the browser view are Geist and Geist Mono, whose web-font files and licence file are taken from a release of github.com/vercel/geist-font into `assets/fonts/`, outside the directory the account and save server serves, and copied into that directory when the application is built. The game loads fonts only from those files, never from another server, and sets the chronicle and the clock of the map run in Geist Mono and every other text in Geist.

- **Scope:** browser-view, build-tools, deployment

### D-47 — Which elements of the browser view are controls, and how does their focus show?

A control of the browser view is every HTML element the browser lets the keyboard reach, links included, and the code marks none. One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`, and no other style or code of the part browser-view sets `outline` or an `outline-*` property, except that the kitchen-sink page's stylesheet repeats that rule with one more selector, for its sample of the focused state.

- **Scope:** browser-view

### D-48 — How are the design tokens of the browser view named?

In the file of design tokens of the browser view, each role of its styleguide's table of roles is the custom property `--<role>`, under the role's own name, and every other value of appearance is a custom property named by what it is for, never by its colour or by its number alone.

- **Scope:** browser-view

### D-271 — Where do the scene's pictures come from?

The scene's pictures and the picture of the game behind the login card are sprites of the packs Pixel Crawler and LPC Wolf, and the dust of a miss and the cloud of a scuffle are sprites of the pack Smoke & Fire Animated Particle [16x16] recoloured to the scene's colours, all kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built. The pictures of the camp at the top of Siedziba, its clearing, fire, chest and characters, are sprites of the pack Pixel Crawler kept there in the same way, and the chest is one still picture whatever it holds. A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, the game takes the pack LPC Wolf under its licence CC BY 3.0, and the character of the scene is the mage of Pixel Crawler. CSS may draw in the scene layers, such as the tint of its light, the cold layer of a death of cold and the frost, and specks, and the frost and the specks are squares of one pixel of the scene on its grid in colours of the palettes of the packs, while the colours of the tint layer and of the cold layer have their source in the human's choice; whatever has a drawing — a character, a creature, a thing — comes from a pack, and the colour of an effect stands out from the ground it stands on, the outline or the fill of the frost by at least 3:1 against the snow it lies on.

- **Scope:** browser-view · build-tools · deployment

### D-272 — Where may a picture of the game stand?

A picture of the game stands behind the login card, in a band at the top of Siedziba and as the scene, and text stands on a solid background, never on a picture.

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

The game works in the current releases of Chrome, Edge and Firefox on a computer, and Safari is outside that set. The smallest window the game supports has a page area of 1280 × 720 px, the area of the page inside the browser's window, not the resolution of the screen. A decision that defines how the game looks in a narrower or a lower window — D-280, D-282, D-311, D-349, D-370 and D-389 — keeps its meaning there; a fault of the look in a window below the smallest, where no decision defines it, is not fixed.

- **Scope:** browser-view, agent-workflow

### D-376 — What numbers does a condition on the body, the backpack, the campfire and the tile accept?

A condition that takes a number accepts it from a minimum to a maximum, both included, on a step counted from the minimum, and holds while the value it reads is below the number and not at it: „Temperatura poniżej” from 30.0 to 37.0 °C in steps of 0.1, with 36.5 at first; „Sytość poniżej” from 0 to 100 %, with 50; „Zapas poniżej” and „Tu leży mniej niż” from 0 to 50 pieces, with 8 and 1; „Zostało mniej niż — ognisko” from 0 to 120 minutes, with 20; „Energia natury poniżej” from 0 to 100 points, with 30; each of these but the first in steps of 1. The program check refuses a number that is no finite number, lies outside the range or off the step, and keeps a number on the step as the decimal with as many places as the step has, 36.6 and not 36.60000000000001. „Zdrowie poniżej” and „Przeciwnik ma poniżej” take the numbers D-151 gives.

- **Scope:** simulation · browser-view

### D-164 — Who owns a program?

Programs belong to the player, as one list shared by all characters; a character picks a program when it enters a map — by default the one it used last — and a manual map run or an earning loop carries out a copy taken at its start, except that a map run restart carries on the copy of the map run it replaces as it is, its unsaved changes included, and that during a manual map run the player can switch the character to another program, the map run going on with a fresh copy of that program. A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program; saving a copy over a program that changed since the copy was taken from it or last saved into it is announced, never blocked. A program can be edited at any time, and its saved change takes effect at the next manual map entry other than a map run restart, at the next switch to it during a manual map run or at the next start of an earning loop, never in an earning loop already running.

- **Scope:** simulation · browser-view

### D-165 — How does the game state tell one program from another?

Each program of the player carries a number the game gives it when the program is created, one more than the number the game state gave last, so the numbers of two programs of one game differ, a deleted program's number included. Each record of the game state that names a program — the program the copy of a map run belongs to, the program a character used last, the program picked for a character, the program with which a character last entered a map and the program the firing counts stand beside after „Zakończ” — names it by that number.

- **Scope:** simulation · browser-view

### D-166 — Where does the player see the player's programs and pick the one to edit?

The screen Programy holds on the left the list of the player's programs and on the right the program editor with the program picked there. That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone. On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it.

- **Scope:** browser-view

### D-167 — What can the player do with the list of programs?

The list of programs offers „Nowy program”, „Zmień nazwę” and „Usuń” and, to an account with the previous-save privilege while its previous save exists, „Wciągnij programy z poprzedniego zapisu” (D-401), and a new program holds one empty rule group named „Program”, whose condition is „Zawsze”. A program left alone on the list stays there, „Usuń” leaving it in place. The game has no action that duplicates a program.

- **Scope:** simulation · browser-view

### D-168 — What becomes of a map run whose copy's program the player deletes?

Deleting the program the copy of the map run belongs to leaves the map run going on with the copy, whose heading keeps the name the program had. „Zapisz w programie” and „Porzuć zmiany” are then gone, and the copy counts as holding unsaved changes: the line „Niezapisane zmiany w kopii.” stands and „Zapisz jako nowy program” is active until the copy is saved as a new program.

- **Scope:** simulation · browser-view

### D-169 — How is a program named?

The program of a new game is named „Program”, and a new program „Program 2”, „Program 3” and on, by the first free number. A program's name is the typed text trimmed of the white space at its start and end, and it is not empty; the game takes no name another program bears, comparing names regardless of letter case, and sets no limit to a name's length; a program that the pull of D-401 appends keeps its name where the list holds no program of that name, and otherwise takes the name, a space and „(n)” for the smallest n from 2 that makes the name free, counting the programs the same pull appended before it.

- **Scope:** simulation · browser-view

### D-170 — Where does the player pick the program a character enters a map with, and which one stands there first?

The player picks the program a character enters a map with on the select list „Program: {name}” at that character in the section „Kto idzie” of the card of a map. The list shows the first program still on the player's list of these: the program picked for that character before it is sent, which stays with the character until it is sent; the program that character used last, the program it was switched to during a map run included; the program with which any character last entered a map; the first program of the player's list.

- **Scope:** browser-view · simulation

### D-171 — How does the program panel show the copy and its unsaved changes?

During a map run the program panel shows the copy under the heading „Kopia: {program name}”. While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive; a copy whose program is gone shows as D-168 gives. „Zapisz jako nowy program” offers the first free name of a program, and after that save the copy belongs to the new program, which becomes the program the character used last.

- **Scope:** browser-view · simulation

### D-172 — How does the game announce a save of the copy over a program that changed?

While the program the copy belongs to holds changes made since the copy was taken from it or last saved into it, a line in the role `warning` beside the save buttons reads „Program {name} ma zmiany, których nie ma w tej kopii.” where the copy holds no unsaved changes and „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” where it holds some; „Zapisz w programie” then saves at once, in one click, and after the save the line is gone.

- **Scope:** browser-view · simulation

### D-173 — What can the player do with the copy after a map run ends?

On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or ends the map run with „Zakończ” or „Otwarte: {mapa} →”. „Zakończ” and „Otwarte: {mapa} →”, a button of the end-of-run window (D-368), with no unsaved changes of the copy end the map run at once, and with unsaved changes — „Zakończ” at any moment of a map run — they ask „Zapisać, odrzucić, wrócić?” in a band of the program panel just above the heading of the copy, or, while the panel shows another program, where that heading would stand, under the band of a discovery where one stands, whose sentence is in the role `warning` and whose answers „Zapisz”, „Odrzuć” and „Wróć” stand in that order, „Odrzuć” being a destructive button (D-44), and, where the program the copy belongs to holds changes the copy lacks, the line of D-172 stands under the sentence. „Zapisz” saves the copy as „Zapisz w programie” does, replacing the changes its program holds that the copy lacks, or, where its program was deleted, as a new program under the first free name with no name field, and ends the map run; „Odrzuć” ends it with no save; „Wróć” closes the question and leaves the map run as it was; where a button of the window asks, the window closes when the question stands and stays closed after „Wróć”, the player opening it again with „Koniec przejścia” in the header; after the map run ends the player lands where the button that asked leads, the screen Postać of its character for „Zakończ” and the screen Mapy with the card of the opened map for „Otwarte: {mapa} →” (D-53), and the program editor shows the program the copy belongs to, the new program where „Zapisz” made one.

- **Scope:** browser-view · simulation

### D-174 — How does the player switch the character to another program during a map run?

During a map run, picking a saved program on the program panel's list opens it for editing, and while the panel shows a saved program other than the program the copy belongs to, the button „Przełącz postać na ten program” stands under the list; its click switches the character to that program at once, and the panel shows „Kopia w przejściu” again. Beside the program the copy belongs to, the button is gone.

- **Scope:** browser-view · simulation

### D-384 — Which program does the program panel show when the one it showed is gone?

Where the program the program panel shows is gone from the player's list, or the number asked for names no program, the panel shows the first program of the list: after „Usuń” of the program shown; after „Zakończ” or „Otwarte: {mapa} →”, when the program the copy belonged to was deleted; and on Programy, when the address names a program the list does not hold (D-281).

- **Scope:** browser-view

### D-288 — How does the player write a program rule?

One program editor stands on Programy and on the screen of a map run. A rule's row reads as a sentence and a rule panel changes it, opening in place on the list under the row of the rule or the header of the rule group it changes, on both screens, and taking no column of its own: each pick moves on to the next field, conditions, actions and targets stand as cells in groups that the keyboard can reach, the conditions in two columns, and what the player may not pick stands greyed with its reason. Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle with such a line, with no arrows in the header of a rule group.

- **Scope:** browser-view

### D-292 — How does the program editor number rule groups and program rules?

In the program editor each rule group bears its number in the program, such as „2”, and each program rule the number of its group and its own number in that group, such as „2.1”.

- **Scope:** browser-view

### D-293 — What time of an action does the program editor show?

Beside a program rule's action, in its row and in the rule panel, stands the time one carrying out of the action takes, such as „10 min”, „tura” for an action of combat, for a movement during a map run the time of a step on that map, and nothing for a movement outside a map run.

- **Scope:** browser-view

### D-294 — Where does the program editor keep which rule groups are folded?

Which rule groups are folded lasts in the page's memory while the player moves between screens and goes with a reload of the page, after which every rule group stands unfolded; the saved game state does not hold it. Each new copy, made at a send and at a switch of the character to another program, has every rule group unfolded, the foldings of the copy before it passing to it no more.

- **Scope:** browser-view

### D-295 — What does a folded rule group show, and where does a rule dropped on it land?

A folded rule group shows its name, its condition and the number of its program rules, and a program rule dropped on it lands at its end while the group stays folded.

- **Scope:** browser-view

### D-296 — Where does the player change and delete a rule group?

A click on the header of a rule group opens the rule panel with the group's name and condition, and the group's „✕” stands in its header.

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

### D-289 — What does the rule panel show greyed, and with which reason?

The pick of the rule panel holds nothing undiscovered, and what is discovered but may not be picked stands greyed with its reason: a branch action the character of the map run has not bought, „gałąź niewykupiona”; such an action while the game holds no map run, „wybierzesz w przejściu postaci, która ją kupiła”; „Idź”, „Zbierz”, „Obchód”, „Tu leży mniej niż” and „Zapas poniżej” with no target to point at, „nie znasz jeszcze celu”; and a discovered target absent from the map of the map run, „nie ma go na tej mapie”. While the game holds no map run every discovered target may be picked, the actions of combat may be picked outside combat too, and a rule holding a value outside what may be picked shows it in the panel as picked and greyed, with its reason where one of those above fits and with none otherwise, and the player can change it.

- **Scope:** browser-view

### D-290 — How does the pick of the rule panel group its cells?

The pick of the rule panel sets the actions in four named groups: Ruch — „Eksploruj”, „Wędruj”, „Idź”, „Idź — ognisko”; Zbieranie — „Zbierz”, „Obchód”; Ogień — „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”, „Zasil — ognisko”; and Żywność i walka — „Zjedz — jagoda”, „Uderz — patyk”, „Kopnij”, „Odskocz”. It sets the conditions in two columns, in sections with no names set apart by a line: Zawsze; Temperatura, Sytość, Zdrowie, Energia natury; Zapas, Tu leży, Zostało mniej niż — ognisko, Z dala od — ognisko; Przeciwnik ma poniżej.

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

- **Scope:** browser-view

### D-308 — What state does a program rule show during a map run?

During a manual map run and on its screen after its end, until „Restart” or „Zakończ”, the rule of the copy that wins now stands on the background `rule-winning` and the rule whose action is being carried out, where it is another rule, on the background `rule-running`, except that a row open to editing stands on `highlight` in their place, keeping its bar, and a row under the pointer keeps the background of its state. A rule whose condition holds and whose action cannot be carried out names the reason, such as „tu nie leży mech”, and a bar at each program rule and rule group of the copy, below the winning rule too, is green when the condition holds and it can start, a rule group when one of its rules can, amber when the condition holds and it cannot start, and dark when the condition does not hold. A rule outside the character's repertoire shows amber with that reason whether or not its condition holds, unless the condition of its rule group does not hold: the bar of a rule counts that condition too, so every rule of such a rule group shows dark, with no reason, and a rule group whose condition lies outside the repertoire counts as one whose condition does not hold.

- **Scope:** simulation, browser-view

### D-309 — What do the signs of a program rule show in the minutes of an attack?

In the minutes of an attack, from the minute of the attack to the resolving of its turns, the signs of the copy show what the first combat turn would choose now, at the health of the mage and of the creature as they stand: the combat rule the turn would choose stands on the background `rule-winning`, no rule stands on `rule-running`, and an ordinary rule whose condition holds is amber with the reason „trwa walka”. Outside those minutes a combat rule whose condition holds is amber with the reason „tylko w walce”.

- **Scope:** simulation, browser-view

### D-310 — How does a program rule that cannot start name its reason?

A program rule whose condition holds and whose action cannot be carried out names one reason: when there are several, the one of combat comes first, then the world and the backpack, and the nature energy last. The reason names the thing refused as the game writes it, in lower case and without a dot before the name, such as „tu nie leży mech”, „brakuje 4 × patyk”, „brak opału: patyk” and „brak energii natury: 7 z 10”, and the reason of a rule outside the repertoire is „gałąź niewykupiona”, as of a greyed cell of the rule panel, or „jeszcze nieodkryte: {name}”.

- **Scope:** simulation, browser-view

### D-350 — Where does the rule panel stand while the rule group of its rule is folded?

A rule panel open on a rule whose rule group is folded stands directly under the header of that group, where the row of the rule is not drawn. Folding or unfolding that group, or every group at once, closes no panel and changes no field of it, and the panel stands under the row again when the group unfolds.

- **Scope:** browser-view

### D-363 — Where does the player read what an action costs?

The rule panel shows beside an action what it costs, read from the game's data, in brackets after the action's name, in the same text as the name, so that it takes the name's role and dims with a greyed cell — such as „Wytwórz — ognisko (6 patyków)” — at every cell of its pick, a greyed one included, and at the action chosen in the panel, where the time of one execution stands; the row of a program rule shows no price. The pieces an action uses up and the nature energy it takes stand with the names of the things in the form their count takes and the energy by its full name, such as „(2 patyki, 10 energii natury)” and „(1 jagoda)”, so the data of the game's things hold the plural forms of their names; an action that takes a piece of a use — fuel, food or a thing to light — names the first item the data marks for that use, as the reason of its rule does (D-310), and an action that uses up nothing has no price. During a map run the price follows the character of the map run, as the time does (D-293), so the character with the bought branch „Czysty płomień” reads „Zapal — ognisko (10 energii natury)”, while on the screen Programy and outside a map run the price is the data's, „Zapal — ognisko (2 patyki, 10 energii natury)”.

- **Scope:** browser-view, simulation

### D-53 — Where does the player send a character from, and where do the buttons that end a map run lead?

The player sends a character to a game map from the card of the map on the screen Mapy, and „Zakończ” returns to the screen Postać of that character. „Otwarte: {mapa} →” of the end-of-run window (D-368), which stands after a completion of a map that opens another, leads to the screen Mapy with the card of the map it opened.

- **Scope:** browser-view

### D-325 — What does the screen Mapy show?

The screen Mapy holds on the left the list of the maps open to the player, and on the right a card of the picked map with what it asks, its terrain, what lies there, what lurks there and what it takes, and a section „Kto idzie” with the characters, their program, what enters from the trip plan, „Wejdź” and „Puść w pętlę”.

- **Scope:** browser-view

### D-326 — What does the game say before an earning loop that earns nothing?

Where the bring list of the program picked is empty, „Pętla nic nie zarobi do skrzynki” stands in `warning` beside „Puść w pętlę”, and the button still acts.

- **Scope:** browser-view

### D-327 — What does the card of a map hold?

The card of a map follows the card of the predecessor game, loop, with its numbers taken from the map's data, and a part the map lacks stands nowhere: the heading names the map and, once it is solved, „rozwiązana” in `positive`, and for a map that another map opens „odsłania ją {mapa}” in `text-secondary`; „Żąda” holds the sentence of the map's solving condition (D-133); „Teren” holds the grid, the entry, the step, with „— drożej niż zwykle” or „— taniej niż zwykle” beside a step other than the usual one (D-333), and the minutes without fire (D-333) with the temperature of the surroundings; „Leży tu” holds each resource with its icon, the approximate number of tiles that hold it, its stock and its renewal, or „nie odnawia się” in `warning`; „Czyha” holds the creature with its icon, its health and blow, the chance of an attack in a minute, the quiet time and one total number, the mean gap between attacks counted with that quiet time; „Odbiera” holds the entry cap and the exit cap, each in `warning`. It departs from the card of the predecessor game in four things only: the line of an attack gives that one total number in place of the quiet time and the mean gap after it, an unsolved map shows no „otwarta”, „Odbiera” has no „gasi: {umiejętność}”, and „Żąda” is the one sentence of the condition from the data.

- **Scope:** browser-view · simulation

### D-328 — Does the card of a map show what the player has not discovered?

The card of a map shows all that the map's data holds, whatever the player has discovered, and the Understanding does not change by it: the program editor still offers no action or condition that the player has not discovered.

- **Scope:** browser-view

### D-329 — What stands at each character in the section „Kto idzie”, and in what order?

At each character in the section „Kto idzie” stand, from the top, the name as a link to the screen Postać, the line of the resurrection and, at a character in an earning loop, the line of the earning loop, „Program:” with its list, „Wejdzie: …” in `text-secondary` always, „Wejdzie: nic” included, the warning of a clipped plan, and „Wejdź” and „Puść w pętlę” with their warnings, the characters standing in the order of D-54. „Wejdź” opens the screen of the map run and „Puść w pętlę” leaves the player on the card. A team with no character has in the section the sentence „Drużyna nie ma jeszcze postaci. Załóż ją w Siedzibie.”

- **Scope:** browser-view

### D-330 — What is the first of the three clicks from Siedziba to the first map run?

The first of the three clicks from Siedziba to a first map run (D-280) is the item „Mapy” of the menu bar, and the row of the map and „Wejdź” follow it; no button at a character in Siedziba leads to the screen Mapy.

- **Scope:** browser-view

### D-331 — What does the screen Mapy show before a map is picked, and how does a row of the list look?

Under `#/mapy`, before the player picks a map, „Wybierz mapę z listy.” stands on the right in `text-secondary`. A row of the list is a link to `#/mapy/{map}` with the name of the map and, at a solved map, „rozwiązana” in `positive` after it, and the picked row looks as the picked program on the list of programs does: its text in `text-strong` and a bar in `selected` at its left.

- **Scope:** browser-view

### D-332 — What does {map} name in `#/mapy/{map}`?

In `#/mapy/{map}`, {map} is the identifier of the map in the game's data as it stands, such as `#/mapy/forestDeep`, and the address is built from the map's data.

- **Scope:** browser-view

### D-333 — How are the numbers of the card of a map counted, and where?

The numbers of the card of a map that follow a rule of the game are computed by functions of the simulation, from the map's data and beside the rules they follow, and the view only writes them out. The minutes without fire are the game minutes that a body, from its starting temperature and with no warmth, goes through on that map before the game minute in which it is first chilled, and the item stands only where the map cools the body below the threshold of chill; the tiles that hold a resource are its density times the tiles of the grid, rounded to the nearest whole; the mean gap between attacks is the cooldown of the attack plus the reciprocal of its chance in a game minute, rounded to a whole minute (D-142). The usual step is the step most maps' data give, the first of the data's order on a tie.

- **Scope:** simulation · browser-view

### D-389 — What does the camp at the top of Siedziba show, and how does it stand and move?

The camp at the top of Siedziba is a band across the content, about 96 px high, under the row of warnings below the menu bar and over the heading „Siedziba”, drawn at twice the pixels of its picture: a snow clearing in full light and with no tint, composed of the pictures of the pack Pixel Crawler from which the forest of the scene is composed, with a burning campfire in the middle, the chest and the characters that are in Siedziba, and a window narrower than the picture crops it at the sides around the campfire and never scales it down. The characters that stand in it are those that are neither in a manual map run, going, paused or ended and waiting for „Restart” or „Zakończ”, nor in an earning loop, the first of them in the order of creation that the band holds at the width of the window, the rest standing in the picture nowhere while the section „Drużyna” lists them all, and a camp with none shows the fire and the chest alone. The camp moves as the scene does, the fire in the frames of its flame and each character in the frames of its idle sheet, at the scene's fixed beat with no loop of drawing, and stands still under the system's setting for reduced motion; its campfire burns always and is no campfire of the game state; and it is a picture, not a control, taking no click and no key, hidden from readers of the screen, with no text on it or over it.

- **Scope:** browser-view

### D-19 — How does the player interact with the drawing of the game map?

The drawing of the game map is a picture, not a control: its only interaction is hovering, which links a tile with its row in the list of revealed tiles, and the numbers of stock stand in that list and in the line under the drawing, which shows the hovered tile or else the character's tile, never on the drawing.

- **Scope:** browser-view

### D-283 — What happens to a manual map run when the player leaves its screen?

Leaving the screen of a manual map run pauses it as „Pauza” does.

- **Scope:** browser-view

### D-284 — Does a return to the screen of a manual map run resume it?

A return to the screen of a manual map run that waits in a pause leaves it in that pause until the player presses „Wznów”, whether or not it went on before the player left.

- **Scope:** browser-view

### D-287 — What do Siedziba, the screen Postać and the screen Mapy allow, and say, while a manual map run waits or has ended?

While the game state holds a manual map run that waits in a pause, or that has ended and waits for „Restart” or „Zakończ”, Siedziba, the screen Postać and the screen Mapy keep active what the simulation allows, while „Wejdź”, „Puść w pętlę” at that map run's character and „Kup” stand inactive. Under the inactive buttons of each character in the section „Kto idzie” of the card of a map stands „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”, and at the section „Umiejętności” „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.”

- **Scope:** browser-view

### D-311 — How is the screen of a map run laid out?

The screen of a map run has two columns under one header: on the left the world and, under the drawing of the map and the line of a tile that end it, an area with the tabs „Kronika” and „Teren” holding one content at a time, the chronicle or the table of revealed tiles, as the player picks, „Kronika” picked when the character is sent to the map; on the right the program, in which the editing of a rule or a rule group opens in place under its row (D-288). The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with the minutes each need lasts, with the backpack and the lines below them, the drawing of the map and the line of a tile under it. The header holds the character's name, the map's name, the clock, a bar of the solving condition with its numbers (D-133), „Pauza” or „Wznów”, the pace, „Restart”, the warning of a cut trip plan and „Zakończ”, and after the end of the map run „Koniec przejścia”, which opens the end-of-run window. After a character's death or a completion that window (D-368) stands over this screen, its header included, under the menu bar and the row of warnings below it, and holds the lines of the end (D-185, D-216), which the world area does not; „✕” in it and Escape pressed in it (D-370) close it and uncover the screen, it opens again at every entry on the screen of an ended map run, and it closes when the question „Zapisać, odrzucić, wrócić?” of D-173 stands. It opens of itself at the end of the map run once the scene's effect of the death or the completion has played, so that the effect is seen, and at once where the scene shows the last image of that effect at once (D-322): at an entry on the screen, after a reload or a load, and under the system's setting for reduced motion.

- **Scope:** browser-view

### D-324 — What does the map run do, and what stands on the screen, while the question of „Zakończ” stands?

While the question „Zapisać, odrzucić, wrócić?” of D-173 stands, the map run is paused as „Pauza” pauses it, and „Wróć” puts it back as it was before „Zakończ”: a map run that went on goes on, and a paused one, the stop at a discovery included, stays paused. The rest of the screen works as usual, so editing the copy, the pace buttons, a second „Zakończ” and the buttons of the panel of the copy act and leave the question standing, except that it goes, with the map run left paused, when the copy no longer holds unsaved changes — after „Zapisz w programie”, „Zapisz jako nowy program”, „Porzuć zmiany”, „Przełącz postać na ten program” or an edit after which the copy no longer differs from its program as D-171 gives — and „Wznów”, in the header or in the band of a discovery, „Restart” and, after the end of the map run, „Koniec przejścia” of the header close it as „Wróć” does and then do what they do without it, „Koniec przejścia” opening the end-of-run window (D-368, D-311). Leaving the screen of the map run closes the question as „Wróć” does, the map run standing paused as D-283 gives, and the question lives in the memory of the page alone, so after a reload it is gone and the map run comes back as D-212 gives.

- **Scope:** browser-view

### D-334 — What does „Teraz” say on the screen of a map run?

Under the scene of the screen of a map run the row „Teraz” keeps one height whatever it holds, and while the character carries out an action it holds the icon of the action and the action as the row of its program rule writes it, such as „Zbierz — Patyk”, and at its right the number of the program rule the action comes from and the minutes of the action, such as „reguła 2.1 · zostało 3 z 5 min”, with no progress bar, and while the character waits „Czeka — żadna reguła nie pasuje”, with no rule and no minutes. In the minutes of an attack it holds „Walczy z wilkiem” alone, as D-147 gives, with no icon, no number of a rule and no minutes, and after a completion the completion text D-132 gives. After a character's death it reads the cause of the death in the role `text`, „Mag zamarzł”, „Mag umarł z głodu” or „Mag zginął w walce”, while the clock in the header stands at the game minute of the death, such as „Minuta 312”.

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

The scene has one size, 672 × 304 px, twice the size of its picture, and the game keeps no second scale of it. Whatever the scene draws is drawn for this size alone.

- **Scope:** browser-view

### D-368 — What does the end-of-run window say, and how does it open and close?

When a manual map run ends in a character's death or a completion, the end-of-run window opens of itself over the screen of the map run, covering it with its header but not the menu bar nor the row of warnings under it, and under „Koniec przejścia” it answers in this order what happened, what it cost or gave, why and what next: the cause as a title — after a death „Mag zamarzł”, „Mag umarł z głodu” or „Mag zginął w walce”, after a completion the completion text of the map from its data, such as „Las rozwiązany”, in the role `positive` — with the longest streak the map run reached against the map's condition as „najdłuższa passa 116/480” with its bar in the form of the bar of the header (D-135, D-133), the discovery of that game minute where there is one (D-122), the line of what the end gave or cost (D-185, D-216), the sections of why and the buttons of what next. Each section of why stands only where it has content: „Ostatnie minuty” only after a death, the four last entries of the chronicle other than the paragraph of the last encounter, ending with the entry of the death, each with its game minute as in the chronicle; the paragraph of the last encounter, in the words of the chronicle, in a section of its own (D-147); „Nie zadziałały ani razu”, the rules of the copy with the counter „Wykonano 0×” (D-93), each with its number, such as „2.2”, and the sentence of its row; „Na co poszedł czas”, one bar with a legend and percentages, with a piece of its own for each action of at least 8 % of the time, at most five, the rest in „reszta”, where „Idź”, „Idź — ognisko” and „Wędruj” join as „W drodze”, waiting stands as „Czeka” and combat as „Walka”; and „Wyprawa i teren”, with the lines „weszła z …” or „pustym plecakiem”, „odsłonięto {n} z {m} kafelków” and „w drodze {n} min”, and no line „odłożyła”. The window scrolls in itself while its buttons — „Restart” with the warning of a cut trip plan (D-188), „Zakończ” and, after a completion of a map that opens another, „Otwarte: {mapa} →” (D-132) — stay fixed at its bottom; „✕” in the window and the key Escape pressed in it (D-370) close it and uncover the screen of the map run, whose header then holds „Koniec przejścia”, which opens it again, and the window opens again at every entry on the screen of an ended map run, after leaving by the menu bar and after a reload too.

- **Scope:** simulation, browser-view

### D-369 — What does a manual map run keep of itself for the end-of-run window, and how does a load read it?

A manual map run keeps, in the map run of the game state and so in the saved game state, and not in the plain map run that earning loops share, three things for the end-of-run window (D-368): the longest streak, the greatest value its streak held at the end of a game minute; the game minutes it passed by what the character was doing, each game minute counted once, to what the character was doing at its start, as a count for every kind of a closed list — the kinds of the data's ordinary actions, a wait and a fight — so that the counts sum to the game minute; and the items the character entered with, the entries of the backpack the send gave it, in the order of the data's items. The record begins at the start of the map run and again at „Restart”, and the load of a saved game state refuses a record whose longest streak lies below the streak going on or above the game minute, whose counts are not exactly those of the closed list or do not sum to the game minute, or whose items are out of the order of the data's items or add up to more pieces than the character carries.

- **Scope:** simulation

### D-370 — How does the end-of-run window cover the screen of a map run, and where does the keyboard go?

While the end-of-run window (D-368) stands, the header and the three areas of the screen of a map run are not shown, though they stay in the page with their state, and the window stands in their place under the menu bar and the row of warnings, as wide as the content column of the screens (D-280) and as tall as its content up to a part of the height of the browser window, with no backdrop; its heading with „✕” and its buttons stay fixed while its middle part scrolls, and the page is at its top when the window opens, so the menu bar stands above it in sight. The window takes the focus when it opens, Escape is read in the window and not on the document, and nothing traps the focus, so the menu bar above the window stays within the keyboard's reach; „✕” and Escape move the focus to „Koniec przejścia” in the header.

- **Scope:** browser-view

### D-371 — Who remembers whether the end-of-run window is open, and where does „Koniec przejścia” stand?

Whether the end-of-run window (D-368) is open is a memory of the page, kept by the game view and never written into the game state or the save: it is open when a map run ends and when the game is built on an ended map run, it becomes open again at every entering of the screen of an ended map run, and „✕”, Escape and the question „Zapisać, odrzucić, wrócić?” (D-173) close it, and the window stands only while it is open, the player is on that screen and no question stands. „Koniec przejścia” stands in the header before „Restart”, only while the map run has ended and the window does not stand, which includes the wait of the window for the scene's effect of the end (D-322), when it opens the window at once.

- **Scope:** browser-view

### D-385 — How does the list of revealed tiles show an item that burns on a tile?

An item burning on a revealed tile, such as a lit stick, stands in that tile's row of the list of revealed tiles after the text of the tile's campfire, as „patyk — płonie, zostało 3 min” with its minutes of burning left, for as long as it burns; it has no icon on the drawing of the game map, and its name comes from the game's data (D-18).

- **Scope:** browser-view

### D-338 — What does the chronicle of a map run hold?

A manual map run keeps a chronicle of what happened in it, each entry with its game minute: discoveries, the character's actions, combat, the player's changes of the program, and each loss of the streak with its cause. The player filters it by these kinds in the area with the tabs under the world on the screen.

- **Scope:** simulation, browser-view

### D-339 — Where does the chronicle of a map run live, and what of it stands after a load?

The chronicle lives in the memory of the page and enters neither the game state nor the save, so leaving the screen of the map run, for the headquarters among others, and coming back clears none of it. After a load of a saved game state — a reload of the page, a closed tab, a new sign-in or another device — the chronicle of the loaded map run starts from the paragraph of its last encounter, composed from the facts the saved game state already holds and standing at the game minute of the attack as D-147 gives, and every other entry of the chronicle from before the load is lost.

- **Scope:** browser-view · simulation

### D-340 — Which actions of the character give an entry of the chronicle, and how does it read?

The start of each action of the character gives an entry of the chronicle in the words in which „Teraz” names the action, those of the row of its program rule, such as „Zbierz — Patyk”, „Idź — Jagoda”, „Eksploruj” or „Zjedz — jagoda”, with no number of a rule and no outcome of the action. A wait gives one entry of the same kind when it starts, „Czeka — żadna reguła nie pasuje”, and none for the game minutes it lasts.

- **Scope:** browser-view

### D-341 — When does a loss of the streak give an entry of the chronicle, and how does it read?

A loss of the streak gives an entry of the chronicle only where a streak above zero falls to zero, in the game minute of the loss, that of a death of cold or hunger included, reading „Passa {passa} przerwana: {przyczyna}” in the role `danger`, {passa} being the streak before the loss and {przyczyna} „zdrowie spadło od zimna”, „zdrowie spadło od głodu”, „zdrowie spadło od zimna i głodu”, „zmiana programu” or „przełączenie na inny program”. A change of the program that sets the streak to zero gives in its game minute two entries, the change and the loss of the streak, each under its own filter, and a game minute of lost health while the streak stands at zero gives none.

- **Scope:** browser-view · simulation

### D-342 — Which changes of the program give an entry of the chronicle, and how does it read?

Each change of the copy a map run carries out gives an entry of the chronicle in the role `player-change`, an entry about a program rule naming its number and its sentence at the moment of the change and one about a rule group its name: „Dodano regułę 2.3: Zawsze → Wędruj”, „Usunięto regułę 1.2: …”, „Zmieniono regułę 2.1: „…” na „…””, „Przesunięto regułę 2.1 na 1.3: …”, the same for rule groups, such as „Dodano grupę „Ogień””, „Zmieniono plan wyprawy”, „Porzucono zmiany kopii”, „Zapisano kopię w programie „…””, „Zapisano kopię jako nowy program „…”” and „Przełączono postać na program „…””. Such entries are given after the end of the map run too, until „Restart” or „Zakończ”, at the game minute of the end, and an edit of a saved program, which changes no map run, gives none.

- **Scope:** browser-view · simulation

### D-343 — How does the chronicle stand in the area with the tabs, and how does the player filter it?

Over the list of the chronicle stands a row of filter buttons in the look of the pace buttons (D-130), one picked at a time — „Wszystko”, „Odkrycia”, „Czynności”, „Walka”, „Moje zmiany”, „Passa” and „Świat” — each but „Wszystko” showing the entries of one kind and „Wszystko” all of them, „Wszystko” picked when the character is sent to the map. The entries stand newest at the top, each with its game minute as a number alone in a column on the left in the role `text-label` and its text beside it, such as „212 Zbierz — Patyk”, on the background `panel`, the text in the role of its kind: a discovery in `discovery`, a change of the player in `player-change`, a loss of the streak in `danger`, an action and combat in `text`, and the kind „Świat” as D-344 gives. An empty chronicle and a filter that shows no entry read „Nic tu jeszcze nie ma.”.

- **Scope:** browser-view

### D-344 — What does the kind „Świat” of the chronicle hold, and how do its entries read?

Besides the kinds D-338 gives, the chronicle holds the kind „Świat”, with a filter of its own: „Ognisko wygasło” when a campfire goes out, the character's death and the completion of the map run, the death and the completion in the words in which „Teraz” says them in the same game minute, „Mag zamarzł”, „Mag umarł z głodu”, „Mag zginął w walce”, „Las rozwiązany” or „Las — głębiej rozwiązany”. The entry of a completion stands in the role `positive`, as in „Teraz”, and the entries of a death and of „Ognisko wygasło” in `text`.

- **Scope:** browser-view · simulation

### D-345 — What does the entry of a discovery say in the chronicle?

The discoveries of one game minute give one entry of the chronicle holding the whole text of the band of that discovery without its buttons (D-122), such as „Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży mniej niż … szt., Zapas poniżej … szt.”, followed, where the band of that discovery has it (D-312), by „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”

- **Scope:** browser-view

### D-348 — From what does the chronicle learn what happened in a game minute and what the player changed in the copy?

The chronicle learns what happened in a game minute from the events the simulation returns, each with its game minute — among them a streak above zero falling to zero, with the streak before the loss and its cause, wherever it falls, and a campfire whose minutes of burning run out — save the paragraph of the last encounter, composed from the facts the map run keeps (D-147), and the game state holds none of these events. The browser view describes an act of the player on the copy from what the act was and, for an edit, from the copy before the act and the copy after it, together with the program rule or rule group the player moved where the program editor names it, which never enters the simulation, and no event of the simulation describes such a change.

- **Scope:** simulation · browser-view

### D-382 — How does the list of the chronicle draw a chronicle that grows through a long map run?

The list of the chronicle draws the entries of the filter picked, newest first, in a window of a fixed size, and grows the window by that size when the player scrolls near its end, so that every entry stays reachable and the rows drawn do not grow with the chronicle; picking a filter, a send and „Restart” start the window anew, and an entry arriving does not. The text of an entry is composed once, when the entry is recorded, so no later change of the game state, the rename of a rule group included, rewrites an entry, and a draw composes only the paragraph of the last encounter (D-147), and only when that encounter changed. A draw in which neither the chronicle, nor the filter, nor the window, nor the last encounter changed draws no row again, and a row already drawn is not drawn again when an entry is added above it.

- **Scope:** browser-view

### D-383 — How long does the pick of a filter of the chronicle hold on the screen of a map run?

The filter the player picks above the list of the chronicle stays picked through the whole map run, through leaving its screen and coming back, and through „Restart”, as the tab does (D-346); „Wszystko” stands picked again when the character is sent to the map (D-343), and after a reload of the page, which does not keep the filter.

- **Scope:** browser-view

### D-314 — What does the background of the scene show?

The background of the scene is a still picture of a forest in snow, composed from the pictures of the pack Pixel Crawler that the predecessor game, loop, cut out.

- **Scope:** browser-view

### D-315 — Where does the tint of the scene's light stand?

The background picture of the scene is in full light and with no tint, and the tint of the scene's light is a layer over that picture, never a tint or a darkness in the picture's file. The layer lies over everything the scene draws — the background, the props, the campfire burning or extinguished, the mage, the wolf, the dust and the flying icon on its plaque — but the badge over the mage's head and the plaques of a discovery, which stay on their solid `panel` background (D-320, D-322), the specks of light after a completion, which stay in their own colours (D-322), and the frost on the edges of the frame, which lies over the layer and does not change its colour with the streak; the cold layer after a death of cold (D-322) lies over the layer of the tint, under the frost.

- **Scope:** browser-view

### D-316 — What does the scene show, and from what does it draw?

The scene draws the character, its campfire, what attacks it and the moment of the map run from the game state, its previous reading and the events the simulation returned, and it holds no state of the game, the picture of each resource, creature and archetype it shows standing in the game's data. Sticks, the berry bush and moss always stand in the scene, and the campfire only while it stands on the character's tile, burning with a fire that moves or extinguished, the same picture in `grayscale(1) brightness(0.55)` and without motion. What attacks the character stands beside the mage through the minutes of the combat: it runs in from the right edge of the frame and stands on the right of the mage, facing it, or on its left where the mage stands at the right edge, and the mage turns toward it; a death of the character or the solving of the map within the run leaves it standing beside the mage. The two scuffle, the creature in the frames of its bite and the mage in those of its idle sheet, with a small cloud of dust between them and no flash. A defeated creature falls where it stood and is gone, a creature that departs runs off to the right edge it came from, and after the character's death in the combat the creature stays beside the mage, standing still, as it does where the map run is solved in the minutes of a combat. Motion comes from CSS at a fixed beat that does not depend on the pace, with no loop of drawing, and a fight shows as a scuffle that pictures no single blow. The tint of its light (D-315), never blue and never greying the scene as the pause does, follows the streak: it goes evenly from a cool grey-green at streak 0 to a trace of the cool tint, 20 %, at the streak the map's condition asks for, stays there while the streak grows on, and is full warm gold only at a completion, and it leaves the brightness of the picture as it is and has no effect in the game. A loss of the streak while the map run goes on takes the tint back to the cool one over 2 s as a change of the scene's state, not an effect, which in the player's pause and at a discovery, where time stands still (D-322), begins where the scene goes on, while at a death, at a completion, at the start of a map run, after „Restart” and after a load the tint stands at once where the streak, or the completion, puts it.

- **Scope:** browser-view · simulation

### D-317 — How long do the scene's effects last?

An effect of an ordinary event is a short sign of one event at the character or in a part of the scene — the flight of an icon, a cloud of dust, the run of a wolf, the outcome of a combat — and lasts at most 300 ms and shows no text at 8× and 16×, and an effect overdue when its turn comes is dropped. What the character does through an action, such as bending through a gathering or the scuffle through a combat, and a state of the whole scene, such as the tint, the cold layer and the frost, are no effect: the first lasts as long as the action, and the second changes at the rate set for it. The three moments in which time stands still — a discovery, a death and the solving of a map — have no such limit: the effect of each plays once, and then the scene stands on its last image until the moment ends with „Wznów”, „Restart” or „Zakończ”, and a scene drawn again on the same moment shows that image at once. The scene follows the system's setting for reduced motion: the frames stand still, every move from place to place and every change of its state shows its end at once, a short effect of an ordinary event appears still at its place for at most 300 ms and goes, and the effect of a moment shows its last image at once. The scene shows no flash of its whole area.

- **Scope:** browser-view

### D-318 — Where does the mage go for each action?

The mage walks to the place its current action leads it to: with „Zbierz” and „Obchód” to the sticks, the berry bush or the moss, as the target says, with „Wytwórz — ognisko”, „Zapal — ognisko” and „Zasil — ognisko” to the place of the campfire, with „Eksploruj”, „Wędruj”, „Idź” and „Idź — ognisko” to the right edge of the scene, always the same place, and while it waits, no program rule fitting, to the middle of the clearing. Where its action leads nowhere — „Zbierz” and „Obchód” with fibre as the target, „Zapal — patyk”, „Zjedz — jagoda” and a fight — the mage stays where it stands.

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

While the player's pause holds a map run, the scene is greyed with `grayscale(1) brightness(0.5)` and all its motion, the fire and the mage together, stands still. In the three moments in which time stands still, a discovery, a death and a completion, the scene plays an effect once and then stands on its last image until the moment ends with „Wznów”, „Restart” or „Zakończ”, and nothing but the effect moves while it plays, the fire standing as at every stop, and the mage too at a discovery and a completion: at a discovery the scene keeps its colours (D-122) and the icon of each thing discovered that the game's data gives an icon, each icon once, comes out of the forest on a plaque on `panel` with a frame in `discovery`, like the badge over the mage's head (D-320), and stands over the clearing, „Wznów” cutting the effect short; after a death no badge stands over the head, the mage falls in the six frames of its death sheet, toward the middle of the frame so that it lies inside the picture, and lies grey with `grayscale(1) brightness(0.55)`, and after a death of cold a blue layer lies over the whole scene, above the tint of the light and under the frost (D-315), which after a death of hunger or in a fight stands nowhere; after a completion no badge stands there, the mage stands in colour and specks of light rise over the clearing and go out, over the full gold of the tint. At the stop at a discovery that the first attack makes, the creature already stands beside the mage, with no run in, and the scuffle begins at „Wznów”. Where the map run ends in the game minute of a discovery the scene shows the effect of the end alone, and a moment has just begun where the events of the simulation call that returned the state carry it (D-04), so a scene drawn again on the same moment, after a return to the screen, a reload or a load, and a scene under the system's setting for reduced motion show the last image of the effect at once (D-317, D-319).

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

The scene shows an effect of the end of a gathering, D-365 or D-366, only in a reading of a map run that goes on, drawn from a previous reading of the same map run, in which exactly one gathering ended and no action that takes pieces out of the backpack ended, and which a map run started does not accompany; it places the effect at the place the mage stands or walks to at the previous reading. Any other reading starts none, so that an effect overdue when its turn comes, one at a stop or in a reading that carries several ends, is dropped; an effect already running finishes, standing still while the scene does, unless the map run is left or a new one starts, and an effect of a gathering that comes while another still runs takes its place, while the effects of the wolf (D-316), which belong to another part of the scene, are neither taken by it nor take it.

- **Scope:** browser-view

### D-372 — What does the frost on the edges of the scene's frame show?

The scene shows frost on the edges of its frame, never over its whole area (D-317), that follows the temperature of the character's body: none at 37 °C, growing in thickness as the body cools to 35 °C, at 36 °C half of its full thickness, 16 pixels of the scene (32 px on the screen) at its deepest while the character is chilled, and taken back as the character warms at a fire. Its inner edge is ragged, so its thickness is the depth of its deepest teeth, and at the first pixel of thickness it is the outline alone, the fill coming with the next pixels. The frost lies over the layer of the tint (D-315).

- **Scope:** browser-view · simulation

### D-415 — Who judges the colour of an effect against the prop it stands at, and whether another element of the scene covers it?

The human judges, at the request that brings an effect of the scene, whether its colour stands out from the prop it stands at and whether another element of the scene covers it, from the numbers and the picture the change shows, and no threshold decides either. A threshold binds only where a decision gives it, as D-271 gives the outline or the fill of the frost 3:1 against the snow.

- **Scope:** browser-view

## Listed by heading alone

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
- D-152 — How does a player sign in and reset a forgotten password?
- D-156 — How does an emailed link confirm a player's email address?
- D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message?
- D-159 — Can an account's email address change?
- D-222 — What does a request for a password-reset link answer?
- D-224 — What form does a password-reset link take?
- D-225 — What does the form „Ustaw nowe hasło” hold, and how does it end?
- D-352 — What does a page whose game is open do when the fragment of an emailed link appears in its address?
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
- D-215 — Where does the player read that a manual run of a solved map pays and takes nothing?
- D-51 — What team does a new game start with?
- D-52 — How is a character named?
- D-54 — In what order do the characters of the team stand?
- D-56 — How does the game state tell one character from another?
- D-57 — In what unit does a character's warmth stand?
- D-62 — What does the screen show, and what can the player do, after a character's death?
- D-216 — Where does the player read what a death took and what a completion renewed?
- D-217 — What does the game show of a character's resurrection?
- D-218 — How does the headquarters show a character's generation number?
- D-219 — Whose clock counts the renewal of a resurrection?
- D-221 — When is a character's death settled?
- D-64 — What does the backpack's cap count, and what sets its height?
- D-70 — How does the browser view show a campfire?
- D-373 — How does the flame of the campfire show how long the fire has left?
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
- D-124 — What does „+ reguła” do?
- D-125 — What do the body row, the backpack, the list of revealed tiles and the drawing of the game map show of what is not yet discovered?
- D-312 — How does the band of a discovery name the program rule the game wrote?
- D-313 — What does „Dodaj regułę z tym” do?
- D-23 — How does a character act by its program?
- D-26 — How does a program point at things of the world?
- D-90 — Where do the program rules of a program belong?
- D-91 — What program does a new game start with?
- D-92 — What counts as one firing of a program rule?
- D-93 — What does a program rule show the player?
- D-380 — Which words name each refusal of an action?
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
- D-251 — How does the card of a map mark a rehearsal the earning loop cannot repeat?
- D-409 — Where does an act of the player that depends on time catch up the time?
