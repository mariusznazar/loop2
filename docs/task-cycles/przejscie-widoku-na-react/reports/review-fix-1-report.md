PASS f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa

# Review of fix 1 — the four Minor findings of the review of the whole change

- Range: `46e572174b32814af91fe17f3405d4383392caee..f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa` (6 commits). `git rev-parse HEAD` = `f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa`, the head given.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. The findings file `reports/findings-whole-minor.md` holds Minor findings only, so only a new Critical or Important finding in the fix diff would fail this review (WAY-162).
- Result: m1–m4 are each **fixed**. The fix brings no new Critical or Important finding. It brings two new Minor notes (n1, n2), and one Minor note lies outside the fix diff (n3). None of them blocks.

## The findings

**m1 — fixed** (`f8a2bbc4`). `tests/view/account-screen.test.mjs:564-622` adds one case. It checks:
- no button while the page asks;
- at the first refusal, one button reading „Spróbuj ponownie”, enabled, holding the focus;
- after `press`, the same element by identity, reading „Sprawdzanie…” and disabled;
- after `currentAccount` succeeds and `loadSavedGame` is refused, the same element again, reading „Spróbuj ponownie”, enabled, with the focus back on it.

Every expected value is written out. The assertions read what the player gets: the button's identity, its text, its disabled state and the focus. None reads the code's detail, such as `focusRetry` or the slot of the fragment. A correct implementation that kept one button and moved focus at each refusal passes, and one that did either differently fails.

The fix agent's mutation logs (`reports/fix-1-logs/m1-mut-*.log`) show the case failing on each of the three ways it guards against: focus never moved, the button remounted, and focus moved only at the first refusal. Each log shows 1 failure, with the matching message. The jsdom harness moves focus off a disabled control, so the focus assertions have force. See n1 for the case's comment.

**m2 — fixed** (`8b8709f0`, `c5583a04`, `8bdd5273`). Two of the four transitions altered behaviour, and each now has a case.
- *Change 3*, `tests/view/previous-save.test.mjs:1490-1531`, one case for each of the file's `HELD_OUTCOMES` (conflict, signed-out). The old game's logout is pressed and the reset confirmed. The logout's save is answered, so its `logout` request waits (precondition). The reset's 204 builds the new game (precondition: `["Program"]`). „Nowy program” makes the new game save (precondition: one `saveGame`). That save is answered with the outcome. Then the outcome acts at once: one `loadSavedGame` for the conflict (D-209), „Sesja wygasła” for the missing session (D-211). The old logout still waits.
  This holds the behaviour D-402 gives: only the old game's outcomes are held while the reset waits, so the new game's act. It holds no detail of where the page keeps the held outcome. The mutation log `m2-3-mut.log` shows both cases failing under a page-level "logout under way" guard, the old shape.
- *Change 2*, `tests/view/uncaught-failure.test.mjs:853-899`. A privileged account at `#/programy` confirms „Zacznij od zera”, and the reset waits (precondition: `["resetSavedGame"]`, the game standing). Then the error comes and the reset is answered with 204. The case asserts, with values written out:
  - through the file's `assertWaitingWithSentence`: one sentence, in the header; the waiting screen shown, with no text and no button; no card, no game; no interval left;
  - no „Konto” in the bar (D-280: the name alone on a waiting screen);
  - no call waits;
  - after 60 s of the clock, still no call.

  The mutation log `m2-2-mut2.log` shows the case failing when the old game is left standing. The quotations of D-402, D-323 and D-280 begin sentences of those decisions; the foundation check accepts them (exit 0). See n2 on the ground of "nothing is saved".
- Changes 1 and 4 needed no case, as the finding said. They stay untouched.

**m3 — fixed** (`ce4b4a38`). `src/browser/styles.css:429` now reads "The React button carries the class." That is true at the head, and only the comment changed.

**m4 — fixed** (`f89dbd09`). `guidelines/coding-browser-module.md:197-203` now says the page sets up the header and the main, each root's factory sets up its host, and `createFailureCard` in `src/browser/view/account-card.tsx` builds the panel. `:350-354` says the same in the example. Both agree with the code: `app.ts:253`, `:264`; `waiting-screen.tsx:92`; `page-sentences.tsx:85`; `header-rows.tsx:35`, `:72`; `menu-bar.tsx:335`; `account-card.tsx:674-683`. No meaning beyond the task's is added, and the rule's *Decision* and the table of files are unchanged.

**The *Good* line at `guidelines/coding-browser-module.md:194`** ("strona buduje przez API DOM tylko miejsca, w których montują się korzenie, i panel w miejscu zdjętej karty"): it needs no change for m4 to count as fixed. The finding's harm was a sentence that sends the reader to `app.ts` for the panel and the hosts. The *Good* line names no file. It is a short example of compliance, and the body of the rule right under it now says which code builds what. If it is touched later, "strona i fabryki jej korzeni budują …" would match the body. I raise no finding.

