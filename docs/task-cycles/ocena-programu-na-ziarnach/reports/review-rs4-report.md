FAIL bae893e2

# Review rs4 — slice 4 of `ocena-programu-na-ziarnach`, range `93dd78b3..bae893e2`

Head checked: `git rev-parse HEAD` and `git rev-parse bae893e2` both give
`bae893e2b5eddcd9faea96cbf3a42c230feb7d18`; `.the-way` at the pinned
`19e5774aed6d1d628042e23deccc110ed9f112c0`. One commit in the range. Files: `src/browser/sim/game.ts`,
`src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts`, `tests/sim/saved-game-judgings.test.mjs`,
`stryker.config.json` (the last beyond the slice's *Change*, required by
`tests/quality/test_mutation_test_selection.py`, as the orchestrator notes).

## Findings

### Important

**I-1. The new test file adds eight errors to the foundation check, so the one command `npm test` fails at this head.**

- Place: `tests/sim/saved-game-judgings.test.mjs:115`, `:136`, `:228`, `:261`, `:308`, `:351`, `:472`, `:500`
  (the `// decision: D-… "…"` markers).
- What is wrong: `python -B .the-way/elements/common/foundation_check.py` reads the quotation of each
  `decision:` marker against the decision it names. Six markers quote words from the middle of a sentence
  ("the quotation does not begin a sentence of"), and two quote a sentence that is not binding
  ("the quotation stands in no binding sentence of"). Head output, lines for this file:
  ```
  tests/sim/saved-game-judgings.test.mjs:115: the quotation does not begin a sentence of `D-440`
  tests/sim/saved-game-judgings.test.mjs:136: the quotation does not begin a sentence of `D-213`
  tests/sim/saved-game-judgings.test.mjs:228: the quotation does not begin a sentence of `D-165`
  tests/sim/saved-game-judgings.test.mjs:261: the quotation does not begin a sentence of `D-440`
  tests/sim/saved-game-judgings.test.mjs:308: the quotation does not begin a sentence of `D-440`
  tests/sim/saved-game-judgings.test.mjs:351: the quotation stands in no binding sentence of `D-213`
  tests/sim/saved-game-judgings.test.mjs:472: the quotation does not begin a sentence of `D-213`
  tests/sim/saved-game-judgings.test.mjs:500: the quotation stands in no binding sentence of `D-213`
  ```
  For example, `:115` quotes "the twelve results of its seeds — solved, a death or undecided — and the
  equipment it took from what the chest held", which is the middle of the first sentence of D-440, and
  `:351`/`:500` quote "a crafted document of the current version refused whole", which comes from the
  *Verification* line of D-213, not its binding text.
- Why it matters: `AGENTS.md` makes the foundation check part of the one command run before a merge, so this
  file makes the gate fail by itself. The base `93dd78b3` has 13 foundation-check errors and the head has
  21. The 8 new errors are exactly the lines above (diff of the two outputs, kept beside this report).
  The executor's report lists no run of the foundation check, so the slice's own checks could not catch it.
