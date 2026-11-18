# Report — the agent of the plan's Foundation entries

**Status:** done

## Commits

- `e1e6b127` — `docs: :card_file_box: record D-425 on the size of a function and a file, the invariant function-and-file-size marked violated, and D-426 that the gate keeps no tool for unused code`. Files: `foundations/decisions.md` (+D-425, +D-426, before `## Testing discipline`, at the end of the section "Code rules, exemplars and static checks"), `foundations/invariants.md` (+`function-and-file-size`, before the withdrawn identifiers). `git log -1 --format='%h %ae'` shows `e1e6b127 mariusznn@gmail.com` (the private address).

## Entries (meaning, English and Polish)

- row 1 — **D-425** (decision, new; the next free number, D-424 being the last entry and D-361 the highest withdrawn): a function holds at most 200 lines of code and a file at most 800, counted without comments and blank lines with nested functions counted in the function that holds them, in the scope of D-29's linter (the file limit outside `tests/`), with two exceptions — `accountRoutes` and `saved-game.ts` — each with its reason, and the rule runs as a separate ESLint run beside D-29, which it does not change.
  PL: funkcja ma najwyżej 200 linii kodu, a plik najwyżej 800, liczone bez komentarzy i pustych linii, z funkcjami zagnieżdżonymi wliczanymi do zawierającej, w zasięgu lintera z D-29 (limit pliku poza `tests/`), z dwoma wyjątkami — `accountRoutes` i `saved-game.ts` — każdym z powodem; reguła działa osobnym przebiegiem ESLint obok D-29, którego nie zmienia.
- row 2 — **invariant `function-and-file-size`** (new; *Method* `test`, *Violated* `yes`, *Derives from* D-425, *Part* browser-view · simulation · account-server · build-tools · deployment · agent-workflow, as `eslint-source-rules`: the code the run reads and `build-tools`, which holds its configuration in `tests/quality/`; Slice 1 cites it as `# invariant: function-and-file-size`): no function and no file of the code the rule of size covers is over its threshold other than the rule's exceptions, as ESLint reports them with its two size rules alone.
  PL: żadna funkcja i żaden plik objęte regułą rozmiaru nie przekraczają jej progu poza wyjątkami reguły, według raportu ESLint z samymi dwiema regułami rozmiaru; niezmiennik oznaczony jako naruszony. Zdanie nie wymienia żadnej funkcji ani pliku ponad progiem (zestaw, który go utrzymuje jako naruszony, stoi przy oznaczeniu testu — Slice 1, wybór Q1).
- row 3 — **D-426** (decision, new): the gate keeps no tool for unused code; a run of such a tool is a one-time review, and adding one to the gate takes a human-accepted change of the decision.
  PL: bramka nie trzyma narzędzia nieużywanego kodu; przebieg takiego narzędzia jest jednorazowym przeglądem, a dodanie go do bramki wymaga zaakceptowanej przez człowieka zmiany tej decyzji.

## Checks

- Own-work check, the requirement most likely missed: Q1 — no function or file over a threshold named in the invariant, `createGameView` written nowhere as a violator, and the form rules of the decisions' template (no *should*, *will*, RFC keywords, *Rationale* naming no file/script). Command: `git show HEAD | grep '^+' | grep -i -w -E 'createGameView|should|will|MUST|startApp'` — exit code 1 (grep found no match), no output: nothing of those words in the added lines.
- Command: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit code 0, result `0 errors`.
- Command: `python -B .the-way/elements/common/foundation_check.py` (without the switch) — exit code 1, result `1 error`: `function-and-file-size` reads `test` and no test cites it (`foundations/invariants.md:1412`); expected until Slice 1 (the plan says so); no other error.
- No test run, no full gate.

## Choices and deviations

