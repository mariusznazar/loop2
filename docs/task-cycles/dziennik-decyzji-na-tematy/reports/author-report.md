# Author report — dziennik-decyzji-na-tematy

**Status:** done

## Commit and files

- Commit `3b5af51b` on `task/dziennik-decyzji-na-tematy` (base `bea0abc1`): `docs: :card_file_box: divide the decision log of the game into 28 topical sections, entries and their numbers unchanged, the list of withdrawn numbers still at the end`.
- One file changed: `foundations/decisions.md` (8398 lines added, 8290 removed in the diff, which is a re-ordering of blocks plus the 28 headings and sentences; line endings stay LF, `git ls-files --eol` shows `i/lf w/lf`).
- Nothing else changed. Point 1 of the task *To do* dropped (pin already at `bfb2e109`, equal to the gitlink; checked with `git -C .the-way rev-parse HEAD`). Point 4 is the orchestrator's.
- Foundation step: the task's *Settlements to record* is `none` and projects no entry; no entry written, the text of no entry edited.

## How it was made

A script (kept at `reports/author-build-sections.py`) reads the task document's table (headings, sentences) and the projected assignment, adds the five entries D-410 to D-414, then reads `foundations/decisions.md` with `newline=''`, cuts it into the title, the entry blocks (from `### D-NN — ` to the next heading) and the `## Withdrawn identifiers` tail, and writes the sections in the table's order, each: heading, blank line, sentence, blank line, its entries in their old order, one blank line between blocks; the tail is copied unchanged. The script asserts 408 distinct entries, each in exactly one section.

## Checks (command, exit code)

