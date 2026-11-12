# The human's remarks on the request (the correction binds them)

The human, in the session of the cycle, answering the blocked request https://github.com/mariusznazar/loop2/pull/85 (verbatim, in Polish):

> 1. poprawmy proszę
> i ogarnijmy też te drobne uwagi do poprawy zgodnie z Twoją rekomendacją a jak nie jesteś pewny to możesz przepuścić je przez dodatkową krytykę
> na koniec warto zrobić te etapy oczywiście, które jeszcze się nie wydarzyły

In plain terms: (1) fix the blocking finding N-1 of the request (item 1) as the finding says; also deal with the Minor findings left (item 3) — the orchestrator's reading: fix those that are errors of fact or wording that can be corrected from a source the cycle holds, and put the output of every fix that is not certain through an extra critique; leave to the human the three that are the human's to decide (Minor 3 and 7 of the whole-change review, and the phrase "a human's judgement counts once a decision holds it"); and at the end run the stages that did not run (item 2): the return step, the last reconciliation with the target branch, and the review of the corrected text.

Below, in the reviewer's words, the finding to fix and the Minor findings left. The reports they come from are `reports/review-fix-whole-report.md` (the review of the fix of the whole-change review) and `reports/review-whole-report.md`.

### Important (blocking, within the task)

**N-1 — D-317: the fix's rewritten *Rationale* and its new *Based on* state the WCAG flash threshold four times too large, and the passage quoted does not say what the sentence claims.**

- Place: `foundations/decisions.md`, D-317 *Rationale* and *Based on* (commit `58600416`, part 2, the fix of Minor 25).
- Text at the head: *Rationale* "the criterion 2.3.1 of WCAG 2.2 forbids more than three flashes a second unless the flash stays below the general flash threshold, which it estimates for a screen of 1024 × 768 pixels as a rectangle of 341 × 256, 87,296 pixels"; *Based on* quotes § General flash and red flash thresholds: "using a 341 x 256 pixel rectangle … will provide a good estimate of a 10 degree visual field".
- What is wrong: in WCAG 2.2 the 341 × 256 rectangle estimates the 10-degree visual field, not the threshold. The glossary entry (the same page, fetched for this review on 2026-11-12) puts the area condition at "the combined area of flashes occurring concurrently occupies no more than a total of .006 steradians within any 10 degree visual field … (25% of any 10 degree visual field on the screen)". So the allowed flashing area is about 21,824 px at 1024 × 768, not 87,296. The sentence now presents the larger figure as WCAG's own estimate, beside a quote that appears to back it.
- Why it matters: this is the foundation's statement of a seizure-safety criterion. An agent adding a scene effect reads D-317 for the limit. An effect of 22,000–87,000 px flashing more than three times a second would pass by this *Rationale* and fail WCAG 2.3.1. The binding sentence ("shows no flash of its whole area") and its conclusion (the scene at 204,288 px is over the threshold) stand either way.
- Origin of the defect: the figure comes from the source note (`rozpoznanie_frajda.md:199`, "chyba że błyska mniej niż 87 296 pikseli"). The base and `main` already had "unless less than 87,296 pixels flash". The fix rewrote that sentence, named WCAG as its source and quoted it, and the source contradicts it. So the citation the fix added does not say what the sentence claims; I grade it inside the fix diff.
- Fix: state the threshold as WCAG gives it, 25 % of any 10-degree field, about 21,824 px by the 341 × 256 estimate, and quote that passage of the glossary in *Based on*. Whether "no flash of its whole area" is a sufficient binding rule is a product question outside this task; it goes before the human at the request.

### Minor (new in the fix diff; do not block)

