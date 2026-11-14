PASS d7cddb27ec55e93bb28163f28cdf885ff46944db

# Review of correction 1 (the human's remark 3), range 76fb7bcb..d7cddb27

Reviewed in `the task's worktree`; `git rev-parse HEAD` and `git rev-parse d7cddb27` both give `d7cddb27ec55e93bb28163f28cdf885ff46944db`. `git log 76fb7bcb..d7cddb27`: one commit. `git diff --stat`: `foundations/decisions.md`, 2 insertions, 2 deletions; nothing else. The worktree is clean.

Counts: blocking 0, Minor 2, out of scope 0.

## Remarks, each as made or not

- Remark 1 and remark 2: not this correction's; it made no change for them, as the handoff says.
- Remark 3: **made, narrowly.** The checks of the skill's element (the decisions template, `rules.md`, the one-question check of `decide_entry.md`, `foundation_check.py`) were run over D-393, D-394, D-395, D-06 and D-264. Two lines were redone, one sentence in each of two entries, and nothing else was rewritten.

## The two edits

### D-393 *Rationale*: "within seconds of a change, where the test of isolation comes late in the gate" became "at the type check, ahead of the slower tests of the gate among which the test of isolation stands"

- Source of the removed words: the task's *Need* says the compiler "mógłby zgłaszać ten sam rodzaj błędu w kilka sekund". That is the task author's claim about what the compiler could do, with no measurement, and the card D21 of the source reports no timing. The template says *Rationale* names no count and a measurement "may stand, with what was measured and under which conditions, never as a general bound". "Within seconds of a change" is such a bound, so flagging it is correct. The check is in the template's wording, not the author's taste.
- What a reader needs is still there: the reason for a compiler check beside the test is that it speaks earlier than the test. The new wording keeps that, and it is true. `scripts/test.py` main runs `build` first, which runs `scripts/build.mjs` and so `tsconfig.sim.json` first, then the Node tests, then the Python gate. The test of isolation is among the Python tests, so the type check does come ahead of it. The only thing lost is the unmeasured "seconds".
- Meaning of row 1 of *Settlements to record* kept. The binding sentences did not change, and both checks stay, with the test whole.
- The sentence reads a little heavily ("the slower tests of the gate among which the test of isolation stands"). That is style and blocks nothing.

### D-395 *Rejected*: "…as `rule="trip"` did — the source keeps no cost or reason beside it, so none is known" became "…by a value of one of its parameters — no cost or reason of it is known"

- Flag is right: "as `rule="trip"` did" names the earlier state of the code, and "the source keeps no cost" speaks of a source. Template: *Rationale* and *Rejected* do not tell how the decision was reached (WAY-29), and an entry describes the decision as it stands, never the change (WAY-07).
- Source of the way: `architektura_loop2.md` row D15 (line 595) says "kontrolka przyjmuje funkcję sprawdzającą zamiast parametru `rule="trip"`". The way is therefore kept by the row's source, as WAY-134 asks. The row's source gives no cost or reason (`grep` of the file found none), so "no cost or reason of it is known" is the honest form. The template's two words, `none considered` and `unknown`, speak of the whole field. A named way with an unknown cost is the closest form the template allows, and it keeps the way for a reader who would propose it again, which is what the field is for.
- Nothing a reader needs is lost. The *Verification* `violates:` example still names the way in general ("picks the rule of a screen by a value of one of its parameters"). The name `rule="trip"` belongs to code that this change removes, and a Rejected that named it would go stale.
- Meaning of row 4 kept: the binding sentence, the *Verification* pair and the *Relations* are unchanged.

## What the checks would flag in the five entries, judged by me against the template and `rules.md`

I read D-06, D-393, D-394, D-395 and D-264 whole at the head.

