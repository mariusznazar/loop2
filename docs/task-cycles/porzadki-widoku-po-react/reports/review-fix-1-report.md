FAIL a9a954793582595ae5e3b75470d14a8c77c3ffe0

# Review of fix 1 — the findings of the review of the whole change

Fix range `45f9b25c..a9a95479` (`30076f2b`, `f8621033`, `2af9b3ed`, `a9a95479`; 6 files, +71 −43). `git rev-parse HEAD` in the worktree: `a9a954793582595ae5e3b75470d14a8c77c3ffe0`. Bounded by `reports/review-whole-findings.md`: Important 1 and 2, M1 and M2 (O1 not to be fixed). Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md`.

Result: all four findings are fixed. The fix of Important 2 brings a new Important finding (N1) in its own wording of D-421 and of the styleguide, which by `fix.md` counts as one that remains.

## The findings

### Important 1 — fixed
`tests/view/run-screen-state.test.mjs:309` now quotes D-371 from the start of its first sentence through "it becomes open again at every entering of the screen of an ended map run". `python -B .the-way/elements/common/foundation_check.py` at `a9a95479`: exit 0, `0 errors` (it was exit 1 at `45f9b25c`). No other line of the file changed.

### Important 2 — fixed in the code; its wording holds a new defect (N1)
Route (a), as the orchestrator chose:
- **The frames rule.** `src/browser/styles.css:625-654` holds the rule `.scene-mage-sprite img, .scene-fire[data-burning="true"] img, .camp-member img, .camp-fire img` (its four declarations unchanged) in a `@media (prefers-reduced-motion: no-preference)` of its own, and `@keyframes scene-frames`. Both are gone from `run-screen.css`, and `scene-frames` is defined once (`git grep scene-frames`: the definition at `styles.css:650`; uses at `styles.css:643` and `run-screen.css:1176, 1192, 1220`). Siedziba reads no file of Przejście any more.
- **`trip-warning` and the columns of Programy, Mapy and Wiedza** stay in `styles.css`, each with a comment that names the exception of D-421 (`styles.css:237`, `styles.css:514`). D-421's new second binding sentence and the styleguide's paragraph (`guidelines/styleguide-browser-view.md:358-369`) name both.
- **The comments.** The head comments of `styles.css`, `run-screen.css` and `headquarters.css` and the first bullet of the motion comment of `run-screen.css:1121-1123` say where the rule stands now. I found no comment left that places the camp's frames in `run-screen.css` (`git grep -n "run-screen.css" -- src` and `git grep camp -- src/browser/*.css`).
- **The cascade.** I ran my own order check again, slice 7's script adapted, twice:
  - **Fix range** (the twelve stylesheets at `45f9b25c` against those at the head, in link order): 444 rules and at-rules on each side, 0 in one and not the other. Exactly 1 pair changed order with equal specificity and a common property: `run-screen.css:778 .scene-mage-sprite .scene-mage-death img` (specificity 0,2,1; `animation-name: none`) against the moved selector `.scene-fire[data-burning="true"] img` (0,2,1; `animation-name: scene-frames`). One `img` cannot carry both: the fire (`scene.tsx:811`) and the mage's death sheet (`scene.tsx:865-871`) are separate branches of the scene. On the mage's death sheet itself, the moved selector `.scene-mage-sprite img` (0,1,1) loses to the death rule (0,2,1) by specificity, before the move and after it.
  - **Whole range** (`7ba7a116`'s `styles.css` against the head): 0 rules lost or added, and 9 pairs left for judgement — the 8 of my first review plus the same death and fire pair. None of them is carried by one element.
  - The fix report's own order check and its recording of eight states in the real game (0 differences in computed styles and in the list of animations, `fix-1-evidence/diff-before-after.txt` empty) agree with this. I did not repeat the real-game recording.
- **Against D-47 and D-265.** The moved rule sets no `outline`, and the one `:focus-visible` rule stays alone in `styles.css` (`test_browser_view_focus_outline.py` passes). D-265 makes `styles.css` the one place of the look of the controls, not the place of the controls alone, so the screen rules held by exception do not contradict it. Its token values pass (`160ms`, `steps()` and `-100%` are no token values by D-43). The kitchen-sink page now also loads the frames rule and the keyframes through `styles.css`. Its sources draw none of the four classes, and `test_application_build_kitchen_sink.py` passes.

### M1 — fixed
D-407's *Verification*, tests clause: "…which draws each only while that state shows it and asks the game view to close the window, and outside…". It is true of the code (`run-entry.ts` `closeWindow()` → `screenState.closeWindow()`), and the case "„✕” asks the game view to close the window …" of `tests/view/run-screen.test.mjs` holds it (it passes).

### M2 — fixed
`guidelines/styleguide-browser-view.md:25`: the row `text-strong` now gives `D-40 · D-43` as its *Decision*. The table's padding is left uneven; Markdown reads it the same, and no check reads the padding.

## New finding in the fix diff

### N1 (Important, within the task) — D-421's new exception covers more rules than the code puts in `styles.css`, and its next sentence reads as if some screens had no stylesheet

- **Where:** `foundations/decisions.md`, D-421, second and third binding sentences (`f8621033`), and the same words in `guidelines/styleguide-browser-view.md:361-366` (`2af9b3ed`). D-421 now says `styles.css` "holds also … each rule that the elements of several screens need and that cannot be divided without changing its text: a rule whose selector list names classes of more than one screen, or the rule of a sentence that several screens draw, which today are the sentence `trip-warning` and the animation of the frames of the sprites of the scene and of the camp. Every other screen and every other part that several screens use has a stylesheet of its own …". The styleguide says the same ("Trzyma też regułę … której lista selektorów nazywa klasy więcej niż jednego ekranu … Dziś to zdanie `trip-warning` i animacja klatek…").
- **What is wrong:**
  - Four rules of `src/browser/credits.css` fit that criterion word for word, yet stand outside `styles.css`: `.account-card details, .headquarters details` (line 12), `.account-card summary, .headquarters summary` (21), `.account-card .credits, .headquarters .credits` (26), `.account-card .credits li + li, .headquarters .credits li + li` (32). Each selector list names a class of the login card and a class of Siedziba, two screens, and cannot be divided between `account-card.css` and `headquarters.css` without changing its text. They rightly stand in the stylesheet of the credits, a part several screens use; slice 7 put them there by the plan's criterion "of two screens and of no shared part". The new wording dropped the qualification "that is no part of its own", which the route in my findings carried, and its "which today are" lists two rules where its own criterion gives six.
  - Second: "Every other screen … has a stylesheet of its own" reads as if the screens behind the exception — Programy, Mapy, Wiedza, Przejście, Siedziba — had none. Each of them has one.
- **Why it matters:**
  - By WAY-263, an entry the change writes that restates the rule more broadly than the code does is Important.
  - The next agent who reads D-421 or the styleguide and opens `credits.css` sees four rules that the decision places in `styles.css`. It either moves them into `styles.css`, against the credits' own file that the same decision asks for, or concludes the decision is not kept. The "every other screen" sentence invites the reading that a screen in the exception gets no file of its own.
- **Evidence:** `src/browser/credits.css:12-35` at `a9a95479`. `grep` of the other screen and part stylesheets for selectors naming classes of a second screen finds only these four rules.
- **Fix:**
  - In D-421's second binding sentence, and in the styleguide paragraph, qualify the criterion with "…that belongs to no part with a stylesheet of its own, as the rules of the credits that name the login card and Siedziba belong to `credits.css`", or an equivalent.
  - Write the third sentence as "Each screen and every other part that several screens use has a stylesheet of its own …".
  - Keep the "today are" list true under the qualified criterion.

  No code changes. Run the foundation check again.

## Checks

| Check | Where | Exit | Result |
|---|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | reviewed worktree, head `a9a95479` | 0 | 0 errors |
| `python -B .the-way/instruction-files/check_instructions.py` | head | 0 | 0 error, 142 warn, 7 info |
| `npm run build` | worktree of `a9a95479` | 0 | |
| `node scripts/test-node-file.mjs tests/view/<name>.test.mjs` (after the build, as `npm test -- <file>` runs it) for `run-screen-state`, `scene`, `world-area`, `run-header`, `rule-signs`, `headquarters-screen`, `camp-picture`, `run-screen` | worktree of `a9a95479` | 0 each | all pass |
| `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/*.css src/browser/index.html tests/view/run-screen-state.test.mjs` | worktree of `a9a95479` | 0 | |
| `python -B scripts/test.py tests/invariants/<file>` for `test_browser_view_focus_outline`, `test_browser_view_token_values`, `test_application_build_kitchen_sink`, `test_application_build_output` | worktree of `a9a95479` | 0 each | all pass |
| Order check, fix range (twelve stylesheets at `45f9b25c` against the head) | reviewed worktree, read only | 0 | 0 rules lost or added; 1 pair, carried by no element (above) |
| Order check, whole range (`7ba7a116`'s `styles.css` against the head) | reviewed worktree, read only | 0 | 0 rules lost or added; 9 pairs, none carried by one element |
| `git grep -n scene-frames`; search for selectors naming classes of two screens in the screen and part stylesheets | head | — | one definition; N1 |
| Not run: the product's full gate | — | — | reserved to the orchestrator |

**The fix report's claims:**
- Foundation check 0 errors, the focused tests, the invariant tests, prettier and the order check: confirmed by my own runs.
- The real-game recording: not repeated by me; its evidence files are where the report says.
- The report gives 134 warnings of `check_instructions.py`; I get 142 at the same head. Warnings do not stop the gate.

Evidence: `.runs/task-cycles/porzadki-widoku-po-react/reports/review-fix-1-evidence/` (`report-fix.txt`, `report-base.txt`, `order-fix.mjs`, `results.txt`, `run_tests.sh`, `fc.txt`; `order-fix.mjs` names `.runs/review-fix-1`, which no longer exists).

## Unread material

- The fix report read whole; `fix-1-evidence/` read only by its file list.
- D-421 and D-407 read whole in the fix diff. D-47 and D-265 read whole in my first review and unchanged since.
- `guidelines/styleguide-browser-view.md` read whole in my first review; in this one, the changed paragraph and row only.
- `src/browser/credits.css` and the changed stylesheets read whole; the other stylesheets read by search only.

## Searches not found or unclear

- The warning count of `check_instructions.py` differs between the fix report (134) and my run (142) at the same head; I did not find why.

## Working copies

- `.runs\review-fix-1\head`, a worktree of `a9a95479` with a junction `node_modules` to the reviewed worktree's `node_modules`. The junction was unlinked first (`rmdir`; the reviewed worktree's `node_modules` intact, 268 entries), then the worktree was removed (`git worktree remove --force`, `git worktree prune`).
- `.runs\review-fix-1\` (the base copies of the stylesheets, the adapted scripts, outputs): removed. What the report needs is kept in `reports/review-fix-1-evidence/`.
- Reviewed worktree unchanged: `git status --short` empty, HEAD `a9a95479`.
