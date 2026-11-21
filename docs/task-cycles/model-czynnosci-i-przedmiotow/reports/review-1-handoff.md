# Handoff -- reviewer of slice 1 (`review-change`)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` -- branch `task/model-czynnosci-i-przedmiotow`. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`). You are READ-ONLY: you change no file of the worktree except your report; you commit nothing.
- Your method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; this is the review of a slice (not the whole change, not a fix): you read what this handoff names. Do not call a skill; read the files.
- What you review: **slice 1**, the range `ed70970ab7a3215b8fe48b0178973483ad54d26b..0a41bd058c99181fb05b8e49ecfa5a7b01e9e8ab` (base..head); compute the diff yourself with `git diff ed70970ab7a3215b8fe48b0178973483ad54d26b..0a41bd058c99181fb05b8e49ecfa5a7b01e9e8ab` and `git log ed70970ab7a3215b8fe48b0178973483ad54d26b..0a41bd058c99181fb05b8e49ecfa5a7b01e9e8ab`, and confirm that `git rev-parse HEAD` is `0a41bd058c99181fb05b8e49ecfa5a7b01e9e8ab` before you go on.
- The author's report (a set of claims to verify, not evidence): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-1-report.md`.
- Your directory for working copies: `.runs/review-1/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/review-1-report.md`; its FIRST line is `PASS <sha>` or `FAIL <sha>` (the head you reviewed) or `questions`. It holds the review's graded findings, the checks you ran with command and exit code, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing) and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` -- other agents' handoffs, reports and findings -- are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`): check crafted input at the boundary files this slice touches. Irreversible operation **no**. This slice's risk: trust boundary — `src/browser/view/judging-cache.ts`.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks of the slice's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); you may run those and other single files, the typecheck, ESLint and Prettier on the changed files, but nothing of the whole gate.
- Where the slice leaves a test failing that a later slice owns (its section says which), that is no finding of this slice; a failure the section does not name is.
- You judge the slice against the passages of the task the handoff gives, not the plan alone; the grades and the scope are yours.


Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (the plan's section, copied word for word)

### Slice 1 — The remembered judging holds the fingerprint of the content it judged

- **Goal:** *To do* 15, as spec Decision 5 settles it. `src/browser/sim/judging-record.ts` gains a pure
  function that gives the fingerprint of a program's content as a short text: the same for two contents that
  `contentDiffers` in `src/browser/sim/programs.ts` calls equal — the rule groups in their order with their
  rules and identities, and the trip plan, the order of an object's keys and the identity counters counting for
  nothing — and different for every change D-442 lists, with a chance of a collision of at most one in 2^52, no
  clock and no random number. `JudgingRecord` holds that fingerprint of the triple's program content in the state
  the judging read (`recordOfJudging`), and `markOfRecord` gives a mark only where the fingerprint of the
  program's content at hand equals it, besides the conditions of today. `src/browser/view/judging-cache.ts` keeps
  the fingerprint as one more field of the stored value under the stored form version 2, the key naming 2; a key
  of version 1 is neither read, written nor removed; a value whose fingerprint is missing, no text, too long or
  of another form than the function gives reads as none and throws nothing; the tidying at opening stays as it
  is. The comment of `isAboveLoaded` says what the function does, as spec Decision 5 unit 4 words it, and no
  behaviour of the function changes. The row of `src/browser/view/judging-cache.ts` in the table "Trust
  boundaries" of `guidelines/testing.md` names the cases of the stored value as the test file then holds them
  (the fields are five), and nothing else of that file changes. A test of the fingerprint takes its expectation
  from a relation the code does not compute — whether a save raises the content revision (D-442) — never from
  the function's own output. After this slice two test files fail until the slices that bring them to the
  record: `tests/view/maps-screen.test.mjs` (Slice 2) and `tests/sim/judging.test.mjs` (Slice 3); this slice
  leaves both as they are.
- **Change:** `src/browser/sim/judging-record.ts` · `src/browser/view/judging-cache.ts` ·
  `tests/sim/judging-record.test.mjs` · `tests/view/judging-cache.test.mjs` · `guidelines/testing.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/programs.ts:309-320` sameData · `src/browser/sim/programs.ts:374-386` contentDiffers ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:49-49` To do, item 15 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:296-357` Decision 5 — A remembered judging stands
  only beside the content it judged ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:376-379` Trust boundary — crafted input ·
  `foundations/decisions.md:11934-11975` D-441, as Foundation entries row 11 changes it ·
  `foundations/decisions.md:8378-8406` D-442, as row 12 changes it · `foundations/decisions.md:11903-11932` D-440 ·
  `foundations/invariants.md:1468-1476` judging-cache-reading · `foundations/invariants.md:214-224`
  simulation-isolation · `foundations/glossary.md:308-312` judging · `foundations/glossary.md:320-324` content
  revision · `foundations/part_map.md:3-32` browser-view · `foundations/part_map.md:34-65` simulation
