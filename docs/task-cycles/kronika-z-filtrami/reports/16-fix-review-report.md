PASS 621d144

# Review of the fix of the Minor findings — kronika-z-filtrami

- Range: `1880393a31b8080a8ab2543f423d6e42db4e55c1..621d144843f24b5c7fac93f321be1ccf1841dda5` (`git rev-parse HEAD` = `621d1448…`; worktree clean before and after). Three commits: `d47e21f` (finding 1), `1f4424a` (finding 5), `621d144` (findings 3 and 4). Six files, +165 / −30.
- Method: `.the-way/task-cycle/review/SKILL.md` (sections 1–4 for a fix) and `.the-way/task-cycle/review/fix.md`. Bounded by `reports/15-findings.md` (five Minor findings, all within the task). Under WAY-162 only a new Critical or Important finding in the fix diff could fail this review; none was found.

## Findings, one by one

1. **D-347 not word for word — fixed.** `foundations/decisions.md`, D-347: the second binding sentence stands again word for word as the task quotes it („An exception in the game shows on the screen as a sentence that something broke and goes to the console.”); *Relations* gains `derives from D-323 · derives from D-253` (both exist, at lines 7067 and 5155); the *Rationale* gets back the risk „the sentence may show with no fault or blink” and leaves out only „Today an exception stops the game without a word…”, which is no longer true since D-323. The binding part has two sentences, within the template's one to three. The left-out *Rationale* sentence should still be named in the request description, since it is approved text dropped; it is not a defect.
2. **D-346 and a load — remains, contest kept as a question for the human.** Unchanged in code and foundation. The contest holds: row 14 is silent on a load, the reviewed spec D2 reads a load as starting at „Kronika” and „Wszystko”, `createChronicle` does so, and writing the qualification would add a meaning the task did not settle (WAY-172). It goes to the request's list as a question for the human; it blocks nothing.
3. **The grown window kept across a send or „Restart” — fixed.** `src/browser/view/chronicle.ts` counts map-run starts in the snapshot (`runNumber`, incremented and `changed()` at `mapRunStarted`); `src/browser/view/right-area.tsx` keys `ChronicleList` by `` `${filter}:${runNumber}` ``. An entry, a pick or „Zakończ” does not change `runNumber`, so the window does not jump while the player reads (new right-area case, and the new chronicle case on the number). My scratch mutation (key back to `snapshot.filter`) made `tests/view/right-area.test.mjs` fail at „the new map run started by „Restart”: expected 60, got 120”; reverted, tree clean.
4. **No test of „a row already drawn is not drawn again” — fixed in part; the rest remains, contest kept.** The `useMemo` of the paragraph is now protected: a new case counts reads of the encounter through a `Proxy` over the test's own fixture and fails when the paragraph is composed at each draw (the fixer's scratch mutation: exit 1; the case's logic reads correctly to me). The `memo(Row)` part: I keep the contest. `Row` takes three primitives and renders the same DOM whether React skips it or not; React's `Profiler` reports a subtree, not one component; a count would need a hook in product code. The window bounds the rows drawn, so a lost `memo` makes drawing slower, never wrong. Stays a Minor on the request's list.
5. **Styleguide `## Where in code` and unwrapped rule — fixed.** `src/browser/view/right-area.tsx` is out of `## Where in code` (now token file, shared controls, kitchen-sink page, as `.the-way/product-guidelines/styleguide/template.md:149-151` gives); the rule's body is wrapped near 80 characters with the same words (the diff changes only line breaks and the one removed line); the body still names `right-area.tsx` as the code's place, which is text, not the section.

## New findings in the fix diff

None Critical or Important. None Minor. Notes checked:
- `version` now also changes at a `mapRunStarted` that gives no entry; the existing case „the number changes at every change … and at nothing else” still passes, and a start is a change of the snapshot, so the doc comment of `chronicle.ts` stays true.
- The only removed test line is a one-line import widened to a multi-line one (`end`, `restart` added); no assertion was removed or weakened.

## Checks run

| Check | Command | Exit |
|---|---|---|
| head and range | `git rev-parse HEAD`; `git log 1880393..621d144`; `git diff 1880393..621d144` | 0 |
| build | `npm run build` | 0 |
| right area | `node --test tests/view/right-area.test.mjs` | 0 (13 pass) |
| chronicle memory | `node --test tests/view/chronicle.test.mjs` | 0 (25 pass) |
| game view | `node --test tests/view/chronicle-game.test.mjs` | 0 (4 pass) |
| run screen | `node --test tests/view/run-screen.test.mjs` | 0 (13 pass) |
| typecheck | `npm run typecheck` | 0 |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| quality (ESLint, Prettier) | `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| token values | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| scratch mutation | `ChronicleList` key set back to `snapshot.filter` in `src/browser/view/right-area.tsx`, rebuilt, `node --test tests/view/right-area.test.mjs` | 1 (1 fail, as expected); file restored from a copy, rebuilt, `git status --short` empty, `git diff --quiet` 0 |

Not run: the full gate `npm test` (the orchestrator's); the browser check (the fix changes no look; the window's key alone changed).

## Reaches

- `foundations/decisions.md` headings of D-323 and D-253 (grep) — that the new *Relations* name existing entries.
- `.the-way/product-guidelines/styleguide/template.md:149-151` — already read in the review of the whole change; used for finding 5.

## Searches not found or unclear

- A way for a test to count renders of one memoised component without a hook in product code — none found (finding 4, `memo(Row)`).
- Whether the human wants the tab pick to survive a reload (finding 2) — not settled by the task, spec or D-346.
