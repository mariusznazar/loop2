PASS 4f6947425b2f1af1c29de6b4181e731fbba69914

# Review of correction 1 — a fresh reading of the decisions the review of the whole change left unread

- Range: `d850f76063c1f7a302b89d0b89e1fca72682be6d..4f6947425b2f1af1c29de6b4181e731fbba69914` (31 commits). `git rev-parse HEAD` = `4f6947425b2f1af1c29de6b4181e731fbba69914`, the head given. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink.
- Method: `.the-way/task-cycle/review/SKILL.md`, with `fix.md` (a correction for the human's remarks) and, for the reading, the selection rules of `whole_change.md` as the handoff gives them.
- Result: no Critical and no Important finding. 2 Minor findings, both within the task. No out-of-scope finding beyond the note under Declined to judge. No finding needs Mariusz's choice.

## The remarks of the correction

- Remark 3 (read the decisions of the index whole and compare each with the change): **made by this review.** I built the index (85 decisions in full, 237 by heading, against the earlier review's 61 and 257), read all 85 whole at the head and 19 more of the by-heading list whose titles bear on the change, and compared each with the diff of the range and the code at the head. Nothing the change does contradicts a decision, makes one untrue, or leaves untested a test the decision's *Verification* names. The two Minor findings below are wording, one in a test and one in a rationale and a guideline's *Good* line; neither needs a fix in the product's behaviour.
- Remarks 1 and 2: let through by the human, not reviewed again.

## Findings

### Critical

None.

### Important

None.

### Minor (both within the task)

**m1 — The new test of the shared controls sends a `change` event by hand, not through the harness's `fire` (D-264).**
Place: `tests/view/shared-controls.test.mjs:897-900`:
```js
await inAct(() => {
  select.value = "beta";
  select.dispatchEvent(new window.Event("change", { bubbles: true }));
});
```
D-264's binding sentence: "A test file of such a screen clicks a control through the harness's `press`, … and sends an event through its `fire`, which sends the event as a browser does and which the test file puts in `act` where React must answer, and keeps no copy of either." The file is new in this range (slice 11, `e8b68dda`); it carried the line over from the deleted `tests/view/react-controls.test.mjs`. It is no defined copy of `fire` (the *violates* example), so the case still protects its behaviour and passes; it is Minor. Fix in the code, not in the entry: `fire(select, "change")` inside the same `inAct`, with `fire` imported from `./page-document.mjs`. `pressEnter` at `:936-946` dispatches a `KeyboardEvent` by hand too, but `fire` (`tests/view/page-document.mjs:125-131`) builds a plain `Event`, which carries no `key`, so the harness offers no way for it; that is the repository's pattern in seven other files and no finding here.

**m2 — D-264's rationale and the *Good* line of the guideline rule „Nowy ekran i moduły w DOM” still say the page builds the panel of a card taken down; `createFailureCard` in `account-card.tsx` builds it.**
Places:
- `foundations/decisions.md:1251-1253` (D-264 *Rationale*, rewritten in this range by `937e4b0a`): "the cases that walk the page also walk what the page builds by hand, the header, the main block and the panel of a card taken down".
- `guidelines/coding-browser-module.md:194` (*Good*): "strona buduje przez API DOM tylko miejsca, w których montują się korzenie, i panel w miejscu zdjętej karty".
- The code: `src/browser/view/account-card.tsx:674-683` builds the panel, called at `:700`; `app.ts` builds only `<header>` and `<main>` (`app.ts:253`, `:264`), and each host is built by its factory.

The rule's body under the *Good* line (`coding-browser-module.md:197-202`) was corrected by `f89dbd09` (finding m4 of the review of the whole change) and now names `createFailureCard`; the *Good* line above it and D-264's rationale were not. D-264 names no file, so "the page" read as the whole start page is true, and what the rationale argues (the imitation must carry what is built by hand) holds; the *Good* line, though, sits directly above a body that defines „Strona” as `app.ts`, so a reader can look for the panel there. Graded Minor, as m4 was: no rule changes and no behaviour depends on it. Fix in the entry and the guideline, not in the code: "what the page and its card build by hand" in D-264 (through `the-way-record-decision`), and "strona i fabryki jej korzeni budują … , a panel w miejscu zdjętej karty `createFailureCard`" in the *Good* line.

## Comparison with the decisions (what I checked and found true)

Each decision below was read whole; I name only those where the change reaches what the decision says.

- **D-03, D-36, D-265, D-269, D-270, D-395, D-407 (form of the view and its controls).** Every place the start page shows besides the game is a React root of its own: the waiting screen (`waiting-screen.tsx`), the sentences above the game (`page-sentences.tsx`), the rows of saving and of the failure (`header-rows.tsx`), with the menu bar and the card. The failure row is drawn at the start, hidden, and shown by one attribute (`app.ts:310-315`, `header-rows.tsx:34-52`), as D-407's second paragraph says. Every shared control has one React form; the DOM forms are gone; the panel reads `FORM_WARNING` (`account-card.tsx:681-683`, `react-text-field.tsx:101-105`). No control imports a screen module (`react-select-list.tsx` now holds `SelectOption`). No new package.
- **D-262, D-280, D-381 (card, waiting screens, bar).** Card alone with header and main hidden (`app.ts:386-387`); bar holds the name alone in every state but a game that told its place (`barPropsOf`); focus moves to „Spróbuj ponownie” at each entry into `refused` (`app.ts:410-412`) and the button keeps one slot (`waiting-screen.tsx:63-83`); the card is created, focused only after a confirmed logout, a logout answered with no session and a set password (`app.ts:711-712`, `:787-788`), and closed by `release` on every way to the game or a waiting screen. The tests D-262's *Verification* names exist (`account-screen.test.mjs:564-623`).
- **D-96, D-156, D-157, D-213, D-225, D-261, D-286 (sentences).** The confirmation sentence in `positive`/`warning` with role status/alert, the refused load in `page-notice` `alert`, ahead of the game in `main` (`page-sentences.tsx:32-47`, `app.ts:361-370`); they leave at the first change of screen (`onPlace`) and at a change to the card (`NO_SENTENCES`); „Potwierdzanie adresu…” stays in `session-check-text`, drawn in `text-secondary` (`styles.css:656-659`); a load that meets an error of the code shows `LOAD_FAILED` in `warning` with the retry and builds no game.
- **D-97, D-203, D-207–D-211, D-402 (saving, logout, reset).** The saver gives its sentence as a value; the row of saving shows it under the bar, hidden while there is none (`header-rows.tsx:69-97`). Logout waits as „Wylogowywanie…” in both its phases (`logout.kind !== "idle"`), holds a saver outcome while the end of the session waits and acts on it after an uncertain answer; the reset holds the old game's outcomes and acts on them only if it fails; „Wyloguj” is not pressable while the reset waits. D-402's new paragraph is what `showGame` does when `failed` (`app.ts:529-533`) and what `whenNotBusy` does for the new game's saver; both tests its *Verification* names exist (`uncaught-failure.test.mjs:850-899`, `previous-save.test.mjs:1489-1532`).
- **D-323, D-253, D-347 (failure).** The sentence once, in the row under the bar beside the line of saving, in the card under the form, alone in place of a card taken down, and alone at the waiting screen where a sign-in stays (`Waiting` `stopped` draws nothing). Each test its *Verification* names exists, including the waiting screen with no „Sprawdzanie logowania…” (`assertWaitingWithSentence`).
- **D-44, D-45, D-47, D-274–D-276, D-289, D-291, D-43 (kitchen-sink page and looks).** The page shows each control in each of the seven states or its reason; the destructive button disabled while it waits as „Zacznij od zera”; the four forms waiting and refused and „Nie pamiętam hasła” with its answer; the part of the menu „Konto”; 26 roles; the tile samples. The page's focus rule keeps exactly one more selector (`kitchen-sink.css:85-90`); no colour or length is written in place of a token.
- **D-06, D-263, D-266, D-269, D-76 (build and the preview server).** The page is bundled by esbuild from the compiler's staged modules inside `dist/kitchen-sink/`; the staging directory goes in a `finally` before any serving; `rm(out)` runs first; the serving lines (`express.static(out)`, host `127.0.0.1`, port 0) and `openInBrowser` stand as before. Trust boundary: the range changes no line that serves files or picks the host, adds no served path, and the bundle holds only code the page imports; the invariant `preview-server-access` holds by review, as D-76 gives for a change of how the page is built.
- **D-73–D-89, D-264, D-268 (tests).** New and changed cases quote decisions, name no task document (D-82), import the harness first and take its `assert` (D-268); 28 test files load the document imitation, under the 40 of D-268. The focus assertions are jsdom logic, which D-262's *Verification* asks for and D-88 allows; the executors checked focus in a real browser (D-89). See m1 for D-264.

## Declined to judge

- A logout whose save before the logout is answered with no session goes through `expire()` and leaves no focus on the card (`app.ts:701-703`); D-381's "a logout the server answers with no session" may or may not cover it. The behaviour is unchanged by the range (`git show d850f760:src/browser/view/app.ts`, the same branch). Outside the task.
- While a sign-in after an error waits for the load, the waiting screen shows „Sprawdzanie logowania…” beside the failure sentence until the load answers; D-323 speaks of the waiting screen "where a sign-in after the error stays", which the change makes empty. The transient text is as before the range. Outside the task.
- Whether `copyStaticFiles` brings `assets/sprites/` into the kitchen-sink page (D-273): the line is unchanged by the range.
- The same hand-sent `change` event as m1 stands in `tests/view/program-panel.test.mjs:182` and `tests/view/rule-signs.test.mjs:203`, outside the range. Out of scope.

## Checks run (from the root of the reviewed worktree)

| Check | Command | Result |
|---|---|---|
| head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | head as given; pin equal |
| decision sections | `python -B .the-way/elements/common/decision_index.py --output .runs/review-correction-1/sections.md --sections` | exit 0, 28 sections |
| decision index | `python -B .the-way/elements/common/decision_index.py --output .runs/review-correction-1/index.md --section "Browser view: screens, navigation and their code" --section "Look of the browser view: styleguide, controls, pictures and fonts" --section "Signing in: the login card and credentials" --section "Saving the game state and the previous save" --section "Testing discipline" --part browser-view --part build-tools --part agent-workflow --part product-foundation --decision D-03 … --decision D-157` (the 32 identifiers the handoff names) | exit 0; 85 in full, 237 by heading |
| shared controls | `npm test -- tests/view/shared-controls.test.mjs` | exit 0, 49 pass |
| uncaught failure | `npm test -- tests/view/uncaught-failure.test.mjs` | exit 0, 19 pass |
| previous save | `npm test -- tests/view/previous-save.test.mjs` | exit 0, 46 pass |
| account screen | `npm test -- tests/view/account-screen.test.mjs` | exit 0, 132 pass |
| saver | `npm test -- tests/view/game-saver.test.mjs` | exit 0, 20 pass |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| kitchen-sink build | `npm run kitchen-sink -- --build-only` | exit 0 |
| types | `npm run typecheck` | exit 0 |
| stale names | Grep of `foundations`, `guidelines`, `src`, `tests`, `scripts`, `docs` for the deleted modules and functions, "DOM form", "both forms", "two forms", "screens still in DOM" | only D-259's "two forms" of the card and the *Rejected* passages of D-265 and D-269 |

Not run: the whole `npm test` (the orchestrator's alone); a real browser (the earlier reviewers and executors checked the pages; remarks 1 and 2 were let through); a mutation for m1 (the case passes either way; the finding is about the harness rule, not the case's force).

## Reaches beyond the dispatch

- `src/browser/styles.css:1-60`, `:170-200`, `:630-700`: the boxes of the save line, the failure line, the sentences and the waiting screen, to check D-208, D-156 and D-323 against the new host elements.
- `tests/view/page-document.mjs:105-160`: what `fire` and `press` do, for m1.
- `git show d850f760:tests/view/react-controls.test.mjs`: where the hand-sent events of m1 came from.
- `git diff --word-diff=plain d850f760..HEAD -- foundations/decisions.md`: to see which passages the range wrote, after reading the entries whole at the head.
- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`: read whole, as the handoff asks.

## Working copies

- `.runs/review-correction-1/` held the decision index and the list of sections, four diff extracts of the range and the logs of the checks. Removed before returning; nothing of it is needed beside this report.
- `dist/` (the product's own build output, ignored by git) stays as the product's tools leave it.
- The reviewed worktree is unchanged (`git status --short` empty).

## Unread material

- **Decisions:** of the 85 decisions listed in full in the index of my selection, I read **85 whole**, each from its heading to the next with its *Rationale*, *Rejected* and *Relations*, at the head (the nine the change writes included, read from the file at the head, not from the diff). Of the 237 listed by heading, I read **19 whole** whose titles bear on the change or that stood in a passage I read (D-01, D-02, D-06, D-29, D-117, D-130, D-152, D-156, D-222, D-252, D-258, D-263, D-266, D-268, D-289, D-290, D-291, D-347, D-351), and **218 by title only**. No decision that bears on the change stayed unread; D-04 ("What is the game built with?"), cited by D-45's rationale, was read by title only, since the change does not reach how the game is built.
- **Invariants read whole:** `browser-view-framework`, `content-identifiers`, `browser-view-token-values`, `browser-view-focus-outline`, `design-token-contrast`, `design-token-sources`, `application-build-kitchen-sink`, `preview-server-access`, `document-test-memory-limit`, `sprite-file-content`, `loop2-container-sprites`, `rule-state-from-pick`, `uncaught-failure-game-state`, `browser-failure-report`.
- **Glossary:** no entry names the browser view, the kitchen-sink page or the failure handling; I read `secondary action`, `unit test` and `integration test` whole, as the entries that name a control or the view's tests.
- **Guidelines:** `guidelines/testing.md` (487 lines), `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` (911 lines) and `src/browser/AGENTS.md` read whole. `.the-way/product-guidelines/template.md` and the templates of the disciplines: not read; the range's guideline changes were judged by the earlier reviews and the foundation check passes.
- **Reports:** `reports/correction-1-remarks.md` and `reports/review-whole-report.md` read whole; `reports/review-fix-1-report.md`, `reports/review-return-report.md` and `reports/review-return-fix-report.md` not read, since the handoff leaves them optional and my reading did not need them.
- **Code:** `app.ts`, `kitchen-sink.tsx`, `scripts/kitchen-sink.mjs` read whole at the head; `waiting-screen.tsx`, `page-sentences.tsx`, `header-rows.tsx` whole through the diff (new files); the rest of the range through its diff.

## Searches not found or unclear

- The handoff's *Current ranges* do not match `foundations/decisions.md` at the head for most entries (for example D-43 at 4527 in the handoff and 4540 in the file, D-402 at 3925 and 3935, D-44 at 4542 and 4555); I read each entry by its heading in the file.
- `guidelines/testing.md` counts 413 lines by `Measure-Object -Line` and 487 by the Read tool; the file was read to its last line.
- No harness way to send a `KeyboardEvent` with a `key` through `fire`; noted under m1.
