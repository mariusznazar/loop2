PASS 328562acde41050216e5c67414478ccd2e24c84e

# Review of the whole change — task `przejscia-miedzy-ekranami`

Range `ef53bb134f393df39cccb4368f8e8d30dc81f1ac..328562ac` (three commits: `3fc8428e` foundation
entries, `f1544c49` code and tests, `328562ac` styleguide and the coding example), one-author route
(no plan, no spec, no slices). `git rev-parse HEAD` in the reviewed worktree gave
`328562acde41050216e5c67414478ccd2e24c84e`, the head given; `.the-way` stands at the pinned
`6ed3cb36`, as the gitlink records. The reviewed worktree was clean before and after the review.

Counts: 0 Critical, 0 Important, 5 Minor (all within the task), 0 out of scope.

## Findings

### Critical

none

### Important

none

### Minor (each within the task)

1. **`foundations/decisions.md:7475` (D-196, binding sentence) — reads two ways once a rank can be
   bought while a map run waits.** The sentence says that during a map run, one that waits or has
   ended included, the editors use "the repertoire of the map run's character, including its bought
   branches". Before this change the character in the map run and the character in the team held the
   same bought branches for the whole of a map run, since no purchase was possible while it stood.
   The change makes them differ (a rank bought in the wait goes to the team's character alone,
   `src/browser/sim/skills.ts:238-283`), so "its bought branches" can now be read as the branches the
   character holds in the team. The code reads it as the map run's own skills of its start
   (`programOf(..., run.character.skills)` in `src/browser/sim/game.ts`), and the *Rationale* the
   change rewrote for D-196 says so ("keeps the skills of its start, without a rank bought in that
   wait"), so code and rationale agree; only the binding sentence is open to a wrong reading by the
   next agent that touches the editors. The author named the ambiguity and left it. Suggested: a
   wording such as "the repertoire of the map run's character with the branches it held at the start
   of the map run". Minor, because the content agrees with the code and the rationale disambiguates
   it; the change writes D-196 (its rationale), so the fix belongs to this task.

2. **`guidelines/styleguide-browser-view.md:1272-1276` (rule "The screen Postać") — repeats the
   sentence of D-287 word for word.** The rule now carries the whole UI sentence „Przejście na mapie
   {mapa} jest niezakończone. Kupiony stopień działa od następnego przejścia tej postaci, także
   w pętli; „Restart” zaczyna bez niego.”, which D-287 already holds. `product-guidelines/template.md`
   of the pinned the-way, "A rule lists no state and repeats no decision or value", calls such a
   sentence a second copy that drifts from the first. The rule before the change named the sentence
   by D-287 without quoting it. The same file already quotes the sentence under „Wyposażenie” the same
   way (line 1218), so the change follows a local precedent; the consequence is one more place to
   update when D-287's words change. Suggested: describe the sentence ("zdanie D-287 o tym, od kiedy
   kupiony stopień działa") without its words.

3. **`src/browser/run-screen.css:256` — the block `@media (width < 1280px) and (hover: none)` for
   `.run-header-back` has no comment of its own naming D-396.** The styleguide rule "Two layouts and
   one threshold between them" (`guidelines/styleguide-browser-view.md:594-595`) says each block of
   the phone layout has a comment that names D-396. The comment above the preceding
   `@media (width < 1280px)` block (lines 240-245) names D-396 and mentions the device that does not
   hover, so a reader finds the reason two blocks up; every other such block in the stylesheets
   (`src/browser/character-screen.css:65`, `src/browser/run-screen.css:672`, `src/browser/styles.css:789`,
   `src/browser/maps-screen.css:615` and others) carries its own comment. No effect for the player.

4. **`src/browser/sim/skills.ts:223-231` (`purchaseOpen`) — a second copy of the test of a map run's
   end.** `purchaseOpen` writes out `run.death !== null || run.completion !== null`, the test
   `mapRunEnded` holds, because `run.ts` imports `skills.ts`; the comment says so and the author's
   report names the cost. A later kind of end added to `mapRunEnded` alone would leave purchases
   refused in it, and no test would show it, since the tests enumerate today's two ends. Suggested:
   either a comment in `mapRunEnded` pointing back to `purchaseOpen`, or the end test moved to a module
   both import. Structure finding below the size threshold (both runs of the size rule report 0), so
   Minor.

5. **`tests/sim/skills.test.mjs:248-252` — `assert.equal(bought.run, waiting.run, …)` asserts the
   very object of the map run, not that the map run stayed as it was.** The requirement (D-200
   *Verification*: "the map run staying as it was") is met by any purchase that leaves the map run's
   content unchanged; an implementation that rebuilt `state.run` with equal content (for example a
   spread of the state that copies the run) would fail this assertion while meeting the requirement.
   `guidelines/testing.md`, rule "Behaviour, not implementation", asks the reviewer to flag an
   assertion that a correct change of implementation could break. The refusal assertions of the same
   file use identity on purpose (a refused purchase returns the state given), which is a different
   claim. Suggested: `assert.deepEqual` of the run, or of `run.character.skills`, against the waiting
   run.

### Out of scope

none

## Blocking findings and the slices

No blocking finding; there are no slices (one-author change).

## Against the task

- To do 1 — met. `src/browser/view/run-header.tsx` puts `<a class="run-header-back"
  href="#/postac/{n}">← {name}</a>` inside the existing `h2.run-header-name`, at the start of the
  header, in both layouts; the phone layout holds `--touch-target-min` both ways
  (`src/browser/run-screen.css`, block `@media (width < 1280px)`). Leaving by the link pauses the map
  run (integration test in `tests/view/account-screen.test.mjs`, "„← {name}” in the header of a map
  run that goes on …", which resumes the run, follows the link and checks the save of the paused
  state). D-311's header sentence and D-280's paragraph were changed as *Decisions in play* gives.
- To do 2 — met. `buyBranch` refuses only while `purchaseOpen` is false (a manual map run neither
  paused nor ended); the rank goes into the team's character, never into `state.run`, so the waiting
  run keeps its start skills and `restart` (which reads `state.run.character.skills`, or the team's
  skills after a death that took everything) starts without it, and the next send after „Zakończ”
  takes it (sim test "a rank bought while the map run waits …"). „Kup” is disabled by
  `!purchaseOpen || unaffordable` (`src/browser/view/character-trees.tsx`), and the sentence at
  „Umiejętności” stands only where `character-screen.tsx` passes the run, which it does only for the
  run's own character. The sentence's words equal those D-287 now holds. I checked the paths that
  could carry a rank bought in the wait into the waiting or restarted run: `teamAtRunStop` and
  `teamAtRunEnd` move gear alone; the completion payment `paidPractice(character.skills, run.practice)`
  reads the team's character and keeps its ranks; `teamAfterDeath` resets the team's character only
  where the resurrection has no use left, which D-190 gives; the load (`saved-game.ts`) compares no
  skills of the run with the team's, so the new reachable state (team skills ahead of the run's) loads
  back (D-386).
