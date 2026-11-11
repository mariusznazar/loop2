# Foundation report — task koniec-przejscia

**Status:** done with concerns (see Questions and Choices)

**Commits:** `e0fd091` (on `task/koniec-przejscia`, base `211a4ea`) — one commit, `foundations/decisions.md` only: `docs: :memo: write the decisions of the end-of-run window and change the ones it touches`.

**Check:** `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 0, `0 errors` (run after the new entry and again before the commit). The product's gate was not run.

**Change of words (task To do 11, Question 11), named:** the entries call the window "the end-of-run window". "The end of a map run" stays the moment the map run ends, as the glossary's "completion" has it; the glossary got no entry. Where the approved sentences of the definition say "the end of the map run stands", "takes the place of the pause", "names that discovery", "stands in the section saying what it gave/cost", the entries say the window with the same meaning (D-62, D-122, D-185, D-216, D-135, D-132 and the new entry). The question of the new entry was reworded for the same reason (see Choices 1).

## Entries

Every entry is a decision; no invariant, glossary term, environment fact or part-map change was written. Every row (1–7) lands in an entry that states it whole; no row was tied to an entry that already stated it, and no row was left unwritten.

| Id | New / changed | Source | Meaning, English | Znaczenie, po polsku |
|---|---|---|---|---|
| D-362 (the "(new) — What does the end of a map run explain?") | new | `projected` (with the plan's note on Questions 7 and 8) · rows 1, 2, 7 | The end-of-run window opens of itself over the screen under the menu bar, answers what happened, what it cost or gave, why and what next, with the listed sections, and closes with "✕", Escape and reopens by the header button, at every entry and after a load. | Okno końca przejścia otwiera się samo nad ekranem pod paskiem menu, odpowiada kolejno: co się stało, co to kosztowało albo dało, dlaczego i co dalej, ze wskazanymi sekcjami; zamyka je „✕” i Escape, a otwiera przycisk w nagłówku, przy każdym wejściu i po wczytaniu. |
| D-62 | changed | `projected` (Decisions in play) · row 1 | After a death the window opens over the screen, header included and menu bar not; "Restart" and "Zakończ" stand in the window and, with it closed, in the header. | Po śmierci okno otwiera się nad ekranem, z nagłówkiem, ale bez paska menu; „Restart” i „Zakończ” stoją w oknie, a przy zamkniętym oknie w nagłówku. |
| D-122 | changed | `projected` (note of Question 12) · rows 6; Questions 5 and 12 | At a completion or a death in the game minute of a discovery the band does not stand; the window names the discovery with the band's text and "Dodaj regułę z tym"; the Rationale sentence about the game state is corrected. | Przy rozwiązaniu albo śmierci w minucie odkrycia pas nie stoi, a okno nazywa odkrycie tekstem pasa z „Dodaj regułę z tym”; zdanie Rationale o stanie gry jest poprawione. |
| D-135 | changed | `projected` · Question 6 | A manual map run keeps the longest streak and the window shows it against the map's condition as "najdłuższa passa {n}/{m}" with a bar. | Ręczne przejście pamięta najdłuższą passę, a okno pokazuje ją wobec warunku mapy jako „najdłuższa passa {n}/{m}” z paskiem. |
| D-147 | changed | `projected` · Question 8 | The paragraph of the last encounter also stands at the end, in a section of its own of the window, outside "Ostatnie minuty". | Akapit ostatniego starcia stoi też przy końcu, we własnej sekcji okna, poza „Ostatnimi minutami”. |
| D-185 | changed | `projected` | The line "Do skrzynki: …" stands in the window's section of what the end gave, not in the world area. | Wiersz „Do skrzynki: …” stoi w sekcji okna o tym, co koniec dał, a nie w obszarze świata. |
| D-216 | changed | `projected` | The death lines stand in the window's section of what the end cost, with the new wording and the hours from the balance data. | Wiersze po śmierci stoją w sekcji okna o tym, co koniec kosztował, z nowym brzmieniem i godzinami z danych balansu. |
| D-311 | changed (the part the code makes true) | `projected` · rows 1, 2, 4 | The world area loses the lines of the end; the header gains "Koniec przejścia"; the window stands over the screen under the menu bar and closes while the question stands. The transitional sentences of task 14 stop to hold. | Obszar świata traci linie końca; nagłówek dostaje „Koniec przejścia”; okno stoi nad ekranem pod paskiem menu i zamyka się, gdy staje pytanie. Przejściowe zdania zadania 14 przestają obowiązywać. |
| D-132 | changed (the part the code makes true) | `projected` · rows 1, 3 | After a completion the window opens under the completion text as its title in `positive` and holds "Otwarte: {mapa} →", the way to the opened map. | Po rozwiązaniu okno otwiera się z tekstem rozwiązania jako tytułem w roli `positive` i ma „Otwarte: {mapa} →”, drogę do otwartej mapy. |
| D-212 | changed (the part the code makes true) | `projected` · rows 2, 5; Question 4 | A loaded ended map run comes back with the window open, holding all but "Ostatnie minuty", which stand only where the chronicle holds entries. | Wczytane zakończone przejście wraca z otwartym oknem, całym poza „Ostatnimi minutami”, które stoją tylko tam, gdzie kronika ma wpisy. |
| D-53 | changed | `projected` · row 3 | "Otwarte: {mapa} →" is the second place the end leads to: the screen Mapy with the card of the opened map. The heading question now reads "where do the buttons that end a map run lead?". | „Otwarte: {mapa} →” to drugie miejsce, do którego prowadzi koniec: ekran Mapy z kartą otwartej mapy. Pytanie w nagłówku mówi teraz o przyciskach kończących przejście. |
| D-173 | changed | `projected` · rows 3, 4 | "Otwarte: {mapa} →" asks and ends the map run like "Zakończ"; when a button of the window asks, the window closes and stays closed after "Wróć", and the player lands where that button leads. | „Otwarte: {mapa} →” pyta i kończy przejście jak „Zakończ”; gdy pyta przycisk okna, okno się zamyka i po „Wróć” zostaje zamknięte, a gracz trafia tam, dokąd prowadzi ten przycisk. |
| D-313 | changed | `projected` · row 6 | The same button "Dodaj regułę z tym" stands in the window where it names a discovery, closes the window and does what it does in the band. | Ten sam przycisk „Dodaj regułę z tym” stoi w oknie przy nazwanym odkryciu, zamyka okno i robi to, co w pasie. |
| Row 1 | row 1 | lands in D-362, D-311, D-62, D-132 | Window opens itself, covers the screen and its header but not menu bar and warnings row, scrolls in itself, buttons fixed at the bottom. | Okno otwiera się samo, przykrywa ekran z nagłówkiem, ale nie pasek menu i wiersz ostrzeżeń, przewija się samo, a przyciski stoją na dole. |
| Row 2 | row 2 | lands in D-362, D-311, D-212 | "✕" or Escape closes, "Koniec przejścia" in the header opens, the window reopens at every entry. | „✕” albo Escape zamyka, „Koniec przejścia” w nagłówku otwiera, okno otwiera się znowu przy każdym wejściu. |
| Row 3 | row 3 | lands in D-53, D-173, D-132 (and D-362) | "Restart", "Zakończ", "Otwarte: {mapa} →". | „Restart”, „Zakończ”, „Otwarte: {mapa} →”. |
| Row 4 | row 4 | lands in D-173, D-311 | The question stands where D-173 puts it; the window closes and stays closed after "Wróć". | Pytanie stoi tam, gdzie stawia je D-173; okno się zamyka i po „Wróć” zostaje zamknięte. |
| Row 5 | row 5 | lands in D-212 (and D-362) | All but "Ostatnie minuty" comes back after a load. | Po wczytaniu wraca wszystko poza „Ostatnimi minutami”. |
| Row 6 | row 6 | lands in D-122, D-313 (and D-362) | The discovery is named only by the window. | Odkrycie nazywa tylko okno. |
| Row 7 | row 7 | lands in D-362, D-147 | The details of Questions 7 and 8 (sections, 8 % piece, five pieces, joined actions, the four entries outside the paragraph). | Szczegóły pytań 7 i 8 (sekcje, kawałek od 8 %, pięć kawałków, połączone czynności, cztery wpisy poza akapitem). |

Entries marked `the cycle's`: none.

