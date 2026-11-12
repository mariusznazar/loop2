# Merge report — task trzy-chwile-gdy-czas-stoi

**Status: done.** Merge commit `f6845995` (merge of `origin/main` `eb7cf5d8`, no further commit). Nothing pushed. The pin `.the-way` is unchanged: `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both give `55afa8e57aa1b83c77108576a36642722e0dda15`.

## Conflicted files (14 hunks)

- `src/browser/tokens.css` (1). Took main's lines for the tint and frost sources (no task name, no "question N of that task") and re-added my four lines (`--scene-chill`, `--scene-chill-opacity`, `--scene-speck-ember`, `--scene-speck-bronze`) in main's form: "Mariusz's choice, 2026-11-12, accepting as it stood the proposal shown to him on screenshots of the scene: …". Kept the colours, the description of each, the pixel addresses (14, 14) and (2, 15) of `Bonfire_03-Sheet.png` of the pack and the measured ratios. Dropped "(loop, commit cdc7c0d)" (it names the private repository of the old game; the new invariant `tracked-file-private-names` forbids it).
- `src/browser/styles.css` (2). Layers comment: my list (cold layer, specks, plaques) with main's reference to D-372 and no task names. Second hunk: kept my three blocks (cold layer, plaques, specks) and took main's wording of the motion comment; removed "task trzy-chwile-gdy-czas-stoi" and "the human at the request of the task" from my comments, now "Mariusz chose on 2026-11-12, accepting the proposal shown to him on screenshots" and "let through by Mariusz on 2026-11-12".
- `guidelines/styleguide-browser-view.md` (2). Value-source bullet: main's bullet for the earlier tint/frost choice, then my bullet reworded without the task's name ("zaproponowano na zrzutach sceny trzech chwil, gdy czas stoi, a Mariusz wybrał … 2026-11-12"). Scene rule: kept my paragraph and bullets on the three moments and took main's paragraph on the greys (it names the filter values).
- `tests/view/end-window-game.test.mjs` (2). Header comment: main's form with D-322 added; the case comments of my new tests now name decisions only (D-311, D-322, D-368), "To do N" and the task name removed. Main's D-371 comment line kept.
- `foundations/decisions.md` (7), each in main's form (Origin `none`, main's Rationale/Rejected) with this task's meaning carried in:
  - D-39: main's Verification and Rationale; added the plaque example, the violating example and the sentence of the plaque's frame in Rationale.
  - D-42: main's Rationale ("Four criteria are taken for now …", changed from "Three"), my flashing and plaque-frame sentences added; Verification with the four criteria, the flash examples; main's *Rejected* kept.
  - D-271: Verification violates (kept my speck and cold-layer clauses), Origin `none`.
  - D-311: *Verification* violates with the wait clauses, Origin `none`; *Rationale* is main's text with my sentence on the window opening after the effect and the accepted cost of the wait.
  - D-315: *Verification* with the speck added; Origin `none`.
  - D-322: *Verification* mine (the effects; the dead mage falls toward the middle); Origin `none`; *Rationale* is main's three sentences plus the sentences on the plaques, the cold layer, the last image and the accepted costs; *Rejected* is main's list without "a ready sheet of the mage's death" (row 3) plus the ways of the effects (loop, repeat, one sign, no frame, layer per cause, fall alone, specks with a walk, no effect for a completion, both moments together, scene alive during the effect). Binding text of D-322 and of the others merged by itself and was kept.

## Files merged by themselves, checked

`scene.tsx`, `scene-picture.ts`, `game-view.ts`, `world-area.tsx`, `run-screen.tsx`, `src/browser/sim/data/scene.ts`, `scene.test.mjs`, `scene-picture.test.mjs`, `scene-frost-contrast.test.mjs`, `environment_facts.md` and the rest main renamed. `git diff origin/main` on each shows only my additions plus the lines I replaced (the `data-facing`, the layering comment, imports); nothing of main's renaming was lost. Found and fixed: my comment in `scene.tsx` named the task ("D-322; task trzy-chwile-gdy-czas-stoi") and my test comments in `scene.test.mjs` and `scene-picture.test.mjs` carried "task To do N" and the task name — reworded to name decisions only. Typecheck and the four view test files confirm the merged code and tests agree.

## Reconciliations (item 3) and re-wordings (item 2)

- **D-317 and `wcag-three-flashes`.** Main's D-317 *Based on* quoted the 2.3.1 passage and two glossary passages straight from the W3C page. My fact `wcag-three-flashes` holds the 2.3.1 passage, and D-42 cites it. To keep one source for the criterion I replaced the first citation in D-317's *Based on* with `wcag-three-flashes` and left its two glossary quotations (not in the fact) as main wrote them. D-42 keeps the fact in its *Based on*, so D-42's settlement row (2.3.1 as the fourth criterion) is carried. No other text of D-317 changed.
- **Origin of D-322, D-311, D-271, D-39, D-42, D-315** — vault documents are gone; `none`, as main did for the others.
- **Token sources, comments, test titles, styleguide**: no task names, no vault notes, no private-repository references remain in my text (`grep` of `foundations/`, `src/`, `tests/`, `guidelines/`, `README.md` for "trzy-chwile", "vault", "_zadania", "cdc7c0d", "task To do" finds nothing of mine). The invariant `tracked-file-private-names` has method review; I reviewed my added text against it (the pack file names in the speck sources are the pack's own, not the old game's repository).

## Checks (command, exit code), one after another

- `python -B .the-way/elements/common/foundation_check.py` — 0 errors.
- `npm run typecheck` — 0.
- `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` — OK; `tests/invariants/test_design_token_sources.py`, `test_design_token_contrast.py`, `test_browser_view_token_values.py` — OK each.
- `npm test -- tests/view/scene.test.mjs` (62 pass), `scene-picture.test.mjs` (62), `scene-frost-contrast.test.mjs` (2), `end-window-game.test.mjs` (26) — each 0.
- `npx prettier --check` on `tokens.css`, `styles.css`, `scene.tsx`, the styleguide and the three test files — clean; `npx eslint src tests/view` — 0.
- Not run: the full gate; `test_loop2_container_sprites.py` (no sprite or data changed by the merge).

## Own-work check

The requirement most likely broken by a merge: that main's rules reach what this task added. I searched for task names, "To do", vault paths, repository names and commit ids in every file I touched, and re-read each resolved hunk of `decisions.md` for the three things the task's rows need (D-322 plays-once/last-image/cold layer/specks/end-in-discovery/only-effect-moves, D-311's window rule, D-42's fourth criterion with the plaque pair): all present, in main's form.

## Unread material

The 143 files main changed were not read one by one; I read the diffs of the files conflicting or touched by both sides, `invariants.md` (`tracked-file-private-names`, D-374 relation) and D-374…D-388 headings. The new decisions D-374…D-388 are not about the scene and were not read whole.

## Searches not found or unclear

none
