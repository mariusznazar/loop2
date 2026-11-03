# Walk report — task `ekrany-i-menu`, plan slice 12

Branch `task/ekrany-i-menu`, head `eeb145f`, worktree `C:/Storage/repos/loop2-wt/ekrany-i-menu`.
Game: `npm run local`, line `Local game: https://127.0.0.1:58236`. Browser: `playwright-cli` 0.1.22 (no
fall back to Playwright MCP was needed). Account `walker1@example.test` made through the login card.
One character „Aria” (Mag żywiołów), programs „Program” and „Program 2”, map „Las”.
Screenshots: `C:/Storage/repos/loop2-wt/ekrany-i-menu/docs/task-cycles/ekrany-i-menu/screens/` (38 PNG).
Window 1280×800 unless a state says otherwise.

Checks run (command and exit code):

- `playwright-cli --version` — 0.1.22, exit 0.
- `npm run local` in the background — reached the line `Local game: …`; `curl -sk https://127.0.0.1:58236/` — 200.
- `playwright-cli close` — exit 0. `npm run local:stop` — exit 0, output `Local starts stopped: 1`.
- `.playwright-cli/` deleted; `git status --short` — empty output (nothing outside `.runs/`, which is ignored).
- `npm test` was not run, as the handoff says.

How I looked: for most states I opened the screenshot with the Read tool and describe what I saw; where a
state was read from the page text (`innerText`, `document.activeElement`, `location.hash`) and I did not open
the screenshot, the line says so.

## States

### Waiting screen and Siedziba

| # | Screenshot | What it shows | How reached | Result |
|---|---|---|---|---|
| 1 | `31-waiting-screen.png` | Bar with the name „Loop” alone at top left, no items, no „Konto”; under it „Sprawdzanie logowania…”; credits footer at the bottom. | Reload with the answer of `/api/account` delayed 5 s. | as the task says (D-262: name alone, with header and footer) |
| 2 | `01-siedziba-empty.png` (opened in the walk via text only) | Siedziba of a new account: „Drużyna” empty with the form „Nowa postać”, „Skrzynka 0/60”. | After „Załóż konto”. | as the task says |
| 3 | `02-siedziba-team.png` | Bar: „Loop”, „Siedziba” (strong text, line under it), „Programy”, button „Konto” at the right. Panel „Siedziba” with small headings „Drużyna” and „Skrzynka 0/60”; „Aria” underlined as a link, „Mag żywiołów”, „Wskrzeszenie gotowe”, row „Program: [list] Mapa: Las … [Wyślij]”, form „Nowa postać”. No programme panel, no „Umiejętności”. | Created „Aria”. | as the task says. Not shown: „Puść w pętlę” (the code draws it only for a solved map, D-243) |

### Menu „Konto” (item 1)

Menu content in the walk: the address, „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” (orange)
with „Wyślij ponownie”, and „Wyloguj”. After a later login: „Adres e-mail niepotwierdzony.” with „Wyślij ponownie”.
Focus read from `document.activeElement` and `aria-expanded` after each step:

| Step | `aria-expanded` | `document.activeElement` | Result |
|---|---|---|---|
| click on „Konto” | true | BUTTON „Konto” | as the task says |
| Escape | false | BUTTON „Konto” | as the task says |
| Enter on the focused „Konto” | true | BUTTON „Konto” | as the task says |
| click beside (on the heading „Siedziba”) | false | BUTTON „Konto” | as the task says |
| second click on „Konto” | false | BUTTON „Konto” | as the task says |
| Tab to „Wyślij ponownie”, then Escape | false | BUTTON „Konto” | as the task says |

Screenshots: `03-konto-menu-open-click.png` (opened by a click), `04-konto-menu-open-enter.png` (opened by Enter; not
opened, same state read from text), `33-konto-menu-w360.png` (360 wide).

Placement (`03`, seen): the block hangs under „Konto”, right edge on the right edge of the content (1264 px at 1280;
1632 at 1920; 624 at 640), top at 31 px, bottom at 167 px. It covers the top right of the content panel (the heading
row of „Siedziba” and the first lines of the team, only where the text is wide enough to reach it). It never leaves
the window at the right edge: at 1920, 640 and 360 its right edge stayed inside the window (1632, 624, 344).

