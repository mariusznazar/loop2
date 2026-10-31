# Report — agent of the plan's *Foundation entries*, task `rozliczenie-przejsc`

**Status:** `done with concerns`

The concerns are C1–C4 below. In C1–C3 I followed the element's rules over the letter of a spec row;
none changes the meaning of a row, and each costs one line to turn back. C4 is a rename the template
may ask for, which I left undone.

## Commits and files

| Commit | Address | What |
|---|---|---|
| `0363149` | `mariusznn@gmail.com` | `docs: :memo: write the foundation entries of what a map run pays and what a death takes` |

Branch `task/rozliczenie-przejsc`, on base `95de83b`. Not pushed. No code touched.

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 175 | 31 |
| `foundations/invariants.md` | 34 | 4 |
| `foundations/glossary.md` | 12 | 0 |

## Entries written

Every row of the plan's *Foundation entries* stands. `manual map run`: nothing to write, as the
plan says; it stands at `foundations/glossary.md:131`. No row found its settlement already stated,
so no row ties to an existing entry instead of a new one.

Numbers as the spec gives them: D-213 was the last, no tracked file named D-214–D-220.

One sentence of each entry's meaning, in the task document's language, for the request (WAY-114):

| Entry | Znaczenie |
|---|---|
| D-214 | O tym, czy przejście ręczne jest przejściem mapy rozwiązanej, rozstrzyga stan mapy w chwili jego startu, a „Restart” po domknięciu, które mapę rozwiązało, już nim jest. |
| D-215 | Na ekranie ręcznego przejścia mapy rozwiązanej stoi od minuty zero do „Restart” albo „Zakończ” linia w `text-secondary`, że przejście nic nie płaci i nic nie bierze ze skrzynki. |
| D-216 | Po śmierci w miejscu linii „Do skrzynki: …” stoi, także po wczytaniu zapisu, linia o tym, co śmierć zabrała: o zużytym wskrzeszeniu w `text-secondary`, o stracie dorobku w `danger`. |
| D-217 | Siedziba pokazuje przy każdej postaci stan wskrzeszenia i czas do gotowości, z minutami zaokrąglonymi w górę przed podziałem na godziny i minuty. |
| D-218 | Siedziba pokazuje „pokolenie {n}” przy imieniu postaci od numeru 2, w `text-secondary`. |
| D-219 | Odnowienie wskrzeszenia liczy zegar przeglądarki, więc biegnie w czasie realnym przy każdym tempie i przy zamkniętej grze. |
| D-220 | Nowa postać ma numer pokolenia 1 i gotowe wskrzeszenie. |
| D-03 | Uzasadnienie powtarza nowe brzmienie D-04 o tym, z czego widok rysuje grę. |
| D-04 | Widok rysuje grę ze stanu gry, danych treści i chwili zegara przeglądarki, którą sam odczytuje i podaje symulacji; stan gry może przechować chwilę zdarzenia, ale nie bieżący odczyt. |
| D-179 | Przykład naruszenia „plecak ponad zawartość skrzynki” nie dotyczy już ręcznego przejścia mapy rozwiązanej. |
| D-189 | Pierwsze ręczne domknięcie płaci wprawą i łupem raz na mapę, ręczne przejście mapy rozwiązanej nie płaci niczym i bierze wyposażenie znikąd. |
| D-190 | Śmierć zabiera niesione i nic nie płaci, a bez gotowego wskrzeszenia także całą wprawę i stopnie, podnosząc numer pokolenia; „Restart” po takiej śmierci startuje z postacią po tej stracie. |
| D-194 | Wprawa wchodzi do umiejętności przy domknięciu, które pierwsze rozwiązuje mapę, a wpis niesie przyjęty koszt: do wejścia pętli zarobkowej najwyżej dwie wypłaty i brak źródła wprawy dla nowej postaci. |
| D-212 | Znaczenie bez zmian; *Verification* wymienia `death-settled-once`. |
| `solved-map-manual-run` | Ręczne przejście mapy rozwiązanej już w chwili startu zostawia skrzynkę bez zmian i nie dodaje wprawy. |
| `resurrection-renewal` | Zużyte wskrzeszenie jest gotowe w chwili śmierci powiększonej o czas odnowienia, śmierć bez gotowego tej chwili nie przesuwa, a chwila równa gotowości liczy się jako gotowe. |
| `death-settled-once` | Jedna śmierć rozlicza się raz; kolejne rozliczenie i wczytanie zapisu niczego nie zmieniają. |
| `trip-transfer` | Pobranie i odłożenie obowiązują poza ręcznym przejściem mapy rozwiązanej, które zostawia skrzynkę nietkniętą na starcie i przy domknięciu. |
| `trip-run-end` | Domknięcie odkłada to, co wymienia lista, a na ręcznym przejściu mapy rozwiązanej nic. |
| `resurrection` | Wskrzeszenie to to, co postać ma gotowe albo nie w chwili śmierci i co chroni jej dorobek; przejście i tak kończy się śmiercią. |
| `generation number` | Numer pokolenia rośnie o jeden przy śmierci bez gotowego wskrzeszenia, a postać zostaje tą samą postacią z tym samym numerem z D-56. |

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` before any edit | 0 | 0 errors |
| the same, with the entries written, before the commit | 0 | 0 errors |
| the same, on `0363149` | 0 | 0 errors |
| `git diff --check -- foundations` | 0 | clean |

Not run: `npm test`, as the handoff gives; it is the orchestrator's gate. `foundation_check.py`
does not see whether a test cites an invariant, so it says nothing on the three new invariants'
tests.

## Own-work check

- Requirement I judged most likely missed: rows 1–12 keep Q9's wording rule, and the approved wording
  stands as approved. Both are easy to lose in translation.
- Check for Q9: a search of D-214–D-220, `resurrection-renewal`, `death-settled-once`, `resurrection`
  and `generation number` for `only`, `never`, `always`, `without`, `solely`, `merely`, `alone`,
  `must`, `cannot`, `should`, `will`. It found one word: „the headquarters alone telling” in D-216's
  *Rejected*. I reworded it and the commit holds no such word. The search covers those words; it does
  not judge every phrase that excludes an alternative.
- Check for the approved wording: a script compared 16 passages with whitespace folded, and the
  sentence of `solved-map-manual-run`, against `foundations/`. None is missing. The four phrases held
  for task 18 — the death that stops the earning loop, the sentence on practice as a side effect, and
  both on the mark — are absent.
- Check for the two-way links: each invariant named in a decision's *Verification* names that
  decision in *Derives from*, for D-189, D-190, D-212, D-214 and D-219. This is what surfaced C3.
- `git status --short` after the commit is empty, and the commit touches the three foundation files
  alone.

## Changed invariants, with their tests (step 4.2 of `record-invariant`)

`trip-transfer`, on the fork point: „At each map-run start equipment is removed from the chest in
take-list order up to stock, carrying capacity and entry cap, and at completion items are deposited
once from the entry-bound bring snapshot in its order up to backpack stock, carrying capacity, exit
cap and free chest room, including on an already solved map.”
New: „Outside a manual run of a solved map, at each map-run start equipment is removed from the
chest in take-list order up to stock, carrying capacity and entry cap, and at completion items are
deposited once from the entry-bound bring snapshot in its order up to backpack stock, carrying
capacity, exit cap and free chest room, while a manual run of a solved map leaves the chest as it
was at its start and at its completion.”

`trip-run-end`, on the fork point: „Death, ending or restarting an unfinished map run returns none
of its carried items to the chest, while completion deposits the frozen bring list's clipped
contents and leaves the remaining items unavailable to subsequent runs.”
New: „Death, ending or restarting an unfinished map run returns none of its carried items to the
chest, while completion deposits the frozen bring list's clipped contents, on a manual run of a
solved map nothing, and leaves the remaining items unavailable to subsequent runs.”

| Test citing it | Against the new wording |
|---|---|
| `tests/sim/trip.test.mjs:120` `trip-transfer` | holds: pure clipping and a first run |
| `:174` `trip-transfer` | holds: a run on an unsolved map |
| `:334` `trip-transfer` | contradicts the new wording until Slice 1: its run starts on a solved map and takes from the chest; the spec lists it, at `:333` |
| `:387` `trip-transfer` | holds: a run on an unsolved map |
| `:272` `trip-run-end` | holds: restarts on an unsolved map, before completion |
| `:362` `trip-run-end` | contradicts the new wording until Slice 1: its restart follows a completion and takes from the chest; the spec lists it, at `:361` |

## Finding asked for: D-192

D-192's first sentence says „A character is described by traits, character skills and the
predispositions of its archetype.” The new keys, `generation` and `resurrectionReadyAtMs`, are none
of the three. The glossary's `trait` is „a number describing a character that acts always”, and
neither key acts on anything a character can do. I found no collision, so D-192 is not changed:

- The sentence is no closed list of what the state holds at a character today:
  `src/browser/sim/types.ts:298` already holds `id` and `name` beside it.
- Its *Rationale* reads it as roles in what a character can do: „numbers and what a character can
  say in a program are not alternatives: they are three roles”. D-64's *Rationale* uses the word the
  same way: carrying capacity acts beyond one action, „so it describes the character”.
- `generation number` is defined as a count kept at a character, not as describing it.

If the orchestrator reads the sentence as closed, the cost is one clause of D-192.

## Concerns

**C1. `resurrection`, *Not* reads `none`; the spec's row asks for a *Not* for a character coming
back on the map.**
`.the-way/elements/glossary/skill/SKILL.md:34` gives *Not* „never the meaning a reader who knows the
product's field gives the word”, and that is this meaning: row 11's Source calls it what a reader of
games takes the word for. No word carries it either, and `TODO` in *Not* may not reach the main
branch (template, *Form of an entry*). The handoff gives: „the sentence you write goes by the
element's skill”. The meaning stands in the definition, from row 11's own last clause: „the map run
ending in death with a resurrection ready too”.
Rejected: a *Not* with no carrier, against the template. Cost if wrong: one field.

**C2. `resurrection-renewal`, *Part* reads `simulation · browser-view`; the spec's row reads
`simulation`.**
The sentence names the real moment of a death, and the view's clock passes that moment (spec,
decision 4). A change there can make the sentence false, and the template says a writer in doubt
names more. D-219, from which it derives, has the same two parts. *Part* stands outside the sentence,
so the row's meaning does not move.
Rejected: `simulation` alone — a change of `clock.ts` would not reach the invariant, with nothing
showing it. Cost if wrong: one more part read by changes in `browser-view`.

**C3. D-212 changed, though the spec lists it under „Unchanged, read and still true”.**
Its *Verification* gained `invariants: death-settled-once`. The spec's own row makes that invariant
derive from D-212, the template requires the two links to match, and step 4.4 of `record-invariant`
gives the edit. D-212's sentences stay and stay true. I took this as no disagreement of meaning, so
no question.

**C4. The verb `resurrect` keeps another meaning in three tracked places; left as it stands.**
D-101 (`foundations/decisions.md`, „a delayed renewal cannot resurrect a destroyed session”),
`tests/http.test.mjs:642` and the test name at `tests/sim/program-counts.test.mjs:258` use it for
bringing back a session and a count. Read strictly, the template's *Which words take an entry* asks
for a rename, the human choosing the word, since `resurrection` now has a meaning of the game's own.
The spec does not name them. I recommend leaving them: it is the plain English verb, about no
character, and no reader takes a session for a game resurrection. The two test lines are code,
outside this stage. If the orchestrator wants the rename, D-101 takes „restore” in one word; the
choice is the human's by the template.
Cost of leaving: one word in the foundation with a second, ordinary sense.

## Other choices, each with the way rejected

| Choice | Rejected | Cost if wrong |
|---|---|---|
| D-189: its first two approved sentences joined by a semicolon, so the body keeps the template's limit of three; no word changed | four sentences, the first entry over the limit | punctuation |
| D-190: the sentence of To do 17 joined to „…survive every death” by a semicolon, for the same reason | a fourth sentence | punctuation |
| D-189: the old sentence „takes equipment from the chest at each map run's start…” goes whole; the approved wording has no such sentence, and D-179 and `trip-transfer` say it for other runs | keeping it, narrowed, as a further sentence | D-189 says less of what an ordinary run takes |
| D-190: „including pieces taken from the chest” goes with the old body; `trip-run-end` holds it | keeping the clause inside approved wording | the clause restored |
| D-189: *Verification* gains a `complies` example from To do 5, to keep the log's pair; the approved `complies` is about the earning loop, and the spec names the violating examples alone. The log's 160 pairs all have both sides | `violates` alone | one example; it is mine, from To do 5, not approved wording |
| D-214: *Rejected* reads `unknown`; row 1's source keeps no way not chosen, and the template bars a way from elsewhere, so spec decision 1's „reading `solvedMaps` at the completion” is not there | entering the spec's way | that reasoning leaves with the spec |
| D-220: *Rejected* holds W1's way B, the way row 8's Source names, though it reads wider than this entry | `unknown` | one clause |
| D-215–D-218, D-220: *Verification* `none`; no source gives examples and no human accepted any; D-184–D-186 and D-188 read the same | examples of my own | none today |
| D-04: *Rationale* and *Rejected* take spec decision 7's reasons, so they outlive the spec; the second-timer way stays out, it is no answer to D-04's question | leaving them out | three sentences |
| D-04: the row's „the moment of a save in task 18” reads „the moment of a save”; an entry names no task | naming the task | none |
| *Origin* gains the task note on D-04, D-189, D-190 and D-194, the form D-04 already has; D-03 and D-179 stay, as the spec gives „nothing else changes” | leaving *Origin* | a reader misses the note |
| *Relations*, the writer's: D-194 gains `derives from D-189`; D-214–D-220 as they stand | fewer links | none |
| One commit: the entries link to each other, so no earlier split passes the check | one commit per element | none |
| Bare `step`, the last word of a term of the-way's glossary, avoided in D-219's *Rejected* by `human action` | „a human's step” | none |

## Reaches beyond the handoff

| What | Where | Why |
|---|---|---|
| D-212's *Verification* edited | `foundations/decisions.md:3854` | C3 |
| D-34, D-35, D-50, D-56, D-64, D-84, D-147, D-164, D-176, D-183, D-185–D-188, D-191, D-193, D-200, D-201, read whole | `foundations/decisions.md` | the search of the whole foundation: what derives from a changed decision, and a restart's rules. Each still true; no edit |
| `map-run-repeatability`, `player-map-run-pace`, `simulation-isolation`, `simulation-inputs`, `restart-seed`, `minute-span-split`, `character-team` | `foundations/invariants.md` | those that derive from D-04 or that the spec names |
| The uses of D-04, D-179 and D-189 in guidelines | `guidelines/coding-saved-game.md:144`, `guidelines/coding-simulation-module.md:30`, `guidelines/styleguide-browser-view.md:280` | D-04's sentence changed; none paraphrases the changed sentence |
| The cases that cite the changed invariants | `tests/sim/trip.test.mjs` | step 4.2 of `record-invariant` |
| `Character` | `src/browser/sim/types.ts:298` | the comparison with D-192 |
| The check's rules | `.the-way/elements/common/foundation_check.py` | what it asks of *Method*, *Not* and *Verification* |

The frozen `task.md` and the vault note `rozliczenie_przejsc_loop2.md` have the same sha256, so the
*Origin* lines point at what was read. The definition's sha256 matches the handoff's `fda97782458d…`.

## State of this commit

The foundation stands ahead of the code until the slices land. On `0363149` the entries of this task
describe behaviour the code does not have yet, and no test cites the new invariants. *Method* `test`
and *Violated* `no` stand as the spec gives them; the template says an invariant whose test is not
written yet reads `review`, and this holds at the request, where the tests stand.

The answers of step 4: the trust boundary and raising `SAVED_GAME_VERSION` are named in no entry.

## Searches not found or unclear

- *Not* of `resurrection`: unclear between the spec and the element's skill, as C1 gives.
- `generation number`, *Not*: the template speaks of a meaning the word carried in tracked files, and
  this term has no earlier use. I wrote it as the spec's row gives, with the carrier
  "character's number", since the mix-up is real (Q8, part b, way C) and a carrier exists.
- Uses, on the fork point, by `git grep -i -w` over the tracked files outside `.the-way`.
  `generation`: one use, salt generation in D-106's *Rationale*, a meaning a reader of the field
  gives, so nothing to rename. `resurrection`: D-04's *Rationale* and *Origin*, in this meaning. The
  verb `resurrect`: the three uses of C4. No Polish use of „pokolenie” stood in the tracked files.
- The template's limit of three binding sentences and „the approved wording stays”: unclear for
  D-189 and D-190, settled by punctuation as the table gives.
