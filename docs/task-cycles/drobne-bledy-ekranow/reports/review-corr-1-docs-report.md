FAIL 9350cfe22adc3a693b8152bd3b03e2d8a2917c75

# Review of correction 1, pass 2 (documents), cycle `drobne-bledy-ekranow`

Range: `c015e4c6d8b55796ecf0c1af06f7d379dd7ccdf5..9350cfe22adc3a693b8152bd3b03e2d8a2917c75`. `git rev-parse HEAD` is `9350cfe22adc3a693b8152bd3b03e2d8a2917c75`, the head the handoff gives. `.the-way` stands at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records. Scope: the diff of `foundations/decisions.md` and `guidelines/styleguide-browser-view.md` in the range, remarks 3, 5 and 6, and the sentences that part A made untrue. Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. The remarks in `reports/correction-1-remarks.md` take the findings file's place.

Counts: 1 blocking (Important), 4 Minor, 0 out of scope.

## Findings

### Important

**I-1. D-367 says only leaving the screen cuts a running effect, but the code ends one on any cancel. The end-of-run window also cancels one.**
Anchors: `foundations/decisions.md:11303` (binding sentence), `foundations/decisions.md:11308`–`11310` (the new pair of examples), `guidelines/styleguide-browser-view.md:847`–`849` and `:870`–`872`.

The new wording of D-367's binding sentence is: "an effect already running finishes, standing still while the scene does, unless the map run is left, the screen of the run is left or a new map run starts". The styleguide sentences it brings along say the same: „Efekt, który gracz przerwał wyjściem z ekranu przejścia, a którego animację przeglądarka anuluje, kończy się jak przy końcu animacji…” (line 847) and „bieg wilka i wynik starcia, które gracz przerwał wyjściem z ekranu przejścia, kończą się z anulowaną animacją…” (line 871).

Why the text exists: remark 1(a) asked for the effects that leaving the screen cuts to be over when the player comes back. Part B widened D-367 so that the text names that new way an effect ends.

What the code does. The listener added at `src/browser/view/scene.tsx:799`–`804` ends a flight, a dust cloud and a wolf's effect on every `animationcancel` whose target is the effect's own element. Leaving the screen is only one cause of that. A browser cancels the animations of every element that `display: none` takes out, paused ones included. While the end-of-run window stands, `src/browser/view/run-screen.tsx:180` puts `hidden` on `.run-world`, which holds the scene, and `src/browser/styles.css:20`–`22` makes `[hidden]` `display: none !important`. That is D-370: "the header and the three areas of the screen of a map run are not shown, though they stay in the page with their state". The player is still on the screen of the run, as D-371 says: "the window stands only while it is open, the player is on that screen". The map run is not left and no new one starts.

An example with concrete values. At 16×, reading k carries the end of „Zbierz — patyk” with a hit, and the flight of the icon starts (300 ms). Reading k+1, 200 ms later, carries a death by cold. The scene takes `data-standing="dead"`, and `src/browser/run-screen.css:1330`–`1332` holds the flight paused at about 200 ms. That is D-367's "standing still while the scene does", and the test at `tests/view/scene.test.mjs:1199` holds the hold at a stop. The death effect plays. When it ends, D-371 opens the window, `.run-world` becomes `hidden`, and the browser cancels the flight's paused animation. `effectOver` then drops the flight. After „✕” the scene shows no flight. D-367 says the flight still stands where it was held, because none of its three causes happened.

Same kind of departure: a defeated wolf's fall held at a death or a completion that follows within 300 ms, at styleguide line 871. The return of the tint is not affected, because at a death and a completion the tint stands at once (D-316).

Grade: Important. The correction changes D-367, and the correction's own code (`scene.tsx:799`–`804`) drops an effect in a case where the changed entry says the effect stands (WAY-263, WAY-364). D-367 now lists the causes of a cut by name, so a reader takes the list as whole. A later change that relies on it, such as one that keeps a held effect under the window to show it after „✕”, would be built on a sentence the code does not keep. Not checked in a browser, because the handoff forbids starting the game. The mechanism is from the code and the stylesheet cited above.

