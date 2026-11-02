PASS 360280114d8854886c6b06c15167ca394b8272fe

# Review of the fix of finding 1 — task `lokalny-start`

Range `14fae580c59113eabb91a78ec92d8f5ef3b78731..3602801`, one commit. `git rev-parse HEAD` is 360280114d8854886c6b06c15167ca394b8272fe. Bounded by `reports\findings-review-whole.md` and `reports\fix-1.md`, as `task-cycle/review/fix.md` gives.

Blocking 0, Minor 3 (new, all in the fix diff), out of scope 0 new.

## Finding of the findings file

**Finding 1: fixed.**

- **The defect was:** D-252 says an agent reads motion from a stream of frames, and the skill gave an agent on Playwright MCP none.
- **On the new head:** the sentence that kept the stream for the CLI is gone from `C:\Storage\repos\loop2-wt\lokalny-start\.claude\skills\loop2-play\SKILL.md`, and its place holds a way to the same `page.screencast` stream: set a viewport, start the screencast, keep the frames in the page, write them with `browser_evaluate` to a file, make images with `save-frames.mjs`. `git diff --name-only 14fae58 3602801 -- foundations` lists nothing, so this is way (b) of the finding: D-252 and its *Rationale* stand and are now true on that way. "going back costs almost nothing" is fair: one condition and two more steps.
- **What this rests on:** the measurements of `reports\fix-1.md`, which I could not repeat (below). I take them as sufficient because they are a control and not a single success: tries 7 and 8 are the same tab with no viewport (0 frames) and with one (5 frames); try 9 is the committed text on a new start, the frames opened as images; and the report keeps its limits in view: the condition is measured on one headed Chrome 156 with one Playwright alpha, why Playwright stays silent with no viewport was not found, headless MCP was not tried. The counts in the report agree with its table: six of six with no viewport give 0, three of three with one give frames.
- **Corrected reading:** my finding said nobody knew whether MCP cannot stream or one window did not paint. By tries 1 and 2 the window painted and MCP can stream. I accept that.

## New findings in the fix diff

No Critical or Important finding. Three Minor, none blocking.

**A. `save-frames.mjs` gives the wrong reason for a path it cannot read.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\.claude\skills\loop2-play\save-frames.mjs:10`–`:16` and its copy.
- **What is wrong:** the `catch` written for bad JSON on standard input now also takes a missing file. `node save-frames.mjs missing.json` printed `No frames came: the page did not change, or playwright-cli failed.`, exit 1. That is the likely mistake on this way: where the server started in another directory, as it did in the fix's own session, the skill's relative path misses the file, and the message points the agent at the page or the CLI, which were fine.
- **Why Minor:** it fails, it writes nothing and it removes no earlier frame. The skill's last sentence warns of the path, and the agent holds `frames: N` from the step before.

**B. The resize stays on the tab and the skill does not say so.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\.claude\skills\loop2-play\SKILL.md`, the code with `page.setViewportSize`.
- **What is wrong:** the fix report names the cost, that a screen check made afterwards sees 1280×720 and not the maximized window, but the agent reads the skill and not the report. A layout judged after a stream on that tab is judged at another size.
- **Why Minor:** a person's check stands behind it (D-252), and 1280×720 is a usual size. One clause closes it.

**C. The code in the skill and `frames.js` are twins no test joins.**

- **Place:** the same code block, `C:\Storage\repos\loop2-wt\lokalny-start\.claude\skills\loop2-play\frames.js`.
- **What is wrong:** a change to one leaves the other behind, and `setViewportSize` removed from the text is caught by nothing. The report says so itself. The reason is sound: the server refused a file outside its roots.
- **Why Minor:** a text for an agent, and a failure shows at once as `frames: 0`.

## Where the fix changes the earlier report

- **Declined to judge, second line** (`.playwright-mcp/` ignored only by the owner's personal file): closed by the fix's line in `.gitignore`. It goes past To do 4, which names only `.playwright-cli/`, and it is needed: the skill now tells an agent to write a file there. Not a finding. `.gitignore` is read by `TreeCopy` and by Prettier's `--ignore-path`; neither loses a file it needs.
- **Coverage, To do 4:** frames on MCP move from "no" to "yes", on the author's measurements.
- **Minor findings 2 to 5:** unchanged. The anchor `SKILL.md:33` of finding 3 still holds.
- **Author's report, Concern 1:** overtaken by the fix report. Its guess was wrong.

## The two questions of the start

- **Trust boundary:** `scripts/local-start.mjs` and `src/server/**` are not in the range. The new argument of `save-frames.mjs` lies in `agent-workflow`, which has no trust boundary.
- **Irreversible operation:** no change. The argument is only read. The removal stays on the fixed relative `.playwright-cli/frames` and comes only after frames were read, so a bad path removes nothing and no argument leads it elsewhere.

## Other checks of the fix diff

- `browser_evaluate` holds `function` and `filename`, and its schema says relative names resolve against the workspace root, as the skill relies on. `browser_run_code_unsafe` takes `code`. The server's limit on `filename` is the author's reading from its error text.
- The new test case fails when the behaviour goes: the script of 14fae58 on the same file with empty standard input exits 1. The author had this as reasoned; it is now run. The case takes the same indented JSON `browser_evaluate` writes.
- The skill's code block, taken from the file as committed, ran through Playwright CLI on a real start of a copy of 3602801 with a page changing every 200 ms: `"frames: 16"`, `window.loop2Frames` read back into a file of 350 810 bytes, `save-frames.mjs` on that file made 16 images up to `015.jpeg +2834 ms`. This proves the text and the file route, not MCP and not the viewport condition: a page the CLI opens already has a viewport.
- No invariant test changed.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `python -B -m unittest test_loop2_play_skill` | 0 | 6 tests |
| `cmp` of `SKILL.md`, `save-frames.mjs`, `frames.js` between `.claude` and `.agents` | 0 | identical |
| Script of 14fae58 with a file argument | 1 | control for the new case |
| `save-frames.mjs` at the head, existing file | 0 | one image |
| `save-frames.mjs` at the head, missing file | 1 | finding A |
| Skill's code through `playwright-cli run-code`, then `eval` to a file and `save-frames.mjs`, scratch copy of 3602801 | 0 | 16 frames |
| `node scripts/local-start.mjs --stop` | 0 | `Local starts stopped: 1` |

**Could not repeat:** tries 1 to 9 of the fix report, all through Playwright MCP, whose working directory is the main checkout; so the viewport condition, the 0 frames with no viewport, the frames on a headed window and the opened images of try 9 are the author's.

**Not run:** the full `npm test` (the orchestrator's, WAY-160), so ESLint, Prettier, Ruff, ShellCheck and the audit stayed unchecked by me at this head; the author reports them exit 0. `tests/invariants/test_local_start_access.py`: no file it runs changed. Headless MCP: not tried by anyone.

**Left behind:** nothing. The scratch copy is gone, no `local-start` process runs, and `git status` in the reviewed worktree prints nothing. I did not touch the main checkout.

## Reaches beyond the dispatch

- The tool schemas of `browser_evaluate` and `browser_run_code_unsafe`: to check the parameter names the skill gives.

## Searches not found or unclear

- Why `page.screencast` gives nothing with no viewport: not found by the author, and I could not look at it. The skill states the condition flatly, while the code holds whichever way a later release goes.
- `.playwright-mcp/frames.json` in the closing step of the skill is relative, and where the server started elsewhere the file lies there; the sentence above it says so only for the reading step. Unclear to a reader, too small to grade apart from finding A.
