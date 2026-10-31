PASS aa9ff04824ab83ed793b43b8f63bc3010d7cf4e6

# Review of Slice 4, task `reset-hasla` — range `7b0a391..aa9ff04`

Blocking: 0 · Minor: 1 · Out of scope: 5 (the lines of Declined to judge).

`git rev-parse HEAD` in the worktree is the head given. The range holds one commit and only the two
files the plan's *Change* names. `.the-way` is at `a8dfe8a`, the commit its gitlink records.

## Findings

### Critical

None.

### Important

None.

### Minor

#### 1. The reset token and link in the leak case's list can never fail

**Place:** `tests/account-mail.test.mjs:568-578`, with the send it reads at
`tests/account-mail.test.mjs:516` and the title at `tests/account-mail.test.mjs:508`.

**What is wrong.** The case exists to prove that the mailer writes no secret to the console, and it
now says so "of either message". The mailer writes only on a failed send
(`src/server/account-mail.ts:135-136`, `src/server/account-mail.ts:98-107`). The one failed send in
the case carries the confirmation message: line 516 passes `message`, which line 514 composes as the
confirmation message. So `lines[0]`, the only line the loop reads, comes from a send that never held
`resetToken` or `resetLink`. Those two entries compare a line with values it could not contain.

What the case does prove for the reset message is real but narrower: a *sent* reset message writes
nothing, through `assert.equal(stdout, "")` and `lines.length === 1`. A *failed* reset message, the
only path on which the mailer writes at all, is never run.

**Evidence.** Mutant M12 below writes the reset message's whole body to the console on a failed send
only when the message is a reset message. All 9 cases pass, exit 0. M13, the same write on a sent
reset message, is caught; M11, the write on any failed send, is caught through `link`.

**Why it matters, and why Minor.** The plan's *Checks* asks that this case "reaches the reset message
too", the title says it does, and a later reader will take the two entries as protection on the
exact path D-162 forbids. The grade is Minor and not the Important of "a test that asserts nothing"
because the case as a whole asserts, the code has no such defect, and the gap can only open through a
branch on the kind of message: `reportFailure` receives the error alone and never the message, and
the mailer has no such branch. M12 is a contrived mutant for that reason. Any plausible regression,
such as logging `message.text` on failure, is caught through the confirmation message (M11).

**Fix, if the orchestrator takes it.** Add a fourth send with the wrong password and
`composePasswordResetMessage`, expect `["sent", "failed", "sent", "failed"]` and 4 authentications,
expect two lines, and run the secret loop and the `EAUTH` match over each line. About six lines; not
run in this review. The alternative is to drop `resetToken` and `resetLink` from the list and leave
the title's claim to the sent path, which is cheaper and gives up nothing the case proves today.

## Against the task and the foundation

- **To do 8, D-219:** subject, three paragraphs and their order are as required. Each quoted string of
  To do 8 and To do 9 equals one constant of `src/server/account-mail.ts` byte for byte (7 of 7, by
  script, not by eye). The link stands alone on the line after the opening. The body is text only;
  M14 shows an HTML part fails both whole-message cases. Sender and form come from the same mailer.
- **To do 9, row 17, D-158:** the sentence is its own paragraph before „Jeśli to nie Ty, zignoruj tę
  wiadomość.”; D-158 already says four paragraphs, and the comment at
  `src/server/account-mail.ts:5` agrees. The foundation entries this slice relies on say what the code
  does.
- **To do 10, D-219:** the slice adds no message after a change of password and no third kind.
- **D-162:** both messages are composed in the mail file; a route gets a composer taking address and
  link. Texts stay in that file.
- **D-163, invariants `account-email-via-outsider` and `account-email-nodemailer-starttls`:** `#submit`,
  `#connection` and the envelope are unchanged, so the way of reaching Outsider does not change. No
  test connects beyond the loopback interface.
- **The hour in the text:** „ważny przez godzinę” agrees with `passwordResetLinkLifetime = 60 * minute`
  (`src/server/account-policy.ts:25`).

## Hostile input at the trust boundary

The slice adds no route, so of the handoff's list only what enters a message applies.

- **Address:** it stands only in `to`, and `send` refuses it through `plainAddress` before connecting,
  for either message. M09 fails both crafted cases. The new case „a crafted recipient of a reset
  message fails without connecting” is not a duplicate of the older one: M10, a reset composer that
  cuts the address at a separator so the crafted address gets through as a clean one, fails that case
  and no other.
- **Link:** it enters the body only, never a header, so it cannot add a recipient or a header. Its
  value is built by the server; the routes are Slices 5 and 6.
- **Logs:** no new write. The mailer's only writing path takes no part of the message. See Minor 1 for
  what the test shows of this.

## Tests

- **Changed existing cases, as *Changing an existing test* asks:** the confirmation case's expected
  body gained the sentence, source D-158 and To do 9, so the change comes from the requirement. The leak
  case gained a third send and its counts; no assertion was weakened, the stdout and line-count
  checks stand.
- **Changed invariant tests:** none. The cases marked or cited for `account-email-nodemailer-starttls`
  are outside the diff.
- **Where expected values come from:** literals written from D-219 and D-158, cited in a comment, and
  compared whole against the message read back from a real loopback SMTP server, decoded by the test's
  own helpers rather than by the library under test.
- **Executor's mutation claims:** wrong subject, missing and misplaced paragraph, `\n` for `\n\n`, link
  not on its own line and crafted recipient are each caught; see M02 to M10.
- **Own-work check:** it names exact text and order, and its check does catch those. The slice's weakest
  place is the leak case, which the executor's note names for the stub but not for its two list entries
  (Minor 1).

