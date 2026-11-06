# Slice 6 report — the guidelines know the scene

**Status:** done with concerns (the concerns are listed under *Problems observed* and *Searches not found or unclear*; none blocks the slice's checks)

**Task:** `scena-z-ludzikiem` · **Branch:** `task/scena-z-ludzikiem` · **Worktree:** `C:/Storage/repos/loop2-wt/scena-z-ludzikiem` · **Base for review:** `d2851be` · **Pinned the-way:** `61c72fb` (checked: `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` both show `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`)

## Commits

- `c6dd7c3` — `docs: :memo: tell the styleguide how the scene uses its roles and values, and list the scene's files in the two coding guidelines`

## Files changed

| File | Added | Removed |
|---|---|---|
| `guidelines/styleguide-browser-view.md` | 68 | 11 |
| `guidelines/coding-browser-module.md` | 2 | 0 |
| `guidelines/coding-content-data.md` | 1 | 0 |

Total: 71 added, 11 removed (from `git diff --stat` of the three files at `c6dd7c3`).

What changed:

- `guidelines/styleguide-browser-view.md`
  - *Roles* table: the meaning of `panel` names the badge over the mage's head; `highlight` names the bar's track; `text-strong` names the icon in the badge, with no text beside it; `positive` names the bar's fill (E7 and E8). No row was added and no role was added.
  - rule "Every background with its text": a sentence says that the bar's track (`highlight`) holds no text and that the rule does not say whether a track needs a text role.
  - rule "No value in place of a design token": the exemptions list now names the scene's geometry computed in TypeScript and the frames and positions of its pictures, and the icon in the badge drawn as a mask in `text-strong`; a paragraph says that `browser-view-token-values` lets the exemptions through, and names the motion timings and the two greys as values that stand in `src/browser/styles.css` and that the list does not name.
  - new rule "The scene of a map run" (after "Program editor", before "Examples"): Decision D-272, D-291, D-316, D-317, D-319, D-320, D-321, D-322, D-39, D-40, D-43; Invariant `none`; Good and Bad lines; the text says what the scene's files, badge, bar, motion, stops, greys, and the no-text, no-control, no-flash rule do, read from the code.
- `guidelines/coding-browser-module.md`: rows `src/browser/view/scene-picture.ts | copy | —` and `src/browser/view/scene.tsx | copy | —`, placed between `run-screen.tsx` and `screen-address.ts` (alphabetical order of the table).
- `guidelines/coding-content-data.md`: row `src/browser/sim/data/scene.ts | copy | —`, placed between `revelations.ts` and `skills.ts`.

## Checks run

1. `python -B .the-way/elements/common/foundation_check.py` — exit 0, output `0 errors`.
2. `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0, `Ran 4 tests … OK` (the runner is `python -B scripts/test.py` with the path argument).

Not run:

- `npm test` with no argument (the full gate). The handoff says the orchestrator runs it.
- `ui_check.md`: not read, because the slice changes no user interface and its step does not name it.
- Test-first, the failing run of a test, and mutation: not applicable. The slice changes prose only; no test was written or changed, and no invariant's test was changed.

## Own-work check (make-change section 3)

- **Requirement:** the styleguide's template says "Point to the values; write none into the styleguide" (`.the-way/product-guidelines/styleguide/template.md`, *Writing the file*). My first draft wrote the motion timings, the two filter values and the icon sizes as numbers.
- **Check:** `git diff -U0 -- guidelines/ | grep -E '^\+' | grep -n -E '[0-9]+ ?(px|ms)|grayscale|brightness|16|32|160|640|200'`, run on the added lines.
- **What it showed:** the first draft's values were found; I replaced them with pointers into `src/browser/styles.css` and their rules. The second run shows only decision identifiers (D-316, D-320 and similar, which match the digits `16`, `32` and `320`) and no values. The `3:1` contrast threshold of D-39 stays in the new rule, as the file writes its other thresholds (for example `4,5:1` in "Contrast of every pair").
- Both runs were made by me in this session; the first run's output is not kept as a file.

## Choices made (with the way rejected and its cost if wrong)

1. **Values pointed to, not written.** The styleguide names the timings and the greys and points to `styles.css`, as the template requires. *Rejected:* writing the values, as the handoff's wording "say what the code does" could be read. Cost if wrong: a reader opens `styles.css` for the numbers; no value is duplicated.
2. **Roles meanings grew, no new row.** *Rejected:* a new role for the badge or the bar; D-40 and D-39 give the meanings to existing roles. Cost if wrong: none for the table; the decision log already carries the meanings.
3. **New scene rule with Invariant `none`.** *Rejected:* an invariant for "no text, no control, no flash" — no cheap test checks it on a convention of the code, and the template gives `none` with the review as the check. Cost if wrong: the review must read the scene's rules by hand.
4. **Test sentence rephrased.** The handoff says `browser-view-token-values` lets the exemptions through "because they stand in TypeScript". I wrote what the test reads (`tests/invariants/test_browser_view_token_values.py`, its header): colours, font names, `px`/`rem`/`em` outside the layout dimensions, and the unitless kinds; the scene's frames and positions are percentages in TypeScript, which the test does not read; the icon's 16 px and 32 px are layout dimensions. *Rejected:* the bare "because in TypeScript" reason, which is not accurate because the test does read TypeScript string literals for colours. Cost if wrong: none for the checks; the sentence is more precise.
5. **Coding tables: rows only, status `copy`.** The coding template's *Files of this kind* has three columns and no description text (`.the-way/product-guidelines/coding/template.md`, lines 218–226), so the code's behaviour is not written there. *Rejected:* `do not copy` for `scene.tsx` (see the concern on the effect rule below). Cost if wrong: the next audit must change the row.
6. **Commit as one commit** for the three files, by path.

## Problems observed

- **Effect rule, not decided:** `src/browser/view/scene.tsx` has a `useLayoutEffect` with the dependency list `[pending, shown, frameWidth]`. It reads the browser's computed `translate` of the mage's element through a ref and sets state before paint. The coding rule "Efekty" in `guidelines/coding-browser-module.md` (D-267) says an effect that connects to a system outside React returns a cleanup function, and that an effect is for synchronising with such a system, never for transforming data for drawing. The effect has no cleanup, and whether reading the browser's layout counts as synchronising with it is a reading. slice-5 report (*Concerns*) raised the same reading. I did not decide it and did not mark the file `do not copy`. A reviewer or the human should settle it.
- **Contrast gap (outside the slice's listed items, not changed):** the rule "Contrast of every pair" says the bars in `positive` and `warning` add no pair because those roles already have 4.5:1 on the five backgrounds. The progress fill in `positive` on the track in `highlight` has the 3:1 threshold of D-39 instead, and that pair is not listed in the rule. My new rule states the 3:1 threshold, so the two rules now differ in text.
- **Pre-existing:** the Menu bar rule writes a pixel value ("najwyżej 1344 px"). It predates this slice; the template's "write none" rule would call it a departure. Not changed.

## Searches not found or unclear

- Whether a bar's track needs a text role: the rule "Every background with its text" does not say. I described what the code does (the track holds no text) and left the question open in the rule text.
- Whether the kitchen-sink page must show the scene: `guidelines/styleguide-browser-view.md` "The kitchen-sink page" says a new role or a new control goes on the page; the scene adds no role and no control, so I did not touch the page rule. Not decided.
- The coding template's *Files of this kind* has no place for a description; I did not find a rule for where code behaviour that is not a decision goes. Rows only.
- No styleguide-specific rule for the wording of the bar's contrast threshold was found outside "Contrast of every pair" (see the problems above).

## Reaches beyond the handoff

- `foundations/decisions.md` D-272, D-291, D-317 and D-321, each whole (awk from its heading to the next `### `): to cite them in the new rule's Decision. Not named by the handoff.
- `tests/invariants/test_browser_view_token_values.py` lines 1–60 (its header): to state what the test reads, see choice 4.
- `src/browser/styles.css` lines 466–480 and 1396–1630: the scene's rules, read to write the rule and check the code's claims.
- `src/browser/sim/types.ts` lines 179–191 (`Activity` is `rule` or `wait`; no combat activity): to confirm that the badge is absent in combat, as the handoff says. The combat check rests on `run.current` being absent in combat (`types.ts` line 260 comment), which I read but did not run.
- `docs/task-cycles/scena-z-ludzikiem/reports/slice-4-report.md` and `slice-5-report.md`, the *Choices* and *Concerns* sections only.
- `.the-way/product-guidelines/coding/template.md` lines 215–230 (*Files of this kind*) and `.the-way/product-guidelines/coding/kinds.md` lines 1–30: to confirm the row form and the status meanings.
- `guidelines/coding.md`, whole, as the handoff names it (no change needed).
- `C:/Storage/The Brain/The Brain/.ai/rules/git.md`, before the commit (the user's global rule).
- `.the-way/product-guidelines/styleguide/template.md`, whole, and both pinned `SKILL.md` files, as the skills name them.
- `guidelines/coding-browser-module.md` lines 200–326, which I had not read before the first grep; the whole file is now read.
