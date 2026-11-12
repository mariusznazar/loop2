# Findings 1 — review of the whole change, head 81578d6653c3f583810685cd6f18c9372bad5068

Cut word for word from `reports/review-1-report.md`: the four blocking findings and, after them, the Minor
findings of the review of the whole change that the reviewer lists as within the task (WAY-161).
The finding marked out of scope is not fixed and is not here.

## Blocking findings

### Important 1 — the styleguide still says that all motion of the scene stands at a discovery, a death and a completion (To do 13)

- Place: `guidelines/styleguide-browser-view.md:706-707`: „Przy zatrzymaniu — pauzie, odkryciu, śmierci i
  ukończeniu — cały ruch sceny, także ogień, mag, lot ikony, kurz i powrót odcienia, stoi (D-322).”
- What is wrong: To do 13 quotes exactly this sentence as what the part says today and has to change. The
  range left it as it was and added a new paragraph right after it (lines 713-727), which says the effect
  moves („Ruszają się tylko elementy efektu”). The rule now contradicts itself. It also states D-322 as it
  stood before the change: at a death the mage falls, and at the other two moments the plaques and specks
  move.
- Why it matters: a later author or reviewer who reads the first sentence would treat any effect at a
  stop as a defect. The template's rule "A changed entry brings its rules along" (WAY-169) asks that every
  rule naming D-322 be brought in line in the same change.
- Evidence: `git diff 20bcc58d..81578d66 -- guidelines/styleguide-browser-view.md` leaves lines 706-711
  untouched. The fix is to say that at the player's pause everything stands, and at the three moments
  everything but the moment's effect stands.

### Important 2 — D-315 as written puts the specks of light under the tint, and the code puts them over it (WAY-263)

- Place: `foundations/decisions.md:7034-7039` (D-315, changed by `959a8024`): „The layer lies over everything
  the scene draws — … — but the badge over the mage's head and the plaques of a discovery, … and the frost
  …; the cold layer after a death of cold (D-322) lies over the layer of the tint, under the frost.”
- What is wrong: the specks are drawn by the scene, and D-315 does not list them among the exceptions. So the
  entry this change writes requires the tint layer to lie over them. The code does the opposite:
  `src/browser/view/scene.tsx:705-707` draws `Specks` after the tint, the stylesheet comment at
  `src/browser/styles.css:1810-1815` and the styleguide at `guidelines/styleguide-browser-view.md:641-643` and
  `:741-744` put them "nad odcieniem światła", and `tests/view/scene.test.mjs` asserts
  `layers.indexOf("scene-specks") > layers.indexOf("scene-tint")`.
- Why it matters: the code does what the entry it writes forbids. Under WAY-263 that is Important whatever
  the size of the fix. The fix is to name the specks in D-315's list, and in its Verification, next to the
  plaques. D-322's "over the full gold of the tint" does not settle the layering, since it can be read as
  "above the golden scene".
- On the handoff's question 2: the other edits of D-315 follow from what the task carries. The plaques are
  "like the badge" (question 2), which lies over the tint. The cold layer has to be told from the tint at
  streak 0 (question 3), which it cannot be under a `color`-blended tint. So I do not count those edits as a
  WAY-30 change beyond the task. They were incomplete, not out of bounds.

### Important 3 — D-271 gains a 3:1 threshold for the specks that the task does not carry, and it turns "specks of light" into dark sparks (WAY-30)

- Place: `foundations/decisions.md:5766-5767`: „… the outline or the fill of the frost and each colour of the
  specks by at least 3:1 against the snow it lies on or rises over.”; also Verification `:5784-5785` (complies
  „each 3:1 or more against the snow under the full gold”) and `:5791` (violates „a speck whose colour reads
  under 3:1 on the snow it rises over”). The styleguide repeats it (`guidelines/styleguide-browser-view.md:743-744`),
  and `tests/view/scene-frost-contrast.test.mjs` pins it.
- What is wrong: the task gives the specks the condition of question 8 alone: „dobranych tak, żeby
  odróżniały się od tła, na którym stoją” (To do 3), with no ratio. It lets this task change task 18's
  sentence in D-271 "only if it does not fit the specks" (question 13). The sentence already fitted: the
  specks are an effect, and the existing clause "the colour of an effect stands out from the ground it
  stands on" covers them. Its 3:1 was tied to the frost alone. No settlement of the task, and no answer of
  the human, sets 3:1 for the specks.
