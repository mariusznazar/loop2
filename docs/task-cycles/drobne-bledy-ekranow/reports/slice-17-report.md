# Slice 17 report: a click outside the menu „Konto”

## Status

`done with concerns`. The change is made and committed; both focused checks, eslint, prettier and the
browser check pass. One question for the orchestrator is open (see "Questions and concerns", item 1).

## Commits

- `2d62c5d2` fix: :bug: a click outside the menu Konto leaves the focus where it lands, and goes to Konto only where it lands on nothing
- Range of this slice: `1130a9be..2d62c5d2` (one commit).

## Files changed

- `src/browser/view/menu-bar.tsx`: +12 / -1. In the document `click` listener of the open menu's Effect, the
  call `close()` (which always focused „Konto”) is replaced by `setOpen(false)` and a focus rule read after the
  click: „Konto” gets the focus only where the focus is on the body, on nothing, or on a control of the menu.
  Otherwise the focus stays where the click put it. The Effect with its cleanup and its dependency list
  `[open]` stay as they were (D-267).
- `tests/view/menu-bar.test.mjs`: +23 / -5. The test "a click outside the menu closes it and focus lands on
  „Konto”" is re-written to the new behaviour of D-285 and renamed "a click outside the menu closes it; focus
  stays where the player clicked, and on a bare background it lands on „Konto”". Its decision line now quotes
  the sentence of D-285 about the focus. Its three cases: a click on a field leaves the caret in the field; a click
  on a bare background with focus on a control of the menu lands on „Konto”; a click on a bare background with
  focus on the body lands on „Konto”.

No foundation file, guideline or styleguide file was changed: rows 6 and 7 were already committed before the base.

## Checks

Commands run from the worktree root. Logs kept in `reports/` with prefix `slice-17-`.

1. Failing run first, on the unchanged component: `npm test -- tests/view/menu-bar.test.mjs`, exit **1**.
   Failing case: "a click outside the menu closes it; focus stays where the player clicked, and on a bare background it lands on „Konto”",
   with `a click on a field leaves the caret in it: expected <input>, got <button class="button">`.
   The two other cases of the test were not reached; the background cases already held under the old code
   (the old code always focused „Konto”), so only the field case was seen failing. Log: `reports/slice-17-menu-bar-red.log`.
2. `npm test -- tests/view/menu-bar.test.mjs` after the change, exit **0**: 32 pass, 0 fail. Log: `reports/slice-17-menu-bar-green.log`.
3. `npm test -- tests/view/account-screen.test.mjs`, exit **0**: 133 pass, 0 fail. Log: `reports/slice-17-account-screen.log`.
4. `npx eslint src/browser/view/menu-bar.tsx`, exit **0**. Log: `reports/slice-17-eslint.log`.
5. `npx prettier --check src/browser/view/menu-bar.tsx tests/view/menu-bar.test.mjs`, exit **0**
   ("All matched files use Prettier code style!"). Log: `reports/slice-17-prettier.log`.
6. Real browser (the check of `.claude/skills/loop2-play/SKILL.md`, Playwright CLI 0.1.22, `npm run local`
   with the game at `https://127.0.0.1:60968`, a made-up account at `fokus.a@example.test`). Each step checked
   with `playwright-cli eval` on `document.activeElement` and on the open state of the menu:
   - A. Menu open, click on the field „Imię nowej postaci” outside it: menu closed, focus in the INPUT; typing
     "Ala" went into the field (value read back "Ala"). Pass.
   - B. Menu open, click on the bar's name „Loop” (a bare background): menu closed, focus on „Konto”. Pass.
   - B'. Menu open, click on the heading „Siedziba” (inside the screen): menu closed; focus went to the screen's
     own host `headquarters-host` (`tabindex="-1"`), which takes focus on a click. This matches D-285, since
     that place takes focus, and the focus stays there. Not a fault, but noted.
   - C. Menu open, Tab moved focus to „Wyślij ponownie” inside the menu, then click on „Loop”: menu closed, focus
     on „Konto”. Pass.
   - D. Escape with the menu open: menu closed, focus on „Konto”. Second click on „Konto” closed the menu again
     with focus on „Konto”. Pass.
   Browser closed (`playwright-cli close`, exit 0). Local game stopped (`npm run local:stop`, exit 0,
   "Local starts stopped: 1"). The CLI's working folder `.playwright-cli/` in the worktree was deleted.
   No screenshot was taken, so no D-418/D-419 address exists for this slice.