Fix (text only; the code's behaviour is the one D-317 wants, an overdue effect dropped). D-367: "unless the map run is left, the scene is hidden — by leaving the screen of the run or by the end-of-run window that stands in its place (D-370) — or a new map run starts". The pair of examples at 11308–11310 and the two styleguide sentences get the same cause, for example: „Efekt, którego animację przeglądarka anuluje, bo scena zniknęła — gracz wyszedł z ekranu przejścia albo stanęło okno końca przejścia (D-370) — kończy się…”.

### Minor

**M-1. D-04 cites D-207 for the saver's sentence, but D-208 settles it.**
Anchor: `foundations/decisions.md:67`: "the saver's sentence for the row of saving (D-207, D-407)". D-207 ("When does the game save the game state on the server?") settles when saves are sent and has no sentence. D-208 ("What does the player see of saving the game state?") settles „Nie udało się zapisać postępu. Gra spróbuje ponownie.”, the too-large sentence and when the sentence goes. Part B's report lists this sentence as not found in any decision ("Searches not found", second item). D-208 holds it. Example: a reader who follows D-207 to learn what the row of saving shows finds the rhythm of saving and no sentence. Fix: cite "(D-208, D-407)" or "(D-207, D-208, D-407)".

**M-2. D-04's "only from" list does not name the account's previous-save privilege, from which Programy draws two controls.**
Anchor: `foundations/decisions.md:64`–`75`. `src/browser/view/programs-entry.ts:89` (`if (!options.previousSaveAllowed || options.onReset === undefined)`) and `src/browser/view/game-view.ts:222` show that Programy draws whether „Wciągnij programy z poprzedniego zapisu” and „Zacznij od zera” stand from `previousSaveAllowed`. That is the account's flag (D-400), given by the server at sign-in, and it is neither the game state nor a memory the list names. I grade it Minor, not Important, for two reasons. The item "the pull of the previous save and the reset control of Programy (D-401, D-402)" cites two decisions that each open with "An account with the previous-save privilege has…", so the condition can be read into the citation. And D-407 counts the menu bar and the rows of sentences as places "besides the game", which keeps the other server answers (the address in „Konto”, the role in D-410, the list of accounts) outside "draws the game", as part B judged. Apart from this, I searched the view for every memory of the page: module-level state, `useState`/`useRef`, the factories, `matchMedia`, `localStorage`/`sessionStorage`, `document.visibilityState`. Every other memory is named, or is the state of one screen's own component, which the clause citing D-407 covers. D-407 settles that ("the state of one screen lives in the component of that screen"). Each other citation settles what it is cited for: D-281 the address; D-317 reduced motion; D-294 the folding; D-339, D-346 and D-383 the chronicle, its tab and its filter as memories of the page; D-324 "the question lives in the memory of the page alone"; D-371 the window; D-401 and D-402 the pull and the reset. Fix, if wanted: add "the account's previous-save privilege for the controls of Programy (D-400)".

**M-3. The new paragraph of the typed-name rule lists the places the view has today, and the list already misses the chronicle.**
Anchor: `guidelines/styleguide-browser-view.md:541`–`552`. The paragraph names the kinds of text, which is the rule. It then lists today's places: the team row, „Kto idzie”, the two headings, Programy, the menu, the list of accounts, and in parentheses the sentences „pas odkrycia, wiersz o kopii programu, pytanie „Zakończ”, raport z nieobecności, ostrzeżenie przy wciąganiu programów”. `.the-way/product-guidelines/template.md:90`–`97` (WAY-312) says "A rule lists no state… A sentence that lists what the code or the product is today goes stale when the code changes". The list already misses the chronicle, which names a group or a program in „Dodano grupę „{name}””, „Zmieniono grupę…” and „Kopia…” (`src/browser/view/chronicle-entries.ts:237`–`251`, `:286`–`287`), and its copy in „Ostatnie minuty” of the end-of-run window. The code holds the rule there (`.chronicle-text` already has `overflow-wrap: anywhere`), so the gap is only in the text. A reader who takes the parenthesis as whole could still change `.chronicle-text` without the pair. Fix: keep the sentence on the kinds and the exception for the native `select`, and drop the list of places or mark it as examples. Part B offered this as its concern 5.

**M-4. D-367 hands an agent a case that a test already holds.**
Anchor: `foundations/decisions.md:11308`–`11310`: "For an effect running when the screen of the run is left, an agent compares a change with the part no test of this decision holds". The test at `tests/view/scene.test.mjs:1990` ("an effect or a return of the tint cut by leaving the screen…") holds exactly that case for the flight and the dust. Its header comment names D-367, but its `decision:` lines name D-317 and D-316 only, so the clause `tests:` of D-367 cannot name it. A test then stands behind a pair of examples marked "no test holds". Fix, which is part B's concern 2: add `// decision: D-367 "Any other reading starts none"` to that test, and move the case into D-367's clause `tests:` in place of the pair. Widen the cause as in I-1.

## Each remark

- **1(a): made** (documents within my scope). D-316, D-317 and D-367 *Verification* and the four styleguide passages (792, 847, 871, 896) say what `scene.tsx:744`–`804` does when the screen is left. The test those clauses name exists at `tests/view/scene.test.mjs:1990` under the title the clauses paraphrase. It cuts the flight, the dust, the wolf's run in, its fall, its run off and the return of the tint, and checks each over and not played again. It passes (focused run below). The new wording of D-367 is narrower than the code (I-1). D-367 does not collide with D-317: D-317's "an effect overdue when its turn comes is dropped" is what the cut keeps. Nor does it collide with D-316's "never dropped as an effect" for the tint (`decisions.md:11002`): a cut return ends at its target tint ("warstwa stoi na odcieniu, do którego szła", styleguide 793–794), and `tintOver` sets `from: null`. The code itself is pass 1's.
- **1(b): made** (documents within my scope). `guidelines/styleguide-browser-view.md:726`–`728`: „Liczba z ułamkiem w zdaniu reguły stoi z przecinkiem dziesiętnym, jak temperatura w wierszu ciała (D-57)” is true of `program-editor.ts:802`–`809` and `body-row.ts:19`. D-57 is a fitting citation for the tenths of the body row ("shown cut down to tenths in the body row"). D-178 would not be, as part B says. `tenths` cuts down with `Math.floor`. I checked every tenth from −50.0 to 150.0, and none is written short (script below).
- **1(c): made.** The rule „A name typed by the player breaks in its row” is now true of the code. I searched `src/browser/view/*.ts(x)` for every place a character's name, a program's name (with `deletedName`), a group's name or the account's address reaches the screen. Each element carries the pair or already broke: the team row (slice 13), `.program-list-item`, `.maps-who-name`, `.character-screen h2`, `.run-header-name`, `.program-title`, `.copy-heading`, `.copy-line`, `.rule-list-name`, `.end-question-note`, `.discovery-band-text`, `.end-window-discovery-text`, `.away-report-text`, `.account-menu-address`, `.account-menu-sentence`, `.accounts-email`, `.form-warning`, `.form-note`, `.chronicle-text`. The only element left is the native `select` of programs (`maps-screen.tsx`, `program-panel.tsx`), which the rule now names as its exception. That is a deliberate decision of the correction, so it is no finding. The name-field messages (`NAME_MESSAGES`) name no program, and `aria-label`s are not drawn. The text of the paragraph that lists places is M-3.
- **2: let through.** Nothing to do, and nothing was done.
- **3: made.** `decisions.md:11099`–`11103`. The test at `tests/view/scene.test.mjs:653` exists under the title "a walk cut by an action that leads nowhere stops the mage where it has reached, and the place it was walking to is not reached". It carries `decision: D-319 "A target that changes on the way turns the mage from the place it has reached"`, and it holds what the new clause says: for five actions that lead nowhere, the mage stands at 62.7976 %, where its walk had brought it, with no walk. The lead-in that said no test holds a changed target now says only the turn toward another place has none. I searched `tests/` for another test of such a turn ("on the way", "half way", a stubbed `getComputedStyle`) and found none, so the narrowed lead-in is true. The pair of examples beneath it is about that turn.
- **4: made.** `tests/view/rule-editor.test.mjs:1127` and `tests/view/program-panel.test.mjs:1044` read „Zapas poniżej 8 szt. · Patyk”. A search of `tests/` and `src/` finds no „Zapas poniżej 8 · ” left. This is pass 1's file scope, checked only by grep.
- **5: made**, with M-1 (a wrong citation) and M-2 (one source left unnamed, which can be read into a citation). The list now names every memory of the page I found in the view. The sentence reads as one list, and D-04's *Verification*, *Rationale* and *Rejected* still agree with it: the *Rationale*'s "whether the end-of-run window is open stays a memory of the page (D-371)" is still true.
- **6: made.** `guidelines/styleguide-browser-view.md:1020`–`1021` cites D-370, whose binding sentence says "Escape is read in the window and not on the document". D-370 is also added to the section's *Decision* list (line 985). D-285 stays in that list for the menu bar, which is harmless.

## Declined to judge

- The code and tests of 1(a), 1(b), 1(c) and 4 as code (focus, selectors, CSS, the browser check): pass 1's scope. I read them only to judge the documents.
- The native `select` of programs widening the page with a long name: a deliberate design question for the human that goes to the request, as the handoff gives.
- The slice 19 walk test at `tests/view/run-screen.test.mjs:1099` carries no `decision:` line though D-319's clause names it (part B's concern 4). It existed before this range.
- Whether the walk (D-319) also ends when the end-of-run window hides the scene, the same mechanism as I-1. It existed before this range, and D-319's text is not about leaving alone in a way this correction changed.

