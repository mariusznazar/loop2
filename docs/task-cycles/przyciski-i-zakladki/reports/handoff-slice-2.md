# Handoff — slice 2 of task `przyciski-i-zakladki`

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

## Slice 2

- Base: `14d07fc` (head after slice 1). Report path: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/reports/slice-2.md`. Screenshots: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/screenshots/` (create it; git ignores `.runs/`).
- Class: `cheaper`.

### The slice's section of the plan, copied word for word

### Slice 2 — the login card on the new controls, and its screenshots

- **Goal:** In `src/browser/view/account-card.tsx` „Nie pamiętam hasła”, „Wróć do logowania” and „Anuluj” are the secondary action of slice 1 in its React form, still buttons that change the card's state and lock with it (pytanie 1); the switch „Zaloguj się” / „Załóż konto” is two tabs — the variant of the button selected in its group, same element, `aria-pressed`, Tab reaches each, Enter or Space switches, focus goes to the address field (pytanie 2a, D-260) — in a container carrying the class of the tabs' group from slice 1; the button that sends each form keeps `submit` and so takes the main look. In `src/browser/styles.css` the screen of the card (`.account-card-screen`) gives the card a fixed top edge at 15% of the window's height (in `vh`, which is no value in place of a token, D-43) in place of the exact middle, the horizontal layout unchanged, so that unfolding the credits, switching a tab and the sentence appearing under a form move nothing above them; its comment no longer speaks of the middle (pytanie 4, *To do* 5); the rules and comments of `.account-card-switch` and `.account-form-switch` fit the tabs and the secondary action. The cases of `tests/view/account-screen.test.mjs` find the card's controls by element, attribute and text, so they are expected to pass unchanged; one that breaks is a finding for the report, changed only where it breaks for a reason this slice intends and named there as a file beyond *Change*. Then, by `.claude/skills/loop2-play/SKILL.md`, run the game with `npm run local` and save PNG screenshots of the card on the picture of the game at 1280 × 800 into `.runs/task-cycles/przyciski-i-zakladki/screenshots/` (ignored by git; commit nothing of them): each of the four states of D-259 — „Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła”, and „Ustaw nowe hasło” opened by an address with `#reset-password=` — the form „Nie pamiętam hasła” with the answer to a request, „Zaloguj się” with the credits unfolded, a refusal under a form, and keyboard focus on a tab and on a secondary action; name in the report every state not captured and why. Inspect them as the own-work check of the user interface, and measure with the page's layout that the tabs and „Autorzy grafiki” keep their top position between the states and when the credits unfold.
- **Change:** `src/browser/view/account-card.tsx` · `src/browser/styles.css` · `.runs/task-cycles/przyciski-i-zakladki/screenshots/*.png`
- **Read:** `.runs/task-cycles/przyciski-i-zakladki/task.md:17-39` Need and To do · `.runs/task-cycles/przyciski-i-zakladki/task.md:42-110` Questions to settle, pytania 1 to 4 · `.runs/task-cycles/przyciski-i-zakladki/task.md:135-200` pytanie 6b and Context · `.runs/task-cycles/przyciski-i-zakladki/task.md:210-260` Decisions in play, Settlements to record and Out of scope
  `foundations/decisions.md:792-806` D-36 · `foundations/decisions.md:822-836` D-38 · `foundations/decisions.md:837-866` D-39 · D-40 · `foundations/decisions.md:882-926` D-42 · D-43 · D-44 · `foundations/decisions.md:957-986` D-47 · D-48 · `foundations/decisions.md:1409-1421` D-73 · `foundations/decisions.md:1461-1475` D-77 · `foundations/decisions.md:1593-1618` D-87 · D-88 · `foundations/decisions.md:1773-1787` D-96 · `foundations/decisions.md:4119-4171` D-222 · `foundations/decisions.md:4219-4252` D-225 · `foundations/decisions.md:5161-5189` D-254 · `foundations/decisions.md:5281-5375` D-259 · D-260 · D-261 · D-262 · `foundations/decisions.md:5395-5457` D-264 · D-265 · `foundations/decisions.md:5486-5514` D-267 · `foundations/decisions.md:5642-5666` D-272
  Foundation entries rows 1, 2, 3 and 5, and the change of D-44
  `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:409-418` eslint-source-rules · `foundations/invariants.md:439-448` prettier-source-format · `foundations/invariants.md:459-478` browser-view-token-values · browser-view-focus-outline · `foundations/invariants.md:579-598` node-test-selection · focused-test-execution · `foundations/invariants.md:1189-1198` document-test-memory-limit
  `foundations/part_map.md:3-29` browser-view · `foundations/glossary.md:94-105` unit test · integration test
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md`
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/react-text-field.tsx` · `tests/view/account-screen.test.mjs:1-160` the page on jsdom and its helpers · `tests/view/account-screen.test.mjs:3384-3620` the login card
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/react-controls.test.mjs` · `npm run typecheck` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/quality/test_quality_invariants.py` · the game by `.claude/skills/loop2-play/SKILL.md` (`npm run local`, Playwright CLI, or Playwright MCP where the CLI fails): the screenshots inspected and the top positions measured, `npm run local:stop` at the end
- **Depends on:** Slice 1 · Foundation entries rows 1, 2, 3, 5 · D-44 changed

### Current ranges (they hold where they differ from the plan's)

- `foundations/decisions.md` at `14d07fc`: D-36 792-806 · D-38 822-836 · D-39 837-851 · D-40 852-866 · D-42 882-896 · D-43 897-911 · D-44 912-926 · D-47 957-971 · D-48 972-986 · D-73 1409-1421 · D-77 1461-1475 · D-87 1593-1605 · D-88 1606-1618 · D-96 1773-1787 · D-222 4119-4172 · D-225 4220-4253 · D-254 5162-5190 · D-259 5282-5306 · D-260 5307-5329 · D-261 5330-5353 · D-262 5354-5376 · D-264 5396-5427 · D-265 5428-5469 · D-267 5498-5526 · D-272 5654-5678.
- The plan's „Foundation entries rows 1, 2, 3 and 5, and the change of D-44” are: row 1 → D-274 (5710-5744); row 2 → D-275 (5745-5771); row 3 → D-276 (5772-5810); row 5 → D-278 (5831-5853); D-44 changed (912-926). Read each whole.
- `src/browser/styles.css`, `src/browser/view/controls/button.ts` and `react-button.tsx` changed in slice 1 (commit `14d07fc`); read them as they stand.

### What slice 1 made, from its report (`reports/slice-1.md`)

- `ReactButton` takes `kind: "secondary" | "tab"`; the DOM `createButton` takes `{ kind: "secondary" | "tab" }`. The tab is `kind: "tab"` together with the existing `selected`; the tabs' container takes the class `tabs`, which draws the thin `divider` line under the group. The main look stands on every `type="submit"` button with no option.
- `.form-note` (the sentence under a form) stands in `text` with its bar; `padding-left: var(--space-s)` separates it from the bar.
- After slice 1 the login card does not yet use the new kinds or the `tabs` class: only its submit buttons and the sentence under „Nie pamiętam hasła” changed look.
- Slice 1 checked the computed looks on a scratch page in Chromium through the Playwright library; it did not inspect the running game or keyboard focus in a browser.
