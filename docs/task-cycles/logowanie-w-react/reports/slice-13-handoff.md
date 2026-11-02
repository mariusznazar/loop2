# Handoff — Slice 13, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 8f242a2a70319b807112bcaf3a777d2bfd8a7f07. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Read every file and range of your *Read* before you write code, one per call; a read cut short is read again, and your report says what you read. Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-13.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 13 — README and the deploy skill say what stands

- **Goal:** `README.md` stops saying „gra w przeglądarce zbudowana na DOM” at `:3` and says the view is built with React, and its step of `npm run build` at `:25` says the build compiles both parts into `dist/browser` and `dist/server`, bundles the browser's code into `dist/public` with esbuild and copies the rest there. Any other sentence of the file that this change makes untrue goes with them. The skill `loop2-deploy` describes the card instead of two forms, the same in both copies: `references/setup_and_secrets.md:328` and `:343` and `SKILL.md:225`. The skill `loop2-play` says at `SKILL.md:58` „Under „Załóż konto”, fill…”, which now takes a press of the switch first: it says so, the same in both copies, with any other sentence of that skill the card makes untrue.
- **Change:** `README.md` · `.claude/skills/loop2-deploy/SKILL.md` · `.claude/skills/loop2-deploy/references/setup_and_secrets.md` · `.agents/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/references/setup_and_secrets.md` · `.claude/skills/loop2-play/SKILL.md` · `.agents/skills/loop2-play/SKILL.md`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:40-40` To do 11 ·
  `.runs/task-cycles/logowanie-w-react/task.md:50-53` To do 17 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:32-32` Constraints, moved lines ·
  `tests/agent_workflow/test_loop2_deploy_skill.py` · rows F1, F2, F18, S6
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`; `npm test -- tests/agent_workflow/test_loop2_play_skill.py`; `git grep -n "zbudowana na DOM" -- README.md`, which finds nothing
- **Depends on:** Slice 11 · F1 · F2 · F18 · S6

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `tests/agent_workflow/test_loop2_deploy_skill.py`
- `foundations/decisions.md:39-51` D-03
- `foundations/decisions.md:135-154` D-06
- `foundations/decisions.md:5460-5487` D-266
- `foundations/decisions.md:5376-5394` D-263

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:40-40` To do 11

11. README mówi prawdę o budowaniu: zdanie „gra w przeglądarce zbudowana na DOM” (`README.md:3`) i opis kroku `npm run build` (`README.md:11`).

### `.runs/task-cycles/logowanie-w-react/task.md:50-53` To do 17

17. Skill `loop2-deploy` przestaje mówić o dwóch formularzach i opisuje kartę, w obu kopiach, `.claude/skills/loop2-deploy/` i `.agents/skills/loop2-deploy/`:
   - `references/setup_and_secrets.md:328`: „Signed out, the page shows the two forms and no game or Program panel.”
   - `references/setup_and_secrets.md:343`: „Logout shows the forms again and no game.”
   - `SKILL.md:224`: „A blocked player who reloads the page sees the forms again”.

### `.runs/task-cycles/logowanie-w-react/spec.md:32-32` Constraints, moved lines

- The task's *To do*, *Acceptance criteria*, eleven answered questions and six rows of *Settlements to record* are settled. Lines it cites moved on the base: `showForms` is at `src/browser/view/app.ts:268`, `root.append(header, main, createFooter());` at `:445`, the title „Loop” at `:134`, the README step of `npm run build` at `README.md:25` and the sentence „sees the forms again” at `.claude/skills/loop2-deploy/SKILL.md:225`. The runner counts 69 cases in `tests/view/account-screen.test.mjs`, where the task says 67.
