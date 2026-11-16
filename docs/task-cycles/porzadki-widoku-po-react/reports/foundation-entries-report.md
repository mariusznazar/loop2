# Report — the agent of the plan's Foundation entries

**Status:** done (one gap for the human named below, no question blocking).

**Commit:** `f5b1c0e4` on `task/porzadki-widoku-po-react` — the only change is `foundations/decisions.md` (+31 / -16 lines by `git diff --stat`). Slice 1 starts from it.

**Method followed:** `.the-way/task-cycle/skill/foundation_step.md`, `.the-way/elements/decisions/skill/SKILL.md` with its `read.md` and `decide_entry.md`, `.the-way/elements/decisions/template.md`, `elements/common/way_of_working.md` and `rules.md`, `.the-way/task-cycle/change/SKILL.md` (report and checks only).

## Entries

| # | Entry | Mark | Meaning (English) | Znaczenie (po polsku) |
|---|---|---|---|---|
| 1 | D-421 (new), section "Browser view: screens, navigation and their code", after D-416 | row 1 | The shared `src/browser/styles.css` keeps the base rules, the one `:focus-visible` rule, the menu bar, the rows of sentences, the shared controls and what the kitchen-sink page draws besides the controls, and each screen and each part several screens use has a `.css` file of its own directly in `src/browser/` with a `<link>` of its own, the build unchanged. | `styles.css` zostaje plikiem wspólnym (reguły podstawowe, jedna reguła `:focus-visible`, pasek menu, wiersze zdań, wspólne kontrolki i to, co rysuje strona wzorcowa poza kontrolkami), a każdy ekran i każda część używana przez kilka ekranów ma własny plik `.css` wprost w `src/browser/` z własnym `<link>`, bez zmiany budowania. |
| 2 | D-408, changed | row 2 | A new screen also adds its own stylesheet file and the `<link>` that gives it to the player. | Nowy ekran dodaje też swój plik arkusza i swój `<link>`. |
| 3 | D-407, changed (binding sentence and *Verification*) | row 3 | The screen Przejście and its program panel read the question and the end-of-run window from the state of the screen Przejście, and the game view calls no method of either to show them. | Ekran Przejścia i jego panel programu odczytują pytanie i okno końca przejścia ze stanu ekranu Przejścia, a sterownik widoku nie woła ich żadną metodą, żeby je pokazać. |
| 4 | D-407, *Verification* (same commit as 3) | the cycle's (carried by To do 7 of the accepted task, no row of *Settlements to record*) | The example of compliance for a new screen shows a shared memory (the folding of the rule groups, given to the program panels of Programy and Przejście) and a setting only one screen reads kept in its component (the open trees of the screen Wiedza, D-416), which D-407 allows and which does not contradict the screen Wiedza. | Przykład zgodności dla nowego ekranu pokazuje pamięć wspólną (zwijanie grup reguł w panelach Programów i Przejścia) i ustawienie czytane tylko przez jeden ekran, trzymane w jego komponencie (otwarte drzewa ekranu Wiedza, D-416) — kształt, który D-407 dopuszcza i który nie przeczy ekranowi Wiedza. |
| 5 | D-43, changed | the cycle's (carried by To do 8 of the accepted task, no row) | The binding sentence now also gives `text-strong` to the icon on each plaque of a discovery in the scene, where no text stands beside it, as the stylesheet does today. | Zdanie wiążące obejmuje też ikonę na tabliczce odkrycia na scenie, bez tekstu obok, w `text-strong` — tak, jak robi to dziś arkusz. |

Entries 4 and 5 carry no row and no projected entry; by the foundation step they are marked `the cycle's` and the request puts them before the human. Both come from To do items the human accepted with the task document.

## Passages of the entries changed (as they stand in `foundations/decisions.md`)

**D-421** (new). Binding sentences: "`src/browser/styles.css` stays the shared stylesheet of the game, the game's stylesheet of D-47 and D-265 that keeps the one `:focus-visible` rule: it holds the base rules, that rule, the menu bar, the rows of sentences, the shared controls and the rules of what the kitchen-sink page draws besides the controls — the drawing of the map (`terrain-drawing`), the table of tiles (`tile-list`), the form (`form`) and the block of the account menu (`account-menu-block`). Each screen and each part that several screens use has a stylesheet of its own, a `.css` file directly in `src/browser/`, which a `<link>` of its own in `src/browser/index.html` gives to the player and which the build copies as it copies the other files of that kind, with no change of the build. The kitchen-sink page links the file of design tokens, `src/browser/styles.css` and its own stylesheet alone." *Scope:* browser-view. *Based on:* none. *Relations:* derives from D-28 · D-47 · D-265. *Verification:* a pair of examples (no test holds it yet). *Origin:* none. *Rationale* and *Rejected* are written from the *Not chosen* of questions 2, 8 and 9 and of question 5 of the earlier refinement (the split inside the React task), each with its cost.

