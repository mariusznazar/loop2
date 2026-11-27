# Correction 1, part C — the row „Teraz” at 360 px (task rana-i-opatrunek)

**Status: done. CHANGED** — the fix was a few lines of CSS, so it is made (not left for the request).

Commit: `26c0209e8a9bb9b882fce390ab61b12300562059` (`fix: :bug: in the phone layout the row „Teraz” wraps …`), on `task/rana-i-opatrunek`, from `dbc931e8`. Not pushed.

## The remark (c), as made

> wiersz „Teraz” ucina „Wytwórz — Opatrunek” wielokropkiem przy 360 px — popraw, jeśli to kilka linii CSS (np. zawijanie zamiast wielokropka, bez zmiany szerokości sceny)

Made: in the phone layout the text of „Teraz” wraps inside the row's fixed height instead of being cut with an ellipsis. The width of the scene is untouched (remark (b) stands as the human settled it).

## The diff in words

Files (2, +11 −5 lines in all, comments included):

- `src/browser/run-screen.css`: in the existing block `@media (width < 1280px)` after `.now-row { height: var(--touch-target-min); }` one new rule, `.now-row .now-text { white-space: normal; }`. The row's rule `white-space: nowrap` stays for the computer layout and for „Potem”. The two comments that said the row cuts a longer text now say the phone layout wraps it inside its height (the comment of the block of the phone layout and a pointer in the comment of the rows).
- `src/browser/view/now-rows.tsx`: only the doc comment of the module (it said „Teraz” cuts a longer text): now it says the computer layout cuts and the phone layout wraps inside that height. No code change.

Why it is allowed by the decisions I read: D-334 binds „one height whatever it holds” and violates „growing by a line as its text changes, moving „Potem” and the body row down”; it nowhere says the row cuts. In the phone layout the row is already `--touch-target-min` (48 px, D-396) high and the text is 18.2 px a line, so two lines (36.4 px) stand inside the fixed height, centred by the row's flex. The row's height does not change, so nothing under it moves (measured below). D-335/D-336 (the row „Potem”, the click) are not touched; D-43 (no value in place of a token): no value written. The styleguide has no sentence about cutting or one line of this row; its rule „Two layouts and one threshold between them” asks the phone block to name D-396, stand after the computer rules and not touch them — it does (the block already existed with that comment). `guidelines/testing.md` says jsdom does not apply a block of the phone layout and the rule of the phone layout is checked by an agent in a browser, so no test is added (name of the break it would catch: none that jsdom sees).

Limit of the fix: it holds two lines. A text that would need three lines in the 114 px box (more than about 38 characters beside „reguła 1.1 · zostało 10 z 10 min”) would be clipped by the row's `overflow: hidden`, not given an ellipsis. No action sentence of the data is that long (the longest beside a right-hand text: „Wytwórz — Opatrunek”, 19 characters); checked by reading `src/browser/sim/data/actions.ts` labels and `now-lines.ts` texts, not by measuring every case.

## Numbers (phone layout 360 × 740, touch; state composed as the walk did: variant `practice`, character „Uczen”, the rule „Wytwórz — Opatrunek”, „zostało 10 z 10 min”)

| | before | after |
|---|---|---|
| `span.now-text` content / box width | 134 / 114 (cut) | 114 / 114 |
| `span.now-text` scroll height / box height | 18 / 18 | 36 / 36 (two lines, none lost) |
| `white-space` / `text-overflow` of it | nowrap / ellipsis | normal / ellipsis (no effect with wrap) |
| `.now-row` top / height | 498 / 48 | 498 / 48 |
| `.scene` width x height | 336 x 152 | 336 x 152 |
| `.scene-place` width | 342 | 342 |
| `.world-area` top / height / width | 342 / 603.5 / 318 | 342 / 603.5 / 318 |
| `.next-row` top / height | 550 / 48 | 550 / 48 |
| `.body-row` top / height | 602 / 127.2 | 602 / 127.2 |
| `.backpack-text` top / height | 729.2 / 18.2 | 729.2 / 18.2 |
| `.world-drawing` top / height | 759.4 / 164 | 759.4 / 164 |
| `.tile-line` top / height | 927.3 / 18.2 | 927.3 / 18.2 |

The whole of the measurement, children of `.world-area` included, is equal before and after (compared by a script: scene, scenePlace, worldArea, nowRow, worldChildren all `true`). Files: `correction-1c-before-360.json`, `correction-1c-after-360.json`, probe `correction-1c-row-measure.js` in this directory.

**1280 × 720 (computer layout, no touch), same state**: the full measurement with the old CSS (`git show HEAD:src/browser/run-screen.css` put into `dist/public/run-screen.css` for the probe, then restored) and with the new is byte-identical (`correction-1c-before-1280.json`, `correction-1c-after-1280.json`): `.now-text` 134 / 134, nowrap, `.now-row` 18.2 px high, `.scene` 672 x 304. The fix is in the phone block only, so this was expected.

