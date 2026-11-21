done with concerns

# Report - slice 1 of "loop2: uklad na telefon dla wszystkich ekranow gry"

## Commits

- `587f74f6` (branch `task/uklad-na-telefon`, on the base `0a2254cd`): docs: :card_file_box: write the two layouts of the game into the foundation ... (D-396, D-280, D-282, D-311, D-370, D-389, D-44, D-416)

## Files changed

| File | Added / removed lines |
|---|---|
| `foundations/decisions.md` | 49 / 38 (D-396 rewritten whole; D-280, D-282, D-311, D-370, D-389, D-44 changed in place; D-416 verification, 4 lines) |
| `foundations/environment_facts.md` | 6 / 0 (new fact `android-touch-target-size`, before the withdrawn identifiers) |
| `tests/view/headquarters-screen.test.mjs` | 1 / 1 (the quotation of one line `decision: D-44 "..."` at line 515; see "Reach beyond the dispatch") |

(`git show --numstat HEAD`; D-416 is counted in the first row.)

## Checks

| Check | Command | Exit code |
|---|---|---|
| Slice's *Checks* (full, with test citations) | `python -B .the-way/elements/common/foundation_check.py` | 0 - "0 errors" (run after the commit too) |
| After D-396 alone | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 |
| After all decision edits, before the test-citation fix | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 - "tests/view/headquarters-screen.test.mjs:515: the quotation stands in no binding sentence of `D-44`" (the one broken citation, fixed below, then the check above passed) |

Not run: `npm test` and every other test (the boundary forbids the full gate; no code changed).

## Own-work check (WAY-164)

- Requirement most likely unmet: "every passage that a line `decision: D-<n> "..."` of a file under `tests/` quotes from these decisions stays the opening of a binding sentence, so that no citation breaks" - together with the quotation of the touch-target source "word for word".
- Check: the full foundation check, which compares every quotation of a `decision:` line with the binding sentences. It showed one break (D-44, below) and, after the fix, 0 errors. The source passages: `grep -c` of the three quoted sentences against the live page saved on 2026-11-21 and against the archived copy of 2026-11-16 (fetched with `curl -sL --compressed`) gave 1 hit for each sentence in both files.
- D-282 and D-370 kept their cited openings by changing only what follows them (D-282: a second sentence "The narrower layout is the phone layout (D-396)." after the cited first sentence; D-370: the words after "(D-280)" inside the not-cited tail of its first sentence). D-280's, D-311's and D-389's cited openings stand as they were. D-44's cited sentence could not stay (below).

## Foundation entries: meaning in one English and one Polish sentence, and mark

Each decision was written by following `.the-way/elements/decisions/skill/SKILL.md` (and its `read.md`, `decide_entry.md`, `template.md`, `elements/common/rules.md`, `way_of_working.md`), the fact by `.the-way/elements/environment-facts/skill/SKILL.md` (and `read.md`, `decide_entry.md`, `draft.md`, `write.md`, `template.md`), read as files. The log's entries carry no *Meaning (pl)* field (no entry of `foundations/decisions.md` has one and the template gives none), so the Polish sentences stand here only.

