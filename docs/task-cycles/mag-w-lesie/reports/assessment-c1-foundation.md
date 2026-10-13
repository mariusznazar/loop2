# Foundation agent: settlement of assessment c1 applied

Worktree `C:\Storage\repos\loop2-mag-w-lesie`, branch `task/mag-w-lesie`, from ced7724.
Skills used: the-way-record-decision, the-way-record-invariant, the-way-record-environment-fact,
the-way-record-glossary-term, the-way-update-part-map (read; no part map change). No other skill.
Every entry touched is new on this branch, so every identifier keeps version 1 (decisions D-04/3,
D-19..D-27 edited in place before the merge). *Approved by* of every decision touched stays
`Mariusz, merge of https://github.com/mariusznazar/loop2/pull/12`.

## Commits

- `71daa48` docs(foundation): apply the settlement of the independent assessment of correction 1
  (`foundations/decisions.md`, `environment_facts.md`, `glossary.md`, `invariants.md`)
- `5384399` test(invariants): word the action-in-progress reading without a task reference
  (`tests/invariants/test_action_in_progress.py`, docstring only)

Line endings kept (foundation files CRLF in the working tree, the test file LF); no control
characters in any written file. Not pushed.

## Guard results (from the worktree root, base and merge-onto d2b4687320e7b0e89306e9e5530bfc824a90627f)

| Guard | Exit | Report |
|---|---|---|
| decisions | 0 | 0 errors, 0 warnings, 0 unchecked |
| invariants | 0 | 0 errors, 0 warnings, 0 unchecked |
| environment facts | 0 | 0 errors, 0 warnings, 0 unchecked |
| glossary | 0 | 0 errors, 0 warnings, 0 unchecked |
| part map (`--base` only) | 0 | 0 errors; 2 warnings (lines 75, 122: build-tools and deployment depend on account-server with no separation recorded — both stood before this change); 1 unchecked (dependency graph: no command of the product reports it) |

Not run: the invariant gate. Six new invariants have no check yet, so a gate run reports them
without a verdict (never a pass) until the check author adds their checks.

## Per remark

### B2, B12 — D-04/3 (fingerprint ecd038e3 → 3b3dcdc2)

- Third binding sentence, old → new:
  - old: "The browser view draws the game only from the game state, and changes the game state only
    through functions of the simulation, to which it passes the player's choices and the passing of
    real time."
  - new: "The browser view draws the game only from the game state and the game's content data, and
    changes the game state only through functions of the simulation, to which it passes the
    player's choices and the passing of real time."
