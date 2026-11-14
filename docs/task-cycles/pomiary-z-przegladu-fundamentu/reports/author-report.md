# Author report — whole change as the one author

**Status:** done with concerns (concerns: section "Choices", items 1 and 2).

**Branch / base:** `task/pomiary-z-przegladu-fundamentu`, base `aa0ecd09`. Tree clean after the commits.

## Commits
- `6e5a2ade` docs: :card_file_box: record the measured figures in D-268, D-04, D-147, D-208, D-247, D-339 and D-347, and raise the reopening threshold of D-268 to forty files
- `72817471` docs: :memo: give the measurement of D-268 in the comment of the memory limit instead of the old peak

Author address of both: `mariusznn@gmail.com`, the same as the repository's earlier commits of this branch family (`git log --format='%h %ae'`).

## Files changed
- `foundations/decisions.md` — 65 added, 41 removed (D-04, D-147, D-208, D-247, D-268, D-339, D-347; binding sentence changed only in D-268).
- `tests/view/memory-limit.mjs` — 4 added, 2 removed (the comment at line 9 only; no code line).

## Entries (foundation step)
Each entry is edited in place through the rules of `the-way-record-decision` (`template.md`, `rules.md`, `way_of_working.md`, `read.md`, `decide_entry.md`, `examples.md`; `examples.md` names WAY-03, which I did not open, see Unread).

- **D-268 — row 1.** EN: the limit stays 2 GiB; more than forty (not ten) test files on a document imitation reopen how it is held; the Rationale gives the measurement (24 files, Node stage about 2.9 GiB without the limit-test case, largest file 1076 MiB, 20 cores / 32 GB, two other gates running, 21–25 Node processes) and why the threshold counts files; *Rejected* gains the 1.5 GiB limit (1.4 times room for the largest file). PL: limit zostaje 2 GiB, próg ponownego otwarcia to więcej niż czterdzieści plików (nie dziesięć), uzasadnienie podaje pomiar, a w *Rejected* dochodzi limit 1,5 GiB.
- **D-04 — row 2.** EN: the sentence "size never measured / estimate 50–60 B, several hundred entries" now gives the measured size of the chronicle with what it leaves out; the choice (chronicle only in page memory) stays; only the rarity of a mid-run refresh remains unmeasured; *Rejected* "size is unmeasured" now says the measured size is added to a save not sent above 64 KiB. PL: zdanie o niezmierzonym rozmiarze kroniki podaje pomiar z tym, czego nie obejmuje; wybór zostaje; niezmierzona jest już tylko rzadkość przeładowania.
- **D-147 — row 2.** EN: "two unmeasured assumptions" becomes the measurement plus one unmeasured assumption (the rarity of a refresh); the *Rejected* clause on the whole chronicle in the saved game says the measured size is added. PL: dwa niezmierzone założenia zastąpione pomiarem i jednym niezmierzonym założeniem.
- **D-339 — row 2.** EN: "two hypotheses" becomes the measurement plus one hypothesis (a reload mid-run is rare); the *Rejected* sentence with the estimate and the old measurement (102 entries, 13.4 KB, 9.5 KB save) is replaced by the measured size added to a save not sent above 64 KiB. PL: dwie hipotezy zastąpione pomiarem i jedną hipotezą; stary pomiar usunięty z *Rejected*.
- **D-347 — row 2.** EN: the old measurement (median 48, at most 102, 8.0/13.4 KB, save 9.5 KB) is replaced by the current one with its conditions (including the median game minute 1670, range 341–1816) and what it leaves out; the claim "fits the limit of 64 KiB" is replaced by the statement that the chronicle, kept in page memory, adds nothing to a save. PL: dawny pomiar zastąpiony dzisiejszym z warunkami i tym, czego nie obejmuje.
- **D-208 — row 3.** EN: 2947/6150/7075 B and "about 10 / 8 loops, an upper estimate" become 3 202 B, medians 9 838 B and 12 402 B and the directly counted 12 loops on Las (13 = 67 272 B) and 9 on „Las — głębiej” (10 = 66 675 B), with the assumptions (UTF-8 bytes sent to the server, game that knows everything, one shared program, no manual map run, empty report of absence). PL: liczby zapisu i liczba pętli podmienione na dzisiejsze, z założeniami pomiaru.
- **D-247 — row 4.** EN: "about 0.0068 ms … a lower estimate" becomes the measured range 0.001 ms (short map runs ended by death) to 0.011 ms („Las — głębiej” with wolf fights) per game minute of one character, window 30 days, median of 5 repeats, plus the limit that no loop ran all 30 days. PL: pomiar 0,0068 ms zastąpiony zakresem 0,001–0,011 ms bez słów o dolnym oszacowaniu.