- D-393: the question is a choice someone could answer otherwise. Two binding sentences, present tense, no normative capitals, no stage name. *Scope* names parts. *Based on* `none` is right: the entry rests on no source outside the product. *Relations* derives from D-04. *Verification* names `simulation-isolation · simulation-type-check`, and `simulation-type-check` (`foundations/invariants.md:1328`) names D-393 in *Derives from*. *Origin* `none`. *Rejected* holds both ways of the row's source, each with cost or reason, and the second reason (D-07 "computes nothing of the game") is the row's own. *Rationale* names no file, script or count apart from the one flagged and fixed. Nothing more flagged.
- D-394: the question is real. Binding sentences 2. The pair is correct (the violating example is code that goes against the entry while the entry stays). *Rationale* and *Rejected* carry no count; the task's "siedmiu plików" is left out, as it should be. Nothing flagged.
- D-395: one binding sentence. *Relations* derives from D-265. The pair is true. *Rationale* has no file or count. Files `program-editor.ts` and `trip-editor.ts` stand only in *Verification*, where the template allows examples. Nothing more flagged.
- D-06: the second binding sentence is now true of `scripts/build.mjs`, which loops over `tsconfig.sim.json`, `tsconfig.browser.json` and `tsconfig.server.json` and passes `--noEmit` only under `--check`. The entry says the third configuration "emits nothing"; `tsconfig.sim.json` holds `"noEmit": true`, `"lib": ["ES2022"]` and `"types": []`, so that is true even in a full build, where `build.mjs` passes no `--noEmit`. The *Rationale* reference to D-393 is by identifier alone. A wider grep than the author's (`two configurations`, `both configurations`, `two TypeScript`, `separate compilation`, `each configuration`, `both tsconfig`, over `foundations`, `guidelines`, `AGENTS.md`) finds no sentence that "two" would make false. `tsconfig.kitchen-sink.json` is not part of "building the application" (D-45 says nothing `npm run build` writes holds it), so "third" is not contradicted by it. Nothing flagged.
- D-264: three binding sentences, within the limit. The third sentence is true of `tests/view/page-document.mjs`: `press` (line 134) clicks inside `inAct`, which wraps `act`, and `fire` (line 125) dispatches a bubbling, cancelable event and does not wrap `act`, so "which the test file puts in `act` where React must answer" is accurate. The *Verification* pair names the copy of `press` or `fire` as a violation. No file or count in the added *Rationale* sentences. The added *Rejected* way (`press` and `fire` in a module beside the harness) carries a cost. WAY-134 binds the *Rejected* of a decision written from a row, and this edit is not one. `foundation_check.py` reports 0 errors.

## Findings

### Minor 1 — `foundations/decisions.md:5930-5933` (D-264, the third binding sentence)

The sentence ("A test file of such a screen clicks a control through the harness's `press` … and keeps no copy of either") is a rule on test files that D-264 did not carry before. The template says "a new rule next to an existing decision is a new question (WAY-19)".

The author's reading, that it belongs to the one question "what does a test of a screen built with React run on?", is defensible. The question is answered by the harness and what it carries; D-264's *Verification* already forbids "a second harness for the next screen"; and a copy of `press` in a test file is that second harness at the size of a helper. D-268 likewise puts what a test file takes from the harness (`assert`) inside its own entry. But the template's letter points the other way, so I would not call the author's reading certain.

Cost of leaving it: none today. If a later reader takes it as a second question, the way is a new number holding that sentence, and no reference moves, since nothing refers to the sentence. Cost of splitting now: a new number, a new *Verification* and a new *Relations* for one sentence, which the human did not ask for ("no full rewrite"). I agree with the author's choice to leave it and to give the alternative to the human. Blocks nothing; goes to the request's list.

### Minor 2 — `foundations/decisions.md:5960-5962` (D-264 *Rationale*, "…and no test file keeps a copy")

The clause restates in prose what the third binding sentence forces ("keeps no copy"). The template says what a decision forces on later work stands in a binding sentence or a field, never in prose (WAY-05). It is the tail of a reason ("it stands once in the harness … so no test file keeps a copy"), so the harm is small: the reader gets the reason, and the binding sentence holds the rule, so the two do not disagree. Blocks nothing.

## Was the correction narrow

