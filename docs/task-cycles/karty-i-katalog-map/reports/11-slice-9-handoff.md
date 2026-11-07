# Handoff - slice 9 (stage: make-change, "a slice, or the retry of a slice")

You make slice 9 of the plan of the task cycle `karty-i-katalog-map` (screen Mapy, card of a map, section "Kto idzie"). You are a fresh executor; the model class set for you by the plan is `same`.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human. A question you cannot settle from your reading goes back in your report with the status `questions`; an open design choice the code shows returns with the status `returned` and no code (see the method).

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; the slice's base is `df293aa7b76295b7d1ad94426a2c38ff20622478`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for a slice (a file the method names only when the step that names it comes). Its project skill is `the-way-make-change`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/11-slice-9-report.md`. Return only: status, your commits, a one-line check result naming what failed or did not run, and the report path. The report must hold each check with its command and exit code, the section **Searches not found or unclear** (items or `none`), the own-work check the method asks for, every reach beyond this handoff (what, where, why) and your questions and concerns.
- Commit on the task branch with `git add <path> ...` by path (never `git add -A`, `git add .` or `git commit -a`), in English in the form of this repository's commits (`feat: :sparkles: ...`, `test: :white_check_mark: ...`, `docs: :memo: ...`, `refactor: :recycle: ...`; see `git log` for the form), each message ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- The checks of your slice are the focused checks its section names, run as it names them; you run no full `npm test` (the orchestrator runs the gate). `npm test -- <one file>` runs exactly one file.
- Project rules: read `AGENTS.md`; the guideline files named in your slice's *Read* each whole.
- Product language: code, identifiers, comments and commit messages in English; game text, test names and guideline prose in the language of the files you change (Polish where they are Polish). Do not rewrite files into another language.

## Names of foundation entries since the plan was written

The foundation entries were written before slice 1 by the foundation step (commit `afe5920`). In your *Read*, "Settlement 1..6" and "(new) ..." entries have these identifiers: (new) What does the screen Mapy show? = D-325; (new) What does the game say before an earning loop that earns nothing? = D-326; Settlement 1 = D-327; Settlement 2 = D-328; Settlement 3 = D-329; Settlement 4 = D-330; Settlement 5 = D-331; Settlement 6 = D-332. Read each entry the section names whole, from its `### D-nnn` heading to the next `###` heading.

Current line ranges in `foundations/decisions.md` (they differ from the ranges in the copied section; the current ones hold; find an entry by its heading when in doubt): `D-03` lines 39-51 | `D-36` lines 801-815 | `D-39` lines 846-860 | `D-40` lines 861-875 | `D-44` lines 921-935 | `D-51` lines 1031-1049 | `D-54` lines 1096-1114 | `D-184` lines 3342-3354 | `D-207` lines 3719-3780 | `D-217` lines 4037-4049 | `D-218` lines 4050-4066 | `D-244` lines 4865-4883 | `D-245` lines 4884-4911 | `D-246` lines 4912-4965 | `D-264` lines 5423-5454 | `D-265` lines 5455-5496 | `D-267` lines 5525-5553 | `D-268` lines 5554-5598 | `D-269` lines 5599-5624 | `D-282` lines 6000-6025 | `D-287` lines 6110-6137 | `D-323` lines 7027-7041 | `D-325` lines 7057-7071 | `D-326` lines 7072-7086 | `D-327` lines 7087-7101 | `D-328` lines 7102-7116 | `D-329` lines 7117-7131 | `D-330` lines 7132-7146 | `D-331` lines 7147-7161 | `D-332` lines 7162-7176.

## Your slice, copied word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`

### Slice 9 — Siedziba in React

