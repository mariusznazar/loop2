# Handoff - slice 7 (stage: make-change, "a slice, or the retry of a slice")

You make slice 7 of the plan of the task cycle `karty-i-katalog-map` (screen Mapy, card of a map, section "Kto idzie"). You are a fresh executor; the model class set for you by the plan is `same`.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human. A question you cannot settle from your reading goes back in your report with the status `questions`; an open design choice the code shows returns with the status `returned` and no code (see the method).

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; the slice's base is `6ef8213e3b360d42253d9899aade341ef3e210bb`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for a slice (a file the method names only when the step that names it comes). Its project skill is `the-way-make-change`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/09-slice-7-report.md`. Return only: status, your commits, a one-line check result naming what failed or did not run, and the report path. The report must hold each check with its command and exit code, the section **Searches not found or unclear** (items or `none`), the own-work check the method asks for, every reach beyond this handoff (what, where, why) and your questions and concerns.
- Commit on the task branch with `git add <path> ...` by path (never `git add -A`, `git add .` or `git commit -a`), in English in the form of this repository's commits (`feat: :sparkles: ...`, `test: :white_check_mark: ...`, `docs: :memo: ...`, `refactor: :recycle: ...`; see `git log` for the form), each message ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- The checks of your slice are the focused checks its section names, run as it names them; you run no full `npm test` (the orchestrator runs the gate). `npm test -- <one file>` runs exactly one file.
- Project rules: read `AGENTS.md`; the guideline files named in your slice's *Read* each whole.
- Product language: code, identifiers, comments and commit messages in English; game text, test names and guideline prose in the language of the files you change (Polish where they are Polish). Do not rewrite files into another language.

## Names of foundation entries since the plan was written

The foundation entries were written before slice 1 by the foundation step (commit `afe5920`). In your *Read*, "Settlement 1..6" and "(new) ..." entries have these identifiers: (new) What does the screen Mapy show? = D-325; (new) What does the game say before an earning loop that earns nothing? = D-326; Settlement 1 = D-327; Settlement 2 = D-328; Settlement 3 = D-329; Settlement 4 = D-330; Settlement 5 = D-331; Settlement 6 = D-332. Read each entry the section names whole, from its `### D-nnn` heading to the next `###` heading.

Current line ranges in `foundations/decisions.md` (they differ from the ranges in the copied section; the current ones hold; find an entry by its heading when in doubt): `D-03` lines 39-51 | `D-18` lines 390-408 | `D-36` lines 801-815 | `D-39` lines 846-860 | `D-40` lines 861-875 | `D-44` lines 921-935 | `D-54` lines 1096-1114 | `D-55` lines 1115-1135 | `D-134` lines 2547-2565 | `D-149` lines 2802-2816 | `D-165` lines 3034-3048 | `D-170` lines 3114-3128 | `D-180` lines 3288-3302 | `D-188` lines 3394-3406 | `D-217` lines 4037-4049 | `D-243` lines 4837-4864 | `D-244` lines 4865-4883 | `D-245` lines 4884-4911 | `D-251` lines 5077-5099 | `D-264` lines 5423-5454 | `D-265` lines 5455-5496 | `D-267` lines 5525-5553 | `D-268` lines 5554-5598 | `D-274` lines 5745-5783 | `D-282` lines 6000-6025 | `D-287` lines 6110-6137 | `D-325` lines 7057-7071 | `D-326` lines 7072-7086 | `D-327` lines 7087-7101 | `D-328` lines 7102-7116 | `D-329` lines 7117-7131 | `D-330` lines 7132-7146 | `D-331` lines 7147-7161 | `D-332` lines 7162-7176.

## Your slice, copied word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`

### Slice 7 — The screen Mapy in React

