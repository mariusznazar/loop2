done

# Report - slice 6, the skill loop2-play checks the phone layout

## Commits and files

- `ebe00ef2575f3f8e4137d8c8ac9f5470cba9c660` on `task/uklad-na-telefon` (base `628dfd7a`), not pushed.
- `.claude/skills/loop2-play/SKILL.md` +166 -4 and its byte-identical copy `.agents/skills/loop2-play/SKILL.md` +166 -4 (copied with `cp`; the test holds the identity).
- `.playwright/cli.phone.config.json` new, +10: `ignoreHTTPSErrors`, a viewport of 360 x 740, `hasTouch`, `isMobile`.

What the skill now holds (new section "Check the phone layout", before "Read the console"; the description and the paragraph on the working directory changed by one clause each):

- the CLI of this computer (0.1.22) has no command that taps and no switch for touch on `open`, but `open --config=<file>` takes the context options, so touch comes from `.playwright/cli.phone.config.json`; a tap is `page.locator('aria-ref=<ref>').tap()` or `page.getByRole(...).tap()` inside `run-code`;
- how to open it, check it (`width` 360, `touch` 1, `phone` true), why `click` is no tap (it reaches the page as pointer `mouse`);
- the measurement file `.playwright-cli/phone-measure.js`, written by a heredoc, run with `run-code --filename`: it prints `scrollsToTheSide` (scrollWidth against clientWidth of the page), `contentWiderThanItsBox` (every visible element whose `scrollWidth` exceeds its `clientWidth`: text over the border of its frame and a frame that scrolls to the side), `outsideTheWindow`, and `controlsSmallerThan48` (buttons, links, fields, cells, menu items, with their size; `const min = 48;` is changed for another size);
- another page area with `resize`; going back to 1280 x 720 px by `close` and a plain `open` (`resize 1280 720` alone keeps the touch);
- the Playwright MCP way, which takes no settings file: CDP `Emulation.setDeviceMetricsOverride` and `setTouchEmulationEnabled`, the tap as `Input.dispatchTouchEvent` (`page.tap` refuses there), and the way back.

## Checks (command, exit code)

