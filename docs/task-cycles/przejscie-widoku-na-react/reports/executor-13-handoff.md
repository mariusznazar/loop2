# Handoff — executor of slice 13

**Stage:** the executor of slice 13 of the plan, `make-change`, variant "a slice, or the retry of a slice". You make this slice and no other; you write no foundation entry (the foundation step wrote them) and you do not push. Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question you cannot settle from the slice, the spec, the foundation and the code goes to the orchestrator as `questions` in your report; a missing fact or permission as `blocked`.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`). Work from its root. Your range starts at `7226e369fe40ca6e483fbc3606e6fd1bce90eb38`. `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

**Inputs:** the frozen task `docs/task-cycles/przejscie-widoku-na-react/task.md`, the reviewed spec `docs/task-cycles/przejscie-widoku-na-react/spec.md`, the plan `docs/task-cycles/przejscie-widoku-na-react/plan.md`. Read the passages your slice's *Read* names, each whole (a decision from its heading to the next heading, with its rationale and *Rejected*; the guideline files each whole), and no more of the decision log. The foundation step has written the plan's nine entries (commit `e3a58f45`): "Foundation entries row N" in the *Read* means the entry as it stands now in `foundations/decisions.md`.

**Answers of step 4:** trust boundary — yes for the change as a whole (`scripts/kitchen-sink.mjs`); the slice's *Risk* below says whether this slice touches it. Irreversible operation — no.

**Rules of this repository you follow (its `AGENTS.md`):** read `guidelines/coding.md` before any change of product code, scripts and tests included; `guidelines/testing.md` before you write, change or review a test; `guidelines/styleguide-browser-view.md` before you change a file of the part `browser-view`; `src/browser/AGENTS.md` when you work in `src/browser/`; `.claude/skills/loop2-play/SKILL.md` to run the game or operate it in a real browser (a screenshot is inspected and kept nowhere unless the foundation settles a place: say in the report that you inspected it). The product's whole test run (`npm test` with no argument) is the orchestrator's alone: you run the focused checks of your slice (`npm test -- <one file>`, `npm run typecheck`, `npx eslint <files>`, `npx prettier --check <files>`), each reported with its command and exit code.

**The foundation check is red on this branch until slice 12** (expected, not yours): `python -B .the-way/elements/common/foundation_check.py` reports errors for lines of `tests/view/react-controls.test.mjs` that quote the old sentence of D-265; slice 12 deletes that file. Do not touch those lines and do not try to make the check green; name it as the known state if you run it. Slice 13 is the first whose check expects exit 0.