**D-408.** Third binding sentence added: "A new screen also adds its stylesheet, a file of its own directly in `src/browser/`, and the `<link>` of its own in `src/browser/index.html` that gives the file to the player (D-421)." *Relations* gains `derives from D-421`. *Verification*, complies: the example of the screen Wiedza now also has "its stylesheet as a file of its own directly in `src/browser/` and the `<link>` to it in `src/browser/index.html`"; violates: "a new screen whose rules are written into the shared stylesheet or into the stylesheet of another screen". *Rationale* has one sentence more; *Rejected* was `unknown` and now reads "for the stylesheet of a new screen: a split made once, … the shared stylesheet would grow again; for the rest of the decision: unknown" (question 3, *Not chosen* b).

**D-407.** Third sentence of the first paragraph: "The screen Przejście and its program panel read the question and the window from the state of the screen Przejście, and the game view calls no method of either to show them." *Verification*, tests clause: "which draws each only while the game view tells it to and asks the game view to close the window" became "which draws each only while that state shows it". Complies: "a new screen built as a root of its own, whose factory receives the game state from the store and a memory it shares with another screen, as the folding of the rule groups is given to the program panels of Programy and Przejście, as a memory of the page read through `useSyncExternalStore`; a setting only that screen reads, as the open trees of the screen Wiedza (D-416), kept in its component; a new thing the screen Przejście shows, read from the state of the screen Przejście". Violates gains: "a method of the screen Przejście or of its program panel that the game view calls to show the question or the window". *Rationale* gains one sentence (one way of refreshing a screen); *Rejected* gains the two ways of question 4 *Not chosen* b and of question 6 of the earlier refinement, variant c.

**D-43.** Binding sentence ends now: "… from `text-strong`, and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either." *Verification* complies and violates gain an example each for the plaque of a discovery; the *Rationale* list of the places gains "on the plaques of a discovery in the scene".

What the stylesheet does today (read for entry 5): `src/browser/styles.css:2281-2288` sets `color: var(--text-strong)` on `.scene-flight-plaque, .scene-discovery-plaque`; `.icon-mask` (line 582) paints with `background-color: currentColor`; `src/browser/view/scene.tsx:266-277` draws the plaque as a `div.scene-discovery-plaque` holding only a `span.icon-mask`, no text. So the icon is in `text-strong` with no text beside it, and D-43 says so.

## Choices

- **D-43 wording kept the quotations of the test files valid.** Tests cite D-43 by a line `decision:` whose quotation ends at "from `text-strong`" (`tests/view/maps-screen.test.mjs:277`, `rule-editor.test.mjs:233`, `scene.test.mjs:222, 940`, `trip-plan.test.mjs:89`, `world-area.test.mjs:810, 834, 1148`). Putting the plaque of a discovery inside the list "— in the badge …, on the plaque of the icon flying to the mage and in the drawing of the map —" would have broken each quotation and `foundation_check` would fail until a slice rewrote them, and the handoff gives me no test to write. So the plaque stands after the list, in the same sentence. Cost if wrong: the sentence reads less evenly (a list of three, then a fourth place). Way rejected: the cleaner list with eight `decision:` lines rewritten by a later slice; the orchestrator may choose it for Slice 8.
- **D-407 *Verification* no longer says the screen "asks the game view to close the window".** The handoff's row gives no way the window closes after the change (today `controls.closeWindow()` goes through the game view); I did not keep a clause that Slices 1 and 2 may make false. Slice 1 or 2 may put it back if the call stays.
- **D-421 placed in "Browser view: screens, navigation and their code"** (not the "Look" section): D-265, D-407 and D-408 stand there, and D-408 now derives from it; the section list shows the "Look" section is for tokens, controls' meaning, pictures and fonts.
- **Relations of D-421** use `derives from` for D-28, D-47 and D-265 (the closed list has no weaker type, and it goes against none of them); the invariant `browser-view-focus-outline` cannot stand in *Relations* (decisions only) and stands in the binding sentence's reference to D-47 and D-265 and in *Rationale*. It is not in *Verification* `invariants:` because it derives from D-42 and D-47, not from D-421.
- **The kitchen-sink sentence names the file of design tokens too.** The row says the page links `styles.css` and `kitchen-sink.css` alone; the page's `index.html` also links `/tokens.css` (read in `src/browser/kitchen-sink/index.html` and `src/browser/index.html`), so the sentence says "the file of design tokens, `src/browser/styles.css` and its own stylesheet alone".
- **"No change of the build" is true today:** `scripts/static-files.mjs` copies every `.css` directly in `src/browser/` (read).

