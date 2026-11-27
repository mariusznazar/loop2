# Handoff — the agent of the plan's *Foundation entries* (task rana-i-opatrunek)

You make the foundation step of a task cycle of the-way, as the agent of the plan's *Foundation
entries*. The orchestrator dispatched you as an agent of the type `the-way-stage`.

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator.
Never ask the human. A question goes back to the orchestrator in your report (status `questions`, or
`blocked` where `task-cycle/skill/foundation_step.md` says so), each with the answer you recommend.
What the orchestrator answers is never the human's approval.

## What you make, where, and the boundary

- Variant of `make-change`: **not one of its table's rows** — you are the agent of the plan's *Foundation entries*. Read `.the-way/task-cycle/change/SKILL.md` whole for how a change is committed and reported (its sections 3 and 6), but read none of its slice, fix or one-author files.
- The foundation step: read `.the-way/task-cycle/skill/foundation_step.md` whole, and the `SKILL.md` of an element (`.the-way/elements/decisions/skill/SKILL.md` for a decision) when you write an entry of that element; each element's `SKILL.md` selects the reading its entry needs (the template, `elements/common/rules.md`, `elements/common/way_of_working.md`, the examples). The element's way of working is the way of writing; where it speaks of asking the human, you do not ask: you follow `foundation_step.md`.
- The worktree and your working directory: `the worktree's root` (branch `task/rana-i-opatrunek`; the base of the slices, and so the start of your range, is `be4e9c09f3c45f421d04983948a88bd6240809bf`, which `git rev-parse HEAD` shows). The pinned the-way is the worktree's `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. Work only on this branch; `node_modules` is a junction to the main checkout's — leave it.
- Your boundary: you write the foundation entries of the table below (decisions of `foundations/decisions.md`), and fix the stale citations of tests as "Citations" below gives; no other code and no other test. The slices that follow make the code. You do not run the product's gate; run the focused checks named below only.
- The ignored record directory: `.runs/task-cycles/rana-i-opatrunek/` (relative to the worktree). Your report: `.runs/task-cycles/rana-i-opatrunek/reports/foundation-report.md` (the report file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it; where your tool refuses the write, return the report whole as your answer). The cycle record `cycle.md` and the other files of that directory (handoffs, reports, findings of other agents) are not yours to read unless this handoff names them.
- Your directory for working copies: `.runs/foundation/` (relative to the worktree).

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## The task, the plan's table and what each row is

