# Check author report — mag-w-lesie, c1 (WAY-69)

Worktree `C:\Storage\repos\loop2-mag-w-lesie`, branch `task/mag-w-lesie`, started from 1098bae.
No skill was used. Nothing outside `tests/invariants/` was changed. `loop2_invariant_support.py`
was not touched. No package was added. Nothing was pushed.

## Commits

| Commit | Files |
|---|---|
| 77b6046 | `tests/invariants/test_program_closed_lists.py` (new) |
| 2757265 | `tests/invariants/test_walk_feasibility.py` (new), `test_walk_target.py`, `test_program_rule_pick.py` (docstring: walk-feasibility/1) |
| fea10f1 | `tests/invariants/test_program_world_reference.py` (new) |
| 3dd3a98 | `tests/invariants/test_map_run_layout.py` (new) |
| f2d920d | `tests/invariants/test_terrain_drawing_numbers.py` (new) |
| 95c9095 | `tests/invariants/test_icon_credits.py` (title), `test_icon_file_content.py` and `test_loop2_container_icons.py` (docstrings only) |

Not written: `test_terrain_drawing_interaction.py` (see "Sentence not checked").

## Reading choices, per check

All checks build the product with `npm run build` in a temporary copy of the tree and drive the
built modules with a Node script, as the existing checks do.

**program-closed-lists/1.** The kinds are written out: conditions `always`, `hereBelow`; actions
`explore`, `wander`, `walkTo`. A tripwire reads the keys of `CONDITIONS` and `ACTIONS` from the
built data and fails when they differ from the written-out kinds in either direction, because a
kind added to the data or taken out of it is a foundation step. "Refuses" means `setProgram`
throws, or the state it returns still holds the previous program (BASE). Each unlisted kind is
offered in rule 1 of 3, both bare and with the fields of a listed kind, both with and without a
map run. The unlisted kinds are made-up ones, case variants, names every JS object answers to
(`toString`, `__proto__`, `constructor`…), the other list's kinds, the empty string, a missing kind
and kinds that are not strings. A control shows that a program of every listed kind with valid
fields is taken in exactly as offered.

**walk-feasibility/1**, checked both ways at every free game minute:
- Where the going is feasible and its rule is the first whose condition holds, that rule starts.
- Where it is not feasible, the rule is passed over: the started activity is a later rule, not the
  going and not a wait. Each program ends with "always → wander".

The programs are of two kinds:
- The going rule is rule 0.
- The going rule is rule 1, after a rule whose condition never holds.

Both alternate with a roaming program every 40 minutes, for 800 minutes, over 4 resources × 5
seeds. Under the roaming program, no going may start.

A stock of 0 never comes about in the simulation today. To cover it, the state returned at the
minute before a free minute is changed:
- ZERO_ALL: every stock of the resource is set to 0, so the going must be passed over.
- ZERO_HERE: the character's tile gets stock 0 while another revealed tile holds some, so the
  going must start.

That changed state is then passed to `advanceMinutes`. Count controls: more than 100 goings, more
than 5 pass-overs for no tile, more than 100 pass-overs while standing on such a tile, and both
ZERO cases for every resource. Made-up records with each kind of break are flagged.

**walk-target/1.** Only goings that were started are read now. The "not started where possible"
check, the pass-over counts, and the standing/empty controls moved to walk-feasibility. One thing
stays, as a consequence of the nearest-tile reading: a going started with no target, or while the
character stands on a nearest tile, is still flagged, because it is no move toward a nearest tile.

**program-world-reference/1.** The check reads the held program (`state.program`) at three points:
right after `setProgram`, after a send, and after 30 game minutes. A held program is flagged when:
- a number stands anywhere except as the `value` of a `hereBelow` condition (COMPARES_STOCK);
- a string holds a digit;
- a `resource` field holds anything but `stick`, `berry`, `moss` or `fiber`.

The offers name tiles or resources by coordinates, a tile number, column/row, an index, an
id of their own, a resource index or a tile label, at the action, condition, rule and program
level. A program that names a tile is either refused or held without the name; both pass. A known
strictness: a later number that names nothing in the world (a rule's own number, for example)
would fail this check until a foundation step updates it. That is stated in the docstring.

**map-run-layout/1.** "Resources on a tile" means the keys of `stock` per (col, row), so stock 0
counts as held. Two map runs on one seed are produced two ways:
- two games sent at the same real time;
- a map run and its restart under a changed program.

The seeds are checked equal first. Every minute from 0 to 300 is compared. There are 3 program
pairs (EXPLORE/WANDER, GOING/EXPLORE, EMPTY/GOING), with the second program replaced at minute 150,
each on 5 seeds. Controls:
- the programs made a difference in each pair (positions or revealed tiles differ);
- tiles hold some resource;
- runs on different seeds differ;
- a resource taken off or put on one tile is flagged.

Both sides of the comparison are runs, because the sentence relates two runs. Nothing is written
out as the expected side.

**terrain-drawing-numbers/1.** The check uses a stand-in `document` in Node, larger than
icon-credits' one: namespaces, `dataset`, class lists, and a small selector engine for
`querySelectorAll` and `closest`. The panel is `createTerrainPanel()`, and a scan confirms the game
imports and calls it. Its drawing is the panel's element without its `table` (the list of revealed
tiles), so any text in the panel outside the list counts as the drawing's. "Shows" covers:
- every text node, including those of `title` and `desc` elements;
- the attributes in SHOWN_ATTRIBUTES (`title`, `aria-label`, `alt`, …);
- the text that `aria-labelledby` and `aria-describedby` point at.