## Checks

| Check | Command or method | Result |
|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | exit 0, `0 error, 142 warn, 7 info` (warnings not compared with the base) |
| The tests D-316, D-317 and D-367 name for the cut | `npm.cmd test -- tests/view/scene.test.mjs` (its log stood in `.runs/review-corr-docs/`, since removed) | exit 0, 73 of 73 |
| `tenths` exact for every tenth, the 1(b) clause | `node -e` loop over −50.0…150.0, comparing `(Math.floor(v*10)/10).toFixed(1)` with `v.toFixed(1)` | exit 0, 0 mismatches |
| I-1 in a running browser | not run | the handoff forbids starting the game; the finding rests on `run-screen.tsx:180`, `styles.css:20`–`22`, `run-screen.css:1330`–`1332` and `scene.tsx:799`–`804` |
| Full suite | not run | the handoff forbids it |

## Reaches beyond the handoff

- `.the-way/product-guidelines/template.md`, read whole: section 2 of the method compares a change of guidelines with it (M-3). `.the-way/product-guidelines/styleguide/template.md` was not read.
- Decisions, to judge D-04's citations and D-367's wording. Binding paragraphs only: D-207, D-208, D-211, D-281, D-294, D-323, D-324, D-339, D-346, D-383, D-400, D-401, D-402, D-407. Whole: D-57, D-318, D-370, D-371.
- Code, to judge the sentences: the diff of `src/browser/view/scene.tsx`, `program-editor.ts`, `body-row.ts` and the CSS in the range; `src/browser/view/run-screen.tsx:130`–`215`; `src/browser/styles.css:15`–`30`; `src/browser/run-screen.css:1322`–`1333`; the header of `src/browser/view/tabs-area.tsx`; the headers and mutable state of `run-screen-state.ts`, `maps-entry.ts`, `run-entry.ts`, `character-entry.ts`, `headquarters-entry.ts`, `knowledge-entry.ts`, `programs-entry.ts`, `game-view.ts`, `state-store.ts`, `clock.ts`, `screen-registry.ts`; greps of the view for names, addresses, `select`, `matchMedia` and storage.
- Tests: `tests/view/scene.test.mjs:309`–`321`, `548`–`700`, `1195`–`1245`, `1980`–`2075`; `tests/view/run-screen.test.mjs:1090`–`1110`.
- `.runs/task-cycles/drobne-bledy-ekranow/task.md`: searched for D-04, D-367, D-319, D-370, D-285 and the typed-name rule, to see what the task set for D-04 (point 16 and question 5).

