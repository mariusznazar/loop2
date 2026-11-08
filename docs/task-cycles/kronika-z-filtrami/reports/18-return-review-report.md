FAIL 638e89e

# Report 18 — review of the return step's commits (stage: review-change, the return step)

Range `621d144843f24b5c7fac93f321be1ccf1841dda5..638e89e0f6e24e746f9168b82a219b70d95cd4dd`, branch
`task/kronika-z-filtrami`; `git rev-parse HEAD` = `638e89e0f6e2…`, as given. Two commits: `f71a388`
(fact `playwright-cli-console-messages`, D-347 *Based on*) and `638e89e` (D-348). Only
`foundations/decisions.md` and `foundations/environment_facts.md` change.

Counts: blocking 1 (Important); Minor 3; out of scope 0.

## Findings

### Important

**I1 — D-348's second binding sentence says every change of the copy is described from the copies
before and after the act; a discard and a save are not, and D-342 forbids it for a discard.**
Place: `foundations/decisions.md:7691-7694` (D-348, second sentence: "The browser view describes a
change the player makes to the copy from the copy before the act and the copy after it, together
with the program rule or rule group the player moved where the program editor names it …").

- In the log's own words a discard, a save and a switch are each "a change of the copy": D-342
  (`foundations/decisions.md:7505-7511`) "Each change of the copy a map run carries out gives an entry
  … „Porzucono zmiany kopii”, „Zapisano kopię w programie „…””, … „Przełączono postać na program
  „…””", and D-131 names "the discard of the copy's unsaved changes" among the changes of the copy.
- The code describes only an edit from the two copies. `src/browser/view/chronicle-entries.ts:307-325`
  (`actEntries`): `case "edit"` → `copyChangeTexts(before.run.copy.program, run.copy.program,
  act.move)`; `case "discard"` → `["Porzucono zmiany kopii"]`, a fixed text whatever the discard
  changed; `case "save"` / `"saveAsNew"` / `"switch"` → a sentence with the program's name from the
  state after. The view knows which act it was from `CopyAct`, which `src/browser/view/game-view.ts:229-261`
  passes at each act site — a source the sentence does not name.
- The reviewed spec says the same as the code and narrower than D-348: D4 (`spec.md:283-291`) "The
  game view gives the chronicle, with each act on the copy, what the act was … a discard: „Porzucono
  zmiany kopii” alone, whatever the discard changed; an edit: one entry for each change between the
  copy's program before and after the act". D-348 drops both the act as a source and the
  qualification "an edit".
- Why it matters: read as written, D-348 requires a discard to be described by comparing the copies
  (entries such as „Usunięto regułę …” for each change reverted), which D-342 and its *Verification*
  rule out, so the two entries collide on a discard with no precedence recorded; and an agent comparing
  the code with D-348 finds the discard and the save non-compliant. This is the case WAY-263 grades
  Important: an entry the change writes restates the code and the spec more broadly, without the
  qualification.
- Evidence: the lines above; `tests/view/chronicle-entries.test.mjs` holds the discard's single text.
- Within the task (the return step's own entry). A wording that matches: "The browser view describes
  an act of the player on the copy from what the act was and, for an edit, from the copy before the
  act and the copy after it, together with the program rule or rule group the player moved where the
  program editor names it, which never enters the simulation, and no event of the simulation describes
  such a change." A complies example such as "„Porzuć zmiany” giving „Porzucono zmiany kopii” alone,
  whatever it reverted" would pin it.

### Minor

**M1 — D-348 makes the editor's move hint a source of the chronicle and says `derives from D-04`,
while D-04's sentence lists what the view draws "only from".** Place: `foundations/decisions.md:7698`
and D-04 `:57-60`. D-04's list (game state, content data, clock, and for the scene and the chronicle the
previous reading and the events) does not name the player's act. I read it as no collision: D-04
already names "the player's choices" the view passes to the simulation, no decision of the log
narrows D-04 for the view's own memory of the page (searched `narrows D-04`: none), and D-348 states
the hint outright. Left Minor; were the human to read D-04's "only" strictly, D-348 would need
`narrows D-04` and its area in the binding sentences (template, "Relations and precedence").

**M2 — D-348's *Rejected* drops the qualification on the lost cause.** Place:
`foundations/decisions.md:7722-7723`: "readings of the game state alone … — the game minute of a loss
and its cause, and a campfire lit again within one reading, are lost". Spec D1 A (`spec.md:183-185`)
and D-348's own *Rationale* (`:7714`) lose the cause only "where the body recovered within the span".
Prose, binds nothing; a reader weighing the way again is told more than the spec found.

**M3 — D-348's *Origin* names where the question stands, not where the reasoning lives.** Place:
`foundations/decisions.md:7710`. The task's *Questions carried to cycle* 1 and 2 (`task.md:140-141`)
hold the questions; the reasoning (spec D1, D4) lives in `.runs/`, which goes with the task, and the
entry's *Rationale* and *Rejected* carry it. The template's *Origin* is "where the full reasoning lives
… When the whole reasoning is in the entry, it is `none`". Other cycle-written entries of this log
point to the task document the same way, so this is a matter of the log's convention.

## Checked and found matching

- **D-348, first sentence**, against `src/browser/sim/run.ts` at the head (identical to `621d144` outside
  `foundations/`): `streakLost` with `minute`, `streak` (count before) and `cause` (`:87-93`); emitted by
  the body step in a living minute (`:553-566`) and in a death minute ahead of `characterDied`
  (`:545-548`), by `withCopyProgram` (`src/browser/sim/programs.ts:580-601`, only where the map run has
  not ended and the rules changed) and by `switchProgram` (`programs.ts:756-771`). Every other place
  that sets a streak to 0 creates a map run (`run.ts:388`), so "wherever it falls" holds. `streakLossEvents`
  fires on `healthLoss !== null`, the same reading as `lostHealth` (`src/browser/sim/body.ts:99-100`).
  `campfireExtinguished` for each campfire falling from above zero to zero, in an encounter minute too
  (`run.ts:491-500`, `:520-526`). The paragraph is placed at the `attacked` event and composed from
  `lastCombat` (`src/browser/view/chronicle.ts:181-185`, `:115`): "save the paragraph … (D-147)" holds.
  `GameState` holds no event.
- **D-348, *Verification***: the „↓” example matches `movedRules` (`chronicle-entries.ts:172-204`: the
  hinted rule leaves the comparison, so one entry) and `tests/view/chronicle-entries.test.mjs:80-91`;
  the hint reaches the chronicle from `rule-list.tsx:356-357`, `:387` through `editCopy`
  (`game-view.ts:226-229`) and is not passed to `setProgram`. The encounter-minute campfire example
  matches `run.ts:524`. The violating examples are code against the decision with the entry unchanged.
- **D-348, *Rationale* and *Rejected***: each way and each cost traced to spec D1 (A, B, C, "Cost if
  wrong") and D4 (the three ways, "Cost if wrong"); nothing invented beyond M2. No file, script or count
  named; no process tool's lack.
- **D-348, form**: question heading, two binding sentences, no normative or forbidden words, *Scope*
  parts in the map, *Based on* `none` (it rests on no outside source), *Relations* by number.
- **`playwright-cli-console-messages`**: the cited address (frozen commit `b85c7a7…`, the edition the
  neighbour facts cite) fetched now; line 264, under `## Commands` → `### DevTools`, reads
  `playwright-cli console [min-level]      # list console messages`; the entry quotes it with whitespace
  collapsed, as the template gives. The sentence says no more than the line, names no edition, holds no
  date-moving word; the identifier names the subject. Warranted by "Which facts are written": D-347 rests
  on the agent reading the browser's console through the browser it operates (D-254: Playwright CLI), a
  behaviour of a tool the process uses whose loss would call D-347 into question. D-347 naming it in
  *Based on* is the field the template gives for that, and changes no binding sentence.
- **Missed entries**: rows 1, 2, 3, 4, 7, 8, 9, 10, 14 of *Settlements to record* stand in D-339 to
  D-346; the projected D-122 part ("what it named enters the chronicle") and D-311 tabs wording stand.
  The five rows the return report keeps for the questions table (`17-return-report.md`, section 5) I
  judge rightly left there: row 1 is the human's open question; rows 3, 4 and 5 are presentation, an
  algorithm the spec left to the maker, and code structure; row 2 (the filter through „Restart”) is a
  presentation detail nothing later builds on, and D-343 already gives „Wszystko” at a send.
- **Invariant**: D-348's "wherever it falls" can be checked on a commit and `tests/sim/streak.test.mjs`,
  `tests/sim/copy-actions.test.mjs` exercise `streakLost`; the return step wrote no invariant. Not a
  finding: the rule was set already by D-338's and D-341's examples, the foundation step and the
  whole-change review wrote none for them, and `return_step.md` gives an invariant only for a rule set
  by the task, a decision or the human — whether D-348 counts is the human's call at the merge.

## Declined to judge

- The whole-change review's finding 2 (D-346 and a load) — kept for the human by the orchestrator, as the
  handoff gives.

## Checks run

- `git rev-parse HEAD` → `638e89e0f6e24e746f9168b82a219b70d95cd4dd`, exit 0.
- `git log --stat 621d144..638e89e`, `git diff 621d144..638e89e` → exit 0; only `foundations/` changes.
- `git diff --stat 621d144 638e89e -- . ':!foundations'` → empty, exit 0.
- `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` → both `294af7fde453…`, exit 0.
- `python -B .the-way/elements/common/foundation_check.py` on the head → `0 errors`, exit 0.
- `curl -sS https://raw.githubusercontent.com/microsoft/playwright-cli/b85c7a736bb473bf55b584e54a09ffa698d6d871/README.md`
  into the session scratchpad → HTTP 200, exit 0; `grep -n -i console` finds line 264 once among the
  commands.
- Manual: reading of the code named above against D-348's claims.
- Not run: product tests (no code changed; the full suite is the cycle's run).

## Reaches beyond the handoff

- `.the-way/task-cycle/skill/return_step.md` (named by the handoff as to read), `.the-way/elements/decisions/template.md`,
  `.the-way/elements/environment-facts/template.md` — the rules the entries follow.
- `.the-way/foundations/decisions.md` WAY-12 — whether a test-backed rule calls for an invariant.
- `foundations/decisions.md` D-343, D-345, D-346 (read with the D-338 to D-347 block), D-295 (the
  return report's precedent for D-04), grep `narrows D-04` / `derives from D-04` — for M1.
- `foundations/invariants.md` `streak-program-change` — whether an invariant already holds the loss event.
- `src/browser/view/chronicle-entries.ts` (`actEntries`, `copyChangeTexts`, `movedRules`, `eventEntry`),
  `chronicle.ts` (`record`), `game-view.ts:214-296`, `rule-list.tsx` (hint sites),
  `src/browser/sim/run.ts`, `programs.ts`, `body.ts` — the claims of D-348.
- `tests/view/chronicle-entries.test.mjs:80-91` — the „↓” example.
- The Playwright CLI README at `b85c7a7` (network fetch) — the fact's source.

## Searches not found or unclear

- A decision that narrows D-04 for what the view keeps in the memory of the page — not found; hence M1
  stays Minor and open to the human's reading of D-04's "only".
- Whether the log's convention for *Origin* of a cycle-written decision is the task document's question
  or `none` — unclear (M3).
