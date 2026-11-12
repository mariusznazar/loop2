FAIL 7e3aa5e8

# Review of slices 6–8 — range `1879a6d9..7e3aa5e8`

Reviewed: commits `c0e12bc5` (slice 6, D-73 to D-89), `e08574f9` (slice 7, D-93 to D-126), `7e3aa5e8`
(slice 8, D-128 to D-149). Every entry was read from `git show 1879a6d9:foundations/decisions.md` and
`git show 7e3aa5e8:foundations/decisions.md` (copies in my scratch directory), never from the working
tree; checks that need files ran on a clone of the worktree checked out at `7e3aa5e8`.

Blocking: 4 (Important, all within the task). Minor: 12. Out of scope: 0 findings; 4 lines of
*Declined to judge*.

The common thread of the four Important findings is the defect the orchestrator asked about: a note's
statement about the state of the product on the day of the note, written into the log as a
present-tense fact, which the code or the later foundation now contradicts — or, in I-4, an added
clause that contradicts D-82 as this very change rewrites it.

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

## Minor

### M-1 — D-80: the premise is written as a present fact

"The decision rests on the intended balance having no settled source and no settled place where it is
written." Note Q3 Source: on the question about the source of the intended balance and where it is
written, „nie wiem, nie myślałem o tym” (2026-10-25). Since then D-82 (this branch) settles where an
agreed requirement stands — the foundation — so "no settled place" is no longer true, and the
sentence invites reading D-80 as lapsing once a balance is agreed. Fix: "When it was decided, the
intended balance had no settled source; an agreed expectation stands in the foundation (D-82)." The
rest of the added text ("The price is named: … no test says that Las is too easy or too hard") is
faithful; "The price is named" tells how the decision was reached and can read "Accepted with it:".

### M-2 — D-83: half of the added fact is stale

"The command that runs the Node tests names some test files one by one and otherwise selects only some
of the test directories". At the head `scripts/test.py` has
`NODE_TESTS = ["tests/*.test.mjs", "tests/sim/*.test.mjs", "tests/view/*.test.mjs"]` — patterns, no
file named one by one (the note, Q5r: „`package.json:15` wymienia `http` i `startup` z nazwy”, was true
then). The reason itself still holds (a `*.test.mjs` under `tests/deploy/` would not run). Fix: "The
command that runs the Node tests selects only some of the test directories, so a file placed elsewhere
would silently not run."

### M-3 — D-85: "the task"

*Rejected:* "a new exemplar would show the whole set of rules in one place, but it adds test work and
more tests to the task". Note Q5h–Q5j Source: „poszerzyłby zadanie o kolejne testy”. "the task" points
at a task the reader cannot see (handoff check 4). Fix: "… but it adds test work and more tests to
adopting the guidelines" (the wording D-74 and D-75 already use). Also in D-85: "Existing cases were
chosen after comparing the existing tests and their helpers" tells how the decision was reached; "the
selection takes existing cases, without rewriting tests" says the same as a reason.

### M-4 — D-76: process costs in the touched *Rejected* point at a task's answer and a plan

"every change of a file of the boundary ending the exception — a refusal test in tasks that change no
principle, against the human's answer that they bring no test files, and a change of the project's
plan". Note (`logowanie_w_react_loop2.md`, Pytanie 7, Not chosen): „test przy zadaniu 6 i ewentualnie
przy zadaniu 2, zmiana odpowiedzi człowieka „pliki testów żadne”, zmiana planu”. The clause was in the
old entry, but the slice edited this very sentence; "the human's answer" and "the project's plan" are
pointers to documents the reader cannot open, and the cost is wholly the process (as M-5 of the review
of slices 3–5). Keep "a refusal test in tasks that change no principle of the boundary"; drop the rest.

### M-5 — D-89: the reasoning of the pass-through category stands where its guideline does not point

