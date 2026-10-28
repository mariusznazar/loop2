FAIL de899faf67a7918ac9e533c166c5fdd62d27b314

# Review — the return step, task `rozwiazanie-lasu`

- Range: `5cb8d0b..de899fa`, one commit `de899fa` ("docs: :memo: record the part of the map-solving
  decision the forest-solving task makes true"). `git rev-parse HEAD` in the worktree is
  `de899faf67a7918ac9e533c166c5fdd62d27b314`, the head given. Pinned the-way `3aee7d9`, matching the
  gitlink.
- Diff: `foundations/decisions.md` +27 −2 (new D-136, D-131 *Relations*, D-21 *Origin*),
  `foundations/invariants.md` +1 −1 (`streak-program-change` *Derives from*).
- Blocking: 1 (Important). Minor: 0. Out of scope: 0.

## The correction itself

The step's central claim holds. Pinned WAY-126 (`.the-way/foundations/decisions.md:2876`): a
projected entry enters "in the change of the first task whose code makes it true … where the code
makes only part of it true, the agent writes that part", and the return step "writes one the code
makes true that the foundation step missed". The frozen task says the same for this task
(`task.md:157`: „Zadanie urzeczywistnia część wpisu i zapisuje tę część (WAY-126)”) and names the
part (`task.md:160`). The plan's line (`plan.md:32-34`: "Not written by this change … task 8 writes
it") contradicts both; the return step was right to correct it.

D-136 against the approved projected entry (`definicja_mvp_loop2.md:1298-1336` in the vault) and the
code:

- Binding sentences keep exactly the part `task.md:160` names: condition in the map's data as a
  streak (`src/browser/sim/data/maps.ts:55` `solving: { streak: 480 }`, `src/browser/sim/run.ts:327`
  `meetsSolving`); streak counts minutes with no health lost to cold or hunger and a loss sets it to
  zero (`src/browser/sim/body.ts:65` `lostHealth = chilled || starving`, `run.ts:332-333`
  `streakAfter`); a change of the program rules or rule groups the map run carries out sets it to
  zero (`src/browser/sim/game.ts:394-403` `setProgram`, zero only for a run not ended, which no
  longer carries anything out). Attacks, opener, combat wounds, program switch and trip plan are
  left out. Matches.
- *Rationale* drops the sentences on combat wounds and the opening map; *Rejected* kept whole; no
  *Approved by* copied (WAY-126). *Verification* names `streak-program-change` and swaps the
  projected examples about Las — głębiej and a wolf's bite for ones this code makes true. Fine.
- Wording rule of question 10, way B: `git diff -U0 5cb8d0b..de899fa -- foundations | grep '^+' |
  grep -i -w -E 'only|never|always|without|alone'` gives no hit; "while no map asks for it" in
  *Rejected* describes what the game lacks today, as the rule asks.
- D-131 `derives from D-136`: D-131 answers a narrower question (which edits count) serving D-136;
  the relation type fits the template (`.the-way/elements/decisions/template.md:145-147`).
- `streak-program-change` `Derives from: D-131 · D-136`: the projected invariant derives from the
  projected decision (`definicja_mvp_loop2.md:2137`); D-136's *Verification* names it back
  (template, `:157-159`). Sentence and test unchanged; the test's docstring cites only the sentence
  (`tests/invariants/test_streak_program_change.py:1-2`), so nothing there goes stale.
- D-21 tie: D-21's binding sentence already states that a map run the player starts may be
  fast-forwarded; tying the projected part "a manual map run may be fast-forwarded" by *Origin*
  instead of a second entry follows WAY-126's last sentence ("writes a new entry only for a rule none
  of them states") and the foundation step's tying rule (WAY-134).

## Findings

### Important

**I-1 — The streak's counting rule now stands in two decisions, D-71 and D-136, against WAY-19.**
(Within the task; blocking.)

- Place: `foundations/decisions.md:1325` (D-71, binding sentence) and
  `foundations/decisions.md:2460-2463` (D-136, binding sentences); D-71 *Relations*
  (`derives from D-04 · derives from D-23 · derives from D-118`) unchanged.
- What is wrong: D-71, whose question is the order of a game minute, says of the streak "which grows
  by one where the character lost no health for being chilled or starving in that minute and falls to
  zero where it did". D-136, written by this commit, answers that same question as its own: "A
  streak counts the successive game minutes in which the character loses no health to cold or
  hunger: a game minute with such a loss sets it to zero". D-71's *Verification* also carries a
  counting example ("violates: … a game minute in which the character is chilled growing the
  streak") that duplicates D-136's ("a game minute in which the character is starving leaving the
  streak as it stood"). The commit leaves D-71 untouched and without a relation to D-136; the step's
  report records this as a choice ("D-71 left without a relation to D-136").
- Why it matters: pinned WAY-19 — "When a new decision answers a question that an older one answered
  in passing, the sentence moves to the new decision, and the older one loses it in the same change";
  its *violates*: "the sentence stays in both decisions"; its rationale: "two entries answering one
  question drift apart". Also restated in `.the-way/elements/decisions/template.md:120-121`, and
  WAY-126's rationale ("keeps one entry per rule"). The drift is concrete: task 8 is to write the rest
  of the projected entry into D-136 ("wounds taken in combat do not" set it to zero); a reader or
  agent changing the counting in one place has no relation pointing to the other.
- What the task mandates: row 5 of *Settlements to record* (`task.md:174`) put the counting into the
  sentence added to D-71, written by the foundation step before D-136 existed; once D-136 holds the
  counting, row 5's meaning stays held across the two entries (D-71 keeps where the streak moves in
  the order, D-136 what it counts), so the move changes no accepted meaning.
- Recommended correction, in this return step: D-71 keeps the streak's place in the order — e.g.
  "— and with it the streak of the map run, as D-136 counts it;" (or the same placement without the
  counting clause) — and loses "which grows by one … and falls to zero where it did"; D-71
  *Relations* gains `derives from D-136`; D-71's *violates* example "a game minute in which the
  character is chilled growing the streak" is dropped or moved into D-136. D-71's *Rationale* ("The
  streak follows the body …") is about the order and stays. The request then lists D-71 among the
  entries changed, with its Polish sentence.
- Evidence: `grep -n "grows by one\|falls to zero" foundations/decisions.md` → only `:1325`;
  `sed -n 2458-2481p foundations/decisions.md` (D-136); `awk` over D-71 → *Relations* without D-136;
  pinned WAY-19 read whole.

### Minor

None.

## Declined to judge

None set aside as outside the task.

Considered and not raised: D-131 overlapping D-136 on program changes — D-131 answers the narrower
question of which edits count and records `derives from D-136`, so it is a derived decision, not a
second answer; D-136's heading "How is a map solved?" in place of the projected "…, and what opens the
next one?" — the binding sentences answer the narrower question, and how task 8 adds the opener is
task 8's work; D-136 *Origin* dropping the projected *Origin*'s "§4 Kierunek: przedmioty krążą między
mapami" while *Rejected* keeps the backpack alternative — I could not establish from
`koncepcja_projektowa.md:156-215` that §4 is that alternative's source, so no finding; D-136 *Scope*
`simulation` — the rule's code is all under `src/browser/sim/`.

## Checks

| Check | Exit / method | What it showed |
|---|---|---|
| `git rev-parse HEAD` | 0 | `de899faf…`, the head given |
| `git -C .the-way rev-parse HEAD` vs `git ls-files --stage -- .the-way` | 0 | both `3aee7d958835…` |
| `git log 5cb8d0b..de899fa --stat`, `git diff 5cb8d0b..de899fa` | 0 | one commit, two files as above |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `git diff -U0 5cb8d0b..de899fa -- foundations \| grep '^+' \| grep -i -w -E 'only\|never\|always\|without\|alone'` | 1 | no hit |
| `grep -rn "D-135\|D-131"` over tracked `.md/.py/.ts/.mjs` outside `.runs`, `.the-way` | 0 | no reference elsewhere needing the new relation |
| `grep -rn "grows by one\|falls to zero"` over the same | 0 | the counting clause only in D-71, `decisions.md:1325` |
| Manual: D-136 binding clauses read against `maps.ts:17-36,55`, `run.ts:292,325-370`, `body.ts:40-80`, `game.ts:386-405,622` | — | each clause true in the code; nothing beyond the part `task.md:160` names |
| Manual: D-136 against the projected entry, `definicja_mvp_loop2.md:1298-1336` | — | as under *The correction itself* |

No test run: the commit changes no code, no test and no invariant sentence. The full gate was not
run, as the handoff says.

## Reaches beyond the dispatch

- Pinned WAY-19 (`.the-way/foundations/decisions.md`, entry whole) and
  `.the-way/elements/decisions/template.md:120-175` — to judge whether a sentence of D-71 may stay
  beside D-136, and the allowed relation types.
- D-71 (`foundations/decisions.md:1323-1335`) and D-21 (`:422-447`) whole — D-71 holds the
  overlapping sentence; D-21 carries the tie.
- `definicja_mvp_loop2.md` in the vault, `:1298-1336`, `:1373-1405`, `:2130-2142` — the two
  projected decisions and the projected invariant whole, to check the part written against what the
  gate approved.
- `koncepcja_projektowa.md` in the vault, `:156-215` — whether §4 sources the kept *Rejected*
  alternative.
- Code: `src/browser/sim/data/maps.ts`, `src/browser/sim/run.ts`, `src/browser/sim/body.ts`,
  `src/browser/sim/game.ts` (passages above) and `tests/invariants/test_streak_program_change.py:1-12`
  — to read D-136 and the invariant's derivation against the code.
