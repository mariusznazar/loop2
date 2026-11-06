PASS 81f6f083c030b7ff84156f4a987e9cdcbe77ef55

# Review of the return step's commits — task `scena-z-ludzikiem`

Range `6ee3c4d..81f6f08`, one commit (`81f6f08`, "name the fibre and the berry action in D-318 as the game does ..."). `git rev-parse HEAD` is `81f6f083c030b7ff84156f4a987e9cdcbe77ef55`, as given. Worktree status clean.

## Findings

Blocking: none. Minor: none. Out of scope: none.

## What the commit changes

`git diff 6ee3c4d..81f6f08` touches one file, `foundations/decisions.md`, 3 lines in D-318 (3 insertions, 3 deletions, no CR bytes in the diff):

1. Binding sentence: "Where its action leads nowhere — the flax, „Zapal — patyk”, „Zjedz” and a fight" becomes "— „Zbierz” and „Obchód” with fibre as the target, „Zapal — patyk”, „Zjedz — jagoda” and a fight".
2. *violates* example: „Zjedz” becomes „Zjedz — jagoda”.

Nothing else moves: Scope, Based on, Relations, Verification complies list, Origin, Rationale and the other entries are byte-identical. The only changes are wording, and each makes a word match the data. No code, test, guideline or other entry was touched.

## D-318 against the code and the task (D-318 read whole, lines 6847-6874)

Checked each action and target against `goalOf` in `src/browser/view/scene-picture.ts`, the labels in `src/browser/sim/data/actions.ts` and the props in `src/browser/sim/data/scene.ts`:

- `gather` and `patrol` (labels „Zbierz” and „Obchód”): to `SCENE_PROPS[resource].mageAt`. `SCENE_PROPS` holds `stick`, `berry` and `moss` only, so the sticks, the berry bush and the moss match the entry. With `fiber` there is no prop, and `goalOf` returns `STAYS`. The entry's "„Zbierz” and „Obchód” with fibre as the target ... stays" is right for both actions, which the old "the flax" blurred.
- `craftCampfire`, `lightCampfire` and `feedCampfire` (labels „Wytwórz — ognisko”, „Zapal — ognisko”, „Zasil — ognisko”): to `SCENE_FIRE.mageAt`. Matches.
- `explore`, `wander`, `walkTo` and `walkToCampfire` (labels „Eksploruj”, „Wędruj”, „Idź”, „Idź — ognisko”): to `SCENE.rightEdgeX`. Matches, labels exact.
- `wait`: `SCENE.clearingX`. Matches.
- `lightItem` (label „Zapal — patyk”): `STAYS`. Matches.
- `eat`: `STAYS`. Its label is „Zjedz — jagoda” (`actions.ts:144`), which the entry now spells exactly.
- `strikeWithStick`, `kick` and `dodge`: `STAYS`, covered by "a fight". Matches.
- The fibre is the resource `fiber`, named „włókno” (`resources.ts:19`). "Flax" is only the name of its icon (`icon: "flax"`). The entry's "fibre" is the English the rest of the foundation uses (the return step cites `decisions.md` lines 2184, 2206 and 6171, which I did not re-read).
- Task row 2 (`task.frozen.md:227`) says: to the sticks, bush or moss for gathering, to the campfire for its actions, to the right edge for moving on the map, to the middle of the clearing while waiting, and "przy włóknie, „Zapal — patyk”, „Zjedz” i w walce zostaje". The task's „Zjedz” is shorthand for the one eating action. The corrected entry has the same five destinations and the same three stay cases, with the row's „Zjedz” spelled as the game's label. Meaning unchanged (the same places, the same set of stay cases). The review of the whole change graded M4 as "D-318 names the fibre 'the flax'". That is fixed.
- Other mentions of „Zjedz” in `decisions.md` that are not „Zjedz — jagoda”: a grep found none. The „Zbierz — Patyk” strings in the complies example and elsewhere are the rule-row text (action plus target) and are unchanged.

## Declined to judge

- The entry says the mage "stays where it stands", while the code keeps the place of the previous reading (the return step's M7: a walk under way finishes at its old place). The commit does not touch it, and the return step left it for the request. It is outside this commit's scope, and the sentence is unchanged, so I set it aside.
- The D-04 reading of `reachedX`, D-316 and D-322 greys (M10), and the other Minor findings the cycle keeps for the request. They are outside the range.

## Checks

- `git rev-parse HEAD`: `81f6f083c030b7ff84156f4a987e9cdcbe77ef55`.
- `git log 6ee3c4d..81f6f08 --stat` and `git diff 6ee3c4d..81f6f08`: one commit and one file, as above.
- `git status --short`: clean.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors" (run from the worktree root, without a pipe so the exit code is the script's own).
- Manual check: every action kind in `goalOf` and every label in `actions.ts` read against the entry text, as above.
- Not run: `npm test` and any other test. The commit is a wording change in `foundations/decisions.md` and the handoff did not ask for it.

## Reaches beyond the handoff

- `C:\Storage\repos\loop2-wt\scena-z-ludzikiem\src\browser\sim\data\scene.ts` lines 61-77 (`SCENE_PROPS`): to confirm that the props are stick, berry and moss only, so that fibre has none.
- `C:\Storage\repos\loop2-wt\scena-z-ludzikiem\foundations\decisions.md`, a grep for „Zjedz” without „ — ” and for „Zbierz — Patyk”: to see whether another entry names the berry action wrongly, and none does.

## Searches not found or unclear:

none