Executor's question (slice 6, D-89). *Rationale*: "Besides the categories the binding sentence names, a
category deliberately left without a test is code that only passes or copies data and decides nothing:
it has no separate permanent test, and the return is to a test once a rule, a transformation or an
error appears in it; testing every such fragment would add upkeep … the cost is that nothing gives a
separate signal about the fragment." Note Q10a carries exactly this. Carrying it is right: the human cut
the row „kod tylko przekazujący dane” from the settlements, so no other entry holds this reasoning, and
the old *Origin* of D-89 named Q10a. But `guidelines/testing.md` § Not tested on purpose cites the
category as „(D-73)”, so a reader who follows the guideline finds nothing in D-73. Fix: move the
paragraph to D-73's *Rationale* (or name D-89 in the guideline line — a guideline change, outside these
slices). The sentence also states the rule itself in prose ("has no separate permanent test, and the
return is …"); as the reasoning of a guideline rule it can read "the guidelines leave code that only
passes or copies data without a separate test, returning … because …".

### M-6 — D-120: the editor's offer of a branch action is restated without D-196

Executor's question (slice 7, D-120). *Rationale*: "the program editor offers it in that character's map
run and outside a map run does not … Accepted with it: … a rule with such an action can be added only in
the map run of the character that bought the branch; added in the copy it resets the streak …". It
agrees with `wprawa_i_drzewa_loop2.md` Q3 (A, weak point, B, C) and with D-196 "Which branch actions
does the program editor offer outside a map run?", which binds exactly this and whose *Origin* names
the same Q3. The executor's worry that a later reader "may want it in D-119's sentence" is answered:
it is already a binding sentence, of D-196. Fix: name D-196 where the *Rationale* states the editor's
offer, so the prose is read as the reason and D-196 as the rule. The *Rejected* "outside a map run the
editor offering such an action when any character of the team has bought the branch" stands with no
cost, which matches the note (C has none) — fine.

### M-7 — D-122 and D-133: the cost of the way p3 is given to p2 as well

Executor's question (slice 7, D-122; the same text in D-133). Entries: "„ (pauza)” after the bar of the
solving condition instead of after the clock, and no „ (pauza)” at all with the pause shown by „Wznów”
alone — for these two ways no cost was kept beyond the loss of the textual mark of the pause the game
has today." Note (`teraz_i_potem_loop2.md`, Pytanie 5, Not chosen): p2 „rozmowa nie zapisała kosztu tej
drogi”; p3 „rozmowa nie zapisała kosztu tej drogi poza tym, że znika dzisiejszy tekstowy znak pauzy”.
The loss of the textual mark belongs to p3 only — p2 keeps a textual mark, after the bar. Carrying both
ways is right (they are ways the source keeps, WAY-134), but "no cost was kept" tells how the decision
was reached. Fix: "… after the bar of the solving condition instead of after the clock; no „ (pauza)”
at all, the pause shown by „Wznów” alone — the textual mark of the pause would be gone." The same pair
need not stand twice; it belongs to D-122, whose binding sentence places the mark.

### M-8 — D-124: the number of the disabled period is lost, and the notes agree on it

Executor's question (slice 7, D-124). Entry: "Accepted with it: through the first game minutes of a new
game the player sees a button that cannot be used." Notes: `odkrywanie_loop2.md` question 4 „przez
pierwsze 84 sekundy”, `edytor_programu_loop2.md` Pytanie 12 „przez 84 minuty gry”. They do not disagree:
84 game minutes pass in 84 real seconds at 1×, the only pace when the first was written
(`rozwiazanie_lasu_loop2.md` question 3 later added the others). The first chill comes in game minute 84
(`odkrywanie_loop2.md` question 11: „w 84. minucie mag się wychładza”), which D-124's *Verification*
already uses. Fix: "through the first 84 game minutes of a new game in Las, 84 seconds at 1×".

### M-9 — D-136: the extension of the chain of maps is lost

*Origin* named `koncepcja_projektowa.md` D17; the added text carries its first half ("Las teaches
keeping the loop going, Las — głębiej adds combat, and a later map is to teach another mechanic …") but
not the line of the same passage: „*Rozszerzona przez D27 i D28:* mapa po rozwiązaniu może być
miejscem pracy, a łańcuch ma odnogi, nie jedną linię.” For "what opens the next one" that the chain
branches rather than runs in one line is the relevant half. Fix: add "a solved map can be a place of
work, and the chain of maps branches rather than running in one line".

### M-10 — D-138: the definition's condition of revisiting is lost

Executor reported "nothing to add". The projected entry it came from (`definicja_mvp_loop2.md`, "(new) —
How is a player's login kept between requests?") has "**Review when:** the account server needs multiple
instances with a shared session service or SQLite session checks become a measured bottleneck · check
by: 2027-04-04"; the entry carries none of it. It is the premise of the choice (one server, SQLite reads
not a measured cost). Fix: one sentence in *Rationale*: "The choice holds while one account server serves
the game and the session checks in SQLite are no measured bottleneck." (The date of a check has no field
in the template and need not move.) The other definition entries the range drew on have
"Review when: none".

### M-11 — D-140 and D-118: facts of the predecessor game and of the concept read as facts of loop2

Executor's question (slice 8, D-140). *Rejected*: "the mage's Rozbłysk, which gives the character the
first strike even when it was attacked, made a stronger first Iskra instead — it skirted the problem for
the mage and left it whole to the hunter." Note (`koncepcja_projektowa.md`, D53): „Rozbłysk maga oddaje
postaci pierwszy cios także wtedy, gdy to ją napadnięto. … *Odrzucone:* … Rozbłysk jako mocniejsza
pierwsza Iskra — omijał problem u maga i zostawiał go w całości myśliwemu.” Rozbłysk and Iskra are
nowhere in loop2 (no entry, no glossary term, no hit in `src/`), so "which gives" states a spell the game
does not have. The way is real reasoning for "the attacker strikes first" and should stay, in loop2's
terms: "a first-strike branch of the mage, which loop has, made a stronger first attack spell instead —
it would skirt the problem for the mage and leave it whole for a hunter". In the same entry two
measurements of the predecessor game read as loop2's: "a minute of simulation costing eleven times more
with a long chronicle than with an empty one" and "Accepted with it: the creature striking first made
every map with an attack harder, a deeper forest is solved markedly less often" (D53: „głębszy las
poddaje się teraz wyraźnie rzadziej”) — the template lets a measurement stand only with what was
measured and under which conditions; add "measured in the predecessor game, loop". D-118 has the same
kind of slip: "a conflict over the resource of time — putting out a fire saves a forest but eats the time
that would be missing for food" (D13: „gaszenie pożaru ratuje las”) — loop2 has no forest fire; say it
as the concept's example ("such as a forest fire, which the game does not have today").