## Working copies

`.runs/review-corr-docs/` in the task's worktree held the log of the focused test run. It was removed (`rm -rf`) before this report was written, and none remains. No worktree, clone or screenshot was made.

## Unread material

- `.runs/task-cycles/drobne-bledy-ekranow/task.md`: not read whole. Only the lines a search for the entry identifiers and the typed-name rule found (26, 34, 40, 69–73, 169, 174, 182, 185).
- `guidelines/styleguide-browser-view.md`: not read whole. I read the diff hunks of the range with their context, 520–560, 708–730, 785–800, 840–900 and 980–1025.
- `reports/slice-19-report.md` and the other earlier reports: not opened. Part A's report carries the cut walk.
- `.the-way/product-guidelines/styleguide/template.md`: not read.
- D-04, D-316, D-317, D-319 and D-367 were read whole with their *Rejected* (D-367's is "unknown").

## Searches not found or unclear

- A test, other than the one at `scene.test.mjs:653`, of a target that changes on the way toward another place (D-319): none found (`on the way`, `half way`, stubbed `getComputedStyle` in `tests/`).
- A `decision: D-367` line on the new cut test at `scene.test.mjs:1990`: none (M-4).
- Another way the scene is hidden on the screen of the run besides the end-of-run window (a tab, a media query, a panel): none found. The tabs „Kronika”/„Teren” sit below the drawing, and the `display: none` rules of `run-screen.css` are parts of the mage's sheets.
- Whether a browser fires `animationcancel` for an animation that a stop holds paused when its element is hidden: not checked in a browser (I-1). The CSS Animations behaviour I relied on is that `display: none` cancels every animation of the subtree.