## Declined to judge

- `.gitattributes` gives `tests/account-mail.test.mjs` no `eol` rule (`git ls-files --eol` shows `attr/`), while `guidelines/coding.md` says the file keeps LF on Windows: an older gap, outside this task.
- Enumeration, origin and body guards, token forms, another kind of link, a blocked account and a login in progress: they belong to the routes of Slices 5 and 6; this slice has no route.
- The real delivery test D-153 asks for before recovery is enabled: a human's step, which code cannot show.
- `guidelines/coding-mail-sending.md`, *Wzorzec rodzaju*, still names only the confirmation message's composer: Slice 11 of the plan (`.runs/task-cycles/reset-hasla/plan.md:527`) changes it.
- `composePasswordResetMessage` has no production caller yet: Slice 5 adds it.

## Checks run

Run in a detached scratch worktree of `aa9ff04` with `node_modules` linked from the reviewed worktree,
because `npm test -- <file>` builds into `dist/` and the handoff forbids changing a file. It was removed
afterwards; the reviewed worktree shows no change and stays at the head.

| Command | Exit | Result |
|---|---|---|
| `git diff 7b0a391..aa9ff04`, `git log 7b0a391..aa9ff04` | 0 | one commit, two files |
| `git ls-files --eol -- tests/account-mail.test.mjs src/server/account-mail.ts` | 0 | both `i/lf w/lf`; the diff has no line-ending churn |
| `npm run typecheck` | 0 | |
| `npm test -- tests/account-mail.test.mjs` | 0 | 9 of 9, as the report claims |
| `npm test -- tests/http.test.mjs` | 0 | 48 of 48; not in the plan's list, added because it reads the changed confirmation body through the route (`tests/http.test.mjs:1942-1948`) |
| `npx prettier --check --no-config --no-editorconfig src/server/account-mail.ts tests/account-mail.test.mjs` | 0 | |
| `npm test -- tests/quality/test_quality_invariants.py` | 1 | ESLint, Prettier and audit cases pass; Ruff and ShellCheck cases error, see below |
| `python -B slice4_texts.py` (scratch script) | 0 | 7 quoted strings of To do 8 and 9, 0 without an equal constant |

Mutants of `src/server/account-mail.ts`, each built and run against `tests/account-mail.test.mjs`:

| Mutant | Exit | Failing cases |
|---|---|---|
| M00 no mutation | 0 | none |
| M01 empty stub of `composePasswordResetMessage`, subject and body empty | 1 | the reset message case, with a `TypeError`; see the claim below |
| M02 reset paragraphs swapped | 1 | the reset message case |
| M03 reset paragraphs joined by a single newline | 1 | the reset message case |
| M04 reset link not on its own line | 1 | the reset message case |
| M05 reset message with the confirmation subject | 1 | the reset message case |
| M06 reset message with the confirmation ignore line | 1 | the reset message case |
| M07 confirmation sentence after the ignore line | 1 | the confirmation message case |
| M08 confirmation sentence removed | 1 | the confirmation message case |
| M09 recipient check removed | 1 | both crafted recipient cases |
| M10 reset composer cuts the address at a separator | 1 | the reset crafted recipient case only |
| M11 any failed send writes the body | 1 | the leak case |
| M12 only a failed reset send writes the body | 0 | **none, survives: Minor 1** |
| M13 a sent reset message writes the body | 1 | the leak case |
| M14 an HTML part beside the text | 1 | both whole-message cases |

**Claim not confirmed.** The report says the reset case failed "at its assertion" against the empty stub,
and the plan asks for that. With a stub of empty subject and body (M01) it fails instead with
`TypeError: Cannot read properties of undefined (reading 'map')` at `tests/account-mail.test.mjs:473`,
because the library writes no `Subject` header for an empty subject and the case calls `.map` on what
is missing. The case does go red, and with a real wrong value it fails at its assertion (M02 to M06), so
nothing in the change depends on this. The executor's stub is not recorded, so its run cannot be
reproduced exactly. M01 also passes the reset crafted recipient case and the leak case; the report names
only the latter.

**Not run:**

- `test_ruff_source_rules` and `test_shellcheck_source_rules`: their tools live in `.runs/quality-venv`,
  which the scratch worktree lacks, so both errored at launch with `FileNotFoundError` and judged nothing.
  The executor's exit 0 for these two stays unverified. The slice changes no Python or Bash file, so
  neither tool reaches it.
- The product's gate, as the handoff says.

## Reaches beyond the dispatch

- `src/server/account-routes.ts:279-284`: the production caller of the confirmation composer, to see the reach of the changed text.
- `tests/http.test.mjs:1942-1948`: how route tests take the link out of the body, since the body changed.
- `src/server/account-policy.ts:25`: the lifetime the reset text states.
- `.runs/task-cycles/reset-hasla/plan.md`, slice headings and line 527: which later slice takes the routes and the guideline passage.
- `.runs/task-cycles/reset-hasla/spec.md:391`: the link's fragment key, against the test's `resetLink`.
- `scripts/test.py`, `scripts/test-node-file.mjs`, `tests/quality/test_quality_invariants.py`, `.gitattributes`: how the focused checks run, and the line-ending claim.
- Repository-wide search for the old title of the leak case and for the texts of the messages: no other file cites either; the one long line of `foundations/decisions.md:2872` that search hid was read whole.

## Searches not found or unclear

- The CRLF the executor reports in its checkout of the test file: its cause is unclear. `core.autocrlf` is `input` here, which does not write CRLF, and the file now has LF in the index and on disk.
- The exact stub of the executor's failing run: not recorded, see *Claim not confirmed*.
