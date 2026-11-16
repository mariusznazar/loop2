# Handoff — executor of slice 7

**Stage:** the executor of slice 7 of the plan, `make-change`, variant "a slice, or the retry of a slice". You make this slice and no other; you write no foundation entry (the foundation step wrote them) and you do not push. Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question you cannot settle from the slice, the spec, the foundation and the code goes to the orchestrator as `questions` in your report; a missing fact or permission as `blocked`.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`). Work from its root. Your range starts at `51f26f011310a8b566404f91e356193d5b7c81bf`. `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

**Inputs:** the frozen task `docs/task-cycles/przejscie-widoku-na-react/task.md`, the reviewed spec `docs/task-cycles/przejscie-widoku-na-react/spec.md`, the plan `docs/task-cycles/przejscie-widoku-na-react/plan.md`. Read the passages your slice's *Read* names, each whole (a decision from its heading to the next heading, with its rationale and *Rejected*; the guideline files each whole), and no more of the decision log. The foundation step has written the plan's nine entries (commit `e3a58f45`): "Foundation entries row N" in the *Read* means the entry as it stands now in `foundations/decisions.md`.

**Answers of step 4:** trust boundary — yes for the change as a whole (`scripts/kitchen-sink.mjs`); the slice's *Risk* below says whether this slice touches it. Irreversible operation — no.

**Rules of this repository you follow (its `AGENTS.md`):** read `guidelines/coding.md` before any change of product code, scripts and tests included; `guidelines/testing.md` before you write, change or review a test; `guidelines/styleguide-browser-view.md` before you change a file of the part `browser-view`; `src/browser/AGENTS.md` when you work in `src/browser/`; `.claude/skills/loop2-play/SKILL.md` to run the game or operate it in a real browser (a screenshot is inspected and kept nowhere unless the foundation settles a place: say in the report that you inspected it). The product's whole test run (`npm test` with no argument) is the orchestrator's alone: you run the focused checks of your slice (`npm test -- <one file>`, `npm run typecheck`, `npx eslint <files>`, `npx prettier --check <files>`), each reported with its command and exit code.

**The foundation check is red on this branch until slice 12** (expected, not yours): `python -B .the-way/elements/common/foundation_check.py` reports errors for lines of `tests/view/react-controls.test.mjs` that quote the old sentence of D-265; slice 12 deletes that file. Do not touch those lines and do not try to make the check green; name it as the known state if you run it. Slice 13 is the first whose check expects exit 0.

**Commits:** explicit paths only (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the form of this repository's history (`feat: :sparkles: …`, `fix: :bug: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`, with the decisions in a closing parenthesis, e.g. `(D-265, D-407)`); no push, no force, no amend of an earlier commit. A test first, as the slice says, is its own commit before the code that makes it pass where the slice names one. Leave the worktree clean at the end.

**Working copies:** directory `.runs/executor-7/`. Paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Where to write:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/executor-7-report.md` (this absolute path, inside the worktree; never a path under the main checkout `the main checkout's .runs/`). Return: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run, the report's path. The report holds each check with its command and exit code, your own-work check as `make-change` gives it, **Unread material** (what this handoff or the slice's *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing you looked for and did not find or found unclear, or `none`), the reaches beyond the handoff, and the working copies (where each stood and that it was removed). You start no next slice and ask no human.


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

### Slice 7 — The page's state as one value

- **Goal:** In `startApp` of `src/browser/view/app.ts`, the page's state is one value of three kinds, held by `startApp` and changed only through one function that takes the next value, disposes the card or the game the next value no longer holds, and draws every place of the start page from it — in this slice still the elements the page builds by hand today, so that nothing the player sees changes:
  - checking — the waiting screen, header shown, no card, no game; its data one of: asking, with „Sprawdzanie logowania…” or „Potwierdzanie adresu…”; refused, with the sentence of a failed request or of a load that met an error of the code and „Spróbuj ponownie” at rest, focus moved to „Spróbuj ponownie” at every entry, a refusal after retrying included, as `askingFailed` does today; retrying, „Spróbuj ponownie” waiting as „Sprawdzanie…” with no sentence, lasting through every request until the waiting screen is left, as today once a refusal was shown; stopped, the state the page takes where it would build a game after an error nothing handled — drawn in this slice exactly as today's page draws that moment, with „Sprawdzanie logowania…” (Slice 8 draws it empty);
  - card — the card that stands, header and main hidden (D-262);
  - game — the game view, the account it belongs to, the place the game last told or none yet, the page's sentences above the first screen, the outcome of the registration's message the bar starts with, the logout (idle, with the sentence of an uncertain end or none; saving, while the save before the logout waits; ending, while the request that ends the session waits, with the saver's outcome held for after its answer or none) and the reset (idle; waiting, with the saver's outcome held for after its answer or none). The bar is drawn from this kind alone: the game's name alone in the other kinds or where no place is known yet; „Wyloguj” waiting while the logout is not idle, unavailable while the reset waits.
  Values that outlive a change of kind stay apart: `pendingNotice`, `pendingMessage`, `kept`, `entry`, `afterConflict`, `latest`, `failed` and the line of the failure. The order and the numbering of the page's requests (`latest`) and every behaviour the page has today stay as they are (D-96, D-97, D-209, D-211, D-225, D-261, D-286, D-323, D-402), a reset that succeeds while a logout waits included. The state and its pure helpers stay in `app.ts`. No test changes; every test stays green after this slice, among them those of the account screen, the uncaught failure, the previous save, the owner panel and the menu bar.
- **Change:** `src/browser/view/app.ts`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:16-16` Goals and non-goals, goal 3 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:99-121` Decision 3 — The one value of the page's state ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:29-29` To do, item 3 ·
  `src/browser/view/game-view.ts:36-124` GameEntry, GameViewOptions, GameView ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` ·
  `foundations/decisions.md:2717-2730` D-96 · `foundations/decisions.md:2732-2755` D-97 ·
  `foundations/decisions.md:3677-3722` D-209 · `foundations/decisions.md:3759-3799` D-211 ·
  `foundations/decisions.md:3295-3333` D-225 · `foundations/decisions.md:2863-2885` D-261 ·
  `foundations/decisions.md:2887-2927` D-262 · `foundations/decisions.md:4299-4318` D-286 ·
  `foundations/decisions.md:3925-3938` D-402 · Foundation entries row 5 (D-323)
- **Model:** same — it rewrites every transition of the page, whose orderings (a logout and a reset under way, outcomes deferred and held, late answers) the existing tests hold only in part
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/owner-panel.test.mjs` · `npm test -- tests/view/menu-bar.test.mjs` · `npm run typecheck` · `npx eslint src/browser/view/app.ts` · `npx prettier --check src/browser/view/app.ts`
- **Depends on:** none