- Verification: level 2 now also covers "the language the game is written in", with the pair of
  D-04/2 restored (complies: a game screen written as a TypeScript module that the build compiles
  for the browser; violates: a screen of the game written as a Godot scene, or a script of the
  game's own code that the browser loads, written directly in JavaScript). "a part of the game" of
  D-04/2 became "a screen of the game" (bare "part" is a process word).
- B12: complies example "the renewal of a resurrection …" → "the simulation's function that passes
  real time to a map run taking the real time elapsed as an argument, which the browser view
  measures and passes in".
- violates example "a browser view that keeps a game state of its own" → "a screen of the browser
  view that replaces the game state with a value no function of the simulation returned".
- Rationale for change: one sentence added — the browser view also reads the game's content data,
  apart from the game state, to name and picture what the game state holds.
- Follow-ons: D-03/2 relation → `D-04@3b3dcdc2`, and its rationale repeats the new wording;
  `simulation-isolation/1`, `simulation-inputs/1` *Derives from* → `D-04@3b3dcdc2` (sentences
  unchanged).

### B3 — D-19, D-23, D-26, D-21's pause

- **D-19** (fingerprint f7077364, binding sentences unchanged): Verification level 2 → "level 1 —
  invariants: terrain-drawing-interaction · terrain-drawing-numbers". No level 2 left.
- **D-23** (fingerprint 2a80871f, binding sentences unchanged): level 1 → program-rule-pick ·
  action-in-progress · program-closed-lists.
  - "no way to carry out a character's action by hand": an action started by hand at a free game
    minute breaks program-rule-pick, and one started at any other minute cuts short the action in
    progress and breaks action-in-progress. So action-in-progress is named, and its *Derives from*
    became `D-20@a03f8b53 · D-23@2a80871f` (sentence unchanged, fingerprint 5003b555).
  - "Conditions are chosen from a closed list": new invariant program-closed-lists.
  - Left at level 2, with the reason written in the entry: "a condition written as an expression,
    since a sentence naming what a kind of condition may take would also bind which kinds the
    closed list holds, which this decision leaves open". Pair: complies — a condition picker listing
    the conditions of the closed list, each with the resource and the whole number it takes;
    violates — a text field taking a condition as an expression; a kind of condition added to the
    closed list that takes a formula as text.
- **D-26**: level 1 → walk-target · walk-feasibility · program-world-reference ("never by a number of
  its own" is now program-world-reference). Level 2 left only for things of the world other than
  resources on tiles (no such thing exists in the game yet).
- **D-21 pause**: confirmed. D-21's Verification names `player-map-run-pace` at level 1, and that
  invariant's sentence holds the pause ("by no game minute for real time passed while it is
  paused"). D-21 is unchanged apart from B11's *Origin*. Its level 2 for the player's control that
  pauses and resumes stays as settled.

### B4 — D-26 states when going has nothing to go to; walk-target/1 split

- D-26 (fingerprint 35aef078 → 349276ea), binding part old → new:
  - old: "A program points at a thing of the world only as the nearest known one of its kind,
    counted in game minutes of walking, never by a number of its own."
  - new: the same sentence, followed by "An action of the character that goes to a thing of the world
    can be carried out where a thing of its kind is known and the character does not stand on one,
    and nowhere else: there it has nothing to go to."
- D-26 *Relations*: none → `derives from D-23@2a80871f` (D-23's "whose action of the character can be
  carried out then" is what the new sentence serves). Examples added to its pair: complies — "Go —
  stick" passed over while the character stands on a known tile with sticks; violates — "Go — stick"
  sending the character off the known tile with sticks it stands on toward another one. Rationale:
  one sentence added on why there is nothing to go to there.
- "known" stays in D-26 and "revealed" in the invariants (settlement, Q12).
- walk-target/1 (fingerprint a6b8ff81 → f62d9624, version stays 1, identifier kept):
  - old: "A program rule that goes to a resource takes the character one move toward one of the
    revealed tiles holding some of that resource that lie nearest in game minutes of walking, and the
    character cannot carry it out where no revealed tile holds some of that resource or where it
    stands on one that does."
  - new: "A program rule that goes to a resource takes the character one move toward one of the
    revealed tiles holding some of that resource that lie nearest in game minutes of walking."
  - The removed clause is the new invariant walk-feasibility (both directions, see the hand-off).
- Where program-rule-pick may lean on walk-feasibility/1: its sentence is unchanged (fingerprint
  f6f9eff0). Its check's docstring, `tests/invariants/test_program_rule_pick.py` lines 18–21 (reading
  of "the character can carry out", "going to a resource only where … (walk-target/1)"), should cite
  walk-feasibility/1 instead of walk-target/1. `tests/invariants/test_walk_target.py` still asserts
  the feasibility (docstring lines 1–4 and 24–27, and the refusal counts among its controls); those
  move to the new check. Both are the check author's to change.

### B5 — CC BY 3.0 facts and the icon's title

Legal code fetched on 2026-10-13 from https://creativecommons.org/licenses/by/3.0/legalcode (HTTP
200); every passage below was checked to stand word for word in the page's text.

- `cc-by-3-adaptation-credit/1` (fingerprint 75828134 → 25e592d3, version stays 1):
  - old: "The Creative Commons Attribution 3.0 Unported licence requires whoever distributes an
    adaptation of a work under it to credit the work's original author and to identify the use of the
    work in the adaptation."
  - new: "The Creative Commons Attribution 3.0 Unported licence requires whoever distributes an
    adaptation of a work under it, unless a licensor has given notice to remove that credit from the
    adaptation, to provide, reasonably to the medium, the name of the work's original author if
    supplied, the title of the work if supplied, to the extent reasonably practicable the URI the
    licensor specifies for the work where that URI refers to the work's copyright notice or
    licensing information, and a credit identifying the use of the work in the adaptation."
  - *Source* quotes § 4(b): the opening up to and with "unless a request has been made pursuant to
    Section 4(a),", "provide, reasonable to the medium or means You are utilizing:", (i), (ii), (iii)
    and (iv) whole; and § 4(a): "If You create an Adaptation, upon notice from any Licensor You must,
    to the extent practicable, remove from the Adaptation any credit as required by Section 4(b), as
    requested." (the request the exception refers to).
- New `cc-by-3-licence-copy/1` (faaced40): "The Creative Commons Attribution 3.0 Unported licence
  requires whoever distributes a work under it to include a copy of the licence, or its URI, with
  every copy of the work they distribute." Source § 4(a), the sentence D-27 quoted before.
- D-27 *Based on*: the 4(a) citation → `cc-by-3-licence-copy@faaced40`; the credit fact →
  `@25e592d3`.
- Four new title facts (one per page: pages of a site without editions are separate sources), each
  with the closest existing Wayback capture found through the CDX index:

| Fact | Sentence | Fingerprint |
|---|---|---|
| `game-icons-wood-stick-title/1` | The page of Delapouite's icon `wood-stick` on game-icons.net names the icon "Wood stick icon". | 616bffdb |
| `game-icons-berry-bush-title/1` | … `berry-bush` … "Berry bush icon". | d3838fe0 |
| `game-icons-fern-title/1` | … `fern` … "Fern icon". | 6a1f5fdb |
| `game-icons-flax-title/1` | … `flax` … "Flax icon". | d8aaf8c9 |

- D-27 (fingerprint 69da55dd → 06e0600c) and icon-credits/1: see "Meaning points" below. D-27
  rationale names the title and the URI among what the licence asks, and says that game-icons.net
  supplies a title for each icon on its page.
- icon-credits/1 *Rests on*: none → `game-icons-licence@a24f9771` (the author it names) and the four
  title facts. Beyond the request: the author was already a value copied from the licence file, which
  *Rests on* is for.

#### The four icon titles, for the code agent

| Icon file | Title | Where it stands | Archived copy checked |
|---|---|---|---|
| `wood-stick.svg` | Wood stick icon | https://game-icons.net/1x1/delapouite/wood-stick.html, `<h1 id="icon-name" itemprop="name">` | https://web.archive.org/web/20260113203755/https://game-icons.net/1x1/delapouite/wood-stick.html |
| `berry-bush.svg` | Berry bush icon | https://game-icons.net/1x1/delapouite/berry-bush.html, same heading | https://web.archive.org/web/20251006204230/https://game-icons.net/1x1/delapouite/berry-bush.html |
| `fern.svg` | Fern icon | https://game-icons.net/1x1/delapouite/fern.html, same heading | https://web.archive.org/web/20260821015039/https://game-icons.net/1x1/delapouite/fern.html |
| `flax.svg` | Flax icon | https://game-icons.net/1x1/delapouite/flax.html, same heading | https://web.archive.org/web/20250617202006/https://game-icons.net/1x1/delapouite/flax.html |

- The source repository supplies no title: at commit 82d948812bfe3f269ef8f731dcdb07b08160edc4 each
  `delapouite/<name>.svg` is one `<svg>` element with two `path` elements (no `title`, no comment,
  no copyright notice), and the repository root holds only the contributors' folders, scripts,
  `README.md`, `CONTRIBUTING.md` and `license.txt`. The title comes from the page only.
- Every page's heading ends in " icon"; the page's `<title>` reads "Wood stick icon, SVG and PNG |
  Game-icons.net". The facts quote the heading as it stands; nothing trims it (see Questions).

### B6 — glossary term `free game minute`

"A free game minute is a game minute of a map run at which the map run starts, or at which the
character's action or the character's waiting ends." *Avoid*: none. *Not*: none. Uses: D-20
rationale, D-23 binding sentence, program-rule-pick/1. "the program picks" was kept out of the
definition: it is the rule of D-20 and D-23, not what the word means.

### B11 — "icon file", D-21 *Origin*, docstring

- D-27: "says how the file differs" → "says how the icon file differs" (in the binding part above).
- icon-credits/1 and loop2-container-icons/1: see the hand-off.
- D-21 *Origin*: "loop's data file `src/sim/data/balance.ts`" → "in loop's repository, not loop2's:
  the data file `src/sim/data/balance.ts`".
- `tests/invariants/test_action_in_progress.py` docstring: "in this task's world a condition changes
  only …" → "in the simulation this check drives, a condition changes only …". Nothing the check
  does changed.

### B14 — D-22's layout at the map run's start, in a fixed order

Derived: new invariant map-run-layout, named in D-22's level 1 (D-22's binding part unchanged,
c9937b43). "Before the first game minute" is what it checks: a layout drawn later, during the map
run, would depend on what the character did. The "fixed order" shows on a commit as the same seed
giving the same layout, which map-run-repeatability holds within one program and map-run-layout
across programs; nothing further is named at level 2. The comment in `src/browser/sim/layout.ts` that
cites "spec 4.4" is product code, outside this agent's boundary: the code agent changes it to cite
D-22.

