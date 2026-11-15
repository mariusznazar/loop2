# Planner report — testy-wskazuja-zdania-decyzji

- Status: done with concerns
- Plan: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md` (40 slices, serial, every one *Model* `strongest`, *Risk* none)
- Size report: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan-size.md` (the script's last run on the plan)
- Size report with `foundations/decisions.md` taken out of every *Change*: `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/planner-size-without-log.md`
- Commits: none
- Check: `slice_size.py` exits 1 — all 40 slices `too large`, each only because `foundations/decisions.md` (1 076 448 characters, about 430 000 tokens) stands in its *Change* and is counted whole; without the log 39 fit (52 000 to 149 000 tokens) and Slice 13 stays too large (about 188 000 tokens). No other check was run; a plan has none.

## What the plan does

- The 403 decisions of the log at the base are divided by material into 40 slices of 5 to 14
  decisions: quality and gate (1–2), testing guidelines (3), server runtime and deployment (4–5),
  backup (6), failures and local start (7), account server over HTTP (8–11), browser saves (12),
  login card (13), exemplars (14), the view's design system, framework, navigation, controls and
  maps screen (15–19), simulation topics (20–32), the map-run screen, scene, chronicle and program
  editor (33–40). Every decision stands in exactly one slice's *Goal* (checked by a script against
  the index).
- The method every slice shares — what never changes, how to judge a sentence, the form of the line
  `decision:`, the three outcomes for *Verification* and the pair, files outside *Change*, the
  report's per-decision rows — stands once as the plan's section "Work of every slice"
  (`plan.md:16-73`), and every slice's *Read* names that range. This adds a section to the plan's
  form; it is under *Choices*.
- Every slice depends on the one before it (all edit the log), so the slices run one after another
  and two slices may change the same test file.
- The cycle's autonomous choice for the question carried to the cycle (a mention stays, the line
  stands beside it) is item 1 of "Work of every slice".

## Concerns

1. **The size script cannot pass any slice of this task.** It counts every existing file of
   *Change* whole, and every slice must change `foundations/decisions.md`; a range in *Change* leaves a
   slice `unchecked`. No division removes this. The executor reads the log only by the ranges its
   *Read* names (its decisions, D-73, D-82). Proposed: accept the plan with that excess named, and
   judge size by the second report. Leaving it as it is costs nothing beyond the record; the other
   way — keeping the log out of the slices and writing it in one last slice — still leaves that one
   slice "too large" and moves the judgments' result into untracked files (rejected in *Choices*).
2. **Slice 13 (login card, D-96, D-157, D-224, D-225, D-259–D-262, D-352, D-381) is too large even
   without the log**: `tests/view/account-screen.test.mjs` alone is 244 920 characters (about 98 000
   tokens), and a slice that changes a file of `browser-view` reads
   `guidelines/styleguide-browser-view.md` whole (about 32 000 tokens) as `AGENTS.md` requires.
   Splitting the slice leaves the same file and styleguide in each half, so it cannot fit. Proposed:
   accept it; its executor reads the test file by search, not whole.
3. **The route for writing the field *Verification*.** `AGENTS.md` says foundation entries are
   written only through `the-way-record-decision`, whose shared way of working
   (`.the-way/elements/common/way_of_working.md`) searches the whole foundation and asks the human
   per entry, and whose step 3 adds a pair "where the human gives one or accepts one you propose".
   The plan gives each executor the template's sections and the skill's step 3 (`SKILL.md:29-43`),
   not the whole way of working: the binding sentences do not change, and by that file's step 4.2 the
   human accepts any other entry "at the merge". Each pair an executor adds or rewrites is listed in
   its report with its words, so the request can show them for acceptance at the merge. Proposed
   answer: keep it so. If the orchestrator wants the whole way of working read, it adds that file
   to each *Read* (11 067 characters, about 4 500 tokens a slice); no slice asks the human itself.
4. **The *Change* lists are a best guess.** Which tests hold a sentence is the slices' own finding;
   *Change* names the files that cite the slice's decisions at the base, capped at ten files. A test
   found elsewhere is a reach (item 5 of "Work of every slice"): the executor reads that part's
   guidelines, adds the line, runs the file and names it. The measured sizes understate such
   slices.
