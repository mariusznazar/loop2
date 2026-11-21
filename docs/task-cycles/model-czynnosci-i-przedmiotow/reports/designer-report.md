Status: done — spec written to `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md`, no questions sent.

# Designer report — model-czynnosci-i-przedmiotow (write-spec, writing)

- Method read whole: `.the-way/task-cycle/spec/SKILL.md`, `.the-way/task-cycle/spec/design.md`.
- Spec: `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md`.

## What the task requires, and what I assume

Required (frozen task, *To do* 1–15, *Acceptance criteria*, Questions 1–11 already answered): the
bandage as an item no map holds; „Wytwórz” and „Opatrz” as verbs with item targets taken from the
items' data; their numbers, reasons, view details and revelations as the task gives them; today's
actions unchanged; the instrument following; the save version raised; the foundation entries of item
13; item 15 on the judging cache.

Assumptions I made, each written into the spec where it changes the design:

1. *To do* 15 („Rewizja ma się nie powtarzać dla różnej treści”) is met when the identity of content a
   remembered judging is checked against — the content revision together with a fingerprint of the
   content — never repeats for different content; the count alone may repeat. I read the item's need
   from its own clause („i wtedy zapamiętana ocena ... stoi przy programie o innej treści”). Spec,
   Decision 5. A reviewer who reads the item as requiring the count itself never to repeat would want
   the moment-of-change way, whose cost the spec sets out.
2. D-289 gets, besides settlement 1, the two new verbs in its list of actions greyed with „nie znasz
   jeszcze celu” when no target is known. The task does not ask it; it keeps D-289's list whole for a
   state the design admits. Spec, Decision 3 unit 7 and *Foundation entries*.

## Questions sent and answers

None. Every choice was answerable from the task, the foundation and the code. The design rule to ask
the orchestrator where a rebuilt code shape has no recorded reason did not bite: the one shape whose
reason I looked for (`export type ItemId = ResourceId;`) is kept for every resource — the design widens
the set of items and keeps a resource's identifier equal to its item's — so no reason of the old code
is overturned, and the spec gives none of its own (see *Searches not found or unclear*).

## Ways weighed and why the rejected ones lost

1. Item vs resource — chosen: `ITEMS` holds every item with its own words; `RESOURCES` keeps one row per
   item some map holds, under that item's identifier; `ResourceId` ⊆ `ItemId`. Rejected: (A) a field on
   each resource naming its item — a one-time change of every resource-as-item reader for a case no
   source asks; (B) the bandage as a resource no map holds — a filter in every list of what lies on
   tiles, again for rope and pestle, and the load would admit a tile of bandages; (C) no resource table
   — about sixteen readers change and `resources.ts` is the exemplar of `content-data` (D-34).
2. Recipe and healing — chosen: in the item row, like `fuel`/`food`/`lightable`; the overlay needs no new
   table. Rejected: a recipes table apart (new file, guideline row, overlay table, a join) for gains —
   several recipes per item, a recipe making a non-item — nothing asks.
3. Verb with target — chosen: two new kinds `craft` and `tend` with an `item` field, their targets from
   the item property the verb's data row names, through one new module every reader asks. Rejected: one
   generic `verb` kind (the Understanding, the record, skills and practice key on kinds; a second closed
   list); a `resource` field (the target is an item no map holds).
4. Old programs — chosen: no existing kind changes; the check accepts what it accepted; held by a test of
   a version-9 previous-save program of every old kind. Rejected: rewriting (out of scope); translation
   (nothing to translate).
5. Item 15 — chosen: a fingerprint of the content beside the count in the remembered judging; stored form
   version 2; `isAboveLoaded` comment rewritten, behaviour unchanged. Rejected: the moment of change (a
   clock argument through four writers and the passing of time, their tests, the glossary and D-401/D-442
   meaning, and clock order across devices); the fingerprint alone (D-442's reason: a change back shows
   the old judging); writing judgings only after a confirmed save (saver-cache coupling, D-441 change,
   judgings lost at reload); leaving it (the task asks the fix).

## The four checks

1. Placeholders, `TBD`, empty sections: none. The word `TODO` stands once, naming the new decision's
   fields the definition left `TODO` for the cycle to fill.
2. Contradictions: one found and fixed — unit 2 first said the check refuses an extra field; the check
   builds the action from its known fields and the load's comparison refuses extras, so the unit now says
   that. No decision the task or the foundation holds is contradicted; D-289's added sentence is named as
   an addition (assumption 2).
