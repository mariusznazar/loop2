# Handoff — slice 5 of task `przyciski-i-zakladki`

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

## Slice 5

- Base: `e326fa0` (head after slice 4). Report path: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/reports/slice-5.md`.
- Class: `cheaper`.
- The project skill `the-way-maintain-coding-guidelines` leads refinement with a human; in this cycle there is no human contact. Work as its column for the cycle's author in `implement-task` gives (`.the-way/product-guidelines/coding/SKILL.md`), with the task's deliberate departure of pytanie 5a. A matter the task's answers leave open is a question to the orchestrator in your report.

### The slice's section of the plan, copied word for word

### Slice 5 — the statuses of the DOM modules in the coding guidelines

- **Goal:** Through `the-way-maintain-coding-guidelines`, as the cycle's author writes coding guidelines by `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md`, with the deliberate departure of pytanie 5a — no full audit of the code and no trial run of the tools — the table *Files of this kind* of `guidelines/coding-browser-module.md` gives the status `do not copy` to the 17 files the task's *Context* lists, and keeps `copy` at `account-rules.ts`, `clock.ts`, `credits.ts`, `password-reset.ts`, `terrain-picture.ts`, `credits-section.tsx` and the files of `controls/` (pytanie 5); a file slice 1 added under `src/browser/view/` gets its row as a control's file. The guidelines gain the three notes of pytanie 5: a new screen is not built on the pattern of these files, as the changed D-265 also says; the status does not forbid importing their pure functions; the examples from `status-row.ts`, `app.ts` and `game-view.ts` are about maintaining a screen that stays in DOM; with pytanie 5b's limit that an addition to a screen still in DOM may be made in DOM. The example of the controls is changed only where slice 1 made it untrue. Each changed rule cites its decision.
- **Change:** `guidelines/coding-browser-module.md`
- **Read:** `.runs/task-cycles/przyciski-i-zakladki/task.md:17-39` Need and To do · `.runs/task-cycles/przyciski-i-zakladki/task.md:111-123` Questions to settle, pytania 5, 5a, 5b · `.runs/task-cycles/przyciski-i-zakladki/task.md:141-151` Context · `.runs/task-cycles/przyciski-i-zakladki/task.md:210-260` Decisions in play, Settlements to record and Out of scope
  `foundations/decisions.md:676-690` D-28 · `foundations/decisions.md:792-806` D-36 · `foundations/decisions.md:912-926` D-44 · `foundations/decisions.md:5427-5457` D-265 · `foundations/decisions.md:5486-5514` D-267 · `foundations/decisions.md:5560-5585` D-269
  Foundation entries row 7 and the change of D-265
  `foundations/invariants.md:35-44` browser-view-framework
  `foundations/part_map.md:3-29` browser-view · `foundations/part_map.md:118-134` agent-workflow
  `guidelines/coding.md` · `guidelines/coding-browser-module.md`
  `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.the-way/product-guidelines/coding/SKILL.md` · `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md`
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/react-button.tsx`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Foundation entries row 7 · D-265 changed

### Current ranges (they hold where they differ from the plan's)

- `foundations/decisions.md` at `e326fa0`: D-28 676-690 · D-36 792-806 · D-44 912-926 · D-265 5428-5469 · D-267 5498-5526 · D-269 5572-5597.
- The plan's „Foundation entries row 7 and the change of D-265” are: row 7 → tied to the changed D-265 (5428-5469), which now carries the rule on a new screen whole; read it whole.
- `src/browser/view/controls/button.ts` and `react-button.tsx` as they stand after slice 1.

### What slice 1 made, from its report

- No file was added under `src/browser/view/` in slices 1–3; the secondary action and the tab are new kinds of the shared button in `controls/button.ts` (DOM, `createButton({ kind: "secondary" | "tab" })`) and `controls/react-button.tsx` (React, `kind="secondary" | "tab"`).
