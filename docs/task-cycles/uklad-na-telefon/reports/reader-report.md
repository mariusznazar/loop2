PASS 6f9c462fa8c2dd15ca087730810cc4246ce786c6

# Fresh reading of the placement decisions of the first review's index (remark 3 of correction 1)

- Stage: a fresh reviewer, method `.the-way/task-cycle/review/SKILL.md`, narrowed by the handoff `reports/reader-handoff.md` to remark 3: read whole the decisions of the first whole-change review's index that say where a screen's parts stand or how they look in the browser view, and that no earlier review of this cycle read whole or took by search; compare each sentence with the code and the foundation at `55773884`/`6f9c462f`.
- `git rev-parse HEAD` = `6f9c462fa8c2dd15ca087730810cc4246ce786c6`, the head given; `git diff 55773884 6f9c462f` holds no code or foundation (empty stat), so the code and the foundation are those of `55773884`. `.the-way` at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`, the commit the gitlink records. Every entry, stylesheet and source file below was read from the commit `6f9c462f` (`git show`), not from the working tree.
- Counts: blocking 0; Minor 1; out of scope 0 (two observations outside remark 3 stand under **Declined to judge**).

## Remark 3 — made

Of the index's 119 decisions listed in full, I selected 60 whose question or binding sentences place, size or arrange a part of a screen, or say how it answers the pointer, a tap or the scroll. 14 of them were dropped as read whole by an earlier review of this cycle; the other 46 I read whole (heading to the next heading, *Verification*, *Rationale* and *Rejected*). I also read whole 8 decisions that the index lists by heading alone but whose question asks where a part of a screen stands (see the table's last rows and **Unread material**). In total, 54 decisions read whole by me for this task, besides 5 of the dropped ones that I happened to read whole too (D-39, D-297, D-421, D-445, D-446).

No sentence of the 54 is false now in the phone layout or at another window width, and none contradicts a decision or the styleguide this change wrote, with the one Minor exception below. Where a sentence names a column by its place in the computer layout ("on the left", "the right area"), I read it as the name of an area, as D-282 gives, and checked the decision's own qualification for the phone layout where it has one (D-311, D-416, and the dropped D-166, D-325, D-331).

## Findings

### Minor

**M-1. D-280 says the content is "the full width of a window narrower than [1344 px]" and its *Verification* example says "as wide as a window 1280 px wide" and "as wide as a window in the phone layout, 360 px or 1000 px wide". In the code the content is the window's width less the page's side padding.**

- Place: `foundations/decisions.md:4527-4528` (binding sentence: "all of one content width under one menu bar, in the computer layout and in the phone layout (D-396): at most 1344 px, and the full width of a window narrower than that"); `:4561-4565` (*Verification*: "complies: the content of Siedziba and of Programy 1344 px wide in a window 1920 px wide, as wide as a window 1280 px wide in the computer layout, and as wide as a window in the phone layout, 360 px or 1000 px wide"; "violates: … the content of Postać narrower than a window 1000 px wide in the phone layout").
- What is true instead: `src/browser/styles.css` `body { padding: 0 var(--space-l) }` (16 px each side) and, in the phone-layout block at `styles.css:284`, `body { padding: 0 var(--space-s) }` (8 px each side); `.app-main { width: 100%; max-width: 1344px }`. So the content is 1248 px in a window 1280 px wide (the figure `src/browser/run-screen.css:24-25` itself uses: "in a window 1280 px wide, the content 1248 px"), 344 px at 360 px and 984 px at 1000 px. Read literally, the "violates" example describes the code of Postać at 1000 px.
- Why only Minor: the shorthand "the full width of a window" and "as wide as a window 1000 px wide" stood in D-280 before this cycle (base `0a2254cd`, `decisions.md:4527-4528` and its *Verification* "as wide as a window 1000 px wide" / "narrower than a window 1000 px wide"), so the reading "all the width the page gives, no narrower column" is established and the code matches that reading in both layouts. This change wrote the 360 px and 1280 px examples into the same shorthand and halved the page padding of the phone layout. A later task (12, 17–21) reading it literally could only be led to drop the page padding, which the scene's arithmetic in `styles.css:274-283` counts on (2 × 8 px) — the worst it does is a small change of the scene's place, not a wrong layout. A precise wording would be "the width the page gives it, the window less the page's side padding".
- Evidence: the two texts quoted; `styles.css:28-31` and `:284-288`; `styles.css` `.app-main` (comment at `:217-221`).

## Table of the selection (in the order of the log at `6f9c462f`)

"Read" means read whole by me for this task; "dropped" means not read for this task because an earlier review read it whole, with that review named. Verdict is of every binding sentence and of the *Verification* and *Rationale* sentences that place, size or arrange.

| Decision (line) | Why selected | Read or dropped | Verdict |
|---|---|---|---|
| D-261 (3224) | where the page's sentence stands on the login card (index: heading only) | read (beyond the 119) | true |
| D-262 (3248) | what stands on the screen of the login card, where the waiting screens stand (heading only) | read (beyond the 119) | true |
| D-278 (3299) | the login card's top edge at 15 % of the window's height (heading only) | read (beyond the 119) | true: `account-card.css` `padding: 15vh …` in both layouts; the phone block changes only the side margin |
| D-280 (4525) | content width, menu bar: name at its left, items, „Konto” | read | true but for M-1; the bar wraps in the phone layout (`styles.css:292-296`) and keeps the name first and „Konto” last (`margin-left: auto`) |
| D-282 (4644) | each column an area the phone layout rearranges | read | true |
| D-286 (4718) | the page's sentence above the first screen | read | true |
| D-323 (4739) | the failure sentence in the row under the menu bar, in the card under the form, alone in the card's place | read | true; one word unclear (see **Searches not found or unclear**) |
| D-416 (4818) | Wiedza: left area, right area | read (the return review saw only its *Verification*) | true: names of areas; its *Verification* holds the phone-layout order; `styles.css:258-264` one column |
| D-421 (4852) | which stylesheet holds the columns and their `@media` | dropped: the first review read it whole (also read whole here) | — |
| D-445 (4867) | the figure at the top of the left area of Postać | dropped: the return-fix review read it whole (also read whole here) | — |
| D-446 (4889) | beside the figure: name, generation, archetype | dropped: the return-fix review read it whole (also read whole here) | — |
| D-447 (4909) | the frame under the facts of a character | read | true |
| D-27 (4931) | credits on the login card and at the bottom of Siedziba, its last part | read | true |
| D-39 (4999) | „Odbierz” in `positive` at rest and under the pointer; the destructive button's colour | dropped: the return review read it whole (also read whole here) | — |
| D-40 (5020) | `highlight` = marked row or control under the pointer; the badge, tracks and icons | read | true: on a touch device of the phone layout the shared controls lose the hover background (`styles.css:618-626`), and "under the pointer" names a pointer, which a finger is not |
| D-41 (5037) | `link-highlight`, hovered tile and row | read | true: the tap of D-19 marks with the same role; "hovered" examples still hold for the mouse |
| D-44 (5082) | the destructive button at rest and under the pointer | dropped: the first review read it whole | — |
| D-47 (5129) | every link a control; focus | dropped: the first review read it whole | — |
| D-271 (5159) | the picture band at the top of Siedziba, the figure on Postać | read | true |
| D-272 (5268) | where a picture stands: behind the card, band at the top, scene, figure at the top of Postać; „Teraz” and „Potem” under the scene | read | true |
| D-274 (5337) | main look of „Wejdź”, „Puść w pętlę” beside it; `highlight` under the pointer | read | true: beside each other in the wrapping row `.maps-who-actions` (`maps-screen.css:193-200`) |
| D-275 (5383) | secondary action stands under its form | read | true; the phone block keeps its text at the left of its target (`styles.css:603-609`) |
| D-276 (5416) | a tab: line at its bottom, `highlight` under the pointer | read | true |
| D-277 (5462) | the menu bar's mark | read | true |
| D-279 (5483) | a bar at its left, a frame at a text | read | true |
| D-396 (5508) | the two layouts | dropped: the first review read it whole | — |
| D-130 (5732) | the pace buttons beside „Pauza” in the header (heading only) | read (beyond the 119) | true |
| D-133 (5863) | the bar of the solving condition after the clock in the header (heading only) | read (beyond the 119) | true |
| D-70 (6701) | the campfire's icon on its tile, its minutes in the row | read | true; its *Rationale* names hovering alone as the tie of tile and row, which is incomplete since D-19's tap, not false |
| D-288 (9344) | the editor: panel under the row, conditions in two columns, arrows, drag for the mouse | dropped: the return review read it whole | — |
| D-293 (9446) | the time beside the action, in the row and the panel | read | true |
| D-295 (9505) | what a folded group shows | read | true |
| D-296 (9525) | the group's „✕” in its header | read | true |
| D-297 (9543) | arrows at the edge of a group | dropped: the first review read it whole (also read whole here) | — |
| D-298 (9576) | „zwiń wszystkie” beside the groups | read | true |
| D-300 (9597) | nothing beside a condition | read | true |
| D-304 (9646) | „+ dodaj grupę” under the groups, at the foot of the list | read | true |
| D-290 (9758) | conditions in two columns (heading only) | read (beyond the 119) | true: `.rule-panel-cells.two-columns` has no phone-layout change |
| D-350 (10055) | the rule panel under the header of a folded group (heading only) | read (beyond the 119) | true |
| D-325 (10128) | Mapy: list and card | dropped: the return review and its fix review read it whole | — |
| D-326 (10154) | the warning beside „Puść w pętlę” | read | true (same wrapping row as D-274) |
| D-327 (10173) | the card of a map and its parts | read | true |
| D-329 (10220) | the order from the top at each character; warnings beside and above the buttons; the result under them | read | true |
| D-331 (10265) | „Wybierz mapę z listy.” on the right / under the list; the picked row's bar at its left | dropped: the return review and its fix review read it whole | — |
| D-389 (10329) | the band's place, height, crop in the phone layout, whole characters | read | true: `headquarters.css` `.camp-background` centred, `.camp` `overflow: hidden`, `.camp-team` wrapping row with hidden overflow, so a narrower band crops the clearing around the fire, never scales it, and shows whole characters (`camp.tsx:1-20`) |
| D-19 (10407) | hover and tap on the drawing | dropped: the return review read it whole | — |
| D-287 (10505) | the sentence under the inactive buttons; at „Umiejętności” | read | true |
| D-311 (10549) | the screen of a map run: two columns in the computer layout, one in the phone layout | read (the return-fix review's search judged its binding text true at its hit lines; read whole anyway, being the screen's layout) | true: `run-screen.css:34-89`; its *Rationale* names the phone layout's one column and the chronicle under the whole program |
| D-334 (10705) | „Teraz” under the scene, one height, the rule and minutes at its right | read | true: `.now-row { height: 1lh }`, in the phone layout `height: var(--touch-target-min)` (`run-screen.css:609-617`), one height in each layout; a longer text is cut, nothing wraps |
| D-335 (10761) | „Potem” under „Teraz”, its number at its right | read | true |
| D-336 (10794) | a click on „Teraz” or „Potem” scrolls the program to the rule | read | true: the tap is a click; `program-panel.tsx:955` `scrollIntoView({ block: "center" })` scrolls the page in both layouts, as it did before the change |
| D-337 (10831) | the notes under temperature and satiety | read | true |
| D-346 (10872) | the pick of „Kronika” or „Teren” | dropped: the return review read it whole | — |
| D-349 (10895) | the scene's two sizes | dropped: the return review read it whole | — |
| D-368 (10964) | the end-of-run window: scrolls in itself, buttons fixed at its bottom | read | true |
| D-370 (11026) | the window's width and height in both layouts, fixed heading and buttons | read | true: `run-screen.css:521-526` `max-height: calc(100svh - 220px)` in the phone layout, a part of the window's height; the styleguide's rule "The end-of-run window" says the same |
| D-371 (11054) | „Koniec przejścia” in the header before „Restart” | read | true |
| D-385 (11073) | a burning item in its tile's row, no icon on the drawing | read | true: the phone block of the table puts the last cell on a line of its own under the numbers of its row (`styles.css:797-855`), still "in that tile's row" |
| D-343 (11272) | filters over the list, the minute in a column on the left (heading only) | read (beyond the 119) | true: `.chronicle-filters` before the list, `.chronicle-row` `grid-template-columns: 5ch minmax(0, 1fr)` with no phone change |
| D-316 (11515) | the creature on the mage's right, or left at the right edge; runs in from the right edge | read | true: places inside the picture, which both sizes of D-349 draw whole at 360 px |
| D-318 (11742) | where the mage walks, the right edge of the scene | read | true |
| D-320 (11816) | the badge over the mage's head | read | true |
| D-321 (11863) | a click on the scene does nothing | read | true: a tap is a click |
| D-322 (11884) | plaques over the clearing; the mage falls toward the middle of the frame | read | true |
| D-364 (11955) | the bending mage faces its prop | read | true (places in the picture) |
| D-365 (11970) | the icon flies from the prop to the mage | read | true (places in the picture) |
| D-366 (11985) | the dust at the prop or under the feet | read | true (places in the picture) |
| D-372 (12011) | the frost's thickness in pixels of the scene whatever its size | read | true: 32 px and 16 px on the screen, as its *Rationale* and the styleguide's rule "The scene of a map run" give |

Selection, by the rules of the handoff:
- Selected of the 119: 60. Read whole for this task: 46. Dropped: 14 — D-44, D-47, D-297, D-396, D-421 (the first whole-change review read them whole, its **Unread material**); D-19, D-39, D-288, D-346, D-349 (the return review read them whole, its *Reaches beyond the dispatch*); D-325, D-331, D-445, D-446 (the return review or its fix review read them whole).
- Of the 119 I did not select the decisions that place nothing on a screen: the gate, the local start, CI, mutation testing, tests and their harness, the stylesheets' and roots' structure (D-265, D-267, D-269, D-270, D-395, D-407, D-408), addresses (D-281, D-332), what the account list shows (D-411), colours and their contrast with no placement (D-38, D-42, D-43, D-45, D-46, D-48), the pictures' licences (D-273), the editor's words and data (D-292, D-294, D-301, D-303, D-305, D-423), the card's numbers (D-328, D-333), the clicks (D-53, D-283, D-284, D-285, D-324, D-330), the end window's game state (D-369), the scene's background, tint, durations and timing (D-314, D-315, D-317, D-319, D-367, D-415), the agent's tools (D-417-D-420).
- Beyond the 119: 8 decisions the index lists by heading alone, read whole because their question asks where a part of a screen stands and a later screen task would read them: D-130, D-133, D-261, D-262, D-278, D-290, D-343, D-350.

## Declined to judge

- The background `highlight` that stays after a tap on „Teraz” and „Potem”, the rows of rules and the rows of the lists: `run-screen.css` `.now-row[tabindex]:hover, .next-row[tabindex]:hover { background: var(--highlight) }` stands outside the block `@media (width < 1280px) and (hover: none)` of `styles.css:618-626`, which the styleguide rule "Two layouts and one threshold between them" says takes the hover background off controls whose background is transparent at rest. Remark 2 of correction 1 has it fixed, and another agent is fixing it on this branch; it is a fault of the code, not a false sentence of a decision.
- The comment of `run-screen.css:505-517` calls the gap of `--space-xl` "56 px", where `src/browser/tokens.css:67` gives `--space-xl: 24px`; whether the 56 px counts other margins between the bar and the window I did not check. A code comment, outside remark 3.

## Checks run

- `git rev-parse HEAD`, `git -C .the-way rev-parse HEAD`, `git ls-files --stage -- .the-way` — `6f9c462f…` and `80006b25…` both, as given.
- `git status --short` and `git diff --stat HEAD` — clean at the start; `git diff --stat 55773884 6f9c462f` — empty.
- `python -B .the-way/elements/common/decision_index.py --output .runs/reader/index.md` with the parts, sections and decisions the handoff gives — exit 0; "Listed in full: 119. Listed by heading alone: 271."
- Manual: each decision read whole from `git show 6f9c462f:foundations/decisions.md`; each placement sentence compared with the stylesheets `styles.css`, `run-screen.css`, `headquarters.css`, `character-screen.css`, `credits.css`, `account-card.css`, `maps-screen.css`, `program-panel.css`, `programs-screen.css` at `6f9c462f` (their `@media` list from `git grep -n "@media" 6f9c462f -- 'src/browser/*.css'`), and with `camp.tsx`, `maps-screen.tsx`, `program-panel.tsx` where a sentence needed it.
- Not run: no browser was started; the verdicts rest on the stylesheets and the markup, not on a measurement at 360 px. The full gate and `foundation_check.py` were not run: this task reads decisions and changes nothing.

## Reaches beyond the dispatch

- The 8 decisions listed by heading alone (above), read whole: their question asks where a part of a screen stands.
- `src/browser/tokens.css` (the spacing tokens), `src/browser/index.html` (the stylesheets the page links), `src/browser/view/camp.tsx:1-30`, `src/browser/view/maps-screen.tsx` (class names of „Kto idzie”), `src/browser/view/program-panel.tsx:945-955` (the scroll of D-336): to judge D-280, D-389, D-329/D-326/D-274 and D-336.
- `foundations/decisions.md` of the base `0a2254cd`, D-280 alone: to tell which words of M-1 this change wrote.

## Working copies

- `.runs/reader` held `index.md` (the decision index), `decisions.md`, `styleguide.md` and nine stylesheets (copies by `git show 6f9c462f:<path>`). Removed before returning; nothing of it kept in `reports/`.

## Unread material

- Of the selection: none of the 46 left unread; every one read whole. The 14 dropped decisions were not read for this task by the handoff's rule (D-39, D-297, D-421, D-445 and D-446 read whole all the same; D-19, D-44, D-47, D-288, D-325, D-331, D-346, D-349 and D-396 read only in their index text).
- The index lists 271 decisions by heading alone. I read 8 of them whole (above). Others whose question asks where something stands or is shown, and that I did not read: D-96, D-128, D-148, D-166 (read whole by the return review), D-180, D-184, D-185, D-186, D-188, D-199, D-201, D-215, D-216, D-218, D-244, D-246, D-259, D-312, D-363, D-382. The remark bounds the reading to the index's 119; whether these belong to it is the orchestrator's to settle, and I recommend no further reading for the screens of tasks 12 and 17-21 beyond D-199 (the rows of the skill trees on Postać) and D-382 (how the chronicle's list scrolls), the two that size or scroll a part of a screen those tasks redesign.
- `guidelines/styleguide-browser-view.md` (1467 lines at `6f9c462f`): read whole. `foundations/glossary.md`: the entries "phone layout" and "computer layout" read whole, no other entry.
- The frozen task, the remark, the first review's report and the two return-step review reports: read whole.

## Searches not found or unclear

- D-323's "in the row under the menu bar beside the sentence of a failed save": the code puts the two sentences each on a full-width line of its own, the failure line above the line of saving (`styles.css:60-72`, its comment "stands beside it in the same way, above it"). Whether "beside" means "on the same line" or "next to, in that row of sentences" the text does not settle; I read it as the latter and judged no finding. Pre-existing, not written by this change.
- "In the order of the log" for the table: the log's order differs from the index's (sections first); the table follows the line numbers of `foundations/decisions.md` at `6f9c462f`.
