FAIL 0a8c6a8b8638b8dde94976f6006555bd97c9d73d

# Report 17 — review of the return step's commits

Range `52367a97ee32519e9c97a2649be9530f3e50a73c..0a8c6a8` — one commit, `0a8c6a8`, `foundations/decisions.md`
only (+15 / −6: D-336 binding sentence, *Verification*, *Rationale*, *Rejected*; D-334 one *violates*
example). `git rev-parse HEAD` = `0a8c6a8b8638b8dde94976f6006555bd97c9d73d`, the head given. Pinned
the-way `294af7fde45323ac1851c014a03071a97fc38d96` (`git -C .the-way rev-parse HEAD` and
`git ls-files --stage -- .the-way` agree).

Counts: blocking 1 (Important); Minor 1; out of scope 0.

## Findings

### Critical

none

### Important

**I-1. D-336's new sentence exempts only a saved program "picked on its list", while the code
scrolls nothing whenever any saved program is shown — „Nowy program” during a map run shows one too.**
Within the task (D-336 is the task's row 3, and the sentence is the return step's own).

- Place: `foundations/decisions.md:7299-7301` — „While the program panel shows a saved program picked
  on its list during the map run (D-174) in place of the copy, the click scrolls nothing and the saved
  program stays shown.” The *Rationale* repeats the narrowing at `:7321` („a saved program the
  player picked during the map run is another program”).
- What the code does: `src/browser/view/program-panel.tsx:822` —
  `if (mode !== "run" || state === null || shown.kind !== "copy") return;` — no scroll for every
  shown saved program, however it came to be shown. During a map run the panel of the screen of a map
  run shows a saved program by two routes, not one: a pick on the list (`program-panel.tsx:533-543`,
  D-174), and „Nowy program”, which stands in the run panel's actions (`program-panel.tsx:558`) and
  whose action shows the new program (`program-panel.tsx:763-769`, `show({ kind: "saved", programId })`;
  D-167 gives the button). The plan's *Choices* row the entry comes from says the same as the code, not
  the entry: „The program panel scrolls only while it shows the copy; with a saved program shown a
  click scrolls nothing” (`plan.md:575`).
- Why it matters: read as written, D-336's first sentence (a click scrolls the program so the rule the
  row names stands in its middle) is the rule, and its new second sentence the one exception. In the
  state after „Nowy program” during a map run the exception does not apply, so the entry requires a
  scroll the code does not make — WAY-263: the change's files fail to do what the entry it writes
  requires. A later author who follows D-336 there would "fix" the code — scroll the new program to a
  rule of the same number, or bring the copy back, the very way D-336's *Rejected* now turns down. The
  same narrowing makes the screen after the end of a map run unclear: the list still lets the player
  pick a saved program after a death or a completion (the run still stands until „Zakończ”, `game.ts`
  `end`), the rows „Teraz” and „Potem” still stand (D-334, D-335), and the code scrolls nothing — but
  whether a pick then is "during the map run" the entry does not say.
- Evidence: scratch test (below) — on `underway()` with the copy shown, a click on „Nowy program” in
  the run panel shows „Program 2” (`select.value` 2, no `copy-heading`), and a click on „Teraz” and
  Enter on „Potem” record `scrolls.length` 0, the copy not put back. `tests/view/run-screen.test.mjs:698-719`
  shows the saved program by `panel.showProgram(1)`, the boundary's call, not a list pick — the test the
  return report cites already exercises a route other than the one the sentence names.
- Fix within the return step's boundary: drop the route from the condition, e.g. „While the program
  panel shows a saved program in place of the copy, the click scrolls nothing and the saved program
  stays shown.” (D-174 and D-167 may stay cited as the ways a saved program gets shown), and in the
  *Rationale* „a saved program the panel shows in place of the copy is another program”.

### Minor

**M-1. One *Rationale* line of D-336 is not wrapped as the rest of the entry.**
`foundations/decisions.md:7322` joins „…as it is.” and „Accepted with it: a player who shows a saved
program during a map run clicks „Teraz” or” into one line of about 180 characters, while D-334 to D-337
are wrapped near 100 columns. Rendering is unaffected; it only makes the next diff of the paragraph
noisier. Can go with I-1's edit.

## What was compared and holds

