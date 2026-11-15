# Report — executor of slice 13 (login card and account screen decisions)

## Status

done with concerns

The concerns are not faults of the work: they are the form of the lines `decision:` (inside the test,
as earlier slices put them, not above it as the plan words it), the quotations the mechanical split
of sentences forces, and where I drew the line between a test that checks a sentence and one that
only uses it as a precondition. Each stands below under its own heading.

## Commits

- `f86bbdef` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the
  login card and its states, the switch, the page's sentence, the screen of the card, the form of a
  password-reset link and its form, an unconfirmed address, an emailed link in an open game and the
  card's focus and lock with lines decision:
- `cd24bdda` docs: :memo: name the tests of D-96, D-157, D-224, D-225, D-259, D-260, D-261, D-262,
  D-352 and D-381, drop the pair of D-157, D-225, D-259, D-260, D-261, D-352 and D-381, which their
  tests hold whole, and rewrite the pair of D-96, D-224 and D-262 only for the part no invariant and
  no test holds

Author address checked after the commits: `git log -2 --format='%h %ae'` shows `mariusznn@gmail.com`
for both.

Files changed (against the slice's base `5c24526a7ab1039e281af09b096011b9a46ceeae`):

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 47 | 47 |
| `tests/view/account-screen.test.mjs` | 123 | 0 |
| `tests/view/menu-bar.test.mjs` | 18 | 0 |
| `tests/view/email-status.test.mjs` | 5 | 0 |
| `tests/view/password-reset.test.mjs` | 3 | 0 |
| `tests/view/uncaught-failure.test.mjs` | 4 | 0 |
| `tests/http.test.mjs` | 2 | 0 |
| `tests/account-api.test.mjs` | 1 | 0 |
| `tests/view/end-window-game.test.mjs` | 1 | 0 |

`tests/view/email-confirmation.test.mjs`, named in the slice's *Change*, holds no sentence of these
decisions and is unchanged: its cases read the confirmation fragment and sort the confirmation's
answers (D-156), and its reloads are a stand-in's counter no case asserts.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before any edit) | 0 — `0 errors`, none of the ten decisions listed |
| `python -B .the-way/elements/common/foundation_check.py` (after the edits) | 0 — `0 errors`; 11 decisions listed `held by nothing`, none of D-96, D-157, D-224, D-225, D-259, D-260, D-261, D-262, D-352, D-381 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` for each of the eight changed `.mjs` files | 0 for each |
| `npm test -- tests/view/account-screen.test.mjs` | 0 — 131 pass, 0 fail |
| `npm test -- tests/view/password-reset.test.mjs` | 0 — 2 pass, 0 fail |
| `npm test -- tests/view/email-status.test.mjs` | 0 — 3 pass, 0 fail |
| `npm test -- tests/view/email-confirmation.test.mjs` (unchanged, named by the slice's *Checks*) | 0 — 5 pass, 0 fail |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 — 29 pass, 0 fail |
| `npm test -- tests/http.test.mjs` | 0 — 95 pass, 0 fail |
| `npm test -- tests/account-api.test.mjs` | 0 — 32 pass, 0 fail |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 — 17 pass, 0 fail |
| `npm test -- tests/view/end-window-game.test.mjs` | 0 — 27 pass, 0 fail |
| `git diff -U0 5c24526a -- foundations/decisions.md`, read | ten hunks, each inside the *Verification* field of one of the ten decisions; nothing else of an entry changed |

Not run: the full gate (`npm test` with no file) — the cycle's run, as the method gives.
`test_ruff_source_rules` and `test_shellcheck_source_rules` fail with `FileNotFoundError` at the
base, as the handoff says; I did not run them, they are not caused by this slice.

## Own-work check

- Requirement most likely missed: "every test that holds one of its binding sentences carries a
  line `decision:`" — a holding test in a file I did not search, or a sentence piece left without
  its test.
- Check: searched all of `tests/` for the screen texts and identifiers of each sentence outside the
  files already marked (`Potwierdzanie adresu`, `Sprawdzanie logowania`, `Ustaw nowe hasło`,
  `Nie pamiętam hasła`, `Zapis pochodził`, `Zapis był uszkodzony`, `Nie udało się wczytać gry`,
  `createAccountCard`, `account-card`, `reset-password=`, `Wyślij ponownie`,
  `account-menu-unconfirmed`, `aria-pressed`, `reloaded`, `ABOUT`), and every decision number of
  the slice (`git grep -E "D-(96|157|224|225|259|260|261|262|352|381)\b" -- tests`).
- What it showed: the five files beyond the *Change* that hold sentences (menu-bar, http,
  account-api, uncaught-failure, end-window-game) are marked; `Potwierdzanie adresu…` is asserted
  only as the text of the waiting screen (`tests/view/account-screen.test.mjs:1285`), never with the
  header or outside the card, so that part of D-262 stays in its pair; `tests/sim/saved-game.test.mjs`
  cites D-96 at two cases of the invariant `save-version` that hold D-213 and D-206, not a sentence
  of D-96, and got no line. The foundation check's run after the edits checks every quotation
  (0 errors).

## Rows of the decisions

Line numbers are those of the test case (`test(`) after the slice's lines; S1, S2… are the
sentences of the binding text split at each full stop followed by a space, as the template counts
them (so D-96's third sentence splits inside the quoted „Nie udało się wczytać gry. Spróbuj
ponownie.”, D-157's third inside its three outcome sentences, and D-225's second inside „Hasło
zmienione. Zaloguj się nowym hasłem.”).

### D-96 — what a player sees before and after signing in

- Invariants (`player-self-registration`, `player-password-login`, `email-verification-nonblocking`)
  hold: anyone creates an account without operator approval or email confirmation and plays at once;
  signing in with email and password (R1: no line for that part).
- S1 „A signed-out visitor sees one card…” — in part:
  `tests/view/account-screen.test.mjs:473` "an answer of no session shows the card on „Zaloguj się”…",
  `:765` "the button under „Zaloguj się” puts in its place one form…",
  `:930` "„Wróć do logowania” brings back „Zaloguj się”…",
  `:1493` "with a reset token in the address the page shows the form at once…",
  `:5458` "the card opens on „Zaloguj się” with the name, the sentence…",
  `:5502` "„Załóż konto” shows address, password and repeated password…",
  `:5528` "„Nie pamiętam hasła” shows its heading and an empty address…",
  `:5582` "every field keeps its label, hint and autocomplete token…",
  `:5753` "the folded credits stand last in all four states…".
- S2 „Anyone can create an account…” — in part:
  `tests/view/account-screen.test.mjs:2107` "a save builds the game the load gives…",
  `:3903` "the first screen of each entry…", `:3954` "a reload at #/postac/1 while the save holds a map run…",
  `:3975` "a reload at each of the seven addresses opens its screen…",
  `:3999` "a reload at #/mapy/forest stays on Mapy with Las picked…",
  `:4384` "after an emailed link — a confirmation, „Anuluj”… — a signed-in player opens Siedziba…",
  `tests/view/end-window-game.test.mjs:590` "a game built on an ended map run opens the window…".
- S3 „The browser constructs the game only after…” — in part:
  `tests/view/account-screen.test.mjs:435` "until the server names an account…",
  `:506` "an answer that names no account and is not a refusal of the session…",
  `:1957` "an error of the code in the load of a downloaded save keeps the save…",
  `:1998` "an error of the code in the load of the kept state keeps it for the retry…",
  `:2080` "after the session check the page keeps „Sprawdzanie logowania…”…",
  `:3196` "a failed or uncertain answer for the saved game state shows the warning with retry…",
  `:5245` "an error of the code in the load of the kept state closes the card…",
  `tests/view/uncaught-failure.test.mjs:846` "a failure the game foresees keeps its own sentence alone…".
- S4 „Spróbuj ponownie.” in `warning`; a saved game state that the game discards…” — in part:
  `tests/view/account-screen.test.mjs:1957`, `:1998`, `tests/view/uncaught-failure.test.mjs:846`
  (the text „Spróbuj ponownie.”), `tests/view/account-screen.test.mjs:3251` "a refused save starts a
  new game with its one-time sentence above it…", `:4817` "the page's sentence above the first screen
  leaves at the first change of screen…".
- S5 „Zaczynasz od nowa.” for the first two…” and S6 „Zaczynasz od nowa.” for the last.” — whole:
  `tests/view/account-screen.test.mjs:3251`.
- Held by nothing: the card on a picture of the game; the sentence about the game read from the
  game's data (the test compares a literal); a created account entering Siedziba (the test sees "a
  game", not which screen); a sign-in finding a manual map run that goes on paused (the sign-in case
  checks the screen, not the pause); `warning` as the role of „Nie udało się wczytać gry. Spróbuj
  ponownie.” and of the sentences of a discarded save (the cases check the alert role or "not
  positive").
- *Verification*: invariants kept; clause `tests:` added; pair rewritten for the part held by
  nothing.

### D-157 — an unconfirmed address and another confirmation message

- S1 „A signed-in player whose email address is unconfirmed…” — whole:
  `tests/view/account-screen.test.mjs:1104` "a reload or sign-in with an unconfirmed address shows the sentence…",
  `:1148` "a confirmed address shows no sentence and no Wyślij ponownie…",
  `tests/view/email-status.test.mjs:48` "an unconfirmed address with no send made in the page is said in text-secondary",
  `tests/view/menu-bar.test.mjs:379` "an unconfirmed address shows its sentence in text-secondary…",
  `:526` "the server's answer that the address is already confirmed removes…",
  `:547` "the page's account turning confirmed removes the sentence and the button".
- S2 „Only a signed-in player asks…” — whole: `tests/http.test.mjs:2369` "only a valid session of an
  unblocked account asks for a message, and it goes only to that account's own address".
- S3–S5 „Right after registration…”, „Spróbuj ponownie za godzinę.”…”, „Spróbuj ponownie
  później.”…” — whole, together:
  `tests/view/account-screen.test.mjs:1166` "a created account starts the sentence of its menu with the outcome…" (S3–S5),
  `:1211` "Wyślij ponownie sends one request for the signed-in account…" (S3, S4),
  `tests/view/email-status.test.mjs:16` "each outcome of a confirmation message has its sentence and role" (S3–S5),
  `:40` "a sent message names the address of the account it went to" (S3),
  `tests/view/menu-bar.test.mjs:397` "right after registration the sentence is the outcome…" (S3–S5),
  `:419` "a send waits with the button disabled as Wysyłanie……" (S3–S5),
  `:459` "the menu stays open after the answer to „Wyślij ponownie”…" (S3–S5),
  `:482` "a failure of the client stands in warning with its own sentence…" (S3, S5),
  `:510` "a refusal other than an address already confirmed is a failure too…" (S3, S5),
  `:562` "an answer that comes while the menu is closed is there…" (S3, S4).
- Held by nothing: nothing.
- *Verification*: clause `tests:`; pair removed.

### D-224 — the form of a password-reset link

- S1 „The link of a password-reset message is…” — in part: `tests/http.test.mjs:3138` "a recorded
  reset link lives one hour, a later request stops the earlier link…" (the link's origin,
  `/#reset-password=` and 43 base64url characters, and the SHA-256 digest of the token in the
  database).
- S2 „The game page reads the token from the fragment…” — whole:
  `tests/view/password-reset.test.mjs:19` "the fragment's token is read as it stands…",
  `tests/view/account-screen.test.mjs:1493`, `:1540` "a sent form waits with its fields and „Anuluj” locked…",
  `:5558` "a card opened with a reset link shows „Ustaw nowe hasło” with its heading…",
  `:6223` "a sent „Ustaw nowe hasło” waits with the whole card locked…",
  `tests/account-api.test.mjs:140` "each call sends its documented method, relative path and JSON body".
- Held by nothing: the token drawn at random, and the digest the only form of it the database keeps.
- *Verification*: clause `tests:`; pair rewritten for that part.

### D-225 — the form „Ustaw nowe hasło”

- S1 „The form „Ustaw nowe hasło” holds…” — whole:
  `tests/view/account-screen.test.mjs:1493`, `:1708` "„Anuluj” clears the fragment first and opens the page as usual…",
  `:4384`, `:5558`, `:5582`, `:6313` "„Anuluj” clears the fragment first and ends the form…".
- S2 „After the password is set, „Hasło zmienione.” — whole: `tests/view/account-screen.test.mjs:1609`
  "a change clears the fragment first, then shows a new card…".
- S3 „Zaloguj się nowym hasłem.” stands in `positive`…” — whole:
  `tests/view/account-screen.test.mjs:1609`, `:1647` "a refused link, whatever its reason, clears the fragment first…",
  `:4384`, `:6286` "a change and a refused link, whatever its reason, clear the fragment first…",
  `tests/view/password-reset.test.mjs:38` "only a success is a change and only the code invalid-link is a refused link…".
- S4 „No connection or a full password gate…” — whole:
  `tests/view/account-screen.test.mjs:1737` "a failure that is no change and no refused link keeps the form, the fragment and the link…",
  `:6334` "a failure that is no change and no refused link keeps the form and the link…",
  `tests/view/password-reset.test.mjs:38`.
- Held by nothing: nothing.
- *Verification*: clause `tests:`; pair removed.

### D-259 — the state the card opens on, and what stands above its fields

- S1 „The login card opens on „Zaloguj się”.” — whole:
  `tests/view/account-screen.test.mjs:473`, `:992` "a confirmed logout or an expired session removes the game…",
  `:1302` "the result stands as one sentence above the game…", `:1330` "a refused link stands in warning above the form in the card…",
  `:1609`, `:1647`, `:1708`, `:1865` "a 401 on a save keeps the state…",
  `:3196`, `:3432` "„Wyloguj” saves first and goes on…", `:3500` "a tab that stopped saving as outdated logs out…",
  `:5458`.
- S2 „The switch stands only in…” — whole: `tests/view/account-screen.test.mjs:5458`, `:5502`,
  `:5528`, `:5558`.
- Held by nothing: nothing.
- *Verification*: clause `tests:`; pair removed.

### D-260 — what the switch does to what the visitor typed

- S1 — whole: `tests/view/account-screen.test.mjs:5649` "a press of the switch empties every field…",
  `:765`, `:930`, `:5528`, `:6202` "nothing typed and no sentence survives leaving „Nie pamiętam hasła”…"
  (the button „Nie pamiętam hasła”), `:5298` "the page's sentence stays in the card through a press of the switch…",
  `:5710` "the page's sentence stands in the card above the switch…" (the page's sentence stays).
- Held by nothing: nothing.
- *Verification*: clause `tests:`; pair removed.

### D-261 — where the page's one sentence stands on the card

- S1 „The one sentence of the page…” — whole: `tests/view/account-screen.test.mjs:1330`, `:1609`,
  `:1647`, `:3500`, `:5298`, `:5710`.
- S2 „It stays while the card changes state…” — whole: `tests/view/account-screen.test.mjs:1302`,
  `:5298`, `:5710`.
- Held by nothing: nothing.
- *Verification*: clause `tests:`; pair removed.

### D-262 — the screen of the card and the waiting screens

- S1 „Nothing stands on the screen of the login card…” — whole:
  `tests/view/account-screen.test.mjs:5122` "the card stands alone in the page's body…",
  `:5209` "the card of a reset link stands alone at once…".
- S2 „The waiting screens…” — in part: `tests/view/account-screen.test.mjs:5122`, `:5209`, `:5245`.
- S3 „When React takes the card down…” — whole: `tests/view/uncaught-failure.test.mjs:946` "a card
  that React takes down after an error is replaced by the sentence alone…", `:981` "a card taken down
  on the page leaves the sentence alone in the card's place…".
- Held by nothing: „Potwierdzanie adresu…” with the header and outside the card.
- *Verification*: clause `tests:`; pair rewritten for that part.

### D-352 — the fragment of an emailed link in the address of an open game

- S1 — whole: `tests/view/account-screen.test.mjs:4990` "a fragment of an emailed link that appears
  in the address of an open game reloads the page…", `:5020` "any other change of the address of an
  open game goes on as before and reloads nothing". What the reloaded page does is the start of a
  page opened by the link, which the cases of D-156 and D-225 hold; these cases prove the reload and
  that the fragment is left for it.
- Held by nothing: nothing.
- *Verification*: clause `tests:`; pair removed.

### D-381 — how the page opens, focuses and closes the card, and the lock

- S1 „The page opens the login card as an object…” — whole: `tests/view/account-screen.test.mjs:636`
  "a created account enters the game at once, and the page keeps no password", `:992`,
  `:5799` "the card stands in its element when createAccountCard returns",
  `:5818` "the card takes no focus when it opens, and focus() moves it…",
  `:5853` "dispose() takes the element out with what it holds…".
- S2 „The card takes no focus when it opens…” — whole: `tests/view/account-screen.test.mjs:992`,
  `:1609`, `:5209`, `:5245`, `:5266` "a sign-in that goes straight back to the kept game closes the card",
  `:5281` "a card opened by the session check or by an expired save takes no focus", `:5818`,
  `:5882` "signedIn and finished may dispose the card…".
- S3 „While a form waits for the server's answer the whole card is locked…” — whole:
  `tests/view/account-screen.test.mjs:567`, `:611`, `:798`, `:824`, `:865`, `:900`, `:1540`, `:1737`,
  `:5687` "a press of the state already shown clears nothing…", `:5753`, `:5919` "a sent login locks
  the whole card…", `:5963` "two sends and a switch before the lock is drawn…", `:5986` "a sign-in and
  a registration hand the account on…", `:6031`, `:6106`, `:6138`, `:6171`, `:6223`, `:6334`.
- Held by nothing: nothing.
- *Verification*: clause `tests:`; pair removed.

## Pairs added or rewritten (for the human to accept at the merge)

- D-96 (rewritten):
  - complies: the card standing on a picture of the game, its sentence about the game read from the
    game's data; a created account entering Siedziba; signing in with the form while the saved game
    state holds a manual map run of Las that goes on opening that map run's screen, paused; „Nie
    udało się wczytać gry. Spróbuj ponownie.” and the sentence of a discarded saved game state in
    `warning`
  - violates: the sentence about the game written in the code of the view; the card on a plain
    background with no picture of the game; a created account entering the screen Programy; signing
    in leading to a manual map run that goes on, running; „Nie udało się wczytać gry. Spróbuj
    ponownie.” or the sentence of a discarded saved game state in `text` or `danger`
- D-224 (rewritten):
  - complies: a token of 32 bytes drawn from a cryptographic source of random bytes, its digest the
    only form of it the database keeps
  - violates: a token kept in clear in a column of the database beside its digest; a token made of
    a counter or a time
- D-262 (rewritten):
  - complies: a page opened by a confirmation link showing „Potwierdzanie adresu…” with the header
    and no card, for a signed-in and a signed-out player alike
  - violates: „Potwierdzanie adresu…” written inside the card, or on a screen with no header

Pairs removed, their decisions held whole by tests: D-157, D-225, D-259, D-260, D-261, D-352, D-381.

## Files beyond the slice's *Change* (item 5)

- `tests/view/menu-bar.test.mjs` (browser-view): D-157; focused test run.
- `tests/view/uncaught-failure.test.mjs` (browser-view): D-96, D-262; focused test run.
- `tests/view/end-window-game.test.mjs` (browser-view): D-96; focused test run.
- `tests/account-api.test.mjs` (browser-view): D-224; focused test run.
- `tests/http.test.mjs` (account-server): D-157, D-224; focused test run. The account-server part's
  guidelines that apply to a test file are `guidelines/coding.md` and `guidelines/testing.md`, both
  in my *Read*; the styleguide covers browser-view only.

## Choices, with the way rejected

1. **The line inside the test, not above it.** The plan says "at the test case, directly above it";
   every earlier slice (`git log` of the branch, e.g. `e65f22cb`) put each line as the first lines
   of the test's body, after the lines `decision:` already there, and the handoff asks to follow
   their form. I followed the branch. Rejected: lines above `test(` — a second form in the same
   files. Cost if wrong: one mechanical move of every line of the branch, not only of this slice.
2. **Quotations start where the mechanical split puts a sentence.** The template counts a sentence
   from the first word after a full stop and a space, so a quoted screen text splits D-96, D-157 and
   D-225 (for example a line `decision: D-157 "Spróbuj ponownie później.” when the sending failed…"`).
   I quoted every piece a test holds, as the slice of D-222 did. Rejected: quoting only the first
   piece — the pieces holding the outcome sentences would stand with no line.
3. **A test whose assertion only sets the stage gets no line.** I marked a test where its own
   assertions check what a sentence states; not one where the sentence's behaviour is a step on the
   way to what it checks. Not marked: `tests/http.test.mjs` "no answer and no line of the server's
   log holds a reset link's token…" and "each business event of the server leaves one line…", which
   parse the reset link with the same helper as the marked case (the slice of D-156 marked 1 of the
   7 cases that parse the confirmation link); and the account-screen cases of D-207, D-209, D-283 and
   D-284 that reload at an address with a saved map run before checking something else (e.g.
   "leaving the screen of a map run that goes on pauses it…", "„Wyloguj” on the screen of a map run
   going on…"). Cost if wrong: a few lines missing, nothing a pair has to carry, since the marked
   cases hold those parts.
4. **Quotations run to the end of the sentence.** Every line quotes the whole (mechanical) sentence;
   the clause `tests:` says which part the tests hold. Rejected: cutting each quotation where the held
   part ends — the cut would have to fall at a different word for every case.
5. Lines were placed by a script, kept as `reports/executor-13-add_lines.py` (dry run first, then
   `--apply`), so every quotation is copied from the log and not retyped.

## Remarks on the log (R3)

- None of the ten decisions reads stale against the tests I read. Comments that cite a decision a
  case does not hold, left as they are (no mention of a number is removed):
  `tests/view/account-screen.test.mjs:3527`-`:3529` cites D-261 ("the sentence stands in the card")
  at "a save that finds no session while the logout's request is under way…", whose assertions read
  only the sentence's text, not where it stands; `tests/view/account-screen.test.mjs:5169`-`:5170`
  (the bar on waiting screens) cites D-262, but `assertNameAloneOnBar` does not check that the
  header shows, so that case got no D-262 line.

## Reaches beyond the dispatch

- `foundations/invariants.md`, entry `account-client-requests`: to learn whether the invariant of the
  account client test derives from D-224 (it derives from D-108 and D-117, so R1 does not apply).
- The five test files of item 5 above, read by range around the cases found.
- `the author's rules on writing scripts, outside the repository`: the user's rule for writing a script, read
  before writing the script of choice 5.

## Working copies

- `.runs/executor-13/` (`.runs/executor-13/`):
  my notes, the script, its plan output, the outputs of the foundation check and of the focused tests.
  Removed with `rm -rf` after the commits; nothing remains. Kept beside this report: the script,
  `reports/executor-13-add_lines.py`, and the list of the focused runs with their exit codes,
  `reports/executor-13-tests.log`. Every test run had finished before I returned.

## Unread material

- `tests/view/account-screen.test.mjs` — not read whole, by the slice's design. Read: lines 1-40,
  195-284, 340-2135, 3141-3250, 3374-3513, 3765-3936, 4317-4362, 4747-4780, 4912-4980, 5032-6250 (line
  numbers of the base). Not read: 41-194 and 285-339 (helpers; their names listed), 2136-3140,
  3251-3373, 3514-3764, 3937-4316, 4363-4746, 4781-4911, 4981-5031; those ranges were searched for the
  identifiers and texts of every sentence (`assertAboveTheForm`, `noticeOf`, `noticeTexts`,
  `pageSentences`, `partsShown`, `waitingText`, `session-check`, `forms(root)`, `activeElement`,
  `cardOf`, `reloadedAt`), and the cases found there were read.
- `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `guidelines/coding.md`,
  `foundations/part_map.md`, `foundations/glossary.md`, the ten decisions, D-73, D-82, the three
  invariants, the template's sections and the decisions skill: read whole.
- The plan and the task: read as the handoff gives them; the frozen task read whole.

## Searches not found or unclear

- No test checks that the card stands on a picture of the game, that the sentence about the game
  comes from the game's data, or that „Potwierdzanie adresu…” stands with the header outside the card
  (searched `picture`, `background`, `account-card-screen`, `ABOUT`, `Potwierdzanie adresu` in
  `tests/`); those parts stand in the pairs of D-96 and D-262.
- Unclear: the plan's "directly above it" against the branch's form (choice 1).
