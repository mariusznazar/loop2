# Slice 14 report — the focus after „Zatrzymaj”

## Status

`done with concerns`

Concerns are listed at the end: the browser check ran only after the fix (no before-fix run in the browser), and the rule that the focus must not fall to the page is checked in jsdom by a red run, not by a red run in the real browser.

## Commits

- `90967593` — `fix: :bug: move the focus of a stopped earning loop to the character's name, not to the page`
  (base `69a42675`; my range is `69a42675..90967593`, one commit).

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/character-screen.tsx` | 13 | 2 |
| `src/browser/view/headquarters.tsx` | 14 | 2 |
| `tests/view/character-screen.test.mjs` | 48 | 0 |
| `tests/view/headquarters-screen.test.mjs` | 48 | 0 |

`maps-screen.tsx` and its test are unchanged, as the plan asks.

## What changed

- `headquarters.tsx`, `TeamMember`: the name link gets a ref, and the „Zatrzymaj” button gets a ref. The click calls `onStop`, then, only if the button's ref is now `null` (the stop removed it), focuses the name link. A refused stop leaves the button and its focus where they stood.
- `character-screen.tsx`, `CharacterView`: the heading `h2.character-screen-name` gets `tabIndex={-1}` and a ref. The hooks sit before the early `return null`, as D-267 requires. The same click rule as above moves focus to the heading.
- Tests added (written first, seen failing, then made to pass):
  - `tests/view/headquarters-screen.test.mjs`: „after „Zatrzymaj” the focus stands on the name of that character once its loop has stopped”; „a stop the page refuses leaves the focus on „Zatrzymaj””.
  - `tests/view/character-screen.test.mjs`: „after „Zatrzymaj” the focus stands on the character's name once its loop has stopped”; „a stop the page refuses leaves the focus on „Zatrzymaj””.

## Choices made

- **Focus target = the character's name.** The name is the element that stands in both places (Siedziba row and screen Postać). On Siedziba it is already a focusable link. On Postać it is a heading that gets `tabIndex={-1}`, as the „Drużyna” heading already does for „Zamknij”. Rejected: focusing the stopped-loop line `p`, which would need a `tabIndex` too and has no fixed place once the line changes. Cost if wrong: the focus lands on the name instead of the line; one-line change.
- **Focus moved in the click handler, not in an effect.** The handler checks the button's ref right after `onStop`. This relies on the page applying the stop synchronously (the store's `act` and `flushSync` in the screen's `update`). The existing `takePractice` in `headquarters.tsx` relies on the same thing. Rejected: an owed-focus effect like `maps-screen.tsx` (`OwedFocus`). It would be safer if the page ever applied the stop later, but it adds state for a case that does not occur now. Cost if wrong: after an asynchronous stop, the focus would fall to the page. The browser check below shows the synchronous path works.
- **Rejected: `focusIfLost` of the screen registry.** It runs only on a hash change, not after a stop, so it would not catch this case.

## Checks

All commands run in `.`. Each `npm test -- <file>` also runs the build first. Logs are in `.runs/task-cycles/drobne-bledy-ekranow/reports/` with the prefix `slice-14-`.

| # | Command | Exit | Result | Log |
|---|---|---|---|---|
| 1 | `npm test -- tests/view/character-screen.test.mjs` (new cases before the fix) | 1 | Red as expected: `expected <h2 class="character-screen-name">, got <body>` | `slice-14-red-character.log` |
| 2 | `npm test -- tests/view/headquarters-screen.test.mjs` (new case before the fix) | 1 | Red as expected: `expected <a class="team-member-name">, got <body>`; 27 passed, 1 failed | `slice-14-red-headquarters.log` |
| 3 | `npm test -- tests/view/headquarters-screen.test.mjs` (after the fix) | 0 | 28 pass, 0 fail | `slice-14-green-headquarters-screen.log` |
| 4 | `npm test -- tests/view/character-screen.test.mjs` (after the fix) | 0 | 9 pass, 0 fail | `slice-14-green-character-screen.log` |
| 5 | `npm test -- tests/view/maps-screen.test.mjs` (after the fix) | 0 | 21 pass, 0 fail | `slice-14-green-maps-screen.log` |
| 6 | `npx eslint src/browser/view/headquarters.tsx src/browser/view/character-screen.tsx` | 0 | clean | `slice-14-eslint.log` |
| 7 | `npx prettier --check` on the four changed files | 1 | `tests/view/character-screen.test.mjs` had one line to reflow | `slice-14-prettier.log` |
| 8 | `npx prettier --write tests/view/character-screen.test.mjs` | 0 | one line reflowed, no other change | — |
| 9 | `npx prettier --check` on the four changed files (again) | 0 | all formatted | `slice-14-prettier2.log` |
| 10 | `npx eslint` on the two `.tsx` files (again, after the reflow) | 0 | clean | `slice-14-eslint2.log` |
| 11 | `npm test -- tests/view/character-screen.test.mjs` (after the reflow) | 0 | 9 pass, 0 fail | `slice-14-green2-character-screen.log` |
| 12 | Browser check, D-88 (see below) | — | focus correct on both screens, no console errors | — |
| 13 | `npm run local:stop` | 0 | "Local starts stopped: 1" | — |

Not run, on purpose: the full suite (`npm test` with no file), `foundation_check.py` and `check_instructions.py`. The handoff reserves the full gate for the orchestrator.

### Browser check (D-88, loop2-play skill)

- `npm run local` gave `https://127.0.0.1:57077`. I opened it with Playwright CLI 0.1.22, signed up with a made-up address at `example.test` (the mail step failed as the skill expects), created „Ala”, which the game renamed to „Agent” through the composed save.
- The map „Skraj lasu” is not solved in a new game, so „Puść w pętlę” does not show. I made a copy of `.claude/skills/loop2-play/compose-state.mjs` in my directory with one extra line that adds `forestEdge` to `solvedMaps`, ran it, and sent the document with the skill's `PUT /api/saved-game` step (answer `200 {"revision":2}`).
- Siedziba: „Puść w pętlę” on the map card started the loop (line „Pętla: Skraj lasu · przejście 1 · minuta 0 · domknięte 0”). On Siedziba I pressed „Zatrzymaj: Agent”. The focused element was `A | team-member-name | Agent`, and the stopped line read „Pętla zatrzymana”.
- Screen Postać (`#/postac/1`): I started the loop again from the map card, opened the screen, pressed „Zatrzymaj: Agent”. The focused element was `H2 | character-screen-name | Agent`, the stopped line read „Pętla zatrzymana”, and the loop line was gone.
- Console: `playwright-cli console error` reported 0 errors and 0 warnings.
- No screenshot was taken or shown, so D-418 and D-419 do not apply and nothing was pushed to `mariusznazar/screenshots`. The change adds no visual difference; the evidence is the focus values above.

