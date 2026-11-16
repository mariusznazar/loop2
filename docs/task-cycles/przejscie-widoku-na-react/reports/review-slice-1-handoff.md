# Handoff — reviewer of slice 1 of the plan

**Stage:** the review of slice 1 of the plan, `review-change`. You did not make this change. You are read-only: you change no file of the repository (your report is the one file you write), and you return `PASS <sha>` or `FAIL <sha>` as the method gives it. Method: read `.the-way/task-cycle/review/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question goes to the orchestrator as `questions`.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`), `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. Work from its root.

**Range to review:** `d850f76063c1f7a302b89d0b89e1fca72682be6d..7c0fda9f` (`git diff d850f76063c1f7a302b89d0b89e1fca72682be6d..7c0fda9f`, `git log d850f76063c1f7a302b89d0b89e1fca72682be6d..7c0fda9f`). Read the full diff of the range.

**Frozen task, spec, plan:** `docs/task-cycles/przejscie-widoku-na-react/task.md`, `docs/task-cycles/przejscie-widoku-na-react/spec.md`, `docs/task-cycles/przejscie-widoku-na-react/plan.md` (the slice sections and the *Foundation entries* are what the change is judged against).

**Reports of the agents that made the range (read them):**
- `docs/task-cycles/przejscie-widoku-na-react/reports/executor-1-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/foundation-entries-report.md`

**Answers of step 4:** trust boundary — yes for the change as a whole: `scripts/kitchen-sink.mjs` (part `build-tools`, the developer's preview server) is a trust-boundary file; check crafted input at that boundary where the range touches it. Irreversible operation — no (the change only prepares none).

**Known state, not a finding:** `python -B .the-way/elements/common/foundation_check.py` is red until slice 12 deletes `tests/view/react-controls.test.mjs` (39 errors, all quotations of the old sentence of D-265 in that file); the product's whole `npm test` is the orchestrator's alone, so you run focused checks only, each reported with its command and exit code.

**Reports and working copies:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/review-slice-1-report.md`, its first line `PASS <sha>` or `FAIL <sha>`. Your working copies, if any, in `.runs/review-slice-1/`; the paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Return:** the report's first line, its path, the findings graded as the method gives them, the checks you ran with command and exit code, **Unread material** (what this handoff names, or for you your own selection, that you left unread or read in part, or `none`) and **Searches not found or unclear**, and the working copies. You start no next stage and ask no human.

**What to judge in this review in particular (slice 1 is the one with a trust-boundary mark):**
1. `scripts/kitchen-sink.mjs`: only the build lines changed; the constants `out` and `host`, the block that starts the server when `--build-only` is absent, and `openInBrowser` are as they stood at `d850f760` (compare line by line with `git diff`); the preview server still serves only `dist/kitchen-sink/` and only on 127.0.0.1 (`preview-server-access`, D-76).
2. With the server of the page's command running on this computer (start it in your own directory under `.runs/review-slice-1/`, as `npm run kitchen-sink` does it, on a free port if the script allows, and stop it before you return), send crafted request paths — `/..%2f..%2fpackage.json`, `/%2e%2e/package.json`, `/kitchen-sink/../../package.json`, a path with a null byte, a path to `assets/sprites/…` — and report what each returns; nothing outside `dist/kitchen-sink/` may be served. If the script cannot be run on a free port, say so and test the lines that serve files by reading them.
3. The command writes nothing outside `dist/kitchen-sink/`, a failed run included, copies nothing from `assets/sprites/` (D-273), leaves no staging directory and no compiled module in the served directory.
4. The foundation entries in the range (commit `e3a58f45`, nine decisions): read the report of the agent that wrote them and check each sentence against the task's settlements and the spec's *Foundation entries*; check the entry D-269 against what the slice's script does.
5. The slice against its *Goal* in `plan.md` and against the spec's Decision 4 (the bundle at the game's language level, React's development build defined through `process.env.NODE_ENV`, not minified).

## Current ranges (decisions and invariants; `foundations/decisions.md` moved when the foundation step wrote its entries)

Current ranges in the worktree (the foundation step moved `foundations/decisions.md`; where a range in the *Read* differs, these hold):

- D-03: `foundations/decisions.md:44-57`
- D-36: `foundations/decisions.md:534-547`
- D-43: `foundations/decisions.md:4527-4540`
- D-44: `foundations/decisions.md:4542-4555`
- D-45: `foundations/decisions.md:4557-4570`
- D-47: `foundations/decisions.md:4587-4600`
- D-76: `foundations/decisions.md:841-854`
- D-96: `foundations/decisions.md:2717-2730`
- D-97: `foundations/decisions.md:2732-2755`
- D-156: `foundations/decisions.md:3061-3086`
- D-157: `foundations/decisions.md:3088-3099`
- D-207: `foundations/decisions.md:3580-3647`
- D-208: `foundations/decisions.md:3649-3675`
- D-209: `foundations/decisions.md:3677-3722`
- D-210: `foundations/decisions.md:3724-3757`
- D-211: `foundations/decisions.md:3759-3799`
- D-225: `foundations/decisions.md:3295-3333`
- D-253: `foundations/decisions.md:1739-1788`
- D-261: `foundations/decisions.md:2863-2885`
- D-262: `foundations/decisions.md:2887-2927`
- D-263: `foundations/decisions.md:354-372`
- D-264: `foundations/decisions.md:1211-1270`
- D-265: `foundations/decisions.md:3985-4031`
- D-266: `foundations/decisions.md:374-412`
- D-267: `foundations/decisions.md:4033-4060`
- D-269: `foundations/decisions.md:4062-4092`
- D-273: `foundations/decisions.md:4747-4778`
- D-274: `foundations/decisions.md:4780-4824`
- D-275: `foundations/decisions.md:4826-4857`
- D-276: `foundations/decisions.md:4859-4903`
- D-280: `foundations/decisions.md:4123-4191`
- D-286: `foundations/decisions.md:4299-4318`
- D-288: `foundations/decisions.md:8579-8653`
- D-289: `foundations/decisions.md:8891-8930`
- D-323: `foundations/decisions.md:4320-4333`
- D-381: `foundations/decisions.md:2954-2969`
- D-395: `foundations/decisions.md:4335-4348`
- D-402: `foundations/decisions.md:3925-3938`
- D-407: `foundations/decisions.md:4350-4365`

