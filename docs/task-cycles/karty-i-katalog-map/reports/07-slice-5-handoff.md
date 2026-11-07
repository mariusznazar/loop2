# Handoff - slice 5 (stage: make-change, "a slice, or the retry of a slice")

You make slice 5 of the plan of the task cycle `karty-i-katalog-map` (screen Mapy, card of a map, section "Kto idzie"). You are a fresh executor; the model class set for you by the plan is `cheaper`.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human. A question you cannot settle from your reading goes back in your report with the status `questions`; an open design choice the code shows returns with the status `returned` and no code (see the method).

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; the slice's base is `57f8d25be32e021c744df663f179872e85df5bc5`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for a slice (a file the method names only when the step that names it comes). Its project skill is `the-way-make-change`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/07-slice-5-report.md`. Return only: status, your commits, a one-line check result naming what failed or did not run, and the report path. The report must hold each check with its command and exit code, the section **Searches not found or unclear** (items or `none`), the own-work check the method asks for, every reach beyond this handoff (what, where, why) and your questions and concerns.
- Commit on the task branch with `git add <path> ...` by path (never `git add -A`, `git add .` or `git commit -a`), in English in the form of this repository's commits (`feat: :sparkles: ...`, `test: :white_check_mark: ...`, `docs: :memo: ...`, `refactor: :recycle: ...`; see `git log` for the form), each message ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- The checks of your slice are the focused checks its section names, run as it names them; you run no full `npm test` (the orchestrator runs the gate). `npm test -- <one file>` runs exactly one file.
- Project rules: read `AGENTS.md`; the guideline files named in your slice's *Read* each whole.
- Product language: code, identifiers, comments and commit messages in English; game text, test names and guideline prose in the language of the files you change (Polish where they are Polish). Do not rewrite files into another language.

## Names of foundation entries since the plan was written

The foundation entries were written before slice 1 by the foundation step (commit `afe5920`). In your *Read*, "Settlement 1..6" and "(new) ..." entries have these identifiers: (new) What does the screen Mapy show? = D-325; (new) What does the game say before an earning loop that earns nothing? = D-326; Settlement 1 = D-327; Settlement 2 = D-328; Settlement 3 = D-329; Settlement 4 = D-330; Settlement 5 = D-331; Settlement 6 = D-332. Read each entry the section names whole, from its `### D-nnn` heading to the next `###` heading.

Current line ranges in `foundations/decisions.md` (they differ from the ranges in the copied section; the current ones hold; find an entry by its heading when in doubt): `D-18` lines 390-408 | `D-39` lines 846-860 | `D-80` lines 1511-1523 | `D-118` lines 2106-2129 | `D-125` lines 2316-2338 | `D-133` lines 2525-2546 | `D-134` lines 2547-2565 | `D-136` lines 2585-2613 | `D-142` lines 2697-2711 | `D-149` lines 2802-2816 | `D-180` lines 3288-3302 | `D-187` lines 3381-3393 | `D-188` lines 3394-3406 | `D-189` lines 3407-3421 | `D-214` lines 3981-3998 | `D-251` lines 5077-5099 | `D-325` lines 7057-7071 | `D-326` lines 7072-7086 | `D-327` lines 7087-7101 | `D-328` lines 7102-7116 | `D-329` lines 7117-7131 | `D-330` lines 7132-7146 | `D-331` lines 7147-7161 | `D-332` lines 7162-7176.

## Your slice, copied word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`

### Slice 5 — The lines of the card of a map and of „Kto idzie”

