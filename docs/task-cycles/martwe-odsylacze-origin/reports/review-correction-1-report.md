PASS a166bfeb

# Review of correction 1 (the human's remarks), range ac30fc1d..a166bfeb

- Reviewed: a correction made for the human's remarks, reviewed as a fix (`task-cycle/review/SKILL.md`, `fix.md`). Range `ac30fc1d..a166bfeb`, two commits: `381cf47f` (part A), `a166bfeb` (part B). `git rev-parse HEAD` in the worktree at start: `a166bfeb1d5b3b180462cfa91368bf01665300e7`, the head given. Everything read from commits (`git show <sha>:<path>`, `git diff`), never from the working tree.
- Files changed: `foundations/decisions.md` (36 decisions, see the section check below), `guidelines/testing.md`, `tests/sim/acceptance.test.mjs`, `tests/sim/body.test.mjs`, `tests/sim/campfire.test.mjs`.
- Result: no Critical, no Important finding. Seven Minor findings, none blocking. One note for the human on D-317 (not a defect, but it bears on his reserved product question).

## Findings

### Critical

none

### Important

none

### Minor (do not block)

**M-1 — D-363 *Rationale*: the rewording leaves an accepted cost standing against a rule it cites, with no resolution, and the citation is broader than D-311.**
- Place: `foundations/decisions.md:8941` (D-363 *Rationale*, part B).
- Text: "Accepted with it: reading a program, the player sees no prices without opening the panel, which is poorer in that row than the old loop, while the game departs from the old loop's solutions only where the result is better, never worse (D-311);"
- What is wrong: the old text carried that the question "is this a departure for the worse?" was weighed and the way was taken anyway; the source (`koszty_i_stan_ogniska_loop2.md` of the snapshot, Pytanie 1, *Source*: "ocenę, czy wiersz bez ceny to „gorzej”, zostawiono człowiekowi", answered "reszta zgodnie z rekomendacją") gives that resolution. The new sentence removes the narration as the remark asked, but joins "poorer in that row" and "never worse" with "while" and nothing else, so the entry now reads as admitting a departure that its own cited rule forbids. And D-311 states that rule of the layout of the map-run screen ("The layout takes the division of the screen and the solutions of loop and departs from them only where the result is better, never worse"), not of "the game"'s solutions in general; the rule panel also stands on Programy.
- Why it matters: an agent that weighs another departure from loop reads D-363 as a precedent that "never worse" gives way silently, or flags D-363 as contradicting D-311. The binding sentence is unaffected.
- Fix: either drop the "while …" clause (the cost "poorer in that row than the old loop" stands alone, as the source's *Przyjęty koszt* gives it), or say plainly that this decision accepts that departure against the rule. Cite D-311 only for the layout, or D-311 and D-368 together.

**M-2 — D-255 *Rejected* (and D-208 *Rationale*): a dated premise lost its date; in D-255 a past state now reads as a present fact.**
- Place: `foundations/decisions.md:5697` (D-255 *Rejected*), `:4093` (D-208 *Rationale*), part B.
- Text: D-255 "a loss accepted for the owner alone, and the owner has a save without these states" (was "the owner, who did not play when this was weighed, has a save without these states"); D-208 "measured, the headquarters with one character came to 2947 bytes …" (was "measured when this was decided, …").
- What is wrong: in D-255 the claim is now in the present tense with nothing to date it, and nothing in the repository can show what the owner's save holds today; the handoff bars "a past state written as a present fact". D-208 keeps the past tense ("came to"), so it is not false, but the measurement lost its date while later decisions (D-369's new fields and version bump) changed what a save holds. Part B's own report keeps "when this was decided" in some twenty other entries for exactly this reason ("Dropping the date makes an old state read as current"), so these two departures from its own rule are inconsistent.
- Fix: D-255 "and the owner's save, when this was weighed, held none of these states" (or drop the clause); D-208 "measured before D-369, …" or keep the original date.
- Note: D-208's "the player can currently remove no character, no part of the Understanding and no solved map" was checked and holds at `a166bfeb`: `git grep` over `src` finds no removal of a character, of the Understanding or of a solved map; the only removals are of programs, rules and groups (`src/browser/sim/programs.ts:480`, `src/browser/view/program-editor.ts:75,84,259,324`).

