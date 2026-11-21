# Handoff — the agent of the plan's *Foundation entries* (`make-change`, the foundation step)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator. A question for the human, as `task-cycle/skill/foundation_step.md` gives it, returns with the status `blocked`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`, HEAD `aff09e987e3b64801f9011b2f8ad69c4723b4521` (the base of the cycle and the base of slice 1). The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; you take none of its rows of variants — your stage is the **foundation step**: read `.the-way/task-cycle/skill/foundation_step.md` whole and follow it. For each entry follow the `SKILL.md` of its element in the pinned the-way, as that file names them: `.the-way/elements/decisions/skill/SKILL.md` (decisions), `.the-way/elements/invariants/skill/SKILL.md` (invariants), `.the-way/elements/environment-facts/skill/SKILL.md` (environment facts); read what each names whole (its template, `elements/common/rules.md`, `elements/common/way_of_working.md`, examples) when its step comes. A skill that a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file; you have no skill tool.
- Your stage and its boundary: write the 16 foundation entries of the plan's *Foundation entries* below, commit them, and return before any code. You change no code, no test and no guideline file; you ask no human.
- Your directory for working copies: `.runs/foundation/` (directly under the ignored `.runs/`).
- Report path (the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/foundation-report.md`; its first line is yours. It holds, as `foundation_step.md` gives, for each entry one sentence of its meaning in English and one in Polish, and the mark `row <n>`, `projected` or `the cycle's`, and word for word the pair of examples and the fields you added that the row or the projected entry does not give; and, as the method gives, the checks with their command and exit code, the reaches beyond this handoff, **Unread material** and **Searches not found or unclear** (each `none` where nothing), and the working copies line.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs and reports — are not yours to read, except those this handoff names.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests: that is the full gate, and its run waits for a signal the orchestrator holds. You run only the foundation check: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` from the worktree root (the tests that will cite the new entries by their `decision:` and `invariant:` lines are written by the slices after yours, so the citations are skipped as WAY-321 gives), and `python -B .the-way/instruction-files/check_instructions.py` if you change an instruction file (you should not).

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## What the entries are made from (read; the task binds where the spec and it differ)

- The frozen task: `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md` — the whole of *Decisions in play* (lines 157–215, including „Zadanie zapisuje”, which holds the new decision's wording word for word) and *Settlements to record* (lines 217–237), *To do* 13 (line 47) and *Questions to settle* 1–11 (lines 57–121) for the reasons the human's answers give. The task's other sections are the context.
- The reviewed spec: `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md` — *Foundation entries* (lines 383–430) and *Decisions* 3 and 5 (lines 193–357) for the meaning of the entries that follow from them.
- The plan's *Foundation entries* table (below, copied word for word from `.runs/task-cycles/model-czynnosci-i-przedmiotow/plan.md`, lines 7–33).
- The foundation entries to change or to link, by identifier, each whole (find a decision by `### D-nnn` in `foundations/decisions.md`; an invariant by its heading in `foundations/invariants.md`; never read the whole of either file): D-145, D-290, D-121, D-318, D-363, D-293, D-380, D-142, D-289, D-441, D-442; also D-18, D-26, D-23, D-128, D-206, D-401, D-440 and D-439 (for the new decision's *Relations* and *Verification*, and for D-441 and D-442's changes); invariants `content-identifiers`, `icon-credits`, `program-closed-lists`, `program-world-reference`; `foundations/glossary.md` whole (short) and `foundations/part_map.md` whole. The existing environment facts of the other icons (find them by a search of `foundations/environment_facts.md` for `icon-credits` or `game-icons.net`) are your examples of the form of a fact about an icon's title.
- The data and the code the wording must match, read only as far as the entries need: `src/browser/sim/data/actions.ts`, `src/browser/sim/data/items.ts`, `src/browser/view/credits.ts` (`ICON_SOURCE_COMMIT`, `ICON_CREDITS`), and, for the icons' titles, the pages on game-icons.net.

## Notes the orchestrator gives for the entries

- The new decision's number is the next free one after the highest number the log holds, whether as an entry or on its list of withdrawn numbers; its two sentences are the approved definition's, word for word, as the task's „Zadanie zapisuje” gives them; its *Scope* is `simulation · browser-view`; its *Relations* and *Verification* (`TODO` in the projected entry) you fill. *Verification* names the tests the later slices write, by `decision:` lines; those are: for the first sentence, the test of the targets of the two verbs following the recipe and the healing property in the simulation (`tests/sim/action-targets.test.mjs`, Slice 10), in the editor (`tests/view/program-editor.test.mjs`, Slice 13) and in the instrument (`tests/balance/overlay.test.mjs`, Slice 17), a second item laid in a test or an overlay alone becoming a target of each and moss of neither, and the check refusing either verb with a target the data do not give (`tests/sim/action-targets.test.mjs`); for the second sentence, a program of every kind of today read from a version-9 previous save and appended unchanged (`tests/sim/previous-programs.test.mjs`, Slice 10). The tests do not exist yet; the slices write them with the `decision:` lines. The decision gets no invariant of its own (the task says so).
- Rows 4 and 7 of the task's *Settlements to record* go to data and icons, not to the foundation; the plan's rows 15 and 16 are the two environment facts for the titles of `bandage-roll` and `first-aid-kit`, whose titles you read from the game-icons.net page of each icon at the time you write the facts (a page you cannot read is `unknown` in the fact's source field, as the template gives, never a title from memory) — and say in your report where you read each.
- Entries 11 and 12 (D-441, D-442) follow the spec's Decision 5 and its *Foundation entries* lines for them; the task's *To do* 15 asks for the change and the way is the cycle's, settled in the spec.
- Entry 10 (D-289): the sentence of settlement row 1 and, from the spec's Decision 3 unit 7, the sentence that „Wytwórz” and „Opatrz” with no known target stand greyed with „nie znasz jeszcze celu”; mark the second as `the cycle's` (it is the spec's, not a row's).
- Do not write an invariant for the new decision. Entry 13 changes `content-identifiers` so that its sentence names an item as well as a game map, a resource and an archetype (the spec's reason: the bandage is an item that is no resource); entry 14 adds the two facts to *Rests on* of `icon-credits`. Where a changed invariant's test is named (`tests/invariants/test_content_identifiers.py`, `tests/invariants/test_icon_credits.py`), the slices 5 and 8 change those tests; the entry's *Method* reads as the template gives it for an invariant whose test a later slice of the same change writes.
- Commits: one commit for the whole step, or one for each entry, as you judge, with a message in English; add files by path, never `git add -A` or `git add .`. Record the first and the last commit in your report.

## The plan's *Foundation entries* (copied word for word)

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| 1 — the new decision „How does an action name what it acts on?”, its two sentences word for word, its *Relations* and *Verification* filled | decision (new) | projected entry of the approved definition (task, *Decisions in play*, „Zadanie zapisuje”; *To do* 13); spec, *Foundation entries* | Slices 7, 10, 13, 17; its *Verification* names the tests of Slices 10 (the targets, the check, the second sentence through the previous-save reader), 13 (the editor) and 17 (the instrument) |
| 2 — D-145 changed | decision | *Settlements to record* rows 2, 3 and 14; spec | Slices 7, 12 |
| 3 — D-290 changed | decision | row 6 | Slices 7, 9, 13, 15 |
| 4 — D-121 changed | decision | row 5 | Slices 7, 9, 12 |
| 5 — D-318 changed | decision | row 11 | Slices 7, 16 |
| 6 — D-363 changed | decision | row 8 | Slices 12, 13, 14, 15 |
| 7 — D-293 changed | decision | rows 9 and 13 | Slices 13, 14, 15 |
| 8 — D-380 changed | decision | rows 10 and 15 | Slices 7, 12 |
| 9 — D-142, a sentence added | decision | row 12 | Slice 12 |
| 10 — D-289, sentences added | decision | row 1; spec, *Decisions*, Decision 3, unit 7 | Slices 10, 13 |
| 11 — D-441 changed | decision | spec, Decision 5 | Slice 1 |
| 12 — D-442 changed | decision | spec, Decision 5 | Slice 1 |
| 13 — invariant `content-identifiers` changed; check `tests/invariants/test_content_identifiers.py` | invariant | spec | Slice 5, which brings the check to items |
| 14 — invariant `icon-credits`, its *Rests on* gaining the facts of rows 15 and 16; check `tests/invariants/test_icon_credits.py` | invariant | spec | Slice 8 |
| 15 — environment fact: the title of `bandage-roll` as its page on game-icons.net gives it, read from that page | environment fact | spec; row 7 | Slice 8 |
| 16 — environment fact: the title of `first-aid-kit` as its page on game-icons.net gives it, read from that page | environment fact | spec; row 7 | Slice 8 |

Rows 4 and 7 of *Settlements to record* go to data, not to the foundation: row 4 to the bandage's row and the
rows of the two verbs in `src/browser/sim/data/` (Slice 7), row 7 to the same rows and to the icon files in
`assets/icons/` (Slices 7 and 8). Two guideline files change beside the foundation: the table "Files of this
kind" of `guidelines/coding-simulation-module.md` gains the module of the targets of a verb (Slice 7), and the
row of `src/browser/view/judging-cache.ts` in the table "Trust boundaries" of `guidelines/testing.md` follows
the cases of the cache's stored form 2 (Slice 1).

## What you return

Status (`done`, `done with concerns`, `questions`, `blocked`), your commits, a one-line check result naming what failed or did not run (the foundation check and its command and exit code), and the report path. The own-work check of the method, as it applies to entries (each entry compared with its row and with the code it must match), is in the report.
