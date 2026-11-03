# Planner report — przyciski-i-zakladki

- Status: done with concerns
- Plan: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/plan.md`
- Size report: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/plan-size.md` — `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/przyciski-i-zakladki/plan.md`, exit 0, every slice `fits` (slice 1: 6 files, ~95 k tokens; slice 2: 3 files, ~99 k; slice 3: 2 files, ~63 k; slice 4: 1 file, ~69 k; slice 5: 1 file, ~41 k)
- Check result: size script passed for all five slices; no product test and no gate run (planning changes no tracked file; the gate is the orchestrator's); `git status --short` clean.
- Method: `.the-way/task-cycle/plan/SKILL.md` at the pin `f45ca40`, read whole; `too_large.md` not read (no oversized attempt).

## The plan in brief

- *Foundation entries*: rows 1–8 of *Settlements to record* (all decisions) and the changes of D-44, D-222, D-40 and D-265 (*To do* 11), each mapped to the slices that need it. No projected entry, invariant, environment fact, glossary term or part-map change is carried (pytanie 6; every new or changed file lies under globs the part map already claims).
- Slice 1 — shared controls and their look (both forms, comparison cases, the shared CSS looks of the main button on `type="submit"`, the secondary action, the tab and the sentence's bar; `createFormNote` comment; `--bar-width` source). `cheaper`.
- Slice 2 — the login card on the new controls, the fixed top edge at 15 vh, and the screenshots of the card's states with the measurement of pytanie 4 (own-work check of the user interface). `cheaper`.
- Slice 3 — the kitchen-sink page in DOM form (*To do* 9). `cheaper`.
- Slice 4 — `guidelines/styleguide-browser-view.md` through `the-way-maintain-styleguide` (*To do* 8). `same`: binding wording across several rules that later screens follow.
- Slice 5 — `guidelines/coding-browser-module.md` statuses and three notes through `the-way-maintain-coding-guidelines`, with the departure of pytanie 5a (*To do* 10). `cheaper`.
- Risk of every slice: none (no file of `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`, `deploy/**`; nothing irreversible).
- Open design choice: none found. Reading the code confirmed that only the card (`account-card.tsx:251`) and the kitchen-sink samples (`kitchen-sink.ts:290`) have a button that sends a form, so a look on `type="submit"` meets *To do* 1 "w każdym formularzu" with no new parameter; the class names, how the tab attaches to the button selected in its group and the shape of the secondary action's two forms are listed under *Choices*.

## Order and the styleguide's example

The styleguide's *Plan of a user-interface change* gives: environment and library, values in their source, one screen, its states with the controls and the kitchen-sink page. The plan follows it with one departure: the values (`--bar-width`'s source) go together with the shared controls in slice 1, then the one screen (slice 2), then the kitchen-sink page with every state (slice 3); there is no environment step. The guideline texts (slices 4, 5) come after the code because they name the classes, kinds and files slices 1–3 make. The foundation entries come first, as the cycle gives.

## Concerns and questions for the orchestrator

1. **The screenshots (To do 12) may have no tool in this container.** `playwright-cli --version` gives `command not found`; `~/.cache/ms-playwright` does not exist; no Playwright package is in `node_modules/.bin`; `/usr/bin/google-chrome` exists. `.claude/skills/loop2-play/SKILL.md:40-41` says: "Where `playwright-cli --version` fails, stop and tell the human: installing it is their step", and its fallback is Playwright MCP, which I could not see among a subagent's tools. Slice 2's screenshots and slice 3's inspection depend on one of the two. Proposed answer: before dispatching slice 2, check whether Playwright MCP reaches the executor; if neither tool stands, put the install to the human (the task's *Human actions* say none, so this would be a new one) rather than let slice 2 return `blocked` and burn its one retry on a class higher. If the human declines, slice 2 can make its code and name the screenshots as not taken, and the request names *To do* 12 as unchecked.
2. **Screenshots and the repository.** Record Q3 has the record commit carry the PNG files; `.claude/skills/loop2-play/SKILL.md:13-15` says "Nothing of it stays in the repository: no Playwright test, no frame, no snapshot". The record commit is removed by the next commit, so this may be within what Q3 weighed; I name it so the orchestrator decides with that sentence in view.
3. **`tests/view/account-screen.test.mjs` is outside slice 2's *Change*.** Its card cases find controls by element, `type`, `aria-pressed` and text (`tests/view/account-screen.test.mjs:3424-3436`, `:3506-3546`), so they should pass unchanged; listing it would count its 170 137 characters whole in the slice's reading. If a case breaks for an intended reason, slice 2 changes it and names it as beyond *Change* (a *Choices* row).
4. **Model of the foundation-entries agent.** The plan form gives it no *Model*. Recommended: `same` — twelve entries written against current ones, where the writer must judge whether row 6 is already stated by the changed D-222/D-44, row 7 by the changed D-265 and row 8 beside D-40's *Verification* (`foundation_step.md`: such a row is tied to the entry, not written twice).
5. **"Zakładka" may meet the glossary test.** Pytanie 2a says „zakładka” w wytycznych znaczy wygląd — a word a reader of the field takes for ARIA tabs with arrow keys. The task's *Settlements to record* shows 13 candidates and 8 accepted; the five rejected are not in the frozen document, so I cannot tell whether a glossary entry was weighed and refused. The plan writes none; the search of the foundation that `record-decision` makes for row 3 (WAY-33) asks this question, and the return step can too.

