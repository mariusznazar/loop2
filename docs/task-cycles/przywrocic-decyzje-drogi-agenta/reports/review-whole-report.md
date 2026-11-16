PASS 787acccdcf731d3f4f9a117a0ceabcd0e5b34175

# Review of the whole change — `przywrocic-decyzje-drogi-agenta`

Range: base `f6b410bab5e496a54203a3ee9549fbafb2f09372` to head `787acccdcf731d3f4f9a117a0ceabcd0e5b34175`
(`git rev-parse HEAD` confirmed; `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the pinned
commit). Commits `38e84eee` (D-417 to D-420 and nine facts) and `787acccd` (both copies of the skill
`loop2-play`, one comment of `tests/view/scene.test.mjs`). One author, no plan, no slices: each finding
below comes from no slice; the commit is named.

Blocking findings: 0. Minor: 2 (both within the task). Out of scope: 0 findings; 5 lines of Declined to judge.

## Findings

### Critical

none

### Important

none

### Minor

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

## Against the task

- *To do* 1: four entries D-417 to D-420 written; word diff against `git show 1a56e519^:foundations/decisions.md`
  (`### D-254`, `### D-357`, `### D-358`, `### D-359`) shows only: the numbers; the five, one and three
  fact identifiers in *Based on*; `D-254`→`D-417` in D-418 *Relations*, D-420's binding sentence,
  *Relations* and *Rationale*; `D-357`→`D-418` in D-419 *Relations*; the clause of Minor 1; the line
  break inside "types apart" of D-417 *Rejected* (whitespace only). Nothing else differs.
- *To do* 2: the four rows of `## Withdrawn identifiers` carry *Successors* D-417 to D-420 and a *Why*
  that no longer says "not a decision of the product" or "stands in the skill" (`foundations/decisions.md:11273-11276`).
- *To do* 3: the four entries stand at the end of "The gate, test tools and the local start", after
  D-414 and before "## The server: …"; the section sentence now ends "and where the screenshots an agent
  shows the human lie." The rest of the section is unchanged (the diff touches no other line in it
  but D-264's citation).
- *To do* 4: nine facts written; word diff against `git show 1a56e519^:foundations/environment_facts.md`
  shows only the identifiers and, in `screenshots-repository-readers`, the CDX check date, the read
  date (2026-11-14 → 2026-11-16) and `"visibility":"public"` → `"visibility": "public"`. The space
  agrees with the template's "passage … whitespace collapsed" (`.the-way/elements/environment-facts/template.md:133`)
  and with the API's own output. Eight facts keep their old dates (2026-11-02, 2026-11-11). The nine
  new identifiers name what the fact is about, none is a value or an edition, none appears anywhere
  in `foundations/` but in its entry and the *Based on* that cites it, and none repeats a withdrawn
  one. The nine *Successors* cells of the facts' withdrawn table name them.
- *To do* 5: D-347 *Relations* is "derives from D-417 · derives from D-323 · derives from D-253",
  the order of the old text; D-264 *Rationale* "(D-88, D-417)"; the scene test comment "(D-417, D-88)".
  Each matches the text before `1a56e519` with the new number.
- *To do* 6: the three removals are gone from both copies; the paragraph "Playwright CLI is the first
  way because …" became "Playwright CLI is the first way of operating the game (D-417)."; the opening
  paragraph and the CLI section cite D-417, "Show a screenshot to the human" cites D-418 and D-419,
  "Where the CLI fails" cites D-420; every rule step stays. The two copies are byte-identical
  (`cmp`, and the test). No tracked file cites a removed sentence (git grep of the four removed
  phrases finds only the decisions that now hold them).
- *Settlements to record* rows 1–4: each met by D-417 to D-420 respectively; marks `row 1`–`row 4` fit.
  No row carries the nine facts or the edits of the two withdrawn tables whole, so the author's mark
  `the cycle's` for them is right (handoff pointer 6).
- *Out of scope* (pin): `.the-way` unchanged.
- No text refers to D-254, D-357, D-358, D-359 or to the nine old fact identifiers except the rows of
  the two withdrawn tables; D-417 is the next free number (highest entry and withdrawn number at the
  base: D-416); nothing at the base names D-417 to D-429.
- D-362 and its invariants: the restored text names `mariusznazar/screenshots` (public, fact
  `screenshots-repository-readers`), `mariusznazar/loop2` and its pull request #67 (public, fact
  `loop2-repository-visibility`); no note, no folder of notes, no private repository. The review
  invariant `tracked-file-private-names` holds by my reading; the test of `tracked-file-private-paths` passes.
