PASS 3e3c38a826e492a28f23d322022cb4d3e63ee426

# Review of Slice 7 (task `katalog-map`), range `6b3d86a8..3e3c38a8`

Head confirmed: `git rev-parse HEAD` = `3e3c38a826e492a28f23d322022cb4d3e63ee426`; worktree clean before and after.
One commit in the range (`3e3c38a8`), two files: `src/browser/view/judging-cache.ts` (+186 -10) and the new
`tests/view/judging-cache-record.test.mjs` (683 lines). The slice is a trust-boundary slice (browser lasting storage).

Result: 0 blocking findings, 3 Minor (one of them outside the slice's *Change*), 0 Critical, 0 Important.

## Findings

### Blocking

None.

### Minor

**M1. The record's handling at a refused write departs from the plain wording of D-441's last sentence; the departure is
deliberate and does not break D-440. Within the task, non-blocking.**
Place: `src/browser/view/judging-cache.ts:502-519` (`offerRecord`), doc comment `:451-458`.

What the cache does. For a judging at a refused write (`remember`, `:490-498`): the judging goes to the page's memory and the
stored value of its triple is removed where the browser allows it. For the record at a refused write (`offerRecord`,
`:514-518`): the number goes to the page's memory and the stored record is left where it is. Everything else the judgings do is
done for the record too: no exception leaves (`writeTo`, `readFrom`, `removeFrom`, `keysOf` are the existing guarded helpers),
a successful later write takes the key out of the memory so the storage answers again, no storage keeps it for the open page
alone, the opening tidies the account's other-game records and, after a refused save, this game's, and a storage that refuses
to list or to remove throws nothing (tests `:510-683`).

Does it break the sentence of D-441 ("on opening and at a refusing storage, treated as the judgings are") or of D-440? Judgement:

- D-441's paragraph on the refusing storage ties the removal to "the stored value of **its triple**", that is, to the judging; the
  sentence about the record is one general clause and neither the invariant `judging-cache-reading` nor the verification of
  D-441 (its complies / violates lines for the record) names a removal for the record. So the plain wording does not require the
  removal for the record; it also does not say it is not done.
- D-440 requires that the record "stays through a change of the program and the death of a character", and its violates list
  names "a number that falls after a change of the program or the death of a character". The Slice 7 Goal says "the record never
  falls ... a refusing storage leaves the record for the open page alone". Removing the stored record at a refused write would,
  after a reload, drop the record from what the page showed to nothing, and below the lower record the storage truly held. The
  judgings remove to keep a stale (wrong) judging from standing against a newer one; a stored lower record is never wrong, since
  reading takes the highest of storage and memory. So the executor's choice serves D-440's purpose and costs nothing.
- Therefore: the record is treated "as the judgings are" in every respect a reader of D-441 can name except one step (the removal),
  and in that step the departure is deliberate, stated in the doc comment, and in the direction D-440 asks for. The remark of the
  executor that the existing judgings' handling is unclear against D-441 does not hold: for judgings D-441 says the removal in
  words ("the stored value of its triple being removed where the browser allows it") and `remember` and the test "a write the
  storage refuses leaves the judging for the open page, removes the stored value of its triple" do it. The unclear part is only
  the one clause about the record.

Grade: Minor. The foundation entries were written outside this range (commit `612476a6`), so the paragraph on entries the
change itself writes does not apply; no user-visible behaviour exists yet (nothing calls `readRecord` / `offerRecord` before
Slice 11); a plain reading of D-441 does not forbid the code, and the alternative reading would make the code violate D-440's
purpose. The cost of leaving it: a reader or a later reviewer who reads "treated as the judgings are" literally will flag it
again. Recommended action for the orchestrator: have D-441's last sentence say the record is treated as the judgings are except
that the stored record is left at a refused write, since a lower record stands against no higher one and the record never falls
(through `the-way-record-decision`, a one-clause change). If the human wants the literal removal instead, it is one `removeFrom`
after `recordMemory.set` and two assertions of the test at `tests/view/judging-cache-record.test.mjs:510-523`; the cost is that a refused write then costs the player the
record on the next reload.

**M2. A hand-written `damage` of `-0` is read and returned as `-0`; a number written as `2.4e1` is read as 24. Within the task,
non-blocking.**
Place: `src/browser/view/judging-cache.ts:120-124` (`isCount`) used by `readRecordValue` `:258-285`.
`isCount(-0, 0)` holds (`Number.isSafeInteger(-0)`, `-0 >= 0`), so a stored `{"damage":-0,...}` is a value of the form and
`readRecord` returns `-0`; a value spelled `2.4e1` or with a repeated key also reads. Probe
`.runs/task-cycles/katalog-map/reports/review-7-probe-negative-zero.mjs` (ran from `.runs/review-7/`, as it imports
`../../dist/...`) printed `-0 number`, `24 number`, `24 number`. The cache never writes such text (`JSON.stringify(-0)` is
`"0"`). Why Minor: the value is the same number to every comparison and to `String`; only `Object.is` or `assert.deepStrictEqual`
tell it from 0, and the existing judging reading has the same latitude (it uses the same `isCount`), so "the form the cache
writes" is held at the level of the invariant's tests, not of the text. A consumer that strict-compares with `Object.is` would
see it; none exists. Fix if wanted: return `damage + 0` or reject `Object.is(value, -0)`.

**M3. Out of the slice's *Change*: the trust-boundary row of `guidelines/testing.md` for `src/browser/view/judging-cache.ts`
does not name the new test file or its cases.**
Place: `guidelines/testing.md`, table "Granica z mapy", row `src/browser/view/judging-cache.ts` (line 178 of the file as read).
The row lists the cases of `tests/view/judging-cache.test.mjs` only; the new file `tests/view/judging-cache-record.test.mjs`
holds the invariant-marked cases of the record. The rule of that section ("at least one fixed test checking the refusal
directly, marked with the invariant and once seen failing") is met by the existing cases; the row is merely incomplete. Not in
the slice's *Change* (the plan lists two files), so out of scope for this slice; the executor raised it as a concern too.
Recommended: a later slice or `the-way-maintain-testing-guidelines` adds the new file's cases to that row. Counts as
out of scope.

### Declined to judge

- A lost update between two tabs (tab A reads 30, tab B writes 50, tab A writes 40 between the two calls of one `offerRecord`):
  `localStorage` has no compare-and-set, the judgings have the same "last write standing" (D-441 verification), and the window is
  two calls long; not something the task or the foundation asks the cache to close.
- How a later slice shows the number (catalog row, card, `text` role, "0" before the first judging): outside Slice 7; nothing
  calls the two new members yet.

## What I checked

### Against the slice (Goal, Change, Checks) and the task

- Key `loop2-judging-record-1|<account>|<moment>|<map>`, each part escaped with the judgings' `part` (`%`, `|`); its own version
  right before the separator, so a key of another version or of the judgings family never matches the prefix. Judgings
  prefix is `loop2-judging-2|`; the two families share no prefix. Meets "own version in the key, account, moment, map".
- Value: exactly `{"damage","health","strikeDamage"}` (JSON), no email address, no name (test at `:135-147` reads the stored value;
  the key holds the account's identifier only, as D-441 allows). Meets "nothing but the number and the creature's numbers".
- `readRecord(mapId, creature)` gives the number only where stored health and blow equal those given (`isMadeAt`); at other
  numbers it gives none, and the next offer replaces the record, though lower (test at `:196-221`). Meets the Goal and D-440 ("a
  record made at its former numbers shows nothing").
- `offerRecord` replaces only where higher than the record read for those numbers (strictly; equal or lower writes nothing,
  test at `:179-194` counts writes); never falls after a program change or a death since nothing in the judging path touches the
  record key (test at `:223-263`). A number that is no whole number from 0 to the creature's health, or a creature whose numbers
  are not whole (health from 1, blow from 0), is not taken (12 cases, `BAD_OFFERS` `:479-508`).
- Opening: `tidyRecords` removes the account's records under another moment, and this game's after a refused save; other
  accounts' and other versions' stay; the judgings' own tidy is unchanged and given the same key list (`tidyStorage` lists once).
  A record has no program or character number, so the content-revision / generation rules rightly do not apply.
- The executor's three choices judged: (a) `damage` above `health` reads as none (D-440: "a fight the character won giving the
  creature's whole health", so a larger number is no value the cache wrote) - accepted, within D-440/D-441 and the invariant;
  (b) reading takes the higher of storage and the page's memory - accepted, it is what keeps "never falls" true against another
  tab, and it is no departure from the judgings in any sentence of D-441 (the judgings read memory first, but a judging replaces
  and a record only rises, so "higher" is the record's own rule); (c) the key `loop2-judging-record-1|...` - accepted, it meets
  "its own version in the key" and `judging-cache-reading`.
- Nothing was added that nobody asked for: `RecordCreature` is the type of the two numbers the Goal names; `hasOnlyFields` got a
  field list parameter, with the judging's call unchanged; `tidyStorage` was split in two, behaviour unchanged (existing 107 cases
  green).

### Trust boundary: crafted values and refusals (read-only on `src/`, probes in a copy under `.runs/review-7/`)

Crafted stored values, from the test file's `BAD_VALUES` (`:368-439`; a case for each,  each "reads as none, throws nothing and stays where it
is"): empty text, no JSON, cut value, `null`, number, text, list, list of the three values, `{}`, each field missing (3), one
more field, `__proto__` / `constructor` beside the three, the three fields under a prototype, damage below 0 / fraction / text /
null / list / past safe integers / `1e400`, damage above health, health 0 / below 0 / fraction / text / past safe integers, blow
below 0 / fraction / text / null / past safe integers, a valid value padded past the length bound, a valid value after 5,000
spaces. Another version, another account, another game and the other family's value under the key: tests at `:304-337` and
`:339-366`. Storage answering with no text (`undefined`, number, object, list, `true`): `:459-466`. Storage whose every call
throws, that refuses writes and removals, that refuses to list keys, and no storage: `:510-593`, `:595-676`. The new code has no
path to an exception: every call of the storage goes through `readFrom` / `writeTo` / `removeFrom` / `keysOf`, `part` and
`JSON.parse` are guarded or total on the types, and nothing the parse made is handed on (the returned object is built from three
checked numbers).
My own probe added: `-0`, `2.4e1`, repeated key (M2). No other crafted form got through.

Mutation probe (my own, on a copy of `dist/` under `.runs/review-7/`, the new test file run against each): 12 breaks, each
killed by at least one case:
blow not compared (1 fail), health not compared (2), refused-save tidy of this game dropped (1), tidy removing without the
account prefix (4), page memory ignored (5), storage ignored (15), equal offer writes (1), lower offer replaces (8: 5 fails),
damage above health accepted (2), extra fields allowed (3), version of the prefix changed to 2 (15), offer without the
creature-number check (6). Script: `.runs/task-cycles/katalog-map/reports/review-7-mutations.py`. The test of a map id not
escaped in the key was dropped by the executor as equivalent (the map is the last part of the key): I agree, no two keys become
one.

### Code that passes a test without meeting the requirement (WAY-409)

None found: no branch, value or comparison in `judging-cache.ts` exists for a test's input; the tests write their stored forms
by hand and the expectations come from D-440 / D-441 (numbers of the data: 120 and 20 for the bear, checked by the executor
against `creatures.ts`; the test selects the map by id `forestLair`).

### Tests against the testing guidelines

Read whole; each assertion judged for "could a correct change of the code break it". The cases pin the stored form (keys and
values by hand, as the existing file does and says in its header), which is the contract with what a browser already holds.
The `decision:` / `invariant:` comments follow the existing file's convention (`decision:` 27 and `invariant:` 15 in the old file; 22 and 15 in the new);
`foundation_check.py` finds every new quotation in a binding sentence (no error names the new file). One comment (case at `:510`)
quotes the D-441 sentence about the judging's removal above a test asserting the opposite for the record; it is the quotation
about "refusing storage", not wrong, but it is the sentence M1 is about.

### Guidelines compared (rules with no invariant the change reaches)

`coding.md`: language English, no suppressed lint, formatter clean, size rule (D-425: 200 per function, 800 per file) - file at
537 lines, `openJudgingCache` ~63 lines, new test file 683 lines, under the thresholds. `coding-browser-module.md`: the file is a
non-drawing module of `src/browser/view/`, no React/DOM; the rules on content names (`content-identifiers`) are met - the cache
names no map or creature (the test names `forestLair` and the bear's numbers as test data). `src/browser/AGENTS.md`: no style
involved. No reserved choice is taken (`localStorage` is D-441's own, already settled).

## Checks run

All from `the task's worktree`, at head `3e3c38a8`.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/judging-cache-record.test.mjs` | 0 | 70 tests, 70 pass |
| `npm test -- tests/view/judging-cache.test.mjs` | 0 | 107 pass |
| `npm test -- tests/view/judging-cache-page.test.mjs` | 0 | 6 pass |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | OK |
| `npm run --silent typecheck` | 0 | clean |
| `npx eslint --max-warnings 0 src/browser/view/judging-cache.ts` | 0 | clean |
| `npx prettier --check src/browser/view/judging-cache.ts` | 0 | clean |
| `npx eslint --max-warnings 0 tests/view/judging-cache-record.test.mjs` | 0 | clean |
| `npx prettier --check tests/view/judging-cache-record.test.mjs` | 0 | clean |
| `python -B .the-way/elements/common/foundation_check.py` | 1 | 14 errors, all the known citations (`account-screen`, `map-lines`, `maps-screen` tests; D-325, D-327; Slices 8 and 9); none from the new file; no other error |
| `node .runs/review-7/probe.mjs` (crafted `-0`, `2.4e1`, repeated key) | 0 | `-0 number`, `24 number`, `24 number` (M2) |
| `python .runs/review-7/mutate.py` (12 breaks on a copy of `dist`) | 0 | each break fails at least one case (see above) |
| `npx eslint -c tests/quality/eslint-size-rules.mjs ...` | 2 | not usable that way (the script takes no file arguments; "No files matching the pattern"); sizes were read by line count instead; the size test of the gate was not run |

The full gate (`npm test` with no argument) was not run, by the handoff.

## Reach beyond the dispatch

- `.the-way/task-cycle/review/SKILL.md` (the method; named by the handoff).
- `tests/quality/eslint-size-rules.mjs` (first 60 lines): the thresholds of D-425, to compare the file sizes.
- `a rules file of the author's agent configuration`: shown by the session's hook before the script of the mutation probe.
- `.runs/task-cycles/katalog-map/reports/executor-7-report.md` (named by the handoff): read whole after my own review of the
  code and tests, as claims to verify.
- Titles of D-448 and D-449 (grep of the headings): to confirm they do not concern the record; not read further.

## Working copies

`.runs/review-7/` (a copy of `dist/browser`, the test file, the probe, the
mutation script and the logs): removed (`find ... -delete`, then `rmdir`), confirmed absent. Kept beside this report:
`.runs/task-cycles/katalog-map/reports/review-7-probe-negative-zero.mjs` and `.runs/task-cycles/katalog-map/reports/review-7-mutations.py`
(both ran from the removed directory and import `dist/` relative to it). No git worktree was made. No tracked file was changed;
`git status --short` was empty at the end.

## Unread material

- `guidelines/styleguide-browser-view.md` (1,507 lines): not read. It is the styleguide of screens, tokens and drawing; this
  slice changes no screen, style or text a user sees (nothing calls the two new members yet). I read `src/browser/AGENTS.md`
  whole (it does not touch a file with no style).
- `guidelines/testing.md`: not read whole; read lines 1-357 of 510 (the rules on levels, trust boundaries and
  the table of boundaries, AI in tests, mutation testing, flaky tests, tests on a document imitation, the start of "Test files in
  the gate"); lines 358-510 (the rest of "Test files in the gate" and what follows) not read. They concern the test gate's
  selection of files and the other parts' tests; the new file's inclusion in the gate is checked by `npm test -- <file>` having
  run it.
- `foundations/part_map.md`: lines 1-33 (the `browser-view` entry; the long first paragraph cut at 300 characters by my command,
  the trust-boundary list read) - not the whole 249-line file.
- `.runs/task-cycles/katalog-map/task.md` and the plan: not read (not mine unless named; the handoff copies the passages word
  for word, and I read those).
- `tests/view/judging-cache.test.mjs`: lines 1-120 read, as the *Read* names; plus the count of its `decision:` and `invariant:`
  comments; the rest not read (107 cases run green).
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, D-440 and D-441 whole,
  `judging-cache-reading` whole, `src/browser/view/judging-cache.ts` whole, the new test file whole: read whole.

## Searches not found or unclear

- D-441's last sentence ("on opening and at a refusing storage, treated as the judgings are") is unclear on whether the stored
  record is removed at a refused write; no sentence of D-440, D-441, the invariant or the verification says it either way (M1).
- The handoff's *Read* gives `foundations/decisions.md:12159-12235` for D-440 and D-441; they stand at 12230-12323 now
  (the handoff itself says the numbers moved); found by heading.
- The handoff says a check with `--skip-test-citations` drops the 14 known errors; I did not run that form, and the plain form
  lists the 14 (the executor reports the flag did not drop them).
