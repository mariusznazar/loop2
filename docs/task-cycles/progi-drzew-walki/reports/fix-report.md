# Fix report — the Minor findings of the whole-change review

## Status

`done`. All three Minor findings fixed; the carried gap (six neighbour decisions read whole) closed with one edit inside the task.

## Commit

- `52772de3` — docs: :memo: say in D-144 that the combat branches' ranks are D-379's, and tighten the wording and the rejected ways of D-379. `foundations/decisions.md` (+3 / −3). Head before: `8f8b911c`. Not pushed. Tree clean.

No code or test changed; none of the findings needed one.

## Findings

1. **D-144 *Rationale* (fixed).** The sentence "The numbers of the actions and of the ranks of their branches are those of the predecessor game, loop, taken as the requirement" now ends "…taken as the requirement, except the ranks of the two combat branches „Mocniejszy cios” and „Cięższy kop”, which D-379 sets." D-144's binding sentence, bases and wolf are unchanged, as the reviewer said.
2. **D-379 *Rejected* (fixed).** The kept line is restored, narrowed: "other numbers for the other skills given by the human instead of the old loop game's data; the old game's combat numbers kept and watched …" followed by the settled combat ways, unchanged.
3. **D-379 *Rationale* wording (fixed).** "are no longer the old loop game's" → "are not the old loop game's". The rest of the sentence is unchanged.

## Carried gap: the six neighbour decisions, read whole

- D-143 (first wolf attack): no thresholds, prices or rank counts. No change.
- D-144 (combat actions): its rationale claimed the branch ranks were the predecessor game's. Fixed by finding 1. Its binding sentence names no rank count.
- D-145 (weapon wear, dressing): no numbers of the trees. No change.
- D-146 (what ends an encounter): the 40-turn limit concerns encounters, not skill ranks or thresholds. No change.
- D-189 (what pays): practice and loot rules, no thresholds, prices or ranks of the combat trees. No change.
- D-329 (section „Kto idzie”): browser-view layout, no skill numbers. No change.

## Unread material

- `reports/review-whole-report.md`: not read by me; the findings file quotes what the fix needs (the reviewer's words).
- None of the six decisions was skimmed; all were read whole.

## Searches not found or unclear

- none

## Checks (command → exit code)

1. `python -B .the-way/elements/common/foundation_check.py` (run on its own) → exit 0, "0 errors".

Not run: no test was touched, so no `npm test -- <file>` was needed; the full `npm test` was not run, per the handoff.

## Own-work check

- Requirement the fix most likely misses: D-144's rationale still over-claims for some other rank. Checked by reading every `ranks` / `rank` mention in D-144, D-379 and D-387 against the data in `src/browser/sim/data/skills.ts`: the only rank counts that differ from the predecessor game are `strongerStrike` (4) and `heavierKick` (2), both now named. Result: consistent.
- Requirement: the restored D-379 *Rejected* line must not contradict the data. Checked: "other numbers for the other skills" matches the unchanged skills (Zbieranie, Wytwarzanie, Płomyk, Eksploracja, Jedzenie); the combat numbers are stated in the same entry's binding paragraph. Result: consistent.
- Requirement: the wording change must not alter the meaning. "are not the old loop game's" says the same as "are no longer", without the history (WAY-07). Result: consistent.
