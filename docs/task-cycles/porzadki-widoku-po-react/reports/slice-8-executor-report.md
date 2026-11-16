# Slice 8 — executor report

**Status:** done

**Commit:** `45f9b25c` (on base `deed67af`) — `docs: :memo: add the styleguide's rule of a stylesheet for each screen and point the places that named styles.css to the files where the rules stand`

## Files changed (insertions / deletions)

- `guidelines/styleguide-browser-view.md` — 43 / 14 (the new rule 29 lines, the rest the renamed places and the D-43 sentences)
- `src/browser/AGENTS.md` — 1 / 1
- `src/browser/view/accounts-screen.tsx` — 1 / 1 (comment)
- `src/browser/view/knowledge-screen.tsx` — 1 / 1 (comment)
- `src/browser/view/rule-panel.tsx` — 1 / 1 (comment)
- `src/browser/view/email-status.ts` — 2 / 2 (comment)

## What was done

- New rule `### A stylesheet of its own for each screen and each shared part` in the styleguide, after "A fault of one screen is fixed in its component": *Decision* D-421 · D-408 · D-28, *Invariant* none, Good, Bad, then the how-to in Polish (own `.css` directly in `src/browser/`, own `<link>` in `index.html` after `/styles.css`, a new screen adds both, comment at the head of the file, tokens through `var(--…)`, no `outline` or second `:focus-visible` in a screen's sheet; `styles.css` keeps the shared part, the kitchen-sink page links, besides tokens, `styles.css` and `kitchen-sink.css` alone). The rule carries no rationale (the template forbids it); the reason that the rule stands in the styleguide is not written into it.
- D-43 restated in the two places: row `text-strong` of the table of roles, and the rule "No value in place of a design token" — both now add the icon on each plaque of a discovery in the scene. The arkusz does it already (`.scene-discovery-plaque { color: var(--text-strong) }`, `run-screen.css:846-860`), so no "why not" was needed.
- Twelve places of the styleguide that named `styles.css` for scene / end-window rules now name `src/browser/run-screen.css` (base lines 126, 134, 679, 708, 727, 743, 756, 773, 819, 838, 907, 921; each verified: the classes are only in `run-screen.css`, none in `styles.css`). Line 149 (`:focus-visible`) stays `styles.css`.
- `src/browser/AGENTS.md`: rule of design tokens sends a class's rule to the stylesheet of the screen or the shared part, or `styles.css` for what is shared by all, and points to the new rule.
- Comments: `accounts-screen.tsx` -> `accounts-screen.css`; `knowledge-screen.tsx` -> `knowledge-screen.css`; `rule-panel.tsx` -> `program-panel.css` (`.rule-panel-cells.two-columns` at `program-panel.css:465`); `email-status.ts` now says the kitchen-sink page "holds React (D-269)" and that menu and page write the same words from this one module (verified: both `menu-bar.tsx:29` and `kitchen-sink.tsx:37` import it).

## Checks

| Check | Command | Exit |
|---|---|---|
| foundation check | `python -B .the-way/elements/common/foundation_check.py` | 1 — one error, `tests/view/run-screen-state.test.mjs:309` (the known one of slice 1, not mine); no other error |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 — 0 error, 142 warn (not new; two are dead paths of `guidelines/testing.md:277`), 7 info |
| typecheck | `npm run typecheck` | 0 |
| eslint | `npx --no-install eslint --max-warnings 0 <four .ts/.tsx files>` | 0 |
| prettier | `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore <four files>` | 0 |
| listing | `git grep -n "styles\.css"` | judged below |

Not run: the product's gate (`npm test`), as the handoff says. The tests of `tests/view/email-status.test.mjs` and `account-screen.test.mjs` were not run: the change in the TypeScript files is comments only.

### Listing of `git grep -n "styles\.css"` after the slice, judged

(Without `foundations/decisions.md` and `foundations/invariants.md`, which are the human's and the foundation's steps; they name `styles.css` for the shared stylesheet, D-265, D-421 and D-47's invariant, and are right.)

- `guidelines/coding-browser-module.md:181,185` — the look of a shared control: stays in `styles.css`. Right.
- `guidelines/styleguide-browser-view.md:150` — the `:focus-visible` rule: `styles.css`. Right.
- `guidelines/styleguide-browser-view.md:343,347,352,358,362` — the new rule, about the shared file. Right.
- `src/browser/AGENTS.md:5` — new text: `styles.css` for what is shared; the kitchen-sink sentence is true. Right.
- `src/browser/{account-card,accounts-screen,character-screen,credits,headquarters,knowledge-screen,maps-screen,program-panel,programs-screen,run-screen,waiting-screen}.css` head comments — "The page links it after styles.css" (a statement of order; true) and, in `knowledge-screen.css:3` and `maps-screen.css:4`, "the columns of the two areas stand in styles.css" — verified true (`styles.css:235,243` `.screen.knowledge-areas` and the 720 px rule of Programy, Mapy and Wiedza). Right.
- `src/browser/index.html:8`, `src/browser/kitchen-sink/index.html:9` — the `<link>` itself. Right.
- `src/browser/kitchen-sink/kitchen-sink.css:2,15,25,34,43,167` and `kitchen-sink.tsx:142` — the shared controls, the menu and the `:focus-visible` rule, which stay in `styles.css` (the plan says these do not change). Right.
- `src/browser/view/controls/react-*.tsx:3` — the look of shared controls. Right.
- `tests/invariants/test_browser_view_focus_outline.py`, `test_browser_view_token_values.py:537`, `tests/view/shared-controls.test.mjs:2` — the focus rule and the controls. Right.

Result: no place names `styles.css` for a rule that stands in another file.

## Own-work check

The requirement most likely missed: "no place names `styles.css` for a rule that stands in another file". Check: the `git grep` above, judged line by line, and for each styleguide line moved to `run-screen.css` a grep that the named classes (`scene-*`, `end-window`, `grayscale`, `max-height: 80vh`) stand in `run-screen.css` and `grep -n "scene-\|end-window" styles.css` finds none. It showed none missed. Second check: the new rule against the template (fields in order, no rationale, no inventory) and `foundation_check.py` (references D-421, D-408, D-28 resolve; no new error).

## Mismatches between the plan and the code

- None structural. Small: the plan's "base lines" matched except that two insertions of mine shifted later lines; the line numbers used above are base lines. Line 134 of the base ("Ich wartości stoją w regułach sceny w `styles.css`") and line 126 were both changed; the sentence "ma w tym samym pliku stylów" (line 132) was left as it was, since "the same file" now points to `run-screen.css` named at line 126.
- The handoff says the kitchen-sink page links `styles.css` and `kitchen-sink.css` alone; the page also links `/tokens.css` (as D-421 itself says: "the file of design tokens, `src/browser/styles.css` and its own stylesheet"). The rule writes "besides the file of tokens".

## Reaches beyond the handoff

- `.the-way/product-guidelines/template.md` I read in the range of the handoff only (39-133), as given. No other reach beyond reading `src/browser/kitchen-sink/index.html` (to confirm what it links), `foundations/decisions.md` D-421 (named in the handoff), CSS head comments and `grep` of the classes in the stylesheets (named in the notes), `guidelines/coding-browser-module.md:223-229` (to confirm D-269's rule name), and `the author's rules for writing scripts` and `git.md` (global rules; read on the hook's demand).

## Choices

- Place of the new rule: after "A fault of one screen is fixed in its component" (a rule of the same kind, about where a screen's rules stand). Rejected: after "The kitchen-sink page" — that rule is about the page, and the new rule names the page only as one of its clauses. Cost if wrong: a move of one section.
- `Decision` of the new rule: D-421 · D-408 · D-28 only, as the handoff says; D-47 and D-265 are named in the text where they apply (D-265 once), not in the field. Rejected: adding D-47 to the field. Cost if wrong: one more identifier in the line.
- Row `text-strong` of the table: the column padding (cell was padded with spaces to a width the table did not keep anyway; rows differ in length by up to 30 characters) was not re-aligned. Markdown is not checked by Prettier in this repo (`.prettierignore` absent, no prettier script for `.md`).

## Unread material

- `foundations/part_map.md` (browser-view and agent-workflow ranges), `guidelines/coding.md` and `guidelines/coding-browser-module.md`: not read whole. I read only the section "Strona wszystkich stanów z Reactem" of `coding-browser-module.md` (lines 223-229) and searched the other two for `styles.css`; the change touches no code and none of them says where a rule of a stylesheet stands.
- `src/browser/view/accounts-screen.tsx`, `knowledge-screen.tsx` and `rule-panel.tsx`: read in part (lines 1-60, 1-60, 85-115), whole comments edited.
- Everything else named (the handoff, `change/SKILL.md`, `slice.md`, the styleguide, `src/browser/AGENTS.md`, `index.html`, `email-status.ts`, D-28, D-408, D-43, D-421, D-47, D-265, D-269, the template range): read whole.

## Searches not found or unclear

none. (The handoff's note says D-43 is at `foundations/decisions.md:4698-4712` and so it was.)

## Working copies

None made; `.runs/slice-8-executor/` was never created.
