# Handoff — one author, task `logowanie-na-tle-gry`

## Delegation

The human who requested this cycle (Mariusz) delegated intermediate choices to the cycle's
orchestrator. You are the one author. Send your questions to the orchestrator by returning
`questions`; never seek the human's approval, never start another stage, never run the product's
full gate as the cycle's gate (the orchestrator runs it), and never deploy anything.

## Where and how

- Worktree: `/home/user/loop2`, branch `claude/keen-curie-jazxic`, base `6864463` (`main`). Work
  from the worktree's root. You are the only writing agent. Commit on this branch; do not push.
- Method: `.the-way/task-cycle/change/SKILL.md` (in the pinned the-way, commit f45ca40). Read it
  whole; read a file it names only when the step or variant that names it comes.
- Variant: **the whole change as the one author**.
- Foundation step: `.the-way/task-cycle/skill/foundation_step.md` — you write the foundation entries
  the task carries with your code, as that file gives; read it whole, and the skill of an element
  when you write an entry of that element (project skills `the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-environment-fact`, `the-way-update-part-map`).
  Changes to `guidelines/testing.md` go through the project skill
  `the-way-maintain-testing-guidelines`, as To do 7 says.
- Frozen task: `.runs/task-cycles/logowanie-na-tle-gry/task.md` (vault commit e4a7d59, accepted
  2026-11-01). Read it whole: you make the whole change. Its line numbers come from loop2 commit
  48544f0 and have moved since (task 2 merged); find the places by their content. Paths in it of
  the form `C:\Storage\repos\loop\...` are `/home/user/loop/...` here; `C:\Storage\The Brain\The
  Brain\...` is `/home/user/the-brain/...`. Read outside the product as you need; write only in
  `/home/user/loop2`.
- Spec: none. Plan: none.
- Report: write your full report to
  `.runs/task-cycles/logowanie-na-tle-gry/reports/author.md`, as the method gives, and return your
  status, your commits, a one-line check result naming what failed or did not run, and the
  report's path.

## Answers of the cycle's start

- Trust boundary: **yes**. The change adds `assets/sprites/**`, a new trust boundary of
  `browser-view`: a file from outside the product (the Pixel Crawler pack) copied by the build into
  the directory the server serves. Every review will check crafted input at that boundary: that
  the build copies from `assets/sprites/` only `.png` files, that the PNG holds pixels alone
  (`sprite-file-content`), that nothing from `assets/sprites/` reaches the kitchen-sink output, and
  that the icon and font copies are unchanged.
- Irreversible operation: **no**. H1 (deploying the branch's commit to the test server and looking
  at the card there) is the human's, after the request opens.
- Open design choice: none found. The four *Questions carried to cycle* are yours to make and name
  in your report: how to compose the picture from the pack, its resolution, how it fits the window
  so that from a 1280 px wide window the fire and the mage stand beside the card (the card is 400 px
  wide, centred), and the fourth is answered below. If you meet a choice the task and the
  foundation leave open, return `returned` with no code, as the method gives.
- **Q1 (orchestrator's choice, binding):** the script that composes the picture does not enter the
  product repository. Compose the picture once with a tool outside the product (Python with Pillow
  is installed in this container) and keep the script, with the list of pack files and regions it
  takes, in `.runs/task-cycles/logowanie-na-tle-gry/reports/compose/`; the record's commit carries
  it. The product gains no dependency: if the change seems to need a library, a framework or
  anything that is not in `package.json` today, return `reserved` instead of adding it.
- Dimming lives in the PNG file itself, not in the styles (task *Context*: dimming in styles would
  need a new token with a source settled with the human). The card's background stays solid
  (`panel`), never half-transparent.

## Environment of this container

- Node 24.22.2 is first on PATH; `npm ci` has run; `python` is Python 3.14 as README requires,
  and `.runs/quality-venv` holds `ruff` and `shellcheck`; Pillow is installed for `python3`
  (Python 3.13), not for `python`. A Docker daemon is running, so the container tests
  (`tests/invariants/*container*`, `tests/deploy/`) run here; the local image `node:24-slim` is the
  pulled one with only this container's proxy CA added, so do not pull it again (Docker Hub limits
  pulls) and do not change the product's `Dockerfile` for the proxy. `npm test -- <file>` runs one
  test file. The full gate passed on the base (`reports/gate-base-2.log`, exit 0).
- The Pixel Crawler pack: `/home/user/loop/assets/pixel-crawler/` (repository `loop`, read only),
  with `Terms.txt`; how to cut its sheets: `/home/user/loop/assets/README.md`, section „Zanim
  czegokolwiek użyjesz”. You can view a PNG with the Read tool.
- To run the game and walk the card in a real browser: `.claude/skills/loop2-play/SKILL.md`.
  Chromium and Playwright are installed. The form „Ustaw nowe hasło” opens with the game's address
  plus `#reset-password=` and any text (task *Context*).

## Read

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
`guidelines/styleguide-browser-view.md`, `guidelines/testing.md`; and `src/browser/AGENTS.md`.

Foundation, each entry whole (decisions in `foundations/decisions.md` from `### <id>` to the next
`###`; invariants, facts and the part map entry from `## <id>` to the next `##`):

- Decisions: D-96, D-262, D-261, D-259, D-27, D-46, D-76, D-73, D-45, D-269, D-43, D-40, D-42,
  D-87, D-86, D-05, D-225, D-156, D-160, D-97, D-211, D-11, D-15.
- Invariants: `icon-file-content`, `font-file-provenance`, `loop2-container-icons`,
  `preview-server-access`, `application-build-kitchen-sink`, `application-build-output`,
  `browser-view-token-values`, `public-file-access`.
- Environment facts: `game-icons-licence`, `geist-licence` (as the shape of a licence fact).
- Part map: `browser-view`, `build-tools`, `deployment`, and the table *External context*.
- The task's *Decisions in play* quotes the projected entries word for word: `sprite-file-content`,
  `pixel-crawler-terms`, `browser-view (changed)`, the D-96 change, „Where may a picture of the game
  stand?”, „Where do the scene's pictures come from?”, `loop2-container-sprites`. Their source is
  `/home/user/the-brain/Notes/Projects/(P) Loop/definicja_mvp2_loop2.md`, section *Projected
  foundation changes*, where you may read each whole.

Code the task names: `scripts/static-files.mjs`, `scripts/kitchen-sink.mjs`, `scripts/build.mjs`,
`.dockerignore`, `Dockerfile`, `tests/invariants/test_loop2_container_icons.py`,
`src/browser/view/account-card.tsx` and where it is mounted, `src/browser/styles.css`,
`README.md`.