- `npm test -- tests/agent_workflow/test_loop2_play_skill.py` - exit 0, 8 tests OK.
- `python -B .the-way/instruction-files/check_instructions.py` - exit 0, "0 error, 146 warn, 7 info". The warnings of the loop2-play files are dead-path warnings for working paths that exist only during a check (`.playwright-cli/`, `.playwright-cli/phone-measure.js`, `mariusznazar/screenshots`, ...), the same kind the file already had.
- The commands of the new section, run on `npm run local` (game at `https://127.0.0.1:57782` in my run; I extracted the heredoc from the committed SKILL.md with `sed` and ran that, so the file's text is what ran):
  - `playwright-cli open --config=.playwright/cli.phone.config.json <url>` printed "Browser `default` opened"; `eval` of width/height/touch/phone printed `{"width":360,"height":740,"touch":1,"phone":true}`. At the plain config: `{"width":1280,"height":720,"touch":0,"phone":false}`.
  - A pointer listener with `click e8` recorded `mouse`; `page.touchscreen.tap(180,400)` and `page.locator('aria-ref=e7').tap()` and `getByRole(...).tap()` each recorded `touch`.
  - `tap` of `aria-ref=e17` (the login button) printed `"https://127.0.0.1:57782/"` and signed in; the `getByRole('link', { name: 'Mapy', exact: true }).tap()` command printed `"https://127.0.0.1:57782/#/mapy"`; `page.touchscreen.tap(180, 400)` printed `"tapped"`.
  - `phone-measure.js` on the login card at 360: `{"page":"360 x 740","scrollsToTheSide":false,"contentWiderThanItsBox":[],"outsideTheWindow":[],"controlsSmallerThan48":["button.button \"Zaloguj się\" 81.3 x 24.2", ... "summary \"Autorzy grafiki\" 278 x 16.8"]}` (7 entries). On the map-run screen at 360 (route `#/postac/1/przejscie`, map Skraj lasu, "Minuta 5"): `scrollsToTheSide` false, `contentWiderThanItsBox` = `div.world-area ... content 298 > box 294` and `div.scene-sheet ... content 224 > box 56`, `outsideTheWindow` empty, 31 controls under 48 (menu items 24.2 high, buttons 22.8 high, the pace buttons 28-36 wide). So the measurement does catch a real overflow of the base code, which later slices fix.
  - `resize 1100 800` printed the code `page.setViewportSize({ width: 1100, height: 800 })`, then `{"w":1100,"h":800,"touch":1}`; the measurement at 1100 printed `"page":"1100 x 800"`; `resize 360 740` worked.
  - `playwright-cli close` then `playwright-cli open <url>` gave 1280 x 720, touch 0, `phone` false.
  - Playwright MCP (the tab opened from my own session, started in the worktree): the setup snippet printed `{"iw":360,"ih":740,"touch":1,"coarse":true}`; `page.tap` there failed with "The page does not support tap. Use hasTouch context option to enable touch support."; the two `Input.dispatchTouchEvent` calls gave pointer `touch` and pressed the button (`aria-pressed` "true"); the way-back snippet printed `{"iw":1280,"ih":720,"touch":0,"coarse":false}`; `browser_close` ended the tab.
- Not run: `npm test` with no argument (the boundary forbids it).

## Own-work check

- Requirement most likely unmet: "the slice tries each command it writes ... before it writes it", and the agents of later slices copying the text. Check: I wrote the commands first as tried, then after editing the text extracted the heredoc from the committed file and ran it, and ran the `open`, tap, resize and return commands in the form the file holds. Showed: all of the above printed as listed. Two things tried in a form that differs from the file by a detail: (a) the MCP tap snippet in the file taps the link "Mapy"; I tried it with the button "Zaloguj się" on a signed-out tab (same CDP calls, only the locator differs); (b) the "Open it as a phone" `eval` I ran as the file gives it.
- A first version of the measurement listed 60+ links of the closed "Autorzy grafiki" details (their rectangles exist); I changed `visible` to use `el.checkVisibility({ visibilityProperty: true })` and the list became 7 entries.

## Walkthrough

`walkthrough.md` of the method was not read: the change alters no behaviour a user sees in the running product (a text for agents and a settings file for the CLI).

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The phone settings file has `isMobile: true` beside `hasTouch` and the viewport 360 x 740 | `hasTouch` and viewport only | `isMobile` also makes the page behave as on a phone (meta viewport honoured); the page has the meta tag, so the width stayed 360 in the test; wrong where a later screen drops the tag: the page area would then be 980 px and the check shows it at once |
| The measurement is a heredoc written to `.playwright-cli/phone-measure.js` inside SKILL.md | a new file in the skill's directory; inline `eval` | the test `test_both_copies_hold_the_same_files` fixes the skill's file list to four files; an inline `eval` is too long to quote; wrong: the section grows (about 45 lines) |
| Tap through `run-code` with `aria-ref` or `getByRole` | `page.touchscreen.tap(x, y)` from snapshot positions | positions need a layout read first; the point tap stays in the text for a tile with no name |
| The section tells the agent to `close` before the phone `open` | reliance on `open` replacing the session (a second `open` without the config did give a 1280 x 720 page with touch 0 in my run, which looks like a replacement) | none known; I did not verify what `open` does to a running session, so the skill does not rely on it |
| Another page area with `resize` on the phone session; the way back by `close` and a plain `open` | `resize 1280 720` as the way back | `resize` keeps `hasTouch` and `(pointer: coarse)` true (observed), so it would not be the computer's mouse; wrong: a check at 1280 with the touch kept by mistake |

## Concerns and problems observed

- `controlsSmallerThan48` also lists links inside a sentence and `summary`; the section says the source cited in D-396 decides whether an inline link counts. The fact `android-touch-target-size` itself was not read (not named in the dispatch).
- The `scrollWidth > clientWidth` rule lists the scene's `div.scene-sheet` (224 > 56) on the base code; whether that is text over a border or a sprite sheet clipped by design is for the slices of the scene (Slice 9 and later); the skill says a line is a sign, not a verdict.
- The CLI printed an update notice (0.1.22 -> 0.1.25). I stayed on 0.1.22 and wrote the version in the skill ("version 0.1.22"); a later CLI may add a tap command, which would make that sentence stale.
- Slice 7 and the screen slices measure with `phone-measure.js`; it prints compact JSON on one line.
- Account for the browser: `agent@example.test` made on this start only.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` (the method's variant file) - read whole, as the method names it.
- The playwright-cli SKILL (`...\node_modules\@playwright\cli\node_modules\playwright-core\lib\tools\skills\playwright-cli\SKILL.md`, first 50 lines) and a grep of its `references/` for touch, tap, viewport, mobile, device - to find how the CLI emulates a phone. `playwright-cli --help` and `playwright-cli open --help` read whole.
- `src/browser/index.html` line 5 (meta viewport) by grep - to be sure `isMobile` leaves the width at 360.
- `the author's rule file "scripts" of the instruction set` and `git.md` (the hooks asked for them).

## Working copies and processes

- `.runs/slice-6/` (the game's log, an extract of the heredoc) at `.runs/slice-6` - removed.
- `.playwright-cli/` of the worktree (snapshots, console logs, `phone.png` screenshot of the map run at 360 which I looked at and did not keep, `phone-measure.js`) - removed. No screenshot is shown, none pushed.
- Processes: `npm run local` started by me, ended with `npm run local:stop` ("Local starts stopped: 1"); `playwright-cli` session closed; the Playwright MCP tab closed with `browser_close`. No other session's port or profile was met. `.playwright-mcp/` did not exist at the end.
- No worktree or clone made.

## Unread material

- `.the-way/task-cycle/change/walkthrough.md` - not read (see Walkthrough; the method names it for a change to what a user sees, and this slice has none).
- `.the-way/task-cycle/change/ui_check.md` - read whole; no screen is altered, so only its rule for the screenshot applied (I kept none).
- `foundations/decisions.md:5507-5521` D-396 and D-417 to D-420 - read whole. The fact `android-touch-target-size` and the plan beyond the passages in the handoff - not read (not named).
- `foundations/part_map.md:140-159` read (138-162). `.runs/task-cycles/uklad-na-telefon/task.md:28-41` read (lines 20-50).
- `.playwright/cli.config.json`, `tests/agent_workflow/test_loop2_play_skill.py`, `.claude/skills/loop2-play/SKILL.md` - read whole.

## Searches not found or unclear

- A tap command or a touch switch of `playwright-cli` 0.1.22 - not found (`--help` and `open --help`; the skill's references name only `--mobile` and `--device`); the `run-code` way was found by trying.
- What `open` does to a session that is already open - not clear; the skill avoids relying on it.
- Whether the Playwright MCP of this session was started in the worktree (D-420's condition) - not known; the tab opened without a profile conflict.
