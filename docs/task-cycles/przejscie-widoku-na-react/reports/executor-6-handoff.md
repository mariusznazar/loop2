# Handoff — executor of slice 6

**Stage:** the executor of slice 6 of the plan, `make-change`, variant "a slice, or the retry of a slice". You make this slice and no other; you write no foundation entry (the foundation step wrote them) and you do not push. Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question you cannot settle from the slice, the spec, the foundation and the code goes to the orchestrator as `questions` in your report; a missing fact or permission as `blocked`.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`). Work from its root. Your range starts at `f0e6eea9cbb0c7499045336d85b6ad21cd6995b0`. `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

**Inputs:** the frozen task `docs/task-cycles/przejscie-widoku-na-react/task.md`, the reviewed spec `docs/task-cycles/przejscie-widoku-na-react/spec.md`, the plan `docs/task-cycles/przejscie-widoku-na-react/plan.md`. Read the passages your slice's *Read* names, each whole (a decision from its heading to the next heading, with its rationale and *Rejected*; the guideline files each whole), and no more of the decision log. The foundation step has written the plan's nine entries (commit `e3a58f45`): "Foundation entries row N" in the *Read* means the entry as it stands now in `foundations/decisions.md`.

**Answers of step 4:** trust boundary — yes for the change as a whole (`scripts/kitchen-sink.mjs`); the slice's *Risk* below says whether this slice touches it. Irreversible operation — no.

**Rules of this repository you follow (its `AGENTS.md`):** read `guidelines/coding.md` before any change of product code, scripts and tests included; `guidelines/testing.md` before you write, change or review a test; `guidelines/styleguide-browser-view.md` before you change a file of the part `browser-view`; `src/browser/AGENTS.md` when you work in `src/browser/`; `.claude/skills/loop2-play/SKILL.md` to run the game or operate it in a real browser (a screenshot is inspected and kept nowhere unless the foundation settles a place: say in the report that you inspected it). The product's whole test run (`npm test` with no argument) is the orchestrator's alone: you run the focused checks of your slice (`npm test -- <one file>`, `npm run typecheck`, `npx eslint <files>`, `npx prettier --check <files>`), each reported with its command and exit code.

**The foundation check is red on this branch until slice 12** (expected, not yours): `python -B .the-way/elements/common/foundation_check.py` reports errors for lines of `tests/view/react-controls.test.mjs` that quote the old sentence of D-265; slice 12 deletes that file. Do not touch those lines and do not try to make the check green; name it as the known state if you run it. Slice 13 is the first whose check expects exit 0.

**Commits:** explicit paths only (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the form of this repository's history (`feat: :sparkles: …`, `fix: :bug: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`, with the decisions in a closing parenthesis, e.g. `(D-265, D-407)`); no push, no force, no amend of an earlier commit. A test first, as the slice says, is its own commit before the code that makes it pass where the slice names one. Leave the worktree clean at the end.

**Working copies:** directory `.runs/executor-6/`. Paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Where to write:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/executor-6-report.md` (this absolute path, inside the worktree; never a path under the main checkout `the main checkout's .runs/`). Return: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run, the report's path. The report holds each check with its command and exit code, your own-work check as `make-change` gives it, **Unread material** (what this handoff or the slice's *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing you looked for and did not find or found unclear, or `none`), the reaches beyond the handoff, and the working copies (where each stood and that it was removed). You start no next slice and ask no human.


## Current ranges

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

### Slice 6 — The saver's sentence as a value, drawn by the row of saving

- **Goal:** The line of saving is drawn by a React root of its own.
  - `src/browser/view/game-saver.ts` builds no element and no longer imports `createFormWarning`: in place of `element` its interface gives the sentence of saving it stands for, or null, and a way to subscribe to its changes that returns the unsubscribing. The sentence changes only at creation and in the continuation of a save's answer, never inside React's work. Its sentences, and when each stands, stay exactly as today.
  - `src/browser/view/state-store.ts` passes those two through in place of `saveLine`.
  - A new module `src/browser/view/header-rows.tsx` holds the row of saving: a factory after the shape of `createMenuBar` in `menu-bar.tsx` — an element of its own for the page to place (the host, with the class `save-line`, hidden while the sentence is null), a first render that is synchronous, a synchronous render (`flushSync`) at each change of the sentence, and a disposal that unsubscribes and unmounts — drawing the shared `ReactFormWarning`. Slice 10 adds the row of the failure to this module.
  - `src/browser/view/game-view.ts` creates the row of saving from the store's sentence and subscription, keeps `saveLine: HTMLElement` in its interface — now the row's host, which the page places under the bar as today — and unmounts the row in `dispose()`.
  - `src/browser/view/app.ts` does not change in this slice; its `classList.add("save-line")` on the host does nothing new and goes in Slice 9. `src/browser/styles.css` does not change: `header .save-line` now applies to the host, and `.form-warning` has no margin, so the header keeps today's box with and without the sentence; if the check in a real browser shows otherwise, stop and report it to the orchestrator.
  Test: `sentenceOf` in `tests/view/game-saver.test.mjs` reads the saver's sentence value instead of its element, every expected sentence staying as written; the case's hand-made document model may lose what only the element needed. Ground: the saver builds no element (To do 2). No new case: `account-screen.test.mjs` (its `saveLine` helper and the assertions Slice 3 rewrote) and `previous-save.test.mjs` read the line after answers. Every test stays green after this slice, among them those of the game saver, the state store, the previous save, the account screen, the uncaught failure, the chronicle of the game, the end question and the end window of the game. In a real browser (`.claude/skills/loop2-play/SKILL.md`): the header with no sentence keeps its height, and, where a failed save can be brought about on the local start (for one, with the local server stopped while a game is open), its sentence shows under the bar as before.
- **Change:** `src/browser/view/game-saver.ts` · `src/browser/view/state-store.ts` · `src/browser/view/game-view.ts` · `src/browser/view/header-rows.tsx` · `tests/view/game-saver.test.mjs`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:15-15` Goals and non-goals, goal 2 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:68-97` Decision 2 — The roots of the start page and their order ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:172-172` Decision 7 — Tests, the row of saving's host ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:188-188` Decision 7 — Tests, sentenceOf ·
  `src/browser/view/menu-bar.tsx` · `src/browser/view/controls/react-text-field.tsx` ·
  `src/browser/styles.css:46-58` the line of saving and the line of a failure ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:3580-3647` D-207 · `foundations/decisions.md:3649-3675` D-208 ·
  `foundations/decisions.md:3677-3722` D-209 · `foundations/decisions.md:3724-3757` D-210 ·
  `foundations/decisions.md:2732-2755` D-97 · `foundations/decisions.md:534-547` D-36 ·
  Foundation entries row 3 (D-407)
- **Model:** same — the saver's interface changes across three modules and a new React root; a mistake shows only in the order of the saver's outcomes the tests hold in part
- **Risk:** none
- **Checks:** `npm test -- tests/view/game-saver.test.mjs` · `npm test -- tests/view/state-store.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/chronicle-game.test.mjs` · `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs` · `npm run typecheck` · `npx eslint` and `npx prettier --check` on the changed files · the check in a real browser
- **Depends on:** Slice 3 · Foundation entries row 3
