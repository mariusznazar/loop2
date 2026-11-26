Status: done with concerns

# Planner report — wyposazenie-postaci

- Plan: `docs/task-cycles/wyposazenie-postaci/plan.md`
- Size report: `docs/task-cycles/wyposazenie-postaci/plan-size.md`
  (last run of `python -B .the-way/task-cycle/slice_size.py`, exit 0: all 22 slices fit, eight of them
  "fits by ranges of" one long test file each: Slices 1, 4, 8, 10, 13, 14, 15 and 16)
- Commits: none
- Check result: the size script passed. No check of the product's gate ran; none falls to the planner.

## What the plan holds

- 34 foundation entries (F1–F34) written before slice 1. F1–F31 come from the task's projected
  entries, *Decisions in play* and the decision and sentence rows of *Settlements to record*.
  F32–F34 are the cycle's own: no row carries them (see Concerns).
- 22 slices: 1–4 and 6–8 in the simulation, 5 and 9–20 in the view, 11 in the styleguide, 21–22 in
  the balance instrument.
- Five slices touch a trust boundary and get a review of their own:
  - Slices 1, 4 and 8 — `src/browser/sim/saved-game.ts`;
  - Slice 9 — `assets/icons/**`;
  - Slice 10 — `src/browser/view/judging-cache.ts`.
- Model classes:
  - strongest — Slices 1, 3 and 4;
  - same — Slices 7, 8, 10 and 11;
  - cheaper — the rest.
- Screenshots for *To do* 10: Slice 20's agent makes them in both layouts and pushes them itself to
  `mariusznazar/screenshots`, directory `loop2/wyposazenie-postaci/`, branch
  `loop2/wyposazenie-postaci` (D-418, D-419). Its report gives each link in its commit with
  `?raw=true`.
- *To do* 15 — the progression check of Las — matecznik with a stick in the main hand: Slice 21's
  agent runs it and reports the share of seeds solved.

## Why so many slices

- Any slice that changes a file of `browser-view` reads about 297 000 characters of guidelines whole:
  - the styleguide, 164 KB;
  - `testing.md`, 86 KB;
  - the coding files and `src/browser/AGENTS.md`.
- That is about 120 000 of the 150 000 tokens a slice may read. So a slice that changes both a file of
  the simulation and a file of the view does not fit.
- Adding the condition „Puste” or the action „Załóż” to the types stops the build at two exhaustive
  switches of the view: `newCondition` in `program-editor.ts` and `goalOf` in `scene-picture.ts`.
  Slice 5 first gives those two switches a default, with no change of behaviour, so that the
  simulation slices change no file of the view.
- For the same budget reason the browser checks are grouped:
  - Slice 15 — the screen of a map run and its editor;
  - Slice 17 — the kitchen-sink page;
  - Slice 20 — the screen Postać.
- New tests go into new files, listed in `stryker.config.json` for the simulation, so that no slice
  must read a long test file whole.

## Relation to the styleguide's example of the order of work

The chain of the screen Postać follows the example's order:

1. the rules (Slice 11);
2. the shared control in its states, in `src/browser/styles.css` (Slice 16);
3. the kitchen-sink page (Slice 17);
4. the screen and its states (Slices 18–20).

Two departures:

- The step "values in their source" (tokens) is left out: the change adds no value, role or meaning.
- The line of the screen of a map run and the editor (Slices 12–15) come before the chain of the
  screen Postać. They add no control.

## Concerns

1. **F32 is a change of D-441 that no row carries.** Row 6 and F13 change D-440: a gear change the
   player makes erases the character's judgings, one it comes back with from a map run does not.
   To keep that true after a reload and on every device, the plan does three things:
   - the game state counts the player's gear changes at the character;
   - the stored judging holds that count;
   - the reading compares it — as D-441 already does with the generation number, its rationale being
     "the check at reading against the game state at hand gives the same answer after a reload, in
     another tab and on every device".

   This changes D-441's statement of what a stored value holds, and the version of the stored form.
   Section 2 of the method calls an entry beyond the rows an open design choice. I judged it a way of
   making what row 6 settles, by D-441's own pattern, and marked it the cycle's, so that the request
   puts it before the human.
   - The other way: the page removes the stored judgings at the act. It needs no new state, but a
     badge made on another device keeps lying, which D-441 was made to prevent.
   - Proposed answer: keep F32.
   - If the orchestrator judges it an open design choice, the plan is to go to a spec first. Only
     Slices 1, 2 and 10 depend on it.

