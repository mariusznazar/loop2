# Return step report — task `scena-z-ludzikiem`

**Status:** done.

**Commit** (branch `task/scena-z-ludzikiem`, on top of `6ee3c4d`, by path, English message):

- `81f6f08` — `docs: :memo: name the fibre and the berry action in D-318 as the game does, "fibre" and „Zjedz — jagoda”, not "the flax" and „Zjedz”` (file: `C:\Storage\repos\loop2-wt\scena-z-ludzikiem\foundations\decisions.md`, 3 lines changed in D-318).

Worktree clean after the commit. Pinned the-way `61c72fb` (gitlink and checkout agree, checked at the start). Author address of the commit: `mariusznn@gmail.com` (as the repository expects).

**Check:** `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors", run before and after the commit. Run no gate and no other test, as the handoff says.

## Foundation compared with code

Method: the code of the scene (`src/browser/sim/data/scene.ts`, `src/browser/view/scene-picture.ts`, `scene.tsx`, `world-area.tsx`, the `run-screen.tsx` diff, the scene's rules in `src/browser/styles.css`), `tests/invariants/test_loop2_container_sprites.py` and the case citing the invariant in `tests/view/scene-picture.test.mjs:450`, the README sentence, and the six PNG files' traces in `slice-1-report.md`, read against each entry whole.

**Entries the change writes or changes**

- **D-316** (what the scene shows and draws from) — matches. Props always (`sceneDrawing` lists `SCENE_PROPS` regardless of the tile), fire only when `run.campfires` holds one on the character's tile (`fireOf`), burning = `minutesLeft > 0` (as the glossary's "extinguished campfire"), extinguished = `grayscale(1) brightness(0.55)` and no frames animation (`.scene-fire[data-burning="false"]`), motion by CSS at 160 ms frames, no timer or animation frame in the scene's code. Scope `browser-view · simulation` fits the data file in `src/browser/sim/data/`.
- **D-317** (reduced motion, no flash) — matches: all animations and the bar's transition stand inside `@media (prefers-reduced-motion: no-preference)`; no filter animates. Its title promises durations its body does not hold (review M1): task 20 completes the entry; unchanged.
- **D-318** (where the mage goes) — two words no longer matched the data and are corrected (below). Otherwise matches `goalOf`: `gather`/`patrol` to the prop of the resource, the three campfire actions to `SCENE_FIRE.mageAt`, `explore`/`wander`/`walkTo`/`walkToCampfire` to `SCENE.rightEdgeX`, a wait to `SCENE.clearingX`, `lightItem`, `eat` and the combat actions stay, a resource with no prop (fibre) stays.
  - *Corrected:* "the flax" (review M4) — the resource is `fiber`, named „włókno” (`src/browser/sim/data/resources.ts:19`), "flax" is only the name of its icon; the rest of the foundation says "fibre" (`decisions.md` lines 2184, 2206, 6171). Now: „Zbierz” and „Obchód” with fibre as the target.
  - *Corrected:* „Zjedz” — the action's label in the data is „Zjedz — jagoda” (`src/browser/sim/data/actions.ts:144`); the entry named „Zjedz” in the binding sentence and in one *violates* example. Now „Zjedz — jagoda” in both.
  - *Left, a finding for the request (review M7):* the entry says the mage "stays where it stands"; the code keeps the place of the previous reading, so a walk under way finishes at its old place (`scene.tsx` `placeOf`; at 16× a mage that starts „Zjedz — jagoda” while running to the sticks goes on to the sticks). Neither side is mine to change: writing the entry to the code would give row 2 another meaning (the foundation step forbids it), and the code is outside this stage. The orchestrator keeps it for the request and the human's viewing at 1×, 4×, 16×.
- **D-319** (the walk) — matches: `scene-walk` 640 ms linear, frames `calc(var(--frames) * 160ms)` in `steps`, a turn starts from the offset the browser reports (`reachedX`), a first draw (a load included) and a `mapRunStarted` event place the mage at once, reduced motion leaves no walk animation and no frames. The slice-5 follow-up case (a scene hidden and shown again within 640 ms of a walk's start replays the walk, review M6) is a code finding, not an entry mismatch: no entry says what happens to a hidden scene.
- **D-320** (the badge) — matches: `.scene-badge` on `var(--panel)`, `.action-icon` mask in `var(--text-strong)`, `.scene-badge-fill` in `var(--positive)` on `var(--highlight)`, none while waiting (`badgeOf` returns null for `wait`), none in combat (`run.current` empty), none after a death or a completion; the bar's transition only while `data-standing="going"` and only without reduced motion. The icon is `ACTIONS[kind].icon`, the action's, never the target's (D-291).
- **D-321** (no click) — matches: `aria-hidden`, empty `alt`, `draggable={false}`, no handler but `onAnimationEnd`, no focusable element.
- **D-322** (time stands still) — matches: `.scene[data-standing="paused"]` → `grayscale(1) brightness(0.5)`; `standingOf` orders death, completion, discovery, pause; `.scene:not([data-standing="going"]) * { animation-play-state: paused }` holds the fire, the frames and the walk at all four stops; the discovery keeps its colours; death greys only `.scene-mage-sprite` (`grayscale(1) brightness(0.55)`), completion leaves the mage in colour.
- **D-04** (the exception for the scene) — the binding sentence matches what the code keeps: the scene's own record `{ x, from, facing, walk }` and the events (`mapRunStarted`); nothing enters the game state or the save. The foundation report's concern 3 (does the code read events) is answered: yes, `mapRunStarted`, so the exception is not wider than the code needs. *Judgment, no edit:* the scene also reads the `translate` the browser has reached on the mage's own element (`reachedX`), a source D-04's list does not name. I read it, as the whole-change review did, as the state of the CSS motion that D-316 makes the scene's source of motion, not as a further input of the game's picture; naming it in the binding sentence would widen an approved decision beyond what the task carries (WAY-30), so I did not write it. The *complies* example "the scene comparing the game state it is given with its previous reading to find … the start of a map run" describes a way the code does not use (it uses the events); an example that complies, not an untruth, left.
- **D-39** (`positive` as the fill, track `highlight`, badge `panel`, ≥ 3:1) — matches; `positive` on `highlight` is 6,02:1 at today's values (task, *Context*); `warning` stands in no bar.
- **D-40** (badge on `panel`, track `highlight`, icon `text-strong` though no text) — matches the stylesheet.
- **D-43** (geometry of the scene, frames and positions of a sprite, the icon of the badge in `text-strong`) — matches after the fix of review I1 (commit `6ee3c4d`): the code gives every place and frame as a percentage from TypeScript (`percent()` in `scene.tsx`), the stylesheet holds no `px` of a sprite; the only lengths are `height: 16px/32px` of the icon (a layout dimension) and `calc(var(--bar-width) * 2)`.
- **D-122** (the scene keeping its colours) — matches (`data-standing="discovery"` has no filter). The sentence of *Accepted with it* about a stop at a discovery and the pause is left untouched, as the handoff says (task 16).
- **D-271** (the character is the pack's mage) — matches: `mage-idle.png` and `mage-run.png` are the pack's Wizzard sheets re-composed to 64 × 64 frames; the Rationale's "the game's only archetype" is true (`src/browser/sim/data/archetypes.ts` has `elementalMage` alone, and `SCENE_MAGES` is `satisfies Record<ArchetypeId, …>`). The other four files trace to Pixel Crawler (`slice-1-report.md`: exact matches for sticks, bush and moss; fire by frames with a one-pixel shift), as the README sentence says.
- **Invariant `loop2-container-sprites`** — matches: *Method* `test`; `tests/invariants/test_loop2_container_sprites.py` builds the image, serves each `assets/sprites/*.png` at `/sprites/<name>` and compares bytes; the companion case `tests/view/scene-picture.test.mjs:450` cites it (`// invariant: loop2-container-sprites`). The foundation report's concern 1 (the test not yet written) is closed. Its departure from the approved definition (review M9) is the plan's explicit choice; unchanged.

**Entries the task names (*Decisions in play*, `task.frozen.md:166-218`), each read whole**

- **D-272** — "as the scene" stands; code: no text on or over the scene, the badge holds an icon and a bar, no sentence. Matches.
- **D-311** — "the scene" first in the world, then the paragraph of the last encounter: `world-area.tsx` order unchanged. Matches.
- **D-314, D-315** — the background is still a picture of the forest (`forest-scene.png`) and stays in full light; the statement "the background … is a still picture" is about the background, which is still true. No layer exists yet (task 18). Match.
- **D-62, D-132** — "the screen stays on the state of the game minute"; the scene after a death/completion draws that state with its motion held. Match; D-322 derives from both.
- **D-68** — the extinguished fire stays on its tile; the scene draws it still and grey (D-316). Matches.
- **D-212** — a loaded map run comes back paused; the scene's first draw puts the mage at its place at once and the grey comes from `state.paused`. Matches.
- **D-291** — "over the mage's head" is already in the binding sentence; code uses the action's icon. Matches.
- **D-254** — the human's viewing stays (Acceptance criteria); the scene's motion was read by the agent from frame streams only. Matches (nothing to correct; the viewing is the request's).
- **D-18** — pictures, sizes, places and the mage's sheets stand in `src/browser/sim/data/scene.ts`; `content-identifiers` passed in the whole-change review. Matches.
- **D-273** — Rationale says "the tasks that add the scene's pictures bring no test files"; this change adds a container test and scene tests, none of them a refusal test of the boundary. The sentence is about the refusal test (the Decision names it); read so, it matches (the task's *Context*: "kolejny plik PNG nie kończy czasowego odstępstwa D-273"). Left unchanged.

**Search of the whole foundation** (decisions, invariants, glossary, environment facts, part map) for `scene`, `still picture`, `nothing drawn on`, `sprite`, `badge`, `grey`/`greyed`, `pause`, `motion`, `flash`, `reduced motion`, `img`: no entry besides those above says the scene is a still picture or that nothing stands over it. D-04's Rationale (lines 103-106) and D-255's "effects of the scene and the chronicle" already speak of the scene's motion. D-45 (the kitchen-sink page draws no game) and D-125 (what the body row shows) are not touched. Searching `guidelines/`, `src/browser/AGENTS.md` and `AGENTS.md` for the same words found only the file-table rows and the styleguide's rule "The scene of a map run" (which agrees with D-316 to D-322; its words "Pauza … szarzy całą scenę", the two greys and the bar `calc(var(--bar-width) * 2)` match the stylesheet).

**Part map of the touched parts** (`browser-view`, `simulation`, `deployment`) — every new file is claimed: `src/browser/sim/data/scene.ts` by `src/browser/sim/**`; `src/browser/view/scene.tsx`, `scene-picture.ts` and `tests/view/scene*.test.mjs` by `src/browser/view/**` and `tests/view/**`; the six PNG files by `assets/sprites/**` (also the trust boundary); `tests/invariants/test_loop2_container_sprites.py` is listed under `deployment` (line 160, added in `bd7216b`). `foundation_check.py` exit 0, "0 errors". No dependency changed: the view imports `sim/data/scene.ts` (browser-view → simulation, allowed), the data file imports simulation files alone.

**Glossary and environment facts** — see below; the search found no word used against its entry (`extinguished campfire` = no minutes left, as `fireOf` reads it; `archetype`, `completion`, `map run` used as the glossary gives them).

## Decisions written or changed

- **Changed in place: D-318** — `the cycle's` is not the mark; the mark is **row 2** (the change makes its words match the data; the meaning is the row's).
  - EN: The mage walks to the sticks, bush or moss for „Zbierz” and „Obchód”, to the campfire for its actions, to the right edge for moving and to the middle of the clearing while it waits, and stays where it stands with fibre as the target, „Zapal — patyk”, „Zjedz — jagoda” and in a fight.
  - PL: Mag idzie do patyków, krzaka albo mchu przy „Zbierz” i „Obchód”, do ogniska przy jego czynnościach, do prawego brzegu przy ruchu po mapie i na środek polany przy czekaniu, a przy włóknie jako celu, „Zapal — patyk”, „Zjedz — jagoda” i w walce zostaje, gdzie stoi.
- Written through the project skill `the-way-record-decision` (read `SKILL.md`, `read.md`, `decide_entry.md`, `elements/common/way_of_working.md`, the template's "Changing a decision"): an edit in place of a word, no binding meaning moved, no new question, no neighbour to follow (no entry derives from D-318 and none names it).
- No new decision. Choices of the slices that I weighed for an entry and did not write (WAY-36), each with why:
  - *facing* (the mage mirrored when it walks left, right at a first draw and after „Restart”) — slice 5 choice 6; no row, no projected entry; it binds no later decision: visible in `styles.css`/`scene.tsx` and pinned by `scene.test.mjs`, the human sees it at the viewing.
  - *the mage's place at a first draw when the action leads nowhere* (the middle of the clearing) — a case no row names; same reason, pinned by the first-draw case of `scene.test.mjs`.
  - *a walk under way finishes when the next action stays* (M7) — see D-318 above; it is the orchestrator's finding for the request, not a settled choice.
  - *linear timing of the walk, the bar's 200 ms transition with `@starting-style`, icon height 16/32 px, badge position `bottom: 56%`* — appearance chosen by viewing, which the task leaves to the cycle (question 6, *Questions carried to cycle*); a later change to them is a change of one value in `styles.css`.
  - *the greys, `SCENE_SCALE` 2, the places moved 16 px, the bar at scale 2* — settled by the orchestrator: the greys are already in D-316 and D-322 (review M10 asks the request to name them for the human to confirm); the scale is task 6's constant; the places and the bar are values of the stylesheet and `scene.ts`, in the styleguide.

## Invariants written or changed

None written or changed in this step. The invariant `loop2-container-sprites` (written by the foundation step; rule set by the task and the projected entry of the definition, *Method* `test` the plan's choice) was compared with its test and matches.

## Environment facts

None written. The change rests on two outside sources: the terms of the Pixel Crawler pack, already `pixel-crawler-terms` (the mage's sheets, the fire and the props are arts of that pack, so the terms cover them), and the old Loop's cut files and the pack's sheets they were cut from. The second is a one-off input: `slice-1-report.md` traced every file to the pack by exact match (sticks, bush, moss) or frame by frame (fire), the output is pixels in `assets/sprites/`, and no decision's *Based on*, no invariant's *Rests on* and no citation whose change would put a decision in question names those files (D-271 is based on `pixel-crawler-terms` alone). The README sentence naming the six files' origin is the product's own text, not a foundation fact.

## Glossary terms

None written. "Scene", "badge" (the small block on `panel` over the mage's head), "the mage's places" and "stays" are used in their ordinary meaning, each explained in the entry that uses it (D-316, D-318, D-320). No entry uses a glossary term against its entry.

## Part-map changes

None. Every new file is claimed (see above).

## Projected entries written whole or in part

None by this step. Those written by the foundation step (compared above, all matching): E1 D-316, E2 D-317, E3 D-271's part, E5 D-04's part, E6 D-43's part, E7 D-39's part, E8 D-40's part, E9 D-122's part, E10 `loop2-container-sprites`; E4 (D-272) stood at the base.

## Rows of Settlements to record written

None by this step. Rows 1-9 stand as the foundation step wrote them (row 1 D-322 and D-122; row 2 D-318, now with the data's words; row 3 D-316; row 4 D-319; rows 5 and 6 D-320; row 7 D-321; row 8 D-322; row 9 D-320, D-40 and D-43). The code makes each true except the corner named under D-318 (M7). Entries marked `the cycle's`: none.

## Findings for the report that are not foundation entries (not mine to fix)

- **M7 / D-318** — described above; the choice between "stops where it stands" and "finishes its walk" is the human's, after the viewing at 16×.
- **Review M5, M6, M8, M9, M10, M11, O1** — unchanged, as the handoff keeps them for the request. M10 (the greys as binding values in D-316 and D-322 that no human chose) and the D-04 reading of `reachedX` above are the two points where an entry's words rest on a reading the human has not seen; both belong in the request.
- *Code finding found while comparing:* `tests/invariants/test_loop2_container_sprites.py:12-13` still cites "Slice 3 of task `scena-z-ludzikiem`" (M8); I did not touch it.

## Reaches beyond the handoff

- `C:\Storage\repos\loop2-wt\scena-z-ludzikiem\src\browser\sim\data\archetypes.ts`, `resources.ts`, `actions.ts` (labels), `src/browser\sim\types.ts` (action kinds): to check "only archetype", the fibre's name and the action labels used in D-318.
- `foundations/glossary.md` (`map run`, `extinguished campfire`, `archetype`, `completion`, `solved map`) and `foundations/environment_facts.md` (`pixel-crawler-terms`): for the glossary and environment-fact questions.
- `.the-way/elements/decisions/skill/` (`SKILL.md`, `read.md`, `decide_entry.md`), `.the-way/elements/decisions/template.md` ("Changing a decision"), `.the-way/elements/common/way_of_working.md`: the record skill's method for an edit in place.
- `guidelines/styleguide-browser-view.md` (the rule "The scene of a map run") and a search of `guidelines/` and `AGENTS.md` for the scene: to see whether any text still says the scene is a still picture (none does).
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` and `git.md` (before the one-off Python check of the file's line endings and before the commit).

## Searches not found or unclear:

- Not found: any entry of the foundation that still says the scene is a still picture or that nothing stands over it (searched `still picture`, `nothing drawn`, `scene`, `img`, `sprite`, `badge` in all five foundation files).
- Unclear: whether D-04's binding sentence is meant to cover the scene reading the browser's computed `translate` of its own element (my reading: it does not need to; see D-04 above). Not asked of the human, since no entry changes on this reading.
- Unclear: what the mage does at a first draw or after a load when its action leads nowhere (the code: the middle of the clearing); no row or entry names it.
- Not found: a source for the walk's linear timing curve, the facing at „Restart”, or whether a walk under way finishes when the next action "stays" (also named in `slice-5-report.md`).
- Not run: `npm test` and any other test, as the handoff says; the vault's definition and plan were not opened (the foundation step already compared the approved wording).
