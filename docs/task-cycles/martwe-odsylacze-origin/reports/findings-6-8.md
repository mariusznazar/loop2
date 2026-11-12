# Findings of the review of slices 6–8 (blocking, in the reviewer's words)

Source: `reports/review-6-8-report.md`, first line `FAIL 7e3aa5e8`. Reviewed range `1879a6d9..7e3aa5e8`.

## Important

### I-1 — D-84 and D-85: the HTTP test helper is described as it was, not as it is

- **Entries (7e3aa5e8):** D-84 *Rationale*: "The rules fix no concrete limits and do not order the
  existing helpers rebuilt in the work of adopting the guidelines: the HTTP helper limits idleness,
  not the whole request, and the wait for the server to start has no limit, so the helper takes these
  rules at its next change." D-85 *Rationale*: "the HTTP helper limits idleness, not the whole
  operation, and the wait for listening has no limit".
- **Note** (`przewodnik_testow_loop2.md`, Q7, 2026-10-25): „pomocnik HTTP w `tests/http.test.mjs` ma
  limit bezczynności, nie całego żądania (`:67`), a czekanie na start serwera nie ma limitu (`:29`)”;
  Q5i: „pomocnik HTTP ma limit bezczynności, nie całej operacji, a oczekiwanie na listening nie ma
  limitu”.
- **What is wrong:** both are false at the head. `git show 7e3aa5e8:tests/http.test.mjs`: `listen()`
  sets `const deadline = setTimeout(() => reject(new Error("HTTP readiness deadline exceeded")), 5000)`
  on the wait for `listening`, and `send()` carries the comment "An absolute deadline, not an idle
  timeout, bounds the whole exchange." with a 5000 ms `setTimeout` that destroys the request. The
  helper has already taken the rules (the "next change" D-84 speaks of has happened). An agent reading
  D-84 or D-85 is told the helper is still out of line and may "fix" it, or treat it as a model of what
  the rules do not require.
- **Fix:** say it as the premise when the rules were adopted, in the past ("when these rules were
  adopted, the HTTP helper limited only idleness and its wait for the start had no limit, so the rules
  ordered no rebuild and left it to the helper's next change"), or drop the clause; in D-85 the same,
  or drop "the HTTP helper limits idleness … has no limit" and keep "the selection does not approve the
  whole file of that case or its helpers".

### I-2 — D-79: "the only service of another party" is false since D-163 and D-235

- **Entry:** "The npm registry in the dependency audit is the only service of another party that the
  tested code of loop2 talks to, so the template's row on code talking to such a service meets it only
  there".
- **Note** (`przewodnik_testow_loop2.md`, Q4n, 2026-10-25): „jedyną cudzą usługą, z którą rozmawia
  testowany kod loop2, jest rejestr npm w audycie zależności”.
- **What is wrong:** the log now holds two more departures from the same template row: D-163 "How is
  the code that talks to Mikrus Outsider's SMTP service tested?" and D-235 "How is the code that talks
  to Mikrus Strych and `pusher` tested?", both `narrows D-73`, both named in D-73's binding sentence
  next to D-79. The added sentence contradicts them (check 3 of the handoff): a reader learns that the
  template row "meets [loop2] only there".
- **Fix:** "When this was decided, the npm registry in the dependency audit was the only service of
  another party the tested code talked to; the tests of the audit substitute its result, while the
  gate runs the real audit … and that run is taken as the check of the format." — or drop "the only …
  only there" and keep the rest. (Whether D-73's list should say more is not this task's.)

### I-3 — D-96: a rejected way's cost states as today's fact a state the game now has

- **Entry *Rejected*:** "the headquarters after signing in with a way back to a waiting manual map run
  — a new state of the screen, the headquarters visible while a map run waits, which the code does not
  know today, and a new button, and with them a new question of what the player may do in Siedziba
  while the map run waits, such as setting up characters or sending another".
- **Note** (`zapis_stanu_na_serwerze_loop2.md`, question 20, Not chosen C, 2026-10-29): „nowy stan
  ekranu (siedziba widoczna przy trwającym przejściu, czego kod dziś nie zna) i nowy przycisk, a z nimi
  nowe pytanie, co gracz może robić w siedzibie, gdy przejście czeka”.
- **What is wrong:** all three costs have since been paid by other decisions. D-96's own binding
  sentence lets "a reload at another address stay on the screen that address leads to" while a manual
  map run is waiting, and its own *Rationale* says "the map run waits safely in its pause and „Wróć do
  przejścia” leads back to it"; D-280 puts „Wróć do przejścia · {mapa} · minuta {m}” in the menu bar of
  Siedziba, Postać and Programy; D-287 is the answer to "What do Siedziba, the screen Postać and the
  screen Mapy allow, and say, while a manual map run waits or has ended?". The entry now contradicts
  itself (check 3), and anyone reconsidering this rejected way is told it costs a state, a button and a
  question that the game already has.
- **Fix:** keep the way with what still holds — the player would land elsewhere than the map run that
  waits for him — or put the note's cost in the past ("when it was weighed, this needed a state of the
  screen the code did not know, a new button and a rule for Siedziba while a map run waits").

### I-4 — D-144: "so the tests of this game may expect them" contradicts D-82 as this change rewrites it

- **Entry *Rationale*:** "The numbers of the actions and of the ranks of their branches are those of
  the predecessor game, loop, so the tests of this game may expect them."
- **Note** (`wprawa_i_drzewa_loop2.md`, Q8): „liczby z listy w punkcie 4 *To do* i arytmetyka z testów
  loop są wymaganiem; testy loop2 mogą ich oczekiwać.” The list in To do 4 gives the combat branches'
  numbers: „Mocniejszy cios — +2 obrażeń ciosu patykiem — 1, 1, 1”, „Cięższy kop — +1 obrażeń kopnięcia
  — 1, 1, 1”, „Zwinny odskok — odskok ujmuje z ciosu o 1 więcej — 1, 1”.
- **What is wrong:** D-82 on this branch reads "The expectation of a test comes from the loop2
  foundation … a test comment names as the source of an expectation no document outside the
  foundation", and its *Rationale* accepts that "a requirement that only a document held has to be
  entered into the foundation before a test may expect it". The binding sentence of D-144 holds the
  base numbers (6, 3, 5, the wolf's 24 and 7) but not what a rank adds; no entry of the log holds the
  branch numbers (search for „Mocniejszy”, „Cięższy”, „Zwinny” in the log: no hit; they stand only in
  `src/browser/sim/data/skills.ts`). The added clause grounds a test's expectation in "being loop's
  number", the very source D-82 removes, and does it for numbers the foundation does not hold — the
  failure To do 5 and D-82 exist to end (WAY-263: restated more broadly than the entry the change
  writes). The "accepted branch data" the old *Origin* named are lost with it; only "with two ranks of
  the dodge branch the dodge takes the whole strike of the wolf" survives as a trace of them.
- **Fix:** drop "so the tests of this game may expect them" (D-82 says where an expectation comes
  from), keep "the numbers … are those of the predecessor game, loop, taken as the requirement", and,
  if any test expects what a rank adds, enter those numbers into the foundation (D-144's binding
  sentence or the branch decisions) in the step that handles To do 5.

