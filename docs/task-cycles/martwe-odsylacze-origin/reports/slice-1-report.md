# Slice 1 report — testing guidelines take expectations from the foundation

- **Status:** done with concerns
- **Variant:** a slice
- **Slice base:** `ccc03bcfb22272727db926fa3df6161f2eef2f0a` (HEAD at start; worktree clean)
- **Commits:** `7a92118b` docs: :memo: take test expectations from the foundation in the testing guidelines
- **Files changed:** `guidelines/testing.md` (+8 / -13)

## Change

- `guidelines/testing.md`, section "Where the expected value comes from", the paragraph after the
  *Good* / *Bad* lines (formerly lines 90–102): it now says that the documentary sources are the
  foundation (decisions, invariants, glossary, D-82); that an expectation comes from the foundation and
  not from a task document or the concept; that a requirement the foundation lacks goes into the
  foundation first; that a comment carrying information the code needs moves that information into
  the foundation, and a comment carrying none is not written; that a test comment names no document
  outside the foundation; and that the reviewer's question "skąd ta wartość?" is answered by a
  foundation entry. The Q7c example and the sentences on access to the vault are removed. The
  *Decision* line (D-73 · D-80 · D-82), the paragraphs above it and every other section are unchanged.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors", 436 files checked, 0 listed |
| Tracked private paths | `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` | 0 | no output (lists nothing) |
| Forbidden words in the file | `git grep -nIE 'in the vault\|w vaulcie\|_loop2\.md\|koncepcja_\|vault\|plik i linię\|Q7c' -- guidelines/testing.md` | 1 | no line printed |

Not run: the product's gate (`npm test`), as the handoff says. The focused checks above are the
slice's own.

## Own-work check

- **Requirement:** the paragraph says what D-82 (current text, `foundations/decisions.md:1546`) says,
  and names no source outside the foundation.
- **Check:** the three commands above, plus a read of the new paragraph against D-82's *Verification*
  ("violates: a test comment that names a task document, a note or the copy of a task document ...").
- **Showed:** no forbidden word, no pointer to a task document, note or concept; the paragraph
  matches D-82's *Decision* text and its *Rationale* on the 2 + 2 = 4 case.
- No test was written or changed (prose only); no mutation step applies.

## Concerns for the orchestrator

1. **Wording mismatch between the slice's *Goal* and D-82.** The *Goal* says "a comment names no
   document outside the repository". D-82 says "a document outside the foundation". These differ: a
   comment naming, say, a guideline file or a test file would pass the *Goal*'s wording but break
   D-82. I wrote the paragraph with D-82's wording ("dokumentu spoza fundamentu"). If the *Goal* is
   the intended rule, D-82 and this paragraph need to be aligned in a later step.
2. **Dropped alternative.** The old paragraph allowed a comment to give "osobę i datę rozstrzygnięcia"
   instead of a file and line. D-82 names no such source, so I dropped that alternative with the
   file-and-line rule. If Mariusz wants a person and a date kept as a permitted source, that is a
   change to D-82, not to this slice.
3. **Sentence left as it was.** Line 84 of the same section still reads "Oczekiwanie pochodzi z
   uzgodnionego dokumentu, niezależnej zależności, …". The *Goal* says no other meaning changes, so I
   did not touch it. It sits next to the new paragraph and could be read as a second rule; flagging
   it for the reviewer to judge.

## Unread material

none (read: the handoff; `.the-way/task-cycle/change/SKILL.md` and `slice.md`; `guidelines/testing.md`
lines 76–110 and the whole changed paragraph; `task.md` lines 25–60 and 98–106; `plan.md` header,
Foundation entries table, Slice 1, Coverage, Choices and the orchestrator's review; `decisions.md`
D-73, D-80, D-82, and D-362 current text. The product's `AGENTS.md` guideline files were not read,
because the slice changes no code or test and no `browser-view` file.)

## Searches not found or unclear

none. Notes on the dispatch: the handoff's *Current ranges* list D-82 at 1546–1560 and this matched
the file. The plan's *Read* row "Foundation entries row 2 (D-362 as changed)" is satisfied by reading
the committed D-362 at `foundations/decisions.md:8105`; its second sentence already has the new form
in `ccc03bcf`, so nothing in the slice depended on a different text.

## Choices made

- The paragraph was written with D-82's wording, not the *Goal*'s "outside the repository" (concern 1).
  Way rejected: the *Goal*'s wording. Cost if wrong: a comment naming a repository file would not be
  flagged by this guideline, and only the review of the change would catch it.
- The reviewer's question "skąd ta wartość?" kept, its answer changed to "wpis fundamentu". Way
  rejected: removing the question. Cost if wrong: none measurable; it is the one line of the old
  paragraph that matches D-82's aim.
