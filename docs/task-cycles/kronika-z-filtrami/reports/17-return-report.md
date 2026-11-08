done

# Report 17 — the return step (stage: make-change, the return step)

## Status

**done** — every entry the change writes or changes, those the task names and those the search found
were compared with the code at `621d144`; nothing no longer matched. The step wrote one environment
fact, changed D-347's *Based on* to name it, and wrote one new decision, D-348 (`the cycle's`). No
question for the human arises (`foundation_step.md`: I have a recommendation for each entry, and none
changes the meaning of an approved decision).

## Commits (branch `task/kronika-z-filtrami`, range `621d144..638e89e`)

| Commit | What | Files (+/−) |
|---|---|---|
| `f71a388` | environment fact `playwright-cli-console-messages`; D-347 *Based on* names it | `foundations/environment_facts.md` +6 −0; `foundations/decisions.md` +1 −1 |
| `638e89e` | D-348 (new) | `foundations/decisions.md` +45 −0 |

Added by path (`git add foundations/…`); worktree clean after each commit. No product code, test or
guideline changed.

## Fields for the orchestrator's record

- **Foundation compared with code:** glossary `chronicle`; D-338 to D-347; D-04, D-19, D-122, D-147,
  D-185, D-272, D-311 (each binding part, *Verification* example and the *Rationale* sentences the
  change added); the *Decisions in play* the task names that the code touches (D-39, D-46, D-130,
  D-131, D-133 as written by task 14, D-173, D-276, D-312, D-334 in passing); the entries the search
  found (D-41, D-70, D-148, D-255, D-282, D-295, D-334 *Rejected*); invariants `simulation-inputs`,
  `simulation-isolation`, `minute-span-split`, `streak-program-change`; the part map entries
  `browser-view`, `simulation`, `agent-workflow`, `product-foundation`. **What no longer matched:
  none.** Details below.
- **Decisions written or changed:** D-348 (new, `the cycle's`); D-347 (*Based on* only:
  `none` → `playwright-cli-console-messages`).
- **Invariants written or changed:** none (no task, decision or human sets a rule for one).
- **Environment facts:** `playwright-cli-console-messages` (new).
- **Glossary terms:** none.
- **Part-map changes:** none.
- **Projected entries written whole or in part:** none in this step (all were written by the
  foundation step and the fix; D-347 gains only its *Based on*, which the definition left `TODO`).
- **Rows of *Settlements to record* written:** none in this step (rows 1, 2, 3, 4, 7, 8, 9, 10, 14
  already stand in D-339 to D-346).

## Meaning of each entry written or changed

- **`playwright-cli-console-messages`** (`the cycle's`). EN: Playwright CLI has a command, `console`,
  that lists console messages. PL: Playwright CLI ma polecenie `console`, które wypisuje komunikaty
  konsoli.
- **D-347, *Based on*** (`projected` entry; the field is `the cycle's`). EN: the decision that an agent
  learns what went wrong from the screen, the chronicle and the browser's console now names the fact
  that the CLI it operates the browser with lists console messages. PL: decyzja, że agent dowiaduje
  się o błędzie z ekranu, kroniki i konsoli przeglądarki, wskazuje teraz fakt, że CLI, którym obsługuje
  przeglądarkę, wypisuje komunikaty konsoli.
- **D-348** (`the cycle's`) — „From what does the chronicle learn what happened in a game minute and
  what the player changed in the copy?”. EN: the chronicle takes what happened in a game minute from
  the simulation's events with their game minute — a streak above zero lost, with its count and cause,
  and a campfire going out among them — except the encounter paragraph, which comes from the facts the
  map run keeps; the view describes a change of the copy from the copies before and after the act,
  with the rule or group moved as the editor names it, which never enters the simulation. PL: kronika
  bierze to, co stało się w minucie gry, ze zdarzeń symulacji z minutą — w tym utratę passy większej
  od zera z liczbą i przyczyną oraz wygaśnięcie ogniska — poza akapitem ostatniego starcia, składanym
  z faktów, które trzyma przejście; zmianę kopii widok opisuje z kopii przed i po czynności gracza, z
  regułą albo grupą przesuniętą wskazaną przez edytor, która do symulacji nie trafia.

