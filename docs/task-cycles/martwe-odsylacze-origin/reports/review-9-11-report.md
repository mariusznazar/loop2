FAIL 7fcf907e

# Review of slices 9–11 (D-152 to D-221), range `7ec7966b..7fcf907e`

Reviewed: the decisions D-152 to D-160 and D-163 to D-221 (70 decisions; D-161 and D-162 are unchanged and named no note) as they stand at `7fcf907e`, against their state at `7ec7966b` and against the note passages their old *Origin* named, read in `the private snapshot of the notes (not committed)/vault/`. Commits `b64d3c91` and `60c5f99f` (D-03, D-79, D-84, D-85, D-96, D-144) were left out, as the dispatch says.

## Blocking findings

### Important 1 — the concept document's reasoning behind four projected entries is lost (slice 10: D-179, D-189, D-190, D-191; D-192 in part)

Place: `foundations/decisions.md` at `7fcf907e`, *Rationale* and *Rejected* of D-179, D-189, D-190, D-191.

The old *Origin* of each named a projected entry of `definicja_mvp_loop2.md`. That entry's own *Origin* names the concept document: "How do items go into a map run and out of it?" — `koncepcja_projektowa.md … §4 "Kierunek: przedmioty krążą między mapami" and §5 "Pętla zarobkowa"`; "What pays, and what takes from the chest?" — `D31 and §5 "Pętla zarobkowa"`; "What does a character's death take?" — `D29, D25, D46 and §5 "Rozwój postaci"`; "How does a character skill grow?" — `D25, §4 … §5`; "What describes a character?" — `D26, D24 and §4`. The plan's Goal for slice 10 tells the executor to read "the passage the *Origin* names … and what that passage refers to"; the executor read the concept passages "for orientation only, wording not used" (slice-10 report, Unread material) and carried nothing. With *Origin* now `none`, nothing in the foundation reaches that reasoning, and the concept document is one of the documents To do 2 names. What is lost, by decision:

- **D-191.** Entry: "buying is shallow — one easy map run nearly pays for a character skill … Two counters inside one character skill would quietly speed up the whole economy, so a finer split makes a new character skill." Lost — the accepted cost of the chosen option, D25: „*Znany koszt:* wprawa hoduje wyłącznie to, czego program używa, a program używa tego, co już najlepsze — więc umiejętności słabsze zostają na pierwszym poziomie, a im drobniej dzieli się umiejętności, tym więcej takich stoi. Odpowiedzią mogą być tylko miejsca, w których mocniejszej opcji nie ma albo nie liczy się ona do celu; dopóki takich miejsc nie ma, rozdrobnienie produkuje puste drzewa.” Also the reason „Program przestaje być wyłącznie rozwiązaniem mapy, a zaczyna być inwestycją w postać.” This is the defect kind the dispatch names: the chosen option's accepted cost left out while the rejected options keep theirs.
- **D-189.** Entry: "were every completion to pay, a fast-forwarded map run would give the same practice as hours of the earning loop, leaving the earning loop no reason to exist." Lost — the number this rests on, D31: „przejście lasu dawało tę samą wprawę w 41 sekund na 16× co w 11 godzin pętlą — różnica około 960-krotna — więc pętla zarobkowa nie miała powodu istnieć”, and „pętli nie trzeba domykać, żeby wziąć dniówkę”.
- **D-190.** Entry carries the stake, the valve and the rejected ways. Lost from D29: „Przemiatanie może pomóc ocenić ryzyko na sprawdzonych ziarnach, ale żaden wynik nie obiecuje bezpieczeństwa programu na każdym ziarnie”; „Docelowo po śmierci przychodzi postać o innych predyspozycjach i reset jest nowym runem, nie karą za to samo; przy jednej postaci reset jest karą i to wystarcza, bo bez niego śmierć nie kosztuje nic”; the reasons beside two rejected ways — stake in the loop only: „dwie śmierci z jednego zdarzenia”; a resurrection per map: „a drużyna biłaby się o jedno”; and that the resurrection as an item was „odłożone, nie odrzucone … wraca, gdy pojawi się łańcuch, który mógłby je wytwarzać” (the entry reads only "no chain of making produces it").
- **D-179.** Entry equals the projected entry. Lost from §4: the accepted cost „restart bierze ze skrzynki jak każdy start i przestał być czystym powtórzeniem”; and the reason the backpack cap guards carrying in: „wniesione sztuki zajmują miejsce od minuty zerowej, a pełny plecak czyni zbieranie NIEWYKONALNYM, nie tylko bezowocnym … Wnoszenie kosztuje natychmiast, a nie tylko daje.”
- **D-192** (in part). D26's reason „To jest mechanizm, którego wymaga druga postać i rozgałęzienie klas z §4” is not carried; the rest of D26 is.

