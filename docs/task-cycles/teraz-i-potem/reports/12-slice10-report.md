# Report 12 — slice 10 (make-change)

**Status:** done

## Commits and files

- Base: `730bc50`. Commit `434f32b` (`docs: :memo: add the rows of now-lines.ts and now-rows.tsx ...`).
- `guidelines/coding-browser-module.md`: +2 / -0 lines. Two rows in the table *Files of this kind*, between `menu-bar.tsx` and `password-reset.ts` (alphabetical order of the table):
  `src/browser/view/now-lines.ts` | copy | —, and `src/browser/view/now-rows.tsx` | copy | —.
- Line endings of the file kept as they were (LF).

## Checks

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `grep -nE "createElement\|document\.\|appendChild\|innerHTML\|\.append\(\|createTextNode\|createElementNS" src/browser/view/now-lines.ts src/browser/view/now-rows.tsx` | 1 (no match) | neither file builds elements through the DOM API |

Not run: the product's whole gate (`npm test`), by the handoff.

## Own-work check

Requirement most likely unmet: status `copy` is right only if neither file builds elements through the DOM API (D-265, rule "Nowy ekran i moduły w DOM"); the slice says to return a question otherwise. I read the head of both files (`now-lines.ts`: pure text functions importing data and `program-editor.js` pure helpers; `now-rows.tsx`: React components, imports only types from `react`) and grepped for DOM-building calls: no match (exit 1). So `copy`, decision `—` (neither is the exemplar, D-36, which stays on `account-card.tsx`).

## Reaches beyond the handoff

- `.the-way/product-guidelines/coding/SKILL.md` (sections "Where the skill works", "Rules that hold across the steps" start) and `template.md` sections `## Files of this kind` / "Writing the files": named by the slice. Rows follow the template: path in backticks, status one of three, `—` in Decision except for the exemplar.
- Not read whole: D-28, D-36, D-265, D-269, `coding.md`, `part_map.md` agent-workflow, `.the-way/product-guidelines/template.md` and the full SKILL.md of the coding skill (only the parts above). The change is two rows whose status the template and the existing rule in this very file determine; nothing in the unread entries could change them. Gap in my reading, named here.

## Questions and concerns

none. The matter the skill leads with a human (statuses) is answered by To do 5 and the slice (rows for the new view files, status by the DOM rule).

## Choices

- `copy` for both files, `—` decision. Rejected: none considered (the DOM-API test is decisive). Cost if wrong: a future new screen might be written after a file that is not a good model; the rows are easy to change at the next audit.

## Searches not found or unclear

none