- **Goal:** `src/browser/view/headquarters.tsx` replaces `src/browser/view/headquarters.ts`, which
  goes (To do 8, question 11), written after the exemplar `account-card.tsx` (D-36) with the boundary
  of `character-screen.tsx`: `createHeadquarters` takes the acts `create`, `stop` and `closeReport`
  and the props — the game state and the clock's moment — and returns `element`, `update(props)`,
  `focus()` and `dispose()`. Siedziba holds its heading; the report „Gdy cię nie było” or „Pętle,
  które stanęły” above „Drużyna” with „Zamknij” (D-246), drawn in React from the pure functions of
  `away-report.ts`, from which `createAwayReport` and its DOM go; the section „Drużyna” with its
  heading (D-282), and in it at each character its name as a link to its screen Postać, „pokolenie
  {n}” (D-218), its archetype, its resurrection line (D-217), its loop line with „Zatrzymaj” or the
  line of its stopped loop (D-244, D-245), „Drużyna nie ma jeszcze postaci.” for an empty team
  (D-51), and the creation of a character — its label, the field „Imię nowej postaci”, „Załóż” and
  `EMPTY_NAME_MESSAGE` under a name empty once trimmed — whose field keeps its text and its focus
  and whose button keeps its focus at every refresh of the game state; and the section „Skrzynka
  {n}/{cap}” with its lines or „Skrzynka jest pusta.” (D-184). Nothing in it sends a character, and
  no button at a character leads to the screen Mapy (Settlement 4). After „Zamknij” the focus goes to
  the heading „Drużyna” where the report leaves the screen, as today. The screen keeps the class names
  and accessible names `tests/view/account-screen.test.mjs` reads, so that file passes unchanged.
  `src/browser/view/game-view.ts` takes the new boundary and draws Siedziba's resurrection lines at
  each reading of the clock. `src/browser/styles.css` loses the rules only the sending of Siedziba
  used and keeps the others. A new test file on jsdom covers the screen's sections, the empty team
  and chest, the report and its „Zamknij”, the field and button keeping focus through an update, and
  the absence of anything that sends. Then Siedziba is checked in a real browser as
  `.claude/skills/loop2-play/SKILL.md` gives, and the report holds that state check: components,
  states, method, evidence.
- **Change:** `src/browser/view/headquarters.tsx` · `src/browser/view/headquarters.ts` ·
  `src/browser/view/away-report.ts` · `src/browser/view/game-view.ts` · `src/browser/styles.css` ·
  `tests/view/headquarters-screen.test.mjs`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:68-70` To do, item 8 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:139-143` Questions to settle, question 11 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:164-165` Context ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlement 4, D-282 and D-287 as written · src/browser/view/team-lines.ts as
  slice 4 left it ·
  `foundations/decisions.md:39-51` D-03 · `foundations/decisions.md:801-815` D-36 ·
  `foundations/decisions.md:846-875` D-39, D-40 · `foundations/decisions.md:921-935` D-44 ·
  `foundations/decisions.md:1031-1049` D-51 · `foundations/decisions.md:1095-1113` D-54 ·
  `foundations/decisions.md:3339-3351` D-184 · `foundations/decisions.md:3716-3777` D-207 ·
  `foundations/decisions.md:4034-4063` D-217, D-218 · `foundations/decisions.md:4863-4963` D-244,
  D-245, D-246 · `foundations/decisions.md:5421-5452` D-264 · `foundations/decisions.md:5453-5494` D-265 ·
  `foundations/decisions.md:5523-5551` D-267 · `foundations/decisions.md:5552-5596` D-268 ·
  `foundations/decisions.md:5597-5622` D-269 · `foundations/decisions.md:5987-6011` D-282 ·
  `foundations/decisions.md:6096-6121` D-287 · `foundations/decisions.md:7011-7025` D-323 ·
  `foundations/invariants.md:35-44` browser-view-framework ·
  `foundations/invariants.md:1229-1238` uncaught-failure-game-state ·
  `foundations/invariants.md:1189-1198` document-test-memory-limit ·
  `foundations/invariants.md:579-588` node-test-selection ·
  `foundations/part_map.md:3-28` browser-view ·
  `foundations/glossary.md:87-91` headquarters · `foundations/glossary.md:205-221` resurrection,
  generation number, earning loop ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/account-card.tsx` · `src/browser/view/character-screen.tsx` ·
  `src/browser/view/controls/react-text-field.tsx` · `tests/view/away-report.test.mjs` ·
  `tests/view/page-document.mjs` · `tests/view/account-screen.test.mjs:240-260` ·
  `tests/view/account-screen.test.mjs:2520-2570` · `tests/view/account-screen.test.mjs:2660-2870` ·
  `tests/view/account-screen.test.mjs:2895-2980` · `tests/view/account-screen.test.mjs:3337-3545` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/headquarters-screen.test.mjs` (written first, failing) ·
  `npm test -- tests/view/away-report.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/maps-screen.test.mjs` ·
  `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/quality/test_node_test_selection.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py` · the browser check of the Goal, through
  `npm run local` as `.claude/skills/loop2-play/SKILL.md` gives
- **Depends on:** Slice 4 · Slice 8

## Plan's Choices and notes

The plan's *Choices* (plan.md lines 641-660) bind where your slice's *Read* names them. The orchestrator's notes at the end of plan.md (section "Orchestrator's notes") apply.
