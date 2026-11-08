PASS 20f5ffdacf336da84a7587b0aab0d482c6800ee7

Saved by the orchestrator from the reviewer's returned text, word for word: the harness refused the reviewer's own write to this path.

Counts: blocking 0, Minor 0, out of scope 0. No Critical, Important or Minor findings.

## Range

- `git rev-parse HEAD` is `20f5ffdacf336da84a7587b0aab0d482c6800ee7`, the head given.
- Range `331688e..20f5ffd` is one commit that touches only `foundations/decisions.md` (7 insertions, 7 deletions).
- `.the-way` is at `294af7f`, equal to the gitlink.

## The six places against the task

The word-level diff gives:

| Item | Base line | Result | Verdict |
|---|---|---|---|
| 1 D-23 *Verification* | 546 | "a sentence **of this decision** naming…" | exact |
| 2 D-109 *Rejected* | 1995 | "one more sentence **in this decision**" (was "here") | exact |
| 3 D-120 *Rejected* | 2184 | "leaving **this decision's** sentence unchanged" (was "the") | exact |
| 4 D-253 binding sentence | 5167 | "the sentences **of this decision** above ask no more of" | exact |
| 5 D-309 *Rejected* | 6682 | "the approved sentence **of D-308** gets an exception" | exact |
| 6 D-103 *Verification* and *Rationale* | 1910 and 1914 | "a full **password** gate…", "The measured **password** gate…" | exact |

- **Acceptance criterion:** `git diff -U0` shows exactly seven hunks, one per place above, with two for D-103. Everything else on each line is byte-for-byte unchanged. No sentence outside the six places changes.
- **D-103 binding sentence** (line 1906, "One bounded gate without a waiting queue covers…") is not in the diff.

## WAY-104 compliance

WAY-104 read whole at `.the-way/foundations/decisions.md:2284`.
- **The five "sentence" edits** each use a phrase that holds the word and names the decision whose sentence is meant. That is the shape of the "complies" example "dialogue sentence".
- **"password gate"** matches the "complies" example "castle gate".
- **Bare "map", "action" and "test"** are untouched, so the "violates" example about sweeping bare uses does not apply.

## Meaning of decisions and dependent entries

- **Binding sentences:** D-23, D-103, D-109, D-120 and D-309 change only in *Verification*, *Rationale* or *Rejected*, never in a binding sentence.
- **D-253:** the change is inside its binding text, but it only fixes what "above" refers to, which the sentence already meant.
- **D-309 and D-308:** "of D-308" restates the existing relation ("derives from D-308").
- **Dependent entries:** `foundations/invariants.md` opened at every `Derives from:` line naming D-23 (194, 260, 372), D-103 (665, 795, 805), D-109 (725, 995) and D-308/D-309 (1225). No invariant quotes any of the seven old strings, and none needs an edit. A `grep -rn -F` for the seven old phrases outside `.git`, `node_modules` and `.runs` found no match. The invariants at lines 659 and 1081 already say "gate" with "password" in the sentence, which agrees with the edit.
- **Invariant tests:** the commit changes none.

## The author's concerns

1. **Edit tool instead of `the-way-record-decision`:** acceptable. The edits are wording only and no identifier, *Relations*, ordering or *Origin* changes. `foundation_check.py` reports 0 errors on the head.
2. **Line width:** lines 546 and 5167 are now 112 and 124 characters. No check enforces a width, and the file already has longer lines. Not a finding.
3. **Derived invariants:** opened (above); no follow-on edit is needed.
4. **Reading gap:** the greps above cover it.

## Declined to judge

- Withdrawing qualifiers added under the earlier WAY-104 ("game map", "DOM element" and so on): the task puts it out of scope.
- Other bare uses of process words elsewhere in the foundation, including D-173 and the bare "gate" in the invariant at line 661: outside the closed list.
- The failing `ruff` and `shellcheck` tests in `tests/quality`: environment, and the orchestrator runs the suite.

## Checks run

| Command or method | Exit code | Result |
|---|---|---|
| `git rev-parse HEAD`, `git log --oneline 331688e..20f5ffd`, `git status --short` | 0 | head `20f5ffd`, one commit, clean worktree |
| `git -C .the-way rev-parse HEAD`, `git ls-files --stage -- .the-way` | 0 | both `294af7f…` |
| `git diff --stat`, `git diff -U0`, `git diff --word-diff=porcelain -U0` | 0 | one file, seven hunks, only the words in the table |
| `git diff --check 331688e..20f5ffd` | 0 | clean |
| `grep -rn -F` for the seven old phrases | no match | no old text remains |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Full `npm test` | not run | reserved to the orchestrator, so unverified by the reviewer |

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-23, D-103, D-109, D-120, D-253, D-309 at the changed places with context, plus the heading and *Relations* of D-308. This was to read each changed sentence in context.
- `foundations/invariants.md`: the entries that derive from the changed decisions. The dispatch asked for this.
- `.the-way/task-cycle/review/whole_change.md`: required by the method.

## Searches not found or unclear

- I did not read D-308 whole. I took the task's statement that the approved sentence is D-308's binding sentence, backed by D-309's *Relations* ("derives from D-308"). The edit only names D-308.
- I did not read WAY-95 or WAY-99 whole. Whether "password gate" needs a glossary entry is undetermined. WAY-104 gives a qualified word an entry only where WAY-95 does, and the loop2 glossary has no entry for "gate" or "sentence". I did not grade it, because no sentence would be read wrongly for lack of one.

## Questions

none