- Evidence: `review-rs4-foundation-check-head.txt` and `review-rs4-foundation-check-base.txt` in this
  directory. The fix is to quote each decision from the start of a binding sentence (for example D-440
  "The saved game state holds the last judging of each character, program and map: …", D-213 "Saved-game
  code turns a game state into …"), or to drop the marker where no binding sentence fits.
- Contradiction: no
- Slice: 4

### Minor

**M-1. The case "a judging with a `__proto__` key" is refused for a reason other than its key.**
`tests/sim/saved-game-judgings.test.mjs:366-370` builds `{"results":[],"equipment":[],"__proto__":{}}`.
With `results` empty, the length check at `src/browser/sim/saved-game.ts:1261` refuses the document whatever
`fields` does with `__proto__`. So the case would still pass if the reading of a judging admitted a foreign
`__proto__` key. The behaviour itself is correct: my probe with twelve results and an own `__proto__` key
inside a judging gets `shape` (`review-rs4-probe-out.txt`, "__proto__ key inside a judging with twelve
results"). `fields` is shared and guarded elsewhere, so this costs coverage only. Fix: use twelve results in
that case.

**M-2. The header comment of the test file describes the plan's order of work, and it will go stale.**
`tests/sim/saved-game-judgings.test.mjs:9-11` says "The version of the shape is raised in a later slice
together with the document of `tests/sim/saved-game.test.mjs` …". Once slice 6 lands, that sentence describes
a past step of a cycle. `guidelines/testing.md` ("Where the expected value comes from") says not to write a
comment that carries no information the code needs. The building of documents from a save works the same
without the sentence. Fix: drop it, or say only that the documents are built from a save so that they follow
the current version.

## What I checked and found sound

- **Stored shape against D-440.** `RememberedJudging` (`src/browser/sim/types.ts:383-391`) holds the kind of
  each of the twelve results and nothing more, so a cause or a minute cannot be stored. The load refuses a
  result object, the death object with cause and minute included (test at `:285-288`). The equipment is
  `TripEntry[]`, the same type as `Judging.equipment`. In `src/browser/sim/judging.ts` that value is
  `sendTake(...)`, the take list cut by the chest, the carrying capacity and the map's entry cap. That is
  "the equipment it took from what the chest held". `clipTrip` (`src/browser/sim/trip.ts:19-34`) keeps only
  entries with `taken > 0`, each item once, so every equipment list a judging makes passes `tripList`
  (D-386). The nesting is character → program → map, so no judging can stand without a character (D-440
  "violates: a judging remembered for a program and a map with no character").
- **The load against `guidelines/coding-saved-game.md` and D-213, D-56, D-165.** Each level goes through
  `entries` (plain object only, own string keys, data properties only). The character key goes through
  `characterKey` (canonical form, team member), the program key through `identityKey` and then
  `listedProgram` (a deleted program is refused), and the map key through `oneOf(…, MAPS)`. A judging goes
  through `fields(["results","equipment"])`. The results go through `list` (no hole, no extra key, the
  Array prototype) and `oneOf(SEED_KINDS)`, and their count is checked against `BALANCE.judgingSeeds.length`.
  The equipment goes through `tripList`. Missing keys are not filled in, no part of a state is returned
  on a refusal, and the result is built from new values. The cap and the map data are not compared, as the
  plan and To do 6 require.
- **Hostile input at the trust boundary** (`src/browser/sim/saved-game.ts`). I wrote 40 probes of my own,
  each a document of the current version built from a real save and changed at one place, and ran them
  against the head build. The script and its output are kept as `review-rs4-probe.mjs` and
  `review-rs4-probe-out.txt`. Results:
  - Refused as `shape`, with no throw:
    - `__proto__` and `constructor` keys at the character, program and map levels, and inside a twelve-result judging;
    - character and program keys `1e0`, `1.0`, `+1` and `9007199254740993`, and the next character or program number;
    - counts `1e300`, `-0`, `2^53` and `1e999` (which parses to Infinity);
    - results holding `"__proto__"`, `"hasOwnProperty"` or `"solved "`, a 12-character text in place of the list, or `null`;
    - equipment item `__proto__`;
    - a list in place of the program level or the map level;
    - the key missing (an old version-8 document);
    - a judging of a deleted program;
    - a getter in place of a judging.
  - Loaded:
    - the game's own save;
    - duplicate keys in the text where the last one is valid (`JSON.parse` keeps the last);
    - count `4.0` and count `2^53-1`;
    - the keys of a judging or of an equipment entry in another order;
    - empty equipment;
    - levels with a null prototype.
  - A `Proxy` whose `ownKeys` throws makes the load throw. That is no value a JSON document can hold, and
    the same helpers behave the same way for every other record, so it is not a finding.
  - The document passed in stayed unchanged. The executor's suite covers the rest of the list in the
    handoff (wrong types, non-integers, lengths other than twelve, foreign or missing keys, a sweep of 16
    hostile values at every place, and a sweep of every leaf).
- **D-386.** At this head no function of the game writes to `judgings` (`grep` shows only `newGame`, the
  type and the load), so the game cannot make a state its load refuses. Choice 3 of the executor (a judging on
  a map not open, and equipment beyond the chest, are admitted) is allowed: refusing them would discard a save
  after a change of the data, against D-386. Choice 1 (a program must be on the list) is stricter than "given".
  The guidelines allow that ("Wolno odmówić więcej"), and it leaves slice 5 the duty, already named in the
  executor's concerns, of erasing a program's judgings on deletion.
- **Tests.** The expected values are written out by hand. The round trip compares the whole state, which is
  justified because the requirement is a whole load (D-213). Each refusal case asserts `{ok:false,
  reason:"shape"}` and no throw. Mutation run (see Checks): 14 killed and 4 survived, and all 4 survivors
  are equivalent. Three are `true`→`false` in `SEED_KINDS` (`:1247-1249`), whose values are never read
  because `oneOf` uses `Object.hasOwn`. One is `[]`→`["Stryker was here"]` as the `taken` argument of
  `characterKey` (`:1276`), where a number is never equal to that text.
- **Size (D-425).** `node tests/quality/eslint-size-rules.mjs` reports "0 functions and files over a threshold
  in 329 files", so `src/browser/sim/game.ts` is under 800 lines of code. `saved-game.ts` is the excepted
  file.
- **Executor's own-work check.** It names the weakest point (a check of the new reader dropped or loosened)
  and its hand mutations would catch that. It did not include the gate's foundation check, which is where
  the change actually breaks (I-1).
- **Walk through the running product.** None was reported, and none was needed: at this head nothing writes
  or shows a judging, so nothing a user sees changes. The one effect a user could meet, a version-8 save
  without `judgings` being refused, is the sequencing set aside below.

## Declined to judge

- `tests/sim/saved-game.test.mjs` is red at this head: 20 of 44 fail, because its document lacks `judgings`
  and is refused as `shape`. The version stays 8. Plan choice 6 hands both to slice 6, and the handoff says
  not to grade this. A note for the orchestrator: until slice 6 lands in the same merge, a deployed head would
  refuse every existing version-8 save as damaged (`shape`, not `version`). That starts the player anew, and
  the server would not move the old save to the previous slot (D-206, D-399 move it only for a higher
  version). Slice 6 must land before any merge.
- The size of the remembered judgings in the 64 KiB save (To do 6, last sentence). The plan's slice 4 section
  does not assign it. For the later check: one judging with empty equipment takes 147 bytes of the saved
  text, and about 237 bytes with two items. With 3 maps in the data, 64 KiB holds roughly 440 judgings,
  for example 10 characters × 15 programs × 3 maps, before anything else in the save.
- Erasure on program change, on deletion and on a death with no use left, the badge, and its lines in
  „Kto idzie”: other slices.
- Foundation-check errors that existed before this range (13 at the base): `tests/sim/judging.test.mjs:154`,
  `:199`, `:233`, `:244`, `:258`, `:315` (D-439, D-22, D-179 quotations, from slice 3), and the D-243
  quotations in `tests/view/account-screen.test.mjs` and `tests/view/maps-screen.test.mjs`. They are outside
  this range, but they too stop the one command; the orchestrator should know they are there.

## Checks run

All checks ran in a detached worktree of `bae893e2` at `.runs/review-rs4/wt`, after `npm ci` (exit 0).

| Command | Exit |
|---|---|
| `npm test -- tests/sim/saved-game-judgings.test.mjs` (11 pass) | 0 |
| `npm test -- tests/sim/judging.test.mjs` | 0 |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/invariants/test_character_team.py` | 0 |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 0 |
| `npm test -- tests/sim/{team,death,loop,catch-up,program-list,discovery}.test.mjs` (each) | 0 each |
| `npm test -- tests/account-api.test.mjs` | 0 |
| `npm test -- tests/view/{account-screen,game-saver,previous-save,end-window-game,end-question,login-card-focus,owner-panel,scene-picture,trip,uncaught-failure,maps-screen}.test.mjs` (each, the view tests that use the load) | 0 each |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `node tests/quality/eslint-size-rules.mjs` ("0 functions and files over a threshold in 329 files") | 0 |
| `npx eslint` on the four changed source and test files | 0 |
| `npx prettier --check` on those files and `stryker.config.json` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` (20 fail, expected until slice 6; not graded) | 1 |
| `python -B .the-way/elements/common/foundation_check.py` at head: 21 errors | 1 |
| the same at base `93dd78b3`: 13 errors | 1 |
| `node .runs/review-rs4/probe.mjs <wt>`: 40 probes, as listed above; all as expected except the in-memory Proxy | 0 |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.review.json --mutate "src/browser/sim/saved-game.ts:1246-1288,…:1311-1311,…:1411-1411"`, with a review-only copy of the configuration whose `tap.testFiles` holds only `tests/sim/saved-game-judgings.test.mjs` (14 killed, 4 survived, all equivalent) | 0 |

- I ran Stryker with the review-only configuration because, with the repository configuration, its first
  run of the tests would include `tests/sim/saved-game.test.mjs`, which is red at this head by plan.
- Not run: `npm test` without a file argument and the whole `tests/` (by the handoff), and
  `python -B .the-way/instruction-files/check_instructions.py` (no instruction file is in the range).

## Reaches beyond the dispatch

- `src/browser/sim/judging.ts` and `src/browser/sim/trip.ts:19-52` (`clipTrip`, `sendTake`): to confirm that
  the equipment a judging makes is admitted by `tripList` (D-386).
- `src/browser/sim/saved-game.ts:95-302`, `:440-530` and `:1110-1484`: the helpers the new reader calls, and
  `game()`.
- `foundations/decisions.md` D-439 and D-440 (`:11814-11863`), as the orchestrator's notes direct, and D-399,
  named in a Declined line, by a search for its heading only.
- The export list of `src/browser/sim/game.ts` and `src/browser/sim/programs.ts`: to confirm that no function
  removes a character from the team and none writes `judgings`.
- `tests/quality/eslint-size-rules.mjs`, the header only, to run the size pass.
- `stryker.config.json`: to build the review-only copy.

## Working copies

- `.runs/review-rs4/` held the detached
  worktree `wt` of `bae893e2` (with `node_modules`, the build, `.stryker-tmp` and `stryker.review.json`), the
  probe script, test logs and the Stryker report. The worktree was removed with `git worktree remove --force`,
  then `git worktree prune`, and the directory was deleted; nothing remains. `git status --short` in the
  cycle's worktree is clean afterwards.
- Kept beside this report: `review-rs4-probe.mjs`, `review-rs4-probe-out.txt`,
  `review-rs4-foundation-check-head.txt`, `review-rs4-foundation-check-base.txt`.

## Unread material

- `guidelines/testing.md`: read whole, in two pages. `guidelines/coding.md`,
  `guidelines/coding-saved-game.md`, `guidelines/coding-simulation-module.md`: read whole.
- D-206, D-386, D-213, D-165, D-425: read whole. D-56: read from `:6093` to the start of its rationale
  (`:6093-6110`); the rationale's remainder was not read. The invariants save-version and simulation-inputs
  and the part map's `simulation` entry: read whole as the handoff addresses them.
- `tests/sim/saved-game.test.mjs:1-120`, named in the plan's *Read*: not read. I judged the conventions from
  the new file and the guidelines, and the file is not changed in this range.
- `task-frozen.md`: not opened; I used the passages as the handoff quotes them.

## Searches not found or unclear

- none.
