# Report 01 — the planner (stage: plan)

Status: `done with concerns` (guideline findings and reaches below; no open design choice, no reserved choice).

- Plan: `docs/task-cycles/proporcje-sceny-i-programu/plan.md` (six slices, no spec, base `01b26d54d1fea63de8570ca854814ff8e564048c`)
- Final size report: `docs/task-cycles/proporcje-sceny-i-programu/plan-size.md` — the last run of `python -B .the-way/task-cycle/slice_size.py` on that plan; every slice `fits` (largest: slice 2, 210687 estimated tokens against 250000, because `tests/view/account-screen.test.mjs` is 242 KB and a changed file counts whole; largest change count: slice 5, nine files against ten).
- No tracked file was changed (`git status` clean at the end); only the plan, the size report and this report were written under `.runs/`.

## The cut and why

1. **Slice 1, the rule list draws the rule panel under its row or header** (`rule-list.tsx`, `program-panel.tsx`, the stylesheet, two test files). The hosted path stays working, so both screens still run and their tests still pass after it.
2. **Slice 2, Programy** drops the third area (`game-view.ts`, stylesheet, `account-screen.test.mjs`).
3. **Slice 3, one scene size** (`world-area.tsx`, `run-screen.tsx`, stylesheet, `world-area.test.mjs`). It comes before the layout slice because the old grid rules are keyed by the scale and the layout slice rewrites those rules once, for one size.
4. **Slice 4, the screen of a map run** in two columns with the tabs area under the world, the screen no longer hosting the panel, always drawing the tabs (`run-screen.tsx`, `right-area.tsx`, stylesheet, three test files). The real-browser check is here.
5. **Slice 5, what the move leaves behind**: the host API of the program panel, the stubs, the words "right area", "beside the rows" and "scale" in comments and test names (nine files, one theme: no leftover).
6. **Slice 6, the styleguide** after the code.

The chain is linear because every pair of neighbours shares a file (`styles.css`, `run-screen.tsx`, `program-panel.tsx`). Splitting differently was tried and rejected for size: one slice for "the panel in place on both screens" would change ten or more files and read about 280 KB of tests (over the limit), and one slice for the layout plus the scene would mix two reviews in `styles.css`.

**No slice for the foundation.** The skill's form has the foundation entries written before any code by the cycle's foundation step; a slice has no code to check there. The plan lists the three rows and the nine changed decisions (D-280 read, unchanged) and slices read them by row. This answers the orchestrator's question: no separate "slice 1 base" for the foundation agent.

## Relation to the styleguide's order of work

The example ("Plan of a user-interface change", `guidelines/styleguide-browser-view.md:658-665`) is environment and library, then values in their source, then one screen, then its states. This change adds no token, no font, no control and no state; it moves a panel and the tabs inside existing screens. So the order departs from the example on purpose: code slices first (the screen is the unit), the styleguide text last, because it describes a made layout. Slice 1 is the smallest unit of "one screen" the panel's list gives.

## Guidelines found missing or uncertain

- `guidelines/coding-browser-module.md`, the table *Files of this kind*, has no row for `src/browser/view/end-question.tsx` (checked: every other file under `src/browser/view/` and `controls/` is in it). Slice 4 does not change that file; the omission is not mine to fix.
- `guidelines/styleguide-browser-view.md` has no rule for how a screen's areas are laid out (grid areas, the window width where columns stack); that lives only in the comments of `src/browser/styles.css`. The task changes only the places where the styleguide speaks of the old layout, so I did not plan a new rule; whether the next styleguide audit should hold one is for the human.
- `guidelines/styleguide-browser-view.md:399-402` ("dwa przyciski „Kronika” i „Teren” nad prawym obszarem ekranu przejścia, gdy nie stoi w nim otwarty edytor reguły") speaks of the right area too and the task's To do 5 does not list it. Slice 6 includes it.
- `guidelines/testing.md` says layout and real events are checked by hand in a browser (*Not tested on purpose*), so the layout slices carry a manual `loop2-play` check and no pixel test.
- The coding index (`guidelines/coding.md`) has no kind for CSS ("CSS nie ma własnego wzorca"); the stylesheet slices follow the styleguide's token rule and the invariant `browser-view-token-values`.

## Reaches beyond the handoff