**M-3 — `guidelines/testing.md:14-16` now counts two departures where D-82's *Rationale* says one.**
- Place: `guidelines/testing.md:14-16` (part A); against `foundations/decisions.md:1690` (D-82 *Rationale*, unchanged).
- Text: guideline "D-82 jest odstępstwem w dwóch sprawach: komentarza, który nazywa źródło wartości, i oceny człowieka, która jest źródłem oczekiwania dopiero wtedy, gdy trzyma ją decyzja fundamentu"; D-82 "this decision departs from that one rule and keeps the template's sources of an expectation, a human's judgement entering through the foundation."
- What is wrong: the guideline sentence follows remark 5 (first bullet) and agrees with D-82's binding sentence, but the decision's own *Rationale* still says "that one rule". A reader comparing the guideline with the decision finds two counts. This sits next to the phrase the human reserved ("a human's judgement counts once a decision holds it"), so I do not judge which side should move; the disagreement itself is new in this diff.
- Fix: align the two once the human rules on the reserved phrase.

**M-4 — D-271 *Rejected* keeps the wording that part B removed from D-271's *Rationale*.**
- Place: `foundations/decisions.md:6219` (D-271 *Rejected*).
- Text: "a cloud drawn by hand from the pixels of Pixel Crawler — hand pixel work whose look is judged only at the request". Part B changed the same phrase to "judged only once it is made" in D-271 *Rationale*, D-366 and D-373.
- What is wrong: one entry now says the same thing two ways; the search of item 5 missed this occurrence.
- Fix: "judged only once it is made" here too.

**M-5 — D-316 *Rejected*: "the cover" is a word-for-word rendering of the note's "krycie"; the product calls it opacity.**
- Place: `foundations/decisions.md:7684`.
- Text: "the pair of tints from `#7d9078` to `#f2b33d` at the cover 0.50 and 0.60, from `#8a9a5b` to `#e9b03a` at 0.35 and 0.45, or from `#6a9a78` to `#f5c542` at 0.45 and 0.55".
- What is wrong: the values are exact against the note (`swit_rosnacy_z_passa_loop2.md` of the snapshot, line 61: "Para B (`#7d9078` → `#f2b33d`, krycie 0,50 → 0,60), para C (`#8a9a5b` → `#e9b03a`, 0,35 → 0,45), para D (`#6a9a78` → `#f5c542`, 0,45 → 0,55)"), and the 10 % / 35 % trace and the 1 s return are also exact, with no reason in the source ("Mariusz nie podał powodu poza zgodą z rekomendacją"). But "the cover" is not a word the foundation or the code uses: D-315 says "in its opacity", and `src/browser/tokens.css:83-84` names `--scene-tint-cool-opacity` / `--scene-tint-warm-opacity`. A reader cannot tell what "the cover 0.50" is.
- Fix: "at the opacity 0.50 of the cool layer and 0.60 of the warm one" (or "at opacities 0.50 and 0.60").

**M-6 — D-74 *Rationale*: "task" was rewritten to "change", so the rationale and the binding sentence now name different actors.**
- Place: `foundations/decisions.md:1582`.
- Text: rationale "Naming no library leaves the change that shows the need free to choose its tool and to settle the cost of upkeep"; binding sentence (untouched) "That task chooses the tool and settles its maintenance cost"; `guidelines/testing.md:58` "potrzebujące tego zadanie wybiera narzędzie i koszt utrzymania (D-74)".
- What is wrong: here "task" was not narration of how the decision was reached; it is the product's word for the unit of work, and it is the word the binding sentence uses. The rewrite was not needed and makes the rationale disagree with the binding sentence in wording. The meaning in practice is close (a task acts through its change), so the effect is small. D-76 and D-270 have the same kind of rewrite, but there the binding sentence itself speaks of "a change of a boundary's principle" (D-76) and "in the same change" (D-270), so those stay consistent.
- Fix: restore "the task that shows the need".

