# Independent assessment of ced7724 (critic's report, observations only)

Scope: foundation files and `tests/invariants/` that the change adds or changes, read against the
code in `assessment-c1/tree/`. Paths below: `D` = `assessment-c1/change.diff` (line numbers of
that file), `T` = `assessment-c1/tree/`. I give no verdict.

## Runs

- Format guards (decisions, invariants, glossary, environment facts) at base and merge-onto
  d2b4687: 0 errors, 0 warnings, 0 unchecked each. Part map guard: 0 errors, 2 warnings (lines
  75 and 122, "depends on account-server with no separation recorded"). Both dependency lines
  already stood on main; this change only adds `simulation` to their lists. 1 unchecked
  (dependency graph), as on any product.
- Invariant gate `python -B .the-way/gate/run_tests.py tests/invariants`: 128 tests, OK, 171 s.
  Docker answered (no skip reported), so `loop2-container-icons/1` ran. No image or container left
  behind (`docker images` shows only the two images that were there before).
- I fetched the two sources the new environment facts quote. `license.txt` at commit 82d9488 holds
  the quoted first line and "Delapouite, http://delapouite.com"; the four icon files exist at
  `delapouite/<name>.svg` at that commit. The CC BY 3.0 legal code holds the quoted words of
  4(a) and 4(b). Details in B5.

## Checks that found no concern

- Numbering (settlement 2): D-18..D-27 follow main's D-17; revised numbers D-03/2, D-04/3,
  D-06/3 follow main's versions (D-03/1, D-04/2, D-06/2).
- *Approved by* form "Mariusz, merge of <PR 12 URL>" is the form the decision template gives for
  an entry written before the merge (WAY-14); no date written.
- Every invariant added has a *Derives from* decision whose *Verification* names it (the guard
  checks both directions); fingerprints current.
- Invariant sentences name no branch (WAY-60). Methods are the same gate command as main's.
- Environment facts hold `TODO` only in *Method* (allowed on main).
- Settlement 3 (the image carries the icons): `Dockerfile:COPY assets/icons/`,
  `.dockerignore:!assets/icons/`, `scripts/build.mjs` copies `*.svg` into `dist/public/icons/`,
  and `test_loop2_container_icons.py` builds the image and GETs each file. Carried out.
- Settlement 1 (bare words): in the entries I found no bare "map", "step", "entry" or
  "clock" where the process term's last word is meant; "action" is always "the character's
  action" or "an action of a character"; "choices" is "the player's choices". Exceptions are
  small, see B11.
- Tests cite `invariant: <id>/1` with the current version; the data of each test is written out
  (WAY-69) for the expected values I read (pace, restart-seed, map-run-tiles, content-identifiers,
  exploring-reveal, action-in-progress). The pace test is a good example: every expected minute is
  written beside its input.

## Observations

### B1 (high) D-18 says content is added "by a change of data alone"; two invariant tests make that false

