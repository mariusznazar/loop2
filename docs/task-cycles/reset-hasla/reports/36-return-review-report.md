PASS 7b85e6d272cab7fa8490a66c3126d207fdb07b03

# Review report — return step, task `reset-hasla`

Reviewed: the return step's commits, range `d5c80d3..7b85e6d` (`dc78c0e`, `e8b21e3`, `7b85e6d`), branch
`task/reset-hasla`. `git rev-parse HEAD` is `7b85e6d272cab7fa8490a66c3126d207fdb07b03`, the head given.
Process pin `.the-way` at `a8dfe8a`, equal to the gitlink. The range changes `foundations/decisions.md`
and `guidelines/coding-account-policy.md` only.

Counts: blocking 0, Minor 1, out of scope 6 (the lines of **Declined to judge**).

Result by commit:

| Commit | Correction | Result |
|---|---|---|
| `dc78c0e` | D-214: the form's sentence under the field, and the server holds the same condition and refuses with that sentence | true of the code, and within To do 3, row 3 and question 15 |
| `e8b21e3` | D-218: a session that does not end stays working, renewed as D-101 renews it | true of the code, measured in both branches |
| `7b85e6d` | guideline: the rule on reserving an attempt limited to logins and registrations, set-password route described | true of the code and of D-218; one Minor wording in the line it rewrote |

No changed invariant test: the range changes no test and no invariant.

## Findings

### Critical

None.

### Important

None.

### Minor

#### 1. *Good* now names the registration route but still says it settles after a password check

**Place:** `guidelines/coding-account-policy.md:24`, commit `7b85e6d`. Within the task. Not blocking.

**What is wrong:** the line reads „Trasa logowania albo zakładania konta dostaje zgodę na próbę przed
haszowaniem i rozlicza ją raz, po zakończeniu sprawdzenia hasła.” The ending is true of the login route,
which verifies a password. It is not true of the registration route, which this commit names for the
first time: the only check of a password there comes before the admission, and what follows it is
hashing, or for a taken address no password work at all.

**Why it matters:** D-116 states the moment as "only after the password work it started has completed",
and the rule's own heading (`:20`) and body (`:34`) say „praca hasła”. Line 24 alone therefore says of
one of its two named routes something the route does not do. A reader taking line 24 literally would
find the registration's settlement at no password check. The words are older than the commit, but under
the former subject „Trasa” they read as loose; naming the registration made them a statement about that
route.

**Why Minor:** nothing behaves wrongly, and the heading and the body beside it give the correct moment,
so no later change is likely to be built on the wrong reading. D-116 is not an entry this change writes,
so WAY-263 does not raise the grade.

**Evidence:** `src/server/account-routes.ts:642` checks the rules of D-98 through `checkRegistration`;
`:653` takes the admission; `:663` hashes; `:684` settles with `ticket.created()`; `:660` with `:675`
is a taken address, released with no password work.

**Fix, for the author:** „…i rozlicza ją raz, dopiero po zakończeniu pracy hasła, którą zaczęła.”, which
is D-116's wording.

## Declined to judge

- A permanent test of the renewal itself: the case at `tests/http.test.mjs:3377` asserts a session's data,
  not its expiry. The range holds no test, the renewal is D-101's behaviour with its own invariant, and I
  measured it here.
- `account-email-nodemailer-starttls`: its one mark is on a case that sends the confirmation message, and
  `guidelines/testing.md:168` names a second case that carries no mark. No test changed in this range; the
  author discloses the first, and the whole-change review owns test coverage.
- `account-attempt-limits` says "since its last … successful password reset", while a reservation made
  before a reset keeps counting after it. D-102's *complies* keeps those reservations on purpose; neither
  entry is changed here.
- The guideline's list of what a release is (`guidelines/coding-account-policy.md:35-36`) names neither a
  blocked login nor a login raced by a reset. Lines not changed; the author weighed this and the list reads
  as examples.
- `guidelines/coding-account-policy.md:31` speaks of the thresholds of email address and client address,
  which fits a login, while a registration reserves in the client address only. Older than the task, lines
  not changed.
- The comment at `src/server/account-routes.ts:551`, "the route never touches the one a request brings with
  it", sits beside a library that calls `touch`. It is true of the route, it means the common word, and no
  code changes in this range.

## Trust boundary

The range changes no file under `src/server/**`. The entries it corrects state rules of that boundary, so
I compared them with the code and with a crafted request:

- A crafted badly written address gets 400 with the code `invalid-email` and the sentence, and nothing is
  handed on (`src/server/account-routes.ts:534-543`; the case at `tests/http.test.mjs:2775` asserts the
  sentence at `:2796` through the constant at `:2529`, and it passes).
