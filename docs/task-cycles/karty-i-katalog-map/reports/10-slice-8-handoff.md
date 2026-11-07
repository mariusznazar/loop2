# Handoff - slice 8 (stage: make-change, "a slice, or the retry of a slice")

You make slice 8 of the plan of the task cycle `karty-i-katalog-map` (screen Mapy, card of a map, section "Kto idzie"). You are a fresh executor; the model class set for you by the plan is `same`.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human. A question you cannot settle from your reading goes back in your report with the status `questions`; an open design choice the code shows returns with the status `returned` and no code (see the method).

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; the slice's base is `ee2d0a254b02f92a4b10673e0e5b97799207d01c`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for a slice (a file the method names only when the step that names it comes). Its project skill is `the-way-make-change`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/10-slice-8-report.md`. Return only: status, your commits, a one-line check result naming what failed or did not run, and the report path. The report must hold each check with its command and exit code, the section **Searches not found or unclear** (items or `none`), the own-work check the method asks for, every reach beyond this handoff (what, where, why) and your questions and concerns.
- Commit on the task branch with `git add <path> ...` by path (never `git add -A`, `git add .` or `git commit -a`), in English in the form of this repository's commits (`feat: :sparkles: ...`, `test: :white_check_mark: ...`, `docs: :memo: ...`, `refactor: :recycle: ...`; see `git log` for the form), each message ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- The checks of your slice are the focused checks its section names, run as it names them; you run no full `npm test` (the orchestrator runs the gate). `npm test -- <one file>` runs exactly one file.
- Project rules: read `AGENTS.md`; the guideline files named in your slice's *Read* each whole.
- Product language: code, identifiers, comments and commit messages in English; game text, test names and guideline prose in the language of the files you change (Polish where they are Polish). Do not rewrite files into another language.

## Names of foundation entries since the plan was written

The foundation entries were written before slice 1 by the foundation step (commit `afe5920`). In your *Read*, "Settlement 1..6" and "(new) ..." entries have these identifiers: (new) What does the screen Mapy show? = D-325; (new) What does the game say before an earning loop that earns nothing? = D-326; Settlement 1 = D-327; Settlement 2 = D-328; Settlement 3 = D-329; Settlement 4 = D-330; Settlement 5 = D-331; Settlement 6 = D-332. Read each entry the section names whole, from its `### D-nnn` heading to the next `###` heading.

Current line ranges in `foundations/decisions.md` (they differ from the ranges in the copied section; the current ones hold; find an entry by its heading when in doubt): `D-36` lines 801-815 | `D-53` lines 1074-1095 | `D-55` lines 1115-1135 | `D-165` lines 3034-3048 | `D-170` lines 3114-3128 | `D-171` lines 3129-3143 | `D-207` lines 3719-3780 | `D-217` lines 4037-4049 | `D-243` lines 4837-4864 | `D-251` lines 5077-5099 | `D-264` lines 5423-5454 | `D-267` lines 5525-5553 | `D-277` lines 5849-5868 | `D-280` lines 5916-5963 | `D-281` lines 5964-5999 | `D-283` lines 6026-6044 | `D-284` lines 6045-6064 | `D-287` lines 6110-6137 | `D-323` lines 7027-7041 | `D-325` lines 7057-7071 | `D-326` lines 7072-7086 | `D-327` lines 7087-7101 | `D-328` lines 7102-7116 | `D-329` lines 7117-7131 | `D-330` lines 7132-7146 | `D-331` lines 7147-7161 | `D-332` lines 7162-7176.

## Your slice, copied word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`

### Slice 8 — Sending moves to the screen Mapy