Click on a text field while the menu is open (`05-konto-click-on-text-field-focus-taken.png`, opened): the menu
closes and focus goes to „Konto”; the field does not get the focus (`document.activeElement` = BUTTON „Konto”).
How it feels: the first click on the field is swallowed by the closing of the menu; the player has to click the
field a second time to type. This is D-285 followed literally; as a play experience it is a small stumble, not a
breakage. Result: as the task says (D-285), noted as a point for Mariusz.

### Postać (item 2 and the sentences of item 4)

| # | Screenshot | What it shows | Result |
|---|---|---|---|
| 4 | `06-postac-fresh.png` | Bar with „Siedziba” marked, content without a panel: „Aria” (strong), „Mag żywiołów”, „Wskrzeszenie gotowe”. No „Umiejętności” (no tree known yet), no loop row. | as the task says |
| 5 | `13-postac-run-waiting.png` (text only) | Same, while the run waits, before any discovery. | as the task says |
| 6 | `20-postac-umiejetnosci-run-waiting.png` (text only) | After the discovery „drzewo umiejętności Eksploracja” with the run paused: „Umiejętności”, the sentence „Przejście na mapie Las jest niezakończone. Stopnie kupisz po jego zakończeniu.”, tree „Eksploracja — poziom 1 · wprawa 0/15 · punkty 0” with three „Kup”, all greyed. | as the task says |
| 7 | `24-postac-run-dead-waiting.png` | Run ended by death („Mag zamarzł”) and waiting for „Restart” / „Zakończ”: bar with „Siedziba” marked and „Wróć do przejścia · Las · minuta 243”; line in red „Wskrzeszenie za 8 godz. 0 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie”; „Umiejętności” with the sentence „Przejście na mapie Las jest niezakończone. Stopnie kupisz po jego zakończeniu.”; two trees (Eksploracja, Zbieranie małych przedmiotów) with all „Kup” greyed. | as the task says |
| 8 | `25-postac-after-zakoncz.png` | After „Zakończ”: same screen without the sentence about the unfinished run and without „Wróć do przejścia”; the „Kup” stay greyed because the points are 0. | as the task says |

Focus after „Kup” (item 2): **not reached.** No point was earned. A run showed „Wprawa w tym przejściu:
Eksploracja +1”, but the tree stayed at „wprawa 0/15 · punkty 0” and every „Kup” stayed inactive (see Searches
not found or unclear, point 2). After „Zakończ” focus stood on the Postać screen container (a DIV, not a field).

### Programy (items 3 and 4)

| # | Screenshot | What it shows | Result |
|---|---|---|---|
| 9 | `07-programy.png` | Bar with „Programy” marked. Left a panel with the list (one entry „Program”, marked by a line at its left), „Nowy program”, „Zmień nazwę”, „Usuń” (greyed, only one program); right the programme panel: group row, condition, „Dodaj regułę”, „Dodaj grupę”, „Plan wyprawy”. No list „Program:” in the panel. | as the task says |
| 10 | `14-programy-run-waiting.png` | With a run waiting: above the editor „Zmiany tutaj nie dotykają przejścia na mapie Las.”; no „Przełącz postać na ten program”. | as the task says |

Address: „Nowy program” made „Program 2” and the address became `#/programy/2`; a click on „Program” in the list
gave `#/programy/1`. `#/programy` alone shows the first program with no number in the address.

Unsaved text (item 3), measured by reading both programmes afterwards:

- Typed „ZZZ” at the end of the group name of programme 1 and left the field **without blur** by browser Back
  (`go-back`): the text was committed to programme 1 (shown: „ProgramZZZ”); programme 2 stayed „Program”.
  Screenshot `08-programy-typing-unsaved.png` (text only; shows the field with the typed text).
- Typed „YYY” in programme 2 and clicked the bar link „Siedziba”: programme 2 became „ProgramYYY”, programme 1 unchanged.
- Typed „QQQ” in programme 2 and clicked „Usuń” (programme shown): programme 2 disappeared from the list, the address
  became `#/programy`, programme 1 was shown and kept „ProgramZZZ”; „QQQ” did not appear anywhere.
  `09-programy-after-delete.png`.
- Result of all three: as the task says (the text goes to the programme that was shown, nothing goes astray).

