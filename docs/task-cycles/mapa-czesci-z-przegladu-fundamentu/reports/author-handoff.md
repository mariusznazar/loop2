# Handoff — the one author of the change

You are the one author of a change in a task cycle of the-way, with no plan. The person who requested the cycle has delegated intermediate choices to the orchestrator; no go-ahead of the orchestrator is the human's approval. You ask the human nothing: a question goes back to the orchestrator in your return.

## Where you work

- Worktree, which is your working directory and the root every command runs from: `the task's worktree` (branch `task/mapa-czesci-z-przegladu-fundamentu`, base `ea6383975cb72e875d215dfc23c171cafb838207`). Never `cd` to the main checkout. Commit explicitly by path (`git add <file> <file>`), never `git add -A`, `git add .` or `git commit -a`; commit messages in English, in the form of the repository's earlier commits (`docs: :memo: …`).
- Pinned the-way: `.the-way` of the worktree, at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, which equals the gitlink. Run its scripts as `python -B .the-way/<path>`.
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant **"the whole change as the one author"**. Read that `SKILL.md` whole; read a file it names only when the step or variant that names it comes.
- The foundation step: read `.the-way/task-cycle/skill/foundation_step.md` whole; it tells how you write the entries the task carries, and reads the `SKILL.md` of an element at the path it gives when you write an entry of that element. You have no skill tool: every skill the product's `AGENTS.md` names (`the-way-update-part-map`, `the-way-record-invariant`, …) is read as a file, as `foundation_step.md` gives.
- The return step is not yours now: you resume for it later with `.the-way/task-cycle/skill/return_step.md`.
- Your directory for working copies: `.runs/author/` (directly under `.runs/` of the worktree).
- Your full report goes to `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/author-report.md`, in the form your method gives, with **Unread material** and **Searches not found or unclear** (each `none` where it is), your own-work check, each check with its command and exit code.

## The task