3. Several independent changes: yes, in part. *To do* 15 (the judging cache: `judging-record.ts`,
   `judging-cache.ts`, D-441, D-442) is independent of the model of actions and items and can be planned
   as its own slice or slices; the task bundles it, so the spec keeps it as Decision 5.
4. Requirements readable two ways: settled in writing — the time source of a verb (`minutes: null` stays
   the movements' mark), the order of the reasons of a recipe's pieces (the recipe's order), the first
   target taken on a change of action (data order, nothing when none known), the reading of item 15
   (assumption 1).

## Reaches beyond the dispatch

- Decisions: D-04 (lines 59–83, the judging cache's link), D-165, D-208, D-209 (to its rationale's start),
  D-97 (to its verification), D-409 — linked from D-439…D-442 as the handoff allows; D-425 (its binding
  paragraphs) — the size limit binds the files the change grows.
- Invariants: `judging-cache-reading`, `previous-save-programs-reader`, `program-rule-pick` (sentence),
  `loop2-container-icons`, `walk-feasibility`, `map-run-layout` (read beside the named ones) — the trust
  boundary of item 15, the reader of previous saves and the icons.
- Code: `src/browser/sim/game.ts` (380–470, 870–920: `newGame`, `setProgram`, the first-chill write of the
  content revision); `src/browser/sim/judging-record.ts` (whole); `src/browser/sim/skills.ts` (55–144) and
  `src/browser/sim/data/skills.ts`, `data/campfire.ts`, `run-record.ts` (whole) — practice and the record's
  keys; `src/browser/view/scene-picture.ts` (165–210, 565–660) and a search of `credit-lines.ts` — the
  hand-written kind lists and the credits; searches of `tests/invariants/test_content_identifiers.py` and
  `test_program_world_reference.py` — what they write out by hand.
- History: `git log -S"ItemId = ResourceId"`, commit `7a273aef`, pull request #25 (`gh pr view 25`) — the
  reason of the code shape the spec widens.
- `.the-way/task-cycle/remarks_check.py` (docstring) — the form this report's sections must take.
- Not reached for: the styleguide and the testing guidelines (no choice needed them);
  `project-level/technology/reserved_choices.md` (no language, library, store, login or place to run is
  chosen).

## Revision

For finding 1 of the spec review (`reports/spec-reviewer-report.md`, finding 1 only read), I changed one
place in `spec.md`: the second bullet of *Decisions* › *Trust boundary — crafted input*
(`src/browser/sim/previous-programs.ts`). The bullet now names what the reader skips: „Wytwórz” or
„Opatrz” with a target the data do not give the verb, or with no `item`. It also says that a field
beyond `kind` and `item` is dropped by the check and the program is appended without it, as for every
action today, because only the load compares the document with what the check built. Nothing else in
the spec changed.

## Working copies

None made. No directory `.runs/designer/` was created; nothing to remove.

**Unread material:**

- `src/browser/sim/programs.ts` — read lines 1–420 (checks, `withProgramContent`, `contentDiffers`) and the
  list of its functions; lines 421–840 not read.
- `src/browser/sim/saved-game.ts` — read 60–100, 255–384, 600–670 and a search of its uses of the data
  tables; the rest not read.
- `src/browser/sim/previous-programs.ts` — read 55–136; 1–54 not read.
- `src/browser/view/rule-panel.tsx` — read 140–260, 360–400, 615–655 and a search; the rest not read.
- `src/browser/view/knowledge-lines.ts` — read 60–110 and a search; 1–59 and 110–148 not read.
- `tests/invariants/test_program_closed_lists.py` — read 1–230 and a search; 231–581 not read.
- `src/browser/sim/game.ts` — the parts named above only (it is no file the dispatch names, but holds part
  of the revision counter's code that D-442 names).
- D-27 — read to line 4910 of its rationale; its rejected ways not read. D-206 — read to the start of its
  rationale (3938). D-334 — read to 10538 of its rationale. D-340 — read to 10962 of its rejected ways.

**Searches not found or unclear:**

- The reason for `export type ItemId = ResourceId;` (`src/browser/sim/data/items.ts`): not found in the
  message of commit `7a273aef` nor in the description of pull request #25 that merged it; the spec keeps
  the equality for every resource and writes no reason for it.
- *To do* 15, „Rewizja ma się nie powtarzać dla różnej treści”: unclear whether the count itself must not
  repeat or the identity of content a remembered judging is checked against; settled as the latter in the
  spec, Decision 5 (assumption 1).