Programy at 1920 / 1000 / 640: `27-programy-w1920.png`, `27-programy-w1000.png` (both text only), `27-programy-w640.png` (seen):
at 640 the list panel stands above the editor panel, both full width.

### Siedziba beside a waiting run (item 4)

`12-siedziba-run-waiting.png` (seen): bar „Siedziba” marked, „Programy”, and „Wróć do przejścia · Las · minuta 12”. The
„Wyślij” of „Aria” is greyed; under the row stands „Przejście na mapie Las jest niezakończone. Wróć do niego i je
zakończ, żeby wysłać postać.”. Same sentence with the run dead and waiting: `23-siedziba-run-dead-waiting.png` (seen), bar
„… minuta 243”. „Puść w pętlę” is not on the screen at all (the map is not solved), so its inactive state was not seen.
Result: as the task says for „Wyślij”; „Puść w pętlę” not reached.

### Przejście, leaving and coming back

| # | Screenshot | What it shows | Result |
|---|---|---|---|
| 11 | `11-przejscie-running.png` | After „Wyślij”, address `#/postac/1/przejscie`. Bar: „Siedziba”, „Programy”, none marked, no „Wróć do przejścia”. Left the panel with the list „Program:” („Kopia w przejściu” on top, then the saved programmes), „Nowy program”, „Kopia: Program”, three greyed buttons, editor; right the run column „Minuta 5 · Czeka — żadna reguła nie pasuje · Passa 5/480”, „Pauza”, 1×–16×, „Restart”, „Zakończ”, the status line, the hex map. | as the task says |
| 12 | `15-przejscie-back-paused.png` (text only) | After leaving through „Siedziba” and coming back through „Wróć do przejścia · Las · minuta 12”: „Minuta 12 … (pauza)”, with „Wznów” in place of „Pauza”; the minute did not grow in 3 s; „Wróć do przejścia” gone from the bar. | as the task says |
| 13 | `17-przejscie-other-program-switch.png` | List set to „Program 2”: the red button „Przełącz postać na ten program” stands above „Nowy program”. With „Kopia w przejściu” or the programme the run came from (`16-przejscie-saved-program-selected.png`, seen) the button is not there. | as the task says |
| 14 | `19-przejscie-stopped-discovery.png` (text only) | Run stopped by itself at a discovery: „Minuta 84 · Eksploruje · … (pauza)”, „Odkryto: Eksploruj, Wędruj, drzewo umiejętności Eksploracja …”. | as the task says (the discovery stop of the skill) |
| 15 | `22-przejscie-after-run.png` | Death: „Minuta 243 · Mag zamarzł”, only „Restart” and „Zakończ” left, line „Wskrzeszenie zużyte: wprawa i wykupione stopnie zostają.”, stats in red („Temperatura 31,1 °C”, „Sytość 0 %”). | as the task says |

„Zakończ” (state 8): led to `#/postac/1`, Postać of the character.

Reload and address:

- Reload at `#/`, `#/postac/1`, `#/programy`, `#/programy/1`, `#/postac/1/przejscie`: each stayed on its own screen
  (read from the visible headings and the marked bar item). Screenshot `18-reload-at-przejscie.png` (text only: „Minuta 12 … (pauza)”).
- Open the game address without a fragment while a manual run is held in the save: it opened `#/postac/1/przejscie`
  (`30-open-without-fragment-with-run.png`, text only). After „Wyloguj” and sign-in through the form it also stood on
  `#/postac/1/przejscie` (`32-after-login-with-run.png`, text only; the fragment had stayed from before the logout, so
  this one proves less than the open-without-fragment case).
- Back and forward (Siedziba → Programy → Wróć do przejścia, then back ×3 and forward ×2): each step landed on the
  expected screen with the expected bar item (`29-forward-at-przejscie.png`, text only).
- Crafted fragments, each typed into the address (`10-long-fragment.png`, seen, shows the result of the long one:
  Siedziba): `#/postac/x` → `#/` Siedziba; `#/programy/-1` → `#/` Siedziba; `#/programy/99` → `#/programy`;
  `#/postac/99` → `#/` Siedziba; `#/postac/99/przejscie` → `#/` Siedziba; `#/postac/1/przejscie` with no run →
  `#/postac/1`; `#/zzz` → `#/` Siedziba; a fragment `#/programy/` + 3000 letters „a” → `#/` Siedziba. All as the task says.