- To do 3 — met. `<a class="character-screen-back" href="#/">← Siedziba</a>` is the first child of
  `.character-screen`, above both areas, in both layouts, with the touch target in the phone layout
  (`src/browser/character-screen.css`). No other arrow was added.
- To do 4 — met. The six screenshots stand in `mariusznazar/screenshots`, branch
  `loop2/przejscia-miedzy-ekranami`, commit `6ec4ec244b159b3598fe249e1fa64e338783a120` (the branch's
  head), directory `loop2/przejscia-miedzy-ekranami/`, named after the cycle's record directory, as
  D-418 gives; the author's report gives the embedding links with `?raw=true`. No image file is in
  the commits of the range. The old-Loop pair is the 31 October pictures; the loop2 pictures are
  1600 × 1000 and 360 × 740.
- To do 5 — the departures named (the link keeps the heading size and `text-strong` of the name,
  „← Siedziba” in `text-label`, arrow and name one link) are look and words only; whether each link
  exists and where it stands follows the answers to questions 2 and 3, and the rule of question 1 is
  kept. I found no departure the author did not name.
- To do 6 — met. The rule "The screen Postać" gives „Kup” off only while a manual map run goes on,
  the sentence at the run's character alone, and „← Siedziba” with its role, look under the pointer,
  focus and touch target; the rule "Main button, secondary action and tab" gives the look of
  „← {imię postaci}”. Both name D-280 in *Decision* where they now rest on it.
- *Settlements to record* rows 1-4 — each written into the entry its *Goes to* names: row 1 into
  D-200's binding sentence (with D-287's sentence on „Kup”), row 2 into D-287's sentence at
  „Umiejętności”, rows 3 and 4 into a new paragraph of D-280, row 3 also into D-311's header sentence.
  The texts say what the rows say; D-200 adds, from the code as it stood (`restart`), what „Restart”
  starts with after a death that took everything, which the row's "jak dziś" covers. *Verification*
  of D-200, D-287, D-280 and D-311 follows each change, and a test holds each new case.