- **Goal:** `src/browser/view/game-view.ts` builds the screen Mapy on entering `#/mapy` or
  `#/mapy/{map}` and disposes it on leaving, as it does Postać; it gives the screen the game state
  and the clock's moment at each change of the state and at each reading of the clock, so its
  resurrection lines move with real time (D-217); and it turns the screen's acts into the
  simulation's, each an act whose changed state is saved (D-207): `pick` into `pickProgram`;
  `enter` into the clock's send as „Wyślij” does today, after which Przejście opens with a new entry
  of the history and takes the focus (D-53 as written); `startLoop` into the clock's start of a loop,
  the player staying on the screen Mapy (To do 7); `stop` into `stopLoop`. `src/browser/view/menu-bar.tsx`
  holds „Mapy” between „Siedziba” and „Programy”, a link to `#/mapy`, marked on both addresses (To
  do 1, D-277). `src/browser/view/headquarters.ts` loses all that sends — the list „Program:”, „Mapa:
  …”, the sentences of the conditions, „Wyślij”, „Puść w pętlę”, the clipped-plan and rehearsal
  lines and the run sentence — with `mapLabel` and its file `tests/view/headquarters.test.mjs`; its
  rows keep the name, the generation, the archetype, the resurrection line, the loop line with
  „Zatrzymaj” and the line of a stopped loop. The cases of `tests/view/account-screen.test.mjs` that
  send from Siedziba drive „Kto idzie” instead, their expectations unchanged where the behaviour
  stands: the table of acts saved at once, the loop's start and stop, the inactive buttons with the
  run sentence, the rehearsal mark, a send leading to Przejście and „Zakończ” to Postać. New cases
  hold: the bar's „Mapy” leading to `#/mapy` and marked there and on `#/mapy/forest`; a reload at
  `#/mapy/forest` staying there; `#/mapy/forestDeep` before Las is solved, and a map the data lacks,
  opening Siedziba with the fragment replaced and no new entry; the acceptance criterion — a player
  with one character who picked nothing goes from Siedziba through „Mapy”, the row of Las and „Wejdź”
  to the screen of the map run in three clicks; „Puść w pętlę” leaving the player on the screen Mapy.
  Then the screen is checked in a real browser as `.claude/skills/loop2-play/SKILL.md` gives — the
  three clicks, the focus after each button, the link of the name, the two areas side by side and one
  under the other — and the report holds that state check: components, states, method, evidence.
- **Change:** `src/browser/view/game-view.ts` · `src/browser/view/menu-bar.tsx` ·
  `src/browser/view/headquarters.ts` · `tests/view/menu-bar.test.mjs` ·
  `tests/view/account-screen.test.mjs` · `tests/view/headquarters.test.mjs`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:29-34` To do, items 1 and 2 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:52-70` To do, items 5 to 8 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:75-77` Acceptance criteria ·
  `docs/task-cycles/karty-i-katalog-map/task.md:117-121` Questions to settle, question 7 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:134-143` Questions to settle, questions 10 and 11 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlements 3 and 4, (new) What does the screen Mapy show?, D-53, D-55, D-165,
  D-170, D-171, D-243, D-251, D-280, D-281 and D-287 as written · src/browser/view/maps-screen.tsx as
  slice 7 left it ·
  `foundations/decisions.md:801-815` D-36 · `foundations/decisions.md:1074-1094` D-53 ·
  `foundations/decisions.md:1114-1133` D-55 · `foundations/decisions.md:3113-3127` D-170 ·
  `foundations/decisions.md:3716-3777` D-207 · `foundations/decisions.md:4834-4862` D-243 ·
  `foundations/decisions.md:5421-5452` D-264 · `foundations/decisions.md:5523-5551` D-267 ·
  `foundations/decisions.md:5843-5862` D-277 · `foundations/decisions.md:5910-5953` D-280 ·
  `foundations/decisions.md:5954-5986` D-281 · `foundations/decisions.md:6012-6050` D-283, D-284 ·
  `foundations/decisions.md:6096-6121` D-287 · `foundations/decisions.md:7011-7025` D-323 ·
  `foundations/invariants.md:1229-1238` uncaught-failure-game-state ·
  `foundations/invariants.md:1189-1198` document-test-memory-limit ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/clock.ts` · `src/browser/view/screen-address.ts` ·
  `src/browser/view/character-screen.tsx` · `tests/view/page-document.mjs` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** same — it rewires `game-view.ts`, whose screens, clock, saving and address history hang
  together, and moves cases across a page test of 5,700 lines
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` (the cases of the three clicks and of
  the addresses written first, failing) · `npm test -- tests/view/menu-bar.test.mjs` ·
  `npm test -- tests/view/maps-screen.test.mjs` · `npm test -- tests/view/screen-address.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py` · the browser check of the Goal, through
  `npm run local` as `.claude/skills/loop2-play/SKILL.md` gives
- **Depends on:** Slice 7

## Plan's Choices and notes

The plan's *Choices* (plan.md lines 641-660) bind where your slice's *Read* names them. The orchestrator's notes at the end of plan.md (section "Orchestrator's notes") apply.
