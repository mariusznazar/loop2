# Handoff — executor of slice 3

**Stage:** the executor of slice 3 of the plan, `make-change`, variant "a slice, or the retry of a slice". You make this slice and no other; you write no foundation entry (the foundation step wrote them) and you do not push. Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question you cannot settle from the slice, the spec, the foundation and the code goes to the orchestrator as `questions` in your report; a missing fact or permission as `blocked`.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`). Work from its root. Your range starts at `d3c20034f8bce977e7101fdc041eb46b6dc79f9b`. `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

**Inputs:** the frozen task `docs/task-cycles/przejscie-widoku-na-react/task.md`, the reviewed spec `docs/task-cycles/przejscie-widoku-na-react/spec.md`, the plan `docs/task-cycles/przejscie-widoku-na-react/plan.md`. Read the passages your slice's *Read* names, each whole (a decision from its heading to the next heading, with its rationale and *Rejected*; the guideline files each whole), and no more of the decision log. The foundation step has written the plan's nine entries (commit `e3a58f45`): "Foundation entries row N" in the *Read* means the entry as it stands now in `foundations/decisions.md`.

**Answers of step 4:** trust boundary — yes for the change as a whole (`scripts/kitchen-sink.mjs`); the slice's *Risk* below says whether this slice touches it. Irreversible operation — no.

**Rules of this repository you follow (its `AGENTS.md`):** read `guidelines/coding.md` before any change of product code, scripts and tests included; `guidelines/testing.md` before you write, change or review a test; `guidelines/styleguide-browser-view.md` before you change a file of the part `browser-view`; `src/browser/AGENTS.md` when you work in `src/browser/`; `.claude/skills/loop2-play/SKILL.md` to run the game or operate it in a real browser (a screenshot is inspected and kept nowhere unless the foundation settles a place: say in the report that you inspected it). The product's whole test run (`npm test` with no argument) is the orchestrator's alone: you run the focused checks of your slice (`npm test -- <one file>`, `npm run typecheck`, `npx eslint <files>`, `npx prettier --check <files>`), each reported with its command and exit code.

**The foundation check is red on this branch until slice 12** (expected, not yours): `python -B .the-way/elements/common/foundation_check.py` reports errors for lines of `tests/view/react-controls.test.mjs` that quote the old sentence of D-265; slice 12 deletes that file. Do not touch those lines and do not try to make the check green; name it as the known state if you run it. Slice 13 is the first whose check expects exit 0.

**Commits:** explicit paths only (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the form of this repository's history (`feat: :sparkles: …`, `fix: :bug: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`, with the decisions in a closing parenthesis, e.g. `(D-265, D-407)`); no push, no force, no amend of an earlier commit. A test first, as the slice says, is its own commit before the code that makes it pass where the slice names one. Leave the worktree clean at the end.

**Working copies:** directory `.runs/executor-3/`. Paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Where to write:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/executor-3-report.md`. Return: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run, the report's path. The report holds each check with its command and exit code, your own-work check as `make-change` gives it, **Unread material** (what this handoff or the slice's *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing you looked for and did not find or found unclear, or `none`), the reaches beyond the handoff, and the working copies (where each stood and that it was removed). You start no next slice and ask no human.


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

### Slice 3 — The account screen's tests read the page by what is shown

- **Goal:** In `tests/view/account-screen.test.mjs`, the four assertions that read the page's element structure are rewritten to keep what they protect without taking a sentence for a direct child of `<header>` or `<main>`, so that they pass on the tree as it stands now and after the start page is drawn in roots of its own (Slices 6, 8, 9 and 10: each sentence then stands in a host element the page places, and `<header>` holds the hidden host of the row of the failure from the start, between the bar and the line of saving). Expected values stay written out in each case:
  - today at line 3386, `form-warning` on the element `save-line`: the sentence the shown line of saving holds carries `form-warning` — today the line itself, later an element inside it. It protects the line's sentence in the role `warning` (D-208).
  - today at lines 3391–3395, the header's children read as `[false, true]` for `save-line`: read over the header's shown children, which are the bar first and the line of saving after it. It protects the bar first and the line of saving under it (D-208, D-280); a hidden host is no part of what the player sees. The check that the line is no part of the menu „Konto” stays as it is.
  - today at lines 1325–1327, the notice's parent taken as `<main>`, the notice its first child and that parent holding the game: the notice is the first shown sentence of `<main>` and stands before the game's element in the document's order, the game shown. It protects the sentence above the game's first screen (D-156, D-286).
  - today at lines 3340–3350, `main.children` read as confirmation, refusal and game: the shown sentences of `<main>` and the game's element (class `game-view`), in that order of the document — the confirmation, the refusal with `page-notice`, the game. It protects the confirmation above the sentence of a refused load, both above the game (D-96, D-156).
  Assertions that read a sentence's place among the children of its own parent, such as at line 1712, keep passing in a host of sentences and do not change. The clicks on „Spróbuj ponownie” sent through the harness's `fire` outside `act` (today at lines 550, 1397, 1995, 2034, 2055 and 3284) go through the harness's `press`, since the button becomes a React control and D-264 has a test of a screen in React click through `press`; no assertion changes with them. The comment before the case "the page's sentence stands in the card above the switch, …" (today at line 5841) names "the roles of createConfirmationNotice", a function Slice 9 removes; it names the roles of the page's sentence instead. The ground of each changed assertion, under the testing guidelines' rule "Changing an existing test": To do 2 and settlement 3 (question 2 a) draw the start page in roots of their own, each in a host the page places, and the spec's Decision 1 keeps the host of the row of the failure in the header from the start, hidden; so a sentence is no longer a direct child of `<header>` or `<main>`, and those parents hold hosts the player does not see. No product code changes. Every test stays green after this slice, this file included on the tree as it stands. The file has about 6 500 lines and need not be read whole: its imports and helpers (lines 1–260, among them `all`, `childrenOf`, `byClass`, `shown`, `buttonNamed`, `gameShown`), `noticeOf` (about line 1272), `saveLine` and `pageNotices` (about lines 2080–2090), and the cases around each line named above are what the work touches.
- **Change:** `tests/view/account-screen.test.mjs`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:52-58` Decision 1 — Where the sentence of the failure stands in the header ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:68-82` Decision 2 — The roots of the start page and their order ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:176-189` Decision 7 — Tests, existing tests that change ·
  `tests/view/page-document.mjs:93-166` withPage, inAct, fire, press, settle, typeInto ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `foundations/decisions.md:3649-3675` D-208 · `foundations/decisions.md:3061-3086` D-156 ·
  `foundations/decisions.md:4299-4318` D-286 · `foundations/decisions.md:2717-2730` D-96 ·
  `foundations/decisions.md:1211-1270` D-264
- **Model:** strongest — the slice reads more than the limit (the size script counts `tests/view/account-screen.test.mjs`, 344 238 characters, whole); the work in it is four assertions, six clicks and one comment, and a wrong rewrite fails in a later slice, so the class is the one that holds the largest context
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` on the tree as it stands
- **Depends on:** none