### Resurrection line (item 5)

Wording on Siedziba and on Postać with the run dead: „Wskrzeszenie za 8 godz. 0 min czasu realnego — śmierć zabierze
wprawę i wykupione stopnie” (`23`, `24`, seen, red text). Read twice on Siedziba, 63 s apart (15:25:51 and 15:26:54,
`document.querySelector('main').innerText`): „… za 8 godz. 0 min …” then „… za 7 godz. 59 min …”; after „Zakończ”
the Postać showed 7 godz. 59 min, later 7 godz. 58 min on Siedziba (`26-siedziba-w1920.png`, seen). Changes with time while the run
waits: as the task says. The form below an hour („za {m} min czasu realnego”): not reached (the countdown starts at 8 hours).

### Windows (item 7)

Measured by `getBoundingClientRect` of the bar and the first block of `main`:

| Window | Bar left–right | Content left–right | Horizontal scroll |
|---|---|---|---|
| 1920 | 288–1632 (1344) | 288–1632 | none (`scrollWidth` 1920) |
| 1000 | 16–984 | 16–984 | none |
| 640 | 16–624 | 16–624 | none |

Bar and content have one shared width on Siedziba, Programy and Przejście. Screenshots: `26-siedziba-w1920.png` (seen),
`26-siedziba-w1000.png`, `26-siedziba-w640.png` (seen), `27-programy-w*.png`, `28-przejscie-w1920.png` (seen),
`28-przejscie-w1000.png` (seen), `28-przejscie-w640.png` (seen).
Below 720 (640): Programy puts the list above the editor; Przejście puts the programme panel above the run column,
both full width. Siedziba has no columns to rearrange (single panel); at 640 its sending row breaks into two lines
(list and map name, then the map sentence and „Wyślij”). Result: as the task says.
At 1000 the rule row of the editor breaks (arrows and „Usuń” fall under the action list) — old layout inside the
panel, not part of this change.

## Defects

None that a player would call a fault were found in what could be reached. Points for the human's attention, not
faults: the swallowed first click on a text field while „Konto” is open (see Menu „Konto”), and the menu covering
the top right of the content while open.

## Not reached

- „Gdy cię nie było” on Siedziba, and any character in a loop („Zatrzymaj”, stopped-loop row, „Puść w pętlę” inactive):
  the loop needs a solved map, and solving „Las” takes 480 minutes with a program that survives; not reachable by playing here.
- Focus after „Kup”: no skill point could be earned (see below).
- The page's own sentence above the game after a confirmed address / „Ustaw nowe hasło” / „Anuluj”: needs mail, which
  does not leave this start (the skill's own list).
- The form „za {m} min czasu realnego” of the resurrection line (below an hour).
- Resurrection line „changes with time” after a completion of the map (480 min) : the run ended by death, not completion.

## Searches not found or unclear

1. The title of the handoff mentions the sentences with the run „paused”; confirmed. The state of a run ended by
   **completion** was not seen (only death).
2. Unclear, simulation not screen: the run showed „Wprawa w tym przejściu: Eksploracja +1” (also while the resurrection
   was used), but after „Zakończ” the tree still read „wprawa 0/15 · punkty 0”. I could not tell whether +1 is a partial
   step, a rule of the resurrection, or a lost credit; this is not a layout matter and not part of this change, so
   I report it only so the owner can compare it with the expectation.
3. Unclear: after a discovery the saved „Program” (programme 1) gained the rule „Zawsze → Eksploruj 1×” although
   I had saved nothing in the copy (the copy said „Niezapisane zmiany w kopii.”); I did not check whether the game
   did this before this change. „Dodaj regułę” was greyed in the first look at the empty programme (no action was
   known then), so the rule came with the discovery.
4. I could not run the walk's „waiting screen” with „Potwierdzanie adresu…” and the warning „Spróbuj ponownie”: only
   „Sprawdzanie logowania…” was made visible (by delaying `/api/account`).
5. Console of the page: 2 entries at the start, a 401 on `/api/account` (not signed in) and a 404 for `/favicon.ico`.