### B15 — "directly in `assets/icons/`"

Applied to icon-file-content/1 and loop2-container-icons/1, and to icon-credits/1 as well, whose
check also reads only the `.svg` files directly in `assets/icons/` and whose sentence changed anyway.

## Hand-off to the check author (WAY-69)

Method of every entry below: `python -B .the-way/gate/run_tests.py tests/invariants --record
.runs/invariant-tests.jsonl` (the gate command every invariant of the product uses). *Rests on*:
none unless named. *Correction*: none. All at version 1.

### New invariants (no check yet)

1. **terrain-drawing-interaction/1** (a1f263ec) — Part: browser-view — Derives from D-19@f7077364.
   "Hovering a tile of the terrain panel's drawing of the game map marks that tile and its row in the
   list of revealed tiles, hovering that row marks both as well, and nothing else the player does on
   the drawing changes the page or the game state."
   Reading: the drawing is the picture of the map run's tiles in the terrain panel; "marks" is the
   visible hovered mark the view puts on a tile and on a row; "hovering that row" is the pointer over
   that tile's row in the list beside the drawing; "nothing else the player does on the drawing" is
   any click, press, double click, wheel, key or touch on the drawing or its tiles, which must leave
   the game state and the page as they were (no map run sent, no program changed, no character
   moved, no mark other than the hover's). A tile only revealed has a row; an unrevealed tile has
   none, and hovering it marks nothing in the list.
   Expected file: `tests/invariants/test_terrain_drawing_interaction.py`.
2. **terrain-drawing-numbers/1** (08889178) — Part: browser-view — Derives from D-19@f7077364.
   "The terrain panel's drawing of the game map shows no number of the stock a tile holds."
   Reading: no text of the drawing, nor any label or title the browser shows for it, holds a tile's
   stock of a resource; the numbers of stock stand in the list of revealed tiles. Icons of resources,
   including the dimmed icon of a resource whose stock is 0, are no number.
   Expected file: `tests/invariants/test_terrain_drawing_numbers.py`.
3. **program-closed-lists/1** (4930cc9f) — Part: simulation — Derives from D-23@2a80871f.
   "The simulation refuses a program holding a condition or an action of the character whose kind
   the data files of `src/browser/sim/data/` do not list."
   Reading: "refuses" — the simulation's function that replaces the program does not take the
   program in, and the game state keeps the program it had; the lists are the kinds of condition and
   the kinds of action of the character the data files name; a kind listed there is accepted with its
   fields valid. The kinds written out in the check stand for what the data lists today; a kind added
   to the data is a foundation step for the check (as with content-identifiers).
   Expected file: `tests/invariants/test_program_closed_lists.py`.
4. **walk-feasibility/1** (d189a7c0) — Part: simulation — Derives from D-26@349276ea.
   "The character can carry out a program rule that goes to a resource where some revealed tile holds
   some of that resource and the character does not stand on one that does, and nowhere else."
   Reading: "can carry out" — at a free game minute (glossary), a program rule whose condition holds
   and whose action goes to that resource is started there; both directions bind: where the two
   conditions hold it is started (when it is the first program rule whose condition holds), and
   where either fails it is passed over. "holds some" — a stock above 0; a tile whose stock of the
   resource is 0 does not hold some. This is the clause cut from walk-target/1; the existing
   refusal scenarios of `test_walk_target.py` show it one way only.
   Expected file: `tests/invariants/test_walk_feasibility.py`.
5. **program-world-reference/1** (668c5c6d) — Part: simulation — Derives from D-26@349276ea.
   "A program the simulation holds names a thing of the world only by its kind, never by a number or
   a position of its own."
   Reading: "a program the simulation holds" — the program in the game state after the simulation
   took one in; "a thing of the world" — a tile, or a resource lying on one; "by its kind" — the
   identifier of a resource (or, later, of another kind of thing) as the data files give it; "a
   number or a position of its own" — an index, a coordinate or a number given to one tile or one
   thing. A whole number a condition compares a stock with is no such number: it names no thing. A
   program offered with a tile named by its number or position is either refused or held without it.
   Expected file: `tests/invariants/test_program_world_reference.py`.
6. **map-run-layout/1** (c41bf931) — Part: simulation — Derives from D-22@c9937b43.
   "Two map runs of one game map on one seed have the same resources on each tile at every game
   minute, whatever programs they run under."
   Reading: "the same resources on each tile" — which resources a tile holds (a resource held with
   stock 0 counts as held), not how much; "every game minute" — the same minute of each map run,
   from its start onward; "whatever programs" — two different programs, so the characters reveal
   and walk differently. A layout drawn at the start passes; one drawn tile by tile as the
   character goes breaks it. Two map runs on one seed: a map run restart keeps its seed
   (restart-seed/1), so a restart under a changed program is one way to get the second run.
   Expected file: `tests/invariants/test_map_run_layout.py`.

### Changed invariants (each still at version 1; their checks cite /1)

- **walk-target/1** (a6b8ff81 → f62d9624) — sentence above. Its check keeps the nearest-tile reading;
  the "cannot carry it out" reading and its controls leave it for walk-feasibility.
- **icon-file-content/1** (3b77f724 → 46b16248): "No SVG file directly in `assets/icons/` holds a
  `script` or `foreignObject` SVG element, an attribute whose name begins with `on`, or a reference to
  anything outside the file other than the SVG and XLink namespace declarations." Reading
  unchanged: files with the extension `.svg` directly in that folder, as the check reads today.
- **icon-credits/1** (e220fce0 → ffb7685d) — Rests on game-icons-licence@a24f9771 ·
  game-icons-wood-stick-title@616bffdb · game-icons-berry-bush-title@d3838fe0 ·
  game-icons-fern-title@6a1f5fdb · game-icons-flax-title@d8aaf8c9. New in the reading: "names the
  icon's title as its page on game-icons.net gives it" — the credit's text holds the title the
  title fact of that icon quotes, written out in the check per icon file, as the authors are.
  An icon file with no title fact has no title written out; the check names that as a gap rather
  than passing it.
- **loop2-container-icons/1** (ba7a7752 → 3dc42814): "The loop2 container built from the repository
  serves each SVG icon file directly in `assets/icons/` at the path `/icons/<file name>`, with the
  same bytes as that icon file." Reading unchanged.
- **program-rule-pick/1** and **action-in-progress/1**: sentences unchanged; only the docstring
  reference noted under B4 and the extra *Derives from* of action-in-progress.

### Part map

Not changed. The part map's guard reports a pattern that matches no tracked file as an error, so the
six expected check files cannot be claimed before they exist. Each is claimed in the commit that adds
it: the two `test_terrain_drawing_*.py` under browser-view, the other four under simulation.

## Meaning points the human sees at the merge

| Entry | Old | New |
|---|---|---|
| D-04/3, third sentence | The browser view draws the game only from the game state, and changes the game state only through functions of the simulation, to which it passes the player's choices and the passing of real time. | The browser view draws the game only from the game state and the game's content data, and changes the game state only through functions of the simulation, to which it passes the player's choices and the passing of real time. |
| D-26 | A program points at a thing of the world only as the nearest known one of its kind, counted in game minutes of walking, never by a number of its own. | (same) + An action of the character that goes to a thing of the world can be carried out where a thing of its kind is known and the character does not stand on one, and nowhere else: there it has nothing to go to. |
| D-27, last sentence | The game's footer credits each icon with its author, its page on game-icons.net and its licence, and says how the file differs from its source. | The game's footer credits each icon with its title as game-icons.net gives it, its author, its page on game-icons.net and its licence, and says how the icon file differs from its source. |
| icon-credits/1 | For each SVG file in `assets/icons/`, the game's footer shows a credit that names the icon's author, its page on game-icons.net and the licence CC BY 3.0, and says how the file differs from its source. | For each SVG icon file directly in `assets/icons/`, the game's footer shows a credit that names the icon's title as its page on game-icons.net gives it, the icon's author, that page and the licence CC BY 3.0, and says how the icon file differs from its source. |
| walk-target/1 | … nearest in game minutes of walking, and the character cannot carry it out where no revealed tile holds some of that resource or where it stands on one that does. | … nearest in game minutes of walking. (The clause becomes walk-feasibility/1, stated both ways.) |

What changes for the player: the footer must also show each icon's title ("Wood stick icon" and so
on); the code does not show it today, so icon-credits/1 fails once its check asks for the title,
until the code agent adds it. Nothing
else changes in what the game does: the D-04/3 and D-26 wordings describe what the code already does.

