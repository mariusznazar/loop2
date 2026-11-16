# Report — correction 1, part B (documents), cycle `drobne-bledy-ekranow`

**Status:** done with concerns (see "Questions and concerns"; nothing blocks, no question needs an answer to go on).

## Commits (on top of `8b068a5b793493bd344f55f6bcb65447ef9185c7`)

| Commit | Files | What |
|---|---|---|
| `3a10c9c8` docs: widen the sources D-04 lists to every memory of the page the view draws from, and bring the verification of D-316, D-317, D-319 and the cut of D-367 to what the code does when the screen of the run is left | `foundations/decisions.md` (+30/-8) | remarks 3 and 5, D-367, the *Verification* of D-316, D-317, D-319 |
| `9350cfe2` docs: cite D-370 for the Escape of the end-of-run window, name the kinds of typed text the rule of a name breaking in its row covers and its one exception, and bring the scene's lines on an effect cut by leaving the screen to what the code does | `guidelines/styleguide-browser-view.md` (+32/-9) | remark 6 and the styleguide sentences made untrue by part A |

No code, no test touched; no `decision:` line needed re-quoting (the foundation check, run after each commit, reported none).

## Each remark, as the human made it, and how it was made

### 3 — „add the test at `tests/view/scene.test.mjs:653` to D-319's list of tests and correct its example that says no test covers a changed target”
Made, in D-319 *Verification*. The test is "a walk cut by an action that leads nowhere stops the mage where it has reached, and the place it was walking to is not reached" (it carries `decision: D-319 "A target that changes on the way turns the mage from the place it has reached"` and one of D-318). Added to the clause `tests:`: „a target that changes on the way to an action that leads nowhere stopping the mage where its walk has brought it, the place it was walking to not reached”. The sentence that said no test holds a changed target (the lead-in of the pair of examples, „For the walk itself, a target changed on the way …”) now reads „a target that changes on the way to another place, which turns the mage from the place it has reached” — the part that no test holds (a turn toward another place; the test at :653 covers only the cut by an action that leads nowhere, checked by reading the test). The pair of examples is unchanged (it is exactly the turn toward another place). Part A's new tests are D-317's and D-316's case, not D-319's (a walk cut by leaving the screen was already in D-319's clause, slice 19's test), so D-319 got nothing of them.

### 5 — „A list that says „only from” and is not whole is false; widen it to every memory of the page the view actually draws from.”
Made, in D-04's second binding sentence (the three sources the task added stay; the walk's place stays). I searched `src/browser/view/` for state kept outside the game state and the save (module-level variables: none; `useState`/`useRef` in components; the factories `createFolding`, `createChronicle`, `createRunScreenState`, `createProgramsEntry`, `createStateStore`, `createGameSaver`, `createScreenRegistry`; `sessionStorage`/`localStorage`: none in the view) and read each deciding entry. D-04 now names, besides what it named:
- the address of the page for the screen shown (D-281; `game-view.ts` reads `address.hash()`);
- the system's setting for reduced motion for the scene (D-317; `run-screen-state.ts` takes `reducedMotion()`, the scene follows it);
- the saver's sentence for the row of saving (D-207, D-407; `game-view.ts` `saveRow` is drawn from `store.saveSentence()`);
- and, as „the memories of the page, none of them in the game state or the save”: the folding of rule groups (D-294), the chronicle with the tab and the filter picked over it (D-339, D-346, D-383), the question „Zapisać, odrzucić, wrócić?” (D-324), whether the end-of-run window is open (D-371), the pull of the previous save and the reset control of Programy (D-401, D-402; `programs-entry.ts`: „a memory of the page alone, never of the game state or the save”) and, for what one screen alone shows, the state of that screen's own component (D-407, which settles that such state lives in the component; the open trees of Wiedza D-416 and the menu „Konto” D-285 are examples I did not name in the sentence).
The sentence about the end-of-run window's memory moved into the list with the same decision (D-371); D-04's *Verification* and *Rationale* are unchanged.
Left out, because I judged the item no thing the *game* is drawn from: the list of accounts and the account card/menu draw from the server's answers (`accounts-entry.ts`, `account-card.tsx`) — D-04 is about the game, and no decision names those answers as a memory. See the concerns.