## Gap for the human (no edit made)

D-40 and the styleguide still hold the list of three places that D-43 now extends to four. D-40, first paragraph (the sentence to read): "The badge over the mage's head stands on `panel` and the track of its progress bar in `highlight`, and the icon in the badge stands in `text-strong`, though it is no text and no text stands beside it; so does the icon flying to the mage, on its plaque in `panel`, and so do the icons of the drawing of the map, on `tile-revealed`." (`foundations/decisions.md`, D-40, with the *Rationale* sentence "though no text stands beside it" at the badge). It names badge, flying icon and drawing of the map and not the plaque of a discovery. The same list stands in the styleguide: `guidelines/styleguide-browser-view.md:25` (row `text-strong`: "stoi też na ikonie czynności nad głową postaci, na ikonie zasobu lecącej do maga i na ikonach rysunku mapy, choć obok nich nie ma tekstu") and `guidelines/styleguide-browser-view.md:112-113` ("nad głową postaci, na plakietce ikony lecącej do maga i na rysunku mapy — stoi w `text-strong` (D-43)"). Per the handoff, D-40 is not edited here; the styleguide is a guideline, outside my boundary. The question for the human: add the plaque of a discovery to D-40's sentence and to those two styleguide places, or leave D-40's sentence as a list of examples? If nothing is done, a reader of D-40 alone does not learn the plaque of a discovery is in `text-strong`; D-43 says it.

## Checks (commands and exit codes)

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors" (run without `--skip-test-citations`; no test of mine is missing a citation).
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0, "0 error, 141 warn, 7 info".
- The product's gate was not run (handoff).

## Own-work check

Requirement most likely not met: entries 3 and 4 make *Verification* of D-407 true afterwards, which depends on the code the slices write. Check: I read `src/browser/view/run-screen.tsx`, `run-entry.ts` and `run-screen-state.ts` by grep (`setQuestion`, `setWindow`, `closeWindow`) to see which sentences of the *Verification* the code supports today; the one clause that the change may falsify (closing the window through the game view) was removed, see Choices. Second check: all `decision:` quotations of D-407, D-408 and D-43 in `tests/` still stand in the binding sentences, because `foundation_check` reported 0 errors after the edit. Third: the word-diff of `foundations/decisions.md` read against this report — only the passages above changed.

## Reaches beyond this handoff

- `src/browser/styles.css:2281-2288, 2512-2520, 582-589`, `src/browser/view/scene.tsx:235-290`, `src/browser/kitchen-sink/index.html`, `src/browser/index.html`, `scripts/static-files.mjs`, `scripts/build.mjs`: to write what the stylesheet and the build do today (handoff answer 1 asked for the first two).
- `src/browser/view/run-screen.tsx`, `run-entry.ts`, `run-screen-state.ts`: grep only, for the D-407 *Verification*.
- `foundations/invariants.md` (`browser-view-focus-outline`, read whole), decisions D-28 (first half), D-39 (heading only), D-322 (grep), D-44 (read whole, not changed).
- The frozen `task.md` whole (the handoff offered it).

## Unread material

- D-35 and D-36: not opened (they bear on the cycle's guideline slice, not on these entries).
- D-28: read its binding sentence, *Scope*, *Relations* and *Verification*; not its *Rationale* and *Rejected*.
- D-265: read the first two paragraphs, *Verification* and the start of *Rationale*; not the end of *Rationale* and *Rejected*.
- The glossary `foundations/glossary.md`: not read (no term of the entries is new or used in another meaning).
- The part map: read the entry of `browser-view` and the lines of `build-tools` only, not the rest.
- The invariants file beyond `browser-view-focus-outline` and `design-token-contrast`: not read whole; I searched it for "stylesheet" and "styles.css" (one hit).
- `.runs/orchestrator/decision-index.md`: not opened; I located entries by grep of `foundations/decisions.md`.
- `.the-way/elements/decisions/examples.md` names WAY-03 in the-way's own log: not read.

## Searches not found or unclear

- None unclear. Not found: `styles.css` is named in `foundations/decisions.md` only by D-265 (grep, lines 4111 and 4134 before my edit); the invariants file names it only in `browser-view-focus-outline`.
- The mark of entries 4 and 5: the foundation step's three marks do not name an entry carried by a "To do" item; I used `the cycle's`, as its definition fits (no row, no projected entry).

## Working copies

`.runs/foundation-entries/` held only my outputs (`sections.txt`, `d40_43_47.txt`, `fc1.txt`, `ci1.txt`); no worktree, clone or screenshot was made. I removed the files before returning; nothing remains.