- Fidelity to sources — the *Rejected* entries added to D-200, D-287 and D-280 carry the ways not
  chosen of questions 1-3 and of row 2 with the costs their sources gave; nothing invented. D-447 and
  D-446 stay unchanged, as *Decisions in play* gives.
- Trust boundary: `src/browser/view/screen-address.ts` and `src/browser/sim/saved-game.ts` are not
  in the diff (`git diff --stat` lists 17 files, neither of them); the change only imports
  `screenAddress`. No hostile input reaches the change: the hrefs are built from a character's
  number of the game state. No operation that cannot be undone.
- Reserved choices: none taken.
- Code that passes a test without meeting its requirement: none found (no branch or value made for a
  test's input, no expected value in product code).

## Against the foundation and the guidelines

- D-200, D-287, D-280, D-311 and D-196 (rationale) as written by the change agree with the code
  (D-196's binding sentence: Minor 1). D-283, D-284, D-212, D-53, D-277, D-281, D-396, D-446, D-447
  hold unchanged.
- Invariants of the touched parts the change reaches — `simulation-isolation`, `simulation-inputs`
  (`purchaseOpen` and `buyBranch` read and copy), `content-identifiers` (no map or item named in the
  view), `browser-view-token-values` (only tokens and keywords in the new CSS),
  `browser-view-focus-outline` (no `outline`), `cross-part-imports` (browser-view imports simulation,
  which its *Depends on* names), `page-address-fragment` (screen-address unchanged): none broken. No
  invariant test was changed.
- Coding guidelines: `guidelines/coding-browser-module.md` example "Ekran w Reactcie: Postać" now
  names `purchaseOpen`, true to the code. Hooks and Effects untouched. Linter and formatter: the
  author's report gives `npx eslint` and `npx prettier --check` on the changed files at exit 0; I did
  not repeat them.
- Styleguide: the new links are links, not buttons (D-275, D-281); every background has its text
  (`highlight` under the pointer on an element that keeps `text-strong` or `text-label`); the phone
  blocks stand after the computer rules in each screen's own stylesheet (D-421), the touch target
  read from `--touch-target-min`, the text in the middle of the target; `(hover: none)` blocks drop
  the highlight on touch devices; a name typed by the player still breaks (the link inherits
  `overflow-wrap: anywhere` from `.run-header-name`). Minor 2 and 3 are the departures found.
- Guidelines changed vs the templates: `guidelines/styleguide-browser-view.md` and
  `guidelines/coding-browser-module.md` keep the required form of `product-guidelines/template.md`
  and `product-guidelines/styleguide/template.md` (rule fields in order, *Decision* naming existing
  decisions); the one departure is Minor 2.

## Structure of the code the change leaves

- `python -B .the-way/task-cycle/change_file_sizes.py ef53bb13 328562ac` (reviewed worktree) → exit 0:
  17 files changed, +369 lines in all; the code files grew by small amounts (`skills.ts` 263 → 283,
  `character-screen.tsx` 233 → 243, `character-trees.tsx` 137 → 148, `run-header.tsx` 141 → 155,
  `run-screen.css` 1843 → 1882, `character-screen.css` 388 → 422).
- The size invariant (`function-and-file-size`, rule `### Size of a function and a file` of
  `guidelines/coding.md`, not marked violated, so no expected-failure mark to take off):
  `npm test -- tests/quality/test_function_and_file_size.py` in a worktree of the base → exit 0
  (2 tests OK), in a worktree of the head → exit 0 (2 tests OK); `node tests/quality/eslint-size-rules.mjs`
  in each → exit 0, "0 functions and files over a threshold in 387 files". The change pushed nothing
  over a threshold.
- No code is left without a user: the `run` prop of `Branches` was replaced by `purchaseOpen`, and
  `CharacterTrees` still uses `run` for the sentence. No name stopped being true (the doc comments of
  `CharacterTrees`, `Branches`, `buyBranch` and `RunHeader` were updated with the change). Minor 4 is
  the one structural note.

## The tests

- Each new or changed test fails for the behaviour it names: with the old refusal (`if (state.run)`)
  the sim tests "a purchase is taken while …" and "a rank bought while the map run waits …" fail, as
  the author's report shows; with the old `disabled={run !== null …}` the view test "„Kup” is active
  beside a map run that waits …" fails; with `state.run` passed to every character the "no sentence at
  another character" assertion fails; the run-header test pins the link's text, href to the run's
  character (Basia, `#/postac/2`) and place at the start of the header in going on, paused and dead
  states; the "← Siedziba" test pins it as the first child above the areas, with `#/`.
- Test quotations of decisions were updated with the decisions only (lines `decision:`), and the
  tests changed because the task changes the behaviour they held have the reason in the task
  (`guidelines/testing.md`, "Changing an existing test").
- StrykerJS on the changed lines of `src/browser/sim/skills.ts` (the reviewer's tool,
  `guidelines/testing.md` "Mutation testing"): 19 mutants, 18 killed, 1 survived. The survivor:
  `skills.ts:243:53`, the refusal returning `events: ["Stryker was here"]` in place of `[]`.
  Classification: behaviour not worth pinning — `buyBranch` returns no events on any path, a refusal
  as a purchase, and no caller reads events of a purchase; an assertion on the empty list would pin an
  implementation detail. No real gap. The summary lines are kept at
  `.runs/task-cycles/przejscia-miedzy-ekranami/reports/review-whole-stryker.txt`.
- The author's own-work check names the weakest requirement (a rank bought in the wait reaching
  neither the waiting run nor „Restart”, but the next send, through the save and the real store path)
  and its checks would catch it unmet: the sim test, the integration test through `actWithoutCatchUp`
  and the save, and the walk. Its mutations in head match the tests.

## The author's walk and the screenshots

The author judges that the change alters what the player sees, which agrees with the diff. The cases
follow To do 1-3 (header link, pause on leaving, „← Siedziba”, „Kup” and the sentence at the run's
character and at another, „Restart” without the rank, the next send with it, phone layout with touch
and the measurement); each unchecked case gives a reason (hover and focus look in a real browser,
Firefox and Edge by D-396 in a session of their own, a real Android phone, the ended run on Postać in
the browser held by tests, the header under the end-of-run window hidden by D-370).

I looked at the six pictures (downloaded at commit `6ec4ec244b159b3598fe249e1fa64e338783a120` into a
working copy, removed): `loop2_przejscie_1600.png` shows „← Nowa postać” at the start of the header in
the place of the name, bold in the name's look, beside the old `loop_06_przejscie_ekran.png` with its
smaller grey „← Nowa postać”; `loop2_postac_1600.png` shows „← Siedziba” above both areas, the bar
marking Siedziba, the map run paused at minute 2, the new sentence at „Umiejętności” and „Kup: Wprawne
oko” active, beside the old `loop_13_postac.png` with „← Siedziba” at its top; the two 360 px pictures
show the header link and „← Siedziba” in the phone layout with no scroll to the side. Nothing in them
contradicts the task or the styleguide; whether loop2 is at least as good as the old Loop is the
human's judgment at the request (the task's acceptance criterion). I took no screenshot of my own.