**Measurement of the skill (phone layout, after)** (`correction-1c-phone-measure-after.json`): `scrollsToTheSide` false; `controlsSmallerThan48` empty; `outsideTheWindow` only the sprite sheet image; `contentWiderThanItsBox` only `div.world-area` 330 > 318 (item (b), older than this change, passed by the human) and `div.scene-sheet` (the drawing's sprite sheet in its frame). `span.now-text` no longer stands in the list (it did before).

## Screenshots (360 px, touch, made-up account at `example.test`, no personal data; state: the line „Teraz” holding „Wytwórz — Opatrunek” and „reguła 1.1 · zostało 10 z 10 min”)

Pushed to `mariusznazar/screenshots`, branch `loop2/rana-i-opatrunek`, directory `loop2/rana-i-opatrunek/`, commit `fc94fd3a7b8a7a13de78b3bd575bd5dff89c1c2a` (new commit on the branch, no force, not `main`):

- before: ![The row „Teraz” at 360 px before: „Wytwórz — Opatr…” cut with an ellipsis](https://github.com/mariusznazar/screenshots/blob/fc94fd3a7b8a7a13de78b3bd575bd5dff89c1c2a/loop2/rana-i-opatrunek/c1-teraz-before-360.png?raw=true)
- after: ![The row „Teraz” at 360 px after: „Wytwórz — Opatrunek” on two lines, whole](https://github.com/mariusznazar/screenshots/blob/fc94fd3a7b8a7a13de78b3bd575bd5dff89c1c2a/loop2/rana-i-opatrunek/c1-teraz-after-360.png?raw=true)

I looked at both: before shows „Wytwórz — Opatr…”, after shows „Wytwórz —” and „Opatrunek” on two lines inside the same row, with „Potem …” and the body row at the same places.

## Checks (command, exit code)

- `npm run typecheck` — 0 (a `.tsx` comment changed).
- `node_modules/.bin/prettier --check src/browser/run-screen.css src/browser/view/now-rows.tsx` — 0.
- `node_modules/.bin/eslint src/browser/view/now-rows.tsx` — 0.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — 0 (4 tests OK).
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — 0 (3 tests OK). These two are the invariant tests that read the stylesheets of the part.
- `npm test -- tests/view/world-area.test.mjs` — 0; `npm test -- tests/view/run-screen.test.mjs` — 0 (tests of the row's files).
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — 0 (0 errors).
- Not run: the whole suite (not mine to run, as the handoff says).
- Own-work check: the requirement most likely not met was „nothing under the row moves”; the check was the before/after comparison of every child of `.world-area` and of the scene's width (above): equal. A second one: that wrapping does not clip a letter: `scrollHeight` 36 = `clientHeight` 36 and content 114 = box 114.
- Walk of `walkthrough.md`: this is a correction (no walk required); the above is the look at the running game that the handoff asked for.

## Reach beyond the dispatch

None beyond what the handoff named. I read `guidelines/coding-browser-module.md`, `guidelines/testing.md` whole, and `guidelines/styleguide-browser-view.md` whole (in pieces); I did not read `guidelines/coding.md` (416 lines; the handoff's list did not name it, AGENTS.md names it for product code — see Unread).

## Choices (with the way rejected)

- Wrap (`white-space: normal`) for the row „Teraz” only. Rejected: the same for „Potem” too — its height is `min-height`, so a long text there would grow the row and move what is under it (D-335 asks a stable layout); it also was not in the remark and its text fitted. Cost if wrong: a long „Potem” text still ends with an ellipsis in one line.
- Wrap instead of a smaller text step or a wider scene: smaller step would need a new token (D-43, sourcing by the human); scene width is out of the remark.
- `-webkit-line-clamp` for a third line: rejected, more lines of CSS for a case no action reaches.

## Working copies

- Local game start (`npm run local`) and the Playwright session: stopped (`npm run local:stop`: „Local starts stopped: 1”; `playwright-cli close`).
- `.runs/correction-1c/` of the worktree (composed state, scripts, screenshots, clone of the screenshots repository `screenshots-clone/`) and `.playwright-cli/` of the worktree: removed by their paths. Kept here beside this report: the probe `correction-1c-row-measure.js` and the five measurement files named above.
- `dist/` of the worktree (the build output the start made; ignored by git) stays, rebuilt with the new CSS.

## Unread material

- `guidelines/coding.md` (416 lines): not read; the change is a CSS rule and two comment lines, and the handoff's list did not name it. `guidelines/testing.md`: read whole. `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`: read whole.
- Decisions D-334, D-335, D-336, D-396, D-43, D-418, D-419: each whole. No other decision's binding sentence speaks of the row, by searching `now-row`, `now-text`, `Teraz`, `cuts`, `ellips` in `guidelines/`, `src/browser/` and `tests/`.
- `.claude/skills/loop2-play/SKILL.md`: read the whole of it that I used (start, phone, measure, compose a state, screenshot, end); the owner-role and Playwright MCP parts were skimmed, not used.
- `reports/walk-report.md`: the side-observation 2 and its neighbours only.

## Searches not found or unclear

none. (One note: `playwright-cli run-code` with a bare `document` or `innerWidth` fails because the function runs in Node, not in the page; the probe uses `page.evaluate`.)