- **D-336, the click on a row of the copy while the copy is shown** — unchanged sentence, still
  matches `now-rows.tsx:59-87` (tab stop, click, Enter and Space only where the copy holds the rule) and
  `scrollToRule` (`data-rule`, else the folded group's header, `block: "center"`).
- **D-336, "the saved program stays shown"** — true: `now-rows.tsx` calls only `onShowRule`,
  `run-screen.tsx:202` calls only `panel.scrollToRule`, and `scrollToRule` changes no state; the scratch
  test also saw no `copy-heading` after the click. The *complies* example („leaving that program shown
  where it stood”) and the *violates* example („putting the copy back in its place”) match the code.
- **D-336 *Rationale* "even where its rules carry the same numbers"** — true; the test comment at
  `run-screen.test.mjs:697-698` and the `diverged()` state show a saved program with the copy's numbers.
- **D-336 *Rejected*, the click bringing the copy back** — matches the way the plan's *Choices* row
  (`plan.md:575`) turned down and fix-review M-5's way 1. Writing the plan's choice as a decision of the
  cycle is what `.the-way/task-cycle/skill/return_step.md` asks for a choice that binds after the merge;
  M-5's open question to the human (the rows' look while a saved program is shown) is not settled by
  the entry, which says nothing of the look, and the return report names how D-336 changes if the
  human picks way 1.
- **D-334, *violates* „the word „Teraz” written in the row before the icon, as „Potem” is in its row”** —
  matches the code (`now-rows.tsx:107-124`: only the „Potem” row carries `next-label`), To do 1 of the
  task (the „Teraz” bullets name icon, action and right part, no label; only „Potem” gets „napis
  „Potem””), *Settlements to record* row 1, and the binding enumeration of D-334, which it illustrates
  without widening.
- D-334's and D-336's *Origin* left as they were: the new sentences carry their whole reasoning in the
  entry, as `.the-way/elements/decisions/template.md` § Origin allows; the plan under `.runs/` would be
  no lasting *Origin*.
- `foundation_check.py` reports 0 errors at the head.

## Declined to judge

- Fix-review M-5 (the rows keep a control's look while a saved program is shown) — code outside this
  range, already open for the human; this review only checked that D-336 does not settle it.
- The return report's note that `src/browser/sim/data/actions.ts` field `status` is still read by
  `combat-line.ts:54` — code outside this range and no foundation entry names it.

## Checks

| Check | Command or method | Exit / result |
|---|---|---|
| Head | `git rev-parse HEAD` | 0 — `0a8c6a8b8638b8dde94976f6006555bd97c9d73d` |
| Pin | `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0; 0 — both `294af7f…` |
| Range | `git log --oneline 52367a9..0a8c6a8`; `git diff 52367a9..0a8c6a8` | 0 — one commit, `foundations/decisions.md` only |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 — `0 errors` |
| Focused tests (D-336 cases) | `node --test tests/view/run-screen.test.mjs` (against the worktree's existing `dist/`, built 03:17 after the last code commit at 02:37; `dist/browser/view/program-panel.js:424-426` holds the same `shown.kind !== "copy"` return) | 0 — 13 of 13 pass, including the scroll-with-copy positive control and the saved-program case |
| Scratch: „Nowy program” then a click | a copy of `tests/view/run-screen.test.mjs` in the scratchpad (`a scratch test in the reviewer's temporary directory`) with imports made absolute, the `createProgram` control applying the real `createProgram`, and one added case; `node --test --test-name-pattern=SCRATCH <that file>` | 0 — `SHOWN="Program 2" VALUE=2`, `SCROLLS=0 COPYHEAD=0` (I-1) |
| Worktree untouched | `git status --short` | empty |

Not run: `npm test` (the cycle's own run before the request); a real browser (the entries describe no
look this commit changes).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-167 (`:3083-3096`), by a search for „Nowy program” — whether a decision
  gives a way, other than D-174's list, that shows a saved program during a map run (I-1).
- `src/browser/view/program-panel.tsx:195-260` (`nextShown`, `shownContent`), `:500-600` (the run
  panel's head: list, switch button, „Nowy program”), `:700-800` (`createProgramPanel`, `show`,
  `createProgram`, `showProgram`) — every route that sets `shown` in run mode (I-1).
- `src/browser/view/game-view.ts:225-264, 625-645` — the other caller of `showProgram` belongs to the
  Programy screen's own panel, not the run panel.
- `src/browser/sim/game.ts:495-545` (`restart`, `end`) — that the map run, and so the rows, stand after
  a death until „Zakończ” (I-1, the after-the-end part).
- `.the-way/task-cycle/skill/return_step.md` whole and `.the-way/elements/decisions/template.md`
  § Origin — whether a plan's choice belongs in a decision at the return step, and whether *Origin*
  must change.
- `reports/13-review-report.md` M-5 and `reports/15-fix-review-report.md` M-5 — named by the dispatch;
  read to see whether the new D-336 text settles what M-5 leaves to the human.

## Searches not found or unclear

- Whether "during a map run" in D-174, and so in D-336's new sentence, covers the screen of a map run
  after its end (a death or a completion, the run still standing until „Zakończ”) — unclear; the code
  treats both alike, the entries do not say. I-1's fix avoids the question.
- No test pins that the saved program stays shown after the click (`run-screen.test.mjs:698-719`
  asserts only no scroll); the scratch run checked it once, for „Nowy program”.
