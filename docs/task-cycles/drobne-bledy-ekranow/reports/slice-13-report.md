# Slice 13 report — a long name in the team row of Siedziba

**Status:** done with concerns

**Concern in one line:** at 1280 × 720 a 40-letter name fits its row even without the fix; the fault shows only in windows narrower than about 363 px (see "Concerns").

## Commits

- `69a42675` — `fix: :bug: break a long name with no space inside its row of the team of Siedziba, so it does not run out of the row` (branch `task/drobne-bledy-ekranow`, on top of base `798c278a`).

## Files changed

- `src/browser/headquarters.css`: +5 −0. The rule `.team-member-name` gets `min-width: 0` and `overflow-wrap: anywhere`, with a comment naming the styleguide rule "A name typed by the player breaks in its row". No colour, length, font or unitless value is written, so the token invariant is not touched.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Formatting of the changed file | `npx prettier --check src/browser/headquarters.css` | 0 | All matched files use Prettier code style |
| Token-values invariant test (focused) | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| Siedziba screen test (focused) | `npm test -- tests/view/headquarters-screen.test.mjs` | 0 | 26 pass, 0 fail |
| Lint | `npx eslint` | not run | No `.ts` or `.tsx` file changed |
| Browser check | `npm run local` in the worktree, Playwright CLI, then `npm run local:stop` | start and stop both ran | Local game on `https://127.0.0.1:60690`; `local:stop` reported 1 start stopped |

Not run: the full suite (the handoff forbids it, the orchestrator runs it). The invariant test was run passing only; it was not seen failing, because this change adds no value that the test reads (the new values are `0` and a keyword, both exempt under D-43).

Logs kept in this directory:
- `slice-13-invariant-test.log`
- `slice-13-headquarters-screen-test.log`
- `slice-13-local-start.log`
- `slice-13-browser-console.log` (two entries, both expected: a 401 for the account request before sign-in and a 404 for the favicon)

## Own-work check

**Requirement (from the task, slice 13 Goal):** a character named by 40 letters with no space breaks inside its row of "Drużyna" and does not run out of the row, at 1280 × 720 and in a narrower window.

**Check:** in Chromium, a character "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN" (40 letters, no space) was created through the login card and "Drużyna" on Siedziba. The name box, the row (`.team-member`) and the document scroll width were read with `getBoundingClientRect` and `scrollWidth`, at each window width. The old behaviour was reproduced by injecting `.team-member-name{min-width:auto !important; overflow-wrap:normal !important}` after a reload; the fix was then measured after a reload with no injection.

| Window | Old rule | With the fix |
|---|---|---|
| 1280 | name right 330 px, row right 1247 px, doc width 1280: fits | same, fits |
| 340 | name right 330 px, row right 330 px, doc width 347 > 340: runs out | name 2 lines (height 36 px), right 307 px = row right, doc width 340: breaks |
| 300 | name right 330 px, doc width 347 > 300: runs out | name 2 lines, right 267 px, doc width 300: breaks |
| 260 | name right 330 px, doc width 347 > 260: runs out | name 2 lines, right 228 px, doc width 260: breaks |

The check caught the fault (old rule, narrow window: overflow) and passes with the fix. Run once each, no rerun needed; no check failed and then passed.

**Screenshots (D-418, D-419):** shown to the human, pushed by the agent with the `gh` account of the owner, to `mariusznazar/screenshots`, branch `loop2/drobne-bledy-ekranow`, commit `4ad23d691a4e16f04ab5ea48146bfd42f295ae78`, directory `loop2/drobne-bledy-ekranow/`:
- 1280 × 720, the row with the 40-letter name on one line: `https://github.com/mariusznazar/screenshots/blob/4ad23d691a4e16f04ab5ea48146bfd42f295ae78/loop2/drobne-bledy-ekranow/slice-13-siedziba-1280.png?raw=true`
- 300 px wide, the name broken into two lines inside the row: `https://github.com/mariusznazar/screenshots/blob/4ad23d691a4e16f04ab5ea48146bfd42f295ae78/loop2/drobne-bledy-ekranow/slice-13-siedziba-300.png?raw=true`