## Questions

1. **walk-target's identifier.** `.the-way/elements/common/rules.md` says a split gives each entry
   that comes out of it a new identifier. walk-target never reached the main branch, so it may go,
   but I kept it as the request asked: the nearest-tile sentence is what the name names. The other
   way is to withdraw nothing and rename it (for example `walk-step-target`), which means one more
   rename in its check. Recommendation: keep it.
2. **The title as shown.** game-icons.net's heading is "Wood stick icon", not "Wood stick"; every
   page adds " icon". The facts quote the heading. Showing it trimmed would rest on no source.
   Recommendation: the footer shows the heading as it stands.
3. **"keep intact all copyright notices for the Work" (4(b)).** The credit fact leaves this duty out,
   as the request listed only (i)–(iv) and the exception. The source icon files at 82d9488 hold no
   copyright notice, so nothing is lost today, but a later icon carrying one would meet no entry.
   Adding it to the fact costs one clause and no change to D-27. Recommendation: add it in the next
   foundation step that touches the fact, or now if the merge reviewer wants the 4(b) quote whole.
4. **D-23 naming action-in-progress.** I read "no way to carry out a character's action by hand" as
   held by program-rule-pick together with action-in-progress, rather than writing a seventh
   invariant that would repeat them. If you prefer a sentence of its own, its form would be "Every
   action of the character in a map run starts at a free game minute."

