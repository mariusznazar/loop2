FAIL

# Spec review — przejscie-widoku-na-react

- Spec: `docs/task-cycles/przejscie-widoku-na-react/spec.md`
- Task: `docs/task-cycles/przejscie-widoku-na-react/task.md` (read whole)
- Method: `.the-way/task-cycle/spec/SKILL.md` and `review.md`, reviewer's variant, at the pinned `.the-way` `bfb2e109`.
- Worktree base: `d850f760`. No file of the repository changed.

## Findings

### F1 — Existing test assertions break under Decisions 1 and 2, but Decision 7 lists neither the change nor its ground

Decision 7 says that no other existing assertion changes ("The row of saving's host — no new case", "No assertion changes"), and Decision 3 says that none of the existing cases "is weakened by this change". The layout Decisions 1 and 2 choose breaks at least these assertions of `tests/view/account-screen.test.mjs`:

- `:3386` `assert.equal(line.classList.contains("form-warning"), true)`. Here `line` is the shown element with the class `save-line` (helper `saveLine`, `:2080`–`:2083`). Decision 2 puts `save-line` on the host and has `ReactFormWarning` draw the `p.form-warning` inside it. Today they are one element.
- `:3391`–`:3395` `childrenOf(header).map(... "save-line")` is expected to be `[false, true]`, so the header must have exactly two children. Decision 1 creates the host of the failure row at the start and puts it between the bar and the line of saving, so the header has three children: `[false, false, true]`.
- `:1325`–`:1327` `const main = notice.parentElement; indexOf(notice) === 0; gameShown(main)`. Decision 2 draws the sentences above the game in a root of their own, so the parent of the sentence is that root's host. The host does not hold the game, and it is not the first child of `<main>`, because the host of the waiting screen stands there.
- `:3340`–`:3350` `const [confirmation, refusal, game] = main.children`. After the change `<main>` holds the host of the waiting screen and the host of the sentences before `game-view`.

Why it matters: the testing guidelines' rule "Changing an existing test" (`guidelines/testing.md:125`–`:136`) asks every changed expectation to name its ground. The builder meets four failing assertions that the spec says do not change. The builder then has two bad choices. One is to rewrite the assertions with no ground. The other is to bend the design to keep them, for example by placing the failure row outside the header or by drawing the sentences into `<main>` itself, which Decision 2 rules out. Either way the result goes against the spec or against the guideline.

Needed: Decision 7 lists these assertions (and any others the structure breaks) with their ground: To do 2 and settlement 3 (separate roots with their own hosts) and Decision 1 (the hidden host of the failure row, always present). For each, the spec says what the rewritten assertion still protects: the bar first and the line of saving under it, outside the menu; `form-warning` on the shown sentence of the line of saving; the page's sentences first, before the game's element, in the order of `<main>`.

### F2 — Decision 6 and the open split of the page module contradict the styleguide rule "The kitchen-sink page", which Decision 8 leaves unchanged

`guidelines/styleguide-browser-view.md`, rule "The kitchen-sink page", last paragraph: "Poza swoim modułem wejściowym strona importuje tylko moduły, których używa gra; kod potrzebny tylko jej zostaje w tym module, bo w `src/browser/view/` trafiłby do wyniku `npm run build`."

- Decision 6 adds an optional prop to `src/browser/view/controls/react-number-field.tsx` that "only the kitchen-sink page gives". That is code the page alone needs, and it stands in `src/browser/view/`, so it reaches the game's bundle. That is the case the rule forbids. The ways Decision 6 rejects do not weigh this rule, and Decision 8 does not change the paragraph.
- *Left to the maker* allows "Whether `kitchen-sink.tsx` stays one module or splits". The rule keeps the page's own code "w tym module", meaning the entry module. A split also has to keep `PAGE_MARKER` exported from `src/browser/kitchen-sink/kitchen-sink.tsx`. The probe of `tests/invariants/test_application_build_kitchen_sink.py:43`–`:48` imports it from `./kitchen-sink/kitchen-sink.js`, and the spec says nothing of this.

Why it matters: the builder has to choose between the spec and a guideline the builder must read before changing a file of `browser-view`. The review of the change would then flag whichever one was not followed.

Needed: either Decision 8 revises the paragraph, through `the-way-maintain-styleguide`, with the reason a page-only prop may stand in a shared control, or Decision 6 picks a way the rule allows. The split question is settled the same way, and the spec names the constraint on `PAGE_MARKER`.

