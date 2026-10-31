# Report — return step, task `reset-hasla`

**Status:** `done`

Base of the step `d5c80d3`; head now `7b85e6d`, branch `task/reset-hasla`, not pushed. Process pin
`.the-way` at `a8dfe8a`, not moved. The gate of `d5c80d3` does not cover these three commits: they change
only `foundations/decisions.md` and `guidelines/coding-account-policy.md`, and the gate is the
orchestrator's to run again.

## Commits and files

| Commit | Message | File | Added | Removed |
|---|---|---|---|---|
| `dc78c0e` | docs: say in D-214 that the server holds the address's condition too, not that its refusal stands under the field | `foundations/decisions.md` | 4 | 4 |
| `e8b21e3` | docs: say in D-218 that a session of another account stays working and is renewed, not that it stays as it was | `foundations/decisions.md` | 2 | 1 |
| `7b85e6d` | docs: limit the rule on reserving an attempt to logins and registrations, since setting a password by a link takes none | `guidelines/coding-account-policy.md` | 6 | 2 |

All three carry the private address (`git log`: the private address). No product code and no test changed.

## Fields of the record's *Return step*

### Foundation compared with code

Three things no longer matched, each corrected in this change; nothing else.

| Compared | With | Result |
|---|---|---|
| D-214, "under the field, from the form and from the server alike" | `src/browser/view/account-screen.ts:340-349` and `:280`, `src/server/account-routes.ts:534-543`, `src/server/account-policy.ts:60-65` | **Did not match.** The form puts the sentence under the field and sends nothing. The server's 400 `invalid-email` would stand as the form's warning, under the form (D-44), and the page never gets it: `addressProblem` and `normalizeEmail` hold one rule. Corrected: the sentence under the field and nothing sent; the form holds the condition and so does the server, which refuses with that sentence. That is To do 3's own wording („ten warunek stoi w formularzu i na serwerze”). |
| D-218, last sentence, "stays as it was" | `express-session-end-of-request`, D-101, `src/server/account-routes.ts:559-605` | **Did not match.** The route does not touch the session, but as every request ends the library renews a valid session's expiry, as D-101 requires. Corrected: "stays working, renewed as D-101 renews it at every request". The clause "neither uses nor changes" speaks of the route and is true. |
| `guidelines/coding-account-policy.md:20`, the rule „Rezerwacja przed pracą hasła, rozliczenie po jej końcu” | `src/server/account-routes.ts:559-605`, D-218, `account-attempt-limits` | **Its reach did not match.** *Good* said of any route that it takes an admission before hashing; the set-password route takes none (D-218). The rule's invariant speaks of logins and registrations only. Corrected: *Good* names those two routes, one sentence states the reach and what the set-password route does, *Decision* gains D-218. The meaning is D-218's, so it takes no approval (`product-guidelines/coding/SKILL.md`, "Using a meaning that a decision of the product's log already carries"). |
| Every `Method: test` of the entries | `// invariant:` marks under `tests/`, by search, and the cases' names at the new marks | Match: `password-reset-verified-email` 9, `password-reset-link` 10, `password-reset-ends-sessions` 7, `account-session-authorization` 6, `player-server-session` 4, `account-session-storage` 10, `account-attempt-limits` 11, `unblock-restores-no-link` 6, `player-argon2-password-hash` 2, `account-email-nodemailer-starttls` 1. Each changed invariant has a mark on a case that exercises the reset, save `account-email-nodemailer-starttls`: its one marked case (`tests/account-mail.test.mjs:301`) sends the confirmation message, and the reset message goes through the same mailer on a real loopback SMTP server in unmarked cases (`tests/account-mail.test.mjs:460`, `:500`). The mailer has no branch by message, so the sentence is true of the code. |
| The words a player reads: D-44, D-96, D-98, D-100, D-105, D-158, D-160, D-211, D-214, D-217, D-219 | `src/**/*.ts`, by script: every „…” of each entry's sentences and *Verification*, whitespace collapsed, then read in place in the code | 53 of 54 found. The one miss is D-96's *violates*, „Zapis pochodził z innej wersji gry…”, an abbreviation in an example, older than the task. Places and roles read in the code: the waiting texts on their buttons, `text-secondary` of `.form-note`, `positive` and `warning` of the two notices, the paragraphs of both messages and the link on its own line. Match. |
| Entries the change writes or changes, the rest: D-98, D-100, D-102, D-105, D-109, D-112, D-138, D-152 to D-155, D-158, D-160, D-211, D-215, D-216, D-217, D-219; the invariants of report 06; the two environment facts | `src/server/account-routes.ts` whole; the diffs of `database.ts`, `session-store.ts`, `account-policy.ts`, `account-mail.ts`; `src/browser/view/password-reset.ts`, `account-screen.ts`, `app.ts` (`showReset`, `start`); `account-api.ts` (the failure sentences); `transaction` is `BEGIN IMMEDIATE` (`database.ts:215-216`); `express-session` at 1.19.0 in `node_modules` | Match. |
| Entries the task names and the search found: D-99, D-101, D-103, D-104, D-116; route lists of the foundation | the same code; a search of `foundations/*.md` for the routes' paths, "three paragraphs" and "sending routes" | Match. The only list of routes that returns 401 does not name the new routes, rightly. "three paragraphs" stands in D-219 alone, of the reset message. |
| Part map of the touched parts: `account-server`, `browser-view`, `agent-workflow`, `product-foundation` | files and imports of the change | Match. Every new file falls under a pattern, no new dependency between parts, no change of a trust boundary. No correction. |

### Decisions written or changed

- **D-214** corrected (`dc78c0e`), **D-218** corrected (`e8b21e3`). No new decision.

### Invariants written or changed