- invariant application-build-kitchen-sink: `foundations/invariants.md:498-506`
- invariant preview-server-access: `foundations/invariants.md:568-576`
- invariant browser-view-focus-outline: `foundations/invariants.md:468-476`
- invariant browser-view-token-values: `foundations/invariants.md:458-466`
- invariant browser-view-framework: `foundations/invariants.md:35-43`
- invariant uncaught-failure-game-state: `foundations/invariants.md:1228-1236`


## The slice (copied word for word from `plan.md`)

### Slice 1 — The kitchen-sink page bundled by its build step

- **Goal:** `npm run kitchen-sink` and `npm run kitchen-sink -- --build-only` build the kitchen-sink page as the game is built. The build step of `scripts/kitchen-sink.mjs` compiles the page's modules with `tsc -p tsconfig.kitchen-sink.json` into a staging directory inside `dist/kitchen-sink/`, bundles the staged entry module with esbuild into `dist/kitchen-sink/kitchen-sink/kitchen-sink.js` — one ES module for the browser at the game's language level (`es2022`, as `scripts/build.mjs` sets it), not minified, with `process.env.NODE_ENV` defined as `"development"` (React's development build; a browser has no `process`) — removes the staging directory, and then copies `index.html`, `kitchen-sink.css` and the static files as today. `tsconfig.kitchen-sink.json` takes both the `.ts` and the `.tsx` files of `src/browser/kitchen-sink/` and emits into the staging directory; whether that directory is set in the file or on the command line, its name, and whether esbuild writes a source map are the maker's choice. After a build, `dist/kitchen-sink/` holds only the page, the files it held besides the compiled modules today, and the one bundle — no compiled module. The page itself does not change in this slice: it still draws the DOM forms, now from the bundle. This is a trust boundary of the part `build-tools`: the constants `out` and `host`, the block that starts the server when `--build-only` is absent, and `openInBrowser` stay exactly as they stand; the command writes nothing outside `dist/kitchen-sink/`, a failed run included, and copies nothing from `assets/sprites/`. `scripts/build.mjs`, `scripts/static-files.mjs`, `package.json`, `src/browser/kitchen-sink/index.html`, `tsconfig.browser.json` and the invariant test do not change. No test is written or changed: the positive control of `tests/invariants/test_application_build_kitchen_sink.py` runs the new build step and checks that nothing is written outside `dist/kitchen-sink/`. Every test stays green after this slice. Open the page once in a real browser with `npm run kitchen-sink` (how a browser is operated on this computer stands in `.claude/skills/loop2-play/SKILL.md`): it draws as before and its console holds no error.
- **Change:** `scripts/kitchen-sink.mjs` · `tsconfig.kitchen-sink.json`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:14-14` Goals and non-goals, goal 1 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:123-141` Decision 4 — How the kitchen-sink page is bundled ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:27-27` To do, item 1 ·
  `scripts/build.mjs` · `scripts/static-files.mjs` · `tests/invariants/test_application_build_kitchen_sink.py` ·
  `README.md:31-35` the two commands that build and run the server ·
  `.claude/skills/loop2-play/SKILL.md` ·
  `guidelines/coding.md` ·
  `foundations/decisions.md:4555-4568` D-45 · `foundations/decisions.md:841-854` D-76 ·
  `foundations/decisions.md:354-372` D-263 · `foundations/decisions.md:374-408` D-266 ·
  `foundations/decisions.md:4745-4776` D-273 · Foundation entries row 1 (D-269) ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `foundations/invariants.md:568-576` preview-server-access ·
  `foundations/part_map.md:87-121` build-tools
- **Model:** same — a script at a trust boundary of the part `build-tools`; a wrong build step breaks the page and the invariant test, and the slice has its own review
- **Risk:** trust boundary — `scripts/kitchen-sink.mjs` of `build-tools` (the preview server): its review aims at crafted request paths at the preview server and at the lines that serve files staying as they stand
- **Checks:** `npm test -- tests/invariants/test_application_build_kitchen_sink.py` · `npm run kitchen-sink -- --build-only`, then a listing of `dist/kitchen-sink/` showing no compiled module and no staging directory · `npx eslint scripts/kitchen-sink.mjs` · `npx prettier --check scripts/kitchen-sink.mjs tsconfig.kitchen-sink.json` · the page opened in a real browser
- **Depends on:** Foundation entries row 1
