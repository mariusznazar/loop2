PASS 9a8c4e23acb9b7e540e5d49ca33f6071c2bf9fc9

# Review of slice 3 (fccc084..9a8c4e2), task edytor-programu

HEAD confirmed 9a8c4e2. One commit, 12 files.

## Findings
Blocking: none. Important: none.
Minor (in scope):
- src/browser/sim/data/actions.ts: icon and iconTitle are optional, and no test asserts that each of the nine actions carries an icon field (the executor said so); six actions are covered only through the literal footer lines in tests/view/icons.test.mjs. Acceptable until slice 4 makes the fields required.
- src/browser/view/footer.ts: the footer line for a shared icon joins the action labels (e.g. "Idź, Idź — ognisko"); no rule in the foundation settles the format. Choice is reasonable and tested literally.

## Changed tests outside the Change list
- tests/view/icons.test.mjs: expectations extended (TITLES, ACTION_ICONS, NAMED, items.length === NAMED.length). Justified: the footer now has 11 lines. Not weakened; the six action lines are literal strings, the length check became stricter-by-derivation (NAMED.length) but NAMED is a literal list for the new part.
- tests/sim/data.test.mjs: three deepEqual expectations gained the icon fields. Justified; not weakened.
- tests/invariants/test_icon_credits.py (in the list): AUTHORS and TITLES extended; no assertion weakened.

## Declined to judge
- Authors of the icons logging and dodge (slice 4).
- Drawing the icons (nothing draws them yet; no visual check applies).

## Trust boundary: assets/icons/**
- Fetched the six sources from raw.githubusercontent.com at commit 82d948812bfe3f269ef8f731dcdb07b08160edc4 (all HTTP 200) into /tmp/rv3src, outside the worktree. Applying the recipe (remove <path d="M0 0h512v512H0z"/>, fill #fff to #f4f4f5) gives output byte-identical to each committed file (stripped): binoculars, hiking, direction-sign, grab, claw-hammer, match-tip all True.
- Read each file: only one <svg xmlns viewBox> element and one <path fill d> element; no script, style, href, image, foreignObject, event attributes, external reference or data URI.
- Credits: ICON_CREDITS gives the right folder author (Delapouite: binoculars, hiking, direction-sign; Lorc: grab, claw-hammer, match-tip), the page URL under game-icons.net/1x1/<author>/<name>.html, and the changes statement; the source folders in the fetch matched. Titles in footer data and tests match the recorded facts. The footer credits each file once.
- Invariants icon-file-content, icon-credits: tests pass (below). loop2-container-icons: executor reports pass (127.6 s, Docker); I did not rerun it (long, Docker).

## Checks I ran
- git rev-parse HEAD, git log, git diff fccc084..9a8c4e2: exit 0.
- Byte comparison of six files against source (python -I): all equal.
- npm test -- tests/invariants/test_icon_file_content.py: exit 0 (2 OK)
- npm test -- tests/invariants/test_icon_credits.py: exit 0 (5 OK)
- npm test -- tests/view/icons.test.mjs: exit 0
- npm test -- tests/sim/data.test.mjs: exit 0
- git status: worktree clean after the checks.
Not run: full gate, test_loop2_container_icons (executor's run relied on), typecheck.

## Reaches beyond the dispatch
None beyond the dispatch's named files, the diff, and the fetched sources.

**Searches not found or unclear:** none
