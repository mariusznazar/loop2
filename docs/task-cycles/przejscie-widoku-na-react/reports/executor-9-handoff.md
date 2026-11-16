# Handoff — executor of slice 9

**Stage:** the executor of slice 9 of the plan, `make-change`, variant "a slice, or the retry of a slice". You make this slice and no other; you write no foundation entry (the foundation step wrote them) and you do not push. Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question you cannot settle from the slice, the spec, the foundation and the code goes to the orchestrator as `questions` in your report; a missing fact or permission as `blocked`.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`). Work from its root. Your range starts at `5c4ce66bf4c5f9aafbb5185e05d6ab88c9340136`. `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

**Inputs:** the frozen task `docs/task-cycles/przejscie-widoku-na-react/task.md`, the reviewed spec `docs/task-cycles/przejscie-widoku-na-react/spec.md`, the plan `docs/task-cycles/przejscie-widoku-na-react/plan.md`. Read the passages your slice's *Read* names, each whole (a decision from its heading to the next heading, with its rationale and *Rejected*; the guideline files each whole), and no more of the decision log. The foundation step has written the plan's nine entries (commit `e3a58f45`): "Foundation entries row N" in the *Read* means the entry as it stands now in `foundations/decisions.md`.

**Answers of step 4:** trust boundary — yes for the change as a whole (`scripts/kitchen-sink.mjs`); the slice's *Risk* below says whether this slice touches it. Irreversible operation — no.

**Rules of this repository you follow (its `AGENTS.md`):** read `guidelines/coding.md` before any change of product code, scripts and tests included; `guidelines/testing.md` before you write, change or review a test; `guidelines/styleguide-browser-view.md` before you change a file of the part `browser-view`; `src/browser/AGENTS.md` when you work in `src/browser/`; `.claude/skills/loop2-play/SKILL.md` to run the game or operate it in a real browser (a screenshot is inspected and kept nowhere unless the foundation settles a place: say in the report that you inspected it). The product's whole test run (`npm test` with no argument) is the orchestrator's alone: you run the focused checks of your slice (`npm test -- <one file>`, `npm run typecheck`, `npx eslint <files>`, `npx prettier --check <files>`), each reported with its command and exit code.

**The foundation check is red on this branch until slice 12** (expected, not yours): `python -B .the-way/elements/common/foundation_check.py` reports errors for lines of `tests/view/react-controls.test.mjs` that quote the old sentence of D-265; slice 12 deletes that file. Do not touch those lines and do not try to make the check green; name it as the known state if you run it. Slice 13 is the first whose check expects exit 0.

**Commits:** explicit paths only (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the form of this repository's history (`feat: :sparkles: …`, `fix: :bug: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`, with the decisions in a closing parenthesis, e.g. `(D-265, D-407)`); no push, no force, no amend of an earlier commit. A test first, as the slice says, is its own commit before the code that makes it pass where the slice names one. Leave the worktree clean at the end.

**Working copies:** directory `.runs/executor-9/`. Paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Where to write:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/executor-9-report.md` (this absolute path, inside the worktree; never a path under the main checkout `the main checkout's .runs/`). Return: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run, the report's path. The report holds each check with its command and exit code, your own-work check as `make-change` gives it, **Unread material** (what this handoff or the slice's *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing you looked for and did not find or found unclear, or `none`), the reaches beyond the handoff, and the working copies (where each stood and that it was removed). You start no next slice and ask no human.

**From the earlier slices' reports (carried by the orchestrator):**
- Slice 3's report: the helpers of `tests/view/account-screen.test.mjs` find the sentences above the game by the classes `confirmation-notice` and `page-notice`; those classes stay on the elements of the page's sentences, as the spec's constraints say.
- Slice 7's report (`reports/executor-7-report.md`, read the section *Choices*) names four places where the page's code now differs from the page before the slice, three of them in transitions no test covers: (1) a card is created before the card it replaces is closed; (2) after an error nothing handled, a reset that succeeds with a game standing now closes that game, which before stayed and went on saving (D-323: "the game then takes no change but goes on saving the state it held"); (3) a saver outcome of a game built by a reset, arriving while the old game's logout still waits, acts at once on the new game, where it was held and dropped; (4) the bar is redrawn only when its props differ from the last ones given. They are not yours to change in this slice, and not yours to extend: where your change touches such a transition, keep the page's code as it stands, and name in your report each of them you met. The review of the whole change judges them against D-323, D-381, D-402 and the invariant `uncaught-failure-game-state`.

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

### Slice 9 — The sentences above the game in a React root

- **Goal:** A new module `src/browser/view/page-sentences.tsx` holds the one component of a page sentence — a confirmation-style sentence in its role, `positive` drawn with `role="status"` and `warning` with `role="alert"`, each with the class `confirmation-notice` and its role's class, or the sentence of a refused load in `page-notice` with `role="alert"` — which `src/browser/view/account-card.tsx` imports in place of its own `PageSentence`, so the card's sentence keeps its look and place; and a factory, after the shape of `createMenuBar`, returning its element, an update with the list of sentences, and a disposal, its first render and each update synchronous. `app.ts` mounts this root in a host of its own in `<main>`, before the game's element, and draws it from the game kind's sentences; they leave at the game's first change of screen (D-286) and at a change between the card and the game (D-261), as today. `createConfirmationNotice` goes from `src/browser/view/email-confirmation.ts`, whose pure functions and `browserAddress` stay; `createPageNotice` goes from `app.ts`, and so does the `classList.add("save-line")` on the saver's host, which the row of saving sets itself since Slice 6. `src/browser/styles.css` does not change: the notices keep their own margins inside a block host; if the check in a real browser shows a box other than today's, stop and report it to the orchestrator. No test changes: the assertions of the account screen's tests that Slice 3 rewrote, and its cases of the page's sentences, hold the behaviour. Every test stays green after this slice. In a real browser (`.claude/skills/loop2-play/SKILL.md`): a sentence above the first screen that the local start can bring about — for one, the sentence after „Zacznij od zera” for an account with the previous-save privilege, where the local start can grant it — stands above Siedziba and leaves at the first change of screen; where no such sentence can be brought about, the report names that check as left to the reviewer.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/page-sentences.tsx` · `src/browser/view/account-card.tsx` · `src/browser/view/email-confirmation.ts`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:15-15` Goals and non-goals, goal 2 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:68-97` Decision 2 — The roots of the start page and their order ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:109-114` Decision 3 — The one value of the page's state, the game kind ·
  `src/browser/view/menu-bar.tsx` ·
  `src/browser/styles.css:176-209` the page's sentences and the place of the screen ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:3061-3086` D-156 · `foundations/decisions.md:4299-4318` D-286 ·
  `foundations/decisions.md:2863-2885` D-261 · `foundations/decisions.md:2717-2730` D-96 ·
  `foundations/decisions.md:3295-3333` D-225 · `foundations/decisions.md:3925-3938` D-402 ·
  `foundations/decisions.md:534-547` D-36 ·
  Foundation entries row 3 (D-407) · Foundation entries row 9 (D-381)
- **Model:** same — the sentences above the game leave at a change of screen and at a change between card and game (D-286, D-261), shared with the card's component
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/owner-panel.test.mjs` · `npm test -- tests/view/email-confirmation.test.mjs` · `npm run typecheck` · `npx eslint` and `npx prettier --check` on the changed files · the check in a real browser
- **Depends on:** Slice 5 · Slice 6 · Slice 8 · Foundation entries row 3
