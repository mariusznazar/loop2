# Handoff - slice 6 (stage: make-change, "a slice, or the retry of a slice")

You make slice 6 of the plan of the task cycle `karty-i-katalog-map` (screen Mapy, card of a map, section "Kto idzie"). You are a fresh executor; the model class set for you by the plan is `cheaper`.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human. A question you cannot settle from your reading goes back in your report with the status `questions`; an open design choice the code shows returns with the status `returned` and no code (see the method).

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; the slice's base is `ef77de75a55bf7ffedaa495481c8cae6949dd416`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for a slice (a file the method names only when the step that names it comes). Its project skill is `the-way-make-change`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/08-slice-6-report.md`. Return only: status, your commits, a one-line check result naming what failed or did not run, and the report path. The report must hold each check with its command and exit code, the section **Searches not found or unclear** (items or `none`), the own-work check the method asks for, every reach beyond this handoff (what, where, why) and your questions and concerns.
- Commit on the task branch with `git add <path> ...` by path (never `git add -A`, `git add .` or `git commit -a`), in English in the form of this repository's commits (`feat: :sparkles: ...`, `test: :white_check_mark: ...`, `docs: :memo: ...`, `refactor: :recycle: ...`; see `git log` for the form), each message ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- The checks of your slice are the focused checks its section names, run as it names them; you run no full `npm test` (the orchestrator runs the gate). `npm test -- <one file>` runs exactly one file.
- Project rules: read `AGENTS.md`; the guideline files named in your slice's *Read* each whole.
- Product language: code, identifiers, comments and commit messages in English; game text, test names and guideline prose in the language of the files you change (Polish where they are Polish). Do not rewrite files into another language.

## Names of foundation entries since the plan was written

The foundation entries were written before slice 1 by the foundation step (commit `afe5920`). In your *Read*, "Settlement 1..6" and "(new) ..." entries have these identifiers: (new) What does the screen Mapy show? = D-325; (new) What does the game say before an earning loop that earns nothing? = D-326; Settlement 1 = D-327; Settlement 2 = D-328; Settlement 3 = D-329; Settlement 4 = D-330; Settlement 5 = D-331; Settlement 6 = D-332. Read each entry the section names whole, from its `### D-nnn` heading to the next `###` heading.

Current line ranges in `foundations/decisions.md` (they differ from the ranges in the copied section; the current ones hold; find an entry by its heading when in doubt): `D-18` lines 390-408 | `D-149` lines 2802-2816 | `D-277` lines 5849-5868 | `D-280` lines 5916-5963 | `D-281` lines 5964-5999 | `D-325` lines 7057-7071 | `D-326` lines 7072-7086 | `D-327` lines 7087-7101 | `D-328` lines 7102-7116 | `D-329` lines 7117-7131 | `D-330` lines 7132-7146 | `D-331` lines 7147-7161 | `D-332` lines 7162-7176.

## Your slice, copied word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`

### Slice 6 — The addresses of the screen Mapy

- **Goal:** `src/browser/view/screen-address.ts` names two more screens (To do 2, Settlement 6,
  D-281 as written): `{ kind: "maps" }` at `#/mapy` and `{ kind: "map", mapId }` at `#/mapy/{map}`,
  `{map}` being an own key of `MAPS` as it stands — `#/mapy/forest`, `#/mapy/forestDeep` — read as
  `location.hash` gives it and never decoded, so any other text after `#/mapy/` names no screen.
  `resolveScreen` gives Siedziba for a map off the list of open maps, one whose opener is unsolved
  (`canSendMap` over the game's solved maps, D-149), so that a reload at it lands on `#/`;
  `screenAddress` writes both addresses; the type `MenuItem` holds `maps`, which `markedMenuItem`
  gives both screens (To do 1). `src/browser/view/game-view.ts` gives the two kinds no DOM holder,
  as Postać has none, since slice 8 builds the screen Mapy on entering; nothing else of the page
  changes, and nothing links to the addresses before slice 8. No identifier or name of a map stands
  in the code (content-identifiers).
- **Change:** `src/browser/view/screen-address.ts` · `tests/view/screen-address.test.mjs` ·
  `src/browser/view/game-view.ts`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:29-34` To do, items 1 and 2 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:128-138` Questions to settle, questions 9 and 10 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlement 6, D-149, D-280 and D-281 as written ·
  `foundations/decisions.md:390-408` D-18 · `foundations/decisions.md:2801-2815` D-149 ·
  `foundations/decisions.md:5843-5862` D-277 · `foundations/decisions.md:5910-5953` D-280 ·
  `foundations/decisions.md:5954-5986` D-281 ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/game.ts:79-88` · `src/browser/sim/data/maps.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/screen-address.test.mjs` (the cases of the two addresses
  written first, failing) · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** the plan's *Foundation entries*

## Plan's Choices and notes

The plan's *Choices* (plan.md lines 641-660) bind where your slice's *Read* names them. The orchestrator's notes at the end of plan.md (section "Orchestrator's notes") apply.
