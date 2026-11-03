FAIL 9f4e5bb46e042ebc9177e3f660c4aaba55743164

# Review of the return step's commits — task `przyciski-i-zakladki`

Range `88d341b..9f4e5bb`, one commit, `foundations/decisions.md` +11 −11. Trust boundary no; irreversible operation no.

The commit itself holds no finding: every word it changes is right. The `FAIL` lies in what the step decided not to write, the glossary entry of „secondary action”, on grounds that do not hold.

## Blocking findings

### B1 — Important — „secondary action” takes a glossary entry, and the return step wrote none on grounds that do not hold

- **Place:** `foundations/glossary.md` (no entry); the word at `foundations/decisions.md:5747-5750` (D-275, binding), `:5759` (D-275 *Verification*), `:914` and `:920` (D-44); the judgement at `reports/return-step.md:81` and `:148`.
- **What is wrong:** D-275 gives the word a meaning a reader of the field does not give it, and the return step must write such a word: „a word the change uses in a meaning other than the usual one … through `record-glossary-term`”, and „No entry is deferred” (`.the-way/task-cycle/skill/return_step.md:10-16`). In the product a secondary action is only an action that opens or leaves a state of a form and stands under that form, and it is underlined text without a frame; „Every other action of the browser view keeps the button D-44 gives it”. In the field it is any lesser action, usually a framed or filled button:
  - „Use a primary button for the main action, a secondary button for secondary actions like Cancel or Discard.” (Carbon, `button-hierarchy.md:118`)
  - „Outlined buttons pair well with filled buttons to indicate alternative, secondary actions.” (Material, `:164`)
  - „Don't use links for triggering actions other than navigation. To create a secondary action with low visual emphasis, try a transparent or subtle button instead.” (Fluent, `:294`)

  So D-275's *Verification* „violates: … a secondary action given a frame” is false of what the field calls by that name, and the agent that wrote the entries says the same: „A reader of the field takes a secondary action for a lesser button, not text.” (`reports/foundation-entries.md:67`).
- **Why the report's grounds fail** (`return-step.md:81`):
  1. *„a narrowing of the reader's meaning, stated in the sentence that uses the word”*: a narrowing is no exemption. WAY-95's own complying example is „gate”, „used for the one command that runs all of a product's tests”, which narrows the field's word and takes an entry; `completion`, `blocked account`, `unit test` and `integration test` in `foundations/glossary.md` stand the same way. That a sentence says what the word is does not settle it either: the skill's step 3 draws the definition „where a sentence of the foundation already says what the word is, from that sentence” (`.the-way/elements/glossary/skill/SKILL.md:31-33`), and WAY-95's *Rejected* refuses „a word defined where it is used, when used in one place” as a limit (`.the-way/foundations/decisions.md:2033`).
  2. *„WAY-95 rejects moving a definition out of the sentence that says it”*: the rejected way is a rule moving „a word's definition … out of every sentence that says what it is, into the glossary — a rewrite of sentences the reader already understands” (`:2036-2037`). An entry here rewrites no sentence; D-275 keeps its text.
  3. *„An entry would also meet the same two-meanings rule”*: the term does not carry two meanings. A search of every tracked file outside `.the-way`, line breaks read as spaces, finds „secondary action” 18 times, and each use carries D-275's meaning. The report's two places are other words: „wherever an action is secondary” (`decisions.md:5769`) is the adjective, and „choćby poboczne” (`guidelines/styleguide-browser-view.md:343`) is the Polish adjective. Even read as the same word, the moved meaning is the reader's, which *Not* never names, and D-275's *Rationale* already has the word for it, „the lesser way” (`:5763`).
