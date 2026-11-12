FAIL 9d6316c3

# Review of slices 18–20 (D-323 to D-363 without D-362) — `769f5e24..9d6316c3`

Reviewed: the commits `a16b3443`, `ce206f62` (slice 18), `0f13b944` (slice 19), `9d6316c3` (slice 20). The commit `0822d4b2`
(D-311–D-316, accepted by another review) lies in the range and was not judged. `git rev-parse HEAD` in the worktree showed
`9d6316c3` at the start; the worktree held another agent's uncommitted edit of `foundations/decisions.md`, so every entry was read
from `git show 9d6316c3:foundations/decisions.md` and `git show 769f5e24:foundations/decisions.md`, never from the working tree.

Blocking: 4 Important (2 from slice 19, 2 from slice 20). Minor: 6. Out of scope: 0 (the lines under **Declined to judge** count apart).

## Important

### I1 — D-347 (slice 19): the measurement of the chronicle's size its research gives is lost, and D-339 keeps "never measured" against it

- Entry D-347 at `9d6316c3`: its *Rationale* and *Rejected* carry the lacks and limits of the research's options (screen, console, sentence,
  Sentry, GlitchTip, Bugsink, the save, Node), but nothing of the research's measurement of the chronicle.
- Entry D-339 at `9d6316c3` (kept text): "*Rejected:* … the chronicle in the save, coming back whole after a load — … the size of the chronicle
  was never measured, estimated at 50 to 60 bytes an entry and several hundred entries in a long map run, and a save above 64 KiB is not sent
  (D-207), so the game would stop saving" and "The choice rests on two things nobody measured, each a hypothesis: the estimate of the
  chronicle's size, and that a reload in the middle of a map run is rare."
- The research D-347's old *Origin* named (`technologia_zapis_dzialania_gry.md`, option 2 „Kronika”, dated 2026-11-01, five days before the
  chronicle's place was settled): "**Pomiar skali (30 ziaren, jedna postać, Las, gotowy program 17 reguł …):** zapis ma około 9,5 KB;
  przejście daje medianę 48 wpisów rodzajów pasujących do kroniki, maksymalnie 102; te wpisy jako surowy JSON to średnio 8,0 KB, maksymalnie
  13,4 KB; to oszacowanie bez zmian gracza i utrat passy, których zdarzenia dziś nie niosą; kronika jednego przejścia mieści się w limicie, ale
  decyzja D-208 już przyjmuje, że przy kilku pętlach zapis potrafi stanąć na tym limicie".
- What is lost: a measurement, with its conditions, that the source of D-347 gives for the option D-347 took (the chronicle), and that the
  template lets an entry carry ("a measurement the choice rests on may stand, with what was measured and under which conditions"). Once the
  notes are gone the foundation is the only record, and it then says only "never measured … several hundred entries … the game would stop
  saving" — a reason for rejecting the chronicle in the save that the measurement (at most 13.4 KB of entries beside a save of 9.5 KB, under
  a 64 KiB limit) weakens. A reader re-weighing D-339 would take the size for unknown and probably too large.
- Fix: carry the measurement, with its conditions (30 seeds, one character, Las, a ready 17-rule program, raw JSON, without the player's
  changes and the losses of the streak, one map run fitting the limit while several earning loops already bring the save near it), into D-347
  as part of what was weighed of the chronicle, and into D-339 beside its estimate; there replace "was never measured" and "nobody measured"
  by what holds: the estimate the choice was made on, and a measurement under narrower conditions that gives fewer entries. The executor raised
  this (question 2 of the slice-19 report); I hold that D-339 should change too, since it is in this range and its kept claim becomes
  uncorrectable after this change.

### I2 — D-347 (slice 19): a lack written in the present tense that D-355 and D-356 have since made untrue, strengthened by the added clause

- Entry D-347 at `9d6316c3`, *Rationale*, lacks: "an agent learns of a fault in the owner's own game only from the owner, since in the
  owner's browser it knows only what the owner passes on". The clause after "since" is new in this range.
- Source (research, option 3, 2026-11-01): "W przeglądarce Mariusza agent wie tylko tyle, ile Mariusz przekaże"; definition's projected entry:
  "an agent learns of a fault in the owner's own game only from the owner".
