# Report of the executor of slice 12 — task `ocena-programu-na-ziarnach`

## Status

`done` — the cases of slice 12 are followed (commit `8b280fc2`), and the defect of slice 11 that one of them
exposed is fixed in a commit of its own (`21499c5d`), as the coordinator answered. The case that failed in the first
version of this report now passes without any edit of the case or of its assertion. See "The fix of slice 11's defect".

## Commits

- `8b280fc2` — `tests/view/account-screen.test.mjs` (+91, −22): slice 12. Branch `task/ocena-programu-na-ziarnach`, base `0095c910`.
- `21499c5d` — `src/browser/view/maps-screen.tsx` and `tests/view/maps-screen.test.mjs`: the fix of slice 11's focus defect (widening of the boundary by the coordinator, these two files only).

## What changed in `tests/view/account-screen.test.mjs`

Before the change (`reports/slice-12-before.txt`) four cases failed: the ACTS case of D-207 (the entry „Puść w pętlę”),
„Puść w pętlę” puts the character into an earning loop…, „Zatrzymaj” stops at once…, and a change of the chest
redraws the chest alone… Each failed because the first click of „Puść w pętlę” now only judges (D-243), so no
earning loop and no save of the start followed it.

1. New helper `startLoopOf(root, name)` (next to `whoOf`): presses „Puść w pętlę: {name}, mapa Las", lets the page
   judge (`mock.timers.tick(100)`, as `tests/view/uncaught-failure.test.mjs` does), asserts that the button
   „Puść mimo to: {name}, mapa Las" stands and is active, and presses it. Used by the three cases that start a loop
   from the screen Mapy: „Puść w pętlę” puts the character…, „Zatrzymaj” stops at once… and a change of the chest…
   The programs of these cases do not solve all twelve seeds of Las (the page really judges them), so the second click
   is the way that keeps what each case checks (stay on Mapy, the line of the loop, the focus, the row after the stop,
   the chest taken at another character's start). Cause of the change: D-243 as the foundation step changed it.
2. The ACTS case „each act of the player that changes the game state is saved at once…”: the entry „Puść w pętlę”
   became „Puść w pętlę”: its judging, and the start at the second click. Its first step (click, judge) expects the
   one save of the judging, `judgeAndRemember(start, {forest, 1, 2}).state` (a judging is a change of the game state
   the game saves, D-207); a new optional field `afterwards` of an entry gives a second step: the second click, the
   save of which waits behind the first (one request in flight), and after the first save is answered the second is
   sent with `basedOn` 5 and the state `startLoop(judged state, …, CLOCK_MS)`. Only this entry has `afterwards`; the
   rest of the loop is unchanged.
3. The case „„Puść w pętlę” puts the character into an earning loop…” is renamed (its name said „at once”, which D-243 no
   longer says) and its end checks the two saves in order: the first holds the judging with no loop, after its answer
   the second holds the loop.
4. Quotations `decision: D-243`: the three that no longer stood in D-243 (the old first sentence, at the lines of the
   ACTS case, of „a character in an earning loop shows its line…” and of „„Puść w pętlę” puts the character…”) were
   shortened to what stands now („…beside „Wejdź”, and takes the program of that character's list „Program:””); the
   ACTS case and the „Puść w pętlę” case also quote the sentence of D-243 that gives the second click („Otherwise the
   new result stands … and a second click starts the earning loop.”).
5. Import of `judgeAndRemember` from `dist/browser/sim/judging.js`.

The case „a character in an earning loop shows its line and „Zatrzymaj”…” counts the „Puść w pętlę” controls of Ola
on the unsolved map `forestDeep` (zero) — it passes unchanged, so only its quotation changed.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Focused test, before my change | `npm test -- tests/view/account-screen.test.mjs` | 1 | 128 pass, 4 fail (`reports/slice-12-before.txt`) |
| Focused test, after my slice-12 commit, before the fix | `npm test -- tests/view/account-screen.test.mjs` | 1 | 131 pass, 1 fail: the focus case below |
| Focused test, after the fix | `npm test -- tests/view/account-screen.test.mjs` | 0 | 132 pass, 0 fail (`reports/slice-12-after.txt`) |
| Foundation check, quotations of tests skipped | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | 0 errors |
| Foundation check, whole (the slice's *Checks*) | `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors (no error in any file, quotations of tests included) |
| Format | `npx prettier --check tests/view/account-screen.test.mjs` | 0 | clean |
| Lint | `npx eslint tests/view/account-screen.test.mjs` | 0 | clean |

The full gate (`npm test` with no argument) was not run, as the handoff and the method say.

## The failing case, and its cause (as found before the fix)

Case: „„Puść w pętlę” puts the character into an earning loop, at its second click where a seed stays unsolved, and the
player stays on the screen Mapy, where the character shows it` (the assertion "the focus goes to „Zatrzymaj”, which
took the place of the pressed button", unchanged from before). Failure: expected `<button class="button destructive">`,
got `<body>`.

Cause (verified): in `src/browser/view/maps-screen.tsx`, the `onClick` of the button of „Puść w pętlę” in the branch
`if (asking)` runs `judging.spend(id)`, then `focus.owe({ …, target: "stop" })`, then `controls.startLoop(...)`.
`spend` queues a `setShown` in React. `controls.startLoop` goes to the store, whose reading of the game state redraws
the other roots (Siedziba) with `flushSync`; that flushes the queued `setShown` of the maps screen too, with the old
props (the maps screen's own draw is held back by `acting` in `maps-entry.ts`). That commit's `useLayoutEffect`
consumes the owed focus while the element `1:stop` does not exist yet, so the focus falls to `body`. Evidence: with a
temporary `console.log` in the layout effect the commit with `{"characterId":1,"target":"stop"}` listed the keys
`1:program,1:enter,1:judge,1:loop` without `1:stop`; and with the order changed to `focus.owe(...)`,
`controls.startLoop(...)`, then `judging.spend(id)` the whole file passed (132 pass, 0 fail). I then restored the
source (`git diff src` is empty; no change of `src/` is in my commit). The tests of `tests/view/maps-screen.test.mjs`
cannot see it: their controls are stand-ins that never redraw another root.

This is a defect a player meets: after „Puść mimo to” the focus falls to the page instead of „Zatrzymaj” (the
styleguide's rule "Focus does not fall to the page", which the maps-screen test of slice 11 quotes).

## Questions (answered: fix it, in a commit of its own — done below)

1. Fix the defect in `src/browser/view/maps-screen.tsx` (a retry of slice 11 or a fix of its review) — recommended:
   in the `if (asking)` branch call `judging.spend(id)` after `controls.startLoop(id, mapId, program.id)`, as in my
   experiment, with a test in `tests/view/maps-screen.test.mjs` whose `startLoop` stand-in redraws another root so
   that the case sees it. With that change the case of this slice passes without any edit of mine. Alternative: change
   the case to expect the focus on `body` — rejected: it would pin a defect and weaken an assertion the requirement
   (focus kept on the buttons through the waiting, D-243) contradicts.

## The fix of slice 11's defect (`21499c5d`)

Change in `src/browser/view/maps-screen.tsx`: in the `if (asking)` branch of the click of the button of „Puść w pętlę”,
`judging.spend(id)` now runs after `controls.startLoop(id, mapId, program.id)` (with a comment saying why), the order
`focus.owe(...)`, `controls.startLoop(...)`, `judging.spend(id)`. Nothing else of slice 11's behaviour changed.

New case in `tests/view/maps-screen.test.mjs`, written first: „the focus goes to „Zatrzymaj” after the second click,
„Puść mimo to”, also where starting the earning loop redraws another screen on its way”. Its `startLoop` stand-in
first redraws a second React root with `flushSync` (what the page's store does on its way), then updates the maps
screen. It focuses the buttons as a click does, judges, presses „Puść mimo to” and asserts the focus is on „Zatrzymaj: Ala”.
Quotation: one `// decision: D-243` line, the sentence „Otherwise the new result stands under the character … and a
second click starts the earning loop.”, word for word (foundation check exit 0). It breaks only if the second click
leaves a queued update before the loop is drawn: a bug, not a decision.

Red then green:
- Red, on the source of `0095c910` with the new case: `npm test -- tests/view/maps-screen.test.mjs` exit 1, 39 pass,
  1 fail, the new case, with "the focus is on „Zatrzymaj”, not on the page: expected <button class="button destructive">,
  got <body>" (`reports/slice-12-fix-red.txt`).
- Green, with the fix: the same command exit 0, 40 pass, 0 fail.

Checks after the fix:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/maps-screen.test.mjs` | 0 | 40 pass, 0 fail |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 132 pass, 0 fail |
| `npm test -- tests/view/judging-lines.test.mjs` | 0 | 12 pass, 0 fail |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 | 19 pass, 0 fail |
| `npx prettier --check src/browser/view/maps-screen.tsx tests/view/maps-screen.test.mjs` | 0 | clean |
| `npx eslint src/browser/view/maps-screen.tsx tests/view/maps-screen.test.mjs` | 0 | clean |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | 0 errors |

The full gate was not run. The two new imports of the maps test (`react`, `react-dom`, `react-dom/client`) are those
other tests of `tests/view/` use. A second change in a file of the part browser-view (`maps-screen.tsx`), by the
coordinator's word: `guidelines/styleguide-browser-view.md` stays unread; the rule the fix serves ("Focus does not
fall to the page") I took from the quotation in slice 11's test.

## Own-work check (section 3)

Requirement most likely not met: the plan's "the saves a case expects follow the save that a judging makes (D-207)",
and "a case that expects the loop to start at once clicks „Puść mimo to” … keeps what the case checks". Check: the
ACTS entry would pass with only the first save asserted, so I made it fail if the second save were missing or wrong:
it asserts that after the second click exactly one save waits (behind the first), and that after the first is answered
the one sent carries `loops[1]` equal to the state of `startLoop` on the judged state with `basedOn` 5. It passes (the
ACTS case is among the 131). Mutation in the head: a second click that did not start the loop → `afterwards` expected
state differs → fails; a click that started the loop at once with no judging → the first save would hold a loop, and
the `startLoopOf` precondition (the second-click button stands) would fail. Weakest point left: the program the
cases use (the second program of Ala, the default one of Ola/Ala) dies on some seed of Las; if a later change of the
game's data made one of them solve all twelve seeds, the helper's precondition would fail loudly rather than pass.

Not added (outside "nothing else of the file changes"): no case of this file presses „Oceń na 12 ziarnach” and counts
its save; the save of a judging is covered here only through the first step of the ACTS entry above, and the button of
a judging itself by `tests/view/maps-screen.test.mjs` (slice 10).

## Walkthrough (`walkthrough.md`)

Slice 12's commit alters no behaviour a user sees: it changes a test file only. The fix `21499c5d` restores the focus on
„Zatrzymaj” after „Puść mimo to” (a behaviour a user sees); it was found and is held by tests on jsdom, and I did not walk
it in a real browser (jsdom does not prove real focus, D-88).

## Reaches beyond the handoff

- `.the-way/task-cycle/change/slice.md` (named by `SKILL.md` for a slice) — read whole.
- `src/browser/view/maps-screen.tsx` and `src/browser/view/maps-entry.ts`, `src/browser/sim/judging.ts`,
  `git show 0095c910` (the tests of slices 10 and 11) — read in ranges to find the labels, the frame of the judging and
  the cause of the focus failure. Temporarily edited `maps-screen.tsx` for the diagnosis; restored before the first commit
  (`git diff src` empty); `src/` changes only in `21499c5d`.
- `tests/view/maps-screen.test.mjs` (ranges: header, `mount`, helpers, the focus cases) and `src/browser/view/maps-screen.tsx`
  (the changed branch) for the fix, by the coordinator's widening.
- `tests/view/page-document.mjs`, `tests/view/uncaught-failure.test.mjs` — read in ranges for `press`/`settle` and the
  tick of the mocked timers.

## Unread material

- `guidelines/styleguide-browser-view.md`: not read, though `maps-screen.tsx` (part browser-view) changed in `21499c5d`
  — a one-line reorder; the rule it serves I took from the quotation in the maps-screen test of slice 11. Slice 12's own
  commit changes a test file only.
- `guidelines/coding.md`: read whole. `guidelines/testing.md`: read whole (509 lines, in two reads).
- `foundations/decisions.md:8771-8838` (D-243), `:9975-10004` (D-329), `:3934-4013` (D-207): read whole. The task's
  passages (`task-frozen.md:34-35`, `:227-228`) were read as copied in the handoff, not opened in the file.
- `tests/view/account-screen.test.mjs` (357 KB): not read whole, as the handoff says; read the ranges around the ACTS
  list, `whoOf`, `viewOf`, `loopingAla`, `heldClient` and the six cases named above.

## Searches not found or unclear

- None not found. Unclear: whether D-207's list of acts is meant to name the judging (its text still lists „Puść w
  pętlę” and not „Oceń na 12 ziarnach”); I followed the plan's reading that a judging, a change of the game state, is
  saved, and the first step of the ACTS entry shows it is.

## Choices

- Second click („Puść mimo to”) rather than a program that solves all twelve seeds: no reference program of the
  repository was known to solve all twelve seeds of Las (`tests/sim/judging.test.mjs` uses `forestBest`, which dies on
  some), and finding one would cost a search with no gain to what the cases check. Cost if wrong: a program of the data
  that solves all twelve would make the helper's precondition fail loudly.
- An optional `afterwards` field in the ACTS entries rather than a separate case: keeps the one list of acts of D-207.
- Class `same`: sufficient; no point where it proved too weak.

## Working copies

Directory `.runs/executor-12/` held the outputs of the
runs and copies of the test file and of `maps-screen.tsx` for the diagnosis and the red run; removed (checked with `ls .runs`).
Kept beside this report: `reports/slice-12-before.txt`, `reports/slice-12-after.txt`, `reports/slice-12-fix-red.txt`. No remainder.
