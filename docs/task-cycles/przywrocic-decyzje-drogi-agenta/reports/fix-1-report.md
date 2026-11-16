# Fix 1 report — `przywrocic-decyzje-drogi-agenta`

**Status:** done (finding 2 fixed, finding 1 contested)

**Commit:** `77dc6b35` docs: :card_file_box: name the human who owns the repository in D-418 and D-419 ... — `foundations/decisions.md` only (+3/-3 lines), author address the repository's author address, nothing under `.runs/`.

## Finding 1 — D-417 *Rationale*, the two statements beside the marked measurement — contested

The statements: "A cropped picture of the scene costs far less than a picture of the whole screen, and a text read of the game is not cheaper than a screenshot of it."

What I looked at, and found:

- `git log --all -S"A cropped picture"` and `-S"stream of frames, measured"` (also `-i` with `cropped picture`): the text exists in three commits only, `f72e08aa` (where it first entered the entries), `1a56e519` (withdrawal) and `38e84eee` (my restoration).
- `git show f72e08aa`: the commit moved the reasoning of D-241 to D-258 out of the private notes into the entries, so the text in `f72e08aa` is already a transcription of the private note, with no conditions stated. The *Origin* of D-254 before it read as a path into the author's private notes (dropped by that commit).
- Commit messages (`git log --all --grep` for screenshot cost / token / crop) and the old entries before `1a56e519`: no report, figure, command or condition for either statement.

So the repository's history does not show whether the two statements were measurements or estimates, nor under which conditions. D-362 forbids making the private note a source, and source discipline forbids stating a measurement I cannot show. I left the text as it is, with the one provenance clause on the measurement the old text itself calls a measurement ("measured once with the library form of Playwright ..."). Contest: not fixable within the task; it goes to the request's list — only the human, who has the private note, can say whether the two statements are measurements and add the clause and conditions, or whether they stay as restored.

## Finding 2 — "owner" against the glossary entry `owner` — fixed

- How: five uses in my four entries replaced, no other word changed — D-418 *Rationale* ("the owner accepts a request" → "the human who owns the repository accepts a request"; "the owner does not go back" → "the human who owns the repository does not go back"; "to the owner alone" → "to the human who owns the repository alone"), D-418 *Rejected* ("seen only by the owner" → "seen only by the human who owns the repository"), D-419 *Verification* ("that repository's owner" → "the human who owns that repository").
- Check that shows it: `grep -i "\bowner\b"` over the four entries (D-417 to D-420, lines 1444-1555 of `foundations/decisions.md`) gives 0 hits, so D-417 and D-420 and the rest of the four entries carry no such use; `git diff -U0` shows exactly the three changed lines. The section sentence "reach the owner and the agent" (section "The server: hosting, deployment, logs and failure reports") belongs to an entry the change did not write and is untouched.
- The skill copies hold "the owner's `gh` account" (not in the fix's findings; untouched).

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 — "0 errors" |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 |

No file other than `foundations/decisions.md` changed, so no focused test was run. The gate `npm test` was not run.

## Unread material

none beyond the earlier report's list (no new reading obligation in this fix; the findings file and the handoff were read whole, and `fix.md` whole).

## Searches not found or unclear

- Whether the two statements of finding 1 were measurements, and their conditions: not found in the repository's history (searches above); the only source was the author's private note, which I did not read.

## Working copies

None made: `.runs/author-fix-1/` was not created (the fix needed no working copy).