2. **F33 and F34 — an icon for „Załóż”.** D-291 gives each action one icon. Sharing „Zbierz”'s hand
   would make „Załóż — patyk” and „Zbierz — patyk” look alike. So the writer of the foundation entries
   picks an icon on game-icons.net and records its title as an environment fact, and the invariant
   `icon-credits` gains that fact in *Rests on*. Picking the icon is a choice of look that no row
   makes.
   - Proposed answer: keep, as the cycle's entries shown to the human.

3. **The styleguide slice reaches beyond *To do* 11.** Slice 11 also changes:
   - the rule "States of shared controls" — the styleguide's own rule asks it for a new control that
     departs from the list of states;
   - the rule "The body row of a map run" — the gear line. Question 10's cost names "jego regułę w
     przewodniku stylu".

4. **Tests named as failing.** Slices 6 and 7 leave tests failing until a later slice, by name:
   - `discovery.test.mjs`, `data.test.mjs` and `saved-game.test.mjs` until Slice 8;
   - `icons.test.mjs` until Slice 9;
   - `program-editor.test.mjs` until Slice 13;
   - `rule-editor.test.mjs` until Slice 14.

   These are inferred from the test names and from how the tests assert the pick's lists and the
   discoveries, not proven by a run. Other tests that build a character or a combat result by hand
   may fail when the shape grows. The executors measure them on their base.

5. **Fixes outside a slice's *Change*.** A fault that a browser-check slice (15, 17, 20) finds in a
   file an earlier slice changed is fixed outside that slice's *Change* and named in its report. The
   mechanical check will show it as a mismatch.

6. **Size measure is an estimate.** `src/browser/sim/game.ts` stands at about 738 code lines of the
   800 that D-425 allows a file. This comes from my own count with comments and blank lines left out,
   not the rule's ESLint run. The invariant `function-and-file-size` reads "Violated: no", so no move
   slice is needed. The plan puts the gear logic in a new module, `src/browser/sim/gear.ts`, and
   Slices 1 and 3 run `tests/quality/test_function_and_file_size.py`.

## Guidelines found missing or uncertain

- **Reading budget.** The reading the guidelines require for any change of the view — the whole
  styleguide plus `testing.md`, about 250 KB — takes most of a slice's reading budget. It forces
  preparatory slices and keeps each view slice to one or two files. This is a fact about the
  guidelines' size, not a fault in their content, but it shapes every UI cycle.
- **Tables of files without new rows.** The tables *Files of this kind* list no row for files added
  since their last audit: `judging.ts`, `judging-record.ts`, `character-figure.tsx`,
  `character-trees.tsx`, and the new `gear.ts`, `data/gear.ts`, `character-gear.tsx` and
  `gear-lines.ts`. The guidelines say such files are no exemplar. Nothing to fix in this task.
- **Role of the empty slot's name.** The task calls it "pale"; no rule says which role that is. Slice
  11 chooses it among roles whose meaning holds it, and adds no new role.

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/SKILL.md`, lines 470–560: how a plan's foundation entries and slices are
  dispatched and reviewed, to fit the plan to them.
- `.the-way/task-cycle/skill/foundation_step.md`, its first part: whether a plan may name the cycle's
  entries.
- `.the-way/task-cycle/change/ui_check.md`: the screenshots of *To do* 10, as the handoff asked.
- `.the-way/product-guidelines/reading.md`, its first part: which guidelines a view slice must read.
- The docstring of `.the-way/task-cycle/slice_size.py`.
- Decisions read whole for the slicing:
  - D-213, D-425, D-409 and D-418 — where the saved document is handled, the rule of size, the acts
    that catch up time, and where screenshots lie;
  - D-419, its statement only — who pushes a screenshot.
- Decisions read through the index's full entries: D-386, D-26, D-147, D-241, D-376, D-428, D-150,
  D-444, D-212, D-245 and D-427.
- Part map entries `build-tools` and `agent-workflow`: `stryker.config.json`, the styleguide and the
  balance skill belong there.
- `.claude/skills/loop2-play/SKILL.md`, its headings only, to name it for the browser checks.
- `the user's rule file on scripts`, by the user's instructions, before the
  one-off counts in the shell.