- **Model:** same — a fingerprint that must tell every change D-442 lists and nothing else, in a trust-boundary file; a failure costs a reset
- **Risk:** trust boundary — `src/browser/view/judging-cache.ts`
- **Checks:** first the failing cases: the fingerprint equal and different as D-442 lists, a record whose
  fingerprint differs giving no mark, and a stored value of version 2 with a fingerprint missing or of another
  form reading as none (marked `judging-cache-reading`); then `npm test -- tests/sim/judging-record.test.mjs` ·
  `npm test -- tests/view/judging-cache.test.mjs` · `npm test -- tests/view/judging-cache-page.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_isolation.py`
- **Depends on:** Foundation entries rows 11, 12

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:49-49` To do, item 15

```text
15. Przy okazji (z prośby o scalenie loop2#167, „Findings outside the task's scope” 1 i „Minor findings” 1, dopisane przez doradcę dnia): licznik rewizji treści programu może się powtórzyć, gdy zmiana programu nie dotarła na serwer (odrzucony zapis przy „Wyloguj”, strona zamknięta w trakcie nieudanego zapisu), i wtedy zapamiętana ocena na dwunastu ziarnach stoi przy programie o innej treści do następnej oceny albo zmiany. Rewizja ma się nie powtarzać dla różnej treści — droga, którą projektant oceny odrzucił ze względu na koszt, to chwila zmiany jako rewizja (argument zegara w czterech funkcjach i ich testach); wybór drogi należy do cyklu. Razem z tym: komentarz `isAboveLoaded` w `src/browser/view/judging-cache.ts` (ok. linii 250) mówi nieprawdę o trójce, której program skasowano, a pokolenie postaci stoi wyżej niż we wczytanej grze — popraw albo usuń.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:296-357` Decision 5 — A remembered judging stands
  only beside the content it judged

```text
### Decision 5 — A remembered judging stands only beside the content it judged (*To do* 15)

**Chosen.** The content revision stays the count D-442 gives, unchanged in the game state, the save,
the load and the server. A judging the browser remembers holds, besides the content revision and the
generation number, a fingerprint of the content of the program it judged; it stands beside „Program:”
only while the program's content revision and the fingerprint of the content the program holds both
equal those it holds. Two different contents never share the pair: the count tells a content changed
and changed back (D-440), and the fingerprint tells a different content that reached the same count
after a change lost with a refused or unsent save (D-442's accepted case). The requirement of *To do*
15, that the revision a remembered judging is checked against does not repeat for different content, is
met by that pair; the count alone may still repeat, and nothing reads it alone to decide whether a
judging stands.

Units:

1. **The fingerprint of a content** (in `src/browser/sim/judging-record.ts`, beside the record it
   serves, or next to `contentDiffers` in `programs.ts` if the maker finds that cleaner within D-425).
   A pure function of a program's content to a short text: the same for two contents `contentDiffers`
   calls equal — the rule groups in their order with their rules and identities, and the trip plan,
   the order of an object's keys and the identity counters counting for nothing (D-442) — and different
   for any change D-442 lists, with a chance of a collision of at most one in 2^52. No clock, no random
   number (D-04, invariant `simulation-isolation`).
2. **The record and the mark** (`recordOfJudging`, `markOfRecord`, `JudgingRecord`). The record takes
   the fingerprint of the content of the triple's program in the state it read; the mark stands only
   where it equals the fingerprint of that program's content at hand, besides the conditions of today.
3. **The stored value** (`src/browser/view/judging-cache.ts`). The value holds the fingerprint as one
   more field; the stored form is version 2, the key naming it, so a value of version 1 is neither read,
   written nor removed (D-441 as it stands). A value whose fingerprint is no text of the function's form
   is a value of another form and reads as none (invariant `judging-cache-reading`). The tidying at
   opening is unchanged: it compares numbers, as D-441 gives.
4. **The comment of `isAboveLoaded`.** It is rewritten to say what the function does: it removes a triple
   whose program number or character number the loaded game has not yet given; where the loaded game
   holds the triple's character, one whose generation stands above that character's; and where it holds
   the triple's program, one whose content revision stands above that program's; each of the two last
   checks reads only what the loaded game holds, so a triple whose program the loaded game no longer
   holds is still removed by its character's generation, and only a triple neither of whose character
   and program the loaded game holds, both once given, is left by them. The sentence of today, that „a
   triple whose program or character the loaded game once gave and no longer holds is left alone”, is
   what is wrong, and it goes. No behaviour of the function changes.

Ways weighed:

- The moment of the change as the content revision, read from the clock (the way D-442 rejected). Cost
  now: every function that writes a program's content — `setProgram` (`game.ts`), `editProgram` and
  `saveCopyIntoProgram` (`programs.ts`), and the rule written at the first chill inside the passing of
  game minutes (`advanceMinutes` in `game.ts`), whose path from the store's reading of the clock runs
  through the functions that pass real time — takes a moment argument, with every test that calls
  them; the glossary's „content revision”, D-442 and D-401's „starts at 0” change meaning; the moments
  of two devices' clocks can stand in any order, so „never goes down” stops holding. Cost later: none.
  Rejected for the cost now, as D-442 rejected it, now that a way exists that costs three files.
- A fingerprint alone in place of the count (D-442's first rejected way). Rejected for D-442's reason: a
  change made back to the content judged would show the judging again, which D-440 erases.
- Judgings written to the lasting storage only after the server confirms the save of the state they
  read. Cost now: a link from the saver to the cache, a pending state of a judging, and a change of
  D-441; a judging made while a save fails is lost at a reload. Rejected.
- Leaving it as it is. Cost: D-442's accepted case stays — a judging can stand beside another content
  until the next judging of its triple or the next change of its program. Rejected: *To do* 15 asks for
  the fix.

Cost if wrong: where a collision of the fingerprint ever met two contents at one count, a judging would
stand beside a content it did not judge until the next judging or change, which is today's behaviour at
far lower odds.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:376-379` Trust boundary — crafted input

```text
- `src/browser/view/judging-cache.ts`: a stored value under version 1 is not read; a value of version 2
  whose fingerprint is missing, no text, too long or of another form reads as none and throws nothing; a
  value whose fingerprint differs from the content at hand gives no mark; nothing of a stored value
  enters the game state.
```

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:12041-12088` D-441
- `foundations/decisions.md:8439-8468` D-442
- `foundations/decisions.md:12010-12040` D-440
- `foundations/invariants.md:1468-1477` judging-cache-reading
- `foundations/invariants.md:214-225` simulation-isolation
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/glossary.md:308-312` judging
- `foundations/glossary.md:320-324` content
  revision
- `foundations/part_map.md:3-32` browser-view
- `foundations/part_map.md:34-65` simulation

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files the slice changes (read the diff and each changed file as far as the review needs)

- `src/browser/sim/judging-record.ts`
- `src/browser/view/judging-cache.ts`
- `tests/sim/judging-record.test.mjs`
- `tests/view/judging-cache.test.mjs`
- `guidelines/testing.md`

## Other files of code and tests to read (whole, or in the range named)

- `src/browser/sim/programs.ts`
- Ranges the plan names (find them again by the name beside them where the file changed): `src/browser/sim/programs.ts:309-320` sameData; `src/browser/sim/programs.ts:374-386` contentDiffers

## What you return

The first line of your report (`PASS <sha>`, `FAIL <sha>` or `questions`), the report path; no check result beyond the checks you ran, named in the report.