## Own-work check (section 3 of make-change)

- **Requirement most likely not met:** after „Zatrzymaj”, the keyboard's focus stays in that character's place on both screens and does not fall to the page (plan Slice 14; styleguide rule "Focus does not fall to the page"; To do 5).
- **Check that would catch it:** the new cases in both view test files (the stop removes the button, then the focus must be on the name), plus the refusal case (the button stays, the focus stays on it), plus the browser run above.
- **What it showed:** before the fix, both focus cases failed with the focus on `<body>` (checks 1 and 2). After the fix, all cases pass (checks 3 to 5, 11), and the browser run shows the name in both places (step 12).
- **Mutation thought (not a tool run):** removing the `name.current?.focus()` line fails the two focus-after-stop cases; inverting the `stop.current === null` test fails the refusal cases. The two refusal cases exist for that reason.

## Reaches beyond the handoff

- `foundations/decisions.md` D-88 read (it is named in the test comments, and the browser check depends on it).
- `foundations/decisions.md` D-418 and D-419 read in full, through the loop2-play skill's screenshot section (the rules for screenshots; no screenshot shown).
- `.the-way/task-cycle/change/ui_check.md` read in full (the method names it for a change that alters what a screen shows; this change alters only focus).
- `a note in the author's private notes` and `...\rules\git.md` read because my instructions require them before a script and before a commit. The first `git commit` call was blocked by a hook until I had read `git.md`; I then repeated the same commit unchanged.
- `.claude/skills/loop2-play/compose-state.mjs` read; a copy with one extra line was run from `.runs/slice-14/` (removed afterwards).
- `src/browser/view/screen-registry.ts` (`focusIfLost`, `focusShown`) and `src/browser/view/character-entry.ts`, `headquarters-entry.ts` read, to see how focus and the page's `update` calls are wired.
- `tests/view/page-document.mjs` read at the `press`, `withPage` and `inAct` helpers.

## Unread material

Every file, entry and passage the handoff names was read (the decisions at the handoff's ranges, the rows of Slice 14, the styleguide's whole text, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md` (in two reads), `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, the glossary terms, the invariant `document-test-memory-limit`, and the maps screen ranges).

Not read: `foundations/decisions.md` D-417 (only referenced by D-420 and by the play skill; the handoff does not name it).

## Searches not found or unclear

- Whether jsdom sets `document.activeElement` to `body` when a focused button is removed. The red run showed `<body>`, which is enough for the test; I did not look up the jsdom source.
- Whether the page applies a stop synchronously. The code of `headquarters-entry.ts` and `state-store.ts` uses `store.act` and `flushSync` as the `takePractice` path does; I confirmed the effect in the real browser, not by reading `state-store.ts` line by line.
- Nothing else was not found.

## Questions and concerns

1. **Concern (not a blocker):** the browser check was run only after the fix. The red run is a jsdom run. A before-fix browser run would show the focus on the body in the real game; I did not run one.
2. **Concern:** the fix assumes a synchronous stop (see Choices). If a later change makes the page apply stops asynchronously, the focus will fall to the page again, and only a browser check would show it.
3. **Question for the orchestrator:** the maps screen's „Zatrzymaj” in „Kto idzie” already moves focus to „Wejdź” through `OwedFocus`. That is unchanged, as the plan says. I did not check it in the browser. Say if you want that checked here too.
4. No question blocks the commit.

## Working copies

- `.runs/slice-14/` — my directory: logs, the composed-state copy, the send script and the state document. Its logs worth keeping are copied to `reports/` with the `slice-14-` prefix; the directory was removed (`rm -rf`), and `ls` confirmed it is gone.
- `.playwright-cli/` — the Playwright CLI session's snapshots and logs (no screenshot). Removed; `ls` confirmed it is gone.
- `.runs/local-start/` — the database of the local start. Not removed: the loop2-play skill says it stays until the next start and is no leftover to clean up. It lies under the ignored `.runs/`.
- No git worktree, clone or other copy was made.