- Checked: D-18 second sentence against `test_map_run_tiles.py` and `test_content_identifiers.py`.
- Evidence: D:523-540 (D-18). `T/tests/invariants/test_map_run_tiles.py` docstring ("a game map
  added to the data is checked only once it is written out here ... a tripwire ... only to fail
  when one of them is not written out here") and constant `MAP_RESOURCES` (about line 66);
  `T/tests/invariants/test_content_identifiers.py` docstring ("a map, a resource or an archetype
  added to the data is scanned for only once it is written out here; a tripwire ... fails") and
  `ENTRIES` (about line 70).
- Problem: adding a second game map, a resource or an archetype in `src/browser/sim/data/` fails
  the gate until someone edits those two files. Invariant tests are read-only during
  implementation (WAY-03), so the "change of data alone" of D-18 cannot pass the gate; and the
  "complies" example of D-24 ("a new game map added as a row of the game maps' data") fails the
  same way. The tests did this on purpose to keep WAY-69 (expected values written out), so the
  two rules collide here and the change settles it silently in the test.
- To change: either put the collision in front of the human (D-18 wording "a change of data alone"
  plus the test files named as the exception), or make the tripwire a non-failing report, or let
  the expected values come from a source the test does not compute (a separate fixture the data
  change also touches, named in the entry). Also the other tests hard-code `forest`, `elementalMage`
  and four resources (walk-target, rule-pick, inputs); that is fine for a scenario, not for a
  tripwire.

### B2 (medium) D-04/3 lost a level 2 pair, and its third sentence is not true of the code

- Checked: D-04/3 against D-04/2 on main and against the views.
- Evidence: main D-04/2 verification had a complies/violates pair for "TypeScript compiled for the
  browser" (`git show d2b4687:foundations/decisions.md`, lines 143-160). D:63-97 (D-04/3) keeps the
  first sentence ("written in TypeScript and runs in the browser") but its verification names only
  `simulation-isolation`, `simulation-inputs` and pairs about the simulation and the view's use of
  state. Nothing now checks the first sentence.
- Also: third sentence "The browser view draws the game only from the game state". `T/src/browser/view/footer.ts`
  draws from `RESOURCES` and `ICON_CREDITS`; `T/src/browser/view/send-panel.ts` draws target names
  from `MAPS` and `ARCHETYPES`; `terrain-picture.ts` reads `MAPS` and `RESOURCES`. Those are data
  files (D-18 puts content there), not the game state. The sentence as written is false of three
  views, and its rationale line leans on "draws the game only from the game state" for the
  renewal of a resurrection and the catch-up that the code does not have.
- Also: the "violates" example "a browser view that keeps a game state of its own" sits beside
  `T/src/browser/view/app.ts:13-18`, which holds the one state in the view (`let state`) by design.
  An agent can read the example either way.
- To change: restore a pair for the TypeScript sentence; word the third sentence "from the game
  state and the game's data"; give a "violates" example that the actual app does not already
  match (a view that replaces the state with something other than a simulation result).

### B3 (medium) Three decisions are level 2 only although a sentence a commit can falsify is named in them

- Checked: WAY-12 ("level 2 only while no invariant can be derived today") for D-19, D-23, D-26
  and D-21's pause.
- Evidence: D:141-166 (D-19, no invariant), D:242-267 (D-23, one invariant, "closed list" and
  "no way to act by hand" at level 2), D:323-345 (D-26 "never by a number of its own"), D:192-211
  (D-21 "can pause and resume").
- Problem: each of these has a commit-checkable form. D-19: "the drawing has no click handler and
  carries no stock number" (`T/src/browser/view/terrain-panel.ts:23-25` and
  `terrain-picture.ts` already claim this in comments, and `T/tests/view/terrain-picture.test.mjs`
  tests it, but not as an invariant). D-23: the closed list is `checkCondition`/`checkAction` in
  `T/src/browser/sim/game.ts:43-76`, which throw for anything else; a test that `setProgram`
  refuses a kind outside the list is derivable. D-21 pause: `setPaused` is in `game.js`, and the
  pace test already drives it. Leaving these at level 2 means the next agent compares by reading.
- To change: derive the invariants (or write in the entry why none can be derived today).

### B4 (medium) `walk-target/1` carries a clause that no decision states

- Checked: sentence of `walk-target/1` (D:631-642) against D-26 (D:323-345) and D-25.
- Evidence: D-26 says only "nearest known one of its kind, counted in game minutes of walking,
  never by a number". The invariant adds "and the character cannot carry it out where no revealed
  tile holds some of that resource or where it stands on one that does". The code basis is
  `actionFeasible` in `T/src/browser/sim/program.ts:36-41`. `program-rule-pick/1` leans on this
  clause as well (its test docstring: "going to a resource only where ... (walk-target/1)").
- Problem: a binding clause with no decision (WAY-17: an invariant derives from the decision that
  states it). It also puts two rules into one sentence (WAY-56): the nearest tile, and when the
  action is possible.
- Also: D-26 says "known", D-25, the invariants and the code say "revealed". If they are the same
  thing, one word should go; if not, D-26 is wider than the code.
- To change: state the "cannot carry out" rule in a decision (D-23 or D-26) and split the invariant,
  or cut the clause.

### B5 (medium) The licence basis of D-27 is incomplete for what 4(b) asks, and one citation is not a fact

- Checked: D-27 "Based on", the two new facts, `credits.ts`/`footer.ts`, `icon-credits/1`.
- Evidence: the legal code 4(b) (fetched) asks, besides the author and the adaptation credit, for
  "(ii) the title of the Work if supplied" and "(iii) ... the URI, if any, that Licensor specifies
  ... to the extent reasonably practicable". The fact `cc-by-3-adaptation-credit/1` (D:417-425)
  quotes the author and the adaptation credit only. The footer
  (`T/src/browser/view/footer.ts:50-60`) shows the resource name ("patyk"), the author, a link
  texted "game-icons.net" and the licence, never the icon's title ("Wood stick"); `icon-credits/1`
  does not ask for it.
- Also: 4(a) is quoted in D-27 *Based on* as a citation (D:376) while 4(b) is a fact entry. The
  template sends every citation that, if it stopped being true, would send the decision to review
  to a fact. 4(a) has the same status as 4(b).
- Also: the fact quote for 4(b) ends at "You must" and leaves out ", unless a request has been made
  pursuant to Section 4(a)"; the fact states the duty without that exception.
- Checked and fine: `game-icons-licence/1` is true of the source (license.txt first line and
  contributor list; Delapouite is not marked CC0).
- To change: decide whether the title is owed (add it to the fact, the sentence and the footer, or
  record in the rationale that it is left out); make 4(a) a fact like 4(b).

### B6 (medium) Glossary: undefined words the binding sentences lean on, and definitions the code does not match

- Checked: new entries and the existing `program` entry against the sentences and the code, per
  the glossary template ("Which words take an entry", WAY-95/97).
- `free game minute` is used in D-20 rationale, D-23 and `program-rule-pick/1`, and means "a
  game minute at which no action is in progress" (T/src/browser/sim/run.ts `stepMinute`). A
  reader of the field would not give it that meaning; no entry.
- `program` (existing, glossary line 31 of the tree): "holding a trip plan". The code's `Program`
  is `{ rules }` only (`T/src/browser/sim/types.ts`), nothing else in the foundation uses "trip
  plan", and D-25 rejects a stored route. The change adds "program rule" next to it but leaves the
  stale clause.
- `map run` definition: "until a completion, the character's death or the player stopping it".
  The code ends a map run only by `end` and `restart` (`game.ts:112-122`); there is no completion
  and no death. Either the definition names states the product does not have, or the entry is
  written ahead of the code (allowed, but the human accepting it should be told).
- `character skill` (D:438-444): no code, no other entry; the only use is the list in D-18. Fine as
  a projected term, but its definition ("an area of what a character can do that grows apart from
  the character's other areas") says nothing a reader could check.
- Vocabulary split: D-18 and D-25 say "item" and "creature", D-24 and the invariants say
  "resource" and "archetype" (`content-identifiers/1`). Neither "resource" nor "archetype" has an
  entry, and "item" and "resource" are not tied to each other.
- To change: add or reword those entries, or state in the request which are left open.

### B7 (low-medium) `player-map-run-pace/1` reads more than it says

- Evidence: the sentence (D:551-561) says "one game minute for each whole real second passed".
  `T/tests/invariants/test_player_map_run_pace.py` docstring reads it as carrying parts of a second
  across calls and dropping the carry on a new map run, and the expected values depend on that
  (`passed(250)` four times gives minute 7). The code is `game.ts:131-143` (`realMsCarry`).
- Problem: the condition that decides whether a commit makes the sentence true stands only in the
  test's reading (WAY-60 wants it in the sentence or in an entry). A commit that drops the carry
  keeps every "whole second" per call and fails the test only because of the docstring.
- To change: put "the parts of a second left over carry to the next real time passed to the same
  map run" into the sentence, or into D-21.

### B8 (low-medium) `Part: every` on two invariants

- Evidence: D:518-538 (`map-run-repeatability/1`, `simulation-randomness/1`). Their sentences are
  about the simulation's files and its public functions; the tests build the app and drive
  `dist/public/sim/game.js`.
- Problem: the template says `every` where a change to any part can make the sentence false. A
  change to account-server or deployment cannot. The cost is these two tests (a build plus long
  runs) reached by every change; the template allows naming more when in doubt, so this is a cost
  remark, not an error. `simulation-isolation/1` and `simulation-inputs/1` name `simulation` only,
  which is the right scope, and they call the same build.
- To change: `simulation · build-tools` (the build config decides the compiled output they run).

### B9 (low) Duplicate test: `tests/deploy/test_loop2_image_icons.py`

- Evidence: `T/tests/deploy/test_loop2_image_icons.py` (154 lines) builds the image, runs it and
  GETs `/icons/<name>` for each file, as `loop2-container-icons/1` does. It adds only the media
  type `image/svg+xml` and `/` answering 200.
- Problem: a second image build in every full run for two small extras, and two places to keep in
  step. This is a cut candidate: fold the media type into the invariant test (it is the behaviour
  that makes the icons draw) or drop the file.

### B10 (low) Trust boundary without a failure mode

- Evidence: D:704-785 (part map). `browser-view` gets *Trust boundary:* `assets/icons/**` and an
  external-context row for game-icons.net (untrusted), but *Failure modes:* `none`, while
  `icon-file-content/1` is exactly the detection of one ("an icon file holds a script and runs in
  the player's page").
- To change: record the failure mode with its criticality and "detected by icon-file-content", so
  the part's computed criticality follows it (WAY-13).

### B11 (low) Bare "file" and a few small wording points

- "file" is the last word of the process term "repository instruction file". Bare uses in binding
  sentences: D-27 "says how the file differs from its source" and `icon-credits/1` the same
  (D:366-373, D:678-688); the context makes it "icon file", but settlement 1 asked for the
  qualified word. Also `loop2-container-icons/1`: "with the same bytes as the file".
- D-21 *Origin* cites `src/sim/data/balance.ts` (loop's path); in this product it is
  `src/browser/sim/data/balance.ts`. It reads as a mistake unless the reader knows it is loop's.
- `T/tests/invariants/test_action_in_progress.py` docstring: "in this task's world" - a task
  reference in a test that outlives the task (the same file cites D-23, D-25, D-24 by number, which
  is fine).

### B12 (low) D-04/3 examples point at things the product does not have

- Evidence: D:75-82 "complies: the renewal of a resurrection computed from a real time the
  caller passes in". There is no resurrection in the code. An agent comparing a change finds no
  such function to match. The program-editor example is real (`app.ts:30-34`).
- To change: use an example the code shows (`passRealTime(state, realMs)` taking the elapsed time
  as an argument).

### B13 (low) When the program picks again is stated three times

- Evidence: D-20 second sentence, D-23 first sentence ("in each free game minute it carries out
  the first program rule ..."), D-25 first sentence ("after which the program picks a program rule
  anew"). Each has its own invariant (`action-in-progress`, `program-rule-pick`,
  `move-reach`/`exploring-reveal`), so a change in the rule needs three decisions and three
  fingerprints to move (WAY-19: a sentence moves to the one decision that answers the question).
- To change: keep the "after any action" clause in one decision and have the others refer to it by
  relation.

### B14 (low) D-22 level 2 list omits a clause it states

- D:213-241: "the map run draws its game map's layout at its start, before the first game minute,
  in a fixed order" is not named at level 2 and no invariant states it
  (`map-run-repeatability` and `map-run-tiles` see only the outcome). The comment in
  `T/src/browser/sim/layout.ts` ("The draw order is a contract (spec 4.4)") says it is meant to
  bind, and its text refers to a spec that the foundation does not hold.

### B15 (low) Narrow reach of three icon and purity checks

- `icon-file-content/1` and `loop2-container-icons/1` look at files directly in `assets/icons/`
  with a `.svg` extension. The sentence says "in `assets/icons/`"; a nested folder or another
  extension is outside both the check and the build copy (`build.mjs` is non-recursive, so the
  build and the checks agree). The test docstrings say so. Fine, but the sentence is wider.
- `simulation-inputs/1` and `simulation-isolation/1` do not catch module-level mutable state that a
  function changes between calls. `map-run-repeatability/1` would catch an effect on a map run
  only in the scenarios it drives. D-04/3 says "pure functions".

## What of the change can be cut

- `tests/deploy/test_loop2_image_icons.py` (B9) - duplicate of an invariant test.
- The `Part: every` scope of two invariants can narrow (B8), no entry needs to go.
- The 400-line TypeScript lexers in `test_simulation_isolation.py` and `test_simulation_randomness.py`
  are heavy for sentences that the dynamic half (a vm context without host globals, a throwing
  `Math.random`) already shows for the code paths driven. I did not judge whether the static half
  is needed for paths the scenario does not reach; the docstrings say that is its reason.
- Nothing else of the foundation entries is a duplicate that can go outright: each new decision
  has at least one invariant or a pair, each new invariant a decision, each new term a use.