No entry is `projected` or `the cycle's`. No invariant, glossary or part-map entry was changed; the invariant `document-test-memory-limit` states "2 GiB" and no file count, so it stays.

## Checks
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — `0 errors`, exit 0 (after the entries, before the comment).
- `python -B .the-way/elements/common/foundation_check.py` — `0 errors`, exit 0 (twice, the last after the final wording).
- `npx prettier --check tests/view/memory-limit.mjs` — exit 0.
- `npm test -- tests/view/memory-limit.test.mjs` — 37 pass, 0 fail, exit 0. First attempt `python -B scripts/test.py tests/view/memory-limit.test.mjs` exited 1 with `KeyError: 'npm_execpath'` (the script needs to be started by npm); the handoff's form of a focused run does not work outside npm — mismatch, noted; `npm test -- <file>` is the form `guidelines/testing.md` gives.
- Not run: the full `npm test` (the orchestrator's). No test written first: the change is prose of the foundation and one comment (no behaviour; section 2 of the method: prose gets no test).

## Own-work check (section 3)
- Requirement most likely unmet: every sentence of the foundation that still states the old figures or "unmeasured chronicle size" is replaced (rows 1–4), and nothing but the mid-run reload rarity stays "unmeasured".
- Check: `grep -nE "13\.4 KB|102 (entries|wpis)|50 to 60|never measured|unmeasured|nobody measured|0\.0068|lower estimate|2947|6150|7075|1\.68|ten test files|of about 9\.5 KB|several hundred entries" foundations/*.md guidelines/*.md tests/view/memory-limit.mjs`, exit 0 (matches found). Result: the only chronicle-related matches left are D-04 (line 136), D-147 (the "one unmeasured assumption" clause) and D-339 (line 8436), all the reload-rarity hypothesis; the rest are unrelated decisions (formatter, hashing gate, backup). No old figure remains.
- Second check: `grep` over `foundations guidelines tests scripts` for "more than ten|reopen" found D-268 only (now "forty"); no test or guideline cites the count.
- Another requirement, "no figure not in *Context*": every number in the entries is read from *Context* word for word. Only comparisons I made myself: "about half of the limit" (the task says so), "about twice" in the comment (2048/1076 ≈ 1.9, my wording) — see Choices 3.

## Drift of cited lines on the base
All four lines still say what the *Context* says: `tests/view/memory-limit.mjs:9` (the "1.68 GB" comment; now replaced), `src/browser/sim/saved-game.ts:78` (`SAVED_GAME_VERSION = 5`), `src/browser/sim/loop.ts:576`–`:588` (the `while (passed < span.minutes && !stopped)` loop with `takeEnd`, `stopped = taken.kind === "stopped"`), `scripts/test.py:44` (`lambda: command("node", "--test", *NODE_TESTS)`). No drift. The entries name no file or line (the *Rationale* rule), so none of them is cited in the entries.

## Choices (way rejected, cost if wrong)
1. **The sentence "so the game would stop saving" in D-04 and D-147 is dropped, not kept.** It followed from the estimate (several hundred entries at 50–60 B). With the measurement I may not recompute a sum (chronicle + save), and the *Context* gives no figure for such a sum, so I could not keep the inference nor deny it. Now both decisions say the chronicle would add the measured size to a save that is not sent above 64 KiB (D-207), and the version rise (D-206) stays. Rejected: keeping the inference unchanged (it would state something the measurement does not support). Cost if wrong: the human wants the "would stop saving" consequence for several loops restated — a one-clause addition. **Concern:** this is a change of what the Rationale argues, beyond the replacement of figures; the choice (page memory only) is untouched.
2. **D-347 loses "By that measurement the chronicle of one map run fits the limit of 64 KiB".** Not given by the *Context* for today's figures (the chronicle alone, 18 892 B at most, would fit, but the save beside it is the sum I may not compute). I wrote what the decision's own structure gives (the chronicle in page memory adds nothing to a save). Rejected: writing "fits". Cost if wrong: a one-sentence addition once a measurement of the sum exists.
3. **Comment in `tests/view/memory-limit.mjs`**: "about twice the 1076 MiB the largest file of tests peaked at" — *Context* gives the ratio only as "about half of the limit" (task) ; "about twice" is the same fact the other way round (rounded, mine). Rejected: "about half the limit" in the comment, which reads backwards for a limit. Cost if wrong: change one phrase. Also the comment no longer says "above the Node stage's peak" (that peak, 2.9 GiB, is above the 2 GiB limit now); it says the limit is about twice the largest file's peak.
4. **D-268, why forty.** The task and its answer give "40" and "the count is the only measure checkable without a measurement", but no derivation of forty from the figures; I wrote only that "forty files stands against that measurement" and did not invent a derivation. Cost if wrong: the human may want the derivation spelled out; there is none in the sources.
5. **The measurement is written in full in D-04, D-147, D-339 and D-347** (each sentence "podaje pomiar z tym, czego nie obejmuje"), so four copies of the same figures; the full conditions (median game minute 1670, range 341–1816) only in D-347. Rejected: one copy plus references to it (D-339 pointed to D-347 before; the row asks each sentence to give it). Cost: a later change of the figures goes to four places.
6. **D-247 got one sentence the row does not ask for**: that no loop ran all 30 days and that the seconds after many months hold for a loop that does not die (*Context*, `loop.ts:576`–`:588`). Rejected: leaving it out, because the Rationale's "after many months the page stands for some seconds per character" would then read as measured. Cost if wrong: delete one sentence.
7. **D-208 wording "12 earning loops fit … (13 come to 67 272 bytes)"** instead of "at most"; the old "upper estimate that counts neither the other characters nor the report" is replaced by the assumptions (one shared program, no manual map run, empty report). Rejected: keeping "upper estimate" (not stated by the *Context*). Cost if wrong: add the words.
8. **D-268 *Rejected*** gained the 1.5 GiB option (row 1's question, "Not chosen" b). The "Not chosen" c (supervisor) already stands in *Rejected* and I left it as is (its cost "a larger separate task" is a cost of work, not of the way).

## Reaches beyond the dispatch
- `guidelines/testing.md` whole (second page, lines 373–466) and `guidelines/coding.md` whole — as the dispatch named them.
- `foundations/glossary.md`: grep of the sections "game minute", "map run", "headquarters", "earning loop", "catch-up", "chronicle" (selective, not whole) — the terms the entries use.
- `foundations/decisions.md` D-206 (whole), D-207 (opening part up to the *Rationale*), D-347 (whole, the tail past line 8676 not read — see Unread): to check what the references in the edited text mean.
- Searched the repository (excluding `.runs`, `.the-way`, `node_modules`, `dist`) for the old figures to find every sentence of them: only `foundations/decisions.md` and `tests/view/memory-limit.mjs`.

## Unread material
- `.the-way/elements/decisions/examples.md` names WAY-03 as the example entry; I read the file, not the-way's `foundations/` entry WAY-03 (the entries edited are already in the form; the check passes).
- The invariant `document-test-memory-limit`: read its entry (lines 1188–1196 of `foundations/invariants.md`) whole; did not open `tests/view/memory-limit.test.mjs` (ran it).
- Part map entries of `product-foundation` and `browser-view`: not read (the handoff named them; I did not open `foundations/part_map.md`; the edit changes no part's files or dependencies).
- D-347: read up to line 8697 (the end of the *Rationale* risks); the rest of its *Rejected* (after `the person does not`) not read. D-04, D-147, D-208, D-247, D-268, D-339 read whole. D-206 read whole; D-207 up to its *Rationale*. D-104, D-338, D-77, D-264 not opened (only their headings were found).
- The glossary: only the six sections above, by grep, not the whole file.
- `AGENTS.md`, `src/browser/AGENTS.md`: not needed, per the handoff.

## Searches not found or unclear
- `python -B scripts/test.py <file>` (the handoff's form of a focused run) fails outside npm with `KeyError: 'npm_execpath'`; `npm test -- <file>` works.
- No source gives how forty was reached (Choices 4).
- The *Context* gives no sum of chronicle plus save and no consequence of the new figures for "the game would stop saving" (Choices 1, 2).
- `foundations/` has no sentence that depends on "ten files" besides D-268; the invariant `document-test-memory-limit` has no count.

## Problems observed
- None with the code. The two checks of the foundation and the focused test pass; the full gate is not run (orchestrator).