- `python -B .the-way/elements/common/compare_log_entries.py .runs/author/before-decisions.md foundations/decisions.md` (before = `git show bea0abc1:foundations/decisions.md`) — exit 0; output: `Compared 408 entries of .runs/author/before-decisions.md with 408 of foundations/decisions.md: all the same byte for byte.` No report. (The orchestrator reruns it against `main` as it then stands.)
- `python -B .the-way/elements/common/decision_index.py --sections --output .runs/author/sections.txt` — exit 0; "Sections: 28." Every section is listed with its sentence and count; copy at `reports/author-sections.txt`.
- `python -B .the-way/elements/common/foundation_check.py` (full, no `--skip-test-citations`) — exit 0, `0 errors`.
- A script count (`python -I`): 408 `### D-NN — ` headings, 408 distinct; the section counts below sum to 408; the `## Withdrawn identifiers` tail from the new file equals the old one character for character; in each of the 28 sections the entries stand in their old relative order (0 sections out of order).
- Not run: `npm test` (the orchestrator's run).

## The 28 sections and their number of entries

| # | Heading | Entries |
|---|---|---|
| 1 | Architecture and technology | 12 |
| 2 | Code rules, exemplars and static checks | 20 |
| 3 | Testing discipline | 15 |
| 4 | The gate, test tools and the local start | 17 |
| 5 | The server: hosting, deployment, logs and failure reports | 17 |
| 6 | Database backup and restore | 10 |
| 7 | Account server: access, security and blocked accounts | 18 |
| 8 | Signing in: the login card and credentials | 11 |
| 9 | Account email and password reset | 19 |
| 10 | Saving the game state and the previous save | 16 |
| 11 | Browser view: screens, navigation and their code | 14 |
| 12 | Look of the browser view: styleguide, controls, pictures and fonts | 21 |
| 13 | Maps: their content, time and solving | 20 |
| 14 | Team, body, death and resurrection | 18 |
| 15 | Gathering, campfire and backpack | 10 |
| 16 | Combat | 11 |
| 17 | Character skills and nature energy | 19 |
| 18 | Discovery and the Understanding | 11 |
| 19 | How a program runs: rules, actions and conditions | 13 |
| 20 | Programs: ownership, names and the copy | 12 |
| 21 | Trip plan, chest and items | 13 |
| 22 | Earning loop and time away | 14 |
| 23 | Program editor | 13 |
| 24 | Rule panel and the signs of a rule | 11 |
| 25 | Screen Mapy and Siedziba | 11 |
| 26 | Screen of a map run and the end-of-run window | 17 |
| 27 | Chronicle | 11 |
| 28 | Scene | 14 |

Sections 4, 7 and 11 have one to three more entries than the projection (D-412, D-413, D-414; D-410; D-411).

## Assignment of D-410 to D-414

I read the question and binding sentences of each.

- **D-410** (the role of an account, `account-role`) goes to section 7. Clear: it is the access and the owner's operation on an account, scope `account-server`; its relations are D-12, D-109, D-112, D-137, D-202, all of section 5 or 7.
- **D-411** (the screen of the list of accounts at `#/konta`) goes to section 11. **Doubtful** between 7 and 11: its content is the four operations on accounts (block, previous-save privilege), but it is a screen of the browser view and derives from D-281 (route of the owner's screen) and D-280, both in section 11.
- **D-412** (what looks for secrets in the repository: the built-in scanning of GitHub) goes to section 4. **Doubtful** between 4 and 5: it derives from D-13 (secrets of the server, section 5) but its subject is what CI and the one command do not add, and it derives from D-413.
- **D-413** (how CI checks a pull request) goes to section 4: it runs the one command, the subject of D-405 and D-406 of that section. Fairly clear; the sentence of section 4 does not name CI, see the weakest point.
- **D-414** (the session-start hook that warns where `.the-way` is off the pinned commit) goes to section 4. **Doubtful**: no section fits well; section 4 has the tools an agent works with, section 2 holds the checks that keep references in bounds. Section 4 is the nearest.

## Entries the projection called doubtful: final assignment

I read the question and binding sentences of each (all kept at the projection's section).

- **D-307** (the line of an empty trip plan, „Plan wyprawy: pusty”) stays in 21: it derives from D-180 and the line is the trip plan's; its screen is Programy, but its subject is the plan.
- **D-409** (where an act that depends on time catches up the time) stays in 22: it fixes how the store catches time up before an act, which section 22 holds as "how time away is caught up"; the scope is `browser-view` only.
- **D-362** (how loop2 points to places outside the repository) stays in 2: it is a rule for the files git tracks (comments, entries, guidelines), nearest to the checks that keep references in bounds. Scope is every part, so no other section is nearer.
- **D-347** (how an agent learns what went wrong in the game in the browser) stays in 5: it is the first of the chain D-347, D-353 to D-356 about failures reaching the agent and the owner, and section 5's sentence names "logs and failures reach the owner and the agent". Doubtful because its scope is `browser-view`, `agent-workflow` and it derives from D-323 (section 11).
- **D-190** (what a character's death takes) stays in 14: the subject is the death of a character; it narrows D-189 (section 21) but death belongs to section 14's sentence.
- **D-214** (when is a map run a manual run of a solved map) stays in 13: the solved state of a map decides it (section 13: "how a map is solved"); it derives from D-189 (section 21).
- **D-215** (the line "Mapa jest już rozwiązana…" on the screen of such a run) stays in 13 with D-214, which it derives from. Doubtful: it could stand in 26, as a line on the screen of a map run.

## Other entries moved away from the projection

None. The only differences from the projection are the five additions above.

## Out of scope remarks

No entry seen out of date or wrongly described that I did not already know of. I read in full the five new entries' question and binding paragraphs and those of the seven doubtful ones, not the others, so this is no audit of the log. Observation: the sentences of section 4 and of section 7 do not name CI and secret scanning (section 4: D-412, D-413) nor a session-start hook (D-414), nor the owner's list of accounts and the role of an account (section 7, 11: D-410, D-411); the sentences were accepted by the human before the five entries existed, so I did not touch them. The request may name this as a candidate for the human to widen a sentence.

## Own-work check and weakest point

- Requirement most likely not met: "the content of every entry and of the list of withdrawn numbers stays byte for byte as it is, and no line ending changes". Checks: `compare_log_entries.py` exit 0 (all 408 the same byte for byte); my own script comparing the withdrawn tail character for character (equal); `git ls-files --eol` `i/lf w/lf`; `git diff --stat` shows only the one file. All passed on the first run.
- Weakest point: the placement of the five new entries and of the doubtful ones (above), not the bytes. A wrong section does not fail any check; the request lists those assignments for the human.
- Second weak point: the blank lines between blocks are normalised (entry block with trailing blank lines stripped, one blank line between entries). The compare script ignores blank lines at the end of a block as the handoff says; the entries in the old log all had a single blank line between them as far as the diff stat shows (moved blocks, no changed blocks).

## Reaches beyond the dispatch

None. Read: the task, the method `change/SKILL.md`, `foundation_step.md`, `elements/decisions/template.md`, `elements/decisions/skill/SKILL.md`, the file `scripts.md` of the author's own agent rules, outside the repository and `git.md` (the hooks of the session required them).

## Unread material

- `foundations/decisions.md` entries other than D-410 to D-414 and the seven doubtful ones: read only as a whole by the scripts, not by me. `ui_check.md`, `fix.md`, `slice.md` not read (the handoff says none applies). `.the-way/elements/decisions/skill/read.md` and `decide_entry.md` not read: no entry was written.

## Searches not found or unclear

none

## Working copies

`.runs/author/` held `before-decisions.md` (the log of the base), the build script, `show.py` and `verify.py` helper scripts and their outputs; it was removed. Kept in `reports/` beside this report: `author-build-sections.py`, `author-sections.txt` (output of `decision_index.py --sections`) and `author-section-counts.txt`. No remainder.
