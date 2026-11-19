# Findings for the fix of the correction (round 1) — from `reports/review-correction-1-report.md`

Reviewed range `a89fadadba3a7a0bc3cfdd3f0272ea416826c0a9..57c25292e98c36a556142cf86924233e5b8ac24d`, first line of the review: `FAIL 57c25292e98c36a556142cf86924233e5b8ac24d`. The words below are the reviewer's, cut from its report.

## Blocking finding

### 3 (a) — not made (Important, blocking)

The remark asks for content, word for word: „poprawić w tej prośbie: jedno zdanie decyzji (D-434) mówi, że wewnątrz `[[ … ]]` shfmt stawia `&&` i `||` na końcu linii." In English: fix it in this request; one sentence of D-434 says that inside `[[ … ]]` shfmt puts `&&` and `||` at the end of the line. The handoff restates it the same way: "… at the start of a continued line, except inside `[[ … ]]`, where shfmt 3.14.1 puts them at the end".

The correction only narrows the old gloss. The binding sentence now reads "`&&` and `||` of a command list at the start of a continued line", and *Rationale* reads "`-bn -ci` leave `&&` between commands at the start of a line". No sentence of D-434 says what shfmt does inside `[[ … ]]`. The correction report concedes it: "the entry does not state that, it only no longer claims the opposite."

The narrowed text is true. It is not what the human asked for. A reader still learns nothing of where operators stand in a conditional expression, which is the gap N-1 named and the remark chose to close in the entry. The remarks bind, and a remark left unmade is a requirement left unmet, so this blocks.

Evidence: `git diff a89fadad..57c25292` (the two changed lines quoted above); `correction-1-report.md`, § Remarks, last bullet.

What would make it, still one sentence: in D-434's binding sentence, write "`&&` and `||` of a command list at the start of a continued line and, inside `[[ … ]]`, at the end of the line before it". Then check that the `decision:` quotation still stands (it ends at "`-ln bash`", before these words) and run `foundation_check.py` again.

## Minor, not to be fixed

**m-1.** The commit message of `57c25292` says D-434 now says that shfmt "leaves them at the end inside [[ ]]". The entry does not say so (see 3 (a)). The message cannot be amended, because the history stays. Once 3 (a) is made in a later commit, the message describes the pair truly. No fix advised.

## What to do

Make 3 (a) in one new commit on top of `57c25292` (no amend, no rewrite). Keep the change to what the remark says: the one sentence of D-434's binding sentence as the reviewer words it (adjust only if you find it untrue of shfmt 3.14.1, and say so). Run `python -B .the-way/elements/common/foundation_check.py` and `test_shfmt_source_format`, report commands and exit codes. Write the report to `.runs/task-cycles/formatowanie-python-i-bash/reports/correction-1-fix-report.md` in the form `make-change` gives, with **Unread material**, **Searches not found or unclear**, own-work check and working copies. Do not run the whole gate. Working copies only in `.runs/correction-1-fix/`, removed before you return.
