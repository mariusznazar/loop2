# Return step — report, cycle `ognisko-i-jedzenie`

**Status:** done with concerns

Base 4dc4ca442f963e490db204d332495473c0f478f0; range 4dc4ca4..105e4b9.

## Commits and files

- `589ee33` docs: bring the foundation to the code of the return step: renewal counted from minute
  zero, feeding landing at its end, a map run ended in death, the extinguished campfire
- `105e4b9` test: quote the reworded sentences of action-in-progress and player-map-run-pace and
  read their clause on the end of a map run

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 12 | 11 |
| `foundations/glossary.md` | 8 | 1 |
| `foundations/invariants.md` | 5 | 5 |
| `tests/invariants/test_action_in_progress.py` | 6 | 4 |
| `tests/invariants/test_player_map_run_pace.py` | 5 | 3 |

## Entries written or corrected (meaning in Polish)

Each through its element's pinned skill (record-decision, record-invariant, record-glossary-term),
on my recommendation; none changes an approved decision of `main` beyond what the task and the
reviewed spec carry.

- **D-60 (changed)** — Kafelek poniżej zapasu startowego odzyskuje sztukę w każdej minucie gry
  będącej całkowitą wielokrotnością czasu odnowienia zasobu, liczoną od minuty zero przejścia, nie
  ponad zapas startowy. Why: the binding sentence ("each time the time to renew passes") also fit a
  clock per tile, and its complies example ("holding a stick again once the time has passed")
  described that clock, not the code (`worldMinute`, `src/browser/sim/world.ts`). The choice binds
  after the merge (spec Decision 1 step 4; task 18's catch-up counts a span by it) — WAY-36.
  Rationale and *Rejected* gained the spec's weighed way and weak point.
- **D-62 (changed)** — Każde zasilenie ogniska płonącego na początku zasilania dokłada na jego końcu
  swoje minuty palenia do tych, które ognisku wtedy zostały, ile by ich było, także zero, więc
  ognisko wypalone w trakcie zasilania płonie znowu. Why: the code lands a feeding on its campfire
  whatever its state at the end (`finishUse`, `src/browser/sim/run.ts`); this stood only in D-64's
  prose, and D-62's complies example (150 left → 170) was off by the 5 minutes burnt during the
  feeding. The choice binds after the merge (cycle questions table; task 9 may close it). *Rejected*
  gained the spec's two rejected ways.
- **D-23 (changed, *Verification* only)** — Do przykładów zgodności doszedł warunek temperatury
  biorący z pola liczby 36,5, liczbę z dziesiątymi; zdania wiążące bez zmian. Why: the one complies
  example showed whole numbers only, beside D-50's violates example refusing 35.5.
- **`action-in-progress` (changed)** — Trwająca akcja postaci trwa całą swoją długość, chyba że jej
  przejście skończy się wcześniej, nawet gdy program się zmieni albo zacznie zachodzić warunek innej
  reguły. Why: read literally, the sentence was false whenever death (D-54) cuts an action short.
- **`player-map-run-pace` (changed)** — Czas rzeczywisty przekazany przejściu uruchomionemu przez
  gracza przesuwa je, aż się skończy, o minutę gry za każdą pełną sekundę bez pauzy i o nic w
  pauzie. Why: real time passed across the minute of death moves the run on only to that minute
  (`passRealTime`, `advanceMinutes` in `src/browser/sim/game.ts`), which the sentence's "for each
  whole real second" denied.
- **glossary `free game minute` (changed)** — Wolna minuta gry to minuta, w której przejście się
  zaczyna albo w której kończy się akcja lub czekanie postaci, a przejście trwa dalej. Why: D-54's
  rationale says death ends the action with the map run, so the minute of death read as a free
  game minute, and `program-rule-pick` would then ask for a rule to start in it, which the code
  (and D-64) never does. Uses (D-20, D-23, `program-rule-pick`, tests `test_program_rule_pick.py`,
  `test_walk_feasibility.py`) keep their meaning: none reaches a minute of death.
- **glossary `extinguished campfire` (new)** — Wygasłe ognisko to ognisko stojące na kafelku bez
  minut palenia, czy się wypaliło, czy jeszcze nie było zapalone. Why: the change uses
  "extinguished" (D-61, D-63, comments in `types.ts`, `program.ts`, `world.ts`, `terrain-panel.ts`,
  `terrain-picture.ts`) and „wygasłe” (`tile-list.ts`) for a never-lit campfire too, a meaning a
  reader would not give it. *Not:* none — every use fits the definition.

Invariant tests altered (WAY-03, name them in the request): `test_action_in_progress.py` and
`test_player_map_run_pace.py` — docstrings only: the quoted sentence and one reading line each
("the map runs below pass at most 45 / 212 game minutes, and none ends within them"). No assertion
changed.

## Judged, nothing written

- **D-21** — holds as written: per the glossary a map run ends with death, and a map run that has
  ended passes no time; it is a decision of pace, not a count over inputs, so it needs no clause.
- **D-22** — not false: "the game map's layout and wandering among them" is a list of examples, and
  gathering has its own generator (`streamState(seed, "gather")`). Task 18's entry not written.
- **`minute-span-split`** — `Method: test` matches: `tests/invariants/test_minute_span_split.py`
  cites it in every test, checks the sentence (one minute a call as the reference, nine other splits,
  death past the span, controls), and passed at gate 1. Nothing to change.
- **Never-lit and burnt-out campfire sharing one state** — written as the glossary term above; D-63
  needs no edit, since it uses the word.
- **A resource without a time to renew does not renew (fix 4dc4ca4)** — binds after the merge, but
  is the part of the projected entry "What is a map made of?" that the task assigns to task 8 (as is
  "cannot be gathered … there"). D-24 as it stands is not false on this commit: every resource of
  Las has its time. Not written — see Concerns.
- **Renewal at whole multiples from minute 0** — written into D-60, above.
- **Feeding landing whatever the campfire's state** — written into D-62, above.
- **Words** — "chilled", "starving": D-53 defines both inline (below the threshold of chill / of
  hunger), D-54 and D-64 use them so; no entry. "carrying capacity": its usual meaning, counted in
  pieces by D-57; no entry. "trait": no use in the foundation (only in code); the term is task 10's.
- **Environment facts** — none missing: `game-icons-campfire-title` and `game-icons-licence` (with
  Lorc) match `assets/icons/campfire.svg` and `src/browser/view/credits.ts`; no other outside
  source the change rests on.
- **Part map** — matches: `tests/invariants/test_minute_span_split.py` under `simulation`; every new
  file of the change falls under existing patterns (`foundation_check.py` 0 errors).
- Compared with the code and found matching: D-25, D-26, D-50–D-59, D-61, D-63–D-65,
  `walk-target`, `walk-feasibility`, `program-world-reference`, `program-closed-lists`,
  `map-run-layout`, `content-identifiers`, `icon-credits`.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after both commits) | 0 (0 errors) |
