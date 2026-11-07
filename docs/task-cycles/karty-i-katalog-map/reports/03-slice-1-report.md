# Report - slice 1 (Styleguide of the screen Mapy and of the main look of "Wejdź")

**Status:** done with concerns

**Commits:** `ce5e865` docs: :memo: write the styleguide's look of the screen Mapy, the Mapy item of the menu bar and the main look of Wejdź

**Worktree:** the root of the task worktree, branch task/karty-i-katalog-map, base afe592060eefe7a33c120b62250b13bdc91f1fe4. The-way pin `294af7fde45323ac1851c014a03071a97fc38d96` matches the gitlink. The tree is clean after the commit.

## Files changed

- `guidelines/styleguide-browser-view.md`: 66 lines added, 18 removed. No product code changed; no test changed.

## What changed in the styleguide

1. **Rule "Main button, secondary action and tab"**: Decision adds D-287. The paragraph on the main look now covers the button that sends a form and „Wejdź” at each character in „Kto idzie”. „Wejdź” gets the main look from the new kind `main` of the shared button (`createButton(text, { kind: "main" })`, `<ReactButton kind="main">`, class `main`). A disabled „Wejdź” (D-287) looks the same. „Puść w pętlę” stays a plain button. The old sentence that left the look of „Wejdź” to the task of its screen is gone.
2. **Rule "States of shared controls"**: the main-look paragraph names „Wejdź” (D-274) and its disabled state (D-287), in the existing main-look wording.
3. **Rule "Menu bar, the menu „Konto” and the list of programs"**: Decision adds D-330. The bar holds „Siedziba”, „Mapy”, „Programy”. „Mapy” is the first of the three clicks to the first map run (D-330). On the screen Mapy the bar marks Mapy under each of its addresses (D-280).
4. **New rule "The screen Mapy"** (before "Program editor"): Decision D-325, D-326, D-327, D-328, D-329, D-331, D-134, D-188, D-217, D-244, D-251, D-274, D-287, D-39, D-40; Invariant `none`. It gives the look of the list of maps (rows as links, „rozwiązana” in `positive`, the picked row as the picked program), the „Wybierz mapę z listy.” sentence before a pick, the card (heading, the five part names in `text-label`, warnings in `warning`), and the section „Kto idzie” with its lines at each character in the order of D-329, plus the team-empty sentence.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Foundation check (the slice's Checks) | `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors" |
| Every decision cited in the file exists in `foundations/decisions.md` (heading `### D-nnn —`) | `grep -c "^### D-<n> —" foundations/decisions.md` for each of D-325..D-332, D-134, D-188, D-217, D-244, D-251, D-274, D-287, D-280, D-281, D-277, D-276, D-275, D-285, D-39, D-40, D-43, D-44, D-133 | 0 | each count 1 |
| Roles used in the file are the table's roles | `grep` of backticked tokens against the Roles table (rows 16-41) | 0 | Every role token is in the table. The non-role tokens are code names: `main` (the new kind, slice 3), CSS and attribute names, invariant names. |

No test was run: this slice changes no code and its only invariant rule is `none`. No full `npm test`, as the handoff says.

## Own-work check (section 3)

- **Requirement:** the menu bar holds „Mapy” between „Siedziba” and „Programy”, linking to `#/mapy` and marked on both screen addresses (To do 1).
  **Check:** read the rule text after the edit (`guidelines/styleguide-browser-view.md` lines 447-452).
  **Result:** the item and its marking are written as required.
- **Requirement:** no new role, meaning or token value.
  **Check:** role-token comparison above.
  **Result:** pass.
- **Requirement:** every cited decision is one the foundation holds.
  **Check:** heading count above.
  **Result:** pass.

No check failed, so no run was repeated.

## Reaches beyond the handoff

- `src/browser/view/headquarters.ts`: `grep` for `className` and for „Program”/„Wejdzie”/„niezakończone” lines (lines 52-55, 316-429). Purpose: find the roles the current Siedziba gives its team and map lines, where the task names none.
- `src/browser/styles.css` lines 1236-1380 (beyond the handed 660-800). Purpose: the current roles of `.team-member-*`, `.map-label`, `.trip-result` and `.rehearsal-mark`, the same reason.
- `src/browser/view/character-screen.tsx:130` and `src/browser/view/screen-address.ts:125` (grep lines): the current wording of the unfinished-run sentence and of „Wróć do przejścia”.
- Not read, and why: `ui_check.md` (section 3 applies only to a change of what a screen shows; this slice changes the styleguide only); the styleguide skill's step files (`recognize.md`, `audit.md`, `settle.md`, and others): the cycle author's column uses only the two templates, which I read.
- No product-code guideline (`guidelines/coding.md`) was read because no product code changed.

## Choices made, and the way rejected

- **Non-picked map row: text in `text`.** The task names only the picked row. I took the look of an unpicked program on the list of programs (`text`). Rejected: a new role or a text-secondary row; those would be new looks not in the task. Cost if wrong: one line of the rule.
- **Content lines of the card (terrain figures, resource lines, „Żąda” sentence, creature line, attack line): `text`.** The task names no role. D-40 gives `text` for content to read. Rejected: `text-secondary` for all of them, which would put the sentence of the condition in the role of a description. Cost if wrong: a role change on each such line.
- **Step remark „— drożej niż zwykle” / „— taniej niż zwykle”: `text-secondary`.** The task names no role; D-40 gives `text-secondary` for a note. Cost if wrong: one line.
- **Team-empty sentence, „Przejście na mapie … jest niezakończone …”, „Pętla zatrzymana …”: `text-secondary`.** The task names no role for them. I took the role the current Siedziba gives them (`.headquarters-empty`, `.team-member-run-note`, `.team-member-stopped`, all `text-secondary`). Rejected: `warning` for the unfinished-run sentence, since it says what will not run; the current code is the existing decision, so I kept it. Cost if wrong: a role change on three lines.
- **Name of a character as a link: `text-strong`.** D-40 gives `text-strong` for a name; the current `.team-member-name` uses it.
- **The rule describes kind `main` before code has it.** That is the plan's order (slice 3 adds the kind and its kitchen-sink sample). Cost if the slices land out of order: the rule is ahead of the code for a while.

## Searches not found or unclear

- The task does not say whether „Wejdź” waits for a server answer. The *Loading* state of the shared controls applies only to a button that waits for the server, and I did not extend it to „Wejdź”. Unclear: whether the loading look applies to „Wejdź”. Left unsettled in the rule.
- The task does not name the role of the non-picked map row, nor of the content lines of the card; see choices above.
- `grep` for `kind: "main"` and `kind="main"` in `src/browser` found no such kind (expected, slice 3). `src/browser/view/controls/button.ts` still says the main look "needs no kind of its own"; that comment is now out of date and slice 3 must change it. Not changed here: it is not in this slice's Change.
- `grep` for „Wejdź” in `src/browser/view`: no match in a button of the screen Mapy, since the screen is not written yet (slices 6-8).

## Questions and concerns

1. **Question for the orchestrator:** should „Wejdź” take the loading look (its text in `text-disabled` and its label changed while a server answer is awaited)? The task is silent. Recommendation: no, since „Wejdź” sends no request to the server, and the rule as written says loading applies only to a server wait. If the human wants it, that is a one-line change.
2. **Concern for slice 3:** `guidelines/styleguide-browser-view.md` now names kind `main` and class `main`; `src/browser/view/controls/button.ts` (its header comment), the kitchen-sink page and `styles.css` must follow in the same slice, as the styleguide's kitchen-sink rule requires.
3. **Concern:** the non-picked map row and the card's content roles are my reading of the task (listed under choices). The human has not approved them; they are most likely to be questioned at the review of this change.

## Problems observed

None in the foundation: `foundation_check.py` reports 0 errors, and every cited decision is held by the foundation.
