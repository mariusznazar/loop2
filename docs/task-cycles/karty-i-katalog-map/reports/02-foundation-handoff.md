# Handoff — the foundation entries of the plan (stage: foundation step, before slice 1)

You write the foundation entries of the task cycle of the task `karty-i-katalog-map`. You write only foundation files (`foundations/*.md`); no code, no test, no guideline file.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. A question for the human arises only where `.the-way/task-cycle/skill/foundation_step.md` says so; return it as status `blocked` with the question. Never ask the human directly.

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`, base (slice 1's base and yours) `58d48490ef7a61b37e04d1cc09b3c7f5e21ff96c`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`. Run its scripts from the worktree root as `.the-way/<path>`.
- Method and stage: no row of the `make-change` table fits you; read `.the-way/task-cycle/change/SKILL.md` for how a change is made and reported (sections other than 1's table), then `.the-way/task-cycle/skill/foundation_step.md` whole. Write each entry through the pinned project skill of its element (`the-way-record-decision` here; `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact` only if your search shows one is needed — the plan expects none), each a project skill with the `the-way-` prefix, never an unprefixed one. Read each skill's `SKILL.md` whole from `.claude/skills/<name>/SKILL.md` (it points to the-way's source skill under `.the-way/`).
- Commit on the task branch with `git add <paths>` by path (never `git add -A` or `git add .`); commit messages in English, in the form of this repository's commits (`docs: :memo: …`), ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/02-foundation-report.md` (status, commits, checks with command and exit code, the section **Searches not found or unclear** — items or `none` —, reaches beyond this handoff, questions and concerns, and for each entry one sentence of its meaning in English and one in Polish, marked `row <n>`, `projected` or `the cycle's`). Return only status, commits, a one-line check result and the report's path.

## Inputs

- Frozen task, whole: `docs/task-cycles/karty-i-katalog-map/task.md` — above all *Decisions in play* (lines 193–281, the wording of every entry), *Settlements to record* (283–294) and *Questions to settle* (the sources of the settlements).
- The approved project definition (`definicja_mvp2_loop2.md`) is a private note outside the repository; the task document quotes from it the wording of every projected entry you write. Write the projected entries from those quotations; where a quotation does not give a value an entry needs (*Relations*, *Verification*, marked `TODO` in the task), set it as the decision template and your search of the whole foundation give. Do not look for the private note.
- The plan's section to implement, copied here word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`:

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Settlement 1 — the card of a map follows the card of the old Loop: its parts, numbers from the map's data, parts the map lacks absent, and the five departures | decision | Settlements to record, row 1 | Slices 1, 2, 5, 7 |
| Settlement 2 — the card shows all of the map's data whatever the player discovered, and the Understanding does not change by it | decision | Settlements to record, row 2 | Slices 5, 7 |
| Settlement 3 — the order of the lines at each character in „Kto idzie”, „Wejdzie: …” always, the sentence of an empty team, „Wejdź” opening the screen of the map run and „Puść w pętlę” leaving the player on the card | decision | Settlements to record, row 3 | Slices 1, 5, 7, 8 |
| Settlement 4 — the first of the three clicks is „Mapy” on the menu bar, and no button at a character in Siedziba leads to the screen Mapy | decision | Settlements to record, row 4 | Slices 1, 8, 9 |
| Settlement 5 — „Wybierz mapę z listy.” on the right under `#/mapy` before a pick, and the row of the list as a link with „rozwiązana”, picked as a program on the list of programs | decision | Settlements to record, row 5 | Slices 1, 7 |
| Settlement 6 — `{map}` of `#/mapy/{map}` is the map's identifier in the game's data as it stands | decision | Settlements to record, row 6 | Slice 6 |
| (new) What does the screen Mapy show? | decision | projected, written whole | Slices 1, 7, 8 |
| (new) What does the game say before an earning loop that earns nothing? | decision | projected, written whole | Slices 1, 5, 7 |
| D-53 — sending from the card of the map on the screen Mapy | decision, changed | projected, written whole | Slice 8 |
| D-134 — „rozwiązana” on the list and the card of the screen Mapy | decision, changed | projected, written whole | Slices 5, 7 |
| D-149 — a map whose opener is unsolved absent from the screen Mapy | decision, changed | projected, written whole | Slices 6, 7 |
| D-165 — „the program picked for a character” in place of the headquarters row | decision, changed | projected, written whole | Slices 7, 8, 10 |
| D-170 — the list „Program:” at the character in „Kto idzie” | decision, changed | projected, written whole | Slices 7, 8, 10 |
| D-180 — „and the card of a map shows what of it enters” | decision, changed | projected, written whole | Slices 2, 5, 7 |
| D-188 — the line of a clipped trip plan at a character on the card of a map | decision, changed | projected, written whole | Slices 5, 7 |
| D-243 — „Puść w pętlę” at each character in „Kto idzie” of a solved map, beside „Wejdź” | decision, changed | projected, written whole | Slices 7, 8 |
| D-251 — the rehearsal mark under „Wejdź” in „Kto idzie” | decision, changed | projected, written whole | Slices 5, 7 |
| D-280 — the part of this task: the screen Mapy, the item „Mapy” on the menu bar and the sentence of three clicks (task 22 writes Wiedza) | decision, changed in part | projected, the part the code makes true | Slices 1, 6, 8 |
| D-281 — the part of this task: `#/mapy` and `#/mapy/{map}`, a map off the list falling under „and any other Siedziba” | decision, changed in part | projected, the part the code makes true | Slice 6 |
| D-282 — the part of this task: the list of maps and the card as areas of their own, and the section „Drużyna” with its heading in Siedziba in React; the writer ties it to the present sentence or adds an example to *Verification* | decision, part | projected, the part the code makes true | Slices 7, 9 |
| D-133 — the part of this task: the card of each open map shows the sentence of its solving condition (task 14 writes the rest) | decision, changed in part | projected, the part the code makes true | Slices 5, 7 |
| D-03 — the screen Mapy and Siedziba as `.tsx` components; the projected wording equals the present one, so the writer ties it and writes no change | decision, unchanged | projected, the part the code makes true | Slices 7, 9 |
| D-287 — in the wording of *Decisions in play*: the screen Mapy beside Siedziba and Postać, „Wejdź” in place of „Wyślij”, the sentence under the inactive buttons of each character in „Kto idzie”, and the two examples of *Verification* | decision, changed | the task's *Obecne decyzje, które zadanie zmienia poza przydziałami planu* (question 3) | Slices 1, 7, 8, 9 |
| D-274 — in the wording of *Decisions in play*: the new heading, „Wejdź” in the main look at each character, the example of *Verification* and *Rejected* way B | decision, changed | the same section (question 6) | Slices 1, 3, 7 |
| D-217 — its first sentence with „and that character in the section „Kto idzie” of the card of a map” | decision, extended | the task's *Wpisy zadania 4, które zadanie rozszerza* (question 4) | Slice 7 |
| D-244 — its first sentence with „and at that character in the section „Kto idzie” of the card of a map” | decision, extended | the same section (question 5) | Slice 7 |
| D-55 — the example of *Verification* moved to „Wejdź” in „Kto idzie”, naming the state after the end of a map run too | decision, example corrected | the task's *Przykłady do poprawy w tym zadaniu* (question 12) | Slice 8 |
| D-171 — the example of *Verification* moved to the list „Program:” at the character in „Kto idzie” | decision, example corrected | the same section (question 12) | Slice 8 |

No invariant, glossary term, environment fact or change of the part map: every file the change adds
falls under `src/browser/view/**`, `src/browser/sim/**`, `tests/view/**` or `tests/sim/**`, which
the part map already gives to `browser-view` and `simulation`.

- The slices that follow depend on your entries (their *Read* names them by identifier). Give each new entry an identifier by the log's rule, and report each identifier, its heading line range in `foundations/decisions.md` after your commits, so the orchestrator can name them.

## Orchestrator's notes for you

- Settlement 1 uses the words „krok inny niż zwykły” („usual step”). The plan's choice: the usual step is the step most maps' data give, the first of the data's order on a tie; no new data value. Write the decision so that it names this meaning, so that no reader guesses it.
- D-169's *Rationale* (names „the select lists of the program panel and of the headquarters”) and D-265's *Verification* example („a new section of the headquarters built in DOM”) become untrue by this change. The task does not carry them: leave them; the return step corrects them later.
- D-03 projected wording equals the present one: tie it, write no change; say so in the report.
- The entries cite code only as the decisions' template allows. Do not write numbers of lines of code into entries.
- Where your search of the whole foundation (WAY-33) finds a row's settlement already stated, tie the row to that entry as `foundation_step.md` says and name both in the report.

## Boundary

Stop when the entries are written and committed, `python -B .the-way/elements/common/foundation_check.py` has been run by you (command and exit code in the report), and the report stands. Do not start slice 1 or any code.
