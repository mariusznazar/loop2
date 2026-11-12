PASS f20b21b76162f30209b38fdfde81ead25a1dec6d

# Review 3 — the return step's commits, task wilk-wbiega

Range `66b814d1..f20b21b7` (one commit, `foundations/decisions.md`, +15 -7). `git rev-parse HEAD` in the worktree is `f20b21b7`. Trust boundary: the range touches no file of `assets/sprites/**` (the only changed file is `foundations/decisions.md`); that stays true.

## Findings

Blocking: none.

### Minor

1. `foundations/decisions.md:7711-7713` (D-316 *Rationale*). "At 16x the combat is decided 312 ms after the attack, so a death can come within the 300 ms of the run" does not follow as written: 312 ms is more than 300 ms. The claim itself is true of the code (the view reads the game every 200 ms, so the reading that decides the combat can come 200 ms after the reading that carries the attack, and a completion can come in any earlier combat minute; the test `tests/view/scene.test.mjs` "a death or a completion in the 300 ms of the run in ..." builds exactly that). The sentence omits the 200 ms reading, which is the real cause. Why it matters: a later reader may take the sentence as false and drop the guard `(drawing.standing === "going" || "paused")` at `src/browser/view/scene.tsx:835`. Evidence: D-317 *Rationale* line 7800 gives the 200 ms reading elsewhere. Suggested fix: name the 200 ms reading in the sentence.
2. `foundations/decisions.md:7801-7803` (D-317 *Rationale*). The inserted sentence ("Effects of different parts of the scene ... play together ...") sits between the run-of-the-wolf sentence and "One whose turn has passed would show something ...". "One" had a weak antecedent before and now reads as "one reading". Read after the inserted sentence it is ambiguous; moving the inserted sentence after the overdue-effect passage, or writing "An effect whose turn has passed", would fix it. No sentence was lost: the only deleted text in the range is the replaced ";" and "the" of the old wording.
3. `foundations/decisions.md:7772` and `:7713` hold unwrapped lines of 130+ and 170 characters in blocks wrapped at about 100 characters (the old text of the same entries already has some such lines, e.g. 7642, 7799). Cosmetic only; `foundation_check.py` passes; Markdown is not in the prettier patterns of `tests/quality/test_quality_invariants.py:17-20` (the return report's "prettier covers the Markdown" is not accurate, harmless).
4. D-317 *Rationale* states that effects of different parts of the scene play together; the binding sentence of D-317 does not, and its *Verification* *violates* list has no counterpart to the failure the fix cured (an attack whose run in is lost because the same reading ends a gathering). The rule is carried by D-367's binding sentence and by D-317's *complies* line, so it binds; this only follows the template's remark that what binds later work stands in a binding sentence or a field (WAY-05) less strictly than it could.
5. Before the range, not caused by it (written by `ab8c1606`): D-316 *Rejected* has "as in loop, with no run in" and "does not meet the scope of the project, which says the wolf runs in" (`foundations/decisions.md:7738-7739`). "loop" names the predecessor game throughout the file (D-271, D-322 and others, no path or link, no pointer to its private repository); "the scope of the project" points to a project document the foundation does not hold. Out of scope of the range; offered as an item for the foundation step.

### Out of scope / Declined to judge

- The code and the tests (unchanged in this range; read only to check the sentences). The N-1 note of the return report (the `paused` half of the guard has no test) was not judged.
- The earlier foundation commits (`ab8c1606`, `66b814d1`) beyond what the nine entries repeat of them.

## The questions of the handoff

1. Each corrected sentence is true of the code at `f20b21b7`:
   - D-367 (line 9115): two slots, `effects` and `creatureEffects`, `src/browser/view/scene.tsx:561-566`; `effect` replaced only by a new gathering effect (`:631-635`), `creatureFx` only by a new creature effect (`:638-649`); the creature effects end on their own serial (`:736-742`). The wolf's effects neither take nor are taken. True.
   - D-317 (reading with a gathering end and an attack): `sceneEffect` and `creatureEffect` (`src/browser/view/scene-picture.ts:619`, `:695`) both run in the same reading and neither is gated by the other's event (`attacked` is not read by `sceneEffect`; the gathering's `activityFinished` is not read by `creatureEffect`). D-71 (ending action takes effect, then the attack is tried) makes the reading possible. The test of `03f77d63` covers a hit and a miss. True.
   - D-316 (death or completion within the run leaves the wolf standing beside the mage): `entering` is passed only while `drawing.standing` is "going" or "paused" (`scene.tsx:832-836`); after a death or a completion `creatureOf` (`scene-picture.ts:215-236`) returns the creature not scuffling where the death was in combat or the completion left the combat without result, and the `Creature` element stands at its place. True for a death in the combat and for a completion in the combat. The side rule ("on the side where its frame lies inside the picture, at every place but the right edge the right") matches `creaturePlace` (`scene-picture.ts:267-287`) and `SCENE_FIGHT` (`src/browser/sim/data/scene.ts:107-111` doc): the places 32, 42, 80, 144, 224 give "right" (224+45+2+64 = 335 <= 336), 275 gives "left". True.
   - The 312 ms and 625 ms figures: five game minutes at 1/16 and 1/8 s a minute. True (see Minor 1 for the sentence's logic).
2. No contradiction found with D-322 (the stop at the first attack, no run in, motion stands still), D-311, D-319, D-366, D-148, D-271 and D-322's *Rejected*; D-322 says nothing of a run in paused by the player and D-316/D-317 do not claim it. D-366 and D-367 agree on the dust of a miss and the end of a gathering. Lost sentences: the diff holds no deleted text beyond the replaced fragments.
3. Form: the changed text has no origin, task name, question number, pointer to a note or to the predecessor's repository; *Origin: none* stands in each entry; *Rationale* names no file or count; the two numbers (300 ms, 312 ms) are measurements stated with their conditions. (See Minors 1-5 for the points of form.)
4. Rows of *Settlements to record*: row 1 in D-271 (binding sentence, *Based on* `lpc-wolf-licence`, *Rationale* five licences, *Rejected* CC BY 4.0, OGA-BY 3.0, the GPLs, other packs); rows 2, 5, 6 in D-316 (run in from the right edge, side and turn of the mage; scuffle in the bite and idle frames with a dust cloud, no flash; defeated falls and is gone, departs runs off to the right edge, stays beside the dead mage, stays where it stands when the map is solved in the combat); rows 3, 4 in D-317 (what an effect is and is not, all clauses of the reduced-motion rule); row 7 in D-322; row 8 in `lpc-wolf-licence` (authors, five licences, link, credit asked); row 9 in `sprite-credits` (line per pack, rests on `lpc-wolf-licence`) and D-271 *complies*. All carried. The claim that no other entry, invariant, fact, glossary term or part-map row needs a change: found no entry I read that the code contradicts.
5. `python -B .the-way/elements/common/foundation_check.py` in a clone of the head under `.runs/` (deleted afterwards), `.the-way` copied from the worktree at gitlink `55afa8e5`: exit 0, "0 errors".

## Checks

- `git rev-parse HEAD`, `git diff --stat`, `git diff 66b814d1 f20b21b7` — range read in full.
- `python -B .the-way/elements/common/foundation_check.py` (clone of `f20b21b7`, `.the-way` copied in) — exit 0, "0 errors".
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig foundations/decisions.md` — exit 1; not a check of the cycle (Markdown is outside `PRETTIER_PATTERNS`), shown only to say the report's claim is inexact.
- Not run: the tests (the range changes no code; the full suite is the cycle's).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-71 (what a game minute does in order), read to verify the attack follows the ending action in the same minute; the `main` version of D-316, to find which "loop" and "scope of the project" wordings predate the task; `foundations/environment_facts.md` and `invariants.md` entries `lpc-wolf-licence` and `sprite-credits` are on the handoff list. `tests/view/scene.test.mjs` (the two tests of `03f77d63`) and `src/browser/sim/data/scene.ts`, `scene-picture.ts`, `scene.tsx` for the code.

## Unread material

D-311 read only to the end of its layout paragraph (its first lines); D-319 read by its binding sentence and a search for wolf, creature and combat mentions, not whole. The rest of the dispatch's list (D-316, D-317, D-322, D-367, D-366, D-271, D-148, `sprite-credits`, `lpc-wolf-licence`) read whole.

## Searches not found or unclear

none