## New in the fix diff (Minor; none blocks)

**n1 — The m1 case's comment points to the task, a document outside the foundation, and the focus it holds has no foundation entry.** Place: `tests/view/account-screen.test.mjs:570`, "// To do 2 of the task: the player sees the same texts, roles, places and focus as before the change." `guidelines/testing.md:100-101` says: "Komentarz testu nie wskazuje dokumentu spoza fundamentu" (a test comment points to no document outside the foundation). The same section says a requirement a test needs, and the foundation does not yet carry, goes to the foundation first. The two decisions the case quotes, D-262 (where the warning with „Spróbuj ponownie” stands) and D-44 (a waiting control is disabled), do not say that focus goes to „Spróbuj ponownie” at each refusal. Spec Decision 3 says it, and the spec is no foundation entry. Effect: the case's focus assertions rest on a source a later reader cannot reach. Fix, in the return step: a precision of D-262 or D-96 through `the-way-record-decision` ("at each refusal the focus moves to „Spróbuj ponownie”"), quoted by the case; drop the comment line.

**n2 — "Nothing is saved after a reset that succeeds after the error" is derived from two decisions, not stated by either.** Place: `tests/view/uncaught-failure.test.mjs:893-897` (no call waits; a minute of the clock sends nothing) and the `intervals.size === 0` of `assertWaitingWithSentence`. D-323 says that after the error "saving goes on as D-207, D-208 and D-97 give it". D-402 says that on 204 "the page replaces the game"; D-323 says the page "builds no game". Together they give the case's expectation: the game is replaced by none, so its saving ends. That is how I judged the transition in the review of the whole change. Read alone, though, D-323's "saving goes on" says the opposite, and the case quotes it. The expectation is sound, but no entry states it. Fix, in the return step: one clause in D-323 or D-402, for instance "a reset that succeeds after the error closes the game and builds none", quoted by the case.

## Outside the fix diff (Minor note; does not reopen the review)

**n3 — `tests/view/uncaught-failure.test.mjs:765`** ("(To do 4 of the task)" in the comment of `assertWaitingWithSentence`, from slice 8 `efbe8ff8`) points to the task as n1 does. Here the decision is recorded (D-323 now holds the sentence), so dropping the parenthesis is enough. I missed it in the review of the whole change.

## Checks run (from the root of the reviewed worktree)

| Check | Command | Result |
|---|---|---|
| head | `git rev-parse HEAD` | `f89dbd09…`, as given |
| account screen | `npm test -- tests/view/account-screen.test.mjs` | exit 0, 132 pass |
| previous save | `npm test -- tests/view/previous-save.test.mjs` | exit 0, 46 pass |
| uncaught failure | `npm test -- tests/view/uncaught-failure.test.mjs` | exit 0, 19 pass |
| types | `npm run typecheck` | exit 0 |
| lint | `npx eslint tests/view/account-screen.test.mjs tests/view/previous-save.test.mjs tests/view/uncaught-failure.test.mjs` | exit 0 |
| format | `npx prettier --check` on the three test files, `src/browser/styles.css`, `guidelines/coding-browser-module.md` | exit 0 |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | exit 0, `0 error, 138 warn, 7 info` (same counts as at the whole review) |
| mutation evidence | read `reports/fix-1-logs/*.log` | each guarded mutation fails its case with the expected message |

Not run: my own mutations; the fix agent's five logs stand as evidence and agree with the assertions I read. Not run either: the whole `npm test`, which is the orchestrator's.

## Reaches beyond the dispatch

- `tests/view/previous-save.test.mjs:1282-1330` (`HELD_OUTCOMES` and its cases) and `tests/view/uncaught-failure.test.mjs:46-48`, `:760-798` (the timers of `onPage`, `assertWaitingWithSentence`): to read what the new cases assert through their helpers.
- `guidelines/testing.md:80-152` (the rules on where an expected value comes from and on behaviour): for n1 and n2.

## Working copies

- `.runs/review-fix-1/` held the logs of the checks; removed before returning. The reviewed worktree is unchanged (`git status --short` empty).

## Unread material

- The fix report, the findings file's heading and the whole fix diff: read whole. The mutation logs: read their summary and failure lines.
- Decisions: none opened whole for this review. D-262, D-44, D-402, D-323, D-280, D-209 and D-211 were read through the quotations in the cases and my index of the whole review.
- `guidelines/testing.md`: lines 41-152 and 295-349, as in the whole review; the rest not read. `guidelines/coding-browser-module.md`: lines 190-205 and the changed lines.

## Searches not found or unclear

- A foundation entry stating that focus goes to „Spróbuj ponownie” at each refusal: none found (n1).
- A foundation entry stating that a reset succeeding after the error closes the game and saves nothing more: none found (n2).
