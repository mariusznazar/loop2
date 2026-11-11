PASS 4d52659affa0a1b4ac3581f402407ebe53369772

# Review of the fix of I-1 — range `ce465a2a..4d52659a`

Variant: the review of a fix (`.the-way/task-cycle/review/fix.md`).

- `git rev-parse HEAD` is `4d52659affa0a1b4ac3581f402407ebe53369772`.
- The range holds two commits:
  - `ea92314c` (code, CSS, tests);
  - `4d52659a` (D-40, D-43, D-365, styleguide).
- The findings file is `merge-fix-findings.md`; it holds I-1 alone. M-1 is not part of this fix.
- The orchestrator chose route A.

Counts: blocking 0, Minor 0, out of scope 0.

## Findings file

**I-1 — fixed.**

- **Code.** `src/browser/view/scene.tsx:185-189` draws the flying icon as `<span className="icon-mask" aria-hidden="true" style={{"--icon": url(effect.href)}}>`. No `<img>` stands in the flight.
- **CSS.** In `src/browser/styles.css:1821-1832`, the plaque now sets `color: var(--text-strong)`, and `.scene-flight-plaque .icon-mask` replaces the `img` rule. `.icon-mask` (`:553-560`) paints `currentColor` through the mask, with `aspect-ratio: 1`, so the icon is 24 × 24 in `text-strong`. That is how the badge's icon is drawn (`:1784`). The comment at `:1807-1810` now says this.
- **Foundation.** Each change is the smallest true correction:
  - D-43 (`foundations/decisions.md:924`, `:930`, `:934`) names the plaque of the flying icon among the places with no text beside it, in its sentence, its "complies" example and its rationale.
  - D-40 (`:879`, `:885-886`) adds the flying icon in `text-strong` on its `panel` plaque, as a "complies" example, and names it in "violates" when it stands in `text` or in its file's colour. D-40's *Rationale* was left as it was, and stays true: the plaque stands on `panel`, one of the five backgrounds whose contrast is checked, so no new "accepted" cost arises.
  - D-365 *Rejected* (`:8172`) now gives the reason "it takes `text-strong` and on a light ground it can vanish".
- **Styleguide.** `guidelines/styleguide-browser-view.md` names the flying icon in the `text-strong` row of the Roles table (`:25`) and in the one-way rule (`:113`). The scene rule (`:633`) now says "ikona jest maską w `text-strong`". The rule and the scene section no longer contradict each other.
- **Tests.** `tests/view/scene.test.mjs:909-923`, `:955` and `:971-974` moved to `.scene-flight-plaque .icon-mask` and its `--icon`. The first case adds two assertions: no `img` in the flight, and the icon's computed `color` equals `var(--text-strong)`.
  - The icon sets no colour of its own, so it inherits the plaque's. If the plaque stayed `var(--text)`, the assertion would read `var(--text)` and fail.
  - The `alt=""` assertion went with the picture. Its replacement, "no `img`", is stricter about the defect.
  - No assertion was weakened: each former assertion of which file and how many icons has its counterpart.
- **No trace of the old way remains.** `git grep -E "kolor w swoim pliku|its own colour in its file|scene-flight-plaque img"` finds 6 lines at `ce465a2a` and 0 at `HEAD` (exit 1) in `guidelines`, `src`, `tests` and `foundations`.

## New findings in the fix diff

none.

I also looked at three details that are not findings:

- `aria-hidden="true"` on the empty span is harmless; the badge's mask span carries none.
- `display: block` on the plaque's mask is the same as before.
- Nothing in the fix touches the 300 ms animation's rules.

## Declined to judge

- M-1 (`tests/view/headquarters-screen.test.mjs:515`, the comment saying the links lead to game-icons.net): outside this fix by the dispatch. It remains, and goes to the request's list as before.

## Changed files of the range `ce465a2a..4d52659a` (added / removed lines)

| File | + | − |
|---|---|---|
| foundations/decisions.md | 7 | 7 |
| guidelines/styleguide-browser-view.md | 3 | 3 |
| src/browser/styles.css | 4 | 3 |
| src/browser/view/scene.tsx | 5 | 1 |
| tests/view/scene.test.mjs | 20 | 6 |

## Checks

| Command | Exit |
|---|---|
| `git rev-parse HEAD` → `4d52659a…`; `git log --oneline ce465a2a..HEAD` (2 commits); `git diff ce465a2a..HEAD` | 0 |
| `npm run typecheck` | 0 |
| `npm run build` (writes `dist/`, which git ignores) | 0 |
| `node --test tests/view/scene.test.mjs tests/view/scene-picture.test.mjs tests/view/icons.test.mjs` | 0 (107 tests, 107 pass) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npx prettier --no-config --no-editorconfig --check src/browser/view/scene.tsx tests/view/scene.test.mjs src/browser/styles.css` | 0 |
| `npx eslint --max-warnings 0 src/browser/view/scene.tsx tests/view/scene.test.mjs` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| `git grep` above, at `ce465a2a` (positive control, 6 lines) and at `HEAD` | 0 / 1 (none found) |
| `git status --short` before and after | empty |

Not run:

- **The full `npm test`.** It is the cycle's own run.
- **A run with the plaque's colour reverted, to see the new colour assertion fail.** It would need a separate worktree with its own `node_modules`. I reasoned it from `computed()` (`tests/view/scene.test.mjs:330-339` reads the real stylesheet) and the inheritance from the plaque. The author reports the red run for the mask assertions only.
- **A browser check.** The author reports one (24 × 24, `rgb(244, 244, 245)` on `rgb(24, 24, 27)`). I did not repeat it.

## Reaches beyond the dispatch

- `src/browser/styles.css:553-560` (`.icon-mask`) and `:1784` (the badge's mask): to confirm the size and colour of the new mask.
- `tests/view/scene.test.mjs:330-339` (`computed`): to judge whether the new colour assertion can fail.

## Unread material

- I did not read the lines of `tests/view/scene.test.mjs` outside the three changed cases and the `computed` helper. They are unchanged by the range.
- Every line of the fix diff was read.

## Searches not found or unclear

- The search for the old way's words at `HEAD` found nothing, and the same search found 6 lines at `ce465a2a`, so the empty result is a real absence.
