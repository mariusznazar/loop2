PASS 55773884eb56b16420f352edc2c8f54f83eb12c9

# Review of the fix of the return-step review - loop2: uklad na telefon dla wszystkich ekranow gry

Range: `c254ba21a6c126e849d998d7e3e20a966b3cfeeb..55773884eb56b16420f352edc2c8f54f83eb12c9`, one commit, `foundations/decisions.md` (+11 -8) and `guidelines/styleguide-browser-view.md` (+7 -6). `git rev-parse HEAD` = `55773884eb56b16420f352edc2c8f54f83eb12c9`. Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. Findings file: `reports/findings-return-review.md` (one blocking finding).

Counts: blocking 0, Minor 0 new, out of scope 0.

## The finding

**1. D-325 (and D-331) "on the left / on the right" for Mapy - fixed.**

- D-325's binding sentence now ends "..., the card standing under the list in the phone layout (D-282, D-396)." (`foundations/decisions.md:10130`), the clause D-166 got. Its *Verification* splits the pair by layout (`:10140-10147`): complies in the computer layout as before, and "in the phone layout at a page area 360 px wide the list of the open maps with the card of Las under it"; violates the old arrangement "in the computer layout" and "the card and the list side by side in the phone layout". This agrees with the code: `src/browser/styles.css:258-264` (`.screen.maps-screen` one column under `@media (width < 1280px)`) and `src/browser/view/maps-screen.tsx:691-695` (`maps-list-area` before `maps-card-area`).
- D-331's binding sentence now reads "„Wybierz mapę z listy.” stands on the right, under the list in the phone layout (D-282, D-396), in `text-secondary`" (`:10267`), true in both layouts. Its `tests:` clause says "alone in the area of the card", which is what the test asserts: `tests/view/maps-screen.test.mjs:229-233` reads `.maps-card-area`.
- The lines `decision:` quoting D-325 ("The screen Mapy holds on the left the list of the maps open to the player", in `tests/view/maps-screen.test.mjs` and `tests/view/account-screen.test.mjs`) and D-331 ("... stands on the right") still quote a prefix; `foundation_check.py` passes.
- The styleguide's section "The screen Mapy" (`guidelines/styleguide-browser-view.md:829-846`) was brought along: the intro says left/right in the computer layout and the card under the list in the phone layout; "po prawej" became "w obszarze karty" in the Good example and the list rule, and the Bad example "Obszar karty przed wyborem pusty". D-282 and D-396 joined the section's *Decision* line, as the sections of Wiedza and Postać have D-396. The section's form (fields *Decision*, *Invariant*, *Good*, *Bad*, then the rules) is unchanged. Carrying the correction to the styleguide is the same correction (WAY-11), not scope added.

## The fix diff itself

Nothing broken: the edits are words of two decisions and one styleguide section, each now true in both layouts, and no new check warning (below). D-331's *Rejected* "the right area empty, as in the predecessor game" stays; it names a rejected way and claims no current placement.

## My own search for placement words, again

- `foundations/decisions.md`: `grep -n -i -E "on the left|on the right|on its (left|right)|to the (left|right)|(left|right) of the|side by side|two columns|three columns|left column|right column"`. Every hit in a binding sentence or pair either is qualified for the computer layout (D-166 `:8317`, D-325 `:10130`, D-331 `:10267`, D-311 `:10551-10594`), places things inside one row or one area that the phone layout keeps (D-44's pair, the chronicle's minute "in a column on the left" `:11278`, `:11295`), is the rule panel's pick grid (D-288 `:9350`, D-290 `:9763`, `:9771` "conditions in two columns"), or is the scene (`:11525-11559`, `:11747`). The rest stand in *Rationale* or *Rejected* about the computer layout or a rejected way (`:5686-5689`, `:9425`, `:10607-10679`, `:10930-10957`).
- `guidelines/styleguide-browser-view.md`: `grep -n -i -E "po prawej|po lewej|obok siebie|dwóch kolumn|dwie kolumny|praw(a|ej|ą) kolumn|lew(a|ej|ą) kolumn|prawy obszar|lewy obszar|prawa część|lewa część"`. Wiedza (`:913`) places "po lewej Zrozumienie, po prawej drzewa" and the next sentence gives the phone-layout order; Postać (`:947-949`) gives "w układzie komputera" and "w układzie telefonu ... lewy stoi nad prawym"; Mapy (`:837`) as fixed; the others place a bar, a name or a creature inside a row or the scene.
- No sentence found still false in the phone layout.

