# Handoff - slice 1 of the task "loop2: uklad na telefon dla wszystkich ekranow gry"

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's go-ahead to you is provisional and never the human's approval. You never ask the human. Your questions go back to the orchestrator in your report.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree`. Branch `task/uklad-na-telefon`. The slice's base is the commit `0a2254cd3a6e53c5c569c18b24499fac68bdad6e` (the head of the branch at dispatch); the cycle's base is `0a2254cd3a6e53c5c569c18b24499fac68bdad6e`. The pinned the-way is `.the-way` of the worktree, at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`; run its scripts as `python -B .the-way/<path>`. `node_modules` is installed in the worktree.
- Your stage: an executor, method `make-change` - read `.the-way/task-cycle/change/SKILL.md` whole, and the file it names beside it (e.g. `.the-way/task-cycle/change/ui_check.md`) only when the step or variant that names the file comes. Variant: "a slice, or the retry of a slice". Your class of model: same (Sonnet).
- Your boundary: make this one slice, commit it on the branch `task/uklad-na-telefon` explicitly by path (`git add <path> <path>`, never `git add -A`, `git add .` or `git commit -a`), in the English commit style of the repository's log. Do not push. Do not start another slice. Do not run the product's full gate (`npm test` with no argument); run only the checks of the slice's *Checks*, each with its command and exit code in the report.
- Your directory for working copies: `.runs/slice-1/` (the worktree's ignored `.runs/`).
- Your report path: `.runs/task-cycles/uklad-na-telefon/reports/slice-1-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); it must hold the sections **Unread material**, **Searches not found or unclear** and your own-work check, as the method gives them, and its first line is your status.
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them. This handoff names: the frozen task `.runs/task-cycles/uklad-na-telefon/task.md`, the plan `.runs/task-cycles/uklad-na-telefon/plan.md` (only the passages copied below, and what the slice's *Read* names of it), and your report path.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## The foundation entries of the plan (copied word for word from `.runs/task-cycles/uklad-na-telefon/plan.md`)

## Foundation entries

| # | Entry | Kind | From | What depends on it |
|---|---|---|---|---|
| 1 | D-396 — In which browsers and from which window size does the game have to work? | decision, changed: the projected entry whole, with the two sentences of rows 5 and 6 added | projected entry D-396 of the approved definition of project 2 (section "Projected foundation changes"), rows 5 and 6 | Slices 6–20 |
| 2 | the fact of the source of the touch-target minimum, its passage quoted with the date it was read, named in *Based on* of D-396 | environment fact, new | the cycle's: row 6 asks for a value from a source with its quotation | Slice 7 (the token's `Source:`), Slices 8, 16–19 |
| 3 | D-280 — the content width, now speaking of the computer and the phone layout | decision, changed | task, *Decisions in play* (the new D-396 no longer names it) | Slices 9, 16 |
| 4 | D-282 — the areas a narrower layout rearranges, now the phone layout | decision, changed | task, *Decisions in play* | Slices 9, 17, 18, 19 |
| 5 | D-311 — the screen of a map run, two columns in the computer layout and one in the phone layout, and the tap of row 3 beside the hover in its rationale | decision, changed | task, *Decisions in play* | Slices 9, 19 |
| 6 | D-370 — the end-of-run window, its width in the two layouts | decision, changed | task, *Decisions in play* | Slice 19 |
| 7 | D-389 — the picture band of Siedziba, its crop in the phone layout | decision, changed | task, *Decisions in play* | Slice 17 |
| 8 | D-44 — the destructive button in `danger` at rest, with `highlight` under the pointer | decision, changed | row 4 | Slices 10, 16 |
| 9 | D-349 — the scene's two sizes | decision, changed | row 1 | Slices 5, 15 |
| 10 | D-372 — the frost's thickness on the screen at either size of the scene | decision, changed | the cycle's: its "(32 px on the screen)" follows from the one size row 1 removes | Slice 15 |
| 11 | D-288 — arrows in the header of a rule group in every layout, the handle for the mouse | decision, changed | row 2 | Slices 3, 4, 12, 13 |
| 12 | D-19 — a tap on a tile marks its row, a tap elsewhere takes the mark off, the hover stays | decision, changed | row 3 | Slices 3, 4, 5, 14 |

The rows of *Settlements to record*: row 1 → entry 9; row 2 → entry 11; row 3 → entry 12; row 4 → entry 8; rows 5 and 6 → entry 1, row 6 also entry 2. No invariant, glossary term or part of the map is written.

## The slice (copied word for word from `.runs/task-cycles/uklad-na-telefon/plan.md`)

### Slice 1 — the layout decisions and the source of the touch target

- **Goal:** The foundation states the two layouts: D-396 stands as the projected entry of the approved definition of project 2 whole, with the two sentences of rows 5 and 6 of *Settlements to record* added (in the phone layout nothing scrolls to the side, in a frame either; the controls of the phone layout have a minimum touch target, its value from a source with a quotation); a new environment fact holds that source's passage quoted with the date it was read, and D-396 names it in *Based on*; D-280, D-282, D-311, D-370 and D-389 speak of the phone layout or the computer layout where they speak today of a narrower window (task, *Decisions in play*: the sentences quoted there), D-311 adding the tap of row 3 beside the hover in its rationale; D-44 carries row 4: the destructive button has its text in `danger` already at rest, in every layout, in one style, and under the pointer it takes the background `highlight` besides. The value of the touch target is the one the orchestrator gives this slice (the planner's report, question 1); without one, the slice returns blocked. Each entry is written through the pinned skill of its element, read as a file, as the foundation step gives; every passage that a line `decision: D-<n> "…"` of a file under `tests/` quotes from these six decisions stays the opening of a binding sentence, so that no citation breaks (find them with `git grep -n "decision: D-280 "` and the like). The slice keeps in its report each entry's meaning in one English and one Polish sentence and its mark (`row <n>`, `projected` or `the cycle's`). No code.
- **Change:** `foundations/decisions.md` · `foundations/environment_facts.md`
- **Read:** `.runs/task-cycles/uklad-na-telefon/task.md:16-45` Description · `.runs/task-cycles/uklad-na-telefon/task.md:47-79` Questions to settle · `.runs/task-cycles/uklad-na-telefon/task.md:81-95` Context · `.runs/task-cycles/uklad-na-telefon/task.md:105-147` Decisions in play, Settlements to record, Out of scope
  · the projected entry D-396 of the approved definition of project 2, whole, with its *Meaning (pl)*: the file definicja_projektu_2_loop2.md in the folder the key projects under loop2 of the locations file ~/.the-way/locations.json names, section "Projected foundation changes", heading "D-396 — In which browsers and from which window size does the game have to work?", lines 374-393 at planning (to be copied into the handoff word for word)
  · `foundations/decisions.md:5507-5521` D-396 · `foundations/decisions.md:4525-4596` D-280 · `foundations/decisions.md:4643-4674` D-282 · `foundations/decisions.md:10517-10647` D-311 · `foundations/decisions.md:10964-10989` D-370 · `foundations/decisions.md:10309-10382` D-389 · `foundations/decisions.md:5081-5097` D-44 · `foundations/decisions.md:4998-5018` D-39 · `foundations/decisions.md:5019-5035` D-40 · `foundations/decisions.md:5051-5065` D-42 · `foundations/decisions.md:10387-10430` D-19 · `foundations/decisions.md:10859-10901` D-349
  · `foundations/environment_facts.md:270-299` wcag-text-contrast to wcag-contrast-ratio (the form of a quoted source) · `foundations/environment_facts.md:1008-1043` playwright-firefox-webkit-releases, the last facts and the place a new fact goes
  · `foundations/part_map.md:3-33` browser-view · `foundations/part_map.md:160-167` product-foundation
  · `.the-way/task-cycle/skill/foundation_step.md` · `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` · `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` · `.the-way/elements/environment-facts/skill/SKILL.md` · `.the-way/elements/environment-facts/skill/read.md` · `.the-way/elements/environment-facts/skill/decide_entry.md` · `.the-way/elements/environment-facts/skill/draft.md` · `.the-way/elements/environment-facts/skill/write.md` · `.the-way/elements/environment-facts/template.md` · `.the-way/elements/common/rules.md` · `.the-way/elements/common/way_of_working.md` · `.the-way/elements/common/reaching_another_skill.md`
- **Model:** same — rewrites seven approved decisions and adds a fact with a quoted source, where a meaning moved beyond the rows or a broken quoted passage stops the request.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` reports no error.
- **Depends on:** none

## The plan's choices (copied word for word from `.runs/task-cycles/uklad-na-telefon/plan.md`, section *Choices*)

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The phone layout is written as overrides in blocks `@media (width < 1280px)` (range syntax, the number of D-396 written as it stands), in each screen's stylesheet, each block with a comment naming D-396; the computer layout's rules stay as they are, the threshold rules that stood at 720 and 1074 px move to 1280 px | rules rewritten phone-first with the computer layout in `min-width` blocks; a class on the page set from `matchMedia` | phone-first rewrites every rule and risks the computer layout the acceptance holds; a class needs script for layout. Wrong: the overrides grow harder to read later, a rewrite by a later task |
| The threshold is written in each `@media` rule, its source kept by the comment D-396 beside it and by the styleguide's rule (Slice 8); the page area of 360 px is written nowhere in a stylesheet, only in loop2-play and the styleguide | one place for the threshold | CSS reads no custom property in a media query, and D-43 exempts the threshold; wrong: a future change of the threshold edits several files |
| The scene has the two sizes 1× and 2× only, as D-349's new wording and *Decisions in play* give, though 3× fits in a phone layout over about 1050 px | the largest multiple without a cap | the task's sizes are two; wrong: a phone layout at 1100 px shows a smaller scene than it could, which the human may ask for |
| The scene's second size comes from a rule of the stylesheet in the phone layout's blocks (a width threshold of the window at which 672 px fit, counted from the phone paddings, written with its arithmetic in a comment), the background's `width` and `height` attributes staying 672 × 304 | a container query; a size measured by script | D-43 exempts a threshold of `@media` and names none of `@container`; script adds a listener of the window's size; wrong: a threshold that misses the fit by the scrollbar's width, seen in the browser checks |
| The crop: the frame keeps its picture's size and a place around it in `world-area.tsx` clips it, centred, with the phone paddings small enough (Slice 9) to crop at most 32 px at 360 px | a crop of the right side only; the frame itself narrowed | a narrowed frame moves every part placed by percentages; a right crop hides the mage at the right edge |
| The small elements of the scene keep their sizes in CSS pixels, which do not follow the scale today | sprites redrawn for 1× | a sprite change touches the trust boundary `assets/sprites/**`; wrong: a badge large against a mage at 1×, judged by the human on the screenshot |
| Every decision rewrite keeps each opening of a binding sentence that a test quotes; where a row makes such a sentence false (D-288, D-19, D-349), Slice 2 rewrites it and Slices 3–5 bring the citations to it at once | the citations shortened first to an opening valid before and after; the citations updated in the slices of the code | the code slices with the big test files would be too large for one agent; shortened citations hold less of what a test holds. Wrong: the check of the foundation stands red from Slice 2 to Slice 5 |
| A tap marks only with a pointer of the kind touch; a click of a mouse changes nothing, as D-19's test holds today; a tap on a row of the table is no new act | any click marks the row; a tap on a row marks its tile | row 3 speaks of the tap and keeps the hover; wrong: a pen or a mouse click does not mark, a small later change |
| The handle of a rule and of a group stays in both layouts | the handle hidden in the phone layout | a narrow window of a computer keeps its mouse; wrong: a few pixels of a header at 360 px |
| A group's „↑” is off on the first group and „↓” on the last, a move one place, as a rule's arrows inside a group | arrows that move a group across the program's edge in some other way | row 2 says „tak jak reguły”; wrong: a small change of two functions |
| The touch-target minimum holds for every control of D-47 in the phone layout; a link inside a sentence only where the cited source does not exempt an inline target | every link held to it, inside a sentence too | a link inside a sentence held to it breaks the line of text; wrong: one link a little small to tap |
| The fix of the pick cells is the reverted commit `8591aa82` taken over, the helpers of the editor tests made independent of the markup first (Slice 4) | a new fix | the commit was reviewed once in PR #168; wrong: none known |
| The skill loop2-play gains the phone check early (Slice 6), so that every later slice checks the phone layout one way; the styleguide's rules come before the screens (Slice 8), so that the screens follow them | both at the end, in the order of items 10 and 11 | the screens would be checked each its own way and the rules written after the fact; this departs from the styleguide's example of the order of work only in putting the rules before the screens |
| The screenshots that slices take are working copies, looked at and removed; only Slice 20 shows a set, with no screenshot of loop beside it | screenshots of loop beside each, as D-418's rationale gives for a changed screen | loop's phone look is no reference the task names; wrong: the human asks for loop's screens |
| No move of code before a slice adds to a function or a file: none stands over the thresholds of D-425 at the base; the slices that add to `RuleListView` (179 of 200 lines), `ProgramPanelView` (194) or `Scene` (184) keep them under | a move slice first | wrong: a slice that crosses a threshold moves a part out within itself, the size test showing it |

## Notes of the orchestrator for this slice

1. **The value of the touch-target minimum (the plan's question 1, answered by the orchestrator): 48 px**, from Android's accessibility guidance ("touch targets at least 48 × 48 dp"). Item 9 and question 7 of the task hand the choice of a cited source to the cycle, so `src/browser/AGENTS.md`'s "source settled with the human" is read as met by the task itself; the request will put the source before the human, marked as the cycle's. You must read the source yourself (fetch the page of Android's accessibility guidance on touch target size, or the Material Design page that carries the 48 dp sentence), quote its passage word for word with the address and the date you read it into the new environment fact, and not write the quotation from memory. If you cannot reach a source that carries the 48 dp sentence, do not invent one: stop, say so in your report with status `blocked`, and name what you tried.

2. **The projected entry D-396 of the approved definition of project 2, whole** (copied word for word from the definition, section "Projected foundation changes", lines 374-393; the definition's file is outside the repository, so this copy is your source). Write the entry in the log's form (its heading, binding text, *Scope*, *Based on*, *Relations*, *Verification*, *Origin*, *Rationale*, *Rejected* and *Meaning (pl)*) in place of today's D-396, with the two sentences of rows 5 and 6 added to its binding text, and `Based on` gaining the environment fact you write:

---
#### D-396 — In which browsers and from which window size does the game have to work?

The game works in the current releases of Chrome, Edge and Firefox on a computer and of Chrome on a phone with Android; Safari, on a computer or on a phone, is outside that set. A window whose page area — the area of the page inside the browser's window, not the resolution of the screen — is 1280 px wide or wider shows the computer layout, whose smallest window has a page area of 1280 × 720 px; a narrower window, of a phone or of a computer, shows the phone layout, made for a phone held upright with a page area 360 px wide.

In the phone layout every screen fits the width of the window with no scroll to the side and no text over the border of its frame, and everything the game offers is done by touch.

A fault of the phone layout is fixed where a window of its width that is taller than it is wide shows it; a fault in a window narrower than 360 px, or one seen only in a window wider than it is tall, such as a phone turned sideways, is not fixed, and a fault of the computer layout in a window lower than 720 px is not fixed where no decision defines how the game looks there.

- **Scope:** browser-view, agent-workflow
- **Based on:** playwright-firefox-webkit-releases
- **Relations:** none
- **Verification:** an agent compares a change with the decision:
  - complies: a check of a change in Chromium at a page area of 1280 × 720 px and, for the phone layout, at a page area 360 px wide in an upright window; a fix of a name crossing the border of its frame in the phone layout at a page area 1100 px wide
  - violates: a screen of the phone layout that scrolls to the side at a page area 360 px wide; an action of the phone layout done only by dragging with a mouse or by hovering; a change that is known to break in Firefox at a page area of 1280 × 720 px and is left so; a check of a change at a screen resolution of 1280 × 720 px; a layout of its own for a window narrower than 1280 px and wider than a phone; a change made only to fix a fault seen in a phone turned sideways that a window of the same width taller than it is wide does not show
- **Origin:** none

*Rationale:* without a stated set of browsers and a smallest window, a remark about Safari or about a narrow or a low window cannot be told from a fault, and the question comes back in every request. The game is to work on a phone, and its author has a phone with Android; a narrow window of a computer is treated as a phone, not as a narrow computer, so the game keeps two layouts rather than three, and a fault found in a narrow window — such as the names of the cells of the pick of actions crossing their frames at a page area 390 px wide, and on the screen of a map run at 1074–1200 px — has a layout that says how it is to look. The window is counted as the page area because that is how the checks of the game in a browser and the measurements of the layout count it, so a player whose screen is 1280 × 720 has a smaller page area and gets the phone layout. Accepted with it: the daily checks of an agent run in Chromium, and Firefox and Edge are checked by hand in a real browser in a session of its own, so a fault visible only in Firefox can pass between such sessions; a friend with an iPhone may meet faults nobody checked; a player who turns the phone sideways to see a larger scene meets a layout nobody checked; an agent checks the phone layout in Chromium at the size of a phone, not in Chrome on a phone with Android, so a fault seen only on a real phone can pass until someone plays on one.
*Rejected:* the smallest window counted as the resolution of the screen, 1280 × 720 — the page area is then about 1280 × 600, and the measurements made so far would have to be counted again; Firefox added to the way an agent plays the game in a browser — the work grows, and the Firefox release installed for Playwright on this computer is older than the one Playwright CLI expects, so Firefox would need an installation first; Safari on an iPhone in the set — an agent would need another browser engine, whose release installed for Playwright on this computer is also older than the one Playwright CLI expects, and its author has no iPhone to check it by hand; a layout of its own for a narrow window of a computer — "wąskie okno traktujemy jak telefon, nie jak wąski komputer"; a phone 390 px wide as the narrowest one — a narrower phone would be left with faults nobody fixes; both orientations of the phone — about twice the checking of every screen; no entry — every remark about Safari and about a narrow window stays without a measure.

> **Meaning (pl):** Gra działa w Chrome, Edge i Firefoksie na komputerze i w Chrome na telefonie z Androidem, bez Safari; okno szerokie na 1280 px i więcej ma układ komputera (najmniejsze okno 1280 × 720), węższe — także na komputerze — układ telefonu, projektowany pod telefon pionowy szeroki na 360 px, w którym każdy ekran mieści się w szerokości okna bez przewijania w bok i bez napisów poza ramką, a wszystko robi się dotykiem; naprawia się usterkę układu telefonu widoczną w oknie tej szerokości wyższym niż szerokim; nie naprawia się usterek poniżej 360 px, usterek widocznych tylko w oknie szerszym niż wysokim, jak telefon obrócony poziomo, ani usterek okna komputera niższego niż 720 px, których wyglądu nie określa żadna decyzja.
---

3. **The two sentences added to D-396's binding text** (row 5 and row 6 of *Settlements to record*, from the frozen task): "W układzie telefonu nic nie przewija się w bok, także w ramkach." and "W układzie telefonu kontrolki mają minimum celu dotyku, z wartością ze źródła i cytatem." Write them in English in the entry's binding text, in the log's English (e.g. in the phone layout nothing scrolls to the side, in a frame either; the controls of the phone layout have a minimum touch target of 48 px, taken from the source the environment fact quotes). The entry's *Meaning (pl)* gets the same two additions in Polish. Mark them as the rows' (`row 5`, `row 6`); the 48 px value and its fact are marked the cycle's.

4. The numbers D-280, D-282, D-311, D-370 and D-389 are rewritten, not replaced by new entries; D-44 carries row 4. The sentences of the task's *Decisions in play* quote what changes in each (frozen task lines 105-147).

5. Do the work through the pinned skills of the-way, read as files, as `.the-way/task-cycle/skill/foundation_step.md` gives (the file is in your *Read*): decisions through `.the-way/elements/decisions/skill/SKILL.md`, the environment fact through `.the-way/elements/environment-facts/skill/SKILL.md`. The decision log's entries, as the project's skills write them, do not carry the original definition's `####` heading level: follow the level of the neighbouring entries of `foundations/decisions.md` (`###`).