## After the checks

Commit `4096c88` (`foundations/decisions.md`, `invariants.md`, `part_map.md`), from 95c9095.

1. **terrain-drawing-interaction/1 removed.** It never reached the main branch, so it is not
   listed as withdrawn (`.the-way/elements/common/rules.md`, "Withdrawn identifiers"), and nothing
   in `foundations/`, `tests/` or `src/` names it. D-19's binding sentences are unchanged, so its
   fingerprint stays f7077364 and terrain-drawing-numbers/1 keeps `D-19@f7077364`. D-19
   Verification, new: "level 1 — invariants: terrain-drawing-numbers. Level 2 for hovering and for
   everything else the player does on the drawing, since what the player sees and what the drawing
   does in answer is shown only by a real browser, which the repository does not declare", with the
   pair: complies — hovering a tile marks its row in the list of revealed tiles, and hovering that
   row marks the tile; violates — a click on a tile that sends the character there or changes the
   program.
2. **Part map.** browser-view claims `tests/invariants/test_terrain_drawing_numbers.py`; simulation
   claims `test_program_closed_lists.py`, `test_walk_feasibility.py`,
   `test_program_world_reference.py` and `test_map_run_layout.py`.
3. **Titles moved into `src/browser/sim/data/`: what would read wrong.**
   - content-identifiers/1, D-18/1 and D-27/1's binding sentences still read true: the title is no
     longer outside the data, D-18 forbids nothing else in data files, and D-27 does not say where
     the title is kept.
   - **icon-credits/1 *Part*** (`browser-view`) would be too narrow: a change in
     `src/browser/sim/data/`, which the simulation part holds, could then make the sentence false,
     and the gate would not run the invariant for it. It should read `browser-view · simulation`.
   - **D-27/1 *Scope*** (`browser-view, build-tools`) would likewise miss `simulation`, so a change
     to the titles in the data would not find D-27.
   - The simulation part's sentence ("computes the game … from the game's data") does not mention
     credits; the files are claimed through `src/browser/sim/**` all the same, so nothing fails, but
     a reader of the map would not expect icon credits there.
   - Whoever adds the titles to the data checks that the content-identifiers tripwire, which writes
     the data's maps, resources and archetypes out, does not count a new field as a new entry.