| `python -B -m unittest test_action_in_progress test_player_map_run_pace` (in `tests/invariants`) | 0 (4 tests OK) |
| `ruff check --config ruff.toml --ignore-noqa` on the two test files (Ruff 0.17.1, `loop2/.runs/quality-venv`) | 0 |

Not run: the full `npm test` (the cycle's run; the change touches only Markdown and two
docstrings). The two invariant tests were not seen failing: their assertions did not change, only
their docstrings.

Own-work check — requirement most likely missed: that a reworded entry no longer matches a test
citing it. Check: read each citing test's reading against the new wording and ran both; they pass
and stay within map runs that do not end.

## Reaches beyond the handoff

- `src/browser/sim/run.ts`, `game.ts`, `program.ts`, `body.ts`, `world.ts`, `data/maps.ts`,
  `view/credits.ts` — to compare the entries with the code.
- `tests/invariants/test_action_in_progress.py`, `test_player_map_run_pace.py`,
  `test_program_rule_pick.py` (head) — the tests citing the entries I reworded.
- Glossary `free game minute` and `program-rule-pick` — not named by the handoff; found by the same
  question as item 2 (an action cut short by death).
- `21-whole-fix-findings.md` — the origin of fix 4dc4ca4.

## Concerns

1. **Task 8's part of "What is a map made of?" stays unwritten** — "no time meaning a resource that
   does not renew" and "cannot be gathered … there" are true in the code now. The plan (and the
   handoff for D-22) leaves other tasks' projected entries to them, while the foundation step's
   rule (WAY-126) says a projected entry the code makes true is written "whole … or the part the
   code makes true". I followed the plan. Recommended answer, if you want it otherwise: write the
   two clauses into D-24 in this request as the readiness gate approved them.
2. **Decision numbers collide with `main`** — `main` (merge d11dd0f, task 11) already holds
   D-50–D-56 of its own; this branch holds D-50–D-65. The reconciliation with the target branch has
   to renumber this branch's decisions and every reference to them (decisions, invariants,
   `foundation-map.md`, code comments citing D-5x/D-6x). Not touched here.