### M-12 — D-147: a veiled pointer to the definition, and the size estimate lost

*Rejected*: "… a limit on the entries makes untrue the sentence on the chronicle, …". Note
(`kronika_z_filtrami_loop2.md`, Pytanie 1, B1): „limit wpisów, przy którym najstarsze znikają, czyni
nieprawdziwym zdanie o kronice z wiersza 286 definicji”. "the sentence on the chronicle" points at a line
of the definition the reader cannot see (the same defect as M-4 of the review of slices 3–5, in D-04).
Fix: "a limit on the entries, the oldest dropped — the chronicle would no longer hold what happened in
the map run (D-338)". The same B carries „szacunek agenta: 50–60 bajtów na wpis, kilkaset wpisów w
długim przejściu”, which the entry drops while keeping "the size of a chronicle is unmeasured"; add it as
the estimate it is, or leave it — a small loss.

## Executors' and the orchestrator's questions — held

1. **Slice 6, D-73 / D-77:** right. Departure (4) is all of Q4 that D-77 still states; Q5m's reasoning for
   "full run only" belongs to a choice D-77 has since replaced, and D-77's own *Rationale* carries the
   cost that remains ("an operation without a local limit may hang"). Nothing to carry into D-73.
2. **Slice 6, D-88:** right. The carried question holds no answer; the added "take a ready-made
   imitation … the exclusion covers that imitation" follows from it and from the binding sentence, and
   D-264 carries jsdom.
3. **Slice 6, D-89, Q10a:** carrying it is right; its place is a Minor matter — see M-5.
4. **Slice 7, D-122, ways with no cost:** carry them; word them as M-7 gives.
5. **Slice 7, D-124, 84 seconds vs 84 game minutes:** the notes agree — see M-8.
6. **Slice 7, D-120:** consistent with the binding sentences; D-196 binds it — see M-6.
7. **Slice 7, `task.md` and `plan.md` not opened:** acceptable; the handoff carried the passages word for
   word, as the slice's *Read* gives them.
8. **Slice 8, old *Rejected* ways with no basis in the named passages (D-129, D-137, D-139, D-141, and
   D-128, D-130, D-144, D-147):** leave them — the handoff keeps a clause the old entry held and no note
   repeats. One correction: D-130's "a pace control standing apart from „Pauza”, or one built from a
   control of its own" does have a basis, `definicja_mvp2_loop2.md`, D-130 *Rejected*, word for word.
   None of them looks wrong against the notes read. Whether they meet WAY-134 is under *Declined to judge*.
