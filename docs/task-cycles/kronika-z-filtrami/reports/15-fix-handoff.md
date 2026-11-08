# Handoff 15 — the fix of a review's findings (stage: make-change, the fix of a review's findings)

You fix the Minor findings the review of the whole change listed, once, as small as each finding
asks. Your variant of `make-change` is **the fix of a review's findings**: read
`.the-way/task-cycle/change/SKILL.md` and `.the-way/task-cycle/change/fix.md` whole. A finding the
findings file does not hold is not yours to fix; a finding you hold wrong or cannot fix within the
task you contest with evidence, and it blocks nothing.

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator
(Sonnet 5.5). Questions that change what the work means go to the orchestrator in your report
(status `questions`), never to the human. An answer from the orchestrator is never the human's
approval. A new Critical or Important finding in a fix made for Minor findings gives the whole fix
up (the orchestrator reverts it), so keep each fix small.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`. The reviewed head, where your range starts:
  `1880393a31b8080a8ab2543f423d6e42db4e55c1`. The worktree is clean. Pinned the-way: `.the-way` at
  `294af7f`; use no personal skill of the same name without the `the-way-` prefix.
- Findings file (the Minor findings of the review, in the reviewer's words): read it whole:
  `docs/task-cycles/kronika-z-filtrami/reports/15-findings.md`. The review report it was cut from:
  `docs/task-cycles/kronika-z-filtrami/reports/14-review-report.md`; read the passages around the
  findings if you need the reviewer's evidence (not the whole report).
- Frozen task `docs/task-cycles/kronika-z-filtrami/task.md`, reviewed spec `spec.md` and plan
  `plan.md` in the same directory; read the passages your fix touches.
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/15-fix-report.md`.
- Commits: on this branch, English messages in the repository's form (`fix: :bug: …`,
  `docs: :memo: …`, `test: :white_check_mark: …`), one per finding or per closely tied group, added
  **by path** (`git add <path>…`), never `git add -A`, `.` or `commit -a`. The code is in English; what
  the code writes to the player stays in Polish as the task gives it. Leave no uncommitted change.
- You run no full gate (`npm test` with no file); run the focused checks of what you change, each with
  command and exit code, and `python -B .the-way/elements/common/foundation_check.py` after a change of
  the foundation or the guidelines.

## What the orchestrator asks for each finding

1. **D-347 does not hold the projected entry word for word.** Fix by the reviewer's second way: put
   the dropped sentence back, word for word as the task quotes it (`task.md`, *Decisions in play*,
   the entry „(new) — How does an agent learn what went wrong in the running game?"), and tie the
   entry to D-323 and D-253 in its *Relations* so that the foundation holds one chain, not two
   statements that disagree; keep what the task's *Rationale* says that is still true and leave out
   only what the foundation step already found untrue (the sentence „Today an exception stops the
   game without a word …", since D-323). Write the change through the project skill
   `the-way-record-decision` (read it whole, from `.claude/skills/` of the worktree, with the
   element's template and rules it names): foundation entries are written only through the element
   skills. Do not change the meaning of D-323 or D-253; if tying them needs a change of either,
   contest the finding with that evidence instead.
2. **D-346 and a load.** The reviewer states this is a question for the human, because a
   qualification would add a meaning the task did not settle (WAY-172). Do not change D-346 or the
   code. Contest it in your report as "cannot be fixed within the task", with this evidence in one
   or two lines (the row 14, the spec's D2, `chronicle.ts` `createChronicle`); it goes to the
   request's list.
3. **The grown window does not start anew at a send or „Restart".** Fix as small as it asks: the
   window of `ChronicleList` must start at its first size again when a new map run starts by a send
   or by „Restart" (not when only an entry arrives, and not when the tab changes — keep what the
   slice 5 report says of the window otherwise). How the list learns of the new map run is yours
   (for example a counter the memory keeps and hands in its snapshot, used in the list's key); keep
   `chronicle.ts` free of React and DOM. Add the failing case first to
   `tests/view/right-area.test.mjs` or `tests/view/chronicle.test.mjs` and see it fail on its
   assertion, then fix.
4. **No test protects „a row already drawn is not drawn again".** Add a test that fails when `memo`
   of `Row` or the `useMemo` of the paragraph is removed, if a render counter can be had inside the
   product's rules for tests (`guidelines/testing.md`; for example a counting wrapper component the
   test mounts, or a spy on a prop function the row calls once per render). Do not add a counter to
   product code only for the test. If no such test can be written without changing product code for
   it, contest the finding with that evidence. If you write one, see it fail by removing `memo` in a
   scratch edit you revert before committing, and record that in your report.
5. **The styleguide's *Where in code* gains a screen file, and the new rule is in unwrapped lines.**
   In `guidelines/styleguide-browser-view.md` remove the added line `src/browser/view/right-area.tsx`
   from `## Where in code` (the template gives that section only the token file, the directory of
   shared components and the page of every state; check `.the-way/product-guidelines/styleguide/template.md`
   around lines 140–170 yourself) and wrap the lines of the new rule „The chronicle of a map run"
   near 80 characters as the other rules of the file do, changing no word and no decision
   reference. If the rule's body names its code place, keep that sentence in the body.

## What to read

Every file you change, whole, before you change it. The guideline files that bear on your change,
each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`,
`guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`. The foundation entries by identifier,
each whole: D-346, D-347, D-323, D-253, D-254 and, for finding 3, D-338 and D-339 (use
`grep -n "^### D-347" foundations/decisions.md` for their lines). The code: `src/browser/view/right-area.tsx`,
`src/browser/view/chronicle.ts`, `tests/view/right-area.test.mjs`, `tests/view/chronicle.test.mjs`.

## What the report holds

As `fix.md` gives: each of the five findings as fixed — how, with the check that shows it — or
contested with the evidence; your commits (hashes) and the range from `1880393`; each check with its
command and exit code; the own-work check (the requirement you were most likely to miss and the
check you made of it); every reach beyond this handoff; the files you changed; and **Searches not
found or unclear** (each thing looked for and not found or unclear, or `none`). Return your status,
your commits and the report path in one short message.
