# Report of the fix — review of the whole change, finding 1

**Status:** done

Range: reviewed head 14fae580c59113eabb91a78ec92d8f5ef3b78731 to 3602801.

| Commit | Message |
|---|---|
| 3602801 | docs: :memo: give an agent on Playwright MCP the stream of frames in the skill loop2-play |

## Finding 1: fixed, by way (b)

An agent on the way through Playwright MCP now gets the same stream of frames as on the CLI: `page.screencast` with `onFrame`, the API `playwright-screencast-frames` cites. It is a stream, not a series of screenshots.

No foundation file changed (`git diff --name-only 14fae58 HEAD -- foundations` lists none), so D-252, its *Rationale* and every other approved wording stand as they were.

### What the cause was

My guess in `reports\author.md`, Concern 1, was wrong: the window paints. **`page.screencast` gives no frames on a page with no viewport, and a page MCP opens has none** (`page.viewportSize()` returns `null`, the window is maximized at 1707×769). With a viewport set by `page.setViewportSize`, the same call gives frames.

How far that is settled: the condition is measured, on and off, on one headed Chrome 156.0.8078.79 with Playwright 1.64.0-alpha-1790635538000. Why Playwright's own path stays silent there I did not find. Its bundle sends `Page.startScreencast` with the same parameters I sent by hand, and those frames did come, so the fault lies between that call and the frames reaching `onFrame`.

This also corrects the review's reading that nobody knew whether MCP cannot stream or one window did not paint: MCP can stream, and the window painted.

### Measurements

All on a real start of `npm run local`, in the headed browser Playwright MCP drives, with a map run going, each `browser_run_code_unsafe` unless named.

| # | Try | Viewport | Window of time | Frames | Other result |
|---|---|---|---|---|---|
| 1 | `Browser.getWindowForTarget`, sizes, visibility | none | — | — | `windowState: maximized`, `visibilityState: visible`, `hasFocus: true`: the page is on show |
| 2 | CDP `Page.startScreencast` through `newCDPSession`, with acks | none | 3 s | **4** | Gaps 0, 738, 1725, 2719 ms; 131 KB of base64 each. The window paints. |
| 3 | `page.screencast.start({ onFrame, size, quality })` | none | 3 s | **0** | No error, `start` returned an object |
| 4 | `page.screencast.start` with a CDP listener on a session of my own | none | 2.5 s | **0** | The listener saw 0 as well (it listens on another session, so this says little) |
| 5 | CDP with Playwright's own parameters (`quality: 90`, `maxWidth: 800`, `maxHeight: 600`, `maxFramesInFlight: 5`) | none | 2.5 s | **3** | Rules those parameters out |
| 6 | `page.setViewportSize`, then `page.screencast.start` | 1280×720 | 2.5 s | **7** | |
| 7 | Fresh tab, the control: `page.screencast.start` | none (`null`) | 3 s | **0** | Minute went on to 66 |
| 8 | The same tab: the skill's code | 1280×720 | 3 s | **5** | Offsets +0, +392, +408, +1385, +2384 ms |
| 9 | New start, new account, form, „Wyślij”, reload, „Wznów”, then the skill's code as committed, on 3602801 | 1280×720 | 3 s | **6** | Offsets +0, +33, +435, +453, +1435, +2443 ms |

Earlier, in `reports\author.md`: three more tries of `page.screencast` with no viewport, 0 frames each. So no viewport gave 0 frames in six tries of six; with a viewport, 3 of 3 gave frames.

The extra frames in 6, 8 and 9 come at the start of a window: the page repaints after the resize, then one frame a second at 1×, as on the CLI. That reading is mine, from the offsets.

### The proof with the frames in hand (try 9)

Commands as the skill gives them, on the commit itself:

- `browser_run_code_unsafe` with the skill's code answered `"frames: 6"`.
- `browser_evaluate`, function `() => window.loop2Frames`, filename `.playwright-mcp/frames.json`: `- [Evaluation result](.playwright-mcp\frames.json)`.
- `node .claude/skills/loop2-play/save-frames.mjs <that file>`: exit 0, six paths, `.playwright-cli\frames\000.jpeg +0 ms` to `005.jpeg +2443 ms`.

I opened `005.jpeg`: a readable image of the game, „Minuta 5 · Czeka — żadna reguła nie pasuje · Passa 5/480”, „Pauza” where „Wznów” stood, the terrain and program panels. Try 8's `004.jpeg`, opened too, shows „Minuta 81”.

The path given to `save-frames.mjs` was the full one, because this session's MCP server started in the main checkout, not in the worktree. The skill says so.

## What changed