- The frozen task (read whole; it is the source of the meaning of every row): `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (sha256 `55c86eaf63df7156`). Its *Settlements to record* (rows 1–10) and its *Decisions in play*, part „Obecne decyzje, które zadanie zmienia”, are the meaning you write; each row's *Source* column and the *Not chosen* lines of the questions it names are the source of the decision's *Rejected*. The task's language is Polish; the entries' language is the foundation's (English).
- The plan's *Foundation entries* table, word for word (the plan is `.runs/task-cycles/rana-i-opatrunek/plan.md`; copy from here, you do not open it):

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-379 — the ninth character skill „Opatrywanie małych ran”, its curve and its four branches with their effects and prices | decision, change | Settlements to record, row 6; Decisions in play, D-379 | Slices 2, 4, 8 |
| D-144 — „Ucisk — {rzecz}”, opened by the bought branch Ucisk, is an action of combat of its own that the player writes as a combat rule; „Opatrz” stays out of combat | decision, change | Settlements to record, row 1 | Slices 4, 11 |
| D-144 — Ucisk uses one piece from a pocket of the belt, an empty pocket taking a piece from the backpack; „Opatrz” takes from the backpack | decision, change | Settlements to record, row 2 | Slices 4, 7 |
| D-144 — Ucisk restores what „Opatrz” restores with the same item, bought ranks of „Mocniejszy zwój” included, never above full health | decision, change | Settlements to record, row 3 | Slices 3, 4 |
| D-150 — „Ucisk — {rzecz}” grows „Opatrywanie małych ran”, a predisposition of the elemental mage | decision, change | Settlements to record, row 4 | Slice 4 |
| Row 5 — one tree grown by „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” and „Ucisk — Opatrunek”, in the data of the skills and the mage's predispositions, held by a test | data or code | Settlements to record, row 5 | Slices 2, 4 |
| D-145 — the health „Opatrz” gives back is the item's healing increased by the bought ranks of „Mocniejszy zwój” | decision, change | Settlements to record, row 7 | Slice 3 |
| D-387 — 0.05 health a minute is the number of a character with no bought rank of „Szybkie gojenie”, each rank adding 0.05 | decision, change | Settlements to record, row 8 | Slice 3 |
| D-290 — Ucisk stands in the group „Żywność i walka” after „Odskocz” | decision, change | Settlements to record, row 9 | Slices 4, 5, 9, 10 |
| Row 10 — Ucisk has the icon of „Opatrz”, `bandage-roll`, in the data of the actions | data or code | Settlements to record, row 10 | Slices 4, 10 |
| D-199 — Ucisk among the branches that give the price and no before-and-after values | decision, change (follows from the code) | Decisions in play, D-199 | Slice 8 |
| D-380 — „Ucisk — {rzecz}” refused „zdrowie pełne” before „brakuje {ile} × {rzecz}”, the lack counted in the pockets and the backpack | decision, change (follows from the code) | Decisions in play, D-380 | Slice 4 |
| D-363 — Ucisk among the actions whose target gives the price, as „Ucisk — Opatrunek (1 opatrunek)” | decision, change (follows from the code) | Decisions in play, D-363 | Slices 4, 9 |
| D-120 — its *Verification*: „Wytwórz” and „Opatrz” with the bandage as the target no longer stay open with no predisposition | decision, change (follows from the code) | Decisions in play, D-120 | Slices 1, 2 |

- The rows marked **data or code** (row 5 and row 10) are written by the slices that follow, in their place, by the rule of that place; **you write no entry for them** (`foundation_step.md`: "A row whose column names … the product's data or code … no entry is written for it"). Say so in your report.
- Each of the ten decisions is **changed**, never replaced by a new number, and never gets a new number: the task writes no new entry (the plan's *Projected entries* gives it none). Several rows change one decision (D-144 three times): that is one decision with the added sentences, not three.
- Entries to read whole as the element's skill selects them, and these by identifier (range at the base): D-379 (`foundations/decisions.md:7549-7575`), D-144 (`:7007-7035`), D-150 (`:7124-7138`), D-145 (`:7036-7055`), D-199 (`:7433-7462`), D-290 (`:9968-9996`), D-380 (`:8355-8373`), D-363 (`:10309-10323`), D-387 (`:6645-6663`), D-120 (`:7654-7678`); and for context D-140 (`:6898-6941`), D-146 (`:7056-7073`), D-340 (`:11595-11639`), D-456 (`:12772-12786`), D-457 (`:12787-12799`), D-461, D-443 (`:8374-8392`), the glossary (`foundations/glossary.md`, whole, 11 KB) and the part map (`foundations/part_map.md`, whole). Never read `foundations/decisions.md` whole (1.5 MB); the decision-log index script is `python -B .the-way/elements/common/decision_index.py --output .runs/foundation/index.md --decision <ID> …`.

## What the words must say (the task's own text; quote, do not restate in other words)

- Row 1 (D-144): „Kupiona gałąź Ucisk otwiera osobną czynność walki „Ucisk — {rzecz}”, którą gracz pisze jako regułę walki z własnym progiem zdrowia; „Opatrz” dalej nie działa w walce.” (D-140 and the sentence of D-145 „It is not carried out in combat” stay true.)
- Row 2 (D-144): „Ucisk zużywa opatrunek z kieszeni pasa („pod ręką”), a pusta kieszeń uzupełnia się z plecaka; „Opatrz” poza walką dalej bierze opatrunek z plecaka.”
- Row 3 (D-144): „Ucisk w jednej turze walki przywraca tyle zdrowia, co „Opatrz” tym samym opatrunkiem, razem z kupionymi stopniami „Mocniejszego zwoju”, nigdy ponad pełne.” Add what the task says in item 3: at full health it is not carried out.
- Row 4 (D-150): „„Ucisk — {rzecz}” rozwija drzewo „Opatrywanie małych ran”, które stoi wśród predyspozycji Maga żywiołów.”
- Row 6 (D-379): the ninth skill „Opatrywanie małych ran” gives a level and a point at 10, 28, 60 and 110 practice; its branches: „Mocniejszy zwój” (+5 health from a bandage per rank, prices 1 · 1 · 2), „Wprawna dłoń” (−2 minutes of „Opatrz” per rank, prices 1 · 1 · 2), „Szybkie gojenie” (+0.05 health a minute of its own regain per rank, prices 2 · 3), „Ucisk” (price 3). The decision's question and sentences speak of eight skills; after the change of nine. The numbers are those of the earlier game; the task does not tune them.
- Row 7 (D-145): „Opatrunek przywraca tyle zdrowia, ile podają jego dane, więcej o kupione stopnie „Mocniejszego zwoju”.”
- Row 8 (D-387): „0,05 zdrowia na minutę samoistnego powrotu to liczba postaci bez kupionych stopni „Szybkiego gojenia”; każdy stopień dokłada 0,05.”
- Row 9 (D-290): „Ucisk stoi w wyborze czynności w grupie „Żywność i walka”, za „Odskocz”.” The plan's slices place it between „Odskocz” and „Załóż” (the action „Załóż” stands last in the group and is no action of combat); write the position as the data will hold it: after „Odskocz” and before „Załóż”. Where D-290 lists the group's cells, add Ucisk there.
- D-199: the list of branches that give a price and no before-and-after values gets „Ucisk”.
- D-380: „Ucisk — {rzecz}” is refused with the same words and in the same order as „Opatrz — {rzecz}” — „zdrowie pełne” before „brakuje {ile} × {rzecz}” — the lack counted in the pockets together with the backpack that refills a pocket.
- D-363: the list of actions whose target gives the price gets „Ucisk”, such as „Ucisk — Opatrunek (1 opatrunek)”; the cell of the pick of actions shows no price.
- D-120's *Verification*: the test that holds „with no predisposition the actions no character skill grows, the walks, „Wytwórz” and „Opatrz” with an item as the target, staying open” stops being true for „Wytwórz” and „Opatrz” with the bandage as the target, which the new skill now grows. Correct that *Verification* pair.
- Each decision's *Rationale* and *Rejected* are written by the template; the *Rejected* takes the ways not chosen that the row's source keeps (the *Not chosen* lines of questions Q1, Q2, Q5, Q6, Q7 of the task and the „Ustawienie domyślne” lines), `none considered` or `unknown` as the template gives.
- Ensure *Relations*, *Scope* and *Verification* fields of each changed decision stay valid; a *Verification* pair (`decision:` quotation of a test) is kept only for the parts no test holds; the tests that later slices write will hold the new sentences with their own `decision:` lines, so a pair of examples you add only until a test holds the sentence marks the entry `the cycle's`, as `foundation_step.md` gives.