- **Why „tab” does not decide this:** the cost that stops „tab” (a second meaning in 52 lines, a renaming, the human's word) is absent here. The report's own price is „three lines” (`return-step.md:148`). The two words also differ in kind: see *Judgements checked, no finding*.
- **Why it matters:** tasks 4, 5 and 24 build screens from D-44's list of controls and from the styleguide heading „Main button, secondary action and tab”. An agent who brings the field's meaning takes „Anuluj” or a lesser „Usuń” on a game screen for a secondary action and draws it with `kind: "secondary"` as a harmless link, which is the way pytanie 1b rejected and the guess row 2 of *Settlements to record* exists to prevent. The report names this same risk as its cost if wrong (`return-step.md:148`). D-44's citation of D-275 lowers the risk; it does not meet the return step's requirement.
- **Evidence:** the quotes above; the search under *Checks*.
- **Fix:** write the entry through `the-way-record-glossary-term`, from D-275's sentence, *Not* reading `none`, for example „A secondary action is an action of the browser view that opens or leaves a state of a form, stands under that form and is drawn as underlined text without a frame.” Keep one sentence of its meaning in Polish for the request, where the human accepts it (WAY-114). If the fixer reads „an action is secondary” as a use of the term, rewriting those two adjectives to „lesser” is a change of D-275's *Rejected* and *Rationale* through `the-way-record-decision`, with the word shown to the human at the merge.

## Minor findings

- **M1 — the report calls D-268 a bare use, and it is not.** `return-step.md:36` lists „D-268 (line 5550)” among the bare uses left. The text reads „on a DOM / element React has drawn” (`foundations/decisions.md:5549-5550`), qualified across a line break. Nothing in the foundation changes; correct the sentence if the report's list reaches the request. The bare uses left are D-36 (`:794`, „static elements”) and D-47 (`:957`, `:969`).
- **M2 — the line proposed for the request names „tab” alone.** `elements/glossary/skill/decide_entry.md:14-15` says of a word that takes none: „show the human why, with the uses”. The report also judged „main button” to take none, and its proposed line (`return-step.md:74`) leaves it out. One clause in the line settles it.

## The commit, place by place

| Place | Before → after | Result |
|---|---|---|
| D-265 binding, `:5435` | „builds its elements through the DOM APIs” → „builds its DOM elements through the DOM APIs” | right; meaning unchanged |
| D-265 *Verification*, `:5449` | „builds its elements with `document.createElement`” → „builds its DOM elements with …” | right |
| D-265 *Rationale*, `:5454-5455` | „builds its elements in DOM” → „builds its DOM elements” | right; „in DOM” adds nothing beside the qualifier |
| D-276 binding, `:5775` | „keeps the element” → „keeps the HTML element” | right; the code keeps `<button>` (`button.ts:3`, `react-button.tsx`), and the task's „Element i atrybut `aria-pressed` zostają” holds |
| D-278 *Rejected*, `:5850` | „a new element” → „a new HTML element” | right |

The rest of the diff is rewrapping: the word diff shows `+DOM +DOM -elements -in +elements +HTML +HTML`, the widest added line is 99 columns, and line endings stay LF. WAY-104 calls for exactly this qualifier, and the report's reason is sound. The rewrite goes through the decision skill, as `elements/glossary/skill/write.md:7-9` gives. No other added line of the change holds bare „element”. D-277 and D-47 hold no text the commit touches.

## Judgements checked, no finding

- **„tab”, no entry: holds, as a judgement.** The report reads the form correctly: *Not* never names a reader's meaning (`template.md:70-73`, WAY-94 *Rejected*), so the recommended entry could not be written, and an entry with *Not* reading `none` beside the browser tab's meaning breaks WAY-99 as written. The counts hold: 72 lines of `decisions.md`, 20 of them the look (`:860` and D-276, D-277) and 52 the others. The whole word was tested by reading the look's uses and a sample of the other 52; the sample read a browser tab each time. I reached the same result by another test than the report's wording: everything the product calls a tab is what a reader calls a tab on the screen, and D-276 says only how it is built, „with neither arrow keys nor the roles of tabs”. The research agrees: „The role says "toggle" while the look would say "tab"”; „Every system whose rule could be read marks the selected tab with an underline or a shared fill” (`tabs-semantics-and-look.md:81`, `:25`). What speaks against it stands in D-276's own *Rationale* („A tab here names a look”; „a reader who knows the tabs of WAI-ARIA finds pressed buttons under that name”), so the human has to see this at the merge, as the report recommends. „Secondary action” differs in kind: there the product changes *which things* bear the name and what they look like, not how the same thing is built.
- **„main button”, no entry: holds.** Every use stands with its form or inside D-274, and a reader gives that the button that sends the form.
- **WAY-104's „last word”** (`action`, `sentence`, `part`, `test`, `check`): no finding. The bare domain uses in the new text stand inside a phrase holding the word, which is what WAY-104 calls a qualifier („An action that opens or leaves a state of a form”, „Every other action of the browser view”, „a sentence appearing under a form”, „on part of a screen”), or are plain idiom („is part of it”). Words the report's own search skipped, run here on the added lines: `gate`, `step`, `slice`, `surface`, `debt`, `flow`, `fact`, `choice`, `file`, `interface` 0 hits; `map` 2 hits and `task` 6 hits, each `map` in reworded older text of D-44 and each `task` in the process's meaning.
- **Rows of *Settlements to record*:** none missed. Rows 1–5 and 8 stand as D-274–D-279, row 6 in D-44's binding text („in `text`, with a bar on its left in its own colour (D-279) and never in `positive`”), row 7 in D-265.
- **Environment facts:** none owed. W3C, Carbon, GOV.UK and NN/g stand in *Rejected* or as accepted costs; none is a source a decision rests on (WAY-90), so *Based on* `none` holds.
- **Choices that bind after the merge:** rows Q1–Q9 and P1–P8 of `cycle.md` end with the work or stand in the styleguide.
- **Comparison with the code, sampled:** `.button.tab` and `.button.tab.selected` (`styles.css:212-223`), `.account-card-screen` with `15vh` (`:351`) and its comment (`:333-336`), `.button.destructive` keeping its frame (`:160-162`), the hovered row's line (`:875`), `.form-note`'s bar in `currentColor` (`:315`), `submit` only in the card and the kitchen-sink page, `kind: "tab"` not on the pace buttons (`status-row.ts:227`). All match the report. No text of `foundations/`, `guidelines/` or `src/` still says six controls.

## Declined to judge

- Bare „element” in D-36 and D-47: outside the task; they predate it and the change does not use those sentences, and the return step reaches what „the change uses”.
- The status `copy` / `do not copy` beside the glossary term `copy`: outside the task; it predates it and comes from the-way's template.
- „form” for the two forms of a control (D-265) and for an HTML form (D-274, D-275): outside the task; D-265's use predates it, and a reader gives both meanings.
- The Minor findings M1–M5 of `reports/whole-review.md`: the handoff of the return step leaves them, and they are no foundation entries.

## Checks

| Command or method | Exit code | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `9f4e5bb46e042ebc9177e3f660c4aaba55743164`, the head given |
| `git log --oneline 88d341b..9f4e5bb \| wc -l` | 0 | 1 commit |
| `git diff --name-only 88d341b 9f4e5bb` | 0 | `foundations/decisions.md` alone |
| `test "$(git rev-parse d63a3ea^{tree})" = "$(git rev-parse 88d341b^{tree})"` | 0 | same tree, as the handoff says |
| `.the-way` HEAD compared with its gitlink | 0 | `f45ca40…`, the same |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`. It holds no check of WAY-95, WAY-99 or WAY-104 (`grep` of the script), so it says nothing on B1 |
| `git diff --word-diff=porcelain 88d341b 9f4e5bb -- foundations/decisions.md \| grep -E "^[-+][^-+]"` | 0 | the seven words above |
| Width of the added lines (`git diff … \| awk`), `git ls-files --eol foundations/decisions.md` | 0 | at most 99 columns; `i/lf w/lf` |
| `git grep -n -i -w -E 'elements?' -- 'foundations/*'`, each hit read, across line breaks where needed | 0 | bare uses left only in D-36 and D-47 |
| Words of the-way's glossary and their last words in the added lines of `git diff 799d1ff 9f4e5bb -- foundations`, one `grep -c` each | 0 | the counts above; positive control: `elements?` 6, `actions?` 16 |
| `git grep -n -i -w -E 'tabs?' -- foundations/decisions.md`, counted and sampled | 0 | 72 lines, 20 of the look |
| Python search of `secondary\s+actions?` over `git ls-files` outside `.the-way` | 0 | 18 uses, each read in its context, all D-275's meaning |
| `git grep` of `tests`, `scripts` and `*.py` for a read of `foundations/decisions.md` | 0 | none reads it as data; mentions stand in comments |
| `git status --short \| wc -l` before writing this report | 0 | 0; the reviewed worktree is untouched and the report path is ignored by git |

Not run: the product's gate, which the handoff excludes. No focused test was run: the commit touches one Markdown file that no test reads, and the code tree is that of `d63a3ea`.

The author's own-work check names a real weak place, the text no earlier agent read against the-way's glossary, and it caught „element”. It looked at the glossary of the-way alone; it would not catch B1, which is a word of the product against WAY-95.

## Reaches beyond the handoff

- `.the-way/elements/glossary/skill/SKILL.md`, `decide_entry.md`, `write.md`, `examples.md`: what the skill the author judged by says of a word that takes none and of a sentence that already defines a word.
- `.the-way/foundations/glossary.md`, whole: the words WAY-104 reaches.
- WAY-90 and `.the-way/elements/decisions/template.md` (*Based on*, „Changing a decision”), `.the-way/elements/environment-facts/template.md:45-75`: the report's claim on facts and the wording change.
- D-44, D-222, D-40, D-274, D-275, D-279 of `foundations/decisions.md`: to verify the rows and the uses of the word.
- `reports/handoff-return-step.md`, `handoff-return-step-2.md`: what the step was asked to judge. `reports/foundation-entries.md`, `planner.md`, `whole-review.md` by a search for „tab” and „glossary”: the recommendations the report answers. `cycle.md`, rows Q1–Q9 and P1–P8.
- `C:\Storage\repos\loop2\.runs\styleguide\browser-view\button-hierarchy.md` (search for „secondary”) and `tabs-semantics-and-look.md:1-100`, in the main checkout, ignored by git: what the field's sources call these things.
- `guidelines/styleguide-browser-view.md:322-371`, and the code named under *Judgements checked*.

## Searches not found or unclear

- How a narrowing stands under WAY-95 is said by no sentence of the-way; I read it from WAY-95's example „gate” and the product's glossary. B1 rests on that reading together with the field's sources.
- The rule of when two uses carry two meanings stands in the glossary template as `TODO — decision pending`.
- What a reader of the field takes „tab” to mean: the sources use it for the look and for the WAI-ARIA pattern alike; my result is a judgement, as the report says of its own.
- How far WAY-104's „last word” reaches plain English use: unclear, as the report says; WAY-104's *Rejected* does refuse limiting the rule to whole terms, so I judged each use by whether a phrase holds the word.
- Whether „the word is the human's choice” (WAY-99) binds a word that moves a reader's meaning, which *Not* never names: unclear; it bears only on the optional rewrite in B1's fix.