| File | Added | Removed | Why |
|---|---|---|---|
| `.claude/skills/loop2-play/SKILL.md` | 37 | 2 | The sentence that gave the stream to the CLI alone is gone; the MCP way stands in its place: the viewport condition, the code, `browser_evaluate` to a file, the images |
| `.agents/skills/loop2-play/SKILL.md` | 37 | 2 | Byte-identical copy |
| `.claude/skills/loop2-play/save-frames.mjs` | 8 | 4 | Takes a file named as its argument as well as standard input, because Windows PowerShell has no `<` |
| `.agents/skills/loop2-play/save-frames.mjs` | 8 | 4 | Byte-identical copy |
| `tests/agent_workflow/test_loop2_play_skill.py` | 13 | 0 | One case for the file argument, on indented JSON as `browser_evaluate` writes it |
| `.gitignore` | 1 | 0 | `.playwright-mcp/`, because the skill now tells an agent to write a file there, and until now only the owner's personal ignore file covered it |

Choices, each with the way rejected and its cost if wrong:

- **`page.screencast` with `setViewportSize`, not raw CDP.** It is the API of the CLI way and of the fact D-252 rests on. Rejected: raw `Page.startScreencast`, which needs no viewport but adds acks to get right and a second way to keep. Cost if wrong: a later Playwright changes the condition, and the code still sets a viewport, which does no harm; raw CDP stays a known way back. The resize changes the page's layout for the rest of that tab, and a screen check made after it sees 1280×720.
- **Frames wait in `window.loop2Frames`, then `browser_evaluate` writes them.** The code of `browser_run_code_unsafe` has no `require`, `process` or `import`, and in the answer the frames would cost tokens as text. Rejected: returning base64 in the answer. Cost: a variable in the page until the next load.
- **The code stands in the skill as text, not as a file passed by `filename`.** The server refused a file of the worktree: `File access denied: ... is outside allowed roots. Allowed roots: C:\Storage\repos\loop2\.playwright-mcp, C:\Storage\repos\loop2`. As text it runs wherever the server started. Cost: the block and `frames.js` are close twins, kept by hand; no test joins them.
- **`.playwright-mcp/` in `.gitignore`.** It goes past the task's To do 4, which names only `.playwright-cli/`; it follows from this fix. The review's Minor findings were left alone.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 | 6 tests, on the content committed in 3602801 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests: ESLint, Ruff, ShellCheck, Prettier, audit |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `cmp` of `SKILL.md` and `save-frames.mjs` between `.claude` and `.agents` | 0 | identical |
| `npm run local:stop` after each of the two starts | 0 | `Local starts stopped: 1` |

**Not run:**

- The full `npm test`: the orchestrator's, and the dispatch forbids it.
- `tests/invariants/test_local_start_access.py`: no file it runs changed. The one change near it, a new line in `.gitignore`, only keeps `.playwright-mcp/` out of the copy it makes of the tree.
- The new test case was not seen failing: it cites no invariant. Against the old script it would have failed, as standard input is empty there and the script exits 1; that is reasoned, not run.

**Mutation in the head:** taking `setViewportSize` out of the skill's code is caught by no test, since the code stands in a text. A text that instructs agents is tested by what an agent does with it, which try 9 did once.

## Left behind

Nothing. Both starts stopped, neither port listening by `netstat`, `browser_close` called. In the worktree I removed `.playwright-cli/` and `.runs/local-start/`, and `git status --short` prints nothing.

In the main checkout's `.playwright-mcp\` I removed by name the five files my tries left, found by comparing listings: `console-2026-11-01T23-49-40-611Z.log`, `console-2026-11-01T23-51-22-705Z.log`, `console-2026-11-01T23-52-53-357Z.log` and `frames.json`, which arose twice. It holds 124 files, as before, and `git status --short` there prints nothing.

## Reaches beyond the dispatch

- `C:\Users\Mariusz\AppData\Local\npm-cache\_npx\9833c18b2d85bc59\node_modules\playwright-core\lib\coreBundle.js`, lines 23289–23345, 38705–38715, 39213–39222, 55112–55135: to look for the cause. Its MCP is 0.0.83, not the 0.0.84 the report read, and `@latest` may move.
- `.the-way/task-cycle/change/fix.md`: the method of this variant.

## Searches not found or unclear

- Why `page.screencast` stays silent with no viewport: not found, as above. A later release may behave otherwise; the skill's code holds either way.
- Whether the skill's way works on a headless MCP server: not tried, since the plugin here runs headed.

## Standing notes

- `reports\author.md`, Concern 1 is overtaken by this report: its guess and its recommendation no longer hold. Concern 2 stands.
- The fresh agent of the first acceptance criterion is unaffected: it goes by the CLI.
