done with concerns

# Fix report 15 — the fix of the Minor findings of the review of the whole change

Status: `done with concerns` (finding 2 contested as a question for the human; finding 4 fixed in
part and contested in part).

Range: `1880393..621d144`, three commits, on `task/kronika-z-filtrami`:

- `d47e21f` docs: put back in D-347 the sentence of the projected entry on an exception, and tie it to D-323 and D-253 (finding 1)
- `1f4424a` docs: take the screen file out of Where in code of the styleguide and wrap the rule of the chronicle of a map run (finding 5)
- `621d144` fix: start the window of the chronicle list anew at a send and at Restart, and test that the paragraph of the last encounter is composed once per encounter (findings 3 and 4; both touch `tests/view/right-area.test.mjs`, so one commit by path)

The worktree is clean after the last commit.

## Findings

### 1. D-347 and the projected entry — fixed

Through the project skill `the-way-record-decision` (read from `.claude/skills/`, then
`.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `projected.md`,
`template.md`, `elements/common/way_of_working.md`, `rules.md`, `projected_mode.md`). The entry is
an edit in place of D-347 in `foundations/decisions.md`:

- Binding sentences: the second sentence is back word for word as the task quotes it: „An exception in
  the game shows on the screen as a sentence that something broke and goes to the console.”
- *Relations*: `derives from D-254 · derives from D-323 · derives from D-253`. D-323 and D-253
  state this second sentence exactly (the sentence of the screen and the last whole state; the line in
  the console), so D-347 derives from them and the foundation holds one chain. Neither D-323 nor D-253
  was edited; their meaning stands.
- *Rationale*: the pointer „how an exception shows … D-323 and D-253 give” is removed (the binding
  sentence and *Relations* carry it now); the risk „the sentence may show with no fault or blink” is
  back (still true, D-323's *Rationale* holds the same hypothesis). Left out, as the handoff gave: only
  „Today an exception stops the game without a word, for a person as for an agent.” (untrue since
  D-323).
- Check: `python -B .the-way/elements/common/foundation_check.py` exit 0, `0 errors`.
- The written entry was not shown to the human or to a critique agent first: an entry the cycle writes
  is read by the review of the change and accepted at the merge (`way_of_working.md`, "Critique before
  collective review"), and the orchestrator's handoff gave the content.

### 2. D-346 and a load — contested, cannot be fixed within the task

Not changed (D-346 and the code stand). A qualification of D-346 for a load would add a meaning the
task did not settle (WAY-172). Evidence that code, spec and row agree: settlement row 14 is silent on a
load; the reviewed spec's D2 reads a load as starting at „Kronika” and „Wszystko”;
`src/browser/view/chronicle.ts`, `createChronicle`, has `let tab: ChronicleTab = "chronicle"` and
`let filter: ChronicleFilter = "all"`. It goes to the request's list as a question for the human at the
merge: does a load, with D-212 (the map run goes on after a load), reset „Teren” to „Kronika”, and if
so, is it to be written in D-346?

### 3. The grown window does not start anew at a send or „Restart” — fixed

- `src/browser/view/chronicle.ts`: the snapshot holds `runNumber`, how many map runs the memory has
  seen start (`mapRunStarted`: a send and the start after „Restart”); it starts at 0, and a load counts
  none. `mapRunStarted` calls `changed()` after the increment, so the cached snapshot is renewed. The
  module stays free of React and DOM.
- `src/browser/view/right-area.tsx`: `ChronicleList` is keyed by `` `${snapshot.filter}:${snapshot.runNumber}` ``.
  An entry arriving, a tab change and „Zakończ” do not change `runNumber` (the tab change still
  unmounts the list as before, which the slice 5 report names; kept).
- Failing case first. `tests/view/right-area.test.mjs`, "the grown window starts anew at a send and at
  „Restart”, and stays where an entry only arrives": `npm test -- tests/view/right-area.test.mjs`
  exit 1, the case failing at its assertion `the new map run started by „Restart”: expected 60, got
  120`. `tests/view/chronicle.test.mjs`, "the number of the map run changes at a send and at „Restart”,
  and at nothing else": exit 1, `AssertionError: Restart` (`runNumber` undefined, so the
  `notEqual` fails; the field existed as undefined, so the case reached its assertion).
- After the fix: both files exit 0 (13 and 25 cases pass). The case of the right area also holds
  that, with the window grown, one more entry arriving leaves the window as it is (rows stay at
  the grown count and the newest is at the top).

### 4. No test protects „a row already drawn is not drawn again” — fixed in part, contested in part

- The `useMemo` of the paragraph: new case in `tests/view/right-area.test.mjs`, "the paragraph is
  composed once for an encounter however often the list draws again". The encounter is a `Proxy` over
  the test's own `WOLF_BEFORE` that counts reads of `creatureId` (the first thing `combatText` reads);
  after the first draw two entries are recorded (the list draws again each time, the encounter object
  stays the same) and the count of reads must not change. No change in product code and no counter in
  it. Scratch mutation: `useMemo` replaced by `const paragraph = combat === null ? null :
  combatText(combat);` in `right-area.tsx` gave `npm test -- tests/view/right-area.test.mjs` exit 1,
  the case failing at `two entries recorded, none composed: expected 2, got 6`; the scratch edit was
  reverted (file restored from a copy and the diff of `right-area.tsx` checked to hold only finding 3).
- The `memo` of `Row`: contested, cannot be tested without changing product code. `Row` takes three
  primitives (`minute`, `text`, `role`); no prop function or object is passed to it for a test to
  count, and a render of `Row` that React would skip leaves no mark in the DOM (no mutation) and none
  in the `Profiler` of React except a duration, which is time-dependent. A counter would need to
  stand in `Row` (or a prop only the test uses), which the handoff forbids. Scratch mutation
  recorded: removing `memo` from `Row` (`const Row = (function Row(…) {…})`) gave
  `npm test -- tests/view/right-area.test.mjs` exit 0, so every test passes without `memo`; reverted.
  This part goes to the request's list. The window already bounds the rows drawn, so the effect of a
  `memo(Row)` removal is slower drawing, not a wrong screen.

### 5. Styleguide — fixed

`guidelines/styleguide-browser-view.md`: the line `- \`src/browser/view/right-area.tsx\`` is removed
from `## Where in code` (checked against `.the-way/product-guidelines/styleguide/template.md`,
the `## Where in code` bullet, lines 150–151: token file, directory of shared components, page of every
state). The sentence naming the code place, „a kod kroniki w `src/browser/view/right-area.tsx`”,
stays in the rule's body. The rule „The chronicle of a map run” (the paragraph and the four bullets)
is wrapped near 80 characters; the *Decision*, *Invariant*, *Good* and *Bad* lines are left as every
other rule of the file keeps them. Check: a word diff of the file shows only the removed line (no word
and no decision reference changed); `foundation_check.py` exit 0, `0 errors`.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` after finding 1: exit 0; after finding 5:
  exit 0; after the last commit: exit 0.
- `npm test -- tests/view/right-area.test.mjs`: before the fix exit 1 (the case of finding 3), after
  exit 0 (13 pass); mutation `useMemo` removed exit 1; mutation `memo(Row)` removed exit 0 (reverted).
- `npm test -- tests/view/chronicle.test.mjs`: before the fix exit 1, after exit 0 (25 pass).
- `npm test -- tests/view/chronicle-game.test.mjs`: exit 0 (4 pass).
- `npm test -- tests/view/run-screen.test.mjs`: exit 0 (13 pass).
- `npx eslint --max-warnings 0` on the four changed code and test files: exit 0.
- `npx prettier --check --no-config --no-editorconfig` on the same: exit 0.
- Not run: the full `npm test` (the cycle's run before the request).

## Own-work check

The requirement I was most likely to miss: „not when only an entry arrives, and not when the tab
changes” in finding 3 (a key that changes too often would reset the window for the reader). Check: in
the new right-area case, after the window is grown, an entry is recorded and the row count stays at
the grown count with the new entry at the top, then „Restart” and a send reset it; `runNumber` is not
changed by an entry, a pick or „Zakończ” (the case of `chronicle.test.mjs`). The tab change was left as
it was (unmounting the list). Result: both pass.

## Reaches beyond the handoff

- `.the-way/elements/decisions/skill/*.md`, `template.md`, `elements/common/{way_of_working,rules,projected_mode}.md`: read, as the skill of the element names them.
- `.runs/.../reports/06-foundation-report.md` (F13 passage) and the definition `definicja_mvp2_loop2.md` (lines 1105–1125, the projected entry): to see the full original *Rationale* and which parts were left out and why.
- `.runs/.../reports/11-slice5-report.md` (window passages): for what the slice 5 report says of the window.
- `guidelines/coding.md` was read whole as the handoff required; it does not bear on these changes.

## Choices

- The field is `runNumber` in the snapshot (not a bare counter in the key): the list's key reads only
  the snapshot, as `useSyncExternalStore` hands it over. Rejected: a counter outside the snapshot, which the
  list would have to subscribe to apart. Cost if wrong: one field more in the snapshot.
- `mapRunStarted` calls `changed()` itself, so a start that gives no entry in the same result still
  renews the snapshot. Cost: none worth naming (a start is followed by an entry in practice).
- The new risk entry in D-347's *Rationale* is a restore of what the task's approved *Rationale*
  held; if the orchestrator wants D-323's hypothesis not repeated, it is one clause.
- D-347 `derives from` D-323 and D-253 rather than `narrows`: nothing in D-347 goes against either,
  and `narrows` would claim a precedence the template allows only for a collision.

## Searches not found or unclear

- The task's quote of the original *Rationale* of the projected entry has „[…]” in its middle, so
  the text of the task alone did not give the whole original; I took the whole from the definition
  `definicja_mvp2_loop2.md` (lines 1109–1122), the source the task cites.
- A way to count renders of `Row` inside the product's rules for tests: looked in the page-document
  helper and the React APIs available to a test; none found (see finding 4).
