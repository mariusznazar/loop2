# Correction 1, part A — report

**Status:** done (one product question for the human, below)

- Base: `ac30fc1d711784ffaf7205d0eaa0988e58949d90`, branch `task/martwe-odsylacze-origin`, clean at start.
- Commit: `381cf47f` (foundations/decisions.md, guidelines/testing.md, tests/sim/acceptance.test.mjs, tests/sim/body.test.mjs, tests/sim/campfire.test.mjs; 42 added, 28 removed lines). Not pushed.
- Decisions edited through `the-way-record-decision`, doing its steps by hand with the editor tool: step 1 read (template, rules.md, way_of_working.md, the entries changed whole), step 2 search for neighbours (D-176, D-177, D-377, D-368, D-82, D-80 read), step 3 values taken from the pages and files named, step 4.3 `foundation_check.py` run. Only *Rationale* and *Rejected* lines changed, and D-317's *Based on*. No *Origin* line changed. No binding sentence changed.

## Item 1 — N-1, D-317

Source read with `curl -A 'research-agent/1.0'` from `https://www.w3.org/TR/2024/REC-WCAG22-20241212/` on 2026-11-12, no data of the owner, machine or cycle in the request.

Passages of the page (quoted from the page, whitespace joined):

- 2.3.1: "Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds."
- Glossary, "general flash and red flash thresholds", second bullet: "the combined area of flashes occurring concurrently occupies no more than a total of .006 steradians within any 10 degree visual field on the screen (25% of any 10 degree visual field on the screen) at typical viewing distance".
- Same entry, Note 1: "For general software or web content, using a 341 x 256 pixel rectangle anywhere on the displayed screen area when the content is viewed at 1024 x 768 pixels will provide a good estimate of a 10 degree visual field for standard screen sizes and viewing distances ..." (the entry's first bullet, three or fewer flashes in a second, is the other way to pass).

Arithmetic: 341 × 256 = 87,296; 25 % of it = 21,824; the scene at 672 × 304 = 204,288; 204,288 / 21,824 = 9.36, so "more than nine times". A flash of the whole scene fills any 10 degree field that lies inside it, 100 % against the allowed 25 %, so the sentence "the scene at 204,288 px is over the threshold" stays true and the binding sentence "shows no flash of its whole area" is untouched.

Old *Rationale* (head): "... the criterion 2.3.1 of WCAG 2.2 forbids more than three flashes a second unless the flash stays below the general flash threshold, which it estimates for a screen of 1024 × 768 pixels as a rectangle of 341 × 256, 87,296 pixels, and the scene at twice its picture, 672 × 304 px, has 204,288 — so no effect takes the whole area of the scene, and a player who asks the system for less motion gets less, though that setting alone does not answer the flashes."

New *Rationale* (head): "... the criterion 2.3.1 of WCAG 2.2 forbids more than three flashes a second unless the flash is below the general flash threshold, which lets the flashes occurring at once take no more than 25 % of any 10 degree visual field on the screen. The standard estimates that field for a screen of 1024 × 768 pixels as a rectangle of 341 × 256, 87,296 pixels, so a quarter of it is 21,824 pixels. The scene at twice its picture, 672 × 304 px, has 204,288, more than nine times that, and a flash of its whole area fills every 10 degree field inside it — so no effect takes the whole area of the scene. The threshold of the standard bears as well on a flash of a part of the area, which this decision does not bar by itself. A player who asks the system for less motion gets less, though that setting alone does not answer the flashes."

The sentence "The threshold of the standard bears as well on a flash of a part of the area, which this decision does not bar by itself" is mine, beyond the handoff: it is true by the passage above, and without it a reader of the "complies" example "an effect of the scene that changes a part of its area" could take any partial flash as clear. If the human rules the whole-area rule sufficient, the sentence goes.

Old *Based on*: 2.3.1 quoted only to "... any one second period" · glossary Note 1 quoted (341 x 256 estimate of the 10 degree field), labelled "§ General flash and red flash thresholds".
New *Based on*: 2.3.1 quoted in full to "... or the flash is below the general flash and red flash thresholds" · glossary entry second bullet quoted word for word (25 %, .006 steradians) · glossary entry Note 1 quoted as before; "read 2026-11-12".

**Product question for the human (not decided, rule unchanged):** is "shows no flash of its whole area" a sufficient rule? The standard's limit is 25 % of any 10 degree field (about 21,824 px by its estimate) for flashes more than three times a second, so an effect of, say, 30,000 to 200,000 px that flashes more than three times a second is allowed by D-317 and not by WCAG 2.3.1. D-317 caps ordinary effects at 300 ms (an effect can still be repeated by events), which makes such a flash unlikely but not impossible. Options: keep the rule and accept the gap (cost: the gap stands, now stated in the *Rationale*); bar any effect that flashes a quarter of a 10 degree field or more more than three times a second (cost: a rule that needs a size measure per effect and a test of repetition); bar the whole-scene flash and the repetition of any area flash (cost: simpler, stricter than the standard).

## Item 2 — Minor 1 to 7

1. **D-387 *Rationale*, nature energy:** old "The numbers of nature energy are D-377's" -> new "The numbers of nature energy are D-176's, D-177's and D-377's". Checked: D-176 holds the cap 100 and the full start, D-177 the price 10, D-377 the regain.
2. **D-388 *Rationale*, 7 °C and minutes:** old "its air of 7 °C, which chills a body in 33 game minutes against 83 on Las" -> new "its air of 7 °C, also a number of the old game's data, under which a body lasts 33 game minutes before it is chilled, against 83 on Las". Passage for the 7 °C: `ognisko_i_jedzenie_loop2.md` of the snapshot, line 141 (settlement row 2): "zadanie 8 dokłada Las — głębiej z innym zimnem (w danych loop 7 °C)". Arithmetic: 0.002 × 30 = 0.06 a minute, minute 33 at 35.02 °C, minute 34 at 34.96 °C; on Las 0.024, minute 83 at 35.008 °C, minute 84 at 34.984 °C; agrees with the *Verification* (34 and 84).
3. **D-387, D-388, D-379 *Rationale*, cost of tuning:** old "tuning them later is a change of data and tests (D-18)" -> new (D-387) "... and the numbers are expected to change. This decision forbids other numbers until it is changed, so tuning them later is a change of this decision as well as of data and tests (D-18)."; D-388 the same with "the numbers of either map"; D-379 "... a dodge takes away the whole blow of the wolf. This decision forbids other numbers until it is changed, so tuning the numbers later is a change of this decision as well as of data and tests (D-18)." Passage for "expected to change": `ognisko_i_jedzenie_loop2.md` of the snapshot, Q9 source line 49: "to są elementy na potrzeby mvp / docelowo się zmienią, więc chciałbym uniknąć sytuacji w której decyzje będą kategorycznie zabraniać alternatyw", stated there for the answers to Q7 to Q12 (the numbers of D-387 and D-388 come from Q8 and Q9). I did not add "expected to change" to D-379: I did not open a source showing the reservation covers the skills' numbers. The reservation itself asks that decisions not forbid alternatives categorically; D-387 and D-388 still do forbid them in their binding sentences and *Verification*, and the new text says so truthfully rather than hiding it. Whether to weaken the binding sentences is the human's decision.
4. **Three test comments** (comments only): `tests/sim/acceptance.test.mjs:19-23`, `tests/sim/body.test.mjs:22-25`, `tests/sim/campfire.test.mjs:22-28` now cite D-387 and D-388 (acceptance, body) or "D-388's" for the 25 °C air of Las (campfire). Prettier and eslint exit 0 on the three; `npm test -- <file>` exit 0 for body (36 pass), campfire (35 pass), acceptance (5 pass).
5. **`guidelines/testing.md`:**
   - old (`:14-15`) "D-82 jest odstępstwem tylko w sprawie komentarza, który nazywa źródło wartości; pozostałe źródła oczekiwania zostają takie, jak daje je szablon." -> new "D-82 jest odstępstwem w dwóch sprawach: komentarza, który nazywa źródło wartości, i oceny człowieka, która jest źródłem oczekiwania dopiero wtedy, gdy trzyma ją decyzja fundamentu; pozostałe źródła oczekiwania zostają takie, jak daje je szablon." Passage: D-82 binding sentence "a human's judgement is a source once a decision of the foundation holds it"; template `.the-way/product-guidelines/testing/template.md:150`: "a human's judgement" without condition.
   - old (`:100-101`) "Recenzent pyta przy każdym sprawdzeniu: „skąd ta wartość?”; odpowiedzią jest wpis fundamentu." -> new "... „skąd ta wartość?”; gdy wartość potrzebuje źródła, odpowiedzią jest wpis fundamentu, a relacja, której kod pod testem nie liczy, i awaria liczona jako niepowodzenie źródła we wpisie nie potrzebują." Passage: D-82 *Rationale* "Where a value needs a source"; the guideline's own `:86-88` admit a relation and a crash.
   - The phrase "a human's judgement is a source once a decision of the foundation holds it" is the cycle's reading, not the human's words (finding 5, third bullet): left as it is in D-82 for the human to rule; to name at the request.
6. **D-132 *Rejected*:** old "no „Teraz” after the end of a map run — while the ended map run stands on the screen, the player reads nowhere why it ended; „Teraz” staying on the last action — after a death it reads as something the mage still does, and the cause is stated nowhere;" -> new "no „Teraz” after the end of a map run — once „✕” has closed the window, the ended map run stands on the screen with nothing on it to read why it ended; „Teraz” staying on the last action — after a death it reads as something the mage still does, and once „✕” has closed the window the cause is stated nowhere on the screen;". **D-147 *Rejected*:** old "the first leaves the player nowhere to read why the map run ended while the ended map run stands on the screen, and the second" -> new "the first leaves the player, once „✕” has closed the end-of-run window, with nothing on the screen to read why the map run ended, and the second". Passage: D-368 binding sentence (title of the window is the cause; "„✕” ... close it and uncover the screen of the map run, whose header then holds „Koniec przejścia”, which opens it again"). I also fixed "the cause is stated nowhere" in D-132, which had the same overstatement (beyond the finding's wording).
7. **D-51, D-52, D-54, D-55 *Rationale*:** each gets back, as its last sentence before *Rejected*: "It is a choice for now, expected to change later, so the entry holds what is true today and stays open to a change." (D-51 as the first sentence in the base text, minus "the needs of the MVP".) Passage: `siedziba_i_druzyna_loop2.md` of the snapshot, Questions to settle 1, Answer: "to wybory na potrzeby MVP, docelowo się zmienią, a żadna decyzja nie może kategorycznie zabraniać alternatyw"; the Source quotes "docelowo się zmienią" (the reservation is stated for answers 1-8; D-51 is Q1, D-52 Q2, D-54 and D-55 come from Q4 and Q5).

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` -> exit 0 ("0 errors"), run twice (before and after the last edit).
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 0 ("checked: 444 files, 0 listed").
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- . ':(exclude).the-way'` -> exit 1, no line at all (not even D-48's allowed path).
- `npx prettier --check` and `npx eslint` on the three test files -> exit 0 and exit 0.
- `npm test -- tests/sim/body.test.mjs`, `.../campfire.test.mjs`, `.../acceptance.test.mjs` -> exit 0 each.
- Scan of the added lines for "MVP", "the definition", "the plan", "the task", "the change", "the preview", "owner": only the "Note 1" of the WCAG glossary (reworded to "Note 1 of the WCAG text").
- Not run: the product's gate (`npm test` whole), by instruction.

## Own-work check

Requirement the work most likely misses: nothing I write names a private source or tells how a decision was reached. Check: the grep above and the scan of added lines. Second most likely: that the new D-317 figures are right. Check: arithmetic re-done by hand (87,296; 21,824; 204,288; 9.36) and the quotes compared with the page text in the downloaded copy, line by line. Result: both pass.

## Not done, by design

- Minor 30 part (D-298, D-306 *Rejected*), Minor 3 and 7 of the whole-change review, and the notes outside the fix diff: not in this handoff.
- Nothing marked uncertain was put through an extra critique; that is the orchestrator's call for part B.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/skill/*`, `template.md`, `common/rules.md`, `common/way_of_working.md`: read for the record-decision steps.
- D-176, D-177, D-377, D-368, D-82, D-80 whole, to check what the entries claim.
- `.the-way/product-guidelines/testing/template.md:144-160` to check the template's wording of "a human's judgement".

## Unread material

`.the-way/task-cycle/change/SKILL.md` read whole. `guidelines/testing.md` read lines 1-371 of 463 (the part changed, lines 1-371, was read; the Recipes and later sections were not needed). `ognisko_i_jedzenie_loop2.md` and `siedziba_i_druzyna_loop2.md` of the snapshot read only in the lines quoted (grep and `sed -n`), not whole. Whole WCAG page not read, only the criterion 2.3.1 and the glossary entry (lines 1385-1399, 3025-3075 of the downloaded copy).

## Searches not found or unclear

- No source found for the cost of tuning D-379's numbers beyond the human's reservation at Q9 (which names Q7-Q12): not asserted for D-379.
- The handoff's third check says one allowed line (D-48's spec path); the grep returned none at all. Not a problem, noted.