- Decisions D-295, D-296, D-306 (read whole): the folded-group case and "opening another rule closes it" bear on where the panel stands. D-336 and D-43 (named by the handoff) bear only through the scroll of „Teraz”/„Potem” and the layout-dimension exemption; neither changes.
- `.the-way/product-guidelines/reading.md` and `.the-way/foundations/glossary.md` (the second one was asked for): the term *open design choice* decided that the folded-group case and the hosting are choices of how.
- Invariants read by line: `browser-view-framework`, `browser-view-token-values`, `browser-view-focus-outline`, `saved-program-edit`. The "every" invariants (runtime, typecheck, Express, blocked account, resurrection, minute split and the others) I looked at by name and skipped: none touches a screen's layout. Tests citing an invariant in the files the slices change: only `saved-program-edit` in `account-screen.test.mjs` (slice 2 is told to leave that case alone).
- Code beyond the handoff list: `game-view.ts` (the three places that build Programy and place its host), `chronicle.ts`, `tile-table.tsx`, `end-question.test.mjs`, `rule-signs.test.mjs` (they use the unplaced or the hosted panel), and `src/browser/kitchen-sink/**` (grepped for the panel, the areas and the scale: no occurrence).
- Commands run, all read-only for tracked files: `npm run typecheck`, `npm test -- tests/view/world-area.test.mjs` (21 pass, builds into the ignored `dist/`), `npx eslint` and `npx prettier --check` on two files, `python -B .the-way/elements/common/foundation_check.py` (0 errors at the base). I read `.runs/base-gate.log`: of 1994 tests one fails at the base, `tests/startup.test.mjs:109` "exits with an error instead of reporting ready when its listening port is occupied" (`spawnSync … ETIMEDOUT`), nothing in `browser-view`.

## Searches not found or unclear

- No decision of the log names the scene's display size or its scale. I searched `decisions.md` for "336 × 152", "672", "scale", "twice", "doubl". Only D-317 mentions "pictures scaled up". So Row 3 is a new entry or a clause in D-311; the foundation step decides which.
- The widths 526 px and 622 px are the task's arithmetic (content minus 706 px minus 16 px), not measurements. Slice 4's browser check measures the program column at 1280 px.
- The `loop2-play` skill needs an account made through the login card and a map run in progress; I did not run it. Slices 2 and 4 name the check and read the skill.
- Whether `foundation_check.py` validates the paths in the table of `coding-browser-module.md` is unclear to me (I found no test that reads that table); I kept the file name `right-area.tsx` partly for that reason.
- `.the-way`'s styleguide skill (`the-way-maintain-styleguide`) is named by `AGENTS.md` for "its named work"; I did not read it. Slice 6 is a text edit that follows from three decisions, planned for an executor, not for that skill.

## Concerns and questions for the orchestrator, each with a proposed answer

1. **The panel of a rule inside a folded group.** Nothing in the task or the foundation says where the panel stands when the group holding the open rule is folded (today the panel stands at the side regardless). The plan puts it under that group's header (*Choices*, row 2). Evidence: D-306 lists what closes the panel (✕, Escape, opening another rule) and a fold is not one; D-295 forbids unfolding on a drop. If you judge that this needs a sentence in the foundation (D-306 or D-295), it is an open design choice and a spec comes first; I judged it a choice of how, because it is one condition in one file and nothing stored depends on it. Proposed answer: keep as planned.
2. **The name `right-area.tsx` / `RightArea`.** It stays, though the area is now under the world. Renaming means editing the table of `guidelines/coding-browser-module.md`, the styleguide line 646 and a test file. Proposed answer: keep, and rename in a later task if wanted; the words inside the files change.
3. **The window width of two columns.** Plan: the program at least 320 px (the minimum Programy's editor column already has), so two columns from about 1074 px; the task gives no number. Between 1074 and 1276 px the screen is two columns where today it is one. Proposed answer: keep 320 px; Slice 4 recomputes the exact width from the stylesheet and states the arithmetic in the stylesheet's comment.
4. **Base gate has one failing test** (`tests/startup.test.mjs`, port occupied, timeout, exit 1 at the base). The cycle's final gate will show the same unless it is a flake of this machine; report it as failed at the base, not caused by the change.
5. **Slices 1 and 4 are `same`**, the rest `cheaper`. If you think the folded-group case or the grid is better on `strongest`, say so before dispatch; I think `same` holds both because the design is settled in the plan.
6. **The first slices cannot be checked in a browser until slices 2 and 4** (both screens still host the panel after slice 1). Slice 1 says so in its *Checks*; the browser checks are in 2 and 4.
