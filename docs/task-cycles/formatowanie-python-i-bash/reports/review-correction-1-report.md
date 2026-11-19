FAIL 57c25292e98c36a556142cf86924233e5b8ac24d

# Review of correction 1 (formatowanie-python-i-bash)

Range `a89fadadba3a7a0bc3cfdd3f0272ea416826c0a9..57c25292e98c36a556142cf86924233e5b8ac24d`. I confirmed
the head with `git rev-parse` and `git rev-parse HEAD`. It is one commit, `foundations/decisions.md`
+2/-2. The review is bounded by `.the-way/task-cycle/review/fix.md`: the human's remarks
(`reports/correction-1-remarks.md`) stand in place of a findings file.

Counts: blocking 1 (remark 3 (a) not made), Minor 1, out of scope 0.

## The remarks

### 3 (a) — not made (Important, blocking)

The remark asks for content, word for word: „poprawić w tej prośbie: jedno zdanie decyzji (D-434)
mówi, że wewnątrz `[[ … ]]` shfmt stawia `&&` i `||` na końcu linii." In English: fix it in this
request; one sentence of D-434 says that inside `[[ … ]]` shfmt puts `&&` and `||` at the end of the
line. The handoff restates it the same way: "… at the start of a continued line, except inside
`[[ … ]]`, where shfmt 3.14.1 puts them at the end".

The correction only narrows the old gloss. The binding sentence now reads "`&&` and `||` of a command
list at the start of a continued line", and *Rationale* reads "`-bn -ci` leave `&&` between commands at
the start of a line". No sentence of D-434 says what shfmt does inside `[[ … ]]`. The correction report
concedes it: "the entry does not state that, it only no longer claims the opposite."

The narrowed text is true. It is not what the human asked for. A reader still learns nothing of where
operators stand in a conditional expression, which is the gap N-1 named and the remark chose to close
in the entry. The remarks bind, and a remark left unmade is a requirement left unmet, so this blocks.

Evidence: `git diff a89fadad..57c25292` (the two changed lines quoted above); `correction-1-report.md`,
§ Remarks, last bullet.

What would make it, still one sentence: in D-434's binding sentence, write "`&&` and `||` of a command
list at the start of a continued line and, inside `[[ … ]]`, at the end of the line before it". Then
check that the `decision:` quotation still stands (it ends at "`-ln bash`", before these words) and run
`foundation_check.py` again.

### 1, 2, 3 (b), 4 — made (no edit asked, none made)

The range touches nothing else: `git diff --stat` shows `foundations/decisions.md` alone, 2 lines.

## The correction's diff

- **The new words are true of shfmt 3.14.1.** In `.runs/review-correction-1/`, `shfmt -i 2 -bn -ci -ln
  bash p.sh` (exit 0) turned `if [[ -n $a` / `  || -n $b ]]` into `if [[ -n $a ||` / `  -n $b ]]`
  (operator at the end inside `[[ ]]`). It kept `if [[ -n $a &&` / `  -n $b ]]` as written. It turned
  the command list `first arg ||` / `  second arg` into `first arg \` / `  || second arg` (operator at
  the start). This agrees with the author's probe `reports/correction-1-probe.sh` and with
  `deploy/loop2-watch` after the reformat.
- **Consistency.** I searched `git grep` at `57c25292` over `foundations`, `guidelines`, `README.md`,
  `AGENTS.md`, `.claude/skills/loop2-deploy` and `tests/quality` for "start of a line", "start of a
  continued line", "na początku" and `-bn`. The search found only:
  - flag lists without a gloss: `README.md:74`, invariant `shfmt-source-format` (`invariants.md:460`),
    `format_support.py:16`;
  - the `decision:` quotation in `test_quality_invariants.py:149`;
  - D-434 itself.

  `guidelines/coding.md` holds no gloss, and its Bash examples hold no operator. D-434 *Rejected* ("operators move to the end of a line", for the flags at
  their defaults) stays true. Nothing else repeats the claim, as the author says.
- **Quotation.** `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors". The
  D-434 quotation ends at "`-ln bash`" and is untouched.

### Minor (does not block)

**m-1.** The commit message of `57c25292` says D-434 now says that shfmt "leaves them at the end inside
[[ ]]". The entry does not say so (see 3 (a)). The message cannot be amended, because the history
stays. Once 3 (a) is made in a later commit, the message describes the pair truly. No fix advised.

## Declined to judge

none

## Checks

- `git rev-parse 57c25292` → `57c25292e98c…`; `git rev-parse HEAD` → the same (exit 0).
- `git diff a89fadad..57c25292` and `--stat` → one file, +2/-2.
- `.runs/quality-venv/Scripts/shfmt.exe -i 2 -bn -ci -ln bash p.sh` in `.runs/review-correction-1/` →
  exit 0, output as above. One case of my probe was garbled by `printf` (a backslash continuation); the
  other three cases decide the question.
- `git grep -n -E "start of a (continued )?line|na początku|\-bn" 57c25292 -- foundations guidelines
  README.md AGENTS.md .claude/skills/loop2-deploy tests/quality` → the hits listed above.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- Not run: the product's whole gate (as the handoff says) and the quality tests. No test reads the
  changed words, and the author ran `test_shfmt_source_format` → OK.

## Reaches beyond the dispatch

None.

## Working copies

`.runs/review-correction-1/` (the probe `p.sh`): made in the worktree and removed with `rm -rf` before
returning. No remainder.

## Unread material

none (the handoff, the remarks, the correction report, its probe, `fix.md` and the diff read whole).

## Searches not found or unclear

- `printf` with `\\\n` wrote a literal `\n`, not a backslash continuation, so that one probe case did
  not test what I meant. The command-list case without a backslash covers it.
