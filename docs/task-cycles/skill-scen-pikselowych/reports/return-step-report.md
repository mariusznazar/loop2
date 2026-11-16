# Return step — loop2: skill z gotowymi skryptami do grafiki sceny

**Status:** done. **Commits:** none (the comparison found nothing to correct; the tree is at `af282831` and clean).

## Return step

**The foundation compared with the code.** What no longer matched, and its correction: none.

Compared with the final code and `SKILL.md`:
- **D-415** (the entry the change writes) against the skill and the scripts: the skill names D-415 where it states that the human judges and that no threshold decides; the scripts set no threshold (`contrast.mjs` exits 0 whatever the ratio, shown by a test). Its *Verification* pair, after the fix of M9, no longer turns on itself. No test holds a sentence of D-415, so the pair stays whole and the clause `tests:` is not used. Its *Rationale* says the dust at the sticks and the dust at the fibre stay: D-366 puts the dust at the prop, and under the mage's feet for fibre, which agrees; `dust.png` and `sticks.png` share the brown `#88673f`, the colour `dust.png` uses most (160 pixels).
- **D-271** (the packs, the credits, "a picture of a pack other than the three named" a violation, the frost 3:1 against the snow), **D-317** (no flash of the whole area; the field 341 × 256 and the quarter 21,824 in its *Based on* and *Rationale*), **D-349** (672 × 304, 336 × 152), **D-42** (keeps `wcag-three-flashes`, so "WCAG 2.3.1, the source of D-317, kept by D-42" in the script and in `SKILL.md` is exact), **D-396** (smallest window 1280 × 720; the skill states no window size), **D-82** (no source outside the foundation in a test comment; the fix of I3 holds it), **D-87**, **D-362** and **D-255**/**D-256**/**D-258** (the local start and the checks of an agent): no sentence of any of them disagrees with the scripts or the skill. The numbers of the flash measure in the scripts (341 × 256, 21,824, scaled by `--scale` and its square) are those of D-317.
- The steps of the skill's "new pack" list against the foundation: `sprite-credits` (its *Rests on* names the licence facts and it asks a credit line for a pack whose licence asks one), `PACK_CREDITS` in `src/browser/view/credits.ts`, the facts `lpc-wolf-licence` and `smoke-fire-particle-licence`, and the "External context" table of `foundations/part_map.md` (`them → us`, `untrusted`) all exist as the skill says.
- **Part map.** `agent-workflow` owns `.claude/**`, `.agents/**`, `AGENTS.md` and `tests/agent_workflow/**`, which hold every file this change adds; `foundation_check.py` reports no file claimed by no part. `browser-view`, the scope of D-415, gained no file. No change of the map.
- **The search of the foundation** for the colour of an effect, the flash measure and the way an agent checks scene pictures (words: stands out, covers, flash, frames, measure, prop, loop2-play, scale) found no other entry on these questions beside those above.

**Decisions written:** D-415, in the foundation step, mark `row 1` (one sentence in each language is in `reports/author-report.md`). None written here. **Invariants:** none. **Environment facts:** none (see below). **Glossary terms:** none; the words the entry and the skill use ("effect", "prop", "ground", "request") are used in their ordinary sense and no word needed an entry. **Part-map changes:** none. **Projected entries:** none (the task is `independent` and carries none).

**Place the row of *Settlements to record* went to:** row 1 → the decision log, `foundations/decisions.md`, D-415 in the section "Scene". The skill holds the agent's procedure for the same matter, as instructions of an agent, and cites D-415.

**Environment fact for the Playwright screencast's scale (judged, not written).** `SKILL.md` says a frame of `loop2-play` is scaled down to fit 800 px; the source is the code of Playwright's screencast, a tool the process uses. By `elements/environment-facts/` a fact is written for what a decision's *Based on* or an invariant's *Rests on* needs, and nothing rests on this figure: no decision or invariant names it, and the script does not depend on it (the reader gives `--scale` from the page's own numbers). The file already holds `playwright-screencast-frames` among its withdrawn identifiers with the reason "no decision is based on it and no invariant rests on it", which is the same case. No entry.

**The reviewer's note O1** (the styleguide's rule "The scene of a map run" lists no D-415): judged by the rule of the step. The rule's *Decision* line lists the decisions its sentences rest on; the rule speaks of the dust against the ground and never against a prop, so nothing in it is a matter D-415 governs, and it still matches the code and the foundation. Left as it is; a change of the styleguide would go through `the-way-maintain-styleguide`, and none is needed.

**The reviewer's Minor note of the fix review** (the skill points to a full-size PNG screenshot and does not say how to take one): not fixed here, as the handoff says; the text contradicts no entry of the foundation. It goes to the request's list.

## Check

- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors` (run because the step committed nothing; the tree is unchanged since `af282831`).
- Nothing else was run; the full `npm test` is the orchestrator's.

## Unread material

none. (Read in this step: `return_step.md`, `foundation_step.md`, `elements/environment-facts/skill/SKILL.md` and `decide_entry.md`, the head of its `template.md`, D-396's first lines, the entries and files named above by the search.)

## Searches not found or unclear

none.

## Working copies

`.runs/author/` held one throwaway script (the colours of `dust.png` and `sticks.png`): removed. Nothing else was made.