- **Goal:** `src/browser/view/map-lines.ts` gains pure functions that give the parts of the card of
  a map from its definition and the numbers slice 2 put in `src/browser/sim/map-card.ts`, each part
  in the words of To do 4 (Settlements 1 and 2): the heading — the map's name, „rozwiązana” for a
  solved map, „odsłania ją {mapa}” with the opener's name from the data; „Żąda” — the sentence of
  `solvingSentence`; „Teren” — „siatka {w} × {h}”, „wejście stałe” or „wejście losowe”, „krok {n}
  min” with „— drożej niż zwykle” or „— taniej niż zwykle” for a step above or below the usual, and
  „bez ognia {m} min — otoczenie {t} °C”, the item left out where the map does not cool the body
  below the chill threshold; „Leży tu” — for each resource its identifier, for its icon, and „{name}
  — ≈ {k} z {n} kafelków, po {stock}, +1 co {r} min”, or, for a resource that does not renew, „nie
  odnawia się” in place of „+1 co …”, given apart so that it stands in `warning`; „Czyha” — for each
  attacker „{name} · {health} zdrowia · cios {damage}” and „{p} % szansy na minutę, {c} min spokoju
  od wejścia i po każdej walce — średnio co ≈ {s} min”, {p} in Polish notation with at most one
  decimal; „Odbiera” — „wnosisz najwyżej {n}” and „wynosisz najwyżej {n}”, each marked to stand in
  `warning`. A part the map does not have comes back empty, so the card leaves it out. Each function
  takes a map's definition, so a case can give a made-up map: a step other than the usual, a resource
  that does not renew, both caps, no attacker. `src/browser/view/trip-lines.ts` gains the line
  „Wejdzie: {item} {n}, …” or „Wejdzie: nic”, from the function slice 2 put in `trip.ts`, and „Pętla
  nic nie zarobi do skrzynki” for a program whose bring list is empty (To do 6); the comment of
  `rehearsalMark` names „Wejdź” (D-251 as rewritten). No name or identifier of a map, resource or
  creature stands in the code (content-identifiers). The expected texts of Las and Las — głębiej are
  written out in the cases from To do 4.
- **Change:** `src/browser/view/map-lines.ts` · `src/browser/view/trip-lines.ts` ·
  `tests/view/map-lines.test.mjs` · `tests/view/trip.test.mjs`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:40-65` To do, items 4 to 6 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:81-93` Questions to settle, questions 1 and 2 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:158-176` Context ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlements 1, 2 and 3, (new) What does the screen Mapy show?, (new) What
  does the game say before an earning loop that earns nothing?, D-133, D-134, D-180, D-188 and D-251
  as written · src/browser/sim/map-card.ts and src/browser/sim/trip.ts as slice 2 left them ·
  `foundations/decisions.md:390-408` D-18 · `foundations/decisions.md:846-860` D-39 ·
  `foundations/decisions.md:1509-1521` D-80 · `foundations/decisions.md:2104-2127` D-118 ·
  `foundations/decisions.md:2314-2336` D-125 · `foundations/decisions.md:2523-2544` D-133 ·
  `foundations/decisions.md:2545-2564` D-134 · `foundations/decisions.md:2584-2612` D-136 ·
  `foundations/decisions.md:2696-2710` D-142 · `foundations/decisions.md:2801-2815` D-149 ·
  `foundations/decisions.md:3287-3299` D-180 · `foundations/decisions.md:3378-3390` D-187 ·
  `foundations/decisions.md:3391-3403` D-188 · `foundations/decisions.md:3404-3418` D-189 ·
  `foundations/decisions.md:3978-3995` D-214 · `foundations/decisions.md:5075-5097` D-251 ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/part_map.md:3-28` browser-view ·
  `foundations/glossary.md:117-122` Understanding · `foundations/glossary.md:142-147` solved map ·
  `foundations/glossary.md:199-203` trip plan ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/data/maps.ts` · `src/browser/sim/data/creatures.ts` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/items.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/map-lines.test.mjs` (the cases of the card written first,
  failing) · `npm test -- tests/view/trip.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 2 · Slice 4

## Plan's Choices and notes

The plan's *Choices* (plan.md lines 641-660) bind where your slice's *Read* names them. The orchestrator's notes at the end of plan.md (section "Orchestrator's notes") apply.
