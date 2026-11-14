# Fix report — findings-1 (review FAIL 3767fd3d)

**Status:** done.

**Commit:** `dd0e6cb6` (`docs: :card_file_box:`), on `task/zmiany-decyzji-gry-z-przegladu`, after the reviewed head `3767fd3d`. Files: `foundations/decisions.md` (+5 / −5), `guidelines/coding-saved-game.md` (+1 / −1). Nothing pushed.

## Checks

| Command | Exit code |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| `git diff --check` | 0 |

Not run: `npm test` (the orchestrator's). No test written or changed.

## Findings

### Blocking 1 — D-393 against D-280, D-389 (and D-288, D-349): fixed

How, in the answer of the fix handoff:

- D-393's binding sentences now hold a third sentence: "A decision that defines how the game looks in a narrower or a lower window — D-280, D-282, D-311 and D-389 — keeps its meaning there; a fault of the look in a window below the smallest, where no decision defines it, is not fixed." The consequence left *Rationale* (the clause "a window below the smallest … is no fault to fix" is deleted from *Accepted with it*) and *Verification*; *Rationale* gained one clause saying that the decisions that already define the look bind what the game does there.
- **Which decisions I named, after reading each whole:**
  - D-280 — binding sentence "at most 1344 px, and the full width of a narrower window"; its *Verification* names a window 1000 px wide. Named.
  - D-282 — "a narrower layout can place one above the other in that order" (read whole earlier in this task). Named.
  - D-311 — the narrow layout of the screen of a map run, one column under 1074 px, and its *Accepted with it* clause written in this task. Named.
  - D-389 — "a window narrower than the picture crops it at the sides"; *Verification* names a window 400 px wide. Named.
  - **Not named, read whole:** D-288 (its binding sentence says the rule panel opens in place on both screens; the narrow window appears only in *Rationale* and *Rejected*, so no binding sentence defines a narrow window); D-349 (binding: one scene size, no second scale; *Verification* names windows 1280 and 1920 px, nothing below; leaving a look unfixed adds no second scale, so nothing collides); D-310 (the reasons of a rule that cannot start; no window); D-368 (the end-of-run window; "low window" and "narrower than 1074 px" only in *Rejected*); D-370 (the end-of-run window is as wide as the content column of D-280 and as tall as its content up to a part of the browser window's height; it follows D-280, so D-280 carries the narrow case). If the reviewer holds that D-370 defines a window behaviour, one name is added to the sentence.
- **Relations:** left `none`. The template gives two kinds, `derives from` and `narrows`; D-393 goes against no binding sentence of D-280, D-282, D-311 or D-389 (it leaves their meaning in place), so nothing is narrowed, and the precedence is in the binding sentence. Rejected: `narrows` on the four — it would say D-393 goes against them, and the orchestrator's answer says the opposite. Cost if wrong: one relation line.
- **D-280's and D-389's *Verification*:** unchanged. D-393's text holds the precedence alone, because its third sentence names both decisions and says they keep their meaning below the smallest window. D-311's *Accepted with it* clause and D-282 stay consistent (D-311's clause says the narrow layout is an accepted cost below D-393's smallest window; D-282 orders that layout).
- **Check that shows it:** `foundation_check.py` exit 0; the read of the diff `git diff HEAD~1 HEAD` shows the sentence in the binding part and nothing of D-280, D-389, D-282 or D-311 touched.

### Minor 1 — guideline's second paragraph: fixed

`guidelines/coding-saved-game.md`, second paragraph after the rule: "Zmiana którejś z tych rzeczy nie podnosi wersji sama (poza dodaniem albo usunięciem zwykłej czynności, które ją podnosi), ale …". One clause, through the guideline's own form. Check: `foundation_check.py` exit 0; `git diff --check` exit 0. The guideline's first paragraph and Good/Bad fields are as before.

### Minor 2 — D-120 *Rationale*: fixed

"One verb, „Wytwórz”, makes both a campfire and an archetype's goods" → "One verb, „Wytwórz”, makes a campfire and, in later data, an archetype's goods". The data hold one target of „Wytwórz” today (`craftCampfire`, "Wytwórz — ognisko"), as the finding says. Check: `foundation_check.py` exit 0.

### Minor 3 — D-393 *Verification*: fixed together with finding 1

Each side is a change now.
- complies: "a check of a change in Chromium at a page area of 1280 × 720 px; a change that keeps the content of Siedziba as wide as a window 1000 px wide, as D-280 gives it".
- violates: "a change that is known to break in Firefox at a page area of 1280 × 720 px and is left so; a check of a change at a screen resolution of 1280 × 720 px, which leaves a page area of about 1280 × 600; a change made only to fix a look in a window below the smallest where no decision defines it; a change that drops the 1000 px width of D-280 as outside the set". The remark "set aside" is gone from `complies`; the previous "a window … counted as the resolution of the screen" is now "a check of a change at a screen resolution …", which is a change.

## Unread material

- The review's own report `reports/review-whole-report.md` (the findings file quotes it; I did not open it).
- D-288, D-349, D-310, D-368, D-370, D-280, D-389, D-393: each read whole (by its range of lines). D-282 and D-311 were read whole earlier in this task (for the first change) and not opened again for the fix; their text is untouched.
- Everything else that the first handoff left unread stays as `author-report.md` lists it.

## Searches not found or unclear

- None unclear. One judgment is open to the reviewer: D-370 is not named (see above).
- A search for other decisions whose binding sentence defines a narrower or a lower window was not repeated beyond the nine the handoff and the finding name; the reviewer's own search is the other source.

## Choices (way rejected, cost if wrong)

- Third sentence in the binding part, with the named list. Rejected: a `narrows` relation (above); a generic sentence without names ("decisions that define the behaviour of a narrower window keep their meaning") — an agent has to find them, and the finding's point is that agents disagree. Cost if wrong: one more name or a shorter sentence.
- The clause in *Rationale* is kept short and explains the third sentence; it states no new rule.
- The "1000 px wide" example moved from the remark to a change that keeps D-280's width, as the handoff gives it.