7. Not run, as the handoff asks: the full suite; `foundation_check.py`, which is not in this slice's *Checks*.
8. Mutations: not run. Reasoned: removing the `setOpen(false)` breaks the field case (menu stays open);
   removing the `inside.contains(focused)` clause breaks the background-with-menu-focus case (focus stays on a
   hidden control); removing the `focused === document.body` clause breaks the body case (focus on nothing).

## Own-work check

Requirement most likely not met: the first click into a text field outside the open menu must put the caret
in the field, and a click on a place that takes no focus must not leave focus on a hidden menu element. The jsdom
test cannot show mousedown focus by itself (`press` only fires `click`), so the test calls `focus()` before the
click, as a browser does; the real check is the browser run. Check: step 6 A, B, C, D. Result: all pass; the
caret took typing; focus never stayed on a hidden element. The jsdom case "focus stays in the menu" was run once,
against the new code, and passed (32/32).

## Questions and concerns

1. **Question (test of a click on a bar item, not changed):** the test "a click on an item of the bar, which stands
   outside the menu, closes it" asserts that focus is on „Konto” after a click on a link of the bar. In a real
   browser a link takes the focus on a click, so under D-285 the focus would stay on the link. The test passes
   only because jsdom does not move focus on click and the new rule sends the focus to „Konto” from the body.
   The handoff named only the one test, so I did not change it. Recommendation: re-model that case as the
   browser does (focus the link before the click) and assert the link has the focus. Cost if left: the test pins a
   jsdom artifact, and a later change in link focus passes unnoticed.
2. **Choice:** the focus rule reads `document.activeElement` in the click listener, after the browser has moved
   the focus, and leaves the focus where it is except on the body, on nothing, or on the menu. Rejected: a
   `mousedown` listener (the browser has not yet moved the focus at that point, and the decision names the click);
   a deferred `setTimeout` focus (a visible jump). Cost if wrong: low, one function.
3. **Concern:** a click on a heading inside a screen moves focus to that screen's host (`tabindex="-1"`), not to
   „Konto”. Under D-285 this is correct (the place takes focus). Worth knowing for a reviewer who reads "a bare
   background" more widely.

## Unread material

- `foundations/invariants.md:1188-1197` (`document-test-memory-limit`): named by the handoff's Read list, not opened.
  The test file already imports `tests/view/page-document.mjs` first, so the case is unchanged.
- `task.md`: the passages were used as the handoff quotes them word for word; the file itself was not opened.
- `foundations/part_map.md`, `foundations/glossary.md`: not opened; not named in the handoff's *Read*.
- Read whole: `guidelines/coding.md`, `guidelines/testing.md` (two reads, lines 1-487),
  `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` (two reads, lines 1-1144),
  `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, `.the-way/task-cycle/change/SKILL.md`,
  `slice.md`, `ui_check.md`, `src/browser/view/menu-bar.tsx`, `tests/view/menu-bar.test.mjs`; decisions D-285
  (4420-4459), D-280 (4272-4341), D-267 (4181-4209), D-47 (4795-4809), D-420 (1551-1565); the styleguide's "Menu
  bar, the menu „Konto” and the list of programs" section (lines 554-624) with its row 7 sentence.

## Searches not found or unclear

- none. The one unclear wording, "where that place takes no focus", was settled by the body-or-menu rule and
  checked in the browser (step 6 B2).

## Reaches beyond the handoff

- `tests/view/page-document.mjs` lines 1-135, to read how `press` and `focus` behave in the jsdom page.
- `npm test -- <file>` and `npm run local` both run `npm run build` first; that is the product's own build.
- A Glob for `ui_check.md` in `.the-way/task-cycle/change/` (the method names it; found there).

## Working copies

- `.runs/slice-17/`: my directory for logs and browser outputs. Its kept logs were moved to
  `reports/slice-17-*.log`; the directory was removed.
- `.playwright-cli/` in the worktree (the CLI's working folder): removed.
- No worktree or clone was made.
- Not my copies, left in place: `.runs/local-start/` (the local start's database, which the loop2-play skill says
  stays until the next start) and `dist/` (the build output of `npm test`/`npm run local`).