## Declined to judge

- The program editor of Programy during a waiting map run not offering a branch action bought in the
  wait — that is D-196 as it stood before the change, which the task leaves unchanged (only its wording
  is Minor 1).
- A purchase with a manual map run paused does not catch up the earning loops of other characters
  first (`actWithoutCatchUp`) — as before the change, for every purchase; not part of this task.
- Firefox, Edge and a real Android phone — D-396 gives them to a session of their own; not run by the
  author or by me.

## Checks run

- `git rev-parse HEAD` (reviewed worktree) → `328562acde41050216e5c67414478ccd2e24c84e`, the head given.
- `git diff ef53bb13..328562ac` and `git log ef53bb13..328562ac` → read (3 commits, 17 files).
- `python -B .the-way/task-cycle/change_file_sizes.py ef53bb13 328562ac` (reviewed worktree) → exit 0.
- `python -B .the-way/instruction-files/check_instructions.py` (reviewed worktree, head) → exit 0,
  "0 error, 0 warn, 122 info": no warning, so no finding from it.
- `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, head) → exit 0,
  "0 errors".
- `node tests/quality/eslint-size-rules.mjs` (worktree of base, worktree of head) → exit 0 each,
  0 over a threshold.
- `npm test -- tests/quality/test_function_and_file_size.py` (worktree of base, worktree of head) →
  exit 0 each, 2 tests OK.
- `npm test -- <file>` in the worktree of the head, each → exit 0: `tests/sim/skills.test.mjs` (21
  pass), `tests/view/character-screen.test.mjs` (18), `tests/view/run-header.test.mjs` (24),
  `tests/view/account-screen.test.mjs` (133), `tests/view/maps-screen.test.mjs` (52),
  `tests/sim/death.test.mjs` (33).
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/skills.ts:223-243"`
  (worktree of the head) → exit 0, 18 killed, 1 survived (classified above), 1 min 52 s.
