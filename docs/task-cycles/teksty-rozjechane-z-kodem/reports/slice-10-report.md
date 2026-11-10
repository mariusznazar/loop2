# Report — Slice 10

**Status:** done

## Commits

- `4e4ac095c58eb4c937881b93eb5b1bd32d2cbb73` — docs: bring the coding guidelines of the sender, the account policy, the browser modules and the recording of a failure in line with the code (range from slice base `af823e0`).

## Files changed (added / removed lines)

- `guidelines/coding-mail-sending.md` — 5 / 5
- `guidelines/coding-account-policy.md` — 5 / 2
- `guidelines/coding-browser-module.md` — 2 / 2
- `guidelines/coding.md` — 6 / 0

No code, no foundation entry changed. Written by hand against the template of the guidelines and the coding template (the project skill `the-way-maintain-coding-guidelines` was read through its `SKILL.md` and templates as the handoff's *Read* gives; no task-refinement step was run, as this is the cycle author's writing).

## What changed, with the line of code that confirms it

- **To do 11** (`coding-mail-sending.md`, rule "Jedna wiadomość dla jednego odbiorcy, od ustalonego nadawcy"): *Good* now says the sender has the address from the mail settings and a fixed display name; the body says the address comes from the settings and the display name, subject and text are fixed in the sending file, none chosen by the caller. Code read: `src/server/account-mail.ts:184` (`const { from, user, password } = this.#settings;`) and `:186` (`from: { name: senderName, address: from }`); `senderName`, subject and text are constants at `:8-25` and built by `composeConfirmationMessage` / `composePasswordResetMessage` (`:65-90`), which take only the address and the link.
- **To do 12** (`coding-account-policy.md`, *Good* of "Rezerwacja przed pracą hasła..."): the example now says the attempt is admitted before the password work and settled once after it, naming the work: checking the password at login, hashing at registration. Code read: `src/server/account-routes.ts:718` (`policy.admitRegistration(address)` before) and `:728` (`hashPassword(checked.password)`, no check), against `:782` (`admitLogin`) and `:794` (`verifyPassword`).
- **To do 13** (same file, body of the same rule): the list of releases now reads: refusal for lack of room for password work, duplicate at registration, server error, login with the right password on a blocked account, and login in which the account's password changed during the check because a set-by-link overtook it. Code read: `src/server/account-routes.ts:732` (registration, error/capacity), `:740` (duplicate), `:802` (login, error/capacity), `:818` (password replaced while checked: `account.passwordHash !== checkedHash`), `:825` (blocked account). The "wrong password / unknown address" case at `:810` is `ticket.fail()`, not a release, so it is not in the list.
- **To do 14** (`coding-browser-module.md`, table): `email-status.ts` and `character-skills.ts` changed from `do not copy` to `copy`. Choice from the table: the table gives `copy` to its pure modules with no DOM (checked by grep for `document.` and `createElement` in `team-lines.ts`, `now-lines.ts`, `map-lines.ts`, `discovery-band-text.ts`, `chronicle-entries.ts`, `account-rules.ts`, `discovery-rule.ts`: zero hits, and these rows are `copy`); `exemplar` belongs to `account-card.tsx` alone (D-36) and `do not copy` is for files that build elements through the DOM API (rule "Nowy ekran i moduły w DOM"). Code read: `src/browser/view/email-status.ts:1-46` (pure, `import type` only, no DOM) and `src/browser/view/character-skills.ts:1-45` (pure functions, marked "Pure" in each doc comment).
- **To do 37** (`coding.md`, rule "Recording a failure"): a new paragraph after the existing service-command paragraph says that what `account-database-check` and `measure-passwords` print at failure (the sentence in the image build log, the report for the script that ran it) is no log line but a message to whoever ran them; both work on a temporary database and made-up passwords, so the failure keeps the error's text and gets no JSON line. The existing paragraph on the service commands (D-354) is untouched and stays true. Code read: `src/server/account-database-check.ts:83-85` (`console.error` with `error.message`, exit 1), `src/server/measure-passwords.ts:377-388` (JSON report with `error.message`, exit 1); D-252 (current text after commit `6c31f59`, with its *Verification* and *Rejected*).

## Checks

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `git diff --check` | 0 | no output |

Not run: `npm test` (the cycle's gate, not mine).

## Own-work check

- Requirement most likely not met: To do 13 asks for "every case the code releases". A case missed would leave the list incomplete. Check: grepped `ticket.release()` / `.fail()` / `.succeed()` / `.created()` in `src/server/account-routes.ts` (matches at 732, 740, 749, 802, 810, 818, 825, 829) and read each in context (lines 697-835); the five `release()` calls map onto the five cases in the new list, `fail()` at 810 is a counted failure and `succeed()` / `created()` are settlements, not releases. Showed: list complete for the routes at the current code. The reset route (`POST /api/password-reset`) takes no attempt admission (D-226), so it has no release.
- Second check: the form of the files. `foundation_check.py` exit 0 with `0 errors` (it checks the guidelines' form and decision references).

## Reach beyond the handoff

None beyond reading `.the-way/task-cycle/change/slice.md` (named by the method) and `a rule file of the author's agent instructions` (before committing, per the global instructions). I also read `src/server/account-policy.ts:120-335` for the semantics of the tickets (inside the *Read* file `account-policy.ts`, a range the handoff names whole).

## Unread material

none (every file, entry and range in *Read* was read; `account-policy.ts` was read for the ticket section lines 120-335 only, of the whole *Read* entry `src/server/account-policy.ts`; the rest of that file is the credential checks, not the attempt settlement).

## Searches not found or unclear

- none for the five items.

## Choices (way rejected, cost if wrong) and notes

- To do 14: chose `copy`. Rejected `do not copy` (the status for DOM-building files, which these are not; leaves the table saying what the files used to be). If wrong (the owner wants a third reading, such as a file kept out of the table), the cost is a one-word edit of two rows.
- To do 13: named the reset case as "the account's password changed during its check, because a set-by-link overtook it" rather than only "reset overtook it", to match the code comment at `account-routes.ts:814-816`; the only route that changes a password is the set-by-link route (not verified by exhaustive search; the task's own wording says "reset").
- To do 37: placed in a new paragraph of its own, opening with "Inaczej jest z", so the existing paragraph (service commands, JSON line plus sentence is one record) is not read as covering these two commands.
- To do 12: only *Good* changed, as the handoff says. *Bad* of that rule ("Próba jest liczona dopiero po haszowaniu...") still speaks of hashing; it is true at registration and, read as the password work, at login; left as is.
- Possible residue for the orchestrator (not changed, outside this slice): the example "Ekran w Reactcie: Postać" in `guidelines/coding-browser-module.md` says `branchText` of `character-skills.ts` may be imported by the screen "(D-265)", the decision that allows importing pure functions of `do not copy` files. With `character-skills.ts` now `copy`, the sentence is still true but the parenthetical no longer fits it as tightly; the same sentence in the rule "Nowy ekran i moduły w DOM" stays correct for other `do not copy` files.

## Problems observed

none.
