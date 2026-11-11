# Return report — task koniec-przejscia

**Status:** done

**Commits** (branch `task/koniec-przejscia`, from `4ef0789c`): `0894f755` — `foundations/decisions.md` only (+54, -9). Author `the author's address`, checked with `git log --format='%h %ae'`. No product code, test or guideline touched.

**Checks (command, exit code):**

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` before any edit (baseline) | 0, `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the edits of D-311, D-324, D-339, D-362 | 1, `2 errors` (both: `D-364` names no decision of the log; the references were written first) |
| same, after D-363 | 1, the same 2 errors |
| same, after D-364 | 0, `0 errors` |
| same, after D-365 | 0, `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` (no switch; test citations of the invariants pass) | 0, `0 errors` |
| `npm test -- tests/view/end-window-game.test.mjs` (own-work check below) | 0, 21 pass |

The product's gate was not run.

## Method read

`.the-way/task-cycle/change/SKILL.md` (reporting and committing; none of its rows apply), `task-cycle/skill/return_step.md`, `task-cycle/skill/foundation_step.md`, `elements/common/way_of_working.md`, `elements/common/rules.md`, `elements/decisions/template.md`, `decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `elements/decisions/examples.md` (WAY-03 read in `.the-way/foundations/decisions.md`). The frozen task and the plan (Foundation entries, Coverage, Choices) read whole where named; the executors' Choices sections of slices 1–5 and fix 1 read; `foundation-report.md` read whole.

## What was compared with the code, entry by entry

Code compared: `git diff 211a4ea..4ef0789c` (computed myself), read in `src/browser/sim/run-record.ts`, `types.ts`, `game.ts`, `saved-game.ts`, `src/browser/view/game-view.ts`, `run-screen.tsx`, `run-header.tsx`, `end-window.tsx`, `end-window-lines.ts` (the lines it gives), and `styles.css` `.end-window`.

| Entry | Matched? | What did not match, and the correction |
|---|---|---|
| D-362 | Matched, one overlap | Order (longest streak, discovery, cost line, sections, buttons), the sections, 8 % and five pieces, „W drodze”/„Czeka”/„Walka”, rows of „Wyprawa i teren”, buttons fixed at the bottom all match `end-window.tsx` and `end-window-lines.ts`. The clause "which takes the focus when it opens" answers, in passing, the question that the new D-364 answers, so by the template's rule (a sentence that answers a question in passing moves to the new decision) it moved to D-364 and D-362 points to it: "the key Escape pressed in it (D-364)". The heading question stays as the foundation step worded it. |
| D-311 | Did not match (the review's finding, verified) | Said "„✕” in it and Escape close it" without the qualification. Corrected to "„✕” in it and Escape pressed in it (D-364) close it". The rest (header „Koniec przejścia”, window under the menu bar, closes while the question stands) matches `game-view.ts` (`windowShown`, `askToEnd`) and `run-header.tsx`. |
| D-339 | Did not match in two sentences (judged; meaning unchanged) | *Verification* "the saved game state keeping its version" and *Rationale* "the save keeps its shape and its version" read as if the save never changes its version; `SAVED_GAME_VERSION` is now 4 (`saved-game.ts:78`) for the run record, not for the chronicle. Corrected in the smallest way: *Verification* "the saved game state holding no entry of the chronicle, and the chronicle bringing no new version of the save"; *Rationale* "the chronicle leaves the shape and the version of the save as they are". Meaning of D-338/D-339 unchanged; D-338 matched and is untouched. |
| D-324 | Did not match | The list of what closes the question did not hold „Koniec przejścia” of the header, which `openWindow` in `game-view.ts` makes close the question (as „Wróć” does) and then open the window. The question "what stands on the screen while the question stands" is D-324's, so the rule went there and not into a new entry: the list now reads "„Wznów” …, „Restart” and, after the end of the map run, „Koniec przejścia” of the header close it as „Wróć” does …, „Koniec przejścia” opening the end-of-run window (D-362, D-311)"; *Relations* gained `derives from D-362`; *Verification* gained a complies case and a violates case (the question standing together with the window). |
| D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216, D-313, D-53 | Matched | Read whole against the code. D-122's *Rationale* sentence about the game state matches `types.ts`/`game.ts` (`discovery` field). D-173 already holds which button the question remembers (`question.opens` in `game-view.ts`). D-132, D-135, D-212 match `saved-game.ts` and `game-view.ts`. No change. |
| D-206, D-208, D-213, D-285, D-323, D-338 | Matched | D-206: version 4 and a refusal of any other version (`save-version` test passes with the cases moved to 4 and 5). D-213: the new `record` in `saved-game.ts` refuses without throwing. D-285 (Escape in the menu „Konto”) and D-208/D-323 (menu bar and row stay above the window) agree with Escape read on the window root and with the window under the menu bar. |
| Invariants `save-version`, `death-settled-once`, `solved-map-manual-run`, `minute-span-split`, `content-identifiers`, `browser-view-token-values` | Matched | Sentences hold against the code (the count is made in `advanceMinutes` one game minute at a time; the load refuses a record that disagrees; `src/browser/view` names no map by identifier outside comments, `styles.css` holds no value written in place of a token). Their test citations pass in the full `foundation_check.py` run (exit 0). No change; none expected. |
| Part map `browser-view`, `simulation` | Matched, no line needed | Files added: `src/browser/sim/run-record.ts` (under `src/browser/sim/**`), `src/browser/view/end-window.tsx`, `end-window-lines.ts` (under `src/browser/view/**`), `tests/sim/run-record.test.mjs` (`tests/sim/**`), `tests/view/end-window*.test.mjs` (`tests/view/**`). Each stands under a pattern already held; descriptions, dependencies (`simulation` depends on none; `run-record.ts` imports only simulation files) and the trust boundary (`src/browser/sim/saved-game.ts`) still true. |
| Glossary | No entry | Task Question 11 and the foundation exclude an entry for "the end-of-run window". "Longest streak" reads from the entry `streak` and D-363 defines what it is; no term is used against its entry. |
| D-339/D-185/D-216/D-201/D-215 leftover check | Matched | A search of the whole foundation for "version of the save", `GameMapRun`, `longestStreak`, `minutesByAction`, `enteredWith`, "end-of-run", "Koniec przejścia": the remaining hits (D-210, D-294, D-339's *Rejected*) say nothing false after the bump. |

## Entries written or changed

Each is a decision; no invariant, glossary term, environment fact or part-map entry was written. Mark: `the cycle's` — no row and no projected entry carries any of these three whole; they hold the choices the plan and the executors made that bind after the merge.

| Id | Question | Meaning, English | Znaczenie, po polsku | Mark |
|---|---|---|---|---|
| D-363 (new) | What does a manual map run keep of itself for the end-of-run window, and how does a load read it? | A manual map run keeps in its game state, not in the plain map run of earning loops, the longest streak, the game minutes by a closed list of kinds (the data's ordinary actions, a wait, a fight) summing to the game minute, and what the character entered with; the record restarts at „Restart” and the load refuses a record that disagrees with the minute. | Ręczne przejście trzyma w stanie gry, a nie w zwykłym przejściu pętli zarobkowych, najdłuższą passę, minuty gry według zamkniętej listy rodzajów (zwykłe czynności z danych, czekanie, walka), sumujące się do minuty gry, i to, z czym postać weszła; zapis zaczyna się od nowa przy „Restart”, a wczytanie odrzuca zapis niezgodny z minutą. | the cycle's |
| D-364 (new) | How does the end-of-run window cover the screen of a map run, and where does the keyboard go? | While the window stands, the header and the three areas are not shown (kept in the page), the window stands in their place under the menu bar, as wide as the content column and tall as its content up to a part of the browser window's height, with no backdrop, heading and buttons fixed and the middle scrolling, the page at its top; it takes the focus, Escape is read in the window, nothing traps the focus, and „✕” and Escape move the focus to „Koniec przejścia”. | Gdy okno stoi, nagłówek i trzy obszary nie są pokazane (zostają w stronie), okno stoi na ich miejscu pod paskiem menu, szerokie jak kolumna treści i wysokie jak treść do części wysokości okna przeglądarki, bez tła; nagłówek i przyciski stoją, środek się przewija, strona jest na górze; okno bierze fokus, Escape czyta się w oknie, nic nie zamyka fokusu, a „✕” i Escape przenoszą fokus na „Koniec przejścia”. | the cycle's |
| D-365 (new) | Who remembers whether the end-of-run window is open, and where does „Koniec przejścia” stand? | Whether the window is open is a memory of the page kept by the game view (never in the game state or the save): open at the end and at a build on an ended map run, open again at every entering, closed by „✕”, Escape and the question; „Koniec przejścia” stands in the header before „Restart” only while the map run has ended and the window is closed. | To, czy okno jest otwarte, jest pamięcią strony w widoku gry (nigdy w stanie gry ani zapisie): otwarte przy końcu i przy budowie na zakończonym przejściu, otwiera się znowu przy każdym wejściu, zamykają je „✕”, Escape i pytanie; „Koniec przejścia” stoi w nagłówku przed „Restart” tylko, gdy przejście się skończyło, a okno jest zamknięte. | the cycle's |
| D-324 | (changed) | „Koniec przejścia” of the header, pressed while the question stands, closes the question as „Wróć” does and opens the window. | „Koniec przejścia” w nagłówku, naciśnięty przy stojącym pytaniu, zamyka pytanie jak „Wróć” i otwiera okno. | the cycle's |
| D-311 | (changed) | Escape closes the window when pressed in it (D-364). | Escape zamyka okno, gdy naciśnięto go w oknie (D-364). | the cycle's (review finding) |
| D-362 | (changed) | The focus clause moves to D-364; D-362 points to it. | Zdanie o fokusie przechodzi do D-364; D-362 się na nie powołuje. | the cycle's |
| D-339 | (changed) | *Verification* and *Rationale* say the chronicle brings no new version of the save, not that the save never changes version. | *Verification* i *Rationale* mówią, że kronika nie wnosi nowej wersji zapisu, a nie że zapis nigdy nie zmienia wersji. | the cycle's |

*Rejected* of D-363, D-364, D-365 holds the ways the plan's *Choices* table and the executors' reports name as rejected, each with its cost; *Origin* names the task document's items, questions and rows they ground. No `Based on` source outside the product.

## Choices that bind after the merge and where they went

| Choice | Where |
|---|---|
| Record in `GameMapRun`, not `MapRun`; `longestStreak`, `minutesByAction` as a full closed list of the data's ordinary action kinds plus `wait` and `combat`, `enteredWith` bound at start and rebound at „Restart”; strict load (sum = minute, longest streak between streak and minute, keys of the closed list, items in the data's order and within the carrying capacity) | D-363 |
| Covered header and areas `hidden`, no layer, no backdrop, window as a block under the menu bar, height limit, scrolling body and fixed heading and buttons, page to the top | D-364 |
| Focus to the window on opening; Escape read in the window alone; no trap; focus to the header button after „✕”/Escape | D-364 (clause moved out of D-362) |
| Memory of the window is a memory of the page, in the game view | D-365 |
| „Koniec przejścia” before „Restart”, only while closed | D-365 |
| „Koniec przejścia” pressed while the question stands closes the question | D-324 (the question's own entry) |
| Which of two end buttons the question remembers | already in D-173 (statement and *Rationale*); no change |

## Choices left as rows of the questions table (bind nobody after the merge)

Named with the reason: they are details of one file or one rule of the stylesheet that a later task would change with the file, or are said by an entry already (the styleguide holds the look).

- Slice 1: the record is a full record with zeros (inside D-363's "a count for every kind"); the load refuses an activity going on that holds a combat action and `minuteKind` casts (a code consequence of the closed list); `GameMapRun` carries the fields in its own object type with `RunRecord` a `Pick`; the test document stays as `DOCUMENT_V3`.
- Slice 2: the streak line takes the map as an argument; the unmet streak line in `text`; the text "najdłuższa " + requirement text; the deposit line keeps its full stop; "weszła z pustym plecakiem"; the hours of the death line as the balance minutes / 60 (a wrong plural if the balance changes — named in the plan's *Choices* too); pieces of the bar ordered by minutes, percent rounding per piece, „reszta” shown at 0 %, the five largest above 8 %; `unfiredRules` with no counts; `deathAt` found through the death event; `entriesToDeath` empty for "none"; `discoveryLine` null for an empty band text. Reason: each is one function of `end-window-lines.ts` whose test holds it.
- Slice 3: props names, the split of the view, own classes of the discovery and cost line, Geist Mono for the paragraph and rows, "60%" form, `tabIndex` of the scrolling part, keys of lists, `flex: var(--percent)`, the title role after a death `text-strong` (the styleguide rule of slice 6 holds it), the pieces of the bar on a `highlight` track filled in `text` (styleguide's open items), the `max-height` figure (one line of the stylesheet; D-364 binds only that a part of the browser window's height limits it).
- Slice 4: a second „Zakończ” while a question stands leaves the question (the case with „Otwarte: …” is unreachable, since the window is not open while the question stands, so no entry binds anything new beyond D-324), focus after „Restart” of the window on the header's „Restart”, first-reading focus when the game is built before the page places the element, `hidden` on each of the three sections, the window after the areas in the DOM, the changes of `end-question.test.mjs` and `run-header.test.mjs`.
- Slice 5, 6, 7 and fix 1: removal of the lines from the world area, the styleguide rule and the coding-guideline tables (guidelines, not foundation entries); the load's refusal of out-of-order and over-capacity items (in D-363); M4 contested in the fix report (the heading of D-362) — left as the foundation step worded it, as the handoff says.

## Own-work check

- **Requirement most likely unmet:** that each new or changed sentence is true of the code as it stands, above all the three new decisions' binding sentences and examples (it is easy to state a mechanism from the plan that the executors then built differently).
- **Check:** read each claim against the code and against its test: D-363 against `run-record.ts` (`MINUTE_KINDS`, `startRecord`, `nextRecord`) and `saved-game.ts` (`record`, `SAVED_GAME_VERSION = 4`); D-364 against `.end-window` in `styles.css` (width 100 %, `max-height: 80vh`, body `overflow-y: auto`), `run-screen.tsx` (`hidden={covering}`, `scrollTop = 0`, `focusHeaderButton`) and `end-window.tsx` (`onKeyDown` on the root, `tabIndex`, no `aria-modal`, focus once in `useEffect`); D-365 against `game-view.ts` (`endWindowOpen`, `windowShown`, `show`, `askToEnd`, `openWindow`) and `run-header.tsx` (order, `ended && !windowOpen`); then ran `npm test -- tests/view/end-window-game.test.mjs` (exit 0, 21 pass), whose cases cover the closing, the reopening at every entering, the document holding nothing of the window, the order of the header labels, the question and „Koniec przejścia”.
- **What it showed:** the claim "it is open when a map run ends" holds for any screen (`if (ended) endWindowOpen = true`), and the window shows only on the run screen, as D-365 words it ("the window stands only while it is open, the player is on that screen and no question stands"). No claim failed. Not checked in a real browser (the executors did, at 1280 × 720, 800 × 720 and 400 × 720; their screenshots are not kept).

## Unread material

- `plan.md` slices 1–7 (lines 34–105) not read; read lines 1–33 (Foundation entries) and 100–153 (end of slice 7, Coverage, Choices).
- Executors' reports read only at their Choices sections and, for slice 3 and 4, the sections around them; `slice-5-report.md`, `slice-6-report.md`, `slice-7-report.md`, `whole-review-report.md` and `whole-review-fix-report.md` not read in full (the handoff gives their findings on D-311 and D-339, which I verified against the code myself; the slice-5 Choices section output was truncated by the harness and I did not re-read it, nor those of slice 6 and 7, since they concern the world area, the styleguide and the coding guidelines).
- Entries read whole: D-362, D-311, D-339, D-338, D-206, D-208, D-212, D-213, D-285, D-323, D-324, D-62, D-122, D-132, D-173, D-135, D-53, D-313, D-185, D-216, D-147, WAY-03; the six invariants whole; the part map whole. Not read whole: D-348 and D-42 (opened at their first lines to cite them), D-207, D-280, D-190, D-201, D-215, D-93, D-188, D-133 (cited as the existing entries cite them).
- Code read in the passages named above; `end-window-lines.ts`, `styles.css` and `game-view.ts` outside the passages not read.
- `foundations/glossary.md`: headings and the entries `map run`, `map run restart`, `manual map run`, `completion`, `solved map`, `streak`, `chronicle` only.

## Searches not found or unclear

- None unfound. Unclear: whether D-339's two sentences count as "no longer matching"; I judged they do, since a reader takes "keeping its version" as "the save has one version" and the version is now 4, and made the smallest change.
- The plan's *Choices* row on the window's width says "at most 1344 px"; D-364 says "as wide as the content column of the screens (D-280)" without the figure (a count is no binding word; the figure lives in the stylesheet and in D-280).
- The check reported two errors between the edit of D-311/D-362 (references to D-364) and the writing of D-364; the order was mine (references first), both cleared when D-364 was written.