## Citations of the tests (a part of this step)

`python -B .the-way/elements/common/foundation_check.py --skip-test-citations` requires each `decision:` quotation of a test to begin one binding sentence of its decision. The ten decisions you change are quoted in many test files (the planner counted: D-379 in `tests/sim/skills.test.mjs`, `tests/sim/trip.test.mjs`, `tests/view/character-screen.test.mjs`, `tests/view/character-skills.test.mjs`; D-144, D-150, D-145, D-199, D-290, D-380, D-363, D-387, D-120 in about thirty files of `tests/sim/` and `tests/view/`). Do this:

1. Keep a quoted binding sentence **as it stands wherever it stays true**; add what is new as a sentence of its own or after the quoted words. Where truth requires the sentence to change (D-379's „The eight character skills give …”, which has to say nine), change it.
2. After the entries are written, run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`; it names every `decision:` quotation that no longer stands. Fix each of them by changing **only that quotation line** (the line `decision: D-… "…"` or the way the test files write it) to the opening of the sentence that now says the same thing; change no assertion, no test body, no other line. This is the one place where you touch a test.
3. List in your report every test file whose quotation line you changed, with its old and new quotation, and which sentence it now cites. A test whose assertion the change makes false (for example, a test that expects eight skills) is **not yours**: leave it; the slices change it.
4. Run the check until it exits with no error.

## Commits and report

Commit by path (`git add <file>…`, never `git add -A`, `git add .` or `git commit -a`), in English, as the foundation's earlier commits are worded; the foundation entries in one or a few commits and the quotation lines of the tests in their own commit. Do not push. The report as `make-change` section 6 and `foundation_step.md` give it: for each entry, one sentence of its meaning in English and one in Polish and its mark (`row <n>`, `projected` or `the cycle's`); each pair of examples you add, word for word; the quotations changed; each check as command and exit code (`foundation_check.py --skip-test-citations` and `python -B .the-way/instruction-files/check_instructions.py`); each reach beyond this handoff; each working copy; **Unread material:** and **Searches not found or unclear:** (each `none` where none). Return the status, the commits, a one-line check result and the report path.