## Guidelines found missing or uncertain

- None missing for the touched parts (`browser-view`, `agent-workflow`, `product-foundation`): `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` and `src/browser/AGENTS.md` stand and were read.
- Uncertain: *To do* 8 and 10 say the changes go "przez" the two guideline skills. Both skills are refinement skills; what they give the cycle is the column "The cycle's author, in `implement-task`" and the templates (`.the-way/product-guidelines/styleguide/SKILL.md` "Where the skill works"; `.the-way/product-guidelines/coding/SKILL.md` the same). Slices 4 and 5 therefore read the project skill, the-way's skill and both templates, and write the file as the cycle's author.
- Uncertain: `guidelines/styleguide-browser-view.md:245-260` lists the sources of values settled in the task "Styleguide loop2"; the new source of `--bar-width` (Mariusz's choice from the preview of the card's variants, 2026-11-02) is of a kind not listed there. The plan does not ask slice 4 to add it, since the list is scoped to that task; the reviewer may judge otherwise.
- `guidelines/coding-browser-module.md:192-194` names `ReactButton (waitingText, selected, submit)`; slice 5 changes that example only where slice 1 makes it untrue (a *Choices* row).

## Reaches beyond the handoff

- `.the-way/task-cycle/skill/SKILL.md:250-325` and `.the-way/task-cycle/skill/planning.md` — how the plan's *Foundation entries* and slices are dispatched, to know that the entries have their own agent and that a slice with no commit fails the mechanical check (the reason the screenshots sit in slice 2).
- `.the-way/elements/common/way_of_working.md:40-120` ("Reading the foundation") and `.the-way/product-guidelines/reading.md` — what each slice's *Read* has to name.
- `.the-way/product-guidelines/styleguide/SKILL.md`, `orchestrated_mode.md`, `.the-way/product-guidelines/coding/SKILL.md`, `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md` — what slices 4 and 5 and the entries agent read.
- `.claude/skills/loop2-play/SKILL.md` — the route of the screenshots; found the missing `playwright-cli`.
- `scripts/kitchen-sink.mjs:1-40` and `README.md:66` — the `--build-only` mode used in slice 3's checks.
- Decisions D-81 (`foundations/decisions.md:1515-1527`), D-225 (`:4219-4252`), D-268 (`:5515-5559`), D-270 (`:5586-5614`) — linked from invariants and decisions the slices reach; invariant `focused-test-execution` (`foundations/invariants.md:589-598`); glossary entries `unit test` and `integration test` (`foundations/glossary.md:94-105`).
- `reports/gate-base.log` tail — that the base gate ended with exit 0.
- The user's rule file `/home/user/the-brain/.ai/rules/scripts.md`, read before the shell one-liners used to compute ranges.

## Searches not found or unclear

- `playwright-cli` in the container — not found (`command not found`); Playwright MCP for a subagent — unclear.
- The research files `.runs/styleguide/browser-view/button-hierarchy.md`, `tabs-semantics-and-look.md`, `neutral-status-message.md` — not in the container, as the handoff says; the plan works from the task's answers.
- Another form with a button that sends it, beyond the card and the kitchen-sink samples — none found (`grep` for `submit: true`, `type="submit"`, `<form`, `createElement("form")` under `src/browser`).
- A test that reads files of `guidelines/` — none found under `tests/`; only `.the-way/elements/common/foundation_check.py` checks them, so slices 4 and 5 have that as their check.
- The five rejected candidates of *Settlements to record* — not in the frozen task (see concern 5).
- A decision saying the card stands in the middle of the window — none, as pytanie 4 says; the only place is the comment at `src/browser/styles.css:251`.