**M-7 — `guidelines/testing.md:102-104`: the new clause can be misread.**
- Text: "gdy wartość potrzebuje źródła, odpowiedzią jest wpis fundamentu, a relacja, której kod pod testem nie liczy, i awaria liczona jako niepowodzenie źródła we wpisie nie potrzebują."
- What is wrong: the content is right (it matches `:87-89` and D-82's "Where a value needs a source"), but "awaria liczona jako niepowodzenie źródła we wpisie" first reads as "a crash counted as a failure of the source", because the object of "nie potrzebują" comes only at the end.
- Fix, for example: "…; relacja, której kod pod testem nie liczy, i awaria liczona jako niepowodzenie nie potrzebują źródła we wpisie."

### Note for the human, D-317 (not a finding; it bears on his reserved product question)

The corrected D-317 is exact against the normative WCAG 2.2 Recommendation (checked below). But W3C's own informative document for this criterion, "Understanding SC 2.3.1" (`https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html`, read 2026-11-12), says: "Substituting CSS pixels for the original pixel block means that the combined area of flashing becomes 341 x 256 CSS pixels, or a flashing area of 87,296 CSS pixels." So the old figure of 87,296 had a W3C source too. W3C's two texts disagree: the normative glossary allows 25 % of a 10-degree field (about 21,824 px), the informative page names 87,296 CSS px as the flashing area. D-317 follows the normative text, which is the one that binds and the stricter one, and its conclusion (a flash of the whole 204,288 px scene is over the threshold) holds under either reading. The Understanding page also adds a point D-317 does not weigh: "Content should be analyzed at the largest scale at which a user may view the content". This is information for the human's open question (is "no flash of its whole area" enough?), not a defect of the correction.

## The remarks, each as made or not

| Remark | Made? | Evidence |
|---|---|---|
| N-1, D-317 *Rationale* and *Based on* | made | Every quotation in *Based on* matches the Recommendation word for word (below); the figures hold; the binding sentence is unchanged (section check). |
| Minor 1, D-387 nature energy numbers | made | "D-176's, D-177's and D-377's"; D-176 *Rationale* holds the cap 100 and full start, D-177 the price 10, D-377 the regain 0.5 at satiety 60. |
| Minor 2, D-388 33/83 and 7 °C | made | "lasts 33 game minutes before it is chilled, against 83 on Las": 37 − 0.06 × 33 = 35.02, × 34 = 34.96; 37 − 0.024 × 83 = 35.008, × 84 = 34.984; agrees with the *Verification* (34 and 84). "also a number of the old game's data": `ognisko_i_jedzenie_loop2.md:141` "(w danych loop 7 °C)". |
| Minor 3, D-387/D-388/D-379 cost of tuning | made | "This decision forbids other numbers until it is changed, so tuning … is a change of this decision as well as of data and tests (D-18)". "the numbers are expected to change" (D-387, D-388 only) is backed by the reservation at Q9's *Source* (`ognisko_i_jedzenie_loop2.md:49`, "odniesione … także do Q7–Q12": "docelowo się zmienią"); not added to D-379, where no source covers it. |
| Minor 4, three test comments | made | D-388 cited for Las's 25 °C in all three; with comments stripped the three files are identical to the base (check below). |
| Minor 5, `guidelines/testing.md` | made (bullets 1, 2); bullet 3 reserved | `:14-16` and `:102-104` reworded; see M-3 and M-7. |
| Minor 6, D-132 and D-147 "nowhere" | made | Both now hold only "once „✕” has closed the window"; true by D-368's binding sentence ("„✕” … close it and uncover the screen of the map run, whose header then holds „Koniec przejścia”"). D-132's second "stated nowhere" was fixed too, correctly. |
| Minor 7, D-51, D-52, D-54, D-55 reservation | made | "It is a choice for now, expected to change later, so the entry holds what is true today and stays open to a change." Backed by `siedziba_i_druzyna_loop2.md:25-26` ("docelowo się zmienią", "fundament był aktualny na dzień dzisiejszy …, ale żeby to nie blokowało możliwości modyfikacji w przyszłości"); no invented reason. |
| Minor 30 part, D-298 and D-306 | made | No reason now; `edytor_programu_loop2.md:174,176`: "pakiet nie podał kosztu". |
| Minor 3 and 7 of the whole-change review | reserved to the human | not judged |
| Note D-220 | made | Reasons dropped; `rozliczenie_przejsc_loop2.md:46` gives only a process step and a reason from a project document. |
| Note D-362 | made | The refusal clause dropped, no reason left. |
| Note D-363 | made, with M-1 | |
| Note D-368 | made | `koniec_przejscia_loop2.md:92`: "nowe brzmienie … i ewentualnie nowe pytanie"; "new wording" kept. |
| Note D-10 | made | D-08's binding sentence: "at a public address different from `kantarion.bieda.it`". |
| Note D-208, D-265, D-267, D-268, D-270 | made, with M-2 | D-267, D-268 unchanged (part B found nothing there). |

## D-317, checked against W3C (requested critique, item 1)

Pages read with `curl -A 'research-agent/1.0'`, no data of the owner, the machine or the cycle in the request, on 2026-11-12: `https://www.w3.org/TR/2024/REC-WCAG22-20241212/` (HTTP 200) and `https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html` (HTTP 200). Text compared after stripping tags and joining whitespace.

- 2.3.1, page: "Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds." D-317 quotes it exactly (without the final full stop).
- Glossary "general flash and red flash thresholds", second bullet, page: "the combined area of flashes occurring concurrently occupies no more than a total of .006 steradians within any 10 degree visual field on the screen (25% of any 10 degree visual field on the screen) at typical viewing distance". Exact.
- Same entry, Note 1, page: "For general software or web content, using a 341 x 256 pixel rectangle anywhere on the displayed screen area when the content is viewed at 1024 x 768 pixels will provide a good estimate of a 10 degree visual field for standard screen sizes …". D-317's quotation is an exact prefix.
- Figures: 341 × 256 = 87,296; 87,296 / 4 = 21,824; 672 × 304 = 204,288; 204,288 / 21,824 = 9.36, so "more than nine times that" is true. "a flash of its whole area fills every 10 degree field inside it": a 341 × 256 rectangle fits inside 672 × 304, so such fields exist and each would be 100 % flashing against the 25 % allowed, which makes "so no effect takes the whole area of the scene" follow.
- Paraphrase: "the general flash threshold, which lets the flashes occurring at once take no more than 25 % of any 10 degree visual field on the screen" agrees with the glossary. It names the general threshold only, not the red one; the area condition is shared by both, so nothing false follows.
- The executor's added sentence, "The threshold of the standard bears as well on a flash of a part of the area, which this decision does not bar by itself": true. The criterion applies to any content that flashes, and D-317's binding sentence bars only a flash of the whole area. The sentence states the gap behind the human's reserved question and does not settle it.
- "read 2026-11-12": the date the page was read, the same day as this check.
- Binding sentence: unchanged (section check below).

## Checks

- Section check of every changed line of `foundations/decisions.md` (a scratch script that assigns each line of base and head to its entry and section and maps the `git diff -U0 ac30fc1d..a166bfeb` hunks onto them), exit 0. Result: only *Rationale* and *Rejected* lines changed in 35 entries, plus D-317 *Based on* (2 lines); no binding sentence, *Verification*, *Relations* or *Origin* touched. Part B touched 22 entries (D-10, D-74, D-76, D-208, D-220, D-233, D-255, D-265, D-270, D-271, D-298, D-306, D-316, D-349, D-351, D-356, D-357, D-362, D-363, D-366, D-368, D-373), as its commit says.
- Tests comments-only: a script strips `//` and `/* */` comments and blank lines from the base and head of the three test files and compares them, exit 0. Result: `acceptance` identical (146 lines), `body` identical (499), `campfire` identical (761). Arithmetic of the changed comments checked by hand (0.002 × 12 = 0.024; 37 − 0.024 × 84 = 34.984).
- Scratch clone of `a166bfeb` (`git clone --no-checkout <worktree>` + `git checkout a166bfeb`), with `.the-way` cloned from the worktree's submodule and checked out at the pinned gitlink `55afa8e57aa1b83c77108576a36642722e0dda15` (`git -C .the-way rev-parse HEAD` shows it):
  - `python -B .the-way/elements/common/foundation_check.py`, exit 0, "0 errors".
  - `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths`, exit 0, "checked: 444 files, 0 listed, 15 binary files not read".
  - `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- . ':(exclude).the-way'`, exit 1, no line.
- Word diffs of both commits, scanned by eye for "MVP", "the definition", "the plan", "the task", "the change", "the preview", "the owner's notes", note names, paths, and numbers of questions or of a task document: none added. One literal hit, "the change that shows the need" (D-74): a future change in general, not this cycle's change (see M-6 for the wording).
- `npx prettier --check` on the three test files at head: pass. On `guidelines/testing.md` at head: exit 1, but the base version fails the same way, and `package.json` runs no prettier step, so this predates the correction and is not a finding.
- Not run: eslint on the three test files (the clone has no `node_modules`, and once comments are stripped the code is identical, so no code rule can change; the executor reports exit 0). The three focused tests were not run for the same reason: no code changed. The product's gate was not run (the cycle runs it).
- `src` search for D-208's "currently" (`git grep` for removal functions and „Usuń” at `a166bfeb`), exit 0: only programs, rules and groups can be removed.

## Declined to judge

- D-317: whether "shows no flash of its whole area" is enough (the human's reserved product question).
- D-381's clause on a logout answered with no session (reserved).
- The phrase "a human's judgement counts once a decision holds it" in D-82 and the testing guidelines (reserved). M-3 only records that the guideline and D-82's *Rationale* now count the departures differently.
- Minor 3 and 7 of the whole-change review (reserved).
- Part B's list "Left as they are": the dated premises in about twenty entries, "the scope" as a source, "task" as the process word, "the definitions and the concept" in D-362. These are outside the correction's diff, so I did not judge them beyond the spot checks named here.
- D-265 *Rationale* "the coding guidelines had marked those modules as ones to copy from": unchanged by this diff, and written in the past tense.
- `guidelines/testing.md` failing prettier: the base fails too.

## Reaches beyond the dispatch

- D-08, D-311, D-74, D-76, D-255, D-271, D-315, D-349, D-356, D-357, D-132, D-147, D-387, D-388, D-379, D-51, D-52, D-54, D-55, D-82, D-176, D-177, D-377, read whole at `a166bfeb`: the diff changes them or cites them.
- `main`'s D-51 to D-55, D-363, D-255, D-208, and `git log -S'open to a change'`: to trace the reservation sentence of Minor 7 (first added in `cc0c6eec`, dropped in `03541eae`).
- `src/` at `a166bfeb`, searched for removals (D-208), and `src/browser/tokens.css:83-84` (D-316's "cover", M-5).
- The W3C Understanding page for 2.3.1, beyond the Recommendation: to check where the old 87,296 figure came from.
- Snapshot notes: `koszty_i_stan_ogniska_loop2.md`, `rozliczenie_przejsc_loop2.md`, `edytor_programu_loop2.md`, `koniec_przejscia_loop2.md`, `swit_rosnacy_z_passa_loop2.md`, `ognisko_i_jedzenie_loop2.md`, `siedziba_i_druzyna_loop2.md`, in the passages cited.

## Unread material

- `guidelines/testing.md` at head: lines 1-110 of 465 read (the two changed passages are at 14-16 and 102-104); the rest not read.
- D-233, D-351, D-366, D-373: read in the diff's context lines, not whole.
- D-267, D-268: not opened (unchanged by the range).
- The snapshot notes: only the passages cited, found by search.
- The WCAG Recommendation: only 2.3.1 and the glossary entry for the thresholds; the Understanding page: only its Intent section.
- The executors' downloaded copies of the WCAG page: not read (I fetched my own).

## Searches not found or unclear

- No source in the snapshot for D-357's "views of half a year ago" (search for "pół roku" found nothing); judged on the old text alone. The rewording keeps the rhetorical sense of the owner's question.
- W3C's own texts disagree on the flash-area figure (normative 25 % of a 10-degree field, informative 87,296 CSS px); see the note on D-317.