## The fix agent's reading of "left area" / "right area" (D-416, D-445, D-446)

I agree: in these entries "the left area" and "the right area" name the two areas of a screen, not a position at every width.
- D-282 (`foundations/decisions.md:4646-4648`) binds that "each column of a screen is an area of its own that a narrower layout can rearrange" and that "the narrower layout is the phone layout", so a name by the computer layout's position carries no claim of position in the phone layout.
- The code uses the names the same way: `src/browser/character-screen.css:27-35` reads "in a window narrower than 1280 px the left area stands over the right one".
- D-416's pair already holds the phone-layout case ("in the phone layout the two areas of the screen standing one under the other"), and the styleguide sections of Wiedza (`:913-916`) and Postać (`:945-949`) give the phone-layout order.
- D-445's "at the top of the left area ..., beside the character's name" and D-446's "Beside the figure of a character" place things inside the area's head (`.character-head`, a flex row, `character-screen.css:44-48`), which the phone block of the screen does not change; true in both layouts.
- Touching them would also move the prefixes quoted by `tests/view/knowledge-lines.test.mjs` and `tests/view/character-screen.test.mjs` for no change of meaning.

## Declined to judge

- The four Minor findings of my first review (D-166's unqualified first clause, D-166's *Rationale*, recipe (c) and `startLoop`, the fact's place): Minor findings of the return-step review are not fixed and are not in the findings file.

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` - exit 0, "0 errors".
- `python -B .the-way/instruction-files/check_instructions.py` - exit 0, "0 error, 144 warn, 7 info", the same count as before the fix; the two warnings on the Mapy section (`styleguide-browser-view.md:836`, `:845`, "`#/mapy` does not exist") are the older dead-path warnings of that section on shifted lines.
- `grep -rn "D-325\|D-331" tests/ | grep decision:` - the quotations still stand as prefixes (as above).
- Manual: the two placement searches above.
- Not run: the product's full gate (left to the cycle).

## Reaches beyond the dispatch

- D-445, D-446 whole, D-282's binding sentences, D-325, D-331 whole: to judge the fix and the fix agent's reading (the dispatch named them).
- `src/browser/character-screen.css:20-50, 250-275`, `tests/view/maps-screen.test.mjs:218-240`: to check the reading of "left area" against the code, and D-331's new `tests:` wording against its test.
- `guidelines/styleguide-browser-view.md:905-916, 940-952` and the Mapy section `:829-846`: the styleguide sections the reading and the fix rest on.

## Working copies

- `.runs/review-return-2` held `fc.txt` and `ci.txt` (the outputs of the two checks). Removed before returning; nothing kept.

## Unread material

- `guidelines/styleguide-browser-view.md`: read at the Mapy, Wiedza and Postać sections and at the lines the search found, not whole.
- `.the-way/product-guidelines/template.md` and the styleguide template: not read; the fix changes the content of one rule, not its form.
- `reports/return-step-report.md`: read from line 78 (the fix's section) to the end; the earlier part was read in my first review.
- The decisions found by the search: read at the hit lines and enough around them to tell binding text from *Rationale*/*Rejected*, not whole, except D-325, D-331, D-445, D-446.

## Searches not found or unclear

- A placement written with other words ("above", "under", "next to") is not reached by my patterns; the fix agent searched "under the list/card/world", "one under the other" and "next to" and found none false; I did not repeat those.
- D-290 (`:9763`, the grid of the rule panel's pick) was read at its hit lines only; it is about the grid of conditions, which the change does not stack.