- No screenshot file in the range.

## Declined to judge

- The wording of D-417 to D-420 beyond the two Minor findings (for example D-417 *Rationale* naming
  "a file of the repository" and D-420 *Rationale* naming what "the process the product pins asks",
  against the template's rule on prose) — restored word for word as *To do* 1 orders; outside the task.
- The *Why* "withdrawn: no decision is based on it and no invariant rests on it" kept in the nine rows
  of the facts' withdrawn table — true of the old identifier, no rule asks to change it, and the task
  orders only *Successors* there.
- The compact `"visibility":"public"` of the sibling fact `loop2-repository-visibility` against the
  spaced form of the restored fact — an entry the change does not touch.
- The date "read 2026-11-11" of the passage of pull request #67 in D-418 *Based on*, which the author
  re-read on 2026-11-16 and left — the task gives a new date only to the live-address fact.
- Line lengths over about 100 characters in the skill (lines 180, 217 among 18 such lines at the base)
  — no guideline sets a length for Markdown.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | head as given; pin matches |
| `git diff --no-index --word-diff=plain` of old D-254 / D-357–D-359 and the nine old facts (from `1a56e519^`) against D-417–D-420 and the nine new facts | differences only as listed under *To do* 1 and 4 |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| `python -B .the-way/instruction-files/check_instructions.py` (head) | exit 0, "0 error, 141 warn, 7 info" |
| same script on a worktree of the base, warnings compared with line numbers dropped | every head warning is also a base warning (the base worktree had no submodule, `.runs/` or `dist/`, so it had more); the change adds none |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | exit 0, 8 tests OK |
| `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | exit 0, 1 test OK |
| `npm test -- tests/view/scene.test.mjs` | exit 0, 71 pass, 0 fail |
| `npx prettier --check tests/view/scene.test.mjs` | exit 0 |
| `python -B .the-way/task-cycle/change_file_sizes.py <base> <head>` | exit 0; decisions.md 11166→11277, environment_facts.md 903→957, each skill copy 302→294, scene test 2739→2739 |
| size test of the rule `### Size of a function and a file` | not run: `guidelines/coding.md` holds no such rule, so no such test exists; structure findings would be Minor (WAY-363); none raised |
| `cmp` of the two skill copies | identical |
| git grep for D-254/D-357/D-358/D-359, the nine old fact identifiers, D-417–D-429 at the base, the four removed skill phrases, `loop2-play`/`screenshots`/`Playwright` in foundations, guidelines, src and tests | as reported above |
| `decision_index.py --sections`, then `--section "The gate, test tools and the local start" --part agent-workflow --part browser-view --part product-foundation` with `--decision` for D-75, D-88, D-264, D-347, D-362 and the 22 decisions the scene test holds by `decision:` lines | index of 46 listed in full and 266 by heading; headings run through |

Not run: the full gate `npm test` (the orchestrator runs it, as the handoff says); no network read
(the author's `curl` of the screenshots repository and the CDX index are taken as recorded — the
recorded output agrees with the API's form, and I had no reason to doubt it).

## Reaches beyond the dispatch

- `git show f72e08aa^:foundations/decisions.md`, entry D-254 — to learn whether the measurement in D-417
  had a record a reader can open (its *Origin* was a private note; Minor 1).
- `git log -S"## owner" -- foundations/glossary.md` and the glossary entry `owner` — the glossary term
  the restored text uses (Minor 2).
- `git show 65d858b9 4398d136 -- .claude/skills/loop2-play/SKILL.md` and `git show 1a56e519` (stat,
  hunks, `guidelines/testing.md`, scene test) — what the withdrawal and the two skill commits changed.
- `.the-way/elements/environment-facts/template.md` (head and the source rules, lines 1-135) and
  `.the-way/elements/common/rules.md` § Withdrawn identifiers and identifiers; `.the-way/elements/glossary/template.md`
  passages on WAY-104 and WAY-99; `.the-way/product-guidelines/reading.md`;
  `.the-way/elements/common/way_of_working.md` § Reading the foundation.
- `foundations/environment_facts.md` entry `loop2-repository-visibility`; `foundations/part_map.md`
  entries `browser-view`, `agent-workflow`, `product-foundation`, `test-helpers` and the external context
  row of `mariusznazar/screenshots`; `foundations/invariants.md` entries `tracked-file-private-paths`,
  `tracked-file-private-names` and the *Part* lines of all invariants.
- `tests/agent_workflow/test_loop2_play_skill.py`, whole.

## Working copies

- `.runs/review-whole/` of the worktree (`.runs/review-whole/`):
  the old decision and fact files from git, extracted entries, the decision index, outputs of the
  instruction check and of the scene test. Removed before returning.
- A detached worktree of the base at `.runs/review-whole/base`, for the base run of the instruction
  check: removed with `git worktree remove --force`, then `git worktree prune`.
- The build of `npm test -- tests/view/scene.test.mjs` writes the product's own ignored output
  (`dist/`); no working copy of mine. `git status --short` of the worktree stayed empty.

## Unread material

11 decisions of the index read whole: D-417, D-418, D-419, D-420, D-75, D-88, D-264, D-347, D-362, D-12
(cited by D-419), D-13 (where access values live, against D-419's `gh` account). Besides, through the
word diffs, the old texts D-254, D-357, D-358, D-359 at `1a56e519^` (not in the index, not counted).

- The other 37 decisions listed in full in the index — the rest of "The gate, test tools and the
  local start" (D-49, D-94, D-95, D-255 to D-258, D-268, D-390 to D-392, D-405, D-406, D-413, D-414)
  and the 22 decisions the scene test holds by `decision:` lines (D-40, D-43, D-122, D-132, D-148,
  D-271, D-272, D-291, D-315 to D-322, D-364 to D-367, D-372, D-373) — read in the index only. The
  change alters only the head comment of the scene test, none of its cases or `decision:` lines,
  and no binding sentence in the index points to a bearing on the change.
- Of the 266 decisions listed by heading, two opened whole from their headings (D-12, D-13); no
  other heading points to a bearing.
- Guidelines: `guidelines/coding.md`, `guidelines/testing.md` and `guidelines/styleguide-browser-view.md`
  read whole. Kind files `guidelines/coding-*.md` not read: no index row's *When to read* matches a
  change of a comment, a skill or the foundation. `src/browser/AGENTS.md` not read: the change does
  not work in `src/browser/`.
- Invariants: of those whose *Part* is `every` or a touched part, `tracked-file-private-paths` and
  `tracked-file-private-names` read whole; `prettier-source-format` not read whole but checked by
  running Prettier on the changed test file; the other 53 (code, build, server, screen behaviour)
  not read whole — the change touches no code they hold.
- Glossary: the product's entries `owner`, `deployment`, `test server`, `public address` read; the
  the-way glossary holds no entry for "task cycle", "request" or "screenshot".

## Searches not found or unclear

- Whether "A cropped picture of the scene costs far less than a picture of the whole screen" and "a
  text read of the game is not cheaper than a screenshot of it" (D-417 *Rationale*) were measurements
  of the product's own people: unclear — their source was the author's private note, which the
  repository does not hold (Minor 1).
- The decisions template (`.the-way/elements/decisions/template.md`) and the facts template give no
  form for a live page with no archived copy; the restored fact keeps the form "(no archived copy
  exists in the Internet Archive's CDX index, checked …)" that `loop2-repository-visibility` already uses.