- `gh api … repos/mariusznazar/screenshots/contents/loop2/przejscia-miedzy-ekranami/<file>?ref=6ec4ec24…`
  for the six files → exit 0 each; `gh api …/commits/6ec4ec24…` lists exactly the six files;
  `gh api …/branches/loop2/przejscia-miedzy-ekranami` → head `6ec4ec244b159b3598fe249e1fa64e338783a120`.
  Manual check: the pictures read as described above.
- Not run: the full `npm test` (the cycle's or CI's gate, as the handoff gives); the game in a browser
  (the author's walk and the pictures were enough for the states the task names); `npx eslint` and
  `npx prettier --check` (the author's report gives them at exit 0; the full gate runs them).

## Reaches beyond my selection

- `foundations/invariants.md`: `simulation-inputs`, `content-identifiers`, `browser-view-token-values`,
  `browser-view-focus-outline`, `character-team`, `cross-part-imports`, `page-address-fragment`, read
  whole — the invariants of the touched parts the diff reaches.
- `foundations/glossary.md`: map run, map run restart, repertoire, manual map run, practice, phone
  layout, computer layout — the terms the changed entries use.
- `src/browser/sim/game.ts` (`startRun`, `restart`, `end`, `setPaused`, `teamAfterDeath`, the completion
  in `advanceMinutes`) and `src/browser/sim/saved-game.ts` (skills checks of the load) — to check that
  no path carries a rank bought in the wait into the waiting or restarted run and that the new state
  loads.
- `.the-way/task-cycle/remarks_check.py` docstring — the form of the section this report's last
  section feeds.

## Working copies

- `.runs/review-whole/head` — a detached worktree
  of `328562ac` (with a junction `node_modules` to the reviewed worktree's `node_modules`) for the
  size test, the focused tests and StrykerJS: the junction removed with `rmdir`, then the worktree
  removed with `git worktree remove --force`.
- `.runs/review-whole/base` — a detached worktree
  of `ef53bb13` (same junction) for the size test: removed the same way.
- `.runs/review-whole/` — the decision index,
  the list of sections, the outputs of the checks and the six downloaded screenshots (`shots\`):
  removed whole with `rm -rf` of that path. `git worktree prune` run; `git worktree list` no longer
  shows either worktree; the reviewed worktree's `node_modules` is intact.
- Kept: `.runs/task-cycles/przejscia-miedzy-ekranami/reports/review-whole-stryker.txt`
  (StrykerJS summary). No process left running.

## Unread material

8 decisions of the index of my selection read whole: D-200, D-287, D-280, D-311, D-196, D-221, D-250,
D-386. The index (`decision_index.py`, sections "Browser view: screens, navigation and their code",
"Character skills and nature energy", "Screen of a map run and the end-of-run window", parts
`browser-view`, `simulation`, `product-foundation`, and the decisions of *Decisions in play* and of
the `decision:` lines of the altered tests) listed 82 decisions in full, whose binding sentences I
read, and 299 by heading, whose questions I ran through; of those I opened D-221, D-250 and D-386.
Decisions that bear on the change and stayed unread whole: D-283, D-284, D-212, D-53, D-447, D-446,
D-396 (binding sentences read in the index and in the task, which quotes D-447's *Rejected*). Guideline
files not read whole: none — `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-simulation-module.md`, `guidelines/styleguide-browser-view.md` and
`guidelines/testing.md` read whole, as were `.the-way/product-guidelines/template.md` and
`.the-way/product-guidelines/styleguide/template.md`.

## Searches not found or unclear

- D-196's binding sentence, "the repertoire of the map run's character, including its bought branches", is unclear after this change: it can be read as the branches bought by the character in the team, while the code and D-196's rationale take the map run's skills of its start (Minor 1).
- D-200's clause that „Restart” after a death that took everything starts "with what the character was left with, so not with a rank bought in that wait" holds only because such a character has no points to buy with; the decision does not say so, and `restart` reads the team's skills in that case.
