# Handoff — review of the whole change, task `logowanie-na-tle-gry`

## Delegation

The human who requested this cycle (Mariusz) delegated intermediate choices to the cycle's
orchestrator. You review as an agent that made none of the change. Read-only: change no tracked
file, make no commit, push nothing, deploy nothing, never run the product's full gate (the
orchestrator runs it). Send questions to the orchestrator by returning `questions`; never seek the
human's approval.

## What and where

- Worktree: `/home/user/loop2`, branch `claude/keen-curie-jazxic`. Work from its root.
- Method: `.the-way/task-cycle/review/SKILL.md` (pinned the-way, commit f45ca40). Read it whole; a
  file it names (`whole_change.md` among them) when its step comes.
- What is reviewed: **the whole change**, range `6864463..f8d8e52` (base `6864463` = `main`).
  Route: one author without a plan; no spec, no plan, no slices. The process pin was not moved.
- Frozen task: `.runs/task-cycles/logowanie-na-tle-gry/task.md` (vault commit e4a7d59). Read it
  whole. Its line numbers come from loop2 commit 48544f0 and have moved; its paths
  `C:\Storage\repos\loop\...` are `/home/user/loop/...` here, and `C:\Storage\The Brain\The
  Brain\...` is `/home/user/the-brain/...`. The projected entries it cites stand whole in
  `/home/user/the-brain/Notes/Projects/(P) Loop/definicja_mvp2_loop2.md`, section *Projected
  foundation changes*.
- The author's report: `.runs/task-cycles/logowanie-na-tle-gry/reports/author.md`, with its
  composing script and evidence (screenshots, geometry, one-off scripts, logs) in
  `.runs/task-cycles/logowanie-na-tle-gry/reports/compose/`.
- You select your own foundation entries and guidelines, as the method gives.
- Report: write it to `.runs/task-cycles/logowanie-na-tle-gry/reports/whole-review.md`; its first
  line is `PASS <sha>`, `FAIL <sha>` or `questions`. Return that first line, the counts of findings
  by grade, a one-line check result naming what failed or did not run, and the report's path.

## Answers of the cycle's start

- Trust boundary: **yes**. The change adds `assets/sprites/**`, a new trust boundary of
  `browser-view` (a file from outside the product, the Pixel Crawler pack, copied by the build into
  the directory the server serves). Check crafted input at that boundary: that the build copies
  from `assets/sprites/` only `.png` files, that the PNG holds pixels alone (`sprite-file-content`),
  that nothing from `assets/sprites/` reaches the kitchen-sink output or the preview server, and
  that the icon and font copies are unchanged.
- Irreversible operation: **no**. H1 (deploying the branch's commit to the test server and the
  human's look at the card there) is the human's, after the request opens.
- Q1, the orchestrator's choice: the script composing the picture stays out of the product and is
  kept in the cycle record (`reports/compose/`); the product gains no dependency.

## Environment of this container

- Node 24.22.2 on PATH; `npm ci` has run; `python` is Python 3.14 and `.runs/quality-venv` holds
  `ruff` and `shellcheck`; Pillow is installed for `python3` (3.13), not for `python`. A Docker
  daemon runs; the local image `node:24-slim` is the pulled one with only this container's proxy CA
  added — do not pull it again (Docker Hub limits pulls). `npm test -- <file>` runs one test file.
  The full gate passed on the base (`reports/gate-base-2.log`, exit 0).
- The game runs locally as `.claude/skills/loop2-play/SKILL.md` gives (`npm run local`; stop it with
  `npm run local:stop`). `playwright-cli` is not installed; the Playwright library is at
  `/opt/node-tools/node_modules/playwright` with Chromium installed. You can view a PNG with the
  Read tool. The Pixel Crawler pack lies in `/home/user/loop/assets/pixel-crawler/`.
