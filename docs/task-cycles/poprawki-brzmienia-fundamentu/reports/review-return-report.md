FAIL 949f14dbd7e6ba66e98311b6b286cd9ca082875d

# Review of the return step - poprawki-brzmienia-fundamentu

Range `d09512b4cb3d25599cc02b33a7da2c4fdb006a3d..949f14db` (one commit; `git rev-parse HEAD` = `949f14dbd7e6ba66e98311b6b286cd9ca082875d`, the head given). Files: `README.md`, `foundations/decisions.md` (D-271 *Rationale*), `tests/view/icons.test.mjs` (comment).

Counts: 1 blocking (Important), 1 Minor, 0 out-of-scope findings.

## Findings

### Important (blocking, within the task)

**1. D-271 *Rationale* still says the pack's terms ask for no credit, without the saxophone qualification.**
Place: `foundations/decisions.md:4931-4932` — "The pack's terms ask for no credit and allow its arts to be altered, so a picture made from them may be dimmed, composed and cut down by hand."
What is wrong: the return step exists to bring the places that restate `pixel-crawler-terms` into line with the fact, which now reads "ask for no credit except where the project has a saxophone solo" (`foundations/environment_facts.md:656`; the source quotes point 5, "If at any point in your project, there is a saxophone solo, the name of the author must be credited"). The step corrected the clause at `decisions.md:4950-4951` of the same decision's *Rationale*, but left this sentence, 19 lines above, which states the terms without the exception — "without a qualification", the case WAY-263 (review-change section 3) grades Important for an entry the change writes or changes. The report's claim at "What no longer matched" (item 1) that the three sentences resting on the fact were all the ones is therefore not true: its own search missed this sentence (the report lists no search for it).
Why it matters: D-271 now says two different things about the same terms within one *Rationale*; a reader of line 4931 reads the pack as asking for no credit in every case, which is what the fact was changed to deny. This is the same defect the return step was made to remove.
Evidence: `Grep` for `pack's terms` over the worktree outside `.runs`/`.the-way` returns `foundations/decisions.md:4931` besides the fact itself; the sentence carries no qualification. The sentence does not change what D-271 binds, so the correction is a clause in the *Rationale* only (for instance "ask for no credit of a game with no saxophone solo").
Not a conflict with the test: `SPRITE_PACKS["Pixel Crawler"].asksForCredit` stays `false`, true for this game.

### Minor

**2. Line length of the reworded D-271 sentence.** `foundations/decisions.md:4951` is 142 characters, while the lines around it (`:4948-4952`) are 109-118 and wrapped by hand. The clause was appended without re-wrapping. Polish only; the file holds far longer lines elsewhere (e.g. the Rejected paragraph), so no rule is broken that I found.

## Judgements asked by the handoff

- **README point 2 wording** (`README.md:34`): "whose terms ask for a mention only of a project with a saxophone solo, which this game has not". True against the fact (point 5 of the terms: author must be credited at a saxophone solo; point 1: credit not necessary otherwise). "This game has not": no audio file is tracked (`git ls-files` with `.mp3/.ogg/.wav/.flac/.m4a` returns none) and `git grep` for `new Audio|AudioContext` finds nothing outside the four files that carry the new wording; the claim holds. "Mention" for "credit" is the README's own word and the fact's sense; accepted. The rest of the point is unchanged (diff confirms).
- **D-271 *Rationale* clause** (`decisions.md:4950-4951`): "the pack asks for no credit of a game with no saxophone solo, so the game's credits stay as they are" is true against the fact and the game has no saxophone solo. It binds nothing new: it sits in *Rationale*, the binding sentence, *Scope*, *Based on*, *Verification* and *Origin* are unchanged (diff touches one clause). Bound only by finding 1 for the sentence it left.
- **Test comment** (`tests/view/icons.test.mjs:381-386`): true against the fact; only a comment changed; `asksForCredit: false` unchanged. Prettier was reported run by the author; I did not re-run it (see unverified).
- **`sprite-credits` README check** (`tests/view/icons.test.mjs:428-470`, case "each PNG file directly in assets/sprites is assigned..."): still passes and still means what it meant. It splits point 2 at "The second pack is " / "The third is " and requires each chunk to name exactly one pack from `SPRITE_PACKS`; the first chunk (the reworded Pixel Crawler sentence) names only "Pixel Crawler" (the added words "saxophone solo" name no pack), so the assignment of files to packs is unchanged. Test run: 36 pass, 0 fail.
- **Claims of the return step's report**: the one-line check result matches what I ran (`foundation_check.py` 0 errors, 3 `listed:` lines that match the report; `icons.test.mjs` 36 pass). The claim that nothing else that rests on the fact said the old thing is not supported (finding 1). `check_instructions.py` (0 errors, 144 warnings), prettier and ruff results of the report I did not re-run; they are not claims about what the range says.
- **The three observations outside the change** (the report lists five; I judged the ones the handoff named, items 1-3, and read 4-5 for the same reason): none bears on this range. Items 1-3 concern the word "camp" in the scene-art skill files and the word "deployment" in a skill reference and a test label; item 4 concerns D-322; item 5 concerns "defeated attack". None touches the Pixel Crawler credit wording. Each stays the orchestrator's to place.

