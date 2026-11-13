# Handoff — the one author, whole change

You are the one author of a the-way task cycle. The person who requested this cycle delegated the
intermediate choices to the orchestrator; nothing here is that person's approval.

- Worktree (work only here, from its root): `the worktree's root`, branch `task/progi-drzew-walki`.
- Base commit: `1b0c8ad4466fdd6d067da7bbc27b10458d81012b` (`origin/main`). The pinned the-way is `.the-way` in the worktree.
- Method: `make-change`, by the path `.the-way/task-cycle/change/SKILL.md` in the worktree (the project skill `the-way-make-change` points to it); read it whole. Your variant: **"the whole change as the one author"**. Read each file the method names only when the step or variant that names it comes.
- Stage and boundary: you make the whole change with its tests and its foundation entry, commit it, write your report and return. You do not run the product's full gate (`npm test`); the orchestrator does. Run only the focused checks of your change (one test file at a time: `npm test -- <file>` runs exactly one file; see `scripts/test.py`). Never start the next stage, never ask the human; questions go to the orchestrator in your report/status.
- Report path (write the full report here): `docs/task-cycles/progi-drzew-walki/reports/author-report.md`. Return: status, commits, one-line check result, the report path. The report must hold **Unread material** and **Searches not found or unclear** (`none` is an answer) and your own-work check, as the method gives.
- The answers of the orchestrator's step 4: no trust boundary touched (`src/browser/sim/saved-game.ts` is not changed); no irreversible operation; no open design choice; no reserved choice; one author without a plan.
- Foundation step: this change writes the entry D-379. Read `.the-way/task-cycle/skill/foundation_step.md` whole when you write it, and use the project skill `the-way-record-decision` (its `SKILL.md` whole) to change D-379 in `foundations/decisions.md`; never edit that file by hand. Where its *Change made by this task* line below says what the entry becomes, the entry must carry exactly that, with its *Verification* complies/violates examples updated to the new numbers (the example „Mocniejszy cios” at its third rank doing 12 damage must become its fourth rank doing 14). The *Rejected* and *Rationale* of the entry take the settlements below; keep the entry's existing structure and language (English prose, Polish game names in „…”).
- Other the-way rules for this work: read `AGENTS.md` of the worktree; follow `guidelines/coding.md`, `guidelines/coding-content-data.md` and `guidelines/testing.md`, each whole (the change touches only the part `simulation`: `src/browser/sim/data/skills.ts` and tests in `tests/sim/`). Git: commit by explicit paths (`git add <path>…`, never `-A`/`.`), messages in English in the form of the repository's recent commits (`git log -10 --oneline`), several commits allowed; do not push, do not merge, do not change `.the-way`.
- Foundation to read (by identifier, each whole in `foundations/decisions.md`): D-379 (the entry you change), D-191, D-199, D-18 and any other decision your own search of the log finds for the part `simulation` that bears on the numbers of skills. The glossary and invariants: read those your own work reaches by "Reading the foundation" (`.the-way/elements/common/way_of_working.md`).

## The frozen task

Whole task, file `docs/task-cycles/progi-drzew-walki/task.frozen.md` in the worktree (read it whole). Its *To do*, word for word:

1. „Walka bronią jednoręczną” daje poziom i punkt przy 15, 40, 100 i 300 wprawy, w miejsce dzisiejszych 30, 90 i 200.
2. „Mocniejszy cios” ma cztery stopnie, każdy za 1 punkt i +2 obrażeń ciosu patykiem, więc wykupiony w pełni daje cios za 14 obrażeń, w miejsce dzisiejszych trzech stopni i 12 obrażeń.
3. „Kopanie” daje poziom i punkt przy 10 i 30 wprawy, w miejsce dzisiejszego jednego progu 20.
4. „Cięższy kop” ma dwa stopnie, każdy za 1 punkt i +1 obrażeń kopnięcia, w miejsce dzisiejszych trzech.
5. „Unik przed ciosem” daje poziom i punkt przy 4 i 15 wprawy, w miejsce dzisiejszych 10 i 30.

The *Decisions in play* entry D-379 and its *Change made by this task*, word for word:

> Change made by this task: „Walka bronią jednoręczną” at 15, 40, 100 and 300; „Kopanie” at 10 and 30; „Unik przed ciosem” at 4 and 15; „Mocniejszy cios” prices 1 · 1 · 1 · 1; „Cięższy kop” prices 1 · 1. The numbers of the three combat trees and their two branches are no longer the old loop game's: they are set lower so that the points of combat can be earned on the first maps with combat, and are to be corrected either way when more maps are balanced. Accepted with it: once progress carries over between versions of the game, lowering this generosity takes points from players. Rejected: the old game's combat numbers kept and watched through a count of blows, kicks and dodges in the measurement of each new map — the combat trees nearly dead in the first weeks; thresholds about four times lower (6 · 20 · 50, 5, 3 · 8) — too generous; a fourth threshold kept for a future branch — a free point with nothing to buy; a fourth threshold dropped; „Cięższy kop” keeping three ranks on two points — the branch never fully bought.

The task's *Context*, word for word where it bears on the work:
- Thresholds stand in `src/browser/sim/data/skills.ts:38-48`, the combat branches in `:157-180`, and the test that expects today's thresholds in `tests/sim/skills.test.mjs:113-115`.
- A branch has one effect per rank (`effect.amount` times the number of ranks), and the number of ranks is the length of the list `costs`, so the fourth rank of „Mocniejszy cios” is one more price in the data.
- The screen Postać shows the rank and the highest rank of a branch from the data (D-199) — so the `preview` of a branch must stay coherent with its ranks.
- The saved-game reader refuses a rank above the number of prices of its branch (`src/browser/sim/saved-game.ts:411`); „Kopanie” today gives one point at most, so no save holds „Cięższy kop” above its first rank, and the two ranks after the change contain it.
- Settlement rows to record: none. Out of scope: none.

## What the change covers (for you to find in the code, not to widen)

All the places where the old numbers are expected: `src/browser/sim/data/skills.ts` (thresholds of `oneHandedCombat`, `kicking`, `dodging`; costs of `strongerStrike` (four ranks) and `heavierKick` (two ranks)), the tests that expect them (`tests/sim/skills.test.mjs` — the table of thresholds near line 113 and the combat tests near 458–535 that use rank 3 / 12 damage / practice 200 — plus any other test in `tests/sim/`, `tests/view/` or `tests/` that your search finds fails or holds the old numbers, e.g. fixtures that hold `strongerStrike: 3`), comments and wording in the repository that cite the old numbers, and D-379. Do not change `saved-game.ts` or the `.the-way` pin, and do not add a feature.

A test you write or change gets its expectation from the task / decision (D-379), not from the code's output. Add or extend a test so that: each new threshold gives its point at exactly its amount and not one below (the existing table test), „Mocniejszy cios” bought to its fourth rank gives 14 damage and its fifth purchase is refused, and „Cięższy kop” has two ranks and the third purchase is refused.