### F3 — Some foundation entries are not marked as coming from the task's settlements or from the cycle's own refinement

The handoff asks for each entry to be marked as one of the task's settlements or as the cycle's precision, meaning a refinement the cycle adds. In *Foundation entries*:

- D-265 (settlement 2), D-269 (settlement 1) and D-407 (settlement 3) are marked, and so is D-323 (cycle's precision).
- D-03 (the exception for the waiting screens goes), D-44, D-275 and D-276 (their *Verification* lines), and D-381 (its rationale) carry no mark.
- The D-407 entry is marked "(settlement 3)" but also carries the cycle's answer to the carried question: the failure row as a root drawn at the start and shown without a render. That is Decision 1 of this cycle, not a settlement of the task, so it needs the mark of the cycle's precision. As written, the step that writes the foundation would record it under the task's authority.

Why it matters: the step that writes the foundation, and the report at merge, use these marks to separate what the human already accepted from what the cycle adds on its own. An unmarked entry leaves the writer to guess.

### F4 — Focus on „Spróbuj ponownie” after a retry is refused again is left to a guess

Today `askingFailed` (`src/browser/view/app.ts:318`–`:323`) moves focus to the retry button at every refusal, including a refusal that follows a retry. During the retry the button is disabled, so the browser, and the test harness (D-264), take focus away from it. Decision 3 says the button is "focused when it appears". Decision 2 keeps the button the same element between refused and retrying. So after retrying → refused the button does not "appear", and a literal reading moves no focus. The keyboard user then loses their place, against To do 2 ("gracz widzi te same … fokus co dziś"). I found no existing case that checks focus after a repeated refusal, so a wrong guess would pass the tests.

Needed: one sentence in Decision 3 saying focus moves to the button at every entry into the state refused.

### F5 — The state "stopped" draws "nothing", but a kept assertion needs a shown `session-check`

Decision 3 says the state "stopped" shows "nothing". Decision 2 puts the class `session-check` "on what it draws". Decision 7 says `assertWaitingWithSentence` (`tests/view/uncaught-failure.test.mjs:766`–`:778`) *gains* checks, so its existing check `assert.ok(shown(byClass(root, "session-check")[0]), …waiting)` (`:769`) stays. If the root draws nothing in the state "stopped", that check fails.

Needed: the state "stopped" draws the empty `session-check` element and no text, or Decision 7 names the change of that check with its ground.

## Notes that do not fail the spec

- **Decision 1 and D-323, the carried question and To do 2.** These agree. React draws the row; the row's root never renders after the start, so an error in another root, or in React's own work, cannot take it down. The sentence stands once, in `warning`, under the bar, beside the line of saving. Nothing changes in the card or in the card's place. Showing the row means setting one attribute and calls no render, so `onUncaught` stays safe inside React's commit. The existing roots (`menu-bar.tsx:339`–`:349`) already use `flushSync` in the same situations Decision 2 relies on. The hidden host passes every existing test helper, because each one filters on `shown`.
- **The hypothesis about screen readers (Decision 1).** It is marked as a hypothesis. The two ways the spec names for confirming it, "the change's check in a real browser, or the reviewer", cannot confirm it: neither one hears a screen reader. D-42 keeps four WCAG criteria and none of them covers announcements, so the hypothesis binds nothing in the build. The named fallback, a render at the error, is the way Decision 1 rejects. It would read more honestly as a risk accepted than as something to confirm.
- **Decision 4 and the trust boundary.** The lines that serve files are named and stay as they are (`scripts/kitchen-sink.mjs:14`–`:15`, `:34`–`:68`). The staging directory sits inside `dist/kitchen-sink/`, so the check of `test_page_command_builds_the_page_with_its_marker` that nothing outside it changes still passes. `rm(out)` at the start clears what an earlier failed run left. `copyStaticFiles` copies no sprites (`scripts/static-files.mjs:6`–`:30`), and esbuild bundles only the compiler's JavaScript, with no loader for assets, so nothing comes from `assets/sprites/`. The bundle path matches `PAGE_ENTRY` and `index.html`'s `type="module"` script. An ES-module bundle keeps the entry's export `PAGE_MARKER` and the string it holds. The review is named: the stage `review-change`, on the diff of the script, with D-76, D-273 and `preview-server-access`.
- **Decision 3 against `app.ts`.** Every transition maps onto the three kinds: logout phases with the held outcome (`deferred`), reset waiting with its held outcome (`heldByReset`, re-run through `whenNotBusy`), a reset that succeeds during a logout (`game !== view`), refused and retrying, `kept`, `afterConflict`, `latest`. I found no missing transition.
- **To do 7.** `git show 905c1ab8:docs/task-cycles/napis-o-awarii/request.md`, *Minor findings* 4 (M-4), names exactly the two assertions the spec names. Finding 8 matches To do 4 and M-1 matches To do 6.
- **The DOM forms.** Only `app.ts`, `game-saver.ts`, `kitchen-sink.ts`, the comparison test and `pick-cell.ts` (which imports `button.ts`) import them. `program-panel.tsx`, `trip-plan.tsx` and `react-select-list.tsx` import only the type `SelectOption`. Of the behaviour the DOM forms hold, nothing the game uses is missing from the React forms. The difference is the DOM number field's hint, which the spec names.
- **Out of scope and To do.** The spec touches nothing the task's *Out of scope* lists, and each of the eight To do items has a place in the spec.
- **Searching the foundation for entries the change makes untrue.** This turned up nothing beyond the spec's list and F3. D-262's rationale still holds. D-264's rationale and D-276's *Rejected* describe the past, as such paragraphs do. The part map, the glossary and the five invariants stay true.

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-263 and D-266 (how the game is bundled, against Decision 4), D-36 (the exemplar), D-42 (which accessibility criteria bind, for the hypothesis of Decision 1), D-270 (read in passing). Found by heading search, each read whole.
- `foundations/environment_facts.md`: grep for React, bundle and esbuild, to see what the hypothesis of Decision 1 and D-323 rest on.
- Code and tests: `scripts/kitchen-sink.mjs`, `scripts/build.mjs`, `scripts/static-files.mjs`, `tsconfig.kitchen-sink.json`, `tsconfig.browser.json`, `src/browser/kitchen-sink/index.html`, `tests/invariants/test_application_build_kitchen_sink.py` (whole), `tests/invariants/test_browser_view_focus_outline.py` (grep), `src/browser/view/app.ts` (whole), `react-button.tsx`, `react-text-field.tsx`, `react-number-field.tsx`, `select-list.ts`; `tests/view/account-screen.test.mjs` and `previous-save.test.mjs` (grep for structure, `saveLine`, notices, focus and retry clicks, and excerpts). These were read to check Decision 7's claim about existing tests and Decision 4's claim about the boundary.
- `README.md`, `guidelines/testing.md` (rows on the kitchen-sink page): grep for "kitchen".

## Working copies

None made; `.runs/spec-review/` was not created.

**Unread material:**

- `guidelines/styleguide-browser-view.md`: read in part. I read the headings, lines 193–215 ("States of shared controls"), 389–420 ("The kitchen-sink page"), 955–960, and a search of the whole file for DOM forms, the kitchen-sink page and the rows of the page. The other rules were not read.
- `guidelines/coding.md`: headings only.
- `guidelines/testing.md`: lines 80–329 only. Not read: 1–79 and 330–486.
- `src/browser/view/menu-bar.tsx`: lines 320–362 only.
- `src/browser/view/game-view.ts` and `state-store.ts`: grep for `saveLine`, `dispose` and the saver only.
- `src/browser/view/game-saver.ts`: grep for the element and its imports only.
- `src/browser/view/account-card.tsx`: lines 1–135 and 580–744. The forms between were not read.
- `tests/view/react-controls.test.mjs`: test names and decision lines by grep. The bodies were not read.
- `tests/view/account-screen.test.mjs`: excerpts by search (lines 190–300, 440–470, 520–610, 1225–1340, 1470–1545, 1680–1715, 1960–2120, 3320–3440, 5234–5430, 5525–5550, 5838–5877).
- `tests/view/previous-save.test.mjs`: excerpts (160–190, 675–705) and a grep for `startApp`.
- Decisions D-97, D-156, D-157, D-208, D-209, D-211, D-402, D-44, D-45, D-47, D-273, D-275, D-276, D-356: read whole, but D-276's *Rejected* only up to its line 4894.

**Searches not found or unclear:**

- A test that checks focus on „Spróbuj ponownie” after a repeated refusal: none found in `tests/view/account-screen.test.mjs` (F4).
- loop2#62-5, #62-7 and #62-10 as written: nowhere in the repository. Matched by content to finding 8, M-1 and M-4 of the record of request #62, as the designer did.
- Whether React 19's development build reports an update outside `act` for `root.render` called from a click sent through `fire` outside `act` (Decision 7's hypothesis): not checked. The spec handles both outcomes, so this does not affect the review.
