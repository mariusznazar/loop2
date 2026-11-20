# Author return report — locations-key-wording

**Status:** done — no commit (the step corrected and wrote nothing; the branch stays at `02526a59518c26eb60e5ed91f26a91040b523618`).

## Return step

- Foundation compared with code: no code in the change, so the entries were compared with the files they describe. D-362 (read whole, lines 753-766) and the invariant `tracked-file-private-names` (1298-1306) now say "key" for the name under `loop2` in `~/.the-way/locations.json`, as the three lines of `## Backlog` in `AGENTS.md` do (lines 3-5, which hold no "entry" any more; the only "entry" left in `AGENTS.md`, line 30, means a foundation entry), and as the pinned the-way's own `AGENTS.md` does ("the key `tasks` under `the-way`"). D-362's three keys `projects`, `tasks`, `task-rules` are the three the `AGENTS.md` lines name. D-362's *Verification* pair and the invariant's sentence still agree with the new wording (the pair's "entry" means an entry of the foundation and stays). The invariant is still the one sentence derived from D-362 and D-13, *Method* `review`, no test cites it. Search of the tracked files outside `.the-way` for another "entry" meaning a name in the locations file: none (author report, section "Other places…"). The part map of the touched parts: `agent-workflow` lists `AGENTS.md` and `product-foundation` lists `foundations/**` (`foundations/part_map.md:136-160`); their descriptions do not mention the locations file or the word, so nothing no longer matched. Corrections: none.
- Decisions written or changed: D-362 (changed in the foundation step, row 1; not touched here).
- Invariants written or changed: `tracked-file-private-names` (changed in the foundation step; the rule is the task's question 2 and *To do* item 3, which the human accepted; not touched here).
- Environment facts: none. The locations file `~/.the-way/locations.json` is the author's own file on their disk, the file the pinned the-way's `AGENTS.md` itself names for backlog keys; it is no source about the world outside the product. `elements/environment-facts/template.md` "Which facts are written" asks for a fact for a citation that would call a decision into question if it stopped being true (a finding about agents or models, the behaviour of a tool), for a setting people change outside the repository where a decision rests on its state, and for a source the change rests on and the foundation does not hold; D-362 states a rule about where loop2 points to such places, not a claim about the file's state, and its *Based on* reads `none` and the invariant's *Rests on* reads `none`, both unchanged and correct. The change adds no source.
- Glossary terms: none. WAY-95 (`.the-way/foundations/decisions.md`, "Which words take a glossary entry?") and `elements/glossary/template.md` "Which words take an entry" give an entry to a word that means in the product something other than a reader who knows its field takes it to mean. "Key" for a name in a JSON file (`locations.json`) is the field's own meaning, a name that has a value, so it takes no entry, in loop2's `foundations/glossary.md` or the-way's; the file holds no "key" entry, and loop2's other uses of "key" (keyboard key, SSH key, encryption key in `foundations/decisions.md`, `README.md`) are field meanings as well, so no sentence of the files reads wrongly. "Entry" is used as the-way's glossary gives it (`.the-way/foundations/glossary.md:49`: the text a file of the foundation holds about one thing it records) in the places that remain (D-362 *Rationale* "stands in the entry", *Verification* "a comment, an entry or a guideline", "an entry or a comment that leaves out…"), and no longer in the second meaning, so no use is against its entry and nothing is corrected.
- Part-map changes: none.
- Projected entries written whole or in part: none (the task carries none).
- Rows of *Settlements to record* written: row 1 → D-362 (sentence of D-362), written in the foundation step (`68745036`); nothing further written by the return step. No choice that binds after the merge is left unwritten: the choice (key, not entry, for a name in the locations file) is row 1 for D-362; the invariant carries it by the task's question 2, and the *Out of scope* item keeps every other "entry" as it is.

## Checks

- No file changed in this step, so `foundation_check.py` was not run again; its last run on the same tree (`python -B .the-way/elements/common/foundation_check.py`, exit 0, `0 errors`) is in the author report. `git status --short` shows a clean tree, and the head is `02526a59`.
- Not run: `npm test`, `npm ci` (the handoff says not to).

## Own-work check

Requirement most likely missed: that nothing in the return step's judgments leaves an entry the task needs (glossary entry for "key", environment fact for the locations file). Check: read WAY-95, the glossary template section "Which words take an entry", and the environment-facts template section "Which facts are written", and searched `foundations/glossary.md` and the tracked files for "key". Showed: no entry is due under either rule, as above. No commit, so no diff to compare.

## Reach beyond the handoff

- Read `elements/glossary/skill/decide_entry.md`, `elements/glossary/template.md` (lines 1-80), `elements/environment-facts/skill/decide_entry.md`, `elements/environment-facts/template.md` ("Which facts are written") and WAY-95's entry in the-way's `foundations/decisions.md`, to judge the two questions the handoff names; and `foundations/part_map.md:136-160` for the touched parts.

## Unread material

- `elements/glossary/skill/read.md`, `write.md` and the rest of `elements/glossary/template.md` (after line 80), `elements/environment-facts/skill/read.md`, `draft.md`, `write.md`: not read, since no entry is written and the judgment rests on the "Which words take an entry" and "Which facts are written" sections. The invariant `tracked-file-private-paths` and D-13 are not re-read in this step.

## Searches not found or unclear

none

## Working copies

None made in this step; `.runs/author/` was removed in the earlier step and not recreated.