Why it matters: To do 1 asks for "całe uzasadnienie, jakie ta notatka niesie dla tej decyzji", and the definition carries these entries' reasoning only by pointing to the concept document. Cutting the pointer without moving what it points to loses an accepted cost and a measured number — the failure this change exists to remove. Fix: carry the passages above into the four entries (dated where they describe a past state of the game), as slice 11 did for D-206 from D23 and D46.

My answer to the slice-10 executor's question 3: carry it now, in slice 10's decisions; no later slice owns D-179 to D-192.

### Important 2 — D-185 and D-216 state a layout the foundation no longer has and give a reason of task order (slices 10 and 11)

Place: D-185 *Rationale* and *Rejected*; D-216 *Rationale* and *Rejected*.

- Entry (D-185 *Rationale*, added): "The line stands in the world area, between the scene and the body row, since the paragraph of the last encounter has moved from under the scene into the chronicle (D-147), and the right area does not take over the end of a map run: a screen of its own for the end of a map run is a larger change, and making it here would be ahead of its time." D-216 adds the same sentence, and its *Rejected* gains "the lines of the end of a map run in the right area at once — a part of the larger change of a screen for the end of a map run, ahead of its time."
- Note (`ekran_przejscia_loop2.md`, Q4): „W obszarze świata, między kadrem a wierszem ciała; prawy obszar nie przejmuje końca przed zadaniem 16.” Not chosen: „linie końca w prawym obszarze już w tym zadaniu … — część zadania 16 i większe zadanie przed terminem”.
- Wrong: at `7fcf907e` D-311 lays the screen of a map run out in "two columns under one header: on the left the world … on the right the program". There is no right area, so "the right area does not take over the end of a map run" is a present-tense statement of a past layout — the defect kind the dispatch names. "Making it here would be ahead of its time" is the note's task order („przed zadaniem 16”, „przed terminem”), a part of the process, which slice 9 rightly left out of its own decisions; "here" points at a task.
- D-185 also gains history: "Accepted when the line was placed under the discovery line and the paragraph of the last encounter, which then stood below the status row: after a completion … the line stood one row, or a long paragraph, lower than the status row „… rozwiązany”." and a rejected way whose reason rests on that layout ("placing it directly under the status row, above the discovery line — the discovery line and the paragraph of the last encounter, which then stood below the status row, would go lower …"). The cost belongs to a placement the decision no longer has; the template asks *Rationale* to describe the decision as it stands and not how it was reached (WAY-05, WAY-07, WAY-29).

Why it matters: a reader of D-185 or D-216 is told of an area that does not exist and of a reason tied to one task's turn. Fix: drop the right-area clause, "ahead of its time" and the past-placement cost; keep what still holds — the paragraph of the last encounter moved into the chronicle (D-147) — and leave a rejected way whose only reason is task order or a past layout with no reason.

My answer to the slice-10 executor's question 2: do not carry the layout reasons of Q12, not even in the past tense.

For the orchestrator, outside this range's commits: since the branch's merge base `01418389`, `main` (`4027d2fd`) has changed D-173, D-185, D-212 and D-216. On `main`, D-185 and D-216 put these lines "in the section of the end-of-run window (D-368)" and name `koniec_przejscia_loop2.md` in *Origin*. That note is not in the snapshot. The sentences added here contradict `main`'s binding sentences, so the reconciliation with `main` needs that note.

### Important 3 — D-187 *Rejected* gains reasons of the process and keeps pointers to "the definition" (slice 10)

Place: D-187 *Rejected*.

- Entry: "giving a current map a cap — adds a balance value beyond the accepted definition, a new number outside the predecessor game's data; removing caps from the definition — reopens readiness and the plan, it would need a new check of readiness and a review of the plan, holding up all the work planned alongside; leaving the definition intact and omitting the mechanism."
- Note (`plan_wyprawy_loop2.md`, Q1): „B — jedna z map MVP dostaje pułap (nowa liczba balansu spoza definicji i loop); C — pułap mapy wychodzi z wpisu definicji (nowa kontrola gotowości definicji i przegląd planu, które wstrzymują gotowość całej rundy); D — wpis bez zmiany i nic nie budować.”
- Wrong: the clause added in this range, "it would need a new check of readiness and a review of the plan, holding up all the work planned alongside", is the process of the author's project (the readiness gate of a definition and its plan), not something the product gains or pays. Two of the three rejected ways are written as edits of a document ("removing caps from the definition", "leaving the definition intact"), and "the accepted definition" and "the definition" point to a private document no reader can open (WAY-27, which this task applies). Slice 11 removed such words from D-206 and D-220. Slice 10 kept them here and extended the process reason.

