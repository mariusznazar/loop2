done

# Correction 1 — task cycle `mechanizm-drabiny` (make-change, "a correction for the human's remarks")

Start `fc61255e`, head `ad2d8084`, branch `task/mechanizm-drabiny`, worktree `the task's worktree`. `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, the commit the gitlink records (`git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` agree).

## The remarks, each as made

- **Remark 1 (D-466, option (a) with its first clause)** — made, commit `8153c44e`. The third sentence of D-466 (`foundations/decisions.md:6261`) now reads: "The catalog of the screen Mapy, within the groups each of its views makes and after the place each view gives the solved maps among them (D-325, D-331), and the end-of-run window show the maps in the order of the game maps' data, the buttons „Otwarte: {mapa} →” after a completion included." The clause is in the words the review gave and the human chose. The rest of the entry is unchanged.
  - Checked against the code:
    - in „Co daje”, `resourceGroups` puts the solved maps of a group first (`src/browser/view/catalog-lines.ts:375-377`);
    - in „Dokąd”, the open maps come first, then a picked solved map pinned above the fold, then the folded solved maps (`catalog-lines.ts:274-299`);
    - in „Postęp”, the maps stay in the data's order (`catalog-lines.ts:314`).
    - The styleguide line agrees: `guidelines/styleguide-browser-view.md:971-972`, „w grupie najpierw rozwiązane”.
  - *Rationale* and *Verification* of D-466 are still true under the new sentence, so I left them unchanged. Reasons:
    - The *Rationale*'s „Dokąd” cases compare maps that are all open and unsolved.
    - The *Verification* case of the catalog is the „Postęp” test (`tests/view/catalog-lines.test.mjs:343`).
    - No line `decision:` quotes the third sentence. The four D-466 lines quote the first sentence (`tests/sim/data.test.mjs:117`, `:329`, `tests/view/catalog-lines.test.mjs:344`, `tests/view/map-lines.test.mjs:67`).
- **Remark 3 (the formatter)** — made, in commit `1bb7b2ce` (formatter output only) and commit `6b2064b8` (the hash of `1bb7b2ce` in `.git-blame-ignore-revs`).
  - `npx prettier --write src/browser/view/map-lines.ts` joined the three lines of the `icons:` field of `cardHeading` into one (`src/browser/view/map-lines.ts:101`). The diff is layout only: one line added, three removed, no token changed.
  - I put the formatting in a commit of its own and named its hash in a later commit. The rule "Reformatting commits" of `guidelines/coding.md` asks for this, and the repository did the same for `e8d02127` (a Prettier fix of a test case) and `ff645a68`.
- **Remark 5(b) (a test of the measure on made-up data)** — made, commit `ad2d8084`.
  - **The case.** I rewrote the case of `tests/balance/progression.test.mjs` "a map whose opener stands after other maps is compared with the practice and the stock the opener was measured with", which now ends ", where that practice buys a rank" (`tests/balance/progression.test.mjs:275`).
    - It measures Las and Las — głębiej with the programs `forestBest` and `forestDeepSettledPatrol`, on seeds 1–8.
    - The character starts with a made-up practice of 160 gathering. The three levels it reaches give the three points of the branch `patrol`, which `forestDeepSettledPatrol` needs. The opener's practice therefore buys a rank. No opener of the game's maps reaches that, because the highest opener practice is 140.
    - Its expected value is built without the comparison code: `sweep` with `skillsFor` of the practice Las was measured with, and with each program's stock from its row of Las.
    - Three preconditions:
      - that practice buys a rank of `patrol`;
      - dropping the practice lowers the best share;
      - dropping the stock lowers the best share.
    - Its comment now says that it catches the loss of either. It expects no number of a rung (D-449).
  - **What I added to the measure, and why.** `measureProgression` takes a new input, `practice` (default `{}`): the practice a character holds before the maps before its map pay theirs. `measureMap` adds it to the practice the maps before it paid (`balance/progression.mjs:284-300`, `:377-383`, `:395-398`). The file's head comment and the comment of `measureProgression` say so.
    - It was needed because the instrument takes no map or skill data from its caller. The thresholds of the ranks are read by the game's own `buyBranch`. A start practice was the smallest way to make an opener's practice buy a rank without code that only the test uses.
    - With the default, every result is the same as before, because a character the game creates holds no practice.
    - The instrument's rules hold: the input is explicit, the result is data, no file is written, and no random draw comes from outside the seed (both invariant tests pass, below).
    - No CLI flag was added.
  - **Mutations.** Each was a one-line edit in a copy under `.runs/correction-1/mut-a/` and `mut-b/`: `dist/`, `balance/`, `tests/sim/reference-programs.mjs` and the test file.
    - (a) `practiceIn: openerSummary.practiceIn,` → `practiceIn: {},` at `balance/progression.mjs:347`: the case fails on its final assertion, with actual 0 against expected 75.
    - (b) `candidates: candidatesOf(before),` → `candidates: [],` at `:348`: the case fails, with actual 12.5 against expected 75.
    - The real code passes the case.
  - **D-448.** The `decision:` line stays as it was, since its quotation still names the sentence the case holds. The *Verification* (`foundations/decisions.md:6204`) now reads: "tests: a map whose opener stands after other maps measured, beside its own measurement, with the practice and the stock the mode `progression` built for its opener, the character starting with a made-up practice so that the opener's practice buys a rank of a branch the measured program needs."
  - **The comment "Skraj lasu opens no map"** (`tests/balance/progression.test.mjs:250`) belongs to the case "a map is also measured with the character of the map that opens it…", which I did not rewrite. The handoff ties the fix of that comment to a rewrite of its case, so it stays as it was. It is still untrue: Skraj lasu opens Las.

## Files changed and commits

| Commit | File | + | − |
|---|---|---|---|
| `8153c44e` docs: D-466 … after the place each view gives the solved maps among them | `foundations/decisions.md` | 1 | 1 |
| `1bb7b2ce` style: the icons field of the card heading in map-lines, the layout Prettier leaves | `src/browser/view/map-lines.ts` | 1 | 3 |
| `6b2064b8` chore: name the formatting commit 1bb7b2ce in .git-blame-ignore-revs | `.git-blame-ignore-revs` | 3 | 0 |
| `ad2d8084` test: the case … fails where the comparison loses the opener's practice as well as the stock …; D-448 names what the case holds | `balance/progression.mjs` | 34 | 16 |
| | `tests/balance/progression.test.mjs` | 28 | 12 |
| | `foundations/decisions.md` | 1 | 1 |

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after remark 1, after remark 5(b) before commit, at the head; no switch) | 0, 0, 0 | `0 errors` each time |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 120 info` |
| `npx prettier --check src/browser/view/map-lines.ts` before the formatter | 1 | "Code style issues found" (the failure of remark 3) |
| `npx prettier --write src/browser/view/map-lines.ts` | 0 | the one field reflowed |
| `npm test -- tests/view/map-lines.test.mjs` (formatted file) | 0 | 14 pass |
| `npm test -- tests/view/maps-screen.test.mjs` (formatted file) | 0 | 52 pass |
| `npm test -- tests/balance/progression.test.mjs` (real code, at the head) | 0 | 17 pass (`reports/correction-1/progression-green.log`) |
| `node --test .runs/correction-1/mut-a/tests/balance/progression.test.mjs` (mutation (a)) | 1 | 16 pass, 1 fail: the rewritten case, actual 0, expected 75 (`reports/correction-1/mut-a.log`) |
| `node --test .runs/correction-1/mut-b/tests/balance/progression.test.mjs` (mutation (b)) | 1 | 16 pass, 1 fail: the rewritten case, actual 12.5, expected 75 (`reports/correction-1/mut-b.log`) |
| `node .runs/correction-1/probe.mjs <out>` (probe of which programs and start practice make the case depend on both) | 0 | `reports/correction-1/probe.out.txt` |
| `npm test -- tests/balance/cli.test.mjs` | 0 | 25 pass |
| `npm test -- tests/balance/agreement.test.mjs` | 0 | 12 pass |
| `npm test -- tests/invariants/test_balance_instrument_file_writes.py` | 0 | 3 tests OK |
| `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 0 | 2 tests OK |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 | 2 tests OK |
| `npm test -- tests/quality/test_quality_invariants.py` (at the head) | 0 | 8 tests OK |
| `npm run typecheck` | 0 | clean |
| `npx prettier --check src/browser/view/map-lines.ts balance/progression.mjs tests/balance/progression.test.mjs` | 0 | clean |
| `npx eslint src/browser/view/map-lines.ts balance/progression.mjs tests/balance/progression.test.mjs` | 0 | clean |

Not run:
- the whole gate, `npm test` with no file, because the handoff and the method reserve it: CI runs it on the request.
- StrykerJS, because this correction changes no file of `simulation`. The two mutation runs above cover the changed lines of `balance-tools`.
- No check failed and then passed on a rerun.

## Own-work check

- **Requirement most likely unmet.** The human asks for a case that fails "gdy miara gubi wprawę mapy otwierającej albo zapas map przed nią". The weak point is mutation (a): the stock runs of the comparison also use the opener's practice, so dropping it could change the expected stock as well and leave the result equal by chance.
- **Check.** I ran both mutations on copies, on the final test file, after a probe (`reports/correction-1/probe.out.txt`) that showed the shares for each program:
  - `forestDeepSettledPatrol` on Las — głębiej solves 75 % with the opener's practice and stock;
  - 0 % with no practice;
  - 12.5 % with no stock.
- **What it showed.** Each mutation fails the case on its final assertion, not on a precondition. The real code passes it.
- **The new input itself.** I also mutated it in my head: if `measureMap` ignored `practice`, the practice of Las would not reach 160, and the first precondition would fail.

This correction alters no behaviour a user sees in the running product: the D-466 edit is prose, the formatter changed layout alone, and the instrument's new input defaults to the old result, so no walk is reported.

## Choices, with the way rejected

- **I rewrote the existing case instead of adding a second one beside it.** The old case on the game's own data killed only the loss of the stock, and its name claimed the practice too. The new case kills both through the same code, so the old one would have been a duplicate (`guidelines/testing.md`, "Testy bez dodatkowej ochrony"). The way rejected was a new case beside the old one, with the old one renamed to the stock alone. Cost if I am wrong: the suite no longer holds the stock of the comparison on a run that starts with no practice, which is the one the CLI makes. The code path is the same, so I hold that cost as small. The human wrote "dopisz przypadek"; the result is a case on made-up data, and the name and the clause now say what it holds.
- **A start practice as the made-up data,** in place of a made-up rank threshold. The thresholds are read inside the game's `buyBranch`, and the instrument takes no skill data. A threshold would need a seam in the simulation, which is a part this correction does not touch. Cost if wrong: a reader may take `practice` for a measurement option. Its comment says it defaults to a new character's none.
- **The formatting commit and its blame entry as two commits,** by `guidelines/coding.md` "Reformatting commits". The way rejected was the formatting folded into another commit, which the rule calls Bad.
- **The citation of D-466's new clause.** Of the two decisions the clause cites, D-331 gives the place of the folded solved maps and of the pinned picked map. Neither D-325 nor D-331 holds the solved-first order inside a „Co daje” group; that order stands only in the styleguide line above. The handoff told me to keep both citations and the human's words, so I kept them. This is an observation for the orchestrator, not a change I made.

## Reaches beyond the dispatch

- `.the-way/elements/common/way_of_working.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/decisions/skill/read.md` and `decide_entry.md`, all read whole. The decisions `SKILL.md` that the handoff names sends its writer to them.
- `src/browser/AGENTS.md`, read whole. `AGENTS.md` names it for work in `src/browser/`.
- `.git-blame-ignore-revs` and `git log` of its precedents (`e8d02127`, `ff645a68`), for the rule on reformatting commits.
- `tests/sim/reference-programs.mjs:400-458` (the patrol programs) and `balance/engine.mjs:40-100` (`buildSkills`), to choose the program and the input.
- `tests/view/catalog-lines.test.mjs:339-374`, for D-466's *Verification*.
- `src/browser/view/catalog-lines.ts:230-420`, which the handoff names around line 375.

## Working copies

- `.runs/correction-1/` held:
  - the mutation copies `mut-a/` and `mut-b/`;
  - the probe;
  - the logs;
  - the outputs of the foundation and instruction checks;
  - the commit messages.
- I removed it with `rm -rf` on its full path, and `ls .runs/` afterwards shows it gone. I made no git worktree, and `git worktree list` shows none of mine.
- One output of the first foundation-check run went by mistake to `.runs/correction-1-fc.txt`, outside my directory. I moved it into the directory at once, and it was removed with it.
- Kept beside this report, in `.runs/task-cycles/mechanizm-drabiny/reports/correction-1/`: `probe.mjs` with `probe.out.txt`, `mut-a.log`, `mut-b.log` and `progression-green.log`. The probe imports `../../balance/…` and `../../tests/…`, so it runs from a directory two levels under the worktree root, as `.runs/correction-1/`: `node .runs/correction-1/probe.mjs <output file>`.
- No process is left running. The one background run, the quality test, ended with exit 0.

## Unread material

- `guidelines/styleguide-browser-view.md`: only lines 969–975 (the rule of „Dokąd”, „Co daje” and „Postęp”). `AGENTS.md` asks for it before a change of a `browser-view` file, and the one such change was the formatter's layout of one line. Nothing in the styleguide bears on it.
- `.the-way/elements/decisions/examples.md` and the entries it names: not read. The change keeps the form of two existing entries and adds a clause to each.
- `.runs/task-cycles/mechanizm-drabiny/task_frozen.md`, `plan.md`, `request.md`, `reports/review-whole-report.md` and `gh pr view 184`: not read. The remarks, the handoff and `review-fix-1-report.md` (read whole) carried what the three things need.
- `src/browser/sim/` data of `patrol` and `pressure`: not read in the source. The thresholds 30/80/160 and the cost of 3 points come from the review's dump and from the existing test at `tests/balance/progression.test.mjs:68-83`, whose case holds that 160 buys rank 1 and 159 does not. That case passed.
- Read whole: `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-balance-instrument.md`, `balance/progression.mjs`, `tests/balance/progression.test.mjs`, D-466, D-448, D-325, D-331 and D-449, and the invariants `instrument-game-agreement`, `balance-instrument-file-writes` and `balance-instrument-repeatability`.

## Searches not found or unclear

- Not found: a sentence of D-325 or D-331 that sets the solved-first order inside a „Co daje” group (searched both entries, read whole). It stands in the styleguide alone (see Choices).
- Not found: a test that reads `.git-blame-ignore-revs` (searched `tests/` for the name).
- Unclear: the handoff's wording "Where you rewrite the case whose comment … (about line 250)". That comment belongs to the case at line 240, not to the case I rewrote, so I left it. It still says "Skraj lasu opens no map", which is untrue.