A break is a run of digits equal to some tile's stock in that state, with 0 counted only where a
stock of 0 exists. States drawn: before a send, minute 0, every 20th minute to 600, on 2 seeds,
plus one state with the stock of stick set to 0. Controls:
- the stand-in builds a made-up panel exactly as expected;
- the cut-out list holds every revealed tile's stock;
- the drawing has at least one element per tile;
- made-up drawings with a stock in text, a `title` element, a `title` attribute, an `aria-label`
  or an `aria-labelledby` target are flagged, and one holding only coordinates passes.

Not covered, stated in the docstring: CSS is not applied, and nothing is rendered.

**icon-credits/1.** TITLES is written out per icon file ("Wood stick icon", "Berry bush icon",
"Fern icon", "Flax icon"), from the title facts. The credit's text, with whitespace normalised,
must hold the title in the same letter case. An icon file with no title written out is flagged as
a gap. New controls: no title, another title, the title in a different letter case, and an icon
file with no title fact.

**Self-check of the new checks.** In a scratch built copy (the tree was not touched), I patched one
deliberate break per check. Each break made its check fail:
- closed lists: an unknown condition kind kept;
- feasibility: a going started while standing on such a tile, and a stock of 0 counted as some;
- world reference: `walkTo` keeps an `at`;
- layout: a reveal adds moss to the tile;
- numbers: a tile's `title` holds its stock;
- walk-target: no target is ever found.

This is evidence for me, not the reviewer's accepted break.

## Gate output

Command, from the worktree root:
`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`

- Exit code 1. 141 tests ran in 315 s. 1 failure.
- `.runs/invariant-tests.jsonl` holds 138 lines, with no null lines: no skip, no off-form citation,
  no Docker-absent skip. Docker answered, and no container or image was left behind.
- 36 invariants were cited. 35 are `pass`, including every new and changed check.
- 1 is `fail`: **content-identifiers/1**, from
  `test_content_identifiers.ContentIdentifiers.test_browser_files_outside_the_data_name_no_content`.
  The message is "src/browser/view/credits.ts names the resource stick by its identifier 'stick'".
  The cause is the title `'Wood stick icon'` in `src/browser/view/credits.ts:23`. This check is not
  mine and was not changed. The failure comes from the code's new title, not from a check of this
  step, so there was no TIME_WAIT rerun.

## Sentence not checked

**terrain-drawing-interaction/1** has no check. Its reading needs things a stand-in DOM cannot give:
- the visible hover mark (CSS on `.hovered`);
- the events a real browser sends when the pointer is over a tile, the tile's icon or its outline
  (`pointer-events`, which element is the target);
- the browser's default reactions to clicks, double clicks, wheel, drag of an SVG `image`, keys and
  touch on the drawing.

Dispatching made-up events to the listeners the code registered would check only those listeners.
That would narrow "nothing else the player does … changes the page". The repository declares no
browser and no browser driver (`package.json` has only express and typescript). This is the case
the hand-off named, so I wrote no check for it.

## Questions

1. **content-identifiers/1 against icon-credits/1.** The title the footer must show, "Wood stick
   icon", holds `stick` as a whole word in `credits.ts`. content-identifiers/1 forbids that outside
   `src/browser/sim/data/`. There are three ways out:
   - The code takes the title from somewhere content-identifiers does not scan, for example a data
     file under `sim/data/`.
   - A foundation step narrows content-identifiers/1 so that text quoted from an outside source
     does not count.
   - The title moves into the data.

   Until one of these happens, the gate fails on content-identifiers/1. Who takes this, the code
   agent or a foundation step?
2. **terrain-drawing-interaction/1.** The machine has Edge and Chrome, and Node 24 has a WebSocket
   client, so a check could drive a headless browser over the DevTools protocol without new
   packages. But a browser on the machine is not a repository tool and would need declaring, for
   example as an environment fact. Should the sentence stay without a check for now (its method
   would read `TODO`, or the entry stays unchecked), or should a browser become a declared tool?
3. **Part map.** The five new files are not claimed by any part, and I may not touch
   `foundations/`. The hand-off puts `test_terrain_drawing_numbers.py` under browser-view, and
   `test_program_closed_lists.py`, `test_walk_feasibility.py`, `test_program_world_reference.py`
   and `test_map_run_layout.py` under simulation. `test_terrain_drawing_interaction.py` does not
   exist, so it cannot be claimed.
4. **Housekeeping.** While locating patch points I ran `npm run build` once in the worktree root,
   which wrote the git-ignored `dist/` there. It is ignored build output and was left in place.