The frozen task, which you read whole: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/task.md` (copy of the approved task document; `Status: ready for cycle`, `Project relation: independent`). Its *To do* items 1-7 are the change; its *Settlements to record* rows 1 and 2 are the two invariants you write; its *Questions to settle* hold the answers that bind; its *Out of scope* holds what you must not do. Write nothing that goes beyond it. A thing the task does not settle is not yours to settle: return it as a question, with the smallest reversible reading you would take.

## The answers of the two questions at start

- Trust boundary: **yes**. The change writes the boundaries of the part map: three files of `src/browser/view/` into the *Trust boundary* of `browser-view`, and `compose.yaml`, `.github/workflows/deploy.yml`, `Dockerfile`, `deploy/cloudflared.Dockerfile` into that of `deployment`; it also marks the existing refusal tests of those files. The two new invariants are rules of refusal of crafted input at those boundaries, so each must say what is refused and the test that refuses it must really refuse (check each marked test against its rule, not against its name). Every code review of the cycle is told this.
- Irreversible operation: **no**.

## What you read, named by me (WAY-150, WAY-213)

Whole files of the product:

- `foundations/part_map.md`, `foundations/glossary.md`.
- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (the last because `tests/view/**` are files of `browser-view` and `AGENTS.md` asks for it before a file of that part changes; the change draws no screen). The kind file of `coding.md`'s index only if a row of its index matches work you do.
- The invariants the work reaches in `foundations/invariants.md`: those whose *Part* names `browser-view`, `deployment`, `agent-workflow`, `account-server`, `build-tools` or `every`, found by a search of *Part*, read whole as far as the work needs them; each invariant a test you change cites by `invariant:` (`email-confirmation-link`, `password-reset-link`, `loop2-deploy-trigger-input` and the like), and the invariants these name in *Relations*, *Rests on* and *Verification*.
- The decisions: the index I wrote at `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/decision-index.md` (selected by the sections "Testing discipline", "The server: hosting, deployment, logs and failure reports", "Browser view: screens, navigation and their code", "Account email and password reset", "Architecture and technology" and by the parts `browser-view`, `deployment`, `agent-workflow`, `product-foundation`, `build-tools`, `account-server`; `*Decisions in play*` of the task added). Of it open whole in `foundations/decisions.md` only: D-281, D-210, D-351, D-09, D-10, D-11, D-237 (the task's *Out of scope* quotes it), D-76 and D-273 (the temporary departures the task names), D-73 (the template), and each decision whose sentence a test you change holds by a line `decision:`. For D-281 and any decision your entries go against, read its *Rejected* as well.
- The glossary entries of the terms the entries use.

Process files by path, as the method and the foundation step name them: the element `SKILL.md`, `template.md`, `rules.md` and `examples.md` of `invariants` and `part-map` in `.the-way/elements/` (the foundation step gives the path), and `.the-way/elements/common/way_of_working.md` whole.

Files of the change, which you inspect to establish what is there: `src/browser/view/screen-address.ts`, `email-confirmation.ts`, `password-reset.ts`; `tests/view/screen-address.test.mjs`, `email-confirmation.test.mjs`, `password-reset.test.mjs`; `compose.yaml`, `.github/workflows/deploy.yml`, `Dockerfile`, `deploy/cloudflared.Dockerfile`, `tests/deploy/test_deploy_workflow.py`; `.claude/skills/loop2-play/compose-state.mjs` and its copy in `.agents/skills/loop2-play/`, `tests/invariants/test_cross_part_imports.py`; `tests/deploy/test_restore_trial.py`, `tests/invariants/account_container_support.py`, `scripts/restore-trial.mjs`; `.gitattributes`.

## Boundaries and orders of the cycle

- Boundary: the foundation entries (part map, two invariants), the one row of the table of trust boundaries in `guidelines/testing.md` (item 1 and 2 of the task, so two rows or one row per boundary as the table's form asks), the markers `// invariant: <id>` (or the form the testing guidelines and neighbouring tests give for the language) in the four test files, with each marked test **shown failing once**. The files of the boundaries themselves (`screen-address.ts` and the others, `deploy.yml`, `compose.yaml`, both Dockerfiles) are not changed in the commits.
- Showing a failure once (task item 1 and 2, `guidelines/testing.md` "Trust boundaries"): for each marked test, break the guarded behaviour in a working copy under `.runs/author/` (a worktree or copy of the tree), run that one test file and see it fail for the reason of the rule, restore, run it and see it pass. Report each pair with its command and exit code. A mutation is never committed. If a test does not fail when the guarded behaviour is broken, it is not a test of refusal of that rule: say so in the report and do not mark it; return it as a question, and the orchestrator decides.
- **Do not run the full gate** (`npm test`, `npm run test`) and no mechanical check that runs the whole of it. The orchestrator runs it, when the human's adviser gives the signal. Your checks are focused ones: `python -B .the-way/elements/common/foundation_check.py` (the foundation check, on the whole tree; with `--skip-test-citations` while a test of an invariant is still to be written), `python -B .the-way/instruction-files/check_instructions.py`, the one test file you changed or marked, `python -B -m unittest tests.invariants.test_cross_part_imports` and the tests of `tests/deploy/` and `tests/invariants/` that open the files you move between parts. Moving `account_container_support.py` and `.gitattributes` between parts, and adding `simulation` to `agent-workflow`, must leave `foundation_check.py` with `0 errors` (a file claimed by two parts, or by none, is an error). After the last commit run the foundation check without the switch and report its output.
- The *Depends on* of `agent-workflow` gets `simulation` as a **rule with its reason** (task item 4, *Questions to settle*, fourth answer): the skill to play the game composes the game state from functions of the simulation. State that reason in the part-map entry where the template lets a part carry a reason, and in your report in words the request's description can copy; the description names the gap of the test `cross-part-imports` (it does not see `import()` with a path built in code, which `compose-state.mjs` uses to load the simulation). Do not rewrite *Depends on* of any part beyond what the task names.
- Task item 3: `scripts/restore-trial.mjs` stays with no trust boundary (nothing to write for it; the report says you looked).
- Task item 5: `simulation` out of *Depends on* of `account-server`; `browser-view` stays. Check the claim "no file of `account-server` imports anything from the simulation" yourself and report the command.
- Task items 6 and 7: `.gitattributes` to *Files* of `build-tools`, `tests/invariants/account_container_support.py` to *Files* of `deployment`; `tests/deploy/test_restore_trial.py` stays in `deployment`. After the move, check that each file git tracks belongs to exactly one part, by the foundation check.
- Where an entry, an identifier or a test name is cited in several places (`guidelines/testing.md`, other invariants' *Relations*, test markers), update every place the foundation step's search of the foundation finds, and name the places in the report.
- The part-map entry of a part carries no history: write the entries as the present state (`the author's rule for artifacts of knowledge, which lies outside the repository` is the owner's rule for artifacts of knowledge, but it is outside the repository; follow the templates and rules of the-way for the form).
- Language: foundation entries and guidelines in the language and form of their neighbours (the guidelines file `guidelines/testing.md` is written in Polish and English mixed as you see it; keep the language of the table you edit). Code and comments in English.
- You write no entry beyond the two invariants of *Settlements to record*; where the foundation step's search finds that a decision, a glossary term or a fact must follow, name it in the report as a finding and write it only if the task's rows or the foundation step's rules make it a consequence with no way left open.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits (the range from the base), one line naming each check that failed or did not run, the path of your report, your questions and concerns, your reaches beyond this handoff (a part or a file you read that I did not name), **Unread material**, **Searches not found or unclear**. Nothing uncommitted stays in the worktree. You return at your boundary: you start no review and no gate.