9. **Slice 8, costs of a past state or a later task not carried:** right for D-134 (a solved map lost at a
   refresh — saved game states exist now), D-137 (a file kind whose pattern the guidelines deferred — a
   guideline matter) and the superseded placements of „Teraz” in the header (D-133, D-147). Wrong reason
   but right outcome for D-147's „do zadania 16 po śmierci w walce akapit przeczytasz tylko w kronice”:
   the cost still holds today (the end of a map run still has no place of its own), and D-311 carries it
   ("while the end of the map run does not carry it, after a death in combat the paragraph read only in
   the chronicle"), so it is not lost. D-132's conditional wording ("once the end of a map run has a place
   of its own") is right for the same reason.
10. **Slice 8, D-140, Rozbłysk:** keep the way, in loop2's terms — see M-11.
11. **Slice 8, status row vs header:** right. Only the reasoning that still holds for the header was
    carried (the pause belongs to the whole map run, so its mark is not by the action).
12. **Slice 8, D-144, "the accepted branch data":** the reading is right — they are the numbers of To do
    4 (combat branches: +2, +1, +1 per rank). The executor did not read To do 4; the numbers matter for
    I-4.
13. **Orchestrator — past state as present fact:** found four times — I-1, I-2, I-3 (Important) and M-1,
    M-2 (Minor); the check was run on every added present-tense statement about code, data, tests or the
    game's screens that I could test at the head (tests/http.test.mjs, scripts/test.py, the glossary,
    `scripts/static-files.mjs` and the kitchen-sink build test for D-76, D-163/D-235, D-196, D-230, D-280,
    D-287, D-311).
