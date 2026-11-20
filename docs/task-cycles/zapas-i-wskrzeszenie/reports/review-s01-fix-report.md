PASS f30dffb7510b02d13a5c3d64a400ec00656a2932

# Review of the fix of slice 1 — task `zapas-i-wskrzeszenie`

Fix range `3647bb19..f30dffb7` (one commit, `f30dffb7`, `foundations/decisions.md` only, +4 / -2). `git rev-parse HEAD` = `f30dffb7510b02d13a5c3d64a400ec00656a2932`, the head given. Method: `.the-way/task-cycle/review/SKILL.md` with `.the-way/task-cycle/review/fix.md`; the findings file `reports/findings-s01.md` bounds the review.

Counts: blocking 0; Minor 1 (new, in the fix diff, does not block); out of scope 0.

## Findings of the findings file

### I-1 — D-242 *Rationale* restated the return of a use without the condition of a full stock — **fixed**

- `foundations/decisions.md:8708` now reads: "Whole real moments keep a death at one place on the clock however the span is read, so the clock of the returns, when a death during an absence starts it, runs from that death's own moment, and the uses left can cover a further death the same night, …".
- The sentence speaks of the clock only when a death starts it, which agrees with D-190 ("a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs"), with `resurrection-renewal` and with To do 3 ("śmierć przy zegarze już biegnącym go nie przestawia"). Nothing else of D-242 changed; its binding sentences are as slice 1 left them (the five `decision:` lines of D-242 the check reports are the same as before the fix — quotations of D-242's third sentence, which slice 1 rewrote, in `tests/sim/catch-up.test.mjs` and `tests/view/clock.test.mjs`, changed by Slices 9 and 13).

### I-2 — Row 10 recorded only in part and in no binding sentence — **fixed**

- A second binding paragraph of D-428, `foundations/decisions.md:11691`: "The earning loop of the map check and the command of the loop start with the full number of uses of the resurrection, the switch `--no-resurrection` starts the loop with every use spent and the clock of the returns started at the start of the loop, after which the uses return as in the game, and the player of a campaign who waits for the resurrection before trying the next map tries when at least one use is left."
- Against row 10 ("Przyrząd balansu startuje pętlę i sprawdzenie mapy z pełnym zapasem użyć, przełącznik „bez wskrzeszenia” z zerem, a gracz kampanii, który czeka na wskrzeszenie, próbuje przy choć jednym użyciu.") and To do 5 ("przełącznik `--no-resurrection` startuje bez żadnego — wszystkie użycia zużyte, zegar puszczony w chwili startu pętli — a potem użycia wracają jak w grze; gracz kampanii, który przed próbą następnej mapy czeka na wskrzeszenie, próbuje, gdy zostało choć jedno użycie"): all three parts present, nothing added beyond them.
- The names it uses exist: `balance/cli.mjs` has the command `loop` (lines 55, 347, 449), its switch `no-resurrection` (lines 64, 73, 94) and the command `campaign` (lines 67, 450); the switch belongs to the loop command alone, as the paragraph says.
- Limits: one sentence of about 75 words in its own paragraph; D-428's binding sentences together about 200 words, within 300 per paragraph and 600 in all. `foundation_check.py` reports nothing for D-428. Form: a part of another question in a paragraph of its own after the first, which the decision template allows ("A part of another question that the entry answers … has its own paragraph after that one"); present tense; no *should*/*will*/RFC capitals.
- The *Verification* change of slice 1 stays; its `tests:` clause ("the earning loop started with the full number of uses of the resurrection") now names a part of a binding sentence, as the clause should.
- *Rationale* gained "The loop and the check measure the game as it is, with its full stock of uses, and the switch measures it without that protection; a player who waits for the resurrection waits only until one use is back, since one use protects one try." — prose that names no file, script or count; agrees with the paragraph. *Rejected* unchanged: row 10's source (question 12) keeps no way not chosen, so nothing is to be added (WAY-134).

## New in the fix diff

### M-1 (Minor) — The new paragraph of D-428 has no pair of examples while no test holds it yet

- Place: D-428 *Verification*, `foundations/decisions.md:11697-11699`.
- `.the-way/elements/decisions/skill/SKILL.md`, step 3: "*Verification*, where a test of a later slice of the same change will hold a sentence of this decision: carry a pair of examples for that part for now … the pair holds it until the test stands." Slice 10 is to write the tests of the switch and of the campaign player; until then nothing — no invariant, no test, no pair — holds the new paragraph. The foundation check does not report it because D-428's first paragraph is held by existing `decision:` lines. Minor (WAY-364): form of the entry; no code yet disagrees. Slice 10 should add the `decision:` lines and the `tests:` clause for the paragraph; a pair now would close the gap until then.

## Declined to judge

- The stale uses of the old meaning of `resurrection` outside slice 1 (D-386, glossary `generation number`, D-194 *Rejected*, D-241 *Rationale*, D-219 *Verification*) — the findings file gives them to the cycle's return step; not part of this fix.
- The Minor findings M-1 to M-3 of the first review — Minor, outside the findings file (fix.md: Minor findings of a slice review are not fixed).

## Checks run

- `git log --oneline 3647bb19..HEAD` → one commit `f30dffb7`; `git diff --stat 3647bb19..f30dffb7` → `foundations/decisions.md` only, 4 insertions, 2 deletions; `git diff 3647bb19..f30dffb7` read whole.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → exit 1, "86 errors" — the same 86 `decision:` lines in test files as at `3647bb19` (all in files later slices change), plus the same four "listed" invariant lines; nothing in `foundations/` is an error, nothing names D-428, and the D-242 lines are the five that stood before the fix. (The fix report says "82 `tests/...` lines"; the check prints 86 — a slip of the report's count, as in the executor's first report.)
- Search of `balance/cli.mjs` for `loop`, `campaign`, `no-resurrection`, `needResurrection` — the command and switch named by the paragraph exist.
- Not run: `npm test` (no code in the range; the handoff forbids a bare run); the check without `--skip-test-citations` and `check_instructions.py` (no instruction file changed; the test citations are later slices').

## Reach beyond the dispatch

- `balance/cli.mjs` lines 55-94, 176, 347, 449-450, by search — to confirm the command and the switch the new paragraph names.
- `.the-way/task-cycle/review/fix.md` whole — the variant of the method for a fix.
- `.the-way/elements/decisions/skill/SKILL.md` step 3 (read whole in the first review) — the rule behind M-1.

## Working copies

- `.runs/review-s01-fix/` held the output of the foundation check (`fc.txt`); removed before returning. No remainder.

## Unread material

- none of what this dispatch names: the findings file, the fix report, the fix diff, `fix.md` read whole; D-242 and D-428 read whole at the new head in the parts the diff touches and whole in the first review. The task file itself was read only through the handoff's word-for-word copy (row 10, To do 3, To do 5), as in the first review.

## Searches not found or unclear

- none