**Commits:** explicit paths only (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the form of this repository's history (`feat: :sparkles: …`, `fix: :bug: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`, with the decisions in a closing parenthesis, e.g. `(D-265, D-407)`); no push, no force, no amend of an earlier commit. A test first, as the slice says, is its own commit before the code that makes it pass where the slice names one. Leave the worktree clean at the end.

**Working copies:** directory `.runs/executor-13/`. Paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Where to write:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/executor-13-report.md` (this absolute path, inside the worktree; never a path under the main checkout `the main checkout's .runs/`). Return: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run, the report's path. The report holds each check with its command and exit code, your own-work check as `make-change` gives it, **Unread material** (what this handoff or the slice's *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing you looked for and did not find or found unclear, or `none`), the reaches beyond the handoff, and the working copies (where each stood and that it was removed). You start no next slice and ask no human.

**From the earlier slices' reports (carried by the orchestrator):**
- Stale places the executors found in the two guideline files: `guidelines/coding-browser-module.md` — the rule "Strona wszystkich stanów bez Reacta" and the line near 214 saying the kitchen-sink script "nie składa paczki" (slice 1's reviewer), the example "Kontrolki w DOM i ich aktualizacja" still describing the hand-built session check (slice 8); `guidelines/styleguide-browser-view.md` — the rule "The kitchen-sink page" and the passages the spec's Decision 8 lists. These are in Decision 8's list; nothing here widens it.
- The table "Files of this kind" gets no row for any file this task added (`header-rows.tsx`, `waiting-screen.tsx`, `page-sentences.tsx`, `kitchen-sink.tsx`, `shared-controls.test.mjs`) and no status changes (question 4 a): remove only the rows of the five deleted files.
- The file `tests/view/shared-controls.test.mjs` now exists and is the test of the React forms; slices 11 and 12 are done, so `python -B .the-way/elements/common/foundation_check.py` should exit 0 now: run it and report its exit code and its last lines.
- Not yours: the *Rejected* of D-276 and the rationale of D-264 (the return step corrects them); any code or test.

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

### Slice 13 — The guidelines follow the change

- **Goal:** `guidelines/coding-browser-module.md` and `guidelines/styleguide-browser-view.md` describe the state after the change, without its history. The product writes guideline files only through `the-way-maintain-coding-guidelines` and `the-way-maintain-styleguide`; with no skill tool, read their files by path, `.the-way/product-guidelines/coding/SKILL.md` and `.the-way/product-guidelines/styleguide/SKILL.md`: their tables give the cycle's author the writing of the guideline files after `.the-way/product-guidelines/template.md` and the template of the discipline, each rule citing its decision, and never a meaning the task did not settle. Every meaning here is settled by the task (questions 1 to 4) and Foundation entries rows 1 to 8; a meaning beyond them is a question for the orchestrator, never a line written. In `coding-browser-module.md`: the rule "Wspólna kontrolka w dwóch postaciach" becomes the rule of one React form in `src/browser/view/controls/`, the constant of the warning sentence that the panel of a card taken down reads outside React, and the test of the React forms, `tests/view/shared-controls.test.mjs`; "Nowy ekran i moduły w DOM" says that no screen is built through the DOM APIs, that the page builds only the places roots mount in and the panel of a card taken down, and keeps its rule on `do not copy` files and their pure functions; "Strona wszystkich stanów bez Reacta" becomes the page bundled by the build step of its script and drawing the React forms; the example "Kontrolki w DOM i ich aktualizacja" describes the waiting screen's root, its update and the focus of „Spróbuj ponownie”, and the React controls' waiting props; the example "Gra na stronie i odpowiedzi serwera" describes the page's one value and the roots of the start page, the row of the failure included; the table "Files of this kind" loses the rows of the five deleted files and gives the new files no row, and no status changes (question 4 a); *Where in code* names `tests/view/shared-controls.test.mjs` in place of the deleted test; beside these, the sentence of the rule "TypeScript i DOM" that a screen not moved yet stays in the DOM APIs, and "Granicą między stroną w DOM a ekranem" in the example of the card. In `styleguide-browser-view.md`: "The kitchen-sink page" says the page shows each shared control in its React form, the menu's part made from the React forms, its last paragraph on code only the page needs staying as it stands; in "States of shared controls", the paragraph on the DOM and React forms and the paths of the DOM forms in the list of controls that depart from the states; in "Main button, secondary action and tab", the DOM calls named beside the React props. The fenced good and bad examples of both files do not change. Read the code each passage describes as it then stands: `src/browser/view/app.ts`, and the new `src/browser/view/waiting-screen.tsx`, `src/browser/view/header-rows.tsx`, `src/browser/view/page-sentences.tsx` and `src/browser/kitchen-sink/kitchen-sink.tsx`, each as far as a passage needs it. No code or test changes.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:21-21` Goals and non-goals, goal 8 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:193-198` Decision 8 — What the guidelines say after the change ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:34-34` To do, item 8 ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:55-60` Questions to settle, question 4 ·
  `.the-way/product-guidelines/coding/SKILL.md` · `.the-way/product-guidelines/styleguide/SKILL.md` ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `.the-way/product-guidelines/styleguide/template.md` ·
  `src/browser/view/app.ts` · `guidelines/coding.md` · `src/browser/AGENTS.md` ·
  `foundations/decisions.md:534-547` D-36 ·
  Foundation entries row 1 (D-269) · Foundation entries row 2 (D-265) · Foundation entries row 3 (D-407) ·
  Foundation entries row 4 (D-03) · Foundation entries row 5 (D-323) · Foundation entries row 6 (D-44) ·
  Foundation entries row 7 (D-275) · Foundation entries row 8 (D-276)
- **Model:** same — it writes meanings into two guideline files from the task's settlements, read from the maintenance skills' files, with no skill tool
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `npx prettier --check guidelines/coding-browser-module.md guidelines/styleguide-browser-view.md` · a search of both files finding no path of a deleted file and no name of a DOM function of a shared control
- **Depends on:** Slices 1 to 12 · Foundation entries rows 1 to 8
