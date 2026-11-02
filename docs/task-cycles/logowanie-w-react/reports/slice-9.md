# Slice 9 report - The folded credits

**Status:** done

**Commit:** 0021295 (base cc1c1e8)

**Files changed:** src/browser/view/credits-section.tsx (new, about 38 lines); tests/view/icons.test.mjs (+55); tests/invariants/test_icon_credits.py (about +110, 4 changed). `footer.ts` untouched.

**Read (one per call, whole unless a range is given):** make-change SKILL.md, slice.md, guidelines/coding.md, coding-browser-module.md, testing.md, styleguide-browser-view.md, src/browser/AGENTS.md, footer.ts, credits.ts, loop2_invariant_support.py:175-225, decisions.md D-47 (957-971) and D-27 (639-675), invariants.md icon-credits (331-343), tests/view/icons.test.mjs, tests/invariants/test_icon_credits.py, react-button.tsx (as the convention for a React view file). Not read: task.md, spec.md, plan.md (handoff carried the passages).

## Checks
- `npm test -- tests/view/icons.test.mjs` exit 0 (29 tests).
- `npm test -- tests/invariants/test_icon_credits.py` exit 0 (5 tests).
- `npm test -- tests/quality/test_quality_invariants.py` first exit 1 (Ruff FURB192 on my `[...][0]` in test_icon_credits.py), after change to `next(...)` exit 0. Both runs recorded (WAY-262).
- Invariant seen failing once: with `footerCredits().slice(1).map(` in credits-section.tsx, `npm test -- tests/invariants/test_icon_credits.py` exit 1 ("wood-stick.svg: the footer shows no credit..."), and `npm test -- tests/view/icons.test.mjs` exit 1 (2 section tests). Restored, both exit 0 after.
- Not run: full `npm test`, foundation_check (orchestrator's gate).

## Own-work check
Requirement: content equals the footer's, folded by default, links in a new tab, no document needed. Check: the icons test asserts `document` is undefined, markup shape, no `open`, no handlers/script, each line's text against independent TITLES literals, and link attributes. Shown passing; the break above shows both checks fail on a missing credit.

## Choices
- Python driver loads react and react-dom/server via `createRequire` on the built copy's package.json; the made-up control section is a factory taking `createElement` (a bare `import "react"` from a temp dir cannot resolve).
- The Python test does not scan for a caller of `CreditsSection` (no card draws it yet); the docstring says so. Cost if wrong: the invariant does not yet prove the login card shows the section; a later slice should add that scan.
- Author and source URL in icons.test.mjs link test come from ICON_CREDITS (same as the existing footer tests); titles are independent literals.

## Reaches beyond the dispatch
react-button.tsx, to match the React file convention.

## Searches not found or unclear
- `.runs/.../scripts.md` rule (`.ai\rules\scripts.md`) was not read before the one-off Python heredocs I used to edit files; the edits wrote LF and UTF-8 explicitly and Prettier/Ruff passed.
- Invariant text says "login card's section"; no card exists yet, so only the component is checked.