None. The two corrections reach no invariant: none derives from D-214, and `password-reset-link` derives
from D-218 by its link rules, which did not change.

### Environment facts

None written. Every source the entries rest on stands as a fact or a quoted citation in *Based on*.

### Glossary terms

None. Read against the product's glossary and the-way's: no word of the change is used against an
entry, and „locked” and „blocked” keep their entries' meanings.

### Part-map changes

None.

### Projected entries written whole or in part

None by this step, and none missed: D-152, D-153, D-154, `password-reset-verified-email`,
`account-email-via-outsider`, `account-email-nodemailer-starttls` whole, and the part of D-106 and
`player-argon2-password-hash`, stand as report 06 gives.

### Rows of *Settlements to record* written

None new; all 19 stand as report 06's table gives. Two carriers changed in wording, keeping their rows:
row 3 (D-214) and row 11 (D-218).

### Meaning of what was corrected, po polsku, do opisu zgłoszenia

- **D-214** — Adres zapisany błędnie dostaje zdanie pod polem i nic nie wychodzi; ten sam warunek trzyma też serwer, który odmawia takiego adresu tym samym zdaniem, a nie „pod polem”, bo strona takiego adresu w ogóle nie wysyła.
- **D-218** — Sesja innego konta, z którą przyszło żądanie ustawienia hasła, dalej działa i odnawia się jak przy każdym żądaniu; trasa jej nie używa i nie zmienia.
- **Zasada „Rezerwacja przed pracą hasła, rozliczenie po jej końcu”** (`guidelines/coding-account-policy.md`) — Rezerwacja próby dotyczy logowania i zakładania konta; trasa ustawiania hasła odnośnikiem próby nie przyjmuje, sprawdza działanie odnośnika przed pracą hasła i haszuje przez samą bramkę haseł (D-218).

## Answers of step 4, as the handoff gives them

Trust boundary **yes**, `src/server/**`; irreversible operation **no**. The step changes neither.

## Checks

| Command | Exit and result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` on `d5c80d3`, before any edit | exit 0, `0 errors` |
| the same after each of the three corrections, and on the committed head `7b85e6d` | exit 0, `0 errors` each |
| `python -B <scratchpad>/words.py <scratchpad>` (the comparison of the words) | exit 0, found 53, missing 1 |

**Not run:** `npm test` with no argument, the orchestrator's by the handoff; no test file, since the
change holds no code. **Unchecked by any command:** delivery from the deployed container (H1), the
human's.

## Own-work check

- **Requirement most likely unmet:** a corrected wording left standing in another file.
- **Check:** after the commits, a search of `foundations` and `guidelines` for "from the server alike",
  "stays as it was" and „Trasa dostaje zgodę”, with the new wordings as positive controls.
- **Showed:** "from the server alike" and „Trasa dostaje zgodę” nowhere. "stays as it was" in three places
  of another sense: D-105's and D-214's *Rejected* (a decision that stays unchanged) and the name of a
  test about a session's payload at `guidelines/testing.md:168`. The new wordings found.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| Whole-change review and its fix, with the fix's review | reports 32, 33, 34 | the handoff's pointers cite them |
| What earlier reports left to this step | reports 01, 02, 03, 05, 12, 16, by search; `cycle.md`, *Questions and autonomous choices*, *Return step* | to miss none, and the form of the record |
| The record-decision skill, `read.md`, `decide_entry.md`, `way_of_working.md`, the decisions' template | `.the-way/elements/` | writing two entries |
| The coding-guidelines skill and both templates of guidelines | `.the-way/product-guidelines/` | writing a guideline as the cycle's author |
| The environment facts' template | `.the-way/elements/environment-facts/template.md` | whether a source needed a fact |
| D-101, D-103, D-104, D-116; the glossary; `uri-fragment-in-requests`; `tests/account-mail.test.mjs`; `src/browser/account-api.ts` | `foundations/`, `tests/`, `src/` | the comparison |
| The owner's rules on scripts, git and written rules | `C:\Storage\The Brain\The Brain\.ai\rules\` | before the script and the commits; `scripts.md` was read after my first one-off print of entries, which wrote nothing |

## Searches not found or unclear

- `the-way-maintain-coding-guidelines` runs inside a refinement and names the cycle's author only for
  writing what a task settles. The task names no item for this rule; I read its column "The cycle's
  author" with the sentence on a meaning a decision already carries, as `cycle.md` A4 reads it for Slice 11.
- `history.replaceState` stands in D-217's *complies*, with no fact. That decision's binding sentence
  says only that the fragment is gone, which holds whichever browser call removes it, so the template's
  test for a fact (a citation that would call the decision into question) does not ask for one.
- Otherwise none.

## Choices

- **D-214: the entry corrected, not the page.** Rejected: making the page show a server's `invalid-email`
  under the field. That is code for a path no page reaches, and the entry claimed more than row 3 and To
  do 3 give. Cost if wrong: one sentence.
- **D-218: "stays working, renewed as D-101 renews it at every request".** Rejected: bare "stays working",
  which leaves "neither uses nor changes" looking at odds with the renewal the fact describes. No
  *Relations* link to D-101 added: it is named, not served. Cost if wrong: a few words.
- **The guideline: the rule narrowed, its title kept.** Rejected: leaving the file because the rule's
  invariant already names logins and registrations. A reviewer of a later change to the route would read
  *Good* as binding it. The list of what a release is stays as it stands: it does not name a block either
  and says nothing false of the raced login. Cost if wrong: three lines.
- **One commit per correction**, so each can be reviewed or reverted alone.

## Problems as observed

None beyond the three corrected. The Minor and out-of-scope findings of reports 32 and 34, the two
gaps in permanent tests among them, stay on the request's lists, untouched.
