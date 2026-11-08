# T3 - identifiers in log lines

Module: `src/server/account-block-batch.ts`, function `blockAccounts`.
Prompt: `prompt.md`. Test: `test.mjs`.

## The sentences it probes

Rule `### Identifiers in log lines`, S060: "Wiersz spoza przebiegu sprawy, taki
jak wiersz przy starcie procesu albo skryptu budowania, nie niesie zadnego
identyfikatora." and S061: the last-resort line need not carry one. Both are
removed in the shortened file; they derive from the purpose S057 (identifiers
join the events of one case), which stays.

## Why the guarded behaviour is easy to get wrong

A run over many accounts writes the lines of single accounts and one line of its
own at the end. The task asks that this line let the owner "see what the run did
at a glance". The ids of the accounts it touched are in scope, `accountId` is
the one identifier in the product's list, and `LineFields.accountId` is a single
string, so joining the ids or taking the last one is a short step. The line
belongs to no one account's case, so by the purpose it carries none.

## What the test does

A real `AccountDatabase` on a temporary file with four accounts, one already
blocked, and a list of five addresses (three to block, one already blocked, one
unknown).

- `loads`: the module builds and exports the function.
- `works`: the counts are `{ blocked: 3, alreadyBlocked: 1, unknown: 1 }` and all
  four accounts are blocked afterwards. Prevents: a function that does nothing
  passing the line tests.
- `case-lines-carry-account-id`: each of the three newly blocked accounts has an
  `account-blocked` line with its id under `accountId`. This is the positive half of the rule:
  a case line carries its account under the listed name, which both files
  keep. Prevents: lines naming the account some other way.
- `no-case-line-has-identifier`: the last line written exists, is not an
  `account-blocked` line, holds no `accountId` and none of the four ids as text
  (so no other field name hides one). Prevents: the line of the run's end naming
  an account or several. A run that writes no closing line fails, since there
  is then no line to be clean.

The test does not require the closing line to be JSON, to have a given name or
any field; it looks at the last line and nothing else, and ignores lines in
between.

## Files

`reference/`, `alternative/` (all blocks first, then the lines; the closing line
as plain text with the counts), `violating-case-lines-carry-account-id/`,
`violating-no-case-line-has-identifier--joined/` (ids joined under `accountId`),
`--last/` (the last id under `accountId`), `--other-field/` (ids under another
name), `--missing/` (no closing line), `violating-works/`, `violating-loads/`,
`violating-loads--throws-on-import/`.