| Entry | Mark | English | Polish |
|---|---|---|---|
| D-396 | `projected` (the approved definition's entry whole) with `row 5` (no scroll to the side in a frame either) and `row 6` (touch-target minimum) added; **the value 48 px is `the cycle's`**, and so are the added examples (see below) | The game works in Chrome, Edge and Firefox on a computer and Chrome on an Android phone; a window with a page area of 1280 px or more shows the computer layout, a narrower one the phone layout made for 360 px held upright, in which nothing scrolls to the side (a frame included), every control has a touch target of at least 48 px, and everything is done by touch; faults below 360 px, in a window wider than tall, or in a computer window lower than 720 px are not fixed. | Gra działa w Chrome, Edge i Firefoksie na komputerze i w Chrome na telefonie z Androidem; okno o obszarze strony od 1280 px ma układ komputera, węższe układ telefonu pod 360 px w pionie, w którym nic nie przewija się w bok (także w ramce), każda kontrolka ma cel dotyku co najmniej 48 px, a wszystko robi się dotykiem; nie naprawia się usterek poniżej 360 px, w oknie szerszym niż wysokim ani okna komputera niższego niż 720 px. |
| `android-touch-target-size` (new fact) | `the cycle's` (row 6 asks for a value from a source with its quotation; no row carries the fact whole) | Android's developer guidance recommends, for touch interfaces, a touch target of at least 48dp by 48dp for each interactive element and notes that for a mouse or a trackpad the target can be smaller. | Wytyczne Androida dla programistów zalecają dla interfejsów dotykowych cel dotyku co najmniej 48dp na 48dp dla każdego elementu interaktywnego i zaznaczają, że dla myszy i gładzika może być mniejszy. |
| D-280 | `the cycle's` (task, *Decisions in play*) | The content width of every screen, at most 1344 px and the full width of a narrower window, is stated for the computer layout and the phone layout. | Szerokość treści każdego ekranu, najwyżej 1344 px i cała szerokość węższego okna, dotyczy układu komputera i układu telefonu. |
| D-282 | `the cycle's` | The narrower layout that rearranges the areas of a screen is the phone layout, which sets the world, the program and the tabs of a map run one above the other. | Węższym układem, który przestawia obszary ekranu, jest układ telefonu, który na ekranie przejścia układa świat, program i karty jedno nad drugim. |
| D-311 | `the cycle's` | The screen of a map run has two columns in the computer layout and one column in the phone layout (world, program, area with the tabs), and a tap on a tile links it with its row as the hover does, only while the table is picked. | Ekran przejścia ma w układzie komputera dwie kolumny, a w układzie telefonu jedną (świat, program, obszar z kartami), a dotknięcie kafelka wiąże go z wierszem tak jak najechanie, tylko gdy wybrana jest tabela. |
| D-370 | `the cycle's` | The end-of-run window is as wide as the content column of the screens in both layouts: at most 1344 px on a computer, the width of the window in the phone layout. | Okno końca przejścia ma szerokość kolumny treści ekranów w obu układach: do 1344 px na komputerze, szerokość okna w układzie telefonu. |
| D-389 | `the cycle's` | In the phone layout the picture band of Siedziba is cropped at the sides around the campfire where the window is narrower than the picture, and never scaled down. | W układzie telefonu pas obrazka Siedziby jest przycinany po bokach wokół ogniska, gdy okno jest węższe niż obrazek, i nigdy nie jest zmniejszany. |
| D-44 | `row 4` | A destructive button has its text in `danger` at rest in every layout, in one style, and takes the background `highlight` besides under the pointer. | Przycisk niszczący ma tekst w `danger` już w spoczynku, w każdym układzie, jednym stylem, a pod kursorem dostaje dodatkowo tło `highlight`. |
| D-416 | `the cycle's` (a neighbour found by the search of the foundation, WAY-33) | The two areas of the screen Wiedza stand one under the other in the phone layout, where the entry's example named a window narrower than 720 px. | Dwa obszary ekranu Wiedza stoją jedno pod drugim w układzie telefonu, tam gdzie przykład wpisu mówił o oknie węższym niż 720 px. |

### The pair of examples added to D-396 (word for word, for the description to quote; `the cycle's`)

- complies, added to the projected ones: "a table of the phone layout laid out to fit the width of its frame at a page area 360 px wide; a button of the phone layout 48 px high and 48 px wide or larger at a page area 360 px wide"
- violates, added to the projected ones: "a frame of the phone layout whose content scrolls to the side inside it; a control of the phone layout with a touch target smaller than 48 px in height or in width"

Other parts of D-396 the projected entry did not give and I wrote (so `the cycle's`): the binding sentence "Every control of the phone layout - a button, a cell of a pick, an arrow, an item of a menu - has a touch target at least 48 px high and 48 px wide, a value taken from Android's accessibility guidance." (the list of controls is the task's point 9; the 48 px value is the orchestrator's note 1); the *Rationale* sentences on scrolling in a frame and on the touch target; three entries of *Rejected* (scrolling inside a frame allowed; no minimum; 24 px of WCAG 2.5.8), each from "Not chosen" of questions 6 and 7 of the task, the first two shortened.

## Reach beyond the dispatch (section 1)

1. `tests/view/headquarters-screen.test.mjs:515` (a comment line, no code): its `decision: D-44` quotation ran through "neutral until the pointer or the focus reaches them and then in `danger`", which row 4 makes false; no wording of D-44 can both carry row 4 and keep that quotation. I replaced only that part of the quotation with the new wording ("with their text in `danger` at rest, in every layout, and the background `highlight` besides under the pointer"). The plan's *Choices* names D-288, D-19 and D-349 as the decisions whose citations the code slices bring, not D-44; the handoff's *Checks* wants no error from the foundation check, so I took this as a small mismatch. The test's code under the line is untouched; the test asserts "Odbierz" in `positive`, which stays true. Slice 10 (D-44 in code) finds the quotation current.
2. `foundations/decisions.md` D-416 verification (4 lines): its example "in a window narrower than 720 px the two areas of the screen standing one under the other" turned false when D-396 removed the 720 px threshold; found by `grep -n -E "1074|720 px|narrower"` over the log, edited to say "the phone layout". Not named by the plan; the binding sentences of D-416 are untouched.
3. `foundations/decisions.md:4843` etc. read through grep for "narrower", "1074", "720 px", "destructive", "neutral" over the whole log (WAY-33); the other hits (D-288, D-337 and D-349's rationale and Rejected, about loop or history) were left: D-288 and D-349 are Slice 2's, the others describe loop.
4. Neighbour decisions read for the work beyond the dispatch's list: none beyond the *Read* ranges, except `grep`'d views of D-47 (6 lines) and the Wiedza decision D-416 (its verification, lines around 4843).

## The source of the touch target (orchestrator's note 1)

- Orchestrator's note named "touch targets at least 48 x 48 dp" from Android's accessibility guidance. The page `https://developer.android.com/guide/topics/ui/accessibility/principles` (fetched 2026-11-21, HTTP 200) no longer holds a touch-target passage (search of its text for "touch target", "48", "dp" found nothing relevant). The page that carries it is `https://developer.android.com/guide/topics/ui/accessibility/apps`, section "Use large, simple controls": "For touch interfaces, we recommend that each interactive UI element have a focusable area, or touch target size, of at least 48dpx48dp. Larger is even better." and, in the note under it, "For precise input (mouses and trackpads), the touch target can be smaller." Both are quoted in the fact, read 2026-11-21, with the archived copy `https://web.archive.org/web/20261116093600/https://developer.android.com/guide/topics/ui/accessibility/apps` (the latest capture of the CDX index, 2026-11-16, which holds both sentences).
- The source recommends ("we recommend"); the fact says so, and D-396 turns it into a minimum of the product. D-396's *Rationale* says the product reads the guidance's dp as the px of the page; the source does not say that equality, so it is the product's reading, stated as such.
- Other pages that carry the same value and were seen but not used: `https://developer.android.com/develop/ui/compose/accessibility/api-defaults` ("make sure to set the minimum size to 48dp") and `https://support.google.com/accessibility/android/answer/7101858` ("Consider making sure these elements have a width and height of at least 48dp").

## Choices (with the way rejected and the cost if wrong)

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| D-282 and D-370: keep the cited openings and put "phone layout" into a second sentence (D-282) and the tail of the first (D-370) | rewrite the cited sentence "a narrower layout can rearrange" | citations of about eleven test lines would break; wrong: D-282's first sentence still says "a narrower layout", read together with its second sentence as the phone layout |
| D-311: a new second paragraph for the phone layout, the first sentence's opening kept by adding "in the computer layout" after "under one header" | the phone layout in the first paragraph (it would have a fourth sentence and break the limit of three) | none known; the foundation check counts the paragraphs and reports 0 errors |
| D-311 rationale: the tap refers to D-19 ("and in the phone layout a tap on it (D-19)"), which Slice 2 rewrites | no reference to D-19 | until Slice 2 the log refers to a tap that D-19 does not state yet; the cycle's request carries both |
| D-44: dropped "at focus" from the complies example, since the text in `danger` no longer waits for the focus; focus is shown by the outline of D-47 | keep "at focus" with a background | wrong: a reader wanting the focus to take `highlight` finds the row silent on it |
| D-44 *Rejected*: the way "red at rest on every destructive button" removed (it is now the decision), the old reasons moved into "Accepted with it" of the *Rationale* (they are in the log, not derived by me); one way added, "a look of its own for the destructive button in the phone layout alone - two looks of one control", from the human's answer to question 4 ("jednym stylem, nie osobnym dla telefonu") | none added; or add the neutral-at-rest way | the added way is my reading of the source; if the orchestrator does not accept it as "kept by the source", delete the one clause |
| D-396 binding text names the controls by the task's list (button, cell of a pick, arrow, item of a menu) | "every control of D-47" (links included) | see question 1 |
| D-396 *Rejected* adds the three ways of questions 6 and 7 | none | none known |

## Questions and concerns for the orchestrator

1. (concern, for Slices 7 and 8) The plan's *Choices* row on the touch target is unclear on links: "every control of D-47 in the phone layout; a link inside a sentence only where the cited source does not exempt an inline target" against the rejected "every link held to it, inside a sentence too". The source says nothing of inline links, so under the first wording every link is held. D-396 names the controls by the task's list and says nothing on links; I recommend Slice 7 decides in the styleguide whether a link inside a sentence is held, and D-396 gets a sentence only if the human asks.
2. (concern) D-396's *Verification* for the touch target says "48 px high and 48 px wide" in px of the page; the check for it is Slice 7/8's.
3. (concern) The code comments `src/browser/styles.css:314` and `src/browser/view/controls/react-button.tsx:10` say "neutral at rest"; they, the styleguide's destructive-button rule (if any), D-39's *Verification* example "the text of the button „Zakończ” in `danger` under the pointer" (still true, no longer the whole of it) and `tests/view/program-list.test.mjs:392` ("neutral at rest, `danger` under the pointer") are for Slice 10 and the styleguide slice; I changed none.
4. (concern) D-311's *Rationale* has "the hover over a tile of the drawing, and in the phone layout a tap on it (D-19)". If Slice 2 words D-19 so that a tap marks only with a pointer of the kind touch (plan *Choices*), this rationale sentence stays true.

No question blocks the slice.

## Working copies

- `.runs/slice-1/` of the worktree (`.runs/slice-1`): the downloaded pages of the sources, their extracted text and the outputs of the foundation check. Removed before returning. The script that extracted text stood in the session's scratchpad directory (`the session's scratch directory`, files `extract.py`, `edit_decisions.py`, `d396.md`), outside the worktree; not part of the product, left there.

## Walkthrough (section 6)

The slice alters no behaviour a user sees in the running product: it writes entries of the foundation and one comment line of a test; no code ran differently.

## Unread material

- `foundations/part_map.md:3-33` browser-view and `foundations/part_map.md:160-167` product-foundation: not read (the scopes of the entries stay `browser-view` and `agent-workflow` as before; the check found no unknown part).
- `foundations/decisions.md` D-19 (10387-10430) and D-349 (10859-10901): not read; Slice 2 changes them and nothing of this slice touches their text.
- `foundations/decisions.md` D-47: read only the first lines (5128-5134) and the grep of the log; not whole.
- `.the-way/elements/decisions/examples.md` (which `way_of_working.md` step 1 names as the element's examples): not read; the neighbouring entries of the log served as the form.
- `.the-way/elements/decisions/skill/projected.md`, `.the-way/elements/common/projected_mode.md`: not read (projected mode does not apply; the projected entry was given word for word).
- Everything else in the handoff's *Read* (task lines 1-160, the decisions D-396, D-280, D-282, D-311, D-370, D-389, D-44, D-39, D-40, D-42, `environment_facts.md` ranges, `foundation_step.md`, both skills and their read, decide-entry, draft/write, templates, `rules.md`, `way_of_working.md`, `reaching_another_skill.md`, `slice.md`, `SKILL.md` of make-change) was read whole. D-40 and D-42 were read whole though the dispatch lists them only as sources of the destructive button's roles.

## Searches not found or unclear

- The page of Android's accessibility *principles* named in the orchestrator's note no longer holds the touch-target sentence (see "The source of the touch target"); found instead on the page "Make your app more accessible" (`.../accessibility/apps`).
- The handoff names a *Meaning (pl)* for each entry in the entry's form; the log's template has none and no entry of the log has one, so the Polish sentences are in this report only. Unclear whether the orchestrator wants a field added to the log (not done).
- The plan lists D-44 among the entries of rows but its *Choices* row on citations names only D-288, D-19 and D-349 as those whose quotations change; D-44's long quotation at `tests/view/headquarters-screen.test.mjs:515` needed the change (reach 1). Unclear whether the plan meant it to be left to Slice 10 with the check red until then; I judged the handoff's "reports no error" the stronger instruction.
- The marks (`row <n>`, `projected`, `the cycle's`) for D-280, D-282, D-311, D-370 and D-389: the plan's table says "task, *Decisions in play*" and no row; I marked them `the cycle's`.
