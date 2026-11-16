# Slice 4 report: tests read the game's stylesheets as the page links them

**Status:** done
**Commit:** `57d1f0ab` test: :recycle: read the game's stylesheets through a helper as the page links them (on `task/porzadki-widoku-po-react`, on top of base `b607bfe5`)
**Check result:** all four focused checks passed (three test files, eslint, prettier); nothing of the slice's checks left unrun. `foundation_check.py` and the full suite were not run (not checks of this slice).

## Files changed

| File | Added | Removed | Note |
|---|---|---|---|
| `tests/view/game-stylesheets.mjs` (new) | 45 | 0 | helper; not a `*.test.mjs`, no jsdom import |
| `tests/view/world-area.test.mjs` | 5 | 7 | `readFileSync` import removed; `STYLES` from the helper; comment "the real stylesheet" -> "the game's stylesheets" |
| `tests/view/run-header.test.mjs` | 3 | 6 | `readFileSync` import removed; `addStylesheet` reads the helper; doc comment updated |
| `tests/view/rule-signs.test.mjs` | 9 | 9 | `readFileSync` import removed; the order case reads the helper's text; header and case comments say "the game's stylesheets" |

No expectation, assertion, test name or skip changed in the three tests. The reason, by "Changing an existing test" of `guidelines/testing.md`: the stylesheet is split into files the page links (D-421), and a test has to read a rule where it stands after the split. The helper's text is the same as the file's text at base, so no expectation moves now.

## The helper

- Reads `src/browser/index.html`, takes the `href` of each `<link ... rel="stylesheet">` in order, drops `/tokens.css`, requires each other href to be a plain `/name.css` (throws otherwise), reads each file from `src/browser/`.
- Exports `gameStylesheetNames()` (the names, in order) and `gameStylesheetText()` (the texts joined by one `\n`).
- Not one-by-one reading: the handoff said "may"; I did not add a per-file export since no case needs it.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/world-area.test.mjs` | 0 | 22 pass, 0 fail (rerun after the commit-ready state: same) |
| `npm test -- tests/view/run-header.test.mjs` | 0 | 24 pass, 0 fail |
| `npm test -- tests/view/rule-signs.test.mjs` | 0 | 6 pass, 0 fail |
| `npx --no-install eslint --max-warnings 0` on the four files | 0 | clean |
| `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the four files | 0 | first run exit 1 on the helper (formatting); I ran `prettier --write` on the helper only, then the check passed |
| `node --input-type=module` one-liner: `gameStylesheetText() === readFileSync("src/browser/styles.css")` | 0 | `true`, both 97336 characters |

Failing runs of the tests: none. No test was written first; this slice writes no new case (the handoff names no failing test), so the "seen failing once" rule does not apply.

## Own-work check (section 3)

- Requirement: the helper gives exactly today's stylesheet, so no case sees a change, and the three tests keep their expectations.
- Check: the byte-equality one-liner above, plus the three test files passing with unchanged assertions.
- Showed: equal text, all tests pass.
- Not covered: the join across several files and the link order. At base there is one file, so nothing exercises the order across files; that first happens in Slices 6 and 7. This is a concern for those slices, not a defect here.

## Mismatches between the plan and the code

- Plan and handoff line numbers are older: `world-area.test.mjs` read at line 34, `run-header.test.mjs` at 430, `rule-signs.test.mjs` at 248 at my base. Found by search; adapted.
- `tests/view/world-area.test.mjs` comment at 789 used "the real stylesheet"; changed to "the game's stylesheets" as the plan's comment rule asks.
- `rule-signs.test.mjs` test title still reads "the stylesheet puts the background under the pointer ..." — left unchanged (a title, not an expectation; renaming it changes the test's name in reports). Flagged, not changed.
- Read by the plan but not changed by this slice: `src/browser/AGENTS.md` line 5, `guidelines/styleguide-browser-view.md`, `tests/view/scene.test.mjs` line 31 and `shared-controls.test.mjs` line 2 still name `styles.css`. Those belong to Slice 5 (scene) and to the plan's item 6 slices; not touched here.

## Reaches beyond the handoff

- None into product code. I read `scripts/test.py` (the runner picks `tests/view/*.test.mjs`, so the helper is not run as a test; confirmed by its name) and `tests/view/page-document.mjs` head for the helper's style.
- Running `npm test -- <file>` builds `dist/` first (the runner's build step); that is what the handoff's checks do.

## Unread material

- `guidelines/coding.md`: not read whole (I read only the table of kinds through a truncated output). Rules applied in the change: English comments and identifiers, no test of the helper, no assertion change.
- `guidelines/testing.md`: read the "Changing an existing test" rule and the levels/mutation sections only; not whole.
- `guidelines/styleguide-browser-view.md`: not read (it is named in the handoff; this slice changes no look and no style rule).
- `src/browser/AGENTS.md`: read only its line 5 (through grep); lines 1-4 and 6-9 not read. Nothing in my change depends on them.
- `foundations/part_map.md` lines 3-28: not read (named by the handoff; the part is browser-view, whose tests are in `tests/view/`, which fits the change).
- Read whole: the handoff, `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `task.md` lines 30-130, D-421 (`foundations/decisions.md:4551-4565`), `src/browser/index.html`, `src/browser/kitchen-sink/index.html`, `scripts/static-files.mjs`, the three test files' relevant regions.

## Searches not found or unclear

- The plan says the helper "may also give them one by one". Left out; the handoff's "may" makes it optional.
- The helper's source for the "order the page links them" rule is the HTML itself, as the handoff says; nothing else in the repo parses `<link>` tags, so there is no existing helper to reuse.

## Working copies

- `.runs\slice-4-executor\` (log files of the four focused checks, and the commit message file): removed after this report was written; logs are summarised above with exit codes.
- `.runs\slice-4-executor-world-area.log`, `...-run-header.log`, `...-rule-signs.log`: earlier copies of test logs written into `.runs/` root by the first run; removed with the same step.
- No git worktree was created; nothing else to remove.