### 6 — „cite the decision that settles Escape of that window”
Made. `guidelines/styleguide-browser-view.md` „Escape czyta korzeń okna, nigdy dokument” now cites D-370 (the decision log's D-370 says „Escape is read in the window and not on the document”). D-285 does not hold there: it says only that the menu „Konto” closes on Escape. I also added D-370 to that section's `Decision:` list (D-285 stays in the list: the section also stands under the menu bar, which the list's D-275/D-276/D-285 serve; I did not decide whether D-285 should leave that list, only that it no longer carries this sentence).

## Sentences made untrue or incomplete by part A (what I changed, each checked against the code at the head, `scene.tsx:744–808`)

- **D-367** (`the cycle's`): „unless the map run is left or a new one starts” → „unless the map run is left, the screen of the run is left or a new map run starts”. Passage that gives it, remark 1(a): „a flight, a dust cloud, a wolf's run or the 2-second return of the light's tint that is cut by leaving the screen of the run plays again from its start on the return — an overdue effect played, which D-317 drops. Call the same end from the `animationcancel` listener for those elements”. D-317's sentence („an effect overdue when its turn comes is dropped”) is kept as it stands; I found no collision between D-367 and D-317 (D-367 derives from D-317 and the new wording is the same drop). Because the new test carries `decision:` lines of D-317 and D-316 only (no D-367 line), I did not put the cut into D-367's clause `tests:` (the clause names tests the lines find); D-367 got instead a pair of examples for „an effect running when the screen of the run is left” (complies: cut, over, not drawn again; violates: left at its first frame, plays from its start on the return). See concern 2.
- **D-316** *Verification* `tests:`: added „a return cut by leaving the screen of the run over, and not played again from its start on the return” (the return of the tint, case of the new test in `scene.test.mjs`, which carries D-316 „A loss of the streak while the map run goes on takes the tint back to the cool one”).
- **D-317** *Verification* `tests:`: added „the flight of an icon, a cloud of dust, the wolf's run in, its fall and its run off cut by leaving the screen of the run over, as the end of their animation makes them, and not played again from their start on the return” (the same test, line D-317 „An effect of an ordinary event is a short sign of one event”).
- **Styleguide „The scene of a map run”**:
  - the return of the tint (about 775–780): added that a return cut by leaving the screen ends as its animation's end ends it, the layer standing on the tint it was going to, and does not play again on the return (D-316, D-317);
  - the effect of a gathering (about 828–832): added that an effect cut by leaving the screen ends as at the animation's end and is not played again, as an overdue effect is dropped (D-367, D-317);
  - the wolf (about 853–855): added that the run in and the outcome of a combat cut by leaving end with the cancelled animation and do not play again;
  - the effect of a moment (about 877): kept, and added that the cancel tells the scene of the end as the last animation does, as for an ordinary effect and the return of the tint above.
- **Styleguide „A name typed by the player breaks in its row”**: *Good* now also names the program list and the account's address in the menu; a new paragraph names the kinds of text the rule covers (character's name, program's name, group's name, account's address) and the places of part A's table (team row, „Kto idzie”, headings of the run screen and Postać, list of Programy, program and group headings, the menu „Konto”, list of accounts, and the sentences that name them: discovery band, copy line, „Zakończ” question, away report, pull warning), and, as the rule's own exception, the native list of programs (`select`) which is as wide as its longest option and is not covered; its design (an ellipsis or a width cap) is left open in the text and goes to the request as a finding.
- **Styleguide „Program editor”** (the row of a rule): one clause added, „Liczba z ułamkiem w zdaniu reguły stoi z przecinkiem dziesiętnym, jak temperatura w wierszu ciała (D-57): „Temperatura poniżej 36,5 °C”.” and D-57 added to that section's `Decision:` list. **Not D-178**, as part A's report suggested: D-178 is the nature energy of the body row; D-57 is the unit of warmth, which holds „tenths in the body row” (the comma itself is the code's `tenths` in `body-row.ts`, no decision names it). No new rule.

## One sentence of meaning per entry and its mark (English; the task document's language is Polish)

| Entry | English | Polish | Mark |
|---|---|---|---|
| D-04 | The view draws only from the game state, the content data, the clock, the address, the reduced-motion setting, the saver's sentence, the previous reading and events, and the memories of the page the decisions name — none of them in the game state or the save. | Widok rysuje tylko ze stanu gry, danych treści, zegara, adresu, ustawienia ograniczenia ruchu, zdania zapisu, poprzedniego odczytu i zdarzeń oraz z pamięci strony, które nazywają decyzje — żadna z nich nie leży w stanie gry ani w zapisie. | `the cycle's` — remark 5: „widen it to every memory of the page the view actually draws from” |
| D-367 | An effect running when the screen of the run is left is dropped, as one running when the map run is left or a new one starts. | Efekt, który trwa, gdy gracz opuszcza ekran przejścia, przepada tak samo jak przy opuszczeniu przejścia albo starcie nowego. | `the cycle's` — remark 1(a), passage quoted above |
| D-316 (*Verification*) | The return of the tint cut by leaving the screen is over and is not played again. | Powrót odcienia przerwany wyjściem z ekranu jest skończony i nie gra od nowa. | `the cycle's` — remark 1(a) („the 2-second return of the light's tint … plays again from its start”) |
| D-317 (*Verification*) | An effect or a creature's run cut by leaving the screen is over and not played from its start on the return. | Efekt albo bieg stworzenia przerwany wyjściem z ekranu jest skończony i po powrocie nie gra od początku. | `the cycle's` — remark 1(a) |
| D-319 (*Verification*) | A target that changes to an action that leads nowhere stops the mage where its walk has brought it; only the turn toward another place has no test. | Zmiana celu na czynność, która nigdzie nie prowadzi, zatrzymuje maga tam, gdzie doszedł; bez testu jest tylko skręt ku innemu miejscu. | `the cycle's` — remark 3: „add the test … to D-319's list of tests and correct its example that says no test covers a changed target” |

## Checks (command, exit code)

| Check | Command | Exit |
|---|---|---|
| Foundation, after the decisions commit | `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| Foundation, after the styleguide commit (head `9350cfe2`) | `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| Instruction files, after the first edit and after the last | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 142 warn, 7 info`; I did not compare the 142 warnings with the base, they are the check's size and similar warnings, none an error) |
| Prettier | not run: no test file touched, the two files are Markdown | — |
| Full suite | not run, as the handoff says | — |

## Own-work check

Requirement most likely not met: remark 5, that D-04's „only from” list is **whole**. Check: a second search of the view for state it draws from that the sentence does not name — `grep` for `^let`, `useState`, `useRef`, `new Map`/`new Set`, `sessionStorage`/`localStorage` in `src/browser/view`, then each `export function create…` of `src/browser/view/*.ts` and the `let` lines of the screen entries. Result: no module-level variable or storage in the view; every stateful factory is named in the sentence (the store, the saver, the folding, the chronicle with tab and filter, the screen state, the programs entry's pull and reset) or is a screen's own component/closure state (`maps-entry`'s `mapId`, `acting`; the accounts entry's answers) which the clause on „the state of that screen's own component” covers for the game screens, and the accounts screen/card's server answers I left out (concern 1). The search is by code reading; it proves no list complete, only that I found no other thing.

## Questions and concerns

1. **D-04 and the accounts screen/card.** The list of accounts (`accounts-entry.ts`) and the card/menu of the account draw from answers of the server, not from the game state or a memory named by a decision. I judged D-04, which is about the game, not to need them. If the human reads „the view” to include those, one more source („the answers of the account server”, D-?) would go in; I found no decision that names it, so I did not invent one. Recommendation: leave.
2. **D-367 has no test line of its own for the cut.** The new case of part A holds it through its D-317 and D-316 lines. I added a pair of examples to D-367 instead of touching a test (the handoff forbids it). Recommendation: if the orchestrator prefers a clause `tests:` in D-367, add one line `// decision: D-367 "Any other reading starts none"` to `tests/view/scene.test.mjs` at the new case („an effect or a return of the tint cut by leaving the screen …”) and move the pair's sentence into the clause; one-line cost, no foundation-check risk (the quotation starts a sentence of D-367).
3. **Part A's report cited D-178 for the decimal comma; it is wrong** (D-178 is the nature energy). I cited D-57. No decision settles the comma; the clause I wrote says only what the code does, with D-57 for the tenths.
4. **The walk's cut by leaving (slice 19's test, `run-screen.test.mjs:1099`) carries no `decision:` line**, though D-319's clause names it. Not changed (not mine; the foundation check does not report it). Noted.
5. The style of the styleguide paragraph I added to „A name typed by the player” is longer than the rule's earlier text; the list of places could be dropped to the kinds alone if the human wants the rule shorter.

## Reaches beyond the handoff

- `.the-way/elements/decisions/template.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/decisions/skill/read.md`, `decide_entry.md`: read whole (the `SKILL.md` of the decisions element names them; the handoff named the SKILL.md only).
- Decisions read whole: D-04 (from its heading to its *Verification*, the *Rationale* in part), D-57, D-178 (to check the part A claim), D-285, D-294, D-324 (the binding paragraph and the first lines of its fields), D-346, D-370, D-371, D-383 (binding paragraph and the first fields), D-401, D-402 (binding paragraphs), D-407 (whole), D-316, D-317, D-318 (whole), D-319, D-367 (whole); D-207, D-281, D-339, D-416 (binding paragraphs only).
- `src/browser/view/{scene,run-screen-state,game-view,programs-entry,chronicle,state-store}.ts(x)` and `tests/view/{scene,run-screen}.test.mjs` at the places named in the text, to check the sentences against the code and the lines of the tests.
- Styleguide `guidelines/styleguide-browser-view.md`: read in the parts I changed (lines 520–530, 700–760, 745–895, 990–1005), not whole.

## Working copies

All stood in `.runs/correction-1b/` of the worktree (the logs of the checks): removed before return (`rm -rf`); none remains. No worktree, clone or screenshot was made.

## Unread material

- `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/skill/foundation_step.md`, the part A report, the handoff and the remarks: read whole.
- `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `elements/common/way_of_working.md`, `elements/common/rules.md`: read whole. `elements/decisions/examples.md` (named by the template): not read.
- `foundations/decisions.md`: only the entries named above; D-04 read to the end of its binding sentences, *Verification* and the first half of its *Rationale*; the rest of the log not read. The step 2 search of the whole foundation (WAY-33) was a search of `foundations/decisions.md` and the styleguide by words (`memory of the page`, `D-285`, `Escape`, `tenths`, `decimal comma`), not a read of the whole.
- `guidelines/styleguide-browser-view.md`: read in parts (above). `guidelines/coding.md`, `guidelines/testing.md`: not read (no code or test touched).
- `src/browser/view/scene.tsx`: read the header comment and lines 735–825; the rest not read.

## Searches not found or unclear

- A decision that names the decimal comma of the body row's temperature: none found (`grep` for „decimal comma”, „36,9”, „Temperatura {n}”, „tenths”); D-57 gives tenths only.
- A decision that settles what the row of saving draws from (the saver's sentence): D-407 names the row of saving as a root; D-207 settles when the game saves; the sentence itself I did not find in a decision. I cited both.
- A decision that names the accounts screen's server answers as a source or memory: none found.
- D-324 does not say „the question of „Zakończ”” in its heading; I named it „the question „Zapisać, odrzucić, wrócić?”” (D-324 and D-371 use that form).

## Fix of the blocking finding (I-1 of `reports/correction-1-findings.md`)

**Commit:** `31ca8d12` (text only; `foundations/decisions.md`, `guidelines/styleguide-browser-view.md`).

**The finding holds** — checked in the code, not taken on trust:
- `src/browser/view/scene.tsx:799`–`804`: the cancel listener ends a flight, a dust cloud and a wolf's effect on any `animationcancel` of the effect's own element; it asks no cause.
- `src/browser/view/run-screen.tsx:151` defines `covering` (the end-of-run window stands) and `:180` puts `hidden={covering}` on `<section className="screen-area run-world">`, which holds `WorldArea`, so the scene.
- `src/browser/styles.css:20`–`22`: `[hidden] { display: none !important; }`, and a browser cancels the animations of an element `display: none` takes out. So the end-of-run window cancels a held effect while the player is still on the screen and the map run is not left. I did not run a browser (the handoff's instruction not to start the game stands); the mechanism is from these three places.

**What changed (the cause named as „the scene is hidden”, by leaving the screen of the run or by the end-of-run window, D-370):**
- D-367 binding sentence: „unless the map run is left, the scene is hidden — by leaving the screen of the run or by the end-of-run window that stands in its place (D-370) — or a new map run starts”.
- D-367 pair of examples: the lead-in reads „For an effect running when the scene is hidden”; *complies* names an effect whose animation the browser cancels because the scene is hidden (the player left the screen of the run, or the end-of-run window stands), over at once and not drawn again when the scene is shown; *violates* is unchanged.
- Styleguide, the effect of a gathering (now about line 847) and the wolf (about line 871): „bo scena zniknęła — gracz wyszedł z ekranu przejścia albo stanęło okno końca przejścia (D-370)”.
- Not changed: the tint's line (about 792), where the finding says the window does not reach the return (the tint stands at once at a death and a completion, D-316); D-316's and D-317's *Verification* clauses (their words, „cut by leaving the screen of the run”, are true of the test, which fires the cancel on a hidden screen; the finding names neither). The four Minor findings of the review are not fixed, as ordered.

**D-367 mark: `the cycle's`**, sources, quoted: remark 1(a): „a flight, a dust cloud, a wolf's run or the 2-second return of the light's tint that is cut by leaving the screen of the run plays again from its start on the return — an overdue effect played, which D-317 drops. Call the same end from the `animationcancel` listener for those elements”; and the review's finding I-1: „D-367: „unless the map run is left, the scene is hidden — by leaving the screen of the run or by the end-of-run window that stands in its place (D-370) — or a new map run starts”.” (the reviewer's proposed wording; I used it unchanged).
Meaning (English): an effect running is dropped when the scene is hidden, whether by leaving the screen of the run or by the end-of-run window. Po polsku: efekt, który trwa, przepada, gdy scena znika — przez wyjście z ekranu przejścia albo przez okno końca przejścia.

**Checks:** `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors` (no `decision:` line left red; D-367's tested quotation „Any other reading starts none” is untouched). `python -B .the-way/instruction-files/check_instructions.py`: exit 0 (0 errors, 142 warnings, as before). Full suite not run.

**Working copies:** none made.
