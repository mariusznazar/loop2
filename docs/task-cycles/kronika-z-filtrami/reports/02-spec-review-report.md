FAIL

# Report 02 — reviewer of the spec (first review)

- Spec reviewed: `docs/task-cycles/kronika-z-filtrami/spec.md`
- Against: the frozen task `docs/task-cycles/kronika-z-filtrami/task.md` (read whole), the foundation
  entries and guideline files the handoff names, and the code at base `6f36c7a`.
- No file changed but this report; no plan, no code, no test or check of the product run.

The design itself holds: I found nothing in it that drops, widens or contradicts a requirement of
the task, and nothing a builder would have to guess where a wrong guess would matter. The one
finding is in the spec's list of foundation entries: it misses three places the change makes
untrue. It is minor and needs only the list extended, but it is a contradiction with the foundation
the build would carry, so the verdict is FAIL.

## Findings

### F1 (minor) — the spec's *Foundation entries* misses three entries the change makes untrue

The spec lists what the foundation step must write and, under "to check", D-185 and D-276 as
entries this change touches beyond what the task names. After this change three more sentences of
the foundation say something false about the merged game, and none is named:

- D-122, *Rationale*, accepted cost (`foundations/decisions.md:2250-2252`): "Accepted with it: … a
  player who goes on at once loses the list of discoveries, since the game keeps no record of
  them". From this merge on the chronicle keeps that record (To do 2; the task's own D-122 part
  "what it named enters the chronicle"). The task says the rest of D-122 "zostaje taka, jaką
  zapisze zadanie 14", which does not cover a rationale sentence this task falsifies.
- D-272, *Verification*, complies example (`foundations/decisions.md:5710-5711`): "the scene at the
  top of the world area … the paragraph of the last encounter on the solid background under it".
  After To do 6 there is no paragraph under the scene.
- D-311, *Rationale* (`foundations/decisions.md:6720-6724`): "„Teraz” and „Potem” stand right under
  the scene, so they do not move as the paragraph of the last encounter grows with each turn" and
  "Accepted with it: … the paragraph of the last encounter two rows further from the scene". The
  spec carries D-311's two first sentences (the task's transitional wording) and its *Verification*
  examples, but not these rationale sentences.