- **Relations of D-425:** the template's *Relations* take a closed list (`derives from` / `narrows` / `none`), and D-425 neither derives from nor narrows D-29. So *Relations* reads `derives from D-28` (the discipline that adopts the template carrying the rule of size), and the standing beside D-29 is said where the template lets it be said: in the binding sentences (third paragraph: the run is separate, leaves D-29's rule set and configuration as they are, "is no change of D-29") and in *Verification* (violates: a size rule added to `eslint.config.mjs` or the run widened to D-29's set, with no human-accepted change of D-29). The handoff asked for *Relations* to say it; the closed list cannot hold it. Way rejected: a free sentence in *Relations* — breaks the template's closed list. Cost if wrong: a reviewer who reads only *Relations* finds no mention of D-29; the binding sentence is the one a review compares a change with.
- **Section:** both decisions went to the section "Code rules, exemplars and static checks" (D-424 is its last entry); D-426 could also stand in "The gate, test tools and the local start". Cost if wrong: none (numbers carry the reference).
- **Statements of the two exceptions' reasons** stand in the binding sentences (the template lets the exceptions foreseen in advance be written there), not in *Rationale*, since *Rationale* may name no file. The reason of `accountRoutes` is "the one function that registers the routes of the server, nearly all of its lines being functions nested in it" (the task: 37 own lines of 408); of `saved-game.ts` "the whole turning of a saved document into game state, or into a refusal, in one checked file at a trust boundary" (the task).
- **Rationale, own measurements:** the 2026-11-13 trial and the run of knip are stated as the product's own measurements with the remark that their record is not open to a reader of the repository (the template, "Based on"); *Based on* of both decisions is `none`. The numbers come from the task's *Context*; none of them is mine.
- **Rejected** of D-425 holds the ways under the three questions that row 1's source names (150 lines, another measure, 500 lines, no file limit, waiting for the splits, the rule and exception alone); the tools question and the separate-run reasoning stand in *Rationale* only (the reasoning is the task's *Context*). *Rejected* of D-426 holds both ways of the task's answer.
- **No `tests:` clause** in D-425's *Verification*: its test (Slice 1) cites the invariant, not a decision line; a pair of examples covers the part the invariant does not hold (the separateness from D-29 and the exceptions' addition).
- **Search of the foundation (WAY-33):** grep of `foundations/`, `guidelines/`, the instruction files and `tests/quality/*.py` for `knip`, `unused code`, `dead code`, `max-lines`, `size of a function`, `lines of code` → no hit, no entry answering the same question; no collision with D-29 (stands beside it, said above). No glossary term used in another meaning; no neighbour entry changed.

## Reaches beyond the handoff

- `.the-way/elements/decisions/examples.md`, `.the-way/elements/invariants/examples.md`, `elements/decisions/skill/read.md`, `decide_entry.md`, `elements/invariants/skill/decide_entry.md`, `draft.md`, `write.md`, `elements/common/way_of_working.md`, `elements/common/rules.md` and the two templates: read, as the two `SKILL.md` direct (the handoff names the `SKILL.md` files, which select these).
- `.the-way/product-guidelines/coding/template.md` (lines 55–80 and 225–260, the rule of size) — to choose *Part* of the invariant as the template says.
- `foundations/part_map.md`, `foundations/invariants.md` (lines 400–450, 1225–1245 and the end), `foundations/decisions.md` (D-28, D-29, D-30–D-33, the end of the section, the withdrawn list), `foundations/environment_facts.md` (grep only) — for the number, the section, *Part*, *Relations* and facts.
- `the author's rule file on commits, outside the repository` — the user's rule before a commit (it came through a hook).

## Unread material

- `.the-way/elements/invariants/examples.md` names the-way's own invariants (`instruction-file-imports`, `gate-exit-code`, `script-imports`, …) and `.the-way/elements/decisions/examples.md` names WAY-03: I did not open these entries in the-way's `foundations/`, only the templates and loop2's own decisions and invariants as models. 
- The index of the selection of decisions (`decision_index.py`) was not written; I selected by hand the entries of the section I wrote into and the decisions named (D-28, D-29–D-33). The log was not read beyond those.
- Read in part: `foundations/decisions.md`, `foundations/invariants.md`, `foundations/part_map.md` (parts shown above), `.runs/task-cycles/struktura-kodu/plan.md` (all of it read, only the *Foundation entries* block and *Choices* used).

## Searches not found or unclear

- None of what was searched for was missing. Unclear: where *Relations* may say how D-425 stands beside D-29 (the closed list) — see Choices.

## Working copies

none (no copy made; `.runs/foundation-entries/` was not created).