- Why it matters: under the full gold the snow (`#ddc69e`, the change's own sample) has a relative luminance
  of about 0.58. No colour lighter than that can reach 3:1 against it; a colour has to be darker than a
  luminance of about 0.16. With the new rule, specks of light can only be dark. The author's report says the
  proposed specks "read as dark sparks, not light". Question 9 reserves the colours of the specks for the
  human at the request. If he picks a light colour, the foundation the change writes forbids it, so the rule
  decides his choice in advance.
- Fix: either drop the 3:1 for the specks from D-271, its Verification, the styleguide and the test, keeping
  "stands out from the ground" from task 18's sentence, or keep it only as a question to the human at the
  request, with this consequence stated.

### Important 4 — D-322 says the mage stands still during every effect, while at a death the mage itself falls (WAY-263)

- Place: `foundations/decisions.md:7279`, the binding text of D-322: „… and nothing but the effect moves while it
  plays, the fire and the mage standing as at every stop: …”.
- What is wrong: question 12's answer, which settlement row 6 records, keeps the mage still only „przy
  odkryciu i rozwiązaniu” („ogień i mag (przy odkryciu i rozwiązaniu) stoją”). The entry drops that
  qualification, and in the same sentence the mage falls in six frames after a death. The code
  (`src/browser/styles.css`, the rules `.scene[data-moment-playing] .scene-mage-sprite .scene-mage-death img`)
  moves the mage at a death.
- Why it matters: the entry states the settlement more broadly than its source and says what the code does
  not do. Under WAY-263 that is Important. The fix is one phrase: "the fire, and at a discovery and a
  completion the mage, standing as at every stop".

## Minor findings (all within the task)

- `guidelines/styleguide-browser-view.md:798-800` (rule "The end-of-run window"): „Otwiera się samo, gdy
  przejście ręczne kończy się śmiercią postaci albo ukończeniem mapy” no longer says when the window opens:
  after the effect of the end, at once where the scene shows the last image at once. D-311 says so now. The
  rule's *Decision* line names D-311 but not D-322, and WAY-169 asks that a rule naming a changed decision
  be brought in line in the same change. Within the task (To do 7); minor, because the sentence is not
  false, only less precise.
- `foundations/decisions.md:8436` (D-371, untouched): „„Koniec przejścia” stands in the header before
  „Restart”, only while the map run has ended and the window is closed.” While the window waits for the
  effect, the game view's memory has it open (`src/browser/view/game-view.ts:349-354`,
  `endWindowOpen = true`, `effectPending = true`). Yet „Koniec przejścia” stands in the header, because the
  screen receives `windowShown()` (`src/browser/view/run-screen.tsx:151,168`), and the author's tests rely on
  pressing it during the wait (`tests/view/end-window-game.test.mjs`, „„Koniec przejścia” opens the window at
  once while it waits…”). The behaviour is sensible, but D-371 read literally forbids it. One sentence in
  D-371 about the wait would close the gap. On the handoff's question 2: D-368 rightly stays as it is
  („opens of itself” still holds, and D-370's Rationale already expects the effect before the window).
  D-317 rightly stays as well (the task: "Bez zmiany"; the moments are not effects of an ordinary event, and
  no effect flashes the whole area).
- `tests/view/end-window-game.test.mjs:394`: the changed test is still named „the window opens at the game
  minute a character's death ends the map run while the player is on its screen…”, but it now fires the end
  of the effect (`playTheEffect`) before asserting the window. The change of expectation is justified by To do 7.
  The name now misstates what the test protects.
- `foundations/decisions.md:5784-5785` (D-271, complies): „the specks of light … in colours read from pixels
  of the pack's bonfire”. The foundation's example is written from a proposal that is still pending the
  human's choice. Likewise the new violation „a cold layer whose colour no choice of the human gave”
  (`:5791`) describes the code as it stands today (`src/browser/tokens.css`, `--scene-chill` „pending
  Mariusz's choice”). Both hold only once the human chooses at the request. The request should say that the
  token comments and these examples change with his choice.
- `src/browser/view/scene.tsx:509-513` with `src/browser/view/game-view.ts:146-151,351-354`: under reduced motion the
  scene keeps `data-moment-playing` set; I saw `playing=true` at a death under reduced motion in Chromium.
  If the player switches the setting off while the moment stands, the effect plays then and the window,
  already standing, does not wait. The author names this (Choice 6). It is harmless today and recorded so
  the human sees it.
