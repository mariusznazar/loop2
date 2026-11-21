FAIL

# Spec review — model-czynnosci-i-przedmiotow (write-spec, reviewing; first review)

- Method read whole: `.the-way/task-cycle/spec/SKILL.md`, `.the-way/task-cycle/spec/review.md`.
- Spec reviewed: `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md`, against
  `task-frozen.md` (read whole), `reports/designer-report.md`, the foundation entries and guidelines
  of the handoff, and the code at the base `aff09e98`.

## Findings

### 1. The trust boundary says the previous-save reader skips an action with an extra field; the reader keeps it and drops the field

- Where: spec, section *Trust boundary — crafted input*, second bullet
  (`src/browser/sim/previous-programs.ts`: „an item whose program holds such an action is skipped and
  named”). „Such an action” points back to the first bullet's list, which includes „an extra field”.
- What the code does: `readItem` in `src/browser/sim/previous-programs.ts:105-110` passes the program
  only to `checkProgram`, and does not compare the document with what the check built.
  `checkAction` in `src/browser/sim/programs.ts:144-188` builds each action from its known fields
  alone, so a field beyond them is dropped and the program is accepted. Only the load of a saved game
  compares the document with what the check built (`program` → `matches` in
  `src/browser/sim/saved-game.ts:259-268`). The spec's own Decision 3, unit 2, gets this right: „the
  load refuses a field beyond them, as it does today by comparing…”. So the trust-boundary bullet
  contradicts unit 2, D-401 („accepts the program of an item only through the check the program
  editor uses”) and the invariant `previous-save-programs-reader`.
- Why it matters for the build: the trust-boundary section is where the maker and the change's
  reviewer take the crafted-input cases from. A test written from it („an item whose `craft` action
  carries an extra field is skipped”) fails against the reader. A maker who „fixes” it by adding a
  comparison to the reader changes the pull for every action of today, against *To do* 11 and the
  second sentence of the new decision.
- What to change: in that bullet, list the cases the reader skips: „Wytwórz” or „Opatrz” with a
  target the data do not give the verb (moss, a resource with no recipe, an identifier the data
  lack) or with no `item`. Add that an extra field is dropped by the check, as for every action
  today, and does not skip the item. Alternatively, write the first bullet's list so that „such an
  action” does not cover the extra field.

## Checked and found sound (no finding)

- **The task's *To do* 1–15, the *Acceptance criteria*, Questions 1–11 and *Settlements to record*
  rows 1–15:** each is met in the spec's Decisions 1–5, *Constraints* and *Foundation entries*. None
  is contradicted or widened beyond what is named below. Rows 4 and 7 go to the data and the icons,
  as the spec says.
- **Designer's assumption 1 (*To do* 15):** I accept the reading that the pair of content revision
  and fingerprint is what must not repeat. The item states its need in its own clause: a remembered
  judging stands beside a program of other content. It names the moment of change as one way and
  says „wybór drogi należy do cyklu”. The pair removes that case. It does not bring back the
  change-and-back case for which D-442 rejected a fingerprint alone, since the count still rises and
  D-440 still erases.
  - The changes to D-441 and D-442 come with *To do* 15. Any way that settles it, the moment of
    change included, changes D-442.
  - The orchestrator should know the count itself can still repeat. Under a strict reading of
    „Rewizja ma się nie powtarzać” that is a choice the designer made for the human, and the spec
    says so openly (Decision 5, last sentences of its first paragraph).
- **Designer's assumption 2 (the added D-289 sentence):** not invented behaviour. D-289 lists the
  actions that stand greyed with „nie znasz jeszcze celu” when no target is known. The design makes
  that state reachable for the two new verbs, at least through a test or an overlay. Leaving them
  out would leave the editor's behaviour unstated or D-289's list incomplete. This applies an
  existing rule to two new actions; it changes no behaviour of today.
- **Claims about the code, checked at `aff09e98`:**
  - Tables read at call time: `newBackpack` (`character.ts:11`), `itemFor` and `firstItemFor`
    (`program.ts:153`, `program.ts:278`), `checkItem` (`programs.ts:59`), `happened` and
    `newlyRevealed` (`understanding.ts:280`, `understanding.ts:342`), `offeredItems` and
    `conditionTargetPick` (`program-editor.ts:146`, `program-editor.ts:676`), `fullUnderstanding`
    (`balance/engine.mjs:46`).
  - Tables captured at load: `ITEM_IDS` (`saved-game.ts:342`) and `ITEM_ORDER`
    (`judging-cache.ts:61`). `DISCOVERABLE_ITEMS` (`saved-game.ts:337`) and `MINUTE_KINDS`
    (`run-record.ts:16`) are captured at load too. The spec's „a few” covers them, and none lies on
    the path of the acceptance proof.
  - The load refuses extra fields by comparison (`saved-game.ts:259-268`). `resources.ts` is the
    `content-data` exemplar (D-34; `guidelines/coding-content-data.md`). `goalOf` and
    `USES_BACKPACK` are hand-written in `scene-picture.ts:172` and `scene-picture.ts:572`. The
    view's other hand-written list, `RESOURCE_ACTION_KINDS` (`program-editor.ts:127`), falls under
    Decision 3, unit 7.
  - The rewrite of the `isAboveLoaded` comment matches what `judging-cache.ts:253-272` does. Today's
    comment is wrong about a triple whose program is gone while its character stays.
