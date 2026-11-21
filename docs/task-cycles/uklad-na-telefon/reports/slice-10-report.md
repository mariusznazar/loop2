done with concerns

# Slice 10 report — the destructive button in danger at rest

## Status and commit

- Status: `done with concerns`. The concerns are listed under "Questions and concerns" below; none blocks the slice.
- Commit on `task/uklad-na-telefon`: `f40ec226` (not pushed). Base was `347adcb7`.
- Commit author shows `the author's private address`, from the conditional git identity the rules describe for the `mariusznazar` remote; nothing was changed to it.

## Changed files (git diff --stat before the commit)

| File | Change |
|---|---|
| `src/browser/styles.css` | the destructive rule: the two `:hover:not(:disabled)` / `:focus-visible` selectors become one `.button.destructive { color: var(--danger); }` outside any media block, with a new comment (lines ~341-349) |
| `tests/view/shared-controls.test.mjs` | new case "a destructive button has its text in danger at rest, a plain one in text, and a disabled one in text-disabled", plus the import of `gameStylesheetText` from `./game-stylesheets.mjs` (+31 lines) |
| `src/browser/view/controls/react-button.tsx` | outside *Change*, widened by the orchestrator: the comment on the kind `destructive` (line 10) now says the text is `danger` at rest; comment text only |
| `tests/view/program-list.test.mjs` | outside *Change*, widened by the orchestrator: the comment at ~line 392 "D-44: neutral at rest …" now says "its text in `danger` at rest"; comment text only, re-wrapped to the line width |

## Test first

The new case was written before the rule changed. Run with the old rule:

- command: `npm test -- tests/view/shared-controls.test.mjs`, exit code **1**
- result: 51 tests, 50 pass, 1 fail — the new case, `Error: expected "var(--danger)", got "var(--text)"` (the rule at rest did not exist yet, so the text took the plain `text` colour). This is the assertion failing for the expected reason, not a missing module.

## Checks run

| Check | Command | Exit | Result |
|---|---|---|---|
| The new case, after the rule change | `npm test -- tests/view/shared-controls.test.mjs` | 0 | 51 tests, 51 pass, 0 fail |
| Token-values invariant | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | Ran 4 tests, OK |
| Build of the game (also used for the running check) | `npm run build` | 0 | — |
| Running game at 1280 × 720, "Usuń" of a rule | `npm run local` (background), then Playwright CLI with `.playwright/cli.config.json` | — | see table below |
| Kitchen-sink page | `npm run kitchen-sink` (background), Playwright CLI | — | see table below |

Not run, on purpose: the full gate `npm test` with no argument (the handoff forbids it), `foundation_check.py`, and the phone-layout check at 360 px (the slice names none; the new rule sits outside any media block, so it applies there too, but I did not look at the phone layout).

### Running game, 1280 × 720, rule panel "Usuń" (computed `color` read through Playwright CLI)

Account made through the login card (`agent@example.test`); a game state was composed with `.claude/skills/loop2-play/compose-state.mjs`, sent with `PUT /api/saved-game` (200, revision 1); "Mapy" → "Skraj lasu" → "Wejdź: Agent" started the run; "+ reguła" added a rule "Eksploruj", whose row shows "Usuń".

| State | Base `347adcb7` (served stylesheet swapped to the base `styles.css` for this shot) | After (this commit) |
|---|---|---|
| at rest, pointer away | `rgb(212, 212, 216)` — neutral (plain `text`), no background | — (see next row) |
| at rest, after rebuild | — | `rgb(255, 100, 103)` = `#ff6467` = `danger`, background `rgba(0,0,0,0)` |
| under the pointer | `rgb(255, 100, 103)` on `rgb(39, 39, 42)` = `highlight` | `rgb(255, 100, 103)` on `rgb(39, 39, 42)` = `highlight`, hover true |

The header buttons "Restart" and "Zakończ" are also in `danger` at rest in the after screenshot (both are destructive).

Screenshots (working copies, see "Working copies" below): before at rest, before under the pointer, after at rest, after under the pointer. I looked at the before-at-rest and after-at-rest images: the rule's "Usuń" is neutral before and red after; nothing else on the screen moved.

