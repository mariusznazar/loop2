# Findings of the review of the whole change (review-whole-report.md), part 2 — foundation entries and guidelines, for the fix

Minor findings within the task that the cycle fixes before the request opens, in the reviewer's words. The foundation entries are changed only through the skills of the elements (`record-decision`, and the glossary skill for the term), as `.the-way/task-cycle/skill/foundation_step.md` gives; the guideline files are changed through the maintaining skills' methods (`maintain-coding-guidelines`, `maintain-testing-guidelines`) read as files in `.the-way`.

4. `foundations/decisions.md`, D-380 first paragraph (line 8368) — it still lists „Uderz — patyk” among actions "short of a thing in the backpack". Its third paragraph says the strike is short only where the stick lies neither in the main hand nor in the backpack. Drop „Uderz — patyk” from the first list, or qualify it. Within the task: D-380 is in *Decisions in play* (F6). Raised by review-4, outside its slice.
5. `foundations/glossary.md:174-178` — „combat turn” still says the character has no action "when it finds no feasible combat rule". A turn can now be „Załóż”, which is no combat action. Within the task (the cycle's return step). Raised by review-8.
6. `foundations/decisions.md:12893` — D-463's *Rejected* reads "unknown." while the plan's *Choices* names the rejected way: the page removing the character's stored judgings at the act. Within the task. Raised by review-1.
7. D-441 does not point to D-463, which extends its lists of what a stored judging holds. Within the task. Raised by review-1.
8. D-456 "The data of each item name the place it fits" reads as if every item names a place. Only the stick and the bandage do. Within the task. Raised by review-1.
9. `guidelines/coding-content-data.md` — its table of data files lacks `src/browser/sim/data/gear.ts`. Within the task. Raised by review-1.
10. `guidelines/coding-saved-game.md` — it does not say that a change of the gear's slots (the number of pockets) raises the saved-game version. `SAVED_GAME_VERSION`'s comment in `saved-game.ts` does say it. Within the task. Raised by review-1.
14. `guidelines/testing.md:178` — the trust-boundary row for `judging-cache.ts` is out of date: it still says "five fields" and does not name the new test file. Within the task. Raised by review-10.
