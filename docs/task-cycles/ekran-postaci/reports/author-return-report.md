done

# Author report — the return step, task `ekran-postaci`

Read for this step: the handoff `author-return-handoff.md` whole, `.the-way/task-cycle/skill/return_step.md`
whole, `.the-way/task-cycle/skill/foundation_step.md` (read whole earlier in this same session, for the
foundation step; the file is unchanged at the pin), the section *Return step* of
`.the-way/task-cycle/record_template.md`, and `.the-way/elements/decisions/template.md` (read whole earlier in
this session) for the pairs of examples.

## Return step

- **Foundation compared with code** (code at `7a10eaf0`):
  - D-445, D-446, D-447, D-199, D-40, D-271, D-272, D-418, D-201, D-215 against `character-screen.tsx`,
    `character-figure.tsx`, `character-status.ts`, `character-trees.tsx`, `character-skills.ts`,
    `world-area.tsx`, `character-screen.css`, `run-screen.css`, `archetypes.ts`, `scene.ts`, `credits.ts`,
    `credit-lines.ts`: the binding sentences match the code, the track in `text-disabled` included (D-40
    and the styleguide say so since fix 1). What no longer matched was in three *Verification* fields: their
    pairs of examples covered parts a test of the same change holds. Corrected:
    - D-445: the violation „a figure that walks while its character is in an earning loop” dropped — the
      screen test holds the idle sheet of the picture band in an earning loop;
    - D-446: the pair now covers only where the view takes the icon's file name (no test catches a name
      written in the view that equals the data's); the mask before the name and the file credited with
      its page on game-icons.net moved to the clause `tests:`, and the two icon cases of the elemental
      mage in `tests/view/icons.test.mjs` now carry their `decision: D-446` lines;
    - D-201: the role `text` of the line of a run that pays moved to the clause `tests:` (the world-area
      case of the roles holds it through the real stylesheet); the pair keeps the line standing after a
      completion, which no test holds.
  - The decisions of *Decisions in play* (D-389, D-419, D-200, D-192, D-217, D-218, D-244, D-245, D-287,
    D-282, D-280, D-243, D-52, D-27, D-189, D-246, D-416, D-39, D-44, D-38, D-396, D-421) against the code:
    match. D-218 says „pokolenie {n}” stands beside the name on Postać; it stands in the line under the name,
    as it did before this change, so nothing new departs from it. D-421: the figure's frames run by a rule
    of the screen's own stylesheet that names the shared keyframes, as the rules of `run-screen.css` do; the
    shared rule and its enumeration stay as D-421 gives them.
  - Entries found by the search for the change's words and places (practice bar and its colours, figure,
    status frame, archetype icon and credit, screenshots, practice line of a solved map's run): D-43 (frames
    and positions of a sprite, sizes of grid columns — the figure's geometry and the row's columns fall in
    them), D-42 (`text-disabled` has no threshold — no pair added), D-48, D-133, D-135 and D-368 (the header's
    and the end-of-run window's bars keep `highlight`, untouched), D-189, D-194 (the unpaid practice), D-418/D-419
    (screenshots pushed as they give); the styleguide's rules "The screen Postać", "Every background with its
    text", "No value in place of a design token", Roles; `guidelines/coding-browser-module.md`, example
    "Ekran w Reactcie: Postać" (still true: `branchText`, `loopLine`, „Kup” off while a map run stands): match.
  - Invariants reached: `icon-file-content`, `icon-credits` (*Rests on* holds `game-icons-cultist-title`),
    `loop2-container-icons`, `content-identifiers` (no archetype id or name in the view), `browser-view-token-values`,
    `browser-view-focus-outline`, `design-token-contrast`, `sprite-file-content`, `function-and-file-size`: match
    (their tests passed in the change and in fix 1; `loop2-container-icons` left to the gate, Docker).
  - Glossary: „practice”, „at the camp” (the status „W obozie” of D-447 is exactly that term's meaning),
    „archetype”, „manual map run”, „solved map”, „earning loop”, „completion”, „headquarters”, „character skill”:
    used in their meanings.
  - Part map: `browser-view` (`src/browser/view/**`, `assets/icons/**`, `src/browser/*.css`, `tests/view/**`,
    `tests/invariants/test_icon_*.py`) claims `character-figure.tsx`, `character-status.ts`,
    `character-trees.tsx` and `cultist.svg`; `simulation` (`src/browser/sim/**`) claims `archetypes.ts` and
    `scene.ts`; `product-foundation` (`foundations/**`) and `agent-workflow` (`guidelines/**`) claim the
    foundation and the styleguide; the foundation check reports no file claimed by no part. Match.
- **Decisions written or changed:** D-445, D-446, D-201 (their *Verification* fields only, commit `61f5ce35`).
- **Invariants written or changed:** none.
- **Environment facts:** none (the one source the change rests on outside the product, the title of the icon
  on game-icons.net, was written as `game-icons-cultist-title` by the foundation step).
- **Glossary terms:** none.
- **Part-map changes:** none.
- **Projected entries written whole or in part:** none (the plan item assigns none).
- **Rows of *Settlements to record* written:** none in this step; all 13 rows were written by the foundation
  step (1 D-272, 2 D-271, 3 D-445, 5 D-446, 6 D-447, 7, 8, 19 D-199, 9 D-40, 10 D-418, 4, 18, 20 the styleguide
  rule "The screen Postać").

The use of `text-disabled` for the track (the reviews' finding awaiting the human) and its lack of a contrast
threshold were written as no entry, as the handoff gives.

## Commits

Range `7a10eaf0..61f5ce35`: `61f5ce35` docs: drop from the pairs of D-445, D-446 and D-201 the parts their tests
hold … (D-445, D-446, D-201). Files: `foundations/decisions.md` (+13 −15), `tests/view/icons.test.mjs` (+2).

## Checks (command — exit code)

- `python -B .the-way/elements/common/foundation_check.py` — 0 ("0 errors"), after the decisions and after the
  test's lines.
- `npx prettier --check tests/view/icons.test.mjs` — 0
- `npx eslint tests/view/icons.test.mjs` — 0
- `npm test -- tests/view/icons.test.mjs` — 0 (41 pass)
- Not run: the full gate (the user's instruction for this cycle; the orchestrator's).

## Unread material

none — the handoff, `return_step.md`, the record template's *Return step*; `foundation_step.md` and the
decisions template were read whole earlier in this session, not again.

## Searches not found or unclear

- Unclear: D-218 says „beside a character's name” where both the screen before this change and after it set
  the generation in the line under the name; read as matching, since the change did not move it, and left.

## Working copies

`.runs/worktrees/ekran-postaci/.runs/author-return` (the log of the icons test) —
removed by its full path. Nothing kept in `reports/` beside this report.
