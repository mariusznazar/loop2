PASS 650e6df02df35a5d9cd261c5a51bb530f683fd49

# Review 3 — the return step's commit `650e6df0` (range `a3125aaa..650e6df0`)

Blocking findings: 0. Minor: 2. Out of scope: 0.

## What was reviewed

`git rev-parse HEAD` = `650e6df02df35a5d9cd261c5a51bb530f683fd49` (the head given). `git log a3125aaa..650e6df0`: one commit, `650e6df0`. `git diff --stat`: `foundations/decisions.md` and `guidelines/styleguide-browser-view.md`, 6 insertions, 5 deletions; no file under `assets/sprites/**`, no code, no test, no screenshot. Submodule pin: `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both `55afa8e57aa1b83c77108576a36642722e0dda15`.

The commit changes four statements:

1. D-316 sentence: "which in the player's pause begins at „Wznów”" -> "which in the player's pause and at a discovery, where time stands still (D-322), begins where the scene goes on".
2. D-316 *Verification* complies example: "the same loss in the player's pause showing nothing until „Wznów”" -> "in the player's pause or at a discovery showing nothing until the scene goes on".
3. D-372: "at the first one or two pixels of thickness it is the outline alone" -> "at the first pixel of thickness it is the outline alone, the fill coming with the next pixels".
4. Styleguide, "The scene of a map run": "przy pierwszym albo drugim pikselu grubości" -> "przy pierwszym pikselu grubości" (same statement as 3).

## Claim 1 — the tint's 2 s return also waits at a discovery: true

- `src/browser/view/scene-picture.ts` `tintShown`: `if (standing === "paused" || standing === "discovery") return before;`. Both stops keep the tint shown and start no return (`from` stays null, `serial` unchanged); the return starts at the first reading with standing `going` whose target is below the shown tint. `standingOf` gives `discovery` for `state.discovery !== null` (death and completion rank above it, so those stand at once, as the entry says).
- Test `tests/view/scene-picture.test.mjs:945` ("while time stands, in the player's pause and at a discovery, the tint shown is kept, and the return starts where the scene goes on") loops over `paused` and `discovery` for the hold; `tests/view/scene.test.mjs:1523` does the same through the DOM for both stops.
- Honouring the settlement. Task row 3 and *Settlements to record* row 3 name the pause only. The extension is not a contradiction of it: the pause behaviour is unchanged (the return begins at „Wznów"), and task To do item 6 says "Przy każdym zatrzymaniu — pauzie, odkryciu, śmierci i rozwiązaniu — ruch sceny stoi (D-322)", D-322 says the motion at a discovery stands still, and a return running at a discovery would be motion. So the entry follows the settlement for the case it names and row 6 for the case it does not; it is truthful to the code. The commit message and the return report say it is an extension and why.

## Claim 2 — the frost is the outline alone at its first pixel, not at the first two: true

Read from `src/browser/styles.css:2054-2150` and `frostOf`. The rim (outline colour) has `--depth: var(--frost)` and the body (fill colour) `--depth: calc(var(--frost) - 1)`; each mask has a band of `depth-2` rows, teeth A of `depth-1` rows and teeth B of `depth` rows (all clamped to 0).

- Frost 1 px: rim — band 0, teeth A 0, teeth B 1 row (on 2 of 7 columns). Body — depth 0, so band, teeth A and teeth B all 0: no fill anywhere. Outline alone: the new text is right.
- Frost 2 px: rim — teeth A 1 row, teeth B 2 rows. Body — depth 1: teeth B 1 row, so on the B-teeth columns the outermost row is already fill over the outline. Fill is present, so "the first one or two pixels" was wrong at 2 px; the correction is right.
- Thickness 1 px is reached from `Math.round(cold * 16)` with `cold = (37 - T) / 2`, i.e. just after the body leaves 37 °C, as the styleguide sentence says ("tuż po tym, jak ciało odejdzie od 37 °C").

The styleguide sentence and D-372 now say the same thing and both agree with the code. Nothing else in the repository (`foundations`, `guidelines`, `src`, `tests`) still carries "one or two" / "pierwszym albo drugim" for the frost (`grep`).

## Findings

### Minor

**M1. D-316 *Rationale* and *Rejected* still name the pause alone** — `foundations/decisions.md`, D-316: *Rationale* "and in the pause the return waits for „Wznów” so that the loss is seen going"; *Rejected* "tint at once cool at „Wznów” after a loss in the pause — the loss passes without a picture". The decision text and *Verification* now say "in the player's pause and at a discovery"; these two sentences were not brought along. They stay true (they are the pause case) but a reader of the *Rationale* does not learn that the same reason holds at a discovery. Why it matters: the entry's parts say different scopes for one behaviour (WAY-263 is about restating differently); here it is narrower, not contradictory, so Minor. Evidence: the two sentences above against the changed sentence. Not blocking; the request's list can carry it, or one more word-edit.

**M2. The decision text no longer names „Wznów”, and the resume after a discovery has no test of its own** — (a) the sentence "begins where the scene goes on" is correct but less concrete than „Wznów” for the pause, which the settlement and the player see; the *Rationale* still names it. (b) `tests/view/scene-picture.test.mjs:945` proves the hold at both stops, but its resume chain (`tintShown(tintShown(held, 0, "paused", false), 0, "going", false)`) goes through `paused` only; the discovery resume rests on the same `||` branch. Polish, no behaviour at risk.

## Declined to judge

- Whether the extension to a discovery should have been put to the human before the return step wrote it — a matter for the cycle and the request description; the entry is judged here only for truth against the code and the task.
- N2 of review 2 (a first-person test comment) — the return step left it for the request's list on the handoff's terms; not in this range.
- The behaviour of a map with no streak requirement (tint 0 before a completion) — excluded by the task (*Out of scope*, question 4).

## Checks run

- `git rev-parse HEAD` -> `650e6df0…`, exit 0 (equals the given head).
- `git diff a3125aaad786274c9c729ea32da940dc3387621a 650e6df02df35a5d9cd261c5a51bb530f683fd49` and `git diff --stat`, `git log --oneline a3125aaa..650e6df0`, exit 0: 1 commit, 2 files, 6+/5-, none in `assets/sprites/**`.
- `git ls-files --stage -- .the-way` / `git -C .the-way rev-parse HEAD`, exit 0: the same commit `55afa8e5…`.
- `python -B .the-way/elements/common/foundation_check.py`, exit 0, "0 errors".
- Manual: read `tintShown`, `standingOf`, `tintOf`, `frostOf` in `src/browser/view/scene-picture.ts`; the frost rules in `src/browser/styles.css:2037-2182`; computed the rim and body mask heights at frost 1 and 2 by hand (above); read the tests at `scene-picture.test.mjs:945` and `scene.test.mjs:1523`.
- `grep` for the old wording ("first one or two", "pierwszym albo drugim") across the repository: no remaining hit outside `.runs`.
- Not run: the full `npm test` (the cycle's own gate, per the handoff) and the focused tests (no code or test changed in the range; the earlier reviews passed them at `a3125aaa`). Their result is therefore taken from review 2, not re-verified here.

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/return_step.md` (head only, the rules for what the return step corrects) and `.the-way/task-cycle/review/SKILL.md` — to know the method and the return-step rules the handoff names.
- `foundations/decisions.md` D-316 and D-372 whole (the entries the handoff names) and, by search for "pause"/"tint"/"frost", the *Rationale*/*Rejected* lines of D-316; why: to see whether the corrected sentence is the only place that names the pause.
- `guidelines/styleguide-browser-view.md` the scene section, read around the changed sentence (lines ~635-690), and a search for "discovery"/"pause"/"Wznów"; why: to see that the styleguide agrees with D-372 and D-316 after the change.
- `src/browser/styles.css:2037-2182` and `tests/view/scene*.test.mjs` by search; why: the two claims.

## Unread material

- Of the dispatch: none unread. The return report, the handoff and the task were read whole.
- Not opened: `reports/review-1-report.md`, `reports/review-2-report.md` (the handoff gives their verdicts; I did not need their text), `return-handoff.md`, `foundations/invariants.md`, the glossary and the part map (no invariant, term or part changed in this range). D-322, D-317, D-315 were taken from the task's quoted text, not opened in `decisions.md`.
- The rest of `styles.css` and of the scene tests was not read; only the rules and tests that bear on the two claims.

## Searches not found or unclear

- None. (The earlier statement about where the badge stands in the DOM is not in this range.)