- Linked entries at `9d6316c3`: D-356 "the page in the browser, besides its line in the console, sends the kind, the code and the place of
  an error that no code handled to a route of the game's server, which … writes each as a failure line that the watcher counts and
  reports"; D-355 "An agent reads the log of a running container with `docker compose logs --tail`, and the file and its generations with a
  bounded `tail`, `grep` or `zgrep`, each through the `mikrus` MCP server". D-347's own *Rationale* names D-355 and D-356 one sentence earlier.
- What is wrong: since D-356 an unhandled error in the owner's browser reaches the server's log, which an agent reads without the owner, so the
  lack is no longer true of faults of the code; the entry states a past state as a fact of today, and the added "since" clause makes the claim
  general. This is the defect kind the handoff lists ("a note's statement about a past state written as a present-tense fact of the log").
- Fix: date the lack ("when this was decided …") or narrow it to what still holds (what the owner's screen and chronicle show reaches an agent
  only through the owner, while the kind, the code and the place of an unhandled error reach the server's log by D-356).

### I3 — D-363 (slice 20): "the scope of the project" stands as the authority for the form of the price

- Entry D-363 at `9d6316c3`, *Rationale*: "A price read as a sentence, as the row of a rule is (D-288), with the names of things in the form
  their count takes and the energy by its full name, as the reason does (D-310), is the form of the example „Wytwórz — ognisko (6 patyków)”
  that the scope of the project fixed, and every new thing will need those forms".
- Note (`koszty_i_stan_ogniska_loop2.md`, question 2, answer): "brzmienie przykładu zatwierdzonej definicji, czytane jak zdanie, tak jak wiersz
  reguły (D-288)".
- What is wrong: the executor replaced "the example of the definition" by "the example … that the scope of the project fixed" — still a project
  document, out of every reader's reach, given as a reason. The handoff lists "the definition", "the approved project definition" as an authority
  among the defects to remove; WAY-27 and D-362 want what a reader needs of such a source to stand in the entry. The reasons proper (a sentence
  like the row of a rule, D-288; the energy named as the reason names it, D-310) already stand in the same sentence, so the authority adds
  nothing a reader can check.
- Fix: drop "that the scope of the project fixed" (for instance "is the form of the example the binding sentence gives, „Wytwórz — ognisko
  (6 patyków)”").

### I4 — D-363 (slice 20): the added principle turns the accepted cost into a contradiction and misstates what the note says

- Entry D-363 at `9d6316c3`, *Rationale*: "Accepted with it: reading a program, the player sees no prices without opening the panel, which is
  poorer in that row than the old loop, from whose solutions the game departs only for the better; the same rule shows another price on two
  screens; …". The clause "from whose solutions the game departs only for the better" is new in this range.
- Note, question 1: answer "Przyjęty koszt: czytając program, gracz nie widzi cen bez otwarcia panelu — w tym wierszu ubożej niż stary Loop.";
  Source: "Pokazane jako materiał, nie rozstrzygnięcie: definicja, *Inputs and constraints*, wiersz 70: „… odchodzi od nich tylko wtedy, gdy
  wychodzi lepiej, nigdy gorzej.” — ocenę, czy wiersz bez ceny to „gorzej”, zostawiono człowiekowi." The human then took the recommended way
  ("reszta zgodnie z rekomendacją").
- What is wrong: the entry now says in one breath that the departure is poorer and that the game departs only for the better, so a reader
  either sees a contradiction or concludes the decision breaks the principle; the note says something else — the principle was put before the
  owner as material, the judgement whether a row without a price is "worse" was left to him, and he took the panel-only way. The reason the note
  carries (the owner weighed this loss against the principle and accepted it) is lost, and an invented framing stands in its place.
- Fix: state what the note gives, e.g. "… poorer in that row than the old loop; whether that is a departure for the worse was put to the owner
  beside the rule that the game departs from loop's solutions only for the better, and he took this way."

## Minor

- **M1 — D-324 (slice 18), a reason lost.** Note, question 7, answer: "„Wznów” (z nagłówka albo z pasa odkrycia) i „Restart” zamykają pytanie
  jak „Wróć” i robią swoje — tak samo pas odkrycia znika przy „Wznów” (D-122)." The entry's *Rationale* gives no reason why „Wznów” and „Restart”
  close the question; the parallel with the band of a discovery (D-122) is not carried. Add it beside "the question goes when it would ask about
  changes that are no longer there".
- **M2 — D-325 (slice 18), the veteran's report is named twice and reads against the decision.** *Rationale*: "a report from the point of view of a
  veteran of idle games found that the player does not know how much game lies ahead …" and, three sentences later, "The review from the point of
  view of a veteran of idle games, of 2026-10-31, found no goal longer than the current map and judged a catalogue of maps with empty places and
  a card of demands the one cheap answer to it". The second sentence presents empty places as the recommended answer while *Rejected* rejects
  them; the sentence in between explains the deferral, but the order makes it hard to read. Merge the two mentions and say that only the card of
  demands was taken from that proposal, the empty places waiting for content.
- **M3 — D-326 (slice 18), the conditions of a measurement are partial.** Entry: "Measured on 2026-10-31 in a simulation of the earning loop,
  before it was merged: after 168 hours the chest held 0 items with an empty list and 58 with a full one." Source (veteran's report, "Skąd liczby"):
  "Programy napisałem sam i stroiłem je przeszukiwaniem progów. Wynik mówi więc, ile osiąga kompetentny gracz" and the map is Las. The 58 depends
  on the program; add "on Las, with programs tuned by the person measuring" so the number is not read as a general bound.
- **M4 — D-338 (slice 19), a cost written as still to do that D-339 has done.** *Rationale*: "Accepted with it: texts to write for the events,
  events of the changes of the program to add, and a place for the chronicle to be settled (D-339)." Source (designer, proposal 8, cost): "rozstrzygnąć,
  czy kronika żyje w pamięci strony, czy w zapisie". The settled place is a cost of the time of the choice; write it as such ("… and its place had to be
  settled, which D-339 did") or drop it.
- **M5 — D-363 (slice 20), a premise misdated.** *Rationale*: "When this was decided an agent playing in the role of a new player had the four verbs …
  side by side with no price anywhere: … with 3 sticks in the backpack both rules of the campfire stayed at „0×” and the game did not say what was
  missing." The reconnaissance is of 2026-10-31; when D-363 was decided (2026-11-11) the reason at the rule already said what was missing — the note
  cites it ("objaśnia w wierszu powód, „brakuje 4 × patyk” (D-310)") and the entry says so two sentences later. Write "In a reconnaissance before
  this decision …".
- **M6 — D-363 (slice 20), "the narrow column of the program" may be untrue at the head (kept text; the executor's question).** *Rationale*: "the row of
  a rule keeps the narrow column of the program"; *Rejected*: "a longer row, which in the narrow column of the program more often wraps to two lines".
  The note gives "kolumnie programu o szerokości 208–304 px", while D-349 at the head gives the program 526 px at 1280 px and 622 px at 1344 px.
  I agree with not carrying 208–304 px; the word "narrow" deserves a check against the current layout (a question for the orchestrator, not a fix I can
  source).

## The questions the executors and the orchestrator carried

Slice 18:
- Onward passage of the veteran's report carried in `ce206f62` into D-323, D-325, D-326, D-327, D-330 — right; every added clause traced to the report
  (proposals 5 and 6, section 1) or the designer's A.2 and A.4 rule 5. Not carrying "Pierwsze domknięcie płaci łupem tylko raz" and "Las — głębiej bez
  skrzynki dał 0 z 300" — right: the first is a consequence for the status quo with no stated conditions and D-189 words the payout otherwise, the second is
  the evidence of another proposal; the core reason (a week of an empty list brings nothing) is carried. See M3 for the measurement that was carried.
- The report's "D13" for the empty-places rule — right to leave it out; the entry describes the old game's catalogue in words. The project concept's D13
  is another rule, so naming it would have been wrong.
- `rozpoznanie_frajda`, `rozpoznanie_material`, `zlecenia_profili`, `reguly_awarii_i_logow_loop2`, `technologia_zapis_dzialania_gry` not opened for
  slice 18 — acceptable: no *Origin* of D-323–D-332 names them. I opened `reguly_awarii_i_logow_loop2.md` (cause 5, question 3): it holds only the
  deferral, no reason for D-323 beyond the words the napis note already quotes.
- D-323's "A game built after the error would pass time and save a change that the error came before, so none is built" — keep: it was in the old entry,
  no note gives it, and it follows from the note's answer to question 1 (a save after the error sends the state from before it, read without the clock),
  which a newly built game with D-247's catch-up would break. It contradicts nothing.

Slice 19:
- D-349, way A: right to drop "a program too narrow to write in", which the note's figures (510/606 px against 526/622 px) contradict; "hardly less" is
  fair arithmetic and the owner's verdict and proposal are the note's. Keep as is.
- D-339 "never measured" against the research — see I1; I hold it must change.
- D-348: right to add only the premise; the two carried questions have no answers in the note and the existing text is the cycle's own.
- D-347 *Rejected* gaining "the save of the game read as a document" and "the map run counted again in Node": right. The research weighed both as options
  (9 and 10), the limits written are its own, and they were not taken; no verdict is invented. The server's output and the server's own route were rightly
  not carried: the second is now D-356's chosen way, and D-347 is narrowed to the browser.
- Old game's code files for the chronicle and „Teraz” not in the snapshot: no question; their content is quoted inside the notes.

Slice 20:
- D-362 untouched — confirmed: no hunk of the range touches D-362.
- D-355, Grafana Cloud "prawdopodobny konflikt z D-347" left out — right: D-347 is narrowed to the browser and the report itself says the recommendation does
  not touch D-347.
- D-356, "ani porównaniem zainstalowanych kopii" left out — right, the clause would be false at the head (see Declined to judge for the rest of that risk).
- D-363, "208–304 px" not carried — right; see M6.
- Kept clauses no note supports (D-351, D-353, D-355, D-356 `LIMITED`) — keep; none contradicts a note or a binding sentence. D-355's "except two things
  nobody has checked" is more cautious than the note's "bez zależności od niczego niesprawdzonego" and the note's own *Context* ("wersji demona na serwerze
  nikt nie odczytał") supports the caution.
- Two technology reports read from the main checkout's `.runs/technology/`, outside the snapshot: acceptable, the note's *Source* names them and they are
  neither the vault nor the old Loop. I checked the two added clauses against them: D-355's "only through a filter that is an agreement" stands in
  `dokad-trafia-zapis-gry-i-jak-dlugo-zyje.md:160`, `:187`, `:412`; D-356's "narrows nothing on the side of the server and costs no money" stands in
  `skad-wlasciciel-dowiaduje-sie-ze-gra-padla.md:410`.

Orchestrator: `0822d4b2` (D-311–D-316) lies in the range and was not judged.

## Declined to judge

- D-356, risks "a watcher running as root on a server shared with other projects is covered by no invariant test" and "the test gate would refuse a new
  workflow file": kept text of the time of the decision, possibly outdated at the head (`failure-watcher-message` exists, a workflow file is in place);
  outside this task, which moves reasoning and does not refresh risks.
- D-311–D-316, changed by `0822d4b2` in the range: accepted by another review, outside this dispatch.
- The 18 lines of `foundations/decisions.md` at `9d6316c3` that still name a note (D-27 … D-216, D-368–D-371): outside D-323–D-363, other slices.

## Decisions compared against a note passage

35 of 35 decisions whose old *Origin* named a note: D-323–D-332 (10), D-334–D-349 (16), D-351–D-356, D-360, D-361, D-363 (9). Each compared with the
passages its old *Origin* named (question, answer, ways not chosen, source line, settlement row) and the onward passages they point to. D-357, D-358,
D-359 had *Origin* `none` before the range and have no hunk in it; nothing to compare. D-333 and D-350 lie between the slices, *Origin* `none`, untouched.

## Checks run

- `git rev-parse HEAD` in the worktree → `9d6316c3…` (exit 0); `git status --porcelain` → ` M foundations/decisions.md` (another agent's edit; hence all
  reads from the commit).
- `git log --oneline 769f5e24..9d6316c3` (exit 0): five commits, listed above.
- `git diff 769f5e24..9d6316c3 -- foundations/decisions.md` saved and read hunk by hunk (exit 0): in D-323–D-363 every changed line is an *Origin*,
  *Rationale* or *Rejected* line or a continuation of one; no hunk in D-357–D-359 or D-362.
- `foundation_check.py` on the reviewed commit: a scratch clone (`git clone --shared --no-checkout` of the worktree's repository, `git checkout 9d6316c3`,
  `.the-way` filled by `git -C .the-way archive e9a0f926…`, the gitlink at `9d6316c3`), then `python -B .the-way/elements/common/foundation_check.py .` →
  `0 errors`, exit 0. Scratch: `the session scratchpad\review1820\`.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' 9d6316c3 -- foundations/decisions.md`
  filtered to lines 7759–8801 → no line (exit 0 of the pipe); the whole file holds 18 such lines, all outside the range.
- Every `- **Origin:**` line in lines 7759–8801 at `9d6316c3` → 41 lines, all `none`; 41 *Rationale* and 41 *Rejected* lines.
- Manual: added lines of the range searched for "the task", "definition", "MVP", "the change", "the concept", "scope of the project", "the project", "plan",
  question numbers, `.md`, `Notes/`, "vault", disk paths, URLs, "@" — one hit that is a defect (I3); "a task" in D-323 is kept text describing the coding
  guidelines' rule, not an authority. No secret, host address, account or e-mail address added.
- Manual: D-132, D-189, D-255 and D-311 read at `9d6316c3` to check claims the added text makes about them (completion title in the end-of-run window;
  loot payout; the agent's data; "03:32" rejected) — all hold.

Not run: `npm test` — the range changes only `foundations/decisions.md`, and the full suite is the cycle's own run.

## Reaches beyond the dispatch

- `the main checkout of the repository: .runs\technology\dokad-trafia-zapis-gry-i-jak-dlugo-zyje.md` and `…\skad-wlasciciel-dowiaduje-sie-ze-gra-padla.md` (grep hits
  only) — to verify the clauses slice 20 added from them, outside the snapshot.
- `foundations/decisions.md` at `9d6316c3`: D-132, D-189, D-255, D-311 (by search) — to check claims of added text.
- Snapshot `reguly_awarii_i_logow_loop2.md` (cause 5, question 3) — onward passage of the napis note, for D-323.

## Unread material

- `.the-way/elements/common/rules.md`, `.the-way/elements/decisions/examples.md` and the `the-way-record-decision` skill files: not read; the template and
  WAY-27 were read whole.
- `definicja_mvp2_loop2.md`: read lines 60–76, 142–158, 396–455, 1131–1143 (and searches); the rest not read.
- `rozpoznanie_weteran.md`: lines 1–40 and 100–180 (header, "Skąd liczby", sections 1's goal, empty stretches and losses, proposals 1–6); the rest not read.
- `rozpoznanie_projektant.md`: A.1–A.4 and proposal 8 only. `rozpoznanie_nowy_gracz.md`: moments 12–19 and barriers 4–5 only. `zakres_mvp2_loop2.md`:
  searches for W5, W6, P8, NG7, „Kierunek” only.
- `technologia_zapis_dzialania_gry.md`, `napis_o_awarii_loop2.md`, `pytanie_przy_zakoncz_loop2.md`, `karty_i_katalog_map_loop2.md`, `teraz_i_potem_loop2.md`
  (from line 14), `kronika_z_filtrami_loop2.md`, `zadanie_proporcje_sceny_i_programu_loop2.md`, `koszty_i_stan_ogniska_loop2.md` (from line 14): whole.
  `zadanie_loop2_test_granic_czesci.md`: Need, To do, questions 1–3, settlements. `zadanie_loop2_porzadki_z_uwag_pr.md`: the two named questions and the
  settlements. `zadanie_skad_wiem_o_awarii_loop2.md`: lines 15–199. `zadanie_odtwarzanie_bazy_z_kopii_loop2.md`: questions 2–3 and the settlements.
- `koncepcja_projektowa.md`, `rozpoznanie_frajda.md`, `rozpoznanie_material.md`, `zlecenia_profili.md`, the other `technologia_*` reports: not opened; no old
  *Origin* of the range names them and no named passage points on to them for a reason the entries need.
- The two technology reports in the main checkout: searched, not read whole.

## Searches not found or unclear

- The width "208–304 px" of the program column that the D-363 note gives on 2026-11-11 against D-349's 526/622 px: unclear which layout the note measured (M6).