Why it matters: the entry's rejected ways cannot be weighed by a reader. Fix: name the ways as the game would have them — a map of the first maps with a cap of its own; no map cap at all; the cap stated with no code behind it — give each the product reason the note keeps (for B: a new balance number outside the predecessor game's data), and leave a way with no reason where the note gives only the process.

## Minor findings

1. **D-152, D-153, D-154 against D-202, D-205, D-206 — review conditions handled two ways.** Slice 9 dropped the projected entries' *Review when* (for example D-153: „Outsider delivery from the intended container fails, its limits prevent account recovery, or the service stops being available on the current Mikrus plan”). Slice 11 carried theirs ("The choice is to be looked at again if account abuse or the volume of registrations calls for approval before play."), and D-204 already held one. Each condition names what the choice rests on, which a human weighing a change needs (the reader of *Rationale* in the template). My answer to slice 9's question 1 and slice 11's question 1: carry the condition in all six, phrased as the premise the choice holds under, without the check-by date.
2. **D-180 — a rejected reason the decision itself no longer avoids.** Entry: "the plan in the headquarters character row — when the same editor was to serve the copy in a map run and the saved program, a plan there could not be corrected in the copy during a map run". The same entry accepts "the plan of the copy is not changed during a map run". The note's reason (plan_wyprawy Q2: „w trakcie przejścia kopii nie dałoby się poprawić”) no longer tells the two ways apart, and its premise is history. My answer to slice 10's question 1: drop the clause and keep the way with no reason.
3. **D-173 — an accepted cost lost.** pytanie_przy_zakoncz Q3, way A, Source: „koszt drogi A: jedno zdanie więcej w pytaniu w tym rzadkim przypadku”. The entry's "Accepted with it" lists the click, the name the game chose, the eye's travel and the two bands, but not this cost.
4. **D-166 — an accepted cost and the gain of a rejected way lost.** zadanie_proporcje Q3, P1: „Przyjęty koszt: na Programach szerokości dziś nie brakuje, więc ta część jest robotą bez zysku szerokości tam” — the entry gives the in-place panel's reason but not this cost. ekrany_i_menu Q15, not chosen: „Na liście po lewej staje też „Kopia w przejściu” — … zysk: poprawka działa z każdego miejsca.” — the entry keeps that way's cost but not its gain.
5. **D-176, D-177 — the rejected way points at "the question".** Entry: "other numbers, or other answers to the points of the question about the numbers of nature energy, given point by point instead of the predecessor game's numbers taken together." The rewrite in this range adds a pointer to the note's question and keeps the way in the form of a way of answering. Name the numbers instead: the cap, the start, the price, the rate and the threshold of nature energy other than the predecessor game's.
6. **D-194, D-186 — history and pointers to other work.** D-194: "Accepted with it, for the time before the earning loop entered the game: repeating Las no longer raised a character …" — the cost of a stretch between two tasks that has ended; it tells how the decision was reached. D-186: "this gives early a part of what a clear showing of the trip plan in force in the map run going on asks for" — "asks for" points at postponed work in the author's notes (plan_wyprawy Q8: „część tego, co odłożył po MVP w `_zadania/zadanie_przerobka_…`”) without saying what it is. Slice 9 left such costs out, as its question 2 says (I agree with it), and slices 10 and 11 carried them, so one change treats the same kind of passage two ways.
7. **D-154 — a pointer left in place.** Entry (unchanged): "SMTP credentials stay outside the definition." With *Origin* `none` this refers to nothing a reader can open. It lies at the edge of the task, since the slice did not touch the sentence; D-206 and D-220 had the same kind of words removed.

## Questions of the executors — my view

