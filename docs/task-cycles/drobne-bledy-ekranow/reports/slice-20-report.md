# Report — slice 20, cycle `drobne-bledy-ekranow`

## Status

`done` — the slice fixed nothing. Both numbers follow the rules; no file changed.

## Commits

none (range base `cf068a01135704578cf0ebf3d488dcac8799efd3` to head is empty; working tree clean).

## What the two numbers show (for the request, loop2#055-11)

Played locally in a real browser (Playwright CLI 0.1.22, `npm run local`, one game, one made-up
account at `example.test`).

Steps, as a player does:

1. Opened the start address (`https://127.0.0.1:64551`), pressed „Załóż konto”, filled address,
   password and „Powtórz hasło”, pressed „Załóż konto” under the fields.
2. In „Drużyna”, named the new character „Tester” (archetype Mag żywiołów) and pressed „Załóż”.
3. „Mapy” → row „Skraj lasu” → „Wejdź: Tester, mapa Skraj lasu”. The map run opened with an empty
   program (line „Czeka — żadna reguła nie pasuje”).
4. Paused, pressed „+ reguła” in the program: the default rule „Zawsze → Eksploruj” (20 min).
5. Set pace 16×, pressed „Wznów”. The run stopped by itself at a discovery at „Minuta 33 (pauza)”
   („Odkryto: Idź, Zbierz, Obchód, Patyk, Jagoda, drzewo umiejętności Eksploracja, drzewo
   umiejętności Zbieranie małych przedmiotów …”).
6. Read the line under the body row: **„Wprawa w tym przejściu: Eksploracja +1”**.
7. Pressed „Zakończ”. Because the copy of the program had an unsaved rule, the game asked
   „Zapisz / Odrzuć / Wróć”; pressed „Zapisz”. The screen Postać of the character opened
   („Umiejętności”).
8. Read the tree row: **„Eksploracja — poziom 1 · wprawa 0/15 · punkty 0”**.

The two numbers and the decision each follows:

- **„Eksploracja +1” during the run** — the line of the run shows practice gathered in the run, not
  practice paid (D-201: „Wprawa w tym przejściu: {umiejętność} +{n}”, listing the skills with
  positive practice gathered in that run). One exploration had ended in effect (D-193), so one
  practice is held at the run (D-194 holds it separately by skill at the run).
- **„0/15” after „Zakończ”** — the tree row shows the character's own saved practice
  (`character.skills[id].practice`) over the next threshold 15 of Eksploracja (D-199). The run did
  not reach a completion, and D-194 says a manual run pays its practice to its character only at
  the completion that first solves its map, and that „Zakończ” before completion leaves the
  character's practice as it was. So 0 is the correct figure; the +1 of the line was gathered at
  the run and was never paid. D-201 states this cost openly: the line does not itself say that
  „Zakończ” before completion loses the practice.

Code read agrees: payment stands in one place for a manual run, `src/browser/sim/game.ts` (around
lines 861-891: `paidPractice` only when `completed` and `!endedRun.solvedMapRun`); the line comes
from `practiceText(run.practice)` in `src/browser/view/character-skills.ts`, called from
`src/browser/view/world-area.tsx:71`; the tree row is `skillText` in the same file. Existing tests
already hold both rules: `tests/sim/skills.test.mjs` (D-194, „completion pays this minute's
practice once to the runner …; death and early exits pay nothing”) and
`tests/view/character-skills.test.mjs` („run practice omits zero values …”).

Whether the slice fixed anything: **no**. Practice is not lost against the rules; the difference
the reporter saw is the rule of D-194 against the wording of D-201 (the line does not say the
practice is unpaid until completion).

Console of the page after the play: only the two ordinary entries (401 for the account request
before sign-in, 404 for the favicon); no line beginning `uncaught`.

## Checks

| Check | Command | Exit code |
|---|---|---|
| Replay in a real browser | `loop2-play` steps above (`npm run local`, `playwright-cli`) | played as described; both numbers read |
| Focused test of the simulation (existing, not changed) | `npm test -- tests/sim/skills.test.mjs` | 0 (19 pass, 0 fail) — log `slice-20-skills-test.log` |
| Focused test of the view (existing, not changed) | `npm test -- tests/view/character-skills.test.mjs` | 0 (4 pass, 0 fail) — log `slice-20-view-test.log` |

A failing test first, `npx eslint` and `npx prettier --check`: not run — no file changed.
The full suite: not run (not mine).

## Own-work check

The requirement most likely missed: that practice is not lost in some other path of a manual run
than the one played (the slice judges two numbers from one game; a loss could hide in the
completion payment). The check: the existing test of D-194 in `tests/sim/skills.test.mjs`
(completion pays once to the runner; death and early exits pay nothing), run as above, exit 0;
plus reading the single payment site in `game.ts` (`completed && !endedRun.solvedMapRun`). I did
not replay a completion in the browser: a completion of „Skraj lasu” by playing was not part of the
slice's two numbers, and the simulation test covers it.

## Questions and concerns

- No question. One observation for the request, not a defect against the rules: after „Zakończ”
  before completion the screen Postać shows 0/15 with no hint that the line „Eksploracja +1” was
  gathered and not paid. D-201 accepts this by name (Rationale, „Accepted with it”). A hint would
  be a change of D-201, not a fix of lost practice; I changed nothing.

## Choices

- Chose to answer „Zapisz” at the question of the unsaved copy on „Zakończ”; „Odrzuć” would give
  the same practice (the question concerns the program, not the practice). Not replayed.

## Reaches beyond the handoff

- Read `src/browser/sim/game.ts:820-897` (the payment site) and `src/browser/sim/data/skills.ts:1-80`
  (the threshold 15 of Eksploracja), to tie both numbers to the code; read `src/browser/sim/skills.ts`
  and `src/browser/view/character-skills.ts` (the files of the slice's *Change*). Grep for
  `paidPractice|practiceText` over `src/browser`.

## Working copies

`.runs/slice-20/` (the log of `npm run local` and the two test logs) stood in the worktree; the two
test logs were moved to `reports/slice-20-skills-test.log` and `reports/slice-20-view-test.log`,
the directory removed. `.playwright-cli/` (snapshots, console logs) in the worktree root removed;
the browser session closed with `playwright-cli close`; the local start ended with
`npm run local:stop` („Local starts stopped: 1”). The database of the start under
`.runs/local-start/` stays by the skill's rule (the next start removes it). No screenshot was made
or pushed. No worktree or clone was made.

## Unread material

- Read in part: `foundations/decisions.md` D-191, D-193, D-194, D-199, D-201 whole (at the
  handoff's current ranges). Not read: D-417 (`1455-1520`) and D-420 (`1551-1565`), which the
  *Read* names for the play method; I followed `.claude/skills/loop2-play/SKILL.md` and did not
  need Playwright MCP.
- Not read: `foundations/invariants.md:214-235` (simulation-isolation, simulation-inputs),
  `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`, `src/browser/AGENTS.md`, `foundations/glossary.md:180-184` is read
  (practice) and `130-140` read — the guidelines and invariants were skipped because no file was
  changed.
- Read in whole: the handoff, `.the-way/task-cycle/change/SKILL.md`, `slice.md`,
  `loop2-play/SKILL.md`, `src/browser/sim/skills.ts`, `src/browser/view/character-skills.ts`.
- The task passages were given word for word in the handoff; the task file itself not opened.

## Searches not found or unclear

none