## Questions still open

- Concern 1 (F32) — proposed answer: keep it as the cycle's entry. Evidence: D-441's rationale quoted
  there.
- Concern 2 (F33, F34) — proposed answer: keep. Evidence: D-291's reason that the action's sign tells
  „Idź — patyk” from „Zbierz — patyk”.

## Unread material

- **`.runs/orchestrator/decision_index.md`** — read in part. I read:
  - the headings of its section "Listed in full", lines 1–782;
  - the full entries of D-386, D-26, D-147, D-241, D-376, D-428, D-150, D-444, D-212, D-245 and
    D-427.

  Not read: the section "Listed by heading alone".
- **Invariants whose *Part* names `simulation`, `browser-view`, `balance-tools` or `every`, read by
  their title in `invariants_parts.txt` only:**
  - browser-view-framework, loop2-api-error-route, loop2-one-serving-process;
  - application-build-output, application-package-layout, application-build-layout;
  - loop2-container-isolation, loop2-distinct-address;
  - eslint-source-rules, ruff-source-rules, shellcheck-source-rules, prettier-source-format,
    ruff-source-format, shfmt-source-format;
  - node-test-selection;
  - player-self-registration, player-password-login, email-verification-nonblocking,
    player-opaque-session-cookie, loop2-shared-public-origin;
  - account-client-requests, account-client-outcomes.

  Every other invariant of those parts was read whole, from `foundations/invariants.md` lines
  165–557, 848–1087 and 1148–1477.
- **Environment facts the entries link to: not read.** Examples are the WCAG facts,
  local-storage-lasting and android-touch-target-size. I saw only `game-icons-dodge-title` and
  `screenshots-repository-readers`, through a search.
- **D-419** — its statement only.
- **The code — read in part, as far as needed to name files and ranges:**
  - read whole: `types.ts`, `combat.ts`, `data/items.ts`, `data/actions.ts`, `data/conditions.ts`,
    `character-screen.tsx`;
  - read in parts: `program.ts` lines 160–539, `saved-game.ts`, `game.ts`, `run.ts`, `loop.ts`,
    `judging.ts`, `understanding.ts`, `scene-picture.ts`, `combat-line.ts`, `program-editor.ts`,
    `chronicle-entries.ts`, `now-lines.ts`;
  - seen only through searches and by their structure: the tests and the balance files.

## Searches not found or unclear

- **`tests/view/icons.test.mjs`:** whether its case "each action of the data names an icon and its
  title, and the icon file exists" fails while the file is missing. Inferred from the name, not read.
- **Tests that build a character, a map run's character or a combat result by hand:** which of them
  fail when those gain fields. Not searched in full; left to each executor's measure on its base.
- **Other places of the view that break the build at a new kind:** a search for `switch` on a kind
  and for `Record<…kind…>` found only `newCondition` and `goalOf`. A narrowing of a type that breaks
  elsewhere stays possible.
- **The role of the "pale" name of an empty slot:** not settled by the task. Left to Slice 11.
- **Which icon of game-icons.net suits „Załóż”:** not searched. Left to the writer of F33.
- **Whether the rule-panel's pick of an item target is generic enough for „Załóż”:** not read in
  `item-target-pick.ts`. Slice 14 names that file in its *Change* in case it is not.

## Working copies

- My working directory was `.runs/planner/` under the task's worktree, i.e.
  `.runs/planner/`.
- It held two files: a list of the line ranges of the decisions, and the first output of the size
  script.
- I removed it with its full path before returning. No worktree, clone or screenshot was made, and
  nothing remains.
