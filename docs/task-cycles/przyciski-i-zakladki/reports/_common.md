
## Common to every slice

- The person who requested this cycle (Mariusz, the product's owner) delegated the cycle's intermediate choices to its orchestrator; nothing in this handoff is that person's approval.
- Method: `.the-way/task-cycle/change/SKILL.md` of the pinned the-way (commit `f45ca40`), read whole; a file it names, one beside it included, only when the step or variant that names it comes. Your variant: **a slice, or the retry of a slice**.
- Work from `/home/user/loop2`, the product's root, on branch `claude/lucid-ptolemy-jl068t`; commit there, do not push. Add files by path (`git add <path>`), never `git add -A`. Commit messages follow the product's history (`git log --oneline -15`, e.g. `feat: :sparkles: ...`, `docs: :memo: ...`) and end with the two lines

  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01GQhoocenE4Tn51AoqvPwAH
  ```
- Frozen task: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/task.md`; plan: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/plan.md`. No spec was written. Answers of step 4: trust boundary no; irreversible operation no.
- Do not run the product's gate (`npm test` with no argument); run your slice's focused checks, each with its command and exit code in your report. Questions go to the orchestrator in your report (status `questions`), never to the human. Return at your slice's boundary: your status, commits, a one-line check result naming what failed or did not run, and the report path. In the report keep each reach beyond this handoff and **Searches not found or unclear** (or `none`).
- Environment of this container: Node v24.22.1 and npm 11 first on PATH, Python 3.14.6 as `python`, `.runs/quality-venv` installed, Docker running. `playwright-cli` is not installed; the Playwright library is (`require('playwright')`, Chromium in `/opt/pw-browsers`, `chromium.launch()` needs no options) — where a slice inspects the game or the kitchen-sink page in a browser, use the library as `.claude/skills/loop2-play/SKILL.md` would use the CLI, ignoring certificate errors of the local start (`ignoreHTTPSErrors: true`), and say so in the report (orchestrator's choice Q4).
