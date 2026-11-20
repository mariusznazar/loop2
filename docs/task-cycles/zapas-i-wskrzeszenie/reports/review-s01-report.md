FAIL 3647bb19a0e09413a2b9f871ac5fa4e955c18980

# Review of slice 1 (foundation) — task `zapas-i-wskrzeszenie`

Range `46cfec71..3647bb19` (one commit, `3647bb19`; `foundations/decisions.md`, `foundations/glossary.md`, `foundations/invariants.md`; 67 insertions, 53 deletions). `git rev-parse HEAD` = `3647bb19a0e09413a2b9f871ac5fa4e955c18980`, the head given. `.the-way` stands on the pinned commit `19e5774a`.

Counts: blocking 2 (Important), Minor 3, out of scope of this slice 1 (a group of stale uses outside the slice's list, for the orchestrator).

## Blocking findings

### I-1 (Important) — D-242 *Rationale* restates the return of a use without the condition of a full stock

- Place: `foundations/decisions.md:8708` (D-242, *Rationale*), the sentence rewritten by this change: "Whole real moments keep a death at one place on the clock however the span is read, so a use of the resurrection used in a death during an absence returns from that death's own moment, the clock starting there, and the uses left can cover a further death the same night, …"
- What is wrong: by D-190 as this same change writes it (`foundations/decisions.md:6211`: "a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs, a use returns after the span from the moment the clock started and each next one after the span from the return of the one before it") and by `resurrection-renewal` (`foundations/invariants.md:1070`: "a death that uses up a use at any other time leaves that moment as it stood"), a use spent while the clock already runs does **not** return from that death's own moment and does not start the clock. The D-242 sentence says, with no qualification, that every use spent in a death during an absence returns from that death's moment with the clock starting there. Before the change the sentence was true ("a resurrection used in a death during an absence renews from that death's own moment"); the rewording carried the one-resurrection rule over to uses and dropped the qualification.
- Why it matters: D-242 is read whole by the agent of Slice 9 (catch-up and earning loops spend and return uses) and Slice 13 (the clock's tests); the plan's table names D-242 for both. An implementer who takes this sentence restarts the clock at each death of an absence — the "każde osobno"/restart behaviour the human rejected in question 3. WAY-263: an entry the change writes that restates another entry more broadly, without its qualification, is Important.
- Evidence: the two quoted sentences; task, To do 3: "śmierć, która zużywa użycie przy pełnym zapasie, puszcza zegar, a śmierć przy zegarze już biegnącym go nie przestawia".
- Fix suggested: e.g. "…so the clock of the returns, when a death during an absence starts it, runs from that death's own moment, and the uses left can cover a further death the same night, …".
- Contradiction: yes — D-190 (as this change writes it) and the task's answer to question 3 / To do 3 ("śmierć przy zegarze już biegnącym go nie przestawia").

### I-2 (Important) — Row 10 of *Settlements to record* recorded only in part, and in no binding sentence

- Place: D-428, `foundations/decisions.md:11687-11700`; the change touches only its *Verification* (`…the earning loop started with the full number of uses of the resurrection`).
- What is wrong: row 10 reads "Przyrząd balansu startuje pętlę i sprawdzenie mapy z pełnym zapasem użyć, przełącznik „bez wskrzeszenia” z zerem, a gracz kampanii, który czeka na wskrzeszenie, próbuje przy choć jednym użyciu." with *Goes to* "sentence of D-428". The change records the first third, and in the `tests:` clause of *Verification*, which by the decision template names "the parts of the sentences they hold, in words" — i.e. it describes sentences, it binds nothing of its own. The switch `--no-resurrection` starting with no use left (all used, the clock started at the loop's start) and the campaign player trying with at least one use stand nowhere in the foundation. The row's last column says what the cycle would otherwise guess: "co znaczy `needResurrection` przy kilku użyciach" — exactly the part left out.
- Why it matters: the settlement was accepted by the human to be recorded in the foundation; with no binding sentence, a later change of the instrument can make `--no-resurrection` start with one use, or let the campaign player wait for a full stock, while no entry is contradicted, and Slice 10 has no sentence its tests can hold by a `decision:` line. This is the plan's own shape (plan table: "D-428 … (*Verification*) | Settlements row 10"); something the plan mandates is still a finding when it is a defect, so it is named here as such.
- Fix suggested: a binding paragraph of D-428 for the part of another question it answers (how the instrument counts the resurrection), e.g. "The earning loop of the map check and the command of the loop start with the full number of uses of the resurrection, the switch `--no-resurrection` with every use spent and the clock started at the start of the loop, and the player of a campaign who waits for the resurrection before trying the next map tries when at least one use is left." — or the orchestrator may decide, as a recorded choice, that the rest of row 10 lives only in `balance/cli.mjs` and the two skill copies (To do 5); then the report of the cycle should say that row 10 is not wholly in the foundation.
- Contradiction: no

## Minor findings

### M-1 — D-190 *Rejected* lacks some of the ways the rows' sources keep

- Place: `foundations/decisions.md:6236` (D-190 *Rejected*).
- The template (`.the-way/elements/decisions/template.md`, "The *Rejected* of a decision written from a row …", WAY-134) asks *Rejected* to hold the ways not chosen that the row's source keeps, each with its cost, or `no cost to the product known`. Rows 2–4 cite questions 2, 3, 4, 5. Missing: from question 2, "Kształt Mariusza bez dalszej drogi przez wytwarzanie — jedna zmiana i koniec; zegar zostaje ceną na stałe", "Od razu pełny wytwarzany przedmiot — … do tego czasu obowiązuje dzisiejsze osiem godzin", "Wskrzeszenie jako prawdziwy przedmiot z własnymi liczbami — czekałby na zadania 8 i 10" (a cost of the plan only — then `no cost to the product known`); from question 4, "Liczby Mariusza — droga otwarta, bez kosztu w pytaniu" (`no cost to the product known`). The ways added (unchanged eight hours, shorter clock, 2/8, 5/2, own clock per use, all uses back at a completion) are right. Minor by WAY-364: form, the content agrees; the item "a resurrection as an item in the chest — set aside…" and the *Rationale*'s "a later direction, not built" cover the crafting ways in spirit.

### M-2 — D-240 *Rationale* and *Rejected* still speak of one resurrection to take

- Place: `foundations/decisions.md:8622-8630` (D-240, an entry of this slice). "a character higher on it died with the resurrection", "a character whose resurrection another's turn reaches is outside `catch-up-state`", *Rejected* "the resurrection going to the character that died first in real time". The binding sentence now says "the last use"; the prose keeps the old one-resurrection reading. Glossary template, "A changed meaning" (WAY-97): uses whose meaning the new definition of `resurrection` moves are rewritten in the same change. Minor: prose; a reader can still follow it, e.g. "the last use going to the character that died first in real time".

### M-3 — `resurrection-renewal` joins several rules in one sentence

- Place: `foundations/invariants.md:1070`. Use-up, start of the clock, return and move of the clock, the return at a first completion, deaths that leave everything, and the equal moment, in one sentence of about 150 words. The invariant template ("One entry states one invariant, in one sentence", WAY-08) — the entry joined several rules before the change too, and a split needs new identifiers, which the plan does not give. The content agrees with D-190 and the task (To do 3, questions 3, 5): checked clause by clause, including the stop of the clock when a completion or a return fills the stock ("unless the stock is then full", "while the stock is then not full"). Minor (WAY-364); the executor named it too.

## Out of scope of this slice — stale uses the plan leaves outside every slice (for the orchestrator; not blocking slice 1)

The handoff forbade slice 1 to change entries beyond its list, and the executor kept to it. The glossary template's rule "A changed meaning" (WAY-97) asks the change that changes a term's definition to rewrite, in the same change, every use whose meaning moves. The new definition of `resurrection` no longer has a resurrection "ready or not"; these uses keep the old one-resurrection meaning and no slice of the plan rewrites them (plan choice row, `plan.md:676`, keeps `generation number` and D-386 as they are, which departs from WAY-97). Judgment of each of the executor's stale entries:

1. **D-386** (`foundations/decisions.md:4233`, binding sentence: "the save time and the moment the account's resurrection is ready"; *Verification*: "the team's moment of readiness") — bears on the task: question 15 fixes the stored shape (count of used uses and the moment of the next return, standing iff the count is above zero), and Slices 2, 6 and 7 change the load D-386 governs. A reader of D-386 after the change finds a moment the state no longer holds under that meaning. Recommend: reword in Slice 11 (the other foundation slice) or the return step.
2. **Glossary `generation number`** (`foundations/glossary.md:219`, "because no resurrection is ready") — bears on the task; a glossary use of the very word whose meaning moved. Recommend: "because no use of the resurrection is left", same slice.
3. **D-194 *Rejected*** (`foundations/decisions.md:7083`, "while a manual run of a solved map is to pay nothing (D-189)") — bears on the task: it cites D-189 for a rule D-189 no longer states (it now brings loot out and pays no practice). Recommend "is to pay no practice (D-189)".
4. **D-241 *Rationale*** (`foundations/decisions.md:8661`, "a death with no resurrection ready takes what waits with the rest") — bears on the task, same as 2. Recommend "a death with no use of the resurrection left".
5. **D-04 *Verification*** (`foundations/decisions.md:98`, "the moment a resurrection is ready" as an example of a stored moment) — does not bear in substance; generic and still readable as the moment of a return. Leave.
6. Found besides the executor's list: **D-219 *Verification*** (`foundations/decisions.md:6338-6341`, "the moment of readiness …, and a resurrection used up ready again at its moment after a save and a load") — task keeps D-219's sentence; its *Verification* wording is stale in the same way. Recommend rewording with item 1.

D-215, D-216, D-217, D-329 and D-251 still state the old rules; they are Slice 11's by the plan and not judged here.

## Settlements and To do 7 — what was checked and holds

- D-438: binding sentence, *Scope*, *Based on*, *Origin*, *Rationale*, *Rejected* word for word as "Zadanie zapisuje" quotes them; *Relations* `none`; *Verification* a pair for an agent's comparison, with no test of the 20% share and no run of 500 seeds in the gate (task, "Questions carried to cycle", question 7). Number D-438 is the next free one (highest entry D-437, withdrawn list ends at D-361); placed at the end of "Maps: their content, time and solving".
- Row 1 (D-189, D-179, D-214, `solved-map-manual-run`, `trip-transfer`, `trip-run-end`): holds. D-189 sentence 3 gives the chest and the bringing out, practice not paid; the sentence of equipment from nowhere and the mark under „Wejdź” with D-251 gone; no reference to D-251 left outside D-251 itself; *Relations* `derives from D-438`; *Rationale* no longer makes the try from nowhere the rule, *Rejected* holds question 1's two ways with their product costs (the process cost of reopening the definition rightly left out). D-179 exception gone from sentence and rationale. D-214's restart takes from the chest, pays no practice.
- Row 2 (D-190): "held as numbers of the account, no item of any backpack, equipment or chest"; the crafting direction stands in *Rationale* ("a later direction, not built"), which the template's rule on what the product does not do yet allows.
- Rows 3, 4 (D-190, `resurrection-renewal`): one clock, one return at a time, 3 uses and 4 hours in the data, a first completion returning one use while the stock is not full, the clock running on. *Verification* names "3 uses and 4 hours" instead of "480 real minutes"; *Relations* `derives from D-438`; the rest of the binding sentence kept word for word where the meaning allows.
- Row 5 (D-220): a new game with the full number of uses.
- Row 9 (glossary `resurrection`): uses; *Not* "one of its uses — "use"".
- Row 10: see I-2.
- D-240, D-242 binding sentences: say the last use and the clock of returns as To do 3 gives; D-242's *Rationale*: see I-1.
- No entry outside the slice's list changed; no code, no test, no screenshot in the range.
- Sentences the task does not change are kept word for word: the `decision:` quotations that still match (D-179, D-189 sentence 2, D-240 sentence 1, D-242 sentences 1–2, D-428) are not reported by the check; each quotation reported is of a sentence the task changes (checked by listing the distinct quotations: D-189 sentences 1 and 3, D-190's three, D-214 sentence 2, D-220, D-240's second, D-242's third).

## Declined to judge

- D-215, D-216, D-217, D-329, D-251 — Slice 11's by the plan.
- The trust boundary at `src/browser/sim/saved-game.ts` (hostile input to the load) — no code in this range; Slices 2 and 7 carry it.
- Whether the numbers 3 uses / 4 hours are right for the walls — a human's settlement; the task defers a correction to task 6 of the plan.
- The correction of D-190's *Rationale* about the lack of a sweep over many seeds — task "Out of scope", task 2 of the plan.

## Checks run

- `git rev-parse HEAD` → `3647bb19a0e09413a2b9f871ac5fa4e955c18980`; `git -C .the-way rev-parse HEAD` = `git ls-files --stage -- .the-way` = `19e5774a…`; `git log`/`git diff --stat 46cfec71..3647bb19` → one commit, three files.
- `git diff 46cfec71..3647bb19 -- foundations/` read whole (word diff for glossary and invariants).
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → exit 1, "86 errors". Every error is a `decision:` line in a test file: `tests/sim/catch-up.test.mjs` (D-190 ×12, D-240 ×3, D-242 ×4) and `tests/sim/loop.test.mjs` (D-189 ×5, D-190 ×13) — Slice 9; `tests/sim/death.test.mjs` (D-189 ×1, D-190 ×19, D-220 ×3), `tests/sim/completion.test.mjs` (D-190 ×2, D-214 ×1), `tests/sim/data.test.mjs` (D-190 ×1) — Slice 8; `tests/sim/trip.test.mjs` (D-189 ×9, D-214 ×2), `tests/sim/run-record.test.mjs` (D-189 ×1) — Slice 3 (and 16); `tests/sim/team.test.mjs` (D-220 ×1) — Slice 6; `tests/view/clock.test.mjs` (D-190 ×5, D-242 ×1) — Slice 13; `tests/view/maps-screen.test.mjs`, `tests/view/trip.test.mjs` (D-189 ×1 each) — Slices 15, 17; `tests/view/account-screen.test.mjs` (D-189 ×1) — Slice 18. Each file is in a later slice's *Change* (checked against the plan). Besides, four "listed" lines (not errors) in `foundations/invariants.md` for `trip-transfer`, `trip-run-end`, `solved-map-manual-run`, `resurrection-renewal`, whose citing tests change in later slices. Nothing in `foundations/` is an error — no limit of a paragraph or of all binding sentences exceeded (D-189, D-190, D-240, D-242 included). The executor's report counts "82 lines" plus 4 listed; the lines it lists by file add up to 86, which is what the check prints — a slip of the report's count only.
- Searches of the three foundation files for "from nowhere", "takes nothing from the chest", "leaves the chest as it was", "pays nothing", "resurrection … ready", "no resurrection", "D-251", "renew": results judged above.
- `awk` over *Relations* of the log for the decisions that derive from or narrow D-179, D-189, D-190, D-214, D-220, D-240, D-242, D-428 (step 4.4 of the decision skill); D-180–D-188, D-218, D-219, D-221, D-245, D-246, D-247 searched for "solved", "resurrection", "nowhere", "ready" — results in the out-of-scope section.
- Not run: `npm test` (no code in the range; the handoff forbids a bare run; the full suite is the cycle's own run); the full `foundation_check.py` without the switch (the plan's check is with the switch; the test citations are later slices'); `check_instructions.py` (no instruction file changed).

## Reach beyond the dispatch

- D-194 whole (`foundations/decisions.md:7066-7085`) — derives from D-189; executor named it stale.
- D-241 whole (`foundations/decisions.md:8632-8669`) — the executor's "line 8661".
- D-427 (read in passing beside D-428).
- `foundations/glossary.md` `trip plan` (adjacent) and `generation number`; `foundations/invariants.md:1150` `catch-up-state` sentence by search.
- `plan.md:670-682` (choices table) and the *Change* fields of all slices in `plan.md` — to check that each test file the check reports is changed by a later slice and whether D-386 and `generation number` are placed anywhere.
- `.the-way/elements/common/rules.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/decisions/skill/SKILL.md`, `.the-way/elements/glossary/template.md`, `.the-way/elements/glossary/skill/write.md`, `.the-way/elements/invariants/template.md` lines 74–85 — the rules the change is judged against.

## Working copies

- `.runs/review-s01/` held the output of the foundation check (`fc.txt`); removed before returning (its result is summarised above). No remainder.

## Unread material

- Decisions read whole: 15 — D-438, D-189, D-179, D-214, D-190, D-220, D-240, D-241, D-242, D-428, D-427, D-219, D-221, D-386, D-194. D-216, D-217 read only in the lines a search returned (Slice 11's); D-251 read only in the lines a search returned; the section "Maps: their content, time and solving" (`decisions.md:5420-5992`) read only at its heading, its sentence, D-214 and the end where D-438 stands.
- Invariants read whole: `trip-transfer`, `trip-run-end`, `solved-map-manual-run`, `resurrection-renewal`, `death-settled-once`; `catch-up-state` only its sentence.
- Glossary: `resurrection`, `generation number` whole; `wall` not read.
- `foundations/part_map.md:33-64`, `127-137`, `159-165` not read (no question of a part arose: no code in the range).
- Of the method files in the slice's *Read*: not read — `.claude/skills/the-way-record-decision/SKILL.md`, `.claude/skills/the-way-record-invariant/SKILL.md`, `.claude/skills/the-way-record-glossary-term/SKILL.md`, `.the-way/elements/decisions/skill/read.md`, `decide_entry.md`, `.the-way/elements/decisions/examples.md`, `.the-way/elements/invariants/skill/*` (SKILL, decide_entry, draft, write), `.the-way/elements/invariants/examples.md`, `.the-way/elements/glossary/skill/SKILL.md`, `read.md`, `decide_entry.md`, `.the-way/elements/glossary/examples.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/task-cycle/skill/foundation_step.md`. `.the-way/elements/invariants/template.md` read only at lines 1–30 by search and 74–85.
- The task file itself not opened: its passages were read from the handoff's word-for-word copy (lines 16–36, 37–128, 142–152, 154–174, 180–262).

## Searches not found or unclear

- Not found: any sentence of the foundation that records the `--no-resurrection` switch or the campaign player's `needResurrection` (searched `decisions.md` for "no-resurrection", "needResurrection", "campaign") — see I-2.
- Not found: a slice of the plan that rewrites D-386, glossary `generation number`, D-194 *Rejected*, D-241 *Rationale* or D-219 *Verification* (searched `plan.md`); the choice row at `plan.md:676` keeps two of them deliberately.
- Unclear: whether row 10's *Goes to* "sentence of D-428" was meant for D-428's question, which is about what the map check prints, while the switch and the campaign belong to other modes; I-2 offers both ways.