Yes. Two single-line edits in two entries, each answering a specific line of the template. Binding sentences, *Scope*, *Relations*, *Verification* and *Origin* are untouched. The entries were not rewritten. The author's own report says openly that the edits were typed by script, not by a tool of the skill that writes, since the skill has none.

One point about the author's report, not about the edits: it says it invoked the skill and followed `.the-way/elements/decisions/skill/SKILL.md`. I did not re-run the skill; my judgement above rests on the template and `rules.md` themselves, not on the report.

## Declined to judge

- The older history-telling passages of D-264's *Rationale* ("tried in plain Node", "when the choice was made") and any other part of D-264 that this cycle did not write: before this cycle, outside the diff.
- D-393's binding sentences restating the content of the invariant `simulation-type-check` ("covers every file of the simulation, holds the library of the language alone and no ambient types, and emits nothing"): written in the earlier rounds, out of this correction's diff; the human accepted the row's meaning with the task document.
- Remark 2 (the fresh reviewer who reads whole the decisions the whole-change review did not open): another reviewer's work.

## Checks I ran

| Command | Exit |
|---|---|
| `git rev-parse HEAD d7cddb27` | 0, both `d7cddb27ec55e93bb28163f28cdf885ff46944db` |
| `git status --short` | 0, empty |
| `git log --oneline 76fb7bcb..d7cddb27`; `git diff 76fb7bcbe427ff7abde71018b6a2ae8a2fb70a5e..d7cddb27`; `git diff --stat` on the same range | 0, one commit, two lines in `foundations/decisions.md` |
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| Manual: read `scripts/test.py` main and `scripts/build.mjs` to confirm the type check precedes the Python tests | showed `build` as the first stage and `tsconfig.sim.json` first in the loop |
| Manual: read `tests/view/page-document.mjs:105-145` (`inAct`, `fire`, `press`) against D-264's third sentence | the sentence is true of the code |
| Manual: `grep` for "two configurations" and variants in `foundations`, `guidelines` and `AGENTS.md`; `grep` for `rule="trip"`, `P6` and `D15` in `architektura_loop2.md` | no stale "two"; the source gives the way and no cost |

Not run: `npm test`, `npm run build` and anything that writes, as the handoff forbids.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` and `.the-way/elements/common/rules.md`: the handoff names them. `.the-way/task-cycle/review/fix.md`: the handoff names it.
- `foundations/invariants.md:1328`, the entry `simulation-type-check`: to check D-393's *Verification* and the *Derives from* link back.
- `scripts/test.py`, `scripts/build.mjs`, `tsconfig.kitchen-sink.json`, `tests/view/page-document.mjs`, and `foundations/decisions.md:1061-1070` (D-45): to verify the claims of the rewritten D-393 sentence, of D-06's "third configuration" and of D-264's third sentence.
- `the note of the architecture analysis, in the author's private notes`, lines 284 and 595: to check the source of D-395's rejected way, as the task's row 4 names it.

## Unread material

- `.the-way/elements/decisions/examples.md`, `decide_entry.md`, `way_of_working.md` and the skill's `SKILL.md`: not read by me. The author's report cites them; I judged against the template and `rules.md`, which the handoff names. I read `tsconfig.sim.json` whole (a reach beyond the dispatch, to check D-06's "emits nothing").
- D-04, D-07, D-265, D-268: not read whole; D-04 and D-07 are named by D-393's *Relations* and *Rejected* and I took them as the entry quotes them, D-265 and D-268 only by their line in the task's *Decisions in play*. The rest of `foundations/decisions.md`: not read, except the lines named above.
- The task's *Description* and *Settlements to record* were read whole; the *Context* was read whole.

## Searches not found or unclear

- The skill names no executable checker beyond `foundation_check.py`; its checks are the template's and `rules.md`'s rules, so "run the checks" means reading each entry against them. There is no tool whose output I could cite apart from the script's `0 errors`.
- Whether "within seconds" is a "general bound" in the template's sense, and whether D-264's third sentence is its own question, are readings, not facts; I give mine above.
