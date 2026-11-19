FAIL c00c005766c18cc9873be6bf852f8255e35fb81b

# Review of fix 1 (formatowanie-python-i-bash)

Fix range `2d3b33c8b8cf036a2c653a17514421f6f8ab4647..c00c005766c18cc9873be6bf852f8255e35fb81b`
(`git rev-parse HEAD` confirmed; one commit, `foundations/decisions.md` +3/-3). Bounded by
`.the-way/task-cycle/review/fix.md`: each finding of `reports/fix-1-findings.md` judged as fixed or
remains, and the fix diff inspected for what it broke.

Counts: blocking 1 (I-1 remains, as carried), Minor 1 (a note outside the fix diff), out of scope 0.

## The findings

### I-1 (blocking) — remains, in the text the request is to carry

The orchestrator carries I-1 as a human step in the request. I judged the proposed text (handoff,
"Handling of your findings"). Most of it holds:

- The warning wording matches `deploy/loop2-deploy:223`: "warning: the installed $installed differs
  from $relative at commit $REQUESTED; this run goes on with the installed copy."
- The comparison is byte for byte (`cmp -s`, `deploy/loop2-deploy:222`). It covers the three scripts
  among the six copies (`deploy/loop2-deploy:227-235`).
- "every one after it" holds: the warning repeats on each deployment until the copies are reinstalled.
- The named section exists: `.claude/skills/loop2-deploy/references/setup_and_secrets.md:78`, "Installing
  a script from an exact commit". It extracts with `git show <sha>:<path>` and `bash -n`, and installs
  with `install -o root -g root -m 0755`. `cmp` against the file of that commit is the check the skill
  uses elsewhere (`backup_and_restore.md:134`, `setup_and_secrets.md:544-546`).
- The reinstall is safe. The installed copies are byte copies of the repository files: the constants
  block of `deploy/loop2-backup`, `STRYCH_HOST` included, stands in the repository. So a plain reinstall
  loses no value of the host.

**One claim in the text is wrong.** The parenthesis "(what differs is spaces in arithmetic expressions,
the place of `&&` at a line break and the indent of `case` branches)" does not describe the diff.

- `git diff -U0 05596b54 7d091cd9 -- deploy/` holds 118 changed lines. 98 of them are spaces inside
  `(( … ))` and `$(( … ))`.
- The other 20 lines are of two kinds:
  - The indent of a line continued after a backslash, for example `      || ! { : <"$ENCRYPTION_KEY_FILE"; }`
    → `    || …` in `deploy/loop2-backup`.
  - Inside `[[ … ]]`, `&&` and `||` moved from the start of the continued line to the end of the line
    before it, with the backslash dropped (two conditions in `deploy/loop2-watch`).
- No line of a `case` branch changed: the only `case` statements, three in `deploy/loop2-watch`, are
  untouched, because `-ci` keeps them as they were written.

The skill section tells the human to "Review the difference against the installed script" before
installing. A human who does that finds `[[ ]]` operators moved and continuation indents changed,
neither of which the request lists, and finds no change of `case` branches, which it does list. The
assurance that "the reinstall is a formality" then rests on a description the human can see is wrong.

A smaller imprecision in the same text: "the installed copies and the reformatted files have the same
syntax tree". What I compared is the files before and after the reformat (`05596b54` against
`7d091cd9`). That equals the installed copies only where the host already stood on the scripts of the
base commit. The wording should say what was measured.

**What would resolve it (text only, no repository change).** Replace the sentence from "The reinstall is
a formality" to the closing parenthesis with:

> The reinstall is a formality, not urgent: each script before the reformat and after it has the same
> syntax tree by `shfmt --to-json`, so a copy installed from the previous commit does the same thing
> as the new file (what differs is spaces inside `(( … ))` and `$(( … ))`, the indent of a line
> continued after a backslash, and, inside `[[ … ]]`, `&&` and `||` moved from the start of a continued
> line to the end of the line before it).

Optional: say that `loop2-backup` and `loop2-watch` are installed as root, mode 0755, like
`loop2-deploy`. The named section shows the paths of `loop2-deploy` alone (`backup_and_restore.md:13`,
`setup_and_secrets.md:535`). It could also point to "Installed-script warning" in
`.claude/skills/loop2-deploy/references/troubleshooting.md:52`, which explains this very warning.

### M-1 — fixed

`c00c0057` changes "about 170" to "about 180" in D-434, in *Rationale* once and in *Rejected* twice,
which matches the task's 176. It changes "The counts of lines and files" to "The counts of lines" in
D-433. `grep -rn "about 170\|counts of lines and files" foundations guidelines` finds nothing (exit 1).
The binding sentences and their `decision:` quotations are untouched (`foundation_check.py`: 0 errors).
The fix diff breaks nothing else; it holds only these four phrases.

### M-2 — not fixed, as advised

No commit was rewritten. The hash `7d091cd9…` still stands in `.git-blame-ignore-revs`. The request is
to name it.

## New note outside the fix diff (Minor, within the task; does not reopen the review)

**N-1. D-434's gloss of the flags is broader than what shfmt does.** The note is about
`foundations/decisions.md`, D-434's binding sentence: "`-i 2 -bn -ci -ln bash`: two spaces of indent,
`&&` and `||` at the start of a continued line, …".

`-bn` puts a binary operator of commands at the start of the continued line. Inside `[[ … ]]`, however,
shfmt 3.14.1 with these flags puts `&&` and `||` at the end of the line, as the reformat of
`deploy/loop2-watch` shows. So the entry tells a reader the opposite of what a conditional
expression will look like.

The consequence is small: a script written by the gloss fails `test_shfmt_source_format` and gets the
command to reformat it. The fix would be "`&&` and `||` of a command list at the start of a continued
line". The test of `decision:` quotations does not quote that part of the sentence (the D-434 quotation
ends at "`-ln bash`"). I missed this in the review of the whole change.

## Declined to judge

- Whether I-1 also belongs in the task document's *Human actions*: that is the orchestrator's choice,
  which the handoff names.

## Checks

- `git rev-parse HEAD` → `c00c0057…` (exit 0); `git diff 2d3b33c8..HEAD --stat` → one file, +3/-3.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- `grep -rn "about 170\|counts of lines and files" foundations guidelines` → no match (exit 1).
- `git diff -U0 05596b54 7d091cd9 -- deploy/`: 118 changed lines, of which 98 hold `((`. I read the other
  20, and no changed line belongs to a `case` statement (method: listed every changed line without `((`).
- I read `deploy/loop2-deploy:208-235` again for the warning wording and `cmp -s`, and
  `setup_and_secrets.md:78-102` for the named section.
- The three syntax-tree equalities come from the review of the whole change (`equiv.py`, kept in
  `reports/review-whole-checks/`). I did not rerun them; the reformat commit is unchanged.
- Not run: the product's whole gate (the orchestrator's) and the quality tests (no binding sentence or
  quotation changed).

## Reaches beyond the dispatch

- `.claude/skills/loop2-deploy/references/backup_and_restore.md` (lines 13, 128-140, 192-200, 425-440),
  `setup_and_secrets.md:533-546` and `troubleshooting.md:52-66`: to check how the two other scripts are
  installed and whether a reinstall from the commit loses a value of the host.

## Working copies

None made; `.runs/review-fix-1/` was not created.

## Unread material

none (the handoff, `fix.md`, the findings file, the fix report and the fix diff read whole; the skill
references only in the passages named above).

## Searches not found or unclear

- The named skill section gives the paths of `loop2-deploy` alone; the owner and mode of the other two
  scripts stand in other sections (named above).
