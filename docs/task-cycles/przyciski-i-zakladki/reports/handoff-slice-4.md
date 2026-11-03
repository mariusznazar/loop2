# Handoff — slice 4 of task `przyciski-i-zakladki`

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

## Slice 4

- Base: `1975f89` (head after slice 3). Report path: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/reports/slice-4.md`.
- Class: `same` (Opus) — the plan's reason: it writes the binding wording that later screens follow across several rules of the styleguide.
- The project skill `the-way-maintain-styleguide` leads refinement with a human; in this cycle there is no human contact. Work as its column for the cycle's author in `implement-task` gives (the planner's reading: `.the-way/product-guidelines/styleguide/SKILL.md`, „Where the skill works”). The matters it would lead with the human are already settled by the task's answers; a matter they leave open is a question to the orchestrator in your report, never a choice you settle in the guideline's binding wording.

### The slice's section of the plan, copied word for word

### Slice 4 — the styleguide of the browser view

- **Goal:** Through `the-way-maintain-styleguide`, as the cycle's author writes a styleguide's file by `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md`, `guidelines/styleguide-browser-view.md` gains the main button, the secondary action and the tab: their look, their states and where they apply (pytania 1b, 2b: the main look only on the button that sends a form; text only for actions that open or leave a state of a form and stand under it; the tab a look of the button selected in its group, keyboard as the button's); the mark of the current position of a menu bar (pytanie 2b); the principle of pytanie 3b, that a line at a text takes that text's colour; and entries on its list of controls departing from the states for the secondary action and the tab, by their paths. The sentence after a request for a password-reset link stands there in `text` with its bar, and every wording that gives it `text-secondary` goes — in the rules "States of shared controls" and "The kitchen-sink page" included. Each changed rule cites its decisions, the entries of the plan's *Foundation entries* among them. The rule set keeps the nine required rules in the template's order (D-38). The task's deliberate audit covered the card alone (task, *Context*); no other screen is audited.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/przyciski-i-zakladki/task.md:15-139` Description and Questions to settle · `.runs/task-cycles/przyciski-i-zakladki/task.md:141-200` Context · `.runs/task-cycles/przyciski-i-zakladki/task.md:210-260` Decisions in play, Settlements to record and Out of scope
  `foundations/decisions.md:822-866` D-38 · D-39 · D-40 · `foundations/decisions.md:882-941` D-42 · D-43 · D-44 · D-45 · `foundations/decisions.md:957-986` D-47 · D-48 · `foundations/decisions.md:4119-4171` D-222 · `foundations/decisions.md:5281-5328` D-259 · D-260 · `foundations/decisions.md:5427-5457` D-265 · `foundations/decisions.md:5560-5585` D-269
  Foundation entries rows 1 to 4, 6 and 8, and the changes of D-44, D-222 and D-40
  `foundations/invariants.md:459-508` browser-view-token-values · browser-view-focus-outline · design-token-contrast · design-token-sources · application-build-kitchen-sink
  `foundations/part_map.md:3-29` browser-view · `foundations/part_map.md:118-134` agent-workflow
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  `.claude/skills/the-way-maintain-styleguide/SKILL.md` · `.the-way/product-guidelines/styleguide/SKILL.md` · `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/styleguide/template.md`
  `src/browser/styles.css` · `src/browser/tokens.css` · `src/browser/view/controls/button.ts` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/text-field.ts` · `src/browser/kitchen-sink/kitchen-sink.ts`
- **Model:** same — it writes the binding wording that later screens follow across several rules of the styleguide, keeping to the template and to the task's answers without adding a meaning they do not carry
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · Foundation entries rows 1, 2, 3, 4, 6, 8 · D-44 changed · D-222 changed · D-40 changed

### Current ranges (they hold where they differ from the plan's)

- `foundations/decisions.md` at `1975f89`: D-38 822-836 · D-39 837-851 · D-40 852-866 · D-42 882-896 · D-43 897-911 · D-44 912-926 · D-45 927-941 · D-47 957-971 · D-48 972-986 · D-222 4119-4172 · D-259 5282-5306 · D-260 5307-5329 · D-265 5428-5469 · D-269 5572-5597.
- The plan's „Foundation entries rows 1 to 4, 6 and 8, and the changes of D-44, D-222 and D-40” are: row 1 → D-274 (5710-5744); row 2 → D-275 (5745-5771); row 3 → D-276 (5772-5810); row 4 → D-277 (5811-5830); row 6 → tied to the changed D-44 (912-926); row 8 → D-279 (5854-5877); D-44, D-222, D-40 changed (ranges above). Read each whole.
- Code read as it stands after slices 1–3: `src/browser/styles.css`, `src/browser/tokens.css`, `src/browser/view/controls/button.ts`, `react-button.tsx`, `text-field.ts`, `src/browser/kitchen-sink/kitchen-sink.ts`.

### What slices 1–3 made, from their reports

- Slice 1 (`reports/slice-1.md`, commit 14d07fc): the shared button has five kinds — `plain`, `destructive`, `selected`, `secondary`, `tab` — in both forms (DOM `createButton({ kind })`, React `ReactButton kind="secondary" | "tab"`); a tab is `kind: "tab"` with `selected`; the tabs' container has the class `tabs`, which draws the thin `divider` line of `--frame-width` under the group; the main look stands on every `type="submit"` button, with no kind or option of its own; `.form-note` stands in `text` with a left bar in `currentColor` of `--bar-width` and `padding-left: var(--space-s)`; `--bar-width` keeps 2 px with a widened `Source:`.
- Slice 2 (`reports/slice-2.md`, commit 06923e1): the login card's switch is two tabs in `div.account-card-switch.tabs`; „Nie pamiętam hasła”, „Wróć do logowania” and „Anuluj” are the secondary action; the card's top edge stands at 15vh.
- Slice 3 (`reports/slice-3.md`, commit 1975f89): the kitchen-sink page gives the secondary action and the tab, for the state „loading”, these reasons — keep the styleguide's list of controls departing from the states consistent with them:
  - „Nie dotyczy: na serwer czeka tylko przycisk, który wysyła formularz; akcja poboczna jest wtedy wyłączona (D-275).”
  - „Nie dotyczy: na serwer czeka tylko przycisk, który wysyła formularz; zakładka jest wtedy wyłączona, z linią wyboru (D-276).”
- The planner noted (`reports/planner.md`): `guidelines/styleguide-browser-view.md:245-260` lists the sources of values settled in the task „Styleguide loop2”; the new source of `--bar-width` (Mariusz's choice from the preview of the card's variants, 2026-11-02) is of a kind not listed there; judge whether the rule needs it.