## Choices (each with the way not taken)

1. The new entry's number is D-362 (next free; no withdrawn list in the log). Its question is "What does the end-of-run window say, and how does it open and close?", not the projected "What does the end of a map run explain?": the window is what explains, and the moment of the end explains nothing; rows 1 and 2 (opening, closing) also land there. Not taken: keeping the projected wording, which would put the old sense of "end of a map run" into a question. Cost if wrong: one heading to reword.
2. D-53's heading question was reworded (it asked only where "Zakończ" leads) because "Otwarte: {mapa} →" is a second button that ends the run. Not taken: leaving the heading and answering only in the statement. Cost: headings are referenced by number only; none breaks.
3. D-132 does not use the definition's template "„{mapa} rozwiązana”": the title is "the completion text of the map from its data" ("Las rozwiązany"), as the task's To do 4 gives and as the code has it; the sentence "„Teraz” reads the completion text" stays (D-334 refers to it).
4. D-362 binds no choice of the plan (the covered screen not shown, focus on the root, Escape read inside the window, death title role, height of the window, order of the header button, no backdrop). Where a verification example needed a place for "Koniec przejścia" it says only "in its header".
5. D-362 holds "Relations: derives from D-62 · derives from D-132" (the definition's field was `TODO`); D-122 and D-185 gained `derives from D-362`. Verification examples of D-362 are drawn from the task's own examples (Las, "najdłuższa passa 116/480", "Otwarte: Las — głębiej →").
6. D-185's *Rejected* uses the definition's approved wording ("a line directly under the status row"), whose "status row" is the old header row; D-216's *Rejected* was replaced by the definition's two ways, dropping the old "same in the status row" way.
7. D-188 and the world-area line of D-215 / D-201 were left unchanged (the task lists them as touched without change); D-188's "beside „Restart”" now also holds in the window, which D-362 names with D-188.

## Questions

None for the human. Concern for the orchestrator: D-362's single binding paragraph is three long sentences (the template allows 1–3); the checker accepts it.

## Unread material

- `docs/task-cycles/koniec-przejscia/plan.md`: read lines 1–34 (Foundation entries), 106–153 (Coverage, Choices); the Slices (34–105) not read.
- `.runs/.../task.md`: read whole.
- Vault definition `definicja_mvp2_loop2.md`: read the entries (new) "What does the end of a map run explain?", "How is the screen of a map run laid out?", D-62, D-122, D-132, D-135, D-173, D-185, D-212, D-216 only; not the rest.
- Vault plan `plan_mvp2_loop2.md`: read the Change log line 344 only (the note on Questions 7 and 8).
- Foundation decisions read whole: D-53, D-62, D-122, D-132, D-133, D-135, D-147, D-173, D-185, D-212, D-216, D-311, D-313, D-324, D-334, D-338 (first 14 lines), D-339. Referenced but not read: D-55, D-93, D-96, D-188, D-208, D-280, D-283, D-323, D-348 (cited as the task and the entries cite them).
- `foundations/invariants.md`, `glossary.md`, `part_map.md`: read only the passages that name the changed decisions (invariants `player-map-run-pace`, `death-settled-once`; glossary "map run", "completion"; part map `browser-view`, `simulation`).
- `.the-way/elements/decisions/examples.md` names WAY-03: read WAY-03. All other method files named by the handoff were read whole.
- Code (`src/browser/sim/types.ts:405-420`, `game.ts:540-555`, `:815-826`) read in those ranges only, to correct D-122's Rationale.

## Searches not found or unclear

- The session was interrupted (the machine restarted) after the edits of D-53, D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216, D-311 and D-313 were on disk and before the new entry, the commit and the report. I found my partial work with `git status` and `git diff --stat` (one modified file, 168 insertions, 99 deletions) and the check's 13 errors, all `D-362 names no decision of the log`; the edits matched the handoff's table, so I wrote only the missing new entry, ran the check, and committed.
- A search of the whole foundation (WAY-33) for entries touched by the window found no other decision whose binding sentence changes: the invariants (`player-map-run-pace`, `death-settled-once`) and the glossary hold nothing the changes contradict. D-188 and D-324 stay true as written.
- The definition leaves *Relations* and *Verification* of the projected entry `TODO`; I filled them (Choices 5).
- "Status row" in the definition's *Rejected* of D-185 is unclear in today's vocabulary (Choices 6); kept as approved.
- No plural form is given for the hours of D-216 if the balance data changes from 8 hours; named in the plan's Choices too, not settled here.

## Own-work check (change/SKILL.md section 3)

**Requirement most likely not met:** task To do 11 and rows 1–7 of *Settlements to record* say that each row lands whole in the entries named in the plan's table (row 2 in the new entry and D-311; row 1 in the new entry, D-311, D-62 and D-132; and so on), and that the transitional sentences of D-122 and D-311 about the lines of the end in the world area stop to hold. The likely failures: a row that lands in one named entry but not in another it names, and a sentence elsewhere in the log that still says the lines of the end stand in the world area or that the band of a discovery stands after an end.

**Checks run, and what they showed:**
1. Row-by-entry presence check: for each of D-362, D-62, D-132, D-311, D-122, D-212, D-173, D-313, D-135, D-147, D-185, D-216, D-53 I extracted the entry and counted the row's key phrases ("end-of-run window", "menu bar", "Escape", "Otwarte", "Koniec przejścia"). It showed one gap: D-311 (named for row 2) held the header button "Koniec przejścia" but not that "✕" and Escape close the window and that it opens again at every entry. Fixed in commit `c730482` (D-311 statement), then the foundation check again: exit 0, `0 errors`. Row 1 phrases (menu bar) stand in D-362, D-62, D-132, D-311; rows 3, 4, 5, 6 stand in the entries their rows name.
2. Search of the whole decision log for leftovers: `grep -n -i -E 'world area|line of the end|lines of the end|Do skrzynki|band .*stand|until „Restart” or „Zakończ”|status row'` and a second search for `band of (a|that) discovery`, `screen after (the|a) (completion|death|its end)`, `after its end`. Every hit was read in its entry. Result: no remaining sentence says the lines of the end stand in the world area or that the band stands after a completion or a death. The hits left are correct as they stand: D-55, D-280, D-308, D-335 ("the world area after the end would lose a row" — "Potem" stays in the world area), D-338, D-201 and D-215 (their lines stay in the world area; the task keeps them), D-345 (the chronicle entry of a discovery uses the band's text; unchanged), D-173's "under the band of the discovery" (the band during a map run), and D-311's and D-122's own "violates" lines, which now forbid the old placement.
3. Reading of each changed entry against the approved sentence of the definition quoted in the task's *Decisions in play* (D-62, D-122, D-132, D-135, D-185, D-216 in the definition's words): the binding sentences keep the approved meaning with the changes of words named above; the one departure is D-132's title ("the completion text of the map" for "{mapa} rozwiązana", Choices 3).
4. The Rationale correction of D-122 was checked against `src/browser/sim/types.ts:413-417` and `src/browser/sim/game.ts:546-551`, `:822`: the game state does tell a stop at a discovery from the player's pause by its `discovery` field, and the entry now says so.

**Not checked:** the product's tests and gate (the orchestrator runs them); the `foundation_check.py` run without `--skip-test-citations`.

## Files changed and commits

- `foundations/decisions.md` only.
- `e0fd091` — `git show --stat e0fd091`: 1 file changed, 183 insertions(+), 99 deletions(-).
- `c730482` — 1 file changed, 1 insertion(+), 1 deletion(-) (the D-311 fix of check 1).
- Together: 184 insertions, 100 deletions of `foundations/decisions.md`; the check ends with exit 0, `0 errors`.