14. **Orchestrator — accepted costs of the chosen option left out while rejected options keep theirs:**
    not found in this range. Every chosen way's named cost or weak point in the passages read is carried,
    except where it is process only (e.g. "one more sentence in D-93", "an exception in D-102 and a change
    of its invariant") or lapsed (D-134, D-137 above).
15. **Orchestrator — "the MVP", "the definition", "the task":** no "MVP" or "definition" in any added
    text; "the task" once — M-3.

## Decisions compared against a note passage

All 50 decisions of the range whose old *Origin* named a note, each against every passage it named, read
in `the private snapshot of the notes (not committed)/vault/`: D-73, D-74, D-75, D-76, D-78, D-79, D-80, D-81,
D-83, D-84, D-85, D-86, D-87, D-88, D-89 (slice 6, 15); D-93, D-96, D-97, D-98, D-102, D-104, D-105, D-109,
D-112, D-118, D-119, D-120, D-121, D-122, D-123, D-124, D-125, D-126 (slice 7, 18); D-128, D-129, D-130,
D-131, D-132, D-133, D-134, D-135, D-136, D-137, D-138, D-139, D-140, D-141, D-144, D-147, D-149 (slice 8,
17). The other decisions of the three ranges (D-94, D-95, D-99–D-101, D-103, D-106–D-108, D-110, D-111,
D-113–D-117, D-142, D-143, D-145, D-146, D-148) had *Origin* `none` at the base and are unchanged. D-77 and
D-82 are unchanged, as the plan gives.

No invented reason was found: every added clause traces to a named passage or to the old entry.
Entries with nothing found beyond the findings above: D-73, D-74, D-75, D-78, D-81, D-86, D-87, D-88, D-93,
D-97, D-98, D-102, D-104, D-105, D-109, D-112, D-119, D-121, D-123, D-125, D-126, D-128, D-129, D-130, D-131,
D-132, D-134, D-135, D-137, D-139, D-141, D-149. The "nothing to add" claims of the executors (D-98, D-102,
D-105, D-109, D-123 to D-126, D-134, D-135, D-139, D-149) hold, except D-124 (M-8) and D-138 (M-10).
For D-105, the reasoning of `reset_hasla_loop2.md` questions 2 and 3 stands in D-222 and D-223 (checked),
whose *Origin* lines still name the note — a later slice's.

No pointer to a note, task, question number or place on a disk, and no secret, host address, account,
e-mail address or personal fact entered a decision of the range ("the owner" in D-137 names a role;
Mikrus Outsider and Strych appear only in entries outside the range). Every *Origin* of the 50 reads
`none`; *Rationale* and *Rejected* keep the template's form; no list of rejected ways is written as a
decision of the process.

## Declined to judge

- The old *Rejected* clauses that no named note passage gives (D-128, D-129, D-137, D-139, D-141, D-144,
  D-147), against WAY-134 — this task moves reasoning and changes no meaning; a separate pass. Out of scope.
- `definicja_mvp2_loop2.md` projects D-135 the other way (its *Rationale*: "only the longest streak tells
  how near the map run came"; *Rejected*: "the game showing only the streak going on"), while D-135 and
  D-133 at the head say the game does not show it. D-135's old *Origin* did not name that note, so it is
  not this range's reasoning; whether that projected change is still due is the plan's. Out of scope.
- D-84's binding sentence "The HTTP helper in `tests/http.test.mjs` takes these waiting and cleanup rules
  when that helper changes" is itself spent (I-1); the binding sentences are not this task's to change.
  Out of scope.
- Whether D-73's list of departures should say more about D-163 and D-235 beyond naming them (I-2). Out of
  scope.

## Checks run

| Check | Command / method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` in the worktree at the start | `7e3aa5e8…`; all later file checks on a clone |
| Range | `git log --oneline 1879a6d9..7e3aa5e8`; `git diff --stat 1879a6d9..7e3aa5e8` | exit 0; three commits; only `foundations/decisions.md` (+182/−119) |
| Word diff per slice | `git diff --word-diff=plain -U0 <c>~1 <c> -- foundations/decisions.md` for each of the three commits | exit 0; read whole |
| Clean copy at the head | `git clone -q --shared --no-checkout <worktree> <scratch>/clone`; `git checkout -q 7e3aa5e8` | exit 0; gitlink of `.the-way` `e9a0f926`, equal to the worktree's `.the-way` HEAD |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py <clone>` | exit 0, `0 errors` |
| Note names | `git grep -nIE 'in the vault\|_loop2\.md\|koncepcja_\|rozpoznanie_\|technologia_\|zadanie_\|Notes/Projects\|_zadania' -- foundations/decisions.md` in the clone | first hit line 3055 (D-152); the range is lines 1539–3016 — none in it |
| Mechanical comparison | own Python over both versions: the changed set, the part before *Rationale* with *Origin* excluded, the *Origin* values, both fields present | exit 0; 50 changed, exactly the decisions of D-73..D-149 whose old *Origin* says "in the vault", D-77 and D-82 excluded; no change before *Rationale*; every *Origin* `none`; both fields present |
| Added text for pointers and leaks | grep of every `{+…+}` segment of the three word diffs for task, definition, MVP, question, Q-numbers, note, vault, names, the human, owner, approved, cycle, plan, project, hosts, addresses, paths, `.md`, refiner, orchestrator, today, "no cost" | method; hits judged in M-3, I-3, M-7; the rest clean |
| HTTP helper (I-1) | `git show 7e3aa5e8:tests/http.test.mjs`, lines 25–110 | readiness deadline 5000 ms; absolute 5000 ms deadline on each exchange |
| Node test selection (M-2) | `git show 7e3aa5e8:package.json`, `scripts/test.py` | `"test": "python -B scripts/test.py"`; `NODE_TESTS` three patterns |
| Foreign services (I-2) | D-163, D-235, D-73 read whole in the head's log | both `narrows D-73`, both in D-73's list |
| Siedziba while a map run waits (I-3) | D-280, D-287, D-96 at the head | „Wróć do przejścia” in the menu bar; D-287 answers the question |
| Branch numbers (I-4) | grep of the head's log for the branch names; `git grep` in `src`, `tests` of the clone | no entry holds them; `src/browser/sim/data/skills.ts:161`, `:177` |
| Facts D-76 rests on | `scripts/static-files.mjs` (fonts copied by name), `tests/invariants/test_application_build_kitchen_sink.py` (serving out of scope) in the clone | still true |
| Glossary for D-81 | headings of `foundations/glossary.md` in the clone | `unit test`, `integration test` present, no `smoke test` |
| Tests | not run: the range changes no code or test; the full suite is the cycle's own run | — |

## Reaches beyond the dispatch

- `foundations/decisions.md` at `7e3aa5e8`: D-18 (D-128's claim about it), D-82 (I-4, M-1), D-163 and D-235
  (I-2), D-196 (M-6), D-222 and D-223 (D-105's claim), D-230 (whether D-104's capacity figures are past
  state — they are not), D-280 and D-287 (I-3), D-311 (D-147's and D-132's costs). Each read whole; why:
  to test added present-tense statements against the later log.
- `tests/http.test.mjs`, `package.json`, `scripts/test.py`, `scripts/static-files.mjs`,
  `tests/invariants/test_application_build_kitchen_sink.py`, `src/browser/sim/data/skills.ts` (grep),
  `foundations/glossary.md` (headings), `foundations/invariants.md` (`node-test-selection`) at the head —
  the same reason.
- `guidelines/testing.md`, § Not tested on purpose (lines 366–378), and the testing template of the pinned
  the-way, § Not tested on purpose — for M-5.
- `.the-way/elements/common/rules.md` (read whole), `.the-way/elements/decisions/template.md` (read whole),
  `.the-way/foundations/decisions.md` WAY-27 — named by the handoff.
- `reports/review-3-5-report.md` — for the grading the previous review used on the same kinds of defect.

## Unread material

- The notes were read by the passages each old *Origin* named and what those passages refer to, not
  whole: `przewodnik_testow_loop2.md` whole; `odkrywanie_loop2.md` questions 1–12 and § Settlements whole;
  `logowanie_w_react_loop2.md` To do 18, Pytanie 7, Questions carried to cycle, the D-76 item of Decisions
  in play, S5 (not its Context or other questions); `zapis_stanu_na_serwerze_loop2.md` questions 6–9,
  17–23, rows 6, 7, 9; `reset_hasla_loop2.md` questions 1–6, rows 1–4, 6, 7, 12, 14, 15, 19;
  `reguly_awarii_i_logow_loop2.md` question 16 and row 3; `ekrany_i_menu_loop2.md` Pytanie 1, 13, row 1;
  `definicja_mvp_loop2.md` the six projected entries named (program rule, Understanding, archetype,
  discovery, map solving, login, combat); `definicja_mvp2_loop2.md` D-93, D-96, D-122, D-130, D-133, D-134,
  D-135, D-147, D-149; `koncepcja_projektowa.md` D13, the §5 paragraph „Odkrywanie idzie dwiema osiami”,
  D14–D18, D38–D41, D49–D53; `rozwiazanie_lasu_loop2.md` questions 3–9, 15–17, rows 9–11;
  `programy_gracza_loop2.md` Q7–Q11, Q15; `petla_zarobkowa_loop2.md` Q2–Q4, Q17, rows 4, 20;
  `edytor_programu_loop2.md` To do 9, 10, Pytanie 6, 12–15; `wprawa_i_drzewa_loop2.md` To do 1–6, Q3, Q8,
  Q9, Context, § Settlements whole; `plomyk_loop2.md` Q3–Q6; `ekran_przejscia_loop2.md` To do 1, 4, 7,
  Pytanie 3, 4, 7; `scena_z_ludzikiem_loop2.md` To do 8, Pytanie 1, row 1; `teraz_i_potem_loop2.md` To do
  1, 3, 6, Pytanie 1–3, 5, 6, 8–15, rows 5, 6; `kronika_z_filtrami_loop2.md` To do 2, 6, Pytanie 1, 5, 9,
  Decisions in play (D-147 and D-122 lines); `karty_i_katalog_map_loop2.md` To do 3, 4 and its answers on
  them; `blokada_konta_loop2.md` questions 1, 2, 4, rows 1, 3; `potwierdzenie_adresu_loop2.md` question 10,
  row K10.
- `MANIFEST.md` of the snapshot: read whole; `old-loop/` not opened (no old *Origin* of the range names it).
- `docs/task-cycles/martwe-odsylacze-origin/task.md` and `plan.md`: `plan.md` read for the *Read*, *Goal*
  and *Checks* of slices 6–8; `task.md` not opened — the handoff carries its passages word for word.
- The slice handoffs (`slice-6-handoff.md` … `slice-8-handoff.md`): not read; the plan's slice text and the
  reports sufficed.
- `guidelines/testing.md`: only § Not tested on purpose and a grep; not read whole (the range changes no
  test).

## Searches not found or unclear

- „Rozbłysk”, „Iskra”, „Mocniejszy”, „Cięższy”, „Zwinny” in the head's log: not found (M-11, I-4); the
  last two only in `src/browser/sim/data/skills.ts`.
- A forest fire or any world event besides creatures in the head's log: not found (M-11, D-118).
- Unclear: whether any test of the head expects the rank numbers of the combat branches; I did not search
  the tests for them — the step that handles To do 5 should (I-4).
