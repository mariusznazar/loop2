# Findings to fix — whole-change review `PASS 787acccd` (Minor findings within the task)

Cut word for word from `reports/review-whole-report.md` (section Minor). There are no blocking findings.

1. **`foundations/decisions.md:1475-1479` (D-417 *Rationale*), commit `38e84eee` — within the task.**
   The change adds to the restored text the clause "that measurement is the product's own, and its
   record is not open to a reader of the repository" after the measurement of the stream of frames.
   I checked this addition against source discipline: the pinned template requires it
   (`.the-way/elements/decisions/template.md:57-62`, WAY-90: a measurement the product's own people
   made, whose record a reader cannot open, stands in *Rationale* "with what was measured and under
   which conditions, and that prose says that the measurement is the product's own and that its
   record is not open to a reader of the repository"), and the fact behind it is true: before
   `f72e08aa` the *Origin* of D-254 was a note in the author's private notes, which that commit
   dropped, so the record is not open. The addition says nothing about the decision itself and
   stays within *To do* 1 as the template bounds it. What stays uneven: the same paragraph holds
   two further statements that read as the product's own measurements — "A cropped picture of the
   scene costs far less than a picture of the whole screen, and a text read of the game is not
   cheaper than a screenshot of it." (line 1477-1479) — with neither what was measured and under
   which conditions nor the provenance clause. Whether they are measurements or estimates cannot be
   settled from the repository (their source was the private note). Why it matters: a reader of
   the entry finds one result marked as an unopenable measurement of the product and two others,
   of the same origin, unmarked, so the entry applies the template's rule to one claim of three.
   Grade: Minor by WAY-364 (form of the template; the content agrees with what the skill and the
   code do). Possible handling: either leave the two statements as restored and keep the one clause
   (the restoration was ordered word for word), or, if the author knows they were measured, add the
   same clause with their conditions; the human decides, since only the private note shows what
   they were.

2. **`foundations/decisions.md:1522`, `:1523` (D-418 *Rationale* and *Rejected*), `:1533` (D-419
   *Verification*), commit `38e84eee` — within the task.** The restored text uses "owner" for the
   human who owns the repository and the product ("the owner accepts a request by seeing the screen
   in its description", "the owner does not go back to views of half a year ago", "would be seen
   only by the owner", "with the `gh` account of that repository's owner"). Since 2026-11-15
   (`1d833c7e`, after the withdrawal) the product's glossary holds `owner` as "an account whose role
   is `owner`, the role that lets its holder use the owner panel of the game" (`foundations/glossary.md`,
   entry `owner`), so these sentences use a glossary term in a meaning other than its entry. The
   restored wording predates the entry, and the log already used "owner" in the human's sense
   before this change (section sentence at `foundations/decisions.md:1557`, "reach the owner and the
   agent"), so the change adds uses to an existing mismatch rather than creating it. No sentence is
   one a reader would plausibly read wrongly — an account role of the game cannot accept a GitHub
   request — so it is Minor (WAY-297). A fix within the task's wording: "the human who owns the
   repository", the phrase D-419's own binding sentence and D-414 already use; this departs from
   the word-for-word restoration of *To do* 1, so it is the human's choice.