5. **Cost.** 40 dispatches on the strongest model, each reading 52 000 to 188 000 tokens before its
   searches; `guidelines/testing.md` is read 40 times and the styleguide 23 times.
6. **Counts in the task that do not hold at the base**: the log holds 403 decisions, not about 396;
   23 are listed as held by nothing, not 24 (D-80 is withdrawn). *To do* 1 is already met (pin
   `ec7929d` descends from `f4af75d`); the plan has no slice for it, and *Coverage* says so.
7. **The index's last range runs past the file**: `prep/decisions_index.tsv` gives D-409 lines
   9905–9930, but the log has 9929 lines and its list "Withdrawn identifiers" starts at line 9920.
   The plan takes every range from the log's headings instead (D-409: 9905–9918); the first lines
   match the index for all 403.

## Guidelines missing or uncertain

- `guidelines/testing.md` says nothing of the line `decision:` — where it stands or how it relates to
  D-82's rule on comments. The plan takes its form from the template of the pinned the-way and
  treats it as a comment that names a foundation entry, which D-82 allows. A later
  `maintain-testing-guidelines` pass could name it. No finding blocks the task.
- `guidelines/coding.md` holds no rule of size (WAY-365), so no slice moves code first.
- No kind file of `guidelines/coding.md` matches a change of a test's comment; none is in a *Read*.
- The styleguide's order-of-work example does not apply: no slice changes a user interface. The
  styleguide is read only because its *When to read* and `AGENTS.md` require it for every file of
  `browser-view`.

## Reaches beyond the dispatch

- `.the-way/task-cycle/slice_size.py`, whole — to know how *Change* and *Read* are counted (concern 1).
- `.the-way/elements/decisions/skill/SKILL.md` and `.the-way/elements/common/way_of_working.md`,
  whole — the route for writing entries (concern 3).
- `.the-way/task-cycle/change/slice.md`, whole — how an executor handles a plan that differs from the
  code (item 5).
- `.the-way/product-guidelines/reading.md`, whole — which guideline files a slice's *Read* names.
- `.the-way/elements/common/foundation_check.py`, lines 60–94 and 700–809 — what counts as held and
  how a line `decision:` is checked.
- `guidelines/styleguide-browser-view.md`, lines 1–12, and the *Applies to* line of every guideline
  file — the selection of guidelines.
- `foundations/decisions.md`: every heading line, and D-390 whole (an entry with a clause `tests:`);
  `foundations/invariants.md`: lines 1–30 and every heading line, to name ranges.
- `ruff.toml`, `tests/quality/test_quality_invariants.py:21` (Prettier flags), the ESLint configs
  searched for a line-length rule (none) — whether a long comment line breaks a check.
- `git grep "decision: D-"` — the lines `decision:` already standing (D-390, D-406, D-408, D-409).
- Sizes of every tracked test file (`wc -c`) — the *Change* lists.

## Working copies

- `.runs/planner/` in the worktree held the helper scripts (`scopes.py`, `overview.py`, `gen.py`,
  `assemble.py`), the slice groups (`groups.json`), derived lists and draft plans. Removed before
  return; the size report without the log is kept as `reports/planner-size-without-log.md`.

## Unread material

- `foundations/invariants.md`: read only lines 1–30 and its headings; the invariants each slice needs
  are named by range in that slice's *Read*, as the dispatch says the executors read them.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/prep/decisions_index.tsv`: its first five lines
  read directly; every row processed by script, not read by eye.
- Everything else the dispatch names was read whole: the frozen task, the template, D-73, D-82,
  `guidelines/testing.md`, `guidelines/coding.md`, `foundations/part_map.md`.

## Searches not found or unclear

- Unclear: whether `AGENTS.md`'s "only through the project skills" requires the whole way of working
  for a change to *Verification* alone (concern 3).
- Not found: a way to name a range of a file in *Change* for `slice_size.py`; it marks such a slice
  `unchecked` (concern 1).
- Not found: any rule in the product's guidelines on the line `decision:` (above).

## Questions

- Concern 1 and 2: accept the excess as named? Proposed: yes.
- Concern 3: executors edit *Verification* under the template and the skill's step 3, and every new
  or rewritten pair goes to the human at the merge through the request? Proposed: yes.