- **The saved game's shape:** the version rise covers it — the keys of `Backpack`, the keys of
  `minutesByAction`, the new variants of `Action` in programs and activities, and the values the
  Understanding, the chest and the trip lists may hold. No other part of the saved shape changes.
  The stored-form version 2 reaches every reader of the stored value: only `judging-cache.ts` and its
  test name the key prefix.
- **The trust boundary, apart from finding 1:** I found no crafted case the section misses. A
  burning item or a current activity that the effect would never make loads today as it will then.
- **Foundation and guidelines:** I found no decision, invariant or guideline contradicted that the
  task does not itself change. The spec changes D-145, D-290, D-121, D-318, D-363, D-293, D-380,
  `content-identifiers` and `icon-credits`; all are carried by the task's *Decisions in play*.
  - D-142 and D-289 (settlement 1) are carried by *Settlements to record*.
  - D-441 and D-442 are carried by *To do* 15.
  - D-289's second added sentence is assumption 2 above.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-35 (first paragraph, read beside D-34). Invariants `program-rule-pick`,
  `icon-file-content`, `loop2-container-icons`, `walk-feasibility` and `simulation-inputs` were read
  beside the named ones while checking the trust boundary and the icons.
- Code: `src/browser/sim/character.ts` (1-25), `run-record.ts` (1-82), `judging.ts` (40-112),
  `judging-record.ts` (whole), `view/discovery-rule.ts` (1-140), `view/end-window-lines.ts`
  (180-260), `view/credit-lines.ts` (25-80), and a search of `view/credits.ts` — the readers of the
  items and action kinds the design changes. `tests/invariants/test_content_identifiers.py` (1-60)
  was read for how the scan treats compound words such as `bandage-roll`.

## Working copies

None made; no directory `.runs/spec-reviewer/` was created, nothing to remove.

**Unread material:**

- Decisions read whole: D-34, D-145, D-289, D-290, D-291, D-293, D-363, D-380, D-401, D-439, D-440,
  D-441, D-442. D-121 read to the start of its rationale; D-306 to its verification. D-18, D-23,
  D-26, D-126, D-128, D-142, D-206, D-310, D-318 and D-340 read in their first paragraph only, with
  the task's quotes. Not read: D-04, D-27, D-50, D-60, D-63, D-64, D-71, D-82, D-120, D-140, D-143,
  D-144, D-150, D-179, D-181, D-193, D-309, D-334, D-387, D-416, D-425, D-427, D-428, D-429, D-437,
  and the decisions the named ones link to; for these I relied on the task's quotes.
- `foundations/glossary.md` — read its list of headings and the entries character skill, game
  minute, map run, program, Understanding, repertoire, manual map run, owner, overlay, wall,
  judging, loop record and content revision; the rest not read.
- `foundations/part_map.md` — read 1-66 (browser-view, simulation) and the headings and file lines
  of the rest; the other parts' sections not read whole.
- `src/browser/sim/saved-game.ts` — read 60-690 and 925-1085; the rest not read.
- `src/browser/sim/programs.ts` — read 1-420 and the list of its functions; 421-840 not read.
- `src/browser/sim/previous-programs.ts` — read whole.
- `src/browser/view/rule-panel.tsx` — not read; `knowledge-lines.ts` — a search only.
- `tests/invariants/test_program_closed_lists.py` — read 190-300; the rest not read.
- `src/browser/sim/program.ts` (30-430), `run.ts` (100-354), `understanding.ts` (36-435),
  `program-editor.ts` (115-175, 410-840), `scene-picture.ts` (290-335, 560-660) read in part;
  `balance/overlay.mjs`, `describe.mjs`, `trace.mjs` read whole; `engine.mjs` a search only.

**Searches not found or unclear:**

- *To do* 15, „Rewizja ma się nie powtarzać dla różnej treści”: it is unclear whether the count
  itself must not repeat or only what a remembered judging is checked against. I accept the
  designer's reading (the pair), as set out above; the strict reading remains open for the
  orchestrator.