## Declined to judge

- Observations 1-5 of the return step's report, as to whether they should be corrected: outside the range and the task (graded neither blocking nor Minor).
- Whether the fact `pixel-crawler-terms` quotes the Terms document correctly: the source (Google Drive document and itch.io page) was not fetched by me; the fact's text is the thing the rewordings were judged against, as the handoff asks. Earlier reviews' statement that its point-5 quotation is checked only by the executor stands.
- The rest of the cycle's change (reviewed in `review-whole-report.md` and `review-fix-report.md`).

## Checks run

- `git rev-parse HEAD`, `git log d09512b4..949f14db`, `git diff d09512b4cb3d25599cc02b33a7da2c4fdb006a3d..949f14db` — exit 0; one commit, three files.
- `npm test -- tests/view/icons.test.mjs` — exit 0; 36 tests, 36 pass.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0; "0 errors"; 3 `listed:` lines (`player-opaque-session-cookie`, `trip-plan-progress`, `loop-run-knowledge`), none concerning this range.
- Manual: `Grep` over the worktree (outside `.runs`, `.the-way`, `node_modules`) for `pack's terms|Pixel Crawler terms|pixel-crawler-terms|saxophone`, and for `no credit|not require a mention|no mention|asksForCredit` (case-insensitive) — the only unqualified restatement left is `decisions.md:4931`. Positive control: the same searches found the three places the step reworded and the fact itself.
- Manual: `git ls-files` for audio extensions and `git grep` for `saxophone|new Audio|AudioContext` — no audio in the product.
- Not run: the product's full gate (as instructed); `check_instructions.py`; prettier; ruff. They are unverified by me.

## Reaches beyond the dispatch

- `foundations/environment_facts.md:650-658` (the fact `pixel-crawler-terms`): to judge the rewordings against it.
- `foundations/invariants.md:1288-1296` (`sprite-credits`, whole): to judge the README check.
- `foundations/decisions.md:4867-4966` (D-271, read whole through its *Rejected* start): to judge that it binds nothing new and to find other statements of the terms.
- `tests/view/icons.test.mjs:375-494`: the table, the README parser and its two cases.
- Repository-wide greps named above: to find other places that restate the terms.

## Unread material

none of the dispatch's required material unread except: the return step's handoff `reports/return-step-handoff.md`, the frozen `task.md`, and the earlier reviews `review-whole-report.md` and `review-fix-report.md` were not read (the review handoff said "read" the report and handoff; I read the return step's report whole and judged the range against the fact and the entries directly). `guidelines/*` files were not read: the change writes no code and no guideline.

## Searches not found or unclear

- none that blocked the review. (No search found a place other than `decisions.md:4931` that states the terms without the exception.)

## Working copies

None made; `.runs/review-return/` was not created. No worktree, clone or screenshot.
