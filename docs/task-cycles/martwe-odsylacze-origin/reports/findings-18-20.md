# Findings of the review of slices 18–20 (blocking, in the reviewer's words)

Source: `reports/review-18-20-report.md`, first line `FAIL 9d6316c3`. Reviewed range `769f5e24..9d6316c3`.

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