Embed for the request:

```text
![Siedziba at 1280 x 720: a 40-letter name on one line in the team row](https://github.com/mariusznazar/screenshots/blob/4ad23d691a4e16f04ab5ea48146bfd42f295ae78/loop2/drobne-bledy-ekranow/slice-13-siedziba-1280.png?raw=true)
![Siedziba at 300 px wide: a 40-letter name broken into two lines inside the team row](https://github.com/mariusznazar/screenshots/blob/4ad23d691a4e16f04ab5ea48146bfd42f295ae78/loop2/drobne-bledy-ekranow/slice-13-siedziba-300.png?raw=true)
```

Both screenshots were looked at before the push: they show only the made-up account name "abcdef…", no address, password or token.

The push went onto a branch that already existed on the remote at `492a82d` (an earlier check of this cycle); the new commit sits on top of it. Tool note: the clone of the screenshots repo was placed in my working-copy directory, not in `.runs/screenshots`, as the cycle's rule on working copies asks.

## Concerns and questions

1. **The fault does not show at 1280 × 720 with a 40-letter name.** The name box is about 297 px wide and the row is about 1214 px, so the old rule also fits at 1280. The fault appears only when the content width is below about 297 px, a window narrower than about 363 px. D-396 names 1280 × 720 as the smallest supported window, so the reproduced fault lies below the supported minimum. The fix stays in scope because the styleguide rule of row 13 ("A name typed by the player breaks in its row") is general and not tied to a window size. Recommendation: accept the fix as is. If a before/after at 1280 × 720 is required, a name of about 160 letters without a space is needed to reproduce the overflow there; I did not run that, to keep to the slice.
2. **Playwright CLI as the way in:** used as in `loop2-play`; the tool's working folder `.playwright-cli/` was deleted after the check. The screenshot files it wrote were copied to the screenshots clone and the originals removed.

## Unread material

- `.runs/task-cycles/drobne-bledy-ekranow/task.md`: not opened; the passages (lines 26, 194–195, 208) were used as the handoff gives them word for word.
- `foundations/decisions.md` D-52 (5770–5795), D-421 (4588–4602), D-43 (4735–4749), D-396 (5159–5173), D-417 to D-420 (1455–1565): read at the current ranges the handoff gives; D-52 and D-396 read in full ranges, the others read in full.
- `foundations/invariants.md` `browser-view-token-values` (458–467): read in part (458–469).
- `src/browser/view/headquarters.tsx`: read in part (160–229, the team member and the creation component), not whole; I changed no TypeScript file.
- `guidelines/testing.md`: not read; I wrote no test.
- `foundations/part_map.md`, `src/browser/tokens.css`: not read; not named by the handoff for this change, and no token was added.
- `guidelines/styleguide-browser-view.md`, `guidelines/coding.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/SKILL.md` and `slice.md`, `ui_check.md`, `.claude/skills/loop2-play/SKILL.md`, `src/browser/headquarters.css`: read whole.

## Searches not found or unclear

- None for the content of the task.
- The loop2-play skill names `.runs/screenshots` for the clone; the cycle's rule on working copies puts it in the agent's own directory. I followed the cycle's rule; the clone is removed.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/SKILL.md` and `slice.md` were read to find the method, which the handoff names.
- `git config` was not inspected; the commit was made with the repository's configured author.
- The `npm run local` start ran `npm run build`, which writes the product's build output (`dist/`), ignored by git.

## Working copies

- `.runs/slice-13/` (my directory): created; contained the screenshots clone `.runs/slice-13/screenshots` and the check logs. The clone was removed (`rm -rf`), the logs moved to `reports/` as listed above, and the directory itself removed. No worktree was made. Nothing remains.
- `.playwright-cli/` in the worktree (the Playwright CLI's own folder, with the two screenshots and the page snapshots): removed.
- `.runs/task-cycles/drobne-bledy-ekranow/reports/` holds this report and the kept logs, named `slice-13-*`.