Guards, base and merge-onto d2b4687320e7b0e89306e9e5530bfc824a90627f: decisions, invariants,
environment facts and glossary exit 0 with 0 errors, 0 warnings, 0 unchecked; part map (`--base`)
exits 0 with 0 errors, the same 2 warnings (now lines 80 and 127) and 1 unchecked (dependency graph).

### Point 4 applied

Commit `1b62937`: icon-credits/1 *Part* `browser-view` → `browser-view · simulation`; D-27/1
*Scope* `browser-view, build-tools` → `browser-view, build-tools, simulation`. Neither field is in
a fingerprint (D-27 stays 06e0600c, icon-credits/1 stays ffb7685d at version 1), so no reference
changed. Guards, base and merge-onto d2b4687320e7b0e89306e9e5530bfc824a90627f: decisions,
invariants, environment facts and glossary exit 0 with 0 errors, 0 warnings, 0 unchecked; part map
(`--base`) exits 0 with 0 errors, the same 2 warnings (lines 80, 127) and 1 unchecked (dependency
graph).

### map-run-layout/1 reworded

Commit `99c7f3b`: "Two map runs of one game map on one seed have the same resources on each tile at
every game minute, whatever programs they run under." → "Two map runs of one game map on one seed
have the same kinds of resource present on each tile, whatever their amounts, at every game minute,
whatever programs they run under." Meaning unchanged (the reading the check follows: which
resources a tile holds, stock 0 included, not how much). Fingerprint c41bf931 → a366d038, version
stays 1 (new on this branch). No entry carries an invariant's fingerprint; D-22's Verification
names the identifier only. `tests/invariants/test_map_run_layout.py` lines 1–2 quote the old
sentence in its docstring, for the check's author. Guards: four exit 0 with 0/0/0, part map exits 0
with 0 errors, the same 2 warnings and 1 unchecked.