The request should put both `the cycle's` entries before the human at the merge (WAY-114), with D-348
named together with D-04, D-341, D-342, D-344 and D-147, from which it derives.

## 1. Entries compared with the code at the head

Each claim the code can falsify, examples of *Verification* included, was read against
`src/browser/view/chronicle.ts`, `chronicle-entries.ts`, `right-area.tsx`, `discovery-band-text.ts`,
`game-view.ts` (`take`, the five acts), `world-area.tsx`, `run-screen.tsx`, `now-lines.ts`,
`styles.css` (`.chronicle*`), and `src/browser/sim/run.ts` (`minuteBeforePick`, `finishMinute`,
`streakLossEvents`, `extinguishedEvents`), `body.ts` (`healthLoss`), `programs.ts`
(`withCopyProgram`, `discardCopyChanges`, `switchProgram`), `game.ts` (`setProgram`, `startRun`,
`restart`, `end`), with the tests where an example names a composed text.

- **`chronicle`** — matches (record of a manual map run; earning loop hands on only `loopRunEnded`).
- **D-338** — matches; complies/violates examples true (loss with no entry impossible: every place that
  zeroes a streak above zero returns `streakLost`; combat death does not zero the streak,
  `run.ts:729-737`).
- **D-339** — matches: `createChronicle` from the loaded state, paragraph at `seq 0`, minute
  `lastCombat.attackMinute`; nothing added to `GameState`/save (`types.ts` changed only in
  `GameEvent`, `saved-game.ts` untouched). The load and the tab are finding 2, left to the human.
- **D-340** — matches: `actionSentence` (the words of „Teraz”, `now-lines.ts:78`); one wait entry via
  the wait mark, also set from a loaded wait.
- **D-341** — matches: five causes in `STREAK_CAUSES`; loss before the death event in the death minute
  (`run.ts:545-548`, loss at `:546`); none in encounter minutes (streak grows) or at a streak of zero; act entries
  recorded before the result's events, so change and loss share the minute.
