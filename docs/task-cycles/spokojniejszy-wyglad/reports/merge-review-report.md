FAIL ce465a2a5ab28fd392f8791e811488d123bb825b

# Review of the reconciliation with the target branch — merge `ce465a2a`

Reviewed: the merge commit `ce465a2a5ab28fd392f8791e811488d123bb825b` (confirmed as `git rev-parse HEAD`),
first parent `1355b9106713cdc3f162bc53b2b6255dca82e982` (the task branch), second parent
`01418389d242cbe5792d8b22291acf4303c4edc3` (origin/main, PR #77, task 17 `zbieranie-jako-widowisko`),
merge base `3b7e4930`. Pinned the-way `52f8164a354ee1a704af0d58add2f3be8e4f0247` (gitlink and checkout agree).
Method: `.the-way/task-cycle/review/SKILL.md`, variant "reconciliation with the target branch".

Counts: blocking 1 (Important), Minor 1, out of scope 0.

## Findings

### Important

**I-1. The icon flying to the mage is drawn as a picture of its file, which D-43 as this task writes it forbids, and the merged styleguide now gives two ways of drawing an icon (within the task: D-43 and *To do* 10).**

- Place:
  - `src/browser/view/scene.tsx:185`: `<img src={effect.href} alt="" draggable={false} />`, where `effect.href` is `/icons/${RESOURCES[resource].icon}.svg` (`src/browser/view/scene-picture.ts:305`), so the file is an icon from `assets/icons/`.
  - `src/browser/styles.css:1807-1809` (the comment "the icon holding its own colour in its file (D-43)") and `:1828-1831` (`.scene-flight-plaque img`).
  - `guidelines/styleguide-browser-view.md:633`: "ikona trzyma kolor w swoim pliku (D-365, D-43)".
  - `foundations/decisions.md:8172`, D-365 *Rejected*: "the icon alone on the forest, with no plaque — it has its colour in its file".
- What is wrong: after the merge, D-43 (`foundations/decisions.md:924`, as this task writes it) says the content of an icon file "is drawn as a mask and takes its colour from the text beside it or, where no text stands beside it — in the badge over the mage's head and in the drawing of the map — from `text-strong`". Its *Verification* names "an icon of `assets/icons/` drawn as a picture of its file, with the colour the file holds" as a violation (`:931`). Its rationale ends "one way of drawing an icon holds for every icon of the game" (`:934`).
  - Task 17 added the flying icon of D-365 while the old D-43 still allowed "any other icon holding its colour in the file". It drew the icon as an `<img>` and wrote that into its styleguide line and its CSS comment.
  - The merge took the task's new D-43 and task 17's code and styleguide line without reconciling them. The merged tree's code does what the entry this task writes forbids.
  - The merged styleguide contradicts itself. The rule "No value in place of a design token" (`guidelines/styleguide-browser-view.md:110-113`) says "Ikona z `assets/icons/` jest rysowana jednym sposobem, maską", with `text-strong` only "nad głową postaci i na rysunku mapy". The scene rule (`:633`) says the flying icon keeps the colour of its file.
  - Task *To do* 10 requires that rule to describe "jeden sposób rysowania ikon — maską". The task's goal is "Wszystkie ikony biorą kolor z tekstu obok".
- Why it matters:
  - The player sees no difference today: the files hold `#f4f4f5`, the value of `text-strong` (task, Question 1).
  - Later changes drift. A change of `text-strong` reaches the badge and the map but not the flying icon, the very drift D-43's rationale names. A later reader of the foundation or the styleguide also finds two binding sentences that disagree.
  - By WAY-263 a change whose files do what a foundation entry it writes forbids is Important.
  - The merge report's own search for what the merge made untrue (`merge-report.md`, "Step 2") looked only for `footer` and `stopk`, not for the icon half of the task, so it missed this.
- Evidence:
  - The lines above, read in the merged tree.
  - `git blame` shows `styleguide-browser-view.md:633` from `b64354ed` (task 17's merge of main), `styles.css:1807-1809` from `af197168` (task 17) and `decisions.md:924` from `80bd62d1` (this task).
  - `tests/view/scene.test.mjs:909`, `:943` and `:959` assert `.scene-flight-plaque img`, so the tests protect the picture form.
  - `tests/invariants/test_browser_view_token_values.py` passes (exit 0) because it cannot see how an icon is drawn. D-43 leaves this to review.
- Recommended fix (route A):
  - Draw the flying icon as the badge's icon is drawn: a `.icon-mask` span with `--icon`, in `text-strong` on the `panel` plaque.
  - Widen D-43's "where no text stands beside it" to name the plaque of the flying icon. Do the same in D-40's sentence and *Rationale* on `text-strong` without text beside it, in the `text-strong` row of the Roles table and in the styleguide's rule at `:110-113`.
  - Rewrite `styleguide-browser-view.md:633` and the CSS comment.
  - Correct D-365's *Rejected* reason. With a mask the icon no longer "has its colour in its file"; the plaque is still needed for legibility on a light ground. This is the same kind of smallest correction the merge already made to D-271.
  - Move the three scene tests to the mask element.
- The route not recommended (B) is to except the flying icon in D-43. It keeps two ways of drawing an icon, against *To do* 10 and the task's goal, and reverses the rationale this task wrote.

### Minor

**M-1. A test comment no longer matches the merged section.**

- Place: `tests/view/headquarters-screen.test.mjs:515`: "The links of the folded section of credits lead to game-icons.net, not to a screen of the game."
- What is wrong: after the merge, the section's last line links `opengameart.org` and the licence page. The licence links were already outside game-icons.net before the merge. The assertion itself excludes `details` and stays correct; only the comment is untrue.
- Fix: "lead outside the game".

## What holds (verified, not taken from the merge report)

- The pack row stands in the one section on both screens.
  - `creditLines()` (`src/browser/view/credit-lines.ts:65-91`) returns the icons' lines and then one line per `PACK_CREDITS` entry.
  - `CreditsSection` (`src/browser/view/credits-section.tsx:25-29`) draws `credit.sourceSite` as the first link's text.
  - The section is rendered by `src/browser/view/account-card.tsx:662` and `src/browser/view/headquarters.tsx:299`. No other place renders credits.
  - `headquarters.tsx` is unchanged by the range `1355b910..ce465a2a`, so the section is still the screen's last part.
- The pack row's text and links are as task 17 wrote them.
  - `src/browser/view/credits.ts` is identical to `01418389` (it is absent from `git diff 01418389..ce465a2a`).
  - The test literals `PACK_LINE`, `PACK_PAGE` and `PACK_LICENCE` (`tests/view/icons.test.mjs:209-213`) are unchanged.
  - The section's last line is asserted to equal `PACK_LINE`, with the links `opengameart.org` → page and `CC BY 3.0` → licence, including `target`/`rel` (`:311-330`).
- Task 17's two footer cases were not lost.
  - "each footer line…" lives on as `icons.test.mjs:300-309`, with `NAMED.length + 1` and each icon line's text.
  - "the footer's last line…" lives on as `:311-330`.
  - The campfire and actions cases keep task 17's `NAMED.length + 1` and `slice(6, NAMED.length)`. No assertion is weakened.
- `SOURCE_SITE` was restored in `credit-lines.ts:6` and is used for the icons' lines. `credits-section.tsx` no longer holds its own copy.
- No footer remains. A search for `footer|stopk|createFooter|footerCredits` (case-insensitive) over the tree outside `node_modules`, `.git`, `.runs`, `.the-way` and `dist` found only:
  - D-27 and D-262 *Rejected* (`decisions.md:695`, `:5454`), which name the footer as a rejected way;
  - the account-screen tests asserting no `<footer>` (`tests/view/account-screen.test.mjs:4928-4966`).
- D-271's *Verification* now says "a credit line for the pack in the folded section of credits" (`decisions.md:5725`), which is true. D-271's main text says only "the game credits each pack whose licence asks for a credit".
- `sprite-credits` ("The game's credits hold…", `invariants.md:1290`) is true, with method `review`. Its line names what the pack is for, its title, author, page with link, licence with link and change ("Kurz", "zmienione (przekolorowane)").
- `icon-credits` (`invariants.md:333-335`) and its test pass with the pack line present.
- `smoke-fire-particle-licence` (`environment_facts.md:776`) matches the pack row's author, licence name and licence URL.
- The part-map line for the pack (`part_map.md:201`) is unaffected by the change.
- D-27, D-40, D-47 and D-262 as the task changed them are consistent with the merged code apart from I-1. D-40's sentences on `text-strong` without text beside it name the badge and the map only, so they are part of I-1's fix.

## Declined to judge

- Task 17's scene behaviour (the bend of D-364, the dust of D-366, the readings of D-367, the timing and sprite files): outside this task, reviewed in PR #77; only its meeting points with this task were read.
- Whether the flying icon's plaque should keep `color: var(--text)` (`styles.css:1824`) once the icon is a mask: a detail of I-1's fix, left to its author.

## Changed files of the range `1355b910..ce465a2a` (added / removed lines)

| File | + | − |
|---|---|---|
| assets/sprites/dust.png | bin | bin |
| assets/sprites/mage-bend.png | bin | bin |
| foundations/decisions.md | 96 | 13 |
| foundations/environment_facts.md | 6 | 0 |
| foundations/invariants.md | 10 | 0 |
| foundations/part_map.md | 1 | 0 |
| guidelines/styleguide-browser-view.md | 27 | 5 |
| src/browser/sim/data/scene.ts | 55 | 3 |
| src/browser/styles.css | 121 | 1 |
| src/browser/view/credit-lines.ts | 22 | 6 |
| src/browser/view/credits-section.tsx | 3 | 4 |
| src/browser/view/credits.ts | 34 | 0 |
| src/browser/view/scene-picture.ts | 154 | 5 |
| src/browser/view/scene.tsx | 123 | 2 |
| tests/view/icons.test.mjs | 40 | 7 |
| tests/view/scene-picture.test.mjs | 218 | 1 |
| tests/view/scene.test.mjs | 577 | 0 |

The merge's own resolution (`git show --remerge-diff ce465a2a`) touches only:

- `foundations/decisions.md`: the one line of D-271;
- `src/browser/view/credit-lines.ts`;
- `src/browser/view/credits-section.tsx`;
- `tests/view/icons.test.mjs`.

## Checks

| Command | Exit |
|---|---|
| `git rev-parse HEAD` → `ce465a2a5ab2…`; `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` → both `52f8164a…` | 0 |
| `git diff --cc ce465a2a` (empty output); `git show --cc ce465a2a`; `git show --remerge-diff ce465a2a` | 0 |
| `npm run typecheck` | 0 |
| `npm run build` (writes `dist/`, ignored by `.gitignore:3`) | 0 |
| `node --test tests/view/icons.test.mjs tests/view/headquarters-screen.test.mjs tests/view/account-screen.test.mjs tests/view/scene.test.mjs tests/view/scene-picture.test.mjs` | 0 (255 tests, 255 pass) |
| `npm test -- tests/invariants/test_icon_credits.py tests/invariants/test_browser_view_token_values.py` | 2 (`scripts/test.py` takes exactly one path; a usage refusal, not a test result) |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 (3 tests OK) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests OK; it cannot see I-1) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| `git status --short` before and after | empty |

Manual checks:

- Read the resolved conflict hunks against both parents.
- Traced the flying icon's `href` to `assets/icons/`.
- Ran `git blame` on the contradicting lines.

Not run:

- The full `npm test`, the cycle's own run.
- A browser check of the section on Siedziba and the card. Both render the one component that the markup tests cover.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-316 (`:6952`), whole: the dispatch named it; listed here only as read.
- D-41's sentence on `tile-revealed` and `depleted` (`:894`): to confirm that map icons are untouched by the merge.
- `src/browser/view/scene.tsx:100-191`, `src/browser/view/scene-picture.ts` (lines with `href`) and `src/browser/styles.css:1800-1834`: to see how task 17 draws its icon, which became I-1.
- `tests/view/headquarters-screen.test.mjs:500-534`: a credits link assertion that the pack line could affect; it led to M-1.

## Unread material

- Task 17's merged code and tests outside the meeting points: `src/browser/sim/data/scene.ts`, most of `scene-picture.ts` and `scene.tsx`, the rest of `styles.css`'s scene rules, `tests/view/scene*.test.mjs` beyond the flight cases. Read only by search for icons, credits and footer.
- The changed lines of `foundations/decisions.md` for task 17's entries other than D-271, D-316 and D-364 to D-367. Not read.

All entries the dispatch names were read whole:

- decisions: D-27, D-40, D-43, D-47, D-262, D-271, D-316, D-364, D-365, D-366, D-367;
- invariants: `icon-credits`, `sprite-credits`;
- environment fact: `smoke-fire-particle-licence`;
- the part-map line;
- `guidelines/styleguide-browser-view.md`, whole.

## Searches not found or unclear

- `npm test` with two paths is refused (exit 2). One path per run is the working form; the merge report does the same.
- No test of Siedziba or of the card asserts the pack row by its text. The row reaches both screens only through the one component, whose markup `icons.test.mjs` checks. Not a finding.
