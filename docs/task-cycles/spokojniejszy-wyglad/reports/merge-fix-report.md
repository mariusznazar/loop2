# Fix report — I-1 of the review of the merge (ce465a2a)

**Status:** `done`. Route A, as the orchestrator bound. Head was `ce465a2a` at the start. Not pushed.

## Commits

| Commit | What |
|---|---|
| `ea92314c` | the flying icon drawn as a `.icon-mask` in `text-strong` on its `panel` plaque; CSS; the three scene tests |
| `4d52659a` | D-40, D-43, D-365 and the styleguide follow |

## I-1 — fixed

- **Code:** `src/browser/view/scene.tsx` draws `<span className="icon-mask" aria-hidden style={{"--icon": url(effect.href)}}>` in place of `<img src={effect.href}>`. `src/browser/styles.css`: `.scene-flight-plaque` takes `color: var(--text-strong)` (was `--text`), `.scene-flight-plaque img` became `.scene-flight-plaque .icon-mask { display: block; height: 24px; }`, and the comment no longer says the icon holds its colour in its file but that it is the mask of `.icon-mask` in `text-strong` though no text stands beside it (D-40, D-43).
- **Tests (`tests/view/scene.test.mjs`, the three cases that asserted `.scene-flight-plaque img`):** moved to `.scene-flight-plaque .icon-mask` and its `--icon` (`url("/icons/wood-stick.svg")`, `url("/icons/flax.svg")`), the count of one for „Obchód”; the `alt=""` assertion went with the picture, replaced by "no `img` in the flight" (an icon drawn as a picture fails it). I added to the first case a read of the real stylesheet through `computed`: the icon's `color` is `var(--text-strong)` — the behaviour the finding is about. No assertion weakened: each former assertion has its counterpart (what the icon is, which file, one per result).
  - Red first: `npm test -- tests/view/scene.test.mjs` with the tests changed and the code not → exit 1 for the expected reason ("exactly one .scene-flight-plaque .icon-mask: expected 1, got 0"; the „Obchód” case "expected 1, got 0"). After the code: exit 0.
- **Foundation (through `the-way-record-decision` rules, smallest true correction):**
  - D-43 sentence: "…in the badge over the mage's head, on the plaque of the icon flying to the mage and in the drawing of the map — from `text-strong`"; the same in its *Rationale*; *Verification* "complies" names the flying icon on its plaque.
  - D-40 sentence: "so does the icon flying to the mage, on its plaque in `panel`, and so do the icons of the drawing of the map, on `tile-revealed`"; *Verification* complies gains the flying icon, violates names an icon flying to the mage in `text` or in its file's colour. The *Rationale* of D-40 I left as it stands (its sentence "which the action has in the row of a rule and the icons of the drawing of the map have" speaks of what the badge's colour matches and stays true).
  - D-365 *Rejected*: "it has its colour in its file" → "it takes `text-strong`", the plaque still being needed on a light ground. Binding sentence and the rest of D-365 untouched.
  - Not touched: D-27's wording, D-262's sentence (as before). `foundation_check.py` → exit 0.
- **Styleguide (`guidelines/styleguide-browser-view.md`):** the `text-strong` row of Roles names the flying icon; the rule "No value in place of a design token" names the plaque of the flying icon among the places with no text beside it, so it keeps its one way of drawing; the scene rule's sentence now says the icon is a mask in `text-strong`, like the icon over the head, with no text beside it (D-365, D-40, D-43).

## Wider search (as asked: an icon of `assets/icons/` as a picture with its colour in the file)

Searched `src`, `tests`, `guidelines`, `foundations`, `README.md` for `<img`, `<image`, `"img"`, `/icons/`, "colour in/of an icon", "own colour", "colour the file", "in its file", "picture of its file", "kolor w (swoim) pliku", "as a picture". What remains is checked:
- All other `/icons/` sites in code build a `--icon` mask (pick cell, now rows, rule list, badge, map card, trip plan, table heading, drawing of the map, kitchen sink) or the data's `href` for such a mask (`scene-picture.ts`, `terrain-picture.ts`, `tile-list.ts`); the tests that read `src`/`href` of `/icons/` do so for `href` data, not for a picture.
- The remaining `<img>` in `scene.tsx` are the sprites and the scene's background (pack pictures, not icons); `styles.css:644` "The picture is dimmed in its file" is the picture behind the login card (a sprite).
- D-320 (badge), D-41 (dimming), D-291, D-334, D-335, D-180, D-327: no sentence says an icon holds its colour in its file. D-365's own reason was the one; fixed.
- D-43's *Rejected* and *Verification* texts that mention "a picture of its file" are the rejection of it.
- `tests/view/world-area.test.mjs:783` and `maps-screen.test.mjs`/`trip-plan.test.mjs` strings "picture"/"img" assert that no icon is a picture.
Nothing else found.

## Checks (command → exit code)

| Command | Exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `node --test "tests/view/**/*.test.mjs" "tests/sim/**/*.test.mjs"` | 0 (1835 tests, all pass) |
| `npm test -- tests/view/scene.test.mjs` | 1 before the code (expected), 0 after |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` (eslint, prettier, ruff, shellcheck) | 0 |
| `npx prettier --check src/browser/view/scene.tsx tests/view/scene.test.mjs src/browser/styles.css` | pass |
| `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |

Not run: the full `npm test`.

## Own-work check

- **Requirement most likely unmet:** I-1 — no icon of `assets/icons/` drawn as a picture with the colour of its file, and the flying icon in `text-strong` on the `panel` plaque like the badge. Check: the new case reads `computed(icon, "color")` = `var(--text-strong)` and no `img` in the flight (exit 0, after the red run); in the running game (`npm run local`, composed map run) I put the flight's markup into the live scene and read: the mask is 24×24, `rgb(244, 244, 245)` (= `text-strong`), the file loads as a mask, the plaque `rgb(24, 24, 27)` (= `panel`); the screenshot (read once, kept nowhere) shows it drawn as the badge over the mage is. The 300 ms animation itself I did not trigger: the change touches neither the animation nor its markup around the icon; the flight's tests of position and count pass. Browser and server closed, `.playwright-cli/` deleted.

## Unread material

`merge-review-report.md` (the findings file carries the reviewer's words); decision D-317, D-364, D-366, D-367 (task 17's, not touched; searched by the words above only).

## Searches not found or unclear

None.