- D-218's order — fields, rules of D-98, form of the token, whether the link works, hashing through the
  gate, the link read again in the transaction — matches `src/server/account-routes.ts:559-605`.
- The route takes no admission and reads no session. `hashPassword` goes through `withPasswordCapacity`, a
  gate without a queue (`src/server/passwords.ts:21-40`), as the guideline's „samą bramkę haseł” says.

Irreversible operation: none in the range.

## The author's claims

| Claim of report 35 | Checked by | Result |
|---|---|---|
| Three commits, the files and line counts, private address | `git diff`, `git log` | holds |
| The form puts the sentence under the field and sends nothing; a server refusal would stand under the form | `src/browser/view/account-screen.ts:340-349`, `:280`, `controls/text-field.ts:69` | holds |
| `addressProblem` and `normalizeEmail` hold one rule | generated text, check 4 below | holds |
| The new D-214 wording is To do 3's | `task.md:19`, row 3 (`:203`), question 15 (`:108`) | holds |
| The library renews a session of another account | check 3 below; `node_modules/express-session/index.js:359`, `:468`; `src/server/session-store.ts:156`; `src/server/database.ts:363` | holds, also for a session of the link's own account after a refused reset |
| The guideline's new reach is D-218's meaning, so it takes no approval | D-218; `.the-way/product-guidelines/coding/SKILL.md:44-45` | holds; every clause of the new paragraph stands in D-218 or `account-attempt-limits` |
| D-101 named in D-218 without a *Relations* link | `.the-way/elements/decisions/template.md:153` (`derives from`: a higher decision the entry serves) | holds; D-218 does not serve D-101 |
| Mark counts of ten invariants | `grep` under `tests/` | all ten equal the report |
| Each changed invariant has a mark on a case that exercises the reset, save the STARTTLS one | check 6 below | holds; 0 reset cases for `account-email-nodemailer-starttls`, at least 1 for the other nine, with „reset” matched in the case's text |
| The STARTTLS case at `tests/account-mail.test.mjs:301` sends the confirmation message; the reset goes through the same mailer in unmarked cases at `:460`, `:500` | read | holds |
| 53 of 54 words found, the miss an abbreviation in D-96 | my own script, check 5 below | same one miss; the full sentence stands at `src/browser/view/app.ts:36`. My count is 66 of 67, because my selection of quotes differs from the author's |
| `transaction` is `BEGIN IMMEDIATE`; `express-session` at 1.19.0 | `src/server/database.ts:214-216`, `node_modules` | holds |
| D-214 and D-218 may be corrected in place | absent from `main`'s tree, added in `e8755e8` on this branch | holds |
| Row 3 carried by D-214, row 11 by D-218 | report 06, lines 109 and 117 | holds |
| Own-work check: no corrected wording left | `git grep` over the tracked tree, not only `foundations` and `guidelines`, plus the sentence „nazwa@domena” and the guideline's phrase | holds; `stays as it was` in the three places it names, all of another sense |

The own-work check's requirement fits a weak point of a change made only of words. A literal search
would not catch a paraphrase, so I also searched by the sentence itself and by the guideline's meaning, and
read the rows of `guidelines/testing.md` for both routes (`:204-208`); none says the old thing. The other
weak point, whether "renewed" is true, the author took from the environment fact and the code; check 3
measures it.

Named entries compared, each whole: D-44 no longer collides with D-214, since a server refusal under the
form and the form's sentence under the field are now two places for two paths; D-101, D-103, D-116,
`account-attempt-limits` and `account-session-authorization` match the corrected wording. Rows 2, 3, 6 and 15
and questions 13 and 15 of the task hold against the three corrections.

## Checks

| # | Command or method | Exit and result |
|---|---|---|
| 1 | `git rev-parse HEAD`, `git -C .the-way rev-parse HEAD`, `git ls-files --stage -- .the-way` | head as given, pin equal to the gitlink |
| 2 | `python -B .the-way/elements/common/foundation_check.py` on the head | exit 0, `0 errors` |
| 3 | scratch copy of the case „a reset ends every session of its account…”, with printouts added, `node --test --test-name-pattern=… session_renewal.test.mjs`, against the worktree's `dist` | exit 0, 1 pass. Session of another account, reset 204: expiry `1793499934973` to `1796005535470`, about 29 days later, new `Set-Cookie`, data equal by the case's assertion. Session of the link's own account, reset refused 400: expiry `1793499935474` to `1796005535480`, data equal |
| 4 | `node same_rule.mjs`: 400,000 generated strings through `addressProblem` and `normalizeEmail` of `dist`, with odd spaces, `@` look-alikes and letters whose lowercase changes length, and eight controls | exit 0, 31,546 accepted, 0 disagreements, controls as expected. A first run was thrown away: its random generator produced 0 accepted strings, so it showed nothing |
| 5 | `python -B words.py <worktree> <output>`: every „…” of the entries' text before *Rationale*, whitespace collapsed, in `src/**/*.ts` | exit 0, found 66, missing 1 |
| 6 | `python -B marks.py`: marks per invariant, and those in a case whose text holds „reset” or `setPassword` | exit 0, as in the table above. A word match, so it shows each case touches the reset, not what it asserts about it |
| 7 | the same scratch copy, `--test-name-pattern` on the three cases „an address not written as name@domain…”, „the password rules come before the link…”, „every token that does not work…” | exit 0, 3 pass |
| 8 | `git status --short` after the checks | empty; `HEAD` unchanged |

