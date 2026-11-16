# Browser view

## Design tokens

In a file of the part `browser-view` other than `src/browser/tokens.css`, write no colour in any notation, and in a style no length in `px`, `rem` or `em`, no font name and no unitless stroke width, dash pattern, opacity or font weight. Read the value instead from its custom property in `src/browser/tokens.css` through `var(--<name>)`, in a stylesheet and in a TypeScript string alike, or give the element a class whose rule reads it, in the stylesheet of the screen or the shared part the element belongs to, or in `src/browser/styles.css` for what is shared by all (the rule "A stylesheet of its own for each screen and each shared part" of `guidelines/styleguide-browser-view.md`). A class that an element of the kitchen-sink page (`src/browser/kitchen-sink/`) needs for its own samples has its rule in `src/browser/kitchen-sink/kitchen-sink.css`, not in `src/browser/styles.css`, which is copied to `dist/public` and reaches the players. What counts as such a value and what is exempt is D-43 in `foundations/decisions.md`, set out in the rule "No value in place of a design token" of `guidelines/styleguide-browser-view.md`.

The invariant `browser-view-token-values` in `foundations/invariants.md` guards this rule; a value the text of a file does not show, such as a colour a module computes from numbers, is left to review.

This holds with a human present and without one. A value the token file does not hold yet, and a changed value of one it holds, enter it only with their source settled with the human, as the styleguide's rule "Every value with its source" gives; without a human, name the missing or changed value in your report instead of choosing one.