Why it matters: the foundation step works from this list (the spec says entries are "written by the
foundation step or the return step, worded there"); an entry not named can stay as it is, and the
foundation then describes a game that no longer exists (WAY-126). Fix: add the three to the "to
check" bullet beside D-185, with the sentence each makes untrue; the foundation step decides the
wording.

## The orchestrator's points

### 1. What the player sees, To do 1–9 and questions 1–12

Each statement of To do 1–9 maps onto the design without loss or widening: To do 1 → D2 (send,
„Restart”, „Zakończ”, page memory, load); To do 2 → D3, D8; To do 3 → D3 (wait mark); To do 4 →
D1, D3 (order: change before loss in one minute, also at a death); To do 5 → D4, D5; To do 6 → D6,
D9; To do 7 → D1 (campfire), D3; To do 8 → D9, D2; To do 9 → D3, D7, D9. The texts the task fixes
are taken word for word, and the shared words come from `src/browser/view/now-lines.ts`, so the
chronicle and „Teraz” cannot drift apart.

The readings the designer wrote down (spec D5, D9; report 01). For each: whether the task allows
the other reading, and what it would cost.

1. **An edit of the copy's own saved program gives no entry.** Yes, the task allows the other
   reading: „Edycja innego zapisanego programu niż ten od kopii wpisu nie daje” leaves the copy's
   own program out of the rule, and D-174 lets the run screen's panel show and edit that program
   during a map run. The spec's reading follows the reason question 4 gives, „bo przejścia nie
   zmienia”, which covers that program too (D-131, invariant `saved-program-edit`), and To do 5's
   first sentence. The other reading would cost an entry text the task never gives, a second
   comparison at `editProgram`, and an entry for something that changes no map run. Reading
   accepted.
2. **„Zmieniono regułę 2.1: … → …” as whole sentence before → whole sentence after.** The other
   reading (only the part that changed) is possible, but „zdanie z chwili zmiany” supports the
   spec. Cost of the spec's reading: a line such as „Zawsze → Eksploruj → Zawsze → Wędruj”, hard to
   read. The old Loop separated before and after with „⇒” (task, *Context*: „Zmieniono regułę: … ⇒
   …”), but the task fixed „→”. This is product text, so it is for the human at the browser
   check, not for the cycle. Accepted.
3. **Group entries give the verb and the name only.** „wpis o grupie jej nazwę” supports it. The
   other reading (a group's condition before → after) would cost one more comparison and nothing
   in the build depends on the choice. Accepted.
4. **„Ognisko wygasło” for each campfire.** The task gives no ground for choosing one campfire.
   Accepted.
5. **„Nic tu jeszcze nie ma.” in `text-secondary`; Geist Mono for the list and its empty sentence;
   filter buttons in the shared button's font.** The other reading, filter buttons in Geist Mono
   because „Cała kronika stoi w Geist Mono”, is possible. Note that the spec applies „na tle
   `panel`” to the filter row but not „w Geist Mono” to it. The cost either way is a style rule
   (plus a variant of the shared button if Mono), settled through `the-way-maintain-styleguide`,
   and the screenshots show it to the human. `text-secondary` matches D-40 and the styleguide's
   „Wybierz mapę z listy.” (D-331). Accepted.
6. **The filter is kept like the tab, through leaving the screen and „Restart”; „Wszystko” at a
   send.** The task allows the other reading for „Restart”: To do 8 and settlement row 14 keep only
   the tab through „Restart”, while To do 1 treats „Restart” as a start of the chronicle, so
   „na starcie „Wszystko”” could mean „Wszystko” again after „Restart”. Keeping it through leaving
   the screen is not in question, since the screen is only hidden. The cost either way is one line
   and one test (D11 tests the spec's reading). Accepted; worth one sentence to the human in the
   request.
7. **The minute of an act after the end is the end's minute.** The task says so („z minutą
   końca”); no other reading.

The spec also writes down: the chronicle „zaczyna się pusta”, with the minute-0 start as its first
entry. The other reading would drop the first start that To do 3 asks for. Accepted.

### 2. D1: every place where a streak above zero becomes zero

There are three, as D1 says, and no others:

- `streakAfter` in `minuteBeforePick`, both the death branch (`src/browser/sim/run.ts:485-499`) and
  the living one (`:500-501`). Combat minutes add one (`:467-477`).
- `withCopyProgram` (`src/browser/sim/programs.ts:570-590`), whose only callers are `setProgram`
  (`src/browser/sim/game.ts:369-376`) and `discardCopyChanges` (`programs.ts:697-704`).
- `switchProgram` (`programs.ts:739`).

No other place zeroes a streak. `newMapRun`'s `streak: 0` (`run.ts:369`) belongs to a new map run.
The first chill writes its rule into the copy in `advanceMinutes` without `withCopyProgram`
(`game.ts:745-768`), so it leaves the streak. `deleteProgram`, `editProgram` and both saves leave it
(`programs.ts:480-530`, `:630-689`). Earning loops run the same minute but hand on only
`loopRunEnded` (`src/browser/sim/loop.ts:275`), so their losses never reach the view; the task
excludes them anyway.

Order in the minute of a death: the death branch returns `characterDied` as its only event, and the
streak there comes from the same `streakAfter`. Emitting the loss before it fits the code.
`advanceMinutes` pushes `stepped.events` first, and `finishMinute` returns nothing for an ended run
(`run.ts:641`), so the loss and the death stay adjacent and in that order.

### 3. D2/D6: the chronicle after a load

The load path fits D-212, D-283, To do 1 and To do 6:

- D-212: the load comes back paused at the minute of the save. The paragraph's minute is
  `lastCombat.attackMinute`, which is at or before it.
- D-283: leaving the screen does not rebuild the game view, so the chronicle stays.
- To do 1: only the paragraph stands after a load, at the minute of the attack.
- To do 6: one paragraph, the last attack's.

A `lastCombat` set but unresolved (`result: null`, set at the attack, `run.ts:705-710`) gives the
attack description alone through `combatText` (`src/browser/view/combat-line.ts:72-77`). The turns
appear when `finishMinute` resolves the combat after the load (`run.ts:645-656`), and the paragraph
grows, as D6 says, because it is composed from the state at each draw. A completion before the
turns keeps the description without an outcome, as D-147 gives. Neither D-255's risk ("a loaded
save carries no events") nor the load paths in `guidelines/coding-browser-module.md` (rebuild after
401 and after a conflict) contradicts this.

### 4. D-04, `simulation-isolation`, `simulation-inputs`

They are kept:

- The new simulation code lives in `run.ts`, `body.ts`, `world.ts`, `programs.ts` and `game.ts`, and
  imports only the simulation.
- The events are added to returned values only. No passed value is changed, and no state field is
  added.
- The hint of a move stays in the view (D4: "it never enters the simulation").
- The chronicle reads only the state, the events and the previous reading of the state. That is
  the extension of D-04 the task gives ("for the scene and the chronicle").
- `src/browser/sim/saved-game.ts` and the asset globs are untouched, so the "no trust boundary"
  answer of step 4 holds. `saved-game.ts` imports nothing whose shape the design changes.

### 5. What the spec leaves to the maker

Each item under *Left to the maker* is implementation within a stated outcome: names, where the
campfire check sits, how the description reaches `store.apply`, how the screen subscribes, the
fallback for a move without a hint (bounded by D4), the window size, the layout from existing
tokens, and the order of slices. None binds the plan or the foundation beyond what the spec settles.

The two new event kinds are named as a candidate for the return step. No decision enumerates the
event kinds today (searched `foundations/` for the kinds), so that is right. The foundation
omission is F1.

## Observations, not findings

- D3 says an entry's text is "composed once, when it is recorded, … and never again". The combat
  paragraph is the stated exception (D6, D7), so a builder is not misled.
- `saveAndEnd` and `discardAndEnd` go through `endRun`, not the panel's controls
  (`src/browser/view/game-view.ts:451-475`), so no change entry is recorded for that save. The
  result also carries `mapRunEnded`, which clears the chronicle, so nothing is lost.

## Reaches beyond the handoff

- `.the-way/task-cycle/spec/review.md`, whole: named by the method for this step.
- `foundations/decisions.md` D-40 to D-47, read as part of a range around D-39 (D-40 used for
  `text-label` and `text-secondary`; the rest incidental). D-272 (5700-5726), found by searching
  "paragraph" across the decisions to look for entries the removed paragraph makes untrue (F1).
  D-122's *Rationale* is part of D-122, which the handoff names.
- `foundations/invariants.md`: `content-identifiers` and `saved-program-edit` (headings and text
  around the named invariants), to check D3's campfire name and D5's first reading.
- `foundations/part_map.md`: the trust-boundary lines of every part, to check step 4's answer.
- Code beyond the handoff's list: `src/browser/sim/loop.ts` (grep of events), `programs.ts:455-505`
  (`renameProgram`, `deleteProgram`), `understanding.ts:455-483`, `types.ts` (`Activity`),
  `view/clock.ts:40-128`, `view/combat-line.ts:55-77`, `view/status-row.ts:80-118`, and
  `saved-game.ts` imports only (grep), to check that the trust-boundary file needs no change.

## Searches not found or unclear

- Any fourth place that sets a streak above zero to zero: not found (grep of `streak` over
  `src/browser`).
- A decision or invariant that enumerates the kinds of `GameEvent`: none found in `foundations/`.
- Whether `startLoop` or a loop's catch-up hands the view `mapRunStarted`, which would make D2
  clear the chronicle of a manual map run: not found. Loops hand on only `loopRunEnded`.
- Unclear in the task: the filter at „Restart” (point 1, reading 6) and the copy's own saved program
  (reading 1). Each is written down in the spec; neither changes the build's shape.