- Slice 9, 1 (Review when): carry it in all six decisions (Minor 1).
- Slice 9, 2 (costs of a past state or of task order left out): right. Slices 10 and 11 should follow it (Important 2, Minor 6).
- Slice 9, 3 (old rejected ways that no named passage supports, left as they were): right. They are kept, not invented.
- Slice 9, 4 (D-157, the registration answer waits for the sending): right. The entry's *Verification* says so, and the code does so at `7fcf907e`: `src/server/account-routes.ts` awaits `sendLinkMessage(…, "confirmation")` before answering 201 with `confirmationMessage`.
- Slice 10, 1 (D-180): drop the clause (Minor 2).
- Slice 10, 2 (D-185): do not carry, even in the past tense; the right-area clause is false today (Important 2).
- Slice 10, 3 (the concept document behind projected entries): reasoning was lost; carry it (Important 1).
- Slice 10, 4 (D-182 *Rejected* `unknown`): right. plan_wyprawy Q3 keeps no way not chosen for the empty plan; its way B concerns the select list (D-181).
- Slice 11, 1 (Review when as a closing sentence): keep it, and do the same for D-152 to D-154 (Minor 1).
- Slice 11, 2 (D-212, Q15 ways A and C not carried): right. Both are ways of recording an answer in the definition and of reopening its gate, not ways the game could behave.
- Slice 11, 3 (D-208, sizes measured "when this was decided"): keep them. The template lets a measurement stand with what was measured and under which conditions, and the entry calls the result an upper estimate.
- Slice 11, 4 (D-207, 1440 against 2880): keep 2880. A save every 30 real seconds makes 2880 a day; the note's 1440 would be a save a minute.

## Every decision compared with its passages

All 70 decisions were compared with the passages their old *Origin* named. Each line gives the result.

- D-152, D-153, D-154 — equal the projected entries; only the review condition left out (Minor 1).
- D-155 — Q1 costs, K1, reset Q4 and row 12 present; the added sentence about the hours follows the potwierdzenie Context (OWASP gives no number of hours). OK.
- D-156 — Q2 cost (D-109 changes, the link alone authorizes) added; B present. OK.
- D-157 — Q3 and Q8 costs, B and C reasons, ekrany Q11 point 4 added; no header row on every screen (superseded). OK.
- D-158 — reset Q8 B reason added. OK.
- D-159 — K9 and its "what the cycle would otherwise guess" carried; not invented. OK.
- D-160 — Q10 cost added; reset Q14 belongs to D-225. OK.
- D-163 — To do 13 holds no reason. OK.
- D-164 — koncepcja D39 reasons added. OK.
- D-165 — equals the projected entry. OK.
- D-166 — Q6, Q15, edytor Q4 and Q13, zadanie_proporcje Q3 P2 carried; P1 cost and Q15 B gain lost (Minor 4).
- D-167, D-168, D-169 — programy Q2 and Q3 present, Q3 cost included. OK.
- D-170 — Q13 added; Q4 and karty To do 5 give no reason. OK.
- D-171 — programy Q5 gives the answer only. OK.
- D-172 — Q6 and Q14 present; the role's meaning added. OK.
- D-173 — Q2, Q4, Q8 and the definition's entry carried; Q3 A cost lost (Minor 3).
- D-174 — Q10, Q12 and Q17 carried. OK.
- D-175 — equals koncepcja D52 and the projected entry. OK.
- D-176, D-177 — plomyk Q2 numbers, weak point and loop material carried; rejected way's form (Minor 5).
- D-178 — plomyk Q5 carried. OK.
- D-179 — equals the projected entry; koncepcja §4 lost (Important 1).
- D-180 — karty Q3 and plan_wyprawy Q2 carried; headquarters-row reason moot (Minor 2).
- D-181 — Q3 and Q11 a carried. OK.
- D-182 — Q3 cost and loop test carried; `unknown` right. OK.
- D-183 — plan_wyprawy Q6 and petla Q5 carried. OK.
- D-184 — Q4 part 2 carried. OK.
- D-185 — layout premise and task order (Important 2).
- D-186 — Q8, Q10 c and Q11 c–e carried; pointer to postponed work (Minor 6).
- D-187 — Q1 and Q10 a carried; process reasons and pointers (Important 3).
- D-188 — Q10 b and B2 carried. OK.
- D-189 — rozliczenie Q1 and Q2 and plan_wyprawy Q5 carried; row 11 rightly left out (an interim state); koncepcja D31 lost (Important 1).
- D-190 — rozliczenie Q1 and Q3 and petla Q13 and Q16 carried; koncepcja D29 lost (Important 1).
- D-191 — equals the projected entry; koncepcja D25 lost (Important 1).
- D-192 — equals the projected entry; D26 mostly in it already (Important 1, in part).
- D-193 — wprawa Q5 and settlement 1 carried. OK.
- D-194 — wprawa Q1 and rozliczenie Q4 carried; transitional history (Minor 6).
- D-195 — wprawa Q3 B, Q4 and the D45 gate carried. OK.
- D-196 — wprawa Q3, ekrany Q15 and Q17 and edytor Q18 carried. OK.
- D-197 — wprawa Q9 and Q13 carried; numbers checked by the executor against the data. OK.
- D-198 — wprawa Q9 carried. OK.
- D-199 — wprawa Q6 and Q11 carried. OK.
- D-200 — wprawa Q6 material, petla Q4 and the definition's entry carried. OK.
- D-201 — wprawa Q6 and Q12 carried. OK.
- D-202 — equals the projected entry plus its review condition. OK (Minor 1 concerns slice 9).
- D-203 — equals the projected entry. OK.
- D-204 — already held everything. OK.
- D-205 — the Technology line ("simple start") and the review condition added. OK.
- D-206 — koncepcja D23 and D46 and the review condition carried; "the MVP" removed. OK.
- D-207 — zapis Q1 and petla To do 17, Q11 and the carried questions carried; 2880 right. OK.
- D-208 — zapis Q2 and Q18 and petla Q12 and the measurement carried. OK.
- D-209, D-210 — already held zapis Q3, Q16 and Q4. OK.
- D-211 — zapis Q5 and reset Q5 carried. OK.
- D-212 — zapis Q8, Q15 B and Q23 carried; Q15 A and C rightly left out. OK.
- D-213 — reguly_awarii Q16, cause 6 and its check carried. OK.
- D-214 — rozliczenie Q2 has no way not chosen; `unknown` right. OK.
- D-215 — Q6 a already present. OK.
- D-216 — rozliczenie Q7 present; ekran_przejscia Q4 carried with the right-area claim (Important 2).
- D-217 — rozliczenie Q8 a and Q12 and karty Q4 carried. OK.
- D-218, D-219, D-220, D-221 — Q8 b, Q11, W1 and To do 16 carried. OK.

