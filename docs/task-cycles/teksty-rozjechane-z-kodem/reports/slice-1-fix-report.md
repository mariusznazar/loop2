# Fix report — finding I1 of the review of Slice 1 and the foundation entries

**Status:** done. **Commit:** `2a85b42` on `task/teksty-rozjechane-z-kodem` (on top of `fe84d1e`, which I did not touch). Only `foundations/glossary.md` changed (1 line).

## I1 — fixed

I held the finding right: after row 32 the state kept in the page's memory is "the unsaved game state", so "after each load of a saved game state" left out the sign-in case that D-247 lists last and its *violates* example requires; and "which runs" attached to "the save time".

New entry, written through the glossary skill (term already exists, so a change in place; *Not* stays `none`):

> The catch-up is the computing, after each load of a saved game state and after a sign-in to the same account with the unsaved game state kept in the page's memory, of the game minutes that passed since the save time.

Both occasions now stand in the sentence, with the case from the finding named in D-211's vocabulary, and the clause "after ..." is part of "the computing ... of the game minutes", so it attaches to the computing. D-247 and the invariant `catch-up-minutes` were not edited (separate rows). The "tab open" and "save lost to another browser" occasions of task item 36 are covered by "each load of a saved game state" (D-247 lists them as loads); I did not enumerate them, to keep one sentence.

## Checks

- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`.
- `git status --short`: clean after the commit.

## Own-work check

- Requirement most likely not met: "name the memory case and attach the clause to the computing". Check: read the new sentence for the noun the "after ..." phrase modifies. It stands directly after "the computing" and before "of the game minutes", so it cannot read as modifying "the save time". The memory case uses the words of D-211/D-04 ("unsaved game state", "page's memory"). Result: holds.
- Re-searched the uses of the word `catch-up` for a use whose meaning the changed definition moves (template, "A changed meaning"): `git grep -n -i -E "catch(-|\s)?up"` over tracked files gave the same uses as before (decisions, invariants `catch-up-*`, code and test comments); none conflicts with the new sentence.

## Unread material

none (the findings file and `.the-way/task-cycle/change/fix.md` read whole; the glossary skill and template were read in this session before; D-247 read whole earlier).

## Searches not found or unclear

none