- **D-342** — matches all listed wordings (group verbs `Usunięto`/`Dodano`/`Zmieniono`/`Przesunięto
  grupę`), after the end at `run.minute` (the end's minute), none for `editProgram`. Literal examples
  held by `tests/view/chronicle-entries.test.mjs`.
- **D-343** — matches: seven `ReactButton`s with `selected`; `Wszystko` picked at a send
  (`mapRunStarted` with no `mapRunEnded` in the result); newest first; `.chronicle-minute` in
  `--text-label`, `.chronicle` on `--panel`; roles by kind; `Nic tu jeszcze nie ma.`
- **D-344** — matches: `Ognisko wygasło` from `CAMPFIRE.name` capitalised; death through `deathText`
  (shared with „Teraz”); completion `MAPS[…].completionText` in `positive` (the text „Teraz” uses,
  `game.ts:244`).
- **D-345** — matches: `discoveryBandText`, shared with the band; one `discovered` event per result.
- **D-346** — matches for leaving the screen, „Restart” and „✕”; the load is finding 2 (not changed, as
  the handoff gives).
- **D-347** — matches; *Based on* was `none` (section 2).
- **D-04** — matches: `chronicle.record(result, before, act)` reads the previous reading and the
  events; examples true. The move hint is the player's act as the view saw it, like the open rule and
  folded groups (D-295), which D-04's list does not name either; D-348 now states it and derives from
  D-04 (search finding below).
- **D-19, D-122, D-185, D-272** — match (table only under „Teren”; band text enters the chronicle;
  „Do skrzynki” under the scene, „Teraz” and „Potem”; no paragraph under the scene).
- **D-147** — matches: paragraph composed from `lastCombat` at draw, placed at the attack's minute,
  replaced at the next attack, cleared by `mapRunEnded` („Restart”, „Zakończ”), stands after a load;
  role `text`. „adds the turns while the encounter lasts” — the turns arrive at the resolving minute,
  the encounter's last; left as the task's word-for-word transitional wording (the whole-change review
  declined to judge the same point).
- **D-311** — matches the world order in `world-area.tsx` and the right area in `run-screen.tsx` /
  `right-area.tsx`.
- **Part map** — every new file falls under `src/browser/view/**` or `tests/view/**`
  (browser-view); the simulation files changed are under `src/browser/sim/**`; dependencies unchanged
  (view imports sim only). No change.
- **Invariants** — `minute-span-split` stays true for the new events (emitted per game minute in
  `minuteBeforePick`); `simulation-inputs`/`-isolation`: no new import or mutation; the hint never
  reaches `editProgram`/`setProgram`.

## 2. Sources outside the product

- **Written:** `playwright-cli-console-messages`. Evidence: D-347 says an agent learns what went wrong
  from the browser's console through the browser it operates, which D-254 makes Playwright CLI; were
  the CLI unable to list console messages, D-347 would be in question, so by the template's „Which facts
  are written” the citation is a fact its *Based on* names. Source fetched now:
  `https://raw.githubusercontent.com/microsoft/playwright-cli/b85c7a7…/README.md` (the edition the
  other `playwright-cli-*` facts cite), § Commands, DevTools — the line `playwright-cli console
  [min-level]      # list console messages`, quoted with whitespace collapsed. Mechanical check: the
  collapsed passage found once in the fetched file (`grep -c -F` → 1).
- **Not written:** Playwright MCP's `browser_console_messages` and Playwright's `consoleMessages`, which
  the research note `technologia_zapis_dzialania_gry.md` § 4 cites — the note cites the `main` branch
  (no edition), and the CLI, the first way of D-254, carries D-347 alone. The HTML exception reporting
  D-347 also touches is already held (`html-exception-reporting`, via D-253).

## 3. Words (WAY-95)

None written. `chronicle` is the one product word with a meaning a field reader would not take, and it
stands. The bare „entry”/„entries” in D-340 to D-344 means a chronicle entry; each of those entries
first says „an entry of the chronicle”, so none reads as the-way's `entry`, and no use is corrected.
„goes out” (D-344, D-348) is read against `extinguished campfire`: the code gives the event only when
minutes of burning fall from above zero to zero, never for a campfire crafted unlit, and D-344's
example („the last minute of burning … passes”) says so; no conflict.

## 4. Rows or projected entries missed

None: rows 1, 2, 3, 4, 7, 8, 9, 10, 14 stand in D-339 to D-346; the projected `chronicle`, D-338,
D-04, D-347 (both sentences since `d47e21f`), D-122, D-147, D-311 stand as the task carries them.

## 5. Choices that bind after the merge (WAY-36)

- **Written: D-348**, the two new events and the way changes of the copy are read. It binds later work:
  any new way of setting a streak above zero to zero must return the loss event or D-341 fails
  silently, task 16's „ostatnie minuty” may read these events, and the hint of a move stays out of the
  simulation. Neither the task nor the spec excludes it; the spec named it as the return step's
  candidate. Its *Rationale* and *Rejected* come from the spec's D1 and D4 (the ways weighed there);
  *Origin* names the task's *Questions carried to cycle* 1 and 2, the vault document that persists.
- **Rows of the questions table (no entry):**
  1. The tab and the filter after a load start at „Kronika” and „Wszystko” — the whole-change review's
     finding 2, kept by the orchestrator for the human; D-346 and the code not touched.
  2. The filter kept through leaving the screen and „Restart”, reset at a send — the spec's D9 reading,
     which the foundation step declined to write (the task did not settle it). Not written: the human's
     answer to row 1 decides how both picks behave across a load, and an entry now would fix half of
     that answer.
  3. The order of the entries of one edit (groups removed, added, changed, moved, then rules likewise,
     then the trip plan) and, within one result, the act's entries before the events' — presentation
     the code holds and tests pin; nothing later builds on it.
  4. The moved rule or group found without a hint (largest set kept in order, first found on a tie) —
     the spec left it to the maker; D-348 carries what binds (the hint where the editor names one).
  5. Recording every result in the game view's one place (`take`) — code structure the coding
     guidelines' file table covers, not a product choice.

## Foundation check

`python -B .the-way/elements/common/foundation_check.py` from the worktree root: before any change
exit 0 (`0 errors`); after the environment fact and D-347 exit 0; after D-348 exit 0; after the last
commit `638e89e` exit 0. No test of the product run (no code changed; the full suite is the cycle's).

## Own-work check

- Requirement most likely missed: a claim of a written entry that the code falsifies, passed over in
  reading — above all a Polish literal the entries promise and the code does not give.
- Check: a script took every „…” literal from the binding sentences of D-338 to D-348 (43) and looked
  for each in `src/browser/**/*.ts(x)`; 34 found verbatim; the 9 not found are composed at run time
  (numbers, `CAMPFIRE.name` capitalised, the band's text) or examples, and each was then found in the
  tests (`tests/view/chronicle-entries.test.mjs`, `chronicle.test.mjs`, `right-area.test.mjs`,
  `discovery-band.test.mjs`). D-348's „↓” example checked against `chronicle-entries.ts`
  (`movedRules`: the hinted rule leaves the comparison, so one entry) and the test at
  `tests/view/chronicle-entries.test.mjs:85-89`. Result: no mismatch.

## Reaches beyond the handoff

- `.the-way/foundations/decisions.md` WAY-03 (the element's example), WAY-11, WAY-30, WAY-33, WAY-36,
  WAY-95, WAY-114, WAY-172; `.the-way/foundations/glossary.md` `entry` — the rules the step applies.
- `foundations/decisions.md` D-41, D-70, D-130, D-148, D-253, D-254, D-255, D-276, D-282, D-295, D-334
  (excerpt) — found by the search for „chronicle”, „paragraph”, „table of revealed tiles”, „right
  area”, or linked from D-347/D-343.
- `foundations/invariants.md` `simulation-inputs`, `simulation-isolation`, `minute-span-split`; grep
  for `events`, `streak`, `campfire`.
- `a research note on saving the game's state, in the author's notes`
  § 4 — what D-347's console reading rests on.
- The Playwright CLI README at `b85c7a7` (network fetch) — the fact's source.
- `the author's rule on writing scripts` — before the own-work script (user rule).

## Choices, with the way rejected and its cost if wrong

- **D-348 written** rather than left to D-04's example. Rejected: no entry — a later way of zeroing
  the streak without the event would break D-341 with nothing in the log saying how the chronicle
  learns of it. Cost if wrong: one decision the human strikes at the merge.
- **D-348 carries the hint of a move** in its second sentence. Rejected: the events alone — the entry
  would say nothing about the change of the copy, the half of spec D1 that also binds. Cost if wrong:
  one clause.
- **The fact cites the CLI only.** Rejected: MCP's `browser_console_messages` — no frozen edition in
  the source, and D-254 makes the CLI the first way. Cost if wrong: a fact for the MCP added later.
- **D-04 left as it stands.** Rejected: adding the hint to D-04's list — a change of an approved
  projected sentence beyond what the task carries (WAY-30). Cost if wrong: a reader of D-04 alone may
  ask where the hint fits; D-348's `derives from D-04` answers it.

## Searches not found or unclear

- An existing environment fact on reading the console with Playwright — not found (grep `console` in
  `foundations/environment_facts.md`: only React's and the HTML Standard's).
- A decision on how the view learns of the facts of a game minute — not found before D-348 (only D-04's
  new example said it).
- Whether „adds the turns while the encounter lasts” (D-147) means minute by minute — unclear; the
  code adds them at the resolving minute; the wording is the task's and stays.
- Whether the human wants the picks to survive a load — open (finding 2, row 1 above).