Disabled "Usuń" of a program in the program panel reads `rgb(82, 82, 92)` = `text-disabled` in the base run; I read it only in the base run and did not re-read it after the change (the after read filtered disabled buttons out).

### Kitchen-sink page (`npm run kitchen-sink`, served at `http://127.0.0.1:53688/` during the check), computed colours of `button.destructive`

| Sample | Colour | Background |
|---|---|---|
| "Zakończ", at rest | `rgb(255, 100, 103)` = `danger` | transparent |
| "Zakończ", under the pointer (wrapper `sample-hover`) | `danger` | `rgb(39, 39, 42)` = `highlight` |
| "Zakończ", at focus (wrapper `sample-focus`) | `danger` | transparent |
| "Zakończ", disabled | `rgb(82, 82, 92)` = `text-disabled` | transparent |
| "Zacznij od zera", disabled | `text-disabled` | transparent |

The kitchen-sink page itself was not changed; it shows the new look with its own code unchanged, as the handoff asks.

## Own-work check (method section 3)

- **Requirement** (task item 8, Question 4; plan slice 10 goal): the destructive button's text is `danger` at rest in every layout, one style; under the pointer it adds `highlight`, frame unchanged; disabled it is `text-disabled`.
- **Check written:** the new test case in `shared-controls.test.mjs` (drawn through the real stylesheets, which is how the file's other cases read them).
- **What it showed:** the case failed before the rule (`got "var(--text)"`) and passed after (51/51). In the running game and on the kitchen-sink page the computed colours match the requirement at rest, under the pointer and disabled.
- **Likely gap, not checked:** the phone layout at 360 px. The rule has no media block, so I expect the same result, but I did not look.

## Walk (walkthrough.md)

The change alters what a user sees (the destructive button's text colour at rest), so a walk applies. The plan of cases, in the order their state builds:

| Case | By what | Verdict |
|---|---|---|
| Destructive "Usuń" of a rule at rest is `danger` at 1280 × 720 | running game, Playwright CLI, computed colour and screenshot | pass (`rgb(255,100,103)`) |
| Same button under the pointer: `danger` text on `highlight` | running game, hover, computed colour and screenshot | pass |
| Plain buttons unchanged (the new test's plain case, "Anuluj") | `shared-controls.test.mjs` through the real stylesheets | pass (`var(--text)`) |
| Disabled destructive button stays `text-disabled` | kitchen-sink page, disabled samples; test case | pass |
| Focus of the destructive button | kitchen-sink wrapper `sample-focus` | pass (`danger`); the global focus outline was not inspected |
| Header "Restart", "Zakończ" red at rest | running game, screenshot after the change | pass (seen; not measured) |
| side observation | see Questions and concerns (kitchen-sink.css comment) | noted |

What I did not check, and why: the phone layout (not named by the slice); the global focus outline on the game's own destructive button (I looked only at the kitchen-sink wrapper); "Zacznij od zera" in the running game (disabled-state sample used instead). No error outside the task's scope was found.

## Choices made

- The rule is one `.button.destructive { color: var(--danger); }` outside any media block; the hover and focus selectors were removed, since at rest the colour is the same. Way rejected: keep the `:hover`/`:focus-visible` rule and add a rest rule beside it — that leaves three selectors for one colour. Cost if wrong: none seen; the disabled rule (`.button:disabled`, later in the file, same specificity) still wins, so disabled stays `text-disabled`.
- The new test's comment cites D-44 with its opening sentence ("The screens of the browser view build every button, select list, number field, text field and cell of a pick from the shared controls of `src/browser/view/controls/`"), which the decision text contains verbatim, so the citation holds the sentence a test quotes (plan choice row 7).

## Working copies (dispatch paragraph)

- Working directory: `.runs/slice-10` — held the four screenshots (`before-rest.png`, `before-hover.png`, `after-rest.png`, `after-hover.png`), the test and build logs, and a copy of the base `styles.css`. Removed before return, as the dispatch says; see the line below.
- The Playwright CLI folder `.playwright-cli` (state file, sent-state script, snapshots, console logs) was removed; its screenshots were moved to the directory above first.
- No git worktree was made, so none was removed with `git worktree remove`.
- Note: `dist/public/styles.css` was temporarily replaced with the base stylesheet for the before shot and then rebuilt by `npm run build` (exit 0), so it holds the new rule again.
- The local game's database under `.runs/local-start/` (created by `npm run local`, one test account) stays there; the next start removes it, as `loop2-play` says.

## Questions and concerns

1. **Stale comment outside *Change*, not edited:** `src/browser/kitchen-sink/kitchen-sink.css` lines 42–43 say "as styles.css draws `.button.destructive:hover` and `:focus-visible`, which a class does not reach." That is no longer true: `styles.css` now draws one rest rule and no hover/focus rule for the destructive button. The sample override in that file (`.sample-hover .button.destructive, .sample-focus .button.destructive { color: var(--danger) }`) is now redundant but harmless. The file is not in *Change* and not one I already touched, so I left it. Recommended: a small follow-up that corrects the comment (and possibly drops the redundant override). Orchestrator to decide.
2. **Other sentences that say the destructive button is neutral at rest:** a repository-wide search (`neutral at rest`, `neutral`, `neutralny`) found only the two lines I fixed (`react-button.tsx:10`, `program-list.test.mjs:392`) and my own new comment in `shared-controls.test.mjs` (which describes the failure the case catches, so it stays). `sample-parts.tsx` lines 22–23 say the destructive button's "hover and focus in `danger` by the rules of its own in `kitchen-sink.css`" — still accurate for the wrapper samples, so not changed.
3. `styles.css` comment block above the shared controls (lines ~298–307) still says "the destructive button … each below" — it is still accurate (the destructive look is still listed among the five looks); not changed.

## Unread material

The handoff names these; I did not read them whole, or at all:

- `guidelines/styleguide-browser-view.md` — not read as a whole. I searched it for "destructive" and read the matching lines (73, 236, 266–279, 462, 565, 580, 955, 1351, 1409, 1418) only; the lines at 269 and 565 already state the new look.
- `guidelines/coding.md` — not read.
- `guidelines/testing.md` — not read. I followed the existing style of the adjacent `shared-controls.test.mjs` cases and of `character-screen.test.mjs` for the stylesheet injection instead.
- `src/browser/AGENTS.md` — not read.
- `.the-way/task-cycle/change/SKILL.md` — read whole. `slice.md`, `ui_check.md`, `walkthrough.md` — read whole.
- `.claude/skills/loop2-play/SKILL.md` — read lines 17–75 and 254–310 (start, Playwright CLI, the way into a map run, composing a state). Did not read the phone-layout section (76–253), the MCP section (377–456) or "Show a screenshot to the human" (324–376), since I did not publish screenshots.
- `foundations/decisions.md:5081-5097` (D-44) — read whole. `foundations/decisions.md:4998-5018` (D-39), `:5019-5035` (D-40), `:5098-5112` (D-45) — not read.
- `src/browser/kitchen-sink/control-samples.tsx` — not read (only the grep line 273 that draws "Zakończ").
- `src/browser/kitchen-sink/sample-parts.tsx` — read lines 18–30 only.
- `.runs/task-cycles/uklad-na-telefon/task.md` — read lines 30–69 (item 8 and Question 4 among them; the rest of the task was not needed).
- `.runs/task-cycles/uklad-na-telefon/plan.md` — not opened (the handoff copies all the passages I needed).

## Searches not found or unclear

- `neutral at rest` / `neutral` / `neutralny` in `src`, `tests`, `guidelines`, `scripts`, `.claude` — found only the lines listed above. Nothing else unclear.
- The new test's expected plain colour `var(--text)`: the rule at the base for `.button` sets `color: var(--text)`, which the test reads back; I did not confirm that this is the look the styleguide calls "text", beyond the matching token name.
- No mail error appeared at account creation in this run (the account opened on Siedziba); the skill names one as expected, so nothing to report there.
