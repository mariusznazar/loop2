# Handoff — executor of slice 2

**Stage:** the executor of slice 2 of the plan, `make-change`, variant "a slice, or the retry of a slice". You make this slice and no other; you write no foundation entry (the foundation step wrote them) and you do not push. Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question you cannot settle from the slice, the spec, the foundation and the code goes to the orchestrator as `questions` in your report; a missing fact or permission as `blocked`.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`). Work from its root. Your range starts at `7c0fda9fccd8c64c70f847a1876b15b59cdd07f3`. `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

**Inputs:** the frozen task `docs/task-cycles/przejscie-widoku-na-react/task.md`, the reviewed spec `docs/task-cycles/przejscie-widoku-na-react/spec.md`, the plan `docs/task-cycles/przejscie-widoku-na-react/plan.md`. Read the passages your slice's *Read* names, each whole (a decision from its heading to the next heading, with its rationale and *Rejected*; the guideline files each whole), and no more of the decision log. The foundation step has written the plan's nine entries (commit `e3a58f45`): "Foundation entries row N" in the *Read* means the entry as it stands now in `foundations/decisions.md`.

**Answers of step 4:** trust boundary — yes for the change as a whole (`scripts/kitchen-sink.mjs`); the slice's *Risk* below says whether this slice touches it. Irreversible operation — no.

**Rules of this repository you follow (its `AGENTS.md`):** read `guidelines/coding.md` before any change of product code, scripts and tests included; `guidelines/testing.md` before you write, change or review a test; `guidelines/styleguide-browser-view.md` before you change a file of the part `browser-view`; `src/browser/AGENTS.md` when you work in `src/browser/`; `.claude/skills/loop2-play/SKILL.md` to run the game or operate it in a real browser (a screenshot is inspected and kept nowhere unless the foundation settles a place: say in the report that you inspected it). The product's whole test run (`npm test` with no argument) is the orchestrator's alone: you run the focused checks of your slice (`npm test -- <one file>`, `npm run typecheck`, `npx eslint <files>`, `npx prettier --check <files>`), each reported with its command and exit code.

**The foundation check is red on this branch until slice 12** (expected, not yours): `python -B .the-way/elements/common/foundation_check.py` reports errors for lines of `tests/view/react-controls.test.mjs` that quote the old sentence of D-265; slice 12 deletes that file. Do not touch those lines and do not try to make the check green; name it as the known state if you run it. Slice 13 is the first whose check expects exit 0.