## Pointers and leaks

No *Origin* in the range names a note; all 70 read `none`. No added text names a note, a path, a host address, an account, an e-mail address or a secret. The pointers left in the text are in Important 3 and Minor 5, 6 and 7. The phrases "the first scope" (D-220) and "the scope the game started with" (D-206) describe the definition without naming it, which I accept.

## Declined to judge

- D-153's *Rationale* and binding sentence name the author's existing Mikrus account and domain. This is unchanged text whose binding sentence the task freezes, so a leak question here is not this range's to settle.
- D-216's binding sentence („Wskrzeszenie zużyte: wprawa i wykupione stopnie zostają.”) is the wording the MVP2 definition rejects; binding sentences are outside the task, and `main` has since replaced it.
- D-159's old *Rejected* way ("tying a confirmation to the address it confirmed …") comes from the "what the cycle would otherwise guess" column, which WAY-134 keeps out of *Rejected*. It is unchanged text.
- D-174's added sentence names the streak but not the beaten attacks and the firing counts that a switch also clears. D-131 and D-93 hold those, so nothing is contradicted.

## Checks run

- `git rev-parse HEAD` in the worktree → `303c16dd…`, not `7fcf907e`, because another agent commits there, as the dispatch says; the review reads `7fcf907e` only through `git show` and `git diff`. Exit 0.
- `git log --oneline 7ec7966b..7fcf907e` and `git diff --stat 7ec7966b..7fcf907e` → five commits, one file. Exit 0.
- A scratch Python comparison of `git show 7ec7966b:foundations/decisions.md` with `git show 7fcf907e:foundations/decisions.md` → the changed decisions are D-03, D-79, D-84, D-85, D-96, D-144 and the 70 of the range; in each of the 70, the part before *Rationale* (the *Origin* line excluded) is the same; every *Origin* reads `none`; 368 entries in both. Exit 0.
- A scratch word diff of *Rationale* and *Rejected* for all 70, scanned for MVP, definition, task, question, note, vault, a person's name, `@` and the domain → the hits are the ones listed under Pointers and leaks. Exit 0.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' 7fcf907e -- foundations/decisions.md` → the first hit is at line 4397, inside D-222; D-221 ends before line 4374. Exit 0.
- `python -B .the-way/elements/common/foundation_check.py`, run on an isolated copy of `7fcf907e` (built with `git archive`, the pinned `.the-way` `e9a0f926` and the gitlink restored, in the session scratchpad) → "0 errors". Exit 0.
- `git show 7fcf907e:src/server/account-routes.ts`, lines 745–766 → registration awaits the sending before answering (slice 9, question 4). Exit 0.
- A comparison of D-152 to D-221 between `main` (`4027d2fd`) and the merge base `01418389` → D-173, D-185, D-212 and D-216 differ. Exit 0.

## Reaches beyond the dispatch

- `foundations/decisions.md` at `7fcf907e`: D-105, D-131, D-288 and D-250 (binding sentences), and D-311 whole, to check added clauses against them. D-185 and D-216 at `main`, to judge the layout claim.
- `.the-way/elements/decisions/template.md` and `.the-way/elements/common/rules.md` whole; WAY-27 whole.
- Note passages beyond those the old *Origins* name: `koncepcja_projektowa.md` D24–D31 and §4 "Kierunek: przedmioty krążą między mapami", because the projected entries' own *Origin* points there (Important 1); the Technology, Out of scope and Success sections of `definicja_mvp_loop2.md`.

## Unread material

- `koncepcja_projektowa.md` §5 ("Pętla zarobkowa", "Rozwój postaci") and §4 "Kierunek: rozwój postaci przez wprawę" were not read. More lost reasoning for D-179 to D-192 may stand there.
- Notes were read by passage, not whole:
  - `definicja_mvp_loop2.md`: the projected entries of the range, Technology, Out of scope, Success.
  - `definicja_mvp2_loop2.md`: the entries D-157 to D-217 of the range and D-188, D-189, D-165, D-195.
  - `potwierdzenie_adresu_loop2.md`: To do, Q1 to Q10, Context, carried questions, Settlements.
  - `reset_hasla_loop2.md`: Q4 to Q15 and Settlements (Q1 to Q3 not read).
  - `programy_gracza_loop2.md`: Q1 to Q17 and Context (Settlements not read).
  - `ekrany_i_menu_loop2.md`: Q1 to Q17 and Settlements.
  - `edytor_programu_loop2.md`: To do 1, 3 and 11; Q4, Q11, Q13 and Q18.
  - `zadanie_proporcje_sceny_i_programu_loop2.md`: Q1 to Q6.
  - `karty_i_katalog_map_loop2.md`: To do 5, Q3 to Q5, Settlements.
  - `pytanie_przy_zakoncz_loop2.md`: Q1 to Q8, Decisions in play, Settlements.
  - `plomyk_loop2.md`: Q2 and Q5.
  - `plan_wyprawy_loop2.md`: Q1 to Q13 and Settlements.
  - `petla_zarobkowa_loop2.md`: To do 17; Q4, Q5, Q11, Q12, Q13 and Q16; carried questions; rows 6 to 8 and 18 to 20; the measurement line of Context (Q1 to Q3, Q6 to Q10, Q14, Q15 and Q17 to Q21 not read).
  - `ekran_przejscia_loop2.md`: To do 4; Q4 and Q7.
  - `kronika_z_filtrami_loop2.md`: To do 6 and 7.
  - `rozliczenie_przejsc_loop2.md`: W1, Q1 to Q12, To do, carried questions, Settlements.
  - `wprawa_i_drzewa_loop2.md`: Q1 to Q13 and Settlements.
  - `zapis_stanu_na_serwerze_loop2.md`: Q1 to Q5, Q8, Q15, Q16, Q18 and Q23, and To do 10 to 15 cut short (Q6, Q7, Q9 to Q14, Q17 and Q19 to Q22 not read).
  - `reguly_awarii_i_logow_loop2.md`: To do, Q16, Context cause 6, row 3.
- `plan.md`: only slices 9 to 11 were read. `task.md`: its passages came in the dispatch, and the file was not opened. `.the-way/task-cycle/review/whole_change.md` and `fix.md` were not read; they do not apply to a slice review.
- The `old-loop/` snapshot was not opened; no *Origin* of the range names it.

## Searches not found or unclear

- `koniec_przejscia_loop2.md`, which `main`'s D-185 and D-216 name in *Origin*, is not in the snapshot (`MANIFEST.md`).
- petla_zarobkowa Q11 B says „około 1440 zapisów na dobę”, which does not match a save every 30 seconds (2880).
- The plan's phrase "what that passage refers to" is not said to include a projected entry's own *Origin*. I read it as including it (Important 1); the slice-10 executor read it as not.
