done

# Return step 4 — the correction after the human's remarks, task `wyposazenie-postaci`

Worktree `the task's worktree`, branch `task/wyposazenie-postaci`, started at head `18ad4c8e66ebd24c9f4c2ce7d20c3f993d24c3f6`. Range compared: `215cc5065f5bb5ed4e0d46e2ad01773bf1ff9c72..18ad4c8e66ebd24c9f4c2ce7d20c3f993d24c3f6` (two commits, 11 files).

## Commits

- `0b98d8e5` — `foundations/decisions.md`, D-340 only: *Rationale* and *Rejected* wording (+5/-3 lines).

## Checks

Both after the edit, before the commit; each output was written to `.runs/return-step-4/` and read.

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 121 info` |

Not run: the product's gate (`npm test`), by the handoff; no code or test changed in this step, so no focused test was run.

## What I compared and found

I read the diff of the range whole for the foundation, the styleguide and the code, the correction's report, the walk's report, the review's report and the human's remarks, and D-340, D-147, D-343, D-344, D-456, D-457, D-458, D-459, D-460, D-461, D-462, D-463 whole.

- **D-340** (the entry as written, with the new paragraph): the binding paragraph agrees with the code (`src/browser/view/chronicle-entries.ts:411-420`: a `combatExchange` whose `characterAction?.refill` is set gives `{ kind: "action", minute: event.minute, text: „Bierze patyk z plecaka do ręki”, role: "text" }`; the minute is that of the resolution, `src/browser/sim/run.ts:773-778`, so after the paragraph, which stands at the attack minute; no actor). Its *Relations* `derives from D-457` and its *Verification* clause are held by the three tests that carry `decision: D-340 "The refill of an empty slot of the gear (D-457) gives one entry of its own"` (`tests/view/chronicle.test.mjs` two, `tests/view/gear-words.test.mjs` one); the foundation check finds the quoted line in the entry. The entry carries no pair of examples, so nothing is to be removed from one. Left as it is: the binding text and the *Verification*.
  - **Corrected (the concern on „Załóż” in a fight):** the *Rationale* said the refill's own line is as the start of „Załóż” is, and the *Rejected* said the start of „Załóż” has a line. Both hold outside an encounter only: inside one, a „Załóż” turn is a `combatExchange` with `action.kind === "equip"`, and `eventEntry` gives it no entry, so it stands in the paragraph alone (`Mag zakłada patyk`, `src/browser/view/combat-line.ts:57`). The walk and the review confirm it. I wrote „outside an encounter” into both places and added to *Accepted with it* that a „Załóż” turn inside an encounter has no entry of its own, as no turn of an encounter has but the refill. The binding sentences did not change.
- **D-147**: only the *Verification* wording changed ("an exchange" → "an exchange of blows"); the binding text never said the chronicle gets no other entry from an exchange; its *Rejected* (an entry for each exchange of blows, as in loop) is not contradicted, since the refill is no blow. It matches the code. Left.
- **D-343, D-344** (filters and kinds): the line has the kind „Czynności” and the role `text`; „Wszystko” and „Czynności” show it, „Walka” shows the paragraph alone, as D-343 says (`chronicle.ts`), and D-344's „Świat” is untouched. Match. Left.
- **D-457, D-458** (the refill and „Załóż”): they say when and how the pieces move, not how the chronicle writes it; D-340 now holds that. Match. Left.
- **D-461, D-462** (the tile and the pick): they say nothing of the tile's name for a reader or of the heading's words; the numbering of the pockets in both contradicts none of them (D-456 names the three pockets of the place „Kieszeń”; D-459's ban on a number of a pocket is about the program's naming, not the heading). Left.
- **The numbered pockets in the heading** (the concern): the heading read „Kieszeń: …” before the correction and a test held it on purpose; no decision, invariant or guideline said so (`git grep` over `foundations`, `guidelines`, `src`, `tests` for „Kieszeń:”, „Kieszeń [0-9]” and „{miejsce}” found only the styleguide sentences now written, the code, the tests and D-459's unrelated condition). The styleguide's sentences (`guidelines/styleguide-browser-view.md:1121,1162-1165,1177-1179`) say what the code does: the filled tile read „{miejsce}: {rzecz}”, the heading as the tile's name, the pockets numbered in both, and a *Bad* item for a tile read by the item alone. I judged that the foundation should not say it besides: the wording of a heading is a look of a screen, which the styleguide holds, and nothing binds after the merge that a decision would have to carry. No entry written.
- **Glossary** (`gear`, `chronicle`) and the **part map** (`browser-view` lists `src/browser/view/**`, `src/browser/kitchen-sink/**`, `tests/view/**`; `src/browser/sim/data/gear.ts` belongs to its own part, which the foundation check passes): the correction adds no term and no file outside the claims. Match. Left.
- **The `decision:` lines of the changed tests** (`tests/view/character-gear.test.mjs`, `tests/view/character-gear-pick.test.mjs`): they quote D-454, D-462, D-287 and D-461 and were not changed by the correction; the cases whose strings changed (the tile's name, the heading) hold no sentence of a decision and carry none. No line to add, none made false.
- **The search by the words the code adds** (`slotName`, `slotLine`, „nic”, `refill` with „Bierze”): nothing else in the foundation or the guidelines to change.

### For each entry written or changed

- **D-340** — mark: `the cycle's` (from a human's remark; no row of *Settlements to record* carries it whole; the first writer already marked it so, and my edit changes only its reasoning).
  - English: "The refill of an empty slot of the gear gives one chronicle entry of its own, with no actor, at the minute the turns of the encounter resolve; a „Załóż” turn inside an encounter gives none and stands in the paragraph alone."
  - Polski: „Uzupełnienie pustego miejsca wyposażenia ma w kronice własny wpis, bez aktora, w minucie, w której rozstrzygają się tury starcia; tura „Załóż” w starciu własnego wpisu nie ma i stoi samym akapitem.”
  - The added part the description quotes under the entry, word for word: "Accepted with it: the refill stands twice in the chronicle, in its own entry and in the paragraph of its encounter; a „Załóż” turn inside an encounter has no entry of its own, as no turn of an encounter has but the refill, and stands in the paragraph alone." No pair of examples.
- **D-147** — unchanged by this step (the earlier writer's *Verification* wording stays; mark `the cycle's`, as its report gave).

## Left to the author's fix or the human

- The two Minor findings of the review (`src/browser/view/controls/react-button.tsx:163-164`, `tests/view/shared-controls.test.mjs:965-972`) are comments and a test's words, not the foundation; a review finding is no foundation entry, so I did not touch them.
- Whether an in-fight „Załóż” should get a line of its own is a question for the human, outside the remarks. The cost of leaving it as now written: a careful player may see that two turns that both put a stick in the hand differ, one in the chronicle among the actions and one only in the paragraph; D-340 now says so plainly instead of implying otherwise.

## Reaches beyond the handoff

None beyond the files and entries the handoff names, apart from D-456, D-459, D-460 and D-463 read whole, `foundations/glossary.md` (the `chronicle` and `gear` terms), the `browser-view` part of `foundations/part_map.md`, `src/browser/sim/run.ts:740-800` and `src/browser/view/chronicle-entries.ts:345-425`, to check the claims above.

## Unread material

- `.the-way/elements/decisions/skill/SKILL.md` and the files it reads: not read in this step. My edit changes two phrases and one *Accepted with it* clause inside an existing entry, with no new field, relation or sentence of the entry's binding text; the foundation check passes.
- `guidelines/styleguide-browser-view.md`: read the range's diff and the rule "The screen Postać" around the changed lines (the review read it whole); the rest unread.
- `reports/correction-1a-probe.mjs` and the scripts of `reports/correction-1b-walk/`: not read.

## Searches not found or unclear

none (the one open point, the in-fight „Załóż” line, is a question outside the remarks, named above, not a search).

## Own-work check

The requirement most likely not met: no entry or guideline sentence of the range's reach says what the code does not. Check: for each of D-340, D-147, D-343, D-344, D-457, D-458, D-461, D-462 and the styleguide sentences I read the sentence against the code it names (`chronicle-entries.ts`, `character-gear.tsx` `slotName`/`slotLine`/`faceOf`, `run.ts` `finishMinute`) and ran the foundation check after the edit: it passed. The one sentence that went beyond the code was the *Rationale* comparison with „Załóż”; it is corrected.

## Working copies

`.runs/return-step-4/` in the worktree (the outputs of the two checks only): removed by its full path `.runs/return-step-4`. No worktree, clone or probe was made.
