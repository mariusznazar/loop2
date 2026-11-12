PASS f6845995a22435aef862b69cdc3b1ad951d1d5f1

# Review 5 — the reconciliation with the target branch, task trzy-chwile-gdy-czas-stoi

Reviewed: the merge commit `f6845995` (first parent `dc42ad8e`, second parent `eb7cf5d8` = `origin/main`).
`git rev-parse HEAD` in the worktree is `f6845995a22435aef862b69cdc3b1ad951d1d5f1`, as dispatched. The tree of
`dc42ad8e` equals the tree of `23e22246` (`803ac3b4…`, `git diff --quiet` exit 0). Merge base of the two parents:
`20bcc58d`.

Verdict: no blocking finding. Two Minor findings, both within the task (introduced by the merge's resolution).

## Shape of the result (checked first)

- `git diff origin/main HEAD`: the same 16 files as the task's own diff `git diff 20bcc58d dc42ad8e`
  (README.md 2, assets/sprites/mage-death.png bin, foundations/decisions.md 118, foundations/environment_facts.md 6,
  guidelines/styleguide-browser-view.md 72, src/browser/sim/data/scene.ts 94, src/browser/styles.css 214,
  src/browser/tokens.css 6, src/browser/view/game-view.ts 48, run-screen.tsx 6, scene-picture.ts 138, scene.tsx 239,
  world-area.tsx 4, tests/view/end-window-game.test.mjs 177, scene-picture.test.mjs 282, scene.test.mjs 481;
  +1790 −97). No file outside the task's set differs from main; no file main changed is missing from
  `git diff dc42ad8e HEAD` (143 files).
- Line-by-line comparison of the task's diff before the merge (`20bcc58d..dc42ad8e`) with the task's diff after it
  (`origin/main..HEAD`), per file: the code of `scene.ts`, `game-view.ts`, `run-screen.tsx`, `scene-picture.ts`,
  `world-area.tsx`, `README.md`, `environment_facts.md` is identical; `scene.tsx` differs only in one comment (task name
  removed); `styles.css`, `tokens.css`, the three test files differ only in comments, titles of nothing, and `Source:`
  text; `styleguide-browser-view.md` in the value-source bullet; `decisions.md` in D-39, D-42, D-311, D-322 (*Rationale*,
  *Rejected*, *Origin*) and D-317's *Based on*.
- What main changed in the auto-merged files is comments only: a filter of `git diff 20bcc58d eb7cf5d8` to non-comment
  lines gives nothing for `styles.css`, `scene.tsx`, `scene-picture.ts`, `run-screen.tsx`, `world-area.tsx`,
  `scene.test.mjs`, `scene-picture.test.mjs`, `end-window-game.test.mjs`, and one test title in
  `scene-frost-contrast.test.mjs` ("the preview's measured 3.21:1" → "a measured 3.21:1"). So no auto-merged file can
  hold a changed behaviour; the merged code is the reviewed code of `23e22246` with main's comments.
- Main changed no binding sentence of D-04, D-62, D-122, D-132, D-212, D-283, D-316, D-317, D-319, D-320, D-367, D-369,
  D-372, D-373 (first paragraph compared at `20bcc58d` and `eb7cf5d8`, all equal).

## Findings

### Critical

none

### Important

none

### Minor

1. `guidelines/styleguide-browser-view.md:336-338` with `:357-361` — the intro of the list of value sources now
   miscounts. The merge took main's sentence "Źródło wartości ustalone z Mariuszem dla loop2, z dwoma rodzajami
   dołożonymi później: grubością belki i linii zakładki (2026-11-02) oraz wyglądem sceny (2026-11-11):" and put under
   it this task's bullet for a third later kind, the values proposed on screenshots of the three moments and chosen on
   2026-11-12. A reader of the rule "Every value with its source", which the review of a change to the token file uses
   to judge a `Source:` comment (the invariant test checks only that one is there, `:369-370`), reads "two later
   kinds" and then finds three. Main fixed exactly this kind of miscount ("z jednym rodzajem" at `20bcc58d`); the merge
   reintroduces it. No effect on behaviour or tests. Remedy: "z trzema rodzajami dołożonymi później: …, wyglądem sceny
   (2026-11-11) oraz kolorami trzech chwil sceny (2026-11-12):".
2. `foundations/decisions.md:7888` (D-322 *Rationale*) — the merge took main's opening sentence "a scene that moves
   while game time stands still would contradict the pause, which loop avoided on purpose." and dropped this task's
   continuation of it, "so only the effect of the moment moves, for a few seconds, and then the scene stands still on
   its last image" (at `dc42ad8e`). The *Rationale* now opens with an absolute principle and goes on to effects that
   move while time stands, the reason for the exception standing only implicitly in *Rejected* ("the scene alive while
   the effect plays — the world would move while game time stands"). Settlement row 6 is carried in full by the binding
   sentence ("nothing but the effect moves while it plays") and *Verification* ("the fire moving while the effect of a
   moment plays"), so nothing an agent compares a change with is lost; the loss is in the reasoning a later reader of
   the entry gets. Remedy: append ", so only the effect of a moment moves, for a few seconds" to main's first sentence.

## The questions of the dispatch

1. **Every point of *To do* and every settlement row is still carried, in main's form.**
   - D-322 (`decisions.md`, binding sentence, *Verification*, *Rationale* from `:7888`, *Rejected*): plays once, last
     image until „Wznów”/„Restart”/„Zakończ”, „Wznów” cuts the discovery effect, only the effect moves (fire, and the mage
     at a discovery and a completion, stand), plaques on `panel` framed in `discovery`, each icon once, things without an
     icon named by the band alone, fall in six frames toward the middle and grey, blue layer after a death of cold above
     the tint and under the frost, none after hunger or a fight, specks over the clearing over full gold, the end alone
     in the minute of a discovery, a redraw/reload/load and reduced motion show the last image (rows 1–6, To do 1–6, 8,
     10). *Rejected* is main's list without "a ready sheet of the mage's death" (row 3) plus this task's ways. *Origin*
     `none` (the vault documents are gone). Main's "The grey, the one loop gave a paused scene" is kept.
   - D-311 `:7337` binding sentence, *Verification*, *Rationale* (row 7, To do 7): window after the effect, at once where
     the scene shows the last image at once (entry, reload, load, reduced motion). D-371 `:9085` carries the wait.
   - D-39 `:960`: the plaque frame in `discovery` with 3:1 against `panel`, its examples, a *Rationale* sentence (To do
     11); main's *Rationale* kept whole.
   - D-42 `:1006`: four criteria with 2.3.1, „`condition-unmet` has no threshold”, the dark-bar sentence of *Rationale*,
     the plaque-frame pair, „four” in *Verification*, `wcag-three-flashes` in *Based on* (To do 12); main's "Four
     criteria are taken for now, and it is not known when the rest will be taken up" carries main's form.
   - D-271, D-315, D-371: the task's text is identical before and after the merge. Fact `wcag-three-flashes`
     (`environment_facts.md:240`) identical. Styleguide part "The scene of a map run" (`:610-757`) and "The end-of-run
     window" (`:788-799`) carry To do 13; README line 26 carries To do 14.
   - Nothing of main's rewriting is undone: no *Origin* names a document, main's longer *Rationale* of D-39 and D-42 is
     kept, the token and styleguide sources are main's form. Nothing of the task's meaning is lost (the one loss of
     reasoning is Minor 2).
2. **Auto-merged files hold together in meaning.** Main changed only comments and one test title in them (above), so
   meaning cannot have moved; I read the merged comments of `styles.css` (layers, the cold layer, plaques, specks, motion,
   stop rule), `scene.tsx` (header, moments), `scene-picture.ts` (`tintOf` "no decision gives the tint…", frost now cites
   D-372) against the task's code: no contradiction. D-372's frost (ragged, outline alone at the first pixel, over the
   tint) agrees with D-315/D-322 "the cold layer … under the frost"; D-373's smaller flame is untouched by the effects
   (the fire stands at every stop, and the stop rule pauses `.scene-fire img`, as the test "at its stop only the effect
   of a moment runs" checks). D-386 (load admits every state the game makes) has no bearing on the effects: a load
   carries no simulation events, so the scene shows the last image, as D-322 says.
3. **D-317 and the fact.** Within what the merge may do; not a finding.
   - The change is to *Based on* only (`decisions.md:7703`); the binding sentences, *Verification* and *Rationale* of
     D-317 are main's, unchanged. The quotation replaced is word for word the one the fact holds in its *Source*
     ("Web pages do not contain anything that flashes more than three times in any one second period, or the flash is
     below the general flash and red flash thresholds"), read the same day.
   - The template of decisions in the pinned the-way requires it: "*Based on* names … once the environment facts element
     has entries, an environment fact entry, by its identifier alone, for every citation that, once it stopped being
     true, would call the decision into question" (`.the-way/elements/decisions/template.md:44-49`). Once this task's
     fact exists, a second verbatim copy of the same criterion in D-317 is what that rule removes; keeping one source is
     form, not meaning. WAY-30 (`.the-way/foundations/decisions.md:823`) governs a change that contradicts a decision or
     changes its meaning; this changes neither, and the frozen task's "Bez zmiany" for D-317 (task.md:209-210) concerns
     what D-317 says, which is unchanged.
   - D-317's *Rationale* still rests on its *Based on*: "2.3.1 … forbids more than three flashes a second unless the
     flash is below the general flash threshold" rests on the fact; "no more than 25 % of any 10 degree visual field"
     rests on the glossary quotation of the general flash threshold, and "341 × 256" on its Note 1, both kept in
     *Based on* as main wrote them. The dispatch's premise that the 25 % rests on the fact alone does not hold.
   - Remedy: none needed.
4. **Main's rules reach what this task added.**
   - `tracked-file-private-names` (method review; `invariants.md:1288`), judged on the added text of all 16 files: no
     note, no folder of notes, no path on the author's disk, no task name, no file of the old game's private repository.
     The speck sources name `Environment/Structures/Stations/Bonfire/Bonfire_03-Sheet.png of the pack Pixel Crawler`
     (`tokens.css:92-93`): a file of the public pack, not of loop's repository; main itself moved the pack's terms off
     loop's repository to the pack's itch.io page (fact `pixel-crawler-terms`). "(loop, commit cdc7c0d)" is gone.
     Complies. D-362 complies for the same reasons.
   - D-82 and the testing guidelines' departure (`guidelines/testing.md:14-16`, `:80-104`): every added test comment
     names decisions only (D-311, D-322, D-04, D-122, D-271, D-273, D-315, D-316, D-317, D-368), none names a task, a "To
     do", a note or a document outside the foundation. The human's colour choice is held by decisions (D-271 "the colours
     of the tint layer and of the cold layer have their source in the human's choice"; D-322 *Rationale*), as D-82 asks
     of a human's judgement used as a source.
   - The styleguide's value sources (`:322-370`): the four `Source:` lines (`tokens.css:90-93`) give Mariusz's choice,
     2026-11-12, accepting the proposal on screenshots, and the pixel addresses (14, 14) and (2, 15) — in main's form,
     without task, question number or repository; the bullet `:357-361` describes them truly (its intro count is Minor 1).
   - *Origin* `none` on D-39, D-42, D-271, D-311, D-315, D-322 in the merged file.
   - "D-374's relation": D-374 in the foundation is "How short can an action shortened by bought branches be?"; main's
     relation is the invariant `action-duration-minimum` deriving from it. No bearing on this change (see Searches).

Trust boundary: `assets/sprites/mage-death.png` is the same blob at `23e22246` and at `HEAD`
(`2616df4a6713c6f2c3d2fe2a8ee971691d1bfd1c`); `git diff --stat 23e22246 HEAD -- assets/` is empty. The sprite
invariants (`sprite-file-content`, `loop2-container-sprites`, `sprite-credits`) name every file of `assets/sprites/`
and every file the scene's drawing asks for, which includes `SCENE_MAGES.elementalMage.death`; the merge changed none
of them. Pin: `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both `55afa8e5…`.

## Declined to judge

- D-317's two WCAG glossary quotations staying as URL quotations although the template line cited above would have
  them as environment facts — main's form, outside this task.
- D-322 *Rationale* "the lengths of the effects come from a choice of the human made on screenshots" beside
  `styles.css` "their durations were chosen by viewing the game and let through by Mariusz" — text unchanged by the
  merge since `23e22246`, reviewed in earlier rounds; outside the reconciliation range.
- Tests whose expected values are the scene data's own numbers (plaque places 56/22/120/265, 24 specks, the first
  speck at 104/112) under main's stricter D-82 — unchanged by the merge; the testing guidelines let a test of a game
  parameter use concrete numbers (`testing.md:91-93`); outside the reconciliation range.

## Checks

Run one after another in a separate checkout of `f6845995` (`git worktree add --detach .runs/review5-check f6845995`,
`.the-way` initialised at `55afa8e5`, `npm ci` exit 0), deleted afterwards (`git worktree remove --force`, prune; the
reviewed worktree's status stayed clean and its HEAD `f6845995`).

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `npm run typecheck` | 0 | |
| `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 | 1 test OK |
| `npm test -- tests/invariants/test_design_token_sources.py` | 0 | 2 tests OK |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 | 3 tests OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| `npm test -- tests/view/scene.test.mjs` | 0 | 62/62 pass |
| `npm test -- tests/view/scene-picture.test.mjs` | 0 | 62/62 pass |
| `npm test -- tests/view/scene-frost-contrast.test.mjs` | 0 | 2/2 pass |
| `npm test -- tests/view/end-window-game.test.mjs` | 0 | 26/26 pass |

Manual checks: the per-file comparison of the task's diff before and after the merge; the non-comment filter of main's
changes to the overlapping files; the binding-sentence comparison of 14 related decisions; blob and tree equality;
pin equality. No invariant test was changed by the merge. Not run (the orchestrator's): the full gate, the container
test `test_loop2_container_sprites.py`, prettier and eslint.

## Reaches beyond the dispatch

- WAY-30, `.the-way/foundations/decisions.md:823-860` — for question 3.
- `.the-way/elements/decisions/template.md:28`, `:44-49`, `:220-226` — what *Based on* and *Origin* hold, for question 3.
- `git diff 20bcc58d eb7cf5d8 -- foundations/environment_facts.md foundations/invariants.md` — to judge the pack path
  in the speck sources and to find what "D-374's relation" means.
- `git diff 20bcc58d eb7cf5d8 -- guidelines/testing.md` and D-82 at `20bcc58d` — what main's D-82 changed.

## Unread material

Selection by "Reading the foundation": touched parts browser-view, simulation (`src/browser/sim/data/scene.ts`),
build-tools (README), agent-workflow (`guidelines/`), product-foundation. 358 decisions name one of them in *Scope*.
**Read whole: 23** (D-39, D-42, D-43, D-82, D-271, D-272, D-311, D-315, D-316, D-317, D-319, D-320, D-321, D-322,
D-349, D-362, D-368, D-370, D-371, D-372, D-373, D-374, D-386). **By title only: 335** (all titles run through).
Decisions whose title points to a bearing and that were not read whole: D-04, D-62, D-122, D-132, D-212, D-283, D-367,
D-369 — their binding sentences were compared between `20bcc58d` and `eb7cf5d8` (unchanged by main), the rest of each
entry not read.

- `guidelines/styleguide-browser-view.md` (919 lines): read `:300-375` and `:605-804` and the whole task diff of it;
  the rest not read.
- `guidelines/coding.md`: searched for rules on comments only; `coding-browser-module.md`, `coding-content-data.md`
  not read (the merge changed no code, only comments).
- `guidelines/testing.md`: read whole.
- Invariants: read whole `tracked-file-private-paths`, `tracked-file-private-names`, `sprite-file-content`,
  `loop2-container-sprites`, `sprite-credits`; `design-token-contrast`, `design-token-sources`,
  `browser-view-token-values` not read (their tests run and pass); other invariants of browser-view and `every` not read.
- Part map: `foundations/part_map.md:1-142` (the touched parts) read.
- Glossary entries: not read.

## Searches not found or unclear

- The dispatch names "D-374 (how main's decisions relate)" and "D-374's relation"; D-374 is "How short can an action
  shortened by bought branches be?", and main's only relation to it is the invariant `action-duration-minimum` now
  deriving from it. No decision explaining how main's decisions relate was found; treated as without bearing.
- Whether the public download of Pixel Crawler holds `Environment/Structures/Stations/Bonfire/Bonfire_03-Sheet.png` at
  that path was not verified (no download); judged from the pack being the colours' source and loop's copy being the
  pack's own folder.