1. **D-387 *Rationale*:** "The numbers of nature energy are D-377's". D-377 holds only the regain (0.5 a game minute at satiety 60 or more). The cap and the full start of 100 are in D-176, and the price of 10 is in D-177, which the test comments of the same commit cite ("from D-387 and D-177"). This cites a decision that does not hold what is claimed. Fix: "D-176, D-177 and D-377's".
2. **D-388 *Rationale*:** "its air of 7 °C, which chills a body in 33 game minutes against 83 on Las". Its own *Verification* says "first chilled in game minute 34, against 84 on Las". 33 and 83 are the minutes the body lasts before the minute of chill (D-327's „bez ognia 33 min”), so "chills … in 33" reads off by one. Word it "lasts 33 game minutes before it is chilled, against 83". Also, the 7 °C is the old game's number too: `ognisko_i_jedzenie_loop2.md:141` has "Las — głębiej z innym zimnem (w danych loop 7 °C)". Part 4's "Searches not found" says no note gives it. D-388 claims nothing false there; it just leaves the source unused.
3. **D-387 and D-388 *Rationale*:** "tuning them later is a change of data and tests (D-18)". Now that the numbers stand in binding sentences, and the *Verification* lists other numbers as violations ("a campfire made from 5 sticks"), tuning is also a change of this decision. The accepted cost is understated against the human's reservation behind these numbers (`ognisko_i_jedzenie_loop2.md` Q9: "chciałbym uniknąć sytuacji w której decyzje będą kategorycznie zabraniać alternatyw"). D-379 has the same wording; the fix copied the pattern.
4. **Test comments cite D-387 alone for Las's cooling:** `tests/sim/acceptance.test.mjs:19`, `tests/sim/body.test.mjs:22` and `tests/sim/campfire.test.mjs:22-27` each say "from the numbers of D-387: on Las the body cools by 0.002 × (37 − 25)". The 25 °C of Las is D-388's. `tests/sim/world.test.mjs:14` and `body.test.mjs:436` cite both correctly.
5. **`guidelines/testing.md`:**
   - `:13-14`: "D-82 jest odstępstwem tylko w sprawie komentarza, który nazywa źródło wartości; pozostałe źródła oczekiwania zostają takie, jak daje je szablon". Not quite: D-82 also narrows the template's "a human's judgement", which a dated comment documents, to a judgement "once a decision of the foundation holds it".
   - `:99-100`: "Recenzent pyta przy każdym sprawdzeniu: „skąd ta wartość?”; odpowiedzią jest wpis fundamentu" sits beside `:87-88`, which admit a relation the code does not compute and a crash, whose answer is no entry. D-82's *Rationale* says it correctly: "Where a value needs a source".
   - The phrase "a human's judgement is a source once a decision of the foundation holds it" is the executor's reading, not the human's words. I hold it consistent with the human's answer to question 1a ("jeśli komentarz … ma przekazywać jakąś informację ważną dla kodu to powinien być w fundamencie"; "2+2=4"). It should still be named to the human at the request as the cycle's reading.
6. **D-132 *Rejected*:** "no „Teraz” after the end of a map run — while the ended map run stands on the screen, the player reads nowhere why it ended". D-147 has the same clause. D-132's own binding sentence titles the window with the completion text, so "nowhere" holds only once „✕” has closed the window. Wording like "on the screen, once the window is closed, nowhere" would be true. (Fix of Minor 8.)
7. **D-51, D-52, D-54, D-55:** the sentence "a choice for the needs of the MVP, open to a change" was dropped whole instead of reworded. The human's reservation that these choices are expected to change ("docelowo się zmienią", `siedziba_i_druzyna_loop2.md:25-26`) no longer stands anywhere in the entries. The binding sentences keep the agreed wording rule, so the loss is small. (Fix of Minor 32.)

### Minor findings of the findings file that remain

- **Minor 30, part:** D-298 *Rejected* ("the button standing beside every program — no cost was kept beside it") and D-306 *Rejected* ("greyed cells out of the keyboard's reach — no cost was kept beside it") still tell how the decision was reached. The finding names both. No part was assigned them: handoff 1 lists only D-122 and D-133 for this item, and parts 2 and 3 do not list them.
- **Minor 3 and 7:** not fixed in the foundation by design. Part 5's report holds a plain paragraph for each, for the request.

### Notes outside the fix diff (do not reopen the review; for the request's list)

- D-220 *Rejected*: "about ten points get a question of their own, and the success test of the first scope treats …". These are a process step and a project stage given as reasons.
- D-362 *Rejected*: "the human refused the split of the work into separate tasks". D-363 *Rationale*: "was put to the owner … and he took this way". D-368 *Rejected*: "perhaps a new question". Each tells how the decision was reached. Part 3 saw the first two and left them.
- D-10 *Rejected*: "breaks the approved separation", `main`'s text. It means D-08's separate address and could cite D-08.
- Part 2 reports unassigned "task" wording in D-208, D-265, D-267, D-268 and D-270. I did not open those entries.