**Commits:** explicit paths only (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the form of this repository's history (`feat: :sparkles: …`, `fix: :bug: …`, `refactor: :recycle: …`, `test: :white_check_mark: …`, `docs: :memo: …`, with the decisions in a closing parenthesis, e.g. `(D-265, D-407)`); no push, no force, no amend of an earlier commit. A test first, as the slice says, is its own commit before the code that makes it pass where the slice names one. Leave the worktree clean at the end.

**Working copies:** directory `.runs/executor-2/`. Paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Where to write:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/executor-2-report.md`. Return: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run, the report's path. The report holds each check with its command and exit code, your own-work check as `make-change` gives it, **Unread material** (what this handoff or the slice's *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing you looked for and did not find or found unclear, or `none`), the reaches beyond the handoff, and the working copies (where each stood and that it was removed). You start no next slice and ask no human.


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

### Slice 2 — The kitchen-sink page drawn in React

- **Goal:** The kitchen-sink page is `src/browser/kitchen-sink/kitchen-sink.tsx`, which replaces `kitchen-sink.ts` (deleted). It is one React root on a host element the module appends to the body, never on the body itself, drawing every section of today — each shared control in its seven states or with the reason a state does not apply, the forms waiting and refused, the form „Nie pamiętam hasła” with the answer to its request, the part of the menu „Konto” for an unconfirmed address with „Wyślij ponownie” waiting and its refusal, every role and the tile samples — from the React forms of `src/browser/view/controls/react-*.tsx` and in JSX, with made-up values and never a game state. The page marker stays set on the body, and the module keeps exporting `PAGE_MARKER` (the invariant test imports it from `./kitchen-sink/kitchen-sink.js`). Beyond this entry module the page imports only modules the game uses; all code only the page needs stays in it. Hover and focus, which the page cannot hold, are forced by the sample's class on an element wrapping the control, not on the control's own element; `kitchen-sink.css` points its sample rules at the control inside the wrapper and keeps exactly one rule that sets an outline, with exactly two selectors, `:focus-visible` and the focus sample's selector. The shared controls get no prop for the page and do not change. A controlled field on the page gets a change handler or keeps its value in the sample's state, so that React reports nothing when the page loads. The page shows what the game draws: the number field has no hint (the DOM form's „liczba” goes), and „Przycisk wybrany w grupie” is `ReactButton` with `selected`. The empty state of the number field: right after the page's root is first drawn, synchronously, the entry module's own code — outside React, not in an Effect — takes that sample's input through the field's existing `inputRef` and types an empty text into it the way the test harness types (the input's native value setter, then a bubbling `input` event), so the field holds an empty draft; a comment in the module states this technique and why it stands there. Follow the styleguide's example "Plan of a user-interface change". No test is written or changed: the page's drawing has no test, and its compile is run by the invariant test's positive control. Every test stays green after this slice. In a real browser (`npm run kitchen-sink`; `.claude/skills/loop2-play/SKILL.md` says how a browser is operated here): every section and state draws as the styleguide's rule "States of shared controls" gives, the forced hover and focus samples look as the game draws those states, the empty number-field sample shows an empty field, and the console holds no report of React.
- **Change:** `src/browser/kitchen-sink/kitchen-sink.ts` · `src/browser/kitchen-sink/kitchen-sink.tsx` · `src/browser/kitchen-sink/kitchen-sink.css`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:14-14` Goals and non-goals, goal 1 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:23-30` Goals and non-goals, non-goals ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:143-150` Decision 5 — The kitchen-sink page in React ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:152-165` Decision 6 — The empty state of the number field on the page ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:200-205` Settlements of the cycle after the spec's review ·
  `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/react-text-field.tsx` ·
  `src/browser/view/controls/react-number-field.tsx` · `src/browser/view/controls/react-pick-cell.tsx` ·
  `src/browser/view/controls/react-select-list.tsx` · `src/browser/view/menu-bar.tsx` ·
  `src/browser/view/email-status.ts` · `src/browser/view/account-rules.ts` ·
  `src/browser/kitchen-sink/index.html` · `tsconfig.kitchen-sink.json` ·
  `tests/view/page-document.mjs:150-166` typeInto ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:4540-4553` D-44 · `foundations/decisions.md:4555-4568` D-45 ·
  `foundations/decisions.md:4585-4598` D-47 · `foundations/decisions.md:3088-3099` D-157 ·
  `foundations/decisions.md:4778-4822` D-274 · `foundations/decisions.md:8889-8928` D-289 ·
  `foundations/decisions.md:4525-4538` D-43 · `foundations/decisions.md:4036-4063` D-267 ·
  Foundation entries row 1 (D-269) · Foundation entries row 2 (D-265) ·
  Foundation entries row 7 (D-275) · Foundation entries row 8 (D-276) ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:35-43` browser-view-framework
- **Model:** same — an 833-line page rewritten in React with the forced states, the focus-outline invariant and a check in a real browser; a mistake shows only to the developer who opens the page
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_application_build_kitchen_sink.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_framework.py` · `npx eslint src/browser/kitchen-sink/kitchen-sink.tsx` · `npx prettier --check src/browser/kitchen-sink/kitchen-sink.tsx src/browser/kitchen-sink/kitchen-sink.css` · the page checked in a real browser
- **Depends on:** Slice 1