The scratch files are `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\session_renewal.test.mjs`,
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\same_rule.mjs`,
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\words.py`,
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\marks.py` and
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\words.txt`.
`dist` is the worktree's existing build, not rebuilt; it is newer than the sources and the range changes no
source.

**Not run or unverified:**

- The full gate and `npm test`: excluded by the handoff.
- Delivery from the deployed container (H1): the human's.
- The foundation check at `d5c80d3` and after each commit, as the author reports: I ran it on the head only.
- The author's own `words.py`: not available to me as run; I wrote my own.
- The author's rows on the rest of the entries, on the glossary and on the part map: not re-read one by one.
  They change nothing in this range, and the handoff bounds this review to the entries the step corrects.
- The roles and places of the words (`text-secondary`, `positive`, `warning`, the waiting texts): not
  rechecked beyond the D-214 and D-44 places above.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| The whole task, beyond the named passages | `.runs/task-cycles/reset-hasla/task.md` | it came in two reads; rows 3 and 11 and the *Context* |
| D-99, D-102, D-104, D-105 (its first sentences) | `foundations/decisions.md:1791`, `:1834`, `:1864`, `:1877` | the condition D-214 cites; the admission the guideline limits; read beside D-101 and D-103 |
| Invariant `password-reset-ends-sessions` | `foundations/invariants.md:1058` | the other branch of D-218's sentence |
| Fact `express-session-end-of-request` | `foundations/environment_facts.md:358` | D-218's *Based on*, the source of the renewal |
| Search of the foundation for the old wordings and their senses | `foundations/*.md`, by grep | wording left standing |
| Rows on both routes, and the error state of a field | `guidelines/testing.md:204-211`, `guidelines/styleguide-browser-view.md:159`, `:173` | other statements of the same rules |
| Session and password code | `src/server/session-store.ts`, `src/server/app.ts`, `src/server/database.ts` (`renewSession`, `transaction`), `src/server/passwords.ts`, `node_modules/express-session/index.js` | whether "renewed" and „bramka haseł” are true |
| Browser code | `src/browser/account-api.ts`, `src/browser/view/controls/text-field.ts`, `src/browser/view/app.ts:36` | "under the field", the address as sent, the one miss |
| Tests | `tests/http.test.mjs` (the cases and helpers named), `tests/account-mail.test.mjs`, the imports of `tests/view/account-screen.test.mjs` | the author's claims; building the scratch copy |
| Return step's method | `.the-way/task-cycle/skill/return_step.md` | what the step owes |
| Guidelines' and decisions' rules | `.the-way/product-guidelines/coding/SKILL.md:30-45`, `.the-way/product-guidelines/coding/template.md:53`, `.the-way/elements/decisions/template.md` | the claim of no approval, a rule's shape, *Relations* |
| Earlier reports, by search | reports 06, 32, 33, 34 | carriers of rows; where the two entry wordings were first raised; form of the first line |
| The owner's rules | `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`, `C:\Storage\The Brain\The Brain\.ai\rules\search.md`, `C:\Storage\The Brain\The Brain\Notes\Areas\(A) Claude code\playbook_code_review.md` | global instructions; `scripts.md` was read after one `node -p` that printed two versions and wrote nothing |

## Searches not found or unclear

- `.the-way/elements/decision-log/template.md`, a path I guessed, does not exist; the template is
  `.the-way/elements/decisions/template.md`.
- The dispatch asks for the first line and the path, while `review/SKILL.md` section 4 also asks for the
  counts. I followed the dispatch, and the counts stand at the head of this report.
- The handoff forbids the full gate and does not name `foundation_check.py`, which `npm test` also runs. I ran
  that one check alone because it writes nothing and tells a malformed entry from a sound one.
- Otherwise none.