- **Goal:** `src/browser/view/maps-screen.tsx` is the screen Mapy (To do 3 to 7), written after the
  exemplar `account-card.tsx` (D-36) with the boundary of `character-screen.tsx`:
  `createMapsScreen({ controls, props })` returns `element`, `update(props)`, `focus()` and
  `dispose()`, its first render synchronous; `props` are the game state, the clock's moment `nowMs`
  and the map the address names or null; `controls` are `pick(characterId, programId)`,
  `enter(characterId, mapId, programId)`, `startLoop(characterId, mapId, programId)` and
  `stop(characterId)`, which the page turns into the simulation's calls. It draws two areas of their
  own (D-282): on the left the list of open maps — `sendMaps` over the solved maps, in the data's
  order, each row a link to `screenAddress({ kind: "map", mapId })` with the map's name and, for a
  solved map, „rozwiązana”, the row of the map named marked as picked; on the right, with no map
  named, „Wybierz mapę z listy.”, and with one, the card from slice 5's lines, each resource with its
  icon `/icons/{icon}.svg` from the data, and under it the section „Kto idzie”. „Kto idzie” holds the
  team's characters in the order of their creation (D-54), each, from the top (To do 5): its name as
  a link to its screen Postać; its resurrection line (D-217 as extended) and, in an earning loop, its
  loop line with „Zatrzymaj” as the destructive button (D-244 as extended); „Program:” with the
  shared select list of `programPositions` over `rowProgram`, whose change calls `pick` (D-170);
  „Wejdzie: …”; the clipped-plan line (D-188); „Wejdź” of the kind `main` and, at a solved map,
  „Puść w pętlę” as the plain button with „Pętla nic nie zarobi do skrzynki” beside it where the bring
  list is empty, the button still active; the rehearsal mark under „Wejdź” (D-251); and, while the
  game state holds a manual map run, the run sentence under the buttons of every character (D-287 as
  written). „Wejdź” stands inactive while the game state holds a manual map run and at a character
  in an earning loop; „Puść w pętlę” at the manual map run's character and at a character in an
  earning loop. An empty team reads „Drużyna nie ma jeszcze postaci. Załóż ją w Siedzibie.”.
  „Pętla zatrzymana …” does not stand here (D-245). Each button and the list carry an accessible name
  with the character's name, as Siedziba's do today. After „Puść w pętlę” the keyboard's focus goes
  to that character's „Zatrzymaj”, and after „Zatrzymaj” to its „Wejdź”. `src/browser/styles.css`
  draws the screen: the two areas as the columns of Programy, one under the other in a window under
  720 px, and each part in the role the styleguide of slice 1 gives. The test file runs on jsdom
  through `tests/view/page-document.mjs` (D-264) and covers each state below. The report holds the
  state check of the screen: its components (list, empty right area, card, „Kto idzie”), the states
  — no map named; Las not solved; Las solved, with „Puść w pętlę”, the rehearsal mark and the
  sentence of an empty bring list; Las — głębiej once Las is solved, with „odsłania ją Las” and
  „Czyha”; a character in an earning loop; a manual map run going on, waiting and ended;
  a resurrection not ready; an empty team; „Wejdzie: nic” — the method (the test on jsdom; the real
  browser in slice 8) and the evidence, the clipped-plan line named as a state no map reaches today,
  which the cases of `tripWarning` cover.
- **Change:** `src/browser/view/maps-screen.tsx` · `tests/view/maps-screen.test.mjs` ·
  `src/browser/styles.css`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:35-67` To do, items 3 to 7 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:75-77` Acceptance criteria ·
  `docs/task-cycles/karty-i-katalog-map/task.md:94-111` Questions to settle, questions 3 to 5 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:122-127` Questions to settle, question 8 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlements 1, 2, 3 and 5, (new) What does the screen Mapy show?, (new) What
  does the game say before an earning loop that earns nothing?, D-134, D-149, D-165, D-170, D-180,
  D-188, D-243, D-251, D-217, D-244, D-282, D-287 and D-274 as written · src/browser/view/map-lines.ts,
  src/browser/view/team-lines.ts and src/browser/view/trip-lines.ts as slices 4 and 5 left them ·
  `foundations/decisions.md:39-51` D-03 · `foundations/decisions.md:390-408` D-18 ·
  `foundations/decisions.md:801-815` D-36 · `foundations/decisions.md:846-860` D-39 ·
  `foundations/decisions.md:861-875` D-40 · `foundations/decisions.md:921-935` D-44 ·
  `foundations/decisions.md:1095-1113` D-54 · `foundations/decisions.md:1114-1133` D-55 ·
  `foundations/decisions.md:2545-2564` D-134 · `foundations/decisions.md:2801-2815` D-149 ·
  `foundations/decisions.md:3113-3127` D-170 · `foundations/decisions.md:3391-3403` D-188 ·
  `foundations/decisions.md:4034-4046` D-217 · `foundations/decisions.md:4834-4862` D-243 ·
  `foundations/decisions.md:4863-4881` D-244 · `foundations/decisions.md:4882-4909` D-245 ·
  `foundations/decisions.md:5075-5097` D-251 · `foundations/decisions.md:5421-5452` D-264 ·
  `foundations/decisions.md:5453-5494` D-265 · `foundations/decisions.md:5523-5551` D-267 ·
  `foundations/decisions.md:5552-5596` D-268 · `foundations/decisions.md:5743-5777` D-274 ·
  `foundations/decisions.md:5987-6011` D-282 · `foundations/decisions.md:6096-6121` D-287 ·
  `foundations/invariants.md:35-44` browser-view-framework ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:459-468` browser-view-token-values ·
  `foundations/invariants.md:1189-1198` document-test-memory-limit ·
  `foundations/invariants.md:579-588` node-test-selection ·
  `foundations/part_map.md:3-28` browser-view ·
  `foundations/glossary.md:130-134` manual map run · `foundations/glossary.md:142-147` solved map ·
  `foundations/glossary.md:199-209` trip plan, resurrection ·
  `foundations/glossary.md:217-221` earning loop ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/account-card.tsx` · `src/browser/view/character-screen.tsx` ·
  `src/browser/view/program-list.tsx` · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/view/controls/react-select-list.tsx` · `src/browser/view/headquarters.ts` ·
  `src/browser/view/trip-plan.tsx:195-220` · `src/browser/view/screen-address.ts` ·
  `src/browser/sim/programs.ts:346-372` · `tests/view/page-document.mjs` ·
  `tests/view/character-screen.test.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` (written first, failing) ·
  `npm test -- tests/quality/test_node_test_selection.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3 · Slice 4 · Slice 5 · Slice 6

## Plan's Choices and notes

The plan's *Choices* (plan.md lines 641-660) bind where your slice's *Read* names them. The orchestrator's notes at the end of plan.md (section "Orchestrator's notes") apply.
