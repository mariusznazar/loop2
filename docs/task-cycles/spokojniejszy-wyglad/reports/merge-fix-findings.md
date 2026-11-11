# Findings of the review of the reconciliation with the target branch — blocking, for one fix

In the reviewer's words, from `merge-review-report.md` (first line `FAIL ce465a2a5ab28fd392f8791e811488d123bb825b`). The Minor finding M-1 of that report is not part of this fix.

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
